import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { requirePartner } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Payouts" };

/**
 * Phase 4A route placeholder.
 *
 * The route, the shell and the server-side authorization are real; the feature
 * behind it is not built yet, and this page says so instead of showing
 * invented data.
 */
export default async function PartnerPayoutsPage() {
  await requirePartner("/partner/payouts");

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={"Partner Platform"}
        title={"Payouts"}
        lead={"Withdrawals, their approval state and your statements."}
      />
      <PlaceholderPanel
        summary={"Payouts need a commission ledger and a payment provider, neither of which exists yet. This screen is reserved so the route and the authorization are already correct when it does."}
        planned={[
          "Payout requests with approval state",
          "Payment method, currency and minimum thresholds",
          "Statements and tax documents",
        ]}
      />
    </div>
  );
}
