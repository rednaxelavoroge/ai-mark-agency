import type { Metadata } from "next";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { getPartnerLeads, requirePartner } from "@/lib/auth/dal";
import { NO_DATA, formatDateTime } from "@/lib/partner/format";

export const metadata: Metadata = { title: "Customers" };

export default async function PartnerCustomersPage() {
  await requirePartner("/partner/customers");
  const leads = await getPartnerLeads();

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Partner Platform"
        title="Customers"
        lead="People who submitted the contact form after opening your referral link. A lead is not a sale."
      />
      <DataTable
        unreadable={leads.unreadable}
        empty="No attributed leads. A row appears when someone writes through the site while your referral cookie is still valid."
        columns={["Name", "Company", "Email", "Scenario", "When"]}
        rows={(leads.rows ?? []).map((lead) => [
          lead.name || NO_DATA,
          lead.company || NO_DATA,
          lead.email || NO_DATA,
          lead.scenario || NO_DATA,
          formatDateTime(lead.created_at),
        ])}
      />
    </div>
  );
}
