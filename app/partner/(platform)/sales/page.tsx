import type { Metadata } from "next";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { getPartnerSales, requirePartner } from "@/lib/auth/dal";
import { loadPartnerCabinet } from "@/lib/partner/load-cabinet";
import { NO_DATA, formatDateTime, formatStoredMoney } from "@/lib/partner/format";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await loadPartnerCabinet();
  return { title: copy.pages.sales.metadataTitle };
}

export default async function PartnerSalesPage() {
  await requirePartner("/partner/sales");
  const [{ copy }, sales] = await Promise.all([
    loadPartnerCabinet(),
    getPartnerSales(),
  ]);
  const page = copy.pages.sales;
  const table = copy.dataTable.sales;

  return (
    <div className="grid gap-7">
      <PageHeader eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <DataTable
        unreadable={sales.unreadable}
        unreadableText={copy.dataTable.unreadable}
        empty={table.empty}
        columns={table.columns}
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
