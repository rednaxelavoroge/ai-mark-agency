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
    lead: "Published descriptions and list prices, with your referral link on each product. Commission follows the published schedule on the amount the customer paid.",
    who: "Who it's for",
    offer: "What it is",
    price: "List price",
    message: "Message you can send",
    open: "Open with your link",
    retainers: "Department retainers",
    production: "Digital production",
    note: "List prices are the published prices. Commission follows the published schedule on the amount the customer paid.",
  },
  ru: {
    title: "Материалы для продаж",
    lead: "Опубликованные описания и цены, и ваша referral-ссылка на каждый продукт. Комиссия идёт по опубликованной сетке от суммы, которую заплатил клиент.",
    who: "Кому подходит",
    offer: "Что это",
    price: "Цена прайса",
    message: "Сообщение, которое можно отправить",
    open: "Открыть по вашей ссылке",
    retainers: "Ретейнеры отдела",
    production: "Цифровое производство",
    note: "Цены — опубликованный прайс. Комиссия идёт по опубликованной сетке от суммы, которую заплатил клиент.",
  },
  es: {
    title: "Kit de ventas",
    lead: "Descripciones y precios publicados, con tu enlace de referido en cada producto. La comisión sigue la tabla publicada sobre el importe que pagó el cliente.",
    who: "Para quién es",
    offer: "Qué es",
    price: "Precio de lista",
    message: "Mensaje que puedes enviar",
    open: "Abrir con tu enlace",
    retainers: "Retainers de departamento",
    production: "Producción digital",
    note: "Los precios son los publicados. La comisión sigue la tabla publicada sobre el importe que pagó el cliente.",
  },
  pt: {
    title: "Kit de vendas",
    lead: "Descrições e preços publicados, com a sua ligação de referência em cada produto. A comissão segue a tabela publicada sobre o valor que o cliente pagou.",
    who: "Para quem é",
    offer: "O que é",
    price: "Preço de tabela",
    message: "Mensagem que pode enviar",
    open: "Abrir com a sua ligação",
    retainers: "Retainers de departamento",
    production: "Produção digital",
    note: "Os preços são os publicados. A comissão segue a tabela publicada sobre o valor que o cliente pagou.",
  },
  ar: {
    title: "مواد البيع",
    lead: "الأوصاف والأسعار المنشورة، مع رابط الإحالة على كل منتج. العمولة تتبع الجدول المنشور على المبلغ الذي دفعه العميل.",
    who: "لمن يناسب",
    offer: "ما هو",
    price: "سعر القائمة",
    message: "رسالة يمكن إرسالها",
    open: "افتح برابطك",
    retainers: "اشتراكات القسم",
    production: "الإنتاج الرقمي",
    note: "الأسعار هي الأسعار المنشورة. العمولة تتبع الجدول المنشور على المبلغ الذي دفعه العميل.",
  },
  zh: {
    title: "销售材料",
    lead: "已发布的说明和标价，每个产品都带你的推荐链接。佣金按已公布的比例，计算客户实际支付的金额。",
    who: "适合谁",
    offer: "是什么",
    price: "标价",
    message: "可以发送的消息",
    open: "用你的链接打开",
    retainers: "部门月费",
    production: "数字制作",
    note: "价格是已发布的标价。佣金按已公布的比例，计算客户实际支付的金额。",
  },
  id: {
    title: "Kit penjualan",
    lead: "Deskripsi dan harga yang sudah terbit, dengan tautan referral Anda di setiap produk. Komisi mengikuti jadwal yang diterbitkan dari jumlah yang dibayar pelanggan.",
    who: "Untuk siapa",
    offer: "Apa ini",
    price: "Harga daftar",
    message: "Pesan yang bisa dikirim",
    open: "Buka dengan tautan Anda",
    retainers: "Retainer departemen",
    production: "Produksi digital",
    note: "Harga adalah angka yang sudah diterbitkan. Komisi mengikuti jadwal yang diterbitkan dari jumlah yang dibayar pelanggan.",
  },
  vi: {
    title: "Bộ tài liệu bán hàng",
    lead: "Mô tả và giá đã công bố, kèm liên kết giới thiệu của bạn trên từng sản phẩm. Hoa hồng theo bảng đã công bố trên số tiền khách đã trả.",
    who: "Phù hợp với ai",
    offer: "Là gì",
    price: "Giá niêm yết",
    message: "Tin nhắn có thể gửi",
    open: "Mở bằng liên kết của bạn",
    retainers: "Phí retainer phòng ban",
    production: "Sản xuất số",
    note: "Giá là mức đã công bố. Hoa hồng theo bảng đã công bố trên số tiền khách đã trả.",
  },
  de: {
    title: "Verkaufsunterlagen",
    lead: "Veröffentlichte Beschreibungen und Listenpreise, mit Ihrem Empfehlungslink an jedem Produkt. Die Provision folgt dem veröffentlichten Plan auf den Betrag, den der Kunde gezahlt hat.",
    who: "Für wen",
    offer: "Was es ist",
    price: "Listenpreis",
    message: "Nachricht zum Senden",
    open: "Mit Ihrem Link öffnen",
    retainers: "Abteilungs-Retainer",
    production: "Digitale Produktion",
    note: "Die Preise sind die veröffentlichten Listenpreise. Die Provision folgt dem veröffentlichten Plan auf den Betrag, den der Kunde gezahlt hat.",
  },
  fr: {
    title: "Kit commercial",
    lead: "Descriptions et prix publiés, avec votre lien de parrainage sur chaque produit. La commission suit le barème publié sur le montant payé par le client.",
    who: "Pour qui",
    offer: "Ce que c'est",
    price: "Prix affiché",
    message: "Message à envoyer",
    open: "Ouvrir avec votre lien",
    retainers: "Retainer de département",
    production: "Production digitale",
    note: "Les prix sont ceux qui sont publiés. La commission suit le barème publié sur le montant payé par le client.",
  },
  ja: {
    title: "販売キット",
    lead: "公開済みの説明と価格に、各製品への紹介リンクを付けています。報酬は、お客様が支払った金額に公開済みの料率を適用します。",
    who: "向いている相手",
    offer: "内容",
    price: "表示価格",
    message: "送れるメッセージ",
    open: "自分のリンクで開く",
    retainers: "部門リテイナー",
    production: "デジタル制作",
    note: "価格は公開済みの表示価格です。報酬は、お客様が支払った金額に公開済みの料率を適用します。",
  },
  tr: {
    title: "Satış kiti",
    lead: "Yayınlanmış açıklamalar ve liste fiyatları, her üründe sizin referral bağlantınız. Komisyon, müşterinin ödediği tutara yayınlanmış tarifeyi uygular.",
    who: "Kim için",
    offer: "Nedir",
    price: "Liste fiyatı",
    message: "Gönderebileceğiniz mesaj",
    open: "Bağlantınızla açın",
    retainers: "Departman retainer",
    production: "Dijital üretim",
    note: "Fiyatlar yayınlanmış liste fiyatlarıdır. Komisyon, müşterinin ödediği tutara yayınlanmış tarifeyi uygular.",
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
