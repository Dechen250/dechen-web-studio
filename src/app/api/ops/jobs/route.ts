import { requireOps } from "@/lib/ops/http";
import { listJobs, listLeads } from "@/lib/ops/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const denied = await requireOps();
  if (denied) return denied;

  const [leads, audits, discoveries] = await Promise.all([
    listLeads(40),
    listJobs("audit", 40),
    listJobs("discovery", 40),
  ]);

  return Response.json({ leads, audits, discoveries });
}
