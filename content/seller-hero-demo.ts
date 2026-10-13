import type { Locale } from "@/lib/site";

/**
 * Copy for the Seller page hero chat animation (SellerHeroDemo).
 * Start = product order close; Pro = appointment booking + extra channels.
 * No Business Assistant prices. No plan dollar amounts beyond the in-chat example.
 */
export type SellerHeroPlan = "start" | "pro";

export interface SellerHeroScene {
  label: string;
  chatTitle: string;
  online: string;
  client1: string;
  seller1: string;
  client2: string;
  bookedTitle: string;
  bookedDetail: string;
  /** Shown under the chat for Pro: channel chips. */
  channels?: [string, string, string];
}

export interface SellerHeroCopy {
  startTab: string;
  proTab: string;
  /** Label above Pro channel chips. */
  channelBand: string;
  start: SellerHeroScene;
  pro: SellerHeroScene;
}

const en: SellerHeroCopy = {
  startTab: "Start",
  proTab: "Pro",
  channelBand: "Pro channels",
  start: {
    label:
      "Animation: a customer asks in chat, the Showroom AI Seller answers and closes the sale.",
    chatTitle: "Showroom AI · Seller",
    online: "online 24/7",
    client1: "Hi! Is the blue dress in size M available? Can I pick it up tomorrow?",
    seller1: "Yes, size M is in stock — $49. I can reserve it for tomorrow at 15:00. Shall I book it?",
    client2: "Yes, please!",
    bookedTitle: "Order #1042 booked",
    bookedDetail: "Tomorrow, 15:00 · reminder sent",
  },
  pro: {
    label:
      "Animation: the Seller books an appointment across channels and closes the visit.",
    chatTitle: "Showroom AI · Seller · Pro",
    online: "WhatsApp · Instagram · site",
    client1: "Hi! Can I get a manicure tomorrow after 6 pm?",
    seller1: "Tomorrow we have 6:30 pm and 7:30 pm free. Which one suits you?",
    client2: "6:30, please",
    bookedTitle: "Booked: tomorrow, 6:30 pm",
    bookedDetail: "Reminder 2 hours before · calendar synced",
    channels: ["WhatsApp", "Instagram", "Website"],
  },
};

const ru: SellerHeroCopy = {
  startTab: "Start",
  proTab: "Pro",
  channelBand: "Каналы Pro",
  start: {
    label:
      "Анимация: клиент пишет в чат, Продавец Showroom AI отвечает и закрывает сделку.",
    chatTitle: "Showroom AI · Продавец",
    online: "на связи 24/7",
    client1: "Здравствуйте! Синее платье в размере M есть? Можно забрать завтра?",
    seller1: "Да, M в наличии — $49. Могу отложить на завтра, 15:00. Оформить?",
    client2: "Да, оформляйте!",
    bookedTitle: "Заказ №1042 оформлен",
    bookedDetail: "Завтра, 15:00 · напоминание отправлено",
  },
  pro: {
    label:
      "Анимация: Продавец записывает клиента через несколько каналов и закрывает визит.",
    chatTitle: "Showroom AI · Продавец · Pro",
    online: "WhatsApp · Instagram · сайт",
    client1: "Здравствуйте! Можно на маникюр завтра после 18:00?",
    seller1: "Завтра свободно 18:30 и 19:30. Какое время удобно?",
    client2: "18:30, пожалуйста",
    bookedTitle: "Записано: завтра, 18:30",
    bookedDetail: "Напоминание за 2 часа · в календаре",
    channels: ["WhatsApp", "Instagram", "Сайт"],
  },
};

const es: SellerHeroCopy = {
  startTab: "Start",
  proTab: "Pro",
  channelBand: "Canales Pro",
  start: {
    label:
      "Animación: un cliente escribe en el chat, el Vendedor de Showroom AI responde y cierra la venta.",
    chatTitle: "Showroom AI · Vendedor",
    online: "en línea 24/7",
    client1: "¡Hola! ¿Tienen el vestido azul en talla M? ¿Puedo recogerlo mañana?",
    seller1: "Sí, la talla M está disponible — $49. Puedo reservarlo para mañana a las 15:00. ¿Lo reservo?",
    client2: "¡Sí, por favor!",
    bookedTitle: "Pedido n.º 1042 reservado",
    bookedDetail: "Mañana, 15:00 · recordatorio enviado",
  },
  pro: {
    label:
      "Animación: el Vendedor agenda una cita en varios canales y cierra la visita.",
    chatTitle: "Showroom AI · Vendedor · Pro",
    online: "WhatsApp · Instagram · web",
    client1: "¡Hola! ¿Puedo hacerme la manicura mañana después de las 18:00?",
    seller1: "Mañana tenemos libre a las 18:30 y a las 19:30. ¿Cuál te viene bien?",
    client2: "A las 18:30, por favor",
    bookedTitle: "Cita: mañana, 18:30",
    bookedDetail: "Recordatorio 2 horas antes · calendario",
    channels: ["WhatsApp", "Instagram", "Web"],
  },
};

