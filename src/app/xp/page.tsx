"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function XPPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/xp')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch XP stats", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-dark-500">
        <i className="fa-solid fa-circle-notch fa-spin text-3xl mb-4 text-primary-500"></i>
        <span className="ml-3 font-semibold">Loading XP Dashboard...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-dark-500">
        <i className="fa-solid fa-triangle-exclamation text-4xl mb-4 text-warning"></i>
        <h2 className="text-xl font-bold text-dark-900 mb-2">Could not load stats</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  const { user, analytics, recentHistory, sources, levels } = data;

  return (
    <div className="w-full font-sans text-dark-800 animate-in fade-in duration-500">
      <div className="max-w-[1440px] mx-auto p-4 lg:p-6 space-y-6">
        
        {/* Gamification Profile Header */}
        <div className="bg-white border border-purple-200 rounded-[24px] p-5 lg:p-6 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden text-dark-800">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 w-24 h-24 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-[3px] shadow-sm">
            <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center font-display font-bold">
              <span className="text-[10px] text-purple-600 mb-[-4px]">LVL</span>
              <span className="text-3xl text-dark-900">{user.level}</span>
            </div>
          </div>
          
          <div className="relative z-10 flex-1 w-full text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-dark-900 mb-1">{user.name}</h2>
                <p className="text-xs text-purple-600 font-extrabold uppercase tracking-widest flex items-center gap-1 justify-center md:justify-start">🏆 {user.rank} Rank</p>
              </div>
              <div className="bg-purple-50/50 border border-purple-100 px-6 py-3 rounded-2xl flex items-center gap-4 self-center md:self-auto shadow-sm">
                <span className="text-3xl">🏆</span>
                <div className="text-left">
                  <p className="text-[10px] text-purple-600 font-bold uppercase tracking-widest">Total XP Earned</p>
                  <p className="text-2xl font-black text-purple-900 leading-none mt-1">{user.xp.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="w-full bg-dark-100 h-2.5 rounded-full overflow-hidden border border-dark-200/50 mt-5 shadow-inner">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full relative transition-all duration-1000 ease-out" style={{ width: `${user.progressPercentage}%` }}></div>
            </div>
            <div className="flex justify-between text-xs font-bold text-dark-500 mt-2">
              <span>Level {user.level}: {user.rank} ({user.xp.toLocaleString()} XP)</span>
              <span>{user.levelMax > 90000 ? 'Max Level Reached!' : `${(user.levelMax - user.xp).toLocaleString()} XP to Next Level (${user.levelMax.toLocaleString()} XP)`}</span>
            </div>
          </div>
        </div>

        {/* Main Layout Stack */}
        <div className="flex flex-col gap-6">
            
            {/* XP Overview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-dark-100 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                <span className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Total XP</span>
                <p className="text-2xl font-black text-dark-900 mt-2">{user.xp.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-dark-100 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Today's XP</span>
                <p className="text-2xl font-black text-emerald-600 mt-2">+{analytics.todayXP.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-dark-100 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                <span className="text-[10px] text-purple-600 font-bold uppercase tracking-widest">Weekly XP</span>
                <p className="text-2xl font-black text-purple-600 mt-2">{analytics.weeklyXP.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-dark-100 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                <span className="text-[10px] text-primary-600 font-bold uppercase tracking-widest">Monthly XP</span>
                <p className="text-2xl font-black text-primary-600 mt-2">{analytics.monthlyXP.toLocaleString()}</p>
              </div>
            </div>

            {/* Daily MCQ Goal Tracker Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[24px] p-6 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl shrink-0 shadow-inner">🎯</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-black text-lg">Daily MCQ Goal</h3>
                    {analytics.todayXP >= 200 && <span className="bg-white/25 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/20">Done</span>}
                  </div>
                  <p className="text-emerald-100 text-xs mt-1">Target: Earn 200 XP in a day to claim your daily bonus!</p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-end relative z-10">
                <div className="text-right">
                  <p className="text-2xl font-black">{Math.min(analytics.todayXP, 200)} / 200</p>
                  <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest mt-0.5">XP Earned</p>
                </div>
                <div className="bg-white text-emerald-700 font-black px-4 py-2.5 rounded-xl text-xs shadow-md">
                  {analytics.todayXP >= 200 ? '+50 XP Bonus Credited' : 'Keep Going!'}
                </div>
              </div>
            </div>

            {/* XP Earning Sources Card */}
            <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-dark-900 mb-6 border-b border-dark-100 pb-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100 shadow-sm">
                  <i className="fa-solid fa-chart-pie text-sm"></i>
                </div>
                XP Earning Sources
              </h3>
              <div className="space-y-4">
                {sources.map((src: any, idx: number) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                       <span className="font-bold text-dark-800">{src.name}</span>
                       <span className="text-dark-500 font-bold">{src.xp.toLocaleString()} XP ({src.percentage}%)</span>
                    </div>
                    <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden border border-dark-200/50">
                       <div className={`${src.color} h-full rounded-full transition-all duration-1000 ease-out`} style={{ width: `${src.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-dark-900 mb-6 border-b border-dark-100 pb-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100 shadow-sm">
                  <i className="fa-solid fa-clock-rotate-left text-sm"></i>
                </div>
                Recent Points History
              </h3>
              <div className="space-y-0 divide-y divide-dark-50">
                {recentHistory.length > 0 ? (
                  recentHistory.map((hist: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-start py-3 group hover:bg-dark-50/30 px-2 rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                          hist.mode === 'full' || hist.mode === 'mock' ? 'bg-indigo-50 text-indigo-500 border-indigo-100' :
                          hist.mode === 'timed' ? 'bg-purple-50 text-purple-500 border-purple-100' :
                          'bg-primary-50 text-primary-500 border-primary-100'
                        }`}>
                          <i className={`fa-solid ${
                            hist.mode === 'full' || hist.mode === 'mock' ? 'fa-star' :
                            hist.mode === 'timed' ? 'fa-clock' :
                            'fa-bolt'
                          } text-xs`}></i>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-dark-900 group-hover:text-primary-700 transition-colors">{hist.title}</p>
                          <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">
                            {new Date(hist.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs font-bold shrink-0 mt-1 ${hist.xp < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {hist.xp > 0 ? `+${hist.xp}` : hist.xp} XP
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-dark-400 text-sm py-4">No recent activity found.</div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-dark-100 text-center">
                <Link href="/xp/history" className="text-[10px] text-primary-600 hover:text-primary-700 font-bold uppercase tracking-wider block w-full py-1">
                  View All History
                </Link>
              </div>
            </div>

            {/* Level Milestones & Analytics Side by Side Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Level Milestones */}
              <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
                <div className="pb-4 border-b border-dark-100 mb-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100 shadow-sm">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-dark-900">Level Milestones</h3>
                    <p className="text-[10px] text-dark-500 uppercase tracking-widest font-bold">Progression & Titles</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {levels.map((l: any) => {
                    const isActive = user.level === l.lvl;
                    const icons = ['fa-seedling', 'fa-book-open', 'fa-pen-nib', 'fa-bullseye', 'fa-bolt', 'fa-medal', 'fa-trophy', 'fa-crown'];
                    const icon = icons[l.lvl - 1] || 'fa-star';
                    const isPast = user.level > l.lvl;

                    if (isActive) {
                      return (
                        <div key={l.lvl} className="p-3.5 bg-gradient-to-r from-purple-50 to-white rounded-2xl border-2 border-purple-300 flex items-center justify-between text-xs shadow-md shadow-purple-500/10 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-purple-100/50 to-transparent pointer-events-none"></div>
                          <div className="flex items-center gap-3 relative z-10">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shadow-inner">
                              <i className={`fa-solid ${icon}`}></i>
                            </div>
                            <div>
                              <span className="font-black text-purple-900 block text-sm">Level {l.lvl}: {l.name}</span>
                              <span className="text-[9px] bg-purple-600 text-white font-bold px-1.5 py-0.5 rounded uppercase mt-1 inline-block shadow-sm">Active Now</span>
                            </div>
                          </div>
                          <span className="font-black text-purple-700 bg-white px-3 py-1 rounded-lg border border-purple-200 shadow-sm relative z-10">
                            {l.lvl === 8 ? '50,000+ XP' : `${l.min.toLocaleString()} - ${l.max.toLocaleString()} XP`}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div key={l.lvl} className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-colors ${isPast ? 'bg-dark-50/50 border-dark-100 opacity-70' : 'bg-white border-dark-100 hover:border-dark-300'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPast ? 'bg-dark-100 text-dark-400' : 'bg-dark-50 text-dark-500 border border-dark-100'}`}>
                            <i className={`fa-solid ${icon}`}></i>
                          </div>
                          <span className={`font-bold ${isPast ? 'text-dark-500' : 'text-dark-700'} text-sm`}>Level {l.lvl}: {l.name}</span>
                        </div>
                        <span className={`font-bold px-2 py-1 rounded-md ${isPast ? 'text-dark-400' : 'text-dark-800 bg-dark-50 border border-dark-100'}`}>
                          {l.lvl === 8 ? '50,000+ XP' : `${l.min.toLocaleString()} - ${l.max.toLocaleString()} XP`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Earning Analytics */}
              <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
                <div className="pb-4 border-b border-dark-100 mb-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 shadow-sm">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-dark-900">Earning Analytics</h3>
                    <p className="text-[10px] text-dark-500 uppercase tracking-widest font-bold">Your Performance Stats</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-dark-50 to-white rounded-2xl border border-dark-100 flex items-center justify-between shadow-sm group hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white text-dark-600 flex items-center justify-center border border-dark-200 shadow-sm group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-calendar-day text-lg"></i>
                      </div>
                      <div>
                        <span className="block font-bold text-dark-900 text-sm">Average / Day</span>
                        <span className="block text-[10px] text-dark-500 font-bold uppercase tracking-wider mt-0.5">Daily XP Average</span>
                      </div>
                    </div>
                    <span className="font-black text-dark-800 bg-white px-3 py-1.5 rounded-xl border border-dark-200 shadow-sm">{analytics.averageDayXP} XP</span>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-dark-50 to-white rounded-2xl border border-dark-100 flex items-center justify-between shadow-sm group hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white text-dark-600 flex items-center justify-center border border-dark-200 shadow-sm group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-calendar-week text-lg"></i>
                      </div>
                      <div>
                        <span className="block font-bold text-dark-900 text-sm">Average / Week</span>
                        <span className="block text-[10px] text-dark-500 font-bold uppercase tracking-wider mt-0.5">Weekly XP Average</span>
                      </div>
                    </div>
                    <span className="font-black text-dark-800 bg-white px-3 py-1.5 rounded-xl border border-dark-200 shadow-sm">{analytics.averageWeekXP} XP</span>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-white rounded-2xl border border-emerald-100 flex items-center justify-between shadow-sm group hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-sm group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-arrow-trend-up text-lg"></i>
                      </div>
                      <div>
                        <span className="block font-bold text-dark-900 text-sm">Highest Day</span>
                        <span className="block text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-0.5">Personal Best</span>
                      </div>
                    </div>
                    <span className="font-black text-emerald-700 bg-emerald-100/50 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-sm">+{analytics.highestDayXP} XP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Point Reward Policy */}
            <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
              <div className="pb-4 border-b border-dark-100 mb-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100 shadow-sm">
                  <i className="fa-solid fa-scroll"></i>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-dark-900">Point Reward Policy</h3>
                  <p className="text-[10px] text-dark-500 uppercase tracking-widest font-bold">Rules & Mechanics</p>
                </div>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-dark-700">
                {[
                  { icon: 'fa-check text-emerald-500 bg-emerald-50', title: 'Correct Answer', xp: '+10 XP', desc: 'Awarded for each correct answer (first attempt only).' },
                  { icon: 'fa-xmark text-rose-500 bg-rose-50', title: 'Incorrect Answer', xp: '-5 XP', desc: 'Deducted for each incorrect answer.' },
                  { icon: 'fa-bullseye text-blue-500 bg-blue-50', title: 'First Attempt Bonus', xp: '+5 XP', desc: 'Extra reward for answering correctly on the first attempt.' },
                  { icon: 'fa-bolt text-amber-500 bg-amber-50', title: '5 Correct Answers in a Row', xp: '+25 XP', desc: 'Streak bonus for consistent accuracy.' },
                  { icon: 'fa-fire text-orange-500 bg-orange-50', title: 'Daily Study Streak', xp: '+5 XP', desc: 'Awarded after solving at least 5 questions in a day.' },
                  { icon: 'fa-clock text-purple-500 bg-purple-50', title: 'Timed Test (80%+ Score)', xp: '+30 XP', desc: 'Performance bonus for scoring 80% or higher.' },
                  { icon: 'fa-medal text-indigo-500 bg-indigo-50', title: 'Full-Length Mock (90%+ Score)', xp: '+75 XP', desc: 'Excellence bonus for outstanding performance.' },
                  { icon: 'fa-calendar-days text-teal-500 bg-teal-50', title: '7-Day Study Streak', xp: '+50 XP', desc: 'Weekly consistency reward.' },
                  { icon: 'fa-calendar-check text-cyan-500 bg-cyan-50', title: '30-Day Study Streak', xp: '+300 XP', desc: 'Monthly consistency milestone.' },
                  { icon: 'fa-star text-yellow-500 bg-yellow-50', title: 'Perfect Score (20/20)', xp: '+40 XP', desc: 'Bonus for achieving a perfect score.' },
                  { icon: 'fa-list-check text-primary-500 bg-primary-50', title: 'Daily Quiz Completed', xp: '+20 XP', desc: 'Completion reward for the daily quiz.' },
                  { icon: 'fa-gift text-pink-500 bg-pink-50', title: 'Daily Quiz (100% Score)', xp: '+20 XP', desc: 'Bonus for a perfect daily quiz score.' },
                ].map((item, idx) => (
                  <li key={idx} className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-dark-50/30 hover:bg-dark-50 transition-colors border border-transparent hover:border-dark-100">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm ${item.icon.split(' ').slice(1).join(' ')}`}>
                      <i className={`fa-solid ${item.icon.split(' ')[0]} text-xl`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-dark-900 text-sm">{item.title}</p>
                      <p className="text-dark-500 text-[11px] mt-1 leading-relaxed"><span className="text-emerald-600 font-bold">{item.xp}</span> • {item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

        </div>
      </div>
    </div>
  );
}
