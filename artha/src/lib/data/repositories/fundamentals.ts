import { BaseRepository } from "./base";
import type { QuarterlyResult, BalanceSheet, CashFlow, ShareholdingPattern } from "../types";

 type FundamentalRow = {
     period_end_date: string;
     fiscal_quarter: string | null;
     fiscal_year: string | null;
     is_consolidated: number;
     revenue: number | null;
     operating_profit: number | null;
     ebit: number | null;
     interest: number | null;
     pbt: number | null;
     tax: number | null;
     pat: number | null;
     eps: number | null;
     total_assets: number | null;
     total_equity: number | null;
     total_debt: number | null;
     cash_equivalents: number | null;
     cfo: number | null;
     capex: number | null;
     fcf: number | null;
     book_value_per_share: number | null;
     shares_outstanding: number | null;
     source: string | null;
 };

 type AnnualFundamentalRow = {
     period_end_date: string;
     fiscal_year: string;
     revenue: number | null;
     operating_profit: number | null;
     ebit: number | null;
     interest: number | null;
     pbt: number | null;
     tax: number | null;
     pat: number | null;
     eps: number | null;
     total_assets: number | null;
     total_equity: number | null;
     total_debt: number | null;
     cash_equivalents: number | null;
     cfo: number | null;
     capex: number | null;
     fcf: number | null;
     shares_outstanding: number | null;
     source: string | null;
 };

