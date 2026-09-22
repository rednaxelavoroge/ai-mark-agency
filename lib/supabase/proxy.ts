/**
 * Supabase session refresh for `proxy.ts`.
 *
 * Deliberately NOT `server-only`: proxy.ts is bundled for its own runtime
 * rather than the React Server Components layer, where importing the
 * `server-only` marker resolves to a module that throws.
 *
 * This module never imports the service-role key — only the publishable
 * configuration.
 */
import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";
import {
  isSupabaseConfigured,
  supabasePublishableKey,
  supabaseUrl,
} from "./config";

export type ResponseBuilder = () => NextResponse;

export type RefreshedSession = {
  response: NextResponse;
  userId: string | null;
};

/**
 * True when the request carries a Supabase auth cookie.
 *
 * The default storage key is `sb-<project-ref>-auth-token`, with `.0`, `.1`…
 * suffixes when the token is chunked. Without this guard every anonymous visit
 * to the public marketing site would trigger a JWT verification against the
 * Auth server. Anonymous visitors simply have no session to refresh.
 */
export function hasSupabaseSessionCookie(request: NextRequest): boolean {
  return request.cookies
    .getAll()
    .some((cookie) => cookie.name.includes("-auth-token"));
}

/**
 * Refreshes the caller's Supabase session and writes the resulting cookies to
 * the response.
 *
 * `build` is invoked again whenever the client writes cookies, because
 * NextResponse captures request headers at construction time: rebuilding from
 * the mutated request is what lets the refreshed token reach the render, and
 * re-applying the cookies to the fresh response is what persists it.
 */
export async function refreshSession(
  request: NextRequest,
  build: ResponseBuilder,
): Promise<RefreshedSession> {
  if (!isSupabaseConfigured() || !hasSupabaseSessionCookie(request)) {
    return { response: build(), userId: null };
  }

  let response = build();

  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }

        response = build();

        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
        // CDN/reverse-proxy safety headers supplied by the library.
        for (const [key, value] of Object.entries(headers)) {
          response.headers.set(key, value);
        }
      },
    },
  });

  // getClaims() verifies the JWT and refreshes the session when the access
  // token is close to expiry.
  const { data, error } = await supabase.auth.getClaims();
  if (error) {
    return { response, userId: null };
  }

  return { response, userId: data?.claims.sub ?? null };
}
