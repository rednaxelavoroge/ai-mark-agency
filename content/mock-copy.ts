import type { Locale } from "@/lib/site";

/**
 * Visible strings of the Showroom AI role mockups on /products (ProductUI
 * aime / assistant / showroom). Example data only. All 12 locales; EN
 * fallback. No city names; the only price in a chat is a small example sum.
 */
export interface MockCopy {
  example: string;
  aime: {
    title: string; sub: string; steps: [string, string, string, string, string, string];
    calendar: string; awaiting: string; reach: string;
    lines: [[string, string], [string, string], [string, string]];
    tg: string; you: string; draft: string; approve: string; edit: string;
  };
  assistant: {
    inbox: string; threads: [string, string, string, string]; kb: string;
    lines: [[string, string], [string, string]];
    chat: string; tag: string; msg1: string; msg2: string; chips: [string, string, string];
    handoff: string; take: string;
  };
  showroom: {
    title: string; specs: [[string, string], [string, string], [string, string], [string, string], [string, string], [string, string]];
    flow: string; config: string; params: [string, string, string, string];
    offer: string; ready: string; note: string; lines: [[string, string], [string, string]];
  };
}

const en: MockCopy = {
  example: "Example",
  aime: {
    title: "Showroom AI · Marketer", sub: "from research to post",
    steps: ["Research", "Content plan", "Drafts", "Your approval", "Published", "Results"],
    calendar: "Content calendar", awaiting: "waiting for you", reach: "REACH · 30 days",
    lines: [["Drafts", "ready"], ["Approval", "before posting"], ["Next", "results"]],
    tg: "APPROVAL IN TELEGRAM", you: "you decide", draft: "Reels “Summer collection” — script ready.", approve: "APPROVE", edit: "EDIT",
  },
  assistant: {
    inbox: "All chats", threads: ["Do you deliver tomorrow?", "How much is the set?", "Invoice for order #1042", "Is size M available?"],
    kb: "YOUR INFORMATION", lines: [["Price list", "loaded"], ["Answers", "on"]],
    chat: "WhatsApp · customer 04", tag: "ready to buy", msg1: "Hi! How long does delivery take?",
    msg2: "Delivery takes 2–3 days. Shall I pass you to the manager to place the order?",
    chips: ["Need: delivery", "Wants to order", "Hot"], handoff: "passed in one click", take: "→ Take the chat",
  },
  showroom: {
    title: "Showroom AI · Seller",
    specs: [["Your catalog", "loaded"], ["Price rules", "set"], ["Matching to request", "on"], ["Price check", "0 errors"], ["Offer to customer", "instant"], ["Handoff to you", "with history"]],
    flow: "CUSTOMER REQUEST → OFFER", config: "MATCHING", params: ["Type", "Size", "Color", "Extras"],
    offer: "OFFER TO CUSTOMER", ready: "Ready", note: "with delivery · valid 14 days", lines: [["Items", "4"], ["Price", "from your list"]],
  },
};

const ru: MockCopy = {
  example: "Пример",
  aime: {
    title: "Showroom AI · Маркетолог", sub: "от анализа до поста",
    steps: ["Анализ", "Контент-план", "Черновики", "Ваше одобрение", "Опубликовано", "Результаты"],
    calendar: "Календарь публикаций", awaiting: "ждёт вас", reach: "ОХВАТ · 30 дней",
    lines: [["Черновики", "готовы"], ["Одобрение", "до публикации"], ["Дальше", "результаты"]],
    tg: "ОДОБРЕНИЕ В TELEGRAM", you: "решаете вы", draft: "Reels «Летняя коллекция» — сценарий готов.", approve: "ОДОБРИТЬ", edit: "ПРАВКИ",
  },
  assistant: {
    inbox: "Все чаты", threads: ["Доставите завтра?", "Сколько стоит комплект?", "Счёт за заказ №1042", "Есть размер M?"],
    kb: "ВАША ИНФОРМАЦИЯ", lines: [["Прайс", "загружен"], ["Ответы", "включены"]],
    chat: "WhatsApp · клиент 04", tag: "готов купить", msg1: "Здравствуйте! Сколько идёт доставка?",
    msg2: "Доставка 2–3 дня. Передать вас менеджеру, чтобы оформить заказ?",
    chips: ["Нужно: доставка", "Хочет заказать", "Горячий"], handoff: "передача в один клик", take: "→ Взять диалог",
  },
  showroom: {
    title: "Showroom AI · Продавец",
    specs: [["Ваш каталог", "загружен"], ["Правила цен", "настроены"], ["Подбор под запрос", "работает"], ["Проверка цены", "0 ошибок"], ["Предложение клиенту", "сразу"], ["Передача вам", "с историей"]],
    flow: "ЗАПРОС КЛИЕНТА → ПРЕДЛОЖЕНИЕ", config: "ПОДБОР", params: ["Тип", "Размер", "Цвет", "Доп. опции"],
    offer: "ПРЕДЛОЖЕНИЕ КЛИЕНТУ", ready: "Готово", note: "с доставкой · действует 14 дней", lines: [["Позиций", "4"], ["Цена", "по вашему прайсу"]],
  },
};

