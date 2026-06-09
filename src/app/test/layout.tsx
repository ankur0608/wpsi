import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mock Tests',
  description: 'Attempt full-length mock tests designed by experts. Experience the real exam interface for GPSC, Talati, and Wireless PSI exams.',
  alternates: {
    canonical: '/test',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
