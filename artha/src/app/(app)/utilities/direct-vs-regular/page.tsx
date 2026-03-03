"use client";

import React, { useState, useMemo } from "react";
import { AlertTriangle, Share2, Info, CheckCircle, Clock, ArrowRight } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { MF_CATEGORIES, type MFCategory } from "@/lib/india-historical-data";
import { formatINR } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type InvestmentMode = "sip" | "lumpsum";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-lg border text-xs shadow-lg" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <p className="font-medium mb-1" style={{ color: "var(--text-primary)" }}>{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <span className="font-mono font-medium">{formatINR(p.value)}</span></p>
      ))}
    </div>
  );
}

function computeCorpusGrowth(
  amount: number,
  mode: InvestmentMode,
  grossReturn: number,
  ter: number,
  years: number
): { yearlyData: { year: number; corpus: number }[]; finalCorpus: number; totalInvested: number } {
  const netReturn = grossReturn - ter;
  const yearlyData: { year: number; corpus: number }[] = [];
  let corpus = 0;
  let totalInvested = 0;

  if (mode === "lumpsum") {
    corpus = amount;
    totalInvested = amount;
    for (let y = 1; y <= years; y++) {
      corpus *= 1 + netReturn / 100;
      yearlyData.push({ year: y, corpus: Math.round(corpus) });
    }
  } else {
    const monthlyNet = Math.pow(1 + netReturn / 100, 1 / 12) - 1;
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        corpus += amount;
        totalInvested += amount;
        corpus *= 1 + monthlyNet;
      }
      yearlyData.push({ year: y, corpus: Math.round(corpus) });
    }
  }

  return { yearlyData, finalCorpus: Math.round(corpus), totalInvested: Math.round(totalInvested) };
}

