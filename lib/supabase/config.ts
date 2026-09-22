/**
 * Supabase public configuration.
 *
 * The Partner Platform is additive: `ai-mark.agency` and the public site must
 * keep building and serving even before a Supabase project is reachable. Every
 * consumer checks isSupabaseConfigured() and degrades to a clear "not
 * configured" state instead of crashing the build or the public pages.
 *
 * Only NEXT_PUBLIC_* values live here, because this module is imported by
 * client components. The secret key is deliberately absent — it is read only
 * in `server-only` modules (`lib/supabase/admin.ts` for the elevated client,
 * `lib/referral/attribution.ts` for tracking availability, and
 * `lib/referral/cookie.ts` as the HMAC fallback).
 *
 * Key scheme (current Supabase API keys):
 *   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  sb_publishable_…  browser-safe; RLS applies
 *   SUPABASE_SECRET_KEY                   sb_secret_…       server only; BYPASSES RLS
 *
 * Both are short opaque strings, not JWTs. If a value starts with `eyJ`, it is
 * a legacy `anon` / `service_role` key.
 */

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

/** Prefix of a Supabase secret key. It must never appear in a public variable. */
const SECRET_KEY_PREFIX = "sb_secret_";
/** Prefix of a Supabase publishable key. */
const PUBLISHABLE_KEY_PREFIX = "sb_publishable_";

/**
 * Describes what is wrong with the public configuration, or null when it is
 * usable. Returning the reason (rather than a bare boolean) lets the auth
 * screens show the operator exactly what to fix.
 */
export function describeSupabaseConfigProblem(): string | null {
  if (!supabaseUrl) {
    return "NEXT_PUBLIC_SUPABASE_URL is not set.";
  }
  if (!supabasePublishableKey) {
    return "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not set.";
  }
  if (supabasePublishableKey.startsWith(SECRET_KEY_PREFIX)) {
    return (
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY contains a SECRET key " +
      "(sb_secret_…). NEXT_PUBLIC_ values are inlined into the browser bundle, " +
      "and a secret key bypasses Row Level Security on every table. Move it to " +
      "SUPABASE_SECRET_KEY, put the sb_publishable_… key here, and rotate the " +
      "exposed secret key in the Supabase dashboard."
    );
  }
  if (!supabasePublishableKey.startsWith(PUBLISHABLE_KEY_PREFIX)) {
    // Not fatal: a legacy `anon` JWT is low-privilege and still works.
    return null;
  }
  return null;
}

/**
 * True when the publishable configuration is present and safe to ship.
 *
 * A secret key misplaced in a NEXT_PUBLIC_ variable makes this false on
 * purpose: the platform refuses to run rather than ship a master key.
 */
export function isSupabaseConfigured(): boolean {
  return describeSupabaseConfigProblem() === null;
}

/**
 * The publishable configuration, or a thrown error explaining what is missing.
 * Callers that must not throw check isSupabaseConfigured() first.
 */
export function requireSupabaseConfig(): { url: string; key: string } {
  const problem = describeSupabaseConfigProblem();
  if (problem) {
    throw new Error(
      `Supabase is not usable: ${problem} See .env.example and restart the server.`,
    );
  }
  return { url: supabaseUrl, key: supabasePublishableKey };
}
