"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend, ReferenceArea
} from "recharts";

const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

const FII_DII_DATA = MONTHS.map((month, i) => ({
  month,
  fii: Math.round((Math.sin(i * 0.5) * 12000 + (i * 1234 % 8000) - 4000)),
  dii: Math.round((Math.cos(i * 0.4) * 8000 + 5000 + (i * 5678 % 4000))),
}));

const CUMULATIVE = FII_DII_DATA.reduce((acc, d) => {
  const prev = acc[acc.length - 1] ?? { cumFii: 0, cumDii: 0 };
  return [...acc, {
    month: d.month,
    cumFii: prev.cumFii + d.fii,
    cumDii: prev.cumDii + d.dii,
  }];
}, [] as { month: string; cumFii: number; cumDii: number }[]);

const SEGMENTS = [
  { label: "FII Equity", buy: 142840, sell: 138920, net: 3920 },
  { label: "FII Debt", buy: 18240, sell: 21840, net: -3600 },
  { label: "DII Equity", buy: 118420, sell: 98240, net: 20180 },
  { label: "MF Equity", buy: 84200, sell: 62140, net: 22060 },
  { label: "Insurance", buy: 28420, sell: 18420, net: 10000 },
];

function fmtCr(v: number) {
  const abs = Math.abs(v);
  const str = abs >= 10000 ? `₹${(abs / 100).toFixed(0)}B` : `₹${abs.toFixed(0)} Cr`;
  return (v < 0 ? "-" : "+") + str;
}

export default function FiiDiiPage() {
  const [view, setView] = useState<"monthly" | "cumulative">("monthly");

  const totalFii = FII_DII_DATA.reduce((s, d) => s + d.fii, 0);
  const totalDii = FII_DII_DATA.reduce((s, d) => s + d.dii, 0);

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>FII / DII Flows</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Foreign & domestic institutional investor activity in Indian equity markets.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "FII Net (FY)", value: totalFii, sub: "Foreign Inst." },
          { label: "DII Net (FY)", value: totalDii, sub: "Domestic Inst." },
          { label: "FII (Mar)", value: FII_DII_DATA[FII_DII_DATA.length - 1].fii, sub: "Last month" },
          { label: "DII (Mar)", value: FII_DII_DATA[FII_DII_DATA.length - 1].dii, sub: "Last month" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="rounded-xl p-4 border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>{label}</div>
            <div className="text-xl font-bold font-mono" style={{ color: value >= 0 ? "#10B981" : "#EF4444" }}>
              {fmtCr(value)}
            </div>
            <div className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {view === "monthly" ? "Monthly Net Flows (FY 2024-25, ₹ Cr)" : "Cumulative Net Flows (₹ Cr)"}
            </h3>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: "#3B82F6" }}></div>
                <span style={{ color: "var(--text-muted)" }}>FII</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: "#F59E0B" }}></div>
                <span style={{ color: "var(--text-muted)" }}>DII</span>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            {(["monthly", "cumulative"] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className="px-2 py-1 rounded text-xs font-medium transition-colors capitalize"
                style={{
                  background: view === v ? "var(--accent-subtle)" : "transparent",
                  color: view === v ? "var(--accent-brand)" : "var(--text-muted)",
                  border: `1px solid ${view === v ? "var(--accent-brand)" : "var(--border)"}`,
                }}>
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {view === "monthly" ? (
              <BarChart key="monthly" data={FII_DII_DATA} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} width={48} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }}
                  formatter={(v: unknown) => [`₹${(v as number).toLocaleString("en-IN")} Cr`]} />
                <ReferenceLine y={0} stroke="var(--border)" />
                <ReferenceArea x1={0} x2={1} fill="var(--surface-elevated)" fillOpacity={0.3} />
                <ReferenceArea x1={2} x2={3} fill="var(--surface-elevated)" fillOpacity={0.3} />
                <ReferenceArea x1={4} x2={5} fill="var(--surface-elevated)" fillOpacity={0.3} />
                <ReferenceArea x1={6} x2={7} fill="var(--surface-elevated)" fillOpacity={0.3} />
                <ReferenceArea x1={8} x2={9} fill="var(--surface-elevated)" fillOpacity={0.3} />
                <ReferenceArea x1={10} x2={11} fill="var(--surface-elevated)" fillOpacity={0.3} />
                <Bar dataKey="fii" fill="#3B82F6" radius={[2, 2, 0, 0]} name="FII" />
                <Bar dataKey="dii" fill="#F59E0B" radius={[2, 2, 0, 0]} name="DII" />
              </BarChart>
            ) : (
              <BarChart key="cumulative" data={CUMULATIVE} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} width={48} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }}
                  formatter={(v: unknown) => [`₹${(v as number).toLocaleString("en-IN")} Cr`]} />
                <ReferenceLine y={0} stroke="var(--border)" />
                <ReferenceArea x1={0} x2={1} fill="var(--surface-elevated)" fillOpacity={0.3} />
                <ReferenceArea x1={2} x2={3} fill="var(--surface-elevated)" fillOpacity={0.3} />
                <ReferenceArea x1={4} x2={5} fill="var(--surface-elevated)" fillOpacity={0.3} />
                <ReferenceArea x1={6} x2={7} fill="var(--surface-elevated)" fillOpacity={0.3} />
                <ReferenceArea x1={8} x2={9} fill="var(--surface-elevated)" fillOpacity={0.3} />
                <ReferenceArea x1={10} x2={11} fill="var(--surface-elevated)" fillOpacity={0.3} />
                <Bar dataKey="cumFii" fill="#3B82F6" radius={[2, 2, 0, 0]} name="FII Cumulative" />
                <Bar dataKey="cumDii" fill="#F59E0B" radius={[2, 2, 0, 0]} name="DII Cumulative" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Segment breakdown */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <div className="px-4 py-3 border-b text-sm font-semibold" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
          Segment-wise Activity (MTD)
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: "var(--surface-elevated)", borderBottom: "1px solid var(--border)" }}>
              {["Segment", "Buy (₹ Cr)", "Sell (₹ Cr)", "Net (₹ Cr)"].map(h => (
                <th key={h} className={`py-2.5 font-semibold ${h === "Segment" ? "text-left px-4" : "text-right px-4"}`} style={{ color: "var(--text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SEGMENTS.map((seg, i) => (
              <tr key={seg.label} style={{ borderBottom: i < SEGMENTS.length - 1 ? "1px solid var(--border)" : "none", background: "var(--surface)" }}>
                <td className="px-4 py-2.5 font-medium" style={{ color: "var(--text-primary)" }}>{seg.label}</td>
                <td className="text-right px-4 py-2.5 font-mono text-emerald-500">₹{seg.buy.toLocaleString("en-IN")}</td>
                <td className="text-right px-4 py-2.5 font-mono text-rose-500">₹{seg.sell.toLocaleString("en-IN")}</td>
                <td className={`text-right px-4 py-2.5 font-mono font-semibold ${seg.net >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {seg.net >= 0 ? "+" : ""}₹{Math.abs(seg.net).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
