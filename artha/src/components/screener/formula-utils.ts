/**
 * Utility functions for formula builder autocomplete
 * Handles fuzzy search, ranking, and context detection
 */

import { INDICATORS, OPERATORS, INDICATOR_CATEGORIES, type IndicatorDef, type OperatorDef } from '@/lib/screener/indicators';

// ─── Types ───────────────────────────────────────────────────────────────────

export type AutocompleteItemType = 'indicator' | 'operator' | 'keyword' | 'number';

export interface AutocompleteItem {
    type: AutocompleteItemType;
    id: string;
    label: string;           // Display name
    category: string;        // Category label
    dslName: string;         // DSL syntax
    dslExample?: string;     // Full DSL example (e.g., "rsi(14) > 70")
    params?: Array<{ name: string; defaultValue: number | string }>;
    description?: string;
    matchScore: number;
    matchIndices?: number[]; // Character indices that matched
}

export type FormulaContext = 
    | 'start'           // Beginning of input or after 'and'/'or'
    | 'after_indicator' // After indicator name, expect operator
    | 'after_operator'  // After operator, expect value/indicator
    | 'in_params'       // Inside parentheses, expect parameter value
    | 'after_value';    // After value, expect 'and'/'or' or end

// ─── Fuzzy Search ────────────────────────────────────────────────────────────

/**
 * Calculate match score for a query against a target string
 * Returns score (higher = better match) and matching character indices
 */
function fuzzyMatch(query: string, target: string): { score: number; indices: number[] } {
    const q = query.toLowerCase();
    const t = target.toLowerCase();
    
    if (t.includes(q)) {
        // Exact substring match
        const startIdx = t.indexOf(q);
        const indices = Array.from({ length: q.length }, (_, i) => startIdx + i);
        
        // Bonus for prefix match
        const prefixBonus = startIdx === 0 ? 100 : 0;
        // Bonus for word start match
        const wordStartBonus = (startIdx === 0 || t[startIdx - 1] === ' ' || t[startIdx - 1] === '(') ? 50 : 0;
        
        return { 
            score: 1000 + prefixBonus + wordStartBonus - startIdx * 2, 
            indices 
        };
    }
    
    // Character-by-character fuzzy match
    let score = 0;
    let lastMatchIdx = -1;
    const indices: number[] = [];
    let qIdx = 0;
    
    for (let tIdx = 0; tIdx < t.length && qIdx < q.length; tIdx++) {
        if (t[tIdx] === q[qIdx]) {
            indices.push(tIdx);
            
            // Consecutive match bonus
            if (lastMatchIdx === tIdx - 1) {
                score += 10;
            }
            
            // Word start bonus
            if (tIdx === 0 || t[tIdx - 1] === ' ' || t[tIdx - 1] === '(') {
                score += 5;
            }
            
            score += 1;
            lastMatchIdx = tIdx;
            qIdx++;
        }
    }
    
    // All characters matched
    if (qIdx === q.length) {
        return { score, indices };
    }
    
    return { score: 0, indices: [] };
}

/**
 * Search indicators, operators, and keywords for autocomplete
 */
