"use client";

import React, { useState } from 'react';
import { useUser } from "@/context/UserContext";

export default function SupportPage() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

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
          name: user?.name || 'Unknown User',
          email: user?.email || 'No Email',
          subject: formData.subject,
          message: formData.message
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ subject: '', message: '' });
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
    <div className="bg-dark-50 w-full font-sans text-dark-800 min-h-screen pb-20">
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        <div className="mb-6 lg:mb-8">
          <h1 className="font-display font-bold text-3xl text-dark-900 tracking-tight">Support Center</h1>
          <p className="text-dark-500 mt-2">Need help? We're here for you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info Side */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-dark-100 shadow-sm">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                <i className="fa-solid fa-envelope text-xl"></i>
              </div>
              <h3 className="font-bold text-dark-900 mb-1">Email Us</h3>
              <p className="text-sm text-dark-500 mb-3">We typically respond within 24 hours.</p>
              <a href="mailto:Mcqprepzone@gmail.com" className="text-primary-600 font-bold hover:underline text-sm">Mcqprepzone@gmail.com</a>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-dark-100 shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                <i className="fa-solid fa-book-open text-xl"></i>
              </div>
              <h3 className="font-bold text-dark-900 mb-1">FAQs</h3>
              <p className="text-sm text-dark-500 mb-3">Check out our frequently asked questions for quick answers.</p>
              <a href="/faq" className="text-emerald-600 font-bold hover:underline text-sm">View FAQs &rarr;</a>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-dark-100 shadow-sm">
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
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-dark-100 shadow-sm">
              <h2 className="font-display font-bold text-xl text-dark-900 mb-6">Send us a Message</h2>
              
              {submitSuccess ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h3 className="font-bold text-dark-900 mb-2">Message Sent!</h3>
                  <p className="text-sm text-dark-500 mb-4">Thanks for reaching out. Our support team will get back to you shortly.</p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-emerald-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-dark-500 mb-2 uppercase tracking-wider">Name</label>
                      <input 
                        type="text" 
                        value={user?.name || ''} 
                        disabled
                        className="w-full bg-dark-50 border border-dark-100 rounded-xl px-4 py-3 text-sm text-dark-500 opacity-70" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-dark-500 mb-2 uppercase tracking-wider">Email</label>
                      <input 
                        type="email" 
                        value={user?.email || ''} 
                        disabled
                        className="w-full bg-dark-50 border border-dark-100 rounded-xl px-4 py-3 text-sm text-dark-500 opacity-70" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-dark-500 mb-2 uppercase tracking-wider">Subject</label>
                    <select 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3 text-sm text-dark-900 font-medium focus:outline-none focus:border-primary-500 transition-colors"
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
                    <label className="block text-xs font-bold text-dark-500 mb-2 uppercase tracking-wider">Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3 text-sm text-dark-900 font-medium focus:outline-none focus:border-primary-500 transition-colors resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
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
