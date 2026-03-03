"use client";

import { useState } from "react";
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { formatINR, formatPercent } from "@/lib/utils";

type TxType = "BUY" | "SELL" | "DIVIDEND" | "BONUS";

interface Transaction {
  id: string;
  date: string;
  symbol: string;
  name: string;
  type: TxType;
  qty: number;
  price: number;
  amount: number;
  exchange: string;
}

const TRANSACTIONS: Transaction[] = [
  { id: "t1", date: "2025-03-12", symbol: "RELIANCE", name: "Reliance Industries", type: "BUY", qty: 10, price: 2891.4, amount: 28914, exchange: "NSE" },
  { id: "t2", date: "2025-03-10", symbol: "HDFCBANK", name: "HDFC Bank", type: "SELL", qty: 25, price: 1543.8, amount: 38595, exchange: "NSE" },
  { id: "t3", date: "2025-03-08", symbol: "INFY", name: "Infosys Ltd", type: "BUY", qty: 50, price: 1724.5, amount: 86225, exchange: "NSE" },
  { id: "t4", date: "2025-03-05", symbol: "TCS", name: "Tata Consultancy", type: "DIVIDEND", qty: 100, price: 28, amount: 2800, exchange: "NSE" },
  { id: "t5", date: "2025-02-28", symbol: "WIPRO", name: "Wipro Ltd", type: "BUY", qty: 200, price: 512.8, amount: 102560, exchange: "BSE" },
  { id: "t6", date: "2025-02-20", symbol: "AXISBANK", name: "Axis Bank", type: "SELL", qty: 40, price: 1124.6, amount: 44984, exchange: "NSE" },
  { id: "t7", date: "2025-02-14", symbol: "BAJFINANCE", name: "Bajaj Finance", type: "BUY", qty: 5, price: 7234.1, amount: 36170.5, exchange: "NSE" },
  { id: "t8", date: "2025-02-10", symbol: "MARUTI", name: "Maruti Suzuki", type: "SELL", qty: 3, price: 9875.5, amount: 29626.5, exchange: "NSE" },
  { id: "t9", date: "2025-01-28", symbol: "SUNPHARMA", name: "Sun Pharma", type: "BUY", qty: 30, price: 1642.3, amount: 49269, exchange: "NSE" },
  { id: "t10", date: "2025-01-15", symbol: "HDFCBANK", name: "HDFC Bank", type: "BONUS", qty: 50, price: 0, amount: 0, exchange: "NSE" },
];

const TYPE_COLORS: Record<TxType, string> = {
  BUY: "#10B981",
  SELL: "#EF4444",
  DIVIDEND: "#3B82F6",
  BONUS: "#F59E0B",
};

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | TxType>("ALL");

  const filtered = TRANSACTIONS.filter(t =>
    (typeFilter === "ALL" || t.type === typeFilter) &&
    (search === "" || t.symbol.toLowerCase().includes(search.toLowerCase()) || t.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Transactions</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Complete history of all buy, sell, dividend, and bonus transactions.</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-white/5"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search symbol or company..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border outline-none transition-colors"
            style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
        </div>
        <div className="flex gap-1">
          {(["ALL", "BUY", "SELL", "DIVIDEND", "BONUS"] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className="px-3 py-2 rounded-lg text-xs font-semibold transition-colors border"
              style={{
                background: typeFilter === t ? (t === "ALL" ? "var(--surface-elevated)" : TYPE_COLORS[t as TxType] + "20") : "transparent",
                color: t === "ALL" ? (typeFilter === t ? "var(--text-primary)" : "var(--text-muted)") : TYPE_COLORS[t as TxType],
                borderColor: typeFilter === t ? (t === "ALL" ? "var(--border)" : TYPE_COLORS[t as TxType]) : "var(--border)",
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: "var(--surface-elevated)", borderBottom: "1px solid var(--border)" }}>
              {["Date", "Symbol", "Type", "Qty", "Price", "Amount", "Exchange"].map(h => (
                <th key={h} className={`py-3 font-semibold ${h === "Date" || h === "Symbol" ? "text-left px-4" : "text-right px-4"}`}
                  style={{ color: "var(--text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx, i) => (
              <tr key={tx.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", background: "var(--surface)" }}
                className="hover:opacity-80 transition-opacity">
                <td className="px-4 py-3 font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>{tx.date}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold" style={{ color: "var(--text-primary)" }}>{tx.symbol}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>{tx.name}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 justify-end font-semibold" style={{ color: TYPE_COLORS[tx.type] }}>
                    {tx.type === "BUY" && <ArrowDownLeft size={11} />}
                    {tx.type === "SELL" && <ArrowUpRight size={11} />}
                    {tx.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono" style={{ color: "var(--text-secondary)" }}>{tx.qty.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right font-mono" style={{ color: "var(--text-secondary)" }}>
                  {tx.price > 0 ? `₹${tx.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
                </td>
                <td className="px-4 py-3 text-right font-mono font-semibold" style={{ color: tx.type === "SELL" ? "#EF4444" : tx.amount > 0 ? "#10B981" : "var(--text-muted)" }}>
                  {tx.amount > 0 ? `₹${tx.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "—"}
                </td>
                <td className="px-4 py-3 text-right text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>{tx.exchange}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm" style={{ color: "var(--text-muted)" }}>No transactions found.</div>
        )}
      </div>
    </div>
  );
}
