from __future__ import annotations

from datetime import datetime
from typing import Generic, TypeVar

from pydantic import BaseModel, ConfigDict


T = TypeVar("T")


class ApiMeta(BaseModel):
    model_config = ConfigDict(extra="forbid")

    status: str
    as_of: str | None = None
    coverage_pct: float | None = None
    latency_ms: float


class ApiEnvelope(BaseModel, Generic[T]):
    data: T
    meta: ApiMeta


class HealthResponse(BaseModel):
    status: str
    router: str | None = None
    timestamp: datetime | None = None
