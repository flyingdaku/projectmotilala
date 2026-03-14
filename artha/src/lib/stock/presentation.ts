import { hasDataValue } from "@/lib/utils/formatters";

export type DataStatus = "live" | "delayed" | "partial" | "unavailable";

export interface DataMeta {
  asOf: string | null;
  status: DataStatus;
  coverage: number;
  note?: string | null;
  unitLabel?: string | null;
}

export function clampCoverage(value: number): number {
  if (Number.isNaN(value) || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

export function getCoverage(values: unknown[]): number {
  if (values.length === 0) return 0;
  const populated = values.filter(hasDataValue).length;
  return clampCoverage(populated / values.length);
}

export function getObjectCoverage<T extends Record<string, unknown>>(
  record: T | null | undefined,
  keys: Array<keyof T>,
): number {
  if (!record) return 0;
  return getCoverage(keys.map((key) => record[key]));
}

export function getDatasetCoverage<T>(
  rows: T[] | null | undefined,
  selectors: Array<(row: T) => unknown>,
): number {
  if (!rows || rows.length === 0 || selectors.length === 0) return 0;

  let total = 0;
  let populated = 0;
  for (const row of rows) {
    for (const selector of selectors) {
      total += 1;
      if (hasDataValue(selector(row))) populated += 1;
    }
  }

  return total === 0 ? 0 : clampCoverage(populated / total);
}

export function getLatestDate(candidates: Array<string | null | undefined>): string | null {
  const parsed = candidates
    .map((value) => {
      if (!value) return null;
      const timestamp = Date.parse(value);
      return Number.isNaN(timestamp) ? null : { value, timestamp };
    })
    .filter((entry): entry is { value: string; timestamp: number } => entry != null);

  if (parsed.length === 0) {
    return candidates.find((candidate): candidate is string => Boolean(candidate)) ?? null;
  }

  parsed.sort((left, right) => right.timestamp - left.timestamp);
  return parsed[0]?.value ?? null;
}

export function buildDataMeta(input: {
  asOf?: string | null;
  asOfCandidates?: Array<string | null | undefined>;
  coverage?: number;
  note?: string | null;
  status?: DataStatus;
  unitLabel?: string | null;
}): DataMeta {
  const asOf = input.asOf ?? getLatestDate(input.asOfCandidates ?? []);
  const coverage = clampCoverage(input.coverage ?? 0);
  const status = input.status
    ?? (coverage <= 0 ? "unavailable" : coverage < 0.999 ? "partial" : "delayed");

  return {
    asOf,
    status,
    coverage,
    note: input.note ?? null,
    unitLabel: input.unitLabel ?? null,
  };
}

export function shouldRenderChart(points: unknown[] | null | undefined, minPoints = 3): boolean {
  return (points?.length ?? 0) >= minPoints;
}

export function shouldCollapseSparseGrid(
  values: unknown[],
  threshold = 0.6,
): boolean {
  return getCoverage(values) < threshold;
}

export function completenessScore(values: unknown[]): number {
  return getCoverage(values);
}

export function formatCoverageLabel(coverage: number): string {
  return `${Math.round(clampCoverage(coverage) * 100)}% coverage`;
}

export function dedupeByKey<T>(items: T[], keySelector: (item: T) => string): T[] {
  const seen = new Set<string>();
  const result: T[] = [];

  for (const item of items) {
    const key = keySelector(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result;
}
