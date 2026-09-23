import type { Locale } from "@/lib/site";

/**
 * Full-bleed display marquee.
 *
 * A deliberately oversized typographic band that breaks the reading measure of
 * the page: two counter-scrolling rows of capability nouns, alternating solid
 * and outlined letterforms. Purely decorative copy — it names what the studio
 * builds and never claims a client, a metric or a partnership.
 */
const ROWS: Record<string, string[][]> = {
  ru: [
    ["AI-агенты", "SaaS-платформы", "Кабинеты", "E-commerce", "Маркетплейсы"],
    ["RAG-базы знаний", "CRM-контуры", "Аналитика", "Автоматизация", "Дизайн-системы"],
  ],
  en: [
    ["AI agents", "SaaS platforms", "Client portals", "E-commerce", "Marketplaces"],
    ["RAG knowledge", "CRM contours", "Analytics", "Automation", "Design systems"],
  ],
};

function Row({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <div
        className={`marquee-track flex shrink-0 items-center gap-8 pr-8 ${reverse ? "reverse" : ""}`}
      >
        {[...words, ...words].map((word, i) => (
          <span key={`${word}-${i}`} className="flex shrink-0 items-center gap-8">
            <span
              className={
                i % 2 === 0
                  ? "font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl lg:text-5xl"
                  : "text-outline font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
              }
            >
              {word}
            </span>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-warm/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function CapabilityBand({ locale }: { locale: Locale }) {
  const rows = ROWS[locale] || ROWS.en;
  return (
    <section
      aria-label={locale === "ru" ? "Что мы строим" : "What we build"}
      className="marquee-host relative overflow-hidden border-y border-line bg-ink-2/40"
    >
      <div aria-hidden className="grid-field pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent sm:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent sm:w-40"
      />
      <div className="relative space-y-3 py-10 sm:py-14">
        <Row words={rows[0]} />
        <Row words={rows[1]} reverse />
      </div>
    </section>
  );
}
