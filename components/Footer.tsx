import Link from "next/link";
import type { Copy } from "@/content/copy";
import { getPublicChromeCopy } from "@/content/sections";
import { BrandLogo } from "@/components/BrandLogo";
import { ContactCta } from "@/components/ContactCta";
import { navHref, type Locale } from "@/lib/site";
import { productsHubPath } from "@/lib/products";
import { DIGITAL_PRODUCTION_PATH } from "@/lib/digital-production";
import { getShowroomAiCopy } from "@/content/showroom-ai";
import { showroomRoleHref } from "@/lib/showroom-ai";
import { developerHomeUrl } from "@/lib/developer";

export function Footer({ locale, t }: { locale: Locale; t: Copy }) {
  const year = new Date().getFullYear();
  const chrome = getPublicChromeCopy(locale).footer;
  // Product links are the Showroom AI roles; AI MARK stays the developer.
  const showroom = getShowroomAiCopy(locale);
  const roleName = (id: "seller" | "marketer" | "assistant") =>
    `${showroom.brand} · ${showroom.roles.find((role) => role.id === id)?.name ?? id}`;

  return (
    <footer className="border-t border-line bg-ink-2/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href={navHref(locale, "/")} className="inline-flex max-w-full flex-col items-start">
              <BrandLogo className="h-8 sm:h-9" />
              <span className="mt-2 text-[13px] font-semibold text-muted">{chrome.ventureTagline}</span>
            </Link>
            <p className="mt-3 text-[13px] font-semibold tracking-widest text-mark uppercase">
              {chrome.taglineUpper}
            </p>
            <p className="mt-2 text-sm text-muted max-w-sm">{chrome.blurb}</p>
          </div>

          <div>
            <p className="text-xs font-mono font-semibold tracking-wider text-warm uppercase">
              {chrome.capabilities}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <Link href={navHref(locale, "/how-it-works#business-creation")} className="hover:text-paper transition-colors">
                  {chrome.businessCreation}
                </Link>
              </li>
              <li>
                <Link href={navHref(locale, DIGITAL_PRODUCTION_PATH)} className="hover:text-paper transition-colors">
                  {chrome.digitalProduction}
                </Link>
              </li>
              <li>
                <Link href={navHref(locale, "/how-it-works#idea-to-business")} className="hover:text-paper transition-colors">
                  {chrome.endToEndPipeline}
                </Link>
              </li>
              <li>
                <Link href={navHref(locale, "/how-it-works#operating-model")} className="hover:text-paper transition-colors">
                  {chrome.aiOperatingModel}
                </Link>
              </li>
              <li>
                <Link href={navHref(locale, "/pricing#commercial")} className="hover:text-paper transition-colors">
                  {chrome.commercialModel}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-mono font-semibold tracking-wider text-warm uppercase">
              {chrome.aiProducts}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <Link href={showroomRoleHref(locale, "seller")} className="hover:text-paper transition-colors">
                  {roleName("seller")}
                </Link>
              </li>
              <li>
                <Link href={showroomRoleHref(locale, "marketer")} className="hover:text-paper transition-colors">
                  {roleName("marketer")}
                </Link>
              </li>
              <li>
                <Link href={showroomRoleHref(locale, "assistant")} className="hover:text-paper transition-colors">
                  {roleName("assistant")}
                </Link>
              </li>
              <li>
                <Link href={productsHubPath(locale)} className="text-mark hover:underline font-medium">
                  {chrome.allProducts}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-mono font-semibold tracking-wider text-warm uppercase">
              {chrome.venture}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <Link href={navHref(locale, "/partners")} className="hover:text-paper transition-colors">
                  {chrome.partnerNetwork}
                </Link>
              </li>
              <li>
                <Link href={navHref(locale, "/investors")} className="hover:text-paper transition-colors">
                  {chrome.investors}
                </Link>
              </li>
              <li>
                <Link href={navHref(locale, "/pricing#why-now")} className="hover:text-paper transition-colors">
                  {chrome.whyNow}
                </Link>
              </li>
              <li>
                <ContactCta className="hover:text-paper transition-colors">
                  {chrome.discussProject}
                </ContactCta>
              </li>
              <li>
                <Link href={navHref(locale, "/pay")} className="hover:text-paper transition-colors">
                  {chrome.payCrypto}
                </Link>
              </li>
              <li className="text-[13px]">{t.ui.cardsSoon}</li>
              <li>
                <Link href={navHref(locale, "/privacy")} className="hover:text-paper transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row text-xs text-muted">
          <p>
            © {year} AI MARK. {chrome.rights}{" "}
            <a
              href={developerHomeUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-paper"
            >
              {showroom.brand} — {showroom.developerCredit}
            </a>
          </p>
          <div className="flex items-center gap-4">
            <span>{chrome.taglineShort}</span>
            <span>·</span>
            <span>ai-mark.agency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
