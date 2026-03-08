"""
Cogencis Bulk Scrape
====================
Phase 1 — Discovery: crawls the symbollookup API with 2-letter name-search
           terms to find all NSE instruments and populates src_cogencis_company_map.
Phase 2 — Scrape: runs the fundamentals ingester for every mapped asset.

All progress is written to logs/cogencis_bulk_scrape.log in addition to stdout
so you can `tail -f` it from another terminal.

Usage:
    # Full run (discover + scrape)
    python3 -m scripts.cogencis_bulk_scrape

    # Discovery only (no scraping)
    python3 -m scripts.cogencis_bulk_scrape --discover-only

    # Scrape only (skip discovery, use existing company_map)
    python3 -m scripts.cogencis_bulk_scrape --scrape-only

    # Dry-run discovery (no DB writes)
    python3 -m scripts.cogencis_bulk_scrape --dry-run

    # Limit scrape to N assets (useful for testing)
    python3 -m scripts.cogencis_bulk_scrape --scrape-limit 10
"""
from __future__ import annotations

import argparse
import logging
import os
import pathlib
import string
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date
from typing import Dict, Iterator, List, Optional, Set, Tuple

# ── bootstrap path ───────────────────────────────────────────────────────────
ROOT = pathlib.Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))

# load .env before any pipeline imports
def _load_dotenv() -> None:
    env_path = ROOT / ".env"
    if not env_path.exists():
        return
    with env_path.open() as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value

_load_dotenv()

import requests

from core.db import get_connection, DatabaseConnection
from sources.cogencis.fundamentals import (
    CogencisFundamentalsIngester,
    upsert_cogencis_company_map,
)

# ── logging setup ─────────────────────────────────────────────────────────────
LOG_DIR = ROOT / "logs"
LOG_DIR.mkdir(exist_ok=True)
LOG_FILE = LOG_DIR / "cogencis_bulk_scrape.log"

_fmt = "%(asctime)s %(levelname)-7s %(message)s"
_datefmt = "%H:%M:%S"

logging.basicConfig(
    level=logging.INFO,
    format=_fmt,
    datefmt=_datefmt,
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(LOG_FILE, mode="a", encoding="utf-8"),
    ],
)
# Silence noisy sub-loggers
logging.getLogger("urllib3").setLevel(logging.WARNING)
logging.getLogger("requests").setLevel(logging.WARNING)

logger = logging.getLogger("cogencis_bulk")

# ── constants ─────────────────────────────────────────────────────────────────
LOOKUP_URL = "https://data.cogencis.com/api/v1/marketdata/symbollookup"
BASE_URL = "https://iinvest.cogencis.com"
PAGE_SIZE = 100
SUBDIVIDE_THRESHOLD = 400   # 2-letter terms with more results get 3-letter refinement
DISCOVERY_DELAY = 0.25      # seconds between lookup API calls
SCRAPE_DELAY = 0.5          # seconds between per-asset scrapes (per worker)
SCRAPE_WORKERS = 20         # parallel scrape workers (reduced from 50)
MAX_RETRIES = 3

# ── session ───────────────────────────────────────────────────────────────────

def _make_session() -> requests.Session:
    bearer = os.getenv("COGENCIS_BEARER_TOKEN", "").strip()
    cookie = os.getenv("COGENCIS_COOKIE", "").strip()
    session = requests.Session()
    session.headers.update({
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
        "Origin": BASE_URL,
        "Referer": BASE_URL + "/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
    })
    if bearer:
        session.headers["Authorization"] = f"Bearer {bearer}"
    if cookie:
        session.headers["Cookie"] = cookie
    if not bearer:
        logger.error("No COGENCIS_BEARER_TOKEN found — API calls will fail. Set it in .env")
        sys.exit(1)
    return session

# ── discovery helpers ─────────────────────────────────────────────────────────

