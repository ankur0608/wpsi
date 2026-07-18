"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import pricingData from '@/data/pricing.json';
import Script from 'next/script';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('plan');
  
  const [plan, setPlan] = useState<any>(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (planId) {
      const foundPlan = pricingData.plans.find(p => p.id.toLowerCase() === planId.toLowerCase());
      if (foundPlan) {
        setPlan(foundPlan);
      } else {
        router.push('/pricing');
      }
    } else {
      router.push('/pricing');
    }
  }, [planId, router]);

  const applyCoupon = async () => {
    if (!couponCode) return;
    setCouponError('');
    setCouponSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/coupons/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode })
      });
      const data = await res.json();
      
      if (data.success) {
        setAppliedCoupon(data.coupon);
        setCouponSuccess('Coupon applied successfully!');
      } else {
        setCouponError(data.error || 'Invalid coupon');
        setAppliedCoupon(null);
      }
    } catch (err) {
      setCouponError('Error verifying coupon');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!plan) return;
    setLoading(true);
    try {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: plan.amount, 
          planId: plan.id,
          couponCode: appliedCoupon?.code || undefined
        })
      });
      const data = await res.json();
      
      if (!data.success) {
        if (data.error === 'Not authenticated') {
          alert('Please login to purchase a plan');
          window.location.href = '/login';
          return;
        }
        alert('Payment initiation failed: ' + data.error);
        setLoading(false);
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
                planId: plan.id
              })
            });
            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              alert('Payment Successful! Your plan has been upgraded.');
              window.location.href = '/dashboard/payments';
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
    } finally {
      setLoading(false);
    }
  };

  if (!plan) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">Loading...</div>;

  const originalAmount = plan.amount;
  const discountAmount = appliedCoupon ? Math.floor((originalAmount * appliedCoupon.discountPercent) / 100) : 0;
  const finalAmount = originalAmount - discountAmount;

  return (
    <div className="w-full bg-dark-50 pb-20">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="max-w-5xl mx-auto p-6 lg:p-10">
        <div className="mb-10 flex flex-col items-start border-b border-dark-100 pb-8">
            <h1 className="font-display text-4xl font-bold text-dark-900 mb-2">Checkout</h1>
            <p className="text-dark-500">You're one step away from unlocking premium WPSI features.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-8">
                <div className="glass-card hover-card bg-white border border-dark-100 rounded-3xl p-8 shadow-sm">
                    <h2 className="font-display text-xl font-bold text-dark-900 mb-6">Plan Summary</h2>
                    <div className="flex items-center justify-between bg-dark-50 p-6 rounded-2xl border border-dark-100 mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-bold text-primary-700">{plan.name}</h3>
                                <span className="bg-primary-100 text-primary-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Premium</span>
                            </div>
                            <p className="text-sm text-dark-500 font-medium">{plan.subtitle}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-display font-bold text-dark-900">₹{plan.amount}</div>
                            <div className="text-sm text-dark-400 font-medium uppercase tracking-wider">{plan.period}</div>
                        </div>
                    </div>
                    <ul className="space-y-4 mb-2">
                        {plan.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-dark-700 font-medium">
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-success-50 text-success-500 flex items-center justify-center shrink-0">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="glass-card bg-white border border-dark-100 rounded-3xl p-8 shadow-sm">
                    <h2 className="font-display text-xl font-bold text-dark-900 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                        Have a Coupon?
                    </h2>
                    <div className="flex gap-4">
                        <input 
                            type="text" 
                            placeholder="Enter coupon code" 
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            className="flex-1 bg-dark-50 border border-dark-200 text-dark-900 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow uppercase font-bold text-sm tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:font-normal"
                            disabled={loading || appliedCoupon}
                        />
                        <button 
                            onClick={appliedCoupon ? () => { setAppliedCoupon(null); setCouponCode(''); setCouponSuccess(''); } : applyCoupon}
                            disabled={loading || (!couponCode && !appliedCoupon)}
                            className={`px-8 py-3.5 rounded-xl font-bold transition-all shadow-sm ${appliedCoupon ? 'bg-danger-50 border border-danger-200 text-danger-600 hover:bg-danger-100' : 'bg-dark-900 text-white hover:bg-dark-800'}`}
                        >
                            {appliedCoupon ? 'Remove' : 'Apply'}
                        </button>
                    </div>
                    {couponError && <p className="text-danger-500 text-sm mt-3 font-semibold flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {couponError}</p>}
                    {couponSuccess && <p className="text-success-600 text-sm mt-3 font-semibold flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {couponSuccess}</p>}
                </div>
            </div>

            <div className="lg:col-span-2">
                <div className="bg-primary-900 text-white rounded-3xl p-8 shadow-xl sticky top-28 overflow-hidden relative border border-primary-700">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500 rounded-full blur-3xl opacity-30"></div>
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-500 rounded-full blur-3xl opacity-20"></div>
                    
                    <h2 className="font-display text-xl font-bold mb-6 relative z-10">Order Total</h2>
                    
                    <div className="space-y-4 mb-8 relative z-10 font-medium">
                        <div className="flex justify-between text-primary-100">
                            <span>Subtotal</span>
                            <span>₹{originalAmount}</span>
                        </div>
                        {appliedCoupon && (
                            <div className="flex justify-between text-emerald-400 font-bold">
                                <span>Discount ({appliedCoupon.discountPercent}%)</span>
                                <span>-₹{discountAmount}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-primary-200/70 text-sm">
                            <span>GST (Included)</span>
                            <span>₹0</span>
                        </div>
                        <div className="border-t border-primary-700/50 pt-5 mt-5 flex justify-between items-end">
                            <span className="text-lg">Total</span>
                            <span className="text-4xl font-display font-bold text-white">₹{finalAmount}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handlePayment}
                        disabled={loading}
                        className="relative z-10 w-full bg-white hover:bg-primary-50 text-primary-900 font-black py-4.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-lg"
                    >
                        {loading ? 'Processing...' : `Pay ₹${finalAmount}`}
                        {!loading && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        )}
                    </button>
                    
                    <p className="relative z-10 text-center text-xs text-primary-300 mt-6 flex items-center justify-center gap-1.5 font-medium">
                        <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Secure 128-bit SSL Encrypted Payment
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
