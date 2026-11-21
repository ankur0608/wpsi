"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function ExamPatternSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-dark-50 text-dark-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 border border-dark-100">
                  {t('examPatternBadge')}
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-dark-900 mb-6">
                  {t('examPatternTitle1')} <span className="text-primary-600">{t('examPatternTitle2')}</span>
                </h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/* Part A */}
                <div className="bg-white rounded-[2rem] p-8 border border-dark-100 shadow-md relative group hover:-translate-y-2 transition-transform h-full">
                    <h3 className="font-display text-3xl font-bold text-primary-900 mb-2">{t('partA')}</h3>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-dark-50 text-dark-700 font-bold px-3 py-1 rounded-lg text-sm border border-dark-100">
                          {t('partAQuestions')}
                        </span>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-dark-700 font-medium"><div className="w-2 h-2 rounded-full bg-primary-500"></div>{t('subjectReasoning')}</li>
                        <li className="flex items-center gap-3 text-dark-700 font-medium"><div className="w-2 h-2 rounded-full bg-primary-500"></div>{t('subjectAptitude')}</li>
                        <li className="flex items-center gap-3 text-dark-700 font-medium"><div className="w-2 h-2 rounded-full bg-primary-500"></div>{t('subjectConstitution')}</li>
                        <li className="flex items-center gap-3 text-dark-700 font-medium"><div className="w-2 h-2 rounded-full bg-primary-500"></div>{t('subjectCurrentAffairs')}</li>
                    </ul>
                </div>
                
                {/* Part B (Elevated & Dark) */}
                <div className="bg-primary-900 rounded-[2rem] p-10 border-4 border-white shadow-[0_30px_60px_rgba(8,112,184,0.3)] relative group lg:scale-105 z-10 text-white h-full">
                    <div className="absolute top-4 right-4 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {t('crucialSection')}
                    </div>
                    <h3 className="font-display text-3xl font-bold text-white mb-2">{t('partB')}</h3>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-primary-800 text-white font-bold px-3 py-1 rounded-lg text-sm">
                          {t('partBQuestions')}
                        </span>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 font-medium"><div className="w-2 h-2 rounded-full bg-accent-400"></div>{t('subjectTech')}</li>
                        <li className="flex items-center gap-3 font-medium"><div className="w-2 h-2 rounded-full bg-accent-400"></div>{t('subjectElectronics')}</li>
                        <li className="flex items-center gap-3 font-medium"><div className="w-2 h-2 rounded-full bg-accent-400"></div>{t('subjectNetworks')}</li>
                        <li className="flex items-center gap-3 font-medium"><div className="w-2 h-2 rounded-full bg-accent-400"></div>{t('subjectSecurity')}</li>
                    </ul>
                </div>
                
                {/* Important Rules */}
                <div className="bg-red-50 rounded-[2rem] p-8 border border-red-100 shadow-md relative group hover:-translate-y-2 transition-transform h-full">
                    <h3 className="font-display text-3xl font-bold text-red-800 mb-6">{t('rulesTitle')}</h3>
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-4 border border-red-100 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-xl">!</div>
                            <div>
                                <h4 className="font-bold text-red-900">{t('negativeMarking')}</h4>
                                <p className="text-sm text-red-700">{t('negativeDesc')}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-red-100 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-red-900">{t('examDuration')}</h4>
                                <p className="text-sm text-red-700">{t('examDurationDesc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
