import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { requirePartner } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Commissions" };

/**
 * Phase 4A route placeholder.
 *
 * The route, the shell and the server-side authorization are real; the feature
 * behind it is not built yet, and this page says so instead of showing
 * invented data.
 */
export default async function PartnerCommissionsPage() {
  await requirePartner("/partner/commissions");

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={"Partner Platform"}
        title={"Commissions"}
        lead={"What you have earned, and the rule that produced it."}
      />
      <PlaceholderPanel
        summary={"No commission is calculated in Phase 4A. Nothing on this page is estimated, projected or simulated — the figures stay blank until a real ledger produces them."}
        planned={[
          "A commission ledger entry per sale and per level",
          "L1-L5 distribution once the programme rules are approved",
          "Adjustments, reversals and refund handling",
        ]}
      />
    </div>
  );
}
