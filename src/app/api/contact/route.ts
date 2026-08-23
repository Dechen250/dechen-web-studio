import { validateContact } from "@/lib/contact/validate";
import { syncLeadToCrm } from "@/lib/ops/jobs";
import { allowRequest, clientKey } from "@/lib/ops/rate-limit";
import { type LeadRecord, newId, nowIso, saveLead } from "@/lib/ops/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  if (!allowRequest(clientKey(request, "contact"), 8, 60 * 60 * 1000)) {
    return Response.json(
      { success: false, message: "Muitas solicitações. Tente de novo em instantes." },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ success: false, message: "Dados inválidos." }, { status: 400 });
  }

  const parsed = validateContact(raw);
  if (!parsed.ok) {
    return Response.json({ success: false, message: parsed.message }, { status: 400 });
  }

  if (parsed.spam) {
    return Response.json({ success: true, message: "Solicitação enviada com sucesso." });
  }

  const lead: LeadRecord = {
    id: newId("lead"),
    createdAt: nowIso(),
    name: parsed.data.nome,
    email: parsed.data.email,
    whatsapp: parsed.data.whatsapp,
    company: parsed.data.empresa || parsed.data.negocio,
    segment: parsed.data.negocio,
    website: parsed.data.website,
    message: parsed.data.mensagem,
    origin: "contact-form",
  };

  try {
    await saveLead(lead);
    await syncLeadToCrm(lead);
  } catch (error) {
    console.error("[contact] falha ao persistir lead", error);
    return Response.json(
      { success: false, message: "Ocorreu um erro interno." },
      { status: 500 },
    );
  }

  return Response.json({
    success: true,
    message: "Solicitação enviada com sucesso.",
  });
}
