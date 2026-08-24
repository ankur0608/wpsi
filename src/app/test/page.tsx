"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function Test() {
  const { user } = useUser();
  const [mockTests, setMockTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [planFilter, setPlanFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [testType, setTestType] = useState('all');
  const [examFilter, setExamFilter] = useState('all');
  const [exams, setExams] = useState<any[]>([]);

  const uniqueTestTypes = Array.from(new Set(mockTests.map(test => test.testType || 'Mix')));

  const filteredTests = mockTests.filter(test => {
    const matchPlan = planFilter === 'all' || (test.planType && test.planType.toLowerCase() === planFilter.toLowerCase());
    const matchType = testType === 'all' || ((test.testType || 'Mix').toLowerCase() === testType.toLowerCase());
    const matchExam = examFilter === 'all' || test.examId === examFilter;
    return matchPlan && matchType && matchExam;
  });

  useEffect(() => {
    const fetchMockTests = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (searchTerm.trim()) queryParams.append('q', searchTerm.trim());
        const res = await fetch(`/api/mock-tests?${queryParams.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setMockTests(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching mock tests:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchMockTests();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    fetch('/api/exams')
      .then(res => res.json())
      .then(json => {
        if (json.data) setExams(json.data);
      })
      .catch(err => console.error("Failed to fetch exams:", err));
  }, []);

  useEffect(() => {
    // Basic Intersection Observer for Scroll Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
      const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('is-visible');
                  obs.unobserve(entry.target);
              }
          });
      }, { threshold: 0.1 });
      animatedElements.forEach(el => observer.observe(el));
    }
  }, []);

  return (
    <div className="bg-white w-full font-sans text-dark-800">
      <div className="p-6 lg:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
            <div>
                <h2 className="font-display text-2xl font-bold text-dark-900 mb-1">Available Mock Tests</h2>
                <p className="text-dark-500 text-sm">Challenge yourself with exam-simulated environments and boost your preparation.</p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto items-center">
                <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search mock tests..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white border border-dark-200 text-dark-700 pl-10 pr-3 py-2 rounded-xl text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                    />
                </div>
                <select 
                  value={planFilter} 
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="bg-white border border-dark-200 text-dark-700 px-3 py-2 rounded-xl text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors cursor-pointer appearance-none outline-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7rem top 50%', backgroundSize: '.65rem auto', paddingRight: '2.5rem' }}
                >
                  <option value="all">All Plans</option>
                  <option value="free">Free Tests</option>
                  <option value="pro">Pro Tests</option>
                  <option value="elite">Elite Tests</option>
                </select>
            </div>
        </div>

        {/* Test Type & Exam Filter Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-end mb-8 gap-4">
            <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm text-dark-500 font-medium">Exam:</span>
                <select 
                  value={examFilter} 
                  onChange={(e) => setExamFilter(e.target.value)}
                  className="bg-white border border-dark-100 text-dark-800 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors cursor-pointer appearance-none outline-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .5rem top 50%', backgroundSize: '.65rem auto', paddingRight: '2rem' }}
                >
                  <option value="all">All Exams</option>
                  {exams.map(exam => (
                    <option key={exam.id} value={exam.id}>{exam.name}</option>
                  ))}
                </select>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm text-dark-500 font-medium">Test Type:</span>
                <select 
                  value={testType} 
                  onChange={(e) => setTestType(e.target.value)}
                  className="bg-white border border-dark-100 text-dark-800 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors cursor-pointer appearance-none outline-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .5rem top 50%', backgroundSize: '.65rem auto', paddingRight: '2rem' }}
                >
                  <option value="all">All Types</option>
                  {uniqueTestTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
            </div>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl p-6 border border-dark-100 flex flex-col h-[280px] bg-white shadow-sm animate-pulse">
                <div className="flex items-center justify-between mb-5">
                    <div className="h-6 w-20 bg-dark-100 rounded-full"></div>
                    <div className="h-4 w-16 bg-dark-100 rounded"></div>
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 bg-dark-100 rounded-xl shrink-0"></div>
                  <div className="w-full">
                    <div className="h-5 w-3/4 bg-dark-100 rounded mb-2"></div>
                    <div className="h-4 w-full bg-dark-100 rounded mb-1 flex-1"></div>
                    <div className="h-4 w-2/3 bg-dark-100 rounded flex-1"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-dark-100 pt-4 mt-auto">
                    <div className="h-3 w-24 bg-dark-100 rounded"></div>
                    <div className="h-9 w-24 bg-dark-100 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : mockTests.length === 0 ? (
          <div className="text-center py-12 text-dark-500 mb-10">No mock tests available at the moment. Check back later!</div>
        ) : filteredTests.length === 0 ? (
          <div className="text-center py-12 text-dark-500 mb-10">No mock tests found matching your filters.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredTests.map((test, index) => {
              const userPlan = user?.planType?.toLowerCase() || 'free';
              const testPlan = test.planType?.toLowerCase() || 'free';
              
              let isLocked = false;
              if (userPlan.includes('elite')) {
                  isLocked = false;
              } else if (userPlan.includes('pro')) {
                  isLocked = testPlan === 'elite';
              } else {
                  isLocked = testPlan !== 'free';
              }

              // Styling based on test plan
              let theme = {
                  border: 'border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-500/10',
                  badge: 'text-emerald-700 bg-emerald-50',
                  badgeIcon: <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>,
                  badgeText: 'FREE',
                  iconBg: 'bg-emerald-500',
                  iconText: 'text-white',
                  btn: 'bg-emerald-500 hover:bg-emerald-600 text-white',
              };

              if (testPlan === 'pro') {
                  theme = {
                      border: 'border-blue-100 hover:border-blue-300 hover:shadow-blue-500/10',
                      badge: 'text-blue-700 bg-blue-50',
                      badgeIcon: <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>,
                      badgeText: 'PRO',
                      iconBg: 'bg-blue-600',
                      iconText: 'text-white',
                      btn: 'bg-blue-600 hover:bg-blue-700 text-white',
                  };
              } else if (testPlan === 'elite') {
                  theme = {
                      border: 'border-orange-200 bg-orange-50/30 hover:border-orange-300 hover:shadow-orange-500/10',
                      badge: 'text-orange-700 bg-orange-100',
                      badgeIcon: <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>,
                      badgeText: 'ELITE',
                      iconBg: 'bg-orange-500',
                      iconText: 'text-white',
                      btn: 'bg-orange-500 hover:bg-orange-600 text-white',
                  };
              }

              return (
                <div key={test.id} className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 hover:shadow-xl ${theme.border} ${isLocked ? 'opacity-80' : ''}`}>
                    <div className="flex items-center justify-between mb-5">
                        <span className={`inline-flex items-center text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest ${theme.badge}`}>
                            {theme.badgeIcon}
                            {theme.badgeText}
                        </span>
                        <span className="text-xs font-semibold text-dark-500 flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 
                            {test.durationMinutes || 60} Mins
                        </span>
                    </div>
                    
                    <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 shrink-0 ${theme.iconBg} ${theme.iconText} rounded-xl flex items-center justify-center shadow-sm`}>
                            {testPlan === 'free' ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                            ) : testPlan === 'elite' ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"></path></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>
                            )}
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-dark-900 text-lg leading-tight mb-1">{test.title}</h3>
                            <p className="text-xs text-dark-500 line-clamp-2">{test.description || 'Complete coverage of Constitution, Fundamental Rights, DPSP, Amendments & more.'}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between border-t border-dark-100 pt-4 mt-auto gap-3">
                        <div className="flex items-center gap-2 text-[10px] text-dark-600 font-bold">
                            <span className="flex items-center gap-1 whitespace-nowrap"><svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> {test._count?.questions || test.totalQuestions || 100} MCQs</span>
                            <span className="flex items-center gap-1 whitespace-nowrap"><svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> {test.totalMarks || 100} Marks</span>
                        </div>
                        
                        {isLocked ? (
                            <button className="bg-dark-100 text-dark-500 font-bold py-1.5 px-4 rounded-lg text-sm flex items-center gap-1 cursor-not-allowed" disabled>
                                Locked <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </button>
                        ) : (
                            <Link href={`/practice?mode=mock&testId=${test.id}&auto=true`} className={`${theme.btn} font-bold py-1.5 px-4 rounded-lg transition-colors text-sm shadow-sm flex items-center gap-1`}>
                                Start Test &rarr;
                            </Link>
                        )}
                    </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Feature Highlights Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded-2xl p-6 border border-dark-100 shadow-sm mt-8">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </div>
                <div>
                    <h4 className="font-bold text-dark-900 text-sm mb-1">Exam Simulated</h4>
                    <p className="text-xs text-dark-500">Real exam environment with timer & pattern</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                </div>
                <div>
                    <h4 className="font-bold text-dark-900 text-sm mb-1">Detailed Analysis</h4>
                    <p className="text-xs text-dark-500">Performance report with strength & weakness</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <div>
                    <h4 className="font-bold text-dark-900 text-sm mb-1">Topic Wise Insights</h4>
                    <p className="text-xs text-dark-500">Identify weak topics and improve</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                </div>
                <div>
                    <h4 className="font-bold text-dark-900 text-sm mb-1">Improve & Achieve</h4>
                    <p className="text-xs text-dark-500">Practice more, score higher and achieve your goal</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
