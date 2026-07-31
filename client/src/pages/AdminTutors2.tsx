import { useEffect, useMemo, useState } from "react";
import apiClient from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Search,
  Users,
  Eye,
  Pencil,
  Trash2,
  Star,
  MapPin,
  DollarSign,
  CheckCircle,
  Sigma,
  Atom,
  FlaskConical,
  Dna,
  Microscope,
  Languages,
  Type,
  PenTool,
  Globe2,
  Code2,
  Briefcase,
  Calculator,
  TrendingUp,
  Leaf,
  BookOpen,
  Triangle,
  GraduationCap,
  X,
  Plus,
} from "lucide-react";
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

interface TutorFormProps {
  mode: "create" | "edit";
  tutor?: Tutor;
  onSubmit: (data: any) => void;
  onClose: () => void;
  isSubmitting: boolean;
}

type ModalState =
  | { type: "none" }
  | { type: "create" }
  | { type: "edit"; tutor: Tutor }
  | { type: "view"; tutor: Tutor }
  | { type: "delete"; tutor: Tutor };

type ToastType = "success" | "error";
interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

let toastId = 0;

/* ─── Helpers ─── */
const extractErrorMessage = (err: any): string =>
  err?.response?.data?.message || err?.message || "Something went wrong";

/* ─── Inline Spinner ─── */
function Spinner({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={`animate-spin ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

/* ─── Toast ─── */
function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}) {
  if (!toasts.length) return null;
  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg border text-sm font-medium min-w-[280px] ${t.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}
        >
          {t.type === "success" ? (
            <CheckCircle size={16} className="text-green-600 shrink-0" />
          ) : (
            <X size={16} className="text-red-600 shrink-0" />
          )}
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => onDismiss(t.id)}
            className="shrink-0 opacity-60 hover:opacity-100"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ─── Card ─── */
function TutorCard({
  tutor,
  onView,
  onEdit,
  onDelete,
}: {
  tutor: Tutor;
  onView: (t: Tutor) => void;
  onEdit: (t: Tutor) => void;
  onDelete: (t: Tutor) => void;
}) {
  return (
    <div className="group relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all">
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onView(tutor)}
          className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
          title="View"
        >
          <Eye size={15} />
        </button>
        <button
          onClick={() => onEdit(tutor)}
          className="rounded-md p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
          title="Edit"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(tutor)}
          className="rounded-md p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
          title="Delete"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="flex items-start gap-3">
        <img
          src={tutor.avatar || "https://via.placeholder.com/64"}
          alt={tutor.name}
          className="h-14 w-14 rounded-lg object-cover border border-slate-100"
        />
        <div className="min-w-0 flex-1 pr-16">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {tutor.name}
            </h3>
            {tutor.verified && (
              <CheckCircle size={13} className="text-blue-500 shrink-0" />
            )}
          </div>
          <p className="text-xs text-slate-500 truncate">{tutor.title}</p>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
            <MapPin size={11} />
            {tutor.country} {tutor.countryFlag}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-slate-600">
        <span className="flex items-center gap-1 text-amber-600 font-medium">
          <Star size={12} fill="currentColor" />
          {tutor.rating}
        </span>
        <span>{tutor.students} students</span>
        <span>{tutor.hoursTaught}h taught</span>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {tutor.subjects.slice(0, 3).map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-700"
          >
            <BookOpen size={9} />
            {s}
          </span>
        ))}
        {tutor.subjects.length > 3 && (
          <span className="text-[10px] text-slate-400">
            +{tutor.subjects.length - 3}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
        <span className="text-xs font-semibold text-slate-800 flex items-center gap-0.5">
          <DollarSign size={12} />
          {tutor.pricePerHour}
          <span className="text-slate-400 font-normal">/hr</span>
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${tutor.available ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${tutor.available ? "bg-green-500" : "bg-slate-400"}`}
          />
          {tutor.available ? "Available" : "Off"}
        </span>
      </div>
    </div>
  );
}

