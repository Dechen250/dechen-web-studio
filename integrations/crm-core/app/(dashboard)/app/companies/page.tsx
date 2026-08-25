import Link from "next/link";
import { listCompanies } from "@/features/companies/queries";
import {
  archiveCompanyAction,
  restoreCompanyAction,
} from "@/features/companies/actions";
import { Button, EmptyState, PageHeader } from "@/components/ui/forms";
import {
  DataTable,
  Panel,
  dataTableCellClass,
  dataTableLinkClass,
} from "@/components/ui/lightning";
import { SettingsNav } from "@/components/ui/settings-nav";
import { db } from "@/lib/db";
import { requireActiveOrganization } from "@/server/session";

const filterInputClass =
  "rounded-xl border border-border bg-surface px-3 py-1.5 text-sm text-text outline-none ring-brand/30 focus:border-brand focus:ring-2";

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; archived?: string; ownerId?: string; industry?: string }>;
}) {
  const params = await searchParams;
  const { user, organizationId } = await requireActiveOrganization();
  const archived = params.archived === "1";
  const { listOrganizationMembersForSelect } = await import(
    "@/features/opportunities/queries"
  );
  const [companies, members] = await Promise.all([
    listCompanies(db, user.id, organizationId, {
      q: params.q,
      archived,
      ownerId: params.ownerId,
      industry: params.industry,
    }),
    listOrganizationMembersForSelect(db, user.id, organizationId),
  ]);

  return (
    <div>
      <SettingsNav />
      <PageHeader
        title="Empresas"
        description="Contas vinculadas aos contatos."
        actions={
          <>
            <Link
              href={archived ? "/app/companies" : "/app/companies?archived=1"}
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-text hover:bg-page"
            >
              {archived ? "Ver ativas" : "Ver arquivadas"}
            </Link>
            <Link
              href="/app/companies/new"
              className="inline-flex items-center justify-center rounded-full bg-brand px-3.5 py-1.5 text-sm font-medium text-white hover:bg-brand-dark"
            >
              Nova empresa
            </Link>
          </>
        }
      />

      <Panel className="mb-4">
        <form className="flex flex-wrap gap-2">
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Buscar empresa"
            className={`min-w-64 flex-1 ${filterInputClass}`}
          />
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
          <input
            name="industry"
            defaultValue={params.industry}
            placeholder="Setor"
            className={filterInputClass}
          />
          {archived ? <input type="hidden" name="archived" value="1" /> : null}
          <Button type="submit">Filtrar</Button>
        </form>
      </Panel>

      {companies.length === 0 ? (
        <EmptyState
          title="Nenhuma empresa"
          description="Crie uma empresa para vincular contatos e oportunidades."
          action={
            <Link href="/app/companies/new" className="text-sm font-medium text-brand hover:text-brand-dark">
              Criar empresa
            </Link>
          }
        />
      ) : (
        <DataTable
          headers={["Nome", "E-mail", "Telefone", "Cidade", "Ações"]}
        >
          {companies.map((company) => (
            <tr key={company.id}>
              <td className={dataTableCellClass()}>
                <Link
                  href={`/app/companies/${company.id}`}
                  className={dataTableLinkClass()}
                >
                  {company.name}
                </Link>
              </td>
              <td className={dataTableCellClass()}>{company.email ?? "—"}</td>
              <td className={dataTableCellClass()}>{company.phone ?? "—"}</td>
              <td className={dataTableCellClass()}>{company.city ?? "—"}</td>
              <td className={dataTableCellClass()}>
                <form
                  action={async () => {
                    "use server";
                    if (archived) await restoreCompanyAction(company.id);
                    else await archiveCompanyAction(company.id);
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
