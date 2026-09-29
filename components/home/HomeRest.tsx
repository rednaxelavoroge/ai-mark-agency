import Link from "next/link";
import { CapabilityBand } from "@/components/CapabilityBand";
import { ContactCta } from "@/components/ContactCta";
import { DigitalProductionHubCard } from "@/components/DigitalProductionHubCard";
import { LeadInquiry } from "@/components/LeadInquiry";
import { Section } from "@/components/Section";
import { ProductUI, type ProductVariant } from "@/components/ui/ProductUI";
import type { Copy } from "@/content/copy";
import { navHref, site, type Locale } from "@/lib/site";

type HubModule = {
  num: string;
  tag: string;
  title: string;
  desc: string;
  badge: string;
  cta: string;
  href: string;
  accent: string;
};

type FeaturedProduct = {
  id: string;
  variant: ProductVariant;
  name: string;
  tag: string;
  price: string;
  desc: string;
  highlights: string[];
  href: string;
  externalUrl: string | null;
};

/**
 * Compact hub restored from 81c17bc: capability band, five cards that leave
 * the page, three product cards, then contact. Long narratives stay on
 * /how-it-works, /pricing, /products, /partners and /investors.
 * Surfaces use the forest/lime tokens from the public redesign.
 */
export function HomeRest({
  locale,
  t,
  hubModules,
  featuredProducts,
  isRu,
}: {
  locale: Locale;
  t: Copy;
  hubModules: HubModule[];
  featuredProducts: FeaturedProduct[];
  isRu: boolean;
}) {
  return (
    <>
      <CapabilityBand locale={locale} />

      <Section
        id="hub"
        index="01"
        eyebrow={isRu ? "Экосистема Хаба" : "Hub Ecosystem"}
        title={isRu ? "Все направления компании в одном хабе." : "All Company Capabilities in One Hub."}
        lead={
          isRu
            ? "Выберите интересующий раздел: от сквозного контура создания бизнеса и каталога готовых AI-продуктов до тарифов и партнёрской сети."
            : "Select an area of interest: explore our end-to-end venture system, proprietary AI products, commercial retainers, or partner network."
        }
      >
        <div className="home-defer grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hubModules.map((m, i) => (
            <Link
              key={m.num}
              href={navHref(locale, m.href)}
              className={`group flex flex-col justify-between rounded-[24px] border border-line bg-ink-2 p-6 transition-colors hover:border-line-strong ${
                i === 0 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-warm">{m.num}</span>
                  <span className="rounded-full border border-line bg-ink-3/60 px-2.5 py-0.5 font-mono text-[10px] text-muted">
                    {m.badge}
                  </span>
                </div>
                <span className="mt-4 block font-mono text-[10px] uppercase tracking-wider text-mark">{m.tag}</span>
                <h3 className="mt-1 font-sans text-xl font-semibold tracking-[-0.04em] text-paper sm:text-2xl">{m.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{m.desc}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-paper">
                  {m.cta}
                  <span aria-hidden>→</span>
                </span>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: m.accent }} />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="products" index="02" eyebrow={t.tech.eyebrow} title={t.tech.title} lead={t.tech.lead}>
        <div className="home-defer grid gap-4 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="catalog-card peek-host flex flex-col justify-between rounded-[24px] border border-line bg-ink-2 p-5 sm:p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-mark/25 bg-mark/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-mark">
                    <span className="h-1.5 w-1.5 rounded-full bg-mark" />
                    {product.tag}
                  </span>
                  <span className="font-mono text-xs font-semibold text-paper">{product.price}</span>
                </div>
                <div className="mt-4 overflow-hidden rounded-xl border border-line bg-ink-3/40">
                  <ProductUI variant={product.variant} ratio="aspect-[16/10]" peek />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <h3 className="font-sans text-xl font-semibold tracking-[-0.04em] text-paper">{product.name}</h3>
                  <span className="font-mono text-[10px] uppercase text-muted">{product.id}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{product.desc}</p>
                <ul className="mt-4 space-y-2 border-t border-line/60 pt-3">
                  {product.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px] text-paper/90">
                      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-mark/15 text-[10px] font-bold text-mark">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-4 text-sm font-semibold">
                <Link href={product.href} className="text-mark">
                  {isRu ? "Подробнее о продукте" : "Product details"} →
                </Link>
                {product.externalUrl ? (
                  <a href={product.externalUrl} target="_blank" rel="noopener noreferrer" className="text-muted">
                    showroom-ai.pro ↗
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={navHref(locale, "/products")}
            className="inline-flex min-h-12 items-center rounded-full border border-line bg-ink-2 px-6 text-sm font-semibold"
          >
            {isRu ? "Открыть полный каталог AI-продуктов" : "Open the AI products catalog"} →
          </Link>
        </div>
        <div className="home-defer mt-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-mark">
            {isRu ? "Отдельный сервис" : "A separate service"}
          </p>
          <h3 className="mt-2 font-sans text-2xl font-semibold tracking-[-0.04em]">
            {isRu ? "Цифровое производство — не четвёртый SKU." : "Digital Production is not a fourth SKU."}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {isRu
              ? "Три карточки выше — готовые продукты. Ниже — кастомная сборка с нуля: сайты, платформы, кабинеты и AI-системы под задачу."
              : "The three cards above are ready products. Below is a custom build from scratch: sites, platforms, cabinets and AI systems for a specific task."}
          </p>
          <div className="mt-6 max-w-3xl">
            <DigitalProductionHubCard locale={locale} />
          </div>
        </div>
      </Section>

      <Section id="contact" index="03" eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <ContactCta className="inline-flex h-12 w-fit items-center rounded-full bg-mark px-6 text-sm font-semibold text-mark-ink">
            {isRu ? "Открыть чат с ассистентом" : "Open chat with the assistant"} →
          </ContactCta>
          <aside className="rounded-[24px] border border-line bg-ink-2 p-6 text-sm text-muted sm:p-8">
            <p className="font-sans text-xl font-semibold text-paper">AI MARK</p>
            <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-mark">
              AI-Native Venture &amp; Marketing Company
            </p>
            <p className="mt-2 font-mono text-xs">{site.email}</p>
            <p className="mt-3 text-sm leading-relaxed">
              {isRu
                ? "Короткий разбор задачи: применимость AI, идея, подбор готового продукта или запуск партнёрской сети."
                : "A short initial consultation: AI fit, product selection, or launching a partner distribution channel."}
            </p>
          </aside>
        </div>
        <div id="inquiry" className="home-defer mt-12 scroll-mt-24">
          <LeadInquiry contact={t.contact} locale={locale} framed={false} compact />
        </div>
      </Section>
    </>
  );
}
