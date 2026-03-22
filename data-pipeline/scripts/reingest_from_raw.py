"""
reingest_from_raw.py — Re-ingest all historical bhavcopy data from raw ZIP archives.

Reads from raw_data/NSE_BHAVCOPY/**/*.zip and raw_data/BSE_BHAVCOPY/**/*.zip,
parses them, and bulk-upserts into the timeseries DB (daily_prices table).
Asset resolution uses the relational DB (assets table).

Usage:
    python scripts/reingest_from_raw.py --source nse --start 2007-01-01 --end 2024-12-31
    python scripts/reingest_from_raw.py --source bse --start 2010-01-01
    python scripts/reingest_from_raw.py --source both
    python scripts/reingest_from_raw.py --source nse --workers 4 --skip-existing

Options:
    --source        nse | bse | both  (default: both)
    --start         Start date (YYYY-MM-DD), default: 2007-01-01
    --end           End date (YYYY-MM-DD), default: today
    --workers       Parallel worker count (default: 4)
    --skip-existing Skip dates that already have pipeline_runs SUCCESS entries
    --dry-run       Parse files but do not write to DB
"""
import argparse
import io
import logging
import os
import re
import sys
import zipfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional, Tuple

import pandas as pd

sys.path.insert(0, str(Path(__file__).parent.parent))

from core.db import generate_id, get_pg_connection, get_ts_connection

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)
logger = logging.getLogger(__name__)

RAW_BASE = Path(__file__).parent.parent / "raw_data"
NSE_DIR = RAW_BASE / "NSE_BHAVCOPY"
BSE_DIR = RAW_BASE / "BSE_BHAVCOPY"

NSE_VALID_SERIES = {"EQ", "BE", "BZ", "SM", "ST"}
BSE_EQUITY_GROUPS = {"A", "B", "T", "XT", "Z", "ZP", "IF", "IP"}


# ─── ASSET CACHE ──────────────────────────────────────────────────────────────

def build_asset_caches() -> Tuple[Dict[str, str], Dict[str, str], Dict[str, str]]:
    """Load ISIN→id, NSE symbol→id, BSE code→id from relational DB."""
    with get_pg_connection() as conn:
        rows = conn.execute(
            "SELECT id, isin, nse_symbol, bse_code FROM assets WHERE is_active = 1"
        ).fetchall()

    isin_map: Dict[str, str] = {}
    symbol_map: Dict[str, str] = {}
    code_map: Dict[str, str] = {}

    for r in rows:
        if r["isin"]:
            isin_map[str(r["isin"]).strip()] = r["id"]
        if r["nse_symbol"]:
            symbol_map[str(r["nse_symbol"]).strip()] = r["id"]
        if r["bse_code"]:
            code_map[str(r["bse_code"]).strip()] = r["id"]

    logger.info(
        f"Asset caches built: {len(isin_map)} ISINs, "
        f"{len(symbol_map)} NSE symbols, {len(code_map)} BSE codes"
    )
    return isin_map, symbol_map, code_map


# ─── DATE EXTRACTION FROM FILENAME ────────────────────────────────────────────

def _date_from_nse_path(path: Path) -> Optional[date]:
    """
    Extract trade date from NSE bhavcopy filename.
    Patterns:
      BhavCopy_NSE_CM_0_0_0_YYYYMMDD_F.csv.zip  → new (2024+)
      cmDDMMMYYYYbhav.csv.zip                     → legacy
    """
    name = path.name
    # New format: contains 8-digit date
    m = re.search(r"(\d{8})", name)
    if m:
        try:
            return datetime.strptime(m.group(1), "%Y%m%d").date()
        except ValueError:
            pass
    # Legacy: cmDDMMMYYYY
    m = re.search(r"cm(\d{2})([A-Z]{3})(\d{4})", name, re.IGNORECASE)
    if m:
        try:
            return datetime.strptime(f"{m.group(1)}{m.group(2)}{m.group(3)}", "%d%b%Y").date()
        except ValueError:
            pass
    return None


def _date_from_bse_path(path: Path) -> Optional[date]:
    """
    Extract trade date from BSE bhavcopy filename.
    Patterns:
      BhavCopy_BSE_CM_0_0_0_YYYYMMDD_F_0000.CSV (new 2024+, stored as .zip)
      EQ{DDMMYY}_CSV.zip  (legacy)
    """
    name = path.name
    # New format: 8-digit date
    m = re.search(r"(\d{8})", name)
    if m:
        try:
            return datetime.strptime(m.group(1), "%Y%m%d").date()
        except ValueError:
            pass
    # Legacy EQ{DDMMYY}
    m = re.match(r"EQ(\d{6})", name, re.IGNORECASE)
    if m:
        try:
            return datetime.strptime(m.group(1), "%d%m%y").date()
        except ValueError:
            pass
    return None


