import Link from "next/link";
import { getShowroomAiCopy, type ShowroomAiRoleCopy } from "@/content/showroom-ai";
import { showroomRoleHref, type ShowroomRoleId } from "@/lib/showroom-ai";
import type { Locale } from "@/lib/site";

/**
 * The «Связка» block: the marketer brings the customers, the seller sells.
 *
 * Two large, equally weighted cards (Seller, Marketer) that pair up into one
 * loop, plus a smaller third card for the Business Assistant. Every card links
 * to its role page: Seller lives on the Showroom AI page (the `#seller`
 * section), Marketer and Business Assistant keep their long-published URLs.
 *
 * The Marketer card carries the role's FULL capability set — research →
 * audience → strategy → content plan → texts → Reels/Stories → design →
 * approval in Telegram → publishing → analytics — because the owner's decision
 * is to sell that breadth, not a summary of it.
 */
export function ShowroomRoleLinkage({
  locale,
  current,
  className,
}: {
  locale: Locale;
  /** Role whose own page is rendering — its card is not a link. */
  current?: ShowroomRoleId;
  className?: string;
}) {
  const c = getShowroomAiCopy(locale);
  const role = (id: ShowroomRoleId): ShowroomAiRoleCopy | undefined =>
    c.roles.find((entry) => entry.id === id);
  const seller = role("seller");
  const marketer = role("marketer");
  const assistant = role("assistant");
  // A missing role means the copy module and this block disagree; render nothing
  // rather than shipping a card with no content.
  if (!seller || !marketer || !assistant) return null;

  const paired = [seller, marketer];

  return (
    <div className={className}>
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mark">
          {c.brand} · {c.kicker}
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-paper sm:text-3xl">
          {c.linkageTitle}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{c.linkageSub}</p>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {paired.map((entry) => {
          const isCurrent = entry.id === current;
          const shell = `flex h-full flex-col rounded-2xl border p-5 sm:p-6 ${
            isCurrent ? "border-mark/60 bg-ink-3/40" : "border-line bg-ink-2"
          }`;
          const body = (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-warm">
                    {entry.title}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-paper">
                    {entry.name}
                  </h3>
                </div>
                {entry.id === "marketer" ? (
                  <span className="shrink-0 rounded-full border border-mark/40 bg-mark/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-mark">
                    {c.pairBadge}
                  </span>
                ) : null}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">{entry.desc}</p>

              {entry.industries ? (
                <p className="mt-4 rounded-xl border border-line bg-ink-3/40 p-3 text-xs leading-relaxed text-muted">
                  <span className="font-semibold text-paper">
                    {locale === "ru" ? "Отрасли" : "Industries"}:{" "}
                  </span>
                  {entry.industries}
                </p>
              ) : null}

              <ul className="mt-4 space-y-2 text-xs text-paper/90">
                {entry.capabilities.map((capability) => (
                  <li key={capability} className="flex items-start gap-2">
                    <span className="shrink-0 font-bold text-mark">✓</span>
                    <span className="leading-snug">{capability}</span>
                  </li>
                ))}
              </ul>

              {entry.combo ? (
                <p className="mt-4 rounded-xl border border-mark/30 bg-mark/5 p-3 text-sm font-semibold text-paper">
                  {entry.combo}
                </p>
              ) : null}

              <span className="mt-auto pt-5">
                {isCurrent ? (
                  <span className="text-xs font-semibold text-muted">{c.roleBannerLabel}</span>
                ) : (
                  <span className="text-xs font-semibold text-mark">{entry.cta} →</span>
                )}
              </span>
            </>
          );

          return isCurrent ? (
            <article key={entry.id} className={shell} aria-current="page">
              {body}
            </article>
          ) : (
            <Link key={entry.id} href={showroomRoleHref(locale, entry.id)} className={shell}>
              {body}
            </Link>
          );
        })}
      </div>

      {/* Third card, deliberately smaller: the Assistant supports the pair. */}
      <AssistantCard
        locale={locale}
        assistant={assistant}
        currentLabel={c.roleBannerLabel}
        isCurrent={assistant.id === current}
      />
    </div>
  );
}

function AssistantCard({
  locale,
  assistant,
  currentLabel,
  isCurrent,
}: {
  locale: Locale;
  assistant: ShowroomAiRoleCopy;
  currentLabel: string;
  isCurrent: boolean;
}) {
  const shell = `mt-4 block rounded-2xl border p-4 sm:p-5 ${
    isCurrent ? "border-mark/50 bg-ink-3/40" : "border-line bg-ink-2/70"
  }`;
  const body = (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.4fr_auto] lg:items-center">
      <div>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-warm">
          {assistant.title}
        </span>
        <h3 className="mt-1.5 font-display text-base font-semibold text-paper">{assistant.name}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted">{assistant.desc}</p>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-paper/90">
        {assistant.capabilities.map((capability) => (
          <li key={capability} className="flex items-start gap-1.5">
            <span className="shrink-0 text-mark">✓</span>
            <span className="leading-snug">{capability}</span>
          </li>
        ))}
      </ul>
      <span className="shrink-0 text-xs font-semibold lg:text-end">
        {isCurrent ? (
          <span className="text-muted">{currentLabel}</span>
        ) : (
          <span className="text-mark">{assistant.cta} →</span>
        )}
      </span>
    </div>
  );

  return isCurrent ? (
    <article className={shell} aria-current="page">
      {body}
    </article>
  ) : (
    <Link href={showroomRoleHref(locale, "assistant")} className={shell}>
      {body}
    </Link>
  );
}
