import { and, asc, desc, eq, isNull } from "drizzle-orm";
import {
  activities,
  agentRuns,
  companies,
  contacts,
  opportunities,
  pipelines,
  pipelineStages,
  type AgentRunFindings,
} from "@/database/schema";
import type { Database } from "@/lib/db";
import { requireCommercialWriter } from "@/features/pipelines/queries";
import { requireOrganizationMembership } from "@/server/authz/organization";
import type { ExtractedContact } from "@/features/agent/engine/contacts";
import { runCrmAgent, type AgentEngineResult } from "@/features/agent/engine/run";
import type { AgentLead } from "@/features/agent/engine/discovery";
import {
  emptyToNull,
  normalizePhone,
  optionalNormalizedEmail,
} from "@/lib/utils/commercial";

export type AgentLeadInput = AgentLead & {
  contactId?: string | null;
  companyId?: string | null;
};

export async function listAgentRuns(
  db: Database,
  userId: string,
  organizationId: string,
  filters: { contactId?: string; companyId?: string; limit?: number } = {},
) {
  await requireOrganizationMembership(db, userId, organizationId);
  const conditions = [eq(agentRuns.organizationId, organizationId)];
  if (filters.contactId) conditions.push(eq(agentRuns.contactId, filters.contactId));
  if (filters.companyId) conditions.push(eq(agentRuns.companyId, filters.companyId));

  return db
    .select()
    .from(agentRuns)
    .where(and(...conditions))
    .orderBy(desc(agentRuns.createdAt))
    .limit(filters.limit ?? 40);
}

export async function getAgentRunForUser(
  db: Database,
  userId: string,
  organizationId: string,
  runId: string,
) {
  await requireOrganizationMembership(db, userId, organizationId);
  const [row] = await db
    .select()
    .from(agentRuns)
    .where(and(eq(agentRuns.id, runId), eq(agentRuns.organizationId, organizationId)))
    .limit(1);
  return row ?? null;
}

export async function leadFromRecords(
  db: Database,
  organizationId: string,
  input: { contactId?: string | null; companyId?: string | null; website?: string | null },
): Promise<AgentLeadInput> {
  let contact: typeof contacts.$inferSelect | null = null;
  let company: typeof companies.$inferSelect | null = null;

  if (input.contactId) {
    const [row] = await db
      .select()
      .from(contacts)
      .where(
        and(eq(contacts.id, input.contactId), eq(contacts.organizationId, organizationId)),
      )
      .limit(1);
    contact = row ?? null;
  }

  const companyId = input.companyId || contact?.companyId;
  if (companyId) {
    const [row] = await db
      .select()
      .from(companies)
      .where(
        and(eq(companies.id, companyId), eq(companies.organizationId, organizationId)),
      )
      .limit(1);
    company = row ?? null;
  }

  const name = contact
    ? `${contact.firstName} ${contact.lastName ?? ""}`.replace(/\s+/g, " ").trim()
    : company?.name || "Lead";

  return {
    contactId: contact?.id ?? null,
    companyId: company?.id ?? null,
    name,
    email: contact?.email ?? company?.email ?? undefined,
    whatsapp: contact?.whatsapp ?? contact?.phone ?? company?.phone ?? undefined,
    company: company?.name || name,
    website: input.website?.trim() || company?.website || undefined,
    segment: company?.industry ?? undefined,
    message: contact?.notes ?? company?.notes ?? undefined,
  };
}

async function attachActivity(
  db: Database,
  input: {
    organizationId: string;
    actorId: string;
    contactId?: string | null;
    companyId?: string | null;
    runId: string;
    title: string;
    body: string;
  },
) {
  await db.insert(activities).values({
    organizationId: input.organizationId,
    actorId: input.actorId,
    contactId: input.contactId ?? null,
    companyId: input.companyId ?? null,
    activityType: "note",
    title: input.title,
    body: input.body.slice(0, 10000),
    metadata: { source: "agent", runId: input.runId },
    isSystem: true,
    occurredAt: new Date(),
  });
}

export async function executeAgentRun(
  db: Database,
  runId: string,
  organizationId: string,
  actorId: string,
  lead: AgentLeadInput,
): Promise<AgentEngineResult> {
  await db
    .update(agentRuns)
    .set({ status: "running", updatedAt: new Date() })
    .where(and(eq(agentRuns.id, runId), eq(agentRuns.organizationId, organizationId)));

  try {
    const result = await runCrmAgent(lead);
    const persisted = await persistExtractedContacts(
      db,
      organizationId,
      actorId,
      lead,
      result.extractedContacts,
    );
    const markdown = appendCrmLinks(result.markdown, persisted);
    await db
      .update(agentRuns)
      .set({
        status: "done",
        website: result.website ?? lead.website ?? null,
        markdown,
        error: null,
        findings: persisted,
        updatedAt: new Date(),
      })
      .where(eq(agentRuns.id, runId));

    await attachActivity(db, {
      organizationId,
      actorId,
      contactId: lead.contactId ?? persisted.contacts[0]?.id ?? null,
      companyId: lead.companyId,
      runId,
      title: "Agente: rascunho de Descoberta",
      body: markdown,
    });

    return { ...result, markdown };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await db
      .update(agentRuns)
      .set({ status: "error", error: message, updatedAt: new Date() })
      .where(eq(agentRuns.id, runId));
    throw error;
  }
}

