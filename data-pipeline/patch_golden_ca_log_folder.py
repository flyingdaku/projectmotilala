import json
import re

with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

# Replace the single file log logic with dictionary of logs grouped by path
old_init_log = """    # Initialize the JSON log for mapping visibility
    log_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "raw_data", "ca_mapping_log.json")
    mapping_log = {}
    if os.path.exists(log_file_path):
        try:
            with open(log_file_path, "r") as lf:
                mapping_log = json.load(lf)
        except Exception as e:
            logger.warning(f"Failed to load existing mapping log: {e}")"""

new_init_log = """    # Initialize the JSON log mechanism
    from collections import defaultdict
    import datetime
    log_base_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "raw_data", "CA_LOGS")
    # mapping_logs: path -> dictionary of mappings
    mapping_logs = defaultdict(dict)"""

content = content.replace(old_init_log, new_init_log)

old_nse_log = """            # Log mapping
            if r["subject"] not in mapping_log:
                mapping_log[r["subject"]] = {
                    "source": "NSE",
                    "company_symbol": r["symbol"],
                    "ex_date": r["ex_date"],
                    "action_type": parsed["action_type"],
                    "dividend_amount": parsed["dividend_amount"],
                    "ratio": f"{parsed['ratio_numerator']}:{parsed['ratio_denominator']}"
                }"""

new_nse_log = """            # Log mapping
            try:
                ex_d = datetime.date.fromisoformat(r["ex_date"])
                log_path = os.path.join(log_base_path, "NSE", str(ex_d.year), f"{ex_d.month:02d}", "log.json")
            except:
                log_path = os.path.join(log_base_path, "NSE", "UNKNOWN", "log.json")
                
            if r["subject"] not in mapping_logs[log_path]:
                mapping_logs[log_path][r["subject"]] = {
                    "source": "NSE",
                    "company_symbol": r["symbol"],
                    "ex_date": r["ex_date"],
                    "action_type": parsed["action_type"],
                    "dividend_amount": parsed["dividend_amount"],
                    "ratio": f"{parsed['ratio_numerator']}:{parsed['ratio_denominator']}"
                }"""

content = content.replace(old_nse_log, new_nse_log)

old_bse_log = """            # Log mapping
            if r["purpose"] not in mapping_log:
                mapping_log[r["purpose"]] = {
                    "source": "BSE",
                    "company_symbol": r["scrip_code"],
                    "ex_date": r["ex_date"],
                    "action_type": act_type,
                    "dividend_amount": div_amt,
                    "ratio": f"{num}:{den}"
                }"""

new_bse_log = """            # Log mapping
            try:
                ex_d = datetime.date.fromisoformat(r["ex_date"])
                log_path = os.path.join(log_base_path, "BSE", str(ex_d.year), f"{ex_d.month:02d}", "log.json")
            except:
                log_path = os.path.join(log_base_path, "BSE", "UNKNOWN", "log.json")
                
            if r["purpose"] not in mapping_logs[log_path]:
                mapping_logs[log_path][r["purpose"]] = {
                    "source": "BSE",
                    "company_symbol": r["scrip_code"],
                    "ex_date": r["ex_date"],
                    "action_type": act_type,
                    "dividend_amount": div_amt,
                    "ratio": f"{num}:{den}"
                }"""

content = content.replace(old_bse_log, new_bse_log)

old_save_log = """    # Save the updated mapping log
    try:
        os.makedirs(os.path.dirname(log_file_path), exist_ok=True)
        with open(log_file_path, "w") as lf:
            json.dump(mapping_log, lf, indent=2)
    except Exception as e:
        logger.error(f"Failed to save mapping log: {e}")"""

new_save_log = """    # Save the updated mapping logs
    for path, data in mapping_logs.items():
        try:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            # Load existing if any
            existing_data = {}
            if os.path.exists(path):
                with open(path, "r") as lf:
                    existing_data = json.load(lf)
            
            # Update with new
            existing_data.update(data)
            
            with open(path, "w") as lf:
                json.dump(existing_data, lf, indent=2)
        except Exception as e:
            logger.error(f"Failed to save mapping log at {path}: {e}")"""

content = content.replace(old_save_log, new_save_log)

with open("pipelines/golden_ca_pipeline.py", "w") as f:
    f.write(content)
