
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Test() {
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
<div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8" style={{"background":"radial-gradient(ellipse 70% 40% at 80% 0%,rgba(239,68,68,0.07) 0%,transparent 60%),radial-gradient(ellipse 50% 30% at 20% 100%,rgba(99,102,241,0.06) 0%,transparent 50%)"}}>
<div className="max-w-5xl mx-auto pb-24 space-y-8">

  {/*  Hero  */}
  <div className="rounded-2xl p-6 md:p-8 relative overflow-hidden" style={{"background":"linear-gradient(135deg,rgba(239,68,68,0.1),rgba(20,29,46,0.9))","border":"1px solid rgba(239,68,68,0.2)"}}>
    <div className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-20" style={{"transform":"translate(40%,-40%)"}}></div>
    <div className="flex items-center gap-4 mb-4 relative z-10">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{"background":"rgba(239,68,68,0.15)","border":"1px solid rgba(239,68,68,0.3)"}}>
        <i className="fa-solid fa-stopwatch text-danger"></i>
      </div>
      <div>
        <div className="text-xs font-bold text-danger uppercase tracking-widest mb-1">Exam Simulation</div>
        <h2 className="text-2xl font-heading font-bold text-white">Full-Length Mock Tests</h2>
      </div>
    </div>
    <p className="text-slate-400 text-sm max-w-2xl relative z-10 leading-relaxed">Experience the exact WPSI exam environment. Realistic negative marking (−0.25), strict time limits, and auto-submit — just like the real exam.</p>
    <div className="flex flex-wrap gap-4 mt-4 relative z-10">
      <div className="flex items-center gap-2 text-xs text-slate-300"><i className="fa-solid fa-circle-check text-accent"></i>Anti-Tab Violation</div>
      <div className="flex items-center gap-2 text-xs text-slate-300"><i className="fa-solid fa-circle-check text-accent"></i>Auto Submit on Time</div>
      <div className="flex items-center gap-2 text-xs text-slate-300"><i className="fa-solid fa-circle-check text-accent"></i>Topic-wise Analysis</div>
      <div className="flex items-center gap-2 text-xs text-slate-300"><i className="fa-solid fa-circle-check text-accent"></i>Detailed Review</div>
    </div>
  </div>

  {/*  Stats  */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(239,68,68,0.08)","border":"1px solid rgba(239,68,68,0.2)"}}>
      <i className="fa-solid fa-file-signature text-danger"></i>
      <div><div className="text-lg font-bold text-white font-mono">1</div><div className="text-[10px] text-slate-400 uppercase">Available</div></div>
    </div>
    <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(245,158,11,0.08)","border":"1px solid rgba(245,158,11,0.2)"}}>
      <i className="fa-solid fa-clock text-warning"></i>
      <div><div className="text-lg font-bold text-white font-mono">15m</div><div className="text-[10px] text-slate-400 uppercase">Per Test</div></div>
    </div>
    <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(99,102,241,0.08)","border":"1px solid rgba(99,102,241,0.2)"}}>
      <i className="fa-solid fa-circle-question text-brand-400"></i>
      <div><div className="text-lg font-bold text-white font-mono">20</div><div className="text-[10px] text-slate-400 uppercase">Questions</div></div>
    </div>
    <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(16,185,129,0.08)","border":"1px solid rgba(16,185,129,0.2)"}}>
      <i className="fa-solid fa-minus-circle text-accent"></i>
      <div><div className="text-lg font-bold text-white font-mono">−0.25</div><div className="text-[10px] text-slate-400 uppercase">Negative</div></div>
    </div>
  </div>

  {/*  Test List  */}
  <div>
    <div className="flex items-center justify-between mb-4 pb-3" style={{"borderBottom":"1px solid rgba(255,255,255,0.07)"}}>
      <h3 className="font-bold text-white flex items-center gap-2"><i className="fa-solid fa-clipboard-list text-slate-400 text-sm"></i>Available Tests</h3>
      <span className="text-xs text-slate-500">1 of 10 Unlocked</span>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

      {/*  Test 1  */}
      <div className="rounded-2xl p-5 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1" style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.95),rgba(11,15,26,0.95))","border":"1px solid rgba(239,68,68,0.35)","boxShadow":"0 0 30px rgba(239,68,68,0.06)"}}>
        <div className="absolute top-0 right-0 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider" style={{"background":"rgba(239,68,68,0.9)","color":"white"}}>NEW</div>
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{"background":"rgba(239,68,68,0.12)","border":"1px solid rgba(239,68,68,0.25)","color":"#ef4444"}}>
            <i className="fa-solid fa-file-signature"></i>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-0.5">Mock Test — 1</h4>
            <p className="text-xs text-slate-400">All topics mixed · Full syllabus simulation</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="text-center rounded-lg py-2" style={{"background":"rgba(8,12,24,0.6)","border":"1px solid rgba(255,255,255,0.06)"}}>
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-0.5">Questions</div>
            <div className="text-white font-bold text-sm">20 MCQs</div>
          </div>
          <div className="text-center rounded-lg py-2" style={{"background":"rgba(8,12,24,0.6)","border":"1px solid rgba(255,255,255,0.06)"}}>
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-0.5">Duration</div>
            <div className="font-bold text-sm text-warning">15 Mins</div>
          </div>
          <div className="text-center rounded-lg py-2" style={{"background":"rgba(8,12,24,0.6)","border":"1px solid rgba(255,255,255,0.06)"}}>
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-0.5">Marking</div>
            <div className="font-bold text-sm text-danger">−0.25</div>
          </div>
        </div>
        <Link href="/practice?mode=mock&diff=easy,medium,hard&subject=all" className="flex items-center justify-center w-full py-3 rounded-xl font-bold text-sm text-white transition-all" style={{"background":"linear-gradient(135deg,#ef4444,#dc2626)","boxShadow":"0 0 20px rgba(239,68,68,0.25)"}}>
          Start Mock Test <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
        </Link>
      </div>

      {/*  Test 2 Locked  */}
      <div className="rounded-2xl p-5 relative overflow-hidden opacity-60" style={{"background":"rgba(20,29,46,0.7)","border":"1px solid rgba(255,255,255,0.06)"}}>
        <div className="absolute inset-0 flex items-center justify-center z-10" style={{"backdropFilter":"blur(2px)"}}>
          <div className="px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2" style={{"background":"rgba(20,29,46,0.95)","border":"1px solid rgba(255,255,255,0.1)"}}>
            <i className="fa-solid fa-lock text-slate-400"></i> Unlocks Tomorrow
          </div>
        </div>
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{"background":"rgba(255,255,255,0.04)","border":"1px solid rgba(255,255,255,0.06)"}}>
            <i className="fa-solid fa-file-signature text-slate-500"></i>
          </div>
          <div><h4 className="font-bold text-lg text-slate-400 mb-0.5">Mock Test — 2</h4><p className="text-xs text-slate-600">All topics mixed · Full syllabus simulation</p></div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="text-center rounded-lg py-2" style={{"background":"rgba(8,12,24,0.4)"}}><div className="text-[10px] text-slate-600 uppercase font-bold mb-0.5">Questions</div><div className="text-slate-500 font-bold text-sm">20 MCQs</div></div>
          <div className="text-center rounded-lg py-2" style={{"background":"rgba(8,12,24,0.4)"}}><div className="text-[10px] text-slate-600 uppercase font-bold mb-0.5">Duration</div><div className="text-slate-500 font-bold text-sm">15 Mins</div></div>
          <div className="text-center rounded-lg py-2" style={{"background":"rgba(8,12,24,0.4)"}}><div className="text-[10px] text-slate-600 uppercase font-bold mb-0.5">Marking</div><div className="text-slate-500 font-bold text-sm">−0.25</div></div>
        </div>
        <button className="w-full py-3 rounded-xl font-bold text-sm text-slate-600 cursor-not-allowed" style={{"background":"rgba(255,255,255,0.03)","border":"1px solid rgba(255,255,255,0.06)"}}>Locked</button>
      </div>

    </div>
  </div>

  {/*  How it Works  */}
  <div className="rounded-2xl p-6" style={{"background":"rgba(20,29,46,0.6)","border":"1px solid rgba(255,255,255,0.07)"}}>
    <h3 className="font-bold text-white mb-4 flex items-center gap-2"><i className="fa-solid fa-circle-info text-brand-400 text-sm"></i>How Mock Tests Work</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 font-bold text-brand-400" style={{"background":"rgba(99,102,241,0.15)","border":"1px solid rgba(99,102,241,0.2)"}}>1</div>
        <div><div className="text-sm font-bold text-white mb-0.5">Start Test</div><div className="text-xs text-slate-400">20 randomized MCQs from all subjects</div></div>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 font-bold text-warning" style={{"background":"rgba(245,158,11,0.15)","border":"1px solid rgba(245,158,11,0.2)"}}>2</div>
        <div><div className="text-sm font-bold text-white mb-0.5">Answer in 15 Mins</div><div className="text-xs text-slate-400">Tab switching triggers auto-submission</div></div>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 font-bold text-accent" style={{"background":"rgba(16,185,129,0.15)","border":"1px solid rgba(16,185,129,0.2)"}}>3</div>
        <div><div className="text-sm font-bold text-white mb-0.5">View Results</div><div className="text-xs text-slate-400">Score, accuracy, topic-wise breakdown</div></div>
      </div>
    </div>
  </div>

</div>
</div>
</main>





    </>
  );
}
