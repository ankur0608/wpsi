"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import type { AuthMode } from '@/components/AuthModal';
import { useThemeToggle } from '@/context/ThemeContext';

const AuthModal = dynamic(() => import('@/components/AuthModal'), { ssr: false });

interface LandingUser {
  name?: string | null;
  email: string;
}

export default function LandingNavbar() {
  const { theme } = useThemeToggle();
  const pathname = usePathname();
  const isLight = theme === 'light';
  const isHome = pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [sessionUser, setSessionUser] = useState<LandingUser | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  const navLinks = [
    { href: isHome ? '#exams' : '/#exams', label: 'Exams' },
    { href: isHome ? '#features' : '/#features', label: 'Features' },
    { href: isHome ? '#rankers' : '/#rankers', label: 'Rankers' },
    { href: isHome ? '#pricing' : '/#pricing', label: 'Pricing' },
  ];

  const displayName = sessionUser?.name?.trim() || sessionUser?.email?.split('@')[0] || 'My Account';
  const avatarName = encodeURIComponent(displayName);

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      try {
        const response = await fetch('/api/auth/session', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!active) return;

        if (!response.ok) {
          setSessionUser(null);
          return;
        }

        const json = await response.json();
        setSessionUser(json.data ?? null);
      } catch (error) {
        if (active) {
          console.error('Failed to load public navbar session:', error);
          setSessionUser(null);
        }
      } finally {
        if (active) {
          setSessionChecked(true);
        }
      }
    };

    void loadSession();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 w-full z-50 border-b transition-all-300"
        style={{
          background: isLight
            ? 'rgba(245,240,232,0.97)'
            : 'rgba(13,27,42,0.96)',
          borderColor: isLight
            ? 'rgba(180,122,32,0.18)'
            : 'rgba(212,146,42,0.10)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-secondary flex items-center justify-center shadow-lg shadow-brand-500/30">
                  <i className="fa-solid fa-graduation-cap text-xl text-white"></i>
                </div>
                <span
                  className="font-heading font-bold text-2xl tracking-tight"
                  style={{ color: isLight ? '#1A2A3A' : '#F2ECD9' }}
                >
                  Mcqprep<span className="text-brand-500">zone</span>
                </span>
              </Link>
            </div>

            <div className="hidden md:flex space-x-8 items-center font-medium text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-brand-400"
                  style={{ color: isLight ? 'rgba(26,42,58,0.7)' : 'rgba(255,255,255,0.7)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />

              {!sessionChecked ? (
                <div className="h-11 w-44 animate-pulse rounded-full border border-white/5 bg-white/5" />
              ) : sessionUser ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:border-brand-500/30 hover:bg-white/10"
                >
                  <Image
                    src={`https://ui-avatars.com/api/?name=${avatarName}&background=1e293b&color=818cf8&bold=true&size=80`}
                    alt={displayName}
                    width={36}
                    height={36}
                    className="rounded-full border border-white/10"
                    unoptimized
                  />
                  <div className="text-left">
                    <div className="text-sm font-semibold leading-tight text-primary-text">{displayName}</div>
                    <div className="text-[10px] uppercase tracking-wider text-secondary-text">Dashboard Access</div>
                  </div>
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="font-medium text-sm transition-colors hover:text-brand-400"
                    style={{ color: isLight ? 'rgba(26,42,58,0.75)' : 'rgba(255,255,255,0.75)' }}
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal('register')}
                    className="btn-primary px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-brand-500/20"
                  >
                    Sign Up Free
                  </button>
                </>
              )}
            </div>

            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle compact />
              <button
                type="button"
                aria-controls="landing-mobile-menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((current) => !current)}
                className="transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <i className="fa-solid fa-bars text-2xl"></i>
              </button>
            </div>
          </div>
        </div>

        <div
          id="landing-mobile-menu"
          className={`${mobileMenuOpen ? 'block' : 'hidden'} absolute left-0 right-0 top-full w-full border-b border-white/10 shadow-2xl md:hidden`}
          style={{
            background: isLight ? 'rgba(245,240,232,0.99)' : 'rgba(15,23,42,0.99)',
            borderColor: isLight ? 'rgba(180,122,32,0.18)' : 'rgba(255,255,255,0.10)',
          }}
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-white/5 hover:text-brand-400"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
              </Link>
            ))}

            {sessionChecked && sessionUser ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${avatarName}&background=1e293b&color=818cf8&bold=true&size=80`}
                    alt={displayName}
                    width={40}
                    height={40}
                    className="rounded-full border border-white/10"
                    unoptimized
                  />
                  <div>
                    <div className="text-sm font-bold text-primary-text">{displayName}</div>
                    <div className="text-[10px] uppercase tracking-wider text-secondary-text">Logged In</div>
                  </div>
                </Link>
                <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-bold text-brand-400 hover:text-brand-300">
                  Go to Dashboard
                </Link>
              </>
            ) : !sessionChecked ? (
              <div className="h-12 rounded-xl border border-white/5 bg-white/5 animate-pulse" />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-bold text-secondary-text hover:text-brand-400"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal('register')}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-bold text-brand-500 hover:text-brand-400"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onModeChange={setAuthMode}
      />
    </>
  );
}
