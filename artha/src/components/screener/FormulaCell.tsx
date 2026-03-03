/**
 * Formula cell — tokenized pill row.
 * Each rule is represented as a row of interactive chips:
 *   [LHS indicator chip] [Operator chip] [RHS value/indicator chip]
 *
 * Clicking any chip opens a contextual dropdown for that slot.
 * Empty cells auto-open the indicator dropdown immediately.
 */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Copy, Pause, Play, Trash2 } from 'lucide-react';
import { FormulaAutocomplete, type DropdownMode } from './FormulaAutocomplete';
import { INDICATORS, OPERATORS } from '@/lib/screener/indicators';
import type { AutocompleteItem } from './formula-utils';
import type { Criterion } from './ConditionBuilder';

interface FormulaCellProps {
    criterion: Criterion;
    index: number;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
    onUpdate?: (id: string, newDsl: string) => void;
    onReorder?: (fromIndex: number, toIndex: number) => void;
}

// ─── token state ────────────────────────────────────────────────────────────

interface TokenState {
    lhsId: string | null;          // indicator id
    lhsParams: (number | string)[];           // e.g. [14] for rsi(14)
    opId: string | null;           // operator id
    rhsType: 'number' | 'indicator';
    rhsValue: string;              // number string or indicator id
    rhsParams: (number | string)[];
}

function buildDslFromTokens(t: TokenState): string {
    if (!t.lhsId || !t.opId) return '';
    const lhsInd = INDICATORS.find(i => i.id === t.lhsId);
    if (!lhsInd) return '';

    let lhs = lhsInd.dslName;
    if (lhsInd.params.length > 0) {
        const pv = t.lhsParams.length ? t.lhsParams : lhsInd.params.map(p => p.defaultValue);
        lhs = `${lhsInd.dslName}(${pv.join(',')})`;
    }

    const op = OPERATORS.find(o => o.id === t.opId);
    if (!op) return lhs;

    if (op.valueConfig.type === 'none') return `${lhs} ${op.dslOp}`;

    let rhs = t.rhsValue;
    if (t.rhsType === 'indicator' && t.rhsValue) {
        const rhsInd = INDICATORS.find(i => i.id === t.rhsValue);
        if (rhsInd) {
            rhs = rhsInd.dslName;
            if (rhsInd.params.length > 0) {
                const pv = t.rhsParams.length ? t.rhsParams : rhsInd.params.map(p => p.defaultValue);
                rhs = `${rhsInd.dslName}(${pv.join(',')})`;
            }
        }
    }
    if (!rhs) return `${lhs} ${op.dslOp}`;
    return `${lhs} ${op.dslOp} ${rhs}`;
}

function parseTokensFromCriterion(c: Criterion): TokenState {
    return {
        lhsId: c.indicatorId || null,
        lhsParams: c.paramValues ? Object.values(c.paramValues) : [],
        opId: c.operatorId || null,
        rhsType: c.rhsIndicatorId ? 'indicator' : 'number',
        rhsValue: c.rhsIndicatorId || c.rhsValue || '',
        rhsParams: c.rhsParamValues ? Object.values(c.rhsParamValues) : [],
    };
}

// ─── pill chip ───────────────────────────────────────────────────────────────

function Chip({
    label,
    placeholder,
    active,
    query,
    onQueryChange,
    onClick,
    onKeyDown,
    compact = false,
}: {
    label?: string;
    placeholder: string;
    active?: boolean;
    query?: string;
    onQueryChange?: (q: string) => void;
    onClick: (e: React.MouseEvent) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    compact?: boolean;
}) {
    const isEmpty = !label && !active;
    
    return (
        <div className="relative inline-flex">
            <button
                onMouseDown={e => { e.stopPropagation(); onClick(e); }}
                className={`inline-flex items-center gap-1 rounded cursor-pointer ${compact ? 'px-1 py-0.5 text-[11px]' : 'px-1.5 py-0.5 text-[13px]'} font-medium transition-all duration-200 active:scale-[0.97] select-none ${compact ? 'min-h-[20px]' : 'min-h-[24px]'}
                    ${isEmpty
                        ? 'border border-dashed border-border text-muted-foreground/50 hover:border-amber-500/50 hover:text-amber-500/70'
                        : active
                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/40 ring-1 ring-amber-500/30'
                            : 'text-foreground hover:bg-muted/50'
                    }`}
            >
                {active && onQueryChange !== undefined ? (
                    <input 
                        autoFocus
                        value={query ?? ''}
                        onChange={e => onQueryChange(e.target.value)}
                        onKeyDown={onKeyDown}
                        className="bg-transparent outline-none min-w-[80px] w-full text-amber-500 placeholder:text-amber-500/50 font-mono"
                        placeholder={placeholder}
                        onMouseDown={e => e.stopPropagation()} 
                    />
                ) : isEmpty ? (
                    <span className="italic">{placeholder}</span>
                ) : (
                    <span className={active ? '' : 'font-bold'}>{label}</span>
                )}
            </button>
        </div>
    );
}

