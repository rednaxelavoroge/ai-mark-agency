import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Payouts" };

/**
 * Phase 4A route placeholder.
 *
 * The route, the shell and the server-side authorization are real; the feature
 * behind it is not built yet, and this page says so instead of showing
 * invented data.
 */
export default async function AdminPayoutsPage() {
  await requireAdmin("/admin/payouts");

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={"Admin console"}
        title={"Payouts"}
        lead={"Payout runs and their reconciliation."}
      />
      <PlaceholderPanel
        summary={"Payouts arrive after the commission ledger and a payment provider integration. Phase 4A fixes the schema and the access model they will build on."}
        planned={[
          "Payout batches with approvals",
          "Provider reconciliation and failure handling",
          "Statements and compliance exports",
        ]}
      />
    </div>
  );
}
