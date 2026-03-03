/**
 * Safe Withdrawal Rate (SWR) calculations.
 * India-specific: uses historical data from 1990 onwards.
 *
 * SAFEMAX: the highest withdrawal rate that would have survived
 * every historical start year without depleting the portfolio.
 */

export interface SWRInput {
  /** Annual withdrawal as a fraction of initial portfolio, e.g. 0.04 = 4% */
  withdrawalRate: number;
  /** Portfolio allocation: { "NIFTY50": 0.6, "GOLD": 0.2, "GSEC": 0.2 } */
  allocation: Record<string, number>;
  /** Number of years in retirement */
  retirementYears: number;
  /** Historical annual returns by asset and year: { "NIFTY50": { "1990": 0.22, ... } } */
  historicalReturns: Record<string, Record<string, number>>;
  /** Historical CPI inflation by year: { "1990": 0.09, ... } */
  historicalCPI: Record<string, number>;
  /** If true, withdrawal amount grows with inflation each year */
  inflationAdjustedWithdrawal: boolean;
}

export interface SWRStartYearResult {
  startYear: number;
  survived: boolean;
  finalValue: number;
  /** The actual safe rate for this start year (binary search result) */
  safeRate: number;
}

export interface SWRResult {
  safemax: number;
  perpetualRate: number;
  longTermRate: number;
  byStartYear: Record<string, SWRStartYearResult>;
}

/**
 * Simulate portfolio survival for a given start year and withdrawal rate.
 * Returns true if portfolio survives all retirement years.
 */
function simulateRetirement(
  startYear: number,
  withdrawalRate: number,
  input: Omit<SWRInput, "withdrawalRate">
): { survived: boolean; finalValue: number } {
  const { allocation, retirementYears, historicalReturns, historicalCPI, inflationAdjustedWithdrawal } =
    input;

  let portfolioValue = 1.0; // Normalized to 1
  let annualWithdrawal = withdrawalRate;

  for (let year = 0; year < retirementYears; year++) {
    const currentYear = String(startYear + year);

    // Apply portfolio return for this year
    let portfolioReturn = 0;
    for (const [assetId, weight] of Object.entries(allocation)) {
      const assetReturns = historicalReturns[assetId];
      if (assetReturns && assetReturns[currentYear] !== undefined) {
        portfolioReturn += weight * assetReturns[currentYear];
      } else {
        // Missing data — use long-term average as fallback
        const avgReturn =
          Object.values(assetReturns || {}).reduce((a, b) => a + b, 0) /
          Math.max(Object.values(assetReturns || {}).length, 1);
        portfolioReturn += weight * avgReturn;
      }
    }

    portfolioValue = portfolioValue * (1 + portfolioReturn) - annualWithdrawal;

    if (portfolioValue <= 0) {
      return { survived: false, finalValue: 0 };
    }

    // Adjust withdrawal for inflation
    if (inflationAdjustedWithdrawal) {
      const inflation = historicalCPI[currentYear] ?? 0.06;
      annualWithdrawal = annualWithdrawal * (1 + inflation);
    }
  }

  return { survived: true, finalValue: portfolioValue };
}

/**
 * Find the safe withdrawal rate for a given start year using binary search.
 */
