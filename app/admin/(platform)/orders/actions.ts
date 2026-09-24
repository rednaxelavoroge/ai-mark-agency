"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const PRODUCT_REFS = new Set([
  "aime",
  "assistant",
  "showroom",
  "starter",
  "growth",
  "scale",
  "digital-production",
]);

function readField(formData: FormData, key: string, max = 200): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function fail(message: string): never {
  redirect(`/admin/orders?error=${encodeURIComponent(message.slice(0, 240))}`);
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
 * Records a payment that already happened, then qualifies it and posts
 * commission through the existing service-role functions.
 *
 * The form does not accept a rate, a level, a sponsor, or a commission amount.
 */
export async function recordQualifyingSale(formData: FormData): Promise<void> {
  await requireAdmin("/admin/orders");

  const external = readField(formData, "external_order_id", 200);
  const product = readField(formData, "product_ref", 64);
  const amount = readField(formData, "amount", 24);
  const currency = readField(formData, "currency", 3).toUpperCase();
  const paidRaw = readField(formData, "paid_at", 40);
  const referral = readField(formData, "referral_code", 32).toLowerCase();
  const partnerId = readField(formData, "partner_id", 16).toUpperCase();

  if (!external) fail("Enter the external order id of the payment.");
  if (!PRODUCT_REFS.has(product)) fail("Choose a published product.");
  if (!/^\d+(\.\d{1,2})?$/.test(amount) || Number(amount) <= 0) {
    fail("Amount must be the amount the customer paid, greater than zero.");
  }
  if (!/^[A-Z]{3}$/.test(currency)) fail("Currency must be a 3-letter code.");
  const paidAt = paidAtIso(paidRaw);
  if (!paidAt) fail("Enter the time the customer paid, in UTC.");
  if (referral && !/^[a-z0-9][a-z0-9_-]{3,31}$/.test(referral)) {
    fail("Referral code is not in the published format.");
  }
  if (partnerId && !/^AM-[0-9]{4,12}$/.test(partnerId)) {
    fail("Partner ID must look like AM-001042.");
  }
  if (!referral && !partnerId) {
    fail("Enter a referral code or a partner id. The sale is attributed on the server.");
  }

  let admin: ReturnType<typeof createSupabaseAdminClient>;
  try {
    admin = createSupabaseAdminClient();
  } catch {
    fail("Sale recording is not configured on this server.");
  }

  const recorded = await admin.rpc("record_sale", {
    p_source: "operator",
    p_external_order_id: external,
    p_product_ref: product,
    p_amount: Number(amount),
    p_currency: currency,
    p_paid_at: paidAt,
    ...(referral ? { p_referral_code: referral } : {}),
    ...(partnerId ? { p_partner_id: partnerId } : {}),
  });

  if (recorded.error || !recorded.data) {
    fail(recorded.error?.message ?? "The sale was not recorded.");
  }

  const saleId = recorded.data;
  const qualified = await admin.rpc("qualify_sale", { p_sale_id: saleId });
  if (qualified.error) fail(qualified.error.message);

  const posted = await admin.rpc("post_commission_entries", { p_sale_id: saleId });
  if (posted.error) fail(posted.error.message);

  revalidatePath("/admin/orders");
  revalidatePath("/partner/dashboard");
  revalidatePath("/partner/sales");
  revalidatePath("/partner/commissions");
  redirect("/admin/orders?recorded=1");
}
