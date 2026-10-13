import type { Locale } from "@/lib/site";

export type InvestorStat = {
  label: string;
  value: string;
  unit: string;
  note: string;
};

export type InvestorsPageCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  lead: string;
  meta: string;
  stats: InvestorStat[];
  contentsLabel: string;
  documentLabel: string;
  downloadLabel: string;
  downloadHint: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

const EN: InvestorsPageCopy = {
  eyebrow: "Investment Proposal",
  title: "Investment in AI MARK",
  subtitle: "Participation in the company, not an order to build a business and not the partner network",
  lead: "This page is about investing in AI MARK as a company. It is separate from Business Creation, where we build a business for a client, and from the Partner Network, where partners earn commission on sales. The core AI infrastructure is already in commercial use; financing, if taken, is for scale.",
  meta: "Technology → Commercialization → Scale",
  stats: [
    { label: "Showroom AI", value: "$89–399", unit: "/ month", note: "Start $89 · Business $249 · Pro $399. Optional setup $300 once. 7-day free trial, no card." },
    { label: "Marketer, separately", value: "$199–349", unit: "/ month", note: "Marketer Lite $199 · Marketer Pro $349" },
    { label: "Business Assistant", value: "$149–199", unit: "/ month", note: "Entry $149 · Standard $199" },
    {
      label: "AI Infrastructure",
      value: "Built",
      unit: "",
      note: "Already in commercial use",
    },
  ],
  contentsLabel: "Contents",
  documentLabel: "Full proposal",
  downloadLabel: "Download as Markdown",
  downloadHint: "The document below is rendered from the Markdown source.",
  ctaEyebrow: "Participation & Terms",
  ctaTitle: "Early investors",
  ctaBody:
    "Participation size, deal structure and terms are determined individually. We can demonstrate the working AI infrastructure, present the existing products and discuss the business model and scaling strategy.",
  ctaButton: "Request investor materials",
};

const RU: InvestorsPageCopy = {
  eyebrow: "Инвестиционное предложение",
  title: "Инвестиция в компанию AI MARK",
  subtitle:
    "Участие в компании, а не заказ на создание бизнеса и не партнёрская сеть",
  lead: "Эта страница — про инвестицию в AI MARK как компанию. Она отдельно от создания бизнеса для клиента и отдельно от партнёрской сети, где партнёр получает комиссию с продаж. Основная AI-инфраструктура уже используется в коммерческой работе; финансирование, если мы его берём, — на масштаб.",
  meta: "Technology → Commercialization → Scale",
  stats: [
    { label: "Showroom AI", value: "$89–399", unit: "/ месяц", note: "Start $89 · Business $249 · Pro $399. Настройка под ключ $300 разово (по желанию). 7 дней бесплатно, без карты." },
    { label: "Marketer отдельно", value: "$199–349", unit: "/ месяц", note: "Marketer Lite $199 · Marketer Pro $349" },
    { label: "Business Assistant", value: "$149–199", unit: "/ месяц", note: "Entry $149 · Standard $199" },
    {
      label: "AI-инфраструктура",
      value: "Создана",
      unit: "",
      note: "Уже используется коммерчески",
    },
  ],
  contentsLabel: "Содержание",
  documentLabel: "Полное предложение",
  downloadLabel: "Скачать в Markdown",
  downloadHint: "Документ ниже отрендерен из Markdown-источника.",
  ctaEyebrow: "Формат участия",
  ctaTitle: "Ранние инвесторы",
  ctaBody:
    "Размер участия, структура сделки и условия определяются индивидуально. Мы можем показать работающую AI-инфраструктуру, презентовать существующие продукты и обсудить бизнес-модель и стратегию масштабирования.",
  ctaButton: "Запросить материалы инвестора",
};

