AI MARK — web brand assets
==========================

Source: the approved "AI MARK — logo package" (symbol: AM Loop; palette:
amber/orange + graphite). The AM Loop geometry, its proportions and the
approved coordinates are unchanged in every file here.

Files
-----
ai-mark-logo.svg                 primary horizontal lockup — AM Loop + AI MARK +
                                 descriptor. Tight crop, transparent, dark ink
                                 for light surfaces. Use at large sizes.
ai-mark-logo-on-dark.svg         same lockup, light ink, transparent — for dark
                                 surfaces.
ai-mark-logo-compact.svg         AM Loop + AI MARK wordmark, no descriptor.
                                 Site header / footer lockup.
ai-mark-logo-compact-on-dark.svg same, light ink.
ai-mark-symbol.svg               standalone AM Loop mark, transparent.
ai-mark-symbol-on-dark.svg       same mark with a light graphite stroke so the
                                 middle of the loop still reads on dark.
ai-mark-icon.svg                 square app-icon tile: AM Loop on ivory, so
                                 both strokes survive at 16px.
ai-mark-logo-card.svg            the dark card lockup exactly as delivered
                                 (opaque #111827 plate) — for documents,
                                 slide decks and social where a plate is wanted.

These files are derived, not hand-edited. Differences from the delivered
package, and why:

1. Wordmark converted to outlines. The package draws the wordmark as live
   <text font-family="Inter, Arial, Helvetica">. Inter is not installed
   everywhere, so the logo would silently fall back to a different grotesque.
   The package README sanctions outlining; the outlines were generated from
   Inter's variable font at the approved sizes and letter-spacing
   (wght 800 / 92 / -4 for the wordmark, wght 500 / 21 / +5.2 for the
   descriptor). Layout is otherwise identical.

2. Tight crop. The delivered artboard is 1120x230 but the ink stops at x≈905,
   leaving ~19% dead space on the right that would misalign the lockup in any
   layout. The web lockups are cropped to their ink bounds (padded to whole
   units so <img width height> can mirror the viewBox exactly).
   ai-mark-logo-card.svg keeps the original 1120x230 artboard.

3. Dark-surface variants. The package ships one dark version with an opaque
   plate. A plate is wrong for a sticky header, so transparent light-ink
   variants were added. As in the delivered dark version, the loop keeps its
   graphite stroke; on very dark surfaces that segment is deliberately subtle.

Where they are used
-------------------
- components/BrandLogo.tsx renders the compact lockup in the header and footer
  and swaps ink off `[data-theme]` (see app/globals.css, `.brand-logo`).
- app/icon.svg, app/favicon.ico (16/32/48) and app/apple-icon.png (180, opaque
  and square for iOS) are all rasterised from ai-mark-icon.svg. The apple icon
  is the same artwork with the tile bled to the edges.

Link previews (Open Graph / Twitter)
------------------------------------
public/og/ai-mark-preview-en.jpg and ai-mark-preview-ru.jpg are the client's
supplied 1734x907 composites, scaled to cover 1200x630 and re-encoded as JPEG
q90 (168 KB / 173 KB, from 1.7 MB PNG). Text stays crisp at that setting.
They are served per locale by app/[locale]/opengraph-image.tsx, which every
route under /[locale] inherits; app/[locale]/twitter-image.tsx reuses it.
Pages that build their own `openGraph` object must also carry the image
explicitly — Next merges metadata segments shallowly, so the nested product and
investors pages would otherwise drop it. lib/social.ts exists for that.
