"""
Data Verification Pipeline.

Runs data quality checks:
  1. Data completeness — coverage % for each trading day
  2. Adj close integrity — no anomalous adj_close vs close ratios
  3. No duplicate prices
  4. Trading calendar check — no data on holidays, data present on trading days
  5. Weekly cross-validation summary (logs deltas for manual review)

Runs nightly after all ingestion pipelines complete.
"""
import logging
from datetime import date, datetime, timedelta, timezone
from typing import Optional

from utils.alerts import alert_pipeline_failure, send_telegram_alert
from utils.calendar import ensure_holiday_cache, get_trading_dates_in_range, is_trading_day
from core.db import execute_one, execute_query, execute_one_ts, execute_query_ts, generate_id, get_db

logger = logging.getLogger(__name__)


# ─── CHECK 1: DATA COMPLETENESS ───────────────────────────────────────────────

def check_data_completeness(trade_date: date) -> dict:
    """
    Verify we have price data for a high percentage of active NSE-listed assets.
    Threshold: >= 95% coverage is acceptable.
    """
    total = execute_one(
        "SELECT COUNT(*) as cnt FROM assets WHERE is_active = 1 AND nse_listed = 1"
    )["cnt"]

    if total == 0:
        return {"status": "SKIP", "reason": "No active NSE assets in database"}

    # daily_prices lives in the timeseries DB; assets is in the relational DB.
    # Fetch distinct asset_ids with prices from timeseries DB, then count overlap
    # with active NSE assets from relational DB.
    active_ids = {r["id"] for r in execute_query(
        "SELECT id FROM assets WHERE is_active = 1 AND nse_listed = 1"
    )}
    price_rows = execute_query_ts(
        "SELECT DISTINCT asset_id FROM daily_prices WHERE date = %s",
        (trade_date.isoformat(),),
    )
    covered = sum(1 for r in price_rows if r["asset_id"] in active_ids)

    coverage_pct = (covered / total * 100) if total > 0 else 0.0
    status = "PASS" if coverage_pct >= 95 else "WARN"

    result = {
        "check": "DATA_COMPLETENESS",
        "date": trade_date.isoformat(),
        "total_assets": total,
        "assets_with_data": covered,
        "coverage_pct": round(coverage_pct, 2),
        "status": status,
    }

    if status == "WARN":
        logger.warning(
            f"Low data coverage for {trade_date}: {covered}/{total} ({coverage_pct:.1f}%)"
        )
        send_telegram_alert(
            f"Low data coverage for `{trade_date}`: "
            f"`{covered}/{total}` ({coverage_pct:.1f}%)",
            level="WARNING",
        )
    else:
        logger.info(f"Data completeness OK: {covered}/{total} ({coverage_pct:.1f}%) for {trade_date}")

    return result


# ─── CHECK 2: ADJ CLOSE INTEGRITY ─────────────────────────────────────────────

def check_adj_close_integrity() -> dict:
    """
    Find cases where adj_close deviates from close by more than 99% or less than 1%.
    These indicate either a missing corporate action or a calculation error.
    """
    # daily_prices is in timeseries DB; JOIN manually with relational assets
    symbol_map = {r["id"]: r["nse_symbol"] for r in execute_query(
        "SELECT id, nse_symbol FROM assets"
    )}
    raw_anomalies = execute_query_ts(
        """SELECT asset_id, date, close, adj_close,
                  ROUND((adj_close / close - 1) * 100, 2) as pct_diff
           FROM daily_prices
           WHERE adj_close IS NOT NULL AND close > 0
             AND (adj_close > close * 100 OR adj_close < close * 0.01)
           ORDER BY ABS(adj_close / close - 1) DESC
           LIMIT 20"""
    )
    anomalies = [
        {**r, "nse_symbol": symbol_map.get(r["asset_id"], r["asset_id"])}
        for r in raw_anomalies
    ]

    status = "FAIL" if anomalies else "PASS"
    if anomalies:
        logger.error(f"adj_close integrity: {len(anomalies)} extreme anomalies found")
        for row in anomalies[:5]:
            logger.error(
                f"  {row['nse_symbol']} on {row['date']}: "
                f"close={row['close']}, adj_close={row['adj_close']} ({row['pct_diff']}%)"
            )
        send_telegram_alert(
            f"adj_close integrity check FAILED: `{len(anomalies)}` extreme anomalies.\n"
            f"First: `{anomalies[0]['nse_symbol']}` on `{anomalies[0]['date']}`",
            level="ERROR",
        )
    else:
        logger.info("adj_close integrity: PASS")

    return {"check": "ADJ_CLOSE_INTEGRITY", "status": status, "anomaly_count": len(anomalies)}


