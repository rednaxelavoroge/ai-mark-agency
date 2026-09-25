import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import { BuyLink } from "@/components/BuyLink";
import { productPagePath, productsHubPath } from "@/lib/products";
import { type Locale } from "@/lib/site";
import { ProductUI, type ProductVariant } from "@/components/ui/ProductUI";
export function AIProductsShowcase({ locale }: { locale: Locale }) {
  const isRu = locale === "ru";

  const productsList = [
    {
      id: "aime" as const,
      badge: isRu ? "Маркетинговый цикл" : "Marketing cycle",
      name: "AI Marketing Employee",
      tagline: isRu
        ? "Исследование → стратегия → контент → апрув → публикация → аналитика → оптимизация"
        : "Research → Strategy → Content → Approval → Publication → Analytics → Optimization",
      value: isRu
        ? "Ведёт маркетинговый цикл и публикует только после вашего подтверждения в Telegram. Это не замена отдела и не пустой планировщик постов."
        : "Runs the marketing cycle and publishes only after you approve in Telegram. It does not replace a department, and it is not an empty post scheduler.",
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
      badge: isRu ? "Ответы и квалификация" : "Answers and qualification",
      name: "AI Business Assistant",
      tagline: isRu
        ? "Ответ → квалификация → передача человеку"
        : "Answers → Qualification → Human Handoff",
      value: isRu
        ? "Клиент пишет — AI отвечает по базе знаний, квалифицирует обращение и передаёт человеку. Цену и коммерческое предложение считает Showroom.pro."
        : "The customer writes. AI answers from the knowledge base, qualifies the request, and hands it to a person. Showroom.pro calculates the price and prepares the proposal.",
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
      badge: isRu ? "AI-продавец" : "AI Sales Agent",
      name: "Showroom.pro",
      tagline: isRu
        ? "Понимание → подбор → расчёт → коммерческое предложение → менеджер"
        : "Understanding → Selection → Calculation → Commercial Proposal → Manager",
      value: isRu
        ? "Клиент пишет — AI понимает потребность, подбирает, считает по вашим правилам и готовит коммерческое предложение для менеджера. Это не замена отдела продаж."
        : "The customer writes. AI understands the need, matches a solution, calculates by your rules, and prepares a commercial proposal for the manager. It does not replace the sales team.",
      channels: ["Web", "API Gateway", "PDF Engine", "CRM Sync"],
      pricing: isRu
        ? "Self-serve $0 · MRR от $199/мес (или DFY-сетап ~$300)"
        : "Self-serve $0 · MRR from $199/mo (or ~$300 DFY setup)",
      mock: "showroom" as ProductVariant,
      highlights: [
        isRu ? "Отраслевые правила: мебель, авто, стройка, недвижимость, ритейл, услуги" : "Industry rules: furniture, auto, construction, real estate, retail, services",
        isRu ? "Расчёт по вашим формулам, отдельно от текста диалога" : "Calculation follows your formulas, separate from the dialogue",
        isRu ? "Генерация профессиональных PDF-офферов" : "Automated PDF proposal and invoice generation",
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <p className="max-w-3xl text-sm leading-relaxed text-paper/90">
        {isRu
          ? "Ассистент отвечает и квалифицирует. Showroom продаёт и готовит сделку."
          : "The assistant answers and qualifies. Showroom sells and prepares the deal."}
      </p>
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
                {/* This card summarises a product family with several published
                    plans, so it links to the payment page without preselecting a
                    SKU: the buyer picks the exact plan (and sees its price) on
                    /pay, which is the published price list. */}
                <BuyLink
                  locale={locale}
                  label={isRu ? "Оплатить USDT / USDC" : "Pay USDT / USDC"}
                  className="mt-2 block w-full rounded-full border border-line bg-ink-3/40 px-4 py-2 text-center text-xs font-medium text-paper transition-colors hover:border-line-strong hover:bg-ink-3"
                />
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
              ? "Все продукты функционируют как единая экосистема AI MARK"
              : "All products operate as an integrated AI MARK ecosystem"}
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
