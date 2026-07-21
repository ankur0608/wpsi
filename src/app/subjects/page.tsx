"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { subjectMeta, defaultMeta } from '@/lib/subjectMeta';
import { useUser } from '@/context/UserContext';

function SubjectsContent() {
  const searchParams = useSearchParams();
  const examId = searchParams.get('examId');
  const examName = searchParams.get('examName') || 'Loading...';

  const router = useRouter();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ testsTaken: 0, avgScore: 0 });
  const { user } = useUser();
  
  const [comingSoonModalOpen, setComingSoonModalOpen] = useState(false);
  const [lockedModalOpen, setLockedModalOpen] = useState(false);
  const [selectedSubjectName, setSelectedSubjectName] = useState("");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (user?.id) {
      fetch('/api/user/dashboard-stats')
        .then(res => res.json())
        .then(json => {
          if (json.data) {
            setStats({
              testsTaken: json.data.mockTestsAttempted || 0,
              avgScore: Math.round(json.data.averageAccuracy || 0)
            });
          }
        })
        .catch(err => console.error(err));
    }
  }, [user?.id]);

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
    if (s.part) {
        if (s.part === "A" || s.part === "Part A" || s.part.includes("Part A")) return "Part A";
        if (s.part === "B" || s.part === "Part B" || s.part.includes("Part B")) return "Part B";
    }
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

    const isFreePlan = !user?.planType || user.planType === 'free';
    const isSubjectUnlocked = subject.isFree || !isFreePlan;

    const handleClick = (e: React.MouseEvent) => {
      if (subject.isComingSoon) {
        e.preventDefault();
        setSelectedSubjectName(subject.name);
        setComingSoonModalOpen(true);
      } else if (!isSubjectUnlocked) {
        e.preventDefault();
        setSelectedSubjectName(subject.name);
        setLockedModalOpen(true);
      }
    };

    const handleShareSubject = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const subjectUrl = `${window.location.origin}/topics?subjectId=${subject.id}&subjectName=${encodeURIComponent(subject.name)}&examName=${encodeURIComponent(examName)}`;
      const shareData = {
        title: `${subject.name} - ${examName} | WPSI Pro`,
        text: `Check out the ${subject.name} subject for ${examName} on WPSI Pro!`,
        url: subjectUrl,
      };
      
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(subjectUrl);
          showToast('Link copied to clipboard!', 'success');
        }
      } catch (err) {
        console.log('Error sharing:', err);
      }
    };

    return (
      <Link 
        href={`/topics?subjectId=${subject.id}&subjectName=${encodeURIComponent(subject.name)}&examName=${encodeURIComponent(examName)}`}
        onClick={handleClick}
        className="glass-card p-5 group hover:shadow-lg transition-all flex flex-col cursor-pointer transform hover:-translate-y-1.5 duration-300 border border-dark-200 bg-white relative overflow-hidden"
      >
        {subject.isComingSoon && (
          <div className="absolute top-2 right-2 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
            Coming Soon
          </div>
        )}
        {!subject.isComingSoon && !isSubjectUnlocked && (
          <div className="absolute top-2 right-2 text-dark-400 z-10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
        )}
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

        <div className="flex items-center justify-between pt-3 border-t border-dark-50 mt-1">
            <span className="text-[10px] text-dark-400 font-bold uppercase">Ready</span>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleShareSubject}
                className={`flex items-center gap-1.5 text-[10px] font-bold text-dark-500 hover:${textThemeColor} bg-dark-50/80 hover:bg-white border border-dark-100 hover:border-dark-200 hover:shadow-sm px-2.5 py-1.5 rounded-lg transition-all active:scale-95 group/share`}
                title="Share Subject"
              >
                <i className="fa-solid fa-share-nodes text-[12px] group-hover/share:-translate-y-0.5 transition-transform"></i>
                SHARE
              </button>
              
              <span className={`text-[11px] font-bold ${textThemeColor} flex items-center gap-1 group-hover:translate-x-1 transition-transform`}>
                  View Topics 
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
              </span>
            </div>
        </div>
      </Link>
    );
  };

  const handleShareCurriculum = async () => {
    const shareData = {
      title: `${examName} Curriculum - WPSI Pro`,
      text: `Check out the complete curriculum for ${examName} on WPSI Pro!`,
      url: window.location.href,
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!', 'success');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 h-full overflow-y-auto">
      <div className="p-6 lg:p-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => router.push('/exam')}
            className="inline-flex items-center text-sm font-semibold text-dark-400 hover:text-dark-800 transition-colors"
          >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Back to Exams
          </button>
          
          <button 
            onClick={handleShareCurriculum}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-sm font-bold text-dark-700 shadow-sm border border-dark-200 hover:border-primary-300 hover:text-primary-600 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            Share Curriculum
          </button>
        </div>

        {/* Main Banner */}
        <div className="bg-primary-50 rounded-3xl p-8 mb-8 relative overflow-hidden border border-primary-100">
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-primary-100 rounded-l-full blur-3xl opacity-50"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z"/></svg>
                </div>
                <div className="flex-1">
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
                        <p className="font-bold text-dark-900 text-xl leading-none">{stats.testsTaken}</p>
                        <p className="text-[9px] text-dark-400 uppercase tracking-widest font-semibold mt-1">Tests Taken</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-primary-100" style={{ backgroundColor: '#faf5ff' }}>
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 text-xl">📈</div>
                    <div>
                        <p className="font-bold text-dark-900 text-xl leading-none">{stats.avgScore}%</p>
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

      {/* Coming Soon Modal */}
      {comingSoonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-center text-dark-900 mb-2">Coming Soon</h3>
            <p className="text-center text-dark-500 mb-6 text-sm">
              We are working hard to bring you the best content for <span className="font-bold text-dark-700">{selectedSubjectName}</span>. Stay tuned!
            </p>
            <button 
              onClick={() => setComingSoonModalOpen(false)}
              className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Locked Subject Modal */}
      {lockedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-center text-dark-900 mb-2">Premium Subject</h3>
            <p className="text-center text-dark-500 mb-6 text-sm">
              <span className="font-bold text-dark-700">{selectedSubjectName}</span> is a premium subject. Please upgrade your plan to access this content.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setLockedModalOpen(false)}
                className="flex-1 py-2.5 bg-dark-100 hover:bg-dark-200 text-dark-700 rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setLockedModalOpen(false);
                  router.push('/pricing');
                }}
                className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-colors"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed top-20 right-6 z-[10030] animate-in slide-in-from-top-4 fade-in duration-300 shadow-xl">
          <div className="flex items-center gap-3 rounded-full bg-dark-900/95 backdrop-blur-md pl-2 pr-4 py-2 border border-dark-700/50">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-inner ${toast.type === 'success' ? 'bg-emerald-500 text-white' : toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-primary-500 text-white'}`}>
              <i className={`fa-solid ${toast.type === 'success' ? 'fa-check' : toast.type === 'error' ? 'fa-xmark' : 'fa-info'}`}></i>
            </div>
            <p className="text-sm font-bold text-white whitespace-nowrap">{toast.message}</p>
          </div>
        </div>
      )}

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
