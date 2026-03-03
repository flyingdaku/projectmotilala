/**
 * @indiaquant/finance-math
 *
 * Facade over decimal.js for all financial calculations.
 * NEVER use native JS floats for monetary math — use Decimal throughout.
 *
 * Public API — import from here, not from individual modules.
 */

export * from "./decimal-utils";
export * from "./xirr";
export * from "./returns";
export * from "./sip";
export * from "./tax";
export * from "./swr";
