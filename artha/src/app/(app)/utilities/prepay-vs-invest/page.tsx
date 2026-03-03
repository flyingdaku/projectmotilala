"use client";

import React, { useState, useMemo } from "react";
import { ArrowLeftRight, Share2, Info } from "lucide-react";
import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import { formatINR } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LTCG_LIMIT = 125000;
const LTCG_TAX_RATE = 0.125;

function calculateAmortization(principal: number, annualRate: number, tenureMonths: number, extraMonthlyPayment: number = 0) {
    const monthlyRate = annualRate / 100 / 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    let balance = principal;
    let totalInterest = 0;
    let monthsTaken = 0;
    const schedule = [];

    while (balance > 0 && monthsTaken < tenureMonths * 2) {
        monthsTaken++;
        const interestForMonth = balance * monthlyRate;
        let principalForMonth = emi - interestForMonth;

        let totalPaymentThisMonth = emi + extraMonthlyPayment;

        // Final month correction
        if (balance + interestForMonth < totalPaymentThisMonth) {
            totalPaymentThisMonth = balance + interestForMonth;
            principalForMonth = balance;
        } else {
            principalForMonth += extraMonthlyPayment;
        }

        totalInterest += interestForMonth;
        balance -= principalForMonth;

        schedule.push({
            month: monthsTaken,
            balance: Math.max(0, balance),
            totalInterest
        });

        if (balance <= 0) break;
    }

    return { emi, totalInterest, monthsTaken, schedule };
}

function calculateSIP(monthlyAmount: number, annualReturn: number, months: number) {
    const monthlyRate = annualReturn / 100 / 12;
    let corpus = 0;
    let invested = 0;
    const schedule = [];

    for (let m = 1; m <= months; m++) {
        corpus += monthlyAmount;
        invested += monthlyAmount;
        corpus *= (1 + monthlyRate);

        schedule.push({
            month: m,
            corpus: Math.max(0, corpus),
            invested
        });
    }

    const profit = corpus - invested;
    const taxableGain = Math.max(0, profit - LTCG_LIMIT);
    const tax = taxableGain * LTCG_TAX_RATE;
    const netCorpus = corpus - tax;

    return { corpus: netCorpus, invested, profit, tax, schedule };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div
            className="px-3 py-2 rounded-lg border text-xs shadow-lg"
            style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
        >
            <p className="font-medium mb-1 border-b pb-1" style={{ color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}>
                Year {(label / 12).toFixed(1)} (Month {label})
            </p>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {payload.map((p: any) => (
                <p key={p.name} style={{ color: p.color }}>
                    {p.name}: <span className="font-mono font-medium">{formatINR(p.value)}</span>
                </p>
            ))}
        </div>
    );
}

