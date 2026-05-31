import React from 'react';
import Link from 'next/link';

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 glass border-b border-white/5 transition-all-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-secondary flex items-center justify-center shadow-lg shadow-brand-500/30">
                <i className="fa-solid fa-graduation-cap text-xl text-white"></i>
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-white">Exam<span className="text-brand-500">Pro</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center font-medium text-sm">
            <Link href="/#exams" className="text-slate-300 hover:text-white transition-colors">Exams</Link>
            <Link href="/#features" className="text-slate-300 hover:text-white transition-colors">Features</Link>
            <Link href="/#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">Log In</Link>
            <Link href="/register" className="btn-primary px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-brand-500/20 text-white">Sign Up Free</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
