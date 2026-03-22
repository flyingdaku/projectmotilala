from __future__ import annotations

from fastapi.testclient import TestClient

from routers import search_router, stocks_router
from routers import search as search_module
from routers import stocks as stocks_module


def test_unknown_symbol_when_overview_requested_then_returns_404(app_factory, monkeypatch, mocker) -> None:
    monkeypatch.setattr(stocks_module.stocks_adapter, "get_by_symbol", mocker.AsyncMock(return_value=None))
    app = app_factory(stocks_router)
    client = TestClient(app)

    response = client.get("/api/stocks/UNKNOWNSYMBOL/overview")

    assert response.status_code == 404


def test_overview_when_all_parallel_calls_succeed_then_returns_meta(app_factory, monkeypatch, mocker) -> None:
    monkeypatch.setattr(stocks_module.stocks_adapter, "get_by_symbol", mocker.AsyncMock(return_value={"id": "asset-1", "name": "TCS"}))
    monkeypatch.setattr(
        stocks_module.stocks_adapter,
        "get_detail",
        mocker.AsyncMock(
            return_value={
                "price": 100.0,
                "marketCapCr": 1000.0,
                "pe": 20.0,
                "roce": 15.0,
                "roe": 16.0,
                "avgVolume": 100_000.0,
                "high52w": 120.0,
                "low52w": 80.0,
                "listedDate": "2024-01-01",
                "sector": "IT",
                "industry": "Software",
            }
        ),
    )
    monkeypatch.setattr(stocks_module.company_adapter, "get_profile", mocker.AsyncMock(return_value={"descriptionShort": "Profile", "website": "https://example.com"}))
    monkeypatch.setattr(stocks_module.company_adapter, "get_corporate_actions", mocker.AsyncMock(return_value=[{"exDate": "2024-01-10"}]))
    monkeypatch.setattr(stocks_module.company_adapter, "get_events", mocker.AsyncMock(return_value=[{"eventDate": "2024-01-12"}]))
    app = app_factory(stocks_router)
    client = TestClient(app)

    response = client.get("/api/stocks/TCS/overview")

    assert response.status_code == 200
    assert "meta" in response.json()
    assert "hero" in response.json()["meta"]


def test_search_when_matches_found_then_returns_result_list(app_factory, monkeypatch, mocker) -> None:
    monkeypatch.setattr(
        search_module.stocks_adapter,
        "search",
        mocker.AsyncMock(
            return_value=[
                {"id": "1", "symbol": "TCS", "name": "TCS Ltd", "exchange": "NSE", "sector": "IT"},
                {"id": "2", "symbol": "TATAELXSI", "name": "Tata Elxsi", "exchange": "NSE", "sector": "IT"},
                {"id": "3", "symbol": "TATATECH", "name": "Tata Technologies", "exchange": "NSE", "sector": "IT"},
            ]
        ),
    )
    app = app_factory(search_router)
    client = TestClient(app)

    response = client.get("/api/search?q=TCS")

    assert response.status_code == 200
    assert len(response.json()["results"]) == 3


def test_search_when_query_empty_then_rejected_by_validation(app_factory) -> None:
    app = app_factory(search_router)
    client = TestClient(app)

    response = client.get("/api/search?q=")

    assert response.status_code == 422


def test_financials_when_symbol_resolves_then_returns_quarterly_and_annual(app_factory, monkeypatch, mocker) -> None:
    monkeypatch.setattr(stocks_module.stocks_adapter, "get_by_symbol", mocker.AsyncMock(return_value={"id": "asset-1", "name": "TCS"}))
    monkeypatch.setattr(
        stocks_module.company_adapter,
        "get_financials",
        mocker.AsyncMock(
            return_value={
                "quarterly": [{"periodEnd": "2024-03-31"}],
                "annual": [{"periodEnd": "2024-03-31"}],
                "balanceSheet": [{"periodEndDate": "2024-03-31"}],
                "cashFlow": [{"periodEndDate": "2024-03-31"}],
                "ratios": [{"periodEndDate": "2024-03-31"}],
                "anomalies": [],
            }
        ),
    )
    app = app_factory(stocks_router)
    client = TestClient(app)

    response = client.get("/api/stocks/TCS/financials")

    assert response.status_code == 200
    assert "quarterly" in response.json()
    assert "annual" in response.json()
