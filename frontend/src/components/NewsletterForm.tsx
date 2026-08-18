import { useState } from "react";
import { subscribeNewsletter } from "../api/client";

export default function NewsletterForm({ variant = "default" }: { variant?: "default" | "inline" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await subscribeNewsletter({ email: email.trim() });
      setStatus("success");
      setMessage(res.message ?? "¡Suscripción exitosa! Revisa tu correo para confirmar.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Error al suscribirse. Intenta de nuevo.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-[var(--color-accent)] fade-in-up">
        {message}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        variant === "inline"
          ? "flex gap-3 items-stretch"
          : "flex flex-col gap-3"
      }
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="flex-1 bg-transparent border-b border-[var(--color-border)] px-0 py-2 text-sm placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-ink)] transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="text-xs uppercase tracking-[0.1em] text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
      >
        {status === "loading" ? "Enviando…" : "Suscribirse"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600 col-span-full">{message}</p>
      )}
    </form>
  );
}
