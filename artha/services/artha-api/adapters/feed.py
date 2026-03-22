from __future__ import annotations

from collections import defaultdict
from datetime import datetime, timedelta
from decimal import Decimal
from typing import Any

from adapters.base import BaseAdapter
from core.db import get_pg, get_ts


DEFAULT_ALERT_CONFIG = {
    "price": True,
    "results": True,
    "concall": True,
    "shareholding": True,
    "redFlags": True,
}


def _to_float(value: Any) -> Any:
    if isinstance(value, Decimal):
        return float(value)
    return value


def _days_ago(days: int) -> str:
    return (datetime.utcnow() - timedelta(days=days)).date().isoformat()


def _normalize_alert_config(config: dict[str, bool] | None) -> dict[str, bool]:
    merged = dict(DEFAULT_ALERT_CONFIG)
    if config:
        merged.update(config)
    return merged


def _format_crores(value: float | None) -> str | None:
    if value is None:
        return None
    return f"Rs {value:.0f} Cr" if value >= 1000 else f"Rs {value:.1f} Cr"


def _build_corp_action_title(row: dict[str, Any]) -> str:
    if row.get("action_type") == "DIVIDEND" and row.get("dividend_amount") is not None:
        return f"Dividend announced: Rs {row['dividend_amount']}/share"
    if row.get("action_type") in {"BONUS", "SPLIT"} and row.get("ratio_numerator") and row.get("ratio_denominator"):
        label = "Bonus" if row["action_type"] == "BONUS" else "Split"
        return f"{label} {row['ratio_numerator']}:{row['ratio_denominator']}"
    announcement = row.get("raw_announcement")
    return str(announcement)[:120] if announcement else str(row.get("action_type", "")).replace("_", " ")


def _build_quarterly_title(row: dict[str, Any]) -> str:
    bits: list[str] = []
    revenue = _format_crores(row.get("revenue_ops"))
    profit = _format_crores(row.get("net_profit"))
    if revenue:
        bits.append(f"Revenue {revenue}")
    if profit:
        bits.append(f"PAT {profit}")
    if row.get("pat_growth_yoy") is not None:
        bits.append(f"PAT YoY {float(row['pat_growth_yoy']):.1f}%")
    if not bits and row.get("sales_growth_yoy") is not None:
        bits.append(f"Sales YoY {float(row['sales_growth_yoy']):.1f}%")
    return f"Quarterly results: {' | '.join(bits)}" if bits else "Quarterly results updated"


def _build_shareholding_delta_event(rows: list[dict[str, Any]]) -> dict[str, Any] | None:
    if not rows:
        return None
    latest = rows[0]
    previous = rows[1] if len(rows) > 1 else None
    pledge_delta = None
    fii_delta = None
    promoter_delta = None
    if previous:
        if latest.get("pledged_shares") is not None and previous.get("pledged_shares") is not None:
            pledge_delta = float(latest["pledged_shares"]) - float(previous["pledged_shares"])
        if latest.get("fii_holding") is not None and previous.get("fii_holding") is not None:
            fii_delta = float(latest["fii_holding"]) - float(previous["fii_holding"])
        if latest.get("promoter_holding") is not None and previous.get("promoter_holding") is not None:
            promoter_delta = float(latest["promoter_holding"]) - float(previous["promoter_holding"])

    event_data: dict[str, Any] = {}
    if latest.get("promoter_holding") is not None:
        event_data["Promoter %"] = f"{float(latest['promoter_holding']):.2f}"
    if latest.get("fii_holding") is not None:
        event_data["FII %"] = f"{float(latest['fii_holding']):.2f}"
    if latest.get("dii_holding") is not None:
        event_data["DII %"] = f"{float(latest['dii_holding']):.2f}"
    if latest.get("pledged_shares") is not None:
        event_data["Pledged %"] = f"{float(latest['pledged_shares']):.2f}"
    if fii_delta is not None:
        event_data["FII QoQ"] = f"{'+' if fii_delta >= 0 else ''}{fii_delta:.2f}pp"
    if promoter_delta is not None:
        event_data["Promoter QoQ"] = f"{'+' if promoter_delta >= 0 else ''}{promoter_delta:.2f}pp"

    title = "Shareholding updated"
    severity = "INFO"
    if pledge_delta is not None and pledge_delta > 0.5:
        title = f"Pledged shares increased by {pledge_delta:.2f}pp"
        severity = "WARNING"
    elif fii_delta is not None and abs(fii_delta) >= 1:
        title = f"FII holding {'rose' if fii_delta > 0 else 'fell'} by {abs(fii_delta):.2f}pp"
    elif promoter_delta is not None and abs(promoter_delta) >= 1:
        title = f"Promoter holding {'rose' if promoter_delta > 0 else 'fell'} by {abs(promoter_delta):.2f}pp"

    return {
        "id": f"shareholding:{latest['asset_id']}:{latest['period_end_date']}",
        "assetId": latest["asset_id"],
        "nseSymbol": latest.get("nse_symbol"),
        "bseCode": latest.get("bse_code"),
        "stockName": latest.get("name"),
        "eventType": "SHAREHOLDING_CHANGE",
        "title": title,
        "severity": severity,
        "eventDate": latest["period_end_date"],
        "isRead": False,
        "eventData": event_data,
    }


