'use client';

/**
 * DrawingToolbar — vertical left-side toolbar for drawing tools.
 * Activates a tool in the Zustand store; DrawingManager picks it up.
 */

import { MousePointer2, Minus, MoveHorizontal, MoveVertical, Square, TrendingUp, Type, ArrowRight, GitBranch, Trash2, Crosshair, Dot, EyeOff, Ruler } from 'lucide-react';
import React from 'react';
import { useChartStore } from '../store/useChartStore';
import type { DrawingToolType } from '../core/types';
import { cn } from '@/lib/utils';

type ToolEntry = {
  id: DrawingToolType | 'cursor';
  icon: React.ReactNode;
  label: string;
  dividerAfter?: boolean;
};

const TOOLS: ToolEntry[] = [
  { id: 'cursor',     icon: <MousePointer2 size={22} />, label: 'Select / Cursor', dividerAfter: true },
  { id: 'trendline',  icon: <TrendingUp size={22} />,    label: 'Trend Line' },
  { id: 'horzline',   icon: <Minus size={22} />,         label: 'Horizontal Line' },
  { id: 'vertline',   icon: <MoveVertical size={22} />,  label: 'Vertical Line' },
  { id: 'rectangle',  icon: <Square size={22} />,        label: 'Rectangle' },
  { id: 'fibretrace', icon: <GitBranch size={22} />,     label: 'Fibonacci Retracement' },
  { id: 'channel',    icon: <MoveHorizontal size={22} />, label: 'Parallel Channel' },
  { id: 'text',       icon: <Type size={22} />,           label: 'Text Annotation' },
  { id: 'arrow',      icon: <ArrowRight size={22} />,     label: 'Arrow', dividerAfter: true },
];

type CrosshairMode = 'normal' | 'laser' | 'dot' | 'hidden';

const CROSSHAIR_MODES: { id: CrosshairMode; icon: React.ReactNode; label: string }[] = [
  { id: 'normal', icon: <Crosshair size={22} />,      label: 'Normal Crosshair' },
  { id: 'laser',  icon: <MoveHorizontal size={22} />, label: 'Laser Pointer' },
  { id: 'dot',    icon: <Dot size={22} />,            label: 'Dot Pointer' },
  { id: 'hidden', icon: <EyeOff size={22} />,         label: 'Hide Crosshair' },
];

export function DrawingToolbar() {
  const { activeTool, setActiveTool, clearDrawings } = useChartStore();
  const [crosshairMode, setCrosshairMode] = React.useState<CrosshairMode>('normal');

  return (
    <div className="flex flex-col items-center gap-0.5 w-9 py-2 border-r border-border bg-background flex-shrink-0">
      {TOOLS.map(tool => (
        <div key={tool.id} className="flex flex-col items-center w-full">
          <button
            onClick={() => setActiveTool(tool.id as DrawingToolType | 'cursor')}
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded transition-colors',
              activeTool === tool.id
                ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
            )}
            title={tool.label}
          >
            {tool.icon}
          </button>
          {tool.dividerAfter && (
            <div className="w-5 h-px bg-border my-1" />
          )}
        </div>
      ))}

      {/* Crosshair modes */}
      {CROSSHAIR_MODES.map(mode => (
        <button
          key={mode.id}
          onClick={() => setCrosshairMode(mode.id)}
          className={cn(
            'w-8 h-8 flex items-center justify-center rounded transition-colors',
            crosshairMode === mode.id
              ? 'bg-blue-500/20 text-blue-500 border border-blue-500/40'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
          )}
          title={mode.label}
        >
          {mode.icon}
        </button>
      ))}

      <div className="w-5 h-px bg-border my-1" />

      {/* Measuring tool */}
      <button
        onClick={() => setActiveTool('measure')}
        className={cn(
          'w-8 h-8 flex items-center justify-center rounded transition-colors',
          activeTool === 'measure'
            ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
        )}
        title="Measuring Tool"
      >
        <Ruler size={22} />
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Clear drawings */}
      <button
        onClick={clearDrawings}
        className="w-8 h-8 flex items-center justify-center rounded text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
        title="Clear all drawings"
      >
        <Trash2 size={22} />
      </button>
    </div>
  );
}
