"""
BSE Corporate Actions — Raw Fetch Only (no DB writes).

Fetches ALL corporate actions for each BSE scrip code via:
  https://api.bseindia.com/BseIndiaAPI/api/CorporateAction/w?scripcode=<CODE>

Saves raw Table2 JSON to:
  raw_data/BSE_CORP_ACTIONS/bse_ca_<scripcode>.json   (skips if already exists)

Usage:
    python scripts/fetch_bse_ca_raw.py
    python scripts/fetch_bse_ca_raw.py --force     # re-fetch all
    python scripts/fetch_bse_ca_raw.py --workers 5
"""
import argparse
import json
import logging
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import requests

sys.path.insert(0, str(Path(__file__).parent.parent))

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

RAW_DIR = Path(__file__).parent.parent / "raw_data" / "BSE_CORP_ACTIONS"
RAW_DIR.mkdir(parents=True, exist_ok=True)

BSE_CA_URL = "https://api.bseindia.com/BseIndiaAPI/api/CorporateAction/w"
BSE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.bseindia.com/",
    "Accept":  "application/json",
}


def load_bse_scrip_codes() -> list[str]:
    """Load active BSE scrip codes from the relational DB."""
    # Try PostgreSQL first (production)
    try:
        import psycopg2
        conn = psycopg2.connect(
            "postgresql://artha:artha_dev_password@localhost:5432/artha_relational"
        )
        cur = conn.cursor()
        cur.execute(
            "SELECT bse_code FROM assets WHERE bse_code IS NOT NULL AND bse_code != '' AND is_active = 1"
        )
        codes = [str(r[0]).strip() for r in cur.fetchall() if r[0]]
        conn.close()
        log.info("Loaded %d BSE codes from PostgreSQL", len(codes))
        return codes
    except Exception as exc:
        log.warning("PostgreSQL unavailable: %s — trying SQLite", exc)

    # Fallback: SQLite
    try:
        import sqlite3
        sqlite_path = Path(__file__).parent.parent / "db" / "market_data.db"
        conn = sqlite3.connect(str(sqlite_path))
        rows = conn.execute(
            "SELECT bse_code FROM assets WHERE bse_code IS NOT NULL AND bse_code != '' AND is_active = 1"
        ).fetchall()
        conn.close()
        codes = [str(r[0]).strip() for r in rows if r[0]]
        log.info("Loaded %d BSE codes from SQLite", len(codes))
        return codes
    except Exception as exc:
        log.error("SQLite also failed: %s", exc)
        return []


def fetch_one(code: str, force: bool = False) -> tuple[str, int, str]:
    """Fetch CA for one BSE scrip. Returns (code, record_count, status)."""
    out = RAW_DIR / f"bse_ca_{code}.json"
    if out.exists() and not force:
        existing = json.loads(out.read_text())
        return (code, len(existing), "cached")

    url = f"{BSE_CA_URL}?scripcode={code}"
    for attempt in range(1, 4):
        try:
            resp = requests.get(url, headers=BSE_HEADERS, timeout=15)
            resp.raise_for_status()
            data = resp.json().get("Table2", [])
            out.write_text(json.dumps(data, ensure_ascii=False))
            return (code, len(data), "fetched")
        except Exception as exc:
            if attempt < 3:
                time.sleep(2 * attempt)
            else:
                log.debug("BSE CA failed %s: %s", code, exc)
                out.write_text("[]")   # mark as attempted
                return (code, 0, "error")
    return (code, 0, "error")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force",   action="store_true", help="Re-fetch even if cached")
    parser.add_argument("--workers", type=int, default=4,  help="Parallel workers (default: 4)")
    args = parser.parse_args()

    codes = load_bse_scrip_codes()
    if not codes:
        log.error("No BSE codes found — aborting")
        sys.exit(1)

    log.info("Fetching BSE CAs for %d scrips → %s", len(codes), RAW_DIR)

    fetched = cached = errors = total_records = 0

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(fetch_one, code, args.force): code for code in codes}
        for i, future in enumerate(as_completed(futures), 1):
            code, n, status = future.result()
            total_records += n
            if status == "fetched":   fetched += 1
            elif status == "cached":  cached  += 1
            else:                     errors  += 1

            if i % 500 == 0 or i == len(codes):
                log.info("  Progress %d/%d | fetched=%d cached=%d errors=%d records=%d",
                         i, len(codes), fetched, cached, errors, total_records)
            time.sleep(0.1)   # light throttle

    log.info("══ BSE CA Raw Fetch Done ══")
    log.info("  Fetched : %d", fetched)
    log.info("  Cached  : %d", cached)
    log.info("  Errors  : %d", errors)
    log.info("  Records : %d", total_records)
    log.info("  ⚠️  No DB writes performed.")


if __name__ == "__main__":
    main()
