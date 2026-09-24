#!/usr/bin/env python3
"""
Rebuild the per-locale 1200x630 link previews from the ONE approved AI MARK
artwork.

Nothing here redraws the brand: the lockup is `public/brand/ai-mark-logo-master.png`
cropped to its ink bounds and scaled, exactly the artwork already used by
`components/BrandLogo.tsx`. The orange AM mark is cropped away together with it,
so the preview carries the same wordmark-only lockup as the header instead of
showing the symbol twice in the same composite. The old client-supplied
composites showed an earlier AM Loop mark, so they are archived (not deleted)
under `public/og/_archive/` with a README explaining why they are no longer
served.

Usage:  python3 scripts/build-og-previews.py
Output: public/og/ai-mark-preview-en.jpg
        public/og/ai-mark-preview-ru.jpg
"""

from itertools import groupby
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
MASTER = ROOT / "public/brand/ai-mark-logo-master.png"
OUT_DIR = ROOT / "public" / "og"

W, H = 1200, 630
BG = (250, 248, 245)      # --ink, light theme
INK = (22, 22, 20)        # --paper
MUTED = (107, 103, 94)    # --muted
ACCENT = (232, 121, 22)   # the mark's approved orange
RULE = (226, 221, 211)

FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"

# Measured once on the delivered artwork; see public/brand/README.txt
INK_BOX = (177, 219, 1994, 518)
# Fallback: the first clear column gap inside the ink, i.e. where the AM symbol
# ends and the "AI" letterform begins. Re-measured at run time by
# _measure_wordmark_left(); this constant only stands in if nothing is detected.
WORDMARK_LEFT = 821


class _Ink:
    """Lazy ink and gap analysis of the master, used to crop out the AM symbol."""

    _image = None

    @classmethod
    def image(cls) -> Image.Image:
        if cls._image is None:
            cls._image = Image.open(MASTER).convert("RGB")
        return cls._image

    @classmethod
    def column_ink(cls) -> list[int]:
        image = cls.image()
        pixels = np.asarray(image).astype("int16")
        plate = pixels[0, 0]
        return (np.abs(pixels - plate).max(axis=2) > 24).sum(axis=0).tolist()


def _measure_wordmark_left() -> int:
    """First wide, fully empty column gap inside INK_BOX.

    The delivered artwork is `AM symbol · gap · AI MARK`, so the first gap of
    at least 12 columns is the one that separates the symbol from the wordmark.
    Measuring it keeps the crop honest if the master is ever re-delivered,
    instead of trusting the fallback constant.
    """
    columns = _Ink.column_ink()
    left, _, right, _ = INK_BOX
    if not any(columns[left:right + 1]):
        return WORDMARK_LEFT

    empty = (count == 0 for count in columns[left:right + 1])
    run_start = left
    for is_empty, group in groupby(empty):
        run = sum(1 for _ in group)
        if is_empty and run >= 12:
            return run_start + run
        run_start += run
    return WORDMARK_LEFT


def wordmark_box() -> tuple[int, int, int, int]:
    """INK_BOX with the leading AM symbol removed."""
    return (_measure_wordmark_left(), INK_BOX[1], INK_BOX[2], INK_BOX[3])


def lockup(width: int) -> Image.Image:
    """The approved wordmark, cropped to its ink and scaled to `width`."""
    master = _Ink.image()
    art = master.crop(wordmark_box())
    height = round(art.height * width / art.width)
    return art.resize((width, height), Image.LANCZOS)


def centred(draw: ImageDraw.ImageDraw, y: int, text: str, font, fill) -> int:
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
    draw.text(((W - (right - left)) // 2 - left, y - top), text, font=font, fill=fill)
    return bottom - top


def build(locale: str) -> None:
    headline = {
        "en": "From Idea to a Working Business.",
        "ru": "От идеи до работающего бизнеса.",
    }[locale]
    site_line = "ai-mark.agency"

    image = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(image)

    # The artwork carries its own white plate; one shared rounded plate keeps the
    # two visually consistent instead of showing a raw rectangle.
    art = lockup(600)
    pad_x, pad_y = 30, 22
    plate_w, plate_h = art.width + pad_x * 2, art.height + pad_y * 2
    plate_x, plate_y = (W - plate_w) // 2, 150
    draw.rounded_rectangle(
        (plate_x, plate_y, plate_x + plate_w, plate_y + plate_h),
        radius=16,
        fill=(255, 255, 255),
        outline=RULE,
        width=2,
    )
    image.paste(art, (plate_x + pad_x, plate_y + pad_y))

    f_head = ImageFont.truetype(FONT_BOLD, 44)
    f_site = ImageFont.truetype(FONT_REGULAR, 22)

    # The descriptor already lives inside the lockup, so the copy under it starts
    # with the headline instead of repeating "AI-NATIVE VENTURE & MARKETING".
    y = plate_y + plate_h + 68
    y += centred(draw, y, headline, f_head, INK) + 34

    # short accent rule under the headline
    draw.rounded_rectangle((W // 2 - 40, y, W // 2 + 40, y + 5), radius=3, fill=ACCENT)
    y += 5 + 26
    centred(draw, y, site_line, f_site, MUTED)

    out = OUT_DIR / f"ai-mark-preview-{locale}.jpg"
    image.save(out, format="JPEG", quality=92, optimize=True, progressive=True)
    print(f"{out.relative_to(ROOT)}  {image.size}  {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    assert MASTER.exists(), f"approved artwork missing: {MASTER}"
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for loc in ("en", "ru"):
        build(loc)
