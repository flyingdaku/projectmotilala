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
from pathlib import Path

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
    "Referer": "https://www.nseindia.com",
}

MAX_RETRIES = 5
RETRY_DELAY = 10  # seconds

# Reusable session (primed with NSE cookies once per process)
_nse_session: requests.Session | None = None
_nse_session_lock = __import__('threading').Lock()


def _get_nse_session() -> requests.Session:
    """Return a cookie-primed NSE session, creating one if needed."""
    global _nse_session
    with _nse_session_lock:
        if _nse_session is None:
            s = requests.Session()
            s.headers.update(NSE_HEADERS)
            try:
                s.get("https://www.nseindia.com", timeout=15)
                logger.debug("NSE session cookie primed")
            except Exception as e:
                logger.warning(f"NSE session prime failed (continuing anyway): {e}")
            _nse_session = s
        return _nse_session


def _download_with_retry(url: str, retries: int = MAX_RETRIES) -> bytes:
    """Download a URL with retry logic using the NSE session. Returns raw bytes."""
    session = _get_nse_session()
    last_error = None
    for attempt in range(1, retries + 1):
        try:
            resp = session.get(url, timeout=30)
            if resp.status_code == 404:
                return None  # Caller handles 404 (format fallback)
            if resp.status_code in (403, 429):
                logger.warning(f"NSE blocked ({resp.status_code}), re-priming session...")
                global _nse_session
                with _nse_session_lock:
                    _nse_session = None  # force re-prime on next call
                session = _get_nse_session()
                time.sleep(RETRY_DELAY * attempt)
                continue
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
    Handles three column format generations:
      - New (post-2024): TckrSymb, TradDt, etc.
      - Mid (2002-2024): SYMBOL, ISIN, TIMESTAMP, TOTTRDQTY, TOTALTRADES
      - Legacy (pre-2002): SYMBOL, TIMESTAMP, TOTTRDQTY (NO ISIN)
    Returns DataFrame with columns: [date, isin, symbol, series, open, high, low, close, volume, trades]
    """
    with zipfile.ZipFile(io.BytesIO(content)) as z:
        csv_name = next((n for n in z.namelist() if n.endswith(".csv")), None)
        if not csv_name:
            raise ValueError(f"No CSV found inside {filename}")
        df = pd.read_csv(z.open(csv_name))

    # Strip whitespace from column names
    df.columns = df.columns.str.strip()
    cols = set(df.columns)

    # ── New format (post-2024) ──────────────────────────────────
    if "TckrSymb" in cols:
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
    # ── Mid / Legacy format ─────────────────────────────────────
    else:
        rename_map = {
            "TIMESTAMP": "date",
            "SYMBOL": "symbol",
            "SERIES": "series",
            "OPEN": "open",
            "HIGH": "high",
            "LOW": "low",
            "CLOSE": "close",
            "TOTTRDQTY": "volume",
        }
        # ISIN may not exist in very old files (pre-2002)
        if "ISIN" in cols:
            rename_map["ISIN"] = "isin"
        # TOTALTRADES only in mid-era files
        if "TOTALTRADES" in cols:
            rename_map["TOTALTRADES"] = "trades"
        df = df.rename(columns=rename_map)

        # Legacy files have no ISIN — synthesize a NULL isin so we can
        # still upsert by symbol. The upsert logic handles isin=None.
        if "isin" not in df.columns:
            df["isin"] = None
            logger.debug(f"Legacy format (no ISIN): {filename}")

    # Filter EQ series only
    df = df[df["series"].str.strip() == "EQ"].copy()

    # Normalize date to ISO string
    df["date"] = pd.to_datetime(df["date"]).dt.strftime("%Y-%m-%d")

    # Strip whitespace from string columns
    for col in ["symbol", "isin", "series"]:
        if col in df.columns:
            df[col] = df[col].astype(str).str.strip().replace("nan", None)

    # Ensure numeric columns
    for col in ["open", "high", "low", "close", "volume"]:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    if "trades" not in df.columns:
        df["trades"] = 0
    else:
        df["trades"] = pd.to_numeric(df["trades"], errors="coerce").fillna(0).astype(int)

    df = df[["date", "isin", "symbol", "series", "open", "high", "low", "close", "volume", "trades"]]
    # For legacy files (isin=None), drop only if close is null
    return df.dropna(subset=["close"])


# Cache security master for the lifetime of the process
_security_master_cache: pd.DataFrame | None = None
_SECURITY_MASTER_CACHE_FILE = (
    Path(__file__).parent.parent / "raw_data" / "NSE_MASTER" / "EQUITY_L.csv"
)


def fetch_nse_security_master() -> pd.DataFrame:
    """
    Download NSE Security Master (EQUITY_L.csv) for ISIN→Symbol→Name mapping.
    Stale cache (>24h) or missing file triggers a fresh download.
    Returns empty DataFrame on failure (pipeline continues without names).
    """
    global _security_master_cache
    if _security_master_cache is not None and not _security_master_cache.empty:
        return _security_master_cache

    cache = _SECURITY_MASTER_CACHE_FILE
    cache.parent.mkdir(parents=True, exist_ok=True)

    # Use cached file if fresh (<24h)
    if cache.exists():
        age_h = (time.time() - cache.stat().st_mtime) / 3600
        if age_h < 24:
            logger.debug("Security Master: loading from cache")
            try:
                df = pd.read_csv(cache)
                _security_master_cache = df
                return df
            except Exception:
                pass

    # Live download
    url = "https://nsearchives.nseindia.com/content/equities/EQUITY_L.csv"
    try:
        session = _get_nse_session()
        resp = session.get(url, timeout=30)
        resp.raise_for_status()
        cache.write_bytes(resp.content)
        logger.info(f"Security Master: downloaded {len(resp.content):,} bytes")
        df = pd.read_csv(io.BytesIO(resp.content))
    except Exception as e:
        logger.warning(f"Security Master download failed: {e}")
        # Try stale cache
        if cache.exists():
            logger.info("Security Master: using stale cache")
            try:
                df = pd.read_csv(cache)
                _security_master_cache = df
                return df
            except Exception:
                pass
        return pd.DataFrame()

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
    result = df[["symbol", "name", "isin", "series", "listing_date"]].dropna(subset=["isin"])
    _security_master_cache = result
    return result


def upsert_assets(df: pd.DataFrame, security_master: pd.DataFrame):
    """
    Create or update assets in the database from Bhavcopy rows.
    Uses Security Master for company names when available.
    Handles legacy rows where isin may be None (pre-2002 files).
    """
    name_map = {}
    listing_map = {}
    if not security_master.empty:
        name_map = dict(zip(security_master["isin"], security_master["name"]))
        listing_map = dict(zip(security_master["isin"], security_master.get("listing_date", {})))

    with get_db() as conn:
        for _, row in df.iterrows():
            isin = row["isin"] if row["isin"] and str(row["isin"]).lower() not in ("none", "nan", "") else None
            symbol = row["symbol"]
            name = name_map.get(isin, symbol) if isin else symbol
            listing_date = listing_map.get(isin) if isin else None

            # Try to find by ISIN first, then by symbol
            existing = None
            if isin:
                existing = conn.execute(
                    "SELECT id FROM assets WHERE isin = ?", (isin,)
                ).fetchone()
            if not existing:
                existing = conn.execute(
                    "SELECT id FROM assets WHERE nse_symbol = ? AND asset_class = 'EQUITY'", (symbol,)
                ).fetchone()

            if existing:
                conn.execute(
                    "UPDATE assets SET nse_symbol = ?, nse_listed = 1, is_active = 1 WHERE id = ?",
                    (symbol, existing["id"]),
                )
                # Backfill ISIN if we now have it
                if isin:
                    conn.execute(
                        "UPDATE assets SET isin = ? WHERE id = ? AND (isin IS NULL OR isin = '')",
                        (isin, existing["id"]),
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
    Falls back to symbol matching for legacy rows where isin is None.
    """
    with get_db() as conn:
        for _, row in df.iterrows():
            isin = row["isin"] if row["isin"] and str(row["isin"]).lower() not in ("none", "nan", "") else None
            symbol = row["symbol"]

            asset = None
            if isin:
                asset = conn.execute(
                    "SELECT id FROM assets WHERE isin = ?", (isin,)
                ).fetchone()
            if not asset:
                asset = conn.execute(
                    "SELECT id FROM assets WHERE nse_symbol = ? AND asset_class = 'EQUITY'", (symbol,)
                ).fetchone()

            if not asset:
                logger.warning(f"Asset not found for {isin or symbol}, skipping price insert")
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
