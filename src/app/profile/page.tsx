"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from "@/context/UserContext";

export default function ProfilePage() {
  const { user, refreshUser, updateUser } = useUser();
  const displayName = user?.name?.trim() || "User";
  const displayEmail = user?.email || "No Email";
  const displayMobile = user?.mobile || "No Mobile";
  
  const [uploading, setUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || ''
      });
    }
  }, [user]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast("Image size exceeds 2MB limit. Please choose a smaller image.", 'error');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploading(true);
    try {
      const compressedFile = await new Promise<File>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const img = new window.Image();
          img.src = e.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
              } else {
                resolve(file); // fallback
              }
            }, 'image/jpeg', 0.7); // 70% quality
          };
          img.onerror = () => resolve(file); // fallback
        };
        reader.onerror = () => resolve(file); // fallback
      });

      const formData = new FormData();
      formData.append('file', compressedFile);

      const response = await fetch('/api/user/profile-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await refreshUser();
        showToast('Profile image updated successfully!', 'success');
      } else {
        const data = await response.json();
        showToast(data.error || 'Failed to upload image', 'error');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      showToast('An error occurred during upload.', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUser({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile
      });
      showToast('Profile updated successfully!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 pb-10 min-h-screen">
      <div className="max-w-5xl mx-auto p-4 lg:p-6 space-y-8">
        
        {/* Profile Header */}
        <div className="glass-card hover-card p-8 border border-dark-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left bg-white rounded-3xl shadow-sm">
          <div className="relative group">
            <input type="file" className="hidden" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-primary-800 flex items-center justify-center text-white text-4xl font-bold shrink-0 z-10 relative uppercase overflow-hidden">
              {user?.image ? (
                <Image fill src={user.image} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                displayName.slice(0, 2)
              )}
            </div>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-dark-900/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
            >
              {uploading ? (
                 <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              )}
            </div>
            
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-transform hover:scale-110 z-30"
              title="Change Profile Picture"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <h2 className="font-display text-4xl font-bold text-dark-900 tracking-tight">{displayName}</h2>
              {user?.planType && user.planType !== 'free' && (
                <span className="bg-accent-100 text-accent-700 border border-accent-200 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">PRO</span>
              )}
            </div>
            <p className="text-dark-500 mb-6 font-medium">{displayEmail} {displayMobile !== "No Mobile" && <><span className="mx-2">•</span> {displayMobile}</>}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button onClick={() => document.getElementById('personal-details')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">Edit Profile</button>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">

          {/* Personal Details Form */}
          <div id="personal-details" className="glass-card hover-card p-8 border border-dark-100 bg-white rounded-3xl shadow-sm">
            <h3 className="font-display font-bold text-dark-900 text-xl mb-6">Personal Details</h3>
            <form className="space-y-5" onSubmit={handleSaveProfile}>
              <div>
                <label className="block text-xs font-bold text-dark-500 mb-2 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3 text-sm text-dark-900 font-medium focus:outline-none focus:border-primary-500 transition-colors" 
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-dark-500 mb-2 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3 text-sm text-dark-900 font-medium focus:outline-none focus:border-primary-500 transition-colors" 
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-dark-500 mb-2 uppercase tracking-wider">Mobile Number</label>
                <input 
                  type="text" 
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3 text-sm text-dark-900 font-medium focus:outline-none focus:border-primary-500 transition-colors" 
                />
              </div>
              <button 
                type="submit" 
                disabled={isSaving}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold py-3 px-6 rounded-xl transition-all shadow-md mt-4 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
          
          {/* Achievements */}
          <div className="glass-card hover-card p-8 border border-dark-100 bg-white rounded-3xl shadow-sm">
            <h3 className="font-display font-bold text-dark-900 text-xl mb-6">Achievements</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-primary-50 border border-primary-100 rounded-2xl hover:border-primary-300 transition-colors cursor-default group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">🏆</div>
                <div>
                  <h4 className="font-bold text-primary-900 text-base mb-0.5">Current Level</h4>
                  <p className="text-[11px] text-primary-600 font-medium uppercase tracking-wider">Level {user?.level || 1}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-accent-50 border border-accent-100 rounded-2xl hover:border-accent-300 transition-colors cursor-default group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">🔥</div>
                <div>
                  <h4 className="font-bold text-accent-900 text-base mb-0.5">Best Streak</h4>
                  <p className="text-[11px] text-accent-600 font-medium uppercase tracking-wider">{user?.bestStreak || 0} Days</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-100 rounded-2xl hover:border-green-300 transition-colors cursor-default group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">⭐</div>
                <div>
                  <h4 className="font-bold text-green-900 text-base mb-0.5">Total XP</h4>
                  <p className="text-[11px] text-green-600 font-medium uppercase tracking-wider">{user?.xp || 0} XP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Links for Mobile/Desktop */}
          <div className="glass-card p-4 md:p-8 border border-dark-100 bg-white rounded-3xl shadow-sm md:col-span-2">
            <h3 className="font-display font-bold text-dark-900 text-xl mb-6 px-2">Menu</h3>
            <div className="flex flex-col gap-2">

              <Link href="/dashboard/pricing" className="flex items-center justify-between p-4 bg-dark-50 rounded-2xl hover:bg-dark-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                  </div>
                  <span className="font-bold text-dark-800">Pricing & Plans</span>
                </div>
                <svg className="w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
              <Link href="/settings" className="flex items-center justify-between p-4 bg-dark-50 rounded-2xl hover:bg-dark-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <span className="font-bold text-dark-800">Settings</span>
                </div>
                <svg className="w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
              <Link href="/support" className="flex items-center justify-between p-4 bg-dark-50 rounded-2xl hover:bg-dark-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  </div>
                  <span className="font-bold text-dark-800">Support</span>
                </div>
                <svg className="w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
              <Link href="/dashboard/payments" className="flex items-center justify-between p-4 bg-dark-50 rounded-2xl hover:bg-dark-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"></path></svg>
                  </div>
                  <span className="font-bold text-dark-800">Payment History</span>
                </div>
                <svg className="w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {toast && (
        <div className="fixed top-20 right-6 z-[10030] animate-in slide-in-from-top-4 fade-in duration-300 shadow-xl">
          <div className="flex items-center gap-3 rounded-full bg-dark-900/95 backdrop-blur-md pl-2 pr-4 py-2 border border-dark-700/50">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-inner ${toast.type === 'success' ? 'bg-emerald-500 text-white' : toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-primary-500 text-white'}`}>
              <i className={`fa-solid ${toast.type === 'success' ? 'fa-check' : toast.type === 'error' ? 'fa-xmark' : 'fa-info'}`}></i>
            </div>
            <p className="text-sm font-bold text-white whitespace-nowrap">{toast.message}</p>
          </div>
        </div>
      )}

    </div>
  );
}
