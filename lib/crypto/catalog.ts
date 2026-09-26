import { packages } from "@/content/packages";

/**
 * Payable SKUs taken from published list prices only.
 *
 * Product pages: content/products/{aime,assistant,showroom}.ts
 * Department retainers: content/packages.ts
 *
 * Custom / "по запросу" / Digital Production are not here — there is no
 * published number to charge.
 */

/**
 * The one payment path a buyer is sent to from anywhere on the site.
 *
 * Every "buy" call-to-action on a product page, a pricing card or the
 * department-retainer block links here with `?sku=<published sku id>`, so the
 * visitor never has to re-identify the product they just chose. It lives next
 * to the SKU list because the two must agree: a link may only ever preselect an
 * id that exists in `PAYABLE_SKUS`.
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
};

export const PAYABLE_SKUS: PayableSku[] = [
  { id: "aime-lite", productRef: "aime", amountUsd: 199, name: "AIME Lite" },
  { id: "aime-pro", productRef: "aime", amountUsd: 349, name: "AIME Pro" },
  {
    id: "assistant-entry",
    productRef: "assistant",
    amountUsd: 149,
    name: "AI Business Assistant Entry",
  },
  {
    id: "assistant-standard",
    productRef: "assistant",
    amountUsd: 249,
    name: "AI Business Assistant Standard",
  },
  {
    id: "showroom-standard",
    productRef: "showroom",
    amountUsd: 199,
    name: "SHOWROOM AI Standard",
  },
  {
    id: "showroom-business",
    productRef: "showroom",
    amountUsd: 299,
    name: "SHOWROOM AI Business",
  },
  ...packages.map((pkg) => ({
    id: pkg.id,
    productRef: pkg.id,
    amountUsd: pkg.priceUsd,
    name: `Department retainer · ${pkg.id[0].toUpperCase()}${pkg.id.slice(1)}`,
  })),
];

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
