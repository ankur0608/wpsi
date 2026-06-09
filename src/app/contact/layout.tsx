import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Mcqprepzone team for support, queries, or business inquiries regarding our exam preparation platform.',
  alternates: {
    canonical: '/contact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
