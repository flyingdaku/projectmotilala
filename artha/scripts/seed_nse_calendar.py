#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import os
import sys
from dataclasses import dataclass
from datetime import date, datetime
from pathlib import Path

import psycopg


VARIABLE_HOLIDAYS = ("Holi", "Good Friday", "Diwali Laxmi Puja")

FIXED_HOLIDAYS_2020_2026: dict[int, list[tuple[date, str, str]]] = {
    year: [
        (date(year, 1, 26), "Republic Day", "NSE"),
        (date(year, 4, 14), "Ambedkar Jayanti", "NSE"),
        (date(year, 5, 1), "Maharashtra Day", "NSE"),
        (date(year, 8, 15), "Independence Day", "NSE"),
        (date(year, 10, 2), "Gandhi Jayanti", "NSE"),
        (date(year, 12, 25), "Christmas", "NSE"),
    ]
    for year in range(2020, 2027)
}


@dataclass(slots=True)
class HolidayRow:
    trading_date: date
    holiday_name: str | None
    exchange: str
    is_holiday: bool


def eprint(message: str) -> None:
    print(message, file=sys.stderr)


def parse_date(value: str) -> date:
    try:
        return datetime.strptime(value.strip(), "%Y-%m-%d").date()
    except ValueError as exc:
        raise ValueError(f"Invalid date format '{value}'. Expected YYYY-MM-DD.") from exc


def load_csv_rows(csv_path: Path) -> list[HolidayRow]:
    with csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames is None:
            raise ValueError("CSV file must include a header row")
        required = {"date", "holiday_name", "exchange"}
        missing = required - set(reader.fieldnames)
        if missing:
            raise ValueError(f"CSV missing required columns: {', '.join(sorted(missing))}")

        rows: list[HolidayRow] = []
        for line_number, record in enumerate(reader, start=2):
            raw_date = (record.get("date") or "").strip()
            raw_name = (record.get("holiday_name") or "").strip()
            raw_exchange = (record.get("exchange") or "NSE").strip() or "NSE"
            if not raw_date:
                raise ValueError(f"Row {line_number}: date is required")
            rows.append(
                HolidayRow(
                    trading_date=parse_date(raw_date),
                    holiday_name=raw_name or None,
                    exchange=raw_exchange,
                    is_holiday=True,
                )
            )
        return rows


def generate_weekdays_for_year(year: int) -> list[HolidayRow]:
    current = date(year, 1, 1)
    end = date(year, 12, 31)
    rows: list[HolidayRow] = []
    while current <= end:
        if current.weekday() < 5:
            rows.append(
                HolidayRow(
                    trading_date=current,
                    holiday_name=None,
                    exchange="NSE",
                    is_holiday=False,
                )
            )
        current = date.fromordinal(current.toordinal() + 1)
    return rows


def fallback_rows_for_years(years: set[int]) -> list[HolidayRow]:
    rows: list[HolidayRow] = []
    for year in sorted(years):
        for holiday_date, holiday_name, exchange in FIXED_HOLIDAYS_2020_2026.get(year, []):
            rows.append(
                HolidayRow(
                    trading_date=holiday_date,
                    holiday_name=holiday_name,
                    exchange=exchange,
                    is_holiday=True,
                )
            )
    return rows


def warn_for_variable_holidays(years: set[int]) -> None:
    if not years:
        return
    for holiday in VARIABLE_HOLIDAYS:
        eprint(
            f"WARNING: {holiday} varies year to year. Supply a CSV with exact dates for: "
            f"{', '.join(str(year) for year in sorted(years))}."
        )


def upsert_rows(conn: psycopg.Connection, rows: list[HolidayRow]) -> tuple[int, int, int]:
    inserted = 0
    updated = 0
    skipped = 0

    with conn.cursor() as cur:
        for row in rows:
            existing = cur.execute(
                """
                SELECT is_holiday, holiday_name, exchange
                FROM nse_trading_calendar
                WHERE trading_date = %s
                """,
                (row.trading_date,),
            ).fetchone()

            if existing is None:
                cur.execute(
                    """
                    INSERT INTO nse_trading_calendar (trading_date, is_holiday, holiday_name, exchange)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT (trading_date) DO NOTHING
                    """,
                    (row.trading_date, row.is_holiday, row.holiday_name, row.exchange),
                )
                if cur.rowcount > 0:
                    inserted += 1
                else:
                    skipped += 1
                continue

            existing_is_holiday, existing_name, existing_exchange = existing
            if (
                bool(existing_is_holiday) == row.is_holiday
                and (existing_name or None) == row.holiday_name
                and str(existing_exchange) == row.exchange
            ):
                skipped += 1
                continue

            cur.execute(
                """
                UPDATE nse_trading_calendar
                SET is_holiday = %s,
                    holiday_name = %s,
                    exchange = %s
                WHERE trading_date = %s
                """,
                (row.is_holiday, row.holiday_name, row.exchange, row.trading_date),
            )
            updated += 1

    conn.commit()
    return inserted, updated, skipped


def main() -> int:
    parser = argparse.ArgumentParser(description="Seed nse_trading_calendar from a local CSV and/or weekday year range.")
    parser.add_argument("--db-url", default=os.getenv("DATABASE_URL"), help="PostgreSQL connection string")
    parser.add_argument("--csv", dest="csv_path", help="Local CSV path with columns: date, holiday_name, exchange")
    parser.add_argument("--year", type=int, action="append", default=[], help="Insert all weekdays for the given year")
    args = parser.parse_args()

    if not args.db_url:
        eprint("DATABASE_URL or --db-url is required")
        return 1

    rows: list[HolidayRow] = []
    years_requested = set(args.year)

    try:
        if args.csv_path:
            csv_rows = load_csv_rows(Path(args.csv_path))
            rows.extend(csv_rows)
            years_requested |= {row.trading_date.year for row in csv_rows}

        for year in args.year:
            rows.extend(generate_weekdays_for_year(year))

        fallback_rows = fallback_rows_for_years(years_requested)
        rows.extend(fallback_rows)
        warn_for_variable_holidays({year for year in years_requested if 2020 <= year <= 2026})

        if not rows:
            eprint("Nothing to seed. Provide --csv, --year, or both.")
            return 1

        deduped: dict[date, HolidayRow] = {}
        for row in rows:
            existing = deduped.get(row.trading_date)
            if existing is None:
                deduped[row.trading_date] = row
                continue
            if row.is_holiday:
                deduped[row.trading_date] = row

        with psycopg.connect(args.db_url) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS nse_trading_calendar (
                        trading_date DATE PRIMARY KEY,
                        is_holiday BOOLEAN NOT NULL DEFAULT FALSE,
                        holiday_name TEXT,
                        exchange TEXT NOT NULL DEFAULT 'NSE',
                        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
                    )
                    """
                )
            inserted, updated, skipped = upsert_rows(conn, list(sorted(deduped.values(), key=lambda row: row.trading_date)))
        print(f"Inserted {inserted} new days, updated {updated}, skipped {skipped}")
        return 0
    except Exception as exc:
        eprint(f"Error: {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
