/** Buyer onboarding email copy: 12 locales, per-product setup steps. */

export type BuyerProduct = "aime" | "assistant" | "showroom";

export type BuyerCopy = {
  subject: string;
  lead: string;
  cta: string;
  stepsTitle: string;
  steps: Record<BuyerProduct, string[]>;
  expired: string;
  resendCta: string;
  help: string;
};

export const BUYER_COPY: Record<string, BuyerCopy> = {
  en: {
    subject: "Your access is ready — setup steps inside",
    lead: "Payment confirmed. Your workspace is created. The button below signs you in — no password needed.",
    cta: "Open my workspace",
    stepsTitle: "How to get started",
    steps: {
      aime: [
        "Open your workspace with the button above.",
        "Fill in the brand profile: what you sell, who your audience is, tone of voice, links.",
        "Connect the social accounts where posts should go.",
        "Review the first drafts and approve them. Auto-publishing can be switched on later, after a few clean cycles.",
      ],
      assistant: [
        "Open your workspace with the button above.",
        "Add knowledge: your website link, FAQ, prices and documents.",
        "Connect channels: copy the chat widget code from settings and paste it on your site; add Telegram, WhatsApp, Instagram or Messenger (Meta channels need a verified Meta Business account).",
        "Send a test message and choose who takes over when a person is needed.",
      ],
      showroom: [
        "Open your workspace with the button above.",
        "Upload your catalog: products or services with prices and photos.",
        "Fill in company details and offer terms.",
        "Share your showroom link or put it on your site, then send a test request.",
      ],
    },
    expired: "The sign-in link is single-use and expires soon. If it no longer works, request a new one:",
    resendCta: "Send me a new link",
    help: "Questions? Reply to hello@ai-mark.agency from the email you paid with.",
  },
  ru: {
    subject: "Доступ готов — внутри шаги настройки",
    lead: "Оплата подтверждена. Рабочая область создана. Кнопка ниже входит без пароля.",
    cta: "Открыть рабочую область",
    stepsTitle: "С чего начать",
    steps: {
      aime: [
        "Откройте рабочую область кнопкой выше.",
        "Заполните профиль бренда: что продаёте, кто аудитория, тон, ссылки.",
        "Подключите соцсети, куда публиковать посты.",
        "Проверьте первые черновики и одобрите их. Автопубликацию можно включить позже, после нескольких чистых циклов.",
      ],
      assistant: [
        "Откройте рабочую область кнопкой выше.",
        "Добавьте знания: ссылку на сайт, FAQ, цены и документы.",
        "Подключите каналы: скопируйте код чат-виджета в настройках и вставьте на сайт; добавьте Telegram, WhatsApp, Instagram или Messenger (для каналов Meta нужен подтверждённый Meta Business аккаунт).",
        "Отправьте тестовое сообщение и выберите, кто подключается, когда нужен человек.",
      ],
      showroom: [
        "Откройте рабочую область кнопкой выше.",
        "Загрузите каталог: товары или услуги с ценами и фото.",
        "Заполните данные компании и условия предложения.",
        "Поделитесь ссылкой на шоурум или разместите его на сайте и отправьте тестовую заявку.",
      ],
    },
    expired: "Ссылка для входа одноразовая и скоро истекает. Если она уже не работает, запросите новую:",
    resendCta: "Прислать новую ссылку",
    help: "Вопросы? Напишите на hello@ai-mark.agency с того же email, с которого оплачивали.",
  },
  de: {
    subject: "Ihr Zugang ist bereit — mit Einrichtungsschritten",
    lead: "Zahlung bestätigt. Ihr Arbeitsbereich ist angelegt. Der Button unten meldet Sie ohne Passwort an.",
    cta: "Arbeitsbereich öffnen",
    stepsTitle: "So starten Sie",
    steps: {
      aime: [
        "Öffnen Sie Ihren Arbeitsbereich über den Button oben.",
        "Füllen Sie das Markenprofil aus: Angebot, Zielgruppe, Tonalität, Links.",
        "Verbinden Sie die Social-Media-Konten, auf denen gepostet werden soll.",
        "Prüfen und genehmigen Sie die ersten Entwürfe. Automatisches Posten lässt sich nach einigen sauberen Zyklen einschalten.",
      ],
      assistant: [
        "Öffnen Sie Ihren Arbeitsbereich über den Button oben.",
        "Fügen Sie Wissen hinzu: Website-Link, FAQ, Preise und Dokumente.",
        "Verbinden Sie Kanäle: Chat-Widget-Code aus den Einstellungen kopieren und auf Ihrer Website einfügen; Telegram, WhatsApp, Instagram oder Messenger hinzufügen (Meta-Kanäle brauchen ein verifiziertes Meta-Business-Konto).",
        "Senden Sie eine Testnachricht und legen Sie fest, wer übernimmt, wenn ein Mensch gebraucht wird.",
      ],
      showroom: [
        "Öffnen Sie Ihren Arbeitsbereich über den Button oben.",
        "Laden Sie Ihren Katalog hoch: Produkte oder Leistungen mit Preisen und Fotos.",
        "Tragen Sie Firmendaten und Angebotsbedingungen ein.",
        "Teilen Sie den Showroom-Link oder binden Sie ihn auf Ihrer Website ein und senden Sie eine Testanfrage.",
      ],
    },
    expired: "Der Anmeldelink ist einmalig und läuft bald ab. Falls er nicht mehr funktioniert, fordern Sie einen neuen an:",
    resendCta: "Neuen Link senden",
    help: "Fragen? Schreiben Sie an hello@ai-mark.agency von der E-Mail, mit der Sie bezahlt haben.",
  },
  es: {
    subject: "Tu acceso está listo — pasos de configuración",
    lead: "Pago confirmado. Tu espacio de trabajo está creado. El botón de abajo inicia sesión sin contraseña.",
    cta: "Abrir mi espacio",
    stepsTitle: "Cómo empezar",
    steps: {
      aime: [
        "Abre tu espacio con el botón de arriba.",
        "Completa el perfil de marca: qué vendes, tu audiencia, tono y enlaces.",
        "Conecta las redes sociales donde se publicará.",
        "Revisa y aprueba los primeros borradores. La publicación automática se puede activar después de varios ciclos limpios.",
      ],
      assistant: [
        "Abre tu espacio con el botón de arriba.",
        "Añade conocimiento: enlace a tu web, FAQ, precios y documentos.",
        "Conecta canales: copia el código del widget de chat en ajustes y pégalo en tu web; añade Telegram, WhatsApp, Instagram o Messenger (los canales de Meta requieren una cuenta Meta Business verificada).",
        "Envía un mensaje de prueba y elige quién toma el control cuando haga falta una persona.",
      ],
      showroom: [
        "Abre tu espacio con el botón de arriba.",
        "Sube tu catálogo: productos o servicios con precios y fotos.",
        "Completa los datos de la empresa y las condiciones de la oferta.",
        "Comparte el enlace del showroom o colócalo en tu web y envía una solicitud de prueba.",
      ],
    },
    expired: "El enlace de acceso es de un solo uso y caduca pronto. Si ya no funciona, pide uno nuevo:",
    resendCta: "Enviarme un enlace nuevo",
    help: "¿Dudas? Escribe a hello@ai-mark.agency desde el email con el que pagaste.",
  },
  fr: {
    subject: "Votre accès est prêt — étapes de configuration",
    lead: "Paiement confirmé. Votre espace de travail est créé. Le bouton ci-dessous vous connecte sans mot de passe.",
    cta: "Ouvrir mon espace",
    stepsTitle: "Pour commencer",
    steps: {
      aime: [
        "Ouvrez votre espace avec le bouton ci-dessus.",
        "Remplissez le profil de marque : offre, audience, ton, liens.",
        "Connectez les réseaux sociaux où publier.",
        "Relisez et validez les premiers brouillons. La publication automatique peut être activée après quelques cycles sans erreur.",
      ],
      assistant: [
        "Ouvrez votre espace avec le bouton ci-dessus.",
        "Ajoutez vos connaissances : lien du site, FAQ, prix et documents.",
        "Connectez les canaux : copiez le code du widget de chat dans les réglages et collez-le sur votre site ; ajoutez Telegram, WhatsApp, Instagram ou Messenger (les canaux Meta exigent un compte Meta Business vérifié).",
        "Envoyez un message test et choisissez qui prend le relais quand un humain est nécessaire.",
      ],
      showroom: [
        "Ouvrez votre espace avec le bouton ci-dessus.",
        "Importez votre catalogue : produits ou services avec prix et photos.",
        "Renseignez les informations de l’entreprise et les conditions de l’offre.",
        "Partagez le lien du showroom ou intégrez-le à votre site, puis envoyez une demande test.",
      ],
    },
    expired: "Le lien de connexion est à usage unique et expire bientôt. S’il ne fonctionne plus, demandez-en un nouveau :",
    resendCta: "M’envoyer un nouveau lien",
    help: "Des questions ? Écrivez à hello@ai-mark.agency depuis l’e-mail utilisé pour le paiement.",
  },
  pt: {
    subject: "Seu acesso está pronto — passos de configuração",
    lead: "Pagamento confirmado. Seu espaço de trabalho foi criado. O botão abaixo entra sem senha.",
    cta: "Abrir meu espaço",
    stepsTitle: "Como começar",
    steps: {
      aime: [
        "Abra seu espaço pelo botão acima.",
        "Preencha o perfil da marca: o que vende, público, tom de voz, links.",
        "Conecte as redes sociais onde os posts serão publicados.",
        "Revise e aprove os primeiros rascunhos. A publicação automática pode ser ativada depois de alguns ciclos sem erros.",
      ],
      assistant: [
        "Abra seu espaço pelo botão acima.",
        "Adicione conhecimento: link do site, FAQ, preços e documentos.",
        "Conecte canais: copie o código do widget de chat nas configurações e cole no seu site; adicione Telegram, WhatsApp, Instagram ou Messenger (canais Meta exigem conta Meta Business verificada).",
        "Envie uma mensagem de teste e escolha quem assume quando for preciso uma pessoa.",
      ],
      showroom: [
        "Abra seu espaço pelo botão acima.",
        "Envie seu catálogo: produtos ou serviços com preços e fotos.",
        "Preencha os dados da empresa e as condições da oferta.",
        "Compartilhe o link do showroom ou coloque-o no seu site e envie um pedido de teste.",
      ],
    },
    expired: "O link de acesso é de uso único e expira em breve. Se não funcionar mais, peça um novo:",
    resendCta: "Enviar um novo link",
    help: "Dúvidas? Escreva para hello@ai-mark.agency a partir do e-mail usado no pagamento.",
  },
  tr: {
    subject: "Erişiminiz hazır — kurulum adımları içeride",
    lead: "Ödeme onaylandı. Çalışma alanınız oluşturuldu. Aşağıdaki buton şifresiz giriş yapar.",
    cta: "Çalışma alanımı aç",
    stepsTitle: "Nasıl başlanır",
    steps: {
      aime: [
        "Yukarıdaki butonla çalışma alanınızı açın.",
        "Marka profilini doldurun: ne sattığınız, hedef kitle, üslup, bağlantılar.",
        "Gönderilerin yayınlanacağı sosyal medya hesaplarını bağlayın.",
        "İlk taslakları inceleyip onaylayın. Otomatik yayın, birkaç sorunsuz döngüden sonra açılabilir.",
      ],
      assistant: [
        "Yukarıdaki butonla çalışma alanınızı açın.",
        "Bilgi ekleyin: web sitesi bağlantısı, SSS, fiyatlar ve belgeler.",
        "Kanalları bağlayın: ayarlardan sohbet widget kodunu kopyalayıp sitenize yapıştırın; Telegram, WhatsApp, Instagram veya Messenger ekleyin (Meta kanalları doğrulanmış Meta Business hesabı gerektirir).",
        "Test mesajı gönderin ve bir insan gerektiğinde kimin devralacağını seçin.",
      ],
      showroom: [
        "Yukarıdaki butonla çalışma alanınızı açın.",
        "Kataloğunuzu yükleyin: fiyat ve fotoğraflı ürün veya hizmetler.",
        "Şirket bilgilerini ve teklif koşullarını doldurun.",
        "Showroom bağlantısını paylaşın veya sitenize ekleyin, ardından test talebi gönderin.",
      ],
    },
    expired: "Giriş bağlantısı tek kullanımlıktır ve yakında sona erer. Çalışmıyorsa yenisini isteyin:",
    resendCta: "Yeni bağlantı gönder",
    help: "Sorularınız mı var? Ödeme yaptığınız e-postadan hello@ai-mark.agency adresine yazın.",
  },
  vi: {
    subject: "Quyền truy cập đã sẵn sàng — kèm các bước thiết lập",
    lead: "Đã xác nhận thanh toán. Không gian làm việc đã được tạo. Nút bên dưới đăng nhập không cần mật khẩu.",
    cta: "Mở không gian làm việc",
    stepsTitle: "Bắt đầu như thế nào",
    steps: {
      aime: [
        "Mở không gian làm việc bằng nút ở trên.",
        "Điền hồ sơ thương hiệu: bạn bán gì, khách hàng là ai, giọng điệu, liên kết.",
        "Kết nối các tài khoản mạng xã hội sẽ đăng bài.",
        "Xem và duyệt các bản nháp đầu tiên. Có thể bật tự động đăng sau vài chu kỳ ổn định.",
      ],
      assistant: [
        "Mở không gian làm việc bằng nút ở trên.",
        "Thêm kiến thức: liên kết website, FAQ, bảng giá và tài liệu.",
        "Kết nối kênh: sao chép mã widget chat trong phần cài đặt và dán vào website; thêm Telegram, WhatsApp, Instagram hoặc Messenger (kênh Meta cần tài khoản Meta Business đã xác minh).",
        "Gửi tin nhắn thử và chọn người tiếp nhận khi cần con người.",
      ],
      showroom: [
        "Mở không gian làm việc bằng nút ở trên.",
        "Tải lên danh mục: sản phẩm hoặc dịch vụ kèm giá và ảnh.",
        "Điền thông tin công ty và điều kiện chào hàng.",
        "Chia sẻ liên kết showroom hoặc đặt lên website, rồi gửi một yêu cầu thử.",
      ],
    },
    expired: "Liên kết đăng nhập chỉ dùng một lần và sắp hết hạn. Nếu không còn hoạt động, hãy yêu cầu liên kết mới:",
    resendCta: "Gửi cho tôi liên kết mới",
    help: "Có câu hỏi? Viết tới hello@ai-mark.agency từ email bạn đã dùng để thanh toán.",
  },
  id: {
    subject: "Akses Anda siap — langkah penyiapan di dalam",
    lead: "Pembayaran dikonfirmasi. Ruang kerja Anda sudah dibuat. Tombol di bawah masuk tanpa kata sandi.",
    cta: "Buka ruang kerja saya",
    stepsTitle: "Cara memulai",
    steps: {
      aime: [
        "Buka ruang kerja dengan tombol di atas.",
        "Isi profil merek: apa yang Anda jual, audiens, gaya bahasa, tautan.",
        "Hubungkan akun media sosial tempat postingan diterbitkan.",
        "Tinjau dan setujui draf pertama. Publikasi otomatis bisa diaktifkan setelah beberapa siklus lancar.",
      ],
      assistant: [
        "Buka ruang kerja dengan tombol di atas.",
        "Tambahkan pengetahuan: tautan situs, FAQ, harga, dan dokumen.",
        "Hubungkan kanal: salin kode widget chat di pengaturan dan tempel di situs Anda; tambahkan Telegram, WhatsApp, Instagram, atau Messenger (kanal Meta memerlukan akun Meta Business terverifikasi).",
        "Kirim pesan uji dan pilih siapa yang mengambil alih saat dibutuhkan manusia.",
      ],
      showroom: [
        "Buka ruang kerja dengan tombol di atas.",
        "Unggah katalog: produk atau layanan dengan harga dan foto.",
        "Isi data perusahaan dan ketentuan penawaran.",
        "Bagikan tautan showroom atau pasang di situs Anda, lalu kirim permintaan uji.",
      ],
    },
    expired: "Tautan masuk hanya sekali pakai dan segera kedaluwarsa. Jika sudah tidak berfungsi, minta yang baru:",
    resendCta: "Kirim tautan baru",
    help: "Ada pertanyaan? Tulis ke hello@ai-mark.agency dari email yang Anda gunakan untuk membayar.",
  },
  zh: {
    subject: "您的访问已就绪——内附设置步骤",
    lead: "付款已确认，工作区已创建。点击下方按钮即可免密码登录。",
    cta: "打开我的工作区",
    stepsTitle: "如何开始",
    steps: {
      aime: [
        "点击上方按钮打开工作区。",
        "填写品牌资料：销售内容、目标受众、语气风格和链接。",
        "连接要发布内容的社交媒体账号。",
        "审阅并批准首批草稿。经过几轮无误的周期后，可开启自动发布。",
      ],
      assistant: [
        "点击上方按钮打开工作区。",
        "添加知识：网站链接、常见问题、价格和文档。",
        "连接渠道：在设置中复制聊天组件代码并粘贴到您的网站；添加 Telegram、WhatsApp、Instagram 或 Messenger（Meta 渠道需要已验证的 Meta Business 账号）。",
        "发送测试消息，并选择需要人工时由谁接手。",
      ],
      showroom: [
        "点击上方按钮打开工作区。",
        "上传产品目录：带价格和图片的产品或服务。",
        "填写公司信息和报价条款。",
        "分享展厅链接或嵌入您的网站，然后发送一次测试询价。",
      ],
    },
    expired: "登录链接仅可使用一次且即将过期。如已失效，请申请新链接：",
    resendCta: "发送新链接",
    help: "有问题？请用付款时的邮箱发送邮件至 hello@ai-mark.agency。",
  },
  ja: {
    subject: "アクセスの準備ができました — 設定手順つき",
    lead: "お支払いを確認し、ワークスペースを作成しました。下のボタンからパスワードなしでログインできます。",
    cta: "ワークスペースを開く",
    stepsTitle: "はじめかた",
    steps: {
      aime: [
        "上のボタンからワークスペースを開きます。",
        "ブランドプロフィールを入力します：販売内容、ターゲット、トーン、リンク。",
        "投稿先のSNSアカウントを接続します。",
        "最初の下書きを確認して承認します。問題のないサイクルを数回経た後、自動投稿をオンにできます。",
      ],
      assistant: [
        "上のボタンからワークスペースを開きます。",
        "ナレッジを追加します：サイトのリンク、FAQ、料金、資料。",
        "チャネルを接続します：設定からチャットウィジェットのコードをコピーしてサイトに貼り付け、Telegram・WhatsApp・Instagram・Messengerを追加します（Metaのチャネルには認証済みのMeta Businessアカウントが必要です）。",
        "テストメッセージを送り、人の対応が必要なときの担当者を決めます。",
      ],
      showroom: [
        "上のボタンからワークスペースを開きます。",
        "カタログをアップロードします：価格と写真つきの商品やサービス。",
        "会社情報と提案条件を入力します。",
        "ショールームのリンクを共有するかサイトに掲載し、テスト依頼を送ります。",
      ],
    },
    expired: "ログインリンクは1回限りで、まもなく期限切れになります。使えない場合は新しいリンクを申請してください：",
    resendCta: "新しいリンクを送る",
    help: "ご質問は、お支払いに使ったメールアドレスから hello@ai-mark.agency までどうぞ。",
  },
  ar: {
    subject: "وصولك جاهز — خطوات الإعداد بالداخل",
    lead: "تم تأكيد الدفع وإنشاء مساحة العمل. الزر أدناه يسجّل دخولك بدون كلمة مرور.",
    cta: "افتح مساحة العمل",
    stepsTitle: "كيف تبدأ",
    steps: {
      aime: [
        "افتح مساحة العمل من الزر أعلاه.",
        "املأ ملف العلامة التجارية: ماذا تبيع، جمهورك، أسلوب الكتابة، الروابط.",
        "اربط حسابات التواصل الاجتماعي التي سيتم النشر عليها.",
        "راجع المسودات الأولى ووافق عليها. يمكن تفعيل النشر التلقائي لاحقاً بعد عدة دورات سليمة.",
      ],
      assistant: [
        "افتح مساحة العمل من الزر أعلاه.",
        "أضف المعرفة: رابط موقعك، الأسئلة الشائعة، الأسعار والمستندات.",
        "اربط القنوات: انسخ كود أداة الدردشة من الإعدادات والصقه في موقعك؛ أضف Telegram أو WhatsApp أو Instagram أو Messenger (قنوات Meta تتطلب حساب Meta Business موثّقاً).",
        "أرسل رسالة تجريبية وحدد من يتولى المحادثة عند الحاجة إلى شخص.",
      ],
      showroom: [
        "افتح مساحة العمل من الزر أعلاه.",
        "ارفع الكتالوج: منتجات أو خدمات مع الأسعار والصور.",
        "املأ بيانات الشركة وشروط العرض.",
        "شارك رابط صالة العرض أو ضعه على موقعك، ثم أرسل طلباً تجريبياً.",
      ],
    },
    expired: "رابط الدخول صالح لمرة واحدة وينتهي قريباً. إذا لم يعد يعمل، اطلب رابطاً جديداً:",
    resendCta: "أرسل لي رابطاً جديداً",
    help: "لديك أسئلة؟ راسل hello@ai-mark.agency من البريد الذي دفعت به.",
  },
};
