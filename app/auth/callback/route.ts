import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { safeNextPath } from "@/lib/auth/redirects";
import { attributePartnerSignup } from "@/lib/referral/attribution";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  createSupabaseServerClient,
  type SupabaseServerClient,
} from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = "private, no-cache, no-store, must-revalidate, max-age=0";

/**
 * OAuth / magic-link / email-confirmation callback.
 *
 * Supabase's PKCE flow returns a `?code=` which is exchanged for a session
 * here, server-side. The same route already serves a future Google login
 * (`signInWithOAuth({ provider: "google" })` redirects to this callback), so
 * adding that provider needs no new auth plumbing.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const origin = resolveOrigin(request);
  const next = safeNextPath(searchParams.get("next"));

  const providerError =
    searchParams.get("error_description") ?? searchParams.get("error");
  if (providerError) {
    console.error("[auth] provider returned an error:", providerError);
    return loginRedirect(origin, next, "provider_error");
  }

  if (!isSupabaseConfigured()) {
    return loginRedirect(origin, next, "not_configured");
  }

  const code = searchParams.get("code");
  if (!code) {
    return loginRedirect(origin, next, "missing_code");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth] code exchange failed:", error.message);
    return loginRedirect(origin, next, "exchange_failed");
  }

  // Phase 4B: a magic link (or an email confirmation) can be the moment a
  // partner account comes into existence, so this is a registration path too.
  // `ref=1` is only a hint that the visitor arrived through a referral link —
  // the signed cookie is re-verified and the database refuses to attribute any
  // account that was not created moments ago.
  if (searchParams.get("ref") === "1") {
    await attributeCallbackSignup(supabase);
  }

  // The session cookies were written through next/headers during the exchange;
  // Next folds them into this response.
  const response = NextResponse.redirect(new URL(next, origin));
  response.headers.set("Cache-Control", NO_STORE);
  return response;
}

/**
 * Attributes the account that this callback just established, when it is a
 * brand new partner. Never throws: a failed attribution is a log line, never a
 * failed sign-in.
 */
async function attributeCallbackSignup(supabase: SupabaseServerClient) {
  try {
    const { data, error } = await supabase.auth.getClaims();
    if (error || !data) return;

    const userId = data.claims.sub;
    if (typeof userId !== "string" || userId.length === 0) return;

    const status = await attributePartnerSignup({
      userId,
      // The signed-in account here IS the new account, so there is no separate
      // signed-in identity to compare against; the database still rejects a
      // code that resolves back to this partner.
      activePartnerCode: null,
    });

    if (status === "attributed") {
      console.info("[auth] partner attributed to a referral link (email link)");
      return;
    }
    if (status === "no_referral" || status === "tracking_disabled") return;

    console.warn(`[auth] referral attribution not applied: ${status}`);
  } catch (attributionError) {
    console.error("[auth] referral attribution crashed:", attributionError);
  }
}

/**
 * Behind a proxy (Vercel, Cloudflare) `request.nextUrl.origin` can be the
 * internal origin, so prefer the forwarded host — except in local
 * development, where the forwarded host is absent or meaningless.
 */
function resolveOrigin(request: NextRequest): string {
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (process.env.NODE_ENV === "development" || !forwardedHost) {
    return request.nextUrl.origin;
  }

  const protocol = request.headers.get("x-forwarded-proto") ?? "https";
  return `${protocol}://${forwardedHost}`;
}

function loginRedirect(origin: string, next: string, error: string) {
  const url = new URL("/auth/login", origin);
  url.searchParams.set("next", next);
  url.searchParams.set("error", error);

  const response = NextResponse.redirect(url);
  response.headers.set("Cache-Control", NO_STORE);
  return response;
}
