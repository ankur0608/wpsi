import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exam Study Notes & Revision Material | Mcqprepzone',
  description: 'Access curated study notes, topic summaries, and revision guides for Gujarat competitive exams like CCE, WPSI, GPSC, and Talati.',
  alternates: {
    canonical: 'https://mcqprepzone.online/notes',
  },
  openGraph: {
    title: 'Exam Study Notes & Revision Material | Mcqprepzone',
    description: 'Access curated study notes, topic summaries, and revision guides for Gujarat competitive exams like CCE, WPSI, GPSC, and Talati.',
    url: 'https://mcqprepzone.online/notes',
  },
};

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
