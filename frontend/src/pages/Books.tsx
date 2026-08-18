import BookCard from "../components/BookCard";
import { books } from "../data/books";

export default function Books() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-20">
      {/* Page header */}
      <div className="mb-12 md:mb-16 fade-in-up">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[var(--color-ink)] leading-[1.1]">
          Libros
        </h1>
        <p className="mt-4 text-[var(--color-ink-muted)] max-w-lg leading-relaxed">
          Obras disponibles para compra. Cada libro es una invitación a explorar nuevos territorios de la palabra.
        </p>
      </div>

      {/* Books grid — 2 columns on desktop for a "featured products" showcase */}
      {books.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[var(--color-ink-muted)]">
            Próximamente, nuevos títulos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 fade-in-up stagger-1">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}
