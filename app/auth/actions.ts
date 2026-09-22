"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthActionState } from "@/lib/auth/action-state";
import { safeNextPath } from "@/lib/auth/redirects";
import { site } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase/config";
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

async function callbackUrl(next: string): Promise<string> {
  const origin = await currentOrigin();
  return `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
}

function notConfigured(form: AuthActionState["form"]): AuthActionState {
  return { status: "error", message: NOT_CONFIGURED, form };
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
      emailRedirectTo: await callbackUrl(next),
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
      data: { full_name: fullName },
      emailRedirectTo: await callbackUrl(next),
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

  if (data.session) {
    // Email confirmation is switched off for this project, so the account is
    // already usable and the trigger has provisioned the partner record.
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
