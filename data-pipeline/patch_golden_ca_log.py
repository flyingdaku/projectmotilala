import json
with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

# Add json import if not there
if "import json" not in content:
    content = content.replace("import logging", "import logging\nimport json\nimport os")

# Add the logging logic inside the run_golden_ca_pipeline function
log_init = """    logger.info(f"[GOLDEN_CA] Starting merge from {from_date} to {to_date}")
    
    # Initialize the JSON log for mapping visibility
    log_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "raw_data", "ca_mapping_log.json")
    mapping_log = {}
    if os.path.exists(log_file_path):
        try:
            with open(log_file_path, "r") as lf:
                mapping_log = json.load(lf)
        except Exception as e:
            logger.warning(f"Failed to load existing mapping log: {e}")"""

content = content.replace('    logger.info(f"[GOLDEN_CA] Starting merge from {from_date} to {to_date}")', log_init)

nse_log = """            candidates[key] = {
                "asset_id": r["asset_id"],
                "action_type": parsed["action_type"],
                "ex_date": r["ex_date"],
                "ratio_numerator": parsed["ratio_numerator"],
                "ratio_denominator": parsed["ratio_denominator"],
                "dividend_amount": parsed["dividend_amount"],
                "source_exchange": "NSE",
                "raw_announcement": r["subject"],
                "record_date": r["record_date"]
            }
            
            # Log mapping
            if r["subject"] not in mapping_log:
                mapping_log[r["subject"]] = {
                    "source": "NSE",
                    "action_type": parsed["action_type"],
                    "dividend_amount": parsed["dividend_amount"],
                    "ratio": f"{parsed['ratio_numerator']}:{parsed['ratio_denominator']}"
                }"""

content = content.replace("""            candidates[key] = {
                "asset_id": r["asset_id"],
                "action_type": parsed["action_type"],
                "ex_date": r["ex_date"],
                "ratio_numerator": parsed["ratio_numerator"],
                "ratio_denominator": parsed["ratio_denominator"],
                "dividend_amount": parsed["dividend_amount"],
                "source_exchange": "NSE",
                "raw_announcement": r["subject"],
                "record_date": r["record_date"]
            }""", nse_log)

bse_log = """                candidates[key] = {
                    "asset_id": r["asset_id"],
                    "action_type": act_type,
                    "ex_date": r["ex_date"],
                    "ratio_numerator": num,
                    "ratio_denominator": den,
                    "dividend_amount": div_amt,
                    "source_exchange": "BSE",
                    "raw_announcement": r["purpose"],
                    "record_date": r["record_date"]
                }
                
            # Log mapping
            if r["purpose"] not in mapping_log:
                mapping_log[r["purpose"]] = {
                    "source": "BSE",
                    "action_type": act_type,
                    "dividend_amount": div_amt,
                    "ratio": f"{num}:{den}"
                }"""

content = content.replace("""                candidates[key] = {
                    "asset_id": r["asset_id"],
                    "action_type": act_type,
                    "ex_date": r["ex_date"],
                    "ratio_numerator": num,
                    "ratio_denominator": den,
                    "dividend_amount": div_amt,
                    "source_exchange": "BSE",
                    "raw_announcement": r["purpose"],
                    "record_date": r["record_date"]
                }""", bse_log)

save_log = """    # Save the updated mapping log
    try:
        os.makedirs(os.path.dirname(log_file_path), exist_ok=True)
        with open(log_file_path, "w") as lf:
            json.dump(mapping_log, lf, indent=2)
    except Exception as e:
        logger.error(f"Failed to save mapping log: {e}")

    logger.info(f"[GOLDEN_CA] ✅ Done. {inserted} inserted, {updated} updated")"""

content = content.replace('    logger.info(f"[GOLDEN_CA] ✅ Done. {inserted} inserted, {updated} updated")', save_log)

with open("pipelines/golden_ca_pipeline.py", "w") as f:
    f.write(content)
