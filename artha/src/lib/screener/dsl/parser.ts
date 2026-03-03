/**
 * DSL Recursive-Descent Parser
 * Converts a token stream into an AST FormulaNode.
 */

import { tokenize, TT, type Token } from './tokenizer';
import type {
    AstNode, FormulaNode, OutputDirective, UniverseCall, AggCall, IffExpr,
    IdentExpr, NumberLit, BinaryArith, CmpExpr, CmpOp, SpecialExpr,
    SpecialOp, AndExpr, OrExpr, NotExpr, ScoringExpr, WatchlistRef, ShiftSpec,
} from './ast';

export class ParseError extends Error {
    constructor(msg: string, public pos: number) { super(`DSL parse error at pos ${pos}: ${msg}`); }
}

// ─── Universe / output function names ────────────────────────────────────────
const UNIVERSE_FNS = new Set(['index', 'type', 'exch', 'sector', 'ticker', 'hist']);
const OUTPUT_FNS   = new Set(['sortby', 'show', 'draw']);
const AGG_FNS      = new Set(['max', 'min', 'avg', 'abs']);

// ─── Indian index tokens → asset identifiers ─────────────────────────────────
export const INDIA_INDEX_MAP: Record<string, string> = {
    nifty50:  'NIFTY50',
    next50:   'NIFTYNXT50',
    nifty100: 'NIFTY100',
    nifty200: 'NIFTY200',
    nifty500: 'NIFTY500',
    sensex:   'SENSEX',
    niftybank:'BANKNIFTY',
    midcap150:'NIFTYMIDCAP150',
    smallcap250:'NIFTYSMALLCAP250',
    vix:      'INDIAVIX',
};

class Parser {
    private tokens: Token[];
    private pos = 0;
    private directives: OutputDirective[] = [];

    constructor(src: string) {
        this.tokens = tokenize(src);
    }

    // ── Cursor helpers ────────────────────────────────────────────────────

    private peek(offset = 0): Token { return this.tokens[this.pos + offset] ?? this.tokens[this.tokens.length - 1]; }
    private cur(): Token { return this.peek(0); }
    private advance(): Token { return this.tokens[this.pos++]; }
    private check(type: TT, value?: string): boolean {
        const t = this.cur();
        return t.type === type && (value === undefined || t.value === value);
    }
    private eat(type: TT, value?: string): Token {
        if (!this.check(type, value)) {
            const t = this.cur();
            throw new ParseError(`Expected ${value ?? type} but got '${t.value}' (${t.type})`, t.pos);
        }
        return this.advance();
    }
    private tryEat(type: TT, value?: string): boolean {
        if (this.check(type, value)) { this.advance(); return true; }
        return false;
    }

    // ── Top-level entry ───────────────────────────────────────────────────

    parse(): FormulaNode {
        const body = this.parseExpr();
        if (!this.check(TT.EOF)) {
            throw new ParseError(`Unexpected token '${this.cur().value}'`, this.cur().pos);
        }
        return { kind: 'formula', body, directives: this.directives };
    }

    // ── Expression hierarchy ──────────────────────────────────────────────
    // Level 0: scoring   (a)+(b)+(c) >= N
    // Level 1: or
    // Level 2: and
    // Level 3: not / !
    // Level 4: comparison / special
    // Level 5: arithmetic + -
    // Level 6: arithmetic * /
    // Level 7: unary minus / atom

    private parseExpr(): AstNode {
        return this.parseScoring();
    }

    // scoring: multiple parenthesised conditions summed, then compared to a threshold
    // (cond1) + (cond2) + (cond3) >= N
    private parseScoring(): AstNode {
        const first = this.parseOr();

        // Detect scoring pattern: current token is '+' AND what follows is a '(' expression
        if (this.check(TT.PLUS) && this.peek(1).type === TT.LPAREN) {
            const conditions: AstNode[] = [first];
            while (this.tryEat(TT.PLUS)) {
                conditions.push(this.parseOr());
            }
            // expect comparison operator + threshold
            const opTok = this.cur();
            let op: ScoringExpr['op'] = '>=';
            if ([TT.GTE, TT.GT, TT.LTE, TT.LT, TT.EQ].includes(opTok.type as TT)) {
                this.advance();
                op = opTok.value as ScoringExpr['op'];
            } else {
                throw new ParseError('Expected comparison after scoring sum', opTok.pos);
            }
            const threshold = Number(this.eat(TT.NUMBER).value);
            return { kind: 'scoring', conditions, threshold, op };
        }

        return first;
    }

