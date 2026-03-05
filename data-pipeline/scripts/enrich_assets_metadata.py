"""
Enrich assets table with:
  - face_value (from screener company page header)
  - website_url (from screener company page links or NSE)
  - management_json (MD, Chairman from screener company page)

Reads cached Screener HTML files (already downloaded) to avoid new HTTP requests.
"""

import json
import logging
import os
import re
import sys
import time

import sqlite3

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "db", "market_data.db")

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("Install beautifulsoup4: pip install beautifulsoup4")
    sys.exit(1)

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(message)s")
log = logging.getLogger(__name__)

CACHE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "raw_data", "SCREENER")


def parse_screener_metadata(html: str) -> dict:
    """Extract face_value, website_url, and management from Screener HTML."""
    soup = BeautifulSoup(html, "html.parser")
    result = {}

    # ── Face Value from top-line ratios ────────────────────────────────────────
    # Screener shows "Face Value: ₹X" in the company info section
    for li in soup.select("ul.company-ratios > li, ul#top-ratios > li"):
        label_el = li.select_one(".name") or li.select_one("span:first-child")
        val_el = li.select_one(".nowrap, .number") or li.select_one("span:last-child")
        if not label_el or not val_el:
            continue
        label = label_el.get_text(strip=True).lower()
        val = val_el.get_text(strip=True)
        if "face value" in label:
            raw = re.sub(r"[₹,\s]", "", val)
            try:
                result["face_value"] = float(raw)
            except ValueError:
                pass

    # ── Website from company links ──────────────────────────────────────────────
    website_el = soup.select_one("a.website, div.company-links a[href*='http']")
    if not website_el:
        # Try any external link in the header section
        for a in soup.select("div.company-links a, div.links a"):
            href = a.get("href", "")
            if href.startswith("http") and "screener.in" not in href:
                result["website_url"] = href
                break
    elif website_el:
        result["website_url"] = website_el["href"]

    # ── Management: MD and Chairman ──────────────────────────────────────────────
    mgmt = {}
    management_section = soup.select_one("div#management, section#management, div.management")
    if management_section:
        rows = management_section.select("tr, li")
        for row in rows:
            text = row.get_text(" ", strip=True).lower()
            name_el = row.select_one("td:last-child, span.name")
            if not name_el:
                continue
            name = name_el.get_text(strip=True)
            if "managing director" in text or "md & ceo" in text or "chief executive" in text:
                mgmt["md"] = name
            elif "chairman" in text and "independent" not in text:
                mgmt["chairman"] = name

    # ── About / Description ───────────────────────────────────────────────────
    about_el = soup.select_one("div.company-profile div.about, section#about div.sub")
    if not about_el:
        # Fallback to meta description if content is relevant
        meta_desc = soup.find("meta", attrs={"name": "description"})
        if meta_desc and "·" in meta_desc.get("content", ""):
            # Usually too short, but better than nothing
            result["description"] = meta_desc["content"].split("·")[0].strip()
    else:
        # Clean up tags and extra whitespace
        desc = about_el.get_text(" ", strip=True)
        # Remove footnote markers like [1], [2]
        desc = re.sub(r"\[\d+\]", "", desc)
        result["description"] = desc

    if mgmt:
        result["management_json"] = json.dumps(mgmt)

    return result


def main():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    assets = conn.execute(
        "SELECT id, nse_symbol, bse_code FROM assets WHERE is_active=1 AND asset_class='EQUITY'"
    ).fetchall()

    updated = 0
    for asset in assets:
        identifier = asset["nse_symbol"] or str(asset["bse_code"] or "")
        if not identifier:
            continue
        cache_path = os.path.join(CACHE_DIR, f"{identifier}.html")
        if not os.path.exists(cache_path):
            continue

        try:
            html = open(cache_path, encoding="utf-8").read()
            meta = parse_screener_metadata(html)
        except Exception as e:
            log.warning(f"Could not parse {identifier}: {e}")
            continue

        if not meta:
            continue

        update_cols = []
        values = []
        if "face_value" in meta:
            update_cols.append("face_value = COALESCE(face_value, ?)")
            values.append(meta["face_value"])
        if "website_url" in meta:
            update_cols.append("website_url = COALESCE(website_url, ?)")
            values.append(meta["website_url"])
        if "management_json" in meta:
            update_cols.append("management_json = COALESCE(management_json, ?)")
            values.append(meta["management_json"])
        if "description" in meta:
            update_cols.append("description = COALESCE(description, ?)")
            values.append(meta["description"])

        if not update_cols:
            continue

        values.append(asset["id"])
        conn.execute(f"UPDATE assets SET {', '.join(update_cols)} WHERE id = ?", values)
        updated += 1
        if updated % 100 == 0:
            conn.commit()
            log.info(f"Progress: {updated} assets enriched...")

    conn.commit()
    conn.close()
    log.info(f"Done. Enriched {updated} assets with metadata from Screener cache.")


if __name__ == "__main__":
    main()
