import { cookies } from "next/headers";

import {
  OPS_COOKIE,
  clearOpsCookieHeader,
  opsSecretConfigured,
  signOpsToken,
} from "@/lib/ops/auth";
import { allowRequest, clientKey } from "@/lib/ops/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  if (!opsSecretConfigured()) {
    return Response.json(
      { error: "Defina OPS_SECRET (mínimo 8 caracteres) para proteger o console." },
      { status: 503 },
    );
  }

  if (!allowRequest(clientKey(request, "ops-login"), 8, 15 * 60 * 1000)) {
    return Response.json({ error: "Muitas tentativas. Espere alguns minutos." }, { status: 429 });
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  const password = body.password ?? "";
  const expected = process.env.OPS_SECRET?.trim() ?? "";
  if (!password || password !== expected) {
    return Response.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const token = signOpsToken();
  if (!token) {
    return Response.json({ error: "Não foi possível assinar a sessão." }, { status: 500 });
  }

  const jar = await cookies();
  jar.set(OPS_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
    secure: process.env.NODE_ENV === "production",
  });

  return Response.json({ ok: true });
}

export async function DELETE(): Promise<Response> {
  const jar = await cookies();
  jar.set(OPS_COOKIE, "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  return new Response(null, { status: 204, headers: { "Set-Cookie": clearOpsCookieHeader() } });
}
