import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Full-Length Mock Tests Series | Mcqprepzone',
  description: 'Attempt full-length mock tests designed by experts. Experience the real exam interface for GPSC, CCE, and WPSI Gujarat government exams.',
  alternates: {
    canonical: 'https://mcqprepzone.online/test',
  },
  openGraph: {
    title: 'Full-Length Mock Tests Series | Mcqprepzone',
    description: 'Attempt full-length mock tests designed by experts. Experience the real exam interface for GPSC, CCE, and WPSI Gujarat government exams.',
    url: 'https://mcqprepzone.online/test',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
