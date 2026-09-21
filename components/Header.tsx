import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import type { Copy } from "@/content/copy";
import { localePath, site } from "@/lib/site";

export function Header({ locale, t }: { locale: Locale; t: Copy }) {
  const home = localePath(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href={home} className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-mark font-display text-xs font-semibold text-mark-ink">
            AM
          </span>
          <span className="truncate font-display text-sm font-medium tracking-tight">
            {site.name}
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {t.nav.items.map((item) => (
            <a
              key={item.href}
              href={`${home === "/" ? "" : home}${item.href}`}
              className="transition-colors hover:text-paper"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex rounded-full border border-line text-xs">
            <a
              href="/"
              hrefLang="en"
              className={`px-2.5 py-1 ${
                locale === "en" ? "bg-paper text-ink" : "text-muted hover:text-paper"
              } rounded-full`}
            >
              {t.nav.langEn}
            </a>
            <a
              href="/ru"
              hrefLang="ru"
              className={`px-2.5 py-1 ${
                locale === "ru" ? "bg-paper text-ink" : "text-muted hover:text-paper"
              } rounded-full`}
            >
              {t.nav.langRu}
            </a>
          </div>
          <a
            href={`${home === "/" ? "" : home}#contact`}
            className="rounded-full bg-mark px-3 py-1.5 text-xs font-semibold text-mark-ink sm:px-4 sm:text-sm"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer({ locale, t }: { locale: Locale; t: Copy }) {
  const privacy = localePath(locale, "/privacy");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-sm">{site.name}</p>
          <p className="mt-2 text-sm text-muted">{t.footer.blurb}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted md:items-end">
          <a href={privacy} className="hover:text-paper">
            {t.footer.privacy}
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-paper">
            {site.email}
          </a>
          <p>
            © {year} {t.footer.rights}
          </p>
          <p className="text-xs text-muted/80">{t.footer.poweredBy}</p>
        </div>
      </div>
    </footer>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
          {title}
        </h2>
        {lead ? <p className="mt-4 max-w-2xl text-muted">{lead}</p> : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
