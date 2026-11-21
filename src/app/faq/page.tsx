import { Metadata } from 'next';
import DynamicNavbar from '@/components/DynamicNavbar';
import FooterSection from '@/components/landing/FooterSection';
import FAQClient from './FAQClient';
import { faqData } from '@/data/faqData';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Mcqprepzone',
  description: 'Find clear answers to common questions about Mcqprepzone mock tests, Gujarat Government exams (GPSC, WPSI, CCE), bilingual questions, pricing plans, and study notes.',
  alternates: {
    canonical: 'https://mcqprepzone.online/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) | Mcqprepzone',
    description: 'Find clear answers to common questions about Mcqprepzone mock tests, Gujarat Government exams (GPSC, WPSI, CCE), bilingual questions, pricing plans, and study notes.',
    url: 'https://mcqprepzone.online/faq',
  },
};

export default function FAQPage() {
  const allEnglishFaqs = faqData.en.categories.flatMap(cat => cat.faqs);

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
        "name": "FAQ",
        "item": "https://mcqprepzone.online/faq"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allEnglishFaqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#F8FAFC] text-slate-800 page-transition">
      {/* JSON-LD Schemas for SEO & Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <DynamicNavbar />

      <FAQClient />

      <FooterSection />
    </div>
  );
}