export async function createAndRunAgent(
  db: Database,
  userId: string,
  organizationId: string,
  lead: AgentLeadInput,
) {
  await requireCommercialWriter(db, userId, organizationId);
  const title = `Agente · ${lead.company || lead.name}`.slice(0, 160);
  const [created] = await db
    .insert(agentRuns)
    .values({
      organizationId,
      actorId: userId,
      contactId: lead.contactId ?? null,
      companyId: lead.companyId ?? null,
      kind: "lead",
      status: "queued",
      title,
      website: lead.website ?? null,
    })
    .returning();

  await executeAgentRun(db, created.id, organizationId, userId, lead);
  return created;
}

/** Used by website ingest — no logged-in session. */
export async function queueAgentForIngest(
  db: Database,
  input: {
    organizationId: string;
    actorId: string;
    lead: AgentLeadInput;
  },
): Promise<string> {
  const title = `Agente · ${input.lead.company || input.lead.name}`.slice(0, 160);
  const [created] = await db
    .insert(agentRuns)
    .values({
      organizationId: input.organizationId,
      actorId: input.actorId,
      contactId: input.lead.contactId ?? null,
      companyId: input.lead.companyId ?? null,
      kind: "lead",
      status: "queued",
      title,
      website: input.lead.website ?? null,
    })
    .returning();

  void executeAgentRun(
    db,
    created.id,
    input.organizationId,
    input.actorId,
    input.lead,
  ).catch((error: unknown) => {
    console.error("[agent] falha no ingest", error);
  });

  return created.id;
}

function splitName(name: string): { firstName: string; lastName: string | null } {
  const parts = name.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const firstName = (parts[0] ?? "Atendimento").slice(0, 80);
  const lastName = parts.slice(1).join(" ").slice(0, 80) || null;
  return { firstName, lastName };
}

async function findMatchingContact(
  db: Database,
  organizationId: string,
  emailNormalized: string | null,
  phoneNormalized: string | null,
) {
  if (!emailNormalized && !phoneNormalized) return null;
  if (emailNormalized) {
    const [byEmail] = await db
      .select()
      .from(contacts)
      .where(
        and(
          eq(contacts.organizationId, organizationId),
          isNull(contacts.archivedAt),
          eq(contacts.emailNormalized, emailNormalized),
        ),
      )
      .limit(1);
    if (byEmail) return byEmail;
  }
  if (phoneNormalized) {
    const [byPhone] = await db
      .select()
      .from(contacts)
      .where(
        and(
          eq(contacts.organizationId, organizationId),
          isNull(contacts.archivedAt),
          eq(contacts.phoneNormalized, phoneNormalized),
        ),
      )
      .limit(1);
    if (byPhone) return byPhone;
  }
  return null;
}

async function defaultOpenStage(db: Database, organizationId: string) {
  const [defaultPipeline] = await db
    .select()
    .from(pipelines)
    .where(and(eq(pipelines.organizationId, organizationId), eq(pipelines.isDefault, true)))
    .limit(1);
  const [fallbackPipeline] = defaultPipeline
    ? [defaultPipeline]
    : await db
        .select()
        .from(pipelines)
        .where(eq(pipelines.organizationId, organizationId))
        .limit(1);
  const chosen = defaultPipeline ?? fallbackPipeline;
  if (!chosen) return null;
  const [stage] = await db
    .select()
    .from(pipelineStages)
    .where(
      and(eq(pipelineStages.pipelineId, chosen.id), eq(pipelineStages.stageType, "open")),
    )
    .orderBy(asc(pipelineStages.position))
    .limit(1);
  if (!stage) return null;
  return { pipeline: chosen, stage };
}

async function ensureSiteOpportunity(
  db: Database,
  input: {
    organizationId: string;
    actorId: string;
    companyId: string;
    contactId: string | null;
    companyName: string;
  },
): Promise<string | null> {
  const [existing] = await db
    .select({ id: opportunities.id })
    .from(opportunities)
    .where(
      and(
        eq(opportunities.organizationId, input.organizationId),
        eq(opportunities.companyId, input.companyId),
        eq(opportunities.status, "open"),
        eq(opportunities.source, "agent-site"),
        isNull(opportunities.archivedAt),
      ),
    )
    .limit(1);
  if (existing) return existing.id;

  const pipeline = await defaultOpenStage(db, input.organizationId);
  if (!pipeline) return null;

  const [created] = await db
    .insert(opportunities)
    .values({
      organizationId: input.organizationId,
      pipelineId: pipeline.pipeline.id,
      stageId: pipeline.stage.id,
      contactId: input.contactId,
      companyId: input.companyId,
      ownerId: input.actorId,
      title: `Site encontrado · ${input.companyName}`.slice(0, 160),
      description: "Negociação aberta pelo agente a partir de contatos públicos no site.",
      source: "agent-site",
      probability: pipeline.stage.probability,
      status: "open",
    })
    .returning({ id: opportunities.id });

  return created?.id ?? null;
}

