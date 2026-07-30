"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import ReceiptTemplate from '@/components/ReceiptTemplate';

export default function PaymentHistoryPage() {
  const { user } = useUser();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [printPayment, setPrintPayment] = useState<any>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch('/api/payments');
        const data = await res.json();
        
        if (data.success && data.payments) {
          setPayments(data.payments);
        }
      } catch (err) {
        console.error("Failed to fetch payments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] w-full text-dark-500">
        <div className="flex flex-col items-center gap-3">
          <i className="fa-solid fa-spinner fa-spin text-2xl text-primary-500" />
          <p className="font-semibold text-sm">Loading payment history...</p>
        </div>
      </div>
    );
  }

  const handlePrintReceipt = (e: React.MouseEvent, payment: any) => {
    e.preventDefault();
    setPrintPayment(payment);
    setTimeout(() => {
      const originalTitle = document.title;
      document.title = `MCQPrepZone_Receipt_${payment.id}`;
      window.print();
      document.title = originalTitle;
    }, 100);
  };

  return (
    <>
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full print:hidden">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-dark-900 mb-2 tracking-tight">Payment History</h1>
          <p className="text-dark-500">View your past transactions and download receipts.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-dark-600 bg-white px-4 py-2 rounded-xl border border-dark-100 shadow-sm">
          <i className="fa-solid fa-shield-halved text-success-500"></i>
          Secure Payments
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dark-100 p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-dark-900 mb-2">No payments yet</h3>
          <p className="text-dark-500 mb-6 max-w-sm mx-auto">You haven't made any purchases yet. Upgrade your plan to access premium features.</p>
          <Link href="/dashboard/pricing" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            View Plans
          </Link>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-0 md:bg-white md:rounded-3xl md:border md:border-dark-100 md:shadow-sm md:overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="hidden md:table-header-group">
                <tr className="bg-dark-50/50 border-b border-dark-100 text-sm font-bold text-dark-500 uppercase tracking-wider">
                  <th className="p-5 pl-8">Date</th>
                  <th className="p-5">Plan</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5">Coupon</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 pr-8 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {payments.map((payment) => (
                  <tr key={payment.id} className="block md:table-row bg-white border border-dark-100 md:border-none md:border-b md:border-dark-100 last:border-none rounded-2xl md:rounded-none mb-4 md:mb-0 hover:bg-dark-50/30 transition-all shadow-sm md:shadow-none group p-1 md:p-0">
                    <td className="p-4 md:p-5 md:pl-8 text-dark-800 text-sm flex justify-between md:table-cell items-center border-b border-dark-50 md:border-none">
                      <span className="md:hidden font-bold text-dark-400 text-xs uppercase tracking-wider">Date</span>
                      <span className="font-medium">{new Date(payment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </td>
                    <td className="p-4 md:p-5 text-dark-900 font-bold flex justify-between md:table-cell items-center border-b border-dark-50 md:border-none">
                      <span className="md:hidden font-bold text-dark-400 text-xs uppercase tracking-wider">Plan</span>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 hidden md:flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                          <i className="fa-solid fa-crown text-sm"></i>
                        </div>
                        <span className="capitalize text-base">{payment.planId.replace(/_(YEARLY|MONTHLY)/i, '').replace(/_/g, ' ').toLowerCase()}</span>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-dark-900 font-black flex justify-between md:table-cell items-center border-b border-dark-50 md:border-none">
                      <span className="md:hidden font-bold text-dark-400 text-xs uppercase tracking-wider">Amount</span>
                      <span className="text-base">₹{payment.amount}</span>
                    </td>
                    <td className="p-4 md:p-5 text-dark-600 text-sm flex justify-between md:table-cell items-center border-b border-dark-50 md:border-none">
                      <span className="md:hidden font-bold text-dark-400 text-xs uppercase tracking-wider">Coupon</span>
                      {payment.coupon ? (
                        <span className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase border border-primary-100">{payment.coupon.code}</span>
                      ) : (
                        <span className="text-dark-300 font-medium">-</span>
                      )}
                    </td>
                    <td className="p-4 md:p-5 flex justify-between md:table-cell items-center border-b border-dark-50 md:border-none">
                      <span className="md:hidden font-bold text-dark-400 text-xs uppercase tracking-wider">Status</span>
                      {payment.status === 'SUCCESS' ? (
                        <span className="inline-flex items-center gap-1.5 bg-success-50 text-success-700 px-3 py-1.5 rounded-full text-xs font-bold border border-success-200 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-success-500"></span>
                          Success
                        </span>
                      ) : payment.status === 'PENDING' ? (
                        <span className="inline-flex items-center gap-1.5 bg-warning-50 text-warning-700 px-3 py-1.5 rounded-full text-xs font-bold border border-warning-200 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-warning-500 animate-pulse"></span>
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-danger-50 text-danger-700 px-3 py-1.5 rounded-full text-xs font-bold border border-danger-200 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-danger-500"></span>
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="p-4 md:p-5 md:pr-8 text-right flex justify-between md:table-cell items-center">
                      <span className="md:hidden font-bold text-dark-400 text-xs uppercase tracking-wider">Action</span>
                      {payment.status === 'SUCCESS' ? (
                        <button 
                          onClick={(e) => handlePrintReceipt(e, payment)}
                          className="inline-flex items-center gap-2 text-sm bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Receipt
                        </button>
                      ) : (
                        <span className="text-dark-300 font-medium">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    
    {/* Hidden element that only shows when printing */}
    {printPayment && (
      <div className="hidden print:block absolute inset-0 bg-white z-[9999] p-8 w-full">
        <ReceiptTemplate payment={printPayment} user={user} />
      </div>
    )}
    </>
  );
}
