"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import pricingData from '@/data/pricing.json';
import Script from 'next/script';
import { useUser } from '@/context/UserContext';

export default function DashboardPricing() {
  const { user } = useUser();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [exams, setExams] = useState<any[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>('');

  React.useEffect(() => {
    fetch('/api/exams')
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.length > 0) {
          setExams(json.data);
          setSelectedExam(user?.examId || json.data[0].id);
        }
      })
      .catch(err => console.error("Failed to fetch exams:", err));
  }, [user]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getPlanLevel = (planId: string) => {
    if (planId.includes('elite')) return 2;
    if (planId.includes('pro')) return 1;
    return 0;
  };
  
  const currentPlan = (user?.examPlans?.[selectedExam]?.toLowerCase()) || 'free';
  const currentLevel = getPlanLevel(currentPlan);

  const handlePayment = (amount: number, planId: string) => {
    if (!selectedExam) {
      showToast('Please select an exam first', 'error');
      return;
    }
    window.location.href = `/checkout?plan=${planId}&examId=${selectedExam}`;
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-accent-100 text-accent-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Pricing Plans
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 mb-4">
              Invest in your Exams <span className="text-primary-600">Future</span>
          </h2>
          <p className="text-dark-500 text-lg">
              Get access to premium materials, AI analysis, and unlimited mock tests. Less than the cost of a daily tea.
          </p>
          {(() => {
              const selectedExamObj = exams.find(e => e.id === selectedExam);
              const isCCE = selectedExamObj?.name?.toLowerCase().includes('cce');
              return !isCCE && (
                  <div className="mt-6 inline-flex items-center gap-2 bg-accent-100 text-accent-800 px-4 py-2 rounded-full text-sm font-bold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Flat 60% OFF - Ends Today!
                  </div>
              );
          })()}
          
          {/* Exam Filter */}
          <div className="mt-8 flex flex-col items-center justify-center">
              <label className="text-sm font-bold text-dark-500 mb-2 uppercase tracking-wider">Select Exam to Prepare For</label>
              <select 
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="bg-white border-2 border-primary-200 text-primary-800 px-6 py-3 rounded-xl text-lg font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer appearance-none outline-none w-full max-w-xs text-center"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '.8rem auto' }}
              >
                {exams.length === 0 && <option value="">Loading Exams...</option>}
                {exams.map(exam => (
                  <option key={exam.id} value={exam.id}>{exam.name}</option>
                ))}
              </select>
          </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {pricingData.plans.map((plan, index) => (
                    <div key={plan.id} className={`rounded-[2.5rem] p-8 border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative ${plan.isPopular ? 'pricing-popular bg-primary-900 border-2 border-primary-700 text-white' : 'bg-white border-dark-100'}`}>
                        {plan.isPopular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <span className="badge-shine bg-accent-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">{plan.tag}</span>
                            </div>
                        )}
                        <div className="mb-6 pt-2">
                            <h3 className={`font-display text-xl font-bold mb-2 ${plan.isPopular ? 'text-white' : 'text-dark-900'}`}>{plan.name}</h3>
                            <p className={`text-sm ${plan.isPopular ? 'text-primary-200' : 'text-dark-500'}`}>{plan.subtitle}</p>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-baseline gap-2">
                                <span className={`text-4xl font-display font-bold ${plan.isPopular ? 'text-white' : 'text-dark-900'}`}>{plan.price}</span>
                                <span className={`text-sm ${plan.isPopular ? 'text-primary-200' : 'text-dark-500'}`}>{plan.period}</span>
                            </div>
                            {plan.recommendation && <div className="text-xs text-success-400 font-semibold mt-1">{plan.recommendation}</div>}
                        </div>
                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, i) => (
                                <li key={i} className={`flex items-center gap-3 text-sm ${plan.isPopular ? 'text-primary-100' : 'text-dark-600'}`}>
                                    <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        
                        {(() => {
                            const planLevel = getPlanLevel(plan.id.toLowerCase());
                            if (planLevel === currentLevel) {
                                return (
                                    <button disabled className={`block w-full text-center font-bold py-3.5 rounded-xl shadow-lg cursor-not-allowed ${plan.isPopular ? 'bg-white/20 text-white border border-white/30' : 'bg-success-100 text-success-800 border border-success-200'}`}>
                                        Current Plan
                                    </button>
                                );
                            }
                            if (planLevel < currentLevel) {
                                return (
                                    <button disabled className={`block w-full text-center font-bold py-3.5 rounded-xl shadow-lg cursor-not-allowed bg-dark-50 text-dark-400 border border-dark-200`}>
                                        Included
                                    </button>
                                );
                            }
                            return (
                                <button onClick={() => { if(plan.amount > 0) handlePayment(plan.amount, plan.id); else { showToast('Free plan activated!', 'success'); window.location.href='/dashboard'; } }} className={`block w-full text-center font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl ${plan.isPopular ? 'bg-white hover:bg-dark-50 text-primary-900' : plan.amount > 0 ? 'bg-primary-800 hover:bg-primary-900 text-white' : 'bg-dark-100 hover:bg-dark-200 text-dark-700'}`}>
                                    {plan.buttonText}
                                </button>
                            );
                        })()}
                        
                        {plan.amount > 0 && <p className={`text-center text-xs mt-3 ${plan.isPopular ? 'text-primary-300' : 'text-dark-400'}`}></p>}
                    </div>
                ))}
            </div>

            {/* Trust Badges */}
      <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-dark-400">
          <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">SSL Secured</span>
          </div>
          {/* <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">7-Day Refund</span>
          </div> */}
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

      {toast && (
        <div className="fixed top-20 right-6 z-[10030] animate-in slide-in-from-top-4 fade-in duration-300 shadow-xl">
          <div className="flex items-center gap-3 rounded-full bg-dark-900/95 backdrop-blur-md pl-2 pr-4 py-2 border border-dark-700/50">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-inner ${toast.type === 'success' ? 'bg-emerald-500 text-white' : toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-primary-500 text-white'}`}>
              <i className={`fa-solid ${toast.type === 'success' ? 'fa-check' : toast.type === 'error' ? 'fa-xmark' : 'fa-info'}`}></i>
            </div>
            <p className="text-sm font-bold text-white whitespace-nowrap">{toast.message}</p>
          </div>
        </div>
      )}

    </div>
  );
}
