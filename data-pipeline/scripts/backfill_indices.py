import os
import sys
import argparse
import requests
import json
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, date, timedelta
from typing import List, Dict, Tuple
import time

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from core.db import get_connection, generate_id

WORKERS = 8          # parallel index fetchers
CHUNK_DAYS = 365     # 1 year per API request
SLEEP_BETWEEN = 0.15 # seconds between chunks within a thread
TIMEOUT = 10         # seconds — fail fast on missing early-year chunks
MAX_EMPTY_STREAK = 3 # skip remaining early chunks after N consecutive empties
_print_lock = threading.Lock()

def log(msg: str):
    with _print_lock:
        print(msg, flush=True)


def chunk_date_ranges(start_date: date, end_date: date, max_days: int = CHUNK_DAYS) -> List[Tuple[date, date]]:
    chunks, current = [], start_date
    while current <= end_date:
        end = min(current + timedelta(days=max_days - 1), end_date)
        chunks.append((current, end))
        current = end + timedelta(days=1)
    return chunks


def _make_session() -> requests.Session:
    s = requests.Session()
    s.headers.update({
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "Origin": "https://www.niftyindices.com",
    })
    return s


def _fetch_chunk(session: requests.Session, index_name: str, start: str, end: str, data_type: str) -> List[Dict]:
    url = "https://www.niftyindices.com/Backpage.aspx/getHistoricaldataDBtoString"
    cinfo = json.dumps({"name": index_name, "startDate": start, "endDate": end,
                        "historicaltype": "2", "DataType": data_type})
    resp = session.post(url, json={"cinfo": cinfo}, timeout=TIMEOUT)
    if resp.status_code != 200:
        return []
    d_str = resp.json().get("d", "")
    idx = d_str.find("[")
    if idx == -1:
        return []
    return json.loads(d_str[idx:])


def _parse_rows(rows: List[Dict], data_type: str) -> List[Tuple]:
    """Returns list of (iso_date, open, high, low, close) tuples."""
    result = []
    for row in rows:
        try:
            if data_type == "TR":
                raw_date = row.get("TRIDate") or row.get("Date")
                if not raw_date:
                    continue
                date_obj = (datetime.fromisoformat(raw_date).date()
                            if "T" in str(raw_date)
                            else datetime.strptime(raw_date, "%d %b %Y").date())
                val = row.get("Total Returns Index") or row.get("CLOSE")
                c = float(val) if val and str(val) not in ("-", "") else None
                if c is not None:
                    result.append((date_obj.isoformat(), None, None, None, c))
            else:
                raw_date = row.get("HistoricalDate")
                if not raw_date:
                    continue
                date_obj = datetime.strptime(raw_date, "%d %b %Y").date()
                def _f(v): return float(v) if v and v != "-" else None
                o, h, l, c = _f(row.get("OPEN")), _f(row.get("HIGH")), _f(row.get("LOW")), _f(row.get("CLOSE"))
                if c is not None:
                    result.append((date_obj.isoformat(), o, h, l, c))
        except Exception:
            pass
    return result


def fetch_index(index_name: str, start_date: date, end_date: date) -> Tuple[str, List[Tuple], str]:
    """Fetch all history for one index. Returns (index_name, parsed_rows, data_type).

    Chunks are iterated newest → oldest so we always hit real data first.
    Once MAX_EMPTY_STREAK consecutive trailing chunks return nothing (the index
    didn't exist yet in those years) we stop — no point going further back.
    """
    session = _make_session()
    chunks = chunk_date_ranges(start_date, end_date)
    chunks_rev = list(reversed(chunks))   # newest first
    all_rows, data_type = [], "TR"
    empty_streak = 0

    for c_start, c_end in chunks_rev:
        s, e = c_start.strftime("%d-%b-%Y"), c_end.strftime("%d-%b-%Y")
        got_data = False
        try:
            rows = _fetch_chunk(session, index_name, s, e, "TR")
            if rows:
                data_type = "TR"
            else:
                rows = _fetch_chunk(session, index_name, s, e, "HR")
                if rows:
                    data_type = "HR"
            parsed = _parse_rows(rows, data_type)
            if parsed:
                all_rows.extend(parsed)
                got_data = True
        except Exception:
            pass  # timeout counts as empty

        if got_data:
            empty_streak = 0
        else:
            empty_streak += 1
            if empty_streak >= MAX_EMPTY_STREAK:
                break  # index didn't exist this far back — stop

        time.sleep(SLEEP_BETWEEN)

    return index_name, all_rows, data_type


