import re

with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

old_parse = """    # Dividends
    elif "DIVIDEND" in subject:
        action_type = "DIVIDEND"
        match = re.search(r"RS\\.?\\s*(\\d+(?:\\.\\d+)?)", subject)
        if match:
            div_amt = float(match.group(1))"""

new_parse = """    # Dividends & Typos
    elif any(k in subject for k in ("DIVIDEND", "DIVDEND", "DIVIDNED", "DIV.", "DIV-", "DIV ")):
        action_type = "DIVIDEND"
        match = re.search(r"RS\\.?\\s*(\\d+(?:\\.\\d+)?)", subject)
        if match:
            div_amt = float(match.group(1))"""

content = content.replace(old_parse, new_parse)

old_struct = """    elif "SPLIT" in subject or "SUB-DIVISION" in subject:
        action_type = "SPLIT"
        match = re.search(r"RS\\.?\\s*(\\d+(?:\\.\\d+)?).*TO\\s*RS\\.?\\s*(\\d+(?:\\.\\d+)?)", subject)
        if match:
            num = float(match.group(1))
            den = float(match.group(2))"""

new_struct = """    elif any(k in subject for k in ("SPLIT", "SUB-DIVISION", "CONSOLIDATION", "CAPITAL REDUCTION")):
        action_type = "SPLIT"
        match = re.search(r"RS\\.?\\s*(\\d+(?:\\.\\d+)?).*TO\\s*RS\\.?\\s*(\\d+(?:\\.\\d+)?)", subject)
        if match:
            num = float(match.group(1))
            den = float(match.group(2))"""

content = content.replace(old_struct, new_struct)

with open("pipelines/golden_ca_pipeline.py", "w") as f:
    f.write(content)
