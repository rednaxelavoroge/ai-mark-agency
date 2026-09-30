import type { Locale } from "@/lib/site";

export type HubLabels = {
  title: string;
  lead: string;
  startTitle: string;
  startLead: string;
  steps: { title: string; body: string }[];
  demosTitle: string;
  demosLead: string;
  openPage: string;
  openPay: string;
  liveChat: string;
  panelDemo: string;
  noSandbox: string;
  noDeck: string;
  materialsTitle: string;
  materialsLead: string;
  materialsMissing: string;
  download: string;
  knowledgeTitle: string;
  knowledgeLead: string;
  who: string;
  offer: string;
  price: string;
  limits: string;
  supportTitle: string;
  supportLead: string;
  includeId: string;
  noTickets: string;
  trackingTitle: string;
  trackingLead: string;
  tracking: { title: string; body: string }[];
};

export const HUB_LABELS: Record<Locale, HubLabels> = {
  "en": {
    "title": "Partner Hub",
    "lead": "Demos, product facts, brand files, and support for partners.",
    "startTitle": "How to start",
    "startLead": "Your Partner ID and referral link are ready with the account. Programme rules are confirmed with you during onboarding, before you sell.",
    "steps": [
      {
        "title": "Copy your referral link",
        "body": "It is on Dashboard and Profile. Share that link with the customer."
      },
      {
        "title": "Send a product page, not a guess",
        "body": "Use the product links on this page. Each one already carries your code."
      },
      {
        "title": "A visitor is attributed for 30 days",
        "body": "A visitor who opens your link stays attributed to you for 30 days."
      },
      {
        "title": "A lead is the contact form",
        "body": "Customers lists people who sent the site form while your link was active."
      },
      {
        "title": "A sale is a paid invoice",
        "body": "The customer pays on the product checkout. Commission is recorded after that payment is confirmed."
      },
      {
        "title": "Payouts are recorded by AI MARK",
        "body": "Save a USDC address on Profile. AI MARK records the payout and sends it there."
      }
    ],
    "demosTitle": "Demos and presentations",
    "demosLead": "The presentation is the live product page, already carrying your referral link.",
    "openPage": "Open product page with your link",
    "openPay": "Open checkout with your link",
    "liveChat": "Live AI Business Assistant widget on the public site (same widget visitors already see).",
    "panelDemo": "Interactive panel demo on the Assistant product page.",
    "noSandbox": "Open the live product page with your referral link.",
    "noDeck": "Share the live product page as the presentation.",
    "materialsTitle": "Marketing materials",
    "materialsLead": "Approved brand files and link-preview images, ready to download.",
    "materialsMissing": "These are the brand files published for partners.",
    "download": "Download",
    "knowledgeTitle": "Product knowledge",
    "knowledgeLead": "Positioning, audience, and list price from the public product pages.",
    "who": "Who it's for",
    "offer": "What it is",
    "price": "List price",
    "limits": "Limits (published)",
    "supportTitle": "Support",
    "supportLead": "Write to us on the same channels as the rest of the site, and include your Partner ID.",
    "includeId": "Include your Partner ID, the referral link you sent, and whether the issue is a click, a lead, a sale, or a payout.",
    "noTickets": "Programme rules are confirmed with you during onboarding, before you sell.",
    "trackingTitle": "What is tracked",
    "trackingLead": "These are the moments that stay attached to your referral link.",
    "tracking": [
      {
        "title": "Referral click",
        "body": "Opening your referral link records the visit."
      },
      {
        "title": "Contact lead",
        "body": "A person who sends the contact form while your link is active appears in Customers."
      },
      {
        "title": "Partner signup",
        "body": "A new partner who joins through your link is recorded in your network."
      },
      {
        "title": "Paid sale",
        "body": "A paid checkout keeps your referral code. Commission appears after the payment is confirmed."
      }
    ]
  },
  "es": {
    "title": "Partner Hub",
    "lead": "Demostraciones, información sobre productos, archivos de marca y soporte para socios.",
    "startTitle": "como empezar",
    "startLead": "Su ID de socio y su enlace de referencia están listos con la cuenta. Las reglas del programa se confirman con usted durante la incorporación, antes de vender.",
    "steps": [
      {
        "title": "Copia tu enlace de referencia",
        "body": "Está en el Panel y en el Perfil. Comparta ese vínculo con el cliente."
      },
      {
        "title": "Envíe una página de producto, no una suposición",
        "body": "Utilice los enlaces de productos en esta página. Cada uno ya lleva su código."
      },
      {
        "title": "A un visitante se le atribuyen 30 días",
        "body": "Un visitante que abre su enlace permanece atribuido a usted durante 30 días."
      },
      {
        "title": "Un cliente potencial es el formulario de contacto.",
        "body": "Clientes enumera las personas que enviaron el formulario del sitio mientras su enlace estaba activo."
      },
      {
        "title": "Una venta es una factura pagada.",
        "body": "El cliente paga al finalizar la compra del producto. La comisión se registra después de que se confirma el pago."
      },
      {
        "title": "Los pagos son registrados por AI MARK",
        "body": "Guarde una dirección del USDC en el perfil. AI MARK registra el pago y lo envía allí."
      }
    ],
    "demosTitle": "Demostraciones y presentaciones",
    "demosLead": "La presentación es la página del producto en vivo, que ya incluye su enlace de referencia.",
    "openPage": "Abra la página del producto con su enlace",
    "openPay": "Abra el pago con su enlace",
    "liveChat": "Widget Live AI Business Assistant en el sitio público (el mismo widget que los visitantes ya ven).",
    "panelDemo": "Demostración del panel interactivo en la página del producto Asistente.",
    "noSandbox": "Abra la página del producto en vivo con su enlace de referencia.",
    "noDeck": "Comparta la página del producto en vivo como presentación.",
    "materialsTitle": "Materiales de marketing",
    "materialsLead": "Archivos de marca aprobados e imágenes de vista previa de enlaces, listos para descargar.",
    "materialsMissing": "Estos son los archivos de marca publicados para socios.",
    "download": "Descargar",
    "knowledgeTitle": "Conocimiento del producto",
    "knowledgeLead": "Posicionamiento, audiencia y precio de lista de las páginas públicas de productos.",
    "who": "para quien es",
    "offer": "que es",
    "price": "Precio de lista",
    "limits": "Límites (publicado)",
    "supportTitle": "Apoyo",
    "supportLead": "Escríbanos en los mismos canales que el resto del sitio e incluya su ID de socio.",
    "includeId": "Incluya su ID de socio, el enlace de referencia que envió y si el problema es un clic, un cliente potencial, una venta o un pago.",
    "noTickets": "Las reglas del programa se confirman con usted durante la incorporación, antes de vender.",
    "trackingTitle": "¿Qué se rastrea?",
    "trackingLead": "Estos son los momentos que quedan adheridos a tu enlace de referido.",
    "tracking": [
      {
        "title": "Clic de referencia",
        "body": "Al abrir su enlace de referencia se registra la visita."
      },
      {
        "title": "Contacto potencial",
        "body": "En Clientes aparece una persona que envía el formulario de contacto mientras tu enlace está activo."
      },
      {
        "title": "Registro de socios",
        "body": "Un nuevo socio que se une a través de su enlace queda registrado en su red."
      },
      {
        "title": "Venta pagada",
        "body": "Un pago pago conserva su código de referencia. La comisión aparece después de que se confirma el pago."
      }
    ]
  },
  "pt": {
    "title": "Partner Hub",
    "lead": "Demonstrações, informações sobre produtos, arquivos de marcas e suporte para parceiros.",
    "startTitle": "Como começar",
    "startLead": "Seu ID de parceiro e link de referência estão prontos com a conta. As regras do programa são confirmadas com você durante a integração, antes da venda.",
    "steps": [
      {
        "title": "Copie seu link de indicação",
        "body": "Está no Dashboard e no Perfil. Compartilhe esse link com o cliente."
      },
      {
        "title": "Envie uma página de produto, não um palpite",
        "body": "Use os links de produtos nesta página. Cada um já carrega seu código."
      },
      {
        "title": "Um visitante é atribuído por 30 dias",
        "body": "Um visitante que abre seu link permanece atribuído a você por 30 dias."
      },
      {
        "title": "Um lead é o formulário de contato",
        "body": "Clientes lista pessoas que enviaram o formulário do site enquanto seu link estava ativo."
      },
      {
        "title": "Uma venda é uma fatura paga",
        "body": "O cliente paga na finalização da compra do produto. A comissão é registrada após a confirmação do pagamento."
      },
      {
        "title": "Os pagamentos são registrados por AI MARK",
        "body": "Salve um endereço USDC no perfil. AI MARK registra o pagamento e o envia para lá."
      }
    ],
    "demosTitle": "Demonstrações e apresentações",
    "demosLead": "A apresentação é a página ativa do produto, já contendo seu link de indicação.",
    "openPage": "Abra a página do produto com seu link",
    "openPay": "Abra a finalização da compra com seu link",
    "liveChat": "Widget Live AI Business Assistant no site público (o mesmo widget que os visitantes já veem).",
    "panelDemo": "Demonstração do painel interativo na página do produto Assistant.",
    "noSandbox": "Abra a página ativa do produto com seu link de indicação.",
    "noDeck": "Compartilhe a página do produto ao vivo como apresentação.",
    "materialsTitle": "Materiais de marketing",
    "materialsLead": "Arquivos de marca aprovados e imagens de visualização de links, prontos para download.",
    "materialsMissing": "Estes são os arquivos da marca publicados para parceiros.",
    "download": "Download",
    "knowledgeTitle": "Conhecimento do produto",
    "knowledgeLead": "Posicionamento, público-alvo e preço de tabela nas páginas públicas de produtos.",
    "who": "Para quem é",
    "offer": "O que é isso",
    "price": "Preço de tabela",
    "limits": "Limites (publicados)",
    "supportTitle": "Apoiar",
    "supportLead": "Escreva-nos nos mesmos canais do restante do site e inclua seu ID de parceiro.",
    "includeId": "Inclua seu ID de parceiro, o link de indicação que você enviou e se o problema é um clique, um lead, uma venda ou um pagamento.",
    "noTickets": "As regras do programa são confirmadas com você durante a integração, antes da venda.",
    "trackingTitle": "O que é rastreado",
    "trackingLead": "Esses são os momentos que ficam vinculados ao seu link de indicação.",
    "tracking": [
      {
        "title": "Clique de referência",
        "body": "Abrir seu link de indicação registra a visita."
      },
      {
        "title": "Contato principal",
        "body": "Uma pessoa que envia o formulário de contato enquanto seu link está ativo aparece em Clientes."
      },
      {
        "title": "Inscrição de parceiro",
        "body": "Um novo parceiro que adere através do seu link fica registrado na sua rede."
      },
      {
        "title": "Venda paga",
        "body": "Um checkout pago mantém seu código de referência. A comissão aparece após a confirmação do pagamento."
      }
    ]
  },
  "ru": {
    "title": "Partner Hub",
    "lead": "Демо, факты о продуктах, файлы бренда и поддержка для партнёров.",
    "startTitle": "Как начать",
    "startLead": "Partner ID и referral-ссылка готовы вместе с аккаунтом. Правила программы подтверждаем с вами на подключении, до первых продаж.",
    "steps": [
      {
        "title": "Скопируйте referral-ссылку",
        "body": "Она на главной кабинета и в профиле. Эту ссылку и отправляйте клиенту."
      },
      {
        "title": "Отправляйте страницу продукта",
        "body": "Ссылки на этой странице уже содержат ваш код."
      },
      {
        "title": "Посетитель атрибутируется 30 дней",
        "body": "Посетитель, открывший вашу ссылку, остаётся за вами 30 дней."
      },
      {
        "title": "Лид — это форма на сайте",
        "body": "В разделе клиентов — те, кто отправил форму на сайте, пока действовала ваша ссылка."
      },
      {
        "title": "Продажа — оплаченный инвойс",
        "body": "Клиент оплачивает продукт на странице оплаты. Комиссия записывается после подтверждения платежа."
      },
      {
        "title": "Выплату записывает AI MARK",
        "body": "Сохраните USDC-адрес в профиле. AI MARK записывает выплату и отправляет её туда."
      }
    ],
    "demosTitle": "Демо и презентации",
    "demosLead": "Презентация — живая страница продукта, уже с вашей referral-ссылкой.",
    "openPage": "Открыть страницу продукта по вашей ссылке",
    "openPay": "Открыть оплату по вашей ссылке",
    "liveChat": "Живой виджет AI Business Assistant на публичном сайте (тот же, что видит посетитель).",
    "panelDemo": "Интерактивное демо панели на странице ассистента.",
    "noSandbox": "Откройте живую страницу продукта по своей ссылке.",
    "noDeck": "Живая страница продукта и есть презентация.",
    "materialsTitle": "Рекламные материалы",
    "materialsLead": "Утверждённые файлы бренда и превью ссылок — их можно скачать.",
    "materialsMissing": "Это файлы бренда, опубликованные для партнёров.",
    "download": "Скачать",
    "knowledgeTitle": "База знаний по продуктам",
    "knowledgeLead": "Позиционирование, аудитория и цена с публичных страниц продуктов.",
    "who": "Кому подходит",
    "offer": "Что это",
    "price": "Цена прайса",
    "limits": "Ограничения (опубликованные)",
    "supportTitle": "Поддержка",
    "supportLead": "Пишите в те же каналы, что и на сайте, и укажите Partner ID.",
    "includeId": "Укажите Partner ID, какую ссылку отправили и это клик, лид, продажа или выплата.",
    "noTickets": "Правила программы подтверждаем с вами на подключении, до первых продаж.",
    "trackingTitle": "Что отслеживается",
    "trackingLead": "Вот моменты, которые остаются за вашей referral-ссылкой.",
    "tracking": [
      {
        "title": "Клик",
        "body": "Открытие вашей referral-ссылки записывает визит."
      },
      {
        "title": "Лид с формы",
        "body": "Человек, отправивший форму на сайте, пока действует ваша ссылка, появляется в клиентах."
      },
      {
        "title": "Регистрация партнёра",
        "body": "Новый партнёр, пришедший по вашей ссылке, записывается в вашу сеть."
      },
      {
        "title": "Оплаченная продажа",
        "body": "Оплаченный счёт сохраняет ваш referral-код. Комиссия появляется после подтверждения оплаты."
      }
    ]
  },
  "ar": {
    "title": "Partner Hub",
    "lead": "العروض التوضيحية وحقائق المنتج وملفات العلامات التجارية ودعم الشركاء.",
    "startTitle": "كيف تبدأ",
    "startLead": "معرف الشريك الخاص بك ورابط الإحالة جاهزان مع الحساب. يتم تأكيد قواعد البرنامج معك أثناء الإعداد، قبل البيع.",
    "steps": [
      {
        "title": "انسخ رابط الإحالة الخاص بك",
        "body": "إنه موجود على لوحة المعلومات والملف الشخصي. شارك هذا الرابط مع العميل."
      },
      {
        "title": "أرسل صفحة المنتج، وليس التخمين",
        "body": "استخدم روابط المنتج في هذه الصفحة. كل واحد يحمل الرمز الخاص بك بالفعل."
      },
      {
        "title": "وينسب الزائر لمدة 30 يوما",
        "body": "يبقى الزائر الذي يفتح الرابط الخاص بك منسوبًا إليك لمدة 30 يومًا."
      },
      {
        "title": "الرصاص هو نموذج الاتصال",
        "body": "يسرد العملاء الأشخاص الذين أرسلوا نموذج الموقع بينما كان الارتباط الخاص بك نشطًا."
      },
      {
        "title": "البيع عبارة عن فاتورة مدفوعة",
        "body": "يدفع العميل عند الخروج من المنتج. يتم تسجيل العمولة بعد تأكيد الدفع."
      },
      {
        "title": "يتم تسجيل العوائد بواسطة AI MARK",
        "body": "احفظ عنوان USDC في الملف الشخصي. يسجل AI MARK الدفع ويرسله هناك."
      }
    ],
    "demosTitle": "العروض التوضيحية والعروض التقديمية",
    "demosLead": "العرض التقديمي عبارة عن صفحة المنتج المباشرة، والتي تحمل بالفعل رابط الإحالة الخاص بك.",
    "openPage": "افتح صفحة المنتج بالرابط الخاص بك",
    "openPay": "افتح الخروج مع الرابط الخاص بك",
    "liveChat": "أداة Live AI Business Assistant على الموقع العام (نفس الأداة التي يراها زوار الأداة بالفعل).",
    "panelDemo": "عرض توضيحي للوحة التفاعلية على صفحة منتج المساعد.",
    "noSandbox": "افتح صفحة المنتج المباشر باستخدام رابط الإحالة الخاص بك.",
    "noDeck": "شارك صفحة المنتج المباشرة كعرض تقديمي.",
    "materialsTitle": "مواد تسويقية",
    "materialsLead": "ملفات العلامة التجارية المعتمدة وصور معاينة الرابط، جاهزة للتنزيل.",
    "materialsMissing": "هذه هي ملفات العلامة التجارية المنشورة للشركاء.",
    "download": "تحميل",
    "knowledgeTitle": "معرفة المنتج",
    "knowledgeLead": "تحديد المواقع والجمهور وقائمة الأسعار من صفحات المنتجات العامة.",
    "who": "لمن هذا؟",
    "offer": "ما هو عليه",
    "price": "سعر القائمة",
    "limits": "الحدود (منشورة)",
    "supportTitle": "يدعم",
    "supportLead": "راسلنا على نفس القنوات مثل بقية الموقع، وقم بتضمين معرف الشريك الخاص بك.",
    "includeId": "قم بتضمين معرف الشريك الخاص بك، ورابط الإحالة الذي أرسلته، وما إذا كانت المشكلة تتعلق بنقرة أو عميل محتمل أو بيع أو دفع تعويضات.",
    "noTickets": "يتم تأكيد قواعد البرنامج معك أثناء الإعداد، قبل البيع.",
    "trackingTitle": "ما يتم تعقبه",
    "trackingLead": "هذه هي اللحظات التي تظل مرتبطة برابط الإحالة الخاص بك.",
    "tracking": [
      {
        "title": "انقر فوق الإحالة",
        "body": "يؤدي فتح رابط الإحالة الخاص بك إلى تسجيل الزيارة."
      },
      {
        "title": "الاتصال الرصاص",
        "body": "يظهر الشخص الذي يرسل نموذج الاتصال بينما يكون الارتباط الخاص بك نشطًا في العملاء."
      },
      {
        "title": "تسجيل الشريك",
        "body": "يتم تسجيل الشريك الجديد الذي ينضم من خلال الرابط الخاص بك في شبكتك."
      },
      {
        "title": "بيع مدفوع الأجر",
        "body": "يحتفظ الدفع المدفوع برمز الإحالة الخاص بك. تظهر العمولة بعد تأكيد الدفع."
      }
    ]
  },
  "zh": {
    "title": "Partner Hub",
    "lead": "演示、产品事实、品牌文件以及对合作伙伴的支持。",
    "startTitle": "如何开始",
    "startLead": "您的合作伙伴 ID 和推荐链接已随帐户准备就绪。在销售之前，我们会在入职期间与您确认计划规则。",
    "steps": [
      {
        "title": "复制您的推荐链接",
        "body": "它位于仪表板和配置文件上。与客户分享该链接。"
      },
      {
        "title": "发送产品页面，而不是猜测",
        "body": "使用此页面上的产品链接。每一个都已经带有您的代码。"
      },
      {
        "title": "访客的归因期限为 30 天",
        "body": "打开您的链接的访问者将在 30 天内保留为您的身份。"
      },
      {
        "title": "潜在客户是联系表格",
        "body": "客户列出了在您的链接处于活动状态时发送网站表单的人员。"
      },
      {
        "title": "销售是已付款的发票",
        "body": "客户在产品结账时付款。确认付款后将记录佣金。"
      },
      {
        "title": "支出由 AI MARK 记录",
        "body": "在个人资料上保存 USDC 地址。 AI MARK 记录付款并将其发送到那里。"
      }
    ],
    "demosTitle": "演示和演示",
    "demosLead": "该演示文稿是实时产品页面，已经带有您的推荐链接。",
    "openPage": "使用您的链接打开产品页面",
    "openPay": "使用您的链接打开结账",
    "liveChat": "公共网站上的实时人工智能业务助手小部件（访问者已经看到相同的小部件）。",
    "panelDemo": "Assistant 产品页面上的交互式面板演示。",
    "noSandbox": "使用您的推荐链接打开实时产品页面。",
    "noDeck": "分享实时产品页面作为演示。",
    "materialsTitle": "营销材料",
    "materialsLead": "已批准的品牌文件和链接预览图像，可供下载。",
    "materialsMissing": "这些是为合作伙伴发布的品牌文件。",
    "download": "下载",
    "knowledgeTitle": "产品知识",
    "knowledgeLead": "公共产品页面的定位、受众和标价。",
    "who": "这是给谁的",
    "offer": "它是什么",
    "price": "标价",
    "limits": "限制（已发布）",
    "supportTitle": "支持",
    "supportLead": "通过与网站其他部分相同的渠道给我们写信，并附上您的合作伙伴 ID。",
    "includeId": "包括您的合作伙伴 ID、您发送的推荐链接以及问题是点击、潜在客户、销售还是付款。",
    "noTickets": "在销售之前，我们会在入职期间与您确认计划规则。",
    "trackingTitle": "追踪什么",
    "trackingLead": "这些是与您的推荐链接保持联系的时刻。",
    "tracking": [
      {
        "title": "推荐点击",
        "body": "打开您的推荐链接会记录这次访问。"
      },
      {
        "title": "联系线索",
        "body": "当您的链接处于活动状态时发送联系表单的人员会出现在“客户”中。"
      },
      {
        "title": "合作伙伴注册",
        "body": "通过您的链接加入的新合作伙伴将记录在您的网络中。"
      },
      {
        "title": "付费销售",
        "body": "付费结账会保留您的推荐代码。确认付款后会出现佣金。"
      }
    ]
  },
  "id": {
    "title": "Partner Hub",
    "lead": "Demo, fakta produk, file merek, dan dukungan untuk mitra.",
    "startTitle": "Bagaimana memulainya",
    "startLead": "ID Mitra dan tautan rujukan Anda sudah siap dengan akun. Aturan program dikonfirmasikan kepada Anda selama orientasi, sebelum Anda menjual.",
    "steps": [
      {
        "title": "Salin tautan rujukan Anda",
        "body": "Itu ada di Dashboard dan Profil. Bagikan tautan itu dengan pelanggan."
      },
      {
        "title": "Kirim halaman produk, bukan tebakan",
        "body": "Gunakan tautan produk di halaman ini. Masing-masing sudah membawa kode Anda."
      },
      {
        "title": "Seorang pengunjung diatribusikan selama 30 hari",
        "body": "Pengunjung yang membuka tautan Anda akan tetap dikaitkan dengan Anda selama 30 hari."
      },
      {
        "title": "Prospek adalah formulir kontak",
        "body": "Pelanggan mencantumkan orang-orang yang mengirimkan formulir situs saat tautan Anda aktif."
      },
      {
        "title": "Penjualan adalah faktur yang dibayar",
        "body": "Pelanggan membayar pada saat checkout produk. Komisi dicatat setelah pembayaran dikonfirmasi."
      },
      {
        "title": "Pembayaran dicatat oleh AI MARK",
        "body": "Simpan alamat USDC di Profil. AI MARK mencatat pembayaran dan mengirimkannya ke sana."
      }
    ],
    "demosTitle": "Demo dan presentasi",
    "demosLead": "Presentasinya adalah halaman produk langsung, sudah membawa link referral Anda.",
    "openPage": "Buka halaman produk dengan tautan Anda",
    "openPay": "Buka pembayaran dengan tautan Anda",
    "liveChat": "Widget AI Business Assistant langsung di situs publik (widget yang sama sudah dilihat pengunjung).",
    "panelDemo": "Demo panel interaktif di halaman produk Asisten.",
    "noSandbox": "Buka halaman produk langsung dengan tautan referensi Anda.",
    "noDeck": "Bagikan halaman produk langsung sebagai presentasi.",
    "materialsTitle": "Materi pemasaran",
    "materialsLead": "File merek dan gambar pratinjau tautan yang disetujui, siap diunduh.",
    "materialsMissing": "Ini adalah file merek yang dipublikasikan untuk mitra.",
    "download": "Unduh",
    "knowledgeTitle": "Pengetahuan produk",
    "knowledgeLead": "Positioning, audiens, dan daftar harga dari halaman produk publik.",
    "who": "Untuk siapa ini",
    "offer": "Apa itu",
    "price": "Daftar harga",
    "limits": "Batasan (diterbitkan)",
    "supportTitle": "Mendukung",
    "supportLead": "Kirimkan surat kepada kami di saluran yang sama dengan situs lainnya, dan sertakan ID Mitra Anda.",
    "includeId": "Sertakan ID Mitra Anda, tautan rujukan yang Anda kirimkan, dan apakah masalahnya berupa klik, prospek, penjualan, atau pembayaran.",
    "noTickets": "Aturan program dikonfirmasikan kepada Anda selama orientasi, sebelum Anda menjual.",
    "trackingTitle": "Apa yang dilacak",
    "trackingLead": "Inilah momen-momen yang tetap melekat pada link referral Anda.",
    "tracking": [
      {
        "title": "Klik rujukan",
        "body": "Membuka tautan rujukan Anda mencatat kunjungan tersebut."
      },
      {
        "title": "Hubungi pemimpin",
        "body": "Seseorang yang mengirimkan formulir kontak saat tautan Anda aktif muncul di Pelanggan."
      },
      {
        "title": "Pendaftaran mitra",
        "body": "Mitra baru yang bergabung melalui tautan Anda tercatat di jaringan Anda."
      },
      {
        "title": "Penjualan berbayar",
        "body": "Pembayaran berbayar menyimpan kode referensi Anda. Komisi muncul setelah pembayaran dikonfirmasi."
      }
    ]
  },
  "vi": {
    "title": "Partner Hub",
    "lead": "Bản demo, thông tin sản phẩm, hồ sơ thương hiệu và hỗ trợ dành cho đối tác.",
    "startTitle": "Làm thế nào để bắt đầu",
    "startLead": "ID đối tác và liên kết giới thiệu của bạn đã sẵn sàng với tài khoản. Các quy tắc của chương trình sẽ được xác nhận với bạn trong quá trình giới thiệu, trước khi bạn bán.",
    "steps": [
      {
        "title": "Sao chép liên kết giới thiệu của bạn",
        "body": "Nó nằm trên Bảng điều khiển và Hồ sơ. Chia sẻ liên kết đó với khách hàng."
      },
      {
        "title": "Gửi một trang sản phẩm, không phải đoán",
        "body": "Sử dụng các liên kết sản phẩm trên trang này. Mỗi người đã mang mã của bạn."
      },
      {
        "title": "Một khách truy cập được tính trong 30 ngày",
        "body": "Khách truy cập mở liên kết của bạn sẽ được ghi nhận là bạn trong 30 ngày."
      },
      {
        "title": "Khách hàng tiềm năng là biểu mẫu liên hệ",
        "body": "Khách hàng liệt kê những người đã gửi biểu mẫu trang web trong khi liên kết của bạn đang hoạt động."
      },
      {
        "title": "Bán hàng là hoá đơn đã thanh toán",
        "body": "Khách hàng thanh toán khi kiểm tra sản phẩm. Hoa hồng được ghi lại sau khi khoản thanh toán đó được xác nhận."
      },
      {
        "title": "Các khoản thanh toán được ghi lại bởi AI MARK",
        "body": "Lưu địa chỉ USDC trên Hồ sơ. AI MARK ghi lại khoản thanh toán và gửi nó đến đó."
      }
    ],
    "demosTitle": "Demo và thuyết trình",
    "demosLead": "Bản trình bày là trang sản phẩm trực tiếp, đã mang theo liên kết giới thiệu của bạn.",
    "openPage": "Mở trang sản phẩm bằng liên kết của bạn",
    "openPay": "Mở thanh toán bằng liên kết của bạn",
    "liveChat": "Tiện ích Trợ lý doanh nghiệp AI trực tiếp trên trang web công cộng (cùng một tiện ích mà khách truy cập đã thấy).",
    "panelDemo": "Bản trình diễn bảng tương tác trên trang sản phẩm Trợ lý.",
    "noSandbox": "Mở trang sản phẩm trực tiếp với liên kết giới thiệu của bạn.",
    "noDeck": "Chia sẻ trang sản phẩm trực tiếp dưới dạng bài thuyết trình.",
    "materialsTitle": "Tài liệu tiếp thị",
    "materialsLead": "Các tập tin thương hiệu và hình ảnh xem trước liên kết đã được phê duyệt, sẵn sàng để tải xuống.",
    "materialsMissing": "Đây là những tập tin thương hiệu được xuất bản cho đối tác.",
    "download": "Tải xuống",
    "knowledgeTitle": "Kiến thức sản phẩm",
    "knowledgeLead": "Định vị, đối tượng và giá niêm yết từ các trang sản phẩm công khai.",
    "who": "Nó dành cho ai",
    "offer": "Nó là gì",
    "price": "Giá niêm yết",
    "limits": "Giới hạn (đã xuất bản)",
    "supportTitle": "Ủng hộ",
    "supportLead": "Viết thư cho chúng tôi trên cùng các kênh với phần còn lại của trang web và bao gồm ID đối tác của bạn.",
    "includeId": "Bao gồm ID đối tác của bạn, liên kết giới thiệu bạn đã gửi và vấn đề là nhấp chuột, khách hàng tiềm năng, bán hàng hay thanh toán.",
    "noTickets": "Các quy tắc của chương trình sẽ được xác nhận với bạn trong quá trình giới thiệu, trước khi bạn bán.",
    "trackingTitle": "Những gì được theo dõi",
    "trackingLead": "Đây là những khoảnh khắc được gắn liền với liên kết giới thiệu của bạn.",
    "tracking": [
      {
        "title": "Nhấp chuột giới thiệu",
        "body": "Mở liên kết giới thiệu của bạn ghi lại lượt truy cập."
      },
      {
        "title": "Liên hệ khách hàng tiềm năng",
        "body": "Người gửi biểu mẫu liên hệ trong khi liên kết của bạn đang hoạt động sẽ xuất hiện trong Khách hàng."
      },
      {
        "title": "Đăng ký đối tác",
        "body": "Một đối tác mới tham gia thông qua liên kết của bạn sẽ được ghi lại vào mạng của bạn."
      },
      {
        "title": "Bán trả phí",
        "body": "Thanh toán trả phí sẽ giữ mã giới thiệu của bạn. Hoa hồng xuất hiện sau khi thanh toán được xác nhận."
      }
    ]
  },
  "de": {
    "title": "Partner Hub",
    "lead": "Demos, Produktfakten, Markendateien und Support für Partner.",
    "startTitle": "Wie fange ich an?",
    "startLead": "Ihre Partner-ID und Ihr Empfehlungslink liegen zusammen mit dem Konto bereit. Die Programmregeln werden beim Onboarding vor dem Verkauf mit Ihnen bestätigt.",
    "steps": [
      {
        "title": "Kopieren Sie Ihren Empfehlungslink",
        "body": "Es befindet sich im Dashboard und im Profil. Teilen Sie diesen Link mit dem Kunden."
      },
      {
        "title": "Senden Sie eine Produktseite, keine Vermutung",
        "body": "Nutzen Sie die Produktlinks auf dieser Seite. Jeder trägt bereits Ihren Code."
      },
      {
        "title": "Ein Besucher wird 30 Tage lang zugeordnet",
        "body": "Ein Besucher, der Ihren Link öffnet, bleibt Ihnen 30 Tage lang zugeordnet."
      },
      {
        "title": "Ein Lead ist das Kontaktformular",
        "body": "Unter „Kunden“ werden Personen aufgeführt, die das Website-Formular gesendet haben, während Ihr Link aktiv war."
      },
      {
        "title": "Ein Verkauf ist eine bezahlte Rechnung",
        "body": "Der Kunde bezahlt an der Produktkasse. Die Provision wird erfasst, nachdem die Zahlung bestätigt wurde."
      },
      {
        "title": "Auszahlungen werden von AI MARK erfasst",
        "body": "Speichern Sie eine USDC-Adresse im Profil. AI MARK erfasst die Auszahlung und sendet sie dorthin."
      }
    ],
    "demosTitle": "Demos und Präsentationen",
    "demosLead": "Bei der Präsentation handelt es sich um die Live-Produktseite, die bereits Ihren Empfehlungslink enthält.",
    "openPage": "Öffnen Sie die Produktseite mit Ihrem Link",
    "openPay": "Öffnen Sie die Kasse mit Ihrem Link",
    "liveChat": "Live-Widget „AI Business Assistant“ auf der öffentlichen Website (dieselben Widget sehen Besucher bereits).",
    "panelDemo": "Interaktive Panel-Demo auf der Assistant-Produktseite.",
    "noSandbox": "Öffnen Sie die Live-Produktseite mit Ihrem Empfehlungslink.",
    "noDeck": "Teilen Sie die Live-Produktseite als Präsentation.",
    "materialsTitle": "Marketingmaterialien",
    "materialsLead": "Genehmigte Markendateien und Link-Vorschaubilder, bereit zum Herunterladen.",
    "materialsMissing": "Dies sind die für Partner veröffentlichten Markendateien.",
    "download": "Herunterladen",
    "knowledgeTitle": "Produktkenntnisse",
    "knowledgeLead": "Positionierung, Zielgruppe und Listenpreis auf den öffentlichen Produktseiten.",
    "who": "Für wen es ist",
    "offer": "Was es ist",
    "price": "Listenpreis",
    "limits": "Grenzwerte (veröffentlicht)",
    "supportTitle": "Unterstützung",
    "supportLead": "Schreiben Sie uns über dieselben Kanäle wie der Rest der Website und geben Sie Ihre Partner-ID an.",
    "includeId": "Geben Sie Ihre Partner-ID, den von Ihnen gesendeten Empfehlungslink und an, ob es sich bei dem Problem um einen Klick, einen Lead, einen Verkauf oder eine Auszahlung handelt.",
    "noTickets": "Die Programmregeln werden beim Onboarding vor dem Verkauf mit Ihnen bestätigt.",
    "trackingTitle": "Was wird verfolgt?",
    "trackingLead": "Dies sind die Momente, die mit Ihrem Empfehlungslink verbunden bleiben.",
    "tracking": [
      {
        "title": "Empfehlungsklick",
        "body": "Durch das Öffnen Ihres Empfehlungslinks wird der Besuch aufgezeichnet."
      },
      {
        "title": "Kontaktleitung",
        "body": "Eine Person, die das Kontaktformular sendet, während Ihr Link aktiv ist, wird unter „Kunden“ angezeigt."
      },
      {
        "title": "Partneranmeldung",
        "body": "Ein neuer Partner, der über Ihren Link beitritt, wird in Ihrem Netzwerk erfasst."
      },
      {
        "title": "Bezahlter Verkauf",
        "body": "Bei einer kostenpflichtigen Kaufabwicklung bleibt Ihr Empfehlungscode erhalten. Die Provision erscheint, nachdem die Zahlung bestätigt wurde."
      }
    ]
  },
  "fr": {
    "title": "Partner Hub",
    "lead": "Démos, informations sur les produits, fichiers de marque et assistance aux partenaires.",
    "startTitle": "Comment commencer",
    "startLead": "Votre identifiant de partenaire et votre lien de parrainage sont prêts avec le compte. Les règles du programme sont confirmées avec vous lors de l'intégration, avant votre vente.",
    "steps": [
      {
        "title": "Copiez votre lien de parrainage",
        "body": "C'est sur le tableau de bord et le profil. Partagez ce lien avec le client."
      },
      {
        "title": "Envoyez une page produit, pas une supposition",
        "body": "Utilisez les liens de produits sur cette page. Chacun porte déjà votre code."
      },
      {
        "title": "Un visiteur est attribué pour 30 jours",
        "body": "Un visiteur qui ouvre votre lien vous reste attribué pendant 30 jours."
      },
      {
        "title": "Un prospect est le formulaire de contact",
        "body": "Clients répertorie les personnes qui ont envoyé le formulaire du site alors que votre lien était actif."
      },
      {
        "title": "Une vente est une facture payée",
        "body": "Le client paie à la caisse du produit. La commission est enregistrée après confirmation du paiement."
      },
      {
        "title": "Les paiements sont enregistrés par AI MARK",
        "body": "Enregistrez une adresse USDC sur le profil. AI MARK enregistre le paiement et l'envoie là-bas."
      }
    ],
    "demosTitle": "Démos et présentations",
    "demosLead": "La présentation est la page produit en direct, portant déjà votre lien de parrainage.",
    "openPage": "Ouvrez la page produit avec votre lien",
    "openPay": "Ouvrez la caisse avec votre lien",
    "liveChat": "Widget Live AI Business Assistant sur le site public (même widget que les visiteurs voient déjà).",
    "panelDemo": "Démo du panneau interactif sur la page produit de l'Assistant.",
    "noSandbox": "Ouvrez la page produit en direct avec votre lien de parrainage.",
    "noDeck": "Partagez la page produit en direct comme présentation.",
    "materialsTitle": "Matériel de marketing",
    "materialsLead": "Fichiers de marque approuvés et images d'aperçu des liens, prêts à être téléchargés.",
    "materialsMissing": "Ce sont les fiches de marque publiées pour les partenaires.",
    "download": "Télécharger",
    "knowledgeTitle": "Connaissance des produits",
    "knowledgeLead": "Positionnement, audience et prix catalogue à partir des pages de produits publiques.",
    "who": "Pour qui c'est",
    "offer": "Qu'est-ce que c'est",
    "price": "Prix ​​catalogue",
    "limits": "Limites (publiées)",
    "supportTitle": "Soutien",
    "supportLead": "Écrivez-nous sur les mêmes canaux que le reste du site et incluez votre identifiant de partenaire.",
    "includeId": "Incluez votre identifiant de partenaire, le lien de parrainage que vous avez envoyé et indiquez s'il s'agit d'un clic, d'un prospect, d'une vente ou d'un paiement.",
    "noTickets": "Les règles du programme sont confirmées avec vous lors de l'intégration, avant votre vente.",
    "trackingTitle": "Qu'est-ce qui est suivi",
    "trackingLead": "Ce sont ces moments qui restent attachés à votre lien de parrainage.",
    "tracking": [
      {
        "title": "Clic de référence",
        "body": "L'ouverture de votre lien de parrainage enregistre la visite."
      },
      {
        "title": "Contacter le responsable",
        "body": "Une personne qui envoie le formulaire de contact alors que votre lien est actif apparaît dans Clients."
      },
      {
        "title": "Inscription partenaire",
        "body": "Un nouveau partenaire qui rejoint via votre lien est enregistré dans votre réseau."
      },
      {
        "title": "Vente payante",
        "body": "Un paiement payant conserve votre code de parrainage. La commission apparaît après la confirmation du paiement."
      }
    ]
  },
  "ja": {
    "title": "Partner Hub",
    "lead": "デモ、製品の事実、ブランド ファイル、パートナー向けのサポート。",
    "startTitle": "始め方",
    "startLead": "パートナー ID と紹介リンクがアカウントに用意されています。プログラム ルールは、販売前のオンボーディング中に確認されます。",
    "steps": [
      {
        "title": "紹介リンクをコピーする",
        "body": "ダッシュボードとプロフィールにあります。そのリンクを顧客と共有します。"
      },
      {
        "title": "推測ではなく製品ページを送信してください",
        "body": "このページの製品リンクを使用してください。それぞれにすでにコードが含まれています。"
      },
      {
        "title": "訪問者は 30 日間帰属されます",
        "body": "あなたのリンクを開いた訪問者は、30 日間あなたに帰属されます。"
      },
      {
        "title": "リードとは問い合わせフォームのことです",
        "body": "[顧客] には、リンクがアクティブだったときにサイト フォームを送信した人のリストが表示されます。"
      },
      {
        "title": "売上は支払い済みの請求書です",
        "body": "顧客は製品のチェックアウト時に支払います。コミッションは支払いが確認された後に記録されます。"
      },
      {
        "title": "支払いはAI MARKによって記録されます",
        "body": "USDCアドレスをプロフィールに保存します。 AI MARK は支払いを記録し、そこに送信します。"
      }
    ],
    "demosTitle": "デモとプレゼンテーション",
    "demosLead": "プレゼンテーションはライブの製品ページであり、すでに紹介リンクが含まれています。",
    "openPage": "リンクを使用して製品ページを開く",
    "openPay": "リンクを使用してチェックアウトを開く",
    "liveChat": "公開サイトの Live AI Business Assistant ウィジェット (訪問者が既に表示しているものと同じウィジェット)。",
    "panelDemo": "アシスタント製品ページのインタラクティブ パネル デモ。",
    "noSandbox": "紹介リンクを含む実際の製品ページを開きます。",
    "noDeck": "ライブ製品ページをプレゼンテーションとして共有します。",
    "materialsTitle": "マーケティング資料",
    "materialsLead": "承認されたブランド ファイルとリンク プレビュー画像をダウンロードできるようになりました。",
    "materialsMissing": "これらはパートナー向けに公開されたブランド ファイルです。",
    "download": "ダウンロード",
    "knowledgeTitle": "製品知識",
    "knowledgeLead": "公開製品ページからのポジショニング、対象ユーザー、および定価。",
    "who": "誰のためのものか",
    "offer": "それは何ですか",
    "price": "定価",
    "limits": "制限（公開済み）",
    "supportTitle": "サポート",
    "supportLead": "サイトの他の部分と同じチャネルで、パートナー ID を含めてご連絡ください。",
    "includeId": "パートナー ID、送信した紹介リンク、問題がクリック、リード、販売、支払いのいずれであるかを含めます。",
    "noTickets": "プログラム ルールは、販売前のオンボーディング中に確認されます。",
    "trackingTitle": "追跡されるもの",
    "trackingLead": "これらは、紹介リンクに関連付けられたままになる瞬間です。",
    "tracking": [
      {
        "title": "紹介クリック",
        "body": "紹介リンクを開くと訪問が記録されます。"
      },
      {
        "title": "コンタクトリード",
        "body": "リンクがアクティブなときに問い合わせフォームを送信した人は、[顧客] に表示されます。"
      },
      {
        "title": "パートナーのサインアップ",
        "body": "リンクを通じて参加した新しいパートナーはネットワークに記録されます。"
      },
      {
        "title": "有料販売",
        "body": "有料チェックアウトでは紹介コードが保持されます。コミッションは支払いが確認された後に表示されます。"
      }
    ]
  },
  "tr": {
    "title": "Partner Hub",
    "lead": "Demolar, ürün bilgileri, marka dosyaları ve iş ortakları için destek.",
    "startTitle": "Nasıl başlanır",
    "startLead": "İş Ortağı Kimliğiniz ve yönlendirme bağlantınız hesapla birlikte hazır. Program kuralları, satış öncesinde, katılım sırasında sizinle birlikte onaylanır.",
    "steps": [
      {
        "title": "Yönlendirme bağlantınızı kopyalayın",
        "body": "Kontrol Panelinde ve Profilde bulunur. Bu bağlantıyı müşteriyle paylaşın."
      },
      {
        "title": "Tahmin değil, ürün sayfası gönderin",
        "body": "Bu sayfadaki ürün bağlantılarını kullanın. Her biri zaten sizin kodunuzu taşıyor."
      },
      {
        "title": "Bir ziyaretçi 30 gün süreyle ilişkilendirilir",
        "body": "Bağlantınızı açan bir ziyaretçi 30 gün boyunca sizinle ilişkilendirilmiş olarak kalır."
      },
      {
        "title": "Potansiyel müşteri iletişim formudur",
        "body": "Müşteriler, bağlantınız etkinken site formunu gönderen kişileri listeler."
      },
      {
        "title": "Satış ödenmiş bir faturadır",
        "body": "Müşteri ürün ödemesinde ödeme yapar. Ödeme onaylandıktan sonra komisyon kaydedilir."
      },
      {
        "title": "Ödemeler AI MARK tarafından kaydedilir",
        "body": "Profile bir USDC adresi kaydedin. AI MARK ödemeyi kaydeder ve oraya gönderir."
      }
    ],
    "demosTitle": "Demolar ve sunumlar",
    "demosLead": "Sunum, halihazırda yönlendirme bağlantınızı taşıyan canlı ürün sayfasıdır.",
    "openPage": "Bağlantınızı içeren ürün sayfasını açın",
    "openPay": "Ödemeyi bağlantınızla açın",
    "liveChat": "Genel sitedeki Canlı Yapay Zeka İş Asistanı widget'ı (ziyaretçilerin zaten gördüğü widget'ın aynısı).",
    "panelDemo": "Asistan ürün sayfasında etkileşimli panel demosu.",
    "noSandbox": "Yönlendirme bağlantınızı içeren canlı ürün sayfasını açın.",
    "noDeck": "Canlı ürün sayfasını sunum olarak paylaşın.",
    "materialsTitle": "Pazarlama materyalleri",
    "materialsLead": "Onaylanmış marka dosyaları ve bağlantı önizleme görselleri, indirilmeye hazır.",
    "materialsMissing": "Bunlar iş ortakları için yayınlanan marka dosyalarıdır.",
    "download": "İndirmek",
    "knowledgeTitle": "Ürün bilgisi",
    "knowledgeLead": "Herkese açık ürün sayfalarından konumlandırma, hedef kitle ve liste fiyatı.",
    "who": "Kimin için",
    "offer": "Bu ne",
    "price": "Liste fiyatı",
    "limits": "Sınırlar (yayınlandı)",
    "supportTitle": "Destek",
    "supportLead": "Sitenin geri kalanıyla aynı kanallardan bize yazın ve İş Ortağı Kimliğinizi ekleyin.",
    "includeId": "İş Ortağı Kimliğinizi, gönderdiğiniz yönlendirme bağlantısını ve sorunun tıklama mı, potansiyel müşteri mi, satış mı yoksa ödeme mi olduğunu ekleyin.",
    "noTickets": "Program kuralları, satış öncesinde, katılım sırasında sizinle birlikte onaylanır.",
    "trackingTitle": "Neler takip ediliyor",
    "trackingLead": "Bunlar, yönlendirme bağlantınıza bağlı kalan anlardır.",
    "tracking": [
      {
        "title": "Yönlendirme tıklaması",
        "body": "Yönlendirme bağlantınızı açtığınızda ziyaret kaydedilir."
      },
      {
        "title": "İletişim lideri",
        "body": "Bağlantınız aktifken iletişim formunu gönderen kişi Müşteriler bölümünde görünür."
      },
      {
        "title": "İş ortağı kaydı",
        "body": "Bağlantınız aracılığıyla katılan yeni bir ortak ağınıza kaydedilir."
      },
      {
        "title": "Ücretli satış",
        "body": "Ücretli ödeme, yönlendirme kodunuzu korur. Ödeme onaylandıktan sonra komisyon görünür."
      }
    ]
  }
} as Record<Locale, HubLabels>;