def _probe_total(session: requests.Session, term: str) -> int:
    """Return totalRecords for a term without fetching full data."""
    params = {
        "searchTerm": term, "searchOn": "name",
        "indexName": "idxLookup", "pageNo": 1, "pageSize": 1,
    }
    for attempt in range(MAX_RETRIES):
        try:
            res = session.get(LOOKUP_URL, params=params, timeout=20)
            time.sleep(DISCOVERY_DELAY)
            if res.status_code == 429:
                wait = 30 * (attempt + 1)
                logger.warning("Rate limited on probe term=%r, sleeping %ds", term, wait)
                time.sleep(wait)
                continue
            if res.status_code == 401:
                logger.error("Auth 401 — bearer token expired or invalid")
                sys.exit(1)
            if not res.ok:
                return 0
            resp = res.json().get("response", {})
            return resp.get("pagingInfo", {}).get("totalRecords", 0) or 0
        except Exception as exc:
            logger.warning("Probe error term=%r attempt=%d: %s", term, attempt + 1, exc)
            time.sleep(5)
    return 0


def _fetch_page(session: requests.Session, term: str, page_no: int) -> Optional[dict]:
    params = {
        "searchTerm": term, "searchOn": "name",
        "indexName": "idxLookup", "pageNo": page_no, "pageSize": PAGE_SIZE,
    }
    for attempt in range(MAX_RETRIES):
        try:
            res = session.get(LOOKUP_URL, params=params, timeout=20)
            time.sleep(DISCOVERY_DELAY)
            if res.status_code == 429:
                wait = 30 * (attempt + 1)
                logger.warning("Rate limited term=%r page=%d, sleeping %ds", term, page_no, wait)
                time.sleep(wait)
                continue
            if res.status_code == 401:
                logger.error("Auth 401 — bearer token expired")
                sys.exit(1)
            if not res.ok:
                logger.warning("HTTP %d for term=%r page=%d", res.status_code, term, page_no)
                return None
            data = res.json()
            if not data.get("status"):
                return None
            return data.get("response", {})
        except Exception as exc:
            logger.warning("Fetch error term=%r page=%d attempt=%d: %s", term, page_no, attempt + 1, exc)
            time.sleep(5)
    return None


def _iter_results(session: requests.Session, term: str) -> Iterator[dict]:
    page_no = 1
    while True:
        resp = _fetch_page(session, term, page_no)
        if resp is None:
            break
        records = resp.get("data") or []
        if not records:
            break
        yield from records
        paging = resp.get("pagingInfo", {})
        no_of_pages = paging.get("noOfPages", 1) or 1
        if page_no >= no_of_pages:
            break
        page_no += 1


def _generate_terms(session: requests.Session) -> Iterator[str]:
    """
    Yield search terms covering the full Cogencis universe.
    2-letter combos; subdivide to 3-letter if total > SUBDIVIDE_THRESHOLD.
    Skips combos with 0 results.
    """
    letters = string.ascii_lowercase
    total_terms = 26 * 26
    checked = 0
    for c1 in letters:
        for c2 in letters:
            checked += 1
            term2 = c1 + c2
            n = _probe_total(session, term2)
            if checked % 50 == 0 or n > 0:
                logger.info("Term survey [%d/%d]: %r → %d results", checked, total_terms, term2, n)
            if n == 0:
                continue
            if n <= SUBDIVIDE_THRESHOLD:
                yield term2
            else:
                logger.info("Term %r has %d results — subdividing to 3-letter", term2, n)
                for c3 in letters:
                    term3 = term2 + c3
                    n3 = _probe_total(session, term3)
                    if n3 > 0:
                        yield term3

# ── discovery phase ───────────────────────────────────────────────────────────

