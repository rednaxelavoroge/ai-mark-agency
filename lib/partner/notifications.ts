import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  sendPartnerCommissionEmail,
  sendPartnerReferralEmail,
  sendPartnerWelcomeEmail,
} from "@/lib/email/partner";
import { PARTNER_AGREEMENT_VERSION } from "./agreement";

export async function recordPartnerAgreementAcceptance(userId: string): Promise<void> {
  try {
    const admin = createSupabaseAdminClient();
    await admin
      .from("partner_profiles")
      .update({
        agreement_accepted_at: new Date().toISOString(),
        agreement_version: PARTNER_AGREEMENT_VERSION,
      })
      .eq("user_id", userId);
  } catch (error) {
    console.error("[partner] agreement acceptance not saved:", error);
  }
}

export async function notifyPartnerWelcome(userId: string): Promise<void> {
  try {
    const admin = createSupabaseAdminClient();
    const row = await admin
      .from("partner_profiles")
      .select("partner_id, referral_code, user_id")
      .eq("user_id", userId)
      .maybeSingle();
    if (!row.data) return;
    const profile = await admin
      .from("profiles")
      .select("email, language")
      .eq("id", userId)
      .maybeSingle();
    const email = profile.data?.email;
    if (!email) return;
    await sendPartnerWelcomeEmail({
      to: email,
      locale: profile.data?.language ?? "en",
      partnerId: row.data.partner_id,
      referralCode: row.data.referral_code,
    });
  } catch (error) {
    console.error("[partner] welcome email failed:", error);
  }
}

export async function notifySponsorNewReferral(referralCode: string): Promise<void> {
  try {
    const admin = createSupabaseAdminClient();
    const sponsor = await admin
      .from("partner_profiles")
      .select("user_id, referral_code")
      .eq("referral_code", referralCode.toLowerCase())
      .maybeSingle();
    if (!sponsor.data) return;

    const profile = await admin
      .from("profiles")
      .select("email, language")
      .eq("id", sponsor.data.user_id)
      .maybeSingle();
    if (!profile.data?.email) return;

    await sendPartnerReferralEmail({
      to: profile.data.email,
      locale: profile.data.language ?? "en",
      sponsorCode: sponsor.data.referral_code,
    });
  } catch (error) {
    console.error("[partner] referral email failed:", error);
  }
}

import { auditSaleAntiFraud } from "@/lib/partner/anti-fraud";

function formatProductName(productRef: string | null | undefined): string {
  if (!productRef) return "AI MARK";
  const ref = productRef.toLowerCase();
  if (ref.includes("aime")) return "AI Marketing Employee (AIME)";
  if (ref.includes("assistant") || ref.includes("aiba")) return "AI Business Assistant";
  if (ref.includes("showroom")) return "Showroom AI";
  if (ref.includes("digital-production")) return "Digital Production";
  return productRef;
}

// In-process memory set as extra layer of idempotency guard
const PROCESSED_SALE_NOTIFICATIONS = new Set<string>();

