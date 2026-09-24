import type { Metadata } from "next";
import Link from "next/link";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { getAdminLeads, requireAdmin } from "@/lib/auth/dal";
import { NO_DATA, formatDateTime } from "@/lib/partner/format";

export const metadata: Metadata = { title: "Leads" };

function saleHref(referralCode: string | null, partnerId: string | null): string | null {
  if (referralCode) {
    return `/admin/orders?referral_code=${encodeURIComponent(referralCode)}`;
  }
  if (partnerId) {
    return `/admin/orders?partner_id=${encodeURIComponent(partnerId)}`;
  }
  return null;
}

export default async function AdminLeadsPage() {
  await requireAdmin("/admin/leads");
  const leads = await getAdminLeads();

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Admin console"
        title="Leads"
        lead="Requests submitted on the site. A referral cookie attributes the row on the server. This list does not create a sale and does not set a rate."
      />
      <DataTable
        unreadable={leads.unreadable}
        empty="No leads. A row appears when someone submits the contact form. An empty list is empty."
        columns={[
          "When",
          "Name",
          "Company",
          "Email",
          "Messenger",
          "Scenario",
          "Partner",
          "Code",
          "Page",
          "Sale",
        ]}
        rows={(leads.rows ?? []).map((lead) => {
          const href = saleHref(lead.referral_code, lead.partner_id);
          return [
            formatDateTime(lead.created_at),
            lead.name || NO_DATA,
            lead.company || NO_DATA,
            lead.email || NO_DATA,
            lead.messenger || NO_DATA,
            lead.scenario || NO_DATA,
            lead.partner_id ?? NO_DATA,
            lead.referral_code ?? lead.referral_source,
            lead.landing_path ?? NO_DATA,
            href ? (
              <Link key={lead.id} href={href} className="font-medium text-paper link-underline">
                Record sale
              </Link>
            ) : (
              NO_DATA
            ),
          ];
        })}
      />
    </div>
  );
}
