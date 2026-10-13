import type { Locale } from "@/lib/site";
import { skuPrice, SHOWROOM_AI_SETUP_FEE_USD, SHOWROOM_AI_TRIAL_DAYS } from "@/lib/showroom-ai";
import { formatUsdPrice } from "@/lib/pricing/crypto-checkout";

/**
 * Plain-language public copy for businesses (pricing + products).
 * One price system only: Start / Business / Pro + optional setup, all
 * interpolated from lib/showroom-ai constants ({start} {business} {pro}
 * {setup} {days}). Every locale spelled out; unknown ones fall back to EN.
 * No city names.
 */
export interface RolePlain {
  name: string;
  value: string;
  who: string;
  extra: string;
  price: string;
}

export interface PlainCopy {
  brandLine: string;
  pricing: {
    eyebrow: string;
    title: string;
    lead: string;
    customTitle: string;
    customBody: string;
    customCta: string;
    payNote: string;
    footnote: string;
  };
  products: {
    eyebrow: string;
    title: string;
    lead: string;
    band: string;
    roles: { seller: RolePlain; marketer: RolePlain; assistant: RolePlain };
  };
}

const en: PlainCopy = {
  brandLine: "Showroom AI — one product, three roles",
  pricing: {
    eyebrow: "Pricing",
    title: "Three plans. Start in a day.",
    lead: "Start {start}/mo — the Seller. Business {business}/mo — Seller + Marketer. Pro {pro}/mo — Seller + Marketer with more channels. {days} days free, no card. Setup by our team is optional: {setup} one time.",
    customTitle: "Need a team, a website or an app?",
    customBody: "Tell us in the chat what you need — we will quote it individually.",
    customCta: "Write in chat",
    payNote: "How to pay today: in USDT or USDC (stablecoins) on the payment page. If that is inconvenient, write to us in the chat and we will help.",
    footnote: "Prices in USD per month. Ad budget is paid separately. We don't promise sales numbers — you see the results in your chats and orders.",
  },
  products: {
    eyebrow: "Showroom AI",
    title: "One product — three roles",
    lead: "The Seller answers customers and takes orders and bookings. The Marketer brings customers with posts you approve. The Business Assistant answers common questions.",
    band: "Showroom AI",
    roles: {
      seller: {
        name: "Seller",
        value: "Answers customers 24/7 in your chats, picks the right product or service, gives the exact price from your price list and books the order or appointment.",
        who: "Shops, salons, services — anyone who loses customers when nobody answers quickly.",
        extra: "Website chat and Telegram, plus WhatsApp / Instagram through your own Meta Business. Hands the chat to you when needed.",
        price: "Start {start}/mo · in every plan",
      },
      marketer: {
        name: "Marketer",
        value: "Studies your niche and competitors, makes a content plan, writes posts and makes visuals. Publishes only after you tap “approve” in Telegram.",
        who: "Businesses that need regular posts and new customers but have no marketer.",
        extra: "Business: Instagram, plan and posts. Pro: Instagram, Facebook and Threads, Reels and analytics.",
        price: "Business {business}/mo · Pro {pro}/mo",
      },
      assistant: {
        name: "Business Assistant",
        value: "Answers common questions from your information, finds out what the customer needs and passes the chat to a person.",
        who: "Teams with many repeated questions in messengers and website chat.",
        extra: "All chats in one inbox. A person takes over in one click.",
        price: "Added to any plan on request — price in chat",
      },
    },
  },
};

