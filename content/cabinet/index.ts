import type { Locale } from "@/lib/site";
import type { CabinetCopy } from "./types";
import { cabinetEn } from "./en";
import { cabinetRu } from "./locales/ru";
import { cabinetDe } from "./locales/de";
import { cabinetEs } from "./locales/es";
import { cabinetPt } from "./locales/pt";
import { cabinetAr } from "./locales/ar";
import { cabinetZh } from "./locales/zh";
import { cabinetId } from "./locales/id";
import { cabinetVi } from "./locales/vi";
import { cabinetFr } from "./locales/fr";
import { cabinetJa } from "./locales/ja";
import { cabinetTr } from "./locales/tr";

export type { CabinetCopy } from "./types";

export const cabinetCopy: Record<Locale, CabinetCopy> = {
  en: cabinetEn,
  ru: cabinetRu,
  de: cabinetDe,
  es: cabinetEs,
  pt: cabinetPt,
  ar: cabinetAr,
  zh: cabinetZh,
  id: cabinetId,
  vi: cabinetVi,
  fr: cabinetFr,
  ja: cabinetJa,
  tr: cabinetTr,
};

export function getCabinetCopy(locale: Locale): CabinetCopy {
  return cabinetCopy[locale] ?? cabinetEn;
}
