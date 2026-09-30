import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/platform/PageHeader";
import { CopyLine } from "@/components/platform/CopyLine";
import { PaymentWatcher } from "@/components/pay/PaymentWatcher";
import { cardClass } from "@/components/ui/classes";
import { formatUsdAmount, payableSkuById } from "@/lib/crypto/catalog";
import { loadInvoiceByRef } from "@/lib/crypto/invoices";
import { NETWORK_LABELS, isPaymentNetwork } from "@/lib/crypto/networks";
import { getPublicChromeCopy } from "@/content/sections";
import { localePath, isLocale, type Locale } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; ref: string }>;
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const pay = getPublicChromeCopy(raw as Locale).payPage;
  return {
    title: pay.metadataTitle,
    robots: { index: false, follow: false },
  };
}

export default async function PayInstructionPage({ params }: Props) {
  const { locale: raw, ref } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const pay = getPublicChromeCopy(locale).payPage;
  const invoice = await loadInvoiceByRef(ref.toLowerCase());
  if (!invoice) notFound();

  const sku = payableSkuById(invoice.sku_id);
  const network = isPaymentNetwork(invoice.network) ? invoice.network : null;
  const expected = Number(invoice.expected_amount);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <PageHeader eyebrow={invoice.public_ref} title={pay.title} lead={pay.lead} />

      <section className={`mt-8 grid gap-5 p-5 sm:p-6 ${cardClass}`}>
        <dl className="grid gap-3 text-sm">
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">{pay.product}</dt>
            <dd>{sku?.name ?? invoice.product_ref}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">{pay.listPrice}</dt>
            <dd className="font-mono">{formatUsdAmount(Number(invoice.amount))}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">{pay.assetNetwork}</dt>
            <dd>
              {invoice.asset} · {network ? NETWORK_LABELS[network] : invoice.network}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">{pay.status}</dt>
            <dd>{invoice.status}</dd>
          </div>
        </dl>

        <CopyLine
          label={pay.amountUnique}
          value={Number.isFinite(expected) ? expected.toFixed(2) : String(invoice.expected_amount)}
        />
        <CopyLine label={pay.treasuryAddress} value={invoice.treasury_address} />
        <CopyLine label={pay.memo} value={invoice.memo} />

        <PaymentWatcher publicRef={invoice.public_ref} locale={locale} initialStatus={invoice.status} />

        <p className="text-xs leading-relaxed text-muted">{pay.footnote}</p>
      </section>

      <p className="mt-8 text-xs text-muted">
        <a className="link-underline" href={localePath(locale, "/pay")}>
          {pay.anotherProduct}
        </a>
      </p>
    </div>
  );
}
