import { useState, useEffect, useCallback } from "react";
import type { Photo } from "../data/photography";
import PhotoCard from "./PhotoCard";

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
  }, [selectedIndex, photos.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
  }, [selectedIndex, photos.length]);

  // Handle keyboard events (ESC, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    }

    // Disable body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  return (
    <div>
      {/* Editorial Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 [column-fill:_balance]">
        {photos.map((photo, index) => (
          <div key={photo.id} className="fade-in-up" style={{ animationDelay: `${Math.min(index * 0.05, 0.4)}s` }}>
            <PhotoCard
              photo={photo}
              onClick={() => setSelectedIndex(index)}
            />
          </div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {selectedPhoto && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm p-4 sm:p-6 md:p-10 fade-in-up"
          onClick={handleClose}
        >
          {/* Top Bar Controls */}
          <div
            className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between text-white/70 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <span className="text-xs tracking-wider text-white/50 tabular-nums">
                {String(selectedIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
              </span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-[0.15em] flex items-center gap-2"
              aria-label="Cerrar"
            >
              <span>Cerrar</span>
              <span className="text-lg leading-none">✕</span>
            </button>
          </div>

          {/* Prev button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white hover:scale-110 transition-all cursor-pointer z-10"
              aria-label="Foto anterior"
            >
              <span className="text-2xl md:text-3xl font-light">←</span>
            </button>
          )}

          {/* Next button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white hover:scale-110 transition-all cursor-pointer z-10"
              aria-label="Siguiente foto"
            >
              <span className="text-2xl md:text-3xl font-light">→</span>
            </button>
          )}

          {/* Main Photo Container */}
          <div
            className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[72vh] flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-h-[72vh] max-w-full object-contain drop-shadow-2xl select-none"
              />
            </div>

            {/* Photo details caption below */}
            <div className="mt-4 text-center max-w-xl px-4">
              {selectedPhoto.caption && (
                <p className="font-serif text-base md:text-lg text-[#f5f0eb] leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
