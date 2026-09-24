import Link from "next/link";
import {
  DetailList,
  PageHeader,
  StatCard,
} from "@/components/platform/PageHeader";
import { ReferralPanel } from "@/components/platform/ReferralPanel";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { cardClass } from "@/components/ui/classes";
import {
  NO_DATA,
  formatCount,
  formatDate,
  formatDateTime,
  formatLedgerMoney,
  launchWindow,
  partnerStatusLabel,
  referralUrl,
  type PartnerLedgerStats,
  type PartnerReferralStats,
} from "@/lib/partner/format";
import type {
  PartnerProfileRow,
  PartnerRelationshipRow,
  PartnerStatusHistoryRow,
  ProfileRow,
} from "@/lib/supabase/database.types";

export type PartnerDashboardData = {
  partner: PartnerProfileRow;
  profile: Omit<ProfileRow, "payout_recipient" | "payout_details"> | null;
  sponsor: PartnerRelationshipRow | null;
  history: PartnerStatusHistoryRow[];
  /** Phase 4B referral counters — real, or `null` when unreadable. */
  stats: PartnerReferralStats;
  /** Phase 4C ledger. Empty is zero; unreadable is null. */
  ledger: PartnerLedgerStats;
  email: string | null;
};

/**
 * Presentational dashboard body.
 *
 * Kept free of authorization and data access so it can be rendered from the
 * real page (after requirePartner() + RLS-scoped reads) and from a design
 * preview with fixture data — which is how the 390px layout is reviewed
 * without a live Supabase project.
 */
