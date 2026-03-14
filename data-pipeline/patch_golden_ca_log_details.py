import json

with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

# 1. Update NSE query to include 'symbol'
old_nse_query = """        # Get NSE actions
        nse_raw = conn.execute(\"\"\"
            SELECT id, asset_id, subject, ex_date, record_date 
            FROM src_nse_corporate_actions
            WHERE ex_date BETWEEN ? AND ?
        \"\"\", (from_date.isoformat(), to_date.isoformat())).fetchall()"""

new_nse_query = """        # Get NSE actions
        nse_raw = conn.execute(\"\"\"
            SELECT id, asset_id, symbol, subject, ex_date, record_date 
            FROM src_nse_corporate_actions
            WHERE ex_date BETWEEN ? AND ?
        \"\"\", (from_date.isoformat(), to_date.isoformat())).fetchall()"""

content = content.replace(old_nse_query, new_nse_query)

# 2. Update BSE query to include 'scrip_code'
old_bse_query = """        # Get BSE actions
        bse_raw = conn.execute(\"\"\"
            SELECT id, asset_id, purpose, ex_date, record_date 
            FROM src_bse_corporate_actions
            WHERE ex_date BETWEEN ? AND ?
        \"\"\", (from_date.isoformat(), to_date.isoformat())).fetchall()"""

new_bse_query = """        # Get BSE actions
        bse_raw = conn.execute(\"\"\"
            SELECT id, asset_id, scrip_code, purpose, ex_date, record_date 
            FROM src_bse_corporate_actions
            WHERE ex_date BETWEEN ? AND ?
        \"\"\", (from_date.isoformat(), to_date.isoformat())).fetchall()"""

content = content.replace(old_bse_query, new_bse_query)

# 3. Update NSE log entry
old_nse_log = """            # Log mapping
            if r["subject"] not in mapping_log:
                mapping_log[r["subject"]] = {
                    "source": "NSE",
                    "action_type": parsed["action_type"],
                    "dividend_amount": parsed["dividend_amount"],
                    "ratio": f"{parsed['ratio_numerator']}:{parsed['ratio_denominator']}"
                }"""

new_nse_log = """            # Log mapping
            if r["subject"] not in mapping_log:
                mapping_log[r["subject"]] = {
                    "source": "NSE",
                    "company_symbol": r["symbol"],
                    "ex_date": r["ex_date"],
                    "action_type": parsed["action_type"],
                    "dividend_amount": parsed["dividend_amount"],
                    "ratio": f"{parsed['ratio_numerator']}:{parsed['ratio_denominator']}"
                }"""

content = content.replace(old_nse_log, new_nse_log)

# 4. Update BSE log entry
old_bse_log = """            # Log mapping
            if r["purpose"] not in mapping_log:
                mapping_log[r["purpose"]] = {
                    "source": "BSE",
                    "action_type": act_type,
                    "dividend_amount": div_amt,
                    "ratio": f"{num}:{den}"
                }"""

new_bse_log = """            # Log mapping
            if r["purpose"] not in mapping_log:
                mapping_log[r["purpose"]] = {
                    "source": "BSE",
                    "company_symbol": r["scrip_code"],
                    "ex_date": r["ex_date"],
                    "action_type": act_type,
                    "dividend_amount": div_amt,
                    "ratio": f"{num}:{den}"
                }"""

content = content.replace(old_bse_log, new_bse_log)

with open("pipelines/golden_ca_pipeline.py", "w") as f:
    f.write(content)
