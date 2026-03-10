"""
Database abstraction layer for the Artha data pipeline.

Provides a dialect-agnostic interface so pipelines never import sqlite3 directly.
When migrating to PostgreSQL/ClickHouse, only the concrete connection class and
repository implementations need to change — all pipeline code remains untouched.
"""
from __future__ import annotations

import os
import sqlite3
import uuid
import logging
from pathlib import Path
from abc import ABC, abstractmethod
from contextlib import contextmanager
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any, TypeVar, Generic, Iterator

logger = logging.getLogger(__name__)

T = TypeVar("T")


# ═══════════════════════════════════════════════════════════════════════════════
# Abstract Interfaces
# ═══════════════════════════════════════════════════════════════════════════════

class DatabaseConnection(ABC):
    """
    Abstract database connection.

    Concrete implementations wrap a specific driver (sqlite3, psycopg2, etc.)
    and expose a uniform interface to repositories and pipelines.
    """

    @abstractmethod
    def execute(self, sql: str, params: tuple = ()) -> Any:
        """Execute a single SQL statement. Returns cursor-like object."""
        ...

    @abstractmethod
    def executemany(self, sql: str, rows: List[tuple]) -> int:
        """Execute a batch statement. Returns number of affected rows."""
        ...

    @abstractmethod
    def fetchone(self, sql: str, params: tuple = ()) -> Optional[Dict[str, Any]]:
        """Execute SELECT, return first row as dict or None."""
        ...

    @abstractmethod
    def fetchall(self, sql: str, params: tuple = ()) -> List[Dict[str, Any]]:
        """Execute SELECT, return all rows as list of dicts."""
        ...

    @abstractmethod
    def commit(self) -> None: ...

    @abstractmethod
    def rollback(self) -> None: ...

    @abstractmethod
    def close(self) -> None: ...


class Repository(ABC, Generic[T]):
    """
    Base repository — typed CRUD interface for a single domain entity.

    Concrete repositories (AssetRepository, PriceRepository, etc.) implement
    the abstract methods with SQL specific to their table(s).
    """

    def __init__(self, conn: DatabaseConnection):
        self._conn = conn

    @abstractmethod
    def upsert(self, record: T) -> None:
        """Insert or update a single record."""
        ...

    @abstractmethod
    def upsert_batch(self, records: List[T]) -> int:
        """Insert or update many records. Returns count of affected rows."""
        ...

    @abstractmethod
    def find_by_id(self, id: str) -> Optional[T]:
        """Retrieve a record by its primary key."""
        ...


# ═══════════════════════════════════════════════════════════════════════════════
# SQLite Implementation
# ═══════════════════════════════════════════════════════════════════════════════

DEFAULT_DB_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)), "db", "market_data.db"
)

DB_PATH = DEFAULT_DB_PATH


class SqliteConnection(DatabaseConnection):
    """
    SQLite-specific connection wrapper.

    Features:
    - WAL mode for concurrent read/write
    - Foreign key enforcement
    - Row factory returns dicts
    - Configurable path (defaults to db/market_data.db)
    """

    def __init__(self, db_path: Optional[str] = None, timeout: float = 120.0):
        self._db_path = db_path or DEFAULT_DB_PATH
        self._conn = sqlite3.connect(self._db_path, timeout=timeout)
        self._conn.row_factory = sqlite3.Row
        self._conn.execute("PRAGMA journal_mode=WAL;")
        self._conn.execute("PRAGMA busy_timeout=90000;")  # 90s busy wait
        self._conn.execute("PRAGMA foreign_keys=ON;")

    def execute(self, sql: str, params: tuple = ()) -> sqlite3.Cursor:
        return self._conn.execute(sql, params)

    def executemany(self, sql: str, rows: List[tuple]) -> int:
        cursor = self._conn.executemany(sql, rows)
        return cursor.rowcount

    def fetchone(self, sql: str, params: tuple = ()) -> Optional[Dict[str, Any]]:
        cursor = self._conn.execute(sql, params)
        row = cursor.fetchone()
        return dict(row) if row else None

    def fetchall(self, sql: str, params: tuple = ()) -> List[Dict[str, Any]]:
        cursor = self._conn.execute(sql, params)
        return [dict(r) for r in cursor.fetchall()]

    def commit(self) -> None:
        self._conn.commit()

    def rollback(self) -> None:
        self._conn.rollback()

    def close(self) -> None:
        self._conn.close()

    @property
    def raw_connection(self) -> sqlite3.Connection:
        """Escape hatch for direct sqlite3 access during migration period."""
        return self._conn


@contextmanager
def get_connection(db_path: Optional[str] = None) -> Iterator[SqliteConnection]:
    """
    Context manager — drop-in replacement for the old utils.db.get_db().

    Usage:
        from core.db import get_connection
        with get_connection() as conn:
            rows = conn.fetchall("SELECT * FROM assets LIMIT 5")
    """
    conn = SqliteConnection(db_path)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


# ═══════════════════════════════════════════════════════════════════════════════
# Backwards-Compatible Helpers (used during migration period)
# ═══════════════════════════════════════════════════════════════════════════════

def generate_id() -> str:
    """Generate a UUID hex string — same as utils.db.generate_id()."""
    return uuid.uuid4().hex


def now_iso() -> str:
    """Current UTC timestamp in ISO 8601 format."""
    return datetime.now(timezone.utc).replace(tzinfo=None).isoformat()


def init_db(db_path: Optional[str] = None) -> str:
    resolved_db_path = db_path or DEFAULT_DB_PATH
    schema_path = Path(__file__).resolve().parents[1] / "db" / "schema.sql"
    with sqlite3.connect(resolved_db_path, timeout=30.0) as conn:
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("PRAGMA foreign_keys=ON;")
        conn.executescript(schema_path.read_text())
        conn.commit()
    return resolved_db_path


def execute_query(sql: str, params: tuple = (), db_path: Optional[str] = None) -> List[Dict[str, Any]]:
    with get_db(db_path) as conn:
        cursor = conn.execute(sql, params)
        return [dict(row) for row in cursor.fetchall()]


def execute_one(sql: str, params: tuple = (), db_path: Optional[str] = None) -> Optional[Dict[str, Any]]:
    with get_db(db_path) as conn:
        cursor = conn.execute(sql, params)
        row = cursor.fetchone()
        return dict(row) if row else None


# Legacy alias — pipelines still import `get_db` from utils.db.
# During migration, utils/db.py will be updated to delegate here.
@contextmanager
def get_db(db_path: Optional[str] = None):
    """
    Legacy context manager that returns a raw sqlite3.Connection.

    This exists solely for backwards compatibility with existing pipeline code
    that calls conn.execute() directly. New code should use get_connection().
    """
    conn = sqlite3.connect(db_path or DEFAULT_DB_PATH, timeout=30.0)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA foreign_keys=ON;")
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()
