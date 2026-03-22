"""
BSE Bhavcopy Ingestion Pipeline.

Downloads BSE EOD equity bhavcopy, cross-validates with NSE data,
and inserts BSE-only stocks (not listed on NSE).
"""
import io
import logging
import time
import zipfile
from datetime import date, datetime, timedelta, timezone

import pandas as pd
import requests

from utils.alerts import alert_pipeline_failure, alert_pipeline_success
from utils.calendar import ensure_holiday_cache, is_trading_day
from utils.circuit_breakers import run_circuit_breakers
from core.db import generate_id, get_db, get_prices_db
from utils.storage import load_raw_file, raw_file_exists, save_raw_file

logger = logging.getLogger(__name__)

BSE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Referer": "https://www.bseindia.com/",
}

MAX_RETRIES = 5
RETRY_DELAY = 10


def _download_with_retry(url: str) -> bytes:
    last_error = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = requests.get(url, headers=BSE_HEADERS, timeout=30)
            if resp.status_code == 404:
                return None
            resp.raise_for_status()
            return resp.content
        except requests.RequestException as e:
            last_error = e
            logger.warning(f"BSE download attempt {attempt}/{MAX_RETRIES} failed: {e}")
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_DELAY)
    raise RuntimeError(f"Failed to download BSE Bhavcopy after {MAX_RETRIES} retries: {last_error}")


def download_bse_bhavcopy(trade_date: date) -> tuple[bytes, str]:
    """
    Download BSE Bhavcopy ZIP or CSV.
    Tries old format first, then falls back to new format (2024+).
    """
    # 1. Try old ZIP format First
    filename1 = f"EQ{trade_date.strftime('%d%m%y')}_CSV.zip"
    url1 = f"https://www.bseindia.com/download/BhavCopy/Equity/{filename1}"

    if raw_file_exists("BSE_BHAVCOPY", trade_date, filename1):
        logger.info(f"Using cached raw file: {filename1}")
        return load_raw_file("BSE_BHAVCOPY", trade_date, filename1), filename1

    # 2. Try newer ZIP format (sometimes used)
    filename2 = f"BhavCopy_BSE_CM_0_0_0_{trade_date.strftime('%Y%m%d')}_F_0000.csv.zip"
    url2 = f"https://www.bseindia.com/download/BhavCopy/Equity/{filename2}"
    if raw_file_exists("BSE_BHAVCOPY", trade_date, filename2):
         logger.info(f"Using cached raw file: {filename2}")
         return load_raw_file("BSE_BHAVCOPY", trade_date, filename2), filename2

    # 3. Try latest raw CSV format (2025+)
    filename3 = f"BhavCopy_BSE_CM_0_0_0_{trade_date.strftime('%Y%m%d')}_F_0000.CSV"
    url3 = f"https://www.bseindia.com/download/BhavCopy/Equity/{filename3}"
    if raw_file_exists("BSE_BHAVCOPY", trade_date, filename3):
         logger.info(f"Using cached raw file: {filename3}")
         return load_raw_file("BSE_BHAVCOPY", trade_date, filename3), filename3

    # Attempt download sequentially
    content = _download_with_retry(url1)
    if content:
        save_raw_file("BSE_BHAVCOPY", trade_date, filename1, content)
        return content, filename1

    content = _download_with_retry(url2)
    if content:
        save_raw_file("BSE_BHAVCOPY", trade_date, filename2, content)
        return content, filename2

    content = _download_with_retry(url3)
    if content:
        # Save raw CSV
        save_raw_file("BSE_BHAVCOPY", trade_date, filename3, content)
        # Compress it so we keep storage low like the rest
        import zipfile
        zip_filename = f"{filename3}.zip"
        z_buf = io.BytesIO()
        with zipfile.ZipFile(z_buf, 'w', zipfile.ZIP_DEFLATED) as z:
            z.writestr(filename3, content)
        zip_content = z_buf.getvalue()
        save_raw_file("BSE_BHAVCOPY", trade_date, zip_filename, zip_content)
        return zip_content, zip_filename

    raise RuntimeError(f"BSE Bhavcopy not available for {trade_date} (404)")


