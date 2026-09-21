import type { Locale } from "@/lib/site";

export type InvestorStat = {
  label: string;
  value: string;
  unit: string;
  note: string;
};

export type InvestorsPageCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  lead: string;
  meta: string;
  stats: InvestorStat[];
  contentsLabel: string;
  documentLabel: string;
  downloadLabel: string;
  downloadHint: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

const EN: InvestorsPageCopy = {
  eyebrow: "Investment Proposal",
  title: "AI-Native Venture & Marketing Company",
  subtitle: "Building and scaling digital businesses on our own AI infrastructure",
  lead: "We create, launch and scale digital businesses — from idea analysis and market research to product, marketing, sales and growth. The core AI infrastructure is already built and used in commercial work; the next stage is turning it into a scalable international company.",
  meta: "Technology → Commercialization → Scale",
  stats: [
    {
      label: "AI Products",
      value: "$149–349+",
      unit: "/ month",
      note: "Subscription products",
    },
    {
      label: "AI Marketing",
      value: "from $500+",
      unit: "/ month",
      note: "Marketing support",
    },
    {
      label: "AI Marketing Department",
      value: "$1,500–3,500+",
      unit: "/ month",
      note: "End-to-end function",
    },
    {
      label: "AI Infrastructure",
      value: "Built",
      unit: "",
      note: "Already in commercial use",
    },
  ],
  contentsLabel: "Contents",
  documentLabel: "Full proposal",
  downloadLabel: "Download as Markdown",
  downloadHint: "The document below is rendered from the Markdown source.",
  ctaEyebrow: "Participation & Terms",
  ctaTitle: "Early investors and strategic partners",
  ctaBody:
    "Participation size, deal structure and terms are determined individually. We can demonstrate the working AI infrastructure, present the existing products and discuss the business model and scaling strategy.",
  ctaButton: "Request investor materials",
};

const RU: InvestorsPageCopy = {
  eyebrow: "Инвестиционное предложение",
  title: "AI-Native Venture & Marketing Company",
  subtitle:
    "Создание и масштабирование цифровых бизнесов с использованием собственной AI-инфраструктуры",
  lead: "Мы создаём, запускаем и масштабируем цифровые бизнесы — от анализа идеи и исследования рынка до продукта, маркетинга, продаж и роста. Основная AI-инфраструктура уже создана и используется в коммерческой работе; следующий этап — превратить её в масштабируемую международную компанию.",
  meta: "Technology → Commercialization → Scale",
  stats: [
    {
      label: "AI-продукты",
      value: "$149–349+",
      unit: "/ месяц",
      note: "Продукты по подписке",
    },
    {
      label: "AI-маркетинг",
      value: "от $500+",
      unit: "/ месяц",
      note: "Маркетинговое сопровождение",
    },
    {
      label: "AI-маркетинг-отдел",
      value: "$1,500–3,500+",
      unit: "/ месяц",
      note: "Комплексная функция",
    },
    {
      label: "AI-инфраструктура",
      value: "Создана",
      unit: "",
      note: "Уже используется коммерчески",
    },
  ],
  contentsLabel: "Содержание",
  documentLabel: "Полное предложение",
  downloadLabel: "Скачать в Markdown",
  downloadHint: "Документ ниже отрендерен из Markdown-источника.",
  ctaEyebrow: "Формат участия",
  ctaTitle: "Ранние инвесторы и стратегические партнёры",
  ctaBody:
    "Размер участия, структура сделки и условия определяются индивидуально. Мы можем показать работающую AI-инфраструктуру, презентовать существующие продукты и обсудить бизнес-модель и стратегию масштабирования.",
  ctaButton: "Запросить материалы инвестора",
};

export function getInvestorsCopy(locale: Locale): InvestorsPageCopy {
  return locale === "ru" ? RU : EN;
}
