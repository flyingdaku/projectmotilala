#!/usr/bin/env python3
"""
Compute technical_indicators and enrich computed_ratios in PostgreSQL
=====================================================================
Reads daily_prices from TimescaleDB and fundamentals from both DBs.
Writes results to:
  - artha_relational.technical_indicators  (price-based signals)
  - artha_relational.computed_ratios       (enriched from real fundamental data)

Run after migrate_sqlite_to_pg.py completes.

Usage:
    python scripts/compute_pg_indicators.py
    python scripts/compute_pg_indicators.py --symbols RELIANCE,TCS,INFY
"""
from __future__ import annotations
import os, sys, logging, argparse, math
from pathlib import Path
from datetime import date, timedelta

import psycopg2
import psycopg2.extras
import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

PG_DSN = os.getenv("PG_RELATIONAL_DSN",  "host=localhost port=5432 dbname=artha_relational user=artha password=artha_dev_password")
TS_DSN = os.getenv("PG_TIMESERIES_DSN", "host=localhost port=5433 dbname=artha_timeseries user=artha password=artha_dev_password")

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("compute_indicators")


def compute_rsi(prices: pd.Series, period: int = 14) -> float | None:
    if len(prices) < period + 1:
        return None
    delta = prices.diff().dropna()
    gains = delta.clip(lower=0)
    losses = -delta.clip(upper=0)
    avg_gain = gains.rolling(window=period).mean().iloc[-1]
    avg_loss = losses.rolling(window=period).mean().iloc[-1]
    if avg_loss == 0:
        return 100.0
    rs = avg_gain / avg_loss
    return round(float(100 - 100 / (1 + rs)), 2)


def compute_sma(prices: pd.Series, period: int) -> float | None:
    if len(prices) < period:
        return None
    return round(float(prices.rolling(window=period).mean().iloc[-1]), 2)


def compute_technical_indicators(asset_id: str, ts_conn) -> dict | None:
    """Compute technical indicators for one asset from TimescaleDB price data."""
    cur = ts_conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cutoff = (date.today() - timedelta(days=400)).isoformat()

    cur.execute("""
        SELECT date, close, adj_close, volume
        FROM daily_prices
        WHERE asset_id = %s AND date >= %s AND close IS NOT NULL AND close > 0
        ORDER BY date ASC
    """, (asset_id, cutoff))
    rows = cur.fetchall()

    if len(rows) < 5:
        return None

    df = pd.DataFrame(rows)
    df["date"] = pd.to_datetime(df["date"])
    df = df.sort_values("date").reset_index(drop=True)

    price_col = "adj_close" if df["adj_close"].notna().sum() > len(df) * 0.5 else "close"
    prices = df[price_col].astype(float)

    latest_close = float(df["close"].iloc[-1])
    prev_close = float(df["close"].iloc[-2]) if len(df) > 1 else None
    change_1d = round((latest_close / prev_close - 1) * 100, 4) if prev_close and prev_close > 0 else None

    high_52w = float(prices.tail(252).max())
    low_52w = float(prices.tail(252).min())
    pct_from_52w_high = round((latest_close / high_52w - 1) * 100, 2) if high_52w > 0 else None
    pct_from_52w_low = round((latest_close / low_52w - 1) * 100, 2) if low_52w > 0 else None

    avg_vol = float(df["volume"].tail(20).mean()) if "volume" in df.columns else None

    return {
        "asset_id": asset_id,
        "computed_date": date.today().isoformat(),
        "close": latest_close,
        "change_1d_pct": change_1d,
        "rsi_14": compute_rsi(prices),
        "pct_from_52w_high": pct_from_52w_high,
        "pct_from_52w_low": pct_from_52w_low,
        "sma_50": compute_sma(prices, 50),
        "sma_200": compute_sma(prices, 200),
        "volume": avg_vol,
        "prev_close": prev_close,
        "prev_high": float(df["high"].iloc[-2]) if "high" in df.columns and len(df) > 1 else None,
        "prev_low": float(df["low"].iloc[-2]) if "low" in df.columns and len(df) > 1 else None,
        "lag1_close": prev_close,
    }


