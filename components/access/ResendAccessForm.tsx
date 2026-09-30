"use client";

import { useState } from "react";

export type ResendCopy = { title: string; lead: string; label: string; submit: string; sent: string; error: string };

export function ResendAccessForm({ locale, initialEmail, t }: { locale: string; initialEmail: string; t: ResendCopy }) {
  const [email, setEmail] = useState(initialEmail);
  const [state, setState] = useState<"idle" | "busy" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch("/api/access/resend", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") return <p role="status" className="mt-6 text-sm">{t.sent}</p>;
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      <label className="block text-sm" htmlFor="access-email">{t.label}</label>
      <input
        id="access-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-md border border-line bg-transparent px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={state === "busy"}
        className="rounded-md bg-mark px-4 py-2 text-sm font-semibold text-ink disabled:opacity-60"
      >
        {t.submit}
      </button>
      {state === "error" ? <p role="alert" className="text-sm text-red-400">{t.error}</p> : null}
    </form>
  );
}
