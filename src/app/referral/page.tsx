
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Referral() {
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
      

    <div className="hero-glow -top-20 -left-20"></div>
    <div className="hero-glow bottom-0 right-0" style={{"background":"radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)"}}></div>

    <div className="max-w-md w-full space-y-8 text-center">
        {/*  Brand  */}
        <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-500/20" style={{"background":"linear-gradient(135deg,#6366f1,#8b5cf6)"}}>
                <i className="fa-solid fa-graduation-cap text-white text-xl"></i>
            </div>
            <span className="font-heading font-black text-3xl tracking-tighter text-white">WPSI<span className="text-brand-400">Pro</span></span>
        </div>

        {/*  Referral Message  */}
        <div className="glass p-10 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full"></div>
            
            <div className="mb-8">
                <img src="https://ui-avatars.com/api/?name=Rahul+Parmar&background=1e293b&color=818cf8&bold=true&size=100" className="w-20 h-20 rounded-[1.5rem] mx-auto border-4 border-dark-bg shadow-xl mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Rahul Parmar invited you!</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-[10px] font-black uppercase rounded-full border border-accent/20">Exclusive Referral Offer</div>
            </div>

            <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 text-left p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0"><i className="fa-solid fa-tag"></i></div>
                    <div>
                        <div className="text-sm font-bold text-white">₹30 Flat Discount</div>
                        <p className="text-[10px] text-slate-400">Auto-applied on your first purchase.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 text-left p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0"><i className="fa-solid fa-coins"></i></div>
                    <div>
                        <div className="text-sm font-bold text-white">100 Bonus WPSICoins</div>
                        <p className="text-[10px] text-slate-400">Instantly credited to unlock your first chapter.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 text-left p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-warning/20 text-warning flex items-center justify-center shrink-0"><i className="fa-solid fa-book-open"></i></div>
                    <div>
                        <div className="text-sm font-bold text-white">2 Free Chapters</div>
                        <p className="text-[10px] text-slate-400">Double the standard trial content.</p>
                    </div>
                </div>
            </div>

            {/*  Exam Urgency  */}
            <div className="mb-10 p-4 rounded-2xl bg-danger/10 border border-danger/20 text-center">
                <div className="text-[10px] font-black text-danger uppercase tracking-[0.2em] mb-1">Exam Countdown</div>
                <div className="text-lg font-black text-white">June 21 — 35 Days Left</div>
            </div>

            <a href="/register" className="block w-full py-5 bg-brand-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all">Claim Rewards & Sign Up Free</a>
        </div>

        <p className="text-[10px] text-slate-500 font-medium">Already have an account? <a href="/login" className="text-brand-400 font-bold hover:underline">Log in here</a></p>
    </div>


    </>
  );
}