const pt: SellerHeroCopy = {
  startTab: "Start",
  proTab: "Pro",
  channelBand: "Canais Pro",
  start: {
    label:
      "Animação: um cliente escreve no chat, o Vendedor do Showroom AI responde e fecha a venda.",
    chatTitle: "Showroom AI · Vendedor",
    online: "online 24/7",
    client1: "Olá! Tem o vestido azul no tamanho M? Posso buscar amanhã?",
    seller1: "Sim, o M está disponível — $49. Posso reservar para amanhã às 15:00. Reservo?",
    client2: "Sim, por favor!",
    bookedTitle: "Pedido nº 1042 reservado",
    bookedDetail: "Amanhã, 15:00 · lembrete enviado",
  },
  pro: {
    label:
      "Animação: o Vendedor agenda um horário em vários canais e fecha a visita.",
    chatTitle: "Showroom AI · Vendedor · Pro",
    online: "WhatsApp · Instagram · site",
    client1: "Olá! Dá para fazer as unhas amanhã depois das 18h?",
    seller1: "Amanhã temos livre às 18h30 e às 19h30. Qual fica melhor?",
    client2: "18h30, por favor",
    bookedTitle: "Agendado: amanhã, 18h30",
    bookedDetail: "Lembrete 2 horas antes · calendário",
    channels: ["WhatsApp", "Instagram", "Site"],
  },
};

const de: SellerHeroCopy = {
  startTab: "Start",
  proTab: "Pro",
  channelBand: "Pro-Kanäle",
  start: {
    label:
      "Animation: ein Kunde schreibt im Chat, der Showroom-AI-Verkäufer antwortet und schließt den Verkauf ab.",
    chatTitle: "Showroom AI · Verkäufer",
    online: "rund um die Uhr online",
    client1: "Hallo! Habt ihr das blaue Kleid in Größe M? Kann ich es morgen abholen?",
    seller1: "Ja, Größe M ist da — $49. Ich kann es für morgen, 15:00, zurücklegen. Buchen?",
    client2: "Ja, bitte!",
    bookedTitle: "Bestellung #1042 gebucht",
    bookedDetail: "Morgen, 15:00 · Erinnerung gesendet",
  },
  pro: {
    label:
      "Animation: der Verkäufer bucht einen Termin über mehrere Kanäle und schließt den Besuch ab.",
    chatTitle: "Showroom AI · Verkäufer · Pro",
    online: "WhatsApp · Instagram · Website",
    client1: "Hallo! Geht morgen nach 18 Uhr eine Maniküre?",
    seller1: "Morgen sind 18:30 und 19:30 frei. Was passt Ihnen?",
    client2: "18:30, bitte",
    bookedTitle: "Gebucht: morgen, 18:30",
    bookedDetail: "Erinnerung 2 Stunden vorher · Kalender",
    channels: ["WhatsApp", "Instagram", "Website"],
  },
};

const fr: SellerHeroCopy = {
  startTab: "Start",
  proTab: "Pro",
  channelBand: "Canaux Pro",
  start: {
    label:
      "Animation : un client écrit dans le chat, le Vendeur Showroom AI répond et conclut la vente.",
    chatTitle: "Showroom AI · Vendeur",
    online: "en ligne 24/7",
    client1: "Bonjour ! La robe bleue en taille M est disponible ? Je peux la récupérer demain ?",
    seller1: "Oui, la M est en stock — $49. Je peux la réserver pour demain à 15 h. Je réserve ?",
    client2: "Oui, s’il vous plaît !",
    bookedTitle: "Commande n° 1042 réservée",
    bookedDetail: "Demain, 15 h · rappel envoyé",
  },
  pro: {
    label:
      "Animation : le Vendeur prend un rendez-vous sur plusieurs canaux et conclut la visite.",
    chatTitle: "Showroom AI · Vendeur · Pro",
    online: "WhatsApp · Instagram · site",
    client1: "Bonjour ! Une manucure demain après 18 h, c’est possible ?",
    seller1: "Demain, 18 h 30 et 19 h 30 sont libres. Lequel vous convient ?",
    client2: "18 h 30, s’il vous plaît",
    bookedTitle: "Réservé : demain, 18 h 30",
    bookedDetail: "Rappel 2 heures avant · calendrier",
    channels: ["WhatsApp", "Instagram", "Site"],
  },
};

