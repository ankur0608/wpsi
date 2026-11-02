import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exams & Courses | Mcqprepzone',
  description: 'View all exams and courses offered by Mcqprepzone including CCE, WPSI, Talati, and GPSC Class 1 and Class 2.',
  alternates: {
    canonical: 'https://mcqprepzone.online/exam',
  },
  openGraph: {
    title: 'Exams & Courses | Mcqprepzone',
    description: 'View all exams and courses offered by Mcqprepzone including CCE, WPSI, Talati, and GPSC Class 1 and Class 2.',
    url: 'https://mcqprepzone.online/exam',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
