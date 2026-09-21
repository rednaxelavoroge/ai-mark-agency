import Link from "next/link";
import type { Copy } from "@/content/copy";
import { ThemeToggle } from "@/components/ThemeToggle";
import { localePath, site } from "@/lib/site";
import type { Locale } from "@/lib/site";

export function Header({ locale, t }: { locale: Locale; t: Copy }) {
  const home = localePath(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href={home} className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-mark font-display text-xs font-semibold text-mark-ink">
            AM
          </span>
          <span className="truncate font-display text-sm font-medium tracking-tight">
            {site.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted lg:flex">
          {t.nav.items.map((item) => (
            <Link
              key={item.href}
              href={`${home}${item.href}`}
              className="transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle lightLabel={t.nav.themeLight} darkLabel={t.nav.themeDark} />
          <div className="flex overflow-hidden rounded-full border border-line text-xs">
            <Link
              href="/"
              hrefLang="en"
              className={`px-2.5 py-1 ${
                locale === "en" ? "bg-paper text-ink" : "text-muted hover:text-paper"
              }`}
            >
              {t.nav.langEn}
            </Link>
            <Link
              href="/ru"
              hrefLang="ru"
              className={`px-2.5 py-1 ${
                locale === "ru" ? "bg-paper text-ink" : "text-muted hover:text-paper"
              }`}
            >
              {t.nav.langRu}
            </Link>
          </div>
          <Link
            href={`${home}#contact`}
            className="rounded-full bg-mark px-3 py-1.5 text-xs font-semibold text-mark-ink sm:px-4 sm:text-sm"
          >
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
