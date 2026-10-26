import { randomUUID } from "node:crypto";
import { bearerMatches } from "@/lib/auth";
import { addLead } from "@/lib/store";
import type { IngestBody } from "@/lib/types";

export async function POST(request: Request) {
  if (!bearerMatches(request, process.env.CRM_INGEST_SECRET)) {
    return Response.json({ success: false, message: "Não autorizado." }, { status: 401 });
  }

  let body: IngestBody;
  try {
    body = (await request.json()) as IngestBody;
  } catch {
    return Response.json({ success: false, message: "Dados inválidos." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const whatsapp = body.whatsapp?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !whatsapp || !message) {
    return Response.json({ success: false, message: "Dados inválidos." }, { status: 400 });
  }

  const lead = await addLead({
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    email,
    whatsapp,
    company: body.company?.trim() || name,
    segment: body.segment?.trim() ?? "",
    website: body.website?.trim() ?? "",
    message,
    origin: body.origin?.trim() || "website",
  });

  return Response.json({ success: true, id: lead.id });
}
