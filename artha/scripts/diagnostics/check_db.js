const { Client } = require('pg');

async function check() {
    const rClient = new Client("postgresql://artha:artha_dev_password@localhost:5432/artha_relational");
    const tClient = new Client("postgresql://artha:artha_dev_password@localhost:5433/artha_timeseries");
    
    try {
        await rClient.connect();
        const rRes = await rClient.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%eodhd%'");
        console.log("Relational tables:", rRes.rows);
        
        for (const row of rRes.rows) {
            const count = await rClient.query(`SELECT COUNT(*) FROM ${row.table_name}`);
            console.log(`${row.table_name} rows:`, count.rows[0].count);
        }
    } catch(e) {
        console.log("Relational error:", e.message);
    } finally {
        await rClient.end();
    }
    
    try {
        await tClient.connect();
        const tRes = await tClient.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%eodhd%'");
        console.log("Timeseries tables:", tRes.rows);
        
        for (const row of tRes.rows) {
            const count = await tClient.query(`SELECT COUNT(*) FROM ${row.table_name}`);
            console.log(`${row.table_name} rows:`, count.rows[0].count);
        }
    } catch(e) {
        console.log("Timeseries error:", e.message);
    } finally {
        await tClient.end();
    }
}
check();
