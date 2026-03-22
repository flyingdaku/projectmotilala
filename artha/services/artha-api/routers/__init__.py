"""Router exports for the Artha FastAPI service."""

from routers.analytics import router as analytics_router
from routers.backtest import criteria_router, router as backtest_router
from routers.charts import router as charts_router
from routers.dashboard import router as dashboard_router
from routers.feed import router as feed_router
from routers.screener import router as screener_router
from routers.search import router as search_router
from routers.sectors import router as sectors_router
from routers.stocks import router as stocks_router

__all__ = [
    "analytics_router",
    "backtest_router",
    "criteria_router",
    "charts_router",
    "dashboard_router",
    "feed_router",
    "screener_router",
    "search_router",
    "sectors_router",
    "stocks_router",
]
