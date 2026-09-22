/**
 * Referral attribution rules — pure and dependency-free.
 *
 * This module has NO imports on purpose: it is imported directly by the Node
 * test runner (`node --test supabase/tests/referral.test.mjs`), which cannot
 * resolve the `@/*` path alias. Keep it free of `next/*`, `server-only` and
 * `@/` imports, and keep every function deterministic (time is always passed
 * in, never read from the clock here).
 *
 * The rules themselves are quoted from the Phase 4B brief so the code and the
 * documentation cannot drift apart:
 *
 *   Partner signup:  Last valid partner referral before signup.
 *   Customer lead:   Last valid partner referral within 30 days before lead
 *                    creation.
 *
 * "Last valid" is decided by the *server* from the signed attribution cookie
 * (see ./cookie.ts): the most recent /go/<code> visit that produced a valid,
 * unexpired cookie wins. A lead is therefore attributed to the last partner
 * link the visitor followed, and a new partner is attributed to the last
 * partner link they followed before signing up.
 */

/** Fallback landing path when `/go/<code>` is opened without `?to=`. */
export const DEFAULT_LANDING_PATH = "/partners";

/** Referral code shape. Mirrors the CHECK constraint in the migrations. */
export const REFERRAL_CODE_RE = /^[a-z0-9][a-z0-9_-]{3,31}$/;

/** Canonical production origin. Mirrors `site.url` in lib/site.ts. */
export const SITE_ORIGIN = "https://ai-mark.agency";

/** Longest accepted `?to=` value, before path parsing. */
export const MAX_LANDING_PATH_LENGTH = 300;

/** Longest accepted UTM value. Mirrors the column CHECK constraints. */
export const MAX_UTM_LENGTH = 200;

/**
 * UTM parameters forwarded to the landing page. `utm_source`, `utm_medium`
 * and `utm_campaign` are also persisted on the click row, because those are
 * the three the schema records.
 */
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/** The subset of UTM_KEYS that has a dedicated column in referral_clicks. */
export const UTM_STORED_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

/**
 * Prefixes `/go/<code>` must never redirect into: platform surfaces, the API,
 * other referral links (loop) and Next internals. Redirecting a public
 * referral link into an authenticated surface is a phishing-shaped behaviour,
 * so it is refused even though the path is same-origin.
 */
const RESERVED_PATH_PREFIXES = [
  "/go",
  "/api",
  "/auth",
  "/partner",
  "/admin",
  "/_next",
] as const;

/**
 * Normalises a referral code from a URL segment.
 *
 * Returns null when the segment is not a valid code. Codes are stored
 * lower-case, so a shouted URL still resolves; everything else is rejected
 * rather than silently repaired.
 */
export function normalizeReferralCode(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const code = value.trim().toLowerCase();
  return REFERRAL_CODE_RE.test(code) ? code : null;
}

/** True when `value` is already a valid referral code. */
export function isReferralCode(value: unknown): boolean {
  return typeof value === "string" && REFERRAL_CODE_RE.test(value);
}

/**
 * Trims and bounds one UTM value. Returns null for anything empty, control
 * characters are dropped, and the result is capped so a hostile query string
 * cannot exceed the column constraint (or bloat a redirect URL).
 */
export function sanitizeUtm(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, MAX_UTM_LENGTH);
  return cleaned.length > 0 ? cleaned : null;
}

/**
 * Extracts the UTM parameters this engine understands from a query string.
 * Unknown `utm_*` keys are ignored — only the documented set is forwarded, so
 * the redirect cannot be used to shuttle arbitrary parameters around.
 */
export function collectUtm(
  searchParams: Pick<URLSearchParams, "get">,
): UtmParams {
  const utm: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = sanitizeUtm(searchParams.get(key));
    if (value) utm[key] = value;
  }
  return utm;
}

/**
 * Resolves `?to=` into a safe, same-origin path.
 *
 * Anything that is not a plain internal path — a scheme, a protocol-relative
 * `//host`, a backslash (which some browsers normalise to `/`), a reserved
 * prefix, an over-long value — falls back to DEFAULT_LANDING_PATH instead of
 * being "fixed up". Query strings in `to` are dropped; the only query
 * parameters that survive are the sanitised UTM ones, re-attached below.
 */
export function resolveLandingPath(
  rawTo: unknown,
  utm: UtmParams = {},
): string {
  const fallback = DEFAULT_LANDING_PATH;
  let path = fallback;

  if (
    typeof rawTo === "string" &&
    rawTo.length > 0 &&
    rawTo.length <= MAX_LANDING_PATH_LENGTH
  ) {
    path = safeInternalPath(rawTo) ?? fallback;
  }

  const query = new URLSearchParams();
  for (const key of UTM_KEYS) {
    const value = utm[key];
    if (value) query.set(key, value);
  }
  const qs = query.toString();
  return qs ? `${path}?${qs}` : path;
}

/**
 * The path portion of a resolved landing value — what goes into
 * `referral_clicks.landing_path` (UTMs are stored in their own columns).
 */
export function landingPathOnly(resolvedLanding: string): string {
  const index = resolvedLanding.indexOf("?");
  return index === -1 ? resolvedLanding : resolvedLanding.slice(0, index);
}

/**
 * How long a single browser visit is treated as one click. A refresh, or a
 * second visit to the same link inside this window, reuses the recorded click
 * instead of inflating the partner's click count. Following a *different*
 * partner's link still re-attributes (last valid referral wins).
 *
 * (`ATTRIBUTION_WINDOW_DAYS` and the freshness check live in ./cookie.ts,
 * next to the signature that makes them meaningful.)
 */
export const CLICK_DEDUPE_MS = 30 * 60 * 1000;

/**
 * Builds the public referral URL for a code. Kept here (rather than in the
 * dashboard component) so the `/go/<code>` shape has one definition that the
 * tests can assert directly.
 */
export function buildReferralUrl(code: string, origin = SITE_ORIGIN): string {
  return `${origin}/go/${code}`;
}

/** Same-origin path, or null. See resolveLandingPath() for the policy. */
function safeInternalPath(raw: string): string | null {
  if (!raw.startsWith("/")) return null;
  if (raw.startsWith("//")) return null;
  if (raw.includes("\\")) return null;
  if (raw.includes("\u0000")) return null;

  let parsed: URL;
  try {
    // Parsing against a placeholder origin is what proves "same origin": a
    // value such as `https://evil.com` or `//evil.com` changes parsed.origin.
    parsed = new URL(raw, SITE_ORIGIN);
  } catch {
    return null;
  }

  if (parsed.origin !== SITE_ORIGIN) return null;

  const path = parsed.pathname;
  if (!path.startsWith("/")) return null;
  if (path.length > MAX_LANDING_PATH_LENGTH) return null;

  const reserved = RESERVED_PATH_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
  if (reserved) return null;

  return path;
}
