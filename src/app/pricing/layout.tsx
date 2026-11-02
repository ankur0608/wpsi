import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & Plans | Mcqprepzone',
  description: 'Affordable pricing plans for GPSC, CCE, and WPSI exam preparation. Unlock premium mock tests, AI study planner, and comprehensive MCQ practice.',
  alternates: {
    canonical: 'https://mcqprepzone.online/pricing',
  },
  openGraph: {
    title: 'Pricing & Plans | Mcqprepzone',
    description: 'Affordable pricing plans for GPSC, CCE, and WPSI exam preparation. Unlock premium mock tests, AI study planner, and comprehensive MCQ practice.',
    url: 'https://mcqprepzone.online/pricing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
