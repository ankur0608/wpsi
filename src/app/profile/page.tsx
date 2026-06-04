
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
      

<main id="nav-main-wrapper" className="flex-1 flex flex-col h-screen overflow-hidden bg-[var(--bg-primary)]">
<div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar relative">
<div className="max-w-5xl mx-auto space-y-8 pb-20">

  <div className="flex flex-col lg:flex-row gap-8">
    {/*  Left Column: Identity  */}
    <div className="w-full lg:w-1/3 space-y-6">
      <div className="rounded-[2.5rem] p-8 relative overflow-hidden border border-[var(--border-subtle)] text-center bg-dark-card/40 backdrop-blur-md">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-brand-500/20 to-secondary/10"></div>
        <div className="relative z-10">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e293b&color=818cf8&bold=true&size=120`} className="w-28 h-28 rounded-[2rem] mx-auto border-4 border-dark-bg shadow-2xl mb-4" />
          <h2 className="text-2xl font-heading font-black text-[var(--text-primary)] mb-1">{loading ? 'Loading profile...' : displayName}</h2>
          <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-6">{loading ? 'Syncing account' : displayLevel}</p>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Bronze Member</span>
          </div>

          {/* <div className="flex flex-col gap-3 text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-[var(--border-subtle)] text-center">
              <div className="text-[9px] font-black text-[var(--text-muted)] uppercase mb-1">Current Streak</div>
              <div className="text-xl font-black text-[var(--text-primary)] font-mono">{displayStreak}</div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="rounded-3xl p-6 bg-dark-card/40 border border-[var(--border-subtle)]">
        <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-6">Account Info</h4>
        <div className="space-y-4 text-xs font-medium">
          <div className="flex justify-between items-center pb-3 border-b border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)]">Email</span><span className="text-[var(--text-primary)]">{displayEmail}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)]">Phone</span><span className="text-[var(--text-primary)]">Add in future profile settings</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-muted)]">ID</span><span className="text-[var(--text-primary)] font-mono uppercase">{displayId}</span>
          </div>
        </div>
      </div>
    </div>

    {/*  Right Column: Share Option  */}
    <div className="flex-1 space-y-8">
      
      <div className="rounded-[2.5rem] p-10 relative overflow-hidden group border border-brand-500/30" style={{"background":"linear-gradient(135deg,rgba(99,102,241,0.1),rgba(8,12,24,0.98))"}}>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-500/10 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[1.5rem] bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-4xl text-brand-400"><i className="fa-solid fa-share-nodes"></i></div>
              <div>
                <h3 className="text-3xl font-heading font-black text-[var(--text-primary)]">Share WPSI</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">Help your friends prepare for the exam by sharing WPSI.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-start">
              <button onClick={() => window.open(`https://wa.me/?text=WPSI%20exam%20is%20on%2021%20June.%20I%27m%20preparing%20on%20WPSIPro%20%E2%80%94%201800%2B%20MCQs%2C%20Part%20A%20%2B%20Part%20B%20%2B%20Mock%20Tests.%20Join%20with%20my%20link%3A%20wpsipro.com/join/${user?.name?.replace(/\s+/g, '').toLowerCase() || 'user'}`)} className="bg-[#25D366] text-[var(--text-primary)] font-black text-sm uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#25D366]/20 px-8 py-4 w-full md:w-auto">
                  <i className="fa-brands fa-whatsapp text-2xl"></i> Share on WhatsApp
              </button>
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
