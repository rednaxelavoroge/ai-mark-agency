import type { Locale } from "@/lib/site";

/**
 * Small-business home copy: hero, header menu and the "how to start" block.
 * Tokens {start} {business} {pro} {setup} {days} are filled from the plan
 * constants (see planTokens in content/plain-copy). All 12 locales; EN fallback.
 */
export interface HomePlain {
  eyebrow: string;
  title: string;
  lede: string;
  primaryCta: string;
  note: string;
  pillars: [string, string, string];
  nav: { home: string; showroom: string; pricing: string; how: string; contact: string; tagline: string };
  startEyebrow: string;
  startTitle: string;
  steps: [[string, string], [string, string], [string, string]];
  plansTitle: string;
  plansCta: string;
}

const en: HomePlain = {
  eyebrow: "Showroom AI · for small business",
  title: "An AI seller and marketer for your business",
  lede: "Answers customers 24/7, takes orders and bookings, runs your social media — you only approve. From {start}/mo, {days} days free.",
  primaryCta: "Try {days} days free",
  note: "{days} days free, no card · setup by our team {setup}, optional",
  pillars: ["Answers 24/7", "Takes orders and bookings", "Runs your social media"],
  nav: { home: "Home", showroom: "Showroom AI", pricing: "Pricing", how: "How it works", contact: "Contact", tagline: "Showroom AI" },
  startEyebrow: "How to start",
  startTitle: "Three steps to your first answered customer",
  steps: [
    ["Leave your contact", "Tell us what you sell and where your customers write. The trial is free for {days} days, no card."],
    ["Connect chats and price list", "Do it yourself with our checklist for free, or our team sets everything up for {setup} once. Launch within 24 hours."],
    ["Get customers and posts", "The Seller answers and books orders. The Marketer sends posts to your Telegram — you tap “approve”."],
  ],
  plansTitle: "Prices",
  plansCta: "All plans",
};

const ru: HomePlain = {
  eyebrow: "Showroom AI · для малого бизнеса",
  title: "AI-продавец и маркетолог для вашего бизнеса",
  lede: "Отвечает клиентам 24/7, оформляет заказы и записи, ведёт соцсети — вы только подтверждаете. От {start} в месяц, {days} дней бесплатно.",
  primaryCta: "Попробовать {days} дней бесплатно",
  note: "{days} дней бесплатно, без карты · настройка нашей командой {setup}, по желанию",
  pillars: ["Отвечает 24/7", "Оформляет заказы и записи", "Ведёт соцсети"],
  nav: { home: "Главная", showroom: "Showroom AI", pricing: "Тарифы", how: "Как это работает", contact: "Контакты", tagline: "Showroom AI" },
  startEyebrow: "Как начать",
  startTitle: "Три шага до первого клиента, которому ответили",
  steps: [
    ["Оставьте контакт", "Расскажите, что вы продаёте и где вам пишут клиенты. Пробный период — {days} дней бесплатно, без карты."],
    ["Подключите чаты и прайс", "Сами по нашему чек-листу — бесплатно, или наша команда всё настроит за {setup} разово. Запуск за 24 часа."],
    ["Получайте клиентов и посты", "Продавец отвечает и оформляет заказы. Маркетолог присылает посты в ваш Telegram — вы нажимаете «одобрить»."],
  ],
  plansTitle: "Цены",
  plansCta: "Все тарифы",
};

