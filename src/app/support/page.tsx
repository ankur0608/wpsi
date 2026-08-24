"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from "@/context/UserContext";
import DynamicNavbar from '@/components/DynamicNavbar';
import FooterSection from '@/components/landing/FooterSection';

export default function SupportPage() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || 'Unknown User',
          email: formData.email || 'No Email',
          subject: formData.subject,
          message: formData.message
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: user?.name || '', email: user?.email || '', subject: '', message: '' });
      } else {
        showToast('Failed to send message. Please try again later.', 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast('An error occurred. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 min-h-screen flex flex-col relative overflow-x-hidden page-transition">
      <DynamicNavbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 bg-white border border-dark-100 shadow-sm text-primary-600 rounded-full px-5 py-2 text-sm font-bold tracking-wide mb-6">Support</span>
            <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-dark-900 tracking-tight mb-4">Support Center</h1>
            <p className="text-dark-500 text-lg">Need help? We're here for you.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info Side */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-dark-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                  <i className="fa-solid fa-envelope text-xl"></i>
                </div>
                <h3 className="font-bold text-dark-900 mb-1">Email Us</h3>
                <p className="text-sm text-dark-500 mb-3">We typically respond within 24 hours.</p>
                <a href="mailto:Mcqprepzone@gmail.com" className="text-primary-600 font-bold hover:underline text-sm">Mcqprepzone@gmail.com</a>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-dark-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                  <i className="fa-solid fa-book-open text-xl"></i>
                </div>
                <h3 className="font-bold text-dark-900 mb-1">FAQs</h3>
                <p className="text-sm text-dark-500 mb-3">Check out our frequently asked questions for quick answers.</p>
                <a href="/faq" className="text-emerald-600 font-bold hover:underline text-sm">View FAQs &rarr;</a>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-dark-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <i className="fa-solid fa-users text-xl"></i>
                </div>
                <h3 className="font-bold text-dark-900 mb-1">Follow Us</h3>
                <p className="text-sm text-dark-500 mb-3">Join our community on social media.</p>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/mcqprepzone?igsh=OHZuYmt2ajR2bzhi" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:opacity-80 text-xl"><i className="fa-brands fa-instagram"></i></a>
                  <a href="https://t.me/wirelesspsimcqspractise" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:opacity-80 text-xl"><i className="fa-brands fa-telegram"></i></a>
                  <a href="https://www.facebook.com/share/18UGszYzH9/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:opacity-80 text-xl"><i className="fa-brands fa-facebook"></i></a>
                </div>
              </div>
            </div>

            {/* Contact Form Side */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-dark-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="font-display font-bold text-2xl text-dark-900 mb-6">Send us a Message</h2>
                
                {submitSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-sm">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <h3 className="font-bold text-xl text-dark-900 mb-3">Message Sent!</h3>
                    <p className="text-dark-600 mb-8 max-w-sm mx-auto">Thanks for reaching out. Our support team has received your message and will get back to you shortly.</p>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/30"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-dark-600 mb-2 uppercase tracking-wider">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          disabled={!!user?.name}
                          className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3.5 text-sm text-dark-900 font-medium focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-60" 
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-dark-600 mb-2 uppercase tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email} 
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          disabled={!!user?.email}
                          className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3.5 text-sm text-dark-900 font-medium focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-60" 
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-dark-600 mb-2 uppercase tracking-wider">Subject</label>
                      <select 
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3.5 text-sm text-dark-900 font-medium focus:outline-none focus:border-primary-500 transition-colors"
                      >
                        <option value="">Select a topic...</option>
                        <option value="account">Account & Profile</option>
                        <option value="billing">Billing & Subscriptions</option>
                        <option value="technical">Technical Issue</option>
                        <option value="content">Test Content Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark-600 mb-2 uppercase tracking-wider">Message</label>
                      <textarea 
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-4 text-sm text-dark-900 font-medium focus:outline-none focus:border-primary-500 transition-colors resize-none"
                        placeholder="How can we help you today?"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-primary-500/25 hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <FooterSection />

      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[10030] animate-in slide-in-from-top-4 fade-in duration-300 shadow-xl">
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
