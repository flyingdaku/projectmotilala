from __future__ import annotations

import argparse
import logging
import os
import sys
from datetime import date, timedelta
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core.db import get_connection
from sources.morningstar import MorningstarFundDetailsIngester, MorningstarFundDirectoryIngester
from sources.morningstar.schema import ensure_morningstar_schema

logger = logging.getLogger(__name__)


def _env_flag(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def run_morningstar_directory_pipeline(trade_date: date) -> object:
    with get_connection() as conn:
        ensure_morningstar_schema(conn)
        run = MorningstarFundDirectoryIngester().run(trade_date, conn)
        conn.execute(
            """
            INSERT INTO pipeline_runs (
              id, run_date, source, status, pipeline_type,
              records_inserted, records_skipped, circuit_breaks, error_log, duration_ms
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT(id) DO UPDATE SET
              run_date = excluded.run_date,
              source = excluded.source,
              status = excluded.status,
              pipeline_type = excluded.pipeline_type,
              records_inserted = excluded.records_inserted,
              records_skipped = excluded.records_skipped,
              circuit_breaks = excluded.circuit_breaks,
              error_log = excluded.error_log,
              duration_ms = excluded.duration_ms
            """,
            (
                run.id,
                run.run_date,
                run.source,
                run.status,
                run.pipeline_type,
                run.records_inserted,
                run.records_skipped,
                run.circuit_breaks,
                run.error_log,
                run.duration_ms,
            ),
        )
        logger.info("[MORNINGSTAR] directory status=%s inserted=%s", run.status, run.records_inserted)
        return run


def run_morningstar_detail_pipeline(trade_date: date, limit: Optional[int] = None) -> object:
    with get_connection() as conn:
        ensure_morningstar_schema(conn)
        run = MorningstarFundDetailsIngester(limit=limit).run(trade_date, conn)
        conn.execute(
            """
            INSERT INTO pipeline_runs (
              id, run_date, source, status, pipeline_type,
              records_inserted, records_skipped, circuit_breaks, error_log, duration_ms
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT(id) DO UPDATE SET
              run_date = excluded.run_date,
              source = excluded.source,
              status = excluded.status,
              pipeline_type = excluded.pipeline_type,
              records_inserted = excluded.records_inserted,
              records_skipped = excluded.records_skipped,
              circuit_breaks = excluded.circuit_breaks,
              error_log = excluded.error_log,
              duration_ms = excluded.duration_ms
            """,
            (
                run.id,
                run.run_date,
                run.source,
                run.status,
                run.pipeline_type,
                run.records_inserted,
                run.records_skipped,
                run.circuit_breaks,
                run.error_log,
                run.duration_ms,
            ),
        )
        logger.info("[MORNINGSTAR] details status=%s inserted=%s", run.status, run.records_inserted)
        return run


def run_morningstar_funds_pipeline(trade_date: date, detail_limit: Optional[int] = None):
    directory_run = run_morningstar_directory_pipeline(trade_date)
    detail_run = run_morningstar_detail_pipeline(trade_date, limit=detail_limit)
    return directory_run, detail_run


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    parser = argparse.ArgumentParser(description="Run Morningstar India public mutual fund ingestion")
    parser.add_argument("date", nargs="?", default=(date.today() - timedelta(days=1)).isoformat())
    parser.add_argument("--directory-only", action="store_true")
    parser.add_argument("--detail-only", action="store_true")
    parser.add_argument("--limit", type=int, default=None)
    args = parser.parse_args()

    trade_date = date.fromisoformat(args.date)
    if args.directory_only and args.detail_only:
        raise SystemExit("Use only one of --directory-only or --detail-only")

    if args.directory_only:
        run_morningstar_directory_pipeline(trade_date)
    elif args.detail_only:
        run_morningstar_detail_pipeline(trade_date, limit=args.limit)
    else:
        run_morningstar_funds_pipeline(trade_date, detail_limit=args.limit)
