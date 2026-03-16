/**
 * Screener Indicator Taxonomy
 * Defines all supported technical/fundamental indicators, their categories,
 * default parameters, DSL names, and display metadata.
 */

// ─── Param definition ──────────────────────────────────────────────────────

export interface IndicatorParam {
    name: string;
    label: string;
    /** Typical starting value */
    defaultValue: number | string;
    min?: number;
    max?: number;
    step?: number;
}

// ─── Category ──────────────────────────────────────────────────────────────

export interface IndicatorCategory {
    id: string;
    label: string;
    /** Optional sub-group label used to visually group items inside the metrics column */
    group?: string;
}

export const INDICATOR_CATEGORIES: IndicatorCategory[] = [
    { id: 'universe',       label: 'Universe' },
    { id: 'price',          label: 'Price / Volume' },
    { id: 'ma',             label: 'Moving Averages' },
    { id: 'oscillators',    label: 'Oscillators' },
    { id: 'trend',          label: 'Trend Indicators' },
    { id: 'volatility',     label: 'Volatility' },
    { id: 'volume',         label: 'Volume Indicators' },
    { id: 'momentum',       label: 'Momentum' },
    { id: 'channels',       label: 'Channels & Bands' },
    { id: 'ichimoku',       label: 'Ichimoku' },
    { id: 'pivot',          label: 'Pivot Points' },
    { id: 'relstrength',    label: 'Relative Strength' },
    { id: 'price_action',   label: 'Price Action' },
    { id: 'fundamental',    label: 'Fundamental Data' },
    { id: 'financial_health', label: 'Financial Health' },
    { id: 'growth',         label: 'Growth' },
    { id: 'valuation',      label: 'Valuation' },
    { id: 'quality',        label: 'Quality & Rank' },
    { id: 'factor',         label: 'Factor Exposure' },
    { id: 'math',           label: 'Math Operations' },
];

// ─── Indicator definition ──────────────────────────────────────────────────

export type RhsType =
    | 'number'      // plain numeric value
    | 'indicator'   // another indicator expression
    | 'number_or_indicator' // either
    | 'enum';       // fixed string value from a known list

export interface IndicatorDef {
    id: string;
    label: string;
    categoryId: string;
    /** The DSL function name used when building formula strings */
    dslName: string;
    params: IndicatorParam[];
    /** What the RHS (right-hand side) of a condition can be */
    rhsType: RhsType;
    /** Fixed options for enum rhsType */
    enumOptions?: { value: string; label: string }[];
    /** Short description shown as tooltip */
    description?: string;
    /** Whether this indicator is backed in our DB (false = UI only, blocked from running) */
    supported: boolean;
}

