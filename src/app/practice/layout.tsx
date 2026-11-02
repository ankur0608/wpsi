import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice MCQs - Subject & Topic Wise Questions | Mcqprepzone',
  description: 'Practice free MCQs for CCE, WPSI, GPSC, and Talati exams. Create custom test sessions, get AI analytics, and track your progress.',
  alternates: {
    canonical: 'https://mcqprepzone.online/practice',
  },
  openGraph: {
    title: 'Practice MCQs - Subject & Topic Wise Questions | Mcqprepzone',
    description: 'Practice free MCQs for CCE, WPSI, GPSC, and Talati exams. Create custom test sessions, get AI analytics, and track your progress.',
    url: 'https://mcqprepzone.online/practice',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