/* ─── Modal Shell ─── */
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl">
        {children}
      </div>
    </div>
  );
}

/* ─── Create / Edit Form ─── */
// function TutorForm({ mode, tutor, onSubmit, onClose, isSubmitting }: { mode: 'create' | 'edit'; tutor?: Tutor; onSubmit: (data: any) => void; onClose: () => void; isSubmitting: boolean }) {
//   const [form, setForm] = useState({
//     name: tutor?.name ?? '',
//     email: tutor?.email ?? '',
//     title: tutor?.title ?? '',
//     avatar: tutor?.avatar ?? '',
//     country: tutor?.country ?? '',
//     countryFlag: tutor?.countryFlag ?? '',
//     verified: tutor?.verified ?? false,
//     experienceYears: tutor?.experienceYears ?? 0,
//     pricePerHour: tutor?.pricePerHour ?? 0,
//     available: tutor?.available ?? true,
//     bio: tutor?.bio ?? '',
//     subjects: tutor?.subjects?.join(', ') ?? '',
//     languages: tutor?.languages?.join(', ') ?? '',
//     curricula: tutor?.curricula?.join(', ') ?? '',
//     educationLevels: tutor?.educationLevels?.join(', ') ?? '',
//   });

//   const set = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const payload = {
//       ...form,
//       experienceYears: Number(form.experienceYears),
//       pricePerHour: Number(form.pricePerHour),
//       subjects: form.subjects.split(',').map(s => s.trim()).filter(Boolean),
//       languages: form.languages.split(',').map(s => s.trim()).filter(Boolean),
//       curricula: form.curricula.split(',').map(s => s.trim()).filter(Boolean),
//       educationLevels: form.educationLevels.split(',').map(s => s.trim()).filter(Boolean),
//     };
//     onSubmit(payload);
//   };

//   const input = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';
//   const label = 'block text-xs font-semibold text-slate-700 mb-1';

//   return (
//     <Modal onClose={onClose}>
//       <form onSubmit={handleSubmit} className="p-5">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-base font-bold text-slate-900">{mode === 'create' ? 'Add Tutor' : 'Edit Tutor'}</h2>
//           <button type="button" onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100"><X size={16} /></button>
//         </div>

//         <div className="space-y-3">
//           <div className="grid grid-cols-2 gap-3">
//             <div><label className={label}>Name *</label><input required className={input} value={form.name} onChange={e => set('name', e.target.value)} /></div>
//             <div><label className={label}>Email *</label><input required type="email" className={input} value={form.email} onChange={e => set('email', e.target.value)} /></div>
//           </div>
//           <div><label className={label}>Title *</label><input required className={input} value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Math Specialist" /></div>
//           <div className="grid grid-cols-2 gap-3">
//             <div><label className={label}>Country *</label><input required className={input} value={form.country} onChange={e => set('country', e.target.value)} /></div>
//             <div><label className={label}>Flag</label><input className={input} value={form.countryFlag} onChange={e => set('countryFlag', e.target.value)} placeholder="🇺🇸" /></div>
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <div><label className={label}>Price / Hour ($) *</label><input required type="number" min={0} className={input} value={form.pricePerHour} onChange={e => set('pricePerHour', e.target.value)} /></div>
//             <div><label className={label}>Experience (yrs)</label><input type="number" min={0} className={input} value={form.experienceYears} onChange={e => set('experienceYears', e.target.value)} /></div>
//           </div>
//           <div><label className={label}>Avatar URL</label><input className={input} value={form.avatar} onChange={e => set('avatar', e.target.value)} placeholder="https://..." /></div>
//           <div><label className={label}>Bio</label><textarea rows={2} className={`${input} resize-none`} value={form.bio} onChange={e => set('bio', e.target.value)} /></div>