const id: SellerHeroCopy = {
  startTab: "Start",
  proTab: "Pro",
  channelBand: "Saluran Pro",
  start: {
    label:
      "Animasi: pelanggan menulis di chat, Penjual Showroom AI menjawab dan menutup penjualan.",
    chatTitle: "Showroom AI · Penjual",
    online: "online 24/7",
    client1: "Halo! Ada gaun biru ukuran M? Bisa diambil besok?",
    seller1: "Ya, ukuran M ready — $49. Bisa saya booking untuk besok jam 15.00. Booking?",
    client2: "Ya, tolong!",
    bookedTitle: "Pesanan #1042 dibooking",
    bookedDetail: "Besok, 15.00 · pengingat terkirim",
  },
  pro: {
    label:
      "Animasi: Penjual membuat janji temu lewat beberapa saluran dan menutup kunjungan.",
    chatTitle: "Showroom AI · Penjual · Pro",
    online: "WhatsApp · Instagram · situs",
    client1: "Halo! Bisa manikur besok setelah jam 18.00?",
    seller1: "Besok kosong jam 18.30 dan 19.30. Mana yang cocok?",
    client2: "18.30, ya",
    bookedTitle: "Tercatat: besok, 18.30",
    bookedDetail: "Pengingat 2 jam sebelumnya · kalender",
    channels: ["WhatsApp", "Instagram", "Situs"],
  },
};

const vi: SellerHeroCopy = {
  startTab: "Start",
  proTab: "Pro",
  channelBand: "Kênh Pro",
  start: {
    label:
      "Hoạt ảnh: khách nhắn trong chat, Nhân viên bán hàng Showroom AI trả lời và chốt đơn.",
    chatTitle: "Showroom AI · Nhân viên bán hàng",
    online: "trực tuyến 24/7",
    client1: "Chào shop! Váy xanh size M còn không? Mai lấy được không?",
    seller1: "Còn size M — $49. Em giữ đến mai 15:00 được. Đặt luôn nhé?",
    client2: "Đặt giúp em!",
    bookedTitle: "Đơn #1042 đã đặt",
    bookedDetail: "Ngày mai, 15:00 · đã gửi nhắc",
  },
  pro: {
    label:
      "Hoạt ảnh: Nhân viên bán hàng đặt lịch qua nhiều kênh và chốt buổi hẹn.",
    chatTitle: "Showroom AI · Nhân viên bán hàng · Pro",
    online: "WhatsApp · Instagram · website",
    client1: "Chào shop! Mai sau 18:00 làm móng được không?",
    seller1: "Mai còn trống 18:30 và 19:30. Bạn chọn giờ nào?",
    client2: "18:30 nhé",
    bookedTitle: "Đã đặt: ngày mai, 18:30",
    bookedDetail: "Nhắc trước 2 giờ · lịch",
    channels: ["WhatsApp", "Instagram", "Website"],
  },
};

const tr: SellerHeroCopy = {
  startTab: "Start",
  proTab: "Pro",
  channelBand: "Pro kanallar",
  start: {
    label:
      "Animasyon: müşteri sohbette soruyor, Showroom AI Satıcı yanıtlıyor ve satışı kapatıyor.",
    chatTitle: "Showroom AI · Satıcı",
    online: "7/24 çevrimiçi",
    client1: "Merhaba! Mavi elbise M bedende var mı? Yarın alabilir miyim?",
    seller1: "Evet, M stokta — $49. Yarın 15:00 için ayırabilirim. Rezerve edeyim mi?",
    client2: "Evet, lütfen!",
    bookedTitle: "Sipariş #1042 alındı",
    bookedDetail: "Yarın, 15:00 · hatırlatma gönderildi",
  },
  pro: {
    label:
      "Animasyon: Satıcı birden fazla kanalda randevu alıyor ve ziyareti kapatıyor.",
    chatTitle: "Showroom AI · Satıcı · Pro",
    online: "WhatsApp · Instagram · site",
    client1: "Merhaba! Yarın 18.00’den sonra manikür olur mu?",
    seller1: "Yarın 18:30 ve 19:30 boş. Hangisi uygun?",
    client2: "18:30 lütfen",
    bookedTitle: "Randevu: yarın, 18:30",
    bookedDetail: "2 saat önce hatırlatma · takvim",
    channels: ["WhatsApp", "Instagram", "Site"],
  },
};

