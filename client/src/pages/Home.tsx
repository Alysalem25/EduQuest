import { Link } from 'react-router-dom';
import SmartImage from '@/components/SmartImage';
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Target,
  Laptop,
  Star,
  Search,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Sparkles,
  Quote,
} from 'lucide-react';
import { popularSubjects } from '@/data/catalog';
import WhyChooseSwiper from '@/components/WhyChooseSwiper';

const whyChoose = [
  {
    icon: ShieldCheck,
    emoji: '📚',
    title: 'Verified Tutors',
    text: 'Every tutor is background-checked and credential-verified before joining Eqraa.',
    img: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    icon: Target,
    emoji: '🎯',
    title: 'Perfect Matching',
    text: 'Our smart matching pairs each student with the tutor who fits their exact needs.',
    img: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    icon: Laptop,
    emoji: '💻',
    title: 'Online Learning',
    text: 'Learn from anywhere with a seamless virtual classroom and flexible scheduling.',
    img: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    icon: Star,
    emoji: '⭐',
    title: 'High-Quality Education',
    text: 'Rigorously rated lessons ensure consistent, top-tier learning outcomes.',
    img: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

const howItWorks = [
  {
    icon: Search,
    step: 'Step 1',
    title: 'Choose Subject',
    text: 'Pick from 150+ subjects — from mathematics and physics to languages and programming.',
  },
  {
    icon: GraduationCap,
    step: 'Step 2',
    title: 'Choose Education Level',
    text: 'Select the right stage: kindergarten, primary, middle, or high school.',
  },  
  {
    icon: BookOpen,
    step: 'Step 3',
    title: 'Choose Curriculum & Book',
    text: 'Match by curriculum — Egyptian National, American, or British (IGCSE) — then book instantly.',
  },  
];

const testimonials = [
  {
    name: 'Mona Saleh',
    role: 'Parent of a high-school student',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Eqraa matched my daughter with an incredible physics tutor in minutes. Her grades went from C to A in one term. The whole process was effortless.',
  },
  {
    name: 'Youssef Ibrahim',
    role: 'IGCSE Student',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'I found a chemistry tutor who actually understood the IGCSE syllabus. Booking was instant and the online classroom works perfectly on my laptop.',
  },
  {
    name: 'Reem Adel',
    role: 'Parent of two',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Having both my kids tutored through one platform saved me hours every week. The tutors are verified, kind, and genuinely effective.',
  },
];

const stats = [
  { value: '150+', label: 'Subjects' },
  { value: '2,400+', label: 'Verified Tutors' },
  { value: '18k+', label: 'Happy Students' },
  // { value: '4.9', label: 'Average Rating' },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ===== Hero ===== */}
      <section className="relative bg-eqraa-beige-light pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Abstract shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-eqraa-beige/60 blur-3xl" />
          <div className="absolute right-[-10%] top-40 h-96 w-96 rounded-full bg-eqraa-beige-dark/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-eqraa-brown/5 blur-3xl" />
          <svg className="absolute left-8 top-32 animate-float-slow text-eqraa-brown/15" width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
          </svg>
          <svg className="absolute right-20 bottom-24 animate-float text-eqraa-brown/20" width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M22 4l5.5 12.5L40 18l-9 9 2 14-11-6-11 6 2-14-9-9 12.5-1.5L22 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="container-px relative grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="section-eyebrow">
              <Sparkles size={14} />
              Your path to the right tutor
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-eqraa-brown-dark sm:text-5xl lg:text-6xl">
              Learn with the{' '}
              <span className="relative whitespace-nowrap text-eqraa-brown">
                Right Tutor
                <svg className="absolute -bottom-2 left-0 w-full text-eqraa-beige-dark" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 9C60 3 240 3 298 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              .
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-eqraa-brown-dark/70">
              Discover experienced teachers for every subject, education level, and
              curriculum. Verified, matched, and ready to help you succeed.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link to="/find-tutor" className="group btn-primary text-base">
                Find Your Tutor
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#why-choose" className="btn-secondary text-base">
                <Play size={18} />
                Learn More
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-bold text-eqraa-brown sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-sm text-eqraa-brown-dark/60">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero illustration */}
          <div className="relative animate-fade-up [animation-delay:150ms]">
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-eqraa-beige to-eqraa-beige-dark/50" />
              <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-soft-xl">
                <SmartImage
                  src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="Students learning online with a tutor"
                  className="h-[420px] w-full object-cover lg:h-[480px]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eqraa-brown-dark/30 to-transparent" />
              </div>

              {/* Floating cards */}
              <div className="absolute -left-6 top-16 animate-float rounded-2xl bg-white p-4 shadow-soft-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-eqraa-beige text-eqraa-brown">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-eqraa-brown-dark">Verified</p>
                    <p className="text-xs text-eqraa-brown-dark/60">Background checked</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-20 animate-float-slow rounded-2xl bg-white p-4 shadow-soft-lg">
                <div className="flex items-center gap-2">
                  <Star size={18} className="fill-eqraa-brown text-eqraa-brown" />
                  <span className="text-sm font-bold text-eqraa-brown-dark">High-Quality</span>
                  <span className="text-xs text-eqraa-brown-dark/60">Education</span>
                </div>
              </div>

              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 animate-float rounded-2xl gradient-brown p-4 text-white shadow-soft-lg [animation-delay:1s]">
                <div className="flex items-center gap-3">
                  <Laptop size={20} />
                  <span className="text-sm font-semibold">Online Classroom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why Choose Eqraa ===== */}
      {/* <section id="why-choose" className="bg-white py-20 lg:py-28"> */}
        {/* <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Why Eqraa</span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-eqraa-brown-dark sm:text-4xl">
              Why Choose Eqraa
            </h2>
            <p className="mt-4 text-lg text-eqraa-brown-dark/65">
              We make finding a great tutor simple, safe, and effective — so learning
              always feels personal.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="group rounded-4xl border border-eqraa-beige/70 bg-eqraa-beige-light p-8 transition-all duration-300 hover:-translate-y-2 hover:border-eqraa-brown/30 hover:bg-white hover:shadow-soft-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-soft transition-all duration-300 group-hover:gradient-brown group-hover:text-white">
                  <span className="group-hover:hidden">{item.emoji}</span>
                  <item.icon size={28} className="hidden text-white group-hover:block" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-eqraa-brown-dark">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-eqraa-brown-dark/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div> */}
        <WhyChooseSwiper />
      {/* </section> */}

      {/* ===== How It Works ===== */}
      <section className="bg-eqraa-beige-light py-20 lg:py-28">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Simple Process</span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-eqraa-brown-dark sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-eqraa-brown-dark/65">
              Three easy steps stand between you and your perfect tutor.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                {/* Connector arrow */}
                {i < howItWorks.length - 1 && (
                  <div className="absolute left-[calc(50%+3.5rem)] top-10 hidden h-0.5 w-[calc(100%-7rem)] bg-gradient-to-r from-eqraa-brown/40 to-eqraa-beige-dark md:block">
                    <ArrowRight
                      size={20}
                      className="absolute -right-2 -top-2.5 text-eqraa-brown/50"
                    />
                  </div>
                )}

                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-soft">
                  <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full gradient-brown text-xs font-bold text-white">
                    {i + 1}
                  </div>
                  <step.icon size={34} className="text-eqraa-brown" />
                </div>

                <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-eqraa-brown">
                  {step.step}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-eqraa-brown-dark">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-eqraa-brown-dark/65">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/find-tutor"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-eqraa-brown px-8 py-4 text-base font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg"
            >
              Find Your Tutor
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Popular Subjects ===== */}
      {/* <section className="bg-white py-20 lg:py-28">
        <div className="container-px">
          <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
            <div className="max-w-2xl">
              <span className="section-eyebrow">Explore</span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-eqraa-brown-dark sm:text-4xl">
                Popular Subjects
              </h2>
              <p className="mt-4 text-lg text-eqraa-brown-dark/65">
                Browse the subjects parents and students search for most.
              </p>
            </div>
            <Link
              to="/find-tutor"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-eqraa-brown"
            >
              View all subjects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {popularSubjects.map((subject) => (
              <Link
                key={subject.id}
                to="/find-tutor"
                className="group flex flex-col items-center gap-3 rounded-3xl border border-eqraa-beige/70 bg-eqraa-beige-light p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-eqraa-brown/30 hover:bg-white hover:shadow-soft-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-eqraa-brown shadow-soft transition-all duration-300 group-hover:gradient-brown group-hover:text-white">
                  <subject.icon size={26} />
                </div>
                <span className="text-sm font-medium text-eqraa-brown-dark">{subject.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* ===== Testimonials ===== */}
      {/* <section className="bg-eqraa-beige-light py-20 lg:py-28">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Loved by families</span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-eqraa-brown-dark sm:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-eqraa-brown-dark/65">
              Real stories from parents and students who found their perfect tutor.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex h-full flex-col rounded-4xl bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
              >
                <Quote size={36} className="text-eqraa-beige-dark" />
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} className="fill-eqraa-brown text-eqraa-brown" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-eqraa-brown-dark/75">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4 border-t border-eqraa-beige/70 pt-5">
                  <SmartImage
                    src={t.photo}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-eqraa-beige"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-semibold text-eqraa-brown-dark">{t.name}</p>
                    <p className="text-xs text-eqraa-brown-dark/60">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section> */}

    </div>
  );
}
