import PhotoGallery from "../components/PhotoGallery";
import { photos } from "../data/photography";

export default function Photography() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-20">
      {/* Page Header */}
      <div className="mb-10 md:mb-14 fade-in-up">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[var(--color-ink)] leading-[1.1]">
          Fotografía
        </h1>
        <p className="mt-4 text-[var(--color-ink-muted)] max-w-xl leading-relaxed text-base md:text-lg">
          Retratos, moda y narrativa visual. Cada imagen busca revelar la esencia y vulnerabilidad humana a través de la luz.
        </p>
      </div>

      {/* Gallery Section */}
      <PhotoGallery photos={photos} />
    </section>
  );
}
