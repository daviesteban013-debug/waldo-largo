import { PostStatus } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/errors";
import {
  sanitizeExcerpt,
  sanitizeMarkdown,
  sanitizeUrl,
} from "../utils/sanitize";
import { createSlug, isValidSlug, normalizeSlug } from "../utils/slugify";
import {
  CreatePostInput,
  ListPostsQuery,
  UpdatePostInput,
} from "../schemas/post.schema";

const publicPostSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  coverImageUrl: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

const adminPostSelect = {
  ...publicPostSelect,
  status: true,
  authorId: true,
} as const;

function processPostInput(input: CreatePostInput | UpdatePostInput) {
  const data: {
    title?: string;
    slug?: string;
    excerpt?: string | null;
    content?: string;
    coverImageUrl?: string | null;
    status?: PostStatus;
    publishedAt?: Date | null;
  } = {};

  if (input.title !== undefined) {
    data.title = input.title.trim();
  }

  if (input.slug !== undefined) {
    const slug = normalizeSlug(input.slug);
    if (!isValidSlug(slug)) {
      throw new AppError(400, "Invalid slug format");
    }
    data.slug = slug;
  } else if (input.title !== undefined) {
    data.slug = createSlug(input.title);
  }

  if (input.excerpt !== undefined) {
    data.excerpt = input.excerpt ? sanitizeExcerpt(input.excerpt) : null;
  }

  if (input.content !== undefined) {
    try {
      data.content = sanitizeMarkdown(input.content);
    } catch {
      throw new AppError(400, "Invalid post content");
    }
  }

  if (input.coverImageUrl !== undefined) {
    if (input.coverImageUrl) {
      try {
        data.coverImageUrl = sanitizeUrl(input.coverImageUrl);
      } catch {
        throw new AppError(400, "Invalid cover image URL");
      }
    } else {
      data.coverImageUrl = null;
    }
  }

  if (input.status !== undefined) {
    data.status = input.status as PostStatus;
    if (input.status === "PUBLISHED") {
      data.publishedAt = new Date();
    }
  }

  return data;
}

export async function listPublishedPosts(query: ListPostsQuery) {
  const { page, limit } = query;
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImageUrl: true,
        publishedAt: true,
        createdAt: true,
      },
      orderBy: { publishedAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
  ]);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getPublishedPostBySlug(slug: string) {
  const normalizedSlug = normalizeSlug(slug);
  const post = await prisma.post.findFirst({
    where: { slug: normalizedSlug, status: "PUBLISHED" },
    select: publicPostSelect,
  });

  if (!post) {
    throw new AppError(404, "Post not found");
  }

  return post;
}

export async function listAllPosts(query: ListPostsQuery) {
  const { page, limit } = query;
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      select: adminPostSelect,
      orderBy: { updatedAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.post.count(),
  ]);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getPostById(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    select: adminPostSelect,
  });

  if (!post) {
    throw new AppError(404, "Post not found");
  }

  return post;
}

export async function createPost(input: CreatePostInput, authorId: string) {
  const data = processPostInput(input);

  if (!data.title || !data.content) {
    throw new AppError(400, "Title and content are required");
  }

  const slug = data.slug ?? createSlug(data.title);
  if (!isValidSlug(slug)) {
    throw new AppError(400, "Could not generate valid slug from title");
  }

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    throw new AppError(409, "A post with this slug already exists");
  }

  const status = (data.status ?? "DRAFT") as PostStatus;

  return prisma.post.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt ?? null,
      content: data.content,
      coverImageUrl: data.coverImageUrl ?? null,
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      authorId,
    },
    select: adminPostSelect,
  });
}

export async function updatePost(id: string, input: UpdatePostInput) {
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(404, "Post not found");
  }

  const data = processPostInput(input);

  if (data.slug && data.slug !== existing.slug) {
    const slugTaken = await prisma.post.findUnique({ where: { slug: data.slug } });
    if (slugTaken) {
      throw new AppError(409, "A post with this slug already exists");
    }
  }

  return prisma.post.update({
    where: { id },
    data,
    select: adminPostSelect,
  });
}

export async function publishPost(id: string) {
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(404, "Post not found");
  }

  return prisma.post.update({
    where: { id },
    data: {
      status: "PUBLISHED",
      publishedAt: existing.publishedAt ?? new Date(),
    },
    select: adminPostSelect,
  });
}

export async function deletePost(id: string) {
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(404, "Post not found");
  }

  await prisma.post.delete({ where: { id } });
}
