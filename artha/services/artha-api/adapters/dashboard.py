from __future__ import annotations

from decimal import Decimal
from typing import Any

from fastapi import HTTPException

from adapters.base import BaseAdapter
from core.db import get_pg
from models.dashboard import PresetWidget, WidgetColumn, WidgetConfig


WIDGET_FIELD_MAP: dict[str, str] = {
    "symbol": "a.nse_symbol",
    "name": "a.name",
    "sector": "a.sector",
    "industry_group": "a.industry_group",
    "industry": "a.industry",
    "isin": "a.isin",
    "price": "ti.close",
    "close": "ti.close",
    "change_1d_pct": "ti.change_1d_pct",
    "rsi": "ti.rsi_14",
    "rsi_14": "ti.rsi_14",
    "pctFrom52wHigh": "ti.pct_from_52w_high",
    "pctFrom52wLow": "ti.pct_from_52w_low",
    "volume": "ti.volume",
    "sma_20": "ti.sma_20",
    "sma_50": "ti.sma_50",
    "sma_200": "ti.sma_200",
    "mcap": "cr.market_cap_cr",
    "pe": "cr.pe_ttm",
    "pe_ttm": "cr.pe_ttm",
    "pb": "cr.pb",
    "ev_ebitda": "cr.ev_ebitda",
    "div_yield": "cr.dividend_yield",
    "dividend_yield": "cr.dividend_yield",
    "roce": "cr.roce",
    "roe": "cr.roe",
    "pat_margin": "cr.pat_margin",
    "op_margin": "cr.operating_margin",
    "rev_g1y": "cr.revenue_growth_1y",
    "rev_g3y": "cr.revenue_growth_3y",
    "pat_g1y": "cr.pat_growth_1y",
    "eps_g1y": "cr.eps_growth_1y",
    "de": "cr.debt_equity",
    "debt_equity": "cr.debt_equity",
    "interest_coverage": "cr.interest_coverage",
    "current_ratio": "cr.current_ratio",
    "quality_score": "cr.quality_score",
    "rs_rating": "mc.rs_rating",
    "eps_rating": "mc.eps_rating",
    "master_score": "mc.master_score",
    "group_rank": "mc.group_rank",
}

FILTER_MAP: dict[str, dict[str, str]] = {
    "marketCapCrMin": {"column": "cr.market_cap_cr", "op": "gte"},
    "marketCapCrMax": {"column": "cr.market_cap_cr", "op": "lte"},
    "peTtmMin": {"column": "cr.pe_ttm", "op": "gte"},
    "peTtmMax": {"column": "cr.pe_ttm", "op": "lte"},
    "pbMin": {"column": "cr.pb", "op": "gte"},
    "pbMax": {"column": "cr.pb", "op": "lte"},
    "roeMin": {"column": "cr.roe", "op": "gte"},
    "roeMax": {"column": "cr.roe", "op": "lte"},
    "roceMin": {"column": "cr.roce", "op": "gte"},
    "roceMax": {"column": "cr.roce", "op": "lte"},
    "debtEquityMin": {"column": "cr.debt_equity", "op": "gte"},
    "debtEquityMax": {"column": "cr.debt_equity", "op": "lte"},
    "dividendYieldMin": {"column": "cr.dividend_yield", "op": "gte"},
    "dividendYieldMax": {"column": "cr.dividend_yield", "op": "lte"},
    "patMarginMin": {"column": "cr.pat_margin", "op": "gte"},
    "patMarginMax": {"column": "cr.pat_margin", "op": "lte"},
    "operatingMarginMin": {"column": "cr.operating_margin", "op": "gte"},
    "operatingMarginMax": {"column": "cr.operating_margin", "op": "lte"},
    "revenueGrowth1yMin": {"column": "cr.revenue_growth_1y", "op": "gte"},
    "revenueGrowth1yMax": {"column": "cr.revenue_growth_1y", "op": "lte"},
    "patGrowth1yMin": {"column": "cr.pat_growth_1y", "op": "gte"},
    "patGrowth1yMax": {"column": "cr.pat_growth_1y", "op": "lte"},
    "epsGrowth1yMin": {"column": "cr.eps_growth_1y", "op": "gte"},
    "epsGrowth1yMax": {"column": "cr.eps_growth_1y", "op": "lte"},
    "evEbitdaMin": {"column": "cr.ev_ebitda", "op": "gte"},
    "evEbitdaMax": {"column": "cr.ev_ebitda", "op": "lte"},
    "interestCoverageMin": {"column": "cr.interest_coverage", "op": "gte"},
    "interestCoverageMax": {"column": "cr.interest_coverage", "op": "lte"},
    "currentRatioMin": {"column": "cr.current_ratio", "op": "gte"},
    "currentRatioMax": {"column": "cr.current_ratio", "op": "lte"},
    "qualityScoreMin": {"column": "cr.quality_score", "op": "gte"},
    "qualityScoreMax": {"column": "cr.quality_score", "op": "lte"},
    "rsi14Min": {"column": "ti.rsi_14", "op": "gte"},
    "rsi14Max": {"column": "ti.rsi_14", "op": "lte"},
    "pctFrom52wHighMin": {"column": "ti.pct_from_52w_high", "op": "gte"},
    "pctFrom52wHighMax": {"column": "ti.pct_from_52w_high", "op": "lte"},
    "pctFrom52wLowMin": {"column": "ti.pct_from_52w_low", "op": "gte"},
    "pctFrom52wLowMax": {"column": "ti.pct_from_52w_low", "op": "lte"},
    "sector": {"column": "a.sector", "op": "eq"},
    "industryGroup": {"column": "a.industry_group", "op": "eq"},
    "marketCapBucket": {"column": "a.sector", "op": "eq"},
}


