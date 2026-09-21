import Link from "next/link";
import type { Copy } from "@/content/copy";
import { navHref, site, type Locale } from "@/lib/site";

export function Footer({ locale, t }: { locale: Locale; t: Copy }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="max-w-md">
          <p className="font-display text-sm">{site.name}</p>
          <p className="mt-2 text-sm text-muted">{t.footer.blurb}</p>
          <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            {t.nav.items.map((item) => (
              <Link
                key={item.href + item.label}
                href={navHref(locale, item.href)}
                className="hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted md:items-end">
          <Link href={navHref(locale, "/privacy")} className="hover:text-paper">
            {t.footer.privacy}
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-paper">
            {site.email}
          </a>
          <p>
            © {year} {t.footer.rights}
          </p>
          <p className="text-xs text-muted/80">
            <a
              href={site.partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper"
            >
              {t.footer.poweredBy}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
