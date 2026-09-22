import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PartnerReferralStats } from "@/lib/partner/format";
import type {
  PartnerProfileRow,
  PartnerRelationshipRow,
  PartnerStatusHistoryRow,
  ProfileRow,
} from "@/lib/supabase/database.types";
import { loginHref } from "./redirects";
import type { AppRole } from "./roles";

/**
 * The Data Access Layer.
 *
 * Every server-side authorization decision in the Partner Platform goes
 * through this module. Three properties matter:
 *
 *   1. It runs on the server only (`server-only`), so a client component
 *      cannot import it and quietly become the security boundary.
 *   2. It reads through the *user's* Supabase client, so RLS is a second,
 *      independent gate behind every query. Even a bug here cannot hand a
 *      partner another partner's rows.
 *   3. It fails closed. A missing session, an unreadable role set or a failed
 *      token verification all resolve to "no access" rather than "assume
 *      allowed".
 *
 * `cache()` memoizes per React render pass, so a layout and a page can both
 * call requireAdmin() without paying for a second JWT verification.
 */

export type AuthContext = {
  userId: string;
  email: string | null;
  roles: AppRole[];
  isAdmin: boolean;
  isPartner: boolean;
};

export type PartnerAccount = {
  partner: PartnerProfileRow;
  /** Null only if provisioning was interrupted; the UI degrades to "—". */
  profile: ProfileRow | null;
  /** The canonical sponsor edge for this partner (they are the downline side). */
  sponsor: PartnerRelationshipRow | null;
  /** Most recent status transitions, newest first. */
  history: PartnerStatusHistoryRow[];
};

const HISTORY_LIMIT = 20;

/**
 * Verifies the caller's JWT and resolves their application roles.
 * Returns null for anonymous visitors and for an unconfigured project.
 */
export const getAuthContext = cache(async (): Promise<AuthContext | null> => {
  // Read the request cookie jar before anything else.
  //
  // This is not a redundant read — it is what makes every gated route
  // request-time BY CONSTRUCTION. `cookies()` is a Request-time API, so its
  // use here stops Next.js prerendering the platform subtree at build time.
  // Without it, the early `!isSupabaseConfigured()` return below would let a
  // build with no Supabase environment bake a build-time auth answer into
  // static HTML — a shell that must never be cached or shared.
  await cookies();

  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data) return null;

  const userId = data.claims.sub;
  if (typeof userId !== "string" || userId.length === 0) return null;

  const email =
    typeof data.claims.email === "string" && data.claims.email.length > 0
      ? data.claims.email
      : null;

  // RLS lets a user read their own role rows and nothing else.
  const { data: roleRows, error: rolesError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  if (rolesError) {
    console.error("[auth] could not read user_roles:", rolesError.message);
    // Fail closed: no trustworthy role set means no privileged access.
    return { userId, email, roles: [], isAdmin: false, isPartner: false };
  }

  const roles = (roleRows ?? []).map((row) => row.role);

  return {
    userId,
    email,
    roles,
    isAdmin: roles.includes("admin"),
    isPartner: roles.includes("partner"),
  };
});

/**
 * Loads the caller's own partner record. Returns null when the caller has no
 * partner profile (not a partner, or provisioning was interrupted).
 */
export const getPartnerAccount = cache(
  async (): Promise<PartnerAccount | null> => {
    const auth = await getAuthContext();
    if (!auth) return null;

    const supabase = await createSupabaseServerClient();

    const { data: partner, error: partnerError } = await supabase
      .from("partner_profiles")
      .select("*")
      .eq("user_id", auth.userId)
      .maybeSingle();

    if (partnerError) {
      console.error(
        "[partner] could not read partner_profiles:",
        partnerError.message,
      );
      return null;
    }
    if (!partner) return null;

    const [profileResult, sponsorResult, historyResult] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", auth.userId).maybeSingle(),
      // The row naming this partner as the downline side — their sponsor.
      supabase
        .from("partner_relationships")
        .select("*")
        .eq("partner_id", partner.partner_id)
        .maybeSingle(),
      supabase
        .from("partner_status_history")
        .select("*")
        .eq("partner_id", partner.partner_id)
        .order("created_at", { ascending: false })
        .limit(HISTORY_LIMIT),
    ]);

    if (profileResult.error) {
      console.error("[partner] could not read profiles:", profileResult.error.message);
    }
    if (sponsorResult.error) {
      console.error(
        "[partner] could not read sponsor edge:",
        sponsorResult.error.message,
      );
    }
    if (historyResult.error) {
      console.error(
        "[partner] could not read status history:",
        historyResult.error.message,
      );
    }

    return {
      partner,
      profile: profileResult.data ?? null,
      sponsor: sponsorResult.data ?? null,
      history: historyResult.data ?? [],
    };
  },
);

