import { PAY_PAGE_PATH, PAY_SKU_PARAM, payableSkuById } from "./crypto/catalog.ts";
import { cryptoPriceUsd, listPriceUsd } from "./pricing/crypto-checkout.ts";
import { PRODUCT_PATHS } from "./products.ts";
import { navHref, type Locale } from "./site.ts";

/**
 * Showroom AI — the customer-facing product brand (owner decision 2026-10-06).
 *
 * Showroom AI is sold as one brand with three roles: Seller, Marketer and
 * Business Assistant. The roles are also sold separately, and the bundles are
 * cheaper than the sum of their parts.
 *
 * This module holds only the *structure* — which role sits in which bundle and
 * which published SKU each offering maps to. Every amount is resolved from
 * `PAYABLE_SKUS` (`lib/crypto/catalog.ts`) and discounted with
 * `cryptoPriceUsd()` (`lib/pricing/crypto-checkout.ts`), so a marketing page
 * can never publish a price the checkout cannot charge. Display strings live in
 * `content/showroom-ai.ts` (RU + EN, other locales fall back to EN).
 */

/** Optional done-for-you catalogue/formula setup. Self-setup is free. */
export const SHOWROOM_AI_SETUP_FEE_USD = 300;

/** Free trial length. No card required; launch inside 24 hours. */
export const SHOWROOM_AI_TRIAL_DAYS = 7;

export type ShowroomRoleId = "seller" | "marketer" | "assistant";

export type ShowroomPlanId = "start" | "business" | "pro";

export type MarketerTier = "lite" | "pro";

export type ShowroomPlan = {
  id: ShowroomPlanId;
  /** Published id in `PAYABLE_SKUS`. */
  skuId: string;
  /** Roles the bundle covers. */
  roles: ShowroomRoleId[];
  /** Scope of the Marketer role when the bundle includes it. */
  marketerTier?: MarketerTier;
  featured?: boolean;
};

/** Bundles, cheapest first. */
export const SHOWROOM_AI_PLANS: readonly ShowroomPlan[] = [
  { id: "start", skuId: "showroom-start", roles: ["seller"] },
  {
    id: "business",
    skuId: "showroom-growth",
    roles: ["seller", "marketer"],
    marketerTier: "lite",
    featured: true,
  },
  {
    id: "pro",
    skuId: "showroom-pro",
    roles: ["seller", "marketer"],
    marketerTier: "pro",
  },
];

export type ShowroomSeparateOffer = {
  id: string;
  /** Published id in `PAYABLE_SKUS`. */
  skuId: string;
  role: ShowroomRoleId;
};

/**
 * A role bought on its own. Seller is the Start bundle (the Seller role is the
 * whole of it); Marketer and Business Assistant keep their existing published
 * SKUs and prices, which the decision leaves unchanged.
 */
export const SHOWROOM_AI_SEPARATE_OFFERS: readonly ShowroomSeparateOffer[] = [
  { id: "seller", skuId: "showroom-start", role: "seller" },
  { id: "marketer-lite", skuId: "aime-lite", role: "marketer" },
  { id: "marketer-pro", skuId: "aime-pro", role: "marketer" },
  { id: "assistant-entry", skuId: "assistant-entry", role: "assistant" },
  { id: "assistant-standard", skuId: "assistant-standard", role: "assistant" },
];

/**
 * Where each role page lives. The Seller role is the Showroom AI page itself;
 * Marketer and Business Assistant keep their long-published URLs so existing
 * links, search results and partner landing paths keep working.
 */
export const SHOWROOM_AI_ROLE_PATHS: Record<ShowroomRoleId, string> = {
  seller: `${PRODUCT_PATHS.showroom}#seller`,
  marketer: PRODUCT_PATHS.aime,
  assistant: PRODUCT_PATHS.assistant,
};

export const SHOWROOM_AI_BRAND_PATH = PRODUCT_PATHS.showroom;

export function showroomRoleHref(locale: Locale, role: ShowroomRoleId): string {
  const [base, hash] = SHOWROOM_AI_ROLE_PATHS[role].split("#");
  const href = navHref(locale, base);
  return hash ? `${href}#${hash}` : href;
}

export type SkuPrice = {
  skuId: string;
  /** Catalog display name — the fallback when a locale has no plan copy. */
  name: string;
  /** Card / list price in USD. */
  listUsd: number;
  /** USDT / USDC price: list minus the computed crypto discount. */
  cryptoUsd: number;
};

/**
 * List and crypto amounts for a published SKU, or null when the SKU is not in
 * the catalog. Returning null (rather than throwing) keeps a render path from
 * crashing on a stale id; callers simply skip the offering.
 */
export function skuPrice(skuId: string): SkuPrice | null {
  const sku = payableSkuById(skuId);
  if (!sku) return null;
  return {
    skuId: sku.id,
    name: sku.name,
    listUsd: listPriceUsd(sku.amountUsd),
    cryptoUsd: cryptoPriceUsd(sku.amountUsd),
  };
}

/** `/pay?sku=<id>` — the one purchase path, with the offering preselected. */
export function skuPayHref(locale: Locale, skuId: string): string {
  return `${navHref(locale, PAY_PAGE_PATH)}?${PAY_SKU_PARAM}=${encodeURIComponent(skuId)}`;
}
