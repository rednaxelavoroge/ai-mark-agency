import {
  AI_MARK_RETAINED_SHARE_LABEL,
  COMMISSION_LEVELS,
  LAUNCH_WINDOW_DAYS,
  LEVEL_RATE_LABELS,
  PARTNER_POOL_CAP_LABEL,
} from "@/lib/partner/commission-model";
import { LOCK_HOLD_DAYS } from "@/lib/partner/format";
import { PARTNER_PAYOUT_MIN_USD } from "@/lib/partner/payout";
import { PARTNER_AGREEMENT_VERSION } from "@/lib/partner/agreement";

export type AgreementSection = { title: string; paragraphs: string[] };

export type AgreementDocument = {
  version: string;
  title: string;
  updated: string;
  sections: AgreementSection[];
};

const RATE_LINES = COMMISSION_LEVELS
  .map((level) => `Level ${level} (L${level}): ${LEVEL_RATE_LABELS[level]}`)
  .join("; ");

function buildEn(): AgreementDocument {
  return {
    version: PARTNER_AGREEMENT_VERSION,
    title: "AI MARK Partner Program Agreement",
    updated: "29 September 2026",
    sections: [
      {
        title: "Program overview",
        paragraphs: [
          "AI MARK operates a partner referral program for published AI products and qualifying sales recorded in the partner ledger.",
          "This agreement describes how the program works in the production platform today. Country Partner and Strategic Partner tiers are separate written agreements and are not covered here.",
        ],
      },
      {
        title: "Commission model (v2)",
        paragraphs: [
          `On each qualifying paid sale, commission is calculated from the amount collected (the sale amount). Published rates by network level: ${RATE_LINES}.`,
          `Together, qualified levels form an ${PARTNER_POOL_CAP_LABEL} aggregate partner pool across the network, not a single payout to one partner. AI MARK retained share on the commissionable amount is ${AI_MARK_RETAINED_SHARE_LABEL}.`,
          `Example on USD 1,000.00 with a full five-level network: L1 USD 500.00, L2 USD 150.00, L3 USD 70.00, L4 USD 50.00, L5 USD 30.00 (pool USD 800.00, retained USD 200.00).`,
          `A ${LAUNCH_WINDOW_DAYS}-day launch window after partner registration is a status flag only. It does not multiply commission rates (multiplier 1.0).`,
        ],
      },
      {
        title: "First payment and renewals",
        paragraphs: [
          "Self-serve product subscriptions bill on published 30-day periods. The referral code and partner ID attached to a subscription are frozen from the first payment and are used for renewal commission even if the buyer’s attribution cookie has expired.",
          "Each renewal that is recorded as a qualifying sale posts commission under the same v2 rules in force when the payment is confirmed.",
        ],
      },
      {
        title: "Hold, payable status, and adjustments",
        paragraphs: [
          `Commission entries are held for ${LOCK_HOLD_DAYS} days after the sale is confirmed. After the hold, entries become payable if the sale has not been refunded, charged back, or cancelled.`,
          "Refunds, chargebacks, and cancellations reverse commission through the ledger. Paid payouts are not rewritten; reversals affect what remains payable.",
        ],
      },
      {
        title: "Payouts",
        paragraphs: [
          `Partners may request a payout when payable commission is at least USD ${PARTNER_PAYOUT_MIN_USD}.00 in a single currency and payout destination details are saved on the profile.`,
          "Payouts are sent in USDC to the wallet address and network stored on your profile. AI MARK records payouts in the ledger; on-chain transfer is performed separately by the operator.",
          "Only one open payout request is allowed at a time per partner.",
        ],
      },
      {
        title: "Referral integrity",
        paragraphs: [
          "Self-referral is not permitted: you cannot earn commission by referring yourself or creating duplicate accounts to bypass network rules.",
          "Unknown, malformed, reserved, or suspended referral codes do not attribute. Sponsor relationships are created server-side; client-supplied sponsor fields are ignored.",
          "Fraudulent traffic, falsified leads, or abuse of referral links may result in suspension and forfeiture of unpaid commission at AI MARK’s discretion.",
        ],
      },
      {
        title: "Termination",
        paragraphs: [
          "AI MARK may suspend or terminate partner access for policy violations. Suspended partners cannot attract new referrals or new attributed sales.",
          "You may stop participating at any time. Accrued commission remains subject to hold, reversal, and payout rules above.",
        ],
      },
    ],
  };
}

