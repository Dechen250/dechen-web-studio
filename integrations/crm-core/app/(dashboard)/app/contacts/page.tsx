import Link from "next/link";
import { ContactsCsvImport } from "@/features/contacts/components/contacts-csv-import";
import { listContacts } from "@/features/contacts/queries";
import { archiveContactAction, restoreContactAction } from "@/features/contacts/actions";
import { Button, EmptyState, PageHeader } from "@/components/ui/forms";
import {
  DataTable,
  Panel,
  dataTableCellClass,
  dataTableLinkClass,
} from "@/components/ui/lightning";
import { db } from "@/lib/db";
import { requireActiveOrganization } from "@/server/session";

const filterInputClass =
  "rounded-xl border border-border bg-surface px-3 py-1.5 text-sm text-text outline-none ring-brand/30 focus:border-brand focus:ring-2";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    archived?: string;
    status?: string;
    ownerId?: string;
    companyId?: string;
    source?: string;
  }>;
}) {
  const params = await searchParams;
  const { user, organizationId } = await requireActiveOrganization();
  const archived = params.archived === "1";
  const { listOrganizationMembersForSelect } = await import(
    "@/features/opportunities/queries"
  );
  const { listCompanies } = await import("@/features/companies/queries");
  const [contacts, members, companies] = await Promise.all([
    listContacts(db, user.id, organizationId, {
      q: params.q,
      status: params.status,
      archived,
      ownerId: params.ownerId,
      companyId: params.companyId,
      source: params.source,
    }),
    listOrganizationMembersForSelect(db, user.id, organizationId),
    listCompanies(db, user.id, organizationId, { limit: 200 }),
  ]);

  return (
    <div>
      <PageHeader
        title="Contatos"
        description="Leads e clientes da organização ativa."
        actions={
          <>
            <Link
              href={archived ? "/app/contacts" : "/app/contacts?archived=1"}
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-text hover:bg-page"
            >
              {archived ? "Ver ativos" : "Ver arquivados"}
            </Link>
            <Link
              href="/app/contacts/new"
              className="inline-flex items-center justify-center rounded-full bg-brand px-3.5 py-1.5 text-sm font-medium text-white hover:bg-brand-dark"
            >
              Novo contato
            </Link>
          </>
        }
      />

      <ContactsCsvImport />

      <Panel className="mb-4">
        <form className="flex flex-wrap gap-2">
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Buscar nome, e-mail ou telefone"
            className={`min-w-64 flex-1 ${filterInputClass}`}
          />
          <select
            name="status"
            defaultValue={params.status ?? ""}
            className={filterInputClass}
          >
            <option value="">Todos os status</option>
            <option value="lead">Lead</option>
            <option value="active">Ativo</option>
            <option value="customer">Cliente</option>
            <option value="inactive">Inativo</option>
          </select>
          <select
            name="ownerId"
            defaultValue={params.ownerId ?? ""}
            className={filterInputClass}
          >
            <option value="">Responsável</option>
            {members.map((m) => (
              <option key={m.userId} value={m.userId}>
                {m.name}
              </option>
            ))}
          </select>
          <select
            name="companyId"
            defaultValue={params.companyId ?? ""}
            className={filterInputClass}
          >
            <option value="">Empresa</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            name="source"
            defaultValue={params.source}
            placeholder="Origem"
            className={filterInputClass}
          />
          {archived ? <input type="hidden" name="archived" value="1" /> : null}
          <Button type="submit">Filtrar</Button>
        </form>
      </Panel>

      {contacts.length === 0 ? (
        <EmptyState
          title={archived ? "Nenhum contato arquivado" : "Nenhum contato ainda"}
          description="Cadastre o primeiro lead para iniciar o fluxo comercial."
          action={
            <Link href="/app/contacts/new" className="text-sm font-medium text-brand hover:text-brand-dark">
              Criar contato
            </Link>
          }
        />
      ) : (
        <DataTable
          headers={["Nome", "Empresa", "E-mail", "Telefone", "Status", "Ações"]}
        >
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className={dataTableCellClass()}>
                <Link
                  href={`/app/contacts/${contact.id}`}
                  className={dataTableLinkClass()}
                >
                  {contact.firstName} {contact.lastName}
                </Link>
              </td>
              <td className={dataTableCellClass()}>{contact.companyName ?? "—"}</td>
              <td className={dataTableCellClass()}>{contact.email ?? "—"}</td>
              <td className={dataTableCellClass()}>{contact.phone ?? "—"}</td>
              <td className={dataTableCellClass()}>{contact.status}</td>
              <td className={dataTableCellClass()}>
                <form
                  action={async () => {
                    "use server";
                    if (archived) await restoreContactAction(contact.id);
                    else await archiveContactAction(contact.id);
                  }}
                >
                  <button
                    type="submit"
                    className="text-xs text-text-muted hover:text-text hover:underline"
                  >
                    {archived ? "Restaurar" : "Arquivar"}
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
