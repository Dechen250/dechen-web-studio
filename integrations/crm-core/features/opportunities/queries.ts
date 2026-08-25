import { and, asc, desc, eq, exists, gte, ilike, isNotNull, isNull, lt, lte, notExists, or, sql } from "drizzle-orm";
import {
  companies,
  contacts,
  lossReasons,
  opportunities,
  organizationMembers,
  organizations,
  pipelines,
  pipelineStages,
  tasks,
  users,
} from "@/database/schema";
import type { Database } from "@/lib/db";
import { recordSystemActivity } from "@/features/activities/queries";
import { notifyAssignment } from "@/features/members/queries";
import { recordAuditLog } from "@/lib/audit/record";
import {
  markLostSchema,
  markWonSchema,
  opportunityInputSchema,
} from "@/features/opportunities/schemas";
import {
  getDefaultPipeline,
  getPipelineById,
  requireCommercialWriter,
} from "@/features/pipelines/queries";
import { assertCanManageCommercial } from "@/lib/auth/permissions";
import {
  emptyToNull,
  parseMoneyToMinorUnits,
  parseOptionalDate,
} from "@/lib/utils/commercial";
import { startOfZonedDay } from "@/lib/utils/datetime";
import { isOpportunityStuck } from "@/lib/utils/stuck";
import { resolveOrgMemberFilter } from "@/server/authz/members";
import { requireOrganizationMembership } from "@/server/authz/organization";

async function assertMemberInOrg(
  db: Database,
  organizationId: string,
  memberUserId: string,
) {
  const [member] = await db
    .select({ id: organizationMembers.id })
    .from(organizationMembers)
    .where(
      and(
        eq(organizationMembers.organizationId, organizationId),
        eq(organizationMembers.userId, memberUserId),
        eq(organizationMembers.status, "active"),
      ),
    )
    .limit(1);
  if (!member) throw new Error("OWNER_NOT_IN_ORGANIZATION");
}

async function assertEntityInOrg(
  db: Database,
  organizationId: string,
  contactId: string | null,
  companyId: string | null,
) {
  if (contactId) {
    const [row] = await db
      .select({ id: contacts.id })
      .from(contacts)
      .where(
        and(
          eq(contacts.id, contactId),
          eq(contacts.organizationId, organizationId),
        ),
      )
      .limit(1);
    if (!row) throw new Error("CONTACT_NOT_IN_ORGANIZATION");
  }
  if (companyId) {
    const [row] = await db
      .select({ id: companies.id })
      .from(companies)
      .where(
        and(
          eq(companies.id, companyId),
          eq(companies.organizationId, organizationId),
        ),
      )
      .limit(1);
    if (!row) throw new Error("COMPANY_NOT_IN_ORGANIZATION");
  }
}

async function getOpportunityInOrg(
  db: Database,
  organizationId: string,
  opportunityId: string,
) {
  const [row] = await db
    .select({
      opportunity: opportunities,
      lossReasonName: lossReasons.name,
    })
    .from(opportunities)
    .leftJoin(lossReasons, eq(lossReasons.id, opportunities.lossReasonId))
    .where(
      and(
        eq(opportunities.id, opportunityId),
        eq(opportunities.organizationId, organizationId),
      ),
    )
    .limit(1);

  if (!row) return null;
  return {
    ...row.opportunity,
    lossReasonName: row.lossReasonName,
  };
}

function mapOpportunityFields(raw: unknown, fallbackOwnerId: string) {
  const parsed = opportunityInputSchema.parse(raw);
  return {
    title: parsed.title,
    description: emptyToNull(parsed.description ?? null),
    pipelineId: emptyToNull(parsed.pipelineId ?? null),
    contactId: emptyToNull(parsed.contactId ?? null),
    companyId: emptyToNull(parsed.companyId ?? null),
    ownerId: emptyToNull(parsed.ownerId ?? null) ?? fallbackOwnerId,
    stageId: emptyToNull(parsed.stageId ?? null),
    source: emptyToNull(parsed.source ?? null),
    productName: emptyToNull(parsed.productName ?? null),
    estimatedValue: parseMoneyToMinorUnits(parsed.estimatedValue),
    proposedValue: parseMoneyToMinorUnits(parsed.proposedValue),
    probability: parsed.probability,
    expectedCloseDate: parseOptionalDate(parsed.expectedCloseDate ?? null),
    nextAction: emptyToNull(parsed.nextAction ?? null),
    nextActionAt: parseOptionalDate(parsed.nextActionAt ?? null),
  };
}

