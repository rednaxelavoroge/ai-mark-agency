import { NextResponse } from "next/server";
import {
  referralCookieValue,
  resolveAndRecordReferralClick,
} from "@/lib/referral/attribution";
import {
  REFERRAL_COOKIE_NAME,
  referralCookieOptions,
} from "@/lib/referral/cookie";
import {
  collectUtm,
  landingPathOnly,
  normalizeReferralCode,
  resolveLandingPath,
} from "@/lib/referral/rules";

/**
 * GET /go/<referralCode> — the public referral entry point.
 *
 * Responsibilities, in order:
 *   1. validate the code SERVER-SIDE against `partner_profiles`;
 *   2. record a referral click (partner, landing path, UTM source/medium/campaign);
 *   3. set the signed, HTTP-only, same-site attribution cookie;
 *   4. redirect to the intended AI MARK landing page.
 *
 * The URL never names an internal id. Its only parameter is the public
 * referral code — no `partner_id`, no `user_id`, no session token — and the
 * response is `no-store` so a CDN cannot cache one visitor's redirect for
 * another. `X-Robots-Tag: noindex` keeps referral links out of search results
 * (app/robots.ts disallows the prefix as a second layer).
 *
 * An unknown code is not an error page: the visitor is sent to the default
 * landing page with no cookie and no click row, so the response cannot be used
 * to test whether a code exists.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = "private, no-cache, no-store, must-revalidate, max-age=0";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code: rawCode } = await params;
  const url = new URL(request.url);

  // `?to=/products/aime` picks the landing page; anything unsafe falls back to
  // the Partner Network page. UTM parameters ride along to the destination.
  const utm = collectUtm(url.searchParams);
  const landing = resolveLandingPath(url.searchParams.get("to"), utm);

  // Redirect on the origin that served the request, not on a hardcoded
  // production domain: a Preview deployment and local development must keep the
  // visitor (and the cookie) on their own origin. `site.url` stays the source
  // of truth for the link the partner copies, which is a different concern.
  const destination = new URL(landing, resolveOrigin(request));

  const response = NextResponse.redirect(destination, 302);
  response.headers.set("Cache-Control", NO_STORE);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  const code = normalizeReferralCode(rawCode);
  if (!code) return response;

  const attribution = await resolveAndRecordReferralClick({
    code,
    landingPath: landingPathOnly(landing),
    utm,
  });

  // Tracking is optional: with no Supabase credentials the redirect still
  // works, there is simply nothing to attribute.
  if (!attribution) return response;

  const value = referralCookieValue(attribution);
  if (value) {
    response.cookies.set(
      REFERRAL_COOKIE_NAME,
      value,
      referralCookieOptions(),
    );
  }

  return response;
}

/**
 * The origin to redirect to.
 *
 * Behind a proxy (Vercel, Cloudflare) `request.url` can carry an internal
 * origin, so the forwarded host wins when it is present — the same rule
 * `/auth/callback` uses. Locally the forwarded host is absent and the request's
 * own origin is exactly right.
 *
 * The host is validated before it is interpolated: a referral link must never
 * become an open redirect, so a value that is not a bare hostname (a path, a
 * scheme, whitespace, credentials) is discarded and the request's own origin is
 * used instead.
 */
const FORWARDED_HOST_RE = /^[a-z0-9.-]+(:\d{1,5})?$/i;

function resolveOrigin(request: Request): string {
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (
    process.env.NODE_ENV === "development" ||
    !forwardedHost ||
    !FORWARDED_HOST_RE.test(forwardedHost.trim())
  ) {
    return new URL(request.url).origin;
  }

  const protocol =
    request.headers.get("x-forwarded-proto") === "http" ? "http" : "https";
  return `${protocol}://${forwardedHost.trim()}`;
}
