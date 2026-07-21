"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function XPHistoryPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/xp-history')
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setData(result.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch XP history", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-dark-500 h-[70vh]">
        <i className="fa-solid fa-circle-notch fa-spin text-3xl mb-4 text-primary-500"></i>
        <span className="ml-3 font-semibold">Loading points history...</span>
      </div>
    );
  }

  return (
    <div className="w-full font-sans text-dark-800 animate-in fade-in duration-500">
      <div className="max-w-[800px] mx-auto p-4 lg:p-8 space-y-6">
        
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-dark-900">XP History</h1>
            <p className="text-sm text-dark-500 mt-1">Review your all-time points log and recent activities.</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl shadow-sm border border-purple-100 hidden sm:flex">
            <i className="fa-solid fa-bolt"></i>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="bg-white rounded-[24px] border border-dark-100 p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-dark-50 rounded-full flex items-center justify-center mx-auto mb-4 text-dark-300">
              <i className="fa-solid fa-ghost text-3xl"></i>
            </div>
            <h3 className="text-lg font-bold text-dark-900 mb-2">No history found!</h3>
            <p className="text-dark-500 text-sm max-w-sm mx-auto mb-6">You haven't earned any XP yet. Start practicing and taking mock tests to see your points history grow!</p>
            <Link href="/practice" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-sm transition-colors">
              <i className="fa-solid fa-play"></i>
              Start Earning
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[24px] border border-dark-100 shadow-sm overflow-hidden mb-24 lg:mb-0">
            <div className="divide-y divide-dark-50">
              {data.map((hist: any, idx: number) => (
                <div key={idx} className="p-4 md:p-5 hover:bg-dark-50/50 transition-colors flex items-center justify-between gap-4 group">
                  
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${
                      hist.mode === 'full' || hist.mode === 'mock' ? 'bg-indigo-50 text-indigo-500 border-indigo-100' :
                      hist.mode === 'timed' ? 'bg-purple-50 text-purple-500 border-purple-100' :
                      'bg-primary-50 text-primary-500 border-primary-100'
                    }`}>
                      <i className={`fa-solid ${
                        hist.mode === 'full' || hist.mode === 'mock' ? 'fa-star' :
                        hist.mode === 'timed' ? 'fa-clock' :
                        'fa-bolt'
                      } text-sm md:text-base`}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-900 text-sm md:text-base group-hover:text-primary-700 transition-colors">{hist.title}</h3>
                      <p className="text-[10px] md:text-xs text-dark-400 font-bold uppercase tracking-wider mt-0.5">
                        {new Date(hist.date).toLocaleString(undefined, {
                          month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                    <div className="text-right shrink-0">
                      <span className={`text-sm md:text-base font-black px-3 py-1.5 rounded-lg border shadow-sm ${
                        hist.xp < 0 ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-emerald-600 bg-emerald-50 border-emerald-100'
                      }`}>
                        {hist.xp > 0 ? `+${hist.xp}` : hist.xp} XP
                      </span>
                    </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
