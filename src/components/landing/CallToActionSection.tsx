"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

export interface CTAStat {
  value: string;
  label: string;
}

export interface CallToActionSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  stats?: CTAStat[];
  tags?: string[];
  showStats?: boolean;
  showTags?: boolean;
  showTrustBadges?: boolean;
  className?: string;
}

export default function CallToActionSection({
  badge,
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonLink = "/daily-challenge",
  secondaryButtonText,
  secondaryButtonLink = "/features",
  stats,
  tags,
  showStats = true,
  showTags = false,
  showTrustBadges = true,
  className = "relative py-10 md:py-12 bg-gradient-to-r from-primary-700 via-primary-600 to-indigo-600 text-white overflow-hidden shadow-inner",
}: CallToActionSectionProps = {}) {
  const { t } = useLanguage();

  const resolvedBadge = badge || t('ctaBadge');
  const resolvedTitle = title || t('ctaTitle');
  const resolvedSubtitle = subtitle || t('ctaSubtitle');
  const resolvedDesc = description || t('ctaDesc');
  const resolvedPrimaryText = primaryButtonText || t('ctaButton');
  const resolvedSecondaryText = secondaryButtonText || t('navFeatures');

  const resolvedStats: CTAStat[] = stats && stats.length > 0 ? stats : [
    { value: '10,000+', label: 'Topic-Wise MCQs' },
    { value: '100%', label: 'Latest Syllabus Aligned' },
    { value: '50+', label: 'Timed CBT Mock Tests' },
    { value: 'Daily Free', label: 'Quizzes & Challenges' },
  ];

  return (
    <section className={className}>
      {/* Decorative ambient lighting & pattern */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-900/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Category Pill / Badge */}
        {resolvedBadge && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-semibold text-white mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>{resolvedBadge}</span>
          </div>
        )}

        {/* Main Heading */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2.5 tracking-tight leading-tight max-w-3xl mx-auto drop-shadow-xs">
          {resolvedTitle}
        </h2>

        {/* Subtitles */}
        {resolvedSubtitle && (
          <p className="text-sm sm:text-base text-blue-100 font-medium mb-1.5 max-w-2xl mx-auto leading-relaxed">
            {resolvedSubtitle}
          </p>
        )}

        {resolvedDesc && (
          <p className="text-xs sm:text-sm text-blue-100/85 mb-5 max-w-xl mx-auto leading-relaxed">
            {resolvedDesc}
          </p>
        )}

        {/* Compact Glassmorphism Stats Strip */}
        {showStats && resolvedStats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto mb-5">
            {resolvedStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-xl p-2.5 sm:p-3 text-center transition-all shadow-xs"
              >
                <div className="font-display text-lg sm:text-xl font-black text-white tracking-tight mb-0.5">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs text-blue-100/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Exam tags removed as requested */}
        {showTags && tags && tags.length > 0 && (
          <div className="max-w-3xl mx-auto mb-5">
            <div className="flex flex-wrap justify-center gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-blue-100 cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-5">
          <Link
            href={primaryButtonLink}
            className="w-full sm:w-auto bg-white hover:bg-blue-50 active:scale-95 text-primary-700 hover:text-primary-800 px-7 py-3 rounded-xl font-bold text-sm sm:text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-black/15 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{resolvedPrimaryText}</span>
            <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={secondaryButtonLink}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 active:scale-95 border border-white/25 text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base backdrop-blur-md transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-200" />
            <span>{resolvedSecondaryText}</span>
          </Link>
        </div>

        {/* Trust Badges Bar */}
        {showTrustBadges && (
          <div className="pt-4 border-t border-white/15 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-y-1.5 gap-x-5 text-[11px] sm:text-xs text-blue-100/90 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>Technical &amp; Non-Technical Practice</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>Daily Free MCQs &amp; Quizzes</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>Step-by-Step Explanations</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>Instant Performance Analytics</span>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
