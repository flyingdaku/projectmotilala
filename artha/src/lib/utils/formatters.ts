const DEFAULT_FALLBACK = "Unavailable";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

type FallbackOptions = {
  fallback?: string;
};

function withFallback(value: string | null, fallback = DEFAULT_FALLBACK): string {
  return value ?? fallback;
}

function normalizedNumber(value: number | null | undefined): number | null {
  if (value == null || Number.isNaN(value) || !Number.isFinite(value)) return null;
  return value;
}

export function hasDataValue(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "boolean") return true;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.values(value as Record<string, unknown>).some(hasDataValue);
  return false;
}

export function formatIndianNumber(
  value: number | null | undefined,
  decimals = 2,
  options: FallbackOptions = {},
): string {
  const normalized = normalizedNumber(value);
  if (normalized == null) return withFallback(null, options.fallback);

  const absValue = Math.abs(normalized);
  const sign = normalized < 0 ? "-" : "";

  if (absValue >= 1e7) {
    return `${sign}${(absValue / 1e7).toFixed(decimals)}Cr`;
  }
  if (absValue >= 1e5) {
    return `${sign}${(absValue / 1e5).toFixed(decimals)}L`;
  }
  if (absValue >= 1e3) {
    return `${sign}${(absValue / 1e3).toFixed(decimals)}K`;
  }
  return `${sign}${absValue.toFixed(decimals)}`;
}

export function formatPrice(
  value: number | null | undefined,
  decimals = 2,
  options: FallbackOptions = {},
): string {
  const normalized = normalizedNumber(value);
  if (normalized == null) return withFallback(null, options.fallback);
  return normalized.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCurrency(
  value: number | null | undefined,
  options: FallbackOptions & {
    decimals?: number;
    signed?: boolean;
    suffix?: string;
  } = {},
): string {
  const normalized = normalizedNumber(value);
  if (normalized == null) return withFallback(null, options.fallback);

  const { decimals = 2, signed = false, suffix = "" } = options;
  const sign = signed && normalized > 0 ? "+" : normalized < 0 ? "-" : "";
  const formatted = Math.abs(normalized).toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${sign}₹${formatted}${suffix}`;
}

export function formatMoneyInCrores(
  value: number | null | undefined,
  options: FallbackOptions & { digits?: number } = {},
): string {
  const normalized = normalizedNumber(value);
  if (normalized == null) return withFallback(null, options.fallback);

  const digits = options.digits ?? 2;
  const absValue = Math.abs(normalized);
  const sign = normalized < 0 ? "-" : "";

  if (absValue >= 100000) {
    return `${sign}₹${(absValue / 100000).toFixed(digits)}L Cr`;
  }

  return `${sign}₹${absValue.toLocaleString("en-IN", {
    minimumFractionDigits: digits > 0 ? Math.min(digits, 2) : 0,
    maximumFractionDigits: digits > 0 ? Math.min(digits, 2) : 0,
  })} Cr`;
}

export function formatVolume(
  value: number | null | undefined,
  options: FallbackOptions = {},
): string {
  const normalized = normalizedNumber(value);
  if (normalized == null) return withFallback(null, options.fallback);

  if (normalized >= 10000000) return `${(normalized / 10000000).toFixed(2)} Cr`;
  if (normalized >= 100000) return `${(normalized / 100000).toFixed(2)} L`;
  if (normalized >= 1000) return `${(normalized / 1000).toFixed(1)} K`;
  return normalized.toLocaleString("en-IN");
}

export function formatPercentage(
  value: number | null | undefined,
  decimals = 2,
  options: FallbackOptions & { signed?: boolean } = {},
): string {
  const normalized = normalizedNumber(value);
  if (normalized == null) return withFallback(null, options.fallback);

  const sign = options.signed && normalized > 0 ? "+" : "";
  return `${sign}${normalized.toFixed(decimals)}%`;
}

export function formatPercent(
  value: number | null | undefined,
  decimals = 2,
  options: FallbackOptions & { signed?: boolean } = {},
): string {
  return formatPercentage(value, decimals, options);
}

export function formatRatio(
  value: number | null | undefined,
  digits = 2,
  options: FallbackOptions & { suffix?: string } = {},
): string {
  const normalized = normalizedNumber(value);
  if (normalized == null) return withFallback(null, options.fallback);
  return `${normalized.toFixed(digits)}${options.suffix ?? "x"}`;
}

export function formatSignedChange(
  value: number | null | undefined,
  digits = 2,
  suffix = "%",
  options: FallbackOptions = {},
): string {
  const normalized = normalizedNumber(value);
  if (normalized == null) return withFallback(null, options.fallback);
  return `${normalized > 0 ? "+" : ""}${normalized.toFixed(digits)}${suffix}`;
}

export function formatDateLabel(
  value: string | Date | null | undefined,
  options: FallbackOptions & { granularity?: "day" | "month" } = {},
): string {
  if (!value) return withFallback(null, options.fallback);
  const date = value instanceof Date ? value : new Date(`${value}`);
  if (Number.isNaN(date.getTime())) return typeof value === "string" ? value : withFallback(null, options.fallback);
  return options.granularity === "month" ? MONTH_FORMATTER.format(date) : DATE_FORMATTER.format(date);
}

export function formatPeriodLabel(
  value: string | null | undefined,
  options: FallbackOptions & { annualAlias?: boolean } = {},
): string {
  if (!value) return withFallback(null, options.fallback);

  const compactFy = /^([A-Za-z]{3})-(\d{2})$/.exec(value);
  if (compactFy) {
    return options.annualAlias ? `FY${compactFy[2]}` : value;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = new Date(`${value}T00:00:00Z`);
    if (!Number.isNaN(date.getTime())) {
      if (options.annualAlias) {
        const fiscalYear = date.getUTCMonth() < 3 ? date.getUTCFullYear() : date.getUTCFullYear() + 1;
        return `FY${String(fiscalYear).slice(2)}`;
      }
      return MONTH_FORMATTER.format(date);
    }
  }

  return value;
}

export function formatMetricRange(
  low: number | null | undefined,
  high: number | null | undefined,
  formatter: (value: number) => string,
  fallback = DEFAULT_FALLBACK,
): string {
  const lowValue = normalizedNumber(low);
  const highValue = normalizedNumber(high);
  if (lowValue == null || highValue == null) return fallback;
  return `${formatter(lowValue)} - ${formatter(highValue)}`;
}

export { DEFAULT_FALLBACK as MISSING_VALUE_LABEL };