async function resolvePipelineForOpportunity(
  db: Database,
  userId: string,
  organizationId: string,
  pipelineId?: string | null,
) {
  if (pipelineId) {
    return getPipelineById(db, userId, organizationId, pipelineId);
  }
  return getDefaultPipeline(db, userId, organizationId);
}

export async function createOpportunity(
  db: Database,
  userId: string,
  organizationId: string,
  rawInput: unknown,
) {
  await requireCommercialWriter(db, userId, organizationId);
  const data = mapOpportunityFields(rawInput, userId);
  await assertMemberInOrg(db, organizationId, data.ownerId);
  await assertEntityInOrg(db, organizationId, data.contactId, data.companyId);

  const pipelineData = await resolvePipelineForOpportunity(
    db,
    userId,
    organizationId,
    data.pipelineId,
  );
  if (!pipelineData) throw new Error("PIPELINE_NOT_FOUND");

  let stage = pipelineData.stages.find((s) => s.id === data.stageId);
  if (!stage) {
    stage = pipelineData.stages.find((s) => s.stageType === "open");
  }
  if (!stage) throw new Error("STAGE_NOT_FOUND");
  if (stage.stageType !== "open") throw new Error("INVALID_INITIAL_STAGE");

  const [created] = await db
    .insert(opportunities)
    .values({
      organizationId,
      pipelineId: pipelineData.pipeline.id,
      stageId: stage.id,
      contactId: data.contactId,
      companyId: data.companyId,
      ownerId: data.ownerId,
      title: data.title,
      description: data.description,
      source: data.source,
      productName: data.productName,
      estimatedValue: data.estimatedValue,
      proposedValue: data.proposedValue,
      probability: data.probability ?? stage.probability,
      expectedCloseDate: data.expectedCloseDate,
      nextAction: data.nextAction,
      nextActionAt: data.nextActionAt,
      status: "open",
    })
    .returning();

  await recordSystemActivity(db, {
    organizationId,
    actorId: userId,
    activityType: "opportunity_created",
    title: "Oportunidade criada",
    body: created.title,
    contactId: created.contactId,
    companyId: created.companyId,
    opportunityId: created.id,
    metadata: { stageId: created.stageId },
  });

  return created;
}

export async function updateOpportunity(
  db: Database,
  userId: string,
  organizationId: string,
  opportunityId: string,
  rawInput: unknown,
) {
  await requireCommercialWriter(db, userId, organizationId);
  const existing = await getOpportunityInOrg(db, organizationId, opportunityId);
  if (!existing) throw new Error("OPPORTUNITY_NOT_FOUND");

  const data = mapOpportunityFields(rawInput, existing.ownerId);
  await assertMemberInOrg(db, organizationId, data.ownerId);
  await assertEntityInOrg(db, organizationId, data.contactId, data.companyId);

  const ownerChanged = data.ownerId !== existing.ownerId;

  const [updated] = await db
    .update(opportunities)
    .set({
      title: data.title,
      description: data.description,
      contactId: data.contactId,
      companyId: data.companyId,
      ownerId: data.ownerId,
      source: data.source,
      productName: data.productName,
      estimatedValue: data.estimatedValue,
      proposedValue: data.proposedValue,
      probability: data.probability ?? existing.probability,
      expectedCloseDate: data.expectedCloseDate,
      nextAction: data.nextAction,
      nextActionAt: data.nextActionAt,
      updatedAt: new Date(),
    })
    .where(eq(opportunities.id, opportunityId))
    .returning();

  if (ownerChanged) {
    await recordSystemActivity(db, {
      organizationId,
      actorId: userId,
      activityType: "owner_changed",
      title: "Responsável alterado",
      opportunityId,
      contactId: updated.contactId,
      companyId: updated.companyId,
      metadata: { from: existing.ownerId, to: data.ownerId },
    });
    await notifyAssignment(db, {
      organizationId,
      actorId: userId,
      assigneeId: data.ownerId,
      type: "opportunity_assigned",
      title: `Oportunidade atribuída: ${updated.title}`,
      entityType: "opportunity",
      entityId: opportunityId,
    });
  }

  return updated;
}

