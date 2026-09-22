/**
 * Shared class strings for AI Mark's functional surfaces (the Partner
 * Platform and the auth screens).
 *
 * These build on the primitives already used by the public site (ContactForm's
 * field, ContactCta's pill button) and on the tokens in `app/globals.css`, so
 * the platform reads as the same product. Corners are rounder and spacing is
 * denser than the editorial pages because these screens are tools.
 */

export const eyebrowClass =
  "font-mono text-[11px] uppercase tracking-[0.2em] text-mark";

export const labelClass = "grid gap-1.5 text-sm";

export const fieldClass =
  "w-full rounded-xl border border-line bg-ink px-3.5 py-2.5 text-sm text-paper " +
  "outline-none transition-colors placeholder:text-muted/70 " +
  "focus:border-mark focus:ring-2 focus:ring-mark/20 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-mark px-5 py-3 " +
  "text-sm font-semibold text-mark-ink transition-colors hover:bg-mark-light " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-line px-4 py-2 " +
  "text-xs font-medium text-muted transition-colors hover:border-line-strong hover:text-paper " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export const cardClass =
  "rounded-2xl border border-line bg-ink-2 shadow-[var(--shadow-md)]";

export const noticeErrorClass =
  "rounded-xl border border-danger/30 bg-danger/5 px-3.5 py-2.5 text-xs text-danger";

export const noticeSuccessClass =
  "rounded-xl border border-mark/30 bg-mark/5 px-3.5 py-2.5 text-xs text-mark";
