/**
 * Widget query engine — translates WidgetConfig into SQL and executes it.
 * Queries span pgDb (relational) for assets/computed_ratios and
 * tsDb (timeseries) for daily_prices via a cross-DB compatible approach
 * (both are on the same PG server, just different databases — we use pgDb
 * which has access to cross-schema via foreign data wrappers, or we read
 * from the relational DB's mirrored views).
 *
 * In practice the relational DB contains:
 *   assets, computed_ratios, technical_indicators, msi_company_data
 * The timeseries DB contains daily_prices, fundamentals, msi_shareholding, etc.
 *
 * For v1, widget queries run against pgDb (relational) which has
 * technical_indicators + computed_ratios as precomputed tables.
 */

import { pgDb } from '@/lib/data/db-postgres';
import type { WidgetConfig, WidgetColumn, WidgetQueryResponse, WidgetType } from './types';

// ── Column DB mapping ─────────────────────────────────────────────────────────
// Maps dslName → actual SQL expression (table alias assumed in join)

const DSL_TO_SQL: Record<string, string> = {
  symbol:           'a.nse_symbol',
  name:             'a.name',
  sector:           'a.sector',
  industry_group:   'a.industry_group',
  industry:         'a.industry',
  isin:             'a.isin',

  // Technical indicators (ti.)
  price:            'ti.close',
  close:            'ti.close',
  change_1d_pct:    'ti.change_1d_pct',
  rsi:              'ti.rsi_14',
  rsi_14:           'ti.rsi_14',
  pctFrom52wHigh:   'ti.pct_from_52w_high',
  pctFrom52wLow:    'ti.pct_from_52w_low',
  volume:           'ti.volume',
  sma_20:           'ti.sma_20',
  sma_50:           'ti.sma_50',
  sma_200:          'ti.sma_200',

  // Computed ratios (cr.)
  mcap:             'cr.market_cap_cr',
  pe:               'cr.pe_ttm',
  pe_ttm:           'cr.pe_ttm',
  pb:               'cr.pb',
  ev_ebitda:        'cr.ev_ebitda',
  div_yield:        'cr.dividend_yield',
  dividend_yield:   'cr.dividend_yield',
  roce:             'cr.roce',
  roe:              'cr.roe',
  pat_margin:       'cr.pat_margin',
  op_margin:        'cr.operating_margin',
  rev_g1y:          'cr.revenue_growth_1y',
  rev_g3y:          'cr.revenue_growth_3y',
  pat_g1y:          'cr.pat_growth_1y',
  eps_g1y:          'cr.eps_growth_1y',
  de:               'cr.debt_equity',
  debt_equity:      'cr.debt_equity',
  interest_coverage:'cr.interest_coverage',
  current_ratio:    'cr.current_ratio',
  quality_score:    'cr.quality_score',

  // MSI ratings (mc.)
  rs_rating:        'mc.rs_rating',
  eps_rating:       'mc.eps_rating',
  master_score:     'mc.master_score',
  group_rank:       'mc.group_rank',
};

// ── Filter → SQL WHERE mapping ────────────────────────────────────────────────

interface FilterDef {
  column: string;
  op: 'gte' | 'lte' | 'eq' | 'in';
}

