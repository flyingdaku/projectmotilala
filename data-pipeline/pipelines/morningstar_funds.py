from __future__ import annotations

import argparse
import logging
import os
from datetime import date, timedelta
from typing import Optional

from core.db import get_connection
from sources.morningstar import MorningstarFundDetailsIngester, MorningstarFundDirectoryIngester
from sources.morningstar.schema import ensure_morningstar_schema_sqlite

logger = logging.getLogger(__name__)


def _env_flag(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def run_morningstar_directory_pipeline(trade_date: date) -> object:
    with get_connection() as conn:
        ensure_morningstar_schema_sqlite(conn.raw_connection)
        run = MorningstarFundDirectoryIngester().run(trade_date, conn)
        conn.execute(
            """
            INSERT INTO pipeline_runs (
              id, run_date, source, status, pipeline_type,
              records_inserted, records_skipped, circuit_breaks, error_log, duration_ms
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        ensure_morningstar_schema_sqlite(conn.raw_connection)
        run = MorningstarFundDetailsIngester(limit=limit).run(trade_date, conn)
        conn.execute(
            """
            INSERT INTO pipeline_runs (
              id, run_date, source, status, pipeline_type,
              records_inserted, records_skipped, circuit_breaks, error_log, duration_ms
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
