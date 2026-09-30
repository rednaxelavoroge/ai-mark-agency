import type { Metadata } from "next";
import { CommissionScheduleCard } from "@/components/platform/CommissionScheduleCard";
import { DetailList, PageHeader, StatCard } from "@/components/platform/PageHeader";
import { cardClass } from "@/components/ui/classes";
import { getPartnerReferralStats, getSponsorEdge, requirePartner } from "@/lib/auth/dal";
import { formatCabinetString } from "@/lib/partner/copy-format";
import { loadPartnerCabinet } from "@/lib/partner/load-cabinet";
import {
  NO_DATA,
  formatCount,
  formatDate,
  partnerStatusLabelFromCopy,
} from "@/lib/partner/format";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await loadPartnerCabinet();
  return { title: copy.pages.network.metadataTitle };
}

export default async function PartnerNetworkPage() {
  const { partner } = await requirePartner("/partner/network");
  const [{ copy }, sponsor, stats] = await Promise.all([
    loadPartnerCabinet(),
    getSponsorEdge(partner.partner_id),
    getPartnerReferralStats(),
  ]);
  const page = copy.pages.network;
  const net = copy.network;

  const statusDetail =
    stats.partnerSignups === 0
      ? net.statusNone
      : stats.partnerSignups === null
        ? net.statusUnreadable
        : formatCabinetString(net.statusCount, {
            count: formatCount(stats.partnerSignups) ?? String(stats.partnerSignups),
          });

  return (
    <div className="grid gap-7">
      <PageHeader eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label={net.statClicks} value={formatCount(stats.clicks)} />
        <StatCard label={net.statLeads} value={formatCount(stats.leads)} />
        <StatCard label={net.statRegistrations} value={formatCount(stats.partnerSignups)} />
      </div>

      <CommissionScheduleCard />

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">{net.sponsorTitle}</h2>
        {sponsor ? (
          <div className="mt-5">
            <DetailList
              items={[
                {
                  label: net.labelSponsorPartnerId,
                  value: sponsor.sponsor_partner_id,
                  mono: true,
                },
                {
                  label: net.labelRecorded,
                  value: formatDate(sponsor.created_at),
                },
                {
                  label: net.labelConfirmed,
                  value: sponsor.confirmed_at
                    ? formatDate(sponsor.confirmed_at)
                    : net.notConfirmed,
                },
                {
                  label: net.labelSource,
                  value: sponsor.attribution_source ?? NO_DATA,
                },
              ]}
            />
          </div>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-muted">{net.sponsorEmpty}</p>
        )}
      </section>

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">{net.statusTitle}</h2>
        <p className="mt-3 text-sm">{partnerStatusLabelFromCopy(partner.status, copy)}</p>
        <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted">{statusDetail}</p>
      </section>
    </div>
  );
}
