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
      window.print();
    }, 100);
  };

  return (
    <>
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full print:hidden">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-dark-900 mb-2">Payment History</h1>
        <p className="text-dark-500">View your past transactions and download receipts.</p>
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
        <div className="bg-white rounded-2xl border border-dark-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="hidden md:table-header-group">
                <tr className="bg-dark-50 border-b border-dark-100 text-sm font-semibold text-dark-600">
                  <th className="p-4 pl-6">Date</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Coupon</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-100 block md:table-row-group">
                {payments.map((payment) => (
                  <tr key={payment.id} className="block md:table-row hover:bg-dark-50/50 transition-colors p-4 md:p-0">
                    <td className="p-2 md:p-4 md:pl-6 text-dark-800 text-sm flex justify-between md:table-cell items-center">
                      <span className="md:hidden font-semibold text-dark-500 text-xs uppercase tracking-wider">Date</span>
                      <span>{new Date(payment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </td>
                    <td className="p-2 md:p-4 text-dark-900 font-medium capitalize flex justify-between md:table-cell items-center">
                      <span className="md:hidden font-semibold text-dark-500 text-xs uppercase tracking-wider">Plan</span>
                      <span>{payment.planId}</span>
                    </td>
                    <td className="p-2 md:p-4 text-dark-800 font-medium flex justify-between md:table-cell items-center">
                      <span className="md:hidden font-semibold text-dark-500 text-xs uppercase tracking-wider">Amount</span>
                      <span>₹{payment.amount}</span>
                    </td>
                    <td className="p-2 md:p-4 text-dark-600 text-sm flex justify-between md:table-cell items-center">
                      <span className="md:hidden font-semibold text-dark-500 text-xs uppercase tracking-wider">Coupon</span>
                      {payment.coupon ? (
                        <span className="bg-dark-100 px-2 py-1 rounded text-xs font-mono uppercase">{payment.coupon.code}</span>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td className="p-2 md:p-4 flex justify-between md:table-cell items-center">
                      <span className="md:hidden font-semibold text-dark-500 text-xs uppercase tracking-wider">Status</span>
                      {payment.status === 'SUCCESS' ? (
                        <span className="inline-flex items-center gap-1.5 bg-success-50 text-success-700 px-2.5 py-1 rounded-full text-xs font-bold border border-success-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-success-500"></span>
                          Success
                        </span>
                      ) : payment.status === 'PENDING' ? (
                        <span className="inline-flex items-center gap-1.5 bg-warning-50 text-warning-700 px-2.5 py-1 rounded-full text-xs font-bold border border-warning-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-warning-500 animate-pulse"></span>
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-danger-50 text-danger-700 px-2.5 py-1 rounded-full text-xs font-bold border border-danger-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-danger-500"></span>
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="p-2 md:p-4 md:pr-6 text-right flex justify-between md:table-cell items-center mt-2 md:mt-0 pt-3 md:pt-4 border-t border-dark-50 md:border-none">
                      <span className="md:hidden font-semibold text-dark-500 text-xs uppercase tracking-wider">Action</span>
                      {payment.status === 'SUCCESS' ? (
                        <button 
                          onClick={(e) => handlePrintReceipt(e, payment)}
                          className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-semibold"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Receipt
                        </button>
                      ) : (
                        <span className="text-dark-300">-</span>
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
