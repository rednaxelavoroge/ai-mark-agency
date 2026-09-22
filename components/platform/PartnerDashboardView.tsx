import Link from "next/link";
import { CopyReferralLink } from "@/components/platform/CopyReferralLink";
import {
  DetailList,
  PageHeader,
  StatCard,
} from "@/components/platform/PageHeader";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { cardClass } from "@/components/ui/classes";
import {
  NO_DATA,
  formatDate,
  formatDateTime,
  partnerStatusLabel,
  referralUrl,
} from "@/lib/partner/format";
import type {
  PartnerProfileRow,
  PartnerRelationshipRow,
  PartnerStatusHistoryRow,
  ProfileRow,
} from "@/lib/supabase/database.types";

export type PartnerDashboardData = {
  partner: PartnerProfileRow;
  profile: ProfileRow | null;
  sponsor: PartnerRelationshipRow | null;
  history: PartnerStatusHistoryRow[];
  email: string | null;
};

/**
 * Every metric here is intentionally `NO_DATA`.
 *
 * Phase 4A ships no attribution, sales or commission engine, and the brief is
 * explicit that the dashboard must never display an invented figure. Each tile
 * becomes real as its phase lands. The explanation is stated once above the
 * grid rather than repeated under all four tiles.
 */

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
            Attribution, sales and commission reporting arrive in the next
            phases.
          </>
        }
        actions={<StatusBadge status={partner.status} />}
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
            These figures stay empty until the sales, commission and payout
            engines ship. A dash means the platform genuinely does not know yet
            — nothing here is estimated or simulated.
          </p>
        </div>

        {/* Two columns even at 390px: four stacked tiles pushed the identity
            block below the fold on a phone. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          <StatCard label="Network size" value={NO_DATA} />
          <StatCard label="Customers" value={NO_DATA} />
          <StatCard label="Qualifying sales" value={NO_DATA} />
          <StatCard label="Commission" value={NO_DATA} />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <section
          aria-labelledby="identity-heading"
          className={`p-5 sm:p-6 lg:col-span-3 ${cardClass}`}
        >
          <h2 id="identity-heading" className="text-sm font-semibold tracking-tight">
            Partner identity
          </h2>
          <p className="mt-1 text-xs text-muted">
            Issued by AI Mark. Partner ID, referral code and status are
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
          aria-labelledby="referral-heading"
          className={`p-5 sm:p-6 lg:col-span-2 ${cardClass}`}
        >
          <h2 id="referral-heading" className="text-sm font-semibold tracking-tight">
            Referral link
          </h2>
          <p className="mt-1 text-xs text-muted">
            Share it as it is — the code is yours permanently.
          </p>
          <div className="mt-5">
            <CopyReferralLink url={referralUrl(partner.referral_code)} />
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
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
              <p className="mt-2 text-xs text-muted">
                {sponsor.confirmed_at
                  ? `Confirmed ${formatDate(sponsor.confirmed_at)}.`
                  : "Recorded, not yet confirmed by a qualifying sale."}
              </p>
            </>
          ) : (
            <p className="mt-4 text-xs leading-relaxed text-muted">
              No sponsor recorded. Sponsor relationships are set by AI Mark,
              never by the partner, and are immutable once confirmed.
            </p>
          )}
        </section>

        <section
          aria-labelledby="history-heading"
          className={`p-5 sm:p-6 lg:col-span-3 ${cardClass}`}
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
      </div>

      <p className="text-xs text-muted">
        Profile details are read-only in Phase 4A. Editing, your network and the
        resources library are described on the{" "}
        <Link href="/partner/profile" className="link-underline text-paper">
          Profile
        </Link>{" "}
        and{" "}
        <Link href="/partner/resources" className="link-underline text-paper">
          Resources
        </Link>{" "}
        pages.
      </p>
    </div>
  );
}
