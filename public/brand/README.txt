AI MARK — web brand assets
==========================

Approved artwork (single source of truth)
-----------------------------------------
The client-approved AI MARK lockup is the PNG delivered on 2026-09-22:

  ai-mark-logo-master.png   the delivered file, byte-for-byte (2172x724).
                            Source for every other asset in this folder.
                            Not referenced by the UI.

Production assets used by the site
----------------------------------
  ai-mark-logo-light.png    the delivered artwork, cropped tight to the
  ai-mark-logo-dark.png     "AI MARK" wordmark only — the leading orange AM
                            symbol is cropped away — and re-padded evenly
                            (1201x327). Carries the wordmark plus the
                            "AI-NATIVE VENTURE & MARKETING" descriptor.
                            Rendered by components/BrandLogo.tsx from 640px up
                            (header, footer, auth screens, Partner Platform).
                            Light/dark are the same geometry with the wordmark
                            inked for that theme's surface.
  ai-mark-logo-compact-light.png
  ai-mark-logo-compact-dark.png
                            the same wordmark-only crop with only the descriptor
                            band removed (1201x261). Used below 640px, where the
                            descriptor would be unreadable microtext.
  ai-mark-mark.png          the AM mark alone, same artwork, same padding unit
                            (634x327). Source for the app icon set — this is the
                            one place the symbol is the whole asset.

Why the symbol is not in the header lockup
------------------------------------------
The delivered master opens with the orange AM symbol and then repeats the
letter A in "AI MARK", so painting the full lockup in a 20–40 px header slot
read as the mark appearing at both ends of the strip. The site therefore ships
the wordmark alone in the header, while the symbol keeps its own asset
(ai-mark-mark.png) for the app icon, the favicon and the launcher avatar.

Both crops above were cut at the first clear column gap in the master's ink
(x=783..820 in the 2172x724 file); nothing was redrawn, recoloured or
re-typeset. `scripts/build-og-previews.py` measures the same gap at run time, so
`python3 scripts/build-og-previews.py` re-derives it if the master is
re-delivered.

Nothing in this folder is redrawn, recoloured, re-typeset or otherwise
re-created: every production file above is a crop of the delivered PNG. There is
no separately drawn light-ink or dark-ink artwork, because the approved artwork
is one artefact.

App icons (rasterised from ai-mark-mark.png)
--------------------------------------------
  app/icon.png              512x512, AM mark centred on the logo's own light
                            plate tone (#FAF8F5).
  app/apple-icon.png        180x180, same tile.
  app/favicon.ico           multi-resolution 16/32/48/64 from the same tile.

The previous app/icon.svg was removed rather than kept: the Next.js file
convention would have kept emitting it alongside the new icons, putting two
different AI MARK marks in the same tab. See "Superseded files" below.

Link previews (Open Graph / Twitter)
------------------------------------
public/og/ai-mark-preview-en.jpg and ai-mark-preview-ru.jpg are 1200x630
composites rebuilt from this same approved artwork by
`scripts/build-og-previews.py` (wordmark lockup + locale tagline +
ai-mark.agency). They use the same wordmark-only crop as the header, so the AM
symbol does not appear a second time alongside the wordmark. Re-run that script
after any change to the master PNG.

The client's earlier 1734x907 composites — which carried the previous AM Loop
mark and no longer matched the site — are archived unsent in
`public/og/_archive/` with their own README; nothing references them.

They are served per locale by
app/[locale]/opengraph-image.tsx, which every route under /[locale] inherits;
app/[locale]/twitter-image.tsx reuses it. Pages that build their own
`openGraph` object must also carry the image explicitly — Next merges metadata
segments shallowly, so the nested product and investors pages would otherwise
drop it. lib/social.ts exists for that.

Superseded files (kept, unused)
-------------------------------
The SVG package below was generated in an earlier pass and does not match the
approved PNG: its AM Loop has different geometry and its wordmark is outlined
from Inter rather than the approved lettering. No public UI imports any of it.
It is left on disk deliberately so the change is reviewable and revertible;
delete the set when the PNG rollout is signed off.

  ai-mark-logo.svg, ai-mark-logo-on-dark.svg
  ai-mark-logo-compact.svg, ai-mark-logo-compact-on-dark.svg
  ai-mark-symbol.svg, ai-mark-symbol-on-dark.svg
  ai-mark-icon.svg, ai-mark-logo-card.svg

Where the assets are used
-------------------------
- components/BrandLogo.tsx picks the light or dark PNG with a themed <picture>
  (`.brand-plate` / `.brand-logo` in app/globals.css). A <picture> also serves
  the compact crop below 640px and the full lockup from 640px. The CSS
  aspect-ratio switches with that breakpoint (1201/261 then 1201/327): the <img>
  width/height attributes describe only the compact fallback, and must not be
  left to size the full lockup.
- Call sites set only a height; the width follows the artwork's aspect ratio,
  so the lockup is never stretched or cropped.