const es: MockCopy = {
  example: "Ejemplo",
  aime: {
    title: "Showroom AI · Marketer", sub: "del análisis al post",
    steps: ["Análisis", "Plan de contenidos", "Borradores", "Tu aprobación", "Publicado", "Resultados"],
    calendar: "Calendario de publicaciones", awaiting: "te espera", reach: "ALCANCE · 30 días",
    lines: [["Borradores", "listos"], ["Aprobación", "antes de publicar"], ["Siguiente", "resultados"]],
    tg: "APROBACIÓN EN TELEGRAM", you: "decides tú", draft: "Reels «Colección de verano» — guion listo.", approve: "APROBAR", edit: "CAMBIOS",
  },
  assistant: {
    inbox: "Todos los chats", threads: ["¿Entregan mañana?", "¿Cuánto cuesta el set?", "Factura del pedido #1042", "¿Hay talla M?"],
    kb: "TU INFORMACIÓN", lines: [["Lista de precios", "cargada"], ["Respuestas", "activas"]],
    chat: "WhatsApp · cliente 04", tag: "listo para comprar", msg1: "¡Hola! ¿Cuánto tarda la entrega?",
    msg2: "La entrega tarda 2–3 días. ¿Te paso con el encargado para hacer el pedido?",
    chips: ["Necesita: entrega", "Quiere pedir", "Caliente"], handoff: "se pasa en un clic", take: "→ Tomar el chat",
  },
  showroom: {
    title: "Showroom AI · Vendedor",
    specs: [["Tu catálogo", "cargado"], ["Reglas de precios", "listas"], ["Selección según pedido", "activa"], ["Control de precio", "0 errores"], ["Oferta al cliente", "al instante"], ["Pase a ti", "con historial"]],
    flow: "PEDIDO DEL CLIENTE → OFERTA", config: "SELECCIÓN", params: ["Tipo", "Tamaño", "Color", "Extras"],
    offer: "OFERTA AL CLIENTE", ready: "Lista", note: "con entrega · válida 14 días", lines: [["Artículos", "4"], ["Precio", "de tu lista"]],
  },
};

const pt: MockCopy = {
  example: "Exemplo",
  aime: {
    title: "Showroom AI · Marketer", sub: "da análise ao post",
    steps: ["Análise", "Plano de conteúdo", "Rascunhos", "Sua aprovação", "Publicado", "Resultados"],
    calendar: "Calendário de posts", awaiting: "aguardando você", reach: "ALCANCE · 30 dias",
    lines: [["Rascunhos", "prontos"], ["Aprovação", "antes de postar"], ["Próximo", "resultados"]],
    tg: "APROVAÇÃO NO TELEGRAM", you: "você decide", draft: "Reels “Coleção de verão” — roteiro pronto.", approve: "APROVAR", edit: "AJUSTES",
  },
  assistant: {
    inbox: "Todos os chats", threads: ["Entregam amanhã?", "Quanto custa o kit?", "Fatura do pedido #1042", "Tem tamanho M?"],
    kb: "SUAS INFORMAÇÕES", lines: [["Tabela de preços", "carregada"], ["Respostas", "ativas"]],
    chat: "WhatsApp · cliente 04", tag: "pronto para comprar", msg1: "Olá! Quanto tempo leva a entrega?",
    msg2: "A entrega leva 2–3 dias. Posso passar você ao gerente para fechar o pedido?",
    chips: ["Precisa: entrega", "Quer pedir", "Quente"], handoff: "passa em um clique", take: "→ Assumir o chat",
  },
  showroom: {
    title: "Showroom AI · Vendedor",
    specs: [["Seu catálogo", "carregado"], ["Regras de preço", "prontas"], ["Seleção pelo pedido", "ativa"], ["Checagem de preço", "0 erros"], ["Oferta ao cliente", "na hora"], ["Repasse a você", "com histórico"]],
    flow: "PEDIDO DO CLIENTE → OFERTA", config: "SELEÇÃO", params: ["Tipo", "Tamanho", "Cor", "Extras"],
    offer: "OFERTA AO CLIENTE", ready: "Pronta", note: "com entrega · válida 14 dias", lines: [["Itens", "4"], ["Preço", "da sua tabela"]],
  },
};

