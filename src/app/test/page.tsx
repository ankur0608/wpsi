"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Test() {
  const [mockTests, setMockTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="-m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8 min-h-full" style={{"background":"radial-gradient(ellipse 70% 40% at 80% 0%,rgba(239,68,68,0.07) 0%,transparent 60%),radial-gradient(ellipse 50% 30% at 20% 100%,rgba(99,102,241,0.06) 0%,transparent 50%)"}}>
      <div className="max-w-5xl mx-auto pb-24 space-y-8">

        {/* Hero */}
        <div className="rounded-2xl p-6 md:p-8 relative overflow-hidden" style={{"background":"linear-gradient(135deg,rgba(239,68,68,0.1),var(--bg-surface))","border":"1px solid rgba(239,68,68,0.2)"}}>
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-20" style={{"background":"radial-gradient(circle,#ef4444,transparent)","transform":"translate(40%,-40%)"}}></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{"background":"rgba(239,68,68,0.15)","border":"1px solid rgba(239,68,68,0.3)"}}>
              <i className="fa-solid fa-stopwatch text-danger"></i>
            </div>
            <div>
              <div className="text-xs font-bold text-danger uppercase tracking-widest mb-1">Exam Simulation</div>
              <h2 className="text-2xl font-heading font-bold text-[var(--text-primary)]">Full-Length Mock Tests</h2>
            </div>
          </div>
          <p className="text-[var(--text-muted)] text-sm max-w-2xl relative z-10 leading-relaxed">Experience the exact WPSI exam environment. Realistic negative marking (−0.25), strict time limits, and auto-submit — just like the real exam.</p>
          <div className="flex flex-wrap gap-4 mt-4 relative z-10">
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"><i className="fa-solid fa-circle-check text-accent"></i>Anti-Tab Violation</div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"><i className="fa-solid fa-circle-check text-accent"></i>Auto Submit on Time</div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"><i className="fa-solid fa-circle-check text-accent"></i>Topic-wise Analysis</div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"><i className="fa-solid fa-circle-check text-accent"></i>Detailed Review</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(239,68,68,0.08)","border":"1px solid rgba(239,68,68,0.2)"}}>
            <i className="fa-solid fa-file-signature text-danger"></i>
            <div><div className="text-lg font-bold text-[var(--text-primary)] font-mono">1</div><div className="text-[10px] text-[var(--text-muted)] uppercase">Available</div></div>
          </div>
          <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(245,158,11,0.08)","border":"1px solid rgba(245,158,11,0.2)"}}>
            <i className="fa-solid fa-clock text-warning"></i>
            <div><div className="text-lg font-bold text-[var(--text-primary)] font-mono">15m</div><div className="text-[10px] text-[var(--text-muted)] uppercase">Per Test</div></div>
          </div>
          <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(99,102,241,0.08)","border":"1px solid rgba(99,102,241,0.2)"}}>
            <i className="fa-solid fa-circle-question text-brand-400"></i>
            <div><div className="text-lg font-bold text-[var(--text-primary)] font-mono">20</div><div className="text-[10px] text-[var(--text-muted)] uppercase">Questions</div></div>
          </div>
          <div className="rounded-xl p-4 flex items-center gap-3" style={{"background":"rgba(16,185,129,0.08)","border":"1px solid rgba(16,185,129,0.2)"}}>
            <i className="fa-solid fa-minus-circle text-accent"></i>
            <div><div className="text-lg font-bold text-[var(--text-primary)] font-mono">−0.25</div><div className="text-[10px] text-[var(--text-muted)] uppercase">Negative</div></div>
          </div>
        </div>

        {/* Test List */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-3" style={{"borderBottom":"1px solid rgba(255,255,255,0.07)"}}>
            <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2"><i className="fa-solid fa-clipboard-list text-[var(--text-muted)] text-sm"></i>Available Tests</h3>
            <span className="text-xs text-[var(--text-muted)]">{mockTests.length} Tests Available</span>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12 text-[var(--text-muted)]">Loading mock tests...</div>
          ) : mockTests.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-muted)]">No mock tests available at the moment. Check back later!</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {mockTests.map((test, index) => (
                <div key={test.id} className="rounded-2xl p-5 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1" style={{"background":"var(--glass-card-bg)","border":"1px solid rgba(239,68,68,0.35)","boxShadow":"0 0 30px rgba(239,68,68,0.06)"}}>
                  {index === 0 && (
                    <div className="absolute top-0 right-0 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider" style={{"background":"rgba(239,68,68,0.9)","color":"white"}}>NEW</div>
                  )}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{"background":"rgba(239,68,68,0.12)","border":"1px solid rgba(239,68,68,0.25)","color":"#ef4444"}}>
                      <i className="fa-solid fa-file-signature"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[var(--text-primary)] mb-0.5">{test.title}</h4>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-1">{test.description || 'Full syllabus simulation'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    <div className="text-center rounded-lg py-2" style={{"background":"var(--input-bg)","border":"1px solid rgba(255,255,255,0.06)"}}>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-0.5">Questions</div>
                      <div className="text-[var(--text-primary)] font-bold text-sm">{test._count?.questions || test.totalQuestions} MCQs</div>
                    </div>
                    <div className="text-center rounded-lg py-2" style={{"background":"var(--input-bg)","border":"1px solid rgba(255,255,255,0.06)"}}>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-0.5">Duration</div>
                      <div className="font-bold text-sm text-warning">{test.durationMinutes || 15} Mins</div>
                    </div>
                    <div className="text-center rounded-lg py-2" style={{"background":"var(--input-bg)","border":"1px solid rgba(255,255,255,0.06)"}}>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-0.5">Marking</div>
                      <div className="font-bold text-sm text-danger">−0.25</div>
                    </div>
                  </div>
                  <Link href={`/practice?mode=mock&testId=${test.id}&auto=true`} className="flex items-center justify-center w-full py-3 rounded-xl font-bold text-sm text-[var(--text-primary)] transition-all" style={{"background":"linear-gradient(135deg,#ef4444,#dc2626)","boxShadow":"0 0 20px rgba(239,68,68,0.25)"}}>
                    Start Mock Test <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How it Works */}
        <div className="rounded-2xl p-6" style={{"background":"var(--bg-surface)","border":"1px solid rgba(255,255,255,0.07)"}}>
          <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"><i className="fa-solid fa-circle-info text-brand-400 text-sm"></i>How Mock Tests Work</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 font-bold text-brand-400" style={{"background":"rgba(99,102,241,0.15)","border":"1px solid rgba(99,102,241,0.2)"}}>1</div>
              <div><div className="text-sm font-bold text-[var(--text-primary)] mb-0.5">Start Test</div><div className="text-xs text-[var(--text-muted)]">20 randomized MCQs from all subjects</div></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 font-bold text-warning" style={{"background":"rgba(245,158,11,0.15)","border":"1px solid rgba(245,158,11,0.2)"}}>2</div>
              <div><div className="text-sm font-bold text-[var(--text-primary)] mb-0.5">Answer in 15 Mins</div><div className="text-xs text-[var(--text-muted)]">Tab switching triggers auto-submission</div></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 font-bold text-accent" style={{"background":"rgba(16,185,129,0.15)","border":"1px solid rgba(16,185,129,0.2)"}}>3</div>
              <div><div className="text-sm font-bold text-[var(--text-primary)] mb-0.5">View Results</div><div className="text-xs text-[var(--text-muted)]">Score, accuracy, topic-wise breakdown</div></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
