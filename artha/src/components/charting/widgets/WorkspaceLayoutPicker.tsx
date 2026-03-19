'use client';

import { Check, ChevronDown, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  getWorkspaceLayout,
  WORKSPACE_LAYOUT_OPTIONS,
  type WorkspaceLayout,
} from '../workspace-layouts';

function LayoutPreview({ layoutId }: { layoutId: WorkspaceLayout }) {
  const layout = getWorkspaceLayout(layoutId);
  const previewClassName = {
    single: 'grid-cols-1 grid-rows-1',
    'two-up': 'grid-cols-2 grid-rows-1',
    quad: 'grid-cols-2 grid-rows-2',
    nine: 'grid-cols-3 grid-rows-3',
    'hero-bottom': 'grid-cols-2 grid-rows-[1.5fr_1fr]',
  }[layoutId];

  return (
    <div className={cn('grid h-9 w-11 gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-app)] p-1', previewClassName)}>
      {layout.cells.map((cell) => (
        <span
          key={cell.key}
          className={cn(
            'rounded-[3px] border border-[var(--border)] bg-[var(--bg-card)]',
            layoutId === 'hero-bottom' && cell.key === 'hero' ? 'col-span-2' : null
          )}
        />
      ))}
    </div>
  );
}

interface WorkspaceLayoutPickerProps {
  value: WorkspaceLayout;
  onChange: (layout: WorkspaceLayout) => void;
}

export function WorkspaceLayoutPicker({ value, onChange }: WorkspaceLayoutPickerProps) {
  const activeLayout = getWorkspaceLayout(value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={value === 'single' ? 'outline' : 'selected'} size="sm" className="gap-2">
          <LayoutGrid size={15} />
          <span className="hidden sm:inline">{activeLayout.label}</span>
          <span className="rounded-full bg-[var(--brand-tint)] px-2 py-0.5 text-[10px] font-semibold text-[var(--brand-primary)]">
            {activeLayout.panelCount}
          </span>
          <ChevronDown size={14} className="text-[var(--text-muted)]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[22rem]">
        <DropdownMenuLabel>Chart layouts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {WORKSPACE_LAYOUT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => onChange(option.id)}
            className="items-start gap-3 rounded-md px-3 py-2"
          >
            <LayoutPreview layoutId={option.id} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--text-primary)]">{option.label}</span>
                  <span className="rounded-full bg-[var(--bg-hover)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                    {option.shortLabel}
                  </span>
                </div>
                {value === option.id ? <Check size={14} className="text-[var(--brand-primary)]" /> : null}
              </div>
              <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{option.description}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
