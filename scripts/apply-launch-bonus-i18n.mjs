/**
 * One-off patch: partner-program terms + partners page copy (12 locales).
 * Run: node scripts/apply-launch-bonus-i18n.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");

const locales = [
  "en", "ru", "es", "pt", "ar", "zh", "id", "vi", "de", "fr", "ja", "tr",
];

const termsByLocale = {
  en: {
    note:
      "Launch bonus (until 31 Dec 2026) on a client's first 3 paid months: L1 50%, L2 15%, L3 7%, L4 5%, L5 3% — 80% aggregate pool, not one partner's payout. From month 4, renewals pay L1 20% + L2 5%. Standard from 1 Jan 2027: months 1–3 use L1 35%, L2 10%, L3 5% (50% pool); renewals unchanged. AI Mark retained share is the remainder. Commissions only on qualifying paid sales. No sign-up bonus. 14-day hold.",
    launchBonus:
      "Launch bonus · until 31.12.2026 applies to each client's first three monthly payments only, not every renewal forever.",
    standardFrom:
      "From 01.01.2027 the standard grid applies to months 1–3: L1 35%, L2 10%, L3 5% (50% pool). Renewals stay L1 20% + L2 5%.",
    example:
      "On a $1,000 commissionable sale with a full five-level network in months 1–3 (launch bonus): L1 $500, L2 $150, L3 $70, L4 $50, L5 $30 — pool $800, retained $200. The direct (L1) partner receives $500, not $800.",
    exampleRenewal:
      "Same $1,000 sale from month 4 onward (renewal): L1 $200, L2 $50 — pool $250, retained $750.",
    recurringA:
      "Subscriptions can pay recurring commission. Months 1–3 use the launch bonus or standard initial grid (by payment date). Month 4+ renewals use L1 20% + L2 5% only.",
  },
  ru: {
    note:
      "Launch bonus (до 31.12.2026) на первые 3 месяца оплат клиента: L1 50%, L2 15%, L3 7%, L4 5%, L5 3% — совокупный пул 80%, не выплата одному партнёру. С 4-го месяца продления: L1 20% + L2 5%. Стандарт с 01.01.2027: месяцы 1–3 — L1 35%, L2 10%, L3 5% (пул 50%); продления без изменений. Доля AI Mark — остаток. Комиссия только с реальных оплат. Без бонуса за регистрацию. Удержание 14 дней.",
    launchBonus:
      "Launch bonus · до 31.12.2026 — только на первые три месяца платежей клиента, не на все продления бессрочно.",
    standardFrom:
      "С 01.01.2027 стандартная сетка для месяцев 1–3: L1 35%, L2 10%, L3 5% (пул 50%). Продления: L1 20% + L2 5%.",
    example:
      "С продажи на $1000 при полной сети в месяцы 1–3 (launch bonus): L1 $500, L2 $150, L3 $70, L4 $50, L5 $30 — пул $800, доля AI Mark $200. Прямой партнёр (L1) получает $500, не $800.",
    exampleRenewal:
      "Та же продажа $1000 с 4-го месяца (продление): L1 $200, L2 $50 — пул $250, доля AI Mark $750.",
    recurringA:
      "Подписки могут давать повторяющуюся комиссию. Месяцы 1–3 — launch bonus или стандартная сетка (по дате оплаты). С 4-го месяца — только L1 20% + L2 5%.",
  },
};

for (const loc of locales) {
  const t = termsByLocale[loc] ?? termsByLocale.en;
  // partner-program is regenerated separately via TS — skip here
}

// Patch partners/*.ts FAQ and notes via regex (all locales share structure)
const faqOld =
  /a: "Yes\. Every qualifying renewal payment follows the same schedule: L1 50%, L2 15%, L3 7%, L4 5%, L5 3%, with an 80% aggregate pool\. The first 90 days do not change those rates\." \}/;
const faqNew = `a: "Yes. Months 1–3 use the launch bonus grid (until 31 Dec 2026) or the standard initial grid from 1 Jan 2027. From month 4, renewals pay L1 20% + L2 5% only." }`;

for (const loc of locales) {
  const path = join(root, `content/partners/${loc}.ts`);
  let text = readFileSync(path, "utf8");
  if (faqOld.test(text)) {
    text = text.replace(faqOld, faqNew);
  }
  // RU FAQ variant
  text = text.replace(
    /первые 90 дней ставки не меняют\./g,
    "с 4-го месяца — только L1 20% + L2 5%.",
  );
  text = text.replace(
    /с совокупным пулом 80% по квалифицированным уровням\. Первые 90 дней ставки не меняют\./,
    "на месяцы 1–3 (launch bonus до 31.12.2026 или стандарт с 01.01.2027). С 4-го месяца — L1 20% + L2 5%.",
  );
  text = text.replace(/The first 90 days do not change those rates\./g, "");
  text = text.replace(/Los primeros 90 días no cambian esas tasas\./g, "");
  text = text.replace(/Die ersten 90 Tage ändern diese Sätze nicht\./g, "");
  text = text.replace(/Les 90 premiers jours ne modifient pas ces taux\./g, "");
  text = text.replace(/Os primeiros 90 dias não alteram essas taxas\./g, "");
  text = text.replace(/أول 90 يومًا لا تغيّر هذه النسب\./g, "");
  text = text.replace(/前 90 天不改变这些比例\./g, "");
  text = text.replace(/90 hari pertama tidak mengubah tarif itu\./g, "");
  text = text.replace(/90 ngày đầu không đổi các tỷ lệ này\./g, "");
  text = text.replace(/初めの90日間で料率が下がることはありません\./g, "");
  text = text.replace(/İlk 90 gün bu oranları değiştirmez\./g, "");
  writeFileSync(path, text);
}

console.log("Patched partners FAQ strings.");
