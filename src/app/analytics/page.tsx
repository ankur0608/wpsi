"use client";

import React, { useState } from "react";

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

const subjects: SubjectData[] = [
  {
    id: "engineering_materials",
    name: "Engineering Materials",
    icon: "🌱",
    attempted: 320,
    correct: 260,
    accuracy: 81,
    label: "Strong",
    topics: [
      { name: "Engineering Materials Basics", attempted: 120, correct: 107, accuracy: 89 },
      { name: "Material Properties", attempted: 100, correct: 83, accuracy: 83 },
      { name: "Alloys & Phase Diagrams", attempted: 100, correct: 70, accuracy: 70 }
    ]
  },
  {
    id: "digital_electronics",
    name: "Digital Electronics",
    icon: "📚",
    attempted: 250,
    correct: 190,
    accuracy: 76,
    label: "Average",
    topics: [
      { name: "Logic Gates", attempted: 50, correct: 44, accuracy: 88 },
      { name: "Flip Flops", attempted: 40, correct: 33, accuracy: 82 },
      { name: "Counters", attempted: 35, correct: 15, accuracy: 43 }
    ]
  },
  {
    id: "network_theory",
    name: "Network Theory",
    icon: "✍️",
    attempted: 180,
    correct: 76,
    accuracy: 42,
    label: "Weak",
    topics: [
      { name: "Network Theorems", attempted: 80, correct: 30, accuracy: 38 },
      { name: "AC Circuits", attempted: 60, correct: 28, accuracy: 47 },
      { name: "Steady State Analysis", attempted: 40, correct: 18, accuracy: 45 }
    ]
  }
];

