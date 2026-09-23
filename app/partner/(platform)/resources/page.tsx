import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { requirePartner } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Resources" };

/**
 * Phase 4A route placeholder.
 *
 * The route, the shell and the server-side authorization are real; the feature
 * behind it is not built yet, and this page says so instead of showing
 * invented data.
 */
export default async function PartnerResourcesPage() {
  await requirePartner("/partner/resources");

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={"Partner Platform"}
        title={"Resources"}
        lead={"Everything you need to represent AI MARK well."}
      />
      <PlaceholderPanel
        summary={"The enablement library arrives with the partner programme rollout. Until then, the public product pages are the accurate source: pricing and positioning there always match the live offering."}
        planned={[
          "Brand-approved decks, one-pagers and assets",
          "Product positioning and pricing references that stay in sync with the site",
          "Objection handling and onboarding material",
        ]}
      />
    </div>
  );
}
