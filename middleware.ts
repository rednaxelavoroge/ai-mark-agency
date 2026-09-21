import { NextRequest, NextResponse } from "next/server";
import { site } from "@/lib/site";

const PUBLIC_FILE = /\.[^/]+$/;

function withLocale(request: NextRequest, locale: string, response: NextResponse) {
  response.headers.set("x-locale", locale);
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", "ru");
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    return withLocale(request, "ru", res);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${site.defaultLocale}${pathname === "/" ? "" : pathname}`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", site.defaultLocale);
  const res = NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
  return withLocale(request, site.defaultLocale, res);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
