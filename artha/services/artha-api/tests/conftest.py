from __future__ import annotations

import sys
from dataclasses import asdict
from datetime import UTC, date, datetime, timedelta
from pathlib import Path
from types import SimpleNamespace
from typing import Any, Iterator

import pandas as pd
import pytest
from jose import jwt


SERVICE_ROOT = Path(__file__).resolve().parents[1]
if str(SERVICE_ROOT) not in sys.path:
    sys.path.insert(0, str(SERVICE_ROOT))

from compute.simulation import CompletedTrade  # noqa: E402
from models.backtest import CostConfig, TaxConfig  # noqa: E402


TEST_SECRET = "test-secret-key-that-is-long-enough"


def make_token(
    sub: str = "user-123",
    secret: str = TEST_SECRET,
    algorithm: str = "HS256",
    audience: str = "authenticated",
    exp_delta_seconds: int = 3600,
) -> str:
    payload = {
        "sub": sub,
        "aud": audience,
        "exp": int((datetime.now(UTC) + timedelta(seconds=exp_delta_seconds)).timestamp()),
        "iat": int(datetime.now(UTC).timestamp()),
    }
    return jwt.encode(payload, secret, algorithm=algorithm)


def make_credentials(token: str) -> Any:
    from fastapi.security import HTTPAuthorizationCredentials

    return HTTPAuthorizationCredentials(scheme="Bearer", credentials=token)


def make_ohlcv_fixture(
    symbols: list[str],
    n_days: int,
    start_price: float = 100.0,
    start_date: date = date(2024, 1, 1),
) -> pd.DataFrame:
    records: list[dict[str, Any]] = []
    for sym_idx, symbol in enumerate(symbols):
        for day_idx in range(n_days):
            trade_date = start_date + timedelta(days=day_idx)
            base = start_price + (sym_idx * 7.5) + day_idx * (1.0 + sym_idx * 0.15)
            close = round(base + ((day_idx % 3) - 1) * 0.2, 4)
            open_price = round(close - 0.3, 4)
            high = round(close + 0.8, 4)
            low = round(close - 0.8, 4)
            volume = 100_000 + sym_idx * 5_000 + day_idx * 250
            records.append(
                {
                    "symbol": symbol.upper(),
                    "date": trade_date,
                    "open": open_price,
                    "high": high,
                    "low": low,
                    "close": close,
                    "volume": volume,
                }
            )
    frame = pd.DataFrame(records)
    return frame.sort_values(["symbol", "date"]).set_index(["symbol", "date"])


def make_completed_trade(**overrides: Any) -> CompletedTrade:
    payload: dict[str, Any] = {
        "symbol": "AAA",
        "company_name": "Alpha Ltd",
        "direction": "long",
        "entry_date": date(2024, 1, 1),
        "entry_price": 100.0,
        "exit_date": date(2024, 1, 11),
        "exit_price": 110.0,
        "shares": 100,
        "trade_value": 10_000.0,
        "gross_pnl": 1_000.0,
        "total_costs": 100.0,
        "tax": 50.0,
        "net_pnl": 850.0,
        "net_pnl_pct": 8.5,
        "duration_days": 10,
        "exit_reason": "criteria",
        "gains_type": "stcg",
        "net_proceeds": 10_850.0,
    }
    payload.update(overrides)
    return CompletedTrade(**payload)


def make_equity_curve(values: list[float], start_date: date = date(2024, 1, 1)) -> list[dict[str, Any]]:
    if not values:
        return []
    peak = float(values[0])
    benchmark_base = 100.0
    curve: list[dict[str, Any]] = []
    for idx, value in enumerate(values):
        peak = max(peak, float(value))
        drawdown_pct = ((float(value) - peak) / peak * 100) if peak else 0.0
        curve.append(
            {
                "date": (start_date + timedelta(days=idx)).isoformat(),
                "portfolio_value": float(value),
                "benchmark_value": benchmark_base + idx * 1.5,
                "drawdown_pct": round(drawdown_pct, 4),
            }
        )
    return curve


class FakeConnection:
    def __init__(
        self,
        fetch_results: list[Any] | None = None,
        fetchrow_results: list[Any] | None = None,
        execute_results: list[Any] | None = None,
    ) -> None:
        self.fetch_results = list(fetch_results or [])
        self.fetchrow_results = list(fetchrow_results or [])
        self.execute_results = list(execute_results or [])
        self.fetch_calls: list[tuple[str, tuple[Any, ...]]] = []
        self.fetchrow_calls: list[tuple[str, tuple[Any, ...]]] = []
        self.execute_calls: list[tuple[str, tuple[Any, ...]]] = []

    async def fetch(self, query: str, *args: Any) -> Any:
        self.fetch_calls.append((query, args))
        return self.fetch_results.pop(0) if self.fetch_results else []

    async def fetchrow(self, query: str, *args: Any) -> Any:
        self.fetchrow_calls.append((query, args))
        return self.fetchrow_results.pop(0) if self.fetchrow_results else None

    async def execute(self, query: str, *args: Any) -> Any:
        self.execute_calls.append((query, args))
        return self.execute_results.pop(0) if self.execute_results else "OK"


class _FakeConnContext:
    def __init__(self, conn: FakeConnection) -> None:
        self.conn = conn

    async def __aenter__(self) -> FakeConnection:
        return self.conn

    async def __aexit__(self, exc_type: Any, exc: Any, tb: Any) -> bool:
        return False


def make_get_pg_factory(connections: list[FakeConnection]):
    queue = list(connections)

    def _get_pg() -> _FakeConnContext:
        if not queue:
            raise AssertionError("No fake connections remaining")
        return _FakeConnContext(queue.pop(0))

    return _get_pg


@pytest.fixture
def cost_config() -> CostConfig:
    return CostConfig()


@pytest.fixture
def tax_config() -> TaxConfig:
    return TaxConfig()


@pytest.fixture
def test_settings() -> SimpleNamespace:
    return SimpleNamespace(
        SUPABASE_JWT_SECRET=TEST_SECRET,
        SUPABASE_URL="https://example.supabase.co",
    )


@pytest.fixture
def app_factory() -> Iterator[callable]:
    def _make_app(*routers: Any) -> Any:
        from fastapi import FastAPI

        app = FastAPI()
        app.state.process_pool = None
        for router in routers:
            app.include_router(router)
        return app

    yield _make_app
