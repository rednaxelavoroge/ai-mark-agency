"use client";

import { useState } from "react";
import type { Copy } from "@/content/copy";

type Status = "idle" | "sending" | "success" | "error";

const LOCKED_SCENARIOS = new Set(["aime", "assistant", "showroom"]);

export function ContactForm({
  t,
  scenario: lockedScenario,
}: {
  t: Copy["contact"];
  /** Product pages lock the scenario. The visitor does not choose a rate or a partner. */
  scenario?: "aime" | "assistant" | "showroom";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [scenario, setScenario] = useState("");
  const fixedScenario =
    lockedScenario && LOCKED_SCENARIOS.has(lockedScenario) ? lockedScenario : "";

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
          scenario: fixedScenario || data.get("scenario"),
          website: data.get("website"),
          landing_path: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      form.reset();
      setScenario("");
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
      {fixedScenario ? (
        <input type="hidden" name="scenario" value={fixedScenario} />
      ) : (
        <fieldset>
          <legend className="mb-3 text-sm">{t.scenario}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {t.scenarioOptions.map((opt) => {
              const active = scenario === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`cursor-pointer rounded-xl border p-4 transition-colors ${
                    active ? "border-mark bg-ink-3" : "border-line bg-ink-2 hover:border-paper/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="scenario"
                    value={opt.value}
                    required
                    className="sr-only"
                    checked={scenario === opt.value}
                    onChange={() => setScenario(opt.value)}
                  />
                  <span className="block text-sm font-medium">{opt.label}</span>
                  <span className="mt-1 block text-xs text-muted">{opt.hint}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}
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
        <p className="text-sm text-red-700">{t.error}</p>
      ) : null}
      <p className="text-xs text-muted">{t.privacy}</p>
    </form>
  );
}
