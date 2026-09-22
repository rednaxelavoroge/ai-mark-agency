import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { requirePartner } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Sales" };

/**
 * Phase 4A route placeholder.
 *
 * The route, the shell and the server-side authorization are real; the feature
 * behind it is not built yet, and this page says so instead of showing
 * invented data.
 */
export default async function PartnerSalesPage() {
  await requirePartner("/partner/sales");

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={"Partner Platform"}
        title={"Sales"}
        lead={"Orders attributed to you and whether they qualify."}
      />
      <PlaceholderPanel
        summary={"Sales become visible once each product reports orders and the programme rules can decide whether an order qualifies. Phase 4A deliberately ships no qualification logic, so there is nothing to display yet."}
        planned={[
          "Order-level records with product, amount and currency",
          "Qualification state: qualifying, not qualifying, refunded",
          "The qualifying sale that confirms a sponsor relationship",
        ]}
      />
    </div>
  );
}