def run_discovery(
    session: requests.Session,
    dry_run: bool = False,
    resume: bool = True,
) -> Tuple[int, int, int]:
    """
    Crawl symbollookup and upsert matching assets into src_cogencis_company_map.
    Returns (discovered_on_cogencis, newly_mapped, skipped_already_mapped).
    """
    logger.info("=" * 60)
    logger.info("PHASE 1: DISCOVERY")
    logger.info("=" * 60)

    with get_connection() as conn:
        # ISIN → asset_id for all active NSE-listed assets
        rows = conn.fetchall(
            "SELECT id, isin FROM assets WHERE isin IS NOT NULL AND isin != '' "
            "AND is_active = 1 AND nse_listed = 1"
        )
        isin_to_asset: Dict[str, str] = {r["isin"]: r["id"] for r in rows}

        already_mapped: Set[str] = set()
        if resume:
            mapped_rows = conn.fetchall(
                "SELECT asset_id FROM src_cogencis_company_map WHERE is_active = 1"
            )
            already_mapped = {r["asset_id"] for r in mapped_rows}

    logger.info("NSE assets with ISIN: %d | Already mapped: %d", len(isin_to_asset), len(already_mapped))

    seen_isins: Set[str] = set()
    discovered = 0
    newly_mapped = 0
    skipped = 0

    for term in _generate_terms(session):
        term_new = 0
        for record in _iter_results(session, term):
            isin = (record.get("f_5104") or "").strip().upper()
            path = (record.get("path") or "").strip()
            name = (record.get("f_400") or "").strip()

            if not isin or not path:
                continue
            if isin in seen_isins:
                continue
            seen_isins.add(isin)
            discovered += 1

            asset_id = isin_to_asset.get(isin)
            if not asset_id:
                continue  # not in our NSE asset universe

            if asset_id in already_mapped:
                skipped += 1
                continue

            company_url = f"{BASE_URL}/{path}"
            if not dry_run:
                with get_connection() as conn:
                    upsert_cogencis_company_map(conn, asset_id, company_url)
                already_mapped.add(asset_id)

            newly_mapped += 1
            term_new += 1
            logger.info("  + Mapped %-14s  %-50s  %s", isin, name[:50], path[:60])

        if term_new:
            logger.info("Term %r → %d new | total mapped=%d discovered=%d",
                        term, term_new, newly_mapped + len(already_mapped) - skipped, discovered)

    logger.info("Discovery done: on_cogencis=%d new_mapped=%d already_had=%d",
                discovered, newly_mapped, skipped)
    return discovered, newly_mapped, skipped

# ── scrape phase ──────────────────────────────────────────────────────────────


class BufferedConnection(DatabaseConnection):
    """Intercepts DB writes to buffer them in memory, allowing bulk lock-free network crawling."""
    def __init__(self, read_conn: DatabaseConnection):
        self.read_conn = read_conn
        self.buffer = []

    def execute(self, sql: str, params: tuple = ()):
        if sql.lstrip().upper().startswith(("SELECT", "PRAGMA")):
            return self.read_conn.execute(sql, params)
        self.buffer.append(("EXEC", sql, params))
        class MockCursor:
            rowcount = 1
            def fetchone(self): return None
            def fetchall(self): return []
        return MockCursor()

    def executemany(self, sql: str, rows: list) -> int:
        self.buffer.append(("MANY", sql, rows))
        return len(rows)

    def fetchone(self, sql: str, params: tuple = ()):
        return self.read_conn.fetchone(sql, params)

    def fetchall(self, sql: str, params: tuple = ()):
        return self.read_conn.fetchall(sql, params)

    def commit(self) -> None:
        pass

    def rollback(self) -> None:
        pass

    def close(self) -> None:
        pass

    def flush(self, write_conn: DatabaseConnection):
        for item in self.buffer:
            if item[0] == "EXEC":
                write_conn.execute(item[1], item[2])
            elif item[0] == "MANY":
                write_conn.executemany(item[1], item[2])

def _scrape_one(mapping: dict, idx: int, total: int, trade_date: date, db_lock: threading.Lock) -> Tuple[bool, str, str, int, int]:
    """Scrape a single asset. Returns (ok, symbol, asset_id, records, duration_ms)."""
    asset_id = mapping["asset_id"]
    symbol = (mapping["nse_symbol"] or mapping["name"] or asset_id[:8])
    ingester = CogencisFundamentalsIngester(
        page_limit=30,
        delay_seconds=0.75,
        asset_ids=[asset_id],
    )
    try:
        with get_connection() as read_conn:
            buf_conn = BufferedConnection(read_conn)
            run = ingester.run(trade_date, buf_conn)
        
        with db_lock:
            with get_connection() as write_conn:
                buf_conn.flush(write_conn)
                
        ok = run.status == "SUCCESS"
        return ok, symbol, asset_id, run.records_inserted or 0, run.duration_ms or 0
    except Exception as exc:
        logger.error("_scrape_one exception for %s: %s", symbol, exc)
        return False, symbol, asset_id, 0, 0


