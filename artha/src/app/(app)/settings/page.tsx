"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Database,
  Palette,
  ChevronRight,
  Sun,
  Moon,
  Monitor,
  LayoutGrid,
  Circle,
  Layers3,
  LineChart,
  RotateCcw,
  Check,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  useTheme,
  type Theme,
  type ThemeDensity,
  type ThemeRadius,
  type SurfaceContrast,
  type ChartContrast,
} from "@/contexts/theme-context";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  { id: "profile", icon: User, label: "Profile", desc: "Name, email, avatar" },
  { id: "notifications", icon: Bell, label: "Notifications", desc: "Alerts, reminders, digests" },
  { id: "security", icon: Shield, label: "Security", desc: "Password, 2FA, sessions" },
  { id: "data", icon: Database, label: "Data & Import", desc: "CAS import, broker sync" },
  { id: "appearance", icon: Palette, label: "Appearance", desc: "Theme, density, style system" },
] as const;

const THEME_OPTIONS: { id: Theme; icon: React.ElementType; label: string; desc: string }[] = [
  { id: "light", icon: Sun, label: "Light", desc: "Bright, low-friction workspace for daytime research" },
  { id: "dark", icon: Moon, label: "Dark", desc: "Reduced glare with stronger chart and table contrast" },
  { id: "system", icon: Monitor, label: "System", desc: "Matches your device setting automatically" },
];

const DENSITY_OPTIONS: { id: ThemeDensity; label: string; desc: string }[] = [
  { id: "comfortable", label: "Comfortable", desc: "More breathing room across cards and tables" },
  { id: "compact", label: "Compact", desc: "Tighter layout for dense research workflows" },
];

const RADIUS_OPTIONS: { id: ThemeRadius; label: string; desc: string }[] = [
  { id: "sharp", label: "Sharp", desc: "Cleaner, flatter edges for a terminal-like feel" },
  { id: "rounded", label: "Rounded", desc: "Balanced default for most users" },
  { id: "soft", label: "Soft", desc: "Friendlier cards and controls" },
];

const SURFACE_OPTIONS: { id: SurfaceContrast; label: string; desc: string }[] = [
  { id: "soft", label: "Soft", desc: "Lower contrast between surfaces" },
  { id: "balanced", label: "Balanced", desc: "Default contrast with clear hierarchy" },
  { id: "strong", label: "Strong", desc: "More separation between cards, rows, and layers" },
];

const CHART_OPTIONS: { id: ChartContrast; label: string; desc: string }[] = [
  { id: "balanced", label: "Balanced", desc: "Calmer fills and lighter overlays" },
  { id: "vivid", label: "Vivid", desc: "Higher emphasis on chart fills and lines" },
];

type SettingsSection = (typeof SECTIONS)[number]["id"];

function isSettingsSection(value: string | null): value is SettingsSection {
  return SECTIONS.some((section) => section.id === value);
}

