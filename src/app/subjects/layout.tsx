import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exam Subjects & Syllabus | Mcqprepzone',
  description: 'Browse subjects for Gujarat Government competitive exams including Reasoning, Maths, Gujarati, English, and General Knowledge.',
  alternates: {
    canonical: 'https://mcqprepzone.online/subjects',
  },
  openGraph: {
    title: 'Exam Subjects & Syllabus | Mcqprepzone',
    description: 'Browse subjects for Gujarat Government competitive exams including Reasoning, Maths, Gujarati, English, and General Knowledge.',
    url: 'https://mcqprepzone.online/subjects',
  },
};

export default function SubjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
