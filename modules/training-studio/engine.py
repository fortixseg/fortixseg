from __future__ import annotations

import difflib
import math
import re
import unicodedata
import uuid
from collections import Counter, defaultdict
from pathlib import Path
from statistics import median
from typing import Any

import fitz

AGENDA_MARKERS = {
    "roteiro", "sumario", "indice", "agenda", "programa", "conteudo programatico",
    "programacao", "topicos do curso", "conteudo do curso", "ementa"
}
CLOSING_MARKERS = {
    "obrigado", "obrigada", "obrigado pela participacao", "obrigada pela participacao",
    "fim", "encerramento", "parabens", "ate a proxima"
}
GENERIC_TOKENS_RAW = """
de da do das dos e a o as os em no na nos nas para por com sem ao aos um uma uns umas que se
seu sua seus suas este esta estes estas essa esse essas esses como sobre entre atraves durante
trabalho trabalhos trabalhador trabalhadores atividade atividades seguranca saude medidas medida
aplicavel aplicaveis protecao contra nivel diferenca altura curso treinamento norma normas
"""


def norm(s: str) -> str:
    s = unicodedata.normalize("NFD", (s or "").lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


GENERIC_TOKENS = set(norm(GENERIC_TOKENS_RAW).split())


def clean_text(s: str) -> str:
    s = (s or "").replace("\u00ad", "")
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def tokens(s: str, generic: bool = False) -> list[str]:
    out = [x for x in norm(s).split() if len(x) > 2]
    if not generic:
        out = [x for x in out if x not in GENERIC_TOKENS]
    return out


def text_similarity(a: str, b: str) -> float:
    na, nb = norm(a), norm(b)
    if not na or not nb:
        return 0.0
    aa, bb = tokens(a), tokens(b)
    if not aa:
        aa = tokens(a, generic=True)
    if not bb:
        bb = tokens(b, generic=True)
    sa, sb = set(aa), set(bb)
    coverage = len(sa & sb) / max(1, len(sa))
    jaccard = len(sa & sb) / max(1, len(sa | sb))
    seq = difflib.SequenceMatcher(None, na, nb[: max(160, len(na) * 3)]).ratio()
    return min(1.0, 0.62 * coverage + 0.18 * jaccard + 0.20 * seq)


def starts_lower_fragment(text: str) -> bool:
    text = text.strip()
    if not text:
        return False
    first = text[0]
    if first.islower():
        return True
    n = norm(text)
    return bool(re.match(r"^(e|ou|mas|porem|portanto|assim|tambem|ainda|onde|quando|que|dos|das|de|do|da)\b", n))


def is_list_item(text: str) -> bool:
    t = text.strip()
    return bool(re.match(r"^(?:[✓✔•·➢▪◦●○►▸*-]\s*|[a-z]\)\s+|[ivxlcdm]+[.)]\s+|\d+[.)]\s+)", t, re.I))


def strip_bullet(text: str) -> str:
    return re.sub(r"^(?:[✓✔•·➢▪◦●○►▸*-]\s*|[a-z]\)\s+|[ivxlcdm]+[.)]\s+|\d+[.)]\s+)", "", text.strip(), flags=re.I).strip()


def polish_heading(text: str) -> str:
    text = collapse_spaced_heading(clean_text(text))
    # PDF layout sometimes extracts an emphasized “NÃO” a few pixels above the rest of the same heading.
    m = re.match(r"^NÃO\s+((?:O|A|OS|AS)\s+.+?)\s+(deverá|deve|poderá|pode|será|é)\b(.*)$", text, re.I)
    if m:
        return clean_text(f"{m.group(1)} NÃO {m.group(2)}{m.group(3)}")
    return text


def collapse_spaced_heading(text: str) -> str:
    """Rebuild headings extracted as I N T R O D U Ç Ã O without hard-coding any course."""
    text = clean_text(text)
    parts = text.split()
    if len(parts) >= 4:
        singles = [x for x in parts if len(re.sub(r"[^A-Za-zÀ-ÿ0-9]", "", x)) == 1]
        if len(singles) / len(parts) >= .72:
            return "".join(parts)
    return text


def heading_fragment_penalty(text: str) -> float:
    """Penalty for headings that look like a sentence continuation/subheading, not a module boundary."""
    t = collapse_spaced_heading(clean_text(text))
    n = norm(t)
    if not n:
        return 2.0
    penalty = 0.0
    if starts_lower_fragment(t): penalty += 1.8
    if re.match(r"^(e|ou|mas|nem|de|do|da|dos|das|para|por|com|sem|em|no|na)\b", n): penalty += 1.65
    if t.endswith(":") and len(t.split()) <= 5: penalty += .65
    if re.match(r"^(exigir|usar|utilizar|fornecer|orientar|registrar|aplicar|cumprir)\b", n) and len(t.split()) <= 7:
        penalty += .55
    if len(t.split()) == 1 and len(t) <= 5: penalty += .45
    return penalty


def module_title_quality(text: str, heading_score_value: float, size: float, body_size: float, y0: float, height: float) -> float:
    t = collapse_spaced_heading(text)
    n = norm(t)
    q = float(heading_score_value) - heading_fragment_penalty(t)
    ratio = size / max(1.0, body_size)
    if ratio >= 1.45: q += .65
    elif ratio >= 1.28: q += .35
    if y0 <= height * .25: q += .25
    if re.match(r"^\d+(?:\.\d+)?\s+\S+", t): q += .35
    if re.match(r"^(nr|nbr)\s*[-–—]?\s*\d+\b", n): q += .35
    if 2 <= len(t.split()) <= 10: q += .12
    return q


def distinctive_overlap(a: str, b: str) -> float:
    aa, bb = set(tokens(a)), set(tokens(b))
    if not aa:
        aa = set(tokens(a, generic=True))
    if not bb:
        bb = set(tokens(b, generic=True))
    return len(aa & bb) / max(1, len(aa))


def group_same_baseline(lines: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Join extractor fragments that visually live on the same baseline."""
    if not lines:
        return []
    lines = sorted(lines, key=lambda x: (x["y0"], x["x0"]))
    groups: list[list[dict[str, Any]]] = []
    for line in lines:
        placed = False
        for g in reversed(groups[-4:]):
            yref = sum(x["y0"] for x in g) / len(g)
            size = max(x["size"] for x in g + [line])
            if abs(line["y0"] - yref) <= max(2.2, size * 0.11):
                # Keep distinct columns apart if there is a very large horizontal gap.
                gmin, gmax = min(x["x0"] for x in g), max(x["x1"] for x in g)
                if line["x0"] - gmax < 170 or gmin - line["x1"] < 170:
                    g.append(line); placed = True; break
        if not placed:
            groups.append([line])
    merged = []
    for g in groups:
        g = sorted(g, key=lambda x: x["x0"])
        text = " ".join(x["text"].strip() for x in g if x["text"].strip())
        text = re.sub(r"\s+", " ", text).strip()
        if not text:
            continue
        merged.append({
            "text": text,
            "x0": min(x["x0"] for x in g), "y0": min(x["y0"] for x in g),
            "x1": max(x["x1"] for x in g), "y1": max(x["y1"] for x in g),
            "size": max(x["size"] for x in g),
            "bold": any(x["bold"] for x in g),
            "font": ",".join(sorted(set(x["font"] for x in g if x["font"])))[:160],
        })
    return sorted(merged, key=lambda x: (x["y0"], x["x0"]))


def weighted_mode_size(lines: list[dict[str, Any]], fallback: float = 12.0) -> float:
    counts: Counter[float] = Counter()
    for l in lines:
        txt = re.sub(r"\s+", "", l["text"])
        if len(txt) < 3:
            continue
        size = round(float(l["size"]) * 2) / 2
        counts[size] += min(120, len(txt))
    return counts.most_common(1)[0][0] if counts else fallback


def heading_score(line: dict[str, Any], page: dict[str, Any], doc_body: float) -> float:
    t = line["text"].strip()
    if not t or len(t) > 150 or is_list_item(t):
        return -4.0
    words = t.split()
    letters = [c for c in t if c.isalpha()]
    allcaps = bool(letters) and sum(c.isupper() for c in letters) / len(letters) >= 0.82
    score = 0.0
    pbody = page.get("bodySize") or doc_body or 12
    if line["size"] >= max(doc_body * 1.18, pbody * 1.12):
        score += 0.9
    if line["size"] >= max(doc_body * 1.42, pbody * 1.26):
        score += 0.45
    if line["bold"]:
        score += 0.65
    if allcaps and 1 <= len(words) <= 14:
        score += 0.72
    if re.match(r"^\d+(?:\.\d+){1,4}\s+\S+", t) and len(words) <= 12:
        score += 0.72
    elif re.match(r"^(?:NR|NBR)\s*[-–—]?\s*\d+\b", t, re.I):
        score += 0.78
    if len(words) <= 10:
        score += 0.24
    if t.endswith(":") and len(words) <= 10:
        score += 0.20
    if line["y0"] <= page["height"] * 0.36:
        score += 0.30
    center = (line["x0"] + line["x1"]) / 2
    if abs(center - page["width"] / 2) <= page["width"] * 0.16 and line["x1"] - line["x0"] <= page["width"] * 0.8:
        score += 0.18
    if starts_lower_fragment(t):
        score -= 1.35
    if len(words) > 18:
        score -= 0.9
    if t.endswith((".", ";", ",")):
        score -= 0.45
    if re.match(r"^[a-z]\)\s", t, re.I):
        score -= 1.0
    return score


def extract_raw_pages(path: Path) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    doc = fitz.open(path)
    pages: list[dict[str, Any]] = []
    sizes_for_doc: list[float] = []
    image_count = 0
    searchable = 0
    for i, page in enumerate(doc):
        pd = page.get_text("dict", sort=True)
        raw_lines: list[dict[str, Any]] = []
        for block in pd.get("blocks", []):
            if block.get("type") != 0:
                continue
            for ln in block.get("lines", []):
                spans = ln.get("spans", [])
                text = " ".join(s.get("text", "").strip() for s in spans if s.get("text", "").strip())
                text = re.sub(r"\s+", " ", text).strip()
                if not text:
                    continue
                bbox = ln.get("bbox") or (0, 0, 0, 0)
                raw_lines.append({
                    "text": text,
                    "x0": float(bbox[0]), "y0": float(bbox[1]), "x1": float(bbox[2]), "y1": float(bbox[3]),
                    "size": max(float(s.get("size", 0)) for s in spans) if spans else 0,
                    "bold": any("bold" in str(s.get("font", "")).lower() for s in spans),
                    "font": ",".join(sorted(set(str(s.get("font", "")) for s in spans))),
                })
        lines = group_same_baseline(raw_lines)
        body_size = weighted_mode_size(lines, 12.0)
        for l in lines:
            if len(l["text"]) >= 20 and not l["bold"]:
                sizes_for_doc.extend([l["size"]] * min(20, max(1, len(l["text"]) // 8)))
        text = "\n".join(l["text"] for l in lines)
        if len(norm(text)) > 40:
            searchable += 1
        img_rect_area = 0.0
        large_image_rects: list[tuple[float, float, float, float]] = []
        seen_rects: set[tuple[int, int, int, int]] = set()
        try:
            imgs = page.get_images(full=True)
            image_count += len(imgs)
            for im in imgs:
                xref = im[0]
                for rect in page.get_image_rects(xref):
                    key = tuple(round(x) for x in (rect.x0, rect.y0, rect.x1, rect.y1))
                    if key in seen_rects:
                        continue
                    seen_rects.add(key)
                    area = max(0, rect.width) * max(0, rect.height)
                    img_rect_area += area
                    if area >= page.rect.width * page.rect.height * 0.035 and rect.width >= 70 and rect.height >= 70:
                        large_image_rects.append((rect.x0, rect.y0, rect.x1, rect.y1))
        except Exception:
            pass
        page_area = max(1.0, page.rect.width * page.rect.height)
        pages.append({
            "page": i + 1, "width": float(page.rect.width), "height": float(page.rect.height),
            "lines": lines, "text": clean_text(text), "bodySize": body_size,
            "imageAreaRatio": round(min(1.0, img_rect_area / page_area), 3),
            "largeImageRects": large_image_rects, "role": "CONTENT", "title": "", "headings": [],
        })
    doc.close()
    doc_body = median(sizes_for_doc) if sizes_for_doc else median([p["bodySize"] for p in pages]) if pages else 12.0

    # Remove recurring header/footer text. This prevents a logo/footer from becoming a heading.
    furniture: Counter[str] = Counter()
    positions: defaultdict[str, list[tuple[int, int]]] = defaultdict(list)
    for p in pages:
        for idx, l in enumerate(p["lines"]):
            if l["y0"] <= p["height"] * 0.10 or l["y1"] >= p["height"] * 0.90:
                n = norm(l["text"])
                if 2 <= len(n) <= 80:
                    furniture[n] += 1; positions[n].append((p["page"], idx))
    threshold = max(4, math.ceil(len(pages) * 0.28))
    recurring = {k for k, v in furniture.items() if v >= threshold}
    if recurring:
        for p in pages:
            p["lines"] = [l for l in p["lines"] if norm(l["text"]) not in recurring]
            p["text"] = clean_text("\n".join(l["text"] for l in p["lines"]))
            p["bodySize"] = weighted_mode_size(p["lines"], p["bodySize"])

    # Heading candidates and page title.
    for p in pages:
        candidates = []
        for l in p["lines"]:
            sc = heading_score(l, p, doc_body)
            l["headingScore"] = round(sc, 3)
            if sc >= 1.28:
                candidates.append({"text": collapse_spaced_heading(l["text"]), "score": round(sc, 3), "y0": l["y0"], "size": round(float(l.get("size", 0)),2), "bold": bool(l.get("bold")), "x0": round(float(l.get("x0",0)),2)})
        # De-duplicate near-identical headings.
        uniq = []
        for c in sorted(candidates, key=lambda x: (x["y0"], -x["score"])):
            if any(text_similarity(c["text"], u["text"]) > 0.92 for u in uniq):
                continue
            uniq.append(c)
        p["headings"] = uniq[:12]
        top = [c for c in uniq if c["y0"] <= p["height"] * 0.48]
        if top:
            p["title"] = polish_heading(max(top, key=lambda x: x["score"] + (0.3 if x["y0"] < p["height"] * .25 else 0))["text"][:140])

    # Agenda / cover / closing / visual support roles.
    agenda_pages = []
    for p in pages:
        title_n = norm(p["title"])
        first_n = norm(" ".join(l["text"] for l in p["lines"][:5]))
        if any(m == title_n or m in title_n or first_n.startswith(m) for m in AGENDA_MARKERS):
            agenda_pages.append(p["page"]); p["role"] = "AGENDA"
    for p in pages:
        ntext = norm(p["text"])
        if p["page"] <= 2 and p["role"] != "AGENDA" and len(p["lines"]) <= 5 and len(ntext.split()) <= 35:
            p["role"] = "COVER"
        if p["page"] >= max(1, len(pages) - 2):
            if any(m in ntext for m in CLOSING_MARKERS) and len(ntext.split()) <= 18:
                p["role"] = "CLOSING"
        if p["role"] == "CONTENT" and len(norm(p["text"])) < 75 and p["imageAreaRatio"] >= 0.14:
            p["role"] = "VISUAL_SUPPORT"

    meta = {
        "pages": len(pages), "images": image_count, "searchablePages": searchable,
        "searchability": "boa" if searchable >= max(1, len(pages) * .7) else "baixa",
        "needsOcr": searchable < max(1, len(pages) * .35),
        "docBodySize": round(float(doc_body), 2), "agendaPages": agenda_pages,
        "pageRoles": dict(Counter(p["role"] for p in pages)),
        "recurringFurnitureRemoved": len(recurring),
    }
    return pages, meta


def extract_agenda(pages: list[dict[str, Any]]) -> tuple[list[str], int | None]:
    agenda = next((p for p in pages if p["role"] == "AGENDA"), None)
    if not agenda:
        return [], None
    items: list[str] = []
    active: str | None = None
    started = False
    for l in agenda["lines"]:
        txt = clean_text(l["text"])
        n = norm(txt)
        if not started:
            if any(m == n or m in n for m in AGENDA_MARKERS):
                started = True
            continue
        if not txt:
            continue
        if is_list_item(txt) or re.match(r"^[✓✔]", txt):
            if active:
                items.append(clean_text(active))
            active = strip_bullet(txt)
        elif active:
            # Wrapped agenda item, such as a last word on the next line.
            if len(txt) <= 55 and not l.get("bold"):
                active += " " + txt
            else:
                items.append(clean_text(active)); active = None
        elif 3 <= len(txt.split()) <= 14 and len(txt) <= 115:
            # Some PDFs lose bullet glyphs during extraction.
            active = txt
    if active:
        items.append(clean_text(active))
    # remove noise and duplicates
    out = []
    for x in items:
        x = re.sub(r"^[\d.\-–—]+\s*", "", x).strip(" -–—")
        if len(x) < 4 or any(text_similarity(x, y) > .93 for y in out):
            continue
        out.append(x)
    return out[:18], agenda["page"]


def page_match_score(item: str, page: dict[str, Any]) -> float:
    if page["role"] in {"COVER", "AGENDA", "CLOSING", "VISUAL_SUPPORT"}:
        return 0.0
    title = page.get("title") or ""
    hscore = max([text_similarity(item, h["text"]) for h in page.get("headings", [])] or [0.0])
    tscore = text_similarity(item, title)
    body = page.get("text", "")[:1600]
    bscore = text_similarity(item, body)
    score = 0.62 * max(tscore, hscore) + 0.38 * min(0.72, bscore)
    # Acronyms are strong structural anchors in technical material (generic rule: EPI, EPC, AR, PT, ISO, etc.).
    item_acr = set(re.findall(r"\b[A-ZÁÉÍÓÚÇ]{2,6}\b", item))
    page_acr = set(re.findall(r"\b[A-ZÁÉÍÓÚÇ]{2,6}\b", " ".join([title] + [h["text"] for h in page.get("headings", [])])))
    if item_acr & page_acr:
        score += .16
    return min(1.0, score)


def structural_pages(pages: list[dict[str, Any]], after: int, before: int) -> list[int]:
    out = []
    for p in pages:
        if not (after < p["page"] < before) or p["role"] != "CONTENT":
            continue
        if p.get("title") and any(h["score"] >= 1.45 for h in p.get("headings", [])):
            out.append(p["page"])
    return out


def choose_module_spans(pages: list[dict[str, Any]], agenda_items: list[str], agenda_page: int | None) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    content_pages = [p["page"] for p in pages if p["role"] not in {"COVER", "AGENDA", "CLOSING"}]
    if not content_pages:
        return [], {"strategy": "none", "anchors": []}
    first_content = next((x for x in content_pages if agenda_page is None or x > agenda_page), content_pages[0])
    last_content = max(content_pages)

    if len(agenda_items) >= 3:
        # One best candidate per agenda item. First agenda item starts at first content page after the agenda.
        candidates: list[dict[str, Any]] = [{"index": 0, "page": first_content, "score": 1.0, "kind": "agenda_first"}]
        for j, item in enumerate(agenda_items[1:], 1):
            scored = [(page_match_score(item, p), p["page"]) for p in pages if p["page"] > first_content]
            scored.sort(reverse=True)
            if scored and scored[0][0] >= 0.43:
                candidates.append({"index": j, "page": scored[0][1], "score": scored[0][0], "kind": "agenda_match"})

        # Weighted longest increasing subsequence removes contradictory fuzzy anchors.
        candidates = sorted(candidates, key=lambda x: x["index"])
        n = len(candidates); dp = [c["score"] for c in candidates]; prev = [-1] * n
        for i in range(n):
            for k in range(i):
                if candidates[k]["index"] < candidates[i]["index"] and candidates[k]["page"] < candidates[i]["page"]:
                    val = dp[k] + candidates[i]["score"]
                    if val > dp[i]:
                        dp[i] = val; prev[i] = k
        best = max(range(n), key=lambda i: dp[i])
        kept = []
        while best >= 0:
            kept.append(candidates[best]); best = prev[best]
        kept.reverse()
        by_idx = {x["index"]: x for x in kept}
        by_idx[0] = {"index": 0, "page": first_content, "score": 1.0, "kind": "agenda_first"}

        # Fill missing agenda items between reliable anchors using real structural heading pages.
        known = sorted(by_idx)
        boundaries = known + ([len(agenda_items)] if known[-1] != len(agenda_items) else [])
        anchor_indices = sorted(by_idx)
        # Fill gaps between known anchors.
        for left_pos, left_idx in enumerate(anchor_indices):
            right_idx = anchor_indices[left_pos + 1] if left_pos + 1 < len(anchor_indices) else len(agenda_items)
            left_page = by_idx[left_idx]["page"]
            right_page = by_idx[right_idx]["page"] if right_idx in by_idx else last_content + 1
            missing = list(range(left_idx + 1, right_idx))
            if not missing:
                continue
            candidates_pages = structural_pages(pages, left_page, right_page)
            # Do not split immediately on a heading one page after a forced first start unless needed.
            available = [x for x in candidates_pages if x > left_page]
            chosen: list[int] = []
            lo = left_page; hi = right_page
            for pos, midx in enumerate(missing, 1):
                target = lo + (hi - lo) * pos / (len(missing) + 1)
                pool = [x for x in available if x not in chosen]
                if pool:
                    page = min(pool, key=lambda x: (abs(x - target), x))
                else:
                    page = max(lo + pos, min(hi - (len(missing) - pos + 1), round(target)))
                chosen.append(page)
                by_idx[midx] = {"index": midx, "page": page, "score": 0.58, "kind": "inferred_between_anchors"}

        # If fuzzy matching created duplicates, repair in order using nearest structural page.
        prev_page = first_content - 1
        for idx in range(len(agenda_items)):
            a = by_idx.get(idx)
            if not a:
                page = min(last_content, prev_page + 1)
                a = by_idx[idx] = {"index": idx, "page": page, "score": .45, "kind": "inferred_sequence"}
            if a["page"] <= prev_page:
                pool = [x for x in structural_pages(pages, prev_page, last_content + 1) if x > prev_page]
                a["page"] = pool[0] if pool else min(last_content, prev_page + 1)
                a["kind"] = "repaired_sequence"; a["score"] = min(a["score"], .5)
            prev_page = a["page"]

        anchors = [by_idx[i] for i in range(len(agenda_items))]
        # Shift an anchor one page earlier when the previous page is a strong thematic continuation of the same agenda item and not visual.
        for i in range(1, len(anchors)):
            pno = anchors[i]["page"]
            prevp = next((p for p in pages if p["page"] == pno - 1), None)
            if prevp and prevp["role"] == "CONTENT" and pno - 1 > anchors[i-1]["page"]:
                current_score = page_match_score(agenda_items[i], next(p for p in pages if p["page"] == pno))
                prev_score = page_match_score(agenda_items[i], prevp)
                if prev_score >= .44:
                    anchors[i]["page"] = pno - 1
                    anchors[i]["kind"] = "theme_shifted"; anchors[i]["score"] = max(anchors[i]["score"], prev_score)

        spans = []
        for i, item in enumerate(agenda_items):
            start = anchors[i]["page"]
            end = (anchors[i + 1]["page"] - 1) if i + 1 < len(anchors) else last_content
            if end < start:
                end = start
            spans.append({
                "title": item, "startPage": start, "endPage": end,
                "confidence": round(float(anchors[i]["score"]), 2), "anchorKind": anchors[i]["kind"],
            })
        return spans, {"strategy": "agenda_guided", "anchors": spans}

    # No agenda: infer a true hierarchy. Strong page titles become module candidates;
    # lower-level headings remain topics inside the current module. A page turn alone is never a boundary.
    content_objs = [p for p in pages if p["role"] == "CONTENT" and p["page"] >= first_content]
    page_count = max(1, len(content_objs))
    max_modules = max(3, min(8, round(math.sqrt(page_count) * 1.35)))
    candidates: list[tuple[int, float, str]] = []
    previous_title = ""
    previous_tokens: set[str] = set()
    for p in content_objs:
        if p["page"] == first_content or not p.get("title"):
            previous_tokens = set(tokens(p.get("text", "")))
            previous_title = p.get("title", "")
            continue
        title = polish_heading(p.get("title", ""))
        h = next((h for h in p.get("headings", []) if text_similarity(h["text"], title) >= .88), None)
        if not h:
            continue
        cur_tokens = set(tokens(p.get("text", "")))
        novelty = 1.0 - (len(cur_tokens & previous_tokens) / max(1, len(cur_tokens | previous_tokens))) if previous_tokens else .5
        previous_tokens = cur_tokens
        q = module_title_quality(title, h.get("score", 0), h.get("size", p.get("bodySize",12)), p.get("bodySize",12), h.get("y0",0), p["height"])
        # Duplicate / typography-only title changes are not new modules.
        if previous_title and text_similarity(title, previous_title) >= .88:
            q -= 1.4
        # Theme change helps, but never overrules a sentence-fragment penalty.
        q += max(0.0, novelty - .55) * .75
        previous_title = title
        if q >= 2.25:
            candidates.append((p["page"], q, title))

    # Distinguish a continuous document from a slide-deck style PDF. In slide decks,
    # consecutive pages often have legitimate peer-level headings, so a fixed "breathing room"
    # would silently drop modules (including an Introduction on the very next page).
    strong_candidates = [x for x in candidates if x[1] >= 2.25]
    slide_deck_like = len(strong_candidates) >= max(3, math.ceil(page_count * .55))
    if slide_deck_like:
        max_modules = min(14, max(4, len(strong_candidates) + 1))
    selected = [(first_content, 9.0, polish_heading(next((p.get("title") for p in content_objs if p["page"] == first_content and p.get("title")), "Introdução")))]
    ordered_candidates = sorted(candidates, key=lambda x: x[0] if slide_deck_like else -x[1])
    for pno, q, title in ordered_candidates:
        if len(selected) >= max_modules:
            break
        if any(pno == x[0] for x in selected):
            continue
        is_intro = intro_like_title(title)
        if not slide_deck_like and not is_intro and any(abs(pno - x[0]) < 2 for x in selected):
            continue
        # In a slide deck, require a slightly stronger page title but allow adjacent pages.
        if slide_deck_like and q < 2.55 and not is_intro:
            continue
        selected.append((pno, q, title))
    selected.sort(key=lambda x: x[0])

    # A weak first page (cover-like intro text) can share the first real section instead of creating an empty module.
    if len(selected) > 1 and selected[1][0] - selected[0][0] <= 1:
        firstp = next(p for p in pages if p["page"] == selected[0][0])
        if len(norm(firstp.get("text", ""))) < 120:
            selected = selected[1:]

    starts = [x[0] for x in selected]
    spans = []
    for i, (start, quality, candidate_title) in enumerate(selected):
        end = starts[i+1] - 1 if i+1 < len(starts) else last_content
        page = next(p for p in pages if p["page"] == start)
        title = polish_heading(candidate_title or page.get("title") or f"Módulo {i+1}")
        spans.append({"title": title, "startPage": start, "endPage": end, "confidence": round(min(.93, max(.52, quality/4.0)),2), "anchorKind": "hierarchical_heading"})
    return spans, {"strategy": "hierarchical_headings", "anchors": spans, "slideDeckLike": slide_deck_like}



def _span_stats(span: dict[str, Any], pages: list[dict[str, Any]]) -> tuple[int, int, str]:
    selected=[p for p in pages if span["startPage"] <= p["page"] <= span["endPage"] and p.get("role") not in {"COVER","AGENDA","CLOSING"}]
    page_count=max(1, span["endPage"]-span["startPage"]+1)
    word_count=sum(len(re.findall(r"\w+", p.get("text", ""))) for p in selected)
    text=" ".join(p.get("text", "") for p in selected)
    return page_count, word_count, text

def _module_merge_affinity(cur: dict[str, Any], other: dict[str, Any], pages: list[dict[str, Any]], direction: str) -> float:
    cp,cw,ct=_span_stats(cur,pages); op,ow,ot=_span_stats(other,pages)
    cr=module_pedagogical_role(cur.get("title", "")); orole=module_pedagogical_role(other.get("title", ""))
    score=text_similarity(cur.get("title", ""), other.get("title", "")) * .65
    # Neighboring content continuity matters more than typography in slide-style PDFs.
    ctk=set(tokens(ct)); otk=set(tokens(ot))
    if ctk and otk:
        score += (len(ctk & otk) / max(1, len(ctk | otk))) * .8
    if cr == orole: score += .35
    pairs={("CONTEXT","INTRO"),("CONSEQUENCE","RISK"),("RISK","CONSEQUENCE"),("CONTROL","RISK"),("PRACTICE","CONTROL"),("CLOSING","PRACTICE")}
    if (cr,orole) in pairs: score += .22
    # Prefer keeping tiny continuation pages with the previous section unless the next title is clearly closer.
    if direction == "left": score += .06
    if op >= 7: score -= .22
    return score

def consolidate_inferred_spans(spans: list[dict[str, Any]], pages: list[dict[str, Any]], strategy: str) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    """Reduce over-segmentation when there is no authoritative agenda/outline.

    One-page headings in slide PDFs are often subtopics, not true course modules. We keep source order,
    merge only adjacent spans, and never apply this to agenda-guided structures.
    """
    if strategy != "hierarchical_headings" or len(spans) <= 2:
        return spans, {"changed": False, "reason": "agenda_or_small_structure"}
    work=[dict(x) for x in spans]
    total_pages=len({n for s in work for n in range(s["startPage"], s["endPage"]+1)})
    target_max=max(3, min(10, math.ceil(total_pages / 2.4)))
    original=len(work); merged=[]

    def merge_at(i: int, j: int):
        a,b=work[i],work[j]
        keeper=b if j < i else a
        child=a if j < i else b
        new={**keeper}
        new["startPage"]=min(a["startPage"],b["startPage"]); new["endPage"]=max(a["endPage"],b["endPage"])
        new["confidence"]=round((float(a.get("confidence",.6))+float(b.get("confidence",.6)))/2,2)
        new["anchorKind"]="merged_subsections"
        titles=[]
        for x in (a,b):
            titles.extend(x.get("mergedTitles", [])); titles.append(x.get("title", ""))
        new["mergedTitles"]=unique_texts([x for x in titles if x], 12)
        lo=min(i,j); hi=max(i,j)
        work[lo:hi+1]=[new]
        merged.append({"keptTitle":new.get("title"),"mergedTitle":child.get("title"),"startPage":new["startPage"],"endPage":new["endPage"]})

    def neighbor_for(i: int) -> int | None:
        """Choose an adjacent span without collapsing different pedagogical subjects."""
        cur_role=module_pedagogical_role(work[i].get("title", ""))
        candidates=[]
        for j,direction in ((i-1,"left"),(i+1,"right")):
            if j<0 or j>=len(work):
                continue
            other_role=module_pedagogical_role(work[j].get("title", ""))
            if other_role in {"PRACTICE","CLOSING"}:
                continue
            # Generic CONTENT may be absorbed by a semantic module, but an explicit
            # semantic heading must never be swallowed by a generic neighbor.
            if cur_role != other_role:
                if cur_role == "CONTENT":
                    pass
                else:
                    continue
            candidates.append((j,_module_merge_affinity(work[i],work[j],pages,direction)))
        if not candidates:
            return None
        return max(candidates,key=lambda x:x[1])[0]

    # First remove ultra-thin fragments even when the total module count is not excessive.
    changed=True
    while changed and len(work)>2:
        changed=False
        for i,s in enumerate(list(work)):
            pc,wc,_=_span_stats(s,pages)
            role=module_pedagogical_role(s.get("title", ""))
            if pc==1 and wc < 35 and role not in {"INTRO","PRACTICE","CLOSING"}:
                j=neighbor_for(i)
                if j is None:
                    continue
                merge_at(i,j); changed=True; break

    # If the inferred structure is still too fragmented, merge the smallest one-page spans first.
    while len(work) > target_max and len(work)>2:
        eligible=[]
        for i,s in enumerate(work):
            pc,wc,_=_span_stats(s,pages); role=module_pedagogical_role(s.get("title", ""))
            if role in {"INTRO","PRACTICE","CLOSING"}:
                continue
            if neighbor_for(i) is None:
                continue
            eligible.append((pc, wc, i))
        if not eligible: break
        _,_,i=min(eligible, key=lambda x:(x[0],x[1],x[2]))
        j=neighbor_for(i)
        if j is None: break
        merge_at(i,j)

    # In an inferred structure, a remaining one-page span is better represented as a topic
    # inside an adjacent module. Authoritative agenda modules are never processed here.
    changed=True
    while changed and len(work)>3:
        changed=False
        for i,s in enumerate(list(work)):
            pc,wc,_=_span_stats(s,pages); role=module_pedagogical_role(s.get("title", ""))
            if pc != 1 or role in {"INTRO","PRACTICE","CLOSING"}:
                continue
            if i==0: j=1
            elif i==len(work)-1: j=i-1
            else:
                left=_module_merge_affinity(s,work[i-1],pages,"left")
                right=_module_merge_affinity(s,work[i+1],pages,"right")
                j=i-1 if left>=right else i+1
            merge_at(i,j); changed=True; break

    # A generic closing/thank-you page is presentation chrome, not a standalone inferred module.
    # Keep the original page in the player by attaching its span to the previous real module.
    if len(work) > 1 and module_pedagogical_role(work[-1].get("title", "")) == "CLOSING":
        merge_at(len(work)-1, len(work)-2)

    return work, {"changed":len(work)!=original,"reason":"anti_oversegmentation" if len(work)!=original else "kept","before":original,"after":len(work),"targetMax":target_max,"merges":merged}

def combine_lines_to_blocks(lines: list[dict[str, Any]]) -> tuple[list[str], list[list[str]], int]:
    paragraphs: list[str] = []
    lists: list[list[str]] = []
    buf: list[str] = []
    current_list: list[str] = []
    continuity = 0

    def flush_buf():
        nonlocal buf
        if buf:
            txt = clean_text(" ".join(buf))
            if len(txt) >= 15:
                paragraphs.append(txt)
            buf = []

    def flush_list():
        nonlocal current_list
        if current_list:
            lists.append(current_list)
            current_list = []

    for rec in lines:
        txt = clean_text(rec.get("text", ""))
        if not txt:
            continue
        if rec.get("isHeading"):
            continue
        if is_list_item(txt):
            flush_buf()
            item = strip_bullet(txt)
            if item:
                current_list.append(item)
            continue
        if current_list:
            # A lower-case continuation after a bullet belongs to that bullet.
            if starts_lower_fragment(txt) or (current_list[-1] and not re.search(r"[.;:!?]$", current_list[-1])):
                current_list[-1] = clean_text(current_list[-1] + " " + txt); continuity += 1
                continue
            flush_list()
        if not buf:
            buf = [txt]
        else:
            prev = buf[-1]
            if prev.endswith("-"):
                buf[-1] = prev[:-1] + txt; continuity += 1
            else:
                buf.append(txt)
                if not re.search(r"[.!?;:]$", prev):
                    continuity += 1
        if re.search(r"[.!?]$", txt) and sum(len(x) for x in buf) >= 70:
            flush_buf()
    flush_buf(); flush_list()
    return paragraphs, lists, continuity


def classify_topic(title: str, content: str) -> str:
    tt = norm(title)
    # The title has priority over incidental words in the body. This prevents a lesson called
    # “Consequências...” from becoming RISK merely because the explanation mentions risco.
    if any(k in tt for k in ["beneficio", "beneficios", "vantagem", "vantagens", "importancia"]):
        return "BENEFIT"
    if any(k in tt for k in ["consequencia", "consequencias", "doenca", "doencas", "efeito", "efeitos", "agravo", "agravos"]):
        return "CONSEQUENCE"
    if any(k in tt for k in ["exercicio", "exercicios", "alongamento", "atividade pratica", "pratica orientada"]):
        return "PRACTICE"
    if tt.startswith("o que e") or tt.startswith("definicao") or tt.startswith("conceito"):
        return "DEFINITION"
    if any(k in tt for k in ["portaria", "resolucao", "referencia normativa"]) or re.match(r"^lei\s", tt):
        return "LEGAL_REFERENCE"
    if (tt.startswith("processo") or "seguintes alteracoes" in tt) and any(k in norm(content[:900]) for k in ["portaria", "norma regulamentadora", "altera", "alteracao"]):
        return "LEGAL_REFERENCE"
    title_rules = [
        (("objetivo","introducao","apresentacao","visao geral"), "GENERAL_CONTENT"),
        (("emergencia","resgate","salvamento","primeiros socorros"), "EMERGENCY"),
        (("condicao insegura","ato inseguro","acidente","risco","perigo","fator de queda"), "RISK"),
        (("nao devera","nao deve","proibicao","impeditiv"), "PROHIBITION"),
        (("planejamento","procedimento","passo a passo","execucao","permissao de trabalho"), "PROCEDURE"),
        (("responsabilidade","cabe ao empregador","cabe ao trabalhador","atribuicoes"), "RESPONSIBILITY"),
        (("talabarte","cinturao","epi","protecao individual"), "EPI"),
        (("epc","protecao coletiva"), "EPC"),
        (("norma","regulamento","referencia normativa"), "LEGAL_REFERENCE"),
        (("defin","conceito","o que e"), "DEFINITION"),
    ]
    if tt.startswith("nao "):
        return "PROHIBITION"
    if re.match(r"^nr\s*[-–—]?\s*\d+\b", tt):
        return "LEGAL_REFERENCE"
    for keys, value in title_rules:
        if any(k in tt for k in keys):
            return value
    t = norm(title + " " + content[:1600])
    if any(k in t for k in ["proibido", "nao deve", "nao devera", "vedado", "impeditiv"]): return "PROHIBITION"
    if any(k in t for k in ["emergencia", "resgate", "salvamento", "primeiros socorros"]): return "EMERGENCY"
    if re.search(r"\bepi\b", t) or "equipamento de protecao individual" in t: return "EPI"
    if re.search(r"\bepc\b", t) or "equipamento de protecao coletiva" in t: return "EPC"
    if any(k in t for k in ["analise de risco", "risco", "perigo", "queda", "acidente", "exposicao"]): return "RISK"
    if any(k in t for k in ["procedimento", "planejamento", "passo", "etapa", "execucao"]): return "PROCEDURE"
    if any(k in t for k in ["responsabilidade", "cabe ao empregador", "cabe ao trabalhador", "atribuicoes"]): return "RESPONSIBILITY"
    if any(k in t for k in ["norma", "regulamento", "portaria", "legislacao", "nr "]): return "LEGAL_REFERENCE"
    if any(k in t for k in ["devera", "obrigatorio", "obrigatoria", "deve "]): return "OBLIGATION"
    if any(k in t for k in ["definicao", "conceito", "considera se", "o que e"]): return "DEFINITION"
    return "GENERAL_CONTENT"


def sentence_split(text: str) -> list[str]:
    text = re.sub(r"\s+", " ", text).strip()
    parts = re.split(r"(?<=[.!?;])\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9])", text)
    return [p.strip() for p in parts if 25 <= len(p.strip()) <= 520]


def unique_texts(items: list[str], limit: int = 8) -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    for item in items:
        item = clean_text(item)
        key = norm(item)
        if not item or len(key) < 15 or key in seen:
            continue
        seen.add(key); out.append(item)
        if len(out) >= limit: break
    return out


def key_points_from_topic(paragraphs: list[str], lists: list[list[str]], limit: int = 5) -> list[str]:
    candidates = []
    for lst in lists:
        candidates.extend(lst[:4])
    for p in paragraphs:
        candidates.extend(sentence_split(p))
    important = ["deve", "devera", "nao", "risco", "perigo", "obrig", "epi", "epc", "emerg", "respons", "controle", "preven"]
    scored = []
    for x in candidates:
        low = norm(x); score = sum(2 for k in important if k in low) + (1 if 45 <= len(x) <= 230 else 0)
        scored.append((score, x))
    scored.sort(key=lambda z: (-z[0], len(z[1])))
    return unique_texts([x for _, x in scored], limit)


def topic_callout(ctype: str, points: list[str]) -> dict[str, str] | None:
    if not points: return None
    titles = {
        "RISK":"Atenção ao risco", "PROHIBITION":"Condição impeditiva / proibição", "OBLIGATION":"Obrigatório",
        "EMERGENCY":"Em caso de emergência", "EPI":"Proteção individual", "EPC":"Proteção coletiva",
        "LEGAL_REFERENCE":"Referência normativa", "RESPONSIBILITY":"Responsabilidade", "DEFINITION":"Conceito-chave",
        "PROCEDURE":"Ponto do procedimento",
    }
    return {"kind":ctype, "title":titles[ctype], "text":points[0]} if ctype in titles else None




def teaching_statement_quality(text: str) -> float:
    """Score whether a source fragment is suitable to show/quiz as a complete teaching statement."""
    t = clean_text(text)
    n = norm(t)
    if not t or len(t) < 24 or len(t) > 320:
        return -3.0
    score = 0.0
    # Complete sentences / requirements are preferable to slide fragments and prompts.
    if t[-1:] in '.;': score += .45
    if re.search(r"\b(deve|devera|e|sao|considera|estabelece|aplica|garantir|utilizar|usar|impede|risco|protecao|responsabilidade)\b", n): score += .55
    if 7 <= len(t.split()) <= 42: score += .45
    if starts_lower_fragment(t): score -= 1.2
    if t.endswith(':'): score -= .9
    if '?' in t: score -= .65
    if re.match(r"^(meu|minha|meus|minhas|tenho|voce|você|qual|quais|como|por que|porque)\b", n): score -= .9
    if re.search(r"\b(tenho alguma duvida|marque|assinale|responda|pergunta)\b", n): score -= 1.2
    # OCR/layout fragments often contain abrupt all-caps islands or repeated punctuation.
    if len(re.findall(r"[!?]{2,}|\.{3,}", t)): score -= .45
    letters=''.join(ch for ch in t if ch.isalpha())
    if len(t.split()) >= 4 and letters and letters.upper()==letters and not re.search(r'[.;:]', t): score -= 1.35
    if len(re.findall(r'\b[A-ZÁÉÍÓÚÂÊÔÃÕÇ]{3,}\b', t)) >= 4 and not re.search(r'[.;]', t): score -= .8
    return score


def good_teaching_statements(items: list[str], limit: int = 8) -> list[str]:
    scored=[]
    for x in unique_texts(items, 30):
        q=teaching_statement_quality(x)
        if q >= .15:
            scored.append((q, x))
    scored.sort(key=lambda z:(-z[0], len(z[1])))
    return [x for _,x in scored[:limit]]


def select_answer_statement(ctype: str, candidates: list[str]) -> str | None:
    """Choose the source-backed statement that best matches the question's semantic type."""
    clean = good_teaching_statements(candidates, 10)
    if not clean:
        return None
    keywords = {
        "BENEFIT": ["benef", "melhor", "reduz", "contrib", "confort", "produt", "qualidade", "prevenc"],
        "CONSEQUENCE": ["consequ", "lesao", "afast", "dano", "doenca", "dor", "fadiga", "impact", "agrav"],
        "RISK": ["risco", "perigo", "expos", "inadequ", "postura", "repet", "queda", "acidente"],
        "PRACTICE": ["deve", "realiz", "ajust", "respeit", "interromp", "movimento", "orient"],
        "RESPONSIBILITY": ["cabe", "deve", "garant", "assegur", "respons", "fornecer", "informar"],
        "OBLIGATION": ["deve", "devera", "obrig", "necess", "exigir", "cumprir"],
        "PROHIBITION": ["nao deve", "nao devera", "imped", "interromp", "proibid", "suspens"],
        "EPI": ["epi", "equipamento", "protecao individual", "adequado", "uso", "fornecer"],
        "EPC": ["epc", "protecao coletiva", "isol", "sinaliz", "guarda corpo"],
        "EMERGENCY": ["emerg", "resgate", "salvamento", "socorro", "acidente", "acion"],
        "LEGAL_REFERENCE": ["estabelece", "altera", "norma", "portaria", "lei", "requisito"],
        "DEFINITION": ["considera se", "define", "definido", "e o", "significa"],
    }
    keys=keywords.get(ctype, [])
    scored=[]
    for i,x in enumerate(clean):
        n=norm(x)
        if ctype == "CONSEQUENCE":
            strong=["lesao","afast","dano","doenca","dor","fadiga","impact","agrav","morte","reducao"]
            sem=sum(2.0 for k in strong if k in n) + (.25 if "consequ" in n else 0)
        else:
            sem=sum(1.4 for k in keys if k in n)
        scored.append((sem + teaching_statement_quality(x) - i*.03, x))
    scored.sort(key=lambda z:(-z[0], len(z[1])))
    return scored[0][1]


def module_pedagogical_role(title: str) -> str:
    n = norm(title)
    if re.search(r"\b(introducao|apresentacao|boas vindas|visao geral|conceitos iniciais|fundamentos)\b", n): return 'INTRO'
    if re.search(r"\b(beneficio|beneficios|importancia|objetivo|finalidade|campo de aplicacao)\b", n): return 'CONTEXT'
    # Consequence must win over words such as “riscos” inside titles like “Consequências dos Riscos”.
    if re.search(r"\b(consequencia|consequencias|doenca|doencas|efeito|efeitos|lesao|lesoes)\b", n): return 'CONSEQUENCE'
    if re.search(r"\b(risco|riscos|perigo|perigos|causa|causas|ato inseguro|condicao insegura|acidente|acidentes)\b", n): return 'RISK'
    if 'preventiv' in n or re.search(r"\b(prevencao|controle|medidas de protecao|epi|epc|procedimento|responsabilidade|deveres|obrigacao)\b", n): return 'CONTROL'
    if re.search(r"\b(emergencia|salvamento|resgate|primeiros socorros)\b", n): return 'EMERGENCY'
    if re.search(r"\b(exercicio|exercicios|pratica|alongamento|atividade pratica|simulacao)\b", n): return 'PRACTICE'
    if re.search(r"\b(encerramento|conclusao|resumo|revisao final)\b", n): return 'CLOSING'
    return 'CONTENT'


def cohere_module_order(modules: list[dict[str, Any]], strategy: str) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    """Preserve the document's authoritative sequence.

    Ordering rules are intentionally conservative:
    - When an agenda/outline was detected, its order is authoritative.
    - Without an agenda, modules are shown strictly in the order of their first source page.

    The engine must never move a module merely because its title looks pedagogically like
    an introduction, context, risk, consequence, control, practice, etc. Semantic roles are
    still recorded for other features, but they do not change module order.
    """
    if not modules:
        return modules, {'changed': False, 'reason': 'empty'}

    for i, m in enumerate(modules):
        m['sourceOrder'] = i
        m['pedagogicalRole'] = module_pedagogical_role(m.get('learningTitle') or m.get('title') or '')

    if strategy == 'agenda_guided':
        ordered = list(modules)
        reason = 'agenda_preserved'
    else:
        ordered = sorted(
            modules,
            key=lambda m: (
                int(m.get('sourceStartPage') or 10**9),
                int(m.get('sourceEndPage') or 10**9),
                int(m.get('sourceOrder') or 0),
            ),
        )
        reason = 'source_page_order'

    for i, m in enumerate(ordered):
        m['displayOrder'] = i

    changed = [m['id'] for i, m in enumerate(ordered) if m.get('sourceOrder') != i]
    return ordered, {
        'changed': bool(changed),
        'reason': reason,
        'movedModuleIds': changed,
    }


def build_checkpoint(title: str, points: list[str], source_pages: list[int]) -> dict[str, Any] | None:
    candidates = good_teaching_statements(points, 3)
    if not candidates:
        return None
    return {
        "type":"true_false", "question":f"De acordo com o material sobre {title}, a afirmação abaixo está correta?",
        "statement":candidates[0], "options":["Verdadeiro","Falso"], "correctIndex":0,
        "explanation":"A afirmação foi extraída deste tópico. Revise a explicação e use a fonte indicada apenas para conferir a redação original.",
        "sourcePages":source_pages,
    }




def first_source_statement(paragraphs: list[str], points: list[str]) -> str:
    for p in paragraphs:
        ss = sentence_split(p)
        if ss:
            return ss[0]
    return points[0] if points else ""


def extract_glossary(content: str, limit: int = 6) -> list[dict[str, str]]:
    """Extract explicit Termo: definição pairs without inventing definitions."""
    out: list[dict[str, str]] = []
    # Works well for training slides such as "Risco: ...", "Perigo: ...".
    patt = re.compile(r"(?:^|\n|(?<=[.!?])\s+)([A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-Za-zÀ-ÿ0-9 /()\-]{1,55}):\s*([^\n]{20,520})")
    for m in patt.finditer(content or ""):
        term = clean_text(m.group(1)).rstrip(":")
        definition = clean_text(m.group(2))
        # Avoid swallowing a sequence of unrelated legal metadata.
        definition = re.split(r"(?=\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-Za-zÀ-ÿ /()\-]{1,40}:\s)", definition)[0].strip()
        if len(term.split()) <= 8 and len(definition) >= 20:
            out.append({"term": term, "definition": definition[:520], "origin": "SOURCE"})
        if len(out) >= limit:
            break
    # Dedupe terms.
    dedup=[]; seen=set()
    for x in out:
        k=norm(x["term"])
        if k and k not in seen:
            seen.add(k); dedup.append(x)
    return dedup


def extract_legal_references(content: str, limit: int = 8) -> list[str]:
    refs=[]
    patterns=[
        r"\bPortaria\s+(?:MTP|MTE|MTb)?\s*(?:n[ºo°.]?\s*)?[\d.]+(?:/\d{2,4})?(?:,?\s*de\s+\d{1,2}\s+de\s+[A-Za-zÀ-ÿ]+\s+de\s+\d{4})?",
        r"\bLei\s+(?:n[ºo°.]?\s*)?[\d.]+(?:/\d{2,4})?",
        r"\bNR\s*[-–—]?\s*\d+(?:\.\d+)*",
        r"\bNorma Regulamentadora\s+(?:n[ºo°.]?\s*)?\d+",
        r"\bitem\s+\d+(?:\.\d+){1,5}",
    ]
    for pat in patterns:
        for m in re.finditer(pat, content or "", flags=re.I):
            refs.append(clean_text(m.group(0)))
    return unique_texts(refs, limit)


def infer_learning_title(title: str, ctype: str, content: str) -> str:
    """Create a learner-friendly label while preserving sourceTitle separately."""
    t=polish_heading(title).strip()
    n=norm(t); c=norm(content[:2200])
    if n in {"objetivo", "objetivos"}:
        return "Objetivo e alcance do tema"
    if n.startswith("processo") and any(k in c for k in ["portaria", "altera", "alteracao"]):
        return "O que a norma determina"
    if "seguintes alteracoes" in n or n == "alteracoes":
        return "Alterações previstas na norma"
    if re.search(r"\bportaria\b", n):
        # Keep the legal identifier, but tell the learner what kind of lesson this is.
        if "altera" in c or "alteracao" in c or "alteracoes" in c:
            return f"O que muda com a {t.title() if t.isupper() else t}"
        return f"Entenda a {t.title() if t.isupper() else t}"
    if "definicao legal" in n:
        if re.search(r"\bepi\b", c) or "equipamento de protecao individual" in c:
            return "Definição legal de EPI"
        return "Entenda a definição legal"
    if "certificado de aprovacao" in n:
        return "Certificado de Aprovação (CA)"
    if n.startswith("exigir seu uso"):
        return "Exigência de uso do EPI" if re.search(r"\bepi\b", c) else "Exigência de uso"
    if "deveres do empregado" in n or "deveres do trabalhador" in n:
        return "Deveres do trabalhador"
    if "deveres do empregador" in n:
        return "Deveres do empregador"
    if "ficha de epi" in n:
        return "Ficha de EPI e registro de fornecimento"
    if "aplicacao de epi" in n:
        return "Aplicação do EPI"
    if n.startswith("e classificacao"):
        return "Classificação do EPI" if re.search(r"\bepi\b", c) else t[2:].strip().title()
    if "uso a que se destina" in n:
        return "Uso correto e finalidade do EPI" if re.search(r"\bepi\b", c) else "Uso correto e finalidade"
    return t


def definition_from_source(title: str, content: str, summary: str, points: list[str]) -> str:
    c=clean_text(content)
    candidates=[]
    for p in c.split("\n"):
        candidates.extend(sentence_split(p))
    title_tokens=set(tokens(title))
    scored=[]
    for sent in candidates:
        n=norm(sent)
        score=0
        if any(k in n for k in ["considera se", "aplica se", "define se", "e o que", "e definido", "significa"]): score+=4
        if re.search(r"\be\b", n): score+=1
        score += min(3, len(title_tokens & set(tokens(sent))))
        if len(sent)>420: score-=1
        scored.append((score,sent))
    if scored:
        scored.sort(key=lambda x:(-x[0],len(x[1])))
        if scored[0][0]>0:
            return clean_text(scored[0][1])[:700]
    return clean_text(summary or (points[0] if points else ""))[:700]


def simplify_legal_source(content: str, summary: str, points: list[str]) -> str:
    c=clean_text(content)
    compact=re.sub(r"\s+", " ", c)
    change=re.search(r"((?:A\s+)?Portaria[^.]{0,180}?\baltera\s+o\s+item\s+\d+(?:\.\d+){1,5}[^.]{0,220})", compact, re.I)
    if change:
        clause=clean_text(change.group(1))
        clause=re.sub(r"^PORTARIA([^A-Za-zÀ-ÿ]+)", "Portaria\\1", clause, flags=re.I)
        return clause[:700]
    # Prefer a sentence that explicitly says what a legal act changes/establishes.
    sentences=[]
    for p in c.split("\n"):
        sentences.extend(sentence_split(p))
    candidates=[x for x in sentences if any(k in norm(x) for k in ["altera","estabelece","aprova","regulamenta","objetivo","considera se"]) ]
    base=(candidates[0] if candidates else (summary or (points[0] if points else first_source_statement([c], points))))
    if not base:
        return ""
    # Remove bureaucratic lead-ins that do not help the learner understand the effect of the rule.
    base=re.sub(r"^.*?\bresolve:\s*", "", base, flags=re.I)
    return clean_text(base)[:700]


def pedagogical_objective(ctype: str, learning_title: str, content: str, points: list[str], glossary: list[dict[str,str]]) -> str:
    c=norm(content)
    if ctype=="LEGAL_REFERENCE":
        if "altera" in c or "alteracao" in c:
            return "Explicar qual alteração normativa o material apresenta e identificar o requisito afetado."
        return "Interpretar a referência normativa em linguagem simples e localizar o requisito principal apresentado."
    if ctype=="DEFINITION":
        term=glossary[0]["term"] if glossary else learning_title
        term=re.sub(r"^O que é\s+", "", term, flags=re.I).rstrip("?")
        return f"Explicar, com suas palavras, como o material define {term}."
    if ctype=="RESPONSIBILITY":
        return "Distinguir quem deve agir e quais responsabilidades o material atribui a cada parte."
    if ctype=="OBLIGATION":
        return "Reconhecer o que precisa ser cumprido e transformar o requisito em uma verificação prática."
    if ctype=="PROHIBITION":
        return "Identificar quando a atividade deve ser impedida ou interrompida segundo o material."
    if ctype=="RISK":
        return "Reconhecer o risco descrito, suas condições associadas e as medidas de controle apresentadas."
    if ctype=="PROCEDURE":
        return "Organizar a sequência de ações e os cuidados necessários antes e durante a execução."
    if ctype=="EPI":
        if "empregador" in c or "empregado" in c or "trabalhador" in c:
            return "Relacionar os requisitos de EPI às responsabilidades de fornecimento, uso, guarda e controle apresentadas."
        return "Reconhecer a finalidade e os requisitos de uso do EPI apresentados no material."
    if ctype=="EPC":
        return "Reconhecer a finalidade das medidas de proteção coletiva e quando elas aparecem no material."
    if ctype=="EMERGENCY":
        return "Identificar as condutas, recursos e responsabilidades previstos para uma situação de emergência."
    if ctype=="BENEFIT":
        return "Relacionar os benefícios apresentados às melhorias concretas nas condições e na organização do trabalho."
    if ctype=="CONSEQUENCE":
        return "Reconhecer as consequências ou efeitos apresentados e relacioná-los aos fatores que precisam ser prevenidos."
    if ctype=="PRACTICE":
        return "Aplicar as orientações práticas do material respeitando finalidade, limites e condições de execução."
    if norm(learning_title).startswith("objetivo") and any(k in c for k in ["estabelece", "objetivo", "garantir"]):
        return "Explicar qual é o objetivo apresentado no material e quais resultados de segurança e saúde ele busca assegurar."
    return f"Explicar os pontos principais de {learning_title} em linguagem própria, usando a fonte apenas para conferência."


def build_pedagogy(title: str, ctype: str, content: str, paragraphs: list[str], lists_: list[list[str]], points: list[str], summary: str) -> dict[str, Any]:
    learning_title=infer_learning_title(title, ctype, content)
    glossary=extract_glossary(content)
    legal_refs=extract_legal_references(content)
    first=first_source_statement(paragraphs, points)

    if ctype=="LEGAL_REFERENCE":
        simple=simplify_legal_source(content, summary, points)
        opening="Antes de memorizar números de portaria, lei ou item, entenda primeiro o efeito prático da regra apresentada neste trecho."
        practice="Leia a referência normativa como uma pergunta: o que mudou, qual requisito foi afetado e quem precisa observar essa regra? Depois confirme as respostas na fonte."
        focus="O que a norma muda ou estabelece"
    elif ctype=="DEFINITION":
        if glossary:
            g=glossary[0]; simple=f"No material, {g['term']} é definido como: {g['definition']}"
        else:
            simple=definition_from_source(title, content, summary, points)
        opening="Comece pelo significado do termo. Entender a definição evita decorar regras sem saber quando elas se aplicam."
        practice="Explique o conceito com suas palavras e compare sua explicação com a definição de origem."
        focus="Definição que você precisa dominar"
    elif ctype=="RESPONSIBILITY":
        simple=("Este tópico reúne responsabilidades. O primeiro dever destacado pelo material é: " + points[0]) if points else (summary or first)
        opening="Aqui o mais importante é separar claramente quem deve fazer o quê."
        practice="Transforme os deveres abaixo em um checklist: para cada item, confirme quem é o responsável e como o cumprimento pode ser demonstrado."
        focus="Quem faz o quê"
    elif ctype in {"OBLIGATION","PROHIBITION"}:
        simple=(("A regra central deste tópico é: " if ctype=="OBLIGATION" else "A condição de impedimento destacada é: ") + points[0]) if points else (summary or first)
        opening="Este conteúdo deve virar uma decisão prática, não apenas uma frase para memorizar."
        practice="Antes da atividade, use os pontos abaixo como critérios de liberação: se um requisito obrigatório não estiver atendido, pare e revise a condição descrita no material."
        focus="Regra de decisão"
    elif ctype=="RISK":
        simple=("O material chama atenção para o seguinte risco ou condição: " + points[0]) if points else (summary or first)
        opening="Risco só faz sentido quando você consegue reconhecê-lo na atividade real."
        practice="Observe a tarefa e procure sinais da condição descrita. Depois associe o risco às medidas de prevenção ou controle apresentadas no próprio material."
        focus="Risco e controle"
    elif ctype=="PROCEDURE":
        simple=("O material orienta a execução a partir deste ponto: " + points[0]) if points else (summary or first)
        opening="Procedimentos ficam mais fáceis de aprender quando são convertidos em sequência de decisão e ação."
        practice="Percorra os itens na ordem em que seriam verificados antes e durante a atividade. Marque mentalmente o que acontece se uma etapa não estiver atendida."
        focus="Sequência e cuidados"
    elif ctype in {"EPI","EPC"}:
        label="proteção individual" if ctype=="EPI" else "proteção coletiva"
        simple=(f"Neste trecho, o ponto central sobre {label} é: " + points[0]) if points else (summary or first)
        opening=f"Não basta reconhecer o equipamento: o objetivo é entender sua finalidade, requisitos e forma correta de aplicação como {label}."
        practice="Converta o conteúdo em inspeção: o item é adequado ao risco? está em condição de uso? atende ao requisito descrito? quem deve fornecer, usar, guardar ou controlar?"
        focus="O que verificar"
    elif ctype=="EMERGENCY":
        simple=("O material estabelece como ponto de resposta: " + points[0]) if points else (summary or first)
        opening="Em emergência, o conteúdo precisa ser lembrado como uma sequência de resposta, não como texto corrido."
        practice="Revise quem deve ser acionado, quais recursos precisam estar disponíveis e qual é a sequência de resposta indicada no material."
        focus="Resposta esperada"
    elif ctype=="BENEFIT":
        simple=("O benefício central apresentado é: " + points[0]) if points else (summary or first)
        opening="Aqui o objetivo é entender o ganho prático do tema, e não decorar uma lista de vantagens sem contexto."
        practice="Relacione cada benefício às condições que precisam existir para que ele apareça de verdade na rotina de trabalho."
        focus="Benefícios e resultados esperados"
    elif ctype=="CONSEQUENCE":
        simple=("A consequência ou efeito destacado pelo material é: " + points[0]) if points else (summary or first)
        opening="Entenda primeiro o impacto descrito e depois conecte esse impacto aos fatores de risco e às medidas de prevenção estudadas."
        practice="Use as consequências apresentadas para reconhecer por que agir antes da exposição é mais efetivo do que corrigir somente depois do evento."
        focus="Consequências que precisam ser reconhecidas"
    elif ctype=="PRACTICE":
        simple=("A orientação prática central é: " + points[0]) if points else (summary or first)
        opening="Esta etapa é prática, mas continua vinculada ao objetivo do treinamento e aos limites descritos no material."
        practice="Execute ou simule a orientação apenas dentro das condições apresentadas, sem tratar a prática como substituta das medidas de prevenção do posto ou da atividade."
        focus="Como aplicar com segurança"
    else:
        simple=summary or first
        # Enrich a short generic summary with source-backed points instead of padding the
        # lesson with generic instructions.
        extras=[x for x in unique_texts(points + [x for lst in lists_ for x in lst], 4) if x and norm(x) not in norm(simple)]
        if simple and len(simple) < 520 and extras:
            simple=clean_text(simple + " " + " ".join(extras[:2]))[:760]
        if intro_like_title(learning_title) or intro_like_title(title):
            opening="Use esta abertura para entender o tema, o objetivo do material e como os próximos assuntos se conectam. Não é necessário responder uma pergunta antes de receber o conteúdo principal."
            practice=""
            focus="Visão geral do módulo"
        elif norm(learning_title).startswith("objetivo"):
            opening="Antes de avançar, entenda qual é o propósito apresentado no material e que resultado de segurança e saúde esse conteúdo pretende assegurar."
            practice=""
            focus="Propósito do conteúdo"
        else:
            opening=f"Neste tópico, o foco é compreender “{learning_title}” em uma sequência mais clara do que a redação original do PDF."
            practice=""
            focus="Ideias principais"

    remember=unique_texts(points + [x for lst in lists_ for x in lst], 6)
    if not remember and first:
        remember=[first]
    return {
        "learningTitle":learning_title,
        "opening":opening,
        "simpleExplanation":clean_text(simple)[:900],
        "focusTitle":focus,
        "remember":remember,
        "practicalApplication":practice,
        "glossary":glossary,
        "legalReferences":legal_refs,
        "learningGoal":pedagogical_objective(ctype, learning_title, content, points, glossary),
        "origin":"ADAPTED_FROM_SOURCE",
    }


def infer_module_learning_title(title: str, topics: list[dict[str, Any]]) -> str:
    combined=" ".join((t.get("content") or "")[:700] for t in topics)
    ctype=topics[0].get("contentType","GENERAL_CONTENT") if topics else "GENERAL_CONTENT"
    return infer_learning_title(title, ctype, combined)

def render_visual_assets(pdf_path: Path, project_id: str, pages: list[dict[str, Any]], assets_root: Path) -> dict[int, list[dict[str, Any]]]:
    """Extract useful visual regions from the uploaded PDF. No source PDF is bundled with the application."""
    out: dict[int, list[dict[str, Any]]] = defaultdict(list)
    project_dir = assets_root / project_id
    project_dir.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(pdf_path)
    try:
        for p in pages:
            rects = p.get("largeImageRects", [])
            if not rects:
                continue
            # Keep at most 4 meaningful visuals per page, avoiding tiny logos.
            page = doc[p["page"] - 1]
            page_area = p["width"] * p["height"]
            unique = []
            for rect in rects:
                r = fitz.Rect(rect)
                area = r.width * r.height
                if area < page_area * .035: continue
                if r.y0 > p["height"] * .82 and area < page_area * .12: continue
                if any(abs(r.x0-u.x0)<4 and abs(r.y0-u.y0)<4 and abs(r.x1-u.x1)<4 and abs(r.y1-u.y1)<4 for u in unique): continue
                unique.append(r)
            for i, r in enumerate(unique[:4], 1):
                # Clip with a small padding; 1.4x is readable without making local storage huge.
                pad = 3
                clip = fitz.Rect(max(0,r.x0-pad),max(0,r.y0-pad),min(page.rect.width,r.x1+pad),min(page.rect.height,r.y1+pad))
                pix = page.get_pixmap(matrix=fitz.Matrix(1.4,1.4), clip=clip, alpha=False)
                name = f"p{p['page']:03d}_{i}.jpg"
                target = project_dir / name
                pix.save(target, jpg_quality=82)
                out[p["page"]].append({"page":p["page"], "url":f"/assets/{project_id}/{name}", "kind":"source_visual"})
    finally:
        doc.close()
    return out



def source_page_hotspots(page: dict[str, Any]) -> list[dict[str, Any]]:
    """Create lightweight clickable regions from the original page geometry.

    Hotspots never replace or rewrite the PDF. They only point to source text that is
    already present on the page and are positioned using percentages so the overlay
    scales with the rendered page image.
    """
    out: list[dict[str, Any]] = []
    seen: set[str] = set()
    critical_terms = {
        "nao", "não", "obrig", "deve", "risco", "perigo", "epi", "epc", "emerg", "proibid",
        "responsab", "atencao", "atenção", "importante", "procedimento", "ancor", "queda",
    }
    for line in page.get("lines", []):
        text = clean_text(line.get("text", ""))
        if len(text) < 5:
            continue
        n = norm(text)
        is_heading = float(line.get("headingScore", 0)) >= 1.28
        is_critical = any(term in n for term in critical_terms) and len(text.split()) >= 4
        is_bullet = is_list_item(text) and len(text.split()) >= 5
        if not (is_heading or is_critical or is_bullet):
            continue
        key = re.sub(r"\W+", "", n)[:100]
        if not key or key in seen:
            continue
        seen.add(key)
        width = max(1.0, float(page.get("width", 1)))
        height = max(1.0, float(page.get("height", 1)))
        x0, y0, x1, y1 = (float(line.get(k, 0)) for k in ("x0", "y0", "x1", "y1"))
        # Slightly expand the region so it is easy to click without covering the source.
        x = max(0.0, (x0 / width) * 100 - .5)
        y = max(0.0, (y0 / height) * 100 - .35)
        w = min(100 - x, max(4.0, ((x1 - x0) / width) * 100 + 1.0))
        h = min(100 - y, max(2.6, ((y1 - y0) / height) * 100 + .7))
        kind = "HEADING" if is_heading else "CRITICAL" if is_critical else "SOURCE_POINT"
        out.append({
            "x": round(x, 2), "y": round(y, 2), "w": round(w, 2), "h": round(h, 2),
            "text": text[:520], "kind": kind,
        })
        if len(out) >= 6:
            break
    return out


def render_source_pages(pdf_path: Path, project_id: str, pages: list[dict[str, Any]], assets_root: Path) -> dict[int, dict[str, Any]]:
    """Render an exact visual copy of every original PDF page for the course player."""
    out: dict[int, dict[str, Any]] = {}
    project_dir = assets_root / project_id / "pages"
    project_dir.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(pdf_path)
    try:
        for p in pages:
            page = doc[p["page"] - 1]
            # 1.65x keeps normal A4 text readable while remaining practical for local use.
            pix = page.get_pixmap(matrix=fitz.Matrix(1.65, 1.65), alpha=False)
            name = f"page-{p['page']:04d}.jpg"
            target = project_dir / name
            pix.save(target, jpg_quality=88)
            out[p["page"]] = {
                "page": p["page"],
                "url": f"/assets/{project_id}/pages/{name}",
                "width": int(pix.width), "height": int(pix.height),
                "role": p.get("role", "CONTENT"),
                "title": p.get("title", ""),
                "hotspots": source_page_hotspots(p),
            }
    finally:
        doc.close()
    return out


def page_learning_blocks(text: str) -> list[str]:
    """Reconstruct readable statements from one PDF page without crossing page boundaries."""
    lines=[clean_text(x) for x in str(text or "").splitlines() if clean_text(x)]
    out=[]; buf=""
    list_start=re.compile(r"^(?:[•✓➢▪◦\-]|[a-zA-Z]\)|[IVX]+\.|\d+(?:\.\d+){1,4}\s)")
    def heading_like(x: str) -> bool:
        words=x.split(); n=norm(x)
        if not words or len(words)>12 or re.search(r"[.;!?]$",x): return False
        if re.match(r"^\d+(?:\.\d+){0,3}\s*[-–—]?\s*[A-ZÁÉÍÓÚÂÊÔÃÕÇ]",x) and len(words)<=8: return True
        letters=''.join(c for c in x if c.isalpha())
        if letters and letters.upper()==letters and len(words)<=10: return True
        if any(n.startswith(k) for k in ["objetivo","definicoes","planejamento","exemplos","responsabilidades","medidas de","normas e regulamentos"]): return True
        return False
    def flush():
        nonlocal buf
        b=clean_text(buf)
        if b: out.append(b)
        buf=""
    for line in lines:
        if heading_like(line):
            flush(); continue
        is_new=list_start.match(line) is not None
        if is_new:
            flush(); buf=line; continue
        if not buf:
            buf=line; continue
        # Keep wrapped regulatory/body lines together until a real sentence/clause boundary.
        if not re.search(r"[.!?;:]$",buf) or buf.endswith((',', '-')) or starts_lower_fragment(line):
            if buf.endswith('-'): buf=buf[:-1]+line
            else: buf=clean_text(buf+' '+line)
        else:
            flush(); buf=line
        if len(buf)>500:
            flush()
    flush()
    return out

def enrich_source_pages_with_learning(source_pages: list[dict[str, Any]], modules: list[dict[str, Any]]) -> None:
    """Attach teaching hints made only from the exact page text.

    Topic/module labels can span several pages, but the student's support text must never leak
    a statement from the next/previous page. Therefore key points are extracted from each rendered
    page itself; topic metadata is used only to label the subject.
    """
    by_page = {int(p["page"]): p for p in source_pages}
    for page in source_pages:
        page["learning"] = {"topics": [], "keyPoints": [], "explanations": [], "types": [], "topicIds": [], "moduleIds": []}

    for m in modules:
        for t in m.get("topics", []):
            title = t.get("learningTitle") or t.get("title") or ""
            ctype = t.get("contentType") or "GENERAL_CONTENT"
            for page_num in t.get("sourcePages", []):
                page = by_page.get(int(page_num))
                if not page:
                    continue
                learning = page["learning"]
                if title and title not in learning["topics"]:
                    learning["topics"].append(title)
                if ctype not in learning["types"]:
                    learning["types"].append(ctype)
                if t.get("id") and t.get("id") not in learning["topicIds"]:
                    learning["topicIds"].append(t.get("id"))
                if m.get("id") and m.get("id") not in learning["moduleIds"]:
                    learning["moduleIds"].append(m.get("id"))

    for page in source_pages:
        learning = page.get("learning") or {}
        page_text = clean_text(page.get("text", ""))
        # On transition pages, regulatory/context lines from the previous subject can appear
        # above the new page title. For learner support, prefer only the text at/after the
        # detected title so the final modules never inherit explanatory bullets from the
        # previous module. The rendered original page remains untouched.
        support_text = page_text
        page_title = clean_text(page.get("title", ""))
        if page_title:
            low_text, low_title = page_text.casefold(), page_title.casefold()
            pos = low_text.find(low_title)
            if pos >= 0:
                candidate = clean_text(page_text[pos + len(page_title):])
                if len(re.findall(r"\w+", candidate)) >= 8:
                    support_text = candidate
        # Reconstruct wrapped lines from this page only. This keeps learner support readable
        # without ever borrowing text from an adjacent page.
        raw = page_learning_blocks(support_text)
        points = good_teaching_statements(raw, 6)
        if len(points) < 2 and support_text:
            clauses = [clean_text(x) for x in re.split(r"\s+(?=(?:[a-z]\)|[IVX]+\.|\d+(?:\.\d+)+\s))", support_text) if clean_text(x)]
            points = unique_texts(points + good_teaching_statements(clauses, 6), 6)
        learning["topics"] = unique_texts(learning.get("topics", []), 3)
        learning["keyPoints"] = unique_texts(points, 4)
        learning["explanations"] = [f"Nesta página, o material destaca: {learning['keyPoints'][0]}"] if learning["keyPoints"] else []
        learning["types"] = list(dict.fromkeys(learning.get("types", [])))[:3]
        learning["topicIds"] = list(dict.fromkeys(learning.get("topicIds", [])))[:6]
        learning["moduleIds"] = list(dict.fromkeys(learning.get("moduleIds", [])))[:3]


def assign_display_pages(modules: list[dict[str, Any]], pages: list[dict[str, Any]]) -> None:
    """Keep every original page in the course flow while preserving module boundaries."""
    if not modules or not pages:
        return
    all_nums = [p["page"] for p in pages]
    first_start = modules[0].get("sourceStartPage", min(all_nums))
    last_end = modules[-1].get("sourceEndPage", max(all_nums))
    prefix = [n for n in all_nums if n < first_start]
    suffix = [n for n in all_nums if n > last_end]
    for m in modules:
        m["displayPages"] = list(m.get("sourcePages", []))
    if prefix:
        modules[0]["displayPages"] = prefix + modules[0]["displayPages"]
    if suffix:
        modules[-1]["displayPages"] = modules[-1]["displayPages"] + suffix
    # De-duplicate while preserving source order.
    for m in modules:
        m["displayPages"] = list(dict.fromkeys(m.get("displayPages", [])))


def build_topics_for_span(span: dict[str, Any], pages: list[dict[str, Any]], visual_map: dict[int, list[dict[str, Any]]]) -> tuple[list[dict[str, Any]], int]:
    selected = [p for p in pages if span["startPage"] <= p["page"] <= span["endPage"] and p["role"] != "CLOSING"]
    module_title = span["title"]
    segments: list[dict[str, Any]] = []
    current: dict[str, Any] | None = None
    continuity_total = 0

    def ensure(title: str | None, page: int):
        nonlocal current
        if current is None:
            current = {"title": title or "Conceitos principais", "records": [], "pages": [], "visuals": []}
        if page not in current["pages"]:
            current["pages"].append(page)

    def close_current():
        nonlocal current
        if current and (current["records"] or current["visuals"]):
            segments.append(current)
        current = None

    for p in selected:
        if p["role"] == "VISUAL_SUPPORT":
            ensure(None, p["page"])
            current["visuals"].extend(visual_map.get(p["page"], []))
            continue
        lines = p["lines"]
        skipped_header_until_y = -1.0
        for li, l in enumerate(lines):
            txt = clean_text(l["text"])
            sc = l.get("headingScore", -9)
            is_head = sc >= 1.15 and not is_list_item(txt)
            if is_head and l.get("y0", 0) <= skipped_header_until_y:
                continue
            high_similarity = text_similarity(txt, module_title) >= .90
            first_header_overlap = p["page"] == span["startPage"] and l.get("y0", 9999) < p["height"] * .20 and distinctive_overlap(module_title, txt) >= .40
            same_module = high_similarity or first_header_overlap
            # A module heading at its start is structural. A repeated module label on later pages is ignored
            # when the page also contains a more specific subheading. Otherwise it can legitimately be a lesson topic.
            if is_head and same_module and (p["page"] == span["startPage"] or len(p.get("headings", [])) > 1):
                if p["page"] == span["startPage"]:
                    skipped_header_until_y = max(skipped_header_until_y, l.get("y0", 0) + max(28.0, l.get("size", 16) * 2.0))
                continue
            # Avoid turning large body lines or sentence fragments into headings.
            if is_head and (starts_lower_fragment(txt) or len(txt.split()) > 18):
                is_head = False
            if is_head:
                # Very short diagram labels in the middle/lower page are usually annotations, not lesson sections.
                if len(txt.split()) <= 3 and sc < 2.0 and l.get("y0", 0) > p["height"] * .28:
                    is_head = False
                if is_head:
                    if current and (current["records"] or current["visuals"]):
                        close_current()
                    elif current and not current["records"]:
                        # Multi-line visual heading: join consecutive heading fragments (e.g. a title wrapping on two lines).
                        joined = clean_text(current["title"] + " " + txt)
                        current["title"] = joined[:140]
                        if p["page"] not in current["pages"]: current["pages"].append(p["page"])
                        continue
                    ensure(txt[:130], p["page"])
                    continue
            ensure(None, p["page"])
            rec = dict(l); rec["isHeading"] = False; rec["page"] = p["page"]
            current["records"].append(rec)
        if current:
            current["visuals"].extend(visual_map.get(p["page"], []))
    close_current()

    # Merge tiny fragments into a neighbor. This is the key anti-"one sentence = module/topic" guard.
    compact: list[dict[str, Any]] = []
    for seg in segments:
        chars = sum(len(r["text"]) for r in seg["records"])
        if chars < 55 and compact:
            compact[-1]["records"].extend(seg["records"]); compact[-1]["pages"] += [x for x in seg["pages"] if x not in compact[-1]["pages"]]
            compact[-1]["visuals"].extend(seg["visuals"])
            continue
        compact.append(seg)
    segments = compact
    if len(segments) >= 2:
        first_chars = sum(len(r["text"]) for r in segments[0]["records"])
        if first_chars < 45 and segments[0]["visuals"]:
            segments[1]["visuals"] = segments[0]["visuals"] + segments[1]["visuals"]
            segments[1]["pages"] = sorted(set(segments[0]["pages"] + segments[1]["pages"]))
            segments = segments[1:]
    if not segments:
        segments = [{"title":"Conceitos principais", "records":[], "pages":[span["startPage"]], "visuals":[]}]

    topics = []
    for seg in segments[:14]:
        paragraphs, lists_, cont = combine_lines_to_blocks(seg["records"])
        continuity_total += cont
        # If a heading accidentally absorbed the first sentence, do not invent filler: keep source-only content.
        content_parts = paragraphs + ["\n".join(f"• {x}" for x in lst) for lst in lists_]
        content = clean_text("\n\n".join(content_parts))
        title = polish_heading(seg["title"])
        if title == "Conceitos principais":
            # A safe readable title based on the module, not on a random sentence.
            title = "Visão geral" if len(segments) > 1 else module_title
        ctype = classify_topic(title, content)
        points = key_points_from_topic(paragraphs, lists_, 5)
        summary = topic_summary_from_source(paragraphs, lists_, points)
        pedagogy = build_pedagogy(title, ctype, content, paragraphs, lists_, points, summary)
        pages_src = sorted(set(seg["pages"]))
        word_count = len(re.findall(r"\w+", content))
        confidence = .94 if len(content) >= 180 else .80 if len(content) >= 80 else .62 if seg["visuals"] else .5
        steps = []
        if ctype == "PROCEDURE":
            for lst in lists_:
                steps.extend(lst)
            steps = unique_texts(steps, 7)
        topics.append({
            "id":str(uuid.uuid4()), "title":title, "content":content,
            "summary":summary, "paragraphs":paragraphs[:8], "lists":lists_[:5], "keyPoints":points,
            "learningTitle":pedagogy["learningTitle"], "pedagogy":pedagogy,
            "steps":steps, "callout":topic_callout(ctype, points), "checkpoint":build_checkpoint(pedagogy["learningTitle"], points, pages_src),
            "activity":{"title":"Conecte com a prática","prompt":f"Identifique como o tema “{title}” aparece na sua atividade e qual orientação do material deve ser lembrada."},
            "readingMinutes":max(1, round(word_count/170)), "contentType":ctype, "origin":"SOURCE",
            "sourcePages":pages_src, "confidence":confidence, "visuals":seg["visuals"][:8],
            "wordCount":word_count, "sourcePreview":content[:1100],
            "contentBlocks":({"paragraphs":len(paragraphs),"lists":len(lists_),"listItems":sum(len(x) for x in lists_),"visuals":len(seg["visuals"])})
        })
    return topics, continuity_total


def topic_summary_from_source(paragraphs: list[str], lists_: list[list[str]], points: list[str]) -> str:
    sentences: list[str] = []
    for p in paragraphs[:3]:
        sentences.extend(sentence_split(p))
        if len(sentences) >= 3: break
    if sentences:
        # Two source-backed sentences give the lesson enough context without inventing transitions.
        return clean_text(" ".join(sentences[:2]))[:720]
    if points:
        return points[0][:520]
    for lst in lists_:
        if lst: return lst[0][:520]
    return ""


def objective_for_type(ctype: str, title: str) -> str:
    title = polish_heading(title)
    templates = {
        "DEFINITION": f"Explicar o conceito de {title} conforme apresentado no material.",
        "LEGAL_REFERENCE": f"Identificar o que a referência normativa apresentada estabelece sobre {title}.",
        "RISK": f"Reconhecer os riscos, causas ou consequências relacionados a {title}.",
        "PROHIBITION": f"Identificar as situações em que {title} exige interrupção, impedimento ou atenção especial.",
        "OBLIGATION": f"Reconhecer os requisitos obrigatórios relacionados a {title}.",
        "PROCEDURE": f"Organizar as etapas e cuidados apresentados para {title}.",
        "EPI": f"Identificar os requisitos de seleção, uso, conservação ou aplicação relacionados a {title}.",
        "EPC": f"Reconhecer as medidas de proteção coletiva relacionadas a {title}.",
        "EMERGENCY": f"Reconhecer as condutas e recursos previstos para {title}.",
        "RESPONSIBILITY": f"Distinguir as responsabilidades e deveres apresentados em {title}.",
        "GENERAL_CONTENT": f"Compreender os pontos centrais apresentados em {title}.",
    }
    return templates.get(ctype, templates["GENERAL_CONTENT"])


def module_description_from_topics(title: str, topics: list[dict[str, Any]]) -> str:
    pieces = unique_texts([t.get("summary", "") for t in topics if t.get("summary")], 3)
    if pieces:
        return clean_text(" ".join(pieces))[:900]
    points = unique_texts([p for t in topics for p in t.get("keyPoints", [])], 3)
    if points:
        return clean_text(" ".join(points))[:900]
    return f"Conteúdo rastreado no documento para {title}."


def module_learning_objectives(title: str, topics: list[dict[str, Any]]) -> list[str]:
    objs=[]
    for t in topics:
        goal=(t.get("pedagogy") or {}).get("learningGoal")
        if goal and goal not in objs:
            objs.append(goal)
        if len(objs)>=4:
            break
    if objs:
        return objs
    return [objective_for_type(t.get("contentType","GENERAL_CONTENT"), t.get("title") or title) for t in topics[:3]] or [f"Explicar os pontos principais de {title}."]


def module_pedagogical_description(source_title: str, learning_title: str, topics: list[dict[str, Any]]) -> str:
    types=[t.get("contentType","GENERAL_CONTENT") for t in topics]
    learner_topics=unique_texts([t.get("learningTitle") or t.get("title","") for t in topics],4)
    names=", ".join(learner_topics[:3])
    if intro_like_title(learning_title) or intro_like_title(source_title):
        base="Este módulo apresenta o tema, os objetivos e os conceitos iniciais necessários para compreender a sequência do treinamento. A introdução orienta o aluno antes dos módulos técnicos e não exige pergunta interativa obrigatória."
    elif "LEGAL_REFERENCE" in types:
        base="Este módulo transforma a redação normativa em uma leitura orientada: primeiro identifique o que a fonte estabelece ou altera; depois localize o requisito e confira a redação original."
    elif "RESPONSIBILITY" in types:
        base="Este módulo organiza responsabilidades e deveres para que fique claro quem deve agir, o que precisa ser cumprido e como cada requisito aparece no material."
    elif any(x in types for x in ["EPI","EPC"]):
        base="Este módulo organiza os requisitos de proteção apresentados no material em finalidade, aplicação, verificação e responsabilidades, evitando que o aluno apenas memorize nomes de equipamentos."
    elif "RISK" in types:
        base="Este módulo foi organizado para reconhecer situações de risco, relacionar causas ou condições e conectar o conteúdo às medidas de prevenção e controle apresentadas na fonte."
    elif "PROCEDURE" in types:
        base="Este módulo converte o conteúdo em sequência de decisão e ação, destacando o que deve ser verificado antes e durante a atividade."
    elif "EMERGENCY" in types:
        base="Este módulo organiza o conteúdo de emergência como resposta prática: quem aciona, quais recursos são necessários e quais condutas precisam ser lembradas."
    else:
        base=f"Este módulo apresenta {learning_title} em uma sequência de aprendizagem, separando explicação, pontos essenciais, aplicação e verificação de entendimento."
    if names and norm(names)!=norm(learning_title):
        base += f" Os principais tópicos trabalhados são: {names}."
    return clean_text(base)[:900]


def build_modules(pages: list[dict[str, Any]], spans: list[dict[str, Any]], visual_map: dict[int, list[dict[str, Any]]]) -> tuple[list[dict[str, Any]], int]:
    modules = []; continuity = 0
    for span in spans:
        topics, cont = build_topics_for_span(span, pages, visual_map); continuity += cont
        points = unique_texts([kp for t in topics for kp in t.get("keyPoints", [])], 8)
        source_description = module_description_from_topics(span["title"], topics)
        objectives = module_learning_objectives(span["title"], topics)
        source_word_count = sum(t.get("wordCount",0) for t in topics)
        source_visual_count = sum(len(t.get("visuals",[])) for t in topics)
        source_title=polish_heading(span["title"])
        learning_title=infer_module_learning_title(source_title, topics)
        description=module_pedagogical_description(source_title, learning_title, topics)
        modules.append({
            "id":str(uuid.uuid4()), "title":source_title, "learningTitle":learning_title, "description":description, "sourceDescription":source_description,
            "learningObjectives":unique_texts(objectives,4), "keyPoints":points,
            "sourcePages":list(range(span["startPage"],span["endPage"]+1)),
            "sourceStartPage":span["startPage"], "sourceEndPage":span["endPage"],
            "confidence":round(sum(t["confidence"] for t in topics)/max(1,len(topics)),2),
            "structureConfidence":span.get("confidence",.7), "anchorKind":span.get("anchorKind"),
            "estimatedMinutes":max(3,sum(t.get("readingMinutes",1) for t in topics)+len(topics)), "topics":topics,
            "sourceWordCount":source_word_count, "sourceVisualCount":source_visual_count,
        })
    return modules, continuity


def effective_question_type(topic: dict[str, Any]) -> str:
    title=norm(topic.get("learningTitle") or topic.get("title") or "")
    if "campo de aplicacao" in title or "objetivo" in title: return "SCOPE"
    if re.search(r"\b(cabe ao|cabe aos|responsabilidade|responsabilidades|dever|deveres)\b", title): return "RESPONSIBILITY"
    if "defin" in title or title.startswith("o que e "): return "DEFINITION"
    if "permissao de trabalho" in title: return "PROCEDURE"
    if "emerg" in title or "salvamento" in title or "resgate" in title: return "EMERGENCY"
    if "epi" in title or "protecao individual" in title or "cinturao" in title or "talabarte" in title: return "EPI"
    if "epc" in title or "protecao coletiva" in title: return "EPC"
    return topic.get("contentType","GENERAL_CONTENT")

def question_prompt_for_topic(module: dict[str, Any], topic: dict[str, Any]) -> str:
    title=topic.get("learningTitle") or topic.get("title") or "conteúdo estudado"
    module_title=module.get("learningTitle") or module.get("title") or "módulo"
    ctype=effective_question_type(topic)
    prompts={
        "DEFINITION":f"No módulo “{module_title}”, qual afirmação corresponde ao conceito estudado em “{title}”?",
        "LEGAL_REFERENCE":f"No módulo “{module_title}”, qual afirmação corresponde ao requisito ou referência normativa estudada em “{title}”?",
        "RESPONSIBILITY":f"No módulo “{module_title}”, qual alternativa apresenta uma responsabilidade descrita em “{title}”?",
        "OBLIGATION":f"No módulo “{module_title}”, qual alternativa apresenta um requisito obrigatório descrito em “{title}”?",
        "PROHIBITION":f"No módulo “{module_title}”, qual alternativa corresponde a uma condição de impedimento ou proibição apresentada em “{title}”?",
        "RISK":f"No módulo “{module_title}”, qual alternativa foi apresentada como relacionada ao risco ou condição estudada em “{title}”?",
        "PROCEDURE":f"No módulo “{module_title}”, qual alternativa faz parte da orientação ou sequência apresentada em “{title}”?",
        "EPI":f"No módulo “{module_title}”, qual orientação sobre proteção individual aparece em “{title}”?",
        "EPC":f"No módulo “{module_title}”, qual orientação sobre proteção coletiva aparece em “{title}”?",
        "EMERGENCY":f"No módulo “{module_title}”, qual conduta ou orientação de emergência aparece em “{title}”?",
        "BENEFIT":f"No módulo “{module_title}”, qual benefício ou resultado positivo foi apresentado em “{title}”?",
        "CONSEQUENCE":f"No módulo “{module_title}”, qual consequência ou efeito foi apresentado em “{title}”?",
        "PRACTICE":f"No módulo “{module_title}”, qual orientação prática foi apresentada em “{title}”?",
        "SCOPE":f"No módulo “{module_title}”, qual afirmação descreve corretamente o objetivo ou campo de aplicação apresentado em “{title}”?",
    }
    return prompts.get(ctype,f"No módulo “{module_title}”, qual alternativa corresponde a um ponto central estudado em “{title}”?")



def interaction_prompt_for_topic(module: dict[str, Any], topic: dict[str, Any]) -> str:
    title = topic.get("learningTitle") or topic.get("title") or "conteúdo estudado"
    ctype = effective_question_type(topic)
    prompts = {
        "DEFINITION": f"Qual alternativa corresponde ao conceito apresentado em “{title}”?",
        "LEGAL_REFERENCE": f"Qual alternativa corresponde ao requisito ou alteração normativa estudada em “{title}”?",
        "RESPONSIBILITY": f"Qual responsabilidade foi apresentada no conteúdo de “{title}”?",
        "OBLIGATION": f"Qual requisito obrigatório aparece no conteúdo de “{title}”?",
        "PROHIBITION": f"Qual situação apresentada no material exige impedimento, interrupção ou atenção em “{title}”?",
        "RISK": f"Qual alternativa foi apresentada como risco, condição ou medida relacionada a “{title}”?",
        "PROCEDURE": f"Qual alternativa faz parte da sequência ou orientação apresentada em “{title}”?",
        "EPI": f"Qual orientação sobre proteção individual aparece no conteúdo de “{title}”?",
        "EPC": f"Qual orientação sobre proteção coletiva aparece no conteúdo de “{title}”?",
        "EMERGENCY": f"Qual conduta ou orientação de emergência aparece em “{title}”?",
        "BENEFIT": f"Qual benefício ou resultado positivo foi apresentado em “{title}”?",
        "CONSEQUENCE": f"Qual consequência ou efeito foi apresentado em “{title}”?",
        "PRACTICE": f"Qual orientação prática foi apresentada em “{title}”?",
        "SCOPE": f"Qual afirmação descreve corretamente o objetivo ou campo de aplicação apresentado em “{title}”?",
    }
    return prompts.get(ctype, f"Qual alternativa corresponde a um ponto realmente apresentado em “{title}”?")


def intro_like_title(value: str) -> bool:
    n = norm(value or "")
    return any(re.search(rf"(^|\s){re.escape(k)}(\s|$)", n) for k in ["introducao", "apresentacao", "boas vindas", "roteiro", "visao geral"])

def interaction_readiness(topic: dict[str, Any]) -> bool:
    raw = list(topic.get("keyPoints", [])) + [x for lst in topic.get("lists", []) for x in lst]
    points = good_teaching_statements(raw, 12)
    glossary = (topic.get("pedagogy") or {}).get("glossary") or []
    words = topic.get("wordCount", 0)
    ctype = topic.get("contentType", "GENERAL_CONTENT")
    # Ask only after a meaningful amount of teaching. Critical operational content may
    # qualify slightly earlier; generic/legal overview content needs more context first.
    if ctype in {"RISK","PROHIBITION","OBLIGATION","RESPONSIBILITY","PROCEDURE","EPI","EPC","EMERGENCY"}:
        minimum = 100
    elif ctype in {"BENEFIT","CONSEQUENCE","PRACTICE"}:
        minimum = 110
    else:
        minimum = 130
    return words >= minimum and (len(points) + len(glossary)) >= 2

def attach_interactions(modules: list[dict[str, Any]]) -> int:
    """Attach at most one pertinent interaction to substantive lesson topics.

    The coherent question engine removes the old cross-topic true/false trick. Questions now appear
    only after enough teaching content exists and the correct answer is a clean statement
    from the current topic. Distractors may come from other source-backed topics, but the
    learner is never shown a garbled foreign sentence as a standalone assertion.
    """
    pool: list[tuple[dict[str, Any], dict[str, Any], str]] = []
    for m in modules:
        for t in m.get("topics", []):
            raw = list(t.get("keyPoints", [])) + [x for lst in t.get("lists", []) for x in lst]
            for point in good_teaching_statements(raw, 8):
                pool.append((m, t, point))

    total = 0
    for mi, m in enumerate(modules):
        module_is_intro = intro_like_title(m.get("learningTitle") or m.get("title") or "")
        for ti, t in enumerate(m.get("topics", [])):
            t["interactions"] = []
            title = t.get("learningTitle") or t.get("title") or ""
            if module_is_intro or intro_like_title(title) or not interaction_readiness(t):
                continue

            own_raw = list(t.get("keyPoints", [])) + [x for lst in t.get("lists", []) for x in lst]
            own = good_teaching_statements(own_raw, 6)
            if not own:
                continue

            steps = good_teaching_statements(unique_texts(t.get("steps", []), 8), 6)
            if t.get("contentType") == "PROCEDURE" and len(steps) >= 3:
                correct = steps[0]
                opts = steps[:4]
                shift = (mi + ti + 1) % len(opts)
                opts = opts[shift:] + opts[:shift]
                q = {
                    "id": str(uuid.uuid4()), "type": "multiple_choice", "label": "Sequência da atividade",
                    "question": f"Segundo o material de “{title}”, qual orientação aparece primeiro na sequência apresentada?",
                    "options": opts, "correctIndex": opts.index(correct),
                    "explanation": f"A resposta faz parte da sequência rastreada nas páginas {', '.join(map(str, t.get('sourcePages', [])))}.",
                    "sourcePages": t.get("sourcePages", []), "origin": "GENERATED_FROM_SOURCE",
                }
                t["interactions"] = [q]; total += 1; continue

            correct = select_answer_statement(t.get("contentType", "GENERAL_CONTENT"), own)
            if not correct:
                continue
            distractors: list[str] = []
            # Prefer clean source-backed points from other modules. They are alternatives,
            # not claims presented as if they belonged to the current topic.
            for om, ot, point in pool:
                if ot.get("id") == t.get("id") or point == correct:
                    continue
                if text_similarity(point, correct) > .82:
                    continue
                if point not in distractors:
                    distractors.append(point)
                if len(distractors) >= 3:
                    break
            if len(distractors) < 2:
                continue
            opts = [correct] + distractors[:3]
            shift = (mi * 2 + ti + 1) % len(opts)
            opts = opts[shift:] + opts[:shift]
            q = {
                "id": str(uuid.uuid4()), "type": "multiple_choice", "label": "Cheque de entendimento",
                "question": interaction_prompt_for_topic(m, t),
                "options": opts, "correctIndex": opts.index(correct),
                "explanation": f"A alternativa correta é um ponto apresentado neste tópico, nas páginas {', '.join(map(str, t.get('sourcePages', [])))}.",
                "sourcePages": t.get("sourcePages", []), "origin": "GENERATED_FROM_SOURCE",
            }
            t["interactions"] = [q]; total += 1
    return total


def question_candidate_pool(modules: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Return deduplicated, source-backed candidate statements with semantic metadata."""
    out: list[dict[str, Any]] = []
    seen: set[str] = set()
    for m in modules:
        if intro_like_title(m.get("learningTitle") or m.get("title") or ""):
            continue
        for t in m.get("topics", []):
            if intro_like_title(t.get("learningTitle") or t.get("title") or ""):
                continue
            raw = list(t.get("keyPoints", [])) + [x for group in t.get("lists", []) for x in group]
            for point in good_teaching_statements(raw, 10):
                key = norm(point)
                if not key or key in seen:
                    continue
                seen.add(key)
                out.append({
                    "module": m, "topic": t, "text": point,
                    "contentType": t.get("contentType", "GENERAL_CONTENT"),
                    "sourcePages": list(t.get("sourcePages", [])),
                })
    return out


def choose_distractors(correct: str, topic: dict[str, Any], module: dict[str, Any], pool: list[dict[str, Any]],
                       usage: dict[str, int], limit: int = 3) -> list[str]:
    """Choose varied plausible alternatives and avoid recycling the same sentences course-wide."""
    ctype = topic.get("contentType", "GENERAL_CONTENT")
    ranked: list[tuple[float, str]] = []
    correct_norm = norm(correct)
    for item in pool:
        text = item["text"]
        if not text or norm(text) == correct_norm:
            continue
        if item["topic"].get("id") == topic.get("id"):
            continue
        sim = text_similarity(text, correct)
        if sim > .80:
            continue
        score = 0.0
        # Same semantic class makes a distractor less trivial; neighboring classes are next best.
        if item.get("contentType") == ctype:
            score += 2.5
        semantic_neighbors = {
            "EPI": {"EPC", "OBLIGATION", "RESPONSIBILITY"},
            "EPC": {"EPI", "OBLIGATION", "RESPONSIBILITY"},
            "RISK": {"PROHIBITION", "CONSEQUENCE", "PRACTICE"},
            "PROHIBITION": {"RISK", "OBLIGATION"},
            "OBLIGATION": {"RESPONSIBILITY", "LEGAL_REFERENCE"},
            "RESPONSIBILITY": {"OBLIGATION", "LEGAL_REFERENCE"},
            "EMERGENCY": {"PROCEDURE", "PRACTICE"},
            "PROCEDURE": {"PRACTICE", "OBLIGATION"},
            "LEGAL_REFERENCE": {"OBLIGATION", "RESPONSIBILITY"},
            "DEFINITION": {"GENERAL_CONTENT", "LEGAL_REFERENCE"},
            "BENEFIT": {"GENERAL_CONTENT", "PRACTICE"},
            "CONSEQUENCE": {"RISK", "GENERAL_CONTENT"},
        }
        if item.get("contentType") in semantic_neighbors.get(ctype, set()):
            score += 1.1
        if item["module"].get("id") == module.get("id"):
            score += .45
        # Similar length is visually fairer, but high text similarity is already excluded.
        score += max(0.0, 1.0 - abs(len(text) - len(correct)) / max(80, len(correct))) * .5
        # Penalize reused distractors heavily so students don't learn the pattern.
        score -= usage.get(norm(text), 0) * 3.0
        score -= sim * .5
        ranked.append((score, text))
    ranked.sort(key=lambda x: (-x[0], len(x[1])))
    picked: list[str] = []
    for _, text in ranked:
        if text in picked:
            continue
        picked.append(text)
        usage[norm(text)] = usage.get(norm(text), 0) + 1
        if len(picked) >= limit:
            break
    return picked


def build_source_question(module: dict[str, Any], topic: dict[str, Any], correct: str,
                          pool: list[dict[str, Any]], usage: dict[str, int], seed: int) -> dict[str, Any] | None:
    distractors = choose_distractors(correct, topic, module, pool, usage, 3)
    if len(distractors) < 2:
        return None
    options = [correct] + distractors[:3]
    shift = (seed * 3 + len(correct)) % len(options)
    options = options[shift:] + options[:shift]
    return {
        "id": str(uuid.uuid4()), "moduleId": module.get("id"), "topicId": topic.get("id"),
        "type": "multiple_choice", "question": question_prompt_for_topic(module, topic),
        "options": options, "correctIndex": options.index(correct),
        "explanation": f"Segundo o material, a resposta correta é: {correct}",
        "difficulty": "média", "sourcePages": list(topic.get("sourcePages", [])),
        "origin": "GENERATED_FROM_SOURCE", "contentType": topic.get("contentType", "GENERAL_CONTENT"),
        "correctStatement": correct,
    }


def make_questions(modules: list[dict[str, Any]], module_quizzes: list[dict[str, Any]] | None = None) -> list[dict[str, Any]]:
    """Build a varied final assessment without repeating the module checkpoints."""
    module_quizzes = module_quizzes or []
    pool = question_candidate_pool(modules)
    used_correct = {norm(q.get("correctStatement") or (q.get("options") or [""])[q.get("correctIndex", 0)])
                    for q in module_quizzes if q.get("options")}
    used_topics = {str(q.get("topicId") or "") for q in module_quizzes}
    usage: dict[str, int] = {}
    qs: list[dict[str, Any]] = []

    content_pages = sum(len(set(m.get("sourcePages") or [])) for m in modules
                        if not intro_like_title(m.get("learningTitle") or m.get("title") or ""))
    target = max(5, min(12, round(content_pages / 5.5))) if content_pages else 5

    candidates: list[tuple[dict[str, Any], dict[str, Any], str, float]] = []
    for m in modules:
        if intro_like_title(m.get("learningTitle") or m.get("title") or ""):
            continue
        for t in m.get("topics", []):
            if intro_like_title(t.get("learningTitle") or t.get("title") or "") or int(t.get("wordCount", 0) or 0) < 45:
                continue
            raw = list(t.get("keyPoints", [])) + [x for group in t.get("lists", []) for x in group]
            own = good_teaching_statements(raw, 8)
            correct = select_answer_statement(t.get("contentType", "GENERAL_CONTENT"), own) if own else None
            if not correct or norm(correct) in used_correct:
                continue
            score = teaching_statement_quality(correct)
            if str(t.get("id")) not in used_topics:
                score += 1.25
            score += min(1.5, int(t.get("wordCount", 0) or 0) / 250)
            if t.get("contentType") in {"RISK","PROHIBITION","OBLIGATION","RESPONSIBILITY","PROCEDURE","EPI","EPC","EMERGENCY"}:
                score += .8
            candidates.append((m, t, correct, score))

    # First pass: spread questions across substantive modules.
    module_ids = [m.get("id") for m in modules if not intro_like_title(m.get("learningTitle") or m.get("title") or "")]
    for mid in module_ids:
        local = sorted((x for x in candidates if x[0].get("id") == mid), key=lambda x: -x[3])
        for m, t, correct, _ in local:
            if norm(correct) in used_correct:
                continue
            q = build_source_question(m, t, correct, pool, usage, len(qs) + 1)
            if not q:
                continue
            qs.append(q); used_correct.add(norm(correct)); used_topics.add(str(t.get("id") or ""))
            break
        if len(qs) >= target:
            break

    # Second pass: add the best remaining topics until the target is reached.
    for m, t, correct, _ in sorted(candidates, key=lambda x: -x[3]):
        if len(qs) >= target:
            break
        if norm(correct) in used_correct or any(text_similarity(q.get("question", ""), question_prompt_for_topic(m,t)) > .92 for q in qs):
            continue
        q = build_source_question(m, t, correct, pool, usage, len(qs) + 1)
        if q:
            qs.append(q); used_correct.add(norm(correct))
    return qs



def module_quiz_budget(module: dict[str, Any]) -> int:
    """Adaptive end-of-module quiz size. Short modules should not feel like tests."""
    title=module.get("learningTitle") or module.get("title") or ""
    if intro_like_title(title): return 0
    pages=module.get("sourcePages") or module.get("displayPages") or []
    page_count=len(set(int(x) for x in pages if str(x).isdigit()))
    words=int(module.get("sourceWordCount",0) or 0)
    useful_points=sum(len(good_teaching_statements(list(t.get("keyPoints", []))+[x for lst in t.get("lists",[]) for x in lst], 8)) for t in module.get("topics",[]))
    if page_count <= 1: return 0
    if words < 120 or useful_points < 2: return 0
    if page_count <= 3: return 1
    if page_count <= 6: return 1 if words < 300 or useful_points < 6 else 2
    if words < 250 or useful_points < 5: return 1
    if words < 600 or useful_points < 9: return 2
    return 3

def make_module_quizzes(modules: list[dict[str, Any]], per_module: int = 3) -> list[dict[str, Any]]:
    """Create short, proportional end-of-module checkpoints with varied alternatives."""
    quizzes: list[dict[str, Any]] = []
    pool = question_candidate_pool(modules)
    usage: dict[str, int] = {}
    used_correct: set[str] = set()

    for mi, m in enumerate(modules):
        budget = min(per_module, module_quiz_budget(m))
        if budget <= 0:
            continue
        candidates: list[tuple[dict[str, Any], str, float]] = []
        for t in m.get("topics", []):
            if intro_like_title(t.get("learningTitle") or t.get("title") or ""):
                continue
            raw = list(t.get("keyPoints", [])) + [x for group in t.get("lists", []) for x in group]
            own = good_teaching_statements(raw, 8)
            correct = select_answer_statement(t.get("contentType", "GENERAL_CONTENT"), own) if own else None
            if not correct or norm(correct) in used_correct:
                continue
            score = teaching_statement_quality(correct) + min(1.0, int(t.get("wordCount",0) or 0)/220)
            if t.get("contentType") in {"RISK","PROHIBITION","OBLIGATION","RESPONSIBILITY","PROCEDURE","EPI","EPC","EMERGENCY"}:
                score += .6
            candidates.append((t, correct, score))
        candidates.sort(key=lambda x: -x[2])

        for ci, (t, correct, _) in enumerate(candidates):
            if len([q for q in quizzes if q.get("moduleId") == m.get("id")]) >= budget:
                break
            q = build_source_question(m, t, correct, pool, usage, mi * 7 + ci + 1)
            if not q:
                continue
            quizzes.append(q)
            used_correct.add(norm(correct))
    return quizzes



def analyze_pdf(pdf_path: Path, filename: str, size: int, project_id: str, assets_root: Path) -> dict[str, Any]:
    pages, meta = extract_raw_pages(pdf_path)
    agenda_items, agenda_page = extract_agenda(pages)
    spans, structure = choose_module_spans(pages, agenda_items, agenda_page)
    spans, consolidation = consolidate_inferred_spans(spans, pages, structure.get("strategy", ""))
    structure["consolidation"] = consolidation
    visual_map = render_visual_assets(pdf_path, project_id, pages, assets_root)
    source_page_map = render_source_pages(pdf_path, project_id, pages, assets_root)
    modules, continuity = build_modules(pages, spans, visual_map)
    ordering_strategy = "consolidated_inferred" if consolidation.get("changed") and structure.get("strategy") == "hierarchical_headings" else structure["strategy"]
    modules, ordering = cohere_module_order(modules, ordering_strategy)
    assign_display_pages(modules, pages)
    interactive_questions = attach_interactions(modules)
    module_quizzes = make_module_quizzes(modules, per_module=3)
    questions = make_questions(modules, module_quizzes)
    critical = sum(1 for m in modules for t in m["topics"] if t["contentType"] in {"RISK","PROHIBITION","OBLIGATION","EMERGENCY","PROCEDURE"})
    source_words = sum(len(re.findall(r"\w+", p.get("text", ""))) for p in pages if p.get("role") not in {"COVER","AGENDA","CLOSING"})
    course_words = sum(t.get("wordCount", 0) for m in modules for t in m.get("topics", []))
    coverage = round(min(100.0, (course_words / max(1, source_words)) * 100), 1)
    warnings=[]
    if meta["needsOcr"]: warnings.append("Pouco texto pesquisável detectado. Algumas páginas podem exigir OCR para melhor resultado.")
    if any(m["confidence"] < .6 for m in modules): warnings.append("Há conteúdo com baixa confiança que precisa de revisão humana.")
    if not agenda_items: warnings.append("Nenhum roteiro/sumário confiável foi detectado; a estrutura foi inferida pelos títulos e mudanças de assunto.")
    if any(st["anchorKind"].startswith("inferred") or st["anchorKind"] == "repaired_sequence" for st in spans):
        warnings.append("Parte da divisão dos módulos foi inferida entre títulos/âncoras e deve ser conferida na revisão.")
    if coverage < 72:
        warnings.append(f"A cobertura textual do curso ficou em {coverage}%. Revise se algum conteúdo do PDF não foi associado aos tópicos.")
    if any(m.get("sourceWordCount",0) < 45 for m in modules):
        warnings.append("Há módulo com pouco conteúdo textual rastreado; ele pode ser um subtítulo promovido indevidamente ou uma seção majoritariamente visual.")

    # Title: prefer first non-cover explicit title, otherwise filename.
    title = ""
    for p in pages[:6]:
        if p["role"] == "AGENDA": continue
        t = p.get("title","")
        if t and norm(t) not in CLOSING_MARKERS and len(t) >= 5:
            title=t; break
    if not title:
        title = re.sub(r"[_-]+"," ",Path(filename).stem).strip().title()

    source_pages = []
    for p in pages:
        rendered = source_page_map.get(p["page"], {})
        source_pages.append({
            "page":p["page"], "text":p["text"], "role":p["role"], "title":p.get("title", ""),
            "imageUrl":rendered.get("url"), "imageWidth":rendered.get("width"), "imageHeight":rendered.get("height"),
            "hotspots":rendered.get("hotspots", []),
        })
    enrich_source_pages_with_learning(source_pages, modules)
    visual_count=sum(len(v) for v in visual_map.values())
    return {
        "version":16,"title":title,"description":f"Treinamento interativo baseado nas páginas originais do PDF, com camada de interação e rastreabilidade.",
        "category":"Segurança do Trabalho","audience":"Colaboradores","estimatedHours":max(.5,round(sum(m["estimatedMinutes"] for m in modules)/60,1)),
        "passingScore":70,"attempts":2,"certificate":True,"visibility":"private",
        "materials":[],
        "certificateSettings":{"issuer":"FortixSeg","responsibleName":"","responsibleRole":"","verificationEnabled":True},
        "source":{"filename":filename,"size":size,**meta,"visualAssets":visual_count,"renderedPages":len(source_page_map),"nativePageMode":True},
        "analysis":{
            "status":"completed_with_warnings" if warnings else "completed","warnings":warnings,"criticalConcepts":critical,
            "topics":sum(len(m["topics"]) for m in modules),"modules":len(modules),"questions":len(questions),"interactiveQuestions":interactive_questions,"moduleQuizQuestions":len(module_quizzes),
            "agendaDetected":bool(agenda_items),"agendaPage":agenda_page,"agendaItems":agenda_items,
            "structureStrategy":structure["strategy"],"moduleAnchors":spans,"moduleConsolidation":structure.get("consolidation",{}),"moduleOrdering":ordering,"slideDeckLike":structure.get("slideDeckLike",False),
            "continuityMerges":continuity,"visualPages":sum(1 for p in pages if p["role"]=="VISUAL_SUPPORT"),
            "nativePageMode":True,"renderedPages":len(source_page_map),
            "sourceWords":source_words,"courseWords":course_words,"coveragePercent":coverage,
        },
        "modules":modules,"moduleQuizzes":module_quizzes,"questions":questions,"sourcePages":source_pages,
        "student":{"completedModules":[],"lastModuleId":modules[0]["id"] if modules else None},"quality":{},
    }
