import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { requirePartner } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Customers" };

/**
 * Phase 4A route placeholder.
 *
 * The route, the shell and the server-side authorization are real; the feature
 * behind it is not built yet, and this page says so instead of showing
 * invented data.
 */
export default async function PartnerCustomersPage() {
  await requirePartner("/partner/customers");

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={"Partner Platform"}
        title={"Customers"}
        lead={"The businesses and people attributed to your referral code."}
      />
      <PlaceholderPanel
        summary={"Customer attribution depends on the click-tracking engine, which arrives in Phase 4B. Until then this list is genuinely empty — nothing is inferred or back-filled."}
        planned={[
          "Customers attributed to your referral code, with first-touch date",
          "Product and plan they signed up for",
          "Consent state and data-request handling",
        ]}
      />
    </div>
  );
}