const es: HomePlain = {
  eyebrow: "Showroom AI · para pequeños negocios",
  title: "Un vendedor y un marketer con IA para tu negocio",
  lede: "Responde a los clientes 24/7, toma pedidos y citas, lleva tus redes sociales — tú solo apruebas. Desde {start}/mes, {days} días gratis.",
  primaryCta: "Prueba {days} días gratis",
  note: "{days} días gratis, sin tarjeta · configuración por nuestro equipo {setup}, opcional",
  pillars: ["Responde 24/7", "Toma pedidos y citas", "Lleva tus redes sociales"],
  nav: { home: "Inicio", showroom: "Showroom AI", pricing: "Precios", how: "Cómo funciona", contact: "Contacto", tagline: "Showroom AI" },
  startEyebrow: "Cómo empezar",
  startTitle: "Tres pasos hasta tu primer cliente atendido",
  steps: [
    ["Déjanos tu contacto", "Cuéntanos qué vendes y dónde te escriben tus clientes. La prueba es gratis {days} días, sin tarjeta."],
    ["Conecta chats y lista de precios", "Hazlo tú con nuestra guía gratis, o nuestro equipo lo configura todo por {setup} una vez. En marcha en 24 horas."],
    ["Recibe clientes y publicaciones", "El Vendedor responde y reserva pedidos. El Marketer envía publicaciones a tu Telegram — tú pulsas «aprobar»."],
  ],
  plansTitle: "Precios",
  plansCta: "Todos los planes",
};

const pt: HomePlain = {
  eyebrow: "Showroom AI · para pequenos negócios",
  title: "Um vendedor e um marketer com IA para o seu negócio",
  lede: "Responde clientes 24/7, registra pedidos e agendamentos, cuida das suas redes sociais — você só aprova. A partir de {start}/mês, {days} dias grátis.",
  primaryCta: "Teste {days} dias grátis",
  note: "{days} dias grátis, sem cartão · configuração pela nossa equipe {setup}, opcional",
  pillars: ["Responde 24/7", "Registra pedidos e agendamentos", "Cuida das redes sociais"],
  nav: { home: "Início", showroom: "Showroom AI", pricing: "Preços", how: "Como funciona", contact: "Contato", tagline: "Showroom AI" },
  startEyebrow: "Como começar",
  startTitle: "Três passos até o primeiro cliente atendido",
  steps: [
    ["Deixe seu contato", "Conte o que você vende e onde seus clientes escrevem. O teste é grátis por {days} dias, sem cartão."],
    ["Conecte chats e tabela de preços", "Faça você mesmo com nosso checklist, grátis, ou nossa equipe configura tudo por {setup} uma vez. No ar em 24 horas."],
    ["Receba clientes e posts", "O Vendedor responde e registra pedidos. O Marketer envia posts para o seu Telegram — você toca em “aprovar”."],
  ],
  plansTitle: "Preços",
  plansCta: "Todos os planos",
};

const de: HomePlain = {
  eyebrow: "Showroom AI · für kleine Unternehmen",
  title: "Ein KI-Verkäufer und -Marketer für Ihr Geschäft",
  lede: "Antwortet Kunden rund um die Uhr, nimmt Bestellungen und Termine an, betreut Ihre sozialen Medien — Sie geben nur frei. Ab {start}/Monat, {days} Tage kostenlos.",
  primaryCta: "{days} Tage kostenlos testen",
  note: "{days} Tage kostenlos, ohne Karte · Einrichtung durch unser Team {setup}, optional",
  pillars: ["Antwortet rund um die Uhr", "Nimmt Bestellungen und Termine an", "Betreut soziale Medien"],
  nav: { home: "Start", showroom: "Showroom AI", pricing: "Preise", how: "So funktioniert’s", contact: "Kontakt", tagline: "Showroom AI" },
  startEyebrow: "So starten Sie",
  startTitle: "Drei Schritte bis zum ersten beantworteten Kunden",
  steps: [
    ["Kontakt hinterlassen", "Sagen Sie uns, was Sie verkaufen und wo Ihre Kunden schreiben. Der Test ist {days} Tage kostenlos, ohne Karte."],
    ["Chats und Preisliste verbinden", "Selbst mit unserer Checkliste kostenlos, oder unser Team richtet alles für einmalig {setup} ein. Start innerhalb von 24 Stunden."],
    ["Kunden und Posts bekommen", "Der Verkäufer antwortet und bucht Bestellungen. Der Marketer schickt Posts in Ihr Telegram — Sie tippen auf „Freigeben“."],
  ],
  plansTitle: "Preise",
  plansCta: "Alle Tarife",
};

