#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from typing import Any
from uuid import NAMESPACE_URL, UUID, uuid4, uuid5

import psycopg
from psycopg.types.json import Json


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Migrate chart JSON files into PostgreSQL.")
    parser.add_argument(
        "--database-url",
        dest="database_url",
        default=os.environ.get("DATABASE_URL"),
        help="Relational PostgreSQL connection URL. Defaults to DATABASE_URL.",
    )
    parser.add_argument(
        "--chart-data-dir",
        dest="chart_data_dir",
        default=str(Path(__file__).resolve().parents[1] / ".chart-data"),
        help="Directory containing legacy chart JSON files.",
    )
    args = parser.parse_args()
    if not args.database_url:
        parser.error("DATABASE_URL env var or --database-url is required")
    return args


def deterministic_uuid(namespace: str, value: str) -> UUID:
    return uuid5(NAMESPACE_URL, f"{namespace}:{value}")


def parse_user_and_kind(filename: str) -> tuple[str, str] | None:
    suffixes = ("_layouts.json", "_drawings.json", "_alerts.json")
    for suffix in suffixes:
        if filename.endswith(suffix):
            return filename[: -len(suffix)], suffix[1:-5]
    return None


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def migrate_layouts(cursor: psycopg.Cursor[Any], user_id: str, payload: Any) -> int:
    if not isinstance(payload, list):
        return 0

    migrated = 0
    for index, layout in enumerate(payload):
        if not isinstance(layout, dict):
            continue
        raw_id = str(layout.get("id") or "")
        try:
            layout_id = UUID(raw_id) if raw_id else deterministic_uuid("chart_layout", f"{user_id}:{index}:{layout.get('name', '')}")
        except ValueError:
            layout_id = deterministic_uuid("chart_layout", f"{user_id}:{raw_id}")

        name = str(layout.get("name") or f"Layout {index + 1}")
        is_default = bool(layout.get("isDefault") or layout.get("is_default") or False)
        cursor.execute(
            """
            INSERT INTO chart_layouts (id, user_id, name, content, is_default, updated_at)
            VALUES (%s, %s, %s, %s, %s, COALESCE(%s::timestamptz, NOW()))
            ON CONFLICT (id) DO NOTHING
            """,
            (
                layout_id,
                user_id,
                name,
                Json(layout),
                is_default,
                layout.get("updatedAt"),
            ),
        )
        migrated += int(cursor.rowcount or 0)
    return migrated


def migrate_drawings(cursor: psycopg.Cursor[Any], user_id: str, payload: Any) -> int:
    if not isinstance(payload, dict):
        return 0

    migrated = 0
    for key, drawings in payload.items():
        if not isinstance(key, str) or not key.startswith("drawings_"):
            continue
        remainder = key[len("drawings_") :]
        if "_" not in remainder:
            continue
        symbol, timeframe = remainder.rsplit("_", 1)
        record_id = deterministic_uuid("chart_drawing", f"{user_id}:{symbol.upper()}:{timeframe}")
        cursor.execute(
            """
            INSERT INTO chart_drawings (id, user_id, symbol, timeframe, content)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (user_id, symbol, timeframe) DO NOTHING
            """,
            (
                record_id,
                user_id,
                symbol.upper(),
                timeframe,
                Json(drawings if isinstance(drawings, list) else []),
            ),
        )
        migrated += int(cursor.rowcount or 0)
    return migrated


def migrate_alerts(cursor: psycopg.Cursor[Any], user_id: str, payload: Any) -> int:
    if not isinstance(payload, list):
        return 0

    migrated = 0
    for index, alert in enumerate(payload):
        if not isinstance(alert, dict):
            continue
        raw_id = str(alert.get("id") or "")
        try:
            alert_id = UUID(raw_id) if raw_id else uuid4()
        except ValueError:
            alert_id = deterministic_uuid("chart_alert", f"{user_id}:{raw_id or index}")

        symbol = str(alert.get("symbol") or "").upper()
        direction = str(alert.get("direction") or alert.get("condition") or "").lower()
        price = alert.get("price")
        if not symbol or direction not in {"above", "below"} or price is None:
            continue

        cursor.execute(
            """
            INSERT INTO chart_alerts (id, user_id, symbol, price, condition, message, is_active, created_at, triggered_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, COALESCE(%s::timestamptz, NOW()), %s::timestamptz)
            ON CONFLICT (id) DO NOTHING
            """,
            (
                alert_id,
                user_id,
                symbol,
                price,
                direction,
                alert.get("note") or alert.get("message"),
                bool(alert.get("active", alert.get("is_active", True))),
                alert.get("createdAt") or alert.get("created_at"),
                alert.get("triggered_at"),
            ),
        )
        migrated += int(cursor.rowcount or 0)
    return migrated


def main() -> None:
    args = parse_args()
    chart_data_dir = Path(args.chart_data_dir)

    layout_count = 0
    drawing_count = 0
    alert_count = 0

    with psycopg.connect(args.database_url) as conn:
        with conn.cursor() as cursor:
            for path in sorted(chart_data_dir.glob("*.json")):
                parsed = parse_user_and_kind(path.name)
                if parsed is None:
                    continue

                user_id, kind = parsed
                payload = load_json(path)

                if kind == "layouts":
                    layout_count += migrate_layouts(cursor, user_id, payload)
                elif kind == "drawings":
                    drawing_count += migrate_drawings(cursor, user_id, payload)
                elif kind == "alerts":
                    alert_count += migrate_alerts(cursor, user_id, payload)

        conn.commit()

    print(f"Migrated {layout_count} layouts, {drawing_count} drawings, {alert_count} alerts")


if __name__ == "__main__":
    main()
