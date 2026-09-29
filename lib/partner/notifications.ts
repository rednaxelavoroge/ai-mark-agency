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

export async function notifyCommissionsForSale(saleId: string): Promise<void> {
  try {
    const admin = createSupabaseAdminClient();
    const entries = await admin
      .from("commission_entries")
      .select("beneficiary_partner_id, amount, currency, level")
      .eq("sale_id", saleId);
    if (!entries.data?.length) return;

    for (const entry of entries.data) {
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
      if (!profile.data?.email) continue;
      await sendPartnerCommissionEmail({
        to: profile.data.email,
        locale: profile.data.language ?? "en",
        amount: String(entry.amount),
        currency: entry.currency,
        level: entry.level,
      });
    }
  } catch (error) {
    console.error("[partner] commission emails failed:", error);
  }
}
