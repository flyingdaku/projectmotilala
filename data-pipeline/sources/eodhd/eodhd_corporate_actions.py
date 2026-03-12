#!/usr/bin/env python3
"""
EODHD Corporate Actions ingester — splits + dividends.

Daily flow (bulk, 2 requests per exchange):
  - GET /api/eod-bulk-last-day/{EXCHANGE}?type=splits&date=YYYY-MM-DD
  - GET /api/eod-bulk-last-day/{EXCHANGE}?type=dividends&date=YYYY-MM-DD

Important facts about EODHD CA data for Indian stocks:
  - Dividends: only ex_date + value + unadjusted_value + currency returned.
    Declaration/record/payment dates are US-only in EODHD's extended format.
  - Splits: date + split ratio (e.g. "2.0000" means 2:1, i.e. 2 new shares per 1 old).
  - The 'symbols' parameter does NOT work for bulk splits/dividends calls.
  - We store everything in eodhd_corporate_actions for cross-validation against
    our internal corporate_actions table (populated from NSE/BSE APIs).

This ingester does NOT write to the canonical corporate_actions table.
The reconciliation engine compares both sources and flags discrepancies.
"""

from __future__ import annotations

import json
import logging
from datetime import date, datetime
from typing import Any, Dict, List

from core.db import DatabaseConnection, generate_id
from core.registry import SourceIngester, register_source
from sources.eodhd.client import EODHDClient, INDIAN_EXCHANGES

logger = logging.getLogger(__name__)


@register_source
class EODHDCorporateActionsIngester(SourceIngester):
    """
    Ingests EODHD splits + dividends via Bulk API for cross-validation.
    """

    SOURCE_ID     = "EODHD_CA"
    PIPELINE_TYPE = "DAILY"

    def __init__(self):
        self.client = EODHDClient()

    # ── Fetch ──────────────────────────────────────────────────

    def fetch(self, trade_date: date) -> List[Dict[str, Any]]:
        """
        Fetch bulk splits + dividends for all Indian exchanges.
        Returns normalised CA records ready for ingest().
        """
        from core.db import get_connection

        logger.info(f"[EODHD_CA] Fetching bulk CA for {trade_date}")

        # Build (code, exchange) → asset_id lookup
        with get_connection() as conn:
            rows = conn.execute("""
                SELECT asset_id,
                       eodhd_nse_symbol,
                       eodhd_bse_symbol
                FROM   eodhd_symbol_mapping
                WHERE  is_active = 1
            """).fetchall()

        lookup: Dict[tuple, str] = {}
        for row in rows:
            aid = row["asset_id"]
            if row["eodhd_nse_symbol"]:
                code = row["eodhd_nse_symbol"].split(".")[0].upper()
                lookup[(code, "NSE")] = aid
            if row["eodhd_bse_symbol"]:
                code = row["eodhd_bse_symbol"].split(".")[0].upper()
                lookup[(code, "BSE")] = aid

        records: List[Dict[str, Any]] = []

        for exchange in INDIAN_EXCHANGES:
            # ── Splits ─────────────────────────────────────────
            splits = self.client.get_bulk_splits(exchange, trade_date)
            for row in splits:
                code     = (row.get("code") or "").upper()
                asset_id = lookup.get((code, exchange))
                if not asset_id:
                    continue

                # EODHD split field: "2.0000" means 2 new per 1 old (2:1 forward split)
                # We store the raw string AND parse the float factor
                split_str = str(row.get("split", "") or "")
                try:
                    split_factor = float(split_str) if split_str else None
                except ValueError:
                    split_factor = None

                records.append({
                    "id":           generate_id(),
                    "asset_id":     asset_id,
                    "date":         row.get("date") or trade_date.isoformat(),
                    "type":         "split",
                    "value":        split_factor,
                    "raw_json":     json.dumps(row),
                    "exchange":     exchange,
                    "eodhd_code":   code,
                })

            logger.info(f"[EODHD_CA] {exchange}: {len(splits)} splits")

            # ── Dividends ──────────────────────────────────────
            divs = self.client.get_bulk_dividends(exchange, trade_date)
            for row in divs:
                code     = (row.get("code") or "").upper()
                asset_id = lookup.get((code, exchange))
                if not asset_id:
                    continue

                # For Indian stocks EODHD returns:
                #   {code, ex_dividend_date, value, unadjusted_value, currency}
                # No declaration_date / record_date / payment_date for Indian stocks.
                records.append({
                    "id":                generate_id(),
                    "asset_id":          asset_id,
                    "date":              row.get("ex_dividend_date") or trade_date.isoformat(),
                    "type":              "dividend",
                    "value":             row.get("value"),
                    "unadjusted_value":  row.get("unadjusted_value"),
                    "currency":          row.get("currency"),
                    "declaration_date":  row.get("declarationDate"),   # None for Indian stocks
                    "payment_date":      row.get("paymentDate"),        # None for Indian stocks
                    "record_date":       row.get("recordDate"),         # None for Indian stocks
                    "raw_json":          json.dumps(row),
                    "exchange":          exchange,
                    "eodhd_code":        code,
                })

            logger.info(f"[EODHD_CA] {exchange}: {len(divs)} dividends")

        logger.info(f"[EODHD_CA] Total CA records fetched: {len(records)}")
        return records

    # ── Ingest ─────────────────────────────────────────────────

    def ingest(self, records: List[Dict[str, Any]], conn: DatabaseConnection) -> int:
        if not records:
            return 0

        inserted = 0
        now = datetime.now().isoformat()

        for rec in records:
            try:
                conn.execute("""
                    INSERT OR REPLACE INTO eodhd_corporate_actions
                    (id, asset_id, date, type, value, declaration_date,
                     payment_date, record_date, raw_json, fetched_at)
                    VALUES (?,?,?,?,?,?,?,?,?,?)
                """, (
                    rec["id"], rec["asset_id"], rec["date"], rec["type"],
                    rec.get("value"),
                    rec.get("declaration_date"),
                    rec.get("payment_date"),
                    rec.get("record_date"),
                    rec.get("raw_json"),
                    now,
                ))
                inserted += 1
            except Exception as exc:
                logger.error(f"[EODHD_CA] Insert failed for {rec.get('eodhd_code')}: {exc}")

        conn.commit()
        logger.info(f"[EODHD_CA] Inserted {inserted} CA records")
        return inserted

    # ── Run ────────────────────────────────────────────────────

    def run(self, trade_date: date, conn: DatabaseConnection) -> Dict[str, Any]:
        t0 = datetime.now()
        status    = "FAILED"
        inserted  = 0
        error_msg = None

        try:
            records  = self.fetch(trade_date)
            inserted = self.ingest(records, conn)
            status   = "SUCCESS" if inserted >= 0 else "PARTIAL"
        except Exception as exc:
            error_msg = str(exc)
            logger.error(f"[EODHD_CA] Pipeline failed: {exc}", exc_info=True)
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
            logger.info(f"[EODHD_CA] Done in {duration_ms}ms — {status}, {inserted} rows")

        return {"status": status, "records_inserted": inserted}
