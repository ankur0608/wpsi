"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Subjects() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/syllabus')
      .then(res => res.json())
      .then(json => {
        if (json.data) setData(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch syllabus', err);
        setLoading(false);
      });
  }, []);

  const totalSubjects = data.reduce((acc, exam) => acc + (exam.subjects?.length || 0), 0);
  const totalTopics = data.reduce((acc, exam) => acc + exam.subjects?.reduce((sum: number, s: any) => sum + (s.topics?.length || 0), 0), 0);

  const selectedExam = data.find(e => e.id === selectedExamId);

  const groupedSubjects = React.useMemo(() => {
    const groups = new Map<string, any[]>();
    (selectedExam?.subjects ?? []).forEach((subject: any) => {
      const groupKey = subject.part === 'A'
        ? 'Part A: General & Aptitude'
        : subject.part === 'B'
          ? 'Part B: Technical Subjects'
          : 'Subjects';
      groups.set(groupKey, [...(groups.get(groupKey) ?? []), subject]);
    });
    return Array.from(groups.entries());
  }, [selectedExam]);

  return (
    <>
      <main id="nav-main-wrapper" className="flex-1 flex flex-col h-screen overflow-hidden bg-dark-bg">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8 relative" style={{"background":"radial-gradient(ellipse 80% 50% at 20% -10%,rgba(99,102,241,0.08) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 100%,rgba(139,92,246,0.06) 0%,transparent 50%)"}}>
          <div className="max-w-7xl mx-auto pb-20">

            {/*  Header  */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg" style={{"background":"linear-gradient(135deg,#6366f1,#8b5cf6)"}}><i className="fa-solid fa-book-open"></i></div>
                    <div>
                      <p className="text-xs font-bold text-brand-400 uppercase tracking-widest">WPSI Exam 2025</p>
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">Complete Curriculum</h2>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm ml-13">Everything you need to crack the exam.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(99,102,241,0.08)","border":"1px solid rgba(99,102,241,0.2)"}}><div className="w-9 h-9 rounded-lg flex items-center justify-center text-brand-400 shrink-0" style={{"background":"rgba(99,102,241,0.15)"}}><i className="fa-solid fa-layer-group text-sm"></i></div><div><div className="text-lg font-bold text-white font-mono">{loading ? '-' : totalSubjects}</div><div className="text-[10px] text-slate-400 uppercase font-semibold">Subjects</div></div></div>
                <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(16,185,129,0.08)","border":"1px solid rgba(16,185,129,0.2)"}}><div className="w-9 h-9 rounded-lg flex items-center justify-center text-accent shrink-0" style={{"background":"rgba(16,185,129,0.15)"}}><i className="fa-solid fa-list-check text-sm"></i></div><div><div className="text-lg font-bold text-white font-mono">{loading ? '-' : totalTopics}</div><div className="text-[10px] text-slate-400 uppercase font-semibold">Topics</div></div></div>
                <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(245,158,11,0.08)","border":"1px solid rgba(245,158,11,0.2)"}}><div className="w-9 h-9 rounded-lg flex items-center justify-center text-warning shrink-0" style={{"background":"rgba(245,158,11,0.15)"}}><i className="fa-solid fa-trophy text-sm"></i></div><div><div className="text-lg font-bold text-white font-mono">{loading ? '-' : data.length}</div><div className="text-[10px] text-slate-400 uppercase font-semibold">Exams</div></div></div>
                <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(139,92,246,0.08)","border":"1px solid rgba(139,92,246,0.2)"}}><div className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary shrink-0" style={{"background":"rgba(139,92,246,0.15)"}}><i className="fa-solid fa-chart-line text-sm"></i></div><div><div className="text-lg font-bold text-white font-mono">0%</div><div className="text-[10px] text-slate-400 uppercase font-semibold">Progress</div></div></div>
              </div>
            </div>

            {loading ? (
              <div className="text-center text-slate-500 py-10"><i className="fa-solid fa-circle-notch fa-spin text-2xl mb-3"></i><p>Loading curriculum...</p></div>
            ) : !selectedExamId ? (
              /* EXAMS VIEW */
              <div className="mb-10 animate-on-scroll is-visible">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1.5 h-8 rounded-full" style={{"background":"linear-gradient(180deg,#f59e0b,#fcd34d)"}}></div>
                  <h3 className="text-xl font-heading font-bold text-white">Select an Exam</h3>
                </div>
                {/* 3 Cards per row grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.map((exam, idx) => {
                    const colors = [
                      { bg: 'rgba(99,102,241,0.15)', text: '#818cf8', border: 'rgba(99,102,241,0.3)' },
                      { bg: 'rgba(16,185,129,0.15)', text: '#10b981', border: 'rgba(16,185,129,0.3)' },
                      { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
                    ];
                    const c = colors[idx % colors.length];
                    
                    return (
                      <button 
                        key={exam.id} 
                        onClick={() => setSelectedExamId(exam.id)}
                        className="group block rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 text-left"
                        style={{background:"linear-gradient(145deg,rgba(20,29,46,0.85),rgba(11,15,26,0.98))", border:`1px solid ${c.border}`, boxShadow:"0 10px 30px -10px rgba(0,0,0,0.5)"}}
                      >
                        <div className="absolute -right-10 -top-10 w-32 h-32 blur-3xl rounded-full opacity-20 transition-all duration-700 group-hover:opacity-40" style={{background: c.text}}></div>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xl" style={{background:`linear-gradient(135deg, ${c.bg}, rgba(0,0,0,0.1))`, border:`1px solid ${c.border}`, color: c.text}}>
                          <i className="fa-solid fa-graduation-cap"></i>
                        </div>
                        <h4 className="font-heading font-bold text-white text-lg leading-snug group-hover:text-brand-300 transition-colors mb-2">{exam.name}</h4>
                        <p className="text-xs text-slate-400 mb-4 font-medium">{exam.subjects?.length || 0} Subjects Included</p>
                        <div className="flex justify-between items-center text-[12px] pt-4 border-t border-white/5">
                          <span className="text-slate-500">View Curriculum</span>
                          <span className="font-bold transition-transform group-hover:translate-x-1" style={{color: c.text}}>Enter <i className="fa-solid fa-arrow-right ml-1"></i></span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* SUBJECTS VIEW */
              <div className="mb-10 animate-on-scroll is-visible">
                <button 
                  onClick={() => setSelectedExamId(null)}
                  className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                >
                  <i className="fa-solid fa-arrow-left"></i> Back to Exams
                </button>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 rounded-full" style={{"background":"linear-gradient(180deg,#6366f1,#818cf8)"}}></div>
                    <div><h3 className="text-lg font-heading font-bold text-white">{selectedExam?.name}</h3><p className="text-xs text-slate-500">{selectedExam?.subjects?.length || 0} Subjects</p></div>
                  </div>
                </div>
                {groupedSubjects.length > 1 ? (
                  groupedSubjects.map(([groupName, subjects], groupIndex) => (
                    <div key={groupName} className={groupIndex > 0 ? 'mt-10' : ''}>
                      <div className="mb-4 flex items-center gap-3">
                        <div className="w-1.5 h-8 rounded-full bg-brand-400" />
                        <h3 className="text-xl font-heading font-bold text-white">{groupName}</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {subjects.map((subject: any, idx: number) => {
                          const colors = [
                            { bg: 'rgba(129,140,248,0.15)', text: '#818cf8', border: 'rgba(129,140,248,0.3)' },
                            { bg: 'rgba(16,185,129,0.15)', text: '#10b981', border: 'rgba(16,185,129,0.3)' },
                            { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
                            { bg: 'rgba(139,92,246,0.15)', text: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
                            { bg: 'rgba(56,189,248,0.15)', text: '#38bdf8', border: 'rgba(56,189,248,0.3)' }
                          ];
                          const c = colors[idx % colors.length];
                          return (
                            <Link href={`/topics?subjectId=${subject.id}&examName=${encodeURIComponent(selectedExam.name)}&subjectName=${encodeURIComponent(subject.name)}`} key={subject.id} className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                              style={{background:'linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))', border:`1px solid ${c.bg}`}}>
                              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110" style={{background:`linear-gradient(135deg, ${c.bg}, rgba(0,0,0,0.1))`, border: `1px solid ${c.border}`, color: c.text}}>
                                <i className={`fa-solid ${subject.icon || 'fa-book'}`}></i>
                              </div>
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-bold text-white text-sm leading-tight group-hover:transition-colors transition-colors">{subject.name}</h4>
                              </div>
                              <p className="text-[11px] text-slate-500 mb-3">{subject.topics?.length || 0} Chapters</p>
                              <div className="w-full rounded-full h-1.5 mb-2 overflow-hidden" style={{background:'rgba(255,255,255,0.05)'}}>
                                <div className="h-1.5 rounded-full transition-all duration-1000" style={{width: '0%'}}></div>
                              </div>
                              <div className="flex justify-between items-center text-[11px]">
                                <span className="text-slate-500">Not Started</span>
                                <span className="font-bold transition-colors" style={{color: c.text}}>View Topics ▶</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedExam?.subjects?.map((subject: any, idx: number) => {
                      const colors = [
                        { bg: 'rgba(129,140,248,0.15)', text: '#818cf8', border: 'rgba(129,140,248,0.3)' },
                        { bg: 'rgba(16,185,129,0.15)', text: '#10b981', border: 'rgba(16,185,129,0.3)' },
                        { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
                        { bg: 'rgba(139,92,246,0.15)', text: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
                        { bg: 'rgba(56,189,248,0.15)', text: '#38bdf8', border: 'rgba(56,189,248,0.3)' }
                      ];
                      const c = colors[idx % colors.length];
                      return (
                        <Link href={`/topics?subjectId=${subject.id}&examName=${encodeURIComponent(selectedExam.name)}&subjectName=${encodeURIComponent(subject.name)}`} key={subject.id} className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                          style={{background:'linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))', border:`1px solid ${c.bg}`}}>
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110" style={{background:`linear-gradient(135deg, ${c.bg}, rgba(0,0,0,0.1))`, border: `1px solid ${c.border}`, color: c.text}}>
                            <i className={`fa-solid ${subject.icon || 'fa-book'}`}></i>
                          </div>
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-white text-sm leading-tight group-hover:transition-colors transition-colors">{subject.name}</h4>
                          </div>
                          <p className="text-[11px] text-slate-500 mb-3">{subject.topics?.length || 0} Chapters</p>
                          <div className="w-full rounded-full h-1.5 mb-2 overflow-hidden" style={{background:'rgba(255,255,255,0.05)'}}>
                            <div className="h-1.5 rounded-full transition-all duration-1000" style={{width: '0%'}}></div>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-500">Not Started</span>
                            <span className="font-bold transition-colors" style={{color: c.text}}>View Topics ▶</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
