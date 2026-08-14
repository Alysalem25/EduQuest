// import { useState, useEffect, useCallback, useRef } from 'react';
// import { motion, PanInfo } from 'framer-motion';
// import { ArrowLeft, ArrowRight, ShieldCheck, Target, Laptop, Star } from 'lucide-react';

// const whyChoose = [
//   {
//     icon: ShieldCheck,
//     emoji: '📚',
//     title: 'Verified Tutors',
//     text: 'Every tutor is background-checked and credential-verified before joining Eqraa.',
//     img: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=900',
//   },
//   {
//     icon: Target,
//     emoji: '🎯',
//     title: 'Perfect Matching',
//     text: 'Our smart matching pairs each student with the tutor who fits their exact needs.',
//     img: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=900',
//   },
//   {
//     icon: Laptop,
//     emoji: '💻',
//     title: 'Online Learning',
//     text: 'Learn from anywhere with a seamless virtual classroom and flexible scheduling.',
//     img: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=900',
//   },
//   {
//     icon: Star,
//     emoji: '⭐',
//     title: 'High-Quality Education',
//     text: 'Rigorously rated lessons ensure consistent, top-tier learning outcomes.',
//     img: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=900',
//   },
// ];

// /* ------------------------------------------------------------------ */
// /*  Soft 3D Carousel — Why Choose Eqraa                                */
// /*  Requires: npm install framer-motion                                */
// /* ------------------------------------------------------------------ */

// export default function WhyChooseSwiper() {
//   const [index, setIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const AUTO_DELAY = 5000;

//   const paginate = useCallback((dir: number) => {
//     setIndex((prev) => {
//       let next = prev + dir;
//       if (next < 0) next = whyChoose.length - 1;
//       if (next >= whyChoose.length) next = 0;
//       return next;
//     });
//     setProgress(0);
//   }, []);

//   const goTo = useCallback((i: number) => {
//     setIndex(i);
//     setProgress(0);
//   }, []);

//   /* Auto-play + progress bar */
//   useEffect(() => {
//     if (isHovered) {
//       if (autoPlayRef.current) clearInterval(autoPlayRef.current);
//       if (progressRef.current) clearInterval(progressRef.current);
//       return;
//     }

//     autoPlayRef.current = setInterval(() => paginate(1), AUTO_DELAY);
//     progressRef.current = setInterval(() => {
//       setProgress((p) => Math.min(p + 100 / (AUTO_DELAY / 50), 100));
//     }, 50);

//     return () => {
//       if (autoPlayRef.current) clearInterval(autoPlayRef.current);
//       if (progressRef.current) clearInterval(progressRef.current);
//     };
//   }, [isHovered, paginate]);

//   /* Keyboard navigation */
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === 'ArrowLeft') paginate(-1);
//       if (e.key === 'ArrowRight') paginate(1);
//     };
//     window.addEventListener('keydown', onKey);
//     return () => window.removeEventListener('keydown', onKey);
//   }, [paginate]);

//   const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
//     if (info.offset.x > 80) paginate(-1);
//     else if (info.offset.x < -80) paginate(1);
//   };

//   const getOffset = (i: number) => {
//     let raw = i - index;
//     const len = whyChoose.length;
//     if (raw > len / 2) raw -= len;
//     if (raw < -len / 2) raw += len;
//     return raw;
//   };

//   return (
//     <section
//       id="why-choose"
//       className="relative overflow-hidden bg-white py-20 lg:py-28"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* ── Ambient soft glows ── */}
//       <div className="pointer-events-none absolute inset-0" aria-hidden>
//         <div className="absolute left-1/4 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-eqraa-beige/30 blur-[120px]" />
//         <div className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-eqraa-beige-dark/20 blur-[100px]" />
//         <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-eqraa-brown/5 blur-[80px]" />
//       </div>

