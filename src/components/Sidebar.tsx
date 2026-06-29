"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const displayName = user?.name?.trim() || "Profile";
  const displayLevel = user?.level || 1;

  const isActive = (path: string) => {
    if (path === '/exam') {
      return pathname === '/exam' || pathname.startsWith('/subjects') || pathname.startsWith('/topics');
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-dark-800/60 backdrop-blur-sm z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-[280px] bg-white border-r border-dark-100 z-50 transform lg:static transition-transform duration-300 ease-in-out flex flex-col shadow-2xl lg:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo section */}
        <div className="h-20 flex items-center px-6 border-b border-dark-100 shrink-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 text-white font-bold text-xl tracking-tighter">
                    W
                </div>
                <div>
                    <h1 className="font-display font-bold text-xl text-dark-800 leading-none tracking-tight">WPSI <span className="text-primary-600">Pro</span></h1>
                    <p className="text-[10px] font-bold text-dark-400 uppercase tracking-widest mt-0.5">Study Console</p>
                </div>
            </div>
            <button className="ml-auto lg:hidden text-dark-400 hover:text-dark-600" onClick={onClose}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto py-6 px-4 hide-scrollbar relative z-10">
            <p className="text-[10px] font-bold text-dark-400 mb-3 px-3 uppercase tracking-widest">Navigation</p>
            <nav className="space-y-1">
                <Link href="/dashboard" onClick={onClose} className={`sidebar-item ${isActive('/dashboard') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <svg className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    Dashboard
                </Link>
                <Link href="/exam" onClick={onClose} className={`sidebar-item ${isActive('/exam') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <svg className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    Exam
                </Link>
                {/* 
                <Link href="/practice" onClick={onClose} className={`sidebar-item ${isActive('/practice') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <svg className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    Practice
                </Link>
                */}
                <Link href="/test" onClick={onClose} className={`sidebar-item ${isActive('/test') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <svg className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    Mock Tests
                </Link>
                <Link href="/results" onClick={onClose} className={`sidebar-item ${isActive('/results') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <svg className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012-2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    Results
                </Link>
                <Link href="/bookmarks" onClick={onClose} className={`sidebar-item ${isActive('/bookmarks') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <svg className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                    Saved MCQs
                </Link>
                <Link href="/dashboard/pricing" onClick={onClose} className={`sidebar-item ${isActive('/dashboard/pricing') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <svg className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                    Pricing & Plans
                </Link>
            </nav>

            <p className="text-[10px] font-bold text-dark-400 mt-6 mb-3 px-3 uppercase tracking-widest">Gamification</p>
            <nav className="space-y-1">
                <Link href="/xp" onClick={onClose} className={`sidebar-item ${isActive('/xp') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3.5 text-sm rounded-xl group transition-all`}>
                    <svg className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Points & XP
                </Link>
                <Link href="/streaks" onClick={onClose} className={`sidebar-item ${isActive('/streaks') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3.5 text-sm rounded-xl group transition-all`}>
                    <svg className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path></svg>
                    Streak
                </Link>
                <Link href="/leaderboard" onClick={onClose} className={`sidebar-item ${isActive('/leaderboard') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3.5 text-sm rounded-xl group transition-all`}>
                    <svg className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    Leaderboard
                </Link>
            </nav>
        </div>
        
        {/* Bottom section */}
        <div className="p-4 relative z-10 shrink-0">
            <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-5 mb-4 shadow-xl relative overflow-hidden group hidden sm:block">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-accent-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="flex items-center gap-2 mb-2 relative z-10">
                    <span className="text-accent-400 text-[10px] font-bold uppercase tracking-widest">👑 WPSI Combo</span>
                </div>
                <p className="text-[11px] text-dark-300 mb-4 leading-relaxed relative z-10">Full access at <b className="text-white">Rs 249</b> with the cleanest prep flow.</p>
                <Link href="/dashboard/pricing" className="block w-full bg-accent-500 hover:bg-accent-600 text-dark-800 text-center py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-accent-500/20 relative z-10">
                    ⚡ Upgrade Now
                </Link>
            </div>
            
            <Link href="/profile" onClick={onClose} className="flex items-center p-3 bg-dark-50 rounded-xl border border-dark-200 hover:border-dark-300 transition-colors cursor-pointer group">
                <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700 font-bold mr-3 text-xs border border-primary-200 group-hover:bg-primary-200 transition-colors uppercase">
                    {loading ? '...' : displayName.slice(0, 2)}
                </div>
                <div className="flex-1">
                    <p className="text-[13px] font-bold text-dark-800 leading-tight">{loading ? 'Loading...' : displayName}</p>
                    <p className="text-[10px] text-dark-500 font-medium">🏆 Master (Level {displayLevel})</p>
                </div>
                <svg className="w-4 h-4 text-dark-400 group-hover:text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                </svg>
            </Link>
        </div>
    </aside>
    </>
  );
}
