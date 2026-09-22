/**
 * The signed, first-party referral attribution cookie.
 *
 * Design goals, in order:
 *
 *   1. **First-party.** The cookie is set by `ai-mark.agency` on the `/go/<code>`
 *      redirect and read only by `ai-mark.agency`. No third-party tracker, no
 *      cross-site cookie, no shared identifier.
 *   2. **HTTP-only.** The browser never needs to read it — every attribution
 *      decision is taken server-side — so it is `httpOnly` and therefore also
 *      out of reach of any script on the page.
 *   3. **Minimal.** The payload holds a referral code, the issue time and the
 *      click id. It never holds a name, an email, a user id, an IP address or
 *      a partner id. The code is the only reference that leaves the server.
 *   4. **Tamper-evident and expiring.** An HMAC-SHA256 signature over the
 *      payload makes the code and the issue time unforgeable, so a visitor
 *      cannot extend the 30-day window or swap in a code the server never
 *      issued. Signature verification happens on every read.
 *
 * No imports other than `node:crypto`: this module is imported directly by the
 * Node test runner, which cannot resolve the `@/*` alias. Keep it that way.
 */

import { createHmac, timingSafeEqual } from "node:crypto";

/** Cookie name. `am_` keeps it recognisable in a browser's storage inspector. */
export const REFERRAL_COOKIE_NAME = "am_ref";

/**
 * Default attribution window: 30 days, for both the cookie lifetime and the
 * server-side freshness check. The lead rule in the brief is "last valid
 * partner referral within 30 days before lead creation"; partner signup has no
 * stated window, and is bounded by this cookie lifetime in practice.
 */
export const ATTRIBUTION_WINDOW_DAYS = 30;
export const ATTRIBUTION_WINDOW_MS =
  ATTRIBUTION_WINDOW_DAYS * 24 * 60 * 60 * 1000;

/** Human-facing description of the window, for the docs and the dashboard. */
export const ATTRIBUTION_WINDOW_LABEL = `${ATTRIBUTION_WINDOW_DAYS} days`;

/** Tolerance for a browser clock running slightly ahead of the server. */
export const CLOCK_SKEW_MS = 60 * 1000;

/** Hard ceiling on a cookie value, checked before any parsing work. */
const MAX_COOKIE_VALUE_LENGTH = 512;

/** The only payload shape this engine understands. */
export type ReferralCookiePayload = {
  /** Payload version — a bump invalidates older cookies instead of misreading them. */
  v: 1;
  /** Public referral code (never a partner id, never a user id). */
  code: string;
  /** Issue time, epoch milliseconds. */
  issuedAt: number;
  /** The referral_clicks row this cookie came from, when tracking was live. */
  clickId: string | null;
};

export type ReferralCookieOptions = {
  secret: string;
  now?: number;
  windowMs?: number;
  clockSkewMs?: number;
};

/** True for a string that could be a code. Format is validated by the caller. */
function isCodeShape(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 64;
}

/**
 * Serialises and signs a payload. Returns null when no secret is configured:
 * an *unsigned* attribution cookie would be worse than none, because it would
 * let a visitor choose their own referral code.
 */
export function signReferralCookie(
  payload: ReferralCookiePayload,
  secret: string,
): string | null {
  if (!secret) return null;
  if (!isCodeShape(payload.code)) return null;
  if (!Number.isFinite(payload.issuedAt)) return null;

  const body = Buffer.from(
    JSON.stringify({
      v: 1,
      code: payload.code,
      issuedAt: Math.floor(payload.issuedAt),
      clickId: payload.clickId ?? null,
    }),
    "utf8",
  ).toString("base64url");

  const signature = createHmac("sha256", secret)
    .update(body)
    .digest("base64url");

  return `${body}.${signature}`;
}

/**
 * Verifies a cookie value and returns the payload, or null for anything that
 * is not a fresh, correctly signed cookie. Every failure mode collapses to
 * null on purpose: the caller only needs "may I attribute to this code?".
 */
export function verifyReferralCookie(
  value: unknown,
  {
    secret,
    now = Date.now(),
    windowMs = ATTRIBUTION_WINDOW_MS,
    clockSkewMs = CLOCK_SKEW_MS,
  }: ReferralCookieOptions,
): ReferralCookiePayload | null {
  if (!secret) return null;
  if (typeof value !== "string") return null;
  if (value.length === 0 || value.length > MAX_COOKIE_VALUE_LENGTH) return null;

  const separator = value.lastIndexOf(".");
  if (separator <= 0 || separator === value.length - 1) return null;

  const body = value.slice(0, separator);
  const providedSignature = value.slice(separator + 1);

  const expected = createHmac("sha256", secret).update(body).digest();
  let provided: Buffer;
  try {
    provided = Buffer.from(providedSignature, "base64url");
  } catch {
    return null;
  }

  // Length check first: timingSafeEqual throws on a length mismatch, and the
  // length itself is not a secret.
  if (provided.length !== expected.length) return null;
  if (!timingSafeEqual(provided, expected)) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== "object") return null;
  const candidate = parsed as Record<string, unknown>;

  if (candidate.v !== 1) return null;
  if (!isCodeShape(candidate.code)) return null;
  if (typeof candidate.issuedAt !== "number" || !Number.isFinite(candidate.issuedAt)) {
    return null;
  }
  if (
    candidate.clickId !== null &&
    candidate.clickId !== undefined &&
    typeof candidate.clickId !== "string"
  ) {
    return null;
  }

  const issuedAt = candidate.issuedAt;
  const age = now - issuedAt;
  if (age > windowMs) return null;
  if (age < -clockSkewMs) return null;

  return {
    v: 1,
    code: candidate.code,
    issuedAt,
    clickId: typeof candidate.clickId === "string" ? candidate.clickId : null,
  };
}

/**
 * Cookie attributes for the attribution cookie.
 *
 * `secure` is true in production and false in local development, where the
 * site is served over plain HTTP on localhost — a `Secure` cookie would simply
 * never be stored, and the feature would look broken for reasons that have
 * nothing to do with attribution. `sameSite: "lax"` is what lets the cookie
 * ride along on the top-level navigation that starts at the referral link,
 * while still blocking it on cross-site subrequests. `path: "/"` keeps one
 * cookie per site rather than one per landing path.
 */
export function referralCookieOptions(
  maxAgeSeconds: number = Math.floor(ATTRIBUTION_WINDOW_MS / 1000),
  secure: boolean = process.env.NODE_ENV === "production",
) {
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
    priority: "low" as const,
  };
}