export function PartnerDashboardView({
  partner,
  profile,
  sponsor,
  history,
  stats,
  ledger,
  email,
}: PartnerDashboardData) {
  const displayName = profile?.full_name ?? email ?? "Partner";
  const language = profile?.language ? profile.language.toUpperCase() : NO_DATA;

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Partner Platform"
        title={`Welcome, ${displayName}`}
        lead={
          <>
            Your Partner ID is{" "}
            <span className="font-mono text-paper">{partner.partner_id}</span>.
            Your referral link is live. Sales, commission and payout figures
            come from the ledger.
          </>
        }
        actions={<StatusBadge status={partner.status} />}
      />

      <ReferralPanel
        partnerId={partner.partner_id}
        referralCode={partner.referral_code}
        url={referralUrl(partner.referral_code)}
        stats={stats}
      />

      <section aria-labelledby="metrics-heading" className="grid gap-4">
        <div>
          <h2
            id="metrics-heading"
            className="text-sm font-semibold tracking-tight"
          >
            Performance
          </h2>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted">
            Qualifying sales and commission come from the ledger. An empty
            ledger is zero. A dash means the figure could not be read, or that
            the record does not exist yet. Nothing here is estimated.
          </p>
        </div>

        {/* Two columns even at 390px: four stacked tiles pushed the identity
            block below the fold on a phone. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          <StatCard
            label="Qualifying sales"
            value={
              ledger.qualifyingSales === null
                ? NO_DATA
                : formatCount(ledger.qualifyingSales)
            }
          />
          <StatCard
            label="Commission"
            value={formatLedgerMoney(ledger.commissionNet, ledger.currency)}
            hint={ledger.currency ?? (ledger.commissionNet === "0.00" ? "No currency yet" : NO_DATA)}
          />
          <StatCard
            label="Payable"
            value={formatLedgerMoney(ledger.payableAmount, ledger.currency)}
          />
          <StatCard
            label="Paid"
            value={formatLedgerMoney(ledger.paidAmount, ledger.currency)}
          />
        </div>
        {ledger.entryCount === 0 ? (
          <p className="text-xs text-muted">No commission entries.</p>
        ) : null}
        {ledger.currencies && ledger.currencies.length > 1 ? (
          <ul className="grid gap-2 text-xs text-muted">
            {ledger.currencies.map((row) => (
              <li key={row.currency ?? "none"}>
                {row.currency ?? NO_DATA}: commission {row.commissionNet}, payable{" "}
                {row.payableAmount}, paid {row.paidAmount}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <LaunchCard createdAt={partner.created_at} />

      <div className="grid gap-6 lg:grid-cols-5">
        <section
          aria-labelledby="identity-heading"
          className={`p-5 sm:p-6 lg:col-span-3 ${cardClass}`}
        >
          <h2 id="identity-heading" className="text-sm font-semibold tracking-tight">
            Partner identity
          </h2>
          <p className="mt-1 text-xs text-muted">
            Issued by AI MARK. Partner ID, referral code and status are
            immutable from your account.
          </p>

          <div className="mt-6">
            <DetailList
              items={[
                { label: "Partner ID", value: partner.partner_id, mono: true },
                {
                  label: "Partner status",
                  value: partnerStatusLabel(partner.status),
                },
                { label: "Referral code", value: partner.referral_code, mono: true },
                { label: "Country", value: profile?.country ?? NO_DATA },
                { label: "Joined", value: formatDate(partner.created_at) },
                { label: "Language", value: language },
              ]}
            />
          </div>
        </section>

        <section
          aria-labelledby="sponsor-heading"
          className={`p-5 sm:p-6 lg:col-span-2 ${cardClass}`}
        >
          <h2 id="sponsor-heading" className="text-sm font-semibold tracking-tight">
            Sponsor
          </h2>

          {sponsor ? (
            <>
              <p className="mt-4 font-mono text-sm">{sponsor.sponsor_partner_id}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {sponsor.confirmed_at
                  ? `Confirmed ${formatDate(sponsor.confirmed_at)}.`
                  : "Recorded, not yet confirmed by a qualifying sale."}
                {sponsor.attribution_source === "referral_link"
                  ? " Recorded from a referral link at signup."
                  : ""}
              </p>
            </>
          ) : (
            <p className="mt-4 text-xs leading-relaxed text-muted">
              No sponsor recorded. Sponsor relationships are set by AI MARK from
              a referral link at signup, never by the partner, and are immutable
              once confirmed.
            </p>
          )}
        </section>
      </div>

      <section
        aria-labelledby="history-heading"
        className={`p-5 sm:p-6 ${cardClass}`}
      >
        <h2 id="history-heading" className="text-sm font-semibold tracking-tight">
          Status history
        </h2>
        <p className="mt-1 text-xs text-muted">
          Written by the database on every status change.
        </p>

        {history.length === 0 ? (
          <p className="mt-5 text-xs text-muted">No entries yet.</p>
        ) : (
          <ol className="mt-5 grid gap-4">
            {history.map((entry) => (
              <li key={entry.id} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mark"
                />
                <div className="min-w-0">
                  <p className="text-sm">
                    {entry.old_status
                      ? `${partnerStatusLabel(entry.old_status)} → ${partnerStatusLabel(entry.new_status)}`
                      : partnerStatusLabel(entry.new_status)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {formatDateTime(entry.created_at)}
                    {entry.reason ? ` · ${entry.reason}` : ""}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <p className="text-xs text-muted">
        Sales, commissions and payouts list the ledger rows. The sales kit is
        on{" "}
        <Link href="/partner/resources" className="link-underline text-paper">
          Resources
        </Link>
        .
      </p>
    </div>
  );
}

function LaunchCard({ createdAt }: { createdAt: string }) {
  const schedule = launchWindow(createdAt);
  if (!schedule) {
    return null;
  }

  const ends = formatDate(schedule.endsAt);
  const launch = schedule.phase === "launch";

  return (
    <section aria-labelledby="schedule-heading" className={`p-5 sm:p-6 ${cardClass}`}>
      <h2 id="schedule-heading" className="text-sm font-semibold tracking-tight">
        {launch ? "Launch schedule" : "Base schedule"}
      </h2>
      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
        {launch
          ? `Qualifying payments before ${ends} use the launch schedule. The window starts at the partner record and lasts 90 days. It is not a calendar quarter and it is not lifetime.`
          : `The 90-day launch window ended ${ends}. Qualifying payments after that date use the base schedule.`}
        {" "}
        The amounts above are the ledger totals. This card does not calculate them.
      </p>
    </section>
  );
}
