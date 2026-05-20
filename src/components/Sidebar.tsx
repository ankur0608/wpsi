"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface NavLink {
  href: string;
  icon: string;
  label: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const displayName = user?.name?.trim() || "Profile";
  const displayLevel = user?.level;

  const links: NavLink[] = [
    { href: "/dashboard", icon: "fa-house", label: "Dashboard" },
    { href: "/subjects", icon: "fa-book", label: "Syllabus & Topics" },
    { href: "/practice", icon: "fa-pen-to-square", label: "MCQ Practice" },
    { href: "/test", icon: "fa-clipboard-check", label: "Mock Tests" },
    { href: "/pricing", icon: "fa-tags", label: "Pricing & Plans" },
    { href: "/admin", icon: "fa-shield-halved", label: "Admin Panel" },
  ];

  const isActive = (href: string) => {
    if (href === "/subjects" && (pathname === "/subjects" || pathname === "/topics")) {
      return true;
    }

    return pathname === href;
  };

  return (
    <>
      <div
        id="mobile-sidebar-overlay"
        className={`fixed inset-0 z-40 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[18rem] flex-col border-r border-white/10 bg-slate-950/95 shadow-[0_24px_80px_rgba(2,6,23,0.65)] backdrop-blur-xl transition-transform duration-300 md:relative md:translate-x-0 md:bg-slate-950/88 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
          <Link href="/" className="flex flex-1 items-center gap-2.5" onClick={onClose}>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg shadow-brand-500/20"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              <i className="fa-solid fa-graduation-cap text-sm text-white"></i>
            </div>
            <div>
              <div className="font-heading text-lg font-bold text-white">
                WPSI<span className="text-brand-400">Pro</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Study Console</div>
            </div>
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">
            Navigation
          </div>
          <nav className="space-y-1.5">
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`group flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "border-brand-500/30 bg-brand-500/15 text-white shadow-[0_12px_30px_rgba(99,102,241,0.16)]"
                      : "border-transparent bg-white/[0.03] text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                      active ? "bg-brand-500/15 text-brand-300" : "bg-slate-900/80 text-slate-500 group-hover:text-slate-200"
                    }`}
                  >
                    <i className={`fa-solid ${link.icon} text-sm`}></i>
                  </div>
                  <span className="flex-1">{link.label}</span>
                  {active && <span className="h-2 w-2 rounded-full bg-brand-400"></span>}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/18 via-slate-900 to-slate-950 p-4 shadow-[0_18px_40px_rgba(99,102,241,0.12)]">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.28em] text-brand-300">WPSI 2025 Combo</div>
            <p className="text-sm leading-6 text-slate-300">
              Full Part A + B access at <span className="font-bold text-white">Rs 249</span> with the cleanest prep flow.
            </p>
            <Link
              href="/pricing"
              onClick={onClose}
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              Upgrade Now
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 bg-slate-950/95 p-3">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06]">
            <Link href="/profile" onClick={onClose} className="group flex min-w-0 flex-1 items-center gap-3">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e293b&color=818cf8&bold=true&size=80`}
                className="h-11 w-11 shrink-0 rounded-2xl border border-white/10"
                alt="User avatar"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold text-white transition-colors group-hover:text-brand-300">
                  {loading ? "Loading profile..." : displayName}
                </div>
                <div className="text-[11px] text-slate-400">
                  {loading ? "Syncing profile" : displayLevel !== undefined ? `Level ${displayLevel}` : "Profile unavailable"}
                </div>
              </div>
            </Link>
            <Link
              href="/settings"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              title="Settings"
            >
              <i className="fa-solid fa-gear text-sm"></i>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