export async function moveOpportunityStage(
  db: Database,
  userId: string,
  organizationId: string,
  opportunityId: string,
  stageId: string,
) {
  await requireCommercialWriter(db, userId, organizationId);
  const existing = await getOpportunityInOrg(db, organizationId, opportunityId);
  if (!existing) throw new Error("OPPORTUNITY_NOT_FOUND");
  if (existing.status !== "open") throw new Error("OPPORTUNITY_NOT_OPEN");
  if (existing.archivedAt) throw new Error("OPPORTUNITY_ARCHIVED");

  const [stage] = await db
    .select({
      id: pipelineStages.id,
      name: pipelineStages.name,
      probability: pipelineStages.probability,
      stageType: pipelineStages.stageType,
      pipelineId: pipelineStages.pipelineId,
      orgId: pipelines.organizationId,
    })
    .from(pipelineStages)
    .innerJoin(pipelines, eq(pipelines.id, pipelineStages.pipelineId))
    .where(eq(pipelineStages.id, stageId))
    .limit(1);

  if (!stage || stage.orgId !== organizationId) {
    throw new Error("STAGE_NOT_FOUND");
  }
  if (stage.pipelineId !== existing.pipelineId) {
    throw new Error("STAGE_PIPELINE_MISMATCH");
  }
  if (stage.stageType !== "open") {
    throw new Error("USE_WON_OR_LOST_FLOW");
  }

  if (existing.stageId === stageId) return existing;

  const [fromStage] = await db
    .select({ name: pipelineStages.name })
    .from(pipelineStages)
    .where(eq(pipelineStages.id, existing.stageId))
    .limit(1);

  const [updated] = await db
    .update(opportunities)
    .set({
      stageId,
      updatedAt: new Date(),
    })
    .where(eq(opportunities.id, opportunityId))
    .returning();

  await recordSystemActivity(db, {
    organizationId,
    actorId: userId,
    activityType: "stage_changed",
    title: `Etapa: ${fromStage?.name ?? "?"} → ${stage.name}`,
    opportunityId,
    contactId: updated.contactId,
    companyId: updated.companyId,
    metadata: { fromStageId: existing.stageId, toStageId: stageId },
  });

  return updated;
}

export async function markOpportunityWon(
  db: Database,
  userId: string,
  organizationId: string,
  opportunityId: string,
  rawInput: unknown,
) {
  await requireCommercialWriter(db, userId, organizationId);
  const existing = await getOpportunityInOrg(db, organizationId, opportunityId);
  if (!existing) throw new Error("OPPORTUNITY_NOT_FOUND");
  if (existing.archivedAt) throw new Error("OPPORTUNITY_ARCHIVED");

  const input = markWonSchema.parse(rawInput);
  await assertMemberInOrg(db, organizationId, input.ownerId);

  const closedValue = parseMoneyToMinorUnits(input.closedValue);
  if (closedValue === null) throw new Error("CLOSED_VALUE_REQUIRED");
  const wonAt = parseOptionalDate(input.wonAt);
  if (!wonAt) throw new Error("WON_DATE_REQUIRED");

  const pipelineData = await getPipelineById(
    db,
    userId,
    organizationId,
    existing.pipelineId,
  );
  const wonStage = pipelineData?.stages.find((s) => s.stageType === "won");
  if (!wonStage) throw new Error("WON_STAGE_NOT_FOUND");

  const [updated] = await db
    .update(opportunities)
    .set({
      status: "won",
      stageId: wonStage.id,
      closedValue,
      productName: input.productName.trim(),
      ownerId: input.ownerId,
      probability: 100,
      wonAt,
      lostAt: null,
      lossReasonId: null,
      lostNotes: null,
      updatedAt: new Date(),
    })
    .where(eq(opportunities.id, opportunityId))
    .returning();

  await recordSystemActivity(db, {
    organizationId,
    actorId: userId,
    activityType: "won",
    title: "Oportunidade ganha",
    body: input.productName,
    opportunityId,
    contactId: updated.contactId,
    companyId: updated.companyId,
    metadata: { closedValue, wonAt: wonAt.toISOString() },
  });

  return updated;
}

