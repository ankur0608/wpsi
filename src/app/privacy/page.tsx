import Link from 'next/link';
import DynamicNavbar from '@/components/DynamicNavbar';

export default function Privacy() {
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
        
            <span className="inline-flex items-center gap-2 bg-primary-900 border border-primary-100 shadow-sm text-accent-300 rounded-full px-5 py-2 text-sm font-bold tracking-wide mb-8 hover:-translate-y-0.5 transition-transform"><svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>Privacy Policy</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">Privacy <span className="text-accent-400">Policy</span></h1>
            <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed">Last Updated: June 20, 2026</p>
        
    </div>
</section>
    <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose max-w-none">
                <p className="text-lg text-dark-600 mb-8">WPSI Prep Zone Pvt Ltd ("we," "us," or "our") is committed to
                    protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
                    your personal information when you use our website, mobile applications, and services (collectively,
                    the "Services").</p>
                <p>By using our Services, you consent to the collection and use of information in accordance with this
                    Privacy Policy. If you do not agree with this policy, please do not use our Services.</p>
                <h2>1. Information We Collect</h2>
                <h3>1.1 Personal Information</h3>
                <p>We may collect the following personal information from you:</p>
                <ul>
                    <li><strong>Identity Information:</strong> Full name, date of birth, gender, profile photo;</li>
                    <li><strong>Contact Information:</strong> Email address, phone number, postal address;</li>
                    <li><strong>Account Information:</strong> Username, password, account preferences;</li>
                    <li><strong>Payment Information:</strong> Payment method details (processed securely through
                        Razorpay; we do not store full card numbers);</li>
                    <li><strong>Educational Information:</strong> Exam preferences, study goals, academic background;
                    </li>
                    <li><strong>Device Information:</strong> IP address, browser type, operating system, device
                        identifiers.</li>
                </ul>
                <h3>1.2 Usage Data</h3>
                <p>We automatically collect information about how you interact with our Services:</p>
                <ul>
                    <li>Pages visited, time spent, click patterns, and navigation paths;</li>
                    <li>Quiz performance, mock test scores, and learning progress;</li>
                    <li>Features used, content accessed, and search queries;</li>
                    <li>Login times, session duration, and frequency of use.</li>
                </ul>
                <h3>1.3 Cookies and Tracking Technologies</h3>
                <p>We use cookies, web beacons, and similar technologies to:</p>
                <ul>
                    <li>Remember your preferences and settings;</li>
                    <li>Analyze site traffic and user behavior;</li>
                    <li>Deliver personalized content and advertisements;</li>
                    <li>Improve our Services and user experience.</li>
                </ul>
                <p>You can control cookies through your browser settings. However, disabling cookies may affect the
                    functionality of our Services.</p>
                <h2>2. How We Use Your Information</h2>
                <p>We use the collected information for the following purposes:</p>
                <ul>
                    <li><strong>Service Provision:</strong> To provide, maintain, and improve our Services, including
                        personalized study plans and progress tracking;</li>
                    <li><strong>Account Management:</strong> To create and manage your account, process payments, and
                        send transactional communications;</li>
                    <li><strong>Communication:</strong> To send you updates, newsletters, promotional offers, and
                        respond to your inquiries;</li>
                    <li><strong>Analytics:</strong> To analyze usage patterns, measure performance, and improve our
                        Services;</li>
                    <li><strong>Security:</strong> To detect, prevent, and address fraud, security breaches, and
                        technical issues;</li>
                    <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal
                        processes.</li>
                </ul>
                <h2>3. How We Share Your Information</h2>
                <p>We do not sell your personal information. We may share your information in the following
                    circumstances:</p>
                <ul>
                    <li><strong>Service Providers:</strong> We share information with trusted third-party vendors who
                        assist us in operating our Services, such as payment processors (Razorpay), cloud hosting
                        providers, and analytics services. These providers are contractually obligated to protect your
                        information.</li>
                    <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, court
                        order, or governmental authority.</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets,
                        your information may be transferred as part of the transaction.</li>
                    <li><strong>With Your Consent:</strong> We may share your information with third parties when you
                        explicitly authorize us to do so.</li>
                </ul>
                <h2>4. Data Security</h2>
                <p>We implement industry-standard security measures to protect your personal information:</p>
                <ul>
                    <li><strong>Encryption:</strong> All data transmitted between your device and our servers is
                        encrypted using TLS 1.3 (SSL);</li>
                    <li><strong>Secure Storage:</strong> Personal data is stored on secure servers with access controls
                        and regular security audits;</li>
                    <li><strong>Payment Security:</strong> All payment transactions are processed through PCI DSS Level
                        1 certified payment gateways. We do not store your full card details;</li>
                    <li><strong>Access Controls:</strong> Only authorized personnel have access to personal information,
                        and they are bound by confidentiality obligations;</li>
                    <li><strong>Regular Audits:</strong> We conduct regular security assessments and vulnerability
                        testing.</li>
                </ul>
                <p>Despite our efforts, no method of transmission over the internet or electronic storage is 100%
                    secure. We cannot guarantee absolute security.</p>
                <h2>5. Data Retention</h2>
                <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                    Privacy Policy, unless a longer retention period is required or permitted by law:</p>
                <ul>
                    <li>Account information: Retained while your account is active and for 2 years after closure;</li>
                    <li>Payment records: Retained for 7 years as required by tax and accounting regulations;</li>
                    <li>Usage data: Retained for analytics purposes for up to 3 years;</li>
                    <li>Communications: Retained for customer service and legal compliance purposes.</li>
                </ul>
                <h2>6. Your Rights</h2>
                <p>Under applicable data protection laws, you have the following rights regarding your personal
                    information:</p>
                <ul>
                    <li><strong>Access:</strong> You can request a copy of the personal information we hold about you;
                    </li>
                    <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete
                        information;</li>
                    <li><strong>Deletion:</strong> You can request that we delete your personal information, subject to
                        legal obligations;</li>
                    <li><strong>Restriction:</strong> You can request that we restrict the processing of your
                        information;</li>
                    <li><strong>Portability:</strong> You can request a copy of your data in a structured,
                        machine-readable format;</li>
                    <li><strong>Objection:</strong> You can object to the processing of your information for direct
                        marketing purposes;</li>
                    <li><strong>Withdraw Consent:</strong> You can withdraw your consent at any time, without affecting
                        the lawfulness of processing based on consent before its withdrawal.</li>
                </ul>
                <p>To exercise these rights, please contact us at <a
                        href="mailto:support@mcqprepzone.online">support@mcqprepzone.online</a>.</p>
                <h2>7. Children's Privacy</h2>
                <p>Our Services are not intended for individuals under the age of 13. We do not knowingly collect
                    personal information from children under 13. If we become aware that we have collected personal
                    information from a child under 13, we will take steps to delete such information promptly.</p>
                <h2>8. International Data Transfers</h2>
                <p>Your information is primarily stored and processed in India. In certain circumstances, we may
                    transfer your information to service providers located in other countries. When we do so, we ensure
                    that appropriate safeguards are in place to protect your information in accordance with this Privacy
                    Policy.</p>
                <h2>9. Third-Party Links</h2>
                <p>Our Services may contain links to third-party websites or services that are not owned or controlled
                    by us. We are not responsible for the privacy practices of these third parties. We encourage you to
                    review the privacy policies of any third-party sites you visit.</p>
                <h2>10. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by
                    posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you
                    to review this Privacy Policy periodically.</p>
                <h2>11. Contact Us</h2>
                <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                    please contact us:</p>
                <ul>
                    <li><strong>Email:</strong> <a
                            href="mailto:support@mcqprepzone.online">support@mcqprepzone.online</a></li>
                    <li><strong>Phone:</strong> +91 83477 85879</li>
                    <li><strong>Address:</strong> 123, Knowledge Park, Near Gujarat University, Ahmedabad, Gujarat -
                        380009, India</li>
                    <li><strong>Grievance Officer:</strong> Mr. Amit Kumar, Head of Operations. Email: <a
                            href="mailto:grievance@mcqprepzone.online">grievance@mcqprepzone.online</a></li>
                </ul>
                <p className="mt-8 text-sm text-dark-400">This Privacy Policy was last updated on June 20, 2026.</p>
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
