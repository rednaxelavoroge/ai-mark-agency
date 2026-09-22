"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendMagicLink, signInWithPassword } from "@/app/auth/actions";
import {
  idleAuthState,
  type AuthActionState,
} from "@/lib/auth/action-state";
import {
  fieldClass,
  labelClass,
  noticeErrorClass,
  noticeSuccessClass,
  primaryButtonClass,
} from "@/components/ui/classes";

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
          className="inline-flex w-full items-center justify-center rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-paper transition-colors hover:border-mark hover:text-mark disabled:cursor-not-allowed disabled:opacity-60"
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