export const INDICATORS: IndicatorDef[] = [

    // ── Universe ──────────────────────────────────────────────────────────
    {
        id: 'uni_mcap_bucket',  label: 'Market Cap Bucket', categoryId: 'universe',
        dslName: 'caps', params: [], rhsType: 'enum', supported: true,
        enumOptions: [
            { value: 'large',  label: 'Large Cap  (>₹20,000 Cr)' },
            { value: 'mid',    label: 'Mid Cap    (₹5,000–20,000 Cr)' },
            { value: 'small',  label: 'Small Cap  (₹500–5,000 Cr)' },
            { value: 'micro',  label: 'Micro Cap  (<₹500 Cr)' },
        ],
        description: 'Filter by market cap bucket',
    },
    {
        id: 'uni_sector', label: 'Sector', categoryId: 'universe',
        dslName: 'sector', params: [], rhsType: 'enum', supported: true,
        enumOptions: [], // populated dynamically from DB
        description: 'Filter by industry sector',
    },
    {
        id: 'uni_index', label: 'Index Membership', categoryId: 'universe',
        dslName: 'index', params: [], rhsType: 'enum', supported: true,
        enumOptions: [
            { value: 'nifty50',     label: 'Nifty 50' },
            { value: 'next50',      label: 'Nifty Next 50' },
            { value: 'nifty100',    label: 'Nifty 100' },
            { value: 'nifty200',    label: 'Nifty 200' },
            { value: 'nifty500',    label: 'Nifty 500' },
            { value: 'niftybank',   label: 'Nifty Bank' },
            { value: 'midcap150',   label: 'Nifty Midcap 150' },
            { value: 'smallcap250', label: 'Nifty Smallcap 250' },
            { value: 'sensex',      label: 'BSE Sensex' },
        ],
        description: 'Filter by index membership (nifty50, nifty200, sensex, etc.)',
    },
    {
        id: 'uni_instrument_type', label: 'Instrument Type', categoryId: 'universe',
        dslName: 'type', params: [], rhsType: 'enum', supported: true,
        enumOptions: [
            { value: 'equity', label: 'Equity' },
            { value: 'etf',    label: 'ETF' },
            { value: 'reit',   label: 'REIT' },
            { value: 'invit',  label: 'InvIT' },
        ],
        description: 'Filter by instrument type',
    },

    // ── Math Operations ───────────────────────────────────────────────────
    {
        id: 'abs',          label: 'Absolute Value',    categoryId: 'math',
        dslName: 'abs',     params: [{ name: 'expr', label: 'Expression', defaultValue: 'close' }],
        rhsType: 'number_or_indicator', description: 'Absolute Value', supported: true,
    },
    {
        id: 'max',          label: 'Maximum',           categoryId: 'math',
        dslName: 'max',     params: [{ name: 'expr1', label: 'Expr 1', defaultValue: 'close' }, { name: 'expr2', label: 'Expr 2', defaultValue: 'open' }],
        rhsType: 'number_or_indicator', description: 'Maximum of two values', supported: true,
    },
    {
        id: 'min',          label: 'Minimum',           categoryId: 'math',
        dslName: 'min',     params: [{ name: 'expr1', label: 'Expr 1', defaultValue: 'close' }, { name: 'expr2', label: 'Expr 2', defaultValue: 'open' }],
        rhsType: 'number_or_indicator', description: 'Minimum of two values', supported: true,
    },
    {
        id: 'bracket',      label: 'Bracket',           categoryId: 'math',
        dslName: 'bracket', params: [{ name: 'expr', label: 'Expression', defaultValue: 'close' }],
        rhsType: 'number_or_indicator', description: 'Group operations with brackets', supported: true,
    },

    // ── Price / Volume ────────────────────────────────────────────────────
    {
        id: 'price',        label: 'Price (Close)',      categoryId: 'price',
        dslName: 'price',   params: [],                  rhsType: 'number_or_indicator',
        description: 'Current close price', supported: true,
    },
    {
        id: 'open',         label: 'Open',               categoryId: 'price',
        dslName: 'open',    params: [],                  rhsType: 'number_or_indicator',
        description: 'Open price', supported: true,
    },
    {
        id: 'high',         label: 'High',               categoryId: 'price',
        dslName: 'high',    params: [],                  rhsType: 'number_or_indicator',
        description: 'High price', supported: true,
    },
    {
        id: 'low',          label: 'Low',                categoryId: 'price',
        dslName: 'low',     params: [],                  rhsType: 'number_or_indicator',
        description: 'Low price', supported: true,
    },
    {
        id: 'volume',       label: 'Volume',             categoryId: 'price',
        dslName: 'v',       params: [],                  rhsType: 'number_or_indicator',
        description: 'Current volume', supported: true,
    },
    {
        id: 'cvol',         label: 'Current Volume (M)', categoryId: 'price',
        dslName: 'cvol',    params: [],                  rhsType: 'number',
        description: 'Current volume in millions', supported: true,
    },
    {
        id: 'avol',         label: 'Avg Volume',         categoryId: 'price',
        dslName: 'avol',    params: [{ name: 'period', label: 'Period', defaultValue: 21 }],
        rhsType: 'number',  description: 'Average volume (millions)', supported: true,
    },
    {
        id: 'rvol',         label: 'Relative Volume',    categoryId: 'price',
        dslName: 'rvol',    params: [],                  rhsType: 'number',
        description: 'Current volume / 21-day avg volume', supported: true,
    },
    {
        id: 'volch',        label: 'Volume % Change',    categoryId: 'price',
        dslName: 'volch',   params: [],                  rhsType: 'number',
        description: 'Volume % change vs previous day', supported: true,
    },
    {
        id: 'pct52wHigh',   label: '% from 52w High',   categoryId: 'price',
        dslName: 'offh',    params: [{ name: 'period', label: 'Period', defaultValue: 252 }],
        rhsType: 'number',  description: '% below 52-week high', supported: true,
    },
    {
        id: 'pct52wLow',    label: '% from 52w Low',    categoryId: 'price',
        dslName: 'offl',    params: [{ name: 'period', label: 'Period', defaultValue: 252 }],
        rhsType: 'number',  description: '% above 52-week low', supported: true,
    },
    {
        id: 'highest',      label: 'Highest Price',     categoryId: 'price',
        dslName: 'highest', params: [{ name: 'period', label: 'Period', defaultValue: 52 }],
        rhsType: 'number_or_indicator', description: 'Highest close over N bars', supported: true,
    },
    {
        id: 'lowest',       label: 'Lowest Price',      categoryId: 'price',
        dslName: 'lowest',  params: [{ name: 'period', label: 'Period', defaultValue: 52 }],
        rhsType: 'number_or_indicator', description: 'Lowest close over N bars', supported: true,
    },
    {
        id: 'change_pct',   label: 'Price % Change',    categoryId: 'price',
        dslName: 'change',  params: [{ name: 'period', label: 'Period', defaultValue: 1 }],
        rhsType: 'number',  description: 'Price % change over N days', supported: true,
    },
    {
        id: 'gapup',        label: 'Gap Up %',          categoryId: 'price',
        dslName: 'gapup',   params: [],                  rhsType: 'number',
        description: 'Gap up % from previous close', supported: false,
    },
    {
        id: 'gapdn',        label: 'Gap Down %',        categoryId: 'price',
        dslName: 'gapdn',   params: [],                  rhsType: 'number',
        description: 'Gap down % from previous close', supported: false,
    },

    // ── Moving Averages ───────────────────────────────────────────────────
    {
        id: 'sma',          label: 'SMA',               categoryId: 'ma',
        dslName: 'sma',     params: [{ name: 'expr', label: 'Expression', defaultValue: 'close' }, { name: 'period', label: 'Period', defaultValue: 50, min: 2, max: 500 }],
        rhsType: 'number_or_indicator', description: 'Simple Moving Average', supported: true,
    },
    {
        id: 'ema',          label: 'EMA',               categoryId: 'ma',
        dslName: 'ema',     params: [{ name: 'expr', label: 'Expression', defaultValue: 'close' }, { name: 'period', label: 'Period', defaultValue: 50, min: 2, max: 500 }],
        rhsType: 'number_or_indicator', description: 'Exponential Moving Average', supported: true,
    },
    {
        id: 'wma',          label: 'WMA',               categoryId: 'ma',
        dslName: 'wma',     params: [{ name: 'period', label: 'Period', defaultValue: 50, min: 2, max: 500 }],
        rhsType: 'number_or_indicator', description: 'Weighted Moving Average', supported: true,
    },
    {
        id: 'dema',         label: 'DEMA',              categoryId: 'ma',
        dslName: 'dema',    params: [{ name: 'period', label: 'Period', defaultValue: 50 }],
        rhsType: 'number_or_indicator', description: 'Double EMA', supported: true,
    },
    {
        id: 'tema',         label: 'TEMA',              categoryId: 'ma',
        dslName: 'tema',    params: [{ name: 'period', label: 'Period', defaultValue: 50 }],
        rhsType: 'number_or_indicator', description: 'Triple EMA', supported: true,
    },
    {
        id: 'hma',          label: 'HMA',               categoryId: 'ma',
        dslName: 'hma',     params: [{ name: 'period', label: 'Period', defaultValue: 50 }],
        rhsType: 'number_or_indicator', description: 'Hull Moving Average', supported: true,
    },
    {
        id: 'kama',         label: 'KAMA',              categoryId: 'ma',
        dslName: 'kama',    params: [{ name: 'period', label: 'Period', defaultValue: 30 }],
        rhsType: 'number_or_indicator', description: 'Kaufman Adaptive MA', supported: false,
    },
    {
        id: 'vwma',         label: 'VWMA',              categoryId: 'ma',
        dslName: 'vwma',    params: [{ name: 'period', label: 'Period', defaultValue: 50 }],
        rhsType: 'number_or_indicator', description: 'Volume Weighted MA', supported: true,
    },
    {
        id: 'wild',         label: 'Wilder MA',         categoryId: 'ma',
        dslName: 'wild',    params: [{ name: 'period', label: 'Period', defaultValue: 21 }],
        rhsType: 'number_or_indicator', description: "Wilder's Moving Average", supported: false,
    },

    // ── Oscillators ───────────────────────────────────────────────────────
    {
        id: 'rsi',          label: 'RSI',               categoryId: 'oscillators',
        dslName: 'rsi',     params: [{ name: 'period', label: 'Period', defaultValue: 14, min: 2, max: 100 }],
        rhsType: 'number_or_indicator', description: 'Relative Strength Index', supported: true,
    },
    {
        id: 'macd',         label: 'MACD',              categoryId: 'oscillators',
        dslName: 'macd',    params: [
            { name: 'fast', label: 'Fast', defaultValue: 12 },
            { name: 'slow', label: 'Slow', defaultValue: 26 },
            { name: 'signal', label: 'Signal', defaultValue: 9 },
        ],
        rhsType: 'number_or_indicator', description: 'MACD line', supported: true,
    },
    {
        id: 'macds',        label: 'MACD Signal',       categoryId: 'oscillators',
        dslName: 'macds',   params: [
            { name: 'fast', label: 'Fast', defaultValue: 12 },
            { name: 'slow', label: 'Slow', defaultValue: 26 },
            { name: 'signal', label: 'Signal', defaultValue: 9 },
        ],
        rhsType: 'number_or_indicator', description: 'MACD Signal line', supported: true,
    },
    {
        id: 'macdh',        label: 'MACD Histogram',    categoryId: 'oscillators',
        dslName: 'macdh',   params: [
            { name: 'fast', label: 'Fast', defaultValue: 12 },
            { name: 'slow', label: 'Slow', defaultValue: 26 },
            { name: 'signal', label: 'Signal', defaultValue: 9 },
        ],
        rhsType: 'number',  description: 'MACD Histogram', supported: true,
    },
    {
        id: 'stoch',        label: 'Stochastic %K',     categoryId: 'oscillators',
        dslName: 'slowk',   params: [
            { name: 'period', label: 'Period', defaultValue: 14 },
            { name: 'slowK', label: 'Slow %K', defaultValue: 3 },
            { name: 'slowD', label: 'Slow %D', defaultValue: 3 },
        ],
        rhsType: 'number_or_indicator', description: 'Stochastic %K line', supported: true,
    },
    {
        id: 'stochd',       label: 'Stochastic %D',     categoryId: 'oscillators',
        dslName: 'slowd',   params: [
            { name: 'period', label: 'Period', defaultValue: 14 },
            { name: 'slowK', label: 'Slow %K', defaultValue: 3 },
            { name: 'slowD', label: 'Slow %D', defaultValue: 3 },
        ],
        rhsType: 'number_or_indicator', description: 'Stochastic %D line', supported: true,
    },
    {
        id: 'stochrsi',     label: 'Stoch RSI',         categoryId: 'oscillators',
        dslName: 'stochrsi', params: [
            { name: 'rsiPeriod', label: 'RSI Period', defaultValue: 14 },
            { name: 'stochPeriod', label: 'Stoch Period', defaultValue: 14 },
            { name: 'slowK', label: 'Slow %K', defaultValue: 3 },
            { name: 'slowD', label: 'Slow %D', defaultValue: 3 },
        ],
        rhsType: 'number_or_indicator', description: 'Stochastic RSI', supported: true,
    },
    {
        id: 'cci',          label: 'CCI',               categoryId: 'oscillators',
        dslName: 'cci',     params: [{ name: 'period', label: 'Period', defaultValue: 20 }],
        rhsType: 'number',  description: 'Commodity Channel Index', supported: true,
    },
    {
        id: 'wpr',          label: 'Williams %R',       categoryId: 'oscillators',
        dslName: 'willr',   params: [{ name: 'period', label: 'Period', defaultValue: 14 }],
        rhsType: 'number',  description: "Williams' Percent Range", supported: true,
    },
    {
        id: 'mom',          label: 'Momentum',          categoryId: 'oscillators',
        dslName: 'mom',     params: [{ name: 'period', label: 'Period', defaultValue: 12 }],
        rhsType: 'number',  description: 'Price Momentum', supported: true,
    },
    {
        id: 'roc',          label: 'ROC',               categoryId: 'oscillators',
        dslName: 'roc',     params: [{ name: 'period', label: 'Period', defaultValue: 10 }],
        rhsType: 'number',  description: 'Rate of Change', supported: true,
    },
    {
        id: 'ao',           label: 'Awesome Oscillator', categoryId: 'oscillators',
        dslName: 'ao',      params: [
            { name: 'fast', label: 'Fast', defaultValue: 5 },
            { name: 'slow', label: 'Slow', defaultValue: 34 },
        ],
        rhsType: 'number',  description: 'Awesome Oscillator', supported: false,
    },
    {
        id: 'dpo',          label: 'DPO',               categoryId: 'oscillators',
        dslName: 'dpo',     params: [{ name: 'period', label: 'Period', defaultValue: 20 }],
        rhsType: 'number',  description: 'Detrended Price Oscillator', supported: false,
    },
    {
        id: 'bop',          label: 'Balance of Power',  categoryId: 'oscillators',
        dslName: 'bop',     params: [],                  rhsType: 'number',
        description: 'Balance of Power', supported: false,
    },
    {
        id: 'chmo',         label: 'Chande Momentum',   categoryId: 'oscillators',
        dslName: 'chmo',    params: [{ name: 'period', label: 'Period', defaultValue: 9 }],
        rhsType: 'number',  description: 'Chande Momentum Oscillator', supported: false,
    },
    {
        id: 'uo',           label: 'Ultimate Oscillator', categoryId: 'oscillators',
        dslName: 'uo',      params: [
            { name: 'p1', label: 'Period 1', defaultValue: 7 },
            { name: 'p2', label: 'Period 2', defaultValue: 14 },
            { name: 'p3', label: 'Period 3', defaultValue: 28 },
        ],
        rhsType: 'number',  description: 'Ultimate Oscillator', supported: false,
    },

    // ── Trend Indicators ──────────────────────────────────────────────────
    {
        id: 'adx',          label: 'ADX',               categoryId: 'trend',
        dslName: 'adx',     params: [{ name: 'period', label: 'Period', defaultValue: 14 }],
        rhsType: 'number',  description: 'Average Directional Index', supported: true,
    },
    {
        id: 'dip',          label: '+DI',               categoryId: 'trend',
        dslName: 'di_plus', params: [{ name: 'period', label: 'Period', defaultValue: 14 }],
        rhsType: 'number_or_indicator', description: 'Positive Directional Indicator', supported: true,
    },
    {
        id: 'dim',          label: '-DI',               categoryId: 'trend',
        dslName: 'di_minus', params: [{ name: 'period', label: 'Period', defaultValue: 14 }],
        rhsType: 'number_or_indicator', description: 'Negative Directional Indicator', supported: true,
    },
    {
        id: 'aroon',        label: 'Aroon',             categoryId: 'trend',
        dslName: 'aroon',   params: [{ name: 'period', label: 'Period', defaultValue: 25 }],
        rhsType: 'number',  description: 'Aroon Indicator', supported: false,
    },
    {
        id: 'aroonosc',     label: 'Aroon Oscillator',  categoryId: 'trend',
        dslName: 'aroonosc', params: [{ name: 'period', label: 'Period', defaultValue: 25 }],
        rhsType: 'number',  description: 'Aroon Oscillator', supported: false,
    },
    {
        id: 'supertrend',   label: 'SuperTrend',        categoryId: 'trend',
        dslName: 'supertrend', params: [
            { name: 'multiplier', label: 'Multiplier', defaultValue: 3, step: 0.5 },
            { name: 'period', label: 'ATR Period', defaultValue: 7 },
        ],
        rhsType: 'number_or_indicator', description: 'SuperTrend Indicator', supported: true,
    },
    {
        id: 'psar',         label: 'Parabolic SAR',     categoryId: 'trend',
        dslName: 'psar',    params: [
            { name: 'step', label: 'Step', defaultValue: 0.02, step: 0.01 },
            { name: 'max', label: 'Max', defaultValue: 0.2, step: 0.05 },
        ],
        rhsType: 'number_or_indicator', description: 'Parabolic SAR', supported: true,
    },
    {
        id: 'trix',         label: 'TRIX',              categoryId: 'trend',
        dslName: 'trix',    params: [
            { name: 'period', label: 'Period', defaultValue: 14 },
            { name: 'signal', label: 'Signal', defaultValue: 8 },
        ],
        rhsType: 'number',  description: 'Triple Exponential Average', supported: false,
    },

    // ── Volatility ────────────────────────────────────────────────────────
    {
        id: 'atr',          label: 'ATR',               categoryId: 'volatility',
        dslName: 'atr',     params: [{ name: 'period', label: 'Period', defaultValue: 14 }],
        rhsType: 'number',  description: 'Average True Range', supported: true,
    },
    {
        id: 'natr',         label: 'NATR',              categoryId: 'volatility',
        dslName: 'natr',    params: [{ name: 'period', label: 'Period', defaultValue: 14 }],
        rhsType: 'number',  description: 'Normalized ATR (%)', supported: true,
    },
    {
        id: 'stddev',       label: 'Std Deviation',     categoryId: 'volatility',
        dslName: 'stddev',  params: [
            { name: 'period', label: 'Period', defaultValue: 20 },
            { name: 'nbDev', label: 'StdDev', defaultValue: 1 },
        ],
        rhsType: 'number',  description: 'Standard Deviation of price', supported: true,
    },
    {
        id: 'hv',           label: 'Historical Vol',    categoryId: 'volatility',
        dslName: 'hv',      params: [{ name: 'period', label: 'Period', defaultValue: 20 }],
        rhsType: 'number',  description: 'Historical Volatility', supported: true,
    },
    {
        id: 'chop',         label: 'Choppiness Index',  categoryId: 'volatility',
        dslName: 'chop',    params: [{ name: 'period', label: 'Period', defaultValue: 14 }],
        rhsType: 'number',  description: 'Choppiness Index', supported: false,
    },

    // ── Volume Indicators ─────────────────────────────────────────────────
    {
        id: 'obv',          label: 'OBV',               categoryId: 'volume',
        dslName: 'obv',     params: [],                  rhsType: 'number_or_indicator',
        description: 'On Balance Volume', supported: true,
    },
    {
        id: 'cmf',          label: 'CMF',               categoryId: 'volume',
        dslName: 'cmf',     params: [{ name: 'period', label: 'Period', defaultValue: 20 }],
        rhsType: 'number',  description: 'Chaikin Money Flow', supported: true,
    },
    {
        id: 'ad',           label: 'A/D Line',          categoryId: 'volume',
        dslName: 'ad',      params: [],                  rhsType: 'number_or_indicator',
        description: 'Accumulation/Distribution Line', supported: false,
    },
    {
        id: 'vpt',          label: 'Volume Price Trend', categoryId: 'volume',
        dslName: 'vpt',     params: [],                  rhsType: 'number_or_indicator',
        description: 'Volume Price Trend', supported: false,
    },
    {
        id: 'mfi',          label: 'MFI',               categoryId: 'volume',
        dslName: 'mfi',     params: [{ name: 'period', label: 'Period', defaultValue: 14 }],
        rhsType: 'number',  description: 'Money Flow Index', supported: true,
    },
    {
        id: 'vr',           label: 'Volume Ratio',      categoryId: 'volume',
        dslName: 'vr',      params: [{ name: 'period', label: 'Period', defaultValue: 21 }],
        rhsType: 'number',  description: 'Volume Ratio', supported: false,
    },
    {
        id: 'vma',          label: 'Volume MA',         categoryId: 'volume',
        dslName: 'vma',     params: [{ name: 'period', label: 'Period', defaultValue: 20 }],
        rhsType: 'number_or_indicator', description: 'Volume Moving Average', supported: true,
    },
    {
        id: 'vo',           label: 'Volume Oscillator', categoryId: 'volume',
        dslName: 'vo',      params: [
            { name: 'fast', label: 'Fast', defaultValue: 7 },
            { name: 'slow', label: 'Slow', defaultValue: 14 },
        ],
        rhsType: 'number',  description: 'Volume Oscillator', supported: false,
    },

    // ── Channels & Bands ─────────────────────────────────────────────────
    {
        id: 'bbub',         label: 'BB Upper Band',     categoryId: 'channels',
        dslName: 'bbub',    params: [
            { name: 'period', label: 'Period', defaultValue: 20 },
            { name: 'stddev', label: 'Std Dev', defaultValue: 2, step: 0.5 },
        ],
        rhsType: 'number_or_indicator', description: 'Bollinger Upper Band', supported: true,
    },
    {
        id: 'bbmb',         label: 'BB Middle Band',    categoryId: 'channels',
        dslName: 'bbmb',    params: [
            { name: 'period', label: 'Period', defaultValue: 20 },
            { name: 'stddev', label: 'Std Dev', defaultValue: 2, step: 0.5 },
        ],
        rhsType: 'number_or_indicator', description: 'Bollinger Middle Band', supported: true,
    },
    {
        id: 'bblb',         label: 'BB Lower Band',     categoryId: 'channels',
        dslName: 'bblb',    params: [
            { name: 'period', label: 'Period', defaultValue: 20 },
            { name: 'stddev', label: 'Std Dev', defaultValue: 2, step: 0.5 },
        ],
        rhsType: 'number_or_indicator', description: 'Bollinger Lower Band', supported: true,
    },
    {
        id: 'bb_pct',       label: 'Bollinger %B',      categoryId: 'channels',
        dslName: 'pb',      params: [
            { name: 'period', label: 'Period', defaultValue: 20 },
            { name: 'stddev', label: 'Std Dev', defaultValue: 2, step: 0.5 },
        ],
        rhsType: 'number',  description: 'Bollinger %B (position within bands)', supported: true,
    },
    {
        id: 'bb_bw',        label: 'BB Width',          categoryId: 'channels',
        dslName: 'bbwidth', params: [
            { name: 'period', label: 'Period', defaultValue: 20 },
            { name: 'stddev', label: 'Std Dev', defaultValue: 2, step: 0.5 },
        ],
        rhsType: 'number',  description: 'Bollinger BandWidth %', supported: true,
    },
    {
        id: 'keltub',       label: 'Keltner Upper',     categoryId: 'channels',
        dslName: 'keltub',  params: [
            { name: 'period', label: 'EMA Period', defaultValue: 20 },
            { name: 'mult', label: 'ATR Mult', defaultValue: 2, step: 0.5 },
            { name: 'atrPeriod', label: 'ATR Period', defaultValue: 10 },
        ],
        rhsType: 'number_or_indicator', description: 'Keltner Channel Upper', supported: true,
    },
    {
        id: 'keltlb',       label: 'Keltner Lower',     categoryId: 'channels',
        dslName: 'keltlb',  params: [
            { name: 'period', label: 'EMA Period', defaultValue: 20 },
            { name: 'mult', label: 'ATR Mult', defaultValue: 2, step: 0.5 },
            { name: 'atrPeriod', label: 'ATR Period', defaultValue: 10 },
        ],
        rhsType: 'number_or_indicator', description: 'Keltner Channel Lower', supported: true,
    },
    {
        id: 'udon',         label: 'Donchian Upper',    categoryId: 'channels',
        dslName: 'udon',    params: [{ name: 'period', label: 'Period', defaultValue: 20 }],
        rhsType: 'number_or_indicator', description: 'Donchian Upper Channel', supported: true,
    },
    {
        id: 'ldon',         label: 'Donchian Lower',    categoryId: 'channels',
        dslName: 'ldon',    params: [{ name: 'period', label: 'Period', defaultValue: 20 }],
        rhsType: 'number_or_indicator', description: 'Donchian Lower Channel', supported: true,
    },

    // ── Ichimoku ──────────────────────────────────────────────────────────
    {
        id: 'tenkan',       label: 'Tenkan (Conversion)', categoryId: 'ichimoku',
        dslName: 'tenkan',  params: [
            { name: 'tenkan', label: 'Tenkan', defaultValue: 9 },
            { name: 'kijun', label: 'Kijun', defaultValue: 26 },
            { name: 'senkou', label: 'Senkou', defaultValue: 52 },
        ],
        rhsType: 'number_or_indicator', description: 'Ichimoku Tenkan-sen', supported: false,
    },
    {
        id: 'kijun',        label: 'Kijun (Base)',       categoryId: 'ichimoku',
        dslName: 'kijun',   params: [
            { name: 'tenkan', label: 'Tenkan', defaultValue: 9 },
            { name: 'kijun', label: 'Kijun', defaultValue: 26 },
            { name: 'senkou', label: 'Senkou', defaultValue: 52 },
        ],
        rhsType: 'number_or_indicator', description: 'Ichimoku Kijun-sen', supported: false,
    },
    {
        id: 'spana',        label: 'Span A',            categoryId: 'ichimoku',
        dslName: 'spana',   params: [
            { name: 'tenkan', label: 'Tenkan', defaultValue: 9 },
            { name: 'kijun', label: 'Kijun', defaultValue: 26 },
            { name: 'senkou', label: 'Senkou', defaultValue: 52 },
        ],
        rhsType: 'number_or_indicator', description: 'Ichimoku Span A', supported: false,
    },
    {
        id: 'spanb',        label: 'Span B',            categoryId: 'ichimoku',
        dslName: 'spanb',   params: [
            { name: 'tenkan', label: 'Tenkan', defaultValue: 9 },
            { name: 'kijun', label: 'Kijun', defaultValue: 26 },
            { name: 'senkou', label: 'Senkou', defaultValue: 52 },
        ],
        rhsType: 'number_or_indicator', description: 'Ichimoku Span B', supported: false,
    },

    // ── Pivot Points ──────────────────────────────────────────────────────
    {
        id: 'pp',           label: 'Pivot Point',       categoryId: 'pivot',
        dslName: 'pp',      params: [],                  rhsType: 'number_or_indicator',
        description: 'Standard Pivot Point', supported: false,
    },
    {
        id: 'ps1',          label: 'Pivot S1',          categoryId: 'pivot',
        dslName: 'ps1',     params: [],                  rhsType: 'number_or_indicator',
        description: 'Pivot Support 1', supported: false,
    },
    {
        id: 'pr1',          label: 'Pivot R1',          categoryId: 'pivot',
        dslName: 'pr1',     params: [],                  rhsType: 'number_or_indicator',
        description: 'Pivot Resistance 1', supported: false,
    },
    {
        id: 'ps2',          label: 'Pivot S2',          categoryId: 'pivot',
        dslName: 'ps2',     params: [],                  rhsType: 'number_or_indicator',
        description: 'Pivot Support 2', supported: false,
    },
    {
        id: 'pr2',          label: 'Pivot R2',          categoryId: 'pivot',
        dslName: 'pr2',     params: [],                  rhsType: 'number_or_indicator',
        description: 'Pivot Resistance 2', supported: false,
    },

    // ── Relative Strength ─────────────────────────────────────────────────
    {
        id: 'rs5',          label: 'RS 1-Week',         categoryId: 'relstrength',
        dslName: 'rs5',     params: [],                  rhsType: 'number',
        description: '1-Week Relative Strength', supported: false,
    },
    {
        id: 'rs21',         label: 'RS 1-Month',        categoryId: 'relstrength',
        dslName: 'rs21',    params: [],                  rhsType: 'number',
        description: '1-Month Relative Strength', supported: false,
    },
    {
        id: 'rs63',         label: 'RS 3-Month',        categoryId: 'relstrength',
        dslName: 'rs63',    params: [],                  rhsType: 'number',
        description: '3-Month Relative Strength', supported: false,
    },
    {
        id: 'rs126',        label: 'RS 6-Month',        categoryId: 'relstrength',
        dslName: 'rs126',   params: [],                  rhsType: 'number',
        description: '6-Month Relative Strength', supported: false,
    },
    {
        id: 'rs252',        label: 'RS 1-Year',         categoryId: 'relstrength',
        dslName: 'rs252',   params: [],                  rhsType: 'number',
        description: '1-Year Relative Strength', supported: false,
    },

    // ── Price Action (Candlestick helpers) ────────────────────────────────
    {
        id: 'tprice',       label: 'Typical Price',     categoryId: 'price_action',
        dslName: 'tprice',  params: [],                  rhsType: 'number_or_indicator',
        description: '(H+L+C)/3', supported: true,
    },
    {
        id: 'mprice',       label: 'Median Price',      categoryId: 'price_action',
        dslName: 'mprice',  params: [],                  rhsType: 'number_or_indicator',
        description: '(H+L)/2', supported: true,
    },
    {
        id: 'wick',         label: 'Upper Wick',        categoryId: 'price_action',
        dslName: 'wick',    params: [{ name: 'shift', label: 'Bar Shift', defaultValue: 0 }],
        rhsType: 'number',  description: 'Size of upper shadow', supported: false,
    },
    {
        id: 'tail',         label: 'Lower Tail',        categoryId: 'price_action',
        dslName: 'tail',    params: [{ name: 'shift', label: 'Bar Shift', defaultValue: 0 }],
        rhsType: 'number',  description: 'Size of lower shadow', supported: false,
    },
    {
        id: 'body',         label: 'Candle Body',       categoryId: 'price_action',
        dslName: 'body',    params: [{ name: 'shift', label: 'Bar Shift', defaultValue: 0 }],
        rhsType: 'number',  description: 'Real body size', supported: false,
    },

    // ── Fundamental Data ─────────────────────────────────────────────────
    {
        id: 'mcap',         label: 'Market Cap (₹ Cr)', categoryId: 'fundamental',
        dslName: 'mcap',    params: [],                  rhsType: 'number',
        description: 'Market Capitalisation in ₹ Crores', supported: true,
    },
    {
        id: 'pe',           label: 'P/E (TTM)',         categoryId: 'fundamental',
        dslName: 'pe',      params: [],                  rhsType: 'number',
        description: 'Price-to-Earnings (TTM)', supported: true,
    },
    {
        id: 'pb',           label: 'P/B',               categoryId: 'fundamental',
        dslName: 'pb',      params: [],                  rhsType: 'number',
        description: 'Price-to-Book Ratio', supported: true,
    },
    {
        id: 'ev_ebitda',    label: 'EV/EBITDA',         categoryId: 'fundamental',
        dslName: 'ev_ebitda', params: [],                 rhsType: 'number',
        description: 'Enterprise Value to EBITDA', supported: true,
    },
    {
        id: 'div_yield',    label: 'Dividend Yield %',  categoryId: 'fundamental',
        dslName: 'dvd_yield', params: [],                  rhsType: 'number',
        description: 'Dividend Yield %', supported: true,
    },
    {
        id: 'eps_ttm',      label: 'EPS (TTM)',         categoryId: 'fundamental',
        dslName: 'eps',     params: [],                  rhsType: 'number',
        description: 'Earnings Per Share (TTM)', supported: true,
    },
    {
        id: 'ebitda_ttm',   label: 'EBITDA (₹ Cr)',    categoryId: 'fundamental',
        dslName: 'ebitda',  params: [],                  rhsType: 'number',
        description: 'EBITDA (TTM, ₹ Crores)', supported: true,
    },
    {
        id: 'pat_margin',   label: 'PAT Margin %',      categoryId: 'fundamental',
        dslName: 'pat_margin', params: [],                rhsType: 'number',
        description: 'Net Profit Margin %', supported: true,
    },
    {
        id: 'op_margin',    label: 'Operating Margin %', categoryId: 'fundamental',
        dslName: 'op_margin', params: [],                 rhsType: 'number',
        description: 'Operating (EBIT) Margin %', supported: true,
    },
    {
        id: 'gross_margin', label: 'Gross Margin %',    categoryId: 'fundamental',
        dslName: 'gross_margin', params: [],              rhsType: 'number',
        description: 'Gross Profit Margin % (from MSI ratios)', supported: true,
    },

    // ── Financial Health ──────────────────────────────────────────────────
    {
        id: 'de',           label: 'Debt / Equity',     categoryId: 'financial_health',
        dslName: 'debt_equity', params: [],              rhsType: 'number',
        description: 'Total Debt to Equity Ratio', supported: true,
    },
    {
        id: 'ic',           label: 'Interest Coverage', categoryId: 'financial_health',
        dslName: 'interest_coverage', params: [],         rhsType: 'number',
        description: 'EBIT / Interest Expense', supported: true,
    },
    {
        id: 'current_ratio', label: 'Current Ratio',   categoryId: 'financial_health',
        dslName: 'current_ratio', params: [],            rhsType: 'number',
        description: 'Current Assets / Current Liabilities', supported: true,
    },
    {
        id: 'quick_ratio',  label: 'Quick Ratio',       categoryId: 'financial_health',
        dslName: 'quick_ratio', params: [],              rhsType: 'number',
        description: '(Current Assets − Inventory) / Current Liabilities', supported: true,
    },
    {
        id: 'altman_z',     label: 'Altman Z-Score',    categoryId: 'financial_health',
        dslName: 'altman_z_score', params: [],            rhsType: 'number',
        description: 'Altman Z-Score (>3 safe, <1.8 distress)', supported: true,
    },
    {
        id: 'beneish_m',    label: 'Beneish M-Score',   categoryId: 'financial_health',
        dslName: 'beneish_m_score', params: [],           rhsType: 'number',
        description: 'Earnings manipulation indicator (<-2.22 = low risk)', supported: true,
    },
    {
        id: 'promoter_pct', label: 'Promoter Holding %', categoryId: 'financial_health',
        dslName: 'promoter_pct', params: [],              rhsType: 'number',
        description: 'Promoter shareholding percentage', supported: true,
    },
    {
        id: 'pledged_pct',  label: 'Pledged Shares %',  categoryId: 'financial_health',
        dslName: 'pledged_pct', params: [],               rhsType: 'number',
        description: 'Promoter pledged shares as % of total shares', supported: true,
    },

    // ── Growth ────────────────────────────────────────────────────────────
    {
        id: 'rev_g1y',      label: 'Revenue Growth 1Y %', categoryId: 'growth',
        dslName: 'rev_g1y', params: [],                  rhsType: 'number',
        description: '1-Year Revenue Growth (YoY)', supported: true,
    },
    {
        id: 'rev_g3y',      label: 'Revenue Growth 3Y %', categoryId: 'growth',
        dslName: 'rev_g3y', params: [],                  rhsType: 'number',
        description: '3-Year Revenue CAGR', supported: true,
    },
    {
        id: 'pat_g1y',      label: 'PAT Growth 1Y %',   categoryId: 'growth',
        dslName: 'pat_g1y', params: [],                  rhsType: 'number',
        description: '1-Year Net Profit Growth (YoY)', supported: true,
    },
    {
        id: 'pat_g3y',      label: 'PAT Growth 3Y %',   categoryId: 'growth',
        dslName: 'pat_g3y', params: [],                  rhsType: 'number',
        description: '3-Year Net Profit CAGR', supported: true,
    },
    {
        id: 'eps_g1y',      label: 'EPS Growth 1Y %',   categoryId: 'growth',
        dslName: 'eps_g1y', params: [],                  rhsType: 'number',
        description: '1-Year EPS Growth (YoY)', supported: true,
    },
    {
        id: 'fcf',          label: 'Free Cash Flow (₹ Cr)', categoryId: 'growth',
        dslName: 'fcf',     params: [],                  rhsType: 'number',
        description: 'Free Cash Flow (Operating CF − Capex)', supported: true,
    },

    // ── Valuation ─────────────────────────────────────────────────────────
    {
        id: 'roce',         label: 'ROCE %',            categoryId: 'valuation',
        dslName: 'roce',    params: [],                  rhsType: 'number',
        description: 'Return on Capital Employed %', supported: true,
    },
    {
        id: 'roe',          label: 'ROE %',             categoryId: 'valuation',
        dslName: 'roe',     params: [],                  rhsType: 'number',
        description: 'Return on Equity %', supported: true,
    },
    {
        id: 'book_value',   label: 'Book Value/Share',  categoryId: 'valuation',
        dslName: 'book_value', params: [],               rhsType: 'number',
        description: 'Book Value per Share (₹)', supported: true,
    },

    // ── Quality & Rank ────────────────────────────────────────────────────
    {
        id: 'quality_score', label: 'Quality Score',   categoryId: 'quality',
        dslName: 'quality',  params: [],                 rhsType: 'number',
        description: 'Composite Quality Score (0-100)', supported: true,
    },
    {
        id: 'piotroski',    label: 'Piotroski F-Score', categoryId: 'quality',
        dslName: 'piotroski_f_score', params: [],         rhsType: 'number',
        description: 'Piotroski F-Score (0-9, higher = stronger)', supported: true,
    },

    // ── Factor Exposure (IIMA Carhart 4-Factor) ───────────────────────────
    {
        id: 'ff_beta',      label: 'Market Beta (β)',    categoryId: 'factor',
        dslName: 'ff_beta', params: [],                   rhsType: 'number',
        description: 'Carhart market beta from IIMA OLS regression', supported: false,
    },
    {
        id: 'ff_smb',       label: 'Size Loading (SMB)', categoryId: 'factor',
        dslName: 'ff_smb',  params: [],                   rhsType: 'number',
        description: 'Small-minus-big factor loading', supported: false,
    },
    {
        id: 'ff_hml',       label: 'Value Loading (HML)', categoryId: 'factor',
        dslName: 'ff_hml',  params: [],                    rhsType: 'number',
        description: 'High-minus-low (value) factor loading', supported: false,
    },
    {
        id: 'ff_wml',       label: 'Momentum Loading (WML)', categoryId: 'factor',
        dslName: 'ff_wml',  params: [],                       rhsType: 'number',
        description: 'Winners-minus-losers (momentum) factor loading', supported: false,
    },
    {
        id: 'ff_alpha',     label: 'Alpha (α)',           categoryId: 'factor',
        dslName: 'ff_alpha', params: [],                   rhsType: 'number',
        description: 'Daily abnormal return unexplained by factors', supported: false,
    },
    {
        id: 'ff_r2',        label: 'Factor R²',           categoryId: 'factor',
        dslName: 'ff_r2',   params: [],                    rhsType: 'number',
        description: 'Model R-squared: how much return variance factors explain', supported: false,
    },
];

