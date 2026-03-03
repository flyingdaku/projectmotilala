/**
 * Number formatting utilities for financial data display.
 */

/**
 * Format large numbers with Indian numbering system suffixes.
 * @param value - Number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string with K/L/Cr suffix
 */
export function formatIndianNumber(value: number | null | undefined, decimals = 2): string {
  if (value == null) return '—';
  
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
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

/**
 * Format price with proper decimal places.
 */
export function formatPrice(value: number | null | undefined, decimals = 2): string {
  if (value == null) return '—';
  return value.toLocaleString('en-IN', { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  });
}

/**
 * Format volume with K/L/Cr suffixes.
 */
export function formatVolume(value: number | null | undefined): string {
  return formatIndianNumber(value, 2);
}

/**
 * Format percentage with sign.
 */
export function formatPercentage(value: number | null | undefined, decimals = 2): string {
  if (value == null) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}
