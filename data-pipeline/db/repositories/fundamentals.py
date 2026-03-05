"""
Fundamentals Repository — CRUD for source-specific and golden fundamentals tables.
"""
from __future__ import annotations

import logging
from typing import Optional, List, Dict, Any

from core.db import DatabaseConnection, Repository, generate_id
from core.models import QuarterlyResult, BalanceSheetRow, CashFlowRow, ShareholdingRow

logger = logging.getLogger(__name__)


class FundamentalsRepository(Repository[QuarterlyResult]):
    """
    Unified access to fundamentals data across all sources.

    Source-specific tables:
      - msi_fundamentals_quarterly, msi_balance_sheets, msi_cash_flows, msi_shareholding
      - screener_quarterly, screener_balance_sheet, screener_cashflow, screener_shareholding

    Golden layer:
      - fundamentals (merged from all sources, with conflict detection)
    """

    # ── Quarterly (MSI preferred, Screener fallback) ──────────────────────

    def upsert(self, record: QuarterlyResult) -> None:
        """Upsert into the appropriate source-specific quarterly table."""
        if record.source == "MSI":
            self._upsert_msi_quarterly(record)
        elif record.source == "SCREENER":
            self._upsert_screener_quarterly(record)
        else:
            logger.warning("Unknown fundamentals source: %s", record.source)

    def upsert_batch(self, records: List[QuarterlyResult]) -> int:
        for r in records:
            self.upsert(r)
        return len(records)

    def find_by_id(self, id: str) -> Optional[QuarterlyResult]:
        return None  # Fundamentals use composite keys

    def get_quarterly(
        self, asset_id: str, limit: int = 16, source: str = "MSI"
    ) -> List[Dict[str, Any]]:
        """
        Get quarterly results. Tries MSI first, falls back to Screener.
        Returns raw dicts to preserve source-specific fields.
        """
        if source == "MSI":
            rows = self._conn.fetchall(
                """SELECT * FROM msi_fundamentals_quarterly
                   WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT ?""",
                (asset_id, limit),
            )
            if rows:
                return rows

        # Fallback to Screener
        return self._conn.fetchall(
            """SELECT * FROM screener_quarterly
               WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT ?""",
            (asset_id, limit),
        )

    def get_balance_sheet(
        self, asset_id: str, limit: int = 10, source: str = "MSI"
    ) -> List[Dict[str, Any]]:
        if source == "MSI":
            rows = self._conn.fetchall(
                """SELECT * FROM msi_balance_sheets
                   WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT ?""",
                (asset_id, limit),
            )
            if rows:
                return rows

        return self._conn.fetchall(
            """SELECT * FROM screener_balance_sheet
               WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT ?""",
            (asset_id, limit),
        )

    def get_cash_flow(
        self, asset_id: str, limit: int = 10, source: str = "MSI"
    ) -> List[Dict[str, Any]]:
        if source == "MSI":
            rows = self._conn.fetchall(
                """SELECT * FROM msi_cash_flows
                   WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT ?""",
                (asset_id, limit),
            )
            if rows:
                return rows

        return self._conn.fetchall(
            """SELECT * FROM screener_cashflow
               WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT ?""",
            (asset_id, limit),
        )

    def get_shareholding(
        self, asset_id: str, limit: int = 8, source: str = "MSI"
    ) -> List[Dict[str, Any]]:
        if source == "MSI":
            rows = self._conn.fetchall(
                """SELECT * FROM msi_shareholding
                   WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT ?""",
                (asset_id, limit),
            )
            if rows:
                return rows

        return self._conn.fetchall(
            """SELECT * FROM screener_shareholding
               WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT ?""",
            (asset_id, limit),
        )

    # ── Private helpers ───────────────────────────────────────────────────

    def _upsert_msi_quarterly(self, r: QuarterlyResult) -> None:
        self._conn.execute(
            """INSERT OR REPLACE INTO msi_fundamentals_quarterly
               (id, asset_id, period_end_date, revenue_ops, net_profit, basic_eps,
                profit_before_tax, finance_costs, depreciation)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                generate_id(), r.asset_id, r.period_end_date,
                r.revenue, r.pat, r.eps,
                r.pbt, r.interest, r.depreciation,
            ),
        )

    def _upsert_screener_quarterly(self, r: QuarterlyResult) -> None:
        self._conn.execute(
            """INSERT OR REPLACE INTO screener_quarterly
               (id, asset_id, period_end_date, is_consolidated,
                sales, operating_profit, opm_pct, pbt, tax_pct, net_profit, eps)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                generate_id(), r.asset_id, r.period_end_date,
                int(r.is_consolidated),
                r.revenue, r.operating_profit, r.opm_pct,
                r.pbt, r.tax, r.pat, r.eps,
            ),
        )
