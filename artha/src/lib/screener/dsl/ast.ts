/**
 * DSL Abstract Syntax Tree node types.
 *
 * Grammar summary (precedence low → high):
 *   expr     = scoring | logic_or
 *   scoring  = logic_or ('+' logic_or)* '>=' NUMBER
 *   logic_or = logic_and ('or' logic_and)*
 *   logic_and= logic_not ('and' logic_not)*
 *   logic_not= '!' primary_cond | primary_cond
 *   primary_cond = '(' expr ')' suffix*
 *              | atom_expr infix_op atom_expr suffix*
 *              | atom_expr special_op
 *              | func_call               (universe/output functions)
 *   atom_expr= NUMBER | atom_ref arithmetic*
 *   atom_ref = ident_call ('@' shift)? array_index?
 *            | 'iff' '(' expr ',' atom_expr ',' atom_expr ')'
 *            | agg_func
 *   suffix   = '@' (NUMBER | IDENT | range_spec)
 *   range_spec = '[' NUMBER '..' NUMBER ']'   → OR range
 *              | '{' NUMBER '..' NUMBER '}'   → AND range
 */

// ─── Leaf / value nodes ──────────────────────────────────────────────────────

export interface NumberLit  { kind: 'number';  value: number }
export interface IdentExpr  {
    kind: 'ident';
    name: string;                    // e.g. "rsi", "sma", "price", "cap"
    args: AstNode[];                 // params: sma(50) → args=[50]
    /** Array index: close[1] */
    arrayIndex?: number;
    /** @N shift or @ticker regime reference */
    shift?: ShiftSpec;
}

// shift can be: @2 (bars ago), @daily/@weekly/@monthly (timeframe), @aapl/@sp500 (regime)
export type ShiftSpec =
    | { kind: 'bars';   n: number }
    | { kind: 'tf';     tf: 'daily' | 'weekly' | 'monthly' | 'hourly' | 'h4' }
    | { kind: 'ticker'; sym: string }
    | { kind: 'fixed' }
    | { kind: 'range';  from: number; to: number; rangeOp: 'or' | 'and' };

// ─── Arithmetic ──────────────────────────────────────────────────────────────

export interface BinaryArith {
    kind: 'arith';
    op: '+' | '-' | '*' | '/';
    left: AstNode;
    right: AstNode;
}

// ─── Comparison / infix condition ────────────────────────────────────────────

export type CmpOp = '>' | '>=' | '<' | '<=' | '=' | 'ca' | 'cb';

export interface CmpExpr {
    kind: 'cmp';
    op: CmpOp;
    left: AstNode;
    right: AstNode;
}

// ─── Special (unary) conditions on an expr ───────────────────────────────────

export type SpecialOp =
    | { kind: 'trend_up';       n: number }
    | { kind: 'trend_dn';       n: number }
    | { kind: 'higher_highs';   n: number }
    | { kind: 'higher_closes';  n: number }
    | { kind: 'risunvol' }
    | { kind: 'div_bull' }
    | { kind: 'div_bear' }
    | { kind: 'nh';             n: number }   // nh_21, nh_all
    | { kind: 'pp';             n: number };  // pp_5 price perf %

export interface SpecialExpr {
    kind: 'special';
    subject: AstNode;
    op: SpecialOp;
}

// ─── Boolean logic ───────────────────────────────────────────────────────────

export interface AndExpr  { kind: 'and'; children: AstNode[] }
export interface OrExpr   { kind: 'or';  children: AstNode[] }
export interface NotExpr  { kind: 'not'; child: AstNode }

// ─── Scoring  (cond1)+(cond2)+... >= N ───────────────────────────────────────

export interface ScoringExpr {
    kind: 'scoring';
    conditions: AstNode[];
    threshold: number;
    op: '>=' | '>' | '=' | '<=' | '<';
}

// ─── Universe / output function calls ────────────────────────────────────────

export type UniverseFnName = 'index' | 'type' | 'exch' | 'sector' | 'ticker' | 'hist';
export type OutputFnName   = 'sortby' | 'show' | 'draw';

export interface UniverseCall {
    kind: 'universe';
    fn: UniverseFnName;
    args: string[];        // list of string arguments
}

export interface OutputDirective {
    kind: 'output';
    fn: OutputFnName;
    args: AstNode[];       // sortby(col, dir, limit) / show(col,...) / draw(col,...)
    alias?: string;        // "as name" used in show()
    dir?: 'asc' | 'desc';
    limit?: number;
}

// ─── Aggregate functions ─────────────────────────────────────────────────────

export interface AggCall {
    kind: 'agg';
    fn: 'max' | 'min' | 'avg' | 'abs';
    expr: AstNode;
    period?: number;   // max(h,10) → period=10
}

// ─── IFF conditional ─────────────────────────────────────────────────────────

export interface IffExpr {
    kind: 'iff';
    cond: AstNode;
    then: AstNode;
    else_: AstNode;
}

// ─── Watchlist reference  [name] ─────────────────────────────────────────────

export interface WatchlistRef {
    kind: 'watchlist';
    name: string;
}

// ─── Top-level formula = conjunction of all clauses ──────────────────────────

export interface FormulaNode {
    kind: 'formula';
    body: AstNode;
    /** Output directives extracted from the formula */
    directives: OutputDirective[];
}

// ─── Union ───────────────────────────────────────────────────────────────────

export type AstNode =
    | NumberLit
    | IdentExpr
    | BinaryArith
    | CmpExpr
    | SpecialExpr
    | AndExpr
    | OrExpr
    | NotExpr
    | ScoringExpr
    | UniverseCall
    | OutputDirective
    | AggCall
    | IffExpr
    | WatchlistRef
    | FormulaNode;