# ─── CHECK 3: NO DUPLICATE PRICES ─────────────────────────────────────────────

def check_no_duplicate_prices() -> dict:
    """Verify no (asset_id, date) duplicates exist in daily_prices."""
    duplicates = execute_query_ts(
        """SELECT asset_id, date, COUNT(*) as cnt
           FROM daily_prices
           GROUP BY asset_id, date
           HAVING cnt > 1
           LIMIT 10"""
    )

    status = "FAIL" if duplicates else "PASS"
    if duplicates:
        logger.error(f"Duplicate prices found: {len(duplicates)} (asset_id, date) pairs")
        send_telegram_alert(
            f"Duplicate prices detected: `{len(duplicates)}` pairs. Investigate immediately.",
            level="ERROR",
        )
    else:
        logger.info("Duplicate price check: PASS")

    return {"check": "NO_DUPLICATES", "status": status, "duplicate_count": len(duplicates)}


# ─── CHECK 4: TRADING CALENDAR CONSISTENCY ────────────────────────────────────

def check_trading_calendar_consistency(lookback_days: int = 30) -> dict:
    """
    Verify:
      a) We have data for all expected trading days in the lookback window
      b) We do NOT have data on known market holidays
    """
    ensure_holiday_cache()

    end_date = date.today() - timedelta(days=1)
    start_date = end_date - timedelta(days=lookback_days)

    expected_trading_dates = get_trading_dates_in_range(start_date, end_date)

    # Dates we actually have data for (timeseries DB)
    rows = execute_query_ts(
        """SELECT DISTINCT date FROM daily_prices
           WHERE date >= ? AND date <= ?""",
        (start_date.isoformat(), end_date.isoformat()),
    )
    dates_with_data = {r["date"] for r in rows}

    expected_strs = {d.isoformat() for d in expected_trading_dates}
    missing_dates = sorted(expected_strs - dates_with_data)
    extra_dates = sorted(dates_with_data - expected_strs)

    # Filter extra_dates to only flag actual holidays (not just BSE-only days)
    from utils.calendar import get_cached_holidays
    holidays = get_cached_holidays()
    holiday_violations = [d for d in extra_dates if d in holidays]

    status = "PASS"
    issues = []

    if missing_dates:
        status = "WARN"
        issues.append(f"Missing data for {len(missing_dates)} trading days: {missing_dates[:5]}")
        logger.warning(f"Missing trading day data: {missing_dates}")

    if holiday_violations:
        status = "WARN"
        issues.append(f"Data present on {len(holiday_violations)} holidays: {holiday_violations}")
        logger.warning(f"Data found on market holidays: {holiday_violations}")

    if status == "PASS":
        logger.info(f"Trading calendar check: PASS ({len(expected_trading_dates)} days verified)")

    return {
        "check": "TRADING_CALENDAR",
        "status": status,
        "expected_trading_days": len(expected_trading_dates),
        "missing_days": missing_dates,
        "holiday_violations": holiday_violations,
        "issues": issues,
    }


# ─── CHECK 5: PIPELINE RUN HEALTH ─────────────────────────────────────────────

def check_pipeline_run_health(trade_date: date) -> dict:
    """
    Verify all expected pipeline sources ran successfully for trade_date.
    Expected sources: NSE_BHAVCOPY, BSE_BHAVCOPY, AMFI_NAV, NSE_CORP_ACTIONS
    """
    expected_sources = ["NSE_BHAVCOPY", "BSE_BHAVCOPY", "AMFI_NAV", "IIMA_FF"]

    results = execute_query(
        """SELECT source, status, records_inserted, circuit_breaks, error_log
           FROM pipeline_runs
           WHERE run_date = %s
           ORDER BY created_at DESC""",
        (trade_date.isoformat(),),
    )

    ran_sources = {r["source"]: r for r in results}
    missing_sources = [s for s in expected_sources if s not in ran_sources]
    failed_sources = [s for s, r in ran_sources.items() if r["status"] == "FAILED"]

    status = "PASS"
    if missing_sources or failed_sources:
        status = "WARN"
        logger.warning(f"Pipeline health issues: missing={missing_sources}, failed={failed_sources}")

    return {
        "check": "PIPELINE_RUN_HEALTH",
        "status": status,
        "date": trade_date.isoformat(),
        "missing_sources": missing_sources,
        "failed_sources": failed_sources,
        "ran_sources": list(ran_sources.keys()),
    }


