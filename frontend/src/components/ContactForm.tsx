import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { submitContact } from "../api/client";

const contactFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(100),
  email: z.string().email("Ingresa un correo válido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(5000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setSubmitStatus("loading");
    try {
      const res = await submitContact(data);
      setSubmitStatus("success");
      setServerMessage(res.message ?? "Mensaje enviado correctamente. ¡Gracias!");
      reset();
    } catch (err) {
      setSubmitStatus("error");
      setServerMessage(err instanceof Error ? err.message : "Error al enviar el mensaje.");
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="fade-in-up py-12 text-center">
        <p className="font-serif text-2xl text-[var(--color-ink)] mb-2">Gracias</p>
        <p className="text-[var(--color-ink-muted)]">{serverMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
      {/* Name */}
      <div className="space-y-2">
        <label
          htmlFor="contact-name"
          className="block text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)] font-medium"
        >
          Nombre
        </label>
        <input
          id="contact-name"
          type="text"
          {...register("name")}
          className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-ink)] transition-colors"
          placeholder="Tu nombre"
        />
        {errors.name && (
          <p className="text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="contact-email"
          className="block text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)] font-medium"
        >
          Correo electrónico
        </label>
        <input
          id="contact-email"
          type="email"
          {...register("email")}
          className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-ink)] transition-colors"
          placeholder="tu@correo.com"
        />
        {errors.email && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label
          htmlFor="contact-message"
          className="block text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)] font-medium"
        >
          Mensaje
        </label>
        <textarea
          id="contact-message"
          rows={5}
          {...register("message")}
          className="w-full bg-transparent border border-[var(--color-border)] rounded-sm py-3 px-3 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-ink)] transition-colors resize-y"
          placeholder="Escribe tu mensaje aquí…"
        />
        {errors.message && (
          <p className="text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitStatus === "loading"}
        className="inline-block text-xs uppercase tracking-[0.12em] border border-[var(--color-ink)] px-8 py-3 text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-offwhite)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
      >
        {submitStatus === "loading" ? "Enviando…" : "Enviar mensaje"}
      </button>

      {submitStatus === "error" && (
        <p className="text-xs text-red-600 mt-2">{serverMessage}</p>
      )}
    </form>
  );
}
