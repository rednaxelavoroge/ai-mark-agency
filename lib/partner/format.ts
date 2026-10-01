import type { CabinetCopy } from "@/content/cabinet/types";
import { PARTNER_STATUS_LABELS } from "@/lib/auth/roles";
import { LAUNCH_BONUS_END_DATE } from "@/lib/partner/commission-model";
import { site } from "@/lib/site";

/**
 * Display helpers for the Partner Platform.
 *
 * Phase 4A shows no financial data. Anything the platform cannot yet compute
 * renders as `NO_DATA` rather than an invented figure — the brief is explicit
 * that a placeholder must never look like a number.
 */

export const NO_DATA = "—";

/** Public referral path. `/go/[code]` is the Phase 4B referral entry point. */
export const REFERRAL_PATH_PREFIX = "/go";

export function referralCodePath(code: string): string {
  return `${REFERRAL_PATH_PREFIX}/${code}`;
}

/**
 * The referral link shown in the dashboard. Built from `site.url` so the
 * domain has exactly one source of truth.
 */
export function referralUrl(code: string): string {
  return `${site.url}${referralCodePath(code)}`;
}

export function partnerStatusLabel(status: string): string {
  return PARTNER_STATUS_LABELS[status] ?? status;
}

export function partnerStatusLabelFromCopy(
  status: string,
  copy: CabinetCopy,
): string {
  const labels = copy.partnerStatus;
  return labels[status as keyof typeof labels] ?? status;
}

/**
 * Referral counters shown on the dashboard.
 *
 * `null` means "the platform could not read this figure", which renders as the
 * honest `NO_DATA` dash. It is never coerced to 0 — a zero is a real, and
 * very different, statement.
 */
export type PartnerReferralStats = {
  clicks: number | null;
  leads: number | null;
  partnerSignups: number | null;
};

/**
 * Ledger figures for the calling partner.
 *
 * `null` means the ledger could not be read, which renders as `—`. A readable
 * empty ledger is a real zero, a null currency and an empty entry list — never
 * an estimate. Amounts stay as database text so the browser does not treat
 * money as a float. Mixed currencies are not summed.
 */
export type LedgerCurrencyRow = {
  currency: string | null;
  commissionNet: string;
  payableAmount: string;
  paidAmount: string;
  entryCount: number;
};

export type PartnerLedgerStats = {
  qualifyingSales: number | null;
  commissionNet: string | null;
  currency: string | null;
  payableAmount: string | null;
  paidAmount: string | null;
  entryCount: number | null;
  /**
   * One row per currency from the ledger. Empty when the ledger is empty.
   * `null` when the ledger could not be read. Never summed across currencies.
   */
  currencies: LedgerCurrencyRow[] | null;
};

export const EMPTY_LEDGER: PartnerLedgerStats = {
  qualifyingSales: 0,
  commissionNet: "0.00",
  currency: null,
  payableAmount: "0.00",
  paidAmount: "0.00",
  entryCount: 0,
  currencies: [],
};

export const UNREADABLE_LEDGER: PartnerLedgerStats = {
  qualifyingSales: null,
  commissionNet: null,
  currency: null,
  payableAmount: null,
  paidAmount: null,
  entryCount: null,
  currencies: null,
};

/** Hold after confirmation before an entry can be paid. Display only. */
export const LOCK_HOLD_DAYS = 14;

export function referralUrlTo(code: string, path: string): string {
  const url = new URL(referralUrl(code));
  url.searchParams.set("to", path);
  return url.toString();
}

/** Whether the published launch-bonus grid is still active (through 31 Dec 2026). */
export function launchBonusProgramActive(now: Date = new Date()): boolean {
  const end = new Date(`${LAUNCH_BONUS_END_DATE}T23:59:59.999Z`);
  return now.getTime() <= end.getTime();
}

/** Renders a stored money amount. Does not parse or recompute it. */
export function formatStoredMoney(
  amount: string | null | undefined,
  currency: string | null | undefined,
): string {
  if (amount === null || amount === undefined || amount === "") return NO_DATA;
  if (!currency) return amount;
  return `${currency} ${amount}`;
}

/** Renders a ledger amount. Real zero with no currency is `0`; unreadable is `—`. */
export function formatLedgerMoney(
  amount: string | null,
  currency: string | null,
): string {
  if (amount === null) return NO_DATA;
  if (!currency) {
    return amount === "0.00" || amount === "0" ? "0" : NO_DATA;
  }
  return `${currency} ${amount}`;
}

/** Renders a count, or the dash when the figure is genuinely unknown. */
export function formatCount(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return NO_DATA;
  }
  return new Intl.NumberFormat("en-GB").format(value);
}

/**
 * Deterministic date rendering.
 *
 * `Intl` resolves to different output on the server and in the browser (locale
 * and time zone both differ), which shows up as a hydration mismatch. Pinning
 * both makes the string identical everywhere.
 */
export function formatDate(value: string | null | undefined): string {
  if (!value) return NO_DATA;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return NO_DATA;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return NO_DATA;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return NO_DATA;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
}
