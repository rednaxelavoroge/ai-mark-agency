import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Partners" };

/**
 * Phase 4A route placeholder.
 *
 * The route, the shell and the server-side authorization are real; the feature
 * behind it is not built yet, and this page says so instead of showing
 * invented data.
 */
export default async function AdminPartnersPage() {
  await requireAdmin("/admin/partners");

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={"Admin console"}
        title={"Partners"}
        lead={"Every partner record and its lifecycle status."}
      />
      <PlaceholderPanel
        summary={"Phase 4A delivers the schema, the roles and the policies, but not the administration screens. Partner records are read here through an admin session, which is the only session that RLS allows to see across partners."}
        planned={[
          "Search, filter and inspect partner records",
          "Status transitions with a required reason, audited automatically by trigger",
          "Grant or revoke the admin role",
        ]}
      />
    </div>
  );
}
