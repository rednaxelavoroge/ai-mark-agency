import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import { requireSupabaseConfig } from "./config";
import type { Database } from "./database.types";

export type SupabaseServerClient = Awaited<
  ReturnType<typeof createSupabaseServerClient>
>;

/**
 * Request-scoped Supabase client for Server Components, Server Actions and
 * Route Handlers.
 *
 * Never share the returned client across requests — it is bound to this
 * request's cookie jar. It uses the publishable (anon) key on purpose: the
 * caller's access token travels in the auth cookies, so every query this
 * client makes is still subject to Row Level Security.
 *
 * Cookie writes succeed in Server Actions and Route Handlers and throw in
 * Server Components; that throw is swallowed because session refresh is owned
 * by `proxy.ts` (see lib/supabase/proxy.ts).
 */
export const createSupabaseServerClient = cache(async function createSupabaseServerClient() {
  const { url, key } = requireSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Components cannot write cookies. Refreshing is proxy.ts's
          // job, so this expected failure is safe to ignore.
        }
      },
    },
  });
});
