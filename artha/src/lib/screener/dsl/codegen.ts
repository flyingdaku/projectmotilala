/**
 * DSL SQL Code Generator
 *
 * Walks an AST FormulaNode and produces:
 *   - A parameterised SQL WHERE clause fragment
 *   - Collected bind params
 *   - Universe constraints (index membership, type, sector, ticker)
 *   - Output directives (sortby, show)
 *
 * Limitations on snapshot DB:
 *   - Time-shifted @N bars-ago conditions use pre-stored lag columns (lag_1_*, lag_2_*)
 *   - Regime filters @ticker resolve to a sub-query against the ticker's own ti row
 *   - Heikin Ashi / intraday timeframes are not supported → condition dropped with warning
 *   - Backtesting variables (posprice, posbar, stopat) → not supported
 *   - Candlestick pattern flags require pre-computation in ti table (stored as integers 0/1)
 */

import type {
    AstNode, FormulaNode, CmpExpr, BinaryArith, IdentExpr, NumberLit,
    SpecialExpr, AndExpr, OrExpr, NotExpr, ScoringExpr, UniverseCall,
    OutputDirective, AggCall, IffExpr, WatchlistRef, ShiftSpec,
} from './ast';
import {
    resolveIndicator, resolveCall, resolveSpecialIdent,
    INDIA_INDICES, TYPE_MAP,
    type ColInfo,
} from './column-map';

// ─── Output types ─────────────────────────────────────────────────────────────

export interface UniverseConstraint {
    type: 'index' | 'type' | 'sector' | 'ticker' | 'watchlist';
    values: string[];
}

export interface SortHint {
    sql: string;
    dir: 'asc' | 'desc';
    limit?: number;
}

export interface ShowHint {
    sql: string;
    alias?: string;
}

export interface CodegenResult {
    /** AND-joined SQL condition fragments (empty = no filter) */
    conditions: string[];
    /** Bind params matching $1 … $N */
    params: unknown[];
    /** Universe constraints (applied separately by query builder) */
    universe: UniverseConstraint[];
    /** sortby() directive if present */
    sort?: SortHint;
    /** show() columns */
    show: ShowHint[];
    /** Warnings for unsupported features */
    warnings: string[];
    /** Whether technical_indicators join is needed */
    needsTechJoin: boolean;
}

// ─── Codegen context ─────────────────────────────────────────────────────────

class Ctx {
    conditions: string[] = [];
    params: unknown[] = [];
    universe: UniverseConstraint[] = [];
    sort: SortHint | undefined;
    show: ShowHint[] = [];
    warnings: string[] = [];
    needsTechJoin = false;

    nextParam(): number { return this.params.length + 1; }
    push(val: unknown): number { this.params.push(val); return this.params.length; }
    warn(msg: string) { this.warnings.push(msg); }
}

// ─── Public entry point ───────────────────────────────────────────────────────

export function codegenFormula(formula: FormulaNode): CodegenResult {
    const ctx = new Ctx();

    // Process output directives first (extracted by parser)
    for (const dir of formula.directives) {
        processOutputDirective(dir, ctx);
    }

    const sql = genExpr(formula.body, ctx);
    if (sql && sql !== 'TRUE') ctx.conditions.push(sql);

    return {
        conditions: ctx.conditions,
        params: ctx.params,
        universe: ctx.universe,
        sort: ctx.sort,
        show: ctx.show,
        warnings: ctx.warnings,
        needsTechJoin: ctx.needsTechJoin,
    };
}

// ─── Expression dispatcher ────────────────────────────────────────────────────

function genExpr(node: AstNode, ctx: Ctx): string {
    switch (node.kind) {
        case 'formula':   return genExpr(node.body, ctx);
        case 'number':    return String(node.value);
        case 'ident':     return genIdent(node, ctx);
        case 'arith':     return genArith(node, ctx);
        case 'cmp':       return genCmp(node, ctx);
        case 'special':   return genSpecial(node, ctx);
        case 'and':       return genAnd(node, ctx);
        case 'or':        return genOr(node, ctx);
        case 'not':       return genNot(node, ctx);
        case 'scoring':   return genScoring(node, ctx);
        case 'universe':  return genUniverseCall(node, ctx);
        case 'output':    return processOutputDirective(node, ctx);
        case 'agg':       return genAgg(node, ctx);
        case 'iff':       return genIff(node, ctx);
        case 'watchlist': return genWatchlist(node, ctx);
        default:          return 'TRUE';
    }
}

