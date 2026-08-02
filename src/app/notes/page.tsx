"use client";

import React, { useEffect, useState } from "react";
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
  notesCount?: number;
}

interface Exam {
  id: string;
  name: string;
  description?: string;
  subjects: Subject[];
}

export default function ExamPage() {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          Available Notes <span className="text-xs text-dark-400 font-normal ml-2 block sm:inline">Select an exam to view its notes</span>
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
            const subjectCount = exam.subjects.length;
            const notesCount = exam.subjects.reduce((sum, subject) => sum + (subject.notesCount || 0), 0);

            return (
              <Link key={exam.id} href={`/notes/subjects?examId=${exam.id}&examName=${encodeURIComponent(exam.name)}`} className="group flex flex-col bg-white rounded-3xl p-6 border border-dark-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 transform hover:-translate-y-1.5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                
                <div className="flex items-start justify-between mb-6 z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  </div>
                  <span className="bg-success-50 text-success-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-success-100 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-success-500 rounded-full animate-pulse"></span> Active
                  </span>
                </div>
                
                <h4 className="font-display font-bold text-dark-900 text-xl mb-6 group-hover:text-primary-600 transition-colors z-10">
                  {exam.name}
                </h4>
                
                <div className="flex items-center gap-6 mb-8 z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-50 flex items-center justify-center text-dark-400 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-dark-100">
                      <i className="fa-solid fa-layer-group text-sm"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-dark-400 uppercase tracking-wider leading-none mb-1">Subjects</p>
                      <p className="font-bold text-dark-800 text-base leading-none">{subjectCount}</p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-dark-100"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 group-hover:bg-primary-100 transition-all">
                      <i className="fa-regular fa-file-lines text-sm"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-dark-400 uppercase tracking-wider leading-none mb-1">Notes</p>
                      <p className="font-bold text-dark-800 text-base leading-none">{notesCount}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto w-full bg-dark-50 text-dark-600 font-bold text-center py-3.5 rounded-xl text-sm transition-all group-hover:bg-primary-600 group-hover:text-white flex items-center justify-center gap-2 group-hover:shadow-lg shadow-primary-500/25 z-10">
                  View Notes <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                </div>
              </Link>
            );
          })}


        </div>
      )}
    </div>
  );
}
