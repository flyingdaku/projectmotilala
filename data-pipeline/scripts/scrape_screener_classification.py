"""
Screener.in Classification Scraper
====================================
Scrapes the 4-level industry classification for every equity asset from
the Screener.in #peers section:
  Level 1 — sector         : Energy
  Level 2 — industry_group : Oil, Gas & Consumable Fuels
  Level 3 — industry       : Petroleum Products
  Level 4 — sub_industry   : Refineries & Marketing

These are stored in the `assets` table with their Screener market codes
(e.g. IN03, IN0301, IN030103, IN030103001).

Also stores the Screener identifier slug (screener_id) so that
subsequent scrapes can use the correct URL.

Usage:
  python scripts/scrape_screener_classification.py            # All active equities
  python scripts/scrape_screener_classification.py RELIANCE   # Single symbol
  python scripts/scrape_screener_classification.py --limit 50 # First 50 assets
"""

import logging
import os
import re
import sys
import time
import argparse
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from utils.db import get_db

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger("screener_classification")

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

SCREENER_BASE = "https://www.screener.in"
DELAY_BETWEEN_REQUESTS = 1.2  # polite delay in seconds
MAX_RETRIES = 3


def _code_from_href(href: str) -> str | None:
    """Extract the last non-empty path segment from a /market/... URL."""
    if not href or "/market/" not in href:
        return None
    parts = [p for p in href.rstrip("/").split("/") if p]
    return parts[-1] if parts else None


def fetch_classification(symbol: str) -> dict | None:
    """
    Fetch the 4-level classification for a stock from Screener.in.

    Returns a dict like:
    {
        'screener_id': 'IOC',
        'sector': 'Energy',               'screener_sector_code': 'IN03',
        'industry_group': 'Oil, Gas ...',  'screener_industry_group_code': 'IN0301',
        'industry': 'Petroleum Products', 'screener_industry_code': 'IN030103',
        'sub_industry': 'Refineries ...',  'screener_sub_industry_code': 'IN030103001',
    }
    or None on failure.
    """
    urls_to_try = [
        f"{SCREENER_BASE}/company/{symbol}/consolidated/",
        f"{SCREENER_BASE}/company/{symbol}/",
    ]

    for attempt in range(1, MAX_RETRIES + 1):
        for url in urls_to_try:
            try:
                resp = requests.get(url, headers=HEADERS, timeout=20)
                if resp.status_code == 404:
                    continue
                resp.raise_for_status()

                soup = BeautifulSoup(resp.text, "html.parser")
                # Determine the screener_id from the URL we actually landed on
                final_path = resp.url.rstrip("/").split("/")
                screener_id = next(
                    (p for p in reversed(final_path) if p and p.upper() == p),
                    symbol,
                )

                peers = soup.find("section", id="peers")
                if not peers:
                    logger.debug(f"{symbol}: No #peers section found")
                    return None

                # Screener renders exactly 4 /market/... links for the hierarchy
                # before the index membership links
                hierarchy = []  # list of (href, label)
                for a in peers.find_all("a"):
                    href = a.get("href", "")
                    if href.startswith("/market/"):
                        label = a.text.strip()
                        code = _code_from_href(href)
                        if code and label:
                            hierarchy.append((code, label))

                if not hierarchy:
                    logger.warning(f"{symbol}: No market hierarchy links found")
                    return None

                # Take first 4 levels (sector → sub_industry)
                result = {
                    "screener_id": symbol,
                    "sector": None, "screener_sector_code": None,
                    "industry_group": None, "screener_industry_group_code": None,
                    "industry": None, "screener_industry_code": None,
                    "sub_industry": None, "screener_sub_industry_code": None,
                }

                fields = [
                    ("sector", "screener_sector_code"),
                    ("industry_group", "screener_industry_group_code"),
                    ("industry", "screener_industry_code"),
                    ("sub_industry", "screener_sub_industry_code"),
                ]

                for i, (code, label) in enumerate(hierarchy[:4]):
                    name_field, code_field = fields[i]
                    result[name_field] = label
                    result[code_field] = code

                return result

            except requests.RequestException as e:
                logger.warning(f"{symbol} attempt {attempt}/{MAX_RETRIES} ({url}): {e}")
                if attempt < MAX_RETRIES:
                    time.sleep(DELAY_BETWEEN_REQUESTS * 2)

    return None


