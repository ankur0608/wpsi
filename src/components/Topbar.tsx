"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

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
    "/subjects": "Subjects & Topics",
    "/topics": "Subject Chapters",
    "/test": "Mock Tests",
    "/pricing": "Pricing & Plans",
    "/profile": "My Profile",
    "/settings": "Settings",
    "/rewards": "Rewards Store",
    "/streaks": "Streaks",
    "/practice": "MCQ Practice",
    "/admin": "Admin Panel",
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpenPopover(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setOpenPopover(null);
  }, [pathname]);

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

  const popoverClass =
    "absolute z-50 right-0 top-full mt-3 rounded-2xl border border-white/10 bg-slate-950 p-5 shadow-[0_28px_80px_rgba(2,6,23,0.7)]";
  return (
    <header
      id="main-topbar"
      className="border-b border-white/10 bg-slate-950/88 px-4 sm:px-6 backdrop-blur-xl"
      style={{ minHeight: "64px" }}
    >
      <div className="flex min-h-16 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white md:hidden"
            onClick={onMenuClick}
            aria-label="Open navigation"
          >
            <i className="fa-solid fa-bars text-base"></i>
          </button>

          {showBackButton && pathname === "/topics" && (
            <Link
              href="/subjects"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          )}

          <div className="min-w-0">
            <h1 className="truncate text-base font-heading font-bold text-white sm:text-lg">{displayTitle}</h1>
            <div className="hidden text-[10px] font-medium uppercase tracking-[0.28em] text-slate-500 sm:block">
              WPSI Exam: June 21, 2026
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3" ref={popoverRef}>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              className="relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all"
              style={{ background: "rgba(245,158,11,0.12)", borderColor: "rgba(245,158,11,0.24)" }}
              onClick={() => togglePopover("streak")}
            >
              <i className="fa-solid fa-fire text-sm text-warning"></i>
              <span className="text-sm font-bold text-white">{loading ? "--" : user?.streak ?? "--"}</span>
            </button>
            {openPopover === "streak" && (
              <div className={`${popoverClass} w-72`}>
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-warning"
                    style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}
                  >
                    <i className="fa-solid fa-fire"></i>
                  </div>
                  <div>
                    <div className="font-bold text-white">{loading ? "Loading streak" : `${user?.streak ?? 0} Day Streak`}</div>
                    <div className="text-xs text-slate-400">Stay consistent to keep your momentum growing.</div>
                  </div>
                </div>
                <div
                  className="mb-3 rounded-2xl p-3"
                  style={{ background: "rgba(8,12,24,0.72)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Next milestone reward</span>
                    <span className="font-bold text-warning">+30 bonus coins</span>
                  </div>
                </div>
                <Link href="/streaks" className="text-xs font-bold text-brand-400 transition-colors hover:text-brand-300">
                  Manage streaks
                </Link>
              </div>
            )}

            <button
              type="button"
              className="relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all"
              style={{ background: "rgba(99,102,241,0.12)", borderColor: "rgba(99,102,241,0.24)" }}
              onClick={() => togglePopover("coins")}
            >
              <i className="fa-solid fa-coins text-sm text-brand-400"></i>
              <span className="text-sm font-bold text-white">{loading ? "--" : user?.coins?.toLocaleString() ?? "--"}</span>
            </button>
            {openPopover === "coins" && (
              <div className={`${popoverClass} w-60`}>
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-brand-400"
                    style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}
                  >
                    <i className="fa-solid fa-coins"></i>
                  </div>
                  <div>
                    <div className="font-bold text-white">{loading ? "Loading coins" : `${user?.coins?.toLocaleString() ?? 0} Coins`}</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-400">Bronze Tier</div>
                  </div>
                </div>
                <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400" style={{ width: "81.6%" }}></div>
                </div>
                <div className="mb-3 text-center text-[10px] leading-tight text-slate-400">
                  550 more to <span className="font-bold text-white">Silver Tier</span>
                </div>
                <Link href="/rewards" className="text-xs font-bold text-brand-400 transition-colors hover:text-brand-300">
                  Open rewards store
                </Link>
              </div>
            )}
          </div>

          <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 sm:flex">
            <span className="font-semibold text-white">{loading ? "--" : user?.coins?.toLocaleString() ?? "--"}</span>
            <span className="mx-2 text-slate-600">|</span>
            <span>{loading ? "--" : `${user?.streak ?? "--"} day streak`}</span>
          </div>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <i className="fa-solid fa-bell text-base"></i>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(99,102,241,0.9)]"></span>
          </button>

          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-1.5 transition-colors hover:bg-white/[0.08]"
              onClick={() => togglePopover("profile")}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e293b&color=818cf8&bold=true&size=80`}
                className="h-8 w-8 rounded-xl border border-white/10"
                alt="User avatar"
              />
              <div className="hidden text-left sm:block">
                <div className="max-w-28 truncate text-sm font-semibold text-white">
                  {loading ? "Loading..." : displayName}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {loading ? "Syncing" : displayLevel !== undefined ? `Level ${displayLevel}` : "Profile"}
                </div>
              </div>
              <i className="fa-solid fa-chevron-down hidden text-[10px] text-slate-400 sm:block"></i>
            </button>

            {openPopover === "profile" && (
              <div className={`${popoverClass} w-56 p-2`}>
                <div className="mb-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
                  <p className="text-sm font-bold text-white">{loading ? "Loading profile..." : displayName}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-400">
                    {loading ? "Syncing profile" : displayLevel !== undefined ? `Level ${displayLevel}` : "Profile unavailable"}
                  </p>
                </div>

                <Link href="/profile" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white">
                  <i className="fa-solid fa-user w-4 text-xs"></i>
                  My Profile
                </Link>
                <Link href="/pricing" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white">
                  <i className="fa-solid fa-crown w-4 text-xs text-warning"></i>
                  Upgrade Store
                </Link>
                <Link href="/rewards" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white">
                  <i className="fa-solid fa-coins w-4 text-xs text-brand-400"></i>
                  Rewards Store
                </Link>
                <Link href="/settings" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white">
                  <i className="fa-solid fa-gear w-4 text-xs"></i>
                  Settings
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-danger transition-colors hover:bg-red-500/10"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <i className="fa-solid fa-right-from-bracket w-4 text-xs"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-white/5 pb-3 pt-2 sm:hidden">
        <div className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-warning/20 bg-warning/10 px-3 py-2 text-xs text-slate-200">
          <i className="fa-solid fa-fire text-warning"></i>
          <span>{loading ? "--" : `${user?.streak ?? 0} day streak`}</span>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-brand-500/20 bg-brand-500/10 px-3 py-2 text-xs text-slate-200">
          <i className="fa-solid fa-coins text-brand-400"></i>
          <span>{loading ? "--" : `${user?.coins?.toLocaleString() ?? 0} coins`}</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
