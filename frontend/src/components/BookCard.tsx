import type { Book } from "../data/books";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="group">
      {/* Cover image — book aspect ratio (2:3) */}
      <div className="overflow-hidden mb-6">
        <img
          src={book.coverImage}
          alt={`Portada de ${book.title}`}
          loading="lazy"
          className="w-full aspect-[2/3] object-cover transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-90"
        />
      </div>

      {/* Text content */}
      <div className="space-y-3">
        {/* Year */}
        {book.publishedYear && (
          <span className="text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
            {book.publishedYear}
          </span>
        )}

        {/* Title */}
        <h2 className="font-serif text-2xl md:text-3xl font-medium text-[var(--color-ink)] leading-[1.15]">
          {book.title}
        </h2>

        {/* Subtitle */}
        {book.subtitle && (
          <p className="font-serif text-lg text-[var(--color-ink-light)] italic leading-snug">
            {book.subtitle}
          </p>
        )}

        {/* Description */}
        <p className="text-[var(--color-ink-muted)] leading-relaxed text-[0.95rem]">
          {book.description}
        </p>

        {/* Price + Buy button */}
        <div className="flex items-center gap-5 pt-3">
          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs uppercase tracking-[0.12em] border border-[var(--color-ink)] px-8 py-3 text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-offwhite)] transition-all duration-300"
          >
            Comprar en Amazon
          </a>
          {book.price && (
            <span className="text-sm text-[var(--color-ink-muted)] tabular-nums">
              {book.price}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