export default function PrepayVsInvestPage() {
    const [loanPrincipal, setLoanPrincipal] = useState(5000000);
    const [loanRate, setLoanRate] = useState(8.5);
    const [tenureYears, setTenureYears] = useState(20);
    const [extraMonthly, setExtraMonthly] = useState(10000);
    const [expectedReturn, setExpectedReturn] = useState(12.0);

    const [mounted] = useState(true);

    const baseLoan = useMemo(() => calculateAmortization(loanPrincipal, loanRate, tenureYears * 12, 0), [loanPrincipal, loanRate, tenureYears]);
    const prepayLoan = useMemo(() => calculateAmortization(loanPrincipal, loanRate, tenureYears * 12, extraMonthly), [loanPrincipal, loanRate, tenureYears, extraMonthly]);

    // They invest the extra amount for the *base* loan duration
    const investSip = useMemo(() => calculateSIP(extraMonthly, expectedReturn, baseLoan.monthsTaken), [extraMonthly, expectedReturn, baseLoan.monthsTaken]);

    const interestSaved = baseLoan.totalInterest - prepayLoan.totalInterest;
    const investmentNetProfit = investSip.profit - investSip.tax;
    const netAdvantage = investmentNetProfit - interestSaved;
    const investIsBetter = netAdvantage > 0;

    // Merge Chart Data
    const chartData = useMemo(() => {
        const data = [];
        for (let i = 0; i < baseLoan.monthsTaken; i++) {
            data.push({
                month: i + 1,
                baseBalance: baseLoan.schedule[i]?.balance || 0,
                prepayBalance: prepayLoan.schedule[i]?.balance || 0,
                sipCorpus: investSip.schedule[i]?.corpus || 0,
            });
        }
        return data;
    }, [baseLoan, prepayLoan, investSip]);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <ArrowLeftRight size={24} style={{ color: "var(--accent-brand)" }} />
                    Prepay Home Loan vs Invest (SIP)
                </h1>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Mathematically compare if you should prepay your loan or invest that extra money.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 p-4 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium uppercase tracking-widest text-neutral-500">Loan Principal (₹)</label>
                    <Input type="number" value={loanPrincipal} onChange={(e) => setLoanPrincipal(Math.max(100000, Number(e.target.value)))} step={100000} className="font-mono" />
                </div>

                <div className="flex flex-col gap-1.5 border-l pl-4" style={{ borderColor: "var(--border-subtle)" }}>
                    <label className="text-xs font-medium uppercase tracking-widest text-red-500">Loan Rate (%)</label>
                    <Input type="number" value={loanRate} onChange={(e) => setLoanRate(Number(e.target.value))} step={0.1} className="font-mono" />
                </div>

                <div className="flex flex-col gap-1.5 border-l pl-4" style={{ borderColor: "var(--border-subtle)" }}>
                    <label className="text-xs font-medium uppercase tracking-widest text-neutral-500">Tenure (Years)</label>
                    <Input type="number" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} step={1} className="font-mono" />
                </div>

                <div className="flex flex-col gap-1.5 border-l pl-4" style={{ borderColor: "var(--border-subtle)" }}>
                    <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--accent-brand)" }}>Extra Monthly (₹)</label>
                    <Input type="number" value={extraMonthly} onChange={(e) => setExtraMonthly(Number(e.target.value))} step={1000} className="font-mono" />
                </div>

                <div className="flex flex-col gap-1.5 border-l pl-4" style={{ borderColor: "var(--border-subtle)" }}>
                    <label className="text-xs font-medium uppercase tracking-widest text-green-500">Expected SIP Return (%)</label>
                    <Input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} step={0.5} className="font-mono" />
                </div>

                <div className="sm:col-span-2 lg:col-span-5 flex items-center gap-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                    <div className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        Base EMI: <span className="font-mono text-neutral-900 border p-1 rounded bg-neutral-100">{formatINR(baseLoan.emi)}</span>
                    </div>
                    <Button onClick={() => navigator.clipboard.writeText(window.location.href)}
                        variant="outline" className="ml-auto text-xs gap-1.5 h-8">
                        <Share2 size={13} />Share
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {/* Prepay Strategy Card */}
                <div className="rounded-xl border p-5 relative overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-neutral-300"></div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                            Strategy A: Prepay Loan
                        </span>
                    </div>
                    <p className="text-3xl font-semibold font-mono mb-1 text-neutral-800">{formatINR(interestSaved)}</p>
                    <p className="text-sm font-medium mb-4 text-neutral-500">Total Interest Saved</p>

                    <div className="space-y-2 text-sm text-neutral-600 border-t pt-4">
                        <div className="flex justify-between"><span>New Loan Tenure</span><span className="font-mono font-medium">{(prepayLoan.monthsTaken / 12).toFixed(1)} years</span></div>
                        <div className="flex justify-between text-green-600"><span>Time Saved</span><span className="font-mono font-medium">{((baseLoan.monthsTaken - prepayLoan.monthsTaken) / 12).toFixed(1)} years</span></div>
                        <div className="flex justify-between mt-2"><span>Total Paid to Bank</span><span className="font-mono line-through text-red-400 mr-2 ml-auto">{formatINR(loanPrincipal + baseLoan.totalInterest)}</span><span className="font-mono font-medium">{formatINR(loanPrincipal + prepayLoan.totalInterest)}</span></div>
                    </div>
                </div>

                {/* Invest Strategy Card */}
                <div className="rounded-xl border p-5 relative overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
                            Strategy B: Invest Extra (SIP)
                        </span>
                    </div>
                    <p className="text-3xl font-semibold font-mono mb-1 text-[#10B981]">{formatINR(investmentNetProfit)}</p>
                    <p className="text-sm font-medium mb-4 text-[#10B981]/80">Net Profit (After 12.5% LTCG Tax)</p>

                    <div className="space-y-2 text-sm text-neutral-600 border-t pt-4">
                        <div className="flex justify-between"><span>Total Invested</span><span className="font-mono font-medium">{formatINR(investSip.invested)}</span></div>
                        <div className="flex justify-between"><span>Final Corpus</span><span className="font-mono font-medium">{formatINR(investSip.corpus + investSip.tax)}</span></div>
                        <div className="flex justify-between text-red-500"><span>Est. LTCG Tax (12.5%)</span><span className="font-mono font-medium">-{formatINR(investSip.tax)}</span></div>
                    </div>
                </div>
            </div>

            {/* Verdict Banner */}
            <div className={`p-4 rounded-xl border mb-6 flex items-start gap-3 ${investIsBetter ? 'bg-green-500/10 border-green-500/30' : 'bg-neutral-100 border-neutral-300'}`}>
                <Info size={20} className={`shrink-0 ${investIsBetter ? 'text-green-600' : 'text-neutral-600'}`} />
                <div>
                    <h3 className={`text-lg font-medium ${investIsBetter ? 'text-green-700' : 'text-neutral-800'}`}>
                        Mathematical Verdict: {investIsBetter ? 'Strategy B (Invest)' : 'Strategy A (Prepay)'} wins by {formatINR(Math.abs(netAdvantage))}
                    </h3>
                    <p className={`text-sm mt-1 ${investIsBetter ? 'text-green-600/80' : 'text-neutral-600'}`}>
                        Over {tenureYears} years, investing your extra capital at {expectedReturn}% yields a significantly higher overall net worth (even after factoring in 12.5% LTCG tax) than prepaying loan interest at {loanRate}%.
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                    Loan Outstanding vs SIP Corpus Built
                </h2>
                <div style={{ height: 350 }}>
                    {!mounted ? <div className="h-full w-full" /> : (
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <XAxis dataKey="month" tickFormatter={(v) => `Yr ${(v / 12).toFixed(0)}`} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} dy={10} minTickGap={30} />
                                <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} width={60} dx={10} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface-elevated)", opacity: 0.4 }} />
                                <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)", paddingTop: "10px" }} />

                                <Area type="monotone" dataKey="baseBalance" name="Base Loan Balance" stroke="#d1d5db" strokeWidth={2} fill="#f3f4f6" fillOpacity={0.5} activeDot={false} />
                                <Area type="monotone" dataKey="prepayBalance" name="Loan Balance (w/ Prepayment)" stroke="#ef4444" strokeWidth={2} fill="none" activeDot={{ r: 4 }} />
                                <Area type="monotone" dataKey="sipCorpus" name="SIP Corpus" stroke="#10b981" strokeWidth={2.5} fill="#10b981" fillOpacity={0.1} activeDot={{ r: 5 }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg border text-xs" style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                <Info size={13} className="mt-0.5 shrink-0" style={{ color: "var(--accent-brand)" }} />
                <span>
                    <strong>Does prepaying ever make sense?</strong> Yes! If your loan rate is very high (like a personal loan at 14%), or you have a low risk tolerance and cannot handle equity market volatility, prepaying is a guaranteed, risk-free return of your interest rate.
                </span>
            </div>
        </div>
    );
}
