"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Topic {
  id: string;
  name: string;
  mcqCount?: number;
}

interface Subject {
  id: string;
  name: string;
  icon?: string;
  topics: Topic[];
}

interface Exam {
  id: string;
  name: string;
  description?: string;
  isComingSoon?: boolean;
  subjects: Subject[];
}

export default function ExamPage() {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comingSoonExam, setComingSoonExam] = useState<Exam | null>(null);

  const fetchExams = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/syllabus");
      if (!res.ok) throw new Error("Failed to load exams.");
      const json = await res.json();
      setExams(json.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch exams. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">

      
      <div className="flex items-center mb-6">
        <div className="w-1.5 h-6 bg-primary-600 rounded-full mr-3"></div>
        <h3 className="font-display font-bold text-xl text-dark-900">
          Available Exams <span className="text-xs text-dark-400 font-normal ml-2 block sm:inline">Select an exam series to begin</span>
        </h3>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 flex flex-col justify-between min-h-[300px] bg-white rounded-2xl border-2 border-dark-100 animate-pulse">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-dark-200 rounded-2xl"></div>
                  <div className="w-20 h-6 bg-dark-200 rounded-full"></div>
                </div>
                <div className="w-3/4 h-6 bg-dark-200 rounded-lg mb-4"></div>
                <div className="w-full h-4 bg-dark-100 rounded mb-2"></div>
                <div className="w-5/6 h-4 bg-dark-100 rounded mb-6"></div>
              </div>
              <div>
                <div className="grid grid-cols-3 gap-2 mb-6 border-t border-dark-100 pt-4">
                  <div className="w-full h-10 bg-dark-100 rounded"></div>
                  <div className="w-full h-10 bg-dark-100 rounded border-x border-dark-100"></div>
                  <div className="w-full h-10 bg-dark-100 rounded"></div>
                </div>
                <div className="w-full h-10 bg-dark-200 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <svg className="w-12 h-12 mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h4 className="font-bold text-lg mb-2">Oops! Something went wrong.</h4>
          <p className="text-sm mb-4">{error}</p>
          <button onClick={fetchExams} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors">Retry</button>
        </div>
      )}

      {!loading && !error && exams.length === 0 && (
        <div className="text-center py-12 bg-dark-50 rounded-2xl border border-dark-100">
          <p className="text-dark-500 font-medium">No exams found. Check back soon!</p>
        </div>
      )}

      {!loading && !error && exams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {exams.map((exam) => {
            const subjectCount = exam.subjects?.length || 0;
            const topicCount = exam.subjects?.reduce((sum, subject) => sum + (subject.topics?.length || 0), 0) || 0;
            const mcqCount = exam.subjects?.reduce((sum, subject) => {
              return sum + (subject.topics?.reduce((tSum, topic) => tSum + (topic.mcqCount || 0), 0) || 0);
            }, 0) || 0;

            const isComingSoon = exam.isComingSoon;
            const CardWrapper = isComingSoon ? 'div' : Link;
            const wrapperProps = isComingSoon 
              ? { onClick: () => setComingSoonExam(exam), role: "button", tabIndex: 0 } 
              : { href: `/subjects?examId=${exam.id}&examName=${encodeURIComponent(exam.name)}` };

            return (
              <CardWrapper key={exam.id} {...wrapperProps as any} className={`glass-card group cursor-pointer relative overflow-hidden border-2 transition-all duration-300 transform p-6 flex flex-col justify-between min-h-[300px] rounded-2xl ${isComingSoon ? 'border-dark-200 hover:border-dark-300 hover:shadow-md bg-dark-50 opacity-90' : 'border-primary-100 hover:border-primary-400 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 bg-gradient-to-br from-white via-white to-primary-50/20 bg-white'}`}>
                {!isComingSoon && <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-300"></div>}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform ${isComingSoon ? 'bg-dark-200 text-dark-500' : 'bg-gradient-to-tr from-primary-500 to-primary-600 text-white shadow-primary-500/20 group-hover:scale-110'}`}>
                      {isComingSoon ? (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      ) : (
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                      )}
                    </div>
                    {isComingSoon ? (
                      <span className="bg-dark-200 text-dark-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-dark-300">
                        Coming Soon
                      </span>
                    ) : (
                      <span className="bg-success-100 text-success-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 border border-success-200">
                        <span className="w-1.5 h-1.5 bg-success-500 rounded-full animate-pulse"></span> Active
                      </span>
                    )}
                  </div>
                  <h4 className={`font-display font-bold text-lg mb-2 transition-colors ${isComingSoon ? 'text-dark-700' : 'text-dark-900 group-hover:text-primary-600'}`}>{exam.name}</h4>
                  <p className="text-xs text-dark-500 leading-relaxed mb-6 line-clamp-3">{exam.description || "Comprehensive test preparation series for government and technical exams."}</p>
                </div>
                <div>
                  <div className="grid grid-cols-3 gap-2 mb-6 border-t border-dark-100 pt-4">
                    <div className="text-center">
                      <p className="font-bold text-dark-800 text-base leading-none">{subjectCount}</p>
                      <p className="text-[9px] text-dark-400 font-bold uppercase tracking-wider mt-1">Subjects</p>
                    </div>
                    <div className="text-center border-x border-dark-100">
                      <p className="font-bold text-dark-800 text-base leading-none">{topicCount}</p>
                      <p className="text-[9px] text-dark-400 font-bold uppercase tracking-wider mt-1">Topics</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-dark-800 text-base leading-none">
                        {mcqCount >= 1000 ? `${(mcqCount / 1000).toFixed(1)}k+` : mcqCount}
                      </p>
                      <p className="text-[9px] text-dark-400 font-bold uppercase tracking-wider mt-1">MCQs</p>
                    </div>
                  </div>
                  {isComingSoon ? (
                    <div className="w-full bg-dark-200 text-dark-600 font-bold text-center py-3 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2">
                      Notify Me
                    </div>
                  ) : (
                    <div className="w-full bg-primary-600 text-white font-bold text-center py-3 rounded-xl text-xs transition-all shadow-md group-hover:bg-primary-700 group-hover:shadow-lg shadow-primary-500/10 flex items-center justify-center gap-2">
                      Prepare Now <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                  )}
                </div>
              </CardWrapper>
            );
          })}


        </div>
      )}

      {/* ── COMING SOON MODAL ── */}
      {comingSoonExam && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 bg-dark-900/60 backdrop-blur-sm">
          <div className="bg-white border border-dark-200 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200 text-center">
            <button 
              onClick={() => setComingSoonExam(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-dark-50 text-dark-500 hover:text-dark-900 hover:bg-dark-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="w-20 h-20 bg-dark-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-dark-100 relative shadow-inner">
               <svg className="w-10 h-10 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
               </div>
            </div>
            <h2 className="font-display text-2xl font-bold text-dark-900 mb-2">{comingSoonExam.name}</h2>
            <p className="text-sm text-dark-500 mb-6">We are currently preparing the best study materials and mock tests for this exam. It will be available soon!</p>
            <button 
              onClick={() => setComingSoonExam(null)}
              className="w-full py-3.5 bg-dark-800 hover:bg-dark-900 text-white font-bold rounded-xl shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-dark-200"
            >
              Got it, thanks
            </button>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
