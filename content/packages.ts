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
 * Proprietary AI products that AI MARK provisions and operates for clients.
 * Detail pages are hosted natively on this domain.
 */
export const products: {
  id: ProductId;
  name: string;
}[] = [
  { id: "aime", name: "AI Marketing Employee (AIME)" },
  { id: "assistant", name: "AI Business Assistant" },
  { id: "showroom", name: "SHOWROOM AI / AI Sales Agent" },
];
