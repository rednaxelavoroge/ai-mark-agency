import {
  DEFAULT_PAYOUT_NETWORK,
  PAYOUT_ASSET,
  isPayoutNetwork,
  looksLikeAddress,
  type PayoutNetwork,
} from "./networks";

export type StructuredPayout = {
  asset: typeof PAYOUT_ASSET;
  network: PayoutNetwork;
  address: string;
  notes: string | null;
};

const HEADER = /^USDC\s+(solana|ethereum|polygon|tron)\s*$/i;

/**
 * Canonical destination stored in profiles.payout_details:
 *
 *   USDC solana
 *   <address>
 *
 * Optional notes follow a blank line. Legacy free-text is left as-is.
 */
export function formatPayoutDetails(input: {
  network: PayoutNetwork;
  address: string;
  notes?: string | null;
}): string {
  const address = input.address.trim();
  const notes = input.notes?.trim() ?? "";
  const header = `${PAYOUT_ASSET} ${input.network}`;
  return notes ? `${header}\n${address}\n\n${notes}` : `${header}\n${address}`;
}

export function parsePayoutDetails(
  details: string | null | undefined,
): StructuredPayout | null {
  if (!details) return null;
  const lines = details.replace(/\r\n/g, "\n").trim().split("\n");
  const header = lines[0]?.trim() ?? "";
  const match = HEADER.exec(header);
  if (!match) return null;
  const network = match[1].toLowerCase();
  if (!isPayoutNetwork(network)) return null;
  const address = lines[1]?.trim() ?? "";
  if (!address) return null;
  const rest = lines.slice(2).join("\n").trim();
  return {
    asset: PAYOUT_ASSET,
    network,
    address,
    notes: rest || null,
  };
}

export function payoutAddressHint(
  details: string | null | undefined,
): { network: PayoutNetwork; address: string } | null {
  const parsed = parsePayoutDetails(details);
  if (!parsed) return null;
  return { network: parsed.network, address: parsed.address };
}

export function validatePartnerUsdcAddress(
  network: PayoutNetwork,
  address: string,
): string | null {
  const trimmed = address.trim();
  if (!trimmed) return null;
  if (!looksLikeAddress(network, trimmed)) {
    return `That does not look like a ${network} address.`;
  }
  return null;
}

export { DEFAULT_PAYOUT_NETWORK, PAYOUT_ASSET };
