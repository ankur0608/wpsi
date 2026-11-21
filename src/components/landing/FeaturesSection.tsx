"use client";

import { BookOpen, Lightbulb, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-dark-50 border-y border-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900 mb-4">{t('featuresHeading')}</h2>
                <p className="text-dark-600 text-lg">{t('featuresSubheading')}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-white rounded-2xl p-8 border border-dark-100 shadow-sm text-center hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-100 shadow-sm transition-transform group-hover:scale-105">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-dark-900 mb-3">{t('feature1Title')}</h3>
                    <p className="text-dark-600 leading-relaxed">{t('feature1Desc')}</p>
                </div>
                
                {/* Feature 2 */}
                <div className="bg-white rounded-2xl p-8 border border-dark-100 shadow-sm text-center hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 bg-accent-50 text-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-accent-100 shadow-sm transition-transform group-hover:scale-105">
                        <Lightbulb className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-dark-900 mb-3">{t('feature2Title')}</h3>
                    <p className="text-dark-600 leading-relaxed">{t('feature2Desc')}</p>
                </div>
                
                {/* Feature 3 */}
                <div className="bg-white rounded-2xl p-8 border border-dark-100 shadow-sm text-center hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 bg-success-50 text-success-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-success-100 shadow-sm transition-transform group-hover:scale-105">
                        <TrendingUp className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-dark-900 mb-3">{t('feature3Title')}</h3>
                    <p className="text-dark-600 leading-relaxed">{t('feature3Desc')}</p>
                </div>
            </div>
        </div>
    </section>
  );
}
