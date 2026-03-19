export type WorkspaceLayout = 'single' | 'two-up' | 'quad' | 'nine' | 'hero-bottom';

export interface LayoutOption {
  id: WorkspaceLayout;
  label: string;
  shortLabel: string;
  description: string;
  panelCount: number;
  gridClassName: string;
  cells: Array<{ key: string; className?: string }>;
}

export const WORKSPACE_LAYOUT_STORAGE_KEY = 'artha.chart.workspaceLayout';

export const WORKSPACE_LAYOUT_OPTIONS: LayoutOption[] = [
  {
    id: 'single',
    label: 'Single chart',
    shortLabel: '1-up',
    description: 'One focused chart view',
    panelCount: 1,
    gridClassName: 'grid-cols-1 grid-rows-1',
    cells: [{ key: 'single' }],
  },
  {
    id: 'two-up',
    label: '2 charts',
    shortLabel: '2-up',
    description: 'Side-by-side comparison',
    panelCount: 2,
    gridClassName: 'grid-cols-1 md:grid-cols-2',
    cells: [{ key: 'left' }, { key: 'right' }],
  },
  {
    id: 'quad',
    label: '4 charts',
    shortLabel: '4-up',
    description: 'Balanced 2 x 2 grid',
    panelCount: 4,
    gridClassName: 'grid-cols-1 md:grid-cols-2 md:grid-rows-2',
    cells: [{ key: 'q1' }, { key: 'q2' }, { key: 'q3' }, { key: 'q4' }],
  },
  {
    id: 'nine',
    label: '9 charts',
    shortLabel: '9-up',
    description: 'Dense market monitor',
    panelCount: 9,
    gridClassName: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-3',
    cells: [
      { key: 'n1' }, { key: 'n2' }, { key: 'n3' },
      { key: 'n4' }, { key: 'n5' }, { key: 'n6' },
      { key: 'n7' }, { key: 'n8' }, { key: 'n9' },
    ],
  },
  {
    id: 'hero-bottom',
    label: '1 big + 2 small',
    shortLabel: 'Focus',
    description: 'Primary chart with two smaller charts below',
    panelCount: 3,
    gridClassName: 'grid-cols-1 md:grid-cols-2 md:grid-rows-[minmax(0,1.6fr)_minmax(0,1fr)]',
    cells: [
      { key: 'hero', className: 'md:col-span-2' },
      { key: 'bottom-left' },
      { key: 'bottom-right' },
    ],
  },
];

export function getWorkspaceLayout(layout: WorkspaceLayout): LayoutOption {
  return WORKSPACE_LAYOUT_OPTIONS.find((option) => option.id === layout) ?? WORKSPACE_LAYOUT_OPTIONS[0];
}

export function isWorkspaceLayout(value: string | undefined): value is WorkspaceLayout {
  return WORKSPACE_LAYOUT_OPTIONS.some((option) => option.id === value);
}
