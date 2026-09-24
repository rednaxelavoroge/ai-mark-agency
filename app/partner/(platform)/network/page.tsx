import type { Metadata } from "next";
import { DetailList, PageHeader, StatCard } from "@/components/platform/PageHeader";
import { cardClass } from "@/components/ui/classes";
import { getPartnerReferralStats, getSponsorEdge, requirePartner } from "@/lib/auth/dal";
import {
  NO_DATA,
  formatCount,
  formatDate,
  partnerStatusLabel,
} from "@/lib/partner/format";

export const metadata: Metadata = { title: "Network" };

export default async function PartnerNetworkPage() {
  const { partner } = await requirePartner("/partner/network");
  const [sponsor, stats] = await Promise.all([
    getSponsorEdge(partner.partner_id),
    getPartnerReferralStats(),
  ]);

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Partner Platform"
        title="Network"
        lead="Your sponsor, and how many partners signed up through your link. Names in the downline are not listed."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Referral clicks" value={formatCount(stats.clicks)} />
        <StatCard label="Attributed leads" value={formatCount(stats.leads)} />
        <StatCard
          label="Partner registrations"
          value={formatCount(stats.partnerSignups)}
        />
      </div>

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">Your sponsor</h2>
        {sponsor ? (
          <div className="mt-5">
            <DetailList
              items={[
                {
                  label: "Sponsor Partner ID",
                  value: sponsor.sponsor_partner_id,
                  mono: true,
                },
                {
                  label: "Recorded",
                  value: formatDate(sponsor.created_at),
                },
                {
                  label: "Confirmed",
                  value: sponsor.confirmed_at
                    ? formatDate(sponsor.confirmed_at)
                    : "Not confirmed",
                },
                {
                  label: "Source",
                  value: sponsor.attribution_source ?? NO_DATA,
                },
              ]}
            />
          </div>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            No sponsor recorded. A sponsor is set from a referral link at
            signup. You cannot assign one from this account.
          </p>
        )}
      </section>

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">Your status</h2>
        <p className="mt-3 text-sm">
          {partnerStatusLabel(partner.status)}
        </p>
        <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted">
          {stats.partnerSignups === 0
            ? "No partners have signed up through your link yet."
            : stats.partnerSignups === null
              ? "Partner registrations could not be read."
              : `${formatCount(stats.partnerSignups)} partner accounts were attributed to your link. The list of names is not shown.`}
        </p>
      </section>
    </div>
  );
}
