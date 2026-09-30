import type { Locale } from "@/lib/site";
import { packages } from "@/content/packages";
import { getCopy } from "@/content/copy";

export interface AimeRetainerCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  briefLink: string;
  footnote: string;
}

export const AIME_RETAINERS_I18N: Record<Locale, AimeRetainerCopy> = {
  ru: {
    eyebrow: "HITL-ретейнеры // Выделенный отдел",
    title: "Отдел маркетинга под ключ",
    subtitle:
      "Выделенная команда маркетинга на базе AIME с оператором в контуре (HITL). Мы берем на себя регулярный цикл исследований, стратегию, копирайтинг, визуалы и выпуск публикаций под вашим контролем. Без раздувания штата.",
    cta: "Обсудить установку",
    briefLink: "или отправить бриф",
    footnote:
      "USD. Медиабюджет в ретейнер не входит. ROI, CAC и ROAS не гарантируем.",
  },
  en: {
    eyebrow: "HITL Retainers // Dedicated Department",
    title: "Turnkey Marketing Department",
    subtitle:
      "A dedicated marketing department powered by AIME with an operator in the loop (HITL). We handle market research, editorial strategy, copywriting, visuals, and scheduled publishing under your approval. Zero hiring friction.",
    cta: "Discuss Turnkey Setup",
    briefLink: "or submit inquiry",
    footnote:
      "USD. Media budget is separate and not included in retainers. ROI, CAC, and ROAS are never guaranteed.",
  },
  es: {
    eyebrow: "Retainers HITL // Departamento dedicado",
    title: "Departamento de marketing llave en mano",
    subtitle:
      "Equipo de marketing dedicado operado con AIME y especialista humano en el ciclo (HITL). Gestionamos investigación, estrategia, textos, creatividades y publicación bajo su aprobación.",
    cta: "Hablar de la instalación",
    briefLink: "o enviar consulta",
    footnote:
      "USD. El presupuesto de medios no está incluido. No se garantizan ROI, CAC ni ROAS.",
  },
  pt: {
    eyebrow: "Retainers HITL // Departamento dedicado",
    title: "Departamento de marketing chave na mão",
    subtitle:
      "Equipe de marketing dedicada operada com AIME e especialista humano no circuito (HITL). Cuidamos de pesquisa, estratégia, textos, criativos e publicação sob sua aprovação.",
    cta: "Conversar sobre instalação",
    briefLink: "ou enviar briefing",
    footnote:
      "USD. O orçamento de mídia é do cliente. ROI, CAC e ROAS não são garantidos.",
  },
  de: {
    eyebrow: "HITL-Retainer // Dedizierte Abteilung",
    title: "Schlüsselfertige Marketingabteilung",
    subtitle:
      "Dediziertes Marketingteam auf AIME-Basis mit Operator im Regelkreis (HITL). Wir übernehmen Marktforschung, Redaktionsstrategie, Texte, Visuals und terminierte Veröffentlichung unter Ihrer Freigabe.",
    cta: "Installation besprechen",
    briefLink: "oder Anfrage senden",
    footnote:
      "USD. Mediabudget ist nicht im Retainer enthalten. ROI, CAC und ROAS werden nicht garantiert.",
  },
  fr: {
    eyebrow: "Retainers HITL // Équipe dédiée",
    title: "Département marketing clé en main",
    subtitle:
      "Équipe marketing dédiée basée sur AIME avec opérateur humain dans la boucle (HITL). Nous prenons en charge l'étude de marché, la stratégie éditoriale, la rédaction, les visuels et la publication sous votre validation.",
    cta: "Discuter du déploiement",
    briefLink: "ou envoyer une demande",
    footnote:
      "USD. Le budget média n'est pas inclus. Le ROI, CAC et ROAS ne sont pas garantis.",
  },
  ar: {
    eyebrow: "عقود شهرية HITL // قسم مخصص",
    title: "قسم تسويق متكامل بنظام تسليم المفتاح",
    subtitle:
      "فريق تسويق مخصص مدعوم بنظام AIME مع مشغل بشري في الحلقة (HITL). نتولى دراسة السوق والاستراتيجية وكتابة المحتوى والتصميم والنشر تحت موافقتك المباشرة.",
    cta: "مناقشة التثبيت والتشغيل",
    briefLink: "أو إرسال النموذج",
    footnote:
      "بالدولار الأمريكي. ميزانية الإعلانات لا تشملها العقود. لا نضمن ROI أو CAC أو ROAS.",
  },
  zh: {
    eyebrow: "HITL 深度外包 // 专属团队",
    title: "交钥匙式 AI 营销部",
    subtitle:
      "基于 AIME 的专属营销团队，配备人工专家全程把关（HITL）。负责市场调研、策略制定、文案排版、视觉创作并在您审批后定时发布。",
    cta: "商讨部署安装",
    briefLink: "或提交合作需求",
    footnote:
      "美元结算。媒体广告预算自理。不承诺 ROI、CAC 或 ROAS。",
  },
  ja: {
    eyebrow: "HITLリテイナー // 専任チーム",
    title: "ターンキー型AIマーケティング部門",
    subtitle:
      "AIMEを基盤とし、専任オペレーター（HITL）が伴走するマーケティング部門。競合調査、戦略立案、コピー、ビジュアル作成、そして承認後の配信まで一貫して支援します。",
    cta: "導入について相談する",
    briefLink: "または相談フォームへ",
    footnote:
      "USD。広告配信予算は含まれません。ROI、CAC、ROASの保証はありません。",
  },
  id: {
    eyebrow: "Retainer HITL // Tim Khusus",
    title: "Departemen Pemasaran Turnkey",
    subtitle:
      "Tim pemasaran khusus berbasis AIME dengan operator manusia dalam alur kerja (HITL). Kami mengelola riset, strategi, teks, visual, dan publikasi di bawah persetujuan Anda.",
    cta: "Diskusikan Pemasangan",
    briefLink: "atau kirimkan formulir",
    footnote:
      "USD. Anggaran iklan media tidak termasuk. ROI, CAC, dan ROAS tidak dijamin.",
  },
  vi: {
    eyebrow: "Retainer HITL // Đội Ngũ Chuyên Biệt",
    title: "Phòng Tiếp Thị Trọn Gói",
    subtitle:
      "Đội ngũ tiếp thị chuyên trách trên nền tảng AIME với chuyên viên giám sát (HITL). Chúng tôi đảm nhiệm nghiên cứu, chiến lược, nội dung, hình ảnh và đăng bài theo phê duyệt của bạn.",
    cta: "Thảo luận triển khai",
    briefLink: "hoặc gửi yêu cầu",
    footnote:
      "USD. Ngân sách quảng cáo không bao gồm trong retainer. Không đảm bảo ROI, CAC hoặc ROAS.",
  },
  tr: {
    eyebrow: "HITL Retainer // Özel Departman",
    title: "Anahtar Teslim Pazarlama Departmanı",
    subtitle:
      "İnsan denetimli (HITL) AIME tabanlı özel pazarlama ekibi. Pazar araştırması, strateji, metin yazarlığı, görsel üretimi ve onayınızla yayınlama sürecini yönetiyoruz.",
    cta: "Kurulumu Görüşün",
    briefLink: "veya form doldurun",
    footnote:
      "USD. Medya bütçesi dahil değildir. ROI, CAC ve ROAS garanti edilmez.",
  },
};

export function getAimeRetainers(locale: Locale) {
  const meta = AIME_RETAINERS_I18N[locale] ?? AIME_RETAINERS_I18N.en;
  const copy = getCopy(locale);
  const pkgItems = copy.packages.items;
  const perMonth = copy.commercial.perMonth;
  const featuredLabel =
    copy.commercial.featured ||
    (locale === "ru" ? "Рекомендуем" : "Recommended");

  const tiers = packages.map((pkg) => {
    const item = pkgItems[pkg.id];
    return {
      id: pkg.id,
      name: item.name,
      priceUsd: pkg.priceUsd,
      priceFormatted: `$${pkg.priceUsd.toLocaleString("en-US")}`,
      period: perMonth,
      featured: pkg.featured,
      summary: item.summary,
      points: item.points,
      cta: meta.cta,
    };
  });

  return {
    meta,
    featuredLabel,
    tiers,
  };
}
