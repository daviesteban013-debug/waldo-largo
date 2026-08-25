import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import { join } from "path";

const DIR = "./public/images/photography";
const QUALITY = 82;

async function convert() {
  const files = await readdir(DIR);
  const jpgs = files.filter((f) => /^foto-\d+\.jpg$/i.test(f)).sort((a, b) => {
    const na = parseInt(a.match(/\d+/)[0]);
    const nb = parseInt(b.match(/\d+/)[0]);
    return na - nb;
  });

  console.log(`Found ${jpgs.length} JPG files to convert.\n`);

  let totalJpgBytes = 0;
  let totalWebpBytes = 0;
  let converted = 0;

  for (const jpg of jpgs) {
    const inputPath = join(DIR, jpg);
    const outputName = jpg.replace(/\.jpg$/i, ".webp");
    const outputPath = join(DIR, outputName);

    const jpgStat = await stat(inputPath);
    totalJpgBytes += jpgStat.size;

    await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath);

    const webpStat = await stat(outputPath);
    totalWebpBytes += webpStat.size;

    const savings = ((1 - webpStat.size / jpgStat.size) * 100).toFixed(1);
    converted++;
    console.log(
      `  [${String(converted).padStart(2)}/${jpgs.length}] ${jpg} (${(jpgStat.size / 1024).toFixed(0)} KB) → ${outputName} (${(webpStat.size / 1024).toFixed(0)} KB) — ${savings}% smaller`
    );
  }

  console.log(`\n✅ Converted ${converted} images.`);
  console.log(`   Total JPG:  ${(totalJpgBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total WebP: ${(totalWebpBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Savings:    ${((1 - totalWebpBytes / totalJpgBytes) * 100).toFixed(1)}%\n`);

  // Delete original JPGs
  console.log("🗑️  Deleting original JPG files...");
  for (const jpg of jpgs) {
    await unlink(join(DIR, jpg));
  }
  console.log(`   Deleted ${jpgs.length} JPG files.\n`);
  console.log("Done!");
}

convert().catch(console.error);
