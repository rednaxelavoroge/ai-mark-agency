"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { sendPartnerPayoutEmail } from "@/lib/email/partner";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function fail(message: string): never {
  redirect(`/admin/payouts?error=${encodeURIComponent(message.slice(0, 240))}`);
}

function readField(formData: FormData, key: string, max = 80): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function adminClient() {
  try {
    return createSupabaseAdminClient();
  } catch {
    fail("Payout actions are not configured on this server.");
  }
}

/** Moves confirmed sales whose 14-day hold has elapsed. Does not rewrite sponsor edges. */
export async function advanceDueLocks(): Promise<void> {
  await requireAdmin("/admin/payouts");
  const admin = await adminClient();
  const result = await admin.rpc("advance_sponsor_lock", {});
  if (result.error) fail(result.error.message);
  revalidatePath("/admin/payouts");
  revalidatePath("/partner/payouts");
  revalidatePath("/partner/commissions");
  redirect(`/admin/payouts?locked=${result.data ?? 0}`);
}

/** Opens a payout for payable entries. Amount comes from the ledger. */
export async function createPartnerPayout(formData: FormData): Promise<void> {
  const auth = await requireAdmin("/admin/payouts");
  const partnerId = readField(formData, "partner_id", 16).toUpperCase();
  const currency = readField(formData, "currency", 3).toUpperCase();
  if (!/^AM-[0-9]{4,12}$/.test(partnerId)) fail("Partner ID must look like AM-001042.");
  if (!/^[A-Z]{3}$/.test(currency)) fail("Currency must be a 3-letter code.");

  const admin = await adminClient();
  const result = await admin.rpc("create_payout", {
    p_partner_id: partnerId,
    p_currency: currency,
    p_created_by: auth.userId,
  });
  if (result.error) fail(result.error.message);
  revalidatePath("/admin/payouts");
  revalidatePath("/partner/payouts");
  redirect("/admin/payouts?created=1");
}

/** Voids an open payout so its commission entries can be paid later. Does not send tokens. */
export async function voidPartnerPayout(formData: FormData): Promise<void> {
  await requireAdmin("/admin/payouts");
  const payoutId = readField(formData, "payout_id", 40);
  if (!/^[0-9a-f-]{36}$/i.test(payoutId)) fail("That payout id is not valid.");

  const admin = await adminClient();
  const result = await admin
    .from("payouts")
    .update({ status: "void" })
    .eq("id", payoutId)
    .eq("status", "open")
    .select("id");
  if (result.error) fail(result.error.message);
  if (!result.data?.length) fail("Only an open payout can be voided.");
  await notifyPayoutStatus(admin, payoutId, "cancelled");
  revalidatePath("/admin/payouts");
  revalidatePath("/partner/payouts");
  revalidatePath("/partner/commissions");
  redirect("/admin/payouts?voided=1");
}

/** Confirms an open payout and marks paid with on-chain tx hash. */
export async function confirmPartnerPayout(formData: FormData): Promise<void> {
  const auth = await requireAdmin("/admin/payouts");
  const payoutId = readField(formData, "payout_id", 40);
  const txHash = readField(formData, "tx_hash", 128);
  if (!/^[0-9a-f-]{36}$/i.test(payoutId)) fail("That payout id is not valid.");
  if (!txHash) fail("Transaction hash (tx hash) is required to mark payout paid.");

  const admin = await adminClient();
  const result = await admin.rpc("confirm_payout", {
    p_payout_id: payoutId,
    p_confirmed_by: auth.userId,
  });
  if (result.error) fail(result.error.message);

  // Store tx_hash if migration column exists
  try {
    await admin
      .from("payouts")
      .update({ tx_hash: txHash })
      .eq("id", payoutId);
  } catch {
    // Migration might be pending
  }

  await notifyPayoutStatus(admin, payoutId, "paid");
  revalidatePath("/admin/payouts");
  revalidatePath("/partner/payouts");
  revalidatePath("/partner/commissions");
  redirect("/admin/payouts?confirmed=1");
}

/** Approves a commission that was flagged under review. */
export async function approveCommissionAction(formData: FormData): Promise<void> {
  const auth = await requireAdmin("/admin/payouts");
  const commissionId = readField(formData, "commission_id", 40);
  if (!/^[0-9a-f-]{36}$/i.test(commissionId)) fail("Invalid commission id.");

  const { approveFraudReview } = await import("@/lib/partner/anti-fraud");
  const res = await approveFraudReview(commissionId, auth.userId);
  if (!res.ok) fail(res.error ?? "Could not approve commission.");

  revalidatePath("/admin/payouts");
  revalidatePath("/admin/commissions");
  redirect("/admin/payouts?approved=1");
}

/** Rejects a commission that was flagged under review. */
export async function rejectCommissionAction(formData: FormData): Promise<void> {
  const auth = await requireAdmin("/admin/payouts");
  const commissionId = readField(formData, "commission_id", 40);
  if (!/^[0-9a-f-]{36}$/i.test(commissionId)) fail("Invalid commission id.");

  const { rejectFraudReview } = await import("@/lib/partner/anti-fraud");
  const res = await rejectFraudReview(commissionId, auth.userId);
  if (!res.ok) fail(res.error ?? "Could not reject commission.");

  revalidatePath("/admin/payouts");
  revalidatePath("/admin/commissions");
  redirect("/admin/payouts?rejected=1");
}

async function notifyPayoutStatus(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  payoutId: string,
  kind: "paid" | "cancelled",
): Promise<void> {
  const payout = await admin
    .from("payouts")
    .select("partner_id, amount, currency")
    .eq("id", payoutId)
    .maybeSingle();
  if (!payout.data) return;
  const partner = await admin
    .from("partner_profiles")
    .select("user_id")
    .eq("partner_id", payout.data.partner_id)
    .maybeSingle();
  if (!partner.data) return;
  const profile = await admin
    .from("profiles")
    .select("email, language")
    .eq("id", partner.data.user_id)
    .maybeSingle();
  if (!profile.data?.email) return;
  await sendPartnerPayoutEmail(kind, {
    to: profile.data.email,
    locale: profile.data.language ?? "en",
    amount: String(payout.data.amount),
    currency: payout.data.currency,
  });
}
