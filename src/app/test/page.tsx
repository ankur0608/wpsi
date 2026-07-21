"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function Test() {
  const { user } = useUser();
  const [mockTests, setMockTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [planFilter, setPlanFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredTests = mockTests.filter(test => {
    const matchPlan = planFilter === 'all' || (test.planType && test.planType.toLowerCase() === planFilter.toLowerCase());
    
    const testTypeLabel = test.type || (
      test.title?.includes('Part A') ? 'Part A' :
      test.title?.includes('Part B') ? 'Part B' :
      test.title?.includes('Mix') ? 'Mix' : 'Full Length'
    );
    
    let matchType = true;
    if (typeFilter !== 'all') {
      if (typeFilter === 'Full') {
         matchType = testTypeLabel.includes('Full');
      } else {
         matchType = testTypeLabel.includes(typeFilter);
      }
    }

    return matchPlan && matchType;
  });

  useEffect(() => {
    const fetchMockTests = async () => {
      try {
        const res = await fetch('/api/mock-tests');
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setMockTests(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching mock tests:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMockTests();
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
    <div className="bg-dark-50 w-full font-sans text-dark-800 h-full overflow-y-auto">
      <div className="p-6 lg:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <h2 className="font-display text-3xl font-bold text-dark-900 mb-1">Available Mock Tests</h2>
                <p className="text-dark-500 text-sm">Challenge yourself with exam-simulated environments.</p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
                <select 
                  value={planFilter} 
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="bg-white border border-dark-200 text-dark-700 px-3 py-2 rounded-xl text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors cursor-pointer appearance-none outline-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7rem top 50%', backgroundSize: '.65rem auto', paddingRight: '2.5rem' }}
                >
                  <option value="all">All Plans</option>
                  <option value="free">Free Tests</option>
                  <option value="pro">Pro Tests</option>
                  <option value="elite">Elite Tests</option>
                </select>

                <select 
                  value={typeFilter} 
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-white border border-dark-200 text-dark-700 px-3 py-2 rounded-xl text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors cursor-pointer appearance-none outline-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7rem top 50%', backgroundSize: '.65rem auto', paddingRight: '2.5rem' }}
                >
                  <option value="all">All Types</option>
                  <option value="Full">Full Length</option>
                  <option value="Part A">Part A</option>
                  <option value="Part B">Part B</option>
                  <option value="Mix">Mix</option>
                </select>
            </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12 text-dark-500">Loading mock tests...</div>
        ) : mockTests.length === 0 ? (
          <div className="text-center py-12 text-dark-500">No mock tests available at the moment. Check back later!</div>
        ) : filteredTests.length === 0 ? (
          <div className="text-center py-12 text-dark-500">No mock tests found matching your filters.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test, index) => {
              const isFreePlan = !user?.planType || user.planType === 'free';
              const isProPlan = user?.planType === 'pro';
              const isLocked = (isFreePlan && index >= 3) || (isProPlan && index >= 10);

              if (isLocked) {
                return (
                  <div key={test.id} className="glass-card hover-card p-6 border border-dark-100 group flex flex-col h-full relative overflow-hidden shadow-sm bg-dark-50/50 opacity-80 cursor-not-allowed">
                      <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-center justify-between mb-5">
                              <span className="bg-dark-100 text-dark-600 border border-dark-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{test.type || 'Full Length'}</span>
                              <span className="bg-dark-200 text-dark-700 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> Locked
                              </span>
                          </div>
                          <div className="w-12 h-12 bg-dark-100 rounded-2xl flex items-center justify-center text-dark-400 mb-4">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          </div>
                          <h3 className="font-display font-bold text-dark-900 text-xl mb-2">{test.title}</h3>
                          <p className="text-sm text-dark-500 mb-6 flex-1 line-clamp-2">Upgrade to unlock this mock test and evaluate your complete preparation.</p>
                          <div className="flex items-center justify-between border-t border-dark-100 pt-4 mt-auto">
                              <div className="text-[11px] text-dark-500 font-bold">Premium Required</div>
                              <button className="bg-dark-100 text-dark-400 font-bold py-2 px-5 rounded-lg text-sm shadow-sm flex items-center gap-1 cursor-not-allowed" disabled>
                                Upgrade <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                              </button>
                          </div>
                      </div>
                  </div>
                );
              }

              return (
                <div key={test.id} className="glass-card hover-card p-6 border border-dark-100 group flex flex-col h-full relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-300 bg-white">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-50 rounded-full group-hover:scale-[2.5] transition-transform duration-700 ease-out z-0"></div>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-5">
                            <span className="bg-primary-50 text-primary-600 border border-primary-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                              {test.type || 'Full Length'}
                            </span>
                            <span className="text-xs font-bold text-dark-500 flex items-center gap-1.5">
                              <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 
                              {test.durationMinutes || 120} Mins
                            </span>
                        </div>
                        <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <h3 className="font-display font-bold text-dark-900 text-xl mb-2 group-hover:text-primary-700 transition-colors">{test.title}</h3>
                        <p className="text-sm text-dark-500 mb-6 flex-1 line-clamp-2">{test.description || 'Complete coverage of Reasoning, Aptitude, Constitution, and Current Affairs.'}</p>
                        <div className="flex items-center justify-between border-t border-dark-100 pt-4 mt-auto">
                            <div className="text-[11px] text-dark-500 font-medium">{test._count?.questions || test.totalQuestions || 100} MCQs • {test.totalMarks || 100} Marks</div>
                            <Link href={`/practice?mode=mock&testId=${test.id}&auto=true`} className="bg-primary-50 group-hover:bg-primary-600 text-primary-600 group-hover:text-white font-bold py-2 px-5 rounded-lg transition-colors text-sm shadow-sm flex items-center gap-1">
                              Start <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </Link>
                        </div>
                    </div>
                </div>
              );
            })}
            
            {/* Locked Test Example */}
            <div className="glass-card hover-card p-6 border border-dark-100 group flex flex-col h-full relative overflow-hidden shadow-sm bg-dark-50/50 opacity-80 cursor-not-allowed">
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-5">
                        <span className="bg-dark-100 text-dark-600 border border-dark-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Full Length</span>
                        <span className="bg-accent-50 text-accent-600 border border-accent-100 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> Upcoming
                        </span>
                    </div>
                    <div className="w-12 h-12 bg-dark-100 rounded-2xl flex items-center justify-center text-dark-400 mb-4">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <h3 className="font-display font-bold text-dark-900 text-xl mb-2">WPSI Part B - Technical</h3>
                    <p className="text-sm text-dark-500 mb-6 flex-1 line-clamp-2">Complete technical curriculum mock test unlocking soon.</p>
                    <div className="flex items-center justify-between border-t border-dark-100 pt-4 mt-auto">
                        <div className="text-[11px] text-accent-600 font-bold">Unlocks 25th June</div>
                        <button className="bg-dark-100 text-dark-400 font-bold py-2 px-5 rounded-lg text-sm shadow-sm flex items-center gap-1 cursor-not-allowed" disabled>
                          Locked <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
