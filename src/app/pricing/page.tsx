"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DynamicNavbar from '@/components/DynamicNavbar';

export default function Pricing() {
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
        
            <span className="inline-flex items-center gap-2 bg-primary-900 border border-primary-100 shadow-sm text-accent-300 rounded-full px-5 py-2 text-sm font-bold tracking-wide mb-8 hover:-translate-y-0.5 transition-transform"><svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>Pricing Plans</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">Secure Your Rank <span className="text-accent-400">Excellence</span></h1>
            <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed">Choose a plan that fits your goals and budget. Start mastering your exams today.</p>
        
    </div>
</section>
    {/*  Pricing Section  */}
    <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span
                    className="inline-block bg-accent-100 text-accent-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Pricing
                    Plans</span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 mb-4">Invest in your WPSI
                    <span className="text-primary-600">Future</span>
                </h2>
                <p className="text-dark-500 text-lg">Get access to premium materials, AI analysis, and unlimited mock tests.
                    Less than the cost of a daily tea.</p>
                <div
                    className="mt-6 inline-flex items-center gap-2 bg-accent-100 text-accent-800 px-4 py-2 rounded-full text-sm font-bold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Flat 60% OFF - Ends Today!
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/*  Basic  */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-dark-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative">
                    <div className="mb-6">
                        <h3 className="font-display text-xl font-bold text-dark-900 mb-2">WPSI Basic</h3>
                        <p className="text-dark-500 text-sm">Perfect for starting your journey.</p>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-display font-bold text-dark-900">₹0</span>
                        <span className="text-dark-500">/ forever</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3 text-sm text-dark-600">
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                            Daily 1 Free WPSI Quiz
                        </li>
                        <li className="flex items-center gap-3 text-sm text-dark-600">
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                            Basic Analytics
                        </li>
                        <li className="flex items-center gap-3 text-sm text-dark-400">
                            <svg className="w-5 h-5 text-dark-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd" />
                            </svg>
                            No Full Mock Tests
                        </li>
                        <li className="flex items-center gap-3 text-sm text-dark-400">
                            <svg className="w-5 h-5 text-dark-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd" />
                            </svg>
                            Ads Enabled
                        </li>
                    </ul>
                    <a href="#"
                        className="block w-full text-center bg-dark-100 hover:bg-dark-200 text-dark-700 font-semibold py-3 rounded-xl transition-colors">Get
                        Started Free</a>
                </div>

                {/*  Pro Scholar  */}

                <div
                    className="pricing-popular bg-primary-900 rounded-[2.5rem] p-8 border-2 border-primary-700 shadow-2xl hover:-translate-y-2 transition-all duration-300 relative text-white">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span
                            className="badge-shine bg-accent-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">Most
                            Popular</span>
                    </div>
                    <div className="mb-6 pt-2">
                        <h3 className="font-display text-xl font-bold text-white mb-2">WPSI Part A Mastery</h3>
                        <p className="text-primary-200 text-sm">Master the General Studies syllabus (Part A).</p>
                    </div>
                    <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-display font-bold text-white">₹299</span>
                            <span className="text-lg text-primary-300/50 line-through">₹799</span>
                            <span className="text-primary-200">/ mo</span>
                        </div>
                        <div className="text-xs text-success-400 font-semibold mt-1">Save ₹500/month (60% OFF)</div>
                    </div>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3 text-sm text-primary-100">
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                            Unlimited Premium MCQs
                        </li>
                        <li className="flex items-center gap-3 text-sm text-primary-100">
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                            50+ Full Mock Tests (A & B)
                        </li>
                        <li className="flex items-center gap-3 text-sm text-primary-100">
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                            AI Weakness Detection
                        </li>
                        <li className="flex items-center gap-3 text-sm text-primary-100">
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                            Ad-free experience
                        </li>
                        <li className="flex items-center gap-3 text-sm text-primary-100">
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                            Detailed PDF Notes
                        </li>
                    </ul>
                    <a href="#"
                        className="block w-full text-center bg-white hover:bg-dark-50 text-primary-900 font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl">Claim
                        60% Discount</a>
                    <p className="text-center text-xs text-primary-300 mt-3">7-day money-back guarantee</p>
                </div>

                {/*  Elite Master  */}

                <div className="bg-white rounded-[2.5rem] p-8 border border-dark-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative">
                    <div className="mb-6">
                        <h3 className="font-display text-xl font-bold text-dark-900 mb-2">WPSI Part A + B Combo</h3>
                        <p className="text-dark-500 text-sm">Personalized guidance and mentorship.</p>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-display font-bold text-dark-900">₹999</span>
                        <span className="text-dark-500">/ mo</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3 text-sm text-dark-600">
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                            All Pro Features
                        </li>
                        <li className="flex items-center gap-3 text-sm text-dark-600">
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                            1-on-1 Mentor Calls
                        </li>
                        <li className="flex items-center gap-3 text-sm text-dark-600">
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                            Mains Answer Evaluation
                        </li>
                        <li className="flex items-center gap-3 text-sm text-dark-600">
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                            Private Telegram Group
                        </li>
                    </ul>
                    <a href="#"
                        className="block w-full text-center bg-primary-800 hover:bg-primary-900 text-white font-semibold py-3 rounded-xl transition-colors">Upgrade
                        to Elite</a>
                    <p className="text-center text-xs text-dark-400 mt-3">7-day money-back guarantee</p>
                </div>
            </div>

            {/*  Trust Badges  */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-dark-400">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">SSL Secured</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">7-Day Refund</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">RBI Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">GST Invoice</span>
                </div>
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
