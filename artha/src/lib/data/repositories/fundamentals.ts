import { BaseRepository } from "./base";
import type { QuarterlyResult, BalanceSheet, CashFlow, ShareholdingPattern } from "../types";

export class FundamentalsRepository extends BaseRepository {

    // ── Helper: compute quarter label from ISO date ───────────────────────────────
    private periodToQuarter(dateStr: string): string {
        if (!dateStr) return "";
        if (dateStr.includes("-") && dateStr.length <= 6) return dateStr;
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        const month = d.getMonth(); // 0-indexed
        const year = String(d.getFullYear()).slice(2);
        const qMap: Record<number, string> = { 5: "Jun", 8: "Sep", 11: "Dec", 2: "Mar" };
        const label = qMap[month] ?? d.toLocaleString("en-IN", { month: "short" });
        return `${label}-${year}`;
    }

    private periodToFY(dateStr: string): string {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        // Indian FY: Apr 1 to Mar 31; year ending Mar 31 2025 → FY25
        const y = d.getMonth() < 3 ? d.getFullYear() : d.getFullYear() + 1;
        return `FY${String(y).slice(2)}`;
    }

    public estimateMarketCap(assetId: string, price: number, faceValue: number | null): number | null {
        const bs = this.db.queryOne<{ equity_capital: number }>(
            `SELECT equity_capital FROM src_msi_balance_sheet
             WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 1`,
            [assetId]
        );
        if (!bs?.equity_capital || !faceValue) return null;
        // equity_capital in ₹ Cr → shares = (cr * 1e7) / face_value
        const shares = (bs.equity_capital * 1e7) / faceValue;
        return +((shares * price) / 1e7).toFixed(2); // result in ₹ Cr
    }

    public getCompanyData(assetId: string) {
        // Use MSI company data for ratings/scores
        const msiData = this.db.queryOne<{
            composite_rating: number | null;
            eps_rating: number | null;
            rs_rating: number | null;
            smr_rating: string | null;
            week_high_52: number | null;
            week_low_52: number | null;
            pct_from_high: number | null;
        }>(
            `SELECT composite_rating, eps_rating, rs_rating, smr_rating,
                  week_high_52, week_low_52, pct_from_high
             FROM src_msi_company_data WHERE asset_id = ?`,
            [assetId]
        );
        return msiData ?? null;
    }

    public getTtmRatios(assetId: string) {
        // Read directly from golden fundamentals table
        const rows = this.db.queryAll<{
            period_end_date: string;
            pat: number | null;
            eps: number | null;
            revenue: number | null;
        }>(
            `SELECT period_end_date, pat, eps, revenue
             FROM fundamentals WHERE asset_id = ?
             ORDER BY period_end_date DESC LIMIT 4`,
            [assetId]
        );

        const bs = this.db.queryOne<{
            equity_capital: number | null;
            reserves: number | null;
            long_term_borrowings: number | null;
            short_term_borrowings: number | null;
            total_assets: number | null;
        }>(
            `SELECT equity_capital, reserves, long_term_borrowings, short_term_borrowings, total_assets
             FROM src_msi_balance_sheet WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 1`,
            [assetId]
        );

        if (!rows.length) return null;

        const ttmPat = rows.reduce((s: number, r: any) => s + (r.pat ?? 0), 0);
        const ttmEps = rows.reduce((s: number, r: any) => s + (r.eps ?? 0), 0);
        const ttmRev = rows.reduce((s: number, r: any) => s + (r.revenue ?? 0), 0);

        const equity = bs ? (bs.equity_capital ?? 0) + (bs.reserves ?? 0) : null;
        const debt = bs ? (bs.long_term_borrowings ?? 0) + (bs.short_term_borrowings ?? 0) : null;

        return { ttmPat, ttmEps, ttmRev, equity, debt, totalAssets: bs?.total_assets };
    }

    public getLatestShares(assetId: string, faceValue: number): number | null {
        const bs = this.db.queryOne<{ equity_capital: number }>(
            `SELECT equity_capital FROM src_msi_balance_sheet WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 1`,
            [assetId]
        );
        if (!bs?.equity_capital) return null;
        return (bs.equity_capital * 1e7) / faceValue;
    }