const FILTER_MAP: Record<string, FilterDef> = {
  marketCapCrMin:       { column: 'cr.market_cap_cr', op: 'gte' },
  marketCapCrMax:       { column: 'cr.market_cap_cr', op: 'lte' },
  peTtmMin:             { column: 'cr.pe_ttm', op: 'gte' },
  peTtmMax:             { column: 'cr.pe_ttm', op: 'lte' },
  pbMin:                { column: 'cr.pb', op: 'gte' },
  pbMax:                { column: 'cr.pb', op: 'lte' },
  roeMin:               { column: 'cr.roe', op: 'gte' },
  roeMax:               { column: 'cr.roe', op: 'lte' },
  roceMin:              { column: 'cr.roce', op: 'gte' },
  roceMax:              { column: 'cr.roce', op: 'lte' },
  debtEquityMin:        { column: 'cr.debt_equity', op: 'gte' },
  debtEquityMax:        { column: 'cr.debt_equity', op: 'lte' },
  dividendYieldMin:     { column: 'cr.dividend_yield', op: 'gte' },
  dividendYieldMax:     { column: 'cr.dividend_yield', op: 'lte' },
  patMarginMin:         { column: 'cr.pat_margin', op: 'gte' },
  patMarginMax:         { column: 'cr.pat_margin', op: 'lte' },
  operatingMarginMin:   { column: 'cr.operating_margin', op: 'gte' },
  operatingMarginMax:   { column: 'cr.operating_margin', op: 'lte' },
  revenueGrowth1yMin:   { column: 'cr.revenue_growth_1y', op: 'gte' },
  revenueGrowth1yMax:   { column: 'cr.revenue_growth_1y', op: 'lte' },
  patGrowth1yMin:       { column: 'cr.pat_growth_1y', op: 'gte' },
  patGrowth1yMax:       { column: 'cr.pat_growth_1y', op: 'lte' },
  epsGrowth1yMin:       { column: 'cr.eps_growth_1y', op: 'gte' },
  epsGrowth1yMax:       { column: 'cr.eps_growth_1y', op: 'lte' },
  evEbitdaMin:          { column: 'cr.ev_ebitda', op: 'gte' },
  evEbitdaMax:          { column: 'cr.ev_ebitda', op: 'lte' },
  interestCoverageMin:  { column: 'cr.interest_coverage', op: 'gte' },
  interestCoverageMax:  { column: 'cr.interest_coverage', op: 'lte' },
  currentRatioMin:      { column: 'cr.current_ratio', op: 'gte' },
  currentRatioMax:      { column: 'cr.current_ratio', op: 'lte' },
  qualityScoreMin:      { column: 'cr.quality_score', op: 'gte' },
  qualityScoreMax:      { column: 'cr.quality_score', op: 'lte' },
  rsi14Min:             { column: 'ti.rsi_14', op: 'gte' },
  rsi14Max:             { column: 'ti.rsi_14', op: 'lte' },
  pctFrom52wHighMin:    { column: 'ti.pct_from_52w_high', op: 'gte' },
  pctFrom52wHighMax:    { column: 'ti.pct_from_52w_high', op: 'lte' },
  pctFrom52wLowMin:     { column: 'ti.pct_from_52w_low', op: 'gte' },
  pctFrom52wLowMax:     { column: 'ti.pct_from_52w_low', op: 'lte' },
  sector:               { column: 'a.sector', op: 'eq' },
  industryGroup:        { column: 'a.industry_group', op: 'eq' },
  marketCapBucket:      { column: 'a.sector', op: 'eq' }, // handled specially
};

// ── Column SQL expression builder ─────────────────────────────────────────────

function colToSql(col: WidgetColumn, alias?: string): string {
  const dbExpr = col.dbColumn ?? DSL_TO_SQL[col.dslName] ?? `'${col.dslName}'`;
  const agg = col.aggregation && col.aggregation !== 'none' ? col.aggregation.toUpperCase() : null;
  const expr = agg ? `${agg}(${dbExpr})` : dbExpr;
  const colAlias = alias ?? col.id;
  return `${expr} AS "${colAlias}"`;
}

// ── Build WHERE clauses from filters ─────────────────────────────────────────

function buildWhereClause(filters: Record<string, unknown>, params: unknown[]): string[] {
  const clauses: string[] = [];

  for (const [key, value] of Object.entries(filters)) {
    if (value === null || value === undefined || value === '') continue;

    // marketCapBucket special handling
    if (key === 'marketCapBucket') {
      const bucketMap: Record<string, string> = {
        large:  'cr.market_cap_cr >= 20000',
        mid:    'cr.market_cap_cr >= 5000 AND cr.market_cap_cr < 20000',
        small:  'cr.market_cap_cr >= 500 AND cr.market_cap_cr < 5000',
        micro:  'cr.market_cap_cr < 500',
      };
      const buckets = Array.isArray(value) ? value : [value];
      const parts = (buckets as string[]).map(b => bucketMap[b]).filter(Boolean);
      if (parts.length > 0) {
        clauses.push(`(${parts.join(' OR ')})`);
      }
      continue;
    }

    const def = FILTER_MAP[key];
    if (!def) continue;

    if (def.op === 'gte') {
      params.push(value);
      clauses.push(`${def.column} >= $${params.length}`);
    } else if (def.op === 'lte') {
      params.push(value);
      clauses.push(`${def.column} <= $${params.length}`);
    } else if (def.op === 'eq') {
      if (Array.isArray(value)) {
        if (value.length === 0) continue;
        const placeholders = value.map((v) => { params.push(v); return `$${params.length}`; }).join(', ');
        clauses.push(`${def.column} IN (${placeholders})`);
      } else {
        params.push(value);
        clauses.push(`${def.column} = $${params.length}`);
      }
    }
  }

  return clauses;
}

