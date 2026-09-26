import { Fragment, type CSSProperties } from "react";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/site";
export function PartnerNetworkVisual({ locale }: { locale: Locale }) {
  const isRu = locale === "ru";

  const partnerTypes = isRu
    ? [
        {
          id: "regional",
          title: "Региональные партнёры",
          tag: "Локализация",
          desc: "Развивают присутствие AI MARK на локальных рынках, адаптируют продукты под региональные требования и сопровождают местных клиентов.",
          roles: ["Лидогенерация на месте", "Локальные договоры", "Сопровождение внедрений"],
        },
        {
          id: "industry",
          title: "Отраслевые партнёры",
          tag: "Вертикали",
          desc: "Эксперты в конкретных индустриях (мебель, автодилеры, строительство, недвижимость), внедряющие SHOWROOM AI — AI-продавца и ассистентов в свои отраслевые кластеры.",
          roles: ["Отраслевые каталоги", "Внедрение в нишу", "Интеграции с ERP/CRM"],
        },
        {
          id: "agency",
          title: "Агентские партнёры",
          tag: "Белая метка / Инфраструктура",
          desc: "Маркетинговые и консалтинговые агентства, подключающие AIME и AI Business Assistant своим клиентам для повышения маржинальности.",
          roles: ["SaaS на клиента", "Собственные услуги", "Высокая рентабельность"],
        },
        {
          id: "referral",
          title: "Реферальные партнёры",
          tag: "Интродукция",
          desc: "Бизнес-консультанты, интеграторы и брокеры, рекомендующие комплексные решения AI MARK своим корпоративным клиентам.",
          roles: ["Прямое интро", "Комиссия за сделку", "Совместные проекты"],
        },
      ]
    : [
        {
          id: "regional",
          title: "Regional Partners",
          tag: "Territory",
          desc: "Expanding AI MARK presence in specific geographic jurisdictions, onboarding local enterprises and managing regional accounts.",
          roles: ["Local business development", "Territory agreements", "Customer success"],
        },
        {
          id: "industry",
          title: "Industry Partners",
          tag: "Verticals",
          desc: "Domain specialists (automotive, construction, retail, real estate) embedding SHOWROOM AI / AI Sales Agent and sales tools into their industry networks.",
          roles: ["Domain-specific catalogs", "Vertical deployment", "Specialized ERP flows"],
        },
        {
          id: "agency",
          title: "Agency Partners",
          tag: "Infrastructure",
          desc: "Digital and marketing agencies licensing AIME and AI Business Assistant to scale client deliverables without headcount expansion.",
          roles: ["Multi-client licensing", "Turnkey operations", "High gross margins"],
        },
        {
          id: "referral",
          title: "Referral & Strategic Introducers",
          tag: "Network",
          desc: "Enterprise consultants, software advisors, and venture scouts connecting qualified corporate opportunities to AI MARK.",
          roles: ["Executive introductions", "Success-based commission", "Joint initiatives"],
        },
      ];

  const networkNodes = isRu
    ? [
        { label: "Клиент / Бизнес", sub: "Входной запрос", type: "input" },
        { label: "Партнёрский контур", sub: "Локальный контакт & онбординг", type: "node" },
        { label: "AI MARK Core", sub: "Продукты, AI, продакшн", type: "core" },
        { label: "Результат & Рост", sub: "Запущенный бизнес / выручка", type: "output" },
      ]
    : [
        { label: "Client Enterprise", sub: "Opportunity initiation", type: "input" },
        { label: "Partner Node", sub: "Territory / Domain interface", type: "node" },
        { label: "AI MARK Platform", sub: "Products, AI core, production", type: "core" },
        { label: "Operating Growth", sub: "Scaled revenue & ops", type: "output" },
      ];

  const mechanic = isRu
    ? ["Личная продажа", "Продажи команды", "До 5 уровней", "Комиссия"]
    : ["Personal sale", "Team sales", "Up to 5 levels", "Commission"];

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-warm">
          {isRu ? "Как устроена комиссия" : "How commission works"}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {mechanic.map((step, i) => (
            <Fragment key={step}>
              {i > 0 ? (
                <span aria-hidden className="font-mono text-xs text-warm">
                  →
                </span>
              ) : null}
              <span className="rounded-full border border-line bg-ink-3/50 px-3 py-1.5 text-sm text-paper">
                {step}
              </span>
            </Fragment>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {isRu
            ? "Сначала личная продажа, затем продажи команды, до пяти уровней, и комиссия с оплаченной суммы. Типы партнёров и ставки — ниже и на странице программы."
            : "A personal sale comes first, then team sales, up to five levels, and commission on the amount the customer paid. Partner types and rates come after this, on the programme page."}
        </p>
        <Link
          href={localePath(locale, "/partners")}
          className="mt-5 inline-flex text-sm font-semibold text-mark hover:underline"
        >
          {isRu ? "Как устроена комиссия →" : "How the commission works →"}
        </Link>
      </div>

      {/* Network Flow Nodes */}
      <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-mark" />
            <span className="font-mono text-xs font-semibold text-paper uppercase tracking-wider">
              {isRu ? "Архитектура международного масштабирования" : "International Distribution Topology"}
            </span>
          </div>
          <span className="font-mono text-[10px] text-warm uppercase">
            {isRu ? "Модель сети" : "Network Topology"}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {networkNodes.map((n, i) => (
            <div
              key={i}
              data-reveal="scale"
              style={{ "--reveal-delay": `${i * 110}ms` } as CSSProperties}
              className={`relative flex flex-col justify-between rounded-xl border p-4 transition-all hover:-translate-y-1 hover:shadow-md ${
                n.type === "core"
                  ? "border-mark/40 bg-mark/5"
                  : "border-line bg-ink-3/30"
              }`}
            >
              <span
                aria-hidden
                className="loop-pulse absolute -right-2 -top-2 hidden h-4 w-4 rounded-full lg:block"
                style={{ "--i": i } as CSSProperties}
              />
              <div>
                <span className="font-mono text-[10px] text-warm font-semibold">
                  STAGE 0{i + 1}
                </span>
                <h4 className="mt-1 font-display text-sm font-semibold text-paper">
                  {n.label}
                </h4>
              </div>
              <p className="mt-2 text-xs text-muted font-mono">{n.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Partner Track Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {partnerTypes.map((p, pi) => (
          <div
            key={p.id}
            data-reveal
            style={{ "--reveal-delay": `${pi * 90}ms` } as CSSProperties}
            className="flex flex-col rounded-xl border border-line bg-ink-2 p-6 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="rounded bg-ink-3 px-2 py-0.5 font-mono text-[10px] text-warm font-medium">
                {p.tag}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-mark" />
            </div>

            <h4 className="mt-4 font-display text-base font-semibold text-paper leading-snug">
              {p.title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted flex-1">
              {p.desc}
            </p>

            <div className="mt-5 border-t border-line/60 pt-3">
              <p className="font-mono text-[10px] text-warm uppercase tracking-wider mb-2">
                {isRu ? "Формат участия:" : "Core Focus:"}
              </p>
              <ul className="space-y-1 text-[11px] text-paper/85">
                {p.roles.map((r, rIdx) => (
                  <li key={rIdx} className="flex items-center gap-1.5">
                    <span className="text-mark font-bold">·</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Partner Program Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-3/40 p-6 sm:p-8 lg:p-10 shadow-sm">
        {/* Warm glow + hairline accent keep the block from reading as a plain card. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(198,214,139,0.22),transparent_70%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mark/40 to-transparent"
        />
        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="min-w-0 max-w-3xl flex-1">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-warm">
              {isRu ? "Партнёрская программа" : "Partner Program"}
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-paper sm:text-xl">
              {isRu ? "Партнёрская программа AI MARK" : "The AI MARK Partner Program"}
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
              {isRu
                ? "Продавайте AI-продукты и цифровые решения AI MARK и получайте комиссию с квалифицированных клиентских продаж. Стройте собственную партнёрскую сеть и развивайте свой рынок вместе с AI MARK."
                : "Sell AI MARK products and digital solutions, and earn commission on qualified customer sales. Build your own partner network and develop your market together with AI MARK."}
            </p>
          </div>
          <Link
            href={localePath(locale, "/partners")}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start whitespace-nowrap rounded-full bg-mark px-6 py-3.5 text-sm font-semibold text-mark-ink shadow transition-all hover:-translate-y-0.5 hover:bg-mark-light hover:shadow-md lg:self-center"
          >
            {isRu ? "Подробнее о партнёрстве" : "More about the partnership"}
            <span className="btn-arrow" aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
