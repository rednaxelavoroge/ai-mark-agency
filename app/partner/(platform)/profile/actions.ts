"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requirePartner } from "@/lib/auth/dal";
import {
  DEFAULT_PAYOUT_NETWORK,
  formatPayoutDetails,
  validatePartnerUsdcAddress,
} from "@/lib/crypto/payout-destination";
import { isPayoutNetwork } from "@/lib/crypto/networks";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const RECIPIENT_MAX = 120;
const DETAILS_MAX = 2000;

function fail(message: string): never {
  redirect(`/partner/profile?error=${encodeURIComponent(message.slice(0, 240))}`);
}

/**
 * Blank becomes null. A value over the column limit is refused.
 * Length is counted in Unicode code points, matching `char_length`.
 */
function optionalText(
  value: FormDataEntryValue | null,
  max: number,
  multiline: boolean,
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = multiline ? trimmed : trimmed.replace(/\s+/g, " ");
  if ([...normalized].length > max) fail(`Keep that field to ${max} characters.`);
  return normalized;
}

/**
 * Saves where this partner wants a payout sent.
 *
 * Writes only `payout_recipient` and `payout_details` on the caller's own
 * profile, through their session, so Row Level Security still applies.
 * It does not touch the ledger, the partner id, the sponsor, or a rate.
 */
export async function savePayoutDetails(formData: FormData): Promise<void> {
  const { auth } = await requirePartner("/partner/profile");
  const recipient = optionalText(formData.get("payout_recipient"), RECIPIENT_MAX, false);
  const networkRaw = optionalText(formData.get("payout_network"), 16, false)?.toLowerCase();
  const network = networkRaw && isPayoutNetwork(networkRaw) ? networkRaw : DEFAULT_PAYOUT_NETWORK;
  const address = optionalText(formData.get("payout_address"), 128, false);
  const notes = optionalText(formData.get("payout_notes"), DETAILS_MAX, true);
  if (address) {
    const invalid = validatePartnerUsdcAddress(network, address);
    if (invalid) fail(invalid);
  }
  const details = address
    ? formatPayoutDetails({ network, address, notes })
    : notes;
  if (details && [...details].length > DETAILS_MAX) {
    fail(`Keep that field to ${DETAILS_MAX} characters.`);
  }

  const supabase = await createSupabaseServerClient();
  const result = await supabase
    .from("profiles")
    .update({
      payout_recipient: recipient,
      payout_details: details,
    })
    .eq("id", auth.userId)
    .select("id");

  if (result.error) fail(result.error.message);
  if (!result.data || result.data.length === 0) {
    fail("Payout details could not be saved.");
  }

  revalidatePath("/partner/profile");
  revalidatePath("/partner/payouts");
  revalidatePath("/admin/payouts");
  redirect("/partner/profile?saved=1");
}
