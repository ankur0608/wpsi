
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Streaks() {
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
    <>
      

<main id="nav-main-wrapper" className="flex-1 flex flex-col h-screen overflow-hidden bg-dark-bg">
{/* <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8" style={{"background":"radial-gradient(circle at 50% -20%, rgba(249,115,22,0.15), transparent 70%), radial-gradient(circle at 0% 100%, rgba(99,102,241,0.05), transparent 40%)"}}>
    <div className="max-w-4xl mx-auto pb-24 space-y-8">
        <div className="text-center py-12 rounded-[2rem] relative overflow-hidden group" style={{"background":"linear-gradient(145deg, rgba(20,29,46,0.9), rgba(11,15,26,0.98))","border":"1px solid rgba(249,115,22,0.25)","boxShadow":"0 25px 50px -12px rgba(0,0,0,0.5)"}}>
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-500/10 blur-[100px] rounded-full transition-all duration-700 group-hover:bg-orange-500/15"></div>
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-brand-500/5 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-[2rem] mb-6 rotate-12 transition-transform duration-500 group-hover:rotate-0" style={{"background":"rgba(249,115,22,0.12)","border":"1px solid rgba(249,115,22,0.3)","boxShadow":"0 0 40px rgba(249,115,22,0.15)"}}>
                    <i className="fa-solid fa-fire text-6xl text-orange-500 filter drop-shadow-[0_0_15px_rgba(249,115,22,0.6)] animate-bounce"></i>
                </div>
                <div className="relative inline-block">
                    <h2 className="text-7xl font-heading font-black text-white mb-2 tracking-tighter drop-shadow-2xl">17</h2>
                    <div className="absolute -right-4 -top-2 w-3 h-3 rounded-full bg-orange-500 animate-ping"></div>
                </div>
                <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 uppercase tracking-[0.2em]">Day Streak!</p>
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-4 mb-6 opacity-50"></div>
                <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">Impressive consistency, <span className="text-white font-bold">Rahul Parmar</span>! You're in the top 5% of learners this month. Keep the flame alive!</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-[1.5rem] p-6 bg-dark-card/60 backdrop-blur-md border border-white/5 flex items-center gap-5 transition-all hover:border-orange-500/30 group">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-2xl transition-transform group-hover:scale-110 shadow-lg">
                    <i className="fa-solid fa-trophy"></i>
                </div>
                <div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Personal Best</div>
                    <div className="text-2xl font-mono font-bold text-white">24 <span className="text-xs font-sans text-slate-500 font-normal">Days</span></div>
                </div>
            </div>
            <div className="rounded-[1.5rem] p-6 bg-dark-card/60 backdrop-blur-md border border-white/5 flex items-center gap-5 transition-all hover:border-cyan-500/30 group">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 text-2xl transition-transform group-hover:scale-110 shadow-lg">
                    <i className="fa-solid fa-snowflake"></i>
                </div>
                <div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Streak Freezes</div>
                    <div className="text-2xl font-mono font-bold text-white">00 <span className="text-xs font-sans text-slate-500 font-normal">Left</span></div>
                </div>
            </div>
            <div className="rounded-[1.5rem] p-6 bg-dark-card/60 backdrop-blur-md border border-white/5 flex items-center gap-5 transition-all hover:border-brand-500/30 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500 text-2xl transition-transform group-hover:scale-110 shadow-lg">
                    <i className="fa-solid fa-calendar-check"></i>
                </div>
                <div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Active Days</div>
                    <div className="text-2xl font-mono font-bold text-white">142 <span className="text-xs font-sans text-slate-500 font-normal">Days</span></div>
                </div>
            </div>
        </div>

        <div className="rounded-2xl p-8 bg-dark-card border border-white/5">
            <h3 className="text-lg font-bold text-white mb-6">This Week</h3>
            <div className="flex justify-between items-center gap-2">
                
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all" 
                             style={{"background":"rgba(245,158,11,0.2)","borderColor":"#f59e0b","color":"#f59e0b"}}>
                            <i className="fa-solid fa-fire text-sm "></i>
                        </div>
                        <span className="text-xs font-bold text-white">Mon</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all" 
                             style={{"background":"rgba(245,158,11,0.2)","borderColor":"#f59e0b","color":"#f59e0b"}}>
                            <i className="fa-solid fa-fire text-sm "></i>
                        </div>
                        <span className="text-xs font-bold text-white">Tue</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all" 
                             style={{"background":"rgba(245,158,11,0.2)","borderColor":"#f59e0b","color":"#f59e0b"}}>
                            <i className="fa-solid fa-fire text-sm "></i>
                        </div>
                        <span className="text-xs font-bold text-white">Wed</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all" 
                             style={{"background":"rgba(245,158,11,0.2)","borderColor":"#f59e0b","color":"#f59e0b"}}>
                            <i className="fa-solid fa-fire text-sm "></i>
                        </div>
                        <span className="text-xs font-bold text-white">Thu</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all" 
                             style={{"background":"rgba(245,158,11,0.2)","borderColor":"#f59e0b","color":"#f59e0b"}}>
                            <i className="fa-solid fa-fire text-sm "></i>
                        </div>
                        <span className="text-xs font-bold text-white">Fri</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all" 
                             style={{"background":"rgba(255,255,255,0.03)","borderColor":"rgba(255,255,255,0.05)","color":"#475569"}}>
                            <i className="fa-solid fa-fire text-sm opacity-30"></i>
                        </div>
                        <span className="text-xs font-bold text-slate-600">Sat</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all" 
                             style={{"background":"rgba(255,255,255,0.03)","borderColor":"rgba(255,255,255,0.05)","color":"#475569"}}>
                            <i className="fa-solid fa-fire text-sm opacity-30"></i>
                        </div>
                        <span className="text-xs font-bold text-slate-600">Sun</span>
                    </div>
            </div>
        </div>

        <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6" style={{"background":"linear-gradient(90deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))","border":"1px solid rgba(99,102,241,0.2)"}}>
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center text-brand-400 text-2xl">
                    <i className="fa-solid fa-gift"></i>
                </div>
                <div>
                    <h4 className="font-bold text-white">Reach 20 Days to Unlock!</h4>
                    <p className="text-xs text-slate-400">Unlock a special Silver Badge and 500 bonus points.</p>
                </div>
            </div>
            <a href="/subjects" className="px-8 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105" style={{"background":"linear-gradient(135deg, #6366f1, #8b5cf6)","boxShadow":"0 4px 15px rgba(99,102,241,0.3)"}}>Continue Practice</a>
        </div>
    </div>
</div> */}
</main>





    </>
  );
}
