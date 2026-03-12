#!/usr/bin/env python3
"""
EODHD End-of-Day price ingester — uses Bulk API for efficiency.

Daily flow:
  1. One HTTP request per exchange (NSE, BSE) via Bulk API → full exchange in seconds.
     Cost: 100 API calls per exchange (not per ticker).
  2. Resolve each returned ticker to our internal asset_id via eodhd_symbol_mapping.
  3. Store in eodhd_daily_prices (supplementary — never overwrites NSE/BSE tables).

OHLC note: EODHD OHLC fields are RAW (unadjusted).
           adjusted_close is adjusted for both splits AND dividends.
           volume is split-adjusted only.
"""

from __future__ import annotations

import logging
from datetime import date, datetime
from typing import Any, Dict, List

from core.db import DatabaseConnection, generate_id
from core.registry import SourceIngester, register_source
from sources.eodhd.client import EODHDClient, INDIAN_EXCHANGES

logger = logging.getLogger(__name__)


@register_source
class EODHDEODIngester(SourceIngester):
    """
    EODHD daily price ingester using the Bulk EOD API.

    Uses 2 HTTP requests per day (one per exchange: NSE + BSE) instead of
    one request per symbol (~5,000 requests). Cost: 200 API calls/day total.
    """

    SOURCE_ID     = "EODHD_EOD"
    PIPELINE_TYPE = "DAILY"

    def __init__(self):
        self.client = EODHDClient()

    # ── Fetch ──────────────────────────────────────────────────

    def fetch(self, trade_date: date) -> List[Dict[str, Any]]:
        """
        Fetch bulk EOD data for all Indian exchanges.

        Builds a code→asset_id lookup from eodhd_symbol_mapping so we can
        map EODHD tickers to internal asset IDs without extra DB queries.
        """
        from core.db import get_connection

        logger.info(f"[EODHD_EOD] Fetching bulk EOD for {trade_date} — exchanges: {INDIAN_EXCHANGES}")

        # Build lookup: (code_upper, exchange) → asset_id
        with get_connection() as conn:
            rows = conn.execute("""
                SELECT asset_id,
                       eodhd_nse_symbol,
                       eodhd_bse_symbol
                FROM   eodhd_symbol_mapping
                WHERE  is_active = 1
            """).fetchall()

        # e.g. ("RELIANCE", "NSE") → "abc123"
        lookup: Dict[tuple, str] = {}
        for row in rows:
            aid = row["asset_id"]
            if row["eodhd_nse_symbol"]:
                code = row["eodhd_nse_symbol"].split(".")[0].upper()
                lookup[(code, "NSE")] = aid
            if row["eodhd_bse_symbol"]:
                code = row["eodhd_bse_symbol"].split(".")[0].upper()
                lookup[(code, "BSE")] = aid

        logger.info(f"[EODHD_EOD] Symbol lookup built: {len(lookup)} entries")

        records: List[Dict[str, Any]] = []

        for exchange in INDIAN_EXCHANGES:
            bulk = self.client.get_bulk_eod(exchange, trade_date)
            if not bulk:
                logger.warning(f"[EODHD_EOD] No bulk data returned for {exchange} on {trade_date}")
                continue

            matched = 0
            unmatched = 0
            for row in bulk:
                code      = (row.get("code") or "").upper()
                asset_id  = lookup.get((code, exchange))
                if not asset_id:
                    unmatched += 1
                    continue

                close = row.get("close")
                if close is None:
                    continue  # skip rows with no price

                records.append({
                    "asset_id":      asset_id,
                    "date":          trade_date.isoformat(),
                    "open":          row.get("open"),
                    "high":          row.get("high"),
                    "low":           row.get("low"),
                    "close":         close,
                    "adjusted_close": row.get("adjusted_close"),
                    "volume":        row.get("volume"),
                    "eodhd_symbol":  f"{code}.{exchange}",
                    "exchange":      exchange,
                })
                matched += 1

            logger.info(
                f"[EODHD_EOD] {exchange}: {len(bulk)} rows from API → "
                f"{matched} matched, {unmatched} unmapped"
            )

        return records

    # ── Ingest ─────────────────────────────────────────────────

    def ingest(self, records: List[Dict[str, Any]], conn: DatabaseConnection) -> int:
        if not records:
            logger.warning("[EODHD_EOD] No records to ingest")
            return 0

        inserted = 0
        now = datetime.now().isoformat()

        for rec in records:
            try:
                conn.execute("""
                    INSERT OR REPLACE INTO eodhd_daily_prices
                    (asset_id, date, open, high, low, close, adjusted_close,
                     volume, eodhd_symbol, exchange, fetched_at)
                    VALUES (?,?,?,?,?,?,?,?,?,?,?)
                """, (
                    rec["asset_id"], rec["date"],
                    rec["open"], rec["high"], rec["low"], rec["close"],
                    rec["adjusted_close"], rec["volume"],
                    rec["eodhd_symbol"], rec["exchange"], now,
                ))
                inserted += 1
            except Exception as exc:
                logger.error(f"[EODHD_EOD] Insert failed for {rec.get('eodhd_symbol')}: {exc}")

        conn.commit()
        logger.info(f"[EODHD_EOD] Inserted {inserted} records")
        return inserted

    # ── Run (orchestration) ────────────────────────────────────

    def run(self, trade_date: date, conn: DatabaseConnection) -> Dict[str, Any]:
        t0 = datetime.now()
        status = "FAILED"
        inserted = 0
        error_msg = None

        try:
            records  = self.fetch(trade_date)
            inserted = self.ingest(records, conn)
            status   = "SUCCESS" if inserted > 0 else "PARTIAL"
        except Exception as exc:
            error_msg = str(exc)
            logger.error(f"[EODHD_EOD] Pipeline failed: {exc}", exc_info=True)
            raise
        finally:
            duration_ms = int((datetime.now() - t0).total_seconds() * 1000)
            conn.execute("""
                INSERT INTO pipeline_runs
                (id, run_date, pipeline_type, source, status,
                 records_inserted, error_log, duration_ms, created_at)
                VALUES (?,?,?,?,?,?,?,?,?)
            """, (
                generate_id(), trade_date.isoformat(), self.PIPELINE_TYPE,
                self.SOURCE_ID, status, inserted, error_msg,
                duration_ms, datetime.now().isoformat(),
            ))
            conn.commit()
            logger.info(f"[EODHD_EOD] Done in {duration_ms}ms — {status}, {inserted} rows")

        return {"status": status, "records_inserted": inserted}
