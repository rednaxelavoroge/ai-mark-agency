import type { Locale } from "@/lib/site";

/**
 * Copy for the home hero product animation (HeroProductDemo): a customer
 * writes in chat, the Seller answers and books the order, then the Marketer
 * picks up follow-up tasks. Every locale is spelled out; unknown ones fall
 * back to English. No city names, no prices beyond the in-chat example.
 */
export interface HeroDemoCopy {
  label: string;
  chatTitle: string;
  online: string;
  client1: string;
  seller1: string;
  client2: string;
  bookedTitle: string;
  bookedDetail: string;
  marketerTitle: string;
  tasks: [string, string, string];
  taskStatus: [string, string, string];
}

const en: HeroDemoCopy = {
  label:
    "Animation: a customer asks in chat, the Showroom AI Seller answers, books the order, and the Marketer gets follow-up tasks.",
  chatTitle: "Showroom AI · Seller",
  online: "online 24/7",
  client1: "Hi! Is the blue dress in size M available? Can I pick it up tomorrow?",
  seller1: "Yes, size M is in stock — $49. I can reserve it for tomorrow at 15:00. Shall I book it?",
  client2: "Yes, please!",
  bookedTitle: "Order #1042 booked",
  bookedDetail: "Tomorrow, 15:00 · reminder sent",
  marketerTitle: "Showroom AI · Marketer",
  tasks: ["Post: new arrivals", "Ad for returning customers", "Review request after pickup"],
  taskStatus: ["ready", "in review", "scheduled"],
};

const ru: HeroDemoCopy = {
  label:
    "Анимация: клиент пишет в чат, Продавец Showroom AI отвечает и оформляет заказ, а Маркетолог получает задачи.",
  chatTitle: "Showroom AI · Продавец",
  online: "на связи 24/7",
  client1: "Здравствуйте! Синее платье в размере M есть? Можно забрать завтра?",
  seller1: "Да, M в наличии — $49. Могу отложить на завтра, 15:00. Оформить?",
  client2: "Да, оформляйте!",
  bookedTitle: "Заказ №1042 оформлен",
  bookedDetail: "Завтра, 15:00 · напоминание отправлено",
  marketerTitle: "Showroom AI · Маркетолог",
  tasks: ["Пост: новое поступление", "Реклама для постоянных клиентов", "Просьба об отзыве после покупки"],
  taskStatus: ["готово", "на согласовании", "запланировано"],
};

const es: HeroDemoCopy = {
  label:
    "Animación: un cliente escribe en el chat, el Vendedor de Showroom AI responde y reserva el pedido, y el Marketer recibe tareas.",
  chatTitle: "Showroom AI · Vendedor",
  online: "en línea 24/7",
  client1: "¡Hola! ¿Tienen el vestido azul en talla M? ¿Puedo recogerlo mañana?",
  seller1: "Sí, la talla M está disponible — $49. Puedo reservarlo para mañana a las 15:00. ¿Lo reservo?",
  client2: "¡Sí, por favor!",
  bookedTitle: "Pedido n.º 1042 reservado",
  bookedDetail: "Mañana, 15:00 · recordatorio enviado",
  marketerTitle: "Showroom AI · Marketer",
  tasks: ["Post: novedades", "Anuncio para clientes habituales", "Pedir reseña tras la recogida"],
  taskStatus: ["listo", "en revisión", "programado"],
};

const pt: HeroDemoCopy = {
  label:
    "Animação: um cliente escreve no chat, o Vendedor do Showroom AI responde e reserva o pedido, e o Marketer recebe tarefas.",
  chatTitle: "Showroom AI · Vendedor",
  online: "online 24/7",
  client1: "Olá! Tem o vestido azul no tamanho M? Posso buscar amanhã?",
  seller1: "Sim, o M está disponível — $49. Posso reservar para amanhã às 15:00. Reservo?",
  client2: "Sim, por favor!",
  bookedTitle: "Pedido nº 1042 reservado",
  bookedDetail: "Amanhã, 15:00 · lembrete enviado",
  marketerTitle: "Showroom AI · Marketer",
  tasks: ["Post: novidades", "Anúncio para clientes recorrentes", "Pedido de avaliação após a retirada"],
  taskStatus: ["pronto", "em revisão", "agendado"],
};

