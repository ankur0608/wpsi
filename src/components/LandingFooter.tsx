import React from 'react';
import Link from 'next/link';

export default function LandingFooter() {
  return (
    <footer className="bg-dark-bg border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-secondary flex items-center justify-center">
                <i className="fa-solid fa-graduation-cap text-white text-sm"></i>
              </div>
              <span className="font-heading font-bold text-xl text-white">Mcpprep<span className="text-brand-500">zone</span></span>
            </div>
            <p className="text-slate-400 text-sm mb-6">Empowering aspirants to achieve their government job dreams with AI-driven, gamified learning.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all"><i className="fa-brands fa-youtube"></i></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Exams</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-brand-400 transition-colors">Wireless PSI</Link></li>
              <li><Link href="/" className="hover:text-brand-400 transition-colors">Gujarat Police PSI</Link></li>
              <li><Link href="/" className="hover:text-brand-400 transition-colors">GPSC Class 1/2</Link></li>
              <li><Link href="/" className="hover:text-brand-400 transition-colors">Talati</Link></li>
              <li><Link href="/" className="hover:text-brand-400 transition-colors">SSC CGL</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal & Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/contact" className="hover:text-brand-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-brand-400 transition-colors">Terms and Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-brand-400 transition-colors">Refund Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-brand-400 transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Get the App</h4>
            <p className="text-sm text-slate-400 mb-4">Practice on the go with our mobile app.</p>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors">
                <i className="fa-brands fa-google-play text-2xl text-brand-400"></i>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 leading-none">GET IT ON</div>
                  <div className="font-bold text-sm leading-tight text-white">Google Play</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors">
                <i className="fa-brands fa-apple text-2xl text-white"></i>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 leading-none">Download on the</div>
                  <div className="font-bold text-sm leading-tight text-white">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2026 Mcpprepzone. All rights reserved.</p>
          <div className="flex space-x-6 flex-wrap justify-center mt-4 md:mt-0">
            <Link href="/faq" className="hover:text-slate-300">FAQ</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms</Link>
            <Link href="/privacy" className="hover:text-slate-300">Privacy</Link>
            <Link href="/refund-policy" className="hover:text-slate-300">Refunds</Link>
            <Link href="/contact" className="hover:text-slate-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
