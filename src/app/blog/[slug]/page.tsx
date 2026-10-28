import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import DynamicNavbar from '@/components/DynamicNavbar';
import { blogPosts, BlogPost } from '@/data/blogs';
import ClientEffects from '@/components/ClientEffects';
import FooterSection from '@/components/landing/FooterSection';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.slug === resolvedParams.slug);
  
  if (!post) return { title: 'Post Not Found' };
  
  const postUrl = `https://mcqprepzone.online/blog/${post.slug}`;
  const metaTitle = post.metaTitle || `${post.title} | MCQ Prep Zone`;
  const cleanContent = post.content.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
  const metaDesc = post.metaDescription || (cleanContent.substring(0, 155) + '...');
  const postDate = !isNaN(new Date(post.date).getTime()) ? new Date(post.date).toISOString() : new Date().toISOString();
  const ogImageUrl = post.imageUrl.startsWith('http') ? post.imageUrl : `https://mcqprepzone.online${post.imageUrl}`;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: postUrl,
      type: 'article',
      publishedTime: postDate,
      images: [ogImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: [ogImageUrl],
    }
  };
}

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-50">
        <div className="text-center">
            <h1 className="text-2xl font-bold text-dark-900 mb-4">Blog Post Not Found</h1>
            <Link href="/blog" className="text-primary-600 hover:underline font-semibold">Return to All Blogs</Link>
        </div>
      </div>
    );
  }

  const postDateIso = !isNaN(new Date(post.date).getTime()) 
    ? new Date(post.date).toISOString() 
    : new Date().toISOString();

  const ogImageUrl = post.imageUrl.startsWith('http') ? post.imageUrl : `https://mcqprepzone.online${post.imageUrl}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mcqprepzone.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://mcqprepzone.online/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://mcqprepzone.online/blog/${post.slug}`
      }
    ]
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mcqprepzone.online/blog/${post.slug}`
    },
    "headline": post.title,
    "image": ogImageUrl,
    "datePublished": postDateIso,
    "dateModified": postDateIso,
    "author": {
      "@type": "Organization",
      "name": "MCQ Prep Zone",
      "url": "https://mcqprepzone.online/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MCQ Prep Zone",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mcqprepzone.online/logo.jpeg"
      }
    },
    "description": post.metaDescription || post.content.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim().substring(0, 155) + '...'
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Find related articles (same category or others, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  
  if (relatedPosts.length < 3) {
    const additional = blogPosts
      .filter(p => p.slug !== post.slug && !relatedPosts.some(r => r.slug === p.slug))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...additional);
  }

  return (
    <div className="relative w-full overflow-x-hidden page-transition">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        <DynamicNavbar />
        
        {/* Standardized Hero Section */}
        <section className="relative bg-primary-900 pt-32 pb-24 overflow-hidden border-b border-primary-800">
            {/* Breadcrumbs */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 pb-6">
                <nav className="flex text-sm text-primary-300 font-medium justify-center md:justify-start" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                <Link href="/blog" className="hover:text-white transition-colors ml-1 md:ml-2">Blog</Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                <span className="text-white ml-1 md:ml-2 line-clamp-1 max-w-[200px] sm:max-w-xs">{post.title}</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Glowing Orbs & Tech Patterns */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            <div className="absolute -right-40 -top-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -left-40 top-20 w-72 h-72 bg-accent-400/15 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 page-transition">
                <span className="inline-flex items-center gap-2 bg-primary-800/80 border border-primary-600/50 shadow-sm text-accent-300 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide mb-6">
                    <svg className="w-3.5 h-3.5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    {post.category}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight max-w-3xl mx-auto">{post.title}</h1>
                <div className="flex items-center justify-center gap-6 text-sm text-primary-200 font-semibold">
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {post.date}
                    </span>
                    <span className="w-1.5 h-1.5 bg-accent-400 rounded-full"></span>
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {post.readTime}
                    </span>
                </div>
            </div>
        </section>

        {/* Main Content Area */}
        <article className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Back to blogs link */}
                <div className="mb-8 flex items-center justify-between">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors group text-sm">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to All Strategy Articles
                    </Link>
                    <div className="flex items-center gap-2 text-xs font-semibold text-dark-500">
                      <span>Subject:</span>
                      <span className="px-2.5 py-1 rounded-md bg-dark-100 text-dark-700 font-bold">{post.category}</span>
                    </div>
                </div>

                {/* Featured Banner Image */}
                <div className="relative h-64 sm:h-80 md:h-[420px] w-full rounded-3xl overflow-hidden border border-dark-200 shadow-xl mb-12 bg-dark-900">
                    <Image
                      fill
                      priority
                      src={post.imageUrl}
                      alt={post.title}
                      sizes="(max-width: 768px) 100vw, 900px"
                      className="w-full h-full object-cover"
                    />
                </div>

                {/* Article Body */}
                <div 
                  className="prose prose-lg max-w-none text-dark-800 leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />

                {/* FAQ Section */}
                {post.faqs && post.faqs.length > 0 && (
                  <div className="mt-16 pt-12 border-t border-dark-100">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark-900 mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {post.faqs.map((faq, index) => (
                        <div key={index} className="bg-dark-50 rounded-2xl p-6 border border-dark-100 hover:border-primary-200 transition-colors">
                          <h3 className="text-lg font-bold text-dark-900 mb-2">{faq.question}</h3>
                          <p className="text-dark-600 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Platform Resources & Practice Hub */}
                <div className="mt-16 p-8 rounded-3xl bg-dark-50 border border-dark-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      🎯
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark-900 m-0">MCQ Prep Zone Study Hub &amp; Quick Links</h3>
                      <p className="text-xs text-dark-500 m-0">Practice syllabus questions, mock exams, and download study notes</p>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <Link href="/practice" className="p-4 rounded-2xl bg-white border border-dark-200 hover:border-primary-400 hover:shadow-md transition-all group">
                      <span className="text-primary-600 font-bold text-xs uppercase tracking-wider block mb-1">Practice →</span>
                      <h4 className="text-dark-900 font-bold text-sm mb-1 group-hover:text-primary-600 transition-colors">Topic-Wise MCQs</h4>
                      <p className="text-dark-500 text-xs">Unit-wise practice with detailed explanations.</p>
                    </Link>

                    <Link href="/test" className="p-4 rounded-2xl bg-white border border-dark-200 hover:border-primary-400 hover:shadow-md transition-all group">
                      <span className="text-primary-600 font-bold text-xs uppercase tracking-wider block mb-1">Mock Tests →</span>
                      <h4 className="text-dark-900 font-bold text-sm mb-1 group-hover:text-primary-600 transition-colors">Full-Length Mocks</h4>
                      <p className="text-dark-500 text-xs">Simulated test papers with negative marking.</p>
                    </Link>

                    <Link href="/government-exams" className="p-4 rounded-2xl bg-white border border-dark-200 hover:border-primary-400 hover:shadow-md transition-all group">
                      <span className="text-primary-600 font-bold text-xs uppercase tracking-wider block mb-1">Exams Hub →</span>
                      <h4 className="text-dark-900 font-bold text-sm mb-1 group-hover:text-primary-600 transition-colors">Govt Exams Guides</h4>
                      <p className="text-dark-500 text-xs">Gujarat WPSI, GPSC AE, and CCE notifications.</p>
                    </Link>

                    <Link href="/notes" className="p-4 rounded-2xl bg-white border border-dark-200 hover:border-primary-400 hover:shadow-md transition-all group">
                      <span className="text-primary-600 font-bold text-xs uppercase tracking-wider block mb-1">Formulas →</span>
                      <h4 className="text-dark-900 font-bold text-sm mb-1 group-hover:text-primary-600 transition-colors">Study Notes &amp; PDFs</h4>
                      <p className="text-dark-500 text-xs">Concise formula sheets for rapid revision.</p>
                    </Link>

                    <Link href="/daily-challenge" className="p-4 rounded-2xl bg-white border border-dark-200 hover:border-primary-400 hover:shadow-md transition-all group">
                      <span className="text-primary-600 font-bold text-xs uppercase tracking-wider block mb-1">Daily Drill →</span>
                      <h4 className="text-dark-900 font-bold text-sm mb-1 group-hover:text-primary-600 transition-colors">Daily MCQ Challenge</h4>
                      <p className="text-dark-500 text-xs">Compete daily, earn points, and build streaks.</p>
                    </Link>

                    <Link href="/pricing" className="p-4 rounded-2xl bg-white border border-dark-200 hover:border-primary-400 hover:shadow-md transition-all group">
                      <span className="text-primary-600 font-bold text-xs uppercase tracking-wider block mb-1">Membership →</span>
                      <h4 className="text-dark-900 font-bold text-sm mb-1 group-hover:text-primary-600 transition-colors">Test Series Plans</h4>
                      <p className="text-dark-500 text-xs">Unlock all sectional tests &amp; ranking analytics.</p>
                    </Link>
                  </div>
                </div>

                {/* Related Articles Section */}
                <div className="mt-16 pt-12 border-t border-dark-100">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark-900">Related Strategy &amp; Syllabus Articles</h2>
                      <p className="text-xs sm:text-sm text-dark-500 mt-1">Strengthen your exam preparation across adjacent subjects</p>
                    </div>
                    <Link href="/blog" className="text-primary-600 hover:text-primary-800 font-bold text-sm inline-flex items-center gap-1">
                      <span>All Posts</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((related) => (
                      <article key={related.slug} className="bg-white rounded-2xl overflow-hidden border border-dark-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col">
                        <Link href={`/blog/${related.slug}`} className="relative h-44 overflow-hidden block bg-dark-900">
                          <Image
                            fill
                            src={related.imageUrl}
                            alt={related.title}
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-dark-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-accent-400 uppercase tracking-wider border border-white/10">
                            {related.category}
                          </div>
                        </Link>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="text-[11px] text-dark-500 mb-2 font-medium">
                            {related.date} • {related.readTime}
                          </div>
                          <h3 className="font-display font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 text-base leading-snug">
                            <Link href={`/blog/${related.slug}`}>{related.title}</Link>
                          </h3>
                          <div className="mt-auto pt-3 border-t border-dark-100">
                            <Link href={`/blog/${related.slug}`} className="inline-flex items-center gap-1 text-primary-600 text-xs font-bold hover:text-primary-800">
                              <span>Read Guide</span>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Share and Bottom CTA */}
                <div className="mt-16 pt-8 border-t border-dark-100 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-dark-500 uppercase tracking-wide">Share this article:</span>
                        <div className="flex gap-2">
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://mcqprepzone.online/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="w-9 h-9 bg-dark-50 hover:bg-primary-50 hover:text-primary-600 rounded-xl flex items-center justify-center text-dark-600 transition-colors border border-dark-200">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://mcqprepzone.online/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="w-9 h-9 bg-dark-50 hover:bg-primary-50 hover:text-primary-600 rounded-xl flex items-center justify-center text-dark-600 transition-colors border border-dark-200">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <Link href="/blog" className="bg-dark-50 hover:bg-dark-100 text-dark-700 px-5 py-2.5 rounded-xl font-bold text-sm border border-dark-200 inline-block transition-colors">
                            Explore All Strategy Articles
                        </Link>
                    </div>
                </div>

            </div>
        </article>

        {/* Newsletter CTA */}
        <section className="py-24 bg-primary-900 text-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-white via-transparent to-transparent"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Never Miss an Exam Update</h2>
                <p className="text-xl text-primary-200 mb-12 leading-relaxed">Join 50,000+ aspirants receiving our weekly Gujarat Police &amp; GPSC strategy emails.</p>
                <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <input type="email" placeholder="Enter your email" className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:ring-4 focus:ring-accent-500/50 transition-all" />
                    </div>
                    <button type="button" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl shrink-0">Subscribe</button>
                </form>
            </div>
        </section>

        {/* Common Footer */}
        <FooterSection />

    <ClientEffects />
    </div>
  );
}
