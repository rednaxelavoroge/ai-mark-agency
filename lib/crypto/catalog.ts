/**
 * Payable SKUs taken from published list prices only.
 *
 * Product pages: content/products/{aime,assistant,showroom}.ts
 *
 * Department retainers (Starter / Growth / Scale) stay published on /pricing
 * but are not self-serve. Their call to action is the contact form.
 * Custom / "по запросу" / Digital Production are not here — there is no
 * published number to charge.
 */

/** Each self-serve product SKU is a 30-day subscription period. */
export const SUBSCRIPTION_PERIOD_DAYS = 30;

/**
 * The one payment path a buyer is sent to from anywhere on the site.
 *
 * Every "buy" call-to-action on a product page links here with
 * `?sku=<published sku id>`, so the visitor never has to re-identify the
 * product they just chose. Department retainers do not. It lives next to the
 * SKU list because the two must agree: a link may only ever preselect an id
 * that exists in `PAYABLE_SKUS`.
 */
export const PAY_PAGE_PATH = "/pay";

/**
 * The query parameter a buy link uses to preselect a SKU on `/pay`.
 *
 * It carries a published sku id, never a price: the amount charged is always
 * resolved server-side from `PAYABLE_SKUS`, so a hand-edited URL cannot change
 * what is invoiced.
 */
export const PAY_SKU_PARAM = "sku";

export type PayableSku = {
  id: string;
  productRef: string;
  amountUsd: number;
  name: string;
  /** Set for self-serve subscriptions. Null would mean a one-time charge. */
  billingPeriodDays: number;
};

export const PAYABLE_SKUS: PayableSku[] = [
  {
    id: "aime-lite",
    productRef: "aime",
    amountUsd: 199,
    name: "AIME Lite",
    billingPeriodDays: SUBSCRIPTION_PERIOD_DAYS,
  },
  {
    id: "aime-pro",
    productRef: "aime",
    amountUsd: 349,
    name: "AIME Pro",
    billingPeriodDays: SUBSCRIPTION_PERIOD_DAYS,
  },
  {
    id: "assistant-entry",
    productRef: "assistant",
    amountUsd: 149,
    name: "AI Business Assistant Entry",
    billingPeriodDays: SUBSCRIPTION_PERIOD_DAYS,
  },
  {
    id: "assistant-standard",
    productRef: "assistant",
    amountUsd: 249,
    name: "AI Business Assistant Standard",
    billingPeriodDays: SUBSCRIPTION_PERIOD_DAYS,
  },
  // Legacy Showroom SKUs, kept payable so an already-published `/pay?sku=`
  // link or an outstanding invoice still resolves. They are not part of the
  // Showroom AI role catalogue below, and their list prices never change —
  // an existing subscriber must not be re-priced by a catalog edit.
  {
    id: "showroom-standard",
    productRef: "showroom",
    amountUsd: 199,
    name: "SHOWROOM AI Standard (legacy)",
    billingPeriodDays: SUBSCRIPTION_PERIOD_DAYS,
  },
  {
    id: "showroom-business",
    productRef: "showroom",
    amountUsd: 299,
    name: "SHOWROOM AI Business (legacy)",
    billingPeriodDays: SUBSCRIPTION_PERIOD_DAYS,
  },
  // Showroom AI bundles, 2026-10-06. The id is internal; the customer-facing
  // tier name ("Business") is the display name, and the middle tier keeps the
  // `growth` id used elsewhere in this repo for the second step of a ladder.
  {
    id: "showroom-start",
    productRef: "showroom",
    amountUsd: 89,
    name: "Showroom AI Start",
    billingPeriodDays: SUBSCRIPTION_PERIOD_DAYS,
  },
  {
    id: "showroom-growth",
    productRef: "showroom",
    amountUsd: 249,
    name: "Showroom AI Business",
    billingPeriodDays: SUBSCRIPTION_PERIOD_DAYS,
  },
  {
    id: "showroom-pro",
    productRef: "showroom",
    amountUsd: 449,
    name: "Showroom AI Pro",
    billingPeriodDays: SUBSCRIPTION_PERIOD_DAYS,
  },
];

export function isSubscriptionSku(sku: PayableSku | null | undefined): boolean {
  return Boolean(sku && sku.billingPeriodDays > 0);
}

export function payableSkuById(id: string): PayableSku | null {
  return PAYABLE_SKUS.find((sku) => sku.id === id) ?? null;
}

/**
 * The published sku id a `?sku=` value refers to, or null.
 *
 * Unknown or hand-edited values are dropped rather than repaired: `/pay` then
 * falls back to its normal first-SKU default instead of inventing a product.
 */
export function payableSkuIdFromParam(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const id = value.trim();
  if (!id || id.length > 64) return null;
  return payableSkuById(id)?.id ?? null;
}

export function formatUsdAmount(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
