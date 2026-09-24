import type { Metadata } from "next";
import { CopyText } from "@/components/platform/CopyText";
import { PageHeader } from "@/components/platform/PageHeader";
import { ReferralPanel } from "@/components/platform/ReferralPanel";
import { cardClass } from "@/components/ui/classes";
import { getPartnerReferralStats, requirePartner } from "@/lib/auth/dal";
import { buildSalesKit, cabinetLocale } from "@/lib/partner/catalog";
import { referralUrl } from "@/lib/partner/format";

export const metadata: Metadata = { title: "Resources" };

export default async function PartnerResourcesPage() {
  const { account } = await requirePartner("/partner/resources");
  const locale = cabinetLocale(account.profile?.language);
  const kit = buildSalesKit(locale, account.partner.referral_code);
  const stats = await getPartnerReferralStats();
  const labels = kit.labels;

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Partner Platform"
        title={labels.title}
        lead={labels.lead}
      />

      <ReferralPanel
        partnerId={account.partner.partner_id}
        referralCode={account.partner.referral_code}
        url={referralUrl(account.partner.referral_code)}
        stats={stats}
      />

      <div className="grid gap-6">
        {kit.products.map((product) => (
          <article key={product.id} className={`p-5 sm:p-6 ${cardClass}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold tracking-tight">{product.name}</h2>
              <a
                href={product.referral}
                className="text-xs font-medium text-paper link-underline"
              >
                {labels.open}
              </a>
            </div>
            <dl className="mt-5 grid gap-4">
              <div>
                <dt className="text-[10px] tracking-[0.16em] text-muted uppercase">
                  {labels.who}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed">{product.who}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.16em] text-muted uppercase">
                  {labels.offer}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                  {product.offer}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.16em] text-muted uppercase">
                  {labels.price}
                </dt>
                <dd className="mt-1.5 text-sm">{product.price}</dd>
              </div>
              {product.extra ? (
                <p className="text-xs leading-relaxed text-muted">{product.extra}</p>
              ) : null}
            </dl>
            <div className="mt-5">
              <CopyText
                label={labels.message}
                value={product.message}
                copyLabel="Copy"
                copiedLabel="Copied"
              />
            </div>
          </article>
        ))}
      </div>

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">{labels.retainers}</h2>
        <ul className="mt-5 grid gap-4">
          {kit.retainers.map((item) => (
            <li key={item.id} className="grid gap-1 border-b border-line/70 pb-4 last:border-b-0 last:pb-0">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="font-mono text-sm">{item.price}</p>
              <p className="text-xs leading-relaxed text-muted">{item.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      {kit.production ? (
        <section className={`p-5 sm:p-6 ${cardClass}`}>
          <h2 className="text-sm font-semibold tracking-tight">{labels.production}</h2>
          <p className="mt-3 text-sm">{kit.production.name}</p>
          <p className="mt-1 font-mono text-sm">{kit.production.price}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">{kit.production.body}</p>
        </section>
      ) : null}

      <p className="max-w-2xl text-xs leading-relaxed text-muted">{labels.note}</p>
    </div>
  );
}
