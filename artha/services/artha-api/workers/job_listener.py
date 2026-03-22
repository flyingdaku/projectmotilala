from __future__ import annotations

import asyncio
import contextlib
import logging
import queue
from concurrent.futures import ProcessPoolExecutor
from multiprocessing import Manager
from typing import Any

import asyncpg
import orjson
import pandas as pd

from compute.criteria_eval import evaluate_for_backtest
from compute.indicators import compute_all_indicators, extract_required_indicators
from compute.metrics import compute_monthly_returns
from compute.simulation import SimulationConfig, build_dataframes, run_simulation
from data.nse_calendar import get_trading_days


logger = logging.getLogger(__name__)


def run_simulation_job(job_data: dict[str, Any], progress_queue: Any | None = None) -> dict[str, Any]:
    snapshot = dict(job_data["snapshot"])
    ohlcv = build_dataframes(job_data["ohlcv_records"])

    required = set()
    if snapshot.get("entry_criteria"):
        required |= extract_required_indicators(snapshot["entry_criteria"])
    if snapshot.get("exit_criteria"):
        required |= extract_required_indicators(snapshot["exit_criteria"])

    if required:
        ohlcv = compute_all_indicators(ohlcv, required)

    entry_signals = evaluate_for_backtest(snapshot["entry_criteria"], ohlcv) if snapshot.get("entry_criteria") else None
    exit_signals = evaluate_for_backtest(snapshot["exit_criteria"], ohlcv) if snapshot.get("exit_criteria") else None

    config_fields = {name: snapshot[name] for name in SimulationConfig.__dataclass_fields__ if name in snapshot}
    config = SimulationConfig(**config_fields)

    benchmark_series = pd.Series(
        {pd.to_datetime(record["date"]).date(): float(record["close"]) for record in job_data["benchmark_records"]}
    ).sort_index()
    result = run_simulation(
        config=config,
        ohlcv=ohlcv,
        entry_signals=entry_signals,
        exit_signals=exit_signals,
        benchmark_series=benchmark_series,
        trading_days=job_data["trading_days"],
        symbol_metadata=job_data["symbol_metadata"],
        progress_queue=progress_queue,
    )
    metrics = dict(result.metrics)
    metrics["stocks_excluded_liquidity"] = int(job_data.get("excluded_liquidity", 0))
    return {
        "trades": [trade.__dict__ for trade in result.trades],
        "equity_curve": result.equity_curve,
        "monthly_returns": result.monthly_returns or compute_monthly_returns(result.equity_curve),
        "final_portfolio_value": result.final_portfolio_value,
        "benchmark_final_value": result.benchmark_final_value,
        "metrics": metrics,
    }


