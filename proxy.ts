import { NextRequest, NextResponse } from "next/server";
import { aliasPathToProducts } from "@/lib/products";
import { site } from "@/lib/site";

const PUBLIC_FILE = /\.[^/]+$/;

function localeResponse(
  request: NextRequest,
  locale: string,
  rewritePath?: string,
) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  if (rewritePath && rewritePath !== request.nextUrl.pathname) {
    const url = request.nextUrl.clone();
    url.pathname = rewritePath;
    const res = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    res.headers.set("x-locale", locale);
    return res;
  }
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set("x-locale", locale);
  return res;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    const aliased = aliasPathToProducts(pathname);
    return localeResponse(request, "ru", aliased ?? undefined);
  }

  const prefixed = `/${site.defaultLocale}${pathname === "/" ? "" : pathname}`;
  const aliased = aliasPathToProducts(prefixed);
  return localeResponse(request, site.defaultLocale, aliased ?? prefixed);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