const ES: InvestorsPageCopy = {
  eyebrow: "Propuesta de inversión",
  title: "Inversión en la compañía AI MARK",
  subtitle:
    "Participación en la empresa, no un encargo de creación de negocio ni la red de socios",
  lead: "Esta página trata sobre la inversión en AI MARK como empresa. Es independiente de la creación de negocios para clientes y de la red de socios donde se obtienen comisiones por ventas. La infraestructura central de IA ya está en uso comercial; la financiación, si se capta, es para escalar.",
  meta: "Tecnología → Comercialización → Escala",
  stats: [
    { label: "Showroom AI", value: "$89–399", unit: "/ mes", note: "Start $89 · Business $249 · Pro $399. Configuración opcional $300 única. 7 días gratis, sin tarjeta." },
    { label: "Marketer por separado", value: "$199–349", unit: "/ mes", note: "Marketer Lite $199 · Marketer Pro $349" },
    { label: "Business Assistant", value: "$149–199", unit: "/ mes", note: "Entry $149 · Standard $199" },
    { label: "Infraestructura IA", value: "Creada", unit: "", note: "Ya en uso comercial" },
  ],
  contentsLabel: "Contenido",
  documentLabel: "Propuesta completa",
  downloadLabel: "Descargar en Markdown",
  downloadHint: "El siguiente documento se genera a partir de la fuente Markdown.",
  ctaEyebrow: "Formato de participación",
  ctaTitle: "Primeros inversores",
  ctaBody:
    "El tamaño de la participación, la estructura del acuerdo y las condiciones se determinan individualmente. Podemos mostrar la infraestructura de IA en funcionamiento, presentar los productos existentes y discutir el modelo de negocio y la estrategia de escalado.",
  ctaButton: "Solicitar materiales para inversores",
};

const PT: InvestorsPageCopy = {
  eyebrow: "Proposta de investimento",
  title: "Investimento na empresa AI MARK",
  subtitle:
    "Participação na empresa, não um pedido de criação de negócio e não a rede de parceiros",
  lead: "Esta página é sobre investimento na AI MARK como empresa. É independente da criação de negócios para clientes e da rede de parceiros, onde parceiros recebem comissão sobre vendas. A infraestrutura central de IA já está em uso comercial; o financiamento, se captado, é para escala.",
  meta: "Tecnologia → Comercialização → Escala",
  stats: [
    { label: "Showroom AI", value: "$89–399", unit: "/ mês", note: "Start $89 · Business $249 · Pro $399. Configuração opcional $300 única. 7 dias grátis, sem cartão." },
    { label: "Marketer separado", value: "$199–349", unit: "/ mês", note: "Marketer Lite $199 · Marketer Pro $349" },
    { label: "Business Assistant", value: "$149–199", unit: "/ mês", note: "Entry $149 · Standard $199" },
    { label: "Infraestrutura IA", value: "Construída", unit: "", note: "Já em uso comercial" },
  ],
  contentsLabel: "Conteúdo",
  documentLabel: "Proposta completa",
  downloadLabel: "Baixar em Markdown",
  downloadHint: "O documento abaixo é renderizado a partir do arquivo Markdown.",
  ctaEyebrow: "Formato de participação",
  ctaTitle: "Investidores iniciais",
  ctaBody:
    "O valor da participação, estrutura do acordo e termos são definidos individualmente. Podemos demonstrar a infraestrutura de IA funcionando, apresentar os produtos existentes e discutir o modelo de negócio e estratégia de expansão.",
  ctaButton: "Solicitar materiais para investidores",
};

