import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { isAuthenticated, logout } from "@/lib/auth";
import { useNavigate, Navigate } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/find-tutor", label: "Find Your Tutor" },
];

export default function Navbar() {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [logutButton, setLogoutButton] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated()) {
      setLogoutButton(true);
    }
  });

  async function logOutButton() {
    logout();
    window.location.reload();
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-eqraa-beige-light/90 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-px flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Eqraa home">
          <img
            src="https://res.cloudinary.com/dyissekq4/image/upload/v1787235449/Squaredlogo-removebg-preview_cl8p5o.png"
            alt="Eqraa Logo"
            className="h-16 w-auto"
          />
          <span style={{ color: '#5C3D14', fontWeight: 'bold', fontSize: '1.5rem' }}>
            Eqraa
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-xl px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-eqraa-brown"
                      : "text-eqraa-brown-dark/70 hover:text-eqraa-brown"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute inset-x-5 -bottom-0.5 h-0.5 rounded-full bg-eqraa-beige-dark transition-all duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/201038232883"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary ml-3 px-5 py-2.5 text-sm"
            >
              Become a Tutor
            </a>
          </li>
          {logutButton && (
            <li>
              <a
                href="/AdminDashboard"
                className="btn-primary ml-3 px-5 py-2.5 text-sm"
                style={{ backgroundColor: "var(--main-color)" }}
              >
                Admin Dashboard
              </a>
            </li>
          )}
          <li>
            {logutButton && (
              <button
                className="btn-primary bg-red-700 hover:bg-red-800 ml-3 px-5 py-2.5 text-sm"
                onClick={logOutButton}
              >
                LogOut
              </button>
            )}
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-eqraa-brown-dark transition-colors hover:bg-eqraa-beige md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-eqraa-beige/60 bg-eqraa-beige-light/95 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-px flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-eqraa-beige text-eqraa-brown"
                      : "text-eqraa-brown-dark/80 hover:bg-eqraa-beige/60"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="https://wa.me/201038232883"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              Become a Tutor
            </a>
          </li>
          {logutButton && (
            <li className="mt-2">
              <a
                href="/AdminDashboard"
                className="btn-primary w-full"
                style={{ backgroundColor: '#8B4513' }}
              >
                Admin Dashboard
              </a>
            </li>
          )}
          {logutButton && (
            <li className="mt-2">
              <button
                className="btn-primary bg-red-700 hover:bg-red-800 w-full"
                onClick={logOutButton}
              >
                LogOut
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
