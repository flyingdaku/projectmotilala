import json

with open("sources/nse/corporate_actions.py", "r") as f:
    content = f.read()

if "import json" not in content:
    content = content.replace("import logging", "import logging\nimport json")

with open("sources/nse/corporate_actions.py", "w") as f:
    f.write(content)
