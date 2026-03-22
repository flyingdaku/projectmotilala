"""
Fetch Corporate Actions — DRY RUN (no DB writes)
=================================================
Downloads all corporate actions from:
  • NSE  – date-range API (same as production pipeline)
  • BSE  – per-scrip CorporateAction/w API (Table2)

Saves raw JSON to:
  data/ca_dry_run/
    nse_ca_<from>_<to>.json   — one file per month chunk
    bse_ca_<scrip_code>.json  — one file per BSE scrip

Usage:
    python fetch_ca_dry_run.py [START_DATE END_DATE]

    Defaults: 2010-01-01  to  today
    Example:  python fetch_ca_dry_run.py 2015-01-01 2026-03-22
"""

import json
import logging
import sys
import time
from datetime import date, timedelta
from pathlib import Path

import requests

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

# ── Output directory ──────────────────────────────────────────────────────────
OUT_DIR = Path(__file__).parent / "data" / "ca_dry_run"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ── NSE ───────────────────────────────────────────────────────────────────────
NSE_BASE   = "https://www.nseindia.com"
NSE_CA_URL = (
    "https://www.nseindia.com/api/corporates-corporateActions"
    "?index=equities&from_date={from_date}&to_date={to_date}"
)
NSE_HEADERS = {
    "User-Agent":      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                       "AppleWebKit/537.36 (KHTML, like Gecko) "
                       "Chrome/133.0.0.0 Safari/537.36",
    "Accept":          "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer":         "https://www.nseindia.com/",
    "Connection":      "keep-alive",
}

# ── BSE ───────────────────────────────────────────────────────────────────────
BSE_CA_URL = "https://api.bseindia.com/BseIndiaAPI/api/CorporateAction/w"
BSE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/120.0.0.0 Safari/537.36",
    "Referer":    "https://www.bseindia.com/",
    "Accept":     "application/json",
}


# ─────────────────────────────────────────────────────────────────────────────
# NSE helpers
# ─────────────────────────────────────────────────────────────────────────────

def _create_nse_session() -> requests.Session:
    """Establish an NSE cookie session (required for the API to respond)."""
    session = requests.Session()
    session.headers.update(NSE_HEADERS)
    for attempt in range(1, 6):
        try:
            session.get(NSE_BASE, timeout=15)
            session.get(f"{NSE_BASE}/market-data/live-equity-market", timeout=10)
            log.info("NSE session ready (attempt %d), cookies: %s",
                     attempt, list(session.cookies.keys()))
            time.sleep(2)
            return session
        except Exception as exc:
            log.warning("NSE session attempt %d/5 failed: %s", attempt, exc)
            time.sleep(8 * attempt)
    raise RuntimeError("Could not establish NSE session after 5 attempts")


def fetch_nse_ca_chunk(session: requests.Session, from_d: date, to_d: date) -> list:
    """Fetch one NSE chunk (up to 30 days). Returns list of raw action dicts."""
    url = NSE_CA_URL.format(
        from_date=from_d.strftime("%d-%m-%Y"),
        to_date=to_d.strftime("%d-%m-%Y"),
    )
    for attempt in range(1, 6):
        try:
            resp = session.get(url, timeout=20)
            if resp.status_code in (401, 403):
                log.warning("NSE session expired, re-creating...")
                session = _create_nse_session()
                continue
            resp.raise_for_status()
            data = resp.json()
            if isinstance(data, list):
                return data
            return data.get("data", [])
        except Exception as exc:
            log.warning("NSE CA fetch attempt %d/5 failed [%s–%s]: %s",
                        attempt, from_d, to_d, exc)
            if attempt < 5:
                time.sleep(10)
    log.error("Giving up on NSE chunk %s–%s", from_d, to_d)
    return []


def run_nse_fetch(start: date, end: date):
    """Walk date range in 30-day chunks, save each chunk as a JSON file."""
    log.info("=== NSE Corporate Actions (%s → %s) ===", start, end)
    session = _create_nse_session()

    total = 0
    current = start
    while current <= end:
        chunk_end = min(current + timedelta(days=29), end)
        out_file = OUT_DIR / f"nse_ca_{current}_{chunk_end}.json"

        if out_file.exists():
            existing = json.loads(out_file.read_text())
            log.info("  [NSE] CACHED  %s–%s  (%d records)", current, chunk_end, len(existing))
            total += len(existing)
        else:
            records = fetch_nse_ca_chunk(session, current, chunk_end)
            out_file.write_text(json.dumps(records, indent=2, ensure_ascii=False))
            log.info("  [NSE] FETCHED %s–%s  → %d records saved to %s",
                     current, chunk_end, len(records), out_file.name)
            total += len(records)
            time.sleep(1.5)   # polite delay

        current = chunk_end + timedelta(days=1)

    log.info("=== NSE done. Total records fetched: %d ===", total)
    return total


