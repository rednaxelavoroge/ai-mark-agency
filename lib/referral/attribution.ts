import "server-only";

import { cookies } from "next/headers";
import {
  ATTRIBUTION_WINDOW_MS,
  REFERRAL_COOKIE_NAME,
  signReferralCookie,
  verifyReferralCookie,
  type ReferralCookiePayload,
} from "@/lib/referral/cookie";
import {
  CLICK_DEDUPE_MS,
  UTM_STORED_KEYS,
  normalizeReferralCode,
  type UtmParams,
} from "@/lib/referral/rules";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * The server half of the referral engine.
 *
 * Everything an attacker could otherwise forge happens here, on the server:
 *
 *   * the referral code is verified against the `partner_profiles` table, not
 *     merely parsed from the URL;
 *   * the attribution cookie is signature-checked and freshness-checked on
 *     every read (see lib/referral/cookie.ts);
 *   * clicks, leads and the sponsor edge are written with the elevated
 *     service-role client, so neither an anonymous visitor nor a signed-in
 *     partner can write them over PostgREST (RLS grants no write policy on
 *     either attribution table — see the Phase 4B RLS migration).
 *
 * Attribution rules (mirrored in the migration headers and the README):
 *   Partner signup:  last valid partner referral before signup.
 *   Customer lead:   last valid partner referral within 30 days before lead
 *                    creation.
 *
 * Failure policy: an attribution problem must never break a product flow. A
 * missing key, an unreachable database or a rejected input degrades to "not
 * attributed" and a server log line — the `/api/contact` response and the
 * signup response are not affected.
 */

/**
 * The HMAC key for the attribution cookie.
 *
 * A dedicated `REFERRAL_COOKIE_SECRET` is preferred so the cookie key can be
 * rotated without touching the database key; the Supabase secret falls back to
 * it because Phase 4B already requires the service role server-side. When
 * neither is present no cookie is issued at all — an unsigned attribution
 * cookie would let any visitor pick their own referral code.
 */
export function referralSecret(): string | null {
  const dedicated = process.env.REFERRAL_COOKIE_SECRET?.trim();
  if (dedicated) return dedicated;
  const fallback = process.env.SUPABASE_SECRET_KEY?.trim();
  return fallback ? fallback : null;
}

/** A usable (non-publishable, non-empty) Supabase secret key. */
function hasSupabaseSecretKey(): boolean {
  const key = process.env.SUPABASE_SECRET_KEY?.trim() ?? "";
  return key.length > 0 && !key.startsWith("sb_publishable_");
}

/**
 * True when click/lead/signup tracking can actually run.
 *
 * False is a supported state: the public site and the partner dashboard keep
 * working, `/go/<code>` still redirects, and nothing is recorded. That keeps
 * `npm run build` and local development green with no credentials, exactly as
 * the public site has always been.
 */
export function isReferralTrackingEnabled(): boolean {
  return (
    isSupabaseConfigured() &&
    hasSupabaseSecretKey() &&
    referralSecret() !== null
  );
}

/** The current visitor's verified, unexpired referral attribution, if any. */
export async function readReferralAttribution(): Promise<ReferralCookiePayload | null> {
  const secret = referralSecret();
  if (!secret) return null;

  const store = await cookies();
  const raw = store.get(REFERRAL_COOKIE_NAME)?.value;

  return verifyReferralCookie(raw, {
    secret,
    windowMs: ATTRIBUTION_WINDOW_MS,
  });
}

/** Signs a fresh cookie value for a verified attribution. */
export function referralCookieValue(
  attribution: Pick<ReferralAttribution, "code" | "clickId">,
  issuedAt: number = Date.now(),
): string | null {
  const secret = referralSecret();
  if (!secret) return null;

  return signReferralCookie(
    { v: 1, code: attribution.code, issuedAt, clickId: attribution.clickId },
    secret,
  );
}

export type ReferralAttribution = {
  /** Public partner id of the link owner. Never enters a URL. */
  partnerId: string;
  /** The referral code the visitor followed. */
  code: string;
  /** The recorded click, or null when recording failed. */
  clickId: string | null;
  /** True when this visit reused the click already in the cookie. */
  reused: boolean;
};

/**
 * Validates a referral code against the database and records the click.
 *
 * Returns null when the code is unknown, belongs to a suspended partner, or
 * tracking is disabled. The caller redirects either way — the visitor must
 * never learn whether a code exists.
 */
export async function resolveAndRecordReferralClick(input: {
  code: unknown;
  landingPath: string;
  utm: UtmParams;
}): Promise<ReferralAttribution | null> {
  if (!isReferralTrackingEnabled()) return null;

  const code = normalizeReferralCode(input.code);
  if (!code) return null;

  try {
    const admin = createSupabaseAdminClient();

    const { data: partner, error: partnerError } = await admin
      .from("partner_profiles")
      .select("partner_id, status")
      .eq("referral_code", code)
      .maybeSingle();

    if (partnerError) {
      console.error(
        "[referral] could not resolve referral code:",
        partnerError.message,
      );
      return null;
    }

    // Unknown code, or a suspended partner: no click, no cookie.
    if (!partner || partner.status === "suspended") return null;

    // A reload — or a second visit to the same link inside the dedupe window —
    // is the same click, so a partner cannot inflate their own count by
    // refreshing. Following a different partner's link still re-attributes.
    const existing = await readReferralAttribution();
    if (existing && existing.code === code && existing.clickId) {
      const age = Date.now() - existing.issuedAt;
      if (age >= 0 && age < CLICK_DEDUPE_MS) {
        return {
          partnerId: partner.partner_id,
          code,
          clickId: existing.clickId,
          reused: true,
        };
      }
    }

    const { data: click, error: clickError } = await admin
      .from("referral_clicks")
      .insert({
        partner_id: partner.partner_id,
        referral_code: code,
        landing_path: input.landingPath,
        utm_source: input.utm[UTM_STORED_KEYS[0]] ?? null,
        utm_medium: input.utm[UTM_STORED_KEYS[1]] ?? null,
        utm_campaign: input.utm[UTM_STORED_KEYS[2]] ?? null,
      })
      .select("id")
      .single();

    if (clickError) {
      // The redirect still works without a click row; attribution just has no
      // click id to point at.
      console.error("[referral] click insert failed:", clickError.message);
      return { partnerId: partner.partner_id, code, clickId: null, reused: false };
    }

    return {
      partnerId: partner.partner_id,
      code,
      clickId: click?.id ?? null,
      reused: false,
    };
  } catch (error) {
    console.error("[referral] click recording failed:", error);
    return null;
  }
}

