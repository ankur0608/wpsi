import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PrintButton from './PrintButton';

export default async function ReceiptPage({ params }: { params: { id: string } }) {
  const payment = await prisma.paymentHistory.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      coupon: true
    }
  });

  if (!payment || payment.status !== 'SUCCESS') {
    notFound();
  }

  const originalAmount = payment.coupon ? payment.amount / (1 - (payment.coupon.discountPercent / 100)) : payment.amount;

  return (
    <div className="min-h-screen bg-dark-50 p-8 flex justify-center print:bg-white print:p-0">
      <div className="bg-white max-w-2xl w-full shadow-lg p-10 border border-dark-100 print:shadow-none print:border-none print:max-w-none">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary-700 tracking-tight">MCQ Prep Zone</h1>
            <p className="text-sm text-dark-500 mt-1">Gujarat Wireless PSI Examination Prep</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-dark-900 mb-1">RECEIPT</h2>
            <p className="text-sm text-dark-500">#{payment.id.toUpperCase().substring(0, 10)}</p>
            <p className="text-sm text-dark-500 mt-1">{new Date(payment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12 border-b border-t border-dark-100 py-6">
          <div>
            <h3 className="text-xs font-bold text-dark-400 uppercase tracking-wider mb-2">Billed To</h3>
            <p className="font-semibold text-dark-900">{payment.user.name || 'Student'}</p>
            <p className="text-dark-600 text-sm mt-1">{payment.user.email}</p>
            <p className="text-dark-600 text-sm">{payment.user.mobile || ''}</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs font-bold text-dark-400 uppercase tracking-wider mb-2">Payment Details</h3>
            <p className="text-dark-600 text-sm">Method: Razorpay</p>
            {payment.razorpayPaymentId && (
              <p className="text-dark-600 text-sm mt-1">Txn ID: {payment.razorpayPaymentId}</p>
            )}
            <p className="text-dark-600 text-sm mt-1">Status: <span className="text-success-600 font-semibold">Success</span></p>
          </div>
        </div>

        <table className="w-full text-left mb-12">
          <thead>
            <tr className="border-b-2 border-dark-900 text-dark-900">
              <th className="pb-3 font-semibold">Description</th>
              <th className="pb-3 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-100">
            <tr>
              <td className="py-4">
                <p className="font-semibold text-dark-900">WPSI {payment.planId} Plan</p>
                <p className="text-sm text-dark-500">Premium access to materials and mock tests.</p>
              </td>
              <td className="py-4 text-right font-medium">₹{originalAmount.toFixed(2)}</td>
            </tr>
            {payment.coupon && (
              <tr>
                <td className="py-4">
                  <p className="font-semibold text-success-600">Discount ({payment.coupon.code})</p>
                  <p className="text-sm text-dark-500">{payment.coupon.discountPercent}% Off</p>
                </td>
                <td className="py-4 text-right font-medium text-success-600">
                  -₹{(originalAmount - payment.amount).toFixed(2)}
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-dark-900">
              <td className="pt-4 text-right font-bold text-dark-900">Total Paid</td>
              <td className="pt-4 text-right font-bold text-xl text-primary-700">₹{payment.amount.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div className="text-center text-sm text-dark-500 mt-16 print:mt-auto pt-8">
          <p>Thank you for choosing MCQ Prep Zone.</p>
          <p className="mt-1">If you have any questions, please contact support@mcqprepzone.online</p>
        </div>

        <div className="mt-8 text-center print:hidden">
          <PrintButton />
        </div>
      </div>
    </div>
  );
}