# ─────────────────────────────────────────────────────────────────────────────
# BSE helpers
# ─────────────────────────────────────────────────────────────────────────────

def _load_bse_scrip_codes() -> list[str]:
    """
    Load BSE scrip codes from the relational database.
    Falls back to reading from a local JSON file if DB is unavailable.
    """
    scrip_codes: list[str] = []

    # Try reading from the pipeline's SQLite market_data.db first
    sqlite_path = Path(__file__).parent / "db" / "market_data.db"
    if sqlite_path.exists():
        try:
            import sqlite3
            conn = sqlite3.connect(str(sqlite_path))
            rows = conn.execute(
                "SELECT bse_code FROM assets WHERE bse_code IS NOT NULL AND bse_code != '' AND is_active = 1"
            ).fetchall()
            conn.close()
            scrip_codes = [str(r[0]).strip() for r in rows if r[0]]
            log.info("Loaded %d BSE scrip codes from SQLite", len(scrip_codes))
            return scrip_codes
        except Exception as exc:
            log.warning("Could not read SQLite: %s — trying PostgreSQL", exc)

    # Try PostgreSQL relational DB
    try:
        import psycopg2
        pg = psycopg2.connect(
            "postgresql://artha:artha_dev_password@localhost:5432/artha_relational"
        )
        cur = pg.cursor()
        cur.execute(
            "SELECT bse_code FROM assets WHERE bse_code IS NOT NULL AND bse_code != '' AND is_active = 1"
        )
        rows = cur.fetchall()
        pg.close()
        scrip_codes = [str(r[0]).strip() for r in rows if r[0]]
        log.info("Loaded %d BSE scrip codes from PostgreSQL", len(scrip_codes))
        return scrip_codes
    except Exception as exc:
        log.warning("PostgreSQL also failed: %s", exc)

    log.error("Could not load BSE scrip codes from any source!")
    return []


def fetch_bse_ca_scrip(scrip_code: str) -> list:
    """Fetch all corporate actions for a single BSE scrip (Table2)."""
    url = f"{BSE_CA_URL}?scripcode={scrip_code}"
    try:
        resp = requests.get(url, headers=BSE_HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        return data.get("Table2", [])
    except Exception as exc:
        log.debug("BSE CA fetch failed for %s: %s", scrip_code, exc)
        return []


def run_bse_fetch():
    """Iterate over all known BSE scrip codes, save each as JSON."""
    log.info("=== BSE Corporate Actions (all scrips) ===")
    scrip_codes = _load_bse_scrip_codes()
    if not scrip_codes:
        log.error("No BSE scrip codes found — aborting BSE fetch")
        return 0

    total_records = 0
    total_scrips_with_data = 0
    skipped_cached = 0

    for i, code in enumerate(scrip_codes, 1):
        out_file = OUT_DIR / f"bse_ca_{code}.json"

        if out_file.exists():
            existing = json.loads(out_file.read_text())
            if existing:  # non-empty cached file — skip
                skipped_cached += 1
                total_records += len(existing)
                continue

        records = fetch_bse_ca_scrip(code)
        out_file.write_text(json.dumps(records, indent=2, ensure_ascii=False))

        if records:
            total_records += len(records)
            total_scrips_with_data += 1

        if i % 200 == 0:
            log.info("  [BSE] Progress %d/%d scrips | records so far: %d",
                     i, len(scrip_codes), total_records)

        time.sleep(0.25)   # 4 req/s — polite

    log.info(
        "=== BSE done. %d scrips with data | %d cached | %d total records ===",
        total_scrips_with_data, skipped_cached, total_records,
    )
    return total_records


# ─────────────────────────────────────────────────────────────────────────────
# Entry point
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    if len(sys.argv) == 3:
        start_date = date.fromisoformat(sys.argv[1])
        end_date   = date.fromisoformat(sys.argv[2])
    else:
        start_date = date(2010, 1, 1)
        end_date   = date.today()

    log.info("Dry-run fetch: %s → %s", start_date, end_date)
    log.info("Output directory: %s", OUT_DIR.resolve())

    nse_total = run_nse_fetch(start_date, end_date)
    bse_total = run_bse_fetch()

    log.info("")
    log.info("══════════════════════════════════════════")
    log.info("  NSE total records : %d", nse_total)
    log.info("  BSE total records : %d", bse_total)
    log.info("  Output dir        : %s", OUT_DIR.resolve())
    log.info("  ⚠️  No DB writes performed.")
    log.info("══════════════════════════════════════════")
