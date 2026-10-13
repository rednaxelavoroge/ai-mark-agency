import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { ContactCta } from "@/components/ContactCta";
import { LeadInquiry } from "@/components/LeadInquiry";
import { getCopy } from "@/content/copy";
import { absoluteUrl, isLocale, site, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

type ContactPageCopy = { title: string; lead: string; chat: string; email: string };

const COPY: Partial<Record<Locale, ContactPageCopy>> = {
  en: { title: "Contact us", lead: "Tell us what you sell and where your customers write — we will reply and help you start the 7-day free trial.", chat: "Open chat", email: "Or email us" },
  ru: { title: "Контакты", lead: "Расскажите, что вы продаёте и где вам пишут клиенты, — ответим и поможем запустить 7 дней бесплатно.", chat: "Открыть чат", email: "Или напишите на почту" },
  es: { title: "Contacto", lead: "Cuéntanos qué vendes y dónde te escriben tus clientes: te responderemos y te ayudaremos a empezar la prueba gratis de 7 días.", chat: "Abrir chat", email: "O escríbenos por email" },
  pt: { title: "Contato", lead: "Conte o que você vende e onde seus clientes escrevem — responderemos e ajudaremos a começar o teste grátis de 7 dias.", chat: "Abrir chat", email: "Ou envie um e-mail" },
  de: { title: "Kontakt", lead: "Sagen Sie uns, was Sie verkaufen und wo Ihre Kunden schreiben — wir antworten und helfen beim Start der 7 kostenlosen Testtage.", chat: "Chat öffnen", email: "Oder per E-Mail" },
  fr: { title: "Contact", lead: "Dites-nous ce que vous vendez et où vos clients écrivent — nous répondrons et vous aiderons à lancer l’essai gratuit de 7 jours.", chat: "Ouvrir le chat", email: "Ou écrivez-nous par e-mail" },
  id: { title: "Kontak", lead: "Ceritakan apa yang Anda jual dan di mana pelanggan menulis — kami akan membalas dan membantu memulai uji coba gratis 7 hari.", chat: "Buka chat", email: "Atau kirim email" },
  vi: { title: "Liên hệ", lead: "Cho chúng tôi biết bạn bán gì và khách nhắn ở đâu — chúng tôi sẽ trả lời và giúp bạn bắt đầu 7 ngày dùng thử miễn phí.", chat: "Mở chat", email: "Hoặc gửi email" },
  tr: { title: "İletişim", lead: "Ne sattığınızı ve müşterilerinizin nereden yazdığını anlatın — yanıtlayıp 7 günlük ücretsiz denemeyi başlatmanıza yardım edelim.", chat: "Sohbeti aç", email: "Ya da e-posta gönderin" },
  ar: { title: "تواصل معنا", lead: "أخبرنا بما تبيعه وأين يراسلك عملاؤك — سنرد عليك ونساعدك في بدء التجربة المجانية لمدة 7 أيام.", chat: "افتح الدردشة", email: "أو راسلنا بالبريد" },
  zh: { title: "联系我们", lead: "告诉我们您卖什么、顾客在哪里联系您——我们会回复并帮您开始 7 天免费试用。", chat: "打开聊天", email: "或发送邮件" },
  ja: { title: "お問い合わせ", lead: "販売しているものと、お客様がどこから連絡してくるかを教えてください。返信して、7日間の無料トライアル開始をお手伝いします。", chat: "チャットを開く", email: "メールでのお問い合わせ" },
};

function pageCopy(locale: Locale): ContactPageCopy {
  return COPY[locale] ?? (COPY.en as ContactPageCopy);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const c = pageCopy(locale);
  const languages: Record<string, string> = { "x-default": absoluteUrl("en", "/contact") };
  for (const loc of site.locales) languages[loc] = absoluteUrl(loc, "/contact");
  return {
    title: { absolute: `${c.title} · ${site.name}` },
    description: c.lead,
    alternates: { canonical: absoluteUrl(locale, "/contact"), languages },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getCopy(locale);
  const c = pageCopy(locale);
  const contact = {
    ...t.contact,
    scenarioOptions: t.contact.scenarioOptions.filter(
      (o) => o.value !== "capital" && o.value !== "investment",
    ),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <BackButton locale={locale} targetHref="/" />
      </div>
      <h1 className="font-display text-3xl font-semibold leading-tight text-paper sm:text-5xl">{c.title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{c.lead}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <ContactCta className="inline-flex min-h-11 items-center rounded-full bg-mark px-6 text-sm font-semibold text-mark-ink">
          {c.chat} →
        </ContactCta>
        <span className="text-sm text-muted">
          {c.email}:{" "}
          <a className="font-semibold text-mark hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </span>
      </div>
      <div className="mt-10 rounded-[24px] border border-line bg-ink-2 p-2">
        <LeadInquiry contact={contact} locale={locale} framed={false} compact />
      </div>
    </article>
  );
}
