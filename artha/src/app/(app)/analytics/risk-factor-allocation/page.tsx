'use client';

import { useState } from 'react';
import { ContextualNav } from '@/components/layout/contextual-nav';
import { FACTOR_LINKS } from '@/lib/nav-links';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';

interface HoldingInput {
  symbol: string;
  weight: string;
}

interface HoldingResult {
  symbol: string;
  weight: number;
  alpha: number | null;
  marketBeta: number | null;
  smbLoading: number | null;
  hmlLoading: number | null;
  wmlLoading: number | null;
  rSquared: number | null;
  sampleSize: number | null;
  error?: string;
}

interface PortfolioResult {
  alpha: number;
  marketBeta: number;
  smbLoading: number;
  hmlLoading: number;
  wmlLoading: number;
  avgRSquared: number;
  coveredWeight: number;
  holdingCount: number;
}

const FACTOR_COLS: { key: keyof PortfolioResult; label: string }[] = [
  { key: 'marketBeta',  label: 'Market β' },
  { key: 'smbLoading', label: 'Size (SMB)' },
  { key: 'hmlLoading', label: 'Value (HML)' },
  { key: 'wmlLoading', label: 'Momentum (WML)' },
  { key: 'alpha',       label: 'Alpha (α)' },
];

const HOLDING_FACTOR_COLS: { key: keyof HoldingResult; label: string }[] = [
  { key: 'marketBeta',  label: 'β' },
  { key: 'smbLoading', label: 'SMB' },
  { key: 'hmlLoading', label: 'HML' },
  { key: 'wmlLoading', label: 'WML' },
  { key: 'alpha',       label: 'α' },
  { key: 'rSquared',    label: 'R²' },
];

