"use client";

import React, { useState, useMemo } from "react";
import { TrendingUp, Share2, Info, ArrowRight } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Legend,
} from "recharts";
import {
  ASSET_LABELS,
  ANNUAL_RETURNS,
  START_YEAR,
  END_YEAR,
  computeSIPReturns,
  type AssetKey,
} from "@/lib/india-historical-data";
import { formatINR } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const CRASH_EVENTS: Record<number, string> = {
  2000: "IT Bubble",
  2008: "GFC",
  2011: "Eurozone",
  2016: "Demonetisation",
  2020: "COVID",
};

function buildChartData(
  asset: AssetKey,
  startYear: number,
  endYear: number,
  sipAmount: number,
  stepUpPercent: number
) {
  const data: { year: number; sip: number; lumpsum: number; invested: number }[] = [];
  let sipCorpus = 0;
  let totalInvested = 0;
  let currentSIP = sipAmount;
  const lumpInvested = sipAmount * 12;
  let lumpCorpus = lumpInvested;

  for (let y = startYear; y <= endYear; y++) {
    const annualRet = ANNUAL_RETURNS[y]?.[asset];
    if (annualRet === undefined) break;
    const monthlyRet = Math.pow(1 + annualRet / 100, 1 / 12) - 1;

    for (let m = 0; m < 12; m++) {
      sipCorpus += currentSIP;
      totalInvested += currentSIP;
      sipCorpus *= 1 + monthlyRet;
    }
    lumpCorpus *= 1 + annualRet / 100;

    if (stepUpPercent > 0) currentSIP *= 1 + stepUpPercent / 100;

    data.push({
      year: y,
      sip: Math.round(sipCorpus),
      lumpsum: Math.round(lumpCorpus),
      invested: Math.round(totalInvested),
    });
  }
  return data;
}

const ASSETS = Object.keys(ASSET_LABELS) as AssetKey[];
const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-lg border text-xs shadow-lg"
      style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
    >
      <p className="font-medium mb-1" style={{ color: "var(--text-primary)" }}>
        {label}
        {CRASH_EVENTS[label] && (
          <span className="ml-1 text-[10px] px-1 rounded" style={{ background: "var(--negative-subtle)", color: "var(--negative)" }}>
            {CRASH_EVENTS[label]}
          </span>
        )}
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

