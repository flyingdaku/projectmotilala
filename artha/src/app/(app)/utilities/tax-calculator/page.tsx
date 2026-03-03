"use client";

import React, { useState, useMemo } from "react";
import { ArrowLeftRight, Share2, Info, Receipt } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STD_DEDUCTION = 50000;
const LTCG_LIMIT = 125000;
const LTCG_RATE = 0.125;
const STCG_RATE = 0.20;

// Budge 2024 Slabs
const OLD_SLABS = [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 },
];

const NEW_SLABS = [
    { limit: 300000, rate: 0 },
    { limit: 700000, rate: 0.05 },
    { limit: 1000000, rate: 0.10 },
    { limit: 1200000, rate: 0.15 },
    { limit: 1500000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 },
];

function calculateSlabTax(income: number, slabs: { limit: number; rate: number }[]) {
    let tax = 0;
    let remainingIncome = Math.max(0, income);
    let previousLimit = 0;

    for (const slab of slabs) {
        if (remainingIncome <= 0) break;
        const taxableInThisSlab = Math.min(remainingIncome, slab.limit - previousLimit);
        tax += taxableInThisSlab * slab.rate;
        remainingIncome -= taxableInThisSlab;
        previousLimit = slab.limit;
    }
    return tax;
}

export default function TaxCalculatorPage() {
    const [salary, setSalary] = useState(1200000);
    const [interest, setInterest] = useState(25000);

    const [hraExemption, setHraExemption] = useState(0);
    const [ltaExemption, setLtaExemption] = useState(0);

    const [deduction80c, setDeduction80c] = useState(150000); // EPF/PPF/ELSS
    const [deduction80ccd, setDeduction80ccd] = useState(50000); // NPS
    const [deduction80d, setDeduction80d] = useState(25000); // Health Insurance
    const [homeLoanInterest, setHomeLoanInterest] = useState(0); // Sec 24B

    const [stcg, setStcg] = useState(0);
    const [ltcg, setLtcg] = useState(0);

    const results = useMemo(() => {
        // --- Step 1: Normal Income ---
        const grossNormalIncome = salary + interest;

        // --- Step 2: Old Regime Net Income ---
        const oldDeductions = Math.min(150000, deduction80c) + Math.min(50000, deduction80ccd) + deduction80d + Math.min(200000, homeLoanInterest);
        const oldExemptions = hraExemption + ltaExemption;
        let oldNetNormalIncome = Math.max(0, grossNormalIncome - STD_DEDUCTION - oldExemptions - oldDeductions);

        // --- Step 3: New Regime Net Income ---
        let newNetNormalIncome = Math.max(0, grossNormalIncome - STD_DEDUCTION); // No other deductions in new regime

        // --- Step 4: Capital Gains & Basic Exemption Set-off ---
        // If normal income is below basic exemption limit, the shortfall can be set off against STCG/LTCG (for residents)
        const oldBasicExemption = 250000;
        const newBasicExemption = 300000;

        let oldStcg = stcg;
        let oldLtcg = Math.max(0, ltcg - LTCG_LIMIT); // Taxable LTCG
        let newStcg = stcg;
        let newLtcg = Math.max(0, ltcg - LTCG_LIMIT);

        // Old Regime Set-off
        if (oldNetNormalIncome < oldBasicExemption) {
            let shortfall = oldBasicExemption - oldNetNormalIncome;
            oldNetNormalIncome = 0; // Utilized fully

            // Offset STCG first, then LTCG (standard practice to optimize tax, though technically taxpayer choice)
            const stcgOffset = Math.min(shortfall, oldStcg);
            oldStcg -= stcgOffset;
            shortfall -= stcgOffset;

            const ltcgOffset = Math.min(shortfall, oldLtcg);
            oldLtcg -= ltcgOffset;
            shortfall -= ltcgOffset;
        }

        // New Regime Set-off
        if (newNetNormalIncome < newBasicExemption) {
            let shortfall = newBasicExemption - newNetNormalIncome;
            newNetNormalIncome = 0;

            const stcgOffset = Math.min(shortfall, newStcg);
            newStcg -= stcgOffset;
            shortfall -= stcgOffset;

            const ltcgOffset = Math.min(shortfall, newLtcg);
            newLtcg -= ltcgOffset;
            shortfall -= ltcgOffset;
        }

        // --- Step 5: Calculate Taxes ---
        let oldSlabTax = calculateSlabTax(oldNetNormalIncome, OLD_SLABS);
        let newSlabTax = calculateSlabTax(newNetNormalIncome, NEW_SLABS);

        const oldStcgTax = oldStcg * STCG_RATE;
        const oldLtcgTax = oldLtcg * LTCG_RATE;

        const newStcgTax = newStcg * STCG_RATE;
        const newLtcgTax = newLtcg * LTCG_RATE;

        let oldTotalTax = oldSlabTax + oldStcgTax + oldLtcgTax;
        let newTotalTax = newSlabTax + newStcgTax + newLtcgTax;

        // --- Step 6: Section 87A Rebate ---
        // New Rules: Rebate only applies to normal income. 
        // It DOES NOT apply to Section 112A (Equity LTCG) in either regime.
        // It DOES apply to STCG 111A, but recent changes have made this complex. 
        // We will conservatively apply rebate to slab tax only.
        if (oldNetNormalIncome <= 500000) {
            const rebate = Math.min(oldSlabTax, 12500);
            oldSlabTax -= rebate;
            oldTotalTax -= rebate;
        }

        if (newNetNormalIncome <= 700000) {
            // Marginal relief exists, but basic rebate:
            const rebate = Math.min(newSlabTax, 25000);
            newSlabTax -= rebate;
            newTotalTax -= rebate;
        }

        // --- Step 7: Cess ---
        const oldCess = oldTotalTax * 0.04;
        oldTotalTax += oldCess;

        const newCess = newTotalTax * 0.04;
        newTotalTax += newCess;

        return {
            old: { netNormal: oldNetNormalIncome, stcgTax: oldStcgTax, ltcgTax: oldLtcgTax, slabTax: oldSlabTax, cess: oldCess, total: oldTotalTax },
            new: { netNormal: newNetNormalIncome, stcgTax: newStcgTax, ltcgTax: newLtcgTax, slabTax: newSlabTax, cess: newCess, total: newTotalTax },
            winner: oldTotalTax < newTotalTax ? 'old' : newTotalTax < oldTotalTax ? 'new' : 'tie',
            diff: Math.abs(oldTotalTax - newTotalTax),
        };
    }, [salary, interest, hraExemption, ltaExemption, deduction80c, deduction80ccd, deduction80d, homeLoanInterest, stcg, ltcg]);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <Receipt size={24} style={{ color: "var(--accent-brand)" }} />
                    Old vs New Tax Regime Optimizer
                </h1>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Compare tax regimes with full capital gains integration (STCG/LTCG set-offs).
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Input Form Column */}
                <div className="lg:col-span-5 space-y-4">

                    <div className="p-4 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                        <h3 className="font-medium flex items-center gap-2 text-sm uppercase tracking-widest text-[#6b7280]">
                            1. Income
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">Gross Salary</label>
                                <Input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} step={100000} className="font-mono" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">Interest (FD/Savings)</label>
                                <Input type="number" value={interest} onChange={(e) => setInterest(Number(e.target.value))} step={5000} className="font-mono" />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                        <h3 className="font-medium flex items-center gap-2 text-sm uppercase tracking-widest text-[#6b7280]">
                            2. Market Capital Gains
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">Equity STCG (20%)</label>
                                <Input type="number" value={stcg} onChange={(e) => setStcg(Number(e.target.value))} step={10000} className="font-mono" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">Equity LTCG (12.5%)</label>
                                <Input type="number" value={ltcg} onChange={(e) => setLtcg(Number(e.target.value))} step={10000} className="font-mono" />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                        <h3 className="font-medium flex items-center justify-between text-sm uppercase tracking-widest text-[#6b7280]">
                            <span>3. Exemptions & Deductions</span>
                            <span className="text-[10px] bg-neutral-100 px-2 py-0.5 rounded text-neutral-500 normal-case">Old Regime Only</span>
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">HRA Exemption</label>
                                <Input type="number" value={hraExemption} onChange={(e) => setHraExemption(Number(e.target.value))} step={10000} className="font-mono" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">LTA Exemption</label>
                                <Input type="number" value={ltaExemption} onChange={(e) => setLtaExemption(Number(e.target.value))} step={10000} className="font-mono" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">80C (Max 1.5L)</label>
                                <Input type="number" value={deduction80c} onChange={(e) => setDeduction80c(Number(e.target.value))} step={10000} className="font-mono" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">80CCD(1B) NPS (Max 50K)</label>
                                <Input type="number" value={deduction80ccd} onChange={(e) => setDeduction80ccd(Number(e.target.value))} step={10000} className="font-mono" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">80D Health Ins.</label>
                                <Input type="number" value={deduction80d} onChange={(e) => setDeduction80d(Number(e.target.value))} step={5000} className="font-mono" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-500">Sec 24B (Home Loan)</label>
                                <Input type="number" value={homeLoanInterest} onChange={(e) => setHomeLoanInterest(Number(e.target.value))} step={10000} className="font-mono" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Column */}
                <div className="lg:col-span-7 space-y-4">

                    <div className={`p-4 rounded-xl border flex items-start gap-3 ${results.winner !== 'tie' ? 'bg-green-500/10 border-green-500/30' : 'bg-neutral-100 border-neutral-300'}`}>
                        <Info size={20} className={`shrink-0 ${results.winner !== 'tie' ? 'text-green-600' : 'text-neutral-600'}`} />
                        <div>
                            <h3 className={`text-lg font-medium ${results.winner !== 'tie' ? 'text-green-700' : 'text-neutral-800'}`}>
                                Opt for the <span className="uppercase font-bold">{results.winner}</span> Regime
                            </h3>
                            <p className={`text-sm mt-1 ${results.winner !== 'tie' ? 'text-green-600/80' : 'text-neutral-600'}`}>
                                You will save <strong>{formatINR(results.diff)}</strong> by filing under the {results.winner} regime for the given income and investments.
                            </p>
                        </div>
                        <Button onClick={() => navigator.clipboard.writeText(window.location.href)}
                            variant="outline" className="ml-auto text-xs gap-1.5 h-8 shrink-0 bg-white">
                            <Share2 size={13} />Share
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className={`rounded-xl border p-5 relative overflow-hidden ${results.winner === 'old' ? 'ring-2 ring-green-500' : ''}`} style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                            {results.winner === 'old' && <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-bl-lg">Winner</div>}
                            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">Old Regime</p>
                            <p className="text-3xl font-semibold font-mono text-neutral-800">{formatINR(results.old.total)}</p>
                            <p className="text-[10px] text-neutral-400 mt-1">Total Tax Liability</p>
                        </div>
                        <div className={`rounded-xl border p-5 relative overflow-hidden ${results.winner === 'new' ? 'ring-2 ring-green-500' : ''}`} style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                            {results.winner === 'new' && <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-bl-lg">Winner</div>}
                            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">New Regime</p>
                            <p className="text-3xl font-semibold font-mono text-neutral-800">{formatINR(results.new.total)}</p>
                            <p className="text-[10px] text-neutral-400 mt-1">Total Tax Liability</p>
                        </div>
                    </div>

                    {/* Breakdown Table */}
                    <div className="rounded-xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                        <div className="grid grid-cols-3 border-b text-xs font-medium uppercase tracking-widest bg-neutral-50/50 p-3" style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}>
                            <div>Component</div>
                            <div className="text-right">Old Regime</div>
                            <div className="text-right">New Regime</div>
                        </div>
                        <div className="divide-y text-sm" style={{ borderColor: "var(--border-subtle)" }}>
                            <div className="grid grid-cols-3 p-3 items-center">
                                <div className="text-neutral-500">Gross Income</div>
                                <div className="text-right font-mono">{formatINR(salary + interest + stcg + Math.max(0, ltcg - LTCG_LIMIT))}</div>
                                <div className="text-right font-mono">{formatINR(salary + interest + stcg + Math.max(0, ltcg - LTCG_LIMIT))}</div>
                            </div>
                            <div className="grid grid-cols-3 p-3 items-center">
                                <div className="text-neutral-500">Std. Deduction</div>
                                <div className="text-right font-mono text-red-500">-{formatINR(STD_DEDUCTION)}</div>
                                <div className="text-right font-mono text-red-500">-{formatINR(STD_DEDUCTION)}</div>
                            </div>
                            <div className="grid grid-cols-3 p-3 items-center">
                                <div className="text-neutral-500">Exempts & Deductions</div>
                                <div className="text-right font-mono text-red-500">-{formatINR(hraExemption + ltaExemption + Math.min(150000, deduction80c) + Math.min(50000, deduction80ccd) + deduction80d + Math.min(200000, homeLoanInterest))}</div>
                                <div className="text-right font-mono text-neutral-400">₹0</div>
                            </div>
                            <div className="grid grid-cols-3 p-3 items-center bg-neutral-50/30">
                                <div className="font-medium">Net Normal Taxable</div>
                                <div className="text-right font-mono font-medium">{formatINR(results.old.netNormal)}</div>
                                <div className="text-right font-mono font-medium">{formatINR(results.new.netNormal)}</div>
                            </div>

                            <div className="grid grid-cols-3 p-3 items-center mt-2">
                                <div className="text-neutral-500">Tax on Normal Income</div>
                                <div className="text-right font-mono">{formatINR(results.old.slabTax)}</div>
                                <div className="text-right font-mono">{formatINR(results.new.slabTax)}</div>
                            </div>
                            <div className="grid grid-cols-3 p-3 items-center">
                                <div className="text-neutral-500">Tax on STCG (20%)</div>
                                <div className="text-right font-mono">{formatINR(results.old.stcgTax)}</div>
                                <div className="text-right font-mono">{formatINR(results.new.stcgTax)}</div>
                            </div>
                            <div className="grid grid-cols-3 p-3 items-center border-b">
                                <div className="text-neutral-500">Tax on LTCG (12.5%)</div>
                                <div className="text-right font-mono">{formatINR(results.old.ltcgTax)}</div>
                                <div className="text-right font-mono">{formatINR(results.new.ltcgTax)}</div>
                            </div>
                            <div className="grid grid-cols-3 p-3 items-center text-xs text-neutral-400">
                                <div>Health & Ed Cess (4%)</div>
                                <div className="text-right font-mono">+{formatINR(results.old.cess)}</div>
                                <div className="text-right font-mono">+{formatINR(results.new.cess)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-start gap-2 p-3 rounded-lg border text-xs" style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                        <Info size={13} className="mt-0.5 shrink-0" style={{ color: "var(--accent-brand)" }} />
                        <span>
                            <strong>Note on Capital Gains Setup:</strong> This calculator automatically sets off the shortfall in the basic exemption limit (₹2.5L Old / ₹3L New) against your STCG and LTCG, which is a key optimization allowed by the Income Tax Act for resident Indians.
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}
