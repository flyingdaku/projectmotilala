import re

cases = [
    " INTERIM DIVIDEND - RE 0.75 PER SHARE",
    " FACE VALUE SPLIT (SUB-DIVISION) - FROM RS 10/- PER SHARE TO RE 1/- PER SHARE",
    "SPECIAL DIVIDEND RS -10 PER SHARE/INTERIM DIVIDEND RS - 26 PER SHARE",
    " FACE VALUE SPLIT (SUB-DIVISION) - FROM RS 5/- PER SHARE TO RE 0.10/- PER SHARE"
]

for s in cases:
    print(s)
    m = re.search(r"(?:RS|RE|₹|INR)[\.\s-]*(\d+(?:\.\d+)?)", s)
    if m:
        print("  DIV:", m.group(1))
    
    m2 = re.search(r"(?:RS|RE)[\.\s-]*(\d+(?:\.\d+)?).*?TO\s*(?:RS|RE)[\.\s-]*(\d+(?:\.\d+)?)", s)
    if m2:
        print("  SPLIT:", m2.groups())
