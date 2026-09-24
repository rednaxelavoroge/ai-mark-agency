import type { Metadata } from "next";
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
        lead="Ledger entries for your partner id. Status, rate and amount are stored values. This page does not recompute them. A reversal is its own row with a negative amount."
      />
      <DataTable
        unreadable={entries.unreadable}
        empty="No commission entries. Nothing is estimated. An entry appears after a qualifying sale is posted to the ledger."
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
