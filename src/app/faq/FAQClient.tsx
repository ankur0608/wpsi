"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronRight, 
  ChevronDown,
  MessageCircle
} from 'lucide-react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { faqData } from '@/data/faqData';

export default function FAQClient() {
  const { language } = useLanguage();
  const currentLang: Language = (language in faqData) ? language : 'en';
  const content = faqData[currentLang] || faqData.en;

  // Track open state for individual items (categoryIdx-itemIdx)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true, // Keep the first question open by default
  });

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      {/* Top Hero Section */}
      <section className="relative bg-white pt-28 sm:pt-32 pb-20 sm:pb-24 overflow-hidden border-b border-dark-100">
        {/* Premium Grid Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        {/* Soft Glowing Orbs */}
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-40 top-20 w-72 h-72 bg-accent-100/30 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-dark-500 mb-6 sm:mb-8 justify-start" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-600 transition-colors">{content.breadcrumbHome || 'Home'}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-dark-400" />
            <span className="text-dark-900 font-bold">{content.breadcrumbFaq || 'Frequently Asked Questions'}</span>
          </nav>

          <div className="max-w-4xl mx-auto text-center page-transition">
            <span className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 shadow-xs text-primary-700 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wide mb-6 hover:-translate-y-0.5 transition-transform">
              <HelpCircle className="w-4 h-4 text-primary-600" />
              {content.badge}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark-900 mb-6 tracking-tight leading-tight">
              {content.title} <span className="text-primary-600">{content.titleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-dark-600 max-w-2xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Categorized FAQs Section */}
      <main className="py-16 sm:py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {content.categories.map((group, groupIdx) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.id} className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-8 shadow-xs">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                    <GroupIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-display font-bold text-slate-900">
                      {group.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* FAQ List for this Category */}
                <div className="space-y-3.5">
                  {group.faqs.map((faq, itemIdx) => {
                    const itemKey = `${groupIdx}-${itemIdx}`;
                    const isOpen = !!openItems[itemKey];

                    return (
                      <div 
                        key={itemIdx} 
                        className="border border-slate-200/80 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => toggleItem(groupIdx, itemIdx)}
                          className="w-full flex items-center justify-between gap-3 p-4 sm:p-4.5 text-left cursor-pointer list-none select-none transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span className="font-semibold text-sm sm:text-base text-slate-900 hover:text-primary-600 transition-colors">
                            {faq.q}
                          </span>
                          <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                            isOpen 
                              ? 'bg-primary-600 text-white border-primary-600' 
                              : 'bg-white border-slate-200 text-slate-400'
                          }`}>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                            <p>{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Help Banner at the Bottom */}
          <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-2xl p-6 sm:p-8 shadow-md text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-1.5 flex items-center justify-center sm:justify-start gap-2">
                <MessageCircle className="w-5 h-5 text-accent-400" />
                {content.bannerTitle}
              </h3>
              <p className="text-xs sm:text-sm text-primary-100 max-w-md">
                {content.bannerDesc}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link 
                href="/contact" 
                className="px-5 py-2.5 rounded-xl bg-accent-400 hover:bg-accent-300 text-dark-900 font-bold text-xs sm:text-sm transition-colors shadow-sm"
              >
                {content.bannerContactBtn}
              </Link>
              <Link 
                href="/government-exams" 
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm transition-colors"
              >
                {content.bannerExamsBtn}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
