import json
import logging
import os
import sys
from datetime import date
from utils.db import get_db, generate_id

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def pre_populate_assets_from_ca():
    base_dir = "data-pipeline/raw_data/NSE_CORP_ACTIONS"
    if not os.path.exists(base_dir):
        logger.error(f"Directory {base_dir} does not exist.")
        return

    found_isins = {} # isin -> symbol

    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".json"):
                path = os.path.join(root, file)
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        data = json.load(f)
                        if isinstance(data, list):
                            for item in data:
                                isin = item.get("isin", "").strip()
                                symbol = item.get("symbol", "").strip()
                                if isin and symbol:
                                    found_isins[isin] = symbol
                except Exception as e:
                    logger.warning(f"Failed to read {path}: {e}")

    logger.info(f"Found {len(found_isins)} unique ISINs in corporate action files.")

    with get_db() as conn:
        existing = {row["isin"] for row in conn.execute("SELECT isin FROM assets")}
        to_insert = []
        for isin, symbol in found_isins.items():
            if isin not in existing:
                asset_id = generate_id()
                # Use symbol as name since we don't have the full company name here
                to_insert.append((asset_id, isin, symbol, symbol, 'EQUITY', 1))
                existing.add(isin)

        if to_insert:
            logger.info(f"Inserting {len(to_insert)} new assets discovered from CA logs...")
            conn.executemany(
                "INSERT INTO assets (id, isin, nse_symbol, name, asset_class, is_active) VALUES (?, ?, ?, ?, ?, ?)",
                to_insert
            )
        else:
            logger.info("No new assets found to insert.")

if __name__ == "__main__":
    pre_populate_assets_from_ca()
