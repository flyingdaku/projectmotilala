# Migration Log

## Phase 1

### Routes migrated

- `GET /api/analytics/correlations`
- `GET /api/analytics/autocorrelations`
- `GET /api/analytics/factor-attribution`
- `POST /api/analytics/factor-attribution`
- `GET /api/stocks/{symbol}/peer-correlations`
- `GET /api/sectors/hierarchy`

### Node.js files to delete after Phase 1 verification

- `artha/src/app/api/analytics/correlations/route.ts`
- `artha/src/app/api/analytics/autocorrelations/route.ts`
- `artha/src/app/api/analytics/factor-attribution/route.ts`
- `artha/src/app/api/stocks/[symbol]/peer-correlations/route.ts`
- `artha/src/app/api/sectors/hierarchy/route.ts`

### Shared helpers now only used by the deleted routes

- None. `artha/src/lib/utils/rrg.ts` is still imported by frontend components for the `RRGDataPoint` type.

### Verification checklist

```bash
curl -s "http://localhost/api/analytics/correlations?assets=RELIANCE,TCS,INFY&period=1y&method=pearson" | jq
curl -s "http://localhost/api/analytics/autocorrelations?assets=RELIANCE,TCS&period=1y&maxLag=10" | jq
curl -s "http://localhost/api/analytics/factor-attribution?holdings=%5B%7B%22symbol%22%3A%22RELIANCE%22%2C%22weight%22%3A60%7D%2C%7B%22symbol%22%3A%22TCS%22%2C%22weight%22%3A40%7D%5D" | jq
curl -s -X POST "http://localhost/api/analytics/factor-attribution" -H "Content-Type: application/json" -d '{"holdings":[{"symbol":"RELIANCE","weight":60},{"symbol":"TCS","weight":40}]}' | jq
curl -s "http://localhost/api/stocks/RELIANCE/peer-correlations?period=1y&method=pearson" | jq
curl -s "http://localhost/api/sectors/hierarchy?level=sector&path=&period=1M" | jq
```

### Nginx Phase 1 activation

- Proxy `GET /api/analytics/correlations` to `artha-api`
- Proxy `GET /api/analytics/autocorrelations` to `artha-api`
- Proxy `GET|POST /api/analytics/factor-attribution` to `artha-api`
- Proxy `GET /api/sectors/hierarchy` to `artha-api`
- Proxy `GET /api/stocks/*/peer-correlations` to `artha-api`

## Phase 2

### Routes migrated

- `GET /api/screener/meta`
- `POST /api/screener/run`
- `GET /api/screener/validate-formula`

### Required backward-compatibility step

- Run `python3 artha/scripts/verify_screener_migration.py` before deleting the Next.js screener routes.
- Keep the Node and Python screener endpoints running in parallel until all predefined cases pass.

### Node.js files to delete after Phase 2 verification

- `artha/src/app/api/screener/meta/route.ts`
- `artha/src/app/api/screener/run/route.ts`

### Verification checklist

```bash
curl -s "http://localhost/api/screener/meta" | jq
curl -s "http://localhost/api/screener/validate-formula?formula=rsi14%20%3C%2030" | jq
curl -s -X POST "http://localhost/api/screener/run" -H "Content-Type: application/json" -d '{"filters":{"marketCapCr":{"min":1000}}}' | jq
curl -s -X POST "http://localhost/api/screener/run" -H "Content-Type: application/json" -d '{"filters":{"formula":["close > sma200 and rsi14 < 50"]}}' | jq
python3 artha/scripts/verify_screener_migration.py
```

### Nginx Phase 2 activation

- Proxy `GET /api/screener/meta` to `artha-api`
- Proxy `POST /api/screener/run` to `artha-api`
- Proxy `GET /api/screener/validate-formula` to `artha-api`

## Phase 3

### Routes migrated

