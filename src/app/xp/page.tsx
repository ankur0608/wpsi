"use client";

import React from "react";
import { useUser } from "@/context/UserContext";

export default function XPPage() {
  const { user } = useUser();
  const displayName = user?.name?.trim() || "Profile";
  const userXp = user?.xp || 0;
  
  // Calculate Level dynamically (every 1000 XP = 1 Level)
  const currentLevel = Math.max(1, Math.floor(userXp / 1000) + 1);
  const nextLevelXp = currentLevel * 1000;
  const prevLevelXp = (currentLevel - 1) * 1000;
  const progressPercent = Math.min(100, Math.max(0, ((userXp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100));
  const xpNeeded = nextLevelXp - userXp;

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 pb-10">
      <div className="max-w-[1440px] mx-auto p-4 lg:p-6 space-y-6">
        
        {/* Gamification Profile Header */}
        <div className="bg-white border border-purple-200 rounded-[24px] p-5 lg:p-6 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden text-dark-800">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 w-24 h-24 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-[3px] shadow-sm">
            <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center font-display font-bold">
              <span className="text-[10px] text-purple-600 mb-[-4px]">LVL</span>
              <span className="text-3xl text-dark-900">{currentLevel}</span>
            </div>
          </div>
          
          <div className="relative z-10 flex-1 w-full text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-dark-900 mb-1">{displayName}</h2>
                <p className="text-xs text-purple-600 font-extrabold uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">🏆 Scholar Rank</p>
              </div>
              <div className="bg-purple-50/50 border border-purple-100 px-6 py-3 rounded-2xl flex items-center gap-4 self-center md:self-auto shadow-sm">
                <span className="text-3xl">🏆</span>
                <div className="text-left">
                  <p className="text-[10px] text-purple-600 font-bold uppercase tracking-widest">Total XP Earned</p>
                  <p className="text-2xl font-black text-purple-900 leading-none mt-1">{userXp.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="w-full bg-dark-100 h-2.5 rounded-full overflow-hidden border border-dark-200/50 mt-5 shadow-inner">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full relative" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="flex justify-between text-xs font-bold text-dark-500 mt-2">
              <span>Level {currentLevel} ({prevLevelXp.toLocaleString()} XP)</span>
              <span>{xpNeeded.toLocaleString()} XP to Level {currentLevel + 1} ({nextLevelXp.toLocaleString()} XP)</span>
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* XP Overview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass-card p-5 bg-white flex flex-col justify-between rounded-3xl shadow-sm border border-dark-100">
                <span className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Total XP</span>
                <p className="text-2xl font-black text-dark-900 mt-2">{userXp.toLocaleString()}</p>
              </div>
              <div className="glass-card p-5 bg-white flex flex-col justify-between rounded-3xl shadow-sm border border-dark-100">
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Today&apos;s XP</span>
                <p className="text-2xl font-black text-emerald-600 mt-2">0</p>
              </div>
              <div className="glass-card p-5 bg-white flex flex-col justify-between rounded-3xl shadow-sm border border-dark-100">
                <span className="text-[10px] text-purple-600 font-bold uppercase tracking-widest">Weekly XP</span>
                <p className="text-2xl font-black text-purple-600 mt-2">0</p>
              </div>
              <div className="glass-card p-5 bg-white flex flex-col justify-between rounded-3xl shadow-sm border border-dark-100">
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Monthly XP</span>
                <p className="text-2xl font-black text-blue-600 mt-2">0</p>
              </div>
            </div>

            {/* Daily MCQ Goal Tracker Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[24px] p-6 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl shrink-0 shadow-inner">🎯</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-black text-lg">Daily MCQ Goal Completed!</h3>
                    <span className="bg-white/25 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/20">Done</span>
                  </div>
                  <p className="text-emerald-100 text-xs mt-1">Target achieved: Solve 20 questions in a day to claim your daily bonus!</p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-end">
                <div className="text-right">
                  <p className="text-2xl font-black">20 / 20</p>
                  <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest mt-0.5">MCQs Completed</p>
                </div>
                <div className="bg-white text-emerald-700 font-black px-4 py-2.5 rounded-xl text-xs shadow-md">
                  +50 XP Bonus Credited
                </div>
              </div>
            </div>

            {/* XP Earning Sources Card */}
            <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-dark-900 mb-6 border-b border-dark-100 pb-3 flex items-center gap-2">
                📊 XP Earning Sources
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-dark-800">Practice Questions</span>
                    <span className="text-dark-500 font-bold">2,450 XP (57%)</span>
                  </div>
                  <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden border border-dark-200/50">
                    <div className="bg-primary-500 h-full rounded-full" style={{ width: '57%' }}></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-dark-800">Sectional Mock Tests</span>
                    <span className="text-dark-500 font-bold">900 XP (21%)</span>
                  </div>
                  <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden border border-dark-200/50">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: '21%' }}></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-dark-800">Full-Length Mock Exams</span>
                    <span className="text-dark-500 font-bold">600 XP (14%)</span>
                  </div>
                  <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden border border-dark-200/50">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: '14%' }}></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-dark-800">Streak Rewards & Milestones</span>
                    <span className="text-dark-500 font-bold">330 XP (8%)</span>
                  </div>
                  <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden border border-dark-200/50">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-dark-900 mb-6 border-b border-dark-100 pb-3">
                🕒 Recent Points History
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-dark-50 pb-2.5">
                  <div>
                    <p className="text-xs font-bold text-dark-900">Engineering Materials MCQ Practice</p>
                    <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">Today</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 shrink-0">+80 XP</span>
                </div>
                <div className="flex justify-between items-start border-b border-dark-50 pb-2.5">
                  <div>
                    <p className="text-xs font-bold text-dark-900">Completed Daily 20 MCQ Goal</p>
                    <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">Today</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 shrink-0">+50 XP</span>
                </div>
                <div className="flex justify-between items-start border-b border-dark-50 pb-2.5">
                  <div>
                    <p className="text-xs font-bold text-dark-900">Digital Electronics Sectional Mock</p>
                    <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">Yesterday</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 shrink-0">+75 XP</span>
                </div>
                <div className="flex justify-between items-start border-b border-dark-50 pb-2.5">
                  <div>
                    <p className="text-xs font-bold text-dark-900">WPSI Full Length Mock</p>
                    <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">2026-06-18</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 shrink-0">+150 XP</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-dark-900">1 Week Streak Reward</p>
                    <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">2026-06-18</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 shrink-0">+100 XP</span>
                </div>
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
                <div className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-600 flex items-center gap-1.5">🌱 Level 1: Beginner</span>
                  <span className="font-bold text-dark-800 bg-white px-2 py-0.5 rounded border">0 - 500 XP</span>
                </div>
                <div className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-600 flex items-center gap-1.5">📚 Level 2: Learner</span>
                  <span className="font-bold text-dark-800 bg-white px-2 py-0.5 rounded border">500 - 1000 XP</span>
                </div>
                <div className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-600 flex items-center gap-1.5">✍️ Level 3: Practitioner</span>
                  <span className="font-bold text-dark-800 bg-white px-2 py-0.5 rounded border">1000 - 1750 XP</span>
                </div>
                <div className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-600 flex items-center gap-1.5">🎯 Level 4: Skilled</span>
                  <span className="font-bold text-dark-800 bg-white px-2 py-0.5 rounded border">1750 - 2500 XP</span>
                </div>
                <div className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-600 flex items-center gap-1.5">⚡ Level 5: Advanced</span>
                  <span className="font-bold text-dark-800 bg-white px-2 py-0.5 rounded border">2500 - 3400 XP</span>
                </div>
                <div className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-600 flex items-center gap-1.5">🏅 Level 6: Expert</span>
                  <span className="font-bold text-dark-800 bg-white px-2 py-0.5 rounded border">3400 - 4000 XP</span>
                </div>
                <div className="p-3 bg-purple-50/50 rounded-xl border-2 border-purple-300 flex items-center justify-between text-xs shadow-sm">
                  <span className="font-black text-purple-900 flex items-center gap-1.5">🏆 Level 7: Master <span className="text-[8px] bg-purple-600 text-white font-bold px-1.5 py-0.5 rounded uppercase">Active</span></span>
                  <span className="font-black text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">4000 - 5000 XP</span>
                </div>
                <div className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-600 flex items-center gap-1.5">👑 Level 8: Legend</span>
                  <span className="font-bold text-dark-800 bg-white px-2 py-0.5 rounded border">5000+ XP</span>
                </div>
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
                  <span className="font-bold text-dark-900 bg-white px-2 py-0.5 rounded border">77 XP</span>
                </div>
                <div className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-600">Average XP / Week</span>
                  <span className="font-bold text-dark-900 bg-white px-2 py-0.5 rounded border">540 XP</span>
                </div>
                <div className="p-3 bg-dark-50 rounded-xl border border-dark-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-600">Highest Single Day XP</span>
                  <span className="font-bold text-emerald-600 bg-white px-2 py-0.5 rounded border">+320 XP</span>
                </div>
              </div>
            </div>

            {/* Point Reward Policy */}
            <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-dark-900 mb-4 border-b border-dark-100 pb-3">
                📜 Point Reward Policy
              </h3>
              <ul className="space-y-3.5 text-xs text-dark-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-sm">📝</span>
                  <div className="flex-1">
                    <p className="font-bold text-dark-900">Correct Practice Answer</p>
                    <p className="text-dark-500 text-[11px] mt-0.5">Payout: <span className="text-emerald-600 font-bold">+10 XP</span> per question</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sm">🔥</span>
                  <div className="flex-1">
                    <p className="font-bold text-dark-900">Daily Study Streak</p>
                    <p className="text-dark-500 text-[11px] mt-0.5">Payout: <span className="text-emerald-600 font-bold">+5 XP</span> per active day</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sm">⏱️</span>
                  <div className="flex-1">
                    <p className="font-bold text-dark-900">Sectional Mock Test</p>
                    <p className="text-dark-500 text-[11px] mt-0.5">Payout: <span className="text-emerald-600 font-bold">+75 XP</span> per session</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sm">🏆</span>
                  <div className="flex-1">
                    <p className="font-bold text-dark-900">Full Length Mock Test</p>
                    <p className="text-dark-500 text-[11px] mt-0.5">Payout: <span className="text-emerald-600 font-bold">+150 XP</span> per exam</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sm">🎁</span>
                  <div className="flex-1">
                    <p className="font-bold text-dark-900">1 Week Streak Reward</p>
                    <p className="text-dark-500 text-[11px] mt-0.5">Payout: <span className="text-emerald-600 font-bold">+100 XP</span> milestone bonus</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sm">🎁</span>
                  <div className="flex-1">
                    <p className="font-bold text-dark-900">1 Month Streak Reward</p>
                    <p className="text-dark-500 text-[11px] mt-0.5">Payout: <span className="text-emerald-600 font-bold">+300 XP</span> milestone bonus</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sm">🎁</span>
                  <div className="flex-1">
                    <p className="font-bold text-dark-900">100 Day Streak Reward</p>
                    <p className="text-dark-500 text-[11px] mt-0.5">Payout: <span className="text-emerald-600 font-bold">+1000 XP</span> milestone bonus</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
