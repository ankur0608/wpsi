"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

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
    difficulty: string;
    topic: {
      name: string;
      subject: {
        name: string;
        part: string;
      };
    };
  };
}

export default function BookmarksPage() {
  const { user } = useUser();
  const [bookmarks, setBookmarks] = useState<BookmarkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Track which explanations are revealed
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');

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
    // Optimistic UI update
    setBookmarks((prev) => prev.filter((b) => b.mcqId !== mcqId));
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST', // The endpoint uses POST to toggle
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mcqId }),
      });
      if (!res.ok) {
        throw new Error('Failed to remove bookmark');
      }
    } catch (err) {
      console.error(err);
      // Revert if failed by re-fetching
      fetchBookmarks();
    }
  };

  const toggleReveal = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter Logic
  const subjects = useMemo(() => {
    const set = new Set(bookmarks.map(b => b.mcq.topic.subject.name));
    return ['All', ...Array.from(set).sort()];
  }, [bookmarks]);

  const topics = useMemo(() => {
    let filtered = bookmarks;
    if (selectedSubject !== 'All') {
      filtered = filtered.filter(b => b.mcq.topic.subject.name === selectedSubject);
    }
    const set = new Set(filtered.map(b => b.mcq.topic.name));
    return ['All', ...Array.from(set).sort()];
  }, [bookmarks, selectedSubject]);

  useEffect(() => {
    setSelectedTopic('All');
  }, [selectedSubject]);

  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter(b => {
      if (selectedSubject !== 'All' && b.mcq.topic.subject.name !== selectedSubject) return false;
      if (selectedTopic !== 'All' && b.mcq.topic.name !== selectedTopic) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        if (!b.mcq.question.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [bookmarks, selectedSubject, selectedTopic, searchQuery]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-500/20 border-t-brand-500" />
        <p className="text-sm text-slate-400">Loading your bookmarks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
        <div className="text-4xl">⚠️</div>
        <p className="text-sm font-bold text-danger">Failed to load</p>
        <p className="text-xs text-slate-500">{error}</p>
        <button
          onClick={fetchBookmarks}
          className="mt-2 rounded-xl bg-brand-500 px-5 py-2 text-sm font-bold text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <section className="glass-card rounded-[1.75rem] border border-white/5 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-brand-300">
              Your Saved Collection
            </div>
            <h2 className="text-2xl font-heading font-black text-white md:text-3xl">
              Bookmarks
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Review questions you've saved during your practice sessions.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-dark-bg/60 px-4 py-3 text-center min-w-[120px]">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Total</div>
            <div className="mt-1 text-xl font-bold text-white">{bookmarks.length}</div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      {bookmarks.length > 0 && (
        <section className="glass-card flex flex-col gap-4 rounded-[1.5rem] border border-white/5 p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-brand-500/50 focus:bg-white/10"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:w-auto">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="min-w-[150px] cursor-pointer rounded-xl border border-white/10 bg-dark-bg/80 py-3 px-4 text-sm text-white outline-none transition-all focus:border-brand-500/50 focus:bg-white/10"
            >
              {subjects.map(s => (
                <option key={s} value={s} className="bg-[#0f172a] text-slate-200">
                  {s === 'All' ? 'All Subjects' : s}
                </option>
              ))}
            </select>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="min-w-[150px] cursor-pointer rounded-xl border border-white/10 bg-dark-bg/80 py-3 px-4 text-sm text-white outline-none transition-all focus:border-brand-500/50 focus:bg-white/10"
              disabled={selectedSubject === 'All' && topics.length <= 1}
            >
              {topics.map(t => (
                <option key={t} value={t} className="bg-[#0f172a] text-slate-200">
                  {t === 'All' ? 'All Topics' : t}
                </option>
              ))}
            </select>
          </div>
        </section>
      )}

      {/* Bookmarks List */}
      {bookmarks.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center rounded-[1.75rem] border border-white/5 p-12 text-center">
          <i className="fa-regular fa-bookmark mb-4 text-5xl text-slate-600" />
          <h3 className="text-lg font-bold text-white">No bookmarks yet</h3>
          <p className="mt-2 text-sm text-slate-400 max-w-md">
            You haven't saved any questions. Start a practice session and click the bookmark icon on any question to save it here for later review.
          </p>
          <Link
            href="/practice"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            Start Practicing
          </Link>
        </div>
      ) : filteredBookmarks.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center rounded-[1.75rem] border border-white/5 p-12 text-center">
          <i className="fa-solid fa-filter-circle-xmark mb-4 text-5xl text-slate-600" />
          <h3 className="text-lg font-bold text-white">No matches found</h3>
          <p className="mt-2 text-sm text-slate-400 max-w-md">
            No bookmarks match your current filters and search query.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedSubject('All'); setSelectedTopic('All'); }}
            className="mt-6 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-slate-300 transition-transform hover:scale-105"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookmarks.map((b) => {
            const isRevealed = revealed[b.id];
            const options = [
              { key: 'A', text: b.mcq.optionA },
              { key: 'B', text: b.mcq.optionB },
              { key: 'C', text: b.mcq.optionC },
              { key: 'D', text: b.mcq.optionD },
            ];

            return (
              <div
                key={b.id}
                className="glass-card rounded-[1.5rem] border border-white/5 p-5 transition-colors hover:border-white/10 md:p-6"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                      {b.mcq.topic.subject.name}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                      {b.mcq.topic.name}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wider ${
                        b.mcq.difficulty === 'Easy'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : b.mcq.difficulty === 'Hard'
                          ? 'bg-danger/10 text-red-400'
                          : 'bg-warning/10 text-amber-400'
                      }`}
                    >
                      {b.mcq.difficulty}
                    </span>
                  </div>
                  <button
                    onClick={() => removeBookmark(b.mcqId)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-danger/10 text-danger transition-colors hover:bg-danger hover:text-white"
                    title="Remove Bookmark"
                  >
                    <i className="fa-solid fa-trash-can text-sm" />
                  </button>
                </div>

                <div className="mb-5 text-base font-medium leading-relaxed text-slate-200">
                  {b.mcq.question}
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {options.map((opt) => {
                    const isCorrect = opt.key === b.mcq.correctAnswer;
                    let bgStyle = 'bg-dark-bg/60 border-white/5';
                    let textStyle = 'text-slate-300';
                    let icon = null;

                    if (isRevealed && isCorrect) {
                      bgStyle = 'bg-emerald-500/10 border-emerald-500/30';
                      textStyle = 'text-emerald-400 font-bold';
                      icon = <i className="fa-solid fa-check text-emerald-400" />;
                    }

                    return (
                      <div
                        key={opt.key}
                        className={`flex items-center gap-3 rounded-xl border p-4 ${bgStyle}`}
                      >
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-xs font-black ${
                            isRevealed && isCorrect
                              ? 'bg-emerald-500 text-white border-emerald-500'
                              : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          {opt.key}
                        </div>
                        <div className={`flex-1 text-sm ${textStyle}`}>{opt.text}</div>
                        {icon && <div>{icon}</div>}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-5">
                  <button
                    onClick={() => toggleReveal(b.id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-bold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <i className={`fa-solid ${isRevealed ? 'fa-eye-slash' : 'fa-eye'}`} />
                    {isRevealed ? 'Hide Answer' : 'Show Answer & Explanation'}
                  </button>
                </div>

                {isRevealed && b.mcq.explanation && (
                  <div className="mt-4 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
                    <div className="mb-1 text-[11px] font-black uppercase tracking-wider text-brand-400">
                      Explanation
                    </div>
                    <div className="text-sm leading-relaxed text-slate-300">
                      {b.mcq.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
