import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
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
function buildResponse(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (isPlatformPath(pathname)) {
    // Authenticated surfaces are user-specific, and a referral redirect carries
    // a per-visitor cookie: keep all of them out of any CDN.
    const res = NextResponse.next({ request: { headers: request.headers } });
    res.headers.set("Cache-Control", NO_STORE);
    return res;
  }

  // Explicit locale prefixes (/ru, /en, /es, etc.) are already valid app routes.
  const prefixed = (site.locales as readonly string[]).find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (prefixed) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", prefixed);
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    res.headers.set("x-locale", prefixed);
    if (request.cookies.get("locale")?.value !== prefixed) {
      res.cookies.set("locale", prefixed, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
      });
    }
    return res;
  }

  // Unprefixed paths (e.g. / or /products): check visitor's saved locale cookie
  const cookieLocale = request.cookies.get("locale")?.value;
  const isKnownLocale =
    cookieLocale && (site.locales as readonly string[]).includes(cookieLocale);

  if (isKnownLocale && cookieLocale !== site.defaultLocale) {
    const targetUrl = request.nextUrl.clone();
    targetUrl.pathname = `/${cookieLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(targetUrl, 307);
  }

  // Otherwise served by the default locale.
  const url = request.nextUrl.clone();
  url.pathname = `/${site.defaultLocale}${pathname === "/" ? "" : pathname}`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", site.defaultLocale);
  const res = NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
  res.headers.set("x-locale", site.defaultLocale);
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