PRESET_WIDGETS: list[dict[str, Any]] = [
    {
        "id": "top_gainers",
        "name": "Top Gainers",
        "description": "Stocks with highest % price gain today",
        "widget_type": "horizontal_bar",
        "category": "Market",
        "defaultLayout": {"w": 6, "h": 6},
        "config": {"columns": [{"id": "symbol", "label": "Symbol", "dslName": "symbol", "dbColumn": "a.nse_symbol", "format": "text"}, {"id": "change_1d", "label": "% Change", "dslName": "change_1d_pct", "dbColumn": "ti.change_1d_pct", "format": "percent", "colorCode": True}, {"id": "close", "label": "Price", "dslName": "price", "dbColumn": "ti.close", "format": "currency", "colorCode": False}, {"id": "volume", "label": "Volume", "dslName": "volume", "dbColumn": "ti.volume", "format": "number"}], "filters": {}, "sortColumn": "change_1d_pct", "sortDirection": "desc", "limit": 20, "dataPerSymbol": 1, "chartConfig": {"xAxis": "change_1d_pct", "yAxis": "symbol", "colorField": "change_1d_pct"}},
    },
    {
        "id": "top_losers",
        "name": "Top Losers",
        "description": "Stocks with biggest % price decline today",
        "widget_type": "horizontal_bar",
        "category": "Market",
        "defaultLayout": {"w": 6, "h": 6},
        "config": {"columns": [{"id": "symbol", "label": "Symbol", "dslName": "symbol", "dbColumn": "a.nse_symbol", "format": "text"}, {"id": "change_1d", "label": "% Change", "dslName": "change_1d_pct", "dbColumn": "ti.change_1d_pct", "format": "percent", "colorCode": True}, {"id": "close", "label": "Price", "dslName": "price", "dbColumn": "ti.close", "format": "currency", "colorCode": False}, {"id": "volume", "label": "Volume", "dslName": "volume", "dbColumn": "ti.volume", "format": "number"}], "filters": {}, "sortColumn": "change_1d_pct", "sortDirection": "asc", "limit": 20, "dataPerSymbol": 1, "chartConfig": {"xAxis": "change_1d_pct", "yAxis": "symbol", "colorField": "change_1d_pct"}},
    },
    {
        "id": "sector_performance",
        "name": "Sector Performance",
        "description": "Average % change by sector today",
        "widget_type": "horizontal_bar",
        "category": "Market",
        "defaultLayout": {"w": 6, "h": 6},
        "config": {"columns": [{"id": "sector", "label": "Sector", "dslName": "sector", "dbColumn": "a.sector", "format": "text"}, {"id": "avg_change", "label": "Avg % Change", "dslName": "change_1d_pct", "dbColumn": "ti.change_1d_pct", "aggregation": "avg", "format": "percent", "colorCode": True}], "filters": {}, "groupColumn": "sector", "sortColumn": "avg_change", "sortDirection": "desc", "limit": 25, "dataPerSymbol": 1, "chartConfig": {"xAxis": "avg_change", "yAxis": "sector", "colorField": "avg_change"}},
    },
    {
        "id": "volume_leaders",
        "name": "Volume Leaders",
        "description": "Top stocks by trading volume today",
        "widget_type": "bar",
        "category": "Market",
        "defaultLayout": {"w": 6, "h": 6},
        "config": {"columns": [{"id": "symbol", "label": "Symbol", "dslName": "symbol", "dbColumn": "a.nse_symbol", "format": "text"}, {"id": "volume", "label": "Volume", "dslName": "volume", "dbColumn": "ti.volume", "format": "number"}, {"id": "close", "label": "Price", "dslName": "price", "dbColumn": "ti.close", "format": "currency", "colorCode": False}, {"id": "change_1d", "label": "% Change", "dslName": "change_1d_pct", "dbColumn": "ti.change_1d_pct", "format": "percent", "colorCode": True}], "filters": {}, "sortColumn": "volume", "sortDirection": "desc", "limit": 20, "dataPerSymbol": 1, "chartConfig": {"xAxis": "symbol", "yAxis": "volume"}},
    },
    {
        "id": "near_52w_high",
        "name": "Near 52-Week High",
        "description": "Stocks within 5% of their 52-week high",
        "widget_type": "table",
        "category": "Technical",
        "defaultLayout": {"w": 6, "h": 7},
        "config": {"columns": [{"id": "symbol", "label": "Symbol", "dslName": "symbol", "dbColumn": "a.nse_symbol", "format": "text"}, {"id": "name", "label": "Name", "dslName": "name", "dbColumn": "a.name", "format": "text"}, {"id": "close", "label": "Price", "dslName": "price", "dbColumn": "ti.close", "format": "currency", "colorCode": False}, {"id": "change_1d", "label": "% Change", "dslName": "change_1d_pct", "dbColumn": "ti.change_1d_pct", "format": "percent", "colorCode": True}, {"id": "pct_52w_high", "label": "% from 52W High", "dslName": "pctFrom52wHigh", "dbColumn": "ti.pct_from_52w_high", "format": "percent", "colorCode": True}, {"id": "sector", "label": "Sector", "dslName": "sector", "dbColumn": "a.sector", "format": "text"}], "filters": {"pctFrom52wHighMax": 5}, "sortColumn": "pct_from_52w_high", "sortDirection": "desc", "limit": 50, "dataPerSymbol": 1},
    },
    {
        "id": "near_52w_low",
        "name": "Near 52-Week Low",
        "description": "Stocks within 10% of their 52-week low",
        "widget_type": "table",
        "category": "Technical",
        "defaultLayout": {"w": 6, "h": 7},
        "config": {"columns": [{"id": "symbol", "label": "Symbol", "dslName": "symbol", "dbColumn": "a.nse_symbol", "format": "text"}, {"id": "name", "label": "Name", "dslName": "name", "dbColumn": "a.name", "format": "text"}, {"id": "close", "label": "Price", "dslName": "price", "dbColumn": "ti.close", "format": "currency", "colorCode": False}, {"id": "change_1d", "label": "% Change", "dslName": "change_1d_pct", "dbColumn": "ti.change_1d_pct", "format": "percent", "colorCode": True}, {"id": "pct_52w_low", "label": "% from 52W Low", "dslName": "pctFrom52wLow", "dbColumn": "ti.pct_from_52w_low", "format": "percent", "colorCode": True}, {"id": "sector", "label": "Sector", "dslName": "sector", "dbColumn": "a.sector", "format": "text"}], "filters": {"pctFrom52wLowMax": 10}, "sortColumn": "pct_from_52w_low", "sortDirection": "asc", "limit": 50, "dataPerSymbol": 1},
    },
    {
        "id": "mcap_distribution",
        "name": "Market Cap by Sector",
        "description": "Total market capitalisation distribution across sectors",
        "widget_type": "pie",
        "category": "Fundamental",
        "defaultLayout": {"w": 5, "h": 7},
        "config": {"columns": [{"id": "sector", "label": "Sector", "dslName": "sector", "dbColumn": "a.sector", "format": "text"}, {"id": "total_mcap", "label": "Total Mkt Cap (Cr)", "dslName": "mcap", "dbColumn": "cr.market_cap_cr", "aggregation": "sum", "format": "currency"}], "filters": {}, "groupColumn": "sector", "sortColumn": "total_mcap", "sortDirection": "desc", "limit": 20, "dataPerSymbol": 1, "chartConfig": {"colorField": "sector", "donut": True, "showLegend": True}},
    },
    {
        "id": "oversold_rsi",
        "name": "Oversold (RSI < 30)",
        "description": "Technically oversold stocks — RSI below 30",
        "widget_type": "table",
        "category": "Technical",
        "defaultLayout": {"w": 6, "h": 7},
        "config": {"columns": [{"id": "symbol", "label": "Symbol", "dslName": "symbol", "dbColumn": "a.nse_symbol", "format": "text"}, {"id": "name", "label": "Name", "dslName": "name", "dbColumn": "a.name", "format": "text"}, {"id": "close", "label": "Price", "dslName": "price", "dbColumn": "ti.close", "format": "currency", "colorCode": False}, {"id": "change_1d", "label": "% Change", "dslName": "change_1d_pct", "dbColumn": "ti.change_1d_pct", "format": "percent", "colorCode": True}, {"id": "rsi", "label": "RSI(14)", "dslName": "rsi", "dbColumn": "ti.rsi_14", "format": "number", "colorCode": True}, {"id": "sector", "label": "Sector", "dslName": "sector", "dbColumn": "a.sector", "format": "text"}], "filters": {"rsi14Max": 30}, "sortColumn": "rsi_14", "sortDirection": "asc", "limit": 50, "dataPerSymbol": 1},
    },
    {
        "id": "high_roce",
        "name": "High ROCE Leaders",
        "description": "Stocks with ROCE > 20% and low debt",
        "widget_type": "table",
        "category": "Fundamental",
        "defaultLayout": {"w": 7, "h": 7},
        "config": {"columns": [{"id": "symbol", "label": "Symbol", "dslName": "symbol", "dbColumn": "a.nse_symbol", "format": "text"}, {"id": "name", "label": "Name", "dslName": "name", "dbColumn": "a.name", "format": "text"}, {"id": "roce", "label": "ROCE %", "dslName": "roce", "dbColumn": "cr.roce", "format": "percent", "colorCode": True}, {"id": "roe", "label": "ROE %", "dslName": "roe", "dbColumn": "cr.roe", "format": "percent", "colorCode": True}, {"id": "pe", "label": "P/E", "dslName": "pe", "dbColumn": "cr.pe_ttm", "format": "number", "colorCode": True}, {"id": "de", "label": "D/E", "dslName": "de", "dbColumn": "cr.debt_equity", "format": "number"}, {"id": "mcap", "label": "Mkt Cap (Cr)", "dslName": "mcap", "dbColumn": "cr.market_cap_cr", "format": "currency"}, {"id": "sector", "label": "Sector", "dslName": "sector", "dbColumn": "a.sector", "format": "text"}], "filters": {"roceMin": 20, "debtEquityMax": 0.5}, "sortColumn": "roce", "sortDirection": "desc", "limit": 50, "dataPerSymbol": 1},
    },
    {
        "id": "dividend_champions",
        "name": "Dividend Champions",
        "description": "High dividend yield stocks with strong ROCE",
        "widget_type": "table",
        "category": "Fundamental",
        "defaultLayout": {"w": 7, "h": 7},
        "config": {"columns": [{"id": "symbol", "label": "Symbol", "dslName": "symbol", "dbColumn": "a.nse_symbol", "format": "text"}, {"id": "name", "label": "Name", "dslName": "name", "dbColumn": "a.name", "format": "text"}, {"id": "div_yield", "label": "Div Yield %", "dslName": "div_yield", "dbColumn": "cr.dividend_yield", "format": "percent", "colorCode": True}, {"id": "roce", "label": "ROCE %", "dslName": "roce", "dbColumn": "cr.roce", "format": "percent", "colorCode": True}, {"id": "pe", "label": "P/E", "dslName": "pe", "dbColumn": "cr.pe_ttm", "format": "number", "colorCode": True}, {"id": "close", "label": "Price", "dslName": "price", "dbColumn": "ti.close", "format": "currency", "colorCode": False}, {"id": "sector", "label": "Sector", "dslName": "sector", "dbColumn": "a.sector", "format": "text"}], "filters": {"dividendYieldMin": 2, "roceMin": 15}, "sortColumn": "div_yield", "sortDirection": "desc", "limit": 50, "dataPerSymbol": 1},
    },
    {
        "id": "revenue_growth",
        "name": "Revenue Growth Leaders",
        "description": "Top stocks by 1-year revenue growth",
        "widget_type": "bar",
        "category": "Fundamental",
        "defaultLayout": {"w": 6, "h": 6},
        "config": {"columns": [{"id": "symbol", "label": "Symbol", "dslName": "symbol", "dbColumn": "a.nse_symbol", "format": "text"}, {"id": "rev_g1y", "label": "Rev Gr % (1Y)", "dslName": "rev_g1y", "dbColumn": "cr.revenue_growth_1y", "format": "percent", "colorCode": True}, {"id": "roe", "label": "ROE %", "dslName": "roe", "dbColumn": "cr.roe", "format": "percent", "colorCode": True}, {"id": "mcap", "label": "Mkt Cap (Cr)", "dslName": "mcap", "dbColumn": "cr.market_cap_cr", "format": "currency"}], "filters": {"marketCapCrMin": 500, "revenueGrowth1yMin": 15}, "sortColumn": "rev_g1y", "sortDirection": "desc", "limit": 20, "dataPerSymbol": 1, "chartConfig": {"xAxis": "symbol", "yAxis": "rev_g1y", "colorField": "rev_g1y"}},
    },
    {
        "id": "undervalued_gems",
        "name": "Undervalued Gems",
        "description": "PE < 15, ROE > 15%",
        "widget_type": "table",
        "category": "Fundamental",
        "defaultLayout": {"w": 7, "h": 7},
        "config": {"columns": [{"id": "symbol", "label": "Symbol", "dslName": "symbol", "dbColumn": "a.nse_symbol", "format": "text"}, {"id": "name", "label": "Name", "dslName": "name", "dbColumn": "a.name", "format": "text"}, {"id": "pe", "label": "P/E", "dslName": "pe", "dbColumn": "cr.pe_ttm", "format": "number", "colorCode": True}, {"id": "roe", "label": "ROE %", "dslName": "roe", "dbColumn": "cr.roe", "format": "percent", "colorCode": True}, {"id": "roce", "label": "ROCE %", "dslName": "roce", "dbColumn": "cr.roce", "format": "percent", "colorCode": True}, {"id": "de", "label": "D/E", "dslName": "de", "dbColumn": "cr.debt_equity", "format": "number"}], "filters": {"peTtmMax": 15, "roeMin": 15}, "sortColumn": "roe", "sortDirection": "desc", "limit": 50, "dataPerSymbol": 1},
    },
    {
        "id": "roe_leaders",
        "name": "ROE Leaders",
        "description": "Top stocks ranked by Return on Equity",
        "widget_type": "horizontal_bar",
        "category": "Fundamental",
        "defaultLayout": {"w": 5, "h": 7},
        "config": {"columns": [{"id": "symbol", "label": "Symbol", "dslName": "symbol", "dbColumn": "a.nse_symbol", "format": "text"}, {"id": "roe", "label": "ROE %", "dslName": "roe", "dbColumn": "cr.roe", "format": "percent", "colorCode": True}, {"id": "roce", "label": "ROCE %", "dslName": "roce", "dbColumn": "cr.roce", "format": "percent", "colorCode": True}, {"id": "pe", "label": "P/E", "dslName": "pe", "dbColumn": "cr.pe_ttm", "format": "number", "colorCode": True}], "filters": {"roeMin": 15}, "sortColumn": "roe", "sortDirection": "desc", "limit": 20, "dataPerSymbol": 1, "chartConfig": {"xAxis": "roe", "yAxis": "symbol", "colorField": "roe"}},
    },
    {
        "id": "low_pe",
        "name": "Low P/E Value Picks",
        "description": "Stocks with P/E below 15 — potential value plays",
        "widget_type": "horizontal_bar",
        "category": "Fundamental",
        "defaultLayout": {"w": 5, "h": 7},
        "config": {"columns": [{"id": "symbol", "label": "Symbol", "dslName": "symbol", "dbColumn": "a.nse_symbol", "format": "text"}, {"id": "pe", "label": "P/E", "dslName": "pe", "dbColumn": "cr.pe_ttm", "format": "number", "colorCode": True}, {"id": "roe", "label": "ROE %", "dslName": "roe", "dbColumn": "cr.roe", "format": "percent", "colorCode": True}, {"id": "roce", "label": "ROCE %", "dslName": "roce", "dbColumn": "cr.roce", "format": "percent", "colorCode": True}], "filters": {"peTtmMax": 15, "peTtmMin": 1}, "sortColumn": "pe", "sortDirection": "asc", "limit": 20, "dataPerSymbol": 1, "chartConfig": {"xAxis": "pe", "yAxis": "symbol", "colorField": "pe"}},
    },
]