function appendCrmLinks(markdown: string, findings: AgentRunFindings): string {
  if (findings.contacts.length === 0) return markdown;
  const lines = findings.contacts.map((item) => {
    const state = item.created ? "criado" : "atualizado";
    const bits = [item.name, item.email, item.phone].filter(Boolean).join(" · ");
    return `- ${bits} (${state})`;
  });
  const opp = findings.opportunityId
    ? `\nNegociação no funil: Site encontrado.`
    : "";
  return `${markdown}\n\n## Contatos gravados no CRM\n${lines.join("\n")}${opp}\n`;
}

async function persistExtractedContacts(
  db: Database,
  organizationId: string,
  actorId: string,
  lead: AgentLeadInput,
  extracted: ExtractedContact[],
): Promise<AgentRunFindings> {
  const findings: AgentRunFindings = { contacts: [] };
  const companyId = lead.companyId ?? null;
  if (!companyId) return findings;

  const note = "Capturado pelo agente a partir de dados públicos no site.";

  if (lead.contactId && extracted.length > 0) {
    const [current] = await db
      .select()
      .from(contacts)
      .where(
        and(eq(contacts.id, lead.contactId), eq(contacts.organizationId, organizationId)),
      )
      .limit(1);
    if (current) {
      const email = emptyToNull(extracted.find((item) => item.email)?.email ?? null);
      const phone = emptyToNull(
        extracted.find((item) => item.whatsapp || item.phone)?.whatsapp ??
          extracted.find((item) => item.phone)?.phone ??
          null,
      );
      await db
        .update(contacts)
        .set({
          email: current.email ?? email,
          emailNormalized: current.emailNormalized ?? optionalNormalizedEmail(email),
          phone: current.phone ?? phone,
          phoneNormalized: current.phoneNormalized ?? normalizePhone(phone),
          whatsapp: current.whatsapp ?? phone,
          updatedAt: new Date(),
        })
        .where(eq(contacts.id, current.id));
    }
  }

  for (const item of extracted) {
    const email = emptyToNull(item.email ?? null);
    const phone = emptyToNull(item.whatsapp ?? item.phone ?? null);
    const emailNormalized = optionalNormalizedEmail(email);
    const phoneNormalized = normalizePhone(phone);
    if (!emailNormalized && !phoneNormalized) continue;

    const displayName = (item.name?.trim() || `Atendimento ${lead.company}`).slice(0, 160);
    const { firstName, lastName } = splitName(displayName);
    const existing = await findMatchingContact(
      db,
      organizationId,
      emailNormalized,
      phoneNormalized,
    );

    if (existing) {
      const [updated] = await db
        .update(contacts)
        .set({
          companyId: existing.companyId ?? companyId,
          email: existing.email ?? email,
          emailNormalized: existing.emailNormalized ?? emailNormalized,
          phone: existing.phone ?? phone,
          phoneNormalized: existing.phoneNormalized ?? phoneNormalized,
          whatsapp: existing.whatsapp ?? phone,
          jobTitle: existing.jobTitle ?? emptyToNull(item.jobTitle ?? null),
          source: existing.source ?? "agent-site",
          notes: existing.notes ?? note,
          updatedAt: new Date(),
        })
        .where(eq(contacts.id, existing.id))
        .returning({ id: contacts.id, firstName: contacts.firstName, lastName: contacts.lastName });

      findings.contacts.push({
        id: updated.id,
        created: false,
        name: `${updated.firstName} ${updated.lastName ?? ""}`.trim(),
        email: email ?? existing.email,
        phone: phone ?? existing.phone,
      });
      continue;
    }

    const [created] = await db
      .insert(contacts)
      .values({
        organizationId,
        ownerId: actorId,
        companyId,
        firstName,
        lastName,
        email,
        emailNormalized,
        phone,
        phoneNormalized,
        whatsapp: phone,
        jobTitle: emptyToNull(item.jobTitle ?? null),
        source: "agent-site",
        status: "lead",
        notes: note,
      })
      .returning({ id: contacts.id, firstName: contacts.firstName, lastName: contacts.lastName });

    findings.contacts.push({
      id: created.id,
      created: true,
      name: `${created.firstName} ${created.lastName ?? ""}`.trim(),
      email,
      phone,
    });
  }

  const primaryContactId = lead.contactId ?? findings.contacts[0]?.id ?? null;
  const opportunityId = await ensureSiteOpportunity(db, {
    organizationId,
    actorId,
    companyId,
    contactId: primaryContactId,
    companyName: lead.company,
  });
  findings.opportunityId = opportunityId;
  if (opportunityId) {
    for (const row of findings.contacts) {
      row.opportunityId = opportunityId;
    }
  }

  return findings;
}