const DE: InvestorsPageCopy = {
  eyebrow: "Investitionsangebot",
  title: "Investition in die AI MARK Gesellschaft",
  subtitle:
    "Beteiligung am Unternehmen, kein Auftrag zur Geschäftsgründung und kein Partnernetzwerk",
  lead: "Diese Seite befasst sich mit der Investition in AI MARK als Unternehmen. Dies ist getrennt von der Geschäftserstellung für Kunden und getrennt vom Partnernetzwerk, bei dem Partner Verkaufsprovisionen erhalten. Die zentrale KI-Infrastruktur befindet sich bereits im kommerziellen Einsatz; Kapital dient der Skalierung.",
  meta: "Technologie → Kommerzialisierung → Skalierung",
  stats: [
    { label: "Showroom AI", value: "$89–399", unit: "/ Monat", note: "Start $89 · Business $249 · Pro $399. Optionale Einrichtung $300 einmalig. 7 Tage kostenlos, ohne Karte." },
    { label: "Marketer einzeln", value: "$199–349", unit: "/ Monat", note: "Marketer Lite $199 · Marketer Pro $349" },
    { label: "Business Assistant", value: "$149–199", unit: "/ Monat", note: "Entry $149 · Standard $199" },
    { label: "KI-Infrastruktur", value: "Einsatzbereit", unit: "", note: "Bereits kommerziell aktiv" },
  ],
  contentsLabel: "Inhalt",
  documentLabel: "Vollständiges Memorandum",
  downloadLabel: "Als Markdown herunterladen",
  downloadHint: "Das folgende Dokument wird aus der Markdown-Quelle gerendert.",
  ctaEyebrow: "Beteiligungsformate",
  ctaTitle: "Frühphasen-Investoren",
  ctaBody:
    "Beteiligungshöhe, Deal-Struktur und Konditionen werden individuell festgelegt. Wir demonstrieren gerne die funktionierende KI-Infrastruktur, präsentieren bestehende Produkte und erörtern Geschäftsmodell und Skalierungsstrategie.",
  ctaButton: "Investorenunterlagen anfordern",
};

const FR: InvestorsPageCopy = {
  eyebrow: "Proposition d'investissement",
  title: "Investissement dans la société AI MARK",
  subtitle:
    "Participation dans l'entreprise, pas une commande de création d'entreprise ni le réseau de partenaires",
  lead: "Cette page concerne l'investissement dans AI MARK en tant qu'entreprise. Elle est distincte de la création d'entreprises pour clients et du réseau de partenaires générant des commissions sur les ventes. L'infrastructure IA centrale est déjà exploitée commercialement ; le financement sert à son passage à l'échelle.",
  meta: "Technologie → Commercialisation → Échelle",
  stats: [
    { label: "Showroom AI", value: "$89–399", unit: "/ mois", note: "Start $89 · Business $249 · Pro $399. Mise en place optionnelle $300 une fois. 7 jours gratuits, sans carte." },
    { label: "Marketer séparément", value: "$199–349", unit: "/ mois", note: "Marketer Lite $199 · Marketer Pro $349" },
    { label: "Business Assistant", value: "$149–199", unit: "/ mois", note: "Entry $149 · Standard $199" },
    { label: "Infrastructure IA", value: "Déployée", unit: "", note: "Déjà active commercialement" },
  ],
  contentsLabel: "Sommaire",
  documentLabel: "Proposition complète",
  downloadLabel: "Télécharger en Markdown",
  downloadHint: "Le document ci-dessous est généré à partir de la source Markdown.",
  ctaEyebrow: "Format de participation",
  ctaTitle: "Investisseurs initiaux",
  ctaBody:
    "Le montant d'investissement, la structure de l'accord et les conditions sont déterminés au cas par cas. Nous pouvons présenter l'infrastructure IA en direct, détailler les produits existants et échanger sur le modèle économique et l'expansion.",
  ctaButton: "Demander la documentation investisseur",
};

