import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, MessageCircle, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/find-tutor', label: 'Find Your Tutor' },
];

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Programming'];

const socials = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/201038232883' },
];

export default function Footer() {
  return (
    <footer className="gradient-brown text-eqraa-beige-light">
      <div className="container-px py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white/95 p-3 inline-flex">
              <Logo className="h-9 w-auto" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-eqraa-beige/80">
              Eqraa connects parents and students with verified, experienced tutors for
              every subject, level, and curriculum — all in one trusted place.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-eqraa-beige transition-all duration-300 hover:bg-white hover:text-eqraa-brown-dark hover:-translate-y-0.5"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-eqraa-beige">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-sm text-eqraa-beige/80 transition-colors hover:text-white"
                  >
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular subjects */}
          {/* <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-eqraa-beige">
              Popular Subjects
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
              {subjects.map((subject) => (
                <li key={subject}>
                  <Link
                    to="/find-tutor"
                    className="text-sm text-eqraa-beige/80 transition-colors hover:text-white"
                  >
                    {subject}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-eqraa-beige">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-eqraa-beige/80">
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-eqraa-beige" />
                <a href="mailto:info@eqraa.me" className="transition-colors hover:text-white">
                  info@eqraa.me
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-eqraa-beige" />
                <a href="tel:+201038232883" className="transition-colors hover:text-white">
                  +20 103 823 2883
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-eqraa-beige" />
                <span>Egypt</span>
              </li>
            </ul>
          </div>

          {/* img */}
          <div>
           <img src='/books.png' alt='books' className='w-40 h-40 object-contain' />
           </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-center text-sm text-eqraa-beige/70 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Eqraa. All rights reserved.</p>
          <p>Built with care for learners everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
