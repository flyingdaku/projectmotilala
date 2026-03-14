with open("pipelines/bse_corporate_actions_parser.py", "r") as f:
    content = f.read()

# Fix double backslashes in BSE parser too
old_bse_div = r'matches = re.findall(r"(?:RS|RE|₹|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", purpose, re.IGNORECASE)'
new_bse_div = r"matches = re.findall(r'(?:RS|RE|₹|INR)[\.\s-]*(\d+(?:\.\d+)?)', purpose, re.IGNORECASE)"

content = content.replace(old_bse_div, new_bse_div)

old_bse_split_1 = r'match = re.search(r"(\\d+(?:\\.\\d+)?)\\s*[:]\\s*(\\d+(?:\\.\\d+)?)", purpose)'
new_bse_split_1 = r"match = re.search(r'(\d+(?:\.\d+)?)\s*[:]\s*(\d+(?:\.\d+)?)', purpose)"

content = content.replace(old_bse_split_1, new_bse_split_1)

old_bse_split_2 = r'match = re.search(r"from\\s+(?:RS|RE|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)[\\s/-]*to\\s+(?:RS|RE|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", purpose, re.IGNORECASE)'
new_bse_split_2 = r"match = re.search(r'from\s+(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?)[\s/-]*to\s+(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?)', purpose, re.IGNORECASE)"

content = content.replace(old_bse_split_2, new_bse_split_2)

with open("pipelines/bse_corporate_actions_parser.py", "w") as f:
    f.write(content)
