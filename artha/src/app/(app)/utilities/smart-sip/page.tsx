"use client";

import React, { useState, useMemo } from "react";
import { Brain, Share2, Info, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceLine,
} from "recharts";
import {
    END_YEAR,
    computeSmartSIPReturns,
} from "@/lib/india-historical-data";
import { formatINR } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const START_YEAR_SMART_SIP = 2000; // Historical PE data starts 1999

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
            {payload.map((p: any) => {
                if (p.dataKey === "pe") {
                    return (
                        <p key={p.name} style={{ color: p.color }} className="mt-1 font-medium">
                            Prev Yr P/E: <span className="font-mono">{p.value}</span>
                            <span className="ml-1 text-[10px] text-neutral-500">({p.payload.activeMultiplier}x SIP)</span>
                        </p>
                    );
                }
                return (
                    <p key={p.name} style={{ color: p.color }}>
                        {p.name}: <span className="font-mono font-medium">{formatINR(p.value)}</span>
                    </p>
                );
            })}
        </div>
    );
}

const YEARS = Array.from({ length: END_YEAR - START_YEAR_SMART_SIP + 1 }, (_, i) => START_YEAR_SMART_SIP + i);

export default function SmartSIPPage() {
    const [startYear, setStartYear] = useState(2000);
    const [endYear, setEndYear] = useState(END_YEAR);
    const [baseSip, setBaseSip] = useState(10000);

    const [stepUp, setStepUp] = useState(false);
    const [stepUpPct, setStepUpPct] = useState(10);

    // Smart SIP logic
    const [cheapPE, setCheapPE] = useState(18);
    const [cheapMult, setCheapMult] = useState(2.0);
    const [expPE, setExpPE] = useState(25);
    const [expMult, setExpMult] = useState(0.5);

    const [mounted] = useState(true);

    const years = endYear - startYear + 1;
    const smartResult = useMemo(
        () => computeSmartSIPReturns(
            startYear, years, baseSip, stepUp ? stepUpPct : 0, cheapPE, cheapMult, expPE, expMult
        ),
        [startYear, years, baseSip, stepUp, stepUpPct, cheapPE, cheapMult, expPE, expMult]
    );

    // Normal SIP for comparison (Multipliers = 1)
    const normalResult = useMemo(
        () => computeSmartSIPReturns(
            startYear, years, baseSip, stepUp ? stepUpPct : 0, cheapPE, 1.0, expPE, 1.0
        ),
        [startYear, years, baseSip, stepUp, stepUpPct, cheapPE, expPE]
    );

    // Merge data for chart
    const chartData = useMemo(() => {
        if (!smartResult || !normalResult) return [];
        return smartResult.dataPoints.map((dp, i) => {
            const normalDp = normalResult.dataPoints[i];
            return {
                year: dp.year,
                pe: dp.pe,
                activeMultiplier: dp.activeMultiplier,
                smartCorpus: dp.cumulativeSIP,
                normalCorpus: normalDp.cumulativeSIP,
                smartInvested: dp.cumulativeInvested,
                normalInvested: normalDp.cumulativeInvested,
            };
        });
    }, [smartResult, normalResult]);


    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <Brain size={24} style={{ color: "var(--accent-brand)" }} />
                    Smart SIP (Valuation-Based)
                </h1>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Backtest investing more when Nifty is cheap, and less when it is expensive.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Base Monthly SIP (₹)</label>
                    <Input type="number" value={baseSip} onChange={(e) => setBaseSip(Math.max(1000, Number(e.target.value)))} step={1000} className="font-mono" />
                </div>

                <div className="flex flex-col gap-1.5 border-l pl-4" style={{ borderColor: "var(--border-subtle)" }}>
                    <label className="text-xs font-medium uppercase tracking-widest text-green-500 flex items-center gap-1"><ArrowDownCircle size={14} />If Cheap (P/E &lt; {cheapPE})</label>
                    <div className="flex gap-2">
                        <Input type="number" value={cheapMult} onChange={(e) => setCheapMult(Number(e.target.value))} step={0.5} min={1.0} className="font-mono w-20" />
                        <span className="text-sm self-center text-neutral-500">x SIP</span>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 border-l pl-4" style={{ borderColor: "var(--border-subtle)" }}>
                    <label className="text-xs font-medium uppercase tracking-widest text-red-500 flex items-center gap-1"><ArrowUpCircle size={14} />If Exp (P/E &gt; {expPE})</label>
                    <div className="flex gap-2">
                        <Input type="number" value={expMult} onChange={(e) => setExpMult(Number(e.target.value))} step={0.1} min={0.0} max={1.0} className="font-mono w-20" />
                        <span className="text-sm self-center text-neutral-500">x SIP</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-l pl-4" style={{ borderColor: "var(--border-subtle)" }}>
                    <div className="flex items-center gap-2">
                        <Switch checked={stepUp} onChange={(e) => setStepUp(e.target.checked)} />
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Annual Step-Up</span>
                    </div>
                    {stepUp && (
                        <Select value={stepUpPct} onChange={(e) => setStepUpPct(Number(e.target.value))} className="w-24 h-8 mt-1">
                            {[5, 10, 15, 20].map((v) => <option key={v} value={v}>{v}% / yr</option>)}
                        </Select>
                    )}
                </div>

                <div className="sm:col-span-2 lg:col-span-4 flex items-center gap-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-2 mr-4">
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>From:</span>
                        <Select value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} className="w-20">
                            {YEARS.filter((y) => y < endYear - 1).map((y) => <option key={y} value={y}>{y}</option>)}
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>To:</span>
                        <Select value={endYear} onChange={(e) => setEndYear(Number(e.target.value))} className="w-20">
                            {YEARS.filter((y) => y > startYear + 1).map((y) => <option key={y} value={y}>{y}</option>)}
                        </Select>
                    </div>

                    <Button onClick={() => navigator.clipboard.writeText(window.location.href)}
                        variant="outline" className="ml-auto text-xs gap-1.5">
                        <Share2 size={13} />Share
                    </Button>
                </div>
            </div>

            {smartResult && normalResult && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="rounded-xl border p-5 relative overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "var(--accent-brand)" }}></div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium uppercase tracking-widest text-[#6b7280]">
                                Smart SIP (Dynamic)
                            </span>
                            <Brain size={16} style={{ color: "var(--accent-brand)" }} />
                        </div>
                        <p className="text-2xl font-semibold font-mono mb-1" style={{ color: "var(--text-primary)" }}>{formatINR(smartResult.corpus)}</p>
                        <p className="text-sm font-medium mb-3" style={{ color: "var(--positive)" }}>XIRR: +{smartResult.xirr}% p.a.</p>
                        <div className="space-y-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                            <div className="flex justify-between"><span>Total invested</span><span className="font-mono">{formatINR(smartResult.totalInvested)}</span></div>
                            <div className="flex justify-between"><span>Absolute gain</span><span className="font-mono text-green-500">+{formatINR(smartResult.corpus - smartResult.totalInvested)}</span></div>
                        </div>
                    </div>

                    <div className="rounded-xl border p-5 opacity-90" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium uppercase tracking-widest text-[#6b7280]">Normal SIP</span>
                        </div>
                        <p className="text-2xl font-semibold font-mono mb-1" style={{ color: "var(--text-primary)" }}>{formatINR(normalResult.corpus)}</p>
                        <p className="text-sm font-medium mb-3" style={{ color: "var(--text-secondary)" }}>XIRR: +{normalResult.xirr}% p.a.</p>
                        <div className="space-y-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                            <div className="flex justify-between"><span>Total invested</span><span className="font-mono">{formatINR(normalResult.totalInvested)}</span></div>
                            <div className="flex justify-between"><span>Absolute gain</span><span className="font-mono text-green-500">+{formatINR(normalResult.corpus - normalResult.totalInvested)}</span></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Chart */}
            <div className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                    Smart SIP vs Normal SIP vs Nifty P/E
                </h2>
                <div style={{ height: 350 }}>
                    {!mounted ? <div className="h-full w-full" /> : (
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="smartGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-brand)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--accent-brand)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="year" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} dy={10} minTickGap={20} />
                                <YAxis yAxisId="left" tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} width={60} dx={10} />
                                <YAxis yAxisId="right" orientation="right" domain={[0, 45]} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} hide />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface-elevated)", opacity: 0.4 }} />
                                <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)", paddingTop: "10px" }} />

                                <ReferenceLine yAxisId="right" y={cheapPE} stroke="var(--positive)" strokeDasharray="3 3" />
                                <ReferenceLine yAxisId="right" y={expPE} stroke="var(--negative)" strokeDasharray="3 3" />

                                <Bar yAxisId="right" dataKey="pe" name="P/E Ratio" fill="#6b7280" opacity={0.2} radius={[4, 4, 0, 0]} />

                                <Area yAxisId="left" type="monotone" dataKey="normalCorpus" name="Normal SIP" stroke="#888" strokeWidth={2} fill="none" />
                                <Area yAxisId="left" type="monotone" dataKey="smartCorpus" name="Smart SIP" stroke="var(--accent-brand)" strokeWidth={2.5} fill="url(#smartGrad)" activeDot={{ r: 5, fill: "var(--accent-brand)", stroke: "var(--surface)", strokeWidth: 2 }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg border text-xs" style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                <Info size={13} className="mt-0.5 shrink-0" style={{ color: "var(--accent-brand)" }} />
                <span>
                    The P/E Ratio shown is the approximate Nifty 50 P/E from the <strong>previous year-end</strong>, which is used to determine the SIP multiplier for the entirety of the <strong>current year</strong>.
                </span>
            </div>

            {/* SEO Guide & Content Below Fold */}
            <div className="mt-16  mx-auto space-y-12 pb-10" style={{ color: "var(--text-primary)" }}>
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">What is a Smart SIP?</h2>
                    <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        A Smart SIP (or Valuation-Based SIP) is a dynamic investment strategy that adjusts your monthly contribution based on market valuations. Instead of investing blindly, you look at the <strong>Nifty 50 P/E Ratio</strong> (Price-to-Earnings).
                    </p>
                    <ul className="list-disc pl-5 space-y-2" style={{ color: "var(--text-secondary)" }}>
                        <li><strong>When the market is cheap (P/E &lt; 18):</strong> The market has crashed or earnings have caught up. You double your SIP to accumulate more units at bargain prices.</li>
                        <li><strong>When the market is expensive (P/E &gt; 25):</strong> The market is overheated or in a bubble. You halve your SIP (or stop it and move to debt) to protect your capital from an inevitable correction.</li>
                        <li><strong>When the market is normal (P/E 18 - 25):</strong> You continue your base SIP amount.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Does changing your SIP amount actually work?</h2>
                    <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        Mathematically, buying more units when prices are low lowers your average buy price drastically. As seen in the simulator above, doubling your SIP during the 2008 GFC crash (when P/E dropped below 14) or the 2001 dot-com crash resulted in massive outperformance during the recovery phases.
                        By systematically reducing your SIP during bubble phases (like 2007 or late 2021), you avoid throwing good money at overheated valuations, effectively protecting your XIRR.
                    </p>
                </section>
            </div>
        </div>
    );
}
