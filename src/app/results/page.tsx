"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();
  const { user } = useUser();
  const displayName = user?.name?.trim() || "Profile";
  
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [stats, setStats] = useState<any>({
    totalTests: 0,
    avgMarks: 0,
    avgAccuracy: 0,
    highestScore: 0,
    totalQuestions: 0,
    recentSubmissions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch("/api/user/results");
        if (res.ok) {
          const json = await res.json();
          setStats(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch results", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, []);

  // Helpers to derive UI classes based on test type or score
  const getTestMeta = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('daily')) return { typeLabel: 'Daily Challenge', type: 'daily-challenge', icon: '🔥', iconClass: 'bg-amber-50 text-amber-600 border-amber-100' };
    if (t.includes('sectional') || t.includes('mini')) return { typeLabel: 'Sectional', type: 'sectional', icon: '⚡', iconClass: 'bg-indigo-50 text-indigo-600 border-indigo-100' };
    return { typeLabel: 'Full Mock', type: 'full-mock', icon: '🏆', iconClass: 'bg-primary-50 text-primary-600 border-primary-100' };
  };

  const getStatusMeta = (percentage: number) => {
    if (percentage >= 90) return { label: 'Excellent', cls: 'text-emerald-700 bg-emerald-100 border-emerald-200', borderL: 'border-l-emerald-500' };
    if (percentage >= 75) return { label: 'Pass', cls: 'text-success-700 bg-success-100 border-success-200', borderL: 'border-l-success-500' };
    if (percentage >= 60) return { label: 'Good', cls: 'text-primary-700 bg-primary-100 border-primary-200', borderL: 'border-l-primary-500' };
    if (percentage >= 40) return { label: 'Average', cls: 'text-amber-700 bg-amber-100 border-amber-200', borderL: 'border-l-amber-500' };
    return { label: 'Needs Work', cls: 'text-rose-700 bg-rose-100 border-rose-200', borderL: 'border-l-rose-500' };
  };

  const filteredResults = stats.recentSubmissions.filter((res: any) => {
      const meta = getTestMeta(res.title);
      return (filterType === "all" || meta.type === filterType) &&
             res.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
      return (
        <div className="flex h-[80vh] flex-col items-center justify-center bg-dark-50">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500/20 border-t-primary-500" />
          <p className="mt-4 text-sm font-bold text-primary-600 uppercase tracking-widest">Loading Results...</p>
        </div>
      );
  }

  return (
    <>
    <div className="bg-dark-50 min-h-[calc(100vh-80px)] w-full font-sans text-dark-800 pb-10">
      <div className="max-w-[1440px] mx-auto p-4 lg:p-6 space-y-6">
        
        {/* Performance Summary Header */}
        <div className="bg-white border border-dark-100 rounded-[24px] p-6 lg:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-7">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-lg shadow-primary-500/25 uppercase">
              {displayName.slice(0, 2)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl font-black text-dark-900 tracking-tight leading-none">{displayName}</h2>
                <span className="bg-primary-50 border border-primary-200 text-primary-700 text-[10px] font-bold px-2.5 py-1 rounded-full">Pro Student</span>
                {user?.streak && user.streak > 0 && (
                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full">🔥 {user.streak} Day Streak</span>
                )}
              </div>
              <p className="text-xs text-dark-400 font-medium mt-1.5">WPSI Exam 2026 · Aspirant Performance Dashboard</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="group bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200/70 px-5 py-4 rounded-2xl text-left hover:shadow-md hover:border-primary-300 transition-all cursor-default">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-primary-500/15 flex items-center justify-center text-sm">📝</div>
                <p className="text-[10px] text-primary-600 font-bold uppercase tracking-wider">Tests Taken</p>
              </div>
              <p className="text-3xl font-black text-primary-700 leading-none">{stats.totalTests}</p>
              <p className="text-[10px] text-primary-500 mt-1 font-semibold">All time</p>
            </div>
            <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/70 px-5 py-4 rounded-2xl text-left hover:shadow-md hover:border-emerald-300 transition-all cursor-default">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-sm">📈</div>
                <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Avg Score</p>
              </div>
              <p className="text-3xl font-black text-emerald-700 leading-none">{Math.round(stats.avgAccuracy || 0)}%</p>
              <p className="text-[10px] text-emerald-600 mt-1 font-semibold">Overall</p>
            </div>
            <div className="group bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/70 px-5 py-4 rounded-2xl text-left hover:shadow-md hover:border-amber-300 transition-all cursor-default">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center text-sm">❓</div>
                <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Total Questions</p>
              </div>
              <p className="text-3xl font-black text-amber-700 leading-none">{stats.totalQuestions}</p>
              <p className="text-[10px] text-amber-600 mt-1 font-semibold">Attempted</p>
            </div>
            <div className="group bg-gradient-to-br from-violet-50 to-violet-100/50 border border-violet-200/70 px-5 py-4 rounded-2xl text-left hover:shadow-md hover:border-violet-300 transition-all cursor-default">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-violet-500/15 flex items-center justify-center text-sm">🎯</div>
                <p className="text-[10px] text-violet-700 font-bold uppercase tracking-wider">Highest Score</p>
              </div>
              <p className="text-3xl font-black text-violet-700 leading-none">{Math.round(stats.highestScore || 0)}%</p>
              <p className="text-[10px] text-violet-600 mt-1 font-semibold">Personal Best</p>
            </div>
          </div>
        </div>

        {/* All Exam & Test Results */}
        <div>
          <div className="bg-white border border-dark-100 rounded-[24px] p-6 lg:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-dark-100">
              <div>
                <h3 className="font-display text-lg font-bold text-dark-900 flex items-center gap-2">📊 Exam & Test Results</h3>
                <p className="text-xs text-dark-500">Comprehensive history of attempted mock exams, sectionals, and daily challenges.</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search exams..." 
                  className="px-3.5 py-2 text-xs font-bold rounded-xl border border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm w-full sm:w-44"
                />
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl border border-dark-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-dark-700"
                >
                  <option value="all">All Types</option>
                  <option value="full-mock">Full Length Mock</option>
                  <option value="sectional">Sectional Mock</option>
                  <option value="daily-challenge">Daily Challenge</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredResults.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-dark-50 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">📭</div>
                  <p className="text-dark-500 font-bold">No results found.</p>
                </div>
              ) : filteredResults.map((res: any, idx: number) => {
                const testMeta = getTestMeta(res.title);
                const statusMeta = getStatusMeta(res.percentage);

                return (
                  <div 
                    key={idx} 
                    onClick={() => router.push(`/results/${res.id}`)}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-dark-200 hover:border-primary-300 hover:shadow-md transition-all group cursor-pointer border-l-4 ${statusMeta.borderL} relative`}
                  >
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${testMeta.iconClass}`}>
                        {testMeta.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-dark-900 text-sm group-hover:text-primary-600 transition-colors mb-0.5">{res.title}</h4>
                        <p className="text-[10px] text-dark-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                          <span className={`px-1.5 py-0.5 rounded text-[8px] ${testMeta.iconClass}`}>{testMeta.typeLabel}</span>
                          <span>• {res.date}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 justify-between sm:justify-end">
                      <div className="text-left sm:text-right">
                        <p className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">Metrics</p>
                        <p className="text-xs text-dark-700 font-semibold mt-0.5">Time not tracked • {Math.round(res.percentage)}% Acc</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right flex flex-col items-end">
                          <span className="font-display font-black text-dark-900 text-xl tracking-tight leading-none mb-1">
                            {res.marks}<span className="text-xs text-dark-400 font-sans font-bold">/{res.totalMarks}</span>
                          </span>
                          <span className={`text-[8px] border px-2 py-0.5 rounded font-black uppercase tracking-wider ${statusMeta.cls}`}>
                            {statusMeta.label}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-primary-600 flex items-center gap-1 shrink-0 ml-2 sm:ml-4">
                          Review <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
      </div>
    </div>

        </>
  );
}
