const Database = require('better-sqlite3');
const db = new Database('../data-pipeline/db/market_data.db');

try {
  const stock = db.prepare("SELECT * FROM assets WHERE nse_symbol = 'RELIANCE' AND asset_class = 'EQUITY' LIMIT 1").get();
  console.log("Stock:", stock.id);

  const qData = db.prepare("SELECT * FROM quarterly_results WHERE asset_id = ? AND is_consolidated = 1 ORDER BY period_end DESC LIMIT 8").all(stock.id);
  console.log("Q Data:", qData.length);

  const bsData = db.prepare("SELECT * FROM screener_balance_sheet WHERE asset_id = ? AND is_consolidated = 1 ORDER BY period_end_date DESC LIMIT 10").all(stock.id);
  console.log("BS Data:", bsData.length);

  const cfData = db.prepare("SELECT * FROM screener_cash_flow WHERE asset_id = ? AND is_consolidated = 1 ORDER BY period_end_date DESC LIMIT 10").all(stock.id);
  console.log("CF Data:", cfData.length);

  const rData = db.prepare("SELECT * FROM screener_ratios WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 10").all(stock.id);
  console.log("Ratio Data:", rData.length);
  
} catch (e) {
  console.error("Error:", e);
}
