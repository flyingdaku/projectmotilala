"use client";

import { useState, useMemo } from "react";
import { Play, Trophy, BarChart2, ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell
} from "recharts";
import {
  ASSET_LABELS, AssetKey, ANNUAL_RETURNS, START_YEAR, END_YEAR,
  MF_CATEGORIES
} from "@/lib/india-historical-data";

// ─── Fund ranking engine ─────────────────────────────────────────────────────

interface CategoryMetrics {
  key: string;
  label: string;
  ter: number;
  grossReturn: number;
  netReturn: number;
  risk: number; // approx std dev
  sharpe: number;
  sortino: number;
  maxDD: number;
  consistencyScore: number; // % of years beating Nifty 50
  rank: number;
  compositeScore: number;
  yearlyReturns: { year: number; ret: number }[];
}

// Map categories to proxy assets for simulation
const PROXY_MAP: Record<string, { asset: AssetKey; alpha: number; volAdj: number }> = {
  largeCap: { asset: "nifty50", alpha: 1.5, volAdj: 1.0 },
  flexiCap: { asset: "nifty500", alpha: 1.8, volAdj: 1.05 },
  midCap: { asset: "niftyMidcap", alpha: 2.0, volAdj: 1.2 },
  smallCap: { asset: "niftyMidcap", alpha: 3.5, volAdj: 1.4 },
  elss: { asset: "nifty500", alpha: 1.2, volAdj: 1.0 },
  balanced: { asset: "balanced", alpha: 0.5, volAdj: 0.7 },
  aggressive: { asset: "nifty500", alpha: 1.0, volAdj: 0.85 },
  shortDuration: { asset: "debt", alpha: 0.3, volAdj: 0.3 },
  liquidFund: { asset: "debt", alpha: -1.0, volAdj: 0.1 },
  gilt: { asset: "debt", alpha: 0.5, volAdj: 0.5 },
};

type SortKey = "compositeScore" | "netReturn" | "sharpe" | "sortino" | "maxDD" | "consistencyScore" | "ter";

function computeRankings(startYear: number, endYear: number, sortBy: SortKey): CategoryMetrics[] {
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
    .filter(y => ANNUAL_RETURNS[y]);
  const n = years.length;
  const rf = 7;

  const results: CategoryMetrics[] = Object.entries(MF_CATEGORIES).map(([key, cat]) => {
    const proxy = PROXY_MAP[key] ?? { asset: "nifty500" as AssetKey, alpha: 0, volAdj: 1 };

    const yearlyReturns = years.map(y => {
      const baseRet = ANNUAL_RETURNS[y]?.[proxy.asset] ?? 0;
      return { year: y, ret: Math.round((baseRet + proxy.alpha - cat.regularTER) * 100) / 100 };
    });

    const rets = yearlyReturns.map(y => y.ret);
    const mean = rets.reduce((s, r) => s + r, 0) / n;
    const stdDev = Math.sqrt(rets.reduce((s, r) => s + Math.pow(r - mean, 2), 0) / n) * proxy.volAdj;

    // Max drawdown (cumulative)
    let peak = 1;
    let maxDD = 0;
    let val = 1;
    for (const r of rets) {
      val *= (1 + r / 100);
      peak = Math.max(peak, val);
      maxDD = Math.min(maxDD, (val - peak) / peak * 100);
    }

    const sharpe = stdDev > 0 ? (mean - rf) / stdDev : 0;
    const downDev = Math.sqrt(rets.filter(r => r < rf).reduce((s, r) => s + Math.pow(r - rf, 2), 0) / Math.max(rets.filter(r => r < rf).length, 1));
    const sortino = downDev > 0 ? (mean - rf) / downDev : 0;

    // Consistency: % of years beating Nifty 50
    const niftyBeats = years.filter((y, i) => rets[i] > (ANNUAL_RETURNS[y]?.nifty50 ?? 0)).length;
    const consistencyScore = Math.round((niftyBeats / n) * 10000) / 100;

    // Composite score (weighted)
    const compositeScore = Math.round((
      sharpe * 30 +
      sortino * 20 +
      (mean / 10) * 20 +
      (consistencyScore / 10) * 15 +
      (100 + maxDD) / 10 * 15
    ) * 100) / 100;

    return {
      key,
      label: cat.label,
      ter: cat.regularTER,
      grossReturn: Math.round((mean + cat.regularTER) * 100) / 100,
      netReturn: Math.round(mean * 100) / 100,
      risk: Math.round(stdDev * 100) / 100,
      sharpe: Math.round(sharpe * 100) / 100,
      sortino: Math.round(sortino * 100) / 100,
      maxDD: Math.round(maxDD * 10) / 10,
      consistencyScore,
      rank: 0,
      compositeScore,
      yearlyReturns,
    };
  });

  // Sort
  const ascending = sortBy === "ter" || sortBy === "maxDD";
  results.sort((a, b) => ascending ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]);
  results.forEach((r, i) => r.rank = i + 1);

  return results;
}

