from __future__ import annotations

from datetime import date, timedelta

import asyncpg


async def get_trading_days(
    pg_conn: asyncpg.Connection,
    start_date: date,
    end_date: date,
) -> list[date]:
    try:
        rows = await pg_conn.fetch(
            """
            SELECT trading_date
            FROM nse_trading_calendar
            WHERE trading_date BETWEEN $1 AND $2
            ORDER BY trading_date
            """,
            start_date,
            end_date,
        )
    except Exception:
        rows = []

    if rows:
        return [row["trading_date"] for row in rows]
    return generate_weekday_calendar(start_date, end_date)


def generate_weekday_calendar(
    start: date,
    end: date,
    known_holidays: set[date] | None = None,
) -> list[date]:
    days: list[date] = []
    current = start
    while current <= end:
        if current.weekday() < 5 and (known_holidays is None or current not in known_holidays):
            days.append(current)
        current += timedelta(days=1)
    return days
