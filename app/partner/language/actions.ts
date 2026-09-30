"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getAuthContext } from "@/lib/auth/dal";
import {
  EXPLICIT_LOCALE_SOURCE,
  LOCALE_COOKIE,
  LOCALE_SOURCE_COOKIE,
} from "@/lib/locale-negotiate";
import { isLocale } from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Cabinet language selector. Stores the choice as an explicit site locale
 * cookie (so the public site follows it too) and, when signed in, on the
 * partner's own profile row (RLS: profiles_update_own_or_admin), which also
 * drives the language of partner emails.
 */
export async function setCabinetLanguage(formData: FormData): Promise<void> {
  const raw = formData.get("locale");
  if (typeof raw !== "string" || !isLocale(raw)) return;

  const store = await cookies();
  const opts = { path: "/", maxAge: ONE_YEAR, sameSite: "lax" as const };
  store.set(LOCALE_COOKIE, raw, opts);
  store.set(LOCALE_SOURCE_COOKIE, EXPLICIT_LOCALE_SOURCE, opts);

  const auth = await getAuthContext();
  if (auth) {
    const supabase = await createSupabaseServerClient();
    await supabase.from("profiles").update({ language: raw }).eq("id", auth.userId);
  }

  revalidatePath("/partner", "layout");
  revalidatePath("/admin", "layout");
}
