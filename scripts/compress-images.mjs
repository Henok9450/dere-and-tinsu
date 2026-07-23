import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = path.join(__dirname, '../src/assets/images');
const MAX_WIDTH = 2000;
const QUALITY = 85;

const SUPPORTED = ['.jpg', '.jpeg', '.png', '.webp'];

let totalOriginal = 0;
let totalCompressed = 0;
let count = 0;
let errorCount = 0;

async function compressDir(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await compressDir(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!SUPPORTED.includes(ext)) continue;

    const originalStat = await stat(fullPath);
    const originalSize = originalStat.size;
    const tempPath = fullPath + '.tmp';

    try {
      const image = sharp(fullPath);
      const metadata = await image.metadata();

      // .rotate() auto-rotates based on EXIF orientation and resets the tag
      let pipeline = image.rotate();
      if (metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }

      // Write to temp file first
      if (ext === '.png') {
        await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toFile(tempPath);
      } else {
        await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tempPath);
      }

      const newStat = await stat(tempPath);
      const newSize = newStat.size;

      if (newSize < originalSize) {
        // Replace original with compressed temp file
        await unlink(fullPath);
        await rename(tempPath, fullPath);
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        console.log(`✅ ${entry.name}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (saved ${savings}%)`);
        totalOriginal += originalSize;
        totalCompressed += newSize;
      } else {
        // Temp file is larger, keep original
        await unlink(tempPath);
        console.log(`⏭️  ${entry.name}: already optimized, skipped`);
        totalOriginal += originalSize;
        totalCompressed += originalSize;
      }

      count++;
    } catch (err) {
      // Clean up temp file if it exists
      try { await unlink(tempPath); } catch {}
      console.error(`❌ Error processing ${entry.name}: ${err.message}`);
      errorCount++;
    }
  }
}

console.log('🚀 Starting image compression...');
console.log(`   Settings: max width ${MAX_WIDTH}px, quality ${QUALITY}%\n`);

await compressDir(INPUT_DIR);

const totalSavedMB = ((totalOriginal - totalCompressed) / 1024 / 1024).toFixed(2);
const totalOriginalMB = (totalOriginal / 1024 / 1024).toFixed(2);
const totalCompressedMB = (totalCompressed / 1024 / 1024).toFixed(2);
const percent = totalOriginal > 0 ? ((totalOriginal - totalCompressed) / totalOriginal * 100).toFixed(1) : 0;

console.log(`\n✨ Done! Processed ${count} images, ${errorCount} errors`);
console.log(`📦 Total: ${totalOriginalMB}MB → ${totalCompressedMB}MB`);
console.log(`💾 Saved: ${totalSavedMB}MB (${percent}% reduction)`);
