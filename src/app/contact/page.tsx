"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DynamicNavbar from '@/components/DynamicNavbar';
import { useUser } from '@/context/UserContext';

export default function Contact() {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email,
                phone: user.mobile || prev.phone
            }));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            console.log("respons", response);
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus('success');
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 5000);
            setFormData({
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.mobile || '',
                subject: '',
                message: '',
                consent: false
            });
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="relative w-full overflow-x-hidden page-transition">
            <DynamicNavbar />

            {/* Success Toast Notification */}
            <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
                <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-[0_8px_30px_rgba(16,185,129,0.15)] rounded-2xl p-4 flex items-center gap-3 w-max max-w-sm md:max-w-md">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                        <p className="font-bold text-sm">Message Sent!</p>
                        <p className="text-xs text-emerald-600 opacity-90">We will get back to you soon.</p>
                    </div>
                    <button onClick={() => setShowToast(false)} className="ml-4 text-emerald-400 hover:text-emerald-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            </div>

            <section className="relative bg-primary-900 pt-40 pb-28 overflow-hidden border-b border-primary-800">
                {/*  Premium Grid Background  */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

                {/*  Soft Glowing Orbs  */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/5 to-transparent"></div>
                <div className="absolute -right-40 -top-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -left-40 top-20 w-72 h-72 bg-accent-400/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 page-transition">

                    <span className="inline-flex items-center gap-2 bg-primary-900 border border-primary-100 shadow-sm text-accent-300 rounded-full px-5 py-2 text-sm font-bold tracking-wide mb-8 hover:-translate-y-0.5 transition-transform"><svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>Get In Touch</span>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">Let's Connect and <span className="text-accent-400">Crack It</span></h1>
                    <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed">Have questions about our plans, features, or customized options? Our support team is here to help you.</p>

                </div>
            </section>
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="font-display text-3xl font-bold text-dark-900 mb-8">Contact <span
                                className="text-primary-600">Information</span></h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-6 bg-dark-50 rounded-2xl border border-dark-200">
                                    <div
                                        className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-900 mb-1">Office Address</h4>
                                        <p className="text-dark-500 text-sm">Ahmedabad, Gujarat, India</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-6 bg-dark-50 rounded-2xl border border-dark-200">
                                    <div
                                        className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-accent-700" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-900 mb-1">Email Us</h4>
                                        <p className="text-dark-500 text-sm">Email: <a
                                            href="mailto:Mcqprepzone@gmail.com"
                                            className="text-primary-600 hover:underline">Mcqprepzone@gmail.com</a></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-6 bg-dark-50 rounded-2xl border border-dark-200">
                                    <div
                                        className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-900 mb-2">Follow Us</h4>
                                        <div className="flex gap-4">
                                            <a href="https://www.instagram.com/mcqprepzone?igsh=OHZuYmt2ajR2bzhi" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:opacity-80 text-xl"><i className="fa-brands fa-instagram"></i></a>
                                            <a href="https://t.me/wirelesspsimcqspractise" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:opacity-80 text-xl"><i className="fa-brands fa-telegram"></i></a>
                                            <a href="https://www.facebook.com/share/18UGszYzH9/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:opacity-80 text-xl"><i className="fa-brands fa-facebook"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="font-display text-3xl font-bold text-dark-900 mb-8">Send us a <span
                                className="text-primary-600">Message</span></h2>
                            <form className="bg-dark-50 rounded-3xl p-8 border border-dark-200 space-y-6" onSubmit={handleSubmit}>
                                {status === 'error' && (
                                    <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 font-medium">
                                        {errorMessage}
                                    </div>
                                )}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-dark-700 mb-2">Full Name
                                            *</label>
                                        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-dark-300 bg-white text-dark-900 text-sm input-focus transition-all"
                                            placeholder="Your full name" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-dark-700 mb-2">Email Address
                                            *</label>
                                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-dark-300 bg-white text-dark-900 text-sm input-focus transition-all"
                                            placeholder="you@example.com" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-dark-700 mb-2">Phone
                                        Number</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-dark-300 bg-white text-dark-900 text-sm input-focus transition-all"
                                        placeholder="+91-XXXXXXXXXX" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-dark-700 mb-2">Subject
                                        *</label>
                                    <select id="subject" name="subject" required value={formData.subject} onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-dark-300 bg-white text-dark-900 text-sm input-focus transition-all">
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="technical">Technical Support</option>
                                        <option value="billing">Billing & Payments</option>
                                        <option value="refund">Refund Request</option>
                                        <option value="partnership">Business Partnership</option>
                                        <option value="career">Careers</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-dark-700 mb-2">Message
                                        *</label>
                                    <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-dark-300 bg-white text-dark-900 text-sm input-focus transition-all resize-none"
                                        placeholder="How can we help you?"></textarea>
                                </div>
                                <div className="flex items-start gap-3">
                                    <input type="checkbox" id="consent" name="consent" required checked={formData.consent} onChange={handleChange}
                                        className="w-4 h-4 mt-0.5 rounded border-dark-300 text-primary-600 focus:ring-primary-500" />
                                    <label htmlFor="consent" className="text-xs text-dark-500">I agree to the <a href="/privacy"
                                        className="text-primary-600 hover:underline">Privacy Policy</a> and consent to being
                                        contacted regarding my inquiry. *</label>
                                </div>
                                <button type="submit" disabled={status === 'loading'}
                                    className="w-full bg-primary-800 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary-500/25 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>
                                <p className="text-xs text-dark-400 text-center">We typically respond within 4 business hours.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-dark-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-display text-3xl font-bold text-dark-900 mb-8">Frequently Asked <span
                        className="text-primary-600">Questions</span></h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <a href="/terms"
                            className="bg-white rounded-2xl p-6 border border-dark-200 hover:border-primary-300 hover-lift transition-all text-left">
                            <h4 className="font-bold text-dark-900 mb-2">Terms of Service</h4>
                            <p className="text-sm text-dark-500">Read our terms and conditions for using our platform.</p>
                        </a>
                        <a href="/privacy"
                            className="bg-white rounded-2xl p-6 border border-dark-200 hover:border-primary-300 hover-lift transition-all text-left">
                            <h4 className="font-bold text-dark-900 mb-2">Privacy Policy</h4>
                            <p className="text-sm text-dark-500">Learn how we protect and handle your personal data.</p>
                        </a>
                        <a href="/refund"
                            className="bg-white rounded-2xl p-6 border border-dark-200 hover:border-primary-300 hover-lift transition-all text-left">
                            <h4 className="font-bold text-dark-900 mb-2">Refund Policy</h4>
                            {/* <p className="text-sm text-dark-500">Understand our 7-day money-back guarantee terms.</p> */}
                        </a>
                    </div>
                </div>
            </section>

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}

            {/*  Common Footer  */}
            <footer className="bg-dark-900 text-dark-300 py-16 border-t border-dark-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-1">
                            <h2 className="font-display font-bold text-2xl text-white tracking-tight mb-4">MCQ Prep Zone</h2>
                            <p className="text-sm mb-6">Practice Topic-wise MCQs, Mock Tests, Previous Year Questions, and Track Your Progress for the Gujarat Wireless PSI Examination.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/" className="hover:text-accent-400 transition-colors">Home</a></li>
                                <li><a href="/pricing" className="hover:text-accent-400 transition-colors">Pricing</a></li>
                                <li><a href="/blog" className="hover:text-accent-400 transition-colors">Blogs</a></li>
                                <li><a href="/about" className="hover:text-accent-400 transition-colors">About Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/privacy" className="hover:text-accent-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="/terms" className="hover:text-accent-400 transition-colors">Terms of Service</a></li>
                                <li><a href="/cancellation" className="hover:text-accent-400 transition-colors">Cancellation</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li>Email: Mcqprepzone@gmail.com</li>
                                <li>Location: Ahmedabad, Gujarat, India</li>
                            </ul>
                            <div className="mt-4 flex gap-4">
                                <a href="https://www.instagram.com/mcqprepzone?igsh=OHZuYmt2ajR2bzhi" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-pink-500 text-xl transition-colors"><i className="fa-brands fa-instagram"></i></a>
                                <a href="https://t.me/wirelesspsimcqspractise" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-blue-400 text-xl transition-colors"><i className="fa-brands fa-telegram"></i></a>
                                <a href="https://www.facebook.com/share/18UGszYzH9/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-blue-600 text-xl transition-colors"><i className="fa-brands fa-facebook"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-xs border-t border-dark-800 pt-8">
                        &copy; 2026 MCQ Prep Zone Pvt Ltd. All rights reserved.
                    </div>
                </div>
            </footer>















            {/*  JavaScript  */}





        </div>
    );
}