export default function DirectVsRegularPage() {
  const [categoryKey, setCategoryKey] = useState("flexiCap");
  const [mode, setMode] = useState<InvestmentMode>("sip");
  const [amount, setAmount] = useState(5000);
  const [years, setYears] = useState(20);
  const [grossReturn, setGrossReturn] = useState<number | null>(null);
  const [mounted] = useState(true);
  const [currentInRegular, setCurrentInRegular] = useState(false);
  const [currentCorpus, setCurrentCorpus] = useState(500000);
  const [unrealizedGain, setUnrealizedGain] = useState(150000);
  const [isLTCG, setIsLTCG] = useState(true);

  const category: MFCategory = MF_CATEGORIES[categoryKey];
  const effectiveGrossReturn = grossReturn ?? category.historicalReturn;

  const directResult = useMemo(
    () => computeCorpusGrowth(amount, mode, effectiveGrossReturn, category.directTER, years),
    [amount, mode, effectiveGrossReturn, category.directTER, years]
  );
  const regularResult = useMemo(
    () => computeCorpusGrowth(amount, mode, effectiveGrossReturn, category.regularTER, years),
    [amount, mode, effectiveGrossReturn, category.regularTER, years]
  );

  const gap = directResult.finalCorpus - regularResult.finalCorpus;
  const terDiff = category.regularTER - category.directTER;
  const taxRate = isLTCG ? 0.125 : 0.20;
  const taxOnSwitch = Math.max(0, unrealizedGain - (isLTCG ? 125000 : 0)) * taxRate;
  const annualSaving = currentCorpus * (terDiff / 100);
  const breakEvenMonths = annualSaving > 0 ? Math.ceil((taxOnSwitch / annualSaving) * 12) : 0;

  const chartData = useMemo(() => {
    return directResult.yearlyData.map((d, i) => ({
      year: `Yr ${d.year}`,
      direct: d.corpus,
      regular: regularResult.yearlyData[i]?.corpus ?? 0,
    }));
  }, [directResult.yearlyData, regularResult.yearlyData]);


  const switchVerdict = () => {
    if (breakEvenMonths <= 0) return { label: "Switch Now", color: "var(--positive)", icon: CheckCircle };
    if (breakEvenMonths <= 6) return { label: `Switch Now (break-even in ${breakEvenMonths}mo)`, color: "var(--positive)", icon: CheckCircle };
    if (breakEvenMonths <= 18) return { label: `Wait ${breakEvenMonths} months`, color: "var(--accent-brand)", icon: Clock };
    return { label: `Wait for LTCG (${breakEvenMonths}mo break-even)`, color: "var(--accent-brand)", icon: Clock };
  };

  const verdict = switchVerdict();
  const VerdictIcon = verdict.icon;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Direct vs Regular MF Calculator</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          How much is your distributor charging you in lifetime returns? See the true cost of Regular plans.
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 p-4 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Fund Category</label>
          <Select
            value={categoryKey}
            onChange={(e) => { setCategoryKey(e.target.value); setGrossReturn(null); }}
          >
            {Object.entries(MF_CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </Select>
          <div className="flex items-center gap-2 text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            <span>Regular TER: <strong style={{ color: "var(--negative)" }}>{category.regularTER}%</strong></span>
            <span>·</span>
            <span>Direct TER: <strong style={{ color: "var(--positive)" }}>{category.directTER}%</strong></span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Investment</label>
          <div className="flex gap-1 mb-1">
            {(["sip", "lumpsum"] as InvestmentMode[]).map((m) => (
              <Button key={m} onClick={() => setMode(m)} variant={mode === m ? "default" : "outline"} className="flex-1 text-xs">
                {m === "sip" ? "Monthly SIP" : "Lump Sum"}
              </Button>
            ))}
          </div>
          <Input type="number" value={amount} onChange={(e) => setAmount(Math.max(1000, Number(e.target.value)))}
            step={mode === "sip" ? 1000 : 10000} className="font-mono"
            placeholder={mode === "sip" ? "₹/month" : "₹ lump sum"} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Horizon & Return</label>
          <Select value={years} onChange={(e) => setYears(Number(e.target.value))}>
            {[5, 10, 15, 20, 25, 30].map((y) => <option key={y} value={y}>{y} years</option>)}
          </Select>
          <div className="flex items-center gap-2 mt-1">
            <Input type="number" value={grossReturn ?? category.historicalReturn} onChange={(e) => setGrossReturn(Number(e.target.value))}
              step={0.5} min={4} max={30} className="font-mono w-24" />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>% gross return</span>
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-3 flex justify-end pt-3 border-t" style={{ borderColor: "var(--border)" }}>
          <Button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/utilities/direct-vs-regular?cat=${categoryKey}&mode=${mode}&amount=${amount}&years=${years}`)}
            variant="outline" className="text-xs gap-1.5">
            <Share2 size={13} />Share
          </Button>
        </div>
      </div>

      {/* Result cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Regular Plan</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--negative-subtle)", color: "var(--negative)" }}>TER {category.regularTER}%</span>
          </div>
          <p className="text-2xl font-semibold font-mono mb-1" style={{ color: "var(--text-primary)" }}>{formatINR(regularResult.finalCorpus)}</p>
          <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>Net return: {(effectiveGrossReturn - category.regularTER).toFixed(2)}% p.a.</p>
          <div className="text-xs space-y-1" style={{ color: "var(--text-secondary)" }}>
            <div className="flex justify-between"><span>Total invested</span><span className="font-mono">{formatINR(regularResult.totalInvested)}</span></div>
            <div className="flex justify-between"><span>Gain</span><span className="font-mono" style={{ color: "var(--positive)" }}>+{formatINR(regularResult.finalCorpus - regularResult.totalInvested)}</span></div>
          </div>
        </div>

        <div className="rounded-xl border-2 p-5" style={{ background: "var(--surface)", borderColor: "var(--positive)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Direct Plan</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--positive-subtle)", color: "var(--positive)" }}>TER {category.directTER}%</span>
          </div>
          <p className="text-2xl font-semibold font-mono mb-1" style={{ color: "var(--text-primary)" }}>{formatINR(directResult.finalCorpus)}</p>
          <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>Net return: {(effectiveGrossReturn - category.directTER).toFixed(2)}% p.a.</p>
          <div className="text-xs space-y-1" style={{ color: "var(--text-secondary)" }}>
            <div className="flex justify-between"><span>Total invested</span><span className="font-mono">{formatINR(directResult.totalInvested)}</span></div>
            <div className="flex justify-between"><span>Gain</span><span className="font-mono" style={{ color: "var(--positive)" }}>+{formatINR(directResult.finalCorpus - directResult.totalInvested)}</span></div>
          </div>
        </div>
      </div>

      {/* Warning banner */}
      <div className="flex items-center gap-3 p-4 rounded-xl border mb-6" style={{ background: "var(--negative-subtle)", borderColor: "var(--negative)" }}>
        <AlertTriangle size={18} style={{ color: "var(--negative)", flexShrink: 0 }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--negative)" }}>You lose {formatINR(gap)} by staying in Regular Plan over {years} years</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
            That&apos;s {terDiff.toFixed(2)}% extra annual drag — {formatINR(Math.round(gap / years))} per year on average, compounding exponentially.
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border p-5 mb-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Corpus Gap Over Time — Direct vs Regular</h2>
        <div style={{ height: 280 }}>
          {!mounted ? <div className="h-full w-full" /> : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="directGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--positive)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--positive)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="regularGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--negative)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--negative)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} interval={Math.floor(years / 5)} dy={10} minTickGap={30} />
                <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} width={60} dx={10} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-strong)", strokeWidth: 1, strokeDasharray: "4 4" }} />
                <Area type="monotone" dataKey="regular" name="Regular Plan" stroke="var(--negative)" strokeWidth={2} fill="url(#regularGrad)" activeDot={{ r: 4, fill: "var(--negative)", stroke: "var(--surface)", strokeWidth: 2 }} />
                <Area type="monotone" dataKey="direct" name="Direct Plan" stroke="var(--positive)" strokeWidth={2.5} fill="url(#directGrad)" activeDot={{ r: 4, fill: "var(--positive)", stroke: "var(--surface)", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Switch Analysis */}
      <div className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Already in a Regular Plan? Switch Analysis</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative w-9 h-5 rounded-full transition-colors" style={{ background: currentInRegular ? "var(--accent-brand)" : "var(--border-strong)" }} onClick={() => setCurrentInRegular(!currentInRegular)}>
              <div className="absolute top-0.5 w-4 h-4 rounded-full bg-[var(--background)] transition-transform shadow-sm" style={{ transform: currentInRegular ? "translateX(18px)" : "translateX(2px)" }} />
            </div>
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>I hold a Regular plan</span>
          </label>
        </div>

        {currentInRegular ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Current corpus (₹)</label>
                <Input type="number" value={currentCorpus} onChange={(e) => setCurrentCorpus(Number(e.target.value))} step={50000}
                  className="font-mono" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Unrealized gain (₹)</label>
                <Input type="number" value={unrealizedGain} onChange={(e) => setUnrealizedGain(Number(e.target.value))} step={10000}
                  className="font-mono" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Gain type</label>
                <div className="flex gap-1">
                  {[{ label: "LTCG (12.5%)", val: true }, { label: "STCG (20%)", val: false }].map((opt) => (
                    <Button key={String(opt.val)} onClick={() => setIsLTCG(opt.val)} variant={isLTCG === opt.val ? "default" : "outline"} className="flex-1 text-xs">
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-lg" style={{ background: "var(--surface-elevated)" }}>
              <div>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Tax on switch</p>
                <p className="text-base font-semibold font-mono" style={{ color: "var(--negative)" }}>{formatINR(Math.round(taxOnSwitch))}</p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Annual TER saving</p>
                <p className="text-base font-semibold font-mono" style={{ color: "var(--positive)" }}>{formatINR(Math.round(annualSaving))}</p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Break-even</p>
                <p className="text-base font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{breakEvenMonths} months</p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Verdict</p>
                <div className="flex items-center gap-1.5">
                  <VerdictIcon size={14} style={{ color: verdict.color }} />
                  <p className="text-xs font-semibold" style={{ color: verdict.color }}>{verdict.label}</p>
                </div>
              </div>
            </div>

            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              <strong style={{ color: "var(--text-secondary)" }}>Note:</strong> In India, there is no wash sale rule — you can switch to Direct plan and immediately reinvest in the same scheme (Direct variant). LTCG exemption of ₹1.25L per year applies.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 py-4" style={{ color: "var(--text-muted)" }}>
            <ArrowRight size={16} />
            <p className="text-sm">Toggle the switch above to analyze your existing Regular plan holding.</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 p-3 rounded-lg border text-xs" style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>
        <Info size={13} className="mt-0.5 shrink-0" style={{ color: "var(--accent-brand)" }} />
        <span>TER values are approximate category averages from AMFI data. LTCG tax rate for equity MF is 12.5% (Budget 2024). STCG rate is 20%. Not investment advice.</span>
      </div>
    </div>
  );
}