    private parseOr(): AstNode {
        let left = this.parseAnd();
        while (this.check(TT.IDENT, 'or')) {
            this.advance();
            const right = this.parseAnd();
            if (left.kind === 'or') { left.children.push(right); }
            else { left = { kind: 'or', children: [left, right] }; }
        }
        return left;
    }

    private parseAnd(): AstNode {
        let left = this.parseNot();
        while (this.check(TT.IDENT, 'and')) {
            this.advance();
            const right = this.parseNot();
            if (left.kind === 'and') { left.children.push(right); }
            else { left = { kind: 'and', children: [left, right] }; }
        }
        return left;
    }

    private parseNot(): AstNode {
        if (this.check(TT.BANG) || this.check(TT.IDENT, 'not')) {
            this.advance();
            return { kind: 'not', child: this.parseNot() };
        }
        return this.parseCmp();
    }

    // comparison / special operators
    private parseCmp(): AstNode {
        // Universe/output functions produce their own node
        if (this.cur().type === TT.IDENT) {
            const name = this.cur().value;

            if (UNIVERSE_FNS.has(name)) return this.parseUniverseCall();
            if (OUTPUT_FNS.has(name))   return this.parseOutputDirective();

            // watchlist: [name]
        }
        if (this.cur().type === TT.LBRACKET && this.peek(1).type === TT.IDENT) {
            return this.parseWatchlistOrIndex();
        }

        const left = this.parseArith();

        // special postfix operators
        const special = this.tryParseSpecial(left);
        if (special) return special;

        // comparison operators
        const op = this.cur();
        if ([TT.GT, TT.GTE, TT.LT, TT.LTE, TT.EQ].includes(op.type as TT)) {
            this.advance();
            const right = this.parseArith();
            return { kind: 'cmp', op: op.value as CmpOp, left, right };
        }
        if (op.type === TT.IDENT && (op.value === 'ca' || op.value === 'cb')) {
            this.advance();
            const right = this.parseArith();
            return { kind: 'cmp', op: op.value as CmpOp, left, right };
        }

        return left;
    }

    /** Try to consume a special postfix operator after `subject`. Returns null if none found. */
    private tryParseSpecial(subject: AstNode): SpecialExpr | null {
        const t = this.cur();
        if (t.type !== TT.IDENT) return null;

        let op: SpecialOp | null = null;
        switch (t.value) {
            case 'trend_up': {
                this.advance();
                const n = this.check(TT.NUMBER) ? Number(this.advance().value) : 1;
                op = { kind: 'trend_up', n };
                break;
            }
            case 'trend_dn': {
                this.advance();
                const n = this.check(TT.NUMBER) ? Number(this.advance().value) : 1;
                op = { kind: 'trend_dn', n };
                break;
            }
            case 'higher_highs': {
                this.advance();
                const n = this.check(TT.NUMBER) ? Number(this.advance().value) : 3;
                op = { kind: 'higher_highs', n };
                break;
            }
            case 'higher_closes': {
                this.advance();
                const n = this.check(TT.NUMBER) ? Number(this.advance().value) : 3;
                op = { kind: 'higher_closes', n };
                break;
            }
            case 'risunvol': {
                this.advance();
                op = { kind: 'risunvol' };
                break;
            }
            case 'div_bull': {
                this.advance();
                op = { kind: 'div_bull' };
                break;
            }
            case 'div_bear': {
                this.advance();
                op = { kind: 'div_bear' };
                break;
            }
            default:
                return null;
        }
        return { kind: 'special', subject, op };
    }

    // arithmetic: + -
    private parseArith(): AstNode {
        let left = this.parseTerm();
        while (this.check(TT.PLUS) || this.check(TT.MINUS)) {
            // Don't consume '+' if it's part of scoring pattern (handled above)
            if (this.check(TT.PLUS) && this.peek(1).type === TT.LPAREN) break;
            const op = this.advance().value as '+' | '-';
            const right = this.parseTerm();
            left = { kind: 'arith', op, left, right } as BinaryArith;
        }
        return left;
    }

    // term: * /
    private parseTerm(): AstNode {
        let left = this.parseUnary();
        while (this.check(TT.STAR) || this.check(TT.SLASH)) {
            const op = this.advance().value as '*' | '/';
            const right = this.parseUnary();
            left = { kind: 'arith', op, left, right } as BinaryArith;
        }
        return left;
    }

