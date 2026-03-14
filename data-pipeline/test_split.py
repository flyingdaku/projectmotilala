import re
subject = "CONSOLIDATION OF EQUITY SHARES FROM RE 1 PER SHARE TO RS 10 PER SHARE"
match = re.search(r"FROM RE[\.\s-]*(\d+(?:\.\d+)?)[\.\s-]*.*?TO RS[\.\s-]*(\d+(?:\.\d+)?)", subject)
if match:
    print("Num:", float(match.group(1)))
    print("Den:", float(match.group(2)))
else:
    print("No match")
