/**
 * State returned by the auth Server Actions to `useActionState`.
 *
 * Kept out of `app/auth/actions.ts` because every export of a `"use server"`
 * module must be an async function.
 */

export type AuthFormKind = "password" | "magic" | "signup" | "google";

export type AuthActionState = {
  status: "idle" | "error" | "sent";
  message?: string;
  /** Identifies which form produced this state, so each form shows only its own. */
  form?: AuthFormKind;
};

export const idleAuthState: AuthActionState = { status: "idle" };
