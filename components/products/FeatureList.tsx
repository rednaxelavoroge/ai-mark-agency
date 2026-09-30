import type { Locale } from "@/lib/site";
import { getPublicChromeCopy } from "@/content/sections";

const VISIBLE = 3;

/** Short prefix of a tariff's features, with the rest behind an expander. */
export function FeatureList({
  items,
  locale,
}: {
  items: string[];
  locale: Locale;
}) {
  const head = items.slice(0, VISIBLE);
  const rest = items.slice(VISIBLE);
  const label = getPublicChromeCopy(locale).productPage.allFeatures;

  return (
    <div className="mt-3 border-t border-line/60 pt-3">
      <ul className="space-y-1.5 text-[11px] leading-snug text-paper/90">
        {head.map((feat) => (
          <li key={feat} className="flex items-start gap-2">
            <span className="shrink-0 font-bold text-mark">✓</span>
            <span>{feat}</span>
          </li>
        ))}
      </ul>
      {rest.length > 0 ? (
        <details className="mt-2">
          <summary className="cursor-pointer list-none text-[11px] font-semibold text-mark">
            {label}
          </summary>
          <ul className="mt-1.5 space-y-1.5 text-[11px] leading-snug text-paper/90">
            {rest.map((feat) => (
              <li key={feat} className="flex items-start gap-2">
                <span className="shrink-0 font-bold text-mark">✓</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