const ar: SellerHeroCopy = {
  startTab: "Start",
  proTab: "Pro",
  channelBand: "قنوات Pro",
  start: {
    label:
      "رسوم متحركة: عميل يسأل في المحادثة، وبائع Showroom AI يرد ويُغلق البيع.",
    chatTitle: "Showroom AI · البائع",
    online: "متصل على مدار الساعة",
    client1: "مرحباً! هل الفستان الأزرق بمقاس M متوفر؟ هل يمكنني استلامه غداً؟",
    seller1: "نعم، المقاس M متوفر — $49. يمكنني حجزه لغد الساعة 15:00. أحجزه؟",
    client2: "نعم من فضلك!",
    bookedTitle: "تم حجز الطلب #1042",
    bookedDetail: "غداً، 15:00 · أُرسل تذكير",
  },
  pro: {
    label:
      "رسوم متحركة: البائع يحجز موعداً عبر عدة قنوات ويُغلق الزيارة.",
    chatTitle: "Showroom AI · البائع · Pro",
    online: "WhatsApp · Instagram · الموقع",
    client1: "مرحباً! هل يمكن حجز مانيكير غداً بعد الساعة 6 مساءً؟",
    seller1: "غداً لدينا 6:30 م و7:30 م. أيهما يناسبك؟",
    client2: "6:30 من فضلك",
    bookedTitle: "محجوز: غداً، 6:30 م",
    bookedDetail: "تذكير قبل ساعتين · التقويم",
    channels: ["WhatsApp", "Instagram", "الموقع"],
  },
};

const zh: SellerHeroCopy = {
  startTab: "Start",
  proTab: "Pro",
  channelBand: "Pro 渠道",
  start: {
    label: "动画：顾客在聊天中提问，Showroom AI 销售回复并成交。",
    chatTitle: "Showroom AI · 销售",
    online: "全天候在线",
    client1: "你好！蓝色裙子有 M 码吗？明天可以自取吗？",
    seller1: "有的，M 码现货 — $49。可以为您预留到明天 15:00。要预订吗？",
    client2: "好的，请预订！",
    bookedTitle: "订单 #1042 已预订",
    bookedDetail: "明天 15:00 · 已发送提醒",
  },
  pro: {
    label: "动画：销售通过多渠道预约并完成到店。",
    chatTitle: "Showroom AI · 销售 · Pro",
    online: "WhatsApp · Instagram · 网站",
    client1: "你好！明天晚上 6 点后可以做美甲吗？",
    seller1: "明天 18:30 和 19:30 有空。您选哪个？",
    client2: "18:30，谢谢",
    bookedTitle: "已预约：明天 18:30",
    bookedDetail: "提前 2 小时提醒 · 已同步日历",
    channels: ["WhatsApp", "Instagram", "网站"],
  },
};

const ja: SellerHeroCopy = {
  startTab: "Start",
  proTab: "Pro",
  channelBand: "Proチャネル",
  start: {
    label:
      "アニメーション: お客様がチャットで質問し、Showroom AI の販売担当が返信して成約します。",
    chatTitle: "Showroom AI · 販売担当",
    online: "24時間オンライン",
    client1: "こんにちは！青いドレスのMサイズはありますか？明日受け取れますか？",
    seller1: "はい、Mは在庫あり — $49。明日15:00にお取り置きできます。予約しますか？",
    client2: "はい、お願いします！",
    bookedTitle: "注文 #1042 を予約しました",
    bookedDetail: "明日 15:00 · リマインダー送信済み",
  },
  pro: {
    label:
      "アニメーション: 販売担当が複数チャネルで予約を取り、来店を確定します。",
    chatTitle: "Showroom AI · 販売担当 · Pro",
    online: "WhatsApp · Instagram · サイト",
    client1: "こんにちは！明日18時以降にマニキュアはできますか？",
    seller1: "明日は18:30と19:30が空いています。どちらがよいですか？",
    client2: "18:30でお願いします",
    bookedTitle: "予約済み: 明日 18:30",
    bookedDetail: "2時間前にリマインド · カレンダー連携",
    channels: ["WhatsApp", "Instagram", "サイト"],
  },
};

const sellerHeroCopy: Partial<Record<Locale, SellerHeroCopy>> = {
  en, ru, es, pt, de, fr, id, vi, tr, ar, zh, ja,
};

export function getSellerHeroCopy(locale: Locale): SellerHeroCopy {
  return sellerHeroCopy[locale] ?? en;
}
