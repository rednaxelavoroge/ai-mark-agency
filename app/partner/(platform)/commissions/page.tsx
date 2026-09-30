import type { Metadata } from "next";
import { CommissionScheduleCard } from "@/components/platform/CommissionScheduleCard";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { getPartnerCommissions, requirePartner } from "@/lib/auth/dal";
import { loadPartnerCabinet } from "@/lib/partner/load-cabinet";
import { NO_DATA, formatDateTime, formatStoredMoney } from "@/lib/partner/format";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await loadPartnerCabinet();
  return { title: copy.pages.commissions.metadataTitle };
}

export default async function PartnerCommissionsPage() {
  await requirePartner("/partner/commissions");
  const [{ copy }, entries] = await Promise.all([
    loadPartnerCabinet(),
    getPartnerCommissions(),
  ]);
  const page = copy.pages.commissions;
  const table = copy.dataTable.commissions;

  return (
    <div className="grid gap-7">
      <PageHeader eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <CommissionScheduleCard />
      <DataTable
        unreadable={entries.unreadable}
        unreadableText={copy.dataTable.unreadable}
        empty={table.empty}
        columns={table.columns}
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
