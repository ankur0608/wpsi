import React from 'react';

export default function ReceiptTemplate({ payment, user }: { payment: any, user: any }) {
  if (!payment) return null;
  const originalAmount = payment.coupon ? payment.amount / (1 - (payment.coupon.discountPercent / 100)) : payment.amount;

  return (
    <div className="bg-white w-full max-w-3xl mx-auto text-left relative" style={{ color: 'black' }}>
      <div className="h-3 w-full bg-primary-600" style={{ backgroundColor: '#0ea5e9' }} />
      <div className="p-10">
        <div className="flex justify-between items-start mb-12">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden border border-dark-200 shrink-0">
                <img src="/logo.jpeg" alt="WPSI Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-3xl font-black text-dark-900 tracking-tight" style={{ fontFamily: 'system-ui' }}>WPSI Pro</h1>
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

        <div className="grid grid-cols-2 gap-8 mb-12 border-y border-dark-100 py-6">
          <div>
            <h3 className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-3">Billed To</h3>
            <p className="font-bold text-dark-900 text-lg">{user?.name || 'Student'}</p>
            <p className="text-dark-600 text-sm mt-1">{user?.email}</p>
            {user?.mobile && <p className="text-dark-600 text-sm mt-1">+91 {user.mobile}</p>}
          </div>
          <div className="text-right">
            <h3 className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-3">Payment Details</h3>
            <p className="text-dark-800 text-sm font-medium">Method: <span className="text-dark-600 font-normal">Razorpay Secure</span></p>
            {payment.razorpayPaymentId && (
              <p className="text-dark-800 text-sm font-medium mt-1">Txn ID: <span className="text-dark-600 font-normal font-mono text-xs">{payment.razorpayPaymentId}</span></p>
            )}
            <div className="mt-3 inline-block">
              <span className="inline-flex items-center gap-1.5 text-success-700 px-3 py-1 rounded-full text-xs font-bold border border-success-500">
                PAID SUCCESSFULLY
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <table className="w-full text-left">
            <thead className="border-b border-dark-100">
              <tr className="text-dark-800 text-sm">
                <th className="py-4 px-2 font-bold uppercase tracking-wider">Description</th>
                <th className="py-4 px-2 text-right font-bold uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100">
              <tr>
                <td className="py-6 px-2">
                  <p className="font-bold text-dark-900 text-lg">WPSI {payment.planId} Plan</p>
                  <p className="text-sm text-dark-500 mt-1">Premium access to materials, mock tests, and analytics.</p>
                </td>
                <td className="py-6 px-2 text-right font-semibold text-dark-900 text-lg">₹{originalAmount.toFixed(2)}</td>
              </tr>
              {payment.coupon && (
                <tr>
                  <td className="py-4 px-2">
                    <p className="font-semibold text-success-700">Discount Applied ({payment.coupon.code})</p>
                    <p className="text-sm text-dark-500 mt-1">{payment.coupon.discountPercent}% Promotional Off</p>
                  </td>
                  <td className="py-4 px-2 text-right font-semibold text-success-700 text-lg">
                    -₹{(originalAmount - payment.amount).toFixed(2)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6 border-t border-dark-200 pt-6">
          <div className="w-full max-w-sm">
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

        <div className="text-center text-sm text-dark-400 mt-32 pt-8 border-t border-dark-100">
          <p className="font-medium text-dark-500 mb-1">Thank you for choosing WPSI Pro - MCQ Prep Zone!</p>
          <p>This is a computer-generated invoice and does not require a physical signature.</p>
          <p className="mt-2 text-xs">For any inquiries, please contact <a href="mailto:Mcqprepzone@gmail.com" className="text-primary-600">Mcqprepzone@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
