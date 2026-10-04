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
import { loadPartnerCabinet } from "@/lib/partner/load-cabinet";

import { getPartnerNotifications } from "@/lib/partner/notifications";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await loadPartnerCabinet();
  return { title: copy.pages.dashboard.metadataTitle };
}

export default async function PartnerDashboardPage() {
  const { auth, partner } = await requirePartner("/partner/dashboard");
  const [profile, sponsor, history, stats, ledger, { notifications }] = await Promise.all([
    getOwnProfile(auth.userId),
    getSponsorEdge(partner.partner_id),
    getStatusHistory(partner.partner_id),
    getPartnerReferralStats(),
    getPartnerLedgerStats(),
    getPartnerNotifications(partner.partner_id, 10),
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
      notifications={notifications}
    />
  );
}