//           <div><label className={label}>Subjects (comma separated)</label>
//           <input className={input} value={form.subjects}
//           onChange={e => set('subjects', e.target.value)}
//            placeholder="Math, Physics, Chemistry" /></div>
//           <div><label className={label}>Languages (comma separated)</label><input className={input} value={form.languages} onChange={e => set('languages', e.target.value)} placeholder="English, Arabic" /></div>
//           <div className="grid grid-cols-2 gap-3">
//             <div><label className={label}>Curricula</label><input className={input} value={form.curricula} onChange={e => set('curricula', e.target.value)} placeholder="IB, AP" /></div>
//             <div><label className={label}>Education Levels</label><input className={input} value={form.educationLevels} onChange={e => set('educationLevels', e.target.value)} placeholder="High School, Middle School" /></div>
//           </div>

//           <div className="flex items-center gap-4 pt-1">
//             <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
//               <input type="checkbox" checked={form.verified} onChange={e => set('verified', e.target.checked)} className="rounded border-slate-300" />
//               Verified
//             </label>
//             <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
//               <input type="checkbox" checked={form.available} onChange={e => set('available', e.target.checked)} className="rounded border-slate-300" />
//               Available
//             </label>
//           </div>
//         </div>

//         <div className="mt-5 flex justify-end gap-2">
//           <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
//           <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold border-slate-300 bg-green-700 text-black hover:bg-brand-700 disabled:opacity-60">
//             {isSubmitting && <Spinner size={14} />}{mode === 'create' ? 'Create' : 'Save'}
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// }

// --- Data constants ---
const SUBJECTS = [
  { id: "mathematics", name: "Mathematics", icon: Sigma },
  { id: "physics", name: "Physics", icon: Atom },
  { id: "chemistry", name: "Chemistry", icon: FlaskConical },
  { id: "biology", name: "Biology", icon: Dna },
  { id: "science", name: "Science", icon: Microscope },
  { id: "english", name: "English", icon: Languages },
  { id: "arabic", name: "Arabic", icon: Type },
  { id: "french", name: "French", icon: PenTool },
  { id: "german", name: "German", icon: Globe2 },
  { id: "computer-science", name: "Computer Science", icon: Code2 },
  { id: "business", name: "Business", icon: Briefcase },
  { id: "accounting", name: "Accounting", icon: Calculator },
  { id: "economics", name: "Economics", icon: TrendingUp },
  { id: "programming", name: "Programming", icon: Code2 },
] as const;

const EDUCATION_LEVELS = [
  {
    id: "kindergarten",
    name: "Kindergarten",
    description: "Ages 3–6 · Early foundations",
    icon: Leaf,
  },
  {
    id: "primary",
    name: "Primary School",
    description: "Grades 1–6 · Core skills",
    icon: BookOpen,
  },
  {
    id: "middle",
    name: "Middle School",
    description: "Grades 7–9 · Building depth",
    icon: Triangle,
  },
  {
    id: "high",
    name: "High School",
    description: "Grades 10–12 · Exam prep",
    icon: GraduationCap,
  },
] as const;

const CURRICULA = [
  {
    id: "egyptian-national",
    name: "Egyptian National",
    description: "Ministry of Education national curriculum",
  },
  {
    id: "american",
    name: "American",
    description: "US Common Core / AP / SAT aligned",
  },
  {
    id: "british",
    name: "British (IGCSE)",
    description: "Cambridge & Edexcel IGCSE / A-Level",
  },
] as const;

// --- Types ---
// interface Tutor {
//   name: string;
//   email: string;
//   title: string;
//   avatar: string;
//   country: string;
//   countryFlag: string;
//   verified: boolean;
//   experienceYears: number;
//   pricePerHour: number;
//   available: boolean;
//   bio: string;
//   subjects: string[];
//   languages: string[];
//   curricula: string[];
//   educationLevels: string[];
// }

// interface TutorFormProps {
//   mode: "create" | "edit";
//   tutor?: Tutor;
//   onSubmit: (data: any) => void;
//   onClose: () => void;
//   isSubmitting: boolean;
// }

