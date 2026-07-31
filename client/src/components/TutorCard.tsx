import {
  BadgeCheck,
  BookMarked,
  CalendarCheck,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { useState , useEffect } from "react";
import SmartImage from "@/components/SmartImage";
import apiClient from "@/lib/api";
// import type { Tutor } from '@/data/catalog';

type Props = {
  tutor: Tutor;
  index: number;
};


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

export default function TutorCard({ tutor, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [tutors, setTutors] = useState<Tutor[]>([]);

  // const load = async () => {
 
  //   try {
  //     const res = await apiClient.get("/tutors");
  //     // Backend returns: { success: true, count: N, tutors: [...] }
  //     const list = res.data?.tutors ?? [];
  //     setTutors(Array.isArray(list) ? list : []);
  //   } catch (err: any) {
  //     alert(err);
  //     setTutors([]);
  //   } finally {
  //   }
  // };

  // useEffect(() => {
  //   load();
  // }, []);

  return (
    <article
      className="overflow-hidden rounded-4xl bg-white shadow-soft transition-all duration-300 hover:shadow-soft-lg"
      style={{
        animation: `fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 90}ms both`,
      }}
    >
      {/* Profile image + top overlay */}
      <div className="relative">
        <div className="h-44 bg-gradient-to-br from-eqraa-beige to-eqraa-beige-dark/60" />
        <SmartImage
          src={tutor.avatar}
          alt={tutor.name}
          className="absolute left-1/2 top-6 h-28 w-28 -translate-x-1/2 rounded-2xl object-cover shadow-soft-lg ring-4 ring-white"
          loading="lazy"
        />
      </div>

      <div className="px-6 pb-6 pt-16">
        {/* Name + verified */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <h3 className="text-xl font-bold text-eqraa-brown-dark">
              {tutor.name}
            </h3>
            {tutor.verified && (
              <BadgeCheck
                size={20}
                className="text-eqraa-brown"
                aria-label="Verified tutor"
              />
            )}
          </div>
          <p className="mt-1 text-sm text-eqraa-brown-dark/65">{tutor.title}</p>
        </div>

        {/* Experience stat */}
        <div className="mt-5 flex justify-center">
          <div className="rounded-2xl bg-eqraa-beige-light px-6 py-3 text-center">
            <CalendarCheck size={16} className="mx-auto text-eqraa-brown" />
            <p className="mt-1 text-sm font-bold text-eqraa-brown-dark">
              {tutor.experienceYears}y
            </p>
            <p className="text-[11px] text-eqraa-brown-dark/55">Experience</p>
          </div>
        </div>

        {/* Subjects */}
        <div className="mt-5 space-y-3">
          <div className="flex items-start gap-2.5">
            <BookMarked
              size={16}
              className="mt-0.5 shrink-0 text-eqraa-brown"
            />
            <div className="flex flex-wrap gap-1.5">
              {tutor.subjects.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-eqraa-beige px-2.5 py-1 text-xs font-medium text-eqraa-brown-dark capitalize"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-5">
          <p
            className={`text-sm leading-relaxed text-eqraa-brown-dark/70 ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {tutor.bio}
          </p>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-eqraa-brown transition-colors hover:text-eqraa-brown-dark"
          >
            {expanded ? "Show less" : "Read More"}
            <ChevronDown
              size={14}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Availability + price */}
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-eqraa-beige-light px-4 py-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
              tutor.available ? "text-emerald-700" : "text-eqraa-brown-dark/50"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                tutor.available ? "bg-emerald-500" : "bg-eqraa-brown-dark/30"
              }`}
            />
            {tutor.available ? "Available now" : "Fully booked"}
          </span>
          <div className="text-right">
            <span className="text-lg font-bold text-eqraa-brown">
              {tutor.pricePerHour} EGP
            </span>
            <span className="text-xs text-eqraa-brown-dark/55">/hour</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5">
          <a
            href={`https://wa.me/201038232883?text=${encodeURIComponent(`Hi, I'd like to book a session with ${tutor.name}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            <Calendar size={18} />
            Book Now
          </a>
        </div>
      </div>
    </article>
  );
}
