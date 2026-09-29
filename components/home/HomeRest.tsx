import Link from "next/link";
import { CapabilityBand } from "@/components/CapabilityBand";
import { ContactCta } from "@/components/ContactCta";
import { DigitalProductionHubCard } from "@/components/DigitalProductionHubCard";
import { LeadInquiry } from "@/components/LeadInquiry";
import { Section } from "@/components/Section";
import { AimeScene, AssistantScene, FinanceFlow, InvestorStreams, ShowroomScene } from "@/components/visuals/ProductScenes";
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

const scenes = {
  aime: AimeScene,
  assistant: AssistantScene,
  showroom: ShowroomScene,
} as const;

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
  const entries = [
    {
      href: "/products",
      kicker: "01",
      title: t.products.hubTitle,
      body: t.products.hubLead,
    },
    {
      href: "/digital-production",
      kicker: "02",
      title: t.production.title,
      body: t.production.lead,
    },
    {
      href: "/how-it-works",
      kicker: "03",
      title: t.creation.title,
      body: t.creation.lead,
    },
  ];

  return (
    <>
      <CapabilityBand locale={locale} />

      <Section
        id="entries"
        index="01"
        eyebrow={t.pillars.eyebrow}
        title={t.pillars.title}
        lead={t.hero.extra}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {entries.map((entry) => (
            <Link
              key={entry.href}
              href={navHref(locale, entry.href)}
              data-reveal
              className="tilt-card flex min-h-[240px] flex-col rounded-[24px] border border-line bg-ink-2 p-6"
            >
              <span className="text-[13px] font-semibold tracking-[0.12em] text-muted">{entry.kicker}</span>
              <h3 className="mt-8 font-sans text-2xl font-semibold tracking-[-0.04em]">{entry.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{entry.body}</p>
              <span className="mt-auto pt-6 text-sm font-semibold text-mark">→</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="products" index="02" eyebrow={t.tech.eyebrow} title={t.tech.title} lead={t.products.lead}>
        <div className="grid gap-4 lg:grid-cols-3">
          {featuredProducts.map((product) => {
            const Scene = scenes[product.variant as keyof typeof scenes];
            return (
              <article
                key={product.id}
                data-reveal
                className="tilt-card flex flex-col overflow-hidden rounded-[24px] border border-line bg-ink-2"
              >
                <div className="h-[180px] bg-[#14291f]" data-motion>
                  {Scene ? <Scene /> : null}
                </div>
                <div className="border-b border-line bg-ink-3/50">
                  <ProductUI variant={product.variant} ratio="aspect-[16/9]" peek />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3 text-[13px]">
                    <span className="font-semibold text-mark">{product.tag}</span>
                    <span className="font-semibold">{product.price}</span>
                  </div>
                  <h3 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.04em]">{product.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{product.desc}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {product.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-mark" aria-hidden>↗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5 text-sm font-semibold">
                    <Link href={product.href} className="text-mark">
                      {isRu ? "Подробнее о продукте" : "Product details"} →
                    </Link>
                    {product.externalUrl ? (
                      <a href={product.externalUrl} target="_blank" rel="noopener noreferrer" className="text-muted">
                        showroom-ai.pro ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={navHref(locale, "/products")}
            className="inline-flex min-h-12 items-center rounded-full border border-line bg-ink-2 px-6 text-sm font-semibold"
          >
            {isRu ? "Открыть полный каталог AI-продуктов" : "Open the AI products catalog"} →
          </Link>
        </div>
        <div className="mt-12" data-reveal>
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

      <section className="relative overflow-hidden bg-[#14291f] text-[#f4f6ee]">
        <div className="am-wrap py-16 sm:py-20">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#d5e0d4]">{t.commercial.eyebrow}</p>
          <h2 className="mt-3 max-w-3xl font-sans text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
            {t.commercial.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#d5e0d4]">{t.commercial.skuNote}</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {t.commercial.tiers.slice(2, 4).map((tier, index) => (
              <article key={tier.name} className={`rounded-[24px] p-6 ${index === 0 ? "bg-[#fffefa] text-[#17261f]" : "border border-white/20 bg-white/8"}`}>
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] opacity-70">{tier.price}</p>
                <h3 className="mt-6 font-sans text-3xl font-semibold tracking-[-0.04em]">{tier.name}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${index === 0 ? "text-[#3e5146]" : "text-[#d5e0d4]"}`}>{tier.body}</p>
                <Link
                  href={navHref(locale, index === 0 ? "/pricing" : "/digital-production")}
                  className={`mt-6 inline-flex text-sm font-semibold ${index === 0 ? "text-[#14291f]" : "text-[var(--lime)]"}`}
                >
                  {index === 0 ? t.commercial.retainerCta : t.production.title} →
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8" data-motion>
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#d5e0d4]">
              {isRu ? "Финансовые и Web3-решения" : "Financial / Web3 Solutions"}
            </p>
            <FinanceFlow />
            <p className="mt-3 text-[13px] text-[#d5e0d4]">{t.ui.cardsSoon}</p>
          </div>
        </div>
      </section>

      <Section id="hub" index="03" eyebrow={isRu ? "Экосистема хаба" : "Hub"} title={isRu ? "Все направления компании в одном хабе." : "All company directions in one hub."}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hubModules.map((item) => (
            <Link
              key={item.num}
              href={navHref(locale, item.href)}
              data-reveal
              className="tilt-card flex flex-col rounded-[24px] border border-line bg-ink-2 p-6"
            >
              <div className="flex items-center justify-between text-[13px] font-semibold text-muted">
                <span>{item.num}</span>
                <span>{item.badge}</span>
              </div>
              <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-mark">{item.tag}</p>
              <h3 className="mt-2 font-sans text-xl font-semibold tracking-[-0.04em]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              <span className="mt-6 text-sm font-semibold">{item.cta} →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="stages" index="04" eyebrow={t.creation.eyebrow} title={t.creation.title} lead={t.creation.lead}>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.creation.steps.map((step, index) => (
            <article key={step.title} className="min-h-[180px] bg-ink-2 p-5">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-[13px] font-semibold">
                {String(index).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-sans text-lg font-semibold tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-[24px] bg-[var(--lime)] p-6 text-[#14291f] sm:flex-row sm:items-center">
          <div>
            <h2 className="font-sans text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{t.pipeline.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#2c4034]">{t.creation.withoutIdea}</p>
          </div>
          <Link href={navHref(locale, "/how-it-works")} className="inline-flex min-h-12 shrink-0 items-center rounded-full bg-[#14291f] px-5 text-sm font-semibold text-[#f4f6ee]">
            {t.hero.secondaryCta} →
          </Link>
        </div>
      </Section>

      <section className="border-t border-line bg-ink-3">
        <div className="am-wrap grid gap-6 py-14 lg:grid-cols-3">
          {t.why.next.slice(0, 3).map((item) => (
            <p key={item} className="font-sans text-xl font-semibold tracking-[-0.03em]">{item}</p>
          ))}
          <p className="text-sm leading-relaxed text-muted lg:col-span-3">{t.why.close}</p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="am-wrap grid gap-4 py-14 lg:grid-cols-3">
          {[
            { href: "/partners", eyebrow: t.partners.eyebrow, title: t.partners.title, body: t.partners.lead, cta: t.partners.cta },
            { href: "/investors", eyebrow: t.investors.eyebrow, title: t.investors.title, body: t.investors.lead, cta: t.investors.cta },
            { href: "/pricing", eyebrow: t.commercial.eyebrow, title: t.commercial.title, body: t.commercial.lead, cta: isRu ? "Смотреть тарифы" : "See pricing" },
          ].map((card) => (
            <Link key={card.href} href={navHref(locale, card.href)} data-reveal className="tilt-card flex flex-col rounded-[24px] border border-line bg-ink-2 p-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">{card.eyebrow}</p>
              <h3 className="mt-4 font-sans text-2xl font-semibold tracking-[-0.04em]">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
              <span className="mt-6 text-sm font-semibold text-mark">{card.cta} →</span>
            </Link>
          ))}
          <div className="lg:col-span-3" data-motion>
            <InvestorStreams />
          </div>
        </div>
      </section>

      <Section id="contact" index="05" eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead}>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <ContactCta className="inline-flex h-12 w-fit items-center rounded-full bg-mark px-6 text-sm font-semibold text-mark-ink">
            {isRu ? "Открыть чат с ассистентом" : "Open chat with the assistant"} →
          </ContactCta>
          <aside className="rounded-[24px] border border-line bg-ink-2 p-6 text-sm text-muted">
            <p className="font-sans text-xl font-semibold text-paper">AI MARK</p>
            <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-mark">Venture and Marketing</p>
            <p className="mt-2">{site.email}</p>
          </aside>
        </div>
        <div id="inquiry" className="mt-10 scroll-mt-24">
          <LeadInquiry contact={t.contact} locale={locale} framed={false} compact />
        </div>
      </Section>
    </>
  );
}
