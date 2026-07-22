"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { subjectMeta, defaultMeta } from '@/lib/subjectMeta';

interface BookmarkRow {
  id: string;
  mcqId: string;
  createdAt: string;
  mcq: {
    id: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    explanation: string | null;
    imageUrl?: string | null;
    difficulty: string;
    topic: {
      name: string;
      subject: {
        name: string;
        part: string;
      };
    };
    language?: string;
    translations?: any[];
  };
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Track which explanations are revealed
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [mcqLanguages, setMcqLanguages] = useState<Record<string, "English" | "Gujarati">>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // View States
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  
  // Filter States for the Subject Cards View
  const [activeFilter, setActiveFilter] = useState<'all' | 'part-a' | 'part-b'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBookmarks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/bookmarks');
      if (!res.ok) throw new Error('Failed to fetch bookmarks');
      const json = await res.json();
      setBookmarks(json.data || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const removeBookmark = async (mcqId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.mcqId !== mcqId));
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mcqId }),
      });
      if (!res.ok) throw new Error('Failed to remove bookmark');
    } catch (err) {
      console.error(err);
      fetchBookmarks();
    }
  };

  const toggleReveal = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Grouping logic for the Subject Cards View
  const subjectGroups = useMemo(() => {
    const groups: Record<string, BookmarkRow[]> = {};
    bookmarks.forEach(b => {
      const subjName = b.mcq.topic.subject.name;
      if (!groups[subjName]) groups[subjName] = [];
      groups[subjName].push(b);
    });
    return groups;
  }, [bookmarks]);

  const getPartForSubject = (subjName: string) => {
    const meta = subjectMeta[subjName];
    if (meta?.part) return meta.part.toLowerCase().replace(' ', '-');
    const firstMcq = subjectGroups[subjName]?.[0];
    if (firstMcq?.mcq.topic.subject.part.includes('A')) return 'part-a';
    if (firstMcq?.mcq.topic.subject.part.includes('B')) return 'part-b';
    return 'part-b';
  };

  const filteredSubjects = useMemo(() => {
    const subjects = Object.keys(subjectGroups);
    return subjects.filter(subj => {
      const part = getPartForSubject(subj);
      const matchesPart = activeFilter === 'all' || part === activeFilter;
      const matchesSearch = !searchQuery || subj.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPart && matchesSearch;
    });
  }, [subjectGroups, activeFilter, searchQuery]);

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-dark-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500/20 border-t-primary-500" />
        <p className="mt-4 text-sm font-bold text-primary-600 uppercase tracking-widest">Loading MCQs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-dark-50">
        <div className="text-4xl mb-2">⚠️</div>
        <p className="text-sm font-bold text-rose-500 uppercase tracking-widest">Failed to load</p>
        <button onClick={fetchBookmarks} className="mt-4 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg">
          Retry
        </button>
      </div>
    );
  }

  // ==== DETAILED VIEW (QUESTIONS LIST) ====
  if (activeSubject) {
    const activeBookmarks = subjectGroups[activeSubject] || [];
    const meta = subjectMeta[activeSubject] || defaultMeta;

    return (
      <div className="flex-1 overflow-y-auto bg-dark-50 relative p-5 lg:p-8">
        <div className="max-w-5xl mx-auto w-full">
          <button 
            onClick={() => setActiveSubject(null)}
            className="mb-6 flex items-center gap-2 text-sm font-bold text-dark-500 hover:text-dark-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Subjects
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="bg-white border border-dark-100 rounded-3xl p-7 flex items-center gap-5 shadow-sm relative overflow-hidden flex-1">
               <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${meta.gradient} shadow-lg shrink-0 z-10`}>
                  {meta.icon}
               </div>
               <div className="z-10">
                  <h2 className="font-display text-2xl font-black text-dark-900">{activeSubject}</h2>
                  <p className="text-dark-500 text-sm font-medium">{activeBookmarks.length} saved questions</p>
               </div>
            </div>
          </div>

          <div className="space-y-5">
            {activeBookmarks.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-dark-500 font-bold">No questions found.</p>
                </div>
            ) : activeBookmarks.map((b, idx) => {
              const isRevealed = revealed[b.id];
              const tGuj = b.mcq.translations?.find(t => t.language === 'Gujarati');
              
              const lang = mcqLanguages[b.id] || "English";
              const setLang = (l: "English" | "Gujarati") => setMcqLanguages(prev => ({ ...prev, [b.id]: l }));
              
              const useGuj = lang === 'Gujarati' && !!tGuj;
              
              const options = [
                { key: 'A', text: useGuj ? tGuj.optionA : b.mcq.optionA },
                { key: 'B', text: useGuj ? tGuj.optionB : b.mcq.optionB },
                { key: 'C', text: useGuj ? tGuj.optionC : b.mcq.optionC },
                { key: 'D', text: useGuj ? tGuj.optionD : b.mcq.optionD },
              ];

              return (
                <div key={b.id} className="bg-white rounded-2xl border border-dark-100 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100">
                        Question {idx + 1}
                      </span>
                      {tGuj && (
                        <div className="flex bg-dark-50 border border-dark-200 p-1 rounded-lg shadow-sm">
                          <button 
                            onClick={() => setLang('English')} 
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${lang === 'English' ? 'bg-white shadow-sm text-primary-700' : 'text-dark-500 hover:text-dark-700'}`}
                          >
                            EN
                          </button>
                          <button 
                            onClick={() => setLang('Gujarati')} 
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${lang === 'Gujarati' ? 'bg-white shadow-sm text-primary-700' : 'text-dark-500 hover:text-dark-700'}`}
                          >
                            GU
                          </button>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => removeBookmark(b.mcqId)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>

                  <div className="text-base sm:text-lg font-bold text-dark-900 mb-6 leading-relaxed">
                    <div>{useGuj ? tGuj.question : b.mcq.question}</div>
                    {b.mcq.imageUrl && (
                      <div className="mt-4 mb-2">
                        <img 
                          src={b.mcq.imageUrl} 
                          alt="Question Image" 
                          className="max-w-full rounded-lg max-h-32 object-contain border border-dark-100 cursor-pointer hover:opacity-90 shadow-sm transition-opacity" 
                          onClick={() => setSelectedImage(b.mcq.imageUrl || null)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {options.map((opt) => {
                      const isCorrect = opt.key === b.mcq.correctAnswer;
                      let bgClass = "bg-dark-50 border-dark-200 text-dark-700";
                      
                      if (isRevealed && isCorrect) {
                        bgClass = "bg-emerald-50 border-emerald-500 text-emerald-700 font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]";
                      }

                      return (
                        <div key={opt.key} className={`flex flex-col p-4 rounded-xl border transition-colors ${bgClass}`}>
                          <div className="flex items-center w-full">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mr-3 shrink-0 ${isRevealed && isCorrect ? 'bg-emerald-500 text-white' : 'bg-white border border-dark-200 text-dark-500'}`}>
                              {opt.key}
                            </div>
                            <span className="text-sm">{opt.text}</span>
                            {isRevealed && isCorrect && (
                              <svg className="w-5 h-5 text-emerald-500 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between border-t border-dark-100 pt-6">
                    <button 
                      onClick={() => toggleReveal(b.id)}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold bg-dark-50 hover:bg-dark-100 text-dark-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      {isRevealed ? 'Hide Answer' : 'Show Answer & Explanation'}
                    </button>
                  </div>

                  {isRevealed && (b.mcq.explanation || (useGuj && tGuj.explanation)) && (
                    <div className="mt-5 p-5 bg-primary-50 border border-primary-100 rounded-xl">
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary-600 mb-2">Explanation</div>
                      <div className="text-sm text-dark-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: (useGuj && tGuj.explanation) ? tGuj.explanation : (b.mcq.explanation || '') }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-[99999] bg-black/80 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center pointer-events-none">
              <button 
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md transition-colors pointer-events-auto"
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <img src={selectedImage} alt="Expanded Question Image" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl pointer-events-auto" onClick={(e) => e.stopPropagation()} />
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==== MAIN VIEW (SUBJECT CARDS) ====
  return (
    <div className="flex-1 p-5 lg:p-8 max-w-5xl mx-auto w-full">
      {/* Hero Banner */}
      <div className="bg-white border border-dark-100 rounded-3xl p-7 mb-7 relative overflow-hidden shadow-sm">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
              <div>
                  <div className="flex items-center gap-2 mb-2">
                      <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                      </div>
                      <h2 className="font-display text-2xl font-black text-dark-900">Saved For Review</h2>
                  </div>
                  <p className="text-dark-500 text-sm max-w-md leading-relaxed">Your personalized collection of challenging questions. Click any subject card to review its saved MCQs.</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                  <div className="bg-primary-50 border border-primary-100 rounded-2xl px-5 py-4 text-center shadow-sm">
                      <span className="block text-3xl font-display font-black text-primary-600">{bookmarks.length}</span>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-primary-500">Total Saved</span>
                  </div>
              </div>
          </div>
      </div>

      {/* Filter Bar + Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveFilter('all')} 
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${activeFilter === 'all' ? 'bg-primary-600 text-white border-primary-600 shadow-[0_2px_8px_rgba(0,127,255,0.25)]' : 'bg-white border-dark-200 text-dark-600 hover:text-dark-900'}`}
              >
                Show All
              </button>
              <button 
                onClick={() => setActiveFilter('part-a')} 
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${activeFilter === 'part-a' ? 'bg-primary-600 text-white border-primary-600 shadow-[0_2px_8px_rgba(0,127,255,0.25)]' : 'bg-white border-dark-200 text-dark-600 hover:text-dark-900'}`}
              >
                Part A
              </button>
              <button 
                onClick={() => setActiveFilter('part-b')} 
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${activeFilter === 'part-b' ? 'bg-primary-600 text-white border-primary-600 shadow-[0_2px_8px_rgba(0,127,255,0.25)]' : 'bg-white border-dark-200 text-dark-600 hover:text-dark-900'}`}
              >
                Part B
              </button>
          </div>
          <div className="relative w-full sm:w-60">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/></svg>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subjects..." 
                className="w-full pl-9 pr-4 py-2.5 text-xs font-semibold rounded-xl border border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white shadow-sm placeholder-dark-400"
              />
          </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
        {filteredSubjects.length === 0 ? (
           <div className="sm:col-span-2 lg:col-span-3 py-14 text-center">
               <div className="w-14 h-14 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🔍</div>
               <p className="font-bold text-dark-700">No subjects found</p>
               <p className="text-sm text-dark-400 mt-1">Try a different search term or filter</p>
           </div>
        ) : filteredSubjects.map((subj) => {
            const count = subjectGroups[subj].length;
            const meta = subjectMeta[subj] || defaultMeta;
            const partId = getPartForSubject(subj);
            const isPartA = partId === 'part-a';
            
            // Reconstruct the styling closely matching the HTML template but using gradient backgrounds from meta.
            return (
              <div 
                key={subj}
                onClick={() => setActiveSubject(subj)}
                className="bg-white border border-dark-100 rounded-2xl p-6 flex flex-col cursor-pointer group hover:-translate-y-1 hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.10)] transition-all duration-250"
              >
                  <div className="flex items-start justify-between mb-5">
                      <div className={`w-12 h-12 bg-gradient-to-br ${meta.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                          {meta.icon}
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider border ${
                        isPartA ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                      }`}>
                        {isPartA ? 'Part A' : 'Part B'}
                      </span>
                  </div>
                  <h4 className="font-bold text-dark-900 text-base mb-1 group-hover:text-primary-700 transition-colors">{subj}</h4>
                  <p className="text-sm text-dark-400 font-medium mb-4">{count} questions saved</p>
                  <div className="mt-auto flex justify-end">
                      <span className="text-xs font-bold text-primary-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Open 
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      </span>
                  </div>
              </div>
            );
        })}
      </div>
    </div>
  );
}
