import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgentRunForUser } from "@/features/agent/queries";
import { Button, PageHeader } from "@/components/ui/forms";
import { Panel } from "@/components/ui/lightning";
import { db } from "@/lib/db";
import { requireActiveOrganization } from "@/server/session";

function statusLabel(status: string): string {
  if (status === "queued") return "na fila";
  if (status === "running") return "rodando";
  if (status === "done") return "pronto";
  if (status === "error") return "erro";
  return status;
}

export default async function AgentRunPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user, organizationId } = await requireActiveOrganization();
  const run = await getAgentRunForUser(db, user.id, organizationId, id);
  if (!run) notFound();

  return (
    <div className="space-y-4">
      <PageHeader
        title={run.title}
        description={`${statusLabel(run.status)}${run.website ? ` · ${run.website}` : ""}`}
        actions={
          <>
            <Link
              href="/app/agent"
              className="inline-flex items-center justify-center rounded-sm border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-text hover:bg-page"
            >
              Todas as execuções
            </Link>
            {run.contactId ? (
              <Link href={`/app/contacts/${run.contactId}`}>
                <Button type="button" variant="secondary">
                  Abrir contato
                </Button>
              </Link>
            ) : null}
            {run.companyId ? (
              <Link href={`/app/companies/${run.companyId}`}>
                <Button type="button" variant="secondary">
                  Abrir empresa
                </Button>
              </Link>
            ) : null}
          </>
        }
      />

      {run.error ? (
        <Panel title="Erro">
          <p className="text-sm text-danger">{run.error}</p>
        </Panel>
      ) : null}

      <Panel title="Contatos encontrados">
        {run.findings?.contacts?.length ? (
          <ul className="space-y-2 text-sm">
            {run.findings.contacts.map((item) => (
              <li key={item.id}>
                <Link href={`/app/contacts/${item.id}`} className="font-semibold text-brand hover:underline">
                  {item.name}
                </Link>
                <span className="text-text-muted">
                  {" "}
                  · {item.created ? "criado" : "atualizado"}
                  {item.email ? ` · ${item.email}` : ""}
                  {item.phone ? ` · ${item.phone}` : ""}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-text-muted">
            Nenhum e-mail, telefone ou WhatsApp público gravado nesta execução.
          </p>
        )}
        {run.findings?.opportunityId ? (
          <p className="mt-3 text-sm">
            <Link
              href={`/app/opportunities/${run.findings.opportunityId}`}
              className="font-semibold text-brand hover:underline"
            >
              Abrir negociação no funil
            </Link>
          </p>
        ) : null}
      </Panel>

      <Panel title="Rascunho">
        {run.markdown ? (
          <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap font-mono text-sm text-text">
            {run.markdown}
          </pre>
        ) : (
          <p className="text-sm text-text-muted">Ainda sem rascunho. Atualize em instantes.</p>
        )}
      </Panel>
    </div>
  );
}