    public getQuarterly(assetId: string): QuarterlyResult[] {
        // Now reads from the heavily-optimized Golden "fundamentals" table
        const rows = this.db.queryAll<{
            period_end_date: string;
            revenue: number | null;
            operating_profit: number | null;
            pat: number | null;
            eps: number | null;
        }>(
            `SELECT period_end_date, revenue, 
                    (ebit + depreciation) as operating_profit, 
                    pat, eps
             FROM fundamentals
             WHERE asset_id = ?
             ORDER BY period_end_date DESC LIMIT 16`,
            [assetId]
        );

        return rows.map((r: any) => {
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

    public getBalanceSheet(assetId: string): BalanceSheet[] {
        // Fallback-based logic (MSI preferred)
        const msiBS = this.db.queryAll<{
            period_end_date: string;
            equity_capital: number | null;
            reserves: number | null;
            long_term_borrowings: number | null;
            short_term_borrowings: number | null;
            total_assets: number | null;
            cash_equivalents: number | null;
            trade_receivables: number | null;
        }>(
            `SELECT period_end_date, equity_capital, reserves, long_term_borrowings,
                  short_term_borrowings, total_assets, cash_equivalents, trade_receivables
             FROM src_msi_balance_sheet WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 10`,
            [assetId]
        );

        const scrBS = this.db.queryAll<{
            period_end_date: string;
            share_capital: number | null;
            reserves: number | null;
            borrowings: number | null;
            total_assets: number | null;
            investments: number | null;
        }>(
            `SELECT period_end_date, share_capital, reserves, borrowings, total_assets, investments
             FROM src_screener_balance_sheet WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 10`,
            [assetId]
        );

        const isMsi = msiBS.length > 0;
        type AnyBsRow = { period_end_date: string; reserves: number | null; total_assets: number | null; equity_capital?: number | null; long_term_borrowings?: number | null; short_term_borrowings?: number | null; cash_equivalents?: number | null; trade_receivables?: number | null; share_capital?: number | null; borrowings?: number | null };
        const bsRows: AnyBsRow[] = isMsi ? msiBS as AnyBsRow[] : scrBS as AnyBsRow[];
        return bsRows.map((r) => {
            const equity = isMsi
                ? (r.equity_capital ?? 0) + (r.reserves ?? 0)
                : (r.share_capital ?? 0) + (r.reserves ?? 0);
            const debt = isMsi
                ? (r.long_term_borrowings ?? 0) + (r.short_term_borrowings ?? 0)
                : r.borrowings ?? 0;
            const debtEquity = equity > 0 ? +(debt / equity).toFixed(2) : null;
            return {
                periodEnd: r.period_end_date,
                year: this.periodToFY(r.period_end_date),
                totalAssets: r.total_assets ?? null,
                totalEquity: equity || null,
                totalDebt: debt || null,
                equityCapital: isMsi ? r.equity_capital ?? null : r.share_capital ?? null,
                reserves: r.reserves ?? null,
                cash: isMsi ? r.cash_equivalents ?? null : null,
                cashEquivalents: isMsi ? r.cash_equivalents ?? null : null,
                tradeReceivables: isMsi ? r.trade_receivables ?? null : null,
                borrowings: debt || null,
                debtEquity,
            };
        });
    }

    public getCashFlow(assetId: string): CashFlow[] {
        const msiCF = this.db.queryAll<{
            period_end_date: string;
            net_cash_operating: number | null;
            net_cash_investing: number | null;
            net_cash_financing: number | null;
            capex: number | null;
        }>(
            `SELECT period_end_date, net_cash_operating, net_cash_investing,
                  net_cash_financing, capex
             FROM src_msi_cash_flows WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 10`,
            [assetId]
        );

        const scrCF = this.db.queryAll<{
            period_end_date: string;
            cash_from_operating: number | null;
            cash_from_investing: number | null;
            cash_from_financing: number | null;
        }>(
            `SELECT period_end_date, cash_from_operating, cash_from_investing, cash_from_financing
             FROM src_screener_cashflow WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 10`,
            [assetId]
        );

        const isCfMsi = msiCF.length > 0;
        type AnyCfRow = { period_end_date: string; net_cash_operating?: number | null; net_cash_investing?: number | null; net_cash_financing?: number | null; capex?: number | null; cash_from_operating?: number | null; cash_from_investing?: number | null; cash_from_financing?: number | null };
        const cfRows: AnyCfRow[] = isCfMsi ? msiCF as AnyCfRow[] : scrCF as AnyCfRow[];
        return cfRows.map((r) => {
            const opCF = isCfMsi ? r.net_cash_operating ?? null : r.cash_from_operating ?? null;
            const invCF = isCfMsi ? r.net_cash_investing ?? null : r.cash_from_investing ?? null;
            const finCF = isCfMsi ? r.net_cash_financing ?? null : r.cash_from_financing ?? null;
            const capex = isCfMsi ? r.capex ?? null : null;
            const freeCF = opCF != null && capex != null ? opCF + capex : null;
            return {
                periodEnd: r.period_end_date,
                year: this.periodToFY(r.period_end_date),
                operatingCF: opCF,
                cashFromOperating: opCF,
                investingCF: invCF,
                cashFromInvesting: invCF,
                financingCF: finCF,
                cashFromFinancing: finCF,
                freeCF,
                freeCashFlow: freeCF,
                capex,
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

        const useMsi = msiSH.length > 0;
        const shRows = useMsi ? msiSH : scrSH;

        type AnyShRow = { period_end_date: string; promoter_holding?: number | null; fii_holding?: number | null; dii_holding?: number | null; public_holding?: number | null; pledged_shares?: number | null; promoters_pct?: number | null; fii_pct?: number | null; dii_pct?: number | null; public_pct?: number | null };
        const typedShRows: AnyShRow[] = useMsi ? msiSH as AnyShRow[] : scrSH as AnyShRow[];
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
        // Build rolling P/E history from quarterly data (last 8 quarters)
        const qRows = this.db.queryAll<{ period_end_date: string; eps: number | null }>(
            `SELECT period_end_date, eps FROM fundamentals
             WHERE asset_id = ? ORDER BY period_end_date DESC LIMIT 8`,
            [assetId]
        );

        // TTM EPS for each quarter end (rolling sum of trailing 4)
        const ratioHistory = qRows.slice(0, 5).map((_: any, i: number) => {
            const slice = qRows.slice(i, i + 4);
            const ttmEps = slice.reduce((s: number, r: any) => s + (r.eps ?? 0), 0);
            return {
                computedDate: qRows[i]?.period_end_date,
                peTtm: ttmEps > 0 ? +(price / ttmEps).toFixed(1) : null,
            };
        });

        return { ratioHistory, lastQuarter: qRows[0] };
    }

    public getRecentCashFlow(assetId: string) {
        // CFO/PAT ratio (earnings quality)
        const cfRow = this.db.queryOne<{ net_cash_operating: number | null }>(
            `SELECT net_cash_operating FROM src_msi_cash_flows WHERE asset_id = ?
             ORDER BY period_end_date DESC LIMIT 1`,
            [assetId]
        );
        return cfRow ?? null;
    }
}
