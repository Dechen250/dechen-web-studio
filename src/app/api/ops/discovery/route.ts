import { runDiscovery } from "@/lib/discovery/run";
import type { DiscoveryLeadInput } from "@/lib/discovery/types";
import { requireOps, jsonError } from "@/lib/ops/http";
import { collectPagespeedAudit } from "@/lib/site-audit/run-pagespeed";
import { normalizeUrl } from "@/lib/site-audit/format";
import {
  type JobRecord,
  type LeadRecord,
  newId,
  nowIso,
  patchJob,
  saveJob,
  saveJobMarkdown,
  saveLead,
} from "@/lib/ops/store";

export const runtime = "nodejs";
export const maxDuration = 120;
export const dynamic = "force-dynamic";

function parseLead(body: Record<string, unknown>): DiscoveryLeadInput | string {
  const name = String(body.name ?? body.nome ?? "").trim();
  const email = String(body.email ?? "").trim();
  const whatsapp = String(body.whatsapp ?? "").trim();
  const company = String(body.company ?? body.negocio ?? "").trim();
  if (!name || !email || !whatsapp || !company) {
    return "Informe nome, e-mail, WhatsApp e empresa.";
  }

  let website = String(body.website ?? "").trim() || undefined;
  if (website) {
    try {
      website = normalizeUrl(website);
    } catch {
      return "URL do site inválida.";
    }
  }

  return {
    name,
    email,
    whatsapp,
    company,
    role: String(body.role ?? "").trim() || undefined,
    segment: String(body.segment ?? "").trim() || undefined,
    message: String(body.message ?? body.mensagem ?? "").trim() || undefined,
    website,
  };
}

export async function POST(request: Request): Promise<Response> {
  const denied = await requireOps();
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonError("JSON inválido.", 400);
  }

  const parsed = parseLead(body);
  if (typeof parsed === "string") return jsonError(parsed, 400);

  const createdAt = nowIso();
  const lead: LeadRecord = {
    id: newId("lead"),
    createdAt,
    name: parsed.name,
    email: parsed.email,
    whatsapp: parsed.whatsapp,
    company: parsed.company,
    website: parsed.website,
    message: parsed.message ?? "",
    origin: "ops",
  };

  const job: JobRecord = {
    id: newId("disc"),
    kind: "discovery",
    status: "running",
    createdAt,
    updatedAt: createdAt,
    leadId: lead.id,
    url: parsed.website,
  };

  lead.discoveryJobId = job.id;
  await saveLead(lead);
  await saveJob(job);

  try {
    let blockedTitle: string | undefined;
    let auditMarkdown: string | undefined;
    const audit = parsed.website
      ? await collectPagespeedAudit(parsed.website, "mobile")
      : undefined;
    if (audit) {
      blockedTitle = audit.blocked?.title;
      auditMarkdown = audit.markdown;
    }

    const pack = await runDiscovery({
      lead: parsed,
      audit: audit?.result,
      auditMarkdown,
      blockedTitle,
    });
    const resultPath = await saveJobMarkdown("discovery", job.id, pack.markdown);
    await patchJob("discovery", job.id, { status: "done", resultPath });

    return Response.json({
      leadId: lead.id,
      jobId: job.id,
      markdown: pack.markdown,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await patchJob("discovery", job.id, { status: "error", error: message });
    return jsonError(message, 500);
  }
}
