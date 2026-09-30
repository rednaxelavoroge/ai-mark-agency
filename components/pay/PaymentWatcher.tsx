"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const COPY: Record<string, { waiting: string; done: string }> = {
  en: { waiting: "Waiting for your transfer. We check the blockchain automatically — keep this page open. After confirmation, access arrives by email.", done: "Payment received. Your access email is on its way." },
  ru: { waiting: "Ждём перевод. Мы проверяем блокчейн автоматически — не закрывайте страницу. После подтверждения доступ придёт на email.", done: "Оплата получена. Письмо с доступом уже отправлено." },
  de: { waiting: "Wir warten auf Ihre Überweisung und prüfen die Blockchain automatisch – lassen Sie diese Seite offen. Nach der Bestätigung kommt der Zugang per E-Mail.", done: "Zahlung erhalten. Ihre Zugangs-E-Mail ist unterwegs." },
  es: { waiting: "Esperando tu transferencia. Revisamos la blockchain automáticamente: mantén esta página abierta. Tras la confirmación, el acceso llega por email.", done: "Pago recibido. Tu email de acceso está en camino." },
  fr: { waiting: "En attente de votre virement. Nous vérifions la blockchain automatiquement — gardez cette page ouverte. Après confirmation, l’accès arrive par e-mail.", done: "Paiement reçu. Votre e-mail d’accès est en route." },
  pt: { waiting: "Aguardando sua transferência. Verificamos a blockchain automaticamente — mantenha esta página aberta. Após a confirmação, o acesso chega por e-mail.", done: "Pagamento recebido. Seu e-mail de acesso está a caminho." },
  tr: { waiting: "Transferiniz bekleniyor. Blok zincirini otomatik kontrol ediyoruz — bu sayfayı açık tutun. Onaydan sonra erişim e-postayla gelir.", done: "Ödeme alındı. Erişim e-postanız yolda." },
  vi: { waiting: "Đang chờ giao dịch của bạn. Chúng tôi tự động kiểm tra blockchain — hãy giữ trang này mở. Sau khi xác nhận, quyền truy cập sẽ gửi qua email.", done: "Đã nhận thanh toán. Email truy cập đang được gửi." },
  id: { waiting: "Menunggu transfer Anda. Kami memeriksa blockchain secara otomatis — biarkan halaman ini terbuka. Setelah konfirmasi, akses dikirim lewat email.", done: "Pembayaran diterima. Email akses sedang dikirim." },
  zh: { waiting: "正在等待您的转账。我们会自动检查区块链——请保持此页面打开。确认后，访问链接将通过邮件发送。", done: "已收到付款。访问邮件正在发送。" },
  ja: { waiting: "送金をお待ちしています。ブロックチェーンを自動で確認します。このページを開いたままにしてください。確認後、アクセス情報をメールでお送りします。", done: "お支払いを確認しました。アクセス用メールを送信しています。" },
  ar: { waiting: "بانتظار تحويلك. نتحقق من البلوكشين تلقائياً — أبقِ هذه الصفحة مفتوحة. بعد التأكيد يصلك الوصول عبر البريد الإلكتروني.", done: "تم استلام الدفع. رسالة الوصول في الطريق إليك." },
};

export function PaymentWatcher({ publicRef, locale, initialStatus }: { publicRef: string; locale: string; initialStatus: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const t = COPY[locale] ?? COPY.en;

  useEffect(() => {
    if (status !== "awaiting") return;
    let stopped = false;
    const started = Date.now();
    const tick = async () => {
      if (stopped || Date.now() - started > 3 * 3600_000) return;
      try {
        const res = await fetch(`/api/pay/status?ref=${encodeURIComponent(publicRef)}&locale=${encodeURIComponent(locale)}`, { cache: "no-store" });
        const json = (await res.json()) as { status?: string };
        if (json.status && json.status !== "awaiting") {
          setStatus(json.status);
          router.refresh();
          return;
        }
      } catch {
        /* retry on next tick */
      }
      if (!stopped) setTimeout(tick, 20_000);
    };
    const first = setTimeout(tick, 5_000);
    return () => {
      stopped = true;
      clearTimeout(first);
    };
  }, [status, publicRef, locale, router]);

  if (status === "confirmed") {
    return <p role="status" className="text-sm font-medium">{t.done}</p>;
  }
  if (status !== "awaiting") return null;
  return (
    <p role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-muted">
      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-current" aria-hidden />
      {t.waiting}
    </p>
  );
}
