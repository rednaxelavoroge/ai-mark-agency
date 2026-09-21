"use client";

import { useState } from "react";
import type { Copy } from "@/content/copy";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ t }: { t: Copy["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          messenger: data.get("messenger"),
          company: data.get("company"),
          budget: data.get("budget"),
          website: data.get("website"),
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-md border border-line bg-ink-2 px-3 py-2.5 text-sm text-paper outline-none placeholder:text-muted/70 focus:border-mark";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="hidden" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="grid gap-1.5 text-sm">
        {t.name}
        <input name="name" required maxLength={120} className={field} />
      </label>
      <label className="grid gap-1.5 text-sm">
        {t.email}
        <input name="email" type="email" required maxLength={200} className={field} />
      </label>
      <label className="grid gap-1.5 text-sm">
        {t.messenger}
        <input
          name="messenger"
          required
          maxLength={120}
          placeholder={t.messengerHint}
          className={field}
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        {t.company}
        <input name="company" required maxLength={160} className={field} />
      </label>
      <label className="grid gap-1.5 text-sm">
        {t.budget}
        <select name="budget" required defaultValue="" className={field}>
          <option value="" disabled>
            —
          </option>
          {t.budgetOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 rounded-full bg-mark px-5 py-3 text-sm font-semibold text-mark-ink disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>
      {status === "success" ? (
        <p className="text-sm text-mark">{t.success}</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-300">{t.error}</p>
      ) : null}
      <p className="text-xs text-muted">{t.privacy}</p>
    </form>
  );
}
