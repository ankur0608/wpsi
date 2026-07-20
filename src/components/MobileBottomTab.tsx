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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012-2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-dark-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] z-50 pb-safe">
      <div className="flex justify-around items-center h-[68px] px-2 relative">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <Link
              key={tab.name}
              href={tab.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 relative ${
                active ? 'text-primary-600 scale-105' : 'text-dark-400 hover:text-dark-600'
              }`}
            >
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-600 rounded-b-full shadow-[0_2px_8px_rgba(14,165,233,0.4)]"></div>
              )}
              <div className={`mt-1 transition-transform duration-300 ${active ? '-translate-y-1' : ''}`}>
                 {tab.icon}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${active ? 'opacity-100 -translate-y-1' : 'opacity-70'}`}>{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
