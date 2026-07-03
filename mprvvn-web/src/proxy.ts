import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

/**
 * Proxy (Next.js 16's renamed Middleware). Two responsibilities:
 *   1. /admin — optimistic, cookie-only auth gate (re-checked at the data layer).
 *   2. Everything else — ensure a supported locale prefix, redirecting
 *      locale-less public paths to the visitor's preferred locale.
 */

function detectLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale;
  // e.g. "hi-IN,hi;q=0.9,en;q=0.8" -> ["hi-in", "hi", "en"]
  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const lang of preferred) {
    const base = lang.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // 1. Admin area: auth gate, no locale prefix.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const isLoggedIn = !!req.auth;
    const isLoginPage = pathname === "/admin/login";

    if (!isLoginPage && !isLoggedIn) {
      const loginUrl = new URL("/admin/login", req.nextUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (isLoginPage && isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    return NextResponse.next();
  }

  // 2. Public site: ensure a locale prefix.
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (!hasLocale) {
    const locale = detectLocale(req.headers.get("accept-language"));
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  // Run on everything except Next internals, the auth API, and files with an
  // extension (static assets like /logo.png, /hero-forest.png, /favicon.ico).
  matcher: ["/((?!_next/static|_next/image|api|.*\\.).*)"],
};
