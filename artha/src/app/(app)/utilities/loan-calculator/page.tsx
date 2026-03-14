"use client";

import React, { useState, useMemo } from "react";
import { Info } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatINR } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-lg border text-xs shadow-lg" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <p className="font-medium mb-1" style={{ color: "var(--text-primary)" }}>Year {label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <span className="font-mono font-medium">{formatINR(p.value)}</span></p>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PieTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-lg border text-xs shadow-lg" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <p style={{ color: "var(--text-primary)" }}>{payload[0].name}: <span className="font-mono font-medium">{formatINR(payload[0].value)}</span></p>
    </div>
  );
}

const LOAN_TYPES = [
  { label: "Home Loan", rate: 8.75, tenure: 20 },
  { label: "Car Loan", rate: 9.5, tenure: 7 },
  { label: "Personal Loan", rate: 14.0, tenure: 5 },
  { label: "Education Loan", rate: 10.5, tenure: 10 },
  { label: "Business Loan", rate: 13.0, tenure: 7 },
  { label: "Custom", rate: 10.0, tenure: 10 },
];

const COLORS = ["var(--accent-brand)", "var(--negative)"];

function computeEMI(principal: number, annualRate: number, tenureYears: number): number {
  const r = annualRate / 100 / 12;
  const n = tenureYears * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function buildAmortization(principal: number, annualRate: number, tenureYears: number) {
  const r = annualRate / 100 / 12;
  const n = tenureYears * 12;
  const emi = computeEMI(principal, annualRate, tenureYears);
  let balance = principal;
  const monthly: { month: number; emi: number; principal: number; interest: number; balance: number }[] = [];
  const yearly: { year: number; principal: number; interest: number; balance: number }[] = [];

  let yearPrincipal = 0;
  let yearInterest = 0;

  for (let m = 1; m <= n; m++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);

    monthly.push({ month: m, emi: Math.round(emi), principal: Math.round(principalPaid), interest: Math.round(interest), balance: Math.round(balance) });
    yearPrincipal += principalPaid;
    yearInterest += interest;

    if (m % 12 === 0) {
      yearly.push({ year: m / 12, principal: Math.round(yearPrincipal), interest: Math.round(yearInterest), balance: Math.round(balance) });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  return { monthly, yearly, emi: Math.round(emi) };
}

export default function LoanCalculatorPage() {
  const [loanTypeIdx, setLoanTypeIdx] = useState(0);
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(LOAN_TYPES[0].rate);
  const [tenure, setTenure] = useState(LOAN_TYPES[0].tenure);
  const [mounted] = useState(true);

  const { yearly, emi } = useMemo(
    () => buildAmortization(principal, rate, tenure),
    [principal, rate, tenure]
  );

  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - principal;
  const interestPct = Math.round((totalInterest / totalPayment) * 100);

  const pieData = [
    { name: "Principal", value: principal },
    { name: "Total Interest", value: Math.round(totalInterest) },
  ];


  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Loan EMI Calculator</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Calculate your EMI, total interest, and see the full amortization schedule for any loan.
        </p>
      </div>

      {/* Loan type selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {LOAN_TYPES.map((lt, i) => (
          <Button
            key={lt.label}
            variant={loanTypeIdx === i ? "selected" : "outline"}
            onClick={() => {
              setLoanTypeIdx(i);
              if (lt.label !== "Custom") {
                setRate(lt.rate);
                setTenure(lt.tenure);
              }
            }}
            className="text-xs"
          >
            {lt.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Inputs */}
        <div className="lg:col-span-1 rounded-xl border p-5 space-y-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Loan Details</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Loan Amount</label>
              <span className="text-xs font-mono font-medium" style={{ color: "var(--accent-brand)" }}>{formatINR(principal)}</span>
            </div>
            <Slider min={100000} max={50000000} step={100000} value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))} />
            <div className="flex justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
              <span>₹1L</span><span>₹5Cr</span>
            </div>
            <Input type="number" value={principal} onChange={(e) => setPrincipal(Math.max(100000, Number(e.target.value)))}
              className="font-mono mt-2" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Interest Rate (p.a.)</label>
              <span className="text-xs font-mono font-medium" style={{ color: "var(--accent-brand)" }}>{rate}%</span>
            </div>
            <Slider min={5} max={24} step={0.25} value={rate}
              onChange={(e) => setRate(Number(e.target.value))} />
            <div className="flex justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
              <span>5%</span><span>24%</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Tenure</label>
              <span className="text-xs font-mono font-medium" style={{ color: "var(--accent-brand)" }}>{tenure} years ({tenure * 12} EMIs)</span>
            </div>
            <Slider min={1} max={30} step={1} value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))} />
            <div className="flex justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
              <span>1 yr</span><span>30 yrs</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Monthly EMI", value: formatINR(emi), color: "var(--accent-brand)" },
              { label: "Total Interest", value: formatINR(Math.round(totalInterest)), color: "var(--negative)" },
              { label: "Total Payment", value: formatINR(Math.round(totalPayment)), color: "var(--text-primary)" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{kpi.label}</p>
                <p className="text-lg font-semibold font-mono" style={{ color: kpi.color }}>{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Pie + breakdown */}
          <div className="rounded-xl border p-5 flex flex-col sm:flex-row items-center gap-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            {mounted && (
              <div style={{ width: 160, height: 160, flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" innerRadius="60%" outerRadius="85%" paddingAngle={3} cornerRadius={4} stroke="var(--surface)" strokeWidth={2}>
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            <div className="flex-1 space-y-3 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: "var(--accent-brand)" }} />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Principal</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-medium" style={{ color: "var(--text-primary)" }}>{formatINR(principal)}</span>
                  <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>{100 - interestPct}%</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-elevated)" }}>
                <div className="h-full rounded-full" style={{ width: `${100 - interestPct}%`, background: "var(--accent-brand)" }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: "var(--negative)" }} />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Total Interest</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-medium" style={{ color: "var(--negative)" }}>{formatINR(Math.round(totalInterest))}</span>
                  <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>{interestPct}%</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-elevated)" }}>
                <div className="h-full rounded-full" style={{ width: `${interestPct}%`, background: "var(--negative)" }} />
              </div>
              <p className="text-xs pt-1" style={{ color: "var(--text-muted)" }}>
                You pay <strong style={{ color: "var(--negative)" }}>{(totalInterest / principal * 100).toFixed(0)}%</strong> extra as interest over the loan tenure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Amortization chart */}
      <div className="rounded-xl border p-5 mb-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Year-wise Principal vs Interest Breakdown</h2>
        <div style={{ height: 260 }}>
          {!mounted ? <div className="h-full w-full" /> : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearly} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="principalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-brand)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--accent-brand)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="interestGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--negative)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--negative)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `Yr ${v}`} dy={10} minTickGap={30} />
                <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} width={60} dx={10} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-strong)", strokeWidth: 1, strokeDasharray: "4 4" }} />
                <Area type="monotone" dataKey="interest" name="Interest" stroke="var(--negative)" strokeWidth={2} fill="url(#interestGrad)" activeDot={{ r: 4, fill: "var(--negative)", stroke: "var(--surface)", strokeWidth: 2 }} />
                <Area type="monotone" dataKey="principal" name="Principal" stroke="var(--accent-brand)" strokeWidth={2} fill="url(#principalGrad)" activeDot={{ r: 4, fill: "var(--accent-brand)", stroke: "var(--surface)", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Amortization table (first 5 + last year) */}
      <div className="rounded-xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="px-5 py-3 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Amortization Schedule (Yearly)</h2>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: "var(--surface-elevated)" }}>
                {["Year", "Principal Paid", "Interest Paid", "Total Paid", "Balance"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium" style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {yearly.map((row) => (
                <tr key={row.year} className="border-t" style={{ borderColor: "var(--border)" }}>
                  <td className="px-4 py-2.5 font-medium" style={{ color: "var(--text-secondary)" }}>Year {row.year}</td>
                  <td className="px-4 py-2.5 font-mono" style={{ color: "var(--accent-brand)" }}>{formatINR(row.principal)}</td>
                  <td className="px-4 py-2.5 font-mono" style={{ color: "var(--negative)" }}>{formatINR(row.interest)}</td>
                  <td className="px-4 py-2.5 font-mono" style={{ color: "var(--text-primary)" }}>{formatINR(row.principal + row.interest)}</td>
                  <td className="px-4 py-2.5 font-mono" style={{ color: "var(--text-secondary)" }}>{formatINR(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 p-3 rounded-lg border text-xs" style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>
        <Info size={13} className="mt-0.5 shrink-0" style={{ color: "var(--accent-brand)" }} />
        <span>EMI calculated using standard reducing balance method. Actual EMI may vary based on processing fees, GST, and lender-specific terms. Not financial advice.</span>
      </div>
    </div>
  );
}
