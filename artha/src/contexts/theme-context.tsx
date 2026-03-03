"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "dark",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const updateDOM = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    const isDark =
      newTheme === "dark" ||
      (newTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    root.classList.remove("light", "dark");
    root.classList.add(isDark ? "dark" : "light");
    setResolvedTheme(isDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("artha-theme") as Theme | null;
    
    // Use timeout to push state update to end of event loop to avoid synchronous set-state-in-effect warning
    const t = setTimeout(() => {
      if (stored && ["light", "dark", "system"].includes(stored)) {
        setThemeState(stored);
        updateDOM(stored);
      } else {
        setThemeState("light");
        updateDOM("light");
      }
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
  }, [updateDOM]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem("artha-theme", newTheme);
      updateDOM(newTheme);
    },
    [updateDOM]
  );

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
