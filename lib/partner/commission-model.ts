/**
 * Partner commission schedules — published contract (launch bonus + standard).
 *
 * Runtime posting reads `commission_rules` on the server. This module is the
 * single source of truth for rates, pool caps, and integer minor-unit math
 * used by marketing, dashboard copy, and tests.
 *
 * commission = commissionableAmount × levelRate
 * sum(levels) ≤ commissionableAmount × poolCapForPhase
 *
 * commissionableAmount is `sales.amount`: the amount collected on a qualifying
 * paid sale.
 */

export const PARTNER_COMMISSION_MODEL_VERSION = "launch-bonus-v1" as const;

/** Owner-approved launch bonus window (inclusive end date for marketing). */
export const LAUNCH_BONUS_END_DATE = "2026-12-31";

/** Sales paid on/after this instant use the standard initial grid (months 1–3). */
export const STANDARD_SCHEDULE_EFFECTIVE_FROM = "2027-01-01T00:00:00.000Z";

/** Client subscription payment index: months 1–3 vs renewal (4+). */
export const INITIAL_PAYMENT_MONTHS = 3;

export type CommissionSchedulePhase =
  | "launch_initial"
  | "standard_initial"
  | "renewal";

export type CommissionLevel = 1 | 2 | 3 | 4 | 5;

export const COMMISSION_LEVELS: CommissionLevel[] = [1, 2, 3, 4, 5];

export const LEVEL_RATE_BPS_LAUNCH_INITIAL = Object.freeze({
  1: 5000,
  2: 1500,
  3: 700,
  4: 500,
  5: 300,
} as const);

export const LEVEL_RATE_BPS_STANDARD_INITIAL = Object.freeze({
  1: 3500,
  2: 1000,
  3: 500,
  4: 0,
  5: 0,
} as const);

export const LEVEL_RATE_BPS_RENEWAL = Object.freeze({
  1: 2000,
  2: 500,
  3: 0,
  4: 0,
  5: 0,
} as const);

export const PARTNER_POOL_CAP_BPS = Object.freeze({
  launch_initial: 8000,
  standard_initial: 5000,
  renewal: 2500,
} as const);

/** Basis points retained by AI MARK for each phase (100% − pool). */
export const AI_MARK_RETAINED_SHARE_BPS_BY_PHASE = Object.freeze({
  launch_initial: 2000,
  standard_initial: 5000,
  renewal: 7500,
} as const);

/** @deprecated Use phase-specific caps. Kept for legacy copy that references 80%. */
export const PARTNER_POOL_CAP_BPS_LEGACY = 8000;
export const AI_MARK_RETAINED_SHARE_BPS = 2000;

export const EXAMPLE_SALE_MINOR = BigInt(100000);

const ZERO = BigInt(0);
const ONE = BigInt(1);
const TWO = BigInt(2);
const HUNDRED = BigInt(100);
const BPS_DENOMINATOR = BigInt(10000);

export function resolveSchedulePhase(
  paidAt: Date,
  clientPaymentIndex: number,
): CommissionSchedulePhase {
  if (!Number.isInteger(clientPaymentIndex) || clientPaymentIndex < 1) {
    throw new Error("client payment index must be a positive integer");
  }
  if (clientPaymentIndex >= INITIAL_PAYMENT_MONTHS + 1) {
    return "renewal";
  }
  const standardFrom = new Date(STANDARD_SCHEDULE_EFFECTIVE_FROM);
  if (paidAt.getTime() >= standardFrom.getTime()) {
    return "standard_initial";
  }
  return "launch_initial";
}

export function levelRateBpsForPhase(
  phase: CommissionSchedulePhase,
  level: CommissionLevel,
): number {
  const table =
    phase === "launch_initial"
      ? LEVEL_RATE_BPS_LAUNCH_INITIAL
      : phase === "standard_initial"
        ? LEVEL_RATE_BPS_STANDARD_INITIAL
        : LEVEL_RATE_BPS_RENEWAL;
  return table[level];
}

export function poolCapBps(phase: CommissionSchedulePhase): number {
  return PARTNER_POOL_CAP_BPS[phase];
}

export function formatRatePercent(bps: number): string {
  if (bps === 0) return "0%";
  const whole = Math.trunc(bps / 100);
  const frac = bps % 100;
  if (frac === 0) return `${whole}%`;
  const fracStr = String(frac).padStart(2, "0").replace(/0+$/, "");
  return `${whole}.${fracStr}%`;
}

/** Labels for the launch-bonus initial grid (months 1–3 before 2027). */
export const LEVEL_RATE_LABELS_LAUNCH_INITIAL = Object.freeze({
  1: formatRatePercent(LEVEL_RATE_BPS_LAUNCH_INITIAL[1]),
  2: formatRatePercent(LEVEL_RATE_BPS_LAUNCH_INITIAL[2]),
  3: formatRatePercent(LEVEL_RATE_BPS_LAUNCH_INITIAL[3]),
  4: formatRatePercent(LEVEL_RATE_BPS_LAUNCH_INITIAL[4]),
  5: formatRatePercent(LEVEL_RATE_BPS_LAUNCH_INITIAL[5]),
} as const);

export const LEVEL_RATE_LABELS_STANDARD_INITIAL = Object.freeze({
  1: formatRatePercent(LEVEL_RATE_BPS_STANDARD_INITIAL[1]),
  2: formatRatePercent(LEVEL_RATE_BPS_STANDARD_INITIAL[2]),
  3: formatRatePercent(LEVEL_RATE_BPS_STANDARD_INITIAL[3]),
  4: formatRatePercent(LEVEL_RATE_BPS_STANDARD_INITIAL[4]),
  5: formatRatePercent(LEVEL_RATE_BPS_STANDARD_INITIAL[5]),
} as const);

