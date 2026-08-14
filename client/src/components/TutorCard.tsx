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
      className="group overflow-hidden rounded-3xl bg-gradient-to-br from-white to-eqraa-beige-light/30 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-white/50"
      style={{
        animation: `fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 90}ms both`,
      }}
    >
      {/* Premium header badge */}
      <div className="absolute top-3 right-3 z-10">
        {tutor.verified && (
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-md">
            <BadgeCheck size={16} className="text-amber-500" />
            <span className="text-xs font-semibold text-eqraa-brown">Verified</span>
          </div>
        )}
      </div>

      {/* Gradient background header */}
      <div className="h-24 bg-gradient-to-r from-eqraa-brown/10 via-eqraa-beige to-eqraa-brown/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-eqraa-brown/5 blur-3xl" />
        </div>
      </div>

      {/* Avatar - more prominent and modern */}
      <div className="px-6 pb-4">
        <div className="relative -mt-12 mb-4">
          <div className="mx-auto w-fit">
            <div className="relative inline-block">
              <SmartImage
                src={tutor.avatar}
                alt={tutor.name}
                className="h-24 w-24 rounded-2xl object-cover shadow-xl ring-4 ring-white group-hover:ring-eqraa-brown/30 transition-all duration-300"
                loading="lazy"
              />
              {tutor.available && (
                <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-emerald-500 ring-2 ring-white" />
              )}
            </div>
          </div>
        </div>

        {/* Name + title */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-eqraa-brown-dark">
            {tutor.name}
          </h3>
          <p className="text-sm text-eqraa-brown/70 font-medium">{tutor.title}</p>
        </div>

        {/* Quick stats */}
        <div className="mb-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 text-center hover:bg-eqraa-beige/50 transition-colors">
            <p className="text-xs text-eqraa-brown-dark/60">Experience</p>
            <p className="text-sm font-bold text-eqraa-brown">{tutor.experienceYears} years</p>
          </div>
        </div>

        {/* Subjects - refined tag style */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-eqraa-brown-dark/70 mb-2">Subjects</p>
          <div className="flex flex-wrap gap-1.5">
            {tutor.subjects.slice(0, 3).map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-full bg-eqraa-brown/10 px-2.5 py-1 text-xs font-medium text-eqraa-brown capitalize hover:bg-eqraa-brown/20 transition-colors"
              >
                {s}
              </span>
            ))}
            {tutor.subjects.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-eqraa-beige px-2.5 py-1 text-xs font-medium text-eqraa-brown-dark">
                +{tutor.subjects.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p
            className={`text-sm leading-relaxed text-eqraa-brown-dark/70 ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {tutor.bio}
          </p>
          {tutor.bio.length > 80 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-1.5 text-xs font-semibold text-eqraa-brown hover:text-eqraa-brown-dark transition-colors inline-flex items-center gap-1"
            >
              {expanded ? "Show less" : "Read more"}
              <ChevronDown
                size={12}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>

        {/* Price and availability */}
        <div className="flex items-center justify-between mb-4 pb-4 border-t border-eqraa-beige/50">
          <div className="pt-4">
            <p className="text-xs text-eqraa-brown-dark/60">Price per hour</p>
            <p className="text-xl font-bold text-eqraa-brown">{tutor.pricePerHour} EGP</p>
          </div>
          <div className="pt-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                tutor.available
                  ? "bg-emerald-100/70 text-emerald-700"
                  : "bg-eqraa-beige-light text-eqraa-brown-dark/50"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  tutor.available ? "bg-emerald-500" : "bg-eqraa-brown-dark/30"
                }`}
              />
              {tutor.available ? "Available" : "Fully booked"}
            </span>
          </div>
        </div>

        {/* Action button - modern style */}
        <a
          href={`https://wa.me/201038232883?text=${encodeURIComponent(`Hi, I'd like to book a session with ${tutor.name}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-eqraa-brown to-eqraa-brown-dark text-white font-semibold py-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 group/btn"
        >
          <Calendar size={18} className="group-hover/btn:rotate-12 transition-transform" />
          <span>Book Now</span>
        </a>
      </div>
    </article>
  );
}
