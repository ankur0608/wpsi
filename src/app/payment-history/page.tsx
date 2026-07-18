"use client";

import React from 'react';

export default function PaymentHistoryPage() {
  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 min-h-screen">
      <div className="max-w-5xl mx-auto p-4 lg:p-6">
        <div className="mb-6 lg:mb-8">
          <h1 className="font-display font-bold text-3xl text-dark-900 tracking-tight">Payment History</h1>
          <p className="text-dark-500 mt-2">View your past transactions and subscription details.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-dark-100 shadow-sm text-center">
          <div className="w-16 h-16 bg-dark-50 rounded-full flex items-center justify-center mx-auto mb-4 text-dark-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-dark-900 mb-2">No Transactions Yet</h3>
          <p className="text-dark-500">You haven't made any purchases or subscribed to a plan yet.</p>
        </div>
      </div>
    </div>
  );
}
