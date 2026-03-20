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
import { createPortal } from 'react-dom';
import { X, Copy, Pause, Play, Trash2, ChevronDown } from 'lucide-react';
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
    timeframe: '1min' | '2min' | '3min' | '5min' | '10min' | '15min' | '30min' | '1hour' | '75min' | '2hour' | '125min' | '3hour' | '4hour' | 'Daily' | '1 day ago' | '2 day ago' | '3 day ago' | '4 day ago' | 'Weekly' | '1 week ago' | '2 week ago' | '3 week ago' | '4 week ago' | 'Monthly' | '1 month ago' | '2 month ago' | '3 month ago' | '4 month ago' | 'Quarterly' | '1 quarter ago' | '2 quarter ago' | '3 quarter ago' | '4 quarter ago' | 'Yearly' | '1 year ago' | '2 year ago' | '3 year ago' | '4 year ago';
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
        timeframe: 'Daily',
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
    isOperator = false,
}: {
    label?: string;
    placeholder: string;
    active?: boolean;
    query?: string;
    onQueryChange?: (q: string) => void;
    onClick: (e: React.MouseEvent) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    compact?: boolean;
    isOperator?: boolean;
}) {
    const isEmpty = !label && !active;
    
    return (
        <div className="relative inline-flex">
            <button
                onMouseDown={e => { e.stopPropagation(); onClick(e); }}
                className={`inline-flex items-center gap-1 rounded cursor-pointer ${compact ? 'px-0 py-0.5 text-[13px]' : 'px-0 py-0.5 text-[15px]'} font-medium transition-all duration-200 active:scale-[0.97] select-none ${compact ? 'min-h-[20px]' : 'min-h-[24px]'} leading-none
                    ${isEmpty
                        ? 'border border-dashed border-border text-primary/50 hover:border-primary/50 hover:text-primary/70'
                        : active
                            ? 'bg-primary/10 text-primary border border-primary/40 ring-1 ring-primary/30'
                            : isOperator
                                ? 'text-primary hover:bg-muted/50'
                                : 'text-foreground hover:bg-muted/50'
                    }`}
            >
                {active && onQueryChange !== undefined ? (
                    <input 
                        autoFocus
                        value={query ?? ''}
                        onChange={e => onQueryChange(e.target.value)}
                        onKeyDown={onKeyDown}
                        className="bg-transparent outline-none min-w-[0px] w-full text-primary placeholder:text-primary/50 font-mono text-[13px] leading-none"
                        placeholder={placeholder}
                        onMouseDown={e => e.stopPropagation()} 
                    />
                ) : isEmpty ? (
                    <span className="italic text-primary/70">{placeholder}</span>
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
        let attempts = 0;
        const maxAttempts = 10;

        const calculate = () => {
            const r = el.getBoundingClientRect();
            
            // If the element is reporting (0,0) or a very suspicious top position for a mid-page element, 
            // and we haven't exhausted attempts, wait for next frame.
            // Note: 20 is a safe threshold for "too high" if we expect it below the header.
            if (r.top < 20 && r.left === 0 && attempts < maxAttempts) {
                attempts++;
                requestAnimationFrame(calculate);
                return;
            }

            setDropdownPos({ 
                top: r.bottom + window.scrollY + 6, 
                left: r.left + window.scrollX 
            });
            setActiveSlot(slot);
            setSearchQuery('');
        };

        requestAnimationFrame(calculate);
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

    const [tfOpen, setTfOpen] = useState(false);
    const tfRef = useRef<HTMLDivElement>(null);
    const [tfDropdownPos, setTfDropdownPos] = useState({ top: 0, left: 0 });
    
    const TIMEFRAME_CATEGORIES = {
        'Intraday': [
            '1min', '2min', '3min', '5min', '10min', '15min', '30min', 
            '1hour', '75min', '2hour', '125min', '3hour', '4hour'
        ],
        'Daily': ['Daily', '1 day ago', '2 day ago', '3 day ago', '4 day ago'],
        'Weekly': ['Weekly', '1 week ago', '2 week ago', '3 week ago', '4 week ago'],
        'Monthly': ['Monthly', '1 month ago', '2 month ago', '3 month ago', '4 month ago'],
        'Quarterly': ['Quarterly', '1 quarter ago', '2 quarter ago', '3 quarter ago', '4 quarter ago'],
        'Yearly': ['Yearly', '1 year ago', '2 year ago', '3 year ago', '4 year ago']
    } as const;
    
    // Calculate dropdown width based on longest string
    const allTimeframes = [
        ...TIMEFRAME_CATEGORIES.Intraday,
        ...TIMEFRAME_CATEGORIES.Daily,
        ...TIMEFRAME_CATEGORIES.Weekly,
        ...TIMEFRAME_CATEGORIES.Monthly,
        ...TIMEFRAME_CATEGORIES.Quarterly,
        ...TIMEFRAME_CATEGORIES.Yearly,
        ...Object.keys(TIMEFRAME_CATEGORIES)
    ];
    const longestString = allTimeframes.reduce((longest, current) => 
        current.length > longest.length ? current : longest, ''
    );
    const dropdownWidth = Math.max(longestString.length * 8 + 40, 100); // 8px per character + padding

    // close timeframe dropdown on outside click
    useEffect(() => {
        if (!tfOpen) return;
        const handler = (e: MouseEvent) => {
            if (tfRef.current && !tfRef.current.contains(e.target as Node)) setTfOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [tfOpen]);

    // ── Interactive Expr Renderer ──
    const InteractiveExpr = ({ prefix, indId, params }: { prefix: 'lhs' | 'rhs', indId: string | null, params: (string | number)[] }) => {
        const ind = indId ? INDICATORS.find(i => i.id === indId) : null;
        
        if (!ind) {
            return (
                <div data-slot={prefix} id={`${prefix}-${criterion.id}`}>
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
            <span className="inline-flex items-center gap-0 group/chip">
                {/* Timeframe selector — only on LHS */}
                {prefix === 'lhs' && (
                    <div ref={tfRef} className="relative">
                        <button
                            onMouseDown={e => {
                                e.stopPropagation();
                                const rect = e.currentTarget.getBoundingClientRect();
                                const dropdownHeight = 300;
                                const dropdownWidth = Math.max(longestString.length * 8 + 40, 100);
                                const viewportHeight = window.innerHeight;
                                const viewportWidth = window.innerWidth;
                                
                                let top = rect.bottom + 6;
                                let left = rect.left;
                                
                                // Check if dropdown would go below viewport
                                if (top + dropdownHeight > viewportHeight) {
                                    // Position above the button instead
                                    top = rect.top - dropdownHeight - 6;
                                }
                                
                                // Check if dropdown would go beyond right edge
                                if (left + dropdownWidth > viewportWidth) {
                                    // Align to right edge
                                    left = viewportWidth - dropdownWidth - 10;
                                }
                                
                                setTfDropdownPos({ top, left });
                                setTfOpen(v => !v);
                            }}
                            className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60 hover:bg-muted/60 hover:text-foreground transition-colors leading-none"
                        >
                            {tokens.timeframe}
                        </button>
                        {tfOpen && typeof document !== 'undefined' && createPortal(
                            <div className="absolute z-[9999] bg-popover border border-border rounded-md shadow-lg"
                                style={{ 
                                    top: `${tfDropdownPos.top + window.scrollY}px`, 
                                    left: `${tfDropdownPos.left + window.scrollX}px`,
                                    width: `${dropdownWidth}px`
                                }}>
                                <div className="overflow-hidden max-h-[300px] overflow-y-auto">
                                    {Object.entries(TIMEFRAME_CATEGORIES).map(([category, options]) => (
                                        <div key={category} className="border-b border-border last:border-b-0">
                                            <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80 bg-muted/30">
                                                {category}
                                            </div>
                                            {options.map(tf => (
                                                <button key={tf}
                                                    onMouseDown={e => { e.stopPropagation(); setTokens(prev => ({ ...prev, timeframe: tf })); setTfOpen(false); }}
                                                    className={`w-full text-left px-3 py-1.5 text-[13px] transition-colors ${
                                                        tokens.timeframe === tf
                                                            ? 'bg-primary/10 text-primary font-medium'
                                                            : 'text-foreground hover:bg-accent'
                                                    }`}
                                                >
                                                    {tf}
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>,
                            document.body
                        )}
                    </div>
                )}

                <div data-slot={prefix} id={`${prefix}-${criterion.id}`}>
                    <Chip
                        label={ind.label}
                        placeholder={ind.label}
                        active={activeSlot === prefix}
                        query={activeSlot === prefix ? searchQuery : undefined}
                        onQueryChange={setSearchQuery}
                        onKeyDown={handleKeyDown}
                        onClick={e => openSlot(prefix, e.currentTarget as HTMLElement)}
                        compact={true}
                    />
                </div>

                {ind.params.length > 0 && (
                    <>
                        <span className="text-foreground font-mono text-[13px]">(</span>
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
                                    {i > 0 && <span className="text-foreground font-mono text-[13px]">,</span>}
                                    <div id={`${slotName}-${criterion.id}`}>
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
                                    </div>
                                </React.Fragment>
                            );
                        })}
                        <span className="text-foreground font-mono text-[13px]">)</span>
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
            className={`group flex items-center gap-0 px-1 py-0.5 transition-all duration-300 ease-out ${
                !criterion.enabled ? 'opacity-50' : ''
            } ${isDragging ? 'opacity-40 scale-[0.98]' : ''} ${
                isDragOver
                    ? 'bg-amber-500/5 scale-[1.01]'
                    : ''
            }`}
        >
            {/* ── pill row ── */}
            <div className="flex-1 flex items-center gap-0 flex-wrap min-w-0">
                
                <InteractiveExpr prefix="lhs" indId={tokens.lhsId} params={tokens.lhsParams} />

                {/* Operator chip */}
                {tokens.lhsId && (
                    <>
                        <span className="text-muted-foreground/30 text-[13px] px-0.5 select-none leading-none">·</span>
                        <div data-slot="op" id={`op-${criterion.id}`} className="group/chip">
                            <Chip
                                label={opDef?.label}
                                placeholder="operator"
                                active={activeSlot === 'op'}
                                query={activeSlot === 'op' ? searchQuery : undefined}
                                onQueryChange={setSearchQuery}
                                onKeyDown={handleKeyDown}
                                onClick={e => openSlot('op', e.currentTarget as HTMLElement)}
                                compact={true}
                                isOperator={true}
                            />
                        </div>
                    </>
                )}

                {/* RHS */}
                {tokens.lhsId && tokens.opId && opDef && opDef.valueConfig.type !== 'none' && (
                    <>
                    <span className="text-muted-foreground/30 text-[13px] px-0.5 select-none leading-none">·</span>
                    <div data-slot="rhs" id={`rhs-${criterion.id}`}>
                        {activeSlot === 'rhs-value' || (!opDef.rhsCanBeIndicator && tokens.rhsType === 'number') ? (
                            <Chip
                                label={tokens.rhsValue}
                                placeholder="value"
                                active={activeSlot === 'rhs-value'}
                                query={activeSlot === 'rhs-value' ? searchQuery : undefined}
                                onQueryChange={setSearchQuery}
                                onKeyDown={handleKeyDown}
                                onClick={e => openSlot('rhs-value', e.currentTarget as HTMLElement)}
                                compact={true}
                            />
                        ) : (
                            <InteractiveExpr prefix="rhs" indId={tokens.rhsType === 'indicator' ? tokens.rhsValue : null} params={tokens.rhsParams} />
                        )}
                    </div>
                    </>
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
                    anchorId={`${activeSlot}-${criterion.id}`}
                />
            )}
        </div>
    );
}
