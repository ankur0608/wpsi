"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { subjectMeta, defaultMeta } from "@/lib/subjectMeta";

export default function Dashboard() {
  const { user, loading: userLoading } = useUser();
  const [stats, setStats] = useState<any>({
    mockTestsAttempted: 0,
    mcqsSolved: 0,
    averageAccuracy: 0,
    resumePractice: null,
    weakTopics: [],
    syllabusCoverage: { overall: 0, partA: 0, partB: 0 },
    weeklyActivity: ['0%', '0%', '0%', '0%', '0%', '0%', '0%'],
    dayLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    rank: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [timeLeft, setTimeLeft] = useState("04:22:15");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft("04:22:14"); // Demo countdown
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/user/dashboard-stats");
        if (res.ok) {
          const json = await res.json();
          setStats((prev: any) => ({ ...prev, ...json.data }));
        }
      } catch (e) {
        console.error("Failed to fetch dashboard stats", e);
      } finally {
        setLoadingStats(false);
      }
    }
    fetchStats();
  }, []);

  const currentLevel = user?.level ?? 7;
  const currentXp = user?.xp ?? 2400;

  if (userLoading || loadingStats) {
      return (
        <div className="flex h-[80vh] flex-col items-center justify-center bg-dark-50">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500/20 border-t-primary-500" />
          <p className="mt-4 text-sm font-bold text-primary-600 uppercase tracking-widest">Loading Dashboard...</p>
        </div>
      );
  }

  return (
    <div className="flex-1 p-4 lg:p-6 max-w-[1360px] mx-auto w-full space-y-4">
        {/* ── HERO BANNER ── */}
        <div className="relative overflow-hidden rounded-2xl border border-dark-100 shadow-sm bg-white">
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <div>
                        <p className="text-[10px] text-primary-600 font-bold uppercase tracking-widest leading-none mb-1">Today's Mission</p>
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-dark-800 leading-tight">Daily Quiz Challenge</h2>
                        <p className="text-xs font-medium text-dark-500 mt-0.5">🔥 {user?.streak || 0}-day streak · <span className="text-emerald-600 font-bold">+50 XP</span> on completion</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1.5 bg-dark-50 border border-dark-100 rounded-lg px-3 py-1.5">
                        <svg className="w-3.5 h-3.5 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span className="text-[10px] text-dark-500 font-semibold uppercase tracking-wide">Resets in</span>
                        <span className="countdown text-[11px] font-bold text-dark-800">{timeLeft}</span>
                    </div>
                    <Link href="/exam" className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
                        Start Practice
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </Link>
                </div>
            </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link href="/streaks" className="feature-card bg-white border border-dark-100 rounded-2xl p-4 shadow-sm hover:border-amber-300 flex items-center gap-3 group">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 shrink-0 group-hover:bg-amber-100 transition-colors">
                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/><path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/></svg>
                </div>
                <div className="min-w-0"><p className="font-display text-xl font-bold text-dark-800 leading-none">{user?.streak || 0}</p><p className="text-[10px] text-dark-500 font-bold uppercase tracking-widest mt-0.5">Day Streak</p></div>
                <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-lg border shrink-0 ${user?.streak && user.streak > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-dark-50 text-dark-500 border-dark-100'}`}>{user?.streak && user.streak > 0 ? 'Active' : 'Inactive'}</span>
            </Link>
            <Link href="/leaderboard" className="feature-card bg-white border border-dark-100 rounded-2xl p-4 shadow-sm hover:border-primary-200 flex items-center gap-3 group">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100 shrink-0 group-hover:bg-primary-100 transition-colors">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138z"/></svg>
                </div>
                <div className="min-w-0"><p className="font-display text-xl font-bold text-dark-800 leading-none">#{stats.rank || '-'}</p><p className="text-[10px] text-dark-500 font-bold uppercase tracking-widest mt-0.5">Rank</p></div>
                <span className="ml-auto text-[9px] text-emerald-600 font-bold shrink-0">Live</span>
            </Link>
            <Link href="/results" className="feature-card bg-white border border-dark-100 rounded-2xl p-4 shadow-sm hover:border-emerald-200 flex items-center gap-3 group">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                </div>
                <div className="min-w-0"><p className="font-display text-xl font-bold text-dark-800 leading-none">{stats.averageAccuracy}%</p><p className="text-[10px] text-dark-500 font-bold uppercase tracking-widest mt-0.5">Accuracy</p></div>
                <span className="ml-auto text-[9px] text-primary-600 font-bold shrink-0">Overall</span>
            </Link>
            <div className="feature-card bg-white border border-dark-100 rounded-2xl p-4 shadow-sm hover:border-indigo-200 flex items-center gap-3 group cursor-default">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 shrink-0 group-hover:bg-indigo-100 transition-colors">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="min-w-0"><p className="font-display text-xl font-bold text-dark-800 leading-none">{stats.mcqsSolved.toLocaleString()}</p><p className="text-[10px] text-dark-500 font-bold uppercase tracking-widest mt-0.5">MCQs Solved</p></div>
            </div>
        </div>

        {/* ── 3 COLUMN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* COL 1: ACTIONABLE PRACTICE */}
            <div className="flex flex-col gap-4">
                {/* Resume Practice */}
                <div className="bg-white border border-dark-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-dark-100">
                        <h3 className="font-display text-sm font-bold text-dark-800 flex items-center gap-2">
                            <span className="w-6 h-6 bg-primary-50 border border-primary-100 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-3.5 h-3.5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                            Resume Practice
                        </h3>
                        {stats.resumePractice ? (
                            <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">In Progress</span>
                        ) : (
                            <span className="text-[9px] text-dark-500 font-bold bg-dark-50 px-2 py-0.5 rounded border border-dark-100">Ready</span>
                        )}
                    </div>
                    {stats.resumePractice ? (
                        <div className="space-y-3">
                            <Link href="/subjects" className="block p-3 bg-dark-50 border border-dark-100 rounded-xl hover:border-primary-200 transition-colors group">
                                <p className="text-[9px] text-primary-600 font-bold uppercase tracking-widest mb-0.5 group-hover:text-primary-700">{stats.resumePractice.part || 'Part B'} · Subject</p>
                                <h4 className="font-bold text-dark-800 text-sm mb-2 group-hover:text-primary-600 transition-colors">{stats.resumePractice.subjectName}</h4>
                                <div className="flex justify-between text-[10px] font-bold text-dark-500 mb-1.5">
                                    <span>{stats.resumePractice.totalAttempts} attempts</span><span className="text-primary-600">{Math.round(stats.resumePractice.accuracy)}% Accuracy</span>
                                </div>
                                <div className="w-full h-1.5 bg-dark-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-500 rounded-full transition-all duration-1000" style={{ width: `${Math.round(stats.resumePractice.accuracy)}%` }}></div>
                                </div>
                            </Link>
                            <Link href="/subjects" className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-dark-800 hover:bg-primary-600 text-white font-bold rounded-xl text-xs transition-all shadow-sm">
                                Continue
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-sm text-dark-500 font-medium">You haven't started practicing yet.</p>
                            <Link href="/subjects" className="mt-3 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm">
                                Explore Subjects
                            </Link>
                        </div>
                    )}
                </div>

                {/* Syllabus Coverage */}
                <div className="bg-white border border-dark-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-dark-100">
                        <h3 className="font-display text-sm font-bold text-dark-800 flex items-center gap-2">
                            <span className="w-6 h-6 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </span>
                            Syllabus Coverage
                        </h3>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-lg">{stats.syllabusCoverage.overall}% Overall</span>
                    </div>
                    <div className="space-y-3.5">
                        <div>
                            <div className="flex justify-between text-[11px] font-bold mb-1.5"><span className="text-dark-700">Part A — General</span><span className="text-emerald-600">{stats.syllabusCoverage.partA}%</span></div>
                            <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${stats.syllabusCoverage.partA}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[11px] font-bold mb-1.5"><span className="text-dark-700">Part B — Technical</span><span className="text-primary-600">{stats.syllabusCoverage.partB}%</span></div>
                            <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-500 rounded-full transition-all duration-1000" style={{ width: `${stats.syllabusCoverage.partB}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COL 2: WEAK TOPICS */}
            <div className="bg-white border border-dark-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-dark-100">
                    <h3 className="font-display text-sm font-bold text-dark-800 flex items-center gap-2">
                        <span className="w-6 h-6 bg-rose-50 border border-rose-100 rounded-lg flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </span>
                        Targeted Practice
                    </h3>
                    <span className="text-[9px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-100">Needs Work</span>
                </div>
                <div className="space-y-2.5">
                    {stats.weakTopics.length > 0 ? stats.weakTopics.map((topic: any, idx: number) => {
                        const bgClasses = [
                            'bg-rose-50 border-rose-100 hover:border-rose-300 text-rose-600 group-hover:text-rose-700 group-hover:bg-rose-600',
                            'bg-amber-50 border-amber-100 hover:border-amber-300 text-amber-600 group-hover:text-amber-700 group-hover:bg-amber-600',
                            'bg-dark-50 border-dark-100 hover:border-dark-300 text-dark-600 group-hover:text-dark-700 group-hover:bg-dark-600'
                        ];
                        const classSet = bgClasses[idx % 3];
                        const [bg, border, hover, text, textHover, iconHover] = classSet.split(' ');
                        
                        return (
                            <Link href="/subjects" key={idx} className={`flex items-center gap-3 p-3 ${bg} ${border} rounded-xl ${hover} transition-colors group`}>
                                <div className="w-9 h-9 rounded-xl bg-white border border-dark-100 flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                    <span className="text-[9px] text-dark-400 font-bold leading-none mb-0.5">Acc</span>
                                    <span className={`${text} font-bold text-[11px] leading-none`}>{Math.round(topic.accuracy)}%</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-bold text-dark-800 truncate ${textHover} transition-colors`}>{topic.subjectName}</p>
                                    <p className={`text-[10px] ${text} font-semibold mt-0.5`}>{topic.errors} errors recently</p>
                                </div>
                                <div className={`w-6 h-6 rounded-full bg-white border border-dark-100 ${text} flex items-center justify-center shrink-0 ${iconHover} group-hover:text-white transition-colors`}>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7m0 7 7-7"/></svg>
                                </div>
                            </Link>
                        );
                    }) : (
                        <div className="text-center py-6">
                            <p className="text-sm text-dark-500 font-medium">Keep practicing! We'll track your weak areas here.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* COL 3: ACTIVITY / PERFORMANCE */}
            <div className="bg-white border border-dark-100 rounded-2xl p-5 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-dark-100">
                    <h3 className="font-display text-sm font-bold text-dark-800 flex items-center gap-2">
                        <span className="w-6 h-6 bg-violet-50 border border-violet-100 rounded-lg flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                        </span>
                        Weekly Activity
                    </h3>
                    <Link href="/results" className="text-[10px] text-primary-600 font-bold hover:underline">Full Analytics →</Link>
                </div>
                
                <div className="flex-1 flex flex-col justify-end min-h-[160px] relative">
                    <div className="absolute inset-0 flex items-end justify-between gap-1 sm:gap-2 pb-6 pt-8">
                        {stats.weeklyActivity.map((height: string, i: number) => (
                           <div key={i} className={`w-full rounded-t-sm transition-all duration-500 hover:opacity-80 ${i === 6 ? 'bg-primary-500' : 'bg-dark-200 hover:bg-dark-300'}`} style={{ height }}></div>
                        ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-[9px] font-bold text-dark-400 mt-auto border-t border-dark-100 pt-2 z-10">
                        {stats.dayLabels.map((label: string, i: number) => (
                           <span key={i} className={`flex-1 text-center ${i === 6 ? 'text-primary-600' : ''}`}>{label}</span>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}
