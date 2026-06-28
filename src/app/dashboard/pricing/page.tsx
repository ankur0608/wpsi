"use client";
import React from 'react';
import Link from 'next/link';

export default function DashboardPricing() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-accent-100 text-accent-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Pricing Plans
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 mb-4">
              Invest in your WPSI <span className="text-primary-600">Future</span>
          </h2>
          <p className="text-dark-500 text-lg">
              Get access to premium materials, AI analysis, and unlimited mock tests. Less than the cost of a daily tea.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-accent-100 text-accent-800 px-4 py-2 rounded-full text-sm font-bold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Flat 60% OFF - Ends Today!
          </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-dark-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative">
              <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-dark-900 mb-2">WPSI Basic</h3>
                  <p className="text-dark-500 text-sm">Perfect for starting your journey.</p>
              </div>
              <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-dark-900">₹0</span>
                  <span className="text-dark-500">/ forever</span>
              </div>
              <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-dark-600">
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Daily 1 Free WPSI Quiz
                  </li>
                  <li className="flex items-center gap-3 text-sm text-dark-600">
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Basic Analytics
                  </li>
                  <li className="flex items-center gap-3 text-sm text-dark-400">
                      <svg className="w-5 h-5 text-dark-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      No Full Mock Tests
                  </li>
                  <li className="flex items-center gap-3 text-sm text-dark-400">
                      <svg className="w-5 h-5 text-dark-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Ads Enabled
                  </li>
              </ul>
              <Link href="#" className="block w-full text-center bg-dark-100 hover:bg-dark-200 text-dark-700 font-semibold py-3 rounded-xl transition-colors">
                  Current Plan
              </Link>
          </div>

          {/* Pro Scholar */}
          <div className="pricing-popular bg-primary-900 rounded-[2.5rem] p-8 border-2 border-primary-700 shadow-2xl hover:-translate-y-2 transition-all duration-300 relative text-white">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="badge-shine bg-accent-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">Most Popular</span>
              </div>
              <div className="mb-6 pt-2">
                  <h3 className="font-display text-xl font-bold text-white mb-2">WPSI Part A Mastery</h3>
                  <p className="text-primary-200 text-sm">Master the General Studies syllabus (Part A).</p>
              </div>
              <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-display font-bold text-white">₹299</span>
                      <span className="text-lg text-primary-300/50 line-through">₹799</span>
                      <span className="text-primary-200">/ mo</span>
                  </div>
                  <div className="text-xs text-success-400 font-semibold mt-1">Save ₹500/month (60% OFF)</div>
              </div>
              <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-primary-100">
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Unlimited Premium MCQs
                  </li>
                  <li className="flex items-center gap-3 text-sm text-primary-100">
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      50+ Full Mock Tests (A & B)
                  </li>
                  <li className="flex items-center gap-3 text-sm text-primary-100">
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      AI Weakness Detection
                  </li>
                  <li className="flex items-center gap-3 text-sm text-primary-100">
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Ad-free experience
                  </li>
                  <li className="flex items-center gap-3 text-sm text-primary-100">
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Detailed PDF Notes
                  </li>
              </ul>
              <Link href="#" className="block w-full text-center bg-white hover:bg-dark-50 text-primary-900 font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl">
                  Claim 60% Discount
              </Link>
          </div>

          {/* Elite Master */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-dark-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative">
              <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-dark-900 mb-2">WPSI Part A + B Combo</h3>
                  <p className="text-dark-500 text-sm">Personalized guidance and mentorship.</p>
              </div>
              <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-dark-900">₹999</span>
                  <span className="text-dark-500">/ mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-dark-600">
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      All Pro Features
                  </li>
                  <li className="flex items-center gap-3 text-sm text-dark-600">
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      1-on-1 Mentor Calls
                  </li>
                  <li className="flex items-center gap-3 text-sm text-dark-600">
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Mains Answer Evaluation
                  </li>
                  <li className="flex items-center gap-3 text-sm text-dark-600">
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Private Telegram Group
                  </li>
              </ul>
              <Link href="#" className="block w-full text-center bg-primary-800 hover:bg-primary-900 text-white font-semibold py-3 rounded-xl transition-colors">
                  Upgrade to Elite
              </Link>
          </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-dark-400">
          <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">7-Day Refund</span>
          </div>
          <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">RBI Compliant</span>
          </div>
          <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">GST Invoice</span>
          </div>
      </div>
    </div>
  );
}
