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
    { href: "/dashboard",  icon: "fa-house",           label: "Dashboard"         },
    { href: "/subjects",   icon: "fa-book",             label: "Syllabus & Topics" },
    { href: "/practice",   icon: "fa-pen-to-square",    label: "MCQ Practice"      },
    { href: "/test",       icon: "fa-clipboard-check",  label: "Mock Tests"        },
    { href: "/results",    icon: "fa-chart-pie",        label: "Results"           },
    { href: "/bookmarks",  icon: "fa-bookmark",         label: "Saved MCQs"        },
    { href: "/pricing",    icon: "fa-tags",             label: "Pricing & Plans"   },
  ];

  const isActive = (href: string) => {
    if (href === "/subjects" && (pathname === "/subjects" || pathname === "/topics")) return true;
    return pathname === href;
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        id="mobile-sidebar-overlay"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[17rem] flex-col shadow-[0_0_80px_rgba(0,0,0,0.6)] transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "rgba(9, 21, 34, 0.99)",
          borderRight: "1px solid rgba(212, 146, 42, 0.12)",
        }}
      >
        {/* Logo */}
        <div
          className="flex h-[68px] items-center gap-3 px-5"
          style={{ borderBottom: "1px solid rgba(212, 146, 42, 0.10)" }}
        >
          <Link href="/" className="flex flex-1 items-center gap-3" onClick={onClose}>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl shadow-lg"
              style={{ background: "linear-gradient(135deg, #D4922A, #F0B85A)" }}
            >
              <i className="fa-solid fa-graduation-cap text-sm" style={{ color: "#0D1B2A" }}></i>
            </div>
            <div>
              <div
                className="font-heading text-[17px] font-bold"
                style={{ color: "#F2ECD9" }}
              >
                WPSI<span style={{ color: "#D4922A" }}>Pro</span>
              </div>
              <div
                className="text-[9px] uppercase tracking-[0.28em]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Study Console
              </div>
            </div>
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-white/5 md:hidden"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div
            className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.32em]"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Navigation
          </div>

          <nav className="space-y-1">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`nav-item group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active ? "nav-active" : "border-transparent"
                  }`}
                  style={{ color: active ? "#F2ECD9" : "rgba(255,255,255,0.55)" }}
                >
                  <div
                    className={`nav-icon flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                      active ? "" : "group-hover:bg-white/5"
                    }`}
                    style={
                      active
                        ? { background: "rgba(212,146,42,0.18)", color: "#D4922A" }
                        : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }
                    }
                  >
                    <i className={`fa-solid ${link.icon} text-xs`}></i>
                  </div>
                  <span className="flex-1">{link.label}</span>
                  {active && (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "#D4922A" }}
                    ></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Upgrade card */}
          <div
            className="mt-6 rounded-2xl p-4"
            style={{
              background: "linear-gradient(135deg, rgba(212,146,42,0.14) 0%, rgba(13,27,42,0.9) 100%)",
              border: "1px solid rgba(212,146,42,0.24)",
            }}
          >
            <div className="mb-1 flex items-center gap-2">
              <i className="fa-solid fa-crown text-xs" style={{ color: "#D4922A" }}></i>
              <span
                className="text-[9px] font-bold uppercase tracking-[0.28em]"
                style={{ color: "#D4922A" }}
              >
                WPSI 2025 Combo
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-5" style={{ color: "rgba(242,236,217,0.7)" }}>
              Full Part A + B access at{" "}
              <span className="font-bold" style={{ color: "#F2ECD9" }}>
                Rs 249
              </span>{" "}
              with the cleanest prep flow.
            </p>
            <Link
              href="/pricing"
              onClick={onClose}
              className="btn-primary mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm"
            >
              <i className="fa-solid fa-bolt text-xs"></i>
              Upgrade Now
            </Link>
          </div>
        </div>

        {/* User footer */}
        <div
          className="p-3"
          style={{ borderTop: "1px solid rgba(212,146,42,0.10)", background: "rgba(9,21,34,0.99)" }}
        >
          <div
            className="flex items-center gap-3 rounded-xl border p-2.5 transition-colors hover:bg-white/[0.03]"
            style={{ borderColor: "rgba(212,146,42,0.12)" }}
          >
            <Link href="/profile" onClick={onClose} className="group flex min-w-0 flex-1 items-center gap-3">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=162436&color=D4922A&bold=true&size=80`}
                className="h-10 w-10 shrink-0 rounded-xl border"
                style={{ borderColor: "rgba(212,146,42,0.2)" }}
                alt="User avatar"
              />
              <div className="min-w-0 flex-1">
                <div
                  className="truncate text-sm font-bold transition-colors group-hover:text-[#D4922A]"
                  style={{ color: "#F2ECD9" }}
                >
                  {loading ? "Loading..." : displayName}
                </div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {loading
                    ? "Syncing profile"
                    : displayLevel !== undefined
                    ? `Level ${displayLevel}`
                    : "Profile unavailable"}
                </div>
              </div>
            </Link>
            <Link
              href="/settings"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.4)" }}
              title="Settings"
            >
              <i className="fa-solid fa-gear text-xs"></i>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
