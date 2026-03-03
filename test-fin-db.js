const { createSqliteAdapter } = require('./src/lib/data/adapters/sqlite/index');
const Database = require('better-sqlite3');
const db = new Database('../data-pipeline/db/market_data.db');

const adapter = createSqliteAdapter({ query: async (sql, params) => {
    try {
        const stmt = db.prepare(sql);
        const rows = stmt.all(...(params || []));
        return { rows, rowCount: rows.length };
    } catch(e) {
        console.error('DB ERROR:', e);
        throw e;
    }
} }, { get: async()=>null, set: async()=>{} });

async function run() {
    try {
        const stock = await adapter.stocks.getBySymbol('RELIANCE');
        console.log('Stock ID:', stock.id);
        const assetId = String(stock.id);
        
        console.log('Fetching quarterly...');
        await adapter.financials.getQuarterlyResults(stock.id, { periods: 8, consolidated: true });
        console.log('Quarterly OK');

        console.log('Fetching annual (via getQuarterlyResults)...');
        await adapter.financials.getQuarterlyResults(stock.id, { periods: 10, consolidated: true });
        console.log('Annual OK');

        console.log('Fetching balanceSheets...');
        await adapter.company.getBalanceSheets(assetId, 10);
        console.log('balanceSheets OK');

        console.log('Fetching cashFlows...');
        await adapter.company.getCashFlows(assetId, 10);
        console.log('cashFlows OK');

        console.log('Fetching ratios...');
        await adapter.company.getFinancialRatios(assetId, 10);
        console.log('ratios OK');

    } catch (err) {
        console.error('FAILED:', err);
    }
}
run();
