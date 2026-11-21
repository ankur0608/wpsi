"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FooterSection() {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark-900 text-dark-300 py-16 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
                <div className="sm:col-span-2 lg:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <Image src="/logo.jpeg" alt="MCQ Prep Zone Logo" width={48} height={48} className="rounded-xl object-cover shadow-sm bg-white p-0.5" />
                        <h2 className="font-display font-bold text-2xl text-white tracking-tight whitespace-nowrap">MCQ Prep Zone</h2>
                    </div>
                    <p className="text-sm text-dark-400 mb-6 max-w-sm leading-relaxed">{t('footerDesc')}</p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">{t('footerQuickLinks')}</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-accent-400 transition-colors">{t('navHome')}</Link></li>
                        <li><Link href="/government-exams" className="hover:text-accent-400 transition-colors">{t('navGovtExams')}</Link></li>
                        <li><Link href="/about" className="hover:text-accent-400 transition-colors">{t('navAbout')}</Link></li>
                        <li><Link href="/pricing" className="hover:text-accent-400 transition-colors">{t('navPricing')}</Link></li>
                        <li><Link href="/features" className="hover:text-accent-400 transition-colors">{t('navFeatures')}</Link></li>
                        <li><Link href="/blog" className="hover:text-accent-400 transition-colors">{t('navBlogs')}</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">{t('footerExplore')}</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/daily-challenge" className="hover:text-accent-400 transition-colors">{t('challengeBadge')}</Link></li>
                        <li><Link href="/faq" className="hover:text-accent-400 transition-colors">FAQ</Link></li>
                        <li><Link href="/contact" className="hover:text-accent-400 transition-colors">{t('navContact')}</Link></li>
                        <li><Link href="/support" className="hover:text-accent-400 transition-colors">Support Center</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">{t('footerLegal')}</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/privacy" className="hover:text-accent-400 transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-accent-400 transition-colors">Terms of Service</Link></li>
                        <li><Link href="/cancellation" className="hover:text-accent-400 transition-colors">Cancellation & Refunds</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">{t('footerContact')}</h4>
                    <ul className="space-y-2 text-sm">
                        <li>Email: mcqprepzone@gmail.com</li>
                        <li>Location: Ahmedabad, Gujarat</li>
                    </ul>
                    <div className="mt-4 flex gap-4">
                        <a href="https://www.instagram.com/mcqprepzone?igsh=OHZuYmt2ajR2bzhi" target="_blank" rel="noopener noreferrer" aria-label="Follow Mcqprepzone on Instagram" className="text-white/70 hover:text-pink-500 text-xl transition-colors"><i className="fa-brands fa-instagram"></i><span className="sr-only">Instagram</span></a>
                        <a href="https://t.me/wirelesspsimcqspractise" target="_blank" rel="noopener noreferrer" aria-label="Join our Telegram Channel" className="text-white/70 hover:text-blue-400 text-xl transition-colors"><i className="fa-brands fa-telegram"></i><span className="sr-only">Telegram</span></a>
                        <a href="https://www.facebook.com/share/18UGszYzH9/" target="_blank" rel="noopener noreferrer" aria-label="Follow Mcqprepzone on Facebook" className="text-white/70 hover:text-blue-600 text-xl transition-colors"><i className="fa-brands fa-facebook"></i><span className="sr-only">Facebook</span></a>
                    </div>
                </div>
            </div>
            <div className="text-center text-xs border-t border-dark-800 pt-8">
                &copy; 2026 {t('footerRights')}
            </div>
        </div>
    </footer>
  );
}
