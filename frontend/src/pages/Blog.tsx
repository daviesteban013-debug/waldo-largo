import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { fetchPosts } from "../api/client";
import type { Post, Pagination } from "../api/types";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPosts(page, 9)
      .then((res) => {
        setPosts(res.posts);
        setPagination(res.pagination);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-20">
      {/* Page header */}
      <div className="mb-12 md:mb-16 fade-in-up">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[var(--color-ink)] leading-[1.1]">
          Artículos
        </h1>
        <p className="mt-4 text-[var(--color-ink-muted)] max-w-lg leading-relaxed">
          Ensayos, reflexiones y narrativa. Cada pieza es una exploración en forma de palabra escrita.
        </p>
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <span className="text-sm text-[var(--color-ink-muted)] tracking-widest uppercase">
            Cargando…
          </span>
        </div>
      ) : posts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[var(--color-ink-muted)]">Aún no hay artículos publicados.</p>
        </div>
      ) : (
        <>
          {/* Magazine grid — asymmetric: first row 7/5, then 4/4/4, etc. */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            {/* First post large */}
            {posts[0] && (
              <div className="md:col-span-7 fade-in-up">
                <ArticleCard post={posts[0]} variant="medium" />
              </div>
            )}
            {/* Second post */}
            {posts[1] && (
              <div className="md:col-span-5 fade-in-up stagger-1">
                <ArticleCard post={posts[1]} variant="medium" />
              </div>
            )}

            {/* Rest in 3-column or 2-column rhythm */}
            {posts.slice(2).map((post, i) => (
              <div
                key={post.id}
                className={`fade-in-up ${
                  i % 3 === 0 ? "md:col-span-5" : i % 3 === 1 ? "md:col-span-4" : "md:col-span-3"
                }`}
              >
                <ArticleCard post={post} variant="medium" />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] disabled:opacity-30 transition-colors cursor-pointer"
              >
                ← Anterior
              </button>
              <span className="text-xs text-[var(--color-ink-muted)] tabular-nums">
                {page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page >= pagination.totalPages}
                className="text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] disabled:opacity-30 transition-colors cursor-pointer"
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