class BacktestJobListener:
    def __init__(self, pg_pool: asyncpg.Pool, ts_pool: asyncpg.Pool, process_pool: ProcessPoolExecutor):
        self.pg_pool = pg_pool
        self.ts_pool = ts_pool
        self.process_pool = process_pool
        self._running = False
        self._task: asyncio.Task[None] | None = None

    async def start(self) -> None:
        self._running = True
        self._task = asyncio.create_task(self._listen_loop())
        logger.info("Backtest job listener started")

    async def stop(self) -> None:
        self._running = False
        if self._task is not None:
            self._task.cancel()
            with contextlib.suppress(asyncio.CancelledError):
                await self._task

    async def _listen_loop(self) -> None:
        while self._running:
            try:
                conn = await self.pg_pool.acquire()
                try:
                    await conn.add_listener("backtest_jobs", self._on_notification)
                    logger.info("Listening on backtest_jobs channel")
                    while self._running:
                        await asyncio.sleep(1)
                    await conn.remove_listener("backtest_jobs", self._on_notification)
                finally:
                    await self.pg_pool.release(conn)
            except asyncpg.PostgresConnectionError:
                logger.warning("pg_notify connection lost, reconnecting in 5s")
                await asyncio.sleep(5)
            except asyncio.CancelledError:
                raise
            except Exception as exc:
                logger.error("Listener error: %s, reconnecting in 10s", exc)
                await asyncio.sleep(10)

    def _on_notification(self, conn: asyncpg.Connection, pid: int, channel: str, run_id: str) -> None:
        del conn, pid, channel
        logger.info("Received backtest job: %s", run_id)
        asyncio.create_task(self._dispatch_job(run_id))

    async def _dispatch_job(self, run_id: str) -> None:
        async with self.pg_pool.acquire() as conn:
            result = await conn.fetchrow(
                """
                UPDATE backtest_jobs
                SET claimed_at = now(), worker_pid = pg_backend_pid()
                WHERE run_id = $1 AND claimed_at IS NULL
                RETURNING id
                """,
                run_id,
            )
        if not result:
            logger.info("Job %s already claimed by another worker", run_id)
            return

        async with self.pg_pool.acquire() as conn:
            await conn.execute(
                """
                UPDATE backtest_runs
                SET status = 'running', started_at = now(), progress = 5
                WHERE id = $1
                """,
                run_id,
            )

        try:
            job_data = await self._load_job_data(run_id)
        except Exception as exc:
            await self._fail_run(run_id, f"Data loading failed: {exc}")
            return

        async with self.pg_pool.acquire() as conn:
            await conn.execute("UPDATE backtest_runs SET progress = 10 WHERE id = $1", run_id)

        loop = asyncio.get_running_loop()
        manager = Manager()
        progress_queue = manager.Queue()
        future = loop.run_in_executor(self.process_pool, run_simulation_job, job_data, progress_queue)
        persisted_progress = 10

        try:
            while True:
                try:
                    result = await asyncio.wait_for(asyncio.shield(future), timeout=1.0)
                    break
                except asyncio.TimeoutError:
                    latest_progress = persisted_progress
                    while True:
                        try:
                            latest_progress = max(latest_progress, int(progress_queue.get_nowait()))
                        except queue.Empty:
                            break
                    if latest_progress > persisted_progress:
                        persisted_progress = latest_progress
                        async with self.pg_pool.acquire() as conn:
                            await conn.execute(
                                "UPDATE backtest_runs SET progress = $2 WHERE id = $1",
                                run_id,
                                min(99, persisted_progress),
                            )
            await self._save_results(run_id, result)
        except Exception as exc:
            logger.error("Simulation failed for run %s: %s", run_id, exc)
            await self._fail_run(run_id, str(exc))
        finally:
            manager.shutdown()

    async def _get_universe_assets(
        self,
        pg_conn: asyncpg.Connection,
        universe: str,
        custom_universe: list[str] | None,
        include_delisted: bool,
    ) -> list[dict[str, Any]]:
        if custom_universe:
            rows = await pg_conn.fetch(
                """
                SELECT id, COALESCE(nse_symbol, bse_code) AS symbol, name
                FROM assets
                WHERE UPPER(COALESCE(nse_symbol, bse_code)) = ANY($1)
                """,
                [symbol.upper() for symbol in custom_universe],
            )
            return [dict(row) for row in rows]

        limit_map = {"NIFTY50": 50, "NIFTY100": 100, "NIFTY200": 200, "NIFTY500": 500}
        limit = limit_map.get(str(universe).upper(), 500)
        delisted_clause = "" if include_delisted else "AND COALESCE(a.is_active, 1) = 1"
        rows = await pg_conn.fetch(
            f"""
            SELECT a.id, COALESCE(a.nse_symbol, a.bse_code) AS symbol, a.name
            FROM assets a
            LEFT JOIN computed_ratios cr ON cr.asset_id = a.id
            WHERE a.asset_class = 'EQUITY'
              AND COALESCE(a.nse_symbol, a.bse_code) IS NOT NULL
              {delisted_clause}
            ORDER BY cr.market_cap_cr DESC NULLS LAST, a.name ASC
            LIMIT $1
            """,
            limit,
        )
        return [dict(row) for row in rows]

    async def _filter_by_liquidity(
        self,
        ts_conn: asyncpg.Connection,
        assets: list[dict[str, Any]],
        start_date: Any,
        end_date: Any,
        min_value: int,
    ) -> list[dict[str, Any]]:
        if not assets:
            return []
        asset_ids = [asset["id"] for asset in assets]
        rows = await ts_conn.fetch(
            """
            SELECT asset_id, AVG(close * volume) AS avg_daily_value
            FROM daily_prices
            WHERE asset_id = ANY($1)
              AND date BETWEEN $2 AND $3
            GROUP BY asset_id
            """,
            asset_ids,
            start_date,
            end_date,
        )
        allowed = {row["asset_id"] for row in rows if float(row["avg_daily_value"] or 0) >= min_value}
        return [asset for asset in assets if asset["id"] in allowed]

    async def _load_job_data(self, run_id: str) -> dict[str, Any]:
        excluded_count = 0
        async with self.pg_pool.acquire() as pg_conn, self.ts_pool.acquire() as ts_conn:
            run = await pg_conn.fetchrow(
                """
                SELECT strategy_snapshot
                FROM backtest_runs
                WHERE id = $1
                """,
                run_id,
            )
            if not run:
                raise ValueError(f"Run {run_id} not found")

            snapshot = dict(run["strategy_snapshot"])
            universe_assets = await self._get_universe_assets(
                pg_conn,
                str(snapshot.get("universe", "NIFTY500")),
                snapshot.get("custom_universe"),
                bool(snapshot.get("include_delisted", False)),
            )

            min_vol = int(snapshot.get("liquidity_min_value", 1000000) or 0)
            if min_vol > 0:
                filtered = await self._filter_by_liquidity(
                    ts_conn,
                    universe_assets,
                    snapshot["period_start"],
                    snapshot["period_end"],
                    min_vol,
                )
                excluded_count = len(universe_assets) - len(filtered)
                universe_assets = filtered

            asset_map = {asset["id"]: asset for asset in universe_assets}
            asset_ids = list(asset_map.keys())
            if not asset_ids:
                raise ValueError("Universe resolved to zero assets")

            ohlcv_rows = await ts_conn.fetch(
                """
                SELECT asset_id, date::date, open::float, high::float, low::float, close::float, volume::bigint
                FROM daily_prices
                WHERE asset_id = ANY($1)
                  AND date BETWEEN $2 AND $3
                ORDER BY asset_id, date
                """,
                asset_ids,
                snapshot["period_start"],
                snapshot["period_end"],
            )

            benchmark_symbol = str(snapshot.get("benchmark", "NIFTY50")).upper()
            benchmark_asset = await pg_conn.fetchrow(
                """
                SELECT id
                FROM assets
                WHERE UPPER(COALESCE(nse_symbol, bse_code)) = $1
                LIMIT 1
                """,
                benchmark_symbol,
            )
            benchmark_records: list[dict[str, Any]]
            if benchmark_asset is not None:
                benchmark_rows = await ts_conn.fetch(
                    """
                    SELECT date::date, close::float
                    FROM daily_prices
                    WHERE asset_id = $1
                      AND date BETWEEN $2 AND $3
                    ORDER BY date
                    """,
                    benchmark_asset["id"],
                    snapshot["period_start"],
                    snapshot["period_end"],
                )
                benchmark_records = [dict(row) for row in benchmark_rows]
            else:
                benchmark_records = []

            trading_days = await get_trading_days(pg_conn, snapshot["period_start"], snapshot["period_end"])

            volume_rows = await ts_conn.fetch(
                """
                SELECT asset_id, AVG(close * volume) AS avg_daily_vol
                FROM daily_prices
                WHERE asset_id = ANY($1)
                  AND date BETWEEN $2::date - INTERVAL '90 days' AND $2::date
                GROUP BY asset_id
                """,
                asset_ids,
                snapshot["period_end"],
            )
            avg_vol_map = {row["asset_id"]: float(row["avg_daily_vol"] or 0) for row in volume_rows}

            meta_rows = await pg_conn.fetch(
                """
                SELECT a.id, COALESCE(a.nse_symbol, a.bse_code) AS symbol, a.name, cr.market_cap_cr
                FROM assets a
                LEFT JOIN computed_ratios cr ON cr.asset_id = a.id
                WHERE a.id = ANY($1)
                """,
                asset_ids,
            )
            symbol_metadata: dict[str, dict[str, Any]] = {}
            for row in meta_rows:
                symbol = str(row["symbol"]).upper()
                symbol_metadata[symbol] = {
                    "name": row["name"],
                    "market_cap": float(row["market_cap_cr"] or 0),
                    "avg_daily_vol": avg_vol_map.get(row["id"], 0.0),
                }

            ohlcv_records = []
            for row in ohlcv_rows:
                asset = asset_map.get(row["asset_id"])
                if asset is None:
                    continue
                ohlcv_records.append(
                    {
                        "symbol": str(asset["symbol"]).upper(),
                        "date": row["date"],
                        "open": float(row["open"] or 0),
                        "high": float(row["high"] or 0),
                        "low": float(row["low"] or 0),
                        "close": float(row["close"] or 0),
                        "volume": int(row["volume"] or 0),
                    }
                )

            if not benchmark_records and trading_days:
                benchmark_records = [{"date": trading_day, "close": 1.0} for trading_day in trading_days]

            return {
                "run_id": run_id,
                "snapshot": snapshot,
                "ohlcv_records": ohlcv_records,
                "benchmark_records": benchmark_records,
                "trading_days": trading_days,
                "symbol_metadata": symbol_metadata,
                "excluded_liquidity": excluded_count,
            }

    async def _save_results(self, run_id: str, result: dict[str, Any]) -> None:
        trades = result.get("trades", [])
        if trades:
            async with self.ts_pool.acquire() as conn:
                await conn.executemany(
                    """
                    INSERT INTO backtest_trades
                        (run_id, symbol, company_name, direction,
                         entry_date, entry_price, exit_date, exit_price,
                         shares, trade_value, gross_pnl, total_costs,
                         tax, net_pnl, net_pnl_pct, duration_days,
                         exit_reason, gains_type)
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
                    """,
                    [
                        (
                            run_id,
                            trade["symbol"],
                            trade.get("company_name"),
                            trade["direction"],
                            trade["entry_date"],
                            trade["entry_price"],
                            trade["exit_date"],
                            trade["exit_price"],
                            trade["shares"],
                            trade["trade_value"],
                            trade["gross_pnl"],
                            trade["total_costs"],
                            trade["tax"],
                            trade["net_pnl"],
                            trade["net_pnl_pct"],
                            trade["duration_days"],
                            trade["exit_reason"],
                            trade["gains_type"],
                        )
                        for trade in trades
                    ],
                )

        async with self.pg_pool.acquire() as conn:
            await conn.execute(
                """
                UPDATE backtest_runs SET
                    status = 'completed',
                    completed_at = now(),
                    progress = 100,
                    metrics = $2::jsonb,
                    equity_curve = $3::jsonb,
                    monthly_returns = $4::jsonb
                WHERE id = $1
                """,
                run_id,
                orjson.dumps(result["metrics"]).decode(),
                orjson.dumps(result["equity_curve"]).decode(),
                orjson.dumps(result["monthly_returns"]).decode(),
            )
            await conn.execute(
                """
                UPDATE backtest_jobs
                SET completed_at = now()
                WHERE run_id = $1
                """,
                run_id,
            )
        logger.info("Run %s completed: %s trades", run_id, len(trades))

    async def _fail_run(self, run_id: str, error_msg: str) -> None:
        async with self.pg_pool.acquire() as conn:
            await conn.execute(
                """
                UPDATE backtest_runs
                SET status = 'failed', error_msg = $2, completed_at = now()
                WHERE id = $1
                """,
                run_id,
                error_msg[:2000],
            )
