import type { Photo } from "../data/photography";

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

export default function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <article
      onClick={() => onClick(photo)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(photo);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Ver foto: ${photo.alt}`}
      className="group relative cursor-pointer break-inside-avoid mb-6 md:mb-8 overflow-hidden bg-[var(--color-cream)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
    >
      {/* Image with subtle hover zoom */}
      <div className="overflow-hidden relative">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-95"
        />

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 pointer-events-none">
          <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {photo.caption && (
              <p className="font-serif text-sm md:text-base leading-snug line-clamp-2 drop-shadow-sm">
                {photo.caption}
              </p>
            )}
            <span className="inline-block mt-2 text-[10px] tracking-[0.14em] uppercase text-white/80 font-medium">
              Ampliar imagen ↗
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
