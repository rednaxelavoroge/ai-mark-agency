"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthActionState } from "@/lib/auth/action-state";
import { getPartnerAccount } from "@/lib/auth/dal";
import { safeNextPath } from "@/lib/auth/redirects";
import {
  attributePartnerSignup,
  readReferralAttribution,
  type SignupAttributionStatus,
} from "@/lib/referral/attribution";
import { site } from "@/lib/site";
import {
  isSupabaseConfigured,
  supabasePublishableKey,
  supabaseUrl,
} from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Authentication Server Actions.
 *
 * All credential handling happens here, on the server: the browser never talks
 * to Supabase Auth directly and never sees anything but the publishable key.
 * Server Actions are public endpoints, so each one validates its own input
 * rather than trusting the form that called it.
 */

const NOT_CONFIGURED =
  "The Partner Platform is not connected to Supabase yet. Set " +
  "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, then " +
  "restart the server.";

/**
 * Deliberately vague: distinguishing "no such account" from "wrong password"
 * would let the login form enumerate who has an account.
 */
const CREDENTIALS_ERROR =
  "That email and password did not match an account.";

/**
 * Google is an ADDITIONAL way in, never a replacement: the provider is
 * configured in the Supabase dashboard, so it can legitimately be off while
 * the rest of the platform is live.
 */
const GOOGLE_DISABLED_ERROR =
  "Google sign-in is not switched on for this project yet. Use your email and " +
  "password, or ask for a magic link.";

const GOOGLE_ERROR =
  "We could not reach Google just now. Use your email and password, or try again.";

function readString(formData: FormData, key: string, maxLength = 320): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function readEmail(formData: FormData): string {
  return readString(formData, "email", 320).toLowerCase();
}

/**
 * The origin to send Supabase back to after an email link. Derived from the
 * request so local development works, rather than hardcoding production.
 */
async function currentOrigin(): Promise<string> {
  const headerList = await headers();

  const origin = headerList.get("origin");
  if (origin) return origin;

  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  if (!host) return site.url;

  const protocol = headerList.get("x-forwarded-proto") ?? "https";
  return `${protocol}://${host}`;
}

/**
 * Where an email link sends the visitor back to.
 *
 * `carriesReferral` adds `ref=1` when the visitor arrived through a referral
 * link, so /auth/callback knows it may attempt partner attribution. It is only
 * a hint: the callback re-reads the signed cookie, and the database refuses to
 * attribute an account that was not created moments ago.
 */
async function callbackUrl(next: string, carriesReferral = false): Promise<string> {
  const origin = await currentOrigin();
  const params = new URLSearchParams({ next });
  if (carriesReferral) params.set("ref", "1");
  return `${origin}/auth/callback?${params.toString()}`;
}

function notConfigured(form: AuthActionState["form"]): AuthActionState {
  return { status: "error", message: NOT_CONFIGURED, form };
}

/**
 * Whether the Supabase project currently has the Google provider switched on.
 *
 * `signInWithOAuth` builds the `/authorize` URL locally and never calls the
 * Auth server, so it cannot report a disabled provider: the visitor would be
 * sent to a raw GoTrue JSON error page. This reads Supabase's own public
 * `/auth/v1/settings` first and turns that dead end into an inline message.
 *
 * Best effort on purpose — an unreachable settings endpoint must not block a
 * sign-in that would otherwise work, so any failure here reports "enabled" and
 * lets the provider itself be the source of truth.
 */
async function isGoogleProviderEnabled(): Promise<boolean> {
  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
      headers: { apikey: supabasePublishableKey },
      cache: "no-store",
    });

    if (!response.ok) return true;

    const settings = (await response.json()) as {
      external?: Record<string, boolean>;
    };

    return settings.external?.google !== false;
  } catch (error) {
    console.warn("[auth] could not read the Supabase auth settings:", error);
    return true;
  }
}

/**
 * The referral code of the account that is ALREADY signed in, when there is
 * one.
 *
 * Used to reject self-referral: signing up a second account through your own
 * referral link would otherwise let a partner sponsor themselves. The extra
 * Auth round trip is only paid when the visitor actually carries a referral
 * cookie, which is also the only case in which self-referral is possible.
 */
async function activePartnerCode(): Promise<string | null> {
  const attribution = await readReferralAttribution();
  if (!attribution) return null;

  const account = await getPartnerAccount();
  return account?.partner.referral_code ?? null;
}

/**
 * Server-side referral attribution for a brand new partner.
 *
 * The sponsor edge is created by `public.attribute_partner_signup()`, which
 * only the service role may execute, so this is the one and only code path
 * that can set a sponsor from a referral. It never throws and never changes
 * what the signup returns — a failed attribution is a log line, not a broken
 * registration.
 *
 * `identities` is the guard against attributing an *existing* account:
 * Supabase returns an already-registered user (with the same id and an empty
 * `identities` array) when email confirmation is on, and that user must never
 * have a sponsor attached by a stranger's signup attempt.
 */
async function attributeNewPartner(user: {
  id: string;
  identities?: unknown[] | null;
}): Promise<void> {
  const isFreshAccount =
    Array.isArray(user.identities) && user.identities.length > 0;

  if (!isFreshAccount) {
    console.warn(
      "[auth] referral attribution skipped: this signup did not create a new account",
    );
    return;
  }

  const status: SignupAttributionStatus = await attributePartnerSignup({
    userId: user.id,
    activePartnerCode: await activePartnerCode(),
  });

  if (status === "attributed") {
    console.info("[auth] partner attributed to a referral link");
    return;
  }
  if (status === "no_referral" || status === "tracking_disabled") return;

  // Everything else is a rejection worth seeing in the logs: an invalid or
  // suspended sponsor, self-referral, a duplicate edge, or a failed write.
  console.warn(`[auth] referral attribution not applied: ${status}`);
}

