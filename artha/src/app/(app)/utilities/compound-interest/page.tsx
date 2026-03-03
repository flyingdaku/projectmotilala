"use client";

import React, { useState, useMemo } from "react";
import { Info } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { formatINR } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

type CompoundFreq = "annually" | "semi-annually" | "quarterly" | "monthly" | "daily";

const FREQ_MAP: Record<CompoundFreq, { label: string; n: number }> = {
  annually: { label: "Annually", n: 1 },
  "semi-annually": { label: "Semi-annually", n: 2 },
  quarterly: { label: "Quarterly", n: 4 },
  monthly: { label: "Monthly", n: 12 },
  daily: { label: "Daily", n: 365 },
};

const PRESETS = [
  { label: "FD (SBI)", rate: 7.1, freq: "quarterly" as CompoundFreq },
  { label: "PPF", rate: 7.1, freq: "annually" as CompoundFreq },
  { label: "EPF", rate: 8.25, freq: "annually" as CompoundFreq },
  { label: "Savings A/c", rate: 3.5, freq: "quarterly" as CompoundFreq },
  { label: "Nifty 50 (hist.)", rate: 13.0, freq: "annually" as CompoundFreq },
  { label: "Custom", rate: 10.0, freq: "annually" as CompoundFreq },
];

function buildGrowthData(
  principal: number,
  rate: number,
  freq: CompoundFreq,
  years: number,
  monthlyContrib: number,
  inflationRate: number
) {
  const n = FREQ_MAP[freq].n;
  const data: { year: number; corpus: number; invested: number; real: number }[] = [];
  let corpus = principal;
  let totalInvested = principal;

  for (let y = 1; y <= years; y++) {
    // Compound for this year
    corpus = corpus * Math.pow(1 + rate / 100 / n, n);
    // Add monthly contributions compounded for the year
    if (monthlyContrib > 0) {
      const monthlyRate = rate / 100 / 12;
      const monthsCorpus = monthlyContrib * ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate) * (1 + monthlyRate);
      corpus += monthsCorpus;
      totalInvested += monthlyContrib * 12;
    }
    const realCorpus = corpus / Math.pow(1 + inflationRate / 100, y);
    data.push({ year: y, corpus: Math.round(corpus), invested: Math.round(totalInvested), real: Math.round(realCorpus) });
  }
  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-lg border text-xs shadow-lg" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <p className="font-medium mb-1" style={{ color: "var(--text-primary)" }}>Year {label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <span className="font-mono font-medium">{formatINR(p.value)}</span></p>
      ))}
    </div>
  );
};

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10.0);
  const [freq, setFreq] = useState<CompoundFreq>("annually");
  const [years, setYears] = useState(20);
  const [monthlyContrib, setMonthlyContrib] = useState(0);
  const [inflationRate, setInflationRate] = useState(6.0);
  const [showReal, setShowReal] = useState(false);
  const [presetIdx, setPresetIdx] = useState(5);
  const [mounted] = useState(true);

  const data = useMemo(
    () => buildGrowthData(principal, rate, freq, years, monthlyContrib, inflationRate),
    [principal, rate, freq, years, monthlyContrib, inflationRate]
  );

  const finalRow = data[data.length - 1];
  const totalInvested = finalRow?.invested ?? principal;
  const finalCorpus = finalRow?.corpus ?? principal;
  const finalReal = finalRow?.real ?? principal;
  const totalGain = finalCorpus - totalInvested;
  const cagr = totalInvested > 0 ? (Math.pow(finalCorpus / totalInvested, 1 / years) - 1) * 100 : 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Compound Interest Calculator</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          See the power of compounding across any rate, frequency, and time horizon. Compare nominal vs real (inflation-adjusted) growth.
        </p>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PRESETS.map((p, i) => (
          <Button
            key={p.label}
            variant={presetIdx === i ? "default" : "outline"}
            onClick={() => {
              setPresetIdx(i);
              setRate(p.rate);
              setFreq(p.freq);
            }}
            className="text-xs"
          >
            {p.label} {p.label !== "Custom" ? `(${p.rate}%)` : ""}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Inputs */}
        <div className="lg:col-span-1 rounded-xl border p-5 space-y-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Parameters</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Principal Amount</label>
              <span className="text-xs font-mono font-medium" style={{ color: "var(--accent-brand)" }}>{formatINR(principal)}</span>
            </div>
            <Slider min={1000} max={10000000} step={1000} value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))} />
            <div className="flex justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
              <span>₹1K</span><span>₹1Cr</span>
            </div>
            <Input type="number" value={principal} onChange={(e) => setPrincipal(Math.max(1000, Number(e.target.value)))}
              className="font-mono" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Annual Rate</label>
              <span className="text-xs font-mono font-medium" style={{ color: "var(--accent-brand)" }}>{rate}%</span>
            </div>
            <Slider min={1} max={30} step={0.25} value={rate}
              onChange={(e) => { setRate(Number(e.target.value)); setPresetIdx(5); }} />
            <div className="flex justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
              <span>1%</span><span>30%</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Compounding Frequency</label>
            <Select value={freq} onChange={(e) => { setFreq(e.target.value as CompoundFreq); setPresetIdx(5); }}>
              {(Object.keys(FREQ_MAP) as CompoundFreq[]).map((k) => (
                <option key={k} value={k}>{FREQ_MAP[k].label} ({FREQ_MAP[k].n}x/yr)</option>
              ))}
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Time Period</label>
              <span className="text-xs font-mono font-medium" style={{ color: "var(--accent-brand)" }}>{years} years</span>
            </div>
            <Slider min={1} max={50} step={1} value={years}
              onChange={(e) => setYears(Number(e.target.value))} />
            <div className="flex justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
              <span>1 yr</span><span>50 yrs</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Monthly Contribution (₹)</label>
            <Input type="number" value={monthlyContrib} onChange={(e) => setMonthlyContrib(Math.max(0, Number(e.target.value)))}
              step={1000} className="font-mono"
              placeholder="0 = lump sum only" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Inflation Rate (for real returns)</label>
              <span className="text-xs font-mono font-medium" style={{ color: "var(--text-muted)" }}>{inflationRate}%</span>
            </div>
            <Slider min={2} max={12} step={0.5} value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))} />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Final Corpus", value: formatINR(finalCorpus), color: "var(--accent-brand)" },
              { label: "Total Invested", value: formatINR(totalInvested), color: "var(--text-primary)" },
              { label: "Total Gain", value: formatINR(totalGain), color: "var(--positive)" },
              { label: "Effective CAGR", value: `${cagr.toFixed(2)}%`, color: "var(--positive)" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{kpi.label}</p>
                <p className="text-base font-semibold font-mono" style={{ color: kpi.color }}>{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Real vs Nominal toggle */}
          <div className="flex items-center justify-between px-1">
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Real value (today&apos;s ₹ at {inflationRate}% inflation): <span className="font-mono font-medium" style={{ color: "var(--text-secondary)" }}>{formatINR(finalReal)}</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Show real</span>
              <Switch checked={showReal} onChange={(e) => setShowReal(e.target.checked)} />
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              Corpus Growth Over {years} Years at {rate}% ({FREQ_MAP[freq].label})
            </h2>
            <div style={{ height: 280 }}>
              {!mounted ? <div className="h-full w-full" /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="corpusGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-brand)" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="var(--accent-brand)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="realGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--positive)" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="var(--positive)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6b7280" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `Yr ${v}`} interval={Math.floor(years / 6)} dy={10} minTickGap={30} />
                    <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} width={60} dx={10} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-strong)", strokeWidth: 1, strokeDasharray: "4 4" }} />
                    <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)", paddingTop: "10px" }} />
                    <Area type="monotone" dataKey="invested" name="Invested" stroke="#6b7280" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#investedGrad)" activeDot={false} />
                    {showReal && (
                      <Area type="monotone" dataKey="real" name="Real Value" stroke="var(--positive)" strokeWidth={2} fill="url(#realGrad)" activeDot={{ r: 4, fill: "var(--positive)", stroke: "var(--surface)", strokeWidth: 2 }} />
                    )}
                    <Area type="monotone" dataKey="corpus" name="Corpus" stroke="var(--accent-brand)" strokeWidth={2.5} fill="url(#corpusGrad)" activeDot={{ r: 4, fill: "var(--accent-brand)", stroke: "var(--surface)", strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Milestone table */}
          <div className="rounded-xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="px-5 py-3 border-b" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Growth Milestones</h2>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: "var(--surface-elevated)" }}>
                  {["Year", "Corpus", "Invested", "Gain", "Gain %"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left font-medium" style={{ color: "var(--text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((_, i) => [0, 1, 2, 4, 9, 14, 19, 24, 29, 34, 39, 49].includes(i) && i < years)
                  .map((row) => {
                    const gain = row.corpus - row.invested;
                    const gainPct = row.invested > 0 ? ((gain / row.invested) * 100).toFixed(0) : "0";
                    return (
                      <tr key={row.year} className="border-t" style={{ borderColor: "var(--border)" }}>
                        <td className="px-4 py-2.5 font-medium" style={{ color: "var(--text-secondary)" }}>Year {row.year}</td>
                        <td className="px-4 py-2.5 font-mono" style={{ color: "var(--accent-brand)" }}>{formatINR(row.corpus)}</td>
                        <td className="px-4 py-2.5 font-mono" style={{ color: "var(--text-secondary)" }}>{formatINR(row.invested)}</td>
                        <td className="px-4 py-2.5 font-mono" style={{ color: "var(--positive)" }}>+{formatINR(gain)}</td>
                        <td className="px-4 py-2.5 font-mono" style={{ color: "var(--positive)" }}>+{gainPct}%</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-lg border text-xs" style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>
        <Info size={13} className="mt-0.5 shrink-0" style={{ color: "var(--accent-brand)" }} />
        <span>
          Monthly contributions are compounded at the selected rate. Real value uses CPI deflation at the specified inflation rate.
          PPF/EPF rates are subject to government revision. Not investment advice.
        </span>
      </div>
    </div>
  );
}
