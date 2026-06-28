"use client";

import React from "react";
import { useUser } from "@/context/UserContext";

export default function StreaksPage() {
  const { user } = useUser();
  const currentStreak = user?.streak || 0;
  const bestStreak = user?.bestStreak || 0;
  const totalStudyDays = user?.totalStudyDays || 0;

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const calendarCells = [];
  const streakStartDay = Math.max(1, currentDay - currentStreak + 1);

  for (let i = 1; i <= daysInMonth; i++) {
    let style = "h-12 rounded-xl flex flex-col items-center justify-center transition-colors relative group shadow-sm ";
    let content = <span>{i}</span>;
    
    // Setup active streak days
    if (i >= streakStartDay && i <= currentDay && currentStreak > 0) {
      if (i === currentDay) {
        style += "bg-gradient-to-br from-orange-500 to-rose-600 text-white font-black ring-4 ring-orange-300 ring-offset-2 ring-offset-white hover:scale-105 ";
        content = (
          <>
            <span>{i}</span>
            <span className="text-[8px] uppercase tracking-tighter">Today</span>
          </>
        );
      } else {
        style += "bg-gradient-to-br from-orange-400 to-rose-500 text-white font-bold hover:scale-105 ";
        content = (
          <>
            <span>{i}</span>
            <span className="text-[8px] opacity-90">🔥</span>
          </>
        );
      }
    } 
    // Setup today if no streak
    else if (i === currentDay && currentStreak === 0) {
      style += "bg-dark-100 text-dark-800 font-black ring-4 ring-dark-200 ring-offset-2 ring-offset-white ";
      content = (
        <>
          <span>{i}</span>
          <span className="text-[8px] uppercase tracking-tighter">Today</span>
        </>
      );
    }
    // Setup passed inactive days
    else if (i < currentDay) {
      style += "bg-dark-50 border border-dark-200/50 text-xs font-semibold text-dark-600 hover:bg-dark-100 ";
    }
    // Setup future days
    else {
      style += "bg-white border border-dark-200 text-xs font-medium text-dark-700 hover:bg-dark-50 ";
    }

    calendarCells.push(
      <div key={i} className={style}>
        {content}
      </div>
    );
  }

  // Fill remaining slots to make it look like a calendar grid
  const remainingSlots = (7 - (daysInMonth % 7)) % 7;
  for (let i = 1; i <= remainingSlots; i++) {
    calendarCells.push(
      <div key={`empty-${i}`} className="h-12 bg-dark-50/20 rounded-xl border border-dashed border-dark-200 flex flex-col items-center justify-center text-xs font-medium text-dark-300"></div>
    );
  }

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 pb-10">
      <div className="max-w-[1440px] mx-auto p-4 lg:p-6 space-y-6">
        
        {/* Gamification Hero Header */}
        <div className="bg-white border border-amber-200 rounded-[24px] p-5 lg:p-6 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden text-dark-800">
          <div className="absolute -right-16 -top-16 w-60 h-60 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-60 h-60 bg-orange-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 w-24 h-24 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 p-[3px] shadow-sm flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <span className="text-4xl">🔥</span>
            </div>
          </div>
          
          <div className="relative z-10 flex-1 w-full text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                  <h2 className="font-display text-3xl font-bold text-dark-900 leading-tight">{currentStreak} Days Active</h2>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-amber-200">Active</span>
                </div>
                <p className="text-dark-500 text-sm font-medium">Last study session: Today (<span className="underline">2026-06-22</span>)</p>
              </div>
              <div className="bg-amber-50/50 border border-amber-200 px-6 py-4 rounded-2xl flex items-center gap-4 self-center md:self-auto shadow-sm">
                <span className="text-3xl">🏆</span>
                <div className="text-left">
                  <p className="text-[9px] text-amber-600 font-bold uppercase tracking-widest">Personal Record</p>
                  <p className="text-2xl font-black text-amber-900 leading-none mt-1">{bestStreak} Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 flex items-center gap-4 bg-white border border-dark-100 rounded-3xl shadow-sm">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 text-2xl border border-orange-100">🔥</div>
            <div>
              <p className="text-xs text-dark-500 font-bold uppercase tracking-widest">Current Streak</p>
              <p className="text-2xl font-black text-dark-900 mt-1">{currentStreak} Days</p>
            </div>
          </div>
          <div className="glass-card p-6 flex items-center gap-4 bg-white border border-dark-100 rounded-3xl shadow-sm">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 text-2xl border border-amber-100">👑</div>
            <div>
              <p className="text-xs text-dark-500 font-bold uppercase tracking-widest">Best Streak</p>
              <p className="text-2xl font-black text-dark-900 mt-1">{bestStreak} Days</p>
            </div>
          </div>
          <div className="glass-card p-6 flex items-center gap-4 bg-white border border-dark-100 rounded-3xl shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 text-2xl border border-blue-100">📅</div>
            <div>
              <p className="text-xs text-dark-500 font-bold uppercase tracking-widest">Total Study Days</p>
              <p className="text-2xl font-black text-dark-900 mt-1">{totalStudyDays} Days</p>
            </div>
          </div>
        </div>

        {/* Main columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUMN 1 & 2: Habit Tracker Calendar & Milestones */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* June Calendar Panel */}
            <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-dark-100 mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-dark-900">📅 Consistency Calendar</h3>
                  <p className="text-xs text-dark-500">{currentMonth} {currentYear} • Underlining your consecutive streaks</p>
                </div>
                <span className="bg-orange-50 border border-orange-200 text-orange-600 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <span>🔥</span> {currentStreak}-Day Streak Block
                </span>
              </div>
              
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-dark-400 mb-2 uppercase tracking-wider">
                <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {calendarCells}
              </div>
            </div>

            {/* Next Milestone Card */}
            <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-dark-900 mb-6 border-b border-dark-100 pb-3">🔥 Next Milestone: 2 Week Streak</h3>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="48" stroke="#F3F4F6" strokeWidth="8" fill="transparent"/>
                    <circle cx="56" cy="56" r="48" stroke="#F97316" strokeWidth="8" fill="transparent"
                            strokeDasharray="301.6" strokeDashoffset="108.57" strokeLinecap="round" className="transition-all duration-1000"/>
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-dark-900">64%</span>
                    <span className="text-[9px] text-dark-400 uppercase tracking-widest font-bold">Progress</span>
                  </div>
                </div>
                <div className="flex-1 w-full space-y-4">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-bold text-dark-900">14 Days Milestone Target</p>
                      <p className="text-xs text-dark-500 mt-0.5">Maintain streak consecutively for 5 more days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-orange-600">+100 XP Reward</p>
                      <p className="text-xs text-dark-400 mt-0.5">Claimable on day 14</p>
                    </div>
                  </div>
                  <div className="w-full bg-dark-100 h-2.5 rounded-full overflow-hidden border border-dark-200/50">
                    <div className="bg-gradient-to-r from-orange-500 to-rose-500 h-full rounded-full" style={{ width: '64%' }}></div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-dark-500">
                    <span>Current: {currentStreak} Days</span>
                    <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded text-[10px]">5 Days Remaining</span>
                    <span>Milestone: 14 Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Rules & Milestones List */}
          <div className="space-y-6">
            <div className="bg-white border border-dark-200 rounded-[24px] p-6 lg:p-8 shadow-sm flex flex-col">
              <h3 className="font-display text-lg font-bold text-dark-900 mb-4 border-b border-dark-100 pb-3 flex items-center gap-2">
                📜 Streak Rules
              </h3>
              <div className="space-y-4 text-xs">
                <div>
                  <p className="font-bold text-dark-400 uppercase tracking-widest text-[9px] mb-2">How to maintain:</p>
                  <ul className="space-y-2 text-dark-700">
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500 text-sm">✓</span>
                      <span>Answer at least 1 MCQ correctly</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500 text-sm">✓</span>
                      <span>OR complete a mock test</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-dark-100">
                  <p className="font-bold text-dark-400 uppercase tracking-widest text-[9px] mb-2">Reset condition:</p>
                  <div className="flex items-start gap-2 bg-rose-50 border border-rose-100 rounded-xl p-3 text-rose-800">
                    <span className="text-sm">⚠</span>
                    <span>No study activity for a full day resets your streak to 0.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