def compute_ratios_for_asset(asset_id: str, pg_conn, ts_conn) -> dict | None:
    """Compute financial ratios from fundamental + price data."""
    pg_cur = pg_conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    ts_cur = ts_conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    # Get latest price
    ts_cur.execute("""
        SELECT close, adj_close FROM daily_prices
        WHERE asset_id = %s AND close > 0
        ORDER BY date DESC LIMIT 1
    """, (asset_id,))
    price_row = ts_cur.fetchone()
    if not price_row:
        return None
    price = float(price_row["close"])

    # Get TTM quarterly data from src_msi_quarterly (preferred)
    ts_cur.execute("""
        SELECT revenue_ops, operating_profit, finance_costs, depreciation,
               profit_before_tax, net_profit, basic_eps
        FROM src_msi_quarterly
        WHERE asset_id = %s ORDER BY period_end_date DESC LIMIT 4
    """, (asset_id,))
    msi_qtrs = ts_cur.fetchall()

    # Fallback to screener quarterly
    if len(msi_qtrs) < 4:
        ts_cur.execute("""
            SELECT sales AS revenue_ops, operating_profit, interest AS finance_costs,
                   depreciation, pbt AS profit_before_tax, net_profit, eps AS basic_eps
            FROM src_screener_quarterly
            WHERE asset_id = %s ORDER BY period_end_date DESC LIMIT 4
        """, (asset_id,))
        qtrs = ts_cur.fetchall()
    else:
        qtrs = msi_qtrs

    ttm = {}
    if len(qtrs) >= 4:
        for key in ["revenue_ops", "operating_profit", "finance_costs", "net_profit", "basic_eps", "profit_before_tax"]:
            vals = [float(q[key]) for q in qtrs if q.get(key) is not None]
            ttm[key] = sum(vals) if vals else None

    # Get latest balance sheet
    ts_cur.execute("""
        SELECT equity_capital, reserves, long_term_borrowings, short_term_borrowings,
               cash_equivalents, total_assets
        FROM src_msi_balance_sheet
        WHERE asset_id = %s ORDER BY period_end_date DESC LIMIT 1
    """, (asset_id,))
    bs = ts_cur.fetchone()

    if not bs:
        ts_cur.execute("""
            SELECT reserves AS equity_capital, borrowings AS long_term_borrowings,
                   total_assets
            FROM src_screener_balance_sheet
            WHERE asset_id = %s ORDER BY period_end_date DESC LIMIT 1
        """, (asset_id,))
        bs = ts_cur.fetchone()

    # Get asset face_value from relational DB
    pg_cur.execute("SELECT face_value FROM assets WHERE id = %s", (asset_id,))
    asset_row = pg_cur.fetchone()
    fv = float(asset_row["face_value"]) if asset_row and asset_row["face_value"] else 1.0

    # Get latest MSI company data for market cap
    pg_cur.execute("""
        SELECT market_cap, pe_ratio, roe_ttm, book_value_per_share_ttm,
               dividend_yield_ttm, pct_from_high
        FROM msi_company_data WHERE asset_id = %s
    """, (asset_id,))
    msi = pg_cur.fetchone()

    # Compute ratios
    equity = None
    debt = None
    cash = None
    total_assets = None

    if bs:
        eq_cap = float(bs.get("equity_capital") or 0)
        reserves = float(bs.get("reserves") or 0)
        equity = eq_cap + reserves if (eq_cap or reserves) else None
        lt_debt = float(bs.get("long_term_borrowings") or 0)
        st_debt = float(bs.get("short_term_borrowings") or 0)
        debt = lt_debt + st_debt
        cash = float(bs.get("cash_equivalents") or 0)
        total_assets_raw = bs.get("total_assets")
        total_assets = float(total_assets_raw) if total_assets_raw else None

    ttm_revenue = ttm.get("revenue_ops")
    ttm_op = ttm.get("operating_profit")
    ttm_pat = ttm.get("net_profit")
    ttm_eps = ttm.get("basic_eps")
    ttm_interest = ttm.get("finance_costs")

    # Market cap estimate
    msi_mcap = None
    if msi and msi.get("market_cap"):
        msi_mcap = float(msi["market_cap"]) / 1e7  # Convert to Cr

    # Shares outstanding estimate from market cap
    market_cap_cr = msi_mcap
    if market_cap_cr is None and ttm_eps and ttm_eps > 0 and msi and msi.get("pe_ratio"):
        pe_from_msi = float(msi["pe_ratio"])
        market_cap_cr = (price / pe_from_msi * price) / 1e7 if pe_from_msi > 0 else None

    # PE TTM
    pe_ttm = round(price / ttm_eps, 2) if ttm_eps and ttm_eps > 0 else (
        float(msi["pe_ratio"]) if msi and msi.get("pe_ratio") else None
    )

    # PB
    bvps = float(msi["book_value_per_share_ttm"]) if msi and msi.get("book_value_per_share_ttm") else None
    if bvps is None and equity is not None and fv > 0:
        shares_est = equity * 1e7 / fv if equity else None
        bvps = round(equity * 1e7 / shares_est, 2) if shares_est else None
    pb = round(price / bvps, 2) if bvps and bvps > 0 else None

    # EV/EBITDA
    ebitda = round(ttm_op, 2) if ttm_op else None
    ev = None
    if market_cap_cr is not None and debt is not None and cash is not None:
        ev = market_cap_cr + debt / 1e7 - cash / 1e7
    ev_ebitda = round(ev / (ebitda / 1e7), 2) if ev and ebitda and ebitda > 0 else None

    # Margins
    pat_margin = round((ttm_pat / ttm_revenue) * 100, 2) if ttm_pat and ttm_revenue and ttm_revenue > 0 else None
    op_margin = round((ttm_op / ttm_revenue) * 100, 2) if ttm_op and ttm_revenue and ttm_revenue > 0 else None

    # ROE, ROCE
    roe = float(msi["roe_ttm"]) if msi and msi.get("roe_ttm") else (
        round((ttm_pat / equity) * 100, 2) if ttm_pat and equity and equity > 0 else None
    )
    cap_employed = equity + (debt or 0) if equity is not None else None
    ebit = ttm.get("profit_before_tax") or ttm_op
    roce = round((ebit / cap_employed) * 100, 2) if ebit and cap_employed and cap_employed > 0 else None

    # Debt/Equity
    de = round(debt / equity, 2) if debt is not None and equity and equity > 0 else None

    # Interest coverage
    icr = round(ebit / ttm_interest, 2) if ebit and ttm_interest and ttm_interest > 0 else None

    # YoY growth (requires 2 annual TTM windows — approximate from 8 quarters if available)
    rev_growth = None
    pat_growth = None
    ts_cur.execute("""
        SELECT revenue_ops, net_profit FROM src_msi_quarterly
        WHERE asset_id = %s ORDER BY period_end_date DESC LIMIT 8
    """, (asset_id,))
    qtrs_8 = ts_cur.fetchall()
    if len(qtrs_8) >= 8:
        rev_ttm = sum(float(q["revenue_ops"] or 0) for q in qtrs_8[:4])
        rev_prev = sum(float(q["revenue_ops"] or 0) for q in qtrs_8[4:8])
        if rev_prev > 0:
            rev_growth = round((rev_ttm / rev_prev - 1) * 100, 2)
        pat_ttm_val = sum(float(q["net_profit"] or 0) for q in qtrs_8[:4])
        pat_prev = sum(float(q["net_profit"] or 0) for q in qtrs_8[4:8])
        if pat_prev > 0:
            pat_growth = round((pat_ttm_val / pat_prev - 1) * 100, 2)

    # Quality score (simple composite)
    quality = 0.0
    if roe is not None:
        quality += min(max(roe, 0), 30)
    if de is not None:
        quality += max(0, 30 - de * 20)
    if op_margin is not None:
        quality += min(max(op_margin, 0), 20)
    quality_score = round(quality, 1) if quality > 0 else None

    return {
        "asset_id": asset_id,
        "market_cap_cr": market_cap_cr,
        "pe_ttm": pe_ttm,
        "pb": pb,
        "ev_ebitda": ev_ebitda,
        "dividend_yield": float(msi["dividend_yield_ttm"]) if msi and msi.get("dividend_yield_ttm") else None,
        "roce": roce,
        "roe": roe,
        "pat_margin": pat_margin,
        "operating_margin": op_margin,
        "revenue_growth_1y": rev_growth,
        "pat_growth_1y": pat_growth,
        "debt_equity": de,
        "interest_coverage": icr,
        "quality_score": quality_score,
    }


