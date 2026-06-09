import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & Plans',
  description: 'Affordable pricing plans for GPSC, Wireless PSI, and Talati exam preparation. Unlock premium mock tests, AI study planner, and expert notes.',
  alternates: {
    canonical: '/pricing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
