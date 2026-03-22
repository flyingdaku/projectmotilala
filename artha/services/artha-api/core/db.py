from __future__ import annotations

from contextlib import asynccontextmanager
from typing import AsyncIterator, Callable

import asyncpg

from core.config import Settings
from core.exceptions import DatabaseError


pg_pool: asyncpg.Pool | None = None
ts_pool: asyncpg.Pool | None = None


def _build_setup_conn(statement_timeout: str) -> Callable[[asyncpg.Connection], object]:
    async def _setup_conn(conn: asyncpg.Connection) -> None:
        await conn.execute("SET timezone = 'Asia/Kolkata'")
        await conn.execute(f"SET statement_timeout = '{statement_timeout}'")

    return _setup_conn


async def init_pools(settings: Settings) -> None:
    global pg_pool, ts_pool

    if pg_pool is None:
        pg_pool = await asyncpg.create_pool(
            dsn=settings.PG_DATABASE_URL,
            min_size=settings.PG_POOL_MIN,
            max_size=settings.PG_POOL_MAX,
            max_inactive_connection_lifetime=300,
            max_queries=50_000,
            init=_build_setup_conn("45s"),
        )

    if ts_pool is None:
        ts_pool = await asyncpg.create_pool(
            dsn=settings.TS_DATABASE_URL,
            min_size=settings.TS_POOL_MIN,
            max_size=settings.TS_POOL_MAX,
            max_inactive_connection_lifetime=300,
            max_queries=50_000,
            init=_build_setup_conn("120s"),
        )


async def close_pools() -> None:
    global pg_pool, ts_pool

    if pg_pool is not None:
        await pg_pool.close()
        pg_pool = None

    if ts_pool is not None:
        await ts_pool.close()
        ts_pool = None


@asynccontextmanager
async def get_pg() -> AsyncIterator[asyncpg.Connection]:
    if pg_pool is None:
        raise DatabaseError("Relational database pool is not initialized")
    async with pg_pool.acquire() as conn:
        yield conn


@asynccontextmanager
async def get_ts() -> AsyncIterator[asyncpg.Connection]:
    if ts_pool is None:
        raise DatabaseError("Timeseries database pool is not initialized")
    async with ts_pool.acquire() as conn:
        yield conn
