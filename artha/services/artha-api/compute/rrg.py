from __future__ import annotations

from typing import Any


def determine_quadrant(rs_ratio: float, rs_momentum: float) -> str:
    if rs_ratio >= 100 and rs_momentum >= 0:
        return "leading"
    if rs_ratio >= 100 and rs_momentum < 0:
        return "weakening"
    if rs_ratio < 100 and rs_momentum < 0:
        return "lagging"
    return "improving"


def get_quadrant_color(quadrant: str) -> str:
    colors = {
        "leading": "#10B981",
        "weakening": "#F59E0B",
        "lagging": "#EF4444",
        "improving": "#3B82F6",
    }
    return colors[quadrant]


def compute_rrg_data(sector_metrics: list[dict[str, Any]]) -> list[dict[str, Any]]:
    enriched: list[dict[str, Any]] = []
    for item in sector_metrics:
        rs_ratio = float(item.get("rsRatio", item.get("rs_ratio", 0.0)) or 0.0)
        rs_momentum = float(item.get("rsMomentum", item.get("rs_momentum", 0.0)) or 0.0)
        quadrant = determine_quadrant(rs_ratio, rs_momentum)
        enriched.append(
            {
                **item,
                "quadrant": quadrant,
                "color": get_quadrant_color(quadrant),
            }
        )
    return enriched
