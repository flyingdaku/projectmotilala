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
from utils.db import generate_id, get_db
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
    Download BSE Bhavcopy ZIP.
    URL format: https://www.bseindia.com/download/BhavCopy/Equity/EQ{DD}{MM}{YY}_CSV.zip
    """
    filename = f"EQ{trade_date.strftime('%d%m%y')}_CSV.zip"
    url = f"https://www.bseindia.com/download/BhavCopy/Equity/{filename}"

    if raw_file_exists("BSE_BHAVCOPY", trade_date, filename):
        logger.info(f"Using cached raw file: {filename}")
        return load_raw_file("BSE_BHAVCOPY", trade_date, filename), filename

    content = _download_with_retry(url)
    if content is None:
        raise RuntimeError(f"BSE Bhavcopy not available for {trade_date} (404)")

    save_raw_file("BSE_BHAVCOPY", trade_date, filename, content)
    return content, filename


def parse_bse_bhavcopy(content: bytes, filename: str) -> pd.DataFrame:
    """
    Parse BSE Bhavcopy ZIP into a normalized DataFrame.
    BSE CSV columns: CODE, NAME, OPEN, HIGH, LOW, CLOSE, TOTTRDQTY, ISIN
    """
    with zipfile.ZipFile(io.BytesIO(content)) as z:
        csv_name = next((n for n in z.namelist() if n.endswith(".CSV") or n.endswith(".csv")), None)
        if not csv_name:
            raise ValueError(f"No CSV found inside {filename}")
        df = pd.read_csv(z.open(csv_name))

    df.columns = df.columns.str.strip()

    # BSE column mapping — handle both old and new naming conventions
    rename_map = {
        "CODE": "bse_code", "SC_CODE": "bse_code",
        "NAME": "name", "SC_NAME": "name",
        "OPEN": "open", "PREVCLOSE": "prev_close",
        "HIGH": "high", "LOW": "low", "CLOSE": "close",
        "TOTTRDQTY": "volume",    # old format
        "NO_OF_SHRS": "volume",   # new format (shares traded)
        "NET_TURNOV": "turnover",
        "NO_TRADES": "trades",
        "ISIN": "isin", "ISIN_CODE": "isin",
    }
    df = df.rename(columns={k: v for k, v in rename_map.items() if k in df.columns})

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


def upsert_bse_assets(df: pd.DataFrame):
    """Create or update assets with BSE data. Links BSE code to existing ISIN if present."""
    with get_db() as conn:
        for _, row in df.iterrows():
            isin = row["isin"] if row["isin"] not in (None, "nan", "") else None
            bse_code = str(row.get("bse_code", "")).strip()
            name = str(row.get("name", bse_code)).strip()

            # Try ISIN lookup first, then bse_code
            existing = None
            if isin:
                existing = conn.execute(
                    "SELECT id FROM assets WHERE isin = ?", (isin,)
                ).fetchone()
            if not existing and bse_code:
                existing = conn.execute(
                    "SELECT id FROM assets WHERE bse_code = ?", (bse_code,)
                ).fetchone()

            if existing:
                # Update bse_code, backfill ISIN if we now have it
                if isin:
                    conn.execute(
                        "UPDATE assets SET bse_code = ?, bse_listed = 1, isin = COALESCE(isin, ?) WHERE id = ?",
                        (bse_code, isin, existing["id"]),
                    )
                else:
                    conn.execute(
                        "UPDATE assets SET bse_code = ?, bse_listed = 1 WHERE id = ?",
                        (bse_code, existing["id"]),
                    )
            else:
                asset_id = generate_id()
                conn.execute(
                    """INSERT INTO assets
                       (id, isin, bse_code, name, asset_class, bse_listed, is_active)
                       VALUES (?, ?, ?, ?, 'EQUITY', 1, 1)""",
                    (asset_id, isin, bse_code, name),
                )


def insert_bse_prices(df: pd.DataFrame, trade_date: date):
    """
    Insert BSE prices. Only inserts for assets where NSE price is absent
    (BSE is secondary source; NSE takes priority for dual-listed stocks).
    """
    date_str = trade_date.isoformat()

    with get_db() as conn:
        for _, row in df.iterrows():
            isin = row["isin"] if row["isin"] not in (None, "nan", "") else None
            bse_code = str(row.get("bse_code", "")).strip()

            # Resolve asset_id — ISIN first, then bse_code
            asset = None
            if isin:
                asset = conn.execute(
                    "SELECT id FROM assets WHERE isin = ?", (isin,)
                ).fetchone()
            if not asset and bse_code:
                asset = conn.execute(
                    "SELECT id FROM assets WHERE bse_code = ?", (bse_code,)
                ).fetchone()
            if not asset:
                continue

            asset_id = asset["id"]

            # NSE takes priority for dual-listed stocks
            nse_price = conn.execute(
                """SELECT 1 FROM daily_prices
                   WHERE asset_id = ? AND date = ? AND source_exchange = 'NSE'""",
                (asset_id, date_str),
            ).fetchone()
            if nse_price:
                continue

            conn.execute(
                """INSERT OR REPLACE INTO daily_prices
                   (asset_id, date, open, high, low, close, adj_close, volume, trades, source_exchange)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'BSE')""",
                (
                    asset_id, date_str,
                    row.get("open"), row.get("high"), row.get("low"),
                    row["close"], row["close"],
                    int(row.get("volume", 0) or 0),
                    int(row.get("trades", 0) or 0),
                ),
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
                   VALUES (?, ?, ?, 'SUCCESS', ?, ?, ?, ?)""",
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
                   VALUES (?, ?, ?, 'FAILED', ?, ?)""",
                (run_id, trade_date.isoformat(), source, str(e), duration_ms),
            )
        alert_pipeline_failure(source, str(e), trade_date.isoformat())
        raise


if __name__ == "__main__":
    import sys
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    run_date = date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else date.today() - timedelta(days=1)
    run_bse_bhavcopy_pipeline(run_date)