export class FundamentalsRepository extends BaseRepository {
    private parsePeriodDate(dateStr: string): Date | null {
        if (!dateStr) return null;
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            const d = new Date(`${dateStr}T00:00:00Z`);
            return Number.isNaN(d.getTime()) ? null : d;
        }
        const monthMap: Record<string, number> = {
            jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
            jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
        };
        const compact = /^([A-Za-z]{3})-(\d{2})$/.exec(dateStr);
        if (compact) {
            const month = monthMap[compact[1].toLowerCase()];
            const year = 2000 + Number(compact[2]);
            return new Date(Date.UTC(year, month, 1));
        }
        const spaced = /^([A-Za-z]{3})\s+(\d{4})$/.exec(dateStr);
        if (spaced) {
            const month = monthMap[spaced[1].toLowerCase()];
            const year = Number(spaced[2]);
            return new Date(Date.UTC(year, month, 1));
        }
        const d = new Date(dateStr);
        return Number.isNaN(d.getTime()) ? null : d;
    }

    private periodToQuarter(dateStr: string): string {
        if (!dateStr) return "";
        if (/^[A-Za-z]{3}-\d{2}$/.test(dateStr)) return dateStr;
        const d = this.parsePeriodDate(dateStr);
        if (!d) return dateStr;
        return `${d.toLocaleString("en-IN", { month: "short", timeZone: "UTC" })}-${String(d.getUTCFullYear()).slice(2)}`;
    }

    private periodToFY(dateStr: string): string {
        if (!dateStr) return "";
        const d = this.parsePeriodDate(dateStr);
        if (!d) return dateStr;
        const y = d.getUTCMonth() < 3 ? d.getUTCFullYear() : d.getUTCFullYear() + 1;
        return `FY${String(y).slice(2)}`;
    }

    private sortByPeriodDesc<T extends { period_end_date: string }>(rows: T[]): T[] {
        return [...rows].sort((a, b) => {
            const aTime = this.parsePeriodDate(a.period_end_date)?.getTime() ?? 0;
            const bTime = this.parsePeriodDate(b.period_end_date)?.getTime() ?? 0;
            if (aTime !== bTime) return bTime - aTime;
            return b.period_end_date.localeCompare(a.period_end_date);
        });
    }

    private getFundamentalRows(assetId: string, isConsolidated: boolean = true): FundamentalRow[] {
        const rows = this.db.queryAll<FundamentalRow>(
            `SELECT period_end_date, fiscal_quarter, fiscal_year, is_consolidated,
                    revenue, operating_profit, ebit, interest, pbt, tax, pat, eps,
                    total_assets, total_equity, total_debt, cash_equivalents,
                    cfo, capex, fcf, book_value_per_share, shares_outstanding, source
             FROM fundamentals
             WHERE asset_id = ? AND is_consolidated = ?`,
            [assetId, isConsolidated ? 1 : 0]
        );
        return this.sortByPeriodDesc(rows);
    }

    private deriveShares(row: Pick<FundamentalRow, "shares_outstanding" | "pat" | "eps"> | null | undefined): number | null {
        if (!row) return null;
        if (row.shares_outstanding && row.shares_outstanding > 0) return row.shares_outstanding;
        if (row.pat != null && row.eps != null && row.eps !== 0) {
            return (row.pat * 1e7) / row.eps;
        }
        return null;
    }

    private buildAnnualRows(rows: FundamentalRow[]): AnnualFundamentalRow[] {
        const grouped = new Map<string, AnnualFundamentalRow>();
        for (const row of rows) {
            const fiscalYear = row.fiscal_year ?? this.periodToFY(row.period_end_date);
            const existing = grouped.get(fiscalYear);
            if (!existing) {
                grouped.set(fiscalYear, {
                    period_end_date: row.period_end_date,
                    fiscal_year: fiscalYear,
                    revenue: row.revenue ?? 0,
                    operating_profit: row.operating_profit ?? 0,
                    ebit: row.ebit ?? 0,
                    interest: row.interest ?? 0,
                    pbt: row.pbt ?? 0,
                    tax: row.tax ?? 0,
                    pat: row.pat ?? 0,
                    eps: row.eps ?? 0,
                    total_assets: row.total_assets,
                    total_equity: row.total_equity,
                    total_debt: row.total_debt,
                    cash_equivalents: row.cash_equivalents,
                    cfo: row.cfo ?? 0,
                    capex: row.capex ?? 0,
                    fcf: row.fcf ?? 0,
                    shares_outstanding: row.shares_outstanding,
                    source: row.source,
                });
                continue;
            }
            existing.revenue = (existing.revenue ?? 0) + (row.revenue ?? 0);
            existing.operating_profit = (existing.operating_profit ?? 0) + (row.operating_profit ?? 0);
            existing.ebit = (existing.ebit ?? 0) + (row.ebit ?? 0);
            existing.interest = (existing.interest ?? 0) + (row.interest ?? 0);
            existing.pbt = (existing.pbt ?? 0) + (row.pbt ?? 0);
            existing.tax = (existing.tax ?? 0) + (row.tax ?? 0);
            existing.pat = (existing.pat ?? 0) + (row.pat ?? 0);
            existing.eps = (existing.eps ?? 0) + (row.eps ?? 0);
            existing.cfo = (existing.cfo ?? 0) + (row.cfo ?? 0);
            existing.capex = (existing.capex ?? 0) + (row.capex ?? 0);
            existing.fcf = (existing.fcf ?? 0) + (row.fcf ?? 0);
        }
        return this.sortByPeriodDesc(Array.from(grouped.values()));
    }

    public estimateMarketCap(assetId: string, price: number, _faceValue: number | null): number | null {
        const rows = this.getFundamentalRows(assetId, true);
        const shares = rows.map((row) => this.deriveShares(row)).find((value) => value != null) ?? null;
        if (!shares || price <= 0) return null;
        return +((shares * price) / 1e7).toFixed(2);
    }

    public getCompanyData(_assetId: string) {
        // MSI ratings are deprecated; returning placeholder object to satisfy frontend types
        return {
            composite_rating: null,
            eps_rating: null,
            rs_rating: null,
            smr_rating: null,
            week_high_52: null,
            week_low_52: null,
            pct_from_high: null,
        };
    }

    public getTtmRatios(assetId: string, isConsolidated: boolean = true) {
        const rows = this.getFundamentalRows(assetId, isConsolidated);
        if (!rows.length) return null;
        const trailing = rows.slice(0, 4);
        const latest = rows.find((row) => row.total_equity != null || row.total_debt != null || row.total_assets != null || row.cash_equivalents != null) ?? rows[0];
        const shares = rows.map((row) => this.deriveShares(row)).find((value) => value != null) ?? null;
        const ttmPat = trailing.reduce((sum, row) => sum + (row.pat ?? 0), 0);
        const ttmEps = trailing.reduce((sum, row) => sum + (row.eps ?? 0), 0);
        const ttmRev = trailing.reduce((sum, row) => sum + (row.revenue ?? 0), 0);
        const ttmOperatingProfit = trailing.reduce((sum, row) => sum + (row.operating_profit ?? 0), 0);
        const ttmEbit = trailing.reduce((sum, row) => sum + (row.ebit ?? 0), 0);
        const equity = latest.total_equity ?? null;
        const debt = latest.total_debt ?? null;
        const totalAssets = latest.total_assets ?? null;
        const cash = latest.cash_equivalents ?? null;
        const bookValuePerShare = latest.book_value_per_share ?? (equity != null && shares ? +((equity * 1e7) / shares).toFixed(2) : null);
        return {
            ttmPat,
            ttmEps,
            ttmRev,
            ttmOperatingProfit,
            ttmEbit,
            equity,
            debt,
            totalAssets,
            cash,
            shares,
            bookValuePerShare,
        };
    }

    public getLatestShares(assetId: string, _faceValue: number): number | null {
        const rows = this.getFundamentalRows(assetId, true);
        return rows.map((row) => this.deriveShares(row)).find((value) => value != null) ?? null;
    }

    public getQuarterly(assetId: string, isConsolidated: boolean = true): QuarterlyResult[] {
        const rows = this.getFundamentalRows(assetId, isConsolidated).slice(0, 16);

        return rows.map((r) => {
            const patMargin = r.revenue && r.pat ? +((r.pat / r.revenue) * 100).toFixed(1) : null;
            const opMargin = r.revenue && r.operating_profit ? +((r.operating_profit / r.revenue) * 100).toFixed(1) : null;
            return {
                periodEnd: r.period_end_date,
                quarter: this.periodToQuarter(r.period_end_date),
                periodType: "QUARTER",
                revenue: r.revenue,
                operatingProfit: r.operating_profit,
                ebitda: r.operating_profit,
                pat: r.pat,
                netProfit: r.pat,
                eps: r.eps,
                ebitdaMargin: opMargin,
                patMargin,
            };
        });
    }

    public getAnnual(assetId: string, isConsolidated: boolean = true): QuarterlyResult[] {
        const rows = this.buildAnnualRows(this.getFundamentalRows(assetId, isConsolidated)).slice(0, 10);
        return rows.map((r) => {
            const patMargin = r.revenue && r.pat ? +((r.pat / r.revenue) * 100).toFixed(1) : null;
            const opMargin = r.revenue && r.operating_profit ? +((r.operating_profit / r.revenue) * 100).toFixed(1) : null;
            return {
                periodEnd: r.period_end_date,
                quarter: r.fiscal_year,
                periodType: "annual",
                revenue: r.revenue,
                operatingProfit: r.operating_profit,
                ebitda: r.operating_profit,
                pat: r.pat,
                netProfit: r.pat,
                cfo: r.cfo,
                eps: r.eps,
                ebitdaMargin: opMargin,
                patMargin,
            };
        });
    }

    public getBalanceSheet(assetId: string, isConsolidated: boolean = true): BalanceSheet[] {
        const rows = this.buildAnnualRows(this.getFundamentalRows(assetId, isConsolidated)).slice(0, 10);
        return rows.map((r) => {
            const shares = this.deriveShares(r);
            const equityCapital = shares ? +((shares / 1e7) * 1).toFixed(2) : null;
            const debt = r.total_debt ?? null;
            const equity = r.total_equity ?? null;
            const debtEquity = equity != null && equity > 0 && debt != null ? +(debt / equity).toFixed(2) : null;
            return {
                periodEnd: r.period_end_date,
                periodEndDate: r.period_end_date,
                year: r.fiscal_year,
                totalAssets: r.total_assets,
                totalEquity: equity || null,
                totalDebt: debt || null,
                equityCapital,
                reserves: equityCapital != null && equity != null ? +(equity - equityCapital).toFixed(2) : null,
                cash: r.cash_equivalents ?? null,
                cashEquivalents: r.cash_equivalents ?? null,
                tradeReceivables: null,
                borrowings: debt || null,
                bookValue: r.shares_outstanding && r.shares_outstanding > 0 && equity != null
                    ? +((equity * 1e7) / r.shares_outstanding).toFixed(2)
                    : null,
                debtEquity,
            };
        });
    }

    public getCashFlow(assetId: string, isConsolidated: boolean = true): CashFlow[] {
        const rows = this.buildAnnualRows(this.getFundamentalRows(assetId, isConsolidated)).slice(0, 10);

        return rows.map((r) => {
            const opCF = r.cfo ?? null;
            const capex = r.capex ?? null;
            const invCF = capex != null ? -Math.abs(capex) : null;
            const finCF = null;

            return {
                periodEnd: r.period_end_date,
                periodEndDate: r.period_end_date,
                year: r.fiscal_year,
                operatingCF: opCF,
                cashFromOperating: opCF,
                investingCF: invCF,
                cashFromInvesting: invCF,
                financingCF: finCF,
                cashFromFinancing: finCF,
                freeCF: r.fcf ?? null,
                freeCashFlow: r.fcf ?? null,
                capex,
            };
        });
    }

    public getFinancialRatios(assetId: string, isConsolidated: boolean = true) {
        const rows = this.getFundamentalRows(assetId, isConsolidated).slice(0, 12);
        return rows.map((row) => {
            const operatingMargin = row.revenue && row.operating_profit != null ? +((row.operating_profit / row.revenue) * 100).toFixed(2) : null;
            const patMargin = row.revenue && row.pat != null ? +((row.pat / row.revenue) * 100).toFixed(2) : null;
            const roce = row.ebit != null && row.total_equity != null
                ? +((row.ebit / Math.max((row.total_equity ?? 0) + (row.total_debt ?? 0), 1)) * 100).toFixed(2)
                : null;
            return {
                periodEndDate: row.period_end_date,
                debtorDays: null,
                inventoryDays: null,
                daysPayable: null,
                roce,
                operatingMargin,
                patMargin,
            };
        });
    }

    public getOwnership(assetId: string): ShareholdingPattern[] {
        const msiSH = this.db.queryAll<{
            period_end_date: string;
            promoter_holding: number | null;
            fii_holding: number | null;
            dii_holding: number | null;
            public_holding: number | null;
            pledged_shares: number | null;
        }>(
            `SELECT period_end_date, promoter_holding, fii_holding, dii_holding,
                  public_holding, pledged_shares
             FROM src_msi_shareholding WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 8`,
            [assetId]
        );

        const scrSH = this.db.queryAll<{
            period_end_date: string;
            promoters_pct: number | null;
            fii_pct: number | null;
            dii_pct: number | null;
            public_pct: number | null;
        }>(
            `SELECT period_end_date, promoters_pct, fii_pct, dii_pct, public_pct
             FROM src_screener_shareholding WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 8`,
            [assetId]
        );

        const useMsi = scrSH.length === 0 && msiSH.length > 0;
        type AnyShRow = { period_end_date: string; promoter_holding?: number | null; fii_holding?: number | null; dii_holding?: number | null; public_holding?: number | null; pledged_shares?: number | null; promoters_pct?: number | null; fii_pct?: number | null; dii_pct?: number | null; public_pct?: number | null };
        const typedShRows: AnyShRow[] = scrSH.length > 0 ? scrSH as AnyShRow[] : msiSH as AnyShRow[];
        return typedShRows.map((r) => {
            const n = (v: number | null | undefined) => v ?? undefined;
            return {
                quarterEnd: r.period_end_date,
                quarter: this.periodToQuarter(r.period_end_date),
                promoter: n(useMsi ? r.promoter_holding : r.promoters_pct),
                promoterPct: n(useMsi ? r.promoter_holding : r.promoters_pct),
                fii: n(useMsi ? r.fii_holding : r.fii_pct),
                fiiPct: n(useMsi ? r.fii_holding : r.fii_pct),
                dii: n(useMsi ? r.dii_holding : r.dii_pct),
                diiPct: n(useMsi ? r.dii_holding : r.dii_pct),
                retail: n(useMsi ? r.public_holding : r.public_pct),
                publicPct: n(useMsi ? r.public_holding : r.public_pct),
                pledged: n(useMsi ? r.pledged_shares : undefined),
                pledgedPct: n(useMsi ? r.pledged_shares : undefined),
            };
        });
    }

    public getLatestRollingPeHistory(assetId: string, price: number) {
        const qRows = this.getFundamentalRows(assetId, true)
            .slice(0, 8)
            .map((row) => ({ period_end_date: row.period_end_date, eps: row.eps }));

        const ratioHistory = qRows.slice(0, 5).map((_, i: number) => {
            const slice = qRows.slice(i, i + 4);
            const ttmEps = slice.reduce((sum, row) => sum + (row.eps ?? 0), 0);
            return {
                computedDate: qRows[i]?.period_end_date,
                peTtm: ttmEps > 0 ? +(price / ttmEps).toFixed(1) : null,
            };
        });

        return { ratioHistory, lastQuarter: qRows[0] };
    }

    public getRecentCashFlow(assetId: string) {
        const row = this.getFundamentalRows(assetId, true).find((item) => item.cfo != null);
        if (row?.cfo != null) {
            return { net_cash_operating: row.cfo };
        }
        return null;
    }
}
