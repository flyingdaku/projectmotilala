(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/dashboard/hooks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDashboard",
    ()=>useDashboard,
    "useDashboardList",
    ()=>useDashboardList,
    "useWidgetData",
    ()=>useWidgetData
]);
/**
 * Dashboard client-side hooks: useDashboard, useWidgetData
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
function useDashboardList() {
    _s();
    const [dashboards, setDashboards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboardList.useCallback[load]": async ()=>{
            setLoading(true);
            setError(null);
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])('/api/dashboard');
                setDashboards(data.dashboards ?? []);
            } catch (e) {
                setError(e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? e.message : e instanceof Error ? e.message : String(e));
            } finally{
                setLoading(false);
            }
        }
    }["useDashboardList.useCallback[load]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDashboardList.useEffect": ()=>{
            load();
        }
    }["useDashboardList.useEffect"], [
        load
    ]);
    const createDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboardList.useCallback[createDashboard]": async (name)=>{
            try {
                const data_0 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])('/api/dashboard', {
                    name
                });
                await load();
                return data_0.dashboard;
            } catch  {
                return null;
            }
        }
    }["useDashboardList.useCallback[createDashboard]"], [
        load
    ]);
    return {
        dashboards,
        loading,
        error,
        reload: load,
        createDashboard
    };
}
_s(useDashboardList, "ucbzgONLfsCVB1psn/MeJMYBKkk=");
function useDashboard(dashboardId) {
    _s1();
    const [dashboard, setDashboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const layoutSaveTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboard.useCallback[load]": async (id)=>{
            setLoading(true);
            setError(null);
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])(`/api/dashboard/${id}`);
                setDashboard(data.dashboard);
            } catch (e) {
                setError(e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? e.message : e instanceof Error ? e.message : String(e));
            } finally{
                setLoading(false);
            }
        }
    }["useDashboard.useCallback[load]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDashboard.useEffect": ()=>{
            if (dashboardId) load(dashboardId);
        }
    }["useDashboard.useEffect"], [
        dashboardId,
        load
    ]);
    // Debounced layout save
    const saveLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboard.useCallback[saveLayout]": (layout)=>{
            if (!dashboard) return;
            setDashboard({
                "useDashboard.useCallback[saveLayout]": (prev)=>prev ? {
                        ...prev,
                        layout_json: layout
                    } : null
            }["useDashboard.useCallback[saveLayout]"]);
            if (layoutSaveTimer.current) clearTimeout(layoutSaveTimer.current);
            layoutSaveTimer.current = setTimeout({
                "useDashboard.useCallback[saveLayout]": async ()=>{
                    try {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPut"])(`/api/dashboard/${dashboard.id}`, {
                            layout_json: layout
                        });
                    } catch  {
                    // silent — layout will sync on next load
                    }
                }
            }["useDashboard.useCallback[saveLayout]"], 600);
        }
    }["useDashboard.useCallback[saveLayout]"], [
        dashboard
    ]);
    const renameDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboard.useCallback[renameDashboard]": async (name)=>{
            if (!dashboard) return;
            setSaving(true);
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPut"])(`/api/dashboard/${dashboard.id}`, {
                    name
                });
                setDashboard({
                    "useDashboard.useCallback[renameDashboard]": (prev)=>prev ? {
                            ...prev,
                            name
                        } : null
                }["useDashboard.useCallback[renameDashboard]"]);
            } finally{
                setSaving(false);
            }
        }
    }["useDashboard.useCallback[renameDashboard]"], [
        dashboard
    ]);
    const deleteDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboard.useCallback[deleteDashboard]": async ()=>{
            if (!dashboard) return false;
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiDelete"])(`/api/dashboard/${dashboard.id}`);
                return true;
            } catch  {
                return false;
            }
        }
    }["useDashboard.useCallback[deleteDashboard]"], [
        dashboard
    ]);
    const duplicateDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboard.useCallback[duplicateDashboard]": async ()=>{
            if (!dashboard) return null;
            try {
                const data_0 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])(`/api/dashboard/${dashboard.id}/duplicate`, {});
                return data_0.dashboard?.id ?? null;
            } catch  {
                return null;
            }
        }
    }["useDashboard.useCallback[duplicateDashboard]"], [
        dashboard
    ]);
    const addWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboard.useCallback[addWidget]": async (widget_type, title, config)=>{
            if (!dashboard) return null;
            try {
                const data_1 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])(`/api/dashboard/${dashboard.id}/widget`, {
                    widget_type,
                    title,
                    config_json: config
                });
                const widget = data_1.widget;
                setDashboard({
                    "useDashboard.useCallback[addWidget]": (prev_0)=>prev_0 ? {
                            ...prev_0,
                            widgets: [
                                ...prev_0.widgets ?? [],
                                widget
                            ]
                        } : null
                }["useDashboard.useCallback[addWidget]"]);
                return widget;
            } catch  {
                return null;
            }
        }
    }["useDashboard.useCallback[addWidget]"], [
        dashboard
    ]);
    const updateWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboard.useCallback[updateWidget]": async (widgetId, updates)=>{
            if (!dashboard) return false;
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPut"])(`/api/dashboard/${dashboard.id}/widget/${widgetId}`, updates);
                setDashboard({
                    "useDashboard.useCallback[updateWidget]": (prev_1)=>prev_1 ? {
                            ...prev_1,
                            widgets: (prev_1.widgets ?? []).map({
                                "useDashboard.useCallback[updateWidget]": (w)=>w.id === widgetId ? {
                                        ...w,
                                        ...updates
                                    } : w
                            }["useDashboard.useCallback[updateWidget]"])
                        } : null
                }["useDashboard.useCallback[updateWidget]"]);
                return true;
            } catch  {
                return false;
            }
        }
    }["useDashboard.useCallback[updateWidget]"], [
        dashboard
    ]);
    const deleteWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboard.useCallback[deleteWidget]": async (widgetId_0)=>{
            if (!dashboard) return false;
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiDelete"])(`/api/dashboard/${dashboard.id}/widget/${widgetId_0}`);
                setDashboard({
                    "useDashboard.useCallback[deleteWidget]": (prev_2)=>prev_2 ? {
                            ...prev_2,
                            widgets: (prev_2.widgets ?? []).filter({
                                "useDashboard.useCallback[deleteWidget]": (w_0)=>w_0.id !== widgetId_0
                            }["useDashboard.useCallback[deleteWidget]"])
                        } : null
                }["useDashboard.useCallback[deleteWidget]"]);
                return true;
            } catch  {
                return false;
            }
        }
    }["useDashboard.useCallback[deleteWidget]"], [
        dashboard
    ]);
    return {
        dashboard,
        loading,
        saving,
        error,
        reload: ()=>{
            if (dashboardId) load(dashboardId);
        },
        saveLayout,
        renameDashboard,
        deleteDashboard,
        duplicateDashboard,
        addWidget,
        updateWidget,
        deleteWidget
    };
}
_s1(useDashboard, "gT0LXJhs3JjnPqvcnX04gTLxgio=");
function useWidgetData(config, widgetType, enabled = true) {
    _s2();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const configKey = JSON.stringify({
        config,
        widgetType
    });
    const configKeyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(configKey);
    const run = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWidgetData.useCallback[run]": async (cfg, wt)=>{
            if (!cfg.columns || cfg.columns.length === 0) return;
            setLoading(true);
            setError(null);
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])('/api/dashboard/widget/query', {
                    config: cfg,
                    widget_type: wt
                });
                setData(result);
            } catch (e) {
                setError(e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? e.message : e instanceof Error ? e.message : String(e));
                setData(null);
            } finally{
                setLoading(false);
            }
        }
    }["useWidgetData.useCallback[run]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWidgetData.useEffect": ()=>{
            configKeyRef.current = configKey;
            if (!enabled) return;
            run(config, widgetType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useWidgetData.useEffect"], [
        configKey,
        enabled
    ]);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWidgetData.useCallback[refresh]": ()=>{
            run(config, widgetType);
        }
    }["useWidgetData.useCallback[refresh]"], [
        config,
        widgetType,
        run
    ]);
    return {
        data,
        loading,
        error,
        refresh
    };
}
_s2(useWidgetData, "AMrOewwDsYl48ubftx/7IqK5fCU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/DashboardToolbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardToolbar",
    ()=>DashboardToolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DashboardToolbar(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(66);
    if ($[0] !== "2d7a6fd962e26ec8f495e8410bb94b1756561bc57275c6ddb8a2942c54c7bbcd") {
        for(let $i = 0; $i < 66; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2d7a6fd962e26ec8f495e8410bb94b1756561bc57275c6ddb8a2942c54c7bbcd";
    }
    const { dashboards, activeDashboardId, onSelectDashboard, onCreateDashboard, onRenameDashboard, onDeleteDashboard, onDuplicateDashboard, onResetToDefaults, onAddWidget, saving } = t0;
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showActions, setShowActions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [renaming, setRenaming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [renameVal, setRenameVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [creatingNew, setCreatingNew] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newName, setNewName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirmDelete, setConfirmDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pickerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const actionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t1;
    if ($[1] !== activeDashboardId || $[2] !== dashboards) {
        let t2;
        if ($[4] !== activeDashboardId) {
            t2 = ({
                "DashboardToolbar[dashboards.find()]": (d)=>d.id === activeDashboardId
            })["DashboardToolbar[dashboards.find()]"];
            $[4] = activeDashboardId;
            $[5] = t2;
        } else {
            t2 = $[5];
        }
        t1 = dashboards.find(t2);
        $[1] = activeDashboardId;
        $[2] = dashboards;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const active = t1;
    let t2;
    let t3;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "DashboardToolbar[useEffect()]": ()=>{
                const onClickOutside = function onClickOutside(e) {
                    if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                        setShowPicker(false);
                    }
                    if (actionsRef.current && !actionsRef.current.contains(e.target)) {
                        setShowActions(false);
                    }
                };
                document.addEventListener("mousedown", onClickOutside);
                return ()=>document.removeEventListener("mousedown", onClickOutside);
            }
        })["DashboardToolbar[useEffect()]"];
        t3 = [];
        $[6] = t2;
        $[7] = t3;
    } else {
        t2 = $[6];
        t3 = $[7];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[8] !== active?.name) {
        t4 = function startRename() {
            setRenameVal(active?.name ?? "");
            setRenaming(true);
            setShowActions(false);
        };
        $[8] = active?.name;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    const startRename = t4;
    let t5;
    if ($[10] !== activeDashboardId || $[11] !== onRenameDashboard || $[12] !== renameVal) {
        t5 = function commitRename() {
            if (activeDashboardId && renameVal.trim()) {
                onRenameDashboard(activeDashboardId, renameVal.trim());
            }
            setRenaming(false);
        };
        $[10] = activeDashboardId;
        $[11] = onRenameDashboard;
        $[12] = renameVal;
        $[13] = t5;
    } else {
        t5 = $[13];
    }
    const commitRename = t5;
    let t6;
    if ($[14] !== activeDashboardId || $[15] !== confirmDelete || $[16] !== onDeleteDashboard) {
        t6 = function handleDelete() {
            if (!activeDashboardId) {
                return;
            }
            if (confirmDelete) {
                onDeleteDashboard(activeDashboardId);
                setConfirmDelete(false);
                setShowActions(false);
            } else {
                setConfirmDelete(true);
                setTimeout({
                    "DashboardToolbar[handleDelete > setTimeout()]": ()=>setConfirmDelete(false)
                }["DashboardToolbar[handleDelete > setTimeout()]"], 3000);
            }
        };
        $[14] = activeDashboardId;
        $[15] = confirmDelete;
        $[16] = onDeleteDashboard;
        $[17] = t6;
    } else {
        t6 = $[17];
    }
    const handleDelete = t6;
    let t7;
    if ($[18] !== newName || $[19] !== onCreateDashboard) {
        t7 = function commitNew() {
            if (newName.trim()) {
                onCreateDashboard(newName.trim());
                setNewName("");
                setCreatingNew(false);
                setShowPicker(false);
            }
        };
        $[18] = newName;
        $[19] = onCreateDashboard;
        $[20] = t7;
    } else {
        t7 = $[20];
    }
    const commitNew = t7;
    let t8;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)"
        };
        $[21] = t8;
    } else {
        t8 = $[21];
    }
    let t9;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = ({
            "DashboardToolbar[<button>.onClick]": ()=>setShowPicker(_DashboardToolbarButtonOnClickSetShowPicker)
        })["DashboardToolbar[<button>.onClick]"];
        $[22] = t9;
    } else {
        t9 = $[22];
    }
    let t10;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = {
            background: "var(--bg-hover)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)"
        };
        $[23] = t10;
    } else {
        t10 = $[23];
    }
    let t11;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[11px]",
            style: {
                color: "var(--accent-brand)"
            },
            children: "⊞"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 195,
            columnNumber: 11
        }, this);
        $[24] = t11;
    } else {
        t11 = $[24];
    }
    const t12 = active?.name ?? "Select Dashboard";
    let t13;
    if ($[25] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "truncate flex-1 text-left",
            children: t12
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 205,
            columnNumber: 11
        }, this);
        $[25] = t12;
        $[26] = t13;
    } else {
        t13 = $[26];
    }
    let t14;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = {
            color: "var(--text-secondary)"
        };
        $[27] = t14;
    } else {
        t14 = $[27];
    }
    let t15;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-3.5 h-3.5 shrink-0",
            style: t14,
            viewBox: "0 0 16 16",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 6l4 4 4-4",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                lineNumber: 222,
                columnNumber: 133
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 222,
            columnNumber: 11
        }, this);
        $[28] = t15;
    } else {
        t15 = $[28];
    }
    let t16;
    if ($[29] !== t13) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t9,
            className: "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors text-sm font-medium min-w-[160px] max-w-[240px]",
            style: t10,
            children: [
                t11,
                t13,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 229,
            columnNumber: 11
        }, this);
        $[29] = t13;
        $[30] = t16;
    } else {
        t16 = $[30];
    }
    let t17;
    if ($[31] !== activeDashboardId || $[32] !== commitNew || $[33] !== creatingNew || $[34] !== dashboards || $[35] !== newName || $[36] !== onSelectDashboard || $[37] !== showPicker) {
        t17 = showPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-full left-0 mt-1 w-64 rounded-lg shadow-xl z-50 overflow-hidden",
            style: {
                background: "var(--surface)",
                border: "1px solid var(--border)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-1 max-h-56 overflow-y-auto",
                    children: dashboards.map({
                        "DashboardToolbar[dashboards.map()]": (d_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: {
                                    "DashboardToolbar[dashboards.map() > <button>.onClick]": ()=>{
                                        onSelectDashboard(d_0.id);
                                        setShowPicker(false);
                                    }
                                }["DashboardToolbar[dashboards.map() > <button>.onClick]"],
                                className: "w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors",
                                style: {
                                    color: d_0.id === activeDashboardId ? "var(--accent-brand)" : "var(--text-primary)"
                                },
                                onMouseEnter: _DashboardToolbarDashboardsMapButtonOnMouseEnter,
                                onMouseLeave: _DashboardToolbarDashboardsMapButtonOnMouseLeave,
                                children: [
                                    d_0.is_default && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px]",
                                        style: {
                                            color: "var(--accent-brand)"
                                        },
                                        children: "★"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                        lineNumber: 248,
                                        columnNumber: 161
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: d_0.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                        lineNumber: 250,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, d_0.id, true, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 241,
                                columnNumber: 56
                            }, this)
                    }["DashboardToolbar[dashboards.map()]"])
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                    lineNumber: 240,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-2",
                    style: {
                        borderTop: "1px solid var(--border)"
                    },
                    children: creatingNew ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                autoFocus: true,
                                value: newName,
                                onChange: {
                                    "DashboardToolbar[<input>.onChange]": (e_2)=>setNewName(e_2.target.value)
                                }["DashboardToolbar[<input>.onChange]"],
                                onKeyDown: {
                                    "DashboardToolbar[<input>.onKeyDown]": (e_3)=>{
                                        if (e_3.key === "Enter") {
                                            commitNew();
                                        }
                                        if (e_3.key === "Escape") {
                                            setCreatingNew(false);
                                        }
                                    }
                                }["DashboardToolbar[<input>.onKeyDown]"],
                                placeholder: "Dashboard name...",
                                className: "flex-1 rounded px-2 py-1 text-xs outline-none",
                                style: {
                                    background: "var(--bg-hover)",
                                    border: "1px solid var(--border)",
                                    color: "var(--text-primary)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 253,
                                columnNumber: 55
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: commitNew,
                                className: "px-2 py-1 text-xs rounded transition-colors",
                                style: {
                                    background: "var(--accent-brand)",
                                    color: "#fff"
                                },
                                children: "Create"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 268,
                                columnNumber: 16
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                        lineNumber: 253,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "DashboardToolbar[<button>.onClick]": ()=>setCreatingNew(true)
                        }["DashboardToolbar[<button>.onClick]"],
                        className: "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded transition-colors",
                        style: {
                            color: "var(--text-secondary)"
                        },
                        onMouseEnter: _DashboardToolbarButtonOnMouseEnter,
                        onMouseLeave: _DashboardToolbarButtonOnMouseLeave,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "var(--accent-brand)"
                                },
                                children: "+"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 275,
                                columnNumber: 114
                            }, this),
                            " New Dashboard"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                        lineNumber: 271,
                        columnNumber: 38
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                    lineNumber: 251,
                    columnNumber: 56
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 237,
            columnNumber: 25
        }, this);
        $[31] = activeDashboardId;
        $[32] = commitNew;
        $[33] = creatingNew;
        $[34] = dashboards;
        $[35] = newName;
        $[36] = onSelectDashboard;
        $[37] = showPicker;
        $[38] = t17;
    } else {
        t17 = $[38];
    }
    let t18;
    if ($[39] !== t16 || $[40] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            ref: pickerRef,
            children: [
                t16,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 291,
            columnNumber: 11
        }, this);
        $[39] = t16;
        $[40] = t17;
        $[41] = t18;
    } else {
        t18 = $[41];
    }
    let t19;
    if ($[42] !== active || $[43] !== activeDashboardId || $[44] !== commitRename || $[45] !== confirmDelete || $[46] !== handleDelete || $[47] !== onDuplicateDashboard || $[48] !== onResetToDefaults || $[49] !== renameVal || $[50] !== renaming || $[51] !== showActions || $[52] !== startRename) {
        t19 = renaming ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    autoFocus: true,
                    value: renameVal,
                    onChange: {
                        "DashboardToolbar[<input>.onChange]": (e_6)=>setRenameVal(e_6.target.value)
                    }["DashboardToolbar[<input>.onChange]"],
                    onKeyDown: {
                        "DashboardToolbar[<input>.onKeyDown]": (e_7)=>{
                            if (e_7.key === "Enter") {
                                commitRename();
                            }
                            if (e_7.key === "Escape") {
                                setRenaming(false);
                            }
                        }
                    }["DashboardToolbar[<input>.onKeyDown]"],
                    className: "rounded px-2 py-1 text-xs outline-none w-40",
                    style: {
                        background: "var(--bg-hover)",
                        border: "1px solid var(--accent-brand)",
                        color: "var(--text-primary)"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                    lineNumber: 300,
                    columnNumber: 65
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: commitRename,
                    className: "text-xs px-1",
                    style: {
                        color: "var(--accent-brand)"
                    },
                    children: "✓"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                    lineNumber: 315,
                    columnNumber: 12
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "DashboardToolbar[<button>.onClick]": ()=>setRenaming(false)
                    }["DashboardToolbar[<button>.onClick]"],
                    className: "text-xs px-1",
                    style: {
                        color: "var(--text-secondary)"
                    },
                    children: "✕"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                    lineNumber: 317,
                    columnNumber: 20
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 300,
            columnNumber: 22
        }, this) : active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            ref: actionsRef,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "DashboardToolbar[<button>.onClick]": ()=>setShowActions(_DashboardToolbarButtonOnClickSetShowActions)
                    }["DashboardToolbar[<button>.onClick]"],
                    className: "p-1.5 rounded transition-colors",
                    style: {
                        color: "var(--text-secondary)"
                    },
                    onMouseEnter: _DashboardToolbarButtonOnMouseEnter2,
                    onMouseLeave: _DashboardToolbarButtonOnMouseLeave2,
                    title: "Dashboard options",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4",
                        viewBox: "0 0 16 16",
                        fill: "currentColor",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "8",
                                cy: "3",
                                r: "1.2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 325,
                                columnNumber: 205
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "8",
                                cy: "8",
                                r: "1.2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 325,
                                columnNumber: 237
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "8",
                                cy: "13",
                                r: "1.2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 325,
                                columnNumber: 269
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                        lineNumber: 325,
                        columnNumber: 140
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                    lineNumber: 321,
                    columnNumber: 82
                }, this),
                showActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-full left-0 mt-1 w-44 rounded-lg shadow-xl z-50 overflow-hidden",
                    style: {
                        background: "var(--surface)",
                        border: "1px solid var(--border)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: startRename,
                            className: "w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors",
                            style: {
                                color: "var(--text-primary)"
                            },
                            onMouseEnter: _DashboardToolbarButtonOnMouseEnter3,
                            onMouseLeave: _DashboardToolbarButtonOnMouseLeave3,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "✎"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                    lineNumber: 330,
                                    columnNumber: 116
                                }, this),
                                " Rename"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                            lineNumber: 328,
                            columnNumber: 10
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: {
                                "DashboardToolbar[<button>.onClick]": ()=>{
                                    onDuplicateDashboard(activeDashboardId);
                                    setShowActions(false);
                                }
                            }["DashboardToolbar[<button>.onClick]"],
                            className: "w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors",
                            style: {
                                color: "var(--text-primary)"
                            },
                            onMouseEnter: _DashboardToolbarButtonOnMouseEnter4,
                            onMouseLeave: _DashboardToolbarButtonOnMouseLeave4,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "⎘"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                    lineNumber: 337,
                                    columnNumber: 116
                                }, this),
                                " Duplicate"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                            lineNumber: 330,
                            columnNumber: 146
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-1 pt-1",
                            style: {
                                borderTop: "1px solid var(--border)"
                            },
                            children: [
                                onResetToDefaults && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: {
                                        "DashboardToolbar[<button>.onClick]": ()=>{
                                            onResetToDefaults(activeDashboardId);
                                            setShowActions(false);
                                        }
                                    }["DashboardToolbar[<button>.onClick]"],
                                    className: "w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors",
                                    style: {
                                        color: "var(--text-secondary)"
                                    },
                                    onMouseEnter: _DashboardToolbarButtonOnMouseEnter5,
                                    onMouseLeave: _DashboardToolbarButtonOnMouseLeave5,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "↺"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                            lineNumber: 346,
                                            columnNumber: 118
                                        }, this),
                                        " Reset to Defaults"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                    lineNumber: 339,
                                    columnNumber: 34
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleDelete,
                                    className: "w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors",
                                    style: {
                                        color: confirmDelete ? "#EF4444" : "var(--text-secondary)",
                                        background: confirmDelete ? "rgba(239,68,68,0.1)" : "transparent"
                                    },
                                    onMouseEnter: {
                                        "DashboardToolbar[<button>.onMouseEnter]": (e_16)=>{
                                            if (!confirmDelete) {
                                                e_16.currentTarget.style.color = "#EF4444";
                                                e_16.currentTarget.style.background = "rgba(239,68,68,0.08)";
                                            }
                                        }
                                    }["DashboardToolbar[<button>.onMouseEnter]"],
                                    onMouseLeave: {
                                        "DashboardToolbar[<button>.onMouseLeave]": (e_17)=>{
                                            if (!confirmDelete) {
                                                e_17.currentTarget.style.color = "var(--text-secondary)";
                                                e_17.currentTarget.style.background = "transparent";
                                            }
                                        }
                                    }["DashboardToolbar[<button>.onMouseLeave]"],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "⊗"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                            lineNumber: 363,
                                            columnNumber: 57
                                        }, this),
                                        " ",
                                        confirmDelete ? "Confirm delete?" : "Delete"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                    lineNumber: 346,
                                    columnNumber: 160
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                            lineNumber: 337,
                            columnNumber: 149
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                    lineNumber: 325,
                    columnNumber: 333
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 321,
            columnNumber: 39
        }, this);
        $[42] = active;
        $[43] = activeDashboardId;
        $[44] = commitRename;
        $[45] = confirmDelete;
        $[46] = handleDelete;
        $[47] = onDuplicateDashboard;
        $[48] = onResetToDefaults;
        $[49] = renameVal;
        $[50] = renaming;
        $[51] = showActions;
        $[52] = startRename;
        $[53] = t19;
    } else {
        t19 = $[53];
    }
    let t20;
    if ($[54] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 381,
            columnNumber: 11
        }, this);
        $[54] = t20;
    } else {
        t20 = $[54];
    }
    let t21;
    if ($[55] !== saving) {
        t21 = saving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px] animate-pulse",
            style: {
                color: "var(--text-secondary)"
            },
            children: "Saving…"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 388,
            columnNumber: 21
        }, this);
        $[55] = saving;
        $[56] = t21;
    } else {
        t21 = $[56];
    }
    let t22;
    let t23;
    if ($[57] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = {
            background: "var(--accent-brand)",
            color: "#fff"
        };
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-base leading-none",
            children: "+"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 403,
            columnNumber: 11
        }, this);
        $[57] = t22;
        $[58] = t23;
    } else {
        t22 = $[57];
        t23 = $[58];
    }
    let t24;
    if ($[59] !== onAddWidget) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onAddWidget,
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
            style: t22,
            children: [
                t23,
                "Add Widget"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 412,
            columnNumber: 11
        }, this);
        $[59] = onAddWidget;
        $[60] = t24;
    } else {
        t24 = $[60];
    }
    let t25;
    if ($[61] !== t18 || $[62] !== t19 || $[63] !== t21 || $[64] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 px-4 py-2.5 flex-wrap",
            style: t8,
            children: [
                t18,
                t19,
                t20,
                t21,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
            lineNumber: 420,
            columnNumber: 11
        }, this);
        $[61] = t18;
        $[62] = t19;
        $[63] = t21;
        $[64] = t24;
        $[65] = t25;
    } else {
        t25 = $[65];
    }
    return t25;
}
_s(DashboardToolbar, "HhMFWa6dgFZdRkXJnu3ztmIfnKo=");
_c = DashboardToolbar;
function _DashboardToolbarButtonOnMouseLeave5(e_15) {
    e_15.currentTarget.style.background = "transparent";
    e_15.currentTarget.style.color = "var(--text-secondary)";
}
function _DashboardToolbarButtonOnMouseEnter5(e_14) {
    e_14.currentTarget.style.background = "var(--bg-hover)";
    e_14.currentTarget.style.color = "var(--accent-brand)";
}
function _DashboardToolbarButtonOnMouseLeave4(e_13) {
    e_13.currentTarget.style.background = "transparent";
}
function _DashboardToolbarButtonOnMouseEnter4(e_12) {
    e_12.currentTarget.style.background = "var(--bg-hover)";
}
function _DashboardToolbarButtonOnMouseLeave3(e_11) {
    e_11.currentTarget.style.background = "transparent";
}
function _DashboardToolbarButtonOnMouseEnter3(e_10) {
    e_10.currentTarget.style.background = "var(--bg-hover)";
}
function _DashboardToolbarButtonOnMouseLeave2(e_9) {
    e_9.currentTarget.style.background = "transparent";
    e_9.currentTarget.style.color = "var(--text-secondary)";
}
function _DashboardToolbarButtonOnMouseEnter2(e_8) {
    e_8.currentTarget.style.background = "var(--bg-hover)";
    e_8.currentTarget.style.color = "var(--text-primary)";
}
function _DashboardToolbarButtonOnClickSetShowActions(p_0) {
    return !p_0;
}
function _DashboardToolbarButtonOnMouseLeave(e_5) {
    e_5.currentTarget.style.background = "transparent";
    e_5.currentTarget.style.color = "var(--text-secondary)";
}
function _DashboardToolbarButtonOnMouseEnter(e_4) {
    e_4.currentTarget.style.background = "var(--bg-hover)";
    e_4.currentTarget.style.color = "var(--text-primary)";
}
function _DashboardToolbarDashboardsMapButtonOnMouseLeave(e_1) {
    e_1.currentTarget.style.background = "transparent";
}
function _DashboardToolbarDashboardsMapButtonOnMouseEnter(e_0) {
    e_0.currentTarget.style.background = "var(--bg-hover)";
}
function _DashboardToolbarButtonOnClickSetShowPicker(p) {
    return !p;
}
var _c;
__turbopack_context__.k.register(_c, "DashboardToolbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/charts/WidgetTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetTable",
    ()=>WidgetTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function formatValue(val, col) {
    if (val === null || val === undefined) return '—';
    const n = Number(val);
    if (isNaN(n)) return String(val);
    switch(col.format){
        case 'percent':
            return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
        case 'currency':
            return n >= 1e7 ? `₹${(n / 1e7).toFixed(2)}Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(2)}L` : `₹${n.toLocaleString('en-IN', {
                maximumFractionDigits: 2
            })}`;
        case 'number':
            return n >= 1e7 ? `${(n / 1e7).toFixed(2)}Cr` : n >= 1e5 ? `${(n / 1e5).toFixed(2)}L` : n.toLocaleString('en-IN', {
                maximumFractionDigits: 2
            });
        default:
            return String(val);
    }
}
function valueColor(val, col) {
    if (!col.colorCode) return {};
    const n = Number(val);
    if (isNaN(n)) return {};
    if (n > 0) return {
        color: 'var(--positive, #10B981)'
    };
    if (n < 0) return {
        color: 'var(--negative, #EF4444)'
    };
    return {
        color: 'var(--text-secondary)'
    };
}
function WidgetTable(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(46);
    if ($[0] !== "d19a80725829cbc56f1b7c8d61696e960a33615af485bc549162d3c44e93a549") {
        for(let $i = 0; $i < 46; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d19a80725829cbc56f1b7c8d61696e960a33615af485bc549162d3c44e93a549";
    }
    const { rows, columns } = t0;
    const [sortCol, setSortCol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sortDir, setSortDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc");
    let t1;
    if ($[1] !== columns) {
        t1 = columns.find(_WidgetTableColumnsFind);
        $[1] = columns;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const symbolCol = t1;
    let sorted;
    let t2;
    let t3;
    let t4;
    let t5;
    if ($[3] !== columns || $[4] !== rows || $[5] !== sortCol || $[6] !== sortDir || $[7] !== symbolCol) {
        let t6;
        if ($[13] !== sortCol || $[14] !== sortDir) {
            t6 = ({
                "WidgetTable[(anonymous)()]": (a, b)=>{
                    if (!sortCol) {
                        return 0;
                    }
                    const av = a[sortCol] ?? 0;
                    const bv = b[sortCol] ?? 0;
                    const cmp = Number(av) - Number(bv);
                    return sortDir === "asc" ? cmp : -cmp;
                }
            })["WidgetTable[(anonymous)()]"];
            $[13] = sortCol;
            $[14] = sortDir;
            $[15] = t6;
        } else {
            t6 = $[15];
        }
        sorted = [
            ...rows
        ].sort(t6);
        let t7;
        if ($[16] !== sortCol) {
            t7 = function handleSort(colId) {
                if (sortCol === colId) {
                    setSortDir(_WidgetTableHandleSortSetSortDir);
                } else {
                    setSortCol(colId);
                    setSortDir("desc");
                }
            };
            $[16] = sortCol;
            $[17] = t7;
        } else {
            t7 = $[17];
        }
        const handleSort = t7;
        t5 = "overflow-auto h-full";
        t3 = "w-full text-xs border-collapse";
        let t8;
        if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
            t8 = {
                background: "var(--surface)"
            };
            $[18] = t8;
        } else {
            t8 = $[18];
        }
        let t9;
        if ($[19] !== columns || $[20] !== handleSort || $[21] !== sortCol || $[22] !== sortDir) {
            let t10;
            if ($[24] !== handleSort || $[25] !== sortCol || $[26] !== sortDir) {
                t10 = ({
                    "WidgetTable[columns.map()]": (col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                            onClick: {
                                "WidgetTable[columns.map() > <th>.onClick]": ()=>handleSort(col.id)
                            }["WidgetTable[columns.map() > <th>.onClick]"],
                            className: "px-2 py-1.5 text-left text-[11px] font-medium cursor-pointer whitespace-nowrap select-none",
                            style: {
                                color: sortCol === col.id ? "var(--accent-brand)" : "var(--text-secondary)",
                                borderBottom: "1px solid var(--border)"
                            },
                            children: [
                                col.label,
                                sortCol === col.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ml-1",
                                    style: {
                                        color: "var(--accent-brand)"
                                    },
                                    children: sortDir === "asc" ? "\u2191" : "\u2193"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                                    lineNumber: 130,
                                    columnNumber: 48
                                }, this)
                            ]
                        }, col.id, true, {
                            fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                            lineNumber: 125,
                            columnNumber: 48
                        }, this)
                })["WidgetTable[columns.map()]"];
                $[24] = handleSort;
                $[25] = sortCol;
                $[26] = sortDir;
                $[27] = t10;
            } else {
                t10 = $[27];
            }
            t9 = columns.map(t10);
            $[19] = columns;
            $[20] = handleSort;
            $[21] = sortCol;
            $[22] = sortDir;
            $[23] = t9;
        } else {
            t9 = $[23];
        }
        if ($[28] !== t9) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                className: "sticky top-0 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                    style: t8,
                    children: t9
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                    lineNumber: 151,
                    columnNumber: 49
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                lineNumber: 151,
                columnNumber: 12
            }, this);
            $[28] = t9;
            $[29] = t4;
        } else {
            t4 = $[29];
        }
        let t10;
        if ($[30] !== columns || $[31] !== symbolCol) {
            t10 = ({
                "WidgetTable[sorted.map()]": (row, i)=>{
                    const symbol = symbolCol ? String(row[symbolCol.id] ?? row.symbol ?? "") : "";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "transition-colors",
                        style: {
                            borderBottom: "1px solid var(--border)"
                        },
                        onMouseEnter: _WidgetTableSortedMapTrOnMouseEnter,
                        onMouseLeave: _WidgetTableSortedMapTrOnMouseLeave,
                        children: columns.map({
                            "WidgetTable[sorted.map() > columns.map()]": (col_0)=>{
                                const val = row[col_0.id];
                                const isSymbol = col_0.dslName === "symbol";
                                const colorStyle = valueColor(val, col_0);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-2 py-1.5 whitespace-nowrap",
                                    style: colorStyle,
                                    children: isSymbol && symbol ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/stocks/${symbol}`,
                                        className: "font-mono font-medium",
                                        style: {
                                            color: "var(--accent-brand)"
                                        },
                                        children: symbol
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                                        lineNumber: 169,
                                        columnNumber: 126
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: col_0.format !== "text" ? "font-mono" : "",
                                        style: Object.keys(colorStyle).length === 0 ? {
                                            color: col_0.format === "text" ? "var(--text-primary)" : "var(--text-primary)"
                                        } : {},
                                        children: formatValue(val, col_0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                                        lineNumber: 171,
                                        columnNumber: 40
                                    }, this)
                                }, col_0.id, false, {
                                    fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                                    lineNumber: 169,
                                    columnNumber: 24
                                }, this);
                            }
                        }["WidgetTable[sorted.map() > columns.map()]"])
                    }, i, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                        lineNumber: 162,
                        columnNumber: 18
                    }, this);
                }
            })["WidgetTable[sorted.map()]"];
            $[30] = columns;
            $[31] = symbolCol;
            $[32] = t10;
        } else {
            t10 = $[32];
        }
        t2 = sorted.map(t10);
        $[3] = columns;
        $[4] = rows;
        $[5] = sortCol;
        $[6] = sortDir;
        $[7] = symbolCol;
        $[8] = sorted;
        $[9] = t2;
        $[10] = t3;
        $[11] = t4;
        $[12] = t5;
    } else {
        sorted = $[8];
        t2 = $[9];
        t3 = $[10];
        t4 = $[11];
        t5 = $[12];
    }
    let t6;
    if ($[33] !== columns.length || $[34] !== sorted.length) {
        t6 = sorted.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                colSpan: columns.length,
                className: "py-8 text-center text-xs",
                style: {
                    color: "var(--text-secondary)"
                },
                children: "No data"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                lineNumber: 204,
                columnNumber: 37
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
            lineNumber: 204,
            columnNumber: 33
        }, this);
        $[33] = columns.length;
        $[34] = sorted.length;
        $[35] = t6;
    } else {
        t6 = $[35];
    }
    let t7;
    if ($[36] !== t2 || $[37] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
            children: [
                t2,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
            lineNumber: 215,
            columnNumber: 10
        }, this);
        $[36] = t2;
        $[37] = t6;
        $[38] = t7;
    } else {
        t7 = $[38];
    }
    let t8;
    if ($[39] !== t3 || $[40] !== t4 || $[41] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: t3,
            children: [
                t4,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
            lineNumber: 224,
            columnNumber: 10
        }, this);
        $[39] = t3;
        $[40] = t4;
        $[41] = t7;
        $[42] = t8;
    } else {
        t8 = $[42];
    }
    let t9;
    if ($[43] !== t5 || $[44] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t5,
            children: t8
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
            lineNumber: 234,
            columnNumber: 10
        }, this);
        $[43] = t5;
        $[44] = t8;
        $[45] = t9;
    } else {
        t9 = $[45];
    }
    return t9;
}
_s(WidgetTable, "kwiOqMJwQJMSQZccU0z//bElZ2s=");
_c = WidgetTable;
function _WidgetTableSortedMapTrOnMouseLeave(e_0) {
    e_0.currentTarget.style.background = "transparent";
}
function _WidgetTableSortedMapTrOnMouseEnter(e) {
    e.currentTarget.style.background = "var(--bg-hover)";
}
function _WidgetTableHandleSortSetSortDir(d) {
    return d === "asc" ? "desc" : "asc";
}
function _WidgetTableColumnsFind(c) {
    return c.dslName === "symbol";
}
var _c;
__turbopack_context__.k.register(_c, "WidgetTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/charts/WidgetBarChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetBarChart",
    ()=>WidgetBarChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
'use client';
;
;
;
const COLORS = [
    '#F59E0B',
    '#3B82F6',
    '#10B981',
    '#8B5CF6',
    '#EF4444',
    '#06B6D4',
    '#F97316',
    '#84CC16',
    '#EC4899',
    '#6366F1'
];
function getColor(val, col) {
    if (!col?.colorCode) return COLORS[0];
    const n = Number(val);
    if (isNaN(n)) return COLORS[0];
    return n >= 0 ? '#10B981' : '#EF4444';
}
const CustomTooltip = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "8a0f45313325b326c5bffbcbe138e363939e84c400ebe8c925d4749c798fe1b6") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8a0f45313325b326c5bffbcbe138e363939e84c400ebe8c925d4749c798fe1b6";
    }
    const { active, payload, label } = t0;
    if (!active || !Array.isArray(payload) || payload.length === 0) {
        return null;
    }
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            background: "var(--surface)",
            border: "1px solid var(--border)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            color: "var(--text-primary)"
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const t3 = String(label);
    let t4;
    if ($[3] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mb-1 font-mono",
            style: t2,
            children: t3
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
            lineNumber: 57,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[3] = t3;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    const t5 = payload;
    let t6;
    if ($[5] !== t5) {
        t6 = t5.map(_temp);
        $[5] = t5;
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    let t7;
    if ($[7] !== t4 || $[8] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded px-3 py-2 text-xs shadow-lg",
            style: t1,
            children: [
                t4,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
            lineNumber: 78,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[7] = t4;
        $[8] = t6;
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    return t7;
};
_c = CustomTooltip;
function WidgetBarChart(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(53);
    if ($[0] !== "8a0f45313325b326c5bffbcbe138e363939e84c400ebe8c925d4749c798fe1b6") {
        for(let $i = 0; $i < 53; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8a0f45313325b326c5bffbcbe138e363939e84c400ebe8c925d4749c798fe1b6";
    }
    const { rows, columns, chartConfig } = t0;
    const xKey = chartConfig?.xAxis ?? columns[0]?.id ?? "symbol";
    const yKey = chartConfig?.yAxis ?? columns[1]?.id ?? columns[0]?.id ?? "value";
    let T0;
    let T1;
    let T2;
    let t1;
    let t10;
    let t11;
    let t12;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[1] !== chartConfig?.colorField || $[2] !== columns || $[3] !== rows || $[4] !== xKey || $[5] !== yKey) {
        let t13;
        if ($[21] !== chartConfig?.colorField || $[22] !== yKey) {
            t13 = ({
                "WidgetBarChart[columns.find()]": (c)=>c.id === (chartConfig?.colorField ?? yKey)
            })["WidgetBarChart[columns.find()]"];
            $[21] = chartConfig?.colorField;
            $[22] = yKey;
            $[23] = t13;
        } else {
            t13 = $[23];
        }
        const colorCol = columns.find(t13);
        let t14;
        if ($[24] !== xKey) {
            t14 = ({
                "WidgetBarChart[rows.map()]": (r)=>({
                        ...r,
                        _label: String(r[xKey] ?? "")
                    })
            })["WidgetBarChart[rows.map()]"];
            $[24] = xKey;
            $[25] = t14;
        } else {
            t14 = $[25];
        }
        const data = rows.map(t14);
        T2 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"];
        t11 = "100%";
        t12 = "100%";
        T1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"];
        t5 = data;
        if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
            t6 = {
                top: 4,
                right: 8,
                bottom: 20,
                left: 8
            };
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                strokeDasharray: "3 3",
                stroke: "var(--border)",
                vertical: false
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                lineNumber: 156,
                columnNumber: 12
            }, this);
            $[26] = t6;
            $[27] = t7;
        } else {
            t6 = $[26];
            t7 = $[27];
        }
        let t15;
        if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
            t15 = {
                fill: "var(--text-secondary)",
                fontSize: 10
            };
            $[28] = t15;
        } else {
            t15 = $[28];
        }
        if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                dataKey: "_label",
                tick: t15,
                tickLine: false,
                axisLine: {
                    stroke: "var(--border)"
                },
                angle: -30,
                textAnchor: "end",
                interval: 0,
                height: 40
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                lineNumber: 174,
                columnNumber: 12
            }, this);
            $[29] = t8;
        } else {
            t8 = $[29];
        }
        if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
            t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                tick: {
                    fill: "var(--text-secondary)",
                    fontSize: 10
                },
                tickLine: false,
                axisLine: false,
                tickFormatter: _WidgetBarChartYAxisTickFormatter,
                width: 45
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                lineNumber: 182,
                columnNumber: 12
            }, this);
            $[30] = t9;
        } else {
            t9 = $[30];
        }
        if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
            t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                    lineNumber: 191,
                    columnNumber: 31
                }, void 0),
                cursor: {
                    fill: "rgba(148,163,184,0.05)"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                lineNumber: 191,
                columnNumber: 13
            }, this);
            $[31] = t10;
        } else {
            t10 = $[31];
        }
        T0 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"];
        t1 = yKey;
        if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
            t2 = [
                3,
                3,
                0,
                0
            ];
            $[32] = t2;
        } else {
            t2 = $[32];
        }
        t3 = 40;
        t4 = data.map({
            "WidgetBarChart[data.map()]": (entry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                    fill: colorCol ? getColor(entry[yKey], colorCol) : COLORS[i % COLORS.length]
                }, i, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                    lineNumber: 208,
                    columnNumber: 51
                }, this)
        }["WidgetBarChart[data.map()]"]);
        $[1] = chartConfig?.colorField;
        $[2] = columns;
        $[3] = rows;
        $[4] = xKey;
        $[5] = yKey;
        $[6] = T0;
        $[7] = T1;
        $[8] = T2;
        $[9] = t1;
        $[10] = t10;
        $[11] = t11;
        $[12] = t12;
        $[13] = t2;
        $[14] = t3;
        $[15] = t4;
        $[16] = t5;
        $[17] = t6;
        $[18] = t7;
        $[19] = t8;
        $[20] = t9;
    } else {
        T0 = $[6];
        T1 = $[7];
        T2 = $[8];
        t1 = $[9];
        t10 = $[10];
        t11 = $[11];
        t12 = $[12];
        t2 = $[13];
        t3 = $[14];
        t4 = $[15];
        t5 = $[16];
        t6 = $[17];
        t7 = $[18];
        t8 = $[19];
        t9 = $[20];
    }
    let t13;
    if ($[33] !== T0 || $[34] !== t1 || $[35] !== t2 || $[36] !== t3 || $[37] !== t4) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T0, {
            dataKey: t1,
            radius: t2,
            maxBarSize: t3,
            children: t4
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
            lineNumber: 249,
            columnNumber: 11
        }, this);
        $[33] = T0;
        $[34] = t1;
        $[35] = t2;
        $[36] = t3;
        $[37] = t4;
        $[38] = t13;
    } else {
        t13 = $[38];
    }
    let t14;
    if ($[39] !== T1 || $[40] !== t10 || $[41] !== t13 || $[42] !== t5 || $[43] !== t6 || $[44] !== t7 || $[45] !== t8 || $[46] !== t9) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T1, {
            data: t5,
            margin: t6,
            children: [
                t7,
                t8,
                t9,
                t10,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
            lineNumber: 261,
            columnNumber: 11
        }, this);
        $[39] = T1;
        $[40] = t10;
        $[41] = t13;
        $[42] = t5;
        $[43] = t6;
        $[44] = t7;
        $[45] = t8;
        $[46] = t9;
        $[47] = t14;
    } else {
        t14 = $[47];
    }
    let t15;
    if ($[48] !== T2 || $[49] !== t11 || $[50] !== t12 || $[51] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T2, {
            width: t11,
            height: t12,
            children: t14
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
            lineNumber: 276,
            columnNumber: 11
        }, this);
        $[48] = T2;
        $[49] = t11;
        $[50] = t12;
        $[51] = t14;
        $[52] = t15;
    } else {
        t15 = $[52];
    }
    return t15;
}
_c1 = WidgetBarChart;
function _WidgetBarChartYAxisTickFormatter(v) {
    return v >= 100000 ? `${(v / 100000).toFixed(0)}L` : v.toFixed(1);
}
function _temp(p, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        style: {
            color: p.color
        },
        className: "font-mono",
        children: typeof p.value === "number" ? p.value.toFixed(2) : String(p.value)
    }, i, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
        lineNumber: 291,
        columnNumber: 10
    }, this);
}
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomTooltip");
__turbopack_context__.k.register(_c1, "WidgetBarChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/charts/WidgetHBarChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetHBarChart",
    ()=>WidgetHBarChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
'use client';
;
;
;
const CustomTooltip = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "f14d467acc3927c5b1b94572126dca035b4da0c8870ab7107f1a29af776adb15") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f14d467acc3927c5b1b94572126dca035b4da0c8870ab7107f1a29af776adb15";
    }
    const { active, payload, label } = t0;
    if (!active || !Array.isArray(payload) || payload.length === 0) {
        return null;
    }
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            background: "var(--surface)",
            border: "1px solid var(--border)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            color: "var(--text-primary)"
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const t3 = String(label);
    let t4;
    if ($[3] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mb-1 font-mono font-medium",
            style: t2,
            children: t3
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
            lineNumber: 50,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[3] = t3;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    const t5 = payload;
    let t6;
    if ($[5] !== t5) {
        t6 = t5.map(_temp);
        $[5] = t5;
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    let t7;
    if ($[7] !== t4 || $[8] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded px-3 py-2 text-xs shadow-lg",
            style: t1,
            children: [
                t4,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
            lineNumber: 71,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[7] = t4;
        $[8] = t6;
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    return t7;
};
_c = CustomTooltip;
function WidgetHBarChart(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(66);
    if ($[0] !== "f14d467acc3927c5b1b94572126dca035b4da0c8870ab7107f1a29af776adb15") {
        for(let $i = 0; $i < 66; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f14d467acc3927c5b1b94572126dca035b4da0c8870ab7107f1a29af776adb15";
    }
    const { rows, columns, chartConfig } = t0;
    const xKey = chartConfig?.xAxis ?? columns[1]?.id ?? columns[0]?.id;
    const yKey = chartConfig?.yAxis ?? columns[0]?.id ?? "symbol";
    let t1;
    if ($[1] !== chartConfig?.colorField || $[2] !== columns || $[3] !== xKey) {
        let t2;
        if ($[5] !== chartConfig?.colorField || $[6] !== xKey) {
            t2 = ({
                "WidgetHBarChart[columns.find()]": (c)=>c.id === (chartConfig?.colorField ?? xKey)
            })["WidgetHBarChart[columns.find()]"];
            $[5] = chartConfig?.colorField;
            $[6] = xKey;
            $[7] = t2;
        } else {
            t2 = $[7];
        }
        t1 = columns.find(t2);
        $[1] = chartConfig?.colorField;
        $[2] = columns;
        $[3] = xKey;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const colorCol = t1;
    let T0;
    let T1;
    let T2;
    let t10;
    let t11;
    let t12;
    let t13;
    let t14;
    let t15;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[8] !== colorCol?.colorCode || $[9] !== colorCol?.format || $[10] !== rows || $[11] !== xKey || $[12] !== yKey) {
        let t16;
        if ($[30] !== xKey || $[31] !== yKey) {
            t16 = ({
                "WidgetHBarChart[rows.map()]": (r)=>({
                        ...r,
                        _label: String(r[yKey] ?? ""),
                        _value: Number(r[xKey] ?? 0)
                    })
            })["WidgetHBarChart[rows.map()]"];
            $[30] = xKey;
            $[31] = yKey;
            $[32] = t16;
        } else {
            t16 = $[32];
        }
        const data = rows.map(t16);
        const hasNeg = data.some(_WidgetHBarChartDataSome);
        T2 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"];
        t14 = "100%";
        t15 = "100%";
        T1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"];
        t6 = "vertical";
        t7 = data;
        if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
            t8 = {
                top: 4,
                right: 40,
                bottom: 4,
                left: 4
            };
            t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                strokeDasharray: "3 3",
                stroke: "var(--border)",
                horizontal: false
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                lineNumber: 165,
                columnNumber: 12
            }, this);
            $[33] = t8;
            $[34] = t9;
        } else {
            t8 = $[33];
            t9 = $[34];
        }
        let t17;
        if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
            t17 = {
                fill: "var(--text-secondary)",
                fontSize: 10
            };
            $[35] = t17;
        } else {
            t17 = $[35];
        }
        let t18;
        if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
            t18 = {
                stroke: "var(--border)"
            };
            $[36] = t18;
        } else {
            t18 = $[36];
        }
        if ($[37] !== colorCol?.format) {
            t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                type: "number",
                tick: t17,
                tickLine: false,
                axisLine: t18,
                tickFormatter: {
                    "WidgetHBarChart[<XAxis>.tickFormatter]": (v)=>`${v.toFixed(1)}${colorCol?.format === "percent" ? "%" : ""}`
                }["WidgetHBarChart[<XAxis>.tickFormatter]"]
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                lineNumber: 192,
                columnNumber: 13
            }, this);
            $[37] = colorCol?.format;
            $[38] = t10;
        } else {
            t10 = $[38];
        }
        if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
            t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                type: "category",
                dataKey: "_label",
                tick: {
                    fill: "var(--text-secondary)",
                    fontSize: 10
                },
                tickLine: false,
                axisLine: false,
                width: 80
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                lineNumber: 201,
                columnNumber: 13
            }, this);
            $[39] = t11;
        } else {
            t11 = $[39];
        }
        if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
            t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                    lineNumber: 210,
                    columnNumber: 31
                }, void 0),
                cursor: {
                    fill: "var(--bg-hover)"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                lineNumber: 210,
                columnNumber: 13
            }, this);
            $[40] = t12;
        } else {
            t12 = $[40];
        }
        t13 = hasNeg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
            x: 0,
            stroke: "var(--border)"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
            lineNumber: 217,
            columnNumber: 21
        }, this);
        T0 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"];
        t2 = "_value";
        if ($[41] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = [
                0,
                3,
                3,
                0
            ];
            $[41] = t3;
        } else {
            t3 = $[41];
        }
        t4 = 20;
        let t19;
        if ($[42] !== colorCol?.colorCode) {
            t19 = ({
                "WidgetHBarChart[data.map()]": (entry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                        fill: colorCol?.colorCode ? entry._value >= 0 ? "#10B981" : "#EF4444" : "#F59E0B"
                    }, i, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                        lineNumber: 230,
                        columnNumber: 54
                    }, this)
            })["WidgetHBarChart[data.map()]"];
            $[42] = colorCol?.colorCode;
            $[43] = t19;
        } else {
            t19 = $[43];
        }
        t5 = data.map(t19);
        $[8] = colorCol?.colorCode;
        $[9] = colorCol?.format;
        $[10] = rows;
        $[11] = xKey;
        $[12] = yKey;
        $[13] = T0;
        $[14] = T1;
        $[15] = T2;
        $[16] = t10;
        $[17] = t11;
        $[18] = t12;
        $[19] = t13;
        $[20] = t14;
        $[21] = t15;
        $[22] = t2;
        $[23] = t3;
        $[24] = t4;
        $[25] = t5;
        $[26] = t6;
        $[27] = t7;
        $[28] = t8;
        $[29] = t9;
    } else {
        T0 = $[13];
        T1 = $[14];
        T2 = $[15];
        t10 = $[16];
        t11 = $[17];
        t12 = $[18];
        t13 = $[19];
        t14 = $[20];
        t15 = $[21];
        t2 = $[22];
        t3 = $[23];
        t4 = $[24];
        t5 = $[25];
        t6 = $[26];
        t7 = $[27];
        t8 = $[28];
        t9 = $[29];
    }
    let t16;
    if ($[44] !== T0 || $[45] !== t2 || $[46] !== t3 || $[47] !== t4 || $[48] !== t5) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T0, {
            dataKey: t2,
            radius: t3,
            maxBarSize: t4,
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
            lineNumber: 281,
            columnNumber: 11
        }, this);
        $[44] = T0;
        $[45] = t2;
        $[46] = t3;
        $[47] = t4;
        $[48] = t5;
        $[49] = t16;
    } else {
        t16 = $[49];
    }
    let t17;
    if ($[50] !== T1 || $[51] !== t10 || $[52] !== t11 || $[53] !== t12 || $[54] !== t13 || $[55] !== t16 || $[56] !== t6 || $[57] !== t7 || $[58] !== t8 || $[59] !== t9) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T1, {
            layout: t6,
            data: t7,
            margin: t8,
            children: [
                t9,
                t10,
                t11,
                t12,
                t13,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
            lineNumber: 293,
            columnNumber: 11
        }, this);
        $[50] = T1;
        $[51] = t10;
        $[52] = t11;
        $[53] = t12;
        $[54] = t13;
        $[55] = t16;
        $[56] = t6;
        $[57] = t7;
        $[58] = t8;
        $[59] = t9;
        $[60] = t17;
    } else {
        t17 = $[60];
    }
    let t18;
    if ($[61] !== T2 || $[62] !== t14 || $[63] !== t15 || $[64] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T2, {
            width: t14,
            height: t15,
            children: t17
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
            lineNumber: 310,
            columnNumber: 11
        }, this);
        $[61] = T2;
        $[62] = t14;
        $[63] = t15;
        $[64] = t17;
        $[65] = t18;
    } else {
        t18 = $[65];
    }
    return t18;
}
_c1 = WidgetHBarChart;
function _WidgetHBarChartDataSome(d) {
    return d._value < 0;
}
function _temp(p, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        style: {
            color: p.color
        },
        className: "font-mono",
        children: typeof p.value === "number" ? `${p.value >= 0 ? "+" : ""}${p.value.toFixed(2)}` : String(p.value)
    }, i, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
        lineNumber: 325,
        columnNumber: 10
    }, this);
}
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomTooltip");
__turbopack_context__.k.register(_c1, "WidgetHBarChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/charts/WidgetPieChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetPieChart",
    ()=>WidgetPieChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
'use client';
;
;
;
const COLORS = [
    '#F59E0B',
    '#3B82F6',
    '#10B981',
    '#8B5CF6',
    '#EF4444',
    '#06B6D4',
    '#F97316',
    '#84CC16',
    '#EC4899',
    '#6366F1',
    '#14B8A6',
    '#A78BFA',
    '#FB923C',
    '#4ADE80',
    '#F472B6'
];
const CustomTooltip = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "9f11f1f0f28197f5c1d417ab36bae0209ba38c6677b8fe2e28c2b8151ff9a4f1") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9f11f1f0f28197f5c1d417ab36bae0209ba38c6677b8fe2e28c2b8151ff9a4f1";
    }
    const { active, payload } = t0;
    if (!active || !Array.isArray(payload) || payload.length === 0) {
        return null;
    }
    const entry = payload[0];
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            background: "var(--surface)",
            border: "1px solid var(--border)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            color: "var(--text-primary)"
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== entry.name) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-medium mb-0.5",
            style: t2,
            children: entry.name
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[3] = entry.name;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            color: "var(--accent-brand)"
        };
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] !== entry.value) {
        t5 = entry.value.toLocaleString("en-IN", {
            maximumFractionDigits: 0
        });
        $[6] = entry.value;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-mono",
            style: t4,
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
            lineNumber: 83,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[8] = t5;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== entry.payload) {
        t7 = entry.payload?.pct != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            style: {
                color: "var(--text-secondary)"
            },
            children: [
                entry.payload.pct.toFixed(1),
                "%"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
            lineNumber: 91,
            columnNumber: 40
        }, ("TURBOPACK compile-time value", void 0));
        $[10] = entry.payload;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== t3 || $[13] !== t6 || $[14] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded px-3 py-2 text-xs shadow-lg",
            style: t1,
            children: [
                t3,
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
            lineNumber: 101,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[12] = t3;
        $[13] = t6;
        $[14] = t7;
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    return t8;
};
_c = CustomTooltip;
function WidgetPieChart(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(47);
    if ($[0] !== "9f11f1f0f28197f5c1d417ab36bae0209ba38c6677b8fe2e28c2b8151ff9a4f1") {
        for(let $i = 0; $i < 47; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9f11f1f0f28197f5c1d417ab36bae0209ba38c6677b8fe2e28c2b8151ff9a4f1";
    }
    const { rows, columns, chartConfig } = t0;
    const labelKey = chartConfig?.colorField ?? columns[0]?.id ?? "label";
    const valueKey = columns[1]?.id ?? columns[0]?.id ?? "value";
    let t1;
    if ($[1] !== valueKey) {
        t1 = ({
            "WidgetPieChart[rows.reduce()]": (s, r)=>s + Number(r[valueKey] ?? 0)
        })["WidgetPieChart[rows.reduce()]"];
        $[1] = valueKey;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const total = rows.reduce(t1, 0);
    let T0;
    let T1;
    let T2;
    let t10;
    let t11;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[3] !== chartConfig?.donut || $[4] !== labelKey || $[5] !== rows || $[6] !== total || $[7] !== valueKey) {
        let t12;
        if ($[21] !== labelKey || $[22] !== total || $[23] !== valueKey) {
            t12 = ({
                "WidgetPieChart[rows.map()]": (r_0)=>({
                        name: String(r_0[labelKey] ?? ""),
                        value: Number(r_0[valueKey] ?? 0),
                        pct: total > 0 ? Number(r_0[valueKey] ?? 0) / total * 100 : 0
                    })
            })["WidgetPieChart[rows.map()]"];
            $[21] = labelKey;
            $[22] = total;
            $[23] = valueKey;
            $[24] = t12;
        } else {
            t12 = $[24];
        }
        const data = rows.map(t12);
        const isDonut = chartConfig?.donut !== false;
        T2 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"];
        t10 = "100%";
        t11 = "100%";
        T1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"];
        T0 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"];
        t2 = data;
        t3 = "50%";
        t4 = "45%";
        t5 = isDonut ? "40%" : 0;
        t6 = "65%";
        t7 = 2;
        t8 = "value";
        t9 = data.map(_WidgetPieChartDataMap);
        $[3] = chartConfig?.donut;
        $[4] = labelKey;
        $[5] = rows;
        $[6] = total;
        $[7] = valueKey;
        $[8] = T0;
        $[9] = T1;
        $[10] = T2;
        $[11] = t10;
        $[12] = t11;
        $[13] = t2;
        $[14] = t3;
        $[15] = t4;
        $[16] = t5;
        $[17] = t6;
        $[18] = t7;
        $[19] = t8;
        $[20] = t9;
    } else {
        T0 = $[8];
        T1 = $[9];
        T2 = $[10];
        t10 = $[11];
        t11 = $[12];
        t2 = $[13];
        t3 = $[14];
        t4 = $[15];
        t5 = $[16];
        t6 = $[17];
        t7 = $[18];
        t8 = $[19];
        t9 = $[20];
    }
    let t12;
    if ($[25] !== T0 || $[26] !== t2 || $[27] !== t3 || $[28] !== t4 || $[29] !== t5 || $[30] !== t6 || $[31] !== t7 || $[32] !== t8 || $[33] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T0, {
            data: t2,
            cx: t3,
            cy: t4,
            innerRadius: t5,
            outerRadius: t6,
            paddingAngle: t7,
            dataKey: t8,
            children: t9
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
            lineNumber: 217,
            columnNumber: 11
        }, this);
        $[25] = T0;
        $[26] = t2;
        $[27] = t3;
        $[28] = t4;
        $[29] = t5;
        $[30] = t6;
        $[31] = t7;
        $[32] = t8;
        $[33] = t9;
        $[34] = t12;
    } else {
        t12 = $[34];
    }
    let t13;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
                lineNumber: 233,
                columnNumber: 29
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
            lineNumber: 233,
            columnNumber: 11
        }, this);
        $[35] = t13;
    } else {
        t13 = $[35];
    }
    let t14;
    if ($[36] !== chartConfig?.showLegend) {
        t14 = chartConfig?.showLegend !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
            iconType: "circle",
            iconSize: 8,
            formatter: _WidgetPieChartLegendFormatter
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
            lineNumber: 240,
            columnNumber: 48
        }, this);
        $[36] = chartConfig?.showLegend;
        $[37] = t14;
    } else {
        t14 = $[37];
    }
    let t15;
    if ($[38] !== T1 || $[39] !== t12 || $[40] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T1, {
            children: [
                t12,
                t13,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
            lineNumber: 248,
            columnNumber: 11
        }, this);
        $[38] = T1;
        $[39] = t12;
        $[40] = t14;
        $[41] = t15;
    } else {
        t15 = $[41];
    }
    let t16;
    if ($[42] !== T2 || $[43] !== t10 || $[44] !== t11 || $[45] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T2, {
            width: t10,
            height: t11,
            children: t15
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
            lineNumber: 258,
            columnNumber: 11
        }, this);
        $[42] = T2;
        $[43] = t10;
        $[44] = t11;
        $[45] = t15;
        $[46] = t16;
    } else {
        t16 = $[46];
    }
    return t16;
}
_c1 = WidgetPieChart;
function _WidgetPieChartLegendFormatter(value) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            color: "var(--text-secondary)",
            fontSize: 10
        },
        children: value
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
        lineNumber: 270,
        columnNumber: 10
    }, this);
}
function _WidgetPieChartDataMap(_, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
        fill: COLORS[i % COLORS.length],
        stroke: "transparent"
    }, i, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
        lineNumber: 276,
        columnNumber: 10
    }, this);
}
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomTooltip");
__turbopack_context__.k.register(_c1, "WidgetPieChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/charts/WidgetLineChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetLineChart",
    ()=>WidgetLineChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
'use client';
;
;
;
const LINE_COLORS = [
    '#F59E0B',
    '#3B82F6',
    '#10B981',
    '#8B5CF6',
    '#EF4444',
    '#06B6D4',
    '#F97316',
    '#84CC16'
];
const CustomTooltip = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "1c6cef40483bc1157b6b1960200e3222c149bb36392732cffa36cb9a7bbe7265") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1c6cef40483bc1157b6b1960200e3222c149bb36392732cffa36cb9a7bbe7265";
    }
    const { active, payload, label } = t0;
    if (!active || !Array.isArray(payload) || payload.length === 0) {
        return null;
    }
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            background: "var(--surface)",
            border: "1px solid var(--border)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            color: "var(--text-secondary)"
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const t3 = String(label);
    let t4;
    if ($[3] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mb-1",
            style: t2,
            children: t3
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
            lineNumber: 51,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[3] = t3;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    const t5 = payload;
    let t6;
    if ($[5] !== t5) {
        t6 = t5.map(_temp);
        $[5] = t5;
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    let t7;
    if ($[7] !== t4 || $[8] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded px-3 py-2 text-xs shadow-lg",
            style: t1,
            children: [
                t4,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
            lineNumber: 72,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[7] = t4;
        $[8] = t6;
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    return t7;
};
_c = CustomTooltip;
function WidgetLineChart(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(42);
    if ($[0] !== "1c6cef40483bc1157b6b1960200e3222c149bb36392732cffa36cb9a7bbe7265") {
        for(let $i = 0; $i < 42; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1c6cef40483bc1157b6b1960200e3222c149bb36392732cffa36cb9a7bbe7265";
    }
    const { rows, columns, chartConfig } = t0;
    const xKey = chartConfig?.xAxis ?? columns[0]?.id ?? "date";
    let T0;
    let T1;
    let t1;
    let t10;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[1] !== chartConfig?.showLegend || $[2] !== columns || $[3] !== rows || $[4] !== xKey) {
        let t11;
        if ($[17] !== xKey) {
            t11 = ({
                "WidgetLineChart[columns.filter()]": (c)=>c.id !== xKey && c.format !== "text"
            })["WidgetLineChart[columns.filter()]"];
            $[17] = xKey;
            $[18] = t11;
        } else {
            t11 = $[18];
        }
        const valueColumns = columns.filter(t11);
        T1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"];
        t9 = "100%";
        t10 = "100%";
        T0 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"];
        t1 = rows;
        if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
            t2 = {
                top: 4,
                right: 16,
                bottom: 4,
                left: 8
            };
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                strokeDasharray: "3 3",
                stroke: "var(--border)"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                lineNumber: 131,
                columnNumber: 12
            }, this);
            $[19] = t2;
            $[20] = t3;
        } else {
            t2 = $[19];
            t3 = $[20];
        }
        let t12;
        if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
            t12 = {
                fill: "var(--text-secondary)",
                fontSize: 10
            };
            $[21] = t12;
        } else {
            t12 = $[21];
        }
        let t13;
        if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
            t13 = {
                stroke: "var(--border)"
            };
            $[22] = t13;
        } else {
            t13 = $[22];
        }
        if ($[23] !== xKey) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                dataKey: xKey,
                tick: t12,
                tickLine: false,
                axisLine: t13
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                lineNumber: 158,
                columnNumber: 12
            }, this);
            $[23] = xKey;
            $[24] = t4;
        } else {
            t4 = $[24];
        }
        if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                tick: {
                    fill: "var(--text-secondary)",
                    fontSize: 10
                },
                tickLine: false,
                axisLine: false,
                width: 45,
                tickFormatter: _WidgetLineChartYAxisTickFormatter
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                lineNumber: 165,
                columnNumber: 12
            }, this);
            $[25] = t5;
        } else {
            t5 = $[25];
        }
        if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                    lineNumber: 174,
                    columnNumber: 30
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                lineNumber: 174,
                columnNumber: 12
            }, this);
            $[26] = t6;
        } else {
            t6 = $[26];
        }
        t7 = chartConfig?.showLegend !== false && valueColumns.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
            iconType: "circle",
            iconSize: 8,
            formatter: _WidgetLineChartLegendFormatter
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
            lineNumber: 179,
            columnNumber: 74
        }, this);
        t8 = valueColumns.map(_WidgetLineChartValueColumnsMap);
        $[1] = chartConfig?.showLegend;
        $[2] = columns;
        $[3] = rows;
        $[4] = xKey;
        $[5] = T0;
        $[6] = T1;
        $[7] = t1;
        $[8] = t10;
        $[9] = t2;
        $[10] = t3;
        $[11] = t4;
        $[12] = t5;
        $[13] = t6;
        $[14] = t7;
        $[15] = t8;
        $[16] = t9;
    } else {
        T0 = $[5];
        T1 = $[6];
        t1 = $[7];
        t10 = $[8];
        t2 = $[9];
        t3 = $[10];
        t4 = $[11];
        t5 = $[12];
        t6 = $[13];
        t7 = $[14];
        t8 = $[15];
        t9 = $[16];
    }
    let t11;
    if ($[27] !== T0 || $[28] !== t1 || $[29] !== t2 || $[30] !== t3 || $[31] !== t4 || $[32] !== t5 || $[33] !== t6 || $[34] !== t7 || $[35] !== t8) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T0, {
            data: t1,
            margin: t2,
            children: [
                t3,
                t4,
                t5,
                t6,
                t7,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
            lineNumber: 213,
            columnNumber: 11
        }, this);
        $[27] = T0;
        $[28] = t1;
        $[29] = t2;
        $[30] = t3;
        $[31] = t4;
        $[32] = t5;
        $[33] = t6;
        $[34] = t7;
        $[35] = t8;
        $[36] = t11;
    } else {
        t11 = $[36];
    }
    let t12;
    if ($[37] !== T1 || $[38] !== t10 || $[39] !== t11 || $[40] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T1, {
            width: t9,
            height: t10,
            children: t11
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
            lineNumber: 229,
            columnNumber: 11
        }, this);
        $[37] = T1;
        $[38] = t10;
        $[39] = t11;
        $[40] = t9;
        $[41] = t12;
    } else {
        t12 = $[41];
    }
    return t12;
}
_c1 = WidgetLineChart;
function _WidgetLineChartValueColumnsMap(col, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
        type: "monotone",
        dataKey: col.id,
        name: col.label,
        stroke: LINE_COLORS[i % LINE_COLORS.length],
        strokeWidth: 1.5,
        dot: false,
        activeDot: {
            r: 3
        }
    }, col.id, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
        lineNumber: 241,
        columnNumber: 10
    }, this);
}
function _WidgetLineChartLegendFormatter(value) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            color: "var(--text-secondary)",
            fontSize: 10
        },
        children: value
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
        lineNumber: 246,
        columnNumber: 10
    }, this);
}
function _WidgetLineChartYAxisTickFormatter(v) {
    return v >= 100000 ? `${(v / 100000).toFixed(0)}L` : v.toFixed(1);
}
function _temp(p, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        style: {
            color: p.color
        },
        className: "font-mono",
        children: [
            p.name,
            ": ",
            typeof p.value === "number" ? p.value.toFixed(2) : String(p.value)
        ]
    }, i, true, {
        fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
        lineNumber: 255,
        columnNumber: 10
    }, this);
}
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomTooltip");
__turbopack_context__.k.register(_c1, "WidgetLineChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/charts/WidgetAreaChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetAreaChart",
    ()=>WidgetAreaChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
'use client';
;
;
;
const AREA_COLORS = [
    {
        stroke: '#F59E0B',
        fill: 'rgba(245,158,11,0.12)'
    },
    {
        stroke: '#3B82F6',
        fill: 'rgba(59,130,246,0.12)'
    },
    {
        stroke: '#10B981',
        fill: 'rgba(16,185,129,0.12)'
    },
    {
        stroke: '#8B5CF6',
        fill: 'rgba(139,92,246,0.12)'
    }
];
const CustomTooltip = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "044d8a6978cda73175936f1f0b77ec9f8fd2216a25d2a3a145035e23a7c9fd88") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "044d8a6978cda73175936f1f0b77ec9f8fd2216a25d2a3a145035e23a7c9fd88";
    }
    const { active, payload, label } = t0;
    if (!active || !Array.isArray(payload) || payload.length === 0) {
        return null;
    }
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            background: "var(--surface)",
            border: "1px solid var(--border)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            color: "var(--text-secondary)"
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const t3 = String(label);
    let t4;
    if ($[3] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mb-1",
            style: t2,
            children: t3
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
            lineNumber: 63,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[3] = t3;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    const t5 = payload;
    let t6;
    if ($[5] !== t5) {
        t6 = t5.map(_temp);
        $[5] = t5;
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    let t7;
    if ($[7] !== t4 || $[8] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded px-3 py-2 text-xs shadow-lg",
            style: t1,
            children: [
                t4,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[7] = t4;
        $[8] = t6;
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    return t7;
};
_c = CustomTooltip;
function WidgetAreaChart(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(44);
    if ($[0] !== "044d8a6978cda73175936f1f0b77ec9f8fd2216a25d2a3a145035e23a7c9fd88") {
        for(let $i = 0; $i < 44; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "044d8a6978cda73175936f1f0b77ec9f8fd2216a25d2a3a145035e23a7c9fd88";
    }
    const { rows, columns, chartConfig } = t0;
    const xKey = chartConfig?.xAxis ?? columns[0]?.id ?? "date";
    let T0;
    let T1;
    let t1;
    let t10;
    let t11;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[1] !== chartConfig?.showLegend || $[2] !== columns || $[3] !== rows || $[4] !== xKey) {
        let t12;
        if ($[18] !== xKey) {
            t12 = ({
                "WidgetAreaChart[columns.filter()]": (c)=>c.id !== xKey && c.format !== "text"
            })["WidgetAreaChart[columns.filter()]"];
            $[18] = xKey;
            $[19] = t12;
        } else {
            t12 = $[19];
        }
        const valueColumns = columns.filter(t12);
        T1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"];
        t10 = "100%";
        t11 = "100%";
        T0 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"];
        t1 = rows;
        if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
            t2 = {
                top: 4,
                right: 16,
                bottom: 4,
                left: 8
            };
            $[20] = t2;
        } else {
            t2 = $[20];
        }
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
            children: valueColumns.map(_WidgetAreaChartValueColumnsMap)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
            lineNumber: 148,
            columnNumber: 10
        }, this);
        if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                strokeDasharray: "3 3",
                stroke: "var(--border)"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                lineNumber: 150,
                columnNumber: 12
            }, this);
            $[21] = t4;
        } else {
            t4 = $[21];
        }
        let t13;
        if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
            t13 = {
                fill: "var(--text-secondary)",
                fontSize: 10
            };
            $[22] = t13;
        } else {
            t13 = $[22];
        }
        let t14;
        if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
            t14 = {
                stroke: "var(--border)"
            };
            $[23] = t14;
        } else {
            t14 = $[23];
        }
        if ($[24] !== xKey) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                dataKey: xKey,
                tick: t13,
                tickLine: false,
                axisLine: t14
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                lineNumber: 175,
                columnNumber: 12
            }, this);
            $[24] = xKey;
            $[25] = t5;
        } else {
            t5 = $[25];
        }
        if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                tick: {
                    fill: "var(--text-secondary)",
                    fontSize: 10
                },
                tickLine: false,
                axisLine: false,
                width: 45,
                tickFormatter: _WidgetAreaChartYAxisTickFormatter
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                lineNumber: 182,
                columnNumber: 12
            }, this);
            $[26] = t6;
        } else {
            t6 = $[26];
        }
        if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                    lineNumber: 191,
                    columnNumber: 30
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                lineNumber: 191,
                columnNumber: 12
            }, this);
            $[27] = t7;
        } else {
            t7 = $[27];
        }
        t8 = chartConfig?.showLegend !== false && valueColumns.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
            iconType: "circle",
            iconSize: 8,
            formatter: _WidgetAreaChartLegendFormatter
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
            lineNumber: 196,
            columnNumber: 74
        }, this);
        t9 = valueColumns.map(_WidgetAreaChartValueColumnsMap2);
        $[1] = chartConfig?.showLegend;
        $[2] = columns;
        $[3] = rows;
        $[4] = xKey;
        $[5] = T0;
        $[6] = T1;
        $[7] = t1;
        $[8] = t10;
        $[9] = t11;
        $[10] = t2;
        $[11] = t3;
        $[12] = t4;
        $[13] = t5;
        $[14] = t6;
        $[15] = t7;
        $[16] = t8;
        $[17] = t9;
    } else {
        T0 = $[5];
        T1 = $[6];
        t1 = $[7];
        t10 = $[8];
        t11 = $[9];
        t2 = $[10];
        t3 = $[11];
        t4 = $[12];
        t5 = $[13];
        t6 = $[14];
        t7 = $[15];
        t8 = $[16];
        t9 = $[17];
    }
    let t12;
    if ($[28] !== T0 || $[29] !== t1 || $[30] !== t2 || $[31] !== t3 || $[32] !== t4 || $[33] !== t5 || $[34] !== t6 || $[35] !== t7 || $[36] !== t8 || $[37] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T0, {
            data: t1,
            margin: t2,
            children: [
                t3,
                t4,
                t5,
                t6,
                t7,
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
            lineNumber: 232,
            columnNumber: 11
        }, this);
        $[28] = T0;
        $[29] = t1;
        $[30] = t2;
        $[31] = t3;
        $[32] = t4;
        $[33] = t5;
        $[34] = t6;
        $[35] = t7;
        $[36] = t8;
        $[37] = t9;
        $[38] = t12;
    } else {
        t12 = $[38];
    }
    let t13;
    if ($[39] !== T1 || $[40] !== t10 || $[41] !== t11 || $[42] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T1, {
            width: t10,
            height: t11,
            children: t12
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
            lineNumber: 249,
            columnNumber: 11
        }, this);
        $[39] = T1;
        $[40] = t10;
        $[41] = t11;
        $[42] = t12;
        $[43] = t13;
    } else {
        t13 = $[43];
    }
    return t13;
}
_c1 = WidgetAreaChart;
function _WidgetAreaChartValueColumnsMap2(col_0, i_0) {
    const color_0 = AREA_COLORS[i_0 % AREA_COLORS.length];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
        type: "monotone",
        dataKey: col_0.id,
        name: col_0.label,
        stroke: color_0.stroke,
        strokeWidth: 1.5,
        fill: `url(#grad_${col_0.id})`,
        dot: false,
        activeDot: {
            r: 3,
            fill: color_0.stroke
        }
    }, col_0.id, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
        lineNumber: 262,
        columnNumber: 10
    }, this);
}
function _WidgetAreaChartLegendFormatter(value) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            color: "var(--text-secondary)",
            fontSize: 10
        },
        children: value
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
        lineNumber: 268,
        columnNumber: 10
    }, this);
}
function _WidgetAreaChartYAxisTickFormatter(v) {
    return v >= 100000 ? `${(v / 100000).toFixed(0)}L` : v.toFixed(1);
}
function _WidgetAreaChartValueColumnsMap(col, i) {
    const color = AREA_COLORS[i % AREA_COLORS.length];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
        id: `grad_${col.id}`,
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                offset: "5%",
                stopColor: color.stroke,
                stopOpacity: 0.3
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                lineNumber: 278,
                columnNumber: 89
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                offset: "95%",
                stopColor: color.stroke,
                stopOpacity: 0.02
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                lineNumber: 278,
                columnNumber: 152
            }, this)
        ]
    }, col.id, true, {
        fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
        lineNumber: 278,
        columnNumber: 10
    }, this);
}
function _temp(p, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        style: {
            color: p.color
        },
        className: "font-mono",
        children: [
            p.name,
            ": ",
            typeof p.value === "number" ? p.value.toFixed(2) : String(p.value)
        ]
    }, i, true, {
        fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
        lineNumber: 281,
        columnNumber: 10
    }, this);
}
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomTooltip");
__turbopack_context__.k.register(_c1, "WidgetAreaChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/charts/WidgetHeatmap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetHeatmap",
    ()=>WidgetHeatmap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
'use client';
;
;
function interpolateColor(value, min, max) {
    if (max === min) return 'rgba(100,116,139,0.3)';
    const t = (value - min) / (max - min);
    if (t < 0.5) {
        const f = t * 2;
        const r = Math.round(239 + (100 - 239) * f);
        const g = Math.round(68 + (116 - 68) * f);
        const b = Math.round(68 + (139 - 68) * f);
        return `rgba(${r},${g},${b},0.7)`;
    } else {
        const f = (t - 0.5) * 2;
        const r = Math.round(100 + (16 - 100) * f);
        const g = Math.round(116 + (185 - 116) * f);
        const b = Math.round(139 + (129 - 139) * f);
        return `rgba(${r},${g},${b},0.7)`;
    }
}
function WidgetHeatmap(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(50);
    if ($[0] !== "b7ca536fb5bdc0377d705a443548df4ee45eac3dd71e80feeb3db0971fa2027f") {
        for(let $i = 0; $i < 50; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b7ca536fb5bdc0377d705a443548df4ee45eac3dd71e80feeb3db0971fa2027f";
    }
    const { rows, columns, chartConfig } = t0;
    const rowLabelKey = chartConfig?.yAxis ?? columns[0]?.id ?? "label";
    const colLabelKey = chartConfig?.xAxis ?? columns[1]?.id ?? "category";
    const valueKey = chartConfig?.colorField ?? columns[2]?.id ?? columns[1]?.id ?? "value";
    let t1;
    if ($[1] !== columns || $[2] !== valueKey) {
        let t2;
        if ($[4] !== valueKey) {
            t2 = ({
                "WidgetHeatmap[columns.find()]": (c)=>c.id === valueKey
            })["WidgetHeatmap[columns.find()]"];
            $[4] = valueKey;
            $[5] = t2;
        } else {
            t2 = $[5];
        }
        t1 = columns.find(t2);
        $[1] = columns;
        $[2] = valueKey;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const valueCol = t1;
    let t2;
    if ($[6] !== rowLabelKey || $[7] !== rows) {
        let t3;
        if ($[9] !== rowLabelKey) {
            t3 = ({
                "WidgetHeatmap[rows.map()]": (r)=>String(r[rowLabelKey] ?? "")
            })["WidgetHeatmap[rows.map()]"];
            $[9] = rowLabelKey;
            $[10] = t3;
        } else {
            t3 = $[10];
        }
        t2 = new Set(rows.map(t3));
        $[6] = rowLabelKey;
        $[7] = rows;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    let t3;
    if ($[11] !== t2) {
        t3 = [
            ...t2
        ];
        $[11] = t2;
        $[12] = t3;
    } else {
        t3 = $[12];
    }
    const rowLabels = t3;
    let t4;
    if ($[13] !== colLabelKey || $[14] !== rows) {
        let t5;
        if ($[16] !== colLabelKey) {
            t5 = ({
                "WidgetHeatmap[rows.map()]": (r_0)=>String(r_0[colLabelKey] ?? "")
            })["WidgetHeatmap[rows.map()]"];
            $[16] = colLabelKey;
            $[17] = t5;
        } else {
            t5 = $[17];
        }
        t4 = new Set(rows.map(t5));
        $[13] = colLabelKey;
        $[14] = rows;
        $[15] = t4;
    } else {
        t4 = $[15];
    }
    let t5;
    if ($[18] !== t4) {
        t5 = [
            ...t4
        ];
        $[18] = t4;
        $[19] = t5;
    } else {
        t5 = $[19];
    }
    const colLabels = t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[20] !== colLabelKey || $[21] !== colLabels || $[22] !== columns[0]?.label || $[23] !== rowLabelKey || $[24] !== rowLabels || $[25] !== rows || $[26] !== valueCol || $[27] !== valueKey) {
        const lookup = {};
        for (const row of rows){
            const rl = String(row[rowLabelKey] ?? "");
            const cl = String(row[colLabelKey] ?? "");
            if (!lookup[rl]) {
                lookup[rl] = {};
            }
            lookup[rl][cl] = Number(row[valueKey] ?? 0);
        }
        const allValues = rows.map({
            "WidgetHeatmap[rows.map()]": (r_1)=>Number(r_1[valueKey] ?? 0)
        }["WidgetHeatmap[rows.map()]"]);
        const min = Math.min(...allValues);
        const max = Math.max(...allValues);
        const fmt = function fmt(v) {
            if (!valueCol) {
                return v.toFixed(1);
            }
            if (valueCol.format === "percent") {
                return `${v.toFixed(1)}%`;
            }
            if (valueCol.format === "currency") {
                return v >= 100000 ? `${(v / 100000).toFixed(0)}L` : v.toFixed(0);
            }
            return v >= 100000 ? `${(v / 100000).toFixed(0)}L` : v.toFixed(1);
        };
        t8 = "overflow-auto h-full p-1";
        t6 = "text-xs border-collapse w-full";
        let t10;
        if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
            t10 = {
                color: "var(--text-secondary)",
                borderBottom: "1px solid var(--border)",
                background: "var(--surface)"
            };
            $[32] = t10;
        } else {
            t10 = $[32];
        }
        const t11 = columns[0]?.label ?? "";
        let t12;
        if ($[33] !== t11) {
            t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                className: "px-1.5 py-1 text-left font-normal sticky left-0 z-10",
                style: t10,
                children: t11
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                lineNumber: 167,
                columnNumber: 13
            }, this);
            $[33] = t11;
            $[34] = t12;
        } else {
            t12 = $[34];
        }
        let t13;
        if ($[35] !== colLabels) {
            t13 = colLabels.map(_WidgetHeatmapColLabelsMap);
            $[35] = colLabels;
            $[36] = t13;
        } else {
            t13 = $[36];
        }
        if ($[37] !== t12 || $[38] !== t13) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                    children: [
                        t12,
                        t13
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                    lineNumber: 182,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                lineNumber: 182,
                columnNumber: 12
            }, this);
            $[37] = t12;
            $[38] = t13;
            $[39] = t7;
        } else {
            t7 = $[39];
        }
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
            children: rowLabels.map({
                "WidgetHeatmap[rowLabels.map()]": (rl_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-1.5 py-1 whitespace-nowrap sticky left-0 z-10",
                                style: {
                                    color: "var(--text-primary)",
                                    borderRight: "1px solid var(--border)",
                                    background: "var(--surface)"
                                },
                                children: rl_0
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                                lineNumber: 190,
                                columnNumber: 66
                            }, this),
                            colLabels.map({
                                "WidgetHeatmap[rowLabels.map() > colLabels.map()]": (cl_1)=>{
                                    const val = lookup[rl_0]?.[cl_1];
                                    const bg = val !== undefined ? interpolateColor(val, min, max) : "transparent";
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-1.5 py-1 text-center font-mono transition-opacity hover:opacity-80",
                                        style: {
                                            backgroundColor: bg,
                                            border: "1px solid var(--border)",
                                            opacity: 0.9
                                        },
                                        title: `${rl_0} × ${cl_1}: ${val !== undefined ? fmt(val) : "\u2014"}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px]",
                                            style: {
                                                color: "#fff",
                                                mixBlendMode: "normal"
                                            },
                                            children: val !== undefined ? fmt(val) : "\u2014"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                                            lineNumber: 202,
                                            columnNumber: 90
                                        }, this)
                                    }, cl_1, false, {
                                        fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                                        lineNumber: 198,
                                        columnNumber: 22
                                    }, this);
                                }
                            }["WidgetHeatmap[rowLabels.map() > colLabels.map()]"])
                        ]
                    }, rl_0, true, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                        lineNumber: 190,
                        columnNumber: 51
                    }, this)
            }["WidgetHeatmap[rowLabels.map()]"])
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
            lineNumber: 189,
            columnNumber: 10
        }, this);
        $[20] = colLabelKey;
        $[21] = colLabels;
        $[22] = columns[0]?.label;
        $[23] = rowLabelKey;
        $[24] = rowLabels;
        $[25] = rows;
        $[26] = valueCol;
        $[27] = valueKey;
        $[28] = t6;
        $[29] = t7;
        $[30] = t8;
        $[31] = t9;
    } else {
        t6 = $[28];
        t7 = $[29];
        t8 = $[30];
        t9 = $[31];
    }
    let t10;
    if ($[40] !== t6 || $[41] !== t7 || $[42] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: t6,
            children: [
                t7,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
            lineNumber: 229,
            columnNumber: 11
        }, this);
        $[40] = t6;
        $[41] = t7;
        $[42] = t9;
        $[43] = t10;
    } else {
        t10 = $[43];
    }
    let t11;
    if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px]",
            style: {
                color: "var(--text-secondary)"
            },
            children: "Low"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
            lineNumber: 239,
            columnNumber: 11
        }, this);
        $[44] = t11;
    } else {
        t11 = $[44];
    }
    let t12;
    if ($[45] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-2 flex-1 rounded",
            style: {
                background: "linear-gradient(to right, rgba(239,68,68,0.7), rgba(100,116,139,0.3), rgba(16,185,129,0.7))"
            }
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
            lineNumber: 248,
            columnNumber: 11
        }, this);
        $[45] = t12;
    } else {
        t12 = $[45];
    }
    let t13;
    if ($[46] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 mt-2 px-1",
            children: [
                t11,
                t12,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px]",
                    style: {
                        color: "var(--text-secondary)"
                    },
                    children: "High"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                    lineNumber: 257,
                    columnNumber: 72
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
            lineNumber: 257,
            columnNumber: 11
        }, this);
        $[46] = t13;
    } else {
        t13 = $[46];
    }
    let t14;
    if ($[47] !== t10 || $[48] !== t8) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t8,
            children: [
                t10,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
            lineNumber: 266,
            columnNumber: 11
        }, this);
        $[47] = t10;
        $[48] = t8;
        $[49] = t14;
    } else {
        t14 = $[49];
    }
    return t14;
}
_c = WidgetHeatmap;
function _WidgetHeatmapColLabelsMap(cl_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: "px-1.5 py-1 font-normal whitespace-nowrap text-center",
        style: {
            color: "var(--text-secondary)",
            borderBottom: "1px solid var(--border)"
        },
        children: cl_0
    }, cl_0, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
        lineNumber: 276,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "WidgetHeatmap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/charts/WidgetMetricCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetMetricCard",
    ()=>WidgetMetricCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
'use client';
;
;
function formatMetric(val, format) {
    const n = Number(val);
    if (isNaN(n)) return String(val ?? '—');
    switch(format){
        case 'percent':
            return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
        case 'currency':
            return n >= 1e7 ? `₹${(n / 1e7).toFixed(2)} Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(2)} L` : `₹${n.toLocaleString('en-IN', {
                maximumFractionDigits: 2
            })}`;
        case 'number':
            return n >= 1e7 ? `${(n / 1e7).toFixed(2)} Cr` : n >= 1e5 ? `${(n / 1e5).toFixed(2)} L` : n.toLocaleString('en-IN', {
                maximumFractionDigits: 2
            });
        default:
            return n.toLocaleString('en-IN', {
                maximumFractionDigits: 2
            });
    }
}
function WidgetMetricCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(28);
    if ($[0] !== "62f082a726b5778f54ac2b41b960c54f7462789a5c814e27217868a618c34220") {
        for(let $i = 0; $i < 28; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "62f082a726b5778f54ac2b41b960c54f7462789a5c814e27217868a618c34220";
    }
    const { rows, columns, config } = t0;
    let t1;
    if ($[1] !== columns || $[2] !== config.metricColumn) {
        t1 = config.metricColumn ? columns.find({
            "WidgetMetricCard[columns.find()]": (c)=>c.id === config.metricColumn || c.dslName === config.metricColumn
        }["WidgetMetricCard[columns.find()]"]) : columns[0];
        $[1] = columns;
        $[2] = config.metricColumn;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const metricCol = t1;
    const rawVal = rows[0]?.[metricCol?.id ?? ""];
    let t2;
    if ($[4] !== metricCol?.format || $[5] !== rawVal) {
        t2 = rawVal !== undefined ? formatMetric(rawVal, metricCol?.format) : "\u2014";
        $[4] = metricCol?.format;
        $[5] = rawVal;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    const displayVal = t2;
    const totalRows = rows.length;
    const isCount = !metricCol || metricCol.aggregation === "count";
    let t3;
    if ($[7] !== config.metricLabel || $[8] !== isCount || $[9] !== metricCol?.label || $[10] !== totalRows) {
        t3 = isCount ? `${totalRows.toLocaleString()} stocks` : config.metricLabel ?? metricCol?.label ?? "";
        $[7] = config.metricLabel;
        $[8] = isCount;
        $[9] = metricCol?.label;
        $[10] = totalRows;
        $[11] = t3;
    } else {
        t3 = $[11];
    }
    const subLabel = t3;
    const numVal = Number(rawVal);
    const isPositive = !isNaN(numVal) && numVal > 0 && metricCol?.colorCode;
    const isNegative = !isNaN(numVal) && numVal < 0 && metricCol?.colorCode;
    const valueColor = isPositive ? "var(--positive, #10B981)" : isNegative ? "var(--negative, #EF4444)" : "var(--accent-brand)";
    let t4;
    if ($[12] !== valueColor) {
        t4 = {
            color: valueColor
        };
        $[12] = valueColor;
        $[13] = t4;
    } else {
        t4 = $[13];
    }
    let t5;
    if ($[14] !== config.metricPrefix) {
        t5 = config.metricPrefix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-2xl mr-1",
            style: {
                color: "var(--text-secondary)"
            },
            children: config.metricPrefix
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetMetricCard.tsx",
            lineNumber: 97,
            columnNumber: 33
        }, this);
        $[14] = config.metricPrefix;
        $[15] = t5;
    } else {
        t5 = $[15];
    }
    let t6;
    if ($[16] !== config.metricSuffix) {
        t6 = config.metricSuffix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xl ml-1",
            style: {
                color: "var(--text-secondary)"
            },
            children: config.metricSuffix
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetMetricCard.tsx",
            lineNumber: 107,
            columnNumber: 33
        }, this);
        $[16] = config.metricSuffix;
        $[17] = t6;
    } else {
        t6 = $[17];
    }
    let t7;
    if ($[18] !== displayVal || $[19] !== t4 || $[20] !== t5 || $[21] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-4xl font-bold font-mono tracking-tight",
            style: t4,
            children: [
                t5,
                displayVal,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetMetricCard.tsx",
            lineNumber: 117,
            columnNumber: 10
        }, this);
        $[18] = displayVal;
        $[19] = t4;
        $[20] = t5;
        $[21] = t6;
        $[22] = t7;
    } else {
        t7 = $[22];
    }
    let t8;
    if ($[23] !== subLabel) {
        t8 = subLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-center max-w-[180px] truncate",
            style: {
                color: "var(--text-secondary)"
            },
            children: subLabel
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/charts/WidgetMetricCard.tsx",
            lineNumber: 128,
            columnNumber: 22
        }, this);
        $[23] = subLabel;
        $[24] = t8;
    } else {
        t8 = $[24];
    }
    let t9;
    if ($[25] !== t7 || $[26] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-full gap-2",
            children: [
                t7,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetMetricCard.tsx",
            lineNumber: 138,
            columnNumber: 10
        }, this);
        $[25] = t7;
        $[26] = t8;
        $[27] = t9;
    } else {
        t9 = $[27];
    }
    return t9;
}
_c = WidgetMetricCard;
var _c;
__turbopack_context__.k.register(_c, "WidgetMetricCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/WidgetRenderer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetRenderer",
    ()=>WidgetRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetBarChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetBarChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetHBarChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetHBarChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetPieChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetPieChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetLineChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetLineChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetAreaChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetAreaChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetHeatmap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetHeatmap.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetMetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetMetricCard.tsx [app-client] (ecmascript)");
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
function WidgetRenderer(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(34);
    if ($[0] !== "e2c72eac9b79fd35e7eba6a2a1ac1d41ce6909641ba40095f04f22fc6167d6c2") {
        for(let $i = 0; $i < 34; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e2c72eac9b79fd35e7eba6a2a1ac1d41ce6909641ba40095f04f22fc6167d6c2";
    }
    const { widgetType, rows, columns, config } = t0;
    const chartConfig = config.chartConfig;
    switch(widgetType){
        case "table":
            {
                let t1;
                if ($[1] !== columns || $[2] !== rows) {
                    t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetTable"], {
                        rows: rows,
                        columns: columns
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                        lineNumber: 40,
                        columnNumber: 16
                    }, this);
                    $[1] = columns;
                    $[2] = rows;
                    $[3] = t1;
                } else {
                    t1 = $[3];
                }
                return t1;
            }
        case "bar":
            {
                let t1;
                if ($[4] !== chartConfig || $[5] !== columns || $[6] !== rows) {
                    t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetBarChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetBarChart"], {
                        rows: rows,
                        columns: columns,
                        chartConfig: chartConfig
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                        lineNumber: 53,
                        columnNumber: 16
                    }, this);
                    $[4] = chartConfig;
                    $[5] = columns;
                    $[6] = rows;
                    $[7] = t1;
                } else {
                    t1 = $[7];
                }
                return t1;
            }
        case "horizontal_bar":
            {
                let t1;
                if ($[8] !== chartConfig || $[9] !== columns || $[10] !== rows) {
                    t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetHBarChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetHBarChart"], {
                        rows: rows,
                        columns: columns,
                        chartConfig: chartConfig
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                        lineNumber: 67,
                        columnNumber: 16
                    }, this);
                    $[8] = chartConfig;
                    $[9] = columns;
                    $[10] = rows;
                    $[11] = t1;
                } else {
                    t1 = $[11];
                }
                return t1;
            }
        case "pie":
            {
                let t1;
                if ($[12] !== chartConfig || $[13] !== columns || $[14] !== rows) {
                    t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetPieChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetPieChart"], {
                        rows: rows,
                        columns: columns,
                        chartConfig: chartConfig
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                        lineNumber: 81,
                        columnNumber: 16
                    }, this);
                    $[12] = chartConfig;
                    $[13] = columns;
                    $[14] = rows;
                    $[15] = t1;
                } else {
                    t1 = $[15];
                }
                return t1;
            }
        case "line":
            {
                let t1;
                if ($[16] !== chartConfig || $[17] !== columns || $[18] !== rows) {
                    t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetLineChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetLineChart"], {
                        rows: rows,
                        columns: columns,
                        chartConfig: chartConfig
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                        lineNumber: 95,
                        columnNumber: 16
                    }, this);
                    $[16] = chartConfig;
                    $[17] = columns;
                    $[18] = rows;
                    $[19] = t1;
                } else {
                    t1 = $[19];
                }
                return t1;
            }
        case "area":
            {
                let t1;
                if ($[20] !== chartConfig || $[21] !== columns || $[22] !== rows) {
                    t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetAreaChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetAreaChart"], {
                        rows: rows,
                        columns: columns,
                        chartConfig: chartConfig
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                        lineNumber: 109,
                        columnNumber: 16
                    }, this);
                    $[20] = chartConfig;
                    $[21] = columns;
                    $[22] = rows;
                    $[23] = t1;
                } else {
                    t1 = $[23];
                }
                return t1;
            }
        case "heatmap":
            {
                let t1;
                if ($[24] !== chartConfig || $[25] !== columns || $[26] !== rows) {
                    t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetHeatmap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetHeatmap"], {
                        rows: rows,
                        columns: columns,
                        chartConfig: chartConfig
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                        lineNumber: 123,
                        columnNumber: 16
                    }, this);
                    $[24] = chartConfig;
                    $[25] = columns;
                    $[26] = rows;
                    $[27] = t1;
                } else {
                    t1 = $[27];
                }
                return t1;
            }
        case "metric":
            {
                let t1;
                if ($[28] !== columns || $[29] !== config || $[30] !== rows) {
                    t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetMetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetMetricCard"], {
                        rows: rows,
                        columns: columns,
                        config: config
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                        lineNumber: 137,
                        columnNumber: 16
                    }, this);
                    $[28] = columns;
                    $[29] = config;
                    $[30] = rows;
                    $[31] = t1;
                } else {
                    t1 = $[31];
                }
                return t1;
            }
        default:
            {
                let t1;
                if ($[32] !== widgetType) {
                    t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center h-full text-slate-500 text-xs",
                        children: [
                            "Unknown widget type: ",
                            widgetType
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                        lineNumber: 151,
                        columnNumber: 16
                    }, this);
                    $[32] = widgetType;
                    $[33] = t1;
                } else {
                    t1 = $[33];
                }
                return t1;
            }
    }
}
_c = WidgetRenderer;
var _c;
__turbopack_context__.k.register(_c, "WidgetRenderer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/WidgetCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetCard",
    ()=>WidgetCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dashboard/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/WidgetRenderer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function SkeletonLoader() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "d5bc466e948cc5a4bc4a5bc73b7cf017948452e32b4a7e685faa485db3427bb8") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d5bc466e948cc5a4bc4a5bc73b7cf017948452e32b4a7e685faa485db3427bb8";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-3 rounded w-2/3",
            style: {
                background: "var(--border)"
            }
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 24,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full flex flex-col gap-2 p-3 animate-pulse",
            children: [
                t0,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 rounded",
                    style: {
                        background: "var(--border)",
                        opacity: 0.5
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                    lineNumber: 33,
                    columnNumber: 76
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 33,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    return t1;
}
_c = SkeletonLoader;
function ErrorState(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "d5bc466e948cc5a4bc4a5bc73b7cf017948452e32b4a7e685faa485db3427bb8") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d5bc466e948cc5a4bc4a5bc73b7cf017948452e32b4a7e685faa485db3427bb8";
    }
    const { message } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs font-medium",
            style: {
                color: "var(--negative, #EF4444)"
            },
            children: "Query Error"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            color: "var(--text-secondary)"
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== message) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-full gap-2 px-4 text-center",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[11px] leading-relaxed line-clamp-3",
                    style: t2,
                    children: message
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                    lineNumber: 74,
                    columnNumber: 103
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 74,
            columnNumber: 10
        }, this);
        $[3] = message;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    return t3;
}
_c1 = ErrorState;
function EmptyState() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "d5bc466e948cc5a4bc4a5bc73b7cf017948452e32b4a7e685faa485db3427bb8") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d5bc466e948cc5a4bc4a5bc73b7cf017948452e32b4a7e685faa485db3427bb8";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-2xl",
            style: {
                color: "var(--text-secondary)",
                opacity: 0.4
            },
            children: "∅"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-full gap-1.5",
            children: [
                t0,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs",
                    style: {
                        color: "var(--text-secondary)"
                    },
                    children: "No data"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                    lineNumber: 102,
                    columnNumber: 88
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 102,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    return t1;
}
_c2 = EmptyState;
function WidgetCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(91);
    if ($[0] !== "d5bc466e948cc5a4bc4a5bc73b7cf017948452e32b4a7e685faa485db3427bb8") {
        for(let $i = 0; $i < 91; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d5bc466e948cc5a4bc4a5bc73b7cf017948452e32b4a7e685faa485db3427bb8";
    }
    const { widget, onEdit, onDelete, onCopy } = t0;
    const [showToolbar, setShowToolbar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [maximized, setMaximized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmDelete, setConfirmDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const config = widget.config_json;
    const { data, loading, error, refresh } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWidgetData"])(config, widget.widget_type);
    let t1;
    if ($[1] !== confirmDelete || $[2] !== onDelete || $[3] !== widget.id) {
        t1 = ({
            "WidgetCard[handleDelete]": ()=>{
                if (confirmDelete) {
                    onDelete(widget.id);
                } else {
                    setConfirmDelete(true);
                    setTimeout({
                        "WidgetCard[handleDelete > setTimeout()]": ()=>setConfirmDelete(false)
                    }["WidgetCard[handleDelete > setTimeout()]"], 3000);
                }
            }
        })["WidgetCard[handleDelete]"];
        $[1] = confirmDelete;
        $[2] = onDelete;
        $[3] = widget.id;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const handleDelete = t1;
    let t2;
    if ($[5] !== data || $[6] !== widget.title) {
        t2 = ({
            "WidgetCard[handleCsvDownload]": ()=>{
                if (!data?.rows?.length) {
                    return;
                }
                const cols = data.columns;
                const header = cols.map(_WidgetCardHandleCsvDownloadColsMap).join(",");
                const rows = data.rows.map({
                    "WidgetCard[handleCsvDownload > data.rows.map()]": (r)=>cols.map({
                            "WidgetCard[handleCsvDownload > data.rows.map() > cols.map()]": (c_0)=>{
                                const v = r[c_0.id];
                                return typeof v === "string" && v.includes(",") ? `"${v}"` : String(v ?? "");
                            }
                        }["WidgetCard[handleCsvDownload > data.rows.map() > cols.map()]"]).join(",")
                }["WidgetCard[handleCsvDownload > data.rows.map()]"]);
                const csv = [
                    header,
                    ...rows
                ].join("\n");
                const blob = new Blob([
                    csv
                ], {
                    type: "text/csv"
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${widget.title.replace(/\s+/g, "_")}.csv`;
                a.click();
                URL.revokeObjectURL(url);
            }
        })["WidgetCard[handleCsvDownload]"];
        $[5] = data;
        $[6] = widget.title;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    const handleCsvDownload = t2;
    const t3 = `flex flex-col rounded-lg overflow-hidden ${maximized ? "fixed inset-4 z-50 shadow-2xl" : "h-full"}`;
    let t4;
    let t5;
    let t6;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            background: "var(--surface)",
            border: "1px solid var(--border)"
        };
        t5 = ({
            "WidgetCard[<div>.onMouseEnter]": ()=>setShowToolbar(true)
        })["WidgetCard[<div>.onMouseEnter]"];
        t6 = ({
            "WidgetCard[<div>.onMouseLeave]": ()=>{
                setShowToolbar(false);
                setConfirmDelete(false);
            }
        })["WidgetCard[<div>.onMouseLeave]"];
        $[8] = t4;
        $[9] = t5;
        $[10] = t6;
    } else {
        t4 = $[8];
        t5 = $[9];
        t6 = $[10];
    }
    let t7;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = {
            borderBottom: "1px solid var(--border)",
            cursor: "grab"
        };
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== widget.widget_type) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WidgetTypeIcon, {
            type: widget.widget_type
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 231,
            columnNumber: 10
        }, this);
        $[12] = widget.widget_type;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = {
            color: "var(--text-primary)"
        };
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] !== widget.title) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[12px] font-medium truncate",
            style: t9,
            children: widget.title
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 248,
            columnNumber: 11
        }, this);
        $[15] = widget.title;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[17] !== data) {
        t11 = data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px] font-mono shrink-0",
            style: {
                color: "var(--text-secondary)",
                opacity: 0.6
            },
            children: [
                data.total.toLocaleString(),
                " rows"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 256,
            columnNumber: 19
        }, this);
        $[17] = data;
        $[18] = t11;
    } else {
        t11 = $[18];
    }
    let t12;
    if ($[19] !== t10 || $[20] !== t11 || $[21] !== t8) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 min-w-0",
            children: [
                t8,
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 267,
            columnNumber: 11
        }, this);
        $[19] = t10;
        $[20] = t11;
        $[21] = t8;
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    const t13 = `flex items-center gap-0.5 transition-opacity duration-150 ${showToolbar ? "opacity-100" : "opacity-0"}`;
    let t14;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-3 h-3",
            viewBox: "0 0 16 16",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M2 8a6 6 0 1 0 1.5-3.9M2 4v3h3",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 278,
                columnNumber: 108
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 278,
            columnNumber: 11
        }, this);
        $[23] = t14;
    } else {
        t14 = $[23];
    }
    let t15;
    if ($[24] !== refresh) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarBtn, {
            title: "Refresh",
            onClick: refresh,
            children: t14
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 285,
            columnNumber: 11
        }, this);
        $[24] = refresh;
        $[25] = t15;
    } else {
        t15 = $[25];
    }
    let t16;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-3 h-3",
            viewBox: "0 0 16 16",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 2v8M5 7l3 3 3-3M3 13h10",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 293,
                columnNumber: 108
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 293,
            columnNumber: 11
        }, this);
        $[26] = t16;
    } else {
        t16 = $[26];
    }
    let t17;
    if ($[27] !== handleCsvDownload) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarBtn, {
            title: "Download CSV",
            onClick: handleCsvDownload,
            children: t16
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 300,
            columnNumber: 11
        }, this);
        $[27] = handleCsvDownload;
        $[28] = t17;
    } else {
        t17 = $[28];
    }
    let t18;
    if ($[29] !== onCopy || $[30] !== widget) {
        t18 = ({
            "WidgetCard[<ToolbarBtn>.onClick]": ()=>onCopy(widget)
        })["WidgetCard[<ToolbarBtn>.onClick]"];
        $[29] = onCopy;
        $[30] = widget;
        $[31] = t18;
    } else {
        t18 = $[31];
    }
    let t19;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-3 h-3",
            viewBox: "0 0 16 16",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "5",
                    y: "5",
                    width: "9",
                    height: "9",
                    rx: "1.5"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                    lineNumber: 319,
                    columnNumber: 108
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M3 11V3h8",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                    lineNumber: 319,
                    columnNumber: 158
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 319,
            columnNumber: 11
        }, this);
        $[32] = t19;
    } else {
        t19 = $[32];
    }
    let t20;
    if ($[33] !== t18) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarBtn, {
            title: "Copy widget",
            onClick: t18,
            children: t19
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 326,
            columnNumber: 11
        }, this);
        $[33] = t18;
        $[34] = t20;
    } else {
        t20 = $[34];
    }
    const t21 = maximized ? "Restore" : "Maximize";
    let t22;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = ({
            "WidgetCard[<ToolbarBtn>.onClick]": ()=>setMaximized(_WidgetCardToolbarBtnOnClickSetMaximized)
        })["WidgetCard[<ToolbarBtn>.onClick]"];
        $[35] = t22;
    } else {
        t22 = $[35];
    }
    let t23;
    if ($[36] !== maximized) {
        t23 = maximized ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-3 h-3",
            viewBox: "0 0 16 16",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 11H2v3M11 5h3V2M2 14l4-4M14 2l-4 4",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 344,
                columnNumber: 120
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 344,
            columnNumber: 23
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-3 h-3",
            viewBox: "0 0 16 16",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 344,
                columnNumber: 298
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 344,
            columnNumber: 201
        }, this);
        $[36] = maximized;
        $[37] = t23;
    } else {
        t23 = $[37];
    }
    let t24;
    if ($[38] !== t21 || $[39] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarBtn, {
            title: t21,
            onClick: t22,
            children: t23
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 352,
            columnNumber: 11
        }, this);
        $[38] = t21;
        $[39] = t23;
        $[40] = t24;
    } else {
        t24 = $[40];
    }
    let t25;
    if ($[41] !== onEdit || $[42] !== widget) {
        t25 = ({
            "WidgetCard[<ToolbarBtn>.onClick]": ()=>onEdit(widget)
        })["WidgetCard[<ToolbarBtn>.onClick]"];
        $[41] = onEdit;
        $[42] = widget;
        $[43] = t25;
    } else {
        t25 = $[43];
    }
    let t26;
    if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-3 h-3",
            viewBox: "0 0 16 16",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M11.5 2.5l2 2-8 8H3.5v-2l8-8Z",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 372,
                columnNumber: 108
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 372,
            columnNumber: 11
        }, this);
        $[44] = t26;
    } else {
        t26 = $[44];
    }
    let t27;
    if ($[45] !== t25) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarBtn, {
            title: "Edit widget",
            onClick: t25,
            highlight: true,
            children: t26
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 379,
            columnNumber: 11
        }, this);
        $[45] = t25;
        $[46] = t27;
    } else {
        t27 = $[46];
    }
    const t28 = confirmDelete ? "Click again to confirm" : "Delete widget";
    let t29;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-3 h-3",
            viewBox: "0 0 16 16",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 4h10M6 4V2h4v2M5 4v9h6V4",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 388,
                columnNumber: 108
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 388,
            columnNumber: 11
        }, this);
        $[47] = t29;
    } else {
        t29 = $[47];
    }
    let t30;
    if ($[48] !== handleDelete || $[49] !== t28) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarBtn, {
            title: t28,
            onClick: handleDelete,
            danger: true,
            children: t29
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 395,
            columnNumber: 11
        }, this);
        $[48] = handleDelete;
        $[49] = t28;
        $[50] = t30;
    } else {
        t30 = $[50];
    }
    let t31;
    if ($[51] !== t13 || $[52] !== t15 || $[53] !== t17 || $[54] !== t20 || $[55] !== t24 || $[56] !== t27 || $[57] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t13,
            children: [
                t15,
                t17,
                t20,
                t24,
                t27,
                t30
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 404,
            columnNumber: 11
        }, this);
        $[51] = t13;
        $[52] = t15;
        $[53] = t17;
        $[54] = t20;
        $[55] = t24;
        $[56] = t27;
        $[57] = t30;
        $[58] = t31;
    } else {
        t31 = $[58];
    }
    let t32;
    if ($[59] !== t12 || $[60] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "widget-drag-handle flex items-center justify-between px-3 py-2 flex-shrink-0",
            style: t7,
            children: [
                t12,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 418,
            columnNumber: 11
        }, this);
        $[59] = t12;
        $[60] = t31;
        $[61] = t32;
    } else {
        t32 = $[61];
    }
    let t33;
    if ($[62] !== loading) {
        t33 = loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLoader, {}, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 427,
            columnNumber: 22
        }, this);
        $[62] = loading;
        $[63] = t33;
    } else {
        t33 = $[63];
    }
    let t34;
    if ($[64] !== error || $[65] !== loading) {
        t34 = !loading && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorState, {
            message: error
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 435,
            columnNumber: 32
        }, this);
        $[64] = error;
        $[65] = loading;
        $[66] = t34;
    } else {
        t34 = $[66];
    }
    let t35;
    if ($[67] !== data || $[68] !== error || $[69] !== loading) {
        t35 = !loading && !error && data && data.rows.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {}, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 444,
            columnNumber: 67
        }, this);
        $[67] = data;
        $[68] = error;
        $[69] = loading;
        $[70] = t35;
    } else {
        t35 = $[70];
    }
    let t36;
    if ($[71] !== config || $[72] !== data || $[73] !== error || $[74] !== loading || $[75] !== widget.widget_type) {
        t36 = !loading && !error && data && data.rows.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetRenderer"], {
            widgetType: widget.widget_type,
            rows: data.rows,
            columns: data.columns,
            config: config
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 454,
            columnNumber: 65
        }, this);
        $[71] = config;
        $[72] = data;
        $[73] = error;
        $[74] = loading;
        $[75] = widget.widget_type;
        $[76] = t36;
    } else {
        t36 = $[76];
    }
    let t37;
    if ($[77] !== t33 || $[78] !== t34 || $[79] !== t35 || $[80] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 min-h-0 p-1",
            children: [
                t33,
                t34,
                t35,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 466,
            columnNumber: 11
        }, this);
        $[77] = t33;
        $[78] = t34;
        $[79] = t35;
        $[80] = t36;
        $[81] = t37;
    } else {
        t37 = $[81];
    }
    let t38;
    if ($[82] !== t3 || $[83] !== t32 || $[84] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            style: t4,
            onMouseEnter: t5,
            onMouseLeave: t6,
            children: [
                t32,
                t37
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 477,
            columnNumber: 11
        }, this);
        $[82] = t3;
        $[83] = t32;
        $[84] = t37;
        $[85] = t38;
    } else {
        t38 = $[85];
    }
    const cardContent = t38;
    let t39;
    if ($[86] !== maximized) {
        t39 = maximized && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-black/60 z-40",
            onClick: {
                "WidgetCard[<div>.onClick]": ()=>setMaximized(false)
            }["WidgetCard[<div>.onClick]"]
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 488,
            columnNumber: 24
        }, this);
        $[86] = maximized;
        $[87] = t39;
    } else {
        t39 = $[87];
    }
    let t40;
    if ($[88] !== cardContent || $[89] !== t39) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                cardContent,
                t39
            ]
        }, void 0, true);
        $[88] = cardContent;
        $[89] = t39;
        $[90] = t40;
    } else {
        t40 = $[90];
    }
    return t40;
}
_s(WidgetCard, "/Sat2N0Jegzn/g2INF2lDqLSftM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWidgetData"]
    ];
});
_c3 = WidgetCard;
// ── Sub-components ────────────────────────────────────────────────────────────
function _WidgetCardToolbarBtnOnClickSetMaximized(m) {
    return !m;
}
function _WidgetCardHandleCsvDownloadColsMap(c) {
    return c.label;
}
function ToolbarBtn(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "d5bc466e948cc5a4bc4a5bc73b7cf017948452e32b4a7e685faa485db3427bb8") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d5bc466e948cc5a4bc4a5bc73b7cf017948452e32b4a7e685faa485db3427bb8";
    }
    const { children, title, onClick, highlight, danger } = t0;
    let t1;
    if ($[1] !== onClick) {
        t1 = ({
            "ToolbarBtn[<button>.onClick]": (e_0)=>{
                e_0.stopPropagation();
                onClick();
            }
        })["ToolbarBtn[<button>.onClick]"];
        $[1] = onClick;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const t2 = danger ? "var(--text-secondary)" : highlight ? "var(--text-secondary)" : "var(--text-secondary)";
    let t3;
    if ($[3] !== t2) {
        t3 = {
            color: t2
        };
        $[3] = t2;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== danger || $[6] !== highlight) {
        t4 = ({
            "ToolbarBtn[<button>.onMouseEnter]": (e_1)=>{
                const el = e_1.currentTarget;
                el.style.color = danger ? "#EF4444" : highlight ? "var(--accent-brand)" : "var(--text-primary)";
                el.style.background = danger ? "rgba(239,68,68,0.1)" : highlight ? "rgba(var(--brand-tint-rgb,245,158,11),0.15)" : "var(--bg-hover)";
            }
        })["ToolbarBtn[<button>.onMouseEnter]"];
        $[5] = danger;
        $[6] = highlight;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] !== children || $[9] !== t1 || $[10] !== t3 || $[11] !== t4 || $[12] !== title) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            title: title,
            onMouseDown: _ToolbarBtnButtonOnMouseDown,
            onClick: t1,
            className: "p-1.5 rounded transition-colors",
            style: t3,
            onMouseEnter: t4,
            onMouseLeave: _ToolbarBtnButtonOnMouseLeave,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 571,
            columnNumber: 10
        }, this);
        $[8] = children;
        $[9] = t1;
        $[10] = t3;
        $[11] = t4;
        $[12] = title;
        $[13] = t5;
    } else {
        t5 = $[13];
    }
    return t5;
}
_c4 = ToolbarBtn;
function _ToolbarBtnButtonOnMouseLeave(e_2) {
    const el_0 = e_2.currentTarget;
    el_0.style.color = "var(--text-secondary)";
    el_0.style.background = "transparent";
}
function _ToolbarBtnButtonOnMouseDown(e) {
    return e.stopPropagation();
}
function WidgetTypeIcon(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "d5bc466e948cc5a4bc4a5bc73b7cf017948452e32b4a7e685faa485db3427bb8") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d5bc466e948cc5a4bc4a5bc73b7cf017948452e32b4a7e685faa485db3427bb8";
    }
    const { type } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            table: "\u229E",
            bar: "\u25AC",
            horizontal_bar: "\u2261",
            pie: "\u25D4",
            line: "\u223F",
            area: "\u25EC",
            heatmap: "\u25A6",
            metric: "#"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const icons = t1;
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            color: "var(--accent-brand)"
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const t3 = icons[type] ?? "?";
    let t4;
    if ($[3] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px] font-mono shrink-0",
            style: t2,
            children: t3
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
            lineNumber: 631,
            columnNumber: 10
        }, this);
        $[3] = t3;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    return t4;
}
_c5 = WidgetTypeIcon;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "SkeletonLoader");
__turbopack_context__.k.register(_c1, "ErrorState");
__turbopack_context__.k.register(_c2, "EmptyState");
__turbopack_context__.k.register(_c3, "WidgetCard");
__turbopack_context__.k.register(_c4, "ToolbarBtn");
__turbopack_context__.k.register(_c5, "WidgetTypeIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/WidgetGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetGrid",
    ()=>WidgetGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$grid$2d$layout$2f$dist$2f$chunk$2d$XM2M6TC6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-grid-layout/dist/chunk-XM2M6TC6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$grid$2d$layout$2f$dist$2f$chunk$2d$YFVX5RDK$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-grid-layout/dist/chunk-YFVX5RDK.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/WidgetCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const COLS = {
    lg: 12,
    md: 10,
    sm: 6,
    xs: 4,
    xxs: 2
};
const ROW_HEIGHT = 56;
const BREAKPOINTS = {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0
};
function WidgetGrid({ widgets, layout, onLayoutChange, onEditWidget, onDeleteWidget, onCopyWidget }) {
    _s();
    const { width, containerRef, mounted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$grid$2d$layout$2f$dist$2f$chunk$2d$YFVX5RDK$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContainerWidth"])({
        initialWidth: 1280
    });
    // Build layout items — merge stored layout with any new widgets not in layout yet
    // For new widgets without a stored position, pack them row-by-row
    const TOTAL_COLS = 12;
    let packX = 0;
    let packY = 0;
    let packRowH = 0;
    const layoutItems = widgets.map((w)=>{
        const stored = layout.find((l)=>l.i === w.id);
        if (stored) {
            return {
                i: stored.i,
                x: stored.x,
                y: stored.y,
                w: stored.w,
                h: stored.h,
                minW: 3,
                minH: 4
            };
        }
        // Auto-place: pack left-to-right, wrap to next row
        const ww = 6;
        const wh = 7;
        if (packX + ww > TOTAL_COLS) {
            packY += packRowH;
            packX = 0;
            packRowH = 0;
        }
        const item = {
            i: w.id,
            x: packX,
            y: packY,
            w: ww,
            h: wh,
            minW: 3,
            minH: 4
        };
        packX += ww;
        packRowH = Math.max(packRowH, wh);
        return item;
    });
    const handleLayoutChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WidgetGrid.useCallback[handleLayoutChange]": (newLayout, _allLayouts)=>{
            const mapped = [
                ...newLayout
            ].map({
                "WidgetGrid.useCallback[handleLayoutChange].mapped": (l_0)=>({
                        i: l_0.i,
                        x: l_0.x,
                        y: l_0.y,
                        w: l_0.w,
                        h: l_0.h
                    })
            }["WidgetGrid.useCallback[handleLayoutChange].mapped"]);
            onLayoutChange(mapped);
        }
    }["WidgetGrid.useCallback[handleLayoutChange]"], [
        onLayoutChange
    ]);
    if (widgets.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            className: "flex flex-col items-center justify-center min-h-[60vh] gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-5xl",
                    style: {
                        color: 'var(--text-secondary)',
                        opacity: 0.3
                    },
                    children: "⊞"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-medium",
                    style: {
                        color: 'var(--text-secondary)'
                    },
                    children: "No widgets yet"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-center max-w-sm",
                    style: {
                        color: 'var(--text-secondary)',
                        opacity: 0.6
                    },
                    children: [
                        "Click ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            style: {
                                color: 'var(--accent-brand)'
                            },
                            children: "+ Add Widget"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
                            lineNumber: 112,
                            columnNumber: 17
                        }, this),
                        " in the toolbar to add your first widget."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
            lineNumber: 100,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "w-full",
        children: mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$grid$2d$layout$2f$dist$2f$chunk$2d$XM2M6TC6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveGridLayout"], {
            className: "layout",
            layouts: {
                lg: layoutItems,
                md: layoutItems,
                sm: layoutItems
            },
            cols: COLS,
            rowHeight: ROW_HEIGHT,
            breakpoints: BREAKPOINTS,
            width: width,
            onLayoutChange: handleLayoutChange,
            dragConfig: {
                handle: '.widget-drag-handle'
            },
            margin: [
                10,
                10
            ],
            containerPadding: [
                0,
                0
            ],
            children: widgets.map((widget)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: '100%'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetCard"], {
                        widget: widget,
                        onEdit: onEditWidget,
                        onDelete: onDeleteWidget,
                        onCopy: onCopyWidget
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
                        lineNumber: 129,
                        columnNumber: 15
                    }, this)
                }, widget.id, false, {
                    fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
                    lineNumber: 126,
                    columnNumber: 34
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
            lineNumber: 119,
            columnNumber: 19
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
        lineNumber: 118,
        columnNumber: 10
    }, this);
}
_s(WidgetGrid, "GfAH0yYrj9hFJpZXywxEdMr8QJo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$grid$2d$layout$2f$dist$2f$chunk$2d$YFVX5RDK$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContainerWidth"]
    ];
});
_c = WidgetGrid;
var _c;
__turbopack_context__.k.register(_c, "WidgetGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/dashboard/presets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Preset widget definitions — shipped with first-visit seeding
 */ __turbopack_context__.s([
    "DEFAULT_PRESET_IDS",
    ()=>DEFAULT_PRESET_IDS,
    "PRESET_CATEGORIES",
    ()=>PRESET_CATEGORIES,
    "PRESET_WIDGETS",
    ()=>PRESET_WIDGETS,
    "getPresetById",
    ()=>getPresetById
]);
// ── Shared column helpers ────────────────────────────────────────────────────
const COL_SYMBOL = {
    id: 'symbol',
    label: 'Symbol',
    dslName: 'symbol',
    dbColumn: 'a.nse_symbol',
    format: 'text'
};
const COL_NAME = {
    id: 'name',
    label: 'Name',
    dslName: 'name',
    dbColumn: 'a.name',
    format: 'text'
};
const COL_SECTOR = {
    id: 'sector',
    label: 'Sector',
    dslName: 'sector',
    dbColumn: 'a.sector',
    format: 'text'
};
const COL_CLOSE = {
    id: 'close',
    label: 'Price',
    dslName: 'price',
    dbColumn: 'ti.close',
    format: 'currency',
    colorCode: false
};
const COL_CHANGE_1D = {
    id: 'change_1d',
    label: '% Change',
    dslName: 'change_1d_pct',
    dbColumn: 'ti.change_1d_pct',
    format: 'percent',
    colorCode: true
};
const COL_VOLUME = {
    id: 'volume',
    label: 'Volume',
    dslName: 'volume',
    dbColumn: 'ti.volume',
    format: 'number'
};
const COL_MCAP = {
    id: 'mcap',
    label: 'Mkt Cap (Cr)',
    dslName: 'mcap',
    dbColumn: 'cr.market_cap_cr',
    format: 'currency'
};
const COL_PE = {
    id: 'pe',
    label: 'P/E',
    dslName: 'pe',
    dbColumn: 'cr.pe_ttm',
    format: 'number',
    colorCode: true
};
const COL_ROE = {
    id: 'roe',
    label: 'ROE %',
    dslName: 'roe',
    dbColumn: 'cr.roe',
    format: 'percent',
    colorCode: true
};
const COL_ROCE = {
    id: 'roce',
    label: 'ROCE %',
    dslName: 'roce',
    dbColumn: 'cr.roce',
    format: 'percent',
    colorCode: true
};
const COL_RSI = {
    id: 'rsi',
    label: 'RSI(14)',
    dslName: 'rsi',
    dbColumn: 'ti.rsi_14',
    format: 'number',
    colorCode: true
};
const COL_52W_HIGH = {
    id: 'pct_52w_high',
    label: '% from 52W High',
    dslName: 'pctFrom52wHigh',
    dbColumn: 'ti.pct_from_52w_high',
    format: 'percent',
    colorCode: true
};
const COL_52W_LOW = {
    id: 'pct_52w_low',
    label: '% from 52W Low',
    dslName: 'pctFrom52wLow',
    dbColumn: 'ti.pct_from_52w_low',
    format: 'percent',
    colorCode: true
};
const COL_DIV_YIELD = {
    id: 'div_yield',
    label: 'Div Yield %',
    dslName: 'div_yield',
    dbColumn: 'cr.dividend_yield',
    format: 'percent',
    colorCode: true
};
const COL_DEBT_EQ = {
    id: 'de',
    label: 'D/E',
    dslName: 'de',
    dbColumn: 'cr.debt_equity',
    format: 'number'
};
const COL_REV_G = {
    id: 'rev_g1y',
    label: 'Rev Gr % (1Y)',
    dslName: 'rev_g1y',
    dbColumn: 'cr.revenue_growth_1y',
    format: 'percent',
    colorCode: true
};
const PRESET_WIDGETS = [
    {
        id: 'top_gainers',
        name: 'Top Gainers',
        description: 'Stocks with highest % price gain today',
        widget_type: 'horizontal_bar',
        category: 'Market',
        defaultLayout: {
            w: 6,
            h: 6
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_CHANGE_1D,
                COL_CLOSE,
                COL_VOLUME
            ],
            filters: {},
            sortColumn: 'change_1d_pct',
            sortDirection: 'desc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'change_1d_pct',
                yAxis: 'symbol',
                colorField: 'change_1d_pct'
            }
        }
    },
    {
        id: 'top_losers',
        name: 'Top Losers',
        description: 'Stocks with biggest % price decline today',
        widget_type: 'horizontal_bar',
        category: 'Market',
        defaultLayout: {
            w: 6,
            h: 6
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_CHANGE_1D,
                COL_CLOSE,
                COL_VOLUME
            ],
            filters: {},
            sortColumn: 'change_1d_pct',
            sortDirection: 'asc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'change_1d_pct',
                yAxis: 'symbol',
                colorField: 'change_1d_pct'
            }
        }
    },
    {
        id: 'sector_performance',
        name: 'Sector Performance',
        description: 'Average % change by sector today',
        widget_type: 'horizontal_bar',
        category: 'Market',
        defaultLayout: {
            w: 6,
            h: 6
        },
        config: {
            columns: [
                COL_SECTOR,
                {
                    id: 'avg_change',
                    label: 'Avg % Change',
                    dslName: 'change_1d_pct',
                    dbColumn: 'ti.change_1d_pct',
                    aggregation: 'avg',
                    format: 'percent',
                    colorCode: true
                }
            ],
            filters: {},
            groupColumn: 'sector',
            sortColumn: 'avg_change',
            sortDirection: 'desc',
            limit: 25,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'avg_change',
                yAxis: 'sector',
                colorField: 'avg_change'
            }
        }
    },
    {
        id: 'volume_leaders',
        name: 'Volume Leaders',
        description: 'Top stocks by trading volume today',
        widget_type: 'bar',
        category: 'Market',
        defaultLayout: {
            w: 6,
            h: 6
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_VOLUME,
                COL_CLOSE,
                COL_CHANGE_1D
            ],
            filters: {},
            sortColumn: 'volume',
            sortDirection: 'desc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'symbol',
                yAxis: 'volume'
            }
        }
    },
    {
        id: 'near_52w_high',
        name: 'Near 52-Week High',
        description: 'Stocks within 5% of their 52-week high',
        widget_type: 'table',
        category: 'Technical',
        defaultLayout: {
            w: 6,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_NAME,
                COL_CLOSE,
                COL_CHANGE_1D,
                COL_52W_HIGH,
                COL_SECTOR
            ],
            filters: {
                pctFrom52wHighMax: 5
            },
            sortColumn: 'pct_from_52w_high',
            sortDirection: 'desc',
            limit: 50,
            dataPerSymbol: 1
        }
    },
    {
        id: 'near_52w_low',
        name: 'Near 52-Week Low',
        description: 'Stocks within 10% of their 52-week low',
        widget_type: 'table',
        category: 'Technical',
        defaultLayout: {
            w: 6,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_NAME,
                COL_CLOSE,
                COL_CHANGE_1D,
                COL_52W_LOW,
                COL_SECTOR
            ],
            filters: {
                pctFrom52wLowMax: 10
            },
            sortColumn: 'pct_from_52w_low',
            sortDirection: 'asc',
            limit: 50,
            dataPerSymbol: 1
        }
    },
    {
        id: 'mcap_distribution',
        name: 'Market Cap by Sector',
        description: 'Total market capitalisation distribution across sectors',
        widget_type: 'pie',
        category: 'Fundamental',
        defaultLayout: {
            w: 5,
            h: 7
        },
        config: {
            columns: [
                COL_SECTOR,
                {
                    id: 'total_mcap',
                    label: 'Total Mkt Cap (Cr)',
                    dslName: 'mcap',
                    dbColumn: 'cr.market_cap_cr',
                    aggregation: 'sum',
                    format: 'currency'
                }
            ],
            filters: {},
            groupColumn: 'sector',
            sortColumn: 'total_mcap',
            sortDirection: 'desc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                colorField: 'sector',
                donut: true,
                showLegend: true
            }
        }
    },
    {
        id: 'oversold_rsi',
        name: 'Oversold (RSI < 30)',
        description: 'Technically oversold stocks — RSI below 30',
        widget_type: 'table',
        category: 'Technical',
        defaultLayout: {
            w: 6,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_NAME,
                COL_CLOSE,
                COL_CHANGE_1D,
                COL_RSI,
                COL_SECTOR
            ],
            filters: {
                rsi14Max: 30
            },
            sortColumn: 'rsi_14',
            sortDirection: 'asc',
            limit: 50,
            dataPerSymbol: 1
        }
    },
    {
        id: 'high_roce',
        name: 'High ROCE Leaders',
        description: 'Stocks with ROCE > 20% and low debt',
        widget_type: 'table',
        category: 'Fundamental',
        defaultLayout: {
            w: 7,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_NAME,
                COL_ROCE,
                COL_ROE,
                COL_PE,
                COL_DEBT_EQ,
                COL_MCAP,
                COL_SECTOR
            ],
            filters: {
                roceMin: 20,
                debtEquityMax: 0.5
            },
            sortColumn: 'roce',
            sortDirection: 'desc',
            limit: 50,
            dataPerSymbol: 1
        }
    },
    {
        id: 'dividend_champions',
        name: 'Dividend Champions',
        description: 'High dividend yield stocks with strong ROCE',
        widget_type: 'table',
        category: 'Fundamental',
        defaultLayout: {
            w: 7,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_NAME,
                COL_DIV_YIELD,
                COL_ROCE,
                COL_PE,
                COL_CLOSE,
                COL_SECTOR
            ],
            filters: {
                dividendYieldMin: 2,
                roceMin: 15
            },
            sortColumn: 'div_yield',
            sortDirection: 'desc',
            limit: 50,
            dataPerSymbol: 1
        }
    },
    {
        id: 'revenue_growth',
        name: 'Revenue Growth Leaders',
        description: 'Top stocks by 1-year revenue growth',
        widget_type: 'bar',
        category: 'Fundamental',
        defaultLayout: {
            w: 6,
            h: 6
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_REV_G,
                COL_ROE,
                COL_MCAP
            ],
            filters: {
                marketCapCrMin: 500,
                revenueGrowth1yMin: 15
            },
            sortColumn: 'rev_g1y',
            sortDirection: 'desc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'symbol',
                yAxis: 'rev_g1y',
                colorField: 'rev_g1y'
            }
        }
    },
    {
        id: 'undervalued_gems',
        name: 'Undervalued Gems',
        description: 'PE < 15, ROE > 15%',
        widget_type: 'table',
        category: 'Fundamental',
        defaultLayout: {
            w: 7,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_NAME,
                COL_PE,
                COL_ROE,
                COL_ROCE,
                COL_DEBT_EQ
            ],
            filters: {
                peTtmMax: 15,
                roeMin: 15
            },
            sortColumn: 'roe',
            sortDirection: 'desc',
            limit: 50,
            dataPerSymbol: 1
        }
    },
    {
        id: 'roe_leaders',
        name: 'ROE Leaders',
        description: 'Top stocks ranked by Return on Equity',
        widget_type: 'horizontal_bar',
        category: 'Fundamental',
        defaultLayout: {
            w: 5,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_ROE,
                COL_ROCE,
                COL_PE
            ],
            filters: {
                roeMin: 15
            },
            sortColumn: 'roe',
            sortDirection: 'desc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'roe',
                yAxis: 'symbol',
                colorField: 'roe'
            }
        }
    },
    {
        id: 'low_pe',
        name: 'Low P/E Value Picks',
        description: 'Stocks with P/E below 15 — potential value plays',
        widget_type: 'horizontal_bar',
        category: 'Fundamental',
        defaultLayout: {
            w: 5,
            h: 7
        },
        config: {
            columns: [
                COL_SYMBOL,
                COL_PE,
                COL_ROE,
                COL_ROCE
            ],
            filters: {
                peTtmMax: 15,
                peTtmMin: 1
            },
            sortColumn: 'pe',
            sortDirection: 'asc',
            limit: 20,
            dataPerSymbol: 1,
            chartConfig: {
                xAxis: 'pe',
                yAxis: 'symbol',
                colorField: 'pe'
            }
        }
    }
];
const DEFAULT_PRESET_IDS = [
    'high_roce',
    'undervalued_gems',
    'roe_leaders',
    'low_pe'
];
function getPresetById(id) {
    return PRESET_WIDGETS.find((p)=>p.id === id);
}
const PRESET_CATEGORIES = [
    ...new Set(PRESET_WIDGETS.map((p)=>p.category))
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/AddWidgetDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddWidgetDialog",
    ()=>AddWidgetDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dashboard/presets.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const CATEGORIES = [
    'All',
    ...Array.from(new Set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESET_WIDGETS"].map((p)=>p.category)))
];
const TYPE_ICONS = {
    table: '⊞',
    bar: '▬',
    horizontal_bar: '≡',
    pie: '◔',
    line: '∿',
    area: '◬',
    heatmap: '▦',
    metric: '#'
};
const TYPE_LABELS = {
    table: 'Table',
    bar: 'Bar',
    horizontal_bar: 'H-Bar',
    pie: 'Pie',
    line: 'Line',
    area: 'Area',
    heatmap: 'Heatmap',
    metric: 'Metric'
};
function AddWidgetDialog(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(50);
    if ($[0] !== "47a5a3bc4019666323611a58787647970e42a231d9c7804b4ca36f6dffb9dba7") {
        for(let $i = 0; $i < 50; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "47a5a3bc4019666323611a58787647970e42a231d9c7804b4ca36f6dffb9dba7";
    }
    const { onAdd, onClose } = t0;
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t1;
    let t10;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[1] !== activeCategory || $[2] !== onAdd || $[3] !== onClose || $[4] !== search) {
        let t11;
        if ($[15] !== activeCategory || $[16] !== search) {
            t11 = ({
                "AddWidgetDialog[PRESET_WIDGETS.filter()]": (p)=>{
                    const matchCat = activeCategory === "All" || p.category === activeCategory;
                    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
                    return matchCat && matchSearch;
                }
            })["AddWidgetDialog[PRESET_WIDGETS.filter()]"];
            $[15] = activeCategory;
            $[16] = search;
            $[17] = t11;
        } else {
            t11 = $[17];
        }
        const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESET_WIDGETS"].filter(t11);
        t9 = "fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4";
        t10 = onClose;
        t3 = "rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl";
        if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
            t4 = {
                background: "var(--surface)",
                border: "1px solid var(--border)"
            };
            $[18] = t4;
        } else {
            t4 = $[18];
        }
        t5 = _AddWidgetDialogDivOnClick;
        let t12;
        if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
            t12 = {
                borderBottom: "1px solid var(--border)"
            };
            $[19] = t12;
        } else {
            t12 = $[19];
        }
        let t13;
        if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
            t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-sm font-semibold",
                style: {
                    color: "var(--text-primary)"
                },
                children: "Add Widget"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                lineNumber: 97,
                columnNumber: 13
            }, this);
            $[20] = t13;
        } else {
            t13 = $[20];
        }
        let t14;
        if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
            t14 = {
                color: "var(--text-secondary)"
            };
            $[21] = t14;
        } else {
            t14 = $[21];
        }
        let t15;
        if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
            t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-4 h-4",
                viewBox: "0 0 16 16",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M3 3l10 10M13 3L3 13",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                    lineNumber: 115,
                    columnNumber: 110
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                lineNumber: 115,
                columnNumber: 13
            }, this);
            $[22] = t15;
        } else {
            t15 = $[22];
        }
        if ($[23] !== onClose) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 py-4",
                style: t12,
                children: [
                    t13,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "transition-colors p-1 rounded",
                        style: t14,
                        onMouseEnter: _AddWidgetDialogButtonOnMouseEnter,
                        onMouseLeave: _AddWidgetDialogButtonOnMouseLeave,
                        children: t15
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                        lineNumber: 121,
                        columnNumber: 90
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                lineNumber: 121,
                columnNumber: 12
            }, this);
            $[23] = onClose;
            $[24] = t6;
        } else {
            t6 = $[24];
        }
        let t16;
        if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
            t16 = {
                borderBottom: "1px solid var(--border)"
            };
            $[25] = t16;
        } else {
            t16 = $[25];
        }
        let t17;
        if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
            t17 = ({
                "AddWidgetDialog[<input>.onChange]": (e_2)=>setSearch(e_2.target.value)
            })["AddWidgetDialog[<input>.onChange]"];
            $[26] = t17;
        } else {
            t17 = $[26];
        }
        let t18;
        if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
            t18 = {
                background: "var(--bg-hover)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)"
            };
            $[27] = t18;
        } else {
            t18 = $[27];
        }
        if ($[28] !== search) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 py-3",
                style: t16,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    autoFocus: true,
                    value: search,
                    onChange: t17,
                    placeholder: "Search widgets\u2026",
                    className: "w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors",
                    style: t18
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                    lineNumber: 157,
                    columnNumber: 51
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                lineNumber: 157,
                columnNumber: 12
            }, this);
            $[28] = search;
            $[29] = t7;
        } else {
            t7 = $[29];
        }
        let t19;
        if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
            t19 = {
                borderBottom: "1px solid var(--border)"
            };
            $[30] = t19;
        } else {
            t19 = $[30];
        }
        let t20;
        if ($[31] !== activeCategory) {
            t20 = CATEGORIES.map({
                "AddWidgetDialog[CATEGORIES.map()]": (cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "AddWidgetDialog[CATEGORIES.map() > <button>.onClick]": ()=>setActiveCategory(cat)
                        }["AddWidgetDialog[CATEGORIES.map() > <button>.onClick]"],
                        className: "px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors",
                        style: activeCategory === cat ? {
                            background: "var(--selection-bg, rgba(245,158,11,0.15))",
                            color: "var(--accent-brand)",
                            border: "1px solid var(--selection-border, rgba(245,158,11,0.3))"
                        } : {
                            color: "var(--text-secondary)",
                            border: "1px solid transparent"
                        },
                        children: cat
                    }, cat, false, {
                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                        lineNumber: 175,
                        columnNumber: 53
                    }, this)
            }["AddWidgetDialog[CATEGORIES.map()]"]);
            $[31] = activeCategory;
            $[32] = t20;
        } else {
            t20 = $[32];
        }
        if ($[33] !== t20) {
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 px-5 py-2 overflow-x-auto scrollbar-none",
                style: t19,
                children: t20
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                lineNumber: 192,
                columnNumber: 12
            }, this);
            $[33] = t20;
            $[34] = t8;
        } else {
            t8 = $[34];
        }
        t1 = "flex-1 overflow-y-auto p-4";
        t2 = filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-32 text-sm",
            style: {
                color: "var(--text-secondary)"
            },
            children: "No widgets found"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
            lineNumber: 199,
            columnNumber: 34
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-3",
            children: filtered.map({
                "AddWidgetDialog[filtered.map()]": (preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "AddWidgetDialog[filtered.map() > <button>.onClick]": ()=>onAdd(preset)
                        }["AddWidgetDialog[filtered.map() > <button>.onClick]"],
                        className: "group flex flex-col gap-2 p-4 rounded-lg text-left transition-all",
                        style: {
                            background: "var(--bg-hover)",
                            border: "1px solid var(--border)"
                        },
                        onMouseEnter: _AddWidgetDialogFilteredMapButtonOnMouseEnter,
                        onMouseLeave: _AddWidgetDialogFilteredMapButtonOnMouseLeave,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-base font-mono",
                                                style: {
                                                    color: "var(--accent-brand)",
                                                    opacity: 0.8
                                                },
                                                children: TYPE_ICONS[preset.widget_type]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                                lineNumber: 207,
                                                columnNumber: 226
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-medium",
                                                style: {
                                                    color: "var(--text-primary)"
                                                },
                                                children: preset.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                                lineNumber: 210,
                                                columnNumber: 57
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                        lineNumber: 207,
                                        columnNumber: 185
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-mono",
                                        style: {
                                            color: "var(--text-secondary)",
                                            opacity: 0.6
                                        },
                                        children: TYPE_LABELS[preset.widget_type]
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                        lineNumber: 212,
                                        columnNumber: 44
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                lineNumber: 207,
                                columnNumber: 134
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] leading-relaxed line-clamp-2",
                                style: {
                                    color: "var(--text-secondary)"
                                },
                                children: preset.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                lineNumber: 215,
                                columnNumber: 62
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 mt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] px-1.5 py-0.5 rounded",
                                        style: {
                                            background: "var(--surface)",
                                            color: "var(--text-secondary)",
                                            border: "1px solid var(--border)"
                                        },
                                        children: preset.category
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                        lineNumber: 217,
                                        columnNumber: 86
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px]",
                                        style: {
                                            color: "var(--text-secondary)",
                                            opacity: 0.6
                                        },
                                        children: [
                                            preset.config.columns.length,
                                            " cols"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                        lineNumber: 221,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                lineNumber: 217,
                                columnNumber: 38
                            }, this)
                        ]
                    }, preset.id, true, {
                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                        lineNumber: 202,
                        columnNumber: 54
                    }, this)
            }["AddWidgetDialog[filtered.map()]"])
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
            lineNumber: 201,
            columnNumber: 33
        }, this);
        $[1] = activeCategory;
        $[2] = onAdd;
        $[3] = onClose;
        $[4] = search;
        $[5] = t1;
        $[6] = t10;
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
        $[10] = t5;
        $[11] = t6;
        $[12] = t7;
        $[13] = t8;
        $[14] = t9;
    } else {
        t1 = $[5];
        t10 = $[6];
        t2 = $[7];
        t3 = $[8];
        t4 = $[9];
        t5 = $[10];
        t6 = $[11];
        t7 = $[12];
        t8 = $[13];
        t9 = $[14];
    }
    let t11;
    if ($[35] !== t1 || $[36] !== t2) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: t2
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
            lineNumber: 254,
            columnNumber: 11
        }, this);
        $[35] = t1;
        $[36] = t2;
        $[37] = t11;
    } else {
        t11 = $[37];
    }
    let t12;
    if ($[38] !== t11 || $[39] !== t3 || $[40] !== t4 || $[41] !== t5 || $[42] !== t6 || $[43] !== t7 || $[44] !== t8) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            style: t4,
            onClick: t5,
            children: [
                t6,
                t7,
                t8,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
            lineNumber: 263,
            columnNumber: 11
        }, this);
        $[38] = t11;
        $[39] = t3;
        $[40] = t4;
        $[41] = t5;
        $[42] = t6;
        $[43] = t7;
        $[44] = t8;
        $[45] = t12;
    } else {
        t12 = $[45];
    }
    let t13;
    if ($[46] !== t10 || $[47] !== t12 || $[48] !== t9) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t9,
            onClick: t10,
            children: t12
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
            lineNumber: 277,
            columnNumber: 11
        }, this);
        $[46] = t10;
        $[47] = t12;
        $[48] = t9;
        $[49] = t13;
    } else {
        t13 = $[49];
    }
    return t13;
}
_s(AddWidgetDialog, "H6lyDY0UcJb9u87Y7roKMhWXXvw=");
_c = AddWidgetDialog;
function _AddWidgetDialogFilteredMapButtonOnMouseLeave(e_4) {
    e_4.currentTarget.style.borderColor = "var(--border)";
}
function _AddWidgetDialogFilteredMapButtonOnMouseEnter(e_3) {
    e_3.currentTarget.style.borderColor = "var(--accent-brand)";
}
function _AddWidgetDialogButtonOnMouseLeave(e_1) {
    e_1.currentTarget.style.color = "var(--text-secondary)";
}
function _AddWidgetDialogButtonOnMouseEnter(e_0) {
    e_0.currentTarget.style.color = "var(--text-primary)";
}
function _AddWidgetDialogDivOnClick(e) {
    return e.stopPropagation();
}
var _c;
__turbopack_context__.k.register(_c, "AddWidgetDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/WidgetEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetEditor",
    ()=>WidgetEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dashboard/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/WidgetRenderer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const COLUMN_CATALOGUE = [
    // Identity
    {
        id: 'symbol',
        label: 'Symbol',
        dslName: 'symbol',
        dbColumn: 'a.nse_symbol',
        format: 'text',
        category: 'Identity'
    },
    {
        id: 'name',
        label: 'Name',
        dslName: 'name',
        dbColumn: 'a.name',
        format: 'text',
        category: 'Identity'
    },
    {
        id: 'sector',
        label: 'Sector',
        dslName: 'sector',
        dbColumn: 'a.sector',
        format: 'text',
        category: 'Identity'
    },
    {
        id: 'isin',
        label: 'ISIN',
        dslName: 'isin',
        dbColumn: 'a.isin',
        format: 'text',
        category: 'Identity'
    },
    // Price / Technical
    {
        id: 'close',
        label: 'Price',
        dslName: 'price',
        dbColumn: 'ti.close',
        format: 'currency',
        category: 'Technical',
        colorCode: false
    },
    {
        id: 'change_1d',
        label: '% Change (1D)',
        dslName: 'change_1d_pct',
        dbColumn: 'ti.change_1d_pct',
        format: 'percent',
        category: 'Technical',
        colorCode: true
    },
    {
        id: 'volume',
        label: 'Volume',
        dslName: 'volume',
        dbColumn: 'ti.volume',
        format: 'number',
        category: 'Technical'
    },
    {
        id: 'rsi',
        label: 'RSI (14)',
        dslName: 'rsi',
        dbColumn: 'ti.rsi_14',
        format: 'number',
        category: 'Technical',
        colorCode: true
    },
    {
        id: 'pct_52w_high',
        label: '% from 52W High',
        dslName: 'pctFrom52wHigh',
        dbColumn: 'ti.pct_from_52w_high',
        format: 'percent',
        category: 'Technical',
        colorCode: true
    },
    {
        id: 'pct_52w_low',
        label: '% from 52W Low',
        dslName: 'pctFrom52wLow',
        dbColumn: 'ti.pct_from_52w_low',
        format: 'percent',
        category: 'Technical',
        colorCode: true
    },
    {
        id: 'sma_20',
        label: 'SMA 20',
        dslName: 'sma_20',
        dbColumn: 'ti.sma_20',
        format: 'currency',
        category: 'Technical'
    },
    {
        id: 'sma_50',
        label: 'SMA 50',
        dslName: 'sma_50',
        dbColumn: 'ti.sma_50',
        format: 'currency',
        category: 'Technical'
    },
    {
        id: 'sma_200',
        label: 'SMA 200',
        dslName: 'sma_200',
        dbColumn: 'ti.sma_200',
        format: 'currency',
        category: 'Technical'
    },
    // Valuation
    {
        id: 'pe',
        label: 'P/E (TTM)',
        dslName: 'pe',
        dbColumn: 'cr.pe_ttm',
        format: 'number',
        category: 'Valuation',
        colorCode: true
    },
    {
        id: 'pb',
        label: 'P/B',
        dslName: 'pb',
        dbColumn: 'cr.pb',
        format: 'number',
        category: 'Valuation',
        colorCode: true
    },
    {
        id: 'ev_ebitda',
        label: 'EV/EBITDA',
        dslName: 'ev_ebitda',
        dbColumn: 'cr.ev_ebitda',
        format: 'number',
        category: 'Valuation',
        colorCode: true
    },
    {
        id: 'mcap',
        label: 'Mkt Cap (Cr)',
        dslName: 'mcap',
        dbColumn: 'cr.market_cap_cr',
        format: 'currency',
        category: 'Valuation'
    },
    {
        id: 'div_yield',
        label: 'Div Yield %',
        dslName: 'div_yield',
        dbColumn: 'cr.dividend_yield',
        format: 'percent',
        category: 'Valuation',
        colorCode: true
    },
    // Profitability
    {
        id: 'roe',
        label: 'ROE %',
        dslName: 'roe',
        dbColumn: 'cr.roe',
        format: 'percent',
        category: 'Profitability',
        colorCode: true
    },
    {
        id: 'roce',
        label: 'ROCE %',
        dslName: 'roce',
        dbColumn: 'cr.roce',
        format: 'percent',
        category: 'Profitability',
        colorCode: true
    },
    {
        id: 'pat_margin',
        label: 'PAT Margin %',
        dslName: 'pat_margin',
        dbColumn: 'cr.pat_margin',
        format: 'percent',
        category: 'Profitability',
        colorCode: true
    },
    {
        id: 'op_margin',
        label: 'Op Margin %',
        dslName: 'op_margin',
        dbColumn: 'cr.operating_margin',
        format: 'percent',
        category: 'Profitability',
        colorCode: true
    },
    // Growth
    {
        id: 'rev_g1y',
        label: 'Rev Growth 1Y %',
        dslName: 'rev_g1y',
        dbColumn: 'cr.revenue_growth_1y',
        format: 'percent',
        category: 'Growth',
        colorCode: true
    },
    {
        id: 'pat_g1y',
        label: 'PAT Growth 1Y %',
        dslName: 'pat_g1y',
        dbColumn: 'cr.pat_growth_1y',
        format: 'percent',
        category: 'Growth',
        colorCode: true
    },
    {
        id: 'eps_g1y',
        label: 'EPS Growth 1Y %',
        dslName: 'eps_g1y',
        dbColumn: 'cr.eps_growth_1y',
        format: 'percent',
        category: 'Growth',
        colorCode: true
    },
    // Balance Sheet
    {
        id: 'de',
        label: 'Debt/Equity',
        dslName: 'de',
        dbColumn: 'cr.debt_equity',
        format: 'number',
        category: 'Balance Sheet'
    },
    {
        id: 'current_ratio',
        label: 'Current Ratio',
        dslName: 'current_ratio',
        dbColumn: 'cr.current_ratio',
        format: 'number',
        category: 'Balance Sheet',
        colorCode: true
    },
    {
        id: 'interest_coverage',
        label: 'Interest Coverage',
        dslName: 'interest_coverage',
        dbColumn: 'cr.interest_coverage',
        format: 'number',
        category: 'Balance Sheet',
        colorCode: true
    },
    {
        id: 'quality_score',
        label: 'Quality Score',
        dslName: 'quality_score',
        dbColumn: 'cr.quality_score',
        format: 'number',
        category: 'Balance Sheet',
        colorCode: true
    },
    // MSI Ratings
    {
        id: 'rs_rating',
        label: 'RS Rating',
        dslName: 'rs_rating',
        dbColumn: 'mc.rs_rating',
        format: 'number',
        category: 'MSI Ratings',
        colorCode: true
    },
    {
        id: 'eps_rating',
        label: 'EPS Rating',
        dslName: 'eps_rating',
        dbColumn: 'mc.eps_rating',
        format: 'number',
        category: 'MSI Ratings',
        colorCode: true
    },
    {
        id: 'master_score',
        label: 'Master Score',
        dslName: 'master_score',
        dbColumn: 'mc.master_score',
        format: 'number',
        category: 'MSI Ratings',
        colorCode: true
    }
];
const COLUMN_CATEGORIES = [
    ...new Set(COLUMN_CATALOGUE.map((c)=>c.category))
];
const FILTER_SPECS = [
    // Valuation
    {
        key: 'peTtmMin',
        label: 'P/E Min',
        category: 'Valuation',
        type: 'range'
    },
    {
        key: 'peTtmMax',
        label: 'P/E Max',
        category: 'Valuation',
        type: 'range'
    },
    {
        key: 'pbMin',
        label: 'P/B Min',
        category: 'Valuation',
        type: 'range'
    },
    {
        key: 'pbMax',
        label: 'P/B Max',
        category: 'Valuation',
        type: 'range'
    },
    {
        key: 'evEbitdaMin',
        label: 'EV/EBITDA Min',
        category: 'Valuation',
        type: 'range'
    },
    {
        key: 'evEbitdaMax',
        label: 'EV/EBITDA Max',
        category: 'Valuation',
        type: 'range'
    },
    {
        key: 'marketCapCrMin',
        label: 'Mkt Cap Min (Cr)',
        category: 'Valuation',
        type: 'range'
    },
    {
        key: 'marketCapCrMax',
        label: 'Mkt Cap Max (Cr)',
        category: 'Valuation',
        type: 'range'
    },
    {
        key: 'dividendYieldMin',
        label: 'Div Yield Min %',
        category: 'Valuation',
        type: 'range'
    },
    {
        key: 'dividendYieldMax',
        label: 'Div Yield Max %',
        category: 'Valuation',
        type: 'range'
    },
    // Profitability
    {
        key: 'roeMin',
        label: 'ROE Min %',
        category: 'Profitability',
        type: 'range'
    },
    {
        key: 'roeMax',
        label: 'ROE Max %',
        category: 'Profitability',
        type: 'range'
    },
    {
        key: 'roceMin',
        label: 'ROCE Min %',
        category: 'Profitability',
        type: 'range'
    },
    {
        key: 'roceMax',
        label: 'ROCE Max %',
        category: 'Profitability',
        type: 'range'
    },
    {
        key: 'patMarginMin',
        label: 'PAT Margin Min %',
        category: 'Profitability',
        type: 'range'
    },
    {
        key: 'patMarginMax',
        label: 'PAT Margin Max %',
        category: 'Profitability',
        type: 'range'
    },
    {
        key: 'operatingMarginMin',
        label: 'Op Margin Min %',
        category: 'Profitability',
        type: 'range'
    },
    {
        key: 'operatingMarginMax',
        label: 'Op Margin Max %',
        category: 'Profitability',
        type: 'range'
    },
    // Growth
    {
        key: 'revenueGrowth1yMin',
        label: 'Rev Growth Min %',
        category: 'Growth',
        type: 'range'
    },
    {
        key: 'revenueGrowth1yMax',
        label: 'Rev Growth Max %',
        category: 'Growth',
        type: 'range'
    },
    {
        key: 'patGrowth1yMin',
        label: 'PAT Growth Min %',
        category: 'Growth',
        type: 'range'
    },
    {
        key: 'patGrowth1yMax',
        label: 'PAT Growth Max %',
        category: 'Growth',
        type: 'range'
    },
    {
        key: 'epsGrowth1yMin',
        label: 'EPS Growth Min %',
        category: 'Growth',
        type: 'range'
    },
    {
        key: 'epsGrowth1yMax',
        label: 'EPS Growth Max %',
        category: 'Growth',
        type: 'range'
    },
    // Balance Sheet
    {
        key: 'debtEquityMin',
        label: 'D/E Min',
        category: 'Balance Sheet',
        type: 'range'
    },
    {
        key: 'debtEquityMax',
        label: 'D/E Max',
        category: 'Balance Sheet',
        type: 'range'
    },
    {
        key: 'currentRatioMin',
        label: 'Current Ratio Min',
        category: 'Balance Sheet',
        type: 'range'
    },
    {
        key: 'currentRatioMax',
        label: 'Current Ratio Max',
        category: 'Balance Sheet',
        type: 'range'
    },
    {
        key: 'interestCoverageMin',
        label: 'Interest Cov. Min',
        category: 'Balance Sheet',
        type: 'range'
    },
    {
        key: 'interestCoverageMax',
        label: 'Interest Cov. Max',
        category: 'Balance Sheet',
        type: 'range'
    },
    {
        key: 'qualityScoreMin',
        label: 'Quality Score Min',
        category: 'Balance Sheet',
        type: 'range'
    },
    {
        key: 'qualityScoreMax',
        label: 'Quality Score Max',
        category: 'Balance Sheet',
        type: 'range'
    },
    // Technical
    {
        key: 'rsi14Min',
        label: 'RSI Min',
        category: 'Technical',
        type: 'range'
    },
    {
        key: 'rsi14Max',
        label: 'RSI Max',
        category: 'Technical',
        type: 'range'
    },
    {
        key: 'pctFrom52wHighMin',
        label: '52W High % Min',
        category: 'Technical',
        type: 'range'
    },
    {
        key: 'pctFrom52wHighMax',
        label: '52W High % Max',
        category: 'Technical',
        type: 'range'
    },
    {
        key: 'pctFrom52wLowMin',
        label: '52W Low % Min',
        category: 'Technical',
        type: 'range'
    },
    {
        key: 'pctFrom52wLowMax',
        label: '52W Low % Max',
        category: 'Technical',
        type: 'range'
    },
    // Cap bucket
    {
        key: 'marketCapBucket',
        label: 'Market Cap Bucket',
        category: 'Valuation',
        type: 'select',
        options: [
            {
                value: 'large',
                label: 'Large Cap (≥20,000 Cr)'
            },
            {
                value: 'mid',
                label: 'Mid Cap (5,000–20,000 Cr)'
            },
            {
                value: 'small',
                label: 'Small Cap (500–5,000 Cr)'
            },
            {
                value: 'micro',
                label: 'Micro Cap (<500 Cr)'
            }
        ]
    }
];
const FILTER_CATEGORIES = [
    ...new Set(FILTER_SPECS.map((f)=>f.category))
];
// ── Widget type options ───────────────────────────────────────────────────────
const WIDGET_TYPES = [
    {
        value: 'table',
        label: 'Table',
        icon: '⊞'
    },
    {
        value: 'bar',
        label: 'Bar Chart',
        icon: '▬'
    },
    {
        value: 'horizontal_bar',
        label: 'H-Bar Chart',
        icon: '≡'
    },
    {
        value: 'pie',
        label: 'Pie / Donut',
        icon: '◔'
    },
    {
        value: 'line',
        label: 'Line Chart',
        icon: '∿'
    },
    {
        value: 'area',
        label: 'Area Chart',
        icon: '⌇'
    },
    {
        value: 'heatmap',
        label: 'Heatmap',
        icon: '▦'
    },
    {
        value: 'metric',
        label: 'Metric Card',
        icon: '#'
    }
];
// ── Helpers ───────────────────────────────────────────────────────────────────
function inputStyle(extra) {
    return {
        background: 'var(--bg-hover)',
        border: '1px solid var(--border)',
        color: 'var(--text-primary)',
        borderRadius: 6,
        fontSize: 12,
        outline: 'none',
        ...extra
    };
}
function labelStyle() {
    return {
        color: 'var(--text-secondary)',
        fontSize: 11,
        marginBottom: 3,
        display: 'block'
    };
}
function WidgetEditor(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(173);
    if ($[0] !== "393f15b0b324ee09d60c84e7acfc645660da49f86f4254078c9380b600f5f9b0") {
        for(let $i = 0; $i < 173; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "393f15b0b324ee09d60c84e7acfc645660da49f86f4254078c9380b600f5f9b0";
    }
    const { widget, onSave, onClose } = t0;
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(widget.title);
    const [widgetType, setWidgetType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(widget.widget_type);
    let t1;
    if ($[1] !== widget.config_json.columns) {
        t1 = widget.config_json.columns ?? [];
        $[1] = widget.config_json.columns;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== t1) {
        t2 = [
            ...t1
        ];
        $[3] = t1;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const [columns, setColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t2);
    let t3;
    if ($[5] !== widget.config_json.filters) {
        t3 = widget.config_json.filters ?? {};
        $[5] = widget.config_json.filters;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== t3) {
        t4 = {
            ...t3
        };
        $[7] = t3;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t4);
    const [sortColumn, setSortColumn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(widget.config_json.sortColumn ?? "");
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(widget.config_json.sortDirection ?? "desc");
    const [limit, setLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(widget.config_json.limit ?? 50);
    const [groupColumn, setGroupColumn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(widget.config_json.groupColumn ?? "");
    let t5;
    if ($[9] !== widget.config_json.chartConfig) {
        t5 = widget.config_json.chartConfig ?? {};
        $[9] = widget.config_json.chartConfig;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] !== t5) {
        t6 = {
            ...t5
        };
        $[11] = t5;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    const [chartConfig, setChartConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t6);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("columns");
    const [colSearch, setColSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [colCategory, setColCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [filterCategory, setFilterCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [addFilterKey, setAddFilterKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const t7 = sortColumn || undefined;
    const t8 = groupColumn || null;
    let t9;
    if ($[13] !== chartConfig || $[14] !== columns || $[15] !== filters || $[16] !== limit || $[17] !== sortDirection || $[18] !== t7 || $[19] !== t8) {
        t9 = {
            columns,
            filters,
            sortColumn: t7,
            sortDirection,
            limit,
            groupColumn: t8,
            chartConfig
        };
        $[13] = chartConfig;
        $[14] = columns;
        $[15] = filters;
        $[16] = limit;
        $[17] = sortDirection;
        $[18] = t7;
        $[19] = t8;
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    const previewConfig = t9;
    const { data: previewData, loading: previewLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWidgetData"])(previewConfig, widgetType, activeTab === "preview");
    let t10;
    if ($[21] !== onClose || $[22] !== onSave || $[23] !== previewConfig || $[24] !== title || $[25] !== widget.id || $[26] !== widget.title || $[27] !== widgetType) {
        t10 = ({
            "WidgetEditor[handleSave]": async ()=>{
                setSaving(true);
                const ok = await onSave(widget.id, {
                    title: title.trim() || widget.title,
                    widget_type: widgetType,
                    config_json: previewConfig
                });
                setSaving(false);
                if (ok) {
                    onClose();
                }
            }
        })["WidgetEditor[handleSave]"];
        $[21] = onClose;
        $[22] = onSave;
        $[23] = previewConfig;
        $[24] = title;
        $[25] = widget.id;
        $[26] = widget.title;
        $[27] = widgetType;
        $[28] = t10;
    } else {
        t10 = $[28];
    }
    const handleSave = t10;
    let t11;
    if ($[29] !== columns) {
        t11 = ({
            "WidgetEditor[addColumn]": (col)=>{
                if (columns.find({
                    "WidgetEditor[addColumn > columns.find()]": (c)=>c.id === col.id
                }["WidgetEditor[addColumn > columns.find()]"])) {
                    return;
                }
                const { category: _cat, available: _av, ...colDef } = col;
                setColumns({
                    "WidgetEditor[addColumn > setColumns()]": (prev)=>[
                            ...prev,
                            colDef
                        ]
                }["WidgetEditor[addColumn > setColumns()]"]);
            }
        })["WidgetEditor[addColumn]"];
        $[29] = columns;
        $[30] = t11;
    } else {
        t11 = $[30];
    }
    const addColumn = t11;
    let t12;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = ({
            "WidgetEditor[removeColumn]": (id)=>{
                setColumns({
                    "WidgetEditor[removeColumn > setColumns()]": (prev_0)=>prev_0.filter({
                            "WidgetEditor[removeColumn > setColumns() > prev_0.filter()]": (c_0)=>c_0.id !== id
                        }["WidgetEditor[removeColumn > setColumns() > prev_0.filter()]"])
                }["WidgetEditor[removeColumn > setColumns()]"]);
            }
        })["WidgetEditor[removeColumn]"];
        $[31] = t12;
    } else {
        t12 = $[31];
    }
    const removeColumn = t12;
    let t13;
    if ($[32] !== columns.length) {
        t13 = ({
            "WidgetEditor[moveColumn]": (from, to)=>{
                if (to < 0 || to >= columns.length) {
                    return;
                }
                setColumns({
                    "WidgetEditor[moveColumn > setColumns()]": (prev_1)=>{
                        const arr = [
                            ...prev_1
                        ];
                        const [item] = arr.splice(from, 1);
                        arr.splice(to, 0, item);
                        return arr;
                    }
                }["WidgetEditor[moveColumn > setColumns()]"]);
            }
        })["WidgetEditor[moveColumn]"];
        $[32] = columns.length;
        $[33] = t13;
    } else {
        t13 = $[33];
    }
    const moveColumn = t13;
    let t14;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = ({
            "WidgetEditor[updateColumnProp]": (id_0, key, value)=>{
                setColumns({
                    "WidgetEditor[updateColumnProp > setColumns()]": (prev_2)=>prev_2.map({
                            "WidgetEditor[updateColumnProp > setColumns() > prev_2.map()]": (c_1)=>c_1.id === id_0 ? {
                                    ...c_1,
                                    [key]: value
                                } : c_1
                        }["WidgetEditor[updateColumnProp > setColumns() > prev_2.map()]"])
                }["WidgetEditor[updateColumnProp > setColumns()]"]);
            }
        })["WidgetEditor[updateColumnProp]"];
        $[34] = t14;
    } else {
        t14 = $[34];
    }
    const updateColumnProp = t14;
    let t15;
    if ($[35] !== filters) {
        t15 = Object.keys(filters);
        $[35] = filters;
        $[36] = t15;
    } else {
        t15 = $[36];
    }
    let t16;
    if ($[37] !== filters || $[38] !== t15) {
        t16 = t15.filter({
            "WidgetEditor[(anonymous)()]": (k)=>filters[k] !== "" && filters[k] !== null && filters[k] !== undefined
        }["WidgetEditor[(anonymous)()]"]);
        $[37] = filters;
        $[38] = t15;
        $[39] = t16;
    } else {
        t16 = $[39];
    }
    const activeFilters = t16;
    let t17;
    if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = ({
            "WidgetEditor[setFilter]": (key_0, value_0)=>{
                setFilters({
                    "WidgetEditor[setFilter > setFilters()]": (prev_3)=>{
                        if (value_0 === "" || value_0 === null || value_0 === undefined) {
                            const next = {
                                ...prev_3
                            };
                            delete next[key_0];
                            return next;
                        }
                        return {
                            ...prev_3,
                            [key_0]: value_0
                        };
                    }
                }["WidgetEditor[setFilter > setFilters()]"]);
            }
        })["WidgetEditor[setFilter]"];
        $[40] = t17;
    } else {
        t17 = $[40];
    }
    const setFilter = t17;
    let t18;
    if ($[41] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = ({
            "WidgetEditor[removeFilter]": (key_1)=>{
                setFilters({
                    "WidgetEditor[removeFilter > setFilters()]": (prev_4)=>{
                        const next_0 = {
                            ...prev_4
                        };
                        delete next_0[key_1];
                        return next_0;
                    }
                }["WidgetEditor[removeFilter > setFilters()]"]);
            }
        })["WidgetEditor[removeFilter]"];
        $[41] = t18;
    } else {
        t18 = $[41];
    }
    const removeFilter = t18;
    let t19;
    let t20;
    let t21;
    let t22;
    let t23;
    let t24;
    let t25;
    let t26;
    let t27;
    let t28;
    let t29;
    let t30;
    let t31;
    if ($[42] !== activeFilters || $[43] !== activeTab || $[44] !== addColumn || $[45] !== addFilterKey || $[46] !== chartConfig || $[47] !== colCategory || $[48] !== colSearch || $[49] !== columns || $[50] !== filterCategory || $[51] !== filters || $[52] !== groupColumn || $[53] !== limit || $[54] !== moveColumn || $[55] !== onClose || $[56] !== sortColumn || $[57] !== sortDirection || $[58] !== title || $[59] !== widgetType) {
        let t32;
        if ($[73] !== colCategory || $[74] !== colSearch) {
            t32 = ({
                "WidgetEditor[COLUMN_CATALOGUE.filter()]": (c_2)=>{
                    const matchCat = colCategory === "All" || c_2.category === colCategory;
                    const matchSearch = !colSearch || c_2.label.toLowerCase().includes(colSearch.toLowerCase()) || c_2.id.includes(colSearch.toLowerCase());
                    return matchCat && matchSearch;
                }
            })["WidgetEditor[COLUMN_CATALOGUE.filter()]"];
            $[73] = colCategory;
            $[74] = colSearch;
            $[75] = t32;
        } else {
            t32 = $[75];
        }
        const visibleCols = COLUMN_CATALOGUE.filter(t32);
        let t33;
        if ($[76] !== filterCategory) {
            t33 = ({
                "WidgetEditor[FILTER_SPECS.filter()]": (f)=>filterCategory === "All" || f.category === filterCategory
            })["WidgetEditor[FILTER_SPECS.filter()]"];
            $[76] = filterCategory;
            $[77] = t33;
        } else {
            t33 = $[77];
        }
        const visibleFilters = FILTER_SPECS.filter(t33);
        let t34;
        if ($[78] === Symbol.for("react.memo_cache_sentinel")) {
            t34 = [
                "bar",
                "horizontal_bar",
                "line",
                "area"
            ];
            $[78] = t34;
        } else {
            t34 = $[78];
        }
        const needsAxes = t34.includes(widgetType);
        let t35;
        if ($[79] === Symbol.for("react.memo_cache_sentinel")) {
            t35 = [
                "bar",
                "horizontal_bar",
                "pie",
                "heatmap"
            ];
            $[79] = t35;
        } else {
            t35 = $[79];
        }
        const needsColorField = t35.includes(widgetType);
        const needsDonut = widgetType === "pie";
        const numericColumns = columns.filter(_WidgetEditorColumnsFilter);
        let t36;
        if ($[80] !== columns.length) {
            t36 = {
                id: "columns",
                label: "Columns",
                badge: columns.length
            };
            $[80] = columns.length;
            $[81] = t36;
        } else {
            t36 = $[81];
        }
        let t37;
        if ($[82] !== activeFilters.length) {
            t37 = {
                id: "filters",
                label: "Filters",
                badge: activeFilters.length
            };
            $[82] = activeFilters.length;
            $[83] = t37;
        } else {
            t37 = $[83];
        }
        let t38;
        if ($[84] === Symbol.for("react.memo_cache_sentinel")) {
            t38 = {
                id: "sort",
                label: "Sort & Limit"
            };
            $[84] = t38;
        } else {
            t38 = $[84];
        }
        let t39;
        if ($[85] === Symbol.for("react.memo_cache_sentinel")) {
            t39 = {
                id: "chart",
                label: "Chart Settings"
            };
            $[85] = t39;
        } else {
            t39 = $[85];
        }
        let t40;
        if ($[86] === Symbol.for("react.memo_cache_sentinel")) {
            t40 = {
                id: "preview",
                label: "Preview"
            };
            $[86] = t40;
        } else {
            t40 = $[86];
        }
        let t41;
        if ($[87] !== t36 || $[88] !== t37) {
            t41 = [
                t36,
                t37,
                t38,
                t39,
                t40
            ];
            $[87] = t36;
            $[88] = t37;
            $[89] = t41;
        } else {
            t41 = $[89];
        }
        const TABS = t41;
        t29 = "fixed inset-0 z-50 flex items-center justify-center p-3";
        if ($[90] === Symbol.for("react.memo_cache_sentinel")) {
            t30 = {
                background: "rgba(0,0,0,0.65)"
            };
            $[90] = t30;
        } else {
            t30 = $[90];
        }
        t31 = onClose;
        t24 = "flex flex-col rounded-xl shadow-2xl w-full max-w-4xl";
        if ($[91] === Symbol.for("react.memo_cache_sentinel")) {
            t25 = {
                background: "var(--surface)",
                border: "1px solid var(--border)",
                maxHeight: "calc(100vh - 48px)",
                minHeight: 500
            };
            $[91] = t25;
        } else {
            t25 = $[91];
        }
        t26 = _WidgetEditorDivOnClick;
        let t42;
        if ($[92] === Symbol.for("react.memo_cache_sentinel")) {
            t42 = {
                borderBottom: "1px solid var(--border)"
            };
            $[92] = t42;
        } else {
            t42 = $[92];
        }
        let t43;
        if ($[93] === Symbol.for("react.memo_cache_sentinel")) {
            t43 = ({
                "WidgetEditor[<input>.onChange]": (e_0)=>setTitle(e_0.target.value)
            })["WidgetEditor[<input>.onChange]"];
            $[93] = t43;
        } else {
            t43 = $[93];
        }
        let t44;
        if ($[94] === Symbol.for("react.memo_cache_sentinel")) {
            t44 = inputStyle({
                maxWidth: 280
            });
            $[94] = t44;
        } else {
            t44 = $[94];
        }
        let t45;
        if ($[95] !== title) {
            t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: title,
                onChange: t43,
                className: "flex-1 min-w-0 px-2 py-1 rounded text-sm font-semibold",
                style: t44,
                placeholder: "Widget title..."
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                lineNumber: 1051,
                columnNumber: 13
            }, this);
            $[95] = title;
            $[96] = t45;
        } else {
            t45 = $[96];
        }
        let t46;
        if ($[97] === Symbol.for("react.memo_cache_sentinel")) {
            t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px]",
                style: {
                    color: "var(--text-secondary)"
                },
                children: "—"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                lineNumber: 1059,
                columnNumber: 13
            }, this);
            $[97] = t46;
        } else {
            t46 = $[97];
        }
        let t47;
        if ($[98] !== widgetType) {
            t47 = WIDGET_TYPES.map({
                "WidgetEditor[WIDGET_TYPES.map()]": (wt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        title: wt.label,
                        onClick: {
                            "WidgetEditor[WIDGET_TYPES.map() > <button>.onClick]": ()=>setWidgetType(wt.value)
                        }["WidgetEditor[WIDGET_TYPES.map() > <button>.onClick]"],
                        className: "px-2 py-1 rounded text-[11px] transition-colors",
                        style: {
                            background: widgetType === wt.value ? "var(--accent-brand)" : "var(--bg-hover)",
                            color: widgetType === wt.value ? "#fff" : "var(--text-secondary)",
                            border: `1px solid ${widgetType === wt.value ? "var(--accent-brand)" : "var(--border)"}`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mr-1",
                                children: wt.icon
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                lineNumber: 1075,
                                columnNumber: 12
                            }, this),
                            wt.label
                        ]
                    }, wt.value, true, {
                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                        lineNumber: 1069,
                        columnNumber: 51
                    }, this)
            }["WidgetEditor[WIDGET_TYPES.map()]"]);
            $[98] = widgetType;
            $[99] = t47;
        } else {
            t47 = $[99];
        }
        let t48;
        if ($[100] !== t47) {
            t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1 flex-wrap",
                children: t47
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                lineNumber: 1084,
                columnNumber: 13
            }, this);
            $[100] = t47;
            $[101] = t48;
        } else {
            t48 = $[101];
        }
        let t49;
        if ($[102] !== t45 || $[103] !== t48) {
            t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-center gap-2 min-w-0",
                children: [
                    t45,
                    t46,
                    t48
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                lineNumber: 1092,
                columnNumber: 13
            }, this);
            $[102] = t45;
            $[103] = t48;
            $[104] = t49;
        } else {
            t49 = $[104];
        }
        let t50;
        if ($[105] === Symbol.for("react.memo_cache_sentinel")) {
            t50 = {
                color: "var(--text-secondary)"
            };
            $[105] = t50;
        } else {
            t50 = $[105];
        }
        let t51;
        if ($[106] === Symbol.for("react.memo_cache_sentinel")) {
            t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-4 h-4",
                viewBox: "0 0 16 16",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M3 3l10 10M13 3L3 13",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1110,
                    columnNumber: 110
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                lineNumber: 1110,
                columnNumber: 13
            }, this);
            $[106] = t51;
        } else {
            t51 = $[106];
        }
        let t52;
        if ($[107] !== onClose) {
            t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: "p-1.5 rounded transition-colors flex-shrink-0",
                style: t50,
                onMouseEnter: _WidgetEditorButtonOnMouseEnter,
                onMouseLeave: _WidgetEditorButtonOnMouseLeave,
                children: t51
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                lineNumber: 1117,
                columnNumber: 13
            }, this);
            $[107] = onClose;
            $[108] = t52;
        } else {
            t52 = $[108];
        }
        if ($[109] !== t49 || $[110] !== t52) {
            t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 px-4 py-3 flex-shrink-0",
                style: t42,
                children: [
                    t49,
                    t52
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                lineNumber: 1124,
                columnNumber: 13
            }, this);
            $[109] = t49;
            $[110] = t52;
            $[111] = t27;
        } else {
            t27 = $[111];
        }
        let t53;
        if ($[112] === Symbol.for("react.memo_cache_sentinel")) {
            t53 = {
                borderBottom: "1px solid var(--border)"
            };
            $[112] = t53;
        } else {
            t53 = $[112];
        }
        if ($[113] !== TABS || $[114] !== activeTab) {
            t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1 px-4 pt-2 flex-shrink-0",
                style: t53,
                children: TABS.map({
                    "WidgetEditor[TABS.map()]": (tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: {
                                "WidgetEditor[TABS.map() > <button>.onClick]": ()=>setActiveTab(tab.id)
                            }["WidgetEditor[TABS.map() > <button>.onClick]"],
                            className: "px-3 py-1.5 text-xs rounded-t transition-colors flex items-center gap-1.5",
                            style: {
                                color: activeTab === tab.id ? "var(--accent-brand)" : "var(--text-secondary)",
                                borderBottom: activeTab === tab.id ? "2px solid var(--accent-brand)" : "2px solid transparent",
                                marginBottom: -1
                            },
                            children: [
                                tab.label,
                                "badge" in tab && (tab.badge ?? 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-1 rounded-full text-[10px]",
                                    style: {
                                        background: "var(--accent-brand)",
                                        color: "#fff"
                                    },
                                    children: tab.badge
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1148,
                                    columnNumber: 68
                                }, this)
                            ]
                        }, tab.id, true, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1142,
                            columnNumber: 46
                        }, this)
                }["WidgetEditor[TABS.map()]"])
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                lineNumber: 1141,
                columnNumber: 13
            }, this);
            $[113] = TABS;
            $[114] = activeTab;
            $[115] = t28;
        } else {
            t28 = $[115];
        }
        t19 = "flex-1 min-h-0 overflow-y-auto";
        t20 = activeTab === "columns" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full min-h-0",
            style: {
                minHeight: 360
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col w-64 flex-shrink-0",
                    style: {
                        borderRight: "1px solid var(--border)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 flex-shrink-0 space-y-2",
                            style: {
                                borderBottom: "1px solid var(--border)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: colSearch,
                                    onChange: {
                                        "WidgetEditor[<input>.onChange]": (e_3)=>setColSearch(e_3.target.value)
                                    }["WidgetEditor[<input>.onChange]"],
                                    placeholder: "Search columns\u2026",
                                    className: "w-full px-2 py-1.5 rounded text-xs",
                                    style: inputStyle()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1166,
                                    columnNumber: 12
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-1",
                                    children: [
                                        "All",
                                        ...COLUMN_CATEGORIES
                                    ].map({
                                        "WidgetEditor[(anonymous)()]": (cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: {
                                                    "WidgetEditor[(anonymous)() > <button>.onClick]": ()=>setColCategory(cat)
                                                }["WidgetEditor[(anonymous)() > <button>.onClick]"],
                                                className: "px-2 py-0.5 rounded text-[10px] transition-colors",
                                                style: {
                                                    background: colCategory === cat ? "var(--accent-brand)" : "var(--bg-hover)",
                                                    color: colCategory === cat ? "#fff" : "var(--text-secondary)",
                                                    border: "1px solid var(--border)"
                                                },
                                                children: cat
                                            }, cat, false, {
                                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                                lineNumber: 1169,
                                                columnNumber: 53
                                            }, this)
                                    }["WidgetEditor[(anonymous)()]"])
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1168,
                                    columnNumber: 155
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1164,
                            columnNumber: 10
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-2 space-y-0.5",
                            children: visibleCols.map({
                                "WidgetEditor[visibleCols.map()]": (col_0)=>{
                                    const added = columns.some({
                                        "WidgetEditor[visibleCols.map() > columns.some()]": (c_4)=>c_4.id === col_0.id
                                    }["WidgetEditor[visibleCols.map() > columns.some()]"]);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: {
                                            "WidgetEditor[visibleCols.map() > <button>.onClick]": ()=>added ? removeColumn(col_0.id) : addColumn(col_0)
                                        }["WidgetEditor[visibleCols.map() > <button>.onClick]"],
                                        className: "w-full text-left px-2 py-1.5 rounded text-xs flex items-center gap-2 transition-colors",
                                        style: {
                                            color: added ? "var(--accent-brand)" : "var(--text-primary)"
                                        },
                                        onMouseEnter: {
                                            "WidgetEditor[visibleCols.map() > <button>.onMouseEnter]": (e_4)=>{
                                                if (!added) {
                                                    e_4.currentTarget.style.background = "var(--bg-hover)";
                                                }
                                            }
                                        }["WidgetEditor[visibleCols.map() > <button>.onMouseEnter]"],
                                        onMouseLeave: _WidgetEditorVisibleColsMapButtonOnMouseLeave,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-4 h-4 rounded flex items-center justify-center text-[10px] flex-shrink-0",
                                                style: {
                                                    background: added ? "var(--accent-brand)" : "var(--border)",
                                                    color: added ? "#fff" : "var(--text-secondary)"
                                                },
                                                children: added ? "\u2713" : "+"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                                lineNumber: 1191,
                                                columnNumber: 138
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "truncate flex-1",
                                                children: col_0.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                                lineNumber: 1194,
                                                columnNumber: 51
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] opacity-50",
                                                children: col_0.format
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                                lineNumber: 1194,
                                                columnNumber: 105
                                            }, this)
                                        ]
                                    }, col_0.id, true, {
                                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                        lineNumber: 1181,
                                        columnNumber: 22
                                    }, this);
                                }
                            }["WidgetEditor[visibleCols.map()]"])
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1176,
                            columnNumber: 59
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1162,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-2 flex-shrink-0",
                            style: {
                                borderBottom: "1px solid var(--border)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium",
                                style: {
                                    color: "var(--text-secondary)"
                                },
                                children: "Selected columns — drag to reorder"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                lineNumber: 1198,
                                columnNumber: 12
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1196,
                            columnNumber: 107
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-3 space-y-1.5",
                            children: [
                                columns.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center h-full",
                                    style: {
                                        color: "var(--text-secondary)",
                                        fontSize: 12
                                    },
                                    children: "Select columns from the left panel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1200,
                                    columnNumber: 142
                                }, this),
                                columns.map({
                                    "WidgetEditor[columns.map()]": (col_1, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectedColumnRow, {
                                            col: col_1,
                                            idx: idx,
                                            total: columns.length,
                                            onRemove: removeColumn,
                                            onMove: moveColumn,
                                            onUpdate: updateColumnProp
                                        }, col_1.id, false, {
                                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                            lineNumber: 1204,
                                            columnNumber: 60
                                        }, this)
                                }["WidgetEditor[columns.map()]"])
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1200,
                            columnNumber: 61
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1196,
                    columnNumber: 61
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1160,
            columnNumber: 38
        }, this);
        t21 = activeTab === "filters" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 flex-wrap",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs",
                            style: {
                                color: "var(--text-secondary)"
                            },
                            children: "Category:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1206,
                            columnNumber: 120
                        }, this),
                        [
                            "All",
                            ...FILTER_CATEGORIES
                        ].map({
                            "WidgetEditor[(anonymous)()]": (cat_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: {
                                        "WidgetEditor[(anonymous)() > <button>.onClick]": ()=>setFilterCategory(cat_0)
                                    }["WidgetEditor[(anonymous)() > <button>.onClick]"],
                                    className: "px-2 py-0.5 rounded text-[10px] transition-colors",
                                    style: {
                                        background: filterCategory === cat_0 ? "var(--accent-brand)" : "var(--bg-hover)",
                                        color: filterCategory === cat_0 ? "#fff" : "var(--text-secondary)",
                                        border: "1px solid var(--border)"
                                    },
                                    children: cat_0
                                }, cat_0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1209,
                                    columnNumber: 51
                                }, this)
                        }["WidgetEditor[(anonymous)()]"]),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ml-auto flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: addFilterKey,
                                    onChange: {
                                        "WidgetEditor[<select>.onChange]": (e_6)=>setAddFilterKey(e_6.target.value)
                                    }["WidgetEditor[<select>.onChange]"],
                                    className: "px-2 py-1 rounded text-xs",
                                    style: inputStyle(),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "+ Add filter…"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                            lineNumber: 1218,
                                            columnNumber: 108
                                        }, this),
                                        visibleFilters.map(_WidgetEditorVisibleFiltersMap)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1216,
                                    columnNumber: 92
                                }, this),
                                addFilterKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: {
                                        "WidgetEditor[<button>.onClick]": ()=>{
                                            setFilter(addFilterKey, "");
                                            setAddFilterKey("");
                                        }
                                    }["WidgetEditor[<button>.onClick]"],
                                    className: "px-2 py-1 rounded text-xs transition-colors",
                                    style: {
                                        background: "var(--accent-brand)",
                                        color: "#fff"
                                    },
                                    children: "Add"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1218,
                                    columnNumber: 225
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1216,
                            columnNumber: 43
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1206,
                    columnNumber: 69
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        activeFilters.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs py-6 text-center",
                            style: {
                                color: "var(--text-secondary)"
                            },
                            children: "No filters active — use the dropdown above to add filters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1226,
                            columnNumber: 97
                        }, this),
                        activeFilters.map({
                            "WidgetEditor[activeFilters.map()]": (key_2)=>{
                                const spec = FILTER_SPECS.find({
                                    "WidgetEditor[activeFilters.map() > FILTER_SPECS.find()]": (f_1)=>f_1.key === key_2
                                }["WidgetEditor[activeFilters.map() > FILTER_SPECS.find()]"]);
                                if (!spec) {
                                    return null;
                                }
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterRow, {
                                    spec: spec,
                                    value: filters[key_2],
                                    onChange: {
                                        "WidgetEditor[activeFilters.map() > <FilterRow>.onChange]": (v)=>setFilter(key_2, v)
                                    }["WidgetEditor[activeFilters.map() > <FilterRow>.onChange]"],
                                    onRemove: {
                                        "WidgetEditor[activeFilters.map() > <FilterRow>.onRemove]": ()=>removeFilter(key_2)
                                    }["WidgetEditor[activeFilters.map() > <FilterRow>.onRemove]"]
                                }, key_2, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1236,
                                    columnNumber: 20
                                }, this);
                            }
                        }["WidgetEditor[activeFilters.map()]"])
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1226,
                    columnNumber: 39
                }, this),
                activeFilters.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] mb-2",
                            style: {
                                color: "var(--text-secondary)"
                            },
                            children: "Common filters:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1242,
                            columnNumber: 91
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                                {
                                    key: "peTtmMax",
                                    label: "P/E Max"
                                },
                                {
                                    key: "roeMin",
                                    label: "ROE Min"
                                },
                                {
                                    key: "roceMin",
                                    label: "ROCE Min"
                                },
                                {
                                    key: "debtEquityMax",
                                    label: "D/E Max"
                                },
                                {
                                    key: "rsi14Min",
                                    label: "RSI Min"
                                },
                                {
                                    key: "rsi14Max",
                                    label: "RSI Max"
                                },
                                {
                                    key: "marketCapCrMin",
                                    label: "Mkt Cap Min"
                                },
                                {
                                    key: "dividendYieldMin",
                                    label: "Div Yield Min"
                                }
                            ].map({
                                "WidgetEditor[(anonymous)()]": (f_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: {
                                            "WidgetEditor[(anonymous)() > <button>.onClick]": ()=>setFilter(f_2.key, "")
                                        }["WidgetEditor[(anonymous)() > <button>.onClick]"],
                                        className: "px-2 py-1 rounded text-[11px] transition-colors",
                                        style: {
                                            background: "var(--bg-hover)",
                                            color: "var(--text-secondary)",
                                            border: "1px solid var(--border)"
                                        },
                                        onMouseEnter: _WidgetEditorAnonymousButtonOnMouseEnter,
                                        onMouseLeave: _WidgetEditorAnonymousButtonOnMouseLeave,
                                        children: [
                                            "+ ",
                                            f_2.label
                                        ]
                                    }, f_2.key, true, {
                                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                        lineNumber: 1269,
                                        columnNumber: 51
                                    }, this)
                            }["WidgetEditor[(anonymous)()]"])
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1244,
                            columnNumber: 31
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1242,
                    columnNumber: 86
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1206,
            columnNumber: 38
        }, this);
        if ($[116] !== activeTab || $[117] !== columns || $[118] !== groupColumn || $[119] !== limit || $[120] !== sortColumn || $[121] !== sortDirection) {
            t22 = activeTab === "sort" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle(),
                                        children: "Sort by"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                        lineNumber: 1278,
                                        columnNumber: 113
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: sortColumn,
                                        onChange: {
                                            "WidgetEditor[<select>.onChange]": (e_9)=>setSortColumn(e_9.target.value)
                                        }["WidgetEditor[<select>.onChange]"],
                                        className: "w-full px-2 py-1.5 rounded text-xs",
                                        style: inputStyle(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "— None —"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                                lineNumber: 1280,
                                                columnNumber: 119
                                            }, this),
                                            columns.map(_WidgetEditorColumnsMap)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                        lineNumber: 1278,
                                        columnNumber: 156
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                lineNumber: 1278,
                                columnNumber: 108
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle(),
                                        children: "Direction"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                        lineNumber: 1280,
                                        columnNumber: 211
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            "desc",
                                            "asc"
                                        ].map({
                                            "WidgetEditor[(anonymous)()]": (dir)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: {
                                                        "WidgetEditor[(anonymous)() > <button>.onClick]": ()=>setSortDirection(dir)
                                                    }["WidgetEditor[(anonymous)() > <button>.onClick]"],
                                                    className: "flex-1 py-1.5 rounded text-xs transition-colors",
                                                    style: {
                                                        background: sortDirection === dir ? "var(--accent-brand)" : "var(--bg-hover)",
                                                        color: sortDirection === dir ? "#fff" : "var(--text-secondary)",
                                                        border: `1px solid ${sortDirection === dir ? "var(--accent-brand)" : "var(--border)"}`
                                                    },
                                                    children: dir === "desc" ? "\u2193 Descending" : "\u2191 Ascending"
                                                }, dir, false, {
                                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                                    lineNumber: 1281,
                                                    columnNumber: 55
                                                }, this)
                                        }["WidgetEditor[(anonymous)()]"])
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                        lineNumber: 1280,
                                        columnNumber: 256
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                lineNumber: 1280,
                                columnNumber: 206
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                        lineNumber: 1278,
                        columnNumber: 68
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle(),
                                        children: "Row limit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                        lineNumber: 1288,
                                        columnNumber: 112
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 flex-wrap",
                                        children: [
                                            [
                                                10,
                                                20,
                                                50,
                                                100,
                                                200,
                                                500
                                            ].map({
                                                "WidgetEditor[(anonymous)()]": (n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: {
                                                            "WidgetEditor[(anonymous)() > <button>.onClick]": ()=>setLimit(n)
                                                        }["WidgetEditor[(anonymous)() > <button>.onClick]"],
                                                        className: "px-3 py-1 rounded text-xs transition-colors",
                                                        style: {
                                                            background: limit === n ? "var(--accent-brand)" : "var(--bg-hover)",
                                                            color: limit === n ? "#fff" : "var(--text-secondary)",
                                                            border: `1px solid ${limit === n ? "var(--accent-brand)" : "var(--border)"}`
                                                        },
                                                        children: n
                                                    }, n, false, {
                                                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                                        lineNumber: 1289,
                                                        columnNumber: 53
                                                    }, this)
                                            }["WidgetEditor[(anonymous)()]"]),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: limit,
                                                onChange: {
                                                    "WidgetEditor[<input>.onChange]": (e_10)=>setLimit(Math.max(1, Math.min(500, Number(e_10.target.value))))
                                                }["WidgetEditor[<input>.onChange]"],
                                                className: "w-16 px-2 py-1 rounded text-xs",
                                                style: inputStyle(),
                                                min: 1,
                                                max: 500
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                                lineNumber: 1296,
                                                columnNumber: 49
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                        lineNumber: 1288,
                                        columnNumber: 157
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                lineNumber: 1288,
                                columnNumber: 107
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle(),
                                        children: "Group by"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                        lineNumber: 1298,
                                        columnNumber: 153
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: groupColumn,
                                        onChange: {
                                            "WidgetEditor[<select>.onChange]": (e_11)=>setGroupColumn(e_11.target.value)
                                        }["WidgetEditor[<select>.onChange]"],
                                        className: "w-full px-2 py-1.5 rounded text-xs",
                                        style: inputStyle(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "— No grouping —"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                                lineNumber: 1300,
                                                columnNumber: 119
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "sector",
                                                children: "Sector"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                                lineNumber: 1300,
                                                columnNumber: 160
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "industry_group",
                                                children: "Industry Group"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                                lineNumber: 1300,
                                                columnNumber: 198
                                            }, this),
                                            columns.filter(_WidgetEditorColumnsFilter2).map(_WidgetEditorAnonymous)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                        lineNumber: 1298,
                                        columnNumber: 197
                                    }, this),
                                    groupColumn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] mt-1",
                                        style: {
                                            color: "var(--text-secondary)"
                                        },
                                        children: "When grouping, numeric columns will use their aggregation setting."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                        lineNumber: 1300,
                                        columnNumber: 350
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                lineNumber: 1298,
                                columnNumber: 148
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                        lineNumber: 1288,
                        columnNumber: 67
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                lineNumber: 1278,
                columnNumber: 37
            }, this);
            $[116] = activeTab;
            $[117] = columns;
            $[118] = groupColumn;
            $[119] = limit;
            $[120] = sortColumn;
            $[121] = sortDirection;
            $[122] = t22;
        } else {
            t22 = $[122];
        }
        t23 = activeTab === "chart" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 space-y-5",
            children: [
                needsAxes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: labelStyle(),
                                    children: "X Axis / Label column"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1313,
                                    columnNumber: 126
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: chartConfig.xAxis ?? "",
                                    onChange: {
                                        "WidgetEditor[<select>.onChange]": (e_12)=>setChartConfig({
                                                "WidgetEditor[<select>.onChange > setChartConfig()]": (prev_5)=>({
                                                        ...prev_5,
                                                        xAxis: e_12.target.value || undefined
                                                    })
                                            }["WidgetEditor[<select>.onChange > setChartConfig()]"])
                                    }["WidgetEditor[<select>.onChange]"],
                                    className: "w-full px-2 py-1.5 rounded text-xs",
                                    style: inputStyle(),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "— Auto —"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                            lineNumber: 1320,
                                            columnNumber: 117
                                        }, this),
                                        columns.map(_WidgetEditorColumnsMap2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1313,
                                    columnNumber: 183
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1313,
                            columnNumber: 121
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: labelStyle(),
                                    children: "Y Axis / Value column"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 210
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: chartConfig.yAxis ?? "",
                                    onChange: {
                                        "WidgetEditor[<select>.onChange]": (e_13)=>setChartConfig({
                                                "WidgetEditor[<select>.onChange > setChartConfig()]": (prev_6)=>({
                                                        ...prev_6,
                                                        yAxis: e_13.target.value || undefined
                                                    })
                                            }["WidgetEditor[<select>.onChange > setChartConfig()]"])
                                    }["WidgetEditor[<select>.onChange]"],
                                    className: "w-full px-2 py-1.5 rounded text-xs",
                                    style: inputStyle(),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "— Auto —"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                            lineNumber: 1327,
                                            columnNumber: 117
                                        }, this),
                                        numericColumns.map(_WidgetEditorNumericColumnsMap)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 267
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1320,
                            columnNumber: 205
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1313,
                    columnNumber: 81
                }, this),
                needsColorField && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: labelStyle(),
                                    children: "Color field (used for bar color gradient)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1327,
                                    columnNumber: 290
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: chartConfig.colorField ?? "",
                                    onChange: {
                                        "WidgetEditor[<select>.onChange]": (e_14)=>setChartConfig({
                                                "WidgetEditor[<select>.onChange > setChartConfig()]": (prev_7)=>({
                                                        ...prev_7,
                                                        colorField: e_14.target.value || undefined
                                                    })
                                            }["WidgetEditor[<select>.onChange > setChartConfig()]"])
                                    }["WidgetEditor[<select>.onChange]"],
                                    className: "w-full px-2 py-1.5 rounded text-xs",
                                    style: inputStyle(),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "— None —"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                            lineNumber: 1334,
                                            columnNumber: 117
                                        }, this),
                                        columns.map(_WidgetEditorColumnsMap3)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                    lineNumber: 1327,
                                    columnNumber: 367
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1327,
                            columnNumber: 285
                        }, this),
                        needsDonut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 mt-5",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toggle, {
                                value: chartConfig.donut ?? false,
                                onChange: {
                                    "WidgetEditor[<Toggle>.onChange]": (v_0)=>setChartConfig({
                                            "WidgetEditor[<Toggle>.onChange > setChartConfig()]": (prev_8)=>({
                                                    ...prev_8,
                                                    donut: v_0
                                                })
                                        }["WidgetEditor[<Toggle>.onChange > setChartConfig()]"])
                                }["WidgetEditor[<Toggle>.onChange]"],
                                label: "Donut style"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                                lineNumber: 1334,
                                columnNumber: 266
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1334,
                            columnNumber: 220
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1327,
                    columnNumber: 245
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toggle, {
                            value: chartConfig.showLegend ?? true,
                            onChange: {
                                "WidgetEditor[<Toggle>.onChange]": (v_1)=>setChartConfig({
                                        "WidgetEditor[<Toggle>.onChange > setChartConfig()]": (prev_9)=>({
                                                ...prev_9,
                                                showLegend: v_1
                                            })
                                    }["WidgetEditor[<Toggle>.onChange > setChartConfig()]"])
                            }["WidgetEditor[<Toggle>.onChange]"],
                            label: "Show legend"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1341,
                            columnNumber: 123
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toggle, {
                            value: chartConfig.showLabels ?? false,
                            onChange: {
                                "WidgetEditor[<Toggle>.onChange]": (v_2)=>setChartConfig({
                                        "WidgetEditor[<Toggle>.onChange > setChartConfig()]": (prev_10)=>({
                                                ...prev_10,
                                                showLabels: v_2
                                            })
                                    }["WidgetEditor[<Toggle>.onChange > setChartConfig()]"])
                            }["WidgetEditor[<Toggle>.onChange]"],
                            label: "Show value labels"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1348,
                            columnNumber: 69
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1341,
                    columnNumber: 85
                }, this),
                !needsAxes && !needsColorField && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs",
                    style: {
                        color: "var(--text-secondary)"
                    },
                    children: "No chart-specific settings for this widget type."
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1355,
                    columnNumber: 116
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1313,
            columnNumber: 36
        }, this);
        $[42] = activeFilters;
        $[43] = activeTab;
        $[44] = addColumn;
        $[45] = addFilterKey;
        $[46] = chartConfig;
        $[47] = colCategory;
        $[48] = colSearch;
        $[49] = columns;
        $[50] = filterCategory;
        $[51] = filters;
        $[52] = groupColumn;
        $[53] = limit;
        $[54] = moveColumn;
        $[55] = onClose;
        $[56] = sortColumn;
        $[57] = sortDirection;
        $[58] = title;
        $[59] = widgetType;
        $[60] = t19;
        $[61] = t20;
        $[62] = t21;
        $[63] = t22;
        $[64] = t23;
        $[65] = t24;
        $[66] = t25;
        $[67] = t26;
        $[68] = t27;
        $[69] = t28;
        $[70] = t29;
        $[71] = t30;
        $[72] = t31;
    } else {
        t19 = $[60];
        t20 = $[61];
        t21 = $[62];
        t22 = $[63];
        t23 = $[64];
        t24 = $[65];
        t25 = $[66];
        t26 = $[67];
        t27 = $[68];
        t28 = $[69];
        t29 = $[70];
        t30 = $[71];
        t31 = $[72];
    }
    let t32;
    if ($[123] !== activeTab || $[124] !== previewConfig || $[125] !== previewData || $[126] !== previewLoading || $[127] !== widgetType) {
        t32 = activeTab === "preview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-3 flex flex-col gap-2",
            style: {
                minHeight: 360
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs",
                        style: {
                            color: "var(--text-secondary)"
                        },
                        children: [
                            "Live preview — ",
                            previewData ? `${previewData.total} rows` : previewLoading ? "loading\u2026" : "no data"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                        lineNumber: 1408,
                        columnNumber: 59
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1408,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 rounded-lg overflow-hidden",
                    style: {
                        background: "var(--bg-hover)",
                        border: "1px solid var(--border)",
                        minHeight: 300
                    },
                    children: [
                        previewLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center h-full animate-pulse",
                            style: {
                                color: "var(--text-secondary)",
                                fontSize: 12
                            },
                            children: "Loading preview…"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1414,
                            columnNumber: 29
                        }, this),
                        !previewLoading && previewData && previewData.rows.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetRenderer"], {
                            widgetType: widgetType,
                            rows: previewData.rows,
                            columns: previewData.columns,
                            config: previewConfig
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1417,
                            columnNumber: 101
                        }, this),
                        !previewLoading && previewData && previewData.rows.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center h-full",
                            style: {
                                color: "var(--text-secondary)",
                                fontSize: 12
                            },
                            children: "No rows returned — adjust filters or columns"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1417,
                            columnNumber: 289
                        }, this),
                        !previewLoading && !previewData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center h-full",
                            style: {
                                color: "var(--text-secondary)",
                                fontSize: 12
                            },
                            children: "Configure columns then click Preview"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                            lineNumber: 1420,
                            columnNumber: 99
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1410,
                    columnNumber: 130
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1406,
            columnNumber: 38
        }, this);
        $[123] = activeTab;
        $[124] = previewConfig;
        $[125] = previewData;
        $[126] = previewLoading;
        $[127] = widgetType;
        $[128] = t32;
    } else {
        t32 = $[128];
    }
    let t33;
    if ($[129] !== t19 || $[130] !== t20 || $[131] !== t21 || $[132] !== t22 || $[133] !== t23 || $[134] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t19,
            children: [
                t20,
                t21,
                t22,
                t23,
                t32
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1435,
            columnNumber: 11
        }, this);
        $[129] = t19;
        $[130] = t20;
        $[131] = t21;
        $[132] = t22;
        $[133] = t23;
        $[134] = t32;
        $[135] = t33;
    } else {
        t33 = $[135];
    }
    let t34;
    if ($[136] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = {
            borderTop: "1px solid var(--border)"
        };
        $[136] = t34;
    } else {
        t34 = $[136];
    }
    let t35;
    if ($[137] === Symbol.for("react.memo_cache_sentinel")) {
        t35 = {
            color: "var(--text-secondary)"
        };
        $[137] = t35;
    } else {
        t35 = $[137];
    }
    const t36 = columns.length !== 1 ? "s" : "";
    const t37 = activeFilters.length !== 1 ? "s" : "";
    let t38;
    if ($[138] !== activeFilters.length || $[139] !== columns.length || $[140] !== limit || $[141] !== t36 || $[142] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs",
            style: t35,
            children: [
                columns.length,
                " col",
                t36,
                " · ",
                activeFilters.length,
                " filter",
                t37,
                " · limit ",
                limit
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1468,
            columnNumber: 11
        }, this);
        $[138] = activeFilters.length;
        $[139] = columns.length;
        $[140] = limit;
        $[141] = t36;
        $[142] = t37;
        $[143] = t38;
    } else {
        t38 = $[143];
    }
    let t39;
    if ($[144] === Symbol.for("react.memo_cache_sentinel")) {
        t39 = {
            color: "var(--text-secondary)"
        };
        $[144] = t39;
    } else {
        t39 = $[144];
    }
    let t40;
    if ($[145] !== onClose) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClose,
            className: "px-3 py-1.5 rounded text-xs transition-colors",
            style: t39,
            children: "Cancel"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1489,
            columnNumber: 11
        }, this);
        $[145] = onClose;
        $[146] = t40;
    } else {
        t40 = $[146];
    }
    let t41;
    if ($[147] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = ({
            "WidgetEditor[<button>.onClick]": ()=>setActiveTab("preview")
        })["WidgetEditor[<button>.onClick]"];
        $[147] = t41;
    } else {
        t41 = $[147];
    }
    let t42;
    if ($[148] === Symbol.for("react.memo_cache_sentinel")) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t41,
            className: "px-3 py-1.5 rounded text-xs transition-colors",
            style: {
                background: "var(--bg-hover)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)"
            },
            children: "Preview"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1506,
            columnNumber: 11
        }, this);
        $[148] = t42;
    } else {
        t42 = $[148];
    }
    const t43 = saving || columns.length === 0;
    let t44;
    if ($[149] === Symbol.for("react.memo_cache_sentinel")) {
        t44 = {
            background: "var(--accent-brand)",
            color: "#fff"
        };
        $[149] = t44;
    } else {
        t44 = $[149];
    }
    const t45 = saving ? "Saving\u2026" : "Save Widget";
    let t46;
    if ($[150] !== handleSave || $[151] !== t43 || $[152] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleSave,
            disabled: t43,
            className: "px-4 py-1.5 rounded text-xs font-medium transition-colors disabled:opacity-50",
            style: t44,
            children: t45
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1529,
            columnNumber: 11
        }, this);
        $[150] = handleSave;
        $[151] = t43;
        $[152] = t45;
        $[153] = t46;
    } else {
        t46 = $[153];
    }
    let t47;
    if ($[154] !== t40 || $[155] !== t46) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t40,
                t42,
                t46
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1539,
            columnNumber: 11
        }, this);
        $[154] = t40;
        $[155] = t46;
        $[156] = t47;
    } else {
        t47 = $[156];
    }
    let t48;
    if ($[157] !== t38 || $[158] !== t47) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between px-4 py-3 flex-shrink-0",
            style: t34,
            children: [
                t38,
                t47
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1548,
            columnNumber: 11
        }, this);
        $[157] = t38;
        $[158] = t47;
        $[159] = t48;
    } else {
        t48 = $[159];
    }
    let t49;
    if ($[160] !== t24 || $[161] !== t25 || $[162] !== t26 || $[163] !== t27 || $[164] !== t28 || $[165] !== t33 || $[166] !== t48) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t24,
            style: t25,
            onClick: t26,
            children: [
                t27,
                t28,
                t33,
                t48
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1557,
            columnNumber: 11
        }, this);
        $[160] = t24;
        $[161] = t25;
        $[162] = t26;
        $[163] = t27;
        $[164] = t28;
        $[165] = t33;
        $[166] = t48;
        $[167] = t49;
    } else {
        t49 = $[167];
    }
    let t50;
    if ($[168] !== t29 || $[169] !== t30 || $[170] !== t31 || $[171] !== t49) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t29,
            style: t30,
            onClick: t31,
            children: t49
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1571,
            columnNumber: 11
        }, this);
        $[168] = t29;
        $[169] = t30;
        $[170] = t31;
        $[171] = t49;
        $[172] = t50;
    } else {
        t50 = $[172];
    }
    return t50;
}
_s(WidgetEditor, "zAFdtV9+tmIax0kQm3TKbhs6jLI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWidgetData"]
    ];
});
_c = WidgetEditor;
// ── Sub-components ─────────────────────────────────────────────────────────────
function _WidgetEditorColumnsMap3(c_10) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: c_10.id,
        children: c_10.label
    }, c_10.id, false, {
        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
        lineNumber: 1585,
        columnNumber: 10
    }, this);
}
function _WidgetEditorNumericColumnsMap(c_9) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: c_9.id,
        children: c_9.label
    }, c_9.id, false, {
        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
        lineNumber: 1588,
        columnNumber: 10
    }, this);
}
function _WidgetEditorColumnsMap2(c_8) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: c_8.id,
        children: c_8.label
    }, c_8.id, false, {
        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
        lineNumber: 1591,
        columnNumber: 10
    }, this);
}
function _WidgetEditorAnonymous(c_7) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: c_7.id,
        children: c_7.label
    }, c_7.id, false, {
        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
        lineNumber: 1594,
        columnNumber: 10
    }, this);
}
function _WidgetEditorColumnsFilter2(c_6) {
    return c_6.format === "text";
}
function _WidgetEditorColumnsMap(c_5) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: c_5.id,
        children: c_5.label
    }, c_5.id, false, {
        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
        lineNumber: 1600,
        columnNumber: 10
    }, this);
}
function _WidgetEditorAnonymousButtonOnMouseLeave(e_8) {
    e_8.currentTarget.style.color = "var(--text-secondary)";
}
function _WidgetEditorAnonymousButtonOnMouseEnter(e_7) {
    e_7.currentTarget.style.color = "var(--accent-brand)";
}
function _WidgetEditorVisibleFiltersMap(f_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: f_0.key,
        children: f_0.label
    }, f_0.key, false, {
        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
        lineNumber: 1609,
        columnNumber: 10
    }, this);
}
function _WidgetEditorVisibleColsMapButtonOnMouseLeave(e_5) {
    e_5.currentTarget.style.background = "transparent";
}
function _WidgetEditorButtonOnMouseLeave(e_2) {
    e_2.currentTarget.style.color = "var(--text-secondary)";
    e_2.currentTarget.style.background = "transparent";
}
function _WidgetEditorButtonOnMouseEnter(e_1) {
    e_1.currentTarget.style.color = "var(--text-primary)";
    e_1.currentTarget.style.background = "var(--bg-hover)";
}
function _WidgetEditorDivOnClick(e) {
    return e.stopPropagation();
}
function _WidgetEditorColumnsFilter(c_3) {
    return c_3.format !== "text";
}
function SelectedColumnRow(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(67);
    if ($[0] !== "393f15b0b324ee09d60c84e7acfc645660da49f86f4254078c9380b600f5f9b0") {
        for(let $i = 0; $i < 67; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "393f15b0b324ee09d60c84e7acfc645660da49f86f4254078c9380b600f5f9b0";
    }
    const { col, idx, total, onRemove, onMove, onUpdate } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            background: "var(--bg-hover)",
            border: "1px solid var(--border)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== idx || $[3] !== onMove) {
        t2 = ({
            "SelectedColumnRow[<button>.onClick]": ()=>onMove(idx, idx - 1)
        })["SelectedColumnRow[<button>.onClick]"];
        $[2] = idx;
        $[3] = onMove;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const t3 = idx === 0;
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            color: "var(--text-secondary)"
        };
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] !== t2 || $[7] !== t3) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t2,
            disabled: t3,
            className: "text-[9px] leading-none disabled:opacity-20 transition-opacity",
            style: t4,
            children: "▲"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1677,
            columnNumber: 10
        }, this);
        $[6] = t2;
        $[7] = t3;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== idx || $[10] !== onMove) {
        t6 = ({
            "SelectedColumnRow[<button>.onClick]": ()=>onMove(idx, idx + 1)
        })["SelectedColumnRow[<button>.onClick]"];
        $[9] = idx;
        $[10] = onMove;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    const t7 = idx === total - 1;
    let t8;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            color: "var(--text-secondary)"
        };
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] !== t6 || $[14] !== t7) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t6,
            disabled: t7,
            className: "text-[9px] leading-none disabled:opacity-20 transition-opacity",
            style: t8,
            children: "▼"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1707,
            columnNumber: 10
        }, this);
        $[13] = t6;
        $[14] = t7;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] !== t5 || $[17] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-0.5 flex-shrink-0",
            children: [
                t5,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1716,
            columnNumber: 11
        }, this);
        $[16] = t5;
        $[17] = t9;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = {
            color: "var(--text-primary)"
        };
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    if ($[20] !== col.label) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs font-medium truncate flex-shrink-0 w-28",
            style: t11,
            children: col.label
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1734,
            columnNumber: 11
        }, this);
        $[20] = col.label;
        $[21] = t12;
    } else {
        t12 = $[21];
    }
    const t13 = col.aggregation ?? "none";
    let t14;
    if ($[22] !== col.id || $[23] !== onUpdate) {
        t14 = ({
            "SelectedColumnRow[<select>.onChange]": (e)=>onUpdate(col.id, "aggregation", e.target.value)
        })["SelectedColumnRow[<select>.onChange]"];
        $[22] = col.id;
        $[23] = onUpdate;
        $[24] = t14;
    } else {
        t14 = $[24];
    }
    let t15;
    let t16;
    let t17;
    let t18;
    let t19;
    let t20;
    let t21;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)"
        };
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "none",
            children: "none"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1765,
            columnNumber: 11
        }, this);
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "sum",
            children: "SUM"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1766,
            columnNumber: 11
        }, this);
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "avg",
            children: "AVG"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1767,
            columnNumber: 11
        }, this);
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "min",
            children: "MIN"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1768,
            columnNumber: 11
        }, this);
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "max",
            children: "MAX"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1769,
            columnNumber: 11
        }, this);
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "count",
            children: "COUNT"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1770,
            columnNumber: 11
        }, this);
        $[25] = t15;
        $[26] = t16;
        $[27] = t17;
        $[28] = t18;
        $[29] = t19;
        $[30] = t20;
        $[31] = t21;
    } else {
        t15 = $[25];
        t16 = $[26];
        t17 = $[27];
        t18 = $[28];
        t19 = $[29];
        t20 = $[30];
        t21 = $[31];
    }
    let t22;
    if ($[32] !== t13 || $[33] !== t14) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            value: t13,
            onChange: t14,
            className: "px-1.5 py-0.5 rounded text-[10px]",
            style: t15,
            children: [
                t16,
                t17,
                t18,
                t19,
                t20,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1789,
            columnNumber: 11
        }, this);
        $[32] = t13;
        $[33] = t14;
        $[34] = t22;
    } else {
        t22 = $[34];
    }
    const t23 = col.format ?? "number";
    let t24;
    if ($[35] !== col.id || $[36] !== onUpdate) {
        t24 = ({
            "SelectedColumnRow[<select>.onChange]": (e_0)=>onUpdate(col.id, "format", e_0.target.value)
        })["SelectedColumnRow[<select>.onChange]"];
        $[35] = col.id;
        $[36] = onUpdate;
        $[37] = t24;
    } else {
        t24 = $[37];
    }
    let t25;
    let t26;
    let t27;
    let t28;
    let t29;
    if ($[38] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)"
        };
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "text",
            children: "text"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1819,
            columnNumber: 11
        }, this);
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "number",
            children: "number"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1820,
            columnNumber: 11
        }, this);
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "percent",
            children: "percent"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1821,
            columnNumber: 11
        }, this);
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "currency",
            children: "currency"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1822,
            columnNumber: 11
        }, this);
        $[38] = t25;
        $[39] = t26;
        $[40] = t27;
        $[41] = t28;
        $[42] = t29;
    } else {
        t25 = $[38];
        t26 = $[39];
        t27 = $[40];
        t28 = $[41];
        t29 = $[42];
    }
    let t30;
    if ($[43] !== t23 || $[44] !== t24) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            value: t23,
            onChange: t24,
            className: "px-1.5 py-0.5 rounded text-[10px]",
            style: t25,
            children: [
                t26,
                t27,
                t28,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1837,
            columnNumber: 11
        }, this);
        $[43] = t23;
        $[44] = t24;
        $[45] = t30;
    } else {
        t30 = $[45];
    }
    let t31;
    if ($[46] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = {
            color: "var(--text-secondary)"
        };
        $[46] = t31;
    } else {
        t31 = $[46];
    }
    const t32 = col.colorCode ?? false;
    let t33;
    if ($[47] !== col.id || $[48] !== onUpdate) {
        t33 = ({
            "SelectedColumnRow[<input>.onChange]": (e_1)=>onUpdate(col.id, "colorCode", e_1.target.checked)
        })["SelectedColumnRow[<input>.onChange]"];
        $[47] = col.id;
        $[48] = onUpdate;
        $[49] = t33;
    } else {
        t33 = $[49];
    }
    let t34;
    if ($[50] !== t32 || $[51] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex items-center gap-1 text-[10px] cursor-pointer",
            style: t31,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: t32,
                    onChange: t33,
                    className: "w-3 h-3"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 1867,
                    columnNumber: 93
                }, this),
                "Color"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1867,
            columnNumber: 11
        }, this);
        $[50] = t32;
        $[51] = t33;
        $[52] = t34;
    } else {
        t34 = $[52];
    }
    let t35;
    if ($[53] !== col.id || $[54] !== onRemove) {
        t35 = ({
            "SelectedColumnRow[<button>.onClick]": ()=>onRemove(col.id)
        })["SelectedColumnRow[<button>.onClick]"];
        $[53] = col.id;
        $[54] = onRemove;
        $[55] = t35;
    } else {
        t35 = $[55];
    }
    let t36;
    if ($[56] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = {
            color: "var(--text-secondary)"
        };
        $[56] = t36;
    } else {
        t36 = $[56];
    }
    let t37;
    if ($[57] === Symbol.for("react.memo_cache_sentinel")) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-3 h-3",
            viewBox: "0 0 16 16",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 3l10 10M13 3L3 13",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                lineNumber: 1896,
                columnNumber: 108
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1896,
            columnNumber: 11
        }, this);
        $[57] = t37;
    } else {
        t37 = $[57];
    }
    let t38;
    if ($[58] !== t35) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t35,
            className: "ml-auto p-1 rounded transition-colors flex-shrink-0",
            style: t36,
            onMouseEnter: _SelectedColumnRowButtonOnMouseEnter,
            onMouseLeave: _SelectedColumnRowButtonOnMouseLeave,
            children: t37
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1903,
            columnNumber: 11
        }, this);
        $[58] = t35;
        $[59] = t38;
    } else {
        t38 = $[59];
    }
    let t39;
    if ($[60] !== t10 || $[61] !== t12 || $[62] !== t22 || $[63] !== t30 || $[64] !== t34 || $[65] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 rounded px-2 py-1.5",
            style: t1,
            children: [
                t10,
                t12,
                t22,
                t30,
                t34,
                t38
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1911,
            columnNumber: 11
        }, this);
        $[60] = t10;
        $[61] = t12;
        $[62] = t22;
        $[63] = t30;
        $[64] = t34;
        $[65] = t38;
        $[66] = t39;
    } else {
        t39 = $[66];
    }
    return t39;
}
_c1 = SelectedColumnRow;
function _SelectedColumnRowButtonOnMouseLeave(e_3) {
    e_3.currentTarget.style.color = "var(--text-secondary)";
}
function _SelectedColumnRowButtonOnMouseEnter(e_2) {
    e_2.currentTarget.style.color = "#EF4444";
}
function FilterRow(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(23);
    if ($[0] !== "393f15b0b324ee09d60c84e7acfc645660da49f86f4254078c9380b600f5f9b0") {
        for(let $i = 0; $i < 23; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "393f15b0b324ee09d60c84e7acfc645660da49f86f4254078c9380b600f5f9b0";
    }
    const { spec, value, onChange, onRemove } = t0;
    const strVal = value == null ? "" : String(value);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            background: "var(--bg-hover)",
            border: "1px solid var(--border)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            color: "var(--text-primary)"
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== spec.label) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs w-36 flex-shrink-0 truncate",
            style: t2,
            children: spec.label
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1966,
            columnNumber: 10
        }, this);
        $[3] = spec.label;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            color: "var(--text-secondary)"
        };
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] !== spec.category) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px]",
            style: t4,
            children: spec.category
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1983,
            columnNumber: 10
        }, this);
        $[6] = spec.category;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1991,
            columnNumber: 10
        }, this);
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    let t7;
    if ($[9] !== onChange || $[10] !== spec.options || $[11] !== spec.type || $[12] !== strVal) {
        t7 = spec.type === "range" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "number",
            value: strVal,
            onChange: {
                "FilterRow[<input>.onChange]": (e)=>onChange(e.target.value === "" ? "" : Number(e.target.value))
            }["FilterRow[<input>.onChange]"],
            placeholder: "value",
            className: "w-24 px-2 py-1 rounded text-xs text-right",
            style: {
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                outline: "none"
            }
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 1998,
            columnNumber: 34
        }, this) : spec.type === "select" && spec.options ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            value: strVal,
            onChange: {
                "FilterRow[<select>.onChange]": (e_0)=>onChange(e_0.target.value)
            }["FilterRow[<select>.onChange]"],
            className: "px-2 py-1 rounded text-xs",
            style: {
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                outline: "none"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                    value: "",
                    children: "— Select —"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                    lineNumber: 2012,
                    columnNumber: 8
                }, this),
                spec.options.map(_FilterRowSpecOptionsMap)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 2005,
            columnNumber: 54
        }, this) : null;
        $[9] = onChange;
        $[10] = spec.options;
        $[11] = spec.type;
        $[12] = strVal;
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            color: "var(--text-secondary)"
        };
        $[14] = t8;
    } else {
        t8 = $[14];
    }
    let t9;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-3 h-3",
            viewBox: "0 0 16 16",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 3l10 10M13 3L3 13",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
                lineNumber: 2032,
                columnNumber: 107
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 2032,
            columnNumber: 10
        }, this);
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] !== onRemove) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onRemove,
            className: "p-1 rounded transition-colors flex-shrink-0",
            style: t8,
            onMouseEnter: _FilterRowButtonOnMouseEnter,
            onMouseLeave: _FilterRowButtonOnMouseLeave,
            children: t9
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 2039,
            columnNumber: 11
        }, this);
        $[16] = onRemove;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    let t11;
    if ($[18] !== t10 || $[19] !== t3 || $[20] !== t5 || $[21] !== t7) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 rounded px-3 py-2",
            style: t1,
            children: [
                t3,
                t5,
                t6,
                t7,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 2047,
            columnNumber: 11
        }, this);
        $[18] = t10;
        $[19] = t3;
        $[20] = t5;
        $[21] = t7;
        $[22] = t11;
    } else {
        t11 = $[22];
    }
    return t11;
}
_c2 = FilterRow;
function _FilterRowButtonOnMouseLeave(e_2) {
    e_2.currentTarget.style.color = "var(--text-secondary)";
}
function _FilterRowButtonOnMouseEnter(e_1) {
    e_1.currentTarget.style.color = "#EF4444";
}
function _FilterRowSpecOptionsMap(o) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: o.value,
        children: o.label
    }, o.value, false, {
        fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
        lineNumber: 2065,
        columnNumber: 10
    }, this);
}
function Toggle(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "393f15b0b324ee09d60c84e7acfc645660da49f86f4254078c9380b600f5f9b0") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "393f15b0b324ee09d60c84e7acfc645660da49f86f4254078c9380b600f5f9b0";
    }
    const { value, onChange, label } = t0;
    let t1;
    if ($[1] !== onChange || $[2] !== value) {
        t1 = ({
            "Toggle[<div>.onClick]": ()=>onChange(!value)
        })["Toggle[<div>.onClick]"];
        $[1] = onChange;
        $[2] = value;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const t2 = value ? "var(--accent-brand)" : "var(--border)";
    let t3;
    if ($[4] !== t2) {
        t3 = {
            background: t2
        };
        $[4] = t2;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    const t4 = value ? "18px" : "2px";
    let t5;
    if ($[6] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-0.5 w-3 h-3 rounded-full transition-transform",
            style: {
                background: "#fff",
                left: t4
            }
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 2105,
            columnNumber: 10
        }, this);
        $[6] = t4;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== t1 || $[9] !== t3 || $[10] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: t1,
            className: "relative w-8 h-4 rounded-full transition-colors flex-shrink-0",
            style: t3,
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 2116,
            columnNumber: 10
        }, this);
        $[8] = t1;
        $[9] = t3;
        $[10] = t5;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = {
            color: "var(--text-secondary)"
        };
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] !== label) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs",
            style: t7,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 2135,
            columnNumber: 10
        }, this);
        $[13] = label;
        $[14] = t8;
    } else {
        t8 = $[14];
    }
    let t9;
    if ($[15] !== t6 || $[16] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex items-center gap-2 cursor-pointer select-none",
            children: [
                t6,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetEditor.tsx",
            lineNumber: 2143,
            columnNumber: 10
        }, this);
        $[15] = t6;
        $[16] = t8;
        $[17] = t9;
    } else {
        t9 = $[17];
    }
    return t9;
}
_c3 = Toggle;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "WidgetEditor");
__turbopack_context__.k.register(_c1, "SelectedColumnRow");
__turbopack_context__.k.register(_c2, "FilterRow");
__turbopack_context__.k.register(_c3, "Toggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(app)/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dashboard/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$DashboardToolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/DashboardToolbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/WidgetGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$AddWidgetDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/AddWidgetDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/WidgetEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dashboard/presets.ts [app-client] (ecmascript)");
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
function DashboardPage() {
    _s();
    const { dashboards, loading: listLoading, createDashboard, reload: reloadList } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardList"])();
    const [activeDashboardId, setActiveDashboardId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAddWidget, setShowAddWidget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingWidget, setEditingWidget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const resolvedId = activeDashboardId ?? dashboards[0]?.id ?? null;
    const { dashboard, loading: dashLoading, saving, saveLayout, renameDashboard, deleteDashboard, duplicateDashboard, addWidget, updateWidget, deleteWidget, reload: reloadDashboard } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"])(resolvedId);
    // Auto-select first dashboard when list loads
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "DashboardPage.useEffect": ()=>{
            if (!activeDashboardId && dashboards.length > 0) {
                setActiveDashboardId(dashboards[0].id);
            }
        }
    }["DashboardPage.useEffect"], [
        dashboards,
        activeDashboardId
    ]);
    const handleSelectDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleSelectDashboard]": (id)=>{
            setActiveDashboardId(id);
        }
    }["DashboardPage.useCallback[handleSelectDashboard]"], []);
    const handleCreateDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleCreateDashboard]": async (name)=>{
            const created = await createDashboard(name);
            if (!created) return;
            // Seed default widgets and build initial layout
            const seedLayout = [];
            let packX = 0, packY = 0, packRowH = 0;
            for (const presetId of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PRESET_IDS"]){
                const preset = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESET_WIDGETS"].find({
                    "DashboardPage.useCallback[handleCreateDashboard].preset": (p)=>p.id === presetId
                }["DashboardPage.useCallback[handleCreateDashboard].preset"]);
                if (!preset) continue;
                try {
                    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])(`/api/dashboard/${created.id}/widget`, {
                        widget_type: preset.widget_type,
                        title: preset.name,
                        config_json: preset.config
                    });
                    const wid = data.widget?.id;
                    if (wid) {
                        const w = preset.defaultLayout.w;
                        const h = preset.defaultLayout.h;
                        if (packX + w > 12) {
                            packY += packRowH;
                            packX = 0;
                            packRowH = 0;
                        }
                        seedLayout.push({
                            i: wid,
                            x: packX,
                            y: packY,
                            w,
                            h
                        });
                        packX += w;
                        packRowH = Math.max(packRowH, h);
                    }
                } catch  {
                // keep seeding best-effort
                }
            }
            // Save the initial layout
            if (seedLayout.length > 0) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPut"])(`/api/dashboard/${created.id}`, {
                    layout_json: seedLayout
                });
            }
            setActiveDashboardId(created.id);
        }
    }["DashboardPage.useCallback[handleCreateDashboard]"], [
        createDashboard
    ]);
    const handleRenameDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleRenameDashboard]": async (_id, name_0)=>{
            await renameDashboard(name_0);
        }
    }["DashboardPage.useCallback[handleRenameDashboard]"], [
        renameDashboard
    ]);
    const handleDeleteDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleDeleteDashboard]": async (id_0)=>{
            const ok = await deleteDashboard();
            if (ok) {
                await reloadList();
                const remaining = dashboards.filter({
                    "DashboardPage.useCallback[handleDeleteDashboard].remaining": (d)=>d.id !== id_0
                }["DashboardPage.useCallback[handleDeleteDashboard].remaining"]);
                setActiveDashboardId(remaining[0]?.id ?? null);
            }
        }
    }["DashboardPage.useCallback[handleDeleteDashboard]"], [
        deleteDashboard,
        reloadList,
        dashboards
    ]);
    const handleDuplicateDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleDuplicateDashboard]": async (_id_0)=>{
            const newId = await duplicateDashboard();
            if (newId) {
                await reloadList();
                setActiveDashboardId(newId);
            }
        }
    }["DashboardPage.useCallback[handleDuplicateDashboard]"], [
        duplicateDashboard,
        reloadList
    ]);
    const handleAddPreset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleAddPreset]": async (preset_0)=>{
            setShowAddWidget(false);
            const widget = await addWidget(preset_0.widget_type, preset_0.name, preset_0.config);
            if (widget && dashboard) {
                // Compute x,y for the new widget by appending after existing layout
                const existingLayout = dashboard.layout_json ?? [];
                const maxY = existingLayout.reduce({
                    "DashboardPage.useCallback[handleAddPreset].maxY": (m, l)=>Math.max(m, l.y + l.h)
                }["DashboardPage.useCallback[handleAddPreset].maxY"], 0);
                const usedX = existingLayout.filter({
                    "DashboardPage.useCallback[handleAddPreset].usedX": (l_0)=>l_0.y + l_0.h >= maxY
                }["DashboardPage.useCallback[handleAddPreset].usedX"]).reduce({
                    "DashboardPage.useCallback[handleAddPreset].usedX": (m_0, l_1)=>Math.max(m_0, l_1.x + l_1.w)
                }["DashboardPage.useCallback[handleAddPreset].usedX"], 0);
                const w_0 = preset_0.defaultLayout.w;
                const h_0 = preset_0.defaultLayout.h;
                const x = usedX + w_0 <= 12 ? usedX : 0;
                const y = maxY;
                const newLayout = [
                    ...existingLayout,
                    {
                        i: widget.id,
                        x,
                        y,
                        w: w_0,
                        h: h_0
                    }
                ];
                saveLayout(newLayout);
            }
        }
    }["DashboardPage.useCallback[handleAddPreset]"], [
        addWidget,
        dashboard,
        saveLayout
    ]);
    const handleDeleteWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleDeleteWidget]": async (widgetId)=>{
            await deleteWidget(widgetId);
        }
    }["DashboardPage.useCallback[handleDeleteWidget]"], [
        deleteWidget
    ]);
    const handleCopyWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleCopyWidget]": async (widget_0)=>{
            await addWidget(widget_0.widget_type, `${widget_0.title} (copy)`, widget_0.config_json);
        }
    }["DashboardPage.useCallback[handleCopyWidget]"], [
        addWidget
    ]);
    const handleUpdateWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleUpdateWidget]": async (widgetId_0, updates)=>{
            return updateWidget(widgetId_0, updates);
        }
    }["DashboardPage.useCallback[handleUpdateWidget]"], [
        updateWidget
    ]);
    const handleResetToDefaults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleResetToDefaults]": async (id_1)=>{
            if (!dashboard) return;
            // Delete all existing widgets
            for (const w_1 of dashboard.widgets ?? []){
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiDelete"])(`/api/dashboard/${id_1}/widget/${w_1.id}`);
            }
            // Re-seed with defaults + layout
            const seedLayout_0 = [];
            let packX_0 = 0, packY_0 = 0, packRowH_0 = 0;
            for (const presetId_0 of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PRESET_IDS"]){
                const preset_1 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESET_WIDGETS"].find({
                    "DashboardPage.useCallback[handleResetToDefaults].preset_1": (p_0)=>p_0.id === presetId_0
                }["DashboardPage.useCallback[handleResetToDefaults].preset_1"]);
                if (!preset_1) continue;
                try {
                    const data_0 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])(`/api/dashboard/${id_1}/widget`, {
                        widget_type: preset_1.widget_type,
                        title: preset_1.name,
                        config_json: preset_1.config
                    });
                    const wid_0 = data_0.widget?.id;
                    if (wid_0) {
                        const w_2 = preset_1.defaultLayout.w;
                        const h_1 = preset_1.defaultLayout.h;
                        if (packX_0 + w_2 > 12) {
                            packY_0 += packRowH_0;
                            packX_0 = 0;
                            packRowH_0 = 0;
                        }
                        seedLayout_0.push({
                            i: wid_0,
                            x: packX_0,
                            y: packY_0,
                            w: w_2,
                            h: h_1
                        });
                        packX_0 += w_2;
                        packRowH_0 = Math.max(packRowH_0, h_1);
                    }
                } catch  {
                // keep seeding best-effort
                }
            }
            if (seedLayout_0.length > 0) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPut"])(`/api/dashboard/${id_1}`, {
                    layout_json: seedLayout_0
                });
            }
            reloadDashboard();
        }
    }["DashboardPage.useCallback[handleResetToDefaults]"], [
        dashboard,
        reloadDashboard
    ]);
    const handleLayoutChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleLayoutChange]": (layout)=>{
            saveLayout(layout);
        }
    }["DashboardPage.useCallback[handleLayoutChange]"], [
        saveLayout
    ]);
    const isLoading = listLoading || dashLoading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col",
        style: {
            margin: '-1rem -1rem 0'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$DashboardToolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardToolbar"], {
                dashboards: dashboards,
                activeDashboardId: resolvedId,
                onSelectDashboard: handleSelectDashboard,
                onCreateDashboard: handleCreateDashboard,
                onRenameDashboard: handleRenameDashboard,
                onDeleteDashboard: handleDeleteDashboard,
                onDuplicateDashboard: handleDuplicateDashboard,
                onResetToDefaults: handleResetToDefaults,
                onAddWidget: ()=>setShowAddWidget(true),
                saving: saving
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto min-h-0",
                style: {
                    padding: '12px 16px'
                },
                children: isLoading && !dashboard ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DashboardSkeleton, {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 216,
                    columnNumber: 36
                }, this) : !dashboard ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyDashboardState, {
                    onCreate: ()=>handleCreateDashboard('My Dashboard')
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 216,
                    columnNumber: 73
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetGrid"], {
                    widgets: dashboard.widgets ?? [],
                    layout: dashboard.layout_json ?? [],
                    onLayoutChange: handleLayoutChange,
                    onEditWidget: (w_3)=>setEditingWidget(w_3),
                    onDeleteWidget: handleDeleteWidget,
                    onCopyWidget: handleCopyWidget
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 216,
                    columnNumber: 154
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            showAddWidget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$AddWidgetDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddWidgetDialog"], {
                onAdd: handleAddPreset,
                onClose: ()=>setShowAddWidget(false)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 220,
                columnNumber: 25
            }, this),
            editingWidget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetEditor"], {
                widget: editingWidget,
                onSave: handleUpdateWidget,
                onClose: ()=>setEditingWidget(null)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 223,
                columnNumber: 25
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
        lineNumber: 206,
        columnNumber: 10
    }, this);
}
_s(DashboardPage, "4cc6bMoXKC76L718gYKfvYx7Fsc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardList"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"]
    ];
});
_c = DashboardPage;
// ── Sub-components ─────────────────────────────────────────────────────────────
function DashboardSkeleton() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "d0d204e5d6a087c8e52f065cd0931d6edf15c0bfab16bb505bfb05c2df478732") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d0d204e5d6a087c8e52f065cd0931d6edf15c0bfab16bb505bfb05c2df478732";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-3 animate-pulse",
            children: [
                1,
                2,
                3,
                4
            ].map(_DashboardSkeletonAnonymous)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 239,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c1 = DashboardSkeleton;