export default function AnalyticsPage() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("digital_electronics");

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[1];

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
              <p className="text-2xl font-black text-dark-900 mt-0.5">2,847</p>
              <p className="text-[9px] text-emerald-600 font-bold mt-1">✓ 2,221 Correct</p>
            </div>
            <div className="bg-dark-50 border border-dark-100 p-4 rounded-2xl hover:border-primary-200 transition-colors shadow-sm">
              <span className="text-2xl">🎯</span>
              <h4 className="text-[10px] text-dark-400 font-bold uppercase tracking-wider mt-2">Average Accuracy</h4>
              <p className="text-2xl font-black text-primary-600 mt-0.5">78%</p>
              <div className="w-full bg-dark-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-primary-500 h-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div className="bg-dark-50 border border-dark-100 p-4 rounded-2xl hover:border-primary-200 transition-colors shadow-sm">
              <span className="text-2xl">⏱️</span>
              <h4 className="text-[10px] text-dark-400 font-bold uppercase tracking-wider mt-2">Study Hours</h4>
              <p className="text-2xl font-black text-dark-900 mt-0.5">90 Hrs</p>
              <p className="text-[9px] text-dark-500 font-semibold mt-1">106 questions/hr</p>
            </div>
            <div className="bg-dark-50 border border-dark-100 p-4 rounded-2xl hover:border-primary-200 transition-colors shadow-sm">
              <span className="text-2xl">🏆</span>
              <h4 className="text-[10px] text-dark-400 font-bold uppercase tracking-wider mt-2">Mocks Taken</h4>
              <p className="text-2xl font-black text-dark-900 mt-0.5">36</p>
              <p className="text-[9px] text-amber-600 font-bold mt-1">★ 71% Avg Score</p>
            </div>
          </div>
        </div>

        {/* Split Layout: Recommendations & Time Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommendations Card */}
          <div className="bg-white border border-dark-200 rounded-[24px] p-5 lg:p-6 shadow-sm">
            <div className="pb-3 border-b border-dark-100 mb-4">
              <h3 className="font-display text-lg font-bold text-dark-900">💡 Focused Recommendations</h3>
              <p className="text-xs text-dark-500">AI-driven actionable goals based on your weakness areas</p>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-xs">
                <span className="bg-red-500 text-white font-bold px-1.5 py-0.5 rounded text-[8px] mt-0.5">HIGH</span>
                <div>
                  <p className="font-bold text-red-900">Practice Network Theorems</p>
                  <p className="text-red-700 mt-0.5">Your accuracy in this topic is currently sitting at 38%.</p>
                </div>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-xs">
                <span className="bg-red-500 text-white font-bold px-1.5 py-0.5 rounded text-[8px] mt-0.5">HIGH</span>
                <div>
                  <p className="font-bold text-red-900">Improve Network Theory</p>
                  <p className="text-red-700 mt-0.5">Identified as your weakest overall subject performance.</p>
                </div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs">
                <span className="bg-amber-600 text-white font-bold px-1.5 py-0.5 rounded text-[8px] mt-0.5">MED</span>
                <div>
                  <p className="font-bold text-amber-900">Practice Hard Difficulty Questions</p>
                  <p className="text-amber-700 mt-0.5">Boost hard question accuracy (currently at 48%).</p>
                </div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs">
                <span className="bg-amber-600 text-white font-bold px-1.5 py-0.5 rounded text-[8px] mt-0.5">MED</span>
                <div>
                  <p className="font-bold text-amber-900">Take Full length Mock Test</p>
                  <p className="text-amber-700 mt-0.5">Average mock test scores (64%) are slightly below safety target.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Management & Accuracy Correlation */}
          <div className="bg-white border border-dark-200 rounded-[24px] p-5 lg:p-6 shadow-sm flex flex-col justify-between">
            <div className="pb-3 border-b border-dark-100 mb-4">
              <h3 className="font-display text-lg font-bold text-dark-900">⏱️ Time Management</h3>
              <p className="text-xs text-dark-500">Speed vs correctness analysis</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-center">
              <div className="text-center p-4 bg-dark-50 border border-dark-100 rounded-xl">
                <p className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">Avg Time Per Question</p>
                <p className="text-3xl font-black text-dark-900 mt-1">34 <span className="text-xs font-semibold text-dark-500">sec</span></p>
                <p className="text-[10px] text-emerald-600 font-bold mt-2">⚡ Within standard exam limits</p>
              </div>
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-700">Fast Solver Accuracy</span>
                    <span>82%</span>
                  </div>
                  <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-amber-600">Slow Solver Accuracy</span>
                    <span>61%</span>
                  </div>
                  <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: '61%' }}></div>
                  </div>
                </div>
                <div className="text-[10px] text-dark-500 font-semibold leading-relaxed">
                  💡 Tip: You perform <b>21% better</b> when answering questions quickly! Avoid overthinking.
                </div>
              </div>
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
            {subjects.map((sub) => {
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
            })}
          </div>

          {/* Inline Topic Breakdown */}
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
        </div>

        {/* Weak vs Strong Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weak Topics */}
          <div className="bg-white border border-dark-200 rounded-[24px] p-5 lg:p-6 shadow-sm">
            <h4 className="font-display font-bold text-rose-600 flex items-center gap-2 mb-4">
              ⚠️ Area of Focus (Weak Topics)
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-dark-900">Network Theorems</p>
                  <p className="text-[9px] text-dark-500">Network Theory</p>
                </div>
                <span className="text-xs font-black text-rose-600 bg-white border border-rose-200 px-2 py-0.5 rounded shadow-sm">38% Accuracy</span>
              </div>
              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-dark-900">Counters</p>
                  <p className="text-[9px] text-dark-500">Digital Electronics</p>
                </div>
                <span className="text-xs font-black text-rose-600 bg-white border border-rose-200 px-2 py-0.5 rounded shadow-sm">43% Accuracy</span>
              </div>
              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-dark-900">Laplace Transform</p>
                  <p className="text-[9px] text-dark-500">Signals & Systems</p>
                </div>
                <span className="text-xs font-black text-rose-600 bg-white border border-rose-200 px-2 py-0.5 rounded shadow-sm">47% Accuracy</span>
              </div>
            </div>
          </div>

          {/* Strong Topics */}
          <div className="bg-white border border-dark-200 rounded-[24px] p-5 lg:p-6 shadow-sm">
            <h4 className="font-display font-bold text-emerald-600 flex items-center gap-2 mb-4">
              ⭐ Strength Areas (Strong Topics)
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-dark-900">Logic Gates</p>
                  <p className="text-[9px] text-dark-500">Digital Electronics</p>
                </div>
                <span className="text-xs font-black text-emerald-600 bg-white border border-emerald-200 px-2 py-0.5 rounded shadow-sm">92% Accuracy</span>
              </div>
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-dark-900">Engineering Materials Basics</p>
                  <p className="text-[9px] text-dark-500">Engineering Materials</p>
                </div>
                <span className="text-xs font-black text-emerald-600 bg-white border border-emerald-200 px-2 py-0.5 rounded shadow-sm">89% Accuracy</span>
              </div>
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-dark-900">Semiconductors</p>
                  <p className="text-[9px] text-dark-500">Electronic Devices</p>
                </div>
                <span className="text-xs font-black text-emerald-600 bg-white border border-emerald-200 px-2 py-0.5 rounded shadow-sm">87% Accuracy</span>
              </div>
            </div>
          </div>
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
                  <span>Easy (1200 attempted)</span>
                  <span className="text-emerald-600">92% Acc</span>
                </div>
                <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-dark-700 mb-1">
                  <span>Medium (900 attempted)</span>
                  <span className="text-amber-600">75% Acc</span>
                </div>
                <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-dark-700 mb-1">
                  <span>Hard (450 attempted)</span>
                  <span className="text-rose-600">48% Acc</span>
                </div>
                <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full" style={{ width: '48%' }}></div>
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
                  <span>Topic Practice (1800 Qs)</span>
                  <span className="text-primary-600">82% Acc</span>
                </div>
                <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-dark-700 mb-1">
                  <span>Timed Practice (700 Qs)</span>
                  <span className="text-primary-600">71% Acc</span>
                </div>
                <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-400 h-full" style={{ width: '71%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-dark-700 mb-1">
                  <span>Mock Exams (36 mocks)</span>
                  <span className="text-primary-600">64% Acc</span>
                </div>
                <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-300 h-full" style={{ width: '64%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
