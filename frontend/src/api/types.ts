/* ─── Post types ─── */

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: string | null;
  createdAt: string;
}

export interface PostDetail extends Post {
  content: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PostsListResponse {
  posts: Post[];
  pagination: Pagination;
}

export interface PostDetailResponse {
  post: PostDetail;
}

/* ─── Contact ─── */

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  message: string;
}

/* ─── Newsletter ─── */

export interface NewsletterSubscribeInput {
  email: string;
}

export interface NewsletterResponse {
  message: string;
}

/* ─── Generic API error ─── */

export interface ApiErrorResponse {
  error: string;
  details?: Array<{ path: string; message: string }>;
}
