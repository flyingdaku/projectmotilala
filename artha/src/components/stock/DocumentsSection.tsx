"use client";

import { useState, useEffect } from "react";
import { FileText, Mic, Megaphone, Star, Download, ExternalLink, ChevronDown, ChevronUp, TrendingUp, Building2, Award } from "lucide-react";
import { apiGet } from "@/lib/api-client";
import type { DocumentsResponse } from "@/lib/api-types";
import type { CompanyDocument } from "@/lib/data/types";
import type { DataMeta } from "@/lib/stock/presentation";
import { buildDataMeta } from "@/lib/stock/presentation";
import { CoverageNotice, DataMetaInline } from "@/components/stock/StockUiPrimitives";

const DOC_TABS = [
  { key: "announcements", label: "Corporate Announcements", icon: Megaphone },
  { key: "reports", label: "Annual Reports", icon: FileText },
  { key: "concalls", label: "Concalls & Transcripts", icon: Mic },
  { key: "ratings", label: "Credit Ratings", icon: Award },
  { key: "presentations", label: "Investor Presentations", icon: TrendingUp },
];

const DOC_ICONS: Record<string, React.ReactNode> = {
  ANNUAL_REPORT: <FileText size={16} className="text-blue-400" />,
  CONCALL_TRANSCRIPT: <Mic size={16} className="text-purple-400" />,
  CONCALL_AUDIO: <Mic size={16} className="text-purple-400" />,
  EXCHANGE_ANNOUNCEMENT: <Megaphone size={16} className="text-amber-400" />,
  INVESTOR_PRESENTATION: <Star size={16} className="text-green-400" />,
  CREDIT_RATING: <Star size={16} className="text-red-400" />,
};

const SENTIMENT_COLOR = (v: number | null) => {
  if (v == null) return "var(--text-muted)";
  if (v >= 0.3) return "#10B981";
  if (v <= -0.3) return "#EF4444";
  return "#F59E0B";
};

const SENTIMENT_LABEL = (v: number | null) => {
  if (v == null) return null;
  if (v >= 0.3) return "Positive";
  if (v <= -0.3) return "Negative";
  return "Neutral";
};

function DocCard({ doc }: { doc: CompanyDocument }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4 rounded-lg border transition-colors" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{DOC_ICONS[doc.docType] ?? <FileText size={16} />}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
                {doc.title ?? doc.docType.replace(/_/g, " ")}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{doc.docDate}</span>
                {doc.fiscalYear && <span className="text-xs" style={{ color: "var(--text-muted)" }}>FY{doc.fiscalYear}</span>}
                {doc.fiscalQuarter && <span className="text-xs" style={{ color: "var(--text-muted)" }}>{doc.fiscalQuarter}</span>}
                {doc.aiSentiment != null && (
                  <span className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                    style={{ color: SENTIMENT_COLOR(doc.aiSentiment ?? null), background: `${SENTIMENT_COLOR(doc.aiSentiment ?? null)}18`, border: `1px solid ${SENTIMENT_COLOR(doc.aiSentiment ?? null)}40` }}>
                    {SENTIMENT_LABEL(doc.aiSentiment ?? null)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {doc.fileUrl && (
                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded hover:bg-[var(--surface)] transition-colors" title="Open">
                  <ExternalLink size={13} style={{ color: "var(--text-muted)" }} />
                </a>
              )}
              {doc.filePath && (
                <a href={doc.filePath} download
                  className="p-1.5 rounded hover:bg-[var(--surface)] transition-colors" title="Download">
                  <Download size={13} style={{ color: "var(--text-muted)" }} />
                </a>
              )}
            </div>
          </div>

          {/* AI Summary */}
          {doc.aiSummary && (
            <div className="mt-2">
              <button onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1 text-xs font-medium"
                style={{ color: "var(--accent-brand)" }}>
                {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                AI Summary
              </button>
              {expanded && (
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {doc.aiSummary}
                </p>
              )}
            </div>
          )}

          {/* Key Points */}
          {(doc.aiKeyPoints?.length ?? 0) > 0 && expanded && (
            <ul className="mt-2 space-y-1">
              {(doc.aiKeyPoints ?? []).map((pt: string, i: number) => (
                <li key={i} className="flex items-start gap-1.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--accent-brand)" }} />
                  {pt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

interface Props {
  symbol: string;
}

export function DocumentsSection({ symbol }: Props) {
  const [documents, setDocuments] = useState<CompanyDocument[]>([]);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("announcements");
  const [meta, setMeta] = useState<DataMeta | null>(null);
  const requestKey = `${symbol}-${activeTab}`;

  useEffect(() => {
    apiGet<DocumentsResponse>(`/api/stocks/${symbol}/documents`, { category: activeTab })
      .then((d) => {
        setDocuments((d.documents ?? []) as CompanyDocument[]);
        setMeta((d.meta as DataMeta | null | undefined) ?? null);
        setLoadedKey(requestKey);
      })
      .catch(() => {
        setDocuments([]);
        setMeta(null);
        setLoadedKey(requestKey);
      });
  }, [symbol, activeTab, requestKey]);

  const effectiveMeta = meta ?? buildDataMeta({
    asOfCandidates: [documents[0]?.docDate],
    coverage: documents.length > 0 ? 1 : 0,
    status: documents.length > 0 ? "partial" : "unavailable",
  });
  const loading = loadedKey !== requestKey;

  return (
    <section id="documents" className="scroll-mt-28">
      <div className="rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {/* Header */}
        <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <Building2 size={20} style={{ color: "var(--accent-brand)" }} />
            <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Documents & Filings</h2>
          </div>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Corporate announcements, annual reports, concalls, and credit ratings</p>
          <div className="mt-2">
            <DataMetaInline meta={effectiveMeta} />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex gap-0 overflow-x-auto px-6">
            {DOC_TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                aria-pressed={activeTab === key}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === key ? "" : "hover:bg-[var(--surface-elevated)]"}`}
                style={{
                  borderColor: activeTab === key ? "var(--accent-brand)" : "transparent",
                  color: activeTab === key ? "var(--accent-brand)" : "var(--text-muted)",
                }}>
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Document List */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin w-8 h-8 rounded-full border-2 border-[var(--accent-brand)] border-t-transparent" />
            </div>
          ) : documents.length === 0 ? (
            <CoverageNotice
              meta={effectiveMeta}
              title={`No ${DOC_TABS.find((tab) => tab.key === activeTab)?.label.toLowerCase()} yet`}
              message={
                activeTab === "announcements"
                  ? "Corporate announcements have not been fetched for this company view yet."
                  : activeTab === "reports"
                    ? "Annual report coverage is missing or the latest filings have not been ingested."
                    : activeTab === "concalls"
                      ? "Concalls and transcripts are not connected for this issuer yet."
                      : activeTab === "ratings"
                        ? "Credit ratings are not available from the current document pipeline."
                        : "Investor presentations are not available from the current pipeline."
              }
            />
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <DocCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
