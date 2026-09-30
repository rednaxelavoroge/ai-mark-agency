"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import { productPagePath, productsHubPath } from "@/lib/products";
import { type Locale } from "@/lib/site";
import { ProductUI, type ProductVariant } from "@/components/ui/ProductUI";
import { getPublicChromeCopy } from "@/content/sections";

export function AIProductsShowcase({ locale }: { locale: Locale }) {
  const ui = getPublicChromeCopy(locale).aiProductsShowcase;
  const pp = getPublicChromeCopy(locale).productPage;
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const productsList = [
    {
      id: "aime" as const,
      badge: locale === "ru" ? "Маркетинговый цикл" : "Marketing cycle",
      shortName: "AIME",
      name: "AI Marketing Employee",
      tagline: locale === "ru"
        ? "Исследование → стратегия → контент → апрув → публикация → аналитика → оптимизация"
        : "Research → Strategy → Content → Approval → Publication → Analytics → Optimization",
      value: locale === "ru"
        ? "Ведёт маркетинговый цикл и публикует только после вашего подтверждения в Telegram. Это не замена отдела и не пустой планировщик постов."
        : "Runs the marketing cycle and publishes only after you approve in Telegram. It does not replace a department, and it is not an empty post scheduler.",
      channels: ["Instagram", "Facebook", "Threads", "Telegram (Approval)"],
      pricing: locale === "ru" ? "От $199 / месяц (без платы за подключение)" : "From $199 / mo (No setup fee)",
      mock: "aime" as ProductVariant,
      highlights: [
        locale === "ru" ? "Согласование постов в 1 клик в Telegram" : "1-click Telegram approval workflow",
        locale === "ru" ? "Раскадровки и сценарии для Reels" : "Reels scripts and visual storyboards",
        locale === "ru" ? "Глубокая аналитика и самообучение" : "Analytics & conversion self-learning loop",
      ],
      externalUrl: null,
    },
    {
      id: "assistant" as const,
      badge: locale === "ru" ? "Ответы и квалификация" : "Answers and qualification",
      shortName: "AI Assistant",
      name: "AI Business Assistant",
      tagline: locale === "ru" ? "Ответ → квалификация → передача человеку" : "Answers → Qualification → Human Handoff",
      value: locale === "ru"
        ? "Клиент пишет — AI отвечает по базе знаний, квалифицирует обращение и передаёт человеку. Цену и коммерческое предложение считает Showroom AI."
        : "The customer writes. AI answers from the knowledge base, qualifies the request, and hands it to a person. Showroom AI calculates the price and prepares the proposal.",
      channels: ["WhatsApp Cloud API", "Telegram", "Instagram Direct", "Messenger", "Webchat"],
      pricing: locale === "ru" ? "Entry $149/мес · Standard $249/мес" : "Entry $149/mo · Standard $249/mo",
      mock: "assistant" as ProductVariant,
      highlights: [
        locale === "ru" ? "Единый инбокс для всех 5 каналов" : "Unified shared inbox for all 5 channels",
        locale === "ru" ? "Мгновенная передача диалога менеджеру" : "Instant 1-click human operator handoff",
        locale === "ru" ? "Коннекторы к Bitrix24, Kommo, HubSpot" : "Connectors to Bitrix24, Kommo, HubSpot",
      ],
      externalUrl: null,
    },
    {
      id: "showroom" as const,
      badge: locale === "ru" ? "AI-продавец" : "AI Sales Agent",
      shortName: "Showroom AI",
      name: "Showroom AI",
      tagline: locale === "ru"
        ? "Понимание → подбор → расчёт → коммерческое предложение → менеджер"
        : "Understanding → Selection → Calculation → Commercial Proposal → Manager",
      value: locale === "ru"
        ? "Клиент пишет — AI понимает потребность, подбирает, считает по вашим правилам и готовит коммерческое предложение для менеджера. Это не замена отдела продаж."
        : "The customer writes. AI understands the need, matches a solution, calculates by your rules, and prepares a commercial proposal for the manager. It does not replace the sales team.",
      channels: ["Web", "API Gateway", "PDF Engine", "CRM Sync"],
      pricing: locale === "ru"
        ? "Self-serve $0 · MRR от $199/мес (или DFY-сетап ~$300)"
        : "Self-serve $0 · MRR from $199/mo (or ~$300 DFY setup)",
      mock: "showroom" as ProductVariant,
      highlights: [
        locale === "ru" ? "Отраслевые правила: мебель, авто, стройка, недвижимость, ритейл, услуги" : "Industry rules: furniture, auto, construction, real estate, retail, services",
        locale === "ru" ? "Расчёт по вашим формулам, отдельно от текста диалога" : "Calculation follows your formulas, separate from the dialogue",
        locale === "ru" ? "Генерация профессиональных PDF-офферов" : "Automated PDF proposal and invoice generation",
      ],
      externalUrl: "https://showroom-ai.pro",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % productsList.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, productsList.length]);

  const current = productsList[activeTab];

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveTab((prev) => (prev === 0 ? productsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveTab((prev) => (prev + 1) % productsList.length);
  };

  return (
    <div
      className="space-y-8"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-paper/90">{ui.showcaseLead ?? pp.showcaseLead}</p>
        <Link
          href={productsHubPath(locale)}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-mark hover:underline whitespace-nowrap self-start sm:self-auto"
        >
          {pp.catalogLink} →
        </Link>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {productsList.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setActiveTab(idx);
                setIsAutoPlaying(false);
              }}
              className={`group flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${
                activeTab === idx
                  ? "bg-mark text-mark-ink shadow-md"
                  : "border border-line bg-ink-2 text-muted hover:border-paper/40 hover:text-paper"
              }`}
            >
              <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
              <span>{p.shortName}</span>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase ${
                  activeTab === idx ? "bg-mark-ink/20 text-mark-ink" : "bg-ink-3 text-muted"
                }`}
              >
                {p.badge}
              </span>
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous product"
            className="grid h-8 w-8 place-items-center rounded-full border border-line bg-ink-2 text-sm text-paper hover:bg-ink-3 transition-colors"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next product"
            className="grid h-8 w-8 place-items-center rounded-full border border-line bg-ink-2 text-sm text-paper hover:bg-ink-3 transition-colors"
          >
            ›
          </button>
        </div>
      </div>

      <div className="h-[2px] w-full overflow-hidden rounded-full bg-ink-3">
        <div key={activeTab} className="cycle-fill h-full rounded-full bg-gradient-to-r from-mark to-warm" />
      </div>

      <div className="stage-enter overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-xl">
        <div className="flex items-center justify-between border-b border-line bg-ink-3/40 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-mark animate-pulse" />
            <span className="font-mono text-xs font-semibold text-paper uppercase tracking-wider">{current.name}</span>
            <span className="hidden sm:inline font-mono text-[11px] text-muted">
              {"// "}
              {current.tagline}
            </span>
          </div>
          <span className="font-mono text-[10px] text-warm uppercase tracking-wider">{pp.proprietaryProduct}</span>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <span className="inline-block rounded-full border border-mark/25 bg-mark/10 px-3 py-1 font-mono text-[11px] font-semibold text-mark uppercase tracking-wider">
                {current.badge}
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-paper leading-tight">{current.name}</h3>
              <p className="mt-1 font-mono text-xs text-warm">{current.tagline}</p>
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted">{current.value}</p>
            </div>

            <div className="space-y-2 border-t border-line/60 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted font-semibold">{pp.coreCapabilities}</p>
              <ul className="space-y-2">
                {current.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-paper/90 font-mono">
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-mark/15 text-mark font-bold text-[10px]">
                      ✓
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted font-semibold mb-2">{pp.activeIntegrations}</p>
              <div className="flex flex-wrap gap-1.5">
                {current.channels.map((ch, i) => (
                  <span key={i} className="rounded-md border border-line bg-ink-3/70 px-2.5 py-1 font-mono text-[10px] text-paper">
                    {ch}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-line pt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-paper">{current.pricing}</span>
                <span className="font-mono text-[10px] text-muted">{pp.productionReady}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href={productPagePath(locale, current.id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-mark px-5 py-2.5 text-xs font-semibold text-mark-ink shadow transition-all hover:bg-mark-light hover:shadow-md"
                >
                  <span>{pp.exploreProduct}</span>
                  <span>→</span>
                </Link>

                {current.externalUrl ? (
                  <a
                    href={current.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-warm/40 bg-warm/10 px-4 py-2.5 text-xs font-semibold text-warm hover:bg-warm/20 transition-all"
                  >
                    <span>showroom-ai.pro</span>
                    <span>↗</span>
                  </a>
                ) : null}

                <ContactCta className="rounded-full border border-line bg-ink-3/60 px-4 py-2.5 text-xs font-medium text-paper hover:bg-ink-3 transition-colors">
                  {pp.install}
                </ContactCta>
              </div>
            </div>
          </div>

          <div className="min-w-0" data-reveal="scale">
            <ProductUI variant={current.mock} ratio="h-[360px] sm:h-[400px] lg:h-[420px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