const fr: HomePlain = {
  eyebrow: "Showroom AI · pour les petites entreprises",
  title: "Un vendeur et un marketeur IA pour votre entreprise",
  lede: "Répond aux clients 24/7, prend commandes et rendez-vous, gère vos réseaux sociaux — vous ne faites que valider. Dès {start}/mois, {days} jours gratuits.",
  primaryCta: "Essayer {days} jours gratuits",
  note: "{days} jours gratuits, sans carte · mise en place par notre équipe {setup}, en option",
  pillars: ["Répond 24/7", "Prend commandes et rendez-vous", "Gère vos réseaux sociaux"],
  nav: { home: "Accueil", showroom: "Showroom AI", pricing: "Tarifs", how: "Comment ça marche", contact: "Contact", tagline: "Showroom AI" },
  startEyebrow: "Comment démarrer",
  startTitle: "Trois étapes jusqu’au premier client servi",
  steps: [
    ["Laissez votre contact", "Dites-nous ce que vous vendez et où vos clients écrivent. L’essai est gratuit {days} jours, sans carte."],
    ["Connectez chats et grille de prix", "Vous-même avec notre checklist, gratuitement, ou notre équipe configure tout pour {setup} une fois. Lancement en 24 heures."],
    ["Recevez clients et posts", "Le Vendeur répond et réserve les commandes. Le Marketer envoie les posts dans votre Telegram — vous appuyez sur « valider »."],
  ],
  plansTitle: "Tarifs",
  plansCta: "Toutes les offres",
};

const id: HomePlain = {
  eyebrow: "Showroom AI · untuk usaha kecil",
  title: "Penjual dan marketer AI untuk bisnis Anda",
  lede: "Menjawab pelanggan 24/7, mencatat pesanan dan janji temu, mengelola media sosial — Anda cukup menyetujui. Mulai {start}/bln, gratis {days} hari.",
  primaryCta: "Coba gratis {days} hari",
  note: "Gratis {days} hari, tanpa kartu · penyiapan oleh tim kami {setup}, opsional",
  pillars: ["Menjawab 24/7", "Mencatat pesanan dan janji temu", "Mengelola media sosial"],
  nav: { home: "Beranda", showroom: "Showroom AI", pricing: "Harga", how: "Cara kerja", contact: "Kontak", tagline: "Showroom AI" },
  startEyebrow: "Cara memulai",
  startTitle: "Tiga langkah menuju pelanggan pertama yang dilayani",
  steps: [
    ["Tinggalkan kontak", "Ceritakan apa yang Anda jual dan di mana pelanggan menulis. Uji coba gratis {days} hari, tanpa kartu."],
    ["Hubungkan chat dan daftar harga", "Sendiri dengan checklist kami secara gratis, atau tim kami menyiapkan semuanya seharga {setup} sekali. Aktif dalam 24 jam."],
    ["Dapatkan pelanggan dan posting", "Penjual menjawab dan mencatat pesanan. Marketer mengirim posting ke Telegram Anda — Anda tekan “setujui”."],
  ],
  plansTitle: "Harga",
  plansCta: "Semua paket",
};

