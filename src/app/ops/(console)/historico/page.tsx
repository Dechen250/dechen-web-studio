import { listJobs, listLeads, readJobMarkdown, type JobRecord, type LeadRecord } from "@/lib/ops/store";

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

export default async function HistoricoPage() {
  const [leads, audits, discoveries] = await Promise.all([
    listLeads(40),
    listJobs("audit", 40),
    listJobs("discovery", 40),
  ]);

  const auditsWithMd = await Promise.all(
    audits.map(async (job) => ({
      job,
      markdown: job.status === "done" ? await readJobMarkdown(job.kind, job.id) : null,
    })),
  );
  const discoveriesWithMd = await Promise.all(
    discoveries.map(async (job) => ({
      job,
      markdown: job.status === "done" ? await readJobMarkdown(job.kind, job.id) : null,
    })),
  );

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 py-8 md:px-8 md:py-10">
      <header className="space-y-2">
        <h1 className="font-sans text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          Histórico
        </h1>
        <p className="max-w-2xl text-base text-[#A1A1AA]">
          Leads e jobs ficam em data/ops no servidor. Não entram no Git.
        </p>
      </header>

      <Table title="Leads">
        {leads.length === 0 ? (
          <Empty />
        ) : (
          leads.map((lead) => <LeadRow key={lead.id} lead={lead} />)
        )}
      </Table>

      <Table title="Auditorias">
        {auditsWithMd.length === 0 ? (
          <Empty />
        ) : (
          auditsWithMd.map(({ job, markdown }) => (
            <JobRow key={job.id} job={job} markdown={markdown} />
          ))
        )}
      </Table>

      <Table title="Descobertas">
        {discoveriesWithMd.length === 0 ? (
          <Empty />
        ) : (
          discoveriesWithMd.map(({ job, markdown }) => (
            <JobRow key={job.id} job={job} markdown={markdown} />
          ))
        )}
      </Table>
    </div>
  );
}

function Table({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-[#262626]">
      <h2 className="bg-[#101010] px-5 py-3 text-sm text-[#A1A1AA]">{title}</h2>
      <ul>{children}</ul>
    </section>
  );
}

function Empty() {
  return <li className="px-5 py-4 text-sm text-[#A1A1AA]">Nada por aqui ainda.</li>;
}

function LeadRow({ lead }: { lead: LeadRecord }) {
  return (
    <li className="border-t border-[#262626] px-5 py-4">
      <p className="text-sm text-white">
        {lead.name} · {lead.company}
      </p>
      <p className="text-sm text-[#A1A1AA]">
        {lead.email} · {lead.whatsapp}
        {lead.website ? ` · ${lead.website}` : ""}
      </p>
      <p className="mt-1 font-mono text-xs text-[#A1A1AA]">
        {formatWhen(lead.createdAt)} · {lead.origin}
        {lead.crmContactId ? " · CRM ok" : lead.crmError ? " · CRM falhou" : ""}
      </p>
    </li>
  );
}

function JobRow({ job, markdown }: { job: JobRecord; markdown: string | null }) {
  return (
    <li className="border-t border-[#262626] px-5 py-4">
      <p className="text-sm text-white">{job.url ?? job.id}</p>
      <p className="text-sm text-[#A1A1AA]">
        {statusLabel(job.status)}
        {job.engine ? ` · ${job.engine}` : ""}
        {job.error ? ` · ${job.error}` : ""}
      </p>
      <p className="mt-1 font-mono text-xs text-[#A1A1AA]">{formatWhen(job.createdAt)}</p>
      {markdown ? (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm text-[#0070F3]">Ver Markdown</summary>
          <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap font-mono text-[12px] text-[#ededed]">
            {markdown}
          </pre>
        </details>
      ) : null}
    </li>
  );
}
