import json

with open("raw_data/ca_mapping_log.json", "r") as f:
    log_data = json.load(f)

print("--- DIVIDENDS WITH 0.0 AMOUNT ---")
for k, v in log_data.items():
    if v["action_type"] == "DIVIDEND" and v["dividend_amount"] == 0.0:
        if "Rs" in k or "Re" in k or "₹" in k:
            print(f"{v['source']} | {v['company_symbol']} | {k}")

print("\\n--- SPLITS WITH 0.0 IN RATIO ---")
for k, v in log_data.items():
    if v["action_type"] == "SPLIT" and ("0.0" in v["ratio"]):
        print(f"{v['source']} | {v['company_symbol']} | {k} -> {v['ratio']}")

print("\\n--- BONUS WITH 0.0 IN RATIO ---")
for k, v in log_data.items():
    if v["action_type"] == "BONUS" and ("0.0" in v["ratio"]):
        print(f"{v['source']} | {v['company_symbol']} | {k} -> {v['ratio']}")