//       <div className="container-px relative">
//         {/* ── Header ── */}
//         <div className="mx-auto max-w-2xl text-center">
//           <span className="section-eyebrow">Why Eqraa</span>
//           <h2 className="mt-5 text-3xl font-bold tracking-tight text-eqraa-brown-dark sm:text-4xl">
//             Why Choose Eqraa
//           </h2>
//           <p className="mt-4 text-lg text-eqraa-brown-dark/65">
//             We make finding a great tutor simple, safe, and effective — so learning
//             always feels personal.
//           </p>
//         </div>

//         {/* ── 3D Carousel Stage ── */}
//         <div
//           className="relative mx-auto mt-16 h-[520px] max-w-5xl select-none"
//           style={{ perspective: '1100px' }}
//         >
//           {whyChoose.map((item, i) => {
//             const offset = getOffset(i);
//             const isActive = offset === 0;
//             const isSide = Math.abs(offset) === 1;
//             const isHidden = Math.abs(offset) > 1;

//             return (
//               <motion.div
//                 key={item.title}
//                 className="absolute left-1/2 top-0 w-full max-w-[22rem] -translate-x-1/2 will-change-transform"
//                 animate={{
//                   x: offset * 300,
//                   rotateY: offset * -22,
//                   scale: isActive ? 1 : isSide ? 0.82 : 0.7,
//                   opacity: isActive ? 1 : isSide ? 0.45 : 0,
//                 }}
//                 transition={{
//                   type: 'spring',
//                   stiffness: 260,
//                   damping: 26,
//                   mass: 0.8,
//                 }}
//                 style={{
//                   zIndex: isActive ? 20 : isSide ? 10 : 0,
//                   transformStyle: 'preserve-3d',
//                   pointerEvents: isActive ? 'auto' : 'none',
//                 }}
//                 drag={isActive ? 'x' : false}
//                 dragConstraints={{ left: 0, right: 0 }}
//                 dragElastic={0.18}
//                 onDragEnd={handleDragEnd}
//                 whileHover={isActive ? { scale: 1.03, y: -6 } : {}}
//                 whileTap={isActive ? { scale: 0.98 } : {}}
//               >
//                 {/* Card */}
//                 <div
//                   className={`relative h-[480px] overflow-hidden rounded-[2rem] border transition-shadow duration-500 ${
//                     isActive
//                       ? 'border-eqraa-brown/20 bg-white shadow-soft-2xl'
//                       : 'border-eqraa-beige/60 bg-eqraa-beige-light/60 shadow-soft'
//                   }`}
//                 >
//                   {/* ── Image Area ── */}
//                   <div className="relative h-[58%] overflow-hidden">
//                     <motion.img
//                       src={item.img}
//                       alt={item.title}
//                       className="h-full w-full object-cover"
//                       animate={isActive ? { scale: 1 } : { scale: 1.08 }}
//                       transition={{ duration: 0.7, ease: 'easeOut' }}
//                     />
//                     {/* Gradient overlays */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-eqraa-brown-dark/70 via-eqraa-brown-dark/20 to-transparent" />
//                     <div className="absolute inset-0 bg-gradient-to-br from-eqraa-brown/10 to-transparent" />

//                     {/* Soft floating icon badge */}
//                     <motion.div
//                       className="absolute bottom-4 left-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/95 text-eqraa-brown shadow-soft backdrop-blur-sm"
//                       animate={
//                         isActive
//                           ? { y: [0, -7, 0] }
//                           : { y: 0 }
//                       }
//                       transition={
//                         isActive
//                           ? { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }
//                           : { duration: 0.4 }
//                       }
//                     >
//                       <item.icon size={26} strokeWidth={1.8} />
//                     </motion.div>

//                     {/* Step number */}
//                     <span className="absolute right-5 top-5 text-xs font-bold uppercase tracking-widest text-white/80">
//                       0{i + 1}
//                     </span>
//                   </div>

//                   {/* ── Content Area ── */}
//                   <div className="flex h-[42%] flex-col justify-center px-7 py-6">
//                     <h3 className="text-xl font-semibold text-eqraa-brown-dark">
//                       {item.title}
//                     </h3>
//                     <p className="mt-3 text-sm leading-relaxed text-eqraa-brown-dark/65">
//                       {item.text}
//                     </p>

