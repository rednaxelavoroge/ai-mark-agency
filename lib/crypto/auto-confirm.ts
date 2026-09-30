import "server-only";

import { incomingTransfers, type IncomingTransfer } from "./chain-watch";
import { confirmInvoicePayment, loadInvoiceByRef, type PaymentInvoiceRow } from "./invoices";
import { isPaymentAsset, isPaymentNetwork } from "./networks";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Automatic payment matching: every invoice has a unique amount with cents
 * (open-amount unique index), so an incoming transfer of exactly that amount
 * to the rail's treasury address after the invoice was issued is its payment.
 * The same fulfil path as the operator button runs (sale → commissions → provisioning).
 */

/** Recorded as confirmed_by for automatic confirmations (payment_invoices has no FK on it). */
export const AUTO_CONFIRM_ACTOR =
  process.env.AUTO_CONFIRM_ACTOR_ID?.trim() || "00000000-0000-4000-8000-00000000a1a1";

/** Only look this far back; older invoices stay for the operator. */
const MAX_INVOICE_AGE_MS = 72 * 3600_000;
const CLOCK_SKEW_MS = 5 * 60_000;

function expectedCents(invoice: PaymentInvoiceRow): number {
  return Math.round(Number(invoice.expected_amount) * 100);
}

function housePartnerId(): string | undefined {
  const id = process.env.HOUSE_PARTNER_ID?.trim().toUpperCase();
  return id && /^AM-[0-9]{4,12}$/.test(id) ? id : undefined;
}

export type AutoConfirmOutcome =
  | { status: "confirmed"; txHash: string }
  | { status: "awaiting" }
  | { status: "skipped"; reason: string }
  | { status: "error"; error: string };

async function usedHashes(hashes: string[]): Promise<Set<string>> {
  if (hashes.length === 0 || !isSupabaseConfigured()) return new Set();
  const admin = createSupabaseAdminClient();
  const res = await admin.from("payment_invoices").select("tx_hash").in("tx_hash", hashes);
  return new Set((res.data ?? []).map((r) => r.tx_hash as string).filter(Boolean));
}

function pickMatch(
  invoice: PaymentInvoiceRow,
  transfers: IncomingTransfer[],
  used: Set<string>,
): IncomingTransfer | null {
  const want = expectedCents(invoice);
  const issued = new Date(invoice.created_at).getTime() - CLOCK_SKEW_MS;
  return (
    transfers.find(
      (t) => t.cents === want && !used.has(t.txHash) && (t.at === 0 || t.at >= issued),
    ) ?? null
  );
}

async function confirmMatch(
  invoice: PaymentInvoiceRow,
  match: IncomingTransfer,
  locale?: string,
): Promise<AutoConfirmOutcome> {
  const partnerId = invoice.referral_code ? undefined : housePartnerId();
  if (!invoice.referral_code && !partnerId && !invoice.billing_period_days) {
    return { status: "skipped", reason: "no referral code and HOUSE_PARTNER_ID is not set" };
  }
  const result = await confirmInvoicePayment({
    publicRef: invoice.public_ref,
    txHash: match.txHash,
    paidAt: new Date(match.at || Date.now()).toISOString(),
    adminUserId: AUTO_CONFIRM_ACTOR,
    partnerId,
    locale,
  });
  if (!result.ok) {
    console.error("[auto-confirm]", invoice.public_ref, result.error);
    if (/attribution requires|referral code or a partner id/i.test(result.error)) {
      return { status: "skipped", reason: "no attribution: set HOUSE_PARTNER_ID" };
    }
    return { status: "error", error: result.error };
  }
  return { status: "confirmed", txHash: match.txHash };
}

/** Check one invoice now (called by the buyer's open payment page). */
export async function autoConfirmInvoice(publicRef: string, locale?: string): Promise<AutoConfirmOutcome> {
  const invoice = await loadInvoiceByRef(publicRef);
  if (!invoice) return { status: "skipped", reason: "not found" };
  if (invoice.status !== "awaiting") return { status: "skipped", reason: invoice.status };
  if (!isPaymentAsset(invoice.asset) || !isPaymentNetwork(invoice.network)) {
    return { status: "skipped", reason: "unknown rail" };
  }
  const issued = new Date(invoice.created_at).getTime();
  if (Date.now() - issued > MAX_INVOICE_AGE_MS) return { status: "skipped", reason: "too old for auto-check" };

  const watch = await incomingTransfers(invoice.asset, invoice.network, invoice.treasury_address, issued - CLOCK_SKEW_MS);
  if (!watch.ok) return { status: "error", error: watch.error };
  const used = await usedHashes(watch.transfers.map((t) => t.txHash));
  const match = pickMatch(invoice, watch.transfers, used);
  if (!match) return { status: "awaiting" };
  return confirmMatch(invoice, match, locale);
}

/** Catch-up for every open invoice (cron). One chain lookup per rail. */
export async function autoConfirmOpenInvoices(): Promise<{ checked: number; confirmed: number; errors: number }> {
  if (!isSupabaseConfigured()) return { checked: 0, confirmed: 0, errors: 0 };
  const admin = createSupabaseAdminClient();
  const since = new Date(Date.now() - MAX_INVOICE_AGE_MS).toISOString();
  const res = await admin
    .from("payment_invoices")
    .select("public_ref, created_at, asset, network, treasury_address")
    .eq("status", "awaiting")
    .gte("created_at", since)
    .limit(200);
  const rows = res.data ?? [];
  const byRail = new Map<string, typeof rows>();
  for (const row of rows) {
    const key = `${row.asset}|${row.network}|${row.treasury_address}`;
    byRail.set(key, [...(byRail.get(key) ?? []), row]);
  }
  let confirmed = 0;
  let errors = 0;
  for (const [key, group] of byRail) {
    const [asset, network, address] = key.split("|");
    if (!isPaymentAsset(asset) || !isPaymentNetwork(network)) continue;
    const oldest = Math.min(...group.map((r) => new Date(r.created_at).getTime()));
    const watch = await incomingTransfers(asset, network, address, oldest - CLOCK_SKEW_MS);
    if (!watch.ok) {
      errors += 1;
      console.error("[auto-confirm] rail", key, watch.error);
      continue;
    }
    const used = await usedHashes(watch.transfers.map((t) => t.txHash));
    for (const row of group) {
      const invoice = await loadInvoiceByRef(row.public_ref);
      if (!invoice || invoice.status !== "awaiting") continue;
      const match = pickMatch(invoice, watch.transfers, used);
      if (!match) continue;
      const outcome = await confirmMatch(invoice, match);
      if (outcome.status === "confirmed") {
        confirmed += 1;
        used.add(match.txHash);
      } else if (outcome.status === "error") errors += 1;
    }
  }
  return { checked: rows.length, confirmed, errors };
}
