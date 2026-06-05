"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import ThemeToggle from "@/components/ThemeToggle";

interface TopbarProps {
  title?: string;
  showBackButton?: boolean;
  onMenuClick?: () => void;
}

type PopoverKey = "profile" | "streak" | "coins" | null;

const Topbar: React.FC<TopbarProps> = ({ title = "Dashboard", showBackButton = false, onMenuClick }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useUser();
  const displayName = user?.name?.trim() || "Profile";
  const displayLevel = user?.level;
  const [openPopover, setOpenPopover] = useState<PopoverKey>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/subjects":  "Subjects & Topics",
    "/topics":    "Subject Chapters",
    "/test":      "Mock Tests",
    "/pricing":   "Pricing & Plans",
    "/profile":   "My Profile",
    "/settings":  "Settings",
    "/rewards":   "Rewards Store",
    "/streaks":   "Streaks",
    "/practice":  "MCQ Practice",
    "/admin":     "Admin Panel",
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpenPopover(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => { setOpenPopover(null); }, [pathname]);

  const displayTitle = titles[pathname] || title;

  const handleLogout = async () => {
    setOpenPopover(null);
    await logout();
    router.replace("/login");
    router.refresh();
  };

  const togglePopover = (key: Exclude<PopoverKey, null>) => {
    setOpenPopover((current) => (current === key ? null : key));
  };

  const popoverBase =
    "absolute z-50 right-0 top-full mt-3 rounded-2xl p-5 shadow-[0_28px_80px_rgba(0,0,0,0.35)]";
  const popoverStyle = {
    background: "var(--popover-bg)",
    border: "1px solid var(--popover-border)",
    backdropFilter: "blur(24px)",
  };

  return (
    <header
      id="main-topbar"
      style={{
        position: "relative",
        zIndex: 50,
        minHeight: "64px",
        borderBottom: "1px solid var(--border-accent)",
      }}
      className="px-4 sm:px-6"
    >
      <div className="flex min-h-16 items-center justify-between gap-3">
        {/* Left: hamburger + title */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors hover:bg-white/[0.06] md:hidden"
            style={{ borderColor: "var(--border-accent)", color: "var(--text-secondary)" }}
            onClick={onMenuClick}
            aria-label="Open navigation"
          >
            <i className="fa-solid fa-bars text-base"></i>
          </button>

          {showBackButton && pathname === "/topics" && (
            <Link
              href="/subjects"
              className="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors hover:bg-white/[0.06]"
              style={{ borderColor: "var(--border-accent)", color: "var(--text-secondary)" }}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          )}

          <div className="min-w-0">
            <h1
              className="truncate text-base font-heading font-bold sm:text-lg"
              style={{ color: "var(--text-primary)" }}
            >
              {displayTitle}
            </h1>
            <div
              className="hidden text-[9px] font-medium uppercase tracking-[0.28em] sm:block"
              style={{ color: "var(--text-muted)" }}
            >
              WPSI Exam: June 21, 2026
            </div>
          </div>
        </div>

        {/* Right: badges + profile */}
        <div className="flex items-center gap-2 sm:gap-3" ref={popoverRef}>
          {/* Streak
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all hover:scale-105"
              style={{
                background: "rgba(212,146,42,0.10)",
                border: "1px solid rgba(212,146,42,0.22)",
              }}
              onClick={() => togglePopover("streak")}
            >
              <i className="fa-solid fa-fire text-sm" style={{ color: "#D4922A" }}></i>
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                {loading ? "--" : user?.streak ?? "--"}
              </span>
            </button>

            {openPopover === "streak" && (
              <div className={`${popoverBase} w-72`} style={popoverStyle}>
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-lg"
                    style={{
                      background: "rgba(212,146,42,0.12)",
                      border: "1px solid rgba(212,146,42,0.22)",
                      color: "#D4922A",
                    }}
                  >
                    <i className="fa-solid fa-fire"></i>
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: "var(--text-primary)" }}>
                      {loading ? "Loading streak" : `${user?.streak ?? 0} Day Streak`}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Stay consistent to keep your momentum growing.
                    </div>
                  </div>
                </div>
                <div
                  className="mb-3 rounded-xl p-3"
                  style={{ background: "rgba(212,146,42,0.06)", border: "1px solid rgba(212,146,42,0.12)" }}
                >
                  <div className="flex justify-between text-xs">
                    <span style={{ color: "var(--text-secondary)" }}>Next milestone reward</span>
                    <span className="font-bold" style={{ color: "#D4922A" }}>+30 bonus coins</span>
                  </div>
                </div>
                <Link
                  href="/streaks"
                  className="text-xs font-bold transition-colors hover:underline"
                  style={{ color: "#D4922A" }}
                >
                  Manage streaks →
                </Link>
              </div>
            )}

            Coins
            <button
              type="button"
              className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all hover:scale-105"
              style={{
                background: "rgba(74,158,219,0.10)",
                border: "1px solid rgba(74,158,219,0.22)",
              }}
              onClick={() => togglePopover("coins")}
            >
              <i className="fa-solid fa-coins text-sm" style={{ color: "#4A9EDB" }}></i>
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                {loading ? "--" : user?.coins?.toLocaleString() ?? "--"}
              </span>
            </button>

            {openPopover === "coins" && (
              <div className={`${popoverBase} w-60`} style={popoverStyle}>
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-lg"
                    style={{
                      background: "rgba(74,158,219,0.12)",
                      border: "1px solid rgba(74,158,219,0.22)",
                      color: "#4A9EDB",
                    }}
                  >
                    <i className="fa-solid fa-coins"></i>
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: "var(--text-primary)" }}>
                      {loading ? "Loading coins" : `${user?.coins?.toLocaleString() ?? 0} Coins`}
                    </div>
                    <div
                      className="text-[10px] font-black uppercase tracking-[0.24em]"
                      style={{ color: "#D4922A" }}
                    >
                      Bronze Tier
                    </div>
                  </div>
                </div>
                <div
                  className="mb-1 h-1.5 w-full overflow-hidden rounded-full"
                  style={{ background: "var(--input-bg)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: "81.6%", background: "linear-gradient(90deg, #D4922A, #F0B85A)" }}
                  ></div>
                </div>
                <div className="mb-3 text-center text-[10px] leading-tight" style={{ color: "var(--text-muted)" }}>
                  550 more to{" "}
                  <span className="font-bold" style={{ color: "var(--text-primary)" }}>
                    Silver Tier
                  </span>
                </div>
                <Link
                  href="/rewards"
                  className="text-xs font-bold transition-colors hover:underline"
                  style={{ color: "#D4922A" }}
                >
                  Open rewards store →
                </Link>
              </div>
            )}
          </div> */}

          {/* Notification bell */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border transition-colors hover:bg-white/[0.06]"
            style={{ borderColor: "var(--border-accent)", color: "var(--text-secondary)" }}
          >
            <i className="fa-solid fa-bell text-base"></i>
            <span
              className="absolute right-2 top-2 h-2 w-2 rounded-full"
              style={{ background: "#D4922A", boxShadow: "0 0 8px rgba(212,146,42,0.8)" }}
            ></span>
          </button>

          {/* Dark / Light mode toggle */}
          <ThemeToggle />

          {/* Profile dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border px-2 py-1.5 transition-colors hover:bg-white/[0.06]"
              style={{ borderColor: "var(--border-accent)" }}
              onClick={() => togglePopover("profile")}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=162436&color=D4922A&bold=true&size=80`}
                className="h-8 w-8 rounded-lg border"
                style={{ borderColor: "rgba(212,146,42,0.2)" }}
                alt="User avatar"
              />
              <div className="hidden text-left sm:block">
                <div className="max-w-28 truncate text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {loading ? "Loading..." : displayName}
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
                  {loading ? "Syncing" : displayLevel !== undefined ? `Level ${displayLevel}` : "Profile"}
                </div>
              </div>
              <i
                className="fa-solid fa-chevron-down hidden text-[10px] sm:block"
                style={{ color: "var(--text-muted)" }}
              ></i>
            </button>

            {openPopover === "profile" && (
              <div className={`${popoverBase} w-56 p-2`} style={popoverStyle}>
                <div
                  className="mb-1 rounded-xl px-3 py-3"
                  style={{ background: "var(--input-bg)", border: "1px solid var(--border-accent)" }}
                >
                  <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                    {loading ? "Loading profile..." : displayName}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: "#D4922A" }}>
                    {loading
                      ? "Syncing profile"
                      : displayLevel !== undefined
                      ? `Level ${displayLevel}`
                      : "Profile unavailable"}
                  </p>
                </div>

                {[
                  { href: "/profile",  icon: "fa-user",               label: "My Profile",     iconColor: "var(--text-secondary)" },
                  { href: "/pricing",  icon: "fa-crown",               label: "Upgrade Store",  iconColor: "#D4922A" },
                  // { href: "/rewards",  icon: "fa-coins",               label: "Rewards Store",  iconColor: "#4A9EDB" },
                  { href: "/settings", icon: "fa-gear",                label: "Settings",       iconColor: "var(--text-secondary)" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/[0.05]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <i className={`fa-solid ${item.icon} w-4 text-xs`} style={{ color: item.iconColor }}></i>
                    {item.label}
                  </Link>
                ))}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-red-500/10"
                  style={{ borderTop: "1px solid var(--border-subtle)", color: "#E55353" }}
                >
                  <i className="fa-solid fa-right-from-bracket w-4 text-xs"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile stats bar */}
      {/* <div
        className="flex items-center gap-2 pb-3 pt-2 sm:hidden"
        style={{ borderTop: "1px solid rgba(212,146,42,0.06)" }}
      >
        <div
          className="flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs"
          style={{ background: "rgba(212,146,42,0.08)", border: "1px solid rgba(212,146,42,0.16)" }}
        >
          <i className="fa-solid fa-fire" style={{ color: "#D4922A" }}></i>
          <span style={{ color: "rgba(242,236,217,0.85)" }}>
            {loading ? "--" : `${user?.streak ?? 0} day streak`}
          </span>
        </div>
        <div
          className="flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs"
          style={{ background: "rgba(74,158,219,0.08)", border: "1px solid rgba(74,158,219,0.16)" }}
        >
          <i className="fa-solid fa-coins" style={{ color: "#4A9EDB" }}></i>
          <span style={{ color: "rgba(242,236,217,0.85)" }}>
            {loading ? "--" : `${user?.coins?.toLocaleString() ?? 0} coins`}
          </span>
        </div>
      </div> */}
    </header>
  );
};

export default Topbar;
