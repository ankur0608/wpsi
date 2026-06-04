"use client";

import React, { useEffect, useState } from "react";

type Theme = "dark" | "light";

// Shared toggle function — works without React context
export function applyThemeToDOM(t: Theme) {
  const root = document.documentElement;
  if (t === "light") {
    root.classList.add("light-mode");
    root.classList.remove("dark-mode");
  } else {
    root.classList.add("dark-mode");
    root.classList.remove("light-mode");
  }
}

export function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem("wpsi-theme");
    return stored === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function saveTheme(t: Theme) {
  try {
    localStorage.setItem("wpsi-theme", t);
  } catch {}
}

// React hook to get/set theme (self-contained, no context required)
export function useThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    return getStoredTheme();
  });

  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    applyThemeToDOM(stored);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      saveTheme(next);
      applyThemeToDOM(next);
      // Notify other ThemeToggle instances asynchronously to avoid React state collisions
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("wpsi-theme-change", { detail: next }));
      }, 0);
      return next;
    });
  };

  // Listen for theme changes from other toggles
  useEffect(() => {
    const handler = (e: Event) => {
      setTheme((e as CustomEvent<Theme>).detail);
    };
    window.addEventListener("wpsi-theme-change", handler);
    return () => window.removeEventListener("wpsi-theme-change", handler);
  }, []);

  return { theme, toggleTheme };
}

// Keep ThemeProvider + useTheme for backward compat (wraps hook)
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
