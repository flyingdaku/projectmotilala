import logging
import sys
from datetime import date, timedelta
from pipelines.nse_bse_reconciler import reconcile_nse_bse_corporate_actions

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[
        logging.FileHandler("reconciliation.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

def run_mass_reconciliation():
    start_year = 2000
    end_year = 2026
    
    total_discrepancies = []
    
    for year in range(start_year, end_year + 1):
        s = date(year, 1, 1)
        e = date(year, 12, 31)
        
        logger.info(f"=== RECONCILING YEAR {year} ===")
        try:
            discrepancies = reconcile_nse_bse_corporate_actions(s, e)
            if discrepancies:
                logger.warning(f"Found {len(discrepancies)} discrepancies in {year}")
                total_discrepancies.extend(discrepancies)
                # Group by type and count
                types = {}
                for d in discrepancies:
                    t = d["type"]
                    types[t] = types.get(t, 0) + 1
                logger.info(f"Discrepancy summary for {year}: {types}")
            else:
                logger.info(f"Year {year} is perfectly matched.")
        except Exception as ex:
            logger.error(f"Failed to reconcile year {year}: {ex}")

    logger.info("=== FINAL RECONCILIATION SUMMARY ===")
    logger.info(f"Total Years Processed: {end_year - start_year + 1}")
    logger.info(f"Total Discrepancies Found: {len(total_discrepancies)}")
    
    # Global summary by type
    global_types = {}
    for d in total_discrepancies:
        t = d["type"]
        global_types[t] = global_types.get(t, 0) + 1
    logger.info(f"Global Summary: {global_types}")

    # Write detailed report to file
    with open("reconciliation_report.txt", "w") as f:
        f.write("NSE vs BSE Corporate Action Reconciliation Report\n")
        f.write("==================================================\n\n")
        f.write(f"Total Discrepancies: {len(total_discrepancies)}\n")
        f.write(f"Summary: {global_types}\n\n")
        f.write("Details (top 100):\n")
        for d in total_discrepancies[:100]:
            f.write(f"[{d['type']}] {d['message']}\n")
        if len(total_discrepancies) > 100:
            f.write(f"... and {len(total_discrepancies) - 100} more.\n")

if __name__ == "__main__":
    run_mass_reconciliation()
