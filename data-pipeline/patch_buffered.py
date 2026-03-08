import re

with open("scripts/cogencis_bulk_scrape.py", "r") as f:
    content = f.read()

buffered_class = """
class BufferedConnection(DatabaseConnection):
    \"\"\"Intercepts DB writes to buffer them in memory, allowing bulk lock-free network crawling.\"\"\"
    def __init__(self, read_conn: DatabaseConnection):
        self.read_conn = read_conn
        self.buffer = []

    def execute(self, sql: str, params: tuple = ()):
        if sql.lstrip().upper().startswith(("SELECT", "PRAGMA")):
            return self.read_conn.execute(sql, params)
        self.buffer.append(("EXEC", sql, params))
        class MockCursor:
            rowcount = 1
            def fetchone(self): return None
            def fetchall(self): return []
        return MockCursor()

    def executemany(self, sql: str, rows: list) -> int:
        self.buffer.append(("MANY", sql, rows))
        return len(rows)

    def fetchone(self, sql: str, params: tuple = ()):
        return self.read_conn.fetchone(sql, params)

    def fetchall(self, sql: str, params: tuple = ()):
        return self.read_conn.fetchall(sql, params)

    def commit(self) -> None:
        pass

    def rollback(self) -> None:
        pass

    def close(self) -> None:
        pass

    def flush(self, write_conn: DatabaseConnection):
        for item in self.buffer:
            if item[0] == "EXEC":
                write_conn.execute(item[1], item[2])
            elif item[0] == "MANY":
                write_conn.executemany(item[1], item[2])

"""

# Insert the class right before _scrape_one
content = content.replace("def _scrape_one(", buffered_class + "def _scrape_one(")

# Replace _scrape_one definition to include db_lock
old_scrape_one_sig = "def _scrape_one(mapping: dict, idx: int, total: int, trade_date: date) -> Tuple[bool, str, str, int, int]:"
new_scrape_one_sig = "def _scrape_one(mapping: dict, idx: int, total: int, trade_date: date, db_lock: threading.Lock) -> Tuple[bool, str, str, int, int]:"
content = content.replace(old_scrape_one_sig, new_scrape_one_sig)

# Replace the internal logic
old_try_block = """    try:
        with get_connection() as conn:
            run = ingester.run(trade_date, conn)
        ok = run.status == "SUCCESS"
        return ok, symbol, asset_id, run.records_inserted or 0, run.duration_ms or 0
    except Exception as exc:"""

new_try_block = """    try:
        with get_connection() as read_conn:
            buf_conn = BufferedConnection(read_conn)
            run = ingester.run(trade_date, buf_conn)
        
        with db_lock:
            with get_connection() as write_conn:
                buf_conn.flush(write_conn)
                
        ok = run.status == "SUCCESS"
        return ok, symbol, asset_id, run.records_inserted or 0, run.duration_ms or 0
    except Exception as exc:"""

content = content.replace(old_try_block, new_try_block)

# Update run_scrape to pass the lock
old_submit = "pool.submit(_scrape_one, mapping, idx, n, trade_date): (idx, mapping)"
new_submit = "pool.submit(_scrape_one, mapping, idx, n, trade_date, lock): (idx, mapping)"
content = content.replace(old_submit, new_submit)

with open("scripts/cogencis_bulk_scrape.py", "w") as f:
    f.write(content)
print("Patched cogencis_bulk_scrape.py")
