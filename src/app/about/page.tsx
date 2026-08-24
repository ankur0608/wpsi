import FooterSection from '@/components/landing/FooterSection';
import Link from 'next/link';
import DynamicNavbar from '@/components/DynamicNavbar';

export default function About() {
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
        
            <span className="inline-flex items-center gap-2 bg-primary-900 border border-primary-100 shadow-sm text-accent-300 rounded-full px-5 py-2 text-sm font-bold tracking-wide mb-8 hover:-translate-y-0.5 transition-transform"><svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>About Us</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">Building India's <span className="text-accent-400">Future Bureaucrats</span></h1>
            <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed">We are on a mission to democratize access to quality exam preparation through technology, gamification, and expert mentorship.</p>
        
    </div>
</section>

    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute -right-40 top-40 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark-900 mb-8">Our <span className="text-primary-600">Story</span></h2>
                    <div className="space-y-6 text-dark-600 leading-relaxed text-lg">
                        <p>MCQ Prep Zone was founded by a dedicated team of former exam toppers and ed-tech experts who strongly believe that top-tier exam preparation should be universally accessible, rather than a privilege for the few.</p>
                        <p>What started as a small, passionate initiative sharing daily learning resources has evolved into a highly trusted preparation platform, serving a rapidly growing community of dedicated aspirants across Gujarat and beyond.</p>
                        <p>Our platform seamlessly combines cutting-edge AI technology with proven pedagogical methods to create a learning experience that is not only highly effective but genuinely engaging. We believe that when learning is intuitive and enjoyable, outstanding success naturally follows.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-6">
                        <div className="bg-primary-50 rounded-2xl p-6 text-center border border-primary-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-4xl font-display font-bold text-primary-700 mb-2">2023</div>
                            <div className="text-sm font-bold text-dark-500 uppercase tracking-widest">Founded</div>
                        </div>
                        <div className="bg-accent-50 rounded-2xl p-6 text-center border border-accent-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-4xl font-display font-bold text-accent-600 mb-2">Growing</div>
                            <div className="text-sm font-bold text-dark-500 uppercase tracking-widest">Community</div>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-8">
                    {/*  Mission  */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-dark-100 hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-dark-900 mb-4">Our Mission</h3>
                        <p className="text-dark-600 leading-relaxed text-lg">To make quality competitive exam preparation accessible, affordable, and incredibly engaging for every aspiring candidate, completely redefining how students learn and succeed.</p>
                    </div>
                    
                    {/*  Vision  */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-dark-100 hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600 mb-6">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-dark-900 mb-4">Our Vision</h3>
                        <p className="text-dark-600 leading-relaxed text-lg">To become the nation's most trusted and loved exam preparation platform, empowering countless aspirants to confidently achieve their dream government jobs.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <FooterSection />

    </div>
  );
}
