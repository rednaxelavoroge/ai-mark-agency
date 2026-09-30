import type { CSSProperties } from "react";
import type { Locale } from "@/lib/site";

/**
 * Hero network visual for the Partner Network page.
 *
 * Code-drawn (no stock photography): AI MARK core → partners → businesses →
 * sales → markets. Motion comes from the design-system primitives in
 * `app/globals.css` (`grid-field`, `flow-dash`, `pulse-ring`) plus the global
 * reveal engine, so this stays a plain server component like the other visuals.
 *
 * The two status pills sit in a flow footer bar instead of floating over the
 * canvas: absolutely positioned pills collided with the centre-top and
 * centre-bottom nodes below ~640px.
 */

type Props = { locale: Locale };

type HeroLabels = {
  core: string;
  partner: string;
  business: string;
  market: string;
  sale: string;
  localSales: string;
  marketGrowth: string;
  realCustomer: string;
  newMarket: string;
  customerRevenue: string;
  depth: string;
  global: string;
  tagline: string;
};

const LABELS: Record<Locale, HeroLabels> = {
  en: {
    core: "AI MARK CORE",
    partner: "PARTNER",
    business: "BUSINESS",
    market: "MARKET",
    sale: "SALE",
    localSales: "Local sales",
    marketGrowth: "Market growth",
    realCustomer: "Real customer",
    newMarket: "New market",
    customerRevenue: "Customer revenue",
    depth: "5-LEVEL NETWORK",
    global: "GLOBAL / AI-NATIVE",
    tagline: "Products · AI · Delivery",
  },
  ru: {
    core: "AI MARK CORE",
    partner: "ПАРТНЁР",
    business: "БИЗНЕС",
    market: "РЫНОК",
    sale: "ПРОДАЖА",
    localSales: "Локальные продажи",
    marketGrowth: "Развитие рынка",
    realCustomer: "Реальный клиент",
    newMarket: "Новый рынок",
    customerRevenue: "Выручка клиента",
    depth: "СЕТЬ 5 УРОВНЕЙ",
    global: "ГЛОБАЛЬНО / AI-NATIVE",
    tagline: "Продукты · AI · Поставка",
  },
  es: {
    core: "AI MARK CORE",
    partner: "PARTNER",
    business: "EMPRESA",
    market: "MERCADO",
    sale: "VENTA",
    localSales: "Ventas locales",
    marketGrowth: "Crecimiento de mercado",
    realCustomer: "Cliente real",
    newMarket: "Nuevo mercado",
    customerRevenue: "Ingresos de clientes",
    depth: "RED DE 5 NIVELES",
    global: "GLOBAL / AI-NATIVE",
    tagline: "Productos · IA · Entrega",
  },
  pt: {
    core: "AI MARK CORE",
    partner: "PARCEIRO",
    business: "EMPRESA",
    market: "MERCADO",
    sale: "VENDA",
    localSales: "Vendas locais",
    marketGrowth: "Crescimento de mercado",
    realCustomer: "Cliente real",
    newMarket: "Novo mercado",
    customerRevenue: "Receita de clientes",
    depth: "REDE DE 5 NÍVEIS",
    global: "GLOBAL / AI-NATIVE",
    tagline: "Produtos · IA · Entrega",
  },
  de: {
    core: "AI MARK CORE",
    partner: "PARTNER",
    business: "UNTERNEHMEN",
    market: "MARKT",
    sale: "VERKAUF",
    localSales: "Lokale Verkäufe",
    marketGrowth: "Marktwachstum",
    realCustomer: "Echter Kunde",
    newMarket: "Neuer Markt",
    customerRevenue: "Kundenumsatz",
    depth: "5-STUFEN-NETZWERK",
    global: "GLOBAL / AI-NATIVE",
    tagline: "Produkte · KI · Bereitstellung",
  },
  fr: {
    core: "AI MARK CORE",
    partner: "PARTENAIRE",
    business: "ENTREPRISE",
    market: "MARCHÉ",
    sale: "VENTE",
    localSales: "Ventes locales",
    marketGrowth: "Croissance du marché",
    realCustomer: "Vrai client",
    newMarket: "Nouveau marché",
    customerRevenue: "Revenus clients",
    depth: "RÉSEAU À 5 NIVEAUX",
    global: "MONDIAL / AI-NATIVE",
    tagline: "Produits · IA · Livraison",
  },
  zh: {
    core: "AI MARK CORE",
    partner: "合作伙伴",
    business: "企业客户",
    market: "目标市场",
    sale: "业务成交",
    localSales: "本地销售",
    marketGrowth: "市场拓展",
    realCustomer: "真实客户",
    newMarket: "新兴市场",
    customerRevenue: "客户营收",
    depth: "5级合作网络",
    global: "全球化 / AI-NATIVE",
    tagline: "核心产品 · 落地AI · 交付标准",
  },
  ar: {
    core: "AI MARK CORE",
    partner: "شريك",
    business: "شركة",
    market: "سوق",
    sale: "بيع",
    localSales: "مبيعات محلية",
    marketGrowth: "نمو السوق",
    realCustomer: "عميل حقيقي",
    newMarket: "سوق جديدة",
    customerRevenue: "إيرادات العملاء",
    depth: "شبكة من 5 مستويات",
    global: "عالمي / AI-NATIVE",
    tagline: "منتجات · ذكاء اصطناعي · تنفيذ",
  },
  ja: {
    core: "AI MARK CORE",
    partner: "パートナー",
    business: "企業顧客",
    market: "ターゲット市場",
    sale: "販売成約",
    localSales: "地域販売",
    marketGrowth: "市場拡大",
    realCustomer: "実顧客",
    newMarket: "新規市場",
    customerRevenue: "顧客収益",
    depth: "5段階ネットワーク",
    global: "グローバル / AI-NATIVE",
    tagline: "製品 · AI · 確実な納品",
  },
  tr: {
    core: "AI MARK CORE",
    partner: "ORTAK",
    business: "İŞLETME",
    market: "PAZAR",
    sale: "SATIŞ",
    localSales: "Yerel satışlar",
    marketGrowth: "Pazar büyümesi",
    realCustomer: "Gerçek müşteri",
    newMarket: "Yeni pazar",
    customerRevenue: "Müşteri geliri",
    depth: "5 SEVİYELİ AĞ",
    global: "KÜRESEL / AI-NATIVE",
    tagline: "Ürünler · Yapay Zekâ · Teslimat",
  },
  id: {
    core: "AI MARK CORE",
    partner: "MITRA",
    business: "BISNIS",
    market: "PASAR",
    sale: "PENJUALAN",
    localSales: "Penjualan lokal",
    marketGrowth: "Pertumbuhan pasar",
    realCustomer: "Klien nyata",
    newMarket: "Pasar baru",
    customerRevenue: "Pendapatan klien",
    depth: "JARINGAN 5 LEVEL",
    global: "GLOBAL / AI-NATIVE",
    tagline: "Produk · AI · Pengiriman",
  },
  vi: {
    core: "AI MARK CORE",
    partner: "ĐỐI TÁC",
    business: "DOANH NGHIỆP",
    market: "THỊ TRƯỜNG",
    sale: "BÁN HÀNG",
    localSales: "Doanh số địa phương",
    marketGrowth: "Phát triển thị trường",
    realCustomer: "Khách hàng thực",
    newMarket: "Thị trường mới",
    customerRevenue: "Doanh thu khách hàng",
    depth: "MẠNG LƯỚI 5 CẤP ĐỘ",
    global: "TOÀN CẦU / AI-NATIVE",
    tagline: "Sản phẩm · AI · Triển khai",
  },
};

