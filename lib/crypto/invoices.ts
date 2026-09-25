import "server-only";

import { payableSkuById } from "./catalog";
import { amountWithCents, isInvoiceRef, newInvoiceRef } from "./invoice-ref";
import {
  isPaymentAsset,
  isPaymentNetwork,
  looksLikeTxHash,
  treasuryAddress,
  type PaymentAsset,
  type PaymentNetwork,
} from "./networks";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/database.types";

export type PaymentInvoiceRow =
  Database["public"]["Tables"]["payment_invoices"]["Row"];

export type CreateInvoiceInput = {
  skuId: string;
  asset: string;
  network: string;
  referralCode?: string | null;
};

export type CreateInvoiceResult =
  | { ok: true; publicRef: string }
  | { ok: false; error: string };

function adminOrNull() {
  if (!isSupabaseConfigured()) return null;
  try {
    return createSupabaseAdminClient();
  } catch {
    return null;
  }
}

export async function createPaymentInvoice(
  input: CreateInvoiceInput,
): Promise<CreateInvoiceResult> {
  const sku = payableSkuById(input.skuId);
  if (!sku) return { ok: false, error: "Choose a published product with a list price." };
  if (!isPaymentAsset(input.asset) || !isPaymentNetwork(input.network)) {
    return {
      ok: false,
      error: "Choose USDT or USDC on Tron, Ethereum, Polygon, Solana, BNB Chain or TON.",
    };
  }
  const address = treasuryAddress(input.asset as PaymentAsset, input.network as PaymentNetwork);
  if (!address) {
    return {
      ok: false,
      error: "That network is not configured yet. No treasury address has been set.",
    };
  }

  const referral = (input.referralCode ?? "").trim().toLowerCase();
  if (referral && !/^[a-z0-9][a-z0-9_-]{3,31}$/.test(referral)) {
    return { ok: false, error: "Referral code is not in the published format." };
  }

  const admin = adminOrNull();
  if (!admin) {
    return { ok: false, error: "Payment invoices are not configured on this server." };
  }

  const asset = input.asset as PaymentAsset;
  const network = input.network as PaymentNetwork;

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const publicRef = newInvoiceRef();
    const cents = 1 + Math.floor(Math.random() * 99);
    const expected = amountWithCents(sku.amountUsd, cents);
    const inserted = await admin
      .from("payment_invoices")
      .insert({
        public_ref: publicRef,
        sku_id: sku.id,
        product_ref: sku.productRef,
        amount: sku.amountUsd,
        expected_amount: Number(expected),
        ledger_currency: "USD",
        asset,
        network,
        treasury_address: address,
        memo: publicRef,
        referral_code: referral || null,
        status: "awaiting",
      })
      .select("public_ref")
      .maybeSingle();

    if (!inserted.error && inserted.data) {
      return { ok: true, publicRef: inserted.data.public_ref };
    }

    const message = inserted.error?.message ?? "";
    if (/payment_invoices_open_amount_uq|payment_invoices_ref_unique/i.test(message)) {
      continue;
    }
    return { ok: false, error: message || "The invoice could not be created." };
  }

  return { ok: false, error: "Could not allocate a unique payment amount. Try again." };
}

export async function loadInvoiceByRef(
  publicRef: string,
): Promise<PaymentInvoiceRow | null> {
  if (!isInvoiceRef(publicRef)) return null;
  const admin = adminOrNull();
  if (!admin) return null;
  const result = await admin
    .from("payment_invoices")
    .select(
      "id, public_ref, sku_id, product_ref, amount, expected_amount, ledger_currency, asset, network, treasury_address, memo, referral_code, status, tx_hash, sale_id, confirmed_by, confirmed_at, created_at, updated_at",
    )
    .eq("public_ref", publicRef)
    .maybeSingle();
  if (result.error || !result.data) return null;
  return result.data;
}

export async function listAdminInvoices(limit = 100): Promise<{
  rows: PaymentInvoiceRow[] | null;
  unreadable: boolean;
}> {
  const admin = adminOrNull();
  if (!admin) return { rows: null, unreadable: true };
  const result = await admin
    .from("payment_invoices")
    .select(
      "id, public_ref, sku_id, product_ref, amount, expected_amount, ledger_currency, asset, network, treasury_address, memo, referral_code, status, tx_hash, sale_id, confirmed_by, confirmed_at, created_at, updated_at",
    )
    .order("created_at", { ascending: false })
    .limit(limit);
  if (result.error) {
    console.error("[admin] invoices failed:", result.error.message);
    return { rows: null, unreadable: true };
  }
  return { rows: result.data ?? [], unreadable: false };
}

export type ConfirmInvoiceInput = {
  publicRef: string;
  txHash: string;
  paidAt: string;
  adminUserId: string;
  referralCode?: string;
  partnerId?: string;
};

