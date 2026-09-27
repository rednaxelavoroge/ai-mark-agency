import { navHref, type Locale } from "@/lib/site";
import type { Copy } from "@/content/copy";

/** First-screen map only. Does not repeat section copy. */
export function HubJump({ locale, t }: { locale: Locale; t: Copy }) {
  const isRu = locale === "ru";
  const items = [
    { href: "#products", label: t.products.eyebrow },
    { href: "#how", label: t.how.eyebrow },
    { href: "#commercial", label: t.commercial.eyebrow },
    { href: "#partners", label: t.partners.eyebrow },
    { href: "#investors", label: t.investors.eyebrow },
    { href: "#contact", label: t.contact.eyebrow },
  ];

  return (
    <nav
      aria-label={isRu ? "Разделы" : "Sections"}
      className="border-b border-line"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-3 sm:px-6">
        {items.map((item) => (
          <a
            key={item.href}
            href={navHref(locale, item.href)}
            className="rounded-full border border-line bg-ink-2 px-3 py-1.5 text-[11px] font-semibold text-paper hover:border-line-strong"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