const ru: PlainCopy = {
  brandLine: "Showroom AI — один продукт, три роли",
  pricing: {
    eyebrow: "Тарифы",
    title: "Три тарифа. Запуск за сутки.",
    lead: "Start {start}/мес — Продавец. Business {business}/мес — Продавец + Маркетолог. Pro {pro}/мес — Продавец + Маркетолог с большим числом каналов. {days} дней бесплатно, без карты. Настройка нашей командой — по желанию: {setup} разово.",
    customTitle: "Нужна команда, сайт или приложение?",
    customBody: "Напишите в чат, что нужно, — посчитаем индивидуально.",
    customCta: "Написать в чат",
    payNote: "Как оплатить сейчас: в USDT или USDC (стейблкоины) на странице оплаты. Если так неудобно — напишите в чат, поможем.",
    footnote: "Цены в USD в месяц. Рекламный бюджет оплачивается отдельно. Мы не обещаем цифры продаж — результат вы видите в своих чатах и заказах.",
  },
  products: {
    eyebrow: "Showroom AI",
    title: "Один продукт — три роли",
    lead: "Продавец отвечает клиентам и оформляет заказы и записи. Маркетолог приводит клиентов постами, которые вы одобряете. Бизнес-ассистент отвечает на частые вопросы.",
    band: "Showroom AI",
    roles: {
      seller: {
        name: "Продавец",
        value: "Отвечает клиентам 24/7 в ваших чатах, подбирает товар или услугу, называет точную цену по вашему прайсу и оформляет заказ или запись.",
        who: "Магазины, салоны, услуги — все, кто теряет клиентов, когда им не отвечают быстро.",
        extra: "Чат на сайте и Telegram, плюс WhatsApp / Instagram через ваш Meta Business. Передаёт диалог вам, когда нужно.",
        price: "Start {start}/мес · есть в каждом тарифе",
      },
      marketer: {
        name: "Маркетолог",
        value: "Изучает вашу нишу и конкурентов, составляет контент-план, пишет посты и делает картинки. Публикует только после вашего «одобрить» в Telegram.",
        who: "Бизнесу, которому нужны регулярные посты и новые клиенты, а маркетолога нет.",
        extra: "Business: Instagram, план и посты. Pro: Instagram, Facebook и Threads, Reels и аналитика.",
        price: "Business {business}/мес · Pro {pro}/мес",
      },
      assistant: {
        name: "Бизнес-ассистент",
        value: "Отвечает на частые вопросы по вашей информации, выясняет, что нужно клиенту, и передаёт диалог человеку.",
        who: "Командам, у которых много одинаковых вопросов в мессенджерах и чате сайта.",
        extra: "Все чаты в одном окне. Человек подключается в один клик.",
        price: "Подключается к любому тарифу по запросу — цену назовём в чате",
      },
    },
  },
};

const es: PlainCopy = {
  brandLine: "Showroom AI — un producto, tres roles",
  pricing: {
    eyebrow: "Precios",
    title: "Tres planes. Empiezas en un día.",
    lead: "Start {start}/mes — el Vendedor. Business {business}/mes — Vendedor + Marketer. Pro {pro}/mes — Vendedor + Marketer con más canales. {days} días gratis, sin tarjeta. La configuración por nuestro equipo es opcional: {setup} una vez.",
    customTitle: "¿Necesitas un equipo, una web o una app?",
    customBody: "Cuéntanos en el chat qué necesitas y te daremos un precio individual.",
    customCta: "Escribir en el chat",
    payNote: "Cómo pagar hoy: en USDT o USDC (stablecoins) en la página de pago. Si no te resulta cómodo, escríbenos en el chat y te ayudamos.",
    footnote: "Precios en USD al mes. El presupuesto de anuncios se paga aparte. No prometemos cifras de ventas: ves el resultado en tus chats y pedidos.",
  },
  products: {
    eyebrow: "Showroom AI",
    title: "Un producto — tres roles",
    lead: "El Vendedor responde a los clientes y toma pedidos y citas. El Marketer trae clientes con publicaciones que tú apruebas. El Asistente responde las preguntas frecuentes.",
    band: "Showroom AI",
    roles: {
      seller: {
        name: "Vendedor",
        value: "Responde a los clientes 24/7 en tus chats, elige el producto o servicio, da el precio exacto de tu lista y reserva el pedido o la cita.",
        who: "Tiendas, salones, servicios: cualquiera que pierde clientes cuando nadie responde rápido.",
        extra: "Chat web y Telegram, además de WhatsApp / Instagram con tu propio Meta Business. Te pasa el chat cuando hace falta.",
        price: "Start {start}/mes · en todos los planes",
      },
      marketer: {
        name: "Marketer",
        value: "Estudia tu nicho y la competencia, hace el plan de contenidos, escribe publicaciones y crea imágenes. Publica solo cuando pulsas «aprobar» en Telegram.",
        who: "Negocios que necesitan publicaciones regulares y nuevos clientes, pero no tienen marketer.",
        extra: "Business: Instagram, plan y publicaciones. Pro: Instagram, Facebook y Threads, Reels y analítica.",
        price: "Business {business}/mes · Pro {pro}/mes",
      },
      assistant: {
        name: "Asistente de negocio",
        value: "Responde las preguntas frecuentes con tu información, averigua qué necesita el cliente y pasa el chat a una persona.",
        who: "Equipos con muchas preguntas repetidas en mensajería y chat web.",
        extra: "Todos los chats en una bandeja. Una persona toma el control en un clic.",
        price: "Se añade a cualquier plan a petición — precio en el chat",
      },
    },
  },
};

