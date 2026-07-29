// // import { useEffect, useMemo, useState } from 'react';
// // import { Plus, Search, Users } from 'lucide-react';
// // // import { CreateTutorPayload, UpdateTutorPayload, ToastMessage } from '../types/Tutor';
// // // import { extractErrorMessage, tutorApi } from '../services/tutorApi';
// // import TutorCard from '../components/TutorCard';
// // import TutorModal from '../components/TutorModal';
// // import ViewTutorModal from '../components/ViewTutorModal';
// // // import DeleteModal from '../components/DeleteModal';
// // import ToastContainer from '../components/Toast';
// // import { Spinner } from '../components/ui';
// // import apiClient from '@/lib/api';

// // type ModalState =
// //   | { type: 'none' }
// //   | { type: 'create' }
// //   | { type: 'edit'; tutor: Tutor }
// //   | { type: 'view'; tutor: Tutor }
// //   | { type: 'delete'; tutor: Tutor };

// // interface Tutor {
// //   id: number;
// //   name: string;
// //   title: string;
// //   avatar: string;
// //   country: string;
// //   countryFlag: string;
// //   verified: boolean;
// //   experienceYears: number;
// //   subjects: string[];
// //   curricula: string[];
// //   educationLevels: string[];
// //   languages: string[];
// //   rating: number;
// //   reviews: number;
// //   pricePerHour: number;
// //   available: boolean;
// //   matchPercent: number;
// //   students: number;
// //   hoursTaught: number;
// //   bio: string;
// // }

// // let toastId = 0;

// // export default function AdminTutors() {
// //   const [tutors, setTutors] = useState<Tutor[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [loadError, setLoadError] = useState<string | null>(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [modal, setModal] = useState<ModalState>({ type: 'none' });
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [isDeleting, setIsDeleting] = useState(false);
// //   // const [toasts, setToasts] = useState<ToastMessage[]>([]);

// //   // const pushToast = (type: ToastMessage['type'], message: string) => {
// //   //   const id = ++toastId;
// //   //   setToasts((prev) => [...prev, { id, type, message }]);
// //   //   setTimeout(() => {
// //   //     setToasts((prev) => prev.filter((t) => t.id !== id));
// //   //   }, 4000);
// //   // };

// //   const dismissToast = (id: number) => {
// //     setToasts((prev) => prev.filter((t) => t.id !== id));
// //   };

// //   const loadTutors = async () => {
// //     setIsLoading(true);
// //     setLoadError(null);
// //     try {
// //       const data = await apiClient.get("/tutors")
// //       setTutors(data.data);
// //     } catch (error) {
// //       setLoadError(extractErrorMessage(error));
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadTutors();
// //   }, []);

// //   const filteredTutors = useMemo(() => {
// //     const term = searchTerm.trim().toLowerCase();
// //     if (!term) return tutors;
// //     return tutors.filter((tutor) =>
// //       [tutor.name, tutor.title, tutor.country].some((field) =>
// //         field.toLowerCase().includes(term)
// //       )
// //     );
// //   }, [tutors, searchTerm]);

// //   const closeModal = () => setModal({ type: 'none' });

// //   // const handleCreate = async (payload: CreateTutorPayload | UpdateTutorPayload) => {
// //   //   setIsSubmitting(true);
// //   //   try {
// //   //     await tutorApi.create(payload as CreateTutorPayload);
// //   //     await loadTutors();
// //   //     closeModal();
// //   //     pushToast('success', 'Tutor added successfully.');
// //   //   } catch (error) {
// //   //     pushToast('error', extractErrorMessage(error));
// //   //   } finally {
// //   //     setIsSubmitting(false);
// //   //   }
// //   // };
// //   const y = onabort;
// //   // const handleUpdate = async (id: string, payload: UpdateTutorPayload) => {
// //   //   setIsSubmitting(true);
// //   //   try {
// //   //     await tutorApi.update(id, payload);
// //   //     await loadTutors();
// //   //     closeModal();
// //   //     pushToast('success', 'Tutor updated successfully.');
// //   //   } catch (error) {
// //   //     pushToast('error', extractErrorMessage(error));
// //   //   } finally {
// //   //     setIsSubmitting(false);
// //   //   }
// //   // };

// //   const x = 0;

// //   // const handleDelete = async (tutor: Tutor) => {
// //   //   setIsDeleting(true);
// //   //   try {
// //   //     await tutorApi.remove(tutor._id);
// //   //     setTutors((prev) => prev.filter((t) => t._id !== tutor._id));
// //   //     closeModal();
// //   //     pushToast('success', 'Tutor deleted successfully.');
// //   //   } catch (error) {
// //   //     pushToast('error', extractErrorMessage(error));
// //   //   } finally {
// //   //     setIsDeleting(false);
// //   //   }
// //   // };

// //   return (
// //     <div className="min-h-screen bg-slate-50">
// //       {/* <ToastContainer toasts={toasts} onDismiss={dismissToast} /> */}

// //       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Header */}
// //         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
// //           <div>
// //             <h1 className="text-2xl font-bold text-slate-900">Tutor Management</h1>
// //             <p className="mt-1 text-sm text-slate-500">Manage all tutors in the platform.</p>
// //           </div>
// //           {/* <button
// //             onClick={() => setModal({ type: 'create' })}
// //             className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 hover:shadow-card transition-all"
// //           >
// //             <Plus size={16} /> Add Tutor
// //           </button> */}
// //         </div>

// //         {/* Search */}
// //         <div className="mt-6 relative max-w-md">
// //           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
// //           <input
// //             type="text"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             placeholder="Search by name, email, title, or country..."
// //             className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-shadow focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
// //           />
// //         </div>

