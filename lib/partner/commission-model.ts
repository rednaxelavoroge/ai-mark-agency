/**
 * Partner Commission Model v2 — immutable published contract.
 *
 * Runtime posting still reads `commission_rules` on the server. This module is
 * the single source of truth for the approved rates, the 80% pool cap, and the
 * integer minor-unit formula used by marketing, dashboard copy, and tests.
 * Clients never send rates; the ledger ignores any client-supplied figure.
 *
 * commission = commissionableAmount × levelRate
 * sum(levels) ≤ commissionableAmount × PARTNER_POOL_CAP (0.80)
 *
 * commissionableAmount is `sales.amount`: the amount collected on a qualifying
 * paid sale. Costs, salaries, AI/API and infrastructure are not deducted.
 * VAT, sales tax, refunds and chargebacks are excluded at recording time.
 */

export const PARTNER_COMMISSION_MODEL_VERSION = "v2" as const;

/** Instant new `commission_rules` become active. Historical v1 rows close here. */
export const V2_EFFECTIVE_FROM = "2026-09-27T00:00:00.000Z";

/** Basis points: 1% = 100. Avoids binary float money math. */
export const LEVEL_RATE_BPS = Object.freeze({
  1: 5000,
  2: 1500,
  3: 700,
  4: 500,
  5: 300,
} as const);

export type CommissionLevel = keyof typeof LEVEL_RATE_BPS;

export const COMMISSION_LEVELS = [1, 2, 3, 4, 5] as const;

export const PARTNER_POOL_CAP_BPS = 8000;
export const AI_MARK_RETAINED_SHARE_BPS = 2000;

/** Launch is a 90-day status flag. It is not a commission multiplier. */
export const LAUNCH_RATE_MULTIPLIER = 1;
export const LAUNCH_WINDOW_DAYS = 90;

export const EXAMPLE_SALE_MINOR = BigInt(100000); // $1,000.00 in cents

const ZERO = BigInt(0);
const ONE = BigInt(1);
const TWO = BigInt(2);
const HUNDRED = BigInt(100);
const BPS_DENOMINATOR = BigInt(10000);

export function rateBps(level: CommissionLevel): number {
  return LEVEL_RATE_BPS[level];
}

export function formatRatePercent(bps: number): string {
  const whole = Math.trunc(bps / 100);
  const frac = bps % 100;
  if (frac === 0) return `${whole}%`;
  const fracStr = String(frac).padStart(2, "0").replace(/0+$/, "");
  return `${whole}.${fracStr}%`;
}

export const LEVEL_RATE_LABELS = Object.freeze({
  1: formatRatePercent(LEVEL_RATE_BPS[1]),
  2: formatRatePercent(LEVEL_RATE_BPS[2]),
  3: formatRatePercent(LEVEL_RATE_BPS[3]),
  4: formatRatePercent(LEVEL_RATE_BPS[4]),
  5: formatRatePercent(LEVEL_RATE_BPS[5]),
} as const);

export const PARTNER_POOL_CAP_LABEL = formatRatePercent(PARTNER_POOL_CAP_BPS);
export const AI_MARK_RETAINED_SHARE_LABEL = formatRatePercent(
  AI_MARK_RETAINED_SHARE_BPS,
);

/**
 * Parse a 2-decimal money string into integer minor units.
 * Rejects float input so callers cannot smuggle IEEE rounding in.
 */
export function parseMinorUnits(amount: string): bigint {
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(amount.trim());
  if (!match) {
    throw new Error(`not a 2-decimal money amount: ${amount}`);
  }
  const sign = match[1] === "-" ? -ONE : ONE;
  const whole = BigInt(match[2]);
  const frac = BigInt((match[3] ?? "").padEnd(2, "0"));
  return sign * (whole * HUNDRED + frac);
}

export function formatMinorUnits(minor: bigint): string {
  const sign = minor < ZERO ? "-" : "";
  const abs = minor < ZERO ? -minor : minor;
  const whole = abs / HUNDRED;
  const frac = abs % HUNDRED;
  return `${sign}${whole}.${frac.toString().padStart(2, "0")}`;
}

