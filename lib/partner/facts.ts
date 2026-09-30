/**
 * Partner Hub facts that do not invent commercial claims.
 *
 * This module is imported by unit tests through a relative path, so it stays
 * free of other application imports (those use `@/` aliases Node cannot
 * resolve). Copy is either a published public-site sentence or a statement
 * about what this repository actually ships.
 */

export type PartnerProductId = "aime" | "assistant" | "showroom";

/** Approved PNG lockup and link-preview art that actually exist under /public. */
export const PARTNER_BRAND_ASSET_NAMES = {
  "lockup": {
    "en": "AI MARK lockup (PNG)",
    "ru": "Логотип AI MARK (PNG)",
    "es": "Logotipo AI MARK (PNG)",
    "pt": "Logótipo AI MARK (PNG)",
    "de": "AI MARK-Lockup (PNG)",
    "fr": "Lockup AI MARK (PNG)",
    "ja": "AI MARK ロゴ (PNG)",
    "tr": "AI MARK logosu (PNG)",
    "ar": "شعار AI MARK (PNG)",
    "zh": "AI MARK 标识 (PNG)",
    "id": "Logo AI MARK (PNG)",
    "vi": "Logo AI MARK (PNG)"
  },
  "compact": {
    "en": "Compact lockup (PNG)",
    "ru": "Компактный логотип (PNG)",
    "es": "Logotipo compacto (PNG)",
    "pt": "Logótipo compacto (PNG)",
    "de": "Kompaktes Lockup (PNG)",
    "fr": "Lockup compact (PNG)",
    "ja": "コンパクトロゴ (PNG)",
    "tr": "Kompakt logo (PNG)",
    "ar": "شعار مدمج (PNG)",
    "zh": "紧凑标识 (PNG)",
    "id": "Logo ringkas (PNG)",
    "vi": "Logo gọn (PNG)"
  },
  "mark": {
    "en": "AM mark (PNG)",
    "ru": "Знак AM (PNG)",
    "es": "Marca AM (PNG)",
    "pt": "Marca AM (PNG)",
    "de": "AM-Zeichen (PNG)",
    "fr": "Signe AM (PNG)",
    "ja": "AMマーク (PNG)",
    "tr": "AM işareti (PNG)",
    "ar": "رمز AM (PNG)",
    "zh": "AM 标记 (PNG)",
    "id": "Tanda AM (PNG)",
    "vi": "Dấu AM (PNG)"
  },
  "og-en": {
    "en": "Link preview (EN, 1200×630)",
    "ru": "Превью ссылки (EN, 1200×630)",
    "es": "Vista previa del enlace (EN, 1200×630)",
    "pt": "Pré-visualização do link (EN, 1200×630)",
    "de": "Link-Vorschau (EN, 1200×630)",
    "fr": "Aperçu de lien (EN, 1200×630)",
    "ja": "リンクプレビュー (EN, 1200×630)",
    "tr": "Link önizlemesi (EN, 1200×630)",
    "ar": "معاينة الرابط (EN, 1200×630)",
    "zh": "链接预览 (EN, 1200×630)",
    "id": "Pratinjau tautan (EN, 1200×630)",
    "vi": "Xem trước liên kết (EN, 1200×630)"
  },
  "og-ru": {
    "en": "Link preview (RU, 1200×630)",
    "ru": "Превью ссылки (RU, 1200×630)",
    "es": "Vista previa del enlace (RU, 1200×630)",
    "pt": "Pré-visualização do link (RU, 1200×630)",
    "de": "Link-Vorschau (RU, 1200×630)",
    "fr": "Aperçu de lien (RU, 1200×630)",
    "ja": "リンクプレビュー (RU, 1200×630)",
    "tr": "Link önizlemesi (RU, 1200×630)",
    "ar": "معاينة الرابط (RU, 1200×630)",
    "zh": "链接预览 (RU, 1200×630)",
    "id": "Pratinjau tautan (RU, 1200×630)",
    "vi": "Xem trước liên kết (RU, 1200×630)"
  }
} as const;

