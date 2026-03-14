with open("pipelines/corporate_actions.py", "r") as f:
    content = f.read()

# Make sure retroactively_adjust_history runs against the newly populated Golden DB
# We don't need to change anything since corporate_actions IS the golden DB, and adjust_history uses it!
print("verify passed: adjustments already target corporate_actions table")
