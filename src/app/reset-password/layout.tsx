import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password | Mcqprepzone',
  description: 'Enter your new password to complete resetting your Mcqprepzone account.',
  alternates: {
    canonical: 'https://mcqprepzone.online/reset-password',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