export const PARTNER_BRAND_ASSETS = [
  {
    id: "lockup",
    href: "/brand/ai-mark-logo.png",
    kind: "brand",
    nameEn: "AI MARK lockup (PNG)",
    nameRu: "Логотип AI MARK (PNG)",
  },
  {
    id: "compact",
    href: "/brand/ai-mark-logo-compact.png",
    kind: "brand",
    nameEn: "Compact lockup (PNG)",
    nameRu: "Компактный логотип (PNG)",
  },
  {
    id: "mark",
    href: "/brand/ai-mark-mark.png",
    kind: "brand",
    nameEn: "AM mark (PNG)",
    nameRu: "Знак AM (PNG)",
  },
  {
    id: "og-en",
    href: "/og/ai-mark-preview-en.jpg",
    kind: "preview",
    nameEn: "Link preview (EN, 1200×630)",
    nameRu: "Превью ссылки (EN, 1200×630)",
  },
  {
    id: "og-ru",
    href: "/og/ai-mark-preview-ru.jpg",
    kind: "preview",
    nameEn: "Link preview (RU, 1200×630)",
    nameRu: "Превью ссылки (RU, 1200×630)",
  },
] as const;

export type PartnerBrandAssetId = (typeof PARTNER_BRAND_ASSETS)[number]["id"];

/** Localized download label for a published brand asset. */
export function partnerBrandAssetName(locale: string, id: PartnerBrandAssetId): string {
  const names = PARTNER_BRAND_ASSET_NAMES[id];
  if (!names) return id;
  const key = locale as keyof typeof names;
  if (key in names) return names[key];
  return names.en;
}

/**
 * Limits taken from the public product pages. Not sales objections invented
 * for the partner programme.
 */
export type PartnerProductLimitsByLocale = Record<
  (typeof PARTNER_BRAND_ASSET_NAMES)["lockup"] extends Record<infer L, string> ? L : never,
  string[]
>;