const ar: HeroDemoCopy = {
  label:
    "رسوم متحركة: عميل يكتب في الدردشة، ويرد البائع في Showroom AI ويحجز الطلب، ثم يتلقى المسوّق المهام.",
  chatTitle: "Showroom AI · البائع",
  online: "متاح 24/7",
  client1: "مرحبًا! هل الفستان الأزرق متوفر بمقاس M؟ هل يمكنني استلامه غدًا؟",
  seller1: "نعم، المقاس M متوفر — $49. يمكنني حجزه لغد الساعة 15:00. هل أحجزه؟",
  client2: "نعم، من فضلك!",
  bookedTitle: "تم حجز الطلب رقم 1042",
  bookedDetail: "غدًا، 15:00 · تم إرسال تذكير",
  marketerTitle: "Showroom AI · المسوّق",
  tasks: ["منشور: وصل حديثًا", "إعلان للعملاء الدائمين", "طلب تقييم بعد الاستلام"],
  taskStatus: ["جاهز", "قيد المراجعة", "مجدول"],
};

const zh: HeroDemoCopy = {
  label: "动画：顾客在聊天中提问，Showroom AI 销售回复并预订订单，营销随后收到任务。",
  chatTitle: "Showroom AI · 销售",
  online: "全天候在线",
  client1: "你好！蓝色连衣裙有 M 码吗？明天可以来取吗？",
  seller1: "有的，M 码有货 — $49。可以为您预留到明天 15:00。帮您预订吗？",
  client2: "好的，请预订！",
  bookedTitle: "订单 #1042 已预订",
  bookedDetail: "明天 15:00 · 已发送提醒",
  marketerTitle: "Showroom AI · 营销",
  tasks: ["帖子：新品上架", "面向老顾客的广告", "取货后邀请评价"],
  taskStatus: ["已完成", "待审批", "已排期"],
};

const id: HeroDemoCopy = {
  label:
    "Animasi: pelanggan menulis di chat, Penjual Showroom AI membalas dan memesan, lalu Marketer menerima tugas.",
  chatTitle: "Showroom AI · Penjual",
  online: "online 24/7",
  client1: "Halo! Gaun biru ukuran M ada? Bisa saya ambil besok?",
  seller1: "Ada, ukuran M tersedia — $49. Saya bisa simpan untuk besok pukul 15:00. Dipesan?",
  client2: "Ya, tolong!",
  bookedTitle: "Pesanan #1042 dipesan",
  bookedDetail: "Besok, 15:00 · pengingat terkirim",
  marketerTitle: "Showroom AI · Marketer",
  tasks: ["Post: koleksi baru", "Iklan untuk pelanggan lama", "Minta ulasan setelah pengambilan"],
  taskStatus: ["siap", "ditinjau", "dijadwalkan"],
};

const vi: HeroDemoCopy = {
  label:
    "Hoạt ảnh: khách nhắn trong chat, Nhân viên bán hàng Showroom AI trả lời và đặt đơn, rồi Marketer nhận nhiệm vụ.",
  chatTitle: "Showroom AI · Bán hàng",
  online: "trực tuyến 24/7",
  client1: "Chào shop! Váy xanh size M còn không? Mai mình qua lấy được không?",
  seller1: "Dạ còn size M — $49. Mình giữ cho bạn đến 15:00 ngày mai nhé. Đặt luôn ạ?",
  client2: "Đặt giúp mình nhé!",
  bookedTitle: "Đã đặt đơn #1042",
  bookedDetail: "Ngày mai, 15:00 · đã gửi nhắc hẹn",
  marketerTitle: "Showroom AI · Marketer",
  tasks: ["Bài đăng: hàng mới về", "Quảng cáo cho khách quen", "Xin đánh giá sau khi nhận hàng"],
  taskStatus: ["xong", "chờ duyệt", "đã lên lịch"],
};