export default function RiskFactorAllocationPage() {
  const [holdings, setHoldings] = useState<HoldingInput[]>([
    { symbol: '', weight: '' },
    { symbol: '', weight: '' },
    { symbol: '', weight: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioResult | null>(null);
  const [holdingResults, setHoldingResults] = useState<HoldingResult[]>([]);

  function addRow() {
    setHoldings(h => [...h, { symbol: '', weight: '' }]);
  }

  function removeRow(i: number) {
    setHoldings(h => h.filter((_, idx) => idx !== i));
  }

  function updateRow(i: number, field: 'symbol' | 'weight', value: string) {
    setHoldings(h => h.map((row, idx) => idx === i ? { ...row, [field]: field === 'symbol' ? value.toUpperCase() : value } : row));
  }

  async function handleRun() {
    const valid = holdings
      .filter(h => h.symbol.trim() && parseFloat(h.weight) > 0)
      .map(h => ({ symbol: h.symbol.trim().toUpperCase(), weight: parseFloat(h.weight) }));

    if (valid.length < 1) {
      setError('Add at least one holding with a symbol and weight > 0.');
      return;
    }

    setLoading(true);
    setError(null);
    setPortfolio(null);
    setHoldingResults([]);

    try {
      const res = await fetch('/api/analytics/factor-attribution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ holdings: valid }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({})) as { error?: string };
        setError(d.error ?? `HTTP ${res.status}`);
        return;
      }
      const data = await res.json() as { portfolio: PortfolioResult; holdings: HoldingResult[] };
      setPortfolio(data.portfolio);
      setHoldingResults(data.holdings);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  const chartData = portfolio
    ? FACTOR_COLS.map(f => ({
        factor: f.label,
        value: portfolio[f.key] as number,
      }))
    : [];

  return (
    <div className="space-y-6 pb-20">
      <ContextualNav links={FACTOR_LINKS} />

      <div>
        <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          Portfolio Factor Attribution
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Enter your holdings and weights to get portfolio-level Carhart 4-factor exposure via IIMA data.
        </p>
      </div>

      {/* Holdings input */}
      <div className="rounded-xl border p-5 space-y-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Holdings</h2>
        <div className="space-y-2">
          <div className="grid grid-cols-[1fr_100px_32px] gap-2 text-xs font-semibold uppercase tracking-wider px-1" style={{ color: 'var(--text-muted)' }}>
            <span>Symbol (NSE)</span>
            <span>Weight %</span>
            <span />
          </div>
          {holdings.map((h, i) => (
            <div key={i} className="grid grid-cols-[1fr_100px_32px] gap-2 items-center">
              <input
                type="text"
                value={h.symbol}
                onChange={e => updateRow(i, 'symbol', e.target.value)}
                placeholder="e.g. RELIANCE"
                className="h-9 px-3 rounded-lg text-sm border bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500"
                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
              <input
                type="number"
                value={h.weight}
                onChange={e => updateRow(i, 'weight', e.target.value)}
                placeholder="25"
                min={0}
                max={100}
                className="h-9 px-3 rounded-lg text-sm border bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500"
                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
              <button
                onClick={() => removeRow(i)}
                className="h-8 w-8 flex items-center justify-center rounded-lg text-xs hover:bg-red-500/10 transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={addRow}
            className="px-3 py-1.5 rounded-lg text-xs border hover:border-amber-500/50 transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            + Add Row
          </button>
          <button
            onClick={handleRun}
            disabled={loading}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-50 transition-colors"
          >
            {loading ? 'Running…' : 'Compute Attribution'}
          </button>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      {/* Portfolio summary */}
      {portfolio && (
        <>
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Portfolio Factor Profile
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: 'var(--surface-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                  Avg R² = {(portfolio.avgRSquared * 100).toFixed(1)}%
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--surface-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                  {portfolio.holdingCount} stocks · {(portfolio.coveredWeight * 100).toFixed(0)}% covered
                </span>
              </div>
            </div>

            {/* Summary chips */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              {FACTOR_COLS.map(f => {
                const val = portfolio[f.key] as number;
                return (
                  <div key={f.key} className="p-3 rounded-lg text-center" style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                    <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>{f.label}</div>
                    <div className={`text-lg font-mono font-bold ${val >= 0 ? 'text-amber-400' : 'text-red-400'}`}>
                      {(val >= 0 ? '+' : '') + val.toFixed(3)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chart */}
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="factor" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} width={42} />
                  <Tooltip
                    contentStyle={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)', borderRadius: 8, fontSize: 12 }}
                    formatter={(v: unknown) => [Number(v).toFixed(4), 'Loading']}
                  />
                  <ReferenceLine y={0} stroke="var(--text-muted)" strokeDasharray="4 4" />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={entry.value >= 0 ? '#F59E0B' : '#EF4444'} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Per-holding table */}
          <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Holdings Detail</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'var(--surface-elevated)', borderBottom: '1px solid var(--border)' }}>
                    <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Symbol</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Weight</th>
                    {HOLDING_FACTOR_COLS.map(c => (
                      <th key={c.key} className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{c.label}</th>
                    ))}
                    <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>n</th>
                  </tr>
                </thead>
                <tbody>
                  {holdingResults.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="px-4 py-2 font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{row.symbol}</td>
                      <td className="px-4 py-2 text-right font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                        {(row.weight * 100).toFixed(1)}%
                      </td>
                      {HOLDING_FACTOR_COLS.map(c => {
                        const val = row[c.key] as number | null;
                        const isR2 = c.key === 'rSquared';
                        return (
                          <td key={c.key} className={`px-4 py-2 text-right font-mono text-xs ${val != null && !isR2 && val >= 0 ? 'text-amber-400' : val != null && !isR2 ? 'text-red-400' : ''}`} style={isR2 ? { color: 'var(--text-muted)' } : {}}>
                            {val != null
                              ? isR2
                                ? (val * 100).toFixed(1) + '%'
                                : (val >= 0 ? '+' : '') + val.toFixed(3)
                              : row.error
                                ? <span className="text-red-400 text-[10px]">{row.error}</span>
                                : '—'}
                          </td>
                        );
                      })}
                      <td className="px-4 py-2 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                        {row.sampleSize ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