const pt: PlainCopy = {
  brandLine: "Showroom AI — um produto, três funções",
  pricing: {
    eyebrow: "Preços",
    title: "Três planos. Comece em um dia.",
    lead: "Start {start}/mês — o Vendedor. Business {business}/mês — Vendedor + Marketer. Pro {pro}/mês — Vendedor + Marketer com mais canais. {days} dias grátis, sem cartão. Configuração pela nossa equipe é opcional: {setup} uma vez.",
    customTitle: "Precisa de uma equipe, um site ou um app?",
    customBody: "Conte no chat o que precisa — faremos um orçamento individual.",
    customCta: "Escrever no chat",
    payNote: "Como pagar hoje: em USDT ou USDC (stablecoins) na página de pagamento. Se não for prático, escreva no chat e ajudamos.",
    footnote: "Preços em USD por mês. A verba de anúncios é paga à parte. Não prometemos números de vendas — você vê o resultado nos seus chats e pedidos.",
  },
  products: {
    eyebrow: "Showroom AI",
    title: "Um produto — três funções",
    lead: "O Vendedor responde clientes e registra pedidos e agendamentos. O Marketer traz clientes com posts que você aprova. O Assistente responde às perguntas frequentes.",
    band: "Showroom AI",
    roles: {
      seller: {
        name: "Vendedor",
        value: "Responde clientes 24/7 nos seus chats, escolhe o produto ou serviço certo, informa o preço exato da sua tabela e reserva o pedido ou horário.",
        who: "Lojas, salões, serviços — quem perde clientes quando ninguém responde rápido.",
        extra: "Chat no site e Telegram, além de WhatsApp / Instagram pelo seu próprio Meta Business. Passa a conversa para você quando necessário.",
        price: "Start {start}/mês · em todos os planos",
      },
      marketer: {
        name: "Marketer",
        value: "Estuda seu nicho e concorrentes, faz o plano de conteúdo, escreve posts e cria imagens. Publica só depois que você toca em “aprovar” no Telegram.",
        who: "Negócios que precisam de posts regulares e novos clientes, mas não têm marketer.",
        extra: "Business: Instagram, plano e posts. Pro: Instagram, Facebook e Threads, Reels e análises.",
        price: "Business {business}/mês · Pro {pro}/mês",
      },
      assistant: {
        name: "Assistente de negócios",
        value: "Responde às perguntas frequentes com as suas informações, descobre o que o cliente precisa e passa a conversa para uma pessoa.",
        who: "Equipes com muitas perguntas repetidas no mensageiro e no chat do site.",
        extra: "Todos os chats em uma caixa. Uma pessoa assume em um clique.",
        price: "Adicionado a qualquer plano sob pedido — preço no chat",
      },
    },
  },
};

const de: PlainCopy = {
  brandLine: "Showroom AI — ein Produkt, drei Rollen",
  pricing: {
    eyebrow: "Preise",
    title: "Drei Tarife. Start an einem Tag.",
    lead: "Start {start}/Monat — der Verkäufer. Business {business}/Monat — Verkäufer + Marketer. Pro {pro}/Monat — Verkäufer + Marketer mit mehr Kanälen. {days} Tage kostenlos, ohne Karte. Einrichtung durch unser Team optional: {setup} einmalig.",
    customTitle: "Brauchen Sie ein Team, eine Website oder eine App?",
    customBody: "Schreiben Sie im Chat, was Sie brauchen — wir machen ein individuelles Angebot.",
    customCta: "Im Chat schreiben",
    payNote: "So bezahlen Sie heute: in USDT oder USDC (Stablecoins) auf der Zahlungsseite. Wenn das unpraktisch ist, schreiben Sie uns im Chat — wir helfen.",
    footnote: "Preise in USD pro Monat. Werbebudget wird separat bezahlt. Wir versprechen keine Umsatzzahlen — das Ergebnis sehen Sie in Ihren Chats und Bestellungen.",
  },
  products: {
    eyebrow: "Showroom AI",
    title: "Ein Produkt — drei Rollen",
    lead: "Der Verkäufer antwortet Kunden und nimmt Bestellungen und Termine an. Der Marketer bringt Kunden mit Posts, die Sie freigeben. Der Assistent beantwortet häufige Fragen.",
    band: "Showroom AI",
    roles: {
      seller: {
        name: "Verkäufer",
        value: "Antwortet Kunden rund um die Uhr in Ihren Chats, wählt das passende Produkt oder die Leistung, nennt den genauen Preis aus Ihrer Preisliste und bucht Bestellung oder Termin.",
        who: "Läden, Salons, Dienstleister — alle, die Kunden verlieren, wenn niemand schnell antwortet.",
        extra: "Website-Chat und Telegram, dazu WhatsApp / Instagram über Ihr eigenes Meta Business. Übergibt den Chat bei Bedarf an Sie.",
        price: "Start {start}/Monat · in jedem Tarif",
      },
      marketer: {
        name: "Marketer",
        value: "Analysiert Ihre Nische und Konkurrenz, erstellt einen Redaktionsplan, schreibt Posts und gestaltet Bilder. Veröffentlicht erst, wenn Sie in Telegram auf „Freigeben“ tippen.",
        who: "Betriebe, die regelmäßige Posts und neue Kunden brauchen, aber keinen Marketer haben.",
        extra: "Business: Instagram, Plan und Posts. Pro: Instagram, Facebook und Threads, Reels und Auswertung.",
        price: "Business {business}/Monat · Pro {pro}/Monat",
      },
      assistant: {
        name: "Business-Assistent",
        value: "Beantwortet häufige Fragen anhand Ihrer Informationen, klärt, was der Kunde braucht, und übergibt den Chat an einen Menschen.",
        who: "Teams mit vielen wiederkehrenden Fragen in Messengern und im Website-Chat.",
        extra: "Alle Chats in einem Posteingang. Ein Mensch übernimmt mit einem Klick.",
        price: "Auf Wunsch zu jedem Tarif — Preis im Chat",
      },
    },
  },
};

