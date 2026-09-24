/**
 * Post-authentication redirect safety.
 *
 * `next` arrives from a query string or a form field, so it is untrusted. Only
 * same-origin, absolute paths are allowed, which stops an open redirect from
 * turning our login page into a phishing hop.
 */

export const DEFAULT_PARTNER_PATH = "/partner/dashboard";

/** Public signup that lands in the cabinet, where the referral link already exists. */
export const PARTNER_SIGNUP_HREF = `/auth/signup?next=${encodeURIComponent(DEFAULT_PARTNER_PATH)}`;

const DISALLOWED_PREFIXES = ["/auth", "/api", "/_next"];

export function safeNextPath(
  value: unknown,
  fallback: string = DEFAULT_PARTNER_PATH,
): string {
  if (typeof value !== "string") return fallback;

  const candidate = value.trim();
  if (candidate.length === 0 || candidate.length > 512) return fallback;

  // Must be an absolute path...
  if (!candidate.startsWith("/")) return fallback;
  // ...but not a protocol-relative URL ("//evil.example") or a backslash trick.
  if (candidate.startsWith("//") || candidate.includes("\\")) return fallback;
  // Control characters would let a value smuggle header content.
  if (/[\u0000-\u001f\u007f]/.test(candidate)) return fallback;

  for (const prefix of DISALLOWED_PREFIXES) {
    if (candidate === prefix || candidate.startsWith(`${prefix}/`)) {
      return fallback;
    }
  }

  return candidate;
}

/** Builds the login href, carrying the requested path through the flow. */
export function loginHref(nextPath: string): string {
  return `/auth/login?next=${encodeURIComponent(safeNextPath(nextPath))}`;
}
