import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | Mcqprepzone',
  description: 'Reset your Mcqprepzone account password securely to regain access to your mock tests and study materials.',
  alternates: {
    canonical: 'https://mcqprepzone.online/forgot-password',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
