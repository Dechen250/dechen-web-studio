import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicPaths = new Set(["/sign-in", "/sign-up", "/forgot-password"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/invite/") ||
    pathname.startsWith("/reset-password/") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // On HTTPS (Vercel), Auth.js sets `__Secure-authjs.session-token`.
  // getToken defaults to the non-secure name unless secureCookie is true.
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: request.nextUrl.protocol === "https:",
  });

  const isPublic = publicPaths.has(pathname);
  const isProtected =
    pathname.startsWith("/app") || pathname.startsWith("/onboarding");

  if (!token && (isProtected || pathname === "/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    if (pathname !== "/") {
      url.searchParams.set("callbackUrl", pathname);
    }
    return NextResponse.redirect(url);
  }

  if (
    token &&
    (pathname === "/" ||
      pathname === "/sign-in" ||
      pathname === "/sign-up" ||
      pathname === "/forgot-password")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/app/pipeline";
    return NextResponse.redirect(url);
  }

  if (!isPublic && !isProtected && pathname !== "/") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
