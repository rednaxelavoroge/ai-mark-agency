import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Commissions" };

/**
 * Phase 4A route placeholder.
 *
 * The route, the shell and the server-side authorization are real; the feature
 * behind it is not built yet, and this page says so instead of showing
 * invented data.
 */
export default async function AdminCommissionsPage() {
  await requireAdmin("/admin/commissions");

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={"Admin console"}
        title={"Commissions"}
        lead={"The full commission ledger across partners and levels."}
      />
      <PlaceholderPanel
        summary={"The commission engine is not part of Phase 4A: no calculations, no distribution, no fraud rules. These screens ship together with that engine so the ledger is never shown without the logic behind it."}
        planned={[
          "Ledger view across partners and L1-L5 levels",
          "Rule versioning and safe recomputation",
          "Reversals, disputes and manual adjustments",
        ]}
      />
    </div>
  );
}
