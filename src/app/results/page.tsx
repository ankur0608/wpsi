"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

/* ─── tiny helpers ─────────────────────────────────────────── */
const GOLD      = "#D4922A";
const GOLD_GLOW = "rgba(212,146,42,0.18)";
const GOLD_BR   = "rgba(212,146,42,0.20)";
const SURFACE   = "#162436";
const BG        = "#0D1B2A";
const TEXT      = "#F2ECD9";
const MUTED     = "rgba(255,255,255,0.5)";
const BLUE      = "#4A9EDB";
const GREEN     = "#3DD68C";
const RED       = "#E55353";
const PURPLE    = "#B47AF3";

function StatCard({
  label, value, color, icon
}: {
  label: string; value: string | number; color: string; icon: string;
}) {
  return (
    <div className="rounded-2xl p-5 hover-card-up transition-all duration-300" style={{ background: SURFACE, border: `1px solid ${color}40` }}>
      <div className="flex items-center gap-2 mb-2">
        <i className={`fa-solid ${icon} text-[10px]`} style={{ color }}></i>
        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: MUTED }}>{label}</div>
      </div>
      <div className="text-3xl font-bold" style={{ color }}>{value}</div>
    </div>
  );
}

interface Submission {
  id: string;
  title: string;
  date: string;
  marks: number;
  totalMarks: number;
  percentage: number;
}

interface ResultsData {
  totalTests: number;
  avgMarks: number;
  avgAccuracy: number;
  highestScore: number;
  recentSubmissions: Submission[];
}

export default function ResultsPage() {
  const { user, loading: userLoading } = useUser();
  const [data, setData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLoading || !user) return;
    
    async function fetchData() {
      try {
        const res = await fetch('/api/user/results');
        if (res.ok) {
          const json = await res.json();
          setData(json.data);
        }
      } catch (e) {
        console.error('Failed to fetch results', e);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [user, userLoading]);

  /* scroll reveal */
  useEffect(() => {
    if (loading) return; // wait until rendered
    const els = document.querySelectorAll(".animate-on-scroll");
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries, o) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); o.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [loading, data]);

  if (loading || userLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" style={{ borderColor: GOLD }}></div>
      </div>
    );
  }

  const results = data || {
    totalTests: 0,
    avgMarks: 0,
    avgAccuracy: 0,
    highestScore: 0,
    recentSubmissions: []
  };

  return (
    <div className="space-y-8">
      
      {/* ────────────────── HEADER ─────────────────── */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 md:p-10"
        style={{
          background: "linear-gradient(135deg, #2c3e75 0%, #162436 100%)",
          border: `1px solid rgba(255,255,255,0.05)`,
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)"
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-3" style={{ color: TEXT }}>Results & Performance</h1>
            <p className="text-sm leading-relaxed max-w-lg" style={{ color: "rgba(242,236,217,0.8)" }}>
              Track your progress, analyze your accuracy, and review your past mock tests to identify areas of improvement.
            </p>
          </div>
          <div 
            className="flex-shrink-0 h-24 w-24 flex items-center justify-center rounded-full" 
            style={{ 
              background: "rgba(255,255,255,0.05)", 
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)"
            }}
          >
            <i className="fa-solid fa-trophy text-4xl" style={{ color: TEXT }}></i>
          </div>
        </div>
      </div>

      {/* ────────────────── OVERALL ANALYTICS ─────────────────── */}
      <div className="animate-on-scroll space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold" style={{ color: TEXT }}>Overall Analytics</h3>
          <span 
            className="rounded-xl px-3 py-1.5 text-xs font-bold" 
            style={{ background: SURFACE, color: BLUE, border: `1px solid rgba(74,158,219,0.2)` }}
          >
            {results.totalTests} Submissions
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="TOTAL TESTS" value={results.totalTests} color="rgba(255,255,255,0.4)" icon="fa-layer-group" />
          <StatCard label="AVG MARKS" value={results.avgMarks.toFixed(1)} color={GREEN} icon="fa-bullseye" />
          <StatCard label="AVG ACCURACY" value={`${results.avgAccuracy.toFixed(1)}%`} color={PURPLE} icon="fa-crosshairs" />
          <StatCard label="HIGHEST SCORE" value={`${results.highestScore.toFixed(1)}%`} color={GOLD} icon="fa-star" />
        </div>
      </div>

      {/* ────────────────── RECENT SUBMISSIONS ─────────────────── */}
      <div className="animate-on-scroll space-y-4">
        <h3 className="text-lg font-bold" style={{ color: TEXT }}>Recent Submissions</h3>
        
        {results.recentSubmissions.length === 0 ? (
          <div className="rounded-2xl p-8 text-center" style={{ background: SURFACE, border: `1px solid ${GOLD_BR}` }}>
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-4" style={{ background: "rgba(255,255,255,0.03)", color: MUTED }}>
              <i className="fa-solid fa-folder-open text-2xl"></i>
            </div>
            <h4 className="text-base font-bold mb-2" style={{ color: TEXT }}>No submissions yet</h4>
            <p className="text-sm max-w-sm mx-auto" style={{ color: MUTED }}>
              Start practicing MCQs or take a mock test to see your performance here.
            </p>
            <Link href="/practice" className="btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold shadow-lg">
              Start Practice <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>
        ) : (
          results.recentSubmissions.map((sub) => (
            <div 
              key={sub.id}
              className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 hover-card-up transition-all duration-300" 
              style={{ background: SURFACE, border: `1px solid ${GOLD_BR}` }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg" 
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: TEXT }}
                >
                  <i className="fa-solid fa-clipboard-list"></i>
                </div>
                <div>
                  <div className="text-base font-bold flex items-center gap-2" style={{ color: TEXT }}>
                    {sub.title}
                  </div>
                  <div className="text-xs mt-1 flex items-center gap-1.5" style={{ color: MUTED }}>
                    <i className="fa-regular fa-clock"></i> {sub.date}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full md:w-auto">
                <div className="flex items-center gap-4 flex-1 md:flex-none">
                  <div className="rounded-xl px-4 py-2 text-center min-w-[80px]" style={{ background: BG, border: `1px solid rgba(255,255,255,0.05)` }}>
                    <div className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: MUTED }}>MARKS</div>
                    <div className="text-sm font-bold" style={{ color: TEXT }}>
                      {sub.marks} <span className="text-[10px]" style={{ color: MUTED }}>/ {sub.totalMarks}</span>
                    </div>
                  </div>

                  <div className="rounded-xl px-4 py-2 text-center min-w-[80px]" style={{ background: "rgba(229,83,83,0.05)", border: `1px solid rgba(229,83,83,0.2)` }}>
                    <div className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: sub.percentage >= 50 ? GREEN : RED }}>PERCENTAGE</div>
                    <div className="text-sm font-bold" style={{ color: sub.percentage >= 50 ? GREEN : RED }}>
                      {sub.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <Link 
                  href="/test" 
                  className="rounded-xl px-5 py-2.5 text-xs font-bold whitespace-nowrap border flex items-center justify-center w-full md:w-auto transition-all" 
                  style={{ 
                    background: "transparent",
                    borderColor: "rgba(255,255,255,0.1)",
                    color: TEXT 
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Retake <i className="fa-solid fa-rotate-right ml-2 text-[10px]"></i>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
