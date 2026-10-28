import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import DynamicNavbar from '@/components/DynamicNavbar';
import FooterSection from '@/components/landing/FooterSection';
import ClientEffects from '@/components/ClientEffects';
import { 
  getGovernmentExamById, 
  getAllGovernmentExams, 
  GovernmentExam 
} from '@/data/governmentExams';
import { 
  ArrowLeft, 
  Calendar, 
  GraduationCap, 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  BellRing, 
  BookOpen, 
  Sparkles, 
  Users, 
  MapPin, 
  Check, 
  ShieldCheck, 
  ChevronRight, 
  IndianRupee,
  HelpCircle,
  Clock,
  Layers,
  FileText
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const allExams = getAllGovernmentExams();
  return allExams.map((exam) => ({
    id: exam.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const exam = getGovernmentExamById(id);

  if (!exam) {
    return { title: 'Exam Not Found | MCQ Prep Zone' };
  }

  return {
    title: `${exam.title} - Notification, Eligibility & Syllabus | MCQ Prep Zone`,
    description: `${exam.description} Check vacancies (${exam.vacancies}), exam date (${exam.examDate}), syllabus, and qualification criteria.`,
    openGraph: {
      title: `${exam.title} - Notification & Syllabus`,
      description: exam.description,
    }
  };
}

export default async function ExamDetailsPage({ params }: Props) {
  const { id } = await params;
  const exam = getGovernmentExamById(id);

  if (!exam) {
    notFound();
  }

  // Get related exams from the same stream or level
  const relatedExams = getAllGovernmentExams()
    .filter((e) => e.id !== exam.id && (e.stream === exam.stream || e.level === exam.level))
    .slice(0, 3);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Applications Open':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Applications Open
          </span>
        );
      case 'Upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Upcoming
          </span>
        );
      case 'Notification Released':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <BellRing className="w-3.5 h-3.5 text-blue-600" />
            Notification Released
          </span>
        );
      case 'Exam Scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Calendar className="w-3.5 h-3.5 text-purple-600" />
            Exam Scheduled
          </span>
        );
      case 'Admit Card Out':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            Admit Card Out
          </span>
        );
      case 'Result Declared':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            Result Declared
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#F8FAFC] selection:bg-primary-200 selection:text-primary-900">
      <DynamicNavbar />

      {/* ─── BREADCRUMBS & TOP NAV ─── */}
      <section className="bg-white border-b border-slate-200 pt-24 sm:pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <Link href="/government-exams" className="hover:text-primary-600 transition-colors">Government Exams</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-900 truncate max-w-xs sm:max-w-md">{exam.shortName || exam.title}</span>
            </nav>

            <Link
              href="/government-exams"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Exams</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── EXAM HEADER HERO ─── */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {exam.level}
                </span>

                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-primary-50 text-primary-700 border border-primary-200">
                  {exam.stream}
                </span>

                {exam.isOjasVerified && (
                  <span className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    State Govt Verified
                  </span>
                )}

                {getStatusBadge(exam.status)}
              </div>

              {/* Conducting Department */}
              <p className="text-xs sm:text-sm font-bold text-primary-600 uppercase tracking-wider mb-1.5">
                {exam.conductingBody}
              </p>

              {/* Main Headline */}
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                {exam.title}
              </h1>

              {/* Subtitle / Short Description */}
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {exam.description}
              </p>
            </div>

            {/* Quick Actions Header Box */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              {exam.isOjasVerified ? (
                <a
                  href={exam.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition-all shadow-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Apply on Official Portal</span>
                </a>
              ) : (
                <a
                  href={exam.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Official Application Portal</span>
                </a>
              )}

              <Link
                href={exam.prepLink || "/exam"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm transition-all shadow-xs"
              >
                <BookOpen className="w-4 h-4" />
                <span>Practice Topic-wise MCQs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT BODY ─── */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* ── LEFT COLUMN (Details & Syllabus) ── */}
            <div className="lg:col-span-8 space-y-8">

              {/* Official State Live Sync Callout Banner */}
              {exam.isOjasVerified && (
                <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Official Gujarat State Verification
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                        This recruitment notification is actively verified and synced from the Government of Gujarat Recruitment Board and official state portals.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Educational Qualification & Eligibility */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-primary-600" />
                  <h2 className="font-display font-bold text-lg text-slate-900">
                    Educational Qualification & Eligibility Criteria
                  </h2>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Minimum Qualification
                  </span>
                  <div className="text-base font-bold text-slate-900">
                    {exam.qualification}
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {exam.qualificationDetails || "Candidates must possess the requisite degree or certificate from a recognized university or board before the closing date of application."}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block font-semibold">Age Requirement:</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">{exam.ageLimit}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block font-semibold">Application Fee:</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">{exam.applicationFee}</span>
                  </div>
                </div>
              </div>

              {/* Selection Process & Exam Stages */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-5 h-5 text-primary-600" />
                  <h2 className="font-display font-bold text-lg text-slate-900">
                    Selection Process & Stages
                  </h2>
                </div>

                <div className="space-y-3">
                  {exam.selectionStages.map((stage, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70"
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        {stage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Subjects & Syllabus */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-primary-600" />
                  <h2 className="font-display font-bold text-lg text-slate-900">
                    Key Subjects & Syllabus Overview
                  </h2>
                </div>

                <p className="text-xs text-slate-500 mb-4 font-medium">
                  Core topics evaluated in the examination. Click any subject to practice topic-wise MCQs.
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {exam.keySubjects.map((subject, idx) => (
                    <Link
                      key={idx}
                      href={exam.prepLink || "/exam"}
                      className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 text-slate-800 hover:text-primary-700 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
                    >
                      <span>{subject}</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Preparation Advice & FAQ */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-primary-600" />
                  <h2 className="font-display font-bold text-lg text-slate-900">
                    Exam Preparation Guidance
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      How should I structure my daily practice?
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Begin by reviewing standard syllabus topics, practicing 30-50 topic-wise MCQs daily, and taking full-length timed mock tests at least twice a week.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      Are previous year question papers available on MCQ Prep Zone?
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Yes! You can solve real past questions and mock tests with instant answer keys, detailed explanations, and percentile analytics.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN (Sidebar Highlights & Actions) ── */}
            <div className="lg:col-span-4 space-y-6">

              {/* Important Highlights Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs sticky top-20">
                <h3 className="font-display font-bold text-base text-slate-900 mb-4 pb-3 border-b border-slate-100">
                  Key Examination Details
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      Total Vacancies
                    </span>
                    <span className="font-bold text-slate-900 text-right">{exam.vacancies}</span>
                  </div>

                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <IndianRupee className="w-4 h-4 text-slate-400" />
                      Salary / Pay Scale
                    </span>
                    <span className="font-bold text-slate-900 text-right">{exam.salaryPayScale}</span>
                  </div>

                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      Exam Date
                    </span>
                    <span className="font-bold text-primary-600 text-right">{exam.examDate}</span>
                  </div>

                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      Application Start
                    </span>
                    <span className="font-bold text-slate-900 text-right">{exam.applicationStart}</span>
                  </div>

                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      Application Deadline
                    </span>
                    <span className="font-bold text-rose-600 text-right">{exam.applicationEnd}</span>
                  </div>

                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      Qualification
                    </span>
                    <span className="font-bold text-slate-900 text-right truncate max-w-[150px]">{exam.qualification}</span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      Conducting Body
                    </span>
                    <span className="font-bold text-slate-900 text-right truncate max-w-[150px]">{exam.conductingBody}</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
                  <a
                    href={exam.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      exam.isOjasVerified
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                    }`}
                  >
                    <span>Apply on Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href={exam.prepLink || "/exam"}
                    className="w-full py-2.5 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Practice Free MCQs</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>

          {/* ── RELATED EXAMS CAROUSEL / ROW ── */}
          {relatedExams.length > 0 && (
            <div className="mt-14 pt-10 border-t border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-900">
                    Related Government Exams
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Other active examinations under {exam.stream} or {exam.level}
                  </p>
                </div>

                <Link
                  href="/government-exams"
                  className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedExams.map((rel) => (
                  <div
                    key={rel.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-primary-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {rel.level}
                        </span>
                        {getStatusBadge(rel.status)}
                      </div>

                      <p className="text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-1 line-clamp-1">
                        {rel.conductingBody}
                      </p>

                      <h4 className="font-display font-bold text-base text-slate-900 mb-2 line-clamp-2">
                        {rel.title}
                      </h4>

                      <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                        {rel.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-slate-700">
                        {rel.vacancies}
                      </span>

                      <Link
                        href={`/government-exams/${rel.id}`}
                        className="text-xs font-bold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                      >
                        <span>Full Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      <FooterSection />
      <ClientEffects />
    </div>
  );
}
