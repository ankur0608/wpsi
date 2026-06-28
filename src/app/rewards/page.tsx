"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function Rewards() {
  const { user, loading } = useUser();

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

  const coins = user?.coins || 0;

  // Tier calculation logic
  let currentTier = 'Bronze';
  let nextTier = 'Silver';
  let currentTierMin = 0;
  let nextTierMin = 3000;
  let progress = 0;
  let coinsNeeded = 0;
  
  if (coins >= 15000) {
    currentTier = 'Platinum';
    nextTier = 'Max Tier';
    currentTierMin = 15000;
    nextTierMin = 15000;
    progress = 100;
    coinsNeeded = 0;
  } else if (coins >= 7000) {
    currentTier = 'Gold';
    nextTier = 'Platinum';
    currentTierMin = 7000;
    nextTierMin = 15000;
  } else if (coins >= 3000) {
    currentTier = 'Silver';
    nextTier = 'Gold';
    currentTierMin = 3000;
    nextTierMin = 7000;
  }

  if (nextTierMin > currentTierMin) {
      progress = ((coins - currentTierMin) / (nextTierMin - currentTierMin)) * 100;
      coinsNeeded = nextTierMin - coins;
  }

  return (
    <>
      <main id="nav-main-wrapper" className="flex-1 flex flex-col h-screen overflow-hidden bg-[var(--bg-primary)]">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8" style={{"background":"radial-gradient(circle at 50% -20%, rgba(59,130,246,0.15), transparent 70%), radial-gradient(circle at 100% 100%, rgba(99,102,241,0.05), transparent 40%)"}}>
            <div className="max-w-6xl mx-auto pb-24 space-y-12">
                
                {/* Banner */}
                <div className="group py-12 px-8 sm:px-12 rounded-[2.5rem] relative overflow-hidden transition-all duration-500 border border-blue-100 shadow-xl bg-gradient-to-br from-white to-blue-50/50">
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="text-center lg:text-left space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                Current Membership Status
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-28 h-28 rounded-[2rem] bg-blue-500/10 border-2 border-blue-500/20 flex items-center justify-center text-blue-500 text-5xl shadow-[0_0_40px_rgba(59,130,246,0.15)] group-hover:rotate-6 transition-transform bg-white">
                                    <i className="fa-solid fa-medal"></i>
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                                        <span className="text-7xl font-black text-[var(--text-primary)] font-mono tracking-tighter">{loading ? '...' : coins.toLocaleString()}</span>
                                        <span className="text-2xl font-bold text-[var(--text-muted)] uppercase tracking-tighter">Coins</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 justify-center lg:justify-start">
                                        <span className="text-lg font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 uppercase tracking-widest">{currentTier} Tier</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                        <span className="text-xs text-[var(--text-muted)] font-bold">Lifetime Earnings</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-[26rem] bg-white p-8 rounded-[2rem] border border-blue-100 shadow-lg relative overflow-hidden group/card">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="flex justify-between items-end mb-4 relative z-10">
                                <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-widest">Goal: {nextTier}</div>
                                <div className="text-sm font-black text-blue-500 font-mono">{progress.toFixed(1)}%</div>
                            </div>
                            <div className="w-full h-3.5 rounded-full bg-[var(--bg-surface)] p-0.5 mb-6 relative z-10 border border-[var(--border-subtle)]">
                                <div className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000" style={{"width":`${progress}%`}}></div>
                            </div>
                            <div className="space-y-4 relative z-10">
                                {nextTier !== 'Max Tier' ? (
                                  <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">Earn <span className="text-[var(--text-primary)] font-bold">{coinsNeeded.toLocaleString()} more coins</span> to unlock <span className="text-blue-500 font-black">1.2x Coin Multiplier</span>.</p>
                                ) : (
                                  <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">You have reached the <span className="text-blue-500 font-black">Max Tier!</span> Enjoy all benefits.</p>
                                )}
                                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                                    <i className="fa-solid fa-lightbulb text-blue-500"></i>
                                    <span className="text-[10px] text-blue-700 leading-tight uppercase font-black tracking-wider">Pro Tip: Study for 7 more days to level up!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                        <h3 className="text-2xl font-heading font-black text-[var(--text-primary)] tracking-tight">WPSI Membership Tiers</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className={`rounded-3xl p-8 bg-white shadow-sm border-2 ${currentTier === 'Bronze' ? 'border-blue-500' : 'border-blue-100'} relative group/tier overflow-hidden transition-all hover:border-blue-400 hover:shadow-md`}>
                            {currentTier === 'Bronze' && <div className="absolute inset-0 bg-blue-50/50"></div>}
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6 text-2xl shadow-sm border border-blue-100"><i className="fa-solid fa-medal"></i></div>
                                <h4 className="text-xl font-heading font-black text-[var(--text-primary)] mb-1">Bronze</h4>
                                <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em] mb-6">0 - 2,999 🪙</p>
                                <ul className="space-y-4 mb-8 text-xs text-[var(--text-muted)] font-medium">
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-blue-500 mt-0.5"></i> All free chapters</li>
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-blue-500 mt-0.5"></i> 5 MCQs per topic</li>
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-blue-500 mt-0.5"></i> Coin earning active</li>
                                </ul>
                                {currentTier === 'Bronze' && <div className="absolute top-6 right-6 px-3 py-1 bg-blue-100 text-blue-600 text-[9px] font-black uppercase rounded-full border border-blue-200 tracking-widest">Active</div>}
                            </div>
                        </div>

                        <div className={`rounded-3xl p-8 bg-white shadow-sm border-2 ${currentTier === 'Silver' ? 'border-blue-500' : 'border-blue-100'} relative group/tier overflow-hidden transition-all hover:border-blue-400 hover:shadow-md`}>
                            {currentTier === 'Silver' && <div className="absolute inset-0 bg-blue-50/50"></div>}
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6 text-2xl shadow-sm border border-blue-100"><i className="fa-solid fa-shield-halved"></i></div>
                                <h4 className="text-xl font-heading font-black text-[var(--text-primary)] mb-1">Silver</h4>
                                <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] mb-6">3,000 - 6,999 🪙</p>
                                <ul className="space-y-4 mb-8 text-xs text-[var(--text-secondary)] font-medium">
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-blue-500 mt-0.5"></i> 10% Purchase Discount</li>
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-blue-500 mt-0.5"></i> 1.2x Coin Multiplier</li>
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-blue-500 mt-0.5"></i> Early Access (24h)</li>
                                </ul>
                                {currentTier === 'Silver' && <div className="absolute top-6 right-6 px-3 py-1 bg-blue-100 text-blue-600 text-[9px] font-black uppercase rounded-full border border-blue-200 tracking-widest">Active</div>}
                            </div>
                        </div>

                        <div className={`rounded-3xl p-8 bg-white shadow-sm border-2 ${currentTier === 'Gold' ? 'border-indigo-500' : 'border-blue-100'} relative group/tier overflow-hidden transition-all hover:border-indigo-400 hover:shadow-md`}>
                            {currentTier === 'Gold' && <div className="absolute inset-0 bg-indigo-50/50"></div>}
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-6 text-2xl shadow-sm border border-indigo-100"><i className="fa-solid fa-crown"></i></div>
                                <h4 className="text-xl font-heading font-black text-[var(--text-primary)] mb-1">Gold</h4>
                                <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] mb-6">7,000 - 14,999 🪙</p>
                                <ul className="space-y-4 mb-8 text-xs text-[var(--text-secondary)] font-medium">
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-indigo-500 mt-0.5"></i> 20% Purchase Discount</li>
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-indigo-500 mt-0.5"></i> 1.5x Coin Multiplier</li>
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-indigo-500 mt-0.5"></i> 1 Free Mock per Month</li>
                                </ul>
                                {currentTier === 'Gold' && <div className="absolute top-6 right-6 px-3 py-1 bg-indigo-100 text-indigo-600 text-[9px] font-black uppercase rounded-full border border-indigo-200 tracking-widest">Active</div>}
                            </div>
                        </div>

                        <div className={`rounded-3xl p-8 bg-white shadow-sm border-2 ${currentTier === 'Platinum' ? 'border-blue-600' : 'border-blue-100'} relative group/tier overflow-hidden transition-all hover:border-blue-600 hover:shadow-md`}>
                            {currentTier === 'Platinum' && <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-100/50 blur-3xl"></div>}
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 text-2xl shadow-sm border border-blue-100"><i className="fa-solid fa-gem"></i></div>
                                <h4 className="text-xl font-heading font-black text-[var(--text-primary)] mb-1">Platinum</h4>
                                <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] mb-6">15,000+ 🪙</p>
                                <ul className="space-y-4 mb-8 text-xs text-[var(--text-primary)] font-medium">
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-blue-600 mt-0.5"></i> Full Platform Access</li>
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-blue-600 mt-0.5"></i> Unlimited Mock Tests</li>
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-circle-check text-blue-600 mt-0.5"></i> 2.0x Coin Multiplier</li>
                                </ul>
                                {currentTier === 'Platinum' && <div className="absolute top-6 right-6 px-3 py-1 bg-blue-100 text-blue-600 text-[9px] font-black uppercase rounded-full border border-blue-200 tracking-widest">Active</div>}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                            <h3 className="text-2xl font-heading font-black text-[var(--text-primary)] tracking-tight">Spend Your WPSICoins</h3>
                        </div>
                        <div className="flex p-1 bg-white rounded-2xl border border-blue-100 shadow-sm">
                            <button className="px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest bg-blue-600 text-white shadow-md">Redeem Tools</button>
                            <button className="px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-blue-600 transition-colors">My Wallet</button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="rounded-3xl p-6 bg-white border border-blue-100 shadow-sm group hover:border-blue-400 hover:shadow-md transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6 text-2xl border border-blue-100 group-hover:scale-110 transition-transform"><i className="fa-solid fa-file-signature"></i></div>
                            <h5 className="text-sm font-bold text-[var(--text-primary)] mb-1">Single Mock Test</h5>
                            <p className="text-[11px] text-[var(--text-muted)] mb-6 leading-relaxed">Full 200Q paper with AI rank card.</p>
                            <button className="w-full py-3.5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 font-black text-[10px] uppercase tracking-widest transition-all hover:bg-blue-600 hover:text-white">Redeem 200 🪙</button>
                        </div>

                        <div className="rounded-3xl p-6 bg-white border border-blue-100 shadow-sm group hover:border-indigo-400 hover:shadow-md transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-6 text-2xl border border-indigo-100 group-hover:scale-110 transition-transform"><i className="fa-solid fa-lock-open"></i></div>
                            <h5 className="text-sm font-bold text-[var(--text-primary)] mb-1">Unlock 1 Chapter</h5>
                            <p className="text-[11px] text-[var(--text-muted)] mb-6 leading-relaxed">Any premium technical or aptitude unit.</p>
                            <button className="w-full py-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-black text-[10px] uppercase tracking-widest transition-all hover:bg-indigo-600 hover:text-white">Redeem 100 🪙</button>
                        </div>

                        <div className="rounded-3xl p-6 bg-white border border-blue-100 shadow-sm group hover:border-blue-500 hover:shadow-md transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6 text-2xl border border-blue-100 group-hover:scale-110 transition-transform"><i className="fa-solid fa-bolt-lightning"></i></div>
                            <h5 className="text-sm font-bold text-[var(--text-primary)] mb-1">7-Day Full Access</h5>
                            <p className="text-[11px] text-[var(--text-muted)] mb-6 leading-relaxed">Experience the full platform for a week.</p>
                            <button className="w-full py-3.5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 font-black text-[10px] uppercase tracking-widest transition-all hover:bg-blue-600 hover:text-white">Redeem 500 🪙</button>
                        </div>

                        <div className="rounded-3xl p-6 bg-white border border-blue-100 shadow-sm group hover:border-indigo-500 hover:shadow-md transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-6 text-2xl border border-indigo-100 group-hover:scale-110 transition-transform"><i className="fa-solid fa-tag"></i></div>
                            <h5 className="text-sm font-bold text-[var(--text-primary)] mb-1">₹50 Flat Coupon</h5>
                            <p className="text-[11px] text-[var(--text-muted)] mb-6 leading-relaxed">Direct discount on any bundle purchase.</p>
                            <button className="w-full py-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-black text-[10px] uppercase tracking-widest transition-all hover:bg-indigo-600 hover:text-white">Redeem 500 🪙</button>
                        </div>
                    </div>
                </section>

                <section className="rounded-[2.5rem] p-10 bg-gradient-to-br from-white to-blue-50/50 border border-blue-100 shadow-xl relative overflow-hidden group/earn">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] -rotate-12 group-hover/earn:rotate-0 transition-transform duration-1000">
                        <i className="fa-solid fa-coins text-[15rem] text-blue-900"></i>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                        <h3 className="text-2xl font-heading font-black text-[var(--text-primary)]">Earning Engine</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-6">
                            <h5 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.25em] mb-6">Habit Builder</h5>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-blue-50 shadow-sm">
                                <span className="text-xs text-[var(--text-secondary)] font-medium">Daily Login</span>
                                <span className="text-xs font-black text-blue-600">+5 🪙</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-blue-50 shadow-sm">
                                <span className="text-xs text-[var(--text-secondary)] font-medium">Attempt 25 MCQs</span>
                                <span className="text-xs font-black text-blue-600">+25 🪙</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-blue-50 shadow-sm">
                                <span className="text-xs text-[var(--text-secondary)] font-medium">3-Day Streak</span>
                                <span className="text-xs font-black text-blue-600">+30 🪙</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h5 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.25em] mb-6">Merit Rewards</h5>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-blue-50 shadow-sm">
                                <span className="text-xs text-[var(--text-secondary)] font-medium">Score 80%+ (Test)</span>
                                <span className="text-xs font-black text-blue-600">+30 🪙</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-blue-50 shadow-sm">
                                <span className="text-xs text-[var(--text-secondary)] font-medium">Score 100% (Topic)</span>
                                <span className="text-xs font-black text-blue-600">+100 🪙</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-blue-50 shadow-sm">
                                <span className="text-xs text-[var(--text-secondary)] font-medium">Full Mock Attempt</span>
                                <span className="text-xs font-black text-blue-600">+50 🪙</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h5 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.25em] mb-6">Network Power</h5>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-blue-50 shadow-sm">
                                <span className="text-xs text-[var(--text-secondary)] font-medium">Friend Signup</span>
                                <span className="text-xs font-black text-blue-600">+100 🪙</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-blue-50 shadow-sm">
                                <span className="text-xs text-[var(--text-secondary)] font-medium">Friend Purchase</span>
                                <span className="text-xs font-black text-blue-600">+200 🪙</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-blue-50 shadow-sm">
                                <span className="text-xs text-[var(--text-secondary)] font-medium">Share Rank Card</span>
                                <span className="text-xs font-black text-blue-600">+20 🪙</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
      </main>
    </>
  );
}