# ─── NSE PARSING ──────────────────────────────────────────────────────────────

def parse_nse_zip(filepath: Path, trade_date: date) -> Optional[pd.DataFrame]:
    """
    Parse NSE bhavcopy ZIP → DataFrame with columns:
      date, isin, symbol, series, open, high, low, close, volume, trades
    """
    try:
        with zipfile.ZipFile(filepath) as z:
            csv_name = next(
                (n for n in z.namelist() if n.lower().endswith(".csv")), None
            )
            if not csv_name:
                return None
            df = pd.read_csv(z.open(csv_name), low_memory=False)
    except Exception as e:
        logger.debug(f"NSE ZIP read error {filepath.name}: {e}")
        return None

    df.columns = df.columns.str.strip()
    cols = set(df.columns)

    # New format (2024+): TckrSymb, TradDt, SctySrs, ISIN, OpnPric…
    if "TckrSymb" in cols:
        rename = {
            "TradDt": "date", "TckrSymb": "symbol", "SctySrs": "series",
            "ISIN": "isin", "OpnPric": "open", "HghPric": "high",
            "LwPric": "low", "ClsPric": "close",
            "TtlTradgVol": "volume", "TtlNbOfTxsExctd": "trades",
        }
    else:
        # Legacy / mid formats
        rename = {
            "TIMESTAMP": "date", "SYMBOL": "symbol", "SERIES": "series",
            "OPEN": "open", "HIGH": "high", "LOW": "low", "CLOSE": "close",
            "TOTTRDQTY": "volume",
        }
        if "ISIN" in cols:
            rename["ISIN"] = "isin"
        if "TOTALTRADES" in cols:
            rename["TOTALTRADES"] = "trades"

    df = df.rename(columns={k: v for k, v in rename.items() if k in df.columns})

    if "isin" not in df.columns:
        df["isin"] = None
    if "trades" not in df.columns:
        df["trades"] = 0
    if "series" not in df.columns:
        df["series"] = "EQ"

    # Series filter
    df["series"] = df["series"].astype(str).str.strip().str.upper()
    df = df[df["series"].isin(NSE_VALID_SERIES)].copy()

    if df.empty:
        return None

    # Normalise date
    try:
        df["date"] = pd.to_datetime(df["date"]).dt.strftime("%Y-%m-%d")
    except Exception:
        df["date"] = trade_date.isoformat()

    for col in ("open", "high", "low", "close", "volume", "trades"):
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    df = df.dropna(subset=["close"])
    return df


# ─── BSE PARSING ──────────────────────────────────────────────────────────────

