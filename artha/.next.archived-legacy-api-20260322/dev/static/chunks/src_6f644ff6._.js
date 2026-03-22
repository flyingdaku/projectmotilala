(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate,
    "formatDateShort",
    ()=>formatDateShort,
    "formatINR",
    ()=>formatINR,
    "formatPercent",
    ()=>formatPercent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatINR(value) {
    const abs = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    if (abs >= 1_00_00_000) {
        return `${sign}₹${(abs / 1_00_00_000).toFixed(2)}Cr`;
    }
    if (abs >= 1_00_000) {
        const lakhs = abs / 1_00_000;
        return `${sign}₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)}L`;
    }
    if (abs >= 1000) {
        return `${sign}₹${abs.toLocaleString("en-IN", {
            maximumFractionDigits: 0
        })}`;
    }
    return `${sign}₹${abs.toFixed(0)}`;
}
function formatPercent(value, decimals = 1) {
    return `${value >= 0 ? "+" : ""}${value.toFixed(decimals)}%`;
}
function formatDate(date) {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}
function formatDateShort(date) {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/accordion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Accordion",
    ()=>Accordion,
    "AccordionContent",
    ()=>AccordionContent,
    "AccordionItem",
    ()=>AccordionItem,
    "AccordionTrigger",
    ()=>AccordionTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Accordion$3e$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-accordion/dist/index.mjs [app-client] (ecmascript) <export * as Accordion>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function Accordion(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "b7d408838a582dedcf53cf0e63b27419e2e0189786107938c0c41e58101e5b3c") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b7d408838a582dedcf53cf0e63b27419e2e0189786107938c0c41e58101e5b3c";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Accordion$3e$__["Accordion"].Root, {
            "data-slot": "accordion",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/accordion.tsx",
            lineNumber: 28,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c = Accordion;
function AccordionItem(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "b7d408838a582dedcf53cf0e63b27419e2e0189786107938c0c41e58101e5b3c") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b7d408838a582dedcf53cf0e63b27419e2e0189786107938c0c41e58101e5b3c";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b last:border-b-0", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Accordion$3e$__["Accordion"].Item, {
            "data-slot": "accordion-item",
            className: t1,
            suppressHydrationWarning: true,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/accordion.tsx",
            lineNumber: 68,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c1 = AccordionItem;
function AccordionTrigger(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(12);
    if ($[0] !== "b7d408838a582dedcf53cf0e63b27419e2e0189786107938c0c41e58101e5b3c") {
        for(let $i = 0; $i < 12; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b7d408838a582dedcf53cf0e63b27419e2e0189786107938c0c41e58101e5b3c";
    }
    let children;
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
    }
    let t1;
    if ($[5] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", className);
        $[5] = className;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    let t2;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "text-muted-foreground pointer-events-none size-4 shrink-0 self-center transition-transform duration-200"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/accordion.tsx",
            lineNumber: 113,
            columnNumber: 10
        }, this);
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    let t3;
    if ($[8] !== children || $[9] !== props || $[10] !== t1) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Accordion$3e$__["Accordion"].Header, {
            className: "flex",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Accordion$3e$__["Accordion"].Trigger, {
                "data-slot": "accordion-trigger",
                className: t1,
                suppressHydrationWarning: true,
                ...props,
                children: [
                    children,
                    t2
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/accordion.tsx",
                lineNumber: 120,
                columnNumber: 54
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/accordion.tsx",
            lineNumber: 120,
            columnNumber: 10
        }, this);
        $[8] = children;
        $[9] = props;
        $[10] = t1;
        $[11] = t3;
    } else {
        t3 = $[11];
    }
    return t3;
}
_c2 = AccordionTrigger;
function AccordionContent(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(13);
    if ($[0] !== "b7d408838a582dedcf53cf0e63b27419e2e0189786107938c0c41e58101e5b3c") {
        for(let $i = 0; $i < 13; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b7d408838a582dedcf53cf0e63b27419e2e0189786107938c0c41e58101e5b3c";
    }
    let children;
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
    }
    let t1;
    if ($[5] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pt-0 pb-4", className);
        $[5] = className;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    let t2;
    if ($[7] !== children || $[8] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/accordion.tsx",
            lineNumber: 166,
            columnNumber: 10
        }, this);
        $[7] = children;
        $[8] = t1;
        $[9] = t2;
    } else {
        t2 = $[9];
    }
    let t3;
    if ($[10] !== props || $[11] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Accordion$3e$__["Accordion"].Content, {
            "data-slot": "accordion-content",
            className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
            suppressHydrationWarning: true,
            ...props,
            children: t2
        }, void 0, false, {
            fileName: "[project]/src/components/ui/accordion.tsx",
            lineNumber: 175,
            columnNumber: 10
        }, this);
        $[10] = props;
        $[11] = t2;
        $[12] = t3;
    } else {
        t3 = $[12];
    }
    return t3;
}
_c3 = AccordionContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Accordion");
__turbopack_context__.k.register(_c1, "AccordionItem");
__turbopack_context__.k.register(_c2, "AccordionTrigger");
__turbopack_context__.k.register(_c3, "AccordionContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollArea",
    ()=>ScrollArea,
    "ScrollBar",
    ()=>ScrollBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ScrollArea$3e$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-client] (ecmascript) <export * as ScrollArea>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function ScrollArea(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(15);
    if ($[0] !== "b3c50ae35360076fe176248f2759cf2b7b0acf1d4a0f7e4b5983588ab153c332") {
        for(let $i = 0; $i < 15; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b3c50ae35360076fe176248f2759cf2b7b0acf1d4a0f7e4b5983588ab153c332";
    }
    let children;
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
    }
    let t1;
    if ($[5] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", className);
        $[5] = className;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    let t2;
    if ($[7] !== children) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ScrollArea$3e$__["ScrollArea"].Viewport, {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/scroll-area.tsx",
            lineNumber: 43,
            columnNumber: 10
        }, this);
        $[7] = children;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    let t3;
    let t4;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
            fileName: "[project]/src/components/ui/scroll-area.tsx",
            lineNumber: 52,
            columnNumber: 10
        }, this);
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ScrollArea$3e$__["ScrollArea"].Corner, {}, void 0, false, {
            fileName: "[project]/src/components/ui/scroll-area.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        $[9] = t3;
        $[10] = t4;
    } else {
        t3 = $[9];
        t4 = $[10];
    }
    let t5;
    if ($[11] !== props || $[12] !== t1 || $[13] !== t2) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ScrollArea$3e$__["ScrollArea"].Root, {
            "data-slot": "scroll-area",
            className: t1,
            ...props,
            children: [
                t2,
                t3,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/scroll-area.tsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[11] = props;
        $[12] = t1;
        $[13] = t2;
        $[14] = t5;
    } else {
        t5 = $[14];
    }
    return t5;
}
_c = ScrollArea;
function ScrollBar(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "b3c50ae35360076fe176248f2759cf2b7b0acf1d4a0f7e4b5983588ab153c332") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b3c50ae35360076fe176248f2759cf2b7b0acf1d4a0f7e4b5983588ab153c332";
    }
    let className;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ className, orientation: t1, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
        $[4] = t1;
    } else {
        className = $[2];
        props = $[3];
        t1 = $[4];
    }
    const orientation = t1 === undefined ? "vertical" : t1;
    const t2 = orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent";
    const t3 = orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent";
    let t4;
    if ($[5] !== className || $[6] !== t2 || $[7] !== t3) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex touch-none p-px transition-colors select-none", t2, t3, className);
        $[5] = className;
        $[6] = t2;
        $[7] = t3;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ScrollArea$3e$__["ScrollArea"].ScrollAreaThumb, {
            "data-slot": "scroll-area-thumb",
            className: "bg-border relative flex-1 rounded-full"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/scroll-area.tsx",
            lineNumber: 113,
            columnNumber: 10
        }, this);
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== orientation || $[11] !== props || $[12] !== t4) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ScrollArea$3e$__["ScrollArea"].ScrollAreaScrollbar, {
            "data-slot": "scroll-area-scrollbar",
            orientation: orientation,
            className: t4,
            ...props,
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/ui/scroll-area.tsx",
            lineNumber: 120,
            columnNumber: 10
        }, this);
        $[10] = orientation;
        $[11] = props;
        $[12] = t4;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    return t6;
}
_c1 = ScrollBar;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "ScrollArea");
__turbopack_context__.k.register(_c1, "ScrollBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-pie.js [app-client] (ecmascript) <export default as PieChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/accordion.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
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
;
const MAIN_NAV_ITEMS = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
    },
    {
        label: "My Feed",
        href: "/feed",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"]
    },
    {
        label: "Analytics Hub",
        href: "/analytics",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"]
    }
];
const CATEGORIES = [
    {
        id: "portfolio",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__["PieChart"],
        title: "Portfolio",
        items: [
            {
                label: "Holdings",
                href: "/portfolio"
            },
            {
                label: "Transactions",
                href: "/portfolio/transactions"
            },
            {
                label: "Performance",
                href: "/portfolio/performance"
            },
            {
                label: "Rebalance",
                href: "/portfolio/rebalance"
            }
        ]
    },
    {
        id: "research",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"],
        title: "Research",
        items: [
            {
                label: "Stock Screener",
                href: "/screener"
            },
            {
                label: "MF Screener",
                href: "/mf-screener"
            },
            {
                label: "Watchlist",
                href: "/watchlist"
            },
            {
                label: "IPO Center",
                href: "/ipo"
            }
        ]
    },
    {
        id: "macros",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
        title: "Macro & Markets",
        items: [
            {
                label: "Returns Heatmap",
                href: "/macros/heatmap"
            },
            {
                label: "Sector Performance",
                href: "/macros/sector-performance"
            },
            {
                label: "Market Breadth",
                href: "/macros/market-breadth"
            },
            {
                label: "FII / DII Flows",
                href: "/macros/fii-dii"
            },
            {
                label: "Economic Calendar",
                href: "/macros/economic-calendar"
            }
        ]
    },
    {
        id: "portfolio-strategy",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"],
        title: "Portfolio Strategy",
        items: [
            {
                label: "Risk Factor Allocation",
                href: "/analytics/risk-factor-allocation"
            },
            {
                label: "Efficient Frontier",
                href: "/analytics/efficient-frontier"
            },
            {
                label: "Dynamic Allocation",
                href: "/analytics/dynamic-allocation"
            },
            {
                label: "Tactical Allocation",
                href: "/analytics/tactical-allocation"
            }
        ]
    },
    {
        id: "factor-analysis",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"],
        title: "Factor Analysis",
        items: [
            {
                label: "Factor Regression",
                href: "/analytics/factor-regression"
            },
            {
                label: "Fund Factor Regressions",
                href: "/analytics/fund-factor-regressions"
            },
            {
                label: "Principal Component Analysis",
                href: "/analytics/pca"
            },
            {
                label: "Fund Rankings",
                href: "/analytics/fund-rankings"
            }
        ]
    },
    {
        id: "correlations",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"],
        title: "Correlations",
        items: [
            {
                label: "Asset Correlations",
                href: "/analytics/asset-correlations"
            },
            {
                label: "Asset Autocorrelations",
                href: "/analytics/autocorrelations"
            },
            {
                label: "Asset Cointegration",
                href: "/analytics/cointegration"
            }
        ]
    },
    {
        id: "backtest",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"],
        title: "Backtest",
        items: [
            {
                label: "Backtest Strategy",
                href: "/backtest"
            },
            {
                label: "Asset Allocation",
                href: "/analytics/asset-allocation"
            }
        ]
    },
    {
        id: "monte-carlo",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"],
        title: "Monte Carlo & Goals",
        items: [
            {
                label: "Portfolio Simulation",
                href: "/analytics/monte-carlo"
            },
            {
                label: "Financial Goals",
                href: "/analytics/financial-goals"
            }
        ]
    },
    {
        id: "utility-tools",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"],
        title: "Utility Tools",
        items: [
            {
                label: "SIP vs Lumpsum",
                href: "/utilities/sip-vs-lumpsum"
            },
            {
                label: "Smart SIP",
                href: "/utilities/smart-sip"
            },
            {
                label: "FIRE Simulator",
                href: "/utilities/fire-calculator"
            },
            {
                label: "Prepay vs Invest",
                href: "/utilities/prepay-vs-invest"
            },
            {
                label: "Compound Interest",
                href: "/utilities/compound-interest"
            },
            {
                label: "Loan Calculator",
                href: "/utilities/loan-calculator"
            },
            {
                label: "Direct vs Regular",
                href: "/utilities/direct-vs-regular"
            }
        ]
    }
];
function Sidebar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const defaultExpanded = CATEGORIES.filter((cat)=>cat.items.some((item)=>pathname.startsWith(item.href))).map((cat_0)=>cat_0.id)[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("app-nav-theme sticky top-16 z-20 flex h-[calc(100vh-4rem)] shrink-0 flex-col border-r backdrop-blur-xl transition-all duration-300 ease-in-out", collapsed ? "w-16" : "w-[220px]"),
        style: {
            borderColor: "var(--nav-border)",
            background: "var(--nav-bg)",
            boxShadow: "var(--shadow-card)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
            className: "min-h-0 flex-1 py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-2 space-y-0.5",
                    children: MAIN_NAV_ITEMS.map((item_0)=>{
                        const isActive = pathname === item_0.href || item_0.href !== "/dashboard" && pathname.startsWith(item_0.href);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavItem, {
                            icon: item_0.icon,
                            label: item_0.label,
                            href: item_0.href,
                            collapsed: collapsed,
                            active: isActive
                        }, item_0.href, false, {
                            fileName: "[project]/src/components/layout/sidebar.tsx",
                            lineNumber: 188,
                            columnNumber: 18
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/sidebar.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-2",
                    children: !collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Accordion"], {
                        type: "single",
                        collapsible: true,
                        defaultValue: defaultExpanded,
                        className: "space-y-1",
                        children: CATEGORIES.map(({ id, icon: Icon, title, items })=>{
                            const isActiveCategory = items.some((item_1)=>pathname.startsWith(item_1.href));
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                value: id,
                                className: "border-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl px-3 py-2.5 hover:no-underline transition-colors duration-150", isActiveCategory ? "bg-[var(--nav-active-bg)] text-[var(--brand-primary)]" : "hover:bg-[var(--nav-hover-bg)]"),
                                        style: {
                                            color: "var(--nav-text)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 15,
                                                    className: "shrink-0 opacity-80"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[12.5px] font-semibold tracking-tight",
                                                    children: title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/sidebar.tsx",
                                            lineNumber: 205,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 202,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                        className: "pb-1 pt-1.5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative ml-3 mt-1 flex flex-col gap-1.5 pl-6",
                                            style: {
                                                ["--submenu-guide"]: "color-mix(in srgb, var(--brand-primary) 16%, var(--border) 84%)"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pointer-events-none absolute bottom-1 left-2 top-1 w-px -translate-x-1/2 rounded-full",
                                                    style: {
                                                        background: "linear-gradient(to bottom, transparent, var(--submenu-guide), transparent)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 25
                                                }, this),
                                                items.map((item_2)=>{
                                                    const isActive_0 = pathname === item_2.href || pathname.startsWith(item_2.href + '/');
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: item_2.href,
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative rounded-xl px-3 py-2.5 text-[12.5px] font-semibold tracking-tight transition-all duration-150", isActive_0 ? "bg-[var(--nav-active-bg)] text-[var(--brand-primary)] shadow-[inset_0_0_0_1px_var(--selection-border)]" : "text-[color:var(--nav-text-muted)] hover:bg-[var(--nav-hover-bg)] hover:text-[var(--nav-text)]"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute -left-4 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-150", isActive_0 ? "bg-[var(--brand-primary)]" : "bg-[color:var(--border)] group-hover:bg-[var(--brand-primary)]"),
                                                                "aria-hidden": "true"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                                                lineNumber: 220,
                                                                columnNumber: 31
                                                            }, this),
                                                            item_2.label
                                                        ]
                                                    }, item_2.href, true, {
                                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 28
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/sidebar.tsx",
                                            lineNumber: 211,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 210,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, id, true, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 201,
                                columnNumber: 20
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 193,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-0.5",
                        children: CATEGORIES.map(({ id: id_0, icon: Icon_0, title: title_0, items: items_0 })=>{
                            const isActiveCategory_0 = items_0.some((item_3)=>pathname.startsWith(item_3.href));
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCollapsed(false),
                                title: title_0,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full items-center justify-center rounded-xl border-l-[3px] border-transparent p-2 transition-colors duration-150", isActiveCategory_0 ? "bg-[var(--nav-active-bg)] text-[var(--brand-primary)]" : "hover:bg-[var(--nav-hover-bg)]"),
                                style: {
                                    color: "var(--nav-text)",
                                    borderLeftColor: isActiveCategory_0 ? "var(--brand-primary)" : "transparent"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon_0, {
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                    lineNumber: 240,
                                    columnNumber: 21
                                }, this)
                            }, id_0, false, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 236,
                                columnNumber: 20
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 228,
                        columnNumber: 28
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/sidebar.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/sidebar.tsx",
            lineNumber: 184,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/sidebar.tsx",
        lineNumber: 179,
        columnNumber: 10
    }, this);
}
_s(Sidebar, "08JhlLD2LM6Uel+hWLLKL/dSZrM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Sidebar;
function NavItem(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(22);
    if ($[0] !== "c3220b0e7d54c30898eb2b441cbb03c1134401afac6116d540687811ff7e29d8") {
        for(let $i = 0; $i < 22; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c3220b0e7d54c30898eb2b441cbb03c1134401afac6116d540687811ff7e29d8";
    }
    const { icon: Icon, label, href, active, collapsed } = t0;
    const t1 = collapsed ? label : undefined;
    const t2 = collapsed && "justify-center px-0";
    const t3 = active ? "bg-[var(--nav-active-bg)] text-[var(--brand-primary)]" : "hover:bg-[var(--nav-hover-bg)]";
    let t4;
    if ($[1] !== t2 || $[2] !== t3) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12.5px] font-semibold tracking-tight transition-colors duration-150", t2, t3);
        $[1] = t2;
        $[2] = t3;
        $[3] = t4;
    } else {
        t4 = $[3];
    }
    const t5 = active ? "var(--brand-primary)" : "var(--nav-text)";
    let t6;
    if ($[4] !== t5) {
        t6 = {
            color: t5
        };
        $[4] = t5;
        $[5] = t6;
    } else {
        t6 = $[5];
    }
    const t7 = active ? 2.5 : 2;
    const t8 = active ? "var(--brand-primary)" : "var(--text-muted)";
    let t9;
    if ($[6] !== t8) {
        t9 = {
            color: t8
        };
        $[6] = t8;
        $[7] = t9;
    } else {
        t9 = $[7];
    }
    let t10;
    if ($[8] !== Icon || $[9] !== t7 || $[10] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
            size: 15,
            strokeWidth: t7,
            className: "shrink-0 opacity-80",
            style: t9
        }, void 0, false, {
            fileName: "[project]/src/components/layout/sidebar.tsx",
            lineNumber: 300,
            columnNumber: 11
        }, this);
        $[8] = Icon;
        $[9] = t7;
        $[10] = t9;
        $[11] = t10;
    } else {
        t10 = $[11];
    }
    let t11;
    if ($[12] !== collapsed || $[13] !== label) {
        t11 = !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/layout/sidebar.tsx",
            lineNumber: 310,
            columnNumber: 25
        }, this);
        $[12] = collapsed;
        $[13] = label;
        $[14] = t11;
    } else {
        t11 = $[14];
    }
    let t12;
    if ($[15] !== href || $[16] !== t1 || $[17] !== t10 || $[18] !== t11 || $[19] !== t4 || $[20] !== t6) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            title: t1,
            className: t4,
            style: t6,
            children: [
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/sidebar.tsx",
            lineNumber: 319,
            columnNumber: 11
        }, this);
        $[15] = href;
        $[16] = t1;
        $[17] = t10;
        $[18] = t11;
        $[19] = t4;
        $[20] = t6;
        $[21] = t12;
    } else {
        t12 = $[21];
    }
    return t12;
}
_c1 = NavItem;
var _c, _c1;
__turbopack_context__.k.register(_c, "Sidebar");
__turbopack_context__.k.register(_c1, "NavItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-[var(--control-height)] w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-[var(--control-padding-x)] py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand-focus)] focus-visible:border-[var(--brand-primary)] disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/logo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Logo",
    ()=>Logo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
function Logo(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(28);
    if ($[0] !== "3b476f60c77d1d3319758d65e4c986705ee42f2ecb976224cdaf5cdbf6d151ab") {
        for(let $i = 0; $i < 28; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "3b476f60c77d1d3319758d65e4c986705ee42f2ecb976224cdaf5cdbf6d151ab";
    }
    let className;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ className, gradient: t1, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
        $[4] = t1;
    } else {
        className = $[2];
        props = $[3];
        t1 = $[4];
    }
    const gradient = t1 === undefined ? false : t1;
    let t2;
    if ($[5] !== className) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-8 h-8", className);
        $[5] = className;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] !== gradient) {
        t3 = gradient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                id: "artha-signal",
                x1: "12",
                y1: "12",
                x2: "84",
                y2: "84",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                        offset: "0%",
                        stopColor: "#6366F1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/logo.tsx",
                        lineNumber: 45,
                        columnNumber: 94
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                        offset: "100%",
                        stopColor: "#4338CA"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/logo.tsx",
                        lineNumber: 45,
                        columnNumber: 134
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/logo.tsx",
                lineNumber: 45,
                columnNumber: 28
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 45,
            columnNumber: 22
        }, this);
        $[7] = gradient;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    let t4;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
            x: "8",
            y: "8",
            width: "80",
            height: "80",
            rx: "24",
            fill: "currentColor",
            opacity: "0.12"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    const t5 = gradient ? "url(#artha-signal)" : "currentColor";
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M18 59C24 59 26 42 32 42C37 42 38 51 44 51C50 51 50 29 58 29C65 29 64 44 72 44"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 64,
            columnNumber: 10
        }, this);
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M20 68L74 68",
            opacity: "0.28"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 65,
            columnNumber: 10
        }, this);
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M62 22L74 22L74 34"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 66,
            columnNumber: 10
        }, this);
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M58 38L74 22"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 67,
            columnNumber: 10
        }, this);
        $[10] = t6;
        $[11] = t7;
        $[12] = t8;
        $[13] = t9;
    } else {
        t6 = $[10];
        t7 = $[11];
        t8 = $[12];
        t9 = $[13];
    }
    let t10;
    if ($[14] !== t5) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            stroke: t5,
            strokeWidth: "5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
                t6,
                t7,
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 80,
            columnNumber: 11
        }, this);
        $[14] = t5;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    const t11 = gradient ? "url(#artha-signal)" : "currentColor";
    let t12;
    let t13;
    let t14;
    let t15;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "32",
            cy: "42",
            r: "3.25"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 92,
            columnNumber: 11
        }, this);
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "44",
            cy: "51",
            r: "3.25"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 93,
            columnNumber: 11
        }, this);
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "58",
            cy: "29",
            r: "3.25"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 94,
            columnNumber: 11
        }, this);
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "72",
            cy: "44",
            r: "3.25"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 95,
            columnNumber: 11
        }, this);
        $[16] = t12;
        $[17] = t13;
        $[18] = t14;
        $[19] = t15;
    } else {
        t12 = $[16];
        t13 = $[17];
        t14 = $[18];
        t15 = $[19];
    }
    let t16;
    if ($[20] !== t11) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            fill: t11,
            children: [
                t12,
                t13,
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 108,
            columnNumber: 11
        }, this);
        $[20] = t11;
        $[21] = t16;
    } else {
        t16 = $[21];
    }
    let t17;
    if ($[22] !== props || $[23] !== t10 || $[24] !== t16 || $[25] !== t2 || $[26] !== t3) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 96 96",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: t2,
            ...props,
            children: [
                t3,
                t4,
                t10,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/logo.tsx",
            lineNumber: 116,
            columnNumber: 11
        }, this);
        $[22] = props;
        $[23] = t10;
        $[24] = t16;
        $[25] = t2;
        $[26] = t3;
        $[27] = t17;
    } else {
        t17 = $[27];
    }
    return t17;
}
_c = Logo;
var _c;
__turbopack_context__.k.register(_c, "Logo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropdownMenu",
    ()=>DropdownMenu,
    "DropdownMenuCheckboxItem",
    ()=>DropdownMenuCheckboxItem,
    "DropdownMenuContent",
    ()=>DropdownMenuContent,
    "DropdownMenuGroup",
    ()=>DropdownMenuGroup,
    "DropdownMenuItem",
    ()=>DropdownMenuItem,
    "DropdownMenuLabel",
    ()=>DropdownMenuLabel,
    "DropdownMenuPortal",
    ()=>DropdownMenuPortal,
    "DropdownMenuRadioGroup",
    ()=>DropdownMenuRadioGroup,
    "DropdownMenuRadioItem",
    ()=>DropdownMenuRadioItem,
    "DropdownMenuSeparator",
    ()=>DropdownMenuSeparator,
    "DropdownMenuShortcut",
    ()=>DropdownMenuShortcut,
    "DropdownMenuSub",
    ()=>DropdownMenuSub,
    "DropdownMenuSubContent",
    ()=>DropdownMenuSubContent,
    "DropdownMenuSubTrigger",
    ()=>DropdownMenuSubTrigger,
    "DropdownMenuTrigger",
    ()=>DropdownMenuTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRightIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as CircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function DropdownMenu(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
            "data-slot": "dropdown-menu",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 28,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c = DropdownMenu;
function DropdownMenuPortal(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
            "data-slot": "dropdown-menu-portal",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c1 = DropdownMenuPortal;
function DropdownMenuTrigger(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
            "data-slot": "dropdown-menu-trigger",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c2 = DropdownMenuTrigger;
function DropdownMenuContent(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let className;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ className, sideOffset: t1, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
        $[4] = t1;
    } else {
        className = $[2];
        props = $[3];
        t1 = $[4];
    }
    const sideOffset = t1 === undefined ? 4 : t1;
    let t2;
    if ($[5] !== className) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", className);
        $[5] = className;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] !== props || $[8] !== sideOffset || $[9] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dropdown-menu-content",
                sideOffset: sideOffset,
                className: t2,
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 129,
                columnNumber: 40
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 129,
            columnNumber: 10
        }, this);
        $[7] = props;
        $[8] = sideOffset;
        $[9] = t2;
        $[10] = t3;
    } else {
        t3 = $[10];
    }
    return t3;
}
_c3 = DropdownMenuContent;
function DropdownMenuGroup(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
            "data-slot": "dropdown-menu-group",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 159,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c4 = DropdownMenuGroup;
function DropdownMenuSub(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sub"], {
            "data-slot": "dropdown-menu-sub",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 187,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c5 = DropdownMenuSub;
function DropdownMenuRadioGroup(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
            "data-slot": "dropdown-menu-radio-group",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 215,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c6 = DropdownMenuRadioGroup;
function DropdownMenuSubTrigger(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let children;
    let className;
    let inset;
    let props;
    if ($[1] !== t0) {
        ({ className, inset, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = inset;
        $[5] = props;
    } else {
        children = $[2];
        className = $[3];
        inset = $[4];
        props = $[5];
    }
    let t1;
    if ($[6] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent data-[state=open]:bg-accent flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className);
        $[6] = className;
        $[7] = t1;
    } else {
        t1 = $[7];
    }
    let t2;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__["ChevronRightIcon"], {
            className: "ml-auto"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 263,
            columnNumber: 10
        }, this);
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    let t3;
    if ($[9] !== children || $[10] !== inset || $[11] !== props || $[12] !== t1) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubTrigger"], {
            "data-slot": "dropdown-menu-sub-trigger",
            "data-inset": inset,
            className: t1,
            ...props,
            children: [
                children,
                t2
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 270,
            columnNumber: 10
        }, this);
        $[9] = children;
        $[10] = inset;
        $[11] = props;
        $[12] = t1;
        $[13] = t3;
    } else {
        t3 = $[13];
    }
    return t3;
}
_c7 = DropdownMenuSubTrigger;
function DropdownMenuSubContent(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubContent"], {
            "data-slot": "dropdown-menu-sub-content",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 313,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c8 = DropdownMenuSubContent;
function DropdownMenuItem(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(13);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 13; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let className;
    let inset;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ className, inset, variant: t1, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = inset;
        $[4] = props;
        $[5] = t1;
    } else {
        className = $[2];
        inset = $[3];
        props = $[4];
        t1 = $[5];
    }
    const variant = t1 === undefined ? "default" : t1;
    let t2;
    if ($[6] !== className) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className);
        $[6] = className;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    let t3;
    if ($[8] !== inset || $[9] !== props || $[10] !== t2 || $[11] !== variant) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
            "data-slot": "dropdown-menu-item",
            "data-inset": inset,
            "data-variant": variant,
            className: t2,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 363,
            columnNumber: 10
        }, this);
        $[8] = inset;
        $[9] = props;
        $[10] = t2;
        $[11] = variant;
        $[12] = t3;
    } else {
        t3 = $[12];
    }
    return t3;
}
_c9 = DropdownMenuItem;
function DropdownMenuCheckboxItem(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let checked;
    let children;
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, children, checked, ...props } = t0);
        $[1] = t0;
        $[2] = checked;
        $[3] = children;
        $[4] = className;
        $[5] = props;
    } else {
        checked = $[2];
        children = $[3];
        className = $[4];
        props = $[5];
    }
    let t1;
    if ($[6] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className);
        $[6] = className;
        $[7] = t1;
    } else {
        t1 = $[7];
    }
    let t2;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                    className: "size-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                    lineNumber: 414,
                    columnNumber: 143
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 414,
                columnNumber: 106
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 414,
            columnNumber: 10
        }, this);
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    let t3;
    if ($[9] !== checked || $[10] !== children || $[11] !== props || $[12] !== t1) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckboxItem"], {
            "data-slot": "dropdown-menu-checkbox-item",
            className: t1,
            checked: checked,
            ...props,
            children: [
                t2,
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 421,
            columnNumber: 10
        }, this);
        $[9] = checked;
        $[10] = children;
        $[11] = props;
        $[12] = t1;
        $[13] = t3;
    } else {
        t3 = $[13];
    }
    return t3;
}
_c10 = DropdownMenuCheckboxItem;
function DropdownMenuRadioItem(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(12);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 12; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let children;
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
    }
    let t1;
    if ($[5] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className);
        $[5] = className;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    let t2;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__["CircleIcon"], {
                    className: "size-2 fill-current"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                    lineNumber: 468,
                    columnNumber: 143
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 468,
                columnNumber: 106
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 468,
            columnNumber: 10
        }, this);
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    let t3;
    if ($[8] !== children || $[9] !== props || $[10] !== t1) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioItem"], {
            "data-slot": "dropdown-menu-radio-item",
            className: t1,
            ...props,
            children: [
                t2,
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 475,
            columnNumber: 10
        }, this);
        $[8] = children;
        $[9] = props;
        $[10] = t1;
        $[11] = t3;
    } else {
        t3 = $[11];
    }
    return t3;
}
_c11 = DropdownMenuRadioItem;
function DropdownMenuLabel(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let className;
    let inset;
    let props;
    if ($[1] !== t0) {
        ({ className, inset, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = inset;
        $[4] = props;
    } else {
        className = $[2];
        inset = $[3];
        props = $[4];
    }
    let t1;
    if ($[5] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-2 py-1.5 text-xs font-medium text-muted-foreground data-[inset]:pl-8", className);
        $[5] = className;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    let t2;
    if ($[7] !== inset || $[8] !== props || $[9] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            "data-slot": "dropdown-menu-label",
            "data-inset": inset,
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 521,
            columnNumber: 10
        }, this);
        $[7] = inset;
        $[8] = props;
        $[9] = t1;
        $[10] = t2;
    } else {
        t2 = $[10];
    }
    return t2;
}
_c12 = DropdownMenuLabel;
function DropdownMenuSeparator(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border -mx-1 my-1 h-px", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
            "data-slot": "dropdown-menu-separator",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 563,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c13 = DropdownMenuSeparator;
function DropdownMenuShortcut(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2122892d08ffc484bcf04e925b8cfa9060286ea59a41da25a14a104b9f4bbfd6";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground ml-auto text-xs tracking-widest", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            "data-slot": "dropdown-menu-shortcut",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 604,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c14 = DropdownMenuShortcut;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14;
__turbopack_context__.k.register(_c, "DropdownMenu");
__turbopack_context__.k.register(_c1, "DropdownMenuPortal");
__turbopack_context__.k.register(_c2, "DropdownMenuTrigger");
__turbopack_context__.k.register(_c3, "DropdownMenuContent");
__turbopack_context__.k.register(_c4, "DropdownMenuGroup");
__turbopack_context__.k.register(_c5, "DropdownMenuSub");
__turbopack_context__.k.register(_c6, "DropdownMenuRadioGroup");
__turbopack_context__.k.register(_c7, "DropdownMenuSubTrigger");
__turbopack_context__.k.register(_c8, "DropdownMenuSubContent");
__turbopack_context__.k.register(_c9, "DropdownMenuItem");
__turbopack_context__.k.register(_c10, "DropdownMenuCheckboxItem");
__turbopack_context__.k.register(_c11, "DropdownMenuRadioItem");
__turbopack_context__.k.register(_c12, "DropdownMenuLabel");
__turbopack_context__.k.register(_c13, "DropdownMenuSeparator");
__turbopack_context__.k.register(_c14, "DropdownMenuShortcut");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/topbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopBar",
    ()=>TopBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bookmark.js [app-client] (ecmascript) <export default as Bookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/monitor.js [app-client] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$watchlist$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/watchlist-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/theme-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
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
;
;
const PROFILE_MENU_THEME_OPTIONS = [
    {
        id: "light",
        label: "Light",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"]
    },
    {
        id: "dark",
        label: "Dark",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"]
    },
    {
        id: "system",
        label: "System",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"]
    }
];
function TopBar() {
    _s();
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchOpen, setSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const searchRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { toggleWatchlist } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$watchlist$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatchlist"])();
    const { theme, setTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopBar.useEffect": ()=>{
            if (!search.trim()) {
                setSearchResults([]);
                setSearchOpen(false);
                return;
            }
            const timer = setTimeout({
                "TopBar.useEffect.timer": async ()=>{
                    try {
                        const res = await fetch(`/api/search?q=${encodeURIComponent(search)}&limit=8`);
                        if (res.ok) {
                            const data = await res.json();
                            setSearchResults(data.results ?? []);
                            setSearchOpen(true);
                        }
                    } finally{}
                }
            }["TopBar.useEffect.timer"], 250);
            return ({
                "TopBar.useEffect": ()=>clearTimeout(timer)
            })["TopBar.useEffect"];
        }
    }["TopBar.useEffect"], [
        search
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopBar.useEffect": ()=>{
            const handler = {
                "TopBar.useEffect.handler": (e)=>{
                    if (searchRef.current && !searchRef.current.contains(e.target)) {
                        setSearchOpen(false);
                    }
                }
            }["TopBar.useEffect.handler"];
            document.addEventListener("mousedown", handler);
            return ({
                "TopBar.useEffect": ()=>document.removeEventListener("mousedown", handler)
            })["TopBar.useEffect"];
        }
    }["TopBar.useEffect"], []);
    const openSettings = (section)=>{
        router.push(section ? `/settings?section=${section}` : "/settings");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 flex h-16 w-full min-w-0 items-center justify-between border-b px-3 md:px-5 shrink-0 backdrop-blur-xl",
        style: {
            background: "color-mix(in srgb, var(--surface) 92%, transparent)",
            borderColor: "var(--border)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 shrink-0 items-center gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/dashboard",
                    className: "flex items-center gap-2 group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-10 w-10 items-center justify-center rounded-xl border",
                            style: {
                                background: "var(--brand-tint)",
                                borderColor: "color-mix(in srgb, var(--brand-primary) 20%, var(--border) 80%)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logo"], {
                                className: "h-7 w-7 text-[var(--brand-primary)]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/topbar.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/topbar.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold text-[17px] tracking-tight",
                            style: {
                                color: "var(--text-primary)"
                            },
                            children: "Artha"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/topbar.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/topbar.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/topbar.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 flex-1 justify-center px-2 md:px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: searchRef,
                    className: "relative w-full max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            size: 15,
                            className: "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none",
                            style: {
                                color: "var(--text-muted)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/topbar.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            value: search,
                            onChange: (e_0)=>setSearch(e_0.target.value),
                            onFocus: ()=>{
                                if (searchResults.length > 0) setSearchOpen(true);
                            },
                            placeholder: "Search stocks, e.g. Reliance, TCS…",
                            className: "pl-9 text-sm w-full rounded-xl",
                            style: {
                                background: "var(--surface)",
                                color: "var(--text-primary)",
                                borderColor: "var(--border)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/topbar.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        searchOpen && searchResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-full mt-2 w-full rounded-2xl border shadow-lg overflow-hidden z-50",
                            style: {
                                background: "var(--surface)",
                                borderColor: "var(--border)",
                                boxShadow: "var(--shadow-card)"
                            },
                            children: searchResults.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-full flex items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-[var(--surface-hover)]",
                                    style: {
                                        borderBottom: "1px solid color-mix(in srgb, var(--border) 58%, transparent)"
                                    },
                                    onClick: ()=>{
                                        router.push(`/stocks/${r.symbol}`);
                                        setSearchOpen(false);
                                        setSearch("");
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex min-w-[68px] items-center justify-center rounded-full px-2.5 py-1 font-mono text-xs font-semibold",
                                            style: {
                                                color: "var(--brand-primary)",
                                                background: "var(--brand-tint)"
                                            },
                                            children: r.symbol
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/topbar.tsx",
                                            lineNumber: 123,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm truncate",
                                            style: {
                                                color: "var(--text-secondary)"
                                            },
                                            children: r.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/topbar.tsx",
                                            lineNumber: 129,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, `${r.symbol}-${r.id}`, true, {
                                    fileName: "[project]/src/components/layout/topbar.tsx",
                                    lineNumber: 116,
                                    columnNumber: 39
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/topbar.tsx",
                            lineNumber: 111,
                            columnNumber: 54
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/topbar.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/topbar.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex shrink-0 items-center gap-2 justify-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleWatchlist,
                        className: "relative flex h-[var(--control-height)] items-center gap-2 rounded-lg border px-3 transition-all active:scale-95 group",
                        style: {
                            color: "var(--brand-primary)",
                            background: "var(--brand-tint)",
                            borderColor: "transparent"
                        },
                        title: "Watchlist",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                size: 16,
                                className: "transition-colors group-hover:text-[var(--brand-hover)]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/topbar.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold transition-colors group-hover:text-[var(--brand-hover)]",
                                children: "Watchlist"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/topbar.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/topbar.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "topbar-profile-menu-trigger",
                                    type: "button",
                                    className: "ml-1 flex h-10 items-center gap-1 rounded-full border px-1.5 transition-colors",
                                    style: {
                                        background: "var(--surface)",
                                        borderColor: "var(--border)",
                                        color: "var(--text-secondary)",
                                        boxShadow: "var(--shadow-card)"
                                    },
                                    title: "Profile menu",
                                    "aria-label": "Open profile menu",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold",
                                            style: {
                                                background: "var(--brand-primary)",
                                                color: "#fff"
                                            },
                                            children: "RK"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/topbar.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            size: 14,
                                            style: {
                                                color: "var(--text-muted)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/topbar.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/topbar.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/topbar.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                id: "topbar-profile-menu-content",
                                align: "end",
                                sideOffset: 10,
                                className: "w-64 rounded-2xl border p-1.5",
                                style: {
                                    background: "var(--surface)",
                                    borderColor: "var(--border)",
                                    boxShadow: "var(--shadow-card)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                        className: "px-3 py-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold",
                                                    style: {
                                                        background: "var(--brand-primary)",
                                                        color: "#fff"
                                                    },
                                                    children: "RK"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/topbar.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "truncate text-sm font-semibold",
                                                            style: {
                                                                color: "var(--text-primary)"
                                                            },
                                                            children: "Rahul Kumar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/topbar.tsx",
                                                            lineNumber: 182,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "truncate text-xs",
                                                            style: {
                                                                color: "var(--text-secondary)"
                                                            },
                                                            children: "rahul@example.com"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/topbar.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/layout/topbar.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/topbar.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/topbar.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                        fileName: "[project]/src/components/layout/topbar.tsx",
                                        lineNumber: 196,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                        onSelect: ()=>openSettings("profile"),
                                        className: "rounded-xl px-3 py-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                size: 15,
                                                style: {
                                                    color: "var(--brand-primary)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/topbar.tsx",
                                                lineNumber: 199,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Profile & Account"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/topbar.tsx",
                                                lineNumber: 202,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/topbar.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                        onSelect: ()=>openSettings("notifications"),
                                        className: "rounded-xl px-3 py-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                size: 15,
                                                style: {
                                                    color: "var(--brand-primary)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/topbar.tsx",
                                                lineNumber: 205,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Notifications"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/topbar.tsx",
                                                lineNumber: 208,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/topbar.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                        onSelect: ()=>openSettings("appearance"),
                                        className: "rounded-xl px-3 py-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                                                size: 15,
                                                style: {
                                                    color: "var(--brand-primary)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/topbar.tsx",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Appearance"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/topbar.tsx",
                                                lineNumber: 214,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/topbar.tsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                        onSelect: ()=>openSettings(),
                                        className: "rounded-xl px-3 py-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                size: 15,
                                                style: {
                                                    color: "var(--brand-primary)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/topbar.tsx",
                                                lineNumber: 217,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Settings"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/topbar.tsx",
                                                lineNumber: 220,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/topbar.tsx",
                                        lineNumber: 216,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                        fileName: "[project]/src/components/layout/topbar.tsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                        className: "px-3 pb-1 pt-2 text-[11px] uppercase tracking-[0.08em]",
                                        children: "Quick Theme"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/topbar.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuRadioGroup"], {
                                        value: theme,
                                        onValueChange: (value)=>setTheme(value),
                                        children: PROFILE_MENU_THEME_OPTIONS.map((option)=>{
                                            const Icon = option.icon;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuRadioItem"], {
                                                value: option.id,
                                                className: "rounded-xl px-3 py-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        size: 15,
                                                        style: {
                                                            color: "var(--brand-primary)"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/topbar.tsx",
                                                        lineNumber: 232,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: option.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/topbar.tsx",
                                                        lineNumber: 235,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, option.id, true, {
                                                fileName: "[project]/src/components/layout/topbar.tsx",
                                                lineNumber: 231,
                                                columnNumber: 22
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/topbar.tsx",
                                        lineNumber: 228,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/topbar.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/topbar.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/topbar.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/topbar.tsx",
        lineNumber: 76,
        columnNumber: 10
    }, this);
}
_s(TopBar, "73IrgVhxrK/8Hs54i1vPCB+OoII=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$watchlist$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatchlist"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$theme$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = TopBar;
var _c;
__turbopack_context__.k.register(_c, "TopBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/store/useChartStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChartStore",
    ()=>useChartStore
]);
/**
 * useChartStore — Zustand store for all chart UI state.
 *
 * Keeps: active timeframe, chart type, indicator configs, drawing state,
 * active tool, layout metadata, and fullscreen flag.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useChartStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeWithSelector"])((set, get)=>({
        // ── Defaults ────────────────────────────────────────────────────────────
        symbol: '',
        timeframe: '1D',
        chartType: 'candlestick',
        isDark: false,
        isFullscreen: false,
        indicators: [],
        drawings: [],
        activeTool: 'cursor',
        alerts: [],
        savedLayouts: [],
        activeLayoutId: null,
        showDataWindow: true,
        showWatchlist: false,
        showLayoutPanel: false,
        // ── Actions ─────────────────────────────────────────────────────────────
        setSymbol: (symbol)=>set({
                symbol
            }),
        setTimeframe: (tf)=>set({
                timeframe: tf
            }),
        setChartType: (type)=>set({
                chartType: type
            }),
        toggleDark: ()=>set((s)=>({
                    isDark: !s.isDark
                })),
        toggleFullscreen: ()=>set((s)=>({
                    isFullscreen: !s.isFullscreen
                })),
        addIndicator: (config)=>set((s)=>({
                    indicators: [
                        ...s.indicators,
                        config
                    ]
                })),
        updateIndicator: (id, patch)=>set((s)=>({
                    indicators: s.indicators.map((ind)=>ind.id === id ? {
                            ...ind,
                            ...patch
                        } : ind)
                })),
        removeIndicator: (id)=>set((s)=>({
                    indicators: s.indicators.filter((ind)=>ind.id !== id)
                })),
        addDrawing: (drawing)=>set((s)=>({
                    drawings: [
                        ...s.drawings,
                        drawing
                    ]
                })),
        updateDrawing: (id, patch)=>set((s)=>({
                    drawings: s.drawings.map((d)=>d.id === id ? {
                            ...d,
                            ...patch
                        } : d)
                })),
        removeDrawing: (id)=>set((s)=>({
                    drawings: s.drawings.filter((d)=>d.id !== id)
                })),
        clearDrawings: ()=>set({
                drawings: []
            }),
        setActiveTool: (tool)=>set({
                activeTool: tool
            }),
        addAlert: (alert)=>set((s)=>({
                    alerts: [
                        ...s.alerts,
                        alert
                    ]
                })),
        removeAlert: (id)=>set((s)=>({
                    alerts: s.alerts.filter((a)=>a.id !== id)
                })),
        toggleAlert: (id)=>set((s)=>({
                    alerts: s.alerts.map((a)=>a.id === id ? {
                            ...a,
                            active: !a.active
                        } : a)
                })),
        setSavedLayouts: (layouts)=>set({
                savedLayouts: layouts
            }),
        setActiveLayoutId: (id)=>set({
                activeLayoutId: id
            }),
        toggleDataWindow: ()=>set((s)=>({
                    showDataWindow: !s.showDataWindow
                })),
        toggleWatchlist: ()=>set((s)=>({
                    showWatchlist: !s.showWatchlist
                })),
        toggleLayoutPanel: ()=>set((s)=>({
                    showLayoutPanel: !s.showLayoutPanel
                })),
        resetForSymbol: (symbol)=>{
            const { isDark, isFullscreen, showDataWindow, showWatchlist } = get();
            set({
                symbol,
                indicators: [],
                drawings: [],
                activeTool: 'cursor',
                alerts: [],
                activeLayoutId: null,
                isDark,
                isFullscreen,
                showDataWindow,
                showWatchlist
            });
        }
    })));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/emojis.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Generated Sector and Industry Group Emojis Mapping
__turbopack_context__.s([
    "INDUSTRY_GROUP_EMOJIS",
    ()=>INDUSTRY_GROUP_EMOJIS,
    "SECTOR_EMOJIS",
    ()=>SECTOR_EMOJIS,
    "getIndustryGroupEmoji",
    ()=>getIndustryGroupEmoji,
    "getSectorEmoji",
    ()=>getSectorEmoji
]);
const SECTOR_EMOJIS = {
    "Financial Svcs": "🏦",
    "Finance": "💳",
    "Banks": "🏛️",
    "Chemicals": "🧪",
    "Paper & Paper Products": "📜",
    "Apparel": "👕",
    "Food": "🍔",
    "Medical": "🏥",
    "Healthcare": "⚕️",
    "Bldg": "🏗️",
    "Leisure": "🏖️",
    "Auto Manufacturers": "🏭",
    "Auto/Truck": "🚙",
    "Agricultural Operations": "🚜",
    "Computer": "💻",
    "Computer Sftwr": "💾",
    "Comp Sftwr": "👨‍💻",
    "Insurance": "🛡️",
    "Electrical": "⚡",
    "Aerospace/Defense": "🚀",
    "Machinery": "⚙️",
    "Utility": "🔌",
    "Utilities": "💡",
    "Transportation": "🚆",
    "Transport": "🚚",
    "Comml Svcs": "🏢",
    "Cosmetics/Personal Care": "💄",
    "Oil&Gas": "🛢️",
    "Energy": "🔋",
    "Metal Proc & Fabrication": "🛠️",
    "Steel": "🔩",
    "Tobacco": "🚬",
    "Retail/Whlsle": "🏪",
    "Retail": "🛍️",
    "Wholesale": "📦",
    "Pollution Control": "♻️",
    "Hsehold": "🏠",
    "Hsehold/Office Furniture": "🪑",
    "Office Supplies Mfg": "🖇️",
    "Containers/Packaging": "🥡",
    "Real Estate Dvlpmt/Ops": "🏙️",
    "Mining": "⛏️",
    "Media": "📰",
    "Beverages": "🥤",
    "Telecom Svcs": "📡",
    "Telecom": "📱",
    "Diversified Operations": "🌐",
    "Consumer Svcs": "🛎️",
    "Elec": "🔌",
    "Trucks & Parts": "🚛",
    "Electronic": "📺",
    "Internet": "🌐",
    "Soap & Clng Preparatns": "🧼",
    "Security/Sfty": "🔒",
    "Consumer Prod": "🧴",
    "Metal Prds": "🔧",
    "Group Not Available": "❓",
    "Industrials": "🏗️",
    "Commodities": "🌾",
    "Financial Services": "🏦",
    "Information Technology": "💻",
    "Diversified": "🌐",
    "Services": "🛎️",
    "Consumer Discretionary": "🛍️",
    "Fast Moving Consumer Goods": "🛒",
    "Telecommunication": "📡"
};
const INDUSTRY_GROUP_EMOJIS = {
    "Banks-Private Sector": "🏛️",
    "Banks-Public Sector": "🏦",
    "Finance-NBFC": "💳",
    "Finance-Housing": "🏠",
    "Software-Services": "👨‍💻",
    "IT-Services": "💻",
    "Chemicals-Specialty": "🧪",
    "Pharmaceuticals-Indian": "💊",
    "Banks-Money Center": "🏛️",
    "Computer-Tech Services": "💻",
    "Oil&Gas-Integrated": "🛢️",
    "Electronic-Consumer": "📺",
    "Internet-Services": "🌐"
};
function getSectorEmoji(sector) {
    if (!sector) return "🏢";
    // Try exact match first
    if (SECTOR_EMOJIS[sector]) {
        return SECTOR_EMOJIS[sector];
    }
    // Fallback heuristics
    const s = sector.toLowerCase();
    if (s.includes("bank") || s.includes("financ")) return "🏦";
    if (s.includes("tech") || s.includes("soft") || s.includes("it")) return "💻";
    if (s.includes("health") || s.includes("pharm") || s.includes("medic")) return "🏥";
    if (s.includes("auto") || s.includes("motor")) return "🚗";
    if (s.includes("fmcg") || s.includes("food") || s.includes("beverag")) return "🛒";
    if (s.includes("chem")) return "🧪";
    if (s.includes("metal") || s.includes("steel")) return "🔩";
    if (s.includes("power") || s.includes("energy") || s.includes("gas") || s.includes("oil")) return "⚡";
    if (s.includes("infra") || s.includes("construct") || s.includes("real est")) return "🏗️";
    if (s.includes("telecom")) return "📡";
    if (s.includes("retail")) return "🛍️";
    if (s.includes("media") || s.includes("entertain")) return "🎬";
    return "🏭"; // Generic industry fallback
}
function getIndustryGroupEmoji(group) {
    if (!group) return "🏭";
    if (INDUSTRY_GROUP_EMOJIS[group]) {
        return INDUSTRY_GROUP_EMOJIS[group];
    }
    // Fallback heuristics for industry groups
    const g = group.toLowerCase();
    if (g.includes("bank")) return "🏛️";
    if (g.includes("financ") || g.includes("nbfc") || g.includes("credit") || g.includes("invest")) return "💳";
    if (g.includes("software") || g.includes("it-")) return "��";
    if (g.includes("pharm") || g.includes("bio") || g.includes("medic")) return "💊";
    if (g.includes("health") || g.includes("hosp")) return "🏥";
    if (g.includes("auto") || g.includes("vehic") || g.includes("tyre")) return "🚗";
    if (g.includes("chem") || g.includes("fertil") || g.includes("pestic")) return "🧪";
    if (g.includes("fmcg") || g.includes("food") || g.includes("agro") || g.includes("dairy")) return "🥐";
    if (g.includes("metal") || g.includes("steel") || g.includes("iron") || g.includes("alumin")) return "🔩";
    if (g.includes("power") || g.includes("electr") || g.includes("energy") || g.includes("utilit")) return "⚡";
    if (g.includes("gas") || g.includes("oil") || g.includes("petrol")) return "🛢️";
    if (g.includes("construct") || g.includes("infra") || g.includes("cement") || g.includes("build")) return "🏗️";
    if (g.includes("real est") || g.includes("realty")) return "🏙️";
    if (g.includes("telecom") || g.includes("cable")) return "📡";
    if (g.includes("retail") || g.includes("consum")) return "🛍️";
    if (g.includes("media") || g.includes("tv") || g.includes("cinema")) return "📺";
    if (g.includes("textil") || g.includes("apparel") || g.includes("cloth")) return "👕";
    if (g.includes("paper") || g.includes("wood") || g.includes("laminat")) return "📜";
    if (g.includes("travel") || g.includes("hotel") || g.includes("tourism") || g.includes("leisur")) return "🏖️";
    if (g.includes("transport") || g.includes("logist") || g.includes("ship") || g.includes("courier")) return "🚚";
    if (g.includes("plastic") || g.includes("packag") || g.includes("contain")) return "📦";
    if (g.includes("machin") || g.includes("equip") || g.includes("engin")) return "⚙️";
    return "🏭"; // Generic industry fallback
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer", {
    variants: {
        variant: {
            default: "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] shadow-sm",
            destructive: "bg-[var(--bear-tint)] text-[var(--bear-strong)] hover:opacity-90 shadow-sm",
            outline: "border border-[var(--border)] bg-transparent hover:bg-[var(--surface-hover)] hover:border-[var(--brand-primary)] text-[var(--text-primary)]",
            selected: "border border-[var(--selection-border)] bg-[var(--selection-bg)] text-[var(--selection-text)] hover:bg-[var(--selection-bg-hover)] shadow-[var(--selection-shadow)]",
            secondary: "bg-[var(--brand-tint)] text-[var(--brand-primary)] hover:opacity-90",
            ghost: "hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
            link: "text-[var(--brand-primary)] underline-offset-4 hover:text-[var(--brand-hover)] hover:underline"
        },
        size: {
            default: "h-[var(--control-height)] px-4 py-2",
            sm: "h-[var(--control-height-sm)] rounded-lg px-3 text-xs",
            lg: "h-[calc(var(--control-height)+0.25rem)] rounded-lg px-8",
            icon: "h-[var(--control-height)] w-[var(--control-height)]"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 48,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Select = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-9 w-full appearance-none items-center justify-between whitespace-nowrap rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-brand)] disabled:cursor-not-allowed disabled:opacity-50 [&>option]:text-[var(--text-primary)] [&>option]:bg-[var(--surface-elevated)]", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 8,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/20advantage/svg",
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "h-4 w-4 opacity-50 text-[var(--text-primary)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "m6 9 6 6 6-6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/select.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 17,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 7,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Select;
Select.displayName = "Select";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Select$React.forwardRef");
__turbopack_context__.k.register(_c1, "Select");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript) <export * as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function Dialog(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Root, {
            "data-slot": "dialog",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 29,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c = Dialog;
function DialogTrigger(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Trigger, {
            "data-slot": "dialog-trigger",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 57,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c1 = DialogTrigger;
function DialogPortal(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Portal, {
            "data-slot": "dialog-portal",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 85,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c2 = DialogPortal;
function DialogClose(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Close, {
            "data-slot": "dialog-close",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 113,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c3 = DialogClose;
function DialogOverlay(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Overlay, {
            "data-slot": "dialog-overlay",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 153,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c4 = DialogOverlay;
function DialogContent(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let children;
    let className;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ className, children, showCloseButton: t1, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
        $[5] = t1;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
        t1 = $[5];
    }
    const showCloseButton = t1 === undefined ? true : t1;
    let t2;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 195,
            columnNumber: 10
        }, this);
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] !== className) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg", className);
        $[7] = className;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    let t4;
    if ($[9] !== showCloseButton) {
        t4 = showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Close, {
            "data-slot": "dialog-close",
            className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                    fileName: "[project]/src/components/ui/dialog.tsx",
                    lineNumber: 210,
                    columnNumber: 443
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "sr-only",
                    children: "Close"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dialog.tsx",
                    lineNumber: 210,
                    columnNumber: 452
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 210,
            columnNumber: 29
        }, this);
        $[9] = showCloseButton;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    let t5;
    if ($[11] !== children || $[12] !== props || $[13] !== t3 || $[14] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
            "data-slot": "dialog-portal",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Content, {
                    "data-slot": "dialog-content",
                    className: t3,
                    ...props,
                    children: [
                        children,
                        t4
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/dialog.tsx",
                    lineNumber: 218,
                    columnNumber: 54
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 218,
            columnNumber: 10
        }, this);
        $[11] = children;
        $[12] = props;
        $[13] = t3;
        $[14] = t4;
        $[15] = t5;
    } else {
        t5 = $[15];
    }
    return t5;
}
_c5 = DialogContent;
function DialogHeader(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-slot": "dialog-header",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 261,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c6 = DialogHeader;
function DialogFooter(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(15);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 15; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let children;
    let className;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ className, showCloseButton: t1, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
        $[5] = t1;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
        t1 = $[5];
    }
    const showCloseButton = t1 === undefined ? false : t1;
    let t2;
    if ($[6] !== className) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className);
        $[6] = className;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    let t3;
    if ($[8] !== showCloseButton) {
        t3 = showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Close, {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                children: "Close"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 311,
                columnNumber: 67
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 311,
            columnNumber: 29
        }, this);
        $[8] = showCloseButton;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    let t4;
    if ($[10] !== children || $[11] !== props || $[12] !== t2 || $[13] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-slot": "dialog-footer",
            className: t2,
            ...props,
            children: [
                children,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 319,
            columnNumber: 10
        }, this);
        $[10] = children;
        $[11] = props;
        $[12] = t2;
        $[13] = t3;
        $[14] = t4;
    } else {
        t4 = $[14];
    }
    return t4;
}
_c7 = DialogFooter;
function DialogTitle(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Title, {
            "data-slot": "dialog-title",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 362,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c8 = DialogTitle;
function DialogDescription(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e56c395fb1c0bb460cc31e9d38e2066b387c2d06bf58c4e90b63f450ed7c70cb";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Description, {
            "data-slot": "dialog-description",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dialog.tsx",
            lineNumber: 403,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/charting/widgets/WatchlistPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_WATCHLIST",
    ()=>DEFAULT_WATCHLIST,
    "DEFAULT_WATCHLIST_CONFIG",
    ()=>DEFAULT_WATCHLIST_CONFIG,
    "WatchlistPanel",
    ()=>WatchlistPanel,
    "getWatchlistPanelWidth",
    ()=>getWatchlistPanelWidth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/store/useChartStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$emojis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/emojis.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
const WATCHLIST_PANEL_SYMBOL_WIDTH = 100;
const WATCHLIST_PANEL_INDUSTRY_WIDTH = 24;
const WATCHLIST_PANEL_CHANGE_WIDTH = 72;
const WATCHLIST_PANEL_PRICE_WIDTH = 88;
const WATCHLIST_PANEL_PADDING_WIDTH = 36;
const WATCHLIST_MAX_CUSTOM_COLUMNS = 10;
const WATCHLIST_METRICS = [
    {
        key: 'rvol1',
        label: 'RVol',
        shortLabel: 'RVol',
        width: 64,
        kind: 'number',
        periodOptions: [
            1,
            5,
            10,
            20
        ]
    },
    {
        key: 'atr',
        label: 'ATR',
        shortLabel: 'ATR',
        width: 64,
        kind: 'number',
        periodOptions: [
            7,
            14,
            21
        ]
    },
    {
        key: 'natr',
        label: 'NATR',
        shortLabel: 'NATR',
        width: 64,
        kind: 'percent',
        periodOptions: [
            7,
            14,
            21
        ]
    },
    {
        key: 'pe',
        label: 'P/E',
        shortLabel: 'P/E',
        width: 60,
        kind: 'multiple'
    },
    {
        key: 'pb',
        label: 'P/B',
        shortLabel: 'P/B',
        width: 60,
        kind: 'multiple'
    },
    {
        key: 'roe',
        label: 'ROE',
        shortLabel: 'ROE',
        width: 60,
        kind: 'percent'
    },
    {
        key: 'roce',
        label: 'ROCE',
        shortLabel: 'ROCE',
        width: 60,
        kind: 'percent'
    },
    {
        key: 'debtToEquity',
        label: 'Debt / Eq',
        shortLabel: 'D/E',
        width: 64,
        kind: 'multiple'
    },
    {
        key: 'dividendYield',
        label: 'Dividend Yield',
        shortLabel: 'Div Yld',
        width: 64,
        kind: 'percent'
    },
    {
        key: 'salesGrowth',
        label: 'Sales Growth',
        shortLabel: 'Sales Gr',
        width: 64,
        kind: 'percent'
    },
    {
        key: 'profitGrowth',
        label: 'Profit Growth',
        shortLabel: 'Profit Gr',
        width: 64,
        kind: 'percent'
    },
    {
        key: 'marketCap',
        label: 'Market Cap',
        shortLabel: 'MCap',
        width: 72,
        kind: 'currencyCompact'
    }
];
const METRIC_DEFINITIONS = Object.fromEntries(_c1 = WATCHLIST_METRICS.map(_c = (metric)=>[
        metric.key,
        metric
    ]));
_c2 = METRIC_DEFINITIONS;
const TECHNICAL_METRIC_KEYS = [
    'rvol1',
    'atr',
    'natr'
];
const FUNDAMENTAL_METRIC_KEYS = [
    'pe',
    'pb',
    'roe',
    'roce',
    'debtToEquity',
    'dividendYield',
    'salesGrowth',
    'profitGrowth',
    'marketCap'
];
const DEFAULT_WATCHLIST = [
    {
        symbol: 'RELIANCE',
        name: 'Reliance Industries',
        price: 2984.5,
        change: 1.23,
        industryGroup: 'Oil&Gas-Integrated',
        rvol1: 1.84,
        atr: 72.4,
        natr: 2.43,
        pe: 28.1,
        pb: 2.1,
        roe: 8.4,
        roce: 9.8,
        debtToEquity: 0.34,
        dividendYield: 0.37,
        salesGrowth: 11.6,
        profitGrowth: 7.8,
        marketCap: 2015
    },
    {
        symbol: 'TCS',
        name: 'Tata Consultancy Services',
        price: 4120.3,
        change: -1.08,
        industryGroup: 'Computer-Tech Services',
        rvol1: 0.91,
        atr: 94.2,
        natr: 2.29,
        pe: 31.4,
        pb: 14.1,
        roe: 45.8,
        roce: 58.2,
        debtToEquity: 0.02,
        dividendYield: 1.24,
        salesGrowth: 8.6,
        profitGrowth: 9.1,
        marketCap: 1492
    },
    {
        symbol: 'HDFCBANK',
        name: 'HDFC Bank',
        price: 1642.15,
        change: 0.34,
        industryGroup: 'Banks-Money Center',
        rvol1: 1.12,
        atr: 31.7,
        natr: 1.93,
        pe: 19.7,
        pb: 2.8,
        roe: 14.7,
        roce: 8.9,
        debtToEquity: 5.91,
        dividendYield: 0.95,
        salesGrowth: 15.2,
        profitGrowth: 18.4,
        marketCap: 1254
    },
    {
        symbol: 'INFY',
        name: 'Infosys',
        price: 1540,
        change: -0.79,
        industryGroup: 'Computer-Tech Services',
        rvol1: 1.06,
        atr: 34.6,
        natr: 2.25,
        pe: 24.9,
        pb: 7.6,
        roe: 31.2,
        roce: 39.5,
        debtToEquity: 0.05,
        dividendYield: 2.12,
        salesGrowth: 6.8,
        profitGrowth: 8.4,
        marketCap: 639
    },
    {
        symbol: 'ICICIBANK',
        name: 'ICICI Bank',
        price: 1148.9,
        change: 1.46,
        industryGroup: 'Banks-Money Center',
        rvol1: 1.35,
        atr: 26.1,
        natr: 2.27,
        pe: 18.4,
        pb: 3.2,
        roe: 17.9,
        roce: 9.5,
        debtToEquity: 5.42,
        dividendYield: 0.68,
        salesGrowth: 20.6,
        profitGrowth: 23.7,
        marketCap: 811
    },
    {
        symbol: 'SBIN',
        name: 'State Bank of India',
        price: 780.45,
        change: 1.58,
        industryGroup: 'Banks-Money Center',
        rvol1: 1.41,
        atr: 21.6,
        natr: 2.77,
        pe: 9.8,
        pb: 1.6,
        roe: 16.4,
        roce: 8.1,
        debtToEquity: 8.42,
        dividendYield: 1.42,
        salesGrowth: 18.5,
        profitGrowth: 21.3,
        marketCap: 696
    },
    {
        symbol: 'BAJFINANCE',
        name: 'Bajaj Finance',
        price: 7200.8,
        change: -0.68,
        industryGroup: 'Finance-Consumer Loans',
        rvol1: 0.88,
        atr: 145.3,
        natr: 2.02,
        pe: 29.8,
        pb: 5.4,
        roe: 20.1,
        roce: 12.8,
        debtToEquity: 3.71,
        dividendYield: 0.48,
        salesGrowth: 24.6,
        profitGrowth: 27.5,
        marketCap: 447
    },
    {
        symbol: 'ADANIENT',
        name: 'Adani Enterprises',
        price: 2980,
        change: 3.22,
        industryGroup: 'Trading & Logistics',
        rvol1: 1.93,
        atr: 126.4,
        natr: 4.24,
        pe: 92.5,
        pb: 8.8,
        roe: 9.2,
        roce: 10.4,
        debtToEquity: 1.34,
        dividendYield: 0,
        salesGrowth: 28.9,
        profitGrowth: 16.3,
        marketCap: 340
    },
    {
        symbol: 'TATAMOTORS',
        name: 'Tata Motors',
        price: 870.9,
        change: -2.1,
        industryGroup: 'Auto-Cars/Passenger Vehicles',
        rvol1: 1.52,
        atr: 29.4,
        natr: 3.38,
        pe: 10.6,
        pb: 2.3,
        roe: 19.7,
        roce: 16.9,
        debtToEquity: 0.78,
        dividendYield: 0.72,
        salesGrowth: 14.3,
        profitGrowth: 19.8,
        marketCap: 320
    },
    {
        symbol: 'ASIANPAINT',
        name: 'Asian Paints',
        price: 2891.2,
        change: 0.52,
        industryGroup: 'Chemicals-Paints',
        rvol1: 0.76,
        atr: 68.1,
        natr: 2.36,
        pe: 52.8,
        pb: 14.3,
        roe: 27.4,
        roce: 33.5,
        debtToEquity: 0.11,
        dividendYield: 0.91,
        salesGrowth: 9.2,
        profitGrowth: 11.4,
        marketCap: 277
    }
];
const DEFAULT_WATCHLIST_CONFIG = {
    industryIcon: {
        enabled: true
    },
    rvol1: {
        enabled: true,
        period: 1
    },
    atr: {
        enabled: false,
        period: 14
    },
    natr: {
        enabled: false,
        period: 14
    },
    pe: {
        enabled: false
    },
    pb: {
        enabled: false
    },
    roe: {
        enabled: false
    },
    roce: {
        enabled: false
    },
    debtToEquity: {
        enabled: false
    },
    dividendYield: {
        enabled: false
    },
    salesGrowth: {
        enabled: false
    },
    profitGrowth: {
        enabled: false
    },
    marketCap: {
        enabled: false
    }
};
const DEFAULT_WATCHLIST_COLLECTIONS = [
    {
        id: 'default',
        name: 'Core',
        items: DEFAULT_WATCHLIST
    },
    {
        id: 'momentum',
        name: 'Momentum',
        items: DEFAULT_WATCHLIST.filter((item)=>item.change > 0)
    },
    {
        id: 'financials',
        name: 'Financials',
        items: DEFAULT_WATCHLIST.filter((item)=>item.industryGroup.includes('Bank') || item.industryGroup.includes('Finance'))
    }
];
function getEnabledMetricColumns(config) {
    return WATCHLIST_METRICS.filter((metric)=>config[metric.key].enabled).slice(0, WATCHLIST_MAX_CUSTOM_COLUMNS);
}
function getWatchlistPanelWidth(config) {
    const metricsWidth = getEnabledMetricColumns(config).reduce((sum, metric)=>sum + metric.width, 0);
    return WATCHLIST_PANEL_PADDING_WIDTH + WATCHLIST_PANEL_SYMBOL_WIDTH + WATCHLIST_PANEL_CHANGE_WIDTH + metricsWidth + (config.industryIcon.enabled ? WATCHLIST_PANEL_INDUSTRY_WIDTH : 0);
}
function formatMetricValue(item, metricKey) {
    const value = item[metricKey];
    const definition = METRIC_DEFINITIONS[metricKey];
    if (definition.kind === 'percent') {
        return `${value.toFixed(2)}%`;
    }
    if (definition.kind === 'multiple') {
        return value.toFixed(2);
    }
    if (definition.kind === 'currencyCompact') {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(2)}T`;
        }
        return `${value.toFixed(0)}B`;
    }
    return value.toFixed(2);
}
function getSortValue(item, sortKey) {
    if (sortKey === 'symbol' || sortKey === 'industryGroup') {
        return item[sortKey].toLowerCase();
    }
    return item[sortKey];
}
function SortArrow(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "f0bae30bfdfff1ad662ec1b8433ec8a281b2031d99ce0d102ffa79cbcc2c03c9") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f0bae30bfdfff1ad662ec1b8433ec8a281b2031d99ce0d102ffa79cbcc2c03c9";
    }
    const { active, direction } = t0;
    if (!active) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                size: 12,
                className: "shrink-0 self-center text-foreground/70"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 441,
                columnNumber: 12
            }, this);
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    if (direction === "asc") {
        let t1;
        if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                size: 12,
                className: "shrink-0 self-center text-foreground"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 451,
                columnNumber: 12
            }, this);
            $[2] = t1;
        } else {
            t1 = $[2];
        }
        return t1;
    }
    let t1;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
            size: 12,
            className: "shrink-0 self-center text-foreground"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 460,
            columnNumber: 10
        }, this);
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    return t1;
}
_c3 = SortArrow;
function WatchlistPanel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(167);
    if ($[0] !== "f0bae30bfdfff1ad662ec1b8433ec8a281b2031d99ce0d102ffa79cbcc2c03c9") {
        for(let $i = 0; $i < 167; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f0bae30bfdfff1ad662ec1b8433ec8a281b2031d99ce0d102ffa79cbcc2c03c9";
    }
    const { config, onConfigChange, onSymbolSelect } = t0;
    const { symbol: activeSymbol, setSymbol } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"])();
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("symbol");
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("asc");
    const [searchOpen, setSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [watchlists, setWatchlists] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_WATCHLIST_COLLECTIONS);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            DEFAULT_WATCHLIST_COLLECTIONS[0].id
        ];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [selectedWatchlistIds, setSelectedWatchlistIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    let t2;
    if ($[2] !== config) {
        t2 = getEnabledMetricColumns(config);
        $[2] = config;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const enabledMetricColumns = t2;
    const enabledIndicatorCount = enabledMetricColumns.length;
    let t3;
    if ($[4] !== selectedWatchlistIds || $[5] !== watchlists) {
        let t4;
        if ($[7] !== selectedWatchlistIds) {
            t4 = ({
                "WatchlistPanel[watchlists.filter()]": (watchlist)=>selectedWatchlistIds.includes(watchlist.id)
            })["WatchlistPanel[watchlists.filter()]"];
            $[7] = selectedWatchlistIds;
            $[8] = t4;
        } else {
            t4 = $[8];
        }
        t3 = watchlists.filter(t4);
        $[4] = selectedWatchlistIds;
        $[5] = watchlists;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const activeWatchlists = t3;
    const activeWatchlist = activeWatchlists[0] ?? watchlists[0];
    let counts;
    if ($[9] !== activeWatchlist?.items) {
        counts = new Map();
        (activeWatchlist?.items ?? []).forEach({
            "WatchlistPanel[(anonymous)()]": (item)=>{
                counts.set(item.industryGroup, (counts.get(item.industryGroup) ?? 0) + 1);
            }
        }["WatchlistPanel[(anonymous)()]"]);
        $[9] = activeWatchlist?.items;
        $[10] = counts;
    } else {
        counts = $[10];
    }
    const industryCounts = counts;
    let segments;
    if ($[11] !== config.industryIcon.enabled || $[12] !== enabledMetricColumns) {
        segments = [
            `${WATCHLIST_PANEL_SYMBOL_WIDTH}px`
        ];
        if (config.industryIcon.enabled) {
            segments.push(`${WATCHLIST_PANEL_INDUSTRY_WIDTH}px`);
        }
        enabledMetricColumns.forEach({
            "WatchlistPanel[enabledMetricColumns.forEach()]": (metric)=>{
                segments.push(`${metric.width}px`);
            }
        }["WatchlistPanel[enabledMetricColumns.forEach()]"]);
        segments.push(`${WATCHLIST_PANEL_CHANGE_WIDTH}px`);
        $[11] = config.industryIcon.enabled;
        $[12] = enabledMetricColumns;
        $[13] = segments;
    } else {
        segments = $[13];
    }
    const gridTemplateColumns = segments.join(" ");
    let items;
    if ($[14] !== activeWatchlist?.items || $[15] !== industryCounts || $[16] !== sortDirection || $[17] !== sortKey) {
        items = [
            ...activeWatchlist?.items ?? []
        ];
        let t4;
        if ($[19] !== industryCounts || $[20] !== sortDirection || $[21] !== sortKey) {
            t4 = ({
                "WatchlistPanel[items.sort()]": (left, right)=>{
                    if (sortKey === "industryGroup") {
                        const leftCount = industryCounts.get(left.industryGroup) ?? 0;
                        const rightCount = industryCounts.get(right.industryGroup) ?? 0;
                        if (leftCount !== rightCount) {
                            return sortDirection === "asc" ? leftCount - rightCount : rightCount - leftCount;
                        }
                        const industryCompare = left.industryGroup.localeCompare(right.industryGroup);
                        if (industryCompare !== 0) {
                            return sortDirection === "asc" ? industryCompare : -industryCompare;
                        }
                    }
                    const leftValue = getSortValue(left, sortKey);
                    const rightValue = getSortValue(right, sortKey);
                    if (typeof leftValue === "string" && typeof rightValue === "string") {
                        return sortDirection === "asc" ? leftValue.localeCompare(rightValue) : rightValue.localeCompare(leftValue);
                    }
                    return sortDirection === "asc" ? Number(leftValue) - Number(rightValue) : Number(rightValue) - Number(leftValue);
                }
            })["WatchlistPanel[items.sort()]"];
            $[19] = industryCounts;
            $[20] = sortDirection;
            $[21] = sortKey;
            $[22] = t4;
        } else {
            t4 = $[22];
        }
        items.sort(t4);
        $[14] = activeWatchlist?.items;
        $[15] = industryCounts;
        $[16] = sortDirection;
        $[17] = sortKey;
        $[18] = items;
    } else {
        items = $[18];
    }
    const sortedItems = items;
    let t4;
    if ($[23] !== onSymbolSelect || $[24] !== setSymbol) {
        t4 = function handleSelect(item_0) {
            setSymbol(item_0.symbol);
            onSymbolSelect?.(item_0.symbol);
        };
        $[23] = onSymbolSelect;
        $[24] = setSymbol;
        $[25] = t4;
    } else {
        t4 = $[25];
    }
    const handleSelect = t4;
    let t5;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = function toggleWatchlistSelection(watchlistId) {
            setSelectedWatchlistIds({
                "WatchlistPanel[toggleWatchlistSelection > setSelectedWatchlistIds()]": (current)=>{
                    if (current.includes(watchlistId)) {
                        return current.length === 1 ? current : current.filter({
                            "WatchlistPanel[toggleWatchlistSelection > setSelectedWatchlistIds() > current.filter()]": (id)=>id !== watchlistId
                        }["WatchlistPanel[toggleWatchlistSelection > setSelectedWatchlistIds() > current.filter()]"]);
                    }
                    return [
                        watchlistId,
                        ...current.filter({
                            "WatchlistPanel[toggleWatchlistSelection > setSelectedWatchlistIds() > current.filter()]": (id_0)=>id_0 !== watchlistId
                        }["WatchlistPanel[toggleWatchlistSelection > setSelectedWatchlistIds() > current.filter()]"])
                    ];
                }
            }["WatchlistPanel[toggleWatchlistSelection > setSelectedWatchlistIds()]"]);
        };
        $[26] = t5;
    } else {
        t5 = $[26];
    }
    const toggleWatchlistSelection = t5;
    let t6;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = function addWatchlist() {
            setWatchlists({
                "WatchlistPanel[addWatchlist > setWatchlists()]": (current_0)=>{
                    const nextIndex = current_0.length + 1;
                    const nextWatchlist = {
                        id: `custom-${nextIndex}`,
                        name: `Watchlist ${nextIndex}`,
                        items: [
                            ...DEFAULT_WATCHLIST.slice(0, Math.max(3, 6 - nextIndex % 3))
                        ]
                    };
                    setSelectedWatchlistIds([
                        nextWatchlist.id
                    ]);
                    return [
                        ...current_0,
                        nextWatchlist
                    ];
                }
            }["WatchlistPanel[addWatchlist > setWatchlists()]"]);
        };
        $[27] = t6;
    } else {
        t6 = $[27];
    }
    const addWatchlist = t6;
    let t7;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = function removeWatchlist(watchlistId_0) {
            setWatchlists({
                "WatchlistPanel[removeWatchlist > setWatchlists()]": (current_1)=>{
                    if (current_1.length === 1) {
                        return current_1;
                    }
                    const nextWatchlists = current_1.filter({
                        "WatchlistPanel[removeWatchlist > setWatchlists() > current_1.filter()]": (watchlist_0)=>watchlist_0.id !== watchlistId_0
                    }["WatchlistPanel[removeWatchlist > setWatchlists() > current_1.filter()]"]);
                    setSelectedWatchlistIds({
                        "WatchlistPanel[removeWatchlist > setWatchlists() > setSelectedWatchlistIds()]": (selected)=>{
                            const filtered = selected.filter({
                                "WatchlistPanel[removeWatchlist > setWatchlists() > setSelectedWatchlistIds() > selected.filter()]": (id_1)=>id_1 !== watchlistId_0
                            }["WatchlistPanel[removeWatchlist > setWatchlists() > setSelectedWatchlistIds() > selected.filter()]"]);
                            return filtered.length > 0 ? filtered : [
                                nextWatchlists[0].id
                            ];
                        }
                    }["WatchlistPanel[removeWatchlist > setWatchlists() > setSelectedWatchlistIds()]"]);
                    return nextWatchlists;
                }
            }["WatchlistPanel[removeWatchlist > setWatchlists()]"]);
        };
        $[28] = t7;
    } else {
        t7 = $[28];
    }
    const removeWatchlist = t7;
    let t8;
    if ($[29] !== activeWatchlist) {
        t8 = function removeRow(symbol) {
            if (!activeWatchlist) {
                return;
            }
            setWatchlists({
                "WatchlistPanel[removeRow > setWatchlists()]": (current_2)=>current_2.map({
                        "WatchlistPanel[removeRow > setWatchlists() > current_2.map()]": (watchlist_1)=>{
                            if (watchlist_1.id !== activeWatchlist.id) {
                                return watchlist_1;
                            }
                            return {
                                ...watchlist_1,
                                items: watchlist_1.items.filter({
                                    "WatchlistPanel[removeRow > setWatchlists() > current_2.map() > watchlist_1.items.filter()]": (item_1)=>item_1.symbol !== symbol
                                }["WatchlistPanel[removeRow > setWatchlists() > current_2.map() > watchlist_1.items.filter()]"])
                            };
                        }
                    }["WatchlistPanel[removeRow > setWatchlists() > current_2.map()]"])
            }["WatchlistPanel[removeRow > setWatchlists()]"]);
        };
        $[29] = activeWatchlist;
        $[30] = t8;
    } else {
        t8 = $[30];
    }
    const removeRow = t8;
    let t9;
    if ($[31] !== sortKey) {
        t9 = function handleSort(nextKey) {
            if (sortKey === nextKey) {
                setSortDirection(_WatchlistPanelHandleSortSetSortDirection);
                return;
            }
            setSortKey(nextKey);
            setSortDirection(nextKey === "symbol" || nextKey === "industryGroup" ? "asc" : "desc");
        };
        $[31] = sortKey;
        $[32] = t9;
    } else {
        t9 = $[32];
    }
    const handleSort = t9;
    let t10;
    if ($[33] !== enabledIndicatorCount || $[34] !== onConfigChange) {
        t10 = function updateColumnEnabled(columnKey, enabled) {
            onConfigChange({
                "WatchlistPanel[updateColumnEnabled > onConfigChange()]": (current_4)=>{
                    if (columnKey !== "industryIcon" && enabled && !current_4[columnKey].enabled && enabledIndicatorCount >= WATCHLIST_MAX_CUSTOM_COLUMNS) {
                        return current_4;
                    }
                    return {
                        ...current_4,
                        [columnKey]: {
                            ...current_4[columnKey],
                            enabled
                        }
                    };
                }
            }["WatchlistPanel[updateColumnEnabled > onConfigChange()]"]);
        };
        $[33] = enabledIndicatorCount;
        $[34] = onConfigChange;
        $[35] = t10;
    } else {
        t10 = $[35];
    }
    const updateColumnEnabled = t10;
    let t11;
    if ($[36] !== onConfigChange) {
        t11 = function updateColumnPeriod(columnKey_0, period) {
            onConfigChange({
                "WatchlistPanel[updateColumnPeriod > onConfigChange()]": (current_5)=>({
                        ...current_5,
                        [columnKey_0]: {
                            ...current_5[columnKey_0],
                            period
                        }
                    })
            }["WatchlistPanel[updateColumnPeriod > onConfigChange()]"]);
        };
        $[36] = onConfigChange;
        $[37] = t11;
    } else {
        t11 = $[37];
    }
    const updateColumnPeriod = t11;
    let t12;
    if ($[38] !== config) {
        t12 = getWatchlistPanelWidth(config);
        $[38] = config;
        $[39] = t12;
    } else {
        t12 = $[39];
    }
    const t13 = `${t12}px`;
    let t14;
    if ($[40] !== t13) {
        t14 = {
            width: t13
        };
        $[40] = t13;
        $[41] = t14;
    } else {
        t14 = $[41];
    }
    let t15;
    if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            className: "h-7 w-7",
            title: "Add stock to watchlist",
            onClick: {
                "WatchlistPanel[<Button>.onClick]": ()=>setSearchOpen(true)
            }["WatchlistPanel[<Button>.onClick]"],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                size: 15
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 798,
                columnNumber: 44
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 796,
            columnNumber: 11
        }, this);
        $[42] = t15;
    } else {
        t15 = $[42];
    }
    const t16 = activeWatchlist?.name ?? "Watchlist";
    let t17;
    if ($[43] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "truncate",
            children: t16
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 806,
            columnNumber: 11
        }, this);
        $[43] = t16;
        $[44] = t17;
    } else {
        t17 = $[44];
    }
    let t18;
    if ($[45] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
            size: 12,
            className: "shrink-0 text-muted-foreground"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 814,
            columnNumber: 11
        }, this);
        $[45] = t18;
    } else {
        t18 = $[45];
    }
    let t19;
    if ($[46] !== t17) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "ghost",
                className: "h-7 w-[172px] justify-between gap-1.5 px-1.5 text-left text-xs font-semibold tracking-tight text-foreground",
                children: [
                    t17,
                    t18
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 821,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 821,
            columnNumber: 11
        }, this);
        $[46] = t17;
        $[47] = t19;
    } else {
        t19 = $[47];
    }
    let t20;
    if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
            children: "My Watchlists"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 829,
            columnNumber: 11
        }, this);
        $[48] = t20;
    } else {
        t20 = $[48];
    }
    let t21;
    if ($[49] !== selectedWatchlistIds || $[50] !== watchlists) {
        let t22;
        if ($[52] !== selectedWatchlistIds || $[53] !== watchlists.length) {
            t22 = ({
                "WatchlistPanel[watchlists.map()]": (watchlist_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                checked: selectedWatchlistIds.includes(watchlist_2.id),
                                onSelect: _WatchlistPanelWatchlistsMapDropdownMenuCheckboxItemOnSelect,
                                onCheckedChange: {
                                    "WatchlistPanel[watchlists.map() > <DropdownMenuCheckboxItem>.onCheckedChange]": ()=>toggleWatchlistSelection(watchlist_2.id)
                                }["WatchlistPanel[watchlists.map() > <DropdownMenuCheckboxItem>.onCheckedChange]"],
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate",
                                    children: watchlist_2.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 841,
                                    columnNumber: 114
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 839,
                                columnNumber: 122
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: {
                                    "WatchlistPanel[watchlists.map() > <button>.onClick]": (event_0)=>{
                                        event_0.preventDefault();
                                        event_0.stopPropagation();
                                        removeWatchlist(watchlist_2.id);
                                    }
                                }["WatchlistPanel[watchlists.map() > <button>.onClick]"],
                                className: "mr-1 rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
                                disabled: watchlists.length === 1,
                                title: "Remove watchlist",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 847,
                                    columnNumber: 287
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 841,
                                columnNumber: 193
                            }, this)
                        ]
                    }, watchlist_2.id, true, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 839,
                        columnNumber: 60
                    }, this)
            })["WatchlistPanel[watchlists.map()]"];
            $[52] = selectedWatchlistIds;
            $[53] = watchlists.length;
            $[54] = t22;
        } else {
            t22 = $[54];
        }
        t21 = watchlists.map(t22);
        $[49] = selectedWatchlistIds;
        $[50] = watchlists;
        $[51] = t21;
    } else {
        t21 = $[51];
    }
    let t22;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 864,
            columnNumber: 11
        }, this);
        $[55] = t22;
    } else {
        t22 = $[55];
    }
    let t23;
    if ($[56] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
            onSelect: addWatchlist,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 871,
                    columnNumber: 53
                }, this),
                "Add watchlist"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 871,
            columnNumber: 11
        }, this);
        $[56] = t23;
    } else {
        t23 = $[56];
    }
    let t24;
    if ($[57] !== t21) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
            align: "start",
            className: "w-[260px] p-1",
            children: [
                t20,
                t21,
                t22,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 878,
            columnNumber: 11
        }, this);
        $[57] = t21;
        $[58] = t24;
    } else {
        t24 = $[58];
    }
    let t25;
    if ($[59] !== t19 || $[60] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1",
            children: [
                t15,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                    children: [
                        t19,
                        t24
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 886,
                    columnNumber: 57
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 886,
            columnNumber: 11
        }, this);
        $[59] = t19;
        $[60] = t24;
        $[61] = t25;
    } else {
        t25 = $[61];
    }
    let t26;
    if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7",
                title: "Watchlist settings",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                    size: 15
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 895,
                    columnNumber: 130
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 895,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 895,
            columnNumber: 11
        }, this);
        $[62] = t26;
    } else {
        t26 = $[62];
    }
    let t27;
    let t28;
    if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                className: "px-0 py-0 text-foreground",
                children: "Watchlist Columns"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 903,
                columnNumber: 32
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 903,
            columnNumber: 11
        }, this);
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 904,
            columnNumber: 11
        }, this);
        $[63] = t27;
        $[64] = t28;
    } else {
        t27 = $[63];
        t28 = $[64];
    }
    let t29;
    if ($[65] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-medium text-foreground",
                children: "Industry Group"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 913,
                columnNumber: 16
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 913,
            columnNumber: 11
        }, this);
        $[65] = t29;
    } else {
        t29 = $[65];
    }
    let t30;
    if ($[66] !== config.industryIcon.enabled || $[67] !== updateColumnEnabled) {
        t30 = ({
            "WatchlistPanel[<button>.onClick]": ()=>updateColumnEnabled("industryIcon", !config.industryIcon.enabled)
        })["WatchlistPanel[<button>.onClick]"];
        $[66] = config.industryIcon.enabled;
        $[67] = updateColumnEnabled;
        $[68] = t30;
    } else {
        t30 = $[68];
    }
    const t31 = config.industryIcon.enabled ? "border-amber-500/40 bg-amber-500/10 text-amber-500" : "border-border text-muted-foreground hover:bg-muted/50";
    let t32;
    if ($[69] !== t31) {
        t32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors", t31);
        $[69] = t31;
        $[70] = t32;
    } else {
        t32 = $[70];
    }
    let t33;
    if ($[71] !== config.industryIcon.enabled) {
        t33 = config.industryIcon.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
            size: 12
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 940,
            columnNumber: 42
        }, this);
        $[71] = config.industryIcon.enabled;
        $[72] = t33;
    } else {
        t33 = $[72];
    }
    const t34 = config.industryIcon.enabled ? "Include" : "Exclude";
    let t35;
    if ($[73] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t34
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 949,
            columnNumber: 11
        }, this);
        $[73] = t34;
        $[74] = t35;
    } else {
        t35 = $[74];
    }
    let t36;
    if ($[75] !== t30 || $[76] !== t32 || $[77] !== t33 || $[78] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2",
            children: [
                t29,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: t30,
                    className: t32,
                    children: [
                        t33,
                        t35
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 957,
                    columnNumber: 123
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 957,
            columnNumber: 11
        }, this);
        $[75] = t30;
        $[76] = t32;
        $[77] = t33;
        $[78] = t35;
        $[79] = t36;
    } else {
        t36 = $[79];
    }
    let t37;
    if ($[80] !== config || $[81] !== enabledIndicatorCount || $[82] !== updateColumnEnabled || $[83] !== updateColumnPeriod) {
        t37 = [
            {
                title: "Technicals",
                keys: TECHNICAL_METRIC_KEYS
            },
            {
                title: "Fundamentals",
                keys: FUNDAMENTAL_METRIC_KEYS
            }
        ].map({
            "WatchlistPanel[(anonymous)()]": (section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground",
                            children: section.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                            lineNumber: 975,
                            columnNumber: 98
                        }, this),
                        section.keys.map({
                            "WatchlistPanel[(anonymous)() > section.keys.map()]": (metricKey)=>{
                                const metric_0 = METRIC_DEFINITIONS[metricKey];
                                const column = config[metric_0.key];
                                const limitReached = !column.enabled && enabledIndicatorCount >= WATCHLIST_MAX_CUSTOM_COLUMNS;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-border bg-background px-3 py-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium text-foreground",
                                                        children: metric_0.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                        lineNumber: 980,
                                                        columnNumber: 175
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                    lineNumber: 980,
                                                    columnNumber: 170
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    disabled: limitReached,
                                                    onClick: {
                                                        "WatchlistPanel[(anonymous)() > section.keys.map() > <button>.onClick]": ()=>updateColumnEnabled(metric_0.key, !column.enabled)
                                                    }["WatchlistPanel[(anonymous)() > section.keys.map() > <button>.onClick]"],
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50", column.enabled ? "border-amber-500/40 bg-amber-500/10 text-amber-500" : "border-border text-muted-foreground hover:bg-muted/50"),
                                                    children: [
                                                        column.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                            lineNumber: 982,
                                                            columnNumber: 406
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: column.enabled ? "Included" : "Include"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                            lineNumber: 982,
                                                            columnNumber: 426
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                    lineNumber: 980,
                                                    columnNumber: 256
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 980,
                                            columnNumber: 114
                                        }, this),
                                        metric_0.periodOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 grid grid-cols-[1fr_84px] items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[11px] text-muted-foreground",
                                                    children: "Parameter"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                    lineNumber: 982,
                                                    columnNumber: 589
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: String(column.period ?? metric_0.periodOptions[0]),
                                                    onChange: {
                                                        "WatchlistPanel[(anonymous)() > section.keys.map() > <Select>.onChange]": (event_1)=>updateColumnPeriod(metric_0.key, Number(event_1.target.value))
                                                    }["WatchlistPanel[(anonymous)() > section.keys.map() > <Select>.onChange]"],
                                                    className: "h-7 text-xs",
                                                    children: metric_0.periodOptions.map(_WatchlistPanelAnonymousSectionKeysMapMetric_0PeriodOptionsMap)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                                    lineNumber: 982,
                                                    columnNumber: 655
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                            lineNumber: 982,
                                            columnNumber: 522
                                        }, this)
                                    ]
                                }, metric_0.key, true, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 980,
                                    columnNumber: 20
                                }, this);
                            }
                        }["WatchlistPanel[(anonymous)() > section.keys.map()]"])
                    ]
                }, section.title, true, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 975,
                    columnNumber: 51
                }, this)
        }["WatchlistPanel[(anonymous)()]"]);
        $[80] = config;
        $[81] = enabledIndicatorCount;
        $[82] = updateColumnEnabled;
        $[83] = updateColumnPeriod;
        $[84] = t37;
    } else {
        t37 = $[84];
    }
    let t38;
    if ($[85] !== t36 || $[86] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                children: [
                    t26,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                        align: "end",
                        className: "w-[320px] p-0",
                        children: [
                            t27,
                            t28,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-h-[420px] space-y-3 overflow-y-auto p-3",
                                children: [
                                    t36,
                                    t37
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 998,
                                columnNumber: 140
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 998,
                        columnNumber: 71
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 998,
                columnNumber: 52
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 998,
            columnNumber: 11
        }, this);
        $[85] = t36;
        $[86] = t37;
        $[87] = t38;
    } else {
        t38 = $[87];
    }
    let t39;
    if ($[88] !== t25 || $[89] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between border-b border-border px-2 py-2",
            children: [
                t25,
                t38
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1007,
            columnNumber: 11
        }, this);
        $[88] = t25;
        $[89] = t38;
        $[90] = t39;
    } else {
        t39 = $[90];
    }
    let t40;
    if ($[91] !== gridTemplateColumns) {
        t40 = {
            gridTemplateColumns
        };
        $[91] = gridTemplateColumns;
        $[92] = t40;
    } else {
        t40 = $[92];
    }
    let t41;
    if ($[93] !== handleSort) {
        t41 = ({
            "WatchlistPanel[<button>.onClick]": ()=>handleSort("symbol")
        })["WatchlistPanel[<button>.onClick]"];
        $[93] = handleSort;
        $[94] = t41;
    } else {
        t41 = $[94];
    }
    let t42;
    if ($[95] === Symbol.for("react.memo_cache_sentinel")) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Symbol"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1036,
            columnNumber: 11
        }, this);
        $[95] = t42;
    } else {
        t42 = $[95];
    }
    const t43 = sortKey === "symbol";
    let t44;
    if ($[96] !== sortDirection || $[97] !== t43) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortArrow, {
            active: t43,
            direction: sortDirection
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1044,
            columnNumber: 11
        }, this);
        $[96] = sortDirection;
        $[97] = t43;
        $[98] = t44;
    } else {
        t44 = $[98];
    }
    let t45;
    if ($[99] !== t41 || $[100] !== t44) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t41,
            className: "flex min-w-0 items-center gap-1 text-left leading-none hover:text-foreground",
            children: [
                t42,
                t44
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1053,
            columnNumber: 11
        }, this);
        $[99] = t41;
        $[100] = t44;
        $[101] = t45;
    } else {
        t45 = $[101];
    }
    let t46;
    if ($[102] !== config.industryIcon.enabled || $[103] !== handleSort || $[104] !== sortDirection || $[105] !== sortKey) {
        t46 = config.industryIcon.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: {
                "WatchlistPanel[<button>.onClick]": ()=>handleSort("industryGroup")
            }["WatchlistPanel[<button>.onClick]"],
            className: "flex items-center justify-center gap-1 text-center leading-none hover:text-foreground",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Ind"
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 1064,
                    columnNumber: 142
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortArrow, {
                    active: sortKey === "industryGroup",
                    direction: sortDirection
                }, void 0, false, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 1064,
                    columnNumber: 158
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1062,
            columnNumber: 42
        }, this);
        $[102] = config.industryIcon.enabled;
        $[103] = handleSort;
        $[104] = sortDirection;
        $[105] = sortKey;
        $[106] = t46;
    } else {
        t46 = $[106];
    }
    let t47;
    if ($[107] !== config || $[108] !== enabledMetricColumns || $[109] !== handleSort || $[110] !== sortDirection || $[111] !== sortKey) {
        let t48;
        if ($[113] !== config || $[114] !== handleSort || $[115] !== sortDirection || $[116] !== sortKey) {
            t48 = ({
                "WatchlistPanel[enabledMetricColumns.map()]": (metric_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: {
                            "WatchlistPanel[enabledMetricColumns.map() > <button>.onClick]": ()=>handleSort(metric_1.key)
                        }["WatchlistPanel[enabledMetricColumns.map() > <button>.onClick]"],
                        className: "flex items-center justify-end gap-1 text-right leading-none hover:text-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    metric_1.shortLabel,
                                    config[metric_1.key].period ? `(${config[metric_1.key].period})` : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 1080,
                                columnNumber: 171
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortArrow, {
                                active: sortKey === metric_1.key,
                                direction: sortDirection
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 1080,
                                columnNumber: 276
                            }, this)
                        ]
                    }, metric_1.key, true, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 1078,
                        columnNumber: 67
                    }, this)
            })["WatchlistPanel[enabledMetricColumns.map()]"];
            $[113] = config;
            $[114] = handleSort;
            $[115] = sortDirection;
            $[116] = sortKey;
            $[117] = t48;
        } else {
            t48 = $[117];
        }
        t47 = enabledMetricColumns.map(t48);
        $[107] = config;
        $[108] = enabledMetricColumns;
        $[109] = handleSort;
        $[110] = sortDirection;
        $[111] = sortKey;
        $[112] = t47;
    } else {
        t47 = $[112];
    }
    let t48;
    if ($[118] !== handleSort) {
        t48 = ({
            "WatchlistPanel[<button>.onClick]": ()=>handleSort("change")
        })["WatchlistPanel[<button>.onClick]"];
        $[118] = handleSort;
        $[119] = t48;
    } else {
        t48 = $[119];
    }
    let t49;
    if ($[120] === Symbol.for("react.memo_cache_sentinel")) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Chg%"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1112,
            columnNumber: 11
        }, this);
        $[120] = t49;
    } else {
        t49 = $[120];
    }
    const t50 = sortKey === "change";
    let t51;
    if ($[121] !== sortDirection || $[122] !== t50) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortArrow, {
            active: t50,
            direction: sortDirection
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1120,
            columnNumber: 11
        }, this);
        $[121] = sortDirection;
        $[122] = t50;
        $[123] = t51;
    } else {
        t51 = $[123];
    }
    let t52;
    if ($[124] !== t48 || $[125] !== t51) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t48,
            className: "flex items-center justify-end gap-1 text-right leading-none hover:text-foreground",
            children: [
                t49,
                t51
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1129,
            columnNumber: 11
        }, this);
        $[124] = t48;
        $[125] = t51;
        $[126] = t52;
    } else {
        t52 = $[126];
    }
    let t53;
    if ($[127] !== t40 || $[128] !== t45 || $[129] !== t46 || $[130] !== t47 || $[131] !== t52) {
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid items-center gap-px border-b border-border bg-muted/30 pl-3 pr-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground",
            style: t40,
            children: [
                t45,
                t46,
                t47,
                t52
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1138,
            columnNumber: 11
        }, this);
        $[127] = t40;
        $[128] = t45;
        $[129] = t46;
        $[130] = t47;
        $[131] = t52;
        $[132] = t53;
    } else {
        t53 = $[132];
    }
    let t54;
    if ($[133] !== activeSymbol || $[134] !== config.industryIcon.enabled || $[135] !== enabledMetricColumns || $[136] !== gridTemplateColumns || $[137] !== handleSelect || $[138] !== removeRow || $[139] !== sortedItems) {
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: sortedItems.map({
                "WatchlistPanel[sortedItems.map()]": (item_2)=>{
                    const isActive = item_2.symbol === activeSymbol;
                    const isPositive = item_2.change > 0;
                    const isNegative = item_2.change < 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: {
                            "WatchlistPanel[sortedItems.map() > <button>.onClick]": ()=>handleSelect(item_2)
                        }["WatchlistPanel[sortedItems.map() > <button>.onClick]"],
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative grid min-h-8 w-full items-center gap-px border-b border-border/80 pl-3 pr-3 py-1.5 text-left transition-colors", isActive ? "bg-amber-500/5 hover:bg-muted/40" : "bg-transparent hover:bg-muted/40"),
                        style: {
                            gridTemplateColumns
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex flex-col justify-center truncate",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("min-w-0 truncate text-[12px] font-semibold leading-tight", isActive ? "text-amber-500" : "text-foreground"),
                                        children: item_2.symbol
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 1159,
                                        columnNumber: 77
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 truncate text-[10px] text-muted-foreground leading-tight",
                                        title: item_2.name,
                                        children: item_2.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 1159,
                                        columnNumber: 227
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 1159,
                                columnNumber: 14
                            }, this),
                            config.industryIcon.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center text-base leading-none",
                                title: item_2.industryGroup,
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$emojis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndustryGroupEmoji"])(item_2.industryGroup)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 1159,
                                columnNumber: 386
                            }, this),
                            enabledMetricColumns.map({
                                "WatchlistPanel[sortedItems.map() > enabledMetricColumns.map()]": (metric_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "truncate text-right text-[11px] font-mono text-foreground/90",
                                        children: formatMetricValue(item_2, metric_2.key)
                                    }, metric_2.key, false, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 1160,
                                        columnNumber: 93
                                    }, this)
                            }["WatchlistPanel[sortedItems.map() > enabledMetricColumns.map()]"]),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-end gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("truncate text-right text-[11px] font-semibold", isPositive ? "text-emerald-500" : isNegative ? "text-rose-500" : "text-muted-foreground"),
                                        children: [
                                            isPositive ? "+" : "",
                                            item_2.change.toFixed(2),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 1161,
                                        columnNumber: 131
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "truncate text-right text-[10px] font-mono text-muted-foreground",
                                        children: [
                                            "₹",
                                            item_2.price.toLocaleString("en-IN", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                        lineNumber: 1161,
                                        columnNumber: 346
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 1161,
                                columnNumber: 82
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                role: "button",
                                tabIndex: 0,
                                onClick: {
                                    "WatchlistPanel[sortedItems.map() > <span>.onClick]": (event_2)=>{
                                        event_2.stopPropagation();
                                        removeRow(item_2.symbol);
                                    }
                                }["WatchlistPanel[sortedItems.map() > <span>.onClick]"],
                                onKeyDown: {
                                    "WatchlistPanel[sortedItems.map() > <span>.onKeyDown]": (event_3)=>{
                                        if (event_3.key === "Enter" || event_3.key === " ") {
                                            event_3.preventDefault();
                                            event_3.stopPropagation();
                                            removeRow(item_2.symbol);
                                        }
                                    }
                                }["WatchlistPanel[sortedItems.map() > <span>.onKeyDown]"],
                                className: "absolute right-0.5 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground opacity-0 transition-all hover:bg-background hover:text-rose-500 group-hover:opacity-100",
                                title: "Remove row",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    size: 11
                                }, void 0, false, {
                                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                    lineNumber: 1177,
                                    columnNumber: 275
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                                lineNumber: 1164,
                                columnNumber: 32
                            }, this)
                        ]
                    }, item_2.symbol, true, {
                        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                        lineNumber: 1155,
                        columnNumber: 18
                    }, this);
                }
            }["WatchlistPanel[sortedItems.map()]"])
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1150,
            columnNumber: 11
        }, this);
        $[133] = activeSymbol;
        $[134] = config.industryIcon.enabled;
        $[135] = enabledMetricColumns;
        $[136] = gridTemplateColumns;
        $[137] = handleSelect;
        $[138] = removeRow;
        $[139] = sortedItems;
        $[140] = t54;
    } else {
        t54 = $[140];
    }
    let t55;
    if ($[141] !== sortedItems.length) {
        t55 = sortedItems.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-32 items-center justify-center border-b border-dashed border-border text-sm text-muted-foreground",
            children: "This watchlist is empty."
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1193,
            columnNumber: 39
        }, this);
        $[141] = sortedItems.length;
        $[142] = t55;
    } else {
        t55 = $[142];
    }
    let t56;
    if ($[143] !== t54 || $[144] !== t55) {
        t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-0 pb-1",
            children: [
                t54,
                t55
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1201,
            columnNumber: 11
        }, this);
        $[143] = t54;
        $[144] = t55;
        $[145] = t56;
    } else {
        t56 = $[145];
    }
    let t57;
    if ($[146] === Symbol.for("react.memo_cache_sentinel")) {
        t57 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                children: "Add Stock to Watchlist"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 1210,
                columnNumber: 25
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1210,
            columnNumber: 11
        }, this);
        $[146] = t57;
    } else {
        t57 = $[146];
    }
    let t58;
    if ($[147] === Symbol.for("react.memo_cache_sentinel")) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1217,
            columnNumber: 11
        }, this);
        $[147] = t58;
    } else {
        t58 = $[147];
    }
    let t59;
    if ($[148] === Symbol.for("react.memo_cache_sentinel")) {
        t59 = ({
            "WatchlistPanel[<Input>.onChange]": (e)=>setSearchQuery(e.target.value)
        })["WatchlistPanel[<Input>.onChange]"];
        $[148] = t59;
    } else {
        t59 = $[148];
    }
    let t60;
    let t61;
    if ($[149] !== searchQuery) {
        t60 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            placeholder: "Search by symbol or name...",
            value: searchQuery,
            onChange: t59,
            className: "pl-9",
            autoFocus: true
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1234,
            columnNumber: 11
        }, this);
        t61 = searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: {
                "WatchlistPanel[<button>.onClick]": ()=>setSearchQuery("")
            }["WatchlistPanel[<button>.onClick]"],
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                lineNumber: 1237,
                columnNumber: 142
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1235,
            columnNumber: 26
        }, this);
        $[149] = searchQuery;
        $[150] = t60;
        $[151] = t61;
    } else {
        t60 = $[150];
        t61 = $[151];
    }
    let t62;
    if ($[152] !== t60 || $[153] !== t61) {
        t62 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                t58,
                t60,
                t61
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1247,
            columnNumber: 11
        }, this);
        $[152] = t60;
        $[153] = t61;
        $[154] = t62;
    } else {
        t62 = $[154];
    }
    let t63;
    if ($[155] === Symbol.for("react.memo_cache_sentinel")) {
        t63 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-muted-foreground",
            children: "Search functionality coming soon..."
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1256,
            columnNumber: 11
        }, this);
        $[155] = t63;
    } else {
        t63 = $[155];
    }
    let t64;
    if ($[156] !== t62) {
        t64 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-md",
            children: [
                t57,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        t62,
                        t63
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
                    lineNumber: 1263,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1263,
            columnNumber: 11
        }, this);
        $[156] = t62;
        $[157] = t64;
    } else {
        t64 = $[157];
    }
    let t65;
    if ($[158] !== searchOpen || $[159] !== t64) {
        t65 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
            open: searchOpen,
            onOpenChange: setSearchOpen,
            children: t64
        }, void 0, false, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1271,
            columnNumber: 11
        }, this);
        $[158] = searchOpen;
        $[159] = t64;
        $[160] = t65;
    } else {
        t65 = $[160];
    }
    let t66;
    if ($[161] !== t14 || $[162] !== t39 || $[163] !== t53 || $[164] !== t56 || $[165] !== t65) {
        t66 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full flex-col overflow-hidden border-l border-border bg-background/95 shadow-2xl backdrop-blur",
            style: t14,
            children: [
                t39,
                t53,
                t56,
                t65
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
            lineNumber: 1280,
            columnNumber: 11
        }, this);
        $[161] = t14;
        $[162] = t39;
        $[163] = t53;
        $[164] = t56;
        $[165] = t65;
        $[166] = t66;
    } else {
        t66 = $[166];
    }
    return t66;
}
_s(WatchlistPanel, "wGHMsgDdpEYFb7mB4PUP3N+1CZc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$store$2f$useChartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartStore"]
    ];
});
_c4 = WatchlistPanel;
function _WatchlistPanelAnonymousSectionKeysMapMetric_0PeriodOptionsMap(option) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: option,
        children: option
    }, option, false, {
        fileName: "[project]/src/components/charting/widgets/WatchlistPanel.tsx",
        lineNumber: 1293,
        columnNumber: 10
    }, this);
}
function _WatchlistPanelWatchlistsMapDropdownMenuCheckboxItemOnSelect(event) {
    return event.preventDefault();
}
function _WatchlistPanelHandleSortSetSortDirection(current_3) {
    return current_3 === "asc" ? "desc" : "asc";
}
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "METRIC_DEFINITIONS$Object.fromEntries$WATCHLIST_METRICS.map");
__turbopack_context__.k.register(_c1, "METRIC_DEFINITIONS$Object.fromEntries");
__turbopack_context__.k.register(_c2, "METRIC_DEFINITIONS");
__turbopack_context__.k.register(_c3, "SortArrow");
__turbopack_context__.k.register(_c4, "WatchlistPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/WatchlistPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WatchlistPanel",
    ()=>WatchlistPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$watchlist$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/watchlist-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/WatchlistPanel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function WatchlistPanel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "ba20cf6baea1bfc9a9b46661b162a8a36a617c90fb8e5e3d736ec09b3c2a4b3e") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "ba20cf6baea1bfc9a9b46661b162a8a36a617c90fb8e5e3d736ec09b3c2a4b3e";
    }
    const { config, onConfigChange } = t0;
    const { isWatchlistOpen, closeWatchlist } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$watchlist$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatchlist"])();
    let t1;
    let t2;
    if ($[1] !== closeWatchlist) {
        t1 = ({
            "WatchlistPanel[useEffect()]": ()=>{
                const handleEsc = {
                    "WatchlistPanel[useEffect() > handleEsc]": (e)=>{
                        if (e.key === "Escape") {
                            closeWatchlist();
                        }
                    }
                }["WatchlistPanel[useEffect() > handleEsc]"];
                window.addEventListener("keydown", handleEsc);
                return ()=>window.removeEventListener("keydown", handleEsc);
            }
        })["WatchlistPanel[useEffect()]"];
        t2 = [
            closeWatchlist
        ];
        $[1] = closeWatchlist;
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    if ($[4] !== closeWatchlist || $[5] !== config || $[6] !== isWatchlistOpen || $[7] !== onConfigChange) {
        t3 = isWatchlistOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed right-0 bottom-0 top-14 z-30 flex",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WatchlistPanel"], {
                config: config,
                onConfigChange: onConfigChange,
                onClose: closeWatchlist,
                onSymbolSelect: {
                    "WatchlistPanel[<ChartWatchlistPanel>.onSymbolSelect]": ()=>closeWatchlist()
                }["WatchlistPanel[<ChartWatchlistPanel>.onSymbolSelect]"]
            }, void 0, false, {
                fileName: "[project]/src/components/layout/WatchlistPanel.tsx",
                lineNumber: 54,
                columnNumber: 85
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/WatchlistPanel.tsx",
            lineNumber: 54,
            columnNumber: 28
        }, this) : null;
        $[4] = closeWatchlist;
        $[5] = config;
        $[6] = isWatchlistOpen;
        $[7] = onConfigChange;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return t3;
}
_s(WatchlistPanel, "ied0GvuK4tYNX/+sWCTTCLZoilU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$watchlist$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatchlist"]
    ];
});
_c = WatchlistPanel;
var _c;
__turbopack_context__.k.register(_c, "WatchlistPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-keyboard-shortcuts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useKeyboardShortcuts",
    ()=>useKeyboardShortcuts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const NAV_SHORTCUTS = {
    "1": "/dashboard",
    "2": "/portfolio",
    "3": "/tax",
    "4": "/backtest",
    "5": "/goals",
    "6": "/research"
};
function useKeyboardShortcuts() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "033549ecab1078ee06665e214d63ebf110fc000681e6a924b54b49f5e2052ffe") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "033549ecab1078ee06665e214d63ebf110fc000681e6a924b54b49f5e2052ffe";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let t0;
    let t1;
    if ($[1] !== router) {
        t0 = ({
            "useKeyboardShortcuts[useEffect()]": ()=>{
                const handleKeyDown = function handleKeyDown(e) {
                    const tag = e.target.tagName;
                    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
                        return;
                    }
                    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                        e.preventDefault();
                        return;
                    }
                    if (!e.metaKey && !e.ctrlKey && !e.altKey && NAV_SHORTCUTS[e.key]) {
                        router.push(NAV_SHORTCUTS[e.key]);
                    }
                };
                window.addEventListener("keydown", handleKeyDown);
                return ()=>window.removeEventListener("keydown", handleKeyDown);
            }
        })["useKeyboardShortcuts[useEffect()]"];
        t1 = [
            router
        ];
        $[1] = router;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
}
_s(useKeyboardShortcuts, "vQduR7x+OPXj6PSmJyFnf+hU7bg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/app-shell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppShell",
    ()=>AppShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$topbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/topbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/WatchlistPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$keyboard$2d$shortcuts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-keyboard-shortcuts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$watchlist$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/watchlist-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/charting/widgets/WatchlistPanel.tsx [app-client] (ecmascript)");
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
;
;
;
;
function AppShell(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(26);
    if ($[0] !== "ebf0a2390e8b205665d54cc03d4dc62c00979ef88a427c7a7aecc41a1fa2df70") {
        for(let $i = 0; $i < 26; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "ebf0a2390e8b205665d54cc03d4dc62c00979ef88a427c7a7aecc41a1fa2df70";
    }
    const { children } = t0;
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { isWatchlistOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$watchlist$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatchlist"])();
    const [watchlistConfig, setWatchlistConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_WATCHLIST_CONFIG"]);
    let t1;
    if ($[1] !== isWatchlistOpen || $[2] !== watchlistConfig) {
        t1 = isWatchlistOpen ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$charting$2f$widgets$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWatchlistPanelWidth"])(watchlistConfig) : 0;
        $[1] = isWatchlistOpen;
        $[2] = watchlistConfig;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const watchlistWidth = t1;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$keyboard$2d$shortcuts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useKeyboardShortcuts"])();
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$topbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopBar"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/app-shell.tsx",
            lineNumber: 43,
            columnNumber: 10
        }, this);
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/app-shell.tsx",
            lineNumber: 51,
            columnNumber: 10
        }, this);
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-0 flex-1 min-w-0");
        $[5] = t3;
        $[6] = t4;
    } else {
        t3 = $[5];
        t4 = $[6];
    }
    let t5;
    if ($[7] !== watchlistWidth) {
        t5 = {
            marginRight: watchlistWidth
        };
        $[7] = watchlistWidth;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            opacity: 0,
            y: 8
        };
        t7 = {
            opacity: 1,
            y: 0
        };
        t8 = {
            opacity: 0,
            y: -4
        };
        t9 = {
            duration: 0.2,
            ease: "easeOut"
        };
        $[9] = t6;
        $[10] = t7;
        $[11] = t8;
        $[12] = t9;
    } else {
        t6 = $[9];
        t7 = $[10];
        t8 = $[11];
        t9 = $[12];
    }
    let t10;
    if ($[13] !== children) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full min-w-0",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/layout/app-shell.tsx",
            lineNumber: 102,
            columnNumber: 11
        }, this);
        $[13] = children;
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    let t11;
    if ($[15] !== pathname || $[16] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: "wait",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: t6,
                animate: t7,
                exit: t8,
                transition: t9,
                className: "flex w-full min-w-0 justify-center p-4 md:p-8",
                children: t10
            }, pathname, false, {
                fileName: "[project]/src/components/layout/app-shell.tsx",
                lineNumber: 110,
                columnNumber: 40
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/app-shell.tsx",
            lineNumber: 110,
            columnNumber: 11
        }, this);
        $[15] = pathname;
        $[16] = t10;
        $[17] = t11;
    } else {
        t11 = $[17];
    }
    let t12;
    if ($[18] !== t11 || $[19] !== t5) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: t4,
            style: t5,
            children: t11
        }, void 0, false, {
            fileName: "[project]/src/components/layout/app-shell.tsx",
            lineNumber: 119,
            columnNumber: 11
        }, this);
        $[18] = t11;
        $[19] = t5;
        $[20] = t12;
    } else {
        t12 = $[20];
    }
    let t13;
    if ($[21] !== watchlistConfig) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$WatchlistPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WatchlistPanel"], {
            config: watchlistConfig,
            onConfigChange: setWatchlistConfig
        }, void 0, false, {
            fileName: "[project]/src/components/layout/app-shell.tsx",
            lineNumber: 128,
            columnNumber: 11
        }, this);
        $[21] = watchlistConfig;
        $[22] = t13;
    } else {
        t13 = $[22];
    }
    let t14;
    if ($[23] !== t12 || $[24] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[var(--background)] flex flex-col",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex flex-1",
                    children: [
                        t3,
                        t12,
                        t13
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/app-shell.tsx",
                    lineNumber: 136,
                    columnNumber: 82
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/app-shell.tsx",
            lineNumber: 136,
            columnNumber: 11
        }, this);
        $[23] = t12;
        $[24] = t13;
        $[25] = t14;
    } else {
        t14 = $[25];
    }
    return t14;
}
_s(AppShell, "1dKAHYE4hrRHZ+8U/2x48uhIUpI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$watchlist$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatchlist"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$keyboard$2d$shortcuts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useKeyboardShortcuts"]
    ];
});
_c = AppShell;
var _c;
__turbopack_context__.k.register(_c, "AppShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(app)/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$app$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/app-shell.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function AppLayout(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "b641d3998e471457ce63d1de9f7606a6f9aaf947ab1faa946d03511eee17eaa9") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b641d3998e471457ce63d1de9f7606a6f9aaf947ab1faa946d03511eee17eaa9";
    }
    const { children } = t0;
    let t1;
    if ($[1] !== children) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$app$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppShell"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/layout.tsx",
            lineNumber: 18,
            columnNumber: 10
        }, this);
        $[1] = children;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    return t1;
}
_c = AppLayout;
var _c;
__turbopack_context__.k.register(_c, "AppLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_6f644ff6._.js.map