from __future__ import annotations

from datetime import datetime
from typing import Any


def _isoformat(value: datetime | str | None) -> str | None:
    if value is None:
      return None
    if isinstance(value, datetime):
      return value.isoformat()
    return value


def ok(data: Any, as_of: datetime | str | None = None, coverage_pct: float | None = None) -> dict[str, Any]:
    return {
        "data": data,
        "meta": {
            "status": "ok",
            "as_of": _isoformat(as_of),
            "coverage_pct": coverage_pct,
            "latency_ms": 0,
        },
    }


def partial(
    data: Any,
    message: str,
    as_of: datetime | str | None = None,
    coverage_pct: float | None = None,
) -> dict[str, Any]:
    return {
        "data": data,
        "meta": {
            "status": "partial",
            "message": message,
            "as_of": _isoformat(as_of),
            "coverage_pct": coverage_pct,
            "latency_ms": 0,
        },
    }
