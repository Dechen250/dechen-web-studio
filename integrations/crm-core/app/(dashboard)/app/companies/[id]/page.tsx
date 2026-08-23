import Link from "next/link";
import { notFound } from "next/navigation";
import { AgentPanel } from "@/features/agent/components/agent-panel";
import { ActivityForm, ActivityTimeline } from "@/features/activities/components/activity-ui";
import { listActivities } from "@/features/activities/queries";
import {
  archiveCompanyAction,
  restoreCompanyAction,
} from "@/features/companies/actions";
import { CompanyForm } from "@/features/companies/components/company-form";
import { getCompanyForUser } from "@/features/companies/queries";
import { listContacts } from "@/features/contacts/queries";
import {
  listOpportunities,
  listOrganizationMembersForSelect,
} from "@/features/opportunities/queries";
import { listCommentsForEntity } from "@/features/comments/queries";
import { CommentsPanel } from "@/features/comments/components/comments-panel";
import { can } from "@/lib/auth/policy";
import { Button } from "@/components/ui/forms";
import { Panel, RecordHeader, dataTableLinkClass } from "@/components/ui/lightning";
import { db } from "@/lib/db";
import { requireActiveOrganization } from "@/server/session";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user, organizationId, membership } = await requireActiveOrganization();
  const company = await getCompanyForUser(db, user.id, organizationId, id);
  if (!company) notFound();

  const [members, contacts, opportunities, activities, comments] = await Promise.all([
    listOrganizationMembersForSelect(db, user.id, organizationId),
    listContacts(db, user.id, organizationId),
    listOpportunities(db, user.id, organizationId),
    listActivities(db, user.id, organizationId, { companyId: id }),
    listCommentsForEntity(db, user.id, organizationId, "company", id),
  ]);

  const linkedContacts = contacts.filter((c) => c.companyId === id);
  const linkedOpps = opportunities.filter((o) => o.companyId === id);

  return (
    <div className="space-y-4">
      <RecordHeader
        subtitle="Empresa"
        title={company.name}
        meta={company.industry ?? company.website ?? undefined}
        actions={
          <form
            action={async () => {
              "use server";
              if (company.archivedAt) await restoreCompanyAction(company.id);
              else await archiveCompanyAction(company.id);
            }}
          >
            <Button type="submit" variant="secondary">
              {company.archivedAt ? "Restaurar" : "Arquivar"}
            </Button>
          </form>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Dados">
          <CompanyForm
            mode="edit"
            companyId={company.id}
            members={members.map((m) => ({ value: m.userId, label: m.name }))}
            defaults={{
              name: company.name,
              website: company.website ?? undefined,
              industry: company.industry ?? undefined,
              phone: company.phone ?? undefined,
              email: company.email ?? undefined,
              city: company.city ?? undefined,
              state: company.state ?? undefined,
              country: company.country ?? undefined,
              notes: company.notes ?? undefined,
              ownerId: company.ownerId ?? user.id,
            }}
          />
        </Panel>

        <div className="space-y-4">
          <AgentPanel companyId={company.id} website={company.website} />

          <Panel title="Contatos">
            <ul className="space-y-2 text-sm">
              {linkedContacts.length === 0 ? (
                <li className="text-text-muted">Nenhum contato vinculado.</li>
              ) : (
                linkedContacts.map((contact) => (
                  <li key={contact.id}>
                    <Link href={`/app/contacts/${contact.id}`} className={dataTableLinkClass()}>
                      {contact.firstName} {contact.lastName}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </Panel>

          <Panel title="Oportunidades">
            <ul className="space-y-2 text-sm">
              {linkedOpps.length === 0 ? (
                <li className="text-text-muted">Nenhuma oportunidade.</li>
              ) : (
                linkedOpps.map((opp) => (
                  <li key={opp.id}>
                    <Link href={`/app/opportunities/${opp.id}`} className={dataTableLinkClass()}>
                      {opp.title}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </Panel>

          <ActivityForm companyId={company.id} />

          <Panel>
            <CommentsPanel
              entityType="company"
              entityId={company.id}
              comments={comments}
              currentUserId={user.id}
              canWrite={can(membership.role, "comments.write")}
              canModerate={can(membership.role, "comments.moderate")}
            />
          </Panel>

          <Panel title="Atividades">
            <ActivityTimeline items={activities} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
