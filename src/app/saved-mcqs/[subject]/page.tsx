"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Demo MCQ data per subject
const subjectData: Record<string, any[]> = {
  'reasoning-data': [
      {
          q: 'Find the missing number: 4, 9, 16, 25, ?, 49', opts: ['32', '36', '35', '40'], ans: 1, diff: 'easy', subject: 'Reasoning', saved: '1 week ago',
          exp: 'The sequence is perfect squares: 2², 3², 4², 5², <b>6²=36</b>, 7².'
      },
      {
          q: 'If PENCIL is coded as RGPENK, how is PAPER coded?', opts: ['RCRGR', 'RCRGZ', 'RCRER', 'RCRGT'], ans: 1, diff: 'medium', subject: 'Coding', saved: '3 days ago',
          exp: 'Each letter is shifted forward by 2 positions in the alphabet. P→R, A→C, P→R, E→G, R→Z.'
      },
      {
          q: 'A train travels 360 km in 4 hours. What is its speed in m/s?', opts: ['25 m/s', '90 m/s', '100 m/s', '30 m/s'], ans: 0, diff: 'easy', subject: 'Data Interpretation', saved: '5 days ago',
          exp: 'Speed = 360 km / 4 h = 90 km/h = 90×1000/3600 = <b>25 m/s</b>.'
      },
  ],
  'constitution-of-india': [
      {
          q: 'Which Article declares Directive Principles of State Policy as fundamental in governance?', opts: ['Article 36', 'Article 37', 'Article 38', 'Article 39'], ans: 1, diff: 'medium', subject: 'Constitution', saved: '2 days ago',
          exp: '<b>Article 37</b> states that DPSPs are fundamental in governance and it shall be the duty of the State to apply these in making laws.'
      },
      {
          q: 'The Right to Education is a Fundamental Right under which Article?', opts: ['Article 19', 'Article 21', 'Article 21A', 'Article 29'], ans: 2, diff: 'easy', subject: 'Constitution', saved: '4 days ago',
          exp: '<b>Article 21A</b> (added by the 86th Amendment, 2002) provides free and compulsory education to children aged 6–14 years.'
      },
  ],
  'communication-eng': [
      {
          q: 'What does the Shannon-Hartley theorem specify?', opts: ['Noise power density', 'Minimum bandwidth for error-free modulation', 'Maximum theoretical channel capacity in the presence of noise', 'Quantization levels in PCM'], ans: 2, diff: 'hard', subject: 'Communication', saved: '5 days ago',
          exp: 'Shannon-Hartley: C = B·log₂(1+S/N). It defines the <b>maximum theoretical channel capacity</b> over a noisy channel.'
      },
      {
          q: 'Nyquist sampling theorem states the sampling rate must be at least:', opts: ['Equal to signal frequency', 'Half of signal frequency', 'Twice the highest signal frequency', 'Four times the signal frequency'], ans: 2, diff: 'medium', subject: 'Communication', saved: '1 week ago',
          exp: 'Nyquist theorem: sampling frequency ≥ <b>2 × maximum signal frequency</b> to avoid aliasing.'
      },
  ],
  'digital-electronics': [
      {
          q: 'Which logic gate is known as the Universal gate?', opts: ['AND', 'OR', 'NAND', 'XOR'], ans: 2, diff: 'easy', subject: 'Digital', saved: '3 days ago',
          exp: '<b>NAND</b> (and NOR) gates are universal because any other logic gate can be implemented using only NAND gates.'
      },
      {
          q: 'In a 4-bit binary counter, the maximum count is:', opts: ['8', '15', '16', '14'], ans: 1, diff: 'easy', subject: 'Digital', saved: '1 week ago',
          exp: 'A 4-bit counter counts from 0 to 2⁴−1 = <b>15</b>.'
      },
  ],
  'gs-mental-ability': [
      {
          q: 'Who was the first woman President of India?', opts: ['Sonia Gandhi', 'Indira Gandhi', 'Pratibha Patil', 'Meira Kumar'], ans: 2, diff: 'easy', subject: 'GS', saved: '2 days ago',
          exp: '<b>Pratibha Devisingh Patil</b> was the 12th President of India (2007–2012) and the first woman to hold this office.'
      },
      {
          q: 'If a clock shows 3:45, what angle does the hour hand make with 12?', opts: ['97.5°', '112.5°', '90°', '105°'], ans: 1, diff: 'medium', subject: 'Mental Ability', saved: '4 days ago',
          exp: 'Hour hand moves 0.5°/minute. At 3:45 → 3×30 + 45×0.5 = 90+22.5 = <b>112.5°</b>.'
      },
  ],
};

