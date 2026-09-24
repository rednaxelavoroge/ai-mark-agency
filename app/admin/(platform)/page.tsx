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
 * These four tiles are real. They read the partner tables through the admin's
 * own session. Sales, commissions and payouts have their own screens and are
 * not repeated here as invented figures.
 */
export default async function AdminOverviewPage() {
  await requireAdmin("/admin");
  const overview = await getAdminOverview();

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Admin console"
        title="Overview"
        lead="Live counts from the partner schema. Sales, commissions and payouts are on their own screens."
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
        summary="Partner records, the sponsor tree and the audit trail are already in the database. Those admin screens are not built yet."
        planned={[
          "Partner list with status transitions and a required reason",
          "Sponsor tree across the whole partner base",
          "Role grants and the full audit trail",
        ]}
      />
    </div>
  );
}
