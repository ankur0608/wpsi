import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Topics & Syllabus',
  description: 'Explore the complete syllabus and topics for Wireless PSI, GPSC, and Talati exams. Find subject-wise breakdowns and important focus areas.',
  alternates: {
    canonical: '/topics',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
