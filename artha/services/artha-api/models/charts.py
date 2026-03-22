from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class ChartLayout(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    user_id: str
    name: str
    content: dict[str, object]
    is_default: bool
    created_at: datetime
    updated_at: datetime


class CreateLayoutRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str = Field(..., min_length=1, max_length=100)
    content: dict[str, object]
    is_default: bool = False


class UpdateLayoutRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str | None = Field(default=None, min_length=1, max_length=100)
    content: dict[str, object] | None = None
    is_default: bool | None = None


class ChartDrawings(BaseModel):
    model_config = ConfigDict(extra="forbid")

    user_id: str
    symbol: str
    timeframe: str
    content: list[dict[str, object]]
    updated_at: datetime


class SaveDrawingsRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    drawings: list[dict[str, object]]


class ChartAlert(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    user_id: str
    symbol: str
    price: float
    condition: Literal["above", "below"]
    message: str | None
    is_active: bool
    triggered_at: datetime | None
    created_at: datetime


class CreateAlertRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    symbol: str
    price: float = Field(..., gt=0)
    condition: Literal["above", "below"]
    message: str | None = Field(default=None, max_length=200)
