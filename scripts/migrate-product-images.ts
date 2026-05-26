/**
 * Migrate all product images from public/products/ to Vercel Blob.
 * Then update the products data in Blob with new URLs.
 *
 * Usage:
 *   npx tsx scripts/migrate-product-images.ts
 *
 * Requires BLOB_READ_WRITE_TOKEN in .env.local
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { put } from '@vercel/blob';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { categories } from '../lib/products';

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN!;
const PUBLIC_DIR = join(__dirname, '..', 'public');
const PRODUCTS_DIR = join(PUBLIC_DIR, 'products');
const BESTSELLERS_DIR = join(PUBLIC_DIR, 'Sản phẩm bán chạy');

if (!BLOB_TOKEN) {
  console.error('❌ BLOB_READ_WRITE_TOKEN not found in .env.local');
  process.exit(1);
}

// Map of local path -> blob URL
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
  // Create a clean blob path
  const blobPath = relativePath
    .replace(/[^a-zA-Z0-9/._-]/g, '_')
    .replace(/__+/g, '_');

  const fileBuffer = readFileSync(localPath);
  const contentType = getMimeType(localPath);

  const blob = await put(blobPath, fileBuffer, {
    access: 'public',
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
    token: BLOB_TOKEN,
  });

  return blob.url;
}

async function main() {
  console.log('🚀 Migrating product images to Vercel Blob...\n');

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
      const blobUrl = await uploadFile(file);
      urlMap[localUrl] = blobUrl;
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
  console.log('📝 Updating product data with Blob URLs...\n');
  const updatedCategories = categories.map((cat) => ({
    ...cat,
    image: urlMap[cat.image] || cat.image,
    colors: cat.colors.map((color) => urlMap[color] || color),
  }));

  // 4. Save updated data to Blob
  const blob = await put(
    'site-content/products.json',
    JSON.stringify(updatedCategories, null, 2),
    {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
      token: BLOB_TOKEN,
    }
  );
  console.log(`✅ Products data saved: ${blob.url}`);

  // 5. Also upload best-sellers images
  console.log('\n📝 Updating best-sellers images...\n');
  const { defaultBestSellers } = await import('../lib/default-data');
  const updatedBestSellers = defaultBestSellers.map((item) => ({
    ...item,
    image: urlMap[item.image] || item.image,
  }));
  const bsBlob = await put(
    'site-content/best-sellers.json',
    JSON.stringify(updatedBestSellers, null, 2),
    {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
      token: BLOB_TOKEN,
    }
  );
  console.log(`✅ Best-sellers data saved: ${bsBlob.url}`);

  // 6. Print URL map for reference
  console.log('\n📋 URL Mapping (first 10):');
  const entries = Object.entries(urlMap).slice(0, 10);
  for (const [local, blob] of entries) {
    console.log(`  ${local}\n    → ${blob}`);
  }
  console.log(`  ... and ${Object.keys(urlMap).length - 10} more\n`);

  console.log('🎉 Migration complete!');
}

main().catch(console.error);
