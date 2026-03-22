from __future__ import annotations

from decimal import Decimal
from typing import Any

from adapters.base import BaseAdapter
from compute.indicators import build_annual
from core.db import get_pg, get_ts


def _to_float(value: Any) -> Any:
    if isinstance(value, Decimal):
        return float(value)
    return value


def _normalize_record(record: dict[str, Any]) -> dict[str, Any]:
    return {key: _to_float(value) for key, value in record.items()}


class CompanyAdapter(BaseAdapter):
    def __init__(self) -> None:
        super().__init__(name="company")

    async def get_profile(self, asset_id: str) -> dict[str, Any]:
        async with get_pg() as conn:
            row = await conn.fetchrow(
                """
                SELECT name, description, website_url, listing_date, management_json, nse_symbol
                FROM assets
                WHERE id = $1
                """,
                asset_id,
            )
        item = _normalize_record(dict(row)) if row is not None else {}
        management: dict[str, Any] = {}
        if item.get("management_json"):
            import json

            try:
                management = json.loads(str(item["management_json"]))
            except Exception:
                management = {}
        symbol = str(item.get("nse_symbol") or "company").lower()
        return {
            "description": item.get("description") or f"{item.get('name', 'Company')} is a listed Indian company.",
            "descriptionShort": item.get("description") or f"{item.get('name', 'Company')} is a listed Indian company.",
            "founded": item.get("listing_date", "")[:4] if item.get("listing_date") else "N/A",
            "foundedYear": int(str(item["listing_date"])[:4]) if item.get("listing_date") else None,
            "website": item.get("website_url") or f"https://www.{symbol}.com",
            "md": management.get("md") or "N/A",
            "chairman": management.get("chairman") or "N/A",
            "indexMemberships": [],
        }

    async def get_corporate_actions(self, asset_id: str, limit: int = 20) -> list[dict[str, Any]]:
        async with get_pg() as conn:
            rows = await conn.fetch(
                """
                SELECT id, action_type, ex_date, record_date, dividend_amount
                FROM corporate_actions
                WHERE asset_id = $1
                ORDER BY ex_date DESC
                LIMIT $2
                """,
                asset_id,
                limit,
            )
        return [
            {
                "id": 0,
                "actionType": row["action_type"],
                "exDate": str(row["ex_date"]),
                "recordDate": str(row["record_date"]) if row["record_date"] is not None else None,
                "dividendAmount": _to_float(row["dividend_amount"]),
            }
            for row in rows
        ]

    async def get_events(self, asset_id: str) -> list[dict[str, Any]]:
        _ = asset_id
        return []

    async def get_financials(self, asset_id: str, consolidated: bool = True) -> dict[str, Any]:
        quarterly_table = "src_msi_quarterly" if consolidated else "src_msi_quarterly_standalone"
        balance_table = "src_msi_balance_sheet" if consolidated else "src_msi_balance_sheet_standalone"
        cashflow_table = "src_msi_cashflow" if consolidated else "src_msi_cashflow_standalone"
        ratio_table = "src_msi_ratios" if consolidated else "src_msi_ratios_standalone"

        async with get_ts() as conn:
            msi_q, msi_bs, msi_cf, msi_r, scr_q = await conn.fetch(
                f"""
                SELECT period_end_date, revenue_ops, operating_profit, finance_costs, depreciation, profit_before_tax, net_profit, basic_eps
                FROM {quarterly_table}
                WHERE asset_id = $1
                ORDER BY period_end_date DESC
                LIMIT 20
                """,
                asset_id,
            ), await conn.fetch(
                f"""
                SELECT period_end_date, equity_capital, reserves, long_term_borrowings, short_term_borrowings, total_assets, cash_equivalents, fixed_assets, investments
                FROM {balance_table}
                WHERE asset_id = $1
                ORDER BY period_end_date DESC
                LIMIT 10
                """,
                asset_id,
            ), await conn.fetch(
                f"""
                SELECT period_end_date, net_cash_operating, net_cash_investing, net_cash_financing, capex, free_cash_flow, net_change_in_cash, cash_begin_of_year, cash_end_of_year
                FROM {cashflow_table}
                WHERE asset_id = $1
                ORDER BY period_end_date DESC
                LIMIT 10
                """,
                asset_id,
            ), await conn.fetch(
                """
                SELECT period_end_date, roce, net_profit_margin, ebit_margin, debtor_days, roe, roa, debt_equity, current_ratio, interest_coverage, creditor_days, sales_growth_yoy,
                       net_income_growth_yoy, basic_eps_growth_yoy, book_value_per_share, ebit_growth_yoy, pbdit_margin, dividend_payout, earnings_retention, ev_ebitda, pre_tax_margin,
                       asset_turnover, inventory_turnover, quick_ratio
                FROM {ratio_table}
                WHERE asset_id = $1
                ORDER BY period_end_date DESC
                LIMIT 12
                """,
                asset_id,
            ), await conn.fetch(
                """
                SELECT period_end_date, sales, operating_profit, pbt, net_profit, eps
                FROM src_screener_quarterly
                WHERE asset_id = $1
                ORDER BY period_end_date DESC
                LIMIT 20
                """,
                asset_id,
            )

        quarterly = [
            {
                "periodEnd": str(r["period_end_date"]),
                "periodType": "QUARTERLY",
                "revenue": _to_float(r["revenue_ops"]),
                "operatingProfit": _to_float(r["operating_profit"]),
                "interest": _to_float(r["finance_costs"]),
                "depreciation": _to_float(r["depreciation"]),
                "pbt": _to_float(r["profit_before_tax"]),
                "netProfit": _to_float(r["net_profit"]),
                "pat": _to_float(r["net_profit"]),
                "eps": _to_float(r["basic_eps"]),
            }
            for r in msi_q
        ] if msi_q else [
            {
                "periodEnd": str(r["period_end_date"]),
                "periodType": "QUARTERLY",
                "revenue": _to_float(r["sales"]),
                "operatingProfit": _to_float(r["operating_profit"]),
                "pbt": _to_float(r["pbt"]),
                "netProfit": _to_float(r["net_profit"]),
                "pat": _to_float(r["net_profit"]),
                "eps": _to_float(r["eps"]),
            }
            for r in scr_q
        ]
        quarterly = quarterly[:12]

        annual = await build_annual(quarterly)

        balance_sheet = []
        for row in msi_bs:
            equity = (_to_float(row["equity_capital"]) or 0.0) + (_to_float(row["reserves"]) or 0.0)
            debt = (_to_float(row["long_term_borrowings"]) or 0.0) + (_to_float(row["short_term_borrowings"]) or 0.0)
            balance_sheet.append(
                {
                    "periodEnd": str(row["period_end_date"]),
                    "periodEndDate": str(row["period_end_date"]),
                    "totalEquity": equity or None,
                    "totalDebt": debt or None,
                    "totalAssets": _to_float(row["total_assets"]),
                    "cash": _to_float(row["cash_equivalents"]),
                    "cashEquivalents": _to_float(row["cash_equivalents"]),
                    "fixedAssets": _to_float(row["fixed_assets"]),
                    "investments": _to_float(row["investments"]),
                    "bookValue": equity or None,
                }
            )

        cash_flow = [
            {
                "periodEnd": str(row["period_end_date"]),
                "periodEndDate": str(row["period_end_date"]),
                "operatingCf": _to_float(row["net_cash_operating"]),
                "cashFromOperating": _to_float(row["net_cash_operating"]),
                "investingCf": _to_float(row["net_cash_investing"]),
                "cashFromInvesting": _to_float(row["net_cash_investing"]),
                "financingCf": _to_float(row["net_cash_financing"]),
                "cashFromFinancing": _to_float(row["net_cash_financing"]),
                "netChangeInCash": _to_float(row["net_change_in_cash"]),
                "cashBeginOfYear": _to_float(row["cash_begin_of_year"]),
                "cashEndOfYear": _to_float(row["cash_end_of_year"]),
                "freeCF": _to_float(row["free_cash_flow"]),
                "freeCashFlow": _to_float(row["free_cash_flow"]),
                "capex": _to_float(row["capex"]),
            }
            for row in msi_cf
        ]

        ratios = [
            {
                "periodEndDate": str(row["period_end_date"]),
                "debtorDays": _to_float(row["debtor_days"]),
                "inventoryDays": None,
                "daysPayable": _to_float(row["creditor_days"]),
                "roce": _to_float(row["roce"]),
                "roe": _to_float(row["roe"]),
                "roa": _to_float(row["roa"]),
                "operatingMargin": _to_float(row["ebit_margin"]),
                "patMargin": _to_float(row["net_profit_margin"]),
                "ebitMargin": _to_float(row["ebit_margin"]),
                "preTaxMargin": _to_float(row["pre_tax_margin"]),
                "debtEquity": _to_float(row["debt_equity"]),
                "currentRatio": _to_float(row["current_ratio"]),
                "quickRatio": _to_float(row["quick_ratio"]),
                "interestCoverage": _to_float(row["interest_coverage"]),
                "assetTurnover": _to_float(row["asset_turnover"]),
                "inventoryTurnover": _to_float(row["inventory_turnover"]),
                "salesGrowthYoy": _to_float(row["sales_growth_yoy"]),
                "netIncomeGrowthYoy": _to_float(row["net_income_growth_yoy"]),
                "epsGrowthYoy": _to_float(row["basic_eps_growth_yoy"]),
                "bookValuePerShare": _to_float(row["book_value_per_share"]),
                "ebitGrowthYoy": _to_float(row["ebit_growth_yoy"]),
                "pbditMargin": _to_float(row["pbdit_margin"]),
                "dividendPayout": _to_float(row["dividend_payout"]),
                "earningsRetention": _to_float(row["earnings_retention"]),
                "evEbitda": _to_float(row["ev_ebitda"]),
            }
            for row in msi_r
        ]

        return {
            "quarterly": quarterly,
            "annual": annual,
            "balanceSheet": balance_sheet,
            "cashFlow": cash_flow,
            "ratios": ratios,
            "anomalies": [],
        }

    async def get_ownership(self, asset_id: str) -> dict[str, Any]:
        async with get_ts() as conn:
            rows = await conn.fetch(
                """
                SELECT period_end_date, promoter_holding, promoter_change_qoq, fii_holding, fii_change_qoq, dii_holding, dii_change_qoq, public_holding, pledged_shares
                FROM src_msi_shareholding
                WHERE asset_id = $1
                ORDER BY period_end_date DESC
                LIMIT 8
                """,
                asset_id,
            )
        shareholding = [
            {
                "quarterEnd": str(row["period_end_date"]),
                "promoterPct": _to_float(row["promoter_holding"]),
                "promoterChangeQoq": _to_float(row["promoter_change_qoq"]),
                "fiiPct": _to_float(row["fii_holding"]),
                "fiiChangeQoq": _to_float(row["fii_change_qoq"]),
                "diiPct": _to_float(row["dii_holding"]),
                "diiChangeQoq": _to_float(row["dii_change_qoq"]),
                "publicPct": _to_float(row["public_holding"]),
                "pledgedPct": _to_float(row["pledged_shares"]),
            }
            for row in rows
        ]
        return {
            "shareholding": shareholding,
            "governance": {"overall": None},
        }

    async def get_analytics(self, asset_id: str) -> dict[str, Any]:
        async with get_ts() as ts_conn:
            lp = await ts_conn.fetchrow(
                """
                SELECT close
                FROM daily_prices
                WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0
                ORDER BY date DESC
                LIMIT 1
                """,
                asset_id,
            )
        async with get_pg() as pg_conn:
            cr, msi = await pg_conn.fetchrow(
                """
                SELECT market_cap_cr, pe_ttm, pb, ev_ebitda, roce, roe, debt_equity, pat_margin, operating_margin, revenue_growth_1y, pat_growth_1y, dividend_yield, quality_score, updated_at
                FROM computed_ratios
                WHERE asset_id = $1
                """,
                asset_id,
            ), await pg_conn.fetchrow(
                """
                SELECT composite_rating, pct_from_high
                FROM msi_company_data
                WHERE asset_id = $1
                """,
                asset_id,
            )
        cr_item = _normalize_record(dict(cr)) if cr is not None else {}
        msi_item = _normalize_record(dict(msi)) if msi is not None else {}
        price = _to_float(lp["close"]) if lp is not None else 0.0
        return {
            "factorExposure": None,
            "factorContext": {"releaseTag": "", "latestSnapshots": [], "drawdowns": []},
            "earningsQuality": {"overallScore": msi_item.get("composite_rating"), "cfoPatRatio": None, "flags": []},
            "ratioHistory": [],
            "ratios": {
                "peTtm": cr_item.get("pe_ttm"),
                "pb": cr_item.get("pb"),
                "evEbitda": cr_item.get("ev_ebitda"),
                "marketCapCr": cr_item.get("market_cap_cr"),
                "price": price,
                "pctFrom52wHigh": msi_item.get("pct_from_high"),
                "roe": cr_item.get("roe"),
                "roce": cr_item.get("roce"),
                "debtEquity": cr_item.get("debt_equity"),
                "dividendYield": cr_item.get("dividend_yield"),
                "patMargin": cr_item.get("pat_margin"),
                "operatingMargin": cr_item.get("operating_margin"),
                "revenueGrowth1y": cr_item.get("revenue_growth_1y"),
                "patGrowth1y": cr_item.get("pat_growth_1y"),
                "qualityScore": cr_item.get("quality_score"),
                "computedDate": str(cr_item["updated_at"]) if cr_item.get("updated_at") is not None else None,
            },
        }

    async def get_documents(self, asset_id: str, category: str | None = None) -> list[dict[str, Any]]:
        _ = asset_id
        _ = category
        # TODO: Wire company documents once document ingestion tables are finalized.
        return []
