import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

import {
  type AntiFraudFlag,
  ANTI_FRAUD_FLAG_DESCRIPTIONS,
  type AntiFraudEvaluationInput,
  type AntiFraudEvaluationResult,
  evaluateAntiFraudRules,
} from "./anti-fraud-rules";

export {
  type AntiFraudFlag,
  ANTI_FRAUD_FLAG_DESCRIPTIONS,
  type AntiFraudEvaluationInput,
  type AntiFraudEvaluationResult,
  evaluateAntiFraudRules,
};

/**
 * Runs anti-fraud check for a specific commission entry or sale in database.
 * Gracefully degrades if migration is not yet applied.
 */
export async function auditSaleAntiFraud(saleId: string): Promise<void> {
  try {
    const admin = createSupabaseAdminClient();

    // 1. Fetch sale
    const { data: sale } = await admin
      .from("sales")
      .select("id, partner_id, referral_code, status, external_order_id")
      .eq("id", saleId)
      .maybeSingle();

    if (!sale) return;

    // 2. Fetch invoice if available
    const { data: invoice } = await admin
      .from("payment_invoices")
      .select("buyer_email, status, tx_hash")
      .eq("sale_id", saleId)
      .maybeSingle();

    // 3. Fetch all commission entries for this sale
    const { data: entries } = await admin
      .from("commission_entries")
      .select("id, beneficiary_partner_id, level, status")
      .eq("sale_id", saleId);

    if (!entries || entries.length === 0) return;

    // 4. Check registration burst rate for this referral code (>5 per hour from same IP)
    let maxBurstCount = 0;
    if (sale.referral_code) {
      try {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const { data: logs } = await admin
          .from("registration_device_logs")
          .select("ip_hash, created_at")
          .eq("referral_code", sale.referral_code.toLowerCase())
          .gte("created_at", oneHourAgo);

        if (logs && logs.length > 5) {
          const countsByIp = new Map<string, number>();
          for (const l of logs) {
            const count = (countsByIp.get(l.ip_hash) ?? 0) + 1;
            countsByIp.set(l.ip_hash, count);
            if (count > maxBurstCount) maxBurstCount = count;
          }
        }
      } catch {
        // Table may not exist yet
      }
    }

    // 5. Evaluate each beneficiary
    for (const entry of entries) {
      const { data: benPartner } = await admin
        .from("partner_profiles")
        .select("user_id")
        .eq("partner_id", entry.beneficiary_partner_id)
        .maybeSingle();

      const { data: benProfile } = benPartner?.user_id
        ? await admin
            .from("profiles")
            .select("email, payout_recipient")
            .eq("id", benPartner.user_id)
            .maybeSingle()
        : { data: null };

      // Check if wallet is shared by multiple partners
      let sharedWalletCount = 1;
      if (benProfile?.payout_recipient?.trim()) {
        try {
          const { count } = await admin
            .from("profiles")
            .select("id", { count: "exact", head: true })
            .ilike("payout_recipient", benProfile.payout_recipient.trim());
          if (count && count > 1) sharedWalletCount = count;
        } catch {
          // ignore
        }
      }

      // Check if email is shared by multiple partner profiles
      let sharedEmailCount = 1;
      if (benProfile?.email?.trim()) {
        try {
          const { count } = await admin
            .from("profiles")
            .select("id", { count: "exact", head: true })
            .ilike("email", benProfile.email.trim());
          if (count && count > 1) sharedEmailCount = count;
        } catch {
          // ignore
        }
      }

      const evalResult = evaluateAntiFraudRules({
        buyerEmail: invoice?.buyer_email,
        buyerWallet: null,
        beneficiaryPartnerId: entry.beneficiary_partner_id,
        beneficiaryUserId: benPartner?.user_id,
        beneficiaryEmail: benProfile?.email,
        beneficiaryWallet: benProfile?.payout_recipient,
        referralCode: sale.referral_code,
        saleStatus: sale.status,
        invoiceStatus: invoice?.status,
        partnersWithSameWalletCount: sharedWalletCount,
        partnersWithSameEmailCount: sharedEmailCount,
        registrationsPerHourSameIp: maxBurstCount,
      });

      if (evalResult.underReview) {
        // Persist review in database
        try {
          await admin.from("commission_fraud_reviews").upsert(
            {
              commission_entry_id: entry.id,
              sale_id: saleId,
              beneficiary_partner_id: entry.beneficiary_partner_id,
              status: "under_review",
              flags: evalResult.flags,
              flag_details: evalResult.details as unknown as Record<string, string>,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "commission_entry_id" },
          );

          // Update commission_entries review columns if present
          await admin
            .from("commission_entries")
            .update({
              review_status: "under_review",
              fraud_flags: evalResult.flags,
            })
            .eq("id", entry.id);
        } catch (dbErr) {
          console.warn("[anti-fraud] could not persist review record (migration pending):", dbErr);
        }
      }
    }
  } catch (err) {
    console.error("[anti-fraud] audit failed:", err);
  }
}

/**
 * Approves a flagged commission review. Moves status from 'under_review' to 'approved'.
 */
export async function approveFraudReview(
  commissionEntryId: string,
  adminUserId: string,
  notes: string = "Approved by admin",
): Promise<{ ok: boolean; error?: string }> {
  try {
    const admin = createSupabaseAdminClient();
    const now = new Date().toISOString();

    await admin
      .from("commission_fraud_reviews")
      .update({
        status: "approved",
        reviewed_by: adminUserId,
        reviewed_at: now,
        review_notes: notes,
        updated_at: now,
      })
      .eq("commission_entry_id", commissionEntryId);

    await admin
      .from("commission_entries")
      .update({
        review_status: "approved",
      })
      .eq("id", commissionEntryId);

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "approval failed";
    return { ok: false, error: message };
  }
}

/**
 * Rejects a flagged commission review. Moves status from 'under_review' to 'rejected'.
 */
export async function rejectFraudReview(
  commissionEntryId: string,
  adminUserId: string,
  notes: string = "Rejected by admin",
): Promise<{ ok: boolean; error?: string }> {
  try {
    const admin = createSupabaseAdminClient();
    const now = new Date().toISOString();

    await admin
      .from("commission_fraud_reviews")
      .update({
        status: "rejected",
        reviewed_by: adminUserId,
        reviewed_at: now,
        review_notes: notes,
        updated_at: now,
      })
      .eq("commission_entry_id", commissionEntryId);

    await admin
      .from("commission_entries")
      .update({
        review_status: "rejected",
      })
      .eq("id", commissionEntryId);

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "rejection failed";
    return { ok: false, error: message };
  }
}

/**
 * Records device/IP log on partner registration to feed high-velocity check.
 */
export async function recordRegistrationDeviceLog(input: {
  referralCode: string;
  ipHash: string;
  deviceFingerprint?: string;
}): Promise<void> {
  try {
    const admin = createSupabaseAdminClient();
    await admin.from("registration_device_logs").insert({
      referral_code: input.referralCode.toLowerCase(),
      ip_hash: input.ipHash,
      device_fingerprint: input.deviceFingerprint ?? null,
    });
  } catch {
    // Graceful fallback if table does not exist yet
  }
}
