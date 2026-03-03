/**
 * math.ts — Pure indicator math functions.
 * All functions take number[] and return number[].
 * No chart dependencies — pure TS, easily testable.
 */

export function sma(values: number[], period: number): (number | null)[] {
  return values.map((_, i) => {
    if (i < period - 1) return null;
    const slice = values.slice(i - period + 1, i + 1);
    return slice.reduce((a, b) => a + b, 0) / period;
  });
}

export function ema(values: number[], period: number): (number | null)[] {
  const result: (number | null)[] = new Array(values.length).fill(null);
  const k = 2 / (period + 1);
  let prev: number | null = null;

  for (let i = 0; i < values.length; i++) {
    if (i < period - 1) continue;
    if (prev === null) {
      // Seed with SMA of first `period` values
      const seed: number = values.slice(0, period).reduce((a, b) => a + b, 0) / period;
      result[i] = seed;
      prev = seed;
    } else {
      const val: number = values[i] * k + prev * (1 - k);
      result[i] = val;
      prev = val;
    }
  }
  return result;
}

export function wma(values: number[], period: number): (number | null)[] {
  return values.map((_, i) => {
    if (i < period - 1) return null;
    let num = 0, den = 0;
    for (let j = 0; j < period; j++) {
      const w = period - j;
      num += values[i - j] * w;
      den += w;
    }
    return num / den;
  });
}

export function stddev(values: number[], period: number): (number | null)[] {
  const means = sma(values, period);
  return values.map((_, i) => {
    if (means[i] === null) return null;
    const slice = values.slice(i - period + 1, i + 1);
    const mean = means[i]!;
    const variance = slice.reduce((acc, v) => acc + (v - mean) ** 2, 0) / period;
    return Math.sqrt(variance);
  });
}

export function bollingerBands(
  values: number[],
  period: number,
  multiplier: number
): { upper: (number | null)[]; mid: (number | null)[]; lower: (number | null)[] } {
  const mid = sma(values, period);
  const std = stddev(values, period);
  return {
    upper: mid.map((m, i) => m !== null && std[i] !== null ? m + multiplier * std[i]! : null),
    mid,
    lower: mid.map((m, i) => m !== null && std[i] !== null ? m - multiplier * std[i]! : null),
  };
}

/** Typical price = (H + L + C) / 3 */
export function typicalPrice(
  highs: number[],
  lows: number[],
  closes: number[]
): number[] {
  return closes.map((c, i) => (highs[i] + lows[i] + c) / 3);
}

/** VWAP — daily reset approximation (assumes bars sorted ascending, no intraday reset for EOD) */
export function vwap(
  highs: number[],
  lows: number[],
  closes: number[],
  volumes: number[]
): number[] {
  let cumPV = 0, cumVol = 0;
  return closes.map((_, i) => {
    const tp = (highs[i] + lows[i] + closes[i]) / 3;
    cumPV  += tp * (volumes[i] ?? 0);
    cumVol += (volumes[i] ?? 0);
    return cumVol > 0 ? cumPV / cumVol : closes[i];
  });
}

export function rsi(values: number[], period: number): (number | null)[] {
  const result: (number | null)[] = new Array(values.length).fill(null);
  if (values.length < period + 1) return result;

  let avgGain = 0, avgLoss = 0;
  for (let i = 1; i <= period; i++) {
    const change = values[i] - values[i - 1];
    if (change > 0) avgGain += change;
    else avgLoss += Math.abs(change);
  }
  avgGain /= period;
  avgLoss /= period;

  const rs0 = avgLoss === 0 ? Infinity : avgGain / avgLoss;
  result[period] = 100 - 100 / (1 + rs0);

  for (let i = period + 1; i < values.length; i++) {
    const change = values[i] - values[i - 1];
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? Math.abs(change) : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
    const rs = avgLoss === 0 ? Infinity : avgGain / avgLoss;
    result[i] = 100 - 100 / (1 + rs);
  }
  return result;
}

export interface MACDResult {
  macd:   (number | null)[];
  signal: (number | null)[];
  hist:   (number | null)[];
}

export function macd(
  values: number[],
  fast = 12,
  slow = 26,
  signal = 9
): MACDResult {
  const fastEma  = ema(values, fast);
  const slowEma  = ema(values, slow);
  const macdLine = values.map((_, i) =>
    fastEma[i] !== null && slowEma[i] !== null ? fastEma[i]! - slowEma[i]! : null
  );

  // Signal = EMA of macdLine
  const validMacd = macdLine.map(v => v ?? 0);
  const rawSignal = ema(validMacd, signal);
  const signalLine = macdLine.map((v, i) => v !== null ? rawSignal[i] : null);
  const histogram  = macdLine.map((v, i) =>
    v !== null && signalLine[i] !== null ? v - signalLine[i]! : null
  );

  return { macd: macdLine, signal: signalLine, hist: histogram };
}

export function stochastic(
  highs: number[],
  lows:  number[],
  closes: number[],
  kPeriod = 14,
  dPeriod = 3
): { k: (number | null)[]; d: (number | null)[] } {
  const kLine: (number | null)[] = closes.map((c, i) => {
    if (i < kPeriod - 1) return null;
    const slice_h = highs.slice(i - kPeriod + 1, i + 1);
    const slice_l = lows.slice(i - kPeriod + 1, i + 1);
    const hh = Math.max(...slice_h);
    const ll = Math.min(...slice_l);
    return hh === ll ? 50 : ((c - ll) / (hh - ll)) * 100;
  });

  const kFilled = kLine.map(v => v ?? 0);
  const dLine   = sma(kFilled, dPeriod).map((v, i) => kLine[i] !== null ? v : null);

  return { k: kLine, d: dLine };
}

