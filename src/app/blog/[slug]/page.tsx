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
  
  const metaTitle = post.metaTitle || `${post.title} | MCQ Prep Zone`;
  const metaDesc = post.metaDescription || post.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...';

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      type: 'article',
      publishedTime: post.date, // Note: You may want to parse this to ISO 8601 if it's not already
      images: [post.imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: [post.imageUrl],
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
            <Link href="/blog" className="text-primary-600 hover:underline">Return to Blogs</Link>
        </div>
      </div>
    );
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.mcqprepzone.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.mcqprepzone.online/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://www.mcqprepzone.online/blog/${post.slug}`
      }
    ]
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.mcqprepzone.online/blog/${post.slug}`
    },
    "headline": post.title,
    "image": post.imageUrl,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "MCQ Prep Zone"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MCQ Prep Zone",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.mcqprepzone.online/logo.jpeg"
      }
    },
    "description": post.metaDescription || post.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...'
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
        
        {/*  Standardized Hero Section  */}
        <section className="relative bg-primary-900 pt-32 pb-28 overflow-hidden border-b border-primary-800">
            {/* Breadcrumbs */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 pb-8">
                <nav className="flex text-sm text-primary-300 font-medium justify-center md:justify-start" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
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

            {/*  Premium Grid Background  */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fillRule=\\'evenodd\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'0.02\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            
            {/*  Soft Glowing Orbs  */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/5 to-transparent"></div>
            <div className="absolute -right-40 -top-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -left-40 top-20 w-72 h-72 bg-accent-400/15 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 page-transition">
                <span className="inline-flex items-center gap-2 bg-primary-900 border border-primary-100 shadow-sm text-accent-300 rounded-full px-5 py-2 text-sm font-bold tracking-wide mb-8 hover:-translate-y-0.5 transition-transform">
                    <svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    {post.category}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight max-w-3xl mx-auto">{post.title}</h1>
                <div className="flex items-center justify-center gap-6 text-sm text-primary-200 font-semibold">
                    <span className="flex items-center gap-2">
                        <svg className="w-4.5 h-4.5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {post.date}
                    </span>
                    <span className="w-1.5 h-1.5 bg-accent-400 rounded-full"></span>
                    <span className="flex items-center gap-2">
                        <svg className="w-4.5 h-4.5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {post.readTime}
                    </span>
                </div>
            </div>
        </section>

        {/*  Main Content Area  */}
        <article className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/*  Back to blogs link  */}
                <div className="mb-12">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors group">
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to Articles
                    </Link>
                </div>

                {/*  Featured Image  */}
                <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden border border-dark-200 shadow-lg mb-12">
                    <Image fill src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                </div>

                {/*  Article Body  */}
                <div 
                  className="prose max-w-none text-dark-800 leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />

                {/* FAQ Section */}
                {post.faqs && post.faqs.length > 0 && (
                  <div className="mt-16 pt-12 border-t border-dark-100">
                    <h2 className="font-display text-3xl font-bold text-dark-900 mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                      {post.faqs.map((faq, index) => (
                        <div key={index} className="bg-dark-50 rounded-2xl p-6 border border-dark-100 hover:border-primary-200 transition-colors">
                          <h3 className="text-xl font-bold text-dark-900 mb-3">{faq.question}</h3>
                          <p className="text-dark-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/*  Bottom Divider & Call to Action  */}
                <div className="mt-16 pt-8 border-t border-dark-100 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-dark-500 uppercase tracking-wide">Share this article:</span>
                        <div className="flex gap-2">
                            <a href="#" className="w-9 h-9 bg-dark-50 hover:bg-primary-50 hover:text-primary-600 rounded-xl flex items-center justify-center text-dark-600 transition-colors border border-dark-200">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="#" className="w-9 h-9 bg-dark-50 hover:bg-primary-50 hover:text-primary-600 rounded-xl flex items-center justify-center text-dark-600 transition-colors border border-dark-200">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <Link href="/blog" className="bg-dark-50 hover:bg-dark-100 text-dark-700 px-5 py-2.5 rounded-xl font-bold text-sm border border-dark-200 inline-block transition-colors">
                            View All Strategy Posts
                        </Link>
                    </div>
                </div>

            </div>
        </article>

        {/*  Newsletter CTA  */}
        <section className="py-24 bg-primary-900 text-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-white via-transparent to-transparent"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Never Miss an Update</h2>
                <p className="text-xl text-primary-200 mb-12 leading-relaxed">Join 50,000+ aspirants receiving our weekly strategy emails.</p>
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

        {/*  Common Footer  */}
        <FooterSection />

    <ClientEffects />
    </div>
  );
}