def parse_bse_zip(filepath: Path, trade_date: date) -> Optional[pd.DataFrame]:
    """
    Parse BSE bhavcopy ZIP → DataFrame with columns:
      date, isin, bse_code, open, high, low, close, volume, trades
    """
    try:
        with zipfile.ZipFile(filepath) as z:
            csv_name = next(
                (n for n in z.namelist() if n.lower().endswith(".csv")), None
            )
            if not csv_name:
                return None
            raw = z.read(csv_name)
    except Exception as e:
        logger.debug(f"BSE ZIP read error {filepath.name}: {e}")
        return None

    # Detect and skip HTML error pages (BSE returns 200 + HTML on missing dates)
    if raw[:100].lstrip().startswith(b"<"):
        return None

    try:
        df = pd.read_csv(io.BytesIO(raw), low_memory=False)
    except Exception as e:
        logger.debug(f"BSE CSV parse error {filepath.name}: {e}")
        return None

    df.columns = df.columns.str.strip()
    cols = set(df.columns)

    rename = {}
    for old, new in [
        ("SC_CODE", "bse_code"), ("CODE", "bse_code"), ("FinInstrmId", "bse_code"),
        ("ISIN_NO", "isin"), ("ISIN", "isin"), ("ISIN_CODE", "isin"),
        ("OPEN", "open"), ("OpnPric", "open"),
        ("HIGH", "high"), ("HghPric", "high"),
        ("LOW", "low"), ("LwPric", "low"),
        ("CLOSE", "close"), ("ClsPric", "close"),
        ("NO_OF_SHRS", "volume"), ("TOTTRDQTY", "volume"), ("TtlTradgVol", "volume"),
        ("NO_TRADES", "trades"), ("TtlNbOfTxsExctd", "trades"),
        ("SC_GROUP", "group"), ("GrpId", "group"),
        ("TradDt", "date"),
    ]:
        if old in cols and new not in df.columns:
            rename[old] = new

    df = df.rename(columns=rename)

    if "isin" not in df.columns:
        df["isin"] = None
    if "trades" not in df.columns:
        df["trades"] = 0
    if "bse_code" not in df.columns:
        return None

    # Date normalisation
    if "date" in df.columns:
        try:
            df["date"] = pd.to_datetime(df["date"]).dt.strftime("%Y-%m-%d")
        except Exception:
            df["date"] = trade_date.isoformat()
    else:
        # Extract from filename
        fname = filepath.name
        m = re.match(r"EQ(\d{6})", fname, re.IGNORECASE)
        if m:
            try:
                df["date"] = datetime.strptime(m.group(1), "%d%m%y").strftime("%Y-%m-%d")
            except ValueError:
                df["date"] = trade_date.isoformat()
        else:
            df["date"] = trade_date.isoformat()

    df["bse_code"] = df["bse_code"].astype(str).str.strip()

    for col in ("open", "high", "low", "close", "volume", "trades"):
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    df = df.dropna(subset=["close"])
    df = df[df["close"] > 0]
    return df


# ─── SINGLE-FILE INGEST ────────────────────────────────────────────────────────

def _ingest_nse_file(
    filepath: Path,
    trade_date: date,
    isin_cache: Dict[str, str],
    symbol_cache: Dict[str, str],
    dry_run: bool,
) -> Tuple[int, int]:
    """Parse one NSE ZIP and upsert into timeseries DB. Returns (inserted, skipped)."""
    df = parse_nse_zip(filepath, trade_date)
    if df is None or df.empty:
        return 0, 0

    rows = []
    skipped = 0
    for _, row in df.iterrows():
        isin = str(row["isin"]).strip() if pd.notnull(row.get("isin")) else None
        symbol = str(row.get("symbol", "")).strip() or None

        asset_id = (isin_cache.get(isin) if isin else None) or symbol_cache.get(symbol or "")
        if not asset_id:
            skipped += 1
            continue

        rows.append((
            asset_id,
            str(row["date"]),
            float(row["open"]) if pd.notnull(row.get("open")) else None,
            float(row["high"]) if pd.notnull(row.get("high")) else None,
            float(row["low"]) if pd.notnull(row.get("low")) else None,
            float(row["close"]),
            float(row["close"]),  # adj_close = close initially
            int(row.get("volume") or 0),
            int(row.get("trades") or 0),
            "NSE",
        ))

    if dry_run or not rows:
        return len(rows), skipped

    with get_ts_connection() as conn:
        conn.executemany(
            """INSERT INTO daily_prices
               (asset_id, date, open, high, low, close, adj_close, volume, trades, source_exchange)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
               ON CONFLICT (asset_id, date, source_exchange) DO NOTHING""",
            rows,
        )

    return len(rows), skipped


def _ingest_bse_file(
    filepath: Path,
    trade_date: date,
    isin_cache: Dict[str, str],
    code_cache: Dict[str, str],
    nse_dates: Optional[set],
    dry_run: bool,
) -> Tuple[int, int]:
    """Parse one BSE ZIP and upsert into timeseries DB. Returns (inserted, skipped)."""
    df = parse_bse_zip(filepath, trade_date)
    if df is None or df.empty:
        return 0, 0

    rows = []
    skipped = 0
    for _, row in df.iterrows():
        isin = str(row["isin"]).strip() if pd.notnull(row.get("isin")) else None
        bse_code = str(row.get("bse_code", "")).strip() or None

        asset_id = (isin_cache.get(isin) if isin else None) or code_cache.get(bse_code or "")
        if not asset_id:
            skipped += 1
            continue

        # Skip dual-listed stocks on dates NSE already covered
        if nse_dates and (asset_id, str(row["date"])) in nse_dates:
            skipped += 1
            continue

        rows.append((
            asset_id,
            str(row["date"]),
            float(row["open"]) if pd.notnull(row.get("open")) else None,
            float(row["high"]) if pd.notnull(row.get("high")) else None,
            float(row["low"]) if pd.notnull(row.get("low")) else None,
            float(row["close"]),
            float(row["close"]),
            int(row.get("volume") or 0),
            int(row.get("trades") or 0),
            "BSE",
        ))

    if dry_run or not rows:
        return len(rows), skipped

    with get_ts_connection() as conn:
        conn.executemany(
            """INSERT INTO daily_prices
               (asset_id, date, open, high, low, close, adj_close, volume, trades, source_exchange)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
               ON CONFLICT (asset_id, date, source_exchange) DO NOTHING""",
            rows,
        )

    return len(rows), skipped