const vi: HomePlain = {
  eyebrow: "Showroom AI · cho doanh nghiệp nhỏ",
  title: "Nhân viên bán hàng và marketer AI cho doanh nghiệp của bạn",
  lede: "Trả lời khách 24/7, nhận đơn và lịch hẹn, quản lý mạng xã hội — bạn chỉ cần duyệt. Từ {start}/tháng, miễn phí {days} ngày.",
  primaryCta: "Dùng thử miễn phí {days} ngày",
  note: "Miễn phí {days} ngày, không cần thẻ · đội ngũ chúng tôi cài đặt {setup}, tùy chọn",
  pillars: ["Trả lời 24/7", "Nhận đơn và lịch hẹn", "Quản lý mạng xã hội"],
  nav: { home: "Trang chủ", showroom: "Showroom AI", pricing: "Bảng giá", how: "Cách hoạt động", contact: "Liên hệ", tagline: "Showroom AI" },
  startEyebrow: "Cách bắt đầu",
  startTitle: "Ba bước đến khách hàng đầu tiên được trả lời",
  steps: [
    ["Để lại liên hệ", "Cho chúng tôi biết bạn bán gì và khách nhắn ở đâu. Dùng thử miễn phí {days} ngày, không cần thẻ."],
    ["Kết nối chat và bảng giá", "Tự làm theo checklist miễn phí, hoặc đội ngũ chúng tôi cài đặt tất cả với {setup} một lần. Chạy trong 24 giờ."],
    ["Nhận khách và bài đăng", "Nhân viên bán hàng trả lời và đặt đơn. Marketer gửi bài vào Telegram của bạn — bạn bấm “duyệt”."],
  ],
  plansTitle: "Bảng giá",
  plansCta: "Tất cả các gói",
};

const tr: HomePlain = {
  eyebrow: "Showroom AI · küçük işletmeler için",
  title: "İşletmeniz için yapay zekâ satıcı ve pazarlamacı",
  lede: "Müşterilere 7/24 yanıt verir, sipariş ve randevu alır, sosyal medyanızı yönetir — siz yalnızca onaylarsınız. {start}/ay’dan başlayan fiyatlar, {days} gün ücretsiz.",
  primaryCta: "{days} gün ücretsiz deneyin",
  note: "{days} gün ücretsiz, kart gerekmez · ekibimizin kurulumu {setup}, isteğe bağlı",
  pillars: ["7/24 yanıt verir", "Sipariş ve randevu alır", "Sosyal medyayı yönetir"],
  nav: { home: "Ana sayfa", showroom: "Showroom AI", pricing: "Fiyatlar", how: "Nasıl çalışır", contact: "İletişim", tagline: "Showroom AI" },
  startEyebrow: "Nasıl başlanır",
  startTitle: "İlk yanıtlanan müşteriye üç adım",
  steps: [
    ["İletişim bilgisi bırakın", "Ne sattığınızı ve müşterilerin nereden yazdığını anlatın. Deneme {days} gün ücretsiz, kart gerekmez."],
    ["Sohbetleri ve fiyat listesini bağlayın", "Kontrol listemizle kendiniz ücretsiz yapın ya da ekibimiz tek seferlik {setup} karşılığında kursun. 24 saatte yayında."],
    ["Müşteri ve gönderi alın", "Satıcı yanıt verir ve siparişleri ayırır. Pazarlamacı gönderileri Telegram’ınıza yollar — siz “onayla”ya basarsınız."],
  ],
  plansTitle: "Fiyatlar",
  plansCta: "Tüm paketler",
};

