import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Topics & Syllabus Breakdown | Mcqprepzone',
  description: 'Explore the complete syllabus and topics for CCE, WPSI, and GPSC exams. Find subject-wise breakdowns and key focus areas for high scores.',
  alternates: {
    canonical: 'https://mcqprepzone.online/topics',
  },
  openGraph: {
    title: 'Topics & Syllabus Breakdown | Mcqprepzone',
    description: 'Explore the complete syllabus and topics for CCE, WPSI, and GPSC exams. Find subject-wise breakdowns and key focus areas for high scores.',
    url: 'https://mcqprepzone.online/topics',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