export type LeadAttributionInput = {
  name: string;
  email: string;
  messenger: string;
  company: string;
  scenario: string;
  message?: string | null;
  landingPath?: string | null;
};

export type LeadAttributionResult = {
  /** 'referral' when a valid cookie was present, otherwise 'direct'. */
  source: "referral" | "direct";
  partnerId: string | null;
  leadId: string | null;
};

/**
 * Records a contact submission as a Lead, attributed when the visitor carried
 * a valid referral cookie.
 *
 * This is deliberately additive: `/api/contact` keeps its existing email /
 * webhook delivery untouched and calls this alongside it. A lead row is
 * written even when no referral is present (`referral_source = 'direct'`), so
 * the table is a complete record rather than a referrals-only subset.
 */
export async function attributeContactLead(
  input: LeadAttributionInput,
): Promise<LeadAttributionResult> {
  const unattributed: LeadAttributionResult = {
    source: "direct",
    partnerId: null,
    leadId: null,
  };

  if (!isReferralTrackingEnabled()) return unattributed;

  try {
    const admin = createSupabaseAdminClient();
    const attribution = await readReferralAttribution();

    let partnerId: string | null = null;
    let referralCode: string | null = null;
    let clickId: string | null = null;
    let source: "referral" | "direct" = "direct";

    if (attribution) {
      // Re-validated against the database: the cookie proves the visitor
      // followed a link, the table proves the code still exists and is active.
      const { data: partner, error } = await admin
        .from("partner_profiles")
        .select("partner_id, status")
        .eq("referral_code", attribution.code)
        .maybeSingle();

      if (error) {
        console.error(
          "[referral] could not re-validate the referral code:",
          error.message,
        );
      }

      if (partner && partner.status !== "suspended") {
        partnerId = partner.partner_id;
        referralCode = attribution.code;
        // The click id is trustworthy as-is: it travels in the same
        // HMAC-signed cookie as the code, and that cookie is only ever
        // produced by /go after resolving the code to this same partner. A
        // forged cookie fails signature verification before this point.
        clickId = attribution.clickId;
        source = "referral";
      }
    }

    const { data, error } = await admin
      .from("leads")
      .insert({
        partner_id: partnerId,
        referral_code: referralCode,
        referral_source: source,
        referral_click_id: clickId,
        name: input.name,
        email: input.email,
        messenger: input.messenger,
        company: input.company,
        scenario: input.scenario,
        message: input.message ?? null,
        landing_path: input.landingPath ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[referral] lead insert failed:", error.message);
      return unattributed;
    }

    return { source, partnerId, leadId: data?.id ?? null };
  } catch (error) {
    // Never propagate: the contact form's delivery contract is unchanged.
    console.error("[referral] lead attribution failed:", error);
    return unattributed;
  }
}

export type SignupAttributionStatus =
  | "attributed"
  | "already_attributed"
  | "invalid_code"
  | "self_referral"
  | "no_target"
  | "stale_target"
  | "invalid_click"
  | "no_referral"
  | "tracking_disabled"
  | "error";

/**
 * Attributes a newly provisioned partner to their referral cookie.
 *
 * Called by the signup Server Action — and only there. The sponsor edge is
 * created by `public.attribute_partner_signup()`, which is executable by the
 * service role alone, so a partner can never set or change a sponsor from the
 * client and a raw GoTrue signup (bypassing the app) simply gets no sponsor.
 *
 * `activePartnerCode` is the referral code of the account that was already
 * signed in, when there was one: signing up a second account through your own
 * link is self-referral, and that is visible server-side before the database
 * ever sees the request.
 */
export async function attributePartnerSignup(input: {
  userId: string;
  activePartnerCode?: string | null;
}): Promise<SignupAttributionStatus> {
  if (!isReferralTrackingEnabled()) return "tracking_disabled";

  const attribution = await readReferralAttribution();
  if (!attribution) return "no_referral";

  if (input.activePartnerCode && input.activePartnerCode === attribution.code) {
    console.warn(
      "[referral] self-referral blocked: the signup carries the referral code of the signed-in account",
    );
    return "self_referral";
  }

  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin.rpc("attribute_partner_signup", {
      p_partner_user_id: input.userId,
      p_referral_code: attribution.code,
      p_click_id: attribution.clickId,
    });

    if (error) {
      console.error("[referral] partner signup attribution failed:", error.message);
      return "error";
    }

    return (data as SignupAttributionStatus | null) ?? "error";
  } catch (error) {
    console.error("[referral] partner signup attribution crashed:", error);
    return "error";
  }
}
