#!/usr/bin/env python3
"""Fill chrome maps via Google Translate gtx endpoint (rate-limited politely)."""
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CHROME = ROOT / "content/sections/public-chrome.ts"
STRINGS = ROOT / "scripts/translations/en-chrome-strings.json"
MAPS = ROOT / "scripts/translations/maps"

TARGETS = {
    "es": "es",
    "pt": "pt",
    "fr": "fr",
    "de": "de",
    "ar": "ar",
    "zh": "zh-CN",
    "id": "id",
    "vi": "vi",
    "ja": "ja",
    "tr": "tr",
    "ru": "ru",
}

KEEP = re.compile(
    r"^(/|http)|AI MARK|SHOWROOM|USDT|USDC|RAG|Meta |Telegram|WhatsApp|Instagram|Facebook|Threads|"
    r"Bitrix|Kommo|HubSpot|PDF|API|SaaS|Reels|CRM|1C|AIME|AIBA|\$|Next\.js|TypeScript|Tailwind|Alex",
    re.I,
)


def gtx(text: str, target: str) -> str:
    q = urllib.parse.quote(text)
    url = (
        "https://translate.googleapis.com/translate_a/single"
        f"?client=gtx&sl=en&tl={target}&dt=t&q={q}"
    )
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode())
    parts = data[0]
    return "".join(p[0] for p in parts if p[0])


def extract_locale(text: str, locale: str):
    marker = f'"{locale}": {{'
    start = text.index(marker)
    depth = 0
    i = start + marker.index("{")
    while i < len(text):
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                break
        i += 1
    block = text[start : i + 1].split(":", 1)[1]
    return eval("(" + block + ")")


def build_map(a, b, m=None):
    m = m or {}
    if isinstance(a, str) and isinstance(b, str):
        if a != b:
            m[a] = b
        return m
    if isinstance(a, list) and isinstance(b, list):
        for x, y in zip(a, b):
            build_map(x, y, m)
    elif isinstance(a, dict) and isinstance(b, dict):
        for k in a:
            build_map(a[k], b[k], m)
    return m


def should_keep(s: str) -> bool:
    if len(s) <= 3 or s.startswith("/"):
        return True
    return bool(KEEP.search(s))


def patch_locale(text: str, locale: str, obj) -> str:
    marker = f'"{locale}": {{'
    start = text.index(marker)
    depth = 0
    i = start + marker.index("{")
    while i < len(text):
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                i += 1
                break
        i += 1
    injected = f'"{locale}": {json.dumps(obj, ensure_ascii=False, indent=2)}'
    return text[:start] + injected + text[i:]


def translate_deep(value, m: dict):
    if isinstance(value, str):
        return m.get(value, value)
    if isinstance(value, list):
        return [translate_deep(v, m) for v in value]
    if isinstance(value, dict):
        return {k: translate_deep(v, m) for k, v in value.items()}
    return value


def fill(locale: str, sleep_s: float = 0.12):
    tl = TARGETS[locale]
    text = CHROME.read_text()
    en = extract_locale(text, "en")
    cur = extract_locale(text, locale)
    m = build_map(en, cur)
    map_path = MAPS / f"{locale}.json"
    if map_path.exists() and map_path.stat().st_size > 2:
        try:
            m.update(json.loads(map_path.read_text()))
        except json.JSONDecodeError:
            pass

    strings = json.loads(STRINGS.read_text())
    todo = [s for s in strings if s not in m and not should_keep(s)]
    print(f"{locale}: map {len(m)} todo {len(todo)}", flush=True)
    for idx, s in enumerate(todo):
        for attempt in range(4):
            try:
                t = gtx(s, tl)
                if t and t.strip():
                    m[s] = t
                break
            except Exception as e:
                time.sleep(sleep_s * (attempt + 1) * 5)
                if attempt == 3:
                    print(f"  fail: {s[:50]!r} {e}", flush=True)
        if (idx + 1) % 40 == 0:
            map_path.write_text(json.dumps(m, ensure_ascii=False, indent=2))
            print(f"  checkpoint {idx+1}/{len(todo)}", flush=True)
        time.sleep(sleep_s)

    map_path.write_text(json.dumps(m, ensure_ascii=False, indent=2))
    translated = translate_deep(en, m)
    text = patch_locale(text, locale, translated)
    CHROME.write_text(text)
    print(f"{locale}: done map {len(m)}", flush=True)


def main():
    locales = sys.argv[1:] if len(sys.argv) > 1 else list(TARGETS.keys())
    for loc in locales:
        if loc not in TARGETS:
            print("skip", loc)
            continue
        fill(loc)


if __name__ == "__main__":
    main()
