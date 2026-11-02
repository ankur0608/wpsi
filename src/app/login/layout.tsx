import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login to Your Account | Mcqprepzone',
  description: 'Sign in to Mcqprepzone to access your personalized mock tests, AI study planner, test history, and saved MCQ question bank.',
  alternates: {
    canonical: 'https://mcqprepzone.online/login',
  },
  openGraph: {
    title: 'Login to Your Account | Mcqprepzone',
    description: 'Sign in to Mcqprepzone to access your personalized mock tests, AI study planner, test history, and saved MCQ question bank.',
    url: 'https://mcqprepzone.online/login',
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