def main():
    parser = argparse.ArgumentParser(description="Compute technical indicators and ratios in PostgreSQL")
    parser.add_argument("--symbols", help="Comma-separated symbols to process (default: all active equities)")
    parser.add_argument("--skip-tech", action="store_true", help="Skip technical indicators")
    parser.add_argument("--skip-ratios", action="store_true", help="Skip computed ratios enrichment")
    args = parser.parse_args()

    pg_conn = psycopg2.connect(PG_DSN)
    ts_conn = psycopg2.connect(TS_DSN)

    pg_cur = pg_conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    # Get list of active equities
    if args.symbols:
        symbols = [s.strip().upper() for s in args.symbols.split(",")]
        pg_cur.execute("""
            SELECT id, nse_symbol FROM assets
            WHERE nse_symbol = ANY(%s) AND is_active = 1 AND asset_class = 'EQUITY'
        """, (symbols,))
    else:
        pg_cur.execute("""
            SELECT id, nse_symbol FROM assets
            WHERE is_active = 1 AND asset_class = 'EQUITY'
            ORDER BY nse_symbol
        """)

    assets = pg_cur.fetchall()
    log.info(f"Processing {len(assets):,} active equities...")

    # ── Technical indicators ──────────────────────────────────────────────────
    if not args.skip_tech:
        log.info("\nComputing technical indicators from daily_prices...")
        tech_ok = tech_skip = 0

        ti_upsert = """
            INSERT INTO technical_indicators (
                asset_id, computed_date, close, change_1d_pct, rsi_14,
                pct_from_52w_high, pct_from_52w_low, sma_50, sma_200,
                volume, lag1_close, prev_close, prev_high, prev_low
            ) VALUES (
                %(asset_id)s, %(computed_date)s, %(close)s, %(change_1d_pct)s, %(rsi_14)s,
                %(pct_from_52w_high)s, %(pct_from_52w_low)s, %(sma_50)s, %(sma_200)s,
                %(volume)s, %(lag1_close)s, %(prev_close)s, %(prev_high)s, %(prev_low)s
            )
            ON CONFLICT (asset_id, computed_date) DO UPDATE SET
                close = EXCLUDED.close,
                change_1d_pct = EXCLUDED.change_1d_pct,
                rsi_14 = EXCLUDED.rsi_14,
                pct_from_52w_high = EXCLUDED.pct_from_52w_high,
                pct_from_52w_low = EXCLUDED.pct_from_52w_low,
                sma_50 = EXCLUDED.sma_50,
                sma_200 = EXCLUDED.sma_200,
                volume = EXCLUDED.volume,
                lag1_close = EXCLUDED.lag1_close
        """

        batch = []
        for i, asset in enumerate(assets):
            try:
                ti = compute_technical_indicators(asset["id"], ts_conn)
                if ti:
                    batch.append(ti)
                    tech_ok += 1
                else:
                    tech_skip += 1
            except Exception as e:
                log.warning(f"  {asset['nse_symbol']}: tech error — {e}")
                tech_skip += 1

            if len(batch) >= 200:
                pg_cur2 = pg_conn.cursor()
                psycopg2.extras.execute_batch(pg_cur2, ti_upsert, batch)
                pg_conn.commit()
                batch = []
                log.info(f"  Progress: {i+1:,}/{len(assets):,}")

        if batch:
            pg_cur2 = pg_conn.cursor()
            psycopg2.extras.execute_batch(pg_cur2, ti_upsert, batch)
            pg_conn.commit()

        log.info(f"  technical_indicators: {tech_ok:,} computed, {tech_skip:,} skipped")

    # ── Computed ratios ───────────────────────────────────────────────────────
    if not args.skip_ratios:
        log.info("\nEnriching computed_ratios from fundamental data...")
        ratio_ok = ratio_skip = 0

        cr_upsert = """
            INSERT INTO computed_ratios (
                asset_id, market_cap_cr, pe_ttm, pb, ev_ebitda, dividend_yield,
                roce, roe, pat_margin, operating_margin, revenue_growth_1y, pat_growth_1y,
                debt_equity, interest_coverage, quality_score
            ) VALUES (
                %(asset_id)s, %(market_cap_cr)s, %(pe_ttm)s, %(pb)s, %(ev_ebitda)s,
                %(dividend_yield)s, %(roce)s, %(roe)s, %(pat_margin)s, %(operating_margin)s,
                %(revenue_growth_1y)s, %(pat_growth_1y)s, %(debt_equity)s,
                %(interest_coverage)s, %(quality_score)s
            )
            ON CONFLICT (asset_id) DO UPDATE SET
                market_cap_cr = EXCLUDED.market_cap_cr,
                pe_ttm = EXCLUDED.pe_ttm,
                pb = EXCLUDED.pb,
                ev_ebitda = EXCLUDED.ev_ebitda,
                dividend_yield = EXCLUDED.dividend_yield,
                roce = EXCLUDED.roce,
                roe = EXCLUDED.roe,
                pat_margin = EXCLUDED.pat_margin,
                operating_margin = EXCLUDED.operating_margin,
                revenue_growth_1y = EXCLUDED.revenue_growth_1y,
                pat_growth_1y = EXCLUDED.pat_growth_1y,
                debt_equity = EXCLUDED.debt_equity,
                interest_coverage = EXCLUDED.interest_coverage,
                quality_score = EXCLUDED.quality_score,
                updated_at = NOW()
        """

        batch = []
        for i, asset in enumerate(assets):
            try:
                cr = compute_ratios_for_asset(asset["id"], pg_conn, ts_conn)
                if cr:
                    batch.append(cr)
                    ratio_ok += 1
                else:
                    ratio_skip += 1
            except Exception as e:
                log.warning(f"  {asset['nse_symbol']}: ratio error — {e}")
                ratio_skip += 1

            if len(batch) >= 200:
                pg_cur2 = pg_conn.cursor()
                psycopg2.extras.execute_batch(pg_cur2, cr_upsert, batch)
                pg_conn.commit()
                batch = []
                log.info(f"  Progress: {i+1:,}/{len(assets):,}")

        if batch:
            pg_cur2 = pg_conn.cursor()
            psycopg2.extras.execute_batch(pg_cur2, cr_upsert, batch)
            pg_conn.commit()

        log.info(f"  computed_ratios: {ratio_ok:,} enriched, {ratio_skip:,} skipped")

    pg_conn.close()
    ts_conn.close()
    log.info("\nDone.")


if __name__ == "__main__":
    main()
