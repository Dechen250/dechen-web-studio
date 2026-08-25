import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const OPS_COOKIE = "dws_ops";
const MAX_AGE_SEC = 60 * 60 * 12; // 12h

function secret(): string | null {
  const value = process.env.OPS_SECRET?.trim();
  return value && value.length >= 8 ? value : null;
}

export function opsSecretConfigured(): boolean {
  return Boolean(secret());
}

export function opsAuthRequired(): boolean {
  return process.env.NODE_ENV === "production" || opsSecretConfigured();
}

export function signOpsToken(): string | null {
  const key = secret();
  if (!key) return null;
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const payload = String(exp);
  const sig = createHmac("sha256", key).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyOpsToken(token: string | undefined | null): boolean {
  const key = secret();
  if (!key || !token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = createHmac("sha256", key).update(payload).digest("hex");
  try {
    if (
      !timingSafeEqual(Buffer.from(sig, "utf8"), Buffer.from(expected, "utf8"))
    ) {
      return false;
    }
  } catch {
    return false;
  }
  const exp = Number(payload);
  return Number.isFinite(exp) && Date.now() < exp;
}

export async function isOpsAuthenticated(): Promise<boolean> {
  if (!opsAuthRequired()) return true;
  const jar = await cookies();
  return verifyOpsToken(jar.get(OPS_COOKIE)?.value);
}

export function opsCookieHeader(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${OPS_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE_SEC}${secure}`;
}

export function clearOpsCookieHeader(): string {
  return `${OPS_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
