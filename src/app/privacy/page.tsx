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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
            <div className="bg-white rounded-3xl shadow-xl shadow-primary-900/5 border border-dark-100 p-8 md:p-12">
                <p className="text-lg text-dark-600 mb-6 leading-relaxed">Welcome to MCQPrepZone. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you access or use our website, mobile application, and related services.</p>
                <p className="text-dark-600 leading-relaxed mb-10">By using our Services, you agree to the collection and use of your information in accordance with this Privacy Policy.</p>

                <h2 className="text-2xl font-bold text-primary-900 mt-10 mb-4 border-b border-primary-100 pb-2 flex items-center gap-3">
                    <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
                    Information We Collect
                </h2>
                <p className="text-dark-600 leading-relaxed mb-4">We may collect the following types of information:</p>

                <h3 className="text-lg font-bold text-primary-800 mt-6 mb-3">Personal Information</h3>
                <p className="text-dark-600 leading-relaxed mb-4">When you create an account, purchase a subscription, or contact us, we may collect:</p>
                <ul className="list-disc text-dark-600 space-y-2 mb-6 ml-6">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Mobile number (if provided)</li>
                    <li>Profile information</li>
                    <li>Payment-related information (processed securely by our payment partners)</li>
                </ul>

                <h3 className="text-lg font-bold text-primary-800 mt-6 mb-3">Usage Information</h3>
                <p className="text-dark-600 leading-relaxed mb-4">When you use our Services, we may automatically collect:</p>
                <ul className="list-disc text-dark-600 space-y-2 mb-6 ml-6">
                    <li>IP address</li>
                    <li>Device and browser information</li>
                    <li>Operating system</li>
                    <li>App and website usage data</li>
                    <li>Login history</li>
                    <li>Quiz and test performance</li>
                    <li>Pages visited and time spent on the platform</li>
                </ul>

                <h3 className="text-lg font-bold text-primary-800 mt-6 mb-3">Cookies</h3>
                <p className="text-dark-600 leading-relaxed mb-4">We may use cookies and similar technologies to improve your experience, remember preferences, analyze traffic, and enhance platform performance.</p>
                <p className="text-dark-600 leading-relaxed mb-4">You may disable cookies through your browser settings, although some features may not function properly.</p>

                <h2 className="text-2xl font-bold text-primary-900 mt-10 mb-4 border-b border-primary-100 pb-2 flex items-center gap-3">
                    <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 
                    How We Use Your Information
                </h2>
                <p className="text-dark-600 leading-relaxed mb-4">We use your information to:</p>
                <ul className="list-disc text-dark-600 space-y-2 mb-6 ml-6">
                    <li>Create and manage your account.</li>
                    <li>Provide access to our Services.</li>
                    <li>Process payments and subscriptions.</li>
                    <li>Improve our platform and user experience.</li>
                    <li>Personalize learning recommendations.</li>
                    <li>Respond to your queries and support requests.</li>
                    <li>Send important account, security, or service-related notifications.</li>
                    <li>Prevent fraud, abuse, and unauthorized access.</li>
                    <li>Comply with applicable legal obligations.</li>
                </ul>

                <h2 className="text-2xl font-bold text-primary-900 mt-10 mb-4 border-b border-primary-100 pb-2 flex items-center gap-3">
                    <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span> 
                    Sharing of Information
                </h2>
                <p className="text-dark-600 leading-relaxed mb-4">We do not sell or rent your personal information.</p>
                <p className="text-dark-600 leading-relaxed mb-4">We may share your information only with:</p>
                <ul className="list-disc text-dark-600 space-y-2 mb-6 ml-6">
                    <li>Trusted payment service providers.</li>
                    <li>Cloud hosting and technology service providers.</li>
                    <li>Analytics providers.</li>
                    <li>Government authorities or law enforcement agencies when required by law.</li>
                    <li>Service providers assisting us in operating the platform.</li>
                </ul>
                <p className="text-dark-600 leading-relaxed mb-4">All third parties are expected to protect your information and use it only for the purposes for which it is shared.</p>

                <h2 className="text-2xl font-bold text-primary-900 mt-10 mb-4 border-b border-primary-100 pb-2 flex items-center gap-3">
                    <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span> 
                    Data Security
                </h2>
                <p className="text-dark-600 leading-relaxed mb-4">We implement reasonable administrative, technical, and organizational measures to protect your personal information against unauthorized access, loss, misuse, alteration, or disclosure.</p>
                <p className="text-dark-600 leading-relaxed mb-4">However, no method of electronic storage or internet transmission is completely secure, and we cannot guarantee absolute security.</p>

                <h2 className="text-2xl font-bold text-primary-900 mt-10 mb-4 border-b border-primary-100 pb-2 flex items-center gap-3">
                    <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span> 
                    Data Retention
                </h2>
                <p className="text-dark-600 leading-relaxed mb-4">We retain your personal information only for as long as necessary to:</p>
                <ul className="list-disc text-dark-600 space-y-2 mb-6 ml-6">
                    <li>Provide our Services.</li>
                    <li>Comply with legal obligations.</li>
                    <li>Resolve disputes.</li>
                    <li>Enforce our agreements.</li>
                </ul>
                <p className="text-dark-600 leading-relaxed mb-4">When information is no longer required, it will be securely deleted or anonymized where reasonably practicable.</p>

                <h2 className="text-2xl font-bold text-primary-900 mt-10 mb-4 border-b border-primary-100 pb-2 flex items-center gap-3">
                    <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span> 
                    Your Rights
                </h2>
                <p className="text-dark-600 leading-relaxed mb-4">Subject to applicable law, you may have the right to:</p>
                <ul className="list-disc text-dark-600 space-y-2 mb-6 ml-6">
                    <li>Access your personal information.</li>
                    <li>Request correction of inaccurate information.</li>
                    <li>Request deletion of your account or personal information.</li>
                    <li>Withdraw consent where processing is based on consent.</li>
                    <li>Contact us regarding privacy concerns.</li>
                </ul>
                <p className="text-dark-600 leading-relaxed mb-4">We may retain certain information where required by law or for legitimate business purposes.</p>

                <h2 className="text-2xl font-bold text-primary-900 mt-10 mb-4 border-b border-primary-100 pb-2 flex items-center gap-3">
                    <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">7</span> 
                    Third-Party Services
                </h2>
                <p className="text-dark-600 leading-relaxed mb-4">Our Services may contain links to third-party websites or use third-party services such as payment gateways and analytics providers.</p>
                <p className="text-dark-600 leading-relaxed mb-4">We are not responsible for the privacy practices or content of third-party services. We encourage you to review their respective privacy policies.</p>

                <h2 className="text-2xl font-bold text-primary-900 mt-10 mb-4 border-b border-primary-100 pb-2 flex items-center gap-3">
                    <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">8</span> 
                    Children's Privacy
                </h2>
                <p className="text-dark-600 leading-relaxed mb-4">Our Services are not intended for children under the age of 18 without parental or guardian consent.</p>
                <p className="text-dark-600 leading-relaxed mb-4">We do not knowingly collect personal information from children. If we become aware that such information has been collected without appropriate consent, we will take reasonable steps to delete it.</p>

                <h2 className="text-2xl font-bold text-primary-900 mt-10 mb-4 border-b border-primary-100 pb-2 flex items-center gap-3">
                    <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">9</span> 
                    Changes to this Privacy Policy
                </h2>
                <p className="text-dark-600 leading-relaxed mb-4">We may update this Privacy Policy from time to time.</p>
                <p className="text-dark-600 leading-relaxed mb-4">Any changes will become effective when the updated Privacy Policy is published on our website. Continued use of the Services after any changes constitutes your acceptance of the revised Privacy Policy.</p>

                <h2 className="text-2xl font-bold text-primary-900 mt-10 mb-4 border-b border-primary-100 pb-2 flex items-center gap-3">
                    <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">10</span> 
                    Contact Us
                </h2>
                <p className="text-dark-600 leading-relaxed mb-4">If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us:</p>
                
                <div className="bg-primary-50 p-6 rounded-xl border border-primary-100 mt-6 shadow-sm">
                    <p className="font-bold text-primary-900 mb-3 text-lg">MCQPrepZone</p>
                    <div className="space-y-2">
                        <p className="text-dark-700 flex items-center gap-2">
                            <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            <span className="font-medium">Email:</span> 
                            <a href="mailto:mcqprepzone@gmail.com" className="text-accent-600 hover:text-accent-700 transition-colors">mcqprepzone@gmail.com</a>
                        </p>
                        <p className="text-dark-700 flex items-center gap-2">
                            <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                            <span className="font-medium">Website:</span> 
                            <a href="https://mcqprepzone.online" className="text-accent-600 hover:text-accent-700 transition-colors" target="_blank" rel="noopener noreferrer">https://mcqprepzone.online</a>
                        </p>
                    </div>
                </div>
                
                <p className="mt-10 text-sm text-dark-400 border-t border-dark-100 pt-6">This Privacy Policy was last updated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.</p>
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
                        <li>Location: Ahmedabad, Gujarat</li>
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
