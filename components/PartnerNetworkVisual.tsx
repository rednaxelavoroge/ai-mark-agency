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
    <div className="space-y-6">
      {/* Commission mechanic banner */}
      <div className="rounded-2xl border border-line bg-ink-2 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-line pb-4">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-warm">
              {isRu ? "Как устроена комиссия" : "How commission works"}
            </span>
            <p className="mt-1 font-display text-sm sm:text-base font-semibold text-paper">
              {isRu
                ? "5 уровней партнёрской сети и прямая комиссия с клиентских оплат"
                : "5-level partner distribution with commission on client revenue"}
            </p>
          </div>
          <Link
            href={localePath(locale, "/partners")}
            className="inline-flex items-center gap-1 text-xs font-semibold text-mark hover:underline self-start sm:self-center"
          >
            {isRu ? "Все ставки и правила →" : "All rates and terms →"}
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {mechanic.map((step, i) => (
            <Fragment key={step}>
              {i > 0 ? (
                <span aria-hidden className="font-mono text-xs text-warm">
                  →
                </span>
              ) : null}
              <span className="rounded-full border border-line bg-ink-3/50 px-3 py-1 text-xs font-mono text-paper">
                {step}
              </span>
            </Fragment>
          ))}
        </div>
      </div>

      {/* 4 Partner Track Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {partnerTypes.map((p, pi) => (
          <div
            key={p.id}
            data-reveal
            style={{ "--reveal-delay": `${pi * 70}ms` } as CSSProperties}
            className="flex flex-col justify-between rounded-xl border border-line bg-ink-2 p-5 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-ink-3 px-2 py-0.5 font-mono text-[10px] text-warm font-medium">
                  {p.tag}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-mark" />
              </div>

              <h4 className="mt-3 font-display text-sm sm:text-base font-semibold text-paper leading-snug">
                {p.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {p.desc}
              </p>
            </div>

            <div className="mt-4 border-t border-line/60 pt-3">
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
      <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-3/40 p-6 sm:p-7 shadow-sm">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(198,214,139,0.22),transparent_70%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mark/40 to-transparent"
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 max-w-2xl flex-1">
            <h3 className="font-display text-base font-semibold leading-snug text-paper sm:text-lg">
              {isRu ? "Партнёрская программа AI MARK" : "The AI MARK Partner Program"}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
              {isRu
                ? "Продавайте AI-продукты и цифровые решения AI MARK и получайте комиссию с квалифицированных клиентских продаж. Стройте собственную партнёрскую сеть."
                : "Sell AI MARK products and digital solutions, and earn commission on qualified customer sales. Build your own partner network and develop your market together with AI MARK."}
            </p>
          </div>
          <Link
            href={localePath(locale, "/partners")}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-mark px-5 py-3 text-xs font-semibold text-mark-ink shadow transition-all hover:bg-mark-light hover:shadow-md sm:self-center"
          >
            {isRu ? "Подробнее о партнёрской программе" : "More about partner program"}
            <span className="btn-arrow" aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
