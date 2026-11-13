import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SHOWCASE_SLUGS = new Set([
  "divina-cozinha",
  "barbearia-royal",
  "instituto-harmonia",
  "vertex-consultoria",
]);

export function proxy(request: NextRequest) {
  if (request.nextUrl.searchParams.get("embed") === "1") {
    return NextResponse.next();
  }

  const match = request.nextUrl.pathname.match(/^\/showcase\/([^/]+)\/?$/);
  const slug = match?.[1];
  if (!slug || !SHOWCASE_SLUGS.has(slug)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/demo/${slug}`;
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/showcase/:slug"],
};
