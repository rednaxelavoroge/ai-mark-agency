import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Audit" };

/**
 * Phase 4A route placeholder.
 *
 * The route, the shell and the server-side authorization are real; the feature
 * behind it is not built yet, and this page says so instead of showing
 * invented data.
 */
export default async function AdminAuditPage() {
  await requireAdmin("/admin/audit");

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={"Admin console"}
        title={"Audit"}
        lead={"Who changed what, and when."}
      />
      <PlaceholderPanel
        summary={"Status changes are already recorded automatically by a database trigger, including who made them. The admin view over that trail ships here, together with role and access auditing."}
        planned={[
          "Status history across every partner",
          "Role grants and revocations",
          "Filtered export for compliance",
        ]}
      />
    </div>
  );
}
