import re
cases = [
    " FACE VALUE SPLIT (SUB-DIVISION) - FROM RS 10/- PER SHARE TO RE 1/- PER SHARE",
    " FACE VALUE SPLIT (SUB-DIVISION) - FROM RS 5/- PER SHARE TO RE 0.10/- PER SHARE",
    " CAPITAL REDUCTION PURSUANT TO NCLT ORDER"
]

for subject in cases:
    match = re.search(r'(?:RS|RE|INR|RE\.|RS\.|₹)[\.\s-]*(\d+(?:\.\d+)?).*?TO\s*(?:RS|RE|INR|RE\.|RS\.|₹)[\.\s-]*(\d+(?:\.\d+)?)', subject.replace('1 RS', 'RS 1'))
    if match:
        print(f"Num: {float(match.group(1))} Den: {float(match.group(2))}")
    else:
        print(f"No match for: {subject}")
