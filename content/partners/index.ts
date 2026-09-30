import type { Locale } from "@/lib/site";
import type { PartnerPageCopy } from "./types";
import { copyEn } from "./en";
import { copyRu } from "./ru";
import { copyEs } from "./es";
import { copyPt } from "./pt";
import { copyDe } from "./de";
import { copyFr } from "./fr";
import { copyZh } from "./zh";
import { copyAr } from "./ar";
import { copyJa } from "./ja";
import { copyTr } from "./tr";
import { copyId } from "./id";
import { copyVi } from "./vi";

export * from "./types";

export const partnerPageCopy: Record<Locale, PartnerPageCopy> = {
  en: copyEn,
  ru: copyRu,
  es: copyEs,
  pt: copyPt,
  de: copyDe,
  fr: copyFr,
  zh: copyZh,
  ar: copyAr,
  ja: copyJa,
  tr: copyTr,
  id: copyId,
  vi: copyVi,
};
