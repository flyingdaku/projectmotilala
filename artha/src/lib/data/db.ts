/**
 * Database abstraction layer.
 *
 * Currently backed by better-sqlite3 (synchronous SQLite).
 * To swap to Postgres/Clickhouse:
 *   1. Replace BetterSqlite3Db with a pg/clickhouse client
 *   2. Change `queryAll` / `queryOne` to use async queries
 *   3. Update `getDb()` to connect to the new DB
 *
 * Keep all SQL here — no SQL in the adapter.
 */

import path from "path";

// ── Types ────────────────────────────────────────────────────────────────────

export type Row = Record<string, unknown>;

interface Db {
    queryAll<T extends Row>(sql: string, params?: unknown[]): T[];
    queryOne<T extends Row>(sql: string, params?: unknown[]): T | undefined;
}

// ── better-sqlite3 implementation ────────────────────────────────────────────

function createSqliteDb(dbPath: string): Db {
    // Dynamic require so Next.js server-side bundling does not break
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Database = require("better-sqlite3");
    const db = new Database(dbPath, { readonly: true });
    db.pragma("journal_mode = WAL");

    return {
        queryAll<T extends Row>(sql: string, params: unknown[] = []): T[] {
            return db.prepare(sql).all(...params) as T[];
        },
        queryOne<T extends Row>(sql: string, params: unknown[] = []): T | undefined {
            return db.prepare(sql).get(...params) as T | undefined;
        },
    };
}

// ── Singleton ────────────────────────────────────────────────────────────────

let _db: Db | null = null;

export function getDb(): Db {
    if (!_db) {
        const dbPath =
            process.env.DB_PATH ??
            path.resolve(
                process.cwd(),
                "../data-pipeline/db/market_data.db"
            );
        _db = createSqliteDb(dbPath);
    }
    return _db;
}
