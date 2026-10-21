/**
 * AI MARK brand lockup — approved raster crops from ai-mark-logo-master.png.
 *
 *   crop="full"    — mark + AI MARK + AI-NATIVE VENTURE & MARKETING (1844×327)
 *   crop="compact" — wordmark band only (1844×261), for footer HTML subtitle
 */
type BrandLogoProps = {
  className?: string;
  crop?: "full" | "compact";
};

const FULL = { w: 1844, h: 327 } as const;
const COMPACT = { w: 1844, h: 261 } as const;

export function BrandLogo({ className = "", crop = "compact" }: BrandLogoProps) {
  const dims = crop === "full" ? FULL : COMPACT;
  const alt =
    crop === "full"
      ? "AI MARK — AI-NATIVE VENTURE & MARKETING"
      : "AI MARK";

  return (
    <span
      className={`brand-plate ${crop === "full" ? "brand-plate--full" : "brand-plate--compact"} ${className}`}
    >
      <picture className="brand-logo-light">
        <img
          src={
            crop === "full"
              ? "/brand/ai-mark-logo-light.png"
              : "/brand/ai-mark-logo-compact-light.png"
          }
          alt={alt}
          width={dims.w}
          height={dims.h}
          className={`brand-logo ${crop === "full" ? "brand-logo--full" : "brand-logo--compact"}`}
        />
      </picture>
      <picture className="brand-logo-dark">
        <img
          src={
            crop === "full"
              ? "/brand/ai-mark-logo-dark.png"
              : "/brand/ai-mark-logo-compact-dark.png"
          }
          alt=""
          width={dims.w}
          height={dims.h}
          className={`brand-logo ${crop === "full" ? "brand-logo--full" : "brand-logo--compact"}`}
          aria-hidden
        />
      </picture>
    </span>
  );
}