const de: MockCopy = {
  example: "Beispiel",
  aime: {
    title: "Showroom AI · Marketer", sub: "von der Analyse zum Post",
    steps: ["Analyse", "Redaktionsplan", "Entwürfe", "Ihre Freigabe", "Veröffentlicht", "Ergebnisse"],
    calendar: "Redaktionskalender", awaiting: "wartet auf Sie", reach: "REICHWEITE · 30 Tage",
    lines: [["Entwürfe", "fertig"], ["Freigabe", "vor dem Posten"], ["Weiter", "Ergebnisse"]],
    tg: "FREIGABE IN TELEGRAM", you: "Sie entscheiden", draft: "Reels „Sommerkollektion“ — Skript fertig.", approve: "FREIGEBEN", edit: "ÄNDERN",
  },
  assistant: {
    inbox: "Alle Chats", threads: ["Liefern Sie morgen?", "Was kostet das Set?", "Rechnung zu Bestellung Nr. 1042", "Gibt es Größe M?"],
    kb: "IHRE INFORMATIONEN", lines: [["Preisliste", "geladen"], ["Antworten", "aktiv"]],
    chat: "WhatsApp · Kunde 04", tag: "kaufbereit", msg1: "Hallo! Wie lange dauert die Lieferung?",
    msg2: "Die Lieferung dauert 2–3 Tage. Soll ich Sie zur Bestellung an den Manager weitergeben?",
    chips: ["Braucht: Lieferung", "Will bestellen", "Heiß"], handoff: "Übergabe mit einem Klick", take: "→ Chat übernehmen",
  },
  showroom: {
    title: "Showroom AI · Verkäufer",
    specs: [["Ihr Katalog", "geladen"], ["Preisregeln", "eingestellt"], ["Auswahl nach Anfrage", "aktiv"], ["Preisprüfung", "0 Fehler"], ["Angebot an Kunden", "sofort"], ["Übergabe an Sie", "mit Verlauf"]],
    flow: "KUNDENANFRAGE → ANGEBOT", config: "AUSWAHL", params: ["Art", "Größe", "Farbe", "Extras"],
    offer: "ANGEBOT AN KUNDEN", ready: "Fertig", note: "mit Lieferung · 14 Tage gültig", lines: [["Positionen", "4"], ["Preis", "aus Ihrer Liste"]],
  },
};

const fr: MockCopy = {
  example: "Exemple",
  aime: {
    title: "Showroom AI · Marketer", sub: "de l’analyse au post",
    steps: ["Analyse", "Plan de contenu", "Brouillons", "Votre validation", "Publié", "Résultats"],
    calendar: "Calendrier des posts", awaiting: "vous attend", reach: "PORTÉE · 30 jours",
    lines: [["Brouillons", "prêts"], ["Validation", "avant publication"], ["Ensuite", "résultats"]],
    tg: "VALIDATION DANS TELEGRAM", you: "vous décidez", draft: "Reels « Collection d’été » — script prêt.", approve: "VALIDER", edit: "MODIFIER",
  },
  assistant: {
    inbox: "Tous les chats", threads: ["Vous livrez demain ?", "Combien coûte le lot ?", "Facture de la commande n° 1042", "La taille M est dispo ?"],
    kb: "VOS INFORMATIONS", lines: [["Grille de prix", "chargée"], ["Réponses", "actives"]],
    chat: "WhatsApp · client 04", tag: "prêt à acheter", msg1: "Bonjour ! Combien de temps pour la livraison ?",
    msg2: "La livraison prend 2–3 jours. Je vous passe au responsable pour la commande ?",
    chips: ["Besoin : livraison", "Veut commander", "Chaud"], handoff: "transmis en un clic", take: "→ Reprendre le chat",
  },
  showroom: {
    title: "Showroom AI · Vendeur",
    specs: [["Votre catalogue", "chargé"], ["Règles de prix", "réglées"], ["Choix selon la demande", "actif"], ["Contrôle du prix", "0 erreur"], ["Offre au client", "immédiate"], ["Transmission à vous", "avec historique"]],
    flow: "DEMANDE CLIENT → OFFRE", config: "SÉLECTION", params: ["Type", "Taille", "Couleur", "Options"],
    offer: "OFFRE AU CLIENT", ready: "Prête", note: "livraison incluse · valable 14 jours", lines: [["Articles", "4"], ["Prix", "selon votre grille"]],
  },
};