const fr: PlainCopy = {
  brandLine: "Showroom AI — un produit, trois rôles",
  pricing: {
    eyebrow: "Tarifs",
    title: "Trois offres. Lancement en un jour.",
    lead: "Start {start}/mois — le Vendeur. Business {business}/mois — Vendeur + Marketer. Pro {pro}/mois — Vendeur + Marketer avec plus de canaux. {days} jours gratuits, sans carte. Mise en place par notre équipe en option : {setup} une fois.",
    customTitle: "Besoin d’une équipe, d’un site ou d’une appli ?",
    customBody: "Dites-nous dans le chat ce qu’il vous faut — nous ferons un devis individuel.",
    customCta: "Écrire dans le chat",
    payNote: "Comment payer aujourd’hui : en USDT ou USDC (stablecoins) sur la page de paiement. Si ce n’est pas pratique, écrivez-nous dans le chat, nous vous aiderons.",
    footnote: "Prix en USD par mois. Le budget publicitaire est payé à part. Nous ne promettons pas de chiffres de ventes — vous voyez le résultat dans vos chats et commandes.",
  },
  products: {
    eyebrow: "Showroom AI",
    title: "Un produit — trois rôles",
    lead: "Le Vendeur répond aux clients et prend commandes et rendez-vous. Le Marketer attire des clients avec des posts que vous validez. L’Assistant répond aux questions fréquentes.",
    band: "Showroom AI",
    roles: {
      seller: {
        name: "Vendeur",
        value: "Répond aux clients 24/7 dans vos chats, choisit le bon produit ou service, donne le prix exact de votre grille et réserve la commande ou le rendez-vous.",
        who: "Boutiques, salons, services — tous ceux qui perdent des clients faute de réponse rapide.",
        extra: "Chat du site et Telegram, plus WhatsApp / Instagram via votre propre Meta Business. Vous passe la conversation si besoin.",
        price: "Start {start}/mois · dans chaque offre",
      },
      marketer: {
        name: "Marketer",
        value: "Étudie votre niche et vos concurrents, fait le plan de contenu, écrit les posts et crée les visuels. Publie seulement après votre « valider » dans Telegram.",
        who: "Entreprises qui ont besoin de posts réguliers et de nouveaux clients, sans marketeur.",
        extra: "Business : Instagram, plan et posts. Pro : Instagram, Facebook et Threads, Reels et statistiques.",
        price: "Business {business}/mois · Pro {pro}/mois",
      },
      assistant: {
        name: "Assistant d’entreprise",
        value: "Répond aux questions fréquentes à partir de vos informations, comprend le besoin du client et transmet la conversation à une personne.",
        who: "Équipes avec beaucoup de questions répétées en messagerie et sur le chat du site.",
        extra: "Tous les chats dans une seule boîte. Une personne reprend en un clic.",
        price: "Ajouté à toute offre sur demande — prix dans le chat",
      },
    },
  },
};

