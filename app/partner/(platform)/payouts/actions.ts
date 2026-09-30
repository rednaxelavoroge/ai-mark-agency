"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requirePartner } from "@/lib/auth/dal";
import { sendPartnerPayoutEmail } from "@/lib/email/partner";
import { canRequestPayout } from "@/lib/partner/payout";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function fail(message: string): never {
  redirect(`/partner/payouts?error=${encodeURIComponent(message.slice(0, 240))}`);
}

export async function requestPartnerPayout(): Promise<void> {
  const { auth } = await requirePartner("/partner/payouts");
  const supabase = await createSupabaseServerClient();

  const ledger = await supabase.rpc("partner_ledger_stats");
  const row = ledger.data?.[0];
  const currency = row?.currency ?? "USD";
  const payable = row?.payable_amount ?? null;

  const payouts = await supabase
    .from("payouts")
    .select("id")
    .eq("status", "open")
    .limit(1);
  const destination = await supabase
    .from("profiles")
    .select("payout_recipient, payout_details, language, email")
    .eq("id", auth.userId)
    .maybeSingle();

  const guard = canRequestPayout({
    payableAmount: payable,
    currency,
    hasOpenPayout: Boolean(payouts.data?.length),
    hasDestination: Boolean(
      destination.data?.payout_recipient && destination.data?.payout_details,
    ),
  });

  if (!guard.ok) {
    const messages: Record<string, string> = {
      missing_destination: "Save your USDC payout address on Profile first.",
      open_payout: "You already have an open payout request.",
      below_minimum: "Your payable balance is below the minimum threshold.",
      unreadable: "Your ledger could not be read. Try again later.",
      currency: "Payout requests are available in USD only.",
    };
    fail(messages[guard.reason] ?? "The payout could not be requested.");
  }

  const result = await supabase.rpc("request_partner_payout", {
    p_currency: currency,
    p_requested_by: auth.userId,
  });

  if (result.error) fail(result.error.message);

  const payoutId = result.data as string;
  const payout = await supabase
    .from("payouts")
    .select("amount, currency")
    .eq("id", payoutId)
    .maybeSingle();

  if (payout.data?.amount && destination.data?.email) {
    void sendPartnerPayoutEmail("requested", {
      to: destination.data.email,
      locale: destination.data.language ?? "en",
      amount: String(payout.data.amount),
      currency: payout.data.currency,
    });
  }

  revalidatePath("/partner/payouts");
  revalidatePath("/admin/payouts");
  redirect("/partner/payouts?requested=1");
}
