"""
AMFI Daily NAV Ingestion Pipeline.

Downloads the AMFI NAVAll.txt file (pipe-delimited, published by 11 PM IST daily).
Parses all mutual fund NAVs and inserts into daily_prices with source_exchange='AMFI'.
"""
import io
import logging
import time
from datetime import date, datetime, timedelta, timezone

import pandas as pd
import requests

from utils.alerts import alert_pipeline_failure, alert_pipeline_success
from utils.db import generate_id, get_db
from utils.storage import raw_file_exists, save_raw_file, load_raw_file

logger = logging.getLogger(__name__)

AMFI_NAV_URL = "https://www.amfiindia.com/spages/NAVAll.txt"
AMFI_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "text/plain,*/*",
}
MAX_RETRIES = 5
RETRY_DELAY = 10


def download_amfi_nav(nav_date: date) -> tuple[bytes, str]:
    """
    Download AMFI NAVAll.txt. The file always reflects the latest NAV.
    Saves raw file with the nav_date for archival.
    """
    filename = f"NAVAll_{nav_date.isoformat()}.txt"

    if raw_file_exists("AMFI_NAV", nav_date, filename):
        logger.info(f"Using cached raw file: {filename}")
        return load_raw_file("AMFI_NAV", nav_date, filename), filename

    last_error = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = requests.get(AMFI_NAV_URL, headers=AMFI_HEADERS, timeout=30)
            resp.raise_for_status()
            content = resp.content
            save_raw_file("AMFI_NAV", nav_date, filename, content)
            return content, filename
        except requests.RequestException as e:
            last_error = e
            logger.warning(f"AMFI download attempt {attempt}/{MAX_RETRIES} failed: {e}")
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_DELAY)

    raise RuntimeError(f"Failed to download AMFI NAV after {MAX_RETRIES} retries: {last_error}")


def parse_amfi_nav(content: bytes) -> pd.DataFrame:
    """
    Parse AMFI NAVAll.txt format.

    Format:
      Scheme Code;ISIN Div Payout/ISIN Growth;ISIN Div Reinvestment;Scheme Name;Net Asset Value;Date
      Sections are separated by blank lines with a header like:
      "Open Ended Schemes(Debt Scheme - Banking and PSU Fund)"
    """
    text = content.decode("utf-8", errors="replace")
    lines = text.splitlines()

    records = []
    for line in lines:
        line = line.strip()
        if not line or line.startswith("Scheme Code") or "Open Ended" in line or "Close Ended" in line:
            continue

        parts = line.split(";")
        if len(parts) < 6:
            continue

        try:
            amfi_code = parts[0].strip()
            isin_growth = parts[2].strip() if parts[2].strip() else parts[1].strip()
            name = parts[3].strip()
            nav_str = parts[4].strip()
            date_str = parts[5].strip()

            if not amfi_code or nav_str in ("N.A.", "", "-"):
                continue

            nav = float(nav_str)
            nav_date = datetime.strptime(date_str, "%d-%b-%Y").date()

            records.append({
                "amfi_code": amfi_code,
                "isin": isin_growth if isin_growth and isin_growth != "-" else None,
                "name": name,
                "nav": nav,
                "date": nav_date.isoformat(),
            })
        except (ValueError, IndexError):
            continue

    return pd.DataFrame(records)


def upsert_mf_assets(df: pd.DataFrame):
    """Create or update mutual fund assets in the database."""
    with get_db() as conn:
        for _, row in df.iterrows():
            amfi_code = row["amfi_code"]
            isin = row.get("isin")
            name = row["name"]

            # Try to find by ISIN first, then by amfi_code
            existing = None
            if isin:
                existing = conn.execute(
                    "SELECT id FROM assets WHERE isin = ?", (isin,)
                ).fetchone()
            if not existing:
                existing = conn.execute(
                    "SELECT id FROM assets WHERE amfi_code = ?", (amfi_code,)
                ).fetchone()

            if existing:
                conn.execute(
                    "UPDATE assets SET amfi_code = ?, name = ? WHERE id = ?",
                    (amfi_code, name, existing["id"]),
                )
            else:
                asset_id = generate_id()
                conn.execute(
                    """INSERT INTO assets
                       (id, isin, amfi_code, name, asset_class, is_active)
                       VALUES (?, ?, ?, ?, 'MF', 1)""",
                    (asset_id, isin, amfi_code, name),
                )


def insert_nav_prices(df: pd.DataFrame):
    """Insert NAV prices into daily_prices with source_exchange='AMFI'."""
    with get_db() as conn:
        for _, row in df.iterrows():
            # Resolve asset_id
            asset = None
            if row.get("isin"):
                asset = conn.execute(
                    "SELECT id FROM assets WHERE isin = ?", (row["isin"],)
                ).fetchone()
            if not asset:
                asset = conn.execute(
                    "SELECT id FROM assets WHERE amfi_code = ?", (row["amfi_code"],)
                ).fetchone()
            if not asset:
                continue

            conn.execute(
                """INSERT OR REPLACE INTO daily_prices
                   (asset_id, date, close, adj_close, source_exchange)
                   VALUES (?, ?, ?, ?, 'AMFI')""",
                (asset["id"], row["date"], row["nav"], row["nav"]),
            )


def run_amfi_nav_pipeline(nav_date: date = None):
    """Main AMFI NAV pipeline entry point."""
    if nav_date is None:
        nav_date = date.today() - timedelta(days=1)

    run_id = generate_id()
    start_time = datetime.now(timezone.utc).replace(tzinfo=None)
    source = "AMFI_NAV"

    try:
        logger.info(f"[{source}] Starting pipeline for {nav_date}")

        content, filename = download_amfi_nav(nav_date)
        df = parse_amfi_nav(content)
        logger.info(f"[{source}] Parsed {len(df)} NAV records from {filename}")

        if df.empty:
            raise ValueError("AMFI NAV file parsed to empty DataFrame — possibly wrong date or format change")

        upsert_mf_assets(df)
        insert_nav_prices(df)

        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)

        with get_db() as conn:
            conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, records_inserted, duration_ms)
                   VALUES (?, ?, ?, 'SUCCESS', ?, ?)""",
                (run_id, nav_date.isoformat(), source, len(df), duration_ms),
            )

        logger.info(f"[{source}] ✅ Done. {len(df)} NAVs inserted, {duration_ms}ms")
        alert_pipeline_success(source, len(df), 0, duration_ms)

    except Exception as e:
        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)
        logger.error(f"[{source}] ❌ Pipeline failed: {e}", exc_info=True)
        with get_db() as conn:
            conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, error_log, duration_ms)
                   VALUES (?, ?, ?, 'FAILED', ?, ?)""",
                (run_id, nav_date.isoformat(), source, str(e), duration_ms),
            )
        alert_pipeline_failure(source, str(e), nav_date.isoformat())
        raise


if __name__ == "__main__":
    import sys
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    run_date = date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else date.today() - timedelta(days=1)
    run_amfi_nav_pipeline(run_date)
