"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { getUserLevel } from "@/lib/xp";
import { Home, BookOpen, ClipboardList, Search, Users, StickyNote, Newspaper, TrendingUp, BarChart3, Bookmark, UserPlus, Tag, Zap, Flame, Star, ChevronsUpDown, X, Lock, Landmark } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const displayName = user?.name?.trim() || "Profile";
  const userXP = user?.xp || 0;
  const { currentLevel } = getUserLevel(userXP);

  const [showExamLockModal, setShowExamLockModal] = React.useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('examActive') === 'true') {
      e.preventDefault();
      setShowExamLockModal(true);
    } else {
      onClose();
    }
  };

  const isActive = (path: string) => {
    if (path === '/exam') {
      return pathname === '/exam' || pathname.startsWith('/subjects') || pathname.startsWith('/topics');
    }
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-dark-800/60 backdrop-blur-sm z-40 lg:hidden transition-opacity print:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-[280px] bg-white border-r border-dark-100 z-50 transform lg:static transition-transform duration-300 ease-in-out flex flex-col shadow-2xl lg:shadow-none print:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo section */}
        <div className="h-20 flex items-center px-6 border-b border-dark-100 shrink-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 overflow-hidden shrink-0">
                    <Image src="/logo.jpeg" alt="McqPrepZone Logo" width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div>
                    <span className="block font-display font-bold text-xl text-dark-800 leading-none tracking-tight">McqPrep<span className="text-primary-600">Zone</span></span>
                    <p className="text-[10px] font-bold text-dark-400 uppercase tracking-widest mt-0.5">Study Console</p>
                </div>
            </div>
            <button className="ml-auto lg:hidden text-dark-400 hover:text-dark-600" onClick={onClose}>
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto py-6 px-4 hide-scrollbar relative z-10">
            <p className="text-[10px] font-bold text-dark-400 mb-3 px-3 uppercase tracking-widest">Navigation</p>
            <nav className="space-y-1">
                <Link href="/dashboard" onClick={handleLinkClick} className={`sidebar-item ${isActive('/dashboard') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <Home className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Dashboard
                </Link>
                <Link href="/exam" onClick={handleLinkClick} className={`sidebar-item ${isActive('/exam') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <BookOpen className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Exam
                </Link>

                {/* 
                <Link href="/practice" onClick={handleLinkClick} className={`sidebar-item ${isActive('/practice') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <svg className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    Practice
                </Link>
                */}
                <Link href="/test" onClick={handleLinkClick} className={`sidebar-item ${isActive('/test') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <ClipboardList className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Mock Tests
                </Link>
                <Link href="/government-exams" onClick={handleLinkClick} className={`sidebar-item ${isActive('/government-exams') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <Landmark className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Govt Exams
                    <span className="ml-auto bg-amber-500 text-dark-900 text-[10px] px-2 py-0.5 rounded-full font-bold">ALL</span>
                </Link>

                <p className="text-[10px] font-bold text-dark-400 mt-6 mb-3 px-3 uppercase tracking-widest">Community</p>
                <Link href="/detective" onClick={handleLinkClick} className={`sidebar-item ${isActive('/detective') ? 'active bg-blue-50 text-blue-700' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <Search className={`w-5 h-5 mr-3 ${isActive('/detective') ? 'text-blue-600' : 'group-hover:text-dark-600'} transition-colors`} />
                    MCQ Detective
                    <span className="ml-auto bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>
                </Link>

                <Link href="/leaderboard" onClick={handleLinkClick} className={`sidebar-item ${isActive('/leaderboard') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <Users className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Leaderboard
                </Link>

                <Link href="/notes" onClick={handleLinkClick} className={`sidebar-item ${isActive('/notes') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <StickyNote className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Notes
                </Link>
                <Link href="/blog" onClick={handleLinkClick} className={`sidebar-item ${isActive('/blog') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <Newspaper className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Blog &amp; Strategy
                </Link>
                <Link href="/analytics" onClick={handleLinkClick} className={`sidebar-item ${isActive('/analytics') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <TrendingUp className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Analytics
                </Link>
                <Link href="/results" onClick={handleLinkClick} className={`sidebar-item ${isActive('/results') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <BarChart3 className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Results
                </Link>
                <Link href="/bookmarks" onClick={handleLinkClick} className={`sidebar-item ${isActive('/bookmarks') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <Bookmark className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Saved MCQs
                </Link>
                <Link href="/dashboard/referrals" onClick={handleLinkClick} className={`sidebar-item ${isActive('/dashboard/referrals') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <UserPlus className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Refer & Earn
                </Link>
                <Link href="/dashboard/pricing" onClick={handleLinkClick} className={`sidebar-item ${isActive('/dashboard/pricing') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3 text-sm rounded-xl group transition-all`}>
                    <Tag className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Pricing & Plans
                </Link>
            </nav>

            <p className="text-[10px] font-bold text-dark-400 mt-6 mb-3 px-3 uppercase tracking-widest">Gamification</p>
            <nav className="space-y-1">
                <Link href="/xp" onClick={handleLinkClick} className={`sidebar-item ${isActive('/xp') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3.5 text-sm rounded-xl group transition-all`}>
                    <Zap className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Points & XP
                </Link>
                <Link href="/streaks" onClick={handleLinkClick} className={`sidebar-item ${isActive('/streaks') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3.5 text-sm rounded-xl group transition-all`}>
                    <Flame className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Streak
                </Link>
                <Link href="/leaderboard" onClick={handleLinkClick} className={`sidebar-item ${isActive('/leaderboard') ? 'active' : ''} hover:bg-dark-50 font-medium flex items-center px-4 py-3.5 text-sm rounded-xl group transition-all`}>
                    <Star className="w-5 h-5 mr-3 group-hover:text-dark-600 transition-colors" />
                    Leaderboard
                </Link>
            </nav>
        </div>
        
        {/* Bottom section */}
        <div className="p-4 relative z-10 shrink-0">

            
            <Link href="/profile" onClick={handleLinkClick} className="flex items-center p-3 bg-dark-50 rounded-xl border border-dark-200 hover:border-dark-300 transition-colors cursor-pointer group">
                <div className="w-9 h-9 shadow-sm rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm border border-primary-500 uppercase overflow-hidden shrink-0 bg-primary-600 group-hover:bg-primary-700 transition-colors">
                    {loading ? '...' : user?.image ? <Image src={user.image} alt={displayName} width={32} height={32} className="w-full h-full object-cover" /> : displayName.slice(0, 2)}
                </div>
                <div className="flex-1">
                    <p className="text-[13px] font-bold text-dark-800 leading-tight">{loading ? 'Loading...' : displayName}</p>
                    <p className="text-[10px] text-dark-500 font-medium mb-1">{currentLevel.icon} {currentLevel.name} (Level {currentLevel.level})</p>
                    <div className="inline-block bg-primary-100 text-primary-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-primary-200">
                        {user?.planType || 'Free'} Plan
                    </div>
                </div>
                <ChevronsUpDown className="w-4 h-4 text-dark-400 group-hover:text-dark-600" />
            </Link>
        </div>
      </aside>

      {/* Exam Lock Modal */}
      {showExamLockModal && (
        <div className="fixed inset-0 z-[10030] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-dark-100 rounded-3xl p-7 max-w-sm w-full shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-warning"></div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl bg-warning/10 text-warning">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-dark-900">Exam in Progress</h3>
            </div>
            <p className="text-dark-600 text-sm mb-8 leading-relaxed">
              You cannot navigate away while an exam is running. Please submit or finish your exam first.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowExamLockModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider bg-warning text-dark-bg shadow-[0_10px_20px_rgba(245,158,11,0.2)] transition-transform hover:scale-105"
              >
                Return to Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
