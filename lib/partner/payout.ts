/** Minimum payable balance before a partner can open a payout request (USD). */
export const PARTNER_PAYOUT_MIN_USD = 50;

export function parsePayableAmount(amount: string | null): number | null {
  if (amount === null) return null;
  const n = Number(amount);
  return Number.isFinite(n) ? n : null;
}

export function canRequestPayout(input: {
  payableAmount: string | null;
  currency: string | null;
  hasOpenPayout: boolean;
  hasDestination: boolean;
}): { ok: true } | { ok: false; reason: string } {
  if (!input.hasDestination) {
    return { ok: false, reason: "missing_destination" };
  }
  if (input.hasOpenPayout) {
    return { ok: false, reason: "open_payout" };
  }
  const payable = parsePayableAmount(input.payableAmount);
  if (payable === null || !input.currency) {
    return { ok: false, reason: "unreadable" };
  }
  if (input.currency !== "USD") {
    return { ok: false, reason: "currency" };
  }
  if (payable < PARTNER_PAYOUT_MIN_USD) {
    return { ok: false, reason: "below_minimum" };
  }
  return { ok: true };
}
