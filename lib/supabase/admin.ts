import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export type SupabaseAdminClient = ReturnType<typeof createSupabaseAdminClient>;

/**
 * Elevated client built with the Supabase SECRET key (`sb_secret_…`).
 *
 * It resolves to the Postgres `service_role`, which carries BYPASSRLS: it skips
 * every policy in `supabase/migrations/20260922090400_phase4a_rls.sql`. Treat
 * it as the master key for this project's data.
 *
 * Two independent guards keep it away from users:
 *   1. `server-only` above — importing this module from a client component is a
 *      build error, not a leaked key.
 *   2. Supabase itself rejects a secret key sent from a browser (it checks the
 *      User-Agent and answers HTTP 401), so a leak by some other route still
 *      does not work from a visitor's device.
 *
 * Rules for using it:
 *   * Server Actions, Route Handlers or scripts only — never hand the client,
 *     or its key, to a client component;
 *   * prefer `createSupabaseServerClient()`: an admin *session* already passes
 *     the admin RLS policies, so RLS keeps protecting you;
 *   * reach for this only for work that legitimately cannot run as a user
 *     (operator bootstrap, backfills, attribution jobs in later phases).
 *
 * Phase 4A does not call it in application code. It exists so the next phase
 * has exactly one sanctioned, documented path to elevated access instead of
 * hand-rolling one.
 */
export function createSupabaseAdminClient() {
  // SUPABASE_URL is the server-only name from the Supabase docs; fall back to
  // the public one so a deployment only has to set it once.
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "The Supabase admin client needs SUPABASE_SECRET_KEY plus SUPABASE_URL " +
        "(or NEXT_PUBLIC_SUPABASE_URL). The secret key bypasses Row Level " +
        "Security, so it must only ever be set on the server — see .env.example.",
    );
  }

  if (secretKey.startsWith("sb_publishable_")) {
    throw new Error(
      "SUPABASE_SECRET_KEY holds a publishable key (sb_publishable_…). Elevated " +
        "work would fail against RLS instead of bypassing it; set the " +
        "sb_secret_… key from the Supabase dashboard.",
    );
  }

  return createClient<Database>(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
