"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';

function TopicsContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subjectId');
  const examName = searchParams.get('examName') || 'WPSIPro Syllabus';
  const subjectName = searchParams.get('subjectName') || 'Loading...';

  const router = useRouter();
  const { user } = useUser();
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [selectedTopicName, setSelectedTopicName] = useState('');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [selectedMode, setSelectedMode] = useState<'quick' | 'full' | 'mock'>('quick');
  const [selectedDifficulties, setSelectedDifficulties] = useState<('Easy' | 'Medium' | 'Hard')[]>(['Easy', 'Medium', 'Hard']);
  const [limits, setLimits] = useState<{ mcqsSolvedToday: number, planType: string } | null>(null);

  useEffect(() => {
    fetch('/api/user/limits')
      .then(res => res.json())
      .then(data => {
        if (data.success) setLimits(data.data);
      })
      .catch(e => console.error(e));
  }, []);

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

  const isFreePlan = !user?.planType || user.planType === 'free';
  const isProOrElite = user?.planType?.toLowerCase().includes('pro') || user?.planType?.toLowerCase().includes('elite');

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 h-full overflow-y-auto">
      <div className="p-6 lg:p-10 max-w-6xl mx-auto">
        <button 
          onClick={() => window.history.back()}
          className="inline-flex items-center text-sm font-semibold text-dark-400 hover:text-dark-800 transition-colors mb-6"
        >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Back
        </button>

        {/* Subject Banner */}
        <div className="bg-primary-50 rounded-3xl p-8 mb-8 relative overflow-hidden border border-primary-100">
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-accent-100 rounded-l-full blur-3xl opacity-50"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center text-primary-600 shrink-0 shadow-md border border-primary-200/50 text-2xl">
                        <i className="fa-solid fa-book-open-reader drop-shadow-sm"></i>
                    </div>
                    <div>
                        <span className="bg-primary-100 text-primary-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1.5 inline-block">{examName}</span>
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-dark-900">{subjectName}</h2>
                        <p className="text-xs text-dark-500 max-w-xl leading-relaxed mt-1">Select a chapter below to view topics and practice configuration parameters.</p>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                            <span className="bg-white/90 text-dark-700 text-[11px] font-bold px-3 py-1 rounded-xl shadow-sm border border-dark-100/80 flex items-center gap-1.5">
                                <i className="fa-solid fa-layer-group text-dark-400"></i> <span>{loading ? '-' : topics.length} Chapters</span>
                            </span>
                            <span className="bg-white/90 text-primary-700 text-[11px] font-bold px-3 py-1 rounded-xl shadow-sm border border-primary-100/80 flex items-center gap-1.5">
                                <i className="fa-solid fa-file-circle-question text-primary-500"></i> <span>{loading ? '-' : topics.reduce((acc, curr) => acc + (curr.mcqCount || 0), 0)}+ Practice MCQs</span>
                            </span>
                            <span className="bg-success-50/90 text-success-700 text-[11px] font-bold px-3 py-1 rounded-xl shadow-sm border border-success-200/80 flex items-center gap-1.5">
                                <i className="fa-solid fa-crown text-success-500"></i> Combo Access Available
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Full-Width Chapters List */}
        <div>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
                <div className="flex items-center">
                    <div className="w-1.5 h-6 bg-accent-500 rounded-full mr-3"></div>
                    <h3 className="font-display font-bold text-lg text-dark-900">Chapters & Topics List</h3>
                </div>
                <div className="flex items-center gap-3">
                    {isProOrElite ? (
                        <button 
                            onClick={() => router.push(`/practice?subject=${encodeURIComponent(subjectName)}&topic=all&mode=random50&diff=easy,medium,hard&auto=true`)}
                            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold py-2 px-4 rounded-xl text-sm shadow-md transition-transform hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            <i className="fa-solid fa-shuffle"></i> 50 Random MCQs
                        </button>
                    ) : (
                        <button 
                            onClick={() => router.push('/pricing')}
                            className="bg-dark-100 text-dark-500 hover:text-dark-700 font-bold py-2 px-4 rounded-xl text-sm border border-dark-200/50 flex items-center gap-2 transition-colors cursor-pointer"
                            title="Upgrade to Pro or Elite to unlock"
                        >
                            <i className="fa-solid fa-lock"></i> 50 Random MCQs
                        </button>
                    )}
                    <p className="text-xs text-dark-400 font-medium hidden sm:block">Click any chapter to configure and start</p>
                </div>
            </div>

            <div className="space-y-2">
              {loading ? (
                <div className="text-center text-dark-400 py-10"><i className="fa-solid fa-circle-notch fa-spin text-2xl mb-3"></i><p>Loading topics...</p></div>
              ) : topics.length === 0 ? (
                <div className="text-center text-dark-400 py-10">No topics found for this subject.</div>
              ) : (
                topics.map((topic, idx) => {
                  const isTopicUnlocked = !isFreePlan || idx === 0;

                  return (
                    <div
                      key={topic.id}
                      onClick={() => { 
                        if (isTopicUnlocked) {
                          setSelectedTopicName(topic.name); setSelectedTopicIndex(idx); setSelectedMode('quick'); setSelectedDifficulties(['Easy', 'Medium', 'Hard']); setIsTopicModalOpen(true); 
                        }
                      }}
                      className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${isTopicUnlocked ? 'cursor-pointer bg-white border-dark-100 hover:border-primary-300 hover:shadow-md hover:shadow-primary-500/5' : 'cursor-not-allowed bg-dark-50/50 border-dark-100 opacity-80'}`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${isTopicUnlocked ? 'bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 group-hover:from-primary-600 group-hover:to-primary-700 group-hover:text-white transition-all duration-300 border border-primary-200/50' : 'bg-dark-100 text-dark-400 border border-dark-200/50'}`}>
                              <i className={`fa-solid ${isTopicUnlocked ? 'fa-cube drop-shadow-sm' : 'fa-lock'} text-lg`}></i>
                          </div>
                          <div>
                              <h4 className={`font-bold text-sm transition-colors ${isTopicUnlocked ? 'text-dark-900 group-hover:text-primary-700' : 'text-dark-500'}`}>{idx + 1}. {topic.name}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                  <span className="text-[10px] text-dark-500 font-medium">{topic.mcqCount || 0} Questions</span>
                                  <div className="w-1 h-1 bg-dark-200 rounded-full"></div>
                                  <span className={`text-[10px] font-bold ${isTopicUnlocked ? 'text-success-600' : 'text-amber-600'}`}>
                                      {isTopicUnlocked ? 'Unlocked' : 'Premium Required'}
                                  </span>
                              </div>
                          </div>
                      </div>
                      <div className="shrink-0 pl-4 border-l border-dark-100 hidden sm:block">
                          {isTopicUnlocked ? (
                            <button className="bg-primary-50 text-primary-600 font-bold py-1.5 px-4 rounded-lg text-xs group-hover:bg-primary-600 group-hover:text-white transition-colors">Start</button>
                          ) : (
                            <button className="bg-dark-100 text-dark-500 font-bold py-1.5 px-4 rounded-lg text-xs flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> Locked
                            </button>
                          )}
                      </div>
                  </div>
                  );
                })
              )}
            </div>
        </div>
      </div>

      {/* PRACTICE SETTINGS MODAL */}
      {isTopicModalOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9000] transition-opacity" onClick={() => setIsTopicModalOpen(false)}></div>
          <div className="fixed inset-0 z-[9001] flex items-center justify-center p-4 pointer-events-none sm:p-6">
              <div className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-3xl pointer-events-auto flex flex-col max-h-full overflow-hidden relative">
                  
                  {/* Modal Header */}
                  <div className="p-6 border-b border-slate-100 flex items-start justify-between shrink-0">
                      <div className="border-l-[3px] border-blue-600 pl-4">
                          <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.15em] mb-1.5">TOPIC-WISE PRACTICE</p>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight pr-4">{selectedTopicName}</h3>
                          <p className="text-xs text-slate-500 font-medium mt-1">Customize your session parameters.</p>
                      </div>
                      <button onClick={() => setIsTopicModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors shrink-0">
                          <i className="fa-solid fa-xmark text-lg"></i>
                      </button>
                  </div>

                  {/* Modal Body */}
                  <div className="px-6 py-8 space-y-10 overflow-y-auto custom-scrollbar min-h-0 flex-1">
                      {/* Practice Mode */}
                      <div>
                          <div className="flex items-center gap-2.5 mb-5">
                              <i className="fa-solid fa-sliders text-slate-400"></i>
                              <h4 className="font-bold text-slate-800 text-sm">Practice Mode</h4>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {/* Quick Practice */}
                              <div onClick={() => setSelectedMode('quick')} className={`relative rounded-2xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-200 border-2 ${selectedMode === 'quick' ? 'border-blue-600 bg-blue-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                                  <div className={`text-xl ${selectedMode === 'quick' ? 'text-blue-600' : 'text-slate-400'}`}>
                                      <i className="fa-solid fa-bolt-lightning"></i>
                                  </div>
                                  <div className="mt-2">
                                      <h5 className={`font-bold text-sm mb-1 ${selectedMode === 'quick' ? 'text-blue-900' : 'text-slate-800'}`}>Quick Practice</h5>
                                      <p className="text-xs text-slate-500 leading-relaxed">20 random MCQs</p>
                                  </div>
                                  {selectedMode === 'quick' && (
                                    <div className="absolute top-5 right-5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                                        <i className="fa-solid fa-check text-[10px]"></i>
                                    </div>
                                  )}
                              </div>

                              {/* Full Practice */}
                              <div onClick={() => setSelectedMode('full')} className={`relative rounded-2xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-200 border-2 ${selectedMode === 'full' ? 'border-blue-600 bg-blue-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                                  <div className={`text-xl ${selectedMode === 'full' ? 'text-blue-600' : 'text-slate-400'}`}>
                                      <i className="fa-solid fa-list-check"></i>
                                  </div>
                                  <div className="mt-2">
                                      <h5 className={`font-bold text-sm mb-1 ${selectedMode === 'full' ? 'text-blue-900' : 'text-slate-800'}`}>Full Practice</h5>
                                      <p className="text-xs text-slate-500 leading-relaxed">All MCQs in sequence</p>
                                  </div>
                                  {selectedMode === 'full' && (
                                    <div className="absolute top-5 right-5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                                        <i className="fa-solid fa-check text-[10px]"></i>
                                    </div>
                                  )}
                              </div>

                              {/* Timed Test */}
                              <div onClick={() => setSelectedMode('mock')} className={`relative rounded-2xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-200 border-2 ${selectedMode === 'mock' ? 'border-blue-600 bg-blue-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                                  <div className={`text-xl ${selectedMode === 'mock' ? 'text-blue-600' : 'text-slate-400'}`}>
                                      <i className="fa-solid fa-stopwatch"></i>
                                  </div>
                                  <div className="mt-2">
                                      <h5 className={`font-bold text-sm mb-1 ${selectedMode === 'mock' ? 'text-blue-900' : 'text-slate-800'}`}>Timed Test</h5>
                                      <p className="text-xs text-slate-500 leading-relaxed">20 Questions • 15 Min</p>
                                  </div>
                                  {selectedMode === 'mock' && (
                                    <div className="absolute top-5 right-5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                                        <i className="fa-solid fa-check text-[10px]"></i>
                                    </div>
                                  )}
                              </div>
                          </div>
                      </div>

                      {/* Difficulty Level */}
                      <div>
                          <div className="flex items-center gap-2.5 mb-5">
                              <i className="fa-solid fa-layer-group text-slate-400"></i>
                              <h4 className="font-bold text-slate-800 text-sm">Difficulty Level</h4>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                              {(['Easy', 'Medium', 'Hard'] as const).map((diff) => {
                                const isActive = selectedDifficulties.includes(diff);
                                let baseClass = 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50';
                                
                                if (isActive) {
                                  if (diff === 'Easy') baseClass = 'border-emerald-500 bg-emerald-50/30 text-emerald-700 shadow-sm';
                                  if (diff === 'Medium') baseClass = 'border-amber-500 bg-amber-50/30 text-amber-700 shadow-sm';
                                  if (diff === 'Hard') baseClass = 'border-rose-500 bg-rose-50/30 text-rose-700 shadow-sm';
                                }

                                return (
                                  <button 
                                    key={diff}
                                    onClick={() => {
                                      if (isActive && selectedDifficulties.length === 1) return;
                                      setSelectedDifficulties(prev => prev.includes(diff) ? prev.filter(d => d !== diff) : [...prev, diff]);
                                    }}
                                    className={`py-3 rounded-2xl border-2 ${baseClass} text-sm font-bold transition-all`}
                                  >
                                      {diff}
                                  </button>
                                );
                              })}
                          </div>
                      </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-6 border-t border-slate-100 shrink-0 flex justify-end">
                      {(() => {
                        const isFirstTopic = selectedTopicIndex === 0;
                        const isLimitReached = !isFirstTopic && limits?.planType === 'free' && (limits.mcqsSolvedToday || 0) >= 20;
                        return (
                          <button 
                            onClick={() => {
                              if (isLimitReached) return;
                              setIsTopicModalOpen(false);
                              const mode = selectedMode;
                              const diff = selectedDifficulties.map(d => d.toLowerCase()).join(',');
                              router.push(`/practice?subject=${encodeURIComponent(subjectName)}&topic=${encodeURIComponent(selectedTopicName)}&mode=${mode}&diff=${diff}&auto=true`);
                            }}
                            className={`${isLimitReached ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-500/20'} text-white px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all`}
                          >
                              {isLimitReached ? 'Daily Limit Reached (20/20 FREE MCQs)' : <>Start Session {isFirstTopic && <span className="ml-1 text-xs text-blue-200">(Free)</span>} <i className="fa-solid fa-arrow-right ml-1"></i></>}
                          </button>
                        );
                      })()}
                  </div>
              </div>
          </div>
        </>
      )}

    </div>
  );
}

export default function Topics() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-[var(--text-primary)]"><i className="fa-solid fa-circle-notch fa-spin text-2xl"></i></div>}>
      <TopicsContent />
    </Suspense>
  );
}
