"""
PostgreSQL database abstraction layer for the Artha data pipeline.

SQLite is no longer a supported runtime backend. The compatibility helpers in
this module keep the existing pipeline code working while routing everything to
PostgreSQL/TimescaleDB.
"""
from __future__ import annotations

import logging
import os
import re
import uuid
from abc import ABC, abstractmethod
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Generic, Iterator, List, Optional, TypeVar

try:
    import psycopg2
    import psycopg2.extras
    _PSYCOPG2_AVAILABLE = True
except ImportError:  # pragma: no cover
    _PSYCOPG2_AVAILABLE = False

logger = logging.getLogger(__name__)

T = TypeVar("T")

_PG_RELATIONAL_DSN_DEFAULT = (
    "host=localhost port=5432 dbname=artha_relational user=artha password=artha_dev_password"
)
_PG_TIMESERIES_DSN_DEFAULT = (
    "host=localhost port=5433 dbname=artha_timeseries user=artha password=artha_dev_password"
)

_INSERT_OR_REPLACE_RE = re.compile(
    r"^\s*INSERT\s+OR\s+REPLACE\s+INTO\s+([A-Za-z_][A-Za-z0-9_]*)\s*\((.*?)\)\s*VALUES\s*\((.*?)\)\s*$",
    re.IGNORECASE | re.DOTALL,
)


class DatabaseConnection(ABC):
    @abstractmethod
    def execute(self, sql: str, params: tuple = ()) -> Any:
        ...

    @abstractmethod
    def executemany(self, sql: str, rows: List[tuple]) -> int:
        ...

    @abstractmethod
    def fetchone(self, sql: str, params: tuple = ()) -> Optional[Dict[str, Any]]:
        ...

    @abstractmethod
    def fetchall(self, sql: str, params: tuple = ()) -> List[Dict[str, Any]]:
        ...

    @abstractmethod
    def commit(self) -> None:
        ...

    @abstractmethod
    def rollback(self) -> None:
        ...

    @abstractmethod
    def close(self) -> None:
        ...


class Repository(ABC, Generic[T]):
    def __init__(self, conn: DatabaseConnection):
        self._conn = conn

    @abstractmethod
    def upsert(self, record: T) -> None:
        ...

    @abstractmethod
    def upsert_batch(self, records: List[T]) -> int:
        ...

    @abstractmethod
    def find_by_id(self, id: str) -> Optional[T]:
        ...


