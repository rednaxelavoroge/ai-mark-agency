#!/usr/bin/env python3
"""Translate nested TS export objects via Google gtx."""
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

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
    r"^(/|https?:)|^Partner Platform$|^Partner Hub$|^Venture and Marketing$|"
    r"^hello@ai-mark\.agency$|^you@company\.com$|^Alex Morgan$|"
    r"^← ai-mark\.agency$",
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
    return "".join(p[0] for p in data[0] if p[0])


def should_keep(s: str) -> bool:
    if not isinstance(s, str):
        return True
    if len(s) <= 3 or s.startswith("/") or "%s" in s or "{" in s:
        return True
    return bool(KEEP.search(s))


def translate_obj(obj, tl: str, cache: dict, sleep_s: float):
    if isinstance(obj, str):
        if should_keep(obj):
            return obj
        if obj in cache:
            return cache[obj]
        try:
            t = gtx(obj, tl)
            cache[obj] = t if t else obj
            time.sleep(sleep_s)
            return cache[obj]
        except Exception:
            return obj
    if isinstance(obj, list):
        return [translate_obj(x, tl, cache, sleep_s) for x in obj]
    if isinstance(obj, dict):
        return {k: translate_obj(v, tl, cache, sleep_s) for k, v in obj.items()}
    return obj


def extract_ts_export(path: Path, export_name: str):
    text = path.read_text()
    marker = f"export const {export_name}"
    start = text.index(marker)
    i = text.index("{", text.index("=", start))
    depth = 0
    for j in range(i, len(text)):
        if text[j] == "{":
            depth += 1
        elif text[j] == "}":
            depth -= 1
            if depth == 0:
                return eval(text[i : j + 1]), text, i, j + 1
    raise RuntimeError("parse fail")


def patch_export(path: Path, export_name: str, record_key: str, locale: str, obj):
    data, text, start, end = extract_ts_export(path, export_name)
    data[locale] = obj
    new_block = json.dumps(data, ensure_ascii=False, indent=2)
    marker = f"export const {export_name}"
    eq = text.index("=", text.index(marker)) + 1
    i = text.index("{", eq)
    return text[:i] + new_block + text[end:]


def patch_hub_labels(locales):
    path = ROOT / "lib/partner/hub-labels.ts"
    data, text, i, end = extract_ts_export(path, "HUB_LABELS")
    en = data["en"]
    for loc in locales:
        if loc in ("en", "ru"):
            continue
        tl = TARGETS[loc]
        print(f"hub-labels {loc}", flush=True)
        data[loc] = translate_obj(en, tl, {}, 0.08)
    text = path.read_text()
    marker = "export const HUB_LABELS"
    eq = text.index("=", text.index(marker)) + 1
    i = text.index("{", eq)
    depth = 0
    for j in range(i, len(text)):
        if text[j] == "{":
            depth += 1
        elif text[j] == "}":
            depth -= 1
            if depth == 0:
                end = j + 1
                break
    new_block = json.dumps(data, ensure_ascii=False, indent=2)
    path.write_text(text[:i] + new_block + text[end:])
    print("hub-labels done", flush=True)


def patch_facts(locales):
    path = ROOT / "lib/partner/facts.ts"
    text = path.read_text()
    start = text.index("export const PARTNER_PRODUCT_LIMITS")
    eq = text.index("=", start) + 1
    i = text.index("{", eq)
    depth = 0
    for j in range(i, len(text)):
        if text[j] == "{":
            depth += 1
        elif text[j] == "}":
            depth -= 1
            if depth == 0:
                end = j + 1
                break
    limits = eval(text[i:end])
    for product in limits:
        en_arr = limits[product]["en"]
        for loc in locales:
            if loc in ("en", "ru"):
                continue
            tl = TARGETS[loc]
            print(f"facts {product} {loc}", flush=True)
            cache = {}
            limits[product][loc] = [translate_obj(s, tl, cache, 0.05) for s in en_arr]
    path.write_text(text[:i] + json.dumps(limits, ensure_ascii=False, indent=2) + text[end:])


CABINET_NAMES = {
    "es": "cabinetEs",
    "pt": "cabinetPt",
    "fr": "cabinetFr",
    "de": "cabinetDe",
    "ar": "cabinetAr",
    "zh": "cabinetZh",
    "id": "cabinetId",
    "vi": "cabinetVi",
    "ja": "cabinetJa",
    "tr": "cabinetTr",
}


def load_cabinet_en():
    import subprocess

    out = subprocess.check_output(
        [
            "npx",
            "--yes",
            "tsx",
            "-e",
            "import { cabinetEn } from './content/cabinet/en.ts'; console.log(JSON.stringify(cabinetEn));",
        ],
        cwd=ROOT,
        text=True,
    )
    return json.loads(out)


def patch_cabinet(locales):
    en = load_cabinet_en()
    for loc in locales:
        if loc in ("en", "ru"):
            continue
        tl = TARGETS[loc]
        print(f"cabinet {loc}", flush=True)
        translated = translate_obj(en, tl, {}, 0.06)
        out = ROOT / "content/cabinet/locales" / f"{loc}.ts"
        body = json.dumps(translated, ensure_ascii=False, indent=2)
        out.write_text(
            'import type { CabinetCopy } from "../types";\n\n'
            f"export const {CABINET_NAMES[loc]}: CabinetCopy = {body};\n"
        )


def main():
    locales = sys.argv[1:] if len(sys.argv) > 1 else list(TARGETS.keys())
    patch_hub_labels(locales)
    patch_facts(locales)
    patch_cabinet(locales)


if __name__ == "__main__":
    main()
