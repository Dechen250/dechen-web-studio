import { AGENCY } from "@/lib/site";

type ContactBody = {
  nome?: string;
  email?: string;
  whatsapp?: string;
  negocio?: string;
  empresa?: string;
  website?: string;
  mensagem?: string;
  honeypot?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return Response.json({ success: false, message: "Dados inválidos." }, { status: 400 });
  }

  if (typeof body.honeypot === "string" && body.honeypot.trim()) {
    return Response.json({ success: true, message: "Solicitação enviada com sucesso." });
  }

  const nome = body.nome?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const whatsapp = body.whatsapp?.trim() ?? "";
  const mensagem = body.mensagem?.trim() ?? "";
  if (!nome || !email || !whatsapp || !mensagem) {
    return Response.json({ success: false, message: "Dados inválidos." }, { status: 400 });
  }

  const crmUrl = process.env.CRM_INGEST_URL?.trim();
  const secret = process.env.CRM_INGEST_SECRET?.trim();
  if (!crmUrl || !secret) {
    console.error("[contact] CRM_INGEST_URL / CRM_INGEST_SECRET ausentes");
  } else {
    void fetch(crmUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(60_000),
      body: JSON.stringify({
        name: nome,
        email,
        whatsapp,
        company: body.empresa?.trim() || nome,
        segment: body.negocio?.trim(),
        website: body.website?.trim(),
        message: mensagem,
        origin: "website",
      }),
    }).catch((error) => {
      console.error("[contact] CRM ingest failed", error);
    });
  }

  return Response.json({
    success: true,
    message: `Solicitação enviada. A ${AGENCY.name} registra o lead no CRM.`,
  });
}
