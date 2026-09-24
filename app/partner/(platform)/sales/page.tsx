import type { Metadata } from "next";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { getPartnerSales, requirePartner } from "@/lib/auth/dal";
import { NO_DATA, formatDateTime, formatStoredMoney } from "@/lib/partner/format";

export const metadata: Metadata = { title: "Sales" };

export default async function PartnerSalesPage() {
  await requirePartner("/partner/sales");
  const sales = await getPartnerSales();

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Partner Platform"
        title="Sales"
        lead="Paid orders attributed to your referral code or partner id. Clicks and leads are not sales. Amounts are the amounts stored on the sale."
      />
      <DataTable
        unreadable={sales.unreadable}
        empty="No sales yet. A row appears after AI MARK records a payment the customer actually made. An empty list is empty — it is not a zero estimate of revenue."
        columns={[
          "Product",
          "Amount",
          "Status",
          "Paid",
          "Confirmed",
          "Locked",
          "Order",
        ]}
        rows={(sales.rows ?? []).map((sale) => [
          sale.product_ref ?? NO_DATA,
          formatStoredMoney(sale.amount, sale.currency),
          sale.status,
          formatDateTime(sale.paid_at),
          formatDateTime(sale.confirmed_at),
          formatDateTime(sale.locked_at),
          sale.external_order_id,
        ])}
      />
    </div>
  );
}
