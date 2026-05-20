
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function Dashboard() {
  const { user, loading } = useUser();

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

  const currentLevel = user?.level ?? 0;
  const currentXp = user?.xp ?? 0;
  const nextLevelXp = Math.max((currentLevel || 1) * 1000, 1000);
  const xpProgress = currentLevel > 0 ? (currentXp % 1000) / 10 : 0;
  const profileName = user?.name?.trim() || 'Learner';

  return (
    <div className="space-y-6">
        {/*  Hero Widget  */}
        <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden border-brand-500/30">
            <div className="absolute right-0 top-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-brand-300 mb-3 border border-brand-500/30">
                      {loading ? 'Loading profile...' : currentLevel > 0 ? `Level ${currentLevel} Scholar` : 'Profile Sync Pending'}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {loading ? 'Loading your dashboard...' : `Ready for the next round, ${profileName}?`}
                    </h2>
                    <p className="text-slate-400 text-sm max-w-md mb-6">
                      {loading
                        ? 'We are syncing your latest progress, streak, and rewards.'
                        : currentLevel > 0
                          ? `You're ${Math.max(nextLevelXp - currentXp, 0)} XP away from Level ${currentLevel + 1}. Complete the daily quiz to keep your streak moving.`
                          : 'Your account profile is connected, but no progress data is available yet.'}
                    </p>
                    <Link href="/practice" className="inline-block btn-primary px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-brand-500/20">Start Daily Quiz <i className="fa-solid fa-arrow-right ml-1"></i></Link>
                </div>
                
                {/*  Level Progress Circular  */}
                <div className="relative w-32 h-32 flex-shrink-0 mx-auto md:mx-0">
                    <svg viewBox="0 0 36 36" className="circular-chart text-brand-500 w-full h-full">
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="circle stroke-current" strokeDasharray={`${xpProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">{xpProgress.toFixed(0)}%</span>
                        <span className="text-[10px] text-slate-400">
                          {currentLevel > 0 ? `to Lvl ${currentLevel + 1}` : 'waiting for profile'}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/*  Quick Access Hub  */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <a href="/subjects" className="glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform border border-white/5 hover:border-brand-500/50">
                <div className="w-12 h-12 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center text-xl mb-3 shadow-[0_0_10px_rgba(99,102,241,0.2)]"><i className="fa-solid fa-book"></i></div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Syllabus</h4>
            </a>
            <a href="/practice" className="glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform border border-white/5 hover:border-accent/50">
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl mb-3 shadow-[0_0_10px_rgba(16,185,129,0.2)]"><i className="fa-solid fa-pen-to-square"></i></div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Practice</h4>
            </a>
            <a href="/test" className="glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform border border-white/5 hover:border-warning/50 relative">
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-warning animate-ping"></div>
                <div className="w-12 h-12 rounded-full bg-warning/10 text-warning flex items-center justify-center text-xl mb-3 shadow-[0_0_10px_rgba(245,158,11,0.2)]"><i className="fa-solid fa-clipboard-check"></i></div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Mock Tests</h4>
            </a>
            <a href="/rewards" className="glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform border border-white/5 hover:border-secondary/50">
                <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xl mb-3 shadow-[0_0_10px_rgba(124,58,237,0.2)]"><i className="fa-solid fa-gift"></i></div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Rewards</h4>
            </a>
            <a href="/pricing" className="glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform border border-white/5 hover:border-brand-500/50">
                <div className="w-12 h-12 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center text-xl mb-3 shadow-[0_0_10px_rgba(99,102,241,0.2)]"><i className="fa-solid fa-tags"></i></div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Plans</h4>
            </a>
            <a href="/profile" className="glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform border border-white/5 hover:border-slate-400/50">
                <div className="w-12 h-12 rounded-full bg-slate-400/10 text-slate-300 flex items-center justify-center text-xl mb-3 shadow-[0_0_10px_rgba(148,163,184,0.2)]"><i className="fa-solid fa-user"></i></div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Profile</h4>
            </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/*  Target Exam Progress  */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Target: Wireless PSI (WPSI)</h3>
                    <div className="text-xs font-bold text-brand-400 bg-brand-500/10 px-3 py-1 rounded">Overall: 68%</div>
                </div>
                
                <div className="space-y-5">
                    {/*  Part A  */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium flex items-center gap-2"><i className="fa-solid fa-brain text-brand-400"></i> Part A: General & Aptitude</span>
                            <span className="text-slate-400">89%</span>
                        </div>
                        <div className="w-full bg-dark-bg rounded-full h-2">
                            <div className="bg-brand-500 h-2 rounded-full" style={{"width":"89%"}}></div>
                        </div>
                    </div>
                    {/*  Part B  */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium flex items-center gap-2"><i className="fa-solid fa-microchip text-secondary"></i> Part B: Technical Subjects</span>
                            <span className="text-slate-400">55%</span>
                        </div>
                        <div className="w-full bg-dark-bg rounded-full h-2">
                            <div className="bg-secondary h-2 rounded-full" style={{"width":"55%"}}></div>
                        </div>
                    </div>
                    {/*  Weak Subject  */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium flex items-center gap-2"><i className="fa-solid fa-satellite-dish text-danger"></i> Communication Engineering</span>
                            <span className="text-slate-400">24%</span>
                        </div>
                        <div className="w-full bg-dark-bg rounded-full h-2">
                            <div className="bg-danger h-2 rounded-full" style={{"width":"24%"}}></div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5">
                    <button className="w-full py-2.5 bg-dark-bg border border-white/10 rounded-lg text-sm font-bold hover:bg-white/5 transition-colors">Resume Study Plan</button>
                </div>
            </div>

            {/*  AI Insights  */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-secondary/20 rounded-full blur-xl"></div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><i className="fa-solid fa-wand-magic-sparkles text-secondary"></i> AI Insights</h3>
                
                <div className="space-y-4">
                    <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg">
                        <div className="text-xs font-bold text-danger mb-1"><i className="fa-solid fa-triangle-exclamation"></i> Weak Area Detected</div>
                        <p className="text-sm text-slate-300">Your accuracy in <strong>Communication Engineering</strong> dropped by 15% this week.</p>
                        <Link href="/practice?mode=quick&subject=Electronics%20Components%2C%20Devices%20and%20Circuits" className="text-xs font-bold text-danger hover:underline mt-2 inline-block">Practice Weakness &rarr;</Link>
                    </div>
                    
                    <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                        <div className="text-xs font-bold text-accent mb-1"><i className="fa-solid fa-chart-line"></i> Strong Momentum</div>
                        <p className="text-sm text-slate-300">You are in the top 10% of students for <strong>Digital Electronics & VLSI</strong>.</p>
                    </div>
                </div>
            </div>
        </div>

        {/*  Action Cards  */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/practice?mode=quick" className="glass-card p-4 rounded-xl border border-white/5 hover-card-up flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xl"><i className="fa-solid fa-bolt"></i></div>
                <div>
                    <div className="font-bold text-sm">Quick Practice</div>
                    <div className="text-[10px] text-slate-400">Exam in 35 Days</div>
                </div>
            </Link>
            <a href="/profile" className="glass-card p-4 rounded-xl border border-accent/20 bg-accent/5 hover-card-up flex flex-col items-center text-center gap-3 group">
                <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xl group-hover:scale-110 transition-transform"><i className="fa-solid fa-share-nodes"></i></div>
                <div>
                    <div className="font-bold text-sm text-white">Refer & Earn</div>
                    <div className="text-[10px] text-accent font-black">Get 300 Coins</div>
                </div>
            </a>
            <a href="/rewards" className="glass-card p-4 rounded-xl border border-white/5 hover-card-up flex flex-col items-center text-center gap-3 relative overflow-hidden">
                <div className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 bg-warning rounded-full"><i className="fa-solid fa-lock text-[8px] text-dark-bg"></i></div>
                <div className="w-12 h-12 rounded-full bg-slate-700 text-slate-400 flex items-center justify-center text-xl"><i className="fa-solid fa-book-open-reader"></i></div>
                <div>
                    <div className="font-bold text-sm text-slate-300">Premium Notes</div>
                    <div className="text-[10px] text-warning font-medium">Unlock with Coins</div>
                </div>
            </a>
            <Link href="/test" className="glass-card p-4 rounded-xl border border-white/5 hover-card-up flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xl"><i className="fa-solid fa-file-signature"></i></div>
                <div>
                    <div className="font-bold text-sm">Full Mock Test</div>
                    <div className="text-[10px] text-slate-400">June 21 Goal</div>
                </div>
            </Link>
        </div>
    </div>
  );
}