const id: PlainCopy = {
  brandLine: "Showroom AI — satu produk, tiga peran",
  pricing: {
    eyebrow: "Harga",
    title: "Tiga paket. Mulai dalam sehari.",
    lead: "Start {start}/bln — Penjual. Business {business}/bln — Penjual + Marketer. Pro {pro}/bln — Penjual + Marketer dengan lebih banyak kanal. {days} hari gratis, tanpa kartu. Penyiapan oleh tim kami opsional: {setup} sekali.",
    customTitle: "Butuh tim, situs, atau aplikasi?",
    customBody: "Ceritakan kebutuhan Anda di chat — kami beri harga khusus.",
    customCta: "Tulis di chat",
    payNote: "Cara bayar saat ini: USDT atau USDC (stablecoin) di halaman pembayaran. Jika kurang nyaman, tulis ke kami di chat, kami bantu.",
    footnote: "Harga dalam USD per bulan. Anggaran iklan dibayar terpisah. Kami tidak menjanjikan angka penjualan — hasilnya terlihat di chat dan pesanan Anda.",
  },
  products: {
    eyebrow: "Showroom AI",
    title: "Satu produk — tiga peran",
    lead: "Penjual menjawab pelanggan serta mencatat pesanan dan janji temu. Marketer mendatangkan pelanggan lewat posting yang Anda setujui. Asisten menjawab pertanyaan umum.",
    band: "Showroom AI",
    roles: {
      seller: {
        name: "Penjual",
        value: "Menjawab pelanggan 24/7 di chat Anda, memilih produk atau layanan yang tepat, menyebut harga pasti dari daftar harga Anda, dan memesan pesanan atau janji temu.",
        who: "Toko, salon, jasa — siapa pun yang kehilangan pelanggan saat tidak dibalas cepat.",
        extra: "Chat situs dan Telegram, plus WhatsApp / Instagram lewat Meta Business Anda. Menyerahkan chat ke Anda bila perlu.",
        price: "Start {start}/bln · ada di setiap paket",
      },
      marketer: {
        name: "Marketer",
        value: "Mempelajari niche dan pesaing, menyusun rencana konten, menulis posting, dan membuat gambar. Terbit hanya setelah Anda menekan “setujui” di Telegram.",
        who: "Bisnis yang butuh posting rutin dan pelanggan baru, tapi tidak punya marketer.",
        extra: "Business: Instagram, rencana dan posting. Pro: Instagram, Facebook dan Threads, Reels dan analitik.",
        price: "Business {business}/bln · Pro {pro}/bln",
      },
      assistant: {
        name: "Asisten Bisnis",
        value: "Menjawab pertanyaan umum dari informasi Anda, mencari tahu kebutuhan pelanggan, dan menyerahkan chat ke manusia.",
        who: "Tim dengan banyak pertanyaan berulang di messenger dan chat situs.",
        extra: "Semua chat dalam satu kotak masuk. Manusia mengambil alih dalam satu klik.",
        price: "Ditambahkan ke paket mana pun atas permintaan — harga di chat",
      },
    },
  },
};

const vi: PlainCopy = {
  brandLine: "Showroom AI — một sản phẩm, ba vai trò",
  pricing: {
    eyebrow: "Bảng giá",
    title: "Ba gói. Bắt đầu trong một ngày.",
    lead: "Start {start}/tháng — Nhân viên bán hàng. Business {business}/tháng — Bán hàng + Marketer. Pro {pro}/tháng — Bán hàng + Marketer với nhiều kênh hơn. Miễn phí {days} ngày, không cần thẻ. Đội ngũ chúng tôi cài đặt nếu bạn muốn: {setup} một lần.",
    customTitle: "Cần đội ngũ, website hay ứng dụng?",
    customBody: "Hãy nhắn trong chat bạn cần gì — chúng tôi báo giá riêng.",
    customCta: "Nhắn trong chat",
    payNote: "Cách thanh toán hiện nay: bằng USDT hoặc USDC (stablecoin) trên trang thanh toán. Nếu bất tiện, hãy nhắn chúng tôi trong chat để được hỗ trợ.",
    footnote: "Giá tính bằng USD mỗi tháng. Ngân sách quảng cáo trả riêng. Chúng tôi không hứa con số doanh thu — bạn thấy kết quả trong chat và đơn hàng của mình.",
  },
  products: {
    eyebrow: "Showroom AI",
    title: "Một sản phẩm — ba vai trò",
    lead: "Nhân viên bán hàng trả lời khách, nhận đơn và lịch hẹn. Marketer mang khách đến bằng bài đăng bạn duyệt. Trợ lý trả lời câu hỏi thường gặp.",
    band: "Showroom AI",
    roles: {
      seller: {
        name: "Bán hàng",
        value: "Trả lời khách 24/7 trong các kênh chat, chọn đúng sản phẩm hoặc dịch vụ, báo giá chính xác theo bảng giá của bạn và đặt đơn hoặc lịch hẹn.",
        who: "Cửa hàng, salon, dịch vụ — ai cũng mất khách khi không trả lời nhanh.",
        extra: "Chat trên website và Telegram, cùng WhatsApp / Instagram qua Meta Business của bạn. Chuyển cuộc trò chuyện cho bạn khi cần.",
        price: "Start {start}/tháng · có trong mọi gói",
      },
      marketer: {
        name: "Marketer",
        value: "Tìm hiểu ngành và đối thủ, lập kế hoạch nội dung, viết bài và làm hình ảnh. Chỉ đăng sau khi bạn bấm “duyệt” trong Telegram.",
        who: "Doanh nghiệp cần bài đăng đều đặn và khách mới nhưng chưa có marketer.",
        extra: "Business: Instagram, kế hoạch và bài đăng. Pro: Instagram, Facebook và Threads, Reels và phân tích.",
        price: "Business {business}/tháng · Pro {pro}/tháng",
      },
      assistant: {
        name: "Trợ lý kinh doanh",
        value: "Trả lời câu hỏi thường gặp dựa trên thông tin của bạn, tìm hiểu khách cần gì và chuyển cuộc trò chuyện cho người thật.",
        who: "Đội ngũ có nhiều câu hỏi lặp lại trên messenger và chat website.",
        extra: "Mọi cuộc chat trong một hộp thư. Người thật tiếp nhận chỉ với một cú nhấp.",
        price: "Thêm vào bất kỳ gói nào theo yêu cầu — báo giá trong chat",
      },
    },
  },
};