const id: MockCopy = {
  example: "Contoh",
  aime: {
    title: "Showroom AI · Marketer", sub: "dari riset ke posting",
    steps: ["Riset", "Rencana konten", "Draf", "Persetujuan Anda", "Terbit", "Hasil"],
    calendar: "Kalender posting", awaiting: "menunggu Anda", reach: "JANGKAUAN · 30 hari",
    lines: [["Draf", "siap"], ["Persetujuan", "sebelum terbit"], ["Berikutnya", "hasil"]],
    tg: "PERSETUJUAN DI TELEGRAM", you: "Anda yang memutuskan", draft: "Reels “Koleksi musim panas” — naskah siap.", approve: "SETUJUI", edit: "UBAH",
  },
  assistant: {
    inbox: "Semua chat", threads: ["Bisa kirim besok?", "Berapa harga paketnya?", "Tagihan pesanan #1042", "Ada ukuran M?"],
    kb: "INFORMASI ANDA", lines: [["Daftar harga", "dimuat"], ["Jawaban", "aktif"]],
    chat: "WhatsApp · pelanggan 04", tag: "siap membeli", msg1: "Halo! Pengiriman berapa lama?",
    msg2: "Pengiriman 2–3 hari. Saya teruskan ke manajer untuk memesan?",
    chips: ["Butuh: pengiriman", "Ingin pesan", "Panas"], handoff: "diserahkan sekali klik", take: "→ Ambil alih chat",
  },
  showroom: {
    title: "Showroom AI · Penjual",
    specs: [["Katalog Anda", "dimuat"], ["Aturan harga", "diatur"], ["Pilihan sesuai permintaan", "aktif"], ["Cek harga", "0 kesalahan"], ["Penawaran ke pelanggan", "instan"], ["Diserahkan ke Anda", "dengan riwayat"]],
    flow: "PERMINTAAN PELANGGAN → PENAWARAN", config: "PEMILIHAN", params: ["Jenis", "Ukuran", "Warna", "Tambahan"],
    offer: "PENAWARAN KE PELANGGAN", ready: "Siap", note: "termasuk kirim · berlaku 14 hari", lines: [["Item", "4"], ["Harga", "dari daftar Anda"]],
  },
};

const vi: MockCopy = {
  example: "Ví dụ",
  aime: {
    title: "Showroom AI · Marketer", sub: "từ phân tích đến bài đăng",
    steps: ["Phân tích", "Kế hoạch nội dung", "Bản nháp", "Bạn duyệt", "Đã đăng", "Kết quả"],
    calendar: "Lịch đăng bài", awaiting: "chờ bạn", reach: "TIẾP CẬN · 30 ngày",
    lines: [["Bản nháp", "sẵn sàng"], ["Duyệt", "trước khi đăng"], ["Tiếp theo", "kết quả"]],
    tg: "DUYỆT TRONG TELEGRAM", you: "bạn quyết định", draft: "Reels “Bộ sưu tập hè” — kịch bản đã xong.", approve: "DUYỆT", edit: "SỬA",
  },
  assistant: {
    inbox: "Tất cả chat", threads: ["Mai giao được không?", "Bộ này giá bao nhiêu?", "Hóa đơn đơn #1042", "Còn size M không?"],
    kb: "THÔNG TIN CỦA BẠN", lines: [["Bảng giá", "đã tải"], ["Trả lời", "đang bật"]],
    chat: "WhatsApp · khách 04", tag: "sẵn sàng mua", msg1: "Chào shop! Giao hàng mất bao lâu?",
    msg2: "Giao hàng 2–3 ngày. Mình chuyển bạn cho quản lý để chốt đơn nhé?",
    chips: ["Cần: giao hàng", "Muốn đặt", "Nóng"], handoff: "chuyển trong một cú nhấp", take: "→ Nhận cuộc chat",
  },
  showroom: {
    title: "Showroom AI · Bán hàng",
    specs: [["Danh mục của bạn", "đã tải"], ["Quy tắc giá", "đã thiết lập"], ["Chọn theo yêu cầu", "đang chạy"], ["Kiểm tra giá", "0 lỗi"], ["Báo giá cho khách", "ngay"], ["Chuyển cho bạn", "kèm lịch sử"]],
    flow: "YÊU CẦU CỦA KHÁCH → BÁO GIÁ", config: "CHỌN HÀNG", params: ["Loại", "Kích thước", "Màu", "Tùy chọn"],
    offer: "BÁO GIÁ CHO KHÁCH", ready: "Xong", note: "kèm giao hàng · hiệu lực 14 ngày", lines: [["Sản phẩm", "4"], ["Giá", "theo bảng giá"]],
  },
};

