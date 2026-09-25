"use server";

import { redirect } from "next/navigation";
import { createPaymentInvoice } from "@/lib/crypto/invoices";
import { localePath, isLocale } from "@/lib/site";
import { readReferralAttribution } from "@/lib/referral/attribution";

function read(formData: FormData, key: string, max: number): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function issuePaymentInvoice(formData: FormData): Promise<void> {
  const localeRaw = read(formData, "locale", 8);
  const locale = isLocale(localeRaw) ? localeRaw : "en";
  const fail = (message: string): never => {
    redirect(
      `${localePath(locale, "/pay")}?error=${encodeURIComponent(message.slice(0, 240))}`,
    );
  };

  const cookie = await readReferralAttribution();
  const typedReferral = read(formData, "referral_code", 32).toLowerCase();
  const referral = typedReferral || cookie?.code || "";

  const result = await createPaymentInvoice({
    skuId: read(formData, "sku_id", 64),
    asset: read(formData, "asset", 8).toUpperCase(),
    network: read(formData, "network", 16).toLowerCase(),
    referralCode: referral,
  });

  if (!result.ok) {
    fail(result.error);
  } else {
    redirect(localePath(locale, `/pay/${result.publicRef}`));
  }
}
