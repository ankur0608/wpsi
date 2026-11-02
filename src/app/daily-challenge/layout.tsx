import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily MCQ Challenge & Streaks | Mcqprepzone',
  description: 'Take today\'s MCQ challenge, build your daily study streak, and earn XP while preparing for Gujarat competitive exams like CCE and WPSI.',
  alternates: {
    canonical: 'https://mcqprepzone.online/daily-challenge',
  },
  openGraph: {
    title: 'Daily MCQ Challenge & Streaks | Mcqprepzone',
    description: 'Take today\'s MCQ challenge, build your daily study streak, and earn XP while preparing for Gujarat competitive exams like CCE and WPSI.',
    url: 'https://mcqprepzone.online/daily-challenge',
  },
};

export default function DailyChallengeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
