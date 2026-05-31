
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Rewards() {
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
{/* <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8" style={{"background":"radial-gradient(circle at 50% -20%, rgba(99,102,241,0.15), transparent 70%), radial-gradient(circle at 100% 100%, rgba(245,158,11,0.05), transparent 40%)"}}>
    <div className="max-w-6xl mx-auto pb-24 space-y-12">
        
        <div className="group py-12 px-8 sm:px-12 rounded-[2.5rem] relative overflow-hidden transition-all duration-500 border border-white/5 shadow-2xl" style={{"background":"linear-gradient(145deg, #141D2E, #0D1120)"}}>
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-500/10 blur-[100px] rounded-full group-hover:bg-brand-500/15 transition-all duration-700"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="text-center lg:text-left space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        Current Membership Status
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-28 h-28 rounded-[2rem] bg-warning/10 border-2 border-warning/20 flex items-center justify-center text-warning text-5xl shadow-[0_0_40px_rgba(245,158,11,0.15)] group-hover:rotate-6 transition-transform">
                            <i className="fa-solid fa-medal"></i>
                        </div>
                        <div>
                            <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                                <span className="text-7xl font-black text-white font-mono tracking-tighter">2,450</span>
                                <span className="text-2xl font-bold text-slate-500 uppercase tracking-tighter">Coins</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2 justify-center lg:justify-start">
                                <span className="text-lg font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 uppercase tracking-widest">Bronze Tier</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                                <span className="text-xs text-slate-400 font-bold">Lifetime Earnings</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[26rem] bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group/card">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="flex justify-between items-end mb-4 relative z-10">
                        <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Goal: Silver Tier</div>
                        <div className="text-sm font-black text-cyan-400 font-mono">81.6%</div>
                    </div>
                    <div className="w-full h-3.5 rounded-full bg-dark-bg/80 p-0.5 mb-6 relative z-10 border border-white/5">
                        <div className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-brand-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-1000" style={{"width":"81.6%"}}></div>
                    </div>
                    <div className="space-y-4 relative z-10">
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">Earn <span className="text-white font-bold">550 more coins</span> to unlock <span className="text-cyan-400 font-black">1.2x Coin Multiplier</span> & <span className="text-cyan-400 font-black">10% Purchase Discount</span>.</p>
                        <div className="flex items-center gap-3 p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                            <i className="fa-solid fa-lightbulb text-cyan-400"></i>
                            <span className="text-[10px] text-cyan-100/80 leading-tight uppercase font-black tracking-wider">Pro Tip: Study for 7 more days to reach Silver!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-brand-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                <h3 className="text-2xl font-heading font-black text-white tracking-tight">WPSI Membership Tiers</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="rounded-3xl p-8 bg-white/5 border-2 border-orange-500/40 relative group/tier overflow-hidden">
                    <div className="absolute inset-0 bg-orange-500/5 opacity-20"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 text-2xl shadow-lg"><i className="fa-solid fa-medal"></i></div>
                        <h4 className="text-xl font-heading font-black text-white mb-1">Bronze</h4>
                        <p className="text-[10px] text-orange-500/80 font-black uppercase tracking-[0.2em] mb-6">0 - 2,999 🪙</p>
                        <ul className="space-y-4 mb-8 text-xs text-slate-400 font-medium">
                            <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-orange-500 mt-0.5"></i> All free chapters</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-orange-500 mt-0.5"></i> 5 MCQs per topic</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-orange-500 mt-0.5"></i> Coin earning active</li>
                        </ul>
                        <div className="absolute top-6 right-6 px-3 py-1 bg-orange-500/20 text-orange-400 text-[9px] font-black uppercase rounded-full border border-orange-500/30 tracking-widest">Active</div>
                    </div>
                </div>

                <div className="rounded-3xl p-8 bg-white/5 border border-white/5 relative group/tier overflow-hidden transition-all hover:border-cyan-500/30">
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 text-2xl shadow-lg"><i className="fa-solid fa-shield-halved"></i></div>
                        <h4 className="text-xl font-heading font-black text-white mb-1">Silver</h4>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-6">3,000 - 6,999 🪙</p>
                        <ul className="space-y-4 mb-8 text-xs text-slate-300 font-medium">
                            <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-cyan-500 mt-0.5"></i> 10% Purchase Discount</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-cyan-500 mt-0.5"></i> 1.2x Coin Multiplier</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-cyan-500 mt-0.5"></i> Early Access (24h)</li>
                        </ul>
                    </div>
                </div>

                <div className="rounded-3xl p-8 bg-white/5 border border-white/5 relative group/tier overflow-hidden transition-all hover:border-warning/30">
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center text-warning mb-6 text-2xl shadow-lg"><i className="fa-solid fa-crown"></i></div>
                        <h4 className="text-xl font-heading font-black text-white mb-1">Gold</h4>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-6">7,000 - 14,999 🪙</p>
                        <ul className="space-y-4 mb-8 text-xs text-slate-300 font-medium">
                            <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-warning mt-0.5"></i> 20% Purchase Discount</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-warning mt-0.5"></i> 1.5x Coin Multiplier</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-warning mt-0.5"></i> 1 Free Mock per Month</li>
                        </ul>
                    </div>
                </div>

                <div className="rounded-3xl p-8 bg-white/5 border border-white/5 relative group/tier overflow-hidden transition-all hover:border-brand-500/30">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-500/5 blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-6 text-2xl shadow-lg"><i className="fa-solid fa-gem"></i></div>
                        <h4 className="text-xl font-heading font-black text-white mb-1">Platinum</h4>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-6">15,000+ 🪙</p>
                        <ul className="space-y-4 mb-8 text-xs text-slate-200 font-medium">
                            <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-brand-400 mt-0.5"></i> Full Platform Access</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-brand-400 mt-0.5"></i> Unlimited Mock Tests</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-brand-400 mt-0.5"></i> 2.0x Coin Multiplier</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 bg-accent rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    <h3 className="text-2xl font-heading font-black text-white tracking-tight">Spend Your WPSICoins</h3>
                </div>
                <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
                    <button className="px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest bg-brand-500 text-white shadow-xl">Redeem Tools</button>
                    <button className="px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">My Wallet</button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="rounded-3xl p-6 bg-dark-card/40 border border-white/5 group hover:border-warning/40 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center text-warning mb-6 text-2xl group-hover:scale-110 transition-transform"><i className="fa-solid fa-file-signature"></i></div>
                    <h5 className="text-sm font-bold text-white mb-1">Single Mock Test</h5>
                    <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">Full 200Q paper with AI rank card.</p>
                    <button className="w-full py-3.5 rounded-2xl bg-warning/10 border border-warning/20 text-warning font-black text-[10px] uppercase tracking-widest transition-all hover:bg-warning hover:text-dark-bg">Redeem 200 🪙</button>
                </div>

                <div className="rounded-3xl p-6 bg-dark-card/40 border border-white/5 group hover:border-brand-500/40 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-6 text-2xl group-hover:scale-110 transition-transform"><i className="fa-solid fa-lock-open"></i></div>
                    <h5 className="text-sm font-bold text-white mb-1">Unlock 1 Chapter</h5>
                    <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">Any premium technical or aptitude unit.</p>
                    <button className="w-full py-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 font-black text-[10px] uppercase tracking-widest transition-all hover:bg-brand-500 hover:text-white">Redeem 100 🪙</button>
                </div>

                <div className="rounded-3xl p-6 bg-dark-card/40 border border-white/5 group hover:border-cyan-500/40 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 text-2xl group-hover:scale-110 transition-transform"><i className="fa-solid fa-bolt-lightning"></i></div>
                    <h5 className="text-sm font-bold text-white mb-1">7-Day Full Access</h5>
                    <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">Experience the full platform for a week.</p>
                    <button className="w-full py-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-black text-[10px] uppercase tracking-widest transition-all hover:bg-cyan-500 hover:text-dark-bg">Redeem 500 🪙</button>
                </div>

                <div className="rounded-3xl p-6 bg-dark-card/40 border border-white/5 group hover:border-accent/40 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 text-2xl group-hover:scale-110 transition-transform"><i className="fa-solid fa-tag"></i></div>
                    <h5 className="text-sm font-bold text-white mb-1">₹50 Flat Coupon</h5>
                    <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">Direct discount on any bundle purchase.</p>
                    <button className="w-full py-3.5 rounded-2xl bg-accent/10 border border-accent/20 text-accent font-black text-[10px] uppercase tracking-widest transition-all hover:bg-accent hover:text-dark-bg">Redeem 500 🪙</button>
                </div>
            </div>
        </section>

        <section className="rounded-[2.5rem] p-10 bg-dark-card border border-white/5 relative overflow-hidden group/earn">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] -rotate-12 group-hover/earn:rotate-0 transition-transform duration-1000">
                <i className="fa-solid fa-coins text-[15rem]"></i>
            </div>
            
            <div className="flex items-center gap-4 mb-10">
                <div className="w-1.5 h-8 bg-warning rounded-full"></div>
                <h3 className="text-2xl font-heading font-black text-white">Earning Engine</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-6">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-6">Habit Builder</h5>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs text-slate-300 font-medium">Daily Login</span>
                        <span className="text-xs font-black text-warning">+5 🪙</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs text-slate-300 font-medium">Attempt 25 MCQs</span>
                        <span className="text-xs font-black text-warning">+25 🪙</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs text-slate-300 font-medium">3-Day Streak</span>
                        <span className="text-xs font-black text-warning">+30 🪙</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-6">Merit Rewards</h5>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs text-slate-300 font-medium">Score 80%+ (Test)</span>
                        <span className="text-xs font-black text-warning">+30 🪙</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs text-slate-300 font-medium">Score 100% (Topic)</span>
                        <span className="text-xs font-black text-warning">+100 🪙</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs text-slate-300 font-medium">Full Mock Attempt</span>
                        <span className="text-xs font-black text-warning">+50 🪙</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-6">Network Power</h5>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs text-slate-300 font-medium">Friend Signup</span>
                        <span className="text-xs font-black text-warning">+100 🪙</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs text-slate-300 font-medium">Friend Purchase</span>
                        <span className="text-xs font-black text-warning">+200 🪙</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs text-slate-300 font-medium">Share Rank Card</span>
                        <span className="text-xs font-black text-warning">+20 🪙</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div> */}
</main>




    </>
  );
}
