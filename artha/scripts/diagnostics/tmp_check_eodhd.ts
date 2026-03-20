import { db } from './src/lib/data/db-postgres';
import { sql } from 'drizzle-orm';

async function check() {
    try {
        console.log("--- Checking EODHD Tables ---");
        const tablesRes = await db.execute(sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
              AND table_name LIKE '%eodhd%';
        `);
        console.log("EODHD Tables:", tablesRes.rows.map((r: any) => r.table_name));
        
        for (const row of tablesRes.rows) {
            const t = row.table_name;
            const countRes = await db.execute(sql.raw(`SELECT count(*) as c FROM ${t}`));
            console.log(`Table ${t} row count:`, countRes.rows[0].c);
            
            // Try to find a date column to see how updated it is
            const colsRes = await db.execute(sql`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = ${t}
            `);
            const dateCols = colsRes.rows.filter((c: any) => c.data_type.includes('date') || c.data_type.includes('timestamp'));
            
            if (dateCols.length > 0) {
                for (const dCol of dateCols) {
                    const latestRes = await db.execute(sql.raw(`SELECT max(${dCol.column_name}) as m FROM ${t}`));
                    console.log(`  Latest ${dCol.column_name}:`, latestRes.rows[0].m);
                }
            } else {
                console.log(`  No date/timestamp columns found.`);
            }
        }
    } catch (err) {
        console.error("Error:", err);
    }
    process.exit(0);
}
check();
