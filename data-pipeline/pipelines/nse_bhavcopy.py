"""
NSE Bhavcopy Ingestion Pipeline.

Execution order (per docs/data_pipeline.md):
  1. Fetch NSE Security Master (new listings/delistings)
  2. Download Bhavcopy ZIP
  3. Run circuit breakers
  4. Upsert assets
  5. Insert daily prices
  6. Log pipeline run
"""
import io
import logging
import time
import zipfile
from datetime import date, datetime, timedelta, timezone

import pandas as pd
import requests

from utils.alerts import alert_pipeline_failure, alert_pipeline_success
from utils.calendar import ensure_holiday_cache, get_previous_trading_date, is_trading_day
from utils.circuit_breakers import run_circuit_breakers
from utils.db import generate_id, get_db
from utils.storage import raw_file_exists, save_raw_file

logger = logging.getLogger(__name__)

NSE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
}

MAX_RETRIES = 5
RETRY_DELAY = 10  # seconds


def _download_with_retry(url: str, retries: int = MAX_RETRIES) -> bytes:
    """Download a URL with retry logic. Returns raw bytes."""
    last_error = None
    for attempt in range(1, retries + 1):
        try:
            resp = requests.get(url, headers=NSE_HEADERS, timeout=30)
            if resp.status_code == 404:
                return None  # Caller handles 404 (format fallback)
            resp.raise_for_status()
            return resp.content
        except requests.RequestException as e:
            last_error = e
            logger.warning(f"Download attempt {attempt}/{retries} failed for {url}: {e}")
            if attempt < retries:
                time.sleep(RETRY_DELAY)
    raise RuntimeError(f"Failed to download {url} after {retries} retries: {last_error}")


def download_nse_bhavcopy(trade_date: date) -> tuple[bytes, str]:
    """
    Download NSE Bhavcopy ZIP for the given date.
    Tries new format first (post-2024), falls back to old format.
    Returns (raw_bytes, filename).
    """
    date_str = trade_date.strftime("%Y%m%d")
    new_filename = f"BhavCopy_NSE_CM_0_0_0_{date_str}_F_0000.csv.zip"
    new_url = f"https://nsearchives.nseindia.com/content/cm/{new_filename}"

    # Check raw file cache first
    if raw_file_exists("NSE_BHAVCOPY", trade_date, new_filename):
        from utils.storage import load_raw_file
        logger.info(f"Using cached raw file: {new_filename}")
        return load_raw_file("NSE_BHAVCOPY", trade_date, new_filename), new_filename

    content = _download_with_retry(new_url)
    if content is not None:
        save_raw_file("NSE_BHAVCOPY", trade_date, new_filename, content)
        return content, new_filename

    # Fallback to old format
    old_filename = f"cm{trade_date.strftime('%d%b%Y').upper()}bhav.csv.zip"
    old_url = (
        f"https://nsearchives.nseindia.com/content/historical/EQUITIES/"
        f"{trade_date.year}/{trade_date.strftime('%b').upper()}/{old_filename}"
    )

    if raw_file_exists("NSE_BHAVCOPY", trade_date, old_filename):
        from utils.storage import load_raw_file
        logger.info(f"Using cached raw file: {old_filename}")
        return load_raw_file("NSE_BHAVCOPY", trade_date, old_filename), old_filename

    content = _download_with_retry(old_url)
    if content is None:
        raise RuntimeError(f"Bhavcopy not available for {trade_date} (both formats returned 404)")

    save_raw_file("NSE_BHAVCOPY", trade_date, old_filename, content)
    return content, old_filename


