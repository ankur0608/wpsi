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
  const [selectedDifficulties, setSelectedDifficulties] = useState<('Easy' | 'Medium' | 'Hard')[]>(['Easy', 'Medium', 'Hard']);

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
    <main id="nav-main-wrapper" className="flex-1 flex flex-col h-screen overflow-hidden bg-[var(--bg-primary)]">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8" style={{"background":"radial-gradient(ellipse 60% 40% at 30% 0%,rgba(99,102,241,0.08) 0%,transparent 55%)"}}>
        <div className="max-w-5xl mx-auto pb-24 space-y-6">

          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>

          {/*  Dynamic Subject Header  */}
          <div id="subject-header" className="rounded-[2rem] p-8 relative overflow-hidden" style={{"background":"linear-gradient(135deg,rgba(99,102,241,0.15),var(--bg-surface))","border":"1px solid rgba(99,102,241,0.35)"}}>
            <div className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-10 bg-brand-500" style={{"transform":"translate(30%,-30%)"}}></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5">
                <div id="subj-icon" className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0" style={{"background":"rgba(99,102,241,0.15)","border":"1px solid rgba(99,102,241,0.3)","color":"#818cf8"}}>
                  <i className="fa-solid fa-book-open-reader"></i>
                </div>
                <div>
                  <div className="text-[10px] font-black text-brand-400 uppercase tracking-[0.2em] mb-1">{examName}</div>
                  <h2 id="subj-name" className="text-3xl font-heading font-black text-[var(--text-primary)] leading-tight">{subjectName}</h2>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href={`/practice?subject=${encodeURIComponent(subjectName)}`} className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-[var(--text-primary)] transition-all hover:scale-105 active:scale-95" style={{"background":"linear-gradient(135deg,#6366f1,#8b5cf6)","boxShadow":"0 10px 20px rgba(99,102,241,0.25)"}}>
                  <i className="fa-solid fa-bolt mr-2"></i>Full Practice
                </Link>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8 relative z-10 border-t border-[var(--border-subtle)] pt-6">
              <div className="flex items-center gap-2.5 text-[11px] font-bold text-[var(--text-muted)] bg-white/5 px-4 py-2 rounded-xl">
                <i className="fa-solid fa-layer-group text-brand-400"></i>
                <span id="subj-chapters">{loading ? '-' : topics.length} Chapters</span>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] font-bold text-[var(--text-muted)] bg-white/5 px-4 py-2 rounded-xl">
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
            <div className="rounded-2xl p-5 flex items-center justify-between gap-4 bg-dark-card/60 border border-[var(--border-subtle)] group hover:border-brand-500/30 transition-all">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent"><i className="fa-solid fa-gift"></i></div>
                <div className="flex-1">
                    <div className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-0.5">Try before buy</div>
                    <div className="text-sm font-bold text-[var(--text-primary)]">First 5 MCQs <span className="text-accent ml-1 font-black">FREE</span></div>
                </div>
                <button onClick={() => { setSelectedTopicName(topics[0]?.name || ''); setSelectedMode('quick'); setSelectedDifficulties(['Easy', 'Medium', 'Hard']); setIsTopicModalOpen(true); }} className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline">Start Now</button>
            </div>
            <div className="rounded-2xl p-5 flex items-center justify-between gap-4 bg-dark-card/60 border border-[var(--border-subtle)] relative overflow-hidden group hover:border-brand-500/40 transition-all">
                <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400"><i className="fa-solid fa-box-archive"></i></div>
                <div className="flex-1 relative z-10">
                    <div className="text-[9px] font-black text-brand-400 uppercase tracking-widest mb-0.5">Full Pack</div>
                    <div className="text-sm font-bold text-[var(--text-primary)]">₹99 <span className="text-[10px] text-[var(--text-muted)] line-through ml-1">₹249</span></div>
                </div>
                <Link href="/pricing" className="px-4 py-2 rounded-lg bg-brand-500 text-[var(--text-primary)] font-black text-[10px] uppercase tracking-widest relative z-10">Unlock</Link>
            </div>
            <div className="rounded-2xl p-5 flex items-center justify-between gap-4 bg-dark-card/60 border border-warning/20 group hover:border-warning/40 transition-all">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center text-warning"><i className="fa-solid fa-bolt-lightning"></i></div>
                <div className="flex-1">
                    <div className="text-[9px] font-black text-warning uppercase tracking-widest mb-0.5">WPSIPro Complete Pack</div>
                    <div className="text-sm font-bold text-[var(--text-primary)]">₹249 <span className="text-[10px] text-[var(--text-muted)] line-through ml-1">₹594</span></div>
                </div>
                <Link href="/pricing" className="px-4 py-2 rounded-lg bg-warning text-dark-bg font-black text-[10px] uppercase tracking-widest">Upgrade</Link>
            </div>
          </div>

          {/*  Topics List  */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-brand-500 rounded-full"></div>
                    <h3 className="font-heading font-black text-[var(--text-primary)] text-lg tracking-tight">Curriculum Breakdown</h3>
                </div>
            </div>
            
            <div id="topics-list" className="space-y-3">
              {loading ? (
                <div className="text-center text-[var(--text-muted)] py-10"><i className="fa-solid fa-circle-notch fa-spin text-2xl mb-3"></i><p>Loading topics...</p></div>
              ) : topics.length === 0 ? (
                <div className="text-center text-[var(--text-muted)] py-10">No topics found for this subject.</div>
              ) : (
                topics.map((topic, idx) => {
                  const isFree = idx === 0;
                  return (
                    <div
                      key={topic.id}
                      className={`rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 group ${isFree ? 'bg-accent/5 border border-accent/25' : 'bg-dark-card/40 border border-[var(--border-subtle)] hover:border-[var(--border-subtle)]'}`}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm shrink-0 shadow-xl ${isFree ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-white/5 text-[var(--text-muted)] border border-[var(--border-subtle)]'}`}>
                          <i className={`fa-solid ${isFree ? 'fa-unlock' : 'fa-lock'}`}></i>
                        </div>
                        <div className="min-w-0">
                          <div className={`font-bold text-sm truncate ${isFree ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'} transition-colors`}>
                            {idx + 1}. {topic.name}
                          </div>
                          <div className="text-[10px] text-[var(--text-muted)] mt-1 font-medium uppercase tracking-tight flex items-center gap-2">
                              <span>{Math.floor(Math.random() * 20) + 40} Questions</span>
                              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                              <span className={isFree ? 'text-accent' : 'text-[var(--text-muted)]'}>{isFree ? 'Free Trial' : 'Requires Pack'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                        {isFree ? (
                          <button
                            type="button"
                            onClick={() => { setSelectedTopicName(topic.name); setSelectedMode('quick'); setSelectedDifficulties(['Easy', 'Medium', 'Hard']); setIsTopicModalOpen(true); }}
                            className="flex-1 sm:flex-none py-2.5 px-6 rounded-xl bg-accent text-dark-bg font-black text-[10px] uppercase tracking-widest shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95"
                          >
                            Start Chapter
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => { setSelectedTopicName(topic.name); setSelectedMode('quick'); setSelectedDifficulties(['Easy', 'Medium', 'Hard']); setIsTopicModalOpen(true); }}
                            className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-white/5 border border-[var(--border-subtle)] text-[var(--text-primary)] font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
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
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="w-full max-w-3xl max-h-[90vh] rounded-[1.5rem] border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-2xl overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="relative p-6 md:p-8 border-b border-[var(--border-subtle)]">
                    <button
                      type="button"
                      onClick={() => setIsTopicModalOpen(false)}
                      className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors"
                      aria-label="Close practice modal"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                    
                    <div className="border-l-[3px] border-brand-500 pl-4">
                      <div className="text-[10px] font-black uppercase tracking-widest text-brand-400 mb-1">TOPIC-WISE PRACTICE</div>
                      <h3 className="text-2xl font-heading font-black text-[var(--text-primary)]">{selectedTopicName}</h3>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">Customize your session parameters.</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 md:p-8 overflow-y-auto">
                    {/* Practice Mode */}
                    <div className="flex items-center gap-2 mb-4">
                      <i className="fa-solid fa-gamepad text-[var(--text-muted)]"></i>
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">Practice Mode</h4>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-3 mb-8">
                      {[
                        { id: 'quick', title: 'Quick Practice', desc: '20 random MCQs', icon: 'fa-bolt', color: 'text-brand-400' },
                        { id: 'full', title: 'Full Practice', desc: 'All MCQs in sequence', icon: 'fa-list-check', color: 'text-emerald-400' },
                        { id: 'mock', title: 'Timed Test', desc: '20 Questions • 15 Min', icon: 'fa-stopwatch', color: 'text-amber-400' },
                      ].map((item) => {
                        const active = selectedMode === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedMode(item.id as 'quick' | 'full' | 'mock')}
                            className={`relative rounded-2xl border p-5 text-left transition-all duration-200 ${active ? 'border-brand-500 bg-brand-500/5' : 'border-[var(--border-subtle)] bg-white/[0.02] hover:border-[var(--border-subtle)] hover:bg-white/[0.04]'}`}
                          >
                            {active && (
                              <div className="absolute top-4 right-4 text-brand-500 text-sm">
                                <i className="fa-solid fa-circle-check"></i>
                              </div>
                            )}
                            <div className={`text-xl mb-3 ${item.color}`}>
                              <i className={`fa-solid ${item.icon}`}></i>
                            </div>
                            <div className="text-sm font-bold text-[var(--text-primary)] mb-1">{item.title}</div>
                            <div className="text-[11px] text-[var(--text-muted)]">{item.desc}</div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Difficulty Level */}
                    <div className="flex items-center gap-2 mb-4">
                      <i className="fa-solid fa-layer-group text-[var(--text-muted)]"></i>
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">Difficulty Level</h4>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {(['Easy', 'Medium', 'Hard'] as const).map((difficulty) => {
                        const active = selectedDifficulties.includes(difficulty);
                        let activeBorder = 'border-brand-500';
                        if (difficulty === 'Easy') activeBorder = 'border-emerald-500';
                        if (difficulty === 'Medium') activeBorder = 'border-amber-500';
                        if (difficulty === 'Hard') activeBorder = 'border-rose-500';
                        
                        return (
                          <button
                            key={difficulty}
                            type="button"
                            onClick={() => {
                              if (active && selectedDifficulties.length === 1) return;
                              setSelectedDifficulties(prev => prev.includes(difficulty) ? prev.filter(d => d !== difficulty) : [...prev, difficulty]);
                            }}
                            className={`rounded-2xl py-3.5 text-sm font-bold transition-all border ${active ? `${activeBorder} bg-white/5 text-[var(--text-primary)]` : 'border-[var(--border-subtle)] bg-white/[0.02] text-[var(--text-muted)] hover:border-[var(--border-subtle)] hover:bg-white/[0.04]'}`}
                          >
                            {difficulty}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 md:p-8 border-t border-[var(--border-subtle)] bg-white/[0.02] flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setIsTopicModalOpen(false);
                        const mode = selectedMode;
                        const diff = selectedDifficulties.map(d => d.toLowerCase()).join(',');
                        router.push(`/practice?subject=${encodeURIComponent(subjectName)}&topic=${encodeURIComponent(selectedTopicName)}&mode=${mode}&diff=${diff}&auto=true`);
                      }}
                      className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-[var(--text-primary)] transition hover:bg-brand-400 hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/20"
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
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-[var(--text-primary)]"><i className="fa-solid fa-circle-notch fa-spin text-2xl"></i></div>}>
      <TopicsContent />
    </Suspense>
  );
}