const ar: HomePlain = {
  eyebrow: "Showroom AI · للأعمال الصغيرة",
  title: "بائع ومسوّق بالذكاء الاصطناعي لعملك",
  lede: "يرد على العملاء على مدار الساعة، ويسجل الطلبات والمواعيد، ويدير حساباتك على وسائل التواصل — وأنت توافق فقط. ابتداءً من {start} شهريًا، {days} أيام مجانًا.",
  primaryCta: "جرّب {days} أيام مجانًا",
  note: "{days} أيام مجانًا دون بطاقة · الإعداد بواسطة فريقنا {setup}، اختياري",
  pillars: ["يرد على مدار الساعة", "يسجل الطلبات والمواعيد", "يدير وسائل التواصل"],
  nav: { home: "الرئيسية", showroom: "Showroom AI", pricing: "الأسعار", how: "كيف يعمل", contact: "تواصل معنا", tagline: "Showroom AI" },
  startEyebrow: "كيف تبدأ",
  startTitle: "ثلاث خطوات حتى أول عميل يتلقى ردًا",
  steps: [
    ["اترك بيانات التواصل", "أخبرنا بما تبيعه وأين يراسلك عملاؤك. التجربة مجانية لمدة {days} أيام دون بطاقة."],
    ["اربط المحادثات وقائمة الأسعار", "بنفسك مجانًا عبر قائمة التحقق، أو يتولى فريقنا الإعداد كاملًا مقابل {setup} مرة واحدة. التشغيل خلال 24 ساعة."],
    ["احصل على العملاء والمنشورات", "البائع يرد ويحجز الطلبات. المسوّق يرسل المنشورات إلى Telegram الخاص بك — وأنت تضغط «موافقة»."],
  ],
  plansTitle: "الأسعار",
  plansCta: "كل الباقات",
};

const zh: HomePlain = {
  eyebrow: "Showroom AI · 面向小微企业",
  title: "为您的生意配备 AI 销售和营销",
  lede: "全天候回复顾客，登记订单和预约，运营社交媒体——您只需批准。{start}/月起，免费试用 {days} 天。",
  primaryCta: "免费试用 {days} 天",
  note: "免费 {days} 天，无需银行卡 · 由我们团队配置 {setup}，可选",
  pillars: ["全天候回复", "登记订单和预约", "运营社交媒体"],
  nav: { home: "首页", showroom: "Showroom AI", pricing: "价格", how: "如何运作", contact: "联系", tagline: "Showroom AI" },
  startEyebrow: "如何开始",
  startTitle: "三步迎来第一位被及时回复的顾客",
  steps: [
    ["留下联系方式", "告诉我们您卖什么、顾客在哪里联系您。免费试用 {days} 天，无需银行卡。"],
    ["接入聊天和价目表", "按我们的清单自行免费配置，或由我们团队一次性收费 {setup} 全部配置。24 小时内上线。"],
    ["获得顾客和帖子", "销售回复并登记订单。营销把帖子发到您的 Telegram——您点击“批准”。"],
  ],
  plansTitle: "价格",
  plansCta: "全部套餐",
};

const ja: HomePlain = {
  eyebrow: "Showroom AI · 小規模ビジネス向け",
  title: "あなたのお店に、AIの販売担当とマーケター",
  lede: "お客様に24時間返信し、注文や予約を受け付け、SNSを運用します — あなたは承認するだけ。月額 {start} から、{days}日間無料。",
  primaryCta: "{days}日間無料で試す",
  note: "{days}日間無料・カード不要 · 当社チームによる設定 {setup}（任意）",
  pillars: ["24時間返信", "注文・予約を受付", "SNSを運用"],
  nav: { home: "ホーム", showroom: "Showroom AI", pricing: "料金", how: "しくみ", contact: "お問い合わせ", tagline: "Showroom AI" },
  startEyebrow: "始め方",
  startTitle: "最初のお客様に返信するまでの3ステップ",
  steps: [
    ["連絡先を入力", "何を販売していて、お客様がどこから連絡してくるかを教えてください。{days}日間無料、カード不要。"],
    ["チャットと料金表を接続", "チェックリストに沿ってご自身で無料設定、または当社チームが1回 {setup} ですべて設定。24時間以内に開始。"],
    ["お客様と投稿を受け取る", "販売担当が返信して注文を受け付け、マーケターが投稿を Telegram に送ります — あなたは「承認」を押すだけ。"],
  ],
  plansTitle: "料金",
  plansCta: "すべてのプラン",
};

const homePlain: Partial<Record<Locale, HomePlain>> = { en, ru, es, pt, de, fr, id, vi, tr, ar, zh, ja };

export function getHomePlain(locale: Locale): HomePlain {
  return homePlain[locale] ?? en;
}
