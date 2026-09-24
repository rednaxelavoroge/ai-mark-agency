import type { Metadata } from "next";
import { DetailList, PageHeader } from "@/components/platform/PageHeader";
import { CopyReferralLink } from "@/components/platform/CopyReferralLink";
import { cardClass } from "@/components/ui/classes";
import { requirePartner } from "@/lib/auth/dal";
import { NO_DATA, formatDate, referralUrl } from "@/lib/partner/format";

export const metadata: Metadata = { title: "Profile" };

/**
 * Real data, read-only.
 *
 * This page doubles as the visible proof that RLS is doing its job: it reads
 * `profiles` and `partner_profiles` through the partner's own session, so it
 * can only ever render the signed-in partner's row. Editing ships with the
 * profile-update phase.
 */
export default async function PartnerProfilePage() {
  const { auth, account } = await requirePartner("/partner/profile");
  const { profile, partner } = account;

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Partner Platform"
        title="Profile"
        lead="Your account and contact details. Every field here is read from your own row through Row Level Security."
      />

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

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">Referral link</h2>
        <p className="mt-1 text-xs text-muted">
          Issued with the account. Profile fields on this page stay read-only.
        </p>
        <div className="mt-5">
          <CopyReferralLink url={referralUrl(partner.referral_code)} />
        </div>
      </section>
    </div>
  );
}
