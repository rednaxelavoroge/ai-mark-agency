import Link from "next/link";
import { getShowroomAiCopy } from "@/content/showroom-ai";
import { showroomRoleHref, type ShowroomRoleId } from "@/lib/showroom-ai";
import type { Locale } from "@/lib/site";

/**
 * The three Showroom AI roles as entry cards into the role pages.
 *
 * Seller lives on the Showroom AI page itself; Marketer and Business Assistant
 * have their own long-published URLs, so a role card links there instead of
 * introducing a new redirect.
 */
export function ShowroomRoles({
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

  return (
    <div className={className}>
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mark">
          {c.brand} · {c.kicker}
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-paper sm:text-3xl">
          {c.rolesTitle}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">{c.rolesSub}</p>
      </header>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {c.roles.map((role) => {
          const isCurrent = role.id === current;
          const body = (
            <>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-warm">
                {role.title}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold text-paper">{role.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{role.desc}</p>
              <ul className="mt-4 space-y-2 text-xs text-paper/90">
                {role.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="shrink-0 font-bold text-mark">✓</span>
                    <span className="leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
              {!isCurrent ? (
                <span className="mt-5 inline-flex text-xs font-semibold text-mark">
                  {role.cta} →
                </span>
              ) : (
                <span className="mt-5 inline-flex text-xs font-semibold text-muted">
                  {c.roleBannerLabel}
                </span>
              )}
            </>
          );

          const shell = `flex flex-col rounded-2xl border p-5 sm:p-6 ${
            isCurrent ? "border-mark/50 bg-ink-3/40" : "border-line bg-ink-2"
          }`;

          return isCurrent ? (
            <article key={role.id} className={shell} aria-current="page">
              {body}
            </article>
          ) : (
            <Link key={role.id} href={showroomRoleHref(locale, role.id)} className={shell}>
              {body}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
