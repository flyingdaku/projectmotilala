module.exports = [
"[project]/src/lib/dashboard/hooks.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useDashboardList() {
    const [dashboards, setDashboards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/dashboard');
            if (!res.ok) throw new Error(`Failed to load dashboards: ${res.status}`);
            const data = await res.json();
            setDashboards(data.dashboards ?? []);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally{
            setLoading(false);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        load();
    }, [
        load
    ]);
    const createDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (name)=>{
        const res = await fetch('/api/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        });
        if (!res.ok) return null;
        const data = await res.json();
        await load();
        return data.dashboard;
    }, [
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
function useDashboard(dashboardId) {
    const [dashboard, setDashboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const layoutSaveTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/dashboard/${id}`);
            if (!res.ok) throw new Error(`Failed to load dashboard: ${res.status}`);
            const data = await res.json();
            setDashboard(data.dashboard);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally{
            setLoading(false);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dashboardId) load(dashboardId);
    }, [
        dashboardId,
        load
    ]);
    // Debounced layout save
    const saveLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((layout)=>{
        if (!dashboard) return;
        setDashboard((prev)=>prev ? {
                ...prev,
                layout_json: layout
            } : null);
        if (layoutSaveTimer.current) clearTimeout(layoutSaveTimer.current);
        layoutSaveTimer.current = setTimeout(async ()=>{
            try {
                await fetch(`/api/dashboard/${dashboard.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        layout_json: layout
                    })
                });
            } catch  {
            // silent — layout will sync on next load
            }
        }, 600);
    }, [
        dashboard
    ]);
    const renameDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (name)=>{
        if (!dashboard) return;
        setSaving(true);
        try {
            await fetch(`/api/dashboard/${dashboard.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name
                })
            });
            setDashboard((prev)=>prev ? {
                    ...prev,
                    name
                } : null);
        } finally{
            setSaving(false);
        }
    }, [
        dashboard
    ]);
    const deleteDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!dashboard) return false;
        const res = await fetch(`/api/dashboard/${dashboard.id}`, {
            method: 'DELETE'
        });
        return res.ok;
    }, [
        dashboard
    ]);
    const duplicateDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!dashboard) return null;
        const res = await fetch(`/api/dashboard/${dashboard.id}/duplicate`, {
            method: 'POST'
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.id ?? null;
    }, [
        dashboard
    ]);
    const addWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (widget_type, title, config)=>{
        if (!dashboard) return null;
        const res = await fetch(`/api/dashboard/${dashboard.id}/widget`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                widget_type,
                title,
                config_json: config
            })
        });
        if (!res.ok) return null;
        const data = await res.json();
        const widget = data.widget;
        setDashboard((prev)=>prev ? {
                ...prev,
                widgets: [
                    ...prev.widgets ?? [],
                    widget
                ]
            } : null);
        return widget;
    }, [
        dashboard
    ]);
    const updateWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (widgetId, updates)=>{
        if (!dashboard) return false;
        const res = await fetch(`/api/dashboard/${dashboard.id}/widget/${widgetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        });
        if (!res.ok) return false;
        setDashboard((prev)=>prev ? {
                ...prev,
                widgets: (prev.widgets ?? []).map((w)=>w.id === widgetId ? {
                        ...w,
                        ...updates
                    } : w)
            } : null);
        return true;
    }, [
        dashboard
    ]);
    const deleteWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (widgetId)=>{
        if (!dashboard) return false;
        const res = await fetch(`/api/dashboard/${dashboard.id}/widget/${widgetId}`, {
            method: 'DELETE'
        });
        if (!res.ok) return false;
        setDashboard((prev)=>prev ? {
                ...prev,
                widgets: (prev.widgets ?? []).filter((w)=>w.id !== widgetId)
            } : null);
        return true;
    }, [
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
function useWidgetData(config, widgetType, enabled = true) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const configKey = JSON.stringify({
        config,
        widgetType
    });
    const configKeyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(configKey);
    const run = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (cfg, wt)=>{
        if (!cfg.columns || cfg.columns.length === 0) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/dashboard/widget/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    config: cfg,
                    widget_type: wt
                })
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error ?? `Query failed: ${res.status}`);
            }
            const result = await res.json();
            setData(result);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
            setData(null);
        } finally{
            setLoading(false);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        configKeyRef.current = configKey;
        if (!enabled) return;
        run(config, widgetType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        configKey,
        enabled
    ]);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        run(config, widgetType);
    }, [
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
}),
"[project]/src/components/dashboard/DashboardToolbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardToolbar",
    ()=>DashboardToolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function DashboardToolbar({ dashboards, activeDashboardId, onSelectDashboard, onCreateDashboard, onRenameDashboard, onDeleteDashboard, onDuplicateDashboard, onResetToDefaults, onAddWidget, saving }) {
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showActions, setShowActions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [renaming, setRenaming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [renameVal, setRenameVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [creatingNew, setCreatingNew] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newName, setNewName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [confirmDelete, setConfirmDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pickerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const actionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const active = dashboards.find((d)=>d.id === activeDashboardId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function onClickOutside(e) {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowPicker(false);
            }
            if (actionsRef.current && !actionsRef.current.contains(e.target)) {
                setShowActions(false);
            }
        }
        document.addEventListener('mousedown', onClickOutside);
        return ()=>document.removeEventListener('mousedown', onClickOutside);
    }, []);
    function startRename() {
        setRenameVal(active?.name ?? '');
        setRenaming(true);
        setShowActions(false);
    }
    function commitRename() {
        if (activeDashboardId && renameVal.trim()) {
            onRenameDashboard(activeDashboardId, renameVal.trim());
        }
        setRenaming(false);
    }
    function handleDelete() {
        if (!activeDashboardId) return;
        if (confirmDelete) {
            onDeleteDashboard(activeDashboardId);
            setConfirmDelete(false);
            setShowActions(false);
        } else {
            setConfirmDelete(true);
            setTimeout(()=>setConfirmDelete(false), 3000);
        }
    }
    function commitNew() {
        if (newName.trim()) {
            onCreateDashboard(newName.trim());
            setNewName('');
            setCreatingNew(false);
            setShowPicker(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 px-4 py-2.5 flex-wrap",
        style: {
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                ref: pickerRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowPicker((p)=>!p),
                        className: "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors text-sm font-medium min-w-[160px] max-w-[240px]",
                        style: {
                            background: 'var(--bg-hover)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-primary)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px]",
                                style: {
                                    color: 'var(--accent-brand)'
                                },
                                children: "⊞"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate flex-1 text-left",
                                children: active?.name ?? 'Select Dashboard'
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-3.5 h-3.5 shrink-0",
                                style: {
                                    color: 'var(--text-secondary)'
                                },
                                viewBox: "0 0 16 16",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "1.5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M4 6l4 4 4-4",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    showPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-0 mt-1 w-64 rounded-lg shadow-xl z-50 overflow-hidden",
                        style: {
                            background: 'var(--surface)',
                            border: '1px solid var(--border)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "py-1 max-h-56 overflow-y-auto",
                                children: dashboards.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            onSelectDashboard(d.id);
                                            setShowPicker(false);
                                        },
                                        className: "w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors",
                                        style: {
                                            color: d.id === activeDashboardId ? 'var(--accent-brand)' : 'var(--text-primary)'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.background = 'var(--bg-hover)';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.background = 'transparent';
                                        },
                                        children: [
                                            d.is_default && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px]",
                                                style: {
                                                    color: 'var(--accent-brand)'
                                                },
                                                children: "★"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                                lineNumber: 119,
                                                columnNumber: 36
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "truncate",
                                                children: d.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, d.id, true, {
                                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2",
                                style: {
                                    borderTop: '1px solid var(--border)'
                                },
                                children: creatingNew ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            autoFocus: true,
                                            value: newName,
                                            onChange: (e)=>setNewName(e.target.value),
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter') commitNew();
                                                if (e.key === 'Escape') setCreatingNew(false);
                                            },
                                            placeholder: "Dashboard name...",
                                            className: "flex-1 rounded px-2 py-1 text-xs outline-none",
                                            style: {
                                                background: 'var(--bg-hover)',
                                                border: '1px solid var(--border)',
                                                color: 'var(--text-primary)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                            lineNumber: 127,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: commitNew,
                                            className: "px-2 py-1 text-xs rounded transition-colors",
                                            style: {
                                                background: 'var(--accent-brand)',
                                                color: '#fff'
                                            },
                                            children: "Create"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                            lineNumber: 136,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                    lineNumber: 126,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCreatingNew(true),
                                    className: "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded transition-colors",
                                    style: {
                                        color: 'var(--text-secondary)'
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.background = 'var(--bg-hover)';
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--accent-brand)'
                                            },
                                            children: "+"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                            lineNumber: 148,
                                            columnNumber: 19
                                        }, this),
                                        " New Dashboard"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                    lineNumber: 141,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            renaming ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        autoFocus: true,
                        value: renameVal,
                        onChange: (e)=>setRenameVal(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter') commitRename();
                            if (e.key === 'Escape') setRenaming(false);
                        },
                        className: "rounded px-2 py-1 text-xs outline-none w-40",
                        style: {
                            background: 'var(--bg-hover)',
                            border: '1px solid var(--accent-brand)',
                            color: 'var(--text-primary)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: commitRename,
                        className: "text-xs px-1",
                        style: {
                            color: 'var(--accent-brand)'
                        },
                        children: "✓"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setRenaming(false),
                        className: "text-xs px-1",
                        style: {
                            color: 'var(--text-secondary)'
                        },
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                lineNumber: 158,
                columnNumber: 9
            }, this) : /* Dashboard actions dropdown */ active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                ref: actionsRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowActions((p)=>!p),
                        className: "p-1.5 rounded transition-colors",
                        style: {
                            color: 'var(--text-secondary)'
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.background = 'var(--bg-hover)';
                            e.currentTarget.style.color = 'var(--text-primary)';
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                        },
                        title: "Dashboard options",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4",
                            viewBox: "0 0 16 16",
                            fill: "currentColor",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "8",
                                    cy: "3",
                                    r: "1.2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                    lineNumber: 183,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "8",
                                    cy: "8",
                                    r: "1.2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                    lineNumber: 184,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "8",
                                    cy: "13",
                                    r: "1.2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                    lineNumber: 185,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                            lineNumber: 182,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                        lineNumber: 174,
                        columnNumber: 13
                    }, this),
                    showActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-0 mt-1 w-44 rounded-lg shadow-xl z-50 overflow-hidden",
                        style: {
                            background: 'var(--surface)',
                            border: '1px solid var(--border)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: startRename,
                                className: "w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors",
                                style: {
                                    color: 'var(--text-primary)'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.background = 'var(--bg-hover)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.background = 'transparent';
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "✎"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                        lineNumber: 193,
                                        columnNumber: 19
                                    }, this),
                                    " Rename"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 190,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    onDuplicateDashboard(activeDashboardId);
                                    setShowActions(false);
                                },
                                className: "w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors",
                                style: {
                                    color: 'var(--text-primary)'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.background = 'var(--bg-hover)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.background = 'transparent';
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "⎘"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                        lineNumber: 201,
                                        columnNumber: 19
                                    }, this),
                                    " Duplicate"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 195,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 pt-1",
                                style: {
                                    borderTop: '1px solid var(--border)'
                                },
                                children: [
                                    onResetToDefaults && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            onResetToDefaults(activeDashboardId);
                                            setShowActions(false);
                                        },
                                        className: "w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors",
                                        style: {
                                            color: 'var(--text-secondary)'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.background = 'var(--bg-hover)';
                                            e.currentTarget.style.color = 'var(--accent-brand)';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = 'var(--text-secondary)';
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "↺"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                                lineNumber: 212,
                                                columnNumber: 23
                                            }, this),
                                            " Reset to Defaults"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                        lineNumber: 205,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleDelete,
                                        className: "w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors",
                                        style: {
                                            color: confirmDelete ? '#EF4444' : 'var(--text-secondary)',
                                            background: confirmDelete ? 'rgba(239,68,68,0.1)' : 'transparent'
                                        },
                                        onMouseEnter: (e)=>{
                                            if (!confirmDelete) {
                                                e.currentTarget.style.color = '#EF4444';
                                                e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
                                            }
                                        },
                                        onMouseLeave: (e)=>{
                                            if (!confirmDelete) {
                                                e.currentTarget.style.color = 'var(--text-secondary)';
                                                e.currentTarget.style.background = 'transparent';
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "⊗"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                                lineNumber: 222,
                                                columnNumber: 21
                                            }, this),
                                            " ",
                                            confirmDelete ? 'Confirm delete?' : 'Delete'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                        lineNumber: 215,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                                lineNumber: 203,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                        lineNumber: 189,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                lineNumber: 173,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            saving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] animate-pulse",
                style: {
                    color: 'var(--text-secondary)'
                },
                children: "Saving…"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                lineNumber: 235,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onAddWidget,
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                style: {
                    background: 'var(--accent-brand)',
                    color: '#fff'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-base leading-none",
                        children: "+"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this),
                    "Add Widget"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/DashboardToolbar.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/dashboard/charts/WidgetTable.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetTable",
    ()=>WidgetTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
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
function WidgetTable({ rows, columns }) {
    const [sortCol, setSortCol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sortDir, setSortDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('desc');
    const symbolCol = columns.find((c)=>c.dslName === 'symbol');
    const sorted = [
        ...rows
    ].sort((a, b)=>{
        if (!sortCol) return 0;
        const av = a[sortCol] ?? 0;
        const bv = b[sortCol] ?? 0;
        const cmp = Number(av) - Number(bv);
        return sortDir === 'asc' ? cmp : -cmp;
    });
    function handleSort(colId) {
        if (sortCol === colId) {
            setSortDir((d)=>d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCol(colId);
            setSortDir('desc');
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-auto h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full text-xs border-collapse",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    className: "sticky top-0 z-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        style: {
                            background: 'var(--surface)'
                        },
                        children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                onClick: ()=>handleSort(col.id),
                                className: "px-2 py-1.5 text-left text-[11px] font-medium cursor-pointer whitespace-nowrap select-none",
                                style: {
                                    color: sortCol === col.id ? 'var(--accent-brand)' : 'var(--text-secondary)',
                                    borderBottom: '1px solid var(--border)'
                                },
                                children: [
                                    col.label,
                                    sortCol === col.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-1",
                                        style: {
                                            color: 'var(--accent-brand)'
                                        },
                                        children: sortDir === 'asc' ? '↑' : '↓'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                                        lineNumber: 85,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, col.id, true, {
                                fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                                lineNumber: 74,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: [
                        sorted.map((row, i)=>{
                            const symbol = symbolCol ? String(row[symbolCol.id] ?? row['symbol'] ?? '') : '';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "transition-colors",
                                style: {
                                    borderBottom: '1px solid var(--border)'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.background = 'var(--bg-hover)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.background = 'transparent';
                                },
                                children: columns.map((col)=>{
                                    const val = row[col.id];
                                    const isSymbol = col.dslName === 'symbol';
                                    const colorStyle = valueColor(val, col);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-2 py-1.5 whitespace-nowrap",
                                        style: colorStyle,
                                        children: isSymbol && symbol ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/stocks/${symbol}`,
                                            className: "font-mono font-medium",
                                            style: {
                                                color: 'var(--accent-brand)'
                                            },
                                            children: symbol
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                                            lineNumber: 115,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: col.format !== 'text' ? 'font-mono' : '',
                                            style: Object.keys(colorStyle).length === 0 ? {
                                                color: col.format === 'text' ? 'var(--text-primary)' : 'var(--text-primary)'
                                            } : {},
                                            children: formatValue(val, col)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                                            lineNumber: 123,
                                            columnNumber: 25
                                        }, this)
                                    }, col.id, false, {
                                        fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                                        lineNumber: 109,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, i, false, {
                                fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this);
                        }),
                        sorted.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                colSpan: columns.length,
                                className: "py-8 text-center text-xs",
                                style: {
                                    color: 'var(--text-secondary)'
                                },
                                children: "No data"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                                lineNumber: 138,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                            lineNumber: 137,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetTable.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/dashboard/charts/WidgetBarChart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetBarChart",
    ()=>WidgetBarChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-ssr] (ecmascript)");
'use client';
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
const CustomTooltip = ({ active, payload, label })=>{
    if (!active || !Array.isArray(payload) || payload.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded px-3 py-2 text-xs shadow-lg",
        style: {
            background: 'var(--surface)',
            border: '1px solid var(--border)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-1 font-mono",
                style: {
                    color: 'var(--text-primary)'
                },
                children: String(label)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            payload.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: p.color
                    },
                    className: "font-mono",
                    children: typeof p.value === 'number' ? p.value.toFixed(2) : String(p.value)
                }, i, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function WidgetBarChart({ rows, columns, chartConfig }) {
    const xKey = chartConfig?.xAxis ?? columns[0]?.id ?? 'symbol';
    const yKey = chartConfig?.yAxis ?? columns[1]?.id ?? columns[0]?.id ?? 'value';
    const colorCol = columns.find((c)=>c.id === (chartConfig?.colorField ?? yKey));
    const data = rows.map((r)=>({
            ...r,
            _label: String(r[xKey] ?? '')
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
        width: "100%",
        height: "100%",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
            data: data,
            margin: {
                top: 4,
                right: 8,
                bottom: 20,
                left: 8
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                    strokeDasharray: "3 3",
                    stroke: "var(--border)",
                    vertical: false
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                    dataKey: "_label",
                    tick: {
                        fill: 'var(--text-secondary)',
                        fontSize: 10
                    },
                    tickLine: false,
                    axisLine: {
                        stroke: 'var(--border)'
                    },
                    angle: -30,
                    textAnchor: "end",
                    interval: 0,
                    height: 40
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                    tick: {
                        fill: 'var(--text-secondary)',
                        fontSize: 10
                    },
                    tickLine: false,
                    axisLine: false,
                    tickFormatter: (v)=>v >= 1e5 ? `${(v / 1e5).toFixed(0)}L` : v.toFixed(1),
                    width: 45
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                        lineNumber: 73,
                        columnNumber: 27
                    }, void 0),
                    cursor: {
                        fill: 'rgba(148,163,184,0.05)'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                    dataKey: yKey,
                    radius: [
                        3,
                        3,
                        0,
                        0
                    ],
                    maxBarSize: 40,
                    children: data.map((entry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cell"], {
                            fill: colorCol ? getColor(entry[yKey], colorCol) : COLORS[i % COLORS.length]
                        }, i, false, {
                            fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetBarChart.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/dashboard/charts/WidgetHBarChart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetHBarChart",
    ()=>WidgetHBarChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-ssr] (ecmascript)");
'use client';
;
;
const CustomTooltip = ({ active, payload, label })=>{
    if (!active || !Array.isArray(payload) || payload.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded px-3 py-2 text-xs shadow-lg",
        style: {
            background: 'var(--surface)',
            border: '1px solid var(--border)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-1 font-mono font-medium",
                style: {
                    color: 'var(--text-primary)'
                },
                children: String(label)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            payload.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: p.color
                    },
                    className: "font-mono",
                    children: typeof p.value === 'number' ? `${p.value >= 0 ? '+' : ''}${p.value.toFixed(2)}` : String(p.value)
                }, i, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function WidgetHBarChart({ rows, columns, chartConfig }) {
    const xKey = chartConfig?.xAxis ?? columns[1]?.id ?? columns[0]?.id;
    const yKey = chartConfig?.yAxis ?? columns[0]?.id ?? 'symbol';
    const colorCol = columns.find((c)=>c.id === (chartConfig?.colorField ?? xKey));
    const data = rows.map((r)=>({
            ...r,
            _label: String(r[yKey] ?? ''),
            _value: Number(r[xKey] ?? 0)
        }));
    const hasNeg = data.some((d)=>d._value < 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
        width: "100%",
        height: "100%",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
            layout: "vertical",
            data: data,
            margin: {
                top: 4,
                right: 40,
                bottom: 4,
                left: 4
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                    strokeDasharray: "3 3",
                    stroke: "var(--border)",
                    horizontal: false
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                    type: "number",
                    tick: {
                        fill: 'var(--text-secondary)',
                        fontSize: 10
                    },
                    tickLine: false,
                    axisLine: {
                        stroke: 'var(--border)'
                    },
                    tickFormatter: (v)=>`${v.toFixed(1)}${colorCol?.format === 'percent' ? '%' : ''}`
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                    type: "category",
                    dataKey: "_label",
                    tick: {
                        fill: 'var(--text-secondary)',
                        fontSize: 10
                    },
                    tickLine: false,
                    axisLine: false,
                    width: 80
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                        lineNumber: 66,
                        columnNumber: 27
                    }, void 0),
                    cursor: {
                        fill: 'var(--bg-hover)'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                hasNeg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                    x: 0,
                    stroke: "var(--border)"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                    lineNumber: 67,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                    dataKey: "_value",
                    radius: [
                        0,
                        3,
                        3,
                        0
                    ],
                    maxBarSize: 20,
                    children: data.map((entry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cell"], {
                            fill: colorCol?.colorCode ? entry._value >= 0 ? '#10B981' : '#EF4444' : '#F59E0B'
                        }, i, false, {
                            fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetHBarChart.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/dashboard/charts/WidgetPieChart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetPieChart",
    ()=>WidgetPieChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
'use client';
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
const CustomTooltip = ({ active, payload })=>{
    if (!active || !Array.isArray(payload) || payload.length === 0) return null;
    const entry = payload[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded px-3 py-2 text-xs shadow-lg",
        style: {
            background: 'var(--surface)',
            border: '1px solid var(--border)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-medium mb-0.5",
                style: {
                    color: 'var(--text-primary)'
                },
                children: entry.name
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-mono",
                style: {
                    color: 'var(--accent-brand)'
                },
                children: entry.value.toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                })
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            entry.payload?.pct != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: 'var(--text-secondary)'
                },
                children: [
                    entry.payload.pct.toFixed(1),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function WidgetPieChart({ rows, columns, chartConfig }) {
    const labelKey = chartConfig?.colorField ?? columns[0]?.id ?? 'label';
    const valueKey = columns[1]?.id ?? columns[0]?.id ?? 'value';
    const total = rows.reduce((s, r)=>s + Number(r[valueKey] ?? 0), 0);
    const data = rows.map((r)=>({
            name: String(r[labelKey] ?? ''),
            value: Number(r[valueKey] ?? 0),
            pct: total > 0 ? Number(r[valueKey] ?? 0) / total * 100 : 0
        }));
    const isDonut = chartConfig?.donut !== false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
        width: "100%",
        height: "100%",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieChart"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Pie"], {
                    data: data,
                    cx: "50%",
                    cy: "45%",
                    innerRadius: isDonut ? '40%' : 0,
                    outerRadius: "65%",
                    paddingAngle: 2,
                    dataKey: "value",
                    children: data.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cell"], {
                            fill: COLORS[i % COLORS.length],
                            stroke: "transparent"
                        }, i, false, {
                            fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
                        lineNumber: 65,
                        columnNumber: 27
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                chartConfig?.showLegend !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {
                    iconType: "circle",
                    iconSize: 8,
                    formatter: (value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: 'var(--text-secondary)',
                                fontSize: 10
                            },
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
                            lineNumber: 71,
                            columnNumber: 15
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetPieChart.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/dashboard/charts/WidgetLineChart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetLineChart",
    ()=>WidgetLineChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-ssr] (ecmascript)");
'use client';
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
const CustomTooltip = ({ active, payload, label })=>{
    if (!active || !Array.isArray(payload) || payload.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded px-3 py-2 text-xs shadow-lg",
        style: {
            background: 'var(--surface)',
            border: '1px solid var(--border)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-1",
                style: {
                    color: 'var(--text-secondary)'
                },
                children: String(label)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            payload.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: p.color
                    },
                    className: "font-mono",
                    children: [
                        p.name,
                        ": ",
                        typeof p.value === 'number' ? p.value.toFixed(2) : String(p.value)
                    ]
                }, i, true, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function WidgetLineChart({ rows, columns, chartConfig }) {
    const xKey = chartConfig?.xAxis ?? columns[0]?.id ?? 'date';
    const valueColumns = columns.filter((c)=>c.id !== xKey && c.format !== 'text');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
        width: "100%",
        height: "100%",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineChart"], {
            data: rows,
            margin: {
                top: 4,
                right: 16,
                bottom: 4,
                left: 8
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                    strokeDasharray: "3 3",
                    stroke: "var(--border)"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                    dataKey: xKey,
                    tick: {
                        fill: 'var(--text-secondary)',
                        fontSize: 10
                    },
                    tickLine: false,
                    axisLine: {
                        stroke: 'var(--border)'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                    tick: {
                        fill: 'var(--text-secondary)',
                        fontSize: 10
                    },
                    tickLine: false,
                    axisLine: false,
                    width: 45,
                    tickFormatter: (v)=>v >= 1e5 ? `${(v / 1e5).toFixed(0)}L` : v.toFixed(1)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                        lineNumber: 56,
                        columnNumber: 27
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                chartConfig?.showLegend !== false && valueColumns.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {
                    iconType: "circle",
                    iconSize: 8,
                    formatter: (value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: 'var(--text-secondary)',
                                fontSize: 10
                            },
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                            lineNumber: 62,
                            columnNumber: 15
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
                    lineNumber: 58,
                    columnNumber: 11
                }, this),
                valueColumns.map((col, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
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
                        lineNumber: 67,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetLineChart.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/dashboard/charts/WidgetAreaChart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetAreaChart",
    ()=>WidgetAreaChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-ssr] (ecmascript)");
'use client';
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
const CustomTooltip = ({ active, payload, label })=>{
    if (!active || !Array.isArray(payload) || payload.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded px-3 py-2 text-xs shadow-lg",
        style: {
            background: 'var(--surface)',
            border: '1px solid var(--border)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-1",
                style: {
                    color: 'var(--text-secondary)'
                },
                children: String(label)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            payload.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: p.color
                    },
                    className: "font-mono",
                    children: [
                        p.name,
                        ": ",
                        typeof p.value === 'number' ? p.value.toFixed(2) : String(p.value)
                    ]
                }, i, true, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function WidgetAreaChart({ rows, columns, chartConfig }) {
    const xKey = chartConfig?.xAxis ?? columns[0]?.id ?? 'date';
    const valueColumns = columns.filter((c)=>c.id !== xKey && c.format !== 'text');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
        width: "100%",
        height: "100%",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AreaChart"], {
            data: rows,
            margin: {
                top: 4,
                right: 16,
                bottom: 4,
                left: 8
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: valueColumns.map((col, i)=>{
                        const color = AREA_COLORS[i % AREA_COLORS.length];
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                            id: `grad_${col.id}`,
                            x1: "0",
                            y1: "0",
                            x2: "0",
                            y2: "1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "5%",
                                    stopColor: color.stroke,
                                    stopOpacity: 0.3
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                                    lineNumber: 49,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "95%",
                                    stopColor: color.stroke,
                                    stopOpacity: 0.02
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                                    lineNumber: 50,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, col.id, true, {
                            fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                            lineNumber: 48,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                    strokeDasharray: "3 3",
                    stroke: "var(--border)"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                    dataKey: xKey,
                    tick: {
                        fill: 'var(--text-secondary)',
                        fontSize: 10
                    },
                    tickLine: false,
                    axisLine: {
                        stroke: 'var(--border)'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                    tick: {
                        fill: 'var(--text-secondary)',
                        fontSize: 10
                    },
                    tickLine: false,
                    axisLine: false,
                    width: 45,
                    tickFormatter: (v)=>v >= 1e5 ? `${(v / 1e5).toFixed(0)}L` : v.toFixed(1)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                        lineNumber: 69,
                        columnNumber: 27
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                chartConfig?.showLegend !== false && valueColumns.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {
                    iconType: "circle",
                    iconSize: 8,
                    formatter: (value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: 'var(--text-secondary)',
                                fontSize: 10
                            },
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                            lineNumber: 75,
                            columnNumber: 15
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                    lineNumber: 71,
                    columnNumber: 11
                }, this),
                valueColumns.map((col, i)=>{
                    const color = AREA_COLORS[i % AREA_COLORS.length];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                        type: "monotone",
                        dataKey: col.id,
                        name: col.label,
                        stroke: color.stroke,
                        strokeWidth: 1.5,
                        fill: `url(#grad_${col.id})`,
                        dot: false,
                        activeDot: {
                            r: 3,
                            fill: color.stroke
                        }
                    }, col.id, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
                        lineNumber: 82,
                        columnNumber: 13
                    }, this);
                })
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/charts/WidgetAreaChart.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/dashboard/charts/WidgetHeatmap.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetHeatmap",
    ()=>WidgetHeatmap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
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
function WidgetHeatmap({ rows, columns, chartConfig }) {
    const rowLabelKey = chartConfig?.yAxis ?? columns[0]?.id ?? 'label';
    const colLabelKey = chartConfig?.xAxis ?? columns[1]?.id ?? 'category';
    const valueKey = chartConfig?.colorField ?? columns[2]?.id ?? columns[1]?.id ?? 'value';
    const valueCol = columns.find((c)=>c.id === valueKey);
    // Build unique row/col labels
    const rowLabels = [
        ...new Set(rows.map((r)=>String(r[rowLabelKey] ?? '')))
    ];
    const colLabels = [
        ...new Set(rows.map((r)=>String(r[colLabelKey] ?? '')))
    ];
    // Build lookup
    const lookup = {};
    for (const row of rows){
        const rl = String(row[rowLabelKey] ?? '');
        const cl = String(row[colLabelKey] ?? '');
        if (!lookup[rl]) lookup[rl] = {};
        lookup[rl][cl] = Number(row[valueKey] ?? 0);
    }
    const allValues = rows.map((r)=>Number(r[valueKey] ?? 0));
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    function fmt(v) {
        if (!valueCol) return v.toFixed(1);
        if (valueCol.format === 'percent') return `${v.toFixed(1)}%`;
        if (valueCol.format === 'currency') return v >= 1e5 ? `${(v / 1e5).toFixed(0)}L` : v.toFixed(0);
        return v >= 1e5 ? `${(v / 1e5).toFixed(0)}L` : v.toFixed(1);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-auto h-full p-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "text-xs border-collapse w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-1.5 py-1 text-left font-normal sticky left-0 z-10",
                                    style: {
                                        color: 'var(--text-secondary)',
                                        borderBottom: '1px solid var(--border)',
                                        background: 'var(--surface)'
                                    },
                                    children: columns[0]?.label ?? ''
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                colLabels.map((cl)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-1.5 py-1 font-normal whitespace-nowrap text-center",
                                        style: {
                                            color: 'var(--text-secondary)',
                                            borderBottom: '1px solid var(--border)'
                                        },
                                        children: cl
                                    }, cl, false, {
                                        fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: rowLabels.map((rl)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-1.5 py-1 whitespace-nowrap sticky left-0 z-10",
                                        style: {
                                            color: 'var(--text-primary)',
                                            borderRight: '1px solid var(--border)',
                                            background: 'var(--surface)'
                                        },
                                        children: rl
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this),
                                    colLabels.map((cl)=>{
                                        const val = lookup[rl]?.[cl];
                                        const bg = val !== undefined ? interpolateColor(val, min, max) : 'transparent';
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-1.5 py-1 text-center font-mono transition-opacity hover:opacity-80",
                                            style: {
                                                backgroundColor: bg,
                                                border: '1px solid var(--border)',
                                                opacity: 0.9
                                            },
                                            title: `${rl} × ${cl}: ${val !== undefined ? fmt(val) : '—'}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px]",
                                                style: {
                                                    color: '#fff',
                                                    mixBlendMode: 'normal'
                                                },
                                                children: val !== undefined ? fmt(val) : '—'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                                                lineNumber: 91,
                                                columnNumber: 21
                                            }, this)
                                        }, cl, false, {
                                            fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                                            lineNumber: 85,
                                            columnNumber: 19
                                        }, this);
                                    })
                                ]
                            }, rl, true, {
                                fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mt-2 px-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px]",
                        style: {
                            color: 'var(--text-secondary)'
                        },
                        children: "Low"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2 flex-1 rounded",
                        style: {
                            background: 'linear-gradient(to right, rgba(239,68,68,0.7), rgba(100,116,139,0.3), rgba(16,185,129,0.7))'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px]",
                        style: {
                            color: 'var(--text-secondary)'
                        },
                        children: "High"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/charts/WidgetHeatmap.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/dashboard/charts/WidgetMetricCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetMetricCard",
    ()=>WidgetMetricCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
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
function WidgetMetricCard({ rows, columns, config }) {
    const metricCol = config.metricColumn ? columns.find((c)=>c.id === config.metricColumn || c.dslName === config.metricColumn) : columns[0];
    const rawVal = rows[0]?.[metricCol?.id ?? ''];
    const displayVal = rawVal !== undefined ? formatMetric(rawVal, metricCol?.format) : '—';
    const totalRows = rows.length;
    const isCount = !metricCol || metricCol.aggregation === 'count';
    const subLabel = isCount ? `${totalRows.toLocaleString()} stocks` : config.metricLabel ?? metricCol?.label ?? '';
    const numVal = Number(rawVal);
    const isPositive = !isNaN(numVal) && numVal > 0 && metricCol?.colorCode;
    const isNegative = !isNaN(numVal) && numVal < 0 && metricCol?.colorCode;
    const valueColor = isPositive ? 'var(--positive, #10B981)' : isNegative ? 'var(--negative, #EF4444)' : 'var(--accent-brand)';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center h-full gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-4xl font-bold font-mono tracking-tight",
                style: {
                    color: valueColor
                },
                children: [
                    config.metricPrefix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl mr-1",
                        style: {
                            color: 'var(--text-secondary)'
                        },
                        children: config.metricPrefix
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetMetricCard.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    displayVal,
                    config.metricSuffix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xl ml-1",
                        style: {
                            color: 'var(--text-secondary)'
                        },
                        children: config.metricSuffix
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/charts/WidgetMetricCard.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/charts/WidgetMetricCard.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            subLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-center max-w-[180px] truncate",
                style: {
                    color: 'var(--text-secondary)'
                },
                children: subLabel
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/charts/WidgetMetricCard.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/charts/WidgetMetricCard.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/dashboard/WidgetRenderer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetRenderer",
    ()=>WidgetRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetTable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetBarChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetBarChart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetHBarChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetHBarChart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetPieChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetPieChart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetLineChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetLineChart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetAreaChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetAreaChart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetHeatmap$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetHeatmap.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetMetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/charts/WidgetMetricCard.tsx [app-ssr] (ecmascript)");
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
function WidgetRenderer({ widgetType, rows, columns, config }) {
    const chartConfig = config.chartConfig;
    switch(widgetType){
        case 'table':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WidgetTable"], {
                rows: rows,
                columns: columns
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                lineNumber: 26,
                columnNumber: 14
            }, this);
        case 'bar':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetBarChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WidgetBarChart"], {
                rows: rows,
                columns: columns,
                chartConfig: chartConfig
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                lineNumber: 28,
                columnNumber: 14
            }, this);
        case 'horizontal_bar':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetHBarChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WidgetHBarChart"], {
                rows: rows,
                columns: columns,
                chartConfig: chartConfig
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                lineNumber: 30,
                columnNumber: 14
            }, this);
        case 'pie':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetPieChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WidgetPieChart"], {
                rows: rows,
                columns: columns,
                chartConfig: chartConfig
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                lineNumber: 32,
                columnNumber: 14
            }, this);
        case 'line':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetLineChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WidgetLineChart"], {
                rows: rows,
                columns: columns,
                chartConfig: chartConfig
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                lineNumber: 34,
                columnNumber: 14
            }, this);
        case 'area':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetAreaChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WidgetAreaChart"], {
                rows: rows,
                columns: columns,
                chartConfig: chartConfig
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                lineNumber: 36,
                columnNumber: 14
            }, this);
        case 'heatmap':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetHeatmap$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WidgetHeatmap"], {
                rows: rows,
                columns: columns,
                chartConfig: chartConfig
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                lineNumber: 38,
                columnNumber: 14
            }, this);
        case 'metric':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$charts$2f$WidgetMetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WidgetMetricCard"], {
                rows: rows,
                columns: columns,
                config: config
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                lineNumber: 40,
                columnNumber: 14
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-full text-slate-500 text-xs",
                children: [
                    "Unknown widget type: ",
                    widgetType
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/WidgetRenderer.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this);
    }
}
}),
"[project]/src/components/dashboard/WidgetCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetCard",
    ()=>WidgetCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dashboard/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetRenderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/WidgetRenderer.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function SkeletonLoader() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col gap-2 p-3 animate-pulse",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-3 rounded w-2/3",
                style: {
                    background: 'var(--border)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 rounded",
                style: {
                    background: 'var(--border)',
                    opacity: 0.5
                }
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
function ErrorState({ message }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center h-full gap-2 px-4 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-medium",
                style: {
                    color: 'var(--negative, #EF4444)'
                },
                children: "Query Error"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] leading-relaxed line-clamp-3",
                style: {
                    color: 'var(--text-secondary)'
                },
                children: message
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
function EmptyState() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center h-full gap-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-2xl",
                style: {
                    color: 'var(--text-secondary)',
                    opacity: 0.4
                },
                children: "∅"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs",
                style: {
                    color: 'var(--text-secondary)'
                },
                children: "No data"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
function WidgetCard({ widget, onEdit, onDelete, onCopy }) {
    const [showToolbar, setShowToolbar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [maximized, setMaximized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmDelete, setConfirmDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const config = widget.config_json;
    const { data, loading, error, refresh } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWidgetData"])(config, widget.widget_type);
    const handleDelete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (confirmDelete) {
            onDelete(widget.id);
        } else {
            setConfirmDelete(true);
            setTimeout(()=>setConfirmDelete(false), 3000);
        }
    }, [
        confirmDelete,
        onDelete,
        widget.id
    ]);
    const handleCsvDownload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!data?.rows?.length) return;
        const cols = data.columns;
        const header = cols.map((c)=>c.label).join(',');
        const rows = data.rows.map((r)=>cols.map((c)=>{
                const v = r[c.id];
                return typeof v === 'string' && v.includes(',') ? `"${v}"` : String(v ?? '');
            }).join(','));
        const csv = [
            header,
            ...rows
        ].join('\n');
        const blob = new Blob([
            csv
        ], {
            type: 'text/csv'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${widget.title.replace(/\s+/g, '_')}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }, [
        data,
        widget.title
    ]);
    const cardContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-col rounded-lg overflow-hidden ${maximized ? 'fixed inset-4 z-50 shadow-2xl' : 'h-full'}`,
        style: {
            background: 'var(--surface)',
            border: '1px solid var(--border)'
        },
        onMouseEnter: ()=>setShowToolbar(true),
        onMouseLeave: ()=>{
            setShowToolbar(false);
            setConfirmDelete(false);
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "widget-drag-handle flex items-center justify-between px-3 py-2 flex-shrink-0",
                style: {
                    borderBottom: '1px solid var(--border)',
                    cursor: 'grab'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WidgetTypeIcon, {
                                type: widget.widget_type
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px] font-medium truncate",
                                style: {
                                    color: 'var(--text-primary)'
                                },
                                children: widget.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono shrink-0",
                                style: {
                                    color: 'var(--text-secondary)',
                                    opacity: 0.6
                                },
                                children: [
                                    data.total.toLocaleString(),
                                    " rows"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center gap-0.5 transition-opacity duration-150 ${showToolbar ? 'opacity-100' : 'opacity-0'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarBtn, {
                                title: "Refresh",
                                onClick: refresh,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-3 h-3",
                                    viewBox: "0 0 16 16",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M2 8a6 6 0 1 0 1.5-3.9M2 4v3h3",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarBtn, {
                                title: "Download CSV",
                                onClick: handleCsvDownload,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-3 h-3",
                                    viewBox: "0 0 16 16",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M8 2v8M5 7l3 3 3-3M3 13h10",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarBtn, {
                                title: "Copy widget",
                                onClick: ()=>onCopy(widget),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-3 h-3",
                                    viewBox: "0 0 16 16",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "5",
                                            y: "5",
                                            width: "9",
                                            height: "9",
                                            rx: "1.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                            lineNumber: 124,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M3 11V3h8",
                                            strokeLinecap: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarBtn, {
                                title: maximized ? 'Restore' : 'Maximize',
                                onClick: ()=>setMaximized((m)=>!m),
                                children: maximized ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-3 h-3",
                                    viewBox: "0 0 16 16",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M5 11H2v3M11 5h3V2M2 14l4-4M14 2l-4 4",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-3 h-3",
                                    viewBox: "0 0 16 16",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                    lineNumber: 134,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarBtn, {
                                title: "Edit widget",
                                onClick: ()=>onEdit(widget),
                                highlight: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-3 h-3",
                                    viewBox: "0 0 16 16",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M11.5 2.5l2 2-8 8H3.5v-2l8-8Z",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarBtn, {
                                title: confirmDelete ? 'Click again to confirm' : 'Delete widget',
                                onClick: handleDelete,
                                danger: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-3 h-3",
                                    viewBox: "0 0 16 16",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M3 4h10M6 4V2h4v2M5 4v9h6V4",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-h-0 p-1",
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLoader, {}, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                        lineNumber: 158,
                        columnNumber: 21
                    }, this),
                    !loading && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorState, {
                        message: error
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                        lineNumber: 159,
                        columnNumber: 31
                    }, this),
                    !loading && !error && data && data.rows.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {}, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                        lineNumber: 160,
                        columnNumber: 66
                    }, this),
                    !loading && !error && data && data.rows.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetRenderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WidgetRenderer"], {
                        widgetType: widget.widget_type,
                        rows: data.rows,
                        columns: data.columns,
                        config: config
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            cardContent,
            maximized && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 z-40",
                onClick: ()=>setMaximized(false)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
                lineNumber: 177,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
// ── Sub-components ────────────────────────────────────────────────────────────
function ToolbarBtn({ children, title, onClick, highlight, danger }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        title: title,
        onMouseDown: (e)=>e.stopPropagation(),
        onClick: (e)=>{
            e.stopPropagation();
            onClick();
        },
        className: "p-1.5 rounded transition-colors",
        style: {
            color: danger ? 'var(--text-secondary)' : highlight ? 'var(--text-secondary)' : 'var(--text-secondary)'
        },
        onMouseEnter: (e)=>{
            const el = e.currentTarget;
            el.style.color = danger ? '#EF4444' : highlight ? 'var(--accent-brand)' : 'var(--text-primary)';
            el.style.background = danger ? 'rgba(239,68,68,0.1)' : highlight ? 'rgba(var(--brand-tint-rgb,245,158,11),0.15)' : 'var(--bg-hover)';
        },
        onMouseLeave: (e)=>{
            const el = e.currentTarget;
            el.style.color = 'var(--text-secondary)';
            el.style.background = 'transparent';
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
        lineNumber: 202,
        columnNumber: 5
    }, this);
}
function WidgetTypeIcon({ type }) {
    const icons = {
        table: '⊞',
        bar: '▬',
        horizontal_bar: '≡',
        pie: '◔',
        line: '∿',
        area: '◬',
        heatmap: '▦',
        metric: '#'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-[10px] font-mono shrink-0",
        style: {
            color: 'var(--accent-brand)'
        },
        children: icons[type] ?? '?'
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/WidgetCard.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/dashboard/WidgetGrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WidgetGrid",
    ()=>WidgetGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$grid$2d$layout$2f$dist$2f$chunk$2d$XM2M6TC6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-grid-layout/dist/chunk-XM2M6TC6.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$grid$2d$layout$2f$dist$2f$chunk$2d$YFVX5RDK$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-grid-layout/dist/chunk-YFVX5RDK.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/WidgetCard.tsx [app-ssr] (ecmascript)");
'use client';
;
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
    const { width, containerRef, mounted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$grid$2d$layout$2f$dist$2f$chunk$2d$YFVX5RDK$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContainerWidth"])({
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
    const handleLayoutChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newLayout, _allLayouts)=>{
        const mapped = [
            ...newLayout
        ].map((l)=>({
                i: l.i,
                x: l.x,
                y: l.y,
                w: l.w,
                h: l.h
            }));
        onLayoutChange(mapped);
    }, [
        onLayoutChange
    ]);
    if (widgets.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            className: "flex flex-col items-center justify-center min-h-[60vh] gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-5xl",
                    style: {
                        color: 'var(--text-secondary)',
                        opacity: 0.3
                    },
                    children: "⊞"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-medium",
                    style: {
                        color: 'var(--text-secondary)'
                    },
                    children: "No widgets yet"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-center max-w-sm",
                    style: {
                        color: 'var(--text-secondary)',
                        opacity: 0.6
                    },
                    children: [
                        "Click ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            style: {
                                color: 'var(--accent-brand)'
                            },
                            children: "+ Add Widget"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
                            lineNumber: 81,
                            columnNumber: 17
                        }, this),
                        " in the toolbar to add your first widget."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "w-full",
        children: mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$grid$2d$layout$2f$dist$2f$chunk$2d$XM2M6TC6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveGridLayout"], {
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
            children: widgets.map((widget)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: '100%'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WidgetCard"], {
                        widget: widget,
                        onEdit: onEditWidget,
                        onDelete: onDeleteWidget,
                        onCopy: onCopyWidget
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
                        lineNumber: 104,
                        columnNumber: 15
                    }, this)
                }, widget.id, false, {
                    fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
                    lineNumber: 103,
                    columnNumber: 13
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
            lineNumber: 90,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/WidgetGrid.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/dashboard/presets.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/components/dashboard/AddWidgetDialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddWidgetDialog",
    ()=>AddWidgetDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dashboard/presets.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const CATEGORIES = [
    'All',
    ...Array.from(new Set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESET_WIDGETS"].map((p)=>p.category)))
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
function AddWidgetDialog({ onAdd, onClose }) {
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('All');
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESET_WIDGETS"].filter((p)=>{
        const matchCat = activeCategory === 'All' || p.category === activeCategory;
        const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl",
            style: {
                background: 'var(--surface)',
                border: '1px solid var(--border)'
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-5 py-4",
                    style: {
                        borderBottom: '1px solid var(--border)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-sm font-semibold",
                            style: {
                                color: 'var(--text-primary)'
                            },
                            children: "Add Widget"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "transition-colors p-1 rounded",
                            style: {
                                color: 'var(--text-secondary)'
                            },
                            onMouseEnter: (e)=>{
                                e.currentTarget.style.color = 'var(--text-primary)';
                            },
                            onMouseLeave: (e)=>{
                                e.currentTarget.style.color = 'var(--text-secondary)';
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                viewBox: "0 0 16 16",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "1.5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M3 3l10 10M13 3L3 13",
                                    strokeLinecap: "round"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-5 py-3",
                    style: {
                        borderBottom: '1px solid var(--border)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        autoFocus: true,
                        value: search,
                        onChange: (e)=>setSearch(e.target.value),
                        placeholder: "Search widgets…",
                        className: "w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors",
                        style: {
                            background: 'var(--bg-hover)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-primary)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-1 px-5 py-2 overflow-x-auto scrollbar-none",
                    style: {
                        borderBottom: '1px solid var(--border)'
                    },
                    children: CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveCategory(cat),
                            className: "px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors",
                            style: activeCategory === cat ? {
                                background: 'var(--selection-bg, rgba(245,158,11,0.15))',
                                color: 'var(--accent-brand)',
                                border: '1px solid var(--selection-border, rgba(245,158,11,0.3))'
                            } : {
                                color: 'var(--text-secondary)',
                                border: '1px solid transparent'
                            },
                            children: cat
                        }, cat, false, {
                            fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-4",
                    children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center h-32 text-sm",
                        style: {
                            color: 'var(--text-secondary)'
                        },
                        children: "No widgets found"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                        lineNumber: 101,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: filtered.map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onAdd(preset),
                                className: "group flex flex-col gap-2 p-4 rounded-lg text-left transition-all",
                                style: {
                                    background: 'var(--bg-hover)',
                                    border: '1px solid var(--border)'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.borderColor = 'var(--accent-brand)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-base font-mono",
                                                        style: {
                                                            color: 'var(--accent-brand)',
                                                            opacity: 0.8
                                                        },
                                                        children: TYPE_ICONS[preset.widget_type]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                                        lineNumber: 117,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-medium",
                                                        style: {
                                                            color: 'var(--text-primary)'
                                                        },
                                                        children: preset.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                                lineNumber: 116,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-mono",
                                                style: {
                                                    color: 'var(--text-secondary)',
                                                    opacity: 0.6
                                                },
                                                children: TYPE_LABELS[preset.widget_type]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                                lineNumber: 124,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                        lineNumber: 115,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] leading-relaxed line-clamp-2",
                                        style: {
                                            color: 'var(--text-secondary)'
                                        },
                                        children: preset.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                        lineNumber: 128,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 mt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] px-1.5 py-0.5 rounded",
                                                style: {
                                                    background: 'var(--surface)',
                                                    color: 'var(--text-secondary)',
                                                    border: '1px solid var(--border)'
                                                },
                                                children: preset.category
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                                lineNumber: 132,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px]",
                                                style: {
                                                    color: 'var(--text-secondary)',
                                                    opacity: 0.6
                                                },
                                                children: [
                                                    preset.config.columns.length,
                                                    " cols"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                                lineNumber: 135,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                        lineNumber: 131,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, preset.id, true, {
                                fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                                lineNumber: 107,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                        lineNumber: 105,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/AddWidgetDialog.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/(app)/dashboard/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dashboard/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$DashboardToolbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/DashboardToolbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/WidgetGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$AddWidgetDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/AddWidgetDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dashboard/presets.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function DashboardPage() {
    const { dashboards, loading: listLoading, createDashboard, reload: reloadList } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDashboardList"])();
    const [activeDashboardId, setActiveDashboardId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAddWidget, setShowAddWidget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingWidget, setEditingWidget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const resolvedId = activeDashboardId ?? dashboards[0]?.id ?? null;
    const { dashboard, loading: dashLoading, saving, saveLayout, renameDashboard, deleteDashboard, duplicateDashboard, addWidget, updateWidget, deleteWidget, reload: reloadDashboard } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDashboard"])(resolvedId);
    // Auto-select first dashboard when list loads
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!activeDashboardId && dashboards.length > 0) {
            setActiveDashboardId(dashboards[0].id);
        }
    }, [
        dashboards,
        activeDashboardId
    ]);
    const handleSelectDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setActiveDashboardId(id);
    }, []);
    const handleCreateDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (name)=>{
        const created = await createDashboard(name);
        if (!created) return;
        // Seed default widgets and build initial layout
        const seedLayout = [];
        let packX = 0, packY = 0, packRowH = 0;
        for (const presetId of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PRESET_IDS"]){
            const preset = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESET_WIDGETS"].find((p)=>p.id === presetId);
            if (!preset) continue;
            const res = await fetch(`/api/dashboard/${created.id}/widget`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    widget_type: preset.widget_type,
                    title: preset.name,
                    config_json: preset.config
                })
            });
            if (res.ok) {
                const data = await res.json();
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
            }
        }
        // Save the initial layout
        if (seedLayout.length > 0) {
            await fetch(`/api/dashboard/${created.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    layout_json: seedLayout
                })
            });
        }
        setActiveDashboardId(created.id);
    }, [
        createDashboard
    ]);
    const handleRenameDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (_id, name)=>{
        await renameDashboard(name);
    }, [
        renameDashboard
    ]);
    const handleDeleteDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        const ok = await deleteDashboard();
        if (ok) {
            await reloadList();
            const remaining = dashboards.filter((d)=>d.id !== id);
            setActiveDashboardId(remaining[0]?.id ?? null);
        }
    }, [
        deleteDashboard,
        reloadList,
        dashboards
    ]);
    const handleDuplicateDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (_id)=>{
        const newId = await duplicateDashboard();
        if (newId) {
            await reloadList();
            setActiveDashboardId(newId);
        }
    }, [
        duplicateDashboard,
        reloadList
    ]);
    const handleAddPreset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (preset)=>{
        setShowAddWidget(false);
        const widget = await addWidget(preset.widget_type, preset.name, preset.config);
        if (widget && dashboard) {
            // Compute x,y for the new widget by appending after existing layout
            const existingLayout = dashboard.layout_json ?? [];
            const maxY = existingLayout.reduce((m, l)=>Math.max(m, l.y + l.h), 0);
            const usedX = existingLayout.filter((l)=>l.y + l.h >= maxY).reduce((m, l)=>Math.max(m, l.x + l.w), 0);
            const w = preset.defaultLayout.w;
            const h = preset.defaultLayout.h;
            const x = usedX + w <= 12 ? usedX : 0;
            const y = maxY;
            const newLayout = [
                ...existingLayout,
                {
                    i: widget.id,
                    x,
                    y,
                    w,
                    h
                }
            ];
            saveLayout(newLayout);
        }
    }, [
        addWidget,
        dashboard,
        saveLayout
    ]);
    const handleDeleteWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (widgetId)=>{
        await deleteWidget(widgetId);
    }, [
        deleteWidget
    ]);
    const handleCopyWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (widget)=>{
        await addWidget(widget.widget_type, `${widget.title} (copy)`, widget.config_json);
    }, [
        addWidget
    ]);
    const handleResetToDefaults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        if (!dashboard) return;
        // Delete all existing widgets
        for (const w of dashboard.widgets ?? []){
            await fetch(`/api/dashboard/${id}/widget/${w.id}`, {
                method: 'DELETE'
            });
        }
        // Re-seed with defaults + layout
        const seedLayout = [];
        let packX = 0, packY = 0, packRowH = 0;
        for (const presetId of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PRESET_IDS"]){
            const preset = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dashboard$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESET_WIDGETS"].find((p)=>p.id === presetId);
            if (!preset) continue;
            const res = await fetch(`/api/dashboard/${id}/widget`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    widget_type: preset.widget_type,
                    title: preset.name,
                    config_json: preset.config
                })
            });
            if (res.ok) {
                const data = await res.json();
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
            }
        }
        if (seedLayout.length > 0) {
            await fetch(`/api/dashboard/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    layout_json: seedLayout
                })
            });
        }
        reloadDashboard();
    }, [
        dashboard,
        reloadDashboard
    ]);
    const handleLayoutChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((layout)=>{
        saveLayout(layout);
    }, [
        saveLayout
    ]);
    const isLoading = listLoading || dashLoading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col",
        style: {
            margin: '-1rem -1rem 0'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$DashboardToolbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DashboardToolbar"], {
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
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto min-h-0",
                style: {
                    padding: '12px 16px'
                },
                children: isLoading && !dashboard ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DashboardSkeleton, {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 200,
                    columnNumber: 11
                }, this) : !dashboard ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyDashboardState, {
                    onCreate: ()=>handleCreateDashboard('My Dashboard')
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 202,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$WidgetGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WidgetGrid"], {
                    widgets: dashboard.widgets ?? [],
                    layout: dashboard.layout_json ?? [],
                    onLayoutChange: handleLayoutChange,
                    onEditWidget: (w)=>setEditingWidget(w),
                    onDeleteWidget: handleDeleteWidget,
                    onCopyWidget: handleCopyWidget
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 204,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            showAddWidget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$AddWidgetDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddWidgetDialog"], {
                onAdd: handleAddPreset,
                onClose: ()=>setShowAddWidget(false)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 217,
                columnNumber: 9
            }, this),
            editingWidget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                style: {
                    background: 'rgba(0,0,0,0.6)'
                },
                onClick: ()=>setEditingWidget(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl p-6 max-w-md w-full shadow-2xl",
                    style: {
                        background: 'var(--surface)',
                        border: '1px solid var(--border)'
                    },
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-sm font-semibold mb-1",
                            style: {
                                color: 'var(--text-primary)'
                            },
                            children: editingWidget.title
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                            lineNumber: 235,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs mb-4",
                            style: {
                                color: 'var(--text-secondary)'
                            },
                            children: "Widget editor coming soon. Delete and re-add from the preset library to change configuration."
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                            lineNumber: 236,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setEditingWidget(null),
                                    className: "px-3 py-1.5 text-xs rounded transition-colors",
                                    style: {
                                        color: 'var(--text-secondary)'
                                    },
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                                    lineNumber: 240,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: async ()=>{
                                        await handleDeleteWidget(editingWidget.id);
                                        setEditingWidget(null);
                                    },
                                    className: "px-3 py-1.5 text-xs rounded transition-colors",
                                    style: {
                                        background: 'rgba(239,68,68,0.1)',
                                        color: '#EF4444',
                                        border: '1px solid rgba(239,68,68,0.3)'
                                    },
                                    children: "Delete Widget"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                                    lineNumber: 247,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                            lineNumber: 239,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 230,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 225,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
// ── Sub-components ─────────────────────────────────────────────────────────────
function DashboardSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-2 gap-3 animate-pulse",
        children: [
            1,
            2,
            3,
            4
        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-64 rounded-lg",
                style: {
                    background: 'var(--bg-hover)',
                    border: '1px solid var(--border)'
                }
            }, i, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 268,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
        lineNumber: 266,
        columnNumber: 5
    }, this);
}
function EmptyDashboardState({ onCreate }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-5xl",
                style: {
                    color: 'var(--text-secondary)',
                    opacity: 0.3
                },
                children: "⊞"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-medium",
                style: {
                    color: 'var(--text-secondary)'
                },
                children: "No dashboards yet"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-center max-w-sm",
                style: {
                    color: 'var(--text-secondary)',
                    opacity: 0.6
                },
                children: "Create your first dashboard to start tracking market data with customizable widgets."
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onCreate,
                className: "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                style: {
                    background: 'var(--accent-brand)',
                    color: '#fff'
                },
                children: "Create Dashboard"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/dashboard/page.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/dashboard/page.tsx",
        lineNumber: 276,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_1c9d51cd._.js.map