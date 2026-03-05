"""
Corporate Actions Repository.
"""
from __future__ import annotations

import logging
from typing import Optional, List

from core.db import DatabaseConnection, Repository
from core.models import CorporateAction

logger = logging.getLogger(__name__)


class CorporateActionsRepository(Repository[CorporateAction]):

    def upsert(self, ca: CorporateAction) -> None:
        self._conn.execute(
            """INSERT OR REPLACE INTO corporate_actions
               (id, asset_id, action_type, ex_date, record_date, announcement_date,
                ratio_numerator, ratio_denominator, dividend_amount,
                rights_ratio, rights_price, adjustment_factor,
                source_exchange, raw_announcement)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                ca.id, ca.asset_id, ca.action_type, ca.ex_date,
                ca.record_date, ca.announcement_date,
                ca.ratio_numerator, ca.ratio_denominator,
                ca.dividend_amount, ca.rights_ratio, ca.rights_price,
                ca.adjustment_factor, ca.source_exchange, ca.raw_announcement,
            ),
        )

    def upsert_batch(self, records: List[CorporateAction]) -> int:
        for r in records:
            self.upsert(r)
        return len(records)

    def find_by_id(self, id: str) -> Optional[CorporateAction]:
        row = self._conn.fetchone("SELECT * FROM corporate_actions WHERE id = ?", (id,))
        return self._to_model(row) if row else None

    def find_for_asset(self, asset_id: str, limit: int = 50) -> List[CorporateAction]:
        rows = self._conn.fetchall(
            "SELECT * FROM corporate_actions WHERE asset_id = ? ORDER BY ex_date DESC LIMIT ?",
            (asset_id, limit),
        )
        return [self._to_model(r) for r in rows]

    def find_by_date_range(self, start: str, end: str) -> List[CorporateAction]:
        rows = self._conn.fetchall(
            "SELECT * FROM corporate_actions WHERE ex_date >= ? AND ex_date <= ? ORDER BY ex_date",
            (start, end),
        )
        return [self._to_model(r) for r in rows]

    @staticmethod
    def _to_model(row: dict) -> CorporateAction:
        return CorporateAction(
            id=row["id"],
            asset_id=row["asset_id"],
            action_type=row["action_type"],
            ex_date=row["ex_date"],
            record_date=row.get("record_date"),
            announcement_date=row.get("announcement_date"),
            ratio_numerator=row.get("ratio_numerator"),
            ratio_denominator=row.get("ratio_denominator"),
            dividend_amount=row.get("dividend_amount"),
            rights_ratio=row.get("rights_ratio"),
            rights_price=row.get("rights_price"),
            adjustment_factor=row.get("adjustment_factor"),
            source_exchange=row.get("source_exchange"),
            raw_announcement=row.get("raw_announcement"),
        )
