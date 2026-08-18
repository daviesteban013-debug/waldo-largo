import { Link } from "react-router-dom";
import type { Post } from "../api/types";

interface ArticleCardProps {
  post: Post;
  /** Visual variant: "large" for hero-size, "medium" for standard, "small" for compact list items */
  variant?: "large" | "medium" | "small";
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticleCard({ post, variant = "medium" }: ArticleCardProps) {
  if (variant === "large") {
    return (
      <Link to={`/blog/${post.slug}`} className="group block">
        <article className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
          {/* Cover image — takes 7 columns */}
          <div className="md:col-span-7 overflow-hidden">
            {post.coverImageUrl ? (
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-[var(--color-cream)]" />
            )}
          </div>

          {/* Text — takes 5 columns */}
          <div className="md:col-span-5">
            <time className="text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
              {formatDate(post.publishedAt)}
            </time>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium mt-3 mb-4 leading-[1.12] text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-[var(--color-ink-light)] leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            )}
            <span className="inline-block mt-5 text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors">
              Leer artículo →
            </span>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "small") {
    return (
      <Link to={`/blog/${post.slug}`} className="group block py-5 border-b border-[var(--color-border-light)] last:border-b-0">
        <article className="flex items-baseline gap-4">
          <time className="text-xs text-[var(--color-ink-muted)] shrink-0 tabular-nums">
            {formatDate(post.publishedAt)}
          </time>
          <h3 className="font-serif text-lg font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors duration-300 leading-snug">
            {post.title}
          </h3>
        </article>
      </Link>
    );
  }

  // variant === "medium"
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article>
        {post.coverImageUrl ? (
          <div className="overflow-hidden mb-4">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="w-full aspect-[3/2] bg-[var(--color-cream)] mb-4" />
        )}
        <time className="text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
          {formatDate(post.publishedAt)}
        </time>
        <h3 className="font-serif text-xl md:text-2xl font-medium mt-2 mb-2 leading-tight text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </article>
    </Link>
  );
}
