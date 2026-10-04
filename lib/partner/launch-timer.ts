import { LAUNCH_BONUS_END_DATE } from "./commission-model.ts";
import type { Locale } from "../site.ts";

export type LaunchBonusTimerInfo = {
  active: boolean;
  daysRemaining: number;
  formattedDate: string;
};

/**
 * Returns timer info if the launch bonus window is still active.
 * Automatically returns null when now > LAUNCH_BONUS_END_DATE (2026-12-31).
 */
export function getLaunchBonusTimer(now: Date = new Date()): LaunchBonusTimerInfo | null {
  const end = new Date(`${LAUNCH_BONUS_END_DATE}T23:59:59.999Z`);
  const diffMs = end.getTime() - now.getTime();
  if (diffMs <= 0) {
    return null;
  }

  // Integer days remaining (minimum 1 if active)
  const daysRemaining = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  // Format date as DD.MM.YYYY
  const [year, month, day] = LAUNCH_BONUS_END_DATE.split("-");
  const formattedDate = `${day}.${month}.${year}`;

  return {
    active: true,
    daysRemaining,
    formattedDate,
  };
}

/**
 * Russian pluralization for "день" (1 день, 2-4 дня, 5-20 дней).
 */
function ruDays(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return `${n} дней`;
  if (mod10 === 1) return `${n} день`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} дня`;
  return `${n} дней`;
}

/**
 * Multilingual format string for the 80% launch bonus timer banner.
 */
export function formatLaunchBonusTimerText(
  timer: LaunchBonusTimerInfo,
  locale: string | Locale = "en",
): string {
  const { daysRemaining, formattedDate } = timer;
  const n = daysRemaining;

  switch (locale) {
    case "ru":
      return `Бонус 80% до ${formattedDate} — осталось ${ruDays(n)}`;
    case "es":
      return `Bono 80% hasta ${formattedDate} — quedan ${n} ${n === 1 ? "día" : "días"}`;
    case "pt":
      return `Bônus de 80% até ${formattedDate} — restam ${n} ${n === 1 ? "dia" : "dias"}`;
    case "de":
      return `80% Bonus bis ${formattedDate} — noch ${n} ${n === 1 ? "Tag" : "Tage"}`;
    case "fr":
      return `Bonus 80% jusqu'au ${formattedDate} — ${n} ${n === 1 ? "jour restant" : "jours restants"}`;
    case "zh":
      return `80% 启动奖励至 ${formattedDate} — 仅剩 ${n} 天`;
    case "ar":
      return `مكافأة 80% حتى ${formattedDate} — متبقي ${n} يوم`;
    case "ja":
      return `80% ローンチボーナス ${formattedDate} まで — 残り ${n} 日`;
    case "tr":
      return `${formattedDate} tarihine kadar %80 bonus — ${n} gün kaldı`;
    case "id":
      return `Bonus 80% hingga ${formattedDate} — tersisa ${n} hari`;
    case "vi":
      return `Thưởng 80% đến ${formattedDate} — còn ${n} ngày`;
    case "en":
    default:
      return `80% bonus until ${formattedDate} — ${n} ${n === 1 ? "day" : "days"} remaining`;
  }
}
