import "server-only";

/**
 * Optional Solana JSON-RPC lookup. Reads recent signatures on our USDC
 * treasury address. Does not hold funds and does not sign anything.
 *
 * Unset SOLANA_RPC_URL → skipped. A public RPC is enough; this is not an
 * indexer for every chain.
 */

export type SolanaHint = {
  signature: string;
  slot: number | null;
  err: boolean;
};

export function solanaRpcUrl(): string | null {
  const raw = process.env.SOLANA_RPC_URL?.trim() ?? "";
  return raw.length > 0 ? raw : null;
}

export async function recentSignaturesForAddress(
  address: string,
  limit = 15,
): Promise<{ ok: true; hints: SolanaHint[] } | { ok: false; error: string }> {
  const url = solanaRpcUrl();
  if (!url) {
    return { ok: false, error: "SOLANA_RPC_URL is not set." };
  }
  if (!address.trim()) {
    return { ok: false, error: "No treasury address." };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getSignaturesForAddress",
        params: [address.trim(), { limit }],
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      return { ok: false, error: `Solana RPC HTTP ${response.status}` };
    }
    const json = (await response.json()) as {
      error?: { message?: string };
      result?: Array<{ signature?: string; slot?: number; err?: unknown }>;
    };
    if (json.error) {
      return { ok: false, error: json.error.message ?? "Solana RPC error" };
    }
    const hints = (json.result ?? [])
      .map((row) => ({
        signature: typeof row.signature === "string" ? row.signature : "",
        slot: typeof row.slot === "number" ? row.slot : null,
        err: row.err != null,
      }))
      .filter((row) => row.signature.length > 0);
    return { ok: true, hints };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Solana RPC failed",
    };
  }
}
