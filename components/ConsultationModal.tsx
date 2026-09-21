"use client";

import { useState, useEffect } from "react";
import type { Locale } from "@/lib/site";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  productName: string;
  defaultScenario?: string;
}

export function ConsultationModal({
  isOpen,
  onClose,
  locale,
  productName,
  defaultScenario = "product",
}: ConsultationModalProps) {
  const isRu = locale === "ru";
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    messenger: "",
    message: "",
  });

  useEffect(() => {
    if (!isOpen) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          messenger: form.messenger.trim(),
          company: form.company.trim() || productName,
          scenario: defaultScenario,
          message: form.message.trim(),
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setErrorMessage(
        isRu
          ? "Ошибка отправки. Пожалуйста, проверьте данные или напишите на hello@ai-mark.agency"
          : "Failed to send. Please check your info or contact hello@ai-mark.agency"
      );
    } finally {
      setSubmitting(false);
    }
  }

  const fieldCls =
    "w-full rounded-lg border border-line bg-ink-3/40 px-3.5 py-2.5 text-xs text-paper placeholder:text-muted/60 focus:border-mark focus:outline-none";

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 shadow-2xl my-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg border border-line bg-ink-3 text-sm text-muted hover:text-paper transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500/15 text-xl text-emerald-600">
              ✓
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-paper">
              {isRu ? "Заявка успешно отправлена" : "Request Received Successfully"}
            </h3>
            <p className="mt-2 text-xs text-muted leading-relaxed max-w-sm mx-auto">
              {isRu
                ? `Спасибо! Наша команда свяжется с вами в течение 15–30 минут для согласования подключения ${productName}.`
                : `Thank you! Our engineering team will reach out within 15–30 minutes to coordinate deployment for ${productName}.`}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex rounded-full bg-mark px-6 py-2.5 text-xs font-semibold text-mark-ink"
            >
              {isRu ? "Закрыть" : "Close"}
            </button>
          </div>
        ) : (
          <div>
            <span className="font-mono text-[10px] text-warm uppercase tracking-widest">
              AI Mark // {productName}
            </span>
            <h3 className="mt-1 font-display text-xl font-semibold text-paper">
              {isRu ? "Запрос на подключение" : "Deployment Request"}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {isRu
                ? "Заполните короткую форму для расчёта конфигурации и демонстрации."
                : "Fill out the brief form below to schedule a direct product walkthrough."}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-medium text-paper/85">
                  {isRu ? "Ваше имя *" : "Your Name *"}
                  <input
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={isRu ? "Алексей" : "Alex"}
                    className={`${fieldCls} mt-1`}
                  />
                </label>
                <label className="block text-xs font-medium text-paper/85">
                  {isRu ? "Компания / Бренд *" : "Company / Brand *"}
                  <input
                    required
                    maxLength={120}
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder={isRu ? "ООО или Название проекта" : "Company or project name"}
                    className={`${fieldCls} mt-1`}
                  />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-medium text-paper/85">
                  Email *
                  <input
                    type="email"
                    required
                    maxLength={150}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@company.com"
                    className={`${fieldCls} mt-1`}
                  />
                </label>
                <label className="block text-xs font-medium text-paper/85">
                  Telegram / WhatsApp *
                  <input
                    required
                    maxLength={100}
                    value={form.messenger}
                    onChange={(e) => setForm({ ...form, messenger: e.target.value })}
                    placeholder="@username или телефон"
                    className={`${fieldCls} mt-1`}
                  />
                </label>
              </div>

              <label className="block text-xs font-medium text-paper/85">
                {isRu ? "Задачи, объём или комментарий" : "Goals, scope or comments"}
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={
                    isRu
                      ? "Опишите специфику ниши, текущий объём обращений или контента..."
                      : "Briefly specify your niche, current inquiry or content volume..."
                  }
                  className={`${fieldCls} mt-1 resize-none`}
                />
              </label>

              {errorMessage && (
                <p className="text-xs text-red-600 bg-red-500/10 p-2.5 rounded-lg">
                  {errorMessage}
                </p>
              )}

              <div className="pt-2 flex items-center justify-between gap-3">
                <p className="text-[10px] text-muted">
                  {isRu ? "Конфиденциально · Без спама" : "Strict NDA · Zero spam"}
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-mark px-6 py-2.5 text-xs font-semibold text-mark-ink shadow hover:bg-mark-light transition-all disabled:opacity-50"
                >
                  {submitting
                    ? isRu
                      ? "Отправка..."
                      : "Sending..."
                    : isRu
                    ? "Отправить заявку"
                    : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