/**
 * A metric the platform genuinely does not have yet is `null`, rendered as
 * `—`. It must never collapse to 0, which would read as a real zero.
 */
const NO_REFERRAL_STATS: PartnerReferralStats = {
  clicks: null,
  leads: null,
  partnerSignups: null,
};

/**
 * Referral counters for the calling partner.
 *
 * Read through `public.partner_referral_stats()`, a SECURITY DEFINER rollup
 * that returns COUNTS ONLY. That is deliberate: Phase 4A decided a sponsor
 * must not be able to enumerate their downline, and the referral tables have
 * no sponsor-visible rows either, so the dashboard gets real figures without
 * a row-level view of anyone's network.
 */
export const getPartnerReferralStats = cache(
  async (): Promise<PartnerReferralStats> => {
    const auth = await getAuthContext();
    if (!auth?.isPartner) return NO_REFERRAL_STATS;

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("partner_referral_stats");

    if (error) {
      // Most likely cause before the Phase 4B migration is applied: the
      // function does not exist. The dashboard degrades to dashes.
      console.error("[partner] referral stats failed:", error.message);
      return NO_REFERRAL_STATS;
    }

    const row = Array.isArray(data) ? data[0] : data;
    if (!row) return NO_REFERRAL_STATS;

    const toCount = (value: unknown): number | null => {
      if (value === null || value === undefined) return null;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    };

    return {
      clicks: toCount(row.clicks),
      leads: toCount(row.leads),
      partnerSignups: toCount(row.partner_signups),
    };
  },
);

/**
 * Requires a verified session. Sends anonymous visitors to the login page with
 * the requested path preserved.
 */
export async function requireUser(nextPath: string): Promise<AuthContext> {
  const auth = await getAuthContext();
  if (!auth) redirect(loginHref(nextPath));
  return auth;
}

/**
 * Requires the admin role. A signed-in non-admin is sent back to their own
 * dashboard rather than shown an admin shell they cannot use.
 */
export async function requireAdmin(nextPath: string): Promise<AuthContext> {
  const auth = await requireUser(nextPath);
  if (!auth.isAdmin) redirect("/partner/dashboard");
  return auth;
}

export type PartnerSession = {
  auth: AuthContext;
  account: PartnerAccount;
};

/**
 * Requires a verified session AND a provisioned partner record.
 *
 * Both the layout and each page call this: a layout check renders the shell,
 * but per the Next.js security guidance a layout does not stop nested route
 * segments from rendering, so the check must also sit next to the data.
 */
export async function requirePartner(nextPath: string): Promise<PartnerSession> {
  const auth = await requireUser(nextPath);
  const account = await getPartnerAccount();

  if (!account) {
    // Signed in but not provisioned as a partner. An admin still has a home;
    // anyone else gets an explanation instead of a redirect loop.
    redirect(auth.isAdmin ? "/admin" : "/partner/no-access");
  }

  return { auth, account };
}

export type AdminOverview = {
  partners: number | null;
  people: number | null;
  sponsorEdges: number | null;
  statusChanges: number | null;
};

const EMPTY_OVERVIEW: AdminOverview = {
  partners: null,
  people: null,
  sponsorEdges: null,
  statusChanges: null,
};

/**
 * Console-level row counts.
 *
 * These are real values read through the admin's own session, which is also
 * the visible proof that the admin RLS policies grant full access. A failed
 * count stays `null` (rendered as `NO_DATA`) rather than collapsing to 0, so a
 * broken read can never masquerade as "no partners".
 */
export const getAdminOverview = cache(async (): Promise<AdminOverview> => {
  const auth = await getAuthContext();
  if (!auth?.isAdmin) return EMPTY_OVERVIEW;

  const supabase = await createSupabaseServerClient();

  const [partners, people, sponsorEdges, statusChanges] = await Promise.all([
    supabase.from("partner_profiles").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase
      .from("partner_relationships")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("partner_status_history")
      .select("id", { count: "exact", head: true }),
  ]);

  const results = [
    ["partner_profiles", partners],
    ["profiles", people],
    ["partner_relationships", sponsorEdges],
    ["partner_status_history", statusChanges],
  ] as const;

  for (const [table, result] of results) {
    if (result.error) {
      console.error(`[admin] count failed for ${table}:`, result.error.message);
    }
  }

  return {
    partners: partners.count ?? null,
    people: people.count ?? null,
    sponsorEdges: sponsorEdges.count ?? null,
    statusChanges: statusChanges.count ?? null,
  };
});
