import Link from "next/link";
import { notFound } from "next/navigation";
import { AgentPanel } from "@/features/agent/components/agent-panel";
import { ActivityForm, ActivityTimeline } from "@/features/activities/components/activity-ui";
import { listActivities } from "@/features/activities/queries";
import {
  archiveContactAction,
  restoreContactAction,
} from "@/features/contacts/actions";
import { ContactForm } from "@/features/contacts/components/contact-form";
import { getContactForUser } from "@/features/contacts/queries";
import { listCompanies } from "@/features/companies/queries";
import {
  listOpportunities,
  listOrganizationMembersForSelect,
} from "@/features/opportunities/queries";
import { listTasks } from "@/features/tasks/queries";
import { listCommentsForEntity } from "@/features/comments/queries";
import { CommentsPanel } from "@/features/comments/components/comments-panel";
import { can } from "@/lib/auth/policy";
import { Button } from "@/components/ui/forms";
import { Panel, RecordHeader, dataTableLinkClass } from "@/components/ui/lightning";
import { db } from "@/lib/db";
import { requireActiveOrganization } from "@/server/session";

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user, organizationId, membership } = await requireActiveOrganization();
  const contact = await getContactForUser(db, user.id, organizationId, id);
  if (!contact) notFound();

  const [companies, members, activities, opportunities, tasks, comments] =
    await Promise.all([
    listCompanies(db, user.id, organizationId),
    listOrganizationMembersForSelect(db, user.id, organizationId),
    listActivities(db, user.id, organizationId, { contactId: id }),
    listOpportunities(db, user.id, organizationId),
    listTasks(db, user.id, organizationId, { contactId: id }),
    listCommentsForEntity(db, user.id, organizationId, "contact", id),
  ]);

  const relatedOpps = opportunities.filter((item) => item.contactId === id);
  const companyWebsite = companies.find((item) => item.id === contact.companyId)?.website;

  return (
    <div className="space-y-4">
      <RecordHeader
        subtitle="Contato"
        title={`${contact.firstName} ${contact.lastName ?? ""}`.trim()}
        meta={contact.email ?? contact.phone ?? "Sem contato digital"}
        actions={
          <form
            action={async () => {
              "use server";
              if (contact.archivedAt) await restoreContactAction(contact.id);
              else await archiveContactAction(contact.id);
            }}
          >
            <Button type="submit" variant="secondary">
              {contact.archivedAt ? "Restaurar" : "Arquivar"}
            </Button>
          </form>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Dados">
          <ContactForm
            mode="edit"
            contactId={contact.id}
            companies={companies.map((c) => ({ value: c.id, label: c.name }))}
            members={members.map((m) => ({ value: m.userId, label: m.name }))}
            defaults={{
              firstName: contact.firstName,
              lastName: contact.lastName ?? undefined,
              email: contact.email ?? undefined,
              phone: contact.phone ?? undefined,
              whatsapp: contact.whatsapp ?? undefined,
              jobTitle: contact.jobTitle ?? undefined,
              companyId: contact.companyId ?? undefined,
              ownerId: contact.ownerId ?? user.id,
              source: contact.source ?? undefined,
              status: contact.status,
              notes: contact.notes ?? undefined,
            }}
          />
        </Panel>

        <div className="space-y-4">
          <AgentPanel
            contactId={contact.id}
            companyId={contact.companyId ?? undefined}
            website={companyWebsite}
          />

          <Panel
            title="Oportunidades"
            actions={
              <Link
                href={`/app/opportunities/new?contactId=${contact.id}`}
                className="text-sm font-medium text-brand hover:text-brand-dark"
              >
                Nova
              </Link>
            }
          >
            <ul className="space-y-2 text-sm">
              {relatedOpps.length === 0 ? (
                <li className="text-text-muted">Nenhuma oportunidade vinculada.</li>
              ) : (
                relatedOpps.map((opp) => (
                  <li key={opp.id}>
                    <Link href={`/app/opportunities/${opp.id}`} className={dataTableLinkClass()}>
                      {opp.title}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </Panel>

          <Panel title="Tarefas">
            <ul className="space-y-2 text-sm">
              {tasks.length === 0 ? (
                <li className="text-text-muted">Nenhuma tarefa.</li>
              ) : (
                tasks.map((task) => (
                  <li key={task.id}>
                    {task.title} · {task.status}
                  </li>
                ))
              )}
            </ul>
          </Panel>

          <Panel>
            <CommentsPanel
              entityType="contact"
              entityId={contact.id}
              comments={comments}
              currentUserId={user.id}
              canWrite={can(membership.role, "comments.write")}
              canModerate={can(membership.role, "comments.moderate")}
            />
          </Panel>

          <ActivityForm contactId={contact.id} />

          <Panel title="Histórico">
            <ActivityTimeline items={activities} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
