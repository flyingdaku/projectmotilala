from __future__ import annotations

from fastapi.testclient import TestClient

from routers import screener_router
from routers import screener as screener_module
from tests.conftest import FakeConnection, make_get_pg_factory


def test_screener_meta_when_mocked_data_then_returns_200(app_factory, monkeypatch) -> None:
    screener_module._META_CACHE["value"] = None
    screener_module._META_CACHE["ts"] = 0.0
    sector_conn = FakeConnection(fetch_results=[[{"sector": "IT"}, {"sector": "Banking"}]])
    index_conn = FakeConnection(fetch_results=[[{"name": "NIFTY 50"}]])
    monkeypatch.setattr(screener_module, "get_pg", make_get_pg_factory([sector_conn, index_conn]))
    app = app_factory(screener_router)
    client = TestClient(app)

    response = client.get("/api/screener/meta")

    assert response.status_code == 200
    assert "sectors" in response.json()
    assert "IT" in response.json()["sectors"]


def test_screener_run_when_basic_filter_then_returns_matching_rows(app_factory, monkeypatch) -> None:
    count_conn = FakeConnection(fetchrow_results=[{"count": 2}])
    data_conn = FakeConnection(
        fetch_results=[
            [
                {
                    "symbol": "AAA",
                    "name": "Alpha",
                    "sector": "IT",
                    "industryGroup": "Software",
                    "assetClass": "EQUITY",
                    "marketCapCr": 1500.0,
                    "price": 100.0,
                    "pctChange": 1.2,
                    "pe": 20.0,
                    "pb": 3.0,
                    "evEbitda": 12.0,
                    "dividendYield": 1.1,
                    "roce": 18.0,
                    "roe": 16.0,
                    "patMargin": 12.0,
                    "operatingMargin": 18.0,
                    "revenueGrowth1y": 14.0,
                    "patGrowth1y": 11.0,
                    "epsGrowth1y": 9.0,
                    "debtEquity": 0.1,
                    "qualityScore": 80.0,
                    "rsi14": 45.0,
                    "pctFrom52wHigh": -5.0,
                    "sma20": 98.0,
                    "sma50": 95.0,
                    "sma200": 90.0,
                },
                {
                    "symbol": "BBB",
                    "name": "Beta",
                    "sector": "IT",
                    "industryGroup": "Software",
                    "assetClass": "EQUITY",
                    "marketCapCr": 2000.0,
                    "price": 120.0,
                    "pctChange": -0.5,
                    "pe": 24.0,
                    "pb": 4.0,
                    "evEbitda": 15.0,
                    "dividendYield": 0.8,
                    "roce": 15.0,
                    "roe": 14.0,
                    "patMargin": 10.0,
                    "operatingMargin": 16.0,
                    "revenueGrowth1y": 10.0,
                    "patGrowth1y": 8.0,
                    "epsGrowth1y": 7.0,
                    "debtEquity": 0.2,
                    "qualityScore": 74.0,
                    "rsi14": 55.0,
                    "pctFrom52wHigh": -8.0,
                    "sma20": 118.0,
                    "sma50": 112.0,
                    "sma200": 105.0,
                },
            ]
        ]
    )
    monkeypatch.setattr(screener_module, "get_pg", make_get_pg_factory([count_conn, data_conn]))
    app = app_factory(screener_router)
    client = TestClient(app)

    response = client.post("/api/screener/run", json={"filters": {"marketCapCr": {"min": 1000}}, "limit": 10})

    assert response.status_code == 200
    assert len(response.json()["results"]) == 2


def test_screener_run_when_invalid_formula_then_returns_422(app_factory) -> None:
    app = app_factory(screener_router)
    client = TestClient(app)

    response = client.post("/api/screener/run", json={"filters": {"formula": ["unknownfield < 30"]}})

    assert response.status_code == 422
    assert "unknownfield" in response.json()["detail"]


def test_screener_run_when_limit_exceeds_max_then_validation_blocks_or_caps(app_factory) -> None:
    app = app_factory(screener_router)
    client = TestClient(app)

    response = client.post("/api/screener/run", json={"limit": 9999})

    assert response.status_code == 422
