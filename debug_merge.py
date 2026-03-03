from collections import defaultdict
from utils.db import get_db

with get_db() as conn:
    rows = conn.execute("SELECT id, isin, nse_symbol, bse_code FROM assets WHERE nse_symbol='8KMILES'").fetchall()
    print(f"8KMILES entries: {len(rows)}")
    for r in rows:
        print(f"  ID: {r['id']}, ISIN: {r['isin']}, Symbol: [{r['nse_symbol']}]")

    symbol_map = defaultdict(list)
    for r in rows:
        sym = r["nse_symbol"]
        if sym and sym != "":
            symbol_map[sym].append(r["id"])
    
    print(f"Symbol Map Keys (repr): {[repr(k) for k in symbol_map.keys()]}")
    print(f"Symbol Map Values: {list(symbol_map.values())}")
