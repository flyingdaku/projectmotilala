"""
Repository pattern — all Supabase DB access is centralized here.
No router should directly call supabase; they go through a Repository.
"""

from __future__ import annotations

import os
import pandas as pd
from supabase import create_client, Client
from functools import lru_cache


@lru_cache(maxsize=1)
def get_supabase() -> Client:
    url = os.environ["SUPABASE_URL"]
    key = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    return create_client(url, key)


class AssetPriceRepository:
    """Fetches historical price data from the asset_prices table."""

    async def get_prices(
        self,
        asset_ids: list[str],
        start_date: str,
        end_date: str,
    ) -> pd.DataFrame:
        client = get_supabase()

        response = (
            client.table("asset_prices")
            .select("asset_id, date, close_price")
            .in_("asset_id", asset_ids)
            .gte("date", start_date)
            .lte("date", end_date)
            .order("date")
            .execute()
        )

        if not response.data:
            return pd.DataFrame()

        df = pd.DataFrame(response.data)
        df["date"] = pd.to_datetime(df["date"])
        df["close_price"] = df["close_price"].astype(float)

        # Pivot to wide format: columns = asset_ids, index = date
        pivot = df.pivot(index="date", columns="asset_id", values="close_price")
        pivot = pivot.sort_index()

        return pivot


class FundamentalsRepository:
    """Fetches stock fundamental data for the screener."""

    async def screen_stocks(
        self,
        filters: list[tuple],
        sort_by: str,
        sort_order: str,
        limit: int,
        offset: int,
    ) -> dict:
        client = get_supabase()

        query = client.table("stock_fundamentals").select("*")

        # Apply filters
        operator_map = {
            "gt": "gt",
            "lt": "lt",
            "gte": "gte",
            "lte": "lte",
            "eq": "eq",
        }

        for metric, operator, value, value2 in filters:
            if operator == "between" and value2 is not None:
                query = query.gte(metric, value).lte(metric, value2)
            elif operator in operator_map:
                query = getattr(query, operator_map[operator])(metric, value)

        # Count total before pagination
        count_response = query.execute()
        total = len(count_response.data)

        # Apply sort and pagination
        if sort_order == "desc":
            query = query.order(sort_by, desc=True)
        else:
            query = query.order(sort_by)

        query = query.range(offset, offset + limit - 1)
        response = query.execute()

        return {"data": response.data or [], "total": total}


class FactorDataRepository:
    """Fetches India factor data for Fama-French regression."""

    async def get_factor_data(
        self,
        model: str,
        start_date: str | None,
        end_date: str | None,
    ) -> pd.DataFrame:
        client = get_supabase()

        # Factor columns available in the india_factors table
        factor_columns = "date,mkt_rf,rf"
        if model in ("FF3", "CARHART4", "FF5"):
            factor_columns += ",smb,hml"
        if model == "CARHART4":
            factor_columns += ",mom"
        if model == "FF5":
            factor_columns += ",rmw,cma"

        query = client.table("india_factors").select(factor_columns)
        if start_date:
            query = query.gte("date", start_date)
        if end_date:
            query = query.lte("date", end_date)
        query = query.order("date")

        response = query.execute()
        if not response.data:
            return pd.DataFrame()

        df = pd.DataFrame(response.data)
        df["date"] = pd.to_datetime(df["date"])
        df = df.set_index("date").sort_index()
        df = df.astype(float)

        return df
