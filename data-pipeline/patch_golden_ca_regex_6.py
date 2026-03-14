import re

with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

old_div_regex = r"matches = re.findall(r'(?:RS|RE|₹|INR)[\.\s-]*(\d+(?:\.\d+)?)', subject)"
new_div_regex = r"matches = re.findall(r'(?:RS|RE|₹|INR|RS\.|RE\.|RS\s|RE\s|₹\s)[\.\s-]*(\d+(?:\.\d+)?)', subject.replace('1 RS', 'RS 1').replace('0 .70', '0.70'))"

content = content.replace(old_div_regex, new_div_regex)

old_split_regex = r"match = re.search(r'(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?).*?TO\s*(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?)', subject)"
new_split_regex = r"""
        # First check explicit consolidations
        if "CONSOLIDATION" in subject and "FROM RE" in subject and "TO RS" in subject:
            match = re.search(r"FROM RE[\.\s-]*(\d+(?:\.\d+)?)[\.\s-]*.*?TO RS[\.\s-]*(\d+(?:\.\d+)?)", subject)
            if match:
                num = float(match.group(1))
                den = float(match.group(2))
        else:
            match = re.search(r'(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?).*?TO\s*(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?)', subject)
            if match:
                num = float(match.group(1))
                den = float(match.group(2))
"""

content = content.replace(old_split_regex, new_split_regex)

with open("pipelines/golden_ca_pipeline.py", "w") as f:
    f.write(content)
