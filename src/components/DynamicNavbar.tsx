"use client";
import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage, LANGUAGE_OPTIONS } from '@/context/LanguageContext';
import type { AuthMode } from '@/components/AuthModal';

const AuthModal = dynamic(() => import('@/components/AuthModal'), { ssr: false });

interface LandingUser {
  name?: string | null;
  email: string;
}

export default function DynamicNavbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { language, setLanguage, t } = useLanguage();
  
  // Pages with dark hero section at top where navbar should be transparent+white text initially
  const isDarkHeroPage = false;
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [sessionUser, setSessionUser] = useState<LandingUser | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const displayName = sessionUser?.name?.trim() || sessionUser?.email?.split('@')[0] || 'My Account';
  const avatarName = encodeURIComponent(displayName);

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          console.error('Failed to load session:', error);
          setSessionUser(null);
        }
      } finally {
        if (active) setSessionChecked(true);
      }
    };
    void loadSession();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
  }, [pathname]);

  // Determine styles based on scroll & page
  const useLightText = isDarkHeroPage && !isScrolled;
  
  const navBgClass = isScrolled || !isDarkHeroPage 
    ? 'backdrop-blur-xl border border-dark-200/50 shadow-[0_12px_40px_-12px_rgba(0,51,102,0.08)]' 
    : 'bg-transparent border-transparent shadow-none';
    
  const textColorClass = useLightText ? 'text-white' : 'text-dark-900';
  const linkColorClass = useLightText ? 'text-white/80 hover:text-white' : 'text-dark-600 hover:text-primary-600';
  const subtitleColorClass = useLightText ? 'text-primary-200' : 'text-primary-600';
  const iconColorClass = useLightText ? 'text-white' : 'text-dark-700';
  const iconHoverBgClass = useLightText ? 'hover:bg-white/10' : 'hover:bg-dark-50';

  return (
    <>
      <header 
        style={isScrolled ? { backgroundColor: 'rgba(255, 255, 255, 0.96)' } : undefined}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'w-full bg-white backdrop-blur-xl border-b border-dark-200/50 shadow-[0_4px_20px_-4px_rgba(0,51,102,0.08)] pt-0 px-0 pointer-events-auto' 
            : 'pt-4 px-4 sm:px-6 lg:px-8 bg-transparent pointer-events-none'
        }`}
      >
        <nav 
          style={!isScrolled && !isDarkHeroPage ? { backgroundColor: 'rgba(255, 255, 255, 0.96)' } : undefined}
          className={`max-w-7xl mx-auto transition-all duration-300 pointer-events-auto ${
            isScrolled 
              ? 'px-4 sm:px-6 lg:px-8 rounded-none bg-transparent border-transparent shadow-none' 
              : (isDarkHeroPage 
                  ? 'rounded-2xl bg-transparent border-transparent shadow-none' 
                  : 'rounded-2xl backdrop-blur-xl border border-dark-200/50 shadow-[0_12px_40px_-12px_rgba(0,51,102,0.08)] bg-white')
          }`}
        >
            <div className="flex justify-between items-center h-16 px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,127,255,0.25)] group-hover:shadow-[0_6px_20px_rgba(0,127,255,0.4)] group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0">
                        <Image src="/logo.jpeg" alt="Logo" fill sizes="40px" className="object-cover" />
                    </div>
                    <div>
                        <span className={`font-display font-bold text-xl tracking-tight leading-none block transition-colors ${textColorClass}`}>MCQ Prep Zone</span>
                        <span className={`block text-[10px] font-bold tracking-widest uppercase mt-1 transition-colors ${subtitleColorClass}`}>{t('navSpecialised')}</span>
                    </div>
                </Link>
                
                <div className="hidden lg:flex items-center gap-7">
                    <Link href="/" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block ${linkColorClass}`}>{t('navHome')}</Link>
                    <Link href="/government-exams" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-flex items-center gap-1.5 ${linkColorClass}`}>
                      <span>{t('navGovtExams')}</span>
                      <span className="bg-accent-500 text-dark-900 text-[10px] px-1.5 py-0.2 rounded-full font-extrabold uppercase">{t('navLive')}</span>
                    </Link>
                    <Link href="/features" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block ${linkColorClass}`}>{t('navFeatures')}</Link>
                    <Link href="/pricing" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block ${linkColorClass}`}>{t('navPricing')}</Link>
                    <Link href="/blog" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block ${linkColorClass}`}>{t('navBlogs')}</Link>
                    <Link href="/about" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block ${linkColorClass}`}>{t('navAbout')}</Link>
                    <Link href="/contact" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block ${linkColorClass}`}>{t('navContact')}</Link>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Desktop Language Dropdown */}
                    <div className="relative hidden sm:block pointer-events-auto" ref={langDropdownRef}>
                        <button
                            type="button"
                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs tracking-wide transition-all duration-200 border cursor-pointer ${
                                useLightText
                                    ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                                    : 'bg-dark-50 hover:bg-dark-100 text-dark-700 border-dark-200/80'
                            }`}
                            aria-label="Select language"
                            aria-expanded={langDropdownOpen}
                        >
                            <Globe className="w-3.5 h-3.5 opacity-80" />
                            <span>{LANGUAGE_OPTIONS.find(l => l.code === language)?.nativeLabel || 'English'}</span>
                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {langDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-dark-100 shadow-[0_12px_36px_rgba(0,0,0,0.12)] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-dark-400 border-b border-dark-100 mb-1">
                                    {t('selectLanguage')}
                                </div>
                                {LANGUAGE_OPTIONS.map((opt) => {
                                    const isActive = language === opt.code;
                                    return (
                                        <button
                                            key={opt.code}
                                            type="button"
                                            onClick={() => {
                                                setLanguage(opt.code);
                                                setLangDropdownOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                                                isActive
                                                    ? 'bg-primary-50 text-primary-700 font-extrabold'
                                                    : 'text-dark-700 hover:bg-dark-50'
                                            }`}
                                        >
                                            <div className="flex flex-col text-left">
                                                <span className="leading-tight">{opt.nativeLabel}</span>
                                                <span className="text-[10px] font-medium text-dark-400">({opt.label})</span>
                                            </div>
                                            {isActive && <Check className="w-4 h-4 text-primary-600 stroke-[2.5]" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <button aria-label="Toggle mobile menu" className={`lg:hidden p-2 rounded-lg transition-colors pointer-events-auto ${iconHoverBgClass}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <svg className={`w-6 h-6 ${iconColorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                    </button>
                    
                    {!sessionChecked ? (
                        <div className="hidden sm:block h-10 w-24 animate-pulse rounded-xl bg-dark-100" />
                    ) : sessionUser ? (
                        <Link href="/dashboard" className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-sm transition-all duration-300 pointer-events-auto ${useLightText ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-primary-50 hover:bg-primary-100 text-primary-700'}`}>
                            <Image src={`https://ui-avatars.com/api/?name=${avatarName}&background=007FFF&color=fff&bold=true&size=80`} alt={displayName} width={28} height={28} className="rounded-full" unoptimized />
                            <span>{t('navDashboard')}</span>
                        </Link>
                    ) : (
                        <div className="hidden sm:flex items-center gap-2 pointer-events-auto">
                            <button onClick={() => openAuthModal('login')} className={`font-bold text-sm px-4 py-2 rounded-xl transition-colors cursor-pointer ${useLightText ? 'text-white hover:bg-white/10' : 'text-dark-700 hover:bg-dark-50'}`}>{t('navLogin')}</button>
                            <button onClick={() => openAuthModal('register')} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(0,127,255,0.25)] hover:shadow-[0_6px_20px_rgba(0,127,255,0.35)] relative overflow-hidden group cursor-pointer">
                                <span className="relative z-10">{t('navGetStarted')}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden max-w-7xl mx-auto bg-white backdrop-blur-2xl border border-dark-100 px-4 py-4 space-y-3 rounded-2xl mx-4 sm:mx-6 mt-2 mb-4 shadow-2xl pointer-events-auto transition-all duration-300 ${mobileMenuOpen ? "block opacity-100" : "hidden opacity-0"}`}>
            {/* Mobile Language Switcher */}
            <div className="bg-dark-50 p-2 rounded-xl border border-dark-100 mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold mb-2 px-1 text-dark-500">
                    <Globe className="w-3.5 h-3.5 text-primary-600" />
                    <span>{t('selectLanguage')}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                    {LANGUAGE_OPTIONS.map((opt) => {
                        const isActive = language === opt.code;
                        return (
                            <button
                                key={opt.code}
                                type="button"
                                onClick={() => setLanguage(opt.code)}
                                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                                    isActive
                                        ? 'bg-primary-600 text-white shadow-sm'
                                        : 'bg-white text-dark-700 hover:bg-dark-100 border border-dark-100'
                                }`}
                            >
                                {opt.nativeLabel}
                            </button>
                        );
                    })}
                </div>
            </div>

            <Link href="/" className="block px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">{t('navHome')}</Link>
            <Link href="/government-exams" className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">
                <span>{t('navGovtExams')}</span>
                <span className="bg-accent-500 text-dark-900 text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase">{t('navLive')}</span>
            </Link>
            <Link href="/features" className="block px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">{t('navFeatures')}</Link>
            <Link href="/pricing" className="block px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">{t('navPricing')}</Link>
            <Link href="/blog" className="block px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">{t('navBlogs')}</Link>
            <Link href="/about" className="block px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">{t('navAbout')}</Link>
            <Link href="/contact" className="block px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">{t('navContact')}</Link>
            
            <div className="px-2 mt-4 space-y-2 border-t border-dark-100 pt-4">
                {!sessionChecked ? (
                    <div className="h-12 w-full animate-pulse rounded-xl bg-dark-50" />
                ) : sessionUser ? (
                    <Link href="/dashboard" className="flex items-center justify-center gap-2 w-full bg-primary-50 hover:bg-primary-100 text-primary-700 py-3.5 rounded-xl font-bold transition-colors">
                        <Image src={`https://ui-avatars.com/api/?name=${avatarName}&background=007FFF&color=fff&bold=true&size=80`} alt={displayName} width={24} height={24} className="rounded-full" unoptimized />
                        {t('navDashboard')}
                    </Link>
                ) : (
                    <>
                        <button onClick={() => openAuthModal('login')} className="block w-full text-center bg-dark-50 hover:bg-dark-100 text-dark-700 py-3.5 rounded-xl font-bold transition-colors cursor-pointer">{t('navLogin')}</button>
                        <button onClick={() => openAuthModal('register')} className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-xl font-bold shadow-md transition-colors cursor-pointer">{t('navGetStarted')}</button>
                    </>
                )}
            </div>
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onModeChange={setAuthMode}
      />
    </>
  );
}
