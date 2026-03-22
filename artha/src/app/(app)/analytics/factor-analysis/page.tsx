'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';
import { ApiError, apiGet } from '@/lib/api-client';
import type { AnalyticsResponse } from '@/lib/api-types';
import type { FactorExposure, FactorContext } from '@/lib/data/types';

const FACTOR_ROWS: { key: keyof FactorExposure; label: string; desc: string }[] = [
  { key: 'marketBeta', label: 'Market (β)',      desc: 'Sensitivity to overall market moves' },
  { key: 'smbLoading', label: 'Size (SMB)',       desc: 'Small-cap vs large-cap tilt' },
  { key: 'hmlLoading', label: 'Value (HML)',      desc: 'Value vs growth tilt' },
  { key: 'wmlLoading', label: 'Momentum (WML)',   desc: 'Trend-following exposure' },
  { key: 'alpha',      label: 'Alpha (α)',        desc: 'Unexplained daily excess return (%)' },
];

export default function FactorAnalysisPage() {
  const [symbol, setSymbol] = useState('');
  const [inputSymbol, setInputSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [factorExposure, setFactorExposure] = useState<FactorExposure | null>(null);
  const [factorContext, setFactorContext] = useState<FactorContext | null>(null);

  async function handleRun() {
    const sym = inputSymbol.trim().toUpperCase();
    if (!sym) return;
    setLoading(true);
    setError(null);
    setFactorExposure(null);
    setFactorContext(null);
    try {
      const data = await apiGet<AnalyticsResponse>(`/api/stocks/${sym}/analytics`);
      setSymbol(sym);
      setFactorExposure((data.factorExposure as FactorExposure | null | undefined) ?? null);
      setFactorContext((data.factorContext as FactorContext | null | undefined) ?? null);
      if (!data.factorExposure) {
        setError('No factor regression data available for this symbol (need ≥60 days of price + IIMA factor overlap).');
      }
    } catch (e) {
      setError(e instanceof ApiError ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  const chartData = FACTOR_ROWS
    .map(f => ({
      factor: f.label,
      desc: f.desc,
      exposure: factorExposure ? (factorExposure[f.key] as number | null | undefined) ?? null : null,
    }))
    .filter((d): d is { factor: string; desc: string; exposure: number } => d.exposure !== null);

  const snapshots = factorContext?.latestSnapshots ?? [];
  const drawdowns = factorContext?.drawdowns ?? [];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Factor Analysis
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Decompose a stock&apos;s returns using the Indian Fama–French Carhart 4-Factor Model (IIMA, survivorship-bias adjusted).
        </p>
      </div>

      {/* Input */}
      <div className="rounded-xl border p-5 space-y-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Enter NSE Symbol</h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputSymbol}
            onChange={e => setInputSymbol(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && handleRun()}
            placeholder="e.g. RELIANCE, TCS, HDFCBANK"
            className="flex-1 max-w-xs h-9 px-3 rounded-lg text-sm border bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          />
          <button
            onClick={handleRun}
            disabled={loading || !inputSymbol.trim()}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-50 transition-colors"
          >
            {loading ? 'Running…' : 'Run Regression'}
          </button>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      {/* Regression results */}
      {factorExposure && (
        <>
          {/* Bar Chart */}
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
              <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Factor Loadings — {symbol}
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: 'var(--surface-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                  R² = {factorExposure.rSquared != null ? (factorExposure.rSquared * 100).toFixed(1) + '%' : '—'}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: 'var(--surface-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                  n = {factorExposure.sampleSize ?? '—'} days
                </span>
                {factorContext?.releaseTag && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--surface-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                    IIMA {factorContext.releaseTag}
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              OLS regression of daily excess returns vs IIMA 4-factor model.
              {factorExposure.regressionStartDate && factorExposure.regressionEndDate && (
                <> Window: {factorExposure.regressionStartDate} → {factorExposure.regressionEndDate}.</>
              )}
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="factor" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} width={45} />
                  <Tooltip
                    contentStyle={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)', borderRadius: 8, fontSize: 12 }}
                    formatter={(v: unknown) => [Number(v).toFixed(4), 'Beta']}
                  />
                  <ReferenceLine y={0} stroke="var(--text-muted)" strokeDasharray="4 4" />
                  <Bar dataKey="exposure" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={entry.exposure >= 0 ? '#F59E0B' : '#EF4444'}
                        fillOpacity={0.85}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Factor table */}
          <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--surface-elevated)', borderBottom: '1px solid var(--border)' }}>
                  {['Factor', 'Description', 'Loading (β)'].map(h => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FACTOR_ROWS.map((f, i) => {
                  const val = factorExposure[f.key] as number | null | undefined;
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="px-4 py-2 font-medium" style={{ color: 'var(--text-primary)' }}>{f.label}</td>
                      <td className="px-4 py-2 text-xs" style={{ color: 'var(--text-muted)' }}>{f.desc}</td>
                      <td className={`px-4 py-2 font-mono font-bold ${val != null && val >= 0 ? 'text-amber-400' : 'text-red-400'}`}>
                        {val != null ? (val >= 0 ? '+' : '') + val.toFixed(4) : '—'}
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ background: 'var(--surface-elevated)' }}>
                  <td className="px-4 py-2 font-medium text-xs" style={{ color: 'var(--text-muted)' }}>Model R²</td>
                  <td className="px-4 py-2 text-xs" style={{ color: 'var(--text-muted)' }}>Explained variance</td>
                  <td className="px-4 py-2 font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
                    {factorExposure.rSquared != null ? (factorExposure.rSquared * 100).toFixed(1) + '%' : '—'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* IIMA Factor Regime */}
      {(snapshots.length > 0 || drawdowns.length > 0) && (
        <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="mb-4">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>IIMA Factor Regime</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {factorContext?.releaseTag ? `Delayed release ${factorContext.releaseTag}` : 'Delayed survivorship-bias-adjusted release'} · returns in % per period
            </p>
          </div>

          {snapshots.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Latest Factor Returns</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {snapshots.map(s => (
                  <div key={`${s.frequency}-${s.asOf}`} className="p-3 rounded-lg border" style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{s.frequency}</span>
                      <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{s.asOf}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {([
                        { l: 'Mkt-RF', v: s.marketPremium },
                        { l: 'SMB', v: s.smb },
                        { l: 'HML', v: s.hml },
                        { l: 'WML', v: s.wml },
                        { l: 'RF', v: s.rfRate },
                        { l: 'Mkt', v: s.marketReturn },
                      ] as { l: string; v: number | null | undefined }[]).map(m => (
                        <div key={m.l}>
                          <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{m.l}</div>
                          <div className={`text-xs font-mono font-semibold ${m.v != null && m.v >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {m.v != null ? (m.v >= 0 ? '+' : '') + m.v.toFixed(2) + '%' : '—'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {drawdowns.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Factor Historical Risk</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Factor', 'Name', 'Ann. Return', 'Ann. Vol', 'Worst DD', 'Recovery'].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {drawdowns.map(d => (
                      <tr key={d.factorCode} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td className="px-3 py-2 font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{d.factorCode}</td>
                        <td className="px-3 py-2 text-xs" style={{ color: 'var(--text-muted)' }}>{d.factorName}</td>
                        <td className={`px-3 py-2 font-mono text-xs ${d.annualizedReturn != null && d.annualizedReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {d.annualizedReturn != null ? (d.annualizedReturn >= 0 ? '+' : '') + d.annualizedReturn.toFixed(1) + '%' : '—'}
                        </td>
                        <td className="px-3 py-2 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                          {d.annualizedVolatility != null ? d.annualizedVolatility.toFixed(1) + '%' : '—'}
                        </td>
                        <td className="px-3 py-2 font-mono text-xs text-red-400">
                          {d.worstDrawdown != null ? d.worstDrawdown.toFixed(1) + '%' : '—'}
                        </td>
                        <td className="px-3 py-2 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                          {d.drawdownDurationYears != null ? d.drawdownDurationYears.toFixed(1) + 'y' : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Model explanation */}
      <div className="rounded-xl border p-5 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>About the Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {FACTOR_ROWS.map(f => (
            <div key={f.key} className="p-3 rounded-lg" style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
              <div className="font-medium mb-0.5" style={{ color: 'var(--text-primary)' }}>{f.label}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{f.desc}</div>
            </div>
          ))}
        </div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Factor data from IIMA delayed release (survivorship-bias adjusted). Regression uses 18-month (≈540 trading days) lookback window via OLS. Minimum 60 overlapping observations required.
        </p>
      </div>
    </div>
  );
}