// ─── main component ───────────────────────────────────────────────────────────

type ActiveSlot = 
    | 'lhs' 
    | 'op' 
    | 'rhs' 
    | 'rhs-value' 
    | `lhs-param-${number}` 
    | `rhs-param-${number}` 
    | null;

export function FormulaCell({ criterion, index, onToggle, onRemove, onUpdate, onReorder }: FormulaCellProps) {
    const [tokens, setTokens] = useState<TokenState>(() => parseTokensFromCriterion(criterion));

    const [activeSlot, setActiveSlot] = useState<ActiveSlot>(null);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
    const [searchQuery, setSearchQuery] = useState('');

    const [isDragging, setIsDragging] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const cellRef = useRef<HTMLDivElement>(null);

    // re-sync if criterion changes externally
    useEffect(() => {
        setTokens(parseTokensFromCriterion(criterion));
    }, [criterion.indicatorId, criterion.operatorId, criterion.rhsValue, criterion.rhsIndicatorId]);

    // auto-open LHS dropdown for empty cells
    useEffect(() => {
        if (!criterion.dslString && !criterion.indicatorId) {
            const el = cellRef.current?.querySelector('[data-slot="lhs"] button');
            if (el) {
                // Use requestAnimationFrame to ensure DOM is fully laid out
                requestAnimationFrame(() => {
                    setTimeout(() => openSlot('lhs', el as HTMLElement), 50);
                });
            }
        }
    }, []);

    function openSlot(slot: ActiveSlot, el: HTMLElement) {
        // Force a reflow to get accurate measurements
        requestAnimationFrame(() => {
            const r = el.getBoundingClientRect();
            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;
            setDropdownPos({ top: r.bottom + scrollY + 6, left: r.left + scrollX });
            setActiveSlot(slot);
            setSearchQuery('');
        });
    }

    function closeSlot() { 
        setActiveSlot(null); 
        setSearchQuery('');
    }

    function commit(next: TokenState) {
        setTokens(next);
        const dsl = buildDslFromTokens(next);
        if (dsl && onUpdate) onUpdate(criterion.id, dsl);
    }

    // ── Universal slot handler ──
    function handleSelect(item: AutocompleteItem) {
        if (!activeSlot) return;

        const val = item.type === 'number' ? Number(item.label) : item.id;

        if (activeSlot === 'lhs') {
            const ind = INDICATORS.find(i => i.id === item.id);
            const params = ind?.params.map(p => p.defaultValue) ?? [];
            commit({ ...tokens, lhsId: item.id, lhsParams: params });
            const el = cellRef.current?.querySelector('[data-slot="op"] button');
            if (el) setTimeout(() => openSlot('op', el as HTMLElement), 50);
            else closeSlot();
        } 
        else if (activeSlot === 'op') {
            commit({ ...tokens, opId: item.id });
            const op = OPERATORS.find(o => o.id === item.id);
            if (!op || op.valueConfig.type === 'none') { closeSlot(); return; }
            const el = cellRef.current?.querySelector('[data-slot="rhs"] button');
            if (el) setTimeout(() => openSlot(op.rhsCanBeIndicator ? 'rhs' : 'rhs-value', el as HTMLElement), 50);
            else closeSlot();
        } 
        else if (activeSlot === 'rhs') {
            const ind = INDICATORS.find(i => i.id === item.id);
            const params = ind?.params.map(p => p.defaultValue) ?? [];
            commit({ ...tokens, rhsType: 'indicator', rhsValue: item.id, rhsParams: params });
            closeSlot();
        } 
        else if (activeSlot === 'rhs-value') {
            commit({ ...tokens, rhsValue: String(val) });
            closeSlot();
        }
        else if (activeSlot.startsWith('lhs-param-')) {
            const idx = parseInt(activeSlot.split('-')[2]);
            const newParams = [...tokens.lhsParams];
            newParams[idx] = val;
            commit({ ...tokens, lhsParams: newParams });
            closeSlot();
        } 
        else if (activeSlot.startsWith('rhs-param-')) {
            const idx = parseInt(activeSlot.split('-')[2]);
            const newParams = [...tokens.rhsParams];
            newParams[idx] = val;
            commit({ ...tokens, rhsParams: newParams });
            closeSlot();
        }
    }

    const dropdownMode: DropdownMode =
        activeSlot === 'op' ? 'operator' :
        activeSlot === 'rhs' ? 'rhs-indicator' : 'indicator';

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeSlot();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter') {
            e.preventDefault();
            document.dispatchEvent(new CustomEvent('formula-autocomplete-keydown', { detail: { key: e.key } }));
        }
    };

    // ── drag ──
    const handleDragStart = (e: React.DragEvent) => {
        if (activeSlot) return;
        setIsDragging(true);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index.toString());
    };
    const handleDragEnd = () => { setIsDragging(false); setIsDragOver(false); };
    const handleDragOver = (e: React.DragEvent) => {
        if (activeSlot) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setIsDragOver(true);
    };
    const handleDragLeave = () => setIsDragOver(false);
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const from = parseInt(e.dataTransfer.getData('text/plain'));
        if (!isNaN(from) && from !== index && onReorder) onReorder(from, index);
    };

    // ── Interactive Expr Renderer ──
    const InteractiveExpr = ({ prefix, indId, params }: { prefix: 'lhs' | 'rhs', indId: string | null, params: (string | number)[] }) => {
        const ind = indId ? INDICATORS.find(i => i.id === indId) : null;
        
        if (!ind) {
            return (
                <div data-slot={prefix}>
                    <Chip
                        placeholder="Select indicator"
                        active={activeSlot === prefix}
                        query={activeSlot === prefix ? searchQuery : undefined}
                        onQueryChange={setSearchQuery}
                        onKeyDown={handleKeyDown}
                        onClick={e => openSlot(prefix, e.currentTarget as HTMLElement)}
                    />
                </div>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 group/chip">
                {/* Optional Timeframe */}
                <span 
                    className="text-muted-foreground/50 hover:bg-muted/50 cursor-pointer px-1 rounded text-[11px] font-normal italic transition-colors uppercase tracking-wide"
                >
                    Daily
                </span>

                <div data-slot={prefix}>
                    <Chip
                        label={ind.label}
                        placeholder={ind.label}
                        active={activeSlot === prefix}
                        query={activeSlot === prefix ? searchQuery : undefined}
                        onQueryChange={setSearchQuery}
                        onKeyDown={handleKeyDown}
                        onClick={e => openSlot(prefix, e.currentTarget as HTMLElement)}
                    />
                </div>

                {ind.params.length > 0 && (
                    <>
                        <span className="text-muted-foreground/60 font-mono text-sm">(</span>
                        {ind.params.map((p, i) => {
                            const val = params[i] ?? p.defaultValue;
                            const slotName = `${prefix}-param-${i}` as ActiveSlot;
                            const isParamActive = activeSlot === slotName;
                            
                            let displayVal = String(val);
                            if (typeof val === 'string' && INDICATORS.some(ind => ind.id === val)) {
                                displayVal = INDICATORS.find(ind => ind.id === val)?.label || val;
                            }

                            return (
                                <React.Fragment key={i}>
                                    {i > 0 && <span className="text-muted-foreground/60 font-mono">,</span>}
                                    <Chip
                                        label={displayVal}
                                        placeholder={p.name}
                                        active={isParamActive}
                                        query={isParamActive ? searchQuery : undefined}
                                        onQueryChange={setSearchQuery}
                                        onKeyDown={handleKeyDown}
                                        onClick={(e) => openSlot(slotName, e.currentTarget as HTMLElement)}
                                        compact={true}
                                    />
                                </React.Fragment>
                            );
                        })}
                        <span className="text-muted-foreground/60 font-mono text-sm">)</span>
                    </>
                )}
            </span>
        );
    };

    const opDef = tokens.opId ? OPERATORS.find(o => o.id === tokens.opId) : null;

    return (
        <div
            ref={cellRef}
            draggable={!activeSlot && !!criterion.dslString}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`group flex items-center gap-2 px-1 py-0.5 transition-all duration-300 ease-out ${
                !criterion.enabled ? 'opacity-50' : ''
            } ${isDragging ? 'opacity-40 scale-[0.98]' : ''} ${
                isDragOver
                    ? 'bg-amber-500/5 scale-[1.01]'
                    : ''
            }`}
        >
            {/* enable toggle */}
            <input
                type="checkbox"
                checked={criterion.enabled}
                onChange={() => onToggle(criterion.id)}
                className="w-3 h-3 accent-gray-600 cursor-pointer shrink-0"
            />

            {/* row index */}
            <span className="text-[10px] text-muted-foreground font-mono shrink-0 w-4 select-none">
                {index + 1}.
            </span>

            {/* ── pill row ── */}
            <div className="flex-1 flex items-center gap-1 flex-wrap min-w-0">
                
                <InteractiveExpr prefix="lhs" indId={tokens.lhsId} params={tokens.lhsParams} />

                {/* Operator chip */}
                {tokens.lhsId && (
                    <div data-slot="op" className="group/chip">
                        <Chip
                            label={opDef?.label}
                            placeholder="operator"
                            active={activeSlot === 'op'}
                            query={activeSlot === 'op' ? searchQuery : undefined}
                            onQueryChange={setSearchQuery}
                            onKeyDown={handleKeyDown}
                            onClick={e => openSlot('op', e.currentTarget as HTMLElement)}
                        />
                    </div>
                )}

                {/* RHS */}
                {tokens.lhsId && tokens.opId && opDef && opDef.valueConfig.type !== 'none' && (
                    <div data-slot="rhs">
                        {activeSlot === 'rhs-value' || (!opDef.rhsCanBeIndicator && tokens.rhsType === 'number') ? (
                            <Chip
                                label={tokens.rhsValue}
                                placeholder="value"
                                active={activeSlot === 'rhs-value'}
                                query={activeSlot === 'rhs-value' ? searchQuery : undefined}
                                onQueryChange={setSearchQuery}
                                onKeyDown={handleKeyDown}
                                onClick={e => openSlot('rhs-value', e.currentTarget as HTMLElement)}
                            />
                        ) : (
                            <InteractiveExpr prefix="rhs" indId={tokens.rhsType === 'indicator' ? tokens.rhsValue : null} params={tokens.rhsParams} />
                        )}
                    </div>
                )}

                {/* unsupported warning */}
                {!criterion.supported && criterion.dslString && (
                    <span className="text-[10px] text-amber-500/70">⚠ unsupported</span>
                )}
            </div>

            {/* Actions */}
            <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onMouseDown={e => { e.stopPropagation(); onToggle(criterion.id); }}
                    className="p-1 rounded text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10"
                    title={criterion.enabled ? 'Disable' : 'Enable'}
                >
                    {criterion.enabled ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                    onMouseDown={e => { e.stopPropagation(); /* TODO Duplicate */ }}
                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                    title="Duplicate"
                >
                    <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                    onMouseDown={e => { e.stopPropagation(); onRemove(criterion.id); }}
                    className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    title="Delete"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* dropdown */}
            {activeSlot && (
                <FormulaAutocomplete
                    mode={dropdownMode}
                    query={searchQuery}
                    onSelect={handleSelect}
                    onClose={closeSlot}
                    position={dropdownPos}
                />
            )}
        </div>
    );
}
