"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DynamicNavbar from '@/components/DynamicNavbar';

export default function Contact() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Handle FAQ toggles
    const toggles = document.querySelectorAll('.faq-toggle');
    toggles.forEach(toggle => {
        const handler = () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('.faq-icon');
            
            if (!content) return;
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                if(icon) icon.classList.add('rotate-180');
                toggle.setAttribute('aria-expanded', 'true');
            } else {
                content.classList.add('hidden');
                if(icon) icon.classList.remove('rotate-180');
                toggle.setAttribute('aria-expanded', 'false');
            }
        };
        toggle.addEventListener('click', handler);
        return () => toggle.removeEventListener('click', handler);
    });

    // Testimonials Scroll Controls
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    let autoPlay: ReturnType<typeof setInterval> | undefined;
    if (track && prevBtn && nextBtn) {
        const getScrollStep = () => {
            const card = track.querySelector('div');
            return card ? card.offsetWidth + 24 : 340; 
        };
        
        const scrollPrev = () => {
            track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        };
        const scrollNext = () => {
            track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        };
        
        prevBtn.addEventListener('click', scrollPrev);
        nextBtn.addEventListener('click', scrollNext);
        
        let autoScrollDirection = 1;
        autoPlay = setInterval(() => {
            const step = getScrollStep();
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (track.scrollLeft >= maxScroll - 10) {
                autoScrollDirection = -1;
            } else if (track.scrollLeft <= 10) {
                autoScrollDirection = 1;
            }
            track.scrollBy({ left: autoScrollDirection * step, behavior: 'smooth' });
        }, 5000);
        
        const stopAutoPlay = () => clearInterval(autoPlay);
        prevBtn.addEventListener('click', stopAutoPlay);
        nextBtn.addEventListener('click', stopAutoPlay);
        track.addEventListener('touchstart', stopAutoPlay, { passive: true });
        track.addEventListener('mousedown', stopAutoPlay);
        
        return () => {
            clearInterval(autoPlay);
            prevBtn.removeEventListener('click', scrollPrev);
            nextBtn.removeEventListener('click', scrollNext);
            prevBtn.removeEventListener('click', stopAutoPlay);
            nextBtn.removeEventListener('click', stopAutoPlay);
            track.removeEventListener('touchstart', stopAutoPlay);
            track.removeEventListener('mousedown', stopAutoPlay);
        };
    }
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden page-transition">
        <DynamicNavbar />
        

            
    
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
                                <p className="text-dark-500 text-sm">123, Knowledge Park, Near Gujarat
                                    University<br />Ahmedabad, Gujarat - 380009, India</p>
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
                                <p className="text-dark-500 text-sm">General Inquiries: <a
                                        href="mailto:support@mcqprepzone.online"
                                        className="text-primary-600 hover:underline">support@mcqprepzone.online</a></p>
                                <p className="text-dark-500 text-sm">Partnerships: <a
                                        href="mailto:partners@mcqprepzone.online"
                                        className="text-primary-600 hover:underline">partners@mcqprepzone.online</a></p>
                                <p className="text-dark-500 text-sm">Careers: <a href="mailto:careers@mcqprepzone.online"
                                        className="text-primary-600 hover:underline">careers@mcqprepzone.online</a></p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 bg-dark-50 rounded-2xl border border-dark-200">
                            <div
                                className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-success-700" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-dark-900 mb-1">Call Us</h4>
                                <p className="text-dark-500 text-sm">Customer Support: <a href="tel:+918347785879"
                                        className="text-primary-600 hover:underline">+91 83477 85879</a></p>
                                <p className="text-dark-500 text-sm">WhatsApp: <a href="https://wa.me/917912345678"
                                        className="text-primary-600 hover:underline">+91 83477 85879</a></p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 bg-dark-50 rounded-2xl border border-dark-200">
                            <div
                                className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-dark-900 mb-1">Business Hours</h4>
                                <p className="text-dark-500 text-sm">Monday - Saturday: 9:00 AM - 8:00 PM IST</p>
                                <p className="text-dark-500 text-sm">Sunday: Closed</p>
                                <p className="text-dark-400 text-xs mt-1">Response time: Within 4 hours during business
                                    hours</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="font-display text-3xl font-bold text-dark-900 mb-8">Send us a <span
                            className="text-primary-600">Message</span></h2>
                    <form className="bg-dark-50 rounded-3xl p-8 border border-dark-200 space-y-6" action="#" method="POST">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-dark-700 mb-2">Full Name
                                    *</label>
                                <input type="text" id="name" name="name" required
                                    className="w-full px-4 py-3 rounded-xl border border-dark-300 bg-white text-dark-900 text-sm input-focus transition-all"
                                    placeholder="Your full name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-dark-700 mb-2">Email Address
                                    *</label>
                                <input type="email" id="email" name="email" required
                                    className="w-full px-4 py-3 rounded-xl border border-dark-300 bg-white text-dark-900 text-sm input-focus transition-all"
                                    placeholder="you@example.com" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-dark-700 mb-2">Phone
                                Number</label>
                            <input type="tel" id="phone" name="phone"
                                className="w-full px-4 py-3 rounded-xl border border-dark-300 bg-white text-dark-900 text-sm input-focus transition-all"
                                placeholder="+91-XXXXXXXXXX" />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-semibold text-dark-700 mb-2">Subject
                                *</label>
                            <select id="subject" name="subject" required
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
                            <textarea id="message" name="message" rows={5} required
                                className="w-full px-4 py-3 rounded-xl border border-dark-300 bg-white text-dark-900 text-sm input-focus transition-all resize-none"
                                placeholder="How can we help you?"></textarea>
                        </div>
                        <div className="flex items-start gap-3">
                            <input type="checkbox" id="consent" name="consent" required
                                className="w-4 h-4 mt-0.5 rounded border-dark-300 text-primary-600 focus:ring-primary-500" />
                            <label htmlFor="consent" className="text-xs text-dark-500">I agree to the <a href="/privacy"
                                    className="text-primary-600 hover:underline">Privacy Policy</a> and consent to being
                                contacted regarding my inquiry. *</label>
                        </div>
                        <button type="submit"
                            className="w-full bg-primary-800 hover:bg-primary-800 hover: text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary-500/25 hover:shadow-xl">Send
                            Message</button>
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
                    <p className="text-sm text-dark-500">Understand our 7-day money-back guarantee terms.</p>
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
                        <li>Email: support@mcqprepzone.online</li>
                        <li>Phone: +91 83477 85879</li>
                        <li>Location: Ahmedabad, Gujarat</li>
                    </ul>
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
