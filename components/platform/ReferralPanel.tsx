import { CopyReferralLink } from "@/components/platform/CopyReferralLink";
import { DetailList, StatCard } from "@/components/platform/PageHeader";
import { cardClass } from "@/components/ui/classes";
import { ATTRIBUTION_WINDOW_LABEL } from "@/lib/referral/cookie";
import { formatCount, type PartnerReferralStats } from "@/lib/partner/format";

/**
 * The Partner Dashboard referral section.
 *
 * Everything shown here is real:
 *   * Partner ID and referral code are the partner's own, issued by the
 *     database and immutable;
 *   * the referral URL is the live `/go/<code>` entry point;
 *   * the three counters come from `public.partner_referral_stats()`, a
 *     counts-only server rollup.
 *
 * There are deliberately no revenue, commission or payout figures: those
 * engines do not exist yet, and an invented number on a partner's dashboard
 * would be worse than an empty tile. A count that could not be read renders as
 * `—`, never as 0.
 */
export function ReferralPanel({
  partnerId,
  referralCode,
  url,
  stats,
}: {
  partnerId: string;
  referralCode: string;
  url: string;
  stats: PartnerReferralStats;
}) {
  return (
    <section
      aria-labelledby="referral-heading"
      className={`p-5 sm:p-6 ${cardClass}`}
    >
      <h2
        id="referral-heading"
        className="text-sm font-semibold tracking-tight"
      >
        Referral program
      </h2>
      <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted">
        Visits through your link are recorded server-side and attribute a
        customer lead for {ATTRIBUTION_WINDOW_LABEL}. A partner who signs up
        through it is recorded as your referral. Sponsor relationships are set
        by AI Mark from the referral link only — never from your account, and
        never editable from the client.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="grid gap-5 lg:col-span-3">
          <DetailList
            items={[
              { label: "Partner ID", value: partnerId, mono: true },
              { label: "Referral code", value: referralCode, mono: true },
            ]}
          />
          <CopyReferralLink url={url} />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-2 lg:grid-cols-1">
          <StatCard
            label="Referral clicks"
            value={formatCount(stats.clicks)}
          />
          <StatCard
            label="Attributed leads"
            value={formatCount(stats.leads)}
          />
          <StatCard
            label="Partner signups"
            value={formatCount(stats.partnerSignups)}
          />
        </div>
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-muted">
        A dash means the platform could not read that count — it is never
        rounded up, estimated or simulated. Commission and payout figures stay
        empty until those engines ship.
      </p>
    </section>
  );
}