def parse_bhavcopy(content: bytes, filename: str) -> pd.DataFrame:
    """
    Parse Bhavcopy ZIP content into a normalized DataFrame.
    Handles both new (post-2024) and old column formats.
    Returns DataFrame with columns: [date, isin, symbol, series, open, high, low, close, volume, trades]
    """
    with zipfile.ZipFile(io.BytesIO(content)) as z:
        csv_name = next((n for n in z.namelist() if n.endswith(".csv")), None)
        if not csv_name:
            raise ValueError(f"No CSV found inside {filename}")
        df = pd.read_csv(z.open(csv_name))

    # Strip whitespace from column names
    df.columns = df.columns.str.strip()

    # ── New format (post-2024) ──────────────────────────────────
    if "TckrSymb" in df.columns:
        df = df.rename(columns={
            "TradDt": "date",
            "TckrSymb": "symbol",
            "ISIN": "isin",
            "SctySrs": "series",
            "OpnPric": "open",
            "HghPric": "high",
            "LwPric": "low",
            "ClsPric": "close",
            "TtlTradgVol": "volume",
            "TtlNbOfTxsExctd": "trades",
        })
    # ── Old format (pre-2024) ───────────────────────────────────
    else:
        df = df.rename(columns={
            "TIMESTAMP": "date",
            "SYMBOL": "symbol",
            "ISIN": "isin",
            "SERIES": "series",
            "OPEN": "open",
            "HIGH": "high",
            "LOW": "low",
            "CLOSE": "close",
            "TOTTRDQTY": "volume",
            "TOTALTRADES": "trades",
        })

    # Filter EQ series only
    df = df[df["series"].str.strip() == "EQ"].copy()

    # Normalize date to ISO string
    df["date"] = pd.to_datetime(df["date"]).dt.strftime("%Y-%m-%d")

    # Strip whitespace from string columns
    for col in ["symbol", "isin", "series"]:
        if col in df.columns:
            df[col] = df[col].str.strip()

    # Ensure numeric columns
    for col in ["open", "high", "low", "close", "volume"]:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    if "trades" not in df.columns:
        df["trades"] = 0
    else:
        df["trades"] = pd.to_numeric(df["trades"], errors="coerce").fillna(0).astype(int)

    df = df[["date", "isin", "symbol", "series", "open", "high", "low", "close", "volume", "trades"]]
    return df.dropna(subset=["close", "isin"])


def fetch_nse_security_master() -> pd.DataFrame:
    """
    Download NSE Security Master (EQUITY_L.csv) for ISIN→Symbol→Name mapping.
    Used to pre-populate assets table with company names.
    """
    url = "https://nsearchives.nseindia.com/content/equities/EQUITY_L.csv"
    try:
        resp = requests.get(url, headers=NSE_HEADERS, timeout=30)
        resp.raise_for_status()
        df = pd.read_csv(io.BytesIO(resp.content))
        df.columns = df.columns.str.strip()
        df = df.rename(columns={
            "SYMBOL": "symbol",
            "NAME OF COMPANY": "name",
            " ISIN NUMBER": "isin",
            "ISIN NUMBER": "isin",
            " SERIES": "series",
            "SERIES": "series",
            " DATE OF LISTING": "listing_date",
            "DATE OF LISTING": "listing_date",
        })
        for col in ["symbol", "name", "isin", "series"]:
            if col in df.columns:
                df[col] = df[col].str.strip()
        return df[["symbol", "name", "isin", "series", "listing_date"]].dropna(subset=["isin"])
    except Exception as e:
        logger.warning(f"Could not fetch NSE Security Master: {e}")
        return pd.DataFrame()


def upsert_assets(df: pd.DataFrame, security_master: pd.DataFrame):
    """
    Create or update assets in the database from Bhavcopy rows.
    Uses Security Master for company names when available.
    """
    name_map = {}
    listing_map = {}
    if not security_master.empty:
        name_map = dict(zip(security_master["isin"], security_master["name"]))
        listing_map = dict(zip(security_master["isin"], security_master.get("listing_date", {})))

    with get_db() as conn:
        for _, row in df.iterrows():
            isin = row["isin"]
            symbol = row["symbol"]
            name = name_map.get(isin, symbol)  # Fall back to symbol if no name
            listing_date = listing_map.get(isin)

            existing = conn.execute(
                "SELECT id FROM assets WHERE isin = ?", (isin,)
            ).fetchone()

            if existing:
                conn.execute(
                    "UPDATE assets SET nse_symbol = ?, nse_listed = 1, is_active = 1 WHERE isin = ?",
                    (symbol, isin),
                )
            else:
                asset_id = generate_id()
                conn.execute(
                    """INSERT INTO assets
                       (id, isin, nse_symbol, name, asset_class, series, nse_listed, is_active, listing_date)
                       VALUES (?, ?, ?, ?, 'EQUITY', ?, 1, 1, ?)""",
                    (asset_id, isin, symbol, name, row.get("series", "EQ"), listing_date),
                )


