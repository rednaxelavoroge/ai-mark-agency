import type { Metadata } from "next";
import { PartnerDashboardView } from "@/components/platform/PartnerDashboardView";
import {
  getPartnerLedgerStats,
  getPartnerReferralStats,
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
  const { auth, account } = await requirePartner("/partner/dashboard");
  const stats = await getPartnerReferralStats();
  const ledger = await getPartnerLedgerStats();

  return (
    <PartnerDashboardView
      partner={account.partner}
      profile={account.profile}
      sponsor={account.sponsor}
      history={account.history}
      stats={stats}
      ledger={ledger}
      email={auth.email}
    />
  );
}