// ─── Identifier / indicator resolution ───────────────────────────────────────

function genIdent(node: IdentExpr, ctx: Ctx): string {
    // Synthetic __shifted__ wraps a paren group with @shift
    if (node.name === '__shifted__' && node.args.length === 1) {
        return genWithShift(node.args[0], node.shift, ctx);
    }

    // Resolve column
    const col = resolveIdentNode(node, ctx);
    if (!col) return 'TRUE'; // unsupported → drop condition

    if (col.table === 'ti') ctx.needsTechJoin = true;

    // Array indexing: price[0] = current, price[1] = lag1, price[2] = lag2
    if (node.arrayIndex !== undefined && node.arrayIndex > 0) {
        const lagged = lagColumn(col.sql, node.arrayIndex);
        if (lagged) {
            if (col.table === 'ti') ctx.needsTechJoin = true;
            return lagged;
        }
        ctx.warn(`Lag ${node.arrayIndex} not available for ${node.name}`);
        return col.sql;
    }

    // @shift handling
    if (node.shift) {
        return genWithShift({ kind: 'ident', name: node.name, args: node.args } as AstNode, node.shift, ctx);
    }

    return col.sql;
}

function resolveIdentNode(node: IdentExpr, ctx: Ctx): ColInfo | null {
    // Parameterised call
    if (node.args.length > 0) {
        const argVals = node.args.map(a => {
            if (a.kind === 'number') return a.value;
            // ident args like 'asc', 'desc' in sortby — irrelevant here
            return 0;
        });
        const col = resolveCall(node.name, argVals);
        if (col) return col;
    }

    // Plain indicator
    const col = resolveIndicator(node.name) ?? resolveSpecialIdent(node.name);
    return col;
}

/** Translate a column reference to its lag-N equivalent */
function lagColumn(sqlCol: string, n: number): string | null {
    if (n === 0) return sqlCol;
    // Convention: lag_1_price, lag_1_sma_50, etc. stored in technical_indicators
    // Extract the column name after the table alias
    const base = sqlCol.replace(/^ti\./, '').replace(/^cr\./, '');
    if (n === 1) return `ti.lag1_${base}`;
    if (n === 2) return `ti.lag2_${base}`;
    return null; // only lag1 and lag2 stored
}

// ─── Shift handling ───────────────────────────────────────────────────────────

function genWithShift(node: AstNode, shift: ShiftSpec | undefined, ctx: Ctx): string {
    if (!shift) return genExpr(node, ctx);

    switch (shift.kind) {
        case 'bars': {
            // @N → use lag column
            const inner = genExprWithLag(node, shift.n, ctx);
            return inner;
        }
        case 'tf': {
            if (shift.tf !== 'daily') {
                ctx.warn(`Timeframe ${shift.tf} not supported on snapshot DB — using daily`);
            }
            return genExpr(node, ctx);
        }
        case 'ticker': {
            // Regime filter: (expr)@aapl — generate a correlated sub-query
            return genRegimeFilter(node, shift.sym, ctx);
        }
        case 'fixed': {
            // @fixed — suppress shift expansion (used in range loops)
            return genExpr(node, ctx);
        }
        case 'range': {
            return genRangeShift(node, shift.from, shift.to, shift.rangeOp, ctx);
        }
    }
}

/** Replace column references in expr with their lagN equivalents */
function genExprWithLag(node: AstNode, n: number, ctx: Ctx): string {
    if (n === 0) return genExpr(node, ctx);
    if (node.kind === 'ident') {
        const col = resolveIdentNode(node as IdentExpr, ctx);
        if (!col) return 'TRUE';
        const lagged = lagColumn(col.sql, n);
        if (lagged) { ctx.needsTechJoin = true; return lagged; }
        ctx.warn(`Lag ${n} not available for ${(node as IdentExpr).name}`);
        return col.sql;
    }
    if (node.kind === 'arith') {
        const left  = genExprWithLag(node.left, n, ctx);
        const right = genExprWithLag(node.right, n, ctx);
        return `(${left} ${node.op} ${right})`;
    }
    if (node.kind === 'number') return String(node.value);
    // For grouped / complex nodes, fall back to current
    return genExpr(node, ctx);
}

