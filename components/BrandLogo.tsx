/**
 * AI MARK brand lockup — full approved raster (1844×327).
 * Mark + AI MARK + AI-NATIVE VENTURE & MARKETING from ai-mark-logo-master.png.
 */
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-plate ${className}`}>
      <picture className="brand-logo-light">
        <img
          src="/brand/ai-mark-logo-light.png"
          alt="AI MARK — AI-NATIVE VENTURE & MARKETING"
          width={1844}
          height={327}
          className="brand-logo"
        />
      </picture>
      <picture className="brand-logo-dark">
        <img
          src="/brand/ai-mark-logo-dark.png"
          alt=""
          width={1844}
          height={327}
          className="brand-logo"
          aria-hidden
        />
      </picture>
    </span>
  );
}
