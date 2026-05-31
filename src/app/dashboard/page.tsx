
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

/* ─── tiny helpers ─────────────────────────────────────────── */
const GOLD      = "var(--color-primary-accent, #D4922A)";
const GOLD_GLOW = "rgba(var(--rgb-accent, 212, 146, 42), 0.18)";
const GOLD_BR   = "rgba(var(--rgb-accent, 212, 146, 42), 0.20)";
const SURFACE   = "#162436";
const BG        = "#0D1B2A";
const TEXT      = "#F2ECD9";
const MUTED     = "rgba(255,255,255,0.5)";
const BLUE      = "#4A9EDB";
const GREEN     = "#3DD68C";
const RED       = "#E55353";

/* ─── stat card ─────────────────────────────────────────────── */
function StatCard({
  icon, value, label, sub, color = GOLD,
}: {
  icon: string; value: React.ReactNode; label: string; sub: string; color?: string;
}) {
  return (
    <div
      className="hover-card-up flex items-center gap-4 rounded-2xl p-5"
      style={{ background: SURFACE, border: `1px solid ${GOLD_BR}` }}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl"
        style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}
      >
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div>
        <div className="text-2xl font-heading font-bold leading-none" style={{ color: TEXT }}>
          {value}
        </div>
        <div className="mt-0.5 text-sm font-semibold" style={{ color: TEXT }}>
          {label}
        </div>
        <div className="text-xs" style={{ color: MUTED }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

/* ─── progress row ──────────────────────────────────────────── */
function ProgressRow({
  label, pct, color = GOLD, icon,
}: {
  label: string; pct: number; color?: string; icon: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="flex items-center gap-2 font-medium" style={{ color: TEXT }}>
          <i className={`fa-solid ${icon} text-xs`} style={{ color }}></i>
          {label}
        </span>
        <span className="font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
        />
      </div>
    </div>
  );
}

/* ─── quick link card ───────────────────────────────────────── */
function QuickCard({
  href, icon, label, color = GOLD, badge,
}: {
  href: string; icon: string; label: string; color?: string; badge?: string;
}) {
  return (
    <Link
      href={href}
      className="hover-card-up relative flex flex-col items-center justify-center gap-3 rounded-2xl border p-5 text-center transition-all"
      style={{ background: SURFACE, borderColor: GOLD_BR }}
    >
      {badge && (
        <span
          className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
          style={{ background: `${color}18`, color }}
        >
          {badge}
        </span>
      )}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
        style={{ background: `${color}18`, border: `1px solid ${color}28`, color }}
      >
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: TEXT }}>
        {label}
      </span>
    </Link>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────── */
export default function Dashboard() {
  const { user, loading } = useUser();
  const [stats, setStats] = useState({ mockTestsAttempted: 0, mcqsSolved: 0, averageAccuracy: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/user/dashboard-stats');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setStats(json.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setStatsLoading(false);
      }
    }
    fetchStats();
  }, []);

  const currentLevel = user?.level ?? 0;
  const currentXp    = user?.xp ?? 0;
  const nextLevelXp  = Math.max((currentLevel || 1) * 1000, 1000);
  const xpProgress   = currentLevel > 0 ? ((currentXp % 1000) / 10) : 0;
  const profileName  = user?.name?.trim() || "Aspirant";

  /* scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll(".animate-on-scroll");
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries, o) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); o.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="space-y-6">

      {/* ────────────────── HERO ─────────────────── */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 md:p-8"
        style={{
          background: "linear-gradient(135deg, #162436 0%, #0D1B2A 60%, #111d2c 100%)",
          border: `1px solid ${GOLD_BR}`,
        }}
      >
        {/* decorative glows */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,146,42,0.14) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(74,158,219,0.10) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Text */}
          <div className="max-w-xl">
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
              style={{ background: GOLD_GLOW, border: `1px solid ${GOLD_BR}`, color: GOLD }}
            >
              <i className="fa-solid fa-crown text-[10px]"></i>
              {loading ? "Loading profile…" : currentLevel > 0 ? `Level ${currentLevel} Scholar` : "Profile Sync Pending"}
            </div>

            <h2 className="text-2xl font-bold leading-tight md:text-3xl" style={{ color: TEXT }}>
              {loading
                ? "Loading your dashboard…"
                : <>Your Preparation,{" "}<span style={{ color: GOLD }}>Your Selection.</span></>}
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
              {loading
                ? "We are syncing your latest progress and rewards."
                : currentLevel > 0
                ? `You're ${Math.max(nextLevelXp - currentXp, 0)} XP away from Level ${currentLevel + 1}.`
                : "Start your journey towards a secure government job with India's most trusted practice platform."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/test"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold shadow-lg"
              >
                Start Mock Test <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
              <Link
                href="/practice"
                className="btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold"
              >
                Practice MCQs
              </Link>
            </div>
          </div>

          {/* Circular XP */}
          <div className="relative mx-auto h-36 w-36 flex-shrink-0 md:mx-0">
            <svg viewBox="0 0 36 36" className="circular-chart w-full h-full" style={{ filter: "drop-shadow(0 0 12px rgba(212,146,42,0.25))" }}>
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path
                className="circle"
                strokeDasharray={`${xpProgress}, 100`}
                stroke={GOLD}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: TEXT }}>{xpProgress.toFixed(0)}%</span>
              <span className="text-[10px]" style={{ color: MUTED }}>
                {currentLevel > 0 ? `to Lvl ${currentLevel + 1}` : "Overall Progress"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────── STAT CARDS ─────────────────── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 animate-on-scroll">
        <StatCard icon="fa-book-open"    value={statsLoading ? "--" : stats.mockTestsAttempted.toLocaleString()}      label="Mock Tests"       sub="Tests Attempted"      color={GOLD}  />
        <StatCard icon="fa-bullseye"     value={statsLoading ? "--" : stats.mcqsSolved.toLocaleString()}   label="MCQs Solved"      sub="Across All Topics"    color={BLUE}  />
        <StatCard icon="fa-chart-line"   value={statsLoading ? "--" : `${stats.averageAccuracy}%`}   label="Average Accuracy" sub="All Time"             color={GREEN} />
        {/* <StatCard icon="fa-fire"         value="12"      label="Day Streak"       sub="Keep it up!"          color={GOLD}  /> */}
      </div>

      {/* ────────────────── QUICK ACCESS ─────────────────── */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 animate-on-scroll">
        <QuickCard href="/subjects"  icon="fa-book"             label="Syllabus"    color={GOLD}  />
        <QuickCard href="/practice"  icon="fa-pen-to-square"    label="Practice"    color={GREEN} badge="Daily" />
        <QuickCard href="/test"      icon="fa-clipboard-check"  label="Mock Tests"  color={GOLD}  badge="New"   />
        {/* <QuickCard href="/rewards"   icon="fa-gift"             label="Rewards"     color={BLUE}  /> */}
        <QuickCard href="/pricing"   icon="fa-tags"             label="Plans"       color={GOLD}  />
        <QuickCard href="/profile"   icon="fa-user"             label="Profile"     color={MUTED as string} />
      </div>

      {/* ────────────────── MIDDLE ROW ─────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 animate-on-scroll">

        {/* Progress panel */}
        <div
          className="lg:col-span-2 rounded-2xl p-6"
          style={{ background: SURFACE, border: `1px solid ${GOLD_BR}` }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold" style={{ color: TEXT }}>Your Progress</h3>
            <span
              className="rounded-lg px-3 py-1 text-xs font-bold"
              style={{ background: GOLD_GLOW, color: GOLD, border: `1px solid ${GOLD_BR}` }}
            >
              This Month
            </span>
          </div>

          <div className="space-y-4">
            <ProgressRow label="General Knowledge"      pct={76} icon="fa-brain"         color={GOLD}  />
            <ProgressRow label="Reasoning"              pct={68} icon="fa-puzzle-piece"   color={BLUE}  />
            <ProgressRow label="Quantitative Aptitude"  pct={71} icon="fa-calculator"     color={GREEN} />
            <ProgressRow label="Gujarati Language"      pct={80} icon="fa-language"       color={GOLD}  />
            <ProgressRow label="English Language"       pct={65} icon="fa-spell-check"    color={BLUE}  />
          </div>

          <button
            className="btn-secondary mt-6 w-full rounded-xl py-2.5 text-sm"
          >
            View Detailed Analysis <i className="fa-solid fa-arrow-right ml-1 text-xs"></i>
          </button>
        </div>

        {/* Recent mock test */}
        <div
          className="rounded-2xl p-6 flex flex-col"
          style={{ background: SURFACE, border: `1px solid ${GOLD_BR}` }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold" style={{ color: TEXT }}>Recent Mock Test</h3>
            <Link href="/test" className="text-xs font-bold hover:underline" style={{ color: GOLD }}>
              View All
            </Link>
          </div>

          {/* test entry */}
          <div
            className="flex-1 rounded-xl p-4"
            style={{ background: BG, border: `1px solid ${GOLD_BR}` }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm"
                style={{ background: GOLD_GLOW, border: `1px solid ${GOLD_BR}`, color: GOLD }}
              >
                <i className="fa-solid fa-clipboard-list"></i>
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: TEXT }}>GPSC Class 1 Mock Test – 07</div>
                <div className="text-[11px] mt-0.5" style={{ color: MUTED }}>Full Length Mock Test</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-[11px] mb-4" style={{ color: MUTED }}>
              <span><i className="fa-regular fa-circle-question mr-1"></i>150 Questions</span>
              <span><i className="fa-regular fa-clock mr-1"></i>3 Hours</span>
              <span><i className="fa-solid fa-star mr-1"></i>400 Marks</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              {[
                { label: "Your Score", value: "256/400", color: GOLD },
                { label: "Accuracy",   value: "84%",     color: GREEN },
                { label: "Rank",       value: "125/2450", color: BLUE },
              ].map(s => (
                <div key={s.label} className="rounded-lg p-2" style={{ background: `${s.color}0d` }}>
                  <div className="text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[10px]" style={{ color: MUTED }}>{s.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/test"
              className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold"
            >
              View Test Analysis <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* ────────────────── BOTTOM ROW ─────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 animate-on-scroll">

        {/* Top Exams */}
        <div
          className="lg:col-span-2 rounded-2xl p-6"
          style={{ background: SURFACE, border: `1px solid ${GOLD_BR}` }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold" style={{ color: TEXT }}>Top Exams</h3>
            <Link href="/subjects" className="text-xs font-bold hover:underline" style={{ color: GOLD }}>
              View All
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "GPSC",    count: 12, icon: "fa-landmark" },
              { name: "SSC CGL", count: 18, icon: "fa-scroll" },
              { name: "PSI",     count: 15, icon: "fa-shield-halved" },
              { name: "Banking", count: 20, icon: "fa-building-columns" },
              { name: "Railway", count: 14, icon: "fa-train" },
            ].map(exam => (
              <Link
                key={exam.name}
                href="/subjects"
                className="exam-card flex flex-col items-center gap-2 rounded-xl p-4 text-center w-[calc(20%-0.6rem)] min-w-[80px] flex-1"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-lg"
                  style={{ background: GOLD_GLOW, border: `1px solid ${GOLD_BR}`, color: GOLD }}
                >
                  <i className={`fa-solid ${exam.icon}`}></i>
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: TEXT }}>{exam.name}</div>
                  <div className="text-[10px]" style={{ color: MUTED }}>{exam.count} Tests</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Current Affairs + Daily Goal combined */}
        <div className="flex flex-col gap-4">

          {/* Daily Goal */}
          <div
            className="rounded-2xl p-5"
            style={{ background: SURFACE, border: `1px solid ${GOLD_BR}` }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold" style={{ color: TEXT }}>Daily Goal</h3>
              <button className="text-xs font-bold hover:underline" style={{ color: GOLD }}>
                Edit Goal
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path
                    className="circle"
                    strokeDasharray="70, 100"
                    stroke={GOLD}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold" style={{ color: TEXT }}>7/10</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: TEXT }}>Tests</div>
                <div className="text-xs mt-0.5" style={{ color: GREEN }}>Great! You're on track.</div>
              </div>
            </div>
            <Link
              href="/practice"
              className="btn-primary mt-4 flex w-full items-center justify-center rounded-xl py-2 text-sm font-bold"
            >
              Continue Practice
            </Link>
          </div>

          {/* Current Affairs */}
          <div
            className="rounded-2xl p-5"
            style={{ background: SURFACE, border: `1px solid ${GOLD_BR}` }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold" style={{ color: TEXT }}>Current Affairs</h3>
              <Link href="/subjects" className="text-xs font-bold hover:underline" style={{ color: GOLD }}>
                View All
              </Link>
            </div>
            <div className="space-y-2.5">
              {[
                { title: "Important Committee on Education", date: "May 19, 2025" },
                { title: "New Agricultural Scheme Launched",  date: "May 18, 2025" },
                { title: "Sports Current Affairs – May 2025", date: "May 17, 2025" },
              ].map(item => (
                <div key={item.title} className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <i className="fa-regular fa-calendar-days mt-0.5 text-[11px] shrink-0" style={{ color: GOLD }}></i>
                    <span className="text-xs leading-snug truncate" style={{ color: "rgba(242,236,217,0.8)" }}>
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] shrink-0" style={{ color: MUTED }}>{item.date}</span>
                </div>
              ))}
            </div>
            <button
              className="btn-secondary mt-4 w-full rounded-xl py-2 text-xs font-bold"
            >
              Read More Current Affairs <i className="fa-solid fa-arrow-right ml-1 text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>

      {/* ────────────────── AI INSIGHTS + ACTION CARDS ─────────────────── */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 animate-on-scroll">

        {/* AI Insights */}
        <div
          className="relative overflow-hidden rounded-2xl p-6"
          style={{ background: SURFACE, border: `1px solid ${GOLD_BR}` }}
        >
          <div
            className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(74,158,219,0.15) 0%, transparent 70%)" }}
          />
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold" style={{ color: TEXT }}>
            <i className="fa-solid fa-wand-magic-sparkles" style={{ color: BLUE }}></i>
            AI Insights
          </h3>
          <div className="space-y-3">
            <div className="rounded-xl p-4" style={{ background: `${RED}0d`, border: `1px solid ${RED}25` }}>
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold" style={{ color: RED }}>
                <i className="fa-solid fa-triangle-exclamation"></i> Weak Area Detected
              </div>
              <p className="text-sm" style={{ color: "rgba(242,236,217,0.8)" }}>
                Your accuracy in <strong style={{ color: TEXT }}>Communication Engineering</strong> dropped by 15% this week.
              </p>
              <Link
                href="/practice?mode=quick"
                className="mt-2 inline-block text-xs font-bold hover:underline"
                style={{ color: RED }}
              >
                Practice Weakness →
              </Link>
            </div>
            <div className="rounded-xl p-4" style={{ background: `${GREEN}0d`, border: `1px solid ${GREEN}25` }}>
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold" style={{ color: GREEN }}>
                <i className="fa-solid fa-chart-line"></i> Strong Momentum
              </div>
              <p className="text-sm" style={{ color: "rgba(242,236,217,0.8)" }}>
                You are in the <strong style={{ color: GREEN }}>top 10%</strong> of students for{" "}
                <strong style={{ color: TEXT }}>Digital Electronics & VLSI</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              href: "/practice?mode=quick",
              icon: "fa-bolt",
              title: "Quick Practice",
              sub: "Exam in 35 Days",
              color: GOLD,
            },
            /* {
              href: "/profile",
              icon: "fa-share-nodes",
              title: "Refer & Earn",
              sub: "Get 300 Coins",
              color: GREEN,
            },
            {
              href: "/rewards",
              icon: "fa-book-open-reader",
              title: "Premium Notes",
              sub: "Unlock with Coins",
              color: BLUE,
              locked: true,
            }, */
            {
              href: "/test",
              icon: "fa-file-signature",
              title: "Full Mock Test",
              sub: "June 21 Goal",
              color: GOLD,
            },
          ].map(card => (
            <Link
              key={card.href}
              href={card.href}
              className="hover-card-up relative flex flex-col items-center justify-center gap-3 rounded-2xl border p-5 text-center"
              style={{ background: SURFACE, borderColor: GOLD_BR }}
            >
              {(card as any).locked && (
                <div
                  className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ background: GOLD }}
                >
                  <i className="fa-solid fa-lock text-[8px]" style={{ color: BG }}></i>
                </div>
              )}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                style={{ background: `${card.color}18`, border: `1px solid ${card.color}28`, color: card.color }}
              >
                <i className={`fa-solid ${card.icon}`}></i>
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: TEXT }}>{card.title}</div>
                <div className="text-[11px]" style={{ color: card.color }}>{card.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ────────────────── TARGET PROGRESS ─────────────────── */}
      <div
        className="rounded-2xl p-6 animate-on-scroll"
        style={{ background: SURFACE, border: `1px solid ${GOLD_BR}` }}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold" style={{ color: TEXT }}>Target: Wireless PSI (WPSI)</h3>
          <span
            className="rounded-lg px-3 py-1 text-xs font-bold"
            style={{ background: GOLD_GLOW, color: GOLD, border: `1px solid ${GOLD_BR}` }}
          >
            Overall: 68%
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <ProgressRow label="Part A: General & Aptitude"  pct={89} icon="fa-brain"            color={GOLD}  />
          <ProgressRow label="Part B: Technical Subjects"  pct={55} icon="fa-microchip"        color={BLUE}  />
          <ProgressRow label="Communication Engineering"   pct={24} icon="fa-satellite-dish"   color={RED}   />
        </div>
        <button className="btn-secondary mt-5 w-full rounded-xl py-2.5 text-sm">
          Resume Study Plan
        </button>
      </div>

      {/* ────────────────── FOOTER TRUST BAR ─────────────────── */}
      <div
        className="grid grid-cols-2 gap-3 rounded-2xl p-4 text-center text-xs sm:grid-cols-4 animate-on-scroll"
        style={{ background: SURFACE, border: `1px solid ${GOLD_BR}` }}
      >
        {[
          { icon: "fa-users",              text: "Trusted by 10L+ Aspirants"           },
          { icon: "fa-shield-halved",      text: "India's Most Comprehensive Test Series" },
          { icon: "fa-file-lines",         text: "Detailed Solutions & Analysis"       },
          { icon: "fa-rotate",             text: "Regular Updates & Current Affairs"   },
        ].map(item => (
          <div key={item.text} className="flex items-center justify-center gap-2" style={{ color: MUTED }}>
            <i className={`fa-solid ${item.icon} text-sm`} style={{ color: GOLD }}></i>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
