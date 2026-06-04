"use client";

import React from "react";
import { useThemeToggle } from "@/context/ThemeContext";

interface ThemeToggleProps {
  compact?: boolean;
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeToggle();
  const isDark = theme === "dark";
  const size = compact ? "36px" : "40px";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "12px",
        border: isDark
          ? "1px solid rgba(212,146,42,0.22)"
          : "1px solid rgba(180,140,60,0.40)",
        background: isDark
          ? "rgba(212,146,42,0.10)"
          : "rgba(255,248,220,0.90)",
        cursor: "pointer",
        transition: "all 0.25s ease",
        flexShrink: 0,
        boxShadow: isDark
          ? "0 0 0 0 transparent"
          : "0 2px 10px rgba(180,140,60,0.20)",
        outline: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 16px rgba(212,146,42,0.35)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = isDark
          ? "0 0 0 0 transparent"
          : "0 2px 10px rgba(180,140,60,0.20)";
      }}
    >
      <span
        style={{
          fontSize: compact ? "14px" : "16px",
          color: isDark ? "#D4922A" : "#B97A20",
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.35s ease",
          transform: isDark ? "rotate(0deg)" : "rotate(20deg)",
        }}
      >
        {isDark ? (
          <i className="fa-solid fa-moon" />
        ) : (
          <i className="fa-solid fa-sun" />
        )}
      </span>
    </button>
  );
}
