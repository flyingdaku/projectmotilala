"""
Discover all Cogencis instruments via the symbollookup API and populate
src_cogencis_company_map for every NSE-listed asset we know about.

Strategy:
  - Iterate 2-letter name search terms (aa..zz) with searchOn=name
  - For terms returning >500 results, subdivide with 3-letter terms
  - Match each result to assets table by ISIN
  - Upsert into src_cogencis_company_map
  - Skip assets already in the map

Usage:
    python3 -m scripts.discover_cogencis_instruments [--dry-run] [--resume]
"""
from __future__ import annotations

import argparse
import logging
import os
import pathlib
import string
import sys
import time
from typing import Dict, Iterator, List, Optional, Tuple

sys.path.insert(0, str(pathlib.Path(__file__).parent.parent))

from pipelines.cogencis_fundamentals import _load_dotenv

_load_dotenv()

import requests

from core.db import get_connection
from sources.cogencis.fundamentals import upsert_cogencis_company_map

logger = logging.getLogger(__name__)

LOOKUP_URL = "https://data.cogencis.com/api/v1/marketdata/symbollookup"
BASE_COGENCIS_URL = "https://iinvest.cogencis.com"
PAGE_SIZE = 100
SUBDIVIDE_THRESHOLD = 500  # if a 2-letter term has more results, add a 3rd letter
DELAY = 0.3  # seconds between requests


def _make_session() -> requests.Session:
    bearer = os.getenv("COGENCIS_BEARER_TOKEN", "").strip()
    cookie = os.getenv("COGENCIS_COOKIE", "").strip()
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
        "Origin": "https://iinvest.cogencis.com",
        "Referer": "https://iinvest.cogencis.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
    })
    if bearer:
        session.headers["Authorization"] = f"Bearer {bearer}"
    if cookie:
        session.headers["Cookie"] = cookie
    return session


def _search_page(session: requests.Session, term: str, page_no: int) -> Optional[dict]:
    """Fetch one page of symbollookup results. Returns parsed response or None on error."""
    params = {
        "searchTerm": term,
        "searchOn": "name",
        "indexName": "idxLookup",
        "pageNo": page_no,
        "pageSize": PAGE_SIZE,
    }
    for attempt in range(3):
        try:
            res = session.get(LOOKUP_URL, params=params, timeout=20)
            if res.status_code == 429:
                wait = 30 * (attempt + 1)
                logger.warning("Rate limited on term=%r page=%d, sleeping %ds", term, page_no, wait)
                time.sleep(wait)
                continue
            if res.status_code == 401:
                logger.error("Auth failed (401) — bearer token may be expired")
                return None
            res.raise_for_status()
            data = res.json()
            if not data.get("status"):
                return None
            return data.get("response", {})
        except requests.RequestException as exc:
            logger.warning("Request error term=%r page=%d attempt=%d: %s", term, page_no, attempt + 1, exc)
            time.sleep(5 * (attempt + 1))
    return None


def _iter_term_results(session: requests.Session, term: str) -> Iterator[dict]:
    """Yield all result records for a given search term across all pages."""
    page_no = 1
    while True:
        resp = _search_page(session, term, page_no)
        time.sleep(DELAY)
        if resp is None:
            break
        paging = resp.get("pagingInfo", {})
        records = resp.get("data", [])
        if not records:
            break
        yield from records
        no_of_pages = paging.get("noOfPages", 1) or 1
        if page_no >= no_of_pages:
            break
        page_no += 1


def _total_records(session: requests.Session, term: str) -> int:
    """Quick probe: return totalRecords for a term without fetching all pages."""
    resp = _search_page(session, term, page_no=1)
    time.sleep(DELAY)
    if resp is None:
        return 0
    return resp.get("pagingInfo", {}).get("totalRecords", 0) or 0


def _generate_terms(session: requests.Session) -> Iterator[str]:
    """
    Generate search terms covering the full universe.
    2-letter terms by default; subdivide into 3-letter if results > SUBDIVIDE_THRESHOLD.
    """
    letters = string.ascii_lowercase
    for c1 in letters:
        for c2 in letters:
            term2 = c1 + c2
            n = _total_records(session, term2)
            if n == 0:
                continue
            if n <= SUBDIVIDE_THRESHOLD:
                yield term2
            else:
                logger.info("Term %r has %d results — subdividing to 3-letter terms", term2, n)
                for c3 in letters:
                    term3 = term2 + c3
                    n3 = _total_records(session, term3)
                    if n3 > 0:
                        yield term3


def _load_isin_map(conn) -> Dict[str, str]:
    """Return {isin -> asset_id} for all active NSE assets with a known ISIN."""
    rows = conn.fetchall(
        "SELECT id, isin FROM assets WHERE isin IS NOT NULL AND isin != '' AND is_active = 1 AND nse_listed = 1"
    )
    return {row["isin"]: row["id"] for row in rows}


def _load_already_mapped(conn) -> set:
    """Return set of asset_ids already in src_cogencis_company_map."""
    rows = conn.fetchall("SELECT asset_id FROM src_cogencis_company_map WHERE is_active = 1")
    return {row["asset_id"] for row in rows}


def run_discovery(dry_run: bool = False, resume: bool = True) -> Tuple[int, int, int]:
    """
    Run the discovery loop. Returns (discovered, mapped, skipped).
    """
    session = _make_session()

    with get_connection() as conn:
        isin_to_asset = _load_isin_map(conn)
        already_mapped = _load_already_mapped(conn) if resume else set()

    logger.info("Known NSE assets with ISIN: %d", len(isin_to_asset))
    logger.info("Already in company_map: %d", len(already_mapped))

    seen_isins: set = set()
    discovered = 0
    mapped = 0
    skipped = 0

    for term in _generate_terms(session):
        logger.info("Searching term=%r ...", term)
        term_mapped = 0
        for record in _iter_term_results(session, term):
            isin = (record.get("f_5104") or "").strip()
            path = (record.get("path") or "").strip()
            if not isin or not path:
                continue
            if isin in seen_isins:
                continue
            seen_isins.add(isin)
            discovered += 1

            asset_id = isin_to_asset.get(isin)
            if not asset_id:
                continue  # not in our asset universe

            if asset_id in already_mapped:
                skipped += 1
                continue

            company_url = f"{BASE_COGENCIS_URL}/{path}"
            if not dry_run:
                with get_connection() as conn:
                    upsert_cogencis_company_map(conn, asset_id, company_url)
                already_mapped.add(asset_id)

            mapped += 1
            term_mapped += 1
            logger.debug("  Mapped %s (%s) → %s", isin, record.get("f_400", ""), company_url)

        if term_mapped:
            logger.info("  term=%r → %d new mappings (total mapped=%d)", term, term_mapped, mapped)

    logger.info("Discovery complete: discovered=%d mapped=%d skipped=%d", discovered, mapped, skipped)
    return discovered, mapped, skipped


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
        datefmt="%H:%M:%S",
    )
    parser = argparse.ArgumentParser(description="Discover Cogencis instruments and populate company map")
    parser.add_argument("--dry-run", action="store_true", help="Discover but don't write to DB")
    parser.add_argument("--no-resume", action="store_true", help="Re-map even already-mapped assets")
    args = parser.parse_args()

    discovered, mapped, skipped = run_discovery(dry_run=args.dry_run, resume=not args.no_resume)
    print(f"\nDiscovery done: {discovered} found on Cogencis, {mapped} new mappings, {skipped} already mapped")
