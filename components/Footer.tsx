import Link from "next/link";
import type { Copy } from "@/content/copy";
import { BrandLogo } from "@/components/BrandLogo";
import { ContactCta } from "@/components/ContactCta";
import { navHref, type Locale } from "@/lib/site";
import { productPagePath, productsHubPath } from "@/lib/products";

export function Footer({ locale, t }: { locale: Locale; t: Copy }) {
  const year = new Date().getFullYear();
  const isRu = locale === "ru";

  return (
    <footer className="border-t border-line bg-ink-2/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Col 1: Brand Info */}
          <div>
            <Link href={navHref(locale, "/")} className="inline-flex max-w-full items-center">
              <BrandLogo className="h-11 sm:h-14" />
            </Link>
            <p className="mt-3 text-xs font-mono tracking-widest text-mark uppercase">
              AI-Native Venture &amp; Marketing Company
            </p>
            <p className="mt-2 text-sm text-muted max-w-sm">
              {isRu
                ? "От идеи до работающего бизнеса. Исследуем рынки, строим цифровые продукты, разворачиваем AI-инфраструктуру, запускаем маркетинг и продажи."
                : "From Idea to Business. Researching markets, building digital products, deploying proprietary AI infrastructure, and scaling marketing and sales operations."}
            </p>
          </div>

          {/* Col 2: Core Platform Contours */}
          <div>
            <p className="text-xs font-mono font-semibold tracking-wider text-warm uppercase">
              {isRu ? "Контуры" : "Capabilities"}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <Link href={navHref(locale, "#business-creation")} className="hover:text-paper transition-colors">
                  {isRu ? "Создание бизнеса" : "Business Creation"}
                </Link>
              </li>
              <li>
                <Link href={navHref(locale, "#production")} className="hover:text-paper transition-colors">
                  {isRu ? "Digital Production" : "Digital Production"}
                </Link>
              </li>
              <li>
                <Link href={navHref(locale, "#pipeline")} className="hover:text-paper transition-colors">
                  {isRu ? "Сквозной процесс" : "End-to-End Pipeline"}
                </Link>
              </li>
              <li>
                <Link href={navHref(locale, "#how")} className="hover:text-paper transition-colors">
                  {isRu ? "Операционная AI-модель" : "AI Operating Model"}
                </Link>
              </li>
              <li>
                <Link href={navHref(locale, "#commercial")} className="hover:text-paper transition-colors">
                  {isRu ? "Коммерческая модель" : "Commercial Model"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Proprietary AI Products */}
          <div>
            <p className="text-xs font-mono font-semibold tracking-wider text-warm uppercase">
              {isRu ? "AI-продукты" : "AI Products"}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <Link href={productPagePath(locale, "aime")} className="hover:text-paper transition-colors">
                  AI Marketing Employee
                </Link>
              </li>
              <li>
                <Link href={productPagePath(locale, "assistant")} className="hover:text-paper transition-colors">
                  AI Business Assistant
                </Link>
              </li>
              <li>
                <Link href={productPagePath(locale, "showroom")} className="hover:text-paper transition-colors">
                  Showroom AI
                </Link>
              </li>
              <li>
                <Link href={productsHubPath(locale)} className="text-mark hover:underline font-medium">
                  {isRu ? "Все продукты →" : "All Products →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Venture & Network */}
          <div>
            <p className="text-xs font-mono font-semibold tracking-wider text-warm uppercase">
              {isRu ? "Компания" : "Venture"}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <Link href={navHref(locale, "/partners")} className="hover:text-paper transition-colors">
                  {isRu ? "Партнёрская сеть" : "Partner Network"}
                </Link>
              </li>
              <li>
                <Link href={navHref(locale, "#investors")} className="hover:text-paper transition-colors">
                  {isRu ? "Инвесторам" : "Investors"}
                </Link>
              </li>
              <li>
                <Link href={navHref(locale, "#why-now")} className="hover:text-paper transition-colors">
                  {isRu ? "Почему сейчас" : "Why Now"}
                </Link>
              </li>
              <li>
                <ContactCta className="hover:text-paper transition-colors">
                  {isRu ? "Обсудить проект" : "Discuss a Project"}
                </ContactCta>
              </li>
              <li>
                <Link href={navHref(locale, "/privacy")} className="hover:text-paper transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row text-xs text-muted">
          <p>© {year} AI MARK. {isRu ? "Все права защищены." : "All rights reserved."}</p>
          <div className="flex items-center gap-4">
            <span>{isRu ? "От идеи до работающего бизнеса" : "From Idea to Business"}</span>
            <span>·</span>
            <span>ai-mark.agency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
