"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage, Language } from '@/context/LanguageContext';

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  localizedItems?: Partial<Record<Language, FAQItem[]>>;
  showContactLink?: boolean;
  className?: string;
  includeSchema?: boolean;
}

export default function FAQSection({
  badge,
  title,
  subtitle,
  items,
  localizedItems,
  showContactLink = true,
  className = "py-20 md:py-28 bg-white relative overflow-hidden",
  includeSchema = true,
}: FAQSectionProps = {}) {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = (localizedItems && localizedItems[language])
    ? localizedItems[language]!
    : items && items.length > 0 
      ? items 
      : [
          { q: t('faqQ1'), a: t('faqA1') },
          { q: t('faqQ2'), a: t('faqA2') },
          { q: t('faqQ3'), a: t('faqA3') },
          { q: t('faqQ4'), a: t('faqA4') },
        ];

  const resolvedBadge = badge || t('faqBadge');
  const resolvedTitle = title || t('faqTitle');

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <section className={className}>
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-dark-50 text-dark-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 border border-dark-100">
            {resolvedBadge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark-900 mb-4 tracking-tight">
            {resolvedTitle}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-dark-600 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-dark-100">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-dark-200 bg-transparent overflow-hidden mb-2 group last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-5 sm:py-6 text-left flex justify-between items-center bg-transparent transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-lg sm:text-xl text-dark-900 group-hover:text-primary-600 transition-colors pr-4 leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-sm border flex items-center justify-center transition-colors shrink-0 ${
                    isOpen ? 'bg-primary-600 text-white border-primary-600' : 'bg-dark-50 text-dark-500 border-dark-100 group-hover:bg-primary-600 group-hover:text-white'
                  }`}>
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div className="pb-6 text-dark-600 text-sm sm:text-base md:text-lg leading-relaxed animate-in fade-in duration-200">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {showContactLink && (
          <div className="mt-10 sm:mt-12 text-center">
            <p className="text-dark-600 text-sm sm:text-base">
              Still have questions? <Link href="/contact" className="font-bold text-primary-600 hover:text-primary-800 underline">Contact Support</Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