export async function notifyCommissionsForSale(saleId: string): Promise<void> {
  try {
    const admin = createSupabaseAdminClient();

    // 1. Run deterministic anti-fraud audit on this sale and its commissions
    await auditSaleAntiFraud(saleId);

    // 2. Fetch sale details
    const { data: sale } = await admin
      .from("sales")
      .select("id, product_ref, external_order_id, amount, currency")
      .eq("id", saleId)
      .maybeSingle();

    const productLabel = formatProductName(sale?.product_ref);

    // 3. Fetch commission entries
    const entries = await admin
      .from("commission_entries")
      .select("id, beneficiary_partner_id, amount, currency, level, review_status")
      .eq("sale_id", saleId);
    if (!entries.data?.length) return;

    for (const entry of entries.data) {
      const idempotencyKey = `${saleId}:${entry.beneficiary_partner_id}:${entry.level}`;

      // In-process check
      if (PROCESSED_SALE_NOTIFICATIONS.has(idempotencyKey)) {
        continue;
      }

      // Check DB idempotency: has notification already been created?
      try {
        const { data: existing } = await admin
          .from("partner_notifications")
          .select("id")
          .eq("sale_id", saleId)
          .eq("partner_id", entry.beneficiary_partner_id)
          .eq("level", entry.level)
          .maybeSingle();

        if (existing) {
          PROCESSED_SALE_NOTIFICATIONS.add(idempotencyKey);
          continue;
        }
      } catch {
        // partner_notifications table might not exist yet before migration
      }

      const partner = await admin
        .from("partner_profiles")
        .select("user_id")
        .eq("partner_id", entry.beneficiary_partner_id)
        .maybeSingle();
      if (!partner.data) continue;

      const profile = await admin
        .from("profiles")
        .select("email, language")
        .eq("id", partner.data.user_id)
        .maybeSingle();

      const locale = profile.data?.language ?? "en";
      const currency = entry.currency ?? "USD";
      const amountStr = String(entry.amount);
      const formattedAmount = currency === "USD" || currency === "USDT" || currency === "USDC"
        ? `$${amountStr}`
        : `${currency} ${amountStr}`;

      const title = locale === "ru" ? "Клиент оплатил" : "Client payment confirmed";
      const message = locale === "ru"
        ? `Продукт: ${productLabel} · Комиссия: ${formattedAmount} · Уровень: L${entry.level}`
        : `Product: ${productLabel} · Commission: ${formattedAmount} · Level: L${entry.level}`;

      // Insert notification row into database (idempotent)
      let notificationInserted = false;
      try {
        const { error: insertErr } = await admin
          .from("partner_notifications")
          .insert({
            sale_id: saleId,
            partner_id: entry.beneficiary_partner_id,
            user_id: partner.data.user_id,
            payment_ref: sale?.external_order_id ?? null,
            product_ref: sale?.product_ref ?? null,
            amount: entry.amount,
            currency: entry.currency,
            level: entry.level,
            title,
            message,
            email_sent_at: new Date().toISOString(),
          });

        if (!insertErr) {
          notificationInserted = true;
        } else if (insertErr.code === "23505") {
          // Unique violation -> duplicate, skip email
          PROCESSED_SALE_NOTIFICATIONS.add(idempotencyKey);
          continue;
        }
      } catch {
        // Table not migrated yet; allow email send once per process
      }

      PROCESSED_SALE_NOTIFICATIONS.add(idempotencyKey);

      // Send email if partner has email
      if (profile.data?.email) {
        await sendPartnerCommissionEmail({
          to: profile.data.email,
          locale,
          amount: amountStr,
          currency,
          level: entry.level,
          product: productLabel,
        });
      }
    }
  } catch (error) {
    console.error("[partner] commission emails/notifications failed:", error);
  }
}

export type PartnerNotificationItem = {
  id: string;
  partner_id: string;
  sale_id: string | null;
  payment_ref: string | null;
  product_ref: string | null;
  amount: string;
  currency: string;
  level: number;
  title: string;
  message: string;
  read_at: string | null;
  created_at: string;
};

/**
 * Fetches recent notifications for a partner.
 * Safe fallback if migration table does not exist yet.
 */
export async function getPartnerNotifications(
  partnerId: string,
  limit = 20,
): Promise<{ notifications: PartnerNotificationItem[]; unreadCount: number }> {
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from("partner_notifications")
      .select("id, partner_id, sale_id, payment_ref, product_ref, amount, currency, level, title, message, read_at, created_at")
      .eq("partner_id", partnerId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) {
      return { notifications: [], unreadCount: 0 };
    }

    const notifications: PartnerNotificationItem[] = data.map((n) => ({
      ...n,
      amount: String(n.amount),
    }));

    const unreadCount = notifications.filter((n) => !n.read_at).length;
    return { notifications, unreadCount };
  } catch {
    return { notifications: [], unreadCount: 0 };
  }
}

/**
 * Marks a notification as read.
 */
export async function markPartnerNotificationRead(notificationId: string): Promise<void> {
  try {
    const admin = createSupabaseAdminClient();
    await admin
      .from("partner_notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("id", notificationId);
  } catch {
    // Graceful fallback
  }
}

