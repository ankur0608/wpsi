import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aspirant Leaderboard & Rankings | Mcqprepzone',
  description: 'View top ranks, scores, and exam performers across Gujarat. Compete with fellow aspirants, earn XP, and climb the Mcqprepzone leaderboard.',
  alternates: {
    canonical: 'https://mcqprepzone.online/leaderboard',
  },
  openGraph: {
    title: 'Aspirant Leaderboard & Rankings | Mcqprepzone',
    description: 'View top ranks, scores, and exam performers across Gujarat. Compete with fellow aspirants, earn XP, and climb the Mcqprepzone leaderboard.',
    url: 'https://mcqprepzone.online/leaderboard',
  },
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
