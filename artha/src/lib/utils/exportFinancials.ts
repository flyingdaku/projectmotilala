/**
 * Export Financials Utility
 * Provides CSV/Excel export functionality for financial data
 */

import type { QuarterlyResult, BalanceSheet, CashFlow } from "@/lib/data/types";

export function exportToCSV(
  data: QuarterlyResult[] | BalanceSheet[] | CashFlow[],
  filename: string,
  type: "pl" | "bs" | "cf"
) {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }

  let headers: string[] = [];
  let rows: string[][] = [];

  if (type === "pl") {
    headers = [
      "Period",
      "Revenue (Cr)",
      "Operating Profit (Cr)",
      "Net Profit (Cr)",
      "EPS (₹)",
      "EBITDA Margin (%)",
      "PAT Margin (%)",
    ];
    rows = (data as QuarterlyResult[]).map((r) => [
      r.periodEnd ?? "",
      (r.revenue ?? 0).toFixed(2),
      (r.operatingProfit ?? 0).toFixed(2),
      (r.netProfit ?? 0).toFixed(2),
      (r.eps ?? 0).toFixed(2),
      (r.ebitdaMargin ?? 0).toFixed(2),
      (r.patMargin ?? 0).toFixed(2),
    ]);
  } else if (type === "bs") {
    headers = [
      "Period",
      "Total Assets (Cr)",
      "Total Equity (Cr)",
      "Total Debt (Cr)",
      "Cash (Cr)",
      "Debt/Equity",
    ];
    rows = (data as BalanceSheet[]).map((r) => [
      r.periodEndDate ?? "",
      (r.totalAssets ?? 0).toFixed(2),
      (r.totalEquity ?? 0).toFixed(2),
      (r.borrowings ?? 0).toFixed(2),
      (r.cash ?? 0).toFixed(2),
      ((r.borrowings ?? 0) / (r.totalEquity || 1)).toFixed(2),
    ]);
  } else if (type === "cf") {
    headers = [
      "Period",
      "Operating CF (Cr)",
      "Investing CF (Cr)",
      "Financing CF (Cr)",
      "Free CF (Cr)",
      "Capex (Cr)",
    ];
    rows = (data as CashFlow[]).map((r) => [
      r.periodEndDate ?? "",
      (r.operatingCF ?? 0).toFixed(2),
      (r.investingCF ?? 0).toFixed(2),
      (r.financingCF ?? 0).toFixed(2),
      (r.freeCF ?? 0).toFixed(2),
      (r.capex ?? 0).toFixed(2),
    ]);
  }

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportAllFinancials(
  quarterly: QuarterlyResult[],
  balanceSheets: BalanceSheet[],
  cashFlows: CashFlow[],
  symbol: string
) {
  const timestamp = new Date().toISOString().split("T")[0];
  
  exportToCSV(quarterly, `${symbol}_PL_${timestamp}`, "pl");
  
  setTimeout(() => {
    exportToCSV(balanceSheets, `${symbol}_BS_${timestamp}`, "bs");
  }, 100);
  
  setTimeout(() => {
    exportToCSV(cashFlows, `${symbol}_CF_${timestamp}`, "cf");
  }, 200);
}
