
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Topics() {
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
<div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8" style={{"background":"radial-gradient(ellipse 60% 40% at 30% 0%,rgba(99,102,241,0.08) 0%,transparent 55%)"}}>
<div className="max-w-5xl mx-auto pb-24 space-y-6">

  {/*  Dynamic Subject Header  */}
  <div id="subject-header" className="rounded-[2rem] p-8 relative overflow-hidden" style={{"background":"linear-gradient(135deg,rgba(99,102,241,0.15),rgba(20,29,46,0.98))","border":"1px solid rgba(99,102,241,0.35)"}}>
    <div className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-10" style={{"transform":"translate(30%,-30%)"}}></div>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
      <div className="flex items-center gap-5">
        <div id="subj-icon" className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0" style={{"background":"rgba(99,102,241,0.15)","border":"1px solid rgba(99,102,241,0.3)","color":"#818cf8"}}>
          <i className="fa-solid fa-book"></i>
        </div>
        <div>
          <div className="text-[10px] font-black text-brand-400 uppercase tracking-[0.2em] mb-1">WPSIPro Syllabus</div>
          <h2 id="subj-name" className="text-3xl font-heading font-black text-white leading-tight">Loading...</h2>
          <p id="subj-meta" className="text-xs text-slate-400 mt-1 font-medium"></p>
        </div>
      </div>
      <div className="flex gap-3">
        <Link href="/practice?mode=full" className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95" style={{"background":"linear-gradient(135deg,#6366f1,#8b5cf6)","boxShadow":"0 10px 20px rgba(99,102,241,0.25)"}}>
          <i className="fa-solid fa-bolt mr-2"></i>Full Practice
        </Link>
      </div>
    </div>
    
    <div className="flex flex-wrap gap-4 mt-8 relative z-10 border-t border-white/5 pt-6">
      <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-400 bg-white/5 px-4 py-2 rounded-xl">
        <i className="fa-solid fa-layer-group text-brand-400"></i>
        <span id="subj-chapters">— Chapters</span>
      </div>
      <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-400 bg-white/5 px-4 py-2 rounded-xl">
        <i className="fa-solid fa-list-check text-accent"></i>
        <span id="subj-mcqs">— Expected MCQs</span>
      </div>
      <div className="flex items-center gap-2.5 text-[11px] font-bold text-warning bg-warning/5 px-4 py-2 rounded-xl border border-warning/10">
        <i className="fa-solid fa-crown"></i>
        <span>Part A+B Combo Available</span>
      </div>
    </div>
  </div>

  {/*  Strategic Upsell Banners  */}
  <div id="pricing-combos" className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>

  {/*  Topics List  */}
  <div className="space-y-4">
    <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-brand-500 rounded-full"></div>
            <h3 className="font-heading font-black text-white text-lg tracking-tight">Curriculum Breakdown</h3>
        </div>
        <span id="topics-count" className="text-[10px] font-black text-slate-500 uppercase tracking-widest"></span>
    </div>
    
    <div id="topics-list" className="space-y-3"></div>
  </div>

  {/*  Strategy Note  */}
  <div className="rounded-2xl p-6 bg-white/5 border border-dashed border-white/10 text-center">
    <p className="text-xs text-slate-500 italic">"Study systematically. 18 topics × ₹9 = ₹162, but buying the Full Combo is much smarter and cheaper."</p>
  </div>

</div>
</div>
</main>







    </>
  );
}
