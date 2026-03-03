'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Play, Save, Code2, Plus, ChevronRight, AlertCircle, Sparkles, TerminalSquare, Trash2, Wand2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FormulaCell } from './FormulaCell';
import { AnimatePresence, motion } from 'framer-motion';
import type { ScreenerFilters, RangeFilter } from '@/lib/data/types';
import {
    INDICATOR_CATEGORIES,
    INDICATORS,
    OPERATORS,
    dslExpr,
    buildDslCriterion,
    indicatorById,
    operatorById,
    type IndicatorDef,
    type OperatorDef,
} from '@/lib/screener/indicators';
import { parseDsl } from '@/lib/screener/dsl/parser';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Criterion {
    id: string;
    indicatorId: string;
    paramValues: Record<string, number | string>;
    operatorId: string;
    rhsValue: string;
    rhsValue2?: string;
    rhsIndicatorId?: string;
    rhsParamValues?: Record<string, number | string>;
    displayString: string;
    dslString: string;
    simpleKey?: keyof ScreenerFilters;
    supported: boolean;
    enabled: boolean;
}

// ─── Indicator→ScreenerFilters mapping ──────────────────────────────────────

const INDICATOR_TO_FILTER_KEY: Record<string, keyof ScreenerFilters> = {
    mcap: 'marketCapCr', pe: 'peTtm', pb: 'pb', ev_ebitda: 'evEbitda',
    div_yield: 'dividendYield', roce: 'roce', roe: 'roe',
    pat_margin: 'patMargin', op_margin: 'operatingMargin',
    rev_g1y: 'revenueGrowth1y', rev_g3y: 'revenueGrowth3y',
    pat_g1y: 'patGrowth1y', eps_g1y: 'epsGrowth1y',
    de: 'debtEquity', ic: 'interestCoverage',
    current_ratio: 'currentRatio', quality_score: 'qualityScore',
    rsi: 'rsi14', pct52wHigh: 'pctFrom52wHigh', pct52wLow: 'pctFrom52wLow',
};

const UNIVERSE_OPTIONS: Record<string, { filterKey: keyof ScreenerFilters; options: string[] }> = {
    uni_mcap_bucket: { filterKey: 'marketCapBucket', options: ['large', 'mid', 'small', 'micro'] },
    uni_sector:      { filterKey: 'sector',          options: [] },
    uni_instrument_type: { filterKey: 'assetClass',  options: ['EQUITY', 'ETF', 'REIT', 'INVIT'] },
};

// ─── Props ───────────────────────────────────────────────────────────────────

interface ConditionBuilderProps {
    filters: ScreenerFilters;
    onChange: (filters: ScreenerFilters) => void;
    onRun: () => void;
    rulesViewMode: 'list' | 'formula';
    screenName?: string;
}

// ─── Style helpers ────────────────────────────────────────────────────────────

const COL_HEADER = 'px-3 py-2 border-b border-border text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30 shrink-0 select-none';

const itemCls = (active: boolean) =>
    `group w-full text-left px-2.5 py-1.5 text-sm rounded-md transition-all duration-100 flex items-center justify-between gap-1.5 cursor-pointer ${
        active
            ? 'bg-amber-500/10 text-amber-500 font-medium'
            : 'text-foreground/80 hover:bg-accent hover:text-foreground'
    }`;

