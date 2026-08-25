import Link from "next/link";

import { listJobs, listLeads } from "@/lib/ops/store";

export const dynamic = "force-dynamic";

function statusLabel(status: string): string {
  if (status === "queued") return "na fila";
  if (status === "running") return "rodando";
  if (status === "done") return "pronto";
  if (status === "error") return "erro";
  return status;
}

function formatWhen(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

export default async function OpsHomePage() {
  const [leads, audits, discoveries] = await Promise.all([
    listLeads(8),
    listJobs("audit", 8),
    listJobs("discovery", 8),
  ]);

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-8 md:px-8 md:py-10">
      <header className="space-y-2">
        <h1 className="font-sans text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          Console
        </h1>
        <p className="max-w-2xl text-base text-[#A1A1AA]">
          Console interno da DWS. O CRM recebe os leads do site em Contatos e
          Empresas. Isto aqui é só ferramenta da agência (Chrome ao vivo).
        </p>
        <p className="max-w-2xl text-sm text-[#A1A1AA]">
          Abra{" "}
          <a
            href="https://crm.dechenwebstudio.com.br/app/contacts"
            className="text-[#5ec8f2] underline-offset-2 hover:underline"
          >
            crm.dechenwebstudio.com.br/app/contacts
          </a>
          .
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <Link
          href="/ops/audit"
          className="rounded-[24px] border border-[#262626] bg-[#101010] p-5 hover:border-[#0070F3]"
        >
          <p className="text-sm text-[#A1A1AA]">Auditoria</p>
          <p className="mt-2 text-xl font-medium">Chrome ao vivo</p>
        </Link>
        <Link
          href="/ops/discovery"
          className="rounded-[24px] border border-[#262626] bg-[#101010] p-5 hover:border-[#0070F3]"
        >
          <p className="text-sm text-[#A1A1AA]">Descoberta</p>
          <p className="mt-2 text-xl font-medium">Rascunho da reunião</p>
        </Link>
        <Link
          href="/ops/historico"
          className="rounded-[24px] border border-[#262626] bg-[#101010] p-5 hover:border-[#0070F3]"
        >
          <p className="text-sm text-[#A1A1AA]">Fila</p>
          <p className="mt-2 text-xl font-medium">Leads e jobs</p>
        </Link>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Panel title="Leads recentes" empty="Nenhum lead ainda.">
          {leads.map((lead) => (
            <li key={lead.id} className="border-t border-[#262626] py-3">
              <p className="text-sm text-white">{lead.name}</p>
              <p className="text-sm text-[#A1A1AA]">
                {lead.company}
                {lead.website ? ` · ${lead.website}` : ""}
              </p>
              <p className="mt-1 font-mono text-xs text-[#A1A1AA]">{formatWhen(lead.createdAt)}</p>
            </li>
          ))}
        </Panel>
        <Panel title="Auditorias" empty="Nenhuma auditoria ainda.">
          {audits.map((job) => (
            <li key={job.id} className="border-t border-[#262626] py-3">
              <p className="text-sm text-white">{job.url ?? job.id}</p>
              <p className="text-sm text-[#A1A1AA]">
                {statusLabel(job.status)}
                {job.engine ? ` · ${job.engine}` : ""}
              </p>
            </li>
          ))}
        </Panel>
        <Panel title="Descobertas" empty="Nenhum rascunho ainda.">
          {discoveries.map((job) => (
            <li key={job.id} className="border-t border-[#262626] py-3">
              <p className="text-sm text-white">{job.url ?? job.leadId ?? job.id}</p>
              <p className="text-sm text-[#A1A1AA]">{statusLabel(job.status)}</p>
            </li>
          ))}
        </Panel>
      </section>
    </div>
  );
}

function Panel({
  title,
  empty,
  children,
}: {
  title: string;
  empty: string;
  children: React.ReactNode;
}) {
  const hasItems = Array.isArray(children) ? children.length > 0 : Boolean(children);

  return (
    <div className="rounded-[24px] border border-[#262626] bg-[#101010] p-5">
      <h2 className="text-sm text-[#A1A1AA]">{title}</h2>
      <ul className="mt-2">
        {hasItems ? children : <li className="py-3 text-sm text-[#A1A1AA]">{empty}</li>}
      </ul>
    </div>
  );
}