def check_iima_factor_snapshot() -> dict:
    """Verify the delayed IIMA factor snapshot is populated across all required tables."""
    factor_summary = execute_query(
        """SELECT frequency, COUNT(*) AS row_count, MAX(date) AS latest_date
           FROM ff_factor_returns
           WHERE source = 'IIMA'
           GROUP BY frequency"""
    )
    factor_map = {row["frequency"]: row for row in factor_summary}
    missing_frequencies = [freq for freq in ["DAILY", "MONTHLY", "YEARLY"] if freq not in factor_map]

    portfolio_count = execute_one(
        "SELECT COUNT(*) AS cnt FROM ff_iima_portfolio_returns"
    )["cnt"]
    breakpoint_count = execute_one(
        "SELECT COUNT(*) AS cnt FROM ff_iima_breakpoints"
    )["cnt"]
    drawdown_count = execute_one(
        "SELECT COUNT(*) AS cnt FROM ff_iima_drawdowns"
    )["cnt"]

    latest_daily = factor_map.get("DAILY", {}).get("latest_date")
    latest_success = execute_one(
        """SELECT MAX(run_date) AS latest_run_date
           FROM pipeline_runs
           WHERE source = 'IIMA_FF' AND status = 'SUCCESS'"""
    )

    status = "PASS"
    issues = []

    if missing_frequencies:
        status = "WARN"
        issues.append(f"Missing IIMA factor frequencies: {missing_frequencies}")

    if portfolio_count == 0:
        status = "WARN"
        issues.append("No IIMA portfolio return rows found")

    if breakpoint_count == 0:
        status = "WARN"
        issues.append("No IIMA breakpoint rows found")

    if drawdown_count == 0:
        status = "WARN"
        issues.append("No IIMA drawdown rows found")

    if latest_success is None or latest_success.get("latest_run_date") is None:
        status = "WARN"
        issues.append("IIMA FF pipeline has never completed successfully")

    result = {
        "check": "IIMA_FACTOR_SNAPSHOT",
        "status": status,
        "latest_daily_factor_date": latest_daily,
        "latest_successful_run": None if latest_success is None else latest_success.get("latest_run_date"),
        "factor_frequencies_present": sorted(factor_map.keys()),
        "portfolio_rows": portfolio_count,
        "breakpoint_rows": breakpoint_count,
        "drawdown_rows": drawdown_count,
        "issues": issues,
    }

    if status == "WARN":
        logger.warning("IIMA factor snapshot issues: %s", issues)
    else:
        logger.info("IIMA factor snapshot: PASS")

    return result


# ─── MAIN VERIFICATION RUNNER ─────────────────────────────────────────────────

def run_verification_pipeline(trade_date: date = None):
    """Run all verification checks and log results."""
    if trade_date is None:
        trade_date = date.today() - timedelta(days=1)

    run_id = generate_id()
    start_time = datetime.now(timezone.utc).replace(tzinfo=None)
    source = "VERIFICATION"

    logger.info(f"[{source}] Starting verification for {trade_date}")

    results = []
    all_passed = True

    checks = [
        ("completeness", lambda: check_data_completeness(trade_date)),
        ("adj_close", check_adj_close_integrity),
        ("duplicates", check_no_duplicate_prices),
        ("calendar", check_trading_calendar_consistency),
        ("pipeline_health", lambda: check_pipeline_run_health(trade_date)),
        ("iima_snapshot", check_iima_factor_snapshot),
    ]

    for name, check_fn in checks:
        try:
            result = check_fn()
            results.append(result)
            if result.get("status") in ("FAIL", "WARN"):
                all_passed = False
                logger.warning(f"Check '{name}': {result['status']}")
            else:
                logger.info(f"Check '{name}': PASS")
        except Exception as e:
            all_passed = False
            logger.error(f"Check '{name}' raised exception: {e}", exc_info=True)
            results.append({"check": name, "status": "ERROR", "error": str(e)})

    duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)
    overall_status = "SUCCESS" if all_passed else "PARTIAL"

    with get_db() as conn:
        conn.execute(
            """INSERT INTO pipeline_runs
               (id, run_date, source, status, duration_ms)
               VALUES (%s, %s, %s, %s, %s)""",
            (run_id, trade_date.isoformat(), source, overall_status, duration_ms),
        )

    logger.info(f"[{source}] ✅ Verification complete. Overall: {overall_status} ({duration_ms}ms)")

    if not all_passed:
        send_telegram_alert(
            f"Verification checks completed with issues for `{trade_date}`.\n"
            f"Status: `{overall_status}`",
            level="WARNING",
        )

    return results


# ─── CHECK 6: EODHD COMPLETENESS ──────────────────────────────────────────────

