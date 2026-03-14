import re

with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

# 1. Fix "Re 1", "Re 0.75", "Rs Per Sh", etc in Dividends
old_div_regex = r'match = re.search(r"RS\\.?\\s*(\\d+(?:\\.\\d+)?)", subject)'
new_div_regex = r'match = re.search(r"(?:RS|RE|₹|INR)\\.?\\s*-?\\s*(\\d+(?:\\.\\d+)?)", subject)'

content = content.replace(old_div_regex, new_div_regex)

# 2. Fix Splits with "Re 1", "Re 2", "Re 0.10"
old_split_regex = r'match = re.search(r"RS\\.?\\s*(\\d+(?:\\.\\d+)?).*TO\\s*RS\\.?\\s*(\\d+(?:\\.\\d+)?)", subject)'
new_split_regex = r'match = re.search(r"(?:RS|RE)\\.?\\s*(\\d+(?:\\.\\d+)?).*?TO\\s*(?:RS|RE)\\.?\\s*(\\d+(?:\\.\\d+)?)", subject)'

content = content.replace(old_split_regex, new_split_regex)

with open("pipelines/golden_ca_pipeline.py", "w") as f:
    f.write(content)