// ─── Operators ─────────────────────────────────────────────────────────────

export type OperatorValueConfig =
    | { type: 'none' }
    | { type: 'number'; label: string }
    | { type: 'two_numbers'; label1: string; label2: string }
    | { type: 'days'; label: string }
    | { type: 'indicator' };

export interface OperatorDef {
    id: string;
    label: string;
    dslOp: string;
    /** Description shown in criteria list */
    verb: string;
    valueConfig: OperatorValueConfig;
    /** If true, RHS can be an indicator expression (not just a number) */
    rhsCanBeIndicator: boolean;
    /** Events that only make sense for technical series (not fundamentals) */
    technicalOnly: boolean;
}

export const OPERATORS: OperatorDef[] = [
    // Comparison
    { id: 'gt',       label: 'Is Greater Than',   dslOp: '>',        verb: 'is greater than',   valueConfig: { type: 'number', label: 'Value' },           rhsCanBeIndicator: true,  technicalOnly: false },
    { id: 'lt',       label: 'Is Less Than',      dslOp: '<',        verb: 'is less than',      valueConfig: { type: 'number', label: 'Value' },           rhsCanBeIndicator: true,  technicalOnly: false },
    { id: 'gte',      label: 'Is Greater or Equal', dslOp: '>=',     verb: '>=',                valueConfig: { type: 'number', label: 'Value' },           rhsCanBeIndicator: true,  technicalOnly: false },
    { id: 'lte',      label: 'Is Less or Equal',  dslOp: '<=',       verb: '<=',                valueConfig: { type: 'number', label: 'Value' },           rhsCanBeIndicator: true,  technicalOnly: false },
    { id: 'between',  label: 'Is Between',        dslOp: 'between',  verb: 'is between',        valueConfig: { type: 'two_numbers', label1: 'Min', label2: 'Max' }, rhsCanBeIndicator: false, technicalOnly: false },

    // Crossovers (technical only)
    { id: 'ca',       label: 'Crossed Above',     dslOp: 'ca',       verb: 'crossed above',     valueConfig: { type: 'number', label: 'Value or Indicator' }, rhsCanBeIndicator: true, technicalOnly: true },
    { id: 'cb',       label: 'Crossed Below',     dslOp: 'cb',       verb: 'crossed below',     valueConfig: { type: 'number', label: 'Value or Indicator' }, rhsCanBeIndicator: true, technicalOnly: true },

    // Touch events (technical only)
    { id: 'tocha',    label: 'Touched Above',     dslOp: 'tocha',    verb: 'touched above',     valueConfig: { type: 'number', label: 'Value or Indicator' }, rhsCanBeIndicator: true, technicalOnly: true },
    { id: 'tochb',    label: 'Touched Below',     dslOp: 'tochb',    verb: 'touched below',     valueConfig: { type: 'number', label: 'Value or Indicator' }, rhsCanBeIndicator: true, technicalOnly: true },

    // Bounce events (technical only)
    { id: 'bon_up',   label: 'Bounced Up From',   dslOp: 'bon_up',   verb: 'bounced up from',   valueConfig: { type: 'number', label: 'Value or Indicator' }, rhsCanBeIndicator: true, technicalOnly: true },
    { id: 'bon_dn',   label: 'Bounced Down From', dslOp: 'bon_dn',   verb: 'bounced down from', valueConfig: { type: 'number', label: 'Value or Indicator' }, rhsCanBeIndicator: true, technicalOnly: true },

    // Trend (technical only)
    { id: 'trend_up', label: 'Trending Up',       dslOp: 'trend_up', verb: 'trending up over',  valueConfig: { type: 'days', label: 'Days' },               rhsCanBeIndicator: false, technicalOnly: true },
    { id: 'trend_dn', label: 'Trending Down',     dslOp: 'trend_dn', verb: 'trending down over', valueConfig: { type: 'days', label: 'Days' },              rhsCanBeIndicator: false, technicalOnly: true },

    // New high/low (technical only)
    { id: 'new_high', label: 'New High Over',     dslOp: 'new_high', verb: 'new high over',     valueConfig: { type: 'days', label: 'Days' },               rhsCanBeIndicator: false, technicalOnly: true },
    { id: 'new_low',  label: 'New Low Over',      dslOp: 'new_low',  verb: 'new low over',      valueConfig: { type: 'days', label: 'Days' },               rhsCanBeIndicator: false, technicalOnly: true },

    // Universe match (for enum indicators)
    { id: 'eq',       label: 'Is',               dslOp: 'eq',       verb: 'is',                valueConfig: { type: 'number', label: 'Value' },           rhsCanBeIndicator: false, technicalOnly: false },
];