// //         {/* Content */}
// //         <div className="mt-8">
// //           {isLoading ? (
// //             <div className="flex flex-col items-center justify-center py-24 text-slate-400">
// //               <Spinner size={32} className="text-brand-500" />
// //               <p className="mt-3 text-sm font-medium">Loading tutors...</p>
// //             </div>
// //           ) : loadError ? (
// //             <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50 py-16 text-center">
// //               <p className="text-sm font-medium text-red-700">{loadError}</p>
// //               <button
// //                 onClick={loadTutors}
// //                 className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
// //               >
// //                 Try again
// //               </button>
// //             </div>
// //           ) : filteredTutors.length === 0 ? (
// //             <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white py-24 text-center">
// //               <Users size={32} className="text-slate-300" />
// //               <p className="text-sm font-medium text-slate-500">
// //                 {tutors.length === 0 ? 'No tutors found' : 'No tutors match your search'}
// //               </p>
// //             </div>
// //           ) : (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
// //               {filteredTutors.map((tutor) => (
// //                 <div key={tutor._id}>
// //                   <p>{tutor.name}</p>
// //                   <p>{tutor.bio}</p>
// //                   <p>{tutor.country}</p>
// //                   <img src={tutor.avatar} />
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useMemo, useState } from 'react';
// import { Plus, Search, Users, X, Eye, Pencil, Trash2, Star, MapPin, BookOpen, Clock, GraduationCap, Globe, DollarSign, CheckCircle, XCircle } from 'lucide-react';
// import apiClient from '@/lib/api';

// /* ─── Types ─── */
// interface Tutor {
//   id: number;
//   name: string;
//   title: string;
//   avatar: string;
//   country: string;
//   countryFlag: string;
//   verified: boolean;
//   experienceYears: number;
//   subjects: string[];
//   curricula: string[];
//   educationLevels: string[];
//   languages: string[];
//   rating: number;
//   reviews: number;
//   pricePerHour: number;
//   available: boolean;
//   matchPercent: number;
//   students: number;
//   hoursTaught: number;
//   bio: string;
// }

// type ModalState =
//   | { type: 'none' }
//   | { type: 'create' }
//   | { type: 'edit'; tutor: Tutor }
//   | { type: 'view'; tutor: Tutor }
//   | { type: 'delete'; tutor: Tutor };

// type ToastType = 'success' | 'error' | 'info';
// interface ToastMessage {
//   id: number;
//   type: ToastType;
//   message: string;
// }

// type TutorPayload = Omit<Tutor, 'id' | 'rating' | 'reviews' | 'matchPercent' | 'students' | 'hoursTaught'>;

// /* ─── Helpers ─── */
// const extractErrorMessage = (err: unknown): string => {
//   if (typeof err === 'string') return err;
//   if (err instanceof Error) return err.message;
//   if (err && typeof err === 'object' && 'message' in err) return String((err as any).message);
//   return 'Something went wrong. Please try again.';
// };

// let toastId = 0;

// /* ─── Spinner ─── */
// function Spinner({ size = 24, className = '' }: { size?: number; className?: string }) {
//   return (
//     <svg
//       className={`animate-spin ${className}`}
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//     >
//       <circle
//         className="opacity-25"
//         cx="12"
//         cy="12"
//         r="10"
//         stroke="currentColor"
//         strokeWidth="4"
//       />
//       <path
//         className="opacity-75"
//         fill="currentColor"
//         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//       />
//     </svg>
//   );
// }

// /* ─── Toast Container ─── */
// function ToastContainer({ toasts, onDismiss }: { toasts: ToastMessage[]; onDismiss: (id: number) => void }) {
//   if (!toasts.length) return null;
//   return (
//     <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2">
//       {toasts.map((t) => (
//         <div
//           key={t.id}
//           className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg border text-sm font-medium min-w-[280px] animate-in slide-in-from-right fade-in duration-300 ${
//             t.type === 'success'
//               ? 'bg-green-50 border-green-200 text-green-800'
//               : t.type === 'error'
//               ? 'bg-red-50 border-red-200 text-red-800'
//               : 'bg-blue-50 border-blue-200 text-blue-800'
//           }`}
//         >
//           {t.type === 'success' && <CheckCircle size={16} className="text-green-600 shrink-0" />}
//           {t.type === 'error' && <XCircle size={16} className="text-red-600 shrink-0" />}
//           <span className="flex-1">{t.message}</span>
//           <button onClick={() => onDismiss(t.id)} className="shrink-0 opacity-60 hover:opacity-100">
//             <X size={14} />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ─── Tutor Card ─── */
// function TutorCard({
//   tutor,
//   onView,
//   onEdit,
//   onDelete,
// }: {
//   tutor: Tutor;
//   onView: (t: Tutor) => void;
//   onEdit: (t: Tutor) => void;
//   onDelete: (t: Tutor) => void;
// }) {
//   return (
//     <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
//       {/* Actions */}
//       <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//         <button
//           onClick={() => onView(tutor)}
//           className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
//           title="View"
//         >
//           <Eye size={16} />
//         </button>
//         <button
//           onClick={() => onEdit(tutor)}
//           className="rounded-lg p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
//           title="Edit"
//         >
//           <Pencil size={16} />
//         </button>
//         <button
//           onClick={() => onDelete(tutor)}
//           className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
//           title="Delete"
//         >
//           <Trash2 size={16} />
//         </button>
//       </div>

//       {/* Header */}
//       <div className="flex items-start gap-4">
//         <img
//           src={tutor.avatar || 'https://via.placeholder.com/80'}
//           alt={tutor.name}
//           className="h-16 w-16 rounded-xl object-cover border border-slate-100"
//         />
//         <div className="min-w-0 flex-1 pr-16">
//           <div className="flex items-center gap-2">
//             <h3 className="text-base font-semibold text-slate-900 truncate">{tutor.name}</h3>
//             {tutor.verified && <CheckCircle size={14} className="text-blue-500 shrink-0" />}
//           </div>
//           <p className="text-sm text-slate-500 truncate">{tutor.title}</p>
//           <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
//             <MapPin size={12} />
//             <span>
//               {tutor.country} {tutor.countryFlag}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Stats Row */}
//       <div className="mt-4 grid grid-cols-3 gap-2">
//         <div className="rounded-lg bg-slate-50 px-3 py-2 text-center">
//           <div className="flex items-center justify-center gap-1 text-amber-500">
//             <Star size={12} fill="currentColor" />
//             <span className="text-sm font-semibold">{tutor.rating}</span>
//           </div>
//           <p className="text-[10px] text-slate-400">{tutor.reviews} reviews</p>
//         </div>
//         <div className="rounded-lg bg-slate-50 px-3 py-2 text-center">
//           <p className="text-sm font-semibold text-slate-700">{tutor.students}</p>
//           <p className="text-[10px] text-slate-400">Students</p>
//         </div>
//         <div className="rounded-lg bg-slate-50 px-3 py-2 text-center">
//           <p className="text-sm font-semibold text-slate-700">{tutor.hoursTaught}h</p>
//           <p className="text-[10px] text-slate-400">Taught</p>
//         </div>
//       </div>

