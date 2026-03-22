from __future__ import annotations

from datetime import date, timedelta
from decimal import Decimal
from typing import Any

import asyncpg

from adapters.base import BaseAdapter
from core.db import get_pg, get_ts


def _to_float(value: Any) -> Any:
    if isinstance(value, Decimal):
        return float(value)
    return value


def _normalize_record(record: dict[str, Any]) -> dict[str, Any]:
    return {key: _to_float(value) for key, value in record.items()}


class StocksAdapter(BaseAdapter):
    def __init__(self) -> None:
        super().__init__(name="stocks")

    async def resolve_by_symbol(self, conn: asyncpg.Connection, symbol: str) -> dict[str, Any] | None:
        row = await conn.fetchrow(
            """
            SELECT id,
                   COALESCE(nse_symbol, bse_code) AS symbol,
                   nse_symbol,
                   bse_code,
                   name,
                   sector,
                   industry_group,
                   COALESCE(industry, msi_industry_group) AS industry,
                   sub_industry,
                   isin,
                   asset_class
            FROM assets
            WHERE is_active = 1
              AND (UPPER(nse_symbol) = UPPER($1) OR UPPER(bse_code) = UPPER($1))
            LIMIT 1
            """,
            symbol.upper(),
        )
        return _normalize_record(dict(row)) if row is not None else None

    async def resolve_many_by_symbol(self, conn: asyncpg.Connection, symbols: list[str]) -> dict[str, dict[str, Any]]:
        normalized = [symbol.strip().upper() for symbol in symbols if symbol.strip()]
        if not normalized:
            return {}

        rows = await conn.fetch(
            """
            SELECT id,
                   nse_symbol,
                   bse_code,
                   COALESCE(nse_symbol, bse_code) AS symbol,
                   name,
                   sector,
                   industry_group,
                   COALESCE(industry, msi_industry_group) AS industry,
                   sub_industry,
                   isin,
                   asset_class
            FROM assets
            WHERE is_active = 1
              AND (
                UPPER(nse_symbol) = ANY($1::text[])
                OR UPPER(bse_code) = ANY($1::text[])
              )
            """,
            normalized,
        )

        resolved: dict[str, dict[str, Any]] = {}
        for row in rows:
            item = _normalize_record(dict(row))
            for key in {item.get("nse_symbol"), item.get("bse_code"), item.get("symbol")}:
                if key:
                    resolved[str(key).upper()] = item
        return resolved

    async def search(self, q: str, limit: int = 10) -> list[dict[str, Any]]:
        query = q.strip()
        if not query:
            return []
        async with get_pg() as conn:
            rows = await conn.fetch(
                """
                SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin
                FROM assets
                WHERE is_active = 1
                  AND (LOWER(nse_symbol) LIKE $1 OR LOWER(name) LIKE $1 OR bse_code LIKE $1)
                ORDER BY CASE
                  WHEN LOWER(nse_symbol) = LOWER($2) THEN 0
                  WHEN LOWER(nse_symbol) LIKE LOWER($2)||'%' THEN 1
                  ELSE 2
                END, name
                LIMIT $3
                """,
                f"%{query.lower()}%",
                query,
                limit * 2,
            )

        seen: set[str] = set()
        results: list[dict[str, Any]] = []
        for row in rows:
            item = _normalize_record(dict(row))
            symbol = item.get("nse_symbol") or item.get("bse_code") or ""
            if not symbol or symbol in seen:
                continue
            seen.add(str(symbol))
            results.append(
                {
                    "id": str(item["id"]),
                    "symbol": symbol,
                    "name": item["name"],
                    "exchange": "NSE" if item.get("nse_symbol") else "BSE",
                    "sector": item.get("sector"),
                    "industryGroup": item.get("industry_group"),
                    "industry": item.get("industry"),
                    "subIndustry": item.get("sub_industry"),
                    "isin": item.get("isin"),
                    "assetClass": "EQUITY",
                }
            )
            if len(results) >= limit:
                break
        return results

    async def get_by_symbol(self, symbol: str) -> dict[str, Any] | None:
        async with get_pg() as conn:
            row = await conn.fetchrow(
                """
                SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin, nse_listed, msi_sector, msi_industry_group
                FROM assets
                WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
                LIMIT 1
                """,
                symbol.upper(),
            )
        if row is None:
            return None
        item = _normalize_record(dict(row))
        return {
            "id": str(item["id"]),
            "symbol": item.get("nse_symbol") or item.get("bse_code") or symbol.upper(),
            "name": item["name"],
            "exchange": "NSE" if item.get("nse_listed") else "BSE",
            "sector": item.get("sector") or item.get("msi_sector"),
            "industryGroup": item.get("industry_group"),
            "industry": item.get("industry") or item.get("msi_industry_group"),
            "subIndustry": item.get("sub_industry"),
            "isin": item.get("isin"),
            "assetClass": "EQUITY",
        }

    async def get_detail(self, asset_id: str) -> dict[str, Any] | None:
        async with get_pg() as conn:
            asset = await conn.fetchrow(
                """
                SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin, nse_listed, msi_sector, msi_industry_group, listing_date, face_value
                FROM assets
                WHERE id = $1 AND is_active = 1
                LIMIT 1
                """,
                asset_id,
            )
            cr = await conn.fetchrow(
                """
                SELECT market_cap_cr, pe_ttm, pb, dividend_yield, roe, roce, debt_equity
                FROM computed_ratios
                WHERE asset_id = $1
                """,
                asset_id,
            )
        if asset is None:
            return None

        async with get_ts() as conn:
            lp, range_row, vol = await conn.fetchrow(
                """
                SELECT close, date, prev_close
                FROM (
                  SELECT close, date, LAG(close) OVER (ORDER BY date) AS prev_close
                  FROM daily_prices
                  WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0
                  ORDER BY date DESC
                  LIMIT 1
                ) t
                """,
                asset_id,
            ), await conn.fetchrow(
                """
                SELECT MAX(high) AS high52w, MIN(low) AS low52w
                FROM daily_prices
                WHERE asset_id = $1 AND date >= $2 AND source_exchange IN ('NSE','BSE')
                """,
                asset_id,
                date.today() - timedelta(days=365),
            ), await conn.fetchrow(
                """
                SELECT volume
                FROM daily_prices
                WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0
                ORDER BY date DESC
                LIMIT 1
                """,
                asset_id,
            )

        asset_item = _normalize_record(dict(asset))
        cr_item = _normalize_record(dict(cr)) if cr is not None else {}
        lp_item = _normalize_record(dict(lp)) if lp is not None else {}
        range_item = _normalize_record(dict(range_row)) if range_row is not None else {}
        vol_item = _normalize_record(dict(vol)) if vol is not None else {}
        price = lp_item.get("close") or 0.0
        prev_close = lp_item.get("prev_close")
        pct_change = round(((price / prev_close) - 1) * 100, 2) if prev_close not in (None, 0) else 0.0

        return {
            "id": str(asset_item["id"]),
            "symbol": asset_item.get("nse_symbol") or asset_item.get("bse_code") or "",
            "nseSymbol": asset_item.get("nse_symbol"),
            "bseCode": asset_item.get("bse_code"),
            "name": asset_item["name"],
            "exchange": "NSE" if asset_item.get("nse_listed") else "BSE",
            "sector": asset_item.get("sector") or asset_item.get("msi_sector"),
            "industryGroup": asset_item.get("industry_group"),
            "industry": asset_item.get("industry") or asset_item.get("msi_industry_group"),
            "subIndustry": asset_item.get("sub_industry"),
            "isin": asset_item.get("isin"),
            "assetClass": "EQUITY",
            "price": price,
            "priceDate": lp_item.get("date"),
            "pctChange1d": pct_change,
            "high52w": range_item.get("high52w"),
            "low52w": range_item.get("low52w"),
            "marketCapCr": cr_item.get("market_cap_cr"),
            "pe": cr_item.get("pe_ttm"),
            "pb": cr_item.get("pb"),
            "dividendYield": cr_item.get("dividend_yield"),
            "roe": cr_item.get("roe"),
            "roce": cr_item.get("roce"),
            "debtEquity": cr_item.get("debt_equity"),
            "volume": vol_item.get("volume"),
            "faceValue": asset_item.get("face_value") or 1,
            "listedDate": asset_item.get("listing_date"),
        }

    async def get_peers(self, asset_id: str, limit: int = 10) -> list[dict[str, Any]]:
        async with get_pg() as conn:
            asset = await conn.fetchrow(
                """
                SELECT id, sector, screener_industry_code, msi_sector
                FROM assets
                WHERE id = $1 AND is_active = 1
                LIMIT 1
                """,
                asset_id,
            )
        if asset is None:
            return []

        item = dict(asset)
        field = "screener_industry_code" if item.get("screener_industry_code") else "sector" if item.get("sector") else "msi_sector"
        value = item.get("screener_industry_code") or item.get("sector") or item.get("msi_sector")
        if value is None:
            return []

        async with get_pg() as conn:
            peers = await conn.fetch(
                f"""
                SELECT id, nse_symbol, bse_code, name
                FROM assets
                WHERE {field} = $1 AND id != $2 AND is_active = 1
                ORDER BY CASE WHEN nse_symbol IS NOT NULL THEN 0 ELSE 1 END, name
                LIMIT $3
                """,
                value,
                asset_id,
                min(limit, 12),
            )
            peer_ids = [str(row["id"]) for row in peers]
            ratio_rows = await conn.fetch(
                """
                SELECT asset_id, market_cap_cr, pe_ttm, pb, ev_ebitda, roce, roe, debt_equity, pat_margin, operating_margin, revenue_growth_1y, pat_growth_1y, dividend_yield
                FROM computed_ratios
                WHERE asset_id = ANY($1::text[])
                """,
                peer_ids,
            ) if peer_ids else []
        ratio_map = {str(row["asset_id"]): _normalize_record(dict(row)) for row in ratio_rows}

        async with get_ts() as conn:
            price_rows = await conn.fetch(
                """
                SELECT DISTINCT ON (asset_id) asset_id, close, date
                FROM daily_prices
                WHERE asset_id = ANY($1::text[])
                  AND source_exchange IN ('NSE','BSE')
                  AND close > 0
                ORDER BY asset_id, date DESC
                """,
                peer_ids,
            ) if peer_ids else []
        price_map = {str(row["asset_id"]): _normalize_record(dict(row)) for row in price_rows}

        results: list[dict[str, Any]] = []
        for row in peers:
            peer = _normalize_record(dict(row))
            price = price_map.get(str(peer["id"]))
            if price is None or not price.get("close"):
                continue
            ratio = ratio_map.get(str(peer["id"]), {})
            results.append(
                {
                    "symbol": peer.get("nse_symbol") or peer.get("bse_code") or "",
                    "nseSymbol": peer.get("nse_symbol"),
                    "name": peer["name"],
                    "marketCapCr": ratio.get("market_cap_cr"),
                    "peTtm": ratio.get("pe_ttm"),
                    "pb": ratio.get("pb"),
                    "evEbitda": ratio.get("ev_ebitda"),
                    "roce": ratio.get("roce"),
                    "roe": ratio.get("roe"),
                    "debtEquity": ratio.get("debt_equity"),
                    "patMargin": ratio.get("pat_margin"),
                    "operatingMargin": ratio.get("operating_margin"),
                    "price": price.get("close"),
                    "revenueGrowth1y": ratio.get("revenue_growth_1y"),
                    "patGrowth1y": ratio.get("pat_growth_1y"),
                    "dividendYield": ratio.get("dividend_yield"),
                }
            )
        return results

    async def get_prices(self, asset_id: str, from_date: date, to_date: date, interval: str = "1D") -> list[dict[str, Any]]:
        resolved_interval = interval.upper()
        async with get_ts() as conn:
            if resolved_interval == "1D":
                rows = await conn.fetch(
                    """
                    SELECT date, open, high, low, close, volume, source_exchange
                    FROM daily_prices
                    WHERE asset_id = $1 AND date >= $2 AND date <= $3
                    ORDER BY date ASC
                    """,
                    asset_id,
                    from_date,
                    to_date,
                )
                by_date: dict[str, dict[str, Any]] = {}
                for row in rows:
                    item = _normalize_record(dict(row))
                    key = item["date"].isoformat() if hasattr(item["date"], "isoformat") else str(item["date"])
                    existing = by_date.get(key)
                    if existing is None or item.get("source_exchange") == "NSE":
                        by_date[key] = item
                return [
                    {
                        "date": key,
                        "open": value["open"],
                        "high": value["high"],
                        "low": value["low"],
                        "close": value["close"],
                        "volume": value.get("volume"),
                    }
                    for key, value in sorted(by_date.items())
                ]

            bucket = "1 week" if resolved_interval == "1W" else "1 month"
            rows = await conn.fetch(
                f"""
                SELECT time_bucket('{bucket}', date::timestamp) AS bucket_date,
                       FIRST(open, date) AS open,
                       MAX(high) AS high,
                       MIN(low) AS low,
                       LAST(close, date) AS close,
                       SUM(volume) AS volume
                FROM daily_prices
                WHERE asset_id = $1
                  AND date >= $2
                  AND date <= $3
                  AND source_exchange IN ('NSE','BSE')
                GROUP BY bucket_date
                ORDER BY bucket_date ASC
                """,
                asset_id,
                from_date,
                to_date,
            )
        return [
            {
                "date": (row["bucket_date"].date().isoformat() if hasattr(row["bucket_date"], "date") else str(row["bucket_date"])),
                "open": _to_float(row["open"]),
                "high": _to_float(row["high"]),
                "low": _to_float(row["low"]),
                "close": _to_float(row["close"]),
                "volume": _to_float(row["volume"]),
            }
            for row in rows
        ]
