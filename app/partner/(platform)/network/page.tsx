import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { requirePartner } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Network" };

/**
 * Phase 4A route placeholder.
 *
 * The route, the shell and the server-side authorization are real; the feature
 * behind it is not built yet, and this page says so instead of showing
 * invented data.
 */
export default async function PartnerNetworkPage() {
  await requirePartner("/partner/network");

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={"Partner Platform"}
        title={"Network"}
        lead={"Your sponsor, your downline and the shape of the partner tree."}
      />
      <PlaceholderPanel
        summary={"Network reporting ships with the attribution phase. Phase 4A already stores the relationship the right way: one sponsor per partner, enforced by a unique constraint, immutable once confirmed, and impossible for a partner to set on themselves."}
        planned={[
          "Direct and indirect downline, L1-L5",
          "Sponsor confirmation state per partner, driven by a qualifying sale",
          "Server-side rollups that still respect RLS — you see only your own network",
        ]}
      />
    </div>
  );
}