def parse_bse_bhavcopy(content: bytes, filename: str) -> pd.DataFrame:
    """
    Parse BSE Bhavcopy ZIP into a normalized DataFrame.
    BSE CSV columns: CODE, NAME, OPEN, HIGH, LOW, CLOSE, TOTTRDQTY, ISIN
    """
    with zipfile.ZipFile(io.BytesIO(content)) as z:
        csv_name = next((n for n in z.namelist() if n.lower().endswith(".csv")), None)
        if not csv_name:
            raise ValueError(f"No CSV found inside {filename}")
        df = pd.read_csv(z.open(csv_name))

    df.columns = df.columns.str.strip()

    # BSE column mapping — handle old, new, and 2024+ naming conventions
    rename_map = {
        "CODE": "bse_code", "SC_CODE": "bse_code", "FinInstrmId": "bse_code",
        "NAME": "name", "SC_NAME": "name", "FinInstrmNm": "name",
        "OPEN": "open", "OpnPric": "open",
        "PREVCLOSE": "prev_close", "PrvsClsgPric": "prev_close",
        "HIGH": "high", "HghPric": "high",
        "LOW": "low", "LwPric": "low",
        "CLOSE": "close", "ClsPric": "close",
        "TOTTRDQTY": "volume",    # old format
        "NO_OF_SHRS": "volume",   # new format (shares traded)
        "TtlTradgVol": "volume",  # 2024+ format
        "NET_TURNOV": "turnover", "TtlTrfVal": "turnover",
        "NO_TRADES": "trades", "TtlNbOfTxsExctd": "trades",
        "ISIN": "isin", "ISIN_CODE": "isin",
    }
    
    # Safely rename to avoid duplicate column names if multiple keys exist
    for old_col, new_col in rename_map.items():
        if old_col in df.columns and new_col not in df.columns:
            df = df.rename(columns={old_col: new_col})

    for col in ["bse_code", "name"]:
        if col in df.columns:
            df[col] = df[col].astype(str).str.strip()

    # ISIN may be absent in older formats — add empty column so downstream code works
    if "isin" not in df.columns:
        df["isin"] = None
    else:
        df["isin"] = df["isin"].astype(str).str.strip()

    for col in ["open", "high", "low", "close", "volume"]:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0.0)

    if "trades" not in df.columns:
        df["trades"] = 0
    df["trades"] = pd.to_numeric(df["trades"], errors="coerce").fillna(0)
    if "volume" not in df.columns:
        df["volume"] = 0

    # Require close price; isin can be null (will be matched by bse_code instead)
    df = df.dropna(subset=["close"])
    df = df[df["close"] > 0]

    # Clean null-ish isin strings
    df.loc[df["isin"].isin(["nan", "None", "", "0"]), "isin"] = None

    return df[["bse_code", "name", "isin", "open", "high", "low", "close", "volume", "trades"]]


def _build_bse_asset_cache(conn):
    """Build in-memory ISIN→id and bse_code→id lookup maps from the assets table."""
    isin_map = {}
    code_map = {}
    rows = conn.execute(
        "SELECT id, isin, bse_code FROM assets WHERE asset_class = 'EQUITY'"
    ).fetchall()
    for r in rows:
        if r["isin"]:
            isin_map[r["isin"]] = r["id"]
        if r["bse_code"]:
            code_map[str(r["bse_code"]).strip()] = r["id"]
    return isin_map, code_map


def _clean_bse_isin(val) -> str:
    """Return cleaned ISIN string or None."""
    if val is None:
        return None
    s = str(val).strip()
    if s.lower() in ("none", "nan", ""):
        return None
    return s


def upsert_bse_assets(df: pd.DataFrame):
    """Create or update assets with BSE data. Links BSE code to existing ISIN if present.

    Optimized: builds in-memory cache to avoid per-row SELECT queries.
    """
    with get_db() as conn:
        isin_cache, code_cache = _build_bse_asset_cache(conn)

        update_with_isin = []   # (bse_code, isin, id)
        update_no_isin = []     # (bse_code, id)
        new_assets = []         # (id, isin, bse_code, name)
        seen_codes = set()

        for _, row in df.iterrows():
            isin = _clean_bse_isin(row["isin"])
            bse_code = str(row.get("bse_code", "")).strip()
            name = str(row.get("name", bse_code)).strip()

            # Resolve existing asset_id from cache
            existing_id = None
            if isin and isin in isin_cache:
                existing_id = isin_cache[isin]
            if not existing_id and bse_code in code_cache:
                existing_id = code_cache[bse_code]

            if existing_id:
                if isin:
                    update_with_isin.append((bse_code, isin, existing_id))
                else:
                    update_no_isin.append((bse_code, existing_id))
                # Update caches
                code_cache[bse_code] = existing_id
                if isin:
                    isin_cache[isin] = existing_id
            else:
                if bse_code in seen_codes:
                    continue
                asset_id = generate_id()
                new_assets.append((asset_id, isin, bse_code, name))
                code_cache[bse_code] = asset_id
                if isin:
                    isin_cache[isin] = asset_id
                seen_codes.add(bse_code)

        # Batch updates
        if update_with_isin:
            conn.executemany(
                "UPDATE assets SET bse_code = %s, bse_listed = 1, isin = COALESCE(isin, %s) WHERE id = %s",
                update_with_isin,
            )
        if update_no_isin:
            conn.executemany(
                "UPDATE assets SET bse_code = %s, bse_listed = 1 WHERE id = %s",
                update_no_isin,
            )
        # Batch insert new assets
        if new_assets:
            conn.executemany(
                """INSERT INTO assets
                   (id, isin, bse_code, name, asset_class, bse_listed, is_active)
                   VALUES (%s, %s, %s, %s, 'EQUITY', 1, 1)
                   ON CONFLICT (isin) DO NOTHING""",
                new_assets,
            )
            logger.info(f"Registered {len(new_assets)} new BSE assets")


