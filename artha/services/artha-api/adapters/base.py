from __future__ import annotations

from dataclasses import dataclass


@dataclass(slots=True)
class BaseAdapter:
    """Shared base class for domain adapters."""

    name: str
