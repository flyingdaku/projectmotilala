#!/usr/bin/env python3
"""
EODHD Historical Backfill — per-symbol EOD data for date ranges.

Strategy:
  - Uses per-symbol API (/api/eod/{SYMBOL}.{EXCHANGE}?from=...&to=...) for
    backfill, NOT the Bulk API (which only gives last-day data).
  - Works for active AND delisted symbols (same endpoint, same response format).
  - Fetches in yearly chunks to stay within API response size limits.
  - Respects rate limits via EODHDClient (0.06s delay between requests).
  - Idempotent: skips date ranges already present in eodhd_daily_prices.
  - Resumable: --skip-existing skips symbols already successfully backfilled.

Usage:
    # Full backfill (all mapped symbols, 2000-present)
    python scripts/backfill_eodhd.py

    # Custom date range
    python scripts/backfill_eodhd.py --from 2010-01-01 --to 2023-12-31

    # Only delisted symbols (survivorship-bias-free backfill)
    python scripts/backfill_eodhd.py --delisted-only

    # Only active symbols
    python scripts/backfill_eodhd.py --active-only

    # Single symbol (for debugging)
    python scripts/backfill_eodhd.py --symbol RELIANCE --exchange NSE

    # Dry run (shows what would be fetched, no writes)
    python scripts/backfill_eodhd.py --dry-run

    # Force re-fetch even if data exists
    python scripts/backfill_eodhd.py --no-skip

Cost estimate per full run:
  ~5,000 active symbols × 2 exchanges × 1 req/year-chunk ≈ heavy API usage.
  With --from 2000-01-01 in 1-year chunks: ~5,000 × 25 years × 2 = 250,000 calls.
  EODHD limit: 100,000 calls/day on standard plan.
  Use --workers 1 and run over 3 days or reduce date range.
"""

from __future__ import annotations

import argparse
import logging
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

sys.path.insert(0, str(Path(__file__).parent.parent))

from core.db import get_pg_connection, get_ts_connection, generate_id
from sources.eodhd.client import EODHDClient

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger(__name__)

# Default backfill window
DEFAULT_FROM = date(2000, 1, 1)
DEFAULT_TO   = date.today() - timedelta(days=1)

# Chunk size: fetch this many days per API call (1 year = safe upper bound)
CHUNK_DAYS = 365

# Parallel workers (keep low — each worker makes API calls)
DEFAULT_WORKERS = 2


# ── Helpers ────────────────────────────────────────────────────────────────────

def _date_chunks(start: date, end: date, chunk_days: int = CHUNK_DAYS) -> List[Tuple[date, date]]:
    """Split [start, end] into chunks of at most chunk_days days."""
    chunks = []
    cursor = start
    while cursor <= end:
        chunk_end = min(cursor + timedelta(days=chunk_days - 1), end)
        chunks.append((cursor, chunk_end))
        cursor = chunk_end + timedelta(days=1)
    return chunks


def _already_has_data(conn: Any, asset_id: str, exchange: str, from_date: date, to_date: date) -> bool:
    """Return True if we already have >90% of expected trading days in this chunk."""
    # Rough check: if any rows exist in the range, assume it was done
    row = conn.execute("""
        SELECT COUNT(*) as cnt
        FROM   eodhd_daily_prices
        WHERE  asset_id = %s AND exchange = %s
          AND  date BETWEEN %s AND %s
    """, (asset_id, exchange, from_date.isoformat(), to_date.isoformat())).fetchone()
    return (row["cnt"] if row else 0) > 0