// --- Component ---
function TutorForm({
  mode,
  tutor,
  onSubmit,
  onClose,
  isSubmitting,
}: TutorFormProps) {
  const [form, setForm] = useState({
    name: tutor?.name ?? "",
    email: tutor?.email ?? "",
    title: tutor?.title ?? "",
    avatar: tutor?.avatar ?? "",
    country: tutor?.country ?? "",
    countryFlag: tutor?.countryFlag ?? "",
    verified: tutor?.verified ?? false,
    experienceYears: tutor?.experienceYears ?? 0,
    pricePerHour: tutor?.pricePerHour ?? 0,
    available: tutor?.available ?? true,
    bio: tutor?.bio ?? "",
    subjects: tutor?.subjects ?? [],
    languages: tutor?.languages ?? [],
    curricula: tutor?.curricula ?? [],
    educationLevels: tutor?.educationLevels ?? [],
  });

  // Language tag input state
  const [langInput, setLangInput] = useState("");

  const set = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Toggle helpers for checkbox groups
  const toggleArrayItem = (
    key: "subjects" | "languages" | "curricula" | "educationLevels",
    value: string,
  ) => {
    setForm((prev) => {
      const current = prev[key] as string[];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  // Language tag input
  const addLanguage = () => {
    const raw = langInput.trim();
    if (!raw) return;
    const normalized = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    if (!form.languages.includes(normalized)) {
      setForm((prev) => ({
        ...prev,
        languages: [...prev.languages, normalized],
      }));
    }
    setLangInput("");
  };

  const removeLanguage = (lang: string) => {
    setForm((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== lang),
    }));
  };

  const handleLangKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLanguage();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      experienceYears: Number(form.experienceYears),
      pricePerHour: Number(form.pricePerHour),
    };
    onSubmit(payload);
  };

  const input =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";
  const label = "block text-xs font-semibold text-slate-700 mb-1";

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">
            {mode === "create" ? "Add Tutor" : "Edit Tutor"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Name *</label>
              <input
                required
                className={input}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>
                Email <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                type="email"
                className={input}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={label}>Title *</label>
            <input
              required
              className={input}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Math Specialist"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Country *</label>
              <input
                required
                className={input}
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Flag</label>
              <input
                className={input}
                value={form.countryFlag}
                onChange={(e) => set("countryFlag", e.target.value)}
                placeholder="🇺🇸"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Price / Hour ($) *</label>
              <input
                required
                type="number"
                min={0}
                className={input}
                value={form.pricePerHour}
                onChange={(e) => set("pricePerHour", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Experience (yrs)</label>
              <input
                type="number"
                min={0}
                className={input}
                value={form.experienceYears}
                onChange={(e) => set("experienceYears", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={label}>Avatar URL</label>
            <input
              className={input}
              value={form.avatar}
              onChange={(e) => set("avatar", e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className={label}>Bio</label>
            <textarea
              rows={2}
              className={`${input} resize-none`}
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
            />
          </div>

          {/* Subjects — checkbox grid with icons */}
          <div>
            <label className={label}>Subjects</label>
            <div className="grid grid-cols-2 gap-2">
              {SUBJECTS.map((subj) => {
                const Icon = subj.icon;
                const checked = form.subjects.includes(subj.id);
                return (
                  <label
                    key={subj.id}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-colors text-sm
                      ${
                        checked
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleArrayItem("subjects", subj.id)}
                    />
                    <Icon
                      size={16}
                      className={checked ? "text-brand-600" : "text-slate-400"}
                    />
                    <span className="font-medium">{subj.name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Education Levels — checkbox cards */}
          <div>
            <label className={label}>Education Levels</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EDUCATION_LEVELS.map((level) => {
                const Icon = level.icon;
                const checked = form.educationLevels.includes(level.id);
                return (
                  <label
                    key={level.id}
                    className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors
                      ${
                        checked
                          ? "border-brand-500 bg-brand-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      checked={checked}
                      onChange={() =>
                        toggleArrayItem("educationLevels", level.id)
                      }
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon
                          size={16}
                          className={
                            checked ? "text-brand-600" : "text-slate-400"
                          }
                        />
                        <span
                          className={`text-sm font-semibold ${checked ? "text-brand-700" : "text-slate-800"}`}
                        >
                          {level.name}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-0.5 ${checked ? "text-brand-600/80" : "text-slate-500"}`}
                      >
                        {level.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Curricula — checkbox cards */}
          <div>
            <label className={label}>Curricula</label>
            <div className="space-y-2">
              {CURRICULA.map((cur) => {
                const checked = form.curricula.includes(cur.id);
                return (
                  <label
                    key={cur.id}
                    className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors
                      ${
                        checked
                          ? "border-brand-500 bg-brand-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      checked={checked}
                      onChange={() => toggleArrayItem("curricula", cur.id)}
                    />
                    <div className="flex-1">
                      <span
                        className={`text-sm font-semibold ${checked ? "text-brand-700" : "text-slate-800"}`}
                      >
                        {cur.name}
                      </span>
                      <p
                        className={`text-xs mt-0.5 ${checked ? "text-brand-600/80" : "text-slate-500"}`}
                      >
                        {cur.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Languages — tag input with Enter to add */}
          <div>
            <label className={label}>Languages</label>
            <div className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
              <div className="flex flex-wrap items-center gap-1.5">
                {form.languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => removeLanguage(lang)}
                      className="rounded-sm p-0.5 hover:bg-brand-100"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="min-w-[80px] flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-slate-400"
                  placeholder="Type & press Enter..."
                  value={langInput}
                  onChange={(e) => setLangInput(e.target.value)}
                  onKeyDown={handleLangKeyDown}
                />
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-4 pt-1">
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={form.verified}
                onChange={(e) => set("verified", e.target.checked)}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              Verified
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) => set("available", e.target.checked)}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              Available
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-black bg-green-700 hover:bg-brand-700 disabled:opacity-60"
          >
            {isSubmitting && <Spinner size={14} />}
            {mode === "create" ? "Create" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* ─── View Modal ─── */
function ViewModal({ tutor, onClose }: { tutor: Tutor; onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">Tutor Details</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex items-start gap-3 mb-4">
          <img
            src={tutor.avatar || "https://via.placeholder.com/80"}
            alt=""
            className="h-16 w-16 rounded-xl object-cover border"
          />
          <div>
            <h3 className="font-bold text-slate-900">{tutor.name}</h3>
            <p className="text-xs text-slate-500">{tutor.title}</p>
            <p className="text-xs text-slate-400 mt-0.5">{tutor.email}</p>
            <p className="text-xs text-slate-400">
              {tutor.country} {tutor.countryFlag}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="rounded-lg bg-slate-50 p-2 text-center text-xs">
            <span className="block font-bold text-slate-900">
              {tutor.rating} ★
            </span>
            Rating
          </div>
          <div className="rounded-lg bg-slate-50 p-2 text-center text-xs">
            <span className="block font-bold text-slate-900">
              {tutor.students}
            </span>
            Students
          </div>
          <div className="rounded-lg bg-slate-50 p-2 text-center text-xs">
            <span className="block font-bold text-slate-900">
              {tutor.hoursTaught}h
            </span>
            Taught
          </div>
        </div>
        <div className="space-y-2 text-xs text-slate-600">
          <p>
            <span className="font-semibold">Bio:</span> {tutor.bio || "—"}
          </p>
          <p>
            <span className="font-semibold">Subjects:</span>{" "}
            {tutor.subjects.join(", ") || "—"}
          </p>
          <p>
            <span className="font-semibold">Languages:</span>{" "}
            {tutor.languages.join(", ") || "—"}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ${tutor.pricePerHour}
            /hr
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {tutor.available ? "Available" : "Unavailable"} |{" "}
            {tutor.verified ? "Verified" : "Not Verified"}
          </p>
        </div>
      </div>
    </Modal>
  );
}

/* ─── Delete Modal ─── */
function DeleteModal({
  tutor,
  onConfirm,
  onClose,
  isDeleting,
}: {
  tutor: Tutor;
  onConfirm: () => void;
  onClose: () => void;
  isDeleting: boolean;
}) {
  return (
    <Modal onClose={onClose}>
      <div className="p-5 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
          <Trash2 size={20} className="text-red-600" />
        </div>
        <h2 className="text-base font-bold text-slate-900">Delete Tutor?</h2>
        <p className="mt-1 text-xs text-slate-500">
          Delete <span className="font-semibold">{tutor.name}</span>? This
          cannot be undone.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isDeleting && <Spinner size={14} />}Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ─── Main Page ─── */
export default function AdminTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const pushToast = (type: ToastType, message: string) => {
    const id = ++toastId;
    setToasts((p) => [...p, { id, type, message }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get("/tutors");
      // Backend returns: { success: true, count: N, tutors: [...] }
      const list = res.data?.tutors ?? [];
      setTutors(Array.isArray(list) ? list : []);
    } catch (err: any) {
      setError(extractErrorMessage(err));
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return tutors;
    return tutors.filter((t) =>
      [t.name, t.email, t.title, t.country, t.bio].some((f) =>
        f?.toLowerCase().includes(term),
      ),
    );
  }, [tutors, search]);

  const close = () => setModal({ type: "none" });

  const handleCreate = async (payload: any) => {
    setSubmitting(true);
    try {
      await apiClient.post("/tutors", payload);
      await load();
      close();
      pushToast("success", "Tutor created.");
    } catch (err: any) {
      pushToast("error", extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (id: string, payload: any) => {
    setSubmitting(true);
    try {
      await apiClient.put(`/tutors/${id}`, payload);
      await load();
      close();
      pushToast("success", "Tutor updated.");
    } catch (err: any) {
      pushToast("error", extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (tutor: Tutor) => {
    setDeleting(true);
    try {
      await apiClient.delete(`/tutors/${tutor._id}`);
      setTutors((p) => p.filter((t) => t._id !== tutor._id));
      close();
      pushToast("success", "Tutor deleted.");
    } catch (err: any) {
      pushToast("error", extractErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 mt-14">
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))}
      />

      {modal.type === "create" && (
        <TutorForm
          mode="create"
          onSubmit={handleCreate}
          onClose={close}
          isSubmitting={submitting}
        />
      )}
      {modal.type === "edit" && (
        <TutorForm
          mode="edit"
          tutor={modal.tutor}
          onSubmit={(d) => handleUpdate(modal.tutor._id, d)}
          onClose={close}
          isSubmitting={submitting}
        />
      )}
      {modal.type === "view" && (
        <ViewModal tutor={modal.tutor} onClose={close} />
      )}
      {modal.type === "delete" && (
        <DeleteModal
          tutor={modal.tutor}
          onConfirm={() => handleDelete(modal.tutor)}
          onClose={close}
          isDeleting={deleting}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Tutor Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">Manage all tutors.</p>
          </div>
          <button
            onClick={() => setModal({ type: "create" })}
            className="btn-primary px-5 py-2.5 text-sm"
          >
            <Plus size={16} /> Add Tutor
          </button>
        </div>

        <div className="mt-6 relative max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, title, country..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="flex flex-col items-center py-24 text-slate-400">
              <Spinner size={32} className="text-brand-500" />
              <p className="mt-3 text-sm font-medium">Loading...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-100 bg-red-50 py-16 text-center">
              <p className="text-sm font-medium text-red-700">{error}</p>
              <button
                onClick={load}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white py-24 text-center">
              <Users size={32} className="text-slate-300" />
              <p className="text-sm font-medium text-slate-500">
                {tutors.length === 0 ? "No tutors yet" : "No matches"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((tutor) => (
                <TutorCard
                  key={tutor._id}
                  tutor={tutor}
                  onView={(t) => setModal({ type: "view", tutor: t })}
                  onEdit={(t) => setModal({ type: "edit", tutor: t })}
                  onDelete={(t) => setModal({ type: "delete", tutor: t })}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