function _DashboardSkeletonAnonymous(i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-64 rounded-lg",
        style: {
            background: "var(--bg-hover)",
            border: "1px solid var(--border)"
        }
    }, i, false, {
        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
        lineNumber: 247,
        columnNumber: 10
    }, this);
}
function EmptyDashboardState(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "d0d204e5d6a087c8e52f065cd0931d6edf15c0bfab16bb505bfb05c2df478732") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d0d204e5d6a087c8e52f065cd0931d6edf15c0bfab16bb505bfb05c2df478732";
    }
    const { onCreate } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-5xl",
            style: {
                color: "var(--text-secondary)",
                opacity: 0.3
            },
            children: "⊞"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 265,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-medium",
            style: {
                color: "var(--text-secondary)"
            },
            children: "No dashboards yet"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 275,
            columnNumber: 10
        }, this);
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-center max-w-sm",
            style: {
                color: "var(--text-secondary)",
                opacity: 0.6
            },
            children: "Create your first dashboard to start tracking market data with customizable widgets."
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 284,
            columnNumber: 10
        }, this);
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    let t4;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            background: "var(--accent-brand)",
            color: "#fff"
        };
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    if ($[5] !== onCreate) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center min-h-[60vh] gap-4",
            children: [
                t1,
                t2,
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onCreate,
                    className: "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    style: t4,
                    children: "Create Dashboard"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 304,
                    columnNumber: 100
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
            lineNumber: 304,
            columnNumber: 10
        }, this);
        $[5] = onCreate;
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    return t5;
}
_c2 = EmptyDashboardState;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "DashboardPage");
__turbopack_context__.k.register(_c1, "DashboardSkeleton");
__turbopack_context__.k.register(_c2, "EmptyDashboardState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_89bbbd8b._.js.map