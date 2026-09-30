#!/usr/bin/env python3
"""Build/extend chrome translation maps and patch public-chrome.ts."""
import json
import re
import sys
import time
from pathlib import Path

from deep_translator import MyMemoryTranslator

ROOT = Path(__file__).resolve().parents[2]
CHROME = ROOT / "content/sections/public-chrome.ts"
STRINGS = ROOT / "scripts/translations/en-chrome-strings.json"
MAPS = ROOT / "scripts/translations/maps"

TARGETS = {
    "es": "spanish",
    "pt": "portuguese",
    "fr": "french",
    "de": "german",
    "ar": "arabic",
    "zh": "chinese simplified",
    "id": "indonesian",
    "vi": "vietnamese",
    "ja": "japanese",
    "tr": "turkish",
    "ru": "russian",
}

KEEP = re.compile(
    r"^(/|http)|AI MARK|SHOWROOM|USDT|USDC|RAG|Meta |Telegram|WhatsApp|Instagram|Facebook|Threads|"
    r"Bitrix|Kommo|HubSpot|PDF|API|SaaS|Reels|CRM|1C|AIME|AIBA|\$|Next\.js|TypeScript|Tailwind|Alex",
    re.I,
)


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
    if len(s) <= 3:
        return True
    if s.startswith("/") or s.startswith("http"):
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


def fill_map(locale: str, sleep_s: float = 0.35):
    tname = TARGETS[locale]
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
    tr = MyMemoryTranslator(source="english", target=tname)
    todo = [s for s in strings if s not in m and not should_keep(s)]
    print(f"{locale}: map {len(m)}, todo {len(todo)}", flush=True)
    for idx, s in enumerate(todo):
        for attempt in range(5):
            try:
                t = tr.translate(s)
                if t and t.strip() and t != s:
                    m[s] = t
                break
            except Exception as e:
                wait = sleep_s * (2**attempt) + 1
                print(f"  retry {attempt} {e}", flush=True)
                time.sleep(wait)
        if (idx + 1) % 25 == 0:
            map_path.write_text(json.dumps(m, ensure_ascii=False, indent=2))
            print(f"  saved checkpoint {idx+1}/{len(todo)}", flush=True)
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
            continue
        fill_map(loc)


if __name__ == "__main__":
    main()
