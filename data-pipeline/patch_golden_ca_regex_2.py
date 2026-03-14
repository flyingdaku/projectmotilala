import re

with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

# Fix the bug: Need to handle 'Re' as well, and sometimes no space after 'Rs', 'Re', etc.
old_div_regex = r'match = re.search(r"(?:RS|RE|₹|INR)\\.?\\s*-?\\s*(\\d+(?:\\.\\d+)?)", subject)'
new_div_regex = r'match = re.search(r"(?:RS|RE|₹|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", subject)'

content = content.replace(old_div_regex, new_div_regex)

old_split_regex = r'match = re.search(r"(?:RS|RE)\\.?\\s*(\\d+(?:\\.\\d+)?).*?TO\\s*(?:RS|RE)\\.?\\s*(\\d+(?:\\.\\d+)?)", subject)'
new_split_regex = r'match = re.search(r"(?:RS|RE)[\\.\\s-]*(\\d+(?:\\.\\d+)?).*?TO\\s*(?:RS|RE)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", subject)'

content = content.replace(old_split_regex, new_split_regex)

with open("pipelines/golden_ca_pipeline.py", "w") as f:
    f.write(content)