//       {/* Tags */}
//       <div className="mt-4 space-y-2">
//         <div className="flex flex-wrap gap-1">
//           {tutor.subjects.slice(0, 3).map((s) => (
//             <span
//               key={s}
//               className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700"
//             >
//               <BookOpen size={10} />
//               {s}
//             </span>
//           ))}
//           {tutor.subjects.length > 3 && (
//             <span className="text-[11px] text-slate-400 px-1">+{tutor.subjects.length - 3}</span>
//           )}
//         </div>
//         <div className="flex flex-wrap gap-1">
//           {tutor.languages.slice(0, 2).map((l) => (
//             <span
//               key={l}
//               className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
//             >
//               <Globe size={10} />
//               {l}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
//         <div className="flex items-center gap-1 text-sm font-semibold text-slate-900">
//           <DollarSign size={14} />
//           {tutor.pricePerHour}
//           <span className="text-xs font-normal text-slate-400">/hr</span>
//         </div>
//         <div
//           className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
//             tutor.available
//               ? 'bg-green-50 text-green-700'
//               : 'bg-slate-100 text-slate-500'
//           }`}
//         >
//           <span className={`h-1.5 w-1.5 rounded-full ${tutor.available ? 'bg-green-500' : 'bg-slate-400'}`} />
//           {tutor.available ? 'Available' : 'Unavailable'}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── Modal Wrapper ─── */
// function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
//         {children}
//       </div>
//     </div>
//   );
// }

// /* ─── Tutor Form (Create / Edit) ─── */
// function TutorFormModal({
//   mode,
//   tutor,
//   onSubmit,
//   onClose,
//   isSubmitting,
// }: {
//   mode: 'create' | 'edit';
//   tutor?: Tutor;
//   onSubmit: (data: TutorPayload) => void;
//   onClose: () => void;
//   isSubmitting: boolean;
// }) {
//   const [form, setForm] = useState<TutorPayload>({
//     name: tutor?.name ?? '',
//     title: tutor?.title ?? '',
//     avatar: tutor?.avatar ?? '',
//     country: tutor?.country ?? '',
//     countryFlag: tutor?.countryFlag ?? '',
//     verified: tutor?.verified ?? false,
//     experienceYears: tutor?.experienceYears ?? 0,
//     subjects: tutor?.subjects ?? [],
//     curricula: tutor?.curricula ?? [],
//     educationLevels: tutor?.educationLevels ?? [],
//     languages: tutor?.languages ?? [],
//     pricePerHour: tutor?.pricePerHour ?? 0,
//     available: tutor?.available ?? true,
//     bio: tutor?.bio ?? '',
//   });

//   const [subjectInput, setSubjectInput] = useState('');
//   const [languageInput, setLanguageInput] = useState('');
//   const [curriculumInput, setCurriculumInput] = useState('');
//   const [levelInput, setLevelInput] = useState('');

//   const update = <K extends keyof TutorPayload>(key: K, value: TutorPayload[K]) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const addTag = (key: 'subjects' | 'languages' | 'curricula' | 'educationLevels', value: string, clear: () => void) => {
//     const trimmed = value.trim();
//     if (!trimmed) return;
//     if (form[key].includes(trimmed)) return;
//     update(key, [...form[key], trimmed]);
//     clear();
//   };

//   const removeTag = (key: 'subjects' | 'languages' | 'curricula' | 'educationLevels', value: string) => {
//     update(key, form[key].filter((v) => v !== value));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(form);
//   };

//   const inputClass =
//     'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all';
//   const labelClass = 'block text-xs font-semibold text-slate-700 mb-1';

//   return (
//     <ModalOverlay onClose={onClose}>
//       <form onSubmit={handleSubmit} className="p-6">
//         <div className="flex items-center justify-between mb-5">
//           <h2 className="text-lg font-bold text-slate-900">
//             {mode === 'create' ? 'Add New Tutor' : 'Edit Tutor'}
//           </h2>
//           <button type="button" onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
//             <X size={18} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           {/* Name & Title */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className={labelClass}>Full Name</label>
//               <input required className={inputClass} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="John Doe" />
//             </div>
//             <div>
//               <label className={labelClass}>Title</label>
//               <input required className={inputClass} value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Math Specialist" />
//             </div>
//           </div>

//           {/* Avatar & Country */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className={labelClass}>Avatar URL</label>
//               <input className={inputClass} value={form.avatar} onChange={(e) => update('avatar', e.target.value)} placeholder="https://..." />
//             </div>
//             <div>
//               <label className={labelClass}>Country</label>
//               <input required className={inputClass} value={form.country} onChange={(e) => update('country', e.target.value)} placeholder="United States" />
//             </div>
//           </div>

//           {/* Flag & Experience */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className={labelClass}>Country Flag (emoji)</label>
//               <input className={inputClass} value={form.countryFlag} onChange={(e) => update('countryFlag', e.target.value)} placeholder="🇺🇸" maxLength={4} />
//             </div>
//             <div>
//               <label className={labelClass}>Experience (years)</label>
//               <input type="number" min={0} className={inputClass} value={form.experienceYears} onChange={(e) => update('experienceYears', Number(e.target.value))} />
//             </div>
//           </div>

//           {/* Price & Verified */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className={labelClass}>Price / Hour ($)</label>
//               <input type="number" min={0} className={inputClass} value={form.pricePerHour} onChange={(e) => update('pricePerHour', Number(e.target.value))} />
//             </div>
//             <div className="flex items-center gap-3 pt-6">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.verified}
//                   onChange={(e) => update('verified', e.target.checked)}
//                   className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
//                 />
//                 <span className="text-sm text-slate-700">Verified</span>
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.available}
//                   onChange={(e) => update('available', e.target.checked)}
//                   className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
//                 />
//                 <span className="text-sm text-slate-700">Available</span>
//               </label>
//             </div>
//           </div>

