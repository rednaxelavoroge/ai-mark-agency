/**
 * AI MARK brand lockup (AM Loop + wordmark).
 *
 * The site theme is a user toggle stored on `data-theme`, not a
 * `prefers-color-scheme` query, so the ink swap is driven by CSS rather than a
 * media query. Both files are mounted and the inactive one is `display: none`,
 * which also removes it from the accessibility tree — the home link keeps
 * exactly one accessible name instead of two.
 *
 * Plain <img> on purpose: the next/image optimizer refuses SVG unless
 * `dangerouslyAllowSVG` is switched on, and these assets are already ~6 KB of
 * vector with no raster variants to negotiate.
 */
export function BrandLogo({ className = "" }: { className?: string }) {
  const layout = {
    width: 650,
    height: 106,
    className: `brand-logo ${className}`,
  } as const;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- see component note above */}
      <img src="/brand/ai-mark-logo-compact.svg" alt="AI MARK" data-ink="light" {...layout} />
      {/* eslint-disable-next-line @next/next/no-img-element -- see component note above */}
      <img src="/brand/ai-mark-logo-compact-on-dark.svg" alt="AI MARK" data-ink="dark" {...layout} />
    </>
  );
}
