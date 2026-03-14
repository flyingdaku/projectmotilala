"use client";

import { Building2, Users, Globe, TrendingUp, Award } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { CompanyProfile } from "@/lib/data/types";
import type { StockDetail } from "@/lib/data";
import type { DataMeta } from "@/lib/stock/presentation";
import { CoverageNotice, DataMetaInline } from "@/components/stock/StockUiPrimitives";
import { formatPercent } from "@/lib/utils/formatters";

const SEGMENT_COLORS = ["#F59E0B", "#3B82F6", "#10B981", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"];

interface Props {
  stock: StockDetail;
  profile: CompanyProfile | null;
  meta?: DataMeta | null;
}

export function OverviewSection({ stock, profile, meta }: Props) {
  const segments = profile?.businessSegments ?? [];
  const indexMemberships = profile?.indexMemberships ?? [];

  return (
    <section id="overview" className="scroll-mt-28 space-y-0">
      <div className="overflow-hidden rounded-2xl border shadow-sm" style={{ background: "color-mix(in srgb, var(--surface) 96%, transparent)", borderColor: "var(--border)" }}>
        <div className="border-b px-5 py-4" style={{ borderColor: "var(--border)" }}>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>Company Snapshot</div>
          <h2 className="mt-1 text-base font-semibold" style={{ color: "var(--text-primary)" }}>Overview</h2>
          <div className="mt-2">
            <DataMetaInline meta={meta ?? null} />
          </div>
        </div>
        <div className="grid gap-4 p-5 xl:grid-cols-2">
          <div
            className="rounded-xl border p-5"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
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

          {segments.length > 0 ? (
            <div
              className="rounded-xl border p-5"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
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
                      {formatPercent(s.revenuePct, 1, { signed: false })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <CoverageNotice
              meta={meta ?? null}
              title="Revenue mix unavailable"
              message="Segment-level revenue contribution is not available for this company yet, so the donut is hidden until coverage improves."
              className="rounded-xl border p-5"
            />
          )}
        </div>
      </div>
    </section>
  );
}