class PostgresConnection(DatabaseConnection):
    """
    Shared relational/timeseries Postgres wrapper.

    The normaliser intentionally handles a small subset of legacy SQLite SQL so
    older pipelines keep running while the codebase is being cleaned up.
    """

    def __init__(self, dsn: str):
        if not _PSYCOPG2_AVAILABLE:
            raise RuntimeError("psycopg2 is not installed. Run: pip install psycopg2-binary")
        self._raw = psycopg2.connect(dsn)
        self._raw.autocommit = False
        self._pk_cache: Dict[str, List[str]] = {}

    @property
    def raw_connection(self):
        return self._raw

    def _cursor(self):
        return self._raw.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    def _get_primary_key_columns(self, table_name: str) -> List[str]:
        if table_name in self._pk_cache:
            return self._pk_cache[table_name]
        cur = self._cursor()
        cur.execute(
            """
            SELECT kcu.column_name
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kcu
              ON tc.constraint_name = kcu.constraint_name
             AND tc.table_schema = kcu.table_schema
            WHERE tc.constraint_type = 'PRIMARY KEY'
              AND tc.table_schema = current_schema()
              AND tc.table_name = %s
            ORDER BY kcu.ordinal_position
            """,
            (table_name,),
        )
        columns = [row["column_name"] for row in cur.fetchall()]
        self._pk_cache[table_name] = columns
        return columns

    def _rewrite_insert_or_replace(self, sql: str) -> str:
        match = _INSERT_OR_REPLACE_RE.match(sql.strip().rstrip(";"))
        if not match:
            return sql
        table_name = match.group(1)
        column_list = [col.strip() for col in match.group(2).split(",") if col.strip()]
        value_list = match.group(3).strip()
        pk_columns = self._get_primary_key_columns(table_name)
        if not pk_columns:
            raise RuntimeError(f"Cannot rewrite INSERT OR REPLACE for {table_name}: no primary key found")
        update_columns = [col for col in column_list if col not in pk_columns]
        if update_columns:
            assignments = ", ".join(f"{col} = EXCLUDED.{col}" for col in update_columns)
            conflict_clause = f"ON CONFLICT ({', '.join(pk_columns)}) DO UPDATE SET {assignments}"
        else:
            conflict_clause = f"ON CONFLICT ({', '.join(pk_columns)}) DO NOTHING"
        return f"INSERT INTO {table_name} ({', '.join(column_list)}) VALUES ({value_list}) {conflict_clause}"

    def _normalise_sql(self, sql: str) -> str:
        normalized = sql
        normalized = re.sub(r"datetime\s*\(\s*'now'\s*\)", "NOW()", normalized, flags=re.IGNORECASE)
        normalized = re.sub(r"date\s*\(\s*'now'\s*\)", "CURRENT_DATE", normalized, flags=re.IGNORECASE)
        if re.match(r"^\s*INSERT\s+OR\s+REPLACE", normalized, flags=re.IGNORECASE):
            normalized = self._rewrite_insert_or_replace(normalized)
        normalized = normalized.replace("?", "%s")
        return normalized

    def execute(self, sql: str, params: tuple = ()) -> Any:
        cur = self._cursor()
        cur.execute(self._normalise_sql(sql), params or None)
        return cur

    def executemany(self, sql: str, rows: List[tuple]) -> int:
        cur = self._cursor()
        psycopg2.extras.execute_batch(cur, self._normalise_sql(sql), rows)
        return cur.rowcount

    def fetchone(self, sql: str, params: tuple = ()) -> Optional[Dict[str, Any]]:
        cur = self._cursor()
        cur.execute(self._normalise_sql(sql), params or None)
        row = cur.fetchone()
        return dict(row) if row else None

    def fetchall(self, sql: str, params: tuple = ()) -> List[Dict[str, Any]]:
        cur = self._cursor()
        cur.execute(self._normalise_sql(sql), params or None)
        return [dict(row) for row in cur.fetchall()]

    def commit(self) -> None:
        self._raw.commit()

    def rollback(self) -> None:
        self._raw.rollback()

    def close(self) -> None:
        self._raw.close()


@contextmanager
def get_pg_connection(dsn: Optional[str] = None) -> Iterator[PostgresConnection]:
    resolved_dsn = dsn or os.environ.get("PG_RELATIONAL_DSN", _PG_RELATIONAL_DSN_DEFAULT)
    conn = PostgresConnection(resolved_dsn)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


@contextmanager
def get_ts_connection(dsn: Optional[str] = None) -> Iterator[PostgresConnection]:
    resolved_dsn = dsn or os.environ.get("PG_TIMESERIES_DSN", _PG_TIMESERIES_DSN_DEFAULT)
    conn = PostgresConnection(resolved_dsn)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


@contextmanager
def get_connection(dsn: Optional[str] = None) -> Iterator[PostgresConnection]:
    with get_pg_connection(dsn) as conn:
        yield conn


def generate_id() -> str:
    return uuid.uuid4().hex


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(tzinfo=None).isoformat()


def init_db() -> str:
    """
    Bootstrap the relational Postgres schema.

    This is intentionally idempotent and no longer creates a SQLite database.
    """
    schema_path = Path(__file__).resolve().parents[1] / "db" / "init-postgres.sql"
    sql = schema_path.read_text()
    with get_pg_connection() as conn:
        conn.raw_connection.cursor().execute(sql)
    return os.environ.get("PG_RELATIONAL_DSN", _PG_RELATIONAL_DSN_DEFAULT)


def execute_query(sql: str, params: tuple = ()) -> List[Dict[str, Any]]:
    with get_db() as conn:
        cursor = conn.execute(sql, params)
        return [dict(row) for row in cursor.fetchall()]


def execute_one(sql: str, params: tuple = ()) -> Optional[Dict[str, Any]]:
    with get_db() as conn:
        cursor = conn.execute(sql, params)
        row = cursor.fetchone()
        return dict(row) if row else None


@contextmanager
def get_db(dsn: Optional[str] = None) -> Iterator[PostgresConnection]:
    """
    Legacy alias retained for pipeline compatibility.

    Older code still imports get_db() and expects a connection-like object with
    execute()/fetchall() semantics; it now returns the relational Postgres
    wrapper instead of the removed SQLite connection.
    """
    with get_pg_connection(dsn) as conn:
        yield conn
