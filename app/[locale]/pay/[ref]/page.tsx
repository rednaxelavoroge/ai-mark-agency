import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/platform/PageHeader";
import { CopyLine } from "@/components/platform/CopyLine";
import { cardClass } from "@/components/ui/classes";
import { formatUsdAmount, payableSkuById } from "@/lib/crypto/catalog";
import { loadInvoiceByRef } from "@/lib/crypto/invoices";
import { NETWORK_LABELS, isPaymentNetwork } from "@/lib/crypto/networks";
import { localePath, isLocale, type Locale } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; ref: string }>;
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const ru = raw === "ru";
  return {
    title: ru ? "Инструкция оплаты" : "Payment instruction",
    robots: { index: false, follow: false },
  };
}

export default async function PayInstructionPage({ params }: Props) {
  const { locale: raw, ref } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const ru = locale === "ru";
  const invoice = await loadInvoiceByRef(ref.toLowerCase());
  if (!invoice) notFound();

  const sku = payableSkuById(invoice.sku_id);
  const network = isPaymentNetwork(invoice.network) ? invoice.network : null;
  const expected = Number(invoice.expected_amount);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <PageHeader
        eyebrow={invoice.public_ref}
        title={ru ? "Перевод на адрес AI MARK" : "Send to an AI MARK address"}
        lead={
          ru
            ? "Отправьте точную сумму на этот адрес. Деньги идут сразу на кошелёк владельца, не на баланс мерчанта."
            : "Send the exact amount to this address. Funds go to the owner wallet, not a merchant balance."
        }
      />

      <section className={`mt-8 grid gap-5 p-5 sm:p-6 ${cardClass}`}>
        <dl className="grid gap-3 text-sm">
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">{ru ? "Продукт" : "Product"}</dt>
            <dd>{sku?.name ?? invoice.product_ref}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">{ru ? "Прайсовая сумма" : "List price"}</dt>
            <dd className="font-mono">{formatUsdAmount(Number(invoice.amount))}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">{ru ? "Стейбл / сеть" : "Asset / network"}</dt>
            <dd>
              {invoice.asset} · {network ? NETWORK_LABELS[network] : invoice.network}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">{ru ? "Статус" : "Status"}</dt>
            <dd>{invoice.status}</dd>
          </div>
        </dl>

        <CopyLine
          label={ru ? "Сумма к отправке (уникальная)" : "Amount to send (unique)"}
          value={Number.isFinite(expected) ? expected.toFixed(2) : String(invoice.expected_amount)}
        />
        <CopyLine label={ru ? "Адрес казны" : "Treasury address"} value={invoice.treasury_address} />
        <CopyLine
          label={ru ? "Memo / примечание (если кошелёк умеет)" : "Memo / note (if your wallet supports it)"}
          value={invoice.memo}
        />

        <p className="text-xs leading-relaxed text-muted">
          {ru
            ? "Уникальные центы в сумме нужны, чтобы отличить этот платёж. Memo совпадает со ссылкой. Не отправляйте с другой сети. Оплата картой здесь не принимается."
            : "The unique cents identify this payment. The memo matches this link. Do not send from another network. Cards are not accepted here."}
        </p>
      </section>

      <p className="mt-8 text-xs text-muted">
        <a className="link-underline" href={localePath(locale, "/pay")}>
          {ru ? "Другой продукт" : "Another product"}
        </a>
      </p>
    </div>
  );
}
