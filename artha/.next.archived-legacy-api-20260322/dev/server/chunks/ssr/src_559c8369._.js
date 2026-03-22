module.exports = [
"[project]/src/lib/screener/indicators.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Screener Indicator Taxonomy
 * Defines all supported technical/fundamental indicators, their categories,
 * default parameters, DSL names, and display metadata.
 */ // ─── Param definition ──────────────────────────────────────────────────────
__turbopack_context__.s([
    "INDICATORS",
    ()=>INDICATORS,
    "INDICATOR_CATEGORIES",
    ()=>INDICATOR_CATEGORIES,
    "OPERATORS",
    ()=>OPERATORS,
    "buildDslCriterion",
    ()=>buildDslCriterion,
    "categoryById",
    ()=>categoryById,
    "dslExpr",
    ()=>dslExpr,
    "indicatorById",
    ()=>indicatorById,
    "operatorById",
    ()=>operatorById
]);
const INDICATOR_CATEGORIES = [
    {
        id: 'universe',
        label: 'Universe'
    },
    {
        id: 'price',
        label: 'Price / Volume'
    },
    {
        id: 'ma',
        label: 'Moving Averages'
    },
    {
        id: 'oscillators',
        label: 'Oscillators'
    },
    {
        id: 'trend',
        label: 'Trend Indicators'
    },
    {
        id: 'volatility',
        label: 'Volatility'
    },
    {
        id: 'volume',
        label: 'Volume Indicators'
    },
    {
        id: 'momentum',
        label: 'Momentum'
    },
    {
        id: 'channels',
        label: 'Channels & Bands'
    },
    {
        id: 'ichimoku',
        label: 'Ichimoku'
    },
    {
        id: 'pivot',
        label: 'Pivot Points'
    },
    {
        id: 'relstrength',
        label: 'Relative Strength'
    },
    {
        id: 'price_action',
        label: 'Price Action'
    },
    {
        id: 'fundamental',
        label: 'Fundamental Data'
    },
    {
        id: 'financial_health',
        label: 'Financial Health'
    },
    {
        id: 'growth',
        label: 'Growth'
    },
    {
        id: 'valuation',
        label: 'Valuation'
    },
    {
        id: 'quality',
        label: 'Quality & Rank'
    },
    {
        id: 'factor',
        label: 'Factor Exposure'
    },
    {
        id: 'math',
        label: 'Math Operations'
    }
];
const INDICATORS = [
    // ── Universe ──────────────────────────────────────────────────────────
    {
        id: 'uni_mcap_bucket',
        label: 'Market Cap Bucket',
        categoryId: 'universe',
        dslName: 'caps',
        params: [],
        rhsType: 'enum',
        supported: true,
        enumOptions: [
            {
                value: 'large',
                label: 'Large Cap  (>₹20,000 Cr)'
            },
            {
                value: 'mid',
                label: 'Mid Cap    (₹5,000–20,000 Cr)'
            },
            {
                value: 'small',
                label: 'Small Cap  (₹500–5,000 Cr)'
            },
            {
                value: 'micro',
                label: 'Micro Cap  (<₹500 Cr)'
            }
        ],
        description: 'Filter by market cap bucket'
    },
    {
        id: 'uni_sector',
        label: 'Sector',
        categoryId: 'universe',
        dslName: 'sector',
        params: [],
        rhsType: 'enum',
        supported: true,
        enumOptions: [],
        description: 'Filter by industry sector'
    },
    {
        id: 'uni_index',
        label: 'Index Membership',
        categoryId: 'universe',
        dslName: 'index',
        params: [],
        rhsType: 'enum',
        supported: true,
        enumOptions: [
            {
                value: 'nifty50',
                label: 'Nifty 50'
            },
            {
                value: 'next50',
                label: 'Nifty Next 50'
            },
            {
                value: 'nifty100',
                label: 'Nifty 100'
            },
            {
                value: 'nifty200',
                label: 'Nifty 200'
            },
            {
                value: 'nifty500',
                label: 'Nifty 500'
            },
            {
                value: 'niftybank',
                label: 'Nifty Bank'
            },
            {
                value: 'midcap150',
                label: 'Nifty Midcap 150'
            },
            {
                value: 'smallcap250',
                label: 'Nifty Smallcap 250'
            },
            {
                value: 'sensex',
                label: 'BSE Sensex'
            }
        ],
        description: 'Filter by index membership (nifty50, nifty200, sensex, etc.)'
    },
    {
        id: 'uni_instrument_type',
        label: 'Instrument Type',
        categoryId: 'universe',
        dslName: 'type',
        params: [],
        rhsType: 'enum',
        supported: true,
        enumOptions: [
            {
                value: 'equity',
                label: 'Equity'
            },
            {
                value: 'etf',
                label: 'ETF'
            },
            {
                value: 'reit',
                label: 'REIT'
            },
            {
                value: 'invit',
                label: 'InvIT'
            }
        ],
        description: 'Filter by instrument type'
    },
    // ── Math Operations ───────────────────────────────────────────────────
    {
        id: 'abs',
        label: 'Absolute Value',
        categoryId: 'math',
        dslName: 'abs',
        params: [
            {
                name: 'expr',
                label: 'Expression',
                defaultValue: 'close'
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Absolute Value',
        supported: true
    },
    {
        id: 'max',
        label: 'Maximum',
        categoryId: 'math',
        dslName: 'max',
        params: [
            {
                name: 'expr1',
                label: 'Expr 1',
                defaultValue: 'close'
            },
            {
                name: 'expr2',
                label: 'Expr 2',
                defaultValue: 'open'
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Maximum of two values',
        supported: true
    },
    {
        id: 'min',
        label: 'Minimum',
        categoryId: 'math',
        dslName: 'min',
        params: [
            {
                name: 'expr1',
                label: 'Expr 1',
                defaultValue: 'close'
            },
            {
                name: 'expr2',
                label: 'Expr 2',
                defaultValue: 'open'
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Minimum of two values',
        supported: true
    },
    {
        id: 'bracket',
        label: 'Bracket',
        categoryId: 'math',
        dslName: 'bracket',
        params: [
            {
                name: 'expr',
                label: 'Expression',
                defaultValue: 'close'
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Group operations with brackets',
        supported: true
    },
    // ── Price / Volume ────────────────────────────────────────────────────
    {
        id: 'price',
        label: 'Close',
        categoryId: 'price',
        dslName: 'price',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Current close price',
        supported: true
    },
    {
        id: 'open',
        label: 'Open',
        categoryId: 'price',
        dslName: 'open',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Open price',
        supported: false
    },
    {
        id: 'high',
        label: 'High',
        categoryId: 'price',
        dslName: 'high',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'High price',
        supported: false
    },
    {
        id: 'low',
        label: 'Low',
        categoryId: 'price',
        dslName: 'low',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Low price',
        supported: false
    },
    {
        id: 'volume',
        label: 'Volume',
        categoryId: 'price',
        dslName: 'v',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Current volume',
        supported: true
    },
    {
        id: 'cvol',
        label: 'Current Volume (M)',
        categoryId: 'price',
        dslName: 'cvol',
        params: [],
        rhsType: 'number',
        description: 'Current volume in millions',
        supported: false
    },
    {
        id: 'avol',
        label: 'Avg Volume',
        categoryId: 'price',
        dslName: 'avol',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 21
            }
        ],
        rhsType: 'number',
        description: 'Average volume (millions)',
        supported: false
    },
    {
        id: 'rvol',
        label: 'Relative Volume',
        categoryId: 'price',
        dslName: 'rvol',
        params: [],
        rhsType: 'number',
        description: 'Current volume / 21-day avg volume',
        supported: false
    },
    {
        id: 'volch',
        label: 'Volume % Change',
        categoryId: 'price',
        dslName: 'volch',
        params: [],
        rhsType: 'number',
        description: 'Volume % change vs previous day',
        supported: false
    },
    {
        id: 'pct52wHigh',
        label: '% from 52w High',
        categoryId: 'price',
        dslName: 'offh',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 252
            }
        ],
        rhsType: 'number',
        description: '% below 52-week high',
        supported: true
    },
    {
        id: 'pct52wLow',
        label: '% from 52w Low',
        categoryId: 'price',
        dslName: 'offl',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 252
            }
        ],
        rhsType: 'number',
        description: '% above 52-week low',
        supported: true
    },
    {
        id: 'highest',
        label: 'Highest Price',
        categoryId: 'price',
        dslName: 'highest',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 52
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Highest close over N bars',
        supported: false
    },
    {
        id: 'lowest',
        label: 'Lowest Price',
        categoryId: 'price',
        dslName: 'lowest',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 52
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Lowest close over N bars',
        supported: false
    },
    {
        id: 'change_pct',
        label: 'Price % Change',
        categoryId: 'price',
        dslName: 'change',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 1
            }
        ],
        rhsType: 'number',
        description: 'Price % change over N days',
        supported: true
    },
    {
        id: 'gapup',
        label: 'Gap Up %',
        categoryId: 'price',
        dslName: 'gapup',
        params: [],
        rhsType: 'number',
        description: 'Gap up % from previous close',
        supported: false
    },
    {
        id: 'gapdn',
        label: 'Gap Down %',
        categoryId: 'price',
        dslName: 'gapdn',
        params: [],
        rhsType: 'number',
        description: 'Gap down % from previous close',
        supported: false
    },
    // ── Moving Averages ───────────────────────────────────────────────────
    {
        id: 'sma',
        label: 'SMA',
        categoryId: 'ma',
        dslName: 'sma',
        params: [
            {
                name: 'expr',
                label: 'Expression',
                defaultValue: 'close'
            },
            {
                name: 'period',
                label: 'Period',
                defaultValue: 50,
                min: 2,
                max: 500
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Simple Moving Average',
        supported: true
    },
    {
        id: 'ema',
        label: 'EMA',
        categoryId: 'ma',
        dslName: 'ema',
        params: [
            {
                name: 'expr',
                label: 'Expression',
                defaultValue: 'close'
            },
            {
                name: 'period',
                label: 'Period',
                defaultValue: 50,
                min: 2,
                max: 500
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Exponential Moving Average',
        supported: false
    },
    {
        id: 'wma',
        label: 'WMA',
        categoryId: 'ma',
        dslName: 'wma',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 50,
                min: 2,
                max: 500
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Weighted Moving Average',
        supported: false
    },
    {
        id: 'dema',
        label: 'DEMA',
        categoryId: 'ma',
        dslName: 'dema',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 50
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Double EMA',
        supported: false
    },
    {
        id: 'tema',
        label: 'TEMA',
        categoryId: 'ma',
        dslName: 'tema',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 50
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Triple EMA',
        supported: false
    },
    {
        id: 'hma',
        label: 'HMA',
        categoryId: 'ma',
        dslName: 'hma',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 50
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Hull Moving Average',
        supported: false
    },
    {
        id: 'kama',
        label: 'KAMA',
        categoryId: 'ma',
        dslName: 'kama',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 30
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Kaufman Adaptive MA',
        supported: false
    },
    {
        id: 'vwma',
        label: 'VWMA',
        categoryId: 'ma',
        dslName: 'vwma',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 50
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Volume Weighted MA',
        supported: false
    },
    {
        id: 'wild',
        label: 'Wilder MA',
        categoryId: 'ma',
        dslName: 'wild',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 21
            }
        ],
        rhsType: 'number_or_indicator',
        description: "Wilder's Moving Average",
        supported: false
    },
    // ── Oscillators ───────────────────────────────────────────────────────
    {
        id: 'rsi',
        label: 'RSI',
        categoryId: 'oscillators',
        dslName: 'rsi',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14,
                min: 2,
                max: 100
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Relative Strength Index',
        supported: true
    },
    {
        id: 'macd',
        label: 'MACD',
        categoryId: 'oscillators',
        dslName: 'macd',
        params: [
            {
                name: 'fast',
                label: 'Fast',
                defaultValue: 12
            },
            {
                name: 'slow',
                label: 'Slow',
                defaultValue: 26
            },
            {
                name: 'signal',
                label: 'Signal',
                defaultValue: 9
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'MACD line',
        supported: false
    },
    {
        id: 'macds',
        label: 'MACD Signal',
        categoryId: 'oscillators',
        dslName: 'macds',
        params: [
            {
                name: 'fast',
                label: 'Fast',
                defaultValue: 12
            },
            {
                name: 'slow',
                label: 'Slow',
                defaultValue: 26
            },
            {
                name: 'signal',
                label: 'Signal',
                defaultValue: 9
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'MACD Signal line',
        supported: false
    },
    {
        id: 'macdh',
        label: 'MACD Histogram',
        categoryId: 'oscillators',
        dslName: 'macdh',
        params: [
            {
                name: 'fast',
                label: 'Fast',
                defaultValue: 12
            },
            {
                name: 'slow',
                label: 'Slow',
                defaultValue: 26
            },
            {
                name: 'signal',
                label: 'Signal',
                defaultValue: 9
            }
        ],
        rhsType: 'number',
        description: 'MACD Histogram',
        supported: false
    },
    {
        id: 'stoch',
        label: 'Stochastic %K',
        categoryId: 'oscillators',
        dslName: 'slowk',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            },
            {
                name: 'slowK',
                label: 'Slow %K',
                defaultValue: 3
            },
            {
                name: 'slowD',
                label: 'Slow %D',
                defaultValue: 3
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Stochastic %K line',
        supported: false
    },
    {
        id: 'stochd',
        label: 'Stochastic %D',
        categoryId: 'oscillators',
        dslName: 'slowd',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            },
            {
                name: 'slowK',
                label: 'Slow %K',
                defaultValue: 3
            },
            {
                name: 'slowD',
                label: 'Slow %D',
                defaultValue: 3
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Stochastic %D line',
        supported: false
    },
    {
        id: 'stochrsi',
        label: 'Stoch RSI',
        categoryId: 'oscillators',
        dslName: 'stochrsi',
        params: [
            {
                name: 'rsiPeriod',
                label: 'RSI Period',
                defaultValue: 14
            },
            {
                name: 'stochPeriod',
                label: 'Stoch Period',
                defaultValue: 14
            },
            {
                name: 'slowK',
                label: 'Slow %K',
                defaultValue: 3
            },
            {
                name: 'slowD',
                label: 'Slow %D',
                defaultValue: 3
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Stochastic RSI',
        supported: false
    },
    {
        id: 'cci',
        label: 'CCI',
        categoryId: 'oscillators',
        dslName: 'cci',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            }
        ],
        rhsType: 'number',
        description: 'Commodity Channel Index',
        supported: false
    },
    {
        id: 'wpr',
        label: 'Williams %R',
        categoryId: 'oscillators',
        dslName: 'willr',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            }
        ],
        rhsType: 'number',
        description: "Williams' Percent Range",
        supported: false
    },
    {
        id: 'mom',
        label: 'Momentum',
        categoryId: 'oscillators',
        dslName: 'mom',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 12
            }
        ],
        rhsType: 'number',
        description: 'Price Momentum',
        supported: false
    },
    {
        id: 'roc',
        label: 'ROC',
        categoryId: 'oscillators',
        dslName: 'roc',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 10
            }
        ],
        rhsType: 'number',
        description: 'Rate of Change',
        supported: false
    },
    {
        id: 'ao',
        label: 'Awesome Oscillator',
        categoryId: 'oscillators',
        dslName: 'ao',
        params: [
            {
                name: 'fast',
                label: 'Fast',
                defaultValue: 5
            },
            {
                name: 'slow',
                label: 'Slow',
                defaultValue: 34
            }
        ],
        rhsType: 'number',
        description: 'Awesome Oscillator',
        supported: false
    },
    {
        id: 'dpo',
        label: 'DPO',
        categoryId: 'oscillators',
        dslName: 'dpo',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            }
        ],
        rhsType: 'number',
        description: 'Detrended Price Oscillator',
        supported: false
    },
    {
        id: 'bop',
        label: 'Balance of Power',
        categoryId: 'oscillators',
        dslName: 'bop',
        params: [],
        rhsType: 'number',
        description: 'Balance of Power',
        supported: false
    },
    {
        id: 'chmo',
        label: 'Chande Momentum',
        categoryId: 'oscillators',
        dslName: 'chmo',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 9
            }
        ],
        rhsType: 'number',
        description: 'Chande Momentum Oscillator',
        supported: false
    },
    {
        id: 'uo',
        label: 'Ultimate Oscillator',
        categoryId: 'oscillators',
        dslName: 'uo',
        params: [
            {
                name: 'p1',
                label: 'Period 1',
                defaultValue: 7
            },
            {
                name: 'p2',
                label: 'Period 2',
                defaultValue: 14
            },
            {
                name: 'p3',
                label: 'Period 3',
                defaultValue: 28
            }
        ],
        rhsType: 'number',
        description: 'Ultimate Oscillator',
        supported: false
    },
    // ── Trend Indicators ──────────────────────────────────────────────────
    {
        id: 'adx',
        label: 'ADX',
        categoryId: 'trend',
        dslName: 'adx',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            }
        ],
        rhsType: 'number',
        description: 'Average Directional Index',
        supported: false
    },
    {
        id: 'dip',
        label: '+DI',
        categoryId: 'trend',
        dslName: 'di_plus',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Positive Directional Indicator',
        supported: false
    },
    {
        id: 'dim',
        label: '-DI',
        categoryId: 'trend',
        dslName: 'di_minus',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Negative Directional Indicator',
        supported: false
    },
    {
        id: 'aroon',
        label: 'Aroon',
        categoryId: 'trend',
        dslName: 'aroon',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 25
            }
        ],
        rhsType: 'number',
        description: 'Aroon Indicator',
        supported: false
    },
    {
        id: 'aroonosc',
        label: 'Aroon Oscillator',
        categoryId: 'trend',
        dslName: 'aroonosc',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 25
            }
        ],
        rhsType: 'number',
        description: 'Aroon Oscillator',
        supported: false
    },
    {
        id: 'supertrend',
        label: 'SuperTrend',
        categoryId: 'trend',
        dslName: 'supertrend',
        params: [
            {
                name: 'multiplier',
                label: 'Multiplier',
                defaultValue: 3,
                step: 0.5
            },
            {
                name: 'period',
                label: 'ATR Period',
                defaultValue: 7
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'SuperTrend Indicator',
        supported: false
    },
    {
        id: 'psar',
        label: 'Parabolic SAR',
        categoryId: 'trend',
        dslName: 'psar',
        params: [
            {
                name: 'step',
                label: 'Step',
                defaultValue: 0.02,
                step: 0.01
            },
            {
                name: 'max',
                label: 'Max',
                defaultValue: 0.2,
                step: 0.05
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Parabolic SAR',
        supported: false
    },
    {
        id: 'trix',
        label: 'TRIX',
        categoryId: 'trend',
        dslName: 'trix',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            },
            {
                name: 'signal',
                label: 'Signal',
                defaultValue: 8
            }
        ],
        rhsType: 'number',
        description: 'Triple Exponential Average',
        supported: false
    },
    // ── Volatility ────────────────────────────────────────────────────────
    {
        id: 'atr',
        label: 'ATR',
        categoryId: 'volatility',
        dslName: 'atr',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            }
        ],
        rhsType: 'number',
        description: 'Average True Range',
        supported: false
    },
    {
        id: 'natr',
        label: 'NATR',
        categoryId: 'volatility',
        dslName: 'natr',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            }
        ],
        rhsType: 'number',
        description: 'Normalized ATR (%)',
        supported: false
    },
    {
        id: 'stddev',
        label: 'Std Deviation',
        categoryId: 'volatility',
        dslName: 'stddev',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            },
            {
                name: 'nbDev',
                label: 'StdDev',
                defaultValue: 1
            }
        ],
        rhsType: 'number',
        description: 'Standard Deviation of price',
        supported: false
    },
    {
        id: 'hv',
        label: 'Historical Vol',
        categoryId: 'volatility',
        dslName: 'hv',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            }
        ],
        rhsType: 'number',
        description: 'Historical Volatility',
        supported: false
    },
    {
        id: 'chop',
        label: 'Choppiness Index',
        categoryId: 'volatility',
        dslName: 'chop',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            }
        ],
        rhsType: 'number',
        description: 'Choppiness Index',
        supported: false
    },
    // ── Volume Indicators ─────────────────────────────────────────────────
    {
        id: 'obv',
        label: 'OBV',
        categoryId: 'volume',
        dslName: 'obv',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'On Balance Volume',
        supported: false
    },
    {
        id: 'cmf',
        label: 'CMF',
        categoryId: 'volume',
        dslName: 'cmf',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            }
        ],
        rhsType: 'number',
        description: 'Chaikin Money Flow',
        supported: false
    },
    {
        id: 'ad',
        label: 'A/D Line',
        categoryId: 'volume',
        dslName: 'ad',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Accumulation/Distribution Line',
        supported: false
    },
    {
        id: 'vpt',
        label: 'Volume Price Trend',
        categoryId: 'volume',
        dslName: 'vpt',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Volume Price Trend',
        supported: false
    },
    {
        id: 'mfi',
        label: 'MFI',
        categoryId: 'volume',
        dslName: 'mfi',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            }
        ],
        rhsType: 'number',
        description: 'Money Flow Index',
        supported: false
    },
    {
        id: 'vr',
        label: 'Volume Ratio',
        categoryId: 'volume',
        dslName: 'vr',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 21
            }
        ],
        rhsType: 'number',
        description: 'Volume Ratio',
        supported: false
    },
    {
        id: 'vma',
        label: 'Volume MA',
        categoryId: 'volume',
        dslName: 'vma',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Volume Moving Average',
        supported: false
    },
    {
        id: 'vo',
        label: 'Volume Oscillator',
        categoryId: 'volume',
        dslName: 'vo',
        params: [
            {
                name: 'fast',
                label: 'Fast',
                defaultValue: 7
            },
            {
                name: 'slow',
                label: 'Slow',
                defaultValue: 14
            }
        ],
        rhsType: 'number',
        description: 'Volume Oscillator',
        supported: false
    },
    // ── Channels & Bands ─────────────────────────────────────────────────
    {
        id: 'bbub',
        label: 'BB Upper Band',
        categoryId: 'channels',
        dslName: 'bbub',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            },
            {
                name: 'stddev',
                label: 'Std Dev',
                defaultValue: 2,
                step: 0.5
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Bollinger Upper Band',
        supported: false
    },
    {
        id: 'bbmb',
        label: 'BB Middle Band',
        categoryId: 'channels',
        dslName: 'bbmb',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            },
            {
                name: 'stddev',
                label: 'Std Dev',
                defaultValue: 2,
                step: 0.5
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Bollinger Middle Band',
        supported: false
    },
    {
        id: 'bblb',
        label: 'BB Lower Band',
        categoryId: 'channels',
        dslName: 'bblb',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            },
            {
                name: 'stddev',
                label: 'Std Dev',
                defaultValue: 2,
                step: 0.5
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Bollinger Lower Band',
        supported: false
    },
    {
        id: 'bb_pct',
        label: 'Bollinger %B',
        categoryId: 'channels',
        dslName: 'pb',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            },
            {
                name: 'stddev',
                label: 'Std Dev',
                defaultValue: 2,
                step: 0.5
            }
        ],
        rhsType: 'number',
        description: 'Bollinger %B (position within bands)',
        supported: false
    },
    {
        id: 'bb_bw',
        label: 'BB Width',
        categoryId: 'channels',
        dslName: 'bbwidth',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            },
            {
                name: 'stddev',
                label: 'Std Dev',
                defaultValue: 2,
                step: 0.5
            }
        ],
        rhsType: 'number',
        description: 'Bollinger BandWidth %',
        supported: false
    },
    {
        id: 'keltub',
        label: 'Keltner Upper',
        categoryId: 'channels',
        dslName: 'keltub',
        params: [
            {
                name: 'period',
                label: 'EMA Period',
                defaultValue: 20
            },
            {
                name: 'mult',
                label: 'ATR Mult',
                defaultValue: 2,
                step: 0.5
            },
            {
                name: 'atrPeriod',
                label: 'ATR Period',
                defaultValue: 10
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Keltner Channel Upper',
        supported: false
    },
    {
        id: 'keltlb',
        label: 'Keltner Lower',
        categoryId: 'channels',
        dslName: 'keltlb',
        params: [
            {
                name: 'period',
                label: 'EMA Period',
                defaultValue: 20
            },
            {
                name: 'mult',
                label: 'ATR Mult',
                defaultValue: 2,
                step: 0.5
            },
            {
                name: 'atrPeriod',
                label: 'ATR Period',
                defaultValue: 10
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Keltner Channel Lower',
        supported: false
    },
    {
        id: 'udon',
        label: 'Donchian Upper',
        categoryId: 'channels',
        dslName: 'udon',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Donchian Upper Channel',
        supported: false
    },
    {
        id: 'ldon',
        label: 'Donchian Lower',
        categoryId: 'channels',
        dslName: 'ldon',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Donchian Lower Channel',
        supported: false
    },
    // ── Ichimoku ──────────────────────────────────────────────────────────
    {
        id: 'tenkan',
        label: 'Tenkan (Conversion)',
        categoryId: 'ichimoku',
        dslName: 'tenkan',
        params: [
            {
                name: 'tenkan',
                label: 'Tenkan',
                defaultValue: 9
            },
            {
                name: 'kijun',
                label: 'Kijun',
                defaultValue: 26
            },
            {
                name: 'senkou',
                label: 'Senkou',
                defaultValue: 52
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Ichimoku Tenkan-sen',
        supported: false
    },
    {
        id: 'kijun',
        label: 'Kijun (Base)',
        categoryId: 'ichimoku',
        dslName: 'kijun',
        params: [
            {
                name: 'tenkan',
                label: 'Tenkan',
                defaultValue: 9
            },
            {
                name: 'kijun',
                label: 'Kijun',
                defaultValue: 26
            },
            {
                name: 'senkou',
                label: 'Senkou',
                defaultValue: 52
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Ichimoku Kijun-sen',
        supported: false
    },
    {
        id: 'spana',
        label: 'Span A',
        categoryId: 'ichimoku',
        dslName: 'spana',
        params: [
            {
                name: 'tenkan',
                label: 'Tenkan',
                defaultValue: 9
            },
            {
                name: 'kijun',
                label: 'Kijun',
                defaultValue: 26
            },
            {
                name: 'senkou',
                label: 'Senkou',
                defaultValue: 52
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Ichimoku Span A',
        supported: false
    },
    {
        id: 'spanb',
        label: 'Span B',
        categoryId: 'ichimoku',
        dslName: 'spanb',
        params: [
            {
                name: 'tenkan',
                label: 'Tenkan',
                defaultValue: 9
            },
            {
                name: 'kijun',
                label: 'Kijun',
                defaultValue: 26
            },
            {
                name: 'senkou',
                label: 'Senkou',
                defaultValue: 52
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Ichimoku Span B',
        supported: false
    },
    // ── Pivot Points ──────────────────────────────────────────────────────
    {
        id: 'pp',
        label: 'Pivot Point',
        categoryId: 'pivot',
        dslName: 'pp',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Standard Pivot Point',
        supported: false
    },
    {
        id: 'ps1',
        label: 'Pivot S1',
        categoryId: 'pivot',
        dslName: 'ps1',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Pivot Support 1',
        supported: false
    },
    {
        id: 'pr1',
        label: 'Pivot R1',
        categoryId: 'pivot',
        dslName: 'pr1',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Pivot Resistance 1',
        supported: false
    },
    {
        id: 'ps2',
        label: 'Pivot S2',
        categoryId: 'pivot',
        dslName: 'ps2',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Pivot Support 2',
        supported: false
    },
    {
        id: 'pr2',
        label: 'Pivot R2',
        categoryId: 'pivot',
        dslName: 'pr2',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Pivot Resistance 2',
        supported: false
    },
    // ── Relative Strength ─────────────────────────────────────────────────
    {
        id: 'rs5',
        label: 'RS 1-Week',
        categoryId: 'relstrength',
        dslName: 'rs5',
        params: [],
        rhsType: 'number',
        description: '1-Week Relative Strength',
        supported: false
    },
    {
        id: 'rs21',
        label: 'RS 1-Month',
        categoryId: 'relstrength',
        dslName: 'rs21',
        params: [],
        rhsType: 'number',
        description: '1-Month Relative Strength',
        supported: false
    },
    {
        id: 'rs63',
        label: 'RS 3-Month',
        categoryId: 'relstrength',
        dslName: 'rs63',
        params: [],
        rhsType: 'number',
        description: '3-Month Relative Strength',
        supported: false
    },
    {
        id: 'rs126',
        label: 'RS 6-Month',
        categoryId: 'relstrength',
        dslName: 'rs126',
        params: [],
        rhsType: 'number',
        description: '6-Month Relative Strength',
        supported: false
    },
    {
        id: 'rs252',
        label: 'RS 1-Year',
        categoryId: 'relstrength',
        dslName: 'rs252',
        params: [],
        rhsType: 'number',
        description: '1-Year Relative Strength',
        supported: false
    },
    // ── Price Action (Candlestick helpers) ────────────────────────────────
    {
        id: 'tprice',
        label: 'Typical Price',
        categoryId: 'price_action',
        dslName: 'tprice',
        params: [],
        rhsType: 'number_or_indicator',
        description: '(H+L+C)/3',
        supported: false
    },
    {
        id: 'mprice',
        label: 'Median Price',
        categoryId: 'price_action',
        dslName: 'mprice',
        params: [],
        rhsType: 'number_or_indicator',
        description: '(H+L)/2',
        supported: false
    },
    {
        id: 'wick',
        label: 'Upper Wick',
        categoryId: 'price_action',
        dslName: 'wick',
        params: [
            {
                name: 'shift',
                label: 'Bar Shift',
                defaultValue: 0
            }
        ],
        rhsType: 'number',
        description: 'Size of upper shadow',
        supported: false
    },
    {
        id: 'tail',
        label: 'Lower Tail',
        categoryId: 'price_action',
        dslName: 'tail',
        params: [
            {
                name: 'shift',
                label: 'Bar Shift',
                defaultValue: 0
            }
        ],
        rhsType: 'number',
        description: 'Size of lower shadow',
        supported: false
    },
    {
        id: 'body',
        label: 'Candle Body',
        categoryId: 'price_action',
        dslName: 'body',
        params: [
            {
                name: 'shift',
                label: 'Bar Shift',
                defaultValue: 0
            }
        ],
        rhsType: 'number',
        description: 'Real body size',
        supported: false
    },
    // ── Fundamental Data ─────────────────────────────────────────────────
    {
        id: 'mcap',
        label: 'Market Cap (₹ Cr)',
        categoryId: 'fundamental',
        dslName: 'mcap',
        params: [],
        rhsType: 'number',
        description: 'Market Capitalisation in ₹ Crores',
        supported: true
    },
    {
        id: 'pe',
        label: 'P/E (TTM)',
        categoryId: 'fundamental',
        dslName: 'pe',
        params: [],
        rhsType: 'number',
        description: 'Price-to-Earnings (TTM)',
        supported: true
    },
    {
        id: 'pb',
        label: 'P/B',
        categoryId: 'fundamental',
        dslName: 'pb',
        params: [],
        rhsType: 'number',
        description: 'Price-to-Book Ratio',
        supported: true
    },
    {
        id: 'ev_ebitda',
        label: 'EV/EBITDA',
        categoryId: 'fundamental',
        dslName: 'ev_ebitda',
        params: [],
        rhsType: 'number',
        description: 'Enterprise Value to EBITDA',
        supported: true
    },
    {
        id: 'div_yield',
        label: 'Dividend Yield %',
        categoryId: 'fundamental',
        dslName: 'dvd_yield',
        params: [],
        rhsType: 'number',
        description: 'Dividend Yield %',
        supported: true
    },
    {
        id: 'eps_ttm',
        label: 'EPS (TTM)',
        categoryId: 'fundamental',
        dslName: 'eps',
        params: [],
        rhsType: 'number',
        description: 'Earnings Per Share (TTM)',
        supported: true
    },
    {
        id: 'ebitda_ttm',
        label: 'EBITDA (₹ Cr)',
        categoryId: 'fundamental',
        dslName: 'ebitda',
        params: [],
        rhsType: 'number',
        description: 'EBITDA (TTM, ₹ Crores)',
        supported: false
    },
    {
        id: 'pat_margin',
        label: 'PAT Margin %',
        categoryId: 'fundamental',
        dslName: 'pat_margin',
        params: [],
        rhsType: 'number',
        description: 'Net Profit Margin %',
        supported: true
    },
    {
        id: 'op_margin',
        label: 'Operating Margin %',
        categoryId: 'fundamental',
        dslName: 'op_margin',
        params: [],
        rhsType: 'number',
        description: 'Operating (EBIT) Margin %',
        supported: true
    },
    {
        id: 'gross_margin',
        label: 'Gross Margin %',
        categoryId: 'fundamental',
        dslName: 'gross_margin',
        params: [],
        rhsType: 'number',
        description: 'Gross Profit Margin % (from MSI ratios)',
        supported: false
    },
    // ── Financial Health ──────────────────────────────────────────────────
    {
        id: 'de',
        label: 'Debt / Equity',
        categoryId: 'financial_health',
        dslName: 'debt_equity',
        params: [],
        rhsType: 'number',
        description: 'Total Debt to Equity Ratio',
        supported: true
    },
    {
        id: 'ic',
        label: 'Interest Coverage',
        categoryId: 'financial_health',
        dslName: 'interest_coverage',
        params: [],
        rhsType: 'number',
        description: 'EBIT / Interest Expense',
        supported: true
    },
    {
        id: 'current_ratio',
        label: 'Current Ratio',
        categoryId: 'financial_health',
        dslName: 'current_ratio',
        params: [],
        rhsType: 'number',
        description: 'Current Assets / Current Liabilities',
        supported: true
    },
    {
        id: 'quick_ratio',
        label: 'Quick Ratio',
        categoryId: 'financial_health',
        dslName: 'quick_ratio',
        params: [],
        rhsType: 'number',
        description: '(Current Assets − Inventory) / Current Liabilities',
        supported: false
    },
    {
        id: 'altman_z',
        label: 'Altman Z-Score',
        categoryId: 'financial_health',
        dslName: 'altman_z_score',
        params: [],
        rhsType: 'number',
        description: 'Altman Z-Score (>3 safe, <1.8 distress)',
        supported: false
    },
    {
        id: 'beneish_m',
        label: 'Beneish M-Score',
        categoryId: 'financial_health',
        dslName: 'beneish_m_score',
        params: [],
        rhsType: 'number',
        description: 'Earnings manipulation indicator (<-2.22 = low risk)',
        supported: false
    },
    {
        id: 'promoter_pct',
        label: 'Promoter Holding %',
        categoryId: 'financial_health',
        dslName: 'promoter_pct',
        params: [],
        rhsType: 'number',
        description: 'Promoter shareholding percentage',
        supported: false
    },
    {
        id: 'pledged_pct',
        label: 'Pledged Shares %',
        categoryId: 'financial_health',
        dslName: 'pledged_pct',
        params: [],
        rhsType: 'number',
        description: 'Promoter pledged shares as % of total shares',
        supported: false
    },
    // ── Growth ────────────────────────────────────────────────────────────
    {
        id: 'rev_g1y',
        label: 'Revenue Growth 1Y %',
        categoryId: 'growth',
        dslName: 'rev_g1y',
        params: [],
        rhsType: 'number',
        description: '1-Year Revenue Growth (YoY)',
        supported: true
    },
    {
        id: 'rev_g3y',
        label: 'Revenue Growth 3Y %',
        categoryId: 'growth',
        dslName: 'rev_g3y',
        params: [],
        rhsType: 'number',
        description: '3-Year Revenue CAGR',
        supported: true
    },
    {
        id: 'pat_g1y',
        label: 'PAT Growth 1Y %',
        categoryId: 'growth',
        dslName: 'pat_g1y',
        params: [],
        rhsType: 'number',
        description: '1-Year Net Profit Growth (YoY)',
        supported: true
    },
    {
        id: 'pat_g3y',
        label: 'PAT Growth 3Y %',
        categoryId: 'growth',
        dslName: 'pat_g3y',
        params: [],
        rhsType: 'number',
        description: '3-Year Net Profit CAGR',
        supported: false
    },
    {
        id: 'eps_g1y',
        label: 'EPS Growth 1Y %',
        categoryId: 'growth',
        dslName: 'eps_g1y',
        params: [],
        rhsType: 'number',
        description: '1-Year EPS Growth (YoY)',
        supported: true
    },
    {
        id: 'fcf',
        label: 'Free Cash Flow (₹ Cr)',
        categoryId: 'growth',
        dslName: 'fcf',
        params: [],
        rhsType: 'number',
        description: 'Free Cash Flow (Operating CF − Capex)',
        supported: false
    },
    // ── Valuation ─────────────────────────────────────────────────────────
    {
        id: 'roce',
        label: 'ROCE %',
        categoryId: 'valuation',
        dslName: 'roce',
        params: [],
        rhsType: 'number',
        description: 'Return on Capital Employed %',
        supported: false
    },
    {
        id: 'roe',
        label: 'ROE %',
        categoryId: 'valuation',
        dslName: 'roe',
        params: [],
        rhsType: 'number',
        description: 'Return on Equity %',
        supported: false
    },
    {
        id: 'book_value',
        label: 'Book Value/Share',
        categoryId: 'valuation',
        dslName: 'book_value',
        params: [],
        rhsType: 'number',
        description: 'Book Value per Share (₹)',
        supported: false
    },
    // ── Quality & Rank ────────────────────────────────────────────────────
    {
        id: 'quality_score',
        label: 'Quality Score',
        categoryId: 'quality',
        dslName: 'quality',
        params: [],
        rhsType: 'number',
        description: 'Composite Quality Score (0-100)',
        supported: true
    },
    {
        id: 'piotroski',
        label: 'Piotroski F-Score',
        categoryId: 'quality',
        dslName: 'piotroski_f_score',
        params: [],
        rhsType: 'number',
        description: 'Piotroski F-Score (0-9, higher = stronger)',
        supported: false
    },
    // ── Factor Exposure (IIMA Carhart 4-Factor) ───────────────────────────
    {
        id: 'ff_beta',
        label: 'Market Beta (β)',
        categoryId: 'factor',
        dslName: 'ff_beta',
        params: [],
        rhsType: 'number',
        description: 'Carhart market beta from IIMA OLS regression',
        supported: false
    },
    {
        id: 'ff_smb',
        label: 'Size Loading (SMB)',
        categoryId: 'factor',
        dslName: 'ff_smb',
        params: [],
        rhsType: 'number',
        description: 'Small-minus-big factor loading',
        supported: false
    },
    {
        id: 'ff_hml',
        label: 'Value Loading (HML)',
        categoryId: 'factor',
        dslName: 'ff_hml',
        params: [],
        rhsType: 'number',
        description: 'High-minus-low (value) factor loading',
        supported: false
    },
    {
        id: 'ff_wml',
        label: 'Momentum Loading (WML)',
        categoryId: 'factor',
        dslName: 'ff_wml',
        params: [],
        rhsType: 'number',
        description: 'Winners-minus-losers (momentum) factor loading',
        supported: false
    },
    {
        id: 'ff_alpha',
        label: 'Alpha (α)',
        categoryId: 'factor',
        dslName: 'ff_alpha',
        params: [],
        rhsType: 'number',
        description: 'Daily abnormal return unexplained by factors',
        supported: false
    },
    {
        id: 'ff_r2',
        label: 'Factor R²',
        categoryId: 'factor',
        dslName: 'ff_r2',
        params: [],
        rhsType: 'number',
        description: 'Model R-squared: how much return variance factors explain',
        supported: false
    },
    // ─── Additional Requested Indicators (Under consideration/WIP) ───
    // MA Additions
    {
        id: 'alma',
        label: 'ALMA',
        categoryId: 'ma',
        dslName: 'alma',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 9
            },
            {
                name: 'offset',
                label: 'Offset',
                defaultValue: 0.85,
                step: 0.05
            },
            {
                name: 'sigma',
                label: 'Sigma',
                defaultValue: 6
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Arnaud Legoux MA',
        supported: false
    },
    {
        id: 'smma',
        label: 'SMMA (Smoothed MA)',
        categoryId: 'ma',
        dslName: 'smma',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 50
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Smoothed Moving Average',
        supported: false
    },
    {
        id: 't3',
        label: 'T3 MA',
        categoryId: 'ma',
        dslName: 't3',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 5
            },
            {
                name: 'vfactor',
                label: 'Volume Factor',
                defaultValue: 0.7,
                step: 0.1
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Tillson T3 MA',
        supported: false
    },
    {
        id: 'zlema',
        label: 'ZLEMA',
        categoryId: 'ma',
        dslName: 'zlema',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Zero Lag EMA',
        supported: false
    },
    // Oscillators Additions
    {
        id: 'fisher',
        label: 'Fisher Transform',
        categoryId: 'oscillators',
        dslName: 'fisher',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 9
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Fisher Transform',
        supported: false
    },
    {
        id: 'kst',
        label: 'KST',
        categoryId: 'oscillators',
        dslName: 'kst',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Know Sure Thing Oscillator',
        supported: false
    },
    {
        id: 'smi',
        label: 'Stochastic Momentum (SMI)',
        categoryId: 'oscillators',
        dslName: 'smi',
        params: [
            {
                name: 'q',
                label: 'Q-Period',
                defaultValue: 10
            },
            {
                name: 'r',
                label: 'R-Period',
                defaultValue: 3
            },
            {
                name: 's',
                label: 'S-Period',
                defaultValue: 3
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Stochastic Momentum Index',
        supported: false
    },
    {
        id: 'tsi',
        label: 'TSI',
        categoryId: 'oscillators',
        dslName: 'tsi',
        params: [
            {
                name: 'long',
                label: 'Long',
                defaultValue: 25
            },
            {
                name: 'short',
                label: 'Short',
                defaultValue: 13
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'True Strength Index',
        supported: false
    },
    {
        id: 'ppo',
        label: 'PPO',
        categoryId: 'oscillators',
        dslName: 'ppo',
        params: [
            {
                name: 'fast',
                label: 'Fast',
                defaultValue: 12
            },
            {
                name: 'slow',
                label: 'Slow',
                defaultValue: 26
            },
            {
                name: 'sig',
                label: 'Signal',
                defaultValue: 9
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Percentage Price Oscillator',
        supported: false
    },
    // Trend Additions
    {
        id: 'vortex',
        label: 'Vortex Indicator (VI)',
        categoryId: 'trend',
        dslName: 'vortex',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Vortex Indicator',
        supported: false
    },
    {
        id: 'mass_index',
        label: 'Mass Index',
        categoryId: 'trend',
        dslName: 'mass',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 25
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Mass Index',
        supported: false
    },
    {
        id: 'dmi',
        label: 'DMI (Directional Movement)',
        categoryId: 'trend',
        dslName: 'dmi',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Directional Movement Index',
        supported: false
    },
    {
        id: 'ttm_squeeze',
        label: 'TTM Squeeze',
        categoryId: 'trend',
        dslName: 'squeeze',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Volatility Squeeze Indicator',
        supported: false
    },
    // Volatility Additions
    {
        id: 'chaikin_vol',
        label: 'Chaikin Volatility',
        categoryId: 'volatility',
        dslName: 'cvi',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 10
            },
            {
                name: 'roc',
                label: 'ROC Period',
                defaultValue: 10
            }
        ],
        rhsType: 'number',
        description: 'Chaikin Volatility Index',
        supported: false
    },
    {
        id: 'rvi',
        label: 'Relative Volatility (RVI)',
        categoryId: 'volatility',
        dslName: 'rvi',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            }
        ],
        rhsType: 'number',
        description: 'Relative Volatility Index',
        supported: false
    },
    {
        id: 'stderr_bands',
        label: 'StdErr Bands',
        categoryId: 'volatility',
        dslName: 'stderr',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            }
        ],
        rhsType: 'number',
        description: 'Standard Error Bands',
        supported: false
    },
    // Volume Additions
    {
        id: 'vwap',
        label: 'VWAP',
        categoryId: 'volume',
        dslName: 'vwap',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Volume Weighted Average Price',
        supported: false
    },
    {
        id: 'anchored_vwap',
        label: 'Anchored VWAP',
        categoryId: 'volume',
        dslName: 'avwap',
        params: [
            {
                name: 'days',
                label: 'Days Ago',
                defaultValue: 30
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Anchored VWAP',
        supported: false
    },
    {
        id: 'twap',
        label: 'TWAP',
        categoryId: 'volume',
        dslName: 'twap',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Time Weighted Average Price',
        supported: false
    },
    {
        id: 'eom',
        label: 'Ease of Movement (EOM)',
        categoryId: 'volume',
        dslName: 'eom',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 14
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Ease of Movement',
        supported: false
    },
    {
        id: 'nvi',
        label: 'Negative Volume Index',
        categoryId: 'volume',
        dslName: 'nvi',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Negative Volume Index (NVI)',
        supported: false
    },
    {
        id: 'pvi',
        label: 'Positive Volume Index',
        categoryId: 'volume',
        dslName: 'pvi',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Positive Volume Index (PVI)',
        supported: false
    },
    // Channels & Bands Additions
    {
        id: 'kc_width',
        label: 'Keltner Width',
        categoryId: 'channels',
        dslName: 'kcw',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            }
        ],
        rhsType: 'number',
        description: 'Keltner Channels Width',
        supported: false
    },
    {
        id: 'donchian_width',
        label: 'Donchian Width',
        categoryId: 'channels',
        dslName: 'dcw',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 20
            }
        ],
        rhsType: 'number',
        description: 'Donchian Channels Width',
        supported: false
    },
    {
        id: 'starc_bands',
        label: 'STARC Bands Upper',
        categoryId: 'channels',
        dslName: 'starc_u',
        params: [
            {
                name: 'period',
                label: 'Period',
                defaultValue: 6
            },
            {
                name: 'mult',
                label: 'Multiplier',
                defaultValue: 2
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Stoller Average Range Channel',
        supported: false
    },
    // Ichimoku Additions
    {
        id: 'chikou',
        label: 'Chikou (Lagging Span)',
        categoryId: 'ichimoku',
        dslName: 'chikou',
        params: [
            {
                name: 'offset',
                label: 'Offset',
                defaultValue: 26
            }
        ],
        rhsType: 'number_or_indicator',
        description: 'Ichimoku Chikou Span',
        supported: false
    },
    // Pivot Additions
    {
        id: 'woodie_pp',
        label: 'Woodie Pivot',
        categoryId: 'pivot',
        dslName: 'w_pp',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Woodie Pivot Point',
        supported: false
    },
    {
        id: 'camarilla_pp',
        label: 'Camarilla Pivot',
        categoryId: 'pivot',
        dslName: 'c_pp',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Camarilla Pivot Point',
        supported: false
    },
    {
        id: 'fibo_pp',
        label: 'Fibonacci Pivot',
        categoryId: 'pivot',
        dslName: 'f_pp',
        params: [],
        rhsType: 'number_or_indicator',
        description: 'Fibonacci Pivot Point',
        supported: false
    },
    // Price Action / Candlesticks
    {
        id: 'inside_bar',
        label: 'Inside Bar',
        categoryId: 'price_action',
        dslName: 'cdl_inside',
        params: [],
        rhsType: 'number',
        description: 'Inside Bar Pattern (1=True, 0=False)',
        supported: false
    },
    {
        id: 'outside_bar',
        label: 'Outside Bar',
        categoryId: 'price_action',
        dslName: 'cdl_outside',
        params: [],
        rhsType: 'number',
        description: 'Outside Bar Pattern (1=True, 0=False)',
        supported: false
    },
    {
        id: 'doji',
        label: 'Doji',
        categoryId: 'price_action',
        dslName: 'cdl_doji',
        params: [],
        rhsType: 'number',
        description: 'Doji Pattern (1=True, 0=False)',
        supported: false
    },
    {
        id: 'hammer',
        label: 'Hammer',
        categoryId: 'price_action',
        dslName: 'cdl_hammer',
        params: [],
        rhsType: 'number',
        description: 'Hammer Pattern (1=True, 0=False)',
        supported: false
    },
    {
        id: 'engulfing',
        label: 'Engulfing',
        categoryId: 'price_action',
        dslName: 'cdl_engulfing',
        params: [],
        rhsType: 'number',
        description: 'Engulfing Pattern (1=Bull, -1=Bear)',
        supported: false
    },
    {
        id: 'pin_bar',
        label: 'Pin Bar',
        categoryId: 'price_action',
        dslName: 'cdl_pin',
        params: [],
        rhsType: 'number',
        description: 'Pin Bar Reversal Pattern',
        supported: false
    },
    // Financial Health & Valuation
    {
        id: 'peg',
        label: 'PEG Ratio',
        categoryId: 'valuation',
        dslName: 'peg',
        params: [],
        rhsType: 'number',
        description: 'Price/Earnings to Growth Ratio',
        supported: false
    },
    {
        id: 'ps',
        label: 'Price to Sales (P/S)',
        categoryId: 'valuation',
        dslName: 'ps',
        params: [],
        rhsType: 'number',
        description: 'Price to Sales Ratio',
        supported: false
    },
    {
        id: 'pcf',
        label: 'Price to Cash Flow',
        categoryId: 'valuation',
        dslName: 'pcf',
        params: [],
        rhsType: 'number',
        description: 'Price to Cash Flow Ratio',
        supported: false
    },
    {
        id: 'ev_sales',
        label: 'EV/Sales',
        categoryId: 'valuation',
        dslName: 'ev_sales',
        params: [],
        rhsType: 'number',
        description: 'Enterprise Value to Sales',
        supported: false
    },
    {
        id: 'ev',
        label: 'Enterprise Value (₹ Cr)',
        categoryId: 'valuation',
        dslName: 'ev',
        params: [],
        rhsType: 'number',
        description: 'Enterprise Value',
        supported: false
    },
    {
        id: 'fcf_yield',
        label: 'FCF Yield %',
        categoryId: 'valuation',
        dslName: 'fcf_yield',
        params: [],
        rhsType: 'number',
        description: 'Free Cash Flow Yield',
        supported: false
    },
    {
        id: 'debt_asset',
        label: 'Debt to Asset %',
        categoryId: 'financial_health',
        dslName: 'debt_asset',
        params: [],
        rhsType: 'number',
        description: 'Total Debt to Total Assets',
        supported: false
    },
    {
        id: 'equity_mult',
        label: 'Equity Multiplier',
        categoryId: 'financial_health',
        dslName: 'equity_mult',
        params: [],
        rhsType: 'number',
        description: 'Total Assets / Total Equity',
        supported: false
    },
    {
        id: 'asset_turnover',
        label: 'Asset Turnover',
        categoryId: 'financial_health',
        dslName: 'asset_turnover',
        params: [],
        rhsType: 'number',
        description: 'Revenue / Total Assets',
        supported: false
    },
    {
        id: 'inv_turnover',
        label: 'Inventory Turnover',
        categoryId: 'financial_health',
        dslName: 'inv_turnover',
        params: [],
        rhsType: 'number',
        description: 'COGS / Average Inventory',
        supported: false
    },
    // Growth
    {
        id: 'eps_g5y',
        label: 'EPS Growth 5Y %',
        categoryId: 'growth',
        dslName: 'eps_g5y',
        params: [],
        rhsType: 'number',
        description: '5-Year EPS CAGR',
        supported: false
    },
    {
        id: 'rev_g5y',
        label: 'Revenue Growth 5Y %',
        categoryId: 'growth',
        dslName: 'rev_g5y',
        params: [],
        rhsType: 'number',
        description: '5-Year Revenue CAGR',
        supported: false
    },
    {
        id: 'div_g3y',
        label: 'Dividend Growth 3Y %',
        categoryId: 'growth',
        dslName: 'div_g3y',
        params: [],
        rhsType: 'number',
        description: '3-Year Dividend Growth',
        supported: false
    },
    {
        id: 'capex_g3y',
        label: 'CAPEX Growth 3Y %',
        categoryId: 'growth',
        dslName: 'capex_g3y',
        params: [],
        rhsType: 'number',
        description: '3-Year Capital Expenditure Growth',
        supported: false
    },
    // Factor exposure
    {
        id: 'factor_sharpe',
        label: 'Sharpe Ratio (1Y)',
        categoryId: 'factor',
        dslName: 'sharpe',
        params: [],
        rhsType: 'number',
        description: 'Annualized Sharpe Ratio',
        supported: false
    },
    {
        id: 'factor_sortino',
        label: 'Sortino Ratio (1Y)',
        categoryId: 'factor',
        dslName: 'sortino',
        params: [],
        rhsType: 'number',
        description: 'Annualized Sortino Ratio',
        supported: false
    },
    {
        id: 'factor_treynor',
        label: 'Treynor Ratio (1Y)',
        categoryId: 'factor',
        dslName: 'treynor',
        params: [],
        rhsType: 'number',
        description: 'Treynor Ratio',
        supported: false
    },
    {
        id: 'factor_info',
        label: 'Information Ratio (1Y)',
        categoryId: 'factor',
        dslName: 'info_ratio',
        params: [],
        rhsType: 'number',
        description: 'Information Ratio vs Nifty 50',
        supported: false
    }
];
const OPERATORS = [
    // Comparison
    {
        id: 'gt',
        label: 'Is Greater Than',
        dslOp: '>',
        verb: 'is greater than',
        valueConfig: {
            type: 'number',
            label: 'Value'
        },
        rhsCanBeIndicator: true,
        technicalOnly: false
    },
    {
        id: 'lt',
        label: 'Is Less Than',
        dslOp: '<',
        verb: 'is less than',
        valueConfig: {
            type: 'number',
            label: 'Value'
        },
        rhsCanBeIndicator: true,
        technicalOnly: false
    },
    {
        id: 'gte',
        label: 'Is Greater or Equal',
        dslOp: '>=',
        verb: '>=',
        valueConfig: {
            type: 'number',
            label: 'Value'
        },
        rhsCanBeIndicator: true,
        technicalOnly: false
    },
    {
        id: 'lte',
        label: 'Is Less or Equal',
        dslOp: '<=',
        verb: '<=',
        valueConfig: {
            type: 'number',
            label: 'Value'
        },
        rhsCanBeIndicator: true,
        technicalOnly: false
    },
    {
        id: 'between',
        label: 'Is Between',
        dslOp: 'between',
        verb: 'is between',
        valueConfig: {
            type: 'two_numbers',
            label1: 'Min',
            label2: 'Max'
        },
        rhsCanBeIndicator: false,
        technicalOnly: false
    },
    // Crossovers (technical only)
    {
        id: 'ca',
        label: 'Crossed Above',
        dslOp: 'ca',
        verb: 'crossed above',
        valueConfig: {
            type: 'number',
            label: 'Value or Indicator'
        },
        rhsCanBeIndicator: true,
        technicalOnly: true
    },
    {
        id: 'cb',
        label: 'Crossed Below',
        dslOp: 'cb',
        verb: 'crossed below',
        valueConfig: {
            type: 'number',
            label: 'Value or Indicator'
        },
        rhsCanBeIndicator: true,
        technicalOnly: true
    },
    // Touch events (technical only)
    {
        id: 'tocha',
        label: 'Touched Above',
        dslOp: 'tocha',
        verb: 'touched above',
        valueConfig: {
            type: 'number',
            label: 'Value or Indicator'
        },
        rhsCanBeIndicator: true,
        technicalOnly: true
    },
    {
        id: 'tochb',
        label: 'Touched Below',
        dslOp: 'tochb',
        verb: 'touched below',
        valueConfig: {
            type: 'number',
            label: 'Value or Indicator'
        },
        rhsCanBeIndicator: true,
        technicalOnly: true
    },
    // Bounce events (technical only)
    {
        id: 'bon_up',
        label: 'Bounced Up From',
        dslOp: 'bon_up',
        verb: 'bounced up from',
        valueConfig: {
            type: 'number',
            label: 'Value or Indicator'
        },
        rhsCanBeIndicator: true,
        technicalOnly: true
    },
    {
        id: 'bon_dn',
        label: 'Bounced Down From',
        dslOp: 'bon_dn',
        verb: 'bounced down from',
        valueConfig: {
            type: 'number',
            label: 'Value or Indicator'
        },
        rhsCanBeIndicator: true,
        technicalOnly: true
    },
    // Trend (technical only)
    {
        id: 'trend_up',
        label: 'Trending Up',
        dslOp: 'trend_up',
        verb: 'trending up over',
        valueConfig: {
            type: 'days',
            label: 'Days'
        },
        rhsCanBeIndicator: false,
        technicalOnly: true
    },
    {
        id: 'trend_dn',
        label: 'Trending Down',
        dslOp: 'trend_dn',
        verb: 'trending down over',
        valueConfig: {
            type: 'days',
            label: 'Days'
        },
        rhsCanBeIndicator: false,
        technicalOnly: true
    },
    // New high/low (technical only)
    {
        id: 'new_high',
        label: 'New High Over',
        dslOp: 'new_high',
        verb: 'new high over',
        valueConfig: {
            type: 'days',
            label: 'Days'
        },
        rhsCanBeIndicator: false,
        technicalOnly: true
    },
    {
        id: 'new_low',
        label: 'New Low Over',
        dslOp: 'new_low',
        verb: 'new low over',
        valueConfig: {
            type: 'days',
            label: 'Days'
        },
        rhsCanBeIndicator: false,
        technicalOnly: true
    },
    // Universe match (for enum indicators)
    {
        id: 'eq',
        label: 'Is',
        dslOp: 'eq',
        verb: 'is',
        valueConfig: {
            type: 'number',
            label: 'Value'
        },
        rhsCanBeIndicator: false,
        technicalOnly: false
    }
];
// ─── Universe DSL names that emit function-call syntax ──────────────────────
const UNIVERSE_DSL_NAMES = new Set([
    'index',
    'sector',
    'caps',
    'type'
]);
function dslExpr(ind, paramValues) {
    if (paramValues.length === 0) return ind.dslName;
    const args = paramValues.map((v, i)=>{
        const p = ind.params[i];
        return p ? String(v ?? p.defaultValue) : String(v);
    });
    return `${ind.dslName}(${args.join(',')})`;
}
function buildDslCriterion(lhsExpr, op, rhsExpr, value2, lhsInd) {
    // Universe filters use DSL function syntax: index("nifty50"), sector("IT")
    if (lhsInd && lhsInd.rhsType === 'enum' && UNIVERSE_DSL_NAMES.has(lhsInd.dslName)) {
        return `${lhsInd.dslName}("${rhsExpr}")`;
    }
    if (op.id === 'between') {
        return `${lhsExpr} >= ${rhsExpr} AND ${lhsExpr} <= ${value2}`;
    }
    return `${lhsExpr} ${op.dslOp} ${rhsExpr}`;
}
const indicatorById = (id)=>INDICATORS.find((i)=>i.id === id);
const operatorById = (id)=>OPERATORS.find((o)=>o.id === id);
const categoryById = (id)=>INDICATOR_CATEGORIES.find((c)=>c.id === id);
}),
"[project]/src/components/screener/formula-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "detectContext",
    ()=>detectContext,
    "getMatchIndices",
    ()=>getMatchIndices,
    "searchAutocomplete",
    ()=>searchAutocomplete
]);
/**
 * Utility functions for formula builder autocomplete
 * Handles fuzzy search, ranking, and context detection
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/screener/indicators.ts [app-ssr] (ecmascript)");
;
// ─── Fuzzy Search ────────────────────────────────────────────────────────────
/**
 * Calculate match score for a query against a target string
 * Returns score (higher = better match) and matching character indices
 */ function fuzzyMatch(query, target) {
    const q = query.toLowerCase();
    const t = target.toLowerCase();
    if (t.includes(q)) {
        // Exact substring match
        const startIdx = t.indexOf(q);
        const indices = Array.from({
            length: q.length
        }, (_, i)=>startIdx + i);
        // Bonus for prefix match
        const prefixBonus = startIdx === 0 ? 100 : 0;
        // Bonus for word start match
        const wordStartBonus = startIdx === 0 || t[startIdx - 1] === ' ' || t[startIdx - 1] === '(' ? 50 : 0;
        return {
            score: 1000 + prefixBonus + wordStartBonus - startIdx * 2,
            indices
        };
    }
    // Character-by-character fuzzy match
    let score = 0;
    let lastMatchIdx = -1;
    const indices = [];
    let qIdx = 0;
    for(let tIdx = 0; tIdx < t.length && qIdx < q.length; tIdx++){
        if (t[tIdx] === q[qIdx]) {
            indices.push(tIdx);
            // Consecutive match bonus
            if (lastMatchIdx === tIdx - 1) {
                score += 10;
            }
            // Word start bonus
            if (tIdx === 0 || t[tIdx - 1] === ' ' || t[tIdx - 1] === '(') {
                score += 5;
            }
            score += 1;
            lastMatchIdx = tIdx;
            qIdx++;
        }
    }
    // All characters matched
    if (qIdx === q.length) {
        return {
            score,
            indices
        };
    }
    return {
        score: 0,
        indices: []
    };
}
function searchAutocomplete(query, context = 'start') {
    const trimmed = query.trim();
    if (!trimmed) return getDefaultSuggestions(context);
    const results = [];
    // Search indicators
    if (context === 'start' || context === 'after_operator') {
        for (const ind of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"]){
            // Match against label and dslName
            const labelMatch = fuzzyMatch(trimmed, ind.label);
            const dslMatch = fuzzyMatch(trimmed, ind.dslName);
            const bestMatch = labelMatch.score > dslMatch.score ? labelMatch : dslMatch;
            if (bestMatch.score > 0) {
                const category = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_CATEGORIES"].find((c)=>c.id === ind.categoryId);
                // Generate DSL example
                let dslExample = ind.dslName;
                if (ind.params.length > 0) {
                    const paramStr = ind.params.map((p)=>p.defaultValue).join(',');
                    dslExample = `${ind.dslName}(${paramStr})`;
                }
                // Add common operator example
                if (ind.rhsType === 'number_or_indicator' || ind.rhsType === 'number') {
                    dslExample += ' > 50';
                }
                results.push({
                    type: 'indicator',
                    id: ind.id,
                    label: ind.label,
                    category: category?.label || ind.categoryId,
                    dslName: ind.dslName,
                    dslExample,
                    params: ind.params.map((p)=>({
                            name: p.name,
                            defaultValue: p.defaultValue
                        })),
                    description: ind.description,
                    matchScore: bestMatch.score,
                    matchIndices: bestMatch.indices
                });
            }
        }
    }
    // Search operators
    if (context === 'after_indicator') {
        for (const op of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"]){
            const labelMatch = fuzzyMatch(trimmed, op.label);
            const verbMatch = fuzzyMatch(trimmed, op.verb);
            const dslMatch = fuzzyMatch(trimmed, op.dslOp);
            const bestMatch = [
                labelMatch,
                verbMatch,
                dslMatch
            ].reduce((a, b)=>a.score > b.score ? a : b);
            if (bestMatch.score > 0) {
                results.push({
                    type: 'operator',
                    id: op.id,
                    label: op.label,
                    category: 'Operator',
                    dslName: op.dslOp,
                    description: op.verb,
                    matchScore: bestMatch.score,
                    matchIndices: bestMatch.indices
                });
            }
        }
    }
    // Search for number values
    if (context === 'after_operator' || context === 'in_params') {
        const num = parseFloat(trimmed);
        if (!isNaN(num)) {
            results.push({
                type: 'number',
                id: `num_${num}`,
                label: trimmed,
                category: 'Number',
                dslName: trimmed,
                matchScore: 2000
            });
        }
        // Suggest common values
        const commonValues = context === 'in_params' ? [
            '14',
            '20',
            '50',
            '100',
            '200'
        ] : [
            '30',
            '50',
            '70',
            '100',
            '1000000'
        ];
        for (const val of commonValues){
            const match = fuzzyMatch(trimmed, val);
            if (match.score > 0) {
                results.push({
                    type: 'number',
                    id: `num_${val}`,
                    label: val,
                    category: 'Number',
                    dslName: val,
                    matchScore: match.score + 500,
                    matchIndices: match.indices
                });
            }
        }
    }
    // Search keywords (and, or, etc.)
    if (context === 'after_value') {
        const keywords = [
            {
                label: 'and',
                dsl: 'and',
                desc: 'Logical AND'
            },
            {
                label: 'or',
                dsl: 'or',
                desc: 'Logical OR'
            }
        ];
        for (const kw of keywords){
            const match = fuzzyMatch(trimmed, kw.label);
            if (match.score > 0) {
                results.push({
                    type: 'keyword',
                    id: kw.label,
                    label: kw.label.toUpperCase(),
                    category: 'Keyword',
                    dslName: kw.dsl,
                    description: kw.desc,
                    matchScore: match.score,
                    matchIndices: match.indices
                });
            }
        }
    }
    // Sort by match score (descending) and limit to top 15
    return results.sort((a, b)=>b.matchScore - a.matchScore).slice(0, 15);
}
/**
 * Get default suggestions based on context
 */ function getDefaultSuggestions(context) {
    switch(context){
        case 'start':
            // Show popular indicators
            return [
                'rsi',
                'price',
                'sma',
                'ema',
                'volume',
                'macd',
                'pe',
                'mcap'
            ].map((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].find((i)=>i.id === id)).filter((ind)=>!!ind).map((ind)=>{
                const category = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_CATEGORIES"].find((c)=>c.id === ind.categoryId);
                return {
                    type: 'indicator',
                    id: ind.id,
                    label: ind.label,
                    category: category?.label || ind.categoryId,
                    dslName: ind.dslName,
                    params: ind.params.map((p)=>({
                            name: p.name,
                            defaultValue: p.defaultValue
                        })),
                    description: ind.description,
                    matchScore: 100
                };
            });
        case 'after_indicator':
            // Show common operators
            return [
                'gt',
                'lt',
                'ca',
                'cb',
                'between'
            ].map((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"].find((o)=>o.id === id)).filter((op)=>!!op).map((op)=>({
                    type: 'operator',
                    id: op.id,
                    label: op.label,
                    category: 'Operator',
                    dslName: op.dslOp,
                    description: op.verb,
                    matchScore: 100
                }));
        case 'after_operator':
            // Show common values and popular indicators
            return [
                {
                    type: 'number',
                    id: 'num_50',
                    label: '50',
                    category: 'Number',
                    dslName: '50',
                    matchScore: 100
                },
                {
                    type: 'number',
                    id: 'num_70',
                    label: '70',
                    category: 'Number',
                    dslName: '70',
                    matchScore: 100
                },
                {
                    type: 'number',
                    id: 'num_30',
                    label: '30',
                    category: 'Number',
                    dslName: '30',
                    matchScore: 100
                }
            ];
        case 'in_params':
            // Show common parameter values
            return [
                {
                    type: 'number',
                    id: 'num_14',
                    label: '14',
                    category: 'Number',
                    dslName: '14',
                    matchScore: 100
                },
                {
                    type: 'number',
                    id: 'num_20',
                    label: '20',
                    category: 'Number',
                    dslName: '20',
                    matchScore: 100
                },
                {
                    type: 'number',
                    id: 'num_50',
                    label: '50',
                    category: 'Number',
                    dslName: '50',
                    matchScore: 100
                }
            ];
        case 'after_value':
            return [
                {
                    type: 'keyword',
                    id: 'and',
                    label: 'AND',
                    category: 'Keyword',
                    dslName: 'and',
                    matchScore: 100
                },
                {
                    type: 'keyword',
                    id: 'or',
                    label: 'OR',
                    category: 'Keyword',
                    dslName: 'or',
                    matchScore: 100
                }
            ];
        default:
            return [];
    }
}
function detectContext(input) {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed || trimmed.endsWith('and') || trimmed.endsWith('or')) {
        return 'start';
    }
    // Check if we're inside parentheses
    const openParens = (trimmed.match(/\(/g) || []).length;
    const closeParens = (trimmed.match(/\)/g) || []).length;
    if (openParens > closeParens) {
        return 'in_params';
    }
    // Check for operators
    const hasOperator = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"].some((op)=>trimmed.includes(` ${op.dslOp} `) || trimmed.includes(` ${op.dslOp}`) || trimmed.endsWith(op.dslOp));
    if (hasOperator) {
        // Check if there's a value after the operator
        const lastToken = trimmed.split(/\s+/).pop() || '';
        const isOperator = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"].some((op)=>op.dslOp === lastToken);
        return isOperator ? 'after_operator' : 'after_value';
    }
    // Check if we have an indicator name
    const hasIndicator = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].some((ind)=>trimmed.startsWith(ind.dslName) || trimmed.includes(` ${ind.dslName}`));
    if (hasIndicator) {
        return 'after_indicator';
    }
    return 'start';
}
function getMatchIndices(text, indices) {
    if (!indices || indices.length === 0) {
        return [
            {
                text,
                isMatch: false
            }
        ];
    }
    const parts = [];
    let lastIdx = 0;
    for (const idx of indices){
        if (idx > lastIdx) {
            parts.push({
                text: text.slice(lastIdx, idx),
                isMatch: false
            });
        }
        parts.push({
            text: text[idx],
            isMatch: true
        });
        lastIdx = idx + 1;
    }
    if (lastIdx < text.length) {
        parts.push({
            text: text.slice(lastIdx),
            isMatch: false
        });
    }
    return parts;
}
}),
"[project]/src/components/screener/FormulaAutocomplete.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormulaAutocomplete",
    ()=>FormulaAutocomplete
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/screener/indicators.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$screener$2f$formula$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/screener/formula-utils.ts [app-ssr] (ecmascript)");
/**
 * Two-tier categorized autocomplete dropdown for formula builder.
 * - Left sidebar: categories
 * - Right panel: values (indicators/operators)
 * - Synchronized scrolling and keyboard navigation
 */ 'use client';
;
;
;
;
;
// ─── highlight helper ────────────────────────────────────────────────────────
function Highlight({ text, indices }) {
    const parts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$screener$2f$formula$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMatchIndices"])(text, indices);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: parts.map((p, i)=>p.isMatch ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-amber-400 font-semibold",
                children: p.text
            }, i, false, {
                fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                lineNumber: 25,
                columnNumber: 23
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: p.text
            }, i, false, {
                fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                lineNumber: 26,
                columnNumber: 23
            }, this))
    }, void 0, false);
}
// ─── category colour map ─────────────────────────────────────────────────────
const CATEGORY_COLOURS = {
    universe: 'text-muted-foreground',
    price: 'text-muted-foreground',
    ma: 'text-muted-foreground',
    oscillators: 'text-muted-foreground',
    trend: 'text-muted-foreground',
    volatility: 'text-muted-foreground',
    volume: 'text-muted-foreground',
    momentum: 'text-muted-foreground',
    channels: 'text-muted-foreground',
    ichimoku: 'text-muted-foreground',
    pivot: 'text-muted-foreground',
    relstrength: 'text-muted-foreground',
    price_action: 'text-muted-foreground',
    fundamental: 'text-muted-foreground',
    financial_health: 'text-muted-foreground',
    growth: 'text-muted-foreground',
    valuation: 'text-muted-foreground',
    quality: 'text-muted-foreground'
};
function catColour(id) {
    return CATEGORY_COLOURS[id] ?? 'text-muted-foreground';
}
// ─── build flat filtered list ────────────────────────────────────────────────
function fuzzyScore(query, target) {
    const q = query.toLowerCase();
    const t = target.toLowerCase();
    if (!q) return {
        score: 0,
        indices: []
    };
    const idx = t.indexOf(q);
    if (idx !== -1) {
        return {
            score: 1000 + (idx === 0 ? 200 : 0) - idx * 2,
            indices: Array.from({
                length: q.length
            }, (_, i)=>idx + i)
        };
    }
    let score = 0, qi = 0, last = -1;
    const matched = [];
    for(let ti = 0; ti < t.length && qi < q.length; ti++){
        if (t[ti] === q[qi]) {
            matched.push(ti);
            if (last === ti - 1) score += 10;
            if (ti === 0 || t[ti - 1] === ' ') score += 5;
            score++;
            last = ti;
            qi++;
        }
    }
    return qi === q.length ? {
        score,
        indices: matched
    } : {
        score: 0,
        indices: []
    };
}
function buildItems(mode, query) {
    if (mode === 'operator') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"].map((op)=>{
            const { score, indices } = query ? fuzzyScore(query, op.label) : {
                score: 100,
                indices: []
            };
            if (query && score === 0) return null;
            return {
                type: 'operator',
                id: op.id,
                label: op.label,
                category: 'Operator',
                dslName: op.dslOp,
                description: op.verb,
                matchScore: score,
                matchIndices: indices
            };
        }).filter(Boolean);
    }
    // indicator or rhs-indicator: search INDICATORS
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].filter((ind)=>ind.supported).map((ind)=>{
        const labelMatch = query ? fuzzyScore(query, ind.label) : {
            score: 0,
            indices: []
        };
        const dslMatch = query ? fuzzyScore(query, ind.dslName) : {
            score: 0,
            indices: []
        };
        const best = labelMatch.score >= dslMatch.score ? labelMatch : dslMatch;
        if (query && best.score === 0) return null;
        const cat = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_CATEGORIES"].find((c)=>c.id === ind.categoryId);
        let dslExample = ind.dslName;
        if (ind.params.length > 0) dslExample += `(${ind.params.map((p)=>p.defaultValue).join(',')})`;
        return {
            type: 'indicator',
            id: ind.id,
            label: ind.label,
            category: cat?.label ?? ind.categoryId,
            categoryId: ind.categoryId,
            dslName: ind.dslName,
            dslExample,
            params: ind.params.map((p)=>({
                    name: p.name,
                    defaultValue: p.defaultValue
                })),
            description: ind.description,
            matchScore: best.score,
            matchIndices: best.indices
        };
    }).filter(Boolean);
}
function FormulaAutocomplete({ mode, query, onSelect, onClose, position, anchorId }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const valuesScrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const categoryRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const [selectedIndex, setSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [activeCategoryId, setActiveCategoryId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [focusPanel, setFocusPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('value');
    // Dynamic positioning
    const [currentPos, setCurrentPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(position || {
        top: 0,
        left: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!anchorId) return;
        const update = ()=>{
            const el = document.getElementById(anchorId);
            if (el) {
                const r = el.getBoundingClientRect();
                if (r.top !== 0 || r.left !== 0) {
                    setCurrentPos({
                        top: r.bottom + 6,
                        left: r.left
                    });
                }
            }
        };
        update();
        // Track for a bit to handle animations
        const timer = setInterval(update, 100);
        const timeout = setTimeout(()=>clearInterval(timer), 2000);
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true); // Catch scroll in any container
        return ()=>{
            clearInterval(timer);
            clearTimeout(timeout);
            window.removeEventListener('resize', update);
            window.removeEventListener('scroll', update, true);
        };
    }, [
        anchorId
    ]);
    // reset selection when query changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setSelectedIndex(0);
    }, [
        query
    ]);
    // scroll selected into view
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        selRef.current?.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
        });
    }, [
        selectedIndex
    ]);
    // close on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = (e)=>{
            if (ref.current && !ref.current.contains(e.target)) onClose();
        };
        document.addEventListener('mousedown', handler);
        return ()=>document.removeEventListener('mousedown', handler);
    }, [
        onClose
    ]);
    const allItems = buildItems(mode, query);
    const filtered = query ? allItems.sort((a, b)=>b.matchScore - a.matchScore).slice(0, 20) : null; // null → use grouped view
    // Build category groups
    const groups = mode === 'operator' ? [
        {
            cat: {
                id: 'operators',
                label: 'Operators'
            },
            items: allItems
        }
    ] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_CATEGORIES"].map((cat)=>({
            cat,
            items: allItems.filter((it)=>it.categoryId === cat.id)
        })).filter((g)=>g.items.length > 0);
    // Set initial active category
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!activeCategoryId && groups.length > 0) {
            setActiveCategoryId(groups[0].cat.id);
        }
    }, [
        groups,
        activeCategoryId
    ]);
    // Scroll to category when selected
    const scrollToCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((catId)=>{
        const el = categoryRefs.current.get(catId);
        if (el && valuesScrollRef.current) {
            const container = valuesScrollRef.current;
            const containerRect = container.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            const scrollTop = el.offsetTop - container.offsetTop - 8;
            container.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });
        }
    }, []);
    // Update active category based on scroll position
    const handleValuesScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!valuesScrollRef.current) return;
        const container = valuesScrollRef.current;
        const scrollTop = container.scrollTop;
        for (const group of groups){
            const el = categoryRefs.current.get(group.cat.id);
            if (el) {
                const offsetTop = el.offsetTop - container.offsetTop;
                if (scrollTop >= offsetTop - 50) {
                    setActiveCategoryId(group.cat.id);
                }
            }
        }
    }, [
        groups
    ]);
    // handle custom keydown events from FormulaCell input
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            const ce = e;
            const key = ce.detail.key;
            const list = filtered ?? allItems;
            if (key === 'ArrowDown') {
                if (focusPanel === 'category') {
                    const currentIdx = groups.findIndex((g)=>g.cat.id === activeCategoryId);
                    const nextIdx = (currentIdx + 1) % groups.length;
                    const nextCat = groups[nextIdx].cat.id;
                    setActiveCategoryId(nextCat);
                    scrollToCategory(nextCat);
                } else {
                    setSelectedIndex((prev)=>(prev + 1) % list.length);
                }
            } else if (key === 'ArrowUp') {
                if (focusPanel === 'category') {
                    const currentIdx = groups.findIndex((g)=>g.cat.id === activeCategoryId);
                    const nextIdx = (currentIdx - 1 + groups.length) % groups.length;
                    const nextCat = groups[nextIdx].cat.id;
                    setActiveCategoryId(nextCat);
                    scrollToCategory(nextCat);
                } else {
                    setSelectedIndex((prev)=>(prev - 1 + list.length) % list.length);
                }
            } else if (key === 'ArrowLeft') {
                setFocusPanel('category');
            } else if (key === 'ArrowRight') {
                setFocusPanel('value');
            } else if (key === 'Enter') {
                if (list[selectedIndex]) {
                    onSelect(list[selectedIndex]);
                }
            }
        };
        document.addEventListener('formula-autocomplete-keydown', handleKeyDown);
        return ()=>document.removeEventListener('formula-autocomplete-keydown', handleKeyDown);
    }, [
        filtered,
        allItems,
        selectedIndex,
        onSelect,
        focusPanel,
        activeCategoryId,
        groups,
        scrollToCategory
    ]);
    // ── filtered view (with query) ──
    const renderFiltered = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-1",
            children: [
                (filtered ?? []).map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemRow, {
                        item: item,
                        isSelected: i === selectedIndex,
                        selRef: i === selectedIndex ? selRef : undefined,
                        onSelect: onSelect
                    }, item.id, false, {
                        fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                        lineNumber: 317,
                        columnNumber: 17
                    }, this)),
                filtered?.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-3 py-4 text-xs text-muted-foreground text-center",
                    children: "No matches"
                }, void 0, false, {
                    fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                    lineNumber: 321,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
            lineNumber: 315,
            columnNumber: 9
        }, this);
    const dropdownGrid = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "fixed z-[9999] rounded-xl border border-border bg-popover shadow-2xl overflow-hidden flex flex-col",
        style: {
            top: `${currentPos.top}px`,
            left: `${currentPos.left}px`,
            maxHeight: 600,
            width: filtered ? 320 : 520,
            opacity: currentPos.top === 0 && currentPos.left === 0 ? 0 : 1,
            pointerEvents: currentPos.top === 0 && currentPos.left === 0 ? 'none' : 'auto'
        },
        onMouseDown: (e)=>e.preventDefault(),
        children: [
            filtered ? // Filtered view (with search query)
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto",
                style: {
                    maxHeight: 540
                },
                children: renderFiltered()
            }, void 0, false, {
                fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                lineNumber: 342,
                columnNumber: 17
            }, this) : // Two-tier view
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-full",
                style: {
                    maxHeight: 540
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-44 border-r border-border flex-shrink-0 overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-1",
                            children: groups.map(({ cat })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setActiveCategoryId(cat.id);
                                        scrollToCategory(cat.id);
                                        setFocusPanel('value');
                                    },
                                    className: `w-full text-left px-3 py-2 text-xs font-medium transition-colors ${activeCategoryId === cat.id ? 'bg-amber-500/10 text-amber-500 border-r-2 border-amber-500' : 'text-muted-foreground hover:bg-accent hover:text-foreground'} ${focusPanel === 'category' && activeCategoryId === cat.id ? 'ring-1 ring-amber-500/30' : ''}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: catColour(cat.id),
                                        children: cat.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                                        lineNumber: 365,
                                        columnNumber: 37
                                    }, this)
                                }, cat.id, false, {
                                    fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                                    lineNumber: 352,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                            lineNumber: 350,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                        lineNumber: 349,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: valuesScrollRef,
                        className: "flex-1 overflow-y-auto",
                        onScroll: handleValuesScroll,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-1",
                            children: groups.map(({ cat, items })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: (el)=>{
                                        if (el) categoryRefs.current.set(cat.id, el);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `px-3 pt-2 pb-0.5 text-[10px] font-semibold uppercase tracking-widest sticky top-0 bg-popover/95 backdrop-blur-sm z-10 ${catColour(cat.id)}`,
                                            children: cat.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                                            lineNumber: 385,
                                            columnNumber: 37
                                        }, this),
                                        items.map((item, i)=>{
                                            const globalIdx = allItems.indexOf(item);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemRow, {
                                                item: item,
                                                isSelected: globalIdx === selectedIndex && focusPanel === 'value',
                                                selRef: globalIdx === selectedIndex ? selRef : undefined,
                                                onSelect: onSelect
                                            }, item.id, false, {
                                                fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                                                lineNumber: 391,
                                                columnNumber: 45
                                            }, this);
                                        })
                                    ]
                                }, cat.id, true, {
                                    fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                                    lineNumber: 379,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                            lineNumber: 377,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                        lineNumber: 372,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                lineNumber: 347,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-1 border-t border-border bg-muted/10 flex justify-between text-[10px] text-muted-foreground shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "↑↓ navigate"
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                        lineNumber: 408,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "←→ switch panel"
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                        lineNumber: 408,
                        columnNumber: 41
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "↵ select"
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                        lineNumber: 408,
                        columnNumber: 69
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Esc close"
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                        lineNumber: 408,
                        columnNumber: 90
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                lineNumber: 407,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
        lineNumber: 327,
        columnNumber: 9
    }, this);
    // Only portal on client-side
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>setMounted(true), []);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(dropdownGrid, document.body);
}
// ─── single row ──────────────────────────────────────────────────────────────
function ItemRow({ item, isSelected, selRef, onSelect }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: selRef ?? null,
        onMouseDown: (e)=>{
            e.preventDefault();
            onSelect(item);
        },
        className: `w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors ${isSelected ? 'bg-amber-500/10' : 'hover:bg-accent'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `text-[13px] font-medium truncate ${isSelected ? 'text-amber-400' : 'text-foreground'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Highlight, {
                            text: item.label,
                            indices: item.matchIndices
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                            lineNumber: 444,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                        lineNumber: 443,
                        columnNumber: 17
                    }, this),
                    item.dslExample && item.dslExample !== item.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] font-mono text-muted-foreground/70 truncate shrink-0",
                        children: item.dslExample
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                        lineNumber: 447,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                lineNumber: 442,
                columnNumber: 13
            }, this),
            item.type === 'operator' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "shrink-0 text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded",
                children: item.dslName
            }, void 0, false, {
                fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
                lineNumber: 453,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/screener/FormulaAutocomplete.tsx",
        lineNumber: 435,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/screener/FormulaCell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormulaCell",
    ()=>FormulaCell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-ssr] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$screener$2f$FormulaAutocomplete$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/screener/FormulaAutocomplete.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/screener/indicators.ts [app-ssr] (ecmascript)");
/**
 * Formula cell — tokenized pill row.
 * Each rule is represented as a row of interactive chips:
 *   [LHS indicator chip] [Operator chip] [RHS value/indicator chip]
 *
 * Clicking any chip opens a contextual dropdown for that slot.
 * Empty cells auto-open the indicator dropdown immediately.
 */ 'use client';
;
;
;
;
;
;
function buildDslFromTokens(t) {
    if (!t.lhsId || !t.opId) return '';
    const lhsInd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].find((i)=>i.id === t.lhsId);
    if (!lhsInd) return '';
    let lhs = lhsInd.dslName;
    if (lhsInd.params.length > 0) {
        const pv = t.lhsParams.length ? t.lhsParams : lhsInd.params.map((p)=>p.defaultValue);
        lhs = `${lhsInd.dslName}(${pv.join(',')})`;
    }
    const op = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"].find((o)=>o.id === t.opId);
    if (!op) return lhs;
    if (op.valueConfig.type === 'none') return `${lhs} ${op.dslOp}`;
    let rhs = t.rhsValue;
    if (t.rhsType === 'indicator' && t.rhsValue) {
        const rhsInd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].find((i)=>i.id === t.rhsValue);
        if (rhsInd) {
            rhs = rhsInd.dslName;
            if (rhsInd.params.length > 0) {
                const pv = t.rhsParams.length ? t.rhsParams : rhsInd.params.map((p)=>p.defaultValue);
                rhs = `${rhsInd.dslName}(${pv.join(',')})`;
            }
        }
    }
    if (!rhs) return `${lhs} ${op.dslOp}`;
    return `${lhs} ${op.dslOp} ${rhs}`;
}
function parseTokensFromCriterion(c) {
    return {
        lhsId: c.indicatorId || null,
        lhsParams: c.paramValues ? Object.values(c.paramValues) : [],
        opId: c.operatorId || null,
        rhsType: c.rhsIndicatorId ? 'indicator' : 'number',
        rhsValue: c.rhsIndicatorId || c.rhsValue || '',
        rhsParams: c.rhsParamValues ? Object.values(c.rhsParamValues) : [],
        timeframe: 'Daily'
    };
}
// ─── pill chip ───────────────────────────────────────────────────────────────
function Chip({ label, placeholder, active, query, onQueryChange, onClick, onKeyDown, compact = false, isOperator = false }) {
    const isEmpty = !label && !active;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-flex",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onMouseDown: (e)=>{
                e.stopPropagation();
                onClick(e);
            },
            className: `inline-flex items-center gap-1 rounded cursor-pointer ${compact ? 'px-0 py-0.5 text-[13px]' : 'px-0 py-0.5 text-[15px]'} font-medium transition-all duration-200 active:scale-[0.97] select-none ${compact ? 'min-h-[20px]' : 'min-h-[24px]'} leading-none
                    ${isEmpty ? 'border border-dashed border-border text-primary/50 hover:border-primary/50 hover:text-primary/70' : active ? 'bg-primary/10 text-primary border border-primary/40 ring-1 ring-primary/30' : isOperator ? 'text-primary hover:bg-muted/50' : 'text-foreground hover:bg-muted/50'}`,
            children: active && onQueryChange !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                autoFocus: true,
                value: query ?? '',
                onChange: (e)=>onQueryChange(e.target.value),
                onKeyDown: onKeyDown,
                className: "bg-transparent outline-none min-w-[0px] w-full text-primary placeholder:text-primary/50 font-mono text-[13px] leading-none",
                placeholder: placeholder,
                onMouseDown: (e)=>e.stopPropagation()
            }, void 0, false, {
                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                lineNumber: 124,
                columnNumber: 21
            }, this) : isEmpty ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "italic text-primary/70",
                children: placeholder
            }, void 0, false, {
                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                lineNumber: 134,
                columnNumber: 21
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: active ? '' : 'font-bold',
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                lineNumber: 136,
                columnNumber: 21
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/screener/FormulaCell.tsx",
            lineNumber: 111,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/screener/FormulaCell.tsx",
        lineNumber: 110,
        columnNumber: 9
    }, this);
}
function FormulaCell({ criterion, index, onToggle, onRemove, onUpdate, onReorder }) {
    const [tokens, setTokens] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>parseTokensFromCriterion(criterion));
    const [activeSlot, setActiveSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dropdownPos, setDropdownPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        top: 0,
        left: 0
    });
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDragOver, setIsDragOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const cellRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // re-sync if criterion changes externally
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setTokens(parseTokensFromCriterion(criterion));
    }, [
        criterion.indicatorId,
        criterion.operatorId,
        criterion.rhsValue,
        criterion.rhsIndicatorId
    ]);
    // auto-open LHS dropdown for empty cells
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!criterion.dslString && !criterion.indicatorId) {
            const el = cellRef.current?.querySelector('[data-slot="lhs"] button');
            if (el) {
                // Use requestAnimationFrame to ensure DOM is fully laid out
                requestAnimationFrame(()=>{
                    setTimeout(()=>openSlot('lhs', el), 50);
                });
            }
        }
    }, []);
    function openSlot(slot, el) {
        let attempts = 0;
        const maxAttempts = 10;
        const calculate = ()=>{
            const r = el.getBoundingClientRect();
            // If the element is reporting (0,0) or a very suspicious top position for a mid-page element, 
            // and we haven't exhausted attempts, wait for next frame.
            // Note: 20 is a safe threshold for "too high" if we expect it below the header.
            if (r.top < 20 && r.left === 0 && attempts < maxAttempts) {
                attempts++;
                requestAnimationFrame(calculate);
                return;
            }
            setDropdownPos({
                top: r.bottom + window.scrollY + 6,
                left: r.left + window.scrollX
            });
            setActiveSlot(slot);
            setSearchQuery('');
        };
        requestAnimationFrame(calculate);
    }
    function closeSlot() {
        setActiveSlot(null);
        setSearchQuery('');
    }
    function commit(next) {
        setTokens(next);
        const dsl = buildDslFromTokens(next);
        if (dsl && onUpdate) onUpdate(criterion.id, dsl);
    }
    // ── Universal slot handler ──
    function handleSelect(item) {
        if (!activeSlot) return;
        const val = item.type === 'number' ? Number(item.label) : item.id;
        if (activeSlot === 'lhs') {
            const ind = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].find((i)=>i.id === item.id);
            const params = ind?.params.map((p)=>p.defaultValue) ?? [];
            commit({
                ...tokens,
                lhsId: item.id,
                lhsParams: params
            });
            const el = cellRef.current?.querySelector('[data-slot="op"] button');
            if (el) setTimeout(()=>openSlot('op', el), 50);
            else closeSlot();
        } else if (activeSlot === 'op') {
            commit({
                ...tokens,
                opId: item.id
            });
            const op = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"].find((o)=>o.id === item.id);
            if (!op || op.valueConfig.type === 'none') {
                closeSlot();
                return;
            }
            const el = cellRef.current?.querySelector('[data-slot="rhs"] button');
            if (el) setTimeout(()=>openSlot(op.rhsCanBeIndicator ? 'rhs' : 'rhs-value', el), 50);
            else closeSlot();
        } else if (activeSlot === 'rhs') {
            const ind = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].find((i)=>i.id === item.id);
            const params = ind?.params.map((p)=>p.defaultValue) ?? [];
            commit({
                ...tokens,
                rhsType: 'indicator',
                rhsValue: item.id,
                rhsParams: params
            });
            closeSlot();
        } else if (activeSlot === 'rhs-value') {
            commit({
                ...tokens,
                rhsValue: String(val)
            });
            closeSlot();
        } else if (activeSlot.startsWith('lhs-param-')) {
            const idx = parseInt(activeSlot.split('-')[2]);
            const newParams = [
                ...tokens.lhsParams
            ];
            newParams[idx] = val;
            commit({
                ...tokens,
                lhsParams: newParams
            });
            closeSlot();
        } else if (activeSlot.startsWith('rhs-param-')) {
            const idx = parseInt(activeSlot.split('-')[2]);
            const newParams = [
                ...tokens.rhsParams
            ];
            newParams[idx] = val;
            commit({
                ...tokens,
                rhsParams: newParams
            });
            closeSlot();
        }
    }
    const dropdownMode = activeSlot === 'op' ? 'operator' : activeSlot === 'rhs' ? 'rhs-indicator' : 'indicator';
    const handleKeyDown = (e)=>{
        if (e.key === 'Escape') {
            e.preventDefault();
            closeSlot();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter') {
            e.preventDefault();
            document.dispatchEvent(new CustomEvent('formula-autocomplete-keydown', {
                detail: {
                    key: e.key
                }
            }));
        }
    };
    // ── drag ──
    const handleDragStart = (e)=>{
        if (activeSlot) return;
        setIsDragging(true);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index.toString());
    };
    const handleDragEnd = ()=>{
        setIsDragging(false);
        setIsDragOver(false);
    };
    const handleDragOver = (e)=>{
        if (activeSlot) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setIsDragOver(true);
    };
    const handleDragLeave = ()=>setIsDragOver(false);
    const handleDrop = (e)=>{
        e.preventDefault();
        setIsDragOver(false);
        const from = parseInt(e.dataTransfer.getData('text/plain'));
        if (!isNaN(from) && from !== index && onReorder) onReorder(from, index);
    };
    const [tfOpen, setTfOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const tfRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [tfDropdownPos, setTfDropdownPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        top: 0,
        left: 0
    });
    const TIMEFRAME_CATEGORIES = {
        'Intraday': [
            '1min',
            '2min',
            '3min',
            '5min',
            '10min',
            '15min',
            '30min',
            '1hour',
            '75min',
            '2hour',
            '125min',
            '3hour',
            '4hour'
        ],
        'Daily': [
            'Daily',
            '1 day ago',
            '2 day ago',
            '3 day ago',
            '4 day ago'
        ],
        'Weekly': [
            'Weekly',
            '1 week ago',
            '2 week ago',
            '3 week ago',
            '4 week ago'
        ],
        'Monthly': [
            'Monthly',
            '1 month ago',
            '2 month ago',
            '3 month ago',
            '4 month ago'
        ],
        'Quarterly': [
            'Quarterly',
            '1 quarter ago',
            '2 quarter ago',
            '3 quarter ago',
            '4 quarter ago'
        ],
        'Yearly': [
            'Yearly',
            '1 year ago',
            '2 year ago',
            '3 year ago',
            '4 year ago'
        ]
    };
    // Calculate dropdown width based on longest string
    const allTimeframes = [
        ...TIMEFRAME_CATEGORIES.Intraday,
        ...TIMEFRAME_CATEGORIES.Daily,
        ...TIMEFRAME_CATEGORIES.Weekly,
        ...TIMEFRAME_CATEGORIES.Monthly,
        ...TIMEFRAME_CATEGORIES.Quarterly,
        ...TIMEFRAME_CATEGORIES.Yearly,
        ...Object.keys(TIMEFRAME_CATEGORIES)
    ];
    const longestString = allTimeframes.reduce((longest, current)=>current.length > longest.length ? current : longest, '');
    const dropdownWidth = Math.max(longestString.length * 8 + 40, 100); // 8px per character + padding
    // close timeframe dropdown on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!tfOpen) return;
        const handler = (e)=>{
            if (tfRef.current && !tfRef.current.contains(e.target)) setTfOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return ()=>document.removeEventListener('mousedown', handler);
    }, [
        tfOpen
    ]);
    // ── Interactive Expr Renderer ──
    const InteractiveExpr = ({ prefix, indId, params })=>{
        const ind = indId ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].find((i)=>i.id === indId) : null;
        if (!ind) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": prefix,
                id: `${prefix}-${criterion.id}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                    placeholder: "Select indicator",
                    active: activeSlot === prefix,
                    query: activeSlot === prefix ? searchQuery : undefined,
                    onQueryChange: setSearchQuery,
                    onKeyDown: handleKeyDown,
                    onClick: (e)=>openSlot(prefix, e.currentTarget)
                }, void 0, false, {
                    fileName: "[project]/src/components/screener/FormulaCell.tsx",
                    lineNumber: 354,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                lineNumber: 353,
                columnNumber: 17
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center gap-0 group/chip",
            children: [
                prefix === 'lhs' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: tfRef,
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onMouseDown: (e)=>{
                                e.stopPropagation();
                                const rect = e.currentTarget.getBoundingClientRect();
                                const dropdownHeight = 300;
                                const dropdownWidth = Math.max(longestString.length * 8 + 40, 100);
                                const viewportHeight = window.innerHeight;
                                const viewportWidth = window.innerWidth;
                                let top = rect.bottom + 6;
                                let left = rect.left;
                                // Check if dropdown would go below viewport
                                if (top + dropdownHeight > viewportHeight) {
                                    // Position above the button instead
                                    top = rect.top - dropdownHeight - 6;
                                }
                                // Check if dropdown would go beyond right edge
                                if (left + dropdownWidth > viewportWidth) {
                                    // Align to right edge
                                    left = viewportWidth - dropdownWidth - 10;
                                }
                                setTfDropdownPos({
                                    top,
                                    left
                                });
                                setTfOpen((v)=>!v);
                            },
                            className: "inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60 hover:bg-muted/60 hover:text-foreground transition-colors leading-none",
                            children: tokens.timeframe
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/FormulaCell.tsx",
                            lineNumber: 371,
                            columnNumber: 25
                        }, this),
                        tfOpen && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute z-[9999] bg-popover border border-border rounded-md shadow-lg",
                            style: {
                                top: `${tfDropdownPos.top + window.scrollY}px`,
                                left: `${tfDropdownPos.left + window.scrollX}px`,
                                width: `${dropdownWidth}px`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-hidden max-h-[300px] overflow-y-auto",
                                children: Object.entries(TIMEFRAME_CATEGORIES).map(([category, options])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-b border-border last:border-b-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80 bg-muted/30",
                                                children: category
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                                lineNumber: 412,
                                                columnNumber: 45
                                            }, this),
                                            options.map((tf)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onMouseDown: (e)=>{
                                                        e.stopPropagation();
                                                        setTokens((prev)=>({
                                                                ...prev,
                                                                timeframe: tf
                                                            }));
                                                        setTfOpen(false);
                                                    },
                                                    className: `w-full text-left px-3 py-1.5 text-[13px] transition-colors ${tokens.timeframe === tf ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent'}`,
                                                    children: tf
                                                }, tf, false, {
                                                    fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 49
                                                }, this))
                                        ]
                                    }, category, true, {
                                        fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                        lineNumber: 411,
                                        columnNumber: 41
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                lineNumber: 409,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/FormulaCell.tsx",
                            lineNumber: 403,
                            columnNumber: 29
                        }, this), document.body)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/screener/FormulaCell.tsx",
                    lineNumber: 370,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "data-slot": prefix,
                    id: `${prefix}-${criterion.id}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                        label: ind.label,
                        placeholder: ind.label,
                        active: activeSlot === prefix,
                        query: activeSlot === prefix ? searchQuery : undefined,
                        onQueryChange: setSearchQuery,
                        onKeyDown: handleKeyDown,
                        onClick: (e)=>openSlot(prefix, e.currentTarget),
                        compact: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaCell.tsx",
                        lineNumber: 437,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/screener/FormulaCell.tsx",
                    lineNumber: 436,
                    columnNumber: 17
                }, this),
                ind.params.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-foreground font-mono text-[13px]",
                            children: "("
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/FormulaCell.tsx",
                            lineNumber: 451,
                            columnNumber: 25
                        }, this),
                        ind.params.map((p, i)=>{
                            const val = params[i] ?? p.defaultValue;
                            const slotName = `${prefix}-param-${i}`;
                            const isParamActive = activeSlot === slotName;
                            let displayVal = String(val);
                            if (typeof val === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].some((ind)=>ind.id === val)) {
                                displayVal = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].find((ind)=>ind.id === val)?.label || val;
                            }
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                children: [
                                    i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-foreground font-mono text-[13px]",
                                        children: ","
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                        lineNumber: 464,
                                        columnNumber: 47
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        id: `${slotName}-${criterion.id}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                            label: displayVal,
                                            placeholder: p.name,
                                            active: isParamActive,
                                            query: isParamActive ? searchQuery : undefined,
                                            onQueryChange: setSearchQuery,
                                            onKeyDown: handleKeyDown,
                                            onClick: (e)=>openSlot(slotName, e.currentTarget),
                                            compact: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                            lineNumber: 466,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                        lineNumber: 465,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                lineNumber: 463,
                                columnNumber: 33
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-foreground font-mono text-[13px]",
                            children: ")"
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/FormulaCell.tsx",
                            lineNumber: 480,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/screener/FormulaCell.tsx",
            lineNumber: 367,
            columnNumber: 13
        }, this);
    };
    const opDef = tokens.opId ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"].find((o)=>o.id === tokens.opId) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cellRef,
        draggable: !activeSlot && !!criterion.dslString,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        className: `group flex items-center gap-0 px-1 py-0.5 transition-all duration-300 ease-out ${!criterion.enabled ? 'opacity-50' : ''} ${isDragging ? 'opacity-40 scale-[0.98]' : ''} ${isDragOver ? 'bg-amber-500/5 scale-[1.01]' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-center gap-0 flex-wrap min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InteractiveExpr, {
                        prefix: "lhs",
                        indId: tokens.lhsId,
                        params: tokens.lhsParams
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaCell.tsx",
                        lineNumber: 509,
                        columnNumber: 17
                    }, this),
                    tokens.lhsId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground/30 text-[13px] px-0.5 select-none leading-none",
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                lineNumber: 514,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-slot": "op",
                                id: `op-${criterion.id}`,
                                className: "group/chip",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                    label: opDef?.label,
                                    placeholder: "operator",
                                    active: activeSlot === 'op',
                                    query: activeSlot === 'op' ? searchQuery : undefined,
                                    onQueryChange: setSearchQuery,
                                    onKeyDown: handleKeyDown,
                                    onClick: (e)=>openSlot('op', e.currentTarget),
                                    compact: true,
                                    isOperator: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                    lineNumber: 516,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                lineNumber: 515,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true),
                    tokens.lhsId && tokens.opId && opDef && opDef.valueConfig.type !== 'none' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground/30 text-[13px] px-0.5 select-none leading-none",
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                lineNumber: 534,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-slot": "rhs",
                                id: `rhs-${criterion.id}`,
                                children: activeSlot === 'rhs-value' || !opDef.rhsCanBeIndicator && tokens.rhsType === 'number' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                    label: tokens.rhsValue,
                                    placeholder: "value",
                                    active: activeSlot === 'rhs-value',
                                    query: activeSlot === 'rhs-value' ? searchQuery : undefined,
                                    onQueryChange: setSearchQuery,
                                    onKeyDown: handleKeyDown,
                                    onClick: (e)=>openSlot('rhs-value', e.currentTarget),
                                    compact: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                    lineNumber: 537,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InteractiveExpr, {
                                    prefix: "rhs",
                                    indId: tokens.rhsType === 'indicator' ? tokens.rhsValue : null,
                                    params: tokens.rhsParams
                                }, void 0, false, {
                                    fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                    lineNumber: 548,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                                lineNumber: 535,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true),
                    !criterion.supported && criterion.dslString && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-amber-500/70",
                        children: "⚠ unsupported"
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaCell.tsx",
                        lineNumber: 556,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                lineNumber: 507,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onMouseDown: (e)=>{
                            e.stopPropagation();
                            onToggle(criterion.id);
                        },
                        className: "p-1 rounded text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10",
                        title: criterion.enabled ? 'Disable' : 'Enable',
                        children: criterion.enabled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/FormulaCell.tsx",
                            lineNumber: 567,
                            columnNumber: 42
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/FormulaCell.tsx",
                            lineNumber: 567,
                            columnNumber: 78
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaCell.tsx",
                        lineNumber: 562,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onMouseDown: (e)=>{
                            e.stopPropagation(); /* TODO Duplicate */ 
                        },
                        className: "p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted",
                        title: "Duplicate",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/FormulaCell.tsx",
                            lineNumber: 574,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaCell.tsx",
                        lineNumber: 569,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onMouseDown: (e)=>{
                            e.stopPropagation();
                            onRemove(criterion.id);
                        },
                        className: "p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                        title: "Delete",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/FormulaCell.tsx",
                            lineNumber: 581,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/FormulaCell.tsx",
                        lineNumber: 576,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                lineNumber: 561,
                columnNumber: 13
            }, this),
            activeSlot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$screener$2f$FormulaAutocomplete$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormulaAutocomplete"], {
                mode: dropdownMode,
                query: searchQuery,
                onSelect: handleSelect,
                onClose: closeSlot,
                position: dropdownPos,
                anchorId: `${activeSlot}-${criterion.id}`
            }, void 0, false, {
                fileName: "[project]/src/components/screener/FormulaCell.tsx",
                lineNumber: 587,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/screener/FormulaCell.tsx",
        lineNumber: 490,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/screener/ConditionBuilder.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConditionBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code-xml.js [app-ssr] (ecmascript) <export default as Code2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wand-sparkles.js [app-ssr] (ecmascript) <export default as Wand2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$screener$2f$FormulaCell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/screener/FormulaCell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/screener/indicators.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
// ─── Indicator→ScreenerFilters mapping ──────────────────────────────────────
const INDICATOR_TO_FILTER_KEY = {
    mcap: 'marketCapCr',
    pe: 'peTtm',
    pb: 'pb',
    ev_ebitda: 'evEbitda',
    div_yield: 'dividendYield',
    eps_ttm: 'epsGrowth1y',
    roce: 'roce',
    roe: 'roe',
    pat_margin: 'patMargin',
    op_margin: 'operatingMargin',
    rev_g1y: 'revenueGrowth1y',
    rev_g3y: 'revenueGrowth3y',
    pat_g1y: 'patGrowth1y',
    pat_g3y: 'patGrowth1y',
    eps_g1y: 'epsGrowth1y',
    de: 'debtEquity',
    ic: 'interestCoverage',
    current_ratio: 'currentRatio',
    quality_score: 'qualityScore',
    rsi: 'rsi14',
    pctFrom52wHigh: 'pctFrom52wHigh',
    pct55wLow: 'pctFrom52wLow'
};
const UNIVERSE_OPTIONS = {
    uni_mcap_bucket: {
        filterKey: 'marketCapBucket',
        options: [
            'large',
            'mid',
            'small',
            'micro'
        ]
    },
    uni_sector: {
        filterKey: 'sector',
        options: []
    },
    uni_instrument_type: {
        filterKey: 'assetClass',
        options: [
            'equity',
            'etf',
            'reit',
            'invit'
        ]
    },
    uni_index: {
        filterKey: 'indexMembership',
        options: [
            'nifty50',
            'next50',
            'nifty100',
            'nifty200',
            'nifty500',
            'niftybank',
            'midcap150',
            'smallcap250',
            'sensex'
        ]
    }
};
// ─── Style helpers ────────────────────────────────────────────────────────────
const COL_HEADER = 'px-3 py-2 border-b border-border text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30 shrink-0 select-none';
const itemCls = (active)=>`group w-full text-left px-2.5 py-1.5 text-sm rounded-md transition-all duration-100 flex items-center justify-between gap-1.5 cursor-pointer ${active ? 'bg-amber-500/10 text-amber-500 font-medium' : 'text-foreground/80 hover:bg-accent hover:text-foreground'}`;
// Inline param spinner inside an indicator row
function ParamSpinner({ value, onChange, param, onClick }) {
    // Determine if we should render a numeric spinner or text input
    const isNumber = typeof value === 'number' || !isNaN(Number(value)) && String(value).trim() !== '';
    if (!isNumber && typeof value === 'string') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            value: value,
            onChange: (e)=>onChange(e.target.value),
            onClick: onClick,
            className: "w-16 h-6 px-1.5 text-xs text-center border-none bg-amber-500/10 text-amber-500 rounded focus:ring-1 focus:ring-amber-500 outline-none placeholder:text-amber-500/30 font-mono",
            placeholder: param.label
        }, void 0, false, {
            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
            lineNumber: 99,
            columnNumber: 13
        }, this);
    }
    // Original numeric spinner
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: "number",
        value: value,
        min: param.min,
        max: param.max,
        step: param.step ?? 1,
        onClick: onClick,
        onChange: (e)=>{
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) onChange(val);
        },
        className: "w-12 h-6 px-0 text-xs text-center border-none bg-amber-500/10 text-amber-500 rounded appearance-none focus:ring-1 focus:ring-amber-500 outline-none [&::-webkit-inner-spin-button]:appearance-none font-mono"
    }, void 0, false, {
        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
        lineNumber: 112,
        columnNumber: 9
    }, this);
}
function ConditionBuilder({ filters, onChange, onRun, rulesViewMode, screenName }) {
    const visualBuilderDialogId = 'screener-visual-builder-dialog';
    const visualBuilderTriggerId = 'screener-visual-builder-trigger';
    // ── Visual builder dialog state ──────────────────────────────────────
    const [visualBuilderOpen, setVisualBuilderOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // ── Visual builder state ──────────────────────────────────────────────
    const [selectedCatId, setSelectedCatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_CATEGORIES"][0].id);
    const [selectedLhsId, setSelectedLhsId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lhsParams, setLhsParams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [selectedOpId, setSelectedOpId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // RHS — either "number" mode or "indicator" mode
    const [rhsMode, setRhsMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('number');
    const [rhsNumber, setRhsNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [rhsNumber2, setRhsNumber2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(''); // for "between"
    const [rhsIndId, setRhsIndId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rhsIndParams, setRhsIndParams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    // Active criteria
    const [criteria, setCriteria] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // DSL input mode — separate state, persisted alongside criteria
    const [dslInput, setDslInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // ── Save ─────────────────────────────────────────────────────────────
    const [saveScreenName, setSaveScreenName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // ── Derived ───────────────────────────────────────────────────────────
    const lhsIndicators = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].filter((i)=>i.categoryId === selectedCatId);
    const lhsInd = selectedLhsId ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].find((i)=>i.id === selectedLhsId) ?? null : null;
    const selectedOp = selectedOpId ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"].find((o)=>o.id === selectedOpId) ?? null : null;
    const FUND_CATS = new Set([
        'fundamental',
        'financial_health',
        'growth',
        'valuation',
        'quality',
        'universe'
    ]);
    const isLhsFund = lhsInd ? FUND_CATS.has(lhsInd.categoryId) : false;
    const isLhsEnum = lhsInd?.rhsType === 'enum';
    // enum indicators only use the "=" (eq) operator
    const availableOps = isLhsEnum ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"].filter((o)=>o.id === 'eq' || o.id === 'gt') : isLhsFund ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"].filter((o)=>!o.technicalOnly) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"];
    // RHS indicator column: only show when operator expects an indicator or value+indicator
    const vc = selectedOp?.valueConfig;
    const opNeedsRhs = vc && vc.type !== 'none';
    const opCanBeInd = selectedOp?.rhsCanBeIndicator && lhsInd?.rhsType !== 'number';
    // For crossover operators default rhsMode to 'indicator'
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedOp && [
            'ca',
            'cb',
            'tocha',
            'tochb',
            'bon_up',
            'bon_dn'
        ].includes(selectedOp.id)) {
            setRhsMode('indicator');
        } else {
            setRhsMode('number');
        }
        setRhsNumber('');
        setRhsNumber2('');
        setRhsIndId(null);
        setRhsIndParams({});
    }, [
        selectedOpId
    ]);
    // When LHS indicator changes → reset params to defaults, pick first op
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!lhsInd) return;
        const def = {};
        lhsInd.params.forEach((p)=>{
            def[p.name] = p.defaultValue;
        });
        setLhsParams(def);
        setRhsNumber('');
        if (lhsInd.rhsType === 'enum') {
            // auto-select first enum option
            const firstOpt = lhsInd.enumOptions?.[0]?.value ?? '';
            setRhsNumber(firstOpt);
            const eqOp = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"].find((o)=>o.id === 'eq' || o.id === 'gt');
            if (eqOp) setSelectedOpId(eqOp.id);
        } else {
            const firstOp = isLhsFund ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"].find((o)=>!o.technicalOnly) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPERATORS"][0];
            if (firstOp) setSelectedOpId(firstOp.id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selectedLhsId
    ]);
    // When category changes → auto-select first indicator
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const first = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].find((i)=>i.categoryId === selectedCatId);
        setSelectedLhsId(first?.id ?? null);
    }, [
        selectedCatId
    ]);
    // When RHS indicator changes → populate defaults
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!rhsIndId) return;
        const ind = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].find((i)=>i.id === rhsIndId);
        if (!ind) return;
        const def = {};
        ind.params.forEach((p)=>{
            def[p.name] = p.defaultValue;
        });
        setRhsIndParams(def);
    }, [
        rhsIndId
    ]);
    // ── DSL build helpers ─────────────────────────────────────────────────
    const buildLhsDsl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!lhsInd) return '';
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dslExpr"])(lhsInd, lhsInd.params.map((p)=>lhsParams[p.name] ?? p.defaultValue));
    }, [
        lhsInd,
        lhsParams
    ]);
    const buildRhsDsl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!selectedOp) return '';
        const vcl = selectedOp.valueConfig;
        if (vcl.type === 'none') return '';
        if (vcl.type === 'days') return rhsNumber;
        if (rhsMode === 'indicator' && rhsIndId) {
            const rInd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].find((i)=>i.id === rhsIndId);
            if (!rInd) return '';
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dslExpr"])(rInd, rInd.params.map((p)=>rhsIndParams[p.name] ?? p.defaultValue));
        }
        return rhsNumber;
    }, [
        selectedOp,
        rhsMode,
        rhsNumber,
        rhsIndId,
        rhsIndParams
    ]);
    // ── canAdd ────────────────────────────────────────────────────────────
    const canAdd = ()=>{
        if (!lhsInd || !selectedOp) return false;
        if (lhsInd.rhsType === 'enum') return rhsNumber.trim() !== '';
        const vcl = selectedOp.valueConfig;
        if (vcl.type === 'none') return true;
        if (vcl.type === 'two_numbers') return rhsNumber.trim() !== '' && rhsNumber2.trim() !== '';
        if (rhsMode === 'indicator') return !!rhsIndId;
        return rhsNumber.trim() !== '';
    };
    // ── Add criterion ─────────────────────────────────────────────────────
    const handleAddCriterion = ()=>{
        if (!lhsInd || !selectedOp || !canAdd()) return;
        const lhsExpr = buildLhsDsl();
        const rhsExpr = buildRhsDsl();
        const vcl = selectedOp.valueConfig;
        // Build human display string
        const lhsLabel = lhsInd.params.length > 0 ? `${lhsInd.label}(${lhsInd.params.map((p)=>lhsParams[p.name] ?? p.defaultValue).join(',')})` : lhsInd.label;
        let rhsLabel = rhsExpr;
        if (lhsInd.rhsType === 'enum' && lhsInd.enumOptions) {
            const opt = lhsInd.enumOptions.find((o)=>o.value === rhsNumber);
            if (opt) rhsLabel = opt.label;
        } else if (rhsMode === 'indicator' && rhsIndId) {
            const rInd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS"].find((i)=>i.id === rhsIndId);
            if (rInd) rhsLabel = rInd.params.length > 0 ? `${rInd.label}(${rInd.params.map((p)=>rhsIndParams[p.name] ?? p.defaultValue).join(',')})` : rInd.label;
        }
        const displayString = lhsInd.rhsType === 'enum' ? `${lhsLabel} is ${rhsLabel}` : vcl.type === 'none' ? `${lhsLabel} ${selectedOp.verb}` : vcl.type === 'two_numbers' ? `${lhsLabel} ${selectedOp.verb} ${rhsNumber} – ${rhsNumber2}` : `${lhsLabel} ${selectedOp.verb} ${rhsLabel}`;
        const dslString = vcl.type === 'two_numbers' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDslCriterion"])(lhsExpr, selectedOp, rhsNumber, Number(rhsNumber2), lhsInd) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDslCriterion"])(lhsExpr, selectedOp, rhsExpr, undefined, lhsInd);
        const newCrit = {
            id: `crit-${Date.now()}`,
            indicatorId: lhsInd.id,
            paramValues: {
                ...lhsParams
            },
            operatorId: selectedOp.id,
            rhsValue: rhsMode === 'indicator' ? rhsExpr : rhsNumber,
            rhsValue2: vcl.type === 'two_numbers' ? rhsNumber2 : undefined,
            rhsIndicatorId: rhsMode === 'indicator' ? rhsIndId ?? undefined : undefined,
            rhsParamValues: rhsMode === 'indicator' ? {
                ...rhsIndParams
            } : undefined,
            displayString,
            dslString,
            simpleKey: INDICATOR_TO_FILTER_KEY[lhsInd.id],
            supported: lhsInd.supported,
            enabled: true
        };
        const updated = [
            ...criteria,
            newCrit
        ];
        setCriteria(updated);
        rebuildFilters(updated);
        setRhsNumber('');
        setRhsNumber2('');
    };
    const handleRemove = (id)=>{
        const updated = criteria.filter((c)=>c.id !== id);
        setCriteria(updated);
        rebuildFilters(updated);
    };
    const handleToggleCriterion = (id)=>{
        const updated = criteria.map((c)=>c.id === id ? {
                ...c,
                enabled: !c.enabled
            } : c);
        setCriteria(updated);
        rebuildFilters(updated);
    };
    const handleClearAll = ()=>{
        setCriteria([]);
        setDslInput('');
        onChange({});
    };
    const handleReorder = (fromIndex, toIndex)=>{
        const updated = [
            ...criteria
        ];
        const [movedItem] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, movedItem);
        setCriteria(updated);
        rebuildFilters(updated);
    };
    const handleUpdateCriterion = (id, newDsl)=>{
        const updated = criteria.map((c)=>{
            if (c.id === id) {
                return {
                    ...c,
                    dslString: newDsl,
                    displayString: newDsl
                };
            }
            return c;
        });
        setCriteria(updated);
        rebuildFilters(updated);
    };
    // ── Rebuild ScreenerFilters ───────────────────────────────────────────
    const rebuildFilters = (crs)=>{
        // Filter out empty criteria (no dslString)
        const active = crs.filter((c)=>c.enabled && c.dslString);
        const nf = {};
        if (filters.query) nf.query = filters.query;
        active.filter((c)=>c.simpleKey && [
                'gt',
                'lt',
                'gte',
                'lte',
                'between'
            ].includes(c.operatorId)).forEach((c)=>{
            const existing = nf[c.simpleKey] || {};
            const v1 = Number(c.rhsValue), v2 = c.rhsValue2 ? Number(c.rhsValue2) : undefined;
            let m = {
                ...existing
            };
            if (c.operatorId === 'gt' || c.operatorId === 'gte') m = {
                ...m,
                min: v1
            };
            else if (c.operatorId === 'lt' || c.operatorId === 'lte') m = {
                ...m,
                max: v1
            };
            else if (c.operatorId === 'between') m = {
                ...m,
                min: v1,
                max: v2
            };
            // @ts-ignore
            nf[c.simpleKey] = m;
        });
        active.filter((c)=>UNIVERSE_OPTIONS[c.indicatorId]).forEach((c)=>{
            const cfg = UNIVERSE_OPTIONS[c.indicatorId];
            const existing = nf[cfg.filterKey] || [];
            const val = c.rhsValue.trim();
            if (val && !existing.includes(val)) {
                // @ts-ignore
                nf[cfg.filterKey] = [
                    ...existing,
                    val
                ];
            }
        });
        const dslCrs = active.filter((c)=>!c.simpleKey && !UNIVERSE_OPTIONS[c.indicatorId] && c.dslString);
        // Also include raw DSL lines entered in the DSL input box
        const rawDslLines = dslInput.split('\n').map((l)=>l.trim()).filter(Boolean);
        const allFormula = [
            ...dslCrs.map((c)=>c.dslString),
            ...rawDslLines
        ];
        if (allFormula.length > 0) nf.formula = allFormula;
        onChange(nf);
    };
    // ── Parse DSL input lines into criteria ───────────────────────────────
    const handleDslInputChange = (val)=>{
        setDslInput(val);
        // Rebuild filters to keep DSL lines in sync — only pass raw lines, don't parse into chips
        const active = criteria.filter((c)=>c.enabled && c.dslString);
        const nf = {};
        if (filters.query) nf.query = filters.query;
        active.filter((c)=>c.simpleKey && [
                'gt',
                'lt',
                'gte',
                'lte',
                'between'
            ].includes(c.operatorId)).forEach((c)=>{
            const existing = nf[c.simpleKey] || {};
            const v1 = Number(c.rhsValue), v2 = c.rhsValue2 ? Number(c.rhsValue2) : undefined;
            let m = {
                ...existing
            };
            if (c.operatorId === 'gt' || c.operatorId === 'gte') m = {
                ...m,
                min: v1
            };
            else if (c.operatorId === 'lt' || c.operatorId === 'lte') m = {
                ...m,
                max: v1
            };
            else if (c.operatorId === 'between') m = {
                ...m,
                min: v1,
                max: v2
            };
            // @ts-ignore
            nf[c.simpleKey] = m;
        });
        active.filter((c)=>UNIVERSE_OPTIONS[c.indicatorId]).forEach((c)=>{
            const cfg = UNIVERSE_OPTIONS[c.indicatorId];
            const existing = nf[cfg.filterKey] || [];
            const v = c.rhsValue.trim();
            if (v && !existing.includes(v)) {
                nf[cfg.filterKey] = [
                    ...existing,
                    v
                ];
            }
        });
        const dslCrs = active.filter((c)=>!c.simpleKey && !UNIVERSE_OPTIONS[c.indicatorId] && c.dslString);
        const rawLines = val.split('\n').map((l)=>l.trim()).filter(Boolean);
        const allFormula = [
            ...dslCrs.map((c)=>c.dslString),
            ...rawLines
        ];
        if (allFormula.length > 0) nf.formula = allFormula;
        onChange(nf);
    };
    // ── Save screen ───────────────────────────────────────────────────────
    const handleSaveScreen = async ()=>{
        if (!saveScreenName.trim()) return;
        setIsSaving(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiPost"])('/api/screener/screens', {
                name: saveScreenName,
                filtersJson: filters
            });
            setSaveScreenName('');
            window.location.reload();
        } catch (error) {
            alert(error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? `Error: ${error.message}` : 'Failed to save screen');
        } finally{
            setIsSaving(false);
        }
    };
    // ── DSL live preview string ───────────────────────────────────────────
    const livePreview = (()=>{
        if (!lhsInd || !selectedOp) return null;
        const l = buildLhsDsl();
        const r = buildRhsDsl();
        if (!r && vc?.type !== 'none' && lhsInd?.rhsType !== 'enum') return null;
        return vc?.type === 'two_numbers' && rhsNumber2 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDslCriterion"])(l, selectedOp, rhsNumber, Number(rhsNumber2), lhsInd ?? undefined) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDslCriterion"])(l, selectedOp, r, undefined, lhsInd ?? undefined);
    })();
    // ── Universe dropdown shortcut ────────────────────────────────────────
    const univCfg = lhsInd ? UNIVERSE_OPTIONS[lhsInd.id] : undefined;
    // ── Visual Builder Renderer ───────────────────────────────────────────
    const renderVisualBuilder = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full min-h-[500px] max-h-[75vh] divide-x divide-border overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-44 shrink-0 flex flex-col bg-muted/5 h-full overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3 border-b border-border text-[10px] font-bold uppercase tracking-widest text-[var(--accent-brand)] opacity-80 shrink-0",
                            children: "Category"
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                            lineNumber: 454,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-2 flex flex-col gap-0.5 custom-scrollbar",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$screener$2f$indicators$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_CATEGORIES"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedCatId(cat.id),
                                    className: itemCls(selectedCatId === cat.id),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs",
                                            children: cat.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 459,
                                            columnNumber: 29
                                        }, this),
                                        selectedCatId === cat.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "w-3 h-3 shrink-0 opacity-50"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 460,
                                            columnNumber: 58
                                        }, this)
                                    ]
                                }, cat.id, true, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 457,
                                    columnNumber: 25
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                            lineNumber: 455,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                    lineNumber: 453,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-56 shrink-0 flex flex-col h-full overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3 border-b border-border text-[10px] font-bold uppercase tracking-widest text-[var(--accent-brand)] opacity-80 shrink-0",
                            children: "Indicator"
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                            lineNumber: 468,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-2 flex flex-col gap-0.5 custom-scrollbar",
                            children: lhsIndicators.map((ind)=>{
                                const isActive = selectedLhsId === ind.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedLhsId(ind.id),
                                    title: ind.description,
                                    className: itemCls(isActive),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs truncate flex-1",
                                            children: ind.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 475,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 shrink-0",
                                            children: [
                                                !ind.supported && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] bg-muted text-muted-foreground rounded px-1 py-0.5",
                                                    children: "soon"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 477,
                                                    columnNumber: 56
                                                }, this),
                                                isActive && ind.params.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ParamSpinner, {
                                                        param: p,
                                                        value: lhsParams[p.name] ?? p.defaultValue,
                                                        onChange: (val)=>setLhsParams((prev)=>({
                                                                    ...prev,
                                                                    [p.name]: val
                                                                })),
                                                        onClick: (e)=>e.stopPropagation()
                                                    }, p.name, false, {
                                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                        lineNumber: 479,
                                                        columnNumber: 41
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 476,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, ind.id, true, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 473,
                                    columnNumber: 29
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                            lineNumber: 469,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                    lineNumber: 467,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-44 shrink-0 flex flex-col bg-muted/5 h-full overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3 border-b border-border text-[10px] font-bold uppercase tracking-widest text-[var(--accent-brand)] opacity-80 shrink-0",
                            children: "Condition"
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                            lineNumber: 492,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-2 flex flex-col gap-0.5 custom-scrollbar",
                            children: availableOps.map((op)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedOpId(op.id),
                                    className: itemCls(selectedOpId === op.id),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs",
                                            children: op.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 496,
                                            columnNumber: 29
                                        }, this),
                                        selectedOpId === op.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "w-3 h-3 shrink-0 opacity-50"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 497,
                                            columnNumber: 56
                                        }, this)
                                    ]
                                }, op.id, true, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 495,
                                    columnNumber: 25
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                            lineNumber: 493,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                    lineNumber: 491,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col min-w-0 h-full overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3 border-b border-border text-[10px] font-bold uppercase tracking-widest text-[var(--accent-brand)] opacity-80 shrink-0",
                            children: "Value Selection"
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                            lineNumber: 505,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex flex-col overflow-hidden min-h-0",
                            children: !selectedOp ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex items-center justify-center p-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground text-center",
                                    children: "← Select a condition"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 509,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                lineNumber: 508,
                                columnNumber: 25
                            }, this) : vc?.type === 'none' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex flex-col items-center justify-center p-4 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground text-center",
                                        children: [
                                            "No value needed for",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                lineNumber: 513,
                                                columnNumber: 105
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-foreground",
                                                children: selectedOp.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                lineNumber: 513,
                                                columnNumber: 111
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                        lineNumber: 513,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        variant: "default",
                                        onClick: ()=>{
                                            handleAddCriterion();
                                            setVisualBuilderOpen(false);
                                        },
                                        disabled: !canAdd(),
                                        className: "gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                lineNumber: 521,
                                                columnNumber: 33
                                            }, this),
                                            " Add Rule"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                        lineNumber: 514,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                lineNumber: 512,
                                columnNumber: 25
                            }, this) : isLhsEnum && lhsInd?.enumOptions && lhsInd.enumOptions.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col h-full overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 overflow-y-auto p-2 flex flex-col gap-0.5 custom-scrollbar",
                                        children: lhsInd.enumOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setRhsNumber(opt.value),
                                                className: itemCls(rhsNumber === opt.value),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs truncate flex-1",
                                                        children: opt.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                        lineNumber: 531,
                                                        columnNumber: 41
                                                    }, this),
                                                    rhsNumber === opt.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                        className: "w-3 h-3 shrink-0 opacity-50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                        lineNumber: 532,
                                                        columnNumber: 69
                                                    }, this)
                                                ]
                                            }, opt.value, true, {
                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                lineNumber: 528,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                        lineNumber: 526,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 border-t border-border bg-muted/10 shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "default",
                                            onClick: ()=>{
                                                handleAddCriterion();
                                                setVisualBuilderOpen(false);
                                            },
                                            disabled: !canAdd(),
                                            className: "w-full gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 544,
                                                    columnNumber: 37
                                                }, this),
                                                " Add Rule"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 537,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                        lineNumber: 536,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                lineNumber: 525,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col h-full overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 space-y-4 shrink-0 bg-muted/5",
                                        children: vc.type === 'two_numbers' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[10px] font-bold text-muted-foreground uppercase opacity-70",
                                                            children: "Min"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                            lineNumber: 553,
                                                            columnNumber: 46
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "number",
                                                            value: rhsNumber,
                                                            onChange: (e)=>setRhsNumber(e.target.value),
                                                            placeholder: "30",
                                                            className: "h-9 text-sm mt-1 font-mono"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                            lineNumber: 554,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[10px] font-bold text-muted-foreground uppercase opacity-70",
                                                            children: "Max"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                            lineNumber: 555,
                                                            columnNumber: 46
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "number",
                                                            value: rhsNumber2,
                                                            onChange: (e)=>setRhsNumber2(e.target.value),
                                                            placeholder: "70",
                                                            className: "h-9 text-sm mt-1 font-mono"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                            lineNumber: 556,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 555,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 552,
                                            columnNumber: 37
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[10px] font-bold text-muted-foreground uppercase opacity-70",
                                                    children: "Value"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 559,
                                                    columnNumber: 42
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "number",
                                                    value: rhsNumber,
                                                    onChange: (e)=>setRhsNumber(e.target.value),
                                                    placeholder: "50",
                                                    className: "h-9 text-sm mt-1 font-mono"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 560,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 559,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                        lineNumber: 550,
                                        columnNumber: 29
                                    }, this),
                                    opCanBeInd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-h-0 border-t border-border flex flex-col overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-2 text-[10px] font-bold text-muted-foreground uppercase bg-muted/20 shrink-0",
                                                children: "Or Indicator"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                lineNumber: 565,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 overflow-y-auto p-2 flex flex-col gap-0.5 custom-scrollbar",
                                                children: lhsIndicators.map((ind)=>{
                                                    const isActive = rhsIndId === ind.id;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setRhsIndId(ind.id),
                                                        className: itemCls(isActive),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs truncate flex-1",
                                                                children: ind.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                                lineNumber: 571,
                                                                columnNumber: 53
                                                            }, this),
                                                            isActive && ind.params.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ParamSpinner, {
                                                                    param: p,
                                                                    value: rhsIndParams[p.name] ?? p.defaultValue,
                                                                    onChange: (val)=>setRhsIndParams((prev)=>({
                                                                                ...prev,
                                                                                [p.name]: val
                                                                            })),
                                                                    onClick: (e)=>e.stopPropagation()
                                                                }, p.name, false, {
                                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                                    lineNumber: 573,
                                                                    columnNumber: 57
                                                                }, this))
                                                        ]
                                                    }, ind.id, true, {
                                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                        lineNumber: 570,
                                                        columnNumber: 49
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                lineNumber: 566,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                        lineNumber: 564,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 border-t border-border space-y-3 bg-muted/10 shrink-0 mt-auto",
                                        children: [
                                            livePreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-md bg-amber-500/5 border border-amber-500/20 px-3 py-2 font-mono text-[11px] text-amber-500 truncate select-all",
                                                children: livePreview
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                lineNumber: 585,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "default",
                                                onClick: ()=>{
                                                    handleAddCriterion();
                                                    setVisualBuilderOpen(false);
                                                },
                                                disabled: !canAdd(),
                                                className: "w-full gap-2 h-10 text-sm font-semibold shadow-md",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                        lineNumber: 596,
                                                        columnNumber: 37
                                                    }, this),
                                                    " Add Rule"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                lineNumber: 589,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                        lineNumber: 583,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                lineNumber: 549,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                            lineNumber: 506,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                    lineNumber: 504,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
            lineNumber: 451,
            columnNumber: 9
        }, this);
    // ─────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col rounded-lg border border-border bg-card text-card-foreground relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                        lineNumber: 613,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                        lineNumber: 614,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-4 bottom-4 left-4 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                        lineNumber: 615,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-4 bottom-4 right-4 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                        lineNumber: 616,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                lineNumber: 612,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 relative z-10 overflow-visible",
                children: [
                    rulesViewMode === 'formula' ? /* ── DSL Mode: single textarea, no criteria list shown ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: [
                                    "Write one DSL expression per line. These are combined with ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-foreground",
                                        children: "AND"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                        lineNumber: 625,
                                        columnNumber: 88
                                    }, this),
                                    " logic. Criteria added via the list view also apply."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                lineNumber: 624,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: dslInput,
                                onChange: (e)=>handleDslInputChange(e.target.value),
                                placeholder: "rsi(14) < 30\npe > 10 AND pe < 25\nroce > 15",
                                rows: 6,
                                spellCheck: false,
                                className: "w-full rounded-md border border-border bg-muted/20 px-3 py-2.5 font-mono text-[12px] text-amber-400 placeholder:text-muted-foreground/40 resize-y focus:outline-none focus:ring-1 focus:ring-amber-500/50 leading-relaxed"
                            }, void 0, false, {
                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                lineNumber: 627,
                                columnNumber: 25
                            }, this),
                            criteria.filter((c)=>c.enabled && c.dslString).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-border bg-muted/10 p-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5",
                                        children: "Also active from list view:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                        lineNumber: 638,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1",
                                        children: criteria.filter((c)=>c.enabled && c.dslString).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-[11px] text-foreground/70 truncate",
                                                children: c.dslString
                                            }, c.id, false, {
                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                lineNumber: 641,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                        lineNumber: 639,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                lineNumber: 637,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                        lineNumber: 623,
                        columnNumber: 21
                    }, this) : /* ── List Mode: chip rows ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: criteria.length === 0 && !dslInput ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed border-border rounded-lg bg-muted/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"], {
                                    className: "w-8 h-8 mb-3 text-muted-foreground/40"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 654,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground mb-4 text-center max-w-xs",
                                    children: "Add using the formula builder or visual builder to screen stocks"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 655,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "secondary",
                                            onClick: ()=>{
                                                setCriteria([
                                                    {
                                                        id: `crit-${Date.now()}`,
                                                        indicatorId: '',
                                                        paramValues: {},
                                                        operatorId: '',
                                                        rhsValue: '',
                                                        displayString: '',
                                                        dslString: '',
                                                        supported: true,
                                                        enabled: true
                                                    }
                                                ]);
                                            },
                                            className: "gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 41
                                                }, this),
                                                " Add New Rule"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 657,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                                            open: visualBuilderOpen,
                                            onOpenChange: setVisualBuilderOpen,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        id: visualBuilderTriggerId,
                                                        size: "sm",
                                                        variant: "outline",
                                                        className: "gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__["Wand2"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                                lineNumber: 665,
                                                                columnNumber: 49
                                                            }, this),
                                                            " Add via Visual Builder"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 663,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                                                    id: visualBuilderDialogId,
                                                    className: "w-[98vw] sm:max-w-[1000px] sm:w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-card border-border flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                                                            className: "px-6 py-4 border-b shrink-0",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                                                className: "text-xl font-bold",
                                                                children: "Visual Rule Builder"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                                lineNumber: 670,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                            lineNumber: 669,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 overflow-x-auto",
                                                            children: renderVisualBuilder()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                            lineNumber: 672,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 668,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 662,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 656,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                            lineNumber: 653,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                criteria.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground mb-3 font-medium",
                                    children: [
                                        "Stock passes ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-foreground",
                                            children: "all"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 683,
                                            columnNumber: 54
                                        }, this),
                                        " of the below filters:"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 682,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-0.5",
                                    children: criteria.map((crit, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$screener$2f$FormulaCell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormulaCell"], {
                                            criterion: crit,
                                            index: i,
                                            onToggle: handleToggleCriterion,
                                            onRemove: handleRemove,
                                            onReorder: handleReorder,
                                            onUpdate: handleUpdateCriterion
                                        }, crit.id, false, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 688,
                                            columnNumber: 41
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 686,
                                    columnNumber: 33
                                }, this),
                                dslInput.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 rounded-md border border-border bg-muted/10 p-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5",
                                            children: "Also active from DSL view:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 702,
                                            columnNumber: 41
                                        }, this),
                                        dslInput.split('\n').filter((l)=>l.trim()).map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-[11px] text-amber-500/80 truncate",
                                                children: l
                                            }, i, false, {
                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                lineNumber: 704,
                                                columnNumber: 45
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 701,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "secondary",
                                            onClick: ()=>{
                                                setCriteria([
                                                    ...criteria,
                                                    {
                                                        id: `crit-${Date.now()}`,
                                                        indicatorId: '',
                                                        paramValues: {},
                                                        operatorId: '',
                                                        rhsValue: '',
                                                        displayString: '',
                                                        dslString: '',
                                                        supported: true,
                                                        enabled: true
                                                    }
                                                ]);
                                            },
                                            className: "gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 712,
                                                    columnNumber: 41
                                                }, this),
                                                " Add New Rule"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 709,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                                            open: visualBuilderOpen,
                                            onOpenChange: setVisualBuilderOpen,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        id: visualBuilderTriggerId,
                                                        size: "sm",
                                                        variant: "outline",
                                                        className: "gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__["Wand2"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                                lineNumber: 717,
                                                                columnNumber: 49
                                                            }, this),
                                                            " Add via Visual Builder"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                        lineNumber: 716,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 715,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                                                    id: visualBuilderDialogId,
                                                    className: "w-[98vw] sm:max-w-[1000px] sm:w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-card border-border flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                                                            className: "px-6 py-4 border-b shrink-0",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                                                className: "text-xl font-bold",
                                                                children: "Visual Rule Builder"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                                lineNumber: 722,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                            lineNumber: 721,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 overflow-x-auto",
                                                            children: renderVisualBuilder()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                            lineNumber: 724,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 720,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 714,
                                            columnNumber: 37
                                        }, this),
                                        (criteria.length > 0 || dslInput.trim()) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "ghost",
                                            onClick: handleClearAll,
                                            className: "gap-1 text-muted-foreground hover:text-destructive ml-auto",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                                    lineNumber: 731,
                                                    columnNumber: 45
                                                }, this),
                                                " Clear all"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 730,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 708,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                        lineNumber: 651,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 border-t border-border pt-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: "default",
                                    onClick: onRun,
                                    className: "gap-1.5 shrink-0 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 744,
                                            columnNumber: 29
                                        }, this),
                                        " Run Screen"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 742,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    value: saveScreenName,
                                    onChange: (e)=>setSaveScreenName(e.target.value),
                                    placeholder: "Screen name…",
                                    className: "h-8 w-36 text-xs"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 746,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: handleSaveScreen,
                                    disabled: isSaving || !saveScreenName.trim(),
                                    className: "shrink-0 gap-1 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                            lineNumber: 750,
                                            columnNumber: 29
                                        }, this),
                                        isSaving ? '…' : 'Save'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                                    lineNumber: 748,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                            lineNumber: 741,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                        lineNumber: 740,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
                lineNumber: 620,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/screener/ConditionBuilder.tsx",
        lineNumber: 610,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$radix$2d$ui$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Slot$3e$__ = __turbopack_context__.i("[project]/node_modules/radix-ui/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript) <export * as Slot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-full border border-transparent px-2.5 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-[var(--brand-focus)] focus-visible:ring-2 focus-visible:ring-[var(--brand-focus)] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow,background-color,border-color] overflow-hidden", {
    variants: {
        variant: {
            default: "bg-[var(--brand-tint)] text-[var(--brand-primary)] border-[var(--brand-primary)] [a&]:hover:opacity-90",
            secondary: "bg-[var(--bg-hover)] text-[var(--text-secondary)] border-[var(--border)] [a&]:hover:bg-[var(--surface-hover)]",
            destructive: "bg-[var(--bear-tint)] text-[var(--bear-strong)] border-[var(--bear-strong)] [a&]:hover:opacity-90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
            outline: "border-[var(--border)] text-[var(--text-primary)] [a&]:hover:bg-[var(--surface-hover)] [a&]:hover:text-[var(--text-primary)]",
            ghost: "text-[var(--text-secondary)] [a&]:hover:bg-[var(--bg-hover)] [a&]:hover:text-[var(--text-primary)]",
            link: "text-[var(--brand-primary)] underline-offset-4 [a&]:hover:text-[var(--brand-hover)] [a&]:hover:underline"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant = "default", asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$radix$2d$ui$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Slot$3e$__["Slot"].Root : "span";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        "data-variant": variant,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/app/(app)/screener/run/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScreenerRunPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$screener$2f$ConditionBuilder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/screener/ConditionBuilder.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-ssr] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-ssr] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code-xml.js [app-ssr] (ecmascript) <export default as Code2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const PAGE_TITLE_CLASS = "text-2xl font-semibold tracking-tight text-foreground";
const SECTION_TITLE_CLASS = "text-base font-semibold tracking-tight text-foreground";
const SMALL_CARD_TITLE_CLASS = "text-sm font-semibold tracking-tight text-foreground";
const TABLE_HEADER_CLASS = "px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground";
function ScreenerRunPage() {
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [totalCount, setTotalCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [rulesViewMode, setRulesViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('list');
    const hasResults = results !== null;
    const handleRun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setIsLoading(true);
        setError(null);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiPost"])("/api/screener/run", {
                filters
            });
            setResults(data.results ?? []);
            setTotalCount(data.total ?? data.results?.length ?? 0);
        } catch (e) {
            setError(e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? e.message : e instanceof Error ? e.message : String(e));
            setResults(null);
        } finally{
            setIsLoading(false);
        }
    }, [
        filters
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5 pb-20 overflow-visible",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: PAGE_TITLE_CLASS,
                                children: "Stock Screener"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground mt-1",
                                children: "Build a formula to filter stocks from NSE/BSE universe"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        size: "sm",
                        variant: "outline",
                        onClick: ()=>setRulesViewMode(rulesViewMode === 'list' ? 'formula' : 'list'),
                        className: "h-7 text-xs gap-1.5 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            rulesViewMode === 'list' ? 'Show DSL' : 'Show List'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$screener$2f$ConditionBuilder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                filters: filters,
                onChange: setFilters,
                onRun: handleRun,
                rulesViewMode: rulesViewMode
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative min-h-[18rem]",
                children: [
                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/70 backdrop-blur-[1px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-muted-foreground shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-4 h-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm",
                                    children: "Running screen…"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this) : null,
                    !hasResults && !error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-border rounded-lg bg-muted/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "w-12 h-12 text-muted-foreground/40 mb-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: `${SECTION_TITLE_CLASS} mb-2`,
                                children: "Ready to Screen Stocks"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground text-center max-w-md mb-6",
                                children: 'Build your criteria using the formula builder above, then click "Run Screen" to filter stocks from the NSE/BSE universe.'
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-lg text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center p-3 rounded-lg bg-card border border-border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `${SMALL_CARD_TITLE_CLASS} mb-1`,
                                                children: "Technical"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                lineNumber: 106,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-muted-foreground",
                                                children: "RSI, Moving Averages, MACD"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                lineNumber: 107,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center p-3 rounded-lg bg-card border border-border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `${SMALL_CARD_TITLE_CLASS} mb-1`,
                                                children: "Fundamental"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                lineNumber: 110,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-muted-foreground",
                                                children: "PE, ROE, ROCE, Debt/Equity"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                lineNumber: 111,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                        lineNumber: 109,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center p-3 rounded-lg bg-card border border-border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `${SMALL_CARD_TITLE_CLASS} mb-1`,
                                                children: "Valuation"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                lineNumber: 114,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-muted-foreground",
                                                children: "PEG, PB, EV/EBITDA"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this) : hasResults ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-foreground",
                                            children: totalCount
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                            lineNumber: 123,
                                            columnNumber: 15
                                        }, this),
                                        " stocks matched"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            results.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-border rounded-lg bg-muted/20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "w-10 h-10 text-muted-foreground/40 mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: `${SECTION_TITLE_CLASS} mb-1`,
                                        children: "No stocks matched"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground text-center max-w-sm",
                                        children: "Try relaxing your filters or check your formula syntax. Consider using broader ranges or fewer conditions."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-border overflow-hidden bg-card",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-b border-border bg-muted/40",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: TABLE_HEADER_CLASS,
                                                            children: "#"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: TABLE_HEADER_CLASS,
                                                            children: "Company"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: TABLE_HEADER_CLASS,
                                                            children: "Sector"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${TABLE_HEADER_CLASS} text-right`,
                                                            children: "Mkt Cap"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                            lineNumber: 144,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${TABLE_HEADER_CLASS} text-right`,
                                                            children: "Price"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                            lineNumber: 145,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${TABLE_HEADER_CLASS} text-right`,
                                                            children: "Chg%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                            lineNumber: 146,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${TABLE_HEADER_CLASS} text-right`,
                                                            children: "PE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                            lineNumber: 147,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${TABLE_HEADER_CLASS} text-right`,
                                                            children: "PB"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                            lineNumber: 148,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${TABLE_HEADER_CLASS} text-right`,
                                                            children: "ROCE%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                            lineNumber: 149,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${TABLE_HEADER_CLASS} text-right`,
                                                            children: "RSI(14)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                            lineNumber: 150,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                lineNumber: 139,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-border",
                                                children: results.map((r, i)=>{
                                                    const isPos = (r.pctChange ?? 0) > 0;
                                                    const isNeg = (r.pctChange ?? 0) < 0;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-muted/30 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-2.5 text-xs text-muted-foreground",
                                                                children: i + 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                lineNumber: 159,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-2.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: `/stocks/${r.symbol}`,
                                                                    className: "hover:text-amber-500 transition-colors",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-medium text-foreground text-[13px]",
                                                                            children: r.symbol
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                            lineNumber: 162,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-muted-foreground truncate max-w-[200px]",
                                                                            children: r.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                            lineNumber: 163,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                    lineNumber: 161,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                lineNumber: 160,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-2.5",
                                                                children: r.sector && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    variant: "secondary",
                                                                    className: "text-[10px] py-0 px-1.5",
                                                                    children: r.sector
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                    lineNumber: 168,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                lineNumber: 166,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-2.5 text-right text-[13px] font-mono text-foreground",
                                                                children: r.marketCapCr ? `₹${(r.marketCapCr / 100).toFixed(0)}B` : "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-2.5 text-right text-[13px] font-mono text-foreground",
                                                                children: r.price != null ? `₹${r.price.toFixed(2)}` : "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                lineNumber: 174,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-2.5 text-right",
                                                                children: r.pctChange != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `inline-flex items-center gap-0.5 text-[13px] font-mono font-medium ${isPos ? "text-emerald-500" : isNeg ? "text-rose-500" : "text-muted-foreground"}`,
                                                                    children: [
                                                                        isPos ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                                            className: "w-3 h-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                            lineNumber: 180,
                                                                            columnNumber: 42
                                                                        }, this) : isNeg ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                                                            className: "w-3 h-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                            lineNumber: 180,
                                                                            columnNumber: 87
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                            className: "w-3 h-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                            lineNumber: 180,
                                                                            columnNumber: 126
                                                                        }, this),
                                                                        r.pctChange > 0 ? "+" : "",
                                                                        r.pctChange.toFixed(2),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                    lineNumber: 179,
                                                                    columnNumber: 31
                                                                }, this) : "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                lineNumber: 177,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-2.5 text-right text-[13px] font-mono text-foreground",
                                                                children: r.pe?.toFixed(1) ?? "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-2.5 text-right text-[13px] font-mono text-foreground",
                                                                children: r.pb?.toFixed(2) ?? "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                lineNumber: 186,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-2.5 text-right text-[13px] font-mono text-foreground",
                                                                children: r.roce != null ? `${r.roce.toFixed(1)}%` : "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                lineNumber: 187,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-2.5 text-right",
                                                                children: r.rsi14 != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `text-[13px] font-mono font-medium ${r.rsi14 > 70 ? "text-rose-500" : r.rsi14 < 30 ? "text-emerald-500" : "text-foreground"}`,
                                                                    children: r.rsi14.toFixed(1)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                    lineNumber: 190,
                                                                    columnNumber: 31
                                                                }, this) : "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                                lineNumber: 188,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, r.symbol, true, {
                                                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                                lineNumber: 153,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                        lineNumber: 138,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/screener/run/page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/screener/run/page.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_559c8369._.js.map