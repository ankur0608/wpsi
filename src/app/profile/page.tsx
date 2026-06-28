"use client";

import React from "react";
import { useUser } from "@/context/UserContext";

export default function ProfilePage() {
  const { user } = useUser();
  const displayName = user?.name?.trim() || "Meet Patel";

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 pb-10">
      <div className="max-w-5xl mx-auto p-4 lg:p-6 space-y-8">
        
        {/* Profile Header */}
        <div className="glass-card hover-card p-8 border border-dark-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left bg-white rounded-3xl shadow-sm">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-primary-800 flex items-center justify-center text-white text-4xl font-bold shrink-0 z-10 relative uppercase">
              {displayName.slice(0, 2)}
            </div>
            <div className="absolute inset-0 bg-dark-900/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <h2 className="font-display text-4xl font-bold text-dark-900 tracking-tight">{displayName}</h2>
              <span className="bg-accent-100 text-accent-700 border border-accent-200 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">PRO</span>
            </div>
            <p className="text-dark-500 mb-6 font-medium">meet@example.com <span className="mx-2">•</span> +91 98765 43210</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">Edit Profile</button>
              <button className="bg-white hover:bg-dark-50 text-dark-700 border border-dark-200 text-sm font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm">Change Password</button>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Details Form */}
          <div className="glass-card hover-card p-8 border border-dark-100 bg-white rounded-3xl shadow-sm">
            <h3 className="font-display font-bold text-dark-900 text-xl mb-6">Personal Details</h3>
            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-dark-500 mb-2 uppercase tracking-wider">Full Name</label>
                <input type="text" className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3 text-sm text-dark-900 font-medium focus:outline-none focus:border-primary-500 transition-colors" defaultValue={displayName} />
              </div>
              <div>
                <label className="block text-xs font-bold text-dark-500 mb-2 uppercase tracking-wider">Target Exam</label>
                <input type="text" className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3 text-sm text-dark-900 font-medium focus:outline-none focus:border-primary-500 transition-colors" defaultValue="WPSI 2026" />
              </div>
              <div>
                <label className="block text-xs font-bold text-dark-500 mb-2 uppercase tracking-wider">Location</label>
                <input type="text" className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3 text-sm text-dark-900 font-medium focus:outline-none focus:border-primary-500 transition-colors" defaultValue="Ahmedabad, Gujarat" />
              </div>
            </form>
          </div>
          
          {/* Achievements */}
          <div className="glass-card hover-card p-8 border border-dark-100 bg-white rounded-3xl shadow-sm">
            <h3 className="font-display font-bold text-dark-900 text-xl mb-6">Achievements</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-primary-50 border border-primary-100 rounded-2xl hover:border-primary-300 transition-colors cursor-default group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">🏆</div>
                <div>
                  <h4 className="font-bold text-primary-900 text-base mb-0.5">Top 5% Performer</h4>
                  <p className="text-[11px] text-primary-600 font-medium uppercase tracking-wider">Achieved in May 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-accent-50 border border-accent-100 rounded-2xl hover:border-accent-300 transition-colors cursor-default group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">🔥</div>
                <div>
                  <h4 className="font-bold text-accent-900 text-base mb-0.5">7 Day Streak</h4>
                  <p className="text-[11px] text-accent-600 font-medium uppercase tracking-wider">Unlocked 15 Jun 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
