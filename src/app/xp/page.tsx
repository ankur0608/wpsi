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

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
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
              <h3 className="font-display text-lg font-bold text-dark-900 mb-6 border-b border-dark-100 pb-3 flex items-center gap-2">
                📊 XP Earning Sources
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
              <h3 className="font-display text-lg font-bold text-dark-900 mb-6 border-b border-dark-100 pb-3">
                🕒 Recent Points History
              </h3>
              <div className="space-y-4">
                {recentHistory.length > 0 ? (
                  recentHistory.map((hist: any, idx: number) => (
                    <div key={idx} className={`flex justify-between items-start ${idx < recentHistory.length - 1 ? 'border-b border-dark-50 pb-2.5' : ''}`}>
                      <div>
                        <p className="text-xs font-bold text-dark-900">{hist.title}</p>
                        <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">
                          {new Date(hist.date).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 shrink-0">+{hist.xp} XP</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-dark-400 text-sm py-4">No recent activity found.</div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Span 1) */}
          <div className="space-y-6">
            
            {/* Level Milestones */}
            <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
              <div className="pb-4 border-b border-dark-100 mb-4">
                <h3 className="font-display text-lg font-bold text-dark-900">⭐ Level Milestones</h3>
                <p className="text-xs text-dark-500">Progression thresholds & titles for WPSI console</p>
              </div>
              
              <div className="grid grid-cols-1 gap-2.5">
                {levels.map((l: any) => {
                  const isActive = user.level === l.lvl;
                  const icons = ['🌱', '📚', '✍️', '🎯', '⚡', '🏅', '🏆', '👑'];
                  const icon = icons[l.lvl - 1] || '⭐';

                  if (isActive) {
                    return (
                      <div key={l.lvl} className="p-3 bg-purple-50/50 rounded-xl border-2 border-purple-300 flex items-center justify-between text-xs shadow-sm">
                        <span className="font-black text-purple-900 flex items-center gap-1.5">
                          {icon} Level {l.lvl}: {l.name}
                          <span className="text-[8px] bg-purple-600 text-white font-bold px-1.5 py-0.5 rounded uppercase">Active</span>
                        </span>
                        <span className="font-black text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
                          {l.lvl === 8 ? '50,000+ XP' : `${l.min.toLocaleString()} - ${l.max.toLocaleString()} XP`}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div key={l.lvl} className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-dark-600 flex items-center gap-1.5">{icon} Level {l.lvl}: {l.name}</span>
                      <span className="font-bold text-dark-800 bg-white px-2 py-0.5 rounded border">
                        {l.lvl === 8 ? '50,000+ XP' : `${l.min.toLocaleString()} - ${l.max.toLocaleString()} XP`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Earning Analytics */}
            <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-dark-900 mb-4 border-b border-dark-100 pb-3">
                📈 Earning Analytics
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-600">Average XP / Day</span>
                  <span className="font-bold text-dark-900 bg-white px-2 py-0.5 rounded border">{analytics.averageDayXP} XP</span>
                </div>
                <div className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-600">Average XP / Week</span>
                  <span className="font-bold text-dark-900 bg-white px-2 py-0.5 rounded border">{analytics.averageWeekXP} XP</span>
                </div>
                <div className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-600">Highest Single Day XP</span>
                  <span className="font-bold text-emerald-600 bg-white px-2 py-0.5 rounded border">+{analytics.highestDayXP} XP</span>
                </div>
              </div>
            </div>

            {/* Point Reward Policy */}
            <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-dark-900 mb-4 border-b border-dark-100 pb-3">
                📜 Point Reward Policy
              </h3>
              <ul className="space-y-3.5 text-xs text-dark-700 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {[
                  { icon: '✅', title: 'Correct Answer', xp: '+10 XP', desc: 'Awarded for each correct answer (first attempt only).' },
                  { icon: '❌', title: 'Incorrect Answer', xp: '-5 XP', desc: 'Deducted for each incorrect answer.' },
                  { icon: '🎯', title: 'First Attempt Bonus', xp: '+5 XP', desc: 'Extra reward for answering correctly on the first attempt.' },
                  { icon: '⚡', title: '5 Correct Answers in a Row', xp: '+25 XP', desc: 'Streak bonus for consistent accuracy.' },
                  { icon: '🔥', title: 'Daily Study Streak', xp: '+5 XP', desc: 'Awarded after solving at least 5 questions in a day.' },
                  { icon: '📚', title: 'Quick Practice Completed', xp: '+30 XP', desc: 'Completion bonus for finishing all 20 MCQs.' },
                  { icon: '📖', title: 'Full Practice Completed', xp: '+100 XP', desc: 'One-time bonus for completing the full practice set.' },
                  { icon: '⏱️', title: 'Timed Test Completed', xp: '+75 XP', desc: 'Base reward for completing a timed test.' },
                  { icon: '🏆', title: 'Timed Test (80%+ Score)', xp: '+30 XP', desc: 'Performance bonus for scoring 80% or higher.' },
                  { icon: '🎓', title: 'Full-Length Mock Completed', xp: '+150 XP', desc: 'Base reward for completing a full mock exam.' },
                  { icon: '🥇', title: 'Full-Length Mock (90%+ Score)', xp: '+75 XP', desc: 'Excellence bonus for outstanding performance.' },
                  { icon: '📅', title: '7-Day Study Streak', xp: '+50 XP', desc: 'Weekly consistency reward.' },
                  { icon: '📆', title: '30-Day Study Streak', xp: '+300 XP', desc: 'Monthly consistency milestone.' },
                  { icon: '⭐', title: 'Perfect Score (20/20)', xp: '+40 XP', desc: 'Bonus for achieving a perfect score.' },
                  { icon: '🏅', title: 'Daily Quiz Completed', xp: '+20 XP', desc: 'Completion reward for the daily quiz.' },
                  { icon: '🎁', title: 'Daily Quiz (100% Score)', xp: '+20 XP', desc: 'Bonus for a perfect daily quiz score.' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-sm">{item.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-dark-900">{item.title}</p>
                      <p className="text-dark-500 text-[11px] mt-0.5">Payout: <span className="text-emerald-600 font-bold">{item.xp}</span> {item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
