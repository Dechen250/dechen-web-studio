const windows = new Map<string, number[]>();

export function allowRequest(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const hits = (windows.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (hits.length >= limit) {
    windows.set(key, hits);
    return false;
  }
  hits.push(now);
  windows.set(key, hits);
  return true;
}

export function clientKey(request: Request, bucket: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "local";
  return `${bucket}:${ip}`;
}
