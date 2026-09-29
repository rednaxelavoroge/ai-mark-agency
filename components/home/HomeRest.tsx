import Link from "next/link";
import { LeadInquiry } from "@/components/LeadInquiry";
import { Section } from "@/components/Section";
import type { Copy } from "@/content/copy";
import { brief } from "@/lib/brief";
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
  name: string;
  tag: string;
  price: string;
  desc: string;
  highlights: string[];
  href: string;
  externalUrl: string | null;
};

/**
 * Home follows the Manus sample section order: three entry points, three
 * product cards, team-vs-subscription, eight-stage path, contact, then
 * partner / investor / pricing cards. Long UI mocks stay on the subpages.
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
  const entries = isRu
    ? [
        { href: "/products", kicker: "01 / AI-продукты", title: "Подключить готовый AI-инструмент.", body: "AI Marketing Employee, AI Business Assistant и SHOWROOM AI решают разные задачи." },
        { href: "/digital-production", kicker: "02 / Услуги и производство", title: "Привлечь команду под задачу.", body: "Маркетинговое сопровождение или заказная цифровая разработка — под конкретный объём работ." },
        { href: "/how-it-works", kicker: "03 / Создание бизнеса", title: "Проверить идею до разработки.", body: "Исследовать спрос, сформировать бизнес-модель, создать продукт и продумать выход к клиентам." },
      ]
    : locale === "en"
      ? [
          { href: "/products", kicker: "01 / AI products", title: "Put a ready AI tool to work.", body: "AI Marketing Employee, AI Business Assistant and SHOWROOM AI each handle a different part of the work." },
          { href: "/digital-production", kicker: "02 / Services & production", title: "Bring in a team for a defined job.", body: "Marketing support or a custom digital build, shaped around the task rather than a packaged SKU." },
          { href: "/how-it-works", kicker: "03 / Business creation", title: "Test the idea before building.", body: "Research demand, form a business model, create the product and develop a route to market." },
        ]
      : [
          { href: "/products", kicker: "01", title: brief(t.products.hubTitle), body: brief(t.products.hubLead) },
          { href: "/digital-production", kicker: "02", title: brief(t.production.title), body: brief(t.production.lead) },
          { href: "/how-it-works", kicker: "03", title: brief(t.creation.title), body: brief(t.creation.lead) },
        ];
  const tailOrder = ["/partners", "/investors", "/pricing"];
  const tail = tailOrder
    .map((href) => hubModules.find((m) => m.href === href))
    .filter((m): m is HubModule => Boolean(m));

  return (
    <>
      <section className="border-b border-line" aria-label={t.pipeline.title}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 text-[13px] text-muted sm:px-6">
          <span className="font-semibold text-paper">
            {isRu ? "От первой точки — к целостному бизнесу" : locale === "en" ? "From one starting point to a joined-up business" : brief(t.pipeline.eyebrow)}
          </span>
          {(isRu
            ? ["Исследование", "Продукт", "AI-инфраструктура", "Маркетинг и продажи"]
            : locale === "en"
              ? ["Research", "Product", "AI infrastructure", "Marketing & sales"]
              : t.pipeline.steps.slice(0, 4)
          ).map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
      </section>

      <Section
        id="start"
        index="01"
        tight
        eyebrow={isRu ? "Выберите текущую задачу" : locale === "en" ? "Choose the work in front of you" : t.pillars.eyebrow}
        title={isRu ? "Одна команда. Три точки входа." : locale === "en" ? "One team. Three ways in." : brief(t.pillars.title)}
        lead={
          isRu
            ? "Начните с того, что нужно сейчас: готовый AI-продукт, работа команды над конкретной задачей или путь от идеи до работающего бизнеса."
            : locale === "en"
              ? "Start with the immediate need: a ready AI product, focused delivery by a team, or the path from an idea to a working business."
              : brief(t.hero.extra)
        }
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {entries.map((entry) => (
            <Link
              key={entry.href}
              href={navHref(locale, entry.href)}
              className="flex flex-col rounded-[24px] border border-line bg-ink-2 p-6"
            >
              <span className="font-mono text-xs font-semibold text-muted">{entry.kicker}</span>
              <h3 className="mt-4 font-sans text-xl font-semibold tracking-[-0.04em]">{entry.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{entry.body}</p>
              <span className="mt-6 text-sm font-semibold text-mark">→</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        id="products"
        index="02"
        tight
        eyebrow={isRu ? "01 / Готовые AI-продукты" : locale === "en" ? "01 / Ready AI products" : t.tech.eyebrow}
        title={isRu ? "Разные инструменты для разных задач." : locale === "en" ? "Different tools for different jobs." : brief(t.tech.title)}
        lead={
          isRu
            ? "Подписка даёт доступ к продукту и отличается от ретейнера маркетинговой команды и заказного цифрового проекта."
            : locale === "en"
              ? "Product access is a subscription. It is separate from a marketing-team retainer or a custom production project."
              : brief(t.products.lead)
        }
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article key={product.id} className="flex flex-col rounded-[24px] border border-line bg-ink-2 p-5">
              <div className="flex items-center justify-between gap-3 text-[13px]">
                <span className="font-semibold text-mark">{product.tag}</span>
                <span className="font-semibold">{product.price}</span>
              </div>
              <h3 className="mt-3 font-sans text-xl font-semibold tracking-[-0.04em]">{product.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{brief(product.desc)}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {product.highlights.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-mark" aria-hidden>
                      ↗
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5 text-sm font-semibold">
                <Link href={product.href} className="text-mark">
                  {isRu ? "Подробнее" : "Details"} →
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
      </Section>

      <section className="border-t border-line bg-[#14291f] text-[#f4f6ee]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#d5e0d4]">
            {isRu ? "02 / Команда, разработка и технологии" : locale === "en" ? "02 / Team, production and technology" : t.commercial.eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl font-sans text-3xl font-semibold tracking-[-0.05em]">
            {isRu ? "Работа команды — не то же самое, что подписка." : locale === "en" ? "A team engagement is not a subscription." : brief(t.commercial.title)}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#d3ddd2]">
            {isRu
              ? "Выберите регулярную поддержку маркетинга, цифровой проект в согласованном объёме или сочетание форматов."
              : locale === "en"
                ? "Choose ongoing marketing support, a scoped digital project, or a combination. AI products connect when needed."
                : brief(t.commercial.lead)}
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[24px] border border-white/15 p-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#d5e0d4]">{isRu ? "Ретейнер / регулярная работа" : "Retainer / ongoing work"}</p>
              <h3 className="mt-2 font-sans text-2xl font-semibold">{isRu ? "AI-маркетинг и развитие" : locale === "en" ? "AI marketing and growth" : brief(t.commercial.tiers[0]?.name ?? t.commercial.eyebrow)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#d3ddd2]">
                {isRu
                  ? "Работа команды по стратегии, маркетингу, продажам и автоматизации. Объём согласуется с задачей."
                  : locale === "en"
                    ? "Team work on strategy, marketing, sales and automation. Scope follows the task."
                    : brief(t.commercial.tiers[0]?.body ?? "")}
              </p>
              <Link href={navHref(locale, "/pricing")} className="mt-6 inline-flex text-sm font-semibold text-[#d4f27e]">
                {t.commercial.retainerCta} →
              </Link>
            </article>
            <article className="rounded-[24px] border border-white/15 p-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#d5e0d4]">{isRu ? "Проект / заказная разработка" : "Project / custom build"}</p>
              <h3 className="mt-2 font-sans text-2xl font-semibold">{isRu ? "Digital production и AI engineering" : locale === "en" ? "Digital production and AI engineering" : brief(t.production.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#d3ddd2]">
                {isRu
                  ? "Сайты, приложения, кабинеты, интеграции, автоматизация и custom AI — под конкретное задание."
                  : locale === "en"
                    ? "Sites, apps, cabinets, integrations, automation and custom AI for a defined brief."
                    : brief(t.production.lead)}
              </p>
              <Link href={navHref(locale, "/digital-production")} className="mt-6 inline-flex text-sm font-semibold text-[#d4f27e]">
                {isRu ? "О цифровом производстве" : "About digital production"} →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <Section
        id="stages"
        index="03"
        tight
        eyebrow={isRu ? "03 / Создание бизнеса" : locale === "en" ? "03 / Business creation" : t.creation.eyebrow}
        title={isRu ? "Сначала проверить рынок. Потом строить систему." : locale === "en" ? "Test the market before building the system." : brief(t.creation.title)}
        lead={
          isRu
            ? "Можно начать с идеи, действующего бизнеса или капитала. Исследование и экономика предшествуют предположениям о масштабировании."
            : locale === "en"
              ? "Start from an idea, an operating business, or capital. Research and economics come before any claim about scale."
              : brief(t.creation.lead)
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(isRu
            ? [
                ["Идея или капитал", "Определяем исходную точку и вопрос для проверки."],
                ["Исследование рынка", "Изучаем спрос, конкурентов и ограничения."],
                ["Бизнес-модель", "Определяем клиента, предложение и монетизацию."],
                ["Бренд", "Формируем позиционирование и голос бренда."],
                ["Цифровой продукт", "Создаём операционную основу бизнеса."],
                ["AI-инфраструктура", "Встраиваем AI в полезные процессы."],
                ["Маркетинг и продажи", "Выводим предложение к клиентам."],
                ["Рост", "Развиваем работающую модель."],
              ]
            : locale === "en"
              ? [
                  ["Idea or capital", "Name the starting point and the question to test."],
                  ["Market research", "Study demand, competitors and constraints."],
                  ["Business model", "Define the customer, offer and monetization."],
                  ["Brand", "Set positioning and the brand voice."],
                  ["Digital product", "Build the operating base of the business."],
                  ["AI infrastructure", "Put AI into the work that repeats."],
                  ["Marketing and sales", "Take the offer to customers."],
                  ["Growth", "Develop the model that is already working."],
                ]
              : t.creation.steps.map((step) => [step.title, brief(step.body)])
          ).map(([title, body], i) => (
            <article key={title} className="rounded-2xl border border-line bg-ink-2 p-4">
              <span className="font-mono text-xs text-mark">{String(i).padStart(2, "0")}</span>
              <h3 className="mt-2 text-base font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-4 rounded-[24px] border border-line bg-ink-2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-sans text-xl font-semibold">
              {isRu ? "Проверяйте спрос и экономику до обещаний о результате." : locale === "en" ? "Test demand and economics before promising a result." : brief(t.why.title)}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {isRu ? "В публичном описании процесса не обещается гарантированная прибыль или результат." : locale === "en" ? "The public process does not promise profit or a guaranteed result." : brief(t.why.lead)}
            </p>
          </div>
          <Link href={navHref(locale, "/how-it-works")} className="inline-flex min-h-11 items-center text-sm font-semibold text-mark">
            {isRu ? "Все этапы" : "All stages"} →
          </Link>
        </div>
      </Section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {(isRu
            ? [
                ["Сначала исследование", "Начните с рынка, клиента и экономики, а не с заранее выбранного решения."],
                ["AI помогает людям", "Автоматизируйте полезную работу, сохраняя решения и согласования за людьми."],
                ["Подходящий формат", "Подписка, сервис команды и заказная разработка остаются разными моделями."],
              ]
            : locale === "en"
              ? [
                  ["Research first", "Start from the market, the customer and the economics, not from a pre-chosen solution."],
                  ["AI helps people", "Automate useful work and keep decisions and approvals with people."],
                  ["The fitting format", "A subscription, a team service and a custom build stay different models."],
                ]
              : t.pillars.items.slice(0, 3).map((item) => [item.title, brief(item.body)])
          ).map(([title, body]) => (
            <div key={title}>
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <Section
        id="contact"
        index="04"
        tight
        eyebrow={isRu ? "Следующий шаг" : locale === "en" ? "Next step" : t.contact.eyebrow}
        title={isRu ? "Расскажите, с чего вы начинаете." : locale === "en" ? "Tell us where you are starting." : brief(t.contact.title)}
        lead={
          isRu
            ? "Идея, действующий бизнес, маркетинг или цифровой продукт — начните с задачи, которую нужно решить."
            : locale === "en"
              ? "An idea, a live business, marketing, or a digital product — start from the job that needs doing."
              : brief(t.contact.lead)
        }
      >
        <a className="inline-flex min-h-11 items-center text-sm font-semibold text-mark" href={`mailto:${site.email}`}>
          {site.email} →
        </a>
        <details id="inquiry" className="mt-6 scroll-mt-24 rounded-[24px] border border-line bg-ink-2">
          <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold">
            {t.contact.formCta}
          </summary>
          <div className="px-2 pb-2">
            <LeadInquiry contact={t.contact} locale={locale} framed={false} compact />
          </div>
        </details>
      </Section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6 lg:grid-cols-3">
          {tail.map((card) => (
            <Link key={card.href} href={navHref(locale, card.href)} className="rounded-[24px] border border-line bg-ink-2 p-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">{card.tag}</p>
              <h3 className="mt-3 font-sans text-xl font-semibold">{brief(card.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{brief(card.desc)}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-mark">{card.cta} →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
