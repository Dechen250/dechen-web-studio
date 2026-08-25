import { cookies } from "next/headers";

import { OPS_COOKIE, clearOpsCookieHeader } from "@/lib/ops/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(): Promise<Response> {
  const jar = await cookies();
  jar.set(OPS_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": clearOpsCookieHeader(),
    },
  });
}
