"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { subjectMeta, defaultMeta } from '@/lib/subjectMeta';

function SubjectsContent() {
  const searchParams = useSearchParams();
  const examId = searchParams.get('examId');
  const examName = searchParams.get('examName') || 'Loading...';

  const router = useRouter();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!examId) {
      setLoading(false);
      return;
    }

    fetch('/api/syllabus')
      .then(res => res.json())
      .then(json => {
        if (json.data) {
          const foundExam = json.data.find((e: any) => e.id === examId);
          if (foundExam && foundExam.subjects) {
            setSubjects(foundExam.subjects);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch subjects', err);
        setLoading(false);
      });
  }, [examId]);

  const getPart = (s: any) => {
    const metaPart = subjectMeta[s.name]?.part;
    if (metaPart) return metaPart;
    if (s.part && s.part.includes("Part A")) return "Part A";
    if (s.part && s.part.includes("Part B")) return "Part B";
    return s.part || "";
  };

  const partA = subjects.filter(s => getPart(s) === "Part A").sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const partB = subjects.filter(s => getPart(s) === "Part B").sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const otherSubjects = subjects.filter(s => getPart(s) !== "Part A" && getPart(s) !== "Part B").sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const totalTopics = subjects.reduce((sum, s) => sum + (s.topics?.length || 0), 0);

  const SubjectCard = ({ subject }: { subject: any }) => {
    const meta = subjectMeta[subject.name] || defaultMeta;
    const finalPart = getPart(subject);
    const totalChapters = subject.topics?.length || 0;
    const totalQuestions = subject.topics?.reduce((sum: number, t: any) => sum + (t.mcqCount || 0), 0) || 0;
    const textThemeColor = finalPart === "Part A" ? "text-primary-600" : finalPart === "Part B" ? "text-accent-600" : "text-dark-600";
    const hoverTextColor = finalPart === "Part A" ? "group-hover:text-primary-600" : finalPart === "Part B" ? "group-hover:text-accent-600" : "group-hover:text-dark-600";
    const progressGradient = finalPart === "Part A" ? "from-primary-500 to-primary-600" : finalPart === "Part B" ? "from-accent-500 to-orange-500" : "from-dark-500 to-dark-600";

    return (
      <Link 
        href={`/topics?subjectId=${subject.id}&subjectName=${encodeURIComponent(subject.name)}&examName=${encodeURIComponent(examName)}`}
        className="glass-card p-5 group hover:shadow-lg transition-all flex flex-col cursor-pointer transform hover:-translate-y-1.5 duration-300 border border-dark-200 bg-white"
      >
        <div className={`w-12 h-12 bg-gradient-to-tr ${meta.gradient} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-md shadow-dark-500/10`}>
            {meta.icon}
        </div>
        <h4 className={`font-bold text-dark-900 text-sm mb-1 line-clamp-2 min-h-[40px] ${hoverTextColor} transition-colors`}>
            {subject.name}
        </h4>
        <p className="text-[11px] text-dark-400 mb-4">{totalChapters} Chapters • {totalQuestions >= 1000 ? `${(totalQuestions / 1000).toFixed(1)}k+` : totalQuestions} MCQs</p>
        
        {/* Simulated Progress Bar */}
        <div className="mb-4 mt-auto">
            <div className="flex justify-between items-center text-[9px] text-dark-500 font-bold uppercase tracking-wider mb-1">
                <span>Progress</span>
                <span className={`${textThemeColor} font-extrabold`}>{meta.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-dark-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${progressGradient} rounded-full`} style={{ width: `${meta.progress}%` }}></div>
            </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-dark-50">
            <span className="text-[10px] text-dark-400 font-bold uppercase">Ready</span>
            <span className={`text-[11px] font-bold ${textThemeColor} flex items-center gap-1 group-hover:translate-x-1 transition-transform`}>
                View Topics 
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
            </span>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 h-full overflow-y-auto">
      <div className="p-6 lg:p-10 max-w-6xl mx-auto">
        <button 
          onClick={() => router.push('/exam')}
          className="inline-flex items-center text-sm font-semibold text-dark-400 hover:text-dark-800 transition-colors mb-6"
        >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Back to Exams
        </button>

        {/* Main Banner */}
        <div className="bg-primary-50 rounded-3xl p-8 mb-8 relative overflow-hidden border border-primary-100">
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-primary-100 rounded-l-full blur-3xl opacity-50"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z"/></svg>
                </div>
                <div>
                    <p className="text-[11px] text-accent-500 font-bold uppercase tracking-widest mb-1.5">{examName}</p>
                    <h2 className="font-display text-4xl font-bold text-dark-900 mb-2">Complete Curriculum</h2>
                    <p className="text-sm text-dark-400">Everything you need to crack the exam.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative z-10">
                <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-primary-100">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 text-xl">📚</div>
                    <div>
                        <p className="font-bold text-dark-900 text-xl leading-none">{loading ? '-' : subjects.length}</p>
                        <p className="text-[9px] text-dark-400 uppercase tracking-widest font-semibold mt-1">Subjects</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-success-100" style={{ backgroundColor: '#f0fdf4' }}>
                    <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center text-success-600 text-xl">📑</div>
                    <div>
                        <p className="font-bold text-dark-900 text-xl leading-none">{loading ? '-' : totalTopics}</p>
                        <p className="text-[9px] text-dark-400 uppercase tracking-widest font-semibold mt-1">Topics</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-accent-100" style={{ backgroundColor: '#fffbeb' }}>
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center text-accent-600 text-xl">🏆</div>
                    <div>
                        <p className="font-bold text-dark-900 text-xl leading-none">7</p>
                        <p className="text-[9px] text-dark-400 uppercase tracking-widest font-semibold mt-1">Tests Taken</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-primary-100" style={{ backgroundColor: '#faf5ff' }}>
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 text-xl">📈</div>
                    <div>
                        <p className="font-bold text-dark-900 text-xl leading-none">30%</p>
                        <p className="text-[9px] text-dark-400 uppercase tracking-widest font-semibold mt-1">Avg Score</p>
                    </div>
                </div>
            </div>
        </div>
        
        {loading ? (
          <div className="text-center text-dark-400 py-10"><i className="fa-solid fa-circle-notch fa-spin text-2xl mb-3"></i><p>Loading subjects...</p></div>
        ) : subjects.length === 0 ? (
          <div className="text-center text-dark-400 py-10">No subjects found for this exam.</div>
        ) : (
          <>
            {partA.length > 0 && (
              <>
                {/* Part A Section */}
                <div className="flex items-center mb-6 mt-10">
                    <div className="w-1.5 h-6 bg-primary-600 rounded-full mr-3"></div>
                    <h3 className="font-display font-bold text-xl text-dark-900">Part A: General & Aptitude</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                    {partA.map(subject => <SubjectCard key={subject.id} subject={subject} />)}
                </div>
              </>
            )}

            {partB.length > 0 && (
              <>
                {/* Part B Section */}
                <div className="flex items-center mb-6 mt-10">
                    <div className="w-1.5 h-6 bg-accent-500 rounded-full mr-3"></div>
                    <h3 className="font-display font-bold text-xl text-dark-900">Part B: Technical Stream</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                    {partB.map(subject => <SubjectCard key={subject.id} subject={subject} />)}
                </div>
              </>
            )}

            {otherSubjects.length > 0 && (
              <>
                {/* Other Subjects Section */}
                <div className="flex items-center mb-6 mt-10">
                    <div className="w-1.5 h-6 bg-dark-500 rounded-full mr-3"></div>
                    <h3 className="font-display font-bold text-xl text-dark-900">Additional Subjects</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                    {otherSubjects.map(subject => <SubjectCard key={subject.id} subject={subject} />)}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function SubjectsPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center"><i className="fa-solid fa-circle-notch fa-spin text-2xl"></i></div>}>
      <SubjectsContent />
    </Suspense>
  );
}
