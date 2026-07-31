import { useMemo, useState , useEffect } from "react";
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
  const [tutors, setTutors] = useState<Tutor>([]);
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
    // setLoading(true);
    // setError(null);
    try {
      const res = await apiClient.get("/tutors");
      // Backend returns: { success: true, count: N, tutors: [...] }
      const list = res.data?.tutors ?? [];
      console.log(list)
      setTutors(Array.isArray(list) ? list : []);
    } catch (err: any) {
      // setError(extractErrorMessage(err));
      setTutors([]);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredSubjects = useMemo(() => {
    const q = subjectQuery.trim().toLowerCase();
    if (!q) return subjects;
    return subjects.filter((s) => s.name.toLowerCase().includes(q));
  }, [subjectQuery]);

  const matchedTutors = useMemo(() => {
    if (!selectedSubject) return [];
    console.log(tutors)
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
  }, [selectedSubject, selectedCurriculum, selectedLevel]);

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
    <div className="bg-eqraa-beige-light pt-28">
      {/* Page header */}
      <section className="relative overflow-hidden py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-eqraa-beige/50 blur-3xl" />
          <div className="absolute right-[-5%] top-10 h-72 w-72 rounded-full bg-eqraa-beige-dark/30 blur-3xl" />
        </div>
        <div className="container-px relative text-center">
          <span className="section-eyebrow mx-auto">
            <Sparkles size={14} />
            Find your perfect match
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-eqraa-brown-dark sm:text-5xl">
            Find Your Tutor
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-eqraa-brown-dark/65">
            Answer three quick questions and we'll match you with verified
            tutors who fit your exact needs.
          </p>
        </div>
      </section>

      {/* Stepper */}
      <section className="pb-8">
        <div className="container-px">
          <div className="mx-auto max-w-3xl">
            <ol className="flex items-center">
              {steps.map((step, i) => {
                const isComplete =
                  i < activeStep || (i === activeStep && canAdvance(i));
                const isActive = i === activeStep;
                return (
                  <li
                    key={step.id}
                    className="flex flex-1 items-center last:flex-none"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                          isComplete
                            ? "gradient-brown border-transparent text-white shadow-soft"
                            : isActive
                              ? "border-eqraa-brown bg-white text-eqraa-brown shadow-soft"
                              : "border-eqraa-beige-dark bg-white text-eqraa-brown-dark/40"
                        }`}
                      >
                        {isComplete && i < activeStep ? (
                          <Check size={18} />
                        ) : (
                          i + 1
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold sm:text-sm ${
                          isActive || isComplete
                            ? "text-eqraa-brown-dark"
                            : "text-eqraa-brown-dark/40"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="mx-3 mb-7 h-0.5 flex-1 rounded-full bg-eqraa-beige-dark sm:mx-4">
                        <div
                          className="h-full rounded-full gradient-brown transition-all duration-500"
                          style={{ width: i < activeStep ? "100%" : "0%" }}
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
      <section className="pb-12">
        <div className="container-px">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-6 shadow-soft sm:p-10">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brown text-sm font-bold text-white">
                {activeStep + 1}
              </span>
              <div>
                <h2 className="text-xl font-bold text-eqraa-brown-dark">
                  {steps[activeStep].label}
                </h2>
                <p className="text-sm text-eqraa-brown-dark/60">
                  {steps[activeStep].hint}
                </p>
              </div>
            </div>

            {/* Step 1: Subject */}
            {activeStep === 0 && (
              <div className="animate-fade-in">
                <div className="relative mb-6">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-eqraa-brown-dark/40"
                  />
                  <input
                    type="text"
                    value={subjectQuery}
                    onChange={(e) => setSubjectQuery(e.target.value)}
                    placeholder="Search subjects…"
                    className="w-full rounded-2xl border border-eqraa-beige-dark/60 bg-eqraa-beige-light py-3.5 pl-12 pr-4 text-sm text-eqraa-brown-dark placeholder:text-eqraa-brown-dark/40 focus:border-eqraa-brown focus:outline-none focus:ring-4 focus:ring-eqraa-brown/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {filteredSubjects.map((subject) => {
                    const selected = selectedSubject?.id === subject.id;
                    return (
                      <button
                        key={subject.id}
                        onClick={() => setSelectedSubject(subject)}
                        className={`group flex flex-col items-center gap-3 rounded-3xl border-2 p-5 text-center transition-all duration-300 ${
                          selected
                            ? "border-eqraa-brown bg-eqraa-beige shadow-soft"
                            : "border-eqraa-beige/70 bg-eqraa-beige-light hover:-translate-y-1 hover:border-eqraa-brown/40 hover:bg-white hover:shadow-soft"
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                            selected
                              ? "gradient-brown text-white"
                              : "bg-white text-eqraa-brown shadow-soft group-hover:gradient-brown group-hover:text-white"
                          }`}
                        >
                          <subject.icon size={24} />
                        </div>
                        <span className="text-sm font-medium text-eqraa-brown-dark">
                          {subject.name}
                        </span>
                        {selected && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-eqraa-brown">
                            <Check size={12} /> Selected
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
              <div className="grid animate-fade-in gap-4 sm:grid-cols-2">
                {educationLevels.map((level) => {
                  const selected = selectedLevel?.id === level.id;
                  return (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level)}
                      className={`flex items-center gap-4 rounded-3xl border-2 p-6 text-left transition-all duration-300 ${
                        selected
                          ? "border-eqraa-brown bg-eqraa-beige shadow-soft"
                          : "border-eqraa-beige/70 bg-eqraa-beige-light hover:-translate-y-1 hover:border-eqraa-brown/40 hover:bg-white hover:shadow-soft"
                      }`}
                    >
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors ${
                          selected
                            ? "gradient-brown text-white"
                            : "bg-white text-eqraa-brown shadow-soft"
                        }`}
                      >
                        <level.icon size={28} />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-semibold text-eqraa-brown-dark">
                          {level.name}
                        </p>
                        <p className="mt-0.5 text-sm text-eqraa-brown-dark/60">
                          {level.description}
                        </p>
                      </div>
                      {selected && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full gradient-brown text-white">
                          <Check size={16} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 3: Curriculum */}
            {activeStep === 2 && (
              <div className="grid animate-fade-in gap-4 sm:grid-cols-3">
                {curricula.map((curriculum) => {
                  const selected = selectedCurriculum?.id === curriculum.id;
                  return (
                    <button
                      key={curriculum.id}
                      onClick={() => setSelectedCurriculum(curriculum)}
                      className={`flex flex-col gap-3 rounded-3xl border-2 p-6 text-left transition-all duration-300 ${
                        selected
                          ? "border-eqraa-brown bg-eqraa-beige shadow-soft"
                          : "border-eqraa-beige/70 bg-eqraa-beige-light hover:-translate-y-1 hover:border-eqraa-brown/40 hover:bg-white hover:shadow-soft"
                      }`}
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold transition-colors ${
                          selected
                            ? "gradient-brown text-white"
                            : "bg-white text-eqraa-brown shadow-soft"
                        }`}
                      >
                        {curriculum.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-eqraa-brown-dark">
                          {curriculum.name}
                        </p>
                        <p className="mt-0.5 text-sm text-eqraa-brown-dark/60">
                          {curriculum.description}
                        </p>
                      </div>
                      {selected && (
                        <span className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-eqraa-brown">
                          <Check size={12} /> Selected
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Summary chips */}
            {(selectedSubject || selectedLevel || selectedCurriculum) && (
              <div className="mt-8 flex flex-wrap gap-2 border-t border-eqraa-beige/70 pt-6">
                {selectedSubject && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-eqraa-beige px-3 py-1.5 text-xs font-medium text-eqraa-brown-dark">
                    Subject: {selectedSubject.name}
                    <button
                      onClick={() => setSelectedSubject(null)}
                      className="text-eqraa-brown/60 hover:text-eqraa-brown"
                      aria-label="Clear subject"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedLevel && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-eqraa-beige px-3 py-1.5 text-xs font-medium text-eqraa-brown-dark">
                    Level: {selectedLevel.name}
                    <button
                      onClick={() => setSelectedLevel(null)}
                      className="text-eqraa-brown/60 hover:text-eqraa-brown"
                      aria-label="Clear level"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCurriculum && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-eqraa-beige px-3 py-1.5 text-xs font-medium text-eqraa-brown-dark">
                    Curriculum: {selectedCurriculum.name}
                    <button
                      onClick={() => setSelectedCurriculum(null)}
                      className="text-eqraa-brown/60 hover:text-eqraa-brown"
                      aria-label="Clear curriculum"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Nav controls */}
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-eqraa-beige/70 pt-6">
              <button
                onClick={goBack}
                disabled={activeStep === 0}
                className="btn-secondary px-5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                <ChevronLeft size={16} />
                Back
              </button>

              <span className="hidden text-sm text-eqraa-brown-dark/50 sm:block">
                Step {activeStep + 1} of {steps.length}
              </span>

              {activeStep < steps.length - 1 ? (
                <button
                  onClick={goNext}
                  disabled={!canAdvance(activeStep)}
                  className="btn-primary px-5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  Continue
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSearch}
                  disabled={!allComplete || searching}
                  className="btn-primary px-6 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  {searching ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Finding tutors…
                    </>
                  ) : (
                    <>
                      <Search size={16} />
                      Find Tutors
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Search CTA — enabled state */}
          {activeStep === steps.length - 1 && allComplete && !hasSearched && (
            <div className="mx-auto mt-8 max-w-4xl text-center">
              <p className="text-sm text-eqraa-brown-dark/60">
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
      <section id="results" className="scroll-mt-24 pb-24">
        <div className="container-px">
          {searching && (
            <div className="mx-auto max-w-2xl py-20 text-center">
              <div className="relative mx-auto h-20 w-20">
                <span className="absolute inset-0 rounded-full bg-eqraa-brown/20 animate-pulse-ring" />
                <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-brown text-white shadow-soft">
                  <Loader2 size={32} className="animate-spin" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-eqraa-brown-dark">
                Matching you with tutors…
              </h3>
              <p className="mt-2 text-sm text-eqraa-brown-dark/60">
                Filtering verified tutors for {selectedSubject?.name},{" "}
                {selectedLevel?.name}, {selectedCurriculum?.name}.
              </p>
            </div>
          )}

          {!searching && hasSearched && (
            <div className="animate-fade-in">
              <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold text-eqraa-brown-dark sm:text-3xl">
                    {matchedTutors.length} tutor
                    {matchedTutors.length !== 1 ? "s" : ""} found
                  </h2>
                  <p className="mt-1 text-sm text-eqraa-brown-dark/60">
                    {selectedSubject?.name} · {selectedLevel?.name} ·{" "}
                    {selectedCurriculum?.name}
                  </p>
                </div>
                <button
                  onClick={resetSearch}
                  className="btn-secondary px-5 py-2.5 text-sm"
                >
                  <RotateCcw size={16} />
                  New Search
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {matchedTutors.map((tutor, i) => (
                  <TutorCard key={tutor.id} tutor={tutor} index={i} />
                ))}
              </div>

              {/* Empty-state nudge */}
              <div className="mt-12 rounded-3xl bg-white p-8 text-center shadow-soft">
                <Users size={32} className="mx-auto text-eqraa-brown" />
                <h3 className="mt-4 text-lg font-semibold text-eqraa-brown-dark">
                  Didn't find the right fit?
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-eqraa-brown-dark/60">
                  Try adjusting your subject, level, or curriculum — new tutors
                  join Eqraa every week.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button onClick={resetSearch} className="btn-primary">
                    Refine Search
                    <ArrowRight size={16} />
                  </button>
                  <Link to="/" className="btn-secondary">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          )}

          {!searching && !hasSearched && (
            <div className="mx-auto max-w-2xl py-12 text-center">
              <div className="rounded-3xl border-2 border-dashed border-eqraa-beige-dark/60 bg-white/50 p-10">
                <Search size={36} className="mx-auto text-eqraa-brown/50" />
                <h3 className="mt-4 text-lg font-semibold text-eqraa-brown-dark">
                  Your tutor matches will appear here
                </h3>
                <p className="mt-2 text-sm text-eqraa-brown-dark/60">
                  Complete the three steps above and tap{" "}
                  <span className="font-semibold text-eqraa-brown">
                    Find Tutors
                  </span>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
