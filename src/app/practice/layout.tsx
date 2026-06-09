import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice MCQs',
  description: 'Practice free MCQs for Wireless PSI, GPSC, and Talati exams. Create custom test sessions, get AI analytics, and track your progress.',
  alternates: {
    canonical: '/practice',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
