import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/libros", label: "Libros" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/contacto", label: "Contacto" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-offwhite)]/95 backdrop-blur-sm border-b border-[var(--color-border-light)]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 h-[72px]">
        {/* Logo / Author name */}
        <Link to="/" className="group">
          <span className="font-serif text-2xl md:text-[1.75rem] font-medium tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
            Waldo Largo
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5"
          aria-label="Menú"
        >
          <span
            className={`block w-6 h-px bg-[var(--color-ink)] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[var(--color-ink)] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-64 border-b border-[var(--color-border-light)]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 pb-6 pt-2 gap-4">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
