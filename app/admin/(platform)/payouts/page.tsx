import type { Metadata } from "next";
import Link from "next/link";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { PayoutDestinationText } from "@/components/platform/PayoutDestination";
import {
  cardClass,
  fieldClass,
  labelClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/ui/classes";
import {
  getAdminPayableEntries,
  getAdminPayoutInstructions,
  getAdminPayouts,
  getAdminPayoutSheet,
  type PayoutInstruction,
  requireAdmin,
} from "@/lib/auth/dal";
import { NO_DATA, formatDateTime, formatStoredMoney } from "@/lib/partner/format";
import { ANTI_FRAUD_FLAG_DESCRIPTIONS, type AntiFraudFlag } from "@/lib/partner/anti-fraud";
import {
  advanceDueLocks,
  approveCommissionAction,
  confirmPartnerPayout,
  createPartnerPayout,
  rejectCommissionAction,
  voidPartnerPayout,
} from "./actions";

export const metadata: Metadata = { title: "Ведомость выплат · Payouts" };

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

const EMPTY_INSTRUCTION: PayoutInstruction = { recipient: null, details: null };

export default async function AdminPayoutsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin("/admin/payouts");
  const params = await searchParams;

  const [payouts, payable, sheet] = await Promise.all([
    getAdminPayouts(),
    getAdminPayableEntries(),
    getAdminPayoutSheet(),
  ]);

  const partnerIds = [
    ...(payable.rows ?? []).map((entry) => entry.beneficiary_partner_id),
    ...(payouts.rows ?? []).map((payout) => payout.partner_id),
  ];
  const instructions = await getAdminPayoutInstructions(partnerIds);
  const instructionFor = (partnerId: string): PayoutInstruction =>
    instructions.byPartner.get(partnerId) ?? EMPTY_INSTRUCTION;

  // Filter out any entries currently under review from grouping for open payouts
  const underReviewIds = new Set(
    (sheet.rows ?? [])
      .filter((r) => r.status === "under_review" || r.status === "rejected")
      .map((r) => r.id),
  );

  const groups = new Map<
    string,
    { partnerId: string; currency: string; count: number }
  >();
  for (const entry of payable.rows ?? []) {
    // Exclude flagged entries from payouts until approved
    if (underReviewIds.has(entry.id)) continue;

    const key = `${entry.beneficiary_partner_id}\0${entry.currency}`;
    const existing = groups.get(key);
    if (existing) existing.count += 1;
    else {
      groups.set(key, {
        partnerId: entry.beneficiary_partner_id,
        currency: entry.currency,
        count: 1,
      });
    }
  }

  const error = first(params.error);
  const notice = first(params.approved)
    ? "Комиссия одобрена админом и допущена к выплате."
    : first(params.rejected)
      ? "Комиссия отклонена админом."
      : first(params.locked)
        ? `Холд продвинут: ${first(params.locked)} комиссий.`
        : first(params.created)
          ? "Выплата открыта из допущенных начислений."
          : first(params.confirmed)
            ? "Выплата отмечена как выплаченная в реестре с tx hash. Деньги отправляются вручную."
            : first(params.voided)
              ? "Выплата аннулирована."
              : "";

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Консоль администратора"
        title="Ведомость выплат и антифрод"
        lead="Список начисленных комиссий к выплате по партнёрам, проверка антифрод-флагов, подтверждение выплат с фиксацией tx hash и экспорт ведомости. Деньги автоматически не отправляются."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/api/admin/payouts/export"
              download
              className={`inline-flex items-center gap-1.5 ${secondaryButtonClass}`}
            >
              <span>⬇ Экспорт CSV</span>
            </a>
          </div>
        }
      />

      {notice ? (
        <div className="rounded-xl border border-mark/40 bg-mark/10 p-3 text-sm text-paper" role="status">
          {notice}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-xl border border-danger/40 bg-danger/10 p-3 text-sm text-danger" role="alert">
          {error}
        </div>
      ) : null}

      {/* 1. ВЕДОМОСТЬ НАЧИСЛЕННЫХ КОМИССИЙ И АНТИФРОД-ПРОВЕРКА */}
      <section className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold tracking-tight">
              Ведомость начислений и антифрод-контроль
            </h2>
            <p className="mt-0.5 max-w-2xl text-xs leading-relaxed text-muted">
              Комиссии к выплате, кошельки партнёров и флаги правил безопасности. Флагнутые комиссии получают статус «На проверке» и в выплату не попадают до одобрения.
            </p>
          </div>
        </div>

        <DataTable
          unreadable={sheet.unreadable}
          empty="Нет начисленных комиссий в ведомости."
          columns={["Партнёр", "Уровень", "Сумма USDT", "Кошелёк", "Статус", "Антифрод-флаги", "Дата", "Действие"]}
          rows={(sheet.rows ?? []).map((row) => {
            const statusBadge =
              row.status === "under_review" ? (
                <span className="inline-flex items-center rounded-full border border-danger/40 bg-danger/10 px-2 py-0.5 text-[10px] font-semibold text-danger">
                  На проверке
                </span>
              ) : row.status === "rejected" ? (
                <span className="inline-flex items-center rounded-full border border-line bg-ink-3 px-2 py-0.5 text-[10px] font-medium text-muted">
                  Отклонено
                </span>
              ) : row.status === "paid" ? (
                <span className="inline-flex items-center rounded-full border border-mark/40 bg-mark/10 px-2 py-0.5 text-[10px] font-medium text-mark">
                  Выплачено
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full border border-warm/40 bg-warm/10 px-2 py-0.5 text-[10px] font-medium text-warm">
                  Готово к выплате
                </span>
              );

            const flagsBadges =
              row.flags.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {row.flags.map((f) => {
                    const desc = ANTI_FRAUD_FLAG_DESCRIPTIONS[f as AntiFraudFlag]?.ru ?? f;
                    return (
                      <span
                        key={f}
                        title={desc}
                        className="rounded border border-danger/30 bg-danger/5 px-1.5 py-0.5 text-[10px] text-danger"
                      >
                        {f}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <span className="text-[11px] text-muted">Чисто</span>
              );

            const actionCell =
              row.status === "under_review" ? (
                <div className="flex flex-wrap gap-1.5">
                  <form action={approveCommissionAction}>
                    <input type="hidden" name="commission_id" value={row.id} />
                    <button
                      type="submit"
                      className="rounded bg-mark/20 px-2 py-1 text-[11px] font-medium text-mark hover:bg-mark/30"
                    >
                      Одобрить
                    </button>
                  </form>
                  <form action={rejectCommissionAction}>
                    <input type="hidden" name="commission_id" value={row.id} />
                    <button
                      type="submit"
                      className="rounded bg-danger/20 px-2 py-1 text-[11px] font-medium text-danger hover:bg-danger/30"
                    >
                      Отклонить
                    </button>
                  </form>
                </div>
              ) : row.status === "payable" ? (
                <span className="text-[11px] text-muted">Одобрено</span>
              ) : (
                <span className="text-[11px] text-muted">—</span>
              );

            return [
              <span key="p" className="font-mono text-xs">{row.partnerId}</span>,
              `L${row.level}`,
              <span key="a" className="font-mono font-medium">{formatStoredMoney(row.amount, row.currency)}</span>,
              <PayoutDestinationText
                key="d"
                recipient={row.wallet}
                details={row.walletDetails}
              />,
              statusBadge,
              flagsBadges,
              formatDateTime(row.createdAt),
              actionCell,
            ];
          })}
        />
      </section>

      {/* 2. РЕЕСТР ВЫПЛАТ С ВВОДОМ TX HASH */}
      <section className="grid gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">Реестр выплат (выплата и tx hash)</h2>
          <p className="max-w-2xl text-xs leading-relaxed text-muted">
            Выплаты формируются по проверенным комиссиям. Деньги автоматически не отправляются: отправьте токены вручную в сети блокчейн, укажите хэш транзакции (tx hash) и нажмите «Отметить выплаченным».
          </p>
        </div>

        <DataTable
          unreadable={payouts.unreadable}
          empty="Нет зарегистрированных выплат."
          columns={["Партнёр", "Статус", "Сумма", "Кошелёк", "Создана", "Tx Hash / Подтверждение"]}
          rows={(payouts.rows ?? []).map((payout) => {
            const instruction = instructionFor(payout.partner_id);
            return [
              <span key="p" className="font-mono text-xs">{payout.partner_id}</span>,
              payout.status,
              formatStoredMoney(payout.amount, payout.currency),
              <PayoutDestinationText
                key={payout.id}
                recipient={instruction.recipient}
                details={instruction.details}
              />,
              formatDateTime(payout.created_at),
              payout.status === "open" ? (
                <div key={payout.id} className="flex flex-col gap-2 py-1">
                  <form action={confirmPartnerPayout} className="flex flex-wrap items-center gap-2">
                    <input type="hidden" name="payout_id" value={payout.id} />
                    <input
                      name="tx_hash"
                      required
                      placeholder="Хэш транзакции (0x... / solana)"
                      className={`h-8 text-xs font-mono min-w-44 ${fieldClass}`}
                    />
                    <button type="submit" className={`h-8 px-3 text-xs ${primaryButtonClass}`}>
                      Отметить выплаченным
                    </button>
                  </form>
                  <form action={voidPartnerPayout}>
                    <input type="hidden" name="payout_id" value={payout.id} />
                    <button type="submit" className="text-[11px] text-muted hover:text-danger hover:underline">
                      Аннулировать выплату
                    </button>
                  </form>
                </div>
              ) : (
                <div key={payout.id} className="text-xs">
                  <span className="text-muted">Оплачено: </span>
                  {formatDateTime(payout.paid_at)}
                </div>
              ),
            ];
          })}
        />
      </section>

      {/* 3. ОТКРЫТЬ ВЫПЛАТУ ПО ПРОВЕРЕННЫМ НАЧИСЛЕНИЯМ */}
      <section className="grid gap-4">
        <h2 className="text-sm font-semibold tracking-tight">Открыть выплату</h2>
        <p className="max-w-2xl text-xs leading-relaxed text-muted">
          Каждая кнопка открывает одну выплату по партнёру и валюте из проверенных и допущенных начислений. Флагнутые комиссии исключены.
        </p>
        {payable.unreadable ? (
          <p className="text-sm text-muted">{NO_DATA} Доступные начисления не удалось прочитать.</p>
        ) : groups.size === 0 ? (
          <p className="text-sm text-muted">Нет партнёров, ожидающих выплаты (или все ожидающие находятся на проверке антифродом).</p>
        ) : (
          <div className="grid gap-3">
            {[...groups.values()].map((group) => {
              const instruction = instructionFor(group.partnerId);
              return (
                <form
                  key={`${group.partnerId}-${group.currency}`}
                  action={createPartnerPayout}
                  className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-line bg-ink-2 p-4"
                >
                  <input type="hidden" name="partner_id" value={group.partnerId} />
                  <input type="hidden" name="currency" value={group.currency} />
                  <div className="grid gap-2">
                    <p className="font-mono text-sm text-paper">
                      {group.partnerId} · {group.currency} · {group.count}{" "}
                      {group.count === 1 ? "начисление" : "начислений"}
                    </p>
                    <PayoutDestinationText
                      recipient={instruction.recipient}
                      details={instruction.details}
                    />
                  </div>
                  <button type="submit" className={primaryButtonClass}>
                    Открыть выплату
                  </button>
                </form>
              );
            })}
          </div>
        )}
      </section>

      <div className={`flex flex-wrap items-center justify-between gap-4 p-5 ${cardClass}`}>
        <div>
          <h3 className="text-sm font-semibold text-paper">Продвижение 14-дневного периода удержания</h3>
          <p className="text-xs text-muted">Переводит подтверждённые продажи старше 14 дней в статус доступных к выплате.</p>
        </div>
        <form action={advanceDueLocks}>
          <button type="submit" className={secondaryButtonClass}>
            Продвинуть холды (старше 14 дней)
          </button>
        </form>
      </div>
    </div>
  );
}
