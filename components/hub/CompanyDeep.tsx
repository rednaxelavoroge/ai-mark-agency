import { Explore } from "@/components/hub/Explore";
import { HScroll } from "@/components/hub/HScroll";
import type { Copy } from "@/content/copy";
import type { Locale } from "@/lib/site";
import { Manifesto } from "@/components/Manifesto";
import { IdeaToBusiness } from "@/components/IdeaToBusiness";
import { OperatingModelSection } from "@/components/OperatingModelSection";
import { BusinessCreationVisual } from "@/components/BusinessCreationVisual";
import { DigitalProductionShowcase } from "@/components/DigitalProductionShowcase";
import { CapabilityBand } from "@/components/CapabilityBand";

/** Level-2 archive: existing long-form blocks stay reachable, not deleted. */
export function CompanyDeep({ locale, t }: { locale: Locale; t: Copy }) {
  const isRu = locale === "ru";

  return (
    <>
      <section id="what-we-do" className="hub-section border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="font-mono text-[10px] tracking-[0.2em] text-mark uppercase">{t.pillars.eyebrow}</p>
          <h2 className="mt-2 font-editorial text-2xl font-medium tracking-tight sm:text-3xl">{t.pillars.title}</h2>
          <div className="mt-4">
            <HScroll cols={5} label={t.pillars.title}>
              {t.pillars.items.map((item) => (
                <article key={item.n} role="listitem" className="rounded-xl border border-line bg-ink-2 p-4">
                  <p className="font-mono text-[10px] text-warm">{item.n}</p>
                  <h3 className="mt-1 font-display text-sm font-semibold text-paper">{item.title}</h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted">{item.body}</p>
                </article>
              ))}
            </HScroll>
          </div>
          <div className="mt-4">
            <Explore summary={isRu ? "Контур компании" : "Company contour"}>
              <CapabilityBand locale={locale} />
            </Explore>
          </div>
        </div>
      </section>

      <section id="business-creation" className="hub-section border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="font-mono text-[10px] tracking-[0.2em] text-mark uppercase">{t.creation.eyebrow}</p>
          <h2 className="mt-2 font-editorial text-2xl font-medium tracking-tight sm:text-3xl">{t.creation.title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">{t.creation.lead}</p>
          <div className="mt-4">
            <Explore summary={isRu ? "Путь создания бизнеса" : "Business creation path"}>
              <IdeaToBusiness locale={locale} />
              <div className="mt-4">
                <BusinessCreationVisual locale={locale} />
              </div>
            </Explore>
          </div>
        </div>
      </section>

      <section id="pipeline" className="sr-only" aria-hidden="false">
        <h2>{t.pipeline.title}</h2>
        <p>{t.pipeline.steps.join(" → ")}</p>
      </section>

      <section id="production" className="hub-section border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="font-mono text-[10px] tracking-[0.2em] text-mark uppercase">{t.production.eyebrow}</p>
          <h2 className="mt-2 font-editorial text-2xl font-medium tracking-tight sm:text-3xl">{t.production.title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">{t.production.lead}</p>
          <Explore summary={isRu ? "Производство подробно" : "Production detail"}>
            <DigitalProductionShowcase locale={locale} />
          </Explore>
        </div>
      </section>

      <section id="operating-model" className="hub-section border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <Explore summary={isRu ? "Операционная модель HITL" : "HITL operating model"}>
            <p className="text-sm text-paper">{t.how.hitl}</p>
            <div className="mt-4">
              <OperatingModelSection locale={locale} />
            </div>
            <Manifesto locale={locale} />
          </Explore>
        </div>
      </section>

      <section id="why-now" className="hub-section border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="font-mono text-[10px] tracking-[0.2em] text-mark uppercase">{t.why.eyebrow}</p>
          <h2 className="mt-2 font-editorial text-2xl font-medium tracking-tight sm:text-3xl">{t.why.title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">{t.why.lead}</p>
          <Explore summary={isRu ? "Сравнение моделей" : "Model comparison"}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] text-muted uppercase">{t.why.oldLabel}</p>
                <ul className="mt-2 space-y-1">
                  {t.why.old.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] text-mark uppercase">{t.why.newLabel}</p>
                <ul className="mt-2 space-y-1">
                  {t.why.next.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p>{t.why.close}</p>
          </Explore>
        </div>
      </section>
    </>
  );
}