export const PARTNER_PRODUCT_LIMITS: Record<PartnerProductId, PartnerProductLimitsByLocale> =
  {
  "aime": {
    "en": [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off."
    ],
    "es": [
      "No es un programador de publicaciones. AIME ejecuta un ciclo de marketing hasta la aprobación humana.",
      "El contenido se publica solo después de la aprobación humana en Telegram, a menos que se esté utilizando una ruta de publicación automática aprobada posteriormente.",
      "AIME publica en Instagram, Facebook, Threads y aprobación de Telegram.",
      "AIME no publicará precios, compromisos financieros, términos legales ni descuentos sin la aprobación humana explícita."
    ],
    "pt": [
      "Não é um agendador de postagem. AIME executa um ciclo de marketing até a aprovação humana.",
      "O conteúdo só vai ao ar após aprovação humana no Telegram, a menos que um caminho de publicação automática aprovado posteriormente esteja em uso.",
      "AIME publica com aprovação do Instagram, Facebook, Threads e Telegram.",
      "A AIME não publicará preços, compromissos financeiros, termos legais ou descontos sem aprovação humana explícita."
    ],
    "ru": [
      "Не планировщик постов. AIME ведёт маркетинговый цикл до апрува человека.",
      "Публикация только после апрува в Telegram, пока не включён согласованный автопаблиш.",
      "AIME публикует в Instagram, Facebook, Threads и через апрув в Telegram.",
      "AIME не публикует цены, финансовые обещания, юридические условия и скидки без явного апрува человека."
    ],
    "ar": [
      "ليس جدولة آخر. تدير AIME دورة تسويقية تصل إلى موافقة الإنسان.",
      "لا يتم نشر المحتوى إلا بعد موافقة الإنسان في Telegram، ما لم يتم استخدام مسار النشر التلقائي المعتمد لاحقًا.",
      "تنشر AIME موافقة على Instagram وFacebook وThreads وTelegram.",
      "لن تقوم AIME بنشر الأسعار أو الالتزامات المالية أو الشروط القانونية أو الخصومات دون موافقة بشرية صريحة."
    ],
    "zh": [
      "不是后期调度程序。 AIME 运行一个营销周期直至人工批准。",
      "内容仅在 Telegram 中经过人工批准后才会上线，除非使用后来批准的自动发布路径。",
      "AIME 发布内容需获得 Instagram、Facebook、Threads 和 Telegram 的批准。",
      "未经明确的人工签字，AIME 不会发布定价、财务承诺、法律条款或折扣。"
    ],
    "id": [
      "Bukan penjadwal posting. AIME menjalankan siklus pemasaran hingga persetujuan manusia.",
      "Konten ditayangkan hanya setelah persetujuan manusia di Telegram, kecuali jalur publikasi otomatis yang disetujui kemudian digunakan.",
      "AIME menerbitkan dengan persetujuan Instagram, Facebook, Threads, dan Telegram.",
      "AIME tidak akan mempublikasikan harga, komitmen keuangan, ketentuan hukum, atau diskon tanpa persetujuan manusia secara eksplisit."
    ],
    "vi": [
      "Không phải là một lịch trình bài viết. AIME thực hiện chu trình tiếp thị theo sự chấp thuận của con người.",
      "Nội dung chỉ xuất hiện sau khi có sự chấp thuận của con người trong Telegram, trừ khi đường dẫn tự động xuất bản được phê duyệt sau này được sử dụng.",
      "AIME xuất bản lên Instagram, Facebook, Threads và Telegram để được phê duyệt.",
      "AIME sẽ không công bố giá cả, cam kết tài chính, điều khoản pháp lý hoặc chiết khấu mà không có sự phê duyệt rõ ràng của con người."
    ],
    "de": [
      "Kein Postplaner. AIME führt einen Marketingzyklus bis zur menschlichen Zustimmung durch.",
      "Inhalte werden erst nach menschlicher Genehmigung in Telegram veröffentlicht, es sei denn, es wird ein später genehmigter automatischer Veröffentlichungspfad verwendet.",
      "AIME veröffentlicht mit Genehmigung von Instagram, Facebook, Threads und Telegram.",
      "AIME veröffentlicht keine Preise, finanziellen Verpflichtungen, rechtlichen Bedingungen oder Rabatte ohne ausdrückliche menschliche Genehmigung."
    ],
    "fr": [
      "Pas un planificateur de publication. AIME gère un cycle de commercialisation jusqu'à l'approbation humaine.",
      "Le contenu n'est mis en ligne qu'après approbation humaine dans Telegram, à moins qu'un chemin de publication automatique approuvé ultérieurement ne soit utilisé.",
      "AIME publie avec l'approbation d'Instagram, Facebook, Threads et Telegram.",
      "AIME ne publiera pas de prix, d'engagements financiers, de conditions juridiques ou de remises sans l'approbation humaine explicite."
    ],
    "ja": [
      "ポストスケジューラではありません。 AIME は人間の承認までマーケティング サイクルを実行します。",
      "後で承認された自動公開パスが使用されていない限り、コンテンツは Telegram で人間の承認後にのみ公開されます。",
      "AIME は、Instagram、Facebook、Threads、および Telegram の承認に公開します。",
      "AIME は、人間による明示的な承認がない限り、価格、金銭的約束、法的条件、または割引を公開しません。"
    ],
    "tr": [
      "Gönderi zamanlayıcı değil. AIME, insanların onayına kadar bir pazarlama döngüsü yürütür.",
      "İçerik, daha sonra onaylanmış bir otomatik yayınlama yolu kullanılmadığı sürece, yalnızca Telegram'da insan onayının ardından yayına girer.",
      "AIME, Instagram, Facebook, Threads ve Telegram onayıyla yayınlar.",
      "AIME, açık bir insan onayı olmadan fiyatlandırmayı, mali taahhütleri, yasal şartları veya indirimleri yayınlamayacaktır."
    ]
  },
  "assistant": {
    "en": [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account."
    ],
    "es": [
      "El asistente responde y califica. No calcula una propuesta comercial, eso es SHOWROOM AI.",
      "Responde desde la base de conocimientos del cliente. Si un precio o artículo no está documentado, lo dice en lugar de inventarlo.",
      "WhatsApp, Instagram y Messenger necesitan una cuenta Meta Business verificada."
    ],
    "pt": [
      "O assistente responde e se qualifica. Não calcula uma proposta comercial — isso é SHOWROOM AI.",
      "Ele responde a partir da base de conhecimento do cliente. Se um preço ou item não estiver documentado, ele o diz em vez de inventá-lo.",
      "WhatsApp, Instagram e Messenger precisam de uma conta Meta Business verificada."
    ],
    "ru": [
      "Ассистент отвечает и квалифицирует. Коммерческое предложение считает SHOWROOM AI.",
      "Отвечает по базе знаний клиента. Если цены или позиции нет в базе, он это говорит и не выдумывает.",
      "WhatsApp, Instagram и Messenger требуют верифицированный Meta Business аккаунт."
    ],
    "ar": [
      "يجيب المساعد ويتأهل. ولا يحسب العرض التجاري — أي SHOWROOM AI.",
      "إنه يجيب من قاعدة معارف العميل. إذا لم يتم توثيق سعر أو سلعة ما، يتم ذكر ذلك بدلاً من اختراع واحد.",
      "يحتاج WhatsApp وInstagram وMessenger إلى حساب Meta Business تم التحقق منه."
    ],
    "zh": [
      "助理回答并合格。它不计算商业提案——即 SHOWROOM AI。",
      "它从客户的知识库中给出答案。如果价格或商品没有记录，它会这样说，而不是发明一个。",
      "WhatsApp、Instagram 和 Messenger 需要经过验证的 Meta Business 帐户。"
    ],
    "id": [
      "Asisten menjawab dan memenuhi syarat. Itu tidak menghitung proposal komersial — yaitu SHOWROOM AI.",
      "Ini menjawab dari basis pengetahuan pelanggan. Jika suatu harga atau barang tidak didokumentasikan, maka perusahaan akan menyatakan demikian daripada menciptakannya.",
      "WhatsApp, Instagram, dan Messenger memerlukan akun Meta Business yang terverifikasi."
    ],
    "vi": [
      "Người trợ lý trả lời và xác nhận. Nó không tính toán một đề xuất thương mại - đó là SHOWROOM AI.",
      "Nó trả lời từ cơ sở kiến ​​thức của khách hàng. Nếu giá cả hoặc mặt hàng không được ghi lại, nó sẽ ghi như vậy thay vì phát minh ra giá đó.",
      "WhatsApp, Instagram và Messenger cần có tài khoản Meta Business đã được xác minh."
    ],
    "de": [
      "Der Assistent antwortet und qualifiziert. Es wird kein kommerzielles Angebot berechnet – das ist SHOWROOM AI.",
      "Es antwortet aus der Wissensdatenbank des Kunden. Wenn ein Preis oder Artikel nicht dokumentiert ist, wird dies angegeben, anstatt einen solchen zu erfinden.",
      "WhatsApp, Instagram und Messenger benötigen ein verifiziertes Meta Business-Konto."
    ],
    "fr": [
      "L'assistant répond et qualifie. Il ne calcule pas de proposition commerciale – c’est SHOWROOM AI.",
      "Il répond à partir de la base de connaissances du client. Si un prix ou un article n’est pas documenté, il le dit au lieu d’en inventer un.",
      "WhatsApp, Instagram et Messenger nécessitent un compte Meta Business vérifié."
    ],
    "ja": [
      "アシスタントが答えて資格を取得します。それは商業的な提案を計算するものではありません、それがSHOWROOM AIです。",
      "お客様のナレッジベースから回答します。価格や商品が文書化されていない場合、それを発明するのではなく、そのように記載します。",
      "WhatsApp、Instagram、Messenger には認証済みのメタ ビジネス アカウントが必要です。"
    ],
    "tr": [
      "Asistan cevap verir ve nitelendirir. Ticari bir teklif hesaplamaz; yani SHOWROOM AI.",
      "Müşterinin bilgi tabanından yanıt verir. Bir fiyat veya ürün belgelenmemişse, onu icat etmek yerine öyle yazıyor.",
      "WhatsApp, Instagram ve Messenger'ın doğrulanmış bir Meta Business hesabına ihtiyacı vardır."
    ]
  },
  "showroom": {
    "en": [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless."
    ],
    "es": [
      "No es un chatbot de soporte. SHOWROOM AI sirve para selección, reglas de precios y propuesta comercial.",
      "El precio no se compensa en la conversación. El cálculo sigue las fórmulas establecidas por el cliente.",
      "Esto no es una promesa de que las propias reglas del cliente sean perfectas."
    ],
    "pt": [
      "Não é um chatbot de suporte. SHOWROOM AI serve para seleção, regras de preços e proposta comercial.",
      "O preço não é inventado na conversa. O cálculo segue as fórmulas definidas pelo cliente.",
      "Isso não é uma promessa de que as regras do próprio cliente sejam perfeitas."
    ],
    "ru": [
      "Не чат поддержки. SHOWROOM AI — подбор, правила цены и коммерческое предложение.",
      "Цена не считается «из воздуха». Расчёт идёт по формулам, которые задал клиент.",
      "Это не обещание, что в правилах клиента нет ошибки."
    ],
    "ar": [
      "ليس دعم الدردشة. SHOWROOM AI مخصص للاختيار وقواعد التسعير والعرض التجاري.",
      "لا يتم تعويض السعر في المحادثة. يتبع الحساب الصيغ التي يحددها العميل.",
      "وهذا ليس وعدًا بأن قواعد العميل الخاصة لا تشوبها شائبة."
    ],
    "zh": [
      "不是支持聊天机器人。 SHOWROOM AI 用于选择、定价规则和商业提案。",
      "价格不是在谈话中补足的。计算遵循客户设定的公式。",
      "这并不是保证客户自己的规则完美无缺。"
    ],
    "id": [
      "Bukan chatbot dukungan. SHOWROOM AI untuk seleksi, aturan penetapan harga, dan proposal komersial.",
      "Harga tidak dibuat-buat dalam percakapan. Perhitungan mengikuti rumus yang ditetapkan pelanggan.",
      "Itu bukan berarti bahwa peraturan pelanggan itu sempurna."
    ],
    "vi": [
      "Không phải là một chatbot hỗ trợ. SHOWROOM AI dành cho việc lựa chọn, quy tắc định giá và đề xuất thương mại.",
      "Giá không được tạo thành trong cuộc trò chuyện. Tính toán theo công thức khách hàng đặt ra.",
      "Đó không phải là lời hứa rằng các quy tắc riêng của khách hàng là hoàn hảo."
    ],
    "de": [
      "Kein Support-Chatbot. SHOWROOM AI dient der Auswahl, Preisregeln und einem kommerziellen Angebot.",
      "Der Preis wird im Gespräch nicht ausgehandelt. Die Berechnung folgt den vom Kunden festgelegten Formeln.",
      "Das ist kein Versprechen, dass die eigenen Regeln des Kunden einwandfrei sind."
    ],
    "fr": [
      "Il ne s'agit pas d'un chatbot d'assistance. SHOWROOM AI est destiné à la sélection, aux règles de tarification et à la proposition commerciale.",
      "Le prix n’est pas fixé dans la conversation. Le calcul suit les formules définies par le client.",
      "Cela ne veut pas dire que les propres règles du client sont irréprochables."
    ],
    "ja": [
      "サポートチャットボットではありません。 SHOWROOM AIは、セレクション、価格設定ルール、商業提案を担当します。",
      "会話の中で値段が決まるわけではありません。計算はお客様が設定した計算式に従います。",
      "それは、顧客自身のルールが完璧であるという保証ではありません。"
    ],
    "tr": [
      "Destek sohbet robotu değil. SHOWROOM AI seçim, fiyatlandırma kuralları ve ticari teklif içindir.",
      "Fiyat görüşmede belirlenmemektedir. Hesaplama müşterinin belirlediği formüllere göre yapılır.",
      "Bu, müşterinin kendi kurallarının kusursuz olduğuna dair bir söz değildir."
    ]
  }
};

/** What a partner can actually show a customer today. */
export const PARTNER_DEMO_CHANNELS: Record<
  PartnerProductId,
  { page: `/${string}`; liveChat: boolean; panelDemo: boolean }
> = {
  aime: { page: "/ai-marketing-employee", liveChat: false, panelDemo: false },
  assistant: {
    page: "/ai-business-assistant",
    liveChat: true,
    panelDemo: true,
  },
  showroom: { page: "/showroom-ai", liveChat: false, panelDemo: false },
};

export function partnerHubLocale(locale: string): "en" | "ru" {
  return locale === "ru" ? "ru" : "en";
}
