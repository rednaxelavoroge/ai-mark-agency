"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { confirmInvoicePayment } from "@/lib/crypto/invoices";
import { recentSignaturesForAddress, solanaRpcUrl } from "@/lib/crypto/solana-watch";
import { treasuryAddress } from "@/lib/crypto/networks";

function readField(formData: FormData, key: string, max = 200): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function fail(message: string): never {
  redirect(`/admin/invoices?error=${encodeURIComponent(message.slice(0, 240))}`);
}

function paidAtIso(value: string): string | null {
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) {
    const date = new Date(`${value}:00.000Z`);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/**
 * Operator matches a treasury transfer, then the existing ledger RPCs run.
 * The customer form cannot reach this action.
 */
export async function confirmTreasuryInvoice(formData: FormData): Promise<void> {
  const auth = await requireAdmin("/admin/invoices");
  const publicRef = readField(formData, "public_ref", 16).toLowerCase();
  const txHash = readField(formData, "tx_hash", 128);
  const paidRaw = readField(formData, "paid_at", 40);
  const referral = readField(formData, "referral_code", 32).toLowerCase();
  const partnerId = readField(formData, "partner_id", 16).toUpperCase();
  const paidAt = paidAtIso(paidRaw);
  if (!paidAt) fail("Enter the time the transfer confirmed, in UTC.");

  const result = await confirmInvoicePayment({
    publicRef,
    txHash,
    paidAt,
    adminUserId: auth.userId,
    referralCode: referral,
    partnerId,
  });
  if (!result.ok) fail(result.error);

  revalidatePath("/admin/invoices");
  revalidatePath("/admin/orders");
  revalidatePath("/partner/dashboard");
  revalidatePath("/partner/sales");
  revalidatePath("/partner/commissions");
  redirect("/admin/invoices?confirmed=1");
}

/** Recent signatures on the USDC Solana treasury. Does not mark a sale. */
export async function probeSolanaTreasury(): Promise<void> {
  await requireAdmin("/admin/invoices");
  if (!solanaRpcUrl()) {
    fail("SOLANA_RPC_URL is not set. Manual tx match still works.");
  }
  const address = treasuryAddress("USDC", "solana");
  if (!address) fail("TREASURY_USDC_SOLANA is not set.");
  const result = await recentSignaturesForAddress(address);
  if (!result.ok) fail(result.error);
  const preview = result.hints
    .slice(0, 8)
    .map((hint) => hint.signature.slice(0, 12))
    .join(",");
  redirect(
    `/admin/invoices?watched=${encodeURIComponent(String(result.hints.length))}&sigs=${encodeURIComponent(preview.slice(0, 180))}`,
  );
}