/** Round half away from zero, matching PostgreSQL `round(numeric, 0)`. */
function roundDivHalfAwayFromZero(numerator: bigint, denominator: bigint): bigint {
  if (denominator <= ZERO) {
    throw new Error("denominator must be positive");
  }
  const sign = numerator < ZERO ? -ONE : ONE;
  const abs = numerator < ZERO ? -numerator : numerator;
  const q = abs / denominator;
  const r = abs % denominator;
  return sign * (r * TWO >= denominator ? q + ONE : q);
}

/**
 * commission = round(commissionableAmount × levelRate, 2)
 * implemented as integer cents × bps / 10_000.
 */
export function commissionMinor(baseMinor: bigint, rateBpsValue: number): bigint {
  if (!Number.isInteger(rateBpsValue) || rateBpsValue < 0) {
    throw new Error("rate must be a non-negative integer of basis points");
  }
  if (baseMinor < ZERO) {
    throw new Error("commissionable amount cannot be negative");
  }
  return roundDivHalfAwayFromZero(
    baseMinor * BigInt(rateBpsValue),
    BPS_DENOMINATOR,
  );
}

export function levelCommissionMinor(
  baseMinor: bigint,
  level: CommissionLevel,
): bigint {
  return commissionMinor(baseMinor, LEVEL_RATE_BPS[level]);
}

export type PoolBreakdown = {
  levels: { level: CommissionLevel; rateBps: number; amountMinor: bigint }[];
  partnerPoolMinor: bigint;
  retainedMinor: bigint;
};

export function allocatePartnerPool(baseMinor: bigint): PoolBreakdown {
  if (baseMinor < ZERO) {
    throw new Error("commissionable amount cannot be negative");
  }
  const levels = COMMISSION_LEVELS.map((level) => ({
    level,
    rateBps: LEVEL_RATE_BPS[level],
    amountMinor: levelCommissionMinor(baseMinor, level),
  }));
  const partnerPoolMinor = levels.reduce(
    (sum, row) => sum + row.amountMinor,
    ZERO,
  );
  const capMinor = commissionMinor(baseMinor, PARTNER_POOL_CAP_BPS);
  if (partnerPoolMinor > capMinor) {
    throw new Error("partner pool exceeds 80% of commissionable amount");
  }
  const retainedMinor = baseMinor - partnerPoolMinor;
  return { levels, partnerPoolMinor, retainedMinor };
}

export const EXAMPLE_BREAKDOWN = allocatePartnerPool(EXAMPLE_SALE_MINOR);

export const EXAMPLE_USD = Object.freeze({
  sale: formatMinorUnits(EXAMPLE_SALE_MINOR),
  l1: formatMinorUnits(EXAMPLE_BREAKDOWN.levels[0].amountMinor),
  l2: formatMinorUnits(EXAMPLE_BREAKDOWN.levels[1].amountMinor),
  l3: formatMinorUnits(EXAMPLE_BREAKDOWN.levels[2].amountMinor),
  l4: formatMinorUnits(EXAMPLE_BREAKDOWN.levels[3].amountMinor),
  l5: formatMinorUnits(EXAMPLE_BREAKDOWN.levels[4].amountMinor),
  pool: formatMinorUnits(EXAMPLE_BREAKDOWN.partnerPoolMinor),
  retained: formatMinorUnits(EXAMPLE_BREAKDOWN.retainedMinor),
} as const);

/** Active-rule string the ledger tests assert against after v2 is applied. */
export const V2_ACTIVE_RULES_SQL =
  "1:0.500000:1.000000,2:0.150000:1.000000,3:0.070000:1.000000,4:0.050000:1.000000,5:0.030000:1.000000";

/** Historical v1 seed, kept in the original migration and closed by v2. */
export const V1_HISTORICAL_RULES_SQL =
  "1:0.150000:1.500000,2:0.050000:1.500000,3:0.030000:1.500000,4:0.020000:1.500000,5:0.010000:1.500000";

const RATE_SUM_BPS = COMMISSION_LEVELS.reduce(
  (sum, level) => sum + LEVEL_RATE_BPS[level],
  0,
);

if (RATE_SUM_BPS !== PARTNER_POOL_CAP_BPS) {
  throw new Error("v2 level rates must sum to the 80% partner pool cap");
}

if (LAUNCH_RATE_MULTIPLIER !== 1) {
  throw new Error("launch must not multiply commission rates");
}
