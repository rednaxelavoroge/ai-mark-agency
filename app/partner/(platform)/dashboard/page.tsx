import type { Metadata } from "next";
import { PartnerDashboardView } from "@/components/platform/PartnerDashboardView";
import { requirePartner } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Dashboard" };

/**
 * Partner Dashboard V1.
 *
 * Authorise first, then read: `requirePartner()` runs the server-side role and
 * partner-record check, and `getPartnerAccount()` reads through the partner's
 * own Supabase session so Row Level Security bounds every row to this partner.
 * The rendering itself lives in PartnerDashboardView.
 */
export default async function PartnerDashboardPage() {
  const { auth, account } = await requirePartner("/partner/dashboard");

  return (
    <PartnerDashboardView
      partner={account.partner}
      profile={account.profile}
      sponsor={account.sponsor}
      history={account.history}
      email={auth.email}
    />
  );
}
