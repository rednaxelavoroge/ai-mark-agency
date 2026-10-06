import { getShowroomAiCopy } from "@/content/showroom-ai";
import { developerHomeUrl } from "@/lib/developer";
import type { Locale } from "@/lib/site";

/**
 * Developer credit at the foot of every Showroom AI page: the product brand is
 * Showroom AI, the company that builds it is AI MARK / AlexDev.
 *
 * The outbound URL is locale-aware (`lib/developer.ts`): the developer site
 * publishes a subset of our locales and falls back to English for the rest.
 */
export function ShowroomPoweredBy({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const c = getShowroomAiCopy(locale);

  return (
    <div className={`border-t border-line bg-ink-2/60 ${className ?? ""}`}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-6 text-xs text-muted sm:px-6">
        <span>
          {c.brand} · {c.kicker}
        </span>
        <a
          href={developerHomeUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-mark hover:underline"
        >
          {c.poweredBy} ↗
        </a>
      </div>
    </div>
  );
}
