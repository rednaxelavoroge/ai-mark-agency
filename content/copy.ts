import type { Locale } from "@/lib/site";
import type { PackageId, ProductId } from "@/content/packages";
import { copyEn } from "./locales/en";
import { copyRu } from "./locales/ru";
import { copyEs } from "./locales/es";
import { copyPt } from "./locales/pt";
import { copyAr } from "./locales/ar";
import { copyZh } from "./locales/zh";
import { copyId } from "./locales/id";
import { copyVi } from "./locales/vi";
import { copyDe } from "./locales/de";
import { copyFr } from "./locales/fr";
import { copyJa } from "./locales/ja";
import { copyTr } from "./locales/tr";

export type NavItem = { href: string; label: string };

export type Copy = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    keywords: string[];
  };
  nav: {
    items: NavItem[];
    cta: string;
    menu: string;
    close: string;
    langEn: string;
    langRu: string;
    themeLight: string;
    themeDark: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    extra: string;
    soft: string;
    primaryCta: string;
    secondaryCta: string;
    investorCta: string;
  };
  pillars: {
    eyebrow: string;
    title: string;
    items: { n: string; title: string; body: string }[];
  };
  creation: {
    eyebrow: string;
    title: string;
    lead: string;
    withoutIdea: string;
    steps: { title: string; body: string }[];
  };
  pipeline: {
    eyebrow: string;
    title: string;
    steps: string[];
  };
  tech: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  products: {
    eyebrow: string;
    title: string;
    lead: string;
    whoLabel: string;
    extraLabel: string;
    detailCta: string;
    installCta: string;
    hubCta: string;
    hubTitle: string;
    hubLead: string;
    items: Record<
      ProductId,
      { value: string; who: string; extra: string; price: string }
    >;
  };
  production: {
    eyebrow: string;
    title: string;
    lead: string;
    note: string;
    items: string[];
  };
  cycle: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: string[];
  };
  how: {
    eyebrow: string;
    title: string;
    lead: string;
    hitl: string;
    steps: { title: string; body: string }[];
  };
  commercial: {
    eyebrow: string;
    title: string;
    lead: string;
    skuNote: string;
    perMonth: string;
    featured: string;
    retainerCta: string;
    custom: string;
    tiers: {
      name: string;
      price: string;
      body: string;
    }[];
    footnote: string;
  };
  packages: {
    items: Record<
      PackageId,
      { name: string; summary: string; points: string[] }
    >;
  };
  partners: {
    eyebrow: string;
    title: string;
    lead: string;
    model: string;
    earn: string;
    cta: string;
    types: { title: string; body: string }[];
    can: string[];
  };
  why: {
    eyebrow: string;
    title: string;
    lead: string;
    oldLabel: string;
    newLabel: string;
    old: string[];
    next: string[];
    close: string;
  };
  investors: {
    eyebrow: string;
    title: string;
    lead: string;
    usesTitle: string;
    uses: string[];
    not: string;
    scale: string;
    cta: string;
  };
  network: {
    eyebrow: string;
    title: string;
    result: string;
    nodes: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    formNote: string;
    formCta: string;
    name: string;
    email: string;
    messenger: string;
    messengerHint: string;
    company: string;
    scenario: string;
    scenarioOptions: { value: string; label: string; hint: string }[];
    submit: string;
    sending: string;
    success: string;
    error: string;
    privacy: string;
  };
  productPages: Record<
    ProductId,
    {
      eyebrow: string;
      title: string;
      lead: string;
      metaphor: string;
      sections: { title: string; body: string }[];
      flow: string[];
    }
  >;
  footer: {
    blurb: string;
    privacy: string;
    rights: string;
    poweredBy: string;
  };
  privacy: {
    title: string;
    updated: string;
    paragraphs: string[];
  };
  jsonLd: {
    description: string;
  };
};

export const copy: Record<Locale, Copy> = {
  en: copyEn,
  ru: copyRu,
  es: copyEs,
  pt: copyPt,
  ar: copyAr,
  zh: copyZh,
  id: copyId,
  vi: copyVi,
  de: copyDe,
  fr: copyFr,
  ja: copyJa,
  tr: copyTr,
};

export function getCopy(locale: Locale): Copy {
  return copy[locale] || copyEn;
}