# ─── COLLECT FILES IN DATE RANGE ──────────────────────────────────────────────

def collect_nse_files(start: date, end: date) -> List[Tuple[Path, date]]:
    """Return (path, trade_date) for all NSE ZIPs within [start, end]."""
    result = []
    for filepath in sorted(NSE_DIR.rglob("*.zip")):
        td = _date_from_nse_path(filepath)
        if td and start <= td <= end:
            result.append((filepath, td))
    logger.info(f"Found {len(result)} NSE files in [{start}, {end}]")
    return result


def collect_bse_files(start: date, end: date) -> List[Tuple[Path, date]]:
    """Return (path, trade_date) for all BSE ZIPs within [start, end]."""
    result = []
    for filepath in sorted(BSE_DIR.rglob("*.zip")):
        td = _date_from_bse_path(filepath)
        if td and start <= td <= end:
            result.append((filepath, td))
    logger.info(f"Found {len(result)} BSE files in [{start}, {end}]")
    return result


# ─── ALREADY-INGESTED CHECK ───────────────────────────────────────────────────

def get_already_ingested(source: str, start: date, end: date) -> set:
    """Return set of date strings that already have a SUCCESS pipeline_run."""
    with get_pg_connection() as conn:
        rows = conn.execute(
            """SELECT run_date FROM pipeline_runs
               WHERE source = %s AND status = 'SUCCESS'
               AND run_date BETWEEN %s AND %s""",
            (source, start.isoformat(), end.isoformat()),
        ).fetchall()
    return {str(r["run_date"]) for r in rows}


def _log_pipeline_run(source: str, run_date: date, inserted: int, skipped: int, duration_ms: int, error: Optional[str] = None):
    status = "SUCCESS" if error is None else "FAILED"
    with get_pg_connection() as conn:
        conn.execute(
            """INSERT INTO pipeline_runs
               (id, run_date, pipeline_type, source, status, records_inserted,
                records_skipped, error_log, duration_ms)
               VALUES (%s, %s, 'BACKFILL', %s, %s, %s, %s, %s, %s)
               ON CONFLICT DO NOTHING""",
            (generate_id(), run_date.isoformat(), source, status,
             inserted, skipped, error, duration_ms),
        )


# ─── NSE FULL RUN ─────────────────────────────────────────────────────────────

def reingest_nse(
    start: date,
    end: date,
    workers: int = 4,
    skip_existing: bool = False,
    dry_run: bool = False,
):
    files = collect_nse_files(start, end)
    if not files:
        logger.warning("No NSE files found — check raw_data/NSE_BHAVCOPY/")
        return

    already_done: set = set()
    if skip_existing:
        already_done = get_already_ingested("NSE_BHAVCOPY_REINGEST", start, end)
        logger.info(f"Skip-existing: {len(already_done)} dates already ingested")

    isin_cache, symbol_cache, _ = build_asset_caches()

    total_inserted = 0
    total_skipped = 0
    success = 0
    failed = 0

    def _process(item: Tuple[Path, date]):
        filepath, td = item
        if td.isoformat() in already_done:
            return td, 0, 0, "skipped"
        t0 = datetime.utcnow()
        try:
            ins, skp = _ingest_nse_file(filepath, td, isin_cache, symbol_cache, dry_run)
            ms = int((datetime.utcnow() - t0).total_seconds() * 1000)
            if not dry_run:
                _log_pipeline_run("NSE_BHAVCOPY_REINGEST", td, ins, skp, ms)
            return td, ins, skp, None
        except Exception as e:
            ms = int((datetime.utcnow() - t0).total_seconds() * 1000)
            if not dry_run:
                _log_pipeline_run("NSE_BHAVCOPY_REINGEST", td, 0, 0, ms, error=str(e))
            return td, 0, 0, str(e)

    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {pool.submit(_process, item): item for item in files}
        completed = 0
        for future in as_completed(futures):
            td, ins, skp, err = future.result()
            completed += 1
            if err == "skipped":
                pass
            elif err:
                failed += 1
                logger.warning(f"NSE {td} ❌ — {err}")
            else:
                success += 1
                total_inserted += ins
                total_skipped += skp

            if completed % 50 == 0 or completed == len(files):
                logger.info(
                    f"NSE progress: {completed}/{len(files)} files | "
                    f"{total_inserted} rows inserted | {failed} errors"
                )

    logger.info(
        f"NSE reingest complete: {success} ok, {failed} failed, "
        f"{total_inserted} rows inserted, {total_skipped} skipped (no asset match)"
    )


