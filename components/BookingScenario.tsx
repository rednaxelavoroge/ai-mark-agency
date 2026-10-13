import type { Locale } from "@/lib/site";
import { getBookingCopy } from "@/content/booking-scenario";

/** Static appointment-booking example (salons/services) plus "your first week". */
export function BookingScenario({ locale }: { locale: Locale }) {
  const c = getBookingCopy(locale);
  return (
    <section id="booking" className="scroll-mt-24 border-b border-line py-10 sm:py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
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
        <div className="hd mx-0 lg:ms-auto">
          <div className="hd-card">
            <div className="hd-chat" style={{ minHeight: 0 }}>
              <p className="hd-msg hd-client hd-on">{c.client1}</p>
              <p className="hd-msg hd-seller hd-on">{c.seller1}</p>
              <p className="hd-msg hd-client hd-on">{c.client2}</p>
              <div className="hd-booked hd-on">
                <span className="hd-check" aria-hidden>✓</span>
                <span>
                  <strong>{c.booked}</strong>
                  <small>{c.bookedNote}</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
