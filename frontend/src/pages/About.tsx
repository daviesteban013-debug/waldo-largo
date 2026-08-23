export default function About() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        {/* Text column */}
        <div className="md:col-span-7 md:col-start-1 fade-in-up">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[var(--color-ink)] leading-[1.1] mb-8">
            Sobre mí
          </h1>

          <div className="space-y-5 text-[var(--color-ink-light)] leading-relaxed text-lg max-w-xl">
            <p>
              Soy <strong className="text-[var(--color-ink)] font-medium">Waldo Largo</strong>, escritor
              Waldo Largo es un fotógrafo, escritor, director creativo y recordador álmico colombiano que busca revelar la esencia humana a través del arte.
              Con una destacada trayectoria en fotografía de moda y retrato, ha publicado en Vogue y colaborado con importantes diseñadores, creando experiencias visuales que capturan la verdadera identidad y
              vulnerabilidad de las personas. Como escritor, es autor de obras de transformación interior como ¿En serio? y Divino Abismo, siendo este último best seller en Amazon. A través de sus imágenes y sus libros, su propósito no es decirle a las personas quiénes deben ser, sino ayudarlas a recordar quiénes
              han sido siempre. Waldo retrata historias, escribe memorias y despierta almas.
            </p>
            <p>
              Creo que la escritura es un acto de resistencia silenciosa: contra la prisa, contra
              lo superficial, contra el olvido. Cada ensayo es una invitación a detenerse, leer
              despacio y pensar con calma.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="mt-10">
            <a
              href="/contacto"
              className="inline-block text-xs uppercase tracking-[0.12em] border border-[var(--color-ink)] px-8 py-3 text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-offwhite)] transition-all duration-300"
            >
              Contacto
            </a>
          </div>
        </div>

        {/* Image / visual column */}
        <div className="md:col-span-4 md:col-start-9 fade-in-up stagger-2">
          <div className="aspect-[3/4] bg-black overflow-hidden relative w-full">
            <img
              src="/images/author-portrait.webp"
              alt="Waldo Largo"
              loading="lazy"
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <p className="mt-3 text-xs text-[var(--color-ink-muted)] italic">
            Waldo Largo — Fotógrafo, escritor y recordador álmico.
          </p>
        </div>
      </div>
    </section>
  );
}