export function searchAutocomplete(query: string, context: FormulaContext = 'start'): AutocompleteItem[] {
    const trimmed = query.trim();
    if (!trimmed) return getDefaultSuggestions(context);
    
    const results: AutocompleteItem[] = [];
    
    // Search indicators
    if (context === 'start' || context === 'after_operator') {
        for (const ind of INDICATORS) {
            // Match against label and dslName
            const labelMatch = fuzzyMatch(trimmed, ind.label);
            const dslMatch = fuzzyMatch(trimmed, ind.dslName);
            const bestMatch = labelMatch.score > dslMatch.score ? labelMatch : dslMatch;
            
            if (bestMatch.score > 0) {
                const category = INDICATOR_CATEGORIES.find(c => c.id === ind.categoryId);
                
                // Generate DSL example
                let dslExample = ind.dslName;
                if (ind.params.length > 0) {
                    const paramStr = ind.params.map(p => p.defaultValue).join(',');
                    dslExample = `${ind.dslName}(${paramStr})`;
                }
                // Add common operator example
                if (ind.rhsType === 'number_or_indicator' || ind.rhsType === 'number') {
                    dslExample += ' > 50';
                }
                
                results.push({
                    type: 'indicator',
                    id: ind.id,
                    label: ind.label,
                    category: category?.label || ind.categoryId,
                    dslName: ind.dslName,
                    dslExample,
                    params: ind.params.map(p => ({ name: p.name, defaultValue: p.defaultValue })),
                    description: ind.description,
                    matchScore: bestMatch.score,
                    matchIndices: bestMatch.indices,
                });
            }
        }
    }
    
    // Search operators
    if (context === 'after_indicator') {
        for (const op of OPERATORS) {
            const labelMatch = fuzzyMatch(trimmed, op.label);
            const verbMatch = fuzzyMatch(trimmed, op.verb);
            const dslMatch = fuzzyMatch(trimmed, op.dslOp);
            const bestMatch = [labelMatch, verbMatch, dslMatch].reduce((a, b) => a.score > b.score ? a : b);
            
            if (bestMatch.score > 0) {
                results.push({
                    type: 'operator',
                    id: op.id,
                    label: op.label,
                    category: 'Operator',
                    dslName: op.dslOp,
                    description: op.verb,
                    matchScore: bestMatch.score,
                    matchIndices: bestMatch.indices,
                });
            }
        }
    }
    
    // Search for number values
    if (context === 'after_operator' || context === 'in_params') {
        const num = parseFloat(trimmed);
        if (!isNaN(num)) {
            results.push({
                type: 'number',
                id: `num_${num}`,
                label: trimmed,
                category: 'Number',
                dslName: trimmed,
                matchScore: 2000, // High priority for exact number match
            });
        }
        
        // Suggest common values
        const commonValues = context === 'in_params' 
            ? ['14', '20', '50', '100', '200']
            : ['30', '50', '70', '100', '1000000'];
            
        for (const val of commonValues) {
            const match = fuzzyMatch(trimmed, val);
            if (match.score > 0) {
                results.push({
                    type: 'number',
                    id: `num_${val}`,
                    label: val,
                    category: 'Number',
                    dslName: val,
                    matchScore: match.score + 500,
                    matchIndices: match.indices,
                });
            }
        }
    }
    
    // Search keywords (and, or, etc.)
    if (context === 'after_value') {
        const keywords = [
            { label: 'and', dsl: 'and', desc: 'Logical AND' },
            { label: 'or', dsl: 'or', desc: 'Logical OR' },
        ];
        
        for (const kw of keywords) {
            const match = fuzzyMatch(trimmed, kw.label);
            if (match.score > 0) {
                results.push({
                    type: 'keyword',
                    id: kw.label,
                    label: kw.label.toUpperCase(),
                    category: 'Keyword',
                    dslName: kw.dsl,
                    description: kw.desc,
                    matchScore: match.score,
                    matchIndices: match.indices,
                });
            }
        }
    }
    
    // Sort by match score (descending) and limit to top 15
    return results
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 15);
}

/**
 * Get default suggestions based on context
 */
