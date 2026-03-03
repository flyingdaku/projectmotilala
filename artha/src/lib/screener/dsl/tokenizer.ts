/**
 * DSL Tokenizer
 * Converts a raw formula string into a flat token stream.
 */

export const enum TT {
    // Literals
    NUMBER   = 'NUMBER',
    STRING   = 'STRING',   // single-quoted 'value'
    IDENT    = 'IDENT',    // bare word: price, rsi, sma, nifty50 …

    // Punctuation
    LPAREN   = '(',
    RPAREN   = ')',
    LBRACKET = '[',
    RBRACKET = ']',
    LBRACE   = '{',
    RBRACE   = '}',
    COMMA    = ',',
    DOT_DOT  = '..',
    AT       = '@',
    BANG     = '!',
    PLUS     = '+',
    MINUS    = '-',
    STAR     = '*',
    SLASH    = '/',

    // Comparison operators
    GT       = '>',
    GTE      = '>=',
    LT       = '<',
    LTE      = '<=',
    EQ       = '=',

    // Keyword operators (lexed as IDENT then promoted by parser)
    // and | or | not | ca | cb | trend_up | trend_dn | higher_highs | higher_closes
    // risunvol | div_bull | div_bear | nh_N | pp_N | sortby | show | draw | iff
    // type | index | sector | exch | ticker | as | fixed

    EOF      = 'EOF',
}

export interface Token {
    type: TT;
    value: string;   // raw text
    pos: number;     // byte offset in source
}

// Keywords that the parser treats specially (kept lowercase)
export const KEYWORDS = new Set([
    'and', 'or', 'not',
    'ca', 'cb',
    'trend_up', 'trend_dn',
    'higher_highs', 'higher_closes',
    'risunvol',
    'div_bull', 'div_bear',
    'sortby', 'show', 'draw',
    'iff', 'as', 'fixed',
    'type', 'index', 'sector', 'exch', 'ticker',
    'hist',
]);

export class TokenizeError extends Error {
    constructor(msg: string, public pos: number) { super(msg); }
}

/**
 * Strip // line comments and /* block comments from source.
 */
function stripComments(src: string): string {
    // block comments /* … */
    src = src.replace(/\/\*[\s\S]*?\*\//g, ' ');
    // line comments // … \n
    src = src.replace(/\/\/[^\n]*/g, ' ');
    return src;
}

export function tokenize(raw: string): Token[] {
    const src = stripComments(raw);
    const tokens: Token[] = [];
    let i = 0;

    while (i < src.length) {
        // whitespace
        if (/\s/.test(src[i])) { i++; continue; }

        const pos = i;

        // two-char operators
        if (src[i] === '>' && src[i+1] === '=') { tokens.push({ type: TT.GTE, value: '>=', pos }); i += 2; continue; }
        if (src[i] === '<' && src[i+1] === '=') { tokens.push({ type: TT.LTE, value: '<=', pos }); i += 2; continue; }
        if (src[i] === '.' && src[i+1] === '.') { tokens.push({ type: TT.DOT_DOT, value: '..', pos }); i += 2; continue; }

        // single-char operators / punctuation
        switch (src[i]) {
            case '(': tokens.push({ type: TT.LPAREN,   value: '(', pos }); i++; continue;
            case ')': tokens.push({ type: TT.RPAREN,   value: ')', pos }); i++; continue;
            case '[': tokens.push({ type: TT.LBRACKET, value: '[', pos }); i++; continue;
            case ']': tokens.push({ type: TT.RBRACKET, value: ']', pos }); i++; continue;
            case '{': tokens.push({ type: TT.LBRACE,   value: '{', pos }); i++; continue;
            case '}': tokens.push({ type: TT.RBRACE,   value: '}', pos }); i++; continue;
            case ',': tokens.push({ type: TT.COMMA,    value: ',', pos }); i++; continue;
            case '@': tokens.push({ type: TT.AT,       value: '@', pos }); i++; continue;
            case '!': tokens.push({ type: TT.BANG,     value: '!', pos }); i++; continue;
            case '+': tokens.push({ type: TT.PLUS,     value: '+', pos }); i++; continue;
            case '-': tokens.push({ type: TT.MINUS,    value: '-', pos }); i++; continue;
            case '*': tokens.push({ type: TT.STAR,     value: '*', pos }); i++; continue;
            case '/': tokens.push({ type: TT.SLASH,    value: '/', pos }); i++; continue;
            case '>': tokens.push({ type: TT.GT,       value: '>', pos }); i++; continue;
            case '<': tokens.push({ type: TT.LT,       value: '<', pos }); i++; continue;
            case '=': tokens.push({ type: TT.EQ,       value: '=', pos }); i++; continue;
        }

        // number (integer or decimal; also dates like 12/31/2019 handled as IDENT post-split)
        if (/[0-9]/.test(src[i])) {
            let num = '';
            while (i < src.length && /[0-9.]/.test(src[i])) num += src[i++];
            tokens.push({ type: TT.NUMBER, value: num, pos });
            continue;
        }

        // single-quoted string 'value'
        if (src[i] === "'") {
            i++;
            let s = '';
            while (i < src.length && src[i] !== "'") s += src[i++];
            if (i < src.length) i++; // consume closing '
            tokens.push({ type: TT.STRING, value: s, pos });
            continue;
        }

        // identifier / keyword: starts with letter or underscore, may contain letters, digits, underscores
        if (/[a-zA-Z_]/.test(src[i])) {
            let id = '';
            while (i < src.length && /[a-zA-Z0-9_]/.test(src[i])) id += src[i++];
            tokens.push({ type: TT.IDENT, value: id.toLowerCase(), pos });
            continue;
        }

        throw new TokenizeError(`Unexpected character '${src[i]}'`, i);
    }

    tokens.push({ type: TT.EOF, value: '', pos: src.length });
    return tokens;
}