export type ConfirmInvoiceResult =
  | { ok: true; saleId: string }
  | { ok: false; error: string };

/**
 * Matches a received transfer, then runs the existing ledger RPCs.
 * The visitor never writes a sale.
 */
export async function confirmInvoicePayment(
  input: ConfirmInvoiceInput,
): Promise<ConfirmInvoiceResult> {
  if (!isInvoiceRef(input.publicRef)) {
    return { ok: false, error: "Invoice reference is not valid." };
  }
  if (!looksLikeTxHash(input.txHash)) {
    return { ok: false, error: "Enter the transaction hash of the transfer." };
  }
  const paidAt = new Date(input.paidAt);
  if (Number.isNaN(paidAt.getTime())) {
    return { ok: false, error: "Enter the time the transfer confirmed." };
  }

  const admin = adminOrNull();
  if (!admin) return { ok: false, error: "Sale recording is not configured on this server." };

  const invoice = await loadInvoiceByRef(input.publicRef);
  if (!invoice) return { ok: false, error: "Invoice was not found." };
  if (invoice.status === "cancelled") {
    return { ok: false, error: "This invoice was cancelled." };
  }
  if (invoice.status === "confirmed") {
    if (invoice.tx_hash && invoice.tx_hash !== input.txHash.trim()) {
      return { ok: false, error: "This invoice is already matched to a different transaction." };
    }
    if (!invoice.tx_hash) {
      const attached = await attachTxToConfirmedInvoice({
        publicRef: input.publicRef,
        txHash: input.txHash,
      });
      if (!attached.ok) return attached;
    }
    return { ok: true, saleId: invoice.sale_id ?? "" };
  }

  const referral =
    (input.referralCode ?? "").trim().toLowerCase() || invoice.referral_code || "";
  const partnerId = (input.partnerId ?? "").trim().toUpperCase();
  if (referral && !/^[a-z0-9][a-z0-9_-]{3,31}$/.test(referral)) {
    return { ok: false, error: "Referral code is not in the published format." };
  }
  if (partnerId && !/^AM-[0-9]{4,12}$/.test(partnerId)) {
    return { ok: false, error: "Partner ID must look like AM-001042." };
  }
  if (!referral && !partnerId) {
    return {
      ok: false,
      error: "Enter a referral code or a partner id. The sale is attributed on the server.",
    };
  }

  const txHash = input.txHash.trim();
  const recorded = await admin.rpc("record_sale", {
    p_source: "treasury",
    p_external_order_id: invoice.public_ref,
    p_product_ref: invoice.product_ref,
    p_amount: Number(invoice.expected_amount),
    p_currency: invoice.ledger_currency,
    p_paid_at: paidAt.toISOString(),
    ...(referral ? { p_referral_code: referral } : {}),
    ...(partnerId ? { p_partner_id: partnerId } : {}),
  });
  if (recorded.error || !recorded.data) {
    return { ok: false, error: recorded.error?.message ?? "The sale was not recorded." };
  }
  const saleId = recorded.data;
  const qualified = await admin.rpc("qualify_sale", { p_sale_id: saleId });
  if (qualified.error) return { ok: false, error: qualified.error.message };
  const posted = await admin.rpc("post_commission_entries", { p_sale_id: saleId });
  if (posted.error) return { ok: false, error: posted.error.message };

  const updated = await admin
    .from("payment_invoices")
    .update({
      status: "confirmed",
      tx_hash: txHash,
      sale_id: saleId,
      confirmed_by: input.adminUserId,
      confirmed_at: new Date().toISOString(),
    })
    .eq("id", invoice.id)
    .eq("status", "awaiting");

  if (updated.error) {
    // Sale already posted; surface the invoice write error so the operator
    // can attach the hash without double-charging the customer.
    return { ok: false, error: updated.error.message };
  }

  return { ok: true, saleId };
}

export async function attachTxToConfirmedInvoice(input: {
  publicRef: string;
  txHash: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!looksLikeTxHash(input.txHash)) {
    return { ok: false, error: "Enter the transaction hash of the transfer." };
  }
  const admin = adminOrNull();
  if (!admin) return { ok: false, error: "Not configured." };
  const invoice = await loadInvoiceByRef(input.publicRef);
  if (!invoice) return { ok: false, error: "Invoice was not found." };
  if (invoice.status !== "confirmed") {
    return { ok: false, error: "Confirm the invoice before attaching a hash." };
  }
  const updated = await admin
    .from("payment_invoices")
    .update({ tx_hash: input.txHash.trim() })
    .eq("id", invoice.id);
  if (updated.error) return { ok: false, error: updated.error.message };
  return { ok: true };
}
