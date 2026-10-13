import type { Locale } from "@/lib/site";
import { getBookingCopy } from "@/content/booking-scenario";

/**
 * Appointment-booking example (salons/services) plus "your first week".
 * The animated chat now lives in the Seller page hero (SellerHeroDemo);
 * this section keeps the written scenario and onboarding week.
 */
export function BookingScenario({ locale }: { locale: Locale }) {
  const c = getBookingCopy(locale);
  return (
    <section id="booking" className="scroll-mt-24 border-b border-line py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-mark">{c.eyebrow}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">{c.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{c.lead}</p>
          <h3 className="mt-6 text-base font-semibold text-paper">{c.weekTitle}</h3>
          <ul className="mt-3 space-y-2 text-sm text-paper/90">
            {c.week.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="font-bold text-mark" aria-hidden>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
