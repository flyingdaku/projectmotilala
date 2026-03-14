import re
with open("pipelines/golden_ca_pipeline.py", "r") as f:
    content = f.read()

# Fix Re. 1/- splits mapping to 0:1
# Example: Face Value Split (Sub-Division) - From Rs 10/- Per Share To Re 1/- Per Share
# In the regex we had (?:RS|RE|INR) but the problem is the text says Re 1. Let's fix the regex to capture it.

# Let's write a generic number extractor instead of relying entirely on Rs/Re prefixes if they fail.
# Actually the regex is fine but we didn't account for "Re 1" having a space.
old_split = r"""        else:
            match = re.search(r'(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?).*?TO\s*(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?)', subject)
            if match:
                num = float(match.group(1))
                den = float(match.group(2))"""

new_split = r"""        else:
            match = re.search(r'(?:RS|RE|INR|RE\.|RS\.|₹)[\.\s-]*(\d+(?:\.\d+)?).*?TO\s*(?:RS|RE|INR|RE\.|RS\.|₹)[\.\s-]*(\d+(?:\.\d+)?)', subject.replace('1 RS', 'RS 1'))
            if match:
                num = float(match.group(1))
                den = float(match.group(2))"""

content = content.replace(old_split, new_split)

with open("pipelines/golden_ca_pipeline.py", "w") as f:
    f.write(content)