function SegmentedControl<T extends string>({
  title,
  icon: Icon,
  value,
  onChange,
  options,
}: {
  title: string;
  icon: React.ElementType;
  value: T;
  onChange: (next: T) => void;
  options: { id: T; label: string; desc: string }[];
}) {
  return (
    <div className="theme-card p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Icon size={15} style={{ color: "var(--brand-primary)" }} />
            <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {title}
            </h3>
          </div>
          <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
            {options.find((option) => option.id === value)?.desc}
          </p>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className="flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-all"
              style={{
                background: active ? "var(--brand-tint)" : "var(--surface)",
                borderColor: active ? "var(--brand-primary)" : "var(--border)",
                color: active ? "var(--brand-primary)" : "var(--text-secondary)",
              }}
            >
              <span className="text-sm font-medium">{option.label}</span>
              {active ? <Check size={14} /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AppearancePreview() {
  const rows = [
    { label: "Reliance", metric: "22.9x", state: "good" },
    { label: "TCS", metric: "31.4x", state: "average" },
    { label: "HUL", metric: "51.2x", state: "weak" },
  ] as const;

  return (
    <div className="theme-card overflow-hidden">
      <div className="border-b px-5 py-4" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Live Theme Preview
        </h3>
        <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
          This preview uses the same tokens the app shell, tables, and charts now consume.
        </p>
      </div>
      <div className="grid gap-0 lg:grid-cols-[210px_minmax(0,1fr)]">
        <div
          className="border-r px-4 py-4"
          style={{ borderColor: "var(--border)", background: "var(--sidebar)" }}
        >
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
            Sidebar
          </div>
          <div className="space-y-2">
            {["Dashboard", "Research", "Peers"].map((item, index) => {
              const active = index === 1;
              return (
                <div
                  key={item}
                  className="rounded-lg border-l-[3px] px-3 py-2 text-sm font-medium"
                  style={{
                    background: active ? "var(--brand-tint)" : "transparent",
                    borderLeftColor: active ? "var(--brand-primary)" : "transparent",
                    color: active ? "var(--brand-primary)" : "var(--text-secondary)",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-5" style={{ background: "var(--surface)" }}>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="theme-badge-score" data-score="strong">Strong 8.7</span>
            <span className="theme-badge-score" data-score="good">Good 7.2</span>
            <span className="theme-badge-score" data-score="average">Watch 5.4</span>
            <Button size="sm">Primary CTA</Button>
            <Button size="sm" variant="secondary">Secondary</Button>
          </div>

          <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)" }}>
            <div
              className="grid grid-cols-[1.4fr_0.8fr_0.8fr] gap-px px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em]"
              style={{ background: "var(--table-header-bg)", color: "var(--text-secondary)" }}
            >
              <span>Company</span>
              <span className="text-right">P/E</span>
              <span className="text-right">Score</span>
            </div>
            {rows.map((row, index) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.4fr_0.8fr_0.8fr] items-center gap-px border-t px-3 py-3"
                style={{
                  borderColor: "var(--border)",
                  background: index % 2 === 0 ? "var(--table-row-bg)" : "var(--table-stripe)",
                }}
              >
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {row.label}
                </span>
                <span className="text-right text-sm metric-mono" style={{ color: "var(--text-primary)" }}>
                  {row.metric}
                </span>
                <div className="flex justify-end">
                  <span className="theme-badge-score" data-score={row.state}>
                    {row.state}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--text-secondary)" }}>
              Chart palette
            </div>
            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  key={index}
                  className="h-9 rounded-lg border"
                  style={{
                    background: `var(--chart-${index})`,
                    borderColor: "color-mix(in srgb, var(--chart-1) 16%, var(--border) 84%)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const requestedSection = searchParams.get("section");
  const active: SettingsSection = isSettingsSection(requestedSection) ? requestedSection : "appearance";
  const [name, setName] = useState("Rahul Kumar");
  const [email, setEmail] = useState("rahul@example.com");
  const [pan, setPan] = useState("ABCDE1234F");
  const [notifSIP, setNotifSIP] = useState(true);
  const [notifTax, setNotifTax] = useState(true);
  const [notifDigest, setNotifDigest] = useState(false);
  const { theme, resolvedTheme, setTheme, appearance, updateAppearance, resetAppearance } = useTheme();

  const palette = useMemo(
    () => [
      { label: "App", color: "var(--bg-app)" },
      { label: "Card", color: "var(--bg-card)" },
      { label: "Brand", color: "var(--brand-primary)" },
      { label: "Bull", color: "var(--bull-strong)" },
      { label: "Bear", color: "var(--bear-strong)" },
      { label: "Warn", color: "var(--warn-strong)" },
    ],
    []
  );

  function save(message = "Settings saved") {
    toast.success(message, {
      style: { borderLeft: "3px solid var(--brand-primary)" },
    });
  }

  function handleThemeChange(nextTheme: Theme) {
    setTheme(nextTheme);
    save(`Theme set to ${nextTheme}`);
  }

  function handleSectionSelect(section: SettingsSection) {
    const params = new URLSearchParams(searchParams.toString());
    if (section === "appearance") {
      params.delete("section");
    } else {
      params.set("section", section);
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }

  function renderPlaceholder(sectionId: string) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border"
          style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
        >
          <Palette size={24} style={{ color: "var(--brand-primary)" }} />
        </div>
        <p className="text-base font-medium mb-2" style={{ color: "var(--text-primary)" }}>
          {SECTIONS.find((section) => section.id === sectionId)?.label}
        </p>
        <p className="text-sm max-w-xs" style={{ color: "var(--text-secondary)" }}>
          This section is coming soon. We kept it intact while focusing the refactor on site-wide theming.
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-5" style={{ minHeight: "calc(100vh - 140px)" }}>
      <aside
        className="w-60 shrink-0 rounded-2xl border p-2 h-fit"
        style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)" }}
      >
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = active === section.id;
          return (
            <button
              key={section.id}
              onClick={() => handleSectionSelect(section.id)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors duration-150 border-l-[3px]"
              style={
                isActive
                  ? {
                      background: "var(--brand-tint)",
                      color: "var(--brand-primary)",
                      borderLeftColor: "var(--brand-primary)",
                    }
                  : {
                      color: "var(--text-secondary)",
                      borderLeftColor: "transparent",
                    }
              }
            >
              <Icon size={15} strokeWidth={1.75} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{section.label}</p>
                <p className="mt-0.5 truncate text-[11px]" style={{ color: isActive ? "var(--brand-primary)" : "var(--text-muted)" }}>
                  {section.desc}
                </p>
              </div>
              {isActive ? <ChevronRight size={12} /> : null}
            </button>
          );
        })}
      </aside>

      <div className="flex-1 min-w-0">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16 }}
          className="rounded-2xl border p-6 space-y-6"
          style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)" }}
        >
          {active === "profile" && (
            <>
              <div>
                <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Profile</h2>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Manage your personal information</p>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
                  style={{ background: "var(--brand-primary)", color: "#fff" }}
                >
                  RK
                </div>
                <Button variant="secondary" size="sm">Change Photo</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", value: name, setter: setName },
                  { label: "Email", value: email, setter: setEmail },
                  { label: "PAN", value: pan, setter: setPan },
                ].map(({ label, value, setter }) => (
                  <div key={label}>
                    <label className="text-xs font-medium uppercase tracking-widest block mb-1.5" style={{ color: "var(--text-muted)" }}>
                      {label}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(event) => setter(event.target.value)}
                      className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors"
                      style={{
                        background: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                ))}
              </div>
              <Button onClick={() => save()}>Save Changes</Button>
            </>
          )}

          {active === "notifications" && (
            <>
              <div>
                <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Notifications</h2>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Choose what alerts you receive</p>
              </div>
              <div className="space-y-4">
                {[
                  { label: "SIP Reminders", desc: "Remind me 2 days before SIP due date", value: notifSIP, setter: setNotifSIP },
                  { label: "Tax Alerts", desc: "LTCG exemption, advance tax deadlines", value: notifTax, setter: setNotifTax },
                  { label: "Weekly Digest", desc: "Portfolio summary every Monday morning", value: notifDigest, setter: setNotifDigest },
                ].map(({ label, desc, value, setter }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "var(--border)" }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{label}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setter(!value)}
                      className="relative h-6 w-11 rounded-full transition-colors"
                      style={{ background: value ? "var(--brand-primary)" : "var(--border)" }}
                    >
                      <span
                        className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform"
                        style={{ transform: value ? "translateX(22px)" : "translateX(2px)" }}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <Button onClick={() => save("Notification preferences saved")}>Save Preferences</Button>
            </>
          )}

          {active === "appearance" && (
            <>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Appearance</h2>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Central theme controls for shell colors, card density, corners, and chart emphasis.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => { resetAppearance(); save("Appearance reset to defaults"); }}>
                  <RotateCcw size={14} />
                  Reset Defaults
                </Button>
              </div>

              <div className="theme-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Theme Mode</h3>
                    <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                      Current resolved mode: <span className="font-semibold">{resolvedTheme}</span>
                    </p>
                  </div>
                  <div className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: "var(--brand-tint)", color: "var(--brand-primary)" }}>
                    Live updates enabled
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                  {THEME_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const activeTheme = theme === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleThemeChange(option.id)}
                        className="rounded-2xl border p-4 text-left transition-all"
                        style={{
                          background: activeTheme ? "var(--brand-tint)" : "var(--surface)",
                          borderColor: activeTheme ? "var(--brand-primary)" : "var(--border)",
                        }}
                      >
                        <div className="mb-3 flex h-20 overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)" }}>
                          <div className="w-1/3 border-r" style={{ background: option.id === "dark" ? "#0B0F19" : "#FFFFFF", borderColor: "#D9E2EC" }} />
                          <div className="flex-1 p-2" style={{ background: option.id === "dark" ? "#1E293B" : "#F8FAFC" }}>
                            <div className="h-2 w-3/4 rounded-full" style={{ background: option.id === "dark" ? "#334155" : "#E2E8F0" }} />
                            <div className="mt-2 h-8 rounded-lg" style={{ background: option.id === "dark" ? "#334155" : "#FFFFFF", border: `1px solid ${option.id === "dark" ? "#475569" : "#E2E8F0"}` }} />
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Icon size={15} style={{ color: activeTheme ? "var(--brand-primary)" : "var(--text-secondary)" }} />
                            <span className="text-sm font-semibold" style={{ color: activeTheme ? "var(--brand-primary)" : "var(--text-primary)" }}>
                              {option.label}
                            </span>
                          </div>
                          {activeTheme ? <Check size={14} style={{ color: "var(--brand-primary)" }} /> : null}
                        </div>
                        <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {option.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="theme-card p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Palette</h3>
                    <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                      Primary tokens driving the current {resolvedTheme} theme.
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {palette.map((entry) => (
                    <div key={entry.label} className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}>
                      <div className="h-10 rounded-lg border" style={{ background: entry.color, borderColor: "color-mix(in srgb, var(--border) 78%, transparent)" }} />
                      <div className="mt-2 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                        {entry.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <SegmentedControl
                  title="Display Density"
                  icon={LayoutGrid}
                  value={appearance.density}
                  onChange={(next) => updateAppearance({ density: next })}
                  options={DENSITY_OPTIONS}
                />
                <SegmentedControl
                  title="Corners"
                  icon={Circle}
                  value={appearance.radius}
                  onChange={(next) => updateAppearance({ radius: next })}
                  options={RADIUS_OPTIONS}
                />
                <SegmentedControl
                  title="Surface Contrast"
                  icon={Layers3}
                  value={appearance.surfaceContrast}
                  onChange={(next) => updateAppearance({ surfaceContrast: next })}
                  options={SURFACE_OPTIONS}
                />
                <SegmentedControl
                  title="Chart Contrast"
                  icon={LineChart}
                  value={appearance.chartContrast}
                  onChange={(next) => updateAppearance({ chartContrast: next })}
                  options={CHART_OPTIONS}
                />
              </div>

              <AppearancePreview />
            </>
          )}

          {(active === "security" || active === "data") && renderPlaceholder(active)}
        </motion.div>
      </div>
    </div>
  );
}
