import sqlite3
import uuid
import os
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from contextlib import contextmanager

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "db", "market_data.db")


@contextmanager
def get_db():
    """Context manager for SQLite connections with WAL mode and FK enforcement."""
    conn = sqlite3.connect(DB_PATH)
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


def generate_id() -> str:
    """Generate a UUID as a hex string."""
    return uuid.uuid4().hex


def now_iso() -> str:
    """Current UTC timestamp in ISO 8601 format."""
    return datetime.now(timezone.utc).replace(tzinfo=None).isoformat()


def execute_query(query: str, params: tuple = ()) -> List[Dict[str, Any]]:
    """Execute a SELECT query and return results as a list of dicts."""
    with get_db() as conn:
        cursor = conn.execute(query, params)
        return [dict(row) for row in cursor.fetchall()]


def execute_one(query: str, params: tuple = ()) -> Optional[Dict[str, Any]]:
    """Execute a SELECT query and return a single row as dict, or None."""
    with get_db() as conn:
        cursor = conn.execute(query, params)
        row = cursor.fetchone()
        return dict(row) if row else None


def execute_write(query: str, params: tuple = ()) -> int:
    """Execute an INSERT/UPDATE/DELETE and return affected row count."""
    with get_db() as conn:
        cursor = conn.execute(query, params)
        return cursor.rowcount


def execute_many(query: str, params_list: List[tuple]) -> int:
    """Execute a batch INSERT/UPDATE and return total affected rows."""
    with get_db() as conn:
        cursor = conn.executemany(query, params_list)
        return cursor.rowcount


def init_db():
    """Initialize the database by running schema.sql."""
    schema_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "db", "schema.sql")
    with open(schema_path, "r") as f:
        schema_sql = f.read()
    with get_db() as conn:
        conn.executescript(schema_sql)
    print(f"✅ Database initialized at: {DB_PATH}")


def get_asset_id_by_isin(isin: str) -> Optional[str]:
    """Resolve ISIN to internal asset_id."""
    row = execute_one("SELECT id FROM assets WHERE isin = ?", (isin,))
    return row["id"] if row else None


def get_asset_id_by_nse_symbol(symbol: str) -> Optional[str]:
    """Resolve NSE symbol to internal asset_id."""
    row = execute_one("SELECT id FROM assets WHERE nse_symbol = ?", (symbol,))
    return row["id"] if row else None
