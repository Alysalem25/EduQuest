import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Search,
  Sparkles,
  Loader2,
  Users,
  RotateCcw,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import {
  subjects,
  educationLevels,
  curricula,
  type SubjectCategory,
  type EducationLevel,
  type Curriculum,
} from "@/data/catalog";
import TutorCard from "@/components/TutorCard";
import apiClient from "@/lib/api";

/* ─── Types ─── */
interface Tutor {
  _id: string;
  name: string;
  email: string;
  title: string;
  avatar: string;
  country: string;
  countryFlag: string;
  verified: boolean;
  experienceYears: number;
  subjects: string[];
  curricula: string[];
  educationLevels: string[];
  languages: string[];
  rating: number;
  reviews: number;
  pricePerHour: number;
  available: boolean;
  matchPercent: number;
  students: number;
  hoursTaught: number;
  bio: string;
}

const steps = [
  { id: 0, label: "Subject", hint: "What do you want to learn?" },
  { id: 1, label: "Education Level", hint: "Where are you studying?" },
  { id: 2, label: "Curriculum", hint: "Which curriculum do you follow?" },
];

export default function FindTutor() {
  const [activeStep, setActiveStep] = useState(0);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [subjectQuery, setSubjectQuery] = useState("");
  const [selectedSubject, setSelectedSubject] =
    useState<SubjectCategory | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | null>(
    null,
  );
  const [selectedCurriculum, setSelectedCurriculum] =
    useState<Curriculum | null>(null);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const load = async () => {
    try {
      const res = await apiClient.get("/tutors");
      const list = res.data?.tutors ?? [];
      setTutors(Array.isArray(list) ? list : []);
    } catch {
      setTutors([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (hasSearched && !searching) {
      const results = document.getElementById("results-panel");
      results?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [hasSearched, searching]);

  const filteredSubjects = useMemo(() => {
    const q = subjectQuery.trim().toLowerCase();
    if (!q) return subjects;
    return subjects.filter((s) => s.name.toLowerCase().includes(q));
  }, [subjectQuery]);

  const matchedTutors = useMemo(() => {
    if (!selectedSubject) return [];
    return tutors.filter((t) => {
      const matchesSubject = t.subjects.some(
        (s) => s.toLowerCase() === selectedSubject.name.toLowerCase(),
      );
      const matchesCurriculum = selectedCurriculum
        ? t.curricula.includes(selectedCurriculum.id)
        : true;
      const matchesLevel = selectedLevel
        ? t.educationLevels.includes(selectedLevel.id)
        : true;
      return matchesSubject && matchesCurriculum && matchesLevel;
    });
  }, [tutors, selectedSubject, selectedCurriculum, selectedLevel]);

  const canAdvance = (step: number) => {
    if (step === 0) return selectedSubject !== null;
    if (step === 1) return selectedLevel !== null;
    if (step === 2) return selectedCurriculum !== null;
    return false;
  };

  const allComplete = selectedSubject && selectedLevel && selectedCurriculum;

  const goNext = () => {
    if (canAdvance(activeStep) && activeStep < steps.length - 1) {
      setActiveStep((s) => s + 1);
    }
  };
  const goBack = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1);
  };

  const handleSearch = () => {
    if (!allComplete) return;
    setSearching(true);
    setHasSearched(false);
    window.setTimeout(() => {
      setSearching(false);
      setHasSearched(true);
      const results = document.getElementById("results");
      results?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1600);
  };

  const resetSearch = () => {
    setActiveStep(0);
    setSubjectQuery("");
    setSelectedSubject(null);
    setSelectedLevel(null);
    setSelectedCurriculum(null);
    setHasSearched(false);
    setSearching(false);
  };

  return (
    <div className="bg-eqraa-beige-light pt-20 sm:pt-24 lg:pt-28">
      {/* Page header */}
      <section className="relative overflow-hidden py-8 sm:py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-eqraa-brown/8 blur-3xl" />
          <div className="absolute right-[-10%] top-0 h-80 w-96 rounded-full bg-eqraa-beige/40 blur-3xl" />
        </div>
        <div className="container-px relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-eqraa-brown/10 px-4 py-2 mb-4 sm:mb-6">
            <Sparkles size={14} className="text-eqraa-brown" />
            <span className="text-xs sm:text-sm font-semibold text-eqraa-brown">Find Your Perfect Match</span>
          </div>
          <h1 className="mx-auto text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-eqraa-brown-dark">
            Find Your Ideal <span className="bg-gradient-to-r from-eqraa-brown to-eqraa-brown-dark bg-clip-text text-transparent">Tutor</span>
          </h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-eqraa-brown-dark/65 leading-relaxed">
            Answer three quick questions and discover verified tutors who match your learning style perfectly
          </p>
        </div>
      </section>

      {/* Stepper */}
      <section className="pb-6 sm:pb-8">
        <div className="container-px">
          <div className="mx-auto max-w-4xl px-1 sm:px-0">
            <ol className="flex items-center">
              {steps.map((step, i) => {
                const isComplete = i < activeStep;
                const isActive = i === activeStep;
                return (
                  <li
                    key={step.id}
                    className="flex flex-1 items-center last:flex-none"
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 text-[10px] sm:text-xs font-bold transition-all duration-300 ${isComplete
                          ? "gradient-brown border-transparent text-white shadow-soft"
                          : isActive
                            ? "border-eqraa-brown bg-white text-eqraa-brown shadow-soft"
                            : "border-eqraa-beige-dark bg-white text-eqraa-brown-dark/40"
                          }`}
                      >
                        {isComplete ? <Check size={12} /> : i + 1}
                      </div>
                      <span
                        className={`hidden xs:inline text-[10px] font-semibold sm:text-xs ${isActive || isComplete
                          ? "text-eqraa-brown-dark"
                          : "text-eqraa-brown-dark/40"
                          }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="mx-1 mb-3 h-0.5 flex-1 rounded-full bg-eqraa-beige-dark sm:mx-2 sm:mb-4">
                        <div
                          className="h-full rounded-full gradient-brown transition-all duration-500"
                          style={{ width: isComplete ? "100%" : "0%" }}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Step content */}
      <section className="pb-12 sm:pb-16">
        <div className="container-px">
          <div className="mx-auto max-w-4xl rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-md p-4 sm:p-6 lg:p-8 shadow-xl border border-white/50">
            <div className="mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-brown text-xs sm:text-sm font-bold text-white shadow-lg">
                {activeStep + 1}
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-eqraa-brown-dark">
                  {steps[activeStep].label}
                </h2>
                <p className="text-[11px] sm:text-xs text-eqraa-brown-dark/60">
                  {steps[activeStep].hint}
                </p>
              </div>
            </div>

            {/* Step 1: Subject */}
            {activeStep === 0 && (
              <div className="animate-fade-in">
                <div className="relative mb-4 sm:mb-6">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-eqraa-brown-dark/40"
                  />
                  <input
                    type="text"
                    value={subjectQuery}
                    onChange={(e) => setSubjectQuery(e.target.value)}
                    placeholder="Search subjects…"
                    className="w-full rounded-xl border-2 border-eqraa-beige/60 bg-eqraa-beige-light/50 py-2.5 pl-9 pr-3 text-sm text-eqraa-brown-dark placeholder:text-eqraa-brown-dark/40 focus:border-eqraa-brown focus:outline-none focus:ring-4 focus:ring-eqraa-brown/20 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {filteredSubjects.map((subject) => {
                    const selected = selectedSubject?.id === subject.id;
                    return (
                      <button
                        key={subject.id}
                        type="button"
                        onClick={() => setSelectedSubject(subject)}
                        className={`group flex flex-col items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border-2 p-2.5 sm:p-4 text-center transition-all duration-300 ${selected
                          ? "border-eqraa-brown bg-eqraa-beige/50 shadow-md"
                          : "border-eqraa-beige/50 bg-white hover:border-eqraa-brown/40 hover:bg-eqraa-beige/20 hover:shadow-md hover:-translate-y-0.5"
                          }`}
                      >
                        <div
                          className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl transition-all ${selected
                            ? "gradient-brown text-white shadow-lg"
                            : "bg-eqraa-beige/60 text-eqraa-brown group-hover:gradient-brown group-hover:text-white"
                            }`}
                        >
                          <subject.icon size={16} className="sm:size-[20px]" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-eqraa-brown-dark leading-tight">
                          {subject.name}
                        </span>
                        {selected && (
                          <span className="text-[10px] sm:text-xs font-bold text-eqraa-brown">
                            <Check size={12} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                  {filteredSubjects.length === 0 && (
                    <p className="col-span-full py-8 text-center text-sm text-eqraa-brown-dark/50">
                      No subjects match "{subjectQuery}".
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Education Level */}
            {activeStep === 1 && (
              <div className="grid animate-fade-in gap-3 sm:grid-cols-2">
                {educationLevels.map((level) => {
                  const selected = selectedLevel?.id === level.id;
                  return (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setSelectedLevel(level)}
                      className={`flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 text-left transition-all duration-300 group ${selected
                        ? "border-eqraa-brown bg-eqraa-beige/50 shadow-md"
                        : "border-eqraa-beige/50 bg-white hover:border-eqraa-brown/40 hover:bg-eqraa-beige/20 hover:shadow-md hover:-translate-y-0.5"
                        }`}
                    >
                      <div
                        className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl transition-all ${selected
                          ? "gradient-brown text-white shadow-lg"
                          : "bg-eqraa-beige/60 text-eqraa-brown group-hover:gradient-brown group-hover:text-white"
                          }`}
                      >
                        <level.icon size={16} className="sm:size-[20px]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-semibold text-eqraa-brown-dark leading-tight">
                          {level.name}
                        </p>
                      </div>
                      {selected && (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full gradient-brown text-white">
                          <Check size={12} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 3: Curriculum */}
            {activeStep === 2 && (
              <div className="grid animate-fade-in gap-3 sm:grid-cols-3">
                {curricula.map((curriculum) => {
                  const selected = selectedCurriculum?.id === curriculum.id;
                  return (
                    <button
                      key={curriculum.id}
                      type="button"
                      onClick={() => setSelectedCurriculum(curriculum)}
                      className={`flex flex-col gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 text-left transition-all duration-300 ${selected
                        ? "border-eqraa-brown bg-eqraa-beige/50 shadow-md"
                        : "border-eqraa-beige/50 bg-white hover:border-eqraa-brown/40 hover:bg-eqraa-beige/20 hover:shadow-md hover:-translate-y-0.5"
                        }`}
                    >
                      <div
                        className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${selected
                          ? "gradient-brown text-white shadow-lg"
                          : "bg-eqraa-beige/60 text-eqraa-brown"
                          }`}
                      >
                        {curriculum.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-eqraa-brown-dark leading-tight">
                          {curriculum.name}
                        </p>
                        <p className="text-xs text-eqraa-brown-dark/60 leading-tight mt-0.5">
                          {curriculum.description}
                        </p>
                      </div>
                      {selected && (
                        <span className="inline-flex w-fit items-center gap-1 text-xs font-bold text-eqraa-brown">
                          <Check size={12} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Summary chips */}
            {(selectedSubject || selectedLevel || selectedCurriculum) && (
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 border-t border-eqraa-beige/50 pt-4 sm:pt-6">
                {selectedSubject && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-eqraa-brown/10 px-3 py-1.5 text-xs font-semibold text-eqraa-brown">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-eqraa-brown" />
                    {selectedSubject.name}
                    <button
                      type="button"
                      onClick={() => setSelectedSubject(null)}
                      className="ml-0.5 hover:text-eqraa-brown-dark transition-colors"
                      aria-label="Clear subject"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedLevel && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-eqraa-brown/10 px-3 py-1.5 text-xs font-semibold text-eqraa-brown">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-eqraa-brown" />
                    {selectedLevel.name}
                    <button
                      type="button"
                      onClick={() => setSelectedLevel(null)}
                      className="ml-0.5 hover:text-eqraa-brown-dark transition-colors"
                      aria-label="Clear level"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCurriculum && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-eqraa-brown/10 px-3 py-1.5 text-xs font-semibold text-eqraa-brown">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-eqraa-brown" />
                    {selectedCurriculum.name}
                    <button
                      type="button"
                      onClick={() => setSelectedCurriculum(null)}
                      className="ml-0.5 hover:text-eqraa-brown-dark transition-colors"
                      aria-label="Clear curriculum"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Nav controls */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-eqraa-beige/50 pt-5 sm:pt-6">
              <button
                type="button"
                onClick={goBack}
                disabled={activeStep === 0}
                className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-eqraa-brown bg-white border-2 border-eqraa-beige/60 rounded-lg sm:rounded-xl hover:border-eqraa-brown/40 hover:bg-eqraa-beige/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ChevronLeft size={14} className="sm:size-[16px]" />
                <span className="hidden xs:inline">Back</span>
              </button>

              <span className="text-xs sm:text-sm font-medium text-eqraa-brown-dark/60 px-3 py-1.5">
                Step {activeStep + 1} / {steps.length}
              </span>

              {activeStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canAdvance(activeStep)}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white gradient-brown rounded-lg sm:rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span className="hidden xs:inline">Continue</span>
                  <ChevronRight size={14} className="sm:size-[16px]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={!allComplete || searching}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white gradient-brown rounded-lg sm:rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {searching ? (
                    <>
                      <Loader2 size={14} className="sm:size-[16px] animate-spin" />
                      <span className="hidden xs:inline">Searching…</span>
                    </>
                  ) : (
                    <>
                      <Search size={14} className="sm:size-[16px]" />
                      <span className="hidden xs:inline">Find Tutors</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Search CTA — enabled state */}
          {activeStep === steps.length - 1 && allComplete && !hasSearched && (
            <div className="mx-auto mt-6 sm:mt-8 max-w-4xl text-center">
              <p className="text-xs sm:text-sm text-eqraa-brown-dark/60">
                All set! Hit{" "}
                <span className="font-semibold text-eqraa-brown">
                  Find Tutors
                </span>{" "}
                to see your matches.
              </p>
            </div>
          )}
        </div>
      </section>
      {/* Results */}
      <section id="results" className="scroll-mt-24 pb-12 sm:pb-16 lg:pb-24">
        <div className="container-px">
          {searching && (
            <div className="mx-auto max-w-2xl py-12 sm:py-20 text-center">
              <div className="relative mx-auto h-16 w-16 sm:h-20 sm:w-20 mb-6">
                <span className="absolute inset-0 rounded-full bg-eqraa-brown/20 animate-pulse" />
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full gradient-brown text-white shadow-xl">
                  <Loader2 size={24} className="sm:size-[32px] animate-spin" />
                </div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-eqraa-brown-dark">
                Finding your perfect tutors…
              </h3>
              <p className="mt-2 sm:mt-3 text-sm text-eqraa-brown-dark/60">
                Matching you with {selectedSubject?.name} experts
              </p>
            </div>
          )}

          {!searching && hasSearched && (
            <div className="animate-fade-in">
              <div className="mb-6 sm:mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center pb-6 sm:pb-8 border-b border-eqraa-beige/50">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-eqraa-brown-dark">
                    {matchedTutors.length} Expert
                    {matchedTutors.length !== 1 ? "s" : ""}
                  </h2>
                  <p className="mt-2 text-sm text-eqraa-brown-dark/60 font-medium">
                    Perfect matches for your learning needs
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetSearch}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-eqraa-brown border-2 border-eqraa-beige/60 rounded-lg sm:rounded-xl hover:border-eqraa-brown/40 hover:bg-eqraa-beige/20 transition-all"
                >
                  <RotateCcw size={16} />
                  <span className="hidden xs:inline">New Search</span>
                </button>
              </div>

              {/* Tutor cards: 1 per row on mobile, 2 on sm, 3 on lg */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {matchedTutors.map((tutor, i) => (
                  <div key={tutor._id}>
                    <TutorCard tutor={tutor} index={i} />
                  </div>
                ))}
              </div>


              {/* Encouragement nudge — always visible after search */}
              <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-md p-6 sm:p-8 lg:p-10 text-center shadow-lg border border-white/50">
                <div className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-eqraa-beige/60 mb-4 sm:mb-6">
                  <Users size={28} className="sm:size-[32px] text-eqraa-brown" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-eqraa-brown-dark">
                  Didn't find the right tutor?
                </h3>
                <p className="mx-auto mt-2 sm:mt-3 max-w-md text-xs sm:text-sm text-eqraa-brown-dark/60 leading-relaxed">

                </p>
                <div className="mt-4 sm:mt-6 flex justify-center">
                  <a
                    href="https://wa.me/201038232883"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white gradient-brown rounded-lg sm:rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <MessageCircle size={16} />
                    Get in Touch with Our Learning Experts
                  </a>
                </div>
              </div>
            </div>
          )}

          {!searching && !hasSearched && (
            <div className="mx-auto max-w-2xl py-12 sm:py-16 text-center">
              <div className="rounded-2xl sm:rounded-3xl border-2 border-dashed border-eqraa-beige-dark/40 bg-gradient-to-br from-eqraa-beige/20 to-eqraa-beige-light/30 p-8 sm:p-12">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/60 backdrop-blur-sm mb-6">
                  <Search size={32} className="text-eqraa-brown/50" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-eqraa-brown-dark">
                  Ready to find your perfect tutor?
                </h3>
                <p className="mt-3 text-sm text-eqraa-brown-dark/60 leading-relaxed">
                  Answer the three questions above to get personalized tutor recommendations
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}