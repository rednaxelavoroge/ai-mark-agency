import type { Metadata } from "next";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { getAdminCommissionEntries, requireAdmin } from "@/lib/auth/dal";
import { formatDateTime, formatStoredMoney } from "@/lib/partner/format";

export const metadata: Metadata = { title: "Commissions" };

export default async function AdminCommissionsPage() {
  await requireAdmin("/admin/commissions");
  const entries = await getAdminCommissionEntries();

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Admin console"
        title="Commissions"
        lead="Commission entries across partners. Status, level and amount are the stored ledger values. This screen does not recompute a rate and does not pay anyone. Up to 100 rows, newest first."
      />
      <DataTable
        unreadable={entries.unreadable}
        empty="No commission entries. A row appears after a qualifying sale is posted. An empty list is empty."
        columns={["Partner", "Status", "Level", "Type", "Amount", "Posted"]}
        rows={(entries.rows ?? []).map((entry) => [
          entry.beneficiary_partner_id,
          entry.status,
          `L${entry.level}`,
          entry.commission_type,
          formatStoredMoney(entry.amount, entry.currency),
          formatDateTime(entry.created_at),
        ])}
      />
    </div>
  );
}
