import { createSqliteAdapter } from "./src/lib/data/sqlite-adapter";
const adapter = createSqliteAdapter();
adapter.stocks.getBySymbol("RELIANCE").then(async s => {
  if (s) {
    console.log("Found:", s.symbol, "ID:", s.id);
    const detail = await adapter.stocks.getDetail(s.symbol);
    console.log("Detail keys:", Object.keys(detail || {}));
    console.log("Detail Name:", detail?.name);
    console.log("Detail Market Cap:", detail?.marketCapCr);
    console.log("Detail PE:", detail?.pe);
    console.log("Detail PB:", detail?.pb);
    console.log("Detail ROE:", detail?.roe);

    const assetId = String(s.id);
    const profile = await adapter.company.getProfile(assetId);
    console.log("Profile keys:", Object.keys(profile || {}));
    console.log("Profile Description:", profile?.description);
    console.log("Profile Founded:", profile?.founded);
    console.log("Profile businessSegments count:", profile?.businessSegments?.length);
  }
}).catch(console.error);
