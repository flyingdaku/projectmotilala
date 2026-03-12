import os
import re

# Download the chunk and main JS files that might contain the indices list
os.system("curl -s 'https://www.bseindices.com/main-2VWVH7UK.js' > bse_main.js")
os.system("curl -s 'https://www.bseindices.com/scripts-I7D2JVC2.js' > bse_scripts.js")

with open('bse_main.js', 'r') as f:
    content = f.read()

# Look for patterns like {indexCode:"16",indexName:"SENSEX"} or similar
matches = re.findall(r'\{[^{]*"indexCode":"([^"]+)"[^{]*"indexName":"([^"]+)"[^{]*\}', content)
if not matches:
    matches = re.findall(r'\{[^{]*indexCode:"([^"]+)"[^{]*indexName:"([^"]+)"[^{]*\}', content)
if not matches:
    matches = re.findall(r'\{[^{]*"idx_cd":"([^"]+)"[^{]*"idx_name":"([^"]+)"[^{]*\}', content)
if not matches:
    matches = re.findall(r'\{[^{]*id:"([^"]+)"[^{]*name:"([^"]+)"[^{]*\}', content)

print(f"Found {len(matches)} matches in main.js")
for m in matches[:5]:
    print(m)

# Let's just search for 'SENSEX' in the file and see context
idx = content.find('SENSEX')
if idx != -1:
    print("\nContext for SENSEX:")
    print(content[max(0, idx-100):min(len(content), idx+100)])

