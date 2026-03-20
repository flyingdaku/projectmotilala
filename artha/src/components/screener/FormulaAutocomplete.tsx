/**
 * Two-tier categorized autocomplete dropdown for formula builder.
 * - Left sidebar: categories
 * - Right panel: values (indicators/operators)
 * - Synchronized scrolling and keyboard navigation
 */

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { INDICATORS, OPERATORS, INDICATOR_CATEGORIES } from '@/lib/screener/indicators';
import { getMatchIndices } from './formula-utils';
import type { AutocompleteItem } from './formula-utils';

// ─── highlight helper ────────────────────────────────────────────────────────

function Highlight({ text, indices }: { text: string; indices?: number[] }) {
    const parts = getMatchIndices(text, indices);
    return (
        <>
            {parts.map((p, i) =>
                p.isMatch
                    ? <span key={i} className="text-amber-400 font-semibold">{p.text}</span>
                    : <span key={i}>{p.text}</span>
            )}
        </>
    );
}

// ─── category colour map ─────────────────────────────────────────────────────

const CATEGORY_COLOURS: Record<string, string> = {
    universe:        'text-muted-foreground',
    price:           'text-muted-foreground',
    ma:              'text-muted-foreground',
    oscillators:     'text-muted-foreground',
    trend:           'text-muted-foreground',
    volatility:      'text-muted-foreground',
    volume:          'text-muted-foreground',
    momentum:        'text-muted-foreground',
    channels:        'text-muted-foreground',
    ichimoku:        'text-muted-foreground',
    pivot:           'text-muted-foreground',
    relstrength:     'text-muted-foreground',
    price_action:    'text-muted-foreground',
    fundamental:     'text-muted-foreground',
    financial_health:'text-muted-foreground',
    growth:          'text-muted-foreground',
    valuation:       'text-muted-foreground',
    quality:         'text-muted-foreground',
};

function catColour(id: string) {
    return CATEGORY_COLOURS[id] ?? 'text-muted-foreground';
}

// ─── props ───────────────────────────────────────────────────────────────────

export type DropdownMode = 'indicator' | 'operator' | 'rhs-indicator';

interface FormulaAutocompleteProps {
    mode: DropdownMode;
    query: string;
    onSelect: (item: AutocompleteItem) => void;
    onClose: () => void;
    /** Element ID to anchor to, or pixel position */
    anchorId?: string;
    position?: { top: number; left: number };
}

// ─── build flat filtered list ────────────────────────────────────────────────

function fuzzyScore(query: string, target: string): { score: number; indices: number[] } {
    const q = query.toLowerCase();
    const t = target.toLowerCase();
    if (!q) return { score: 0, indices: [] };
    const idx = t.indexOf(q);
    if (idx !== -1) {
        return {
            score: 1000 + (idx === 0 ? 200 : 0) - idx * 2,
            indices: Array.from({ length: q.length }, (_, i) => idx + i),
        };
    }
    let score = 0, qi = 0, last = -1;
    const matched: number[] = [];
    for (let ti = 0; ti < t.length && qi < q.length; ti++) {
        if (t[ti] === q[qi]) {
            matched.push(ti);
            if (last === ti - 1) score += 10;
            if (ti === 0 || t[ti - 1] === ' ') score += 5;
            score++;
            last = ti;
            qi++;
        }
    }
    return qi === q.length ? { score, indices: matched } : { score: 0, indices: [] };
}

function buildItems(mode: DropdownMode, query: string): AutocompleteItem[] {
    if (mode === 'operator') {
        return OPERATORS
            .map(op => {
                const { score, indices } = query
                    ? fuzzyScore(query, op.label)
                    : { score: 100, indices: [] };
                if (query && score === 0) return null;
                return {
                    type: 'operator' as const,
                    id: op.id,
                    label: op.label,
                    category: 'Operator',
                    dslName: op.dslOp,
                    description: op.verb,
                    matchScore: score,
                    matchIndices: indices,
                };
            })
            .filter(Boolean) as AutocompleteItem[];
    }

    // indicator or rhs-indicator: search INDICATORS
    return INDICATORS
        .filter(ind => ind.supported)
        .map(ind => {
            const labelMatch = query ? fuzzyScore(query, ind.label) : { score: 0, indices: [] };
            const dslMatch   = query ? fuzzyScore(query, ind.dslName) : { score: 0, indices: [] };
            const best = labelMatch.score >= dslMatch.score ? labelMatch : dslMatch;
            if (query && best.score === 0) return null;
            const cat = INDICATOR_CATEGORIES.find(c => c.id === ind.categoryId);
            let dslExample = ind.dslName;
            if (ind.params.length > 0) dslExample += `(${ind.params.map(p => p.defaultValue).join(',')})`;
            return {
                type: 'indicator' as const,
                id: ind.id,
                label: ind.label,
                category: cat?.label ?? ind.categoryId,
                categoryId: ind.categoryId,
                dslName: ind.dslName,
                dslExample,
                params: ind.params.map(p => ({ name: p.name, defaultValue: p.defaultValue })),
                description: ind.description,
                matchScore: best.score,
                matchIndices: best.indices,
            };
        })
        .filter(Boolean) as AutocompleteItem[];
}

