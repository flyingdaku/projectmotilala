import json

with open("raw_data/ca_mapping_log.json", "r") as f:
    log_data = json.load(f)

# Sort by action_type to make it easier to validate
sorted_log = sorted(log_data.items(), key=lambda x: (x[1]["action_type"], x[1]["source"]))

print(f"Total Unique Mappings: {len(sorted_log)}")

# Let's inspect DIVIDENDS first
dividends = [item for item in sorted_log if item[1]["action_type"] == "DIVIDEND"]
print(f"\\n--- Sample DIVIDEND Mappings ({len(dividends)} total) ---")
for i, (key, val) in enumerate(dividends[:20]):
    print(f"{val['source']} | {val['company_symbol']} | {val['ex_date']} | Raw: '{key}' -> Amt: {val['dividend_amount']}")

# SPLITS
splits = [item for item in sorted_log if item[1]["action_type"] == "SPLIT"]
print(f"\\n--- Sample SPLIT Mappings ({len(splits)} total) ---")
for i, (key, val) in enumerate(splits[:20]):
    print(f"{val['source']} | {val['company_symbol']} | {val['ex_date']} | Raw: '{key}' -> Ratio: {val['ratio']}")

# BONUS
bonus = [item for item in sorted_log if item[1]["action_type"] == "BONUS"]
print(f"\\n--- Sample BONUS Mappings ({len(bonus)} total) ---")
for i, (key, val) in enumerate(bonus[:20]):
    print(f"{val['source']} | {val['company_symbol']} | {val['ex_date']} | Raw: '{key}' -> Ratio: {val['ratio']}")

# UNMAPPED (OTHER)
others = [item for item in sorted_log if item[1]["action_type"] == "OTHER"]
print(f"\\n--- Sample UNMAPPED Mappings ({len(others)} total) ---")
for i, (key, val) in enumerate(others[:30]):
    print(f"{val['source']} | {val['company_symbol']} | {val['ex_date']} | Raw: '{key}'")
