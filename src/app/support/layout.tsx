import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help & Support Desk | Mcqprepzone',
  description: 'Need help with mock tests, payments, or your account? Reach out to the Mcqprepzone support team for prompt assistance.',
  alternates: {
    canonical: 'https://mcqprepzone.online/support',
  },
  openGraph: {
    title: 'Help & Support Desk | Mcqprepzone',
    description: 'Need help with mock tests, payments, or your account? Reach out to the Mcqprepzone support team for prompt assistance.',
    url: 'https://mcqprepzone.online/support',
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
