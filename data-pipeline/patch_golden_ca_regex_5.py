with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

# Fix the double escaping backslashes in python raw strings. We shouldn't use double backslashes in regex r-strings.

old_split_regex = r'match = re.search(r"(?:RS|RE|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?).*?TO\\s*(?:RS|RE|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", subject)'
new_split_regex = r"match = re.search(r'(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?).*?TO\s*(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?)', subject)"

content = content.replace(old_split_regex, new_split_regex)

old_div_regex = r'matches = re.findall(r"(?:RS|RE|₹|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", subject)'
new_div_regex = r"matches = re.findall(r'(?:RS|RE|₹|INR)[\.\s-]*(\d+(?:\.\d+)?)', subject)"

content = content.replace(old_div_regex, new_div_regex)

with open("pipelines/golden_ca_pipeline.py", "w") as f:
    f.write(content)
