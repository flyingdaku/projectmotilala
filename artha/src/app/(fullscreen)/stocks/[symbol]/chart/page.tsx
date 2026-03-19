import { ChartContainer } from "@/components/charting/ChartContainer";
import { MultiChartWorkspace } from "@/components/charting/MultiChartWorkspace";
import { isWorkspaceLayout } from "@/components/charting/workspace-layouts";

type FullChartPageProps = {
  params: Promise<{ symbol: string }>;
  searchParams: Promise<{ embed?: string; layout?: string; panel?: string }>;
};

export default async function FullChartPage({ params, searchParams }: FullChartPageProps) {
  const { symbol } = await params;
  const resolvedSearchParams = await searchParams;
  const normalizedSymbol = symbol.toUpperCase();
  const panel = Number(resolvedSearchParams.panel);

  if (resolvedSearchParams.embed === '1') {
    return (
      <ChartContainer
        symbol={normalizedSymbol}
        embeddedPanel
        panelNumber={Number.isFinite(panel) && panel > 0 ? panel : undefined}
      />
    );
  }

  return (
    <MultiChartWorkspace
      symbol={normalizedSymbol}
      initialLayout={isWorkspaceLayout(resolvedSearchParams.layout) ? resolvedSearchParams.layout : 'single'}
    />
  );
}
