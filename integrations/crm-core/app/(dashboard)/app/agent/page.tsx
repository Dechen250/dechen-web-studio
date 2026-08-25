import Link from "next/link";
import { runAgentAction } from "@/features/agent/actions";
import { listAgentRuns } from "@/features/agent/queries";
import { listContacts } from "@/features/contacts/queries";
import { listCompanies } from "@/features/companies/queries";
import { Button, EmptyState, PageHeader } from "@/components/ui/forms";
import {
  DataTable,
  Panel,
  dataTableCellClass,
  dataTableLinkClass,
} from "@/components/ui/lightning";
import { db } from "@/lib/db";
import { requireActiveOrganization } from "@/server/session";

function statusLabel(status: string): string {
  if (status === "queued") return "na fila";
  if (status === "running") return "rodando";
  if (status === "done") return "pronto";
  if (status === "error") return "erro";
  return status;
}

function formatWhen(value: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(value);
}

export default async function AgentPage() {
  const { user, organizationId } = await requireActiveOrganization();
  const [runs, contacts, companies] = await Promise.all([
    listAgentRuns(db, user.id, organizationId, { limit: 40 }),
    listContacts(db, user.id, organizationId, { limit: 200 }),
    listCompanies(db, user.id, organizationId, { limit: 200 }),
  ]);

  return (
    <div>
      <PageHeader
        title="Agente"
        description="Prepara o rascunho de Descoberta e lê o site da empresa. O resultado fica no contato, na empresa e neste histórico."
      />

      <Panel title="Rodar agora" className="mb-4">
        <form action={runAgentAction} className="grid gap-3 md:grid-cols-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted">
            Contato
            <select
              name="contactId"
              className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text"
            >
              <option value="">Selecionar…</option>
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.id}>
                  {contact.firstName} {contact.lastName ?? ""}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted">
            Empresa
            <select
              name="companyId"
              className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text"
            >
              <option value="">Selecionar…</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted">
            Site (opcional)
            <input
              name="website"
              placeholder="https://empresa.com.br"
              className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text"
            />
          </label>
          <div className="flex items-end">
            <Button type="submit">Rodar agente</Button>
          </div>
        </form>
      </Panel>

      {runs.length === 0 ? (
        <EmptyState
          title="Nenhuma execução ainda"
          description="Abra um contato ou empresa e aperte Rodar agente. Leads do site também disparam sozinhos."
        />
      ) : (
        <DataTable headers={["Quando", "Título", "Status", "Site"]}>
          {runs.map((run) => (
            <tr key={run.id}>
              <td className={dataTableCellClass()}>{formatWhen(run.createdAt)}</td>
              <td className={dataTableCellClass()}>
                <Link href={`/app/agent/${run.id}`} className={dataTableLinkClass()}>
                  {run.title}
                </Link>
              </td>
              <td className={dataTableCellClass()}>
                {statusLabel(run.status)}
                {run.error ? ` · ${run.error.slice(0, 80)}` : ""}
              </td>
              <td className={dataTableCellClass()}>{run.website ?? "—"}</td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
