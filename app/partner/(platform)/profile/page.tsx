import type { Metadata } from "next";
import { DetailList, PageHeader } from "@/components/platform/PageHeader";
import { CopyReferralLink } from "@/components/platform/CopyReferralLink";
import { cardClass, fieldClass, labelClass, primaryButtonClass } from "@/components/ui/classes";
import { getOwnPayoutDetails, getOwnProfile, requirePartner } from "@/lib/auth/dal";
import { NO_DATA, formatDate, referralUrl } from "@/lib/partner/format";
import { savePayoutDetails } from "./actions";

export const metadata: Metadata = { title: "Profile" };

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

/**
 * Account and partner-record fields are read-only.
 *
 * The payout block is the one thing the partner writes: a recipient name and
 * free-text destination, on their own profile row. It is not identity
 * verification and it does not send money.
 */
export default async function PartnerProfilePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { auth, partner } = await requirePartner("/partner/profile");
  const [profile, payout, params] = await Promise.all([
    getOwnProfile(auth.userId),
    getOwnPayoutDetails(auth.userId),
    searchParams,
  ]);
  const error = first(params.error);
  const saved = first(params.saved);

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Partner Platform"
        title="Profile"
        lead="Account and partner-record fields are read from your own row. Payout details are the only fields you can change here."
      />

      {saved ? (
        <p className="text-sm text-paper" role="status">
          Payout details saved.
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
            Account
          </h2>
          <div className="mt-6">
            <DetailList
              items={[
                { label: "Full name", value: profile?.full_name ?? NO_DATA },
                { label: "Email", value: profile?.email ?? auth.email ?? NO_DATA },
                { label: "Phone", value: profile?.phone ?? NO_DATA },
                {
                  label: "Language",
                  value: profile?.language ? profile.language.toUpperCase() : NO_DATA,
                },
                { label: "Country", value: profile?.country ?? NO_DATA },
                { label: "Region", value: profile?.region ?? NO_DATA },
                { label: "Avatar URL", value: profile?.avatar_url ?? NO_DATA },
                {
                  label: "Account created",
                  value: formatDate(profile?.created_at ?? partner.created_at),
                },
              ]}
            />
          </div>
        </section>

        <section aria-labelledby="partner-heading" className={`p-5 sm:p-6 ${cardClass}`}>
          <h2 id="partner-heading" className="text-sm font-semibold tracking-tight">
            Partner record
          </h2>
          <p className="mt-1 text-xs text-muted">
            Platform-owned. These values cannot be changed from a partner
            session by design.
          </p>
          <div className="mt-6">
            <DetailList
              items={[
                { label: "Partner ID", value: partner.partner_id, mono: true },
                { label: "Referral code", value: partner.referral_code, mono: true },
                { label: "Status", value: partner.status },
                { label: "Partner since", value: formatDate(partner.created_at) },
              ]}
            />
          </div>
        </section>
      </div>

      <section aria-labelledby="payout-heading" className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 id="payout-heading" className="text-sm font-semibold tracking-tight">
          Payout details
        </h2>
        <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted">
          Where AI MARK should send a payout. Type the recipient and the
          destination yourself. This does not verify identity and does not
          send money.
        </p>
        {payout.unreadable ? (
          <p className="mt-5 text-sm text-muted">
            {NO_DATA} Payout details could not be read, so they cannot be saved
            from this page.
          </p>
        ) : (
          <form action={savePayoutDetails} className="mt-5 grid max-w-xl gap-4">
            <label className={labelClass}>
              <span className="text-muted">Recipient</span>
              <input
                className={fieldClass}
                name="payout_recipient"
                maxLength={120}
                defaultValue={payout.recipient ?? ""}
                autoComplete="name"
              />
            </label>
            <label className={labelClass}>
              <span className="text-muted">Destination</span>
              <textarea
                className={`${fieldClass} min-h-28`}
                name="payout_details"
                maxLength={2000}
                defaultValue={payout.details ?? ""}
                placeholder="Bank, account, wallet, or other instructions"
              />
            </label>
            <button type="submit" className={`w-fit ${primaryButtonClass}`}>
              Save payout details
            </button>
          </form>
        )}
      </section>

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">Referral link</h2>
        <p className="mt-1 text-xs text-muted">
          Issued with the account. The partner record above stays read-only.
        </p>
        <div className="mt-5">
          <CopyReferralLink url={referralUrl(partner.referral_code)} />
        </div>
      </section>
    </div>
  );
}