export async function markOpportunityLost(
  db: Database,
  userId: string,
  organizationId: string,
  opportunityId: string,
  rawInput: unknown,
) {
  await requireCommercialWriter(db, userId, organizationId);
  const existing = await getOpportunityInOrg(db, organizationId, opportunityId);
  if (!existing) throw new Error("OPPORTUNITY_NOT_FOUND");
  if (existing.archivedAt) throw new Error("OPPORTUNITY_ARCHIVED");

  const input = markLostSchema.parse(rawInput);
  const lostAt = parseOptionalDate(input.lostAt);
  if (!lostAt) throw new Error("LOST_DATE_REQUIRED");

  const [reason] = await db
    .select()
    .from(lossReasons)
    .where(
      and(
        eq(lossReasons.id, input.lossReasonId),
        eq(lossReasons.organizationId, organizationId),
        eq(lossReasons.isActive, true),
      ),
    )
    .limit(1);
  if (!reason) throw new Error("LOSS_REASON_NOT_FOUND");

  const pipelineData = await getPipelineById(
    db,
    userId,
    organizationId,
    existing.pipelineId,
  );
  const lostStage = pipelineData?.stages.find((s) => s.stageType === "lost");
  if (!lostStage) throw new Error("LOST_STAGE_NOT_FOUND");

  const [updated] = await db
    .update(opportunities)
    .set({
      status: "lost",
      stageId: lostStage.id,
      lossReasonId: reason.id,
      lostNotes: emptyToNull(input.lostNotes ?? null),
      lostAt,
      probability: 0,
      wonAt: null,
      closedValue: null,
      updatedAt: new Date(),
    })
    .where(eq(opportunities.id, opportunityId))
    .returning();

  await recordSystemActivity(db, {
    organizationId,
    actorId: userId,
    activityType: "lost",
    title: "Oportunidade perdida",
    body: reason.name,
    opportunityId,
    contactId: updated.contactId,
    companyId: updated.companyId,
    metadata: { lossReasonId: reason.id, lostAt: lostAt.toISOString() },
  });

  return updated;
}

export async function reopenOpportunity(
  db: Database,
  userId: string,
  organizationId: string,
  opportunityId: string,
) {
  const membership = await requireOrganizationMembership(
    db,
    userId,
    organizationId,
  );
  assertCanManageCommercial(membership.role);

  const existing = await getOpportunityInOrg(db, organizationId, opportunityId);
  if (!existing) throw new Error("OPPORTUNITY_NOT_FOUND");
  if (existing.status === "open") throw new Error("OPPORTUNITY_ALREADY_OPEN");

  const pipelineData = await getPipelineById(
    db,
    userId,
    organizationId,
    existing.pipelineId,
  );
  const openStages = (pipelineData?.stages ?? [])
    .filter((s) => s.stageType === "open")
    .sort((a, b) => b.position - a.position);
  const openStage = openStages[0];
  if (!openStage) throw new Error("OPEN_STAGE_NOT_FOUND");

  const [updated] = await db
    .update(opportunities)
    .set({
      status: "open",
      stageId: openStage.id,
      probability: openStage.probability,
      wonAt: null,
      lostAt: null,
      lossReasonId: null,
      lostNotes: null,
      closedValue: null,
      archivedAt: null,
      updatedAt: new Date(),
    })
    .where(eq(opportunities.id, opportunityId))
    .returning();

  await recordSystemActivity(db, {
    organizationId,
    actorId: userId,
    activityType: "reopened",
    title: "Oportunidade reaberta",
    opportunityId,
    contactId: updated.contactId,
    companyId: updated.companyId,
  });

  await recordAuditLog(db, {
    organizationId,
    actorId: userId,
    action: "opportunity.reopened",
    entityType: "opportunity",
    entityId: opportunityId,
  });

  return updated;
}

export async function archiveOpportunity(
  db: Database,
  userId: string,
  organizationId: string,
  opportunityId: string,
) {
  await requireCommercialWriter(db, userId, organizationId);
  const [updated] = await db
    .update(opportunities)
    .set({ archivedAt: new Date(), updatedAt: new Date() })
    .where(
      and(
        eq(opportunities.id, opportunityId),
        eq(opportunities.organizationId, organizationId),
        isNull(opportunities.archivedAt),
      ),
    )
    .returning();
  if (!updated) throw new Error("OPPORTUNITY_NOT_FOUND");
  return updated;
}

export async function restoreOpportunity(
  db: Database,
  userId: string,
  organizationId: string,
  opportunityId: string,
) {
  await requireCommercialWriter(db, userId, organizationId);
  const [updated] = await db
    .update(opportunities)
    .set({ archivedAt: null, updatedAt: new Date() })
    .where(
      and(
        eq(opportunities.id, opportunityId),
        eq(opportunities.organizationId, organizationId),
        isNotNull(opportunities.archivedAt),
      ),
    )
    .returning();
  if (!updated) throw new Error("OPPORTUNITY_NOT_FOUND");
  return updated;
}

