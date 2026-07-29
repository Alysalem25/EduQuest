import { BadgeCheck, Clock, DollarSign, Mail, Users, X } from 'lucide-react';
import { Tutor } from '../types/Tutor';
import { Badge, StarRating } from './ui';

interface ViewTutorModalProps {
  tutor: Tutor;
  onClose: () => void;
}

function Section({ title, items, tone }: { title: string; items: string[]; tone: 'blue' | 'violet' | 'emerald' | 'slate' }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge key={item} tone={tone}>
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default function ViewTutorModal({ tutor, onClose }: ViewTutorModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="modal-scroll w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-card-hover animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-slate-900">Tutor profile</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={tutor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name)}&background=3366ff&color=fff`}
                alt={tutor.name}
                className="h-20 w-20 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              {tutor.verified && (
                <span className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5" title="Verified tutor">
                  <BadgeCheck size={20} className="fill-brand-500 text-white" />
                </span>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-semibold text-slate-900 truncate">{tutor.name}</h3>
              <p className="text-sm text-slate-500 truncate">{tutor.title}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
                <span className="text-base leading-none">{tutor.countryFlag}</span>
                {tutor.country}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
              <Mail size={16} className="text-slate-400" />
              <span className="truncate text-slate-700">{tutor.email}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
              <DollarSign size={16} className="text-brand-500" />
              <span className="font-medium text-slate-700">{tutor.pricePerHour}/hr</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
              <Users size={16} className="text-slate-400" />
              <span className="text-slate-700">{tutor.students} students</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
              <Clock size={16} className="text-slate-400" />
              <span className="text-slate-700">{tutor.hoursTaught}h taught</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
            <StarRating rating={tutor.rating} />
            <span className="text-sm text-slate-500">{tutor.reviews} reviews</span>
            <span className="text-sm text-slate-500">{tutor.experienceYears} yrs experience</span>
          </div>

          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              tutor.available ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${tutor.available ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            {tutor.available ? 'Available' : 'Offline'}
          </span>

          <Section title="Subjects" items={tutor.subjects} tone="blue" />
          <Section title="Languages" items={tutor.languages} tone="violet" />
          <Section title="Curricula" items={tutor.curricula} tone="emerald" />
          <Section title="Education levels" items={tutor.educationLevels} tone="slate" />

          {tutor.bio && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Bio</p>
              <p className="text-sm leading-relaxed text-slate-600">{tutor.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