//                     {/* Subtle decorative line */}
//                     <div className="mt-5 h-px w-12 rounded-full bg-eqraa-beige-dark/40" />
//                   </div>

//                   {/* Active glow ring */}
//                   {isActive && (
//                     <motion.div
//                       className="pointer-events-none absolute -inset-[1px] rounded-[2rem] border-2 border-eqraa-brown/10"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: [0.4, 0.8, 0.4] }}
//                       transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
//                     />
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}

//           {/* ── Navigation Arrows ── */}
//           <button
//             onClick={() => paginate(-1)}
//             className="absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-eqraa-beige/60 bg-white/90 text-eqraa-brown shadow-soft backdrop-blur-sm transition-all hover:scale-110 hover:border-eqraa-brown/30 hover:bg-white hover:shadow-soft-lg active:scale-95 sm:left-4 lg:left-8"
//             aria-label="Previous"
//           >
//             <ArrowLeft size={18} />
//           </button>
//           <button
//             onClick={() => paginate(1)}
//             className="absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-eqraa-beige/60 bg-white/90 text-eqraa-brown shadow-soft backdrop-blur-sm transition-all hover:scale-110 hover:border-eqraa-brown/30 hover:bg-white hover:shadow-soft-lg active:scale-95 sm:right-4 lg:right-8"
//             aria-label="Next"
//           >
//             <ArrowRight size={18} />
//           </button>
//         </div>

//         {/* ── Pagination + Progress ── */}
//         <div className="relative mx-auto mt-10 flex max-w-xs flex-col items-center gap-4">
//           {/* Progress bar */}
//           <div className="h-1 w-full overflow-hidden rounded-full bg-eqraa-beige/60">
//             <motion.div
//               className="h-full rounded-full bg-eqraa-brown"
//               style={{ width: `${progress}%` }}
//               transition={{ duration: 0.05 }}
//             />
//           </div>

//           {/* Dots */}
//           <div className="flex items-center gap-3">
//             {whyChoose.map((_, i) => {
//               const active = i === index;
//               return (
//                 <button
//                   key={i}
//                   onClick={() => goTo(i)}
//                   className="group relative flex items-center justify-center"
//                   aria-label={`Go to slide ${i + 1}`}
//                 >
//                   <motion.div
//                     className={`rounded-full transition-colors ${
//                       active
//                         ? 'bg-eqraa-brown'
//                         : 'bg-eqraa-beige-dark/30 hover:bg-eqraa-beige-dark/50'
//                     }`}
//                     animate={{
//                       width: active ? 28 : 8,
//                       height: 8,
//                     }}
//                     transition={{ type: 'spring', stiffness: 400, damping: 25 }}
//                   />
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* ── Drag hint ── */}
//         <p className="mt-6 text-center text-xs text-eqraa-brown-dark/40">
//           Drag cards or use arrow keys to explore
//         </p>
//       </div>
//     </section>
//   );
// }


import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Target, Laptop, Star, CalendarDays } from 'lucide-react';

const whyChoose = [
  {
    icon: ShieldCheck,
    emoji: '📚',
    title: 'Verified Tutors',
    text: 'Every tutor is background-checked and credential-verified before joining Eqraa.',
    img: 'https://res.cloudinary.com/dyissekq4/image/upload/v1786696705/image-1_zxvwv9.jpg',
  },
  {
    icon: Target,
    emoji: '🎯',
    title: 'Perfect Matching',
    text: 'Our smart matching pairs each student with the tutor who fits their exact needs.',
    img: 'https://res.cloudinary.com/dyissekq4/image/upload/v1786696705/Islam_Abbas_smpvrh.jpg',
  },
  {
    icon: CalendarDays,
    emoji: '🎯',
    title: 'Instant Booking',
    text: 'Book anytime, anywhere.',
    img: 'https://res.cloudinary.com/dyissekq4/image/upload/v1786696705/NOOR_MOHAMED_uhue5m.jpg',
  },
  {
    icon: Laptop,
    emoji: '💻',
    title: 'Online Learning',
    text: 'Learn from anywhere with a seamless virtual classroom and flexible scheduling.',
    img: 'https://res.cloudinary.com/dyissekq4/image/upload/v1786696704/image_fhav7k.jpg',
  },
  {
    icon: Star,
    emoji: '⭐',
    title: 'High-Quality Education',
    text: 'Rigorously rated lessons ensure consistent, top-tier learning outcomes.',
    img: 'https://res.cloudinary.com/dyissekq4/image/upload/v1786696449/ALAA_KHALIL1_kbi3hq.jpg',
  },
];