def _build_feed_items(
    follows: list[dict[str, Any]],
    corp_actions: list[dict[str, Any]],
    quarterlies: list[dict[str, Any]],
    shareholding_rows: list[dict[str, Any]],
    read_ids: set[str],
) -> list[dict[str, Any]]:
    follows_by_asset = {row["asset_id"]: _normalize_alert_config(row.get("alert_config")) for row in follows}
    items: list[dict[str, Any]] = []

    for row in corp_actions:
        alerts = follows_by_asset.get(row["asset_id"], DEFAULT_ALERT_CONFIG)
        if not any([alerts["price"], alerts["redFlags"], alerts["results"], alerts["shareholding"], alerts["concall"]]):
            continue
        items.append(
            {
                "id": f"corp:{row['id']}",
                "assetId": row["asset_id"],
                "nseSymbol": row.get("nse_symbol"),
                "bseCode": row.get("bse_code"),
                "stockName": row.get("name"),
                "eventType": "CORP_ACTION",
                "title": _build_corp_action_title(row),
                "severity": "WARNING" if row.get("action_type") == "SUSPENSION" else "INFO",
                "eventDate": row["ex_date"],
                "isRead": False,
                "eventData": {
                    "actionType": row.get("action_type"),
                    **({"recordDate": row["record_date"]} if row.get("record_date") else {}),
                    **({"dividendPerShare": row["dividend_amount"]} if row.get("dividend_amount") is not None else {}),
                },
            }
        )

    for row in quarterlies:
        alerts = follows_by_asset.get(row["asset_id"], DEFAULT_ALERT_CONFIG)
        if not alerts["results"]:
            continue
        items.append(
            {
                "id": f"results:{row['asset_id']}:{row['period_end_date']}",
                "assetId": row["asset_id"],
                "nseSymbol": row.get("nse_symbol"),
                "bseCode": row.get("bse_code"),
                "stockName": row.get("name"),
                "eventType": "RESULT",
                "title": _build_quarterly_title(row),
                "severity": "WARNING" if row.get("pat_growth_yoy") is not None and float(row["pat_growth_yoy"]) < 0 else "INFO",
                "eventDate": row["period_end_date"],
                "isRead": False,
                "eventData": {
                    **({"revenueCr": row["revenue_ops"]} if row.get("revenue_ops") is not None else {}),
                    **({"patCr": row["net_profit"]} if row.get("net_profit") is not None else {}),
                    **({"patGrowthYoy": row["pat_growth_yoy"]} if row.get("pat_growth_yoy") is not None else {}),
                    **({"eps": row["basic_eps"]} if row.get("basic_eps") is not None else {}),
                },
            }
        )

    grouped_shareholding: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for row in shareholding_rows:
        grouped_shareholding[row["asset_id"]].append(row)
    for asset_id, rows in grouped_shareholding.items():
        alerts = follows_by_asset.get(asset_id, DEFAULT_ALERT_CONFIG)
        if not alerts["shareholding"] and not alerts["redFlags"]:
            continue
        item = _build_shareholding_delta_event(rows)
        if item:
            items.append(item)

    items.sort(key=lambda item: item["eventDate"], reverse=True)
    return [{**item, "isRead": item["id"] in read_ids} for item in items]


