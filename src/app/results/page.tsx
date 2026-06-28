"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export default function ResultsPage() {
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
                    onClick={() => setSelectedSubmission(res)}
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
                        <span className="text-xs font-bold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity items-center gap-1 shrink-0 ml-2 hidden sm:flex">
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

    {/* Detailed Attempt Review Modal */}
    {selectedSubmission && (
      <div 
        className="fixed inset-0 bg-dark-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center transition-all duration-300" 
        onClick={() => setSelectedSubmission(null)}
      >
        <div 
          className="bg-white rounded-[24px] border border-dark-200 max-w-2xl w-full mx-4 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200" 
          onClick={e => e.stopPropagation()}
        >
          {(() => {
            const meta = getTestMeta(selectedSubmission.title);
            const status = getStatusMeta(selectedSubmission.percentage);
            
            // The API returns earnedMarks (marks) and totalMarks. 
            // In our system, 1 correct = 1 mark. Wrong/Blank = -0.25 marks.
            // earnedMarks = correct - 0.25 * (totalMarks - correct)
            // earnedMarks = 1.25 * correct - 0.25 * totalMarks
            // correct = (earnedMarks + 0.25 * totalMarks) / 1.25
            let derivedCorrect = Math.round((selectedSubmission.marks + 0.25 * selectedSubmission.totalMarks) / 1.25);
            
            // Fallback in case of weird data
            if (derivedCorrect < 0) derivedCorrect = 0;
            if (derivedCorrect > selectedSubmission.totalMarks) derivedCorrect = selectedSubmission.totalMarks;

            const correct = derivedCorrect;
            const total = selectedSubmission.totalMarks;
            const incorrect = total - correct;
            const unattempted = 0; // Combined with incorrect since both penalize equally and we don't save the split
            
            const timeTaken = "Time not tracked";
            const pace = "Pace not tracked";
            
            return (
              <>
                {/* Header */}
                <div className="p-6 border-b border-dark-100 flex items-start justify-between bg-dark-50/50">
                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${meta.iconClass}`}>
                                {meta.typeLabel}
                            </span>
                            <span className="text-[10px] text-dark-500 font-semibold">• Attempted <span id="modal-date">{selectedSubmission.date}</span></span>
                        </div>
                        <h3 className="font-display font-black text-lg text-dark-900 leading-tight">{selectedSubmission.title}</h3>
                    </div>
                    <button 
                      className="text-dark-400 hover:text-dark-700 bg-white border border-dark-200 hover:bg-dark-50 p-2 rounded-xl transition-colors shadow-sm cursor-pointer" 
                      onClick={() => setSelectedSubmission(null)}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1 hide-scrollbar">
                    {/* Summary Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-dark-50 border border-dark-200/80 p-4 rounded-2xl text-center">
                            <p className="text-[10px] text-dark-500 font-bold uppercase tracking-wider">Attempt Score</p>
                            <p className="text-2xl font-black text-dark-900 mt-1">{selectedSubmission.marks}<span className="text-xs text-dark-400 font-sans font-bold">/{total}</span></p>
                            <span className={`text-[8px] border px-2 py-0.5 rounded font-black uppercase tracking-wider mt-1.5 inline-block ${status.cls}`}>
                              {status.label}
                            </span>
                        </div>
                        <div className="bg-dark-50 border border-dark-200/80 p-4 rounded-2xl text-center flex flex-col items-center justify-center">
                            <p className="text-[10px] text-dark-500 font-bold uppercase tracking-wider">Accuracy Rate</p>
                            <p className="text-lg font-black text-primary-600 mt-1">{Math.round(selectedSubmission.percentage)}%</p>
                            <p className="text-[9px] text-dark-400 font-semibold mt-1">Target is {'>'}75%</p>
                        </div>
                        <div className="bg-dark-50 border border-dark-200/80 p-4 rounded-2xl text-center flex flex-col items-center justify-center">
                            <p className="text-[10px] text-dark-500 font-bold uppercase tracking-wider">Duration Pace</p>
                            <p className="text-sm font-black text-dark-800 mt-1">{timeTaken}</p>
                            <p className="text-[9px] text-dark-500 font-semibold mt-0.5">{pace}</p>
                        </div>
                    </div>

                    {/* Answer Breakdown Row */}
                    <div className="flex items-center justify-around border border-dark-200 rounded-2xl p-4 bg-white shadow-sm">
                        <div className="text-center">
                            <span className="text-xs font-bold text-dark-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Correct</span>
                            <p className="text-lg font-black text-dark-800 mt-1">{correct}</p>
                        </div>
                        <div className="w-px bg-dark-200 h-8"></div>
                        <div className="text-center">
                            <span className="text-xs font-bold text-dark-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Incorrect</span>
                            <p className="text-lg font-black text-dark-800 mt-1">{incorrect}</p>
                        </div>
                        <div className="w-px bg-dark-200 h-8"></div>
                        <div className="text-center">
                            <span className="text-xs font-bold text-dark-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-dark-300 inline-block"></span> Unattempted</span>
                            <p className="text-lg font-black text-dark-800 mt-1">{unattempted}</p>
                        </div>
                    </div>

                    {/* Topic Analysis (Mocked) */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-dark-900 uppercase tracking-widest flex items-center gap-2">
                            <span>🎯</span> Topic Strength Analysis
                        </h4>
                        <div className="space-y-4 bg-dark-50/50 border border-dark-200 p-5 rounded-2xl">
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-dark-800">{selectedSubmission.title}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-dark-500 font-semibold">{correct}/{total} Qs</span>
                                        <span className="font-extrabold text-dark-900">{Math.round(selectedSubmission.percentage)}%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden border border-dark-200/50">
                                    <div 
                                      className={`${status.cls.includes('emerald') ? 'bg-emerald-500' : status.cls.includes('success') ? 'bg-emerald-500' : status.cls.includes('amber') ? 'bg-amber-500' : status.cls.includes('rose') ? 'bg-rose-500' : 'bg-primary-500'} h-full rounded-full`} 
                                      style={{width: `${selectedSubmission.percentage}%`}}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Footer Actions */}
                <div className="p-6 border-t border-dark-100 flex items-center gap-3 bg-dark-50/50">
                    <button 
                      className="flex-1 bg-dark-900 hover:bg-dark-800 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all cursor-pointer text-center" 
                      onClick={() => setSelectedSubmission(null)}
                    >
                        Close Analysis
                    </button>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    )}

    </>
  );
}
