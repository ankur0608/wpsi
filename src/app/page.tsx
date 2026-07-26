import ClientEffects from '@/components/ClientEffects';
import DynamicNavbar from '@/components/DynamicNavbar';
import HeroSection from '@/components/landing/HeroSection';
import DailyChallengeSection from '@/components/landing/DailyChallengeSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ExamPatternSection from '@/components/landing/ExamPatternSection';
import SubjectPracticeSection from '@/components/landing/SubjectPracticeSection';
import TrackProgressSection from '@/components/landing/TrackProgressSection';
import RoadmapSection from '@/components/landing/RoadmapSection';
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
        <TestimonialsSection />
        <FAQSection />
        <CallToActionSection />
        <FooterSection />
        <ClientEffects />
    </div>
  );
}
