import { normalizeUrl } from "@/lib/site-audit/format";

export type ContactPayload = {
  nome: string;
  email: string;
  whatsapp: string;
  negocio: string;
  empresa?: string;
  mensagem: string;
  website?: string;
  honeypot?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = {
  nome: 80,
  email: 120,
  whatsapp: 40,
  negocio: 80,
  empresa: 120,
  mensagem: 2000,
  website: 200,
};

function trimField(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export type ContactValidation =
  | { ok: true; data: ContactPayload; spam: boolean }
  | { ok: false; message: string };

export function validateContact(raw: unknown): ContactValidation {
  if (!raw || typeof raw !== "object") {
    return { ok: false, message: "Dados inválidos." };
  }

  const body = raw as Record<string, unknown>;
  const honeypot = String(body.honeypot ?? body.website_hp ?? "").trim();

  const data: ContactPayload = {
    nome: trimField(body.nome ?? body.name, LIMITS.nome),
    email: trimField(body.email, LIMITS.email).toLowerCase(),
    whatsapp: trimField(body.whatsapp, LIMITS.whatsapp),
    negocio: trimField(body.negocio ?? body.servico, LIMITS.negocio),
    empresa: trimField(body.empresa ?? body.company, LIMITS.empresa) || undefined,
    mensagem: String(body.mensagem ?? body.message ?? "")
      .trim()
      .slice(0, LIMITS.mensagem),
    website: trimField(body.website, LIMITS.website),
    honeypot,
  };

  if (honeypot) {
    return { ok: true, data, spam: true };
  }

  if (!data.nome) return { ok: false, message: "Informe o nome." };
  if (!EMAIL_RE.test(data.email)) return { ok: false, message: "E-mail inválido." };
  if (data.whatsapp.replace(/\D/g, "").length < 10) {
    return { ok: false, message: "WhatsApp inválido." };
  }
  if (!data.negocio) return { ok: false, message: "Informe o tipo de negócio." };
  if (!data.mensagem) return { ok: false, message: "Escreva uma mensagem." };

  if (data.website) {
    try {
      data.website = normalizeUrl(data.website);
    } catch {
      return { ok: false, message: "URL do site inválida." };
    }
  } else {
    data.website = undefined;
  }

  return { ok: true, data, spam: false };
}