const diffColors: Record<string, string> = {
  easy: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  medium: 'bg-amber-50 text-amber-600 border-amber-200',
  hard: 'bg-rose-50 text-rose-600 border-rose-200'
};

export default function SavedMCQsDetailPage({ params }: { params: Promise<{ subject: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [answeredState, setAnsweredState] = useState<Record<number, number>>({}); // idx -> selectedOption
  const [showExp, setShowExp] = useState<Record<number, boolean>>({});
  const [removed, setRemoved] = useState<Record<number, boolean>>({});
  
  useEffect(() => {
    const subjId = resolvedParams.subject;
    const data = subjectData[subjId] || [];
    setQuestions(data);
  }, [resolvedParams.subject]);

  const activeQuestions = questions.filter((_, idx) => !removed[idx]);
  const total = activeQuestions.length;
  const answeredCount = activeQuestions.filter((_, idx) => answeredState[idx] !== undefined).length;
  const pct = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (answeredState[qIdx] !== undefined) return; // already answered
    setAnsweredState(prev => ({ ...prev, [qIdx]: optIdx }));
    setShowExp(prev => ({ ...prev, [qIdx]: true }));
  };

  const handleToggleExp = (qIdx: number) => {
    setShowExp(prev => ({ ...prev, [qIdx]: !prev[qIdx] }));
  };

  const handleRemove = (qIdx: number) => {
    setRemoved(prev => ({ ...prev, [qIdx]: true }));
  };

  const subjectTitle = resolvedParams.subject.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 h-full overflow-y-auto">
      <div className="flex-1 p-5 lg:p-8 max-w-4xl mx-auto w-full">
        
        {/* Back button + Subject header */}
        <div className="flex items-center gap-3 mb-6">
            <button onClick={() => router.back()} className="flex items-center gap-2 px-3 py-2 bg-white border border-dark-200 hover:border-primary-300 hover:bg-primary-50 text-dark-600 hover:text-primary-700 rounded-xl text-xs font-bold transition-all shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </button>
            <div>
                <h2 className="font-display font-black text-xl md:text-2xl text-dark-900 tracking-tight leading-none">
                    {subjectTitle}
                </h2>
                <p className="text-[10px] text-dark-400 font-semibold uppercase tracking-widest mt-0.5">
                    Saved Questions
                </p>
            </div>
        </div>

        {/* Stats bar */}
        <div className="bg-white border border-dark-100 rounded-2xl px-6 py-4 mb-6 flex flex-wrap items-center gap-6 shadow-sm">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>
                <div>
                    <p className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">Total Saved</p>
                    <p className="text-base font-black text-dark-900 leading-none">{total}</p>
                </div>
            </div>
            <div className="w-px h-8 bg-dark-100"></div>
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">Answered</p>
                    <p className="text-base font-black text-emerald-600 leading-none">{answeredCount}</p>
                </div>
            </div>
            <div className="w-px h-8 bg-dark-100"></div>
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-dark-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">Remaining</p>
                    <p className="text-base font-black text-dark-700 leading-none">{Math.max(0, total - answeredCount)}</p>
                </div>
            </div>
            {/* Progress bar */}
            <div className="flex-1 min-w-[120px] hidden sm:block">
                <div className="flex items-center justify-between text-[10px] text-dark-400 font-bold mb-1">
                    <span>Session Progress</span>
                    <span>{pct}%</span>
                </div>
                <div className="w-full h-2 bg-dark-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
                </div>
            </div>
        </div>

        {/* Question List */}
        {total > 0 ? (
          <div className="space-y-5">
            {questions.map((q, idx) => {
              if (removed[idx]) return null;

              const isAnswered = answeredState[idx] !== undefined;
              const selectedOpt = answeredState[idx];
              const isCorrect = selectedOpt === q.ans;
              
              const dc = diffColors[q.diff] || diffColors.medium;
              const labels = ['A', 'B', 'C', 'D'];

              return (
                <div key={idx} className="mcq-card bg-white border border-dark-100 rounded-2xl p-6 shadow-sm transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-primary-50 text-primary-700 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider border border-primary-100">Part A/B</span>
                            <span className="bg-dark-50 text-dark-500 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">{q.subject}</span>
                            <span className={`${dc} border text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase`}>{q.diff}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-dark-400 font-medium">Saved {q.saved}</span>
                            <button onClick={() => handleRemove(idx)} className="text-dark-400 hover:text-rose-500 transition-colors p-1 cursor-pointer" title="Remove">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            </button>
                        </div>
                    </div>
                    <h4 className="font-bold text-dark-900 text-sm md:text-base mb-5 leading-relaxed" dangerouslySetInnerHTML={{ __html: q.q }}></h4>
                    <div className="space-y-2">
                      {q.opts.map((opt: string, i: number) => {
                        let btnClass = "w-full text-left p-4 rounded-xl border border-dark-200 text-sm font-semibold text-dark-700 flex items-center justify-between gap-4 transition-all";
                        if (!isAnswered) {
                          btnClass += " cursor-pointer hover:border-dark-300 hover:bg-dark-50";
                        } else {
                          btnClass += " cursor-not-allowed opacity-80";
                          if (i === q.ans) {
                            btnClass += " border-success-500 bg-success-50 text-success-800";
                          } else if (i === selectedOpt) {
                            btnClass += " border-rose-500 bg-rose-50 text-rose-800";
                          }
                        }

                        return (
                          <button key={i} onClick={() => handleSelectOption(idx, i)} disabled={isAnswered} className={btnClass}>
                            <span>{labels[i]}. {opt}</span>
                            <span className="w-5 h-5 shrink-0 flex items-center justify-center">
                              {isAnswered && i === q.ans && (
                                <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                              )}
                              {isAnswered && i === selectedOpt && i !== q.ans && (
                                <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-4">
                        <button onClick={() => handleToggleExp(idx)} className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1.5 cursor-pointer">
                            <span>{showExp[idx] ? 'Hide Explanation' : 'View Explanation'}</span>
                            <svg className={`w-3.5 h-3.5 transition-transform ${showExp[idx] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        {showExp[idx] && (
                          <div className="mt-3 p-4 bg-success-50/60 border border-success-100 rounded-xl text-xs text-dark-700 leading-relaxed">
                              <strong className="text-success-700 block mb-1">Correct Answer: {labels[q.ans]}. {q.opts[q.ans]}</strong>
                              <span dangerouslySetInnerHTML={{ __html: q.exp }}></span>
                          </div>
                        )}
                    </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
              <div className="w-16 h-16 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📭</div>
              <h3 className="font-bold text-dark-700 text-lg">No saved questions yet</h3>
              <p className="text-dark-400 text-sm mt-1 mb-5">Go to any MCQ practice and save questions you want to revisit.</p>
              <Link href="/test" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-primary-500/20">
                Start Practising &rarr;
              </Link>
          </div>
        )}
      </div>
    </div>
  );
}
