import Link from "next/link";
import { runAgentAction } from "@/features/agent/actions";
import { Button } from "@/components/ui/forms";
import { Panel } from "@/components/ui/lightning";

export function AgentPanel({
  contactId,
  companyId,
  website,
  recentHref,
}: {
  contactId?: string;
  companyId?: string;
  website?: string | null;
  recentHref?: string;
}) {
  return (
    <Panel
      title="Agente"
      actions={
        <Link href={recentHref ?? "/app/agent"} className="text-sm font-medium text-brand hover:text-brand-dark">
          Ver execuções
        </Link>
      }
    >
      <p className="mb-3 text-sm text-text-muted">
        Função do CRM: lê o site, monta o rascunho de Descoberta e grava no histórico
        deste registro. Orçamento e prazo ficam para a reunião.
      </p>
      <form action={runAgentAction} className="flex flex-wrap items-end gap-2">
        {contactId ? <input type="hidden" name="contactId" value={contactId} /> : null}
        {companyId ? <input type="hidden" name="companyId" value={companyId} /> : null}
        <label className="min-w-48 flex-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted">
          Site
          <input
            name="website"
            defaultValue={website ?? ""}
            placeholder="https://empresa.com.br"
            className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <Button type="submit">Rodar agente</Button>
      </form>
    </Panel>
  );
}
