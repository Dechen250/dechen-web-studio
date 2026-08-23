import { and, desc, eq } from "drizzle-orm";
import { activities, agentRuns, companies, contacts } from "@/database/schema";
import type { Database } from "@/lib/db";
import { requireCommercialWriter } from "@/features/pipelines/queries";
import { requireOrganizationMembership } from "@/server/authz/organization";
import { runCrmAgent, type AgentEngineResult } from "@/features/agent/engine/run";
import type { AgentLead } from "@/features/agent/engine/discovery";

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
    await db
      .update(agentRuns)
      .set({
        status: "done",
        website: result.website ?? lead.website ?? null,
        markdown: result.markdown,
        error: null,
        updatedAt: new Date(),
      })
      .where(eq(agentRuns.id, runId));

    await attachActivity(db, {
      organizationId,
      actorId,
      contactId: lead.contactId,
      companyId: lead.companyId,
      runId,
      title: "Agente: rascunho de Descoberta",
      body: result.markdown,
    });

    return result;
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
