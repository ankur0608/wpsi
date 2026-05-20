"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

interface TopbarProps {
  title?: string;
  showBackButton?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ title = 'Dashboard', showBackButton = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useUser();
  const displayName = user?.name?.trim() || 'Profile';
  const displayLevel = user?.level;

  const getTitleFromPath = () => {
    const titles: { [key: string]: string } = {
      '/dashboard': 'Dashboard',
      '/subjects': 'Subjects & Topics',
      '/topics': 'Subject Chapters',
      '/test': 'Mock Tests',
      '/pricing': 'Pricing & Plans',
      '/profile': 'My Profile',
      '/settings': 'Settings',
      '/rewards': 'Rewards Store',
      '/streaks': 'Streaks',
      '/practice': 'MCQ Practice',
    };
    return titles[pathname] || title;
  };

  const displayTitle = getTitleFromPath();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
    router.refresh();
  };

  return (
    <header 
      id="main-topbar" 
      className="h-16 glass border-b border-white/5 flex items-center justify-between px-4 sm:px-6 z-10 flex-shrink-0"
      style={{ minHeight: '64px' }}
    >
      <div className="flex items-center gap-3">
        <button 
          className="md:hidden text-slate-400 hover:text-white w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors"
          onClick={() => {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobile-sidebar-overlay');
            if (sidebar && overlay) {
              sidebar.classList.toggle('-translate-x-full');
              overlay.classList.toggle('hidden');
            }
          }}
        >
          <i className="fa-solid fa-bars text-lg"></i>
        </button>

        {showBackButton && pathname === '/topics' && (
          <Link 
            href="/subjects" 
            className="text-slate-400 hover:text-white transition-colors w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        )}

        <div>
          <h1 className="text-base sm:text-lg font-heading font-bold text-white leading-tight">
            {displayTitle}
          </h1>
          <div className="text-[10px] text-slate-500 hidden sm:block font-medium uppercase tracking-wider">
            WPSI Exam: June 21, 2026 (35 Days Left)
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak */}
        <div className="relative group hidden sm:block z-50">
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all"
            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}
          >
            <i className="fa-solid fa-fire text-warning text-sm"></i>
            <span className="text-sm font-bold text-white">{loading ? '--' : user?.streak ?? '--'}</span>
          </div>
          <div 
            className="absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] origin-top-right"
            style={{ background: '#141D2E', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-warning text-lg"
                style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}
              >
                🔥
              </div>
              <div>
                <div className="font-bold text-white">
                  {loading ? 'Loading streak' : `${user?.streak ?? 0} Day Streak`}
                </div>
                <div className="text-xs text-slate-400">Bronze Level Momentum</div>
              </div>
            </div>
            <div 
              className="rounded-xl p-3 mb-3 space-y-2"
              style={{ background: 'rgba(8,12,24,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Bonus for next milestone</span>
                <span className="font-bold text-warning">+30 🪙</span>
              </div>
            </div>
            <Link href="/streaks" className="block text-center text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors">
              Manage Streaks →
            </Link>
          </div>
        </div>

        {/* Points */}
        <div className="relative group hidden sm:block z-50">
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}
          >
            <i className="fa-solid fa-coins text-brand-400 text-sm"></i>
            <span className="text-sm font-bold text-white">{loading ? '--' : user?.coins?.toLocaleString() ?? '--'}</span>
          </div>
          <div 
            className="absolute right-0 mt-2 w-60 rounded-2xl shadow-2xl p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] origin-top-right"
            style={{ background: '#141D2E', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-brand-400 text-lg"
                style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}
              >
                🪙
              </div>
              <div>
                <div className="font-bold text-white">
                  {loading ? 'Loading coins' : `${user?.coins?.toLocaleString() ?? 0} Coins`}
                </div>
                <div className="text-[10px] text-orange-500 font-black uppercase tracking-widest">Bronze Tier</div>
              </div>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-brand-600 to-brand-400" 
                style={{ width: '81.6%' }}
              ></div>
            </div>
            <div className="text-[10px] text-slate-400 mb-3 text-center leading-tight">
              550 more to <span className="text-white font-bold">Silver Tier</span> (1.2x Multiplier)
            </div>
            <Link href="/rewards" className="block text-center text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors">
              WPSICoins Store →
            </Link>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative text-slate-400 hover:text-white transition-colors w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5">
          <i className="fa-solid fa-bell text-lg"></i>
          <span 
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500"
            style={{ boxShadow: '0 0 6px #6366f1' }}
          ></span>
        </button>

        {/* Avatar Dropdown */}
        <div className="relative group z-50">
          <button className="flex items-center gap-2 focus:outline-none">
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e293b&color=818cf8&bold=true&size=80`}
              className="w-8 h-8 rounded-xl border"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              alt="User avatar"
            />
            <i className="fa-solid fa-chevron-down text-xs text-slate-400 hidden sm:block"></i>
          </button>
          <div 
            className="absolute right-0 mt-2 w-48 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 origin-top-right"
            style={{ background: '#141D2E', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="px-4 py-3 mb-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-sm font-bold text-white">{loading ? 'Loading profile...' : displayName}</p>
              <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest">
                {loading ? 'Syncing profile' : displayLevel !== undefined ? `Level ${displayLevel}` : 'Profile unavailable'}
              </p>
            </div>
            <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
              <i className="fa-solid fa-user text-xs w-4"></i>My Profile
            </Link>
            <Link href="/pricing" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
              <i className="fa-solid fa-crown text-xs w-4 text-warning"></i>Upgrade Store
            </Link>
            <Link href="/rewards" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
              <i className="fa-solid fa-coins text-xs w-4 text-brand-400"></i>WPSICoins Store
            </Link>
            <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
              <i className="fa-solid fa-gear text-xs w-4"></i>Settings
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-red-500/10 transition-colors mt-1"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <i className="fa-solid fa-right-from-bracket text-xs w-4"></i>Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
