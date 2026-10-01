"use client";

import Link from "next/link";
import {
  DetailList,
  PageHeader,
  StatCard,
} from "@/components/platform/PageHeader";
import { ReferralPanel } from "@/components/platform/ReferralPanel";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { useCabinetCopy } from "@/components/platform/CabinetCopyProvider";
import { cardClass } from "@/components/ui/classes";
import { CommissionScheduleCard } from "@/components/platform/CommissionScheduleCard";
import { formatCabinetString } from "@/lib/partner/copy-format";
import {
  NO_DATA,
  formatCount,
  formatDate,
  formatDateTime,
  formatLedgerMoney,
  launchBonusProgramActive,
  partnerStatusLabelFromCopy,
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
  const t = useCabinetCopy();
  const d = t.dashboard;
  const displayName = profile?.full_name ?? email ?? t.defaultPartnerName;
  const language = profile?.language ? profile.language.toUpperCase() : NO_DATA;
  const statusLabel = (status: string) => partnerStatusLabelFromCopy(status, t);

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={t.pages.dashboard.eyebrow}
        title={formatCabinetString(d.welcomeTitle, { name: displayName })}
        lead={
          <>
            {d.welcomeLeadBefore}{" "}
            <span className="font-mono text-paper">{partner.partner_id}</span>.{" "}
            {d.welcomeLeadAfter}
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
            {d.performanceTitle}
          </h2>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted">
            {d.performanceLead}
          </p>
        </div>

        {/* Two columns even at 390px: four stacked tiles pushed the identity
            block below the fold on a phone. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          <StatCard
            label={d.statQualifyingSales}
            value={
              ledger.qualifyingSales === null
                ? NO_DATA
                : formatCount(ledger.qualifyingSales)
            }
          />
          <StatCard
            label={d.statCommission}
            value={formatLedgerMoney(ledger.commissionNet, ledger.currency)}
            hint={ledger.currency ?? NO_DATA}
          />
          <StatCard
            label={d.statReadyToPay}
            value={formatLedgerMoney(ledger.payableAmount, ledger.currency)}
          />
          <StatCard
            label={d.statPaid}
            value={formatLedgerMoney(ledger.paidAmount, ledger.currency)}
          />
        </div>
        {ledger.entryCount === 0 ? (
          <p className="text-xs text-muted">{d.noCommissionsYet}</p>
        ) : null}
        {ledger.currencies && ledger.currencies.length > 1 ? (
          <ul className="grid gap-2 text-xs text-muted">
            {ledger.currencies.map((row) => (
              <li key={row.currency ?? "none"}>
                {formatCabinetString(d.currencyBreakdown, {
                  currency: row.currency ?? NO_DATA,
                  commission: row.commissionNet,
                  payable: row.payableAmount,
                  paid: row.paidAmount,
                })}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <CommissionScheduleCard />

      <LaunchCard />

      <div className="grid gap-6 lg:grid-cols-5">
        <section
          aria-labelledby="identity-heading"
          className={`p-5 sm:p-6 lg:col-span-3 ${cardClass}`}
        >
          <h2 id="identity-heading" className="text-sm font-semibold tracking-tight">
            {d.identityTitle}
          </h2>
          <p className="mt-1 text-xs text-muted">{d.identityLead}</p>

          <div className="mt-6">
            <DetailList
              items={[
                { label: d.labelPartnerId, value: partner.partner_id, mono: true },
                {
                  label: d.labelPartnerStatus,
                  value: statusLabel(partner.status),
                },
                { label: d.labelReferralCode, value: partner.referral_code, mono: true },
                { label: d.labelCountry, value: profile?.country ?? NO_DATA },
                { label: d.labelJoined, value: formatDate(partner.created_at) },
                { label: d.labelLanguage, value: language },
              ]}
            />
          </div>
        </section>

        <section
          aria-labelledby="sponsor-heading"
          className={`p-5 sm:p-6 lg:col-span-2 ${cardClass}`}
        >
          <h2 id="sponsor-heading" className="text-sm font-semibold tracking-tight">
            {d.sponsorTitle}
          </h2>

          {sponsor ? (
            <>
              <p className="mt-4 font-mono text-sm">{sponsor.sponsor_partner_id}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {sponsor.confirmed_at
                  ? formatCabinetString(d.sponsorConfirmed, {
                      date: formatDate(sponsor.confirmed_at),
                    })
                  : d.sponsorRecordedUnconfirmed}
                {sponsor.attribution_source === "referral_link"
                  ? d.sponsorFromReferralLink
                  : ""}
              </p>
            </>
          ) : (
            <p className="mt-4 text-xs leading-relaxed text-muted">{d.sponsorEmpty}</p>
          )}
        </section>
      </div>

      <section
        aria-labelledby="history-heading"
        className={`p-5 sm:p-6 ${cardClass}`}
      >
        <h2 id="history-heading" className="text-sm font-semibold tracking-tight">
          {d.historyTitle}
        </h2>
        <p className="mt-1 text-xs text-muted">{d.historyLead}</p>

        {history.length === 0 ? (
          <p className="mt-5 text-xs text-muted">{d.historyEmpty}</p>
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
                      ? `${statusLabel(entry.old_status)} → ${statusLabel(entry.new_status)}`
                      : statusLabel(entry.new_status)}
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

      <section
        aria-labelledby="hub-heading"
        className={`p-5 sm:p-6 ${cardClass}`}
      >
        <h2 id="hub-heading" className="text-sm font-semibold tracking-tight">
          {d.hubTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">{d.hubLead}</p>
        <ul className="mt-4 grid gap-2 text-xs">
          <li>
            <Link href="/partner/resources#demos" className="link-underline text-paper">
              {d.hubLinkDemos}
            </Link>
          </li>
          <li>
            <Link href="/partner/resources#knowledge" className="link-underline text-paper">
              {d.hubLinkKnowledge}
            </Link>
          </li>
          <li>
            <Link href="/partner/resources#materials" className="link-underline text-paper">
              {d.hubLinkMaterials}
            </Link>
          </li>
          <li>
            <Link href="/partner/resources#support" className="link-underline text-paper">
              {d.hubLinkSupport}
            </Link>
          </li>
        </ul>
      </section>

      <p className="text-xs text-muted">
        {d.trackingFootnoteBefore}{" "}
        <Link href="/partner/resources#tracking" className="link-underline text-paper">
          {d.trackingFootnoteLink}
        </Link>
        {d.trackingFootnoteAfter}
      </p>
    </div>
  );
}

function LaunchCard() {
  const t = useCabinetCopy();
  const d = t.dashboard;
  const active = launchBonusProgramActive();

  return (
    <section aria-labelledby="schedule-heading" className={`p-5 sm:p-6 ${cardClass}`}>
      <h2 id="schedule-heading" className="text-sm font-semibold tracking-tight">
        {active ? d.launchActiveTitle : d.launchEndedTitle}
      </h2>
      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
        {active ? d.launchActiveBody : d.launchEndedBody}
      </p>
    </section>
  );
}
