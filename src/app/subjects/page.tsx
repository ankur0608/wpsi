
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Subjects() {
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
<div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8 relative" style={{"background":"radial-gradient(ellipse 80% 50% at 20% -10%,rgba(99,102,241,0.08) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 100%,rgba(139,92,246,0.06) 0%,transparent 50%)"}}>
<div className="max-w-7xl mx-auto pb-20">

  {/*  Header  */}
  <div className="mb-8">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg" style={{"background":"linear-gradient(135deg,#6366f1,#8b5cf6)"}}><i className="fa-solid fa-book-open"></i></div>
          <div>
            <p className="text-xs font-bold text-brand-400 uppercase tracking-widest">WPSI Exam 2025</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">Complete Curriculum</h2>
          </div>
        </div>
        <p className="text-slate-400 text-sm ml-13">200 Marks Total &nbsp;·&nbsp; 15 Subjects &nbsp;·&nbsp; 1800+ MCQs</p>
      </div>
      <div className="relative w-full md:w-72">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
        <input type="text" placeholder="Search subjects..." className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-all" style={{"background":"rgba(20,29,46,0.8)","border":"1px solid rgba(255,255,255,0.08)"}} onFocus={() => {}} onBlur={() => {}} />
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
      <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(99,102,241,0.08)","border":"1px solid rgba(99,102,241,0.2)"}}><div className="w-9 h-9 rounded-lg flex items-center justify-center text-brand-400 shrink-0" style={{"background":"rgba(99,102,241,0.15)"}}><i className="fa-solid fa-layer-group text-sm"></i></div><div><div className="text-lg font-bold text-white font-mono">15</div><div className="text-[10px] text-slate-400 uppercase font-semibold">Subjects</div></div></div>
      <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(16,185,129,0.08)","border":"1px solid rgba(16,185,129,0.2)"}}><div className="w-9 h-9 rounded-lg flex items-center justify-center text-accent shrink-0" style={{"background":"rgba(16,185,129,0.15)"}}><i className="fa-solid fa-list-check text-sm"></i></div><div><div className="text-lg font-bold text-white font-mono">1800+</div><div className="text-[10px] text-slate-400 uppercase font-semibold">MCQs</div></div></div>
      <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(245,158,11,0.08)","border":"1px solid rgba(245,158,11,0.2)"}}><div className="w-9 h-9 rounded-lg flex items-center justify-center text-warning shrink-0" style={{"background":"rgba(245,158,11,0.15)"}}><i className="fa-solid fa-trophy text-sm"></i></div><div><div className="text-lg font-bold text-white font-mono">200</div><div className="text-[10px] text-slate-400 uppercase font-semibold">Total Marks</div></div></div>
      <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(139,92,246,0.08)","border":"1px solid rgba(139,92,246,0.2)"}}><div className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary shrink-0" style={{"background":"rgba(139,92,246,0.15)"}}><i className="fa-solid fa-chart-line text-sm"></i></div><div><div className="text-lg font-bold text-white font-mono">8%</div><div className="text-[10px] text-slate-400 uppercase font-semibold">Progress</div></div></div>
    </div>
  </div>

  {/*  Part A  */}
  <div className="mb-10">
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 rounded-full" style={{"background":"linear-gradient(180deg,#6366f1,#818cf8)"}}></div>
        <div><h3 className="text-lg font-heading font-bold text-white">Part A — General &amp; Aptitude</h3><p className="text-xs text-slate-500">80 Marks · 4 Subjects · 80 Questions</p></div>
      </div>
      <span className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{"background":"rgba(99,102,241,0.12)","color":"#818cf8","border":"1px solid rgba(99,102,241,0.25)"}}>80 Marks</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
<a href="topics.html?subject=Reasoning%20%26%20Data%20Interpretation" className="group block rounded-3xl p-6 relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.85),rgba(11,15,26,0.98))","border":"1px solid rgba(129,140,248,0.15)","boxShadow":"0 20px 50px -12px rgba(0,0,0,0.5)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-500/5 blur-3xl rounded-full group-hover:bg-brand-500/10 transition-all duration-700"></div>
  <div className="absolute top-0 right-0 text-[10px] font-black px-3 py-1.5 rounded-bl-2xl uppercase tracking-[0.15em] transition-all group-hover:bg-brand-500 group-hover:text-white" style={{"background":"rgba(129,140,248,0.15)","color":"#818cf8"}}>🔥 Popular</div>
  
  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-2xl" style={{"background":"linear-gradient(135deg,rgba(129,140,248,0.25),rgba(129,140,248,0.05))","border":"1px solid rgba(129,140,248,0.3)","color":"#818cf8"}}>
    <i className="fa-solid fa-brain filter drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]"></i>
  </div>
  
  <div className="flex items-center justify-between mb-2">
    <h4 className="font-heading font-bold text-white text-base leading-snug group-hover:text-brand-300 transition-colors">Reasoning & Data Interpretation</h4>
    <span className="text-[11px] font-black px-2.5 py-1 rounded-lg ml-3 shrink-0 border border-brand-500/20" style={{"background":"rgba(129,140,248,0.1)","color":"#818cf8"}}>25M</span>
  </div>
  
  <p className="text-[12px] text-slate-500 mb-5 font-medium">9 Chapters &nbsp;·&nbsp; 500+ MCQs</p>
  
  <div className="relative w-full rounded-full h-2 mb-3 bg-white/5 overflow-hidden">
    <div className="absolute inset-0 bg-brand-500/10 blur-sm"></div>
    <div className="h-full rounded-full transition-all duration-1000 relative" style={{"width":"35%"}}>
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
    </div>
  </div>
  
  <div className="flex justify-between items-center">
    <span className="text-[11px] font-bold text-slate-400">35% Progress</span>
    <span className="text-[11px] font-black text-brand-400 uppercase tracking-widest group-hover:translate-x-1 transition-transform">Continue <i className="fa-solid fa-arrow-right ml-1"></i></span>
  </div>
</a>
<a href="topics.html?subject=Quantitative%20Aptitude" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(16,185,129,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="absolute top-0 right-0 text-[9px] font-bold px-2.5 py-1 rounded-bl-xl uppercase tracking-wider" style={{"background":"rgba(16,185,129,0.15)","color":"#10b981"}}>⭐ High Weight</div>
  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110" style={{"background":"linear-gradient(135deg,rgba(16,185,129,0.25),rgba(16,185,129,0.1))","border":"1px solid rgba(16,185,129,0.3)","color":"#10b981"}}>
    <i className="fa-solid fa-calculator"></i>
  </div>
  <div className="flex items-center justify-between mb-1">
    <h4 className="font-bold text-white text-sm leading-tight group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Quantitative Aptitude</h4>
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md ml-2 shrink-0" style={{"background":"rgba(16,185,129,0.1)","color":"#10b981"}}>25M</span>
  </div>
  <p className="text-[11px] text-slate-500 mb-3">9 Chapters · 600+ MCQs</p>
  <div className="w-full rounded-full h-1.5 mb-2 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1.5 rounded-full transition-all duration-1000" style={{"width":"12%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-400">12% done</span>
    <span className="font-bold transition-colors" style={{"color":"#10b981"}}>Continue →</span>
  </div>
</a>
<a href="topics.html?subject=Constitution%20of%20India" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(245,158,11,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  
  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110" style={{"background":"linear-gradient(135deg,rgba(245,158,11,0.25),rgba(245,158,11,0.1))","border":"1px solid rgba(245,158,11,0.3)","color":"#f59e0b"}}>
    <i className="fa-solid fa-scale-balanced"></i>
  </div>
  <div className="flex items-center justify-between mb-1">
    <h4 className="font-bold text-white text-sm leading-tight group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Constitution of India</h4>
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md ml-2 shrink-0" style={{"background":"rgba(245,158,11,0.1)","color":"#f59e0b"}}>15M</span>
  </div>
  <p className="text-[11px] text-slate-500 mb-3">9 Chapters · 300+ MCQs</p>
  <div className="w-full rounded-full h-1.5 mb-2 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1.5 rounded-full transition-all duration-1000" style={{"width":"0%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500">Not Started</span>
    <span className="font-bold transition-colors" style={{"color":"#f59e0b"}}>Start ▶</span>
  </div>
</a>
<a href="topics.html?subject=Current%20Affairs%20%26%20General%20Knowledge" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(139,92,246,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="absolute top-0 right-0 text-[9px] font-bold px-2.5 py-1 rounded-bl-xl uppercase tracking-wider" style={{"background":"rgba(139,92,246,0.15)","color":"#8b5cf6"}}>⚡ Daily</div>
  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110" style={{"background":"linear-gradient(135deg,rgba(139,92,246,0.25),rgba(139,92,246,0.1))","border":"1px solid rgba(139,92,246,0.3)","color":"#8b5cf6"}}>
    <i className="fa-solid fa-globe"></i>
  </div>
  <div className="flex items-center justify-between mb-1">
    <h4 className="font-bold text-white text-sm leading-tight group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Current Affairs & General Knowledge</h4>
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md ml-2 shrink-0" style={{"background":"rgba(139,92,246,0.1)","color":"#8b5cf6"}}>15M</span>
  </div>
  <p className="text-[11px] text-slate-500 mb-3">7 Chapters · 400+ MCQs</p>
  <div className="w-full rounded-full h-1.5 mb-2 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1.5 rounded-full transition-all duration-1000" style={{"width":"0%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500">Not Started</span>
    <span className="font-bold transition-colors" style={{"color":"#8b5cf6"}}>Start ▶</span>
  </div>
</a>
    </div>
  </div>

  {/*  Part B  */}
  <div>
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 rounded-full" style={{"background":"linear-gradient(180deg,#06b6d4,#3b82f6)"}}></div>
        <div><h3 className="text-lg font-heading font-bold text-white">Part B — Technical Subjects</h3><p className="text-xs text-slate-500">120 Marks · 11 Subjects · 120 Questions · Min. 40%</p></div>
      </div>
      <span className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{"background":"rgba(6,182,212,0.12)","color":"#06b6d4","border":"1px solid rgba(6,182,212,0.25)"}}>120 Marks</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      
<a href="topics.html?subject=Electronics%20Components%2C%20Devices%20and%20Circuits" className="group block rounded-3xl p-6 relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.85),rgba(11,15,26,0.98))","border":"1px solid rgba(56,189,248,0.15)","boxShadow":"0 20px 50px -12px rgba(0,0,0,0.5)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-all duration-700"></div>
  
  <div className="flex items-center gap-4 mb-5">
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-2xl shrink-0" style={{"background":"linear-gradient(135deg,rgba(56,189,248,0.25),rgba(56,189,248,0.05))","border":"1px solid rgba(56,189,248,0.3)","color":"#38bdf8"}}>
      <i className="fa-solid fa-microchip filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{"color":"rgba(56,189,248,0.7)"}}>Core Technical</div>
      <h4 className="font-heading font-bold text-white text-sm leading-snug truncate group-hover:text-cyan-300 transition-colors">Electronics Components, Devices and Circuits</h4>
    </div>
  </div>
  
  <div className="flex items-center gap-4 text-[12px] text-slate-500 mb-5 font-medium">
    <span><i className="fa-solid fa-layer-group mr-1.5 opacity-70"></i>18 Topics</span>
    <span><i className="fa-solid fa-list-check mr-1.5 opacity-70"></i>350+ MCQs</span>
  </div>
  
  <div className="relative w-full rounded-full h-1.5 mb-4 bg-white/5 overflow-hidden">
    <div className="h-full rounded-full transition-all duration-1000" style={{"width":"0%"}}></div>
  </div>
  
  <div className="flex justify-between items-center">
    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Not Started</span>
    <span className="text-[11px] font-black text-cyan-400 uppercase tracking-widest group-hover:translate-x-1 transition-transform">Begin Session <i className="fa-solid fa-play ml-1.5 text-[9px]"></i></span>
  </div>
</a>
<a href="topics.html?subject=Digital%20Electronics%20%26%20VLSI" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(52,211,153,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="flex items-center gap-3 mb-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 shrink-0" style={{"background":"linear-gradient(135deg,rgba(52,211,153,0.25),rgba(52,211,153,0.1))","border":"1px solid rgba(52,211,153,0.3)","color":"#34d399"}}>
      <i className="fa-solid fa-code-branch"></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{"color":"rgba(52,211,153,0.7)"}}>Subject 02</div>
      <h4 className="font-bold text-white text-sm leading-tight truncate group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Digital Electronics & VLSI</h4>
    </div>
  </div>
  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
    <span><i className="fa-solid fa-layer-group mr-1"></i>14 Topics</span>
    <span><i className="fa-solid fa-list-check mr-1"></i>450+ MCQs</span>
  </div>
  <div className="w-full rounded-full h-1 mb-2.5 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1 rounded-full" style={{"width":"0%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500">Not Started</span>
    <span className="font-bold" style={{"color":"#34d399"}}>Start ▶</span>
  </div>
</a>
<a href="topics.html?subject=Electronics%20Networks%20and%20Instruments%20%26%20Measurements" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(251,191,36,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="flex items-center gap-3 mb-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 shrink-0" style={{"background":"linear-gradient(135deg,rgba(251,191,36,0.25),rgba(251,191,36,0.1))","border":"1px solid rgba(251,191,36,0.3)","color":"#fbbf24"}}>
      <i className="fa-solid fa-wave-square"></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{"color":"rgba(251,191,36,0.7)"}}>Subject 03</div>
      <h4 className="font-bold text-white text-sm leading-tight truncate group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Electronics Networks and Instruments & Measurements</h4>
    </div>
  </div>
  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
    <span><i className="fa-solid fa-layer-group mr-1"></i>14 Topics</span>
    <span><i className="fa-solid fa-list-check mr-1"></i>300+ MCQs</span>
  </div>
  <div className="w-full rounded-full h-1 mb-2.5 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1 rounded-full" style={{"width":"0%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500">Not Started</span>
    <span className="font-bold" style={{"color":"#fbbf24"}}>Start ▶</span>
  </div>
</a>
<a href="topics.html?subject=Communication%20Engineering" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(167,139,250,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="flex items-center gap-3 mb-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 shrink-0" style={{"background":"linear-gradient(135deg,rgba(167,139,250,0.25),rgba(167,139,250,0.1))","border":"1px solid rgba(167,139,250,0.3)","color":"#a78bfa"}}>
      <i className="fa-solid fa-satellite-dish"></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{"color":"rgba(167,139,250,0.7)"}}>Subject 04</div>
      <h4 className="font-bold text-white text-sm leading-tight truncate group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Communication Engineering</h4>
    </div>
  </div>
  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
    <span><i className="fa-solid fa-layer-group mr-1"></i>18 Topics</span>
    <span><i className="fa-solid fa-list-check mr-1"></i>550+ MCQs</span>
  </div>
  <div className="w-full rounded-full h-1 mb-2.5 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1 rounded-full" style={{"width":"0%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500">Not Started</span>
    <span className="font-bold" style={{"color":"#a78bfa"}}>Start ▶</span>
  </div>
</a>
<a href="topics.html?subject=Communication%20Applications" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(244,114,182,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="flex items-center gap-3 mb-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 shrink-0" style={{"background":"linear-gradient(135deg,rgba(244,114,182,0.25),rgba(244,114,182,0.1))","border":"1px solid rgba(244,114,182,0.3)","color":"#f472b6"}}>
      <i className="fa-solid fa-tower-cell"></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{"color":"rgba(244,114,182,0.7)"}}>Subject 05</div>
      <h4 className="font-bold text-white text-sm leading-tight truncate group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Communication Applications</h4>
    </div>
  </div>
  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
    <span><i className="fa-solid fa-layer-group mr-1"></i>4 Sections Topics</span>
    <span><i className="fa-solid fa-list-check mr-1"></i>400+ MCQs</span>
  </div>
  <div className="w-full rounded-full h-1 mb-2.5 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1 rounded-full" style={{"width":"0%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500">Not Started</span>
    <span className="font-bold" style={{"color":"#f472b6"}}>Start ▶</span>
  </div>
</a>
<a href="topics.html?subject=Microprocessors%20%26%20Microcontrollers" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(34,211,238,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="flex items-center gap-3 mb-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 shrink-0" style={{"background":"linear-gradient(135deg,rgba(34,211,238,0.25),rgba(34,211,238,0.1))","border":"1px solid rgba(34,211,238,0.3)","color":"#22d3ee"}}>
      <i className="fa-solid fa-memory"></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{"color":"rgba(34,211,238,0.7)"}}>Subject 06</div>
      <h4 className="font-bold text-white text-sm leading-tight truncate group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Microprocessors & Microcontrollers</h4>
    </div>
  </div>
  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
    <span><i className="fa-solid fa-layer-group mr-1"></i>12 Topics</span>
    <span><i className="fa-solid fa-list-check mr-1"></i>200+ MCQs</span>
  </div>
  <div className="w-full rounded-full h-1 mb-2.5 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1 rounded-full" style={{"width":"0%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500">Not Started</span>
    <span className="font-bold" style={{"color":"#22d3ee"}}>Start ▶</span>
  </div>
</a>
<a href="topics.html?subject=Computer%20Networks" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(129,140,248,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="flex items-center gap-3 mb-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 shrink-0" style={{"background":"linear-gradient(135deg,rgba(129,140,248,0.25),rgba(129,140,248,0.1))","border":"1px solid rgba(129,140,248,0.3)","color":"#818cf8"}}>
      <i className="fa-solid fa-network-wired"></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{"color":"rgba(129,140,248,0.7)"}}>Subject 07</div>
      <h4 className="font-bold text-white text-sm leading-tight truncate group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Computer Networks</h4>
    </div>
  </div>
  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
    <span><i className="fa-solid fa-layer-group mr-1"></i>10 Topics</span>
    <span><i className="fa-solid fa-list-check mr-1"></i>250+ MCQs</span>
  </div>
  <div className="w-full rounded-full h-1 mb-2.5 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1 rounded-full" style={{"width":"0%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500">Not Started</span>
    <span className="font-bold" style={{"color":"#818cf8"}}>Start ▶</span>
  </div>
</a>
<a href="topics.html?subject=Essentials%20of%20Network%20Security" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(248,113,113,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="flex items-center gap-3 mb-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 shrink-0" style={{"background":"linear-gradient(135deg,rgba(248,113,113,0.25),rgba(248,113,113,0.1))","border":"1px solid rgba(248,113,113,0.3)","color":"#f87171"}}>
      <i className="fa-solid fa-shield-halved"></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{"color":"rgba(248,113,113,0.7)"}}>Subject 08</div>
      <h4 className="font-bold text-white text-sm leading-tight truncate group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Essentials of Network Security</h4>
    </div>
  </div>
  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
    <span><i className="fa-solid fa-layer-group mr-1"></i>6 Topics</span>
    <span><i className="fa-solid fa-list-check mr-1"></i>150+ MCQs</span>
  </div>
  <div className="w-full rounded-full h-1 mb-2.5 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1 rounded-full" style={{"width":"0%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500">Not Started</span>
    <span className="font-bold" style={{"color":"#f87171"}}>Start ▶</span>
  </div>
</a>
<a href="topics.html?subject=Web%20Technology" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(251,146,60,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="flex items-center gap-3 mb-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 shrink-0" style={{"background":"linear-gradient(135deg,rgba(251,146,60,0.25),rgba(251,146,60,0.1))","border":"1px solid rgba(251,146,60,0.3)","color":"#fb923c"}}>
      <i className="fa-solid fa-code"></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{"color":"rgba(251,146,60,0.7)"}}>Subject 09</div>
      <h4 className="font-bold text-white text-sm leading-tight truncate group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Web Technology</h4>
    </div>
  </div>
  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
    <span><i className="fa-solid fa-layer-group mr-1"></i>15 Topics</span>
    <span><i className="fa-solid fa-list-check mr-1"></i>200+ MCQs</span>
  </div>
  <div className="w-full rounded-full h-1 mb-2.5 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1 rounded-full" style={{"width":"0%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500">Not Started</span>
    <span className="font-bold" style={{"color":"#fb923c"}}>Start ▶</span>
  </div>
</a>
<a href="topics.html?subject=Android%20Application%20Development" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(74,222,128,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="flex items-center gap-3 mb-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 shrink-0" style={{"background":"linear-gradient(135deg,rgba(74,222,128,0.25),rgba(74,222,128,0.1))","border":"1px solid rgba(74,222,128,0.3)","color":"#4ade80"}}>
      <i className="fa-brands fa-android"></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{"color":"rgba(74,222,128,0.7)"}}>Subject 10</div>
      <h4 className="font-bold text-white text-sm leading-tight truncate group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Android Application Development</h4>
    </div>
  </div>
  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
    <span><i className="fa-solid fa-layer-group mr-1"></i>9 Topics</span>
    <span><i className="fa-solid fa-list-check mr-1"></i>150+ MCQs</span>
  </div>
  <div className="w-full rounded-full h-1 mb-2.5 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1 rounded-full" style={{"width":"0%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500">Not Started</span>
    <span className="font-bold" style={{"color":"#4ade80"}}>Start ▶</span>
  </div>
</a>
<a href="topics.html?subject=Current%20Trends%20and%20Recent%20Advancements" className="group block rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
   style={{"background":"linear-gradient(145deg,rgba(20,29,46,0.9),rgba(11,15,26,0.95))","border":"1px solid rgba(250,204,21,0.15)"}}
   onMouseOver={() => {}}
   onMouseOut={() => {}}>
  <div className="flex items-center gap-3 mb-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 shrink-0" style={{"background":"linear-gradient(135deg,rgba(250,204,21,0.25),rgba(250,204,21,0.1))","border":"1px solid rgba(250,204,21,0.3)","color":"#facc15"}}>
      <i className="fa-solid fa-bolt"></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{"color":"rgba(250,204,21,0.7)"}}>Subject 11</div>
      <h4 className="font-bold text-white text-sm leading-tight truncate group-hover:transition-colors" style={{"transition":"color 0.2s"}} onMouseOver={() => {}} onMouseOut={() => {}}>Current Trends and Recent Advancements</h4>
    </div>
  </div>
  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
    <span><i className="fa-solid fa-layer-group mr-1"></i>5 Topics</span>
    <span><i className="fa-solid fa-list-check mr-1"></i>100+ MCQs</span>
  </div>
  <div className="w-full rounded-full h-1 mb-2.5 overflow-hidden" style={{"background":"rgba(255,255,255,0.05)"}}>
    <div className="h-1 rounded-full" style={{"width":"0%"}}></div>
  </div>
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-slate-500">Not Started</span>
    <span className="font-bold" style={{"color":"#facc15"}}>Start ▶</span>
  </div>
</a>
    </div>
  </div>

</div>
</div>
</main>





    </>
  );
}