// ─── Component ───────────────────────────────────────────────────────────────

type TabKey = "table" | "chart" | "radar";

export default function FundRankingsPage() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<CategoryMetrics[] | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("table");

  const [startYear, setStartYear] = useState(2005);
  const [endYear, setEndYear] = useState(END_YEAR);
  const [sortBy, setSortBy] = useState<SortKey>("compositeScore");

  const isValid = startYear < endYear;

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      setResults(computeRankings(startYear, endYear, sortBy));
      setRunning(false);
    }, 50);
  }

  // Re-sort when sortBy changes
  const sorted = useMemo(() => {
    if (!results) return null;
    const copy = [...results];
    const ascending = sortBy === "ter" || sortBy === "maxDD";
    copy.sort((a, b) => ascending ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]);
    copy.forEach((r, i) => r.rank = i + 1);
    return copy;
  }, [results, sortBy]);

  // Radar data for top 5
  const radarData = useMemo(() => {
    if (!sorted) return [];
    const top5 = sorted.slice(0, 5);
    const metrics = ["Return", "Sharpe", "Sortino", "Consistency", "Low DD"];
    return metrics.map(metric => {
      const row: Record<string, string | number> = { metric };
      top5.forEach(cat => {
        row[cat.label] = metric === "Return" ? Math.max(0, cat.netReturn)
          : metric === "Sharpe" ? Math.max(0, cat.sharpe * 10)
          : metric === "Sortino" ? Math.max(0, cat.sortino * 10)
          : metric === "Consistency" ? cat.consistencyScore
          : Math.max(0, 100 + cat.maxDD);
      });
      return row;
    });
  }, [sorted]);

  const inputCls = "w-full rounded-md border px-2 py-1.5 text-xs outline-none bg-transparent";
  const inputSt = { borderColor: "var(--border)", color: "var(--text-primary)" };
  const ttSt = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11, color: "var(--text-primary)" };
  const COLORS = ["#6366f1", "#f97316", "#10b981", "#ef4444", "#a855f7", "#eab308", "#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6"];

  return (
    <div className="flex gap-4 h-[calc(100vh-112px)] overflow-hidden">
      {/* ── Left Config Panel ── */}
      <div className="w-[340px] shrink-0 flex flex-col rounded-xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Fund Category Rankings</h2>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Rank mutual fund categories by return, risk-adjusted metrics, and consistency. Uses historical proxy data and actual TER data.
          </p>

          <Section title="Time Period">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Start Year">
                <select value={startYear} onChange={e => setStartYear(Number(e.target.value))} className={inputCls} style={inputSt}>
                  {Array.from({ length: END_YEAR - START_YEAR }, (_, i) => START_YEAR + i).map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </Field>
              <Field label="End Year">
                <select value={endYear} onChange={e => setEndYear(Number(e.target.value))} className={inputCls} style={inputSt}>
                  {Array.from({ length: END_YEAR - startYear + 1 }, (_, i) => startYear + 1 + i).filter(y => y <= END_YEAR).map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </Field>
            </div>
          </Section>

          <Section title="Sort By">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as SortKey)} className={inputCls} style={inputSt}>
              <option value="compositeScore">Composite Score</option>
              <option value="netReturn">Net Return</option>
              <option value="sharpe">Sharpe Ratio</option>
              <option value="sortino">Sortino Ratio</option>
              <option value="maxDD">Max Drawdown (least)</option>
              <option value="consistencyScore">Consistency (beats Nifty 50)</option>
              <option value="ter">Expense Ratio (lowest)</option>
            </select>
          </Section>

          <Section title="Scoring Methodology">
            <div className="text-[10px] space-y-1" style={{ color: "var(--text-muted)" }}>
              <p><strong>Composite</strong> = 30% Sharpe + 20% Sortino + 20% Return + 15% Consistency + 15% DD Protection</p>
              <p><strong>Consistency</strong> = % of years where category beat Nifty 50</p>
              <p>Returns are net of regular plan TER (from AMFI data).</p>
            </div>
          </Section>
        </div>

        <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
          <button onClick={handleRun} disabled={running || !isValid} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60" style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}>
            {running ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Ranking…</>) : (<><Play size={14} /> Rank Categories</>)}
          </button>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col rounded-xl border overflow-hidden min-w-0" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {!sorted && !running ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "var(--surface-elevated)" }}>
              <Trophy size={28} style={{ color: "var(--text-muted)" }} />
            </div>
            <h3 className="text-base font-medium" style={{ color: "var(--text-primary)" }}>Fund Rankings Ready</h3>
            <p className="text-xs text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
              Select a time period and ranking metric to compare mutual fund categories.
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full relative">
            {running && (
              <div className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.3)" }}>
                <svg className="animate-spin w-10 h-10" viewBox="0 0 24 24" fill="none" style={{ color: "var(--accent-brand)" }}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
              </div>
            )}

            {sorted && (
              <>
                {/* Tabs */}
                <div className="flex items-center gap-1 px-4 pt-2 pb-0 border-b" style={{ borderColor: "var(--border)" }}>
                  {([
                    { key: "table" as TabKey, label: "Rankings Table", icon: ArrowUpDown },
                    { key: "chart" as TabKey, label: "Comparison Chart", icon: BarChart2 },
                    { key: "radar" as TabKey, label: "Radar (Top 5)", icon: Trophy },
                  ]).map(t => (
                    <button key={t.key} onClick={() => setActiveTab(t.key)}
                      className="px-3 py-1.5 text-[11px] font-semibold rounded-t-md border-b-2 transition-colors flex items-center gap-1.5"
                      style={{
                        color: activeTab === t.key ? "var(--accent-brand)" : "var(--text-muted)",
                        borderColor: activeTab === t.key ? "var(--accent-brand)" : "transparent",
                      }}>
                      <t.icon size={12} />{t.label}
                    </button>
                  ))}
                </div>

                <div className="flex-1 min-h-0 p-4 overflow-auto custom-scrollbar">
                  {activeTab === "table" && (
                    <div className="overflow-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr style={{ background: "var(--surface-elevated)" }}>
                            {["#", "Category", "TER", "Net Return", "Risk (σ)", "Sharpe", "Sortino", "Max DD", "Consistency", "Score"].map(h => (
                              <th key={h} className="text-left px-2.5 py-2 font-semibold whitespace-nowrap" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)", fontSize: 10 }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sorted.map((r, i) => (
                            <tr key={r.key} className="border-b" style={{ borderColor: "var(--border)" }}>
                              <td className="px-2.5 py-1.5 font-mono font-bold" style={{ color: i < 3 ? "var(--accent-brand)" : "var(--text-muted)" }}>
                                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : r.rank}
                              </td>
                              <td className="px-2.5 py-1.5 font-semibold" style={{ color: "var(--text-primary)" }}>{r.label}</td>
                              <td className="px-2.5 py-1.5 font-mono" style={{ color: "var(--text-muted)" }}>{r.ter}%</td>
                              <td className="px-2.5 py-1.5 font-mono" style={{ color: r.netReturn > 10 ? "var(--positive)" : "var(--text-primary)" }}>{r.netReturn}%</td>
                              <td className="px-2.5 py-1.5 font-mono" style={{ color: "var(--text-muted)" }}>{r.risk}%</td>
                              <td className="px-2.5 py-1.5 font-mono" style={{ color: r.sharpe > 0.5 ? "var(--positive)" : "var(--text-primary)" }}>{r.sharpe.toFixed(2)}</td>
                              <td className="px-2.5 py-1.5 font-mono" style={{ color: "var(--text-primary)" }}>{r.sortino.toFixed(2)}</td>
                              <td className="px-2.5 py-1.5 font-mono" style={{ color: "var(--negative)" }}>{r.maxDD}%</td>
                              <td className="px-2.5 py-1.5 font-mono" style={{ color: r.consistencyScore > 50 ? "var(--positive)" : "var(--text-muted)" }}>{r.consistencyScore}%</td>
                              <td className="px-2.5 py-1.5 font-mono font-bold" style={{ color: "var(--accent-brand)" }}>{r.compositeScore}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === "chart" && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        Net return vs risk for each MF category. Bubble position shows risk-return tradeoff.
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={sorted} margin={{ top: 5, right: 10, left: 10, bottom: 40 }} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                            <XAxis type="number" tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={v => `${v}%`} />
                            <YAxis dataKey="label" type="category" tick={{ fontSize: 9, fill: "var(--text-muted)" }} width={110} />
                            <Tooltip contentStyle={ttSt} formatter={(v) => `${Number(v).toFixed(1)}%`} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Bar dataKey="netReturn" name="Net Return" fill="#6366f1" radius={[0, 4, 4, 0]} />
                            <Bar dataKey="risk" name="Risk (σ)" fill="#f97316" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {activeTab === "radar" && radarData.length > 0 && (
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] mb-3 shrink-0" style={{ color: "var(--text-muted)" }}>
                        Multi-dimensional comparison of the top 5 ranked categories across return, risk-adjusted, and consistency metrics.
                      </p>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                            <PolarGrid stroke="var(--border)" />
                            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
                            <PolarRadiusAxis tick={{ fontSize: 9, fill: "var(--text-muted)" }} />
                            {sorted.slice(0, 5).map((cat, i) => (
                              <Radar key={cat.key} name={cat.label} dataKey={cat.label} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.1} strokeWidth={2} />
                            ))}
                            <Legend wrapperStyle={{ fontSize: 10 }} />
                            <Tooltip contentStyle={ttSt} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Small UI helpers ─────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border p-3 space-y-2" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}>
      <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{title}</p>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] mb-0.5 block" style={{ color: "var(--text-muted)" }}>{label}</label>
      {children}
    </div>
  );
}