def update_asset_classification(asset_id: str, data: dict):
    """Write the classification back to the assets table."""
    now = datetime.now(timezone.utc).isoformat()
    with get_db() as conn:
        conn.execute(
            """
            UPDATE assets SET
                screener_id                  = ?,
                sector                       = ?,
                screener_sector_code         = ?,
                industry_group               = ?,
                screener_industry_group_code = ?,
                industry                     = ?,
                screener_industry_code       = ?,
                sub_industry                 = ?,
                screener_sub_industry_code   = ?,
                classification_updated_at    = ?
            WHERE id = ?
            """,
            (
                data["screener_id"],
                data["sector"],
                data["screener_sector_code"],
                data["industry_group"],
                data["screener_industry_group_code"],
                data["industry"],
                data["screener_industry_code"],
                data["sub_industry"],
                data["screener_sub_industry_code"],
                now,
                asset_id,
            ),
        )


def run_classification_scrape(
    symbols: list[str] | None = None,
    limit: int | None = None,
    skip_existing: bool = True,
):
    """
    Main entry point.

    Args:
        symbols: List of NSE symbols to process. If None, processes all active equities.
        limit: Maximum number of assets to process.
        skip_existing: If True, skip assets that already have sector data.
    """
    with get_db() as conn:
        if symbols:
            rows = conn.execute(
                f"SELECT id, nse_symbol, bse_code FROM assets "
                f"WHERE nse_symbol IN ({','.join('?'*len(symbols))}) AND asset_class = 'EQUITY'",
                symbols,
            ).fetchall()
        elif skip_existing:
            rows = conn.execute(
                """SELECT id, nse_symbol, bse_code FROM assets
                   WHERE asset_class = 'EQUITY' AND is_active = 1
                     AND (sector IS NULL OR sector = '')
                   ORDER BY nse_symbol"""
            ).fetchall()
        else:
            rows = conn.execute(
                """SELECT id, nse_symbol, bse_code FROM assets
                   WHERE asset_class = 'EQUITY' AND is_active = 1
                   ORDER BY nse_symbol"""
            ).fetchall()

    if limit:
        rows = rows[:limit]

    total = len(rows)
    logger.info(f"Fetching classification for {total} assets...")

    ok = fail = skip = 0

    for i, row in enumerate(rows):
        symbol = row["nse_symbol"] or row["bse_code"]
        if not symbol:
            skip += 1
            continue

        logger.info(f"[{i+1}/{total}] {symbol}")
        data = fetch_classification(symbol)

        if data:
            update_asset_classification(row["id"], data)
            logger.info(
                f"  ✅ {symbol}: {data['sector']} > {data['industry_group']} "
                f"> {data['industry']} > {data['sub_industry']}"
            )
            ok += 1
        else:
            logger.warning(f"  ❌ {symbol}: classification not found")
            fail += 1

        time.sleep(DELAY_BETWEEN_REQUESTS)

    logger.info(f"\nDone. {ok} ok / {fail} failed / {skip} skipped out of {total}")
    return ok, fail, skip


def print_summary():
    """Print classification coverage stats from the DB."""
    with get_db() as conn:
        total = conn.execute(
            "SELECT COUNT(*) FROM assets WHERE asset_class = 'EQUITY' AND is_active = 1"
        ).fetchone()[0]
        classified = conn.execute(
            "SELECT COUNT(*) FROM assets WHERE asset_class = 'EQUITY' AND sector IS NOT NULL AND sector != ''"
        ).fetchone()[0]
        sectors = conn.execute(
            "SELECT sector, COUNT(*) as cnt FROM assets "
            "WHERE sector IS NOT NULL GROUP BY sector ORDER BY cnt DESC LIMIT 20"
        ).fetchall()

    print(f"\nClassification Coverage: {classified}/{total} ({classified/total*100:.1f}%)")
    print("\nTop Sectors:")
    for r in sectors:
        print(f"  {r['sector']:<40} {r['cnt']:>5} stocks")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Scrape Screener.in industry classification")
    parser.add_argument("symbols", nargs="*", help="Specific NSE symbols to scrape (default: all)")
    parser.add_argument("--limit", type=int, default=None, help="Max assets to process")
    parser.add_argument("--all", action="store_true", help="Re-scrape even already-classified assets")
    parser.add_argument("--stats", action="store_true", help="Print coverage stats only")
    args = parser.parse_args()

    if args.stats:
        print_summary()
    else:
        run_classification_scrape(
            symbols=args.symbols if args.symbols else None,
            limit=args.limit,
            skip_existing=not args.all,
        )
        print_summary()
