import Link from "next/link";
import { ShowroomDemoChatButton } from "@/components/products/ShowroomDemoChat";
import { getShowroomAiCopy } from "@/content/showroom-ai";
import { SHOWROOM_AI_BRAND_PATH, showroomRoleHref, type ShowroomRoleId } from "@/lib/showroom-ai";
import { navHref, type Locale } from "@/lib/site";

/**
 * The band that turns a long-published product page into a Showroom AI role
 * page without moving its URL: it names the role, states the brand message, and
 * links back to the brand and to the other two roles.
 */
export function ShowroomRoleBanner({
  locale,
  role,
  className,
}: {
  locale: Locale;
  role: ShowroomRoleId;
  className?: string;
}) {
  const c = getShowroomAiCopy(locale);
  const roleCopy = c.roles.find((row) => row.id === role);
  const others = c.roles.filter((row) => row.id !== role);

  return (
    <section className={className} aria-label={c.brand}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-2xl border border-line bg-ink-2 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-warm">
              {c.roleBannerLabel} · {roleCopy?.name}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-paper sm:text-xl">
              {c.mantra}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ShowroomDemoChatButton
              locale={locale}
              className="inline-flex min-h-10 items-center rounded-full bg-mark px-4 text-xs font-semibold text-mark-ink transition-all hover:bg-mark-light"
            />
            <Link
              href={navHref(locale, SHOWROOM_AI_BRAND_PATH)}
              className="inline-flex min-h-10 items-center rounded-full border border-line bg-ink-3/60 px-4 text-xs font-medium text-paper transition-colors hover:border-line-strong"
            >
              {c.brand} →
            </Link>
            {others.map((other) => (
              <Link
                key={other.id}
                href={showroomRoleHref(locale, other.id)}
                className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-xs font-medium text-muted transition-colors hover:text-paper"
              >
                {other.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