function buildRu(): AgreementDocument {
  return {
    version: PARTNER_AGREEMENT_VERSION,
    title: "Соглашение партнёрской программы AI MARK",
    updated: "29 сентября 2026",
    sections: [
      {
        title: "Обзор программы",
        paragraphs: [
          "AI MARK ведёт партнёрскую реферальную программу для опубликованных AI-продуктов и квалифицированных продаж в реестре партнёров.",
          "Этот документ описывает работу программы в текущей production-платформе. Статусы Country Partner и Strategic Partner регулируются отдельными соглашениями.",
        ],
      },
      {
        title: "Модель комиссии (v2)",
        paragraphs: [
          `По каждой квалифицированной оплаченной продаже комиссия считается от собранной суммы. Ставки по уровням сети: ${RATE_LINES}.`,
          `Сумма по квалифицированным уровням — ${PARTNER_POOL_CAP_LABEL} агрегированного партнёрского пула, а не выплата одному партнёру. Доля AI MARK от комиссионной базы — ${AI_MARK_RETAINED_SHARE_LABEL}.`,
          `Пример на USD 1 000,00 при полной сети из пяти уровней: L1 USD 500,00, L2 USD 150,00, L3 USD 70,00, L4 USD 50,00, L5 USD 30,00 (пул USD 800,00, удержано USD 200,00).`,
          `Окно запуска ${LAUNCH_WINDOW_DAYS} дней после регистрации партнёра — только статусный флаг. Оно не умножает ставки (множитель 1,0).`,
        ],
      },
      {
        title: "Первый платёж и продления",
        paragraphs: [
          "Самообслуживаемые подписки на продукты оплачиваются периодами по 30 дней. Реферальный код и Partner ID фиксируются с первого платежа и используются для комиссии при продлении, даже если cookie атрибуции истёк.",
          "Каждое продление, записанное как квалифицированная продажа, начисляет комиссию по правилам v2, действующим на момент подтверждения оплаты.",
        ],
      },
      {
        title: "Удержание, выплата и корректировки",
        paragraphs: [
          `Комиссия удерживается ${LOCK_HOLD_DAYS} дней после подтверждения продажи. После удержания записи становятся доступны к выплате, если продажа не возвращена, не оспорена и не отменена.`,
          "Возвраты, chargeback и отмены создают сторнирующие записи в реестре. Уже отмеченные выплаты не пересчитываются; корректировки влияют на остаток к выплате.",
        ],
      },
      {
        title: "Выплаты",
        paragraphs: [
          `Партнёр может запросить выплату, когда доступная комиссия не менее USD ${PARTNER_PAYOUT_MIN_USD}.00 в одной валюте и в профиле сохранены реквизиты кошелька.`,
          "Выплаты отправляются в USDC на адрес и сеть, указанные в профиле. AI MARK фиксирует выплату в реестре; перевод в сети выполняет оператор отдельно.",
          "Допускается только один открытый запрос выплаты на партнёра.",
        ],
      },
      {
        title: "Честность реферальной программы",
        paragraphs: [
          "Самореферал запрещён: нельзя получать комиссию, приглашая себя или создавая дублирующие аккаунты.",
          "Неизвестные, некорректные, зарезервированные или приостановленные коды не атрибутируются. Связь со спонсором создаётся только на сервере; поля спонсора из клиента игнорируются.",
          "Мошеннический трафик, поддельные лиды или злоупотребление ссылками могут привести к приостановке и аннулированию невыплаченной комиссии по решению AI MARK.",
        ],
      },
      {
        title: "Прекращение участия",
        paragraphs: [
          "AI MARK может приостановить или прекратить доступ партнёра при нарушении правил. Приостановленные партнёры не могут привлекать новых рефералов и новых атрибутированных продаж.",
          "Вы можете прекратить участие в любой момент. Начисленная комиссия остаётся под действием правил удержания, сторно и выплат выше.",
        ],
      },
    ],
  };
}

export function partnerAgreement(locale: string): AgreementDocument {
  return locale === "ru" ? buildRu() : buildEn();
}

export const partnerAgreementHeader: Record<string, { title: string; notice: string }> = {
  en: { title: "Partner agreement", notice: "" },
  ru: { title: "Партнёрское соглашение", notice: "" },
  de: {
    title: "Partnervereinbarung",
    notice: "Full text is provided in English while translations are prepared.",
  },
  fr: {
    title: "Accord partenaire",
    notice: "Le texte intégral est en anglais dans l’attente de la traduction.",
  },
  es: {
    title: "Acuerdo de partners",
    notice: "El texto completo está en inglés hasta disponer traducción.",
  },
  pt: {
    title: "Acordo de parceiros",
    notice: "O texto integral está em inglês até haver tradução.",
  },
  ja: {
    title: "パートナー規約",
    notice: "正文は英語版を表示しています（翻訳準備中）。",
  },
  zh: {
    title: "合作伙伴协议",
    notice: "正文暂为英文版本。",
  },
  ar: {
    title: "اتفاقية الشركاء",
    notice: "النص الكامل باللغة الإنجليزية حتى توفر الترجمة.",
  },
  tr: {
    title: "İş ortaklığı sözleşmesi",
    notice: "Tam metin çeviri hazır olana kadar İngilizce sunulur.",
  },
  vi: {
    title: "Thoả thuận đối tác",
    notice: "Bản đầy đủ tạm thời là tiếng Anh.",
  },
  id: {
    title: "Perjanjian mitra",
    notice: "Teks lengkap dalam bahasa Inggris hingga terjemahan tersedia.",
  },
};
