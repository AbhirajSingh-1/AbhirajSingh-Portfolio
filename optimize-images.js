import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function optimizeImages() {
  const assetsDir = path.join(__dirname, 'src', 'assets', 'projects');

  const images = [
    { file: 'ME1.webp', width: 600, quality: 80 },
    { file: 'ME2.webp', width: 960, quality: 75 },
  ];

  for (const img of images) {
    const filePath = path.join(assetsDir, img.file);
    const tmpPath = path.join(assetsDir, `_tmp_${img.file}`);
    const beforeSize = fs.statSync(filePath).size;
    const beforeKB = (beforeSize / 1024).toFixed(1);

    console.log(`Processing ${img.file}...`);
    console.log(`  Before: ${beforeKB} KB`);

    // Write to temp file first, then rename (avoids file lock issues)
    await sharp(filePath)
      .resize({ width: img.width })
      .webp({ quality: img.quality })
      .toFile(tmpPath);

    // Remove original then rename temp
    fs.unlinkSync(filePath);
    fs.renameSync(tmpPath, filePath);

    const afterSize = fs.statSync(filePath).size;
    const afterKB = (afterSize / 1024).toFixed(1);
    const savings = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);

    console.log(`  After:  ${afterKB} KB`);
    console.log(`  Saved:  ${savings}%`);
    console.log();
  }

  console.log('Done! All images optimized in place.');
}

optimizeImages().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
