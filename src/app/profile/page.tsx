
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function Profile() {
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

  const displayName = user?.name?.trim() || 'Profile';
  const displayEmail = user?.email || 'Not available';
  const displayCoins = user?.coins?.toLocaleString() ?? '--';
  const displayStreak = user?.streak !== undefined ? `${user.streak}d` : '--';
  const displayLevel = user?.level !== undefined ? `Level ${user.level}` : 'WPSI Aspirant';
  const displayId = user?.id ? `WPSI-${user.id.slice(-6).toUpperCase()}` : 'WPSI-USER';

  return (
    <>
      

<main id="nav-main-wrapper" className="flex-1 flex flex-col h-screen overflow-hidden bg-dark-bg">
<div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar relative">
<div className="max-w-5xl mx-auto space-y-8 pb-20">

  <div className="flex flex-col lg:flex-row gap-8">
    {/*  Left Column: Identity  */}
    <div className="w-full lg:w-1/3 space-y-6">
      <div className="rounded-[2.5rem] p-8 relative overflow-hidden border border-white/5 text-center bg-dark-card/40 backdrop-blur-md">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-brand-500/20 to-secondary/10"></div>
        <div className="relative z-10">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e293b&color=818cf8&bold=true&size=120`} className="w-28 h-28 rounded-[2rem] mx-auto border-4 border-dark-bg shadow-2xl mb-4" />
          <h2 className="text-2xl font-heading font-black text-white mb-1">{loading ? 'Loading profile...' : displayName}</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6">{loading ? 'Syncing account' : displayLevel}</p>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Bronze Member</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-[9px] font-black text-slate-500 uppercase mb-1">WPSICoins</div>
              <div className="text-xl font-black text-white font-mono">{displayCoins}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-[9px] font-black text-slate-500 uppercase mb-1">Streak</div>
              <div className="text-xl font-black text-white font-mono">{displayStreak}</div>
            </div>
          </div>
        </div>
      </div>

      {/*  Account Info  */}
      <div className="rounded-3xl p-6 bg-dark-card/40 border border-white/5">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Account Info</h4>
        <div className="space-y-4 text-xs font-medium">
          <div className="flex justify-between items-center pb-3 border-b border-white/5">
            <span className="text-slate-400">Email</span><span className="text-white">{displayEmail}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-white/5">
            <span className="text-slate-400">Phone</span><span className="text-white">Add in future profile settings</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">ID</span><span className="text-white font-mono uppercase">{displayId}</span>
          </div>
        </div>
      </div>
    </div>

    {/*  Right Column: Referrals & Milestones  */}
    <div className="flex-1 space-y-8">
      
      {/*  Referral Dashboard Hero  */}
      <div className="rounded-[2.5rem] p-10 relative overflow-hidden group border border-accent/30" style={{"background":"linear-gradient(135deg,rgba(16,185,129,0.1),rgba(8,12,24,0.98))"}}>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-accent/10 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[1.5rem] bg-accent/20 border border-accent/30 flex items-center justify-center text-4xl text-accent"><i className="fa-solid fa-share-nodes"></i></div>
              <div>
                <h3 className="text-3xl font-heading font-black text-white">Refer & Earn</h3>
                <p className="text-sm text-slate-400 mt-1">Get 300 Coins + Milestones for every friend.</p>
              </div>
            </div>
            <div className="bg-dark-bg/60 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10">
                <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Total Earned</div>
                <div className="text-2xl font-black text-accent font-mono">1,200 <span className="text-xs text-slate-600 uppercase ml-1">Coins</span></div>
            </div>
          </div>

          {/*  Referral Link & WhatsApp  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="bg-dark-bg/80 p-5 rounded-2xl border border-white/5 flex flex-col justify-center">
                  <div className="text-[9px] font-black text-slate-500 uppercase mb-3 tracking-widest">Your Unique Link</div>
                  <div className="flex items-center justify-between gap-4">
                      <div className="text-sm font-mono text-slate-300 truncate">wpsipro.com/join/rahul17</div>
                      <button className="text-accent hover:text-white transition-colors"><i className="fa-solid fa-copy"></i></button>
                  </div>
              </div>
              <button onClick={() => console.log('window.open(\'https://wa.me/?text=WPSI%20exam%20is%20on%2021%20June.%20I%27m%20preparing%20on%20WPSIPro%20%E2%80%94%201800%2B%20MCQs%2C%20Part%20A%20%2B%20Part%20B%20%2B%20Mock%20Tests.%20Join%20with%20my%20link%20and%20get%20%E2%82%B930%20off%20%2B%202%20free%20chapters%3A%20wpsipro.com/join/rahul17\')')} className="bg-accent text-dark-bg font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent/20">
                  <i className="fa-brands fa-whatsapp text-2xl"></i> Share on WhatsApp
              </button>
          </div>

          {/*  Milestone Progress Bar  */}
          <div className="bg-dark-bg/40 p-8 rounded-[2rem] border border-white/5">
              <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">Milestone: 3/5 Friends</h4>
                  <span className="text-[10px] font-black text-accent uppercase">Next: Silver Fast-track</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-accent rounded-full" style={{"width":"60%"}}></div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center opacity-100">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center mx-auto mb-3 border border-accent/30"><i className="fa-solid fa-check text-xs"></i></div>
                      <div className="text-[9px] font-black text-slate-400 uppercase">1 Friend</div>
                      <div className="text-[8px] text-slate-600 mt-1">100 Coins</div>
                  </div>
                  <div className="text-center opacity-100">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center mx-auto mb-3 border border-accent/30"><i className="fa-solid fa-check text-xs"></i></div>
                      <div className="text-[9px] font-black text-slate-400 uppercase">3 Friends</div>
                      <div className="text-[8px] text-accent mt-1">Mock Pack of 3</div>
                  </div>
                  <div className="text-center">
                      <div className="w-10 h-10 rounded-xl bg-white/5 text-slate-600 flex items-center justify-center mx-auto mb-3 border border-white/5"><i className="fa-solid fa-lock text-xs"></i></div>
                      <div className="text-[9px] font-black text-slate-400 uppercase">5 Friends</div>
                      <div className="text-[8px] text-slate-600 mt-1">Silver Tier</div>
                  </div>
                  <div className="text-center">
                      <div className="w-10 h-10 rounded-xl bg-white/5 text-slate-600 flex items-center justify-center mx-auto mb-3 border border-white/5"><i className="fa-solid fa-crown text-xs"></i></div>
                      <div className="text-[9px] font-black text-slate-400 uppercase">10 Friends</div>
                      <div className="text-[8px] text-slate-600 mt-1">Gold Tier</div>
                  </div>
              </div>
          </div>
        </div>
      </div>

      {/*  Referral List  */}
      <div className="rounded-3xl p-8 bg-dark-card/40 border border-white/5">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Recent Referrals</h4>
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 font-bold">AK</div>
                    <div>
                        <div className="text-sm font-bold text-white">Aniket Kumar</div>
                        <div className="text-[10px] text-accent font-black uppercase tracking-tighter">Purchased Pack</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs font-black text-white">+300</div>
                    <div className="text-[9px] text-slate-600">Total Coins</div>
                </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 font-bold">SP</div>
                    <div>
                        <div className="text-sm font-bold text-white">Smit Patel</div>
                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Signed up</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs font-black text-white">+100</div>
                    <div className="text-[9px] text-slate-600">Pending Purchase</div>
                </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 opacity-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-600 font-bold">VP</div>
                    <div>
                        <div className="text-sm font-bold text-slate-500">Vijay Prajapati</div>
                        <div className="text-[10px] text-slate-600 font-black uppercase tracking-tighter">Clicked Link</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs font-black text-slate-700">+0</div>
                    <div className="text-[9px] text-slate-700">Not joined yet</div>
                </div>
            </div>
        </div>
      </div>

    </div>
  </div>

</div>
</div>
</main>





    </>
  );
}