/* ------------------------------------------------------------------ */
/*  Centered Auto-Scroll 3D Carousel — Why Choose Eqraa               */
/*  Requires: npm install framer-motion                                */
/* ------------------------------------------------------------------ */

export default function WhyChooseSwiper() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_DELAY = 4000;

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => {
      let next = prev + dir;
      if (next < 0) next = whyChoose.length - 1;
      if (next >= whyChoose.length) next = 0;
      return next;
    });
  }, []);

  const goTo = useCallback((i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }, [index]);

  /* Auto-scroll */
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => paginate(1), AUTO_DELAY);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, paginate]);

  /* Keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paginate]);

  const getOffset = (i: number) => {
    let raw = i - index;
    const len = whyChoose.length;
    if (raw > len / 2) raw -= len;
    if (raw < -len / 2) raw += len;
    return raw;
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 400 : -400,
      rotateY: dir > 0 ? 35 : -35,
      scale: 0.75,
      opacity: 0,
      zIndex: 0,
    }),
    center: {
      x: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      zIndex: 20,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -400 : 400,
      rotateY: dir > 0 ? -35 : 35,
      scale: 0.75,
      opacity: 0,
      zIndex: 0,
    }),
    left: {
      x: -260,
      rotateY: 28,
      scale: 0.82,
      opacity: 0.5,
      zIndex: 10,
    },
    right: {
      x: 260,
      rotateY: -28,
      scale: 0.82,
      opacity: 0.5,
      zIndex: 10,
    },
    farLeft: {
      x: -480,
      rotateY: 45,
      scale: 0.65,
      opacity: 0.2,
      zIndex: 5,
    },
    farRight: {
      x: 480,
      rotateY: -45,
      scale: 0.65,
      opacity: 0.2,
      zIndex: 5,
    },
    hidden: {
      x: 0,
      rotateY: 0,
      scale: 0.5,
      opacity: 0,
      zIndex: 0,
    },
  };

  const getVariant = (offset: number) => {
    if (offset === 0) return 'center';
    if (offset === -1) return 'left';
    if (offset === 1) return 'right';
    if (offset === -2 || offset === 2) return offset < 0 ? 'farLeft' : 'farRight';
    return 'hidden';
  };

  return (
    <section
      id="why-choose"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    //   onMouseEnter={() => setIsPaused(true)}
    //   onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-eqraa-beige/25 blur-[140px]" />
        <div className="absolute right-1/3 top-1/4 h-72 w-72 rounded-full bg-eqraa-beige-dark/15 blur-[100px]" />
        <div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-eqraa-brown/5 blur-[80px]" />
      </div>

      <div className="container-px relative">
        {/* ── Header ── */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="section-eyebrow">Why Eqraa</span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-eqraa-brown-dark sm:text-4xl lg:text-5xl">
            Why Choose Eqraa
          </h2>
          <p className="mt-4 text-lg text-eqraa-brown-dark/65">
            We make finding a great tutor simple, safe, and effective — so learning
            always feels personal.
          </p>
        </motion.div>

        {/* ── Centered 3D Carousel ── */}
        <div
          className="relative mx-auto mt-16 flex h-[540px] max-w-6xl items-center justify-center select-none"
          style={{ perspective: '1200px' }}
        >
          {whyChoose.map((item, i) => {
            const offset = getOffset(i);
            const variant = getVariant(offset);
            const isActive = offset === 0;

            return (
              <motion.div
                key={item.title}
                className="absolute w-full max-w-[20rem] will-change-transform sm:max-w-[22rem]"
                custom={direction}
                variants={variants}
                initial={false}
                animate={variant}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 24,
                  mass: 0.9,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                whileHover={isActive ? { scale: 1.04, y: -8 } : {}}
                whileTap={isActive ? { scale: 0.97 } : {}}
              >
                {/* Card */}
                <div
                  onClick={() => navigate('/find-tutor')}
                  className={`relative h-[500px] overflow-hidden rounded-[2.2rem] border transition-all duration-700 cursor-pointer ${
                    isActive
                      ? 'border-eqraa-brown/20 bg-white shadow-[0_25px_60px_-15px_rgba(139,90,43,0.18)]'
                      : 'border-eqraa-beige/50 bg-eqraa-beige-light/50 shadow-soft'
                  }`}
                >
                  {/* ── Image ── */}
                  <div className="relative h-[60%] overflow-hidden">
                    <motion.img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      animate={isActive ? { scale: 1 } : { scale: 1.12 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />

                    {/* Floating icon */}
                    <motion.div
                      className="absolute bottom-5 left-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/95 text-eqraa-brown shadow-soft backdrop-blur-md"
                      animate={
                        isActive
                          ? { y: [0, -8, 0] }
                          : { y: 0 }
                      }
                      transition={
                        isActive
                          ? { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
                          : { duration: 0.4 }
                      }
                    >
                      <item.icon size={26} strokeWidth={1.8} />
                    </motion.div>

                    {/* Step badge */}
                    <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm">
                      0{i + 1}
                    </span>
                  </div>

                  {/* ── Content ── */}
                  <div className="flex h-[40%] flex-col justify-center px-7 py-6">
                    <h3 className="text-xl font-semibold text-eqraa-brown-dark">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-eqraa-brown-dark/60">
                      {item.text}
                    </p>
                    <div className="mt-5 flex items-center gap-2">
                      <div className="h-1 w-10 rounded-full bg-eqraa-brown/30" />
                      <span className="text-xs font-medium text-eqraa-brown/50">
                        Eqraa.me
                      </span>
                    </div>
                  </div>

                  {/* Active pulse ring */}
                  {isActive && (
                    <motion.div
                      className="pointer-events-none absolute -inset-[1px] rounded-[2.2rem] border-2 border-eqraa-brown/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Pagination ── */}
        <div className="relative mx-auto mt-10 flex max-w-xs flex-col items-center gap-5">
          {/* Auto-scroll progress */}
          <div className="h-1 w-48 overflow-hidden rounded-full bg-eqraa-beige/50">
            <motion.div
              className="h-full rounded-full bg-eqraa-brown"
              key={index}
              initial={{ width: '0%' }}
              animate={{ width: isPaused ? '0%' : '100%' }}
              transition={{ duration: AUTO_DELAY / 1000, ease: 'linear' }}
            />
          </div>

          {/* Dots */}
          <div className="flex items-center gap-3">
            {whyChoose.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                //   onClick={() => goTo(i)}
                  className="relative flex items-center justify-center p-1"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <motion.div
                    className={`rounded-full transition-colors ${
                      active ? 'bg-eqraa-brown' : 'bg-eqraa-beige-dark/30'
                    }`}
                    animate={{
                      width: active ? 32 : 10,
                      height: 10,
                    }}
                    whileHover={!active ? { scale: 1.3, backgroundColor: 'rgba(139,90,43,0.4)' } : {}}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Hint ── */}
        <motion.p
          className="mt-5 text-center text-xs text-eqraa-brown-dark/35"
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          Auto-scrolling — hover to pause · use arrow keys to navigate
        </motion.p>
      </div>
    </section>
  );
}