import slugifyLib from "slugify";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug) && slug.length <= 200;
}

export function createSlug(title: string): string {
  return slugifyLib(title, {
    lower: true,
    strict: true,
    trim: true,
  }).slice(0, 200);
}

export function normalizeSlug(slug: string): string {
  return slug.trim().toLowerCase();
}
