"""
IndiaQuant Analytics Engine
FastAPI microservice for heavy financial computation.

Design patterns:
- Strategy: pluggable backtest strategies (AssetAllocation, SIP, Lumpsum, Dynamic)
- Repository: all DB access via SupabaseRepository
- Factory: report generators

Endpoints are consumed by the Expo client via TanStack Query.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import backtest, monte_carlo, xirr, screener, factor_analysis

app = FastAPI(
    title="IndiaQuant Analytics Engine",
    version="1.0.0",
    description="Heavy financial computation: backtesting, Monte Carlo, XIRR, factor analysis",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten in production via env var
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(backtest.router, prefix="/backtest", tags=["Backtest"])
app.include_router(monte_carlo.router, prefix="/monte-carlo", tags=["Monte Carlo"])
app.include_router(xirr.router, prefix="/xirr", tags=["XIRR"])
app.include_router(screener.router, prefix="/screener", tags=["Screener"])
app.include_router(factor_analysis.router, prefix="/factor-analysis", tags=["Factor Analysis"])


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "analytics-engine"}
