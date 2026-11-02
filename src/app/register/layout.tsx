import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Your Account | Mcqprepzone',
  description: 'Sign up for Mcqprepzone to start preparing for Gujarat competitive exams with free mock tests, subject practice, and AI study planning.',
  alternates: {
    canonical: 'https://mcqprepzone.online/register',
  },
  openGraph: {
    title: 'Create Your Account | Mcqprepzone',
    description: 'Sign up for Mcqprepzone to start preparing for Gujarat competitive exams with free mock tests, subject practice, and AI study planning.',
    url: 'https://mcqprepzone.online/register',
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
