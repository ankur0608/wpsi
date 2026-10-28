import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blogs';

export default function BlogSection() {
  // Select top 3 high-impact featured blog posts
  const featuredSlugs = ['computer-networks', 'rahuls-strategy', 'microprocessors-vs-microcontrollers'];
  const featuredPosts = featuredSlugs
    .map(slug => blogPosts.find(p => p.slug === slug))
    .filter(Boolean);

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-100 mb-4">
              <svg className="w-3.5 h-3.5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Topper Strategies &amp; Syllabus Notes
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 tracking-tight leading-tight">
              Master the Exam with <span className="text-primary-600">Expert Deep Dives</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-dark-600 leading-relaxed">
              From repeated technical questions to time management formulas, prepare smarter with in-depth analysis tailored for Gujarat Police WPSI and GPSC aspirants.
            </p>
          </div>
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-primary-50 text-primary-700 hover:bg-primary-100 transition-all border border-primary-200 hover:-translate-y-0.5 group"
            >
              <span>View All 40+ Guides</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => {
            if (!post) return null;
            return (
              <article
                key={post.slug}
                className="bg-white rounded-3xl overflow-hidden border border-dark-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="relative h-56 overflow-hidden block bg-dark-900">
                  <Image
                    fill
                    src={post.imageUrl}
                    alt={post.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-dark-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-accent-400 uppercase tracking-wider border border-white/10 shadow-sm">
                    {post.category}
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-dark-500 mb-3 font-medium">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors leading-snug line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-dark-600 text-sm mb-6 leading-relaxed line-clamp-3">
                    {post.content.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim().substring(0, 140)}...
                  </p>

                  <div className="mt-auto pt-4 border-t border-dark-100 flex items-center justify-between">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-primary-600 font-bold text-sm group-hover:text-primary-700 transition-colors"
                    >
                      <span>Read Full Guide</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Quick Website Navigation Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-dark-50 border border-dark-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              ⚡
            </div>
            <div>
              <h4 className="font-display font-bold text-base sm:text-lg text-dark-900">Direct Syllabus Prep &amp; Practice</h4>
              <p className="text-xs sm:text-sm text-dark-600">Jump directly into our question bank calibrated to past 10 years papers.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5 w-full md:w-auto justify-start md:justify-end">
            <Link href="/practice" className="px-4 py-2 bg-white rounded-xl text-xs font-bold text-dark-800 border border-dark-200 hover:border-primary-500 hover:text-primary-600 transition-colors shadow-sm">
              Practice Questions
            </Link>
            <Link href="/test" className="px-4 py-2 bg-white rounded-xl text-xs font-bold text-dark-800 border border-dark-200 hover:border-primary-500 hover:text-primary-600 transition-colors shadow-sm">
              Timed Mock Tests
            </Link>
            <Link href="/government-exams" className="px-4 py-2 bg-white rounded-xl text-xs font-bold text-dark-800 border border-dark-200 hover:border-primary-500 hover:text-primary-600 transition-colors shadow-sm">
              Govt Exams
            </Link>
            <Link href="/notes" className="px-4 py-2 bg-white rounded-xl text-xs font-bold text-dark-800 border border-dark-200 hover:border-primary-500 hover:text-primary-600 transition-colors shadow-sm">
              Study Notes
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
