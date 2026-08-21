import { Link } from "react-router-dom";
import NewsletterForm from "../components/NewsletterForm";
import { books } from "../data/books";

export default function Home() {
  return (
    <>
      {/* ─── Hero section — two-column editorial layout ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center fade-in-up">
          {/* Text column */}
          <div className="order-2 md:order-1">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium text-[var(--color-ink)] leading-[1.1] mb-6">
              Waldo Largo
            </h1>
            <p className="text-justify text-lg text-[var(--color-ink-muted)] max-w-md leading-relaxed">
              Waldo Largo es fotógrafo, escritor, director creativo y recordador álmico; un artista que fusiona la imagen, la palabra y la conciencia para revelar la verdad profunda que habita detrás de cada rostro. Con una destacada trayectoria internacional y publicaciones en revistas como Vogue, su lente va más allá de la estética para capturar la identidad, la fuerza y la vulnerabilidad humana, creando retratos que no solo se observan, sino que se sienten.
              Esa misma sensibilidad atraviesa su faceta como autor de obras de transformación interior, como ¿En serio? y Divino Abismo (Best Seller en Amazon), a través de las cuales acompaña a sus lectores a sanar y convertir sus heridas en sabiduría. Ya sea detrás de una cámara o a través de la literatura, su propósito como recordador álmico no es dictar quién debes ser, sino ayudarte a recordar quién has sido siempre. En definitiva, la obra de Waldo es un encuentro íntimo con la esencia: un espacio creado para retratar historias, escribir memorias y despertar almas.
            </p>
          </div>

          {/* Portrait column */}
          <div className="order-1 md:order-2 bg-black overflow-hidden relative">
            <img
              src="/images/author-portrait.jpeg"
              alt="Waldo Largo"
              loading="lazy"
              className="w-full aspect-[3/4] object-cover object-top grayscale transition-all duration-700"
            />
            {/* Subtle vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      {books.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <hr className="border-[var(--color-border-light)]" />
        </div>
      )}

      {/* ─── Featured books ─── */}
      {books.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-[var(--color-ink)] mb-10 fade-in-up">
            Libros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {books.slice(0, 2).map((book, i) => (
              <div key={book.id} className={`fade-in-up stagger-${i + 1}`}>
                <Link to="/libros" className="group block">
                  <div className="overflow-hidden mb-4">
                    <img
                      src={book.coverImage}
                      alt={`Portada de ${book.title}`}
                      className="w-full aspect-[2/3] object-cover transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-90"
                    />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors duration-300 leading-tight mb-1">
                    {book.title}
                  </h3>
                  {book.publishedYear && (
                    <span className="text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                      {book.publishedYear}
                    </span>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── View all books link ─── */}
      {books.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20 text-center">
          <Link
            to="/libros"
            className="inline-block text-xs uppercase tracking-[0.12em] border border-[var(--color-ink)] px-8 py-3 text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-offwhite)] transition-all duration-300"
          >
            Ver todos los libros
          </Link>
        </div>
      )}

      {/* ─── Newsletter CTA ─── */}
      <section className="bg-[var(--color-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="max-w-md">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[var(--color-ink)] mb-3">
              Recibe las novedades
            </h2>
            <p className="text-sm text-[var(--color-ink-muted)] mb-6 leading-relaxed">
              Nuevos lanzamientos y novedades directamente en tu correo. Sin spam, solo escritura.
            </p>
            <NewsletterForm variant="inline" />
          </div>
        </div>
      </section>
    </>
  );
}

