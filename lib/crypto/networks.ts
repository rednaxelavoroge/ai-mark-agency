export const PAYMENT_ASSETS = ["USDT", "USDC"] as const;
export type PaymentAsset = (typeof PAYMENT_ASSETS)[number];

/** Partner payout destinations stay on these four rails. */
export const PAYOUT_NETWORKS = [
  "tron",
  "ethereum",
  "polygon",
  "solana",
] as const;
export type PayoutNetwork = (typeof PAYOUT_NETWORKS)[number];

export const PAYMENT_NETWORKS = [
  ...PAYOUT_NETWORKS,
  "bnb",
  "ton",
] as const;
export type PaymentNetwork = (typeof PAYMENT_NETWORKS)[number];

export const PAYOUT_ASSET = "USDC" as const;
export const DEFAULT_PAYOUT_NETWORK: PayoutNetwork = "solana";

export const NETWORK_LABELS: Record<PaymentNetwork, string> = {
  tron: "Tron (TRC-20)",
  ethereum: "Ethereum (ERC-20)",
  polygon: "Polygon (ERC-20)",
  solana: "Solana",
  bnb: "BNB Chain (BEP-20)",
  ton: "TON",
};

const TREASURY_ENV: Record<PaymentAsset, Record<PaymentNetwork, string>> = {
  USDT: {
    tron: "TREASURY_USDT_TRON",
    ethereum: "TREASURY_USDT_ETHEREUM",
    polygon: "TREASURY_USDT_POLYGON",
    solana: "TREASURY_USDT_SOLANA",
    bnb: "TREASURY_USDT_BNB",
    ton: "TREASURY_USDT_TON",
  },
  USDC: {
    tron: "TREASURY_USDC_TRON",
    ethereum: "TREASURY_USDC_ETHEREUM",
    polygon: "TREASURY_USDC_POLYGON",
    solana: "TREASURY_USDC_SOLANA",
    bnb: "TREASURY_USDC_BNB",
    ton: "TREASURY_USDC_TON",
  },
};

export function treasuryEnvName(
  asset: PaymentAsset,
  network: PaymentNetwork,
): string {
  return TREASURY_ENV[asset][network];
}

/** Receive address from env. Empty means that rail is not configured. */
export function treasuryAddress(
  asset: PaymentAsset,
  network: PaymentNetwork,
): string | null {
  const raw = process.env[treasuryEnvName(asset, network)]?.trim() ?? "";
  return raw.length > 0 ? raw : null;
}

export function configuredTreasuryRails(): Array<{
  asset: PaymentAsset;
  network: PaymentNetwork;
  address: string;
  envName: string;
}> {
  const rows = [];
  for (const asset of PAYMENT_ASSETS) {
    for (const network of PAYMENT_NETWORKS) {
      const address = treasuryAddress(asset, network);
      if (address) {
        rows.push({
          asset,
          network,
          address,
          envName: treasuryEnvName(asset, network),
        });
      }
    }
  }
  return rows;
}

export function isPaymentAsset(value: string): value is PaymentAsset {
  return (PAYMENT_ASSETS as readonly string[]).includes(value);
}

export function isPaymentNetwork(value: string): value is PaymentNetwork {
  return (PAYMENT_NETWORKS as readonly string[]).includes(value);
}

export function isPayoutNetwork(value: string): value is PayoutNetwork {
  return (PAYOUT_NETWORKS as readonly string[]).includes(value);
}

const EVM = /^0x[a-fA-F0-9]{40}$/;
const TRON = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;
const SOLANA = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const TON = /^(?:EQ|UQ)[A-Za-z0-9_-]{46}$/;
const TX = /^[0-9A-Za-z]+$/;

export function looksLikeAddress(network: PaymentNetwork, value: string): boolean {
  const trimmed = value.trim();
  if (network === "ethereum" || network === "polygon" || network === "bnb") {
    return EVM.test(trimmed);
  }
  if (network === "tron") return TRON.test(trimmed);
  if (network === "ton") return TON.test(trimmed);
  return SOLANA.test(trimmed);
}

export function looksLikeTxHash(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length >= 8 && trimmed.length <= 128 && TX.test(trimmed);
}