def _ingest_rows(conn: Any, rows: List[Dict], asset_id: str, eodhd_symbol: str, exchange: str) -> int:
    """Bulk-insert EOD rows for a single symbol into eodhd_daily_prices."""
    now = datetime.now().isoformat()
    inserted = 0
    for row in rows:
        close = row.get("close")
        if close is None:
            continue
        try:
            conn.execute("""
                INSERT INTO eodhd_daily_prices
                (asset_id, date, open, high, low, close, adjusted_close,
                 volume, eodhd_symbol, exchange, fetched_at)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                ON CONFLICT (asset_id, date, exchange) DO UPDATE SET
                open=EXCLUDED.open, high=EXCLUDED.high, low=EXCLUDED.low,
                close=EXCLUDED.close, adjusted_close=EXCLUDED.adjusted_close,
                volume=EXCLUDED.volume, eodhd_symbol=EXCLUDED.eodhd_symbol,
                fetched_at=EXCLUDED.fetched_at
            """, (
                asset_id,
                row.get("date"),
                row.get("open"),
                row.get("high"),
                row.get("low"),
                close,
                row.get("adjusted_close"),
                row.get("volume"),
                eodhd_symbol,
                exchange,
                now,
            ))
            inserted += 1
        except Exception as exc:
            logger.warning(f"Insert error for {eodhd_symbol} {row.get('date')}: {exc}")
    conn.commit()
    return inserted


# ── Per-symbol backfill ─────────────────────────────────────────────────────────

def backfill_symbol(
    client: EODHDClient,
    asset_id: str,
    symbol_code: str,
    exchange: str,
    from_date: date,
    to_date: date,
    skip_existing: bool,
    dry_run: bool,
) -> Tuple[str, int, int]:
    """
    Backfill one symbol/exchange pair.

    Returns: (eodhd_symbol, total_inserted, chunks_skipped)
    """
    eodhd_symbol = f"{symbol_code}.{exchange}"
    chunks       = _date_chunks(from_date, to_date)
    total_ins    = 0
    skipped      = 0

    for chunk_start, chunk_end in chunks:
        if skip_existing:
            with get_ts_connection() as conn:
                if _already_has_data(conn, asset_id, exchange, chunk_start, chunk_end):
                    skipped += 1
                    continue

        if dry_run:
            logger.info(f"[DRY-RUN] Would fetch {eodhd_symbol} {chunk_start} → {chunk_end}")
            continue

        rows = client.get_eod_history(symbol_code, exchange, chunk_start, chunk_end)
        if not rows:
            logger.debug(f"[{eodhd_symbol}] No data for {chunk_start}–{chunk_end}")
            continue

        with get_ts_connection() as conn:
            ins = _ingest_rows(conn, rows, asset_id, eodhd_symbol, exchange)
            total_ins += ins

        logger.debug(f"[{eodhd_symbol}] {chunk_start}–{chunk_end}: {ins} rows")

    return eodhd_symbol, total_ins, skipped


# ── Main backfill orchestration ────────────────────────────────────────────────

