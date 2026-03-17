const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../data-pipeline/db/market_data.db');
console.log('Connecting to DB at:', dbPath);

try {
  const db = new Database(dbPath);
  
  console.log('Creating computed_ratios table...');
  db.exec(`
    CREATE TABLE IF NOT EXISTS computed_ratios (
      asset_id TEXT PRIMARY KEY,
      market_cap_cr REAL,
      pe_ttm REAL,
      pb REAL,
      ev_ebitda REAL,
      dividend_yield REAL,
      roce REAL,
      roe REAL,
      pat_margin REAL,
      operating_margin REAL,
      revenue_growth_1y REAL,
      pat_growth_1y REAL,
      eps_growth_1y REAL,
      debt_equity REAL,
      quality_score REAL,
      revenue_growth_3y REAL,
      interest_coverage REAL,
      current_ratio REAL
    );
  `);

  console.log('Creating technical_indicators table...');
  db.exec(`
    CREATE TABLE IF NOT EXISTS technical_indicators (
      asset_id TEXT,
      computed_date DATE,
      close REAL,
      change_1d_pct REAL,
      rsi_14 REAL,
      pct_from_52w_high REAL,
      pct_from_52w_low REAL,
      sma_50 REAL,
      sma_200 REAL,
      volume REAL,
      lag1_close REAL,
      PRIMARY KEY (asset_id, computed_date)
    );
  `);

  console.log('Populating mock data for computed_ratios...');
  db.exec(`
    INSERT OR IGNORE INTO computed_ratios (asset_id, market_cap_cr, pe_ttm, pb, roce, roe)
    SELECT id, 50000.0 + (abs(random() % 10000)), 20.0 + (abs(random() % 10)), 3.0, 15.0, 15.0 
    FROM assets WHERE asset_class = 'EQUITY';
  `);

  console.log('Populating mock data for technical_indicators...');
  db.exec(`
    INSERT OR IGNORE INTO technical_indicators (asset_id, computed_date, close, change_1d_pct, rsi_14, sma_50, sma_200)
    SELECT id, date('now'), 1000.0, 1.5, 55.0, 950.0, 900.0 
    FROM assets WHERE asset_class = 'EQUITY';
  `);

  console.log('Successfully created and populated tables.');
  db.close();
} catch (error) {
  console.error('Error:', error);
}