const ZH: InvestorsPageCopy = {
  eyebrow: "投资提案",
  title: "投资 AI MARK 公司",
  subtitle:
    "入股公司本体，非委托创建业务，亦非合作伙伴分销网络",
  lead: "本页面阐述对 AI MARK 公司的直接股权投资。这与面向客户的企业定制开发完全独立，亦不同于赚取销售佣金的合作伙伴网络。核心 AI 基础设施已进入商业化运营；融资旨在加速规模化扩张。",
  meta: "技术研发 → 商业落地 → 规模扩张",
  stats: [
    { label: "Showroom AI", value: "$89–399", unit: "/ 月", note: "Start $89 · Business $249 · Pro $399。可选一次性代配置 $300。免费试用 7 天，无需银行卡。" },
    { label: "单独购买 Marketer", value: "$199–349", unit: "/ 月", note: "Marketer Lite $199 · Marketer Pro $349" },
    { label: "Business Assistant", value: "$149–199", unit: "/ 月", note: "Entry $149 · Standard $199" },
    { label: "AI 基础设施", value: "已投产", unit: "", note: "已全面商业化运营" },
  ],
  contentsLabel: "目录",
  documentLabel: "完整提案",
  downloadLabel: "下载 Markdown 格式",
  downloadHint: "以下文档直接渲染自 Markdown 源文件。",
  ctaEyebrow: "参与模式与条款",
  ctaTitle: "早期投资人",
  ctaBody:
    "投资份额、交易结构与具体条款可一对一商议。我们可为您现场演示运行中的 AI 基础设施，展示现有产品矩阵，并深入讨论商业模型与全球化扩张策略。",
  ctaButton: "索取投资材料",
};

const AR: InvestorsPageCopy = {
  eyebrow: "مقترح استثماري",
  title: "الاستثمار في شركة AI MARK",
  subtitle:
    "المشاركة في رأس مال الشركة، وليس طلب إنشاء مشروع تجاري ولا شبكة شركاء",
  lead: "هذه الصفحة مخصصة للاستثمار في شركة AI MARK ككيان تجاري. وهي منفصلة تماماً عن بناء الشركات للعملاء وعن شبكة الشركاء القائمة على العمولات. البنية التحتية الأساسية للذكاء الاصطناعي تعمل تجارياً بالفعل؛ وأي تمويل يُخصص للتوسع والنمو الدولي.",
  meta: "التكنولوجيا ← التجارة ← التوسع",
  stats: [
    { label: "Showroom AI", value: "$89–399", unit: "/ شهر", note: "Start $89 · Business $249 · Pro $399. إعداد اختياري $300 لمرة واحدة. تجربة مجانية 7 أيام بدون بطاقة." },
    { label: "Marketer بشكل منفصل", value: "$199–349", unit: "/ شهر", note: "Marketer Lite $199 · Marketer Pro $349" },
    { label: "Business Assistant", value: "$149–199", unit: "/ شهر", note: "Entry $149 · Standard $199" },
    { label: "بنية الذكاء الاصطناعي", value: "جاهزة ومبنية", unit: "", note: "تعمل تجارياً بالفعل" },
  ],
  contentsLabel: "المحتويات",
  documentLabel: "المقترح الكامل",
  downloadLabel: "تحميل بصيغة Markdown",
  downloadHint: "المستند أدناه معروض مباشرة من المصدر.",
  ctaEyebrow: "شروط المشاركة",
  ctaTitle: "المستثمرون الأوائل",
  ctaBody:
    "يتم تحديد حجم المشاركة وهيكل الصفقة والشروط بشكل فردي. يمكننا تقديم عرض حي للبنية التحتية الذكية القائمة، واستعراض المنتجات الحالية، ومناقشة نموذج الأعمال واستراتيجية التوسع.",
  ctaButton: "طلب وثائق المستثمر",
};

