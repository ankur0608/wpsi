"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function TopicsContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subjectId');
  const examName = searchParams.get('examName') || 'WPSIPro Syllabus';
  const subjectName = searchParams.get('subjectName') || 'Loading...';

  const router = useRouter();
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [selectedTopicName, setSelectedTopicName] = useState('');
  const [selectedMode, setSelectedMode] = useState<'quick' | 'full' | 'mock'>('quick');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  useEffect(() => {
    if (!subjectId) {
      setLoading(false);
      return;
    }

    fetch('/api/syllabus')
      .then(res => res.json())
      .then(json => {
        if (json.data) {
          // Find the subject
          let foundSubject: any = null;
          for (const exam of json.data) {
            const subj = exam.subjects?.find((s: any) => s.id === subjectId);
            if (subj) {
              foundSubject = subj;
              break;
            }
          }
          if (foundSubject && foundSubject.topics) {
            setTopics(foundSubject.topics);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch topics', err);
        setLoading(false);
      });
  }, [subjectId]);

  return (
    <main id="nav-main-wrapper" className="flex-1 flex flex-col h-screen overflow-hidden bg-dark-bg">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8" style={{"background":"radial-gradient(ellipse 60% 40% at 30% 0%,rgba(99,102,241,0.08) 0%,transparent 55%)"}}>
        <div className="max-w-5xl mx-auto pb-24 space-y-6">

          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>

          {/*  Dynamic Subject Header  */}
          <div id="subject-header" className="rounded-[2rem] p-8 relative overflow-hidden" style={{"background":"linear-gradient(135deg,rgba(99,102,241,0.15),rgba(20,29,46,0.98))","border":"1px solid rgba(99,102,241,0.35)"}}>
            <div className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-10 bg-brand-500" style={{"transform":"translate(30%,-30%)"}}></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5">
                <div id="subj-icon" className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0" style={{"background":"rgba(99,102,241,0.15)","border":"1px solid rgba(99,102,241,0.3)","color":"#818cf8"}}>
                  <i className="fa-solid fa-book-open-reader"></i>
                </div>
                <div>
                  <div className="text-[10px] font-black text-brand-400 uppercase tracking-[0.2em] mb-1">{examName}</div>
                  <h2 id="subj-name" className="text-3xl font-heading font-black text-white leading-tight">{subjectName}</h2>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href={`/practice?subject=${encodeURIComponent(subjectName)}`} className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95" style={{"background":"linear-gradient(135deg,#6366f1,#8b5cf6)","boxShadow":"0 10px 20px rgba(99,102,241,0.25)"}}>
                  <i className="fa-solid fa-bolt mr-2"></i>Full Practice
                </Link>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8 relative z-10 border-t border-white/5 pt-6">
              <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-400 bg-white/5 px-4 py-2 rounded-xl">
                <i className="fa-solid fa-layer-group text-brand-400"></i>
                <span id="subj-chapters">{loading ? '-' : topics.length} Chapters</span>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-400 bg-white/5 px-4 py-2 rounded-xl">
                <i className="fa-solid fa-list-check text-accent"></i>
                <span id="subj-mcqs">{topics.length * 50}+ Practice MCQs</span>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] font-bold text-warning bg-warning/5 px-4 py-2 rounded-xl border border-warning/10">
                <i className="fa-solid fa-crown"></i>
                <span>Part A+B Combo Available</span>
              </div>
            </div>
          </div>

          {/* Strategic Upsell Banners */}
          <div id="pricing-combos" className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl p-5 flex items-center justify-between gap-4 bg-dark-card/60 border border-white/5 group hover:border-brand-500/30 transition-all">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent"><i className="fa-solid fa-gift"></i></div>
                <div className="flex-1">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Try before buy</div>
                    <div className="text-sm font-bold text-white">First 5 MCQs <span className="text-accent ml-1 font-black">FREE</span></div>
                </div>
                <button onClick={() => { setSelectedTopicName(topics[0]?.name || ''); setSelectedMode('quick'); setSelectedDifficulty('Medium'); setIsTopicModalOpen(true); }} className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline">Start Now</button>
            </div>
            <div className="rounded-2xl p-5 flex items-center justify-between gap-4 bg-dark-card/60 border border-white/10 relative overflow-hidden group hover:border-brand-500/40 transition-all">
                <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400"><i className="fa-solid fa-box-archive"></i></div>
                <div className="flex-1 relative z-10">
                    <div className="text-[9px] font-black text-brand-400 uppercase tracking-widest mb-0.5">Full Pack</div>
                    <div className="text-sm font-bold text-white">₹99 <span className="text-[10px] text-slate-600 line-through ml-1">₹249</span></div>
                </div>
                <Link href="/pricing" className="px-4 py-2 rounded-lg bg-brand-500 text-white font-black text-[10px] uppercase tracking-widest relative z-10">Unlock</Link>
            </div>
            <div className="rounded-2xl p-5 flex items-center justify-between gap-4 bg-dark-card/60 border border-warning/20 group hover:border-warning/40 transition-all">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center text-warning"><i className="fa-solid fa-bolt-lightning"></i></div>
                <div className="flex-1">
                    <div className="text-[9px] font-black text-warning uppercase tracking-widest mb-0.5">WPSIPro Complete Pack</div>
                    <div className="text-sm font-bold text-white">₹249 <span className="text-[10px] text-slate-600 line-through ml-1">₹594</span></div>
                </div>
                <Link href="/pricing" className="px-4 py-2 rounded-lg bg-warning text-dark-bg font-black text-[10px] uppercase tracking-widest">Upgrade</Link>
            </div>
          </div>

          {/*  Topics List  */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-brand-500 rounded-full"></div>
                    <h3 className="font-heading font-black text-white text-lg tracking-tight">Curriculum Breakdown</h3>
                </div>
            </div>
            
            <div id="topics-list" className="space-y-3">
              {loading ? (
                <div className="text-center text-slate-500 py-10"><i className="fa-solid fa-circle-notch fa-spin text-2xl mb-3"></i><p>Loading topics...</p></div>
              ) : topics.length === 0 ? (
                <div className="text-center text-slate-500 py-10">No topics found for this subject.</div>
              ) : (
                topics.map((topic, idx) => {
                  const isFree = idx === 0;
                  return (
                    <div
                      key={topic.id}
                      className={`rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 group ${isFree ? 'bg-accent/5 border border-accent/25' : 'bg-dark-card/40 border border-white/5 hover:border-white/10'}`}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm shrink-0 shadow-xl ${isFree ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-white/5 text-slate-500 border border-white/5'}`}>
                          <i className={`fa-solid ${isFree ? 'fa-unlock' : 'fa-lock'}`}></i>
                        </div>
                        <div className="min-w-0">
                          <div className={`font-bold text-sm truncate ${isFree ? 'text-white' : 'text-slate-300 group-hover:text-white'} transition-colors`}>
                            {idx + 1}. {topic.name}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1 font-medium uppercase tracking-tight flex items-center gap-2">
                              <span>{Math.floor(Math.random() * 20) + 40} Questions</span>
                              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                              <span className={isFree ? 'text-accent' : 'text-slate-600'}>{isFree ? 'Free Trial' : 'Requires Pack'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                        {isFree ? (
                          <button
                            type="button"
                            onClick={() => { setSelectedTopicName(topic.name); setSelectedMode('quick'); setSelectedDifficulty('Medium'); setIsTopicModalOpen(true); }}
                            className="flex-1 sm:flex-none py-2.5 px-6 rounded-xl bg-accent text-dark-bg font-black text-[10px] uppercase tracking-widest shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95"
                          >
                            Start Chapter
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => { setSelectedTopicName(topic.name); setSelectedMode('quick'); setSelectedDifficulty('Medium'); setIsTopicModalOpen(true); }}
                            className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                          >
                            Try 5 Free MCQs
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {isTopicModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
                <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-heading font-black text-white">Start practice for</h3>
                      <p className="mt-1 text-slate-400">{selectedTopicName} · {subjectName}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsTopicModalOpen(false)}
                      className="text-slate-400 hover:text-white"
                      aria-label="Close practice modal"
                    >
                      <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-3 mb-6">
                    {[
                      { id: 'quick', title: 'Quick Practice', desc: '20 random MCQs', icon: 'fa-bolt' },
                      { id: 'full', title: 'Full Practice', desc: 'All MCQs in sequence', icon: 'fa-layer-group' },
                      { id: 'mock', title: 'Timed Test', desc: '20 questions · 15 min', icon: 'fa-stopwatch' },
                    ].map((item) => {
                      const active = selectedMode === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedMode(item.id as 'quick' | 'full' | 'mock')}
                          className={`rounded-3xl border p-5 text-left transition-all duration-200 ${active ? 'border-brand-400 bg-brand-500/10 shadow-[0_10px_30px_rgba(99,102,241,0.16)]' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${active ? 'bg-brand-500/15 text-brand-300' : 'bg-white/5 text-slate-300'}`}>
                              <i className={`fa-solid ${item.icon}`}></i>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">{item.title}</p>
                              <p className="text-xs text-slate-400">{item.desc}</p>
                            </div>
                          </div>
                          <div className="text-xs uppercase tracking-[0.24em] font-black text-slate-500">{item.id === 'quick' ? '20 MCQs' : item.id === 'full' ? 'All available' : '20 MCQs'}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mb-6">
                    <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 mb-3">Difficulty Level</div>
                    <div className="flex flex-wrap gap-3">
                      {(['Easy', 'Medium', 'Hard'] as const).map((difficulty) => (
                        <button
                          key={difficulty}
                          type="button"
                          onClick={() => setSelectedDifficulty(difficulty)}
                          className={`rounded-full px-5 py-3 text-sm font-semibold transition ${selectedDifficulty === difficulty ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                        >
                          {difficulty}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Refine your session before you begin.</p>
                      <p className="text-xs text-slate-500 mt-1">Mode: {selectedMode === 'quick' ? 'Quick Practice' : selectedMode === 'full' ? 'Full Practice' : 'Timed Test'}</p>
                      <p className="text-xs text-slate-500">Difficulty: {selectedDifficulty}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsTopicModalOpen(false);
                        const mode = selectedMode;
                        const diff = selectedDifficulty.toLowerCase();
                        router.push(`/practice?subject=${encodeURIComponent(subjectName)}&topic=${encodeURIComponent(selectedTopicName)}&mode=${mode}&diff=${diff}&auto=true`);
                      }}
                      className="inline-flex items-center justify-center rounded-3xl bg-brand-500 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-brand-400"
                    >
                      Start Session
                      <i className="fa-solid fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}

export default function Topics() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-white"><i className="fa-solid fa-circle-notch fa-spin text-2xl"></i></div>}>
      <TopicsContent />
    </Suspense>
  );
}
