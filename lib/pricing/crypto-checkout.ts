/**
 * Published checkout pricing: list (card) price is the catalog amount;
 * USDT/USDC payers receive a 4% discount off list.
 */

export const CRYPTO_CHECKOUT_DISCOUNT_BPS = 400;

const BPS_DENOM = 10_000;

/** Card / list price in USD (unchanged catalog amounts). */
export function listPriceUsd(amountUsd: number): number {
  if (!Number.isFinite(amountUsd) || amountUsd < 0) {
    throw new Error("amountUsd must be a non-negative finite number");
  }
  return amountUsd;
}

/** Crypto treasury price: list minus 4%, rounded to cents (half away from zero). */
export function cryptoPriceUsd(amountUsd: number): number {
  const list = listPriceUsd(amountUsd);
  const discounted = (list * (BPS_DENOM - CRYPTO_CHECKOUT_DISCOUNT_BPS)) / BPS_DENOM;
  return Math.round(discounted * 100) / 100;
}

export function formatUsdPrice(amount: number): string {
  const fixed = amount.toFixed(2);
  return fixed.endsWith(".00") ? `$${Math.trunc(amount)}` : `$${fixed}`;
}