const de: HeroDemoCopy = {
  label:
    "Animation: Ein Kunde schreibt im Chat, der Showroom-AI-Verkäufer antwortet und bucht die Bestellung, der Marketer erhält Aufgaben.",
  chatTitle: "Showroom AI · Verkäufer",
  online: "rund um die Uhr da",
  client1: "Hallo! Gibt es das blaue Kleid in M? Kann ich es morgen abholen?",
  seller1: "Ja, M ist vorrätig — $49. Ich kann es für morgen, 15:00 reservieren. Soll ich buchen?",
  client2: "Ja, gerne!",
  bookedTitle: "Bestellung Nr. 1042 gebucht",
  bookedDetail: "Morgen, 15:00 · Erinnerung gesendet",
  marketerTitle: "Showroom AI · Marketer",
  tasks: ["Post: Neuheiten", "Anzeige für Stammkunden", "Bewertungsanfrage nach Abholung"],
  taskStatus: ["fertig", "zur Freigabe", "geplant"],
};

const fr: HeroDemoCopy = {
  label:
    "Animation : un client écrit dans le chat, le Vendeur Showroom AI répond et réserve la commande, puis le Marketer reçoit des tâches.",
  chatTitle: "Showroom AI · Vendeur",
  online: "en ligne 24/7",
  client1: "Bonjour ! La robe bleue existe en taille M ? Je peux la récupérer demain ?",
  seller1: "Oui, la taille M est en stock — 49 $. Je peux la réserver pour demain 15:00. Je réserve ?",
  client2: "Oui, s’il vous plaît !",
  bookedTitle: "Commande n° 1042 réservée",
  bookedDetail: "Demain, 15:00 · rappel envoyé",
  marketerTitle: "Showroom AI · Marketer",
  tasks: ["Post : nouveautés", "Pub pour les clients fidèles", "Demande d’avis après retrait"],
  taskStatus: ["prêt", "à valider", "planifié"],
};

const ja: HeroDemoCopy = {
  label:
    "アニメーション：お客様がチャットで質問し、Showroom AI の販売担当が回答して予約を確定、マーケターにタスクが届きます。",
  chatTitle: "Showroom AI · 販売担当",
  online: "24時間対応",
  client1: "こんにちは！青いワンピースのMサイズはありますか？明日受け取れますか？",
  seller1: "はい、Mサイズは在庫あり — $49です。明日15:00でお取り置きできます。予約しますか？",
  client2: "はい、お願いします！",
  bookedTitle: "注文 #1042 を予約しました",
  bookedDetail: "明日 15:00 · リマインダー送信済み",
  marketerTitle: "Showroom AI · マーケター",
  tasks: ["投稿：新着アイテム", "リピーター向け広告", "受け取り後のレビュー依頼"],
  taskStatus: ["完了", "承認待ち", "予約済み"],
};

const tr: HeroDemoCopy = {
  label:
    "Animasyon: müşteri sohbete yazar, Showroom AI Satıcı yanıtlar ve siparişi ayırır, ardından Pazarlamacı görevleri alır.",
  chatTitle: "Showroom AI · Satıcı",
  online: "7/24 çevrimiçi",
  client1: "Merhaba! Mavi elbisenin M bedeni var mı? Yarın alabilir miyim?",
  seller1: "Evet, M beden stokta — $49. Yarın 15:00 için ayırabilirim. Ayırayım mı?",
  client2: "Evet, lütfen!",
  bookedTitle: "Sipariş #1042 ayrıldı",
  bookedDetail: "Yarın, 15:00 · hatırlatma gönderildi",
  marketerTitle: "Showroom AI · Pazarlamacı",
  tasks: ["Gönderi: yeni gelenler", "Sadık müşterilere reklam", "Teslimattan sonra yorum isteği"],
  taskStatus: ["hazır", "onayda", "planlandı"],
};

const heroDemoCopy: Partial<Record<Locale, HeroDemoCopy>> = {
  en, ru, es, pt, ar, zh, id, vi, de, fr, ja, tr,
};

export function getHeroDemoCopy(locale: Locale): HeroDemoCopy {
  return heroDemoCopy[locale] ?? en;
}