export const LEVEL_RATE_LABELS_RENEWAL = Object.freeze({
  1: formatRatePercent(LEVEL_RATE_BPS_RENEWAL[1]),
  2: formatRatePercent(LEVEL_RATE_BPS_RENEWAL[2]),
  3: formatRatePercent(LEVEL_RATE_BPS_RENEWAL[3]),
  4: formatRatePercent(LEVEL_RATE_BPS_RENEWAL[4]),
  5: formatRatePercent(LEVEL_RATE_BPS_RENEWAL[5]),
} as const);

/** Default marketing labels = launch bonus initial grid. */
export const LEVEL_RATE_LABELS = LEVEL_RATE_LABELS_LAUNCH_INITIAL;

export const PARTNER_POOL_CAP_LABEL = formatRatePercent(
  PARTNER_POOL_CAP_BPS.launch_initial,
);
export const AI_MARK_RETAINED_SHARE_LABEL = formatRatePercent(
  AI_MARK_RETAINED_SHARE_BPS_BY_PHASE.launch_initial,
);

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

export function commissionMinor(baseMinor: bigint, rateBpsValue: number): bigint {
  if (!Number.isInteger(rateBpsValue) || rateBpsValue < 0) {
    throw new Error("rate must be a non-negative integer of basis points");
  }
  if (rateBpsValue === 0) return ZERO;
  if (baseMinor < ZERO) {
    throw new Error("commissionable amount cannot be negative");
  }
  return roundDivHalfAwayFromZero(
    baseMinor * BigInt(rateBpsValue),
    BPS_DENOMINATOR,
  );
}

export type PoolBreakdown = {
  phase: CommissionSchedulePhase;
  levels: { level: CommissionLevel; rateBps: number; amountMinor: bigint }[];
  partnerPoolMinor: bigint;
  retainedMinor: bigint;
};

export function allocatePartnerPool(
  baseMinor: bigint,
  phase: CommissionSchedulePhase,
): PoolBreakdown {
  if (baseMinor < ZERO) {
    throw new Error("commissionable amount cannot be negative");
  }
  const levels = COMMISSION_LEVELS.map((level) => {
    const rateBps = levelRateBpsForPhase(phase, level);
    return {
      level,
      rateBps,
      amountMinor: commissionMinor(baseMinor, rateBps),
    };
  }).filter((row) => row.rateBps > 0);

  const partnerPoolMinor = levels.reduce(
    (sum, row) => sum + row.amountMinor,
    ZERO,
  );
  const capMinor = commissionMinor(baseMinor, poolCapBps(phase));
  if (partnerPoolMinor > capMinor) {
    throw new Error("partner pool exceeds cap for schedule phase");
  }
  const retainedMinor = baseMinor - partnerPoolMinor;
  return { phase, levels, partnerPoolMinor, retainedMinor };
}

export const EXAMPLE_BREAKDOWN = allocatePartnerPool(
  EXAMPLE_SALE_MINOR,
  "launch_initial",
);

export const EXAMPLE_RENEWAL_BREAKDOWN = allocatePartnerPool(
  EXAMPLE_SALE_MINOR,
  "renewal",
);

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

export const EXAMPLE_RENEWAL_USD = Object.freeze({
  sale: formatMinorUnits(EXAMPLE_SALE_MINOR),
  l1: formatMinorUnits(EXAMPLE_RENEWAL_BREAKDOWN.levels[0].amountMinor),
  l2: formatMinorUnits(EXAMPLE_RENEWAL_BREAKDOWN.levels[1].amountMinor),
  pool: formatMinorUnits(EXAMPLE_RENEWAL_BREAKDOWN.partnerPoolMinor),
  retained: formatMinorUnits(EXAMPLE_RENEWAL_BREAKDOWN.retainedMinor),
} as const);

/** v2 flat grid (closed 2026-10-01); kept for migration audit strings. */
export const V2_ACTIVE_RULES_SQL =
  "1:0.500000:1.000000,2:0.150000:1.000000,3:0.070000:1.000000,4:0.050000:1.000000,5:0.030000:1.000000";

export const V1_HISTORICAL_RULES_SQL =
  "1:0.150000:1.500000,2:0.050000:1.500000,3:0.030000:1.500000,4:0.020000:1.500000,5:0.010000:1.500000";

const launchSum = COMMISSION_LEVELS.reduce(
  (sum, level) => sum + LEVEL_RATE_BPS_LAUNCH_INITIAL[level],
  0,
);
if (launchSum !== PARTNER_POOL_CAP_BPS.launch_initial) {
  throw new Error("launch initial rates must sum to 80%");
}

const standardSum = COMMISSION_LEVELS.reduce(
  (sum, level) => sum + LEVEL_RATE_BPS_STANDARD_INITIAL[level],
  0,
);
if (standardSum !== PARTNER_POOL_CAP_BPS.standard_initial) {
  throw new Error("standard initial rates must sum to 50%");
}

const renewalSum = COMMISSION_LEVELS.reduce(
  (sum, level) => sum + LEVEL_RATE_BPS_RENEWAL[level],
  0,
);
if (renewalSum !== PARTNER_POOL_CAP_BPS.renewal) {
  throw new Error("renewal rates must sum to 25%");
}
