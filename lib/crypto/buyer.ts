const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Lowercased buyer email, or null when the value is not a usable address. */
export function normalizeBuyerEmail(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (!email || email.length > 320 || !EMAIL_RE.test(email)) return null;
  return email;
}

/** Optional short text. Empty becomes null. */
export function optionalBuyerText(
  value: string | null | undefined,
  max: number,
): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim().slice(0, max);
  return text || null;
}
