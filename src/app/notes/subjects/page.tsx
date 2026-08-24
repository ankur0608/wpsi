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

  const hasContent = (s: any) => (s.notesCount > 0);

  const partA = subjects.filter(s => getPart(s) === "Part A" && hasContent(s)).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const partB = subjects.filter(s => getPart(s) === "Part B" && hasContent(s)).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const otherSubjects = subjects.filter(s => getPart(s) !== "Part A" && getPart(s) !== "Part B" && hasContent(s)).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const totalTopics = subjects.reduce((sum, s) => sum + (s.topics?.length || 0), 0);

  const SubjectCard = ({ subject }: { subject: any }) => {
    const meta = subjectMeta[subject.name] || defaultMeta;
    const finalPart = getPart(subject);
    const totalChapters = subject.notesCount || 0;

    const handleShareSubject = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const subjectUrl = `${window.location.origin}/notes/view?subjectId=${subject.id}&subjectName=${encodeURIComponent(subject.name)}&examName=${encodeURIComponent(examName)}`;
      const shareData = {
        title: `${subject.name} Notes - ${examName} | MCQPrepZone`,
        text: `📚 View ${subject.name} notes for ${examName} on MCQPrepZone!\n\nCheck out the notes and start your preparation today 👇\n`,
        url: subjectUrl,
      };
      
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}${shareData.url}`);
          showToast('Share text and link copied to clipboard!', 'success');
        }
      } catch (err) {
        console.log('Error sharing:', err);
      }
    };

    return (
      <Link 
        href={`/notes/view?subjectId=${subject.id}&subjectName=${encodeURIComponent(subject.name)}&examName=${encodeURIComponent(examName)}`}
        className="group flex flex-col sm:flex-row sm:items-center gap-5 bg-white rounded-3xl p-5 border border-dark-100 hover:border-dark-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
      >
        <button 
          onClick={handleShareSubject}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-dark-300 hover:text-dark-700 transition-colors p-2 rounded-full hover:bg-dark-50 z-10"
          title="Share Subject Notes"
        >
          <i className="fa-solid fa-share-nodes"></i>
        </button>

        <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-tr ${meta.gradient} flex items-center justify-center text-white text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          {meta.icon}
        </div>
        
        <div className="flex-1 min-w-0 pr-8">
          <h4 className="font-display font-bold text-lg text-dark-900 mb-1.5 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {subject.name}
          </h4>
          <p className="text-dark-500 text-sm font-medium flex items-center gap-2">
            <i className="fa-regular fa-file-lines opacity-70"></i>
            {totalChapters} {totalChapters === 1 ? 'Chapter' : 'Chapters'}
          </p>
        </div>
        
        <div className="hidden sm:flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-dark-50 text-dark-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
          <i className="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform duration-300"></i>
        </div>
      </Link>
    );
  };

  const handleShareCurriculum = async () => {
    const shareData = {
      title: `${examName} Curriculum - Exam Pro`,
      text: `Check out the complete curriculum for ${examName} on Exam Pro!`,
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
            onClick={() => router.push('/notes')}
            className="inline-flex items-center text-sm font-semibold text-dark-400 hover:text-dark-800 transition-colors"
          >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Back to Notes
          </button>
          
          <button 
            onClick={handleShareCurriculum}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-sm font-bold text-dark-700 shadow-sm border border-dark-200 hover:border-primary-300 hover:text-primary-600 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            Share Curriculum
          </button>
        </div>

        {/* Main Banner Removed */}
        
        {loading ? (
          <div className="text-center text-dark-400 py-10"><i className="fa-solid fa-circle-notch fa-spin text-2xl mb-3"></i><p>Loading subjects...</p></div>
        ) : subjects.length === 0 ? (
          <div className="text-center text-dark-400 py-10">No subjects found for this exam.</div>
        ) : partA.length === 0 && partB.length === 0 && otherSubjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white rounded-3xl border border-dark-100 shadow-sm mt-8">
            <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center text-primary-500 mb-6 shadow-inner">
              <i className="fa-regular fa-folder-open text-4xl"></i>
            </div>
            <h3 className="font-display font-bold text-2xl text-dark-900 mb-2">No Notes Available Yet</h3>
            <p className="text-dark-500 max-w-md mx-auto mb-8 leading-relaxed">
              We are currently preparing high-quality study notes for <span className="font-bold text-dark-700">{examName}</span>. Please check back later as we add new content!
            </p>
            <button 
              onClick={() => router.push('/notes')}
              className="px-6 py-3 bg-dark-900 hover:bg-dark-800 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-left text-sm"></i> Explore Other Exams
            </button>
          </div>
        ) : (
          <>
            {partA.length > 0 && (
              <>
                {/* Part A Section */}
                <div className="flex items-center mb-6 mt-10">
                    <div className="w-1.5 h-6 bg-primary-600 rounded-full mr-3"></div>
                    <h3 className="font-display font-bold text-xl text-dark-900">Part A: General & Aptitude</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
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

      {/* Locked Subject Modal removed as free users can now navigate to try the first topic */}

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