function findSafeRateForYear(
  startYear: number,
  input: Omit<SWRInput, "withdrawalRate">
): number {
  let low = 0;
  let high = 0.2; // Max 20% withdrawal rate
  const PRECISION = 0.0001;

  while (high - low > PRECISION) {
    const mid = (low + high) / 2;
    const { survived } = simulateRetirement(startYear, mid, input);
    if (survived) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return low;
}

/**
 * Compute full SWR analysis across all historical start years.
 */
export function calculateSWR(input: SWRInput): SWRResult {
  const { historicalReturns, retirementYears } = input;

  // Determine available start years from historical data
  const firstAsset = Object.values(historicalReturns)[0] ?? {};
  const availableYears = Object.keys(firstAsset)
    .map(Number)
    .sort((a, b) => a - b)
    .filter((year) => year + retirementYears <= new Date().getFullYear());

  const byStartYear: Record<string, SWRStartYearResult> = {};
  const safeRates: number[] = [];

  for (const startYear of availableYears) {
    const safeRate = findSafeRateForYear(startYear, input);
    const { survived, finalValue } = simulateRetirement(startYear, safeRate, input);

    byStartYear[String(startYear)] = {
      startYear,
      survived,
      finalValue,
      safeRate,
    };

    safeRates.push(safeRate);
  }

  const safemax = safeRates.length > 0 ? Math.min(...safeRates) : 0;

  // Perpetual rate: portfolio never depletes (final value >= initial)
  const perpetualRate = findPerpetualRate(input);

  // Long-term rate: for 40+ year retirements
  const longTermInput = { ...input, retirementYears: 40 };
  const longTermRates = availableYears
    .filter((y) => y + 40 <= new Date().getFullYear())
    .map((y) => findSafeRateForYear(y, longTermInput));
  const longTermRate = longTermRates.length > 0 ? Math.min(...longTermRates) : safemax;

  return { safemax, perpetualRate, longTermRate, byStartYear };
}

/**
 * Find the perpetual withdrawal rate: portfolio value never goes below initial.
 */
function findPerpetualRate(input: Omit<SWRInput, "withdrawalRate">): number {
  const perpetualInput = { ...input, retirementYears: 100 };
  let low = 0;
  let high = 0.1;
  const PRECISION = 0.0001;

  while (high - low > PRECISION) {
    const mid = (low + high) / 2;
    const firstAsset = Object.values(input.historicalReturns)[0] ?? {};
    const startYears = Object.keys(firstAsset).map(Number).filter((y) => y + 100 <= new Date().getFullYear());

    const allSurvived = startYears.every(
      (year) => simulateRetirement(year, mid, perpetualInput).survived
    );

    if (allSurvived) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return low;
}

// ---------------------------------------------------------------------------
// Simplified wrappers for the retirement screen
// ---------------------------------------------------------------------------

export interface SimpleRetirementInput {
  annual_expenses: number;
  expected_return: number;
  inflation_rate: number;
  current_corpus: number;
  monthly_investment: number;
}

export interface SimpleRetirementResult {
  fi_number: number;
  safe_withdrawal_rate: number;
  years_to_fi: number | null;
  monthly_withdrawal_at_fi: number;
}

/**
 * Simplified SWR calculation for the retirement screen.
 * Uses the 25× rule (4% SWR) as the FI number.
 */
export function calculateSWRSimple(input: SimpleRetirementInput): SimpleRetirementResult {
  const { annual_expenses, expected_return, inflation_rate, current_corpus, monthly_investment } = input;
  const swr = 0.04; // 4% rule
  const fi_number = annual_expenses / swr;

  // Years to FI via compound growth
  let corpus = current_corpus;
  let expenses = annual_expenses;
  let years_to_fi: number | null = null;
  const annual_investment = monthly_investment * 12;

  for (let year = 1; year <= 60; year++) {
    corpus = corpus * (1 + expected_return) + annual_investment;
    expenses = expenses * (1 + inflation_rate);
    const required = expenses / swr;
    if (years_to_fi === null && corpus >= required) {
      years_to_fi = year;
      break;
    }
  }

  return {
    fi_number,
    safe_withdrawal_rate: swr,
    years_to_fi,
    monthly_withdrawal_at_fi: (fi_number * swr) / 12,
  };
}

export interface SimpleFIYearsResult {
  years_to_fi: number | null;
  fi_age: number | null;
  fi_number: number;
}

/**
 * Calculate years to FI given current age and monthly investment.
 */
export function calculateFIYearsSimple(params: {
  current_corpus: number;
  monthly_investment: number;
  annual_expenses: number;
  expected_return: number;
  inflation_rate: number;
  current_age?: number;
}): SimpleFIYearsResult {
  const { current_corpus, monthly_investment, annual_expenses, expected_return, inflation_rate, current_age } = params;
  const swr = 0.04;
  const fi_number = annual_expenses / swr;

  let corpus = current_corpus;
  let expenses = annual_expenses;
  const annual_investment = monthly_investment * 12;
  let years_to_fi: number | null = null;

  for (let year = 1; year <= 60; year++) {
    corpus = corpus * (1 + expected_return) + annual_investment;
    expenses = expenses * (1 + inflation_rate);
    const required = expenses / swr;
    if (years_to_fi === null && corpus >= required) {
      years_to_fi = year;
      break;
    }
  }

  return {
    years_to_fi,
    fi_age: years_to_fi !== null && current_age ? current_age + years_to_fi : null,
    fi_number,
  };
}

/**
 * Calculate Financial Independence (FI) years.
 * Given current savings rate and expected return, how many years to reach FI?
 * Uses the 4% rule (or custom SWR) to determine the FI corpus.
 */
export function calculateFIYears(params: {
  currentCorpus: number;
  annualExpenses: number;
  annualSavings: number;
  expectedReturn: number; // annual, e.g. 0.12
  safeWithdrawalRate: number; // e.g. 0.04
  inflationRate: number; // e.g. 0.06
}): {
  fiCorpusRequired: number;
  yearsToFI: number | null;
  corpusByYear: Array<{ year: number; corpus: number }>;
} {
  const { currentCorpus, annualExpenses, annualSavings, expectedReturn, safeWithdrawalRate, inflationRate } =
    params;

  // FI corpus = annual expenses / SWR (inflation-adjusted)
  const fiCorpusRequired = annualExpenses / safeWithdrawalRate;

  let corpus = currentCorpus;
  let expenses = annualExpenses;
  const corpusByYear: Array<{ year: number; corpus: number }> = [];
  let yearsToFI: number | null = null;

  for (let year = 1; year <= 60; year++) {
    corpus = corpus * (1 + expectedReturn) + annualSavings;
    expenses = expenses * (1 + inflationRate);
    const requiredCorpus = expenses / safeWithdrawalRate;

    corpusByYear.push({ year, corpus });

    if (yearsToFI === null && corpus >= requiredCorpus) {
      yearsToFI = year;
    }
  }

  return { fiCorpusRequired, yearsToFI, corpusByYear };
}
