"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { getUserLevel } from "@/lib/xp";

interface TopbarProps {
  onMenuClick?: () => void;
}

type PopoverKey = "profile" | "notifications" | null;

export default function Topbar({ onMenuClick }: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useUser();
  const displayName = user?.name?.trim() || "Profile";
  const userXP = user?.xp || 0;
  const { currentLevel } = getUserLevel(userXP);
  const [openPopover, setOpenPopover] = useState<PopoverKey>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user?.id) {
      fetch('/api/leaderboard?timeframe=allTime')
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
  };

  const subtitles: Record<string, string> = {
    "/dashboard": "Your Daily Progress & Overview",
    "/exam": "Ready For Your Next Challenge?",
    "/practice": "Sharpen Your Skills",
    "/daily-practice": "Sharpen Your Skills",
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

  const displayTitle = titles[pathname] || "WPSI Console";
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

  return (
    <header className="h-20 bg-primary-50/30 flex items-center justify-between px-4 lg:px-10 shrink-0 sticky top-0 z-30 border-b border-primary-100 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-dark-600 hover:bg-dark-50 rounded-xl transition-colors border border-dark-200" onClick={onMenuClick}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <div className="hidden md:flex flex-col justify-center">
                <h2 className="text-xl font-display font-bold text-dark-900 leading-tight">{displayTitle}</h2>
                {displaySubtitle && <p className="text-[10px] text-primary-600 font-bold uppercase tracking-widest mt-0.5">{displaySubtitle}</p>}
            </div>
        </div>
        
        <div className="flex items-center gap-2" ref={popoverRef}>
            {/* Back to Website */}
            <Link href="/" className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-dark-50 hover:bg-dark-100 border border-dark-200 rounded-xl text-dark-600 hover:text-dark-900 transition-all text-xs font-bold shadow-sm hover:scale-105">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                <span className="hidden md:inline">Website</span>
            </Link>

            {/* Streak Header Badge */}
            <Link href="/streaks" className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-amber-600 transition-all text-xs font-bold shadow-sm hover:scale-105">
                <span>🔥</span>
                <span className="hidden sm:inline">{user?.streak || 0} Days</span>
            </Link>
            
            {/* Leaderboard Header Badge */}
            <Link href="/leaderboard" className="flex items-center gap-1.5 px-3 py-2 bg-primary-50 hover:bg-primary-100 border border-primary-200 text-primary-700 transition-all text-xs font-bold shadow-sm hover:scale-105">
                <span>🏆</span>
                <span className="hidden sm:inline">{userRank ? `#${userRank}` : 'Unranked'}</span>
            </Link>

            {/* Cart Icon */}
            <Link href="/checkout" className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors shadow-sm border border-primary-100 mr-1 hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
            </Link>

            {/* Notification Bell */}
            <div className="relative">
                <button onClick={() => togglePopover("notifications")} className="w-10 h-10 rounded-full bg-dark-50 flex items-center justify-center text-dark-600 hover:bg-dark-100 transition-colors relative shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>}
                </button>
                
                {/* Notification Dropdown Menu */}
                <div className={`absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-dark-100 z-50 overflow-hidden transform origin-top-right transition-all duration-200 ${openPopover === "notifications" ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}>
                    <div className="p-4 border-b border-dark-50 bg-dark-50/50 flex items-center justify-between">
                        <h4 className="font-bold text-dark-800">Notifications</h4>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto divide-y divide-dark-50">
                        {notifications.length === 0 ? (
                           <div className="p-6 text-center text-dark-400 text-sm">No notifications yet.</div>
                        ) : (
                           notifications.map(notification => (
                              <div key={notification.id} className={`p-3.5 hover:bg-dark-50/50 transition-colors flex gap-3 text-left ${notification.isRead ? '' : 'bg-primary-50/30'}`}>
                                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 text-sm">
                                      {notification.type === 'LEVEL_UP' ? '🌟' : notification.type === 'STREAK' ? '🔥' : '🚀'}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                      <p className="text-xs font-semibold text-dark-800 leading-normal">{notification.title}</p>
                                      <p className="text-[10px] text-dark-600 mt-0.5 leading-normal">{notification.message}</p>
                                      <p className="text-[9px] text-dark-400 mt-1 font-medium">{new Date(notification.createdAt).toLocaleDateString()}</p>
                                  </div>
                              </div>
                           ))
                        )}
                    </div>
                    <div className="p-3 text-center border-t border-dark-50 bg-dark-50/30">
                        <span className="text-[10px] text-dark-400 font-bold uppercase tracking-wider">End of Notifications</span>
                    </div>
                </div>
            </div>
            
            <div className="hidden md:block w-px h-6 bg-dark-200 mx-1"></div>
            
            <div className="relative">
                <div className="flex items-center gap-2 pl-2 md:pl-4 md:border-l border-dark-200 cursor-pointer hover:bg-dark-50 p-1.5 rounded-xl transition-colors" onClick={() => togglePopover("profile")}>
                    <div className="w-9 h-9 shadow-sm rounded-lg flex items-center justify-center text-white font-bold text-sm border border-primary-500 uppercase overflow-hidden shrink-0 bg-primary-600">
                        {loading ? "..." : user?.image ? <img src={user.image} alt={displayName} className="w-full h-full object-cover" /> : displayName.slice(0, 2)}
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
            <h3 className="text-xl font-bold text-center text-dark-900 mb-2">Log out of WPSI?</h3>
            <p className="text-center text-sm text-dark-500 mb-6">Are you sure you want to log out? You will need to log back in to access your dashboard.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 px-4 py-3 rounded-xl border-2 border-dark-200 text-dark-700 font-bold hover:bg-dark-50 transition-colors">Cancel</button>
              <button onClick={confirmLogout} className="flex-1 px-4 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-lg shadow-rose-500/30 transition-all">Yes, Log Out</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