const tr: PlainCopy = {
  brandLine: "Showroom AI — tek ürün, üç rol",
  pricing: {
    eyebrow: "Fiyatlar",
    title: "Üç paket. Bir günde başlayın.",
    lead: "Start {start}/ay — Satıcı. Business {business}/ay — Satıcı + Pazarlamacı. Pro {pro}/ay — daha fazla kanalla Satıcı + Pazarlamacı. {days} gün ücretsiz, kart gerekmez. Ekibimizin kurulumu isteğe bağlı: tek seferlik {setup}.",
    customTitle: "Ekibe, web sitesine veya uygulamaya mı ihtiyacınız var?",
    customBody: "Sohbette ne istediğinizi yazın — size özel fiyat verelim.",
    customCta: "Sohbete yaz",
    payNote: "Bugün nasıl ödenir: ödeme sayfasında USDT veya USDC (stabil kripto) ile. Uygun değilse sohbetten yazın, yardımcı olalım.",
    footnote: "Fiyatlar aylık USD. Reklam bütçesi ayrıca ödenir. Satış rakamı vaat etmiyoruz — sonucu kendi sohbetlerinizde ve siparişlerinizde görürsünüz.",
  },
  products: {
    eyebrow: "Showroom AI",
    title: "Tek ürün — üç rol",
    lead: "Satıcı müşterilere yanıt verir, sipariş ve randevu alır. Pazarlamacı onayladığınız gönderilerle müşteri getirir. Asistan sık soruları yanıtlar.",
    band: "Showroom AI",
    roles: {
      seller: {
        name: "Satıcı",
        value: "Sohbetlerinizde müşterilere 7/24 yanıt verir, doğru ürünü veya hizmeti seçer, fiyat listenizden kesin fiyatı söyler ve siparişi ya da randevuyu ayırır.",
        who: "Mağazalar, salonlar, hizmetler — hızlı yanıt verilmediğinde müşteri kaybeden herkes.",
        extra: "Site sohbeti ve Telegram, ayrıca kendi Meta Business hesabınızla WhatsApp / Instagram. Gerekirse sohbeti size devreder.",
        price: "Start {start}/ay · her pakette",
      },
      marketer: {
        name: "Pazarlamacı",
        value: "Sektörünüzü ve rakipleri inceler, içerik planı yapar, gönderi yazar ve görsel hazırlar. Yalnızca Telegram’da “onayla”ya bastığınızda yayınlar.",
        who: "Düzenli gönderiye ve yeni müşteriye ihtiyacı olan ama pazarlamacısı olmayan işletmeler.",
        extra: "Business: Instagram, plan ve gönderiler. Pro: Instagram, Facebook ve Threads, Reels ve analiz.",
        price: "Business {business}/ay · Pro {pro}/ay",
      },
      assistant: {
        name: "İş Asistanı",
        value: "Bilgilerinize göre sık soruları yanıtlar, müşterinin ne istediğini öğrenir ve sohbeti bir kişiye devreder.",
        who: "Mesajlaşma ve site sohbetinde çok sayıda tekrar eden soru alan ekipler.",
        extra: "Tüm sohbetler tek kutuda. Bir kişi tek tıkla devralır.",
        price: "İstek üzerine her pakete eklenir — fiyat sohbette",
      },
    },
  },
};