export function PartnerNetworkHeroVisual({ locale }: Props) {
  const labels = LABELS[locale] ?? LABELS.en;

  const nodes = [
    { x: 18, y: 28, title: labels.partner, sub: labels.localSales },
    { x: 82, y: 27, title: labels.partner, sub: labels.marketGrowth },
    { x: 16, y: 75, title: labels.business, sub: labels.realCustomer },
    { x: 84, y: 74, title: labels.business, sub: labels.realCustomer },
    { x: 50, y: 13, title: labels.market, sub: labels.newMarket },
    { x: 50, y: 89, title: labels.sale, sub: labels.customerRevenue },
  ];

  /**
   * Percentage offsets give the intended spread, but the outermost cards are
   * wider than 16% of a 288px canvas, so the card edge clipped them at the
   * narrowest widths. `clamp` keeps the percentage everywhere it fits and
   * falls back to a safe inset below ~360px.
   */
  const axis = (pct: number) => `clamp(58px, ${pct}%, calc(100% - 58px))`;

  return (
    <div data-motion className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.35)]">
      <div className="relative min-h-[460px] sm:min-h-[520px]">
        <div aria-hidden className="grid-field pointer-events-none absolute inset-0 opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mark/10 blur-3xl"
        />

        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full text-warm/45"
          preserveAspectRatio="none"
        >
          {nodes.map((node, i) => (
            <g key={i}>
              <line
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke="currentColor"
                strokeWidth="0.22"
                className="flow-dash"
                style={{ animationDelay: `${i * 220}ms` }}
              />
              <line
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke="#d4f27e"
                strokeWidth="0.7"
                className="flow-dot"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            </g>
          ))}
        </svg>

        {nodes.map((node, index) => (
          <div
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: axis(node.x), top: node.y + "%" }}
          >
            {/* Reveal lives on the inner box: the outer node is positioned with
                a transform, and `[data-reveal]` would overwrite it. */}
            <div
              data-reveal
              style={{ "--reveal-delay": `${240 + index * 90}ms` } as CSSProperties}
              className="min-w-0 max-w-[min(140px,calc(50vw-2.5rem))] rounded-2xl border border-line bg-ink/90 px-2 py-2 backdrop-blur-md sm:max-w-none sm:min-w-[128px] sm:px-4 sm:py-3"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-mark" />
                <span className="font-mono text-[9px] font-semibold tracking-wider text-paper">
                  {node.title}
                </span>
              </div>
              <span className="mt-1 block text-[9px] text-muted">{node.sub}</span>
            </div>
          </div>
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            data-reveal="scale"
            className="relative grid h-32 w-32 place-items-center rounded-full border border-mark/60 bg-ink shadow-[0_0_70px_rgba(198,214,139,0.18)] sm:h-40 sm:w-40"
          >
            <div className="illu-pulse absolute inset-3 rounded-full border border-mark/20" />
            <div className="text-center">
              <span className="font-mono text-[9px] tracking-[0.2em] text-warm">
                {labels.core}
              </span>
              <span className="mt-2 block font-display text-sm font-semibold text-paper sm:text-base">
                AI MARK
              </span>
              <span className="mt-1 block text-[9px] text-muted">
                {labels.tagline}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-3 sm:px-6">
        <span className="rounded-full border border-line bg-ink px-3 py-1.5 font-mono text-[9px] font-semibold tracking-[0.16em] text-mark">
          {labels.depth}
        </span>
        <span className="flex items-center gap-2 rounded-full border border-line bg-ink px-3 py-1.5">
          <span className="relative h-1.5 w-1.5 rounded-full bg-warm text-warm pulse-ring" />
          <span className="font-mono text-[9px] font-semibold tracking-[0.14em] text-muted">
            {labels.global}
          </span>
        </span>
      </div>
    </div>
  );
}
