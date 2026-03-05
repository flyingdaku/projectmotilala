"""
Source registry and abstract ingester interface.

Every data source (NSE Bhavcopy, BSE Bhavcopy, Screener Fundamentals, etc.)
implements the SourceIngester protocol and registers itself here. Pipeline
orchestrators can then iterate over registered sources without knowing
implementation details.
"""
from __future__ import annotations

import logging
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import date
from typing import Any, Dict, List, Optional, Type

from core.db import DatabaseConnection, generate_id, now_iso
from core.models import PipelineRun

logger = logging.getLogger(__name__)


# ═══════════════════════════════════════════════════════════════════════════════
# Abstract Ingester
# ═══════════════════════════════════════════════════════════════════════════════

class SourceIngester(ABC):
    """
    Base class for all data source ingesters.

    Subclasses implement:
      - fetch()  — download/parse data for a given trade date
      - ingest() — write parsed records into the database

    The run() template method handles timing, error capture, and audit logging.
    """

    # Subclasses MUST define these class attributes
    SOURCE_ID: str = ""               # e.g. "NSE_BHAVCOPY"
    PIPELINE_TYPE: str = "DAILY"      # DAILY | BACKFILL | WEEKLY

    @abstractmethod
    def fetch(self, trade_date: date) -> List[Any]:
        """
        Download or read data for the given date.
        Returns a list of parsed records (dataclass instances or dicts).
        """
        ...

    @abstractmethod
    def ingest(self, records: List[Any], conn: DatabaseConnection) -> int:
        """
        Write parsed records into the database.
        Returns count of records inserted/updated.
        """
        ...

    def run(self, trade_date: date, conn: DatabaseConnection) -> PipelineRun:
        """
        Template method: fetch → ingest → audit log.

        Override this only if you need custom orchestration (e.g. multi-step
        ingestion with intermediate verification).
        """
        import time
        run_id = generate_id()
        t0 = time.time()

        try:
            records = self.fetch(trade_date)
            count = self.ingest(records, conn)
            duration_ms = int((time.time() - t0) * 1000)

            run = PipelineRun(
                id=run_id,
                run_date=trade_date.isoformat(),
                source=self.SOURCE_ID,
                status="SUCCESS",
                pipeline_type=self.PIPELINE_TYPE,
                records_inserted=count,
                duration_ms=duration_ms,
            )
            logger.info(
                "[%s] ✅ %d records in %dms", self.SOURCE_ID, count, duration_ms
            )
            return run

        except Exception as e:
            duration_ms = int((time.time() - t0) * 1000)
            logger.error("[%s] ❌ Failed after %dms: %s", self.SOURCE_ID, duration_ms, e)
            return PipelineRun(
                id=run_id,
                run_date=trade_date.isoformat(),
                source=self.SOURCE_ID,
                status="FAILED",
                pipeline_type=self.PIPELINE_TYPE,
                error_log=str(e)[:2000],
                duration_ms=duration_ms,
            )


# ═══════════════════════════════════════════════════════════════════════════════
# Registry
# ═══════════════════════════════════════════════════════════════════════════════

_REGISTRY: Dict[str, Type[SourceIngester]] = {}


def register_source(cls: Type[SourceIngester]) -> Type[SourceIngester]:
    """
    Class decorator that registers a SourceIngester subclass.

    Usage:
        @register_source
        class NseBhavcopIngester(SourceIngester):
            SOURCE_ID = "NSE_BHAVCOPY"
            ...
    """
    if not cls.SOURCE_ID:
        raise ValueError(f"{cls.__name__} must define SOURCE_ID")
    _REGISTRY[cls.SOURCE_ID] = cls
    logger.debug("Registered source: %s → %s", cls.SOURCE_ID, cls.__name__)
    return cls


def get_source(source_id: str) -> Type[SourceIngester]:
    """Retrieve a registered ingester class by source ID."""
    if source_id not in _REGISTRY:
        raise KeyError(
            f"Source '{source_id}' not registered. "
            f"Available: {list(_REGISTRY.keys())}"
        )
    return _REGISTRY[source_id]


def list_sources(pipeline_type: Optional[str] = None) -> List[str]:
    """List all registered source IDs, optionally filtered by pipeline type."""
    if pipeline_type:
        return [
            sid for sid, cls in _REGISTRY.items()
            if cls.PIPELINE_TYPE == pipeline_type
        ]
    return list(_REGISTRY.keys())