const JA: InvestorsPageCopy = {
  eyebrow: "投資提案",
  title: "AI MARK 社への出資・投資",
  subtitle:
    "会社本体への資本参加であり、事業立ち上げ受託やパートナーネットワークとは異なります",
  lead: "本ページは AI MARK という企業本体への直接投資に関するご案内です。顧客向けの事業構築受託や、販売手数料を得るパートナーネットワークとは独立しています。基幹AIインフラはすでに商業運用段階にあり、調達資金は事業のスケールアップに充てられます。",
  meta: "テクノロジー → 商業化 → スケール拡大",
  stats: [
    { label: "Showroom AI", value: "$89–399", unit: "/ 月", note: "Start $89 · Business $249 · Pro $399。任意の初期設定 $300（1回）。7日間無料、カード不要。" },
    { label: "Marketer 単体", value: "$199–349", unit: "/ 月", note: "Marketer Lite $199 · Marketer Pro $349" },
    { label: "Business Assistant", value: "$149–199", unit: "/ 月", note: "Entry $149 · Standard $199" },
    { label: "AIインフラ", value: "構築済", unit: "", note: "すでに商用稼働中" },
  ],
  contentsLabel: "目次",
  documentLabel: "詳細投資提案書",
  downloadLabel: "Markdownでダウンロード",
  downloadHint: "以下のドキュメントはMarkdownソースからレンダリングされています。",
  ctaEyebrow: "参画条件とフォーマット",
  ctaTitle: "初期投資家の皆様へ",
  ctaBody:
    "出資規模、ディール構造、諸条件は個別に協議のうえ決定します。実稼働しているAIインフラのデモ、既存製品の提示、ビジネスモデルおよび拡張戦略について詳細にご説明いたします。",
  ctaButton: "投資家資料を請求する",
};

const TR: InvestorsPageCopy = {
  eyebrow: "Yatırım teklifi",
  title: "AI MARK şirketine yatırım",
  subtitle:
    "Şirkete ortaklık katılımıdır; işletme kurma siparişi veya ortaklık ağı değildir",
  lead: "Bu sayfa AI MARK şirketine yatırım hakkındadır. Müşteriler için anahtar teslim işletme kurmaktan ve satış komisyonu kazanılan ortaklık ağından tamamen ayrıdır. Temel yapay zeka altyapısı halihazırda ticari kullanımda olup, olası finansman büyüme ve ölçeklendirme içindir.",
  meta: "Teknoloji → Ticarileşme → Ölçek",
  stats: [
    { label: "Showroom AI", value: "$89–399", unit: "/ ay", note: "Start $89 · Business $249 · Pro $399. İsteğe bağlı kurulum $300 tek sefer. 7 gün ücretsiz, kart gerekmez." },
    { label: "Marketer ayrı", value: "$199–349", unit: "/ ay", note: "Marketer Lite $199 · Marketer Pro $349" },
    { label: "Business Assistant", value: "$149–199", unit: "/ ay", note: "Entry $149 · Standard $199" },
    { label: "AI Altyapısı", value: "Hazır", unit: "", note: "Halihazırda ticari kullanımda" },
  ],
  contentsLabel: "İçindekiler",
  documentLabel: "Tam teklif belgesi",
  downloadLabel: "Markdown olarak indir",
  downloadHint: "Aşağıdaki belge doğrudan Markdown kaynağından oluşturulmuştur.",
  ctaEyebrow: "Katılım şartları",
  ctaTitle: "Erken aşama yatırımcılar",
  ctaBody:
    "Katılım boyutu, anlaşma yapısı ve koşullar bireysel olarak belirlenir. Çalışan yapay zeka altyapımızı tanıtabilir, mevcut ürünlerimizi sunabilir ve iş modeli ile küresel ölçeklendirme stratejimizi detaylandırabiliriz.",
  ctaButton: "Yatırımcı materyallerini talep et",
};

