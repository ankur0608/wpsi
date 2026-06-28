"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DynamicNavbar from '@/components/DynamicNavbar';

export default function Blogs() {
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
        
            <span className="inline-flex items-center gap-2 bg-primary-900 border border-primary-100 shadow-sm text-accent-300 rounded-full px-5 py-2 text-sm font-bold tracking-wide mb-8 hover:-translate-y-0.5 transition-transform"><svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>Latest Insights</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">Latest <span className="text-accent-400">Insights</span></h1>
            <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed">Master your preparation with expert strategies, technical deep-dives, and success stories from toppers.</p>
        
    </div>
</section>
    
    <section className="py-24 bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                
        <article className="bg-white rounded-3xl overflow-hidden border border-dark-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
            <a href="/blog/syllabus-90-days" className="relative h-64 overflow-hidden block">
                <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="How to Master the Wireless PSI Syllabus in 90 Days" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary-700 uppercase tracking-widest shadow-sm">
                    Exam Strategy
                </div>
            </a>
            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-dark-500 mb-4 font-medium">
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>Oct 15, 2025</span>
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>5 min read</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-4 group-hover:text-primary-700 transition-colors leading-tight">
                    <a href="/blog/syllabus-90-days" className="hover:underline">How to Master the Wireless PSI Syllabus in 90 Days</a>
                </h3>
                <p className="text-dark-600 mb-8 leading-relaxed line-clamp-3">A complete, week-by-week study plan to cover both Technical and Non-Technical subjects effectively.</p>
                
                <div className="mt-auto pt-6 border-t border-dark-100">
                    <a href="/blog/syllabus-90-days" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors group/link">
                        Read Article 
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            </div>
        </article>
        
        <article className="bg-white rounded-3xl overflow-hidden border border-dark-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
            <a href="/blog/computer-networks" className="relative h-64 overflow-hidden block">
                <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Top 50 Most Repeated Questions in Computer Networks" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary-700 uppercase tracking-widest shadow-sm">
                    Technical Paper
                </div>
            </a>
            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-dark-500 mb-4 font-medium">
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>Oct 12, 2025</span>
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>8 min read</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-4 group-hover:text-primary-700 transition-colors leading-tight">
                    <a href="/blog/computer-networks" className="hover:underline">Top 50 Most Repeated Questions in Computer Networks</a>
                </h3>
                <p className="text-dark-600 mb-8 leading-relaxed line-clamp-3">Analyze the past 5 years of papers to understand the core networking concepts you must absolutely know.</p>
                
                <div className="mt-auto pt-6 border-t border-dark-100">
                    <a href="/blog/computer-networks" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors group/link">
                        Read Article 
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            </div>
        </article>
        
        <article className="bg-white rounded-3xl overflow-hidden border border-dark-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
            <a href="/blog/rahuls-strategy" className="relative h-64 overflow-hidden block">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="From 45 Marks to Rank #12: Rahul's Strategy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary-700 uppercase tracking-widest shadow-sm">
                    Success Story
                </div>
            </a>
            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-dark-500 mb-4 font-medium">
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>Oct 08, 2025</span>
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>4 min read</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-4 group-hover:text-primary-700 transition-colors leading-tight">
                    <a href="/blog/rahuls-strategy" className="hover:underline">From 45 Marks to Rank #12: Rahul's Strategy</a>
                </h3>
                <p className="text-dark-600 mb-8 leading-relaxed line-clamp-3">How consistent mock test analysis and targeting weak topics helped Rahul clear the cutoff.</p>
                
                <div className="mt-auto pt-6 border-t border-dark-100">
                    <a href="/blog/rahuls-strategy" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors group/link">
                        Read Article 
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            </div>
        </article>
        
        <article className="bg-white rounded-3xl overflow-hidden border border-dark-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
            <a href="/blog/current-affairs-september-2025" className="relative h-64 overflow-hidden block">
                <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Current Affairs Roundup: September 2025" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary-700 uppercase tracking-widest shadow-sm">
                    General Knowledge
                </div>
            </a>
            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-dark-500 mb-4 font-medium">
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>Oct 01, 2025</span>
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>12 min read</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-4 group-hover:text-primary-700 transition-colors leading-tight">
                    <a href="/blog/current-affairs-september-2025" className="hover:underline">Current Affairs Roundup: September 2025</a>
                </h3>
                <p className="text-dark-600 mb-8 leading-relaxed line-clamp-3">The definitive list of national and international events you need to memorize for Part A of the exam.</p>
                
                <div className="mt-auto pt-6 border-t border-dark-100">
                    <a href="/blog/current-affairs-september-2025" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors group/link">
                        Read Article 
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            </div>
        </article>
        
        <article className="bg-white rounded-3xl overflow-hidden border border-dark-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
            <a href="/blog/microprocessors-vs-microcontrollers" className="relative h-64 overflow-hidden block">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Understanding Microprocessors vs Microcontrollers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary-700 uppercase tracking-widest shadow-sm">
                    Electronics
                </div>
            </a>
            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-dark-500 mb-4 font-medium">
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>Sep 28, 2025</span>
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>6 min read</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-4 group-hover:text-primary-700 transition-colors leading-tight">
                    <a href="/blog/microprocessors-vs-microcontrollers" className="hover:underline">Understanding Microprocessors vs Microcontrollers</a>
                </h3>
                <p className="text-dark-600 mb-8 leading-relaxed line-clamp-3">A deep dive into the architecture differences that are heavily tested in the Technical Paper.</p>
                
                <div className="mt-auto pt-6 border-t border-dark-100">
                    <a href="/blog/microprocessors-vs-microcontrollers" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors group/link">
                        Read Article 
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            </div>
        </article>
        
        <article className="bg-white rounded-3xl overflow-hidden border border-dark-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
            <a href="/blog/exam-anxiety" className="relative h-64 overflow-hidden block">
                <img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Dealing with Exam Anxiety During Mock Tests" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary-700 uppercase tracking-widest shadow-sm">
                    Mental Prep
                </div>
            </a>
            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-dark-500 mb-4 font-medium">
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>Sep 20, 2025</span>
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>3 min read</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-4 group-hover:text-primary-700 transition-colors leading-tight">
                    <a href="/blog/exam-anxiety" className="hover:underline">Dealing with Exam Anxiety During Mock Tests</a>
                </h3>
                <p className="text-dark-600 mb-8 leading-relaxed line-clamp-3">Learn psychological techniques to stay calm and avoid silly mistakes when the timer is ticking.</p>
                
                <div className="mt-auto pt-6 border-t border-dark-100">
                    <a href="/blog/exam-anxiety" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors group/link">
                        Read Article 
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            </div>
        </article>
        
            </div>
            
            <div className="mt-16 text-center">
                <button className="bg-white border border-dark-200 text-dark-700 hover:text-primary-700 hover:border-primary-300 px-8 py-4 rounded-xl font-bold transition-all hover:shadow-md">Load More Articles</button>
            </div>
        </div>
    </section>
    
    <section className="py-24 bg-primary-900 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20  from-white via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Never Miss an Update</h2>
            <p className="text-xl text-primary-200 mb-12 leading-relaxed">Join 50,000+ aspirants receiving our weekly strategy emails.</p>
            <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-xl text-dark-900 focus:outline-none focus:ring-4 focus:ring-accent-500/50" />
                <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl">Subscribe</button>
            </form>
        </div>
    </section>
    
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

    

    </div>
  );
}
