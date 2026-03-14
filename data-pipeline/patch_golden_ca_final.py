import re

with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

# Fix the last few edge cases:
# 1. Dividend with "Rs  Per Share" (no number given)
# 2. "Dividend - Rs 0 .70"
# 3. Splits where ratio is 0.0 like 'Capital Reduction'

new_div_regex = r"matches = re.findall(r'(?:RS|RE|₹|INR|RS\.|RE\.|RS\s|RE\s|₹\s)[\.\s-]*(\d+(?:\.\d+)?)', subject.replace('1 RS', 'RS 1').replace('0 .', '0.').replace('Rs  Per Share', '0').replace('Rs Per 0.50', 'Rs 0.50'))"
content = content.replace(r"matches = re.findall(r'(?:RS|RE|₹|INR|RS\.|RE\.|RS\s|RE\s|₹\s)[\.\s-]*(\d+(?:\.\d+)?)', subject.replace('1 RS', 'RS 1').replace('0 .70', '0.70'))", new_div_regex)

with open("pipelines/golden_ca_pipeline.py", "w") as f:
    f.write(content)
