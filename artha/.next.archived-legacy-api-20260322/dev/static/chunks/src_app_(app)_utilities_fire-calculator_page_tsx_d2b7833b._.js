(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/(app)/utilities/fire-calculator/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FireCalculatorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AreaChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-area.js [app-client] (ecmascript) <export default as AreaChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/ComposedChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function calculateFIRE(currentAge, retirementAge, lifeExpectancy, currentExpenses, currentCorpus, inflationRate, preRetirementReturn, postRetirementReturn) {
    const yearsToRetire = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    // 1. Calculate Expenses at Retirement (FV of current expenses)
    const expensesAtRetirement = currentExpenses * Math.pow(1 + inflationRate / 100, yearsToRetire);
    // 2. Calculate Required FIRE Corpus (PV of growing annuity)
    // Real rate of return needed for the PV calculation
    // R = ((1 + nominalReturn) / (1 + inflationRate)) - 1
    const rInt = postRetirementReturn / 100;
    const iRate = inflationRate / 100;
    let requiredCorpus = 0;
    if (rInt === iRate) {
        // If return exactly matches inflation, you just need (Expenses * Years)
        requiredCorpus = expensesAtRetirement * yearsInRetirement;
    } else {
        const realRate = (1 + rInt) / (1 + iRate) - 1;
        // PV of Annuity formula: PMT * [ (1 - (1+r)^-n) / r ]
        // PMT here is the *end* of year payment, so we actually want PV of annuity *due* if we pull at start of year, 
        // but for simplicity, standard PV of growing annuity where first payment is `expensesAtRetirement`
        requiredCorpus = expensesAtRetirement * ((1 - Math.pow(1 + realRate, -yearsInRetirement)) / realRate);
        // Adjust for beginning of year withdrawal (Annuity Due)
        requiredCorpus = requiredCorpus * (1 + realRate);
    }
    // 3. Calculate Future Value of Current Corpus
    const preRetRate = preRetirementReturn / 100;
    const fvCurrentCorpus = currentCorpus * Math.pow(1 + preRetRate, yearsToRetire);
    // 4. Calculate Shortfall
    const shortfall = Math.max(0, requiredCorpus - fvCurrentCorpus);
    // 5. Calculate Required Monthly SIP
    let requiredSip = 0;
    if (shortfall > 0 && yearsToRetire > 0) {
        const monthlyRate = preRetRate / 12;
        const totalMonths = yearsToRetire * 12;
        // FV of Annuity formula solved for PMT
        requiredSip = shortfall * monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
    // --- Generate Schedule for Charting ---
    const schedule = [];
    let simCorpus = currentCorpus;
    let simAnnualSIP = requiredSip * 12;
    let simExpense = currentExpenses;
    // Accumulation Phase
    for(let age = currentAge; age <= retirementAge; age++){
        schedule.push({
            age,
            corpus: Math.max(0, Math.round(simCorpus)),
            expense: Math.round(simExpense),
            phase: 'Accumulation'
        });
        if (age < retirementAge) {
            // Add SIP and grow corpus
            simCorpus += simAnnualSIP; // Assuming SIP added evenly, simplistic annual growth
            simCorpus *= 1 + preRetRate;
            simExpense *= 1 + iRate;
        }
    }
    // Drawdown Phase
    // At retirement, the corpus should theoretically be EXACTLY the requiredCorpus
    // Let's force it slightly to avoid rounding errors cascading in the chart
    if (shortfall > 0) {
        simCorpus = requiredCorpus;
    }
    for(let age = retirementAge + 1; age <= lifeExpectancy; age++){
        simExpense *= 1 + iRate;
        simCorpus -= simExpense; // Withdraw at start of year
        simCorpus *= 1 + rInt; // Grow remaining balance
        schedule.push({
            age,
            corpus: Math.max(0, Math.round(simCorpus)),
            expense: Math.round(simExpense),
            phase: 'Drawdown'
        });
        // If money runs out early due to math approximations
        if (simCorpus <= 0) simCorpus = 0;
    }
    return {
        yearsToRetire,
        yearsInRetirement,
        expensesAtRetirement,
        requiredCorpus,
        fvCurrentCorpus,
        shortfall,
        requiredSip,
        schedule
    };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "9648512e8c11d34550054e5a47872a2ceb786ab96f136f91665bb7307b0a9558") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9648512e8c11d34550054e5a47872a2ceb786ab96f136f91665bb7307b0a9558";
    }
    const { active, payload, label } = t0;
    if (!active || !payload?.length) {
        return null;
    }
    const isDrawdown = payload[0]?.payload?.phase === "Drawdown";
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            background: "var(--surface-elevated)",
            borderColor: "var(--border)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            color: "var(--text-primary)",
            borderColor: "var(--border-subtle)"
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const t3 = isDrawdown ? "(Retirement)" : "";
    let t4;
    if ($[3] !== label || $[4] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-medium mb-1 border-b pb-1",
            style: t2,
            children: [
                "Age ",
                label,
                " ",
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 148,
            columnNumber: 10
        }, this);
        $[3] = label;
        $[4] = t3;
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] !== payload) {
        t5 = payload.map(_CustomTooltipPayloadMap);
        $[6] = payload;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== t4 || $[9] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-3 py-2 rounded-lg border text-xs shadow-lg",
            style: t1,
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 165,
            columnNumber: 10
        }, this);
        $[8] = t4;
        $[9] = t5;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    return t6;
}
_c = CustomTooltip;
function _CustomTooltipPayloadMap(p) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        style: {
            color: p.color
        },
        children: [
            p.name,
            ": ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-mono font-medium",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(p.value)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                lineNumber: 177,
                columnNumber: 16
            }, this)
        ]
    }, p.name, true, {
        fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
        lineNumber: 175,
        columnNumber: 10
    }, this);
}
function FireCalculatorPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(146);
    if ($[0] !== "9648512e8c11d34550054e5a47872a2ceb786ab96f136f91665bb7307b0a9558") {
        for(let $i = 0; $i < 146; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9648512e8c11d34550054e5a47872a2ceb786ab96f136f91665bb7307b0a9558";
    }
    const [currentAge, setCurrentAge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(30);
    const [retirementAge, setRetirementAge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(50);
    const [lifeExpectancy, setLifeExpectancy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(85);
    const [currentExpenses, setCurrentExpenses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1200000);
    const [currentCorpus, setCurrentCorpus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2500000);
    const [inflationRate, setInflationRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(6);
    const [preReturn, setPreReturn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(12);
    const [postReturn, setPostReturn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(8);
    const [mounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const validRetirementAge = Math.max(currentAge + 1, retirementAge);
    const validLifeExpectancy = Math.max(validRetirementAge + 1, lifeExpectancy);
    let t0;
    if ($[1] !== currentAge || $[2] !== currentCorpus || $[3] !== currentExpenses || $[4] !== inflationRate || $[5] !== postReturn || $[6] !== preReturn || $[7] !== validLifeExpectancy || $[8] !== validRetirementAge) {
        t0 = calculateFIRE(currentAge, validRetirementAge, validLifeExpectancy, currentExpenses, currentCorpus, inflationRate, preReturn, postReturn);
        $[1] = currentAge;
        $[2] = currentCorpus;
        $[3] = currentExpenses;
        $[4] = inflationRate;
        $[5] = postReturn;
        $[6] = preReturn;
        $[7] = validLifeExpectancy;
        $[8] = validRetirementAge;
        $[9] = t0;
    } else {
        t0 = $[9];
    }
    const results = t0;
    const onTrack = results.shortfall <= 0;
    let t1;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            color: "var(--text-primary)"
        };
        $[10] = t1;
    } else {
        t1 = $[10];
    }
    let t2;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-2xl font-semibold mb-1 flex items-center gap-2",
            style: t1,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                    size: 24,
                    style: {
                        color: "var(--accent-brand)"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 226,
                    columnNumber: 89
                }, this),
                "Advanced FIRE Simulator"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 226,
            columnNumber: 10
        }, this);
        $[11] = t2;
    } else {
        t2 = $[11];
    }
    let t3;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-6",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm",
                    style: {
                        color: "var(--text-secondary)"
                    },
                    children: "Calculate your exact Financial Independence target, adjusted for Indian inflation."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 235,
                    columnNumber: 36
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 235,
            columnNumber: 10
        }, this);
        $[12] = t3;
    } else {
        t3 = $[12];
    }
    let t4;
    let t5;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-medium flex items-center gap-2 text-sm uppercase tracking-widest text-[#6b7280]",
            children: "1. Timeline"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 249,
            columnNumber: 10
        }, this);
        $[13] = t4;
        $[14] = t5;
    } else {
        t4 = $[13];
        t5 = $[14];
    }
    let t6;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-medium text-neutral-500",
            children: "Current Age"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 258,
            columnNumber: 10
        }, this);
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    let t7;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "FireCalculatorPage[<Input>.onChange]": (e)=>setCurrentAge(Number(e.target.value))
        })["FireCalculatorPage[<Input>.onChange]"];
        $[16] = t7;
    } else {
        t7 = $[16];
    }
    let t8;
    if ($[17] !== currentAge) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-1.5",
            children: [
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "number",
                    value: currentAge,
                    onChange: t7,
                    min: 18,
                    max: 70,
                    className: "font-mono"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 274,
                    columnNumber: 53
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 274,
            columnNumber: 10
        }, this);
        $[17] = currentAge;
        $[18] = t8;
    } else {
        t8 = $[18];
    }
    let t9;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-medium",
            style: {
                color: "var(--accent-brand)"
            },
            children: "Retire By Age"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 282,
            columnNumber: 10
        }, this);
        $[19] = t9;
    } else {
        t9 = $[19];
    }
    let t10;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = ({
            "FireCalculatorPage[<Input>.onChange]": (e_0)=>setRetirementAge(Number(e_0.target.value))
        })["FireCalculatorPage[<Input>.onChange]"];
        $[20] = t10;
    } else {
        t10 = $[20];
    }
    const t11 = currentAge + 1;
    let t12;
    if ($[21] !== retirementAge || $[22] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-1.5",
            children: [
                t9,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "number",
                    value: retirementAge,
                    onChange: t10,
                    min: t11,
                    max: 80,
                    className: "font-mono"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 301,
                    columnNumber: 54
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 301,
            columnNumber: 11
        }, this);
        $[21] = retirementAge;
        $[22] = t11;
        $[23] = t12;
    } else {
        t12 = $[23];
    }
    let t13;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-medium text-neutral-500",
            children: "Life Expectancy Age"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 310,
            columnNumber: 11
        }, this);
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = ({
            "FireCalculatorPage[<Input>.onChange]": (e_1)=>setLifeExpectancy(Number(e_1.target.value))
        })["FireCalculatorPage[<Input>.onChange]"];
        $[25] = t14;
    } else {
        t14 = $[25];
    }
    const t15 = retirementAge + 1;
    let t16;
    if ($[26] !== lifeExpectancy || $[27] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-1.5 col-span-2",
            children: [
                t13,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "number",
                    value: lifeExpectancy,
                    onChange: t14,
                    min: t15,
                    max: 100,
                    className: "font-mono"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 327,
                    columnNumber: 66
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 327,
            columnNumber: 11
        }, this);
        $[26] = lifeExpectancy;
        $[27] = t15;
        $[28] = t16;
    } else {
        t16 = $[28];
    }
    let t17;
    if ($[29] !== t12 || $[30] !== t16 || $[31] !== t8) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 rounded-xl border space-y-4",
            style: t4,
            children: [
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-3",
                    children: [
                        t8,
                        t12,
                        t16
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 336,
                    columnNumber: 75
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 336,
            columnNumber: 11
        }, this);
        $[29] = t12;
        $[30] = t16;
        $[31] = t8;
        $[32] = t17;
    } else {
        t17 = $[32];
    }
    let t18;
    let t19;
    if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-medium flex items-center gap-2 text-sm uppercase tracking-widest text-[#6b7280]",
            children: "2. Financials"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 351,
            columnNumber: 11
        }, this);
        $[33] = t18;
        $[34] = t19;
    } else {
        t18 = $[33];
        t19 = $[34];
    }
    let t20;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-medium text-neutral-500",
            children: "Current Annual Expenses (₹)"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 360,
            columnNumber: 11
        }, this);
        $[35] = t20;
    } else {
        t20 = $[35];
    }
    let t21;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = ({
            "FireCalculatorPage[<Input>.onChange]": (e_2)=>setCurrentExpenses(Number(e_2.target.value))
        })["FireCalculatorPage[<Input>.onChange]"];
        $[36] = t21;
    } else {
        t21 = $[36];
    }
    let t22;
    if ($[37] !== currentExpenses) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-1.5",
            children: [
                t20,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "number",
                    value: currentExpenses,
                    onChange: t21,
                    step: 100000,
                    className: "font-mono"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 376,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 376,
            columnNumber: 11
        }, this);
        $[37] = currentExpenses;
        $[38] = t22;
    } else {
        t22 = $[38];
    }
    let t23;
    if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-medium text-neutral-500",
            children: "Current Saved Corpus (₹)"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 384,
            columnNumber: 11
        }, this);
        $[39] = t23;
    } else {
        t23 = $[39];
    }
    let t24;
    if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = ({
            "FireCalculatorPage[<Input>.onChange]": (e_3)=>setCurrentCorpus(Number(e_3.target.value))
        })["FireCalculatorPage[<Input>.onChange]"];
        $[40] = t24;
    } else {
        t24 = $[40];
    }
    let t25;
    if ($[41] !== currentCorpus) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-1.5",
            children: [
                t23,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "number",
                    value: currentCorpus,
                    onChange: t24,
                    step: 500000,
                    className: "font-mono"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 400,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 400,
            columnNumber: 11
        }, this);
        $[41] = currentCorpus;
        $[42] = t25;
    } else {
        t25 = $[42];
    }
    let t26;
    if ($[43] !== t22 || $[44] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 rounded-xl border space-y-4",
            style: t18,
            children: [
                t19,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        t22,
                        t25
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 408,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 408,
            columnNumber: 11
        }, this);
        $[43] = t22;
        $[44] = t25;
        $[45] = t26;
    } else {
        t26 = $[45];
    }
    let t27;
    if ($[46] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[46] = t27;
    } else {
        t27 = $[46];
    }
    let t28;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-medium flex items-center justify-between text-sm uppercase tracking-widest text-[#6b7280]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "3. Rates (%)"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                lineNumber: 427,
                columnNumber: 122
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 427,
            columnNumber: 11
        }, this);
        $[47] = t28;
    } else {
        t28 = $[47];
    }
    let t29;
    if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-medium text-red-500",
            children: "Expected Inflation"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 434,
            columnNumber: 11
        }, this);
        $[48] = t29;
    } else {
        t29 = $[48];
    }
    let t30;
    if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = ({
            "FireCalculatorPage[<Input>.onChange]": (e_4)=>setInflationRate(Number(e_4.target.value))
        })["FireCalculatorPage[<Input>.onChange]"];
        $[49] = t30;
    } else {
        t30 = $[49];
    }
    let t31;
    if ($[50] !== inflationRate) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-1.5 col-span-2",
            children: [
                t29,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "number",
                    value: inflationRate,
                    onChange: t30,
                    step: 0.5,
                    className: "font-mono"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 450,
                    columnNumber: 66
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 450,
            columnNumber: 11
        }, this);
        $[50] = inflationRate;
        $[51] = t31;
    } else {
        t31 = $[51];
    }
    let t32;
    if ($[52] === Symbol.for("react.memo_cache_sentinel")) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-medium text-green-600",
            children: "Pre-Retire Return"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 458,
            columnNumber: 11
        }, this);
        $[52] = t32;
    } else {
        t32 = $[52];
    }
    let t33;
    if ($[53] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = ({
            "FireCalculatorPage[<Input>.onChange]": (e_5)=>setPreReturn(Number(e_5.target.value))
        })["FireCalculatorPage[<Input>.onChange]"];
        $[53] = t33;
    } else {
        t33 = $[53];
    }
    let t34;
    if ($[54] !== preReturn) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-1.5",
            children: [
                t32,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "number",
                    value: preReturn,
                    onChange: t33,
                    step: 0.5,
                    className: "font-mono"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 474,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 474,
            columnNumber: 11
        }, this);
        $[54] = preReturn;
        $[55] = t34;
    } else {
        t34 = $[55];
    }
    let t35;
    if ($[56] === Symbol.for("react.memo_cache_sentinel")) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-medium text-blue-500",
            children: "Post-Retire Return"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 482,
            columnNumber: 11
        }, this);
        $[56] = t35;
    } else {
        t35 = $[56];
    }
    let t36;
    if ($[57] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = ({
            "FireCalculatorPage[<Input>.onChange]": (e_6)=>setPostReturn(Number(e_6.target.value))
        })["FireCalculatorPage[<Input>.onChange]"];
        $[57] = t36;
    } else {
        t36 = $[57];
    }
    let t37;
    if ($[58] !== postReturn) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-1.5",
            children: [
                t35,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "number",
                    value: postReturn,
                    onChange: t36,
                    step: 0.5,
                    className: "font-mono"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 498,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 498,
            columnNumber: 11
        }, this);
        $[58] = postReturn;
        $[59] = t37;
    } else {
        t37 = $[59];
    }
    let t38;
    if ($[60] !== t31 || $[61] !== t34 || $[62] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 rounded-xl border space-y-4",
            style: t27,
            children: [
                t28,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-3",
                    children: [
                        t31,
                        t34,
                        t37
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 506,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 506,
            columnNumber: 11
        }, this);
        $[60] = t31;
        $[61] = t34;
        $[62] = t37;
        $[63] = t38;
    } else {
        t38 = $[63];
    }
    let t39;
    if ($[64] !== t17 || $[65] !== t26 || $[66] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "lg:col-span-4 space-y-4",
            children: [
                t17,
                t26,
                t38
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 516,
            columnNumber: 11
        }, this);
        $[64] = t17;
        $[65] = t26;
        $[66] = t38;
        $[67] = t39;
    } else {
        t39 = $[67];
    }
    const t40 = `rounded-xl border p-5 relative overflow-hidden ring-1 ${onTrack ? "ring-green-500" : "ring-red-500/50"}`;
    let t41;
    if ($[68] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[68] = t41;
    } else {
        t41 = $[68];
    }
    let t42;
    let t43;
    if ($[69] === Symbol.for("react.memo_cache_sentinel")) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-0 left-0 w-full h-1",
            style: {
                background: "var(--accent-brand)"
            }
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 538,
            columnNumber: 11
        }, this);
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2",
            children: "FIRE Target Corpus"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 541,
            columnNumber: 11
        }, this);
        $[69] = t42;
        $[70] = t43;
    } else {
        t42 = $[69];
        t43 = $[70];
    }
    let t44;
    if ($[71] !== results.requiredCorpus) {
        t44 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(results.requiredCorpus);
        $[71] = results.requiredCorpus;
        $[72] = t44;
    } else {
        t44 = $[72];
    }
    let t45;
    if ($[73] !== t44) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-4xl font-semibold font-mono text-neutral-800",
            children: t44
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 558,
            columnNumber: 11
        }, this);
        $[73] = t44;
        $[74] = t45;
    } else {
        t45 = $[74];
    }
    let t46;
    if ($[75] !== validRetirementAge) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs font-medium mt-2 text-neutral-500",
            children: [
                "Needed at Age ",
                validRetirementAge
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 566,
            columnNumber: 11
        }, this);
        $[75] = validRetirementAge;
        $[76] = t46;
    } else {
        t46 = $[76];
    }
    let t47;
    if ($[77] !== t40 || $[78] !== t45 || $[79] !== t46) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t40,
            style: t41,
            children: [
                t42,
                t43,
                t45,
                t46
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 574,
            columnNumber: 11
        }, this);
        $[77] = t40;
        $[78] = t45;
        $[79] = t46;
        $[80] = t47;
    } else {
        t47 = $[80];
    }
    const t48 = `rounded-xl border p-5 relative overflow-hidden ring-1 ${onTrack ? "ring-green-500" : "ring-red-500/50"}`;
    let t49;
    let t50;
    let t51;
    if ($[81] === Symbol.for("react.memo_cache_sentinel")) {
        t49 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-0 left-0 w-full h-1 bg-[#10B981]"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 591,
            columnNumber: 11
        }, this);
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2",
            children: "Action: Required SIP"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 592,
            columnNumber: 11
        }, this);
        $[81] = t49;
        $[82] = t50;
        $[83] = t51;
    } else {
        t49 = $[81];
        t50 = $[82];
        t51 = $[83];
    }
    const t52 = `text-4xl font-semibold font-mono ${onTrack ? "text-green-600" : "text-neutral-800"}`;
    let t53;
    if ($[84] !== onTrack || $[85] !== results.requiredSip) {
        t53 = onTrack ? "\u20B90" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(results.requiredSip);
        $[84] = onTrack;
        $[85] = results.requiredSip;
        $[86] = t53;
    } else {
        t53 = $[86];
    }
    let t54;
    if ($[87] === Symbol.for("react.memo_cache_sentinel")) {
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm text-neutral-400 font-sans font-normal ml-1",
            children: "/ mo"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 613,
            columnNumber: 11
        }, this);
        $[87] = t54;
    } else {
        t54 = $[87];
    }
    let t55;
    if ($[88] !== t52 || $[89] !== t53) {
        t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: t52,
            children: [
                t53,
                t54
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 620,
            columnNumber: 11
        }, this);
        $[88] = t52;
        $[89] = t53;
        $[90] = t55;
    } else {
        t55 = $[90];
    }
    let t56;
    if ($[91] !== onTrack || $[92] !== results.shortfall) {
        t56 = onTrack ? "Your current corpus is already sufficient!" : `To bridge the ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(results.shortfall)} shortfall`;
        $[91] = onTrack;
        $[92] = results.shortfall;
        $[93] = t56;
    } else {
        t56 = $[93];
    }
    let t57;
    if ($[94] !== t56) {
        t57 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs font-medium mt-2 text-neutral-500",
            children: t56
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 638,
            columnNumber: 11
        }, this);
        $[94] = t56;
        $[95] = t57;
    } else {
        t57 = $[95];
    }
    let t58;
    if ($[96] !== t48 || $[97] !== t55 || $[98] !== t57) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t48,
            style: t49,
            children: [
                t50,
                t51,
                t55,
                t57
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 646,
            columnNumber: 11
        }, this);
        $[96] = t48;
        $[97] = t55;
        $[98] = t57;
        $[99] = t58;
    } else {
        t58 = $[99];
    }
    let t59;
    if ($[100] !== t47 || $[101] !== t58) {
        t59 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
            children: [
                t47,
                t58
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 656,
            columnNumber: 11
        }, this);
        $[100] = t47;
        $[101] = t58;
        $[102] = t59;
    } else {
        t59 = $[102];
    }
    let t60;
    let t61;
    if ($[103] === Symbol.for("react.memo_cache_sentinel")) {
        t60 = {
            background: "var(--surface-elevated)",
            borderColor: "var(--border)"
        };
        t61 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[10px] uppercase font-bold text-neutral-400",
            children: "Total Years to Invest"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 670,
            columnNumber: 11
        }, this);
        $[103] = t60;
        $[104] = t61;
    } else {
        t60 = $[103];
        t61 = $[104];
    }
    let t62;
    if ($[105] !== results.yearsToRetire) {
        t62 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 rounded-xl border",
            style: t60,
            children: [
                t61,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl font-mono mt-1 font-semibold",
                    children: results.yearsToRetire
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 679,
                    columnNumber: 67
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 679,
            columnNumber: 11
        }, this);
        $[105] = results.yearsToRetire;
        $[106] = t62;
    } else {
        t62 = $[106];
    }
    let t63;
    let t64;
    if ($[107] === Symbol.for("react.memo_cache_sentinel")) {
        t63 = {
            background: "var(--surface-elevated)",
            borderColor: "var(--border)"
        };
        t64 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[10px] uppercase font-bold text-neutral-400",
            children: "Years in Retirement"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 692,
            columnNumber: 11
        }, this);
        $[107] = t63;
        $[108] = t64;
    } else {
        t63 = $[107];
        t64 = $[108];
    }
    let t65;
    if ($[109] !== results.yearsInRetirement) {
        t65 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 rounded-xl border",
            style: t63,
            children: [
                t64,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl font-mono mt-1 font-semibold",
                    children: results.yearsInRetirement
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 701,
                    columnNumber: 67
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 701,
            columnNumber: 11
        }, this);
        $[109] = results.yearsInRetirement;
        $[110] = t65;
    } else {
        t65 = $[110];
    }
    let t66;
    if ($[111] === Symbol.for("react.memo_cache_sentinel")) {
        t66 = {
            background: "var(--surface-elevated)",
            borderColor: "var(--border)"
        };
        $[111] = t66;
    } else {
        t66 = $[111];
    }
    let t67;
    if ($[112] === Symbol.for("react.memo_cache_sentinel")) {
        t67 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 rounded-xl border flex flex-col justify-center",
            style: t66,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                onClick: _FireCalculatorPageButtonOnClick,
                variant: "outline",
                className: "w-full h-10 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                        lineNumber: 719,
                        columnNumber: 190
                    }, this),
                    " Share Plan"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                lineNumber: 719,
                columnNumber: 91
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 719,
            columnNumber: 11
        }, this);
        $[112] = t67;
    } else {
        t67 = $[112];
    }
    let t68;
    if ($[113] !== t62 || $[114] !== t65) {
        t68 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-3 gap-4",
            children: [
                t62,
                t65,
                t67
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 726,
            columnNumber: 11
        }, this);
        $[113] = t62;
        $[114] = t65;
        $[115] = t68;
    } else {
        t68 = $[115];
    }
    let t69;
    let t70;
    if ($[116] === Symbol.for("react.memo_cache_sentinel")) {
        t69 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
            size: 20,
            className: "shrink-0 text-blue-600"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 736,
            columnNumber: 11
        }, this);
        t70 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-sm font-medium text-blue-800",
            children: "The Inflation Impact"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 737,
            columnNumber: 11
        }, this);
        $[116] = t69;
        $[117] = t70;
    } else {
        t69 = $[116];
        t70 = $[117];
    }
    let t71;
    if ($[118] !== currentExpenses) {
        t71 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(currentExpenses);
        $[118] = currentExpenses;
        $[119] = t71;
    } else {
        t71 = $[119];
    }
    let t72;
    if ($[120] !== t71) {
        t72 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
            children: t71
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 754,
            columnNumber: 11
        }, this);
        $[120] = t71;
        $[121] = t72;
    } else {
        t72 = $[121];
    }
    let t73;
    if ($[122] !== results.expensesAtRetirement) {
        t73 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(results.expensesAtRetirement);
        $[122] = results.expensesAtRetirement;
        $[123] = t73;
    } else {
        t73 = $[123];
    }
    let t74;
    if ($[124] !== t73) {
        t74 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
            children: t73
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 770,
            columnNumber: 11
        }, this);
        $[124] = t73;
        $[125] = t74;
    } else {
        t74 = $[125];
    }
    let t75;
    if ($[126] !== inflationRate || $[127] !== t72 || $[128] !== t74 || $[129] !== validRetirementAge) {
        t75 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 rounded-xl border bg-blue-50/50 border-blue-200 flex items-start gap-3",
            children: [
                t69,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        t70,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs mt-1 text-blue-900/80 leading-relaxed",
                            children: [
                                "Because of ",
                                inflationRate,
                                "% compounding inflation, to maintain your current lifestyle of ",
                                t72,
                                "/year, you will actually need ",
                                t74,
                                "/year when you retire at age ",
                                validRetirementAge,
                                ". The simulator draws down this inflated amount every year from your targeted corpus."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                            lineNumber: 778,
                            columnNumber: 118
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 778,
                    columnNumber: 108
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 778,
            columnNumber: 11
        }, this);
        $[126] = inflationRate;
        $[127] = t72;
        $[128] = t74;
        $[129] = validRetirementAge;
        $[130] = t75;
    } else {
        t75 = $[130];
    }
    let t76;
    if ($[131] === Symbol.for("react.memo_cache_sentinel")) {
        t76 = {
            background: "var(--surface)",
            borderColor: "var(--border)"
        };
        $[131] = t76;
    } else {
        t76 = $[131];
    }
    let t77;
    let t78;
    if ($[132] === Symbol.for("react.memo_cache_sentinel")) {
        t77 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-sm font-semibold mb-4 flex items-center gap-2",
            style: {
                color: "var(--text-primary)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AreaChart$3e$__["AreaChart"], {
                    size: 18,
                    className: "text-neutral-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 802,
                    columnNumber: 8
                }, this),
                "Corpus Lifecycle: Accumulation vs Drawdown"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 800,
            columnNumber: 11
        }, this);
        t78 = {
            height: 320
        };
        $[132] = t77;
        $[133] = t78;
    } else {
        t77 = $[132];
        t78 = $[133];
    }
    let t79;
    if ($[134] !== mounted || $[135] !== results.schedule || $[136] !== validRetirementAge) {
        t79 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border p-5",
            style: t76,
            children: [
                t77,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: t78,
                    children: !mounted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full w-full"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                        lineNumber: 814,
                        columnNumber: 96
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: "100%",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComposedChart"], {
                            data: results.schedule,
                            margin: {
                                top: 10,
                                right: 0,
                                left: -20,
                                bottom: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "age",
                                    tickFormatter: _FireCalculatorPageXAxisTickFormatter,
                                    tick: {
                                        fill: "var(--text-muted)",
                                        fontSize: 10
                                    },
                                    axisLine: false,
                                    tickLine: false,
                                    dy: 10,
                                    minTickGap: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                                    lineNumber: 819,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                    tickFormatter: _FireCalculatorPageYAxisTickFormatter,
                                    tick: {
                                        fill: "var(--text-muted)",
                                        fontSize: 10
                                    },
                                    axisLine: false,
                                    tickLine: false,
                                    width: 60,
                                    dx: 10
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                                    lineNumber: 822,
                                    columnNumber: 76
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                                        fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                                        lineNumber: 825,
                                        columnNumber: 89
                                    }, void 0),
                                    cursor: {
                                        fill: "var(--surface-elevated)",
                                        opacity: 0.4
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                                    lineNumber: 825,
                                    columnNumber: 71
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                    wrapperStyle: {
                                        fontSize: 12,
                                        color: "var(--text-secondary)",
                                        paddingTop: "10px"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                                    lineNumber: 828,
                                    columnNumber: 18
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                    x: validRetirementAge,
                                    stroke: "var(--accent-brand)",
                                    strokeDasharray: "3 3",
                                    label: {
                                        position: "top",
                                        value: "Retirement",
                                        fill: "var(--accent-brand)",
                                        fontSize: 10
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                                    lineNumber: 832,
                                    columnNumber: 18
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                    type: "monotone",
                                    dataKey: "corpus",
                                    name: "Portfolio Value",
                                    stroke: "#10b981",
                                    strokeWidth: 2.5,
                                    fill: "#10b981",
                                    fillOpacity: 0.15,
                                    activeDot: {
                                        r: 5
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                                    lineNumber: 837,
                                    columnNumber: 18
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                    type: "monotone",
                                    dataKey: "expense",
                                    name: "Annual Expenses (Inflated)",
                                    stroke: "#ef4444",
                                    strokeWidth: 2,
                                    fill: "none",
                                    activeDot: false
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                                    lineNumber: 839,
                                    columnNumber: 18
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                            lineNumber: 814,
                            columnNumber: 180
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                        lineNumber: 814,
                        columnNumber: 132
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 814,
                    columnNumber: 67
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 814,
            columnNumber: 11
        }, this);
        $[134] = mounted;
        $[135] = results.schedule;
        $[136] = validRetirementAge;
        $[137] = t79;
    } else {
        t79 = $[137];
    }
    let t80;
    if ($[138] !== t59 || $[139] !== t68 || $[140] !== t75 || $[141] !== t79) {
        t80 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "lg:col-span-8 space-y-4",
            children: [
                t59,
                t68,
                t75,
                t79
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 849,
            columnNumber: 11
        }, this);
        $[138] = t59;
        $[139] = t68;
        $[140] = t75;
        $[141] = t79;
        $[142] = t80;
    } else {
        t80 = $[142];
    }
    let t81;
    if ($[143] !== t39 || $[144] !== t80) {
        t81 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
                    children: [
                        t39,
                        t80
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
                    lineNumber: 860,
                    columnNumber: 20
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/utilities/fire-calculator/page.tsx",
            lineNumber: 860,
            columnNumber: 11
        }, this);
        $[143] = t39;
        $[144] = t80;
        $[145] = t81;
    } else {
        t81 = $[145];
    }
    return t81;
}
_s(FireCalculatorPage, "LE1UPEczf+H9rPyUVadfNjMuVNI=");
_c1 = FireCalculatorPage;
function _FireCalculatorPageYAxisTickFormatter(v_0) {
    return `₹${(v_0 / 100000).toFixed(0)}L`;
}
function _FireCalculatorPageXAxisTickFormatter(v) {
    return `Age ${v}`;
}
function _FireCalculatorPageButtonOnClick() {
    return navigator.clipboard.writeText(window.location.href);
}
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomTooltip");
__turbopack_context__.k.register(_c1, "FireCalculatorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_%28app%29_utilities_fire-calculator_page_tsx_d2b7833b._.js.map