- `GET /api/search`
- `GET /api/stocks/{symbol}/overview`
- `GET /api/stocks/{symbol}/financials`
- `GET /api/stocks/{symbol}/chart`
- `GET /api/stocks/{symbol}/peers`
- `GET /api/stocks/{symbol}/analytics`
- `GET /api/stocks/{symbol}/ownership`
- `GET /api/stocks/{symbol}/documents`

### Adapter work completed

- Ported stock search/detail/peer/price access into `artha/services/artha-api/adapters/stocks.py`
- Ported company profile/corporate actions/financials/ownership/analytics/documents into `artha/services/artha-api/adapters/company.py`
- Added pandas-based annual rollup helper in `artha/services/artha-api/compute/indicators.py`

### Verification checklist

```bash
curl -s "http://localhost/api/search?q=RELIANCE&limit=5" | jq
curl -s "http://localhost/api/stocks/RELIANCE/overview" | jq
curl -s "http://localhost/api/stocks/RELIANCE/financials?consolidated=true" | jq
curl -s "http://localhost/api/stocks/RELIANCE/chart?range=1y" | jq
curl -s "http://localhost/api/stocks/RELIANCE/peers" | jq
curl -s "http://localhost/api/stocks/RELIANCE/analytics" | jq
curl -s "http://localhost/api/stocks/RELIANCE/ownership" | jq
curl -s "http://localhost/api/stocks/RELIANCE/documents" | jq
```

### Nginx Phase 3 activation

- Proxy `GET /api/search` to `artha-api`
- Proxy `GET /api/stocks/*` to `artha-api`

## Phase 4

### Routes migrated

- `GET /api/feed`
- `POST /api/feed`
- `GET /api/stocks/{symbol}/follow`
- `POST /api/stocks/{symbol}/follow`
- `GET /api/dashboard`
- `POST /api/dashboard`
- `GET /api/dashboard/{id}`
- `PUT /api/dashboard/{id}`
- `DELETE /api/dashboard/{id}`
- `POST /api/dashboard/{id}/duplicate`
- `POST /api/dashboard/{id}/widget`
- `PUT /api/dashboard/{id}/widget/{wid}`
- `DELETE /api/dashboard/{id}/widget/{wid}`
- `POST /api/dashboard/widget/query`

### Auth and ownership rules

- All Phase 4 endpoints now use `get_user_id()` from the FastAPI auth layer.
- Dashboard ownership mismatches return `403 Forbidden`.
- First-visit dashboard seeding and dashboard duplication both use a single transaction.

### Adapter work completed

- Ported follow state persistence into `artha/services/artha-api/adapters/follow.py`
- Ported personalized feed building into `artha/services/artha-api/adapters/feed.py`
- Ported dashboard widget query engine + preset widgets into `artha/services/artha-api/adapters/dashboard.py`

### Verification checklist

```bash
curl -s "http://localhost/api/feed?limit=20" -H "Authorization: Bearer $TOKEN" | jq
curl -s -X POST "http://localhost/api/feed" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"event_ids":["corp:test"]}' | jq
curl -s "http://localhost/api/stocks/RELIANCE/follow" -H "Authorization: Bearer $TOKEN" | jq
curl -s -X POST "http://localhost/api/stocks/RELIANCE/follow" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"action":"follow"}' | jq
curl -s "http://localhost/api/dashboard" -H "Authorization: Bearer $TOKEN" | jq
curl -s -X POST "http://localhost/api/dashboard" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"name":"My Custom Dashboard"}' | jq
curl -s -X POST "http://localhost/api/dashboard/widget/query" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"widget_type":"table","config":{"columns":[{"id":"symbol","label":"Symbol","dslName":"symbol"}],"filters":{},"limit":10}}' | jq
```

### Nginx Phase 4 activation

- Proxy `GET|POST /api/feed` to `artha-api`
- Proxy `GET|POST|PUT|DELETE /api/dashboard/*` to `artha-api`

## Phase 5

### Routes migrated