//           {/* Bio */}
//           <div>
//             <label className={labelClass}>Bio</label>
//             <textarea
//               rows={3}
//               className={`${inputClass} resize-none`}
//               value={form.bio}
//               onChange={(e) => update('bio', e.target.value)}
//               placeholder="Short biography..."
//             />
//           </div>

//           {/* Subjects */}
//           <div>
//             <label className={labelClass}>Subjects</label>
//             <div className="flex gap-2 mb-1.5">
//               <input
//                 className={inputClass}
//                 value={subjectInput}
//                 onChange={(e) => setSubjectInput(e.target.value)}
//                 placeholder="Add subject..."
//                 onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('subjects', subjectInput, () => setSubjectInput('')))}
//               />
//               <button
//                 type="button"
//                 onClick={() => addTag('subjects', subjectInput, () => setSubjectInput(''))}
//                 className="shrink-0 rounded-lg bg-slate-100 px-3 text-sm font-medium text-slate-700 hover:bg-slate-200"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-1">
//               {form.subjects.map((s) => (
//                 <span key={s} className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">
//                   {s}
//                   <button type="button" onClick={() => removeTag('subjects', s)} className="hover:text-brand-900">
//                     <X size={12} />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Languages */}
//           <div>
//             <label className={labelClass}>Languages</label>
//             <div className="flex gap-2 mb-1.5">
//               <input
//                 className={inputClass}
//                 value={languageInput}
//                 onChange={(e) => setLanguageInput(e.target.value)}
//                 placeholder="Add language..."
//                 onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('languages', languageInput, () => setLanguageInput('')))}
//               />
//               <button
//                 type="button"
//                 onClick={() => addTag('languages', languageInput, () => setLanguageInput(''))}
//                 className="shrink-0 rounded-lg bg-slate-100 px-3 text-sm font-medium text-slate-700 hover:bg-slate-200"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-1">
//               {form.languages.map((l) => (
//                 <span key={l} className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
//                   {l}
//                   <button type="button" onClick={() => removeTag('languages', l)} className="hover:text-slate-900">
//                     <X size={12} />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Curricula */}
//           <div>
//             <label className={labelClass}>Curricula</label>
//             <div className="flex gap-2 mb-1.5">
//               <input
//                 className={inputClass}
//                 value={curriculumInput}
//                 onChange={(e) => setCurriculumInput(e.target.value)}
//                 placeholder="Add curriculum..."
//                 onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('curricula', curriculumInput, () => setCurriculumInput('')))}
//               />
//               <button
//                 type="button"
//                 onClick={() => addTag('curricula', curriculumInput, () => setCurriculumInput(''))}
//                 className="shrink-0 rounded-lg bg-slate-100 px-3 text-sm font-medium text-slate-700 hover:bg-slate-200"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-1">
//               {form.curricula.map((c) => (
//                 <span key={c} className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
//                   {c}
//                   <button type="button" onClick={() => removeTag('curricula', c)} className="hover:text-purple-900">
//                     <X size={12} />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Education Levels */}
//           <div>
//             <label className={labelClass}>Education Levels</label>
//             <div className="flex gap-2 mb-1.5">
//               <input
//                 className={inputClass}
//                 value={levelInput}
//                 onChange={(e) => setLevelInput(e.target.value)}
//                 placeholder="Add level..."
//                 onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('educationLevels', levelInput, () => setLevelInput('')))}
//               />
//               <button
//                 type="button"
//                 onClick={() => addTag('educationLevels', levelInput, () => setLevelInput(''))}
//                 className="shrink-0 rounded-lg bg-slate-100 px-3 text-sm font-medium text-slate-700 hover:bg-slate-200"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-1">
//               {form.educationLevels.map((l) => (
//                 <span key={l} className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
//                   {l}
//                   <button type="button" onClick={() => removeTag('educationLevels', l)} className="hover:text-amber-900">
//                     <X size={12} />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 flex items-center justify-end gap-3">
//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {isSubmitting && <Spinner size={14} />}
//             {mode === 'create' ? 'Create Tutor' : 'Save Changes'}
//           </button>
//         </div>
//       </form>
//     </ModalOverlay>
//   );
// }

// /* ─── View Tutor Modal ─── */
// function ViewTutorModal({ tutor, onClose }: { tutor: Tutor; onClose: () => void }) {
//   return (
//     <ModalOverlay onClose={onClose}>
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-5">
//           <h2 className="text-lg font-bold text-slate-900">Tutor Profile</h2>
//           <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
//             <X size={18} />
//           </button>
//         </div>

//         <div className="flex items-start gap-4 mb-6">
//           <img
//             src={tutor.avatar || 'https://via.placeholder.com/100'}
//             alt={tutor.name}
//             className="h-20 w-20 rounded-2xl object-cover border border-slate-100"
//           />
//           <div>
//             <div className="flex items-center gap-2">
//               <h3 className="text-xl font-bold text-slate-900">{tutor.name}</h3>
//               {tutor.verified && <CheckCircle size={18} className="text-blue-500" />}
//             </div>
//             <p className="text-sm text-slate-500">{tutor.title}</p>
//             <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
//               <span className="flex items-center gap-1">
//                 <MapPin size={14} />
//                 {tutor.country} {tutor.countryFlag}
//               </span>
//               <span className="flex items-center gap-1">
//                 <Clock size={14} />
//                 {tutor.experienceYears} years exp.
//               </span>
//               <span className="flex items-center gap-1">
//                 <DollarSign size={14} />
//                 {tutor.pricePerHour}/hr
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="grid grid-cols-3 gap-3">
//             <div className="rounded-xl bg-slate-50 p-3 text-center">
//               <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
//                 <Star size={14} fill="currentColor" />
//                 <span className="font-bold text-slate-900">{tutor.rating}</span>
//               </div>
//               <p className="text-xs text-slate-500">{tutor.reviews} reviews</p>
//             </div>
//             <div className="rounded-xl bg-slate-50 p-3 text-center">
//               <p className="font-bold text-slate-900">{tutor.students}</p>
//               <p className="text-xs text-slate-500">Students</p>
//             </div>
//             <div className="rounded-xl bg-slate-50 p-3 text-center">
//               <p className="font-bold text-slate-900">{tutor.hoursTaught}h</p>
//               <p className="text-xs text-slate-500">Hours Taught</p>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Bio</h4>
//             <p className="text-sm text-slate-600 leading-relaxed">{tutor.bio || 'No biography provided.'}</p>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Subjects</h4>
//               <div className="flex flex-wrap gap-1">
//                 {tutor.subjects.map((s) => (
//                   <span key={s} className="rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Languages</h4>
//               <div className="flex flex-wrap gap-1">
//                 {tutor.languages.map((l) => (
//                   <span key={l} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
//                     {l}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Curricula</h4>
//               <div className="flex flex-wrap gap-1">
//                 {tutor.curricula.map((c) => (
//                   <span key={c} className="rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
//                     {c}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Levels</h4>
//               <div className="flex flex-wrap gap-1">
//                 {tutor.educationLevels.map((l) => (
//                   <span key={l} className="rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
//                     {l}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 pt-2">
//             <div
//               className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
//                 tutor.available ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'
//               }`}
//             >
//               <span className={`h-2 w-2 rounded-full ${tutor.available ? 'bg-green-500' : 'bg-slate-400'}`} />
//               {tutor.available ? 'Currently Available' : 'Currently Unavailable'}
//             </div>
//             <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
//               <GraduationCap size={12} />
//               {tutor.matchPercent}% Match
//             </div>
//           </div>
//         </div>
//       </div>
//     </ModalOverlay>
//   );
// }

