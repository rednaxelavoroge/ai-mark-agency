Superseded link previews (not served)
=====================================

`ai-mark-preview-en.pre-approved-logo.jpg`
`ai-mark-preview-ru.pre-approved-logo.jpg`

These are the client-supplied 1200x630 composites that shipped in the first
"approved logo" pass. They carry the earlier AM Loop mark from the SVG package,
whose geometry and lettering differ from the approved PNG that the site now
uses everywhere, so a shared link showed a second, inconsistent AI MARK.

They were archived rather than deleted so the change stays reviewable and
revertible. Nothing imports them: `app/[locale]/opengraph-image.tsx` reads the
files one level up, and `app/[locale]/twitter-image.tsx` reuses that handler.

The live previews are regenerated from the approved artwork by
`scripts/build-og-previews.py`:

    python3 scripts/build-og-previews.py

Delete this folder once the new previews are signed off.
