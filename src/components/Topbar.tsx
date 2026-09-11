"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { getUserLevel } from "@/lib/xp";

interface TopbarProps {
  onMenuClick?: () => void;
}

type PopoverKey = "profile" | "notifications" | null;

export default function Topbar({ onMenuClick }: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout, switchExam } = useUser();
  const displayName = user?.name?.trim() || "Profile";
  const userXP = user?.xp || 0;
  const { currentLevel } = getUserLevel(userXP);
  const [openPopover, setOpenPopover] = useState<PopoverKey>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [allExams, setAllExams] = useState<any[]>([]);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [examSearchTerm, setExamSearchTerm] = useState("");
  const [comingSoonExam, setComingSoonExam] = useState<any>(null);

  useEffect(() => {
    if (user?.id) {
      const url = new URL('/api/leaderboard', window.location.origin);
      url.searchParams.set('timeframe', 'allTime');
      if (user?.examId) {
        url.searchParams.set('examId', user.examId);
      }
      fetch(url.toString())
        .then(res => res.json())
        .then(data => {
          if (data.userRank) setUserRank(data.userRank);
        })
        .catch(console.error);

      fetch('/api/notifications')
        .then(res => res.json())
        .then(data => {
          if (data.data) {
             setNotifications(data.data);
             setUnreadCount(data.unreadCount || 0);
          }
        })
        .catch(console.error);

      fetch('/api/exams', { cache: 'no-store' })
        .then(res => res.json())
        .then(json => {
          console.log("Fetched exams:", json.data);
          if (json.data) setAllExams(json.data);
        })
        .catch(console.error);
    }
  }, [user?.id]);

  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/exam": "Exam",
    "/practice": "MCQ Practice",
    "/daily-practice": "MCQ Practice",
    "/test": "Mock Tests",
    "/results": "Results",
    "/bookmarks": "Saved MCQs",
    "/pricing": "Pricing & Plans",
    "/streaks": "Streaks",
    "/leaderboard": "Leaderboard",
    "/xp": "Points & XP",
    "/profile": "My Profile",
    "/settings": "Account Settings",
    "/dashboard/payments": "Payment History",
    "/notifications": "Notifications",
    "/xp/history": "XP History",
    "/notes": "Available Notes",
    "/notes/subjects": "Select Subject",
    "/notes/view": "📖 Notes",
    "/subjects": "Exam",
    "/topics": "Exam",
  };

  const subtitles: Record<string, string> = {
    "/dashboard": "Your Daily Progress & Overview",
    "/exam": "Ready For Your Next Challenge?",
    "/practice": "Sharpen Your Skills",
    "/daily-practice": "Sharpen Your Skills",
    "/leaderboard": "Top Performers & Rankings",
    "/xp": "Your Gamification Journey",
    "/profile": "Manage Your Personal Details",
    "/notifications": "Stay up to date",
    "/xp/history": "All Time Points Log",
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpenPopover(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => { setOpenPopover(null); }, [pathname]);

  const displayTitle = titles[pathname] || "Exams Console";
  const displaySubtitle = subtitles[pathname] || "";

  const confirmLogout = async () => {
    setShowLogoutConfirm(false);
    setOpenPopover(null);
    await logout();
    router.replace("/login");
    router.refresh();
  };

  const togglePopover = async (key: Exclude<PopoverKey, null>) => {
    setOpenPopover((current) => (current === key ? null : key));
    
    // Mark notifications as read when opening the popover
    if (key === 'notifications' && unreadCount > 0) {
       setUnreadCount(0);
       try {
         await fetch('/api/notifications', { method: 'PUT' });
         setNotifications(prev => prev.map(n => ({...n, isRead: true})));
       } catch (error) {
         console.error(error);
       }
    }
  };

  console.log("Current comingSoonExam state:", comingSoonExam);

  return (
    <header className="h-20 bg-primary-50/30 flex items-center justify-between px-4 lg:px-10 shrink-0 sticky top-0 z-30 border-b border-primary-100 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
            {/* Mobile Logo */}
            <div className="flex md:hidden items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md shadow-primary-500/30 overflow-hidden shrink-0">
                    <Image src="/logo.jpeg" alt="McqPrepZone Logo" width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="font-display font-bold text-lg text-dark-800 leading-none tracking-tight">McqPrep<span className="text-primary-600">Zone</span></h1>
                </div>
            </div>
            
            {/* Desktop Page Title */}
            <div className="hidden md:flex flex-col justify-center flex-1 min-w-0">
                <div className="flex items-center gap-2">
                   <h2 className="text-xl font-display font-bold text-dark-900 leading-tight truncate">{displayTitle}</h2>
                </div>
                {displaySubtitle && <p className="text-[10px] text-primary-600 font-bold uppercase tracking-widest mt-0.5 truncate">{displaySubtitle}</p>}
                <div id="topbar-breadcrumbs" className="min-w-0 w-full mt-0.5"></div>
            </div>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2" ref={popoverRef}>
            {/* Back to Website */}
            <a href="/" onClick={(e) => {
                console.log('Website button clicked! Attempting to navigate to /');
            }} className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 bg-dark-50 hover:bg-dark-100 border border-dark-200 rounded-xl text-dark-600 hover:text-dark-900 transition-all text-xs font-bold shadow-sm hover:scale-105" title="Back to Website">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                <span className="hidden md:inline">Website</span>
            </a>

            {/* Streak Header Badge */}
            <Link href="/streaks" className="hidden sm:flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-amber-600 transition-all text-xs font-bold shadow-sm hover:scale-105" title="Streaks">
                <span>🔥</span>
                <span className="hidden sm:inline">{user?.streak || 0} Days</span>
            </Link>
            
            {/* Leaderboard Header Badge */}
            <Link href="/leaderboard" className="hidden sm:flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 transition-all text-xs font-bold shadow-sm hover:scale-105" title="Leaderboard">
                <span>🏆</span>
                <span className="hidden sm:inline">{userRank ? `#${userRank}` : 'Unranked'}</span>
            </Link>

            {/* Exam Switcher Button */}
            <button 
              onClick={() => {
                console.log("Main Exam Switcher button clicked! Opening modal...");
                setIsExamModalOpen(true);
              }}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 bg-primary-50 hover:bg-primary-100 border border-primary-200 text-primary-700 rounded-xl text-xs font-bold shadow-sm transition-all hover:scale-105"
            >
              <div className="hidden sm:flex w-4 h-4 bg-primary-200 text-primary-800 rounded items-center justify-center shrink-0">
                 <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <span className="max-w-[80px] sm:max-w-[120px] truncate">{user?.examId ? allExams.find(e => e.id === user.examId)?.name || 'Select Exam' : 'Select Exam'}</span>
              <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
            </button>

            {/* Notification Bell */}
            <div className="relative">
                <button onClick={() => togglePopover("notifications")} className="w-10 h-10 rounded-full bg-dark-50 flex items-center justify-center text-dark-600 hover:bg-dark-100 transition-colors relative shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>}
                </button>
                
                {/* Notification Dropdown Menu */}
                <div className={`absolute -right-[60px] sm:right-0 mt-2 w-[280px] sm:w-96 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-dark-100 z-50 overflow-hidden transform origin-top-right transition-all duration-200 ${openPopover === "notifications" ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}>
                    <div className="p-4 border-b border-dark-50 bg-dark-50/50 flex items-center justify-between">
                        <h4 className="font-bold text-dark-800">Notifications</h4>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto divide-y divide-dark-50">
                        {notifications.length === 0 ? (
                           <div className="p-6 text-center text-dark-400 text-sm">No notifications yet.</div>
                        ) : (
                           notifications.map(notification => (
                               <div key={notification.id} className={`group p-3.5 hover:bg-dark-50/50 transition-colors flex gap-3 text-left ${notification.isRead ? '' : 'bg-primary-50/30'}`}>
                                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm shadow-sm border ${
                                    notification.type === 'LEVEL_UP' ? 'bg-amber-50 text-amber-500 border-amber-200' : 
                                    notification.type === 'STREAK' ? 'bg-orange-50 text-orange-500 border-orange-200' : 
                                    'bg-primary-50 text-primary-500 border-primary-200'
                                  }`}>
                                      <i className={`fa-solid ${
                                        notification.type === 'LEVEL_UP' ? 'fa-star' : 
                                        notification.type === 'STREAK' ? 'fa-fire' : 
                                        'fa-bullhorn'
                                      }`}></i>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                      <p className="text-xs font-semibold text-dark-800 leading-normal group-hover:text-primary-700 transition-colors">{notification.title}</p>
                                      <p className="text-[10px] text-dark-600 mt-0.5 leading-normal">{notification.message}</p>
                                      <p className="text-[9px] text-dark-400 mt-1 font-medium">
                                        {new Date(notification.createdAt).toLocaleString(undefined, {
                                          month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                                        })}
                                      </p>
                                  </div>
                               </div>
                           ))
                        )}
                    </div>
                    <div className="p-3 text-center border-t border-dark-50 bg-dark-50/30 hover:bg-dark-50 transition-colors">
                        <Link href="/notifications" onClick={() => setOpenPopover(null)} className="block w-full text-[10px] text-primary-600 hover:text-primary-700 font-bold uppercase tracking-wider">
                            View All Notifications
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="hidden md:block w-px h-6 bg-dark-200 mx-1"></div>
            
            <div className="relative">
                <div className="flex items-center gap-2 pl-2 md:pl-4 md:border-l border-dark-200 cursor-pointer hover:bg-dark-50 p-1.5 rounded-xl transition-colors" onClick={() => togglePopover("profile")}>
                    <div className="w-9 h-9 shadow-sm rounded-full flex items-center justify-center text-white font-bold text-sm border border-primary-500 uppercase overflow-hidden shrink-0 bg-primary-600">
                        {loading ? "..." : user?.image ? <Image src={user.image} alt={displayName} width={36} height={36} className="w-full h-full object-cover" /> : displayName.slice(0, 2)}
                    </div>
                    <div className="hidden lg:block text-left">
                        <p className="text-xs font-bold text-dark-900 leading-tight">{loading ? 'Loading...' : displayName}</p>
                        <p className="text-[10px] text-dark-500 font-medium">{currentLevel.icon} {currentLevel.name} (Lvl {currentLevel.level})</p>
                    </div>
                    <svg className="w-4 h-4 text-dark-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                {/* Dropdown Menu */}
                <div className={`absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-dark-100 z-50 overflow-hidden transform origin-top-right transition-all duration-200 ${openPopover === "profile" ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}>
                    <div className="p-4 border-b border-dark-50 bg-dark-50/50">
                        <p className="text-sm font-bold text-dark-800">{displayName}</p>
                        <p className="text-xs text-dark-500">{user?.email || "user@example.com"}</p>
                    </div>
                    <div className="p-2 space-y-1">
                        <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            My Profile
                        </Link>
                        <Link href="/xp" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012-2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                            Points & XP
                        </Link>
                        <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
                            Account Settings
                        </Link>
                        <Link href="/dashboard/payments" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                            Payment History
                        </Link>
                        <Link href="/dashboard/referrals" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            Refer & Earn
                        </Link>
                        <Link href="/dashboard/pricing" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                            <svg className="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                            Upgrade Plan
                        </Link>
                    </div>
                    <div className="p-2 border-t border-dark-50">
                        <button onClick={() => { setOpenPopover(null); setShowLogoutConfirm(true); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </div>
      {showLogoutConfirm && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-5 text-rose-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-center text-dark-900 mb-2">Log out of Exams?</h3>
            <p className="text-center text-sm text-dark-500 mb-6">Are you sure you want to log out? You will need to log back in to access your dashboard.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 px-4 py-3 rounded-xl border-2 border-dark-200 text-dark-700 font-bold hover:bg-dark-50 transition-colors">Cancel</button>
              <button onClick={confirmLogout} className="flex-1 px-4 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-lg shadow-rose-500/30 transition-all">Yes, Log Out</button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── EXAM SWITCHER MODAL ── */}
      {isExamModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 bg-dark-900/60 backdrop-blur-sm">
          <div className="bg-white border border-dark-200 rounded-3xl p-6 max-w-4xl w-full shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsExamModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-dark-50 text-dark-500 hover:text-dark-900 hover:bg-dark-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center border border-primary-100 shadow-sm shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-dark-800 leading-tight">Switch Exam Target</h2>
                  <p className="text-sm text-dark-500 mt-1">Select an exam to focus your preparation on.</p>
                </div>
              </div>
              
              {allExams.length > 3 && (
                <div className="relative w-full sm:w-64 shrink-0">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search exams..."
                    value={examSearchTerm}
                    onChange={(e) => setExamSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-dark-50 border border-dark-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all text-dark-800 placeholder:text-dark-400"
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar pb-2">
              {allExams.filter(exam => exam.name.toLowerCase().includes(examSearchTerm.toLowerCase())).map((exam: any) => {
                const isActive = exam.id === user?.examId;
                const isComingSoon = exam.isComingSoon;
                return (
                  <div
                    key={exam.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      console.log("Exam clicked:", exam.name, "| isComingSoon:", isComingSoon, "| Full object:", exam);
                      if (isComingSoon) {
                        setIsExamModalOpen(false);
                        setComingSoonExam(exam);
                        return;
                      }
                      switchExam(exam.id);
                      setIsExamModalOpen(false);
                      setExamSearchTerm("");
                      if (pathname !== "/dashboard") {
                         router.push("/dashboard");
                      }
                    }}
                    className={`w-full p-5 border-2 rounded-2xl flex flex-col items-start transition-all group focus:outline-none relative overflow-hidden pointer-events-auto ${isActive ? 'bg-primary-50/50 border-primary-400 shadow-md ring-4 ring-primary-500/10 text-primary-900' : isComingSoon ? 'bg-dark-50 border-dark-100 opacity-80 cursor-pointer' : 'bg-white border-dark-100 hover:border-primary-300 hover:bg-dark-50 hover:shadow-md hover:-translate-y-0.5 cursor-pointer'}`}
                  >
                    {isActive && <div className="absolute top-0 right-0 w-16 h-16 bg-primary-100/50 rounded-bl-full pointer-events-none"></div>}
                    
                    <div className="flex items-start justify-between w-full mb-3 pointer-events-none">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border ${isActive ? 'bg-primary-600 border-primary-700 text-white' : isComingSoon ? 'bg-dark-200 border-dark-300 text-dark-500' : 'bg-dark-100 border-dark-200 text-dark-500 group-hover:bg-primary-100 group-hover:text-primary-600 group-hover:border-primary-200'} transition-colors`}>
                        {isComingSoon ? (
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ) : (
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        )}
                      </div>
                      {isActive && (
                        <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center shrink-0 shadow-sm relative z-10">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                      )}
                      {isComingSoon && (
                        <div className="px-2 py-1 bg-dark-200 text-dark-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">Coming Soon</div>
                      )}
                    </div>
                    
                    <div className="flex flex-col text-left w-full relative z-10 pointer-events-none">
                       <span className={`font-bold text-lg leading-tight mb-1 ${isActive ? 'text-primary-800' : 'text-dark-800 group-hover:text-primary-700'}`}>{exam.name}</span>
                       <span className={`text-xs line-clamp-2 ${isActive ? 'text-primary-600/90' : 'text-dark-500'}`}>{exam.description || 'Comprehensive exam preparation materials.'}</span>
                    </div>
                  </div>
                );
              })}
              {allExams.filter(exam => exam.name.toLowerCase().includes(examSearchTerm.toLowerCase())).length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <div className="w-16 h-16 bg-dark-50 rounded-full flex items-center justify-center mx-auto mb-3 text-dark-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <h3 className="text-dark-800 font-bold">No exams found</h3>
                  <p className="text-dark-500 text-sm">Try adjusting your search term.</p>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── COMING SOON MODAL ── */}
      {comingSoonExam && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 bg-dark-900/60 backdrop-blur-sm">
          <div className="bg-white border border-dark-200 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200 text-center">
            <button 
              onClick={() => setComingSoonExam(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-dark-50 text-dark-500 hover:text-dark-900 hover:bg-dark-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="w-20 h-20 bg-dark-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-dark-100 relative shadow-inner">
               <svg className="w-10 h-10 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
               </div>
            </div>
            <h2 className="font-display text-2xl font-bold text-dark-900 mb-2">{comingSoonExam.name}</h2>
            <p className="text-sm text-dark-500 mb-6">We are currently preparing the best study materials and mock tests for this exam. It will be available soon!</p>
            <button 
              onClick={() => setComingSoonExam(null)}
              className="w-full py-3.5 bg-dark-800 hover:bg-dark-900 text-white font-bold rounded-xl shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-dark-200"
            >
              Got it, thanks
            </button>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
