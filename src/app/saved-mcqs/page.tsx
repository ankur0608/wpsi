"use client";

import React, { useState } from "react";
import Link from "next/link";

type SubjectPart = "part-a" | "part-b";

interface SavedCategory {
  id: string;
  name: string;
  part: SubjectPart;
  count: number;
  icon: React.ReactNode;
  colorClass: {
    bg: string;
    text: string;
    border: string;
    svgText: string;
  };
}

const categories: SavedCategory[] = [
  {
    id: "reasoning-data",
    name: "Reasoning & Data",
    part: "part-a",
    count: 12,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    colorClass: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", svgText: "text-blue-600" }
  },
  {
    id: "constitution-of-india",
    name: "Constitution of India",
    part: "part-a",
    count: 8,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    colorClass: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100", svgText: "text-amber-600" }
  },
  {
    id: "communication-eng",
    name: "Communication Eng.",
    part: "part-b",
    count: 4,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    colorClass: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100", svgText: "text-rose-600" }
  },
  {
    id: "digital-electronics",
    name: "Digital Electronics",
    part: "part-b",
    count: 6,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    colorClass: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-100", svgText: "text-violet-600" }
  },
  {
    id: "gs-mental-ability",
    name: "GS & Mental Ability",
    part: "part-a",
    count: 5,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    colorClass: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100", svgText: "text-emerald-600" }
  }
];

export default function SavedMCQsPage() {
  const [filter, setFilter] = useState<"all" | SubjectPart>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((cat) => {
    const matchesFilter = filter === "all" || cat.part === filter;
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalSaved = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="flex-1 p-5 lg:p-8 max-w-5xl mx-auto w-full font-sans">
      {/* Hero Banner */}
      <div className="bg-white border border-dark-100 rounded-3xl p-7 mb-7 relative overflow-hidden shadow-sm">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-black text-dark-900">Saved For Review</h2>
            </div>
            <p className="text-dark-500 text-sm max-w-md leading-relaxed">
              Your personalized collection of challenging questions. Click any subject card to review its saved MCQs.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-primary-50 border border-primary-100 rounded-2xl px-5 py-4 text-center shadow-sm">
              <span className="block text-3xl font-display font-black text-primary-600">{totalSaved}</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary-500">Total Saved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar + Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              filter === "all" ? "bg-dark-800 text-white border-dark-800" : "bg-white border-dark-200 text-dark-700 hover:text-dark-900"
            }`}
          >
            Show All
          </button>
          <button
            onClick={() => setFilter("part-a")}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              filter === "part-a" ? "bg-dark-800 text-white border-dark-800" : "bg-white border-dark-200 text-dark-600 hover:text-dark-900"
            }`}
          >
            Part A
          </button>
          <button
            onClick={() => setFilter("part-b")}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              filter === "part-b" ? "bg-dark-800 text-white border-dark-800" : "bg-white border-dark-200 text-dark-600 hover:text-dark-900"
            }`}
          >
            Part B
          </button>
        </div>
        <div className="relative w-full sm:w-60">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
          </svg>
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs font-semibold rounded-xl border border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white shadow-sm placeholder-dark-400"
          />
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/saved-mcqs/${cat.id}`}
              className="bg-white border border-dark-100 rounded-2xl p-6 flex flex-col cursor-pointer group hover:border-primary-300 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`w-12 h-12 ${cat.colorClass.bg} rounded-2xl flex items-center justify-center border ${cat.colorClass.border} group-hover:scale-110 transition-transform`}>
                  <div className={cat.colorClass.svgText}>
                    {cat.icon}
                  </div>
                </div>
                <span className={`${cat.colorClass.bg} ${cat.colorClass.text} text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider border ${cat.colorClass.border}`}>
                  {cat.part === "part-a" ? "Part A" : "Part B"}
                </span>
              </div>
              <h4 className="font-bold text-dark-900 text-base mb-1 group-hover:text-primary-700 transition-colors">{cat.name}</h4>
              <p className="text-sm text-dark-400 font-medium mb-4">{cat.count} questions saved</p>
              <div className="mt-auto flex justify-end">
                <span className="text-xs font-bold text-primary-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Open 
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="sm:col-span-2 lg:col-span-3 py-14 text-center">
            <div className="w-14 h-14 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🔍</div>
            <p className="font-bold text-dark-700">No subjects found</p>
            <p className="text-sm text-dark-400 mt-1">Try a different search term or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
