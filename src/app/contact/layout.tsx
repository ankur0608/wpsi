import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Mcqprepzone',
  description: 'Get in touch with the Mcqprepzone team for support, queries, or business inquiries regarding our exam preparation platform.',
  alternates: {
    canonical: 'https://mcqprepzone.online/contact',
  },
  openGraph: {
    title: 'Contact Us | Mcqprepzone',
    description: 'Get in touch with the Mcqprepzone team for support, queries, or business inquiries regarding our exam preparation platform.',
    url: 'https://mcqprepzone.online/contact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
