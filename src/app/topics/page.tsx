"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function TopicsContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subjectId');
  const examName = searchParams.get('examName') || 'WPSIPro Syllabus';
  const subjectName = searchParams.get('subjectName') || 'Loading...';

  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
                topics.map((topic, idx) => (
                  <Link href={`/practice?subject=${encodeURIComponent(subjectName)}&topic=${encodeURIComponent(topic.name)}`} key={topic.id} className="group flex items-center justify-between p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{"background":"rgba(22,36,54,0.6)","border":"1px solid rgba(255,255,255,0.05)"}}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm" style={{"background":"rgba(255,255,255,0.03)","color":"rgba(255,255,255,0.3)"}}>
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm group-hover:text-brand-400 transition-colors">{topic.name}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{"background":"rgba(255,255,255,0.05)"}}>
                        <i className="fa-solid fa-chevron-right text-xs text-slate-500 group-hover:text-brand-400 transition-colors"></i>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
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
