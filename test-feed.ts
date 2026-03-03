import { createSqliteAdapter } from './src/lib/data/adapters/sqlite';
import Database from 'better-sqlite3';
const db = new Database('../data-pipeline/db/market_data.db');
const adapter = createSqliteAdapter({ query: (sql, params) => {
    try {
        const stmt = db.prepare(sql);
        const rows = stmt.all(...(params || []));
        return { rows, rowCount: rows.length };
    } catch(e) {
        console.error('DB ERROR:', e);
        throw e;
    }
} } as any, { get: async()=>null, set: async()=>{} });

adapter.feed.getUserFeed('user_demo', 10, 0).then(console.log).catch(console.error);
