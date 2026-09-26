import type { Metadata } from "next";
import { CopyText } from "@/components/platform/CopyText";
import { PageHeader } from "@/components/platform/PageHeader";
import { ReferralPanel } from "@/components/platform/ReferralPanel";
import { cardClass } from "@/components/ui/classes";
import { getOwnProfile, getPartnerReferralStats, requirePartner } from "@/lib/auth/dal";
import { cabinetLocale } from "@/lib/partner/catalog";
import { buildPartnerHub } from "@/lib/partner/hub";
import { partnerHubLocale } from "@/lib/partner/facts";
import { referralUrl } from "@/lib/partner/format";

export const metadata: Metadata = { title: "Resources" };

export default async function PartnerResourcesPage() {
  const { auth, partner } = await requirePartner("/partner/resources");
  const [profile, stats] = await Promise.all([
    getOwnProfile(auth.userId),
    getPartnerReferralStats(),
  ]);
  const locale = cabinetLocale(profile?.language);
  const hub = buildPartnerHub(locale, partner.referral_code);
  const labels = hub.labels;
  const kit = hub.kit;
  const lang = partnerHubLocale(locale);

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Partner Platform"
        title={labels.title}
        lead={labels.lead}
      />

      <ReferralPanel
        partnerId={partner.partner_id}
        referralCode={partner.referral_code}
        url={referralUrl(partner.referral_code)}
        stats={stats}
      />

      <section id="start" className={`scroll-mt-24 p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">{labels.startTitle}</h2>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
          {labels.startLead}
        </p>
        <ol className="mt-5 grid gap-4">
          {labels.steps.map((step, index) => (
            <li key={step.title} className="grid gap-1 border-b border-line/70 pb-4 last:border-b-0 last:pb-0">
              <p className="text-sm font-medium">
                <span className="font-mono text-[10px] text-muted">{index + 1}.</span>{" "}
                {step.title}
              </p>
              <p className="text-xs leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="tracking" className={`scroll-mt-24 p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">{labels.trackingTitle}</h2>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
          {labels.trackingLead}
        </p>
        <ul className="mt-5 grid gap-4">
          {labels.tracking.map((item) => (
            <li key={item.title}>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="demos" className="scroll-mt-24 grid gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">{labels.demosTitle}</h2>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
            {labels.demosLead}
          </p>
        </div>
        {hub.demos.map((demo) => (
          <article key={demo.id} className={`p-5 sm:p-6 ${cardClass}`}>
            <h3 className="text-sm font-semibold tracking-tight">{demo.name}</h3>
            <div className="mt-4 grid gap-2">
              <a href={demo.pageReferral} className="text-xs font-medium text-paper link-underline">
                {labels.openPage}
              </a>
              {demo.payReferrals.map((sku) => (
                <a
                  key={sku.skuId}
                  href={sku.href}
                  className="text-xs font-medium text-paper link-underline"
                >
                  {labels.openPay}: {sku.name}
                </a>
              ))}
            </div>
            {demo.liveChat ? (
              <p className="mt-3 text-xs leading-relaxed text-muted">{labels.liveChat}</p>
            ) : null}
            {demo.panelDemo ? (
              <p className="mt-2 text-xs leading-relaxed text-muted">{labels.panelDemo}</p>
            ) : null}
          </article>
        ))}
        <p className="text-xs leading-relaxed text-muted">{labels.noSandbox}</p>
        <p className="text-xs leading-relaxed text-muted">{labels.noDeck}</p>
      </section>

      <section id="knowledge" className="scroll-mt-24 grid gap-6">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">{labels.knowledgeTitle}</h2>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
            {labels.knowledgeLead}
          </p>
        </div>
        {hub.knowledge.map((product) => (
          <article key={product.id} className={`p-5 sm:p-6 ${cardClass}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold tracking-tight">{product.name}</h3>
              <a href={product.pageReferral} className="text-xs font-medium text-paper link-underline">
                {labels.openPage}
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
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{product.offer}</dd>
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
              <div>
                <dt className="text-[10px] tracking-[0.16em] text-muted uppercase">
                  {labels.limits}
                </dt>
                <dd>
                  <ul className="mt-2 grid gap-2">
                    {product.limits.map((limit) => (
                      <li key={limit} className="text-xs leading-relaxed text-muted">
                        {limit}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <div className="mt-5">
              <CopyText
                label={kit.labels.message}
                value={product.message}
                copyLabel="Copy"
                copiedLabel="Copied"
              />
            </div>
          </article>
        ))}
      </section>

      <section id="materials" className={`scroll-mt-24 p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">{labels.materialsTitle}</h2>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
          {labels.materialsLead}
        </p>
        <ul className="mt-5 grid gap-3">
          {hub.assets.map((asset) => (
            <li key={asset.id} className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line/70 pb-3 last:border-b-0 last:pb-0">
              <span className="text-sm">
                {lang === "ru" ? asset.nameRu : asset.nameEn}
              </span>
              <a href={asset.href} download className="text-xs font-medium text-paper link-underline">
                {labels.download}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted">{labels.materialsMissing}</p>
      </section>

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">{kit.labels.retainers}</h2>
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
          <h2 className="text-sm font-semibold tracking-tight">{kit.labels.production}</h2>
          <p className="mt-3 text-sm">{kit.production.name}</p>
          <p className="mt-1 font-mono text-sm">{kit.production.price}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">{kit.production.body}</p>
        </section>
      ) : null}

      <section id="support" className={`scroll-mt-24 p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">{labels.supportTitle}</h2>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
          {labels.supportLead}
        </p>
        <ul className="mt-5 grid gap-3 text-sm">
          <li>
            <a href={`mailto:${hub.support.email}`} className="link-underline text-paper">
              {hub.support.email}
            </a>
          </li>
          {hub.support.messengers.map((channel) => (
            <li key={channel.key}>
              <a href={channel.href} className="link-underline text-paper">
                {channel.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted">{labels.includeId}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted">{labels.noTickets}</p>
      </section>

      <p className="max-w-2xl text-xs leading-relaxed text-muted">{kit.labels.note}</p>
    </div>
  );
}
