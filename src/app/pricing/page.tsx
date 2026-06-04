"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Plan {
  id?: string;
  name: string;
  price: number;
  discountPrice?: number | null;
  description?: string | null;
  features: string[];
  isPopular: boolean;
}

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/plans');
        const json = await res.json();
        if (json.data) {
          setPlans(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch plans', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <>
      

<main id="nav-main-wrapper" className="flex-1 flex flex-col h-screen overflow-hidden bg-[var(--bg-primary)]">
<div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8" style={{"background":"radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.15), transparent 70%)"}}>
<div className="max-w-6xl mx-auto pb-24 space-y-16">

    {/*  Premium Urgency Banner  */}
    <div className="relative rounded-[2.5rem] p-10 overflow-hidden border border-warning/20" style={{"background":"var(--glass-card-bg)"}}>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-warning/5 blur-[100px] rounded-full"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left space-y-4">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-warning text-[11px] font-black uppercase tracking-[0.2em]">
                    <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-warning"></span></span> Early Bird Phase Active
                </div>
                <h1 className="text-4xl sm:text-5xl font-heading font-black text-[var(--text-primary)] tracking-tight">WPSI Exam: <span className="text-warning">June 21, 2026</span></h1>
                <p className="text-[var(--text-muted)] font-medium text-lg">35 days remaining. <span className="text-[var(--text-primary)] font-bold underline decoration-warning/40 underline-offset-4">Price rises by up to ₹80 on June 2nd.</span></p>
            </div>
            
            <div className="flex gap-4">
                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-[var(--border-subtle)] min-w-[90px] text-center">
                    <div className="text-4xl font-black text-[var(--text-primary)] font-mono tracking-tighter">35</div>
                    <div className="text-[10px] text-[var(--text-muted)] uppercase font-black mt-2 tracking-widest">Days</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-[var(--border-subtle)] min-w-[90px] text-center">
                    <div className="text-4xl font-black text-[var(--text-primary)] font-mono tracking-tighter">18</div>
                    <div className="text-[10px] text-[var(--text-muted)] uppercase font-black mt-2 tracking-widest">Hours</div>
                </div>
            </div>
        </div>
    </div>

    {/*  Trust Markers  */}
    <div className="flex flex-wrap items-center justify-center gap-12">
        <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform"><i className="fa-solid fa-users"></i></div>
            <span className="text-[13px] font-bold text-[var(--text-muted)]">3,247 Aspirants Enrolled</span>
        </div>
        <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform"><i className="fa-solid fa-share-nodes"></i></div>
            <span className="text-[13px] font-bold text-[var(--text-muted)]">Refer & Save ₹30</span>
        </div>
        <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform"><i className="fa-solid fa-shield-check"></i></div>
            <span className="text-[13px] font-bold text-[var(--text-muted)]">Secure Payments</span>
        </div>
    </div>

    {/*  Referral Discount Applied (Conditional Style)  */}
    <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center gap-3 animate-pulse">
        <i className="fa-solid fa-gift text-accent"></i>
        <span className="text-[11px] font-black text-accent uppercase tracking-widest">Referral Bonus Applied: Extra ₹30 Discount at Checkout</span>
    </div>

    {/*  Core Decision Hub  */}
    <section className="space-y-12">
        <div className="text-center space-y-4">
            <h2 className="text-4xl font-heading font-black text-[var(--text-primary)]">One decision, zero confusion.</h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-base">Everything you need. One price. Zero regrets. Lock in your preparation today.</p>
        </div>

        {isLoading ? (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {plans.map((plan, index) => {
                    const isPopular = plan.isPopular;
                    const hoverColor = index % 2 !== 0 ? 'cyan' : 'brand';
                    
                    if (isPopular) {
                        return (
                            <div key={plan.id || index} className="relative rounded-[3rem] p-10 flex flex-col border-2 border-brand-500 shadow-[0_30px_60px_-15px_rgba(99,102,241,0.3)] transform lg:scale-110 lg:-translate-y-4 z-20" style={{"background":"var(--glass-card-bg)"}}>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-brand-500 text-[var(--text-primary)] text-[10px] font-black px-10 py-2.5 rounded-b-[1.5rem] uppercase tracking-[0.3em] shadow-[0_10px_20px_rgba(99,102,241,0.4)]">Most Popular</div>
                                
                                <div className="mb-8 mt-4">
                                    <span className="text-[10px] font-black text-brand-400 uppercase tracking-[0.25em] block mb-4">Full Preparation Suite</span>
                                    <h3 className="text-3xl font-heading font-black text-[var(--text-primary)] mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <span className="text-7xl font-black text-[var(--text-primary)] tracking-tighter">₹{plan.price}</span>
                                        {plan.discountPrice && (
                                            <span className="text-xl text-[var(--text-muted)] line-through font-bold">₹{plan.discountPrice}</span>
                                        )}
                                    </div>
                                    {plan.description && (
                                        <p className="text-sm font-medium text-[var(--text-secondary)] mb-4">{plan.description}</p>
                                    )}
                                    {plan.discountPrice && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-accent text-[11px] font-black uppercase tracking-widest">
                                            <i className="fa-solid fa-sparkles"></i> Save ₹{plan.discountPrice - plan.price} Today
                                        </div>
                                    )}
                                </div>

                                <ul className="space-y-5 mb-12 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-4 text-[var(--text-secondary)] font-medium">
                                            <i className="fa-solid fa-shield-check text-brand-400 text-xl"></i> {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full py-5 rounded-[1.5rem] bg-brand-500 text-[var(--text-primary)] font-black text-sm uppercase tracking-[0.25em] transition-all hover:bg-brand-600 hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_-10px_rgba(99,102,241,0.5)]">Enroll in Everything</button>
                            </div>
                        );
                    }

                    return (
                        <div key={plan.id || index} className={`glass-card rounded-[2.5rem] p-8 flex flex-col group transition-all duration-500 hover:border-${hoverColor}-500/30`}>
                            <div className="mb-8">
                                <span className={`text-[10px] font-black text-${hoverColor}-500 uppercase tracking-[0.25em] block mb-4`}>Specialized Pack</span>
                                <h3 className="text-2xl font-heading font-black text-[var(--text-primary)] mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-3 mb-4">
                                    <span className="text-5xl font-black text-[var(--text-primary)] tracking-tighter">₹{plan.price}</span>
                                    {plan.discountPrice && (
                                        <span className="text-lg text-[var(--text-muted)] line-through font-bold">₹{plan.discountPrice}</span>
                                    )}
                                </div>
                                {plan.description && (
                                    <p className={`text-sm font-medium text-${hoverColor}-300/80 leading-relaxed italic`}>"{plan.description}"</p>
                                )}
                            </div>
                            
                            <ul className="space-y-4 mb-10 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                                        <i className={`fa-solid fa-check-circle text-${hoverColor}-500`}></i> {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-2xl bg-white/5 border border-[var(--border-subtle)] text-[var(--text-primary)] font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-${hoverColor}-500 hover:border-${hoverColor}-500 cta-glow`}>Select Pack</button>
                        </div>
                    );
                })}
            </div>
        )}
    </section>

    {/*  Mock Simulation Section  */}
    <section className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
            <h3 className="text-3xl font-heading font-black text-[var(--text-primary)]">Simulation & Mocks</h3>
            <p className="text-[var(--text-muted)] font-medium">Practice under pressure. Succeed under stress.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/*  Single Mock  */}
            <div className="glass-card rounded-[2rem] p-8 group transition-all hover:border-[var(--border-subtle)]">
                <div className="flex justify-between items-start mb-8">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest block">Entry Point</span>
                        <h4 className="text-2xl font-bold text-[var(--text-primary)]">Single Mock Test</h4>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black text-[var(--text-primary)] font-mono">₹49</div>
                        <div className="text-xs text-[var(--text-muted)] line-through font-bold">₹99</div>
                    </div>
                </div>
                <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 text-sm text-[var(--text-muted)]"><i className="fa-solid fa-check-circle text-brand-400"></i> Full 200-question paper</li>
                    <li className="flex items-center gap-3 text-sm text-[var(--text-muted)]"><i className="fa-solid fa-check-circle text-brand-400"></i> Real-time rank generation</li>
                </ul>
                <button className="w-full py-4 rounded-xl border border-[var(--border-subtle)] text-[11px] font-black uppercase tracking-widest transition-all hover:bg-white/10">Unlock Single Test</button>
            </div>

            {/*  Pack of 3  */}
            <div className="rounded-[2.5rem] p-1 bg-gradient-to-br from-brand-500/40 to-brand-600/40 border border-brand-500/30">
                <div className="rounded-[2.3rem] p-8 h-full relative overflow-hidden" style={{"background":"var(--bg-surface)"}}>
                    <div className="absolute top-0 right-0 px-6 py-2 bg-brand-500 text-[var(--text-primary)] text-[9px] font-black uppercase tracking-widest rounded-bl-2xl">Best Value</div>
                    <div className="flex justify-between items-start mb-8">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest block">Strategy Choice</span>
                            <h4 className="text-2xl font-bold text-[var(--text-primary)]">Mock Pack — 3 Tests</h4>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black text-[var(--text-primary)] font-mono">₹99</div>
                            <div className="text-[11px] text-brand-400 font-bold uppercase tracking-widest mt-1">₹33 / Test</div>
                        </div>
                    </div>
                    <ul className="space-y-4 mb-10">
                        <li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"><i className="fa-solid fa-star text-warning"></i> 3 Full 200-question papers</li>
                        <li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"><i className="fa-solid fa-star text-warning"></i> AI-powered weak area analysis</li>
                        <li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"><i className="fa-solid fa-star text-warning"></i> WhatsApp Performance Report</li>
                    </ul>
                    <button className="w-full py-4 rounded-[1.2rem] bg-brand-500 text-[var(--text-primary)] font-black text-[11px] uppercase tracking-widest transition-all hover:bg-brand-600 shadow-lg shadow-brand-500/30">Get Pack of 3</button>
                </div>
            </div>
        </div>
    </section>

    {/*  Psychological Motivator  */}
    <section className="max-w-4xl mx-auto rounded-[3rem] p-12 bg-danger/5 border border-danger/10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left relative overflow-hidden group">
        <div className="absolute inset-0 bg-danger/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="w-20 h-20 rounded-[2rem] bg-danger/10 flex items-center justify-center text-4xl text-danger shrink-0 ring-4 ring-danger/5"><i className="fa-solid fa-triangle-exclamation"></i></div>
        <div className="flex-1 space-y-3 relative z-10">
            <h4 className="text-2xl font-bold text-[var(--text-primary)]">Don't leave your exam to chance</h4>
            <p className="text-[var(--text-muted)] leading-relaxed">3,200 students are already practicing. Every topic you leave locked today is a subject they are mastering. <span className="text-[var(--text-primary)] font-bold">Your weak areas: Constitution, Network Theory — Still Locked.</span></p>
        </div>
        <button className="px-10 py-4 rounded-[1.5rem] bg-white text-dark-bg font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-slate-200 hover:scale-105 active:scale-95 shrink-0 relative z-10 shadow-2xl">Fix it Now</button>
    </section>

    {/*  Trust Footer  */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-10 border-t border-[var(--border-subtle)] opacity-80">
        <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-[var(--text-muted)] text-xl"><i className="fa-solid fa-lock-open"></i></div>
            <h6 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest">Instant Unlock</h6>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">Immediate access to all modules after successful payment.</p>
        </div>
        <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-[var(--text-muted)] text-xl"><i className="fa-solid fa-calendar-day"></i></div>
            <h6 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest">Valid till Exam Day</h6>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">One-time payment valid until WPSI 2025 on June 21st.</p>
        </div>
        <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-[var(--text-muted)] text-xl"><i className="fa-solid fa-headset"></i></div>
            <h6 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest">WhatsApp Support</h6>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">Priority technical support for premium students.</p>
        </div>
    </div>

</div></div></main>




    </>
  );
}
