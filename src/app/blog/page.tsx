import FooterSection from '@/components/landing/FooterSection';
import { Metadata } from 'next';
import ClientEffects from '@/components/ClientEffects';
import Link from 'next/link';
import Image from 'next/image';
import DynamicNavbar from '@/components/DynamicNavbar';
import { blogPosts } from '@/data/blogs';

export const metadata: Metadata = {
  title: 'Blogs & Strategies | MCQ Prep Zone',
  description: 'Master your preparation with expert strategies, technical deep-dives, and success stories from toppers.',
  openGraph: {
    title: 'Blogs & Strategies | MCQ Prep Zone',
    description: 'Master your preparation with expert strategies, technical deep-dives, and success stories from toppers.',
    type: 'website',
  }
};

export default function Blogs() {
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
      }
    ]
  };
  return (
    <div className="relative w-full overflow-x-hidden page-transition">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <DynamicNavbar />
        

    
    
            

    <section className="relative bg-primary-900 pt-32 pb-28 overflow-hidden border-b border-primary-800">
    {/* Breadcrumbs */}
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 pb-8">
        <nav className="flex text-sm text-primary-300 font-medium justify-center" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                        Home
                    </Link>
                </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                        <span className="text-white ml-1 md:ml-2">Blog</span>
                    </div>
                </li>
            </ol>
        </nav>
    </div>

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
                
{blogPosts.map((post) => (
        <article key={post.slug} className="bg-white rounded-3xl overflow-hidden border border-dark-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
            <Link href={`/blog/${post.slug}`} className="relative h-64 overflow-hidden block">
                <Image fill src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary-700 uppercase tracking-widest shadow-sm">
                    {post.category}
                </div>
            </Link>
            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-dark-500 mb-4 font-medium">
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>{post.date}</span>
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>{post.readTime}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-4 group-hover:text-primary-700 transition-colors leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
                </h3>
                <p className="text-dark-600 mb-8 leading-relaxed line-clamp-3">{post.content.replace(/<[^>]*>?/gm, '').substring(0, 160)}...</p>
                
                <div className="mt-auto pt-6 border-t border-dark-100">
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors group/link">
                        Read Article 
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </Link>
                </div>
            </div>
        </article>
        ))}
        
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
                <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-xl bg-white text-dark-900 focus:outline-none focus:ring-4 focus:ring-accent-500/50" />
                <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl">Subscribe</button>
            </form>
        </div>
    </section>
    
    {/*  Common Footer  */}
    <FooterSection />
      <ClientEffects />

    

    </div>
  );
}
