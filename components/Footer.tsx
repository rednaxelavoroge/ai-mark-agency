import Link from "next/link";
import type { Copy } from "@/content/copy";
import { localePath, site } from "@/lib/site";
import type { Locale } from "@/lib/site";

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
          <Link href={privacy} className="hover:text-paper">
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