def insert_bse_prices(df: pd.DataFrame, trade_date: date):
    """
    Insert BSE prices into the timeseries database. Only inserts for assets
    where NSE price is absent (BSE is secondary source).

    Optimized: resolves asset_ids via in-memory cache, checks NSE presence
    in bulk, then uses executemany for insertion.
    """
    date_str = trade_date.isoformat()

    with get_db() as meta_conn:
        isin_cache, code_cache = _build_bse_asset_cache(meta_conn)

    with get_prices_db() as conn:
        # Pre-fetch which asset_ids already have an NSE price for this date
        nse_present = set()
        nse_rows = conn.execute(
            "SELECT asset_id FROM daily_prices WHERE date = %s AND source_exchange = 'NSE'",
            (date_str,),
        ).fetchall()
        for r in nse_rows:
            nse_present.add(r["asset_id"])

        price_rows = []
        for _, row in df.iterrows():
            isin = _clean_bse_isin(row["isin"])
            bse_code = str(row.get("bse_code", "")).strip()

            # Resolve asset_id from cache
            asset_id = None
            if isin:
                asset_id = isin_cache.get(isin)
            if not asset_id and bse_code:
                asset_id = code_cache.get(bse_code)
            if not asset_id:
                continue

            # NSE takes priority for dual-listed stocks
            if asset_id in nse_present:
                continue

            price_rows.append((
                asset_id, date_str,
                row.get("open"), row.get("high"), row.get("low"),
                row["close"], row["close"],
                int(row.get("volume", 0) or 0),
                int(row.get("trades", 0) or 0),
            ))

        if price_rows:
            conn.executemany(
                """INSERT INTO daily_prices
                   (asset_id, date, open, high, low, close, adj_close, volume, trades, source_exchange)
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 'BSE')
                   ON CONFLICT (asset_id, date, source_exchange) DO UPDATE SET
                     open = EXCLUDED.open, high = EXCLUDED.high, low = EXCLUDED.low,
                     close = EXCLUDED.close, adj_close = EXCLUDED.adj_close,
                     volume = EXCLUDED.volume, trades = EXCLUDED.trades""",
                price_rows,
            )


def run_bse_bhavcopy_pipeline(trade_date: date = None):
    """Main BSE Bhavcopy pipeline entry point."""
    if trade_date is None:
        trade_date = date.today() - timedelta(days=1)

    ensure_holiday_cache()

    if not is_trading_day(trade_date):
        logger.info(f"{trade_date} is not a trading day, skipping BSE Bhavcopy pipeline")
        return

    run_id = generate_id()
    start_time = datetime.now(timezone.utc).replace(tzinfo=None)
    source = "BSE_BHAVCOPY"

    try:
        logger.info(f"[{source}] Starting pipeline for {trade_date}")

        content, filename = download_bse_bhavcopy(trade_date)
        df_raw = parse_bse_bhavcopy(content, filename)
        logger.info(f"[{source}] Parsed {len(df_raw)} rows from {filename}")

        df_clean, flagged = run_circuit_breakers(df_raw, trade_date)
        logger.info(f"[{source}] Circuit breakers: {len(flagged)} flagged, {len(df_clean)} clean")

        upsert_bse_assets(df_clean)
        insert_bse_prices(df_clean, trade_date)

        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)
        records_inserted = len(df_clean)

        with get_db() as conn:
            conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, records_inserted, records_skipped, circuit_breaks, duration_ms)
                   VALUES (%s, %s, %s, 'SUCCESS', %s, %s, %s, %s)""",
                (run_id, trade_date.isoformat(), source, records_inserted,
                 len(df_raw) - records_inserted, len(flagged), duration_ms),
            )

        logger.info(f"[{source}] ✅ Done. {records_inserted} inserted, {duration_ms}ms")
        alert_pipeline_success(source, records_inserted, len(flagged), duration_ms)

    except Exception as e:
        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)
        logger.error(f"[{source}] ❌ Pipeline failed: {e}", exc_info=True)
        with get_db() as conn:
            conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, error_log, duration_ms)
                   VALUES (%s, %s, %s, 'FAILED', %s, %s)""",
                (run_id, trade_date.isoformat(), source, str(e), duration_ms),
            )
        alert_pipeline_failure(source, str(e), trade_date.isoformat())
        raise


if __name__ == "__main__":
    import sys
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    run_date = date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else date.today() - timedelta(days=1)
    run_bse_bhavcopy_pipeline(run_date)