export function atr(
  highs: number[],
  lows:  number[],
  closes: number[],
  period = 14
): (number | null)[] {
  const tr: number[] = closes.map((c, i) => {
    if (i === 0) return highs[0] - lows[0];
    const prevC = closes[i - 1];
    return Math.max(highs[i] - lows[i], Math.abs(highs[i] - prevC), Math.abs(lows[i] - prevC));
  });

  const result: (number | null)[] = new Array(closes.length).fill(null);
  if (tr.length < period) return result;

  let atrVal = tr.slice(0, period).reduce((a, b) => a + b, 0) / period;
  result[period - 1] = atrVal;

  for (let i = period; i < tr.length; i++) {
    atrVal = (atrVal * (period - 1) + tr[i]) / period;
    result[i] = atrVal;
  }
  return result;
}

export function obv(closes: number[], volumes: number[]): number[] {
  const result: number[] = [0];
  for (let i = 1; i < closes.length; i++) {
    const prev = result[i - 1];
    if (closes[i] > closes[i - 1])      result.push(prev + (volumes[i] ?? 0));
    else if (closes[i] < closes[i - 1]) result.push(prev - (volumes[i] ?? 0));
    else                                 result.push(prev);
  }
  return result;
}

export function cci(
  highs: number[],
  lows:  number[],
  closes: number[],
  period = 20
): (number | null)[] {
  const tp = typicalPrice(highs, lows, closes);
  const meanTp = sma(tp, period);

  return tp.map((t, i) => {
    if (meanTp[i] === null) return null;
    const slice = tp.slice(i - period + 1, i + 1);
    const md = slice.reduce((acc, v) => acc + Math.abs(v - meanTp[i]!), 0) / period;
    return md === 0 ? 0 : (t - meanTp[i]!) / (0.015 * md);
  });
}

export function williamsR(
  highs: number[],
  lows:  number[],
  closes: number[],
  period = 14
): (number | null)[] {
  return closes.map((c, i) => {
    if (i < period - 1) return null;
    const hh = Math.max(...highs.slice(i - period + 1, i + 1));
    const ll = Math.min(...lows.slice(i - period + 1, i + 1));
    return hh === ll ? -50 : ((hh - c) / (hh - ll)) * -100;
  });
}

export function mfi(
  highs: number[],
  lows:  number[],
  closes: number[],
  volumes: number[],
  period = 14
): (number | null)[] {
  const tp   = typicalPrice(highs, lows, closes);
  const mfRaw = tp.map((t, i) => t * (volumes[i] ?? 0));

  return tp.map((t, i) => {
    if (i < period) return null;
    let posFlow = 0, negFlow = 0;
    for (let j = i - period + 1; j <= i; j++) {
      if (tp[j] > tp[j - 1]) posFlow += mfRaw[j];
      else                    negFlow += mfRaw[j];
    }
    return negFlow === 0 ? 100 : 100 - 100 / (1 + posFlow / negFlow);
  });
}

export function adx(
  highs: number[],
  lows:  number[],
  closes: number[],
  period = 14
): { adx: (number | null)[]; plusDI: (number | null)[]; minusDI: (number | null)[] } {
  const len = closes.length;
  const adxArr: (number | null)[]    = new Array(len).fill(null);
  const plusDIArr: (number | null)[] = new Array(len).fill(null);
  const minusDIArr: (number | null)[]= new Array(len).fill(null);

  if (len < period * 2) return { adx: adxArr, plusDI: plusDIArr, minusDI: minusDIArr };

  let smoothTR = 0, smoothPlusDM = 0, smoothMinusDM = 0;

  for (let i = 1; i < len; i++) {
    const tr      = Math.max(highs[i] - lows[i], Math.abs(highs[i] - closes[i-1]), Math.abs(lows[i] - closes[i-1]));
    const plusDM  = highs[i] - highs[i-1] > lows[i-1] - lows[i] ? Math.max(highs[i] - highs[i-1], 0) : 0;
    const minusDM = lows[i-1] - lows[i] > highs[i] - highs[i-1] ? Math.max(lows[i-1] - lows[i], 0) : 0;

    if (i < period) {
      smoothTR      += tr;
      smoothPlusDM  += plusDM;
      smoothMinusDM += minusDM;
      continue;
    }

    smoothTR      = smoothTR      - smoothTR / period      + tr;
    smoothPlusDM  = smoothPlusDM  - smoothPlusDM / period  + plusDM;
    smoothMinusDM = smoothMinusDM - smoothMinusDM / period + minusDM;

    const plusDI  = smoothTR > 0 ? (smoothPlusDM  / smoothTR) * 100 : 0;
    const minusDI = smoothTR > 0 ? (smoothMinusDM / smoothTR) * 100 : 0;
    plusDIArr[i]  = plusDI;
    minusDIArr[i] = minusDI;

    const dx = plusDI + minusDI > 0 ? Math.abs(plusDI - minusDI) / (plusDI + minusDI) * 100 : 0;
    adxArr[i] = dx; // simplified (not smoothed DX) — good enough for display
  }

  return { adx: adxArr, plusDI: plusDIArr, minusDI: minusDIArr };
}
