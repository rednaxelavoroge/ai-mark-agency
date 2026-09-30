import type { Metadata } from "next";
import { DetailList, PageHeader } from "@/components/platform/PageHeader";
import { CopyReferralLink } from "@/components/platform/CopyReferralLink";
import { cardClass, fieldClass, labelClass, primaryButtonClass } from "@/components/ui/classes";
import { getOwnPayoutDetails, getOwnProfile, requirePartner } from "@/lib/auth/dal";
import {
  DEFAULT_PAYOUT_NETWORK,
  PAYOUT_ASSET,
  parsePayoutDetails,
} from "@/lib/crypto/payout-destination";
import { NETWORK_LABELS, PAYOUT_NETWORKS } from "@/lib/crypto/networks";
import { loadPartnerCabinet } from "@/lib/partner/load-cabinet";
import { NO_DATA, formatDate, referralUrl, partnerStatusLabelFromCopy } from "@/lib/partner/format";
import { savePayoutDetails } from "./actions";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await loadPartnerCabinet();
  return { title: copy.pages.profile.metadataTitle };
}

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function PartnerProfilePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { auth, partner } = await requirePartner("/partner/profile");
  const [{ copy }, profile, payout, params] = await Promise.all([
    loadPartnerCabinet(),
    getOwnProfile(auth.userId),
    getOwnPayoutDetails(auth.userId),
    searchParams,
  ]);
  const page = copy.pages.profile;
  const prof = copy.profile;
  const parsedPayout = parsePayoutDetails(payout.details);
  const error = first(params.error);
  const saved = first(params.saved);

  return (
    <div className="grid gap-7">
      <PageHeader eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      {saved ? (
        <p className="text-sm text-paper" role="status">
          {prof.savedNotice}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="account-heading" className={`p-5 sm:p-6 ${cardClass}`}>
          <h2 id="account-heading" className="text-sm font-semibold tracking-tight">
            {prof.accountTitle}
          </h2>
          <div className="mt-6">
            <DetailList
              items={[
                { label: prof.labelFullName, value: profile?.full_name ?? NO_DATA },
                { label: prof.labelEmail, value: profile?.email ?? auth.email ?? NO_DATA },
                { label: prof.labelPhone, value: profile?.phone ?? NO_DATA },
                {
                  label: prof.labelLanguage,
                  value: profile?.language ? profile.language.toUpperCase() : NO_DATA,
                },
                { label: prof.labelCountry, value: profile?.country ?? NO_DATA },
                { label: prof.labelRegion, value: profile?.region ?? NO_DATA },
                { label: prof.labelAvatarUrl, value: profile?.avatar_url ?? NO_DATA },
                {
                  label: prof.labelAccountCreated,
                  value: formatDate(profile?.created_at ?? partner.created_at),
                },
              ]}
            />
          </div>
        </section>

        <section aria-labelledby="partner-heading" className={`p-5 sm:p-6 ${cardClass}`}>
          <h2 id="partner-heading" className="text-sm font-semibold tracking-tight">
            {prof.partnerRecordTitle}
          </h2>
          <p className="mt-1 text-xs text-muted">{prof.partnerRecordLead}</p>
          <div className="mt-6">
            <DetailList
              items={[
                { label: copy.dashboard.labelPartnerId, value: partner.partner_id, mono: true },
                {
                  label: copy.dashboard.labelReferralCode,
                  value: partner.referral_code,
                  mono: true,
                },
                {
                  label: prof.labelStatus,
                  value: partnerStatusLabelFromCopy(partner.status, copy),
                },
                { label: prof.labelPartnerSince, value: formatDate(partner.created_at) },
              ]}
            />
          </div>
        </section>
      </div>

      <section aria-labelledby="payout-heading" className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 id="payout-heading" className="text-sm font-semibold tracking-tight">
          {prof.payoutTitle}
        </h2>
        <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted">{prof.payoutLead}</p>
        {payout.unreadable ? (
          <p className="mt-5 text-sm text-muted">
            {NO_DATA} {prof.payoutUnreadable}
          </p>
        ) : (
          <form action={savePayoutDetails} className="mt-5 grid max-w-xl gap-4">
            <label className={labelClass}>
              <span className="text-muted">{prof.labelRecipientName}</span>
              <input
                className={fieldClass}
                name="payout_recipient"
                maxLength={120}
                defaultValue={payout.recipient ?? ""}
                autoComplete="name"
              />
            </label>
            <label className={labelClass}>
              <span className="text-muted">{prof.labelPayoutAsset}</span>
              <input className={fieldClass} value={PAYOUT_ASSET} readOnly />
            </label>
            <label className={labelClass}>
              <span className="text-muted">{prof.labelNetwork}</span>
              <select
                className={fieldClass}
                name="payout_network"
                defaultValue={parsedPayout?.network ?? DEFAULT_PAYOUT_NETWORK}
              >
                {PAYOUT_NETWORKS.map((network) => (
                  <option key={network} value={network}>
                    {NETWORK_LABELS[network]}
                    {network === DEFAULT_PAYOUT_NETWORK ? " (default)" : ""}
                  </option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              <span className="text-muted">{prof.labelUsdcAddress}</span>
              <input
                className={`${fieldClass} font-mono text-xs`}
                name="payout_address"
                maxLength={128}
                defaultValue={parsedPayout?.address ?? ""}
                placeholder={prof.usdcPlaceholder}
                autoComplete="off"
              />
            </label>
            <label className={labelClass}>
              <span className="text-muted">{prof.labelNotes}</span>
              <textarea
                className={`${fieldClass} min-h-20`}
                name="payout_notes"
                maxLength={2000}
                defaultValue={parsedPayout?.notes ?? (!parsedPayout ? payout.details ?? "" : "")}
              />
            </label>
            <button type="submit" className={`w-fit ${primaryButtonClass}`}>
              {prof.savePayout}
            </button>
          </form>
        )}
      </section>

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">{prof.referralTitle}</h2>
        <p className="mt-1 text-xs text-muted">{prof.referralLead}</p>
        <div className="mt-5">
          <CopyReferralLink url={referralUrl(partner.referral_code)} />
        </div>
      </section>
    </div>
  );
}
