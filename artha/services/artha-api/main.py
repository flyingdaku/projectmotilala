from __future__ import annotations

import logging
import time
from contextlib import asynccontextmanager
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor

import asyncpg
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

import core.db as db
from core.cache import cache_stats
from core.config import Settings, get_settings
from core.db import close_pools, init_pools
from core.rate_limit import limiter
from routers import (
    analytics_router,
    backtest_router,
    charts_router,
    criteria_router,
    dashboard_router,
    feed_router,
    screener_router,
    search_router,
    sectors_router,
    stocks_router,
)
from workers.job_listener import BacktestJobListener


logger = logging.getLogger("artha_api")


def _create_compute_pool(max_workers: int) -> ProcessPoolExecutor | ThreadPoolExecutor:
    try:
        return ProcessPoolExecutor(max_workers=max_workers)
    except (PermissionError, OSError) as exc:
        logger.warning("Falling back to ThreadPoolExecutor for compute pool: %s", exc)
        return ThreadPoolExecutor(max_workers=max_workers)


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings: Settings = get_settings()
    logging.basicConfig(level=getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO))
    await init_pools(settings)
    process_pool = _create_compute_pool(settings.PROCESS_POOL_WORKERS)
    app.state.process_pool = process_pool
    app.state.settings = settings
    if db.pg_pool is None or db.ts_pool is None:
        raise RuntimeError("Database pools failed to initialize")
    listener = BacktestJobListener(db.pg_pool, db.ts_pool, process_pool)
    await listener.start()
    app.state.listener = listener
    logger.info("Artha API started")
    try:
        yield
    finally:
        await app.state.listener.stop()
        process_pool.shutdown(wait=True, cancel_futures=True)
        await close_pools()
        logger.info("Artha API stopped cleanly")


app = FastAPI(
    title="Artha API",
    version="0.1.0",
    lifespan=lifespan,
    default_response_class=ORJSONResponse,
)

settings = get_settings()
app.state.limiter = limiter
app.state.started_at = time.time()
app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - start) * 1000
    response.headers["X-Process-Time"] = f"{duration_ms:.2f}ms"
    return response


@app.exception_handler(asyncpg.PostgresError)
async def asyncpg_exception_handler(_: Request, exc: asyncpg.PostgresError) -> ORJSONResponse:
    logger.exception("Database error", exc_info=exc)
    return ORJSONResponse(
        status_code=500,
        content={"detail": "Internal database error"},
    )


@app.exception_handler(ValueError)
async def value_error_handler(_: Request, exc: ValueError) -> ORJSONResponse:
    return ORJSONResponse(
        status_code=400,
        content={"detail": str(exc)},
    )


@app.exception_handler(RateLimitExceeded)
async def custom_rate_limit_handler(_: Request, exc: RateLimitExceeded) -> ORJSONResponse:
    retry_after = getattr(exc, "retry_after", 60)
    return ORJSONResponse(
        status_code=429,
        content={"detail": f"Rate limit exceeded. Retry after {retry_after}s"},
        headers={"Retry-After": str(retry_after)},
    )


@app.get("/health")
async def health() -> dict[str, object]:
    pg_pool = db.pg_pool
    ts_pool = db.ts_pool
    now = time.time()
    return {
        "status": "ok",
        "pools": {
            "pg": {
                "size": pg_pool.get_size() if pg_pool is not None else 0,
                "free": pg_pool.get_idle_size() if pg_pool is not None else 0,
            },
            "ts": {
                "size": ts_pool.get_size() if ts_pool is not None else 0,
                "free": ts_pool.get_idle_size() if ts_pool is not None else 0,
            },
        },
        "caches": cache_stats(),
        "uptime_seconds": round(now - float(app.state.started_at), 3),
    }


app.include_router(search_router)
app.include_router(stocks_router)
app.include_router(screener_router)
app.include_router(sectors_router)
app.include_router(analytics_router)
app.include_router(feed_router)
app.include_router(dashboard_router)
app.include_router(charts_router)
app.include_router(backtest_router)
app.include_router(criteria_router)
