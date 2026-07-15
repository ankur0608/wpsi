"use client";
import React from 'react';
import Link from 'next/link';
import pricingData from '@/data/pricing.json';
import Script from 'next/script';
import { useUser } from '@/context/UserContext';

export default function DashboardPricing() {
  const { user } = useUser();
  const currentPlan = user?.planType?.toLowerCase() || 'free';

  const handlePayment = async (amount: number, planId: string) => {
    try {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, planId })
      });
      const data = await res.json();
      
      if (!data.success) {
        if (data.error === 'Not authenticated') {
          alert('Please login to purchase a plan');
          window.location.href = '/login';
          return;
        }
        alert('Payment initiation failed: ' + data.error);
        return;
      }
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id',
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'WPSI Exam Prep',
        description: 'Plan Upgrade',
        order_id: data.order.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                planId: planId
              })
            });
            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              alert('Payment Successful! Your plan has been upgraded.');
              window.location.href = '/dashboard';
            } else {
              alert('Payment Verification Failed: ' + verifyData.error);
            }
          } catch(err) {
            console.error(err);
            alert('Verification Error');
          }
        },
        prefill: {
          name: 'Student',
          email: 'student@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3b82f6'
        }
      };
      
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any){
        alert('Payment Failed! Reason: ' + response.error.description);
      });
      rzp1.open();
    } catch (error) {
      console.error(error);
      alert('Payment failed');
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
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
                        
                        {currentPlan === plan.id.toLowerCase() ? (
                            <button disabled className={`block w-full text-center font-bold py-3.5 rounded-xl shadow-lg cursor-not-allowed ${plan.isPopular ? 'bg-white/20 text-white border border-white/30' : 'bg-success-100 text-success-800 border border-success-200'}`}>
                                Current Plan
                            </button>
                        ) : (
                            <button onClick={() => { if(plan.amount > 0) handlePayment(plan.amount, plan.id); else { alert('Free plan activated!'); window.location.href='/dashboard'; } }} className={`block w-full text-center font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl ${plan.isPopular ? 'bg-white hover:bg-dark-50 text-primary-900' : plan.amount > 0 ? 'bg-primary-800 hover:bg-primary-900 text-white' : 'bg-dark-100 hover:bg-dark-200 text-dark-700'}`}>
                                {plan.buttonText}
                            </button>
                        )}
                        
                        {plan.amount > 0 && <p className={`text-center text-xs mt-3 ${plan.isPopular ? 'text-primary-300' : 'text-dark-400'}`}>7-day money-back guarantee</p>}
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
