import type { Metadata } from 'next';
import ClientEffects from '@/components/ClientEffects';
import Link from 'next/link';
import { BookOpen, Target, Lightbulb, FileText, BarChart2, AlertTriangle, Library, Flame, Trophy, Search } from 'lucide-react';
import DynamicNavbar from '@/components/DynamicNavbar';
import FooterSection from '@/components/landing/FooterSection';

export const metadata: Metadata = {
  title: 'Platform Features & Mock Test Tools | Mcqprepzone',
  description: 'Explore Mcqprepzone features: topic-wise MCQ practice, daily challenges, AI study planner, full-length mock tests, and real-time performance analytics.',
  alternates: {
    canonical: 'https://mcqprepzone.online/features',
  },
  openGraph: {
    title: 'Platform Features & Mock Test Tools | Mcqprepzone',
    description: 'Explore Mcqprepzone features: topic-wise MCQ practice, daily challenges, AI study planner, full-length mock tests, and real-time performance analytics.',
    url: 'https://mcqprepzone.online/features',
  },
};

export default function Features() {
  return (
    <div className="relative w-full overflow-x-hidden page-transition">
        <DynamicNavbar />
        

            
    
<section className="relative bg-primary-900 pt-40 pb-28 overflow-hidden border-b border-primary-800">
    {/*  Premium Grid Background  */}
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
    
    {/*  Soft Glowing Orbs  */}
    <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/5 to-transparent"></div>
    <div className="absolute -right-40 -top-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl pointer-events-none"></div>
    <div className="absolute -left-40 top-20 w-72 h-72 bg-accent-400/15 rounded-full blur-3xl pointer-events-none"></div>
    
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 page-transition">
        
            <span className="inline-flex items-center gap-2 bg-primary-900 border border-primary-100 shadow-sm text-accent-300 rounded-full px-5 py-2 text-sm font-bold tracking-wide mb-8 hover:-translate-y-0.5 transition-transform"><svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>Platform Features</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">Features Built for <span className="text-accent-400">Exams Success</span></h1>
            <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed">Practice smarter, track your progress in real-time, and master the syllabus with Gujarat's leading exam preparation suite.</p>
        
    </div>
</section>
    
    <section className="py-24 bg-dark-50 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                
        <div className="bg-white rounded-3xl p-8 border border-dark-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-primary-200 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-50 border border-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300"><BookOpen className="w-8 h-8" strokeWidth={2} /></div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">Topic-Wise MCQ Practice</h3>
                <p className="text-dark-500 mb-8 leading-relaxed">Practice MCQs from every subject and topic of the official Competitive Exams syllabus.</p>
            </div>
            
            <div className="mt-auto relative z-10">
                <ul className="mb-6"><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Subject-wise question bank</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Topic and subtopic practice</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Unlimited attempts</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Instant answer checking</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Exam-oriented questions</li></ul>
                <div className="bg-primary-50 border border-primary-100 px-4 py-3 rounded-xl">
                    <span className="text-xs font-bold text-primary-700 uppercase tracking-widest block mb-1">Highlight</span>
                    <span className="text-dark-800 font-semibold">Master one topic at a time.</span>
                </div>
            </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-dark-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-primary-200 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-50 border border-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300"><Target className="w-8 h-8" strokeWidth={2} /></div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">Daily Practice Challenge</h3>
                <p className="text-dark-500 mb-8 leading-relaxed">Build a consistent study routine with daily MCQ practice.</p>
            </div>
            
            <div className="mt-auto relative z-10">
                <ul className="mb-6"><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>20 Daily MCQs</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Progress indicator</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Daily completion tracking</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Practice reminders</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Quick revision sessions</li></ul>
                <div className="bg-primary-50 border border-primary-100 px-4 py-3 rounded-xl">
                    <span className="text-xs font-bold text-primary-700 uppercase tracking-widest block mb-1">Highlight</span>
                    <span className="text-dark-800 font-semibold">Small daily efforts lead to big results.</span>
                </div>
            </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-dark-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-primary-200 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-50 border border-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300"><Lightbulb className="w-8 h-8" strokeWidth={2} /></div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">Instant Answers & Explanations</h3>
                <p className="text-dark-500 mb-8 leading-relaxed">Learn concepts immediately after submitting each question.</p>
            </div>
            
            <div className="mt-auto relative z-10">
                <ul className="mb-6"><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Correct answer display</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Detailed explanations</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Result status (Correct/Incorrect)</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Concept understanding</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Learn from mistakes</li></ul>
                <div className="bg-primary-50 border border-primary-100 px-4 py-3 rounded-xl">
                    <span className="text-xs font-bold text-primary-700 uppercase tracking-widest block mb-1">Highlight</span>
                    <span className="text-dark-800 font-semibold">Every wrong answer becomes a learning opportunity.</span>
                </div>
            </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-dark-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-primary-200 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-50 border border-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300"><FileText className="w-8 h-8" strokeWidth={2} /></div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">Full-Length Mock Tests</h3>
                <p className="text-dark-500 mb-8 leading-relaxed">Experience the actual Competitive Exams exam environment.</p>
            </div>
            
            <div className="mt-auto relative z-10">
                <ul className="mb-6"><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Exam pattern simulation</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Timed tests</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Mixed subject questions</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Auto result generation</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Performance breakdown</li></ul>
                <div className="bg-primary-50 border border-primary-100 px-4 py-3 rounded-xl">
                    <span className="text-xs font-bold text-primary-700 uppercase tracking-widest block mb-1">Highlight</span>
                    <span className="text-dark-800 font-semibold">Practice like the real exam.</span>
                </div>
            </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-dark-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-primary-200 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-50 border border-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300"><BarChart2 className="w-8 h-8" strokeWidth={2} /></div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">Performance Analytics</h3>
                <p className="text-dark-500 mb-8 leading-relaxed">Track your preparation and measure improvement over time.</p>
            </div>
            
            <div className="mt-auto relative z-10">
                <ul className="mb-6"><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Questions attempted</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Correct answers</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Wrong answers</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Accuracy percentage</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Subject-wise performance</li></ul>
                <div className="bg-primary-50 border border-primary-100 px-4 py-3 rounded-xl">
                    <span className="text-xs font-bold text-primary-700 uppercase tracking-widest block mb-1">Highlight</span>
                    <span className="text-dark-800 font-semibold">Know exactly where you stand.</span>
                </div>
            </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-dark-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-primary-200 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-50 border border-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300"><AlertTriangle className="w-8 h-8" strokeWidth={2} /></div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">Weak Topic Identification</h3>
                <p className="text-dark-500 mb-8 leading-relaxed">Automatically discover topics that need more practice.</p>
            </div>
            
            <div className="mt-auto relative z-10">
                <ul className="mb-6"><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Weak subject detection</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Topic-wise accuracy analysis</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Improvement recommendations</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Focused practice suggestions</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Personalized preparation</li></ul>
                <div className="bg-primary-50 border border-primary-100 px-4 py-3 rounded-xl">
                    <span className="text-xs font-bold text-primary-700 uppercase tracking-widest block mb-1">Highlight</span>
                    <span className="text-dark-800 font-semibold">Spend more time where it matters most.</span>
                </div>
            </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-dark-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-primary-200 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-50 border border-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300"><Library className="w-8 h-8" strokeWidth={2} /></div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">Previous Year Questions</h3>
                <p className="text-dark-500 mb-8 leading-relaxed">Practice questions based on actual Competitive Exams exam patterns.</p>
            </div>
            
            <div className="mt-auto relative z-10">
                <ul className="mb-6"><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Exam-oriented questions</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Difficulty-level understanding</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Pattern familiarity</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Important topics coverage</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Revision practice</li></ul>
                <div className="bg-primary-50 border border-primary-100 px-4 py-3 rounded-xl">
                    <span className="text-xs font-bold text-primary-700 uppercase tracking-widest block mb-1">Highlight</span>
                    <span className="text-dark-800 font-semibold">Prepare with real exam insights.</span>
                </div>
            </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-dark-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-primary-200 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-50 border border-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300"><Flame className="w-8 h-8" strokeWidth={2} /></div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">Streak & XP System</h3>
                <p className="text-dark-500 mb-8 leading-relaxed">Stay motivated by maintaining consistency and earning experience points.</p>
            </div>
            
            <div className="mt-auto relative z-10">
                <ul className="mb-6"><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Daily streak tracking</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Earn XP for every submitted answer</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Consistency rewards</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Practice milestones</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Motivational progress indicators</li></ul>
                <div className="bg-primary-50 border border-primary-100 px-4 py-3 rounded-xl">
                    <span className="text-xs font-bold text-primary-700 uppercase tracking-widest block mb-1">Highlight</span>
                    <span className="text-dark-800 font-semibold">Consistency beats intensity.</span>
                </div>
            </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-dark-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-primary-200 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-50 border border-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300"><Trophy className="w-8 h-8" strokeWidth={2} /></div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">Leaderboard Competition</h3>
                <p className="text-dark-500 mb-8 leading-relaxed">Compete with other aspirants and stay motivated.</p>
            </div>
            
            <div className="mt-auto relative z-10">
                <ul className="mb-6"><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Daily leaderboard</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Weekly rankings</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Monthly rankings</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>XP-based positions</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Top performers showcase</li></ul>
                <div className="bg-primary-50 border border-primary-100 px-4 py-3 rounded-xl">
                    <span className="text-xs font-bold text-primary-700 uppercase tracking-widest block mb-1">Highlight</span>
                    <span className="text-dark-800 font-semibold">Compete, improve, and stay motivated.</span>
                </div>
            </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-dark-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-primary-200 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-50 border border-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300"><Search className="w-8 h-8" strokeWidth={2} /></div>
                <h3 className="font-display text-2xl font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">Revision & Reattempt Mode</h3>
                <p className="text-dark-500 mb-8 leading-relaxed">Revisit previously attempted questions and strengthen concepts.</p>
            </div>
            
            <div className="mt-auto relative z-10">
                <ul className="mb-6"><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Retry incorrect questions</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Bookmarked questions</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Revision sessions</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Practice history</li><li className="flex items-center gap-2 text-sm text-dark-600 font-medium mb-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"></div>Mastery-based learning</li></ul>
                <div className="bg-primary-50 border border-primary-100 px-4 py-3 rounded-xl">
                    <span className="text-xs font-bold text-primary-700 uppercase tracking-widest block mb-1">Highlight</span>
                    <span className="text-dark-800 font-semibold">Revise until concepts become permanent.</span>
                </div>
            </div>
        </div>
        
            </div>
        </div>
    </section>
    
    <section className="py-16 md:py-20 bg-primary-900 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20  from-white via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">Start Your Competitive Exams Preparation Today</h2>
            <p className="text-base md:text-lg text-primary-200 mb-8 leading-relaxed">Practice topic-wise MCQs, track your progress, identify weak areas, and compete with aspirants across Gujarat.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/login" className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg">Start Practicing Free</a>
                <a href="/mock_tests" className="bg-primary-800 hover:bg-primary-700 border border-primary-600 text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all hover:-translate-y-0.5">Explore Mock Tests</a>
            </div>
        </div>
    </section>
    
    <FooterSection />
      <ClientEffects />







    

    </div>
  );
}
