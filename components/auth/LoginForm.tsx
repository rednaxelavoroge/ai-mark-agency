"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  sendMagicLink,
  signInWithGoogle,
  signInWithPassword,
} from "@/app/auth/actions";
import {
  idleAuthState,
  type AuthActionState,
} from "@/lib/auth/action-state";
import {
  fieldClass,
  labelClass,
  noticeErrorClass,
  noticeSuccessClass,
  outlineButtonClass,
  primaryButtonClass,
} from "@/components/ui/classes";

/**
 * Google's official four-colour "G", the mark Google requires next to a
 * "Continue with Google" action. Decorative, so it is hidden from assistive
 * tech — the button's own label carries the meaning.
 */
function GoogleMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 48 48"
      aria-hidden
      focusable="false"
      className="shrink-0"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59A14.4 14.4 0 0 1 9.77 24c0-1.6.27-3.14.76-4.59l-7.97-6.19A23.94 23.94 0 0 0 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  );
}

function Feedback({
  state,
  form,
}: {
  state: AuthActionState;
  form: NonNullable<AuthActionState["form"]>;
}) {
  if (state.status === "idle" || state.form !== form || !state.message) {
    return null;
  }

  const failed = state.status === "error";

  return (
    <p
      role={failed ? "alert" : "status"}
      aria-live="polite"
      className={failed ? noticeErrorClass : noticeSuccessClass}
    >
      {state.message}
    </p>
  );
}

export function LoginForm({
  next,
  disabled,
}: {
  next: string;
  disabled: boolean;
}) {
  const [passwordState, passwordAction, passwordPending] = useActionState(
    signInWithPassword,
    idleAuthState,
  );
  const [googleState, googleAction, googlePending] = useActionState(
    signInWithGoogle,
    idleAuthState,
  );
  const [magicState, magicAction, magicPending] = useActionState(
    sendMagicLink,
    idleAuthState,
  );

  return (
    <div className="grid gap-6">
      <form action={passwordAction} className="grid gap-4">
        <input type="hidden" name="next" value={next} />

        <label className={labelClass}>
          <span className="text-muted">Email</span>
          <input
            className={fieldClass}
            type="email"
            name="email"
            autoComplete="email"
            required
            disabled={disabled}
            placeholder="you@company.com"
          />
        </label>

        <label className={labelClass}>
          <span className="text-muted">Password</span>
          <input
            className={fieldClass}
            type="password"
            name="password"
            autoComplete="current-password"
            required
            disabled={disabled}
            placeholder="••••••••"
          />
        </label>

        <Feedback state={passwordState} form="password" />

        <button
          type="submit"
          className={primaryButtonClass}
          disabled={disabled || passwordPending}
        >
          {passwordPending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="flex items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-line" />
        <span className="text-[11px] tracking-[0.2em] text-muted uppercase">
          or
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      {/*
        Google is additive: it sits beside email + password and the magic link,
        and Supabase creates the account on the first round trip, so this one
        button covers both Google sign-in and Google sign-up.
      */}
      <form action={googleAction} className="grid gap-3">
        <input type="hidden" name="next" value={next} />

        <button
          type="submit"
          className={outlineButtonClass}
          disabled={disabled || googlePending}
        >
          <GoogleMark />
          {googlePending ? "Opening Google…" : "Continue with Google"}
        </button>

        <Feedback state={googleState} form="google" />
      </form>

      <form action={magicAction} className="grid gap-4">
        <input type="hidden" name="next" value={next} />

        <label className={labelClass}>
          <span className="text-muted">Email me a sign-in link</span>
          <input
            className={fieldClass}
            type="email"
            name="email"
            autoComplete="email"
            required
            disabled={disabled}
            placeholder="you@company.com"
          />
        </label>

        <Feedback state={magicState} form="magic" />

        <button
          type="submit"
          className={outlineButtonClass}
          disabled={disabled || magicPending}
        >
          {magicPending ? "Sending…" : "Send magic link"}
        </button>
      </form>

      <p className="text-xs text-muted">
        No account yet?{" "}
        <Link
          href={`/auth/signup?next=${encodeURIComponent(next)}`}
          className="link-underline text-paper"
        >
          Create a partner account
        </Link>
      </p>
    </div>
  );
}