// ─── Universe DSL names that emit function-call syntax ──────────────────────
const UNIVERSE_DSL_NAMES = new Set(['index', 'sector', 'caps', 'type']);

// ─── DSL Helpers ────────────────────────────────────────────────────────────

/**
 * Build the DSL expression string for an indicator with its current params.
 * e.g. dslExpr(INDICATORS.find(i=>i.id==='ema'), [50]) → "ema(50)"
 *      dslExpr(INDICATORS.find(i=>i.id==='price'), []) → "price"
 */
export function dslExpr(ind: IndicatorDef, paramValues: (number | string)[]): string {
    if (paramValues.length === 0) return ind.dslName;
    const args = paramValues.map((v, i) => {
        const p = ind.params[i];
        return p ? String(v ?? p.defaultValue) : String(v);
    });
    return `${ind.dslName}(${args.join(',')})`;
}

/**
 * Build a full DSL criterion string.
 * Universe enum indicators emit function-call syntax: index("nifty50")
 * Normal numeric indicators: rsi(14) > 70
 */
export function buildDslCriterion(
    lhsExpr: string,
    op: OperatorDef,
    rhsExpr: string,
    value2?: number,
    lhsInd?: IndicatorDef,
): string {
    // Universe filters use DSL function syntax: index("nifty50"), sector("IT")
    if (lhsInd && lhsInd.rhsType === 'enum' && UNIVERSE_DSL_NAMES.has(lhsInd.dslName)) {
        return `${lhsInd.dslName}("${rhsExpr}")`;
    }
    if (op.id === 'between') {
        return `${lhsExpr} >= ${rhsExpr} AND ${lhsExpr} <= ${value2}`;
    }
    return `${lhsExpr} ${op.dslOp} ${rhsExpr}`;
}

// Lookup helpers
export const indicatorById = (id: string) => INDICATORS.find(i => i.id === id);
export const operatorById  = (id: string) => OPERATORS.find(o => o.id === id);
export const categoryById  = (id: string) => INDICATOR_CATEGORIES.find(c => c.id === id);
