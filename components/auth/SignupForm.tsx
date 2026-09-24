"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInWithGoogle, signUpWithPassword } from "@/app/auth/actions";
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

function GoogleFeedback({ state }: { state: AuthActionState }) {
  if (state.status === "idle" || state.form !== "google" || !state.message) {
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

export function SignupForm({
  next,
  disabled,
}: {
  next: string;
  disabled: boolean;
}) {
  const [state, action, pending] = useActionState(
    signUpWithPassword,
    idleAuthState,
  );
  const [googleState, googleAction, googlePending] = useActionState(
    signInWithGoogle,
    idleAuthState,
  );

  const failed = state.status === "error";
  const sent = state.status === "sent";

  return (
    <div className="grid gap-6">
      {/*
        The existing Google action, not a second OAuth flow. It posts `next`
        and, when a referral cookie is present, sends `ref=1` to /auth/callback.
        Supabase creates the partner on the first round trip; a later one is a
        normal sign-in. A disabled provider returns that action's own message.
      */}
      <form action={googleAction} className="grid gap-3">
        <input type="hidden" name="next" value={next} />

        <button
          type="submit"
          className={outlineButtonClass}
          disabled={disabled || googlePending || pending}
        >
          <GoogleMark />
          {googlePending ? "Opening Google…" : "Continue with Google"}
        </button>

        <GoogleFeedback state={googleState} />
      </form>

      <div className="flex items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-line" />
        <span className="text-[11px] tracking-[0.2em] text-muted uppercase">
          or
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form action={action} className="grid gap-4">
        <input type="hidden" name="next" value={next} />

        <label className={labelClass}>
          <span className="text-muted">Full name</span>
          <input
            className={fieldClass}
            type="text"
            name="full_name"
            autoComplete="name"
            maxLength={120}
            required
            disabled={disabled}
            placeholder="Alex Morgan"
          />
        </label>

        <label className={labelClass}>
          <span className="text-muted">Email</span>
          <input
            className={fieldClass}
            type="email"
            name="email"
            autoComplete="email"
            maxLength={320}
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
            autoComplete="new-password"
            minLength={8}
            required
            disabled={disabled}
            placeholder="At least 8 characters"
          />
        </label>

        {state.status !== "idle" && state.message ? (
          <p
            role={failed ? "alert" : "status"}
            aria-live="polite"
            className={failed ? noticeErrorClass : noticeSuccessClass}
          >
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          className={primaryButtonClass}
          disabled={disabled || pending || sent || googlePending}
        >
          {pending ? "Creating account…" : "Create partner account"}
        </button>

        <p className="text-xs text-muted">
          Already have an account?{" "}
          <Link
            href={`/auth/login?next=${encodeURIComponent(next)}`}
            className="link-underline text-paper"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
