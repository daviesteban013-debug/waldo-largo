import { Request, Response, NextFunction } from "express";
import * as postService from "../services/post.service";

export async function listPublished(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await postService.listPublishedPosts(req.query as never);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getBySlug(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { slug } = req.params as { slug: string };
    const post = await postService.getPublishedPostBySlug(slug);
    res.json({ post });
  } catch (error) {
    next(error);
  }
}

export async function listAll(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await postService.listAllPosts(req.query as never);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const post = await postService.getPostById(id);
    res.json({ post });
  } catch (error) {
    next(error);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const post = await postService.createPost(req.body, req.session.userId!);
    res.status(201).json({ post });
  } catch (error) {
    next(error);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const post = await postService.updatePost(id, req.body);
    res.json({ post });
  } catch (error) {
    next(error);
  }
}

export async function publish(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const post = await postService.publishPost(id);
    res.json({ post });
  } catch (error) {
    next(error);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    await postService.deletePost(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