/** Regime filter: expr must hold for a specific ticker/index (scalar sub-query) */
function genRegimeFilter(node: AstNode, sym: string, ctx: Ctx): string {
    const indexName = INDIA_INDICES[sym.toLowerCase()];
    if (!indexName) {
        ctx.warn(`Regime ticker '${sym}' not found in Indian indices — condition dropped`);
        return 'TRUE';
    }
    // Generate: EXISTS (SELECT 1 FROM assets ra JOIN technical_indicators rti …
    //           WHERE ra.name = ? AND <node evaluated against rti>)
    // This is complex; for now we emit a scalar sub-query comparing the column value
    const col = node.kind === 'ident' ? resolveIdentNode(node as IdentExpr, ctx) : null;
    if (!col) {
        ctx.warn(`Cannot generate regime filter for complex expression over '${sym}'`);
        return 'TRUE';
    }
    const pIdx = ctx.push(indexName);
    ctx.needsTechJoin = true;
    // Return as a sub-query scalar for use in comparison
    return `(SELECT ${col.sql.replace('ti.', 'rti.')} FROM assets ra JOIN technical_indicators rti ON rti.asset_id = ra.id AND rti.computed_date = (SELECT MAX(computed_date) FROM technical_indicators) WHERE ra.name = $${pIdx} LIMIT 1)`;
}

/** Range shift: @[from..to] (OR) or @{from..to} (AND) */
function genRangeShift(node: AstNode, from: number, to: number, op: 'or' | 'and', ctx: Ctx): string {
    const parts: string[] = [];
    for (let i = from; i <= to; i++) {
        parts.push(genExprWithLag(node, i, ctx));
    }
    if (parts.length === 0) return 'TRUE';
    const joiner = op === 'or' ? ' OR ' : ' AND ';
    return `(${parts.join(joiner)})`;
}

// ─── Arithmetic ───────────────────────────────────────────────────────────────

function genArith(node: BinaryArith, ctx: Ctx): string {
    const left  = genExpr(node.left, ctx);
    const right = genExpr(node.right, ctx);
    return `(${left} ${node.op} ${right})`;
}

// ─── Comparison ───────────────────────────────────────────────────────────────

function genCmp(node: CmpExpr, ctx: Ctx): string {
    const left  = genExpr(node.left, ctx);
    const right = genExpr(node.right, ctx);

    // If one side is a plain number, bind as parameter
    const leftIsNum  = node.left.kind  === 'number';
    const rightIsNum = node.right.kind === 'number';

    let lSql = left;
    let rSql = right;

    if (leftIsNum) {
        const p = ctx.push((node.left as NumberLit).value);
        lSql = `$${p}`;
    }
    if (rightIsNum) {
        const p = ctx.push((node.right as NumberLit).value);
        rSql = `$${p}`;
    }

    switch (node.op) {
        case 'ca':
            // Crossed above: today lhs >= rhs AND yesterday lhs < rhs
            // Using lag1 columns
            return genCrossed(lSql, rSql, node.left, node.right, 'above', ctx);
        case 'cb':
            return genCrossed(lSql, rSql, node.left, node.right, 'below', ctx);
        case '=':
            return `${lSql} = ${rSql}`;
        default:
            return `${lSql} ${node.op} ${rSql}`;
    }
}

/** Crossed above: today lhs >= rhs AND yesterday lhs < rhs */
function genCrossed(
    lSql: string, rSql: string,
    leftNode: AstNode, rightNode: AstNode,
    dir: 'above' | 'below',
    ctx: Ctx,
): string {
    const lag1Left  = leftNode.kind  === 'number' ? lSql  : (lagColumn(lSql, 1) ?? lSql);
    const lag1Right = rightNode.kind === 'number' ? rSql  : (lagColumn(rSql, 1) ?? rSql);

    ctx.needsTechJoin = true;

    if (dir === 'above') {
        // today: lhs >= rhs  AND  yesterday: lhs < rhs
        return `(${lSql} >= ${rSql} AND ${lag1Left} < ${lag1Right})`;
    } else {
        // today: lhs <= rhs  AND  yesterday: lhs > rhs
        return `(${lSql} <= ${rSql} AND ${lag1Left} > ${lag1Right})`;
    }
}

// ─── Special operators ────────────────────────────────────────────────────────

