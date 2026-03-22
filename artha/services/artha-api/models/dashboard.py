from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field


WidgetType = Literal["table", "pie", "bar", "horizontal_bar", "line", "area", "heatmap", "metric"]


class WidgetColumn(BaseModel):
    model_config = ConfigDict(extra="forbid", populate_by_name=True)

    id: str
    label: str
    dslName: str
    dbColumn: str | None = None
    aggregation: Literal["none", "sum", "avg", "min", "max", "count"] | None = None
    format: Literal["number", "percent", "currency", "text"] | None = None
    width: int | None = None
    colorCode: bool | None = None


class ChartConfig(BaseModel):
    model_config = ConfigDict(extra="forbid")

    xAxis: str | None = None
    yAxis: str | None = None
    colorField: str | None = None
    sizeField: str | None = None
    multiYAxis: bool | None = None
    transpose: bool | None = None
    showLegend: bool | None = None
    showLabels: bool | None = None
    donut: bool | None = None


class WidgetConfig(BaseModel):
    model_config = ConfigDict(extra="allow")

    columns: list[WidgetColumn] = Field(default_factory=list)
    filters: dict[str, Any] = Field(default_factory=dict)
    groupColumn: str | None = None
    sortColumn: str | None = None
    sortDirection: Literal["asc", "desc"] | None = None
    limit: int | None = None
    dataPerSymbol: int | None = None
    chartConfig: ChartConfig | None = None
    refreshInterval: int | None = None
    metricColumn: str | None = None
    metricLabel: str | None = None
    metricPrefix: str | None = None
    metricSuffix: str | None = None


class GridLayoutItem(BaseModel):
    model_config = ConfigDict(extra="forbid")

    i: str
    x: int
    y: int
    w: int
    h: int
    minW: int | None = None
    minH: int | None = None


class UserWidget(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    dashboard_id: str
    widget_type: WidgetType
    title: str
    config_json: WidgetConfig | dict[str, Any]
    sort_order: int
    created_at: str | None = None
    updated_at: str | None = None


class UserDashboard(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    user_id: str
    name: str
    is_default: bool
    layout_json: list[GridLayoutItem] | list[dict[str, Any]]
    widgets: list[UserWidget] | None = None
    created_at: str | None = None
    updated_at: str | None = None


class DashboardSummary(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    name: str
    is_default: bool
    widget_count: int
    updated_at: str


class WidgetQueryRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    config: WidgetConfig
    widget_type: WidgetType


class WidgetQueryResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    rows: list[dict[str, Any]]
    columns: list[WidgetColumn]
    total: int
    cached: bool | None = None
    meta: dict[str, Any] | None = None


class PresetWidget(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    name: str
    description: str
    widget_type: WidgetType
    category: str
    defaultLayout: dict[str, int]
    config: WidgetConfig


class CreateDashboardRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str | None = None


class UpdateDashboardRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str | None = None
    layout_json: list[GridLayoutItem] | list[dict[str, Any]] | None = None
    is_default: bool | None = None


class CreateWidgetRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    widget_type: WidgetType
    title: str | None = None
    config_json: WidgetConfig | dict[str, Any] | None = None


class UpdateWidgetRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str | None = None
    widget_type: WidgetType | None = None
    config_json: WidgetConfig | dict[str, Any] | None = None

