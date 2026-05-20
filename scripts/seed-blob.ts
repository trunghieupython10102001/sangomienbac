/**
 * Seed script: Upload all default/static data to Vercel Blob Storage.
 * 
 * Usage:
 *   npx tsx scripts/seed-blob.ts
 * 
 * Requires BLOB_READ_WRITE_TOKEN in .env.local
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { put } from '@vercel/blob';
import { categories } from '../lib/products';
import { newsArticles } from '../lib/news';
import {
  defaultSiteSettings,
  defaultBestSellers,
  defaultMediaItems,
  defaultAboutContent,
} from '../lib/default-data';

const BLOB_PREFIX = 'site-content/';

async function seedBlob(key: string, data: unknown) {
  const blob = await put(
    BLOB_PREFIX + key + '.json',
    JSON.stringify(data, null, 2),
    {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    }
  );
  console.log(`✅ ${key} → ${blob.url}`);
}

async function main() {
  console.log('🌱 Seeding Vercel Blob Storage...\n');

  await seedBlob('site-settings', defaultSiteSettings);
  await seedBlob('products', categories);
  await seedBlob('best-sellers', defaultBestSellers);
  await seedBlob('news', newsArticles);
  await seedBlob('media', defaultMediaItems);
  await seedBlob('about', defaultAboutContent);

  console.log('\n✅ All content seeded successfully!');
}

main().catch(console.error);
