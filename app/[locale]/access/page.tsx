import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ResendAccessForm, type ResendCopy } from "@/components/access/ResendAccessForm";
import { isLocale, navHref, site, type Locale } from "@/lib/site";

const COPY: Record<string, ResendCopy> = {
  en: { title: "Get a new sign-in link", lead: "Enter the email you paid with. If it has an active product, we’ll send a fresh single-use link.", label: "Email", submit: "Send link", sent: "If this email has an active product, a new link is on its way. Check your inbox and spam.", error: "Something went wrong. Please try again in a minute." },
  ru: { title: "Новая ссылка для входа", lead: "Укажите email, с которого оплачивали. Если на нём есть активный продукт, пришлём новую одноразовую ссылку.", label: "Email", submit: "Прислать ссылку", sent: "Если на этом email есть активный продукт, новая ссылка уже отправлена. Проверьте входящие и спам.", error: "Что-то пошло не так. Попробуйте через минуту." },
  de: { title: "Neuen Anmeldelink anfordern", lead: "Geben Sie die E-Mail ein, mit der Sie bezahlt haben. Bei einem aktiven Produkt senden wir einen neuen Einmal-Link.", label: "E-Mail", submit: "Link senden", sent: "Falls diese E-Mail ein aktives Produkt hat, ist ein neuer Link unterwegs. Prüfen Sie Posteingang und Spam.", error: "Etwas ist schiefgelaufen. Bitte in einer Minute erneut versuchen." },
  es: { title: "Obtener un nuevo enlace de acceso", lead: "Introduce el email con el que pagaste. Si tiene un producto activo, te enviaremos un enlace nuevo de un solo uso.", label: "Email", submit: "Enviar enlace", sent: "Si este email tiene un producto activo, el nuevo enlace va en camino. Revisa la bandeja de entrada y el spam.", error: "Algo salió mal. Inténtalo de nuevo en un minuto." },
  fr: { title: "Recevoir un nouveau lien de connexion", lead: "Saisissez l’e-mail utilisé pour le paiement. S’il a un produit actif, nous enverrons un nouveau lien à usage unique.", label: "E-mail", submit: "Envoyer le lien", sent: "Si cet e-mail a un produit actif, un nouveau lien est en route. Vérifiez la boîte de réception et les spams.", error: "Une erreur s’est produite. Réessayez dans une minute." },
  pt: { title: "Receber um novo link de acesso", lead: "Informe o e-mail usado no pagamento. Se houver um produto ativo, enviaremos um novo link de uso único.", label: "E-mail", submit: "Enviar link", sent: "Se este e-mail tiver um produto ativo, o novo link está a caminho. Verifique a caixa de entrada e o spam.", error: "Algo deu errado. Tente novamente em um minuto." },
  tr: { title: "Yeni giriş bağlantısı al", lead: "Ödeme yaptığınız e-postayı girin. Aktif bir ürün varsa yeni, tek kullanımlık bir bağlantı göndeririz.", label: "E-posta", submit: "Bağlantı gönder", sent: "Bu e-postada aktif bir ürün varsa yeni bağlantı yolda. Gelen kutusunu ve spam klasörünü kontrol edin.", error: "Bir sorun oluştu. Bir dakika sonra tekrar deneyin." },
  vi: { title: "Nhận liên kết đăng nhập mới", lead: "Nhập email bạn đã dùng để thanh toán. Nếu có sản phẩm đang hoạt động, chúng tôi sẽ gửi liên kết dùng một lần mới.", label: "Email", submit: "Gửi liên kết", sent: "Nếu email này có sản phẩm đang hoạt động, liên kết mới đang được gửi. Hãy kiểm tra hộp thư và thư rác.", error: "Đã xảy ra lỗi. Vui lòng thử lại sau một phút." },
  id: { title: "Dapatkan tautan masuk baru", lead: "Masukkan email yang Anda gunakan untuk membayar. Jika ada produk aktif, kami kirim tautan sekali pakai yang baru.", label: "Email", submit: "Kirim tautan", sent: "Jika email ini memiliki produk aktif, tautan baru sedang dikirim. Periksa kotak masuk dan spam.", error: "Terjadi kesalahan. Coba lagi dalam satu menit." },
  zh: { title: "获取新的登录链接", lead: "请输入付款时使用的邮箱。如该邮箱有有效产品，我们会发送新的一次性链接。", label: "邮箱", submit: "发送链接", sent: "如该邮箱有有效产品，新链接已在发送中。请查看收件箱和垃圾邮件。", error: "出错了，请一分钟后重试。" },
  ja: { title: "新しいログインリンクを受け取る", lead: "お支払いに使ったメールアドレスを入力してください。有効な製品があれば、新しい1回限りのリンクをお送りします。", label: "メールアドレス", submit: "リンクを送る", sent: "このメールアドレスに有効な製品があれば、新しいリンクを送信しました。受信トレイと迷惑メールをご確認ください。", error: "エラーが発生しました。1分後にもう一度お試しください。" },
  ar: { title: "احصل على رابط دخول جديد", lead: "أدخل البريد الذي دفعت به. إذا كان لديه منتج نشط فسنرسل رابطاً جديداً صالحاً لمرة واحدة.", label: "البريد الإلكتروني", submit: "أرسل الرابط", sent: "إذا كان لهذا البريد منتج نشط، فالرابط الجديد في الطريق. تحقق من البريد الوارد والرسائل غير المرغوب فيها.", error: "حدث خطأ. حاول مرة أخرى بعد دقيقة." },
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ email?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = COPY[locale] ?? COPY.en;
  return { title: { absolute: `${t.title} · ${site.name}` }, robots: { index: false, follow: false } };
}

export default async function AccessPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const { email } = await searchParams;
  const t = COPY[locale] ?? COPY.en;
  return (
    <article className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <Link href={navHref(locale, "/")} className="text-sm text-mark hover:underline">
        ← {site.name}
      </Link>
      <h1 className="mt-6 font-display text-3xl">{t.title}</h1>
      <p className="mt-3 text-sm leading-6 text-muted">{t.lead}</p>
      <ResendAccessForm locale={locale} initialEmail={(email ?? "").slice(0, 254)} t={t} />
    </article>
  );
}
