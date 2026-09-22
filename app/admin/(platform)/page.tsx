import type { Metadata } from "next";
import { PageHeader, StatCard } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { getAdminOverview, requireAdmin } from "@/lib/auth/dal";
import { NO_DATA } from "@/lib/partner/format";

export const metadata: Metadata = { title: "Overview" };

const numberFormat = new Intl.NumberFormat("en-GB");

function render(value: number | null): string {
  return value === null ? NO_DATA : numberFormat.format(value);
}

/**
 * These four tiles are real. They read the Phase 4A tables through the admin's
 * own session, so they double as a live check that the admin RLS policies
 * grant the access they are supposed to. Everything financial stays a stated
 * placeholder rather than a simulated number.
 */
export default async function AdminOverviewPage() {
  await requireAdmin("/admin");
  const overview = await getAdminOverview();

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Admin console"
        title="Overview"
        lead="Live counts from the Phase 4A schema. Financial reporting arrives with the commission and payout phases."
      />

      <section aria-label="Schema counts" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Partner records"
          value={render(overview.partners)}
          hint="One per provisioned partner."
        />
        <StatCard
          label="Accounts"
          value={render(overview.people)}
          hint="Mirrored from auth.users."
        />
        <StatCard
          label="Sponsor edges"
          value={render(overview.sponsorEdges)}
          hint="Immutable, one sponsor per partner."
        />
        <StatCard
          label="Status changes"
          value={render(overview.statusChanges)}
          hint="Recorded by a database trigger."
        />
      </section>

      <PlaceholderPanel
        summary="Phase 4A delivers the schema, the roles and the Row Level Security boundary. The administration screens that operate on them — partner management, the network tree, the ledger and payouts — are built on top of this foundation in later phases."
        planned={[
          "Partner list with status transitions and a required reason",
          "Sponsor tree across the whole partner base",
          "Commission ledger, payout batches and reconciliation",
          "Role grants and the full audit trail",
        ]}
      />
    </div>
  );
}