export default function SIPvsLumpsumPage() {
  const [asset, setAsset] = useState<AssetKey>("nifty50");
  const [startYear, setStartYear] = useState(2005);
  const [endYear, setEndYear] = useState(END_YEAR);
  const [sipAmount, setSipAmount] = useState(10000);
  const [stepUp, setStepUp] = useState(false);
  const [stepUpPct, setStepUpPct] = useState(10);
  const [mounted] = useState(true);

  const chartData = useMemo(
    () => buildChartData(asset, startYear, endYear, sipAmount, stepUp ? stepUpPct : 0),
    [asset, startYear, endYear, sipAmount, stepUp, stepUpPct]
  );

  const years = endYear - startYear + 1;
  const sipResult = useMemo(
    () => computeSIPReturns(asset, startYear, years, sipAmount, stepUp ? stepUpPct : 0),
    [asset, startYear, years, sipAmount, stepUp, stepUpPct]
  );

  const lumpEquivalent = sipAmount * 12;
  const lumpResult = useMemo(() => {
    if (!ANNUAL_RETURNS[startYear]?.[asset]) return null;
    let corpus = lumpEquivalent;
    for (let y = startYear; y <= endYear; y++) {
      const r = ANNUAL_RETURNS[y]?.[asset];
      if (r === undefined) break;
      corpus *= 1 + r / 100;
    }
    const cagr = (Math.pow(corpus / lumpEquivalent, 1 / years) - 1) * 100;
    return { corpus: Math.round(corpus), cagr: Math.round(cagr * 10) / 10 };
  }, [asset, startYear, endYear, lumpEquivalent, years]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          SIP vs Lump Sum Visualizer
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Does timing the market beat time in the market? Compare monthly SIP vs equivalent lump sum across any period.
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Asset</label>
          <Select value={asset} onChange={(e) => setAsset(e.target.value as AssetKey)}>
            {ASSETS.map((k) => <option key={k} value={k}>{ASSET_LABELS[k]}</option>)}
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Monthly SIP (₹)</label>
          <Input type="number" value={sipAmount} onChange={(e) => setSipAmount(Math.max(1000, Number(e.target.value)))}
            step={1000} className="font-mono" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>From Year</label>
          <Select value={startYear} onChange={(e) => setStartYear(Number(e.target.value))}>
            {YEARS.filter((y) => y < endYear - 1).map((y) => <option key={y} value={y}>{y}</option>)}
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>To Year</label>
          <Select value={endYear} onChange={(e) => setEndYear(Number(e.target.value))}>
            {YEARS.filter((y) => y > startYear + 1).map((y) => <option key={y} value={y}>{y}</option>)}
          </Select>
        </div>

        <div className="sm:col-span-2 lg:col-span-4 flex items-center gap-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <Switch checked={stepUp} onChange={(e) => setStepUp(e.target.checked)} />
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Step-up SIP</span>
          </div>
          {stepUp && (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>Increase by</span>
              <Select value={stepUpPct} onChange={(e) => setStepUpPct(Number(e.target.value))} className="w-24 h-8">
                {[5, 10, 15, 20].map((v) => <option key={v} value={v}>{v}% / yr</option>)}
              </Select>
            </div>
          )}
          <Button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/utilities/sip-vs-lumpsum?asset=${asset}&start=${startYear}&end=${endYear}&sip=${sipAmount}`)}
            variant="outline" className="ml-auto text-xs gap-1.5">
            <Share2 size={13} />Share
          </Button>
        </div>
      </div>

      {/* Result cards */}
      {sipResult && lumpResult && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                SIP Result {stepUp ? `(${stepUpPct}% step-up)` : ""}
              </span>
              <TrendingUp size={16} style={{ color: "var(--accent-brand)" }} />
            </div>
            <p className="text-2xl font-semibold font-mono mb-1" style={{ color: "var(--text-primary)" }}>{formatINR(sipResult.corpus)}</p>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--positive)" }}>XIRR: +{sipResult.xirr}% p.a.</p>
            <div className="space-y-1 text-xs" style={{ color: "var(--text-secondary)" }}>
              <div className="flex justify-between"><span>Total invested</span><span className="font-mono">{formatINR(sipResult.totalInvested)}</span></div>
              <div className="flex justify-between"><span>Absolute gain</span><span className="font-mono" style={{ color: "var(--positive)" }}>+{formatINR(sipResult.corpus - sipResult.totalInvested)}</span></div>
              <div className="flex justify-between"><span>Gain %</span><span className="font-mono" style={{ color: "var(--positive)" }}>+{Math.round(((sipResult.corpus - sipResult.totalInvested) / sipResult.totalInvested) * 100)}%</span></div>
            </div>
          </div>

          <div className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Lump Sum Equivalent</span>
              <ArrowRight size={16} style={{ color: "var(--text-muted)" }} />
            </div>
            <p className="text-2xl font-semibold font-mono mb-1" style={{ color: "var(--text-primary)" }}>{formatINR(lumpResult.corpus)}</p>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--text-secondary)" }}>CAGR: +{lumpResult.cagr}% p.a.</p>
            <div className="space-y-1 text-xs" style={{ color: "var(--text-secondary)" }}>
              <div className="flex justify-between"><span>Invested upfront</span><span className="font-mono">{formatINR(lumpEquivalent)}</span></div>
              <div className="flex justify-between">
                <span>Absolute gain</span>
                <span className="font-mono" style={{ color: lumpResult.corpus > lumpEquivalent ? "var(--positive)" : "var(--negative)" }}>
                  {lumpResult.corpus > lumpEquivalent ? "+" : ""}{formatINR(lumpResult.corpus - lumpEquivalent)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Gain %</span>
                <span className="font-mono" style={{ color: lumpResult.corpus > lumpEquivalent ? "var(--positive)" : "var(--negative)" }}>
                  {lumpResult.corpus > lumpEquivalent ? "+" : ""}{Math.round(((lumpResult.corpus - lumpEquivalent) / lumpEquivalent) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="rounded-xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
          Portfolio Value Over Time — {ASSET_LABELS[asset]}
        </h2>
        <div style={{ height: 320 }}>
          {!mounted ? <div className="h-full w-full" /> : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="sipGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-brand)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--accent-brand)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="lsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6b7280" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} dy={10} minTickGap={30} />
                <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} width={60} dx={10} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-strong)", strokeWidth: 1, strokeDasharray: "4 4" }} />
                <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)", paddingTop: "10px" }} />
                {Object.keys(CRASH_EVENTS).map((yr) => (
                  <ReferenceLine
                    key={yr}
                    x={Number(yr)}
                    stroke="var(--negative)"
                    strokeDasharray="3 3"
                    strokeOpacity={0.5}
                    label={{ value: CRASH_EVENTS[Number(yr)], position: "top", fontSize: 9, fill: "var(--negative)" }}
                  />
                ))}
                <Area type="monotone" dataKey="invested" name="Total Invested" stroke="var(--border-strong)" strokeWidth={1} strokeDasharray="4 4" fill="none" />
                <Area type="monotone" dataKey="lumpsum" name="Lump Sum" stroke="#6b7280" strokeWidth={2} fill="url(#lsGrad)" activeDot={{ r: 4, fill: "#6b7280", stroke: "var(--surface)", strokeWidth: 2 }} />
                <Area type="monotone" dataKey="sip" name="SIP" stroke="var(--accent-brand)" strokeWidth={2.5} fill="url(#sipGrad)" activeDot={{ r: 4, fill: "var(--accent-brand)", stroke: "var(--surface)", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 p-3 rounded-lg border text-xs" style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>
        <Info size={13} className="mt-0.5 shrink-0" style={{ color: "var(--accent-brand)" }} />
        <span>
          Lump sum equivalent = first year&apos;s SIP total ({formatINR(lumpEquivalent)}) invested on Jan 1 of the start year.
          SIP returns use XIRR approximation. Returns are based on annual index data and are approximate.
        </span>
      </div>
    </div>
  );
}
