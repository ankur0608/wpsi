import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exams & Courses',
  description: 'View all exams and courses offered by Mcqprepzone including Wireless PSI, Talati, GPSC Class 1 and Class 2.',
  alternates: {
    canonical: '/exam',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
