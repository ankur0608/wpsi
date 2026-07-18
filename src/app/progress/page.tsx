"use client";

import React from 'react';
import Link from 'next/link';

export default function ProgressPage() {
  const sections = [
    {
      title: 'Results',
      description: 'View your mock test and practice results.',
      path: '/results',
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012-2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      )
    },
    {
      title: 'Saved MCQs',
      description: 'Review the questions you have bookmarked.',
      path: '/bookmarks',
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
        </svg>
      )
    },
    {
      title: 'Analytics',
      description: 'Deep dive into your performance metrics.',
      path: '/analytics',
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 min-h-screen">
      <div className="max-w-5xl mx-auto p-4 lg:p-6">
        <div className="mb-6 lg:mb-8">
          <h1 className="font-display font-bold text-3xl text-dark-900 tracking-tight">Your Progress</h1>
          <p className="text-dark-500 mt-2">Track your learning journey, scores, and saved items.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {sections.map((section) => (
            <Link key={section.title} href={section.path} className="block group">
              <div className="bg-white rounded-3xl p-6 border border-dark-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col items-start group-hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                  {section.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-dark-900 mb-2">{section.title}</h3>
                <p className="text-dark-500 text-sm leading-relaxed mb-4 flex-1">
                  {section.description}
                </p>
                <div className="mt-auto flex items-center text-primary-600 font-bold text-sm">
                  View details
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
