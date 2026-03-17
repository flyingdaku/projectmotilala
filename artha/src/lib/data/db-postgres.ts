/**
 * PostgreSQL / TimescaleDB connection pools for the Artha frontend.
 *
 * Replaces better-sqlite3 (synchronous) with pg (async).
 * Two pools:
 *   - pgPool  → artha_relational (port 5432) — assets, corp_actions, computed_ratios, etc.
 *   - tsPool  → artha_timeseries (port 5433) — daily_prices, fundamentals, etc.
 *
 * Usage:
 *   import { pgPool, tsPool } from "@/lib/data/db-postgres";
 *   const rows = await pgPool.query("SELECT * FROM assets LIMIT 5");
 */

import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

// ── Connection config ────────────────────────────────────────────────────────

const PG_RELATIONAL_URL =
    process.env.PG_RELATIONAL_URL ??
    "postgresql://artha:artha_dev_password@localhost:5432/artha_relational";

const PG_TIMESERIES_URL =
    process.env.PG_TIMESERIES_URL ??
    "postgresql://artha:artha_dev_password@localhost:5433/artha_timeseries";

// ── Pool singletons (Next.js hot-reload safe via globalThis) ─────────────────

declare global {
    // eslint-disable-next-line no-var
    var _arthaPgPool: Pool | undefined;
    // eslint-disable-next-line no-var
    var _arthaTsPool: Pool | undefined;
}

function createPool(connectionString: string, label: string): Pool {
    const pool = new Pool({
        connectionString,
        max: 10,
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 5_000,
        ssl: process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
    });

    pool.on("error", (err) => {
        console.error(`[pg:${label}] Unexpected pool error:`, err.message);
    });

    return pool;
}

// Reuse pools across Next.js hot-reloads in development
if (!globalThis._arthaPgPool) {
    globalThis._arthaPgPool = createPool(PG_RELATIONAL_URL, "relational");
}
if (!globalThis._arthaTsPool) {
    globalThis._arthaTsPool = createPool(PG_TIMESERIES_URL, "timeseries");
}

export const pgPool: Pool = globalThis._arthaPgPool!;
export const tsPool: Pool = globalThis._arthaTsPool!;

// ── Typed query helpers ───────────────────────────────────────────────────────

export type Row = Record<string, unknown>;

export interface AsyncDb {
    queryAll<T extends Row>(sql: string, params?: unknown[]): Promise<T[]>;
    queryOne<T extends Row>(sql: string, params?: unknown[]): Promise<T | undefined>;
}

function makeDb(pool: Pool): AsyncDb {
    return {
        async queryAll<T extends Row>(sql: string, params: unknown[] = []): Promise<T[]> {
            const result: QueryResult<T> = await pool.query<T>(sql, params);
            return result.rows;
        },
        async queryOne<T extends Row>(sql: string, params: unknown[] = []): Promise<T | undefined> {
            const result: QueryResult<T> = await pool.query<T>(sql, params);
            return result.rows[0];
        },
    };
}

/** Relational DB (assets, corp_actions, computed_ratios, technical_indicators) */
export const pgDb: AsyncDb = makeDb(pgPool);

/** TimescaleDB (daily_prices, fundamentals, src_msi_*, src_screener_*) */
export const tsDb: AsyncDb = makeDb(tsPool);

/**
 * Run a function inside a transaction on the relational DB.
 * Automatically commits on success, rolls back on error.
 */
export async function withPgTransaction<T>(
    fn: (client: PoolClient) => Promise<T>
): Promise<T> {
    const client = await pgPool.connect();
    try {
        await client.query("BEGIN");
        const result = await fn(client);
        await client.query("COMMIT");
        return result;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}
