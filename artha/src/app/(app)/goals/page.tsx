"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Target, TrendingUp } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  color: string;
}

const INITIAL_GOALS: Goal[] = [
  { id: "1", name: "Retirement Corpus", target: 50000000, current: 4850000, deadline: "2045", color: "#3B82F6" },
  { id: "2", name: "Child's Education", target: 5000000, current: 820000, deadline: "2035", color: "#10B981" },
  { id: "3", name: "Home Down Payment", target: 3000000, current: 1200000, deadline: "2028", color: "#F59E0B" },
  { id: "4", name: "Emergency Fund", target: 600000, current: 480000, deadline: "2026", color: "#8B5CF6" },
];

export default function GoalsPage() {
  const [goals] = useState<Goal[]>(INITIAL_GOALS);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Goals</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            Track progress toward your financial milestones
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}
        >
          <Plus size={14} /> Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal, i) => {
          const pct = Math.min((goal.current / goal.target) * 100, 100);
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.2 }}
              className="rounded-xl border p-5 transition-colors duration-200"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-strong)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${goal.color}20` }}
                  >
                    <Target size={16} style={{ color: goal.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {goal.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Target: {goal.deadline}
                    </p>
                  </div>
                </div>
                <span
                  className="text-xs font-mono font-semibold rounded-full px-2 py-0.5"
                  style={{ background: `${goal.color}20`, color: goal.color }}
                >
                  {pct.toFixed(0)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: "var(--surface-elevated)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.06 + 0.1 }}
                  className="h-full rounded-full"
                  style={{ background: goal.color }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>
                    Saved
                  </p>
                  <p className="text-base font-semibold font-mono" style={{ color: "var(--text-primary)" }}>
                    {formatINR(goal.current)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>
                    Target
                  </p>
                  <p className="text-base font-semibold font-mono" style={{ color: "var(--text-secondary)" }}>
                    {formatINR(goal.target)}
                  </p>
                </div>
              </div>

              <div
                className="mt-3 pt-3 border-t flex items-center gap-2"
                style={{ borderColor: "var(--border)" }}
              >
                <TrendingUp size={12} style={{ color: "var(--positive)" }} />
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Need{" "}
                  <span className="font-mono font-medium" style={{ color: "var(--text-primary)" }}>
                    {formatINR((goal.target - goal.current) / Math.max(parseInt(goal.deadline) - 2026, 1) / 12)}
                  </span>
                  /month to reach goal
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
