"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';

interface NavLink {
  href: string;
  icon: string;
  label: string;
  onClick?: () => void;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useUser();
  const displayName = user?.name?.trim() || 'Profile';
  const displayLevel = user?.level;

  const links: NavLink[] = [
    { href: '/dashboard', icon: 'fa-house', label: 'Dashboard' },
    { href: '/subjects', icon: 'fa-book', label: 'Syllabus & Topics' },
    { href: '/practice', icon: 'fa-pen-to-square', label: 'MCQ Practice' },
    { href: '/test', icon: 'fa-clipboard-check', label: 'Mock Tests' },
    { href: '/pricing', icon: 'fa-tags', label: 'Pricing & Plans' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (href: string) => {
    if (href === '/subjects' && (pathname === '/subjects' || pathname === '/topics')) return true;
    return pathname === href;
  };

  return (
    <>
      {/* Mobile overlay */}
      <div 
        id="mobile-sidebar-overlay" 
        className={`fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleMenu}
      />

      {/* Sidebar */}
      <aside 
        id="sidebar"
        className={`w-64 glass border-r border-white/5 flex flex-col h-full flex-shrink-0 fixed md:relative z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-5 border-b border-white/5 gap-3">
          <Link href="/" className="flex items-center gap-2.5 flex-1">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <i className="fa-solid fa-graduation-cap text-white text-sm"></i>
            </div>
            <span className="font-heading font-bold text-lg text-white">
              WPSI<span className="text-brand-400">Pro</span>
            </span>
          </Link>
          <button 
            className="md:hidden text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5"
            onClick={toggleMenu}
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Navigation */}
        <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 px-3 pt-1">
            Navigation
          </div>
          <nav className="space-y-0.5">
            {links.map((link) => {
              const active = isActive(link.href);
              const baseClass = 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group';
              const activeClass = active
                ? `${baseClass} text-white`
                : `${baseClass} text-slate-400 hover:text-white hover:bg-white/5`;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    }
                    setIsOpen(false);
                  }}
                  className={activeClass}
                  style={
                    active
                      ? { background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }
                      : { border: '1px solid transparent' }
                  }
                >
                  <i className={`fa-solid ${link.icon} w-4 text-center ${
                    active ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'
                  }`}></i>
                  {link.label}
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400"></span>}
                </Link>
              );
            })}
          </nav>

          {/* Promo Card */}
          <div className="mt-5 px-1">
            <div 
              className="rounded-xl p-4 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.25)' }}
            >
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-20" style={{ background: 'radial-gradient(circle,#6366f1,transparent)' }}></div>
              <div className="text-[10px] font-bold text-brand-400 uppercase tracking-wider mb-1">🚀 WPSI 2025 Combo</div>
              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                Full Part A+B at <span className="text-white font-bold">₹249</span>. Best price of the season!
              </p>
              <Link 
                href="/pricing"
                className="block text-center w-full text-xs font-bold text-dark-bg py-2 rounded-lg transition-all"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
              >
                Upgrade Now →
              </Link>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-3 border-t border-white/5 mt-auto" style={{ background: 'rgba(8,12,24,0.5)' }}>
          <div 
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
            onClick={() => { window.location.href = '/profile'; }}
          >
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e293b&color=818cf8&bold=true&size=80`}
              className="w-9 h-9 rounded-xl border shrink-0 group-hover:border-brand-500/50 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              alt="User avatar"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate group-hover:text-brand-300 transition-colors">
                {loading ? 'Loading profile...' : displayName}
              </div>
              <div className="text-[10px] flex items-center gap-1" style={{ color: '#B4B2A9' }}>
                <i className="fa-solid fa-shield-halved text-[9px]"></i>{' '}
                {loading ? 'Syncing profile' : displayLevel !== undefined ? `Level ${displayLevel}` : 'Profile unavailable'}
              </div>
            </div>
            <Link 
              href="/settings"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:bg-white/10 hover:text-white transition-colors shrink-0"
              title="Settings"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fa-solid fa-gear text-xs"></i>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
