import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PrintButton from './PrintButton';

export default async function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  let payment: any = null;

  if (id === 'test_receipt_123') {
    // Return dummy data for testing
    payment = {
      id: 'test_receipt_123',
      createdAt: new Date(),
      planId: 'Elite Master Plan',
      amount: 2999,
      status: 'SUCCESS',
      coupon: null,
      razorpayPaymentId: 'pay_test_abc123',
      user: {
        name: 'Test User',
        email: 'test@example.com',
        mobile: '9876543210'
      }
    };
  } else {
    payment = await prisma.paymentHistory.findUnique({
      where: { id: id },
      include: {
        user: true,
        coupon: true
      }
    });
  }

  if (!payment || payment.status !== 'SUCCESS') {
    notFound();
  }

  const originalAmount = payment.coupon ? payment.amount / (1 - (payment.coupon.discountPercent / 100)) : payment.amount;

  return (
    <div className="min-h-screen bg-dark-50 p-4 lg:p-8 flex justify-center print:bg-white print:p-0">
      <div className="bg-white max-w-3xl w-full shadow-xl rounded-2xl overflow-hidden border border-dark-100 print:shadow-none print:border-none print:rounded-none print:max-w-none relative">
        
        {/* Decorative Top Accent */}
        <div className="h-3 w-full bg-gradient-to-r from-primary-500 to-primary-700 print:bg-primary-600" />
        
        <div className="p-10 lg:p-14">
          <div className="flex justify-between items-start mb-12">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl print:border print:border-primary-600">
                  W
                </div>
                <h1 className="text-3xl font-display font-black text-dark-900 tracking-tight">WPSI Pro</h1>
              </div>
              <p className="text-sm text-dark-500 font-medium ml-13">MCQ Prep Zone</p>
              <p className="text-sm text-dark-500 ml-13">www.mcqprepzone.online</p>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-black text-primary-600 tracking-tight mb-2 uppercase">Invoice</h2>
              <p className="text-sm font-semibold text-dark-700">Receipt #{payment.id.toUpperCase().substring(payment.id.length - 8)}</p>
              <p className="text-sm text-dark-500 mt-1">{new Date(payment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12 bg-dark-50/50 rounded-xl p-6 border border-dark-100 print:bg-transparent print:border-y print:border-x-0 print:rounded-none">
            <div>
              <h3 className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-3">Billed To</h3>
              <p className="font-bold text-dark-900 text-lg">{payment.user.name || 'Student'}</p>
              <p className="text-dark-600 text-sm mt-1">{payment.user.email}</p>
              {payment.user.mobile && <p className="text-dark-600 text-sm mt-1">+91 {payment.user.mobile}</p>}
            </div>
            <div className="text-right">
              <h3 className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-3">Payment Details</h3>
              <p className="text-dark-800 text-sm font-medium">Method: <span className="text-dark-600 font-normal">Razorpay Secure</span></p>
              {payment.razorpayPaymentId && (
                <p className="text-dark-800 text-sm font-medium mt-1">Txn ID: <span className="text-dark-600 font-normal font-mono text-xs">{payment.razorpayPaymentId}</span></p>
              )}
              <div className="mt-3 inline-block">
                <span className="inline-flex items-center gap-1.5 bg-success-50 text-success-700 px-3 py-1 rounded-full text-xs font-bold border border-success-200 print:border-success-500 print:bg-transparent">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-500 print:hidden"></span>
                  PAID SUCCESSFULLY
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-dark-100 print:border-none print:overflow-visible">
            <table className="w-full text-left">
              <thead className="bg-dark-50 print:bg-transparent border-b border-dark-100">
                <tr className="text-dark-800 text-sm">
                  <th className="py-4 px-6 font-bold uppercase tracking-wider">Description</th>
                  <th className="py-4 px-6 text-right font-bold uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-100 bg-white">
                <tr>
                  <td className="py-6 px-6">
                    <p className="font-bold text-dark-900 text-lg">WPSI {payment.planId} Plan</p>
                    <p className="text-sm text-dark-500 mt-1">Premium access to materials, mock tests, and analytics.</p>
                  </td>
                  <td className="py-6 px-6 text-right font-semibold text-dark-900 text-lg">₹{originalAmount.toFixed(2)}</td>
                </tr>
                {payment.coupon && (
                  <tr className="bg-success-50/30 print:bg-transparent">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-success-700 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                        Discount Applied ({payment.coupon.code})
                      </p>
                      <p className="text-sm text-dark-500 mt-1">{payment.coupon.discountPercent}% Promotional Off</p>
                    </td>
                    <td className="py-4 px-6 text-right font-semibold text-success-700 text-lg">
                      -₹{(originalAmount - payment.amount).toFixed(2)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-6">
            <div className="w-full max-w-sm">
              <div className="bg-dark-50 p-6 rounded-xl border border-dark-100 print:bg-transparent print:border-none print:p-0">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-dark-600 font-medium">Subtotal</span>
                  <span className="text-dark-900 font-semibold">₹{originalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-dark-600 font-medium">Tax (0%)</span>
                  <span className="text-dark-900 font-semibold">₹0.00</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-dark-200">
                  <span className="text-lg font-bold text-dark-900">Total Paid</span>
                  <span className="text-2xl font-black text-primary-600">₹{payment.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-dark-400 mt-20 print:mt-32 pt-8 border-t border-dark-100">
            <p className="font-medium text-dark-500 mb-1">Thank you for choosing WPSI Pro - MCQ Prep Zone!</p>
            <p>This is a computer-generated invoice and does not require a physical signature.</p>
            <p className="mt-2 text-xs">For any inquiries, please contact <a href="mailto:Mcqprepzone@gmail.com" className="text-primary-600">Mcqprepzone@gmail.com</a></p>
          </div>
          
          <div className="mt-10 text-center print:hidden">
            <PrintButton />
          </div>
        </div>
      </div>
    </div>
  );
}
