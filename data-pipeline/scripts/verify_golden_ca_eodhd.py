import sqlite3
import logging
from datetime import date
from core.db import get_db

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def verify_against_eodhd():
    with get_db() as conn:
        # Get EODHD actions since 2020
        eodhd_actions = conn.execute("""
            SELECT e.asset_id, e.date, e.type, e.value, a.nse_symbol, a.bse_code
            FROM eodhd_corporate_actions e
            JOIN assets a ON e.asset_id = a.id
            WHERE e.date >= '2020-01-01'
        """).fetchall()
        
        missing_count = 0
        total = len(eodhd_actions)
        missing_examples = []
        
        for e in eodhd_actions:
            # Map EODHD type to our Golden type
            type_map = {
                "dividend": "DIVIDEND",
                "split": "SPLIT",
                "bonus": "BONUS"
            }
            mapped_type = type_map.get(e["type"])
            if not mapped_type:
                continue
                
            # See if we have an equivalent in Golden CA within +/- 5 days
            # We search ANY asset ID that shares the same symbol/bse_code because EODHD might map to a different duplicate asset
            golden = conn.execute("""
                SELECT id 
                FROM corporate_actions
                WHERE asset_id IN (
                    SELECT id FROM assets 
                    WHERE (nse_symbol = ? AND nse_symbol IS NOT NULL) 
                       OR (bse_code = ? AND bse_code IS NOT NULL)
                )
                  AND action_type = ? 
                  AND ex_date >= date(?, '-5 days')
                  AND ex_date <= date(?, '+5 days')
            """, (e["nse_symbol"], e["bse_code"], mapped_type, e["date"], e["date"])).fetchone()
            
            if not golden:
                missing_count += 1
                if len(missing_examples) < 10:
                    missing_examples.append(f"{e['nse_symbol'] or e['bse_code']}: {mapped_type} on {e['date']} (Val: {e['value']})")
                    
        print(f"Total EODHD Actions (since 2020): {total}")
        print(f"Missing in Golden CA (True Missing): {missing_count} ({(missing_count/total)*100 if total else 0:.1f}%)")
        
        if missing_examples:
            print("\nExamples of truly missing actions:")
            for m in missing_examples:
                print("  - " + m)

if __name__ == "__main__":
    verify_against_eodhd()