const tr: MockCopy = {
  example: "Örnek",
  aime: {
    title: "Showroom AI · Pazarlamacı", sub: "araştırmadan gönderiye",
    steps: ["Araştırma", "İçerik planı", "Taslaklar", "Sizin onayınız", "Yayında", "Sonuçlar"],
    calendar: "Gönderi takvimi", awaiting: "sizi bekliyor", reach: "ERİŞİM · 30 gün",
    lines: [["Taslaklar", "hazır"], ["Onay", "yayından önce"], ["Sonraki", "sonuçlar"]],
    tg: "TELEGRAM’DA ONAY", you: "siz karar verirsiniz", draft: "Reels “Yaz koleksiyonu” — senaryo hazır.", approve: "ONAYLA", edit: "DÜZENLE",
  },
  assistant: {
    inbox: "Tüm sohbetler", threads: ["Yarın teslim eder misiniz?", "Set ne kadar?", "Sipariş #1042 faturası", "M beden var mı?"],
    kb: "BİLGİLERİNİZ", lines: [["Fiyat listesi", "yüklendi"], ["Yanıtlar", "açık"]],
    chat: "WhatsApp · müşteri 04", tag: "almaya hazır", msg1: "Merhaba! Teslimat ne kadar sürer?",
    msg2: "Teslimat 2–3 gün. Siparişi tamamlamak için sizi yöneticiye aktarayım mı?",
    chips: ["İhtiyaç: teslimat", "Sipariş vermek istiyor", "Sıcak"], handoff: "tek tıkla devir", take: "→ Sohbeti devral",
  },
  showroom: {
    title: "Showroom AI · Satıcı",
    specs: [["Kataloğunuz", "yüklendi"], ["Fiyat kuralları", "ayarlandı"], ["Talebe göre seçim", "açık"], ["Fiyat kontrolü", "0 hata"], ["Müşteriye teklif", "anında"], ["Size devir", "geçmişiyle"]],
    flow: "MÜŞTERİ TALEBİ → TEKLİF", config: "SEÇİM", params: ["Tür", "Beden", "Renk", "Ekstralar"],
    offer: "MÜŞTERİYE TEKLİF", ready: "Hazır", note: "teslimat dahil · 14 gün geçerli", lines: [["Kalem", "4"], ["Fiyat", "listenizden"]],
  },
};

const ar: MockCopy = {
  example: "مثال",
  aime: {
    title: "Showroom AI · المسوّق", sub: "من التحليل إلى المنشور",
    steps: ["التحليل", "خطة المحتوى", "المسودات", "موافقتك", "تم النشر", "النتائج"],
    calendar: "تقويم المنشورات", awaiting: "بانتظارك", reach: "الوصول · 30 يومًا",
    lines: [["المسودات", "جاهزة"], ["الموافقة", "قبل النشر"], ["التالي", "النتائج"]],
    tg: "الموافقة في TELEGRAM", you: "القرار لك", draft: "Reels «تشكيلة الصيف» — النص جاهز.", approve: "موافقة", edit: "تعديل",
  },
  assistant: {
    inbox: "كل المحادثات", threads: ["هل توصلون غدًا؟", "كم سعر الطقم؟", "فاتورة الطلب رقم 1042", "هل المقاس M متوفر؟"],
    kb: "معلوماتك", lines: [["قائمة الأسعار", "محمّلة"], ["الردود", "مفعّلة"]],
    chat: "WhatsApp · عميل 04", tag: "جاهز للشراء", msg1: "مرحبًا! كم يستغرق التوصيل؟",
    msg2: "التوصيل خلال 2–3 أيام. هل أحولك إلى المدير لإتمام الطلب؟",
    chips: ["يحتاج: توصيل", "يريد الطلب", "مهتم جدًا"], handoff: "تحويل بنقرة واحدة", take: "← تولَّ المحادثة",
  },
  showroom: {
    title: "Showroom AI · البائع",
    specs: [["كتالوجك", "محمّل"], ["قواعد الأسعار", "مضبوطة"], ["اختيار حسب الطلب", "يعمل"], ["فحص السعر", "0 أخطاء"], ["عرض للعميل", "فوري"], ["تحويل إليك", "مع السجل"]],
    flow: "طلب العميل ← العرض", config: "الاختيار", params: ["النوع", "المقاس", "اللون", "إضافات"],
    offer: "عرض للعميل", ready: "جاهز", note: "شامل التوصيل · صالح 14 يومًا", lines: [["البنود", "4"], ["السعر", "من قائمتك"]],
  },
};

