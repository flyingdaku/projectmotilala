with open("pipelines/bse_corporate_actions_parser.py", "r") as f:
    content = f.read()

# Fix Re/Re. in BSE parsing as well
import re

old_bse_div = r'match = re.search(r"R[se]\.?\s*-\s*([\d]+(?:\.[\d]+)?)", purpose, re.IGNORECASE)'
new_bse_div = r'match = re.search(r"(?:RS|RE|₹|INR)[\.\s-]*([\d]+(?:\.[\d]+)?)", purpose, re.IGNORECASE)'

# Since we're totally overhauling parse_bse_dividend_amount, let's just replace the whole function
old_func_start = """def parse_bse_dividend_amount(purpose: str) -> float:"""
old_func_end = """    return 0.0"""

start_idx = content.find(old_func_start)
end_idx = content.find(old_func_end) + len(old_func_end)

if start_idx != -1 and end_idx != -1:
    new_func = """def parse_bse_dividend_amount(purpose: str) -> float:
    \"\"\"Extract dividend amount from BSE Purpose string.\"\"\"
    # Find all dividend amounts mentioned and sum them
    import re
    matches = re.findall(r"(?:RS|RE|₹|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", purpose, re.IGNORECASE)
    if matches:
        return sum(float(m) for m in matches)
    return 0.0"""
    
    content = content[:start_idx] + new_func + content[end_idx:]
    with open("pipelines/bse_corporate_actions_parser.py", "w") as f:
        f.write(content)
    print("Patched BSE div parser successfully")

# Also fix BSE Split parser
old_split_start = """def parse_bse_bonus_ratio(purpose: str) -> Tuple[float, float]:"""
old_split_end = """    return 0.0, 1.0"""

start_idx_split = content.find(old_split_start)
end_idx_split = content.find(old_split_end) + len(old_split_end)

if start_idx_split != -1 and end_idx_split != -1:
    new_split_func = """def parse_bse_bonus_ratio(purpose: str) -> Tuple[float, float]:
    import re
    # Direct ratio pattern: "4:1", "1 : 1"
    match = re.search(r"(\\d+(?:\\.\\d+)?)\\s*[:]\\s*(\\d+(?:\\.\\d+)?)", purpose)
    if match:
        return float(match.group(1)), float(match.group(2))

    # Face value split pattern
    match = re.search(r"from\\s+(?:RS|RE|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)[\\s/-]*to\\s+(?:RS|RE|INR)[\\.\\s-]*(\\d+(?:\\.\\d+)?)", purpose, re.IGNORECASE)
    if match:
        old_fv = float(match.group(1))
        new_fv = float(match.group(2))
        if new_fv > 0:
            return old_fv, new_fv

    return 0.0, 1.0"""
    
    content = content[:start_idx_split] + new_split_func + content[end_idx_split:]
    with open("pipelines/bse_corporate_actions_parser.py", "w") as f:
        f.write(content)
    print("Patched BSE split parser successfully")

