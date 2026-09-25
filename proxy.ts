import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  FALLBACK_LOCALE,
  LOCALE_COOKIE,
  LOCALE_SOURCE_COOKIE,
  decidePublicLocale,
} from "@/lib/locale-negotiate";
import { site } from "@/lib/site";
import { refreshSession } from "@/lib/supabase/proxy";

const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Paths served exactly as written rather than rewritten to `/{locale}`:
 * the Partner Platform, the auth flow and the referral entry point.
 *
 * `/go` is here for the same reason `/partner` is: the referral route owns its
 * own path (`/go/<code>`) and rewriting it to `/en/go/<code>` would 404. It
 * also gets the same `no-store` treatment, which a redirect carrying a
 * per-visitor attribution cookie requires.
 *
 * The boundary check is deliberate: a naive `startsWith("/partner")` would
 * also capture the public `/partners` marketing page and break it.
 */
const UNLOCALIZED_PREFIXES = ["/partner", "/admin", "/auth", "/go"] as const;

const NO_STORE =
  "private, no-cache, no-store, must-revalidate, max-age=0";

function isPlatformPath(pathname: string): boolean {
  return UNLOCALIZED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * Builds the final response for the current request.
 *
 * Split out from `proxy` because the Supabase session refresh may write
 * refreshed cookies, and NextResponse captures request headers at construction
 * time — so the response has to be rebuilt from the mutated request (see
 * lib/supabase/proxy.ts).
 */
function applyLocaleHeaders(
  res: NextResponse,
  locale: string,
  clearStaleLocaleCookie: boolean,
  varyOnLanguage: boolean,
) {
  res.headers.set("x-locale", locale);
  if (varyOnLanguage) res.headers.set("Vary", "Accept-Language");
  if (!clearStaleLocaleCookie) return;
  // Drop a leftover `locale=fr` (or any other code) that was stored without an
  // explicit selector choice. The response is private so a shared cache cannot
  // replay the Set-Cookie, or a previous public 307 to /fr, for everyone.
  res.headers.set("Cache-Control", NO_STORE);
  res.cookies.set(LOCALE_COOKIE, "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
  res.cookies.set(LOCALE_SOURCE_COOKIE, "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
}

function buildResponse(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (isPlatformPath(pathname)) {
    // Authenticated surfaces are user-specific, and a referral redirect carries
    // a per-visitor cookie: keep all of them out of any CDN.
    const res = NextResponse.next({ request: { headers: request.headers } });
    res.headers.set("Cache-Control", NO_STORE);
    return res;
  }

  const decision = decidePublicLocale({
    pathname,
    acceptLanguage: request.headers.get("accept-language"),
    localeCookie: request.cookies.get(LOCALE_COOKIE)?.value ?? null,
    localeSource: request.cookies.get(LOCALE_SOURCE_COOKIE)?.value ?? null,
    locales: site.locales,
    defaultLocale: site.defaultLocale,
    fallbackLocale: FALLBACK_LOCALE,
  });

  if (decision.action === "next") {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", decision.locale);
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    applyLocaleHeaders(
      res,
      decision.locale,
      decision.clearStaleLocaleCookie,
      false,
    );
    return res;
  }

  if (decision.action === "redirect") {
    const targetUrl = request.nextUrl.clone();
    targetUrl.pathname = decision.pathname;
    const res = NextResponse.redirect(targetUrl, 307);
    res.headers.set("Cache-Control", NO_STORE);
    applyLocaleHeaders(res, decision.locale, decision.clearStaleLocaleCookie, true);
    return res;
  }

  const url = request.nextUrl.clone();
  url.pathname = decision.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", decision.locale);
  const res = NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
  applyLocaleHeaders(res, decision.locale, decision.clearStaleLocaleCookie, true);
  return res;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API routes, build output and static files bypass the locale rewrite.
  // Route Handlers and Server Actions verify authorization themselves.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Refresh the Supabase session before rendering, on every route that can
  // carry one. When there is no auth cookie this is a no-op, so anonymous
  // visits to the public site never touch the Auth server.
  const { response } = await refreshSession(request, () =>
    buildResponse(request),
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
