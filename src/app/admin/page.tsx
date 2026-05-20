
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Admin() {
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
      

    {/*  Admin Sidebar  */}
    <aside className="w-64 bg-[#0f172a] border-r border-white/5 hidden md:flex flex-col h-full flex-shrink-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-white text-dark-bg flex items-center justify-center">
                    <i className="fa-solid fa-lock text-sm"></i>
                </div>
                <span className="font-heading font-bold text-lg tracking-wide uppercase text-slate-300">Admin</span>
            </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-3">Analytics</div>
            <nav className="space-y-1 mb-8">
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-brand-500/10 text-brand-400 font-medium">
                    <i className="fa-solid fa-chart-pie w-5 text-center"></i> Overview
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-medium transition-colors">
                    <i className="fa-solid fa-indian-rupee-sign w-5 text-center"></i> Revenue
                </a>
            </nav>

            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-3">Management</div>
            <nav className="space-y-1 mb-8">
                <a href="#" className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-medium transition-colors">
                    <div className="flex items-center gap-3"><i className="fa-solid fa-users w-5 text-center"></i> Users</div>
                    <span className="bg-brand-500/20 text-brand-400 text-[10px] px-2 py-0.5 rounded-full font-bold">12.4k</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-medium transition-colors">
                    <i className="fa-solid fa-database w-5 text-center"></i> Question Bank
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-medium transition-colors">
                    <i className="fa-solid fa-file-contract w-5 text-center"></i> Mock Tests
                </a>
            </nav>
            
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-3">System</div>
            <nav className="space-y-1">
                <a href="#" className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-medium transition-colors">
                    <div className="flex items-center gap-3"><i className="fa-solid fa-headset w-5 text-center"></i> Support Tickets</div>
                    <span className="bg-danger text-white text-[10px] px-2 py-0.5 rounded-full font-bold">5</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-medium transition-colors">
                    <i className="fa-solid fa-bell w-5 text-center"></i> Notifications
                </a>
            </nav>
        </div>
        
        <div className="p-4 border-t border-white/5">
            <button className="w-full py-2 bg-dark-bg border border-white/10 rounded-lg text-sm text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </button>
        </div>
        
        {/*  User Profile Footer  */}
        <div className="p-4 border-t border-white/5 bg-dark-bg/50 mt-auto">
            <div className="flex items-center justify-between w-full p-2 rounded-xl">
                <a href="/profile" className="flex items-center gap-3 hover:bg-white/5 rounded-lg p-1 transition-colors group flex-1 min-w-0">
                    <img src="https://ui-avatars.com/api/?name=Rahul+Parmar&background=334155&color=fff" className="w-9 h-9 rounded-full border border-white/10 shrink-0 group-hover:border-brand-500/50 transition-colors" />
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate group-hover:text-brand-400 transition-colors">Rahul Parmar</h4>
                        <p className="text-[10px] text-warning truncate"><i className="fa-solid fa-crown mr-1"></i> Bronze</p>
                    </div>
                </a>
                <a href="/settings" className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors shrink-0" title="Settings">
                    <i className="fa-solid fa-gear"></i>
                </a>
            </div>
        </div>
    </aside>

    <main className="flex-1 flex flex-col h-full relative overflow-y-auto custom-scrollbar">
        {/*  Topbar  */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0f172a] sticky top-0 z-10">
            <h1 className="text-xl font-heading font-bold text-slate-200">Dashboard Overview</h1>
            <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400"><i className="fa-solid fa-circle text-[8px] text-accent mr-1 animate-pulse"></i> Systems Normal</span>
                <img src="https://ui-avatars.com/api/?name=Admin&background=fff&color=000" className="w-8 h-8 rounded-full" />
            </div>
        </header>

        <div className="p-6 md:p-8 space-y-6">
            
            {/*  KPI Cards  */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#1e293b] rounded-xl p-5 border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Total Active Users</p>
                            <h3 className="text-2xl font-bold text-white">12,450</h3>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center"><i className="fa-solid fa-users"></i></div>
                    </div>
                    <div className="flex items-center text-xs font-bold text-accent">
                        <i className="fa-solid fa-arrow-trend-up mr-1"></i> +12% from last month
                    </div>
                </div>

                <div className="bg-[#1e293b] rounded-xl p-5 border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Monthly Revenue</p>
                            <h3 className="text-2xl font-bold text-white">₹4.2L</h3>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-accent/20 text-accent flex items-center justify-center"><i className="fa-solid fa-indian-rupee-sign"></i></div>
                    </div>
                    <div className="flex items-center text-xs font-bold text-accent">
                        <i className="fa-solid fa-arrow-trend-up mr-1"></i> +8% from last month
                    </div>
                </div>

                <div className="bg-[#1e293b] rounded-xl p-5 border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Tests Attempted</p>
                            <h3 className="text-2xl font-bold text-white">52.8k</h3>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center"><i className="fa-solid fa-file-signature"></i></div>
                    </div>
                    <div className="flex items-center text-xs font-bold text-accent">
                        <i className="fa-solid fa-arrow-trend-up mr-1"></i> +24% from last month
                    </div>
                </div>

                <div className="bg-[#1e293b] rounded-xl p-5 border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Questions Bank</p>
                            <h3 className="text-2xl font-bold text-white">18,204</h3>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-warning/20 text-warning flex items-center justify-center"><i className="fa-solid fa-database"></i></div>
                    </div>
                    <div className="flex items-center text-xs font-bold text-slate-400">
                        +140 added this week
                    </div>
                </div>
            </div>

            {/*  Charts & Tables  */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/*  Recent Transactions  */}
                <div className="lg:col-span-2 bg-[#1e293b] rounded-xl border border-white/5 overflow-hidden">
                    <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#0f172a]/50">
                        <h3 className="font-bold text-white">Recent Subscriptions</h3>
                        <button className="text-xs text-brand-400 hover:text-brand-300 font-bold">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-5 py-3 font-medium">User</th>
                                    <th className="px-5 py-3 font-medium">Plan</th>
                                    <th className="px-5 py-3 font-medium">Amount</th>
                                    <th className="px-5 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-300">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-xs">SM</div>
                                        <span>Suresh Makwana</span>
                                    </td>
                                    <td className="px-5 py-4"><span className="px-2 py-1 bg-white/10 rounded text-xs font-medium">Pro Scholar</span></td>
                                    <td className="px-5 py-4 font-mono text-white">₹299</td>
                                    <td className="px-5 py-4"><span className="flex items-center gap-1 text-accent text-xs font-bold"><i className="fa-solid fa-check-circle"></i> Success</span></td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs">PD</div>
                                        <span>Pooja Desai</span>
                                    </td>
                                    <td className="px-5 py-4"><span className="px-2 py-1 bg-gradient-to-r from-brand-500 to-secondary rounded text-xs font-medium text-white">Elite Master</span></td>
                                    <td className="px-5 py-4 font-mono text-white">₹999</td>
                                    <td className="px-5 py-4"><span className="flex items-center gap-1 text-accent text-xs font-bold"><i className="fa-solid fa-check-circle"></i> Success</span></td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-xs">KJ</div>
                                        <span>Kunal Joshi</span>
                                    </td>
                                    <td className="px-5 py-4"><span className="px-2 py-1 bg-white/10 rounded text-xs font-medium">Pro Scholar</span></td>
                                    <td className="px-5 py-4 font-mono text-white">₹299</td>
                                    <td className="px-5 py-4"><span className="flex items-center gap-1 text-danger text-xs font-bold"><i className="fa-solid fa-times-circle"></i> Failed</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/*  Support Tickets  */}
                <div className="bg-[#1e293b] rounded-xl border border-white/5 flex flex-col">
                    <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#0f172a]/50">
                        <h3 className="font-bold text-white">Open Tickets <span className="ml-2 bg-danger text-white text-xs px-2 py-0.5 rounded-full">5</span></h3>
                    </div>
                    <div className="p-5 flex-1 flex flex-col gap-4">
                        <div className="p-3 bg-[#0f172a] rounded-lg border border-white/5 border-l-2 border-l-danger">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="text-sm font-bold text-white">Payment Deducted, Plan not active</h4>
                                <span className="text-[10px] text-slate-400">10m ago</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-2">User: Rahul P. (rahul@example.com)</p>
                            <button className="text-xs font-bold text-brand-400 hover:text-brand-300">Resolve Issue &rarr;</button>
                        </div>
                        <div className="p-3 bg-[#0f172a] rounded-lg border border-white/5 border-l-2 border-l-warning">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="text-sm font-bold text-white">Error in Mock Test Q45</h4>
                                <span className="text-[10px] text-slate-400">1h ago</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-2">Test: Wireless PSI Full Mock 1</p>
                            <button className="text-xs font-bold text-brand-400 hover:text-brand-300">Review Question &rarr;</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>


    </>
  );
}