const zh: MockCopy = {
  example: "示例",
  aime: {
    title: "Showroom AI · 营销", sub: "从调研到发帖",
    steps: ["调研", "内容计划", "草稿", "您的批准", "已发布", "效果"],
    calendar: "发帖日历", awaiting: "等待您确认", reach: "触达 · 30 天",
    lines: [["草稿", "已就绪"], ["批准", "发布前"], ["下一步", "效果"]],
    tg: "在 TELEGRAM 中批准", you: "由您决定", draft: "Reels《夏季新品》— 脚本已就绪。", approve: "批准", edit: "修改",
  },
  assistant: {
    inbox: "全部聊天", threads: ["明天能送到吗？", "这套多少钱？", "订单 #1042 的发票", "有 M 码吗？"],
    kb: "您的资料", lines: [["价目表", "已导入"], ["自动回复", "已开启"]],
    chat: "WhatsApp · 顾客 04", tag: "准备购买", msg1: "你好！配送要多久？",
    msg2: "配送需要 2–3 天。需要我把您转给经理下单吗？",
    chips: ["需求：配送", "想下单", "高意向"], handoff: "一键转交", take: "→ 接手对话",
  },
  showroom: {
    title: "Showroom AI · 销售",
    specs: [["您的商品目录", "已导入"], ["价格规则", "已设置"], ["按需求挑选", "运行中"], ["价格核对", "0 错误"], ["给顾客的报价", "即时"], ["转交给您", "附聊天记录"]],
    flow: "顾客需求 → 报价", config: "挑选", params: ["类型", "尺寸", "颜色", "附加项"],
    offer: "给顾客的报价", ready: "已完成", note: "含配送 · 有效期 14 天", lines: [["商品数", "4"], ["价格", "按您的价目表"]],
  },
};

const ja: MockCopy = {
  example: "例",
  aime: {
    title: "Showroom AI · マーケター", sub: "調査から投稿まで",
    steps: ["調査", "コンテンツ計画", "下書き", "あなたの承認", "公開済み", "結果"],
    calendar: "投稿カレンダー", awaiting: "承認待ち", reach: "リーチ · 30日",
    lines: [["下書き", "準備完了"], ["承認", "公開前"], ["次へ", "結果"]],
    tg: "TELEGRAM で承認", you: "決めるのはあなた", draft: "Reels「夏の新作」— 台本ができました。", approve: "承認", edit: "修正",
  },
  assistant: {
    inbox: "すべてのチャット", threads: ["明日届けられますか？", "セットはいくらですか？", "注文 #1042 の請求書", "Mサイズはありますか？"],
    kb: "あなたの情報", lines: [["料金表", "読み込み済み"], ["自動返信", "オン"]],
    chat: "WhatsApp · お客様 04", tag: "購入意欲あり", msg1: "こんにちは！配送はどれくらいかかりますか？",
    msg2: "配送は2〜3日です。ご注文のため担当者におつなぎしましょうか？",
    chips: ["要望：配送", "注文したい", "見込み高"], handoff: "ワンクリックで引き継ぎ", take: "→ 会話を引き継ぐ",
  },
  showroom: {
    title: "Showroom AI · 販売担当",
    specs: [["カタログ", "読み込み済み"], ["価格ルール", "設定済み"], ["ご要望に合わせて選択", "稼働中"], ["価格チェック", "エラー0"], ["お客様への提案", "すぐに"], ["あなたへ引き継ぎ", "履歴付き"]],
    flow: "お客様の要望 → 提案", config: "選択", params: ["種類", "サイズ", "色", "オプション"],
    offer: "お客様への提案", ready: "完了", note: "配送込み · 14日間有効", lines: [["品目", "4"], ["価格", "料金表どおり"]],
  },
};

const mockCopy: Partial<Record<Locale, MockCopy>> = { en, ru, es, pt, de, fr, id, vi, tr, ar, zh, ja };

export function getMockCopy(locale?: Locale): MockCopy {
  return (locale && mockCopy[locale]) || en;
}
