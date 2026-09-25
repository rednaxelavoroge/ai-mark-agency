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
  title: "Investment in AI MARK",
  subtitle: "Participation in the company, not an order to build a business and not the partner network",
  lead: "This page is about investing in AI MARK as a company. It is separate from Business Creation, where we build a business for a client, and from the Partner Network, where partners earn commission on sales. The core AI infrastructure is already in commercial use; financing, if taken, is for scale.",
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
  ctaTitle: "Early investors",
  ctaBody:
    "Participation size, deal structure and terms are determined individually. We can demonstrate the working AI infrastructure, present the existing products and discuss the business model and scaling strategy.",
  ctaButton: "Request investor materials",
};

const RU: InvestorsPageCopy = {
  eyebrow: "Инвестиционное предложение",
  title: "Инвестиция в компанию AI MARK",
  subtitle:
    "Участие в компании, а не заказ на создание бизнеса и не партнёрская сеть",
  lead: "Эта страница — про инвестицию в AI MARK как компанию. Она отдельно от создания бизнеса для клиента и отдельно от партнёрской сети, где партнёр получает комиссию с продаж. Основная AI-инфраструктура уже используется в коммерческой работе; финансирование, если мы его берём, — на масштаб.",
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
  ctaTitle: "Ранние инвесторы",
  ctaBody:
    "Размер участия, структура сделки и условия определяются индивидуально. Мы можем показать работающую AI-инфраструктуру, презентовать существующие продукты и обсудить бизнес-модель и стратегию масштабирования.",
  ctaButton: "Запросить материалы инвестора",
};

export function getInvestorsCopy(locale: Locale): InvestorsPageCopy {
  return locale === "ru" ? RU : EN;
}