def run_scrape(
    limit: Optional[int] = None,
    skip_recent_hours: int = 0,
    workers: int = SCRAPE_WORKERS,
) -> Tuple[int, int, int]:
    """
    Run CogencisFundamentalsIngester for every asset in src_cogencis_company_map.
    Uses a thread pool for parallel scraping. Returns (total, success, failed).
    """
    logger.info("=" * 60)
    logger.info("PHASE 2: SCRAPE (workers=%d)", workers)
    logger.info("=" * 60)

    with get_connection() as conn:
        sql = """
            SELECT m.asset_id, m.company_url, a.nse_symbol, a.name
            FROM src_cogencis_company_map m
            JOIN assets a ON a.id = m.asset_id
            WHERE m.is_active = 1 AND a.is_active = 1
        """
        if skip_recent_hours > 0:
            sql += f" AND (m.last_scraped_at IS NULL OR m.last_scraped_at < datetime('now', '-{skip_recent_hours} hours'))"
        sql += " ORDER BY m.last_scraped_at ASC NULLS FIRST"
        mappings = conn.fetchall(sql)

    total_in_map = len(mappings)
    if limit:
        mappings = mappings[:limit]
    n = len(mappings)
    logger.info("Assets to scrape: %d (total in map: %d, workers=%d)", n, total_in_map, workers)

    trade_date = date.today()
    lock = threading.Lock()
    success = 0
    failed = 0
    done = 0
    errors: List[Tuple[str, str, str]] = []

    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {
            pool.submit(_scrape_one, mapping, idx, n, trade_date, lock): (idx, mapping)
            for idx, mapping in enumerate(mappings, 1)
        }
        for future in as_completed(futures):
            idx, mapping = futures[future]
            try:
                ok, symbol, asset_id, records, duration_ms = future.result()
            except Exception as exc:
                ok, symbol, asset_id, records, duration_ms = False, mapping["nse_symbol"] or "?", mapping["asset_id"], 0, 0
                logger.error("  ❌ future exception for %s: %s", asset_id[:8], exc)

            with lock:
                done += 1
                if ok:
                    success += 1
                    logger.info("  [%d/%d] ✅ %-15s %4d records  %dms",
                                done, n, symbol[:15], records, duration_ms)
                else:
                    failed += 1
                    errors.append((symbol, asset_id, "FAILED"))
                    logger.warning("  [%d/%d] ❌ %s", done, n, symbol)

                if done % 25 == 0:
                    eta_min = (n - done) * (duration_ms / 1000 / 60) if duration_ms else "?"
                    logger.info("--- Progress %d/%d | ✅ %d  ❌ %d ---", done, n, success, failed)

            time.sleep(SCRAPE_DELAY)

    logger.info("Scrape complete: total=%d success=%d failed=%d", n, success, failed)
    if errors:
        logger.warning("Failed assets (%d):", len(errors))
        for sym, aid, err in errors[:20]:
            logger.warning("  %s (%s): %s", sym, aid[:8], err[:100])

    return n, success, failed

# ── main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="Cogencis bulk discover + scrape")
    parser.add_argument("--discover-only", action="store_true",
                        help="Run discovery phase only, no scraping")
    parser.add_argument("--scrape-only", action="store_true",
                        help="Skip discovery, scrape all currently mapped assets")
    parser.add_argument("--dry-run", action="store_true",
                        help="Discovery dry-run: find instruments but don't write to DB")
    parser.add_argument("--no-resume", action="store_true",
                        help="Re-map even already-mapped assets during discovery")
    parser.add_argument("--scrape-limit", type=int, default=0,
                        help="Limit scrape to first N assets (0 = no limit)")
    parser.add_argument("--skip-recent-hours", type=int, default=0,
                        help="Skip assets scraped within the last N hours")
    parser.add_argument("--workers", type=int, default=SCRAPE_WORKERS,
                        help=f"Parallel scrape workers (default {SCRAPE_WORKERS})")
    args = parser.parse_args()

    logger.info("Cogencis bulk scrape starting — log: %s", LOG_FILE)
    logger.info("Mode: discover_only=%s scrape_only=%s dry_run=%s limit=%s",
                args.discover_only, args.scrape_only, args.dry_run, args.scrape_limit or "none")

    session = _make_session()

    if not args.scrape_only:
        run_discovery(session, dry_run=args.dry_run, resume=not args.no_resume)

    if not args.discover_only and not args.dry_run:
        run_scrape(
            limit=args.scrape_limit or None,
            skip_recent_hours=args.skip_recent_hours,
            workers=args.workers,
        )

    logger.info("All done.")


if __name__ == "__main__":
    main()
