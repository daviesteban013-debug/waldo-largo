/**
 * One-shot script to optimize images in public/images/ using sharp.
 * Converts JPG/JPEG → WebP with appropriate quality and sizing.
 *
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const IMAGES_DIR = "public/images";

/** Per-category settings */
const CONFIG = {
  // author portrait: max 1200px wide, quality 82
  "author-portrait": { maxWidth: 1200, quality: 82 },
  // book covers: max 800px wide, quality 80
  books: { maxWidth: 800, quality: 80 },
  // photography: max 1600px wide, quality 80
  photography: { maxWidth: 1600, quality: 80 },
  // default fallback
  default: { maxWidth: 1200, quality: 80 },
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

/**
 * Recursively find all image files in a directory.
 */
async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findImages(fullPath)));
    } else if (IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Determine config for a given file path.
 */
function getConfig(filePath) {
  const name = basename(filePath, extname(filePath));
  if (name.startsWith("author-portrait")) return CONFIG["author-portrait"];
  if (filePath.includes("books")) return CONFIG.books;
  if (filePath.includes("photography")) return CONFIG.photography;
  return CONFIG.default;
}

/**
 * Format bytes to human-readable string.
 */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  console.log("🔍 Scanning for images in", IMAGES_DIR, "...\n");

  const images = await findImages(IMAGES_DIR);

  if (images.length === 0) {
    console.log("No images found.");
    return;
  }

  console.log(`Found ${images.length} image(s) to optimize:\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const imagePath of images) {
    const config = getConfig(imagePath);
    const ext = extname(imagePath);
    const outputPath = imagePath.replace(ext, ".webp");

    // Get original size
    const originalStat = await stat(imagePath);
    const originalSize = originalStat.size;
    totalBefore += originalSize;

    try {
      // Read, resize, convert to WebP
      await sharp(imagePath)
        .resize({ width: config.maxWidth, withoutEnlargement: true })
        .webp({ quality: config.quality })
        .toFile(outputPath);

      // Get new size
      const newStat = await stat(outputPath);
      const newSize = newStat.size;
      totalAfter += newSize;

      const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
      console.log(
        `  ✅ ${imagePath}`,
        `\n     ${formatBytes(originalSize)} → ${formatBytes(newSize)} (−${reduction}%)`
      );
    } catch (err) {
      console.error(`  ❌ Error processing ${imagePath}:`, err.message);
    }
  }

  console.log("\n" + "─".repeat(60));
  console.log(
    `📊 Total: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)}`,
    `(−${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`
  );
  console.log("─".repeat(60));
}

main().catch(console.error);
