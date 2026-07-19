/**
 * Migrate all product images from public/products/ to AWS S3.
 * Then update the products data in S3 with new URLs.
 *
 * Usage:
 *   npx tsx scripts/migrate-images-s3.ts
 *
 * Requires AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET in .env.local
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { uploadToS3 } from '../lib/s3';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { categories } from '../lib/products';

const PUBLIC_DIR = join(__dirname, '..', 'public');
const PRODUCTS_DIR = join(PUBLIC_DIR, 'products');
const BESTSELLERS_DIR = join(PUBLIC_DIR, 'Sản phẩm bán chạy');

if (!process.env.S3_BUCKET) {
  console.error('❌ S3_BUCKET not found in .env.local');
  process.exit(1);
}

// Map of local path -> S3 URL
const urlMap: Record<string, string> = {};

function getAllFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else if (stat.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

function getMimeType(filename: string): string {
  const ext = filename.toLowerCase().split('.').pop();
  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    mp4: 'video/mp4',
    mov: 'video/quicktime',
  };
  return mimeTypes[ext || ''] || 'application/octet-stream';
}

async function uploadFile(localPath: string): Promise<string> {
  const relativePath = relative(PUBLIC_DIR, localPath);
  // Create a clean object key
  const key = relativePath
    .replace(/[^a-zA-Z0-9/._-]/g, '_')
    .replace(/__+/g, '_');

  const fileBuffer = readFileSync(localPath);
  const contentType = getMimeType(localPath);

  return uploadToS3(key, fileBuffer, contentType);
}

async function main() {
  console.log('🚀 Migrating product images to AWS S3...\n');

  // 1. Get all files from products + best-sellers
  const allFiles = [
    ...getAllFiles(PRODUCTS_DIR),
    ...getAllFiles(BESTSELLERS_DIR),
  ];
  console.log(`Found ${allFiles.length} files to upload.\n`);

  // 2. Upload all files
  let uploaded = 0;
  for (const file of allFiles) {
    const localUrl = '/' + relative(PUBLIC_DIR, file);
    try {
      const s3Url = await uploadFile(file);
      urlMap[localUrl] = s3Url;
      uploaded++;
      if (uploaded % 10 === 0) {
        console.log(`  Uploaded ${uploaded}/${allFiles.length}...`);
      }
    } catch (e) {
      console.error(`  ❌ Failed: ${localUrl}`, e instanceof Error ? e.message : e);
    }
  }
  console.log(`\n✅ Uploaded ${uploaded}/${allFiles.length} files.\n`);

  // 3. Update categories data with new URLs
  console.log('📝 Updating product data with S3 URLs...\n');
  const updatedCategories = categories.map((cat) => ({
    ...cat,
    image: urlMap[cat.image] || cat.image,
    colors: cat.colors.map((color) => urlMap[color] || color),
  }));

  // 4. Save updated data to S3
  const productsUrl = await uploadToS3(
    'site-content/products.json',
    JSON.stringify(updatedCategories, null, 2),
    'application/json'
  );
  console.log(`✅ Products data saved: ${productsUrl}`);

  // 5. Also upload best-sellers images
  console.log('\n📝 Updating best-sellers images...\n');
  const { defaultBestSellers } = await import('../lib/default-data');
  const updatedBestSellers = defaultBestSellers.map((item) => ({
    ...item,
    image: urlMap[item.image] || item.image,
  }));
  const bsUrl = await uploadToS3(
    'site-content/best-sellers.json',
    JSON.stringify(updatedBestSellers, null, 2),
    'application/json'
  );
  console.log(`✅ Best-sellers data saved: ${bsUrl}`);

  // 6. Print URL map for reference
  console.log('\n📋 URL Mapping (first 10):');
  const entries = Object.entries(urlMap).slice(0, 10);
  for (const [local, s3] of entries) {
    console.log(`  ${local}\n    → ${s3}`);
  }
  console.log(`  ... and ${Object.keys(urlMap).length - 10} more\n`);

  console.log('🎉 Migration complete!');
}

main().catch(console.error);
