/**
 * DSL token → SQL column/expression mapping.
 * All Indian-context indicator names resolve to columns in:
 *   - a   = assets
 *   - cr  = computed_ratios (latest snapshot)
 *   - ti  = technical_indicators (latest snapshot)
 */

export interface ColInfo {
    /** SQL expression or column reference */
    sql: string;
    /** Which table alias this belongs to (for join decisions) */
    table: 'a' | 'cr' | 'ti' | 'expr';
}

/**
 * Resolve a plain DSL indicator name (no params) to a SQL expression.
 * Returns null if the name is not a known indicator.
 */
export function resolveIndicator(name: string): ColInfo | null {
    return PLAIN_MAP[name.toLowerCase()] ?? null;
}

/**
 * Resolve a parameterised indicator call, e.g. sma(50), rsi(14).
 * args is the list of numeric parameter values already evaluated.
 * Returns null if unrecognised.
 */
export function resolveCall(name: string, args: number[]): ColInfo | null {
    const lc = name.toLowerCase();
    const fn = CALL_MAP[lc];
    if (!fn) return null;
    return fn(args);
}

// ─────────────────────────────────────────────────────────────────────────────
// Plain (no-arg) indicator map
// ─────────────────────────────────────────────────────────────────────────────

const PLAIN_MAP: Record<string, ColInfo> = {
    // Price
    price:              { sql: 'ti.price',              table: 'ti' },
    close:              { sql: 'ti.price',              table: 'ti' },
    last:               { sql: 'ti.price',              table: 'ti' },
    c:                  { sql: 'ti.price',              table: 'ti' },
    open:               { sql: 'ti.open_price',         table: 'ti' },
    o:                  { sql: 'ti.open_price',         table: 'ti' },
    high:               { sql: 'ti.high_price',         table: 'ti' },
    h:                  { sql: 'ti.high_price',         table: 'ti' },
    low:                { sql: 'ti.low_price',          table: 'ti' },
    l:                  { sql: 'ti.low_price',          table: 'ti' },

    // Volume
    volume:             { sql: 'ti.volume',             table: 'ti' },
    v:                  { sql: 'ti.volume',             table: 'ti' },

    // Previous bar (lag-1) — stored as prev_* in technical_indicators
    prev_close:         { sql: 'ti.prev_close',         table: 'ti' },
    prev_high:          { sql: 'ti.prev_high',          table: 'ti' },
    prev_low:           { sql: 'ti.prev_low',           table: 'ti' },
    prev_open:          { sql: 'ti.prev_open',          table: 'ti' },
    prev_volume:        { sql: 'ti.prev_volume',        table: 'ti' },

    // Cap / Market cap (in Cr for India; avol/advol/cap in millions in original — we use Cr)
    cap:                { sql: 'cr.market_cap_cr',      table: 'cr' },
    mcap:               { sql: 'cr.market_cap_cr',      table: 'cr' },

    // Average daily volume (21-day default, millions)
    avol:               { sql: 'ti.volume_ma_20',       table: 'ti' },

    // Average daily DOLLAR volume (21-day default, millions) — approx price * avol
    advol:              { sql: '(ti.price * ti.volume_ma_20 / 1000000.0)', table: 'ti' },

    // Relative volume
    rvol:               { sql: 'ti.rvol',               table: 'ti' },

    // % change
    chopen:             { sql: 'ti.chopen_pct',         table: 'ti' },
    change:             { sql: 'ti.change_1d_pct',      table: 'ti' },
    change_1d:          { sql: 'ti.change_1d_pct',      table: 'ti' },
    change_5d:          { sql: 'ti.change_5d_pct',      table: 'ti' },
    change_21d:         { sql: 'ti.change_21d_pct',     table: 'ti' },

    // Gap
    gapup:              { sql: 'ti.gap_pct',            table: 'ti' },
    gapdn:              { sql: '(-1 * ti.gap_pct)',     table: 'ti' },

    // Moving averages (default periods stored in ti)
    sma_20:             { sql: 'ti.sma_20',             table: 'ti' },
    sma_50:             { sql: 'ti.sma_50',             table: 'ti' },
    sma_200:            { sql: 'ti.sma_200',            table: 'ti' },
    ema_9:              { sql: 'ti.ema_9',              table: 'ti' },
    ema_21:             { sql: 'ti.ema_21',             table: 'ti' },
    ema_50:             { sql: 'ti.ema_50',             table: 'ti' },
    ema_200:            { sql: 'ti.ema_200',            table: 'ti' },

    // Oscillators
    rsi_14:             { sql: 'ti.rsi_14',             table: 'ti' },
    macd_line:          { sql: 'ti.macd_line',          table: 'ti' },
    macd_signal:        { sql: 'ti.macd_signal',        table: 'ti' },
    macd_hist:          { sql: 'ti.macd_hist',          table: 'ti' },
    stoch_k:            { sql: 'ti.stoch_k',            table: 'ti' },
    stoch_d:            { sql: 'ti.stoch_d',            table: 'ti' },
    stoch_rsi:          { sql: 'ti.stoch_rsi',          table: 'ti' },
    cci_20:             { sql: 'ti.cci_20',             table: 'ti' },
    williams_r_14:      { sql: 'ti.williams_r_14',      table: 'ti' },
    momentum_12:        { sql: 'ti.momentum_12',        table: 'ti' },
    roc_10:             { sql: 'ti.roc_10',             table: 'ti' },

    // Trend
    adx_14:             { sql: 'ti.adx_14',             table: 'ti' },
    di_plus:            { sql: 'ti.di_plus_14',         table: 'ti' },
    di_minus:           { sql: 'ti.di_minus_14',        table: 'ti' },
    psar:               { sql: 'ti.psar',               table: 'ti' },
    supertrend:         { sql: 'ti.supertrend',         table: 'ti' },
    supertrend_dir:     { sql: 'ti.supertrend_dir',     table: 'ti' },

    // Volatility
    atr_14:             { sql: 'ti.atr_14',             table: 'ti' },
    natr_14:            { sql: 'ti.natr_14',            table: 'ti' },
    bb_upper:           { sql: 'ti.bb_upper',           table: 'ti' },
    bb_middle:          { sql: 'ti.bb_middle',          table: 'ti' },
    bb_lower:           { sql: 'ti.bb_lower',           table: 'ti' },
    bb_pct_b:           { sql: 'ti.bb_pct_b',           table: 'ti' },
    bb_width:           { sql: 'ti.bb_width',           table: 'ti' },
    keltner_upper:      { sql: 'ti.keltner_upper',      table: 'ti' },
    keltner_lower:      { sql: 'ti.keltner_lower',      table: 'ti' },
    donchian_upper:     { sql: 'ti.donchian_upper',     table: 'ti' },
    donchian_lower:     { sql: 'ti.donchian_lower',     table: 'ti' },

    // Volume indicators
    obv:                { sql: 'ti.obv',                table: 'ti' },
    cmf_20:             { sql: 'ti.cmf_20',             table: 'ti' },
    mfi_14:             { sql: 'ti.mfi_14',             table: 'ti' },
    volume_ma_20:       { sql: 'ti.volume_ma_20',       table: 'ti' },

    // Pre-computed trend / pattern flags (stored in ti as integers 0/1)
    risunvol:           { sql: 'ti.flag_risunvol',      table: 'ti' },
    higher_highs_3:     { sql: 'ti.flag_hh3',           table: 'ti' },
    higher_closes_3:    { sql: 'ti.flag_hc3',           table: 'ti' },

    // 52-week
    high_52w:           { sql: 'ti.high_52w',           table: 'ti' },
    low_52w:            { sql: 'ti.low_52w',            table: 'ti' },
    pct_from_52w_high:  { sql: 'ti.pct_from_52w_high',  table: 'ti' },
    pct_from_52w_low:   { sql: 'ti.pct_from_52w_low',   table: 'ti' },

    // Fundamental
    pe:                 { sql: 'cr.pe_ttm',             table: 'cr' },
    pb:                 { sql: 'cr.pb',                 table: 'cr' },
    ev_ebitda:          { sql: 'cr.ev_ebitda',          table: 'cr' },
    enterprise_ebitda:  { sql: 'cr.ev_ebitda',          table: 'cr' },
    dvd_yield:          { sql: 'cr.dividend_yield',     table: 'cr' },
    roce:               { sql: 'cr.roce',               table: 'cr' },
    roe:                { sql: 'cr.roe',                table: 'cr' },
    roic:               { sql: 'cr.roce',               table: 'cr' }, // approximation
    eps:                { sql: 'cr.eps_ttm',            table: 'cr' },
    ebitda:             { sql: 'cr.ebitda_ttm',         table: 'cr' },
    pat_margin:         { sql: 'cr.pat_margin',         table: 'cr' },
    op_margin:          { sql: 'cr.operating_margin',   table: 'cr' },
    debt_equity:        { sql: 'cr.debt_equity',        table: 'cr' },
    price_book_ratio:   { sql: 'cr.pb',                 table: 'cr' },
    current_ratio:      { sql: 'cr.current_ratio',      table: 'cr' },
    interest_coverage:  { sql: 'cr.interest_coverage',  table: 'cr' },
    quality_score:      { sql: 'cr.quality_score',      table: 'cr' },
    piotroski_f_score:  { sql: 'cr.quality_score',      table: 'cr' }, // best proxy
    altman_z_score:     { sql: 'cr.altman_z',           table: 'cr' },
    beneish_m_score:    { sql: 'cr.beneish_m',          table: 'cr' },

    // Growth
    eps_yoy:            { sql: 'cr.eps_growth_1y',      table: 'cr' },
    revenue_qoq:        { sql: 'cr.revenue_growth_1y',  table: 'cr' }, // approx
    net_income_5y_growth: { sql: 'cr.pat_growth_1y',   table: 'cr' }, // approx

    // Dividend
    dvd_payout_ratio:   { sql: 'cr.dividend_payout',   table: 'cr' },
    buyback_yield_5y_avg: { sql: 'cr.buyback_yield',   table: 'cr' },

    // Factor exposure — IIMA Carhart 4-Factor (future: ff alias = asset_factor_exposure view)
    ff_beta:            { sql: 'ff.market_beta',        table: 'expr' },
    ff_smb:             { sql: 'ff.smb_loading',        table: 'expr' },
    ff_hml:             { sql: 'ff.hml_loading',        table: 'expr' },
    ff_wml:             { sql: 'ff.wml_loading',        table: 'expr' },
    ff_alpha:           { sql: 'ff.alpha',              table: 'expr' },
    ff_r2:              { sql: 'ff.r_squared',          table: 'expr' },
    quality:            { sql: 'cr.quality_score',      table: 'cr' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Parameterised call map: name → (args) => ColInfo
// ─────────────────────────────────────────────────────────────────────────────

type CallResolver = (args: number[]) => ColInfo | null;

/** Map a SMA/EMA period to the nearest pre-computed column */
function nearestMa(prefix: string, period: number, available: number[]): number {
    return available.reduce((best, p) =>
        Math.abs(p - period) < Math.abs(best - period) ? p : best
    );
}

const SMA_AVAIL = [20, 50, 200];
const EMA_AVAIL = [9, 21, 50, 200];

const CALL_MAP: Record<string, CallResolver> = {
    sma:  ([p = 50]) => {
        const n = nearestMa('sma', p, SMA_AVAIL);
        return { sql: `ti.sma_${n}`, table: 'ti' };
    },
    ema:  ([p = 50]) => {
        const n = nearestMa('ema', p, EMA_AVAIL);
        return { sql: `ti.ema_${n}`, table: 'ti' };
    },
    wma:  ([p = 50]) => ({ sql: 'ti.wma_50', table: 'ti' }),
    dema: ([p = 50]) => ({ sql: 'ti.dema_50', table: 'ti' }),
    tema: ([p = 50]) => ({ sql: 'ti.tema_50', table: 'ti' }),
    hma:  ([p = 50]) => ({ sql: 'ti.hma_50',  table: 'ti' }),
    vwma: ([p = 20]) => ({ sql: 'ti.vwma_20', table: 'ti' }),

    rsi:  ([p = 14]) => ({ sql: 'ti.rsi_14',  table: 'ti' }),

    macd:  ([fast=12,slow=26,sig=9]) => ({ sql: 'ti.macd_line',   table: 'ti' }),
    macds: ([fast=12,slow=26,sig=9]) => ({ sql: 'ti.macd_signal', table: 'ti' }),
    macdh: ([fast=12,slow=26,sig=9]) => ({ sql: 'ti.macd_hist',   table: 'ti' }),

    stoch:   ([p=14,sk=3,sd=3]) => ({ sql: 'ti.stoch_k', table: 'ti' }),
    slowk:   ([p=14,sk=3,sd=3]) => ({ sql: 'ti.stoch_k', table: 'ti' }),
    slowd:   ([p=14,sk=3,sd=3]) => ({ sql: 'ti.stoch_d', table: 'ti' }),

    cci:     ([p=20])  => ({ sql: 'ti.cci_20',       table: 'ti' }),
    williams:([p=14])  => ({ sql: 'ti.williams_r_14', table: 'ti' }),
    willr:   ([p=14])  => ({ sql: 'ti.williams_r_14', table: 'ti' }),
    mom:     ([p=12])  => ({ sql: 'ti.momentum_12',  table: 'ti' }),
    roc:     ([p=10])  => ({ sql: 'ti.roc_10',       table: 'ti' }),
    ao:      ([f=5,s=34]) => ({ sql: 'ti.macd_hist', table: 'ti' }), // AO approx via MACD hist
    adx:     ([p=14])  => ({ sql: 'ti.adx_14',       table: 'ti' }),
    di_plus: ([p=14])  => ({ sql: 'ti.di_plus_14',   table: 'ti' }),
    di_minus:([p=14])  => ({ sql: 'ti.di_minus_14',  table: 'ti' }),
    psar:    ([af=0.02,max=0.2]) => ({ sql: 'ti.psar', table: 'ti' }),
    atr:     ([p=14])  => ({ sql: 'ti.atr_14',       table: 'ti' }),
    natr:    ([p=14])  => ({ sql: 'ti.natr_14',      table: 'ti' }),

    // Bollinger Bands
    bb:      ([p=20,dev=2])  => ({ sql: 'ti.bb_middle', table: 'ti' }),
    bbub:    ([p=20,dev=2])  => ({ sql: 'ti.bb_upper',  table: 'ti' }),
    bblb:    ([p=20,dev=2])  => ({ sql: 'ti.bb_lower',  table: 'ti' }),
    bbwidth: ([p=20,dev=2])  => ({ sql: 'ti.bb_width',  table: 'ti' }),
    bbpctb:  ([p=20,dev=2])  => ({ sql: 'ti.bb_pct_b',  table: 'ti' }),

    // Volume
    avol:  ([p=21]) => ({ sql: 'ti.volume_ma_20', table: 'ti' }),
    advol: ([p=21]) => ({ sql: '(ti.price * ti.volume_ma_20 / 1000000.0)', table: 'ti' }),
    vma:   ([p=21]) => ({ sql: 'ti.volume_ma_20', table: 'ti' }),
    rvol:  ([p=21]) => ({ sql: 'ti.rvol',         table: 'ti' }),

    // OBV, CMF, MFI
    obv:   ()       => ({ sql: 'ti.obv',    table: 'ti' }),
    cmf:   ([p=20]) => ({ sql: 'ti.cmf_20', table: 'ti' }),
    mfi:   ([p=14]) => ({ sql: 'ti.mfi_14', table: 'ti' }),

    // Fundamental
    pe:    ()       => ({ sql: 'cr.pe_ttm',         table: 'cr' }),
    pb:    ()       => ({ sql: 'cr.pb',             table: 'cr' }),
    eps:   ()       => ({ sql: 'cr.eps_ttm',        table: 'cr' }),
    ebitda:()       => ({ sql: 'cr.ebitda_ttm',     table: 'cr' }),
    cap:   ()       => ({ sql: 'cr.market_cap_cr',  table: 'cr' }),

    // Price performance % over N days
    pp:    ([p=5])  => {
        if (p <= 1)  return { sql: 'ti.change_1d_pct',  table: 'ti' };
        if (p <= 7)  return { sql: 'ti.change_5d_pct',  table: 'ti' };
        return              { sql: 'ti.change_21d_pct', table: 'ti' };
    },

    // Smar* — SMA of another indicator: smarsi(14,9) etc. Not pre-computed → null (unsupported)
    smarsi: () => null,
    smasma: () => null,

    // Fibonacci / candlestick patterns → boolean flags in ti
    fibo_ta23: () => ({ sql: 'ti.flag_fibo23', table: 'ti' }),
    fibo_ta38: () => ({ sql: 'ti.flag_fibo38', table: 'ti' }),
    fibo_ta50: () => ({ sql: 'ti.flag_fibo50', table: 'ti' }),
};

// ─────────────────────────────────────────────────────────────────────────────
// nh_N  / pp_N pattern resolution  (ident names containing underscore + number)
// ─────────────────────────────────────────────────────────────────────────────

/** Try to resolve special nh_N / pp_N / cdl_* tokens */
export function resolveSpecialIdent(name: string): ColInfo | null {
    // nh_21 → ti.nh_21 | nh_all → ti.nh_all
    const nhMatch = name.match(/^nh_(\d+|all)$/);
    if (nhMatch) return { sql: `ti.nh_${nhMatch[1]}`, table: 'ti' };

    // pp_5 → ti.change_5d_pct etc.
    const ppMatch = name.match(/^pp_(\d+)$/);
    if (ppMatch) {
        const n = parseInt(ppMatch[1]);
        if (n <= 1)  return { sql: 'ti.change_1d_pct',  table: 'ti' };
        if (n <= 7)  return { sql: 'ti.change_5d_pct',  table: 'ti' };
        return              { sql: 'ti.change_21d_pct', table: 'ti' };
    }

    // cdl_* → boolean candlestick pattern flag
    if (name.startsWith('cdl_')) return { sql: `ti.${name}`, table: 'ti' };

    // ln_art (above rising trendline) etc.
    if (name === 'ln_art') return { sql: 'ti.flag_above_trendline', table: 'ti' };

    return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Indian index membership mapping
// ─────────────────────────────────────────────────────────────────────────────

/** Maps DSL index token → assets.index_memberships JSON or constituent table name */
export const INDIA_INDICES: Record<string, string> = {
    nifty50:       'NIFTY 50',
    next50:        'NIFTY NEXT 50',
    nifty100:      'NIFTY 100',
    nifty200:      'NIFTY 200',
    nifty500:      'NIFTY 500',
    sensex:        'BSE SENSEX',
    niftybank:     'NIFTY BANK',
    midcap150:     'NIFTY MIDCAP 150',
    smallcap250:   'NIFTY SMALLCAP 250',
    // aliases used in the DSL spec
    nifty50i:      'NIFTY 50',
    sp500:         'NIFTY 50',    // India fallback for sp500 in regime filters
    nasdaq:        'NIFTY 50',
    nasdaq100:     'NIFTY NEXT 50',
    nasd100:       'NIFTY NEXT 50',
};

/** Maps type() DSL values → assets.asset_class values */
export const TYPE_MAP: Record<string, string> = {
    stock:  'EQUITY',
    equity: 'EQUITY',
    fund:   'ETF',
    etf:    'ETF',
    reit:   'REIT',
    invit:  'INVIT',
};
