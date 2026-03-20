"""
Screener.in Fundamentals Source — parse quarterly financials from HTML cache.

Data Coverage (documented in docs/sources/screener.md):
  - Quarterly Results: Sales, OPM, PBT, PAT, EPS (~last 40 quarters)
  - Balance Sheet: Equity, Reserves, Borrowings, Total Assets (~last 10 years annual)
  - Cash Flow: Operating, Investing, Financing (~last 10 years annual)
  - Shareholding: Promoter, FII, DII, Public (~last 8 quarters)
  - Ratios: Debtor Days, Inventory Days, ROC% (~last 10 years annual)

Corner Cases:
  - Consolidated page tried first (/company/SYMBOL/consolidated/)
  - Falls back to standalone (/company/SYMBOL/)
  - Login-walled companies show limited data (only ~4 quarters)
  - Some BSE-only stocks use BSE code instead of NSE symbol
  - Period format: "Mar 2023" or "Mar 2023(C)" — needs parsing
"""
from __future__ import annotations

import calendar
import logging
import time
from datetime import date, datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

import requests
from bs4 import BeautifulSoup

from core.db import DatabaseConnection, generate_id
from core.registry import SourceIngester, register_source
from core.session import create_screener_session

logger = logging.getLogger(__name__)

_CACHE_DIR = Path(__file__).resolve().parent.parent.parent / "raw_data" / "SCREENER"


def _period_to_iso(period_str: str) -> Optional[str]:
    """Convert 'Mar 2023' or 'Mar 2023(C)' to '2023-03-31'."""
    try:
        clean = period_str.split("(")[0].strip()
        dt = datetime.strptime(clean, "%b %Y")
        last_day = calendar.monthrange(dt.year, dt.month)[1]
        return dt.replace(day=last_day).strftime("%Y-%m-%d")
    except Exception:
        return None


def _parse_table(soup: BeautifulSoup, section_id: str) -> List[Dict]:
    """Parse a Screener data table into list of {period: {field: value}}."""
    section = soup.select_one(f"section{section_id}")
    if not section:
        return []

    table = section.find("table", class_="data-table")
    if not table:
        return []

    thead = table.find("thead")
    if not thead:
        return []
    headers = [th.text.strip() for th in thead.find_all("th")][1:]

    period_rows: Dict[str, Dict] = {}

    tbody = table.find("tbody")
    if not tbody:
        return []

    for tr in tbody.find_all("tr"):
        cols = tr.find_all("td")
        if not cols:
            continue
        label = " ".join(cols[0].text.split()).lower().replace("+", "").strip()
        values = [c.text.strip().replace(",", "") for c in cols[1:]]

        for i, val in enumerate(values):
            if i >= len(headers):
                break
            period = headers[i]
            if period not in period_rows:
                period_rows[period] = {"period": period}
            try:
                clean_val = val.replace("%", "").strip()
                period_rows[period][label] = float(clean_val) if clean_val else 0.0
            except (ValueError, TypeError):
                period_rows[period][label] = None

    return list(period_rows.values())


def parse_screener_html(html: str) -> Dict[str, List[Dict]]:
    """Parse all financial tables from a Screener company page."""
    soup = BeautifulSoup(html, "html.parser")
    return {
        "quarters": _parse_table(soup, "#quarters"),
        "annual": _parse_table(soup, "#profit-loss"),
        "balance_sheet": _parse_table(soup, "#balance-sheet"),
        "cash_flow": _parse_table(soup, "#cash-flow"),
        "ratios": _parse_table(soup, "#ratios"),
        "shareholding": _parse_table(soup, "#shareholding"),
    }


