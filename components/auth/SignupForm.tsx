"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpWithPassword } from "@/app/auth/actions";
import { idleAuthState } from "@/lib/auth/action-state";
import {
  fieldClass,
  labelClass,
  noticeErrorClass,
  noticeSuccessClass,
  primaryButtonClass,
} from "@/components/ui/classes";

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

  const failed = state.status === "error";
  const sent = state.status === "sent";

  return (
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
        disabled={disabled || pending || sent}
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
  );
}
