"use client";

import { useState } from "react";
import { Building2, Users, Globe, Star, TrendingUp, AlertTriangle, ChevronDown, ChevronUp, Award } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { CompanyProfile } from "@/lib/data/types";
import type { StockDetail } from "@/lib/data";

const SEGMENT_COLORS = ["#F59E0B", "#3B82F6", "#10B981", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"];

const SEVERITY_COLORS: Record<string, string> = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#10B981",
};

interface Props {
  stock: StockDetail;
  profile: CompanyProfile | null;
}

export function OverviewSection({ stock, profile }: Props) {
  const [showAnalyst, setShowAnalyst] = useState(false);

  const segments = profile?.businessSegments ?? [];
  const riskTags = profile?.riskTags ?? [];
  const indexMemberships = profile?.indexMemberships ?? [];
  const thesis = profile?.investmentThesis ?? [];

  return (
    <section id="overview" className="scroll-mt-28 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Summary */}
        <div
          className="lg:col-span-2 p-6 rounded-xl border space-y-4"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
            About {stock.name}
          </h2>

          {profile?.descriptionShort ? (
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {profile.descriptionShort}
            </p>
          ) : (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {stock.sector && stock.industry
                ? `${stock.name} operates in the ${stock.industry} segment of the ${stock.sector} sector.`
                : `${stock.name} is a listed company on NSE/BSE.`}
            </p>
          )}

          {profile?.descriptionAnalyst && (
            <div>
              <button
                onClick={() => setShowAnalyst((v) => !v)}
                className="flex items-center gap-1 text-xs font-medium transition-colors"
                style={{ color: "var(--accent-brand)" }}
              >
                {showAnalyst ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {showAnalyst ? "Show less" : "Read analyst summary"}
              </button>
              {showAnalyst && (
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {profile.descriptionAnalyst}
                </p>
              )}
            </div>
          )}

          {/* Risk Tags */}
          {riskTags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {riskTags.map((tag, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: `${SEVERITY_COLORS[tag.severity]}18`,
                    color: SEVERITY_COLORS[tag.severity],
                    border: `1px solid ${SEVERITY_COLORS[tag.severity]}40`,
                  }}
                >
                  <AlertTriangle size={10} />
                  {tag.label}
                </span>
              ))}
            </div>
          )}

          {/* Investment Thesis */}
          {thesis.length > 0 && (
            <div
              className="mt-4 p-4 rounded-lg border-l-4"
              style={{ borderLeftColor: "var(--accent-brand)", background: "var(--accent-subtle)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Star size={14} style={{ color: "var(--accent-brand)" }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent-brand)" }}>
                  Investment Thesis
                </span>
              </div>
              <ul className="space-y-1.5">
                {thesis.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent-brand)" }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Key Facts + Segments */}
        <div className="space-y-4">
          {/* Key Facts */}
          <div
            className="p-5 rounded-xl border"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              Key Facts
            </h3>
            <dl className="space-y-3">
              {profile?.foundedYear && (
                <div className="flex items-start gap-2">
                  <Building2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-brand)" }} />
                  <div>
                    <dt className="text-xs" style={{ color: "var(--text-muted)" }}>Founded</dt>
                    <dd className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{profile.foundedYear}</dd>
                  </div>
                </div>
              )}
              {profile?.headquarters && (
                <div className="flex items-start gap-2">
                  <Building2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-brand)" }} />
                  <div>
                    <dt className="text-xs" style={{ color: "var(--text-muted)" }}>Headquarters</dt>
                    <dd className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{profile.headquarters}</dd>
                  </div>
                </div>
              )}
              {profile?.employees && (
                <div className="flex items-start gap-2">
                  <Users size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-brand)" }} />
                  <div>
                    <dt className="text-xs" style={{ color: "var(--text-muted)" }}>Employees</dt>
                    <dd className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{profile.employees}</dd>
                  </div>
                </div>
              )}
              {profile?.website && (
                <div className="flex items-start gap-2">
                  <Globe size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-brand)" }} />
                  <div>
                    <dt className="text-xs" style={{ color: "var(--text-muted)" }}>Website</dt>
                    <dd>
                      <a href={profile.website} target="_blank" rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline" style={{ color: "var(--accent-brand)" }}>
                        {profile.website.replace(/^https?:\/\//, "")}
                      </a>
                    </dd>
                  </div>
                </div>
              )}
              {(profile?.creditRating) && (
                <div className="flex items-start gap-2">
                  <Award size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-brand)" }} />
                  <div>
                    <dt className="text-xs" style={{ color: "var(--text-muted)" }}>Credit Rating</dt>
                    <dd className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {profile.creditRating}
                      {profile.creditRatingAgency && (
                        <span className="ml-1 text-xs" style={{ color: "var(--text-muted)" }}>({profile.creditRatingAgency})</span>
                      )}
                    </dd>
                  </div>
                </div>
              )}
              {/* Exchanges */}
              <div className="flex items-start gap-2">
                <TrendingUp size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-brand)" }} />
                <div>
                  <dt className="text-xs" style={{ color: "var(--text-muted)" }}>Listed on</dt>
                  <dd className="flex gap-1.5 mt-0.5">
                    {stock.nseSymbol && (
                      <span className="px-1.5 py-0.5 rounded text-xs font-semibold bg-blue-500/10 text-blue-400">NSE</span>
                    )}
                    {stock.bseCode && (
                      <span className="px-1.5 py-0.5 rounded text-xs font-semibold bg-green-500/10 text-green-400">BSE</span>
                    )}
                  </dd>
                </div>
              </div>
              {/* Index Memberships */}
              {indexMemberships.length > 0 && (
                <div className="pt-2 border-t flex flex-wrap gap-1.5" style={{ borderColor: "var(--border)" }}>
                  {indexMemberships.map((idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: "var(--surface-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                      {idx}
                    </span>
                  ))}
                </div>
              )}
            </dl>
          </div>

          {/* Business Segment Donut */}
          {segments.length > 0 && (
            <div
              className="p-5 rounded-xl border"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Revenue Mix
              </h3>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={segments.map((s) => ({ name: s.name, value: s.revenuePct ?? 0 }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={72}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {segments.map((_, i) => (
                        <Cell key={i} fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px" }}
                      formatter={(val: unknown) => [`${val}%`]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="space-y-1.5 mt-2">
                {segments.map((s, i) => (
                  <li key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }} />
                      <span style={{ color: "var(--text-secondary)" }}>{s.name}</span>
                    </div>
                    <span className="font-mono font-medium" style={{ color: "var(--text-primary)" }}>
                      {s.revenuePct?.toFixed(1)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
