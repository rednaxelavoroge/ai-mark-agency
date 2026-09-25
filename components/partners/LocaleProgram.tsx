import Link from "next/link";
import { LeadInquiry } from "@/components/LeadInquiry";
import { partnerProgramTerms } from "@/content/partner-program";
import { getCopy } from "@/content/copy";
import { PARTNER_SIGNUP_HREF } from "@/lib/auth/redirects";
import { buildSalesKit } from "@/lib/partner/catalog";
import { productPagePath } from "@/lib/products";
import type { Locale } from "@/lib/site";

/**
 * Public partner page for locales that do not have the long EN/RU essay.
 * Facts come from the published locale copy and the approved program terms.
 */
export function LocaleProgram({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const terms = partnerProgramTerms[locale];
  const kit = buildSalesKit(locale, "code");
  const products = (["aime", "assistant", "showroom"] as const).map((id) => {
    const item = copy.products.items[id];
    const card = kit.products.find((product) => product.id === id);
    return {
      id,
      name: card?.name ?? id,
      who: item.who,
      offer: item.value,
      price: item.price,
      href: productPagePath(locale, id),
    };
  });

  return (
    <article>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-mark uppercase">
            {copy.partners.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-editorial text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl">
            {copy.partners.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {copy.partners.lead}
          </p>
          <ol className="mt-5 flex flex-wrap items-center gap-2">
            {["Personal sale", "Team sales", "Up to 5 levels", "Commission"].map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                {i > 0 ? <span className="font-mono text-xs text-warm">→</span> : null}
                <span className="rounded-full border border-line bg-ink-2 px-3 py-1.5 text-sm text-paper">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{terms.join}</p>
          <Link
            href={PARTNER_SIGNUP_HREF}
            className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-mark px-6 py-3 text-sm font-semibold text-mark-ink shadow transition-all hover:bg-mark-light"
          >
            {terms.signup}
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-editorial text-3xl tracking-tight text-paper">{copy.products.title}</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">{copy.products.lead}</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="rounded-2xl border border-line bg-ink-2 p-6">
                <h3 className="font-display text-lg font-semibold text-paper">{product.name}</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted">{product.who}</p>
                <p className="mt-3 text-xs leading-relaxed text-paper/80">{product.offer}</p>
                <p className="mt-4 font-mono text-xs text-mark">{product.price}</p>
                <Link href={product.href} className="mt-4 inline-flex text-xs font-semibold text-paper link-underline">
                  {copy.products.detailCta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink-2/20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-editorial text-3xl tracking-tight text-paper">{copy.partners.earn}</h2>
            <ul className="mt-4 grid gap-2 text-sm text-muted">
              {copy.partners.can.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-ink-2 p-6 text-xs leading-relaxed text-muted">
            <p className="text-paper/90">{terms.note}</p>
            <p className="mt-3">{terms.launch}</p>
            <p className="mt-3">{terms.example}</p>
            <p className="mt-3">{terms.lock}</p>
            <p className="mt-3">{terms.payout}</p>
            <p className="mt-3">{terms.country}</p>
          </div>
        </div>
      </section>

      <LeadInquiry contact={copy.contact} />

      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-editorial text-4xl tracking-tight text-paper">{terms.signup}</h2>
          <p className="mt-4 text-sm text-muted">{terms.join}</p>
          <Link
            href={PARTNER_SIGNUP_HREF}
            className="mt-8 inline-flex items-center rounded-full bg-mark px-6 py-3 text-sm font-semibold text-mark-ink hover:bg-mark-light"
          >
            {terms.signup}
          </Link>
        </div>
      </section>
    </article>
  );
}