def check_eodhd_completeness(trade_date: date) -> dict:
    """
    Verify we have EODHD data for a high percentage of mapped assets.
    Threshold: >= 90% coverage is acceptable.
    """
    total = execute_one(
        "SELECT COUNT(*) as cnt FROM eodhd_symbol_mapping WHERE is_active = 1"
    )["cnt"]

    if total == 0:
        return {"status": "SKIP", "reason": "No EODHD symbol mappings"}

    covered = execute_one(
        """SELECT COUNT(DISTINCT edp.asset_id) as cnt
           FROM eodhd_daily_prices edp
           JOIN eodhd_symbol_mapping esm ON edp.asset_id = esm.asset_id
           WHERE edp.date = ? AND esm.is_active = 1""",
        (trade_date.isoformat(),),
    )["cnt"]

    coverage_pct = (covered / total * 100) if total > 0 else 0.0
    status = "PASS" if coverage_pct >= 90 else "WARN"

    result = {
        "check": "EODHD_COMPLETENESS",
        "date": trade_date.isoformat(),
        "total_mapped": total,
        "assets_with_data": covered,
        "coverage_pct": round(coverage_pct, 2),
        "status": status,
    }

    logger.info(
        f"[EODHD_COMPLETENESS] {covered}/{total} assets ({coverage_pct:.1f}%) — {status}"
    )

    return result


# ─── CHECK 7: PRICE RECONCILIATION HEALTH ─────────────────────────────────────

def check_price_reconciliation_health(trade_date: date) -> dict:
    """
    Verify price reconciliation status.
    Alert if >1% of assets have major deviations.
    """
    total = execute_one(
        "SELECT COUNT(*) as cnt FROM price_reconciliation WHERE date = %s",
        (trade_date.isoformat(),),
    )["cnt"]

    if total == 0:
        return {"status": "SKIP", "reason": "No reconciliation records for date"}

    major_deviations = execute_one(
        """SELECT COUNT(*) as cnt FROM price_reconciliation
           WHERE date = %s AND status = 'MAJOR_DEVIATION'""",
        (trade_date.isoformat(),),
    )["cnt"]

    minor_deviations = execute_one(
        """SELECT COUNT(*) as cnt FROM price_reconciliation
           WHERE date = %s AND status = 'MINOR_DEVIATION'""",
        (trade_date.isoformat(),),
    )["cnt"]

    major_pct = (major_deviations / total * 100) if total > 0 else 0.0
    status = "PASS" if major_pct <= 1.0 else "WARN"

    result = {
        "check": "PRICE_RECONCILIATION_HEALTH",
        "date": trade_date.isoformat(),
        "total_reconciled": total,
        "major_deviations": major_deviations,
        "minor_deviations": minor_deviations,
        "major_deviation_pct": round(major_pct, 2),
        "status": status,
    }

    logger.info(
        f"[PRICE_RECONCILIATION] {major_deviations} major, {minor_deviations} minor "
        f"({major_pct:.1f}% major) — {status}"
    )

    return result


# ─── CHECK 8: ADJUSTED CLOSE VALIDATION ───────────────────────────────────────

def check_adjusted_close_validation(trade_date: date) -> dict:
    """
    Compare our adj_close vs EODHD adjusted_close.
    Alert if >5% of assets deviate >2%.
    """
    total = execute_one(
        """SELECT COUNT(*) as cnt FROM price_reconciliation
           WHERE date = %s AND internal_adj_close IS NOT NULL 
           AND eodhd_adj_close IS NOT NULL""",
        (trade_date.isoformat(),),
    )["cnt"]

    if total == 0:
        return {"status": "SKIP", "reason": "No adj_close data to compare"}

    deviations = execute_one(
        """SELECT COUNT(*) as cnt FROM price_reconciliation
           WHERE date = %s AND adj_close_deviation_pct > 2.0""",
        (trade_date.isoformat(),),
    )["cnt"]

    deviation_pct = (deviations / total * 100) if total > 0 else 0.0
    status = "PASS" if deviation_pct <= 5.0 else "WARN"

    result = {
        "check": "ADJUSTED_CLOSE_VALIDATION",
        "date": trade_date.isoformat(),
        "total_compared": total,
        "deviations_over_2pct": deviations,
        "deviation_pct": round(deviation_pct, 2),
        "status": status,
    }

    logger.info(
        f"[ADJ_CLOSE_VALIDATION] {deviations}/{total} deviations "
        f"({deviation_pct:.1f}%) — {status}"
    )

    return result


if __name__ == "__main__":
    import sys
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    run_date = date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else date.today() - timedelta(days=1)
    results = run_verification_pipeline(run_date)
    for r in results:
        print(f"  [{r.get('status', '?')}] {r.get('check', '?')}")
