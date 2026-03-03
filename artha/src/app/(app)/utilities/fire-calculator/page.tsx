"use client";

import React, { useState, useMemo } from "react";
import { AreaChart as AreaChartIcon, Share2, Info, Activity } from "lucide-react";
import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceLine,
} from "recharts";
import { formatINR } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function calculateFIRE(
    currentAge: number,
    retirementAge: number,
    lifeExpectancy: number,
    currentExpenses: number,
    currentCorpus: number,
    inflationRate: number,
    preRetirementReturn: number,
    postRetirementReturn: number
) {
    const yearsToRetire = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;

    // 1. Calculate Expenses at Retirement (FV of current expenses)
    const expensesAtRetirement = currentExpenses * Math.pow(1 + inflationRate / 100, yearsToRetire);

    // 2. Calculate Required FIRE Corpus (PV of growing annuity)
    // Real rate of return needed for the PV calculation
    // R = ((1 + nominalReturn) / (1 + inflationRate)) - 1
    const rInt = postRetirementReturn / 100;
    const iRate = inflationRate / 100;
    let requiredCorpus = 0;

    if (rInt === iRate) {
        // If return exactly matches inflation, you just need (Expenses * Years)
        requiredCorpus = expensesAtRetirement * yearsInRetirement;
    } else {
        const realRate = (1 + rInt) / (1 + iRate) - 1;
        // PV of Annuity formula: PMT * [ (1 - (1+r)^-n) / r ]
        // PMT here is the *end* of year payment, so we actually want PV of annuity *due* if we pull at start of year, 
        // but for simplicity, standard PV of growing annuity where first payment is `expensesAtRetirement`
        requiredCorpus = expensesAtRetirement * ((1 - Math.pow(1 + realRate, -yearsInRetirement)) / realRate);
        // Adjust for beginning of year withdrawal (Annuity Due)
        requiredCorpus = requiredCorpus * (1 + realRate);
    }

    // 3. Calculate Future Value of Current Corpus
    const preRetRate = preRetirementReturn / 100;
    const fvCurrentCorpus = currentCorpus * Math.pow(1 + preRetRate, yearsToRetire);

    // 4. Calculate Shortfall
    const shortfall = Math.max(0, requiredCorpus - fvCurrentCorpus);

    // 5. Calculate Required Monthly SIP
    let requiredSip = 0;
    if (shortfall > 0 && yearsToRetire > 0) {
        const monthlyRate = preRetRate / 12;
        const totalMonths = yearsToRetire * 12;
        // FV of Annuity formula solved for PMT
        requiredSip = (shortfall * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    // --- Generate Schedule for Charting ---
    const schedule = [];
    let simCorpus = currentCorpus;
    let simAnnualSIP = requiredSip * 12;
    let simExpense = currentExpenses;

    // Accumulation Phase
    for (let age = currentAge; age <= retirementAge; age++) {
        schedule.push({
            age,
            corpus: Math.max(0, Math.round(simCorpus)),
            expense: Math.round(simExpense),
            phase: 'Accumulation'
        });

        if (age < retirementAge) {
            // Add SIP and grow corpus
            simCorpus += simAnnualSIP; // Assuming SIP added evenly, simplistic annual growth
            simCorpus *= (1 + preRetRate);
            simExpense *= (1 + iRate);
        }
    }

    // Drawdown Phase
    // At retirement, the corpus should theoretically be EXACTLY the requiredCorpus
    // Let's force it slightly to avoid rounding errors cascading in the chart
    if (shortfall > 0) {
        simCorpus = requiredCorpus;
    }

    for (let age = retirementAge + 1; age <= lifeExpectancy; age++) {
        simExpense *= (1 + iRate);
        simCorpus -= simExpense; // Withdraw at start of year
        simCorpus *= (1 + rInt); // Grow remaining balance

        schedule.push({
            age,
            corpus: Math.max(0, Math.round(simCorpus)),
            expense: Math.round(simExpense),
            phase: 'Drawdown'
        });

        // If money runs out early due to math approximations
        if (simCorpus <= 0) simCorpus = 0;
    }

    return {
        yearsToRetire,
        yearsInRetirement,
        expensesAtRetirement,
        requiredCorpus,
        fvCurrentCorpus,
        shortfall,
        requiredSip,
        schedule
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    const isDrawdown = payload[0]?.payload?.phase === 'Drawdown';

    return (
        <div
            className="px-3 py-2 rounded-lg border text-xs shadow-lg"
            style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
        >
            <p className="font-medium mb-1 border-b pb-1" style={{ color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}>
                Age {label} {isDrawdown ? '(Retirement)' : ''}
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

export default function FireCalculatorPage() {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(50);
    const [lifeExpectancy, setLifeExpectancy] = useState(85);

    const [currentExpenses, setCurrentExpenses] = useState(1200000); // 12L pa
    const [currentCorpus, setCurrentCorpus] = useState(2500000); // 25L saved

    const [inflationRate, setInflationRate] = useState(6.0);
    const [preReturn, setPreReturn] = useState(12.0);
    const [postReturn, setPostReturn] = useState(8.0);

    const [mounted] = useState(true);

    // Validation
    const validRetirementAge = Math.max(currentAge + 1, retirementAge);
    const validLifeExpectancy = Math.max(validRetirementAge + 1, lifeExpectancy);

    const results = useMemo(() => {
        return calculateFIRE(
            currentAge,
            validRetirementAge,
            validLifeExpectancy,
            currentExpenses,
            currentCorpus,
            inflationRate,
            preReturn,
            postReturn
        );
    }, [currentAge, validRetirementAge, validLifeExpectancy, currentExpenses, currentCorpus, inflationRate, preReturn, postReturn]);

    const onTrack = results.shortfall <= 0;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <Activity size={24} style={{ color: "var(--accent-brand)" }} />
                    Advanced FIRE Simulator
                </h1>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Calculate your exact Financial Independence target, adjusted for Indian inflation.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Input Form Column */}
                <div className="lg:col-span-4 space-y-4">

                    <div className="p-4 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                        <h3 className="font-medium flex items-center gap-2 text-sm uppercase tracking-widest text-[#6b7280]">
                            1. Timeline
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">Current Age</label>
                                <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} min={18} max={70} className="font-mono" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium" style={{ color: "var(--accent-brand)" }}>Retire By Age</label>
                                <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} min={currentAge + 1} max={80} className="font-mono" />
                            </div>
                            <div className="flex flex-col gap-1.5 col-span-2">
                                <label className="text-xs font-medium text-neutral-500">Life Expectancy Age</label>
                                <Input type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(Number(e.target.value))} min={retirementAge + 1} max={100} className="font-mono" />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                        <h3 className="font-medium flex items-center gap-2 text-sm uppercase tracking-widest text-[#6b7280]">
                            2. Financials
                        </h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">Current Annual Expenses (₹)</label>
                                <Input type="number" value={currentExpenses} onChange={(e) => setCurrentExpenses(Number(e.target.value))} step={100000} className="font-mono" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">Current Saved Corpus (₹)</label>
                                <Input type="number" value={currentCorpus} onChange={(e) => setCurrentCorpus(Number(e.target.value))} step={500000} className="font-mono" />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                        <h3 className="font-medium flex items-center justify-between text-sm uppercase tracking-widest text-[#6b7280]">
                            <span>3. Rates (%)</span>
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5 col-span-2">
                                <label className="text-xs font-medium text-red-500">Expected Inflation</label>
                                <Input type="number" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} step={0.5} className="font-mono" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-green-600">Pre-Retire Return</label>
                                <Input type="number" value={preReturn} onChange={(e) => setPreReturn(Number(e.target.value))} step={0.5} className="font-mono" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-blue-500">Post-Retire Return</label>
                                <Input type="number" value={postReturn} onChange={(e) => setPostReturn(Number(e.target.value))} step={0.5} className="font-mono" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Column */}
                <div className="lg:col-span-8 space-y-4">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className={`rounded-xl border p-5 relative overflow-hidden ring-1 ${onTrack ? 'ring-green-500' : 'ring-red-500/50'}`} style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                            <div className="absolute top-0 left-0 w-full h-1" style={{ background: "var(--accent-brand)" }}></div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">FIRE Target Corpus</p>
                            <p className="text-4xl font-semibold font-mono text-neutral-800">{formatINR(results.requiredCorpus)}</p>
                            <p className="text-xs font-medium mt-2 text-neutral-500">Needed at Age {validRetirementAge}</p>
                        </div>
                        <div className={`rounded-xl border p-5 relative overflow-hidden ring-1 ${onTrack ? 'ring-green-500' : 'ring-red-500/50'}`} style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#10B981]"></div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">Action: Required SIP</p>
                            <p className={`text-4xl font-semibold font-mono ${onTrack ? 'text-green-600' : 'text-neutral-800'}`}>
                                {onTrack ? '₹0' : formatINR(results.requiredSip)}
                                <span className="text-sm text-neutral-400 font-sans font-normal ml-1">/ mo</span>
                            </p>
                            <p className="text-xs font-medium mt-2 text-neutral-500">
                                {onTrack ? 'Your current corpus is already sufficient!' : `To bridge the ${formatINR(results.shortfall)} shortfall`}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl border" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                            <p className="text-[10px] uppercase font-bold text-neutral-400">Total Years to Invest</p>
                            <p className="text-xl font-mono mt-1 font-semibold">{results.yearsToRetire}</p>
                        </div>
                        <div className="p-4 rounded-xl border" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                            <p className="text-[10px] uppercase font-bold text-neutral-400">Years in Retirement</p>
                            <p className="text-xl font-mono mt-1 font-semibold">{results.yearsInRetirement}</p>
                        </div>
                        <div className="p-4 rounded-xl border flex flex-col justify-center" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
                            <Button onClick={() => navigator.clipboard.writeText(window.location.href)} variant="outline" className="w-full h-10 gap-2">
                                <Share2 size={16} /> Share Plan
                            </Button>
                        </div>
                    </div>

                    {/* Verdict Banner */}
                    <div className="p-4 rounded-xl border bg-blue-50/50 border-blue-200 flex items-start gap-3">
                        <Info size={20} className="shrink-0 text-blue-600" />
                        <div>
                            <h3 className="text-sm font-medium text-blue-800">
                                The Inflation Impact
                            </h3>
                            <p className="text-xs mt-1 text-blue-900/80 leading-relaxed">
                                Because of {inflationRate}% compounding inflation, to maintain your current lifestyle of <strong>{formatINR(currentExpenses)}</strong>/year, you will actually need <strong>{formatINR(results.expensesAtRetirement)}</strong>/year when you retire at age {validRetirementAge}. The simulator draws down this inflated amount every year from your targeted corpus.
                            </p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                            <AreaChartIcon size={18} className="text-neutral-500" />
                            Corpus Lifecycle: Accumulation vs Drawdown
                        </h2>
                        <div style={{ height: 320 }}>
                            {!mounted ? <div className="h-full w-full" /> : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={results.schedule} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                        <XAxis dataKey="age" tickFormatter={(v) => `Age ${v}`} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} dy={10} minTickGap={20} />
                                        <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} width={60} dx={10} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface-elevated)", opacity: 0.4 }} />
                                        <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)", paddingTop: "10px" }} />

                                        <ReferenceLine x={validRetirementAge} stroke="var(--accent-brand)" strokeDasharray="3 3" label={{ position: 'top', value: 'Retirement', fill: 'var(--accent-brand)', fontSize: 10 }} />

                                        <Area type="monotone" dataKey="corpus" name="Portfolio Value" stroke="#10b981" strokeWidth={2.5} fill="#10b981" fillOpacity={0.15} activeDot={{ r: 5 }} />
                                        <Area type="monotone" dataKey="expense" name="Annual Expenses (Inflated)" stroke="#ef4444" strokeWidth={2} fill="none" activeDot={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
