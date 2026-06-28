"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DynamicNavbar from '@/components/DynamicNavbar';

export default function Terms() {
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
        
            <span className="inline-flex items-center gap-2 bg-primary-900 border border-primary-100 shadow-sm text-accent-300 rounded-full px-5 py-2 text-sm font-bold tracking-wide mb-8 hover:-translate-y-0.5 transition-transform"><svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>Terms of Service</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">Terms of <span className="text-accent-400">Service</span></h1>
            <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed">Last Updated: June 20, 2026</p>
        
    </div>
</section>
    <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose max-w-none">
                <p className="text-lg text-dark-600 mb-8">Welcome to WPSI Prep Zone. These Terms of Service ("Terms") govern
                    your access to and use of the WPSI Prep Zone website, mobile applications, and services
                    (collectively, the "Services"). Please read these Terms carefully before using our Services.</p>
                <p>By accessing or using our Services, you agree to be bound by these Terms and our <a
                        href="/privacy">Privacy Policy</a>. If you do not agree to these Terms, you may not access or
                    use our Services.</p>
                <h2>1. Definitions</h2>
                <ul>
                    <li><strong>"Company"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, or
                        <strong>"our"</strong> refers to WPSI Prep Zone Pvt Ltd, a company registered in India with CIN:
                        U80904GJ2023PTC123456.</li>
                    <li><strong>"User"</strong>, <strong>"you"</strong>, or <strong>"your"</strong> refers to any
                        individual or entity that accesses or uses our Services.</li>
                    <li><strong>"Content"</strong> refers to all text, images, videos, audio, software, data, and other
                        materials available through our Services.</li>
                    <li><strong>"Subscription"</strong> refers to the paid plans (Pro Scholar, Elite Master) that
                        provide access to premium features.</li>
                </ul>
                <h2>2. Eligibility</h2>
                <p>You must be at least 18 years of age or the age of legal majority in your jurisdiction to use our
                    Services. By using our Services, you represent and warrant that:</p>
                <ul>
                    <li>You are at least 18 years old;</li>
                    <li>You have the legal capacity to enter into a binding contract;</li>
                    <li>You are not barred from using the Services under applicable laws;</li>
                    <li>The information you provide to us is accurate, complete, and current.</li>
                </ul>
                <p>If you are using our Services on behalf of an organization, you represent and warrant that you have
                    the authority to bind that organization to these Terms.</p>
                <h2>3. Account Registration</h2>
                <p>To access certain features of our Services, you must register for an account. When you register, you
                    agree to:</p>
                <ul>
                    <li>Provide accurate, current, and complete information;</li>
                    <li>Maintain and promptly update your account information;</li>
                    <li>Maintain the security of your password and accept all risks of unauthorized access;</li>
                    <li>Notify us immediately of any unauthorized use of your account;</li>
                    <li>Not share your account credentials with any third party.</li>
                </ul>
                <p>We reserve the right to suspend or terminate your account if any information provided during
                    registration or thereafter proves to be inaccurate, false, or misleading.</p>
                <h2>4. Subscription Plans and Payments</h2>
                <h3>4.1 Plans</h3>
                <p>We offer the following subscription plans:</p>
                <ul>
                    <li><strong>Basic (Free):</strong> Limited access to daily quizzes and basic analytics. No payment
                        required.</li>
                    <li><strong>Pro Scholar:</strong> Full access to all MCQs, 50+ mock tests, AI analysis, ad-free
                        experience, and PDF notes. Priced at INR 299 per month (discounted from INR 799).</li>
                    <li><strong>Elite Master:</strong> All Pro features plus 1-on-1 mentorship, mains answer evaluation,
                        and private Telegram group. Priced at INR 999 per month.</li>
                </ul>
                <h3>4.2 Payment Terms</h3>
                <ul>
                    <li>All prices are in Indian Rupees (INR) and inclusive of applicable GST.</li>
                    <li>Payments are processed through Razorpay, a PCI DSS Level 1 certified payment gateway.</li>
                    <li>We accept UPI, Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, and Wallets.</li>
                    <li>Subscription fees are charged in advance on a monthly basis.</li>
                    <li>All transactions are secured with 256-bit SSL encryption.</li>
                </ul>
                <h3>4.3 Auto-Renewal</h3>
                <p>Unless you cancel your subscription before the end of the current billing period, your subscription
                    will automatically renew for the same duration. You authorize us to charge the applicable
                    subscription fee to your chosen payment method.</p>
                <h2>5. Refund Policy</h2>
                <p>We offer a <strong>7-day money-back guarantee</strong> for all paid subscription plans. If you are
                    not satisfied with our Services, you may request a full refund within 7 days of your initial
                    purchase or renewal.</p>
                <p>Refund conditions:</p>
                <ul>
                    <li>Refunds must be requested within 7 days of the transaction date;</li>
                    <li>Refunds are processed within 5-7 business days to the original payment method;</li>
                    <li>No refunds will be issued after the 7-day period;</li>
                    <li>Refunds for partial months are not provided;</li>
                    <li>To request a refund, contact us at <a
                            href="mailto:support@mcqprepzone.online">support@mcqprepzone.online</a> or call
                        +91 83477 85879.</li>
                </ul>
                <h2>6. Cancellation Policy</h2>
                <p>You may cancel your subscription at any time through your account settings or by contacting our
                    support team. Upon cancellation:</p>
                <ul>
                    <li>Your subscription will remain active until the end of the current billing period;</li>
                    <li>You will not be charged for subsequent billing periods;</li>
                    <li>No partial refunds will be provided for unused days in the current billing period;</li>
                    <li>Your account will revert to the Basic (Free) plan after the current period ends.</li>
                </ul>
                <h2>7. Intellectual Property</h2>
                <p>All Content on our Services, including but not limited to text, graphics, logos, icons, images, audio
                    clips, digital downloads, data compilations, and software, is the property of WPSI Prep Zone Pvt Ltd
                    or its content suppliers and is protected by Indian and international copyright laws.</p>
                <p>You are granted a limited, non-exclusive, non-transferable license to access and use the Content for
                    your personal, non-commercial use. You may not:</p>
                <ul>
                    <li>Reproduce, distribute, modify, create derivative works from, or publicly display any Content
                        without our prior written consent;</li>
                    <li>Use any data mining, robots, or similar data gathering and extraction tools;</li>
                    <li>Frame or utilize framing techniques to enclose any trademark, logo, or other proprietary
                        information;</li>
                    <li>Remove any copyright, trademark, or other proprietary notices from the Content.</li>
                </ul>
                <h2>8. User Conduct</h2>
                <p>You agree not to use our Services for any unlawful purpose or in any way that could damage, disable,
                    overburden, or impair our Services. Specifically, you agree not to:</p>
                <ul>
                    <li>Violate any applicable local, state, national, or international law or regulation;</li>
                    <li>Impersonate any person or entity or falsely state your affiliation with any person or entity;
                    </li>
                    <li>Engage in any activity that interferes with or disrupts the Services;</li>
                    <li>Attempt to gain unauthorized access to any portion of the Services;</li>
                    <li>Use the Services to transmit any viruses, worms, defects, Trojan horses, or other items of a
                        destructive nature;</li>
                    <li>Share account credentials or allow others to use your account.</li>
                </ul>
                <h2>9. Limitation of Liability</h2>
                <p>To the maximum extent permitted by applicable law, WPSI Prep Zone Pvt Ltd and its directors,
                    employees, partners, agents, suppliers, or affiliates shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages, including without limitation, loss of
                    profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                <ul>
                    <li>Your access to or use of or inability to access or use the Services;</li>
                    <li>Any conduct or content of any third party on the Services;</li>
                    <li>Any content obtained from the Services;</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                </ul>
                <p>In no event shall our total liability to you for all claims exceed the amount you have paid to us in
                    the last 12 months.</p>
                <h2>10. Disclaimer of Warranties</h2>
                <p>Our Services are provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, express or
                    implied, including but not limited to implied warranties of merchantability, fitness for a
                    particular purpose, and non-infringement.</p>
                <p>We do not warrant that:</p>
                <ul>
                    <li>The Services will be uninterrupted, timely, secure, or error-free;</li>
                    <li>The results obtained from using the Services will be accurate or reliable;</li>
                    <li>Any errors in the Services will be corrected.</li>
                </ul>
                <h2>11. Governing Law and Jurisdiction</h2>
                <p>These Terms shall be governed by and construed in accordance with the laws of India. Any dispute
                    arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of
                    the courts in Ahmedabad, Gujarat, India.</p>
                <h2>12. Changes to Terms</h2>
                <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                    provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material
                    change will be determined at our sole discretion.</p>
                <p>By continuing to access or use our Services after any revisions become effective, you agree to be
                    bound by the revised Terms.</p>
                <h2>13. Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us:</p>
                <ul>
                    <li><strong>Email:</strong> <a
                            href="mailto:support@mcqprepzone.online">support@mcqprepzone.online</a></li>
                    <li><strong>Phone:</strong> +91 83477 85879</li>
                    <li><strong>Address:</strong> 123, Knowledge Park, Near Gujarat University, Ahmedabad, Gujarat -
                        380009, India</li>
                </ul>
                <p className="mt-8 text-sm text-dark-400">These Terms of Service were last updated on June 20, 2026.</p>
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
