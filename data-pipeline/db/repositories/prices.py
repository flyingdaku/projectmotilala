"""
Price Repository — CRUD for the `daily_prices` table.
"""
from __future__ import annotations

import logging
from typing import Optional, List

from core.db import DatabaseConnection, Repository
from core.models import PriceBar

logger = logging.getLogger(__name__)


class PriceRepository(Repository[PriceBar]):
    """Read/write access to the daily_prices table."""

    def upsert(self, bar: PriceBar) -> None:
        self._conn.execute(
            """INSERT OR REPLACE INTO daily_prices
               (asset_id, date, open, high, low, close, adj_close, volume, trades, source_exchange)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                bar.asset_id, bar.date,
                bar.open, bar.high, bar.low, bar.close, bar.adj_close,
                bar.volume, bar.trades, bar.source_exchange,
            ),
        )

    def upsert_batch(self, records: List[PriceBar]) -> int:
        sql = """INSERT OR REPLACE INTO daily_prices
                 (asset_id, date, open, high, low, close, adj_close, volume, trades, source_exchange)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"""
        rows = [
            (r.asset_id, r.date, r.open, r.high, r.low, r.close,
             r.adj_close, r.volume, r.trades, r.source_exchange)
            for r in records
        ]
        return self._conn.executemany(sql, rows)

    def find_by_id(self, id: str) -> Optional[PriceBar]:
        # daily_prices uses composite PK (asset_id, date), not a single id
        return None

    def get_latest(self, asset_id: str, source: str = "NSE") -> Optional[PriceBar]:
        row = self._conn.fetchone(
            """SELECT * FROM daily_prices
               WHERE asset_id = ? AND source_exchange = ?
               ORDER BY date DESC LIMIT 1""",
            (asset_id, source),
        )
        return self._row_to_bar(row) if row else None

    def get_series(
        self,
        asset_id: str,
        start_date: str = "2000-01-01",
        end_date: str = "2099-12-31",
        source: Optional[str] = None,
    ) -> List[PriceBar]:
        if source:
            rows = self._conn.fetchall(
                """SELECT * FROM daily_prices
                   WHERE asset_id = ? AND date >= ? AND date <= ? AND source_exchange = ?
                   ORDER BY date ASC""",
                (asset_id, start_date, end_date, source),
            )
        else:
            rows = self._conn.fetchall(
                """SELECT * FROM daily_prices
                   WHERE asset_id = ? AND date >= ? AND date <= ?
                   ORDER BY date ASC""",
                (asset_id, start_date, end_date),
            )
        return [self._row_to_bar(r) for r in rows]

    def count_for_date(self, trade_date: str, source: str = "NSE") -> int:
        row = self._conn.fetchone(
            "SELECT count(*) as cnt FROM daily_prices WHERE date = ? AND source_exchange = ?",
            (trade_date, source),
        )
        return row["cnt"] if row else 0

    @staticmethod
    def _row_to_bar(row: dict) -> PriceBar:
        return PriceBar(
            asset_id=row["asset_id"],
            date=row["date"],
            open=row.get("open"),
            high=row.get("high"),
            low=row.get("low"),
            close=row["close"],
            adj_close=row.get("adj_close"),
            volume=row.get("volume"),
            trades=row.get("trades"),
            source_exchange=row.get("source_exchange", "NSE"),
        )