// /* ─── Delete Confirmation Modal ─── */
// function DeleteModal({
//   tutor,
//   onConfirm,
//   onClose,
//   isDeleting,
// }: {
//   tutor: Tutor;
//   onConfirm: () => void;
//   onClose: () => void;
//   isDeleting: boolean;
// }) {
//   return (
//     <ModalOverlay onClose={onClose}>
//       <div className="p-6 text-center">
//         <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
//           <Trash2 size={24} className="text-red-600" />
//         </div>
//         <h2 className="text-lg font-bold text-slate-900">Delete Tutor</h2>
//         <p className="mt-1 text-sm text-slate-500">
//           Are you sure you want to delete <span className="font-semibold text-slate-700">{tutor.name}</span>? This action
//           cannot be undone.
//         </p>
//         <div className="mt-6 flex items-center justify-center gap-3">
//           <button
//             onClick={onClose}
//             className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={isDeleting}
//             className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {isDeleting && <Spinner size={14} />}
//             Delete Tutor
//           </button>
//         </div>
//       </div>
//     </ModalOverlay>
//   );
// }

// /* ─── Main Page ─── */
// export default function AdminTutors() {
//   const [tutors, setTutors] = useState<Tutor[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadError, setLoadError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [modal, setModal] = useState<ModalState>({ type: 'none' });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [toasts, setToasts] = useState<ToastMessage[]>([]);

//   const pushToast = (type: ToastType, message: string) => {
//     const id = ++toastId;
//     setToasts((prev) => [...prev, { id, type, message }]);
//     setTimeout(() => {
//       setToasts((prev) => prev.filter((t) => t.id !== id));
//     }, 4000);
//   };

//   const dismissToast = (id: number) => {
//     setToasts((prev) => prev.filter((t) => t.id !== id));
//   };

//   const loadTutors = async () => {
//     setIsLoading(true);
//     setLoadError(null);
//     try {
//       const res = await apiClient.get('/tutors');
//       setTutors(res.data);
//     } catch (error) {
//       setLoadError(extractErrorMessage(error));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadTutors();
//   }, []);

//   const filteredTutors = useMemo(() => {
//     const term = searchTerm.trim().toLowerCase();
//     if (!term) return tutors;
//     return tutors.filter((tutor) =>
//       [tutor.name, tutor.title, tutor.country, tutor.bio].some((field) =>
//         field?.toLowerCase().includes(term)
//       )
//     );
//   }, [tutors, searchTerm]);

//   const closeModal = () => setModal({ type: 'none' });

//   const handleCreate = async (payload: TutorPayload) => {
//     setIsSubmitting(true);
//     try {
//       await apiClient.post('/tutors', payload);
//       await loadTutors();
//       closeModal();
//       pushToast('success', 'Tutor added successfully.');
//     } catch (error) {
//       pushToast('error', extractErrorMessage(error));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdate = async (id: number, payload: TutorPayload) => {
//     setIsSubmitting(true);
//     try {
//       await apiClient.put(`/tutors/${id}`, payload);
//       await loadTutors();
//       closeModal();
//       pushToast('success', 'Tutor updated successfully.');
//     } catch (error) {
//       pushToast('error', extractErrorMessage(error));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async (tutor: Tutor) => {
//     setIsDeleting(true);
//     try {
//       await apiClient.delete(`/tutors/${tutor.id}`);
//       setTutors((prev) => prev.filter((t) => t.id !== tutor.id));
//       closeModal();
//       pushToast('success', 'Tutor deleted successfully.');
//     } catch (error) {
//       pushToast('error', extractErrorMessage(error));
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <ToastContainer toasts={toasts} onDismiss={dismissToast} />

//       {/* Modals */}
//       {modal.type === 'create' && (
//         <TutorFormModal
//           mode="create"
//           onSubmit={handleCreate}
//           onClose={closeModal}
//           isSubmitting={isSubmitting}
//         />
//       )}
//       {modal.type === 'edit' && (
//         <TutorFormModal
//           mode="edit"
//           tutor={modal.tutor}
//           onSubmit={(data) => handleUpdate(modal.tutor.id, data)}
//           onClose={closeModal}
//           isSubmitting={isSubmitting}
//         />
//       )}
//       {modal.type === 'view' && <ViewTutorModal tutor={modal.tutor} onClose={closeModal} />}
//       {modal.type === 'delete' && (
//         <DeleteModal
//           tutor={modal.tutor}
//           onConfirm={() => handleDelete(modal.tutor)}
//           onClose={closeModal}
//           isDeleting={isDeleting}
//         />
//       )}

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">Tutor Management</h1>
//             <p className="mt-1 text-sm text-slate-500">Manage all tutors in the platform.</p>
//           </div>
//           <button
//             onClick={() => setModal({ type: 'create' })}
//             className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 hover:shadow-lg transition-all"
//           >
//             <Plus size={16} /> Add Tutor
//           </button>
//         </div>

//         {/* Search */}
//         <div className="mt-6 relative max-w-md">
//           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by name, title, country, or bio..."
//             className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-shadow focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
//           />
//         </div>

