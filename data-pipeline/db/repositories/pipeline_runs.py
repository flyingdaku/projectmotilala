"""
Pipeline Runs Repository — audit log for all pipeline executions.
"""
from __future__ import annotations

import logging
from typing import Optional, List

from core.db import DatabaseConnection, Repository
from core.models import PipelineRun

logger = logging.getLogger(__name__)


class PipelineRunsRepository(Repository[PipelineRun]):

    def upsert(self, run: PipelineRun) -> None:
        self._conn.execute(
            """INSERT OR REPLACE INTO pipeline_runs
               (id, run_date, source, status, records_inserted,
                records_skipped, circuit_breaks, error_log, duration_ms)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                run.id, run.run_date, run.source, run.status,
                run.records_inserted, run.records_skipped,
                run.circuit_breaks, run.error_log, run.duration_ms,
            ),
        )

    def upsert_batch(self, records: List[PipelineRun]) -> int:
        for r in records:
            self.upsert(r)
        return len(records)

    def find_by_id(self, id: str) -> Optional[PipelineRun]:
        row = self._conn.fetchone("SELECT * FROM pipeline_runs WHERE id = ?", (id,))
        return self._to_model(row) if row else None

    def get_last_success(self, source: str) -> Optional[PipelineRun]:
        row = self._conn.fetchone(
            """SELECT * FROM pipeline_runs
               WHERE source = ? AND status = 'SUCCESS'
               ORDER BY run_date DESC LIMIT 1""",
            (source,),
        )
        return self._to_model(row) if row else None

    def get_recent(self, limit: int = 20) -> List[PipelineRun]:
        rows = self._conn.fetchall(
            "SELECT * FROM pipeline_runs ORDER BY run_date DESC, created_at DESC LIMIT ?",
            (limit,),
        )
        return [self._to_model(r) for r in rows]

    @staticmethod
    def _to_model(row: dict) -> PipelineRun:
        return PipelineRun(
            id=row["id"],
            run_date=row["run_date"],
            source=row["source"],
            status=row["status"],
            pipeline_type=row.get("pipeline_type", "DAILY"),
            records_inserted=row.get("records_inserted", 0),
            records_skipped=row.get("records_skipped", 0),
            circuit_breaks=row.get("circuit_breaks", 0),
            error_log=row.get("error_log"),
            duration_ms=row.get("duration_ms", 0),
        )
