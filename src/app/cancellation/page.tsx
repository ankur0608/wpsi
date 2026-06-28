"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DynamicNavbar from '@/components/DynamicNavbar';

export default function Cancellation() {
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
        
            <span className="inline-flex items-center gap-2 bg-primary-900 border border-primary-100 shadow-sm text-accent-300 rounded-full px-5 py-2 text-sm font-bold tracking-wide mb-8 hover:-translate-y-0.5 transition-transform"><svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>Cancellation Policy</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">Cancellation <span className="text-accent-400">Policy</span></h1>
            <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed">Last Updated: June 20, 2026</p>
        
    </div>
</section>
    <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose max-w-none">
                <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-3">
                        <svg className="w-8 h-8 text-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="font-bold text-primary-900 text-lg m-0">Cancel Anytime</h3>
                            <p className="text-primary-700 text-sm m-0">You can cancel your subscription at any time with no
                                penalties or hidden fees.</p>
                        </div>
                    </div>
                </div>
                <h2>1. Overview</h2>
                <p>This Cancellation Policy explains how you can cancel your WPSI Prep Zone subscription, what happens
                    after cancellation, and how to reactivate your account. We believe in giving you full control over
                    your subscription.</p>
                <h2>2. How to Cancel Your Subscription</h2>
                <p>You can cancel your subscription using any of the following methods:</p>
                <ul>
                    <li><strong>Online:</strong> Log in to your WPSI Prep Zone account, go to "Account Settings" &gt;
                        "Billing" &gt; "Cancel Subscription," and follow the prompts;</li>
                    <li><strong>Email:</strong> Send an email to <a
                            href="mailto:support@mcqprepzone.online">support@mcqprepzone.online</a> with the subject
                        line "Subscription Cancellation - [Your Registered Email]";</li>
                    <li><strong>Phone:</strong> Call our customer support at <strong>+91 83477 85879</strong>
                        (Monday-Saturday, 9:00 AM - 8:00 PM IST);</li>
                    <li><strong>WhatsApp:</strong> Send a cancellation request to our WhatsApp number +91 83477 85879.
                    </li>
                </ul>
                <p>We recommend canceling at least 24 hours before your next billing date to avoid being charged for the
                    next billing cycle.</p>
                <h2>3. What Happens After Cancellation</h2>
                <p>When you cancel your subscription:</p>
                <ul>
                    <li><strong>Access Continues:</strong> You will continue to have access to all premium features
                        until the end of your current billing period;</li>
                    <li><strong>No Further Charges:</strong> You will not be charged for any subsequent billing periods;
                    </li>
                    <li><strong>Account Reverts to Basic:</strong> At the end of your current billing period, your
                        account will automatically revert to the Basic (Free) plan;</li>
                    <li><strong>Data Retention:</strong> Your quiz history, progress data, and achievements will be
                        retained for 2 years in case you decide to reactivate;</li>
                    <li><strong>Leaderboard Removal:</strong> Your name will be removed from premium leaderboards but
                        your historical data will be preserved.</li>
                </ul>
                <h2>4. Cancellation During the Trial/Refund Period</h2>
                <p>If you cancel within the first 7 days of your subscription:</p>
                <ul>
                    <li>You are eligible for a full refund under our <a href="/refund">Refund Policy</a>;</li>
                    <li>Your access to premium features will be revoked immediately upon refund processing;</li>
                    <li>To request a refund, please visit our <a href="/refund">Refund Policy</a> page or contact
                        support.</li>
                </ul>
                <h2>5. Reactivating Your Subscription</h2>
                <p>You can reactivate your subscription at any time:</p>
                <ul>
                    <li>Log in to your account and select a new subscription plan;</li>
                    <li>Your previous progress, quiz history, and achievements will be restored;</li>
                    <li>Any promotional pricing you previously had may not be available upon reactivation;</li>
                    <li>Reactivation is immediate upon successful payment.</li>
                </ul>
                <h2>6. Automatic Cancellation</h2>
                <p>Your subscription may be automatically cancelled if:</p>
                <ul>
                    <li>We are unable to process your payment after multiple retry attempts;</li>
                    <li>You violate our <a href="/terms">Terms of Service</a>;</li>
                    <li>You request account deletion.</li>
                </ul>
                <p>In case of payment failure, we will notify you via email and SMS before attempting to charge your
                    payment method again. If payment continues to fail, your subscription will be downgraded to the
                    Basic plan.</p>
                <h2>7. Account Deletion</h2>
                <p>If you wish to permanently delete your account:</p>
                <ul>
                    <li>Contact us at <a href="mailto:support@mcqprepzone.online">support@mcqprepzone.online</a> with
                        the subject "Account Deletion Request";</li>
                    <li>Include your registered email address and reason for deletion;</li>
                    <li>Account deletion requests are processed within 7 business days;</li>
                    <li>All personal data will be deleted in accordance with our <a href="/privacy">Privacy Policy</a>,
                        except where retention is required by law;</li>
                    <li>Deleted accounts cannot be recovered.</li>
                </ul>
                <h2>8. Changes to This Policy</h2>
                <p>We reserve the right to modify this Cancellation Policy at any time. Any changes will be effective
                    immediately upon posting on our website. We encourage you to review this policy periodically.</p>
                <h2>9. Contact Us</h2>
                <p>If you have any questions about this Cancellation Policy or need assistance with cancelling your
                    subscription, please contact us:</p>
                <ul>
                    <li><strong>Email:</strong> <a
                            href="mailto:support@mcqprepzone.online">support@mcqprepzone.online</a></li>
                    <li><strong>Phone:</strong> +91 83477 85879 (Mon-Sat, 9AM-8PM IST)</li>
                    <li><strong>Address:</strong> 123, Knowledge Park, Near Gujarat University, Ahmedabad, Gujarat -
                        380009, India</li>
                </ul>
                <p className="mt-8 text-sm text-dark-400">This Cancellation Policy was last updated on June 20, 2026.</p>
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
