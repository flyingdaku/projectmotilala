'use client';

import React from 'react';
import type { WidgetType, WidgetConfig, WidgetColumn } from '@/lib/dashboard/types';
import { WidgetTable } from './charts/WidgetTable';
import { WidgetBarChart } from './charts/WidgetBarChart';
import { WidgetHBarChart } from './charts/WidgetHBarChart';
import { WidgetPieChart } from './charts/WidgetPieChart';
import { WidgetLineChart } from './charts/WidgetLineChart';
import { WidgetAreaChart } from './charts/WidgetAreaChart';
import { WidgetHeatmap } from './charts/WidgetHeatmap';
import { WidgetMetricCard } from './charts/WidgetMetricCard';

interface Props {
  widgetType: WidgetType;
  rows: Record<string, unknown>[];
  columns: WidgetColumn[];
  config: WidgetConfig;
}

export function WidgetRenderer({ widgetType, rows, columns, config }: Props) {
  const chartConfig = config.chartConfig;

  switch (widgetType) {
    case 'table':
      return <WidgetTable rows={rows} columns={columns} />;
    case 'bar':
      return <WidgetBarChart rows={rows} columns={columns} chartConfig={chartConfig} />;
    case 'horizontal_bar':
      return <WidgetHBarChart rows={rows} columns={columns} chartConfig={chartConfig} />;
    case 'pie':
      return <WidgetPieChart rows={rows} columns={columns} chartConfig={chartConfig} />;
    case 'line':
      return <WidgetLineChart rows={rows} columns={columns} chartConfig={chartConfig} />;
    case 'area':
      return <WidgetAreaChart rows={rows} columns={columns} chartConfig={chartConfig} />;
    case 'heatmap':
      return <WidgetHeatmap rows={rows} columns={columns} chartConfig={chartConfig} />;
    case 'metric':
      return <WidgetMetricCard rows={rows} columns={columns} config={config} />;
    default:
      return (
        <div className="flex items-center justify-center h-full text-slate-500 text-xs">
          Unknown widget type: {widgetType}
        </div>
      );
  }
}
