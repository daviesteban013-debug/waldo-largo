import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border-light)] mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          {/* Column 1: Brand */}
          <div className="md:col-span-6">
            <Link to="/" className="font-serif text-xl font-medium text-[var(--color-ink)]">
              Waldo Largo
            </Link>
            <p className="mt-4 text-sm text-[var(--color-ink-muted)] leading-relaxed max-w-sm">
              Escritor, fotógrafo y creador de contenido. Reflexiones sobre literatura, arte y el despertar de la conciencia.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-4 md:col-start-9">
            <h4 className="text-xs uppercase tracking-[0.12em] text-[var(--color-ink-muted)] mb-4 font-sans font-medium">
              Navegación
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/libros" className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors">
                Libros
              </Link>
              <Link to="/sobre-mi" className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors">
                Sobre mí
              </Link>
              <Link to="/contacto" className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors">
                Contacto
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[var(--color-border-light)] flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[var(--color-ink-muted)]">
            © {year} Waldo Largo. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[var(--color-ink-muted)]">
            Hecho con cuidado editorial.
          </p>
        </div>
      </div>
    </footer>
  );
}