function genSpecial(node: SpecialExpr, ctx: Ctx): string {
    const subjectSql = genExpr(node.subject, ctx);
    ctx.needsTechJoin = true;

    switch (node.op.kind) {
        case 'trend_up': {
            // Pre-computed slope flag: ti.trend_up_N = 1
            // Stored as ti.trend_N_<subject> — use ti.slope flag if available
            const n = node.op.n;
            const lag = lagColumn(subjectSql, n);
            if (lag) return `(${subjectSql} > ${lag})`;
            // Fallback: compare to lag1
            const lag1 = lagColumn(subjectSql, 1);
            if (lag1) return `(${subjectSql} > ${lag1})`;
            ctx.warn(`trend_up ${n}: lag column unavailable, using IS NOT NULL`);
            return `${subjectSql} IS NOT NULL`;
        }
        case 'trend_dn': {
            const n = node.op.n;
            const lag = lagColumn(subjectSql, n) ?? lagColumn(subjectSql, 1);
            if (lag) return `(${subjectSql} < ${lag})`;
            return `${subjectSql} IS NOT NULL`;
        }
        case 'higher_highs': {
            const n = node.op.n;
            // Pre-computed flag: ti.flag_hh_N
            return `(ti.flag_hh_${n} = 1)`;
        }
        case 'higher_closes': {
            const n = node.op.n;
            return `(ti.flag_hc_${n} = 1)`;
        }
        case 'risunvol': {
            // Rising on unusual volume: price up AND rvol > 1.5
            return `(ti.change_1d_pct > 0 AND ti.rvol > 1.5)`;
        }
        case 'div_bull': {
            // Bullish divergence: pre-computed flag
            return `(ti.flag_div_bull = 1)`;
        }
        case 'div_bear': {
            return `(ti.flag_div_bear = 1)`;
        }
        case 'nh': {
            return `(ti.nh_${node.op.n} = 1)`;
        }
        case 'pp': {
            const col = resolveCall('pp', [node.op.n]);
            return col ? `${col.sql} IS NOT NULL` : 'TRUE';
        }
    }
}

// ─── Boolean logic ────────────────────────────────────────────────────────────

function genAnd(node: AndExpr, ctx: Ctx): string {
    const parts = node.children
        .map(c => genExpr(c, ctx))
        .filter(s => s && s !== 'TRUE');
    if (parts.length === 0) return 'TRUE';
    if (parts.length === 1) return parts[0];
    return `(${parts.join(' AND ')})`;
}

function genOr(node: OrExpr, ctx: Ctx): string {
    const parts = node.children
        .map(c => genExpr(c, ctx))
        .filter(s => s && s !== 'TRUE');
    if (parts.length === 0) return 'TRUE';
    if (parts.length === 1) return parts[0];
    return `(${parts.join(' OR ')})`;
}

function genNot(node: NotExpr, ctx: Ctx): string {
    const inner = genExpr(node.child, ctx);
    if (!inner || inner === 'TRUE') return 'FALSE';
    return `NOT (${inner})`;
}

// ─── Scoring  (cond1)+(cond2)+(cond3) >= N ───────────────────────────────────

function genScoring(node: ScoringExpr, ctx: Ctx): string {
    // SQL: CAST(cond1 AS INT) + CAST(cond2 AS INT) + ... >= N
    const parts = node.conditions.map(c => {
        const sql = genExpr(c, ctx);
        return `CASE WHEN (${sql}) THEN 1 ELSE 0 END`;
    });
    const pIdx = ctx.push(node.threshold);
    return `(${parts.join(' + ')} ${node.op} $${pIdx})`;
}

// ─── Universe calls ───────────────────────────────────────────────────────────

