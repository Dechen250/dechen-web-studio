import { notFound } from "next/navigation";
import { listActivities } from "@/features/activities/queries";
import { listCompanies } from "@/features/companies/queries";
import { listContacts } from "@/features/contacts/queries";
import {
  archiveOpportunityAction,
  reopenOpportunityAction,
  restoreOpportunityAction,
} from "@/features/opportunities/actions";
import { OpportunityDealView } from "@/features/opportunities/components/opportunity-deal-view";
import {
  getOpportunityForUser,
  listLossReasons,
  listOrganizationMembersForSelect,
} from "@/features/opportunities/queries";
import { listProducts } from "@/features/products/queries";
import { getPipelineById } from "@/features/pipelines/queries";
import { listTasks } from "@/features/tasks/queries";
import { listCommentsForEntity } from "@/features/comments/queries";
import { can } from "@/lib/auth/policy";
import { Button } from "@/components/ui/forms";
import { db } from "@/lib/db";
import { requireActiveOrganization } from "@/server/session";

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user, organizationId, membership } = await requireActiveOrganization();
  const opportunity = await getOpportunityForUser(db, user.id, organizationId, id);
  if (!opportunity) notFound();

  const [
    contacts,
    companies,
    members,
    pipeline,
    products,
    activities,
    tasks,
    reasons,
    comments,
  ] = await Promise.all([
    listContacts(db, user.id, organizationId),
    listCompanies(db, user.id, organizationId),
    listOrganizationMembersForSelect(db, user.id, organizationId),
    getPipelineById(db, user.id, organizationId, opportunity.pipelineId),
    listProducts(db, user.id, organizationId, { activeOnly: true }),
    listActivities(db, user.id, organizationId, { opportunityId: id }),
    listTasks(db, user.id, organizationId, { opportunityId: id }),
    listLossReasons(db, user.id, organizationId),
    listCommentsForEntity(db, user.id, organizationId, "opportunity", id),
  ]);

  const stages = pipeline?.stages ?? [];
  const stageName = stages.find((s) => s.id === opportunity.stageId)?.name ?? "—";
  const linkedContact = contacts.find((item) => item.id === opportunity.contactId);
  const linkedCompany = companies.find((item) => item.id === opportunity.companyId);
  const ownerName =
    members.find((item) => item.userId === opportunity.ownerId)?.name ?? "—";
  const canReopen =
    opportunity.status !== "open" &&
    ["manager", "admin", "owner"].includes(membership.role);
  const todayDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {canReopen ? (
          <form
            action={async () => {
              "use server";
              await reopenOpportunityAction(opportunity.id);
            }}
          >
            <Button type="submit" variant="secondary">
              Reabrir
            </Button>
          </form>
        ) : null}
        <form
          action={async () => {
            "use server";
            if (opportunity.archivedAt) {
              await restoreOpportunityAction(opportunity.id);
            } else {
              await archiveOpportunityAction(opportunity.id);
            }
          }}
        >
          <Button type="submit" variant="ghost">
            {opportunity.archivedAt ? "Restaurar" : "Arquivar"}
          </Button>
        </form>
      </div>

      <OpportunityDealView
        opportunityId={opportunity.id}
        title={opportunity.title}
        stageName={stageName}
        pipelineId={opportunity.pipelineId}
        todayDate={todayDate}
        currentUserId={user.id}
        canWriteComments={can(membership.role, "comments.write")}
        canModerateComments={can(membership.role, "comments.moderate")}
        createdAt={opportunity.createdAt.toISOString()}
        stages={stages.map((stage) => ({
          id: stage.id,
          name: stage.name,
          position: stage.position,
          stageType: stage.stageType,
        }))}
        contactSummary={
          linkedContact
            ? {
                id: linkedContact.id,
                name: `${linkedContact.firstName} ${linkedContact.lastName ?? ""}`.trim(),
                email: linkedContact.email,
                phone: linkedContact.phone,
              }
            : null
        }
        companySummary={
          linkedCompany
            ? {
                id: linkedCompany.id,
                name: linkedCompany.name,
                website: linkedCompany.website,
                email: linkedCompany.email,
                phone: linkedCompany.phone,
              }
            : null
        }
        ownerName={ownerName}
        opportunity={{
          title: opportunity.title,
          description: opportunity.description,
          pipelineId: opportunity.pipelineId,
          contactId: opportunity.contactId,
          companyId: opportunity.companyId,
          ownerId: opportunity.ownerId,
          stageId: opportunity.stageId,
          source: opportunity.source,
          productName: opportunity.productName,
          estimatedValue: opportunity.estimatedValue,
          proposedValue: opportunity.proposedValue,
          closedValue: opportunity.closedValue,
          probability: opportunity.probability,
          expectedCloseDate: opportunity.expectedCloseDate,
          nextAction: opportunity.nextAction,
          nextActionAt: opportunity.nextActionAt,
          status: opportunity.status,
          wonAt: opportunity.wonAt,
          lostAt: opportunity.lostAt,
          lostNotes: opportunity.lostNotes,
          lossReasonName: opportunity.lossReasonName,
        }}
        contacts={contacts.map((c) => ({
          value: c.id,
          label: `${c.firstName} ${c.lastName ?? ""}`.trim(),
        }))}
        companies={companies.map((c) => ({ value: c.id, label: c.name }))}
        members={members.map((m) => ({ value: m.userId, label: m.name }))}
        products={products.map((product) => ({
          value: product.name,
          label: product.name,
        }))}
        reasons={reasons.map((r) => ({ value: r.id, label: r.name }))}
        tasks={tasks.map((task) => ({
          id: task.id,
          title: task.title,
          status: task.status,
          dueAt: task.dueAt?.toISOString() ?? null,
          assigneeId: task.assigneeId,
          taskType: task.taskType,
        }))}
        activities={activities.map((item) => ({
          id: item.id,
          title: item.title,
          body: item.body,
          activityType: item.activityType,
          isSystem: item.isSystem,
          occurredAt: item.occurredAt.toISOString(),
        }))}
        comments={comments}
      />
    </div>
  );
}
