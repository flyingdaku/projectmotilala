"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark" | "system";
export type ThemeDensity = "comfortable" | "compact";
export type ThemeRadius = "sharp" | "rounded" | "soft";
export type SurfaceContrast = "soft" | "balanced" | "strong";
export type ChartContrast = "balanced" | "vivid";

export interface AppearanceConfig {
  density: ThemeDensity;
  radius: ThemeRadius;
  surfaceContrast: SurfaceContrast;
  chartContrast: ChartContrast;
}

const DEFAULT_APPEARANCE: AppearanceConfig = {
  density: "comfortable",
  radius: "rounded",
  surfaceContrast: "balanced",
  chartContrast: "balanced",
};

const THEME_STORAGE_KEY = "artha-theme";
const APPEARANCE_STORAGE_KEY = "artha-appearance";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  appearance: AppearanceConfig;
  setTheme: (t: Theme) => void;
  updateAppearance: (patch: Partial<AppearanceConfig>) => void;
  resetAppearance: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  appearance: DEFAULT_APPEARANCE,
  setTheme: () => {},
  updateAppearance: () => {},
  resetAppearance: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function isAppearanceConfig(value: unknown): value is AppearanceConfig {
  if (!value || typeof value !== "object") return false;
  const appearance = value as Record<string, unknown>;
  return (
    ["comfortable", "compact"].includes(String(appearance.density)) &&
    ["sharp", "rounded", "soft"].includes(String(appearance.radius)) &&
    ["soft", "balanced", "strong"].includes(String(appearance.surfaceContrast)) &&
    ["balanced", "vivid"].includes(String(appearance.chartContrast))
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [appearance, setAppearance] = useState<AppearanceConfig>(DEFAULT_APPEARANCE);

  const updateDOM = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    const isDark =
      newTheme === "dark" ||
      (newTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    root.classList.remove("light", "dark");
    root.classList.add(isDark ? "dark" : "light");
    root.dataset.theme = isDark ? "dark" : "light";
    setResolvedTheme(isDark ? "dark" : "light");
  }, []);

  const applyAppearance = useCallback((config: AppearanceConfig) => {
    const root = document.documentElement;
    root.dataset.density = config.density;
    root.dataset.radius = config.radius;
    root.dataset.surfaceContrast = config.surfaceContrast;
    root.dataset.chartContrast = config.chartContrast;
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const storedAppearance = localStorage.getItem(APPEARANCE_STORAGE_KEY);

    // Use timeout to push state update to end of event loop to avoid synchronous set-state-in-effect warning
    const t = setTimeout(() => {
      const initialTheme = storedTheme && ["light", "dark", "system"].includes(storedTheme)
        ? storedTheme
        : "light";
      setThemeState(initialTheme);
      updateDOM(initialTheme);

      if (storedAppearance) {
        try {
          const parsed = JSON.parse(storedAppearance);
          if (isAppearanceConfig(parsed)) {
            setAppearance(parsed);
            applyAppearance(parsed);
            return;
          }
        } catch {
          /* noop */
        }
      }

      setAppearance(DEFAULT_APPEARANCE);
      applyAppearance(DEFAULT_APPEARANCE);
    }, 0);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setThemeState((current) => {
        if (current === "system") {
          updateDOM("system");
        }
        return current;
      });
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      clearTimeout(t);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [applyAppearance, updateDOM]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      updateDOM(newTheme);
    },
    [updateDOM]
  );

  const updateAppearance = useCallback(
    (patch: Partial<AppearanceConfig>) => {
      setAppearance((current) => {
        const next = { ...current, ...patch };
        localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(next));
        applyAppearance(next);
        return next;
      });
    },
    [applyAppearance]
  );

  const resetAppearance = useCallback(() => {
    setAppearance(DEFAULT_APPEARANCE);
    localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(DEFAULT_APPEARANCE));
    applyAppearance(DEFAULT_APPEARANCE);
  }, [applyAppearance]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      appearance,
      setTheme,
      updateAppearance,
      resetAppearance,
    }),
    [appearance, resolvedTheme, resetAppearance, setTheme, theme, updateAppearance]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