    private parseUnary(): AstNode {
        if (this.check(TT.MINUS)) {
            this.advance();
            const n = this.parseAtom();
            return { kind: 'arith', op: '*', left: { kind: 'number', value: -1 }, right: n };
        }
        return this.parseAtom();
    }

    // atom: number | '(' expr ')' | ident/func | agg | iff
    private parseAtom(): AstNode {
        const t = this.cur();

        // parenthesised expression with optional suffix modifiers
        if (t.type === TT.LPAREN) {
            this.advance();
            const inner = this.parseExpr();
            this.eat(TT.RPAREN);
            return this.parseAtomSuffix(inner);
        }

        // number
        if (t.type === TT.NUMBER) {
            this.advance();
            return { kind: 'number', value: Number(t.value) };
        }

        // iff(cond, then, else)
        if (t.type === TT.IDENT && t.value === 'iff') {
            return this.parseIff();
        }

        // aggregate functions: max, min, avg, abs
        if (t.type === TT.IDENT && AGG_FNS.has(t.value)) {
            return this.parseAgg();
        }

        // identifier / indicator call
        if (t.type === TT.IDENT) {
            return this.parseIdentExpr();
        }

        // nh_N or pp_N style bare tokens parsed as ident
        throw new ParseError(`Unexpected token '${t.value}'`, t.pos);
    }

    /** Attach @suffix or [arrayIndex] to a parenthesised expression */
    private parseAtomSuffix(node: AstNode): AstNode {
        // (expr)@N or (expr)@[0..4] or (expr)@{0..4} or (expr)@daily @ticker
        while (this.check(TT.AT)) {
            this.advance();
            const shift = this.parseShiftSpec();
            // Wrap in a shifted node — we represent this as an IdentExpr wrapper
            // For parens-with-shift we create a synthetic 'shifted_group' — handled in codegen
            return {
                kind: 'ident',
                name: '__shifted__',
                args: [node],
                shift,
            } as IdentExpr;
        }
        return node;
    }

    /** Parse @<spec> — called after consuming '@' */
    private parseShiftSpec(): ShiftSpec {
        const t = this.cur();

        // @[0..4]  → OR range
        if (t.type === TT.LBRACKET) {
            this.advance();
            const from = Number(this.eat(TT.NUMBER).value);
            this.eat(TT.DOT_DOT);
            const to = Number(this.eat(TT.NUMBER).value);
            this.eat(TT.RBRACKET);
            return { kind: 'range', from, to, rangeOp: 'or' };
        }

        // @{0..4}  → AND range
        if (t.type === TT.LBRACE) {
            this.advance();
            const from = Number(this.eat(TT.NUMBER).value);
            this.eat(TT.DOT_DOT);
            const to = Number(this.eat(TT.NUMBER).value);
            this.eat(TT.RBRACE);
            return { kind: 'range', from, to, rangeOp: 'and' };
        }

        // @fixed
        if (t.type === TT.IDENT && t.value === 'fixed') {
            this.advance();
            return { kind: 'fixed' };
        }

        // @daily @weekly @monthly @hourly @h4
        if (t.type === TT.IDENT && ['daily','weekly','monthly','hourly','h4'].includes(t.value)) {
            const tf = t.value as 'daily' | 'weekly' | 'monthly' | 'hourly' | 'h4';
            this.advance();
            return { kind: 'tf', tf };
        }

        // @N — bars ago
        if (t.type === TT.NUMBER) {
            const n = Number(this.advance().value);
            return { kind: 'bars', n };
        }

        // @tickersymbol / @index_token
        if (t.type === TT.IDENT) {
            const sym = this.advance().value;
            return { kind: 'ticker', sym };
        }

        throw new ParseError('Expected shift specifier after @', t.pos);
    }

    /** Parse an identifier, optional argument list, optional array index, optional @shift */
    private parseIdentExpr(): IdentExpr {
        const nameTok = this.eat(TT.IDENT);
        let name = nameTok.value;

        // nh_21, pp_5 etc. parsed as ident; keep as-is
        const args: AstNode[] = [];

        // function call: name(arg, arg, ...)
        if (this.check(TT.LPAREN)) {
            this.advance();
            if (!this.check(TT.RPAREN)) {
                args.push(this.parseArg());
                while (this.tryEat(TT.COMMA)) {
                    args.push(this.parseArg());
                }
            }
            this.eat(TT.RPAREN);
        }

        // array index: name[N]
        let arrayIndex: number | undefined;
        if (this.check(TT.LBRACKET) && this.peek(1).type === TT.NUMBER) {
            this.advance();
            arrayIndex = Number(this.eat(TT.NUMBER).value);
            this.eat(TT.RBRACKET);
        }

        // @suffix chain — multiple allowed e.g. @aapl@weekly
        let shift: ShiftSpec | undefined;
        while (this.check(TT.AT)) {
            this.advance();
            const s = this.parseShiftSpec();
            // chain: combine last ticker + tf into one shift
            if (shift && s.kind === 'tf' && shift.kind === 'ticker') {
                // merge: keep ticker, add tf — for codegen simplicity use ticker only
                // (multi-level regime+tf is not supported on snapshot DB)
            } else {
                shift = s;
            }
        }

        return { kind: 'ident', name, args, arrayIndex, shift };
    }

