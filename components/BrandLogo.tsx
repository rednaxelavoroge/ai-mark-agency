/**
 * AI MARK brand lockup — the approved raster package, wordmark only.
 *
 * Both files are crops of the one client-approved PNG
 * (`public/brand/ai-mark-logo-master.png`); nothing here redraws, recolours,
 * re-typesets or re-proportions the artwork, it only constrains how much space
 * the art may occupy:
 *
 *   ai-mark-logo-light/dark.png          the "AI MARK" wordmark + the
 *                                        "AI-NATIVE VENTURE & MARKETING"
 *                                        descriptor.
 *   ai-mark-logo-compact-light/dark.png  the same crop with only the descriptor
 *                                        band removed, for viewports where a
 *                                        ~4 px descriptor would be unreadable
 *                                        microtext.
 *
 * The orange AM symbol that opens the master file is deliberately NOT part of
 * the header lockup: the brand mark already appears on its own (app icon,
 * favicon), and pairing the full symbol with the wordmark inside a 20–40 px
 * header slot repeated it at both ends of the strip. The wordmark alone is the
 * header artwork; see the crop note in public/brand/README.txt.
 *
 * A native <picture> picks the theme source, so exactly one file is ever
 * painted and only one is downloaded — no CSS `display` juggling, and the home
 * link keeps a single accessible name from the <img> fallback.
 *
 * Plain <img> on purpose: these are fixed rasters with no responsive variants
 * for the optimizer to negotiate.
 */
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-plate ${className}`}>
      {/* Light theme artwork */}
      <picture className="brand-logo-light">
        <source media="(min-width: 640px)" srcSet="/brand/ai-mark-logo-light.png" />
        <img
          src="/brand/ai-mark-logo-compact-light.png"
          alt="AI MARK — AI-NATIVE VENTURE & MARKETING"
          width={1201}
          height={261}
          className="brand-logo"
        />
      </picture>
      {/* Dark theme artwork */}
      <picture className="brand-logo-dark">
        <source media="(min-width: 640px)" srcSet="/brand/ai-mark-logo-dark.png" />
        <img
          src="/brand/ai-mark-logo-compact-dark.png"
          alt="AI MARK — AI-NATIVE VENTURE & MARKETING"
          width={1201}
          height={261}
          className="brand-logo"
        />
      </picture>
    </span>
  );
}
