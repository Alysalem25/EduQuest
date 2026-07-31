import { FormEvent, useState } from 'react';
import { X } from 'lucide-react';
import { CreateTutorPayload, FormErrors, Tutor, TutorFormState, UpdateTutorPayload } from '../types/Tutor';
import { FieldError, Spinner } from './ui';
import TagInput from './TagInput';

interface TutorModalProps {
  mode: 'create' | 'edit';
  tutor?: Tutor;
  isSubmitting: boolean;
  onSubmit: (payload: CreateTutorPayload | UpdateTutorPayload) => Promise<void> | void;
  onClose: () => void;
}

function buildInitialState(tutor?: Tutor): TutorFormState {
  if (!tutor) {
    return {
      name: '',
      email: '',
      password: '',
      title: '',
      avatar: '',
      country: '',
      countryFlag: '',
      experienceYears: '',
      pricePerHour: '',
      bio: '',
      subjects: [],
      languages: [],
      curricula: [],
      educationLevels: [],
      verified: false,
      available: true,
    };
  }
  return {
    name: tutor.name,
    email: tutor.email,
    password: '',
    title: tutor.title,
    avatar: tutor.avatar,
    country: tutor.country,
    countryFlag: tutor.countryFlag,
    experienceYears: String(tutor.experienceYears),
    pricePerHour: String(tutor.pricePerHour),
    bio: tutor.bio,
    subjects: tutor.subjects,
    languages: tutor.languages,
    curricula: tutor.curricula,
    educationLevels: tutor.educationLevels,
    verified: tutor.verified,
    available: tutor.available,
  };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: TutorFormState, mode: 'create' | 'edit'): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = 'Name is required.';
  if (form.email.trim() && !EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (mode === 'create' && !form.password.trim()) {
    errors.password = 'Password is required.';
  } else if (form.password && form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  if (!form.title.trim()) errors.title = 'Title is required.';
  if (!form.country.trim()) errors.country = 'Country is required.';

  if (!form.pricePerHour.trim()) {
    errors.pricePerHour = 'Price per hour is required.';
  } else if (Number.isNaN(Number(form.pricePerHour)) || Number(form.pricePerHour) < 0) {
    errors.pricePerHour = 'Enter a valid non-negative number.';
  }

  if (form.experienceYears.trim() && (Number.isNaN(Number(form.experienceYears)) || Number(form.experienceYears) < 0)) {
    errors.experienceYears = 'Enter a valid non-negative number.';
  }

  return errors;
}

export default function TutorModal({ mode, tutor, isSubmitting, onSubmit, onClose }: TutorModalProps) {
  const [form, setForm] = useState<TutorFormState>(() => buildInitialState(tutor));
  const [errors, setErrors] = useState<FormErrors>({});

  const setField = <K extends keyof TutorFormState>(field: K, value: TutorFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev) => ({ ...prev, [field as string]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form, mode);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const basePayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      title: form.title.trim(),
      avatar: form.avatar.trim(),
      country: form.country.trim(),
      countryFlag: form.countryFlag.trim(),
      experienceYears: Number(form.experienceYears) || 0,
      pricePerHour: Number(form.pricePerHour),
      bio: form.bio.trim(),
      subjects: form.subjects,
      languages: form.languages,
      curricula: form.curricula,
      educationLevels: form.educationLevels,
      verified: form.verified,
      available: form.available,
    };

    if (mode === 'create') {
      await onSubmit({ ...basePayload, password: form.password } as CreateTutorPayload);
    } else {
      const payload: UpdateTutorPayload = { ...basePayload };
      if (form.password.trim()) payload.password = form.password;
      await onSubmit(payload);
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-shadow focus:ring-2 focus:ring-brand-500 ${
      errors[field] ? 'border-red-300 focus:border-red-400' : 'border-slate-300 focus:border-brand-500'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="modal-scroll w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-card-hover animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 rounded-t-2xl z-10">
          <h2 className="text-lg font-semibold text-slate-900">
            {mode === 'create' ? 'Add tutor' : 'Edit tutor'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Avatar URL</label>
              <input
                type="text"
                value={form.avatar}
                onChange={(e) => setField('avatar', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className={inputClass('avatar')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                className={inputClass('name')}
              />
              <FieldError message={errors.name} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                className={inputClass('email')}
              />
              <FieldError message={errors.email} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password {mode === 'edit' && <span className="font-normal text-slate-400">(optional)</span>}
                {mode === 'create' && ' *'}
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setField('password', e.target.value)}
                placeholder={mode === 'edit' ? 'Leave blank to keep current password' : ''}
                className={inputClass('password')}
              />
              <FieldError message={errors.password} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setField('title', e.target.value)}
                placeholder="e.g. Senior Math Tutor"
                className={inputClass('title')}
              />
              <FieldError message={errors.title} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Country *</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setField('country', e.target.value)}
                className={inputClass('country')}
              />
              <FieldError message={errors.country} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Country flag</label>
              <input
                type="text"
                value={form.countryFlag}
                onChange={(e) => setField('countryFlag', e.target.value)}
                placeholder="e.g. 🇪🇬"
                className={inputClass('countryFlag')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Experience (years)</label>
              <input
                type="number"
                min={0}
                value={form.experienceYears}
                onChange={(e) => setField('experienceYears', e.target.value)}
                className={inputClass('experienceYears')}
              />
              <FieldError message={errors.experienceYears} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Price per hour *</label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={form.pricePerHour}
                onChange={(e) => setField('pricePerHour', e.target.value)}
                className={inputClass('pricePerHour')}
              />
              <FieldError message={errors.pricePerHour} />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setField('bio', e.target.value)}
                rows={3}
                className={inputClass('bio')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TagInput
              label="Subjects"
              placeholder="e.g. Algebra"
              values={form.subjects}
              onChange={(v) => setField('subjects', v)}
            />
            <TagInput
              label="Languages"
              placeholder="e.g. English"
              values={form.languages}
              onChange={(v) => setField('languages', v)}
            />
            <TagInput
              label="Curricula"
              placeholder="e.g. IB, Common Core"
              values={form.curricula}
              onChange={(v) => setField('curricula', v)}
            />
            <TagInput
              label="Education levels"
              placeholder="e.g. High School"
              values={form.educationLevels}
              onChange={(v) => setField('educationLevels', v)}
            />
          </div>

          <div className="flex flex-wrap gap-6 pt-1">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={form.verified}
                onChange={(e) => setField('verified', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              Verified
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) => setField('available', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              Available
            </label>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-lg bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition-colors disabled:opacity-60"
            >
              {isSubmitting && <Spinner size={16} />}
              {isSubmitting ? 'Saving...' : mode === 'create' ? 'Add tutor' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