    /** Argument to a function call — could be a string, number, or ident */
    private parseArg(): AstNode {
        const t = this.cur();
        // string arg
        if (t.type === TT.STRING) {
            this.advance();
            return { kind: 'ident', name: t.value, args: [] };
        }
        // 'as alias' handled in sortby/show — just parse as expression
        return this.parseArith();
    }

    // ─── Universe call: index(nifty50, sensex) etc. ───────────────────────────

    private parseUniverseCall(): UniverseCall {
        const fn = this.advance().value as UniverseCall['fn'];
        this.eat(TT.LPAREN);
        const args: string[] = [];
        if (!this.check(TT.RPAREN)) {
            args.push(this.readStringOrIdent());
            while (this.tryEat(TT.COMMA)) {
                args.push(this.readStringOrIdent());
            }
        }
        this.eat(TT.RPAREN);
        return { kind: 'universe', fn, args };
    }

    private readStringOrIdent(): string {
        const t = this.cur();
        if (t.type === TT.STRING || t.type === TT.IDENT || t.type === TT.NUMBER) {
            this.advance();
            return t.value;
        }
        throw new ParseError('Expected string or identifier', t.pos);
    }

    // ─── Output directive: sortby / show / draw ───────────────────────────────

    private parseOutputDirective(): OutputDirective {
        const fn = this.advance().value as OutputDirective['fn'];
        this.eat(TT.LPAREN);
        const args: AstNode[] = [];
        let dir: 'asc' | 'desc' | undefined;
        let limit: number | undefined;

        if (!this.check(TT.RPAREN)) {
            args.push(this.parseArith());
            while (this.tryEat(TT.COMMA)) {
                const t = this.cur();
                if (t.type === TT.IDENT && (t.value === 'asc' || t.value === 'desc')) {
                    dir = t.value as 'asc' | 'desc';
                    this.advance();
                } else if (t.type === TT.NUMBER) {
                    limit = Number(this.advance().value);
                } else {
                    args.push(this.parseArith());
                }
            }
        }
        this.eat(TT.RPAREN);

        const directive: OutputDirective = { kind: 'output', fn, args, dir, limit };
        this.directives.push(directive);
        return directive;
    }

    // ─── Aggregate: max(h, 10) / min(l, 5) / avg(rsi(14), 10) / abs(x) ──────

    private parseAgg(): AggCall {
        const fn = this.advance().value as AggCall['fn'];
        this.eat(TT.LPAREN);
        const expr = this.parseArith();
        let period: number | undefined;
        if (this.tryEat(TT.COMMA)) {
            period = Number(this.eat(TT.NUMBER).value);
        }
        this.eat(TT.RPAREN);
        return { kind: 'agg', fn, expr, period };
    }

    // ─── IFF conditional ─────────────────────────────────────────────────────

    private parseIff(): IffExpr {
        this.eat(TT.IDENT, 'iff');
        this.eat(TT.LPAREN);
        const cond = this.parseExpr();
        this.eat(TT.COMMA);
        const then = this.parseArith();
        this.eat(TT.COMMA);
        const else_ = this.parseArith();
        this.eat(TT.RPAREN);
        return { kind: 'iff', cond, then, else_ };
    }

    // ─── Watchlist / index  [name] ────────────────────────────────────────────

    private parseWatchlistOrIndex(): WatchlistRef {
        this.eat(TT.LBRACKET);
        // collect everything until ']', allowing spaces in watchlist names
        let name = '';
        while (!this.check(TT.RBRACKET) && !this.check(TT.EOF)) {
            name += this.advance().value + ' ';
        }
        this.eat(TT.RBRACKET);
        return { kind: 'watchlist', name: name.trim() };
    }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function parseDsl(src: string): FormulaNode {
    return new Parser(src).parse();
}
