import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gujarat Government Exams - Syllabus, Eligibility & Mock Tests | Mcqprepzone',
  description: 'Explore notifications, syllabus, eligibility, and mock tests for Gujarat Government exams including CCE, WPSI, GPSC Class 1/2, Talati, and Police Bharti.',
  alternates: {
    canonical: 'https://mcqprepzone.online/government-exams',
  },
  openGraph: {
    title: 'Gujarat Government Exams - Syllabus, Eligibility & Mock Tests | Mcqprepzone',
    description: 'Explore notifications, syllabus, eligibility, and mock tests for Gujarat Government exams including CCE, WPSI, GPSC Class 1/2, Talati, and Police Bharti.',
    url: 'https://mcqprepzone.online/government-exams',
  },
};

export default function GovernmentExamsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
