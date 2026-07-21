"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotificationsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mark as read and fetch
    fetch('/api/notifications', { method: 'PUT' })
      .then(() => fetch('/api/notifications'))
      .then(res => res.json())
      .then(result => {
        if (result.data) {
          setData(result.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch notifications", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-dark-500 h-[70vh]">
        <i className="fa-solid fa-circle-notch fa-spin text-3xl mb-4 text-primary-500"></i>
        <span className="ml-3 font-semibold">Loading your updates...</span>
      </div>
    );
  }

  return (
    <div className="w-full font-sans text-dark-800 animate-in fade-in duration-500">
      <div className="max-w-[800px] mx-auto p-4 lg:p-8 space-y-6">
        
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-dark-900">Notifications</h1>
            <p className="text-sm text-dark-500 mt-1">Stay updated with your latest achievements and alerts.</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl shadow-sm border border-primary-100 hidden sm:flex">
            <i className="fa-solid fa-bell"></i>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="bg-white rounded-[24px] border border-dark-100 p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-dark-50 rounded-full flex items-center justify-center mx-auto mb-4 text-dark-300">
              <i className="fa-regular fa-bell-slash text-3xl"></i>
            </div>
            <h3 className="text-lg font-bold text-dark-900 mb-2">You're all caught up!</h3>
            <p className="text-dark-500 text-sm max-w-sm mx-auto mb-6">There are no new notifications at this time. Go practice some MCQs to earn XP and trigger new alerts!</p>
            <Link href="/practice" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-sm transition-colors">
              <i className="fa-solid fa-bolt"></i>
              Start Practice
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[24px] border border-dark-100 shadow-sm overflow-hidden mb-24 lg:mb-0">
            <div className="divide-y divide-dark-100">
              {data.map((notif: any) => (
                <div key={notif.id} className="p-5 md:p-6 hover:bg-dark-50/50 transition-colors flex items-start gap-4 md:gap-5 group">
                  <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-xl shadow-sm border ${
                    notif.type === 'LEVEL_UP' ? 'bg-amber-50 text-amber-500 border-amber-200' : 
                    notif.type === 'STREAK' ? 'bg-orange-50 text-orange-500 border-orange-200' : 
                    'bg-primary-50 text-primary-500 border-primary-200'
                  }`}>
                    <i className={`fa-solid ${
                      notif.type === 'LEVEL_UP' ? 'fa-star' : 
                      notif.type === 'STREAK' ? 'fa-fire' : 
                      'fa-bullhorn'
                    }`}></i>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4 mb-1.5">
                      <h3 className="font-bold text-dark-900 text-base leading-tight group-hover:text-primary-700 transition-colors">{notif.title}</h3>
                      <span className="text-[10px] md:text-xs font-semibold text-dark-400 bg-dark-50 px-2.5 py-1 rounded-md w-fit shrink-0">
                        {new Date(notif.createdAt).toLocaleString(undefined, {
                          month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-dark-600 leading-relaxed">{notif.message}</p>
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