DEFAULT_PRESET_IDS = ["high_roce", "undervalued_gems", "roe_leaders", "low_pe"]


def _to_float(value: Any) -> Any:
    if isinstance(value, Decimal):
        return float(value)
    return value


def _col_to_sql(col: WidgetColumn, alias: str | None = None) -> str:
    db_expr = col.dbColumn or WIDGET_FIELD_MAP.get(col.dslName) or f"'{col.dslName}'"
    agg = col.aggregation.upper() if col.aggregation and col.aggregation != "none" else None
    expr = f"{agg}({db_expr})" if agg else db_expr
    col_alias = alias or col.id
    return f'{expr} AS "{col_alias}"'


def _build_where_clause(filters: dict[str, Any], params: list[Any]) -> list[str]:
    clauses: list[str] = []
    for key, value in filters.items():
        if value in (None, "", []):
            continue
        if key == "marketCapBucket":
            bucket_map = {
                "large": "cr.market_cap_cr >= 20000",
                "mid": "cr.market_cap_cr >= 5000 AND cr.market_cap_cr < 20000",
                "small": "cr.market_cap_cr >= 500 AND cr.market_cap_cr < 5000",
                "micro": "cr.market_cap_cr < 500",
            }
            buckets = value if isinstance(value, list) else [value]
            parts = [bucket_map.get(bucket) for bucket in buckets if bucket_map.get(bucket)]
            if parts:
                clauses.append(f"({' OR '.join(parts)})")
            continue

        definition = FILTER_MAP.get(key)
        if definition is None:
            continue
        column = definition["column"]
        op = definition["op"]
        if op == "gte":
            params.append(value)
            clauses.append(f"{column} >= ${len(params)}")
        elif op == "lte":
            params.append(value)
            clauses.append(f"{column} <= ${len(params)}")
        elif op == "eq":
            if isinstance(value, list):
                if not value:
                    continue
                placeholders: list[str] = []
                for item in value:
                    params.append(item)
                    placeholders.append(f"${len(params)}")
                clauses.append(f"{column} IN ({', '.join(placeholders)})")
            else:
                params.append(value)
                clauses.append(f"{column} = ${len(params)}")
    return clauses


