"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);
  const [theme, setTheme] = useState("System Default");
  const [language, setLanguage] = useState("English");

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 pb-10">
      <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8">
        <h2 className="font-display text-3xl font-bold text-dark-900 mb-8 tracking-tight">Account Settings</h2>
        
        {/* Notifications */}
        <div className="glass-card hover-card p-8 border border-dark-100 bg-white rounded-3xl shadow-sm">
          <h3 className="font-display font-bold text-dark-900 text-xl mb-6 border-b border-dark-100 pb-4">Notifications</h3>
          <div className="space-y-6">
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <h4 className="font-bold text-base text-dark-900 group-hover:text-primary-600 transition-colors">Email Updates</h4>
                <p className="text-sm text-dark-500">Receive weekly performance reports.</p>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={emailUpdates} 
                  onChange={() => setEmailUpdates(!emailUpdates)} 
                />
                <div className={`w-12 h-7 rounded-full flex items-center p-1 transition-colors ${emailUpdates ? 'bg-primary-600' : 'bg-dark-200'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${emailUpdates ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <h4 className="font-bold text-base text-dark-900 group-hover:text-primary-600 transition-colors">Streak Reminders</h4>
                <p className="text-sm text-dark-500">Get a daily nudge to complete your challenge.</p>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={streakReminders} 
                  onChange={() => setStreakReminders(!streakReminders)} 
                />
                <div className={`w-12 h-7 rounded-full flex items-center p-1 transition-colors ${streakReminders ? 'bg-primary-600' : 'bg-dark-200'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${streakReminders ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card hover-card p-8 border border-dark-100 bg-white rounded-3xl shadow-sm">
          <h3 className="font-display font-bold text-dark-900 text-xl mb-6 border-b border-dark-100 pb-4">Preferences</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-dark-700 mb-2">Default Theme</label>
              <select 
                className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all cursor-pointer"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option>System Default</option>
                <option>Light Mode</option>
                <option>Dark Mode</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-dark-700 mb-2">Language</label>
              <select 
                className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all cursor-pointer"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English</option>
                <option>Gujarati</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-10">
          <button className="px-8 py-3 rounded-xl border border-dark-200 text-dark-700 font-bold hover:bg-dark-50 transition-colors shadow-sm">Cancel</button>
          <button className="px-8 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
