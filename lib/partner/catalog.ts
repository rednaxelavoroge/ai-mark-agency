import { getCopy } from "@/content/copy";
import { packages, products, type ProductId } from "@/content/packages";
import { productPagePath } from "@/lib/products";
import { isLocale, type Locale } from "@/lib/site";
import { referralUrlTo } from "@/lib/partner/format";

function productName(id: ProductId): string {
  return products.find((product) => product.id === id)?.name ?? id;
}

export type SalesKitLabels = {
  title: string;
  lead: string;
  who: string;
  offer: string;
  price: string;
  message: string;
  open: string;
  retainers: string;
  production: string;
  note: string;
};

const LABELS: Record<Locale, SalesKitLabels> = {
  en: {
    title: "Sales kit",
    lead: "Published descriptions and list prices, with your referral link on each product. This page does not estimate commission.",
    who: "Who it's for",
    offer: "What it is",
    price: "List price",
    message: "Message you can send",
    open: "Open with your link",
    retainers: "Department retainers",
    production: "Digital production",
    note: "List prices are the published figures. A qualifying sale is the amount the customer actually paid. Your commission is the ledger entry, not a figure calculated here.",
  },
  ru: {
    title: "Материалы для продаж",
    lead: "Опубликованные описания и цены прайса, и ваша referral-ссылка на каждый продукт. Комиссия здесь не считается.",
    who: "Кому подходит",
    offer: "Что это",
    price: "Цена прайса",
    message: "Сообщение, которое можно отправить",
    open: "Открыть по вашей ссылке",
    retainers: "Ретейнеры отдела",
    production: "Цифровое производство",
    note: "Цены — опубликованный прайс. Квалифицированная продажа — сумма, которую клиент фактически заплатил. Комиссия — запись в ledger, а не расчёт на этой странице.",
  },
  es: {
    title: "Kit de ventas",
    lead: "Descripciones y precios publicados, con tu enlace de referido en cada producto. Esta página no estima la comisión.",
    who: "Para quién es",
    offer: "Qué es",
    price: "Precio de lista",
    message: "Mensaje que puedes enviar",
    open: "Abrir con tu enlace",
    retainers: "Retainers de departamento",
    production: "Producción digital",
    note: "Los precios son los publicados. Una venta cualificada es el importe que el cliente pagó de verdad. Tu comisión es el apunte del ledger, no un cálculo de esta página.",
  },
  pt: {
    title: "Kit de vendas",
    lead: "Descrições e preços publicados, com a sua ligação de referência em cada produto. Esta página não estima a comissão.",
    who: "Para quem é",
    offer: "O que é",
    price: "Preço de tabela",
    message: "Mensagem que pode enviar",
    open: "Abrir com a sua ligação",
    retainers: "Retainers de departamento",
    production: "Produção digital",
    note: "Os preços são os publicados. Uma venda qualificada é o valor que o cliente pagou de facto. A comissão é o lançamento do ledger, não um cálculo desta página.",
  },
  ar: {
    title: "مواد البيع",
    lead: "الأوصاف والأسعار المنشورة، مع رابط الإحالة على كل منتج. هذه الصفحة لا تقدّر العمولة.",
    who: "لمن يناسب",
    offer: "ما هو",
    price: "سعر القائمة",
    message: "رسالة يمكن إرسالها",
    open: "افتح برابطك",
    retainers: "اشتراكات القسم",
    production: "الإنتاج الرقمي",
    note: "الأسعار هي الأسعار المنشورة. البيع المؤهل هو المبلغ الذي دفعه العميل فعلًا. عمولتك هي قيد السجل، وليست حسابًا في هذه الصفحة.",
  },
  zh: {
    title: "销售材料",
    lead: "已发布的说明和标价，每个产品都带你的推荐链接。本页不估算佣金。",
    who: "适合谁",
    offer: "是什么",
    price: "标价",
    message: "可以发送的消息",
    open: "用你的链接打开",
    retainers: "部门月费",
    production: "数字制作",
    note: "价格是已发布的标价。合格销售是客户实际支付的金额。佣金是账本记录，不是本页算出来的数字。",
  },
  id: {
    title: "Kit penjualan",
    lead: "Deskripsi dan harga yang sudah terbit, dengan tautan referral Anda di setiap produk. Halaman ini tidak memperkirakan komisi.",
    who: "Untuk siapa",
    offer: "Apa ini",
    price: "Harga daftar",
    message: "Pesan yang bisa dikirim",
    open: "Buka dengan tautan Anda",
    retainers: "Retainer departemen",
    production: "Produksi digital",
    note: "Harga adalah angka yang sudah diterbitkan. Penjualan yang lolos kualifikasi adalah jumlah yang benar-benar dibayar pelanggan. Komisi Anda adalah entri ledger, bukan hitungan di halaman ini.",
  },
  vi: {
    title: "Bộ tài liệu bán hàng",
    lead: "Mô tả và giá đã công bố, kèm liên kết giới thiệu của bạn trên từng sản phẩm. Trang này không ước tính hoa hồng.",
    who: "Phù hợp với ai",
    offer: "Là gì",
    price: "Giá niêm yết",
    message: "Tin nhắn có thể gửi",
    open: "Mở bằng liên kết của bạn",
    retainers: "Phí retainer phòng ban",
    production: "Sản xuất số",
    note: "Giá là mức đã công bố. Giao dịch đủ điều kiện là số tiền khách đã thực trả. Hoa hồng là bút toán sổ cái, không phải con số tính trên trang này.",
  },
  de: {
    title: "Verkaufsunterlagen",
    lead: "Veröffentlichte Beschreibungen und Listenpreise, mit Ihrem Empfehlungslink an jedem Produkt. Diese Seite schätzt keine Provision.",
    who: "Für wen",
    offer: "Was es ist",
    price: "Listenpreis",
    message: "Nachricht zum Senden",
    open: "Mit Ihrem Link öffnen",
    retainers: "Abteilungs-Retainer",
    production: "Digitale Produktion",
    note: "Die Preise sind die veröffentlichten Listenpreise. Ein qualifizierter Verkauf ist der Betrag, den der Kunde tatsächlich gezahlt hat. Ihre Provision ist der Ledger-Eintrag, keine Rechnung auf dieser Seite.",
  },
  fr: {
    title: "Kit commercial",
    lead: "Descriptions et prix publiés, avec votre lien de parrainage sur chaque produit. Cette page n'estime pas la commission.",
    who: "Pour qui",
    offer: "Ce que c'est",
    price: "Prix affiché",
    message: "Message à envoyer",
    open: "Ouvrir avec votre lien",
    retainers: "Retainer de département",
    production: "Production digitale",
    note: "Les prix sont ceux qui sont publiés. Une vente qualifiée est le montant réellement payé par le client. Votre commission est l'écriture du ledger, pas un calcul sur cette page.",
  },
  ja: {
    title: "販売キット",
    lead: "公開済みの説明と価格に、各製品への紹介リンクを付けています。このページでは報酬を計算しません。",
    who: "向いている相手",
    offer: "内容",
    price: "表示価格",
    message: "送れるメッセージ",
    open: "自分のリンクで開く",
    retainers: "部門リテイナー",
    production: "デジタル制作",
    note: "価格は公開済みの表示価格です。適格セールは顧客が実際に支払った金額です。報酬は台帳の記録であり、このページの計算ではありません。",
  },
  tr: {
    title: "Satış kiti",
    lead: "Yayınlanmış açıklamalar ve liste fiyatları, her üründe sizin referral bağlantınız. Bu sayfa komisyon tahmin etmez.",
    who: "Kim için",
    offer: "Nedir",
    price: "Liste fiyatı",
    message: "Gönderebileceğiniz mesaj",
    open: "Bağlantınızla açın",
    retainers: "Departman retainer",
    production: "Dijital üretim",
    note: "Fiyatlar yayınlanmış liste fiyatlarıdır. Nitelikli satış, müşterinin gerçekten ödediği tutardır. Komisyonunuz ledger kaydıdır, bu sayfadaki bir hesap değildir.",
  },
};