const ID: InvestorsPageCopy = {
  eyebrow: "Proposal investasi",
  title: "Investasi di perusahaan AI MARK",
  subtitle:
    "Partisipasi kepemilikan di perusahaan, bukan pesanan pembuatan bisnis dan bukan jaringan mitra",
  lead: "Halaman ini membahas investasi langsung pada perusahaan AI MARK. Ini terpisah dari pembuatan bisnis untuk klien dan terpisah dari jaringan mitra yang memperoleh komisi penjualan. Infrastruktur AI inti sudah digunakan secara komersial; pendanaan ditujukan untuk ekspansi dan skala global.",
  meta: "Teknologi → Komersialisasi → Skala",
  stats: [
    { label: "Showroom AI", value: "$89–399", unit: "/ bulan", note: "Start $89 · Business $249 · Pro $399. Penyiapan opsional $300 sekali. Uji coba gratis 7 hari, tanpa kartu." },
    { label: "Marketer terpisah", value: "$199–349", unit: "/ bulan", note: "Marketer Lite $199 · Marketer Pro $349" },
    { label: "Business Assistant", value: "$149–199", unit: "/ bulan", note: "Entry $149 · Standard $199" },
    { label: "Infrastruktur AI", value: "Tersedia", unit: "", note: "Sudah beroperasi komersial" },
  ],
  contentsLabel: "Daftar isi",
  documentLabel: "Proposal lengkap",
  downloadLabel: "Unduh format Markdown",
  downloadHint: "Dokumen di bawah ini dirender langsung dari sumber Markdown.",
  ctaEyebrow: "Format partisipasi",
  ctaTitle: "Investor tahap awal",
  ctaBody:
    "Besaran partisipasi, struktur kesepakatan, dan persyaratan ditentukan secara individual. Kami dapat mendemonstrasikan infrastruktur AI yang sudah berjalan, mempresentasikan produk yang ada, serta mendiskusikan model bisnis dan strategi penskalaan.",
  ctaButton: "Minta dokumen investor",
};

const VI: InvestorsPageCopy = {
  eyebrow: "Đề xuất đầu tư",
  title: "Đầu tư vào công ty AI MARK",
  subtitle:
    "Tham gia vào vốn công ty, không phải đặt làm doanh nghiệp và không phải mạng lưới đối tác",
  lead: "Trang này cung cấp thông tin về việc đầu tư vào công ty AI MARK. Định hướng này hoàn toàn độc lập với việc xây dựng doanh nghiệp cho khách hàng và mạng lưới đối tác hưởng hoa hồng bán hàng. Hạ tầng AI cốt lõi đã được vận hành thương mại thực tế; nguồn vốn sẽ phục vụ mục tiêu mở rộng quy mô.",
  meta: "Công nghệ → Thương mại hóa → Mở rộng quy mô",
  stats: [
    { label: "Showroom AI", value: "$89–399", unit: "/ tháng", note: "Start $89 · Business $249 · Pro $399. Thiết lập tùy chọn $300 một lần. Dùng thử miễn phí 7 ngày, không cần thẻ." },
    { label: "Marketer riêng", value: "$199–349", unit: "/ tháng", note: "Marketer Lite $199 · Marketer Pro $349" },
    { label: "Business Assistant", value: "$149–199", unit: "/ tháng", note: "Entry $149 · Standard $199" },
    { label: "Hạ tầng AI", value: "Đã hoàn thiện", unit: "", note: "Đã vận hành thương mại" },
  ],
  contentsLabel: "Mục lục",
  documentLabel: "Đề xuất hoàn chỉnh",
  downloadLabel: "Tải bản Markdown",
  downloadHint: "Văn bản dưới đây được kết xuất từ tệp nguồn Markdown.",
  ctaEyebrow: "Phương thức tham gia",
  ctaTitle: "Nhà đầu tư giai đoạn sớm",
  ctaBody:
    "Quy mô tham gia, cấu trúc thương vụ và điều khoản được thỏa thuận riêng biệt. Chúng tôi sẵn sàng trình diễn hạ tầng AI đang hoạt động, giới thiệu các sản phẩm hiện có và thảo luận về mô hình kinh doanh cũng như chiến lược mở rộng quy mô.",
  ctaButton: "Yêu cầu tài liệu nhà đầu tư",
};

const LOCALIZED_INVESTORS: Partial<Record<Locale, InvestorsPageCopy>> = {
  en: EN,
  ru: RU,
  es: ES,
  pt: PT,
  de: DE,
  fr: FR,
  zh: ZH,
  ar: AR,
  ja: JA,
  tr: TR,
  id: ID,
  vi: VI,
};

export function getInvestorsCopy(locale: Locale): InvestorsPageCopy {
  return LOCALIZED_INVESTORS[locale] ?? (locale === "ru" ? RU : EN);
}
