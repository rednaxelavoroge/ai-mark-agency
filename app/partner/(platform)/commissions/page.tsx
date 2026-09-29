import type { Metadata } from "next";
import { CommissionScheduleCard } from "@/components/platform/CommissionScheduleCard";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { getPartnerCommissions, requirePartner } from "@/lib/auth/dal";
import { NO_DATA, formatDateTime, formatStoredMoney } from "@/lib/partner/format";

export const metadata: Metadata = { title: "Commissions" };

export default async function PartnerCommissionsPage() {
  await requirePartner("/partner/commissions");
  const entries = await getPartnerCommissions();

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Partner Platform"
        title="Commissions"
        lead="Your commissions for each qualifying sale. Schedule: L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, network pool 80%."
      />
      <CommissionScheduleCard />
      <DataTable
        unreadable={entries.unreadable}
        empty="No commissions yet. An entry appears after a qualifying sale."
        columns={["Status", "Type", "Level", "Amount", "Rate", "Base", "Posted"]}
        rows={(entries.rows ?? []).map((entry) => [
          entry.status,
          entry.commission_type,
          `L${entry.level}`,
          formatStoredMoney(entry.amount, entry.currency),
          entry.rate || NO_DATA,
          formatStoredMoney(entry.base_amount, entry.currency),
          formatDateTime(entry.created_at),
        ])}
      />
    </div>
  );
}
