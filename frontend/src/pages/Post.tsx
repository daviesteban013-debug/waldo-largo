import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostBySlug } from "../api/client";
import type { PostDetail } from "../api/types";

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Very basic markdown-to-HTML converter for the most common elements.
 * For a production site you'd want a proper library (marked, remark, etc.)
 */
function renderMarkdown(md: string): string {
  let html = md
    // headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h2>$1</h2>") // we use h2 even for # to avoid duplicate h1
    // bold & italic
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // blockquotes
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // horizontal rules
    .replace(/^---$/gm, "<hr />")
    // paragraphs (simple: split by double newlines)
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<h") || trimmed.startsWith("<blockquote") || trimmed.startsWith("<hr") || trimmed.startsWith("<img")) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return html;
}

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchPostBySlug(slug)
      .then((res) => setPost(res.post))
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar el artículo"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="text-sm text-[var(--color-ink-muted)] tracking-widest uppercase">
          Cargando…
        </span>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-[var(--color-ink-muted)]">{error || "Artículo no encontrado."}</p>
        <Link
          to="/blog"
          className="text-xs uppercase tracking-[0.1em] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
        >
          ← Volver a artículos
        </Link>
      </div>
    );
  }

  return (
    <article className="fade-in-up">
      {/* Cover image — full width */}
      {post.coverImageUrl && (
        <div className="w-full max-h-[65vh] overflow-hidden">
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article header */}
      <header className="max-w-[680px] mx-auto px-6 pt-12 md:pt-20 pb-8 md:pb-12">
        <Link
          to="/blog"
          className="inline-block text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-8"
        >
          ← Artículos
        </Link>
        <time className="block text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)] mb-4">
          {formatDate(post.publishedAt)}
        </time>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-[var(--color-ink)] leading-[1.12]">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 text-lg text-[var(--color-ink-muted)] leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Divider */}
      <div className="max-w-[680px] mx-auto px-6">
        <hr className="border-[var(--color-border-light)]" />
      </div>

      {/* Article body */}
      <div
        className="prose mx-auto px-6 py-10 md:py-14"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />

      {/* Back link */}
      <div className="max-w-[680px] mx-auto px-6 pb-16">
        <hr className="border-[var(--color-border-light)] mb-8" />
        <Link
          to="/blog"
          className="text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          ← Todos los artículos
        </Link>
      </div>
    </article>
  );
}
