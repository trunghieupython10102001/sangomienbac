/**
 * Seed script: Upload all default/static data to AWS S3.
 *
 * Usage:
 *   npx tsx scripts/seed-s3.ts
 *
 * Requires AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET in .env.local
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { uploadToS3 } from '../lib/s3';
import { categories } from '../lib/products';
import { newsArticles } from '../lib/news';
import {
  defaultSiteSettings,
  defaultBestSellers,
  defaultMediaItems,
  defaultAboutContent,
} from '../lib/default-data';

const CONTENT_PREFIX = 'site-content/';

async function seed(key: string, data: unknown) {
  const url = await uploadToS3(
    `${CONTENT_PREFIX}${key}.json`,
    JSON.stringify(data, null, 2),
    'application/json'
  );
  console.log(`✅ ${key} → ${url}`);
}

async function main() {
  console.log('🌱 Seeding AWS S3...\n');

  await seed('site-settings', defaultSiteSettings);
  await seed('products', categories);
  await seed('best-sellers', defaultBestSellers);
  await seed('news', newsArticles);
  await seed('media', defaultMediaItems);
  await seed('about', defaultAboutContent);

  console.log('\n✅ All content seeded successfully!');
}

main().catch(console.error);
