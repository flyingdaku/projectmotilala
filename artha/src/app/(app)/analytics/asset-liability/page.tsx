import { ContextualNav } from "@/components/layout/contextual-nav";
import { QUANT_LINKS } from "@/lib/nav-links";

export default function Page() {
  return (
    <div className="space-y-6 pb-20">
      <ContextualNav links={QUANT_LINKS} />
      
      <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Asset Liability Modeling</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            This feature is currently under development.
          </p>
        </div>
      </div>
      
      <div className="p-12 text-center border rounded-xl border-dashed" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
        Coming soon...
      </div>
    </div>
  );
}
