"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import ClientEffects from '@/components/ClientEffects';
import DynamicNavbar from '@/components/DynamicNavbar';
import FooterSection from '@/components/landing/FooterSection';
import { 
  governmentExamsData, 
  examStreamsList, 
  examQualificationsList, 
  examStatusesList, 
  examLevelsList, 
  GovernmentExam 
} from '@/data/governmentExams';
import { 
  Search, 
  Filter, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  X, 
  IndianRupee, 
  Users, 
  Layers, 
  MapPin, 
  RotateCcw, 
  HelpCircle, 
  Check,
  ChevronRight,
  ShieldCheck,
  BellRing,
  RefreshCw,
  Radio
} from 'lucide-react';

export default function GovernmentExamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState('ALL');
  const [selectedQualification, setSelectedQualification] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [ojasOnlyFilter, setOjasOnlyFilter] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'vacancies' | 'title'>('default');

  // Live state exams & client cache
  const [ojasExams, setOjasExams] = useState<GovernmentExam[]>([]);
  const [isLoadingOjas, setIsLoadingOjas] = useState(false);
  const [ojasLastSync, setOjasLastSync] = useState<string | null>(null);

  const CACHE_KEY = 'wpsi_state_exams_cache_v1';
  const CACHE_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes client cache

  const fetchOjasLiveExams = async (forceRefresh = false) => {
    setIsLoadingOjas(true);
    try {
      // 1. If not forcing refresh, check client cache first for instant load
      if (!forceRefresh && typeof window !== 'undefined') {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          try {
            const cached = JSON.parse(cachedRaw);
            if (cached && Array.isArray(cached.exams) && Date.now() - cached.timestamp < CACHE_EXPIRY_MS) {
              setOjasExams(cached.exams);
              setOjasLastSync(cached.syncTime || 'Cached');
              setIsLoadingOjas(false);
              return;
            }
          } catch {
            // ignore cache parse issues
          }
        }
      }

      // 2. Fetch from API route (supports server-side memory caching + ?refresh=true)
      const res = await fetch(forceRefresh ? '/api/exams/ojas?refresh=true' : '/api/exams/ojas');
      if (res.ok) {
        const data = await res.json();
        if (data?.exams && Array.isArray(data.exams)) {
          const syncTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setOjasExams(data.exams);
          setOjasLastSync(syncTime);

          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                  timestamp: Date.now(),
                  exams: data.exams,
                  syncTime
                })
              );
            } catch {
              // ignore quota
            }
          }
        }
      }
    } catch (err) {
      console.error('Error fetching live state exams:', err);
    } finally {
      setIsLoadingOjas(false);
    }
  };

  useEffect(() => {
    fetchOjasLiveExams();
  }, []);

  // Combined exams: deduplicate by id
  const combinedExams = useMemo(() => {
    if (!ojasExams.length) return governmentExamsData;
    const ojasIds = new Set(ojasExams.map((e) => e.id));
    const nonOjas = governmentExamsData.filter((e) => !ojasIds.has(e.id));
    return [...ojasExams, ...nonOjas];
  }, [ojasExams]);

  // Filtered & Sorted exams
  const filteredExams = useMemo(() => {
    let result = combinedExams.filter((exam) => {
      // OJAS Only filter
      if (ojasOnlyFilter && !exam.isOjasVerified && exam.level !== 'Gujarat State') {
        return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          exam.title.toLowerCase().includes(q) ||
          exam.shortName.toLowerCase().includes(q) ||
          exam.conductingBody.toLowerCase().includes(q) ||
          exam.stream.toLowerCase().includes(q) ||
          exam.qualification.toLowerCase().includes(q) ||
          exam.description.toLowerCase().includes(q) ||
          exam.keySubjects.some((subj) => subj.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Stream filter
      if (selectedStream !== 'ALL' && exam.stream !== selectedStream) {
        return false;
      }

      // Qualification filter
      if (selectedQualification !== 'ALL' && exam.qualification !== selectedQualification) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'ALL' && exam.status !== selectedStatus) {
        return false;
      }

      // Level / Region filter
      if (selectedLevel !== 'ALL' && exam.level !== selectedLevel) {
        return false;
      }

      return true;
    });

    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [combinedExams, ojasOnlyFilter, searchQuery, selectedStream, selectedQualification, selectedStatus, selectedLevel, sortBy]);

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedStream !== 'ALL' || 
    selectedQualification !== 'ALL' || 
    selectedStatus !== 'ALL' || 
    selectedLevel !== 'ALL' ||
    ojasOnlyFilter;

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedStream('ALL');
    setSelectedQualification('ALL');
    setSelectedStatus('ALL');
    setSelectedLevel('ALL');
    setOjasOnlyFilter(false);
    setSortBy('default');
  };

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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-dark-100 text-dark-700 border border-dark-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#F8FAFC] selection:bg-primary-200 selection:text-primary-900">
      <DynamicNavbar />

      {/* ─── HERO SECTION (Clean, Solid & Professional) ─── */}
      <section className="relative bg-white pt-28 sm:pt-32 pb-8 sm:pb-10 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Calendar / Portal Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200/90 text-primary-700 rounded-full px-3.5 py-1 text-xs font-bold mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-primary-600"></span>
              <span>Government Job Portal & Exam Calendar 2026</span>
            </div>

            {/* Main Headline (Clean solid color, NO gradients) */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-slate-900">
              Explore All Government Exams & Notifications
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed mb-5 font-medium">
              Real-time recruitment notifications, eligibility criteria, exam dates, syllabus, and vacancies across Central & Gujarat State Government departments.
            </p>

            {/* Clean Solid Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto mb-5 text-center">
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                <div className="text-lg sm:text-xl font-black text-slate-900 font-display tracking-tight">50,000+</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Active Vacancies</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                <div className="text-lg sm:text-xl font-black text-primary-600 font-display tracking-tight">18+</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Top Govt Exams</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                <div className="text-lg sm:text-xl font-black text-slate-900 font-display tracking-tight">8 Streams</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Civil, SSC, Police...</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                <div className="text-lg sm:text-xl font-black text-emerald-600 font-display tracking-tight">100% Free</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Syllabus & Practice</div>
              </div>
            </div>

            {/* Quick Search Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const element = document.getElementById('exams-listing');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative flex items-center bg-white rounded-xl shadow-xs p-1.5 pl-3.5 border border-slate-300 focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500 transition-all">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search exam (e.g. SSC CGL, Gujarat Police PSI, UPSC, GPSC)..."
                  className="w-full py-1.5 sm:py-2 px-1 text-slate-900 placeholder-slate-400 focus:outline-none text-xs sm:text-sm font-medium bg-transparent"
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 mr-1.5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 active:scale-95 text-white font-bold px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm transition-all shadow-xs shrink-0"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Popular Searches Quick Tags */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2.5 text-[11px] text-slate-500 flex-wrap">
              <span className="font-semibold text-slate-600">Popular:</span>
              {['SSC CGL', 'Gujarat Police PSI', 'GPSC Class 1 & 2', 'UPSC CSE'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-2.5 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FILTERS & SEARCH CONTROLS ─── */}
      <section id="exams-listing" className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Live OJAS Sync Status Bar (Clean Solid) */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2.5 p-2 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-slate-900">Gujarat State Live Sync</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline text-slate-600 text-[11px]">
                {ojasExams.length > 0 ? `${ojasExams.length} active notifications synced` : 'Syncing official portal...'}
              </span>
              {ojasLastSync && (
                <span className="text-[10px] text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md font-semibold">
                  Refreshed {ojasLastSync}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fetchOjasLiveExams(true)}
                disabled={isLoadingOjas}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-800 font-bold text-[11px] hover:bg-slate-100 transition-colors shadow-2xs"
                title="Refresh live exam data from State Portal"
              >
                <RefreshCw className={`w-3 h-3 text-slate-600 ${isLoadingOjas ? 'animate-spin' : ''}`} />
                <span>{isLoadingOjas ? 'Syncing...' : 'Sync Live'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto flex-1">
              {/* Stream Filter */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Stream
                </label>
                <select
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer shadow-2xs"
                >
                  {examStreamsList.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Qualification Filter */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Qualification
                </label>
                <select
                  value={selectedQualification}
                  onChange={(e) => setSelectedQualification(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer shadow-2xs"
                >
                  {examQualificationsList.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer shadow-2xs"
                >
                  {examStatusesList.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region / Level */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Region / Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer shadow-2xs"
                >
                  {examLevelsList.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Counter & Clear Actions */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end shrink-0 pt-1 lg:pt-4">
              <div className="text-xs font-semibold text-slate-600">
                Showing <span className="font-bold text-primary-600">{filteredExams.length}</span> exams
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Quick Stream Chips on Mobile / Desktop */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pt-3 pb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Quick:
            </span>

            {/* OJAS Live Chip */}
            <button
              type="button"
              onClick={() => setOjasOnlyFilter(!ojasOnlyFilter)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border ${
                ojasOnlyFilter
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${ojasOnlyFilter ? 'text-white' : 'text-amber-500'}`} />
              <span>Gujarat State Live ({ojasExams.length})</span>
              {ojasOnlyFilter && <X className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            {examStreamsList.map((stream) => {
              const isSelected = selectedStream === stream.value;
              return (
                <button
                  key={stream.value}
                  onClick={() => setSelectedStream(stream.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all border ${
                    isSelected
                      ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {stream.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── EXAMS LISTING GRID ─── */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredExams.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 max-w-xl mx-auto my-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">No matching government exams found</h3>
            <p className="text-sm text-slate-500 mb-6">
              We couldn't find any exams matching your search or filters. Try adjusting your qualification, status, or keyword.
            </p>
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-xs"
            >
              <RotateCcw className="w-4 h-4" /> Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => {
              return (
                <div
                  key={exam.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-primary-400 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                >
                  {/* Top Bar with Level & Status */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {exam.level}
                        </span>
                        {exam.isOjasVerified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                            <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                            State Live
                          </span>
                        )}
                      </div>
                      {getStatusBadge(exam.status)}
                    </div>

                    {/* Conducting Body */}
                    <p className="text-[11px] font-bold text-primary-600 uppercase tracking-wider mb-1 line-clamp-1">
                      {exam.conductingBody}
                    </p>

                    {/* Exam Title */}
                    <Link href={`/government-exams/${exam.id}`}>
                      <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors mb-2 leading-snug">
                        {exam.title}
                      </h3>
                    </Link>

                    {/* Short Description */}
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                      {exam.description}
                    </p>

                    {/* Metrics Highlights */}
                    <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vacancies</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                          <Users className="w-3.5 h-3.5 text-primary-500" />
                          {exam.vacancies}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Qualification</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5 truncate" title={exam.qualification}>
                          <GraduationCap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{exam.qualification}</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Age Limit</span>
                        <span className="font-semibold text-slate-700 mt-0.5 block truncate">
                          {exam.ageLimit}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Exam Date</span>
                        <span className="font-semibold text-slate-700 mt-0.5 block truncate flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {exam.examDate}
                        </span>
                      </div>
                    </div>

                    {/* Stream Tag */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary-50 text-primary-700 border border-primary-100">
                        {exam.stream}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500">
                        Pay: {exam.salaryPayScale.split('(')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      href={`/government-exams/${exam.id}`}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>Full Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    {exam.isOjasVerified ? (
                      <a
                        href={exam.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Apply Online</span>
                      </a>
                    ) : (
                      <Link
                        href={exam.prepLink || "/exam"}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Practice MCQs</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─── TIPS & FAQ SECTION ─── */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700 border border-primary-200 mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Aspirant Guide</span>
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              Government Exams FAQ & Preparation Advice
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              Everything you need to know about eligibility, application deadlines, and exam preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70">
              <h3 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                How often are exam dates updated?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                We continuously monitor official notification bulletins from UPSC, SSC, GPSC, Gujarat State Boards, RRB, and IBPS to ensure notifications and deadlines are up to date.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70">
              <h3 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Can final-year students apply for Graduate exams?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Most central exams (like UPSC CSE, SSC CGL, and IBPS PO) allow final-year students to appear for Preliminary tests, provided their degree is acquired before the stipulated cutoff date.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70">
              <h3 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                How to prepare topic-wise MCQs for Gujarat State exams?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                MCQPrepZone offers dedicated topic-wise question banks for Gujarat Police PSI/ASI, Constable, GSSSB CCE, and GPSC with Gujarati & English language coverage and instant solutions.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70">
              <h3 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Are mock tests and PYQs free on this platform?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Yes! You can explore free topic-wise MCQs, daily practice challenges, and mock tests to assess your preparation before taking the actual exam.
              </p>
            </div>
          </div>

          {/* CTA Banner (Solid Color, NO gradients) */}
          <div className="mt-12 bg-primary-900 rounded-3xl p-8 text-white text-center relative overflow-hidden shadow-sm">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="font-display text-2xl font-bold mb-3 text-white">
                Ready to crack your dream Government Exam?
              </h3>
              <p className="text-sm text-primary-100 mb-6 leading-relaxed font-medium">
                Start practicing with topic-wise questions, real examination patterns, and detailed explanations today.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/register"
                  className="px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-dark-900 font-bold text-sm transition-all shadow-xs"
                >
                  Create Free Account
                </Link>
                <Link
                  href="/exam"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/20"
                >
                  Browse Practice Exams
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
      <ClientEffects />
    </div>
  );
}