export function cabinetLocale(language: string | null | undefined): Locale {
  if (language && isLocale(language)) return language;
  return "en";
}

export function salesKitLabels(locale: Locale): SalesKitLabels {
  return LABELS[locale];
}

function usd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export type KitProduct = {
  id: string;
  name: string;
  who: string;
  offer: string;
  price: string;
  extra: string;
  message: string;
  href: string;
  referral: string;
};

export type KitRetainer = {
  id: string;
  name: string;
  summary: string;
  price: string;
};

export type SalesKit = {
  labels: SalesKitLabels;
  products: KitProduct[];
  retainers: KitRetainer[];
  production: { name: string; price: string; body: string } | null;
};

/**
 * Sales kit built only from published product copy and `packages` prices.
 * The message is those published lines plus the partner's referral link.
 */
export function buildSalesKit(locale: Locale, referralCode: string): SalesKit {
  const copy = getCopy(locale);
  const labels = LABELS[locale];
  const perMonth = copy.commercial.perMonth;

  const productsKit = (["aime", "assistant", "showroom"] as const).map((id) => {
    const item = copy.products.items[id];
    const href = productPagePath(locale, id);
    const referral = referralUrlTo(referralCode, href);
    const message = [item.value, item.price, referral].filter(Boolean).join("\n");
    return {
      id,
      name: productName(id),
      who: item.who,
      offer: item.value,
      price: item.price,
      extra: item.extra,
      message,
      href,
      referral,
    };
  });

  const retainers = packages.map((pkg) => {
    const item = copy.packages.items[pkg.id];
    return {
      id: pkg.id,
      name: item.name,
      summary: item.summary,
      price: `${usd(pkg.priceUsd)} ${perMonth}`,
    };
  });

  const productionTier = copy.commercial.tiers[3] ?? null;

  return {
    labels,
    products: productsKit,
    retainers,
    production: productionTier
      ? {
          name: productionTier.name,
          price: productionTier.price,
          body: productionTier.body,
        }
      : null,
  };
}