// Inline param spinner inside an indicator row
function ParamSpinner({ value, onChange, param, onClick }: {
    value: number | string;
    onChange: (v: number | string) => void;
    param: import('@/lib/screener/indicators').IndicatorParam;
    onClick?: (e: React.MouseEvent) => void;
}) {
    // Determine if we should render a numeric spinner or text input
    const isNumber = typeof value === 'number' || !isNaN(Number(value)) && String(value).trim() !== '';

    if (!isNumber && typeof value === 'string') {
        return (
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                onClick={onClick}
                className="w-16 h-6 px-1.5 text-xs text-center border-none bg-amber-500/10 text-amber-500 rounded focus:ring-1 focus:ring-amber-500 outline-none placeholder:text-amber-500/30 font-mono"
                placeholder={param.label}
            />
        );
    }

    // Original numeric spinner
    return (
        <input
            type="number"
            value={value}
            min={param.min}
            max={param.max}
            step={param.step ?? 1}
            onClick={onClick}
            onChange={e => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val)) onChange(val);
            }}
            className="w-12 h-6 px-0 text-xs text-center border-none bg-amber-500/10 text-amber-500 rounded appearance-none focus:ring-1 focus:ring-amber-500 outline-none [&::-webkit-inner-spin-button]:appearance-none font-mono"
        />
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ConditionBuilder({ filters, onChange, onRun, rulesViewMode, screenName }: ConditionBuilderProps) {

    // ── Visual builder dialog state ──────────────────────────────────────
    const [visualBuilderOpen, setVisualBuilderOpen] = useState(false);

    // ── Visual builder state ──────────────────────────────────────────────
    const [selectedCatId, setSelectedCatId]             = useState<string>(INDICATOR_CATEGORIES[0].id);
    const [selectedLhsId, setSelectedLhsId]             = useState<string | null>(null);
    const [lhsParams, setLhsParams]                     = useState<Record<string, number | string>>({});
    const [selectedOpId, setSelectedOpId]               = useState<string | null>(null);
    // RHS — either "number" mode or "indicator" mode
    const [rhsMode, setRhsMode]                         = useState<'number' | 'indicator'>('number');
    const [rhsNumber, setRhsNumber]                     = useState('');
    const [rhsNumber2, setRhsNumber2]                   = useState('');  // for "between"
    const [rhsIndId, setRhsIndId]                       = useState<string | null>(null);
    const [rhsIndParams, setRhsIndParams]               = useState<Record<string, number | string>>({});

    // Active criteria
    const [criteria, setCriteria]   = useState<Criterion[]>([]);
    const [showDsl, setShowDsl]     = useState(false);

    // ── Save ─────────────────────────────────────────────────────────────
    const [saveScreenName, setSaveScreenName] = useState('');
    const [isSaving, setIsSaving]             = useState(false);

    // ── Derived ───────────────────────────────────────────────────────────
    const lhsIndicators   = INDICATORS.filter(i => i.categoryId === selectedCatId);
    const lhsInd          = selectedLhsId ? INDICATORS.find(i => i.id === selectedLhsId) ?? null : null;
    const selectedOp      = selectedOpId  ? OPERATORS.find(o => o.id === selectedOpId)   ?? null : null;
    const FUND_CATS       = new Set(['fundamental','financial_health','growth','valuation','quality','universe']);
    const isLhsFund       = lhsInd ? FUND_CATS.has(lhsInd.categoryId) : false;
    const availableOps    = isLhsFund ? OPERATORS.filter(o => !o.technicalOnly) : OPERATORS;

    // RHS indicator column: only show when operator expects an indicator or value+indicator
    const vc              = selectedOp?.valueConfig;
    const opNeedsRhs      = vc && vc.type !== 'none';
    const opCanBeInd      = selectedOp?.rhsCanBeIndicator && lhsInd?.rhsType !== 'number';
    // For crossover operators default rhsMode to 'indicator'
    useEffect(() => {
        if (selectedOp && ['ca','cb','tocha','tochb','bon_up','bon_dn'].includes(selectedOp.id)) {
            setRhsMode('indicator');
        } else {
            setRhsMode('number');
        }
        setRhsNumber('');
        setRhsNumber2('');
        setRhsIndId(null);
        setRhsIndParams({});
    }, [selectedOpId]);

    // When LHS indicator changes → reset params to defaults, pick first op
    useEffect(() => {
        if (!lhsInd) return;
        const def: Record<string, number | string> = {};
        lhsInd.params.forEach(p => { def[p.name] = p.defaultValue; });
        setLhsParams(def);
        const firstOp = isLhsFund ? OPERATORS.find(o => !o.technicalOnly) : OPERATORS[0];
        if (firstOp) setSelectedOpId(firstOp.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLhsId]);

    // When category changes → auto-select first indicator
    useEffect(() => {
        const first = INDICATORS.find(i => i.categoryId === selectedCatId);
        setSelectedLhsId(first?.id ?? null);
    }, [selectedCatId]);

    // When RHS indicator changes → populate defaults
    useEffect(() => {
        if (!rhsIndId) return;
        const ind = INDICATORS.find(i => i.id === rhsIndId);
        if (!ind) return;
        const def: Record<string, number | string> = {};
        ind.params.forEach(p => { def[p.name] = p.defaultValue; });
        setRhsIndParams(def);
    }, [rhsIndId]);

    // ── DSL build helpers ─────────────────────────────────────────────────
    const buildLhsDsl = useCallback(() => {
        if (!lhsInd) return '';
        return dslExpr(lhsInd, lhsInd.params.map(p => lhsParams[p.name] ?? p.defaultValue));
    }, [lhsInd, lhsParams]);

    const buildRhsDsl = useCallback(() => {
        if (!selectedOp) return '';
        const vcl = selectedOp.valueConfig;
        if (vcl.type === 'none') return '';
        if (vcl.type === 'days') return rhsNumber;
        if (rhsMode === 'indicator' && rhsIndId) {
            const rInd = INDICATORS.find(i => i.id === rhsIndId);
            if (!rInd) return '';
            return dslExpr(rInd, rInd.params.map(p => rhsIndParams[p.name] ?? p.defaultValue));
        }
        return rhsNumber;
    }, [selectedOp, rhsMode, rhsNumber, rhsIndId, rhsIndParams]);

    // ── canAdd ────────────────────────────────────────────────────────────
    const canAdd = (): boolean => {
        if (!lhsInd || !selectedOp) return false;
        const vcl = selectedOp.valueConfig;
        if (vcl.type === 'none') return true;
        if (vcl.type === 'two_numbers') return rhsNumber.trim() !== '' && rhsNumber2.trim() !== '';
        if (rhsMode === 'indicator') return !!rhsIndId;
        return rhsNumber.trim() !== '';
    };

    // ── Add criterion ─────────────────────────────────────────────────────
    const handleAddCriterion = () => {
        if (!lhsInd || !selectedOp || !canAdd()) return;
        const lhsExpr = buildLhsDsl();
        const rhsExpr = buildRhsDsl();
        const vcl     = selectedOp.valueConfig;

        // Build human display string
        const lhsLabel = lhsInd.params.length > 0
            ? `${lhsInd.label}(${lhsInd.params.map(p => lhsParams[p.name] ?? p.defaultValue).join(',')})`
            : lhsInd.label;
        let rhsLabel = rhsExpr;
        if (rhsMode === 'indicator' && rhsIndId) {
            const rInd = INDICATORS.find(i => i.id === rhsIndId);
            if (rInd) rhsLabel = rInd.params.length > 0
                ? `${rInd.label}(${rInd.params.map(p => rhsIndParams[p.name] ?? p.defaultValue).join(',')})`
                : rInd.label;
        }
        const displayString = vcl.type === 'none'
            ? `${lhsLabel} ${selectedOp.verb}`
            : vcl.type === 'two_numbers'
                ? `${lhsLabel} ${selectedOp.verb} ${rhsNumber} – ${rhsNumber2}`
                : `${lhsLabel} ${selectedOp.verb} ${rhsLabel}`;

        const dslString = vcl.type === 'two_numbers'
            ? buildDslCriterion(lhsExpr, selectedOp, rhsNumber, Number(rhsNumber2))
            : buildDslCriterion(lhsExpr, selectedOp, rhsExpr);

        const newCrit: Criterion = {
            id: `crit-${Date.now()}`,
            indicatorId: lhsInd.id,
            paramValues: { ...lhsParams },
            operatorId: selectedOp.id,
            rhsValue: rhsMode === 'indicator' ? rhsExpr : rhsNumber,
            rhsValue2: vcl.type === 'two_numbers' ? rhsNumber2 : undefined,
            rhsIndicatorId: rhsMode === 'indicator' ? (rhsIndId ?? undefined) : undefined,
            rhsParamValues: rhsMode === 'indicator' ? { ...rhsIndParams } : undefined,
            displayString,
            dslString,
            simpleKey: INDICATOR_TO_FILTER_KEY[lhsInd.id],
            supported: lhsInd.supported,
            enabled: true,
        };

        const updated = [...criteria, newCrit];
        setCriteria(updated);
        rebuildFilters(updated);
        setRhsNumber('');
        setRhsNumber2('');
    };

    const handleRemove = (id: string) => {
        const updated = criteria.filter(c => c.id !== id);
        setCriteria(updated);
        rebuildFilters(updated);
    };

    const handleToggleCriterion = (id: string) => {
        const updated = criteria.map(c => (c.id === id ? { ...c, enabled: !c.enabled } : c));
        setCriteria(updated);
        rebuildFilters(updated);
    };

    const handleClearAll = () => { setCriteria([]); onChange({}); };

    const handleReorder = (fromIndex: number, toIndex: number) => {
        const updated = [...criteria];
        const [movedItem] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, movedItem);
        setCriteria(updated);
        rebuildFilters(updated);
    };

    const handleUpdateCriterion = (id: string, newDsl: string) => {
        const updated = criteria.map(c => {
            if (c.id === id) {
                return {
                    ...c,
                    dslString: newDsl,
                    displayString: newDsl, // Use DSL as display for now
                };
            }
            return c;
        });
        setCriteria(updated);
        rebuildFilters(updated);
    };

    // ── Rebuild ScreenerFilters ───────────────────────────────────────────
    const rebuildFilters = (crs: Criterion[]) => {
        // Filter out empty criteria (no dslString)
        const active = crs.filter(c => c.enabled && c.dslString);
        const nf: ScreenerFilters = {};
        if (filters.query) nf.query = filters.query;

        active.filter(c => c.simpleKey && ['gt','lt','gte','lte','between'].includes(c.operatorId))
            .forEach(c => {
                const existing = (nf[c.simpleKey!] as RangeFilter | undefined) || {};
                const v1 = Number(c.rhsValue), v2 = c.rhsValue2 ? Number(c.rhsValue2) : undefined;
                let m: RangeFilter = { ...existing };
                if (c.operatorId === 'gt' || c.operatorId === 'gte') m = { ...m, min: v1 };
                else if (c.operatorId === 'lt' || c.operatorId === 'lte') m = { ...m, max: v1 };
                else if (c.operatorId === 'between') m = { ...m, min: v1, max: v2 };
                // @ts-ignore
                nf[c.simpleKey!] = m;
            });

        active.filter(c => UNIVERSE_OPTIONS[c.indicatorId])
            .forEach(c => {
                const cfg = UNIVERSE_OPTIONS[c.indicatorId];
                const existing = (nf[cfg.filterKey] as string[] | undefined) || [];
                const val = c.rhsValue.trim();
                if (val && !existing.includes(val)) {
                    // @ts-ignore
                    nf[cfg.filterKey] = [...existing, val];
                }
            });

        const dslCrs = active.filter(c => !c.simpleKey && !UNIVERSE_OPTIONS[c.indicatorId] && c.dslString);
        if (dslCrs.length > 0) nf.formula = dslCrs.map(c => c.dslString);

        onChange(nf);
    };

    // ── Save screen ───────────────────────────────────────────────────────
    const handleSaveScreen = async () => {
        if (!saveScreenName.trim()) return;
        setIsSaving(true);
        try {
            const res = await fetch('/api/screener/screens', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: saveScreenName, filtersJson: filters }),
            });
            if (res.ok) { setSaveScreenName(''); window.location.reload(); }
            else { const d = await res.json(); alert(`Error: ${d.error}`); }
        } catch { alert('Failed to save screen'); }
        finally { setIsSaving(false); }
    };

    // ── DSL live preview string ───────────────────────────────────────────
    const livePreview = (() => {
        if (!lhsInd || !selectedOp) return null;
        const l = buildLhsDsl();
        const r = buildRhsDsl();
        if (!r && vc?.type !== 'none') return null;
        return vc?.type === 'two_numbers' && rhsNumber2
            ? buildDslCriterion(l, selectedOp, rhsNumber, Number(rhsNumber2))
            : buildDslCriterion(l, selectedOp, r);
    })();

    // ── Universe dropdown shortcut ────────────────────────────────────────
    const univCfg = lhsInd ? UNIVERSE_OPTIONS[lhsInd.id] : undefined;

    // ── Visual Builder Renderer ───────────────────────────────────────────
    const renderVisualBuilder = () => (
        <div className="flex min-h-[600px] h-[70vh]">
            {/* ── Col 1: Category ── */}
            <div className="w-48 shrink-0 border-r border-border flex flex-col">
                <div className="px-3 py-2 border-b border-border text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30">Category</div>
                <ScrollArea className="flex-1">
                    <div className="p-2 flex flex-col gap-0.5">
                        {INDICATOR_CATEGORIES.map(cat => (
                            <button key={cat.id} onClick={() => setSelectedCatId(cat.id)}
                                className={itemCls(selectedCatId === cat.id)}>
                                <span className="text-xs">{cat.label}</span>
                                {selectedCatId === cat.id && <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />}
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* ── Col 2: LHS Indicator ── */}
            <div className="w-48 shrink-0 border-r border-border flex flex-col">
                <div className="px-3 py-2 border-b border-border text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30">Indicator</div>
                <ScrollArea className="flex-1">
                    <div className="p-2 flex flex-col gap-0.5">
                        {lhsIndicators.map(ind => {
                            const isActive = selectedLhsId === ind.id;
                            return (
                                <button key={ind.id} onClick={() => setSelectedLhsId(ind.id)} title={ind.description}
                                    className={itemCls(isActive)}>
                                    <span className="text-xs truncate flex-1">{ind.label}</span>
                                    <div className="flex items-center gap-1 shrink-0">
                                        {!ind.supported && <span className="text-[9px] bg-muted text-muted-foreground rounded px-1 py-0.5">soon</span>}
                                        {isActive && ind.params.map(p => (
                                            <ParamSpinner key={p.name} param={p} value={lhsParams[p.name] ?? p.defaultValue}
                                                onChange={(val) => setLhsParams(prev => ({ ...prev, [p.name]: val }))}
                                                onClick={e => e.stopPropagation()} />
                                        ))}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>

            {/* ── Col 3: Operator ── */}
            <div className="w-48 shrink-0 border-r border-border flex flex-col">
                <div className="px-3 py-2 border-b border-border text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30">Condition</div>
                <ScrollArea className="flex-1">
                    <div className="p-2 flex flex-col gap-0.5">
                        {availableOps.map(op => (
                            <button key={op.id} onClick={() => setSelectedOpId(op.id)} className={itemCls(selectedOpId === op.id)}>
                                <span className="text-xs">{op.label}</span>
                                {selectedOpId === op.id && <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />}
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* ── Col 4: Value ── */}
            <div className="flex-1 min-w-[200px] flex flex-col">
                <div className="px-3 py-2 border-b border-border text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30">Value</div>
                {!selectedOp ? (
                    <div className="flex-1 flex items-center justify-center p-4">
                        <p className="text-xs text-muted-foreground text-center">← Select a condition</p>
                    </div>
                ) : vc?.type === 'none' ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-4 gap-3">
                        <p className="text-xs text-muted-foreground text-center">No value needed for<br /><span className="font-semibold text-foreground">{selectedOp.label}</span></p>
                        <Button size="sm" onClick={() => { handleAddCriterion(); setVisualBuilderOpen(false); }} disabled={!canAdd()}
                            className="bg-amber-500 hover:bg-amber-400 text-black font-semibold gap-1.5">
                            <Plus className="w-3.5 h-3.5" /> Add Rule
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col h-full">
                        <div className="p-3 space-y-2">
                            {vc!.type === 'two_numbers' ? (
                                <>
                                    <div><label className="text-[10px] font-semibold text-muted-foreground uppercase">Min</label>
                                        <Input type="number" value={rhsNumber} onChange={e => setRhsNumber(e.target.value)} placeholder="e.g. 30" className="h-8 text-sm mt-1 font-mono" /></div>
                                    <div><label className="text-[10px] font-semibold text-muted-foreground uppercase">Max</label>
                                        <Input type="number" value={rhsNumber2} onChange={e => setRhsNumber2(e.target.value)} placeholder="e.g. 70" className="h-8 text-sm mt-1 font-mono" /></div>
                                </>
                            ) : (
                                <div><label className="text-[10px] font-semibold text-muted-foreground uppercase">Value</label>
                                    <Input type="number" value={rhsNumber} onChange={e => setRhsNumber(e.target.value)} placeholder="e.g. 50" className="h-8 text-sm mt-1 font-mono" /></div>
                            )}
                        </div>
                        {opCanBeInd && (
                            <div className="flex-1 min-h-0 border-t border-border">
                                <ScrollArea className="h-full">
                                    <div className="p-2">
                                        <div className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Or Indicator</div>
                                        <div className="flex flex-col gap-0.5">
                                            {lhsIndicators.map(ind => {
                                                const isActive = rhsIndId === ind.id;
                                                return (
                                                    <button key={ind.id} onClick={() => setRhsIndId(ind.id)} className={itemCls(isActive)}>
                                                        <span className="text-xs truncate flex-1">{ind.label}</span>
                                                        {isActive && ind.params.map(p => (
                                                            <ParamSpinner key={p.name} param={p} value={rhsIndParams[p.name] ?? p.defaultValue}
                                                                onChange={(val) => setRhsIndParams(prev => ({ ...prev, [p.name]: val }))}
                                                                onClick={e => e.stopPropagation()} />
                                                        ))}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                        <div className="p-3 border-t border-border space-y-2 bg-muted/10">
                            {livePreview && (
                                <div className="rounded-md bg-muted/40 border border-border px-2.5 py-1.5 font-mono text-[10px] text-amber-500 truncate">
                                    {livePreview}
                                </div>
                            )}
                            <Button size="sm" onClick={() => { handleAddCriterion(); setVisualBuilderOpen(false); }} disabled={!canAdd()}
                                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold gap-1.5">
                                <Plus className="w-3.5 h-3.5" /> Add Rule
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // ─────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────
    return (
        <div className="flex flex-col rounded-lg border border-border overflow-hidden bg-card text-card-foreground relative">
            {/* Decorative connecting lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent"></div>
                <div className="absolute top-4 bottom-4 left-4 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent"></div>
                <div className="absolute top-4 bottom-4 right-4 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent"></div>
            </div>

            {/* Content Area */}
            <div className="p-4 relative z-10">
                {/* ── Formula Builder (Rules) ── */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-foreground"></h3>
                        <div className="flex items-center gap-2">
                            {/* Button moved above */}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {/* Descriptive text */}
                        {criteria.length > 0 && (
                            <p className="text-sm text-muted-foreground mb-4 font-medium">
                                Stock passes all of the below filters in cash segment:
                            </p>
                        )}
                        {criteria.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed border-border rounded-lg bg-muted/20">
                                <Code2 className="w-8 h-8 mb-3 text-muted-foreground/40" />
                                <p className="text-xs text-muted-foreground mb-4 text-center max-w-xs">Add using the formula builder or visual builder to screen stocks</p>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            const newCrit: Criterion = {
                                                id: `crit-${Date.now()}`,
                                                indicatorId: '',
                                                paramValues: {},
                                                operatorId: '',
                                                rhsValue: '',
                                                displayString: '',
                                                dslString: '',
                                                supported: true,
                                                enabled: true,
                                            };
                                            setCriteria([newCrit]);
                                        }}
                                        className="gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add New Rule
                                    </Button>
                                    <Dialog open={visualBuilderOpen} onOpenChange={setVisualBuilderOpen}>
                                        <DialogTrigger asChild>
                                            <Button size="sm" variant="outline" className="gap-1.5">
                                                <Wand2 className="w-3.5 h-3.5" /> Add via Visual Builder
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="w-[95vw] max-h-[95vh] p-0">
                                            <DialogHeader className="px-6 py-4 border-b">
                                                <DialogTitle>Visual Rule Builder</DialogTitle>
                                            </DialogHeader>
                                            {/* Visual Builder Content */}
                                            {renderVisualBuilder()}
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                    ) : rulesViewMode === 'formula' ? (
                        <div className="flex flex-col gap-3">
                            {/* Formula Rows */}
                            <div className="flex flex-col gap-1.5">
                                {criteria.map((crit, i) => (
                                    <FormulaCell
                                        key={crit.id}
                                        criterion={crit}
                                        index={i}
                                        onToggle={handleToggleCriterion}
                                        onRemove={handleRemove}
                                        onReorder={handleReorder}
                                        onUpdate={handleUpdateCriterion}
                                    />
                                ))}
                            </div>
                            
                            {/* DSL Output Box */}
                            <div className="border border-border rounded-lg overflow-hidden flex flex-col bg-card shadow-sm">
                                <div className={`${COL_HEADER} bg-muted/20 border-b border-border`}>
                                    Formula Screen
                                </div>
                                <div className="p-3 space-y-2">
                                    <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider px-1 mb-1">DSL Formula</div>
                                    {criteria.filter(c => c.enabled).map((crit, i) => (
                                        <div key={crit.id} className="group relative transition-all duration-300 ease-out hover:-translate-y-[1px]">
                                            <div className="rounded-md bg-muted/40 border border-border px-2.5 py-2 font-mono text-[11px] text-amber-500 break-all leading-relaxed transition-colors group-hover:border-amber-500/30 group-hover:bg-amber-500/5">
                                                {crit.dslString}
                                            </div>
                                            <button onClick={() => handleRemove(crit.id)}
                                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-200 p-0.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 active:scale-90">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    {criteria.filter(c => !c.enabled).length > 0 && (
                                        <>
                                            <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider px-1 mt-3 mb-1 opacity-60">Disabled</div>
                                            {criteria.filter(c => !c.enabled).map((crit) => (
                                                <div key={crit.id} className="group relative opacity-50 transition-all duration-300 hover:opacity-80">
                                                    <div className="rounded-md bg-muted/40 border border-border px-2.5 py-2 font-mono text-[11px] text-amber-500 break-all leading-relaxed line-through transition-colors group-hover:border-border/80">
                                                        {crit.dslString}
                                                    </div>
                                                    <button onClick={() => handleRemove(crit.id)}
                                                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-200 p-0.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 active:scale-90">
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
                            {criteria.map((crit, i) => (
                                <FormulaCell
                                    key={crit.id}
                                    criterion={crit}
                                    index={i}
                                    onToggle={handleToggleCriterion}
                                    onRemove={handleRemove}
                                    onReorder={handleReorder}
                                    onUpdate={handleUpdateCriterion}
                                />
                            ))}
                        </div>
                    )}
                        {criteria.length > 0 && (
                            <div className="mt-3 flex items-center gap-2">
                                <Dialog open={visualBuilderOpen} onOpenChange={setVisualBuilderOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="outline" className="gap-1.5">
                                            <Wand2 className="w-3.5 h-3.5" /> Add via Visual Builder
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[95vw] max-h-[95vh] p-0">
                                        <DialogHeader className="px-6 py-4 border-b">
                                            <DialogTitle>Visual Rule Builder</DialogTitle>
                                        </DialogHeader>
                                        {renderVisualBuilder()}
                                    </DialogContent>
                                </Dialog>
                                <Button size="sm" onClick={() => {
                                    const newCrit: Criterion = {
                                        id: `crit-${Date.now()}`,
                                        indicatorId: '',
                                        paramValues: {},
                                        operatorId: '',
                                        rhsValue: '',
                                        displayString: '',
                                        dslString: '',
                                        supported: true,
                                        enabled: true,
                                    };
                                    setCriteria([...criteria, newCrit]);
                                }} className="gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold">
                                    <Plus className="w-3.5 h-3.5" /> Add New Rule
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Action bar (bottom, always visible) ── */}
            <div className="flex items-center gap-2 px-3 py-2 border-t border-border bg-muted/10 flex-wrap">
                <Button size="sm" onClick={onRun}
                    className="gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold shrink-0">
                    <Play className="w-3.5 h-3.5" /> Run Screen
                </Button>
                <div className="flex items-center gap-2 ml-auto">
                    <Input value={saveScreenName} onChange={e => setSaveScreenName(e.target.value)}
                        placeholder="Screen name…" className="h-8 w-36 text-xs" />
                    <Button variant="outline" size="sm" onClick={handleSaveScreen}
                        disabled={isSaving || !saveScreenName.trim()} className="shrink-0 gap-1">
                        <Save className="w-3.5 h-3.5" />{isSaving ? '…' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