function genUniverseCall(node: UniverseCall, ctx: Ctx): string {
    switch (node.fn) {
        case 'index': {
            // Emit as universe constraint (handled by query builder via index_memberships)
            ctx.universe.push({ type: 'index', values: node.args });
            return 'TRUE';
        }
        case 'type': {
            const mapped = node.args
                .map(v => TYPE_MAP[v.toLowerCase()] ?? v.toUpperCase())
                .filter(Boolean);
            if (mapped.length === 0) return 'TRUE';
            ctx.universe.push({ type: 'type', values: mapped });
            const placeholders = mapped.map(() => `$${ctx.push(mapped.shift()!)}`);
            // Re-push remaining (already consumed above) — redo cleanly:
            ctx.params.splice(ctx.params.length - placeholders.length);
            const phs: string[] = [];
            for (const v of mapped.length ? mapped : node.args.map(v => TYPE_MAP[v.toLowerCase()] ?? v.toUpperCase())) {
                phs.push(`$${ctx.push(v)}`);
            }
            return `a.asset_class IN (${phs.join(', ')})`;
        }
        case 'exch': {
            // India only supports NSE/BSE — filter to EQUITY as default
            // exch(nse) or exch(bse) → approximate as asset_class = 'EQUITY'
            const hasEquity = node.args.some(a => ['nse','bse','nasdaq','nyse'].includes(a.toLowerCase()));
            if (hasEquity) {
                const p = ctx.push('EQUITY');
                return `a.asset_class = $${p}`;
            }
            return 'TRUE';
        }
        case 'sector': {
            ctx.universe.push({ type: 'sector', values: node.args });
            const phs = node.args.map(v => `$${ctx.push(v)}`);
            return `a.sector IN (${phs.join(', ')})`;
        }
        case 'ticker': {
            ctx.universe.push({ type: 'ticker', values: node.args });
            const phs = node.args.map(v => `$${ctx.push(v.toUpperCase())}`);
            return `a.nse_symbol IN (${phs.join(', ')})`;
        }
        case 'hist': {
            // hist(mm/dd/yyyy) — historical snapshot screening not supported on live DB
            ctx.warn('hist() historical screening not supported — condition dropped');
            return 'TRUE';
        }
    }
}

// ─── Aggregate functions ─────────────────────────────────────────────────────

function genAgg(node: AggCall, ctx: Ctx): string {
    const inner = genExpr(node.expr, ctx);

    switch (node.fn) {
        case 'max': {
            // max(h, 10) → ti.highest_10 if available
            const p = node.period;
            if (inner === 'ti.high_price' && p) return `ti.high_${p}d`;
            if (inner === 'ti.low_price'  && p) return `ti.low_${p}d`;
            ctx.needsTechJoin = true;
            ctx.warn(`max(${inner}, ${p}) approximated — ensure column ti.high_${p}d exists`);
            return inner; // fallback
        }
        case 'min': {
            const p = node.period;
            if (inner === 'ti.low_price'  && p) return `ti.low_${p}d`;
            if (inner === 'ti.high_price' && p) return `ti.high_${p}d`;
            return inner;
        }
        case 'avg': {
            const p = node.period;
            // avg(rsi(14), 10) → ti.rsi_avg_10 if available; else drop
            ctx.warn(`avg(${inner}, ${p}) not pre-computed — condition may return all rows`);
            return inner;
        }
        case 'abs': {
            return `ABS(${inner})`;
        }
    }
}

// ─── IFF conditional ─────────────────────────────────────────────────────────

function genIff(node: IffExpr, ctx: Ctx): string {
    const cond  = genExpr(node.cond,  ctx);
    const then_ = genExpr(node.then,  ctx);
    const else_ = genExpr(node.else_, ctx);
    return `CASE WHEN (${cond}) THEN ${then_} ELSE ${else_} END`;
}

// ─── Watchlist reference ──────────────────────────────────────────────────────

function genWatchlist(node: WatchlistRef, ctx: Ctx): string {
    // Watchlists would be stored in a separate table; not implemented yet
    ctx.warn(`Watchlist filter '[${node.name}]' not yet supported — condition dropped`);
    return 'TRUE';
}

// ─── Output directives ────────────────────────────────────────────────────────

function processOutputDirective(node: OutputDirective, ctx: Ctx): string {
    switch (node.fn) {
        case 'sortby': {
            if (node.args.length > 0) {
                const colSql = genExpr(node.args[0], ctx);
                ctx.sort = {
                    sql: colSql,
                    dir: node.dir ?? 'asc',
                    limit: node.limit,
                };
            }
            return 'TRUE';
        }
        case 'show': {
            for (let i = 0; i < node.args.length; i++) {
                const colSql = genExpr(node.args[i], ctx);
                ctx.show.push({ sql: colSql, alias: node.alias });
            }
            return 'TRUE';
        }
        case 'draw': {
            // draw() is a chart-only directive — no SQL effect
            return 'TRUE';
        }
    }
}

// ─── type() helper — clean version ───────────────────────────────────────────

function genTypeCall(args: string[], ctx: Ctx): string {
    const mapped: string[] = [];
    for (const v of args) {
        const m = TYPE_MAP[v.toLowerCase()];
        if (m) mapped.push(m);
    }
    if (mapped.length === 0) return 'TRUE';
    const phs = mapped.map(v => `$${ctx.push(v)}`);
    return `a.asset_class IN (${phs.join(', ')})`;
}
