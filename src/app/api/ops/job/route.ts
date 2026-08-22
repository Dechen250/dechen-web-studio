import { requireOps, jsonError } from "@/lib/ops/http";
import { getJob, getLead, readJobMarkdown, type JobKind } from "@/lib/ops/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const denied = await requireOps();
  if (denied) return denied;

  const url = new URL(request.url);
  const kind = url.searchParams.get("kind") as JobKind | null;
  const id = url.searchParams.get("id");

  if (kind !== "audit" && kind !== "discovery") {
    return jsonError("Informe kind=audit ou kind=discovery.", 400);
  }
  if (!id) return jsonError("Informe o id do job.", 400);

  const job = await getJob(kind, id);
  if (!job) return jsonError("Job não encontrado.", 404);

  const markdown = await readJobMarkdown(kind, id);
  const lead = job.leadId ? await getLead(job.leadId) : null;

  return Response.json({ job, markdown, lead });
}
