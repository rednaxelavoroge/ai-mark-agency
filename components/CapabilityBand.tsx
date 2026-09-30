import type { Locale } from "@/lib/site";
import { getPublicChromeCopy } from "@/content/sections";

export function CapabilityBand({ locale }: { locale: Locale }) {
  const c = getPublicChromeCopy(locale).capabilityBand;
  return (
    <section aria-label={c.ariaLabel} className="relative border-y border-line bg-ink-2/40">
      <div aria-hidden className="grid-field pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-mark">{c.eyebrow}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {c.groups.map((group) => (
            <div key={group.label} className="rounded-xl border border-line bg-ink-2/80 p-4">
              <p className="font-display text-sm font-semibold text-paper">{group.label}</p>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted">{c.footnote}</p>
      </div>
    </section>
  );
}
