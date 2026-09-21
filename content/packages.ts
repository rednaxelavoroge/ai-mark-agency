export type PackageId = "starter" | "growth" | "scale";
export type ProductId = "aime" | "assistant" | "showroom";

export type AgencyPackage = {
  id: PackageId;
  priceUsd: number;
  featured?: boolean;
};

/** USD retainers — single source of truth for service pricing. */
export const packages: AgencyPackage[] = [
  { id: "starter", priceUsd: 1200 },
  { id: "growth", priceUsd: 2200, featured: true },
  { id: "scale", priceUsd: 3500 },
];

/**
 * AlexDev products AI Mark Agency runs for clients and can provision.
 * Soft list prices from https://www.alex-dev.pro/{locale}/products — not a cloned hub.
 */
export const products: {
  id: ProductId;
  name: string;
}[] = [
  { id: "aime", name: "AI Marketing Employee (AIME)" },
  { id: "assistant", name: "AI Business Assistant" },
  { id: "showroom", name: "Showroom AI" },
];
