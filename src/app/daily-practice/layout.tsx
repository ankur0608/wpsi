import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily MCQ Practice Questions | Mcqprepzone',
  description: 'Sharpen your preparation every day with curated Gujarat government exam MCQs, detailed explanations, and progress tracking on Mcqprepzone.',
  alternates: {
    canonical: 'https://mcqprepzone.online/daily-practice',
  },
  openGraph: {
    title: 'Daily MCQ Practice Questions | Mcqprepzone',
    description: 'Sharpen your preparation every day with curated Gujarat government exam MCQs, detailed explanations, and progress tracking on Mcqprepzone.',
    url: 'https://mcqprepzone.online/daily-practice',
  },
};

export default function DailyPracticeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
