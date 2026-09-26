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
        lead="People who submitted the contact form on the site while your referral link was still valid. Chat, Telegram, WhatsApp and email are not this list. A lead is not a sale and is not a commission."
      />
      <DataTable
        unreadable={leads.unreadable}
        empty="No attributed leads. A row appears when someone sends the contact form on the site while your referral cookie is still valid. An empty list is empty."
        columns={["Name", "Company", "Email", "Scenario", "Page", "When"]}
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
