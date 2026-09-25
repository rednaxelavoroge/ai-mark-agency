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
    name: "Showroom.pro Standard",
  },
  {
    id: "showroom-business",
    productRef: "showroom",
    amountUsd: 299,
    name: "Showroom.pro Business",
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

export function formatUsdAmount(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