const ar: PlainCopy = {
  brandLine: "Showroom AI — منتج واحد وثلاثة أدوار",
  pricing: {
    eyebrow: "الأسعار",
    title: "ثلاث باقات. ابدأ خلال يوم.",
    lead: "Start ‏{start}/شهريًا — البائع. Business ‏{business}/شهريًا — البائع + المسوّق. Pro ‏{pro}/شهريًا — البائع + المسوّق بقنوات أكثر. {days} أيام مجانًا دون بطاقة. الإعداد بواسطة فريقنا اختياري: {setup} مرة واحدة.",
    customTitle: "تحتاج فريقًا أو موقعًا أو تطبيقًا؟",
    customBody: "اكتب لنا في الدردشة ما تحتاجه — وسنحدد السعر بشكل فردي.",
    customCta: "اكتب في الدردشة",
    payNote: "طريقة الدفع حاليًا: USDT أو USDC (عملات مستقرة) عبر صفحة الدفع. إن لم يكن ذلك مناسبًا، اكتب لنا في الدردشة وسنساعدك.",
    footnote: "الأسعار بالدولار شهريًا. ميزانية الإعلانات تُدفع منفصلة. لا نعد بأرقام مبيعات — سترى النتيجة في محادثاتك وطلباتك.",
  },
  products: {
    eyebrow: "Showroom AI",
    title: "منتج واحد — ثلاثة أدوار",
    lead: "البائع يرد على العملاء ويسجل الطلبات والمواعيد. المسوّق يجلب العملاء بمنشورات توافق عليها. المساعد يجيب عن الأسئلة المتكررة.",
    band: "Showroom AI",
    roles: {
      seller: {
        name: "البائع",
        value: "يرد على العملاء على مدار الساعة في محادثاتك، ويختار المنتج أو الخدمة المناسبة، ويذكر السعر الدقيق من قائمة أسعارك، ويحجز الطلب أو الموعد.",
        who: "المتاجر والصالونات والخدمات — كل من يخسر عملاء عندما لا يرد أحد بسرعة.",
        extra: "دردشة الموقع وTelegram، بالإضافة إلى WhatsApp / Instagram عبر حساب Meta Business الخاص بك. يحوّل المحادثة إليك عند الحاجة.",
        price: "Start ‏{start}/شهريًا · في كل باقة",
      },
      marketer: {
        name: "المسوّق",
        value: "يدرس مجالك ومنافسيك، ويضع خطة المحتوى، ويكتب المنشورات ويصمم الصور. لا ينشر إلا بعد ضغطك «موافقة» في Telegram.",
        who: "الأعمال التي تحتاج منشورات منتظمة وعملاء جددًا دون مسوّق.",
        extra: "Business: إنستغرام وخطة ومنشورات. Pro: إنستغرام وفيسبوك وThreads وReels وتحليلات.",
        price: "Business ‏{business}/شهريًا · Pro ‏{pro}/شهريًا",
      },
      assistant: {
        name: "مساعد الأعمال",
        value: "يجيب عن الأسئلة المتكررة من معلوماتك، ويعرف ما يحتاجه العميل، ثم يحوّل المحادثة إلى شخص.",
        who: "الفرق التي تتلقى أسئلة متكررة كثيرة في المراسلة ودردشة الموقع.",
        extra: "كل المحادثات في صندوق واحد. يتولى شخص المحادثة بنقرة واحدة.",
        price: "يُضاف إلى أي باقة عند الطلب — السعر في الدردشة",
      },
    },
  },
};

const zh: PlainCopy = {
  brandLine: "Showroom AI — 一个产品，三个角色",
  pricing: {
    eyebrow: "价格",
    title: "三个套餐，一天上线。",
    lead: "Start {start}/月 — 销售。Business {business}/月 — 销售 + 营销。Pro {pro}/月 — 销售 + 营销，更多渠道。免费试用 {days} 天，无需银行卡。由我们团队配置为可选项：一次性 {setup}。",
    customTitle: "需要团队、网站或应用？",
    customBody: "在聊天中告诉我们您的需求，我们单独报价。",
    customCta: "在聊天中留言",
    payNote: "目前的付款方式：在付款页面使用 USDT 或 USDC（稳定币）。如果不方便，请在聊天中联系我们，我们来帮您。",
    footnote: "价格为每月美元。广告预算另付。我们不承诺销售数字——结果体现在您的聊天和订单中。",
  },
  products: {
    eyebrow: "Showroom AI",
    title: "一个产品 — 三个角色",
    lead: "销售回复顾客并登记订单和预约。营销用您批准的帖子带来顾客。助理回答常见问题。",
    band: "Showroom AI",
    roles: {
      seller: {
        name: "销售",
        value: "在您的聊天渠道中全天候回复顾客，挑选合适的商品或服务，按您的价目表报出准确价格，并预订订单或预约。",
        who: "门店、沙龙、服务业——所有因回复不及时而流失顾客的商家。",
        extra: "网站聊天和 Telegram，以及通过您自己的 Meta Business 接入 WhatsApp / Instagram。需要时把对话转给您。",
        price: "Start {start}/月 · 每个套餐都包含",
      },
      marketer: {
        name: "营销",
        value: "研究您的行业和竞争对手，制定内容计划，撰写帖子并制作图片。只有您在 Telegram 点击“批准”后才发布。",
        who: "需要定期发帖和新顾客、但没有营销人员的商家。",
        extra: "Business：Instagram、计划和帖子。Pro：Instagram、Facebook 和 Threads、Reels 及数据分析。",
        price: "Business {business}/月 · Pro {pro}/月",
      },
      assistant: {
        name: "业务助理",
        value: "根据您的资料回答常见问题，了解顾客需求，并把对话转给真人。",
        who: "在即时通讯和网站聊天中有大量重复问题的团队。",
        extra: "所有聊天集中在一个收件箱。真人一键接手。",
        price: "可按需加入任一套餐 — 价格在聊天中告知",
      },
    },
  },
};

