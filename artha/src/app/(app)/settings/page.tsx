"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, Database, Palette, ChevronRight, Sun, Moon, Monitor, Check } from "lucide-react";
import { toast } from "sonner";
import { useTheme, type Theme } from "@/contexts/theme-context";

const SECTIONS = [
  { id: "profile", icon: User, label: "Profile", desc: "Name, email, avatar" },
  { id: "notifications", icon: Bell, label: "Notifications", desc: "Alerts, reminders, digests" },
  { id: "security", icon: Shield, label: "Security", desc: "Password, 2FA, sessions" },
  { id: "data", icon: Database, label: "Data & Import", desc: "CAS import, broker sync" },
  { id: "appearance", icon: Palette, label: "Appearance", desc: "Theme, density, language" },
];

const THEME_OPTIONS: { id: Theme; icon: React.ElementType; label: string; desc: string }[] = [
  { id: "light", icon: Sun, label: "Light", desc: "Clean white surfaces, ideal for bright environments" },
  { id: "dark", icon: Moon, label: "Dark", desc: "Deep navy background, easy on the eyes at night" },
  { id: "system", icon: Monitor, label: "System", desc: "Follows your OS preference automatically" },
];

export default function SettingsPage() {
  const [active, setActive] = useState("profile");
  const [name, setName] = useState("Rahul Kumar");
  const [email, setEmail] = useState("rahul@example.com");
  const [pan, setPan] = useState("ABCDE1234F");
  const [notifSIP, setNotifSIP] = useState(true);
  const [notifTax, setNotifTax] = useState(true);
  const [notifDigest, setNotifDigest] = useState(false);
  const { theme, setTheme } = useTheme();

  function save() {
    toast.success("Settings saved", {
      style: { borderLeft: "3px solid var(--positive)" },
    });
  }

  return (
    <div className="flex gap-5" style={{ minHeight: "calc(100vh - 140px)" }}>
      {/* Left nav */}
      <div
        className="w-56 shrink-0 rounded-xl border p-2 h-fit"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-150"
              style={
                active === s.id
                  ? { background: "var(--accent-subtle)", color: "var(--accent-brand)" }
                  : { color: "var(--text-secondary)" }
              }
            >
              <Icon size={15} strokeWidth={1.5} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{s.label}</p>
              </div>
              {active === s.id && <ChevronRight size={12} style={{ color: "var(--accent-brand)" }} />}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="rounded-xl border p-6 space-y-6"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {active === "profile" && (
            <>
              <div>
                <h2 className="text-base font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Profile</h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Manage your personal information</p>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
                  style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}
                >
                  RK
                </div>
                <button
                  className="px-3 py-1.5 rounded-md text-xs font-medium border transition-colors"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
                >
                  Change photo
                </button>
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
                      onChange={(e) => setter(e.target.value)}
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors"
                      style={{
                        background: "var(--surface-elevated)",
                        borderColor: "var(--border)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent-brand)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={save}
                className="px-5 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}
              >
                Save Changes
              </button>
            </>
          )}

          {active === "notifications" && (
            <>
              <div>
                <h2 className="text-base font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Notifications</h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Choose what alerts you receive</p>
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
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{desc}</p>
                    </div>
                    <button
                      onClick={() => setter(!value)}
                      className="relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0"
                      style={{ background: value ? "var(--accent-brand)" : "var(--border-strong)" }}
                    >
                      <span
                        className="absolute top-0.5 w-4 h-4 rounded-full transition-transform duration-200"
                        style={{
                          background: "white",
                          transform: value ? "translateX(22px)" : "translateX(2px)",
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={save}
                className="px-5 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "var(--accent-brand)", color: "var(--accent-foreground)" }}
              >
                Save Preferences
              </button>
            </>
          )}

          {active === "appearance" && (
            <>
              <div>
                <h2 className="text-base font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Appearance</h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Choose how Artha looks on your device</p>
              </div>

              {/* Theme picker cards */}
              <div>
                <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                  Theme
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {THEME_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isActive = theme === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setTheme(opt.id);
                          toast.success(`Theme set to ${opt.label}`, {
                            style: { borderLeft: "3px solid var(--accent-brand)" },
                          });
                        }}
                        className="relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-150"
                        style={{
                          background: isActive ? "var(--accent-subtle)" : "var(--surface-elevated)",
                          borderColor: isActive ? "var(--accent-brand)" : "var(--border)",
                          boxShadow: isActive ? "0 0 0 1px var(--accent-brand)" : "none",
                        }}
                      >
                        {/* Preview thumbnail */}
                        <div
                          className="w-full h-16 rounded-md overflow-hidden border"
                          style={{ borderColor: "var(--border)" }}
                        >
                          {opt.id === "light" && (
                            <div className="w-full h-full flex" style={{ background: "#F8FAFC" }}>
                              <div className="w-8 h-full" style={{ background: "#FFFFFF", borderRight: "1px solid #E2E8F0" }} />
                              <div className="flex-1 p-1.5 space-y-1">
                                <div className="h-1.5 rounded-full w-3/4" style={{ background: "#E2E8F0" }} />
                                <div className="h-1.5 rounded-full w-1/2" style={{ background: "#E2E8F0" }} />
                                <div className="h-4 rounded-md mt-2" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }} />
                              </div>
                            </div>
                          )}
                          {opt.id === "dark" && (
                            <div className="w-full h-full flex" style={{ background: "#0A0F1C" }}>
                              <div className="w-8 h-full" style={{ background: "#111827", borderRight: "1px solid #1E2D3D" }} />
                              <div className="flex-1 p-1.5 space-y-1">
                                <div className="h-1.5 rounded-full w-3/4" style={{ background: "#1E2D3D" }} />
                                <div className="h-1.5 rounded-full w-1/2" style={{ background: "#1E2D3D" }} />
                                <div className="h-4 rounded-md mt-2" style={{ background: "#111827", border: "1px solid #1E2D3D" }} />
                              </div>
                            </div>
                          )}
                          {opt.id === "system" && (
                            <div className="w-full h-full flex overflow-hidden">
                              <div className="w-1/2 h-full flex" style={{ background: "#F8FAFC" }}>
                                <div className="w-4 h-full" style={{ background: "#FFFFFF", borderRight: "1px solid #E2E8F0" }} />
                                <div className="flex-1 p-1 space-y-1">
                                  <div className="h-1 rounded-full" style={{ background: "#E2E8F0" }} />
                                  <div className="h-1 rounded-full w-2/3" style={{ background: "#E2E8F0" }} />
                                </div>
                              </div>
                              <div className="w-1/2 h-full flex" style={{ background: "#0A0F1C" }}>
                                <div className="w-4 h-full" style={{ background: "#111827", borderRight: "1px solid #1E2D3D" }} />
                                <div className="flex-1 p-1 space-y-1">
                                  <div className="h-1 rounded-full" style={{ background: "#1E2D3D" }} />
                                  <div className="h-1 rounded-full w-2/3" style={{ background: "#1E2D3D" }} />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Label row */}
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <Icon size={14} style={{ color: isActive ? "var(--accent-brand)" : "var(--text-secondary)" }} />
                            <span
                              className="text-sm font-semibold"
                              style={{ color: isActive ? "var(--accent-brand)" : "var(--text-primary)" }}
                            >
                              {opt.label}
                            </span>
                          </div>
                          {isActive && (
                            <span
                              className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ background: "var(--accent-brand)" }}
                            >
                              <Check size={11} style={{ color: "var(--accent-foreground)" }} />
                            </span>
                          )}
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Density (future) */}
              <div className="pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                  Display Density
                </p>
                <div className="flex items-center gap-3">
                  {["Comfortable", "Compact"].map((d) => (
                    <button
                      key={d}
                      className="px-4 py-2 rounded-md text-sm font-medium border transition-all duration-150"
                      style={
                        d === "Comfortable"
                          ? { background: "var(--accent-subtle)", borderColor: "var(--accent-brand)", color: "var(--accent-brand)" }
                          : { background: "transparent", borderColor: "var(--border)", color: "var(--text-muted)" }
                      }
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {(active === "security" || active === "data") && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-4">
                <rect x="8" y="12" width="32" height="24" rx="4" stroke="var(--border-strong)" strokeWidth="2" />
                <path d="M16 22h16M16 28h10" stroke="var(--border-strong)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="text-base font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                {SECTIONS.find((s) => s.id === active)?.label}
              </p>
              <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
                This section is coming soon. We&apos;re working on it.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
