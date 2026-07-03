"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { AuthMode } from '@/components/AuthModal';

const AuthModal = dynamic(() => import('@/components/AuthModal'), { ssr: false });

interface LandingUser {
  name?: string | null;
  email: string;
}

export default function DynamicNavbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  // Pages with dark hero section at top where navbar should be transparent+white text initially
  const isDarkHeroPage = pathname === '/features' || pathname === '/pricing' || pathname === '/about' || pathname === '/blog' || pathname === '/contact' || pathname === '/testimonials' || pathname.startsWith('/blog-');
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [sessionUser, setSessionUser] = useState<LandingUser | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pointer-events-none">
        <nav 
          className={`max-w-7xl mx-auto rounded-2xl pointer-events-auto transition-all duration-300 ${navBgClass}`}
          style={{ backgroundColor: (isScrolled || !isDarkHeroPage) ? 'rgba(255, 255, 255, 0.95)' : 'transparent' }}
        >
            <div className="flex justify-between items-center h-16 px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,127,255,0.25)] group-hover:shadow-[0_6px_20px_rgba(0,127,255,0.4)] group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0">
                        <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
                    </div>
                    <div>
                        <span className={`font-display font-bold text-xl tracking-tight leading-none block transition-colors ${textColorClass}`}>MCQ Prep Zone</span>
                        <span className={`block text-[10px] font-bold tracking-widest uppercase mt-1 transition-colors ${subtitleColorClass}`}>WPSI Specialised</span>
                    </div>
                </Link>
                
                <div className="hidden lg:flex items-center gap-8">
                    <Link href="/" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block ${linkColorClass}`}>Home</Link>
                    <Link href="/features" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block ${linkColorClass}`}>Features</Link>
                    <Link href="/pricing" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block ${linkColorClass}`}>Pricing</Link>
                    <Link href="/blog" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block ${linkColorClass}`}>Blogs</Link>
                    <Link href="/about" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block ${linkColorClass}`}>About</Link>
                    <Link href="/contact" className={`font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5 inline-block ${linkColorClass}`}>Contact</Link>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className={`lg:hidden p-2 rounded-lg transition-colors pointer-events-auto ${iconHoverBgClass}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <svg className={`w-6 h-6 ${iconColorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                    </button>
                    
                    {!sessionChecked ? (
                        <div className="hidden sm:block h-10 w-24 animate-pulse rounded-xl bg-dark-100" />
                    ) : sessionUser ? (
                        <Link href="/dashboard" className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-sm transition-all duration-300 pointer-events-auto ${useLightText ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-primary-50 hover:bg-primary-100 text-primary-700'}`}>
                            <Image src={`https://ui-avatars.com/api/?name=${avatarName}&background=007FFF&color=fff&bold=true&size=80`} alt={displayName} width={28} height={28} className="rounded-full" unoptimized />
                            <span>Dashboard</span>
                        </Link>
                    ) : (
                        <div className="hidden sm:flex items-center gap-2 pointer-events-auto">
                            <button onClick={() => openAuthModal('login')} className={`font-bold text-sm px-4 py-2 rounded-xl transition-colors ${useLightText ? 'text-white hover:bg-white/10' : 'text-dark-700 hover:bg-dark-50'}`}>Login</button>
                            <button onClick={() => openAuthModal('register')} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(0,127,255,0.25)] hover:shadow-[0_6px_20px_rgba(0,127,255,0.35)] relative overflow-hidden group">
                                <span className="relative z-10">Get Started</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden max-w-7xl mx-auto bg-white/98 backdrop-blur-2xl border border-dark-100 px-4 py-4 space-y-3 rounded-2xl mt-2 shadow-2xl pointer-events-auto transition-all duration-300 ${mobileMenuOpen ? "block opacity-100" : "hidden opacity-0"}`}>
            <Link href="/" className="block px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">Home</Link>
            <Link href="/features" className="block px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">Features</Link>
            <Link href="/pricing" className="block px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">Pricing</Link>
            <Link href="/blog" className="block px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">Blogs</Link>
            <Link href="/about" className="block px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">About</Link>
            <Link href="/contact" className="block px-4 py-3 rounded-xl hover:bg-dark-50 text-dark-700 font-bold transition-colors">Contact</Link>
            
            <div className="px-2 mt-4 space-y-2 border-t border-dark-100 pt-4">
                {!sessionChecked ? (
                    <div className="h-12 w-full animate-pulse rounded-xl bg-dark-50" />
                ) : sessionUser ? (
                    <Link href="/dashboard" className="flex items-center justify-center gap-2 w-full bg-primary-50 hover:bg-primary-100 text-primary-700 py-3.5 rounded-xl font-bold transition-colors">
                        <Image src={`https://ui-avatars.com/api/?name=${avatarName}&background=007FFF&color=fff&bold=true&size=80`} alt={displayName} width={24} height={24} className="rounded-full" unoptimized />
                        Go to Dashboard
                    </Link>
                ) : (
                    <>
                        <button onClick={() => openAuthModal('login')} className="block w-full text-center bg-dark-50 hover:bg-dark-100 text-dark-700 py-3.5 rounded-xl font-bold transition-colors">Log In</button>
                        <button onClick={() => openAuthModal('register')} className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-xl font-bold shadow-md transition-colors">Get Started</button>
                    </>
                )}
            </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onModeChange={setAuthMode}
      />
    </>
  );
}
