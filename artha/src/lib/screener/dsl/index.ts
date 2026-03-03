/**
 * DSL public API
 * Usage:
 *   import { compileDsl } from '@/lib/screener/dsl';
 *   const result = compileDsl('rsi(14) > 70 and price ca sma(50)');
 */

export { parseDsl, ParseError, INDIA_INDEX_MAP } from './parser';
export { tokenize, TokenizeError } from './tokenizer';
export { codegenFormula } from './codegen';
export type { CodegenResult, UniverseConstraint, SortHint, ShowHint } from './codegen';
export type { FormulaNode, AstNode } from './ast';

import { parseDsl } from './parser';
import { codegenFormula } from './codegen';
import type { CodegenResult } from './codegen';

/**
 * One-shot: parse a DSL formula string and produce SQL code-gen output.
 * Returns null if the formula is empty/whitespace.
 * Throws ParseError / TokenizeError on syntax errors.
 */
export function compileDsl(formula: string): CodegenResult | null {
    const trimmed = formula.trim();
    if (!trimmed) return null;
    const ast = parseDsl(trimmed);
    return codegenFormula(ast);
}