def insert_prices(df: pd.DataFrame):
    """
    Insert daily prices into the database.
    Uses INSERT OR REPLACE to handle re-runs idempotently.
    """
    with get_db() as conn:
        for _, row in df.iterrows():
            asset = conn.execute(
                "SELECT id FROM assets WHERE isin = ?", (row["isin"],)
            ).fetchone()

            if not asset:
                logger.warning(f"Asset not found for ISIN {row['isin']}, skipping price insert")
                continue

            conn.execute(
                """INSERT OR REPLACE INTO daily_prices
                   (asset_id, date, open, high, low, close, adj_close, volume, trades, source_exchange)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'NSE')""",
                (
                    asset["id"],
                    row["date"],
                    row.get("open"),
                    row.get("high"),
                    row.get("low"),
                    row["close"],
                    row["close"],  # adj_close starts equal to close; updated by adjust_prices.py
                    int(row.get("volume", 0) or 0),
                    int(row.get("trades", 0) or 0),
                ),
            )


def run_nse_bhavcopy_pipeline(trade_date: date = None):
    """
    Main NSE Bhavcopy pipeline entry point.

    Steps:
      1. Ensure holiday cache is populated
      2. Validate trade_date is a trading day
      3. Fetch NSE Security Master
      4. Download Bhavcopy
      5. Parse Bhavcopy
      6. Run circuit breakers
      7. Upsert assets
      8. Insert prices
      9. Log pipeline run
    """
    if trade_date is None:
        trade_date = date.today() - timedelta(days=1)

    ensure_holiday_cache()

    if not is_trading_day(trade_date):
        logger.info(f"{trade_date} is not a trading day, skipping NSE Bhavcopy pipeline")
        return

    run_id = generate_id()
    start_time = datetime.now(timezone.utc).replace(tzinfo=None)
    source = "NSE_BHAVCOPY"

    try:
        logger.info(f"[{source}] Starting pipeline for {trade_date}")

        # Step 1: Security Master
        security_master = fetch_nse_security_master()
        logger.info(f"[{source}] Security Master: {len(security_master)} records")

        # Step 2-3: Download + Parse
        content, filename = download_nse_bhavcopy(trade_date)
        df_raw = parse_bhavcopy(content, filename)
        logger.info(f"[{source}] Parsed {len(df_raw)} EQ rows from {filename}")

        # Step 4: Circuit breakers
        df_clean, flagged = run_circuit_breakers(df_raw, trade_date)
        logger.info(f"[{source}] Circuit breakers: {len(flagged)} flagged, {len(df_clean)} clean")

        # Step 5: Upsert assets
        upsert_assets(df_clean, security_master)

        # Step 6: Insert prices
        insert_prices(df_clean)

        # Step 7: Log success
        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)
        records_inserted = len(df_clean)
        records_skipped = len(df_raw) - len(df_clean)

        with get_db() as conn:
            conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, records_inserted, records_skipped, circuit_breaks, duration_ms)
                   VALUES (?, ?, ?, 'SUCCESS', ?, ?, ?, ?)""",
                (run_id, trade_date.isoformat(), source, records_inserted, records_skipped, len(flagged), duration_ms),
            )

        logger.info(
            f"[{source}] ✅ Done. {records_inserted} inserted, "
            f"{records_skipped} skipped, {len(flagged)} circuit breaks, {duration_ms}ms"
        )
        alert_pipeline_success(source, records_inserted, len(flagged), duration_ms)

    except Exception as e:
        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)
        logger.error(f"[{source}] ❌ Pipeline failed: {e}", exc_info=True)

        with get_db() as conn:
            conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, error_log, duration_ms)
                   VALUES (?, ?, ?, 'FAILED', ?, ?)""",
                (run_id, trade_date.isoformat(), source, str(e), duration_ms),
            )

        alert_pipeline_failure(source, str(e), trade_date.isoformat())
        raise


if __name__ == "__main__":
    import sys
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

    if len(sys.argv) > 1:
        run_date = date.fromisoformat(sys.argv[1])
    else:
        run_date = date.today() - timedelta(days=1)

    run_nse_bhavcopy_pipeline(run_date)