//         {/* Content */}
//         <div className="mt-8">
//           {isLoading ? (
//             <div className="flex flex-col items-center justify-center py-24 text-slate-400">
//               <Spinner size={32} className="text-brand-500" />
//               <p className="mt-3 text-sm font-medium">Loading tutors...</p>
//             </div>
//           ) : loadError ? (
//             <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50 py-16 text-center">
//               <p className="text-sm font-medium text-red-700">{loadError}</p>
//               <button
//                 onClick={loadTutors}
//                 className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
//               >
//                 Try again
//               </button>
//             </div>
//           ) : filteredTutors.length === 0 ? (
//             <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white py-24 text-center">
//               <Users size={32} className="text-slate-300" />
//               <p className="text-sm font-medium text-slate-500">
//                 {tutors.length === 0 ? 'No tutors found' : 'No tutors match your search'}
//               </p>
//               {tutors.length === 0 && (
//                 <button
//                   onClick={() => setModal({ type: 'create' })}
//                   className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
//                 >
//                   <Plus size={14} /> Add your first tutor
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//               {filteredTutors.map((tutor) => (
//                 <TutorCard
//                   key={tutor.id}
//                   tutor={tutor}
//                   onView={(t) => setModal({ type: 'view', tutor: t })}
//                   onEdit={(t) => setModal({ type: 'edit', tutor: t })}
//                   onDelete={(t) => setModal({ type: 'delete', tutor: t })}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Users, X, Eye, Pencil, Trash2, Star, MapPin, BookOpen, Clock, GraduationCap, Globe, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import apiClient from '@/lib/api';

/* ─── Types ─── */
interface Tutor {
  id: number;
  name: string;
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

type ModalState =
  | { type: 'none' }
  | { type: 'create' }
  | { type: 'edit'; tutor: Tutor }
  | { type: 'view'; tutor: Tutor }
  | { type: 'delete'; tutor: Tutor };

type ToastType = 'success' | 'error' | 'info';
interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

type TutorPayload = Omit<Tutor, 'id' | 'rating' | 'reviews' | 'matchPercent' | 'students' | 'hoursTaught'>;

/* ─── Helpers ─── */
const extractErrorMessage = (err: unknown): string => {
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;
  if (err && typeof err === 'object' && 'message' in err) return String((err as any).message);
  return 'Something went wrong. Please try again.';
};

/** Safely extract an array from an API response (handles axios, fetch, wrapped objects, etc.) */
const normalizeArrayResponse = (res: any): any[] => {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.data)) return res.data.data;
  if (Array.isArray(res?.results)) return res.results;
  if (Array.isArray(res?.tutors)) return res.tutors;
  return [];
};

let toastId = 0;

