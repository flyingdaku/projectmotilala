import { ChartContainer } from "@/components/charting/ChartContainer";

export default async function FullChartPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  // Render fullscreen chart directly without layout
  return (
    <ChartContainer 
      symbol={symbol.toUpperCase()} 
      fullscreenMode={true} 
    />
  );
}
