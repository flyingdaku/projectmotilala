'use client';

import React, { useCallback } from 'react';
import { ResponsiveGridLayout, useContainerWidth } from 'react-grid-layout';
import type { Layout, LayoutItem, ResponsiveLayouts } from 'react-grid-layout';
import type { UserWidget, GridLayoutItem } from '@/lib/dashboard/types';
import { WidgetCard } from './WidgetCard';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface Props {
  widgets: UserWidget[];
  layout: GridLayoutItem[];
  onLayoutChange: (layout: GridLayoutItem[]) => void;
  onEditWidget: (widget: UserWidget) => void;
  onDeleteWidget: (widgetId: string) => void;
  onCopyWidget: (widget: UserWidget) => void;
}

const COLS = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
const ROW_HEIGHT = 56;
const BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

export function WidgetGrid({
  widgets,
  layout,
  onLayoutChange,
  onEditWidget,
  onDeleteWidget,
  onCopyWidget,
}: Props) {
  const { width, containerRef, mounted } = useContainerWidth({ initialWidth: 1280 });

  // Build layout items — merge stored layout with any new widgets not in layout yet
  // For new widgets without a stored position, pack them row-by-row
  const TOTAL_COLS = 12;
  let packX = 0;
  let packY = 0;
  let packRowH = 0;

  const layoutItems: LayoutItem[] = widgets.map((w) => {
    const stored = layout.find(l => l.i === w.id);
    if (stored) {
      return { i: stored.i, x: stored.x, y: stored.y, w: stored.w, h: stored.h, minW: 3, minH: 4 };
    }
    // Auto-place: pack left-to-right, wrap to next row
    const ww = 6;
    const wh = 7;
    if (packX + ww > TOTAL_COLS) {
      packY += packRowH;
      packX = 0;
      packRowH = 0;
    }
    const item: LayoutItem = { i: w.id, x: packX, y: packY, w: ww, h: wh, minW: 3, minH: 4 };
    packX += ww;
    packRowH = Math.max(packRowH, wh);
    return item;
  });

  const handleLayoutChange = useCallback(
    (newLayout: Layout, _allLayouts: ResponsiveLayouts) => {
      const mapped: GridLayoutItem[] = [...newLayout].map((l: LayoutItem) => ({
        i: l.i,
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h,
      }));
      onLayoutChange(mapped);
    },
    [onLayoutChange]
  );

  if (widgets.length === 0) {
    return (
      <div ref={containerRef} className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-5xl" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>⊞</div>
        <h3 className="font-medium" style={{ color: 'var(--text-secondary)' }}>No widgets yet</h3>
        <p className="text-sm text-center max-w-sm" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
          Click <strong style={{ color: 'var(--accent-brand)' }}>+ Add Widget</strong> in the toolbar to add your first widget.
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      {mounted && (
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layoutItems, md: layoutItems, sm: layoutItems }}
          cols={COLS}
          rowHeight={ROW_HEIGHT}
          breakpoints={BREAKPOINTS}
          width={width}
          onLayoutChange={handleLayoutChange}
          dragConfig={{ handle: '.widget-drag-handle' }}
          margin={[10, 10] as [number, number]}
          containerPadding={[0, 0] as [number, number]}
        >
          {widgets.map(widget => (
            <div key={widget.id} style={{ height: '100%' }}>
              <WidgetCard
                widget={widget}
                onEdit={onEditWidget}
                onDelete={onDeleteWidget}
                onCopy={onCopyWidget}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </div>
  );
}
