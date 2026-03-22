from __future__ import annotations

from datetime import UTC, datetime
from typing import Any, Callable


def clamp_coverage(value: float) -> float:
    if value != value or value == float("inf") or value == float("-inf"):
        return 0.0
    return max(0.0, min(1.0, value))


def has_data_value(value: Any) -> bool:
    if value is None:
        return False
    if isinstance(value, str):
        return value.strip() != ""
    if isinstance(value, (list, tuple, dict, set)):
        return len(value) > 0
    return True


def get_coverage(values: list[Any]) -> float:
    if not values:
        return 0.0
    populated = sum(1 for value in values if has_data_value(value))
    return clamp_coverage(populated / len(values))


def get_object_coverage(record: dict[str, Any] | None, keys: list[str]) -> float:
    if not record:
        return 0.0
    return get_coverage([record.get(key) for key in keys])


def get_dataset_coverage(rows: list[Any] | None, selectors: list[Callable[[Any], Any]]) -> float:
    if not rows or not selectors:
        return 0.0
    total = 0
    populated = 0
    for row in rows:
        for selector in selectors:
            total += 1
            if has_data_value(selector(row)):
                populated += 1
    return clamp_coverage(populated / total) if total else 0.0


def get_latest_date(candidates: list[str | None]) -> str | None:
    parsed: list[tuple[str, float]] = []
    for value in candidates:
        if not value:
            continue
        try:
            parsed.append((value, datetime.fromisoformat(value.replace("Z", "+00:00")).timestamp()))
        except ValueError:
            continue
    if not parsed:
        for candidate in candidates:
            if candidate:
                return candidate
        return None
    parsed.sort(key=lambda item: item[1], reverse=True)
    return parsed[0][0]


def build_data_meta(input_data: dict[str, Any]) -> dict[str, Any]:
    as_of = input_data.get("asOf") or get_latest_date(input_data.get("asOfCandidates", []))
    coverage = clamp_coverage(float(input_data.get("coverage", 0.0)))
    status = input_data.get("status") or ("unavailable" if coverage <= 0 else "partial" if coverage < 0.999 else "delayed")
    return {
        "asOf": as_of,
        "status": status,
        "coverage": coverage,
        "note": input_data.get("note"),
        "unitLabel": input_data.get("unitLabel"),
    }


def compute_coverage(latest_date: datetime | None) -> dict[str, Any]:
    if latest_date is None:
        return {"status": "unavailable", "coverage_pct": 0.0, "as_of": None}

    now = datetime.now(UTC)
    reference = latest_date if latest_date.tzinfo else latest_date.replace(tzinfo=UTC)
    staleness = max((now - reference).days, 0)

    if staleness <= 1:
        status = "live"
    elif staleness <= 7:
        status = "delayed"
    elif staleness <= 90:
        status = "partial"
    else:
        status = "unavailable"

    if staleness <= 7:
        coverage_pct = 100.0
    elif staleness > 90:
        coverage_pct = 0.0
    else:
        span = 90 - 7
        remaining = 90 - staleness
        coverage_pct = max(0.0, round((remaining / span) * 100, 2))

    return {"status": status, "coverage_pct": coverage_pct, "as_of": reference.isoformat()}


def annotate_meta(rows: list[dict[str, Any]], date_field: str) -> dict[str, Any]:
    latest: datetime | None = None
    for row in rows:
        raw = row.get(date_field)
        if raw is None:
            continue
        if isinstance(raw, datetime):
            candidate = raw
        else:
            try:
                candidate = datetime.fromisoformat(str(raw).replace("Z", "+00:00"))
            except ValueError:
                continue
        if latest is None or candidate > latest:
            latest = candidate
    return compute_coverage(latest)
