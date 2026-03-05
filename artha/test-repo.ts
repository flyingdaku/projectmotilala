import { createSqliteAdapter } from "./src/lib/data/sqlite-adapter";
const adapter = createSqliteAdapter();
adapter.stocks.getBySymbol("RELIANCE").then(async s => {
  if (s) {
    console.log("Found:", s.symbol, "ID:", s.id);
    const fin = await adapter.company.getFinancials(String(s.id));
    console.log("Quarterly count:", fin.quarterly.length);
    console.log("Cashflow count:", fin.cashFlow.length);
    console.log("Anomalies:", fin.anomalies.length);
  }
}).catch(console.error);
