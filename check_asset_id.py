import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))
from utils.db import get_db

with get_db() as conn:
    row = conn.execute("SELECT * FROM assets WHERE id='d42124ceb50e4492ac0a111a7f484f80'").fetchone()
    print(dict(row))