/** Email + password sign-in. */
export async function signInWithPassword(
  _previous: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) return notConfigured("password");

  const email = readEmail(formData);
  const password = readString(formData, "password", 200);
  const next = safeNextPath(formData.get("next"));

  if (!email || !password) {
    return {
      status: "error",
      message: "Enter both your email address and your password.",
      form: "password",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("[auth] password sign-in rejected:", error.message);
    return { status: "error", message: CREDENTIALS_ERROR, form: "password" };
  }

  revalidatePath("/", "layout");
  redirect(next);
}

/**
 * Google sign-in and Google sign-up — the same button, because Supabase
 * creates the account on the first successful round trip and signs in on every
 * later one.
 *
 * The provider exchange happens at Supabase (`/auth/v1/authorize?provider=google`),
 * so the browser only ever sees the publishable project URL. The Google client
 * secret never leaves the Supabase dashboard and is never part of this app.
 *
 * `redirectTo` is the ONE existing `/auth/callback`, carrying the same `next`
 * and `ref` parameters as the email flows: the callback exchanges the code,
 * returns the visitor to where they were headed, and runs exactly the same
 * server-side referral attribution. A Google signup through a referral link is
 * therefore attributed identically to an email signup — and the database still
 * refuses to attribute an account that already existed.
 *
 * `prompt=select_account` forces Google's account chooser: a shared machine
 * must not silently sign the next visitor into the previous person's account.
 */
export async function signInWithGoogle(
  _previous: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) return notConfigured("google");

  const next = safeNextPath(formData.get("next"));

  if (!(await isGoogleProviderEnabled())) {
    return {
      status: "error",
      message: GOOGLE_DISABLED_ERROR,
      form: "google",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: await callbackUrl(
        next,
        (await readReferralAttribution()) !== null,
      ),
      queryParams: { prompt: "select_account" },
    },
  });

  if (error || !data?.url) {
    console.error("[auth] Google sign-in could not start:", error?.message);
    return { status: "error", message: GOOGLE_ERROR, form: "google" };
  }

  // The PKCE code verifier was written to a cookie by the call above, so the
  // existing /auth/callback can exchange the `code` Google sends back.
  redirect(data.url);
}

/**
 * Magic-link sign-in. The PKCE code verifier is written to a cookie by the
 * server client, so the link must come back to /auth/callback on this origin.
 */
export async function sendMagicLink(
  _previous: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) return notConfigured("magic");

  const email = readEmail(formData);
  const next = safeNextPath(formData.get("next"));

  if (!email) {
    return {
      status: "error",
      message: "Enter your email address to receive a sign-in link.",
      form: "magic",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // A magic link can CREATE an account (shouldCreateUser), so it is a
      // registration path too — the callback is told to attempt attribution
      // when this visitor arrived through a referral link.
      emailRedirectTo: await callbackUrl(
        next,
        (await readReferralAttribution()) !== null,
      ),
      // Every account is provisioned as a partner (see the migration
      // `handle_new_user`), so the magic link may create the account.
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.error("[auth] magic link could not be sent:", error.message);
    return {
      status: "error",
      message: "We could not send that link. Please try again in a moment.",
      form: "magic",
    };
  }

  return {
    status: "sent",
    message: `If ${email} can receive mail, a sign-in link is on its way.`,
    form: "magic",
  };
}

/** Email + password registration. */
export async function signUpWithPassword(
  _previous: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) return notConfigured("signup");

  const fullName = readString(formData, "full_name", 120);
  const email = readEmail(formData);
  const password = readString(formData, "password", 200);
  const next = safeNextPath(formData.get("next"));

  if (!fullName) {
    return { status: "error", message: "Enter your full name.", form: "signup" };
  }
  if (!email) {
    return {
      status: "error",
      message: "Enter a valid email address.",
      form: "signup",
    };
  }
  if (password.length < 8) {
    return {
      status: "error",
      message: "Choose a password of at least 8 characters.",
      form: "signup",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Consumed by public.handle_new_user() to fill profiles.full_name.
      //
      // NOTE: no sponsor/referral field is ever sent here. Signup metadata is
      // client-supplied (a raw GoTrue signUp can set anything), so attribution
      // is NOT read from it — it comes from the signed first-party cookie and
      // is applied server-side below.
      data: { full_name: fullName },
      // `ref=1` is a hint for the confirmation callback; it is not trusted on
      // its own (see /auth/callback).
      emailRedirectTo: await callbackUrl(
        next,
        (await readReferralAttribution()) !== null,
      ),
    },
  });

  if (error) {
    console.error("[auth] sign-up rejected:", error.message);
    return {
      status: "error",
      message:
        "We could not create that account. It may already exist — try signing in instead.",
      form: "signup",
    };
  }

  // Phase 4B: attribute the new partner to the referral link they followed,
  // server-side. This never throws and never changes the signup outcome.
  if (data.user) await attributeNewPartner(data.user);

  if (data.session) {
    // Email confirmation is switched OFF for this project: the account is
    // already usable and the trigger has provisioned the partner record.
    // When it is switched ON (currently the case in the live project), no
    // session comes back and the account is confirmed through the email link,
    // which lands on /auth/callback — the attribution above has already run by
    // then, and the callback re-checks it.
    revalidatePath("/", "layout");
    redirect(next);
  }

  return {
    status: "sent",
    message:
      "Account created. Check your inbox to confirm your email address, then sign in.",
    form: "signup",
  };
}

/** Ends the session and returns to the login page. */
export async function signOut(): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect("/auth/login?signed_out=1");
}
