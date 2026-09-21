import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import { productPagePath, productsHubPath } from "@/lib/products";
import { type Locale } from "@/lib/site";
import { ProductUI, type ProductVariant } from "@/components/ui/ProductUI";
export function AIProductsShowcase({ locale }: { locale: Locale }) {
  const isRu = locale === "ru";

  const productsList = [
    {
      id: "aime" as const,
      badge: isRu ? "Автономный SMM 24/7" : "Autonomous Meta SMM",
      name: "AI Marketing Employee",
      tagline: isRu
        ? "AI-маркетолог вместо SMM-менеджера · Не шедулер"
        : "AI Marketer replacing manual SMM · Not a scheduler",
      value: isRu
        ? "Исследует нишу и конкурентов, формирует контент-планы, пишет тексты, генерирует визуалы и раскадровки для Reels, запрашивает аппрув в Telegram и автоматически публикует в Instagram, Facebook и Threads через официальный Meta Graph API."
        : "Autonomous marketing employee: conducts competitor research, creates content calendars, writes posts, generates visuals/Reels storyboards, requests Telegram approval, and publishes via Meta Graph API.",
      channels: ["Instagram", "Facebook", "Threads", "Telegram (Approval)"],
      pricing: isRu ? "От $199 / месяц (без платы за подключение)" : "From $199 / mo (No setup fee)",
      mock: "aime" as ProductVariant,
      highlights: [
        isRu ? "Согласование постов в 1 клик в Telegram" : "1-click Telegram approval workflow",
        isRu ? "Раскадровки и сценарии для Reels" : "Reels scripts and visual storyboards",
        isRu ? "Глубокая аналитика и самообучение" : "Analytics & conversion self-learning loop",
      ],
    },
    {
      id: "assistant" as const,
      badge: isRu ? "Мультиканальный инбокс продаж" : "Omnichannel Sales AI",
      name: "AI Business Assistant",
      tagline: isRu
        ? "Один AI-ассистент для всех мессенджеров + CRM"
        : "Unified AI Assistant across messengers + CRM",
      value: isRu
        ? "Отвечает клиентам 24/7 в WhatsApp, Telegram, Instagram Direct, Messenger и чате на сайте. Знает каталог и цены, квалифицирует лидов, передаёт диалог менеджеру в один клик и синхронизирует переписку с CRM."
        : "Responds to inquiries 24/7 across WhatsApp, Telegram, Instagram Direct, Messenger, and webchat. Trained on your catalog and pricing, qualifies leads, and syncs conversations directly with your CRM.",
      channels: ["WhatsApp Cloud API", "Telegram", "Instagram Direct", "Messenger", "Webchat"],
      pricing: isRu ? "Entry $149/мес · Standard $249/мес" : "Entry $149/mo · Standard $249/mo",
      mock: "assistant" as ProductVariant,
      highlights: [
        isRu ? "Единый инбокс для всех 5 каналов" : "Unified shared inbox for all 5 channels",
        isRu ? "Мгновенная передача диалога менеджеру" : "Instant 1-click human operator handoff",
        isRu ? "Коннекторы к Bitrix24, Kommo, HubSpot" : "Connectors to Bitrix24, Kommo, HubSpot",
      ],
    },
    {
      id: "showroom" as const,
      badge: isRu ? "Расчётный движок КП и спецификаций" : "Commercial Spec & Quoting Engine",
      name: "Showroom AI",
      tagline: isRu
        ? "От сложного запроса до точной спецификации и PDF-предложения"
        : "From customer inquiry to verified spec & ready PDF quote",
      value: isRu
        ? "Конфигурируемая платформа для бизнеса со сложными расчётами: мебель, автобизнес, стройка, ритейл, недвижимость и услуги. Считывает запрос в свободной форме, применяет ваши формулы и генерирует готовое КП."
        : "Configurable AI engine for complex commercial proposals: automotive, construction, real estate, furniture, retail, and services. Converts natural inquiries into deterministic specifications and ready PDF quotes.",
      channels: ["Web", "API Gateway", "PDF Engine", "CRM Sync"],
      pricing: isRu
        ? "Self-serve $0 · MRR от $199/мес (или DFY-сетап ~$300)"
        : "Self-serve $0 · MRR from $199/mo (or ~$300 DFY setup)",
      mock: "showroom" as ProductVariant,
      highlights: [
        isRu ? "Адаптация под 5 ключевых отраслей" : "Tailored across 5 major industry sectors",
        isRu ? "Детерминированные расчёты без галлюцинаций" : "Deterministic calculations without hallucinations",
        isRu ? "Генерация профессиональных PDF-офферов" : "Automated PDF proposal and invoice generation",
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-3">
        {productsList.map((product) => (
          <div
            key={product.id}
            className="flex flex-col rounded-2xl border border-line bg-ink-2 p-6 sm:p-7 shadow-sm transition-all hover:border-line-strong hover:shadow-lg"
          >
            {/* Top Bar with Badge */}
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-mark/20 bg-mark/5 px-2.5 py-1 font-mono text-[10px] font-semibold text-mark uppercase tracking-wider">
                {product.badge}
              </span>
              <span className="font-mono text-[10px] text-warm font-semibold uppercase">
                {isRu ? "Собственный продукт" : "Proprietary Product"}
              </span>
            </div>

            {/* Product UI mockup */}
            <div className="mt-5" data-reveal="scale">
              <ProductUI variant={product.mock} ratio="aspect-[16/11]" />
            </div>

            {/* Product Meta */}
            <div className="mt-5 flex-1 flex flex-col">
              <h3 className="font-display text-xl font-semibold text-paper leading-snug">
                {product.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-warm">{product.tagline}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted flex-1">
                {product.value}
              </p>

              {/* Highlights */}
              <ul className="mt-4 space-y-1.5 border-t border-line/60 pt-3 text-[11px] text-paper/85">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-mark font-bold">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Channels Supported */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {product.channels.map((ch, i) => (
                  <span
                    key={i}
                    className="rounded bg-ink-3 px-2 py-0.5 font-mono text-[10px] text-muted border border-line/50"
                  >
                    {ch}
                  </span>
                ))}
              </div>

              {/* Price Tag & CTA */}
              <div className="mt-5 border-t border-line pt-4">
                <p className="font-mono text-xs font-semibold text-paper">{product.pricing}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={productPagePath(locale, product.id)}
                    className="flex-1 text-center rounded-full bg-mark px-4 py-2 text-xs font-semibold text-mark-ink shadow hover:bg-mark-light transition-all"
                  >
                    {isRu ? "Открыть продукт" : "Product Details"} →
                  </Link>
                  <ContactCta className="rounded-full border border-line bg-ink-3/60 px-3.5 py-2 text-xs font-medium text-paper hover:bg-ink-3 transition-all">
                    {isRu ? "Подключить" : "Install"}
                  </ContactCta>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Products Hub Link Banner */}
      <div className="rounded-xl border border-line bg-ink-3/40 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="font-display text-sm font-semibold text-paper">
            {isRu
              ? "Все продукты функционируют как единая экосистема AI Mark"
              : "All products operate as an integrated AI Mark ecosystem"}
          </p>
          <p className="text-xs text-muted">
            {isRu
              ? "Можно подключить отдельный продукт или развернуть комплексный стек под ключ."
              : "Deploy single products individually or activate our end-to-end proprietary software stack."}
          </p>
        </div>
        <Link
          href={productsHubPath(locale)}
          className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-mark hover:underline whitespace-nowrap"
        >
          {isRu ? "Перейти в каталог продуктов" : "View Products Hub"} →
        </Link>
      </div>
    </div>
  );
}