- `GET /api/charts/layouts`
- `POST /api/charts/layouts`
- `GET /api/charts/layouts/{id}`
- `PUT /api/charts/layouts/{id}`
- `DELETE /api/charts/layouts/{id}`
- `GET /api/charts/drawings/{symbol}/{tf}`
- `PUT /api/charts/drawings/{symbol}/{tf}`
- `DELETE /api/charts/drawings/{symbol}/{tf}`
- `GET /api/charts/alerts`
- `POST /api/charts/alerts`
- `DELETE /api/charts/alerts/{id}`
- `PATCH /api/charts/alerts/{id}/deactivate`
- `POST /api/backtest/strategies`
- `GET /api/backtest/strategies`
- `GET /api/backtest/strategies/{id}`
- `PUT /api/backtest/strategies/{id}`
- `DELETE /api/backtest/strategies/{id}`
- `POST /api/backtest/strategies/{id}/clone`
- `POST /api/backtest/run`
- `GET /api/backtest/run/{run_id}`
- `GET /api/backtest/run/{run_id}/trades`
- `POST /api/backtest/run/{run_id}/share`
- `GET /api/backtest/share/{slug}`
- `GET /api/backtest/meta/benchmarks`
- `GET /api/backtest/meta/universes`
- `GET /api/backtest/meta/prioritize-metrics`
- `GET /api/backtest/popular`
- `POST /api/backtest/validate-formula`
- `POST /api/evaluate-criteria`

### Infrastructure completed

- Ported chart persistence APIs into `artha/services/artha-api/routers/charts.py`
- Added relational + Timescale backtest schema in `artha/supabase/migrations/20260322_backtest.sql`
- Added vectorized criteria, indicator, cost, simulation, and metrics compute modules
- Added `pg_notify`-driven backtest worker in `artha/services/artha-api/workers/job_listener.py`
- Added trading-calendar helper and seed script
- Activated final Nginx routing for charts, backtest, and criteria evaluation

### Verification checklist

```bash
curl -s "http://localhost/api/charts/layouts" -H "Authorization: Bearer $TOKEN" | jq
curl -s -X POST "http://localhost/api/charts/layouts" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"name":"Default Layout","content":{"symbol":"RELIANCE"},"is_default":true}' | jq
curl -s "http://localhost/api/charts/drawings/RELIANCE/1D" -H "Authorization: Bearer $TOKEN" | jq
curl -s -X PUT "http://localhost/api/charts/drawings/RELIANCE/1D" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"drawings":[]}' | jq
curl -s "http://localhost/api/charts/alerts" -H "Authorization: Bearer $TOKEN" | jq
curl -s -X POST "http://localhost/api/charts/alerts" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"symbol":"RELIANCE","price":2500,"condition":"above","message":"Breakout alert"}' | jq
curl -s "http://localhost/api/backtest/meta/benchmarks" | jq
curl -s "http://localhost/api/backtest/meta/universes" | jq
curl -s "http://localhost/api/backtest/popular" | jq
curl -s -X POST "http://localhost/api/backtest/validate-formula" -H "Content-Type: application/json" -d '{"formula":"rsi14 < 30 AND close > sma200"}' | jq
curl -s -X POST "http://localhost/api/evaluate-criteria" -H "Content-Type: application/json" -d '{"criteria":{"operator":"AND","rules":[{"field":"rsi14","op":"<","value":30}]},"symbols":["RELIANCE","TCS"],"as_of_date":"2025-12-31","lookback_days":300,"mode":"screener"}' | jq
curl -s -X POST "http://localhost/api/backtest/run" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"strategy":{"name":"Smoke Test","position_type":"long","period_start":"2023-01-01","period_end":"2024-12-31"}}' | jq
```

### Nginx Phase 5 activation

- Proxy `GET|POST|PUT|DELETE|PATCH /api/charts/*` to `artha-api`
- Proxy `GET|POST /api/backtest/*` to `artha-api`
- Proxy `POST /api/evaluate-criteria` to `artha-api`
