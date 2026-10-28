"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, StickyNote, ClipboardList, TrendingUp, User } from 'lucide-react';

export default function MobileBottomTab() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/exam') {
      return pathname === '/exam' || pathname.startsWith('/subjects') || pathname.startsWith('/topics');
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const tabs = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Exam', path: '/exam', icon: BookOpen },
    { name: 'Notes', path: '/notes', icon: StickyNote },
    { name: 'Mock Tests', path: '/test', icon: ClipboardList },
    { name: 'Progress', path: '/progress', icon: TrendingUp },
    { name: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <div id="mobile-bottom-tab" className="lg:hidden fixed bottom-0 left-0 right-0 w-full z-50 pb-safe">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-2xl border-t border-dark-100 shadow-[0_-10px_40px_rgba(0,0,0,0.06)] pointer-events-none"></div>
      
      <div className="relative flex justify-around items-end h-[70px] pb-1 px-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          const Icon = tab.icon;
          
          return (
            <Link
              key={tab.name}
              href={tab.path}
              className="relative flex flex-col items-center justify-center w-[16%] h-[60px] group mb-1"
            >
              {/* Active Indicator Line (Top) */}
              <div className={`absolute top-0 w-8 h-[3px] rounded-b-full transition-all duration-300 ease-out z-20 ${active ? 'bg-primary-600 scale-x-100' : 'bg-transparent scale-x-0'}`}></div>

              {/* Active Pill Background */}
              <div className={`absolute top-2 w-12 h-12 rounded-[18px] transition-all duration-300 ease-out z-0 ${active ? 'bg-primary-50 scale-100 opacity-100' : 'bg-transparent scale-50 opacity-0'}`}></div>
              
              {/* Icon */}
              <div className={`relative z-10 transition-all duration-300 ease-out mt-1 ${active ? 'text-primary-600 -translate-y-1' : 'text-dark-400 group-hover:text-dark-600'}`}>
                 <Icon className={`w-5 h-5 transition-all duration-300 ${active ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} style={{ filter: active ? 'drop-shadow(0px 2px 4px rgba(79, 70, 229, 0.2))' : 'none' }} />
              </div>
              
              {/* Text */}
              <span className={`relative z-10 text-[9px] font-bold tracking-tight transition-all duration-300 ease-out mt-0.5 ${active ? 'text-primary-700 opacity-100 translate-y-0' : 'text-dark-500 opacity-90 translate-y-[2px]'}`}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
