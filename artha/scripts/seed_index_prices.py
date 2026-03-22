#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import io
import os
import sys
from datetime import date, datetime
from pathlib import Path

import psycopg


def eprint(message: str) -> None:
    print(message, file=sys.stderr)


def parse_date(value: str) -> date:
    try:
        parsed = datetime.strptime(value.strip(), "%Y-%m-%d").date()
    except ValueError as exc:
        raise ValueError(f"Invalid date format '{value}'. Expected YYYY-MM-DD.") from exc
    if parsed > date.today():
        raise ValueError(f"Future date not allowed: {parsed.isoformat()}")
    return parsed


def parse_optional_float(value: str | None) -> float | None:
    if value is None or value.strip() == "":
        return None
    return float(value)


def parse_optional_int(value: str | None) -> int | None:
    if value is None or value.strip() == "":
        return None
    return int(value)


def load_rows(csv_path: Path) -> list[tuple[date, float | None, float | None, float | None, float, int | None]]:
    with csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames is None:
            raise ValueError("CSV file must include a header row")
        required = {"date", "open", "high", "low", "close", "volume"}
        missing = required - set(reader.fieldnames)
        if missing:
            raise ValueError(f"CSV missing required columns: {', '.join(sorted(missing))}")

        rows: list[tuple[date, float | None, float | None, float | None, float, int | None]] = []
        for line_number, record in enumerate(reader, start=2):
            trading_date = parse_date(record["date"])
            open_price = parse_optional_float(record.get("open"))
            high_price = parse_optional_float(record.get("high"))
            low_price = parse_optional_float(record.get("low"))
            close_price = float(record["close"])
            if close_price <= 0:
                raise ValueError(f"Row {line_number}: close must be positive")
            volume = parse_optional_int(record.get("volume"))
            rows.append((trading_date, open_price, high_price, low_price, close_price, volume))
        rows.sort(key=lambda row: row[0])
        return rows


def warn_if_large_gaps(rows: list[tuple[date, float | None, float | None, float | None, float, int | None]]) -> None:
    for previous, current in zip(rows, rows[1:]):
        delta = (current[0] - previous[0]).days
        if delta > 7:
            eprint(
                f"WARNING: gap of {delta} calendar days between {previous[0].isoformat()} "
                f"and {current[0].isoformat()} (potential missing data)."
            )


def ensure_tables(conn: psycopg.Connection) -> None:
    with conn.cursor() as cur:
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS index_prices (
                index_symbol TEXT NOT NULL,
                date DATE NOT NULL,
                open NUMERIC(14,4),
                high NUMERIC(14,4),
                low NUMERIC(14,4),
                close NUMERIC(14,4) NOT NULL,
                volume BIGINT,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                PRIMARY KEY (index_symbol, date)
            )
            """
        )
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS index_metadata (
                index_symbol TEXT PRIMARY KEY,
                display_name TEXT NOT NULL,
                description TEXT,
                exchange TEXT NOT NULL DEFAULT 'NSE',
                is_active BOOLEAN NOT NULL DEFAULT TRUE
            )
            """
        )
        cur.execute(
            """
            INSERT INTO index_metadata (index_symbol, display_name)
            VALUES (%s, %s)
            ON CONFLICT (index_symbol) DO NOTHING
            """,
            ("PLACEHOLDER", "Placeholder"),
        )
        cur.execute("DELETE FROM index_metadata WHERE index_symbol = 'PLACEHOLDER'")
    conn.commit()


def copy_rows(
    conn: psycopg.Connection,
    index_symbol: str,
    rows: list[tuple[date, float | None, float | None, float | None, float, int | None]],
) -> int:
    buffer = io.StringIO()
    writer = csv.writer(buffer, lineterminator="\n")
    for trading_date, open_price, high_price, low_price, close_price, volume in rows:
        writer.writerow(
            [
                index_symbol,
                trading_date.isoformat(),
                "" if open_price is None else open_price,
                "" if high_price is None else high_price,
                "" if low_price is None else low_price,
                close_price,
                "" if volume is None else volume,
            ]
        )
    buffer.seek(0)

    with conn.cursor() as cur:
        cur.execute("CREATE TEMP TABLE tmp_index_prices (LIKE index_prices INCLUDING DEFAULTS) ON COMMIT DROP")
        with cur.copy(
            """
            COPY tmp_index_prices (index_symbol, date, open, high, low, close, volume)
            FROM STDIN WITH (FORMAT csv)
            """
        ) as copy:
            copy.write(buffer.getvalue())
        cur.execute(
            """
            INSERT INTO index_prices (index_symbol, date, open, high, low, close, volume)
            SELECT index_symbol, date, open, high, low, close, volume
            FROM tmp_index_prices
            ON CONFLICT (index_symbol, date) DO NOTHING
            """
        )
        inserted = cur.rowcount if cur.rowcount is not None and cur.rowcount >= 0 else 0
    conn.commit()
    return inserted


def insert_rows_fallback(
    conn: psycopg.Connection,
    index_symbol: str,
    rows: list[tuple[date, float | None, float | None, float | None, float, int | None]],
) -> int:
    payload = [
        (index_symbol, trading_date, open_price, high_price, low_price, close_price, volume)
        for trading_date, open_price, high_price, low_price, close_price, volume in rows
    ]
    with conn.cursor() as cur:
        cur.executemany(
            """
            INSERT INTO index_prices (index_symbol, date, open, high, low, close, volume)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (index_symbol, date) DO NOTHING
            """,
            payload,
        )
        inserted = cur.rowcount if cur.rowcount is not None and cur.rowcount >= 0 else 0
    conn.commit()
    return inserted


def main() -> int:
    parser = argparse.ArgumentParser(description="Seed index_prices from a local CSV file.")
    parser.add_argument("--ts-db-url", default=os.getenv("TS_DATABASE_URL"), help="TimescaleDB connection string")
    parser.add_argument("--csv", required=True, help="Local CSV path with columns: date, open, high, low, close, volume")
    parser.add_argument("--index-symbol", required=True, help="Index symbol, for example NIFTY50")
    args = parser.parse_args()

    if not args.ts_db_url:
        eprint("TS_DATABASE_URL or --ts-db-url is required")
        return 1

    try:
        rows = load_rows(Path(args.csv))
        if not rows:
            raise ValueError("CSV contains no data rows")
        warn_if_large_gaps(rows)
        index_symbol = args.index_symbol.strip().upper()

        with psycopg.connect(args.ts_db_url) as conn:
            ensure_tables(conn)
            try:
                inserted = copy_rows(conn, index_symbol, rows)
            except Exception as exc:
                eprint(f"WARNING: COPY path failed ({exc}); falling back to INSERT.")
                conn.rollback()
                inserted = insert_rows_fallback(conn, index_symbol, rows)

        start_date = rows[0][0].isoformat()
        end_date = rows[-1][0].isoformat()
        print(f"Inserted {inserted} rows for {index_symbol} from {start_date} to {end_date}")
        return 0
    except Exception as exc:
        eprint(f"Error: {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
