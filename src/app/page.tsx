"use client";
import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Image from 'next/image';
import LandingNavbar from '../components/LandingNavbar';

const LandingFooter = dynamic(() => import('../components/LandingFooter'), { ssr: true });

export default function Home() {
  /*
  const router = useRouter();

  const handleClaimDiscount = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const sessionRes = await fetch('/api/auth/session', {
        method: 'GET',
        cache: 'no-store',
      });
      let userData = null;
      if (sessionRes.ok) {
        const json = await sessionRes.json();
        userData = json.data;
      }
      
      await fetch('https://ankrpatel.app.n8n.cloud/webhook-test/b4d6888d-2e63-4161-b6b2-8b11f229bcb8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'claim_60_discount_clicked',
          user: userData,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Webhook error:', error);
    } finally {
      router.push('/dashboard');
    }
  };
  */

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

      <LandingNavbar />

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

          <p className="mt-4 max-w-2xl text-lg md:text-xl text-[var(--text-muted)] mx-auto mb-10 animate-on-scroll" style={{ "animationDelay": "0.2s" }}>
            Join the elite ranks of government exam clearers. Smart study plans, gamified learning, and real-time analytics to keep you addicted to success.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group animate-on-scroll" style={{ "animationDelay": "0.3s" }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative flex items-center glass-card rounded-full p-2 border border-[var(--border-subtle)]">
              <i className="fa-solid fa-magnifying-glass text-[var(--text-muted)] ml-4"></i>
              <input type="text" placeholder="Search syllabus: Electronics, Reasoning, Networks..." className="w-full bg-transparent border-none text-[var(--text-primary)] focus:outline-none focus:ring-0 px-4 py-3 placeholder-slate-500" />
              <a href="/dashboard" className="btn-primary rounded-full px-8 py-3 font-semibold whitespace-nowrap">Start Learning</a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-[var(--border-subtle)] pt-10 animate-on-scroll" style={{ "animationDelay": "0.4s" }}>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">95%</h3>
              <p className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider">Success Rate</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">50K+</h3>
              <p className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider">Mock Tests Given</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">120+</h3>
              <p className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider">Top Rankers</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">4.9/5</h3>
              <p className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider">App Rating</p>
            </div>
          </div>
        </div>
      </main>

      {/* FOMO Daily Quiz Section */}
      <section className="py-10 bg-dark-card/50 border-y border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border-warning/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 bg-warning h-full shadow-[0_0_20px_rgba(245,158,11,0.8)]"></div>

            <div className="flex items-center gap-6 mb-6 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center pulse-ring">
                <i className="fa-solid fa-bolt text-2xl text-warning"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                  Daily Mega Quiz <span className="bg-danger text-[var(--text-primary)] text-xs px-2 py-1 rounded-full font-bold animate-pulse">LIVE</span>
                </h3>
                <p className="text-[var(--text-muted)] mt-1">Win 500 XP points and unlock premium notes for 24 hours!</p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="text-sm text-[var(--text-muted)] mb-2 font-medium">Ends in</div>
              <div className="flex gap-2 mb-4">
                <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xl font-bold font-mono countdown-timer text-warning">02:15:21</div>
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
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">Structured curriculum, precise mock tests, and smart analysis tailored exclusively for the WPSI examination.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Part A */}
            <div className="glass-card p-6 rounded-2xl hover-card-up border border-[var(--border-subtle)] animate-on-scroll">
              <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center mb-4">
                <i className="fa-solid fa-brain text-brand-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Part A: General & Aptitude</h3>
              <p className="text-[var(--text-muted)] text-sm mb-4">80 Marks • 80 Questions. Master Reasoning, Quantitative Aptitude, Constitution of India, and Current Affairs.</p>
              <div className="flex items-center justify-between text-xs font-medium text-[var(--text-secondary)]">
                <span className="flex items-center gap-1 text-warning"><i className="fa-solid fa-star"></i> Min. 32 marks to qualify</span>
                <a href="/subjects" className="text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors">Start Prep <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>

            {/* Part B */}
            <div className="glass-card p-6 rounded-2xl hover-card-up border border-[var(--border-subtle)] animate-on-scroll" style={{ "animationDelay": "0.1s" }}>
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <i className="fa-solid fa-microchip text-secondary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Part B: Technical Subjects</h3>
              <p className="text-[var(--text-muted)] text-sm mb-4">120 Marks • 120 Questions. Dive deep into Electronics, Digital Circuits, Networks, Communications, Microwave, and Microprocessors.</p>
              <div className="flex items-center justify-between text-xs font-medium text-[var(--text-secondary)]">
                <span className="flex items-center gap-1 text-warning"><i className="fa-solid fa-star"></i> Min. 48 marks to qualify</span>
                <a href="/subjects" className="text-secondary hover:text-purple-300 flex items-center gap-1 transition-colors">Start Prep <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification & Features Section */}
      <section id="features" className="py-20 bg-dark-card border-y border-[var(--border-subtle)] relative overflow-hidden">
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-brand-500/10 to-secondary/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Learning that feels like a <span className="text-gradient">Game</span></h2>
              <p className="text-[var(--text-muted)] mb-8 text-lg">We use proven psychological triggers to keep you motivated. Earn XP and climb the leaderboard. Your brain will crave the next study session.</p>

              <div className="space-y-6">
                {/* <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center flex-shrink-0 text-warning text-xl shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <i className="fa-solid fa-fire"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)]">Daily Streaks</h4>
                    <p className="text-sm text-[var(--text-muted)]">Don't break the chain. Build consistency and unlock special milestone badges.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center flex-shrink-0 text-accent text-xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <i className="fa-solid fa-arrow-up-right-dots"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)]">XP Levels & Coins</h4>
                    <p className="text-sm text-[var(--text-muted)]">Earn coins for correct answers. Use them to unlock premium mock tests and topic hints.</p>
                  </div>
                </div> */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center flex-shrink-0 text-secondary text-xl shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                    <i className="fa-solid fa-trophy"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)]">State-wide Leaderboard</h4>
                    <p className="text-sm text-[var(--text-muted)]">Compete with thousands of real aspirants. See where you stand before the actual exam.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Gamification mockup */}
            <div className="relative animate-on-scroll">
              <div className="glass-card rounded-2xl p-6 border border-[var(--border-subtle)] shadow-2xl relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <Image src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" alt="User" width={48} height={48} className="rounded-full border-2 border-brand-500" unoptimized />
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
                  <span className="text-[var(--text-secondary)] font-medium">XP Progress</span>
                  <span className="text-brand-400 font-bold">850 / 1000 XP</span>
                </div>
                <div className="w-full bg-[var(--bg-primary)] rounded-full h-3 mb-6 border border-[var(--border-subtle)]">
                  <div className="bg-gradient-to-r from-brand-500 to-secondary h-3 rounded-full relative" style={{ "width": "85%" }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
                  </div>
                </div>

                <h6 className="font-bold text-sm text-[var(--text-secondary)] mb-3 uppercase tracking-wider">Recent Achievements</h6>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-3 text-center opacity-100 ring-1 ring-accent/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    <i className="fa-solid fa-bullseye text-2xl text-accent mb-2"></i>
                    <p className="text-[10px] font-bold">Sharpshooter</p>
                  </div>
                  <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-3 text-center opacity-100 ring-1 ring-warning/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                    <i className="fa-solid fa-clock text-2xl text-warning mb-2"></i>
                    <p className="text-[10px] font-bold">Speed Demon</p>
                  </div>
                  <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-3 text-center opacity-50 grayscale">
                    <i className="fa-solid fa-crown text-2xl text-[var(--text-muted)] mb-2"></i>
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
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">Get access to premium materials, AI analysis, and unlimited mock tests. Less than the cost of a daily tea.</p>

            {/* Urgent Discount Ribbon */}
            <div className="mt-6 inline-flex items-center gap-2 bg-danger/10 border border-danger/30 text-danger px-4 py-2 rounded-full text-sm font-bold animate-pulse">
              <i className="fa-solid fa-tag"></i> Flat 60% OFF - Ends Today!
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="glass-card rounded-2xl p-8 border border-[var(--border-subtle)] flex flex-col animate-on-scroll">
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <p className="text-[var(--text-muted)] text-sm mb-6">Perfect for starting your journey.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹0</span>
                <span className="text-[var(--text-muted)] text-sm">/ forever</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent mt-1"></i> Daily 1 Free Quiz</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent mt-1"></i> Basic Analytics</li>
                <li className="flex items-start gap-3 text-[var(--text-muted)]"><i className="fa-solid fa-xmark mt-1"></i> No Full Mock Tests</li>
                <li className="flex items-start gap-3 text-[var(--text-muted)]"><i className="fa-solid fa-xmark mt-1"></i> Ads Enabled</li>
              </ul>
              <a href="/dashboard" className="w-full py-3 rounded-lg border border-[var(--border-subtle)] text-center font-bold hover:bg-white/5 transition-colors">Get Started Free</a>
            </div>

            {/* Pro Plan */}
            <div className="glass-card rounded-2xl p-8 border border-brand-500 shadow-[0_0_30px_rgba(79,70,229,0.2)] flex flex-col relative transform md:-translate-y-4 animate-on-scroll" style={{ "animationDelay": "0.1s" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-500 to-secondary text-[var(--text-primary)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2 text-brand-400">Pro Scholar</h3>
              <p className="text-[var(--text-muted)] text-sm mb-6">Everything you need to clear the exam.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹299</span>
                <span className="text-[var(--text-muted)] text-sm line-through ml-2">₹799</span>
                <span className="text-[var(--text-muted)] text-sm">/ mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-400 mt-1"></i> Unlimited Premium MCQs</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-400 mt-1"></i> 50+ Full Mock Tests</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-400 mt-1"></i> AI Weakness Detection</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-400 mt-1"></i> Ad-free experience</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-400 mt-1"></i> Detailed PDF Notes</li>
              </ul>
              {/* <a href="/dashboard" onClick={handleClaimDiscount} className="w-full py-3 rounded-lg btn-primary text-center font-bold shadow-lg shadow-brand-500/30 text-[var(--text-primary)]">Claim 60% Discount</a> */}
              <a href="/dashboard" className="w-full py-3 rounded-lg btn-primary text-center font-bold shadow-lg shadow-brand-500/30 text-[var(--text-primary)]">Claim 60% Discount</a>
            </div>

            {/* Elite Plan */}
            <div className="glass-card rounded-2xl p-8 border border-[var(--border-subtle)] flex flex-col animate-on-scroll" style={{ "animationDelay": "0.2s" }}>
              <h3 className="text-xl font-bold mb-2">Elite Master</h3>
              <p className="text-[var(--text-muted)] text-sm mb-6">Personalized guidance and mentorship.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹999</span>
                <span className="text-[var(--text-muted)] text-sm">/ mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent mt-1"></i> All Pro Features</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent mt-1"></i> 1-on-1 Mentor Calls</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent mt-1"></i> Mains Answer Evaluation</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent mt-1"></i> Private Telegram Group</li>
              </ul>
              <a href="/dashboard" className="w-full py-3 rounded-lg border border-[var(--border-subtle)] text-center font-bold hover:bg-white/5 transition-colors">Upgrade to Elite</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Frequently Asked <span className="text-gradient">Questions</span></h2>
            <p className="text-[var(--text-muted)]">Got questions? We've got answers.</p>
          </div>
          <div className="space-y-4 animate-on-scroll">
            <div className="glass-card p-6 rounded-2xl border border-[var(--border-subtle)]">
              <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)]">What exams do you cover?</h3>
              <p className="text-[var(--text-muted)] text-sm">We currently offer comprehensive test series for Wireless PSI, GPSC Class 1/2, Talati, and SSC exams.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-[var(--border-subtle)]">
              <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)]">Are the mock tests based on the latest syllabus?</h3>
              <p className="text-[var(--text-muted)] text-sm">Yes, our subject matter experts regularly update the mock tests and MCQ database to adhere to the latest syllabi.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-[var(--border-subtle)]">
              <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)]">How does the AI Study Planner work?</h3>
              <p className="text-[var(--text-muted)] text-sm">Our AI analyzes your performance across different subjects and suggests specific topics you need to revise, maximizing your study time.</p>
            </div>
          </div>
          <div className="text-center mt-8 animate-on-scroll">
            <Link href="/faq" className="text-brand-400 hover:text-brand-300 font-medium">View all FAQs &rarr;</Link>
          </div>
        </div>
      </section>

      {/* JSON-LD FAQ Schema for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What exams do you cover?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We currently offer comprehensive test series for Wireless PSI, GPSC Class 1/2, Talati, and SSC exams."
                }
              },
              {
                "@type": "Question",
                "name": "Are the mock tests based on the latest syllabus?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our subject matter experts regularly update the mock tests and MCQ database to adhere to the latest syllabi."
                }
              },
              {
                "@type": "Question",
                "name": "How does the AI Study Planner work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our AI analyzes your performance across different subjects and suggests specific topics you need to revise, maximizing your study time."
                }
              }
            ]
          })
        }}
      />

      <LandingFooter />



    </div>
  );
}