// ── Main query builder ────────────────────────────────────────────────────────

function needsMsi(columns: WidgetColumn[], filters: Record<string, unknown>): boolean {
  const msiCols = ['rs_rating', 'eps_rating', 'master_score', 'group_rank'];
  return columns.some(c => msiCols.includes(c.dslName)) ||
    Object.keys(filters).some(k => k.startsWith('rs') || k.startsWith('eps_rating') || k.startsWith('master'));
}

export async function executeWidgetQuery(
  config: WidgetConfig,
  widgetType: WidgetType,
): Promise<WidgetQueryResponse> {
  const {
    columns = [],
    filters = {},
    groupColumn,
    sortColumn,
    sortDirection = 'desc',
    limit = 50,
  } = config;

  if (columns.length === 0) {
    return { rows: [], columns: [], total: 0 };
  }

  const params: unknown[] = [];
  const useMsi = needsMsi(columns, filters);

  // ── SELECT ───────────────────────────────────────────────────────────────
  const selectParts: string[] = [];

  if (groupColumn && groupColumn !== 'symbol') {
    // grouped query: only group col + aggregated value cols
    const groupSqlExpr = DSL_TO_SQL[groupColumn] ?? `a.${groupColumn}`;
    selectParts.push(`${groupSqlExpr} AS "${groupColumn}"`);
    for (const col of columns) {
      if (col.dslName === groupColumn || col.id === groupColumn) continue;
      selectParts.push(colToSql(col));
    }
  } else {
    for (const col of columns) {
      selectParts.push(colToSql(col));
    }
  }

  // ── FROM + JOINs ─────────────────────────────────────────────────────────
  const joins = [
    `LEFT JOIN technical_indicators ti ON ti.asset_id = a.id AND ti.computed_date = (SELECT MAX(computed_date) FROM technical_indicators)`,
    `LEFT JOIN computed_ratios cr ON cr.asset_id = a.id`,
  ];
  if (useMsi) {
    joins.push(`LEFT JOIN msi_company_data mc ON mc.asset_id = a.id`);
  }

  // ── WHERE ─────────────────────────────────────────────────────────────────
  const whereClauses = ['a.is_active = 1', "a.asset_class = 'EQUITY'", 'a.nse_symbol IS NOT NULL'];
  whereClauses.push(...buildWhereClause(filters, params));

  // ── GROUP BY ──────────────────────────────────────────────────────────────
  let groupBySql = '';
  if (groupColumn && groupColumn !== 'symbol') {
    const groupSqlExpr = DSL_TO_SQL[groupColumn] ?? `a.${groupColumn}`;
    groupBySql = `GROUP BY ${groupSqlExpr}`;
  }

  // ── ORDER BY ──────────────────────────────────────────────────────────────
  let orderBySql = '';
  if (sortColumn) {
    const sortExpr = DSL_TO_SQL[sortColumn] ?? `"${sortColumn}"`;
    const dir = sortDirection === 'asc' ? 'ASC' : 'DESC';
    orderBySql = `ORDER BY ${sortExpr} ${dir} NULLS LAST`;
  }

  // ── LIMIT ─────────────────────────────────────────────────────────────────
  params.push(Math.min(limit, 500));
  const limitSql = `LIMIT $${params.length}`;

  const sql = [
    `SELECT ${selectParts.join(', ')}`,
    `FROM assets a`,
    joins.join('\n'),
    `WHERE ${whereClauses.join(' AND ')}`,
    groupBySql,
    orderBySql,
    limitSql,
  ].filter(Boolean).join('\n');

  try {
    const rows = await pgDb.queryAll<Record<string, unknown>>(sql, params);
    return { rows, columns, total: rows.length };
  } catch (err) {
    console.error('[widget-query-engine] Query failed:', err, '\nSQL:', sql);
    throw err;
  }
}