def _needs_msi(columns: list[WidgetColumn], filters: dict[str, Any]) -> bool:
    msi_cols = {"rs_rating", "eps_rating", "master_score", "group_rank"}
    return any(col.dslName in msi_cols for col in columns) or any(key.startswith("rs") or key.startswith("eps_rating") or key.startswith("master") for key in filters)


class DashboardAdapter(BaseAdapter):
    def __init__(self) -> None:
        super().__init__(name="dashboard")

    async def execute_widget_query(self, config: WidgetConfig, widget_type: str, user_id: str) -> dict[str, Any]:
        _ = widget_type
        _ = user_id
        columns = config.columns or []
        filters = config.filters or {}
        group_column = config.groupColumn
        sort_column = config.sortColumn
        sort_direction = config.sortDirection or "desc"
        limit = min(config.limit or 50, 200)

        if not columns:
            return {"rows": [], "columns": [], "total": 0}

        for column in columns:
            if not column.dbColumn and column.dslName not in WIDGET_FIELD_MAP:
                raise HTTPException(status_code=422, detail=f"Unknown widget column: {column.dslName}")
        if group_column and group_column != "symbol" and group_column not in WIDGET_FIELD_MAP and not group_column.isidentifier():
            raise HTTPException(status_code=422, detail=f"Unknown group column: {group_column}")
        if sort_column and sort_column not in WIDGET_FIELD_MAP and not any(col.id == sort_column for col in columns):
            raise HTTPException(status_code=422, detail=f"Unknown sort column: {sort_column}")

        params: list[Any] = []
        use_msi = _needs_msi(columns, filters)
        select_parts: list[str] = []

        if group_column and group_column != "symbol":
            group_sql_expr = WIDGET_FIELD_MAP.get(group_column) or f"a.{group_column}"
            select_parts.append(f'{group_sql_expr} AS "{group_column}"')
            for column in columns:
                if column.dslName == group_column or column.id == group_column:
                    continue
                select_parts.append(_col_to_sql(column))
        else:
            for column in columns:
                select_parts.append(_col_to_sql(column))

        joins = [
            "LEFT JOIN technical_indicators ti ON ti.asset_id = a.id AND ti.computed_date = (SELECT MAX(computed_date) FROM technical_indicators)",
            "LEFT JOIN computed_ratios cr ON cr.asset_id = a.id",
        ]
        if use_msi:
            joins.append("LEFT JOIN msi_company_data mc ON mc.asset_id = a.id")

        where_clauses = ["a.is_active = 1", "a.asset_class = 'EQUITY'", "a.nse_symbol IS NOT NULL"]
        where_clauses.extend(_build_where_clause(filters, params))

        group_by_sql = ""
        if group_column and group_column != "symbol":
            group_sql_expr = WIDGET_FIELD_MAP.get(group_column) or f"a.{group_column}"
            group_by_sql = f"GROUP BY {group_sql_expr}"

        order_by_sql = ""
        if sort_column:
            sort_expr = WIDGET_FIELD_MAP.get(sort_column) or f'"{sort_column}"'
            direction = "ASC" if sort_direction == "asc" else "DESC"
            order_by_sql = f"ORDER BY {sort_expr} {direction} NULLS LAST"

        params.append(limit)
        limit_sql = f"LIMIT ${len(params)}"

        sql = "\n".join(
            part
            for part in [
                f"SELECT {', '.join(select_parts)}",
                "FROM assets a",
                "\n".join(joins),
                f"WHERE {' AND '.join(where_clauses)}",
                group_by_sql,
                order_by_sql,
                limit_sql,
            ]
            if part
        )

        async with get_pg() as conn:
            rows = await conn.fetch(sql, *params)
        normalized_rows = [{key: _to_float(value) for key, value in dict(row).items()} for row in rows]
        return {
            "rows": normalized_rows,
            "columns": [column.model_dump() for column in columns],
            "total": len(normalized_rows),
            "meta": {"widget_type": widget_type},
        }