/* ─── Spinner ─── */
function Spinner({ size = 24, className = '' }: { size?: number; className?: string }) {
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

/* ─── Toast Container ─── */
function ToastContainer({ toasts, onDismiss }: { toasts: ToastMessage[]; onDismiss: (id: number) => void }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg border text-sm font-medium min-w-[280px] animate-in slide-in-from-right fade-in duration-300 ${
            t.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : t.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          {t.type === 'success' && <CheckCircle size={16} className="text-green-600 shrink-0" />}
          {t.type === 'error' && <XCircle size={16} className="text-red-600 shrink-0" />}
          <span className="flex-1">{t.message}</span>
          <button onClick={() => onDismiss(t.id)} className="shrink-0 opacity-60 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ─── Tutor Card ─── */
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
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
      {/* Actions */}
      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onView(tutor)}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          title="View"
        >
          <Eye size={16} />
        </button>
        <button
          onClick={() => onEdit(tutor)}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onDelete(tutor)}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Header */}
      <div className="flex items-start gap-4">
        <img
          src={tutor.avatar || 'https://via.placeholder.com/80'}
          alt={tutor.name}
          className="h-16 w-16 rounded-xl object-cover border border-slate-100"
        />
        <div className="min-w-0 flex-1 pr-16">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900 truncate">{tutor.name}</h3>
            {tutor.verified && <CheckCircle size={14} className="text-blue-500 shrink-0" />}
          </div>
          <p className="text-sm text-slate-500 truncate">{tutor.title}</p>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={12} />
            <span>
              {tutor.country} {tutor.countryFlag}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-slate-50 px-3 py-2 text-center">
          <div className="flex items-center justify-center gap-1 text-amber-500">
            <Star size={12} fill="currentColor" />
            <span className="text-sm font-semibold">{tutor.rating}</span>
          </div>
          <p className="text-[10px] text-slate-400">{tutor.reviews} reviews</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2 text-center">
          <p className="text-sm font-semibold text-slate-700">{tutor.students}</p>
          <p className="text-[10px] text-slate-400">Students</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2 text-center">
          <p className="text-sm font-semibold text-slate-700">{tutor.hoursTaught}h</p>
          <p className="text-[10px] text-slate-400">Taught</p>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 space-y-2">
        <div className="flex flex-wrap gap-1">
          {tutor.subjects.slice(0, 3).map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700"
            >
              <BookOpen size={10} />
              {s}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="text-[11px] text-slate-400 px-1">+{tutor.subjects.length - 3}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {tutor.languages.slice(0, 2).map((l) => (
            <span
              key={l}
              className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
            >
              <Globe size={10} />
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-1 text-sm font-semibold text-slate-900">
          <DollarSign size={14} />
          {tutor.pricePerHour}
          <span className="text-xs font-normal text-slate-400">/hr</span>
        </div>
        <div
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
            tutor.available
              ? 'bg-green-50 text-green-700'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${tutor.available ? 'bg-green-500' : 'bg-slate-400'}`} />
          {tutor.available ? 'Available' : 'Unavailable'}
        </div>
      </div>
    </div>
  );
}

/* ─── Modal Wrapper ─── */
function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {children}
      </div>
    </div>
  );
}

/* ─── Tutor Form (Create / Edit) ─── */
function TutorFormModal({
  mode,
  tutor,
  onSubmit,
  onClose,
  isSubmitting,
}: {
  mode: 'create' | 'edit';
  tutor?: Tutor;
  onSubmit: (data: TutorPayload) => void;
  onClose: () => void;
  isSubmitting: boolean;
}) {
  const [form, setForm] = useState<TutorPayload>({
    name: tutor?.name ?? '',
    title: tutor?.title ?? '',
    avatar: tutor?.avatar ?? '',
    country: tutor?.country ?? '',
    countryFlag: tutor?.countryFlag ?? '',
    verified: tutor?.verified ?? false,
    experienceYears: tutor?.experienceYears ?? 0,
    subjects: tutor?.subjects ?? [],
    curricula: tutor?.curricula ?? [],
    educationLevels: tutor?.educationLevels ?? [],
    languages: tutor?.languages ?? [],
    pricePerHour: tutor?.pricePerHour ?? 0,
    available: tutor?.available ?? true,
    bio: tutor?.bio ?? '',
  });

  const [subjectInput, setSubjectInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');
  const [curriculumInput, setCurriculumInput] = useState('');
  const [levelInput, setLevelInput] = useState('');

  const update = <K extends keyof TutorPayload>(key: K, value: TutorPayload[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addTag = (key: 'subjects' | 'languages' | 'curricula' | 'educationLevels', value: string, clear: () => void) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (form[key].includes(trimmed)) return;
    update(key, [...form[key], trimmed]);
    clear();
  };

  const removeTag = (key: 'subjects' | 'languages' | 'curricula' | 'educationLevels', value: string) => {
    update(key, form[key].filter((v) => v !== value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all';
  const labelClass = 'block text-xs font-semibold text-slate-700 mb-1';

  return (
    <ModalOverlay onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            {mode === 'create' ? 'Add New Tutor' : 'Edit Tutor'}
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Name & Title */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Full Name</label>
              <input required className={inputClass} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="John Doe" />
            </div>
            <div>
              <label className={labelClass}>Title</label>
              <input required className={inputClass} value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Math Specialist" />
            </div>
          </div>

          {/* Avatar & Country */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Avatar URL</label>
              <input className={inputClass} value={form.avatar} onChange={(e) => update('avatar', e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className={labelClass}>Country</label>
              <input required className={inputClass} value={form.country} onChange={(e) => update('country', e.target.value)} placeholder="United States" />
            </div>
          </div>

          {/* Flag & Experience */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Country Flag (emoji)</label>
              <input className={inputClass} value={form.countryFlag} onChange={(e) => update('countryFlag', e.target.value)} placeholder="🇺🇸" maxLength={4} />
            </div>
            <div>
              <label className={labelClass}>Experience (years)</label>
              <input type="number" min={0} className={inputClass} value={form.experienceYears} onChange={(e) => update('experienceYears', Number(e.target.value))} />
            </div>
          </div>

          {/* Price & Verified */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Price / Hour ($)</label>
              <input type="number" min={0} className={inputClass} value={form.pricePerHour} onChange={(e) => update('pricePerHour', Number(e.target.value))} />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.verified}
                  onChange={(e) => update('verified', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm text-slate-700">Verified</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) => update('available', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm text-slate-700">Available</span>
              </label>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className={labelClass}>Bio</label>
            <textarea
              rows={3}
              className={`${inputClass} resize-none`}
              value={form.bio}
              onChange={(e) => update('bio', e.target.value)}
              placeholder="Short biography..."
            />
          </div>

          {/* Subjects */}
          <div>
            <label className={labelClass}>Subjects</label>
            <div className="flex gap-2 mb-1.5">
              <input
                className={inputClass}
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                placeholder="Add subject..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('subjects', subjectInput, () => setSubjectInput('')))}
              />
              <button
                type="button"
                onClick={() => addTag('subjects', subjectInput, () => setSubjectInput(''))}
                className="shrink-0 rounded-lg bg-slate-100 px-3 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {form.subjects.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">
                  {s}
                  <button type="button" onClick={() => removeTag('subjects', s)} className="hover:text-brand-900">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className={labelClass}>Languages</label>
            <div className="flex gap-2 mb-1.5">
              <input
                className={inputClass}
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                placeholder="Add language..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('languages', languageInput, () => setLanguageInput('')))}
              />
              <button
                type="button"
                onClick={() => addTag('languages', languageInput, () => setLanguageInput(''))}
                className="shrink-0 rounded-lg bg-slate-100 px-3 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {form.languages.map((l) => (
                <span key={l} className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                  {l}
                  <button type="button" onClick={() => removeTag('languages', l)} className="hover:text-slate-900">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Curricula */}
          <div>
            <label className={labelClass}>Curricula</label>
            <div className="flex gap-2 mb-1.5">
              <input
                className={inputClass}
                value={curriculumInput}
                onChange={(e) => setCurriculumInput(e.target.value)}
                placeholder="Add curriculum..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('curricula', curriculumInput, () => setCurriculumInput('')))}
              />
              <button
                type="button"
                onClick={() => addTag('curricula', curriculumInput, () => setCurriculumInput(''))}
                className="shrink-0 rounded-lg bg-slate-100 px-3 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {form.curricula.map((c) => (
                <span key={c} className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                  {c}
                  <button type="button" onClick={() => removeTag('curricula', c)} className="hover:text-purple-900">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Education Levels */}
          <div>
            <label className={labelClass}>Education Levels</label>
            <div className="flex gap-2 mb-1.5">
              <input
                className={inputClass}
                value={levelInput}
                onChange={(e) => setLevelInput(e.target.value)}
                placeholder="Add level..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('educationLevels', levelInput, () => setLevelInput('')))}
              />
              <button
                type="button"
                onClick={() => addTag('educationLevels', levelInput, () => setLevelInput(''))}
                className="shrink-0 rounded-lg bg-slate-100 px-3 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {form.educationLevels.map((l) => (
                <span key={l} className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                  {l}
                  <button type="button" onClick={() => removeTag('educationLevels', l)} className="hover:text-amber-900">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting && <Spinner size={14} />}
            {mode === 'create' ? 'Create Tutor' : 'Save Changes'}
          </button>
        </div>
      </form>
    </ModalOverlay>
  );
}

/* ─── View Tutor Modal ─── */
function ViewTutorModal({ tutor, onClose }: { tutor: Tutor; onClose: () => void }) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">Tutor Profile</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <img
            src={tutor.avatar || 'https://via.placeholder.com/100'}
            alt={tutor.name}
            className="h-20 w-20 rounded-2xl object-cover border border-slate-100"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">{tutor.name}</h3>
              {tutor.verified && <CheckCircle size={18} className="text-blue-500" />}
            </div>
            <p className="text-sm text-slate-500">{tutor.title}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {tutor.country} {tutor.countryFlag}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {tutor.experienceYears} years exp.
              </span>
              <span className="flex items-center gap-1">
                <DollarSign size={14} />
                {tutor.pricePerHour}/hr
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
                <Star size={14} fill="currentColor" />
                <span className="font-bold text-slate-900">{tutor.rating}</span>
              </div>
              <p className="text-xs text-slate-500">{tutor.reviews} reviews</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="font-bold text-slate-900">{tutor.students}</p>
              <p className="text-xs text-slate-500">Students</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="font-bold text-slate-900">{tutor.hoursTaught}h</p>
              <p className="text-xs text-slate-500">Hours Taught</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Bio</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{tutor.bio || 'No biography provided.'}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Subjects</h4>
              <div className="flex flex-wrap gap-1">
                {tutor.subjects.map((s) => (
                  <span key={s} className="rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Languages</h4>
              <div className="flex flex-wrap gap-1">
                {tutor.languages.map((l) => (
                  <span key={l} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Curricula</h4>
              <div className="flex flex-wrap gap-1">
                {tutor.curricula.map((c) => (
                  <span key={c} className="rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Levels</h4>
              <div className="flex flex-wrap gap-1">
                {tutor.educationLevels.map((l) => (
                  <span key={l} className="rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                tutor.available ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${tutor.available ? 'bg-green-500' : 'bg-slate-400'}`} />
              {tutor.available ? 'Currently Available' : 'Currently Unavailable'}
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <GraduationCap size={12} />
              {tutor.matchPercent}% Match
            </div>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* ─── Delete Confirmation Modal ─── */
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
    <ModalOverlay onClose={onClose}>
      <div className="p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <Trash2 size={24} className="text-red-600" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Delete Tutor</h2>
        <p className="mt-1 text-sm text-slate-500">
          Are you sure you want to delete <span className="font-semibold text-slate-700">{tutor.name}</span>? This action
          cannot be undone.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDeleting && <Spinner size={14} />}
            Delete Tutor
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* ─── Main Page ─── */
export default function AdminTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState<ModalState>({ type: 'none' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = (type: ToastType, message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loadTutors = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await apiClient.get('/tutors');
      console.log(res.data.tutors)
      const list = normalizeArrayResponse(res.data.tutors);
      setTutors(list);
    } catch (error) {
      setLoadError(extractErrorMessage(error));
      setTutors([]); // ensure array even on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTutors();
  }, []);

  const filteredTutors = useMemo(() => {
    if (!Array.isArray(tutors)) return [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return tutors;
    return tutors.filter((tutor) =>
      [tutor.name, tutor.title, tutor.country, tutor.bio].some((field) =>
        field?.toLowerCase().includes(term)
      )
    );
  }, [tutors, searchTerm]);

  const closeModal = () => setModal({ type: 'none' });

  const handleCreate = async (payload: TutorPayload) => {
    setIsSubmitting(true);
    try {
      await apiClient.post('/tutors', payload);
      await loadTutors();
      closeModal();
      pushToast('success', 'Tutor added successfully.');
    } catch (error) {
      pushToast('error', extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id: number, payload: TutorPayload) => {
    setIsSubmitting(true);
    try {
      await apiClient.put(`/tutors/${id}`, payload);
      await loadTutors();
      closeModal();
      pushToast('success', 'Tutor updated successfully.');
    } catch (error) {
      pushToast('error', extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (tutor: Tutor) => {
    setIsDeleting(true);
    try {
      await apiClient.delete(`/tutors/${tutor.id}`);
      setTutors((prev) => prev.filter((t) => t.id !== tutor.id));
      closeModal();
      pushToast('success', 'Tutor deleted successfully.');
    } catch (error) {
      pushToast('error', extractErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Modals */}
      {modal.type === 'create' && (
        <TutorFormModal
          mode="create"
          onSubmit={handleCreate}
          onClose={closeModal}
          isSubmitting={isSubmitting}
        />
      )}
      {modal.type === 'edit' && (
        <TutorFormModal
          mode="edit"
          tutor={modal.tutor}
          onSubmit={(data) => handleUpdate(modal.tutor.id, data)}
          onClose={closeModal}
          isSubmitting={isSubmitting}
        />
      )}
      {modal.type === 'view' && <ViewTutorModal tutor={modal.tutor} onClose={closeModal} />}
      {modal.type === 'delete' && (
        <DeleteModal
          tutor={modal.tutor}
          onConfirm={() => handleDelete(modal.tutor)}
          onClose={closeModal}
          isDeleting={isDeleting}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Tutor Management</h1>
            <p className="mt-1 text-sm text-slate-500">Manage all tutors in the platform.</p>
          </div>
          <button
            onClick={() => setModal({ type: 'create' })}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 hover:shadow-lg transition-all"
          >
            <Plus size={16} /> Add Tutor
          </button>
        </div>

        {/* Search */}
        <div className="mt-6 relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, title, country, or bio..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-shadow focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        {/* Content */}
        <div className="mt-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <Spinner size={32} className="text-brand-500" />
              <p className="mt-3 text-sm font-medium">Loading tutors...</p>
            </div>
          ) : loadError ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50 py-16 text-center">
              <p className="text-sm font-medium text-red-700">{loadError}</p>
              <button
                onClick={loadTutors}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : filteredTutors.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white py-24 text-center">
              <Users size={32} className="text-slate-300" />
              <p className="text-sm font-medium text-slate-500">
                {tutors.length === 0 ? 'No tutors found' : 'No tutors match your search'}
              </p>
              {tutors.length === 0 && (
                <button
                  onClick={() => setModal({ type: 'create' })}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
                >
                  <Plus size={14} /> Add your first tutor
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTutors.map((tutor) => (
                <TutorCard
                  key={tutor.id}
                  tutor={tutor}
                  onView={(t) => setModal({ type: 'view', tutor: t })}
                  onEdit={(t) => setModal({ type: 'edit', tutor: t })}
                  onDelete={(t) => setModal({ type: 'delete', tutor: t })}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}