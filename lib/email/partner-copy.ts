import type { Locale } from "@/lib/site";

export type CommissionEmailCopy = {
  subject: string;
  lead: string;
  productLabel: string;
  amountLabel: string;
  levelLabel: string;
  viewCabinet: string;
};

export const COMMISSION_EMAIL_COPY: Record<string, CommissionEmailCopy> = {
  ru: {
    subject: "Клиент оплатил: начислена комиссия",
    lead: "Оплата клиента подтверждена. Вам начислена партнёрская комиссия:",
    productLabel: "Продукт",
    amountLabel: "Сумма комиссии",
    levelLabel: "Уровень сети",
    viewCabinet: "Перейти в кабинет партнёра",
  },
  en: {
    subject: "Client payment confirmed: commission credited",
    lead: "A client payment has been confirmed. Your partner commission has been credited:",
    productLabel: "Product",
    amountLabel: "Commission amount",
    levelLabel: "Network level",
    viewCabinet: "Open partner dashboard",
  },
  es: {
    subject: "Pago de cliente confirmado: comisión acreditada",
    lead: "Se ha confirmado el pago de un cliente. Se ha acreditado su comisión:",
    productLabel: "Producto",
    amountLabel: "Monto de comisión",
    levelLabel: "Nivel de red",
    viewCabinet: "Abrir panel de socio",
  },
  pt: {
    subject: "Pagamento do cliente confirmado: comissão creditada",
    lead: "O pagamento de um cliente foi confirmado. Sua comissão foi creditada:",
    productLabel: "Produto",
    amountLabel: "Valor da comissão",
    levelLabel: "Nível de rede",
    viewCabinet: "Abrir painel do parceiro",
  },
  de: {
    subject: "Kundenzahlung bestätigt: Provision gutgeschrieben",
    lead: "Eine Kundenzahlung wurde bestätigt. Ihre Partnerprovision wurde gutgeschrieben:",
    productLabel: "Produkt",
    amountLabel: "Provisionsbetrag",
    levelLabel: "Netzwerkstufe",
    viewCabinet: "Partner-Dashboard öffnen",
  },
  fr: {
    subject: "Paiement client confirmé : commission créditée",
    lead: "Le paiement d'un client a été confirmé. Votre commission partenaire a été créditée :",
    productLabel: "Produit",
    amountLabel: "Montant de la commission",
    levelLabel: "Niveau de réseau",
    viewCabinet: "Ouvrir le tableau de bord partenaire",
  },
  zh: {
    subject: "客户已付款：佣金已记入",
    lead: "客户付款已确认。您的合作伙伴佣金已到账：",
    productLabel: "产品",
    amountLabel: "佣金金额",
    levelLabel: "网络级别",
    viewCabinet: "进入合作伙伴后台",
  },
  ar: {
    subject: "تم تأكيد دفع العميل: قيد العمولة",
    lead: "تم تأكيد دفع العميل بنجاح. تمت إضافة عمولة الشريك الخاصة بك:",
    productLabel: "المنتج",
    amountLabel: "مبلغ العمولة",
    levelLabel: "مستوى الشبكة",
    viewCabinet: "فتح لوحة تحكم الشريك",
  },
  ja: {
    subject: "クライアントの支払いが確認されました：コミッション付与",
    lead: "クライアントの支払いが確認されました。パートナーコミッションが付与されました：",
    productLabel: "製品",
    amountLabel: "コミッション額",
    levelLabel: "ネットワークレベル",
    viewCabinet: "パートナーダッシュボードを開く",
  },
  tr: {
    subject: "Müşteri ödemesi onaylandı: Komisyon yatırıldı",
    lead: "Bir müşteri ödemesi onaylandı. Ortaklık komisyonunuz hesabınıza geçti:",
    productLabel: "Ürün",
    amountLabel: "Komisyon tutarı",
    levelLabel: "Ağ seviyesi",
    viewCabinet: "Ortak paneline git",
  },
  id: {
    subject: "Pembayaran klien dikonfirmasi: Komisi dikreditkan",
    lead: "Pembayaran klien telah dikonfirmasi. Komisi mitra Anda telah dikreditkan:",
    productLabel: "Produk",
    amountLabel: "Jumlah komisi",
    levelLabel: "Tingkat jaringan",
    viewCabinet: "Buka dasbor mitra",
  },
  vi: {
    subject: "Khách hàng đã thanh toán: Hoa hồng đã ghi có",
    lead: "Thanh toán của khách hàng đã được xác nhận. Hoa hồng đối tác đã được ghi có:",
    productLabel: "Sản phẩm",
    amountLabel: "Số tiền hoa hồng",
    levelLabel: "Cấp độ mạng lưới",
    viewCabinet: "Mở bảng điều khiển đối tác",
  },
};

export function getCommissionEmailCopy(locale: string | Locale = "en"): CommissionEmailCopy {
  return COMMISSION_EMAIL_COPY[locale] ?? COMMISSION_EMAIL_COPY.en;
}