@register_source
class ScreenerFundamentalsIngester(SourceIngester):
    SOURCE_ID = "SCREENER_FUNDAMENTALS"
    PIPELINE_TYPE = "WEEKLY"

    def __init__(self):
        self._session = None

    def fetch(self, trade_date: date) -> List[Any]:
        """
        For Screener, fetch() returns a list of (asset_id, identifier, parsed_data) tuples.
        This is batch-oriented: we iterate all active equities.
        """
        # Delegate to ingest() which handles the batch logic
        return []

    def ingest(self, records: List[Any], conn: DatabaseConnection) -> int:
        """
        Main batch ingestion: iterate all active equities, read from cache,
        and upsert quarterly results, balance sheets, and cash flows.
        """
        assets = conn.fetchall(
            "SELECT id, nse_symbol, bse_code FROM assets "
            "WHERE is_active = 1 AND asset_class = 'EQUITY'"
        )

        from core.db import get_ts_connection
        
        count = 0
        with get_ts_connection() as ts_conn:
            for asset in assets:
                identifier = asset.get("nse_symbol") or asset.get("bse_code")
                if not identifier:
                    continue

                cache_path = _CACHE_DIR / f"{identifier}.html"
                if not cache_path.exists() or cache_path.stat().st_size < 5000:
                    continue

                html = cache_path.read_text(encoding="utf-8")
                data = parse_screener_html(html)

                # Quarterly results
                for row in data.get("quarters", []):
                    period_date = _period_to_iso(row.get("period", ""))
                    if not period_date:
                        continue
                    ts_conn.execute(
                        """INSERT INTO src_screener_quarterly
                           (id, asset_id, period_end_date, sales, expenses,
                            operating_profit, opm_pct, pbt, tax_pct, net_profit, eps)
                           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                           ON CONFLICT (asset_id, period_end_date, is_consolidated) DO UPDATE SET
                            sales=EXCLUDED.sales, expenses=EXCLUDED.expenses,
                            operating_profit=EXCLUDED.operating_profit, opm_pct=EXCLUDED.opm_pct,
                            pbt=EXCLUDED.pbt, tax_pct=EXCLUDED.tax_pct, net_profit=EXCLUDED.net_profit,
                            eps=EXCLUDED.eps""",
                        (
                            generate_id(), asset["id"], period_date,
                            row.get("sales"), row.get("expenses"),
                            row.get("operating profit"), row.get("opm %"),
                            row.get("profit before tax"), row.get("tax %"),
                            row.get("net profit"), row.get("eps in rs"),
                        ),
                    )
                    count += 1

                # Balance sheet
                for row in data.get("balance_sheet", []):
                    period_date = _period_to_iso(row.get("period", ""))
                    if not period_date:
                        continue
                    ts_conn.execute(
                        """INSERT INTO src_screener_balance_sheet
                           (id, asset_id, period_end_date, share_capital, reserves,
                            borrowings, other_liabilities, fixed_assets, cwip,
                            investments, other_assets, total_assets)
                           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                           ON CONFLICT (asset_id, period_end_date) DO UPDATE SET
                            share_capital=EXCLUDED.share_capital, reserves=EXCLUDED.reserves,
                            borrowings=EXCLUDED.borrowings, other_liabilities=EXCLUDED.other_liabilities,
                            fixed_assets=EXCLUDED.fixed_assets, cwip=EXCLUDED.cwip,
                            investments=EXCLUDED.investments, other_assets=EXCLUDED.other_assets,
                            total_assets=EXCLUDED.total_assets""",
                        (
                            generate_id(), asset["id"], period_date,
                            row.get("share capital"), row.get("reserves"),
                            row.get("borrowings"), row.get("other liabilities"),
                            row.get("fixed assets"), row.get("cwip"),
                            row.get("investments"), row.get("other assets"),
                            row.get("total assets"),
                        ),
                    )

                # Cash flow
                for row in data.get("cash_flow", []):
                    period_date = _period_to_iso(row.get("period", ""))
                    if not period_date:
                        continue
                    ts_conn.execute(
                        """INSERT INTO src_screener_cashflow
                           (id, asset_id, period_end_date, cash_from_operating,
                            cash_from_investing, cash_from_financing, net_cash_flow)
                           VALUES (%s, %s, %s, %s, %s, %s, %s)
                           ON CONFLICT (asset_id, period_end_date) DO UPDATE SET
                            cash_from_operating=EXCLUDED.cash_from_operating,
                            cash_from_investing=EXCLUDED.cash_from_investing,
                            cash_from_financing=EXCLUDED.cash_from_financing,
                            net_cash_flow=EXCLUDED.net_cash_flow""",
                        (
                            generate_id(), asset["id"], period_date,
                            row.get("cash from operating activity"),
                            row.get("cash from investing activity"),
                            row.get("cash from financing activity"),
                            row.get("net cash flow"),
                        ),
                    )
                
                # Ratios
                for row in data.get("ratios", []):
                    period_date = _period_to_iso(row.get("period", ""))
                    if not period_date:
                        continue
                    ts_conn.execute(
                        """INSERT INTO src_screener_ratios
                           (id, asset_id, period_end_date, debtor_days, inventory_days,
                            days_payable, cash_conversion_cycle, working_capital_days, roc_pct)
                           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                           ON CONFLICT (asset_id, period_end_date) DO UPDATE SET
                            debtor_days=EXCLUDED.debtor_days, inventory_days=EXCLUDED.inventory_days,
                            days_payable=EXCLUDED.days_payable, cash_conversion_cycle=EXCLUDED.cash_conversion_cycle,
                            working_capital_days=EXCLUDED.working_capital_days, roc_pct=EXCLUDED.roc_pct""",
                        (
                            generate_id(), asset["id"], period_date,
                            row.get("debtor days"), row.get("inventory days"),
                            row.get("days payable"), row.get("cash conversion cycle"),
                            row.get("working capital days"), row.get("roc %"),
                        ),
                    )

                # Shareholding
                for row in data.get("shareholding", []):
                    period_date = _period_to_iso(row.get("period", ""))
                    if not period_date:
                        continue
                    ts_conn.execute(
                        """INSERT INTO src_screener_shareholding
                           (id, asset_id, period_end_date, promoters_pct, fii_pct,
                            dii_pct, public_pct, num_shareholders)
                           VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                           ON CONFLICT (asset_id, period_end_date) DO UPDATE SET
                            promoters_pct=EXCLUDED.promoters_pct, fii_pct=EXCLUDED.fii_pct,
                            dii_pct=EXCLUDED.dii_pct, public_pct=EXCLUDED.public_pct,
                            num_shareholders=EXCLUDED.num_shareholders""",
                        (
                            generate_id(), asset["id"], period_date,
                            row.get("promoters"), row.get("fii"),
                            row.get("dii"), row.get("public"), row.get("no. of shareholders"),
                        ),
                    )

                if count % 100 == 0:
                    ts_conn.commit()

            ts_conn.commit()

        return count
