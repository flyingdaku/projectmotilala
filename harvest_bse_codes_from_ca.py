import json
import logging
from utils.db import get_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def harvest_codes_from_ca():
    with get_db() as conn:
        # Select all BSE corporate actions
        records = conn.execute(
            "SELECT asset_id, raw_announcement FROM corporate_actions WHERE source_exchange='BSE' AND raw_announcement IS NOT NULL"
        ).fetchall()
        
        mapping = {} # asset_id -> set of bse_codes
        
        for r in records:
            asset_id = r["asset_id"]
            try:
                raw = json.loads(r["raw_announcement"])
                # BSE raw usually has "Security Code"
                if isinstance(raw, list):
                    raw = raw[0] # Aggregated case
                    
                code = str(raw.get("Security Code", "")).strip()
                if code and code != "nan":
                    if asset_id not in mapping:
                        mapping[asset_id] = set()
                    mapping[asset_id].add(code)
            except:
                continue

        logger.info(f"Analyzed {len(records)} CA records. Found unique BSE codes for {len(mapping)} assets.")

        updates = []
        for asset_id, codes in mapping.items():
            if len(codes) == 1:
                updates.append((list(codes)[0], asset_id))
            else:
                # Multiple codes for one asset? Just pick one for now or skip
                # (Could be a data quality issue in CA)
                updates.append((list(codes)[0], asset_id))

        if updates:
            conn.executemany(
                "UPDATE assets SET bse_code = ?, bse_listed = 1 WHERE id = ? AND (bse_code IS NULL OR bse_code = '')",
                updates
            )
            updated = conn.execute("SELECT changes()").fetchone()[0]
            logger.info(f"Updated {updated} assets with BSE codes harvested from CA legacy data.")

if __name__ == "__main__":
    harvest_codes_from_ca()