# ─── BSE FULL RUN ─────────────────────────────────────────────────────────────

def reingest_bse(
    start: date,
    end: date,
    workers: int = 4,
    skip_existing: bool = False,
    dry_run: bool = False,
):
    files = collect_bse_files(start, end)
    if not files:
        logger.warning("No BSE files found — check raw_data/BSE_BHAVCOPY/")
        return

    already_done: set = set()
    if skip_existing:
        already_done = get_already_ingested("BSE_BHAVCOPY_REINGEST", start, end)
        logger.info(f"Skip-existing: {len(already_done)} dates already ingested")

    isin_cache, _, code_cache = build_asset_caches()

    total_inserted = 0
    total_skipped = 0
    success = 0
    failed = 0

    def _process(item: Tuple[Path, date]):
        filepath, td = item
        if td.isoformat() in already_done:
            return td, 0, 0, "skipped"
        t0 = datetime.utcnow()
        try:
            ins, skp = _ingest_bse_file(filepath, td, isin_cache, code_cache, None, dry_run)
            ms = int((datetime.utcnow() - t0).total_seconds() * 1000)
            if not dry_run:
                _log_pipeline_run("BSE_BHAVCOPY_REINGEST", td, ins, skp, ms)
            return td, ins, skp, None
        except Exception as e:
            ms = int((datetime.utcnow() - t0).total_seconds() * 1000)
            if not dry_run:
                _log_pipeline_run("BSE_BHAVCOPY_REINGEST", td, 0, 0, ms, error=str(e))
            return td, 0, 0, str(e)

    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {pool.submit(_process, item): item for item in files}
        completed = 0
        for future in as_completed(futures):
            td, ins, skp, err = future.result()
            completed += 1
            if err == "skipped":
                pass
            elif err:
                failed += 1
                logger.warning(f"BSE {td} ❌ — {err}")
            else:
                success += 1
                total_inserted += ins
                total_skipped += skp

            if completed % 50 == 0 or completed == len(files):
                logger.info(
                    f"BSE progress: {completed}/{len(files)} files | "
                    f"{total_inserted} rows inserted | {failed} errors"
                )

    logger.info(
        f"BSE reingest complete: {success} ok, {failed} failed, "
        f"{total_inserted} rows inserted, {total_skipped} skipped (no asset match)"
    )


# ─── ENTRY POINT ──────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Re-ingest historical bhavcopy data from raw ZIP archives into timeseries DB."
    )
    parser.add_argument(
        "--source", choices=["nse", "bse", "both"], default="both",
        help="Which exchange to reingest (default: both)",
    )
    parser.add_argument(
        "--start", default="2007-01-01",
        help="Start date YYYY-MM-DD (default: 2007-01-01)",
    )
    parser.add_argument(
        "--end", default=date.today().isoformat(),
        help="End date YYYY-MM-DD (default: today)",
    )
    parser.add_argument(
        "--workers", type=int, default=4,
        help="Parallel worker threads (default: 4)",
    )
    parser.add_argument(
        "--skip-existing", action="store_true",
        help="Skip dates with existing SUCCESS pipeline_runs entries",
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Parse and count rows but do not write to DB",
    )
    args = parser.parse_args()

    start = date.fromisoformat(args.start)
    end = date.fromisoformat(args.end)

    if args.dry_run:
        logger.info("DRY RUN — no data will be written")

    logger.info(f"Reingest: source={args.source} | {start} → {end} | workers={args.workers}")

    if args.source in ("nse", "both"):
        reingest_nse(start, end, args.workers, args.skip_existing, args.dry_run)

    if args.source in ("bse", "both"):
        reingest_bse(start, end, args.workers, args.skip_existing, args.dry_run)

    logger.info("All done.")


if __name__ == "__main__":
    main()
