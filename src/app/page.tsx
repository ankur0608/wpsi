"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { AuthMode } from '../components/AuthModal';

const AuthModal = dynamic(() => import('../components/AuthModal'), { ssr: false });
const LandingFooter = dynamic(() => import('../components/LandingFooter'), { ssr: true });

interface LandingUser {
  name?: string | null;
  email: string;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [sessionUser, setSessionUser] = useState<LandingUser | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const displayName = sessionUser?.name?.trim() || sessionUser?.email?.split('@')[0] || 'My Account';
  const avatarName = encodeURIComponent(displayName);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    const timerElements = document.querySelectorAll('.countdown-timer');
    if (timerElements.length > 0) {
      let time = 2 * 3600 + 15 * 60 + 21;
      const interval = setInterval(() => {
        time--;
        if (time < 0) time = 0;
        const h = Math.floor(time / 3600).toString().padStart(2, '0');
        const m = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const s = Math.floor(time % 60).toString().padStart(2, '0');
        timerElements.forEach(el => {
          el.innerHTML = `${h}:${m}:${s}`;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
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
          console.error('Failed to load landing page session:', error);
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

  return (
    // ✅ FIX: replaced <> fragment with a proper containing div.
    // overflow-x-hidden clips the glow blobs that were causing horizontal
    // scroll and left-side clipping on mobile.
    <div className="relative w-full overflow-x-hidden">

      {/* ✅ FIX: Glow blobs moved inside a dedicated fixed-position layer
          that uses overflow:hidden so they never create layout overflow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="bg-glow-blue top-[-100px] left-[-100px]"></div>
        <div className="bg-glow-purple top-[40%] right-[-200px]"></div>
      </div>

      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 glass border-b border-white/5 transition-all-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-secondary flex items-center justify-center shadow-lg shadow-brand-500/30">
                <i className="fa-solid fa-graduation-cap text-xl text-white"></i>
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight">Mcpprep<span className="text-brand-500">zone</span></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center font-medium text-sm">
              <a href="#exams" className="text-slate-300 hover:text-white transition-colors">Exams</a>
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#rankers" className="text-slate-300 hover:text-white transition-colors">Rankers</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!sessionChecked ? (
                <div className="h-11 w-44 rounded-full border border-white/5 bg-white/5 animate-pulse"></div>
              ) : sessionUser ? (
                <Link href="/dashboard" className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:border-brand-500/30 hover:bg-white/10">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${avatarName}&background=1e293b&color=818cf8&bold=true&size=80`}
                    alt={displayName}
                    width={36}
                    height={36}
                    className="rounded-full border border-white/10"
                  />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white leading-tight">{displayName}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500">Dashboard Access</div>
                  </div>
                </Link>
              ) : (
                <>
                  <button type="button" onClick={() => openAuthModal('login')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors">Log In</button>
                  <button type="button" onClick={() => openAuthModal('register')} className="btn-primary px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-brand-500/20">Sign Up Free</button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                id="mobile-menu-btn"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((current) => !current)}
                className="text-slate-300 hover:text-white focus:outline-none"
              >
                <i className="fa-solid fa-bars text-2xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* ✅ FIX: removed glass-card (backdrop-blur on a child of a backdrop-filter
            parent doesn't composite correctly on mobile Safari/Chrome).
            Using a solid bg-[#0F172A] so the dropdown is fully opaque. */}
        <div id="mobile-menu" className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden absolute left-0 right-0 top-full w-full max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-white/10 bg-[#0F172A] shadow-2xl`}>
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#exams" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Exams</a>
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Features</a>
            <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Pricing</a>
            {sessionChecked && sessionUser ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${avatarName}&background=1e293b&color=818cf8&bold=true&size=80`}
                    alt={displayName}
                    width={40}
                    height={40}
                    className="rounded-full border border-white/10"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{displayName}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500">Logged In</div>
                  </div>
                </Link>
                <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-bold text-brand-400 hover:text-brand-300">Go to Dashboard</Link>
              </>
            ) : !sessionChecked ? (
              <div className="h-12 rounded-xl border border-white/5 bg-white/5 animate-pulse"></div>
            ) : (
              <>
                <button type="button" onClick={() => openAuthModal('login')} className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-slate-300 hover:text-white">Log In</button>
                <button type="button" onClick={() => openAuthModal('register')} className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-brand-500 hover:text-brand-400">Register</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* ✅ FIX: added overflow-hidden to prevent hero content from bleeding */}
      <main className="relative pt-28 md:pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-brand-500/30 text-sm font-medium text-brand-400 mb-8 animate-on-scroll">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            523 students are practicing right now
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-6 animate-on-scroll" style={{ "animationDelay": "0.1s" }}>
            Master Your Exam with <br className="hidden md:block" />
            <span className="text-gradient">AI-Powered Precision</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-400 mx-auto mb-10 animate-on-scroll" style={{ "animationDelay": "0.2s" }}>
            Join the elite ranks of government exam clearers. Smart study plans, gamified learning, and real-time analytics to keep you addicted to success.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group animate-on-scroll" style={{ "animationDelay": "0.3s" }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative flex items-center glass-card rounded-full p-2 border border-white/10">
              <i className="fa-solid fa-magnifying-glass text-slate-400 ml-4"></i>
              <input type="text" placeholder="Search syllabus: Electronics, Reasoning, Networks..." className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 px-4 py-3 placeholder-slate-500" />
              <a href="/dashboard" className="btn-primary rounded-full px-8 py-3 font-semibold whitespace-nowrap">Start Learning</a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/5 pt-10 animate-on-scroll" style={{ "animationDelay": "0.4s" }}>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">95%</h3>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Success Rate</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</h3>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Mock Tests Given</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">120+</h3>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Top Rankers</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">4.9/5</h3>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">App Rating</p>
            </div>
          </div>
        </div>
      </main>

      {/* FOMO Daily Quiz Section */}
      <section className="py-10 bg-dark-card/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border-warning/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 bg-warning h-full shadow-[0_0_20px_rgba(245,158,11,0.8)]"></div>

            <div className="flex items-center gap-6 mb-6 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center pulse-ring">
                <i className="fa-solid fa-bolt text-2xl text-warning"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  Daily Mega Quiz <span className="bg-danger text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">LIVE</span>
                </h3>
                <p className="text-slate-400 mt-1">Win 500 XP points and unlock premium notes for 24 hours!</p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="text-sm text-slate-400 mb-2 font-medium">Ends in</div>
              <div className="flex gap-2 mb-4">
                <div className="bg-dark-bg border border-white/10 rounded-lg px-3 py-2 text-xl font-bold font-mono countdown-timer text-warning">02:15:21</div>
              </div>
              <a href="#" onClick={() => console.log("Open practice modal")} className="bg-warning hover:bg-amber-400 text-dark-bg font-bold py-2.5 px-6 rounded-lg transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:scale-105">Join Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* WPSI Syllabus */}
      <section id="exams" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Master the <span className="text-gradient">Wireless PSI Syllabus</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Structured curriculum, precise mock tests, and smart analysis tailored exclusively for the WPSI examination.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Part A */}
            <div className="glass-card p-6 rounded-2xl hover-card-up border border-white/5 animate-on-scroll">
              <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center mb-4">
                <i className="fa-solid fa-brain text-brand-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Part A: General & Aptitude</h3>
              <p className="text-slate-400 text-sm mb-4">80 Marks • 80 Questions. Master Reasoning, Quantitative Aptitude, Constitution of India, and Current Affairs.</p>
              <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1 text-warning"><i className="fa-solid fa-star"></i> Min. 32 marks to qualify</span>
                <a href="/subjects" className="text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors">Start Prep <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>

            {/* Part B */}
            <div className="glass-card p-6 rounded-2xl hover-card-up border border-white/5 animate-on-scroll" style={{ "animationDelay": "0.1s" }}>
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <i className="fa-solid fa-microchip text-secondary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Part B: Technical Subjects</h3>
              <p className="text-slate-400 text-sm mb-4">120 Marks • 120 Questions. Dive deep into Electronics, Digital Circuits, Networks, Communications, Microwave, and Microprocessors.</p>
              <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1 text-warning"><i className="fa-solid fa-star"></i> Min. 48 marks to qualify</span>
                <a href="/subjects" className="text-secondary hover:text-purple-300 flex items-center gap-1 transition-colors">Start Prep <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification & Features Section */}
      <section id="features" className="py-20 bg-dark-card border-y border-white/5 relative overflow-hidden">
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-brand-500/10 to-secondary/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Learning that feels like a <span className="text-gradient">Game</span></h2>
              <p className="text-slate-400 mb-8 text-lg">We use proven psychological triggers to keep you motivated. Earn XP and climb the leaderboard. Your brain will crave the next study session.</p>

              <div className="space-y-6">
                {/* <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-dark-bg border border-white/10 flex items-center justify-center flex-shrink-0 text-warning text-xl shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <i className="fa-solid fa-fire"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Daily Streaks</h4>
                    <p className="text-sm text-slate-400">Don't break the chain. Build consistency and unlock special milestone badges.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-dark-bg border border-white/10 flex items-center justify-center flex-shrink-0 text-accent text-xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <i className="fa-solid fa-arrow-up-right-dots"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">XP Levels & Coins</h4>
                    <p className="text-sm text-slate-400">Earn coins for correct answers. Use them to unlock premium mock tests and topic hints.</p>
                  </div>
                </div> */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-dark-bg border border-white/10 flex items-center justify-center flex-shrink-0 text-secondary text-xl shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                    <i className="fa-solid fa-trophy"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">State-wide Leaderboard</h4>
                    <p className="text-sm text-slate-400">Compete with thousands of real aspirants. See where you stand before the actual exam.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Gamification mockup */}
            <div className="relative animate-on-scroll">
              <div className="glass-card rounded-2xl p-6 border border-white/10 shadow-2xl relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <Image src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" alt="User" width={48} height={48} className="rounded-full border-2 border-brand-500" />
                    <div>
                      <h5 className="font-bold">Rahul Parmar</h5>
                      <p className="text-xs text-brand-400 font-medium">Level 14 Scholar</p>
                    </div>
                  </div>
                  {/* <div className="text-right">
                    <div className="flex items-center gap-1 text-warning font-bold">
                      <i className="fa-solid fa-coins"></i> 2,450
                    </div>
                    <div className="flex items-center gap-1 text-accent font-bold text-sm">
                      <i className="fa-solid fa-fire"></i> 12 Day Streak
                    </div>
                  </div> */}
                </div>

                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">XP Progress</span>
                  <span className="text-brand-400 font-bold">850 / 1000 XP</span>
                </div>
                <div className="w-full bg-dark-bg rounded-full h-3 mb-6 border border-white/5">
                  <div className="bg-gradient-to-r from-brand-500 to-secondary h-3 rounded-full relative" style={{ "width": "85%" }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
                  </div>
                </div>

                <h6 className="font-bold text-sm text-slate-300 mb-3 uppercase tracking-wider">Recent Achievements</h6>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-dark-bg border border-white/5 rounded-xl p-3 text-center opacity-100 ring-1 ring-accent/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    <i className="fa-solid fa-bullseye text-2xl text-accent mb-2"></i>
                    <p className="text-[10px] font-bold">Sharpshooter</p>
                  </div>
                  <div className="bg-dark-bg border border-white/5 rounded-xl p-3 text-center opacity-100 ring-1 ring-warning/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                    <i className="fa-solid fa-clock text-2xl text-warning mb-2"></i>
                    <p className="text-[10px] font-bold">Speed Demon</p>
                  </div>
                  <div className="bg-dark-bg border border-white/5 rounded-xl p-3 text-center opacity-50 grayscale">
                    <i className="fa-solid fa-crown text-2xl text-slate-400 mb-2"></i>
                    <p className="text-[10px] font-bold">Mock King</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-brand-500 to-secondary rounded-full blur-2xl opacity-50 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Invest in your <span className="text-gradient">Future</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Get access to premium materials, AI analysis, and unlimited mock tests. Less than the cost of a daily tea.</p>

            {/* Urgent Discount Ribbon */}
            <div className="mt-6 inline-flex items-center gap-2 bg-danger/10 border border-danger/30 text-danger px-4 py-2 rounded-full text-sm font-bold animate-pulse">
              <i className="fa-solid fa-tag"></i> Flat 60% OFF - Ends Today!
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="glass-card rounded-2xl p-8 border border-white/5 flex flex-col animate-on-scroll">
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <p className="text-slate-400 text-sm mb-6">Perfect for starting your journey.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹0</span>
                <span className="text-slate-400 text-sm">/ forever</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-slate-300">
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent mt-1"></i> Daily 1 Free Quiz</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent mt-1"></i> Basic Analytics</li>
                <li className="flex items-start gap-3 text-slate-500"><i className="fa-solid fa-xmark mt-1"></i> No Full Mock Tests</li>
                <li className="flex items-start gap-3 text-slate-500"><i className="fa-solid fa-xmark mt-1"></i> Ads Enabled</li>
              </ul>
              <a href="/dashboard" className="w-full py-3 rounded-lg border border-white/20 text-center font-bold hover:bg-white/5 transition-colors">Get Started Free</a>
            </div>

            {/* Pro Plan */}
            <div className="glass-card rounded-2xl p-8 border border-brand-500 shadow-[0_0_30px_rgba(79,70,229,0.2)] flex flex-col relative transform md:-translate-y-4 animate-on-scroll" style={{ "animationDelay": "0.1s" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-500 to-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2 text-brand-400">Pro Scholar</h3>
              <p className="text-slate-400 text-sm mb-6">Everything you need to clear the exam.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹299</span>
                <span className="text-slate-400 text-sm line-through ml-2">₹799</span>
                <span className="text-slate-400 text-sm">/ mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-slate-300">
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-400 mt-1"></i> Unlimited Premium MCQs</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-400 mt-1"></i> 50+ Full Mock Tests</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-400 mt-1"></i> AI Weakness Detection</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-400 mt-1"></i> Ad-free experience</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-400 mt-1"></i> Detailed PDF Notes</li>
              </ul>
              <a href="/dashboard" className="w-full py-3 rounded-lg btn-primary text-center font-bold shadow-lg shadow-brand-500/30 text-white">Claim 60% Discount</a>
            </div>

            {/* Elite Plan */}
            <div className="glass-card rounded-2xl p-8 border border-white/5 flex flex-col animate-on-scroll" style={{ "animationDelay": "0.2s" }}>
              <h3 className="text-xl font-bold mb-2">Elite Master</h3>
              <p className="text-slate-400 text-sm mb-6">Personalized guidance and mentorship.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹999</span>
                <span className="text-slate-400 text-sm">/ mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-slate-300">
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent mt-1"></i> All Pro Features</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent mt-1"></i> 1-on-1 Mentor Calls</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent mt-1"></i> Mains Answer Evaluation</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent mt-1"></i> Private Telegram Group</li>
              </ul>
              <a href="/dashboard" className="w-full py-3 rounded-lg border border-white/20 text-center font-bold hover:bg-white/5 transition-colors">Upgrade to Elite</a>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />

      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onModeChange={setAuthMode}
      />

    </div>
  );
}