def write_index(conn, idx_id: str, rows: List[Tuple], src_exchange: str):
    conn.executemany(
        """INSERT INTO daily_prices
           (asset_id, date, open, high, low, close, source_exchange, is_verified)
           VALUES (%s, %s, %s, %s, %s, %s, %s, 1)
           ON CONFLICT (asset_id, date, source_exchange) DO UPDATE SET
             open = EXCLUDED.open, high = EXCLUDED.high,
             low = EXCLUDED.low, close = EXCLUDED.close""",
        [(idx_id, iso_date, o, h, l, c, src_exchange) for iso_date, o, h, l, c in rows],
    )


def main():
    parser = argparse.ArgumentParser(description="Backfill Nifty Indices historical data (parallel)")
    parser.add_argument("--start", default="2000-01-01")
    parser.add_argument("--end", default=date.today().isoformat())
    parser.add_argument("--indices", nargs="+", help="Specific index names")
    parser.add_argument("--workers", type=int, default=WORKERS)
    args = parser.parse_args()

    start_date = datetime.strptime(args.start, "%Y-%m-%d").date()
    end_date   = datetime.strptime(args.end,   "%Y-%m-%d").date()
    chunks_n   = len(chunk_date_ranges(start_date, end_date))
    print(f"Backfilling {start_date} → {end_date}  ({chunks_n} chunks/index)")

    # Resolve target index list + ensure DB rows exist
    with get_connection() as conn:
        if args.indices:
            target = []
            for name in args.indices:
                symbol = f"^{name.upper().replace(' ', '')}"
                row = conn.execute("SELECT id FROM assets WHERE nse_symbol = %s", (symbol,)).fetchone()
                if not row:
                    idx_id = generate_id()
                    conn.execute(
                        "INSERT INTO assets (id, nse_symbol, name, asset_class, is_active) VALUES (%s, %s, %s, 'INDEX', 1) ON CONFLICT (id) DO NOTHING",
                        (idx_id, symbol, name))
                else:
                    idx_id = row["id"]
                target.append({"name": name, "symbol": symbol, "id": idx_id})
        else:
            # Seed from NSE allIndices
            nse = requests.Session()
            nse.headers.update({"User-Agent": "Mozilla/5.0", "Accept": "application/json"})
            try:
                nse.get("https://www.nseindia.com", timeout=15)
                resp = nse.get("https://www.nseindia.com/api/allIndices", timeout=15)
                api_indices = resp.json().get("data", []) if resp.ok else []
                print(f"Fetched {len(api_indices)} indices from NSE API.")
            except Exception as e:
                print(f"NSE API failed: {e}")
                api_indices = []

            for entry in api_indices:
                name = entry.get("indexSymbol")
                if not name:
                    continue
                symbol = f"^{name.upper().replace(' ', '')}"
                if not conn.execute("SELECT 1 FROM assets WHERE nse_symbol = %s", (symbol,)).fetchone():
                    conn.execute(
                        "INSERT INTO assets (id, nse_symbol, name, asset_class, is_active) VALUES (%s, %s, %s, 'INDEX', 1) ON CONFLICT (id) DO NOTHING",
                        (generate_id(), symbol, name))

            rows = conn.execute("SELECT id, name, nse_symbol FROM assets WHERE asset_class = 'INDEX'").fetchall()
            target = [{"name": r["name"], "symbol": r["nse_symbol"], "id": r["id"]} for r in rows]

    print(f"Fetching {len(target)} indices with {args.workers} workers …\n")

    # Pre-build name→id map for DB writes
    id_map = {t["name"]: t["id"] for t in target}
    names  = [t["name"] for t in target]

    done = 0
    total = len(names)
    total_rows = 0

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(fetch_index, name, start_date, end_date): name for name in names}
        for fut in as_completed(futures):
            name, rows, data_type = fut.result()
            src_exchange = "NSE_TRI" if data_type == "TR" else "NSE"
            idx_id = id_map[name]
            if rows:
                with get_connection() as conn:
                    write_index(conn, idx_id, rows, src_exchange)
            done += 1
            total_rows += len(rows)
            log(f"[{done:3d}/{total}] {name:<40s} {len(rows):>5d} days  ({src_exchange})")

    print(f"\nDone. {total_rows:,} total rows written across {total} indices.")


if __name__ == "__main__":
    main()
