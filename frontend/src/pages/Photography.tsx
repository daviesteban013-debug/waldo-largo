import { useState, useMemo } from "react";
import PhotoGallery from "../components/PhotoGallery";
import { photos, photoCategories, type PhotoCategory } from "../data/photography";

type FilterOption = "todas" | PhotoCategory;

const filterTabs: { value: FilterOption; label: string }[] = [
  { value: "todas", label: "Todas" },
  ...photoCategories,
];

export default function Photography() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("todas");

  const filteredPhotos = useMemo(() => {
    if (activeFilter === "todas") return photos;
    return photos.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

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

      {/* Filter Tabs */}
      <div className="mb-10 md:mb-12 border-b border-[var(--color-border-light)] fade-in-up stagger-1">
        <nav
          className="flex items-center gap-6 sm:gap-10 overflow-x-auto pb-4 scrollbar-none"
          aria-label="Filtro de categorías de fotografía"
        >
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.value;
            const count =
              tab.value === "todas"
                ? photos.length
                : photos.filter((p) => p.category === tab.value).length;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveFilter(tab.value)}
                className={`relative text-xs uppercase tracking-[0.12em] transition-colors pb-1 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "text-[var(--color-ink)] font-semibold"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 text-[10px] opacity-60 tabular-nums">
                  ({count})
                </span>

                {/* Animated active underline indicator */}
                {isActive && (
                  <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[var(--color-ink)]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Gallery Section */}
      {filteredPhotos.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[var(--color-ink-muted)]">
            No hay fotografías en esta categoría por el momento.
          </p>
        </div>
      ) : (
        <PhotoGallery photos={filteredPhotos} />
      )}
    </section>
  );
}
