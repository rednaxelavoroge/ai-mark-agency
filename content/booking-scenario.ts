import type { Locale } from "@/lib/site";

/** Appointment booking example for salons/services + "your first week". 12 locales, EN fallback. */
export interface BookingCopy {
  eyebrow: string;
  title: string;
  lead: string;
  client1: string;
  seller1: string;
  client2: string;
  booked: string;
  bookedNote: string;
  weekTitle: string;
  week: [string, string, string];
}

const en: BookingCopy = {
  eyebrow: "Example · salons and services",
  title: "The Seller also books appointments",
  lead: "For a salon, studio or any service: the Seller offers free slots, books the visit and reminds the customer.",
  client1: "Hi! Can I get a manicure tomorrow after 6 pm?",
  seller1: "Tomorrow we have 6:30 pm and 7:30 pm free. Which one suits you?",
  client2: "6:30, please",
  booked: "Booked: tomorrow, 6:30 pm",
  bookedNote: "Reminder 2 hours before",
  weekTitle: "Your first week",
  week: [
    "Day 1 — we connect your chats, services and prices",
    "From day 1 — answers customers 24/7 and books visits",
    "During the week — the Marketer sends the first posts for your approval",
  ],
};
const ru: BookingCopy = {
  eyebrow: "Пример · салоны и услуги",
  title: "Продавец ещё и записывает клиентов",
  lead: "Для салона, студии или любой услуги: Продавец предлагает свободное время, записывает и напоминает клиенту о визите.",
  client1: "Здравствуйте! Можно на маникюр завтра после 18:00?",
  seller1: "Завтра свободно 18:30 и 19:30. Какое время удобно?",
  client2: "18:30, пожалуйста",
  booked: "Записано: завтра, 18:30",
  bookedNote: "Напоминание за 2 часа",
  weekTitle: "Ваша первая неделя",
  week: [
    "День 1 — подключаем ваши чаты, услуги и цены",
    "С первого дня — отвечает клиентам 24/7 и записывает",
    "В течение недели — Маркетолог присылает первые посты на одобрение",
  ],
};
const es: BookingCopy = {
  eyebrow: "Ejemplo · salones y servicios",
  title: "El Vendedor también agenda citas",
  lead: "Para un salón, estudio o cualquier servicio: el Vendedor ofrece horarios libres, agenda la visita y se la recuerda al cliente.",
  client1: "¡Hola! ¿Puedo hacerme la manicura mañana después de las 18:00?",
  seller1: "Mañana tenemos libre a las 18:30 y a las 19:30. ¿Cuál te viene bien?",
  client2: "A las 18:30, por favor",
  booked: "Cita: mañana, 18:30",
  bookedNote: "Recordatorio 2 horas antes",
  weekTitle: "Tu primera semana",
  week: ["Día 1 — conectamos tus chats, servicios y precios", "Desde el día 1 — responde 24/7 y agenda citas", "Durante la semana — el Marketer envía los primeros posts para tu aprobación"],
};
const pt: BookingCopy = {
  eyebrow: "Exemplo · salões e serviços",
  title: "O Vendedor também agenda horários",
  lead: "Para salão, estúdio ou qualquer serviço: o Vendedor oferece horários livres, agenda a visita e lembra o cliente.",
  client1: "Olá! Dá para fazer as unhas amanhã depois das 18h?",
  seller1: "Amanhã temos livre às 18h30 e às 19h30. Qual fica melhor?",
  client2: "18h30, por favor",
  booked: "Agendado: amanhã, 18h30",
  bookedNote: "Lembrete 2 horas antes",
  weekTitle: "Sua primeira semana",
  week: ["Dia 1 — conectamos seus chats, serviços e preços", "Desde o dia 1 — responde 24/7 e agenda", "Durante a semana — o Marketer envia os primeiros posts para aprovação"],
};
const de: BookingCopy = {
  eyebrow: "Beispiel · Salons und Dienstleister",
  title: "Der Verkäufer bucht auch Termine",
  lead: "Für Salon, Studio oder jede Dienstleistung: Der Verkäufer bietet freie Zeiten an, bucht den Termin und erinnert den Kunden.",
  client1: "Hallo! Geht morgen nach 18 Uhr eine Maniküre?",
  seller1: "Morgen sind 18:30 und 19:30 frei. Was passt Ihnen?",
  client2: "18:30, bitte",
  booked: "Gebucht: morgen, 18:30",
  bookedNote: "Erinnerung 2 Stunden vorher",
  weekTitle: "Ihre erste Woche",
  week: ["Tag 1 — wir verbinden Ihre Chats, Leistungen und Preise", "Ab Tag 1 — antwortet rund um die Uhr und bucht Termine", "Im Laufe der Woche — der Marketer schickt die ersten Posts zur Freigabe"],
};
const fr: BookingCopy = {
  eyebrow: "Exemple · salons et services",
  title: "Le Vendeur prend aussi les rendez-vous",
  lead: "Pour un salon, un studio ou tout service : le Vendeur propose les créneaux libres, réserve la visite et la rappelle au client.",
  client1: "Bonjour ! Une manucure demain après 18 h, c’est possible ?",
  seller1: "Demain, 18 h 30 et 19 h 30 sont libres. Lequel vous convient ?",
  client2: "18 h 30, s’il vous plaît",
  booked: "Réservé : demain, 18 h 30",
  bookedNote: "Rappel 2 heures avant",
  weekTitle: "Votre première semaine",
  week: ["Jour 1 — nous connectons vos chats, services et prix", "Dès le jour 1 — répond 24/7 et prend les rendez-vous", "Pendant la semaine — le Marketer envoie les premiers posts à valider"],
};
const id: BookingCopy = {
  eyebrow: "Contoh · salon dan jasa",
  title: "Penjual juga membuat janji temu",
  lead: "Untuk salon, studio, atau jasa apa pun: Penjual menawarkan jadwal kosong, mencatat kunjungan, dan mengingatkan pelanggan.",
  client1: "Halo! Bisa manikur besok setelah jam 18.00?",
  seller1: "Besok kosong jam 18.30 dan 19.30. Mana yang cocok?",
  client2: "18.30, ya",
  booked: "Tercatat: besok, 18.30",
  bookedNote: "Pengingat 2 jam sebelumnya",
  weekTitle: "Minggu pertama Anda",
  week: ["Hari 1 — kami hubungkan chat, layanan, dan harga Anda", "Sejak hari 1 — menjawab 24/7 dan mencatat janji", "Selama seminggu — Marketer mengirim posting pertama untuk disetujui"],
};
const vi: BookingCopy = {
  eyebrow: "Ví dụ · salon và dịch vụ",
  title: "Nhân viên bán hàng còn đặt lịch hẹn",
  lead: "Với salon, studio hay bất kỳ dịch vụ nào: Nhân viên bán hàng đưa ra giờ trống, đặt lịch và nhắc khách.",
  client1: "Chào shop! Mai sau 18:00 làm móng được không?",
  seller1: "Mai còn trống 18:30 và 19:30. Bạn chọn giờ nào?",
  client2: "18:30 nhé",
  booked: "Đã đặt: ngày mai, 18:30",
  bookedNote: "Nhắc trước 2 giờ",
  weekTitle: "Tuần đầu tiên của bạn",
  week: ["Ngày 1 — kết nối chat, dịch vụ và giá của bạn", "Từ ngày 1 — trả lời 24/7 và đặt lịch", "Trong tuần — Marketer gửi những bài đầu tiên để bạn duyệt"],
};
const tr: BookingCopy = {
  eyebrow: "Örnek · salonlar ve hizmetler",
  title: "Satıcı randevu da alır",
  lead: "Salon, stüdyo ya da her türlü hizmet için: Satıcı boş saatleri önerir, randevuyu ayırır ve müşteriye hatırlatır.",
  client1: "Merhaba! Yarın 18:00’den sonra manikür olur mu?",
  seller1: "Yarın 18:30 ve 19:30 boş. Hangisi uygun?",
  client2: "18:30 lütfen",
  booked: "Randevu: yarın, 18:30",
  bookedNote: "2 saat önce hatırlatma",
  weekTitle: "İlk haftanız",
  week: ["1. gün — sohbetlerinizi, hizmetlerinizi ve fiyatlarınızı bağlarız", "İlk günden — 7/24 yanıt verir ve randevu alır", "Hafta içinde — Pazarlamacı ilk gönderileri onayınıza yollar"],
};
const ar: BookingCopy = {
  eyebrow: "مثال · الصالونات والخدمات",
  title: "البائع يحجز المواعيد أيضًا",
  lead: "لصالون أو استوديو أو أي خدمة: يقترح البائع الأوقات المتاحة، ويحجز الزيارة، ويذكّر العميل بها.",
  client1: "مرحبًا! هل يمكن حجز مانيكير غدًا بعد الساعة 18:00؟",
  seller1: "غدًا متاح 18:30 و19:30. أيهما يناسبك؟",
  client2: "18:30 من فضلك",
  booked: "تم الحجز: غدًا، 18:30",
  bookedNote: "تذكير قبل ساعتين",
  weekTitle: "أسبوعك الأول",
  week: ["اليوم الأول — نربط محادثاتك وخدماتك وأسعارك", "من اليوم الأول — يرد على مدار الساعة ويحجز المواعيد", "خلال الأسبوع — يرسل المسوّق أول المنشورات لموافقتك"],
};
const zh: BookingCopy = {
  eyebrow: "示例 · 沙龙与服务业",
  title: "销售还能帮您约时间",
  lead: "适用于沙龙、工作室或任何服务：销售提供空闲时段、登记预约并提醒顾客。",
  client1: "你好！明天 18:00 以后可以做美甲吗？",
  seller1: "明天 18:30 和 19:30 有空。您选哪个时间？",
  client2: "18:30，谢谢",
  booked: "已预约：明天 18:30",
  bookedNote: "提前 2 小时提醒",
  weekTitle: "您的第一周",
  week: ["第 1 天——接入您的聊天、服务和价格", "从第 1 天起——全天候回复并登记预约", "一周内——营销发送首批帖子供您批准"],
};
const ja: BookingCopy = {
  eyebrow: "例 · サロン・サービス業",
  title: "販売担当は予約も受け付けます",
  lead: "サロン、スタジオ、あらゆるサービスに。販売担当が空き時間を案内し、予約を確定し、お客様にリマインドします。",
  client1: "こんにちは！明日18時以降にネイルの予約はできますか？",
  seller1: "明日は18:30と19:30が空いています。どちらがよろしいですか？",
  client2: "18:30でお願いします",
  booked: "予約完了：明日 18:30",
  bookedNote: "2時間前にリマインド",
  weekTitle: "最初の1週間",
  week: ["1日目 — チャット、メニュー、料金を接続", "1日目から — 24時間返信して予約を受付", "1週間以内 — マーケターが最初の投稿を承認用に送信"],
};

const COPY: Partial<Record<Locale, BookingCopy>> = { en, ru, es, pt, de, fr, id, vi, tr, ar, zh, ja };

export function getBookingCopy(locale: Locale): BookingCopy {
  return COPY[locale] ?? en;
}
