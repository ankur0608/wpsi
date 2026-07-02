"use client";

import React, { useState, useEffect } from "react";

type TopicData = {
  name: string;
  attempted: number;
  correct: number;
  accuracy: number;
};

type SubjectData = {
  id: string;
  name: string;
  icon: string;
  attempted: number;
  correct: number;
  accuracy: number;
  label: string;
  topics: TopicData[];
};

type AnalyticsData = {
  performance: {
    questionsSolved: number;
    correctAnswers: number;
    averageAccuracy: number;
    estimatedStudyHours: number;
    questionsPerHour: number;
    mocksTaken: number;
    avgMockScore: number;
  };
  difficulty: {
    easy: { attempted: number; accuracy: number };
    medium: { attempted: number; accuracy: number };
    hard: { attempted: number; accuracy: number };
  };
  subjects: SubjectData[];
  weakTopics: TopicData[];
  strongTopics: TopicData[];
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch('/api/user/analytics');
        const json = await res.json();
        if (json.success) {
          setData(json.data);
          if (json.data.subjects.length > 0) {
            setSelectedSubjectId(json.data.subjects[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px] text-dark-500 font-bold">
        <span className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin mr-3"></span>
        Loading Analytics...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[500px] text-red-500 font-bold">
        Failed to load analytics data.
      </div>
    );
  }

  const { performance, difficulty, subjects, weakTopics, strongTopics } = data;
  const selectedSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 pb-10">
      <div className="max-w-[1440px] mx-auto p-4 lg:p-6 space-y-6">
        
        {/* Hero Analytics Overview */}
        <div className="bg-white border border-dark-200 rounded-[24px] p-5 lg:p-6 shadow-sm relative overflow-hidden text-dark-800">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-dark-900">Performance Summary</h3>
              <p className="text-xs text-dark-500">Real-time tracker of WPSI Exam 2026 preparation progress</p>
            </div>
            
            <div className="flex items-center gap-3 bg-dark-50 border border-dark-100 rounded-xl px-4 py-2 self-start lg:self-auto text-xs font-semibold z-10 relative">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Active Session Tracker
            </div>
          </div>

          {/* Grid of Overview stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            <div className="bg-dark-50 border border-dark-100 p-4 rounded-2xl hover:border-primary-200 transition-colors shadow-sm">
              <span className="text-2xl">📝</span>
              <h4 className="text-[10px] text-dark-400 font-bold uppercase tracking-wider mt-2">Questions Solved</h4>
              <p className="text-2xl font-black text-dark-900 mt-0.5">{performance.questionsSolved.toLocaleString()}</p>
              <p className="text-[9px] text-emerald-600 font-bold mt-1">✓ {performance.correctAnswers.toLocaleString()} Correct</p>
            </div>
            <div className="bg-dark-50 border border-dark-100 p-4 rounded-2xl hover:border-primary-200 transition-colors shadow-sm">
              <span className="text-2xl">🎯</span>
              <h4 className="text-[10px] text-dark-400 font-bold uppercase tracking-wider mt-2">Average Accuracy</h4>
              <p className="text-2xl font-black text-primary-600 mt-0.5">{performance.averageAccuracy}%</p>
              <div className="w-full bg-dark-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-primary-500 h-full" style={{ width: `${performance.averageAccuracy}%` }}></div>
              </div>
            </div>
            <div className="bg-dark-50 border border-dark-100 p-4 rounded-2xl hover:border-primary-200 transition-colors shadow-sm">
              <span className="text-2xl">⏱️</span>
              <h4 className="text-[10px] text-dark-400 font-bold uppercase tracking-wider mt-2">Study Hours</h4>
              <p className="text-2xl font-black text-dark-900 mt-0.5">{performance.estimatedStudyHours} Hrs</p>
              <p className="text-[9px] text-dark-500 font-semibold mt-1">est. {performance.questionsPerHour} questions/hr</p>
            </div>
            <div className="bg-dark-50 border border-dark-100 p-4 rounded-2xl hover:border-primary-200 transition-colors shadow-sm">
              <span className="text-2xl">🏆</span>
              <h4 className="text-[10px] text-dark-400 font-bold uppercase tracking-wider mt-2">Mocks Taken</h4>
              <p className="text-2xl font-black text-dark-900 mt-0.5">{performance.mocksTaken}</p>
              <p className="text-[9px] text-amber-600 font-bold mt-1">★ {performance.avgMockScore}% Avg Score</p>
            </div>
          </div>
        </div>

        {/* Weak vs Strong Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weak Topics */}
          <div className="bg-white border border-dark-200 rounded-[24px] p-5 lg:p-6 shadow-sm">
            <h4 className="font-display font-bold text-rose-600 flex items-center gap-2 mb-4">
              ⚠️ Area of Focus (Weak Topics)
            </h4>
            <div className="space-y-3">
              {weakTopics.length > 0 ? weakTopics.map((wt, i) => (
                <div key={i} className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-dark-900">{wt.name}</p>
                    <p className="text-[9px] text-dark-500">({wt.attempted} attempted)</p>
                  </div>
                  <span className="text-xs font-black text-rose-600 bg-white border border-rose-200 px-2 py-0.5 rounded shadow-sm">{wt.accuracy}% Accuracy</span>
                </div>
              )) : (
                <p className="text-sm text-dark-400">Not enough data to identify weak topics.</p>
              )}
            </div>
          </div>

          {/* Strong Topics */}
          <div className="bg-white border border-dark-200 rounded-[24px] p-5 lg:p-6 shadow-sm">
            <h4 className="font-display font-bold text-emerald-600 flex items-center gap-2 mb-4">
              ⭐ Strength Areas (Strong Topics)
            </h4>
            <div className="space-y-3">
              {strongTopics.length > 0 ? strongTopics.map((st, i) => (
                <div key={i} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-dark-900">{st.name}</p>
                    <p className="text-[9px] text-dark-500">({st.attempted} attempted)</p>
                  </div>
                  <span className="text-xs font-black text-emerald-600 bg-white border border-emerald-200 px-2 py-0.5 rounded shadow-sm">{st.accuracy}% Accuracy</span>
                </div>
              )) : (
                <p className="text-sm text-dark-400">Not enough data to identify strong topics.</p>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Subject Performance (Full Width) */}
        <div className="bg-white border border-dark-200 rounded-[24px] p-5 lg:p-6 shadow-sm">
          <div className="pb-3 border-b border-dark-100 mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-dark-900">📚 Subject Performance</h3>
              <p className="text-xs text-dark-500">Click a subject to view topic-level accuracy metrics</p>
            </div>
          </div>

          <div className="space-y-3">
            {subjects.length > 0 ? subjects.map((sub) => {
              const isSelected = selectedSubjectId === sub.id;
              
              let labelColorClass = "text-emerald-600 bg-emerald-50 border-emerald-100";
              if (sub.accuracy < 50) labelColorClass = "text-rose-600 bg-rose-50 border-rose-100";
              else if (sub.accuracy < 80) labelColorClass = "text-primary-600 bg-primary-50 border-primary-100";

              return (
                <div 
                  key={sub.id} 
                  onClick={() => setSelectedSubjectId(sub.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${isSelected ? 'border-primary-500 bg-primary-50/20' : 'border-dark-200 bg-white hover:border-primary-300'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sub.icon}</span>
                    <div>
                      <h4 className="font-bold text-dark-900 text-sm">{sub.name}</h4>
                      <p className="text-[10px] text-dark-500 font-medium">{sub.attempted} attempted • {sub.correct} correct</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className={`text-xs font-bold border px-2 py-0.5 rounded ${labelColorClass}`}>
                        {sub.label} ({sub.accuracy}%)
                      </p>
                    </div>
                    <span className="text-dark-400">→</span>
                  </div>
                </div>
              );
            }) : (
              <p className="text-sm text-dark-400">No subject data available.</p>
            )}
          </div>

          {/* Inline Topic Breakdown */}
          {selectedSubject && (
            <div className="mt-6 pt-5 border-t border-dark-100">
              <h4 className="font-display text-sm font-bold text-dark-900 mb-3 flex items-center gap-2">
                <span>{selectedSubject.name}</span> — Topic Breakdown
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedSubject.topics.map((t, idx) => {
                  let colorClass = "text-emerald-600";
                  let bgClass = "bg-emerald-50";
                  let borderClass = "border-emerald-100";
                  let barColor = "bg-emerald-500";
                  let label = "Strong";

                  if (t.accuracy < 50) {
                    colorClass = "text-rose-600";
                    bgClass = "bg-rose-50";
                    borderClass = "border-rose-100";
                    barColor = "bg-rose-500";
                    label = "Weak";
                  } else if (t.accuracy < 80) {
                    colorClass = "text-primary-600";
                    bgClass = "bg-primary-50";
                    borderClass = "border-primary-100";
                    barColor = "bg-primary-500";
                    label = "Average";
                  }

                  return (
                    <div key={idx} className="p-4 bg-dark-50 border border-dark-100 rounded-2xl hover:border-dark-200 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <p className="text-xs font-bold text-dark-900 leading-snug flex-1">{t.name}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${bgClass} ${colorClass} ${borderClass} shrink-0 ml-2`}>
                          {label}
                        </span>
                      </div>
                      <p className={`text-2xl font-black ${colorClass} mb-1`}>{t.accuracy}%</p>
                      <div className="w-full bg-dark-200 h-1.5 rounded-full overflow-hidden mb-2">
                        <div className={`${barColor} h-full rounded-full transition-all`} style={{ width: `${t.accuracy}%` }}></div>
                      </div>
                      <p className="text-[9px] text-dark-400 font-medium">{t.attempted} attempted • {t.correct} correct</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Difficulty & Practice Mode Analysis (2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Difficulty analysis */}
          <div className="bg-white border border-dark-200 rounded-[24px] p-5 lg:p-6 shadow-sm">
            <div className="pb-3 border-b border-dark-100 mb-4">
              <h4 className="font-display font-bold text-dark-900">📊 Difficulty Analysis</h4>
              <p className="text-[10px] text-dark-500">Accuracy sorted by question level</p>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-dark-700 mb-1">
                  <span>Easy ({difficulty.easy.attempted} attempted)</span>
                  <span className="text-emerald-600">{difficulty.easy.accuracy}% Acc</span>
                </div>
                <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${difficulty.easy.accuracy}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-dark-700 mb-1">
                  <span>Medium ({difficulty.medium.attempted} attempted)</span>
                  <span className="text-amber-600">{difficulty.medium.accuracy}% Acc</span>
                </div>
                <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: `${difficulty.medium.accuracy}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-dark-700 mb-1">
                  <span>Hard ({difficulty.hard.attempted} attempted)</span>
                  <span className="text-rose-600">{difficulty.hard.accuracy}% Acc</span>
                </div>
                <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full" style={{ width: `${difficulty.hard.accuracy}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Practice mode breakdown */}
          <div className="bg-white border border-dark-200 rounded-[24px] p-5 lg:p-6 shadow-sm">
            <div className="pb-3 border-b border-dark-100 mb-4">
              <h4 className="font-display font-bold text-dark-900">🎯 Practice Mode Analytics</h4>
              <p className="text-[10px] text-dark-500">Accuracy split by study modes</p>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-dark-700 mb-1">
                  <span>Topic Practice ({performance.questionsSolved} Qs)</span>
                  <span className="text-primary-600">{performance.averageAccuracy}% Acc</span>
                </div>
                <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full" style={{ width: `${performance.averageAccuracy}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-dark-700 mb-1">
                  <span>Mock Exams ({performance.mocksTaken} mocks)</span>
                  <span className="text-primary-600">{performance.avgMockScore}% Acc</span>
                </div>
                <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-300 h-full" style={{ width: `${performance.avgMockScore}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