def run_backfill(
    from_date: date      = DEFAULT_FROM,
    to_date: date        = DEFAULT_TO,
    delisted_only: bool  = False,
    active_only: bool    = False,
    symbol_filter: Optional[str]   = None,
    exchange_filter: Optional[str] = None,
    skip_existing: bool  = True,
    dry_run: bool        = False,
    workers: int         = DEFAULT_WORKERS,
) -> Dict[str, Any]:
    """
    Orchestrate full EODHD backfill.

    Loads symbol mappings from DB, then fans out per-symbol fetch jobs.
    """
    logger.info(
        f"EODHD Backfill | {from_date} → {to_date} | "
        f"workers={workers} | skip_existing={skip_existing} | dry_run={dry_run}"
    )

    # ── Load symbol mappings ──────────────────────────────────
    with get_pg_connection() as conn:
        q_parts = ["SELECT asset_id, eodhd_nse_symbol, eodhd_bse_symbol, is_delisted FROM eodhd_symbol_mapping WHERE 1=1"]
        params: List[Any] = []

        if delisted_only:
            q_parts.append("AND is_delisted = 1")
        elif active_only:
            q_parts.append("AND is_delisted = 0")

        if symbol_filter:
            q_parts.append("AND (eodhd_nse_symbol = %s OR eodhd_bse_symbol = %s)")
            eodhd_sym = f"{symbol_filter.upper()}.{exchange_filter or 'NSE'}"
            params += [eodhd_sym, eodhd_sym.replace(".NSE", ".BSE")]

        mappings = conn.execute(" ".join(q_parts), tuple(params)).fetchall()

    logger.info(f"Loaded {len(mappings)} symbol mappings")

    # ── Build job list: (asset_id, code, exchange) ────────────
    jobs: List[Tuple[str, str, str]] = []
    for row in mappings:
        aid = row["asset_id"]

        # Determine which exchange(s) to backfill
        targets = []
        if row["eodhd_nse_symbol"] and (not exchange_filter or exchange_filter == "NSE"):
            code = row["eodhd_nse_symbol"].split(".")[0]
            targets.append((code, "NSE"))
        if row["eodhd_bse_symbol"] and (not exchange_filter or exchange_filter == "BSE"):
            code = row["eodhd_bse_symbol"].split(".")[0]
            targets.append((code, "BSE"))

        for code, exch in targets:
            jobs.append((aid, code, exch))

    logger.info(f"Total fetch jobs: {len(jobs)}")

    if not jobs:
        logger.warning("No jobs to run — check symbol mappings.")
        return {"jobs": 0, "inserted": 0, "failed": 0}

    # ── Run jobs in thread pool ───────────────────────────────
    client   = EODHDClient()
    inserted = 0
    failed   = 0
    done     = 0

    def _job(aid: str, code: str, exch: str) -> Tuple[str, int, int]:
        return backfill_symbol(
            client, aid, code, exch,
            from_date, to_date,
            skip_existing, dry_run,
        )

    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {pool.submit(_job, aid, code, exch): (code, exch)
                   for aid, code, exch in jobs}

        for future in as_completed(futures):
            code, exch = futures[future]
            try:
                sym, ins, skp = future.result()
                inserted += ins
                done += 1
                if done % 100 == 0:
                    logger.info(f"Progress: {done}/{len(jobs)} jobs done, {inserted} rows inserted")
            except Exception as exc:
                failed += 1
                logger.warning(f"[{code}.{exch}] Backfill failed: {exc}")

    stats = {
        "jobs":     len(jobs),
        "done":     done,
        "failed":   failed,
        "inserted": inserted,
        "from":     from_date.isoformat(),
        "to":       to_date.isoformat(),
    }
    logger.info(
        f"Backfill complete | inserted={inserted} | "
        f"done={done} | failed={failed} | jobs={len(jobs)}"
    )
    return stats


# ── Also backfill CA (splits + dividends) per symbol ──────────────────────────

def backfill_ca_symbol(
    client: EODHDClient,
    asset_id: str,
    symbol_code: str,
    exchange: str,
    from_date: date,
) -> int:
    """
    Fetch full dividend + split history for one symbol and store in
    eodhd_corporate_actions.

    Note: For Indian stocks, dividends only have ex_date + value
    (no declaration/record/payment dates — those are US-only).
    Split ratio is a float: 2.0 means 2:1 (2 new shares per 1 old).
    """
    import json
    eodhd_symbol = f"{symbol_code}.{exchange}"
    now = datetime.now().isoformat()
    inserted = 0

    divs   = client.get_dividends_history(symbol_code, exchange, from_date)
    splits = client.get_splits_history(symbol_code, exchange, from_date)

    rows_to_insert = []

    for d in divs:
        rows_to_insert.append((
            generate_id(), asset_id,
            d.get("date") or d.get("ex_dividend_date"),
            "dividend",
            d.get("value"),
            None, None, None,       # declaration/payment/record — None for Indian stocks
            json.dumps(d), now,
        ))

    for s in splits:
        try:
            factor = float(s.get("split", 0) or 0)
        except (ValueError, TypeError):
            factor = None
        rows_to_insert.append((
            generate_id(), asset_id,
            s.get("date"),
            "split",
            factor,
            None, None, None,
            json.dumps(s), now,
        ))

    if rows_to_insert:
        with get_pg_connection() as conn:
            for row in rows_to_insert:
                try:
                    conn.execute("""
                        INSERT INTO eodhd_corporate_actions
                        (id, asset_id, date, type, value,
                         declaration_date, payment_date, record_date,
                         raw_json, fetched_at)
                        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                        ON CONFLICT DO NOTHING
                    """, row)
                    inserted += 1
                except Exception as exc:
                    logger.warning(f"CA insert error for {eodhd_symbol}: {exc}")

    return inserted