// ─── component ───────────────────────────────────────────────────────────────

export function FormulaAutocomplete({
    mode,
    query,
    onSelect,
    onClose,
    position,
    anchorId,
}: FormulaAutocompleteProps) {
    const ref = useRef<HTMLDivElement>(null);
    const selRef = useRef<HTMLButtonElement>(null);
    const valuesScrollRef = useRef<HTMLDivElement>(null);
    const categoryRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [focusPanel, setFocusPanel] = useState<'category' | 'value'>('value');

    // Dynamic positioning
    const [currentPos, setCurrentPos] = useState(position || { top: 0, left: 0 });

    useEffect(() => {
        if (!anchorId) return;

        const update = () => {
            const el = document.getElementById(anchorId);
            if (el) {
                const r = el.getBoundingClientRect();
                if (r.top !== 0 || r.left !== 0) {
                    setCurrentPos({ top: r.bottom + 6, left: r.left });
                }
            }
        };

        update();
        
        // Track for a bit to handle animations
        const timer = setInterval(update, 100);
        const timeout = setTimeout(() => clearInterval(timer), 2000);
        
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true); // Catch scroll in any container

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
            window.removeEventListener('resize', update);
            window.removeEventListener('scroll', update, true);
        };
    }, [anchorId]);

    // reset selection when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // scroll selected into view
    useEffect(() => {
        selRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, [selectedIndex]);

    // close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) onClose();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [onClose]);

    const allItems = buildItems(mode, query);
    const filtered = query
        ? allItems.sort((a, b) => b.matchScore - a.matchScore).slice(0, 20)
        : null; // null → use grouped view

    // Build category groups
    const groups = mode === 'operator'
        ? [{ cat: { id: 'operators', label: 'Operators' }, items: allItems }]
        : INDICATOR_CATEGORIES.map(cat => ({
            cat,
            items: allItems.filter(it => (it as any).categoryId === cat.id),
        })).filter(g => g.items.length > 0);

    // Set initial active category
    useEffect(() => {
        if (!activeCategoryId && groups.length > 0) {
            setActiveCategoryId(groups[0].cat.id);
        }
    }, [groups, activeCategoryId]);

    // Scroll to category when selected
    const scrollToCategory = useCallback((catId: string) => {
        const el = categoryRefs.current.get(catId);
        if (el && valuesScrollRef.current) {
            const container = valuesScrollRef.current;
            const containerRect = container.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            const scrollTop = el.offsetTop - container.offsetTop - 8;
            container.scrollTo({ top: scrollTop, behavior: 'smooth' });
        }
    }, []);

    // Update active category based on scroll position
    const handleValuesScroll = useCallback(() => {
        if (!valuesScrollRef.current) return;
        const container = valuesScrollRef.current;
        const scrollTop = container.scrollTop;
        
        for (const group of groups) {
            const el = categoryRefs.current.get(group.cat.id);
            if (el) {
                const offsetTop = el.offsetTop - container.offsetTop;
                if (scrollTop >= offsetTop - 50) {
                    setActiveCategoryId(group.cat.id);
                }
            }
        }
    }, [groups]);

    // handle custom keydown events from FormulaCell input
    useEffect(() => {
        const handleKeyDown = (e: Event) => {
            const ce = e as CustomEvent<{ key: string }>;
            const key = ce.detail.key;
            const list = filtered ?? allItems;
            
            if (key === 'ArrowDown') {
                if (focusPanel === 'category') {
                    const currentIdx = groups.findIndex(g => g.cat.id === activeCategoryId);
                    const nextIdx = (currentIdx + 1) % groups.length;
                    const nextCat = groups[nextIdx].cat.id;
                    setActiveCategoryId(nextCat);
                    scrollToCategory(nextCat);
                } else {
                    setSelectedIndex(prev => (prev + 1) % list.length);
                }
            } else if (key === 'ArrowUp') {
                if (focusPanel === 'category') {
                    const currentIdx = groups.findIndex(g => g.cat.id === activeCategoryId);
                    const nextIdx = (currentIdx - 1 + groups.length) % groups.length;
                    const nextCat = groups[nextIdx].cat.id;
                    setActiveCategoryId(nextCat);
                    scrollToCategory(nextCat);
                } else {
                    setSelectedIndex(prev => (prev - 1 + list.length) % list.length);
                }
            } else if (key === 'ArrowLeft') {
                setFocusPanel('category');
            } else if (key === 'ArrowRight') {
                setFocusPanel('value');
            } else if (key === 'Enter') {
                if (list[selectedIndex]) {
                    onSelect(list[selectedIndex]);
                }
            }
        };
        document.addEventListener('formula-autocomplete-keydown', handleKeyDown);
        return () => document.removeEventListener('formula-autocomplete-keydown', handleKeyDown);
    }, [filtered, allItems, selectedIndex, onSelect, focusPanel, activeCategoryId, groups, scrollToCategory]);


    // ── filtered view (with query) ──
    const renderFiltered = () => (
        <div className="py-1">
            {(filtered ?? []).map((item, i) => (
                <ItemRow key={item.id} item={item} isSelected={i === selectedIndex}
                    selRef={i === selectedIndex ? selRef : undefined} onSelect={onSelect} />
            ))}
            {filtered?.length === 0 && (
                <div className="px-3 py-4 text-xs text-muted-foreground text-center">No matches</div>
            )}
        </div>
    );

    const dropdownGrid = (
        <div
            ref={ref}
            className="fixed z-[9999] rounded-xl border border-border bg-popover shadow-2xl overflow-hidden flex flex-col"
            style={{ 
                top: `${currentPos.top}px`, 
                left: `${currentPos.left}px`, 
                maxHeight: 600,
                width: filtered ? 320 : 520,
                opacity: currentPos.top === 0 && currentPos.left === 0 ? 0 : 1,
                pointerEvents: currentPos.top === 0 && currentPos.left === 0 ? 'none' : 'auto'
            }}
            onMouseDown={e => e.preventDefault()}
        >
            {filtered ? (
                // Filtered view (with search query)
                <div className="flex-1 overflow-y-auto" style={{ maxHeight: 540 }}>
                    {renderFiltered()}
                </div>
            ) : (
                // Two-tier view
                <div className="flex h-full" style={{ maxHeight: 540 }}>
                    {/* Left: Categories */}
                    <div className="w-44 border-r border-border flex-shrink-0 overflow-y-auto">
                        <div className="py-1">
                            {groups.map(({ cat }) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveCategoryId(cat.id);
                                        scrollToCategory(cat.id);
                                        setFocusPanel('value');
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                                        activeCategoryId === cat.id
                                            ? 'bg-amber-500/10 text-amber-500 border-r-2 border-amber-500'
                                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                    } ${focusPanel === 'category' && activeCategoryId === cat.id ? 'ring-1 ring-amber-500/30' : ''}`}
                                >
                                    <div className={catColour(cat.id)}>{cat.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Values */}
                    <div 
                        ref={valuesScrollRef}
                        className="flex-1 overflow-y-auto"
                        onScroll={handleValuesScroll}
                    >
                        <div className="py-1">
                            {groups.map(({ cat, items }) => (
                                <div 
                                    key={cat.id} 
                                    ref={el => {
                                        if (el) categoryRefs.current.set(cat.id, el);
                                    }}
                                >
                                    <div className={`px-3 pt-2 pb-0.5 text-[10px] font-semibold uppercase tracking-widest sticky top-0 bg-popover/95 backdrop-blur-sm z-10 ${catColour(cat.id)}`}>
                                        {cat.label}
                                    </div>
                                    {items.map((item, i) => {
                                        const globalIdx = allItems.indexOf(item);
                                        return (
                                            <ItemRow 
                                                key={item.id} 
                                                item={item} 
                                                isSelected={globalIdx === selectedIndex && focusPanel === 'value'}
                                                selRef={globalIdx === selectedIndex ? selRef : undefined}
                                                onSelect={onSelect} 
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="px-3 py-1 border-t border-border bg-muted/10 flex justify-between text-[10px] text-muted-foreground shrink-0">
                <span>↑↓ navigate</span><span>←→ switch panel</span><span>↵ select</span><span>Esc close</span>
            </div>
        </div>
    );

    // Only portal on client-side
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return createPortal(dropdownGrid, document.body);
}

// ─── single row ──────────────────────────────────────────────────────────────

function ItemRow({
    item,
    isSelected,
    selRef,
    onSelect,
}: {
    item: AutocompleteItem;
    isSelected: boolean;
    selRef?: React.RefObject<HTMLButtonElement | null>;
    onSelect: (item: AutocompleteItem) => void;
}) {
    return (
        <button
            ref={selRef ?? null}
            onMouseDown={e => { e.preventDefault(); onSelect(item); }}
            className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors ${
                isSelected ? 'bg-amber-500/10' : 'hover:bg-accent'
            }`}
        >
            <div className="flex items-center gap-2 min-w-0">
                <div className={`text-[13px] font-medium truncate ${isSelected ? 'text-amber-400' : 'text-foreground'}`}>
                    <Highlight text={item.label} indices={item.matchIndices} />
                </div>
                {item.dslExample && item.dslExample !== item.label && (
                    <div className="text-[10px] font-mono text-muted-foreground/70 truncate shrink-0">
                        {item.dslExample}
                    </div>
                )}
            </div>
            {item.type === 'operator' && (
                <span className="shrink-0 text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                    {item.dslName}
                </span>
            )}
        </button>
    );
}
