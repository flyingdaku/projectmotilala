import { BaseRepository } from "./base";
import type { QuarterlyResult, BalanceSheet, CashFlow, ShareholdingPattern } from "../types";

type CompanyDataRow = {
    composite_rating: number | null;
    eps_rating: number | null;
    rs_rating: number | null;
    smr_rating: string | null;
    acc_dis_rating: string | null;
    price_strength: number | null;
    week_high_52: number | null;
    week_low_52: number | null;
    pct_from_high: number | null;
    buyer_demand: string | null;
    group_rank: number | null;
};

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
     trade_receivables: number | null;
     cfo: number | null;
     cash_from_investing: number | null;
     cash_from_financing: number | null;
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
     trade_receivables: number | null;
     cfo: number | null;
     cash_from_investing: number | null;
     cash_from_financing: number | null;
     capex: number | null;
     fcf: number | null;
     shares_outstanding: number | null;
     source: string | null;
 };

export class FundamentalsRepository extends BaseRepository {
    private tableExists(tableName: string): boolean {
        const row = this.db.queryOne<{ name: string }>(
            `SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?`,
            [tableName]
        );
        return !!row;
    }

    private getSourceFundamentalRows(assetId: string, isConsolidated: boolean): FundamentalRow[] {
        const incomeTable = isConsolidated ? "src_msi_quarterly" : "src_msi_quarterly_standalone";
        const balanceSheetTable = isConsolidated ? "src_msi_balance_sheet" : "src_msi_balance_sheet_standalone";
        const cashflowTable = isConsolidated ? "src_msi_cashflow" : "src_msi_cashflow_standalone";
        const ratioTable = isConsolidated ? "src_msi_ratios" : "src_msi_ratios_standalone";

        if (!this.tableExists(incomeTable)) {
            return [];
        }

        const balanceSheetSource = this.tableExists(balanceSheetTable)
            ? balanceSheetTable
            : `(SELECT NULL AS asset_id, NULL AS period_end_date, NULL AS total_assets,
                       NULL AS shareholders_funds_total, NULL AS equity_capital, NULL AS reserves,
                       NULL AS long_term_borrowings, NULL AS short_term_borrowings,
                       NULL AS cash_equivalents, NULL AS trade_receivables,
                       NULL AS equity_shares_number)`;
        const cashflowSource = this.tableExists(cashflowTable)
            ? cashflowTable
            : `(SELECT NULL AS asset_id, NULL AS period_end_date, NULL AS net_cash_operating,
                       NULL AS net_cash_investing, NULL AS net_cash_financing,
                       NULL AS capex, NULL AS free_cash_flow)`;
        const ratioSource = this.tableExists(ratioTable)
            ? ratioTable
            : `(SELECT NULL AS asset_id, NULL AS period_end_date, NULL AS basic_eps,
                       NULL AS book_value_per_share)`;

        const rows = this.db.queryAll<FundamentalRow>(
            `SELECT q.period_end_date,
                    NULL as fiscal_quarter,
                    NULL as fiscal_year,
                    ${isConsolidated ? 1 : 0} as is_consolidated,
                    COALESCE(q.total_revenue, q.revenue_ops) as revenue,
                    q.operating_profit,
                    q.ebit,
                    q.finance_costs as interest,
                    q.profit_before_tax as pbt,
                    CASE
                        WHEN q.tax_amount IS NOT NULL THEN q.tax_amount
                        WHEN q.profit_before_tax IS NOT NULL AND q.net_profit IS NOT NULL THEN q.profit_before_tax - q.net_profit
                        ELSE NULL
                    END as tax,
                    q.net_profit as pat,
                    COALESCE(q.basic_eps, r.basic_eps) as eps,
                    bs.total_assets,
                    COALESCE(bs.shareholders_funds_total,
                             CASE
                                 WHEN bs.equity_capital IS NOT NULL AND bs.reserves IS NOT NULL THEN bs.equity_capital + bs.reserves
                                 ELSE NULL
                             END) as total_equity,
                    CASE
                        WHEN bs.long_term_borrowings IS NOT NULL OR bs.short_term_borrowings IS NOT NULL THEN COALESCE(bs.long_term_borrowings, 0) + COALESCE(bs.short_term_borrowings, 0)
                        ELSE NULL
                    END as total_debt,
                    bs.cash_equivalents,
                    bs.trade_receivables,
                    cf.net_cash_operating as cfo,
                    cf.net_cash_investing as cash_from_investing,
                    cf.net_cash_financing as cash_from_financing,
                    CASE
                        WHEN cf.capex IS NOT NULL THEN ABS(cf.capex)
                        WHEN cf.net_cash_investing IS NOT NULL THEN ABS(cf.net_cash_investing)
                        ELSE NULL
                    END as capex,
                    COALESCE(cf.free_cash_flow,
                             CASE
                                 WHEN cf.net_cash_operating IS NOT NULL AND cf.capex IS NOT NULL THEN cf.net_cash_operating - ABS(cf.capex)
                                 WHEN cf.net_cash_operating IS NOT NULL AND cf.net_cash_investing IS NOT NULL THEN cf.net_cash_operating + cf.net_cash_investing
                                 ELSE NULL
                             END) as fcf,
                    COALESCE(r.book_value_per_share,
                             CASE
                                 WHEN bs.equity_shares_number IS NOT NULL AND bs.equity_shares_number != 0 AND COALESCE(bs.shareholders_funds_total,
                                     CASE
                                         WHEN bs.equity_capital IS NOT NULL AND bs.reserves IS NOT NULL THEN bs.equity_capital + bs.reserves
                                         ELSE NULL
                                     END) IS NOT NULL
                                 THEN COALESCE(bs.shareholders_funds_total,
                                     CASE
                                         WHEN bs.equity_capital IS NOT NULL AND bs.reserves IS NOT NULL THEN bs.equity_capital + bs.reserves
                                         ELSE NULL
                                     END) / bs.equity_shares_number
                                 ELSE NULL
                             END) as book_value_per_share,
                    bs.equity_shares_number as shares_outstanding,
                    'MSI' as source
             FROM ${incomeTable} q
             LEFT JOIN ${balanceSheetSource} bs
               ON bs.asset_id = q.asset_id AND bs.period_end_date = q.period_end_date
             LEFT JOIN ${cashflowSource} cf
               ON cf.asset_id = q.asset_id AND cf.period_end_date = q.period_end_date
             LEFT JOIN ${ratioSource} r
               ON r.asset_id = q.asset_id AND r.period_end_date = q.period_end_date
             WHERE q.asset_id = ?
             ORDER BY q.period_end_date DESC`,
            [assetId]
        );
        return this.sortByPeriodDesc(rows);
    }

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
                    total_assets, total_equity, total_debt, cash_equivalents, trade_receivables,
                    cfo, cash_from_investing, cash_from_financing, capex, fcf, book_value_per_share, shares_outstanding, source
             FROM fundamentals
             WHERE asset_id = ? AND is_consolidated = ?`,
            [assetId, isConsolidated ? 1 : 0]
        );
        if (rows.length > 0) {
            return this.sortByPeriodDesc(rows);
        }
        return this.getSourceFundamentalRows(assetId, isConsolidated);
    }

    private deriveShares(row: Pick<FundamentalRow, "shares_outstanding" | "pat" | "eps"> | null | undefined): number | null {
        if (!row) return null;
        if (row.shares_outstanding && row.shares_outstanding > 0) return row.shares_outstanding;
        if (row.pat != null && row.eps != null && row.eps !== 0) {
            return row.pat / row.eps;
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
                    trade_receivables: row.trade_receivables,
                    cfo: row.cfo ?? null,
                    cash_from_investing: row.cash_from_investing ?? null,
                    cash_from_financing: row.cash_from_financing ?? null,
                    capex: row.capex ?? null,
                    fcf: row.fcf ?? null,
                    shares_outstanding: row.shares_outstanding,
                    source: row.source,
                });
                continue;
            }
            existing.total_debt = existing.total_debt ?? row.total_debt;
            existing.cash_equivalents = existing.cash_equivalents ?? row.cash_equivalents;
            existing.trade_receivables = existing.trade_receivables ?? row.trade_receivables;
            existing.shares_outstanding = existing.shares_outstanding ?? row.shares_outstanding;
            existing.revenue = (existing.revenue ?? 0) + (row.revenue ?? 0);
            existing.operating_profit = (existing.operating_profit ?? 0) + (row.operating_profit ?? 0);
            existing.ebit = (existing.ebit ?? 0) + (row.ebit ?? 0);
            existing.interest = (existing.interest ?? 0) + (row.interest ?? 0);
            existing.pbt = (existing.pbt ?? 0) + (row.pbt ?? 0);
            existing.tax = (existing.tax ?? 0) + (row.tax ?? 0);
            existing.pat = (existing.pat ?? 0) + (row.pat ?? 0);
            existing.eps = (existing.eps ?? 0) + (row.eps ?? 0);
            if (row.cfo != null) existing.cfo = (existing.cfo ?? 0) + row.cfo;
            if (row.cash_from_investing != null) existing.cash_from_investing = (existing.cash_from_investing ?? 0) + row.cash_from_investing;
            if (row.cash_from_financing != null) existing.cash_from_financing = (existing.cash_from_financing ?? 0) + row.cash_from_financing;
            if (row.capex != null) existing.capex = (existing.capex ?? 0) + row.capex;
            if (row.fcf != null) existing.fcf = (existing.fcf ?? 0) + row.fcf;
        }
        return this.sortByPeriodDesc(Array.from(grouped.values()));
    }

    public estimateMarketCap(assetId: string, price: number, _faceValue: number | null): number | null {
        void _faceValue;
        const rows = this.getFundamentalRows(assetId, true);
        const shares = rows.map((row) => this.deriveShares(row)).find((value) => value != null) ?? null;
        if (!shares || price <= 0) return null;
        return +(shares * price).toFixed(2);
    }

    public getCompanyData(assetId: string): CompanyDataRow | null {
        const row = this.db.queryOne<CompanyDataRow>(
            `SELECT composite_rating, eps_rating, rs_rating, smr_rating, acc_dis_rating,
                    price_strength, week_high_52, week_low_52, pct_from_high,
                    buyer_demand, group_rank
             FROM msi_company_data
             WHERE asset_id = ?`,
            [assetId]
        );
        return row ?? null;
    }

    public getTtmRatios(assetId: string, isConsolidated: boolean = true) {
        const rows = this.getFundamentalRows(assetId, isConsolidated);
        if (!rows.length) return null;
        const trailing = rows.slice(0, 4);
        const latestWithEquity = rows.find((row) => row.total_equity != null);
        const latestAnyBS = rows.find((row) => row.total_debt != null || row.total_assets != null || row.cash_equivalents != null);
        const latest = latestWithEquity ?? latestAnyBS ?? rows[0];
        const shares = rows.map((row) => this.deriveShares(row)).find((value) => value != null) ?? null;
        const ttmPat = trailing.reduce((sum, row) => sum + (row.pat ?? 0), 0);
        const ttmEps = trailing.reduce((sum, row) => sum + (row.eps ?? 0), 0);
        const ttmRev = trailing.reduce((sum, row) => sum + (row.revenue ?? 0), 0);
        const ttmOperatingProfit = trailing.reduce((sum, row) => sum + (row.operating_profit ?? 0), 0);
        const ttmEbit = trailing.reduce((sum, row) => sum + (row.ebit ?? row.operating_profit ?? 0), 0);
        const equity = latest.total_equity ?? null;
        const debt = latest.total_debt ?? null;
        const totalAssets = latest.total_assets ?? null;
        const cash = latest.cash_equivalents ?? null;
        const bookValuePerShare = latest.book_value_per_share ?? (equity != null && shares && shares > 0 ? +(equity / shares).toFixed(2) : null);
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
        void _faceValue;
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
                ebit: r.ebit,
                interest: r.interest,
                pbt: r.pbt,
                tax: r.tax,
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
                ebit: r.ebit,
                interest: r.interest,
                pbt: r.pbt,
                tax: r.tax,
                pat: r.pat,
                netProfit: r.pat,
                cfo: r.cfo,
                eps: r.eps,
                ebitdaMargin: opMargin,
                patMargin,
            };
        });
    }

    private getMsiEquityCapital(assetId: string, isConsolidated: boolean): Map<string, number> {
        const table = isConsolidated ? 'src_msi_balance_sheet' : 'src_msi_balance_sheet_standalone';
        if (!this.tableExists(table)) return new Map();
        const rows = this.db.queryAll<{ period_end_date: string; equity_capital: number | null }>(
            `SELECT period_end_date, equity_capital FROM ${table} WHERE asset_id = ? AND equity_capital IS NOT NULL`,
            [assetId]
        );
        const result = new Map<string, number>();
        for (const row of rows) {
            const fyYear = this.periodToFY(row.period_end_date).replace('FY', '20');
            if (!result.has(fyYear) && row.equity_capital != null) {
                result.set(fyYear, row.equity_capital);
            }
        }
        return result;
    }

    public getBalanceSheet(assetId: string, isConsolidated: boolean = true): BalanceSheet[] {
        const rows = this.buildAnnualRows(this.getFundamentalRows(assetId, isConsolidated)).slice(0, 10);
        const equityCapByFY = this.getMsiEquityCapital(assetId, isConsolidated);
        return rows.map((r) => {
            const fyYear = r.fiscal_year.replace('FY', '20');
            const equityCapital = equityCapByFY.get(fyYear) ?? null;
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
                tradeReceivables: r.trade_receivables ?? null,
                borrowings: debt || null,
                bookValue: r.shares_outstanding && r.shares_outstanding > 0 && equity != null
                    ? +(equity / r.shares_outstanding).toFixed(2)
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
            const invCF = r.cash_from_investing ?? (capex != null ? -Math.abs(capex) : null);
            const finCF = r.cash_from_financing ?? null;

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
        type MsiRatioRow = {
            period_end_date: string;
            ebit_margin: number | null;
            pre_tax_margin: number | null;
            net_profit_margin: number | null;
            roe: number | null;
            roa: number | null;
            roce: number | null;
            debt_equity: number | null;
            current_ratio: number | null;
            quick_ratio: number | null;
            interest_coverage: number | null;
            asset_turnover: number | null;
            inventory_turnover: number | null;
            debtor_days: number | null;
            creditor_days: number | null;
            sales_growth_yoy: number | null;
            net_income_growth_yoy: number | null;
            basic_eps_growth_yoy: number | null;
            book_value_per_share: number | null;
            ebit_growth_yoy: number | null;
            pre_tax_income_growth_yoy: number | null;
            pbdit_margin: number | null;
            dividend_payout: number | null;
            earnings_retention: number | null;
            ev_ebitda: number | null;
        };
        const ratioTable = isConsolidated ? "src_msi_ratios" : "src_msi_ratios_standalone";
        const annualRatioTable = isConsolidated ? "msi_ratios_annual" : "msi_ratios_annual_standalone";
        const msiRows = this.tableExists(ratioTable)
            ? this.db.queryAll<MsiRatioRow>(
                `SELECT period_end_date, ebit_margin, pre_tax_margin, net_profit_margin,
                        roe, roa, roce, debt_equity, current_ratio, quick_ratio,
                        interest_coverage, asset_turnover, inventory_turnover,
                        debtor_days, creditor_days, sales_growth_yoy, net_income_growth_yoy,
                        basic_eps_growth_yoy, book_value_per_share, ebit_growth_yoy,
                        pre_tax_income_growth_yoy, pbdit_margin, dividend_payout,
                        earnings_retention, ev_ebitda
                 FROM ${ratioTable} WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 12`,
                [assetId]
            )
            : [];
        const msiByPeriod = new Map(msiRows.map((r) => [r.period_end_date, r]));

        const msiAnnualRows = this.tableExists(annualRatioTable)
            ? this.db.queryAll<MsiRatioRow>(
                `SELECT period_end_date, ebit_margin, pre_tax_margin, net_profit_margin,
                        roe, roa, roce, debt_equity, current_ratio, quick_ratio,
                        interest_coverage, asset_turnover, inventory_turnover,
                        debtor_days, creditor_days, sales_growth_yoy, net_income_growth_yoy,
                        basic_eps_growth_yoy, book_value_per_share, null as ebit_growth_yoy,
                        null as pre_tax_income_growth_yoy, pbdit_margin, dividend_payout,
                        earnings_retention, ev_ebitda
                 FROM ${annualRatioTable} WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 12`,
                [assetId]
            )
            : [];
        const msiAnnualByYear = new Map(msiAnnualRows.map((r) => [r.period_end_date, r]));

        const fundRows = this.getFundamentalRows(assetId, isConsolidated).slice(0, 12);
        return fundRows.map((row) => {
            const fyYear = this.periodToFY(row.period_end_date).replace('FY', '20');
            const msiAnnual = msiAnnualByYear.get(fyYear);
            const msi = msiByPeriod.get(row.period_end_date) ?? msiAnnual;
            const operatingMargin = msi?.ebit_margin ?? (row.revenue && row.operating_profit != null ? +((row.operating_profit / row.revenue) * 100).toFixed(2) : null);
            const patMargin = msi?.net_profit_margin ?? (row.revenue && row.pat != null ? +((row.pat / row.revenue) * 100).toFixed(2) : null);
            const returnBase = row.ebit ?? row.operating_profit;
            const computedRoce = returnBase != null && row.total_equity != null
                ? +((returnBase / Math.max((row.total_equity ?? 0) + (row.total_debt ?? 0), 1)) * 100).toFixed(2)
                : null;
            return {
                periodEndDate: row.period_end_date,
                debtorDays: msi?.debtor_days ?? null,
                inventoryDays: msi ? (msi.inventory_turnover && msi.inventory_turnover > 0 ? +(365 / msi.inventory_turnover).toFixed(1) : null) : null,
                daysPayable: msi?.creditor_days ?? null,
                roce: msi?.roce ?? computedRoce,
                roe: msi?.roe ?? null,
                roa: msi?.roa ?? null,
                operatingMargin,
                patMargin,
                ebitMargin: msi?.ebit_margin ?? null,
                preTaxMargin: msi?.pre_tax_margin ?? null,
                debtEquity: msi?.debt_equity ?? null,
                currentRatio: msi?.current_ratio ?? null,
                quickRatio: msi?.quick_ratio ?? null,
                interestCoverage: msi?.interest_coverage ?? null,
                assetTurnover: msi?.asset_turnover ?? null,
                inventoryTurnover: msi?.inventory_turnover ?? null,
                salesGrowthYoy: msi?.sales_growth_yoy ?? null,
                netIncomeGrowthYoy: msi?.net_income_growth_yoy ?? null,
                epsGrowthYoy: msi?.basic_eps_growth_yoy ?? null,
                bookValuePerShare: msi?.book_value_per_share ?? row.book_value_per_share ?? null,
                ebitGrowthYoy: msi?.ebit_growth_yoy ?? null,
                pbditMargin: msi?.pbdit_margin ?? null,
                dividendPayout: msi?.dividend_payout ?? null,
                earningsRetention: msi?.earnings_retention ?? null,
                evEbitda: msi?.ev_ebitda ?? null,
            };
        });
    }

    public getOwnership(assetId: string): ShareholdingPattern[] {
        const msiSH = this.tableExists("src_msi_shareholding") ? this.db.queryAll<{
            period_end_date: string;
            promoter_holding: number | null;
            promoter_change_qoq: number | null;
            fii_holding: number | null;
            fii_change_qoq: number | null;
            dii_holding: number | null;
            dii_change_qoq: number | null;
            public_holding: number | null;
            pledged_shares: number | null;
        }>(
            `SELECT period_end_date, promoter_holding, promoter_change_qoq,
                    fii_holding, fii_change_qoq, dii_holding, dii_change_qoq,
                    public_holding, pledged_shares
             FROM src_msi_shareholding WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 8`,
            [assetId]
        ) : [];

        const scrSH = this.tableExists("src_screener_shareholding") ? this.db.queryAll<{
            period_end_date: string;
            promoters_pct: number | null;
            fii_pct: number | null;
            dii_pct: number | null;
            public_pct: number | null;
        }>(
            `SELECT period_end_date, promoters_pct, fii_pct, dii_pct, public_pct
             FROM src_screener_shareholding WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 8`,
            [assetId]
        ) : [];

        const useMsi = msiSH.length > 0;
        type AnyShRow = { period_end_date: string; promoter_holding?: number | null; promoter_change_qoq?: number | null; fii_holding?: number | null; fii_change_qoq?: number | null; dii_holding?: number | null; dii_change_qoq?: number | null; public_holding?: number | null; pledged_shares?: number | null; promoters_pct?: number | null; fii_pct?: number | null; dii_pct?: number | null; public_pct?: number | null };
        const rawShRows: AnyShRow[] = useMsi ? msiSH as AnyShRow[] : scrSH as AnyShRow[];
        const typedShRows = this.sortByPeriodDesc(rawShRows);
        return typedShRows.map((r) => {
            const n = (v: number | null | undefined) => v ?? undefined;
            return {
                quarterEnd: r.period_end_date,
                quarter: this.periodToQuarter(r.period_end_date),
                promoter: n(useMsi ? r.promoter_holding : r.promoters_pct),
                promoterPct: n(useMsi ? r.promoter_holding : r.promoters_pct),
                promoterChangeQoq: n(useMsi ? r.promoter_change_qoq : undefined),
                fii: n(useMsi ? r.fii_holding : r.fii_pct),
                fiiPct: n(useMsi ? r.fii_holding : r.fii_pct),
                fiiChangeQoq: n(useMsi ? r.fii_change_qoq : undefined),
                dii: n(useMsi ? r.dii_holding : r.dii_pct),
                diiPct: n(useMsi ? r.dii_holding : r.dii_pct),
                diiChangeQoq: n(useMsi ? r.dii_change_qoq : undefined),
                retail: n(useMsi ? r.public_holding : r.public_pct),
                publicPct: n(useMsi ? r.public_holding : r.public_pct),
                pledged: n(useMsi ? r.pledged_shares : undefined),
                pledgedPct: n(useMsi ? r.pledged_shares : undefined),
                promoterPledgePct: n(useMsi ? r.pledged_shares : undefined),
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
