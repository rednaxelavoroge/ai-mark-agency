export type PackageId = "starter" | "growth" | "scale";

export type AgencyPackage = {
  id: PackageId;
  priceUsd: number;
  featured?: boolean;
};

/** USD retainers — single source of truth for pricing. */
export const packages: AgencyPackage[] = [
  { id: "starter", priceUsd: 1200 },
  { id: "growth", priceUsd: 2200, featured: true },
  { id: "scale", priceUsd: 3500 },
];

export const toolsViaAgency = [
  {
    id: "aime",
    name: "AI Marketing Employee (AIME)",
  },
  {
    id: "assistant",
    name: "AI Business Assistant",
  },
  {
    id: "showroom",
    name: "Showroom AI",
  },
] as const;