class FeedAdapter(BaseAdapter):
    def __init__(self) -> None:
        super().__init__(name="feed")

    async def _list_followed_assets(self, user_id: str) -> list[dict[str, Any]]:
        async with get_pg() as conn:
            rows = await conn.fetch(
                """
                SELECT uf.asset_id,
                       a.nse_symbol,
                       a.bse_code,
                       a.name,
                       uf.alert_config
                FROM user_asset_follows uf
                JOIN assets a ON a.id = uf.asset_id
                WHERE uf.user_id = $1
                ORDER BY uf.updated_at DESC, a.name ASC
                """,
                user_id,
            )
        return [{key: _to_float(value) for key, value in dict(row).items()} for row in rows]

    async def _get_read_event_ids(self, user_id: str, event_ids: list[str]) -> set[str]:
        if not event_ids:
            return set()
        async with get_pg() as conn:
            rows = await conn.fetch(
                """
                SELECT feed_event_id
                FROM user_feed_reads
                WHERE user_id = $1 AND feed_event_id = ANY($2::text[])
                """,
                user_id,
                event_ids,
            )
        return {str(row["feed_event_id"]) for row in rows}

    async def get_user_feed(self, user_id: str, limit: int = 50) -> list[dict[str, Any]]:
        follows = await self._list_followed_assets(user_id)
        if not follows:
            return []
        asset_ids = [row["asset_id"] for row in follows]

        async with get_pg() as pg_conn, get_ts() as ts_corp_conn, get_ts() as ts_q_conn, get_ts() as ts_sh_conn:
            corp_task = pg_conn.fetch(
                """
                SELECT ca.id,
                       ca.asset_id,
                       ca.action_type,
                       ca.ex_date,
                       ca.record_date,
                       ca.dividend_amount,
                       ca.ratio_numerator,
                       ca.ratio_denominator,
                       ca.raw_announcement,
                       a.nse_symbol,
                       a.bse_code,
                       a.name
                FROM corporate_actions ca
                JOIN assets a ON a.id = ca.asset_id
                WHERE ca.asset_id = ANY($1::text[])
                  AND ca.ex_date >= $2
                ORDER BY ca.ex_date DESC
                LIMIT 200
                """,
                asset_ids,
                _days_ago(365),
            )
            quarterly_task = ts_q_conn.fetch(
                """
                WITH ranked AS (
                  SELECT q.asset_id,
                         q.period_end_date::text AS period_end_date,
                         q.revenue_ops,
                         q.net_profit,
                         q.sales_growth_yoy,
                         q.pat_growth_yoy,
                         q.basic_eps,
                         a.nse_symbol,
                         a.bse_code,
                         a.name,
                         ROW_NUMBER() OVER (PARTITION BY q.asset_id ORDER BY q.period_end_date DESC) AS rn
                  FROM src_msi_quarterly q
                  JOIN assets a ON a.id = q.asset_id
                  WHERE q.asset_id = ANY($1::text[])
                )
                SELECT asset_id, period_end_date, revenue_ops, net_profit, sales_growth_yoy, pat_growth_yoy, basic_eps, nse_symbol, bse_code, name
                FROM ranked
                WHERE rn = 1
                """,
                asset_ids,
            )
            shareholding_task = ts_sh_conn.fetch(
                """
                WITH ranked AS (
                  SELECT sh.asset_id,
                         sh.period_end_date::text AS period_end_date,
                         sh.promoter_holding,
                         sh.fii_holding,
                         sh.dii_holding,
                         sh.public_holding,
                         sh.pledged_shares,
                         a.nse_symbol,
                         a.bse_code,
                         a.name,
                         ROW_NUMBER() OVER (PARTITION BY sh.asset_id ORDER BY sh.period_end_date DESC) AS rn
                  FROM src_msi_shareholding sh
                  JOIN assets a ON a.id = sh.asset_id
                  WHERE sh.asset_id = ANY($1::text[])
                )
                SELECT asset_id, period_end_date, promoter_holding, fii_holding, dii_holding, public_holding, pledged_shares, nse_symbol, bse_code, name
                FROM ranked
                WHERE rn <= 2
                ORDER BY asset_id, period_end_date DESC
                """,
                asset_ids,
            )
            corp_rows, quarterly_rows, shareholding_rows = await __import__("asyncio").gather(corp_task, quarterly_task, shareholding_task)

        corp_actions = [{key: _to_float(value) for key, value in dict(row).items()} for row in corp_rows]
        quarterlies = [{key: _to_float(value) for key, value in dict(row).items()} for row in quarterly_rows]
        shareholding = [{key: _to_float(value) for key, value in dict(row).items()} for row in shareholding_rows]
        provisional = _build_feed_items(follows, corp_actions, quarterlies, shareholding, set())
        read_ids = await self._get_read_event_ids(user_id, [item["id"] for item in provisional])
        final_items = _build_feed_items(follows, corp_actions, quarterlies, shareholding, read_ids)
        return final_items[:limit]

    async def get_unread_count(self, user_id: str) -> int:
        feed = await self.get_user_feed(user_id, limit=500)
        return sum(1 for item in feed if not item["isRead"])

    async def mark_as_read(self, user_id: str, event_ids: list[str]) -> None:
        unique_ids = list(dict.fromkeys([event_id for event_id in event_ids if event_id]))
        if not unique_ids:
            return
        async with get_pg() as conn:
            for event_id in unique_ids:
                await conn.execute(
                    """
                    INSERT INTO user_feed_reads (user_id, feed_event_id)
                    VALUES ($1, $2)
                    ON CONFLICT (user_id, feed_event_id) DO NOTHING
                    """,
                    user_id,
                    event_id,
                )
