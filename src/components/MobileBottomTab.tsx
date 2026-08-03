"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomTab() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/exam') {
      return pathname === '/exam' || pathname.startsWith('/subjects') || pathname.startsWith('/topics');
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const tabs = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
      )
    },
    {
      name: 'Exam',
      path: '/exam',
      icon: (
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      )
    },
    {
      name: 'Notes',
      path: '/notes',
      icon: (
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      )
    },
    {
      name: 'Mock Tests',
      path: '/test',
      icon: (
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      )
    },
    {
      name: 'Progress',
      path: '/progress',
      icon: (
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
      )
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: (
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      )
    }
  ];

  return (
    <div id="mobile-bottom-tab" className="lg:hidden fixed bottom-0 left-0 right-0 w-full z-50 pb-safe">
      <div className="bg-white/95 backdrop-blur-xl border-t border-dark-100 shadow-[0_-8px_24px_rgba(0,0,0,0.04)] flex overflow-x-auto hide-scrollbar items-center h-[76px] px-2 sm:px-4 relative gap-1 snap-x snap-mandatory pt-1">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <Link
              key={tab.name}
              href={tab.path}
              className={`snap-center flex flex-col items-center justify-center min-w-[64px] flex-1 flex-shrink-0 h-[85%] rounded-[1.5rem] transition-all duration-300 ${
                active ? 'bg-primary-50/80 text-primary-600 shadow-sm scale-[1.02]' : 'text-dark-400 hover:text-dark-600 hover:bg-dark-50/50'
              }`}
            >
              <div className={`transition-transform duration-300 flex items-center justify-center ${active ? 'scale-110 mb-0.5' : 'mb-1'}`}>
                 {tab.icon}
              </div>
              <span className={`text-[8px] font-extrabold uppercase tracking-normal whitespace-nowrap transition-all duration-300 ${active ? 'opacity-100' : 'opacity-70'}`}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
