"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
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

/** Confirms an open payout. The paid amount is the amount already on the payout. */
export async function confirmPartnerPayout(formData: FormData): Promise<void> {
  const auth = await requireAdmin("/admin/payouts");
  const payoutId = readField(formData, "payout_id", 40);
  if (!/^[0-9a-f-]{36}$/i.test(payoutId)) fail("That payout id is not valid.");

  const admin = await adminClient();
  const result = await admin.rpc("confirm_payout", {
    p_payout_id: payoutId,
    p_confirmed_by: auth.userId,
  });
  if (result.error) fail(result.error.message);
  revalidatePath("/admin/payouts");
  revalidatePath("/partner/payouts");
  revalidatePath("/partner/commissions");
  redirect("/admin/payouts?confirmed=1");
}