export async function getOpportunityForUser(
  db: Database,
  userId: string,
  organizationId: string,
  opportunityId: string,
) {
  await requireOrganizationMembership(db, userId, organizationId);
  return getOpportunityInOrg(db, organizationId, opportunityId);
}

export type OpportunityListFilters = {
  archived?: boolean;
  status?: "open" | "won" | "lost";
  ownerId?: string;
  stageId?: string;
  pipelineId?: string;
  source?: string;
  productName?: string;
  minValue?: number;
  maxValue?: number;
  expectedCloseFrom?: Date;
  expectedCloseTo?: Date;
  withoutNextAction?: boolean;
  overdueClose?: boolean;
  overdueTask?: boolean;
  stuck?: boolean;
  wonFrom?: Date;
  wonTo?: Date;
  q?: string;
  limit?: number;
  offset?: number;
};

export async function listOpportunities(
  db: Database,
  userId: string,
  organizationId: string,
  filters: OpportunityListFilters = {},
) {
  await requireOrganizationMembership(db, userId, organizationId);

  let ownerId: string | undefined;
  if (filters.ownerId) {
    try {
      ownerId = await resolveOrgMemberFilter(db, organizationId, filters.ownerId);
    } catch {
      return [];
    }
  }

  const conditions = [eq(opportunities.organizationId, organizationId)];
  if (filters.archived) {
    conditions.push(isNotNull(opportunities.archivedAt));
  } else {
    conditions.push(isNull(opportunities.archivedAt));
  }
  if (filters.status) {
    conditions.push(eq(opportunities.status, filters.status));
  }
  if (ownerId) conditions.push(eq(opportunities.ownerId, ownerId));
  if (filters.stageId) {
    // Stage must belong to org via pipeline join — validated below by joining
    conditions.push(eq(opportunities.stageId, filters.stageId));
  }
  if (filters.pipelineId) {
    conditions.push(eq(opportunities.pipelineId, filters.pipelineId));
  }
  if (filters.source?.trim()) {
    conditions.push(ilike(opportunities.source, `%${filters.source.trim()}%`));
  }
  if (filters.productName?.trim()) {
    conditions.push(ilike(opportunities.productName, `%${filters.productName.trim()}%`));
  }
  if (filters.minValue !== undefined) {
    conditions.push(gte(opportunities.estimatedValue, filters.minValue));
  }
  if (filters.maxValue !== undefined) {
    conditions.push(lte(opportunities.estimatedValue, filters.maxValue));
  }
  if (filters.expectedCloseFrom) {
    conditions.push(gte(opportunities.expectedCloseDate, filters.expectedCloseFrom));
  }
  if (filters.expectedCloseTo) {
    conditions.push(lt(opportunities.expectedCloseDate, filters.expectedCloseTo));
  }
  if (filters.wonFrom) {
    conditions.push(gte(opportunities.wonAt, filters.wonFrom));
  }
  if (filters.wonTo) {
    conditions.push(lt(opportunities.wonAt, filters.wonTo));
  }
  if (filters.q?.trim()) {
    const term = `%${filters.q.trim()}%`;
    conditions.push(
      or(ilike(opportunities.title, term), ilike(opportunities.productName, term))!,
    );
  }
  if (filters.withoutNextAction) {
    const [org] = await db
      .select({ timezone: organizations.timezone })
      .from(organizations)
      .where(eq(organizations.id, organizationId))
      .limit(1);
    const todayStart = startOfZonedDay(
      new Date(),
      org?.timezone ?? "America/Sao_Paulo",
    );
    conditions.push(or(isNull(opportunities.nextAction), eq(opportunities.nextAction, ""))!);
    conditions.push(isNull(opportunities.nextActionAt));
    conditions.push(
      notExists(
        db
          .select({ id: tasks.id })
          .from(tasks)
          .where(
            and(
              eq(tasks.opportunityId, opportunities.id),
              eq(tasks.organizationId, organizationId),
              eq(tasks.status, "open"),
              or(isNull(tasks.dueAt), gte(tasks.dueAt, todayStart)),
            ),
          ),
      ),
    );
  }
  if (filters.overdueClose) {
    conditions.push(isNotNull(opportunities.expectedCloseDate));
    conditions.push(lt(opportunities.expectedCloseDate, new Date()));
  }
  if (filters.overdueTask) {
    conditions.push(
      exists(
        db
          .select({ id: tasks.id })
          .from(tasks)
          .where(
            and(
              eq(tasks.opportunityId, opportunities.id),
              eq(tasks.organizationId, organizationId),
              eq(tasks.status, "open"),
              isNotNull(tasks.dueAt),
              lt(tasks.dueAt, new Date()),
            ),
          ),
      ),
    );
  }

  // If stage filter provided, ensure stage belongs to this org
  if (filters.stageId) {
    const [stage] = await db
      .select({ id: pipelineStages.id, orgId: pipelines.organizationId })
      .from(pipelineStages)
      .innerJoin(pipelines, eq(pipelines.id, pipelineStages.pipelineId))
      .where(eq(pipelineStages.id, filters.stageId))
      .limit(1);
    if (!stage || stage.orgId !== organizationId) {
      return [];
    }
  }
  if (filters.pipelineId) {
    const [pipe] = await db
      .select({ id: pipelines.id })
      .from(pipelines)
      .where(
        and(
          eq(pipelines.id, filters.pipelineId),
          eq(pipelines.organizationId, organizationId),
        ),
      )
      .limit(1);
    if (!pipe) return [];
  }

  let query = db
    .select({
      id: opportunities.id,
      title: opportunities.title,
      stageId: opportunities.stageId,
      stageName: pipelineStages.name,
      pipelineId: opportunities.pipelineId,
      status: opportunities.status,
      source: opportunities.source,
      productName: opportunities.productName,
      estimatedValue: opportunities.estimatedValue,
      proposedValue: opportunities.proposedValue,
      closedValue: opportunities.closedValue,
      probability: opportunities.probability,
      ownerId: opportunities.ownerId,
      ownerName: users.name,
      contactId: opportunities.contactId,
      contactFirstName: contacts.firstName,
      contactLastName: contacts.lastName,
      companyId: opportunities.companyId,
      companyName: companies.name,
      nextAction: opportunities.nextAction,
      nextActionAt: opportunities.nextActionAt,
      expectedCloseDate: opportunities.expectedCloseDate,
      wonAt: opportunities.wonAt,
      lostAt: opportunities.lostAt,
      lossReasonName: lossReasons.name,
      lostNotes: opportunities.lostNotes,
      archivedAt: opportunities.archivedAt,
      updatedAt: opportunities.updatedAt,
      createdAt: opportunities.createdAt,
      lastActivityAt: sql<Date | null>`(
        SELECT MAX(a.occurred_at) FROM activities a
        WHERE a.opportunity_id = ${opportunities.id}
          AND a.organization_id = ${organizationId}
      )`,
    })
    .from(opportunities)
    .innerJoin(pipelineStages, eq(pipelineStages.id, opportunities.stageId))
    .leftJoin(users, eq(users.id, opportunities.ownerId))
    .leftJoin(contacts, eq(contacts.id, opportunities.contactId))
    .leftJoin(companies, eq(companies.id, opportunities.companyId))
    .leftJoin(lossReasons, eq(lossReasons.id, opportunities.lossReasonId))
    .where(and(...conditions))
    .orderBy(desc(opportunities.updatedAt))
    .$dynamic();

  if (filters.limit !== undefined) {
    query = query.limit(filters.limit);
  }
  if (filters.offset !== undefined) {
    query = query.offset(filters.offset);
  }

  const rows = await query;

  if (!filters.stuck) return rows;

  const now = new Date();
  return rows.filter((row) =>
    isOpportunityStuck({
      stageName: row.stageName,
      lastActivityAt: row.lastActivityAt,
      updatedAt: row.updatedAt,
      now,
    }),
  );
}

export async function listLossReasons(
  db: Database,
  userId: string,
  organizationId: string,
) {
  await requireOrganizationMembership(db, userId, organizationId);
  return db
    .select()
    .from(lossReasons)
    .where(
      and(
        eq(lossReasons.organizationId, organizationId),
        eq(lossReasons.isActive, true),
      ),
    )
    .orderBy(asc(lossReasons.position));
}

export async function listOrganizationMembersForSelect(
  db: Database,
  userId: string,
  organizationId: string,
) {
  await requireOrganizationMembership(db, userId, organizationId);
  return db
    .select({
      userId: users.id,
      name: users.name,
      email: users.email,
      role: organizationMembers.role,
    })
    .from(organizationMembers)
    .innerJoin(users, eq(users.id, organizationMembers.userId))
    .where(
      and(
        eq(organizationMembers.organizationId, organizationId),
        eq(organizationMembers.status, "active"),
      ),
    )
    .orderBy(asc(users.name));
}
