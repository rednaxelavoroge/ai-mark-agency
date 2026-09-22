import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Network" };

/**
 * Phase 4A route placeholder.
 *
 * The route, the shell and the server-side authorization are real; the feature
 * behind it is not built yet, and this page says so instead of showing
 * invented data.
 */
export default async function AdminNetworkPage() {
  await requireAdmin("/admin/network");

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={"Admin console"}
        title={"Network"}
        lead={"The sponsor tree across the whole partner base."}
      />
      <PlaceholderPanel
        summary={"The edges are already immutable in the database. The visualisation, cycle detection and reconciliation tooling land with the attribution phase."}
        planned={[
          "Full sponsor tree with cycle detection",
          "Review queue for suspicious or disputed edges",
          "Bulk reconciliation for imported legacy partners",
        ]}
      />
    </div>
  );
}
