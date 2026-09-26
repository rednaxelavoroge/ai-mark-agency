import Link from "next/link";
import { Explore } from "@/components/hub/Explore";
import { HScroll } from "@/components/hub/HScroll";
import type { Copy } from "@/content/copy";
import { partnerProgramTerms } from "@/content/partner-program";
import { PARTNER_SIGNUP_HREF } from "@/lib/auth/redirects";
import { navHref, type Locale } from "@/lib/site";

const LEVELS = [
  { n: "L1", rate: "15%" },
  { n: "L2", rate: "5%" },
  { n: "L3", rate: "3%" },
  { n: "L4", rate: "2%" },
  { n: "L5", rate: "1%" },
] as const;

export function PartnerStrip({ locale, t }: { locale: Locale; t: Copy }) {
  const isRu = locale === "ru";
  const terms = partnerProgramTerms[locale];
  const flow = isRu
    ? ["Продажа", "Реферал", "Клиент платит", "AI MARK поставляет", "Комиссия"]
    : ["Sell", "Refer", "Customer Pays", "AI MARK Delivers", "Commission"];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">{t.partners.lead}</p>
      <ol className="flex flex-wrap items-center gap-2">
        {flow.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            {i > 0 ? <span className="font-mono text-[10px] text-warm">→</span> : null}
            <span className="rounded-full border border-line bg-ink-2 px-2.5 py-1 text-[11px] text-paper">
              {step}
            </span>
          </li>
        ))}
      </ol>
      <HScroll cols={5} label={isRu ? "Комиссия L1–L5" : "Commission L1–L5"}>
        {LEVELS.map((level) => (
          <div key={level.n} role="listitem" className="rounded-xl border border-line bg-ink-2 p-4 text-center">
            <p className="font-mono text-[10px] text-warm">{level.n}</p>
            <p className="mt-1 font-display text-2xl font-semibold text-mark">{level.rate}</p>
          </div>
        ))}
      </HScroll>
      <Explore summary={isRu ? "Механика комиссии" : "Commission mechanics"}>
        <p>{terms.note}</p>
        <p>{terms.launch}</p>
        <p>{terms.example}</p>
        <p>{terms.lock}</p>
        <p>{terms.payout}</p>
        <p>{terms.country}</p>
        <p>
          {t.partners.earn} {t.partners.can.join(" · ")}
        </p>
        {t.partners.types.map((type) => (
          <p key={type.title}>
            <strong className="text-paper">{type.title}.</strong> {type.body}
          </p>
        ))}
      </Explore>
      <div className="flex flex-wrap gap-2">
        <Link
          href={PARTNER_SIGNUP_HREF}
          className="inline-flex rounded-full bg-mark px-4 py-2 text-xs font-semibold text-mark-ink hover:bg-mark-light"
        >
          {t.partners.cta}
        </Link>
        <Link
          href={navHref(locale, "/partners")}
          className="inline-flex rounded-full border border-line px-4 py-2 text-xs font-semibold text-paper"
        >
          {isRu ? "Страница партнёров" : "Partner page"}
        </Link>
      </div>
    </div>
  );
}
