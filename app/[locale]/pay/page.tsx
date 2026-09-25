import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/platform/PageHeader";
import { cardClass, fieldClass, labelClass, primaryButtonClass } from "@/components/ui/classes";
import { PAYABLE_SKUS, formatUsdAmount } from "@/lib/crypto/catalog";
import {
  NETWORK_LABELS,
  PAYMENT_ASSETS,
  PAYMENT_NETWORKS,
  configuredTreasuryRails,
  treasuryAddress,
} from "@/lib/crypto/networks";
import { localePath, isLocale, type Locale } from "@/lib/site";
import { readReferralAttribution } from "@/lib/referral/attribution";
import { issuePaymentInvoice } from "./actions";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const ru = raw === "ru";
  return {
    title: ru ? "Оплата USDT / USDC" : "Pay with USDT / USDC",
    robots: { index: false, follow: false },
  };
}

export const dynamic = "force-dynamic";

export default async function PayPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const ru = locale === "ru";
  const paramsIn = await searchParams;
  const error = first(paramsIn.error);
  const attribution = await readReferralAttribution();
  const rails = configuredTreasuryRails();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <PageHeader
        eyebrow="AI MARK"
        title={ru ? "Оплата на кошелёк AI MARK" : "Pay to an AI MARK wallet"}
        lead={
          ru
            ? "USDT или USDC на адреса казны. Деньги не хранятся у NOWPayments, BitPay или Coinbase Commerce. Stripe позже, здесь его нет."
            : "USDT or USDC to treasury addresses. Funds are not held at NOWPayments, BitPay or Coinbase Commerce. Stripe is later; it is not connected here."
        }
      />

      {error ? (
        <p className="mt-6 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      {rails.length === 0 ? (
        <section className={`mt-8 p-5 sm:p-6 ${cardClass}`}>
          <p className="text-sm leading-relaxed text-muted">
            {ru
              ? "Адреса казны ещё не заданы. Страница оплаты готова; инструкция не выдаётся, пока владелец не пропишет адреса в env."
              : "Treasury addresses are not set yet. This page is ready; payment instructions are not issued until the owner sets the addresses in env."}
          </p>
        </section>
      ) : (
        <form action={issuePaymentInvoice} className={`mt-8 grid gap-4 p-5 sm:p-6 ${cardClass}`}>
          <input type="hidden" name="locale" value={locale} />
          <label className={labelClass}>
            <span className="text-muted">{ru ? "Продукт" : "Product"}</span>
            <select className={fieldClass} name="sku_id" required defaultValue={PAYABLE_SKUS[0]?.id}>
              {PAYABLE_SKUS.map((sku) => (
                <option key={sku.id} value={sku.id}>
                  {sku.name} · {formatUsdAmount(sku.amountUsd)}
                </option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            <span className="text-muted">{ru ? "Стейбл" : "Stablecoin"}</span>
            <select className={fieldClass} name="asset" required defaultValue="USDC">
              {PAYMENT_ASSETS.map((asset) => (
                <option key={asset} value={asset}>
                  {asset}
                </option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            <span className="text-muted">{ru ? "Сеть" : "Network"}</span>
            <select className={fieldClass} name="network" required defaultValue="solana">
              {PAYMENT_NETWORKS.map((network) => {
                const ready = PAYMENT_ASSETS.some((asset) => treasuryAddress(asset, network));
                return (
                  <option key={network} value={network} disabled={!ready}>
                    {NETWORK_LABELS[network]}
                    {ready ? "" : ru ? " — адрес не задан" : " — address not set"}
                  </option>
                );
              })}
            </select>
          </label>
          <label className={labelClass}>
            <span className="text-muted">{ru ? "Реферальный код, если есть" : "Referral code, if you have one"}</span>
            <input
              className={fieldClass}
              name="referral_code"
              maxLength={32}
              defaultValue={attribution?.code ?? ""}
            />
          </label>
          <p className="text-xs leading-relaxed text-muted">
            {ru
              ? "Сумма берётся из опубликованного прайса. К ней добавляются уникальные центы, чтобы сматчить перевод. Клиент sale не пишет."
              : "The amount is the published list price. Unique cents are added so the transfer can be matched. The customer does not write a sale."}
          </p>
          <button type="submit" className={`w-fit ${primaryButtonClass}`}>
            {ru ? "Получить инструкцию" : "Get payment instructions"}
          </button>
        </form>
      )}

      <p className="mt-8 text-xs text-muted">
        {ru ? "После оплаты админ сверяет tx hash. Не отправляйте токены не на тот адрес и не в той сети." : "After you pay, an operator matches the transaction hash. Send only to the address and network on the instruction."}
        {" "}
        <a className="link-underline" href={localePath(locale, "/")}>
          {ru ? "На главную" : "Home"}
        </a>
      </p>
    </div>
  );
}
