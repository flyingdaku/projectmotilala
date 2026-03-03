"use client";

import React, { useState, useMemo } from "react";
import { AreaChart, Share2, Info, Scale } from "lucide-react";
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
const MAX_PPF_LIMIT = 150000;

function calculateReturns(annualPayment: number, ppfRate: number, elssRate: number, years: number) {
    const schedule = [];
    let ppfCorpus = 0;
    let elssCorpus = 0;
    let totalInvested = 0;

    for (let y = 1; y <= years; y++) {
        totalInvested += annualPayment;

        // PPF compounded annually
        ppfCorpus += annualPayment;
        ppfCorpus *= (1 + ppfRate / 100);

        // ELSS compounded annually (simplification for visualization)
        elssCorpus += annualPayment;
        elssCorpus *= (1 + elssRate / 100);

        schedule.push({
            year: y,
            invested: totalInvested,
            ppfValue: Math.round(ppfCorpus),
            elssValue: Math.round(elssCorpus),
        });
    }

    // ELSS Post-Tax Math
    const elssProfit = elssCorpus - totalInvested;
    const taxableElssGain = Math.max(0, elssProfit - LTCG_LIMIT);
    const elssLtcgTax = taxableElssGain * LTCG_TAX_RATE;
    const elssNetCorpus = elssCorpus - elssLtcgTax;

    return {
        ppfCorpus,
        elssGrossCorpus: elssCorpus,
        elssNetCorpus,
        elssTax: elssLtcgTax,
        invested: totalInvested,
        schedule
    };
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
                Year {label}
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

export default function PpfVsElssPage() {
    const [annualInvestment, setAnnualInvestment] = useState(150000);
    const [ppfRate, setPpfRate] = useState(7.1);
    const [elssRate, setElssRate] = useState(12.0);
    const [horizonYears, setHorizonYears] = useState(15);
    const [mounted] = useState(true);

    // Validate PPF strict limit visually, but allow them to calculate anyway
    const isOverPpfLimit = annualInvestment > MAX_PPF_LIMIT;

    const results = useMemo(() => {
        return calculateReturns(annualInvestment, ppfRate, elssRate, horizonYears);
    }, [annualInvestment, ppfRate, elssRate, horizonYears]);

    const elssDifference = results.elssNetCorpus - results.ppfCorpus;
    const elssWins = elssDifference > 0;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <Scale size={24} style={{ color: "var(--accent-brand)" }} />
                    PPF vs ELSS Calculator (80C)
                </h1>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Compare the tax-free safety of PPF against the post-tax market returns of ELSS over {horizonYears} years.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 rounded-xl border relative" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>

                <div className="flex flex-col gap-1.5 relative">
                    <label className="text-xs font-medium uppercase tracking-widest text-neutral-500">Annual Investment (₹)</label>
                    <Input type="number" value={annualInvestment} onChange={(e) => setAnnualInvestment(Number(e.target.value))} step={10000} className={`font-mono ${isOverPpfLimit ? 'border-red-500' : ''}`} />
                    {isOverPpfLimit && <span className="text-[10px] text-red-500 absolute -bottom-5 left-0">Max PPF limit is ₹1.5L</span>}
                </div>

                <div className="flex flex-col gap-1.5 border-l pl-4" style={{ borderColor: "var(--border-subtle)" }}>
                    <label className="text-xs font-medium uppercase tracking-widest text-neutral-500">Horizon (Years)</label>
                    <Input type="number" value={horizonYears} onChange={(e) => setHorizonYears(Number(e.target.value))} min={5} step={1} className="font-mono" />
                </div>

                <div className="flex flex-col gap-1.5 border-l pl-4" style={{ borderColor: "var(--border-subtle)" }}>
                    <label className="text-xs font-medium uppercase tracking-widest text-[#10B981]">ELSS Exp. Return (%)</label>
                    <Input type="number" value={elssRate} onChange={(e) => setElssRate(Number(e.target.value))} step={0.5} className="font-mono" />
                </div>

                <div className="flex flex-col gap-1.5 border-l pl-4" style={{ borderColor: "var(--border-subtle)" }}>
                    <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--accent-brand)" }}>PPF Rate (%)</label>
                    <Input type="number" value={ppfRate} onChange={(e) => setPpfRate(Number(e.target.value))} step={0.1} className="font-mono bg-neutral-50" />
                </div>

                <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-end pt-3 mt-2 border-t" style={{ borderColor: "var(--border)" }}>
                    <Button onClick={() => navigator.clipboard.writeText(window.location.href)}
                        variant="outline" className="text-xs gap-1.5 h-8">
                        <Share2 size={13} />Share Result
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {/* PPF Card */}
                <div className="rounded-xl border p-5 relative overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                    <div className="absolute top-0 left-0 w-full h-1" style={{ background: "var(--accent-brand)" }}></div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                            Option A: PPF (15Y Lock-in)
                        </span>
                    </div>
                    <p className="text-3xl font-semibold font-mono mb-1 text-neutral-800">{formatINR(results.ppfCorpus)}</p>
                    <p className="text-sm font-medium mb-4 text-neutral-500">Tax-Free Maturity Value</p>

                    <div className="space-y-2 text-sm text-neutral-600 border-t pt-4" style={{ borderColor: "var(--border-subtle)" }}>
                        <div className="flex justify-between"><span>Total Invested</span><span className="font-mono font-medium">{formatINR(results.invested)}</span></div>
                        <div className="flex justify-between"><span>Wealth Generated</span><span className="font-mono font-medium text-green-600">+{formatINR(results.ppfCorpus - results.invested)}</span></div>
                        <div className="flex justify-between mt-2"><span>Taxes at Maturity</span><span className="font-mono font-medium text-neutral-400">₹0 (EEE)</span></div>
                    </div>
                </div>

                {/* ELSS Card */}
                <div className="rounded-xl border p-5 relative overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#10B981]"></div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
                            Option B: ELSS (3Y Lock-in)
                        </span>
                    </div>
                    <p className="text-3xl font-semibold font-mono mb-1 text-[#10B981]">{formatINR(results.elssNetCorpus)}</p>
                    <p className="text-sm font-medium mb-4 text-[#10B981]/80">Net Maturity Value (Post-Tax)</p>

                    <div className="space-y-2 text-sm text-neutral-600 border-t pt-4" style={{ borderColor: "var(--border-subtle)" }}>
                        <div className="flex justify-between"><span>Gross Corpus Generated</span><span className="font-mono font-medium">{formatINR(results.elssGrossCorpus)}</span></div>
                        <div className="flex justify-between text-red-500"><span>LTCG Tax Deducted (12.5%)</span><span className="font-mono font-medium">-{formatINR(results.elssTax)}</span></div>
                        <div className="flex justify-between mt-2"><span>Lock-in Status</span><span className="font-medium text-neutral-500">Staggered 3-year</span></div>
                    </div>
                </div>
            </div>

            {/* Verdict Banner */}
            <div className={`p-4 rounded-xl border mb-6 flex items-start gap-3 ${elssWins ? 'bg-green-500/10 border-green-500/30' : 'bg-neutral-100 border-neutral-300'}`}>
                <Info size={20} className={`shrink-0 ${elssWins ? 'text-green-600' : 'text-neutral-600'}`} />
                <div>
                    <h3 className={`text-lg font-medium ${elssWins ? 'text-green-700' : 'text-neutral-800'}`}>
                        Mathematical Verdict: ELSS wins by {formatINR(Math.abs(elssDifference))}
                    </h3>
                    <p className={`text-sm mt-1 ${elssWins ? 'text-green-600/80' : 'text-neutral-600'}`}>
                        Over {horizonYears} years, locking your money in an ELSS fund at an expected {elssRate}% effectively generates huge wealth. Even after you pay a 12.5% Long Term Capital Gains tax on the profits, you still end up far ahead of the guaranteed (but low) {ppfRate}% tax-free PPF return.
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <AreaChart size={18} className="text-neutral-500" />
                    Wealth Accumulation Over {horizonYears} Years
                </h2>
                <div style={{ height: 350 }}>
                    {!mounted ? <div className="h-full w-full" /> : (
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={results.schedule} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} dy={10} minTickGap={20} />
                                <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} width={60} dx={10} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface-elevated)", opacity: 0.4 }} />
                                <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)", paddingTop: "10px" }} />

                                <Area type="monotone" dataKey="invested" name="Total Invested" stroke="#d1d5db" strokeWidth={2} fill="#f3f4f6" fillOpacity={0.7} activeDot={false} />
                                <Area type="monotone" dataKey="ppfValue" name="PPF Maturity" stroke="var(--accent-brand)" strokeWidth={2} fill="none" activeDot={{ r: 4 }} />
                                <Area type="monotone" dataKey="elssValue" name="ELSS Gross Value" stroke="#10b981" strokeWidth={2.5} fill="#10b981" fillOpacity={0.1} activeDot={{ r: 5 }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg border text-xs" style={{ background: "var(--surface)", color: "var(--text-secondary)", borderColor: "var(--border)" }}>
                <Info size={13} className="mt-0.5 shrink-0" style={{ color: "var(--accent-brand)" }} />
                <span className="text-neutral-600">
                    <strong>The "Cost of Safety":</strong> PPF offers guaranteed, completely risk-free returns backed by the Government of India, while ELSS is subject to market risks. The gap in the final corpus represents the premium you earn for taking on that equity risk over {horizonYears} years.
                </span>
            </div>
        </div>
    );
}
