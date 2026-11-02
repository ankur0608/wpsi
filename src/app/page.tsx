import type { Metadata } from 'next';
import ClientEffects from '@/components/ClientEffects';

export const metadata: Metadata = {
  title: 'Competitive Exams Mock Test & Exam Prep | Mcqprepzone',
  description: 'Prepare for Gujarat Government exams like CCE, WPSI, and GPSC with Mcqprepzone. Access premium mock tests, previous papers, and MCQ practice.',
  alternates: {
    canonical: 'https://mcqprepzone.online',
  },
  openGraph: {
    title: 'Competitive Exams Mock Test & Exam Prep | Mcqprepzone',
    description: 'Prepare for Gujarat Government exams like CCE, WPSI, and GPSC with Mcqprepzone. Access premium mock tests, previous papers, and MCQ practice.',
    url: 'https://mcqprepzone.online',
  },
};
import DynamicNavbar from '@/components/DynamicNavbar';
import HeroSection from '@/components/landing/HeroSection';
import DailyChallengeSection from '@/components/landing/DailyChallengeSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ExamPatternSection from '@/components/landing/ExamPatternSection';
import SubjectPracticeSection from '@/components/landing/SubjectPracticeSection';
import TrackProgressSection from '@/components/landing/TrackProgressSection';
import RoadmapSection from '@/components/landing/RoadmapSection';
import BlogSection from '@/components/landing/BlogSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FAQSection from '@/components/landing/FAQSection';
import CallToActionSection from '@/components/landing/CallToActionSection';
import FooterSection from '@/components/landing/FooterSection';

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden page-transition">
        <DynamicNavbar />
        <HeroSection />
        <DailyChallengeSection />
        <FeaturesSection />
        <ExamPatternSection />
        <SubjectPracticeSection />
        <TrackProgressSection />
        <RoadmapSection />
        <BlogSection />
        <TestimonialsSection />
        <FAQSection />
        <CallToActionSection />
        <FooterSection />
        <ClientEffects />
    </div>
  );
}
