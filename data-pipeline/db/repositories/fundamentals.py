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
      - src_screener_quarterly, src_screener_balance_sheet, src_screener_cashflow, src_screener_shareholding
      - src_cogencis_shareholding_summary for ownership/governance fallback

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
            """SELECT * FROM src_screener_quarterly
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
            """SELECT * FROM src_screener_balance_sheet
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
            """SELECT * FROM src_screener_cashflow
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

        if source in {"MSI", "COGENCIS"}:
            rows = self._conn.fetchall(
                """SELECT * FROM src_cogencis_shareholding_summary
                   WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT ?""",
                (asset_id, limit),
            )
            if rows:
                return rows

        return self._conn.fetchall(
            """SELECT * FROM src_screener_shareholding
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

    # ── Golden Dataset Population (Phase 2) ───────────────────────────────

    def populate_golden_fundamentals(self) -> dict:
        """
        Merge MSI and Screener quarterly data to populate the golden `fundamentals` table.
        MSI is the golden source. Screener is the fallback.
        Conflicts > 5% deviation are logged to `fundamental_conflicts`.
        Returns stats about the operation.
        """
        # We will load MSI and Screener into memory (it's small enough: ~20k-60k rows)
        msi_rows = self._conn.fetchall(
            """SELECT asset_id, period_end_date,
                      revenue_ops as revenue, net_profit as pat, basic_eps as eps,
                      profit_before_tax as pbt, finance_costs as interest, depreciation,
                      (profit_before_tax + finance_costs) as ebit
               FROM src_msi_quarterly"""
        )
        screener_rows = self._conn.fetchall(
            """SELECT asset_id, period_end_date, is_consolidated,
                      sales as revenue, operating_profit, opm_pct,
                      pbt, net_profit as pat, eps, interest, depreciation
               FROM src_screener_quarterly"""
        )

        # Index by (asset_id, period_end_date)
        import calendar
        from datetime import datetime

        def normalize_date(date_str: str) -> str:
            if not date_str:
                return "1900-01-01"
            # If it's already YYYY-MM-DD (Screener)
            if len(date_str) == 10 and date_str.count("-") == 2:
                return date_str
            # If it's MSI format like "Dec-18" or "Mar-20"
            if len(date_str) == 6 and "-" in date_str:
                try:
                    dt = datetime.strptime(date_str, "%b-%y")
                    last_day = calendar.monthrange(dt.year, dt.month)[1]
                    return f"{dt.year}-{dt.month:02d}-{last_day:02d}"
                except ValueError:
                    pass
            # Fallback
            return date_str

        msi_idx = {(r["asset_id"], normalize_date(r["period_end_date"])): dict(r) for r in msi_rows}
        scr_idx = {(r["asset_id"], normalize_date(r["period_end_date"])): dict(r) for r in screener_rows}

        all_keys = set(msi_idx.keys()).union(set(scr_idx.keys()))

        insert_rows = []
        conflict_rows = []

        stats = {"msi_only": 0, "scr_only": 0, "merged": 0, "conflicts_logged": 0}

        for (asset_id, date) in all_keys:
            msi = msi_idx.get((asset_id, date))
            scr = scr_idx.get((asset_id, date))

            if msi and not scr:
                stats["msi_only"] += 1
                row = msi.copy()
                row["is_consolidated"] = 1
                row["source"] = "MSI"
                # Keep operating_profit, opm_pct, tax as None since MSI doesn't explicitly have them named like this
                row["operating_profit"] = None
                row["opm_pct"] = None
                row["tax"] = None
                
            elif scr and not msi:
                stats["scr_only"] += 1
                row = scr.copy()
                row["source"] = "SCREENER"
                # Compute ebit if missing
                if row.get("pbt") is not None and row.get("interest") is not None:
                    row["ebit"] = row["pbt"] + row["interest"]
                else:
                    row["ebit"] = None
                    
            else:
                stats["merged"] += 1
                # Both exist. MSI wins.
                row = msi.copy()
                row["is_consolidated"] = scr.get("is_consolidated", 1)
                row["source"] = "MSI"
                
                # We can enrich missing fields from Screener if MSI doesn't have them
                row["operating_profit"] = scr.get("operating_profit")
                row["opm_pct"] = scr.get("opm_pct")
                row["tax"] = scr.get("tax_pct")  # not perfect, but close enough

                # Check for conflicts (Deviation > 5% on Revenue or PAT)
                def check_conflict(field: str, m_val, s_val):
                    if m_val is None or s_val is None or m_val == 0:
                        return
                    diff = abs(m_val - s_val)
                    pct = diff / abs(m_val)
                    if pct > 0.05:
                        stats["conflicts_logged"] += 1
                        conflict_rows.append((
                            generate_id(), asset_id, date, field,
                            None,  # nse
                            None,  # bse
                            s_val, # scr
                            "MSI", # chosen
                            round(pct * 100, 2)
                        ))

                check_conflict("revenue", msi.get("revenue"), scr.get("revenue"))
                check_conflict("pat", msi.get("pat"), scr.get("pat"))

            row["id"] = generate_id()
            row["asset_id"] = asset_id
            row["period_end_date"] = date
            insert_rows.append(row)

        # Batch insert fundamentals
        self._conn.execute("DELETE FROM fundamentals") # Clean full refresh
        self._conn.execute("DELETE FROM fundamental_conflicts")

        insert_sql = """
            INSERT INTO fundamentals (
                id, asset_id, period_end_date, is_consolidated,
                revenue, operating_profit, ebit, interest, pbt, tax, pat, eps, source
            ) VALUES (
                :id, :asset_id, :period_end_date, :is_consolidated,
                :revenue, :operating_profit, :ebit, :interest, :pbt, :tax, :pat, :eps, :source
            )
        """
        self._conn.executemany(insert_sql, [
            (
                r["id"], r["asset_id"], r["period_end_date"], r["is_consolidated"],
                r.get("revenue"), r.get("operating_profit"), r.get("ebit"), r.get("interest"),
                r.get("pbt"), r.get("tax"), r.get("pat"), r.get("eps"), r["source"]
            )
            for r in insert_rows
        ])

        # Batch insert conflicts
        if conflict_rows:
            conflict_sql = """
                INSERT INTO fundamental_conflicts (
                    id, asset_id, period_end_date, field_name, nse_value, bse_value, scr_value, chosen_source, pct_deviation
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """
            self._conn.executemany(conflict_sql, conflict_rows)

        return stats
