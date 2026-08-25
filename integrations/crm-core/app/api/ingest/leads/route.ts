import { createHmac, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";
import { ingestSiteLead } from "@/features/ingest/site-lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function secretOk(header: string | null): boolean {
  const expected = process.env.CRM_INGEST_SECRET?.trim();
  if (!expected || expected.length < 8) return false;
  const token = header?.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return false;
  const left = createHmac("sha256", "dws-ingest").update(token).digest();
  const right = createHmac("sha256", "dws-ingest").update(expected).digest();
  return timingSafeEqual(left, right);
}

export async function POST(request: Request): Promise<Response> {
  if (!secretOk(request.headers.get("authorization"))) {
    return Response.json({ error: "Não autorizado." }, { status: 401 });
  }

  const organizationId = process.env.CRM_INGEST_ORG_ID?.trim();
  const ownerId = process.env.CRM_INGEST_OWNER_ID?.trim();
  if (!organizationId || !ownerId) {
    return Response.json(
      { error: "CRM_INGEST_ORG_ID e CRM_INGEST_OWNER_ID precisam estar definidos." },
      { status: 503 },
    );
  }

  let body: {
    name?: string;
    email?: string;
    whatsapp?: string;
    company?: string;
    segment?: string;
    website?: string;
    message?: string;
    origin?: string;
    leadId?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  const name = body.name?.trim();
  const company = body.company?.trim();
  if (!name || !company) {
    return Response.json({ error: "Informe nome e empresa." }, { status: 400 });
  }

  try {
    const result = await ingestSiteLead(db, organizationId, ownerId, {
      name,
      email: body.email,
      whatsapp: body.whatsapp,
      company,
      segment: body.segment,
      website: body.website,
      message: body.message,
      origin: body.origin,
      leadId: body.leadId,
    });
    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao gravar no CRM.";
    return Response.json({ error: message }, { status: 500 });
  }
}
