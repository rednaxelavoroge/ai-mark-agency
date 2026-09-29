import type { Metadata } from "next";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { getPartnerLeads, requirePartner } from "@/lib/auth/dal";
import { loadPartnerCabinet } from "@/lib/partner/load-cabinet";
import { NO_DATA, formatDateTime } from "@/lib/partner/format";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await loadPartnerCabinet();
  return { title: copy.pages.customers.metadataTitle };
}

export default async function PartnerCustomersPage() {
  await requirePartner("/partner/customers");
  const [{ copy }, leads] = await Promise.all([
    loadPartnerCabinet(),
    getPartnerLeads(),
  ]);
  const page = copy.pages.customers;
  const table = copy.dataTable.customers;

  return (
    <div className="grid gap-7">
      <PageHeader eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <DataTable
        unreadable={leads.unreadable}
        unreadableText={copy.dataTable.unreadable}
        empty={table.empty}
        columns={table.columns}
        rows={(leads.rows ?? []).map((lead) => [
          lead.name || NO_DATA,
          lead.company || NO_DATA,
          lead.email || NO_DATA,
          lead.scenario || NO_DATA,
          lead.landing_path || NO_DATA,
          formatDateTime(lead.created_at),
        ])}
      />
    </div>
  );
}