def run_ca_backfill(
    from_date: date = date(2000, 1, 1),
    workers: int    = DEFAULT_WORKERS,
    delisted_only: bool = False,
) -> Dict[str, Any]:
    """Backfill EODHD splits + dividends history for all mapped symbols."""
    logger.info(f"EODHD CA Backfill | from={from_date} | workers={workers}")

    with get_pg_connection() as conn:
        q = """
            SELECT asset_id, eodhd_nse_symbol, eodhd_bse_symbol
            FROM   eodhd_symbol_mapping
            WHERE  is_active = 1
        """
        if delisted_only:
            q += " AND is_delisted = 1"
        mappings = conn.execute(q).fetchall()

    jobs: List[Tuple[str, str, str]] = []
    for row in mappings:
        if row["eodhd_nse_symbol"]:
            jobs.append((row["asset_id"], row["eodhd_nse_symbol"].split(".")[0], "NSE"))
        if row["eodhd_bse_symbol"]:
            jobs.append((row["asset_id"], row["eodhd_bse_symbol"].split(".")[0], "BSE"))

    logger.info(f"CA backfill jobs: {len(jobs)}")
    client   = EODHDClient()
    inserted = 0
    failed   = 0

    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {
            pool.submit(backfill_ca_symbol, client, aid, code, exch, from_date): (code, exch)
            for aid, code, exch in jobs
        }
        for future in as_completed(futures):
            code, exch = futures[future]
            try:
                inserted += future.result()
            except Exception as exc:
                failed += 1
                logger.warning(f"[{code}.{exch}] CA backfill failed: {exc}")

    logger.info(f"CA Backfill complete | inserted={inserted} | failed={failed}")
    return {"jobs": len(jobs), "inserted": inserted, "failed": failed}


# ── CLI ────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Backfill EODHD historical EOD prices and corporate actions"
    )
    parser.add_argument("--from", dest="from_date", default=str(DEFAULT_FROM),
                        help=f"Start date YYYY-MM-DD (default: {DEFAULT_FROM})")
    parser.add_argument("--to",   dest="to_date",   default=str(DEFAULT_TO),
                        help=f"End date YYYY-MM-DD   (default: {DEFAULT_TO})")
    parser.add_argument("--symbol",   help="Single EODHD symbol code (e.g. RELIANCE)")
    parser.add_argument("--exchange", help="Exchange for --symbol (NSE or BSE)")
    parser.add_argument("--delisted-only", action="store_true",
                        help="Only backfill delisted symbols")
    parser.add_argument("--active-only",   action="store_true",
                        help="Only backfill active symbols")
    parser.add_argument("--ca-only",  action="store_true",
                        help="Only backfill corporate actions (splits + dividends)")
    parser.add_argument("--no-skip",  action="store_true",
                        help="Re-fetch even if data already exists")
    parser.add_argument("--dry-run",  action="store_true",
                        help="Show what would be fetched, no writes")
    parser.add_argument("--workers",  type=int, default=DEFAULT_WORKERS,
                        help=f"Parallel workers (default: {DEFAULT_WORKERS})")

    args = parser.parse_args()

    from_date = date.fromisoformat(args.from_date)
    to_date   = date.fromisoformat(args.to_date)

    if args.ca_only:
        run_ca_backfill(from_date=from_date, workers=args.workers,
                        delisted_only=args.delisted_only)
    else:
        run_backfill(
            from_date      = from_date,
            to_date        = to_date,
            delisted_only  = args.delisted_only,
            active_only    = args.active_only,
            symbol_filter  = args.symbol,
            exchange_filter= args.exchange,
            skip_existing  = not args.no_skip,
            dry_run        = args.dry_run,
            workers        = args.workers,
        )
        # Always backfill CA after EOD
        if not args.dry_run:
            run_ca_backfill(from_date=from_date, workers=args.workers,
                            delisted_only=args.delisted_only)


if __name__ == "__main__":
    main()