function getDefaultSuggestions(context: FormulaContext): AutocompleteItem[] {
    switch (context) {
        case 'start':
            // Show popular indicators
            return ['rsi', 'price', 'sma', 'ema', 'volume', 'macd', 'pe', 'mcap']
                .map(id => INDICATORS.find(i => i.id === id))
                .filter((ind): ind is IndicatorDef => !!ind)
                .map(ind => {
                    const category = INDICATOR_CATEGORIES.find(c => c.id === ind.categoryId);
                    return {
                        type: 'indicator' as const,
                        id: ind.id,
                        label: ind.label,
                        category: category?.label || ind.categoryId,
                        dslName: ind.dslName,
                        params: ind.params.map(p => ({ name: p.name, defaultValue: p.defaultValue })),
                        description: ind.description,
                        matchScore: 100,
                    };
                });
        
        case 'after_indicator':
            // Show common operators
            return ['gt', 'lt', 'ca', 'cb', 'between']
                .map(id => OPERATORS.find(o => o.id === id))
                .filter((op): op is OperatorDef => !!op)
                .map(op => ({
                    type: 'operator' as const,
                    id: op.id,
                    label: op.label,
                    category: 'Operator',
                    dslName: op.dslOp,
                    description: op.verb,
                    matchScore: 100,
                }));
        
        case 'after_operator':
            // Show common values and popular indicators
            return [
                { type: 'number' as const, id: 'num_50', label: '50', category: 'Number', dslName: '50', matchScore: 100 },
                { type: 'number' as const, id: 'num_70', label: '70', category: 'Number', dslName: '70', matchScore: 100 },
                { type: 'number' as const, id: 'num_30', label: '30', category: 'Number', dslName: '30', matchScore: 100 },
            ];
        
        case 'in_params':
            // Show common parameter values
            return [
                { type: 'number' as const, id: 'num_14', label: '14', category: 'Number', dslName: '14', matchScore: 100 },
                { type: 'number' as const, id: 'num_20', label: '20', category: 'Number', dslName: '20', matchScore: 100 },
                { type: 'number' as const, id: 'num_50', label: '50', category: 'Number', dslName: '50', matchScore: 100 },
            ];
        
        case 'after_value':
            return [
                { type: 'keyword' as const, id: 'and', label: 'AND', category: 'Keyword', dslName: 'and', matchScore: 100 },
                { type: 'keyword' as const, id: 'or', label: 'OR', category: 'Keyword', dslName: 'or', matchScore: 100 },
            ];
        
        default:
            return [];
    }
}

/**
 * Detect context from current input
 */
export function detectContext(input: string): FormulaContext {
    const trimmed = input.trim().toLowerCase();
    
    if (!trimmed || trimmed.endsWith('and') || trimmed.endsWith('or')) {
        return 'start';
    }
    
    // Check if we're inside parentheses
    const openParens = (trimmed.match(/\(/g) || []).length;
    const closeParens = (trimmed.match(/\)/g) || []).length;
    if (openParens > closeParens) {
        return 'in_params';
    }
    
    // Check for operators
    const hasOperator = OPERATORS.some(op => 
        trimmed.includes(` ${op.dslOp} `) || 
        trimmed.includes(` ${op.dslOp}`) ||
        trimmed.endsWith(op.dslOp)
    );
    
    if (hasOperator) {
        // Check if there's a value after the operator
        const lastToken = trimmed.split(/\s+/).pop() || '';
        const isOperator = OPERATORS.some(op => op.dslOp === lastToken);
        return isOperator ? 'after_operator' : 'after_value';
    }
    
    // Check if we have an indicator name
    const hasIndicator = INDICATORS.some(ind => 
        trimmed.startsWith(ind.dslName) || 
        trimmed.includes(` ${ind.dslName}`)
    );
    
    if (hasIndicator) {
        return 'after_indicator';
    }
    
    return 'start';
}

/**
 * Get indices for highlighting matching characters
 */
export function getMatchIndices(text: string, indices?: number[]): { text: string; isMatch: boolean }[] {
    if (!indices || indices.length === 0) {
        return [{ text, isMatch: false }];
    }
    
    const parts: { text: string; isMatch: boolean }[] = [];
    let lastIdx = 0;
    
    for (const idx of indices) {
        if (idx > lastIdx) {
            parts.push({ text: text.slice(lastIdx, idx), isMatch: false });
        }
        parts.push({ text: text[idx], isMatch: true });
        lastIdx = idx + 1;
    }
    
    if (lastIdx < text.length) {
        parts.push({ text: text.slice(lastIdx), isMatch: false });
    }
    
    return parts;
}
