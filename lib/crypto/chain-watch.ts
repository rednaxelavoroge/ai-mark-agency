import "server-only";

import type { PaymentAsset, PaymentNetwork } from "./networks";

/**
 * Read-only lookup of incoming USDT/USDC transfers to a treasury address.
 * Public endpoints by default; every URL can be overridden by env.
 * Never signs, never holds keys.
 */

export type IncomingTransfer = {
  txHash: string;
  /** Received amount in whole cents (floor). */
  cents: number;
  /** Unix ms when the transfer landed (0 when the source does not say). */
  at: number;
};

export type WatchResult =
  | { ok: true; transfers: IncomingTransfer[] }
  | { ok: false; error: string };

type TokenSpec = { contract: string; decimals: number };

const TOKENS: Record<PaymentNetwork, Partial<Record<PaymentAsset, TokenSpec>>> = {
  tron: {
    USDT: { contract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", decimals: 6 },
    USDC: { contract: "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8", decimals: 6 },
  },
  ethereum: {
    USDT: { contract: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6 },
    USDC: { contract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6 },
  },
  polygon: {
    USDT: { contract: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", decimals: 6 },
    USDC: { contract: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", decimals: 6 },
  },
  bnb: {
    USDT: { contract: "0x55d398326f99059fF775485246999027B3197955", decimals: 18 },
    USDC: { contract: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", decimals: 18 },
  },
  solana: {
    USDT: { contract: "Es9vMFrajaJoqZ4WYnDbrRSZ3ESgTwzX3ZUAXN6aQbZ", decimals: 6 },
    USDC: { contract: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", decimals: 6 },
  },
  ton: {
    USDT: { contract: "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs", decimals: 6 },
  },
};

const EVM_RPC: Record<"ethereum" | "polygon" | "bnb", { env: string; fallbacks: string[]; blockSec: number; publicMaxBlocks?: number }> = {
  ethereum: { env: "ETHEREUM_RPC_URL", fallbacks: ["https://ethereum-rpc.publicnode.com", "https://ethereum.publicnode.com", "https://rpc.mevblocker.io"], blockSec: 12 },
  polygon: { env: "POLYGON_RPC_URL", fallbacks: ["https://polygon-bor-rpc.publicnode.com"], blockSec: 2 },
  bnb: { env: "BNB_RPC_URL", fallbacks: ["https://bsc-rpc.publicnode.com", "https://bsc.publicnode.com"], blockSec: 0.75, publicMaxBlocks: 9_000 },
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Try each endpoint in turn, with one short back-off pass (public RPCs rate-limit bursts). */
async function rpcAny(urls: string[], method: string, params: unknown[]): Promise<unknown> {
  let last: unknown;
  for (let pass = 0; pass < 2; pass += 1) {
    for (const url of urls) {
      try {
        return await rpc(url, method, params);
      } catch (error) {
        last = error;
      }
    }
    await sleep(700 + pass * 800);
  }
  throw last instanceof Error ? last : new Error(`${method} failed`);
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
}

const TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

function tokenFor(asset: PaymentAsset, network: PaymentNetwork): TokenSpec | null {
  if (network === "ton" && asset === "USDC") {
    const master = process.env.TON_USDC_JETTON_MASTER?.trim();
    return master ? { contract: master, decimals: 6 } : null;
  }
  return TOKENS[network][asset] ?? null;
}

/** Raw integer token units → whole cents (floor). */
export function rawToCents(raw: string, decimals: number): number {
  const clean = raw.replace(/^0x/i, "");
  const big = /^[0-9]+$/.test(raw) ? BigInt(raw) : BigInt(`0x${clean || "0"}`);
  const scale = BigInt(10) ** BigInt(Math.max(decimals - 2, 0));
  return Number(big / scale);
}

async function getJson(url: string, init?: RequestInit): Promise<unknown> {
  const res = await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${new URL(url).host}`);
  return res.json();
}

async function rpc(url: string, method: string, params: unknown[]): Promise<unknown> {
  const json = (await getJson(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  })) as { result?: unknown; error?: { message?: string } };
  if (json.error) throw new Error(json.error.message ?? `${method} failed`);
  return json.result;
}

async function tronTransfers(address: string, token: TokenSpec, sinceMs: number): Promise<IncomingTransfer[]> {
  const base = process.env.TRONGRID_URL?.trim() || "https://api.trongrid.io";
  const key = process.env.TRONGRID_API_KEY?.trim();
  const url = `${base}/v1/accounts/${address}/transactions/trc20?only_to=true&limit=100&contract_address=${token.contract}&min_timestamp=${Math.max(0, sinceMs)}`;
  const json = (await getJson(url, key ? { headers: { "TRON-PRO-API-KEY": key } } : undefined)) as {
    data?: Array<{ transaction_id?: string; value?: string; to?: string; block_timestamp?: number }>;
  };
  return (json.data ?? [])
    .filter((t) => t.transaction_id && t.value && t.to === address)
    .map((t) => ({ txHash: t.transaction_id!, cents: rawToCents(t.value!, token.decimals), at: t.block_timestamp ?? 0 }));
}

async function evmTransfers(
  network: "ethereum" | "polygon" | "bnb",
  address: string,
  token: TokenSpec,
  sinceMs: number,
): Promise<IncomingTransfer[]> {
  const spec = EVM_RPC[network];
  const custom = process.env[spec.env]?.trim();
  const urls = custom ? [custom, ...spec.fallbacks] : spec.fallbacks;
  const head = parseInt(String(await rpcAny(urls, "eth_blockNumber", [])), 16);
  const ageSec = Math.max(60, (Date.now() - sinceMs) / 1000 + 120);
  const CHUNK = 5000;
  const MAX_CHUNKS = 12;
  // Free public BNB nodes only serve ~2h of recent logs; a keyed BNB_RPC_URL lifts the cap.
  const cap = !custom && spec.publicMaxBlocks ? spec.publicMaxBlocks : CHUNK * MAX_CHUNKS;
  const back = Math.min(Math.ceil(ageSec / spec.blockSec), cap);
  const toTopic = `0x${address.toLowerCase().replace(/^0x/, "").padStart(64, "0")}`;
  const ranges: Array<[number, number]> = [];
  for (let to = head; to > head - back; to -= CHUNK) {
    ranges.push([Math.max(to - CHUNK + 1, head - back + 1), to]);
  }
  const results = await mapLimit(ranges, 3, ([from, to]) =>
      rpcAny(urls, "eth_getLogs", [
        {
          fromBlock: `0x${from.toString(16)}`,
          toBlock: `0x${to.toString(16)}`,
          address: token.contract,
          topics: [TRANSFER_TOPIC, null, toTopic],
        },
      ]) as Promise<Array<{ transactionHash?: string; data?: string; removed?: boolean }>>,
  );
  const out: IncomingTransfer[] = [];
  for (const logs of results) {
    for (const log of logs ?? []) {
      if (!log.transactionHash || !log.data || log.removed) continue;
      out.push({ txHash: log.transactionHash, cents: rawToCents(log.data, token.decimals), at: 0 });
    }
  }
  return out;
}

async function solanaTransfers(address: string, token: TokenSpec, sinceMs: number): Promise<IncomingTransfer[]> {
  const custom = process.env.SOLANA_RPC_URL?.trim();
  const defaults = ["https://solana-rpc.publicnode.com", "https://api.mainnet-beta.solana.com"];
  const urls = custom ? [custom, ...defaults] : defaults;
  const accounts = (await rpcAny(urls, "getTokenAccountsByOwner", [
    address,
    { mint: token.contract },
    { encoding: "jsonParsed" },
  ])) as { value?: Array<{ pubkey: string }> };
  const out: IncomingTransfer[] = [];
  for (const acc of (accounts.value ?? []).slice(0, 3)) {
    const sigs = (await rpcAny(urls, "getSignaturesForAddress", [acc.pubkey, { limit: 25 }])) as Array<{
      signature: string;
      blockTime?: number | null;
      err?: unknown;
    }>;
    for (const sig of sigs ?? []) {
      if (sig.err != null) continue;
      const at = (sig.blockTime ?? 0) * 1000;
      if (at && at < sinceMs) continue;
      const tx = (await rpcAny(urls, "getTransaction", [
        sig.signature,
        { encoding: "jsonParsed", maxSupportedTransactionVersion: 0, commitment: "confirmed" },
      ])) as {
        meta?: {
          preTokenBalances?: Array<{ owner?: string; mint?: string; uiTokenAmount?: { amount?: string } }>;
          postTokenBalances?: Array<{ owner?: string; mint?: string; uiTokenAmount?: { amount?: string } }>;
        };
      } | null;
      const pick = (rows?: Array<{ owner?: string; mint?: string; uiTokenAmount?: { amount?: string } }>) =>
        (rows ?? [])
          .filter((r) => r.owner === address && r.mint === token.contract)
          .reduce((sum, r) => sum + BigInt(r.uiTokenAmount?.amount ?? "0"), BigInt(0));
      const delta = pick(tx?.meta?.postTokenBalances) - pick(tx?.meta?.preTokenBalances);
      if (delta > BigInt(0)) out.push({ txHash: sig.signature, cents: rawToCents(delta.toString(), token.decimals), at });
    }
  }
  return out;
}

async function tonTransfers(address: string, token: TokenSpec, sinceMs: number): Promise<IncomingTransfer[]> {
  const base = process.env.TONCENTER_URL?.trim() || "https://toncenter.com/api/v3";
  const key = process.env.TONCENTER_API_KEY?.trim();
  const url = `${base}/jetton/transfers?owner_address=${encodeURIComponent(address)}&jetton_master=${encodeURIComponent(token.contract)}&direction=in&limit=100&sort=desc&start_utime=${Math.floor(Math.max(0, sinceMs) / 1000)}`;
  const json = (await getJson(url, key ? { headers: { "X-API-Key": key } } : undefined)) as {
    jetton_transfers?: Array<{ transaction_hash?: string; amount?: string; transaction_now?: number; transaction_aborted?: boolean }>;
  };
  return (json.jetton_transfers ?? [])
    .filter((t) => t.transaction_hash && t.amount && !t.transaction_aborted)
    .map((t) => ({
      txHash: Buffer.from(t.transaction_hash!, "base64").toString("hex"),
      cents: rawToCents(t.amount!, token.decimals),
      at: (t.transaction_now ?? 0) * 1000,
    }));
}

export async function incomingTransfers(
  asset: PaymentAsset,
  network: PaymentNetwork,
  address: string,
  sinceMs: number,
): Promise<WatchResult> {
  const token = tokenFor(asset, network);
  if (!token) return { ok: false, error: `${asset} on ${network} is not supported for auto-check` };
  try {
    let transfers: IncomingTransfer[];
    if (network === "tron") transfers = await tronTransfers(address, token, sinceMs);
    else if (network === "solana") transfers = await solanaTransfers(address, token, sinceMs);
    else if (network === "ton") transfers = await tonTransfers(address, token, sinceMs);
    else transfers = await evmTransfers(network, address, token, sinceMs);
    return { ok: true, transfers };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "chain lookup failed" };
  }
}
