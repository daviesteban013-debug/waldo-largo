import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* Header column */}
        <div className="md:col-span-5 fade-in-up">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[var(--color-ink)] leading-[1.1] mb-6">
            Contacto
          </h1>
          <p className="text-[var(--color-ink-muted)] leading-relaxed max-w-sm">
            ¿Tienes una propuesta editorial, una colaboración en mente o simplemente quieres
            conversar? Escríbeme y responderé en cuanto pueda.
          </p>

          <div className="mt-10 space-y-3">
            <div>
              <h3 className="text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)] font-sans font-medium mb-1">
                Correo
              </h3>
              <p className="text-sm text-[var(--color-ink-light)]">contacto@waldolargo.com</p>
            </div>
          </div>
        </div>

        {/* Form column */}
        <div className="md:col-span-6 md:col-start-7 fade-in-up stagger-2">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
