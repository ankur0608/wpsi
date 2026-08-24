import Image from 'next/image';
import Link from 'next/link';

export default function FooterSection() {
  return (
    <>
    <footer className="bg-dark-900 text-dark-300 py-16 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
                <div className="sm:col-span-2 lg:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <Image src="/logo.jpeg" alt="MCQ Prep Zone Logo" width={48} height={48} className="rounded-xl object-cover shadow-sm bg-white p-0.5" />
                        <h2 className="font-display font-bold text-2xl text-white tracking-tight whitespace-nowrap">MCQ Prep Zone</h2>
                    </div>
                    <p className="text-sm text-dark-400 mb-6 max-w-sm leading-relaxed">Practice Topic-wise MCQs, Mock Tests, Previous Year Questions, and Track Your Progress for the Gujarat Competitive Exams Examination.</p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-accent-400 transition-colors">Home</a></li>
                        <li><a href="/about" className="hover:text-accent-400 transition-colors">About Us</a></li>
                        <li><a href="/pricing" className="hover:text-accent-400 transition-colors">Pricing</a></li>
                        <li><a href="/features" className="hover:text-accent-400 transition-colors">Features</a></li>
                        <li><a href="/blog" className="hover:text-accent-400 transition-colors">Blogs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Explore</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/testimonials" className="hover:text-accent-400 transition-colors">Testimonials</a></li>
                        <li><a href="/faq" className="hover:text-accent-400 transition-colors">FAQ</a></li>
                        <li><a href="/contact" className="hover:text-accent-400 transition-colors">Contact Us</a></li>
                        <li><a href="/support" className="hover:text-accent-400 transition-colors">Support Center</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/privacy" className="hover:text-accent-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-accent-400 transition-colors">Terms of Service</a></li>
                        <li><a href="/cancellation" className="hover:text-accent-400 transition-colors">Cancellation & Refunds</a></li>
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
    </>
  );
}