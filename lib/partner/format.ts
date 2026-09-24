import { PARTNER_STATUS_LABELS } from "@/lib/auth/roles";
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
export type PartnerLedgerStats = {
  qualifyingSales: number | null;
  commissionNet: string | null;
  currency: string | null;
  entryCount: number | null;
};

export const EMPTY_LEDGER: PartnerLedgerStats = {
  qualifyingSales: 0,
  commissionNet: "0.00",
  currency: null,
  entryCount: 0,
};

export const UNREADABLE_LEDGER: PartnerLedgerStats = {
  qualifyingSales: null,
  commissionNet: null,
  currency: null,
  entryCount: null,
};

/** Renders a ledger amount. Real zero with no currency is `0`; unreadable is `—`. */
export function formatLedgerMoney(stats: PartnerLedgerStats): string {
  if (stats.commissionNet === null) return NO_DATA;
  if (!stats.currency) {
    return stats.commissionNet === "0.00" || stats.commissionNet === "0"
      ? "0"
      : NO_DATA;
  }
  return `${stats.currency} ${stats.commissionNet}`;
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
