import type { Metadata } from "next";
import { PartnerDashboardView } from "@/components/platform/PartnerDashboardView";
import {
  getOwnProfile,
  getPartnerLedgerStats,
  getPartnerReferralStats,
  getSponsorEdge,
  getStatusHistory,
  requirePartner,
} from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Dashboard" };

/**
 * Partner Dashboard.
 *
 * Authorise first, then read: `requirePartner()` runs the server-side role and
 * partner-record check, and `getPartnerAccount()` reads through the partner's
 * own Supabase session so Row Level Security bounds every row to this partner.
 * The rendering itself lives in PartnerDashboardView.
 *
 * Phase 4B adds `getPartnerReferralStats()`, which calls a counts-only
 * SECURITY DEFINER rollup — the referral tables themselves are not readable
 * across partners, and a sponsor still cannot enumerate their downline.
 */
export default async function PartnerDashboardPage() {
  const { auth, partner } = await requirePartner("/partner/dashboard");
  const [profile, sponsor, history, stats, ledger] = await Promise.all([
    getOwnProfile(auth.userId),
    getSponsorEdge(partner.partner_id),
    getStatusHistory(partner.partner_id),
    getPartnerReferralStats(),
    getPartnerLedgerStats(),
  ]);

  return (
    <PartnerDashboardView
      partner={partner}
      profile={profile}
      sponsor={sponsor}
      history={history}
      stats={stats}
      ledger={ledger}
      email={auth.email}
    />
  );
}