const ja: PlainCopy = {
  brandLine: "Showroom AI — 1つの製品、3つの役割",
  pricing: {
    eyebrow: "料金",
    title: "3つのプラン。1日で開始。",
    lead: "Start {start}/月 — 販売担当。Business {business}/月 — 販売担当 + マーケター。Pro {pro}/月 — より多くのチャネルで販売担当 + マーケター。{days}日間無料、カード不要。当社チームによる設定は任意：1回 {setup}。",
    customTitle: "チーム、サイト、アプリが必要ですか？",
    customBody: "チャットでご要望をお知らせください。個別にお見積もりします。",
    customCta: "チャットで相談",
    payNote: "現在のお支払い方法：お支払いページで USDT または USDC（ステーブルコイン）。ご不便な場合はチャットでご連絡ください。お手伝いします。",
    footnote: "価格は月額（USD）。広告費は別途。売上の数字は約束しません — 結果はお客様のチャットと注文に表れます。",
  },
  products: {
    eyebrow: "Showroom AI",
    title: "1つの製品 — 3つの役割",
    lead: "販売担当はお客様に返信し、注文や予約を受け付けます。マーケターは承認済みの投稿で集客します。アシスタントはよくある質問に答えます。",
    band: "Showroom AI",
    roles: {
      seller: {
        name: "販売担当",
        value: "チャットで24時間お客様に返信し、最適な商品やサービスを選び、料金表どおりの正確な価格を伝えて、注文や予約を確定します。",
        who: "店舗、サロン、サービス業 — すぐに返信できず顧客を逃しているすべての事業者。",
        extra: "サイトチャットと Telegram、さらにご自身の Meta Business 経由で WhatsApp / Instagram。必要なときは会話をお客様に引き継ぎます。",
        price: "Start {start}/月 · 全プランに含まれます",
      },
      marketer: {
        name: "マーケター",
        value: "業界と競合を調べ、コンテンツ計画を作り、投稿文と画像を作成します。Telegram で「承認」を押した後にだけ公開します。",
        who: "定期的な投稿と新規顧客が必要だが、マーケターがいない事業者。",
        extra: "Business：Instagram、計画と投稿。Pro：Instagram・Facebook・Threads、Reels と分析。",
        price: "Business {business}/月 · Pro {pro}/月",
      },
      assistant: {
        name: "ビジネスアシスタント",
        value: "お客様の情報をもとによくある質問に答え、ニーズを確認して担当者に引き継ぎます。",
        who: "メッセンジャーやサイトチャットで同じ質問が多いチーム。",
        extra: "すべてのチャットを1つの受信箱に。担当者がワンクリックで対応。",
        price: "ご希望に応じて任意のプランに追加 — 料金はチャットで",
      },
    },
  },
};

const plainCopy: Partial<Record<Locale, PlainCopy>> = { en, ru, es, pt, de, fr, id, vi, tr, ar, zh, ja };

export function getPlainCopy(locale: Locale): PlainCopy {
  return plainCopy[locale] ?? en;
}

/** Fills {start} {business} {pro} {setup} {days} from the published plan constants. */
export function fillPlanTokens(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (m, key: string) => values[key] ?? m);
}

export function planTokens(): Record<string, string> {
  const usd = (sku: string) => {
    const p = skuPrice(sku);
    return p ? formatUsdPrice(p.listUsd) : "";
  };
  return {
    start: usd("showroom-start"),
    business: usd("showroom-growth"),
    pro: usd("showroom-pro"),
    setup: formatUsdPrice(SHOWROOM_AI_SETUP_FEE_USD),
    days: String(SHOWROOM_AI_TRIAL_DAYS),
  };
